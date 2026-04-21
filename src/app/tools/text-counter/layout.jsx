import RelatedToolsSection from "@/components/tools/RelatedToolsSection";

const DESCRIPTION = "Count words, characters, sentences, paragraphs, and reading time from any text instantly.";
const TITLE = "Text Counter";
const URL = "https://abitechpros.com/tools/text-counter";

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
