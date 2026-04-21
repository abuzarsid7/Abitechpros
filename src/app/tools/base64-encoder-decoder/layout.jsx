import RelatedToolsSection from "@/components/tools/RelatedToolsSection";

const DESCRIPTION = "Encode plain text to Base64 or decode Base64 strings back to text.";
const TITLE = "Base64 Encoder / Decoder";
const URL = "https://abitechpros.com/tools/base64-encoder-decoder";

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
