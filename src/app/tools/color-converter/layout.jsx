import JsonLd from "@/components/JsonLd";

const DESCRIPTION = "Convert colors between HEX, RGB, HSL, CMYK, and HSB formats instantly with a live colour preview. Free online colour converter — no sign-up needed.";
const TITLE = "Color Converter – HEX, RGB, HSL & CMYK";
const URL = "https://abitechpros.com/tools/color-converter";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["color converter", "hex to rgb converter", "rgb to hsl", "hex color converter online", "cmyk to rgb", "color format converter", "color picker converter"],
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

const NAME = "Color Converter";

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
            applicationCategory: "DesignApplication",
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
