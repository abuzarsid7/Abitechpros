import { notFound } from "next/navigation";
import { tools } from "@/data/tools";
import ToolVariationIntro from "@/components/tools/ToolVariationIntro";
import MyToolPage from "../page";
import {
  buildToolVariationMetadata,
  generateToolVariationStaticParams,
  isSupportedToolVariation,
} from "@/lib/toolVariations";

/**
 * Variation route template.
 *
 * For a new tool:
 * - replace TEMPLATE_TOOL_ID with the new tool slug
 * - add variations in src/lib/toolVariations.js for that slug
 */

const TEMPLATE_TOOL_ID = "_template";

const TOOL =
  tools.find((tool) => tool.id === TEMPLATE_TOOL_ID) ?? {
    id: TEMPLATE_TOOL_ID,
    title: "Tool Template",
    description: "Template variation route.",
    href: "/tools/_template",
  };

export function generateStaticParams() {
  return generateToolVariationStaticParams(TOOL.id);
}

export function generateMetadata({ params }) {
  if (!isSupportedToolVariation(TOOL.id, params.variation)) {
    return { title: "Not Found", robots: { index: false, follow: false } };
  }

  return buildToolVariationMetadata({
    tool: TOOL,
    variation: params.variation,
  });
}

export default function TemplateVariationPage({ params }) {
  if (!isSupportedToolVariation(TOOL.id, params.variation)) {
    notFound();
  }

  return (
    <>
      <ToolVariationIntro tool={TOOL} variation={params.variation} />
      <MyToolPage />
    </>
  );
}
