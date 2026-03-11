import ToolLayout from "@/components/tools/ToolLayout";
import ToolSection from "@/components/tools/ToolSection";

export const metadata = {
  title: "Password Generator — AbiTechPros",
};

export default function PasswordGeneratorPage() {
  return (
    <ToolLayout
      title="Password Generator"
      description="Generate strong, secure passwords with customisable length and character sets."
    >
      <ToolSection noBorder>
        <p className="text-sm text-faint">Coming soon.</p>
      </ToolSection>
    </ToolLayout>
  );
}
