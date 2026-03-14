"use client";

import { useState } from "react";

import ToolLayout from "@/components/tools/ToolLayout";
import ToolSection from "@/components/tools/ToolSection";
import ToolLabel from "@/components/tools/ToolLabel";
import ToolActions, { ToolButton } from "@/components/tools/ToolActions";
import ToolCopyButton from "@/components/tools/ToolCopyButton";
import { useToolAnalytics } from "@/hooks";

/**
 * Tool page template (client component).
 *
 * Duplicate this folder:
 *   cp -r src/app/tools/_template src/app/tools/your-tool-slug
 *
 * Then update:
 * - TOOL_SLUG and UI copy in this file
 * - src/app/tools/your-tool-slug/layout.jsx metadata and schema
 * - src/data/tools.js registry entry
 * - src/lib/toolVariations.js entries (if using variation pages)
 */

const TOOL_SLUG = "_template";

export default function MyToolPage() {
  // Replace with your tool specific state.
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const { trackRun, trackEvent } = useToolAnalytics(TOOL_SLUG);

  // Replace with your tool logic.
  const handleRun = () => {
    setError("");

    if (!input.trim()) {
      setOutput("");
      return;
    }

    try {
      const result = `Processed: ${input}`;
      setOutput(result);
      trackRun({
        input_length: input.length,
        output_length: result.length,
      });
    } catch (e) {
      setOutput("");
      setError(e?.message || "Failed to process input");
      trackEvent("tool_error", { reason: "run_failed" });
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
    trackEvent("tool_clear");
  };

  return (
    <ToolLayout
      title="My Tool"
      description="Short description of what your tool does."
      actions={
        <ToolButton variant="ghost" size="sm" onClick={handleClear}>
          Clear
        </ToolButton>
      }
    >
      {/* Input section */}
      <ToolSection noBorder title="Input">
        <ToolLabel htmlFor="tool-input">Your input</ToolLabel>
        <textarea
          id="tool-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter something..."
          rows={6}
          className="w-full resize-y rounded-md border border-line bg-base px-3 py-2 text-sm text-ink placeholder:text-faint outline-none focus:border-ink focus:ring-1 focus:ring-ink transition"
        />
      </ToolSection>

      {/* Output section */}
      <ToolSection title="Output">
        <ToolLabel
          htmlFor="tool-output"
          hint={<ToolCopyButton value={output} toolSlug={TOOL_SLUG} />}
        >
          Result
        </ToolLabel>
        <textarea
          id="tool-output"
          value={output}
          readOnly
          rows={6}
          placeholder="Output will appear here..."
          className="w-full resize-y rounded-md border border-line bg-base px-3 py-2 text-sm text-ink placeholder:text-faint outline-none"
        />
        {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
      </ToolSection>

      {/* Actions */}
      <ToolSection>
        <ToolActions align="between">
          <ToolButton
            variant="ghost"
            size="sm"
            onClick={handleClear}
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
            Run
          </ToolButton>
        </ToolActions>
      </ToolSection>

      {/* Optional educational section used by most existing tools */}
      <ToolSection title="About This Tool">
        <p className="text-sm text-faint leading-relaxed">
          Explain use cases, constraints, and privacy expectations here.
          Most tools in this project process data entirely in the browser and
          never upload user content.
        </p>
      </ToolSection>
    </ToolLayout>
  );
}
