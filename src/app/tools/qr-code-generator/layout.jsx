import RelatedToolsSection from "@/components/tools/RelatedToolsSection";

const DESCRIPTION = "Turn any URL, text, email, or phone number into a scannable QR code.";
const TITLE = "QR Code Generator";
const URL = "https://abitechpros.com/tools/qr-code-generator";

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
