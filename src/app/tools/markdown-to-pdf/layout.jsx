import JsonLd from "@/components/JsonLd";
import RelatedToolsSection from "@/components/tools/RelatedToolsSection";
import FaqSection from "@/components/ui/FaqSection";
import { createToolStructuredData } from "@/lib/seo";
import { getToolFaqItems } from "@/lib/seo";

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
