import RelatedToolsSection from "@/components/tools/RelatedToolsSection";

const DESCRIPTION = "Generate UUID v4 and UUID v7 values.";
const TITLE = "UUID Generator";
const URL = "https://abitechpros.com/tools/uuid-generator";

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
