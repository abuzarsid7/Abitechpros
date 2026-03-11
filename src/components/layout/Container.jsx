/**
 * Container — responsive centred layout wrapper.
 *
 * Props:
 *   as          — HTML element or component to render (default: "div")
 *   size        — "sm" | "md" | "lg" | "xl" | "full"  (default: "lg")
 *   padded      — add horizontal padding                (default: true)
 *   className   — extra classes
 *   children
 */
export default function Container({
  as: Tag = "div",
  size = "lg",
  padded = true,
  className = "",
  children,
  ...props
}) {
  const maxWidths = {
    sm:   "max-w-2xl",    // 672 px
    md:   "max-w-4xl",    // 896 px
    lg:   "max-w-6xl",    // 1152 px
    xl:   "max-w-7xl",    // 1280 px
    full: "max-w-full",
  };

  const padding = padded ? "px-4 sm:px-6 lg:px-8" : "";

  return (
    <Tag
      className={`mx-auto w-full ${maxWidths[size] ?? maxWidths.lg} ${padding} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
