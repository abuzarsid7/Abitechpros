import { tools } from "@/data/tools";

/**
 * Look up a tool from the registry by its slug (id).
 * Returns { tool_name, tool_category, tool_page } or null.
 */
export function getToolMeta(slug) {
  const tool = tools.find((t) => t.id === slug);
  if (!tool) return null;
  return {
    tool_name: tool.id,
    tool_category: tool.category,
    tool_page: tool.href,
  };
}

/**
 * Derive the tool slug from a pathname like "/tools/markdown-to-pdf".
 * Returns the slug string or null if the path isn't a tool page.
 */
export function toolSlugFromPath(pathname) {
  const match = pathname.match(/^\/tools\/([^/]+)/);
  return match ? match[1] : null;
}

/**
 * Send a GA4 event with standardised tool parameters.
 *
 * @param {string} eventName  — GA4 event name
 * @param {string} slug       — tool id / slug (e.g. "markdown-to-pdf")
 * @param {object} extra      — any additional event params
 */
export function trackToolEvent(eventName, slug, extra = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  if (!process.env.NEXT_PUBLIC_GA_ID) return;

  const meta = getToolMeta(slug);
  if (!meta) return;

  window.gtag("event", eventName, {
    ...meta,
    ...extra,
  });
}

// ─── Recommended GA events for tools websites ──────────────────────────────

/**
 * tool_used — fired when a user navigates to / opens a tool.
 * @param {string} slug — tool id
 */
export function trackToolUsed(slug) {
  trackToolEvent("tool_used", slug);
}

/**
 * tool_run — fired when a tool executes its primary action.
 * @param {string} slug   — tool id
 * @param {object} extra  — e.g. { input_length: 120 }
 */
export function trackToolRun(slug, extra = {}) {
  trackToolEvent("tool_run", slug, extra);
}

/**
 * result_copied — fired when a user copies a tool result.
 * @param {string} slug   — tool id
 * @param {object} extra  — e.g. { copy_label: "Copy HTML" }
 */
export function trackResultCopied(slug, extra = {}) {
  trackToolEvent("result_copied", slug, extra);
}

/**
 * result_downloaded — fired when a user downloads / exports a tool result.
 * @param {string} slug   — tool id
 * @param {object} extra  — e.g. { file_format: "pdf" }
 */
export function trackResultDownloaded(slug, extra = {}) {
  trackToolEvent("result_downloaded", slug, extra);
}

/**
 * tool_search — fired when a user searches for tools on the listing page.
 * @param {string} query — the search term
 */
export function trackToolSearch(query) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  if (!process.env.NEXT_PUBLIC_GA_ID) return;

  window.gtag("event", "tool_search", {
    search_term: query,
  });
}
