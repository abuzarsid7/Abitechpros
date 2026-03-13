const BASE_URL = "https://abitechpros.com";

export const TOOL_VARIATIONS_BY_TOOL = {
	"markdown-to-pdf": [
		{ slug: "markdown-to-pdf-online", label: "Online Converter" },
		{ slug: "md-to-pdf-converter", label: "MD to PDF Converter" },
		{ slug: "free-markdown-pdf", label: "Free Markdown PDF" },
		{ slug: "browser-markdown-export", label: "Browser Markdown Export" },
	],
	"password-generator": [
		{ slug: "secure-password-generator", label: "Secure Password Generator" },
		{ slug: "random-password-generator", label: "Random Password Generator" },
		{ slug: "strong-password-generator", label: "Strong Password Generator" },
		{ slug: "password-generator-online", label: "Online Password Generator" },
	],
	"qr-code-generator": [
		{ slug: "qr-code-generator-online", label: "Online QR Generator" },
		{ slug: "free-qr-code-maker", label: "Free QR Code Maker" },
		{ slug: "qr-code-png-svg", label: "QR Code PNG/SVG" },
		{ slug: "custom-qr-code-generator", label: "Custom QR Generator" },
	],
	"text-counter": [
		{ slug: "word-counter-online", label: "Word Counter" },
		{ slug: "character-counter-online", label: "Character Counter" },
		{ slug: "text-analyzer-online", label: "Text Analyzer" },
		{ slug: "reading-time-calculator", label: "Reading Time Calculator" },
	],
	"base64-encoder-decoder": [
		{ slug: "base64-encoder-online", label: "Base64 Encoder" },
		{ slug: "base64-decoder-online", label: "Base64 Decoder" },
		{ slug: "text-to-base64", label: "Text to Base64" },
		{ slug: "base64-to-text", label: "Base64 to Text" },
	],
	"color-converter": [
		{ slug: "hex-to-rgb-converter", label: "HEX to RGB" },
		{ slug: "rgb-to-hsl-converter", label: "RGB to HSL" },
		{ slug: "color-format-converter", label: "Color Format Converter" },
		{ slug: "cmyk-to-rgb-converter", label: "CMYK to RGB" },
	],
	"image-compressor": [
		{ slug: "image-compressor-online", label: "Online Image Compressor" },
		{ slug: "compress-jpg-png", label: "Compress JPG/PNG" },
		{ slug: "image-resizer-online", label: "Online Image Resizer" },
		{ slug: "webp-image-optimizer", label: "WebP Optimizer" },
	],
	"json-formatter": [
		{ slug: "json-formatter-online", label: "Online JSON Formatter" },
		{ slug: "json-validator-online", label: "JSON Validator" },
		{ slug: "json-minifier-online", label: "JSON Minifier" },
		{ slug: "json-beautifier", label: "JSON Beautifier" },
	],
	"timestamp-converter": [
		{ slug: "unix-timestamp-converter", label: "Unix Timestamp Converter" },
		{ slug: "epoch-to-date-converter", label: "Epoch to Date" },
		{ slug: "date-to-unix-timestamp", label: "Date to Unix Timestamp" },
		{ slug: "timestamp-to-iso", label: "Timestamp to ISO" },
	],
	"uuid-generator": [
		{ slug: "uuid-generator-v4", label: "UUID v4 Generator" },
		{ slug: "uuid-generator-v7", label: "UUID v7 Generator" },
		{ slug: "bulk-uuid-generator", label: "Bulk UUID Generator" },
		{ slug: "guid-generator-online", label: "GUID Generator" },
	],
};

export function getToolVariationsForTool(toolId) {
	return TOOL_VARIATIONS_BY_TOOL[toolId] ?? [];
}

export function isSupportedToolVariation(toolId, variation) {
	return getToolVariationsForTool(toolId).some((item) => item.slug === variation);
}

export function generateToolVariationStaticParams(toolId) {
	return getToolVariationsForTool(toolId).map((item) => ({ variation: item.slug }));
}

export function getToolVariationLabel(toolId, variation) {
	return getToolVariationsForTool(toolId).find((item) => item.slug === variation)?.label ?? variation;
}

export function buildToolVariationMetadata({ tool, variation }) {
	const variationLabel = getToolVariationLabel(tool.id, variation);
	const variationUrl = `${BASE_URL}${tool.href}/${variation}`;
	const variationTerm = variation.replace(/-/g, " ");
	const title = `${tool.title} – ${variationLabel} | AbiTechPros`;
	const description = `Use the ${variationLabel.toLowerCase()} tool to ${variationTerm}. ${tool.description}`;

	return {
		title,
		description,
		alternates: { canonical: variationUrl },
		keywords: [
			variationTerm,
			`${variationTerm} tool`,
			`${variationTerm} online`,
			tool.title,
			`${tool.title} tool`,
		],
		openGraph: {
			title,
			description,
			url: variationUrl,
			siteName: "AbiTechPros",
			type: "website",
		},
		twitter: {
			card: "summary",
			title,
			description,
		},
	};
}
