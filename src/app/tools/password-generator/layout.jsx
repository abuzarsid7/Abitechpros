import RelatedToolsSection from "@/components/tools/RelatedToolsSection";

const DESCRIPTION = "Generate strong, secure passwords instantly.";
const TITLE = "Password Generator";
const URL = "https://abitechpros.com/tools/password-generator";

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
