const BASE_URL = "https://abitechpros.com";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/", "/api/", "/tools/_template"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
