import { getPosts } from "@/lib/hashnode";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Blog | AbiTechPros",
  description: "Articles, guides, and tips for developers.",
};

export default async function BlogPage() {
  let posts = [];
  try {
    posts = await getPosts();
  } catch (e) {
    console.error("Failed to fetch blog posts:", e);
  }

  return (
    <main className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-ink mb-2">Blog</h1>
        <p className="text-faint mb-10">Articles, guides, and tips for developers.</p>

        {posts.length === 0 ? (
          <p className="text-faint">No posts found.</p>
        ) : (
          <div className="grid gap-8">
            {posts.map(({ node }) => (
              <article key={node.slug} className="flex gap-6 border border-line rounded-xl p-5 bg-surface hover:shadow-sm transition-shadow">
                {node.coverImage?.url && (
                  <div className="shrink-0 hidden sm:block">
                    <img
                      src={node.coverImage.url}
                      alt={node.title}
                      width={120}
                      height={80}
                      className="rounded-lg object-cover w-[120px] h-[80px]"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <time className="text-xs text-faint">
                    {new Date(node.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h2 className="text-lg font-semibold text-ink leading-snug">{node.title}</h2>
                  <p className="text-sm text-faint line-clamp-2">{node.brief}</p>
                  <Link
                    href={`/blog/${node.slug}`}
                    className="mt-1 text-sm font-medium text-blue-600 hover:underline w-fit"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}