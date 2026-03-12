import Container from "@/components/layout/Container";
import JsonLd from "@/components/JsonLd";

const CONTACT_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact AbiTechPros",
    description: "Get in touch with the AbiTechPros team.",
    url: "https://abitechpros.com/contact",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://abitechpros.com" },
      { "@type": "ListItem", position: 2, name: "Contact", item: "https://abitechpros.com/contact" },
    ],
  },
];

export const metadata = {
  title: "Contact — AbiTechPros",
  description: "Get in touch with the AbiTechPros team.",
  alternates: { canonical: "https://abitechpros.com/contact" },
};

export default function ContactPage() {
  return (
    <Container size="sm" as="section" className="py-16">
      <JsonLd data={CONTACT_SCHEMA} />
      <h1 className="text-3xl font-bold text-ink">Contact</h1>
      <p className="mt-4 text-sm text-faint leading-relaxed">
        Have a question or suggestion? Reach out at{" "}
        <a href="mailto:hello@abitechpros.com" className="text-ink underline">
          hello@abitechpros.com
        </a>
      </p>
    </Container>
  );
}
