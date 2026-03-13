import Link from "next/link";
import Container from "@/components/layout/Container";
import { getToolVariationLabel } from "@/lib/toolVariations";

function getVariationUseCases(tool, variationLabel) {
  return [
    `Use this ${variationLabel.toLowerCase()} page when you want the ${tool.title.toLowerCase()} workflow without extra setup or sign-up steps.`,
    `This variation helps visitors land on a page that matches the exact task they searched for, while keeping the full ${tool.title.toLowerCase()} tool immediately available below.`,
    `If you need the broader feature set or want to compare related workflows, you can also open the main ${tool.title.toLowerCase()} page.`
  ];
}

export default function ToolVariationIntro({ tool, variation }) {
  const variationLabel = getToolVariationLabel(tool.id, variation);
  const variationTerm = variation.replace(/-/g, " ");
  const useCases = getVariationUseCases(tool, variationLabel);

  return (
    <Container size="md" as="section" className="pt-10 pb-2">
      <div className="rounded-xl border border-line bg-surface p-5 sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-faint">
          {tool.category} Tool Variation
        </p>
        <h1 className="mt-3 text-2xl font-bold text-ink">{variationLabel}</h1>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-faint">
          <p>
            This page targets the <strong className="text-ink">{variationTerm}</strong> use case for {tool.title}. It gives visitors a more specific landing page while keeping the same working tool directly below, so they can start immediately after reading the context.
          </p>
          <p>
            {tool.description} This variation is useful for searchers looking for a narrower phrase such as <strong className="text-ink">{variationLabel.toLowerCase()}</strong> while still expecting the full AbiTechPros tool experience.
          </p>
        </div>

        <ul className="mt-5 space-y-2 text-sm leading-relaxed text-faint list-disc pl-5">
          {useCases.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
          <Link href={tool.href} className="font-medium text-ink underline underline-offset-2 hover:no-underline">
            Open the main {tool.title} page
          </Link>
          <span className="text-faint">or continue with the tool below.</span>
        </div>
      </div>
    </Container>
  );
}