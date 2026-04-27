/** Common math helpers used by animations and scroll logic. */

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Remap a value from one range to another, clamped. */
export function remap(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  const t = clamp((value - inMin) / (inMax - inMin), 0, 1);
  return outMin + (outMax - outMin) * t;
}

/** Smooth ease-in-out curve. */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

/** Round to N decimal places without floating point noise. */
export function round(value: number, decimals = 0): number {
  const m = 10 ** decimals;
  return Math.round(value * m) / m;
}

/** Distance between two 2D points. */
export function distance(
  ax: number,
  ay: number,
  bx: number,
  by: number,
): number {
  const dx = ax - bx;
  const dy = ay - by;
  return Math.sqrt(dx * dx + dy * dy);
}

/** Deterministic pseudo-random from a 32-bit integer seed. */
export function mulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Normal-ish distribution via the central-limit trick. */
export function randomNormal(random = Math.random): number {
  let sum = 0;
  for (let i = 0; i < 6; i++) sum += random();
  return sum / 6 - 0.5;
}
