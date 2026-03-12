"use client";

import { useState, useEffect, useCallback } from "react";
import ToolLayout from "@/components/tools/ToolLayout";
import ToolSection from "@/components/tools/ToolSection";
import ToolLabel from "@/components/tools/ToolLabel";
import ToolActions, { ToolButton } from "@/components/tools/ToolActions";
import ToolCopyButton from "@/components/tools/ToolCopyButton";
import { useToolAnalytics } from "@/hooks";

const TOOL_SLUG = "timestamp-converter";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function pad(n, len = 2) {
  return String(n).padStart(len, "0");
}

function formatDate(d) {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return `${days[d.getDay()]}, ${pad(d.getDate())} ${months[d.getMonth()]} ${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function formatISO(d) {
  return d.toISOString();
}

function formatRFC2822(d) {
  return d.toUTCString();
}

function formatRelative(d) {
  const now = Date.now();
  const diff = now - d.getTime();
  const abs = Math.abs(diff);
  const suffix = diff < 0 ? "from now" : "ago";

  if (abs < 1000) return "just now";
  if (abs < 60_000) return `${Math.floor(abs / 1000)}s ${suffix}`;
  if (abs < 3_600_000) return `${Math.floor(abs / 60_000)}m ${suffix}`;
  if (abs < 86_400_000) return `${Math.floor(abs / 3_600_000)}h ${suffix}`;
  if (abs < 2_592_000_000) return `${Math.floor(abs / 86_400_000)}d ${suffix}`;
  if (abs < 31_536_000_000) return `${Math.floor(abs / 2_592_000_000)}mo ${suffix}`;
  return `${Math.floor(abs / 31_536_000_000)}y ${suffix}`;
}

function getTimezoneInfo(d) {
  const offset = d.getTimezoneOffset();
  const sign = offset <= 0 ? "+" : "-";
  const absOff = Math.abs(offset);
  const h = Math.floor(absOff / 60);
  const m = absOff % 60;
  return `UTC${sign}${pad(h)}:${pad(m)}`;
}

function dateToInputs(d) {
  return {
    date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
    time: `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`,
  };
}

const PRESETS = [
  { label: "Now", fn: () => new Date() },
  { label: "Start of today", fn: () => { const d = new Date(); d.setHours(0,0,0,0); return d; } },
  { label: "Start of year", fn: () => new Date(new Date().getFullYear(), 0, 1) },
  { label: "Unix epoch", fn: () => new Date(0) },
  { label: "Y2K", fn: () => new Date(2000, 0, 1) },
  { label: "1 day ago", fn: () => new Date(Date.now() - 86400000) },
  { label: "1 week ago", fn: () => new Date(Date.now() - 604800000) },
  { label: "1 year from now", fn: () => new Date(Date.now() + 31536000000) },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function TimestampConverterPage() {
  const [date, setDate] = useState(new Date());
  const [unixInput, setUnixInput] = useState("");
  const [isoInput, setIsoInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [liveNow, setLiveNow] = useState(true);
  const [mode, setMode] = useState("unix"); // unix | iso | picker

  const { trackRun, trackEvent } = useToolAnalytics(TOOL_SLUG);

  // Live clock
  useEffect(() => {
    if (!liveNow) return;
    const id = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(id);
  }, [liveNow]);

  // Sync inputs when date changes
  useEffect(() => {
    setUnixInput(String(Math.floor(date.getTime() / 1000)));
    setIsoInput(date.toISOString());
    const { date: d, time: t } = dateToInputs(date);
    setDateInput(d);
    setTimeInput(t);
  }, [date]);

  const handleUnixConvert = useCallback(() => {
    const n = Number(unixInput);
    if (isNaN(n)) return;
    // Auto-detect seconds vs milliseconds
    const ms = String(n).length > 12 ? n : n * 1000;
    const d = new Date(ms);
    if (isNaN(d.getTime())) return;
    setDate(d);
    setLiveNow(false);
    trackRun({ format: "unix" });
  }, [unixInput, trackRun]);

  const handleIsoConvert = useCallback(() => {
    const d = new Date(isoInput);
    if (isNaN(d.getTime())) return;
    setDate(d);
    setLiveNow(false);
    trackRun({ format: "iso" });
  }, [isoInput, trackRun]);

  const handlePickerConvert = useCallback(() => {
    const d = new Date(`${dateInput}T${timeInput}`);
    if (isNaN(d.getTime())) return;
    setDate(d);
    setLiveNow(false);
    trackRun({ format: "picker" });
  }, [dateInput, timeInput, trackRun]);

  const handlePreset = (preset) => {
    setDate(preset.fn());
    setLiveNow(preset.label === "Now");
    trackEvent("timestamp_preset", { preset: preset.label });
  };

  const handleNow = () => {
    setDate(new Date());
    setLiveNow(true);
  };

  // Derived values
  const unixSec = Math.floor(date.getTime() / 1000);
  const unixMs = date.getTime();
  const iso = formatISO(date);
  const rfc = formatRFC2822(date);
  const human = formatDate(date);
  const relative = formatRelative(date);
  const tz = getTimezoneInfo(date);

  const inputClass =
    "w-full rounded-md border border-line bg-base px-3 py-2 text-sm text-ink font-mono placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-ink/20";
  const tabClass = (active) =>
    `px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
      active
        ? "bg-accent text-accent-fg"
        : "text-dim hover:text-ink hover:bg-muted"
    }`;

  return (
    <ToolLayout
      title="Timestamp Converter"
      description="Convert between Unix timestamps, ISO 8601, and human-readable dates."
      actions={
        <ToolButton onClick={handleNow}>
          {liveNow ? "● Live" : "Now"}
        </ToolButton>
      }
    >
      {/* ── Live display ──────────────────────────────────────── */}
      <ToolSection noBorder title="Current Time">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: "Unix (seconds)", value: String(unixSec) },
            { label: "Unix (milliseconds)", value: String(unixMs) },
            { label: "ISO 8601", value: iso },
            { label: "RFC 2822", value: rfc },
            { label: "Human Readable", value: human },
            { label: "Relative", value: relative },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-lg border border-line bg-base px-3 py-2"
            >
              <div className="flex-1 min-w-0">
                <p className="text-[11px] uppercase tracking-wider text-faint">
                  {label}
                </p>
                <p className="text-sm font-mono text-ink truncate">{value}</p>
              </div>
              <ToolCopyButton value={value} toolSlug={TOOL_SLUG} />
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-faint">
          Timezone: {tz} · {Intl.DateTimeFormat().resolvedOptions().timeZone}
        </p>
      </ToolSection>

      {/* ── Presets ────────────────────────────────────────────── */}
      <ToolSection title="Quick Presets">
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => handlePreset(p)}
              className="rounded-md border border-line bg-surface px-2.5 py-1 text-xs text-dim hover:bg-muted hover:text-ink transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      </ToolSection>

      {/* ── Convert from ──────────────────────────────────────── */}
      <ToolSection title="Convert From">
        <div className="flex gap-1 mb-4">
          {[
            { key: "unix", label: "Unix Timestamp" },
            { key: "iso", label: "ISO / Date String" },
            { key: "picker", label: "Date Picker" },
          ].map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setMode(key)}
              className={tabClass(mode === key)}
            >
              {label}
            </button>
          ))}
        </div>

        {mode === "unix" && (
          <div>
            <ToolLabel htmlFor="ts-unix" hint="seconds or milliseconds">
              Unix Timestamp
            </ToolLabel>
            <div className="flex gap-2">
              <input
                id="ts-unix"
                type="text"
                value={unixInput}
                onChange={(e) => {
                  setUnixInput(e.target.value);
                  setLiveNow(false);
                }}
                placeholder="1700000000"
                className={inputClass}
              />
              <ToolButton onClick={handleUnixConvert}>Convert</ToolButton>
            </div>
          </div>
        )}

        {mode === "iso" && (
          <div>
            <ToolLabel htmlFor="ts-iso" hint="ISO 8601 or any parseable date">
              Date String
            </ToolLabel>
            <div className="flex gap-2">
              <input
                id="ts-iso"
                type="text"
                value={isoInput}
                onChange={(e) => {
                  setIsoInput(e.target.value);
                  setLiveNow(false);
                }}
                placeholder="2024-01-15T12:00:00Z"
                className={inputClass}
              />
              <ToolButton onClick={handleIsoConvert}>Convert</ToolButton>
            </div>
          </div>
        )}

        {mode === "picker" && (
          <div className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[160px]">
              <ToolLabel htmlFor="ts-date">Date</ToolLabel>
              <input
                id="ts-date"
                type="date"
                value={dateInput}
                onChange={(e) => {
                  setDateInput(e.target.value);
                  setLiveNow(false);
                }}
                className={inputClass}
              />
            </div>
            <div className="flex-1 min-w-[140px]">
              <ToolLabel htmlFor="ts-time">Time</ToolLabel>
              <input
                id="ts-time"
                type="time"
                step="1"
                value={timeInput}
                onChange={(e) => {
                  setTimeInput(e.target.value);
                  setLiveNow(false);
                }}
                className={inputClass}
              />
            </div>
            <ToolButton onClick={handlePickerConvert}>Convert</ToolButton>
          </div>
        )}
      </ToolSection>

      {/* ── Day breakdown ─────────────────────────────────────── */}
      <ToolSection title="Date Breakdown">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Year", value: date.getFullYear() },
            { label: "Month", value: date.getMonth() + 1 },
            { label: "Day", value: date.getDate() },
            { label: "Day of Week", value: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()] },
            { label: "Hour", value: pad(date.getHours()) },
            { label: "Minute", value: pad(date.getMinutes()) },
            { label: "Second", value: pad(date.getSeconds()) },
            { label: "Day of Year", value: Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000) },
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
      </ToolSection>

      {/* ── About ─────────────────────────────────────────────── */}
      <ToolSection title="About Timestamp Converter">
        <div className="prose prose-sm text-dim max-w-none">
          <p>
            Convert between Unix timestamps (seconds &amp; milliseconds),
            ISO 8601 date strings, and human-readable formats. Everything
            runs in your browser — no data leaves your device.
          </p>
          <ul className="mt-2 space-y-1 text-xs text-faint list-disc list-inside">
            <li>Auto-detects seconds vs milliseconds input</li>
            <li>Live ticking clock with one-click &quot;Now&quot;</li>
            <li>Parses any JavaScript-compatible date string</li>
            <li>Date picker for manual selection</li>
            <li>Relative time display (e.g. &quot;3h ago&quot;)</li>
            <li>Full date breakdown with day-of-year</li>
          </ul>
        </div>
      </ToolSection>
    </ToolLayout>
  );
}
