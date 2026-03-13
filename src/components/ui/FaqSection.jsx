import Container from "@/components/layout/Container";

export default function FaqSection({ title = "Frequently asked questions", items = [], size = "md" }) {
	if (!items.length) return null;

	return (
		<Container size={size} as="section" className="py-12">
			<div className="rounded-xl border border-line bg-surface">
				<div className="border-b border-line px-5 py-5 sm:px-6">
					<h2 className="text-xl font-bold text-ink">{title}</h2>
					<p className="mt-2 text-sm text-faint">
						Answers to the most common questions about this page.
					</p>
				</div>
				<div className="divide-y divide-line">
					{items.map(({ question, answer }) => (
						<div key={question} className="px-5 py-5 sm:px-6">
							<h3 className="text-sm font-semibold text-ink">{question}</h3>
							<p className="mt-2 text-sm leading-relaxed text-faint">{answer}</p>
						</div>
					))}
				</div>
			</div>
		</Container>
	);
}