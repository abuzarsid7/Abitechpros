import Container from "@/components/layout/Container";
import ToolCard from "@/components/tools/ToolCard";
import Link from "next/link";
import { getRelatedTools, getToolByHref } from "@/data/tools";

function getPathname(urlOrPath) {
	if (!urlOrPath) return "";
	if (urlOrPath.startsWith("/")) return urlOrPath;

	try {
		return new URL(urlOrPath).pathname;
	} catch {
		return urlOrPath;
	}
}

export default function RelatedToolsSection({ currentUrl, limit = 3, size = "md" }) {
	const currentPath = getPathname(currentUrl);
	const currentTool = getToolByHref(currentPath);

	if (!currentTool) return null;

	const relatedTools = getRelatedTools(currentTool, limit);

	if (!relatedTools.length) return null;

	const inlineLinks = relatedTools.slice(0, 3);

	return (
		<Container size={size} as="section" className="py-12">
			<div className="rounded-xl border border-line bg-surface p-5 sm:p-6">
				<div className="mb-6">
					<h2 className="text-xl font-bold text-ink">Related Tools</h2>
					<p className="mt-2 text-sm text-faint max-w-prose">
						If you're using {currentTool.title}, you may also want{" "}
						{inlineLinks.map((tool, index) => (
							<span key={tool.id}>
								{index > 0 ? (index === inlineLinks.length - 1 ? " and " : ", ") : ""}
								<Link href={tool.href} className="text-ink underline underline-offset-2 hover:no-underline">
									{tool.title}
								</Link>
							</span>
						))}
						 to keep your workflow moving.
					</p>
				</div>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{relatedTools.map((tool) => (
						<ToolCard
							key={tool.id}
							title={tool.title}
							description={tool.description}
							href={tool.href}
							icon={tool.icon}
							badge={tool.badge}
						/>
					))}
				</div>
			</div>
		</Container>
	);
}