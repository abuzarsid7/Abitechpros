import JsonLd from "@/components/JsonLd";

const DESCRIPTION = "Convert Markdown to a beautifully formatted PDF in one click. Free, browser-based Markdown to PDF converter — no sign-up required.";
const TITLE = "Markdown to PDF Converter Online";
const URL = "https://abitechpros.com/tools/markdown-to-pdf";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["markdown to pdf", "convert markdown to pdf", "md to pdf online", "markdown converter free", "markdown pdf export"],
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

const NAME = "Markdown to PDF";

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
