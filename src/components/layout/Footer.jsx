"use client";

import Image from "next/image";
import Link from "next/link";
import { categories, categoryToSlug } from "@/data/tools";

const pages = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const tools = [
  { label: "Markdown to PDF", href: "/tools/markdown-to-pdf" },
  { label: "Password Generator", href: "/tools/password-generator" },
  { label: "QR Code Generator", href: "/tools/qr-code-generator" },
  { label: "Text Counter", href: "/tools/text-counter" },
];

const toolCategories = categories.map((category) => ({
  label: category,
  href: `/tools/category/${categoryToSlug(category)}`,
}));

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/abuzarsid7",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://x.com/me_abuzarr",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/abuzarsid/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Top grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            {/* Light logo — shown by default */}
            <Link href="/" aria-label="Go home" className="inline-block w-fit">
              <Image
                src="/icons/lightLogo.png"
                alt="AbiTechPros logo (light)"
                width={140}
                height={36}
                className="dark:hidden"
                priority
              />
              {/* Dark logo — shown in dark mode */}
              <Image
                src="/icons/darkLogo.png"
                alt="AbiTechPros logo (dark)"
                width={140}
                height={36}
                className="hidden dark:block"
                priority
              />
            </Link>
            <p className="text-xs leading-relaxed text-faint max-w-[220px]">
              A collection of handy tools and articles built to make developers&rsquo; lives easier.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-2 mt-1">
              {socials.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-md text-faint hover:text-ink hover:bg-subtle transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Pages column */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink">
              Pages
            </h3>
            <ul className="flex flex-col gap-2">
              {pages.map(({ label, href, external }) => (
                <li key={href}>
                  {external ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-dim hover:text-ink transition-colors"
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className="text-sm text-dim hover:text-ink transition-colors"
                    >
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Tools column */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink">
              Tools
            </h3>
            <ul className="flex flex-col gap-2">
              {tools.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-dim hover:text-ink transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/tools"
                  className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-ink hover:underline"
                >
                  All tools
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </li>
            </ul>

            <h4 className="mt-6 mb-3 text-[11px] font-semibold uppercase tracking-widest text-faint">
              Tool Categories
            </h4>
            <ul className="flex flex-col gap-2">
              {toolCategories.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-dim hover:text-ink transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA column */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink">
              Stay Updated
            </h3>
            <p className="mb-3 text-xs text-faint leading-relaxed">
              Get the latest tools and articles delivered to your inbox.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full rounded-md border border-line bg-base px-3 py-2 text-xs text-ink placeholder:text-faint outline-none focus:border-ink focus:ring-1 focus:ring-ink transition"
              />
              <button
                type="submit"
                className="w-full rounded-md bg-accent text-accent-fg px-3 py-2 text-xs font-medium hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-line pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-faint">
            &copy; {year} AbiTechPros. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="text-xs text-faint hover:text-dim transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-xs text-faint hover:text-dim transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
