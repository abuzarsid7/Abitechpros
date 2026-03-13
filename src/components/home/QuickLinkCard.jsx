import Link from "next/link";

export default function QuickLinkCard({ icon, title, body, href, cta, external = false }) {
	if (external) {
		return (
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className="group flex flex-col gap-3 rounded-xl border border-line bg-surface p-5 transition-colors hover:border-ink hover:bg-subtle"
			>
				<span className="text-2xl">{icon}</span>
				<div>
					<h3 className="text-sm font-semibold text-ink">{title}</h3>
					<p className="mt-1 text-xs text-faint leading-relaxed">{body}</p>
				</div>
				<span className="mt-auto text-xs font-medium text-dim group-hover:text-ink transition-colors">
					{cta} →
				</span>
			</a>
		);
	}

	return (
		<Link
			href={href}
			className="group flex flex-col gap-3 rounded-xl border border-line bg-surface p-5 transition-colors hover:border-ink hover:bg-subtle"
		>
			<span className="text-2xl">{icon}</span>
			<div>
				<h3 className="text-sm font-semibold text-ink">{title}</h3>
				<p className="mt-1 text-xs text-faint leading-relaxed">{body}</p>
			</div>
			<span className="mt-auto text-xs font-medium text-dim group-hover:text-ink transition-colors">
				{cta} →
			</span>
		</Link>
	);
}