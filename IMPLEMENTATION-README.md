# AbiTechPros Implementation README

This document explains how the current site is implemented, how data flows through the app, and what performance optimizations are currently in place.

## 1) Product overview

AbiTechPros is a Next.js App Router site with two primary product surfaces:

- Tools: browser-based utility pages (password generation, JSON formatting, QR, UUID, etc.)
- Blog: article listing and detail pages sourced from Hashnode GraphQL

The app is designed to be mostly static or ISR-rendered for better mobile performance and cache efficiency.

## 2) Tech stack

- Framework: Next.js 15 App Router
- UI runtime: React 19
- Styling: Tailwind CSS v4 with custom CSS variables in src/app/globals.css
- Analytics:
  - Google Analytics (gtag)
  - Vercel Analytics
  - Vercel Speed Insights
- Blog content source: Hashnode GraphQL

Primary scripts (package.json):

- npm run dev
- npm run build
- npm run start
- npm run lint

## 3) High-level architecture

### 3.1 Global shell and app layout

Global app shell is defined in src/app/layout.js.

Responsibilities:

- Loads global styles (src/app/globals.css)
- Applies optimized fonts via next/font/google
  - Inter (body)
  - Fira Code (mono utility font)
- Injects website-level JSON-LD (WebSite + Organization)
- Loads GA scripts lazily
- Wraps pages with ThemeProvider, Navbar, Footer
- Mounts AnalyticsTracker for route-level page_view events

### 3.2 Theme system

Theme behavior is split between:

- Inline script in src/app/layout.js for first-paint dark mode class (prevents flash)
- Context provider in src/components/layout/ThemeProvider.jsx

ThemeProvider:

- Reads localStorage theme preference
- Falls back to system preference
- Toggles .dark class on documentElement

### 3.3 Design tokens

All theme tokens are defined in src/app/globals.css with CSS variables:

- Backgrounds: --base, --surface, --subtle, --muted
- Borders: --line
- Text: --ink, --dim, --faint
- Accent: --accent, --accent-fg

Tailwind v4 @theme inline maps those to utility colors and font token mapping includes monospace stack:

- --font-family-mono uses Fira Code variable from next/font

## 4) Routing model and rendering strategy

### 4.1 Rendering strategy now in production

The site is configured so pages are static whenever possible.

- Force static pages use: export const dynamic = "force-static"
- Data-backed blog pages use: export const revalidate = 3600

### 4.2 Route groups

Core pages:

- / (force-static)
- /about (force-static)
- /contact (force-static)
- /privacy-policy (force-static)

Tools:

- /tools (force-static)
- /tools/category/[categorySlug] (force-static + generateStaticParams)
- /tools/<tool-slug> (force-static layout + client interactive page)
- /tools/<tool-slug>/[variation] (SSG via generateStaticParams)

Blog:

- /blog (ISR, revalidate 3600)
- /blog/[slug] (ISR + SSG paths from Hashnode)

Infra routes:

- /robots.txt (static)
- /sitemap.xml (ISR)

## 5) Tools system (how it works)

### 5.1 Tool registry is the source of truth

src/data/tools.js is the canonical registry for tools.

Each tool entry includes:

- id, title, description, href
- icon, optional badge
- category
- relatedIds

This registry powers:

- /tools listing cards and category grouping
- related tools recommendations
- analytics metadata mapping
- category pages

### 5.2 Tools landing page

src/app/tools/page.jsx:

- Static page with metadata and JSON-LD
- Uses Suspense around ToolSearchGrid
- ToolSearchGrid reads URL query client-side via useSearchParams

Why this matters:

- Parent page stays static
- Search still supports URL query parameter (?q=...)

### 5.3 Tool page composition pattern

Typical tool route structure:

- src/app/tools/<tool>/layout.jsx
- src/app/tools/<tool>/page.jsx
- src/app/tools/<tool>/[variation]/page.jsx

Responsibilities:

- layout.jsx (server): metadata, schema, FAQ section, RelatedToolsSection
- page.jsx (client): interactive state and tool logic
- [variation]/page.jsx (server): SEO variation intro + re-use of main tool UI

### 5.4 Shared tool UI primitives

Used across tool pages from src/components/tools:

- ToolLayout
- ToolSection
- ToolLabel
- ToolActions + ToolButton
- ToolCopyButton
- ToolVariationIntro
- RelatedToolsSection

### 5.5 Tool variations (SEO landing pages)

src/lib/toolVariations.js defines:

- variation slugs/labels by tool
- static params generation for variation routes
- variation metadata generation

Behavior:

- Only listed variations resolve
- Unknown variations return notFound

### 5.6 How to add a new tool

Current implementation pattern:

1. Duplicate template folder:
   - src/app/tools/_template
2. Create real route folder in src/app/tools/<new-slug>
3. Update page.jsx logic and layout.jsx metadata/schema
4. Register tool in src/data/tools.js
5. Add variation slugs in src/lib/toolVariations.js (if needed)
6. Verify /tools listing card appears and variation routes build

Reference template docs are in:

- src/app/tools/_template/README.md

## 6) Blog system (Hashnode)

### 6.1 Data layer

src/lib/hashnode.js provides:

- getPosts()
- getPost(slug)

Both fetch from Hashnode GraphQL and use fetch revalidation:

- next: { revalidate: 3600 }

### 6.2 Blog list page

src/app/blog/page.jsx:

- Revalidates hourly
- Fetches post cards and renders list
- Adds Blog JSON-LD

### 6.3 Blog detail page

src/app/blog/[slug]/page.jsx:

- Revalidates hourly
- generateStaticParams uses getPosts for prebuilt slugs
- generateMetadata fetches post metadata
- Renders Article + Breadcrumb JSON-LD

## 7) SEO and structured data

SEO is implemented at multiple layers:

- Route-level metadata exports in each page/layout
- JsonLd component embeds structured data per route
- Utility helpers in src/lib/seo.js generate:
  - tool FAQ data
  - tools page FAQ schema
  - tool WebApplication schema + breadcrumbs

Tools pages generally include:

- canonical URL
- OpenGraph and Twitter metadata
- FAQ section + FAQ schema
- Related tools internal linking block

## 8) Analytics model

### 8.1 GA bootstrapping

In src/app/layout.js:

- GA script and config script use strategy="lazyOnload"
- Only activated when NEXT_PUBLIC_GA_ID is present

### 8.2 Page views

src/components/AnalyticsTracker.jsx:

- Watches pathname
- Emits page_view event with optional tool metadata

### 8.3 Tool events

src/lib/analytics.js and src/hooks/useToolAnalytics.js standardize events:

- tool_used
- tool_run
- result_copied
- result_downloaded
- tool_search

Tool pages call these helpers for consistent event payloads.

## 9) Performance optimization status (implemented)

Completed optimizations:

- Static rendering enabled for non-data pages and tool layouts
- ISR applied to blog pages (1 hour)
- Font loading migrated to next/font/google with display: swap
- External Google Fonts link tags removed
- GA loading switched to lazyOnload
- Tools listing kept static by moving query parsing to client component + Suspense boundary
- Production build verified with static/SSG route output and no errors

## 10) Current caveats and next improvements

The project is improved, but not every optional optimization is fully complete yet.

### 10.1 Native img tags still present

Known places:

- src/app/blog/page.jsx uses <img> for post cover images
- src/app/tools/markdown-to-pdf/page.jsx includes an HTML conversion path that creates <img> markup inside generated HTML strings

Why this matters:

- Replacing visual content images with next/image can improve LCP and sizing behavior, especially on mobile.

Recommended next action:

- Convert blog cover images in src/app/blog/page.jsx to next/image with explicit width/height and responsive sizes.

### 10.2 Homepage above-the-fold content

Current homepage above-the-fold content is already light:

- Hero
- CTAs
- 3 featured tool cards

This is within the "max 6 cards" guidance.

## 11) Build and verification

The latest production build validation was done with next build and showed:

- No compile errors
- No route-level runtime errors
- Routes rendered as static or SSG

## 12) Key implementation files map

- Global layout and runtime setup: src/app/layout.js
- Global design tokens/styles: src/app/globals.css
- Homepage: src/app/page.js
- Tools listing: src/app/tools/page.jsx
- Tool registry: src/data/tools.js
- Tool variation routing helpers: src/lib/toolVariations.js
- SEO schema helpers: src/lib/seo.js
- Analytics helpers: src/lib/analytics.js
- Blog API: src/lib/hashnode.js
- Tool template scaffold: src/app/tools/_template

---

If this document drifts from implementation over time, update this file in the same pull request as architecture or rendering changes.
