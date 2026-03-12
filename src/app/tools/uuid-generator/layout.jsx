import JsonLd from "@/components/JsonLd";

const DESCRIPTION = "Generate RFC 9562–compliant UUIDs online. Supports v4 (random) and v7 (timestamp-sortable). Batch generate up to 50, parse existing UUIDs, and copy instantly. Free, no sign-up.";
const TITLE = "UUID Generator – v4 & v7 Free Online";
const URL = "https://abitechpros.com/tools/uuid-generator";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["uuid generator", "uuid v4 generator online", "uuid v7 generator", "generate uuid free", "random uuid online", "guid generator", "bulk uuid generator"],
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "AbiTechPros",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const NAME = "UUID Generator";

export default function Layout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: NAME,
            description: DESCRIPTION,
            url: URL,
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://abitechpros.com" },
              { "@type": "ListItem", position: 2, name: "Tools", item: "https://abitechpros.com/tools" },
              { "@type": "ListItem", position: 3, name: NAME, item: URL },
            ],
          },
        ]}
      />
      {children}
    </>
  );
}
