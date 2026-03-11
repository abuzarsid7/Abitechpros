import { tools } from "@/data/tools";
import { getPosts } from "@/lib/hashnode";

const BASE_URL = "https://abitechpros.com";

const staticRoutes = [
  { url: `${BASE_URL}/`,        lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
  { url: `${BASE_URL}/about`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/blog`,    lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
  { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/tools`,   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
];

const toolRoutes = tools.map((tool) => ({
  url: `${BASE_URL}${tool.href}`,
  lastModified: new Date(),
  changeFrequency: "monthly",
  priority: 0.8,
}));

export default async function sitemap() {
  // Fetch all blog posts and map to sitemap entries
  let blogRoutes = [];
  try {
    const posts = await getPosts();
    blogRoutes = posts.map(({ node }) => ({
      url: `${BASE_URL}/blog/${node.slug}`,
      lastModified: node.publishedAt ? new Date(node.publishedAt) : new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch {
    // If the Hashnode API is unavailable at build time, skip blog posts
  }

  return [...staticRoutes, ...toolRoutes, ...blogRoutes];
}
