import { getPosts } from "@/lib/hashnode";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1>Blog</h1>

      {posts.map(({ node }) => (
        <div key={node.slug}>
          <h2>{node.title}</h2>
          <p>{node.brief}</p>

          <Link href={`/blog/${node.slug}`}>
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
}
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);

  return {
    title: post.title
  };
}