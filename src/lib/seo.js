function createQuestion(name, acceptedAnswerText) {
	return {
		"@type": "Question",
		name,
		acceptedAnswer: {
			"@type": "Answer",
			text: acceptedAnswerText,
		},
	};
}

function createFaqPageSchema(items) {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: items.map(({ question, answer }) => createQuestion(question, answer)),
	};
}

export function getToolFaqItems({ name, description }) {
	const specificFaqByTool = {
		"Markdown to PDF": [
			{
				question: "Can I export Markdown as a PDF without installing software?",
				answer: "Yes. Markdown to PDF runs fully in your browser, so you can convert Markdown to PDF without installing any desktop app or extension.",
			},
			{
				question: "Does this Markdown to PDF tool support headings, lists, and code blocks?",
				answer: "Yes. The converter is built for common Markdown syntax including headings, lists, links, inline code, and fenced code blocks.",
			},
			{
				question: "Is my Markdown content uploaded to a server?",
				answer: "No. Your Markdown content is processed in the browser and is not uploaded to AbiTechPros servers.",
			},
			{
				question: "Can I use Markdown to PDF for quick documentation exports?",
				answer: "Yes. It is suitable for exporting notes, README drafts, and lightweight documentation into shareable PDF files.",
			},
		],
		"Password Generator": [
			{
				question: "How does the Password Generator create secure passwords?",
				answer: "It generates random passwords using browser cryptographic randomness and your selected character sets such as uppercase, lowercase, numbers, and symbols.",
			},
			{
				question: "Can I control password length and character types?",
				answer: "Yes. You can customize password length and choose which character groups to include for your generated password.",
			},
			{
				question: "Does AbiTechPros store generated passwords?",
				answer: "No. Passwords are generated locally in your browser and are not stored on AbiTechPros servers.",
			},
			{
				question: "Can I generate multiple passwords quickly?",
				answer: "Yes. You can regenerate passwords instantly with your selected settings until you get one that fits your requirements.",
			},
		],
		"QR Code Generator": [
			{
				question: "What can I convert into a QR code?",
				answer: "You can generate QR codes for URLs, plain text, email addresses, phone numbers, and other text-based content.",
			},
			{
				question: "Can I download QR codes as PNG and SVG?",
				answer: "Yes. The tool supports downloading generated QR codes in both PNG and SVG formats.",
			},
			{
				question: "Can I customize QR code colors and size?",
				answer: "Yes. You can adjust foreground and background colors, output size, and error correction settings.",
			},
			{
				question: "Is QR code generation private?",
				answer: "Yes. QR generation happens in the browser and your input is not uploaded to a remote backend.",
			},
		],
		"Word & Character Counter": [
			{
				question: "What does the Text Counter measure?",
				answer: "It measures words, characters, sentences, paragraphs, and estimated reading time from your input text.",
			},
			{
				question: "Can I use this tool for article and essay checks?",
				answer: "Yes. It is useful for checking writing length requirements for essays, blog posts, social media, and documentation.",
			},
			{
				question: "Does Text Counter work in real time?",
				answer: "Yes. Counts and statistics update as you type or paste text.",
			},
			{
				question: "Is my text sent to a server?",
				answer: "No. Text processing happens in-browser and your content remains local to your device.",
			},
		],
		"Base64 Encoder / Decoder": [
			{
				question: "Can I encode plain text to Base64 and decode it back?",
				answer: "Yes. The tool supports both Base64 encoding and decoding in one interface.",
			},
			{
				question: "Does the Base64 tool support Unicode text?",
				answer: "Yes. Unicode input is supported, so non-ASCII text can be encoded and decoded correctly.",
			},
			{
				question: "Can I use this tool for API payload and token debugging?",
				answer: "Yes. It is useful for inspecting Base64 strings commonly used in APIs, configs, and encoded payloads.",
			},
			{
				question: "Is Base64 conversion done locally?",
				answer: "Yes. Conversions run in your browser without sending data to a server.",
			},
		],
		"Color Converter": [
			{
				question: "Which color formats are supported in Color Converter?",
				answer: "The tool supports conversions between HEX, RGB, HSL, CMYK, and HSB color formats.",
			},
			{
				question: "Can I preview colors while converting?",
				answer: "Yes. A live color preview helps you verify the output as you convert between formats.",
			},
			{
				question: "Is this tool useful for UI and branding work?",
				answer: "Yes. It is designed for designers and developers who need fast, accurate format conversion for interfaces and brand palettes.",
			},
			{
				question: "Do I need design software to use this converter?",
				answer: "No. The converter is web-based and works directly in your browser.",
			},
		],
		"Image Compressor": [
			{
				question: "What image formats can I compress with this tool?",
				answer: "Image Compressor is built for common web image formats including JPEG, PNG, and WebP.",
			},
			{
				question: "Can I resize images while compressing?",
				answer: "Yes. You can reduce file size and adjust dimensions to optimize images for web delivery.",
			},
			{
				question: "Is image processing private?",
				answer: "Yes. Images are processed locally in your browser and are not uploaded to AbiTechPros servers.",
			},
			{
				question: "When should I use Image Compressor?",
				answer: "Use it before publishing images to improve page speed, reduce bandwidth usage, and improve user experience.",
			},
		],
		"JSON Formatter": [
			{
				question: "Can JSON Formatter validate malformed JSON?",
				answer: "Yes. It validates JSON input and highlights parse issues so you can quickly identify invalid structures.",
			},
			{
				question: "Can I prettify and minify JSON in one tool?",
				answer: "Yes. You can switch between formatted output and minified JSON depending on your use case.",
			},
			{
				question: "Is this tool useful for API development and debugging?",
				answer: "Yes. It is useful for inspecting API payloads, formatting responses, and validating request/response bodies.",
			},
			{
				question: "Does JSON data stay in my browser?",
				answer: "Yes. Formatting and validation happen client-side without server-side storage.",
			},
		],
		"Timestamp Converter": [
			{
				question: "What timestamp formats does this converter support?",
				answer: "It supports Unix timestamps in seconds and milliseconds, plus conversions to common date/time formats like ISO 8601.",
			},
			{
				question: "Can I convert both timestamp-to-date and date-to-timestamp?",
				answer: "Yes. The tool supports conversion in both directions.",
			},
			{
				question: "Is this useful for backend and log debugging?",
				answer: "Yes. It helps decode timestamps from logs, APIs, and database records during development and troubleshooting.",
			},
			{
				question: "Does the tool include a live time reference?",
				answer: "Yes. It includes a live clock to help compare current time with converted values.",
			},
		],
		"UUID Generator": [
			{
				question: "Which UUID versions can I generate here?",
				answer: "The tool supports generating UUID v4 and UUID v7 values.",
			},
			{
				question: "Can I create UUIDs in bulk?",
				answer: "Yes. UUID Generator supports batch creation so you can generate multiple IDs in one run.",
			},
			{
				question: "Can I inspect an existing UUID?",
				answer: "Yes. You can parse existing UUIDs to inspect version and structure details.",
			},
			{
				question: "When should I use UUID v7 instead of v4?",
				answer: "Use v7 when you want time-ordered identifiers that are easier to sort, and v4 when you only need random identifiers.",
			},
		],
	};

	if (specificFaqByTool[name]) {
		return specificFaqByTool[name];
	}

	return [
		{
			question: `What is ${name} used for?`,
			answer: description,
		},
		{
			question: `Is ${name} free to use?`,
			answer: `${name} is available as a free browser-based tool on AbiTechPros with no sign-up required.`,
		},
		{
			question: `Do I need to install anything to use ${name}?`,
			answer: `No. ${name} runs directly in your browser, so you can use it without installing software or extensions.`,
		},
		{
			question: `Can I use ${name} on mobile and desktop?`,
			answer: `Yes. ${name} is available on the web and can be used on modern desktop and mobile browsers.`,
		},
	];
}

export function getToolsPageFaqItems() {
	return [
		{
			question: "Are the AbiTechPros tools free to use?",
			answer: "Yes. The developer tools on AbiTechPros are free to use directly in your browser with no sign-up required.",
		},
		{
			question: "Do I need to install anything to use these tools?",
			answer: "No. AbiTechPros tools are browser-based, so you can use them without installing desktop software or browser extensions.",
		},
		{
			question: "What kinds of tools are available on AbiTechPros?",
			answer: "AbiTechPros includes utilities such as password generators, JSON formatters, QR code generators, image tools, converters, and other developer-focused helpers.",
		},
	];
}

export function createToolStructuredData({ name, description, url, applicationCategory }) {
	const faqItems = getToolFaqItems({ name, description });

	return [
		{
			"@context": "https://schema.org",
			"@type": "WebApplication",
			name,
			description,
			url,
			applicationCategory,
			operatingSystem: "Any",
			offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
		},
		{
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: [
				{ "@type": "ListItem", position: 1, name: "Home", item: "https://abitechpros.com" },
				{ "@type": "ListItem", position: 2, name: "Tools", item: "https://abitechpros.com/tools" },
				{ "@type": "ListItem", position: 3, name, item: url },
			],
		},
		createFaqPageSchema(faqItems),
	];
}

export function createToolsPageFaqSchema() {
	return createFaqPageSchema(getToolsPageFaqItems());
}
