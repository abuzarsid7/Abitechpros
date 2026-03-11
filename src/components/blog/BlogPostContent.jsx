/**
 * BlogPostContent — renders Hashnode HTML with styled prose.
 * The `blog-prose` CSS class (defined in globals.css) overrides Tailwind
 * Typography tokens to match the site design system.
 */
export default function BlogPostContent({ html }) {
  if (!html) return null;

  return (
    <div
      className="prose prose-base dark:prose-invert blog-prose max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
