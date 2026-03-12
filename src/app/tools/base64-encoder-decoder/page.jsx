"use client";

import { useState, useCallback } from "react";
import ToolLayout from "@/components/tools/ToolLayout";
import ToolSection from "@/components/tools/ToolSection";
import ToolLabel from "@/components/tools/ToolLabel";
import ToolActions, { ToolButton } from "@/components/tools/ToolActions";
import ToolCopyButton from "@/components/tools/ToolCopyButton";
import { useToolAnalytics } from "@/hooks";

const TOOL_SLUG = "Base64-Encoder-Decoder";

// ─── Encode / Decode helpers ────────────────────────────────────────────────
function encodeBase64(input) {
  try {
    // Handle Unicode properly via TextEncoder
    const bytes = new TextEncoder().encode(input);
    const binary = Array.from(bytes, (b) => String.fromCharCode(b)).join("");
    return { result: btoa(binary), error: null };
  } catch (e) {
    return { result: "", error: e.message || "Failed to encode" };
  }
}

function decodeBase64(input) {
  try {
    const binary = atob(input.trim());
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return { result: new TextDecoder().decode(bytes), error: null };
  } catch (e) {
    return { result: "", error: "Invalid Base64 string" };
  }
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function Base64EncoderDecoderPage() {
  const [mode, setMode] = useState("encode"); // "encode" | "decode"
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);
  const [autoConvert, setAutoConvert] = useState(true);

  const { trackRun, trackEvent } = useToolAnalytics(TOOL_SLUG);

  // Live conversion when autoConvert is on
  const convert = useCallback(
    (text, currentMode) => {
      if (!text.trim()) {
        setOutput("");
        setError(null);
        return;
      }

      const { result, error: err } =
        currentMode === "encode" ? encodeBase64(text) : decodeBase64(text);
      setOutput(result);
      setError(err);
    },
    []
  );

  const handleInputChange = (value) => {
    setInput(value);
    if (autoConvert) convert(value, mode);
  };

  const handleModeSwitch = (newMode) => {
    setMode(newMode);
    if (autoConvert && input) convert(input, newMode);
  };

  const handleConvert = () => {
    trackRun({ mode, input_length: input.length });
    convert(input, mode);
  };

  // Swap input ↔ output
  const handleSwap = () => {
    trackEvent("tool_swap", { mode });
    const newInput = output;
    const newMode = mode === "encode" ? "decode" : "encode";
    setInput(newInput);
    setMode(newMode);
    if (autoConvert) convert(newInput, newMode);
  };

  const handleClear = () => {
    trackEvent("tool_clear");
    setInput("");
    setOutput("");
    setError(null);
  };

  const handlePaste = async () => {
    try {
      const clip = await navigator.clipboard.readText();
      setInput(clip);
      if (autoConvert) convert(clip, mode);
      trackRun({ mode, input_length: clip.length, action: "paste" });
    } catch {
      // Clipboard permission denied
    }
  };

  // Sample text
  const handleSample = () => {
    const sample =
      mode === "encode"
        ? 'Hello, World! 🌍\nBase64 encoding is used to represent binary data in an ASCII string format.'
        : "SGVsbG8sIFdvcmxkISDwn4yNCkJhc2U2NCBlbmNvZGluZyBpcyB1c2VkIHRvIHJlcHJlc2VudCBiaW5hcnkgZGF0YSBpbiBhbiBBU0NJSSBzdHJpbmcgZm9ybWF0Lg==";
    setInput(sample);
    if (autoConvert) convert(sample, mode);
  };

  return (
    <ToolLayout
      title="Base64 Encoder / Decoder"
      description="Encode text to Base64 or decode Base64 strings back to plain text. Supports Unicode."
      size="lg"
    >
      {/* Mode toggle */}
      <ToolSection noBorder>
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Encode / Decode tabs */}
          <div className="flex rounded-md border border-line overflow-hidden text-xs font-medium">
            {["encode", "decode"].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => handleModeSwitch(m)}
                className={`px-4 py-2 capitalize transition-colors ${
                  mode === m
                    ? "bg-accent text-accent-fg"
                    : "bg-surface text-dim hover:bg-muted hover:text-ink"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Auto-convert toggle */}
          <label className="flex items-center gap-2 cursor-pointer text-xs text-dim">
            <span
              role="switch"
              aria-checked={autoConvert}
              tabIndex={0}
              onClick={() => setAutoConvert((p) => !p)}
              onKeyDown={(e) => e.key === "Enter" && setAutoConvert((p) => !p)}
              className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
                autoConvert ? "bg-accent" : "bg-line"
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${
                  autoConvert ? "translate-x-[18px]" : "translate-x-[3px]"
                }`}
              />
            </span>
            Auto-convert
          </label>
        </div>
      </ToolSection>

      {/* Input / Output panels */}
      <ToolSection>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Input */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <ToolLabel htmlFor="b64-input" hint={`${input.length} chars`}>
                {mode === "encode" ? "Plain text" : "Base64 string"}
              </ToolLabel>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleSample}
                  className="rounded-md border border-line bg-surface px-2 py-0.5 text-[11px] font-medium text-dim transition hover:border-ink hover:text-ink"
                >
                  Sample
                </button>
                <button
                  type="button"
                  onClick={handlePaste}
                  className="rounded-md border border-line bg-surface px-2 py-0.5 text-[11px] font-medium text-dim transition hover:border-ink hover:text-ink"
                >
                  Paste
                </button>
              </div>
            </div>
            <textarea
              id="b64-input"
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={
                mode === "encode"
                  ? "Enter plain text to encode…"
                  : "Paste Base64 string to decode…"
              }
              rows={10}
              className="w-full resize-y rounded-md border border-line bg-base p-3 font-mono text-xs leading-relaxed text-ink placeholder:text-faint outline-none focus:border-ink focus:ring-1 focus:ring-ink transition"
            />
          </div>

          {/* Swap + Output */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <ToolLabel htmlFor="b64-output" hint={`${output.length} chars`}>
                {mode === "encode" ? "Base64 output" : "Decoded text"}
              </ToolLabel>
              <ToolCopyButton value={output} label="Copy" toolSlug={TOOL_SLUG} />
            </div>

            {/* Swap button between panels (visible on lg) */}
            <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              {/* Positioned via the grid, so we use a relative wrapper instead */}
            </div>

            <div className="relative">
              <textarea
                id="b64-output"
                value={output}
                readOnly
                rows={10}
                className="w-full resize-y rounded-md border border-line bg-base p-3 font-mono text-xs leading-relaxed text-ink outline-none transition"
                placeholder="Result will appear here…"
              />
              {error && (
                <p className="mt-1.5 text-xs text-red-500">{error}</p>
              )}
            </div>
          </div>
        </div>

        {/* Swap button */}
        <div className="mt-3 flex justify-center">
          <ToolButton
            variant="secondary"
            size="sm"
            onClick={handleSwap}
            disabled={!output}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="7 16 3 12 7 8" />
                <line x1="21" y1="12" x2="3" y2="12" />
                <polyline points="17 8 21 12 17 16" />
              </svg>
            }
          >
            Swap input &amp; output
          </ToolButton>
        </div>
      </ToolSection>

      {/* Info */}
      <ToolSection title="About Base64">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 text-xs text-dim leading-relaxed">
          <div>
            <p className="font-semibold text-ink mb-1">What is Base64?</p>
            <p>
              Base64 is a binary-to-text encoding scheme that represents binary
              data using 64 ASCII characters (A–Z, a–z, 0–9, +, /).
            </p>
          </div>
          <div>
            <p className="font-semibold text-ink mb-1">Common uses</p>
            <p>
              Embedding images in HTML/CSS, encoding email attachments (MIME),
              passing data in URLs, and storing binary data in JSON.
            </p>
          </div>
          <div>
            <p className="font-semibold text-ink mb-1">Size impact</p>
            <p>
              Base64 encoding increases data size by approximately 33%. A 3-byte
              input becomes 4 Base64 characters.
            </p>
          </div>
        </div>
      </ToolSection>

      {/* Bottom actions */}
      <ToolSection>
        <ToolActions align="between">
          <ToolButton variant="ghost" size="sm" onClick={handleClear} disabled={!input && !output}>
            Clear
          </ToolButton>
          <div className="flex items-center gap-2">
            <ToolCopyButton value={output} label="Copy result" toolSlug={TOOL_SLUG} />
            {!autoConvert && (
              <ToolButton
                variant="primary"
                size="sm"
                onClick={handleConvert}
                disabled={!input.trim()}
              >
                {mode === "encode" ? "Encode" : "Decode"}
              </ToolButton>
            )}
          </div>
        </ToolActions>
      </ToolSection>
    </ToolLayout>
  );
}
