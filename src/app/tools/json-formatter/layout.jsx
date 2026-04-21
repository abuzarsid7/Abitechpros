import RelatedToolsSection from "@/components/tools/RelatedToolsSection";

const DESCRIPTION = "Format, validate, and minify JSON.";
const TITLE = "JSON Formatter";
const URL = "https://abitechpros.com/tools/json-formatter";

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
