"use client";

import ToolLayout from "@/components/tools/ToolLayout";
import ToolSection from "@/components/tools/ToolSection";

export default function UuidGeneratorPage() {
  return (
    <ToolLayout
      title="UUID Generator"
      description="Generate universally unique identifiers (UUIDs) instantly."
    >
      <ToolSection noBorder title="Coming Soon">
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
          <span className="text-5xl">🆔</span>
          <h2 className="text-xl font-semibold text-ink">Coming Soon</h2>
          <p className="max-w-md text-dim">
            The UUID Generator tool is currently under development. Check back
            soon for v4, v7, and other UUID format generation.
          </p>
        </div>
      </ToolSection>
    </ToolLayout>
  );
}
