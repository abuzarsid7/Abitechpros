"use client";

import ToolLayout from "@/components/tools/ToolLayout";
import ToolSection from "@/components/tools/ToolSection";

export default function TimestampConverterPage() {
  return (
    <ToolLayout
      title="Timestamp Converter"
      description="Convert between Unix timestamps, ISO 8601, and human-readable dates."
    >
      <ToolSection noBorder title="Coming Soon">
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
          <span className="text-5xl">⏱️</span>
          <h2 className="text-xl font-semibold text-ink">Coming Soon</h2>
          <p className="max-w-md text-dim">
            The Timestamp Converter tool is currently under development. Check
            back soon for Unix, ISO 8601, and human-readable date conversions.
          </p>
        </div>
      </ToolSection>
    </ToolLayout>
  );
}
