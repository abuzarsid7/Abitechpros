# Tool Template Reference

This folder is the source-of-truth scaffold for creating new tools in this project.

## What this template includes

- page.jsx: interactive tool UI and logic (client component)
- layout.jsx: metadata, JSON-LD schema, FAQ, and related tools wiring
- [variation]/page.jsx: SEO variation route pattern used by existing tools

## Create a new tool

1. Duplicate this folder.

```bash
cp -r src/app/tools/_template src/app/tools/your-tool-slug
```

2. Update route files in the new folder.
- Edit page.jsx for tool logic and UI.
- Edit layout.jsx constants: NAME, TITLE, DESCRIPTION, URL.
- Edit [variation]/page.jsx and replace TEMPLATE_TOOL_ID.

3. Register the tool card and routing metadata.
- Add a new item in src/data/tools.js.
- Required fields: id, title, description, href, icon, category, relatedIds.

4. Add supported variation slugs.
- Add entries in src/lib/toolVariations.js under TOOL_VARIATIONS_BY_TOOL["your-tool-slug"].

5. Optional validation.
- Confirm the tool appears on /tools.
- Confirm /tools/your-tool-slug renders page, metadata, FAQ, and related tools.
- Confirm /tools/your-tool-slug/<variation> resolves only for listed variation slugs.

## Current architecture notes

- Shared shell: src/components/tools/ToolLayout.jsx
- Shared sections: ToolSection, ToolLabel, ToolActions, ToolCopyButton
- Analytics hook: useToolAnalytics from src/hooks
- Route SEO helpers: createToolStructuredData and getToolFaqItems in src/lib/seo
- Related links source: getRelatedTools in src/data/tools.js

## Recommended implementation pattern in page.jsx

1. Keep page.jsx focused on tool logic and interaction.
2. Keep SEO and footer sections in layout.jsx.
3. Track key actions with useToolAnalytics.
4. Add an "About" section when the tool needs context or usage guidance.
5. Prefer browser-only processing for privacy-first tooling.
