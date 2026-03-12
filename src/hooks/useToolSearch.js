"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import { trackToolSearch } from "@/lib/analytics";

/**
 * useToolSearch — debounced search across the tool registry with GA tracking.
 *
 * @param {object}  options
 * @param {Array}   options.tools      — full tool list from the registry
 * @param {Array}   options.categories — ordered unique category list
 * @param {number}  options.debounceMs — debounce delay for analytics (default: 500)
 *
 * @returns {{
 *   query:             string,
 *   setQuery:          (value: string) => void,
 *   filteredTools:     Array,
 *   visibleCategories: Array,
 * }}
 */
export default function useToolSearch({ tools, categories, debounceMs = 500 }) {
  const [query, setQueryState] = useState("");
  const debounceRef = useRef(null);

  const setQuery = useCallback(
    (value) => {
      setQueryState(value);

      clearTimeout(debounceRef.current);
      if (value.trim()) {
        debounceRef.current = setTimeout(() => {
          trackToolSearch(value.trim());
        }, debounceMs);
      }
    },
    [debounceMs]
  );

  const filteredTools = useMemo(() => {
    if (!query.trim()) return tools;
    const q = query.toLowerCase();
    return tools.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }, [query, tools]);

  const visibleCategories = useMemo(
    () => categories.filter((cat) => filteredTools.some((t) => t.category === cat)),
    [categories, filteredTools]
  );

  return { query, setQuery, filteredTools, visibleCategories };
}
