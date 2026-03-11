/**
 * ─────────────────────────────────────────────────────────────────
 *  TOOL PAGE TEMPLATE
 * ─────────────────────────────────────────────────────────────────
 *
 *  HOW TO CREATE A NEW TOOL
 *  ─────────────────────────
 *  1. Duplicate this folder:
 *       cp -r src/app/tools/_template src/app/tools/your-tool-name
 *
 *  2. Rename page.jsx → keep as page.jsx (Next.js App Router convention).
 *
 *  3. Register the tool in src/data/tools.js (so it appears on /tools).
 *
 *  4. Replace every TODO comment below with your implementation.
 *
 *  AVAILABLE PRIMITIVES (import from @/components/tools/*)
 *  ─────────────────────────────────────────────────────────
 *   ToolLayout      — page shell (title, back link, header actions)
 *   ToolSection     — padded section inside the card
 *   ToolLabel       — accessible <label> with optional hint
 *   ToolActions     — flex action bar (align="left|right|between")
 *   ToolButton      — button (variant="primary|secondary|ghost")
 *   ToolCopyButton  — clipboard copy button with feedback
 * ─────────────────────────────────────────────────────────────────
 */

"use client";

// TODO: remove useState if your tool is purely static
import { useState } from "react";

import ToolLayout from "@/components/tools/ToolLayout";
import ToolSection from "@/components/tools/ToolSection";
import ToolLabel from "@/components/tools/ToolLabel";
import ToolActions, { ToolButton } from "@/components/tools/ToolActions";
import ToolCopyButton from "@/components/tools/ToolCopyButton";

export default function MyToolPage() {
  // TODO: replace with your tool's state
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  // TODO: implement your tool's logic
  const handleRun = () => {
    setOutput(`Processed: ${input}`);
  };

  return (
    <ToolLayout
      title="My Tool"                       // TODO: tool name
      description="Short description…"      // TODO: description
      // Optional: add primary CTA next to the heading
      // actions={<ToolButton onClick={handleRun}>Run</ToolButton>}
    >

      {/* ── Input section ────────────────────────────────────── */}
      <ToolSection noBorder title="Input">
        <ToolLabel htmlFor="tool-input">Your input</ToolLabel>
        <textarea
          id="tool-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter something…"
          rows={6}
          className="w-full resize-y rounded-md border border-line bg-base px-3 py-2 text-sm text-ink placeholder:text-faint outline-none focus:border-ink focus:ring-1 focus:ring-ink transition"
        />
      </ToolSection>

      {/* ── Output section ───────────────────────────────────── */}
      <ToolSection title="Output">
        <ToolLabel
          htmlFor="tool-output"
          hint={<ToolCopyButton value={output} />}
        >
          Result
        </ToolLabel>
        <textarea
          id="tool-output"
          value={output}
          readOnly
          rows={6}
          placeholder="Output will appear here…"
          className="w-full resize-y rounded-md border border-line bg-base px-3 py-2 text-sm text-ink placeholder:text-faint outline-none"
        />
      </ToolSection>

      {/* ── Actions ──────────────────────────────────────────── */}
      <ToolSection>
        <ToolActions align="between">
          <ToolButton
            variant="ghost"
            size="sm"
            onClick={() => { setInput(""); setOutput(""); }}
            disabled={!input && !output}
          >
            Clear
          </ToolButton>
          <ToolButton
            variant="primary"
            size="sm"
            onClick={handleRun}
            disabled={!input.trim()}
          >
            Run  {/* TODO: rename to match your action */}
          </ToolButton>
        </ToolActions>
      </ToolSection>

    </ToolLayout>
  );
}
