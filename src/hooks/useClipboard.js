"use client";

import { useState, useCallback, useRef } from "react";

/**
 * useClipboard — copy text to clipboard with visual feedback.
 *
 * @param {object}  options
 * @param {number}  options.resetDelay — ms before `copied` resets (default: 2000)
 * @param {function} options.onCopy    — optional callback after successful copy
 *
 * @returns {{ copy, copied, error }}
 *   copy(text)  — copies `text` to clipboard
 *   copied      — true for `resetDelay` ms after a successful copy
 *   error       — latest Error if copy failed, otherwise null
 */
export default function useClipboard({ resetDelay = 2000, onCopy } = {}) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const timerRef = useRef(null);

  const copy = useCallback(
    async (text) => {
      if (!text) return;
      setError(null);

      try {
        await navigator.clipboard.writeText(text);
      } catch {
        // Fallback for older browsers
        try {
          const el = document.createElement("textarea");
          el.value = text;
          el.style.position = "fixed";
          el.style.opacity = "0";
          document.body.appendChild(el);
          el.select();
          document.execCommand("copy");
          document.body.removeChild(el);
        } catch (e) {
          setError(e);
          return;
        }
      }

      setCopied(true);
      onCopy?.(text);

      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), resetDelay);
    },
    [resetDelay, onCopy]
  );

  return { copy, copied, error };
}
