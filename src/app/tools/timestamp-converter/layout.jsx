import RelatedToolsSection from "@/components/tools/RelatedToolsSection";

const DESCRIPTION = "Convert Unix timestamps to readable dates and back.";
const TITLE = "Timestamp Converter";
const URL = "https://abitechpros.com/tools/timestamp-converter";

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
