import RelatedToolsSection from "@/components/tools/RelatedToolsSection";

const DESCRIPTION = "Convert colors between HEX, RGB, HSL, CMYK, and HSB formats.";
const TITLE = "Color Converter";
const URL = "https://abitechpros.com/tools/color-converter";

export const dynamic = "force-static";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
};

export default function Layout({ children }) {
  return (
    <>
      {children}
      <RelatedToolsSection currentUrl={URL} />
    </>
  );
}
