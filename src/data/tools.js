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
 */
export const tools = [
  {
    id: "markdown-to-pdf",
    title: "Markdown to PDF",
    description: "Write or paste Markdown and export it as a beautifully formatted PDF with one click.",
    href: "/tools/markdown-to-pdf",
    icon: "📄",
    category: "Document",
  },
  {
    id: "password-generator",
    title: "Password Generator",
    description: "Generate strong, secure passwords with customisable length and character sets.",
    href: "/tools/password-generator",
    icon: "🔑",
    category: "Security",
  },
  {
    id: "qr-code-generator",
    title: "QR Code Generator",
    description: "Turn any URL or text into a scannable QR code you can download instantly.",
    href: "/tools/qr-code-generator",
    icon: "📱",
    category: "Utility",
  },
  {
    id: "text-counter",
    title: "Text Counter",
    description: "Count characters, words, sentences, and paragraphs in any block of text.",
    href: "/tools/text-counter",
    icon: "🔢",
    category: "Text",
  },
  {
    id: "base64-encoder-decoder",
    title: "Base64 Encoder / Decoder",
    description: "Encode text to Base64 or decode Base64 strings back to plain text with Unicode support.",
    href: "/tools/base64-encoder-decoder",
    icon: "🔤",
    badge: "New",
    category: "Text",
  },
  {
    id: "color-converter",
    title: "Color Converter",
    description: "Convert colors between HEX, RGB, HSL, CMYK, and HSB formats with live preview.",
    href: "/tools/color-converter",
    icon: "🎨",
    badge: "New",
    category: "Design",
  },
  {
    id: "image-compressor",
    title: "Image Compressor",
    description: "Compress, resize, and convert images in your browser — nothing is uploaded.",
    href: "/tools/image-compressor",
    icon: "🖼️",
    badge: "New",
    category: "Media",
  },
  {
    id: "json-formatter",
    title: "JSON Formatter",
    description: "Format, validate, minify, and analyze JSON with syntax highlighting.",
    href: "/tools/json-formatter",
    icon: "{ }",
    badge: "New",
    category: "Developer",
  },
  {
    id: "timestamp-converter",
    title: "Timestamp Converter",
    description: "Convert between Unix timestamps, ISO 8601, and human-readable dates with a live clock.",
    href: "/tools/timestamp-converter",
    icon: "⏱️",
    badge: "New",
    category: "Developer",
  },
  {
    id: "uuid-generator",
    title: "UUID Generator",
    description: "Generate v4 and v7 UUIDs with batch generation, parsing, and history.",
    href: "/tools/uuid-generator",
    icon: "🆔",
    badge: "New",
    category: "Developer",
  },
];

/** Unique list of categories, preserving order of first appearance. */
export const categories = [...new Set(tools.map((t) => t.category))];
