import ToolLayout from "@/components/tools/ToolLayout";
import ToolSection from "@/components/tools/ToolSection";

export const metadata = {
  title: "Text Counter — AbiTechPros",
};

export default function TextCounterPage() {
  return (
    <ToolLayout
      title="Text Counter"
      description="Count characters, words, sentences, and paragraphs in any block of text."
    >
      <ToolSection noBorder>
        <p className="text-sm text-faint">Coming soon.</p>
      </ToolSection>
    </ToolLayout>
  );
}
