import JsonLd from "@/components/JsonLd";

const DESCRIPTION = "Compress and resize JPEG, PNG, and WebP images directly in your browser. No uploads, no servers — reduce image file size privately and for free.";
const TITLE = "Free Image Compressor & Resizer Online";
const URL = "https://abitechpros.com/tools/image-compressor";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["image compressor online", "compress image free", "reduce image file size", "image resizer online", "compress jpg png webp", "optimize images online"],
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

const NAME = "Image Compressor";

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
            applicationCategory: "MultimediaApplication",
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
