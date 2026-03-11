export async function getPosts() {
  const query = `
  query {
    publication(host: "blog.abitechpros.com") {
      posts(first: 20) {
        edges {
          node {
            title
            brief
            slug
            publishedAt
            coverImage {
              url
            }
          }
        }
      }
    }
  }`;

  const res = await fetch("https://gql.hashnode.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 }
  });

  const data = await res.json();

  return data.data.publication.posts.edges;
}
export async function getPost(slug) {

  const query = `
  query {
    publication(host: "blog.abitechpros.com") {
      post(slug: "${slug}") {
        title
        publishedAt
        coverImage {
          url
        }
        content {
          html
        }
      }
    }
  }
  `;

  const res = await fetch("https://gql.hashnode.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 }
  });

  const data = await res.json();

  return data.data.publication.post;
}