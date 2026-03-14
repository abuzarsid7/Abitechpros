import JsonLd from "@/components/JsonLd";
import RelatedToolsSection from "@/components/tools/RelatedToolsSection";
import FaqSection from "@/components/ui/FaqSection";
import { createToolStructuredData, getToolFaqItems } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * Layout template for a single tool route.
 *
 * Keep route metadata, FAQ, related tools, and schema here so the tool page
 * component stays focused on interactive logic.
 */

const NAME = "Tool Template";
const TITLE = "Tool Template | AbiTechPros";
const DESCRIPTION =
  "Template route showing how to structure metadata, schema, FAQ, and related links for tools.";
const URL = "https://abitechpros.com/tools/_template";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["tool template", "developer tool", "online tool"],
  alternates: { canonical: URL },
  robots: { index: false, follow: false },
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

const FAQ_ITEMS = getToolFaqItems({ name: NAME, description: DESCRIPTION });

export default function Layout({ children }) {
  return (
    <>
      <JsonLd
        data={createToolStructuredData({
          name: NAME,
          description: DESCRIPTION,
          url: URL,
          applicationCategory: "DeveloperApplication",
        })}
      />
      {children}
      <FaqSection title={`${NAME} FAQ`} items={FAQ_ITEMS} />
      <RelatedToolsSection currentUrl={URL} />
    </>
  );
}
