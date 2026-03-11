import { getPost } from "@/lib/hashnode";

export default async function BlogPost({ params }) {

  const post = await getPost(params.slug);

  return (
    <article>

      <h1>{post.title}</h1>

      {post.coverImage && (
        <img src={post.coverImage.url} />
      )}

      <div
        dangerouslySetInnerHTML={{
          __html: post.content.html
        }}
      />

    </article>
  );
}