import JsonLd from "@/components/JsonLd";
import RelatedToolsSection from "@/components/tools/RelatedToolsSection";
import FaqSection from "@/components/ui/FaqSection";
import { createToolStructuredData } from "@/lib/seo";
import { getToolFaqItems } from "@/lib/seo";

const DESCRIPTION = "Compress and resize JPEG, PNG, and WebP images directly in your browser. No uploads, no servers — reduce image file size privately and for free.";
const TITLE = "Free Image Compressor & Resizer Online";
const URL = "https://abitechpros.com/tools/image-compressor";

export const dynamic = "force-static";

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
const FAQ_ITEMS = getToolFaqItems({ name: NAME, description: DESCRIPTION });

export default function Layout({ children }) {
  return (
    <>
      <JsonLd data={createToolStructuredData({ name: NAME, description: DESCRIPTION, url: URL, applicationCategory: "MultimediaApplication" })} />
      {children}
      <FaqSection title={`${NAME} FAQ`} items={FAQ_ITEMS} />
      <RelatedToolsSection currentUrl={URL} />
    </>
  );
}
