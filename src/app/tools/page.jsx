import Container from "@/components/layout/Container";
import ToolCard from "@/components/tools/ToolCard";
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

      {/* Tools grouped by category */}
      {categories.map((cat) => {
        const catTools = tools.filter((t) => t.category === cat);
        return (
          <div key={cat} className="mb-10">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-faint">
              {cat}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {catTools.map((tool) => (
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
          </div>
        );
      })}
    </Container>
  );
}
