import Container from "@/components/layout/Container";
import QuickLinkCard from "@/components/home/QuickLinkCard";

const QUICK_LINKS = [
	{
		icon: "🛠️",
		title: "All Tools",
		body: "Browse every utility we offer, organised by category.",
		href: "/tools",
		cta: "Explore",
	},
	{
		icon: "📝",
		title: "Blog",
		body: "Articles, guides, and tips for developers.",
		href: "/blog",
		cta: "Read articles",
	},
	{
		icon: "👋",
		title: "About",
		body: "Learn about AbiTechPros and what we're building.",
		href: "/about",
		cta: "Learn more",
	},
];

export default function QuickLinksStrip() {
	return (
		<section className="border-t border-line py-12">
			<Container size="lg">
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
					{QUICK_LINKS.map((link) => (
						<QuickLinkCard
							key={link.href}
							icon={link.icon}
							title={link.title}
							body={link.body}
							href={link.href}
							cta={link.cta}
							external={link.external}
						/>
					))}
				</div>
			</Container>
		</section>
	);
}