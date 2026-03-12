"use client";

import { useState, useCallback, useRef } from "react";
import ToolLayout from "@/components/tools/ToolLayout";
import ToolSection from "@/components/tools/ToolSection";
import ToolLabel from "@/components/tools/ToolLabel";
import ToolActions, { ToolButton } from "@/components/tools/ToolActions";
import ToolCopyButton from "@/components/tools/ToolCopyButton";
import { useToolAnalytics } from "@/hooks";

const TOOL_SLUG = "json-formatter";

const SAMPLES = {
  simple: `{"name":"John Doe","age":30,"email":"john@example.com","active":true}`,
  nested: `{"users":[{"id":1,"name":"Alice","roles":["admin","editor"]},{"id":2,"name":"Bob","roles":["viewer"]}],"meta":{"total":2,"page":1}}`,
  config: `{"compilerOptions":{"target":"es2020","module":"esnext","strict":true,"jsx":"react-jsx","outDir":"./dist"},"include":["src/**/*"],"exclude":["node_modules"]}`,
};

// ─── JSON analysis helpers ──────────────────────────────────────────────────
function analyzeJson(parsed) {
  let keys = 0,
    strings = 0,
    numbers = 0,
    booleans = 0,
    nulls = 0,
    arrays = 0,
    objects = 0,
    maxDepth = 0;

  function walk(val, depth) {
    if (depth > maxDepth) maxDepth = depth;
    if (val === null) {
      nulls++;
    } else if (Array.isArray(val)) {
      arrays++;
      val.forEach((v) => walk(v, depth + 1));
    } else if (typeof val === "object") {
      objects++;
      const entries = Object.entries(val);
      keys += entries.length;
      entries.forEach(([, v]) => walk(v, depth + 1));
    } else if (typeof val === "string") {
      strings++;
    } else if (typeof val === "number") {
      numbers++;
    } else if (typeof val === "boolean") {
      booleans++;
    }
  }

  walk(parsed, 0);
  return { keys, strings, numbers, booleans, nulls, arrays, objects, maxDepth };
}

function syntaxHighlight(json) {
  return json.replace(
    /("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
    (match) => {
      let cls = "text-emerald-600 dark:text-emerald-400"; // number
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "text-blue-600 dark:text-blue-400"; // key
        } else {
          cls = "text-amber-600 dark:text-amber-400"; // string
        }
      } else if (/true|false/.test(match)) {
        cls = "text-purple-600 dark:text-purple-400"; // boolean
      } else if (/null/.test(match)) {
        cls = "text-red-500 dark:text-red-400"; // null
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);
  const [sortKeys, setSortKeys] = useState(false);
  const [stats, setStats] = useState(null);
  const [highlighted, setHighlighted] = useState("");
  const outputRef = useRef(null);

  const { trackRun, trackEvent } = useToolAnalytics(TOOL_SLUG);

  const sortObject = useCallback(
    (obj) => {
      if (Array.isArray(obj)) return obj.map(sortObject);
      if (obj !== null && typeof obj === "object") {
        return Object.keys(obj)
          .sort()
          .reduce((acc, key) => {
            acc[key] = sortObject(obj[key]);
            return acc;
          }, {});
      }
      return obj;
    },
    []
  );

  const handleFormat = useCallback(() => {
    setError("");
    setStats(null);
    setHighlighted("");

    if (!input.trim()) {
      setOutput("");
      return;
    }

    try {
      let parsed = JSON.parse(input);
      if (sortKeys) parsed = sortObject(parsed);

      const formatted = JSON.stringify(parsed, null, indent);
      setOutput(formatted);
      setHighlighted(syntaxHighlight(formatted));

      const analysis = analyzeJson(parsed);
      setStats(analysis);

      trackRun({
        indent,
        sort_keys: sortKeys,
        input_length: input.length,
        output_length: formatted.length,
      });
    } catch (e) {
      const msg = e.message || "Invalid JSON";
      setError(msg);
      setOutput("");
      setHighlighted("");
    }
  }, [input, indent, sortKeys, sortObject, trackRun]);

  const handleMinify = useCallback(() => {
    setError("");
    setStats(null);
    setHighlighted("");

    if (!input.trim()) {
      setOutput("");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setHighlighted("");
      trackEvent("json_minified", {
        input_length: input.length,
        output_length: minified.length,
      });
    } catch (e) {
      setError(e.message || "Invalid JSON");
      setOutput("");
    }
  }, [input, trackEvent]);

  const handleValidate = useCallback(() => {
    setError("");
    setStats(null);

    if (!input.trim()) return;

    try {
      const parsed = JSON.parse(input);
      const analysis = analyzeJson(parsed);
      setStats(analysis);
      setError("");
      setOutput("✓ Valid JSON");
      setHighlighted("");
      trackEvent("json_validated");
    } catch (e) {
      setError(e.message || "Invalid JSON");
      setOutput("");
      setHighlighted("");
    }
  }, [input, trackEvent]);

  const handleSample = (key) => {
    setInput(SAMPLES[key]);
    setError("");
    setOutput("");
    setStats(null);
    setHighlighted("");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
    setStats(null);
    setHighlighted("");
  };

  const textareaClass =
    "w-full rounded-md border border-line bg-base px-3 py-3 text-sm text-ink font-mono placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-ink/20 resize-y";
  const inputClass =
    "w-full rounded-md border border-line bg-base px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ink/20";

  return (
    <ToolLayout
      title="JSON Formatter"
      description="Format, validate, minify, and analyze JSON data — entirely in your browser."
      actions={
        <ToolButton variant="ghost" onClick={handleClear}>
          Clear
        </ToolButton>
      }
    >
      {/* ── Input ─────────────────────────────────────────────── */}
      <ToolSection noBorder title="Input">
        <ToolLabel htmlFor="jf-input" hint={`${input.length} chars`}>
          JSON Data
        </ToolLabel>
        <textarea
          id="jf-input"
          rows={10}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"key": "value"}'
          className={textareaClass}
          spellCheck={false}
        />

        {/* Sample buttons */}
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="text-xs text-faint pt-1">Samples:</span>
          {Object.keys(SAMPLES).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => handleSample(key)}
              className="rounded-md border border-line bg-surface px-2.5 py-1 text-xs text-dim hover:bg-muted hover:text-ink transition-colors capitalize"
            >
              {key}
            </button>
          ))}
        </div>
      </ToolSection>

      {/* ── Options ───────────────────────────────────────────── */}
      <ToolSection title="Options">
        <div className="flex flex-wrap items-end gap-4">
          <div className="w-32">
            <ToolLabel htmlFor="jf-indent">Indent</ToolLabel>
            <select
              id="jf-indent"
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value))}
              className={inputClass}
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={8}>8 spaces</option>
              <option value={1}>Tab (1)</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm text-ink cursor-pointer">
            <input
              type="checkbox"
              checked={sortKeys}
              onChange={(e) => setSortKeys(e.target.checked)}
              className="accent-accent"
            />
            Sort keys alphabetically
          </label>
        </div>

        <div className="mt-4">
          <ToolActions align="left">
            <ToolButton onClick={handleFormat}>Format</ToolButton>
            <ToolButton variant="secondary" onClick={handleMinify}>
              Minify
            </ToolButton>
            <ToolButton variant="ghost" onClick={handleValidate}>
              Validate Only
            </ToolButton>
          </ToolActions>
        </div>
      </ToolSection>

      {/* ── Error ─────────────────────────────────────────────── */}
      {error && (
        <ToolSection>
          <div className="rounded-md border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950 px-4 py-3">
            <p className="text-sm font-medium text-red-600 dark:text-red-400">
              Parse Error
            </p>
            <p className="mt-1 text-xs text-red-500 dark:text-red-300 font-mono">
              {error}
            </p>
          </div>
        </ToolSection>
      )}

      {/* ── Output ────────────────────────────────────────────── */}
      {output && (
        <ToolSection title="Output">
          <div className="relative">
            {highlighted ? (
              <pre
                ref={outputRef}
                className="w-full rounded-md border border-line bg-base px-3 py-3 text-sm font-mono overflow-x-auto max-h-96"
                dangerouslySetInnerHTML={{ __html: highlighted }}
              />
            ) : (
              <pre
                ref={outputRef}
                className="w-full rounded-md border border-line bg-base px-3 py-3 text-sm text-ink font-mono overflow-x-auto max-h-96"
              >
                {output}
              </pre>
            )}
            <div className="absolute top-2 right-2">
              <ToolCopyButton value={output} toolSlug={TOOL_SLUG} />
            </div>
          </div>
        </ToolSection>
      )}

      {/* ── Stats ─────────────────────────────────────────────── */}
      {stats && (
        <ToolSection title="Analysis">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Keys", value: stats.keys },
              { label: "Strings", value: stats.strings },
              { label: "Numbers", value: stats.numbers },
              { label: "Booleans", value: stats.booleans },
              { label: "Nulls", value: stats.nulls },
              { label: "Arrays", value: stats.arrays },
              { label: "Objects", value: stats.objects },
              { label: "Max Depth", value: stats.maxDepth },
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
      )}

      {/* ── About ─────────────────────────────────────────────── */}
      <ToolSection title="About JSON Formatter">
        <div className="prose prose-sm text-dim max-w-none">
          <p>
            Format, validate, minify, and analyze JSON data entirely in your
            browser. No data is sent to a server — everything stays private.
          </p>
          <ul className="mt-2 space-y-1 text-xs text-faint list-disc list-inside">
            <li>Pretty-print with configurable indentation (2, 4, or 8 spaces)</li>
            <li>Minify JSON to a single line for production use</li>
            <li>Sort keys alphabetically for consistent formatting</li>
            <li>Validate JSON with detailed error messages</li>
            <li>Syntax highlighting for keys, strings, numbers, booleans, and nulls</li>
            <li>Structural analysis: key count, depth, type breakdown</li>
          </ul>
        </div>
      </ToolSection>
    </ToolLayout>
  );
}
