import { Suspense } from "react";
import Container from "@/components/layout/Container";
import ToolSearchGrid from "@/components/tools/ToolSearchGrid";
import ToolsLandingContent from "@/components/tools/ToolsLandingContent";
import FaqSection from "@/components/ui/FaqSection";
import { tools, categories } from "@/data/tools";
import JsonLd from "@/components/JsonLd";
import { createToolsPageFaqSchema, getToolsPageFaqItems } from "@/lib/seo";

export const dynamic = "force-static";

const TOOLS_FAQ_ITEMS = getToolsPageFaqItems();

const TOOLS_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free Online Developer Tools",
    description: "A growing collection of free browser-based developer tools — no sign-up required.",
    url: "https://abitechpros.com/tools",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://abitechpros.com" },
      { "@type": "ListItem", position: 2, name: "Tools", item: "https://abitechpros.com/tools" },
    ],
  },
  createToolsPageFaqSchema(),
];

export const metadata = {
  title: "Free Online Developer Tools",
  description: "A growing collection of free browser-based developer tools — no sign-up required. Password generators, JSON formatters, QR code generators, and more.",
  alternates: { canonical: "https://abitechpros.com/tools" },
  keywords: [
    "free online developer tools",
    "browser based tools",
    "password generator",
    "JSON formatter",
    "base64 encoder decoder",
    "QR code generator",
    "text counter",
    "UUID generator",
    "color converter",
    "image compressor",
    "timestamp converter",
    "markdown to PDF",
    "free coding utilities",
    "no sign-up tools",
  ],
  openGraph: {
    title: "Free Online Developer Tools",
    description: "A growing collection of free browser-based developer tools — no sign-up required. Password generators, JSON formatters, QR code generators, and more.",
    url: "https://abitechpros.com/tools",
    siteName: "AbiTechPros",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Free Online Developer Tools",
    description: "A growing collection of free browser-based developer tools — no sign-up required. Password generators, JSON formatters, QR code generators, and more.",
  },
};

export default function ToolsPage() {

  return (
    <Container size="lg" as="section" className="py-12">
      <JsonLd data={TOOLS_SCHEMA} />
      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-ink">Tools</h1>
        <p className="mt-2 text-sm text-faint max-w-lg">
          Free, browser-based utilities — no sign-up required. Pick a tool and get started.
        </p>
      </div>

      {/* Searchable tool grid */}
      <Suspense fallback={<div className="h-10" />}>
        <ToolSearchGrid tools={tools} categories={categories} />
      </Suspense>

      <ToolsLandingContent tools={tools} categories={categories} />

      <FaqSection title="Tools FAQ" items={TOOLS_FAQ_ITEMS} size="lg" />
    </Container>
  );
}
