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
    id: "Base64-Encoder-Decoder",
    title: "Base64 Encoder / Decoder",
    description: "Encode text to Base64 or decode Base64 strings back to plain text with Unicode support.",
    href: "/tools/Base64-Encoder-Decoder",
    icon: "🔤",
    badge: "New",
    category: "Text",
  },
];

/** Unique list of categories, preserving order of first appearance. */
export const categories = [...new Set(tools.map((t) => t.category))];
