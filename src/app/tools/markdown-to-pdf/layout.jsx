import RelatedToolsSection from "@/components/tools/RelatedToolsSection";

const DESCRIPTION = "Convert Markdown to a PDF in one click.";
const TITLE = "Markdown to PDF";
const URL = "https://abitechpros.com/tools/markdown-to-pdf";

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
