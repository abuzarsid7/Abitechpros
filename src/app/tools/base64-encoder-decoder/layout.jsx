import JsonLd from "@/components/JsonLd";

const DESCRIPTION = "Encode plain text to Base64 or decode Base64 strings back to text online. Full Unicode support via TextEncoder. Free, instant, runs entirely in your browser — nothing is sent to a server.";
const TITLE = "Base64 Encode & Decode Online";
const URL = "https://abitechpros.com/tools/base64-encoder-decoder";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["base64 encoder", "base64 decoder", "encode base64 online", "decode base64 string", "base64 converter online", "base64 to text", "text to base64"],
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

const NAME = "Base64 Encoder / Decoder";

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
