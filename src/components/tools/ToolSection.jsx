/**
 * ToolSection — padded card-like section inside a ToolLayout.
 *
 * Props:
 *   title      string    — optional heading
 *   className  string    — extra classes
 *   noBorder   boolean   — remove top border (first section)
 *   children
 */
export default function ToolSection({
  title = null,
  className = "",
  noBorder = false,
  children,
}) {
  return (
    <div
      className={`${noBorder ? "" : "border-t border-line"} px-5 py-5 sm:px-6 ${className}`}
    >
      {title && (
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-faint">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
