import RelatedToolsSection from "@/components/tools/RelatedToolsSection";

const DESCRIPTION = "Compress and resize JPEG, PNG, and WebP images directly in your browser.";
const TITLE = "Image Compressor";
const URL = "https://abitechpros.com/tools/image-compressor";

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
