import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import ToolCard from "@/components/tools/ToolCard";
import { categories, categoryToSlug, getToolsByCategory, slugToCategory } from "@/data/tools";

export const dynamic = "force-static";

const BASE_URL = "https://abitechpros.com";

function getCategoryDescription(category) {
  switch (category) {
    case "Developer":
      return "Developer tools for formatting data, generating identifiers, and converting technical values quickly in the browser.";
    case "Text":
      return "Text utilities for counting words, working with encoded strings, and handling common text-processing tasks online.";
    case "Security":
      return "Security-focused tools for generating stronger credentials and handling common account-safety workflows.";
    case "Design":
      return "Design helper tools for converting color formats and speeding up front-end and visual workflow tasks.";
    case "Media":
      return "Media utilities for compressing and optimizing assets before publishing to websites and apps.";
    case "Document":
      return "Document-focused tools for turning written content into shareable output formats in seconds.";
    case "Utility":
      return "General-purpose utility tools for quick browser-based tasks across development and operations workflows.";
    default:
      return "A curated collection of practical browser-based tools.";
  }
}

function getCategoryFaqItems(category) {
  return [
    {
      "@type": "Question",
      name: `What are ${category} tools on AbiTechPros?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `AbiTechPros ${category} tools are browser-based utilities grouped to help you complete related tasks faster without installing extra software.`,
      },
    },
    {
      "@type": "Question",
      name: `Are AbiTechPros ${category} tools free to use?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Tools on AbiTechPros are free to use and available without mandatory sign-up.",
      },
    },
    {
      "@type": "Question",
      name: `Can I use these ${category} tools on mobile and desktop?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. AbiTechPros tools run in modern browsers and can be used on both desktop and mobile devices.",
      },
    },
  ];
}

export function generateStaticParams() {
  return categories.map((category) => ({
    categorySlug: categoryToSlug(category),
  }));
}

export function generateMetadata({ params }) {
  const category = slugToCategory(params.categorySlug);

  if (!category) {
    return {
      title: "Category Not Found",
      description: "Category not found.",
    };
  }

  const description = getCategoryDescription(category);
  const title = `${category} Tools`;

  return {
    title,
    description,
  };
}

export default function ToolCategoryPage({ params }) {
  const category = slugToCategory(params.categorySlug);
  if (!category) notFound();

  const categoryTools = getToolsByCategory(category);
  const description = getCategoryDescription(category);

  return (
    <Container size="lg" as="section" className="py-12">
      <div className="mb-8">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1 text-xs text-faint hover:text-ink transition-colors"
        >
          ← All tools
        </Link>
      </div>

      <header className="mb-10 max-w-3xl">
        <h1 className="text-3xl font-bold text-ink">{category} Tools</h1>
        <p className="mt-3 text-sm leading-relaxed text-faint">
          {description}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-faint">
          This category page helps users and search engines discover {category.toLowerCase()} utilities in one place. Explore the tools below and jump directly into the task you need.
        </p>
      </header>

      {categoryTools.length === 0 ? (
        <p className="text-sm text-faint">No tools are available in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categoryTools.map((tool) => (
            <ToolCard
              key={tool.id}
              title={tool.title}
              description={tool.description}
              href={tool.href}
              icon={tool.icon}
              badge={tool.badge}
            />
          ))}
        </div>
      )}

      <section className="mt-14 max-w-3xl rounded-xl border border-line bg-surface p-5 sm:p-6">
        <h2 className="text-xl font-bold text-ink">About this {category} tools category</h2>
        <p className="mt-3 text-sm leading-relaxed text-faint">
          AbiTechPros category pages are designed as landing pages for indexing and discoverability. Each category groups closely related tools, provides category-level context, and links into the full tool pages where users can complete specific workflows.
        </p>
      </section>
    </Container>
  );
}