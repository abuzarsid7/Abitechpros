import JsonLd from "@/components/JsonLd";
import RelatedToolsSection from "@/components/tools/RelatedToolsSection";
import FaqSection from "@/components/ui/FaqSection";
import { createToolStructuredData } from "@/lib/seo";
import { getToolFaqItems } from "@/lib/seo";

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
const FAQ_ITEMS = getToolFaqItems({ name: NAME, description: DESCRIPTION });

export default function Layout({ children }) {
  return (
    <>
      <JsonLd data={createToolStructuredData({ name: NAME, description: DESCRIPTION, url: URL, applicationCategory: "DesignApplication" })} />
      {children}
      <FaqSection title={`${NAME} FAQ`} items={FAQ_ITEMS} />
      <RelatedToolsSection currentUrl={URL} />
    </>
  );
}
