import { getPost, getPosts } from "@/lib/hashnode";
import { notFound } from "next/navigation";
import Link from "next/link";
import BlogPostHeader from "@/components/blog/BlogPostHeader";
import BlogPostContent from "@/components/blog/BlogPostContent";
import JsonLd from "@/components/JsonLd";

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
      alternates: { canonical: `https://abitechpros.com/blog/${params.slug}` },
      keywords: post.tags?.length
        ? post.tags.map((t) => t.name)
        : ["tech blog", "developer articles", "AbiTechPros", "programming"],
      openGraph: {
        title: `${post.title} | AbiTechPros Blog`,
        description: post.brief ?? "",
        url: `https://abitechpros.com/blog/${params.slug}`,
        siteName: "AbiTechPros",
        type: "article",
        ...(post.coverImage?.url ? { images: [{ url: post.coverImage.url }] } : {}),
      },
      twitter: {
        card: post.coverImage?.url ? "summary_large_image" : "summary",
        title: `${post.title} | AbiTechPros Blog`,
        description: post.brief ?? "",
        ...(post.coverImage?.url ? { images: [post.coverImage.url] } : {}),
      },
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
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.brief ?? "",
            url: `https://abitechpros.com/blog/${params.slug}`,
            ...(post.coverImage?.url ? { image: post.coverImage.url } : {}),
            datePublished: post.publishedAt,
            author: { "@type": "Organization", name: "AbiTechPros" },
            publisher: {
              "@type": "Organization",
              name: "AbiTechPros",
              logo: { "@type": "ImageObject", url: "https://abitechpros.com/icons/logo.png" },
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://abitechpros.com" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://abitechpros.com/blog" },
              { "@type": "ListItem", position: 3, name: post.title, item: `https://abitechpros.com/blog/${params.slug}` },
            ],
          },
        ]}
      />
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

