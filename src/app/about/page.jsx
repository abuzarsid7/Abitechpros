import Container from "@/components/layout/Container";
import JsonLd from "@/components/JsonLd";

const ABOUT_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About AbiTechPros",
    description: "Learn about AbiTechPros and what we're building.",
    url: "https://abitechpros.com/about",
    author: {
      "@type": "Person",
      name: "Abuzar Siddiqui",
      url: "https://github.com/abuzarsid7",
      sameAs: [
        "https://github.com/abuzarsid7",
        "https://linkedin.com/in/abuzarsid",
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Abuzar Siddiqui",
    email: "hello@abitechpros.com",
    url: "https://github.com/abuzarsid7",
    sameAs: [
      "https://github.com/abuzarsid7",
      "https://linkedin.com/in/abuzarsid",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://abitechpros.com" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://abitechpros.com/about" },
    ],
  },
];

export const metadata = {
  title: "About — AbiTechPros",
  description: "Learn about AbiTechPros and what we're building.",
  alternates: { canonical: "https://abitechpros.com/about" },
  creator: "Abuzar Siddiqui",
  authors: [{ name: "Abuzar Siddiqui", url: "https://github.com/abuzarsid7" }],
  keywords: [
    "about AbiTechPros",
    "Abuzar Siddiqui",
    "AbiTechPros team",
    "developer tools creator",
    "free tools project",
    "open source developer tools",
  ],
  openGraph: {
    title: "About — AbiTechPros",
    description: "Learn about AbiTechPros and what we're building.",
    url: "https://abitechpros.com/about",
    siteName: "AbiTechPros",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About — AbiTechPros",
    description: "Learn about AbiTechPros and what we're building.",
  },
};

export default function AboutPage() {
  return (
    <Container size="md" as="section" className="py-16">
      <JsonLd data={ABOUT_SCHEMA} />
      <h1 className="text-3xl font-bold text-ink">About</h1>
      <p className="mt-4 text-sm text-faint leading-relaxed max-w-prose">
        AbiTechPros is a growing collection of free, browser-based developer tools and articles
        built to speed up your workflow — no sign-up required.
      </p>

      <div className="mt-10 space-y-8">
        <section className="rounded-xl border border-line bg-surface p-5 sm:p-6">
          <h2 className="text-base font-semibold text-ink">What AbiTechPros is building</h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-faint">
            <p>
              AbiTechPros focuses on practical utilities that solve real workflow problems for developers, designers,
              and technical teams. Instead of installing one-off software for simple tasks, users can open a tool,
              complete the task quickly, and continue shipping.
            </p>
            <p>
              The platform is designed around clarity and speed: concise interfaces, fast interactions, and tools that
              do one job well. Alongside utilities, the site also publishes technical writing and guides to support
              everyday engineering work.
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-line bg-surface p-5 sm:p-6">
          <h2 className="text-base font-semibold text-ink">Our principles</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-faint list-disc pl-5">
            <li>Free to use tools with no mandatory sign-up.</li>
            <li>Browser-first workflows for speed and accessibility.</li>
            <li>Simple, focused interfaces instead of feature overload.</li>
            <li>Useful technical content that supports real implementation work.</li>
          </ul>
        </section>
      </div>

      <div className="mt-10 border-t border-line pt-8">
        <h2 className="text-base font-semibold text-ink">Built by Abuzar Siddiqui</h2>
        <ul className="mt-4 flex flex-col gap-3">
          <li className="flex items-center gap-2 text-sm text-faint">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
              fill="currentColor" aria-hidden="true" className="shrink-0">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483
                0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466
                -.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832
                .092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688
                -.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59
                0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7
                1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0
                1.338-.012 2.419-.012 2.749 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484
                17.522 2 12 2Z" />
            </svg>
            <a
              href="https://github.com/abuzarsid7"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors"
            >
              github.com/abuzarsid7
            </a>
          </li>
          <li className="flex items-center gap-2 text-sm text-faint">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
              fill="currentColor" aria-hidden="true" className="shrink-0">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853
                0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85
                3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0
                1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225
                0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227
                24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
            </svg>
            <a
              href="https://linkedin.com/in/abuzarsid"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors"
            >
              linkedin.com/in/abuzarsid
            </a>
          </li>
          <li className="flex items-center gap-2 text-sm text-faint">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round" aria-hidden="true" className="shrink-0">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <a
              href="mailto:hello@abitechpros.com"
              className="hover:text-ink transition-colors"
            >
              hello@abitechpros.com
            </a>
          </li>
        </ul>
      </div>

      <section className="mt-10 rounded-xl border border-line bg-surface p-5 sm:p-6">
        <h2 className="text-base font-semibold text-ink">For feedback and collaboration</h2>
        <p className="mt-3 text-sm leading-relaxed text-faint max-w-prose">
          If you have ideas for new tools, product improvements, bug reports, or collaboration opportunities,
          reach out any time. AbiTechPros evolves based on practical feedback from people actively building things.
        </p>
      </section>
    </Container>
  );
}
