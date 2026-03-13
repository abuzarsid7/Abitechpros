import Link from "next/link";
import Container from "@/components/layout/Container";
import ToolCard from "@/components/tools/ToolCard";
import QuickLinksStrip from "@/components/home/QuickLinksStrip";
import { tools } from "@/data/tools";

export const metadata = {
  title: "AbiTechPros – Free Developer Tools & Tech Blog",
  description: "Free browser-based developer tools and tech articles. No sign-up required.",
  alternates: { canonical: "https://abitechpros.com" },
  keywords: [
    "AbiTechPros",
    "free developer tools",
    "online tools for developers",
    "browser based tools",
    "coding utilities",
    "tech blog",
    "developer utilities",
    "free web tools",
    "no sign-up tools",
  ],
  openGraph: {
    title: "AbiTechPros – Free Developer Tools & Tech Blog",
    description: "Free browser-based developer tools and tech articles. No sign-up required.",
    url: "https://abitechpros.com",
    siteName: "AbiTechPros",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "AbiTechPros – Free Developer Tools & Tech Blog",
    description: "Free browser-based developer tools and tech articles. No sign-up required.",
  },
};

export default function HomePage() {
  const featuredTools = tools.slice(0, 3);

  return (
    <main>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="checker-background pointer-events-none absolute inset-0" />
        <Container size="md" className="relative py-20 text-center">
          <span className="inline-flex items-center rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-faint mb-5">
            Free · No sign-up required
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-ink leading-tight tracking-tight">
            Developer tools &amp;<br className="hidden sm:block" /> articles, all in one place
          </h1>
          <p className="mt-4 text-base text-faint max-w-md mx-auto leading-relaxed">
            AbiTechPros is a growing collection of browser-based utilities and guides built to speed up your workflow.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 rounded-md bg-accent text-accent-fg px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Browse tools
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface text-ink px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
            >
              Read the blog
            </Link>
          </div>
        </Container>
      </section>

      {/* ── Featured tools ──────────────────────────────────── */}
      <section className="py-16">
        <Container size="lg">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-ink">Featured tools</h2>
              <p className="mt-1 text-sm text-faint">
                Jump straight in — no install, no account.
              </p>
            </div>
            <Link
              href="/tools"
              className="text-xs font-medium text-faint hover:text-ink transition-colors whitespace-nowrap"
            >
              All tools →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                title={tool.title}
                description={tool.description}
                href={tool.href}
                icon={tool.icon}
                badge={tool.badge}
              />
            ))}
          </div>
        </Container>
      </section>

      <QuickLinksStrip />
    </main>
  );
}

