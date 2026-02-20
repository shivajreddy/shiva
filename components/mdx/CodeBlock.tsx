"use client";

import { useState } from "react";

interface CodeBlockProps {
  children: React.ReactNode;
  filename?: string;
}

export function CodeBlock({ children, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const code = document.querySelector("pre code")?.textContent || "";
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 rounded-lg border border-border overflow-hidden">
      {filename && (
        <div className="px-4 py-2 bg-card border-b border-border text-xs text-muted flex items-center justify-between">
          <span>{filename}</span>
          <button
            onClick={handleCopy}
            className="text-muted hover:text-foreground transition-colors"
          >
            {copied ? "copied!" : "copy"}
          </button>
        </div>
      )}
      {!filename && (
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 text-xs text-muted hover:text-foreground transition-colors z-10"
        >
          {copied ? "copied!" : "copy"}
        </button>
      )}
      {children}
    </div>
  );
}
