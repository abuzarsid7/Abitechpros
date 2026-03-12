import JsonLd from "@/components/JsonLd";

const DESCRIPTION = "Count words, characters, sentences, paragraphs, and reading time from any text instantly. See top word frequency and character breakdowns. Free, no sign-up.";
const TITLE = "Word & Character Counter Online";
const URL = "https://abitechpros.com/tools/text-counter";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["word counter", "character counter online", "word count tool", "count words and characters", "text analyzer", "reading time calculator"],
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

const NAME = "Word & Character Counter";

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
