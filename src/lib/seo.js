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
