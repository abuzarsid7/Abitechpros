import Container from "@/components/layout/Container";

export const dynamic = "force-static";

/**
 * Shared layout for all /tools/* pages.
 * Adds a subtle top background band and constrains width.
 */
export default function ToolsLayout({ children }) {
  return (
    <div className="min-h-screen bg-base">
      {/* Decorative top strip */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-line to-transparent" />
      {children}
    </div>
  );
}
