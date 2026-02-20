"use client";

import { useEffect, useState } from "react";

interface TerminalLine {
  prefix?: string;
  text: string;
  accent?: boolean;
  delay: number;
}

const lines: TerminalLine[] = [
  { prefix: "> ", text: 'const dev = {', delay: 0 },
  { prefix: "    ", text: 'name: "shiva",', delay: 100 },
  { prefix: "    ", text: 'role: "Software Engineer",', delay: 200 },
  { prefix: "    ", text: 'passions: ["building things", "open source", "writing"]', delay: 300 },
  { prefix: "> ", text: '};', delay: 400 },
  { prefix: "", text: '', delay: 500 },
  { prefix: "> ", text: 'dev.status', delay: 600 },
  { prefix: "", text: '"open to opportunities"', accent: true, delay: 800 },
];

export function Terminal() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    lines.forEach((line, i) => {
      const timer = setTimeout(() => {
        setVisibleLines(i + 1);
      }, line.delay + 200);
      timers.push(timer);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-card border-b border-border">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-muted ml-2">~/shiva</span>
      </div>
      {/* Terminal body */}
      <div className="p-4 text-sm leading-relaxed">
        {lines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="min-h-[1.5rem]">
            {line.prefix && (
              <span className="text-muted">{line.prefix}</span>
            )}
            <span className={line.accent ? "text-accent" : "text-foreground"}>
              {line.text}
            </span>
          </div>
        ))}
        <div className="min-h-[1.5rem] flex items-center">
          <span className="text-muted">&gt; </span>
          <span className="w-2 h-4 bg-accent cursor-blink inline-block ml-0.5" />
        </div>
      </div>
    </div>
  );
}
