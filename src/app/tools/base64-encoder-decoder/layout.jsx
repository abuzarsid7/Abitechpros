import JsonLd from "@/components/JsonLd";
import RelatedToolsSection from "@/components/tools/RelatedToolsSection";
import FaqSection from "@/components/ui/FaqSection";
import { createToolStructuredData } from "@/lib/seo";
import { getToolFaqItems } from "@/lib/seo";

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
const FAQ_ITEMS = getToolFaqItems({ name: NAME, description: DESCRIPTION });

export default function Layout({ children }) {
  return (
    <>
      <JsonLd data={createToolStructuredData({ name: NAME, description: DESCRIPTION, url: URL, applicationCategory: "DeveloperApplication" })} />
      {children}
      <FaqSection title={`${NAME} FAQ`} items={FAQ_ITEMS} />
      <RelatedToolsSection currentUrl={URL} />
    </>
  );
}
