interface SelfhostedCardProps {
  name: string;
  description: string;
  url?: string;
  status: "online" | "wip";
}

export function SelfhostedCard({
  name,
  description,
  url,
  status,
}: SelfhostedCardProps) {
  return (
    <div className="group p-4 rounded-lg border border-border bg-card hover:bg-card-hover hover:border-accent/30 transition-all duration-200">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-foreground font-medium group-hover:text-accent transition-colors">
          <span className="text-accent mr-1">./</span>
          {name}
        </h3>
        <span
          className={`text-xs px-2 py-0.5 rounded border ${
            status === "online"
              ? "bg-green-500/10 text-green-500 border-green-500/20"
              : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
          }`}
        >
          {status === "online" ? "online" : "wip"}
        </span>
      </div>
      <p className="text-sm text-muted mb-3">{description}</p>
      <div className="flex items-center gap-3 text-xs">
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors"
          >
            [visit]
          </a>
        ) : (
          <span className="text-muted/50">[coming soon]</span>
        )}
      </div>
    </div>
  );
}
