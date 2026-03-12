import JsonLd from "@/components/JsonLd";

const DESCRIPTION = "Turn any URL, text, email, or phone number into a scannable QR code. Download as PNG or SVG instantly. Customise colours and size. Free, no sign-up.";
const TITLE = "QR Code Generator – Free & Instant";
const URL = "https://abitechpros.com/tools/qr-code-generator";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["qr code generator", "free qr code generator", "create qr code online", "qr code maker free", "qr code download png svg", "custom qr code"],
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

const NAME = "QR Code Generator";

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
