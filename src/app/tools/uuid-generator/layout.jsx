import JsonLd from "@/components/JsonLd";
import RelatedToolsSection from "@/components/tools/RelatedToolsSection";
import FaqSection from "@/components/ui/FaqSection";
import { createToolStructuredData } from "@/lib/seo";
import { getToolFaqItems } from "@/lib/seo";

const DESCRIPTION = "Generate RFC 9562–compliant UUIDs online. Supports v4 (random) and v7 (timestamp-sortable). Batch generate up to 50, parse existing UUIDs, and copy instantly. Free, no sign-up.";
const TITLE = "UUID Generator – v4 & v7 Free Online";
const URL = "https://abitechpros.com/tools/uuid-generator";

export const dynamic = "force-static";

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
