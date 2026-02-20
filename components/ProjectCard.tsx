import Link from "next/link";

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
}

export function ProjectCard({
  slug,
  title,
  description,
  tech,
  github,
  live,
}: ProjectCardProps) {
  return (
    <div className="group p-4 rounded-lg border border-border bg-card hover:bg-card-hover hover:border-accent/30 transition-all duration-200">
      <Link href={`/projects/${slug}`}>
        <h3 className="text-foreground font-medium mb-2 group-hover:text-accent transition-colors">
          <span className="text-accent mr-1">./</span>
          {title}
        </h3>
      </Link>
      <p className="text-sm text-muted mb-3 line-clamp-2">{description}</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {tech.map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-3 text-xs">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors"
          >
            [source]
          </a>
        )}
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors"
          >
            [live]
          </a>
        )}
        <Link
          href={`/projects/${slug}`}
          className="text-muted hover:text-accent transition-colors"
        >
          [details]
        </Link>
      </div>
    </div>
  );
}
