interface CalloutProps {
  type?: "info" | "warning" | "tip";
  children: React.ReactNode;
}

const icons: Record<string, string> = {
  info: "i",
  warning: "!",
  tip: "*",
};

const colors: Record<string, string> = {
  info: "border-blue-500/50 bg-blue-500/5",
  warning: "border-yellow-500/50 bg-yellow-500/5",
  tip: "border-accent/50 bg-accent/5",
};

export function Callout({ type = "info", children }: CalloutProps) {
  return (
    <div
      className={`my-4 rounded-lg border-l-4 p-4 text-sm ${colors[type]}`}
    >
      <div className="flex items-start gap-2">
        <span className="font-bold text-muted">[{icons[type]}]</span>
        <div>{children}</div>
      </div>
    </div>
  );
}
