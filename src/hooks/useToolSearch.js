"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useMemo, useRef, useCallback } from "react";
import { trackToolSearch } from "@/lib/analytics";

/**
 * useToolSearch — debounced search across the tool registry with GA tracking.
 *
 * @param {object}  options
 * @param {Array}   options.tools      — full tool list from the registry
 * @param {Array}   options.categories — ordered unique category list
 * @param {string}  options.initialQuery — query string provided by the URL
 * @param {number}  options.debounceMs — debounce delay for analytics (default: 500)
 *
 * @returns {{
 *   query:             string,
 *   setQuery:          (value: string) => void,
 *   filteredTools:     Array,
 *   visibleCategories: Array,
 * }}
 */
export default function useToolSearch({ tools, categories, initialQuery = "", debounceMs = 500 }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQueryState] = useState(initialQuery);
  const debounceRef = useRef(null);

  const setQuery = useCallback(
    (value) => {
      setQueryState(value);

      const params = new URLSearchParams(searchParams.toString());
      if (value.trim()) {
        params.set("q", value.trim());
      } else {
        params.delete("q");
      }
      const nextQuery = params.toString();
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });

      clearTimeout(debounceRef.current);
      if (value.trim()) {
        debounceRef.current = setTimeout(() => {
          trackToolSearch(value.trim());
        }, debounceMs);
      }
    },
    [debounceMs, pathname, router, searchParams]
  );

  const filteredTools = useMemo(() => {
    if (!query.trim()) return tools;

    const normalizedQuery = query.toLowerCase();
    return tools.filter(
      (tool) =>
        tool.title.toLowerCase().includes(normalizedQuery) ||
        tool.description.toLowerCase().includes(normalizedQuery) ||
        tool.category.toLowerCase().includes(normalizedQuery)
    );
  }, [query, tools]);

  const visibleCategories = useMemo(
    () => categories.filter((cat) => filteredTools.some((t) => t.category === cat)),
    [categories, filteredTools]
  );

  return { query, setQuery, filteredTools, visibleCategories };
}
