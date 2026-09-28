import * as THREE from "three";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  FISH,
  KOI_PALETTES,
  MAX_FISH,
  SPINE_NODES,
} from "./config";
import { ButterflyPass } from "./butterflies";
import { DuckweedPass } from "./duckweed";
import {
  createFishAppearance,
  patchesFor,
  type FishAppearance,
} from "./fish-appearance";
import { Koi, SwimState } from "./koi";
import { LotusLeavesPass } from "./lotus-leaves";
import {
  add,
  fromAngle,
  lerp,
  mul,
  normalize,
  perpendicular,
  sub,
  type Vec2,
} from "./math";
import { PondBedPass } from "./pond-bed";
import { School } from "./school";
import { SurfaceDisturbancePass } from "./surface-disturbance";
import { TinyFishRenderer } from "./tiny-fish-renderer";
import { WaterSurfacePass } from "./water-surface";
import { WeatherPass } from "./weather-pass";
import type { WeatherPresetId } from "./weather";

const TRIANGLE_FLOAT_CAPACITY = 72_000;
const LINE_FLOAT_CAPACITY = 18_000;
const DEFAULT_COLOR = new THREE.Color(0xffffff);
// Spine node where the betta's body ends and the flowing caudal veil takes over.
const BETTA_BODY_END = 7;
// Spine node where the dorsal/anal veil starts to flare out from the body.
const BETTA_VEIL_START = 4;

const shadowVertexShader = /* glsl */ `
  varying float vStrength;
  void main() {
    vStrength = color.r;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const shadowFragmentShader = /* glsl */ `
  precision highp float;
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vStrength;
  void main() {
    gl_FragColor = vec4(uColor, uOpacity * vStrength);
  }
`;

function shadowMaterial(opacity: number): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(FISH.shadow.color) },
      uOpacity: { value: opacity },
    },
    vertexShader: shadowVertexShader,
    fragmentShader: shadowFragmentShader,
    vertexColors: true,
    transparent: true,
    side: THREE.DoubleSide,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
  });
}

class GeometryBatch {
  private readonly values: Float32Array;
  private readonly attribute: THREE.BufferAttribute;
  private readonly colorValues?: Float32Array;
  private readonly colorAttribute?: THREE.BufferAttribute;
  private cursor = 0;
  private previewOrigin: Vec2 | null = null;
  private previewScale = 1;

  public constructor(
    private readonly geometry: THREE.BufferGeometry,
    capacity: number,
    includeColors = false,
  ) {
    this.values = new Float32Array(capacity);
    this.attribute = new THREE.BufferAttribute(this.values, 3);
    this.attribute.setUsage(THREE.DynamicDrawUsage);
    this.geometry.setAttribute("position", this.attribute);
    this.geometry.boundingSphere = new THREE.Sphere(
      new THREE.Vector3(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5, 0),
      Math.hypot(CANVAS_WIDTH, CANVAS_HEIGHT),
    );
    if (includeColors) {
      this.colorValues = new Float32Array(capacity);
      this.colorAttribute = new THREE.BufferAttribute(this.colorValues, 3);
      this.colorAttribute.setUsage(THREE.DynamicDrawUsage);
      this.geometry.setAttribute("color", this.colorAttribute);
    }
  }

  public reset(): void {
    this.cursor = 0;
  }

  public setPreviewTransform(origin: Vec2 | null, scale = 1): void {
    this.previewOrigin = origin;
    this.previewScale = scale;
  }

  public point(point: Vec2, color: THREE.Color = DEFAULT_COLOR): void {
    if (this.cursor + 3 > this.values.length) return;
    this.values[this.cursor] = this.previewOrigin
      ? CANVAS_WIDTH * 0.5 + (point.x - this.previewOrigin.x) * this.previewScale
      : point.x;
    this.values[this.cursor + 1] = this.previewOrigin
      ? CANVAS_HEIGHT * 0.5 + (point.y - this.previewOrigin.y) * this.previewScale
      : point.y;
    this.values[this.cursor + 2] = 0;
    if (this.colorValues) {
      this.colorValues[this.cursor] = color.r;
      this.colorValues[this.cursor + 1] = color.g;
      this.colorValues[this.cursor + 2] = color.b;
    }
    this.cursor += 3;
  }

  public triangle(a: Vec2, b: Vec2, c: Vec2, color: THREE.Color = DEFAULT_COLOR): void {
    this.point(a, color);
    this.point(b, color);
    this.point(c, color);
  }

  public line(a: Vec2, b: Vec2, color: THREE.Color = DEFAULT_COLOR): void {
    this.point(a, color);
    this.point(b, color);
  }

  public circle(
    center: Vec2,
    radius: number,
    color: THREE.Color = DEFAULT_COLOR,
    segments = 12,
  ): void {
    for (let index = 0; index < segments; index += 1) {
      const angleA = (index / segments) * Math.PI * 2;
      const angleB = ((index + 1) / segments) * Math.PI * 2;
      this.triangle(
        center,
        add(center, mul(fromAngle(angleA), radius)),
        add(center, mul(fromAngle(angleB), radius)),
        color,
      );
    }
  }

  public ellipse(
    center: Vec2,
    forward: Vec2,
    normal: Vec2,
    forwardRadius: number,
    sideRadius: number,
    color: THREE.Color,
    phase: number,
    segments = 10,
  ): void {
    const pointAt = (angle: number): Vec2 => {
      const wobble =
        1 +
        Math.sin(angle * 3 + phase) * 0.08 +
        Math.cos(angle * 2 - phase * 0.7) * 0.045;
      return add(
        add(center, mul(forward, Math.cos(angle) * forwardRadius * wobble)),
        mul(normal, Math.sin(angle) * sideRadius * wobble),
      );
    };

    for (let index = 0; index < segments; index += 1) {
      const angleA = (index / segments) * Math.PI * 2;
      const angleB = ((index + 1) / segments) * Math.PI * 2;
      this.triangle(center, pointAt(angleA), pointAt(angleB), color);
    }
  }

  public commit(): void {
    this.geometry.setDrawRange(0, this.cursor / 3);
    this.attribute.clearUpdateRanges();
    this.attribute.addUpdateRange(0, this.cursor);
    this.attribute.needsUpdate = true;
    if (this.colorAttribute) {
      this.colorAttribute.clearUpdateRanges();
      this.colorAttribute.addUpdateRange(0, this.cursor);
      this.colorAttribute.needsUpdate = true;
    }
  }
}

export class FishRenderer {
  public readonly canvas: HTMLCanvasElement;

  private readonly renderer: THREE.WebGLRenderer;
  private readonly bedScene = new THREE.Scene();
  private readonly shadowScene = new THREE.Scene();
  private readonly fishShadowScene = new THREE.Scene();
  private readonly fishScene = new THREE.Scene();
  private readonly surfaceScene = new THREE.Scene();
  private readonly surfaceShadowScene = new THREE.Scene();
  private readonly surfaceObjectScene = new THREE.Scene();
  private readonly weatherScene = new THREE.Scene();
  private readonly camera = new THREE.OrthographicCamera(
    0,
    CANVAS_WIDTH,
    0,
    CANVAS_HEIGHT,
    -10,
    10,
  );
  private readonly surfaceCamera = new THREE.Camera();
  private readonly underwaterTarget: THREE.WebGLRenderTarget;
  private readonly compositeTarget: THREE.WebGLRenderTarget;
  private readonly pondBed: PondBedPass;
  private readonly surfaceDisturbance = new SurfaceDisturbancePass();
  private readonly waterSurface: WaterSurfacePass;
  private readonly weather: WeatherPass;
  private readonly tinyFishRenderer = new TinyFishRenderer();
  private readonly duckweed = new DuckweedPass();
  private readonly lotusLeaves = new LotusLeavesPass();
  private readonly butterflies = new ButterflyPass();
  private readonly fishShadowMaterial = shadowMaterial(1);
  private readonly shadowTriangles: GeometryBatch;
  private readonly outerTriangles: GeometryBatch;
  private readonly bodyTriangles: GeometryBatch;
  private readonly outlineLines: GeometryBatch;
  private readonly appearances = Array.from(
    { length: MAX_FISH },
    (_, index) => createFishAppearance(index),
  );
  private readonly depthAppearances = Array.from(
    { length: MAX_FISH },
    (_, index) => createFishAppearance(index),
  );
  private readonly shadowStrengthColor = new THREE.Color();
  private readonly targetFishShadowColor = new THREE.Color(FISH.shadow.color);
  private previousAppearanceTime = -1;
  private currentVisualDepth = 0;
  private previewFamilyIndex: number | null = null;
  private readonly bettaFinShade = new THREE.Color();
  private readonly bettaEdgeShade = new THREE.Color();
  private readonly bettaBlend = new THREE.Color();
  private readonly bettaBlendShade = new THREE.Color();

  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT, false);
    this.renderer.setClearColor(0x000000, 1);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.underwaterTarget = new THREE.WebGLRenderTarget(CANVAS_WIDTH, CANVAS_HEIGHT, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
      stencilBuffer: false,
    });
    this.underwaterTarget.texture.generateMipmaps = false;

    this.compositeTarget = new THREE.WebGLRenderTarget(CANVAS_WIDTH, CANVAS_HEIGHT, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
      stencilBuffer: false,
    });
    this.compositeTarget.texture.generateMipmaps = false;

    this.pondBed = new PondBedPass();
    this.waterSurface = new WaterSurfacePass(
      this.underwaterTarget.texture,
      this.surfaceDisturbance.texture,
    );
    this.weather = new WeatherPass(this.compositeTarget.texture);
    this.bedScene.add(this.pondBed.mesh);
    this.shadowScene.add(
      this.lotusLeaves.shadowGroup,
      this.tinyFishRenderer.shadowGroup,
    );
    this.fishScene.add(this.tinyFishRenderer.group);
    this.surfaceScene.add(this.waterSurface.mesh);
    this.surfaceShadowScene.add(
      this.duckweed.shadowGroup,
      this.butterflies.shadowGroup,
    );
    this.surfaceObjectScene.add(
      this.duckweed.group,
      this.lotusLeaves.group,
      this.butterflies.group,
    );
    this.weatherScene.add(this.weather.mesh);

    const shadowGeometry = new THREE.BufferGeometry();
    const whiteGeometry = new THREE.BufferGeometry();
    const blackGeometry = new THREE.BufferGeometry();
    const lineGeometry = new THREE.BufferGeometry();
    shadowGeometry.name = "fish shadows";
    whiteGeometry.name = "fish silhouettes";
    blackGeometry.name = "fish markings";
    lineGeometry.name = "fish debug lines";
    this.shadowTriangles = new GeometryBatch(
      shadowGeometry,
      TRIANGLE_FLOAT_CAPACITY,
      true,
    );
    this.outerTriangles = new GeometryBatch(whiteGeometry, TRIANGLE_FLOAT_CAPACITY, true);
    this.bodyTriangles = new GeometryBatch(blackGeometry, TRIANGLE_FLOAT_CAPACITY, true);
    this.outlineLines = new GeometryBatch(lineGeometry, LINE_FLOAT_CAPACITY, true);

    const outerMaterial = new THREE.MeshBasicMaterial({
      vertexColors: true,
      side: THREE.DoubleSide,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
    });
    const bodyMaterial = new THREE.MeshBasicMaterial({
      vertexColors: true,
      side: THREE.DoubleSide,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
    });
    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
    });

    const shadowMesh = new THREE.Mesh(shadowGeometry, this.fishShadowMaterial);
    const outerMesh = new THREE.Mesh(whiteGeometry, outerMaterial);
    const bodyMesh = new THREE.Mesh(blackGeometry, bodyMaterial);
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    shadowMesh.frustumCulled = false;
    outerMesh.frustumCulled = false;
    bodyMesh.frustumCulled = false;
    lines.frustumCulled = false;
    outerMesh.renderOrder = 1;
    bodyMesh.renderOrder = 2;
    lines.renderOrder = 3;
    this.fishShadowScene.add(shadowMesh);
    this.fishScene.add(outerMesh, bodyMesh, lines);
  }

  public refreshConfig(): void {
    for (const section of [
      "koi", "koi-palettes", "tiny-fish", "pond-bed", "water",
      "lotus", "duckweed", "butterflies",
    ]) this.refreshSection(section);
  }

  public refreshSection(sectionId: string): void {
    switch (sectionId) {
      case "koi":
        this.targetFishShadowColor.setHex(FISH.shadow.color);
        // Eye color and the shared koi palette are baked into appearances.
        this.refreshFishAppearances();
        break;
      case "koi-palettes":
      case "koi-patterns":
        this.refreshFishAppearances();
        break;
      case "tiny-fish":
        this.tinyFishRenderer.refreshConfig();
        break;
      case "pond-bed":
        this.pondBed.refreshConfig();
        break;
      case "water":
        this.waterSurface.refreshConfig();
        break;
      case "lotus":
        this.lotusLeaves.refreshConfig();
        break;
      case "duckweed":
      case "duckweed-patches":
        this.duckweed.refreshConfig();
        break;
      case "butterflies":
        this.butterflies.refreshConfig(true);
        break;
      case "butterfly-spawns":
        this.butterflies.refreshConfig();
        break;
      default:
        break;
    }
  }

  private refreshFishAppearances(): void {
    for (let index = 0; index < this.appearances.length; index += 1) {
      this.appearances[index] = createFishAppearance(index);
      this.depthAppearances[index] = createFishAppearance(index);
    }
  }

  public resize(width: number, height: number, oldWidth: number, oldHeight: number): void {
    this.renderer.setSize(width, height, false);
    this.underwaterTarget.setSize(width, height);
    this.compositeTarget.setSize(width, height);
    this.camera.right = width;
    this.camera.bottom = height;
    this.camera.updateProjectionMatrix();
    this.pondBed.resize(width, height);
    this.surfaceDisturbance.resize(width, height);
    this.waterSurface.resize(width, height);
    this.butterflies.resize(width / oldWidth, height / oldHeight);
  }

  public dispose(): void {
    this.underwaterTarget.dispose();
    this.compositeTarget.dispose();
    this.surfaceDisturbance.dispose();
    this.fishShadowMaterial.dispose();
    this.weather.dispose();
    this.renderer.dispose();
  }

  public setWeatherPreset(id: WeatherPresetId): void {
    this.weather.setPreset(id);
  }

  public setPreviewFamily(index: number | null): void {
    this.previewFamilyIndex = index;
  }

  public draw(school: School, time: number, showDebug: boolean): void {
    if (this.previousAppearanceTime >= 0) {
      const deltaTime = Math.min(
        0.1,
        Math.max(0, time - this.previousAppearanceTime),
      );
      const blend = 1 - Math.exp(-deltaTime * 2.25);
      this.fishShadowMaterial.uniforms.uColor.value.lerp(
        this.targetFishShadowColor,
        blend,
      );
    }
    this.previousAppearanceTime = time;
    this.shadowTriangles.reset();
    this.outerTriangles.reset();
    this.bodyTriangles.reset();
    this.outlineLines.reset();

    const previewIndex = this.previewFamilyIndex;
    let selectedFishIndex = 0;
    if (previewIndex !== null) {
      for (let index = 0; index < school.count; index += 1) {
        if (
          index % KOI_PALETTES.length === previewIndex &&
          (index + 1) % FISH.tinyEvery !== 0
        ) {
          selectedFishIndex = index;
          break;
        }
      }
    }
    const transformOrigin = previewIndex === null
      ? null
      : school.fish[selectedFishIndex].position;
    for (const batch of [this.shadowTriangles, this.outerTriangles, this.bodyTriangles, this.outlineLines]) {
      batch.setPreviewTransform(transformOrigin, previewIndex === null ? 1 : 1.6);
    }

    for (let index = 0; index < school.count; index += 1) {
      if (previewIndex !== null && index !== selectedFishIndex) continue;
      const fish = school.fish[index];
      this.buildRenderSpine(fish);
      const appearanceIndex = previewIndex ?? index;
      const appearance = this.depthAppearances[appearanceIndex];
      this.updateDepthAppearance(fish, this.appearances[appearanceIndex], appearance);
      this.drawKoi(fish, appearance);
      if (showDebug) this.drawDebug(fish, appearance);
    }

    this.shadowTriangles.commit();
    this.outerTriangles.commit();
    this.bodyTriangles.commit();
    this.outlineLines.commit();
    this.tinyFishRenderer.group.visible = previewIndex === null;
    this.tinyFishRenderer.shadowGroup.visible = previewIndex === null;
    if (previewIndex === null) this.tinyFishRenderer.update(school.tinyFish);
    this.pondBed.update(time);
    this.surfaceDisturbance.render(
      this.renderer,
      school,
      time,
      previewIndex === null ? null : selectedFishIndex,
    );
    this.waterSurface.update(school, time);
    this.duckweed.update(time);
    this.lotusLeaves.update(time);
    this.butterflies.update(time);

    this.renderer.setRenderTarget(this.underwaterTarget);
    this.renderer.clear();
    this.renderer.autoClear = false;
    this.renderer.render(this.bedScene, this.camera);
    this.renderer.render(this.shadowScene, this.camera);
    this.renderer.render(this.fishShadowScene, this.camera);
    this.renderer.render(this.fishScene, this.camera);
    this.renderer.autoClear = true;
    this.renderer.setRenderTarget(this.compositeTarget);
    this.renderer.clear();
    this.renderer.render(this.surfaceScene, this.surfaceCamera);
    this.renderer.autoClear = false;
    this.renderer.render(this.surfaceShadowScene, this.camera);
    this.renderer.render(this.surfaceObjectScene, this.camera);
    this.renderer.autoClear = true;
    this.weather.update(time);
    this.renderer.setRenderTarget(null);
    this.renderer.clear();
    this.renderer.render(this.weatherScene, this.surfaceCamera);
  }

  private buildRenderSpine(fish: Koi): void {
    fish.renderSpine[0] = { ...fish.spine[0] };
    for (let node = 1; node < SPINE_NODES; node += 1) {
      const t = node / (SPINE_NODES - 1);
      const previous = Math.max(0, node - 1);
      const next = Math.min(SPINE_NODES - 1, node + 1);
      const tangent = normalize(
        sub(fish.spine[previous], fish.spine[next]),
        fromAngle(fish.heading),
      );
      const normal = perpendicular(tangent);
      const waveEnvelope = Math.pow(t, 1.72);
      const wave =
        Math.sin(fish.swimPhase - t * 6.1) *
        fish.bodyWidth *
        1.15 *
        waveEnvelope *
        (0.08 + fish.tailEffort * 0.92);
      fish.renderSpine[node] = add(fish.spine[node], mul(normal, wave));
    }
  }

  private widthAt(fish: Koi, node: number): number {
    // Betta body: blunt head, deep chest, tapering to a narrow peduncle at
    // BETTA_BODY_END; the rest of the spine carries only the veil.
    const t = node / (SPINE_NODES - 1);
    const end = BETTA_BODY_END / (SPINE_NODES - 1);
    const profile =
      t < 0.12
        ? 0.8 + (t / 0.12) * 0.2
        : t < end
          ? 1 - 0.58 * Math.pow((t - 0.12) / (end - 0.12), 1.25)
          : 0.42;
    return Math.max(0.7, fish.bodyWidth * profile);
  }

  private visualDepth(depth: number): number {
    const range = Math.max(FISH.depth.visualEnd - FISH.depth.visualStart, 0.001);
    const linear = Math.max(
      0,
      Math.min(1, (depth - FISH.depth.visualStart) / range),
    );
    return linear * linear * (3 - 2 * linear);
  }

  private updateDepthAppearance(
    fish: Koi,
    source: FishAppearance,
    target: FishAppearance,
  ): void {
    const visualDepth = this.visualDepth(fish.depth);
    this.applyDepthColor(source.base, target.base, visualDepth);
    this.applyDepthColor(source.accent, target.accent, visualDepth);
    this.applyDepthColor(source.marking, target.marking, visualDepth);
    this.applyDepthColor(source.fin, target.fin, visualDepth);
    this.applyDepthColor(source.eye, target.eye, visualDepth);
  }

  private applyDepthColor(
    source: THREE.Color,
    target: THREE.Color,
    visualDepth: number,
  ): void {
    const brightness = 1 + (FISH.depth.deepBrightness - 1) * visualDepth;
    const saturation = 1 + (FISH.depth.deepSaturation - 1) * visualDepth;
    const luminance = source.r * 0.2126 + source.g * 0.7152 + source.b * 0.0722;
    const [tintR, tintG, tintB] = FISH.depth.deepWaterTint;
    target.setRGB(
      (luminance + (source.r - luminance) * saturation) *
        brightness *
        (1 + (tintR - 1) * visualDepth),
      (luminance + (source.g - luminance) * saturation) *
        brightness *
        (1 + (tintG - 1) * visualDepth),
      (luminance + (source.b - luminance) * saturation) *
        brightness *
        (1 + (tintB - 1) * visualDepth),
    );
  }

  private addShadowTriangle(a: Vec2, b: Vec2, c: Vec2): void {
    const shadowOffset = {
      x:
        FISH.shadow.offset.x +
        FISH.shadow.depthOffset.x * this.currentVisualDepth,
      y:
        FISH.shadow.offset.y +
        FISH.shadow.depthOffset.y * this.currentVisualDepth,
    };
    const opacity =
      FISH.shadow.surfaceOpacity +
      (FISH.shadow.deepOpacity - FISH.shadow.surfaceOpacity) *
        this.currentVisualDepth;
    this.shadowStrengthColor.setRGB(
      opacity,
      opacity,
      opacity,
    );
    this.shadowTriangles.triangle(
      add(a, shadowOffset),
      add(b, shadowOffset),
      add(c, shadowOffset),
      this.shadowStrengthColor,
    );
  }

  private addShadowCircle(center: Vec2, radius: number): void {
    const shadowOffset = {
      x:
        FISH.shadow.offset.x +
        FISH.shadow.depthOffset.x * this.currentVisualDepth,
      y:
        FISH.shadow.offset.y +
        FISH.shadow.depthOffset.y * this.currentVisualDepth,
    };
    const opacity =
      FISH.shadow.surfaceOpacity +
      (FISH.shadow.deepOpacity - FISH.shadow.surfaceOpacity) *
        this.currentVisualDepth;
    this.shadowStrengthColor.setRGB(
      opacity,
      opacity,
      opacity,
    );
    this.shadowTriangles.circle(
      add(center, shadowOffset),
      radius,
      this.shadowStrengthColor,
    );
  }

  private silhouetteTriangle(
    a: Vec2,
    b: Vec2,
    c: Vec2,
    color: THREE.Color,
  ): void {
    this.addShadowTriangle(a, b, c);
    this.outerTriangles.triangle(a, b, c, color);
  }

  private silhouetteCircle(center: Vec2, radius: number, color: THREE.Color): void {
    this.addShadowCircle(center, radius);
    this.outerTriangles.circle(center, radius, color);
  }

  // ---- Betta splendens --------------------------------------------------
  // Seen from above: a slim, blunt-headed body over the front of the spine,
  // and one huge flowing veil (dorsal + anal + caudal fins) that fans out from
  // mid-body and trails the back half of the spine, with a contrasting edge.

  private finScale(fish: Koi): number {
    return fish.bodyLength < 25 ? 0.62 : 1;
  }

  /** Half-span of the veil at a spine node, per side (+1 left / -1 right). */
  private veilSpan(fish: Koi, node: number, side: number): number {
    const u = (node - BETTA_VEIL_START) / (SPINE_NODES - 1 - BETTA_VEIL_START);
    const ease = u <= 0 ? 0 : Math.pow(Math.min(1, u), 1.1);
    const flutter =
      1 +
      0.13 *
        Math.sin(fish.swimPhase * 0.55 + fish.phaseOffset - u * 4.6 + (side > 0 ? 0 : 1.9));
    // The dorsal side is a touch narrower than the anal side, like a real betta.
    const sideScale = side > 0 ? 0.92 : 1.06;
    const peduncle = this.widthAt(fish, BETTA_BODY_END) * 0.9;
    return (
      peduncle +
      fish.bodyWidth * 1.6 * this.finScale(fish) * ease * flutter * sideScale
    );
  }

  /** Builds the veil outline scaled by `scale` (1 = outer edge). */
  private veilOutline(
    fish: Koi,
    scale: number,
    frames: Array<{ center: Vec2; normal: Vec2 }>,
  ): { left: Vec2[]; right: Vec2[]; cap: Vec2[]; hub: Vec2 } {
    const left: Vec2[] = [];
    const right: Vec2[] = [];
    for (let node = BETTA_VEIL_START; node < SPINE_NODES; node += 1) {
      const { center, normal } = frames[node];
      const bodyHalf = node <= BETTA_BODY_END ? this.widthAt(fish, node) * 0.6 : 0;
      left.push(add(center, mul(normal, bodyHalf + (this.veilSpan(fish, node, 1) - bodyHalf) * scale)));
      right.push(add(center, mul(normal, -(bodyHalf + (this.veilSpan(fish, node, -1) - bodyHalf) * scale))));
    }

    // Rounded, ragged fan cap behind the last spine node.
    const tail = SPINE_NODES - 1;
    const hub = fish.renderSpine[tail];
    const back = normalize(
      sub(fish.renderSpine[tail], fish.renderSpine[tail - 1]),
      fromAngle(fish.heading + Math.PI),
    );
    const side = perpendicular(back);
    const leftEnd = left[left.length - 1];
    const rightEnd = right[right.length - 1];
    const reach = fish.bodyWidth * 1.3 * this.finScale(fish) * scale;
    const cap: Vec2[] = [];
    const steps = 9;
    for (let step = 1; step < steps; step += 1) {
      const a = step / steps;
      const angle = Math.PI * (0.5 - a); // +90° (left) .. -90° (right)
      const edge = lerp(leftEnd, rightEnd, a);
      const ragged =
        1 +
        0.14 * Math.sin(a * 23 + fish.phaseOffset * 3) +
        0.09 * Math.sin(fish.swimPhase * 0.8 - a * 7 + fish.phaseOffset);
      const bulge = Math.cos(angle) * reach * ragged;
      const sway = Math.sin(fish.swimPhase * 0.5 - a * 3) * fish.bodyWidth * 0.25 * scale;
      cap.push(add(add(edge, mul(back, bulge)), mul(side, sway * Math.cos(angle))));
    }
    return { left, right, cap, hub };
  }

  private fillVeil(
    outline: { left: Vec2[]; right: Vec2[]; cap: Vec2[]; hub: Vec2 },
    colorA: THREE.Color,
    colorB: THREE.Color,
    castShadow: boolean,
  ): void {
    const tri = (a: Vec2, b: Vec2, c: Vec2, color: THREE.Color): void => {
      if (castShadow) this.addShadowTriangle(a, b, c);
      this.outerTriangles.triangle(a, b, c, color);
    };
    const { left, right, cap, hub } = outline;
    for (let index = 0; index < left.length - 1; index += 1) {
      const color = index % 2 === 0 ? colorA : colorB;
      tri(left[index], right[index], right[index + 1], color);
      tri(left[index], right[index + 1], left[index + 1], color);
    }
    // Fan wedges read as fin rays.
    const rim = [left[left.length - 1], ...cap, right[right.length - 1]];
    for (let index = 0; index < rim.length - 1; index += 1) {
      tri(hub, rim[index], rim[index + 1], index % 2 === 0 ? colorA : colorB);
    }
  }

  private drawKoi(fish: Koi, appearance: FishAppearance): void {
    this.currentVisualDepth = this.visualDepth(fish.depth);
    const left: Vec2[] = [];
    const right: Vec2[] = [];
    const frames: Array<{ center: Vec2; normal: Vec2 }> = [];

    for (let node = 0; node < SPINE_NODES; node += 1) {
      const previous = Math.max(0, node - 1);
      const next = Math.min(SPINE_NODES - 1, node + 1);
      const tangent = normalize(
        sub(fish.renderSpine[previous], fish.renderSpine[next]),
        fromAngle(fish.heading),
      );
      const normal = perpendicular(tangent);
      const halfWidth = this.widthAt(fish, node);
      frames[node] = { center: fish.renderSpine[node], normal };
      left[node] = add(fish.renderSpine[node], mul(normal, halfWidth));
      right[node] = add(fish.renderSpine[node], mul(normal, -halfWidth));
    }

    const finShade = this.bettaFinShade.copy(appearance.fin).multiplyScalar(0.88);
    const edgeShade = this.bettaEdgeShade.copy(appearance.accent).multiplyScalar(0.9);

    // 1. Veil: contrasting edge layer (casts the shadow), then the fin body.
    this.fillVeil(this.veilOutline(fish, 1, frames), appearance.accent, edgeShade, true);
    const blend = this.bettaBlend.copy(appearance.fin).lerp(appearance.accent, 0.45);
    const blendShade = this.bettaBlendShade.copy(blend).multiplyScalar(0.9);
    this.fillVeil(this.veilOutline(fish, 0.88, frames), blend, blendShade, false);
    this.fillVeil(this.veilOutline(fish, 0.7, frames), appearance.fin, finShade, false);

    // 2. Long, thin ventral (pelvic) streamers trailing from under the throat.
    const pelvicNode = 3;
    const pelvicBack = normalize(
      sub(fish.renderSpine[pelvicNode + 1], fish.renderSpine[pelvicNode - 1]),
      fromAngle(fish.heading + Math.PI),
    );
    const pelvicNormal = perpendicular(mul(pelvicBack, -1));
    const streamer = fish.bodyWidth * 2.1 * this.finScale(fish);
    for (const side of [1, -1]) {
      const root = side > 0 ? left[pelvicNode] : right[pelvicNode];
      const sway = Math.sin(fish.swimPhase * 0.7 + fish.phaseOffset + side) * 0.35;
      const tip = add(
        add(root, mul(pelvicBack, streamer)),
        mul(pelvicNormal, side * fish.bodyWidth * (0.55 + sway)),
      );
      const rootB = add(root, mul(pelvicBack, fish.bodyWidth * 0.55));
      this.silhouetteTriangle(root, tip, rootB, appearance.accent);
    }

    // 3. Small, quick pectoral fins.
    const pectoralNode = 2;
    const pectoralTangent = normalize(
      sub(fish.renderSpine[pectoralNode - 1], fish.renderSpine[pectoralNode + 1]),
      fromAngle(fish.heading),
    );
    const pectoralNormal = perpendicular(pectoralTangent);
    const gulpProgress =
      fish.gulpAnimation / Math.max(FISH.feeding.animationDurationSeconds, 0.001);
    const flap =
      0.75 +
      0.35 * Math.sin(fish.swimPhase * 1.9 + fish.phaseOffset) +
      Math.sin(Math.PI * gulpProgress) * 0.4;
    const pectoralReach = fish.bodyWidth * 0.45 * flap;
    for (const side of [1, -1]) {
      const edge = side > 0 ? left : right;
      const tip = add(
        add(edge[pectoralNode + 1], mul(pectoralNormal, side * pectoralReach)),
        mul(pectoralTangent, -fish.bodyWidth * 0.6),
      );
      this.silhouetteTriangle(edge[pectoralNode], tip, edge[pectoralNode + 2], appearance.fin);
    }

    // 4. Body (front of the spine only; the rest is veil).
    for (let node = BETTA_BODY_END - 1; node >= 0; node -= 1) {
      this.silhouetteTriangle(left[node], right[node], right[node + 1], appearance.base);
      this.silhouetteTriangle(left[node], right[node + 1], left[node + 1], appearance.base);
    }
    // Taper the peduncle into the veil.
    const peduncleTip = add(
      fish.renderSpine[BETTA_BODY_END],
      mul(
        normalize(
          sub(fish.renderSpine[BETTA_BODY_END + 1], fish.renderSpine[BETTA_BODY_END]),
          fromAngle(fish.heading + Math.PI),
        ),
        fish.bodyWidth * 0.9,
      ),
    );
    this.silhouetteTriangle(left[BETTA_BODY_END], right[BETTA_BODY_END], peduncleTip, appearance.base);

    // Blunt head with an upturned mouth.
    const headForward = normalize(
      sub(fish.renderSpine[0], fish.renderSpine[1]),
      fromAngle(fish.heading),
    );
    const headNormal = perpendicular(headForward);
    const noseCenter = add(fish.renderSpine[0], mul(headForward, fish.bodyWidth * 0.3));
    const noseHalfWidth = this.widthAt(fish, 0) * 0.78;
    const noseLeft = add(noseCenter, mul(headNormal, noseHalfWidth));
    const noseRight = add(noseCenter, mul(headNormal, -noseHalfWidth));
    this.silhouetteTriangle(left[0], noseLeft, noseRight, appearance.base);
    this.silhouetteTriangle(left[0], noseRight, right[0], appearance.base);
    this.silhouetteCircle(noseCenter, Math.max(1, noseHalfWidth * 0.8), appearance.base);

    // 5. Iridescent scale sheen / marbling, authored in normalized body space
    //    (0 = nose, 1 = end of the spine; the body ends around 0.55).
    for (const [patchIndex, patch] of patchesFor(appearance).entries()) {
      const spinePosition = patch.position * (SPINE_NODES - 1);
      const node = Math.min(SPINE_NODES - 2, Math.floor(spinePosition));
      const amount = spinePosition - node;
      const center = lerp(fish.renderSpine[node], fish.renderSpine[node + 1], amount);
      const previous = Math.max(0, node - 1);
      const next = Math.min(SPINE_NODES - 1, node + 2);
      const forward = normalize(
        sub(fish.renderSpine[previous], fish.renderSpine[next]),
        fromAngle(fish.heading),
      );
      const normal = perpendicular(forward);
      const localWidth =
        this.widthAt(fish, node) * (1 - amount) +
        this.widthAt(fish, node + 1) * amount;
      const patchCenter = add(center, mul(normal, localWidth * patch.offset));
      const patchColor =
        patch.color === "accent" ? appearance.accent : appearance.marking;
      this.bodyTriangles.ellipse(
        patchCenter,
        forward,
        normal,
        fish.bodyLength * patch.length,
        localWidth * patch.width,
        patchColor,
        patchIndex * 1.73 + patch.position * 5.1 + fish.swimPhase * 0.05,
      );
    }

    // Large eyes set on the sides of the head.
    const eyeAnchor = add(fish.renderSpine[0], mul(headForward, fish.bodyWidth * 0.12));
    const eyeOffset = this.widthAt(fish, 0) * 0.66;
    const eyeRadius = Math.max(0.7, fish.bodyWidth * 0.15);
    this.bodyTriangles.circle(add(eyeAnchor, mul(headNormal, eyeOffset)), eyeRadius, appearance.eye, 6);
    this.bodyTriangles.circle(add(eyeAnchor, mul(headNormal, -eyeOffset)), eyeRadius, appearance.eye, 6);
  }

  private drawDebug(fish: Koi, appearance: FishAppearance): void {
    for (let node = 0; node < SPINE_NODES - 1; node += 1) {
      this.outlineLines.line(
        fish.renderSpine[node],
        fish.renderSpine[node + 1],
        appearance.eye,
      );
    }
  }
}
