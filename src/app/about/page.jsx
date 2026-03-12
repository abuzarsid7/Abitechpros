import Container from "@/components/layout/Container";
import JsonLd from "@/components/JsonLd";

const ABOUT_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About AbiTechPros",
    description: "Learn about AbiTechPros and what we're building.",
    url: "https://abitechpros.com/about",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://abitechpros.com" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://abitechpros.com/about" },
    ],
  },
];

export const metadata = {
  title: "About — AbiTechPros",
  description: "Learn about AbiTechPros and what we're building.",
  alternates: { canonical: "https://abitechpros.com/about" },
};

export default function AboutPage() {
  return (
    <Container size="md" as="section" className="py-16">
      <JsonLd data={ABOUT_SCHEMA} />
      <h1 className="text-3xl font-bold text-ink">About</h1>
      <p className="mt-4 text-sm text-faint leading-relaxed max-w-prose">
        AbiTechPros is a growing collection of free, browser-based developer tools and articles
        built to speed up your workflow — no sign-up required.
      </p>
    </Container>
  );
}
