import { getPost, getPosts } from "@/lib/hashnode";
import { notFound } from "next/navigation";
import Link from "next/link";
import BlogPostHeader from "@/components/blog/BlogPostHeader";
import BlogPostContent from "@/components/blog/BlogPostContent";

export const revalidate = 3600;

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
      title: post.title,
      description: post.brief ?? "",
    };
  } catch {
    return { title: "Blog" };
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
          className="inline-flex items-center gap-1.5 text-sm text-faint hover:text-ink transition-colors mb-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to blog
        </Link>

        {/* Header: cover image, tags, title, brief, author, meta */}
        <BlogPostHeader post={post} />

        {/* Body content */}
        <BlogPostContent html={post.content?.html} />

        {/* Footer nav */}
        <div className="mt-16 pt-6 border-t border-line">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-faint hover:text-ink transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            All posts
          </Link>
        </div>
      </article>
    </main>
  );
}

