import { getPosts } from "@/lib/hashnode";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

const BLOG_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "AbiTechPros Blog",
    description: "Articles, guides, and tips for developers.",
    url: "https://abitechpros.com/blog",
    publisher: { "@type": "Organization", name: "AbiTechPros", url: "https://abitechpros.com" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://abitechpros.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://abitechpros.com/blog" },
    ],
  },
];

export const metadata = {
  title: "Blog | AbiTechPros",
  description: "Articles, guides, and tips for developers.",
  alternates: { canonical: "https://abitechpros.com/blog" },
};

export default async function BlogPage() {
  let posts = [];
  try {
    posts = await getPosts();
  } catch (e) {
    console.error("Failed to fetch blog posts:", e);
  }

  return (
    <main className="py-14">
      <JsonLd data={BLOG_SCHEMA} />
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-ink">Blog</h1>
          <p className="mt-2 text-base text-faint">Articles, guides, and tips for developers.</p>
        </div>

        {posts.length === 0 ? (
          <p className="text-faint">No posts found.</p>
        ) : (
          <div className="flex flex-col divide-y divide-line">
            {posts.map(({ node }) => (
              <Link
                key={node.slug}
                href={`/blog/${node.slug}`}
                className="group flex flex-col sm:flex-row gap-5 py-7 first:pt-0 last:pb-0 hover:bg-transparent focus-visible:outline-none"
              >
                {/* Cover image — visible on all screen sizes */}
                {node.coverImage?.url && (
                  <div className="w-full sm:w-[180px] sm:shrink-0">
                    <img
                      src={node.coverImage.url}
                      alt={node.title}
                      className="w-full h-44 sm:h-[115px] object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-col justify-between gap-2 min-w-0">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-xs text-faint">
                      <time>
                        {new Date(node.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                      {node.readTimeInMinutes && (
                        <>
                          <span aria-hidden>·</span>
                          <span>{node.readTimeInMinutes} min read</span>
                        </>
                      )}
                    </div>
                    <h2 className="text-base font-semibold text-ink leading-snug group-hover:text-blue-600 transition-colors">
                      {node.title}
                    </h2>
                    <p className="text-sm text-faint line-clamp-2 leading-relaxed">{node.brief}</p>
                  </div>
                  <span className="text-xs font-medium text-blue-600 group-hover:underline w-fit mt-1">
                    Read more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}