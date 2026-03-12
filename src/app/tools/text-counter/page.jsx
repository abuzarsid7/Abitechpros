"use client";

import { useState, useMemo } from "react";
import ToolLayout from "@/components/tools/ToolLayout";
import ToolSection from "@/components/tools/ToolSection";
import ToolLabel from "@/components/tools/ToolLabel";
import ToolActions, { ToolButton } from "@/components/tools/ToolActions";
import ToolCopyButton from "@/components/tools/ToolCopyButton";
import { useTextStats, useToolAnalytics } from "@/hooks";

const TOOL_SLUG = "text-counter";

// ─── Reading time estimate ──────────────────────────────────────────────────
function readingTime(words) {
  if (words === 0) return "0 sec";
  const mins = Math.ceil(words / 200);
  return mins < 1 ? "< 1 min" : `~${mins} min`;
}

function speakingTime(words) {
  if (words === 0) return "0 sec";
  const mins = Math.ceil(words / 130);
  return mins < 1 ? "< 1 min" : `~${mins} min`;
}

// ─── Top frequency helpers ──────────────────────────────────────────────────
function topWords(text, limit = 10) {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s'-]/g, "")
    .split(/\s+/)
    .filter(Boolean);
  const freq = {};
  for (const w of words) freq[w] = (freq[w] || 0) + 1;
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function TextCounterPage() {
  const [text, setText] = useState("");
  const { trackRun, trackEvent } = useToolAnalytics(TOOL_SLUG);
  const stats = useTextStats(text);

  // Character breakdown
  const charBreakdown = useMemo(() => {
    if (!text) return { letters: 0, spaces: 0, digits: 0, punctuation: 0 };
    const letters = (text.match(/[a-zA-Z]/g) || []).length;
    const spaces = (text.match(/\s/g) || []).length;
    const digits = (text.match(/\d/g) || []).length;
    const punctuation = text.length - letters - spaces - digits;
    return { letters, spaces, digits, punctuation };
  }, [text]);

  // Top words
  const topWordsList = useMemo(() => topWords(text), [text]);

  // Characters without spaces
  const charsNoSpaces = useMemo(
    () => text.replace(/\s/g, "").length,
    [text]
  );

  const handleClear = () => {
    if (text && window.confirm("Clear the text?")) {
      trackEvent("tool_clear");
      setText("");
    }
  };

  const handlePaste = async () => {
    try {
      const clip = await navigator.clipboard.readText();
      setText(clip);
      trackRun({ input_length: clip.length, action: "paste" });
    } catch {
      // Clipboard permission denied
    }
  };

  const handleSample = () => {
    const sample = `The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet at least once.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

Programming is the art of telling a computer what to do. Good code is its own best documentation. When you're about to add a comment, ask yourself, "How can I improve the code so that this comment isn't needed?"

The best error message is the one that never shows up. Clean code always looks like it was written by someone who cares.`;
    setText(sample);
    trackRun({ input_length: sample.length, action: "sample" });
  };

  return (
    <ToolLayout
      title="Text Counter"
      description="Count characters, words, sentences, and paragraphs in any block of text."
      size="lg"
    >
      {/* Primary stats */}
      <ToolSection noBorder>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {[
            { label: "Characters", value: stats.characters },
            { label: "Words", value: stats.words },
            { label: "Sentences", value: stats.sentences },
            { label: "Paragraphs", value: stats.paragraphs },
            { label: "Lines", value: stats.lines },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-lg border border-line bg-base p-3 text-center"
            >
              <span className="text-2xl font-bold text-ink tabular-nums">
                {value.toLocaleString()}
              </span>
              <span className="mt-0.5 text-[11px] font-medium text-faint uppercase tracking-wide">
                {label}
              </span>
            </div>
          ))}
        </div>
      </ToolSection>

      {/* Text input */}
      <ToolSection>
        <div className="flex items-center justify-between gap-2 mb-2">
          <ToolLabel htmlFor="tc-input" hint={`${charsNoSpaces} chars (no spaces)`}>
            Your text
          </ToolLabel>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleSample}
              className="rounded-md border border-line bg-surface px-2 py-0.5 text-[11px] font-medium text-dim transition hover:border-ink hover:text-ink"
            >
              Sample text
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
          id="tc-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here…"
          rows={10}
          className="w-full resize-y rounded-md border border-line bg-base p-3 text-sm leading-relaxed text-ink placeholder:text-faint outline-none focus:border-ink focus:ring-1 focus:ring-ink transition"
        />
      </ToolSection>

      {/* Detailed breakdown */}
      {text.trim() && (
        <>
          {/* Time estimates + char breakdown */}
          <ToolSection title="Details">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <p className="text-[11px] font-medium text-faint uppercase tracking-wide">
                  Reading time
                </p>
                <p className="mt-0.5 text-sm font-semibold text-ink">
                  {readingTime(stats.words)}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-faint uppercase tracking-wide">
                  Speaking time
                </p>
                <p className="mt-0.5 text-sm font-semibold text-ink">
                  {speakingTime(stats.words)}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-faint uppercase tracking-wide">
                  Avg word length
                </p>
                <p className="mt-0.5 text-sm font-semibold text-ink">
                  {stats.words
                    ? (charsNoSpaces / stats.words).toFixed(1)
                    : "0"}{" "}
                  chars
                </p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-faint uppercase tracking-wide">
                  Avg sentence length
                </p>
                <p className="mt-0.5 text-sm font-semibold text-ink">
                  {stats.sentences
                    ? Math.round(stats.words / stats.sentences)
                    : "0"}{" "}
                  words
                </p>
              </div>
            </div>

            {/* Character breakdown bar */}
            <div className="mt-5">
              <p className="mb-2 text-[11px] font-medium text-faint uppercase tracking-wide">
                Character breakdown
              </p>
              <div className="flex h-3 w-full overflow-hidden rounded-full">
                {[
                  { key: "letters", color: "bg-blue-500", value: charBreakdown.letters },
                  { key: "digits", color: "bg-amber-500", value: charBreakdown.digits },
                  { key: "spaces", color: "bg-gray-300 dark:bg-gray-600", value: charBreakdown.spaces },
                  { key: "punctuation", color: "bg-purple-500", value: charBreakdown.punctuation },
                ].map(({ key, color, value }) => {
                  const pct = stats.characters ? (value / stats.characters) * 100 : 0;
                  if (pct === 0) return null;
                  return (
                    <div
                      key={key}
                      className={`${color} transition-all duration-300`}
                      style={{ width: `${pct}%` }}
                      title={`${key}: ${value} (${pct.toFixed(1)}%)`}
                    />
                  );
                })}
              </div>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-dim">
                <span className="flex items-center gap-1">
                  <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />
                  Letters: {charBreakdown.letters}
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
                  Digits: {charBreakdown.digits}
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block h-2 w-2 rounded-full bg-gray-400" />
                  Spaces: {charBreakdown.spaces}
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block h-2 w-2 rounded-full bg-purple-500" />
                  Punctuation: {charBreakdown.punctuation}
                </span>
              </div>
            </div>
          </ToolSection>

          {/* Top words */}
          {topWordsList.length > 0 && (
            <ToolSection title="Top words">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                {topWordsList.map(([word, count], i) => (
                  <div
                    key={word}
                    className="flex items-center justify-between rounded-md border border-line bg-base px-3 py-2"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-faint">{i + 1}</span>
                      <span className="truncate text-xs font-medium text-ink">{word}</span>
                    </span>
                    <span className="text-xs tabular-nums text-dim">{count}</span>
                  </div>
                ))}
              </div>
            </ToolSection>
          )}
        </>
      )}

      {/* Bottom actions */}
      <ToolSection>
        <ToolActions align="between">
          <ToolButton variant="ghost" size="sm" onClick={handleClear} disabled={!text}>
            Clear
          </ToolButton>
          <ToolCopyButton value={text} label="Copy text" toolSlug={TOOL_SLUG} />
        </ToolActions>
      </ToolSection>
    </ToolLayout>
  );
}
