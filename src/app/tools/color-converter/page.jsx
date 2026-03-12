"use client";

import ToolLayout from "@/components/tools/ToolLayout";
import ToolSection from "@/components/tools/ToolSection";

export default function ColorConverterPage() {
  return (
    <ToolLayout
      title="Color Converter"
      description="Convert colors between HEX, RGB, HSL, and more formats."
    >
      <ToolSection noBorder title="Coming Soon">
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
          <span className="text-5xl">🎨</span>
          <h2 className="text-xl font-semibold text-ink">Coming Soon</h2>
          <p className="max-w-md text-dim">
            The Color Converter tool is currently under development. Check back
            soon for HEX, RGB, HSL, and more color format conversions.
          </p>
        </div>
      </ToolSection>
    </ToolLayout>
  );
}
