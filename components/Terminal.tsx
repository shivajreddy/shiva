"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const INFO_LINES: { label: string; value: string; href?: string }[] = [
  { label: "", value: "shiva@shiva.computer" },
  { label: "", value: "-------------------------" },
  { label: "Aliases", value: "smpl, shiv, shv" },
  { label: "OS", value: "Linux" },
  { label: "Shell", value: "fish" },
  { label: "Editor", value: "Emacs / Neovim" },
  { label: "Languages", value: "C, C++, Go, Python, Elixir, JS/TS" },
  { label: "Config", value: "dotfiles", href: "https://github.com/shivajreddy/dotfiles" },
  { label: "Location", value: "San Francisco, CA" },
  { label: "Hobbies", value: "Gym, Films, Chess, Poker, Games, Reading" },
];

const COLOR_BLOCKS = "██ ██ ██ ██ ██ ██ ██ ██";

export function Terminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const totalLines = INFO_LINES.length + 2; // +2 for command + color blocks

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    for (let i = 0; i < totalLines; i++) {
      const timer = setTimeout(() => {
        setVisibleLines(i + 1);
      }, 80 * i + 150);
      timers.push(timer);
    }
    return () => timers.forEach(clearTimeout);
  }, [totalLines]);

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-card border-b border-border">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-muted ml-2">~</span>
      </div>

      {/* Terminal body */}
      <div className="p-4 text-sm leading-relaxed overflow-x-auto">
        {/* Command line */}
        {visibleLines >= 1 && (
          <div className="mb-3">
            <span className="text-accent">$</span>
            <span className="text-foreground"> fastfetch</span>
          </div>
        )}

        {/* Neofetch output: ASCII art on left, info on right */}
        <div className="flex flex-col sm:flex-row gap-0 sm:gap-6">
          {/* Image - hidden on very small screens, shown on sm+ */}
          <div
            className={`hidden sm:block shrink-0 transition-opacity duration-500 ${
              visibleLines >= 2 ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src="/images/neofetch.png"
              alt="ASCII waves"
              width={160}
              height={200}
              className="rounded opacity-80"
              priority
            />
          </div>

          {/* Info lines */}
          <div className="min-w-0">
            {INFO_LINES.map((info, i) => (
              <div
                key={`info-${i}`}
                className={`whitespace-nowrap transition-opacity duration-150 ${
                  visibleLines >= i + 2 ? "opacity-100" : "opacity-0"
                }`}
              >
                {info.label === "" && i === 0 ? (
                  // Username line
                  <span className="text-accent font-bold">{info.value}</span>
                ) : info.label === "" ? (
                  // Separator
                  <span className="text-muted">{info.value}</span>
                ) : (
                  <>
                    <span className="text-accent font-bold">{info.label}</span>
                    <span className="text-muted">: </span>
                    {info.href ? (
                      <a
                        href={info.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground underline decoration-muted hover:text-accent hover:decoration-accent transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <span className="text-foreground">{info.value}</span>
                    )}
                  </>
                )}
              </div>
            ))}

            {/* Color blocks */}
            <div
              className={`mt-2 transition-opacity duration-150 ${
                visibleLines >= totalLines ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-red-500">██</span>
              <span className="text-orange-500"> ██</span>
              <span className="text-yellow-500"> ██</span>
              <span className="text-green-500"> ██</span>
              <span className="text-cyan-500"> ██</span>
              <span className="text-blue-500"> ██</span>
              <span className="text-purple-500"> ██</span>
              <span className="text-pink-500"> ██</span>
            </div>
          </div>
        </div>

        {/* Blinking cursor */}
        <div
          className={`mt-3 flex items-center transition-opacity duration-150 ${
            visibleLines >= totalLines ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-accent">$</span>
          <span className="w-2 h-4 bg-accent cursor-blink inline-block ml-1.5" />
        </div>
      </div>
    </div>
  );
}
