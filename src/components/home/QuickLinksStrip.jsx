import Container from "@/components/layout/Container";
import QuickLinkCard from "@/components/home/QuickLinkCard";
import { homePageContent } from "@/data/homePage";

export default function QuickLinksStrip() {
	return (
		<section className="border-t border-line py-12">
			<Container size="lg">
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
					{homePageContent.quickLinks.map((link) => (
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