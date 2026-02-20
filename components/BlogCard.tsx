import Link from "next/link";
import { formatDate } from "@/lib/format";

interface BlogCardProps {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: string;
}

export function BlogCard({
  slug,
  title,
  date,
  description,
  tags,
  readingTime,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="p-4 rounded-lg border border-border bg-card hover:bg-card-hover hover:border-accent/30 transition-all duration-200">
        <div className="flex items-center gap-2 text-xs text-muted mb-2">
          <span>{formatDate(date)}</span>
          <span className="text-border">|</span>
          <span>{readingTime}</span>
        </div>
        <h3 className="text-foreground font-medium mb-1 group-hover:text-accent transition-colors">
          <span className="text-accent mr-1">&gt;</span>
          {title}
        </h3>
        <p className="text-sm text-muted line-clamp-2 mb-3">{description}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded border border-border text-muted"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}
