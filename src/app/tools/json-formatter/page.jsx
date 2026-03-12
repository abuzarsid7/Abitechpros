"use client";

import ToolLayout from "@/components/tools/ToolLayout";
import ToolSection from "@/components/tools/ToolSection";

export default function JsonFormatterPage() {
  return (
    <ToolLayout
      title="JSON Formatter"
      description="Format, validate, and beautify JSON data instantly."
    >
      <ToolSection noBorder title="Coming Soon">
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
          <span className="text-5xl">{"{ }"}</span>
          <h2 className="text-xl font-semibold text-ink">Coming Soon</h2>
          <p className="max-w-md text-dim">
            The JSON Formatter tool is currently under development. Check back
            soon for JSON formatting, validation, and minification.
          </p>
        </div>
      </ToolSection>
    </ToolLayout>
  );
}
