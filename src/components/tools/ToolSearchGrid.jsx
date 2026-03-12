"use client";

import ToolCard from "@/components/tools/ToolCard";
import { useToolSearch } from "@/hooks";

/**
 * ToolSearchGrid — client component that adds a live search bar
 * above the category-grouped tool cards. Fires a `tool_search`
 * GA event after the user stops typing (debounced 500 ms).
 *
 * Props:
 *   tools      — full tool list from the registry
 *   categories — ordered unique category list
 */
export default function ToolSearchGrid({ tools, categories }) {
  const { query, setQuery, filteredTools, visibleCategories } = useToolSearch({
    tools,
    categories,
  });

  return (
    <>
      {/* Search bar */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-faint pointer-events-none"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools…"
            className="w-full rounded-lg border border-line bg-surface py-2 pl-10 pr-4 text-sm text-ink placeholder:text-faint outline-none focus:border-ink focus:ring-1 focus:ring-ink transition"
          />
        </div>
      </div>

      {/* Results */}
      {visibleCategories.length === 0 && (
        <p className="text-sm text-faint">
          No tools found for &ldquo;{query}&rdquo;.
        </p>
      )}

      {visibleCategories.map((cat) => {
        const catTools = filteredTools.filter((t) => t.category === cat);
        return (
          <div key={cat} className="mb-10">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-faint">
              {cat}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {catTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  title={tool.title}
                  description={tool.description}
                  href={tool.href}
                  icon={tool.icon}
                  badge={tool.badge}
                />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}
