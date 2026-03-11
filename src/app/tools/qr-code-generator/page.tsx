import ToolLayout from "@/components/tools/ToolLayout";
import ToolSection from "@/components/tools/ToolSection";

export const metadata = {
  title: "QR Code Generator — AbiTechPros",
};

export default function QrCodeGeneratorPage() {
  return (
    <ToolLayout
      title="QR Code Generator"
      description="Turn any URL or text into a scannable QR code you can download instantly."
    >
      <ToolSection noBorder>
        <p className="text-sm text-faint">Coming soon.</p>
      </ToolSection>
    </ToolLayout>
  );
}
