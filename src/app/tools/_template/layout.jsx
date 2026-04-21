import RelatedToolsSection from "@/components/tools/RelatedToolsSection";

export const dynamic = "force-static";

/**
 * Layout template for a single tool route.
 * Keep route metadata and related tools here so the tool page component stays focused on interactive logic.
 */

const NAME = "Tool Template";
const TITLE = "Tool Template";
const DESCRIPTION = "Template route showing how to structure metadata and related links for tools.";
const URL = "https://abitechpros.com/tools/_template";

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
