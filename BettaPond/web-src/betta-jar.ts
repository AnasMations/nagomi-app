// Betta Jar — a side-view desktop scene: a glass jar hanging from a braided
// rope against a tiled wall, with one dark-blue betta living inside.
// Plain Canvas 2D, no dependencies. Exposes `window.koipond` for the macOS host.

type Vec = { x: number; y: number };
type RGB = [number, number, number];

// ---------------------------------------------------------------------------
// Canvas + sizing
// ---------------------------------------------------------------------------

const canvas = document.querySelector<HTMLCanvasElement>("#pond")!;
const ctx = canvas.getContext("2d")!;
let W = 0; // CSS px
let H = 0;
let DPR = 1;

// Jar geometry is authored in "jar units": the body is 1000 tall, 580 wide,
// centred on (0, 0). K converts jar units to CSS px.
let K = 1;
let JAR_X = 0;
let JAR_Y = 0;

const BODY_HW = 290;
const BODY_TOP = -500;
const BODY_BOTTOM = 500;
const GLASS = 14;
const NECK_HW = 236;
const NECK_TOP = -560;
const LID_HW = 258;
const LID_TOP = -690;
const WATER_TOP = -440;
const SAND_TOP = 408;
const INNER_HW = BODY_HW - GLASS;
const INNER_BOTTOM = BODY_BOTTOM - GLASS;
const FISH_L = 205; // nose-to-peduncle length in jar units

let wallCache: HTMLCanvasElement | null = null;
let shadowCache: HTMLCanvasElement | null = null;
let sandCache: HTMLCanvasElement | null = null;
let backCache: HTMLCanvasElement | null = null;
let frontCache: HTMLCanvasElement | null = null;

function resize(): void {
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = Math.round(W * DPR);
  canvas.height = Math.round(H * DPR);
  canvas.style.width = `${W}px`;
  canvas.style.height = `${H}px`;
  K = (Math.min(H, W * 1.15) * 0.6) / 1000;
  JAR_X = W * 0.5;
  JAR_Y = H * 0.1 + -LID_TOP * K + 10 * K;
  wallCache = buildWall();
  sandCache = buildSand();
  ropeCache = null;
  setLayerRect(layerRect, 60);
  backCache = buildLayer(layerRect, (c) => drawRope(c, ropes().band, 0.9, 3));
  frontCache = buildLayer(layerRect, drawJarFront);
  setLayerRect(shadowRect, 140);
  shadowCache = buildShadow();
  ropePattern = buildRopePattern();
  resetPhysics();
}

/** Screen-space rectangle (at the jar's rest pose) that a cached layer covers. */
type Rect = { x: number; y: number; w: number; h: number };
const layerRect: Rect = { x: 0, y: 0, w: 1, h: 1 };
const shadowRect: Rect = { x: 0, y: 0, w: 1, h: 1 };

function setLayerRect(r: Rect, margin: number): void {
  r.x = Math.floor(JAR_X - (BODY_HW + margin) * K);
  r.y = Math.floor(JAR_Y + (LID_TOP - margin) * K);
  r.w = Math.ceil((BODY_HW + margin) * 2 * K);
  r.h = Math.ceil((BODY_BOTTOM - LID_TOP + margin * 2) * K);
}

/** Renders static jar-space art once, at rest, into a bitmap covering `r`. */
function buildLayer(r: Rect, paint: (c: CanvasRenderingContext2D) => void): HTMLCanvasElement {
  const [c, g] = makeCanvas(r.w * DPR, r.h * DPR);
  g.scale(DPR, DPR);
  g.translate(JAR_X - r.x, JAR_Y - r.y);
  g.scale(K, K);
  paint(g);
  return c;
}

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const smooth = (t: number) => t * t * (3 - 2 * t);

function mulberry(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Smooth closed curve through points (Catmull-Rom → Bézier). */
function closedCurve(c: CanvasRenderingContext2D, pts: Vec[]): void {
  const n = pts.length;
  c.moveTo(pts[0].x, pts[0].y);
  for (let i = 0; i < n; i += 1) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    c.bezierCurveTo(
      p1.x + (p2.x - p0.x) / 6,
      p1.y + (p2.y - p0.y) / 6,
      p2.x - (p3.x - p1.x) / 6,
      p2.y - (p3.y - p1.y) / 6,
      p2.x,
      p2.y,
    );
  }
  c.closePath();
}

function openCurve(c: CanvasRenderingContext2D, pts: Vec[]): void {
  c.moveTo(pts[0].x, pts[0].y);
  for (let i = 0; i < pts.length - 1; i += 1) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    c.bezierCurveTo(
      p1.x + (p2.x - p0.x) / 6,
      p1.y + (p2.y - p0.y) / 6,
      p2.x - (p3.x - p1.x) / 6,
      p2.y - (p3.y - p1.y) / 6,
      p2.x,
      p2.y,
    );
  }
}

/** Jar silhouette (body + shoulders + neck), in jar units. */
function jarBodyPath(c: CanvasRenderingContext2D, inset = 0): void {
  const hw = BODY_HW - inset;
  const top = BODY_TOP + inset;
  const bottom = BODY_BOTTOM - inset;
  const neck = NECK_HW - inset;
  const r = 95 - inset * 0.5;
  const rb = 70 - inset * 0.5;
  c.moveTo(-neck, NECK_TOP + (inset ? inset : 0));
  c.lineTo(-neck, top - 8);
  c.quadraticCurveTo(-neck, top + 6, -neck - 18, top + 10);
  c.quadraticCurveTo(-hw, top + 20, -hw, top + r);
  c.lineTo(-hw, bottom - rb);
  c.quadraticCurveTo(-hw, bottom, -hw + rb, bottom);
  c.lineTo(hw - rb, bottom);
  c.quadraticCurveTo(hw, bottom, hw, bottom - rb);
  c.lineTo(hw, top + r);
  c.quadraticCurveTo(hw, top + 20, neck + 18, top + 10);
  c.quadraticCurveTo(neck, top + 6, neck, top - 8);
  c.lineTo(neck, NECK_TOP + (inset ? inset : 0));
  c.closePath();
}

function roundRect(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  c.moveTo(x + r, y);
  c.lineTo(x + w - r, y);
  c.quadraticCurveTo(x + w, y, x + w, y + r);
  c.lineTo(x + w, y + h - r);
  c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  c.lineTo(x + r, y + h);
  c.quadraticCurveTo(x, y + h, x, y + h - r);
  c.lineTo(x, y + r);
  c.quadraticCurveTo(x, y, x + r, y);
  c.closePath();
}

// ---------------------------------------------------------------------------
// Static caches: wall, jar shadow, sand
// ---------------------------------------------------------------------------

function makeCanvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement("canvas");
  c.width = Math.max(1, Math.round(w));
  c.height = Math.max(1, Math.round(h));
  return [c, c.getContext("2d")!];
}

function buildWall(): HTMLCanvasElement {
  const [c, g] = makeCanvas(W * DPR, H * DPR);
  g.scale(DPR, DPR);
  const bg = g.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#eef0ef");
  bg.addColorStop(1, "#dfe2e1");
  g.fillStyle = bg;
  g.fillRect(0, 0, W, H);

  // Glossy ceramic tiles, offset so the grout meets the jar's centreline.
  const tile = H * 0.205;
  const tileW = tile * 0.98;
  const rng = mulberry(7);
  const x0 = (W / 2) % tileW - tileW;
  const y0 = (H * 0.46) % tile - tile;
  for (let y = y0; y < H + tile; y += tile) {
    for (let x = x0; x < W + tileW; x += tileW) {
      const shade = rng() * 0.035;
      g.fillStyle = `rgba(0,0,0,${shade})`;
      g.fillRect(x, y, tileW, tile);
      // soft sheen
      const sheen = g.createLinearGradient(x, y, x + tileW, y + tile);
      sheen.addColorStop(0, "rgba(255,255,255,0.22)");
      sheen.addColorStop(0.45, "rgba(255,255,255,0)");
      sheen.addColorStop(1, "rgba(0,0,0,0.03)");
      g.fillStyle = sheen;
      g.fillRect(x, y, tileW, tile);
    }
  }
  const grout = Math.max(1.5, H * 0.0028);
  g.fillStyle = "rgba(120,126,124,0.28)";
  for (let y = y0; y < H + tile; y += tile) g.fillRect(0, y, W, grout);
  for (let x = x0; x < W + tileW; x += tileW) g.fillRect(x, 0, grout, H);
  g.fillStyle = "rgba(255,255,255,0.5)";
  for (let y = y0; y < H + tile; y += tile) g.fillRect(0, y + grout, W, 1);
  for (let x = x0; x < W + tileW; x += tileW) g.fillRect(x + grout, 0, 1, H);

  // gentle vignette
  const v = g.createRadialGradient(W / 2, H * 0.45, H * 0.2, W / 2, H * 0.5, Math.max(W, H) * 0.85);
  v.addColorStop(0, "rgba(0,0,0,0)");
  v.addColorStop(1, "rgba(40,45,50,0.22)");
  g.fillStyle = v;
  g.fillRect(0, 0, W, H);
  return c;
}

function buildShadow(): HTMLCanvasElement {
  const [c, g] = makeCanvas(shadowRect.w * DPR, shadowRect.h * DPR);
  g.scale(DPR, DPR);
  const off = 20000;
  g.save();
  g.translate(JAR_X - shadowRect.x - off, JAR_Y - shadowRect.y);
  g.scale(K, K);
  g.shadowColor = "rgba(30,38,40,0.30)";
  g.shadowBlur = 38 * K * DPR;
  g.shadowOffsetX = off * DPR;
  g.fillStyle = "#000";
  g.beginPath();
  jarBodyPath(g);
  roundRect(g, -LID_HW, LID_TOP, LID_HW * 2, NECK_TOP - LID_TOP + 20, 26);
  g.fill();
  g.restore();
  return c;
}

function buildSand(): HTMLCanvasElement {
  // sand strip in jar units, rendered at screen resolution
  const wJU = INNER_HW * 2;
  const hJU = INNER_BOTTOM - SAND_TOP + 30;
  const [c, g] = makeCanvas(wJU * K * DPR, hJU * K * DPR);
  g.scale(K * DPR, K * DPR);
  const rng = mulberry(11);
  // bumpy top
  g.beginPath();
  g.moveTo(0, hJU);
  for (let x = 0; x <= wJU; x += 12) {
    const y = 30 + Math.sin(x * 0.02) * 6 + Math.sin(x * 0.057 + 1) * 4 - (x > wJU * 0.55 ? 8 : 0) * Math.sin(((x - wJU * 0.55) / (wJU * 0.45)) * Math.PI);
    g.lineTo(x, y);
  }
  g.lineTo(wJU, hJU);
  g.closePath();
  const sand = g.createLinearGradient(0, 20, 0, hJU);
  sand.addColorStop(0, "#efeae2");
  sand.addColorStop(1, "#d8d0c4");
  g.fillStyle = sand;
  g.fill();
  g.save();
  g.clip();
  for (let i = 0; i < 1400; i += 1) {
    const x = rng() * wJU;
    const y = 20 + rng() * (hJU - 20);
    const r = 0.8 + rng() * 2.2;
    const tone = rng();
    g.fillStyle =
      tone < 0.55 ? "rgba(120,110,95,0.35)" : tone < 0.85 ? "rgba(255,255,255,0.7)" : "rgba(60,55,50,0.45)";
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.fill();
  }
  // coloured gravel, like the jar in the photo
  const gravel = ["#d8262e", "#1f63d6", "#e0302a", "#2a7de0", "#f2c230", "#c61f2f"];
  for (let i = 0; i < 26; i += 1) {
    const x = rng() < 0.6 ? rng() * wJU * 0.32 : rng() * wJU;
    const y = 34 + rng() * 26;
    const rx = 7 + rng() * 11;
    g.fillStyle = gravel[Math.floor(rng() * gravel.length)];
    g.beginPath();
    g.ellipse(x, y, rx, rx * (0.6 + rng() * 0.3), rng() * Math.PI, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = "rgba(255,255,255,0.35)";
    g.beginPath();
    g.ellipse(x - rx * 0.3, y - rx * 0.25, rx * 0.3, rx * 0.18, 0, 0, Math.PI * 2);
    g.fill();
  }
  g.restore();
  return c;
}

// ---------------------------------------------------------------------------
// Lighting presets (host calls setWeather(id); ids kept from the old app)
// ---------------------------------------------------------------------------

interface Light {
  tint: RGB; // multiplied over the whole scene
  glow: number; // warm/cool light shaft strength
  glowColor: RGB;
  haze: number;
}

const LIGHTS: Record<string, Light> = {
  sunny: { tint: [255, 255, 252], glow: 0.16, glowColor: [255, 250, 235], haze: 0 },
  "deep-clear": { tint: [228, 238, 250], glow: 0.12, glowColor: [220, 235, 255], haze: 0 },
  overcast: { tint: [205, 210, 214], glow: 0.02, glowColor: [230, 235, 240], haze: 0.04 },
  mist: { tint: [226, 232, 234], glow: 0.05, glowColor: [255, 255, 255], haze: 0.16 },
  sunset: { tint: [255, 212, 170], glow: 0.26, glowColor: [255, 170, 90], haze: 0 },
  moonlight: { tint: [62, 78, 122], glow: 0.1, glowColor: [120, 150, 230], haze: 0 },
  rain: { tint: [168, 178, 192], glow: 0.02, glowColor: [200, 210, 225], haze: 0.06 },
};
let lightId = "sunny";
const light: Light = structuredClone(LIGHTS.sunny);

function stepLight(dt: number): void {
  const target = LIGHTS[lightId] ?? LIGHTS.sunny;
  const t = 1 - Math.exp(-dt * 1.2);
  for (let i = 0; i < 3; i += 1) {
    light.tint[i] = lerp(light.tint[i], target.tint[i], t);
    light.glowColor[i] = lerp(light.glowColor[i], target.glowColor[i], t);
  }
  light.glow = lerp(light.glow, target.glow, t);
  light.haze = lerp(light.haze, target.haze, t);
}

// ---------------------------------------------------------------------------
// The betta
// ---------------------------------------------------------------------------

// ---- Mood -----------------------------------------------------------------
// Bettas get bored and lonely. If nobody plays with her (clicks her, or moves
// her jar) she slowly turns dull and dark, clamps her fins and tail, and mopes
// on the bottom. Playing brings her colour and fins straight back.

const MOOD_KEY = "bettajar:lastPlay";
const SAD_START_MIN = 10; // content for this long after playing
const SAD_FULL_MIN = 40; // fully sad after this long
let lastPlay = Date.now();
let idleOffsetMs = 0; // debug: pretend extra idle time
let sadness = 0; // 0 = happy, 1 = very sad (smoothed)
let moodBucket = "";

try {
  const saved = Number(localStorage.getItem(MOOD_KEY));
  if (saved > 0 && saved <= Date.now()) lastPlay = saved;
  else localStorage.setItem(MOOD_KEY, String(lastPlay));
} catch {
  /* storage unavailable: mood simply starts fresh each launch */
}

function played(): void {
  const wasSad = sadness;
  lastPlay = Date.now();
  idleOffsetMs = 0;
  try {
    localStorage.setItem(MOOD_KEY, String(lastPlay));
  } catch {
    /* ignore */
  }
  if (wasSad > 0.35) cheerUp = 1;
}

let cheerUp = 0; // >0 while she's perking up after being sad

function targetSadness(): number {
  const idleMin = (Date.now() - lastPlay + idleOffsetMs) / 60000;
  const t = clamp((idleMin - SAD_START_MIN) / (SAD_FULL_MIN - SAD_START_MIN), 0, 1);
  return smooth(t);
}

sadness = targetSadness(); // start in whatever mood she was left in

function stepMood(dt: number): void {
  const target = targetSadness();
  // brightening up is quick, fading is slow
  const rate = target < sadness ? 0.5 : 0.05;
  sadness = clamp(lerp(sadness, target, 1 - Math.exp(-dt * rate)), 0, 1);
  if (Math.abs(target - sadness) < 0.002) sadness = target;
  cheerUp = Math.max(0, cheerUp - dt / 6);
  const bucket = sadness < 0.25 ? "happy" : sadness < 0.7 ? "lonely" : "sad";
  if (bucket !== moodBucket) {
    moodBucket = bucket;
    window.webkit?.messageHandlers?.koipond?.postMessage({ mood: bucket });
  }
}

type RGBA = [number, number, number, number];
function mixColor(happy: RGBA, sad: RGBA): string {
  const t = sadness;
  const r = Math.round(lerp(happy[0], sad[0], t));
  const g = Math.round(lerp(happy[1], sad[1], t));
  const b = Math.round(lerp(happy[2], sad[2], t));
  const a = lerp(happy[3], sad[3], t);
  return `rgba(${r},${g},${b},${a.toFixed(3)})`;
}

type Mode = "wander" | "hover" | "surface" | "rest" | "called" | "dart" | "flare";

const fish = {
  x: -40,
  y: 180,
  vx: 0,
  vy: 0,
  facing: -1, // -1 = facing left
  turn: 1, // visual x-scale, animates between -1..1 during a turn
  pitch: 0,
  phase: 0,
  finPhase: 0,
  effort: 0.3,
  flare: 0,
  mode: "hover" as Mode,
  modeTime: 0,
  modeDuration: 2,
  tx: -40,
  ty: 180,
  speed: 60,
  gulped: false,
};

const waterBounds = () => ({
  minY: WATER_TOP + FISH_L * 0.62,
  maxY: SAND_TOP - FISH_L * 0.62,
});

function xRangeFor(facing: number): [number, number] {
  const front = FISH_L * 0.62;
  const back = FISH_L * 0.95;
  return facing > 0 ? [-INNER_HW + back, INNER_HW - front] : [-INNER_HW + front, INNER_HW - back];
}

function setMode(mode: Mode, duration = 3): void {
  fish.mode = mode;
  fish.modeTime = 0;
  fish.modeDuration = duration;
  fish.gulped = false;
  const { minY, maxY } = waterBounds();
  switch (mode) {
    case "wander": {
      fish.tx = rand(-INNER_HW + FISH_L * 0.7, INNER_HW - FISH_L * 0.7);
      // a sad fish keeps low in the jar
      fish.ty = rand(lerp(minY, (minY + maxY) / 2, sadness), maxY);
      fish.speed = rand(45, 75) * (1 - 0.55 * sadness);
      break;
    }
    case "surface":
      fish.tx = clamp(fish.x + rand(-90, 90), -INNER_HW + FISH_L, INNER_HW - FISH_L);
      fish.ty = WATER_TOP + FISH_L * 0.24;
      fish.speed = 70;
      break;
    case "rest": {
      // when sad she mopes in a corner on the bottom
      const corner = (fish.x < 0 ? -1 : 1) * (INNER_HW - FISH_L * 0.9);
      fish.tx = clamp(lerp(fish.x + rand(-60, 60), corner, sadness), -INNER_HW + FISH_L * 0.7, INNER_HW - FISH_L * 0.7);
      fish.ty = maxY + FISH_L * (0.12 + 0.04 * sadness);
      fish.speed = 35 * (1 - 0.4 * sadness);
      break;
    }
    case "dart":
      fish.tx = fish.x > 0 ? rand(-INNER_HW + FISH_L, -40) : rand(40, INNER_HW - FISH_L);
      fish.ty = rand(minY, maxY);
      fish.speed = 260;
      break;
    case "hover":
    case "flare":
      fish.tx = fish.x;
      fish.ty = fish.y;
      fish.speed = 20;
      break;
    case "called":
      fish.speed = 150;
      break;
  }
}

function nextMode(): void {
  if (cheerUp > 0.4 && Math.random() < 0.6) {
    setMode("flare", rand(1.4, 2.2)); // happy to see you again
    return;
  }
  const s = sadness;
  const weights: Array<[Mode, number, number]> = [
    ["wander", 0.42 * (1 - 0.75 * s), rand(4, 9)],
    ["hover", 0.2, rand(2, 5) * (1 + s)],
    ["surface", 0.14 * (1 - 0.6 * s), 7],
    ["rest", 0.14 + 0.9 * s, rand(5, 10) * (1 + 2.5 * s)],
    ["flare", 0.1 * (1 - s), rand(1.6, 2.6)],
  ];
  const total = weights.reduce((sum, w) => sum + w[1], 0);
  let r = Math.random() * total;
  for (const [mode, weight, duration] of weights) {
    r -= weight;
    if (r <= 0) {
      setMode(mode, duration);
      return;
    }
  }
  setMode("hover", 3);
}

function updateFish(dt: number, time: number): void {
  fish.modeTime += dt;
  const dx = fish.tx - fish.x;
  const dy = fish.ty - fish.y;
  const dist = Math.hypot(dx, dy);
  const moving = fish.mode !== "hover" && fish.mode !== "flare";

  // Desired velocity (arrive behaviour).
  let dvx = 0;
  let dvy = 0;
  if (moving && dist > 2) {
    const s = fish.speed * clamp(dist / 60, 0.15, 1);
    dvx = (dx / dist) * s;
    dvy = (dy / dist) * s * 0.8;
  }
  // idle bob
  dvy += Math.sin(time * 0.9 + 1.3) * 4;
  const accel = fish.mode === "dart" ? 6 : 2.2;
  fish.vx = lerp(fish.vx, dvx, 1 - Math.exp(-dt * accel));
  fish.vy = lerp(fish.vy, dvy, 1 - Math.exp(-dt * accel));

  // Turn to face travel direction (or the target while hovering).
  const want = Math.abs(fish.vx) > 6 ? Math.sign(fish.vx) : fish.facing;
  if (want !== fish.facing) fish.facing = want;
  fish.turn = lerp(fish.turn, fish.facing, 1 - Math.exp(-dt * 5));

  fish.x += fish.vx * dt;
  fish.y += fish.vy * dt;

  // Keep the fish (and its tail) inside the glass for its current facing.
  const [x0, x1] = xRangeFor(fish.facing);
  const { minY, maxY } = waterBounds();
  if (fish.x < x0) fish.x = lerp(fish.x, x0, 1 - Math.exp(-dt * 4));
  if (fish.x > x1) fish.x = lerp(fish.x, x1, 1 - Math.exp(-dt * 4));
  fish.y = clamp(fish.y, fish.mode === "surface" ? WATER_TOP + FISH_L * 0.2 : minY, maxY + FISH_L * 0.14);

  const speed = Math.hypot(fish.vx, fish.vy);
  fish.effort = lerp(fish.effort, clamp(speed / 120, 0.12, 1), 1 - Math.exp(-dt * 3));
  const droop = sadness * (fish.mode === "rest" || fish.mode === "hover" ? 0.16 : 0.06);
  fish.pitch = lerp(fish.pitch, clamp((fish.vy / Math.max(40, Math.abs(fish.vx) + 30)) * 0.5 + droop, -0.45, 0.45), 1 - Math.exp(-dt * 3));
  fish.phase += dt * (2.2 + fish.effort * 9) * (1 - 0.35 * sadness);
  fish.finPhase += dt * (1.3 + fish.effort * 2.5) * (1 - 0.5 * sadness);
  fish.flare = lerp(fish.flare, fish.mode === "flare" ? 1 : 0, 1 - Math.exp(-dt * 4));

  if (fish.mode === "surface" && dist < 12 && !fish.gulped) {
    fish.gulped = true;
    ripple = 1;
    spawnBubble(mouthWorld(), 5, true);
    spawnBubble(mouthWorld(), 3.5, true);
    fish.modeTime = fish.modeDuration - 1.2;
  }
  const arrived = moving && dist < 8;
  if (fish.modeTime > fish.modeDuration || (arrived && fish.mode === "wander") || (arrived && fish.mode === "dart")) {
    if (fish.mode === "called") setMode("hover", 2.5);
    else nextMode();
  }
}

function mouthWorld(): Vec {
  const c = Math.cos(fish.pitch);
  const s = Math.sin(fish.pitch);
  const lx = 0.56 * FISH_L * fish.turn;
  const ly = -0.02 * FISH_L;
  return { x: fish.x + lx * c - ly * s, y: fish.y + lx * s + ly * c };
}

// ---- fish drawing (fish-local units: nose at +0.5, peduncle at -0.5) --------

function spineY(x: number): number {
  const u = clamp((0.5 - x) / 1.9, 0, 1);
  const amp = 0.02 + 0.06 * fish.effort;
  return amp * Math.pow(u, 1.5) * Math.sin(fish.phase - (0.5 - x) * 4.2);
}

function bodyDepth(u: number): number {
  const k = Math.min(1, (u + 0.04) / 0.9);
  return 0.075 + 0.19 * Math.pow(Math.sin(Math.PI * k), 0.75);
}

function bodyOutline(): Vec[] {
  const top: Vec[] = [];
  const bottom: Vec[] = [];
  const n = 18;
  for (let i = 0; i <= n; i += 1) {
    const u = i / n;
    const x = 0.5 - u;
    const d = bodyDepth(u);
    const y = spineY(x);
    top.push({ x, y: y - d * 0.92 });
    bottom.push({ x, y: y + d * 1.08 });
  }
  const noseY = spineY(0.5);
  return [
    ...top,
    ...bottom.reverse(),
    { x: 0.54, y: noseY + 0.08 },
    { x: 0.565, y: noseY - 0.01 },
    { x: 0.545, y: noseY - 0.08 },
  ];
}

/** Moves a fin point with the body wave, a trailing ripple, drape and flare. */
function flow(p: Vec, rootX: number, rootY: number, extra = 1): Vec {
  const back = clamp((rootX - p.x) / 0.9, 0, 1.4);
  const reach = Math.hypot(p.x - rootX, p.y - rootY);
  const stream = clamp(fish.effort * 1.2 - 0.1, 0, 1);
  const flare = fish.flare;
  // clamped fins: held tight to the body, the tail folded like a closed fan
  const clampFins = sadness * (1 - flare);
  let x = rootX + (p.x - rootX) * (1 + 0.1 * stream + 0.12 * flare) * (1 - 0.3 * clampFins);
  let y = rootY + (p.y - rootY) * (1 - 0.2 * stream + 0.16 * flare) * (1 - 0.62 * clampFins);
  y += spineY(x);
  y += (1 - stream) * (1 - flare) * (1 - 0.6 * clampFins) * 0.1 * Math.pow(reach, 1.3); // drape
  const ripple = Math.sin(fish.finPhase * 2.2 - reach * 7 + p.y * 3) * 0.035 * reach * extra * (1 - 0.6 * clampFins);
  x += ripple * 0.5;
  y += ripple;
  x -= back * 0.02 * Math.sin(fish.finPhase * 1.7 + p.y * 4);
  return { x, y };
}

const CAUDAL: Vec[] = [
  { x: -0.44, y: -0.07 }, { x: -0.6, y: -0.3 }, { x: -0.82, y: -0.5 }, { x: -1.02, y: -0.6 },
  { x: -1.22, y: -0.5 }, { x: -1.34, y: -0.26 }, { x: -1.38, y: 0.02 }, { x: -1.34, y: 0.3 },
  { x: -1.2, y: 0.56 }, { x: -0.98, y: 0.68 }, { x: -0.78, y: 0.56 }, { x: -0.58, y: 0.3 },
  { x: -0.44, y: 0.08 },
];
const DORSAL: Vec[] = [
  { x: 0.04, y: -0.24 }, { x: -0.06, y: -0.4 }, { x: -0.26, y: -0.55 }, { x: -0.5, y: -0.62 },
  { x: -0.7, y: -0.56 }, { x: -0.62, y: -0.3 }, { x: -0.46, y: -0.1 }, { x: -0.2, y: -0.2 },
];
const ANAL: Vec[] = [
  { x: 0.14, y: 0.2 }, { x: 0.02, y: 0.44 }, { x: -0.2, y: 0.62 }, { x: -0.46, y: 0.74 },
  { x: -0.72, y: 0.72 }, { x: -0.8, y: 0.54 }, { x: -0.58, y: 0.18 }, { x: -0.44, y: 0.04 },
  { x: -0.1, y: 0.15 },
];
const VENTRAL: Vec[] = [
  { x: 0.24, y: 0.27 }, { x: 0.16, y: 0.46 }, { x: 0.07, y: 0.68 }, { x: 0.03, y: 0.73 },
  { x: 0.1, y: 0.52 }, { x: 0.19, y: 0.31 },
];

function finGradient(c: CanvasRenderingContext2D, x: number, y: number, r: number): CanvasGradient {
  const g = c.createRadialGradient(x, y, 0.02, x, y, r);
  g.addColorStop(0, mixColor([10, 16, 42, 0.98], [10, 11, 20, 0.98]));
  g.addColorStop(0.45, mixColor([20, 40, 108, 0.95], [20, 23, 38, 0.95]));
  g.addColorStop(0.8, mixColor([26, 52, 134, 0.88], [24, 27, 42, 0.9]));
  g.addColorStop(1, mixColor([8, 13, 36, 0.82], [6, 7, 11, 0.85]));
  return g;
}

function drawFin(
  c: CanvasRenderingContext2D,
  shape: Vec[],
  rootX: number,
  rootY: number,
  radius: number,
  rayOrigin: Vec,
  rays: number,
  extra = 1,
): void {
  const pts = shape.map((p) => flow(p, rootX, rootY, extra));
  c.beginPath();
  closedCurve(c, pts);
  c.fillStyle = finGradient(c, rootX, rootY, radius);
  c.fill();
  // fin rays
  c.save();
  c.clip();
  c.lineWidth = 0.008;
  const origin = flow(rayOrigin, rootX, rootY, extra);
  const light = new Path2D();
  const dark = new Path2D();
  for (let i = 0; i < rays; i += 1) {
    const t = (i + 0.5) / rays;
    const idx = t * (pts.length - 1);
    const a = pts[Math.floor(idx)];
    const b = pts[Math.min(pts.length - 1, Math.floor(idx) + 1)];
    const f = idx - Math.floor(idx);
    const tip = { x: lerp(a.x, b.x, f), y: lerp(a.y, b.y, f) };
    const mid = { x: lerp(origin.x, tip.x, 0.55), y: lerp(origin.y, tip.y, 0.55) + 0.02 * Math.sin(i + fish.finPhase) };
    const path = i % 2 ? light : dark;
    path.moveTo(origin.x, origin.y);
    path.quadraticCurveTo(mid.x, mid.y, tip.x, tip.y);
  }
  c.strokeStyle = mixColor([74, 122, 240, 0.3], [60, 66, 80, 0.12]);
  c.stroke(light);
  c.strokeStyle = "rgba(8,12,34,0.35)";
  c.stroke(dark);
  c.restore();
}

function drawBetta(c: CanvasRenderingContext2D): void {
  c.save();
  c.translate(fish.x, fish.y);
  c.rotate(fish.pitch * Math.sign(fish.turn || 1));
  const sx = fish.turn;
  // during a turn the fish is seen head-on for an instant: keep a minimum width
  const vis = Math.sign(sx || 1) * Math.max(0.12, Math.abs(sx));
  c.scale(vis * FISH_L, FISH_L);

  // far-side ventral streamer
  drawFin(c, VENTRAL.map((p) => ({ x: p.x - 0.04, y: p.y })), 0.2, 0.28, 0.5, { x: 0.2, y: 0.28 }, 3, 1.6);
  drawFin(c, ANAL, -0.2, 0.2, 0.75, { x: -0.1, y: 0.22 }, 12);
  drawFin(c, DORSAL, -0.3, -0.18, 0.6, { x: -0.25, y: -0.2 }, 10);
  drawFin(c, CAUDAL, -0.46, 0, 0.95, { x: -0.44, y: 0 }, 18);

  // body
  const outline = bodyOutline();
  c.beginPath();
  closedCurve(c, outline);
  const bg = c.createLinearGradient(0, -0.3, 0, 0.3);
  bg.addColorStop(0, mixColor([26, 42, 98, 1], [26, 28, 40, 1]));
  bg.addColorStop(0.35, mixColor([13, 22, 60, 1], [15, 17, 26, 1]));
  bg.addColorStop(0.75, mixColor([9, 15, 40, 1], [9, 10, 14, 1]));
  bg.addColorStop(1, mixColor([6, 9, 28, 1], [6, 6, 9, 1]));
  c.fillStyle = bg;
  c.fill();

  c.save();
  c.clip();
  // iridescent scales
  c.lineWidth = 0.009;
  const scaleBuckets = [new Path2D(), new Path2D(), new Path2D()];
  for (let row = -6; row <= 6; row += 1) {
    for (let col = 0; col < 18; col += 1) {
      const x = 0.34 - col * 0.05 + (row % 2 ? 0.025 : 0);
      const y = spineY(x) + row * 0.045;
      const shine = Math.max(0, Math.sin(col * 0.7 + row * 0.9 + fish.phase * 0.15));
      const path = scaleBuckets[Math.min(2, Math.floor(shine * 3))];
      path.moveTo(x + 0.03 * Math.cos(Math.PI * 0.55), y + 0.03 * Math.sin(Math.PI * 0.55));
      path.arc(x, y, 0.03, Math.PI * 0.55, Math.PI * 1.45);
    }
  }
  scaleBuckets.forEach((path, i) => {
    c.strokeStyle = mixColor([82, 136, 246, 0.2 + i * 0.12], [70, 76, 90, 0.05 + i * 0.03]);
    c.stroke(path);
  });
  // sheen along the back
  const sheen = c.createLinearGradient(0, -0.28, 0, 0.05);
  sheen.addColorStop(0, mixColor([96, 156, 255, 0.42], [90, 96, 110, 0.04]));
  sheen.addColorStop(1, "rgba(90,150,255,0)");
  c.fillStyle = sheen;
  c.fillRect(-0.6, -0.4, 1.3, 0.5);
  // stress stripes: faint pale horizontal bars show up on an unhappy betta
  if (sadness > 0.35) {
    const a = (sadness - 0.35) / 0.65;
    c.strokeStyle = `rgba(150,145,130,${0.2 * a})`;
    c.lineWidth = 0.03;
    for (const off of [-0.07, 0.02, 0.11]) {
      c.beginPath();
      for (let x = 0.24; x >= -0.42; x -= 0.04) {
        const y = spineY(x) + off;
        if (x === 0.24) c.moveTo(x, y);
        else c.lineTo(x, y);
      }
      c.stroke();
    }
  }
  // gill plate
  c.strokeStyle = "rgba(4,6,18,0.55)";
  c.lineWidth = 0.014;
  const gy = spineY(0.26);
  c.beginPath();
  c.moveTo(0.27, gy - 0.18);
  c.quadraticCurveTo(0.2 - fish.flare * 0.04, gy, 0.27, gy + 0.2);
  c.stroke();
  if (fish.flare > 0.05) {
    c.fillStyle = `rgba(150,30,50,${0.5 * fish.flare})`;
    c.beginPath();
    c.ellipse(0.22, gy + 0.08, 0.05 * fish.flare, 0.12, 0, 0, Math.PI * 2);
    c.fill();
  }
  c.restore();

  // eye
  const ey = spineY(0.4) - 0.045;
  c.fillStyle = "#05070f";
  c.beginPath();
  c.arc(0.39, ey, 0.052, 0, Math.PI * 2);
  c.fill();
  c.strokeStyle = "rgba(70,100,170,0.7)";
  c.lineWidth = 0.012;
  c.stroke();
  c.fillStyle = "rgba(255,255,255,0.85)";
  c.beginPath();
  c.arc(0.405, ey - 0.018, 0.013, 0, Math.PI * 2);
  c.fill();
  // mouth
  c.strokeStyle = "rgba(0,0,0,0.6)";
  c.lineWidth = 0.012;
  c.beginPath();
  const my = spineY(0.5);
  c.moveTo(0.555, my - 0.035);
  c.lineTo(0.49, my - 0.02);
  c.stroke();

  // near-side pectoral (translucent, fluttering) and ventral
  c.save();
  c.translate(0.24, spineY(0.24) + 0.06);
  c.rotate(0.5 + Math.sin(fish.phase * 1.6) * 0.35);
  c.fillStyle = "rgba(60,95,180,0.22)";
  c.beginPath();
  c.moveTo(0, -0.015);
  c.quadraticCurveTo(-0.1, -0.06, -0.15, 0);
  c.quadraticCurveTo(-0.1, 0.05, 0, 0.015);
  c.fill();
  c.restore();
  drawFin(c, VENTRAL, 0.22, 0.27, 0.5, { x: 0.22, y: 0.28 }, 3, 1.6);

  c.restore();
}

// ---------------------------------------------------------------------------
// Bubbles, bubble nest, surface
// ---------------------------------------------------------------------------

interface Bubble { x: number; y: number; r: number; vy: number; wob: number; alive: boolean; }
const bubbles: Bubble[] = [];
let bubblesOn = false;
let bubbleClock = 0;
let ripple = 0;

function spawnBubble(p: Vec, r: number, fromFish = false): void {
  if (bubbles.length > 90) return;
  bubbles.push({ x: p.x + rand(-4, 4), y: p.y, r: r * rand(0.8, 1.2), vy: fromFish ? -40 : -rand(60, 110), wob: rand(0, 6), alive: true });
}

const NEST = Array.from({ length: 22 }, (_, i) => {
  const r = mulberry(100 + i);
  return { x: INNER_HW - 40 - r() * 150, r: 4 + r() * 8, off: r() * 10 };
});

function updateBubbles(dt: number): void {
  if (bubblesOn) {
    bubbleClock += dt;
    while (bubbleClock > 0.09) {
      bubbleClock -= 0.09;
      spawnBubble({ x: -INNER_HW + 60 + rand(-8, 8), y: SAND_TOP + 10 }, rand(2.5, 6));
    }
  }
  for (const b of bubbles) {
    b.y += b.vy * dt;
    b.vy = Math.max(b.vy - 60 * dt, -160);
    b.wob += dt * 6;
    if (b.y < WATER_TOP + b.r) {
      b.alive = false;
      ripple = Math.min(1, ripple + 0.05);
    }
  }
  for (let i = bubbles.length - 1; i >= 0; i -= 1) if (!bubbles[i].alive) bubbles.splice(i, 1);
  ripple = Math.max(0, ripple - dt * 0.6);
}

function surfaceY(x: number, time: number): number {
  const edge = Math.pow(Math.abs(x) / INNER_HW, 8) * 12; // meniscus
  return WATER_TOP - edge + Math.tan(slosh) * x + Math.sin(x * 0.03 + time * 1.4) * (1.2 + ripple * 5) + Math.sin(x * 0.071 - time * 0.9) * (0.8 + ripple * 3);
}

// ---------------------------------------------------------------------------
// Rope
// ---------------------------------------------------------------------------

function sampleCurve(ctrl: Vec[], steps = 60): Vec[] {
  // Catmull-Rom sampling of an open curve
  const out: Vec[] = [];
  for (let i = 0; i < ctrl.length - 1; i += 1) {
    const p0 = ctrl[Math.max(0, i - 1)];
    const p1 = ctrl[i];
    const p2 = ctrl[i + 1];
    const p3 = ctrl[Math.min(ctrl.length - 1, i + 2)];
    const n = Math.max(2, Math.round(steps / (ctrl.length - 1)));
    for (let k = 0; k < n; k += 1) {
      const t = k / n;
      const t2 = t * t;
      const t3 = t2 * t;
      out.push({
        x: 0.5 * (2 * p1.x + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        y: 0.5 * (2 * p1.y + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
      });
    }
  }
  out.push(ctrl[ctrl.length - 1]);
  return out;
}

const ROPE_W = 30;

function drawRope(c: CanvasRenderingContext2D, pts: Vec[], alpha = 1, seed = 1): void {
  c.save();
  c.globalAlpha = alpha;
  c.lineCap = "round";
  c.lineJoin = "round";
  c.beginPath();
  c.moveTo(pts[0].x, pts[0].y);
  for (const p of pts) c.lineTo(p.x, p.y);
  c.strokeStyle = "rgba(95,100,105,0.9)";
  c.lineWidth = ROPE_W + 3;
  c.stroke();
  c.strokeStyle = "#dcdedf";
  c.lineWidth = ROPE_W;
  c.stroke();
  c.strokeStyle = "rgba(255,255,255,0.55)";
  c.lineWidth = ROPE_W * 0.3;
  c.stroke();

  // braid: slanted strands along the rope, some blue / black like the photo
  const rng = mulberry(seed);
  let acc = 0;
  let index = 0;
  for (let i = 1; i < pts.length; i += 1) {
    const a = pts[i - 1];
    const b = pts[i];
    const seg = Math.hypot(b.x - a.x, b.y - a.y);
    if (seg < 0.001) continue;
    const tx = (b.x - a.x) / seg;
    const ty = (b.y - a.y) / seg;
    const nx = -ty;
    const ny = tx;
    acc += seg;
    while (acc > ROPE_W * 0.3) {
      acc -= ROPE_W * 0.3;
      const f = 1 - acc / seg;
      const px = lerp(a.x, b.x, clamp(f, 0, 1));
      const py = lerp(a.y, b.y, clamp(f, 0, 1));
      const flip = index % 2 ? 1 : -1;
      const r = rng();
      c.strokeStyle =
        r < 0.07 ? "#1d5fc4" : r < 0.11 ? "#16181c" : flip > 0 ? "rgba(128,132,138,0.55)" : "rgba(250,250,252,0.9)";
      c.lineWidth = r < 0.11 ? ROPE_W * 0.24 : ROPE_W * 0.2;
      const hw = ROPE_W * 0.46;
      c.beginPath();
      c.moveTo(px + nx * hw - tx * hw * 0.55 * flip, py + ny * hw - ty * hw * 0.55 * flip);
      c.lineTo(px - nx * hw + tx * hw * 0.55 * flip, py - ny * hw + ty * hw * 0.55 * flip);
      c.stroke();
      index += 1;
    }
  }
  c.restore();
}

let ropeCache: { sides: Vec[]; neck: Vec[]; band: Vec[] } | null = null;

function ropes() {
  if (ropeCache) return ropeCache;
  const neckY = NECK_TOP + 22;
  const neck: Vec[] = [];
  for (let i = 0; i <= 40; i += 1) {
    const a = Math.PI * (i / 40); // front half of the loop
    neck.push({ x: -Math.cos(a) * (NECK_HW + 10), y: neckY + Math.sin(a) * 22 });
  }
  const o = BODY_HW + ROPE_W * 0.45;
  const sides = sampleCurve([
    { x: -NECK_HW - 8, y: neckY + 8 },
    { x: -BODY_HW + 20, y: BODY_TOP + 30 },
    { x: -o, y: BODY_TOP + 140 },
    { x: -o - 4, y: 60 },
    { x: -o, y: BODY_BOTTOM - 80 },
    { x: -BODY_HW + 40, y: BODY_BOTTOM + ROPE_W * 0.5 },
    { x: 0, y: BODY_BOTTOM + ROPE_W * 0.6 },
    { x: BODY_HW - 40, y: BODY_BOTTOM + ROPE_W * 0.5 },
    { x: o, y: BODY_BOTTOM - 80 },
    { x: o + 4, y: 60 },
    { x: o, y: BODY_TOP + 140 },
    { x: BODY_HW - 20, y: BODY_TOP + 30 },
    { x: NECK_HW + 8, y: neckY + 8 },
  ], 160);
  const band: Vec[] = [];
  for (let i = 0; i <= 40; i += 1) {
    const x = -BODY_HW + (i / 40) * BODY_HW * 2;
    band.push({ x, y: 170 - Math.cos((x / BODY_HW) * Math.PI * 0.5) * 16 });
  }
  ropeCache = { sides, neck, band };
  return ropeCache;
}

// ---------------------------------------------------------------------------
// Scene
// ---------------------------------------------------------------------------

function drawJarFront(c: CanvasRenderingContext2D): void {
  const r = ropes();
  // --- glass ---
  c.save();
  c.beginPath();
  jarBodyPath(c);
  c.strokeStyle = "rgba(120,135,135,0.55)";
  c.lineWidth = 5;
  c.stroke();
  c.fillStyle = "rgba(235,245,245,0.08)";
  c.fill();
  c.clip();
  // vertical specular streaks
  const streak = (x: number, w: number, a: number) => {
    const g = c.createLinearGradient(x - w, 0, x + w, 0);
    g.addColorStop(0, "rgba(255,255,255,0)");
    g.addColorStop(0.5, `rgba(255,255,255,${a})`);
    g.addColorStop(1, "rgba(255,255,255,0)");
    c.fillStyle = g;
    c.fillRect(x - w, BODY_TOP, w * 2, BODY_BOTTOM - BODY_TOP);
  };
  streak(-BODY_HW + 42, 26, 0.55);
  streak(-BODY_HW + 90, 10, 0.25);
  streak(BODY_HW - 60, 18, 0.35);
  // thick glass base
  const base = c.createLinearGradient(0, BODY_BOTTOM - 28, 0, BODY_BOTTOM);
  base.addColorStop(0, "rgba(200,215,212,0.25)");
  base.addColorStop(1, "rgba(150,170,168,0.6)");
  c.fillStyle = base;
  c.fillRect(-BODY_HW, BODY_BOTTOM - 28, BODY_HW * 2, 30);
  c.restore();

  // side strands + bottom cradle, then the front of the band
  drawRope(c, r.sides, 1, 5);

  // lid
  c.save();
  c.beginPath();
  roundRect(c, -LID_HW, LID_TOP, LID_HW * 2, NECK_TOP - LID_TOP + 18, 24);
  const lid = c.createLinearGradient(-LID_HW, 0, LID_HW, 0);
  lid.addColorStop(0, "rgba(214,222,222,0.92)");
  lid.addColorStop(0.3, "rgba(250,252,252,0.95)");
  lid.addColorStop(1, "rgba(196,204,204,0.92)");
  c.fillStyle = lid;
  c.fill();
  c.strokeStyle = "rgba(130,140,140,0.6)";
  c.lineWidth = 3;
  c.stroke();
  c.clip();
  c.strokeStyle = "rgba(150,160,160,0.35)";
  c.lineWidth = 3;
  for (let y = LID_TOP + 30; y < NECK_TOP + 10; y += 22) {
    c.beginPath();
    c.moveTo(-LID_HW, y);
    c.lineTo(LID_HW, y);
    c.stroke();
  }
  c.restore();

  // neck loop (the two hanging strands are drawn live, see drawHangingRopes)
  drawRope(c, r.neck, 1, 7);
}

// ---------------------------------------------------------------------------
// Physics: the jar is a rigid body hanging from two ropes (inextensible when
// taut, slack when pushed up). Position-based dynamics with substeps.
// ---------------------------------------------------------------------------

const NECK_ROPE_Y = NECK_TOP + 22;
const body = { x: 0, y: 0, a: 0, vx: 0, vy: 0, w: 0, ax: 0, ay: 0 };
const anchors: Vec[] = [{ x: 0, y: 0 }, { x: 0, y: 0 }];
const attach: Vec[] = [{ x: 0, y: 0 }, { x: 0, y: 0 }]; // local px (unrotated)
const ropeLen = [1, 1];
let GRAVITY = 20000;
let INERTIA = 1;
const grab = { active: false, local: { x: 0, y: 0 }, target: { x: 0, y: 0 } };
let slosh = 0; // water surface tilt (radians, jar frame)
let sloshV = 0;
let startleCooldown = 0;
let ropePattern: CanvasPattern | null = null;

function resetPhysics(): void {
  body.x = JAR_X;
  body.y = JAR_Y;
  body.a = 0;
  body.vx = body.vy = body.w = 0;
  body.ax = body.ay = 0;
  GRAVITY = 23 * H;
  const jarPx = (BODY_BOTTOM - LID_TOP) * K;
  INERTIA = (0.32 * jarPx) ** 2;
  for (const [i, side] of [-1, 1].entries()) {
    attach[i] = { x: side * (NECK_HW + 6) * K, y: NECK_ROPE_Y * K };
    anchors[i] = {
      x: JAR_X + side * (NECK_HW + 520) * K,
      y: JAR_Y + (NECK_ROPE_Y - 2600) * K,
    };
    ropeLen[i] = Math.hypot(anchors[i].x - (JAR_X + attach[i].x), anchors[i].y - (JAR_Y + attach[i].y));
  }
  slosh = sloshV = 0;
}

function toWorld(local: Vec): Vec {
  const c = Math.cos(body.a);
  const s = Math.sin(body.a);
  return { x: body.x + local.x * c - local.y * s, y: body.y + local.x * s + local.y * c };
}

function toLocal(world: Vec): Vec {
  const c = Math.cos(-body.a);
  const s = Math.sin(-body.a);
  const dx = world.x - body.x;
  const dy = world.y - body.y;
  return { x: dx * c - dy * s, y: dx * s + dy * c };
}

/** Moves the body so that world point `q` (attached at local `r`) shifts by -C along n. */
function solvePoint(local: Vec, n: Vec, C: number, stiffness: number): void {
  const q = toWorld(local);
  const rx = q.x - body.x;
  const ry = q.y - body.y;
  const cr = rx * n.y - ry * n.x;
  const wgen = 1 + (cr * cr) / INERTIA;
  const lambda = (-C / wgen) * stiffness;
  body.x += n.x * lambda;
  body.y += n.y * lambda;
  body.a += (cr * lambda) / INERTIA;
}

function stepPhysics(dt: number, time: number): void {
  const vx0 = body.vx;
  const vy0 = body.vy;
  const steps = 8;
  const h = dt / steps;
  // a faint draught keeps the jar gently alive when nobody touches it
  const breeze = GRAVITY * (0.0035 * Math.sin(time * 0.83) + 0.0015 * Math.sin(time * 0.37 + 2));
  for (let step = 0; step < steps; step += 1) {
    const px = body.x;
    const py = body.y;
    const pa = body.a;
    body.vx += breeze * h;
    body.vy += GRAVITY * h;
    body.x += body.vx * h;
    body.y += body.vy * h;
    body.a += body.w * h;

    if (grab.active) {
      const q = toWorld(grab.local);
      const dx = q.x - grab.target.x;
      const dy = q.y - grab.target.y;
      const d = Math.hypot(dx, dy);
      if (d > 0.001) solvePoint(grab.local, { x: dx / d, y: dy / d }, d, 0.35);
    }
    for (let iter = 0; iter < 2; iter += 1) {
      for (let i = 0; i < 2; i += 1) {
        const q = toWorld(attach[i]);
        const dx = q.x - anchors[i].x;
        const dy = q.y - anchors[i].y;
        const d = Math.hypot(dx, dy);
        if (d > ropeLen[i]) solvePoint(attach[i], { x: dx / d, y: dy / d }, d - ropeLen[i], 1);
      }
    }

    body.vx = (body.x - px) / h;
    body.vy = (body.y - py) / h;
    body.w = (body.a - pa) / h;
    const air = Math.exp(-h * (grab.active ? 2.5 : 0.35));
    body.vx *= air;
    body.vy *= air;
    body.w *= Math.exp(-h * (grab.active ? 4 : 1.1));
  }
  const vmax = H * 8;
  const v = Math.hypot(body.vx, body.vy);
  if (v > vmax) {
    body.vx *= vmax / v;
    body.vy *= vmax / v;
  }

  // Acceleration felt inside the jar (jar units / s², jar frame).
  const ax = (body.vx - vx0) / Math.max(dt, 1e-3);
  const ay = (body.vy - vy0) / Math.max(dt, 1e-3);
  body.ax = lerp(body.ax, ax, 0.5);
  body.ay = lerp(body.ay, ay, 0.5);
  const c = Math.cos(-body.a);
  const s = Math.sin(-body.a);
  const localAx = (body.ax * c - body.ay * s) / K;
  const localAy = (body.ax * s + body.ay * c) / K;

  // Water surface: stays perpendicular to the effective gravity, with a
  // springy lag so it sloshes.
  const gx = -body.ax;
  const gy = GRAVITY - body.ay;
  const glx = gx * c - gy * s;
  const gly = gx * s + gy * c;
  const target = clamp(-Math.atan2(glx, Math.max(1, gly)), -0.6, 0.6);
  sloshV += (55 * (target - slosh) - 3.2 * sloshV) * dt;
  slosh = clamp(slosh + sloshV * dt, -0.65, 0.65);
  ripple = Math.min(1, ripple + Math.abs(sloshV) * dt * 0.6);

  // The water (and the fish in it) lags behind the jar.
  const push = 0.45 * dt;
  fish.vx -= localAx * push;
  fish.vy -= localAy * push * 0.6;
  for (const b of bubbles) b.x -= localAx * push * 0.3;
  startleCooldown -= dt;
  const jolt = Math.hypot(localAx, localAy);
  if (jolt > 9000 && startleCooldown <= 0 && fish.mode !== "dart") {
    startleCooldown = 2.5;
    setMode("dart", 2.5);
  }
}

function buildRopePattern(): CanvasPattern | null {
  const w = ROPE_W * K * DPR;
  const period = w * 0.3;
  const tileW = Math.max(4, Math.round(period * 10));
  const tileH = Math.max(4, Math.round(w));
  const [c, g] = makeCanvas(tileW, tileH);
  g.fillStyle = "#dcdedf";
  g.fillRect(0, 0, tileW, tileH);
  g.lineCap = "butt";
  for (let i = -2; i < 12; i += 1) {
    const x = i * period;
    const color =
      i === 3 ? "#1d5fc4" : i === 7 ? "#16181c" : i % 2 ? "rgba(128,132,138,0.55)" : "rgba(250,250,252,0.9)";
    g.strokeStyle = color;
    g.lineWidth = i === 3 || i === 7 ? period * 0.8 : period * 0.66;
    g.beginPath();
    g.moveTo(x, tileH);
    g.lineTo(x + tileH * 0.55, 0);
    g.stroke();
  }
  return ctx.createPattern(c, "repeat");
}

/** The two strands from the neck up to their anchors above the screen. */
function drawHangingRopes(): void {
  const w = ROPE_W * K;
  for (let i = 0; i < 2; i += 1) {
    const q = toWorld(attach[i]);
    const A = anchors[i];
    const d = Math.hypot(A.x - q.x, A.y - q.y);
    const slack = Math.max(0, ropeLen[i] - d);
    const sag = Math.sqrt(Math.max(0, ropeLen[i] ** 2 - d * d)) * 0.5;
    const mx = (q.x + A.x) / 2;
    const my = (q.y + A.y) / 2 + (slack > 0.5 ? sag : 0);
    const angle = Math.atan2(A.y - q.y, A.x - q.x);
    ctx.save();
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(q.x, q.y);
    ctx.quadraticCurveTo(mx, my, A.x, A.y);
    ctx.strokeStyle = "rgba(95,100,105,0.9)";
    ctx.lineWidth = w + 3 * K;
    ctx.stroke();
    if (ropePattern) {
      ropePattern.setTransform(
        new DOMMatrix().translate(q.x, q.y).rotate((angle * 180) / Math.PI).translate(0, -w / 2).scale(1 / DPR),
      );
      ctx.strokeStyle = ropePattern;
    } else ctx.strokeStyle = "#dcdedf";
    ctx.lineWidth = w;
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.lineWidth = w * 0.25;
    ctx.stroke();
    ctx.restore();
  }
}

function drawScene(time: number): void {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  if (wallCache) ctx.drawImage(wallCache, 0, 0);
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

  // jar shadow on the wall
  if (shadowCache) {
    ctx.save();
    ctx.translate(body.x + H * 0.03, body.y + H * 0.018);
    ctx.rotate(body.a);
    ctx.translate(-JAR_X, -JAR_Y);
    ctx.drawImage(shadowCache, shadowRect.x, shadowRect.y, shadowRect.w, shadowRect.h);
    ctx.restore();
  }

  // jar frame
  ctx.save();
  ctx.translate(body.x, body.y);
  ctx.rotate(body.a);
  ctx.scale(K, K);

  // back half of the lower band, seen through the glass (cached)
  if (backCache) {
    ctx.save();
    ctx.scale(1 / K, 1 / K);
    ctx.translate(-JAR_X, -JAR_Y);
    ctx.drawImage(backCache, layerRect.x, layerRect.y, layerRect.w, layerRect.h);
    ctx.restore();
  }

  // --- interior ---
  ctx.save();
  ctx.beginPath();
  jarBodyPath(ctx, GLASS);
  ctx.clip();

  // air space above water (slightly clearer)
  const water = ctx.createLinearGradient(0, WATER_TOP, 0, INNER_BOTTOM);
  water.addColorStop(0, "rgba(206,224,222,0.30)");
  water.addColorStop(1, "rgba(180,204,200,0.38)");
  ctx.fillStyle = water;
  ctx.beginPath();
  ctx.moveTo(-INNER_HW, surfaceY(-INNER_HW, time));
  for (let x = -INNER_HW; x <= INNER_HW; x += 12) ctx.lineTo(x, surfaceY(x, time));
  ctx.lineTo(INNER_HW, INNER_BOTTOM);
  ctx.lineTo(-INNER_HW, INNER_BOTTOM);
  ctx.closePath();
  ctx.fill();

  // refraction: darker, thicker-looking glass near the sides
  for (const side of [-1, 1]) {
    const g = ctx.createLinearGradient(side * INNER_HW, 0, side * (INNER_HW - 70), 0);
    g.addColorStop(0, "rgba(90,105,105,0.28)");
    g.addColorStop(1, "rgba(90,105,105,0)");
    ctx.fillStyle = g;
    ctx.fillRect(side > 0 ? INNER_HW - 70 : -INNER_HW, WATER_TOP, 70, INNER_BOTTOM - WATER_TOP);
  }

  // caustic shimmer
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 5; i += 1) {
    const cx = Math.sin(time * 0.23 + i * 1.7) * INNER_HW * 0.7;
    const cy = SAND_TOP - 60 + Math.cos(time * 0.31 + i) * 50;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 120);
    g.addColorStop(0, `rgba(255,255,240,${0.06 * light.glow * 6})`);
    g.addColorStop(1, "rgba(255,255,240,0)");
    ctx.fillStyle = g;
    ctx.fillRect(cx - 120, cy - 120, 240, 240);
  }
  ctx.globalCompositeOperation = "source-over";

  // decoration: a green plastic plant base, like the photo
  ctx.fillStyle = "rgba(40,200,150,0.85)";
  ctx.beginPath();
  roundRect(ctx, -40, SAND_TOP - 60, 210, 62, 26);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.25)";
  ctx.beginPath();
  roundRect(ctx, -26, SAND_TOP - 52, 150, 14, 7);
  ctx.fill();

  // sand
  if (sandCache) ctx.drawImage(sandCache, -INNER_HW, SAND_TOP - 30, INNER_HW * 2, INNER_BOTTOM - SAND_TOP + 30);

  // the betta
  drawBetta(ctx);

  // bubbles
  for (const b of bubbles) {
    const x = b.x + Math.sin(b.wob) * 2.5;
    ctx.strokeStyle = "rgba(255,255,255,0.75)";
    ctx.lineWidth = 1.6;
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    ctx.beginPath();
    ctx.arc(x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  // bubble nest at the surface (bettas build these!)
  const nest = new Path2D();
  const nestCount = Math.round(NEST.length * (1 - sadness));
  for (const n of NEST.slice(0, nestCount)) {
    const y = surfaceY(n.x, time) + n.r * 0.3 + Math.sin(time * 0.8 + n.off) * 0.8;
    nest.moveTo(n.x + n.r, y);
    nest.arc(n.x, y, n.r, 0, Math.PI * 2);
  }
  ctx.fillStyle = "rgba(255,255,255,0.22)";
  ctx.strokeStyle = "rgba(255,255,255,0.7)";
  ctx.lineWidth = 1.4;
  ctx.fill(nest);
  ctx.stroke(nest);

  // water surface line + meniscus highlight
  ctx.beginPath();
  ctx.moveTo(-INNER_HW, surfaceY(-INNER_HW, time));
  for (let x = -INNER_HW; x <= INNER_HW; x += 10) ctx.lineTo(x, surfaceY(x, time));
  ctx.strokeStyle = "rgba(110,125,125,0.55)";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.strokeStyle = "rgba(255,255,255,0.7)";
  ctx.lineWidth = 1.5;
  ctx.translate(0, 5);
  ctx.stroke();
  ctx.restore();

  ctx.restore();

  if (frontCache) {
    ctx.save();
    ctx.translate(body.x, body.y);
    ctx.rotate(body.a);
    ctx.translate(-JAR_X, -JAR_Y);
    ctx.drawImage(frontCache, layerRect.x, layerRect.y, layerRect.w, layerRect.h);
    ctx.restore();
  }
  drawHangingRopes();

  // --- lighting ---
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  if (light.glow > 0.005) {
    const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    const [r0, g0, b0] = light.glowColor.map(Math.round);
    g.addColorStop(0, `rgba(${r0},${g0},${b0},${light.glow})`);
    g.addColorStop(0.6, `rgba(${r0},${g0},${b0},0)`);
    ctx.fillStyle = g;
    ctx.globalCompositeOperation = "screen";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  const [tr, tg, tb] = light.tint.map(Math.round);
  if (tr + tg + tb < 760) {
    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = `rgb(${tr},${tg},${tb})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  if (light.haze > 0.005) {
    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = `rgba(255,255,255,${light.haze})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.globalCompositeOperation = "source-over";
}

// ---------------------------------------------------------------------------
// Loop
// ---------------------------------------------------------------------------

let paused = false;
let frameInterval = 0;
let last = performance.now();
let lastDraw = 0;
let time = 0;
let frame = 0;

function tick(now: number): void {
  frame = requestAnimationFrame(tick);
  if (frameInterval > 0 && now - lastDraw < frameInterval - 1) return;
  lastDraw = now;
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;
  time += dt;
  stepLight(dt);
  stepPhysics(dt, time);
  stepMood(dt);
  updateFish(dt, time);
  updateBubbles(dt);
  drawScene(time);
}

resize();
window.addEventListener("resize", () => {
  ropeCache = null;
  resize();
});
setMode("hover", 2);
frame = requestAnimationFrame(tick);

// ---------------------------------------------------------------------------
// Audio (optional water ambience)
// ---------------------------------------------------------------------------

let audioContext: AudioContext | null = null;
let audioGain: GainNode | null = null;
let soundOn = false;

async function ensureAudio(): Promise<void> {
  if (audioContext) {
    await audioContext.resume();
    return;
  }
  const context = new AudioContext();
  const gain = context.createGain();
  gain.gain.value = 0;
  gain.connect(context.destination);
  const res = await fetch("/audio/ambient-river-v1.m4a");
  const buffer = await context.decodeAudioData(await res.arrayBuffer());
  const src = context.createBufferSource();
  src.buffer = buffer;
  src.loop = true;
  src.connect(gain);
  src.start();
  audioContext = context;
  audioGain = gain;
  await context.resume();
}

function applyVolume(): void {
  if (!audioContext || !audioGain) return;
  const now = audioContext.currentTime;
  audioGain.gain.cancelScheduledValues(now);
  audioGain.gain.setValueAtTime(audioGain.gain.value, now);
  audioGain.gain.linearRampToValueAtTime(soundOn && !paused ? 0.22 : 0, now + 0.45);
}

// ---------------------------------------------------------------------------
// Host API (kept compatible with the macOS app)
// ---------------------------------------------------------------------------

function screenToJar(px: number, py: number): Vec {
  const l = toLocal({ x: px, y: py });
  return { x: l.x / K, y: l.y / K };
}

function hitsJar(px: number, py: number): boolean {
  const p = screenToJar(px, py);
  return Math.abs(p.x) <= BODY_HW + ROPE_W && p.y >= LID_TOP - 10 && p.y <= BODY_BOTTOM + ROPE_W;
}

/** Returns true when the press grabbed the jar (otherwise it calls the fish). */
function pressAt(px: number, py: number): boolean {
  if (hitsJar(px, py)) {
    grab.active = true;
    grab.local = toLocal({ x: px, y: py });
    grab.target = { x: px, y: py };
    return true;
  }
  return false;
}

const api = {
  /** Desktop press forwarded by the host (fractions of this screen). */
  pointerDown(fx: number, fy: number): void {
    played();
    if (!pressAt(fx * W, fy * H)) api.callTo(fx, fy);
  },
  pointerMove(fx: number, fy: number): void {
    if (grab.active) {
      grab.target = { x: fx * W, y: fy * H };
      if (Date.now() - lastPlay > 5000) played();
    }
  },
  pointerUp(): void {
    grab.active = false;
  },
  callTo(fx: number, fy: number): void {
    const p = screenToJar(fx * W, fy * H);
    const { minY, maxY } = waterBounds();
    fish.tx = clamp(p.x, -INNER_HW + FISH_L * 0.7, INNER_HW - FISH_L * 0.7);
    fish.ty = clamp(p.y, minY, maxY);
    setMode("called", 4);
  },
  scatter(): void {
    setMode("dart", 3);
    body.vx += (Math.random() < 0.5 ? -1 : 1) * H * 0.35;
  },
  reset(): void {
    resetPhysics();
    fish.x = 0;
    fish.y = 150;
    setMode("hover", 2);
  },
  setPaused(value: boolean): void {
    if (paused === value) return;
    paused = value;
    if (paused) cancelAnimationFrame(frame);
    else {
      last = performance.now();
      frame = requestAnimationFrame(tick);
    }
    applyVolume();
  },
  setFrameCap(fps: number): void {
    frameInterval = fps > 0 ? 1000 / fps : 0;
  },
  setWeather(id: string): void {
    if (LIGHTS[id]) lightId = id;
  },
  setRain(on: boolean): void {
    bubblesOn = on;
  },
  setKoiCount(_count: number): void {
    // one betta per jar — bettas live alone
  },
  setSound(on: boolean): void {
    soundOn = on;
    if (on) void ensureAudio().then(applyVolume).catch(() => undefined);
    else applyVolume();
  },
  /** Debug/testing: pretend she has been left alone for `minutes`. */
  setIdleMinutes(minutes: number): void {
    lastPlay = Date.now();
    idleOffsetMs = minutes * 60000;
    sadness = targetSadness();
  },
  mood() {
    return { sadness, bucket: moodBucket, idleMinutes: (Date.now() - lastPlay + idleOffsetMs) / 60000 };
  },
  state() {
    return { weather: lightId, rain: bubblesOn, koi: 1, mood: moodBucket };
  },
};

declare global {
  interface Window {
    koipond: typeof api;
    webkit?: { messageHandlers?: Record<string, { postMessage(v: unknown): void }> };
  }
}
window.koipond = api;

canvas.addEventListener("pointerdown", (e) => {
  canvas.setPointerCapture(e.pointerId);
  api.pointerDown(e.clientX / W, e.clientY / H);
});
canvas.addEventListener("pointermove", (e) => api.pointerMove(e.clientX / W, e.clientY / H));
canvas.addEventListener("pointerup", () => api.pointerUp());
canvas.addEventListener("pointercancel", () => api.pointerUp());
window.webkit?.messageHandlers?.koipond?.postMessage({ ready: true, ...api.state() });
