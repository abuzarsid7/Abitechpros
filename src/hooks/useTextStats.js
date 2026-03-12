"use client";

import { useMemo } from "react";

/**
 * useTextStats — compute common text statistics from a string.
 *
 * Useful for any tool that works with text input (text-counter,
 * markdown-to-pdf, diff viewer, etc.).
 *
 * @param {string} text — the input text
 *
 * @returns {{
 *   characters:  number,
 *   words:       number,
 *   sentences:   number,
 *   paragraphs:  number,
 *   lines:       number,
 * }}
 */
export default function useTextStats(text = "") {
  return useMemo(() => {
    const trimmed = text.trim();

    if (!trimmed) {
      return { characters: 0, words: 0, sentences: 0, paragraphs: 0, lines: 0 };
    }

    const characters = text.length;
    const words = trimmed.split(/\s+/).length;
    const sentences = (trimmed.match(/[.!?]+(?:\s|$)/g) || []).length || (trimmed.length > 0 ? 1 : 0);
    const paragraphs = trimmed.split(/\n\s*\n/).filter(Boolean).length;
    const lines = text.split("\n").length;

    return { characters, words, sentences, paragraphs, lines };
  }, [text]);
}
