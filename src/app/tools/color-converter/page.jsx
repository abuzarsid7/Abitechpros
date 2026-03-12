"use client";

import { useState, useCallback, useEffect } from "react";
import ToolLayout from "@/components/tools/ToolLayout";
import ToolSection from "@/components/tools/ToolSection";
import ToolLabel from "@/components/tools/ToolLabel";
import ToolActions, { ToolButton } from "@/components/tools/ToolActions";
import ToolCopyButton from "@/components/tools/ToolCopyButton";
import { useToolAnalytics } from "@/hooks";

const TOOL_SLUG = "color-converter";

// ─── Parsing helpers ────────────────────────────────────────────────────────
function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

function hexToRgb(hex) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  if (hex.length !== 6) return null;
  const n = parseInt(hex, 16);
  if (isNaN(n)) return null;
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgbToHex({ r, g, b }) {
  return (
    "#" +
    [r, g, b].map((c) => clamp(Math.round(c), 0, 255).toString(16).padStart(2, "0")).join("")
  );
}

function rgbToHsl({ r, g, b }) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb({ h, s, l }) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function rgbToCmyk({ r, g, b }) {
  r /= 255;
  g /= 255;
  b /= 255;
  const k = 1 - Math.max(r, g, b);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  return {
    c: Math.round(((1 - r - k) / (1 - k)) * 100),
    m: Math.round(((1 - g - k) / (1 - k)) * 100),
    y: Math.round(((1 - b - k) / (1 - k)) * 100),
    k: Math.round(k * 100),
  };
}

function cmykToRgb({ c, m, y, k }) {
  c /= 100;
  m /= 100;
  y /= 100;
  k /= 100;
  return {
    r: Math.round(255 * (1 - c) * (1 - k)),
    g: Math.round(255 * (1 - m) * (1 - k)),
    b: Math.round(255 * (1 - y) * (1 - k)),
  };
}

function rgbToHsb({ r, g, b }) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = max === 0 ? 0 : (max - min) / max,
    v = max;
  if (max !== min) {
    const d = max - min;
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    b: Math.round(v * 100),
  };
}

// ─── Format strings ─────────────────────────────────────────────────────────
const fmtHex = (hex) => hex.toUpperCase();
const fmtRgb = ({ r, g, b }) => `rgb(${r}, ${g}, ${b})`;
const fmtHsl = ({ h, s, l }) => `hsl(${h}, ${s}%, ${l}%)`;
const fmtCmyk = ({ c, m, y, k }) => `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`;
const fmtHsb = ({ h, s, b }) => `hsb(${h}, ${s}%, ${b}%)`;

const PRESETS = [
  { label: "Coral", hex: "#FF6B6B" },
  { label: "Teal", hex: "#2EC4B6" },
  { label: "Gold", hex: "#FFD166" },
  { label: "Indigo", hex: "#6C63FF" },
  { label: "Emerald", hex: "#06D6A0" },
  { label: "Slate", hex: "#475569" },
  { label: "Rose", hex: "#F43F5E" },
  { label: "Sky", hex: "#38BDF8" },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function ColorConverterPage() {
  const [hex, setHex] = useState("#FF6B6B");
  const [rgb, setRgb] = useState({ r: 255, g: 107, b: 107 });
  const [hsl, setHsl] = useState({ h: 0, s: 100, l: 71 });
  const [cmyk, setCmyk] = useState({ c: 0, m: 58, y: 58, k: 0 });
  const [hsb, setHsb] = useState({ h: 0, s: 58, b: 100 });
  const [inputMode, setInputMode] = useState("hex");

  const { trackRun } = useToolAnalytics(TOOL_SLUG);

  const updateFromRgb = useCallback((newRgb) => {
    setRgb(newRgb);
    setHex(rgbToHex(newRgb));
    setHsl(rgbToHsl(newRgb));
    setCmyk(rgbToCmyk(newRgb));
    setHsb(rgbToHsb(newRgb));
  }, []);

  const handleHexChange = (value) => {
    setHex(value);
    const parsed = hexToRgb(value);
    if (parsed) {
      updateFromRgb(parsed);
      trackRun({ format: "hex" });
    }
  };

  const handleRgbChange = (key, value) => {
    const n = parseInt(value, 10);
    if (isNaN(n)) return;
    const newRgb = { ...rgb, [key]: clamp(n, 0, 255) };
    updateFromRgb(newRgb);
    trackRun({ format: "rgb" });
  };

  const handleHslChange = (key, value) => {
    const n = parseInt(value, 10);
    if (isNaN(n)) return;
    const maxVal = key === "h" ? 360 : 100;
    const newHsl = { ...hsl, [key]: clamp(n, 0, maxVal) };
    setHsl(newHsl);
    updateFromRgb(hslToRgb(newHsl));
    trackRun({ format: "hsl" });
  };

  const handleCmykChange = (key, value) => {
    const n = parseInt(value, 10);
    if (isNaN(n)) return;
    const newCmyk = { ...cmyk, [key]: clamp(n, 0, 100) };
    setCmyk(newCmyk);
    updateFromRgb(cmykToRgb(newCmyk));
    trackRun({ format: "cmyk" });
  };

  const handlePreset = (presetHex) => {
    setHex(presetHex);
    const parsed = hexToRgb(presetHex);
    if (parsed) updateFromRgb(parsed);
  };

  const handleRandom = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    updateFromRgb({ r, g, b });
    trackRun({ format: "random" });
  };

  // Output strings
  const hexStr = fmtHex(hex);
  const rgbStr = fmtRgb(rgb);
  const hslStr = fmtHsl(hsl);
  const cmykStr = fmtCmyk(cmyk);
  const hsbStr = fmtHsb(hsb);

  const inputClass =
    "w-full rounded-md border border-line bg-base px-3 py-2 text-sm text-ink placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-ink/20";
  const smallInputClass =
    "w-full rounded-md border border-line bg-base px-2 py-1.5 text-sm text-ink text-center focus:outline-none focus:ring-2 focus:ring-ink/20";

  return (
    <ToolLayout
      title="Color Converter"
      description="Convert colors between HEX, RGB, HSL, CMYK, and HSB formats."
      actions={<ToolButton onClick={handleRandom}>Random</ToolButton>}
    >
      {/* ── Color Preview ──────────────────────────────────────── */}
      <ToolSection noBorder title="Preview">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch">
          <div
            className="w-full sm:w-48 h-32 rounded-lg border border-line shadow-inner"
            style={{ backgroundColor: hex }}
          />
          <div className="flex-1 grid grid-cols-1 gap-2">
            {[
              { label: "HEX", value: hexStr },
              { label: "RGB", value: rgbStr },
              { label: "HSL", value: hslStr },
              { label: "CMYK", value: cmykStr },
              { label: "HSB", value: hsbStr },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="w-12 text-xs font-medium text-faint">{label}</span>
                <code className="flex-1 text-xs text-ink bg-base rounded px-2 py-1 border border-line truncate">
                  {value}
                </code>
                <ToolCopyButton value={value} toolSlug={TOOL_SLUG} />
              </div>
            ))}
          </div>
        </div>
      </ToolSection>

      {/* ── Presets ────────────────────────────────────────────── */}
      <ToolSection title="Presets">
        <div className="flex flex-wrap gap-2">
          {PRESETS.map(({ label, hex: ph }) => (
            <button
              key={ph}
              type="button"
              onClick={() => handlePreset(ph)}
              className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-dim hover:bg-muted hover:text-ink transition-colors"
            >
              <span
                className="inline-block w-3 h-3 rounded-full border border-line"
                style={{ backgroundColor: ph }}
              />
              {label}
            </button>
          ))}
        </div>
      </ToolSection>

      {/* ── HEX input ─────────────────────────────────────────── */}
      <ToolSection title="HEX">
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <ToolLabel htmlFor="cc-hex">Hex Value</ToolLabel>
            <div className="flex gap-2">
              <input
                type="color"
                value={hex.length === 7 ? hex : "#000000"}
                onChange={(e) => handleHexChange(e.target.value)}
                className="h-9 w-12 cursor-pointer rounded border border-line bg-base p-0.5"
              />
              <input
                id="cc-hex"
                type="text"
                value={hex}
                onChange={(e) => handleHexChange(e.target.value)}
                placeholder="#FF6B6B"
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </ToolSection>

      {/* ── RGB input ─────────────────────────────────────────── */}
      <ToolSection title="RGB">
        <div className="grid grid-cols-3 gap-3">
          {["r", "g", "b"].map((ch) => (
            <div key={ch}>
              <ToolLabel htmlFor={`cc-${ch}`}>{ch.toUpperCase()} (0–255)</ToolLabel>
              <input
                id={`cc-${ch}`}
                type="number"
                min={0}
                max={255}
                value={rgb[ch]}
                onChange={(e) => handleRgbChange(ch, e.target.value)}
                className={smallInputClass}
              />
            </div>
          ))}
        </div>
      </ToolSection>

      {/* ── HSL input ─────────────────────────────────────────── */}
      <ToolSection title="HSL">
        <div className="grid grid-cols-3 gap-3">
          {[
            { key: "h", label: "H (0–360)", max: 360 },
            { key: "s", label: "S (0–100%)", max: 100 },
            { key: "l", label: "L (0–100%)", max: 100 },
          ].map(({ key, label, max }) => (
            <div key={key}>
              <ToolLabel htmlFor={`cc-hsl-${key}`}>{label}</ToolLabel>
              <input
                id={`cc-hsl-${key}`}
                type="number"
                min={0}
                max={max}
                value={hsl[key]}
                onChange={(e) => handleHslChange(key, e.target.value)}
                className={smallInputClass}
              />
            </div>
          ))}
        </div>
      </ToolSection>

      {/* ── CMYK input ────────────────────────────────────────── */}
      <ToolSection title="CMYK">
        <div className="grid grid-cols-4 gap-3">
          {["c", "m", "y", "k"].map((ch) => (
            <div key={ch}>
              <ToolLabel htmlFor={`cc-cmyk-${ch}`}>{ch.toUpperCase()} (0–100%)</ToolLabel>
              <input
                id={`cc-cmyk-${ch}`}
                type="number"
                min={0}
                max={100}
                value={cmyk[ch]}
                onChange={(e) => handleCmykChange(ch, e.target.value)}
                className={smallInputClass}
              />
            </div>
          ))}
        </div>
      </ToolSection>

      {/* ── About ─────────────────────────────────────────────── */}
      <ToolSection title="About Color Converter">
        <div className="prose prose-sm text-dim max-w-none">
          <p>
            Convert colours between the most common formats used in web
            development and design: HEX, RGB, HSL, CMYK, and HSB/HSV.
            All conversions happen instantly in your browser — nothing is
            sent to a server.
          </p>
          <ul className="mt-2 space-y-1 text-xs text-faint list-disc list-inside">
            <li><strong>HEX</strong> — 6-digit hexadecimal notation (#RRGGBB)</li>
            <li><strong>RGB</strong> — Red, Green, Blue channels (0–255)</li>
            <li><strong>HSL</strong> — Hue, Saturation, Lightness</li>
            <li><strong>CMYK</strong> — Cyan, Magenta, Yellow, Key (print)</li>
            <li><strong>HSB/HSV</strong> — Hue, Saturation, Brightness</li>
          </ul>
        </div>
      </ToolSection>
    </ToolLayout>
  );
}
