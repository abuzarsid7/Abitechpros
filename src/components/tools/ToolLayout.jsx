import Link from "next/link";
import Container from "@/components/layout/Container";

/**
 * ToolLayout — page shell for individual tool pages.
 *
 * Props:
 *   title        string    — tool name (shown as <h1>)
 *   description  string    — short description under title
 *   backHref     string    — Back link destination (default: "/tools")
 *   backLabel    string    — Back link text (default: "All tools")
 *   actions      ReactNode — optional buttons rendered top-right
 *   size         Container size prop (default: "md")
 *   children
 */
export default function ToolLayout({
  title,
  description,
  backHref = "/tools",
  backLabel = "All tools",
  actions = null,
  size = "md",
  children,
}) {
  return (
    <Container size={size} as="section" className="py-10">
      {/* Back link */}
      <Link
        href={backHref}
        className="inline-flex items-center gap-1 text-xs text-faint hover:text-ink transition-colors mb-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
        </svg>
        {backLabel}
      </Link>

      {/* Header */}
      <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-faint max-w-prose">{description}</p>
          )}
        </div>
        {actions && <div className="mt-3 sm:mt-0 flex items-center gap-2">{actions}</div>}
      </div>

      {/* Tool body */}
      <div className="rounded-xl border border-line bg-surface">
        {children}
      </div>
    </Container>
  );
}