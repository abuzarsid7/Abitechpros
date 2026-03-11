import Container from "@/components/layout/Container";

export const metadata = {
  title: "About — AbiTechPros",
  description: "Learn about AbiTechPros and what we're building.",
};

export default function AboutPage() {
  return (
    <Container size="md" as="section" className="py-16">
      <h1 className="text-3xl font-bold text-ink">About</h1>
      <p className="mt-4 text-sm text-faint leading-relaxed max-w-prose">
        AbiTechPros is a growing collection of free, browser-based developer tools and articles
        built to speed up your workflow — no sign-up required.
      </p>
    </Container>
  );
}
