import Link from "next/link";

/**
 * ToolCard — displays a single tool in a grid.
 *
 * Props:
 *   title       string   — tool name
 *   description string   — short summary
 *   href        string   — route to the tool
 *   icon        ReactNode (optional) — SVG or emoji
 *   badge       string   (optional) — e.g. "New", "Beta"
 */
export default function ToolCard({ title, description, href, icon = null, badge = null }) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-xl border border-line bg-surface p-5 transition-colors duration-150 hover:border-ink hover:bg-subtle"
    >
      {/* Top row: icon + badge */}
      <div className="flex items-start justify-between gap-2">
        {icon ? (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-ink text-lg">
            {icon}
          </span>
        ) : (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-ink text-xs font-bold select-none">
            {title.slice(0, 2).toUpperCase()}
          </span>
        )}
        {badge && (
          <span className="rounded-full border border-line px-2 py-0.5 text-[10px] font-medium text-faint">
            {badge}
          </span>
        )}
      </div>

      {/* Text */}
      <div>
        <h3 className="text-sm font-semibold text-ink group-hover:text-ink">{title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-faint line-clamp-2">{description}</p>
      </div>

      {/* CTA */}
      <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-dim group-hover:text-ink transition-colors">
        Open tool
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
        </svg>
      </span>
    </Link>
  );
}