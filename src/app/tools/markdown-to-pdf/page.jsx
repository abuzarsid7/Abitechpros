"use client";

import { useState, useCallback } from "react";
import ToolLayout from "@/components/tools/ToolLayout";
import ToolSection from "@/components/tools/ToolSection";
import ToolLabel from "@/components/tools/ToolLabel";
import ToolActions, { ToolButton } from "@/components/tools/ToolActions";
import ToolCopyButton from "@/components/tools/ToolCopyButton";

// ─── Lightweight Markdown → HTML parser ────────────────────────────────────
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function parseInline(text) {
  return (
    text
      // Bold + italic
      .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
      .replace(/___(.+?)___/g, "<strong><em>$1</em></strong>")
      // Bold
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/__(.+?)__/g, "<strong>$1</strong>")
      // Italic
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/_(.+?)_/g, "<em>$1</em>")
      // Strikethrough
      .replace(/~~(.+?)~~/g, "<del>$1</del>")
      // Inline code
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      // Images
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
  );
}

function markdownToHtml(md) {
  if (!md.trim()) return "";

  const lines = md.split("\n");
  const html = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (/^```/.test(line)) {
      const lang = line.slice(3).trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) {
        codeLines.push(escapeHtml(lines[i]));
        i++;
      }
      html.push(
        `<pre><code${lang ? ` class="language-${lang}"` : ""}>${codeLines.join("\n")}</code></pre>`
      );
      i++;
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
      html.push("<hr />");
      i++;
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      html.push(`<h${level}>${parseInline(headingMatch[2])}</h${level}>`);
      i++;
      continue;
    }

    // Blockquote
    if (/^>\s?/.test(line)) {
      const quoteLines = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quoteLines.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      html.push(`<blockquote>${markdownToHtml(quoteLines.join("\n"))}</blockquote>`);
      continue;
    }

    // Unordered list
    if (/^[-*+]\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*+]\s/.test(lines[i])) {
        items.push(`<li>${parseInline(lines[i].replace(/^[-*+]\s/, ""))}</li>`);
        i++;
      }
      html.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(`<li>${parseInline(lines[i].replace(/^\d+\.\s/, ""))}</li>`);
        i++;
      }
      html.push(`<ol>${items.join("")}</ol>`);
      continue;
    }

    // Blank line → paragraph break
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph: accumulate contiguous non-empty lines
    const paraLines = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^(#{1,6}\s|```|>\s?|[-*+]\s|\d+\.\s|-{3,}|\*{3,}|_{3,})/.test(lines[i])
    ) {
      paraLines.push(parseInline(lines[i]));
      i++;
    }
    if (paraLines.length) {
      html.push(`<p>${paraLines.join("<br />")}</p>`);
    }
  }

  return html.join("\n");
}

// ─── PDF export via print window ───────────────────────────────────────────
function exportToPdf(html, title = "document") {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Please allow pop-ups to export as PDF.");
    return;
  }

  printWindow.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(title)}</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: Georgia, "Times New Roman", serif;
      font-size: 11pt;
      line-height: 1.7;
      color: #111;
      padding: 40px 48px;
      max-width: 720px;
      margin: 0 auto;
    }
    h1, h2, h3, h4, h5, h6 {
      font-family: system-ui, -apple-system, sans-serif;
      font-weight: 700;
      margin-top: 1.4em;
      margin-bottom: 0.4em;
      line-height: 1.25;
    }
    h1 { font-size: 2em; border-bottom: 2px solid #e5e5e7; padding-bottom: 0.25em; }
    h2 { font-size: 1.5em; border-bottom: 1px solid #e5e5e7; padding-bottom: 0.2em; }
    h3 { font-size: 1.2em; }
    h4 { font-size: 1em; }
    p { margin: 0.75em 0; }
    a { color: #0070f3; text-decoration: underline; }
    strong { font-weight: 700; }
    em { font-style: italic; }
    del { text-decoration: line-through; color: #888; }
    code {
      font-family: "Fira Code", "Courier New", monospace;
      font-size: 0.88em;
      background: #f5f5f6;
      border: 1px solid #e5e5e7;
      border-radius: 3px;
      padding: 0.1em 0.35em;
    }
    pre {
      background: #f5f5f6;
      border: 1px solid #e5e5e7;
      border-radius: 6px;
      padding: 1em 1.2em;
      overflow-x: auto;
      margin: 1em 0;
    }
    pre code {
      background: none;
      border: none;
      padding: 0;
      font-size: 0.85em;
    }
    blockquote {
      border-left: 3px solid #d1d1d6;
      padding-left: 1em;
      margin: 1em 0;
      color: #56565c;
    }
    ul, ol { padding-left: 1.6em; margin: 0.75em 0; }
    li { margin: 0.25em 0; }
    hr { border: none; border-top: 1px solid #e5e5e7; margin: 1.5em 0; }
    img { max-width: 100%; height: auto; border-radius: 4px; }
    table { width: 100%; border-collapse: collapse; margin: 1em 0; font-size: 0.9em; }
    th, td { border: 1px solid #e5e5e7; padding: 0.5em 0.75em; text-align: left; }
    th { background: #f5f5f6; font-weight: 600; }
    @media print {
      body { padding: 0; }
      a { color: inherit; text-decoration: none; }
    }
  </style>
</head>
<body>
${html}
</body>
</html>`);

  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 300);
}

// ─── Default starter content ────────────────────────────────────────────────
const DEFAULT_MARKDOWN = `# My Document

Welcome to the **Markdown to PDF** converter. Write or paste your content here and click *Export as PDF*.

## Features

- Live **preview** as you type
- Supports headers, lists, code blocks, blockquotes, links, and more
- Clean, print-ready PDF output

## Code Example

\`\`\`js
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

## Blockquote

> "The best tool is the one you actually use." — Someone

---

Happy writing!
`;

// ─── Component ───────────────────────────────────────────────────────────────
export default function MarkdownToPdfPage() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [docTitle, setDocTitle] = useState("My Document");
  const [view, setView] = useState("split"); // "editor" | "preview" | "split"

  const html = markdownToHtml(markdown);

  const handleExport = useCallback(
    () => exportToPdf(html, docTitle),
    [html, docTitle]
  );

  const handleClear = () => {
    if (window.confirm("Clear the editor?")) setMarkdown("");
  };

  const wordCount = markdown.trim()
    ? markdown.trim().split(/\s+/).length
    : 0;
  const charCount = markdown.length;

  return (
    <ToolLayout
      title="Markdown to PDF"
      description="Write or paste Markdown, preview it live, then export a polished PDF."
      size="xl"
      actions={
        <ToolButton
          variant="primary"
          onClick={handleExport}
          disabled={!markdown.trim()}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          }
        >
          Export as PDF
        </ToolButton>
      }
    >
      {/* Settings bar */}
      <ToolSection noBorder>
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[180px]">
            <ToolLabel htmlFor="doc-title">Document title</ToolLabel>
            <input
              id="doc-title"
              type="text"
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
              placeholder="Untitled"
              className="w-full rounded-md border border-line bg-base px-3 py-1.5 text-sm text-ink placeholder:text-faint outline-none focus:border-ink focus:ring-1 focus:ring-ink transition"
            />
          </div>

          {/* View toggle */}
          <div className="flex rounded-md border border-line overflow-hidden text-xs font-medium">
            {(["editor", "split", "preview"] ).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                className={`px-3 py-1.5 capitalize transition-colors ${
                  view === v
                    ? "bg-accent text-accent-fg"
                    : "bg-surface text-dim hover:bg-muted hover:text-ink"
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          {/* Stats */}
          <p className="text-xs text-faint whitespace-nowrap">
            {wordCount} words · {charCount} chars
          </p>
        </div>
      </ToolSection>

      {/* Editor / Preview panels */}
      <ToolSection noBorder className="pt-0">
        <div
          className={`grid gap-4 ${
            view === "split"
              ? "grid-cols-1 lg:grid-cols-2"
              : "grid-cols-1"
          }`}
        >
          {/* Editor */}
          {(view === "editor" || view === "split") && (
            <div className="flex flex-col gap-1.5">
              <ToolLabel
                htmlFor="md-editor"
                hint={
                  <ToolCopyButton value={markdown} label="Copy markdown" />
                }
              >
                Markdown
              </ToolLabel>
              <textarea
                id="md-editor"
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                spellCheck={false}
                placeholder="Start typing Markdown here…"
                className="h-[520px] w-full resize-none rounded-md border border-line bg-base p-3 font-mono text-xs leading-relaxed text-ink placeholder:text-faint outline-none focus:border-ink focus:ring-1 focus:ring-ink transition"
              />
            </div>
          )}

          {/* Preview */}
          {(view === "preview" || view === "split") && (
            <div className="flex flex-col gap-1.5">
              <ToolLabel htmlFor="md-preview">Preview</ToolLabel>
              <div
                id="md-preview"
                className="h-[520px] overflow-y-auto rounded-md border border-line bg-white dark:bg-[#1a1a1b] p-4 md-preview"
                dangerouslySetInnerHTML={{ __html: html || "<p class='text-faint text-xs'>Nothing to preview yet.</p>" }}
              />
            </div>
          )}
        </div>
      </ToolSection>

      {/* Bottom actions */}
      <ToolSection>
        <ToolActions align="between">
          <ToolButton variant="ghost" size="sm" onClick={handleClear} disabled={!markdown}>
            Clear
          </ToolButton>
          <div className="flex items-center gap-2">
            <ToolCopyButton value={html} label="Copy HTML" />
            <ToolButton
              variant="primary"
              size="sm"
              onClick={handleExport}
              disabled={!markdown.trim()}
            >
              Export as PDF
            </ToolButton>
          </div>
        </ToolActions>
      </ToolSection>
    </ToolLayout>
  );
}
