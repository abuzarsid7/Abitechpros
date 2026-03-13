/**
 * Central registry of all tools.
 * Add a new entry here and it will automatically appear on the /tools page.
 *
 * Fields:
 *   id          string  — unique slug, matches the folder name under /tools/
 *   title       string  — display name
 *   description string  — short description (shown in ToolCard)
 *   href        string  — route
 *   icon        string  — emoji or short text for the card icon
 *   badge       string? — optional e.g. "New", "Beta"
 *   category    string  — used to group cards on the listing page
 *   relatedIds   string[] — curated internal links to related tools
 */
export const tools = [
  {
    id: "markdown-to-pdf",
    title: "Markdown to PDF",
    description: "Write or paste Markdown and export it as a beautifully formatted PDF with one click.",
    href: "/tools/markdown-to-pdf",
    icon: "📄",
    category: "Document",
    relatedIds: ["text-counter", "json-formatter", "image-compressor"],
  },
  {
    id: "password-generator",
    title: "Password Generator",
    description: "Generate strong, secure passwords with customisable length and character sets.",
    href: "/tools/password-generator",
    icon: "🔑",
    category: "Security",
    relatedIds: ["uuid-generator", "qr-code-generator", "base64-encoder-decoder"],
  },
  {
    id: "qr-code-generator",
    title: "QR Code Generator",
    description: "Turn any URL or text into a scannable QR code you can download instantly.",
    href: "/tools/qr-code-generator",
    icon: "📱",
    category: "Utility",
    relatedIds: ["color-converter", "uuid-generator", "password-generator"],
  },
  {
    id: "text-counter",
    title: "Text Counter",
    description: "Count characters, words, sentences, and paragraphs in any block of text.",
    href: "/tools/text-counter",
    icon: "🔢",
    category: "Text",
    relatedIds: ["markdown-to-pdf", "base64-encoder-decoder", "json-formatter"],
  },
  {
    id: "base64-encoder-decoder",
    title: "Base64 Encoder / Decoder",
    description: "Encode text to Base64 or decode Base64 strings back to plain text with Unicode support.",
    href: "/tools/base64-encoder-decoder",
    icon: "🔤",
    badge: "New",
    category: "Text",
    relatedIds: ["json-formatter", "text-counter", "uuid-generator"],
  },
  {
    id: "color-converter",
    title: "Color Converter",
    description: "Convert colors between HEX, RGB, HSL, CMYK, and HSB formats with live preview.",
    href: "/tools/color-converter",
    icon: "🎨",
    badge: "New",
    category: "Design",
    relatedIds: ["image-compressor", "qr-code-generator", "markdown-to-pdf"],
  },
  {
    id: "image-compressor",
    title: "Image Compressor",
    description: "Compress, resize, and convert images in your browser — nothing is uploaded.",
    href: "/tools/image-compressor",
    icon: "🖼️",
    badge: "New",
    category: "Media",
    relatedIds: ["color-converter", "markdown-to-pdf", "qr-code-generator"],
  },
  {
    id: "json-formatter",
    title: "JSON Formatter",
    description: "Format, validate, minify, and analyze JSON with syntax highlighting.",
    href: "/tools/json-formatter",
    icon: "{ }",
    badge: "New",
    category: "Developer",
    relatedIds: ["base64-encoder-decoder", "timestamp-converter", "uuid-generator"],
  },
  {
    id: "timestamp-converter",
    title: "Timestamp Converter",
    description: "Convert between Unix timestamps, ISO 8601, and human-readable dates with a live clock.",
    href: "/tools/timestamp-converter",
    icon: "⏱️",
    badge: "New",
    category: "Developer",
    relatedIds: ["uuid-generator", "json-formatter", "qr-code-generator"],
  },
  {
    id: "uuid-generator",
    title: "UUID Generator",
    description: "Generate v4 and v7 UUIDs with batch generation, parsing, and history.",
    href: "/tools/uuid-generator",
    icon: "🆔",
    badge: "New",
    category: "Developer",
    relatedIds: ["timestamp-converter", "json-formatter", "password-generator"],
  },
];

const toolMap = new Map(tools.map((tool) => [tool.id, tool]));

export function getToolByHref(href) {
  return tools.find((tool) => tool.href === href) ?? null;
}

export function getRelatedTools(currentTool, limit = 3) {
  if (!currentTool) return [];

  const explicitRelated = (currentTool.relatedIds ?? [])
    .map((id) => toolMap.get(id))
    .filter(Boolean);

  const sameCategory = tools.filter(
    (tool) =>
      tool.id !== currentTool.id &&
      tool.category === currentTool.category &&
      !(currentTool.relatedIds ?? []).includes(tool.id)
  );

  const otherTools = tools.filter(
    (tool) =>
      tool.id !== currentTool.id &&
      tool.category !== currentTool.category &&
      !(currentTool.relatedIds ?? []).includes(tool.id)
  );

  return [...explicitRelated, ...sameCategory, ...otherTools].slice(0, limit);
}

/** Unique list of categories, preserving order of first appearance. */
export const categories = [...new Set(tools.map((t) => t.category))];

export function categoryToSlug(category) {
  return category.toLowerCase().replace(/\s+/g, "-");
}

export function slugToCategory(categorySlug) {
  return categories.find((category) => categoryToSlug(category) === categorySlug) ?? null;
}

export function getToolsByCategory(category) {
  return tools.filter((tool) => tool.category === category);
}
