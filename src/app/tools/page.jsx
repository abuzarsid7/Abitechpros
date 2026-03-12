import Container from "@/components/layout/Container";
import ToolSearchGrid from "@/components/tools/ToolSearchGrid";
import { tools, categories } from "@/data/tools";
import JsonLd from "@/components/JsonLd";

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
];

export const metadata = {
  title: "Free Online Developer Tools",
  description: "A growing collection of free browser-based developer tools — no sign-up required. Password generators, JSON formatters, QR code generators, and more.",
  alternates: { canonical: "https://abitechpros.com/tools" },
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
      <ToolSearchGrid tools={tools} categories={categories} />
    </Container>
  );
}
