import type { RGB } from "./game-types";
import {
  COLOR_LIGHTNESS_MAX,
  COLOR_LIGHTNESS_MIN,
  COLOR_SATURATION_MAX,
  COLOR_SATURATION_MIN,
} from "./constants";

// --- Conversions ---

export function rgbToHex(rgb: RGB): string {
  const toHex = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`.toUpperCase();
}

export function hexToRgb(hex: string): RGB | null {
  const clean = hex.replace(/^#/, "");
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

// sRGB -> linear RGB
function srgbToLinear(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

// linear RGB -> XYZ (D65)
function rgbToXyz(rgb: RGB): [number, number, number] {
  const r = srgbToLinear(rgb.r);
  const g = srgbToLinear(rgb.g);
  const b = srgbToLinear(rgb.b);
  return [
    r * 0.4124564 + g * 0.3575761 + b * 0.1804375,
    r * 0.2126729 + g * 0.7151522 + b * 0.072175,
    r * 0.0193339 + g * 0.119192 + b * 0.9503041,
  ];
}

// XYZ -> CIELAB
function xyzToLab(x: number, y: number, z: number): [number, number, number] {
  const xn = 0.95047;
  const yn = 1.0;
  const zn = 1.08883;

  const f = (t: number) =>
    t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116;

  const fx = f(x / xn);
  const fy = f(y / yn);
  const fz = f(z / zn);

  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}

export function rgbToLab(rgb: RGB): [number, number, number] {
  const [x, y, z] = rgbToXyz(rgb);
  return xyzToLab(x, y, z);
}

// --- Delta E (CIE76) ---

export function deltaE(c1: RGB, c2: RGB): number {
  const [l1, a1, b1] = rgbToLab(c1);
  const [l2, a2, b2] = rgbToLab(c2);
  return Math.sqrt((l1 - l2) ** 2 + (a1 - a2) ** 2 + (b1 - b2) ** 2);
}

export function calculateMatchScore(target: RGB, player: RGB): number {
  const de = deltaE(target, player);
  return Math.max(0, Math.round(100 - de));
}

// --- HSL -> RGB ---

export function hslToRgb(h: number, s: number, l: number): RGB {
  const sNorm = s / 100;
  const lNorm = l / 100;

  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lNorm - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

// --- Color Generation (curated) ---

export function generateRandomColor(): RGB {
  const h = Math.random() * 360;
  const s =
    COLOR_SATURATION_MIN +
    Math.random() * (COLOR_SATURATION_MAX - COLOR_SATURATION_MIN);
  const l =
    COLOR_LIGHTNESS_MIN +
    Math.random() * (COLOR_LIGHTNESS_MAX - COLOR_LIGHTNESS_MIN);
  return hslToRgb(h, s, l);
}
