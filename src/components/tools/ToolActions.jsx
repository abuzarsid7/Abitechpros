/**
 * ToolActions — bottom action bar inside a ToolLayout/ToolSection.
 *
 * Props:
 *   align    "left" | "right" | "between"  (default: "right")
 *   children — place <button> elements or other controls here
 */
export default function ToolActions({ align = "right", children }) {
  const alignClass = {
    left: "justify-start",
    right: "justify-end",
    between: "justify-between",
  }[align] ?? "justify-end";

  return (
    <div className={`flex flex-wrap items-center gap-2 ${alignClass}`}>
      {children}
    </div>
  );
}

/**
 * ToolButton — primary / secondary / ghost action button.
 *
 * Props:
 *   variant  "primary" | "secondary" | "ghost"  (default: "primary")
 *   size     "sm" | "md"                         (default: "md")
 *   icon     ReactNode (optional) — shown before label
 *   disabled boolean
 *   onClick  function
 *   type     string  (default: "button")
 *   children
 */
export function ToolButton({
  variant = "primary",
  size = "md",
  icon = null,
  disabled = false,
  onClick = null,
  type = "button",
  children,
}) {
  const base =
    "inline-flex items-center gap-1.5 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/50 disabled:pointer-events-none disabled:opacity-40";

  const variants = {
    primary: "bg-accent text-accent-fg hover:opacity-90",
    secondary: "border border-line bg-surface text-ink hover:bg-muted",
    ghost: "text-dim hover:text-ink hover:bg-subtle",
  };

  const sizes = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-3.5 py-1.5 text-sm",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant] ?? variants.primary} ${sizes[size] ?? sizes.md}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
