import Container from "@/components/layout/Container";
import JsonLd from "@/components/JsonLd";

export const dynamic = "force-static";

const TERMS_URL = "https://abitechpros.com/terms-of-service";

const TERMS_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Service",
    description: "Read the AbiTechPros Terms of Service and usage conditions.",
    url: TERMS_URL,
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://abitechpros.com" },
      { "@type": "ListItem", position: 2, name: "Terms of Service", item: TERMS_URL },
    ],
  },
];

export const metadata = {
  title: "Terms of Service — AbiTechPros",
  description: "Read the AbiTechPros Terms of Service and conditions for using our developer tools and content.",
  alternates: { canonical: TERMS_URL },
  keywords: [
    "AbiTechPros terms of service",
    "terms and conditions",
    "developer tools terms",
    "website usage policy",
    "acceptable use",
  ],
  openGraph: {
    title: "Terms of Service — AbiTechPros",
    description: "Read the AbiTechPros Terms of Service and conditions for using our developer tools and content.",
    url: TERMS_URL,
    siteName: "AbiTechPros",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service — AbiTechPros",
    description: "Read the AbiTechPros Terms of Service and conditions for using our developer tools and content.",
  },
};

export default function TermsOfServicePage() {
  return (
    <Container size="md" as="section" className="py-16">
      <JsonLd data={TERMS_SCHEMA} />

      <h1 className="text-3xl font-bold text-ink">Terms of Service</h1>
      <p className="mt-4 text-sm leading-relaxed text-faint max-w-prose">
        These Terms of Service govern your use of the AbiTechPros website and all tools, content, and services offered on it. By using the site, you agree to these terms.
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-faint">
        <section className="rounded-xl border border-line bg-surface p-5 sm:p-6">
          <h2 className="text-base font-semibold text-ink">1. Acceptance of terms</h2>
          <p className="mt-3">
            By accessing or using AbiTechPros (the &ldquo;Site&rdquo;), you agree to be bound by these Terms of Service. If you do not agree to all of these terms, you may not use the Site.
          </p>
        </section>

        <section className="rounded-xl border border-line bg-surface p-5 sm:p-6">
          <h2 className="text-base font-semibold text-ink">2. Use of tools and services</h2>
          <p className="mt-3">
            AbiTechPros provides free browser-based developer tools for personal and professional use. You agree to use these tools only for lawful purposes and in a manner that does not infringe the rights of others.
          </p>
          <p className="mt-3">
            You must not attempt to disrupt, abuse, or reverse-engineer any part of the Site or its services.
          </p>
        </section>

        <section className="rounded-xl border border-line bg-surface p-5 sm:p-6">
          <h2 className="text-base font-semibold text-ink">3. Intellectual property</h2>
          <p className="mt-3">
            All content, code, and design on AbiTechPros — including text, graphics, logos, and tool implementations — is the property of AbiTechPros unless otherwise noted. You may not reproduce or redistribute it without prior written permission.
          </p>
        </section>

        <section className="rounded-xl border border-line bg-surface p-5 sm:p-6">
          <h2 className="text-base font-semibold text-ink">4. Disclaimer of warranties</h2>
          <p className="mt-3">
            The tools and content on AbiTechPros are provided &ldquo;as is&rdquo; without any warranties, express or implied. We do not guarantee the accuracy, reliability, or suitability of any tool for any particular purpose.
          </p>
          <p className="mt-3">
            Always verify results independently for mission-critical use cases.
          </p>
        </section>

        <section className="rounded-xl border border-line bg-surface p-5 sm:p-6">
          <h2 className="text-base font-semibold text-ink">5. Limitation of liability</h2>
          <p className="mt-3">
            To the fullest extent permitted by law, AbiTechPros shall not be liable for any direct, indirect, incidental, or consequential damages resulting from your use of the Site or its tools, including but not limited to data loss or errors.
          </p>
        </section>

        <section className="rounded-xl border border-line bg-surface p-5 sm:p-6">
          <h2 className="text-base font-semibold text-ink">6. Third-party links and content</h2>
          <p className="mt-3">
            The Site may contain links to third-party websites. These links are provided for convenience only. AbiTechPros is not responsible for the content or practices of any linked third-party site.
          </p>
        </section>

        <section className="rounded-xl border border-line bg-surface p-5 sm:p-6">
          <h2 className="text-base font-semibold text-ink">7. Changes to these terms</h2>
          <p className="mt-3">
            AbiTechPros reserves the right to update these Terms of Service at any time. Continued use of the Site after changes are posted constitutes your acceptance of the revised terms.
          </p>
        </section>

        <section className="rounded-xl border border-line bg-surface p-5 sm:p-6">
          <h2 className="text-base font-semibold text-ink">8. Contact</h2>
          <p className="mt-3">
            If you have questions about these Terms of Service, contact:{" "}
            <a href="mailto:hello@abitechpros.com" className="text-ink underline">
              hello@abitechpros.com
            </a>
            .
          </p>
        </section>

        <p className="text-xs text-faint">Last updated: 14 March 2026</p>
      </div>
    </Container>
  );
}
