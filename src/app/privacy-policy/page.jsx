import Container from "@/components/layout/Container";
import JsonLd from "@/components/JsonLd";

const PRIVACY_URL = "https://abitechpros.com/privacy-policy";

const PRIVACY_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    description: "Read the AbiTechPros privacy policy and data handling practices.",
    url: PRIVACY_URL,
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://abitechpros.com" },
      { "@type": "ListItem", position: 2, name: "Privacy Policy", item: PRIVACY_URL },
    ],
  },
];

export const metadata = {
  title: "Privacy Policy — AbiTechPros",
  description: "Read the AbiTechPros privacy policy and data handling practices.",
  alternates: { canonical: PRIVACY_URL },
  keywords: [
    "AbiTechPros privacy policy",
    "data privacy",
    "website privacy",
    "cookie policy",
    "developer tools privacy",
  ],
  openGraph: {
    title: "Privacy Policy — AbiTechPros",
    description: "Read the AbiTechPros privacy policy and data handling practices.",
    url: PRIVACY_URL,
    siteName: "AbiTechPros",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy — AbiTechPros",
    description: "Read the AbiTechPros privacy policy and data handling practices.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <Container size="md" as="section" className="py-16">
      <JsonLd data={PRIVACY_SCHEMA} />

      <h1 className="text-3xl font-bold text-ink">Privacy Policy</h1>
      <p className="mt-4 text-sm leading-relaxed text-faint max-w-prose">
        This Privacy Policy explains how AbiTechPros collects, uses, and protects information when you use this website and its tools.
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-faint">
        <section className="rounded-xl border border-line bg-surface p-5 sm:p-6">
          <h2 className="text-base font-semibold text-ink">1. Information we collect</h2>
          <p className="mt-3">
            AbiTechPros may collect limited technical data such as anonymized usage analytics, browser type, and device information to improve performance and usability.
          </p>
          <p className="mt-3">
            For most browser-based tools, input data is processed on the client side. Where tools run locally, your raw input is not uploaded to our servers.
          </p>
        </section>

        <section className="rounded-xl border border-line bg-surface p-5 sm:p-6">
          <h2 className="text-base font-semibold text-ink">2. How information is used</h2>
          <p className="mt-3">
            Data may be used to understand site usage patterns, maintain service quality, improve tool functionality, and detect abuse or technical issues.
          </p>
        </section>

        <section className="rounded-xl border border-line bg-surface p-5 sm:p-6">
          <h2 className="text-base font-semibold text-ink">3. Cookies and analytics</h2>
          <p className="mt-3">
            AbiTechPros may use cookies or similar technologies for analytics and basic functionality. You can control cookies through your browser settings.
          </p>
        </section>

        <section className="rounded-xl border border-line bg-surface p-5 sm:p-6">
          <h2 className="text-base font-semibold text-ink">4. Third-party services</h2>
          <p className="mt-3">
            Some pages may rely on third-party services such as analytics providers or external content platforms. Their privacy practices are governed by their own policies.
          </p>
        </section>

        <section className="rounded-xl border border-line bg-surface p-5 sm:p-6">
          <h2 className="text-base font-semibold text-ink">5. Contact</h2>
          <p className="mt-3">
            If you have questions about this Privacy Policy, contact:
            {" "}
            <a href="mailto:hello@abitechpros.com" className="text-ink underline">
              hello@abitechpros.com
            </a>
            .
          </p>
        </section>

        <p className="text-xs text-faint">Last updated: 13 March 2026</p>
      </div>
    </Container>
  );
}