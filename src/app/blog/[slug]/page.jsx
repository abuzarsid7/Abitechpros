import { getPost, getPosts } from "@/lib/hashnode";
import { notFound } from "next/navigation";

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
    <main className="py-12">
      <article className="max-w-3xl mx-auto px-4">
        <header className="mb-8">
          <time className="text-xs text-faint">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="text-3xl font-bold text-ink mt-2 mb-4 leading-tight">
            {post.title}
          </h1>
          {post.coverImage?.url && (
            <img
              src={post.coverImage.url}
              alt={post.title}
              className="w-full rounded-xl object-cover max-h-80"
            />
          )}
        </header>

        <div
          className="prose prose-neutral dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content.html }}
        />
      </article>
    </main>
  );
}
