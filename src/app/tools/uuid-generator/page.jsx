"use client";

import { useState, useCallback } from "react";
import ToolLayout from "@/components/tools/ToolLayout";
import ToolSection from "@/components/tools/ToolSection";
import ToolLabel from "@/components/tools/ToolLabel";
import ToolActions, { ToolButton } from "@/components/tools/ToolActions";
import ToolCopyButton from "@/components/tools/ToolCopyButton";
import { useToolAnalytics, useClipboard } from "@/hooks";

const TOOL_SLUG = "uuid-generator";

// ─── UUID v4 (random) ───────────────────────────────────────────────────────
function generateUUIDv4() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  // Set version 4
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  // Set variant 10xx
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

// ─── UUID v7 (timestamp-based, sortable) ────────────────────────────────────
function generateUUIDv7() {
  const now = Date.now();
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);

  // First 48 bits = unix timestamp in ms (big-endian)
  bytes[0] = (now / 2 ** 40) & 0xff;
  bytes[1] = (now / 2 ** 32) & 0xff;
  bytes[2] = (now / 2 ** 24) & 0xff;
  bytes[3] = (now / 2 ** 16) & 0xff;
  bytes[4] = (now / 2 ** 8) & 0xff;
  bytes[5] = now & 0xff;

  // Set version 7
  bytes[6] = (bytes[6] & 0x0f) | 0x70;
  // Set variant 10xx
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

// ─── Nil & Max UUIDs ────────────────────────────────────────────────────────
const NIL_UUID = "00000000-0000-0000-0000-000000000000";
const MAX_UUID = "ffffffff-ffff-ffff-ffff-ffffffffffff";

// ─── UUID parsing ───────────────────────────────────────────────────────────
function parseUUID(uuid) {
  const clean = uuid.replace(/-/g, "").toLowerCase();
  if (clean.length !== 32 || !/^[0-9a-f]{32}$/.test(clean)) return null;

  const version = parseInt(clean[12], 16);
  const variantBits = parseInt(clean[16], 16);
  let variant = "Unknown";
  if ((variantBits & 0x8) === 0) variant = "NCS (reserved)";
  else if ((variantBits & 0xc) === 0x8) variant = "RFC 4122 / RFC 9562";
  else if ((variantBits & 0xe) === 0xc) variant = "Microsoft (reserved)";
  else variant = "Future (reserved)";

  let timestamp = null;
  if (version === 7) {
    const tsHex = clean.slice(0, 12);
    const tsMs = parseInt(tsHex, 16);
    timestamp = new Date(tsMs).toISOString();
  }

  return { version, variant, timestamp };
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function UuidGeneratorPage() {
  const [version, setVersion] = useState("v4");
  const [count, setCount] = useState(1);
  const [caseStyle, setCaseStyle] = useState("lower"); // lower | upper
  const [hyphens, setHyphens] = useState(true);
  const [uuids, setUuids] = useState([]);
  const [history, setHistory] = useState([]);
  const [parseInput, setParseInput] = useState("");
  const [parseResult, setParseResult] = useState(null);

  const { trackRun, trackEvent } = useToolAnalytics(TOOL_SLUG);
  const { copy, copied } = useClipboard();

  const generate = useCallback(() => {
    const fn = version === "v7" ? generateUUIDv7 : generateUUIDv4;
    const list = Array.from({ length: count }, () => {
      let uuid = fn();
      if (!hyphens) uuid = uuid.replace(/-/g, "");
      if (caseStyle === "upper") uuid = uuid.toUpperCase();
      return uuid;
    });

    setUuids(list);
    setHistory((prev) => [...list, ...prev].slice(0, 50));
    trackRun({ version, count, case: caseStyle, hyphens });
  }, [version, count, caseStyle, hyphens, trackRun]);

  const handleParse = useCallback(() => {
    const result = parseUUID(parseInput.trim());
    setParseResult(result);
    if (result) trackEvent("uuid_parsed", { version: result.version });
  }, [parseInput, trackEvent]);

  const handleCopyAll = () => {
    copy(uuids.join("\n"));
    trackEvent("uuid_copy_all", { count: uuids.length });
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const inputClass =
    "w-full rounded-md border border-line bg-base px-3 py-2 text-sm text-ink font-mono placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-ink/20";
  const selectClass =
    "w-full rounded-md border border-line bg-base px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ink/20";

  return (
    <ToolLayout
      title="UUID Generator"
      description="Generate universally unique identifiers (v4, v7) with customizable formatting."
      actions={<ToolButton onClick={generate}>Generate</ToolButton>}
    >
      {/* ── Settings ──────────────────────────────────────────── */}
      <ToolSection noBorder title="Settings">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <ToolLabel htmlFor="ug-version">Version</ToolLabel>
            <select
              id="ug-version"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className={selectClass}
            >
              <option value="v4">v4 (random)</option>
              <option value="v7">v7 (timestamp)</option>
            </select>
          </div>
          <div>
            <ToolLabel htmlFor="ug-count">Count</ToolLabel>
            <select
              id="ug-count"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className={selectClass}
            >
              {[1, 5, 10, 25, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div>
            <ToolLabel htmlFor="ug-case">Case</ToolLabel>
            <select
              id="ug-case"
              value={caseStyle}
              onChange={(e) => setCaseStyle(e.target.value)}
              className={selectClass}
            >
              <option value="lower">lowercase</option>
              <option value="upper">UPPERCASE</option>
            </select>
          </div>
          <div>
            <ToolLabel>Hyphens</ToolLabel>
            <label className="flex items-center gap-2 mt-2 text-sm text-ink cursor-pointer">
              <input
                type="checkbox"
                checked={hyphens}
                onChange={(e) => setHyphens(e.target.checked)}
                className="accent-accent"
              />
              Include dashes
            </label>
          </div>
        </div>

        <div className="mt-4">
          <ToolActions align="left">
            <ToolButton onClick={generate}>Generate</ToolButton>
            <ToolButton variant="ghost" onClick={() => { setUuids([]); setParseResult(null); }}>
              Clear
            </ToolButton>
          </ToolActions>
        </div>
      </ToolSection>

      {/* ── Quick actions ─────────────────────────────────────── */}
      <ToolSection title="Quick Generate">
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Nil UUID", fn: () => setUuids([NIL_UUID]) },
            { label: "Max UUID", fn: () => setUuids([MAX_UUID]) },
            { label: "1× v4", fn: () => setUuids([generateUUIDv4()]) },
            { label: "1× v7", fn: () => setUuids([generateUUIDv7()]) },
            { label: "5× v4", fn: () => setUuids(Array.from({ length: 5 }, generateUUIDv4)) },
            { label: "10× v4", fn: () => setUuids(Array.from({ length: 10 }, generateUUIDv4)) },
          ].map(({ label, fn }) => (
            <button
              key={label}
              type="button"
              onClick={fn}
              className="rounded-md border border-line bg-surface px-2.5 py-1 text-xs text-dim hover:bg-muted hover:text-ink transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      </ToolSection>

      {/* ── Output ────────────────────────────────────────────── */}
      {uuids.length > 0 && (
        <ToolSection title={`Generated (${uuids.length})`}>
          <div className="rounded-md border border-line bg-base overflow-hidden max-h-72 overflow-y-auto">
            {uuids.map((uuid, i) => (
              <div
                key={`${uuid}-${i}`}
                className={`flex items-center justify-between px-3 py-2 ${
                  i > 0 ? "border-t border-line" : ""
                } hover:bg-muted/50`}
              >
                <code className="text-sm font-mono text-ink select-all truncate">
                  {uuid}
                </code>
                <ToolCopyButton value={uuid} toolSlug={TOOL_SLUG} />
              </div>
            ))}
          </div>

          {uuids.length > 1 && (
            <div className="mt-3">
              <ToolActions>
                <ToolButton variant="secondary" onClick={handleCopyAll}>
                  {copied ? "Copied!" : "Copy All"}
                </ToolButton>
              </ToolActions>
            </div>
          )}
        </ToolSection>
      )}

      {/* ── UUID Parser ───────────────────────────────────────── */}
      <ToolSection title="UUID Parser">
        <ToolLabel htmlFor="ug-parse" hint="Paste any UUID to analyze">
          UUID to Parse
        </ToolLabel>
        <div className="flex gap-2">
          <input
            id="ug-parse"
            type="text"
            value={parseInput}
            onChange={(e) => setParseInput(e.target.value)}
            placeholder="e.g. 550e8400-e29b-41d4-a716-446655440000"
            className={inputClass}
          />
          <ToolButton variant="secondary" onClick={handleParse}>
            Parse
          </ToolButton>
        </div>

        {parseResult && (
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-lg border border-line bg-base p-3 text-center">
              <p className="text-[11px] uppercase tracking-wider text-faint">
                Version
              </p>
              <p className="mt-0.5 text-lg font-semibold text-ink">
                {parseResult.version}
              </p>
            </div>
            <div className="rounded-lg border border-line bg-base p-3 text-center">
              <p className="text-[11px] uppercase tracking-wider text-faint">
                Variant
              </p>
              <p className="mt-0.5 text-xs font-medium text-ink">
                {parseResult.variant}
              </p>
            </div>
            {parseResult.timestamp && (
              <div className="rounded-lg border border-line bg-base p-3 text-center">
                <p className="text-[11px] uppercase tracking-wider text-faint">
                  Timestamp
                </p>
                <p className="mt-0.5 text-xs font-medium text-ink">
                  {parseResult.timestamp}
                </p>
              </div>
            )}
          </div>
        )}
        {parseResult === null && parseInput.trim() && (
          <p className="mt-2 text-xs text-red-500">
            Invalid UUID format — must be 32 hex characters (with or without dashes).
          </p>
        )}
      </ToolSection>

      {/* ── History ───────────────────────────────────────────── */}
      {history.length > 0 && (
        <ToolSection title={`History (${history.length})`}>
          <div className="rounded-md border border-line bg-base overflow-hidden max-h-48 overflow-y-auto">
            {history.slice(0, 20).map((uuid, i) => (
              <div
                key={`hist-${i}`}
                className={`flex items-center justify-between px-3 py-1.5 ${
                  i > 0 ? "border-t border-line" : ""
                }`}
              >
                <code className="text-xs font-mono text-dim truncate">
                  {uuid}
                </code>
                <ToolCopyButton value={uuid} toolSlug={TOOL_SLUG} />
              </div>
            ))}
          </div>
          <div className="mt-2">
            <ToolActions>
              <ToolButton variant="ghost" size="sm" onClick={handleClearHistory}>
                Clear History
              </ToolButton>
            </ToolActions>
          </div>
        </ToolSection>
      )}

      {/* ── About ─────────────────────────────────────────────── */}
      <ToolSection title="About UUID Generator">
        <div className="prose prose-sm text-dim max-w-none">
          <p>
            Generate RFC 9562–compliant UUIDs in your browser using the Web
            Crypto API. No data leaves your device.
          </p>
          <ul className="mt-2 space-y-1 text-xs text-faint list-disc list-inside">
            <li>
              <strong>v4</strong> — 122 random bits, universally unique, most
              commonly used
            </li>
            <li>
              <strong>v7</strong> — 48-bit Unix timestamp + random bits,
              sortable by creation time
            </li>
            <li>Batch generate up to 50 UUIDs at once</li>
            <li>Customise case (lower/upper) and hyphenation</li>
            <li>Parse any UUID to inspect version, variant, and embedded timestamp</li>
            <li>Session history of last 50 generated UUIDs</li>
          </ul>
        </div>
      </ToolSection>
    </ToolLayout>
  );
}
