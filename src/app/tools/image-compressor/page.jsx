"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import ToolLayout from "@/components/tools/ToolLayout";
import ToolSection from "@/components/tools/ToolSection";
import ToolLabel from "@/components/tools/ToolLabel";
import ToolActions, { ToolButton } from "@/components/tools/ToolActions";
import { useToolAnalytics } from "@/hooks";

const TOOL_SLUG = "image-compressor";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function percentSaved(original, compressed) {
  if (!original) return 0;
  return Math.round(((original - compressed) / original) * 100);
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function ImageCompressorPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [compressed, setCompressed] = useState(null);
  const [compressedSize, setCompressedSize] = useState(0);
  const [originalSize, setOriginalSize] = useState(0);
  const [quality, setQuality] = useState(80);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [format, setFormat] = useState("image/jpeg");
  const [processing, setProcessing] = useState(false);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0, newW: 0, newH: 0 });
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const { trackRun, trackDownloaded } = useToolAnalytics(TOOL_SLUG);

  const handleFile = useCallback((f) => {
    if (!f || !f.type.startsWith("image/")) return;
    setFile(f);
    setOriginalSize(f.size);
    setCompressed(null);
    setCompressedSize(0);
    const url = URL.createObjectURL(f);
    setPreview(url);

    // Read dimensions
    const img = new Image();
    img.onload = () => setDimensions((prev) => ({ ...prev, w: img.width, h: img.height }));
    img.src = url;
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer?.files?.[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const compress = useCallback(async () => {
    if (!file) return;
    setProcessing(true);

    try {
      const bitmap = await createImageBitmap(file);
      let { width, height } = bitmap;

      // Scale down if needed
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      setDimensions((prev) => ({ ...prev, newW: width, newH: height }));

      const canvas = new OffscreenCanvas(width, height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(bitmap, 0, 0, width, height);

      const blob = await canvas.convertToBlob({
        type: format,
        quality: quality / 100,
      });

      const url = URL.createObjectURL(blob);
      setCompressed(url);
      setCompressedSize(blob.size);
      trackRun({
        original_size: file.size,
        compressed_size: blob.size,
        quality,
        format,
      });
    } catch {
      // Fallback for browsers without OffscreenCanvas
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        setDimensions((prev) => ({ ...prev, newW: width, newH: height }));

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              setCompressed(url);
              setCompressedSize(blob.size);
              trackRun({
                original_size: file.size,
                compressed_size: blob.size,
                quality,
                format,
              });
            }
            setProcessing(false);
          },
          format,
          quality / 100
        );
      };
      img.src = URL.createObjectURL(file);
      return; // Wait for img.onload callback
    }
    setProcessing(false);
  }, [file, quality, maxWidth, format, trackRun]);

  const handleDownload = () => {
    if (!compressed) return;
    const ext = format === "image/png" ? "png" : format === "image/webp" ? "webp" : "jpg";
    const a = document.createElement("a");
    a.href = compressed;
    a.download = `compressed-${file?.name?.replace(/\.[^.]+$/, "")}.${ext}`;
    a.click();
    trackDownloaded({ format: ext, compressed_size: compressedSize });
  };

  const handleClear = () => {
    setFile(null);
    setPreview(null);
    setCompressed(null);
    setCompressedSize(0);
    setOriginalSize(0);
    setDimensions({ w: 0, h: 0, newW: 0, newH: 0 });
    if (inputRef.current) inputRef.current.value = "";
  };

  const saved = percentSaved(originalSize, compressedSize);

  const inputClass =
    "w-full rounded-md border border-line bg-base px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ink/20";

  return (
    <ToolLayout
      title="Image Compressor"
      description="Compress and resize images in your browser — nothing is uploaded to a server."
      actions={
        file && (
          <ToolButton variant="ghost" onClick={handleClear}>
            Clear
          </ToolButton>
        )
      }
    >
      {/* ── Drop zone ─────────────────────────────────────────── */}
      <ToolSection noBorder>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed py-12 cursor-pointer transition-colors ${
            dragOver
              ? "border-accent bg-accent/5"
              : "border-line hover:border-dim"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-faint"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <p className="text-sm text-dim">
            {file ? file.name : "Drop an image here or click to select"}
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e.target.files?.[0])}
            className="hidden"
          />
        </div>
      </ToolSection>

      {/* ── Settings ──────────────────────────────────────────── */}
      {file && (
        <ToolSection title="Settings">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <ToolLabel htmlFor="ic-quality" hint={`${quality}%`}>
                Quality
              </ToolLabel>
              <input
                id="ic-quality"
                type="range"
                min={10}
                max={100}
                step={5}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full accent-accent"
              />
            </div>
            <div>
              <ToolLabel htmlFor="ic-width">Max Width (px)</ToolLabel>
              <input
                id="ic-width"
                type="number"
                min={100}
                max={4096}
                value={maxWidth}
                onChange={(e) => setMaxWidth(Number(e.target.value))}
                className={inputClass}
              />
            </div>
            <div>
              <ToolLabel htmlFor="ic-format">Output Format</ToolLabel>
              <select
                id="ic-format"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className={inputClass}
              >
                <option value="image/jpeg">JPEG</option>
                <option value="image/png">PNG</option>
                <option value="image/webp">WebP</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <ToolActions align="between">
              <span className="text-xs text-faint">
                Original: {formatBytes(originalSize)} · {dimensions.w}×{dimensions.h}px
              </span>
              <ToolButton onClick={compress} disabled={processing}>
                {processing ? "Compressing…" : "Compress"}
              </ToolButton>
            </ToolActions>
          </div>
        </ToolSection>
      )}

      {/* ── Result ────────────────────────────────────────────── */}
      {compressed && (
        <ToolSection title="Result">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Original", value: formatBytes(originalSize) },
                { label: "Compressed", value: formatBytes(compressedSize) },
                { label: "Saved", value: `${saved}%` },
                {
                  label: "Dimensions",
                  value: `${dimensions.newW}×${dimensions.newH}`,
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-lg border border-line bg-base p-3 text-center"
                >
                  <p className="text-[11px] uppercase tracking-wider text-faint">
                    {label}
                  </p>
                  <p className="mt-0.5 text-lg font-semibold text-ink">{value}</p>
                </div>
              ))}
            </div>

            {/* Preview */}
            <div className="rounded-lg border border-line overflow-hidden bg-[repeating-conic-gradient(#80808015_0%_25%,transparent_0%_50%)_0_0/16px_16px]">
              <Image
                src={compressed}
                alt="Compressed preview"
                width={dimensions.newW || 800}
                height={dimensions.newH || 600}
                loading="lazy"
                unoptimized
                sizes="(max-width: 640px) 100vw, 50vw"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Savings bar */}
          {saved > 0 && (
            <div className="mb-4">
              <div className="flex justify-between text-xs text-faint mb-1">
                <span>Size reduction</span>
                <span>{saved}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-base overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${saved}%` }}
                />
              </div>
            </div>
          )}

          <ToolActions>
            <ToolButton variant="secondary" onClick={compress}>
              Re-compress
            </ToolButton>
            <ToolButton onClick={handleDownload}>Download</ToolButton>
          </ToolActions>
        </ToolSection>
      )}

      {/* ── About ─────────────────────────────────────────────── */}
      <ToolSection title="About Image Compressor">
        <div className="prose prose-sm text-dim max-w-none">
          <p>
            Compress JPEG, PNG, and WebP images entirely in your browser using
            the Canvas API. Your images never leave your device — no uploads, no
            servers, fully private.
          </p>
          <ul className="mt-2 space-y-1 text-xs text-faint list-disc list-inside">
            <li>Adjust quality from 10% to 100%</li>
            <li>Resize images by setting a maximum width</li>
            <li>Convert between JPEG, PNG, and WebP</li>
            <li>See size savings and download instantly</li>
          </ul>
        </div>
      </ToolSection>
    </ToolLayout>
  );
}
