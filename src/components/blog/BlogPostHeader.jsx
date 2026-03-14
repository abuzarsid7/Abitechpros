import Image from "next/image";

/**
 * BlogPostHeader — cover image, title, brief, author chip and meta.
 *
 * Props come directly from the Hashnode post object:
 *   title, brief, publishedAt, readTimeInMinutes,
 *   coverImage { url }, author { name, profilePicture }, tags [{ name, slug }]
 */
export default function BlogPostHeader({ post }) {
  const {
    title,
    brief,
    publishedAt,
    readTimeInMinutes,
    coverImage,
    author,
    tags,
  } = post;

  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="mb-10">
      {/* Cover image */}
      {coverImage?.url && (
        <div className="mb-8 rounded-2xl overflow-hidden border border-line shadow-sm">
          <Image
            src={coverImage.url}
            alt={title}
            width={1200}
            height={630}
            priority
            unoptimized
            sizes="(max-width: 768px) 100vw, 768px"
            className="w-full object-cover max-h-[420px]"
          />
        </div>
      )}

      {/* Tags */}
      {tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag.slug}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-subtle text-dim border border-line"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl sm:text-[2.15rem] font-bold text-ink leading-[1.2] tracking-tight mb-4">
        {title}
      </h1>

      {/* Brief */}
      {brief && (
        <p className="text-base text-dim leading-relaxed mb-6 border-l-[3px] border-accent pl-4">
          {brief}
        </p>
      )}

      {/* Meta row */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-line">
        {/* Author */}
        {author && (
          <div className="flex items-center gap-2.5">
            {author.profilePicture ? (
              <Image
                src={author.profilePicture}
                alt={author.name}
                width={32}
                height={32}
                loading="lazy"
                unoptimized
                className="w-8 h-8 rounded-full object-cover border border-line"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-subtle border border-line flex items-center justify-center text-xs font-semibold text-dim">
                {author.name?.charAt(0) ?? "A"}
              </div>
            )}
            <span className="text-sm font-medium text-ink">{author.name}</span>
          </div>
        )}

        {/* Date + read time */}
        <div className="flex items-center gap-2 text-xs text-faint">
          <time dateTime={publishedAt}>{formattedDate}</time>
          {readTimeInMinutes && (
            <>
              <span aria-hidden>·</span>
              <span>{readTimeInMinutes} min read</span>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
