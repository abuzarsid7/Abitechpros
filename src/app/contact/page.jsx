import Container from "@/components/layout/Container";

export const dynamic = "force-static";

export const metadata = {
  title: "Contact",
  description: "Get in touch with the AbiTechPros team.",
};

export default function ContactPage() {
  return (
    <Container size="md" as="section" className="py-16">
      <h1 className="text-3xl font-bold text-ink">Contact</h1>
      <p className="mt-4 text-sm text-faint leading-relaxed max-w-prose">
        Have a question or suggestion? Reach out at{" "}
        <a href="mailto:hello@abitechpros.com" className="text-ink underline">
          hello@abitechpros.com
        </a>
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <section className="rounded-xl border border-line bg-surface p-5 sm:p-6">
          <h2 className="text-base font-semibold text-ink">General inquiries</h2>
          <p className="mt-3 text-sm leading-relaxed text-faint">
            Reach out for general questions about tools, roadmap, or how AbiTechPros can help your workflow.
          </p>
        </section>

        <section className="rounded-xl border border-line bg-surface p-5 sm:p-6">
          <h2 className="text-base font-semibold text-ink">Feedback and bug reports</h2>
          <p className="mt-3 text-sm leading-relaxed text-faint">
            Found a bug or have a feature request? Share details and expected behavior so improvements can be prioritized.
          </p>
        </section>

        <section className="rounded-xl border border-line bg-surface p-5 sm:p-6">
          <h2 className="text-base font-semibold text-ink">Partnerships and collaboration</h2>
          <p className="mt-3 text-sm leading-relaxed text-faint">
            For collaboration requests, integrations, or content partnerships, include a short summary and goals in your message.
          </p>
        </section>

        <section className="rounded-xl border border-line bg-surface p-5 sm:p-6">
          <h2 className="text-base font-semibold text-ink">Response window</h2>
          <p className="mt-3 text-sm leading-relaxed text-faint">
            Most emails are answered as quickly as possible. Include context, links, and screenshots where relevant for faster support.
          </p>
        </section>
      </div>
    </Container>
  );
}
