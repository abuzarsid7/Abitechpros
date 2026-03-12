"use client";

import { useCallback, useMemo } from "react";
import {
  trackToolEvent,
  trackToolRun,
  trackResultCopied,
  trackResultDownloaded,
  toolSlugFromPath,
  getToolMeta,
} from "@/lib/analytics";

/**
 * useToolAnalytics — returns analytics helpers pre-bound to a tool slug.
 *
 * Eliminates the need for every tool page to import multiple functions
 * and pass the slug manually each time.
 *
 * @param {string} slug — tool id (e.g. "markdown-to-pdf").
 *                         If omitted, auto-detected from window.location.
 *
 * @returns {{
 *   toolMeta:   { tool_name, tool_category, tool_page } | null,
 *   trackRun:   (extra?) => void,
 *   trackCopied:(extra?) => void,
 *   trackDownloaded: (extra?) => void,
 *   trackEvent: (eventName, extra?) => void,
 * }}
 */
export default function useToolAnalytics(slug) {
  const resolvedSlug = useMemo(() => {
    if (slug) return slug;
    if (typeof window !== "undefined") {
      return toolSlugFromPath(window.location.pathname);
    }
    return null;
  }, [slug]);

  const toolMeta = useMemo(
    () => (resolvedSlug ? getToolMeta(resolvedSlug) : null),
    [resolvedSlug]
  );

  const trackRun = useCallback(
    (extra = {}) => {
      if (resolvedSlug) trackToolRun(resolvedSlug, extra);
    },
    [resolvedSlug]
  );

  const trackCopied = useCallback(
    (extra = {}) => {
      if (resolvedSlug) trackResultCopied(resolvedSlug, extra);
    },
    [resolvedSlug]
  );

  const trackDownloaded = useCallback(
    (extra = {}) => {
      if (resolvedSlug) trackResultDownloaded(resolvedSlug, extra);
    },
    [resolvedSlug]
  );

  const trackEventBound = useCallback(
    (eventName, extra = {}) => {
      if (resolvedSlug) trackToolEvent(eventName, resolvedSlug, extra);
    },
    [resolvedSlug]
  );

  return {
    toolMeta,
    trackRun,
    trackCopied,
    trackDownloaded,
    trackEvent: trackEventBound,
  };
}
