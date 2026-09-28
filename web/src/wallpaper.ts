// Koi Pond wallpaper entry point.
// A UI-free runtime for nagomi's pond (school + renderer) that fills the whole
// screen and exposes a small `window.koipond` API for the macOS host app.
// Based on the runtime loop in app.tsx from https://github.com/msk1039/nagomi
// (PolyForm Noncommercial 1.0.0 — Copyright 2026 Mayank Kadam).

import { AUDIO } from "./audio-config";
import { CANVAS, CANVAS_HEIGHT, CANVAS_WIDTH, FIXED_STEP, setCanvasSize } from "./config";
import { FishRenderer } from "./fish-renderer";
import { clamp, vec } from "./math";
import { School } from "./school";
import { connectSettingsEffects } from "./settings/effects";
import { connectPersistence, loadInto } from "./settings/persistence";
import { settings } from "./settings/store";
import { WEATHER_PRESETS, type WeatherPresetId } from "./weather";

loadInto(settings);
connectPersistence(settings);

// Match the screen's aspect ratio while keeping nagomi's pixel density
// (the pond's authored space is 480x270 at 16:9).
function wallpaperRenderSize(): { width: number; height: number } {
  const w = Math.max(1, window.innerWidth);
  const h = Math.max(1, window.innerHeight);
  const aspect = w / h;
  const base = CANVAS.width / CANVAS.height;
  if (aspect >= base) {
    return { width: Math.round(CANVAS.height * aspect), height: CANVAS.height };
  }
  return { width: CANVAS.width, height: Math.round(CANVAS.width / aspect) };
}

const canvas = document.querySelector<HTMLCanvasElement>("#pond");
if (!canvas) throw new Error("Missing #pond canvas");

const initial = wallpaperRenderSize();
setCanvasSize(initial.width, initial.height);
const school = new School();
const renderer = new FishRenderer(canvas);
renderer.setWeatherPreset(settings.meta().weather);
school.setRainIntensity(settings.meta().rain ? 1 : 0);
connectSettingsEffects(settings, { school, renderer });

settings.subscribe(() => {
  const meta = settings.meta();
  renderer.setWeatherPreset(meta.weather);
  school.setRainIntensity(meta.rain ? 1 : 0);
});

window.addEventListener("resize", () => {
  const next = wallpaperRenderSize();
  if (next.width === CANVAS_WIDTH && next.height === CANVAS_HEIGHT) return;
  const oldWidth = CANVAS_WIDTH;
  const oldHeight = CANVAS_HEIGHT;
  setCanvasSize(next.width, next.height);
  school.resize(next.width / oldWidth, next.height / oldHeight);
  renderer.resize(next.width, next.height, oldWidth, oldHeight);
});

// ---- Render loop with pause + frame cap -------------------------------------
let paused = false;
let frameInterval = 0; // ms; 0 = uncapped (display refresh rate)
let accumulator = 0;
let simulationTime = 0;
let previousTime = performance.now();
let lastDraw = 0;
let frame = 0;

const animate = (now: number): void => {
  frame = requestAnimationFrame(animate);
  if (frameInterval > 0 && now - lastDraw < frameInterval - 1) return;
  lastDraw = now;
  accumulator += Math.min((now - previousTime) / 1000, 0.1);
  previousTime = now;
  while (accumulator >= FIXED_STEP) {
    simulationTime += FIXED_STEP;
    school.update(FIXED_STEP, simulationTime);
    accumulator -= FIXED_STEP;
  }
  renderer.draw(school, simulationTime, false);
};
frame = requestAnimationFrame(animate);

// ---- Ambient audio -----------------------------------------------------------
let audioContext: AudioContext | null = null;
let audioGain: GainNode | null = null;
let audioLoading: Promise<void> | null = null;
let soundOn = false;

async function ensureAudio(): Promise<void> {
  if (audioContext) {
    await audioContext.resume();
    return;
  }
  if (audioLoading) return audioLoading;
  audioLoading = (async () => {
    const context = new AudioContext();
    const gain = context.createGain();
    gain.gain.value = 0;
    gain.connect(context.destination);
    const response = await fetch(`/${AUDIO.ambient.source}`);
    const buffer = await context.decodeAudioData(await response.arrayBuffer());
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    source.connect(gain);
    source.start();
    audioContext = context;
    audioGain = gain;
    await context.resume();
  })();
  try {
    await audioLoading;
  } finally {
    audioLoading = null;
  }
}

function applyVolume(): void {
  if (!audioContext || !audioGain) return;
  const now = audioContext.currentTime;
  audioGain.gain.cancelScheduledValues(now);
  audioGain.gain.setValueAtTime(audioGain.gain.value, now);
  audioGain.gain.linearRampToValueAtTime(
    soundOn && !paused ? AUDIO.ambient.volume : 0,
    now + AUDIO.toggleFadeSeconds,
  );
}

// ---- Host API ----------------------------------------------------------------
const api = {
  /** Call the fish to a point given in 0..1 fractions of the viewport. */
  callTo(fx: number, fy: number): void {
    school.callTo(vec(clamp(fx, 0, 1) * CANVAS_WIDTH, clamp(fy, 0, 1) * CANVAS_HEIGHT));
  },
  scatter(): void {
    school.scatter();
  },
  reset(): void {
    school.reset();
  },
  setPaused(value: boolean): void {
    if (paused === value) return;
    paused = value;
    if (paused) {
      cancelAnimationFrame(frame);
    } else {
      previousTime = performance.now();
      frame = requestAnimationFrame(animate);
    }
    applyVolume();
  },
  setFrameCap(fps: number): void {
    frameInterval = fps > 0 ? 1000 / fps : 0;
  },
  setWeather(id: string): void {
    if (WEATHER_PRESETS.some((p) => p.id === id)) settings.setWeather(id as WeatherPresetId);
  },
  setRain(on: boolean): void {
    settings.setRain(on);
  },
  setKoiCount(count: number): void {
    settings.set(["koi", "initialCount"], clamp(Math.round(count), 1, 48));
  },
  setSound(on: boolean): void {
    soundOn = on;
    if (on) void ensureAudio().then(applyVolume).catch(() => undefined);
    else applyVolume();
  },
  state() {
    const meta = settings.meta();
    return { weather: meta.weather, rain: meta.rain, koi: school.count };
  },
};

declare global {
  interface Window {
    koipond: typeof api;
    webkit?: { messageHandlers?: Record<string, { postMessage(v: unknown): void }> };
  }
}
window.koipond = api;
window.webkit?.messageHandlers?.koipond?.postMessage({ ready: true, ...api.state() });
