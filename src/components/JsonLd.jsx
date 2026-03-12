/**
 * Injects a JSON-LD structured data block into the page.
 * Works in both Server Components and Client Components.
 * Google parses <script type="application/ld+json"> anywhere in the document.
 *
 * @param {{ data: object | object[] }} props
 */
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
