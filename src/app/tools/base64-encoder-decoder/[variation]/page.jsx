import { notFound } from "next/navigation";
import { tools } from "@/data/tools";
import ToolVariationIntro from "@/components/tools/ToolVariationIntro";
import Base64ToolPage from "../page";
import {
	buildToolVariationMetadata,
	generateToolVariationStaticParams,
	isSupportedToolVariation,
} from "@/lib/toolVariations";

const TOOL = tools.find((tool) => tool.id === "base64-encoder-decoder");

export function generateStaticParams() {
	return generateToolVariationStaticParams(TOOL.id);
}

export function generateMetadata({ params }) {
	if (!isSupportedToolVariation(TOOL.id, params.variation)) {
		return { title: "Not Found", robots: { index: false, follow: false } };
	}
	return buildToolVariationMetadata({ tool: TOOL, variation: params.variation });
}

export default function Base64VariationPage({ params }) {
	if (!isSupportedToolVariation(TOOL.id, params.variation)) notFound();
	return (
		<>
			<ToolVariationIntro tool={TOOL} variation={params.variation} />
			<Base64ToolPage />
		</>
	);
}
