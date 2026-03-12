import Container from "@/components/layout/Container";
import ToolSearchGrid from "@/components/tools/ToolSearchGrid";
import { tools, categories } from "@/data/tools";

export const metadata = {
  title: "Tools — AbiTechPros",
  description: "A growing collection of free browser-based developer tools.",
};

export default function ToolsPage() {
  return (
    <Container size="lg" as="section" className="py-12">
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
