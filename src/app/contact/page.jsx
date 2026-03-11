import Container from "@/components/layout/Container";

export const metadata = {
  title: "Contact — AbiTechPros",
  description: "Get in touch with the AbiTechPros team.",
};

export default function ContactPage() {
  return (
    <Container size="sm" as="section" className="py-16">
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
