/**
 * ToolLabel — accessible label for a tool field.
 *
 * Props:
 *   htmlFor   string  — id of the associated input
 *   required  boolean
 *   hint      string  — small secondary text shown to the right
 *   children
 */
export default function ToolLabel({ htmlFor = null, required = false, hint = null, children }) {
  return (
    <div className="mb-1.5 flex items-center justify-between gap-2">
      <label
        htmlFor={htmlFor}
        className="text-xs font-medium text-ink"
      >
        {children}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {hint && <span className="text-[11px] text-faint">{hint}</span>}
    </div>
  );
}
