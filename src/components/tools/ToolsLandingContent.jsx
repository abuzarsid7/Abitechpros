import Link from "next/link";
import { categoryToSlug } from "@/data/tools";

function formatCategoryDescription(category) {
	switch (category) {
		case "Developer":
			return "Format data, generate identifiers, and convert timestamps for everyday engineering work.";
		case "Text":
			return "Work with word counts, encoded strings, and other text-processing tasks in the browser.";
		case "Security":
			return "Generate safer credentials and reduce repetitive security-related setup work.";
		case "Design":
			return "Convert and inspect visual values quickly while building interfaces and assets.";
		case "Media":
			return "Optimize images for performance without leaving the browser or uploading private files.";
		case "Document":
			return "Turn draft content into shareable formats for documentation and lightweight publishing.";
		case "Utility":
			return "Handle common workflow tasks that are useful across development, product, and operations work.";
		default:
			return "Useful browser-based helpers for common digital workflows.";
	}
}

export default function ToolsLandingContent({ tools, categories }) {
	const featuredLinks = tools.slice(0, 6);

	return (
		<div className="mt-14 space-y-14">
			<section className="max-w-3xl">
				<h2 className="text-2xl font-bold text-ink">Free online developer tools for everyday work</h2>
				<div className="mt-4 space-y-4 text-sm leading-relaxed text-faint">
					<p>
						AbiTechPros tools are built for fast, practical tasks that developers, designers, and technical teams run into every day. Instead of installing one-off utilities, you can open a browser tab and immediately format JSON, generate secure passwords, create QR codes, convert timestamps, compress images, or work with text and IDs.
					</p>
					<p>
						The focus of this tools page is speed and clarity. Each utility is designed to solve a narrow problem well, keep the interface simple, and remove unnecessary friction such as downloads, account creation, or server-side processing for common client-side tasks.
					</p>
				</div>
			</section>

			<section>
				<h2 className="text-xl font-bold text-ink">Tool categories</h2>
				<p className="mt-2 max-w-2xl text-sm leading-relaxed text-faint">
					The collection is grouped by category so visitors can quickly find the right type of utility for their workflow.
				</p>
				<div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{categories.map((category) => (
						<Link
							key={category}
							href={`/tools/category/${categoryToSlug(category)}`}
							className="group rounded-xl border border-line bg-surface p-5 transition-colors hover:border-ink hover:bg-subtle"
						>
							<h3 className="text-sm font-semibold text-ink">{category}</h3>
							<p className="mt-2 text-xs leading-relaxed text-faint">
								{formatCategoryDescription(category)}
							</p>
							<span className="mt-4 inline-flex text-xs font-medium text-dim group-hover:text-ink transition-colors">
								Explore {category} tools →
							</span>
						</Link>
					))}
				</div>
			</section>

			<section className="max-w-4xl">
				<h2 className="text-xl font-bold text-ink">Popular utilities on AbiTechPros</h2>
				<p className="mt-2 text-sm leading-relaxed text-faint">
					Some of the most useful tools in this collection include{" "}
					{featuredLinks.map((tool, index) => (
						<span key={tool.id}>
							{index > 0 ? (index === featuredLinks.length - 1 ? " and " : ", ") : ""}
							<Link href={tool.href} className="text-ink underline underline-offset-2 hover:no-underline">
								{tool.title}
							</Link>
						</span>
					))}
					. These pages are connected through internal links so users can move between related tasks without having to return to the main tools index each time.
				</p>
			</section>

			<section className="max-w-3xl">
				<h2 className="text-xl font-bold text-ink">Why browser-based tools matter</h2>
				<div className="mt-3 space-y-4 text-sm leading-relaxed text-faint">
					<p>
						Browser-based tools are useful because they remove setup time. When you only need to validate JSON once, generate a UUID batch, convert a color value, or compress an image for a specific task, opening a fast landing page is often more efficient than installing and configuring another local utility.
					</p>
					<p>
						AbiTechPros is organized around that use case. The tools page acts as a landing page for visitors searching for practical online developer tools, and each individual tool page is designed to go deeper on a single task with its own metadata, structured data, FAQ content, and related internal links.
					</p>
				</div>
			</section>
		</div>
	);
}