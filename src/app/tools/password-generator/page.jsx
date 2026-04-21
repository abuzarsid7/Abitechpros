"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import ToolLayout from "@/components/tools/ToolLayout";
import ToolSection from "@/components/tools/ToolSection";
import ToolLabel from "@/components/tools/ToolLabel";
import ToolActions, { ToolButton } from "@/components/tools/ToolActions";
import ToolCopyButton from "@/components/tools/ToolCopyButton";
import { useToolAnalytics, useClipboard } from "@/hooks";

const TOOL_SLUG = "password-generator";

// ─── Character sets ─────────────────────────────────────────────────────────
const CHARSETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?/~`",
};

// ─── Password generation ────────────────────────────────────────────────────
function generatePassword(length, options) {
  let pool = "";
  if (options.uppercase) pool += CHARSETS.uppercase;
  if (options.lowercase) pool += CHARSETS.lowercase;
  if (options.numbers) pool += CHARSETS.numbers;
  if (options.symbols) pool += CHARSETS.symbols;

  if (!pool) return "";

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (n) => pool[n % pool.length]).join("");
}

// ─── Strength calculation ───────────────────────────────────────────────────
function getStrength(password, options) {
  if (!password) return { label: "—", color: "bg-line", percent: 0 };

  let poolSize = 0;
  if (options.uppercase) poolSize += 26;
  if (options.lowercase) poolSize += 26;
  if (options.numbers) poolSize += 10;
  if (options.symbols) poolSize += 29;

  // Entropy = length × log2(poolSize)
  const entropy = password.length * Math.log2(poolSize || 1);

  if (entropy < 28) return { label: "Very Weak", color: "bg-red-500", percent: 15 };
  if (entropy < 36) return { label: "Weak", color: "bg-orange-500", percent: 30 };
  if (entropy < 60) return { label: "Fair", color: "bg-yellow-500", percent: 50 };
  if (entropy < 80) return { label: "Strong", color: "bg-green-500", percent: 75 };
  return { label: "Very Strong", color: "bg-emerald-500", percent: 100 };
}

// ─── Component ───────────────────────────────────────────────────────────────
const DEFAULT_OPTIONS = {
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: false,
};

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [password, setPassword] = useState("");
  const [history, setHistory] = useState([]);
  const passwordRef = useRef(null);

  const { trackRun } = useToolAnalytics(TOOL_SLUG);
  const { copy, copied } = useClipboard();

  // Generate on first mount and whenever settings change
  const generate = useCallback(() => {
    const pw = generatePassword(length, options);
    setPassword(pw);
    if (pw) {
      setHistory((prev) => [pw, ...prev].slice(0, 10));
      trackRun({ password_length: length });
    }
  }, [length, options, trackRun]);

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleOption = (key) =>
    setOptions((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      // Ensure at least one charset is selected
      if (!next.uppercase && !next.lowercase && !next.numbers && !next.symbols) return prev;
      return next;
    });

  const strength = getStrength(password, options);

  const handleCopyPassword = () => copy(password);

  return (
    <ToolLayout
      title="Password Generator"
      description="Stop using her birthdate or your dog's name as a password. Generate something actually secure in 2 seconds."
      actions={
        <ToolButton variant="primary" onClick={generate} icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
        }>
          Generate
        </ToolButton>
      }
    >
      {/* Password output */}
      <ToolSection noBorder>
        <ToolLabel hint={
          <span className="flex items-center gap-2">
            <span className={`inline-block h-2 w-2 rounded-full ${strength.color}`} />
            <span>{strength.label}</span>
          </span>
        }>
          Generated password
        </ToolLabel>

        <div className="flex items-stretch gap-2">
          <div
            ref={passwordRef}
            onClick={handleCopyPassword}
            className="flex-1 cursor-pointer select-all rounded-md border border-line bg-base px-4 py-3 font-mono text-sm text-ink break-all leading-relaxed transition hover:border-ink"
            title="Click to copy"
          >
            {password || <span className="text-faint">Select at least one character set</span>}
          </div>
          <div className="flex flex-col gap-1.5">
            <ToolCopyButton value={password} size="md" label={copied ? "Copied!" : "Copy"} toolSlug={TOOL_SLUG} />
            <ToolButton variant="secondary" size="sm" onClick={generate}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
            </ToolButton>
          </div>
        </div>

        {/* Strength bar */}
        <div className="mt-3 h-1.5 w-full rounded-full bg-line overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
            style={{ width: `${strength.percent}%` }}
          />
        </div>
      </ToolSection>

      {/* Settings */}
      <ToolSection title="Settings">
        {/* Length slider */}
        <div className="mb-5">
          <ToolLabel htmlFor="pw-length" hint={`${length} characters`}>
            Password length
          </ToolLabel>
          <div className="flex items-center gap-3">
            <input
              id="pw-length"
              type="range"
              min={4}
              max={128}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="flex-1 accent-accent h-1.5 cursor-pointer"
            />
            <input
              type="number"
              min={4}
              max={128}
              value={length}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (v >= 4 && v <= 128) setLength(v);
              }}
              className="w-16 rounded-md border border-line bg-base px-2 py-1 text-center text-xs text-ink outline-none focus:border-ink focus:ring-1 focus:ring-ink transition"
            />
          </div>
        </div>

        {/* Character set toggles */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { key: "uppercase", label: "Uppercase", sample: "A–Z" },
            { key: "lowercase", label: "Lowercase", sample: "a–z" },
            { key: "numbers", label: "Numbers", sample: "0–9" },
            { key: "symbols", label: "Symbols", sample: "!@#$" },
          ].map(({ key, label, sample }) => (
            <button
              key={key}
              type="button"
              onClick={() => toggleOption(key)}
              className={`group flex flex-col items-center gap-1 rounded-lg border p-3 text-center transition-colors ${
                options[key]
                  ? "border-accent bg-accent/5 text-ink"
                  : "border-line bg-surface text-faint hover:border-ink hover:text-ink"
              }`}
            >
              <span className="text-xs font-medium">{label}</span>
              <span className="font-mono text-[11px] text-dim">{sample}</span>
              <span
                className={`mt-1 h-1 w-6 rounded-full transition-colors ${
                  options[key] ? "bg-accent" : "bg-line"
                }`}
              />
            </button>
          ))}
        </div>
      </ToolSection>

      {/* Quick presets */}
      <ToolSection title="Quick presets">
        <div className="flex flex-wrap gap-2">
          {[
            { label: "PIN (4 digits)", length: 4, opts: { uppercase: false, lowercase: false, numbers: true, symbols: false } },
            { label: "Simple (8)", length: 8, opts: { uppercase: true, lowercase: true, numbers: false, symbols: false } },
            { label: "Standard (16)", length: 16, opts: { uppercase: true, lowercase: true, numbers: true, symbols: false } },
            { label: "Strong (24)", length: 24, opts: { uppercase: true, lowercase: true, numbers: true, symbols: true } },
            { label: "Maximum (64)", length: 64, opts: { uppercase: true, lowercase: true, numbers: true, symbols: true } },
          ].map(({ label, length: l, opts }) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                setLength(l);
                setOptions(opts);
              }}
              className="rounded-md border border-line bg-surface px-3 py-1.5 text-xs font-medium text-dim transition-colors hover:border-ink hover:text-ink"
            >
              {label}
            </button>
          ))}
        </div>
      </ToolSection>

      {/* History */}
      {history.length > 0 && (
        <ToolSection title="Recent passwords">
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {history.map((pw, i) => (
              <div
                key={`${pw}-${i}`}
                className="flex items-center justify-between gap-2 rounded-md border border-line bg-base px-3 py-2"
              >
                <span className="truncate font-mono text-xs text-dim">{pw}</span>
                <ToolCopyButton value={pw} size="sm" label="Copy" toolSlug={TOOL_SLUG} />
              </div>
            ))}
          </div>
        </ToolSection>
      )}

      {/* Bottom actions */}
      <ToolSection>
        <ToolActions align="between">
          <ToolButton
            variant="ghost"
            size="sm"
            onClick={() => {
              setHistory([]);
            }}
            disabled={history.length === 0}
          >
            Clear history
          </ToolButton>
          <ToolButton variant="primary" size="sm" onClick={generate}>
            Generate new
          </ToolButton>
        </ToolActions>
      </ToolSection>
    </ToolLayout>
  );
}
