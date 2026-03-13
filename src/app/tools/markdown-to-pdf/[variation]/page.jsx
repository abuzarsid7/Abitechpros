import { notFound } from "next/navigation";
import { tools } from "@/data/tools";
import ToolVariationIntro from "@/components/tools/ToolVariationIntro";
import MarkdownToPdfPage from "../page";
import {
	buildToolVariationMetadata,
	generateToolVariationStaticParams,
	isSupportedToolVariation,
} from "@/lib/toolVariations";

const TOOL = tools.find((tool) => tool.id === "markdown-to-pdf");

export function generateStaticParams() {
	return generateToolVariationStaticParams(TOOL.id);
}

export function generateMetadata({ params }) {
	if (!isSupportedToolVariation(TOOL.id, params.variation)) {
		return { title: "Not Found", robots: { index: false, follow: false } };
	}
	return buildToolVariationMetadata({ tool: TOOL, variation: params.variation });
}

export default function MarkdownToPdfVariationPage({ params }) {
	if (!isSupportedToolVariation(TOOL.id, params.variation)) notFound();
	return (
		<>
			<ToolVariationIntro tool={TOOL} variation={params.variation} />
			<MarkdownToPdfPage />
		</>
	);
}
