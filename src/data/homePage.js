export const homePageMetadata = {
  title: "AbiTechPros – Free Developer Tools & Tech Blog",
  description: "Free browser-based developer tools and tech articles. No sign-up required.",
  alternates: { canonical: "https://abitechpros.com" },
  keywords: [
    "AbiTechPros",
    "free developer tools",
    "online tools for developers",
    "browser based tools",
    "coding utilities",
    "tech blog",
    "developer utilities",
    "free web tools",
    "no sign-up tools",
  ],
  openGraph: {
    title: "AbiTechPros – Free Developer Tools & Tech Blog",
    description: "Free browser-based developer tools and tech articles. No sign-up required.",
    url: "https://abitechpros.com",
    siteName: "AbiTechPros",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "AbiTechPros – Free Developer Tools & Tech Blog",
    description: "Free browser-based developer tools and tech articles. No sign-up required.",
  },
};

export const homePageContent = {
  hero: {
    badge: "Free · No sign-up required",
    title: "Small tools. Real problems. Built for people who got tired of Googling the same things.",
    description:
      "I'm Abuzar. I built AbiTechPros so you don't have to waste time on the repetitive tech stuff — just open a tool, get it done, and move on.",
    primaryCta: {
      label: "Browse tools",
      href: "/tools",
    },
    secondaryCta: {
      label: "Read the blog",
      href: "/blog",
    },
  },
  featuredTools: {
    title: "Featured tools",
    description: "No sign-up, no nonsense. Pick a tool and use it right now.",
    allToolsLabel: "All tools →",
    allToolsHref: "/tools",
    toolIds: ["markdown-to-pdf", "password-generator", "qr-code-generator"],
  },
  quickLinks: [
    {
      icon: "🛠️",
      title: "All Tools",
      body: "Browse every utility we offer, organised by category.",
      href: "/tools",
      cta: "Explore",
    },
    {
      icon: "📝",
      title: "Blog",
      body: "Articles, guides, and tips for developers.",
      href: "/blog",
      cta: "Read articles",
    },
    {
      icon: "👋",
      title: "About",
      body: "Learn about AbiTechPros and what we're building.",
      href: "/about",
      cta: "Learn more",
    },
  ],
};