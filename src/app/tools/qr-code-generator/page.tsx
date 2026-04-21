"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import QRCode from "qrcode";
import ToolLayout from "@/components/tools/ToolLayout";
import ToolSection from "@/components/tools/ToolSection";
import ToolLabel from "@/components/tools/ToolLabel";
import ToolActions, { ToolButton } from "@/components/tools/ToolActions";
import { useToolAnalytics } from "@/hooks";

const TOOL_SLUG = "qr-code-generator";

// ─── Presets ─────────────────────────────────────────────────────────────────
const PRESETS = [
  { label: "URL", placeholder: "https://example.com" },
  { label: "Email", placeholder: "mailto:hello@example.com" },
  { label: "Phone", placeholder: "tel:+1234567890" },
  { label: "Wi-Fi", placeholder: "WIFI:T:WPA;S:MyNetwork;P:MyPassword;;" },
  { label: "Text", placeholder: "Hello, world!" },
];

// ─── Error correction labels ────────────────────────────────────────────────
const EC_LEVELS = [
  { value: "L", label: "Low (7%)" },
  { value: "M", label: "Medium (15%)" },
  { value: "Q", label: "Quartile (25%)" },
  { value: "H", label: "High (30%)" },
] as const;

type ECLevel = "L" | "M" | "Q" | "H";

// ─── Component ───────────────────────────────────────────────────────────────
export default function QrCodeGeneratorPage() {
  const [text, setText] = useState("https://abitechpros.com");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState(300);
  const [ecLevel, setEcLevel] = useState<ECLevel>("M");
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const { trackRun, trackDownloaded } = useToolAnalytics(TOOL_SLUG);

  // Generate QR code (debounced)
  const generateQR = useCallback(async () => {
    if (!text.trim()) {
      setDataUrl(null);
      setError(null);
      return;
    }

    try {
      setError(null);

      // Render to canvas
      if (canvasRef.current) {
        await QRCode.toCanvas(canvasRef.current, text, {
          width: size,
          margin: 2,
          color: { dark: fgColor, light: bgColor },
          errorCorrectionLevel: ecLevel,
        });
      }

      // Also generate data URL for download
      const url = await QRCode.toDataURL(text, {
        width: size,
        margin: 2,
        color: { dark: fgColor, light: bgColor },
        errorCorrectionLevel: ecLevel,
      });
      setDataUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate QR code");
      setDataUrl(null);
    }
  }, [text, fgColor, bgColor, size, ecLevel]);

  // Auto-generate with debounce
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      generateQR();
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [generateQR]);

  // Manual generate (tracks analytics)
  const handleGenerate = () => {
    trackRun({ input_length: text.length });
    generateQR();
  };

  // Download as PNG
  const handleDownloadPNG = () => {
    if (!dataUrl) return;
    trackDownloaded({ file_format: "png" });
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "qrcode.png";
    a.click();
  };

  // Download as SVG
  const handleDownloadSVG = async () => {
    if (!text.trim()) return;
    try {
      const svgString = await QRCode.toString(text, {
        type: "svg",
        width: size,
        margin: 2,
        color: { dark: fgColor, light: bgColor },
        errorCorrectionLevel: ecLevel,
      });
      trackDownloaded({ file_format: "svg" });
      const blob = new Blob([svgString], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "qrcode.svg";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // Silently fail
    }
  };

  const handleReset = () => {
    setText("https://abitechpros.com");
    setFgColor("#000000");
    setBgColor("#ffffff");
    setSize(300);
    setEcLevel("M");
  };

  return (
    <ToolLayout
      title="QR Code Generator"
      description="Need a QR code for a link, a form, or a Wi-Fi password? Type it in, download it and you're done."
      size="lg"
      actions={
        <div className="flex items-center gap-2">
          <ToolButton variant="secondary" onClick={handleDownloadSVG} disabled={!dataUrl} icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          }>
            SVG
          </ToolButton>
          <ToolButton variant="primary" onClick={handleDownloadPNG} disabled={!dataUrl} icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          }>
            PNG
          </ToolButton>
        </div>
      }
    >
      {/* Input + Preview */}
      <ToolSection noBorder>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left: input */}
          <div className="flex flex-col gap-4">
            {/* Quick presets */}
            <div>
              <ToolLabel>Quick presets</ToolLabel>
              <div className="flex flex-wrap gap-1.5">
                {PRESETS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setText(p.placeholder)}
                    className="rounded-md border border-line bg-surface px-2.5 py-1 text-xs font-medium text-dim transition-colors hover:border-ink hover:text-ink"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Text input */}
            <div>
              <ToolLabel htmlFor="qr-text" hint={`${text.length} chars`}>
                Content
              </ToolLabel>
              <textarea
                id="qr-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter URL, text, email, phone number…"
                rows={4}
                className="w-full rounded-md border border-line bg-base px-3 py-2 text-sm text-ink placeholder:text-faint outline-none focus:border-ink focus:ring-1 focus:ring-ink transition resize-none"
              />
            </div>

            {/* Generate button (mobile) */}
            <ToolButton variant="primary" onClick={handleGenerate} disabled={!text.trim()}>
              Generate QR Code
            </ToolButton>
          </div>

          {/* Right: preview */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="flex items-center justify-center rounded-lg border border-line p-4"
              style={{ backgroundColor: bgColor }}
            >
              {error ? (
                <p className="text-sm text-red-500 text-center px-4 py-8">{error}</p>
              ) : !text.trim() ? (
                <div className="flex h-[200px] w-[200px] items-center justify-center">
                  <p className="text-xs text-faint text-center">Enter content to generate a QR code</p>
                </div>
              ) : (
                <canvas ref={canvasRef} className="max-w-full h-auto" />
              )}
            </div>

            {/* Download buttons (below preview) */}
            {dataUrl && (
              <div className="flex items-center gap-2">
                <ToolButton variant="secondary" size="sm" onClick={handleDownloadSVG}>
                  Download SVG
                </ToolButton>
                <ToolButton variant="primary" size="sm" onClick={handleDownloadPNG}>
                  Download PNG
                </ToolButton>
              </div>
            )}
          </div>
        </div>
      </ToolSection>

      {/* Customisation */}
      <ToolSection title="Customise">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Foreground colour */}
          <div>
            <ToolLabel htmlFor="qr-fg">Foreground colour</ToolLabel>
            <div className="flex items-center gap-2">
              <input
                id="qr-fg"
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="h-8 w-8 cursor-pointer rounded border border-line bg-transparent"
              />
              <input
                type="text"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="flex-1 rounded-md border border-line bg-base px-2 py-1 text-xs font-mono text-ink outline-none focus:border-ink focus:ring-1 focus:ring-ink transition"
              />
            </div>
          </div>

          {/* Background colour */}
          <div>
            <ToolLabel htmlFor="qr-bg">Background colour</ToolLabel>
            <div className="flex items-center gap-2">
              <input
                id="qr-bg"
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-8 w-8 cursor-pointer rounded border border-line bg-transparent"
              />
              <input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="flex-1 rounded-md border border-line bg-base px-2 py-1 text-xs font-mono text-ink outline-none focus:border-ink focus:ring-1 focus:ring-ink transition"
              />
            </div>
          </div>

          {/* Size */}
          <div>
            <ToolLabel htmlFor="qr-size" hint={`${size}px`}>
              Size
            </ToolLabel>
            <input
              id="qr-size"
              type="range"
              min={100}
              max={1000}
              step={50}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full accent-accent h-1.5 cursor-pointer"
            />
            <div className="mt-1 flex justify-between text-[10px] text-faint">
              <span>100px</span>
              <span>1000px</span>
            </div>
          </div>

          {/* Error correction */}
          <div>
            <ToolLabel htmlFor="qr-ec">Error correction</ToolLabel>
            <select
              id="qr-ec"
              value={ecLevel}
              onChange={(e) => setEcLevel(e.target.value as ECLevel)}
              className="w-full rounded-md border border-line bg-base px-2 py-1.5 text-xs text-ink outline-none focus:border-ink focus:ring-1 focus:ring-ink transition"
            >
              {EC_LEVELS.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
            <p className="mt-1 text-[10px] text-faint">
              Higher = more scannable when damaged
            </p>
          </div>
        </div>
      </ToolSection>

      {/* Bottom actions */}
      <ToolSection>
        <ToolActions align="between">
          <ToolButton variant="ghost" size="sm" onClick={handleReset}>
            Reset defaults
          </ToolButton>
          <ToolButton variant="primary" size="sm" onClick={handleGenerate} disabled={!text.trim()}>
            Regenerate
          </ToolButton>
        </ToolActions>
      </ToolSection>
    </ToolLayout>
  );
}
