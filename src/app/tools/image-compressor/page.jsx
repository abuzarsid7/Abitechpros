"use client";

import ToolLayout from "@/components/tools/ToolLayout";
import ToolSection from "@/components/tools/ToolSection";

export default function ImageCompressorPage() {
  return (
    <ToolLayout
      title="Image Compressor"
      description="Compress and optimise images without losing quality."
    >
      <ToolSection noBorder title="Coming Soon">
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
          <span className="text-5xl">🖼️</span>
          <h2 className="text-xl font-semibold text-ink">Coming Soon</h2>
          <p className="max-w-md text-dim">
            The Image Compressor tool is currently under development. Check back
            soon for drag-and-drop image compression.
          </p>
        </div>
      </ToolSection>
    </ToolLayout>
  );
}
