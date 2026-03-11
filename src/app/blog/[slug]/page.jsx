import { getPost, getPosts } from "@/lib/hashnode";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  try {
    const posts = await getPosts();
    return posts.map(({ node }) => ({ slug: node.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  try {
    const post = await getPost(params.slug);
    if (!post) return { title: "Post Not Found" };
    return {
      title: `${post.title} | AbiTechPros Blog`,
      description: post.brief ?? "",
      openGraph: post.coverImage?.url
        ? { images: [{ url: post.coverImage.url }] }
        : undefined,
    };
  } catch {
    return { title: "Blog | AbiTechPros" };
  }
}

export default async function BlogPostPage({ params }) {
  let post;
  try {
    post = await getPost(params.slug);
  } catch (e) {
    console.error("Failed to fetch post:", e);
    notFound();
  }

  if (!post) notFound();

  return (
    <main className="py-14">
      <article className="max-w-2xl mx-auto px-4">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-faint hover:text-ink transition-colors mb-8"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to blog
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-faint mb-3">
          <time>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {post.readTimeInMinutes && (
            <>
              <span aria-hidden>·</span>
              <span>{post.readTimeInMinutes} min read</span>
            </>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-ink leading-tight mb-5">
          {post.title}
        </h1>

        {/* Brief / subtitle */}
        {post.brief && (
          <p className="text-base text-faint leading-relaxed mb-6 border-l-2 border-line pl-4">
            {post.brief}
          </p>
        )}

        {/* Cover image */}
        {post.coverImage?.url && (
          <div className="mb-8 rounded-2xl overflow-hidden">
            <img
              src={post.coverImage.url}
              alt={post.title}
              className="w-full object-cover max-h-96"
            />
          </div>
        )}

        {/* Post content */}
        <div
          className="prose prose-neutral dark:prose-invert prose-headings:font-semibold prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content.html }}
        />

        {/* Footer nav */}
        <div className="mt-12 pt-6 border-t border-line">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-faint hover:text-ink transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            All posts
          </Link>
        </div>
      </article>
    </main>
  );
}
