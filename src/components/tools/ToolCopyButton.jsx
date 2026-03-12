"use client";

import { useClipboard, useToolAnalytics } from "@/hooks";

/**
 * ToolCopyButton — copies `value` to clipboard with visual feedback.
 *
 * Props:
 *   value    string  — text to copy
 *   size     "sm" | "md"  (default: "sm")
 *   label    string  — button label (default: "Copy")
 *   toolSlug string  — optional override; auto-detected from URL if omitted
 */
export default function ToolCopyButton({ value = "", size = "sm", label = "Copy", toolSlug = null }) {
  const { trackCopied } = useToolAnalytics(toolSlug);
  const { copy, copied } = useClipboard({
    onCopy: () => trackCopied({ copy_label: label }),
  });

  const handleCopy = () => copy(value);

  const sizeClass = size === "md" ? "px-3.5 py-1.5 text-sm" : "px-2.5 py-1 text-xs";

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={!value}
      className={`inline-flex items-center gap-1.5 rounded-md border border-line bg-surface font-medium text-dim transition-colors hover:bg-muted hover:text-ink disabled:pointer-events-none disabled:opacity-40 ${sizeClass}`}
    >
      {copied ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          {label}
        </>
      )}
    </button>
  );
}
