import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About shiva - software engineer, builder, and writer.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">
          <span className="text-accent mr-2">$</span>
          cat ~/about.txt
        </h1>
      </div>

      <div className="space-y-8">
        {/* Bio */}
        <section className="rounded-lg border border-border bg-card p-6">
          <div className="text-sm text-muted mb-2">// bio</div>
          <p className="text-foreground/90 leading-7">
            Hey, I&apos;m <span className="text-accent font-semibold">shiva</span>.
            I&apos;m a software engineer who loves building things that live on
            the internet. I care about clean code, good developer experience,
            and shipping products that matter.
          </p>
          <p className="text-foreground/90 leading-7 mt-3">
            When I&apos;m not writing code, you can find me exploring new
            technologies, contributing to open source, or writing about things
            I&apos;ve learned.
          </p>
        </section>

        {/* Tech Stack */}
        <section>
          <h2 className="text-lg font-semibold mb-4">
            <span className="text-accent mr-2">&gt;</span>
            tech.stack
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="text-sm text-accent mb-2">languages</div>
              <div className="flex flex-wrap gap-1.5">
                {["TypeScript", "JavaScript", "Python", "Go", "Rust"].map(
                  (lang) => (
                    <span
                      key={lang}
                      className="text-xs px-2 py-0.5 rounded border border-border text-muted"
                    >
                      {lang}
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="text-sm text-accent mb-2">frameworks</div>
              <div className="flex flex-wrap gap-1.5">
                {["React", "Next.js", "Node.js", "Tailwind CSS"].map((fw) => (
                  <span
                    key={fw}
                    className="text-xs px-2 py-0.5 rounded border border-border text-muted"
                  >
                    {fw}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="text-sm text-accent mb-2">tools</div>
              <div className="flex flex-wrap gap-1.5">
                {["Git", "Docker", "Linux", "VS Code", "Vim"].map((tool) => (
                  <span
                    key={tool}
                    className="text-xs px-2 py-0.5 rounded border border-border text-muted"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="text-sm text-accent mb-2">databases</div>
              <div className="flex flex-wrap gap-1.5">
                {["PostgreSQL", "Redis", "MongoDB"].map((db) => (
                  <span
                    key={db}
                    className="text-xs px-2 py-0.5 rounded border border-border text-muted"
                  >
                    {db}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-lg font-semibold mb-4">
            <span className="text-accent mr-2">&gt;</span>
            contact.info
          </h2>
          <div className="rounded-lg border border-border bg-card p-4 text-sm space-y-2">
            <div>
              <span className="text-muted">github:</span>{" "}
              <a
                href="https://github.com/shivajreddy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                github.com/shivajreddy
              </a>
            </div>
            <div>
              <span className="text-muted">linkedin:</span>{" "}
              <a
                href="https://www.linkedin.com/in/kshivareddy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                linkedin.com/in/kshivareddy
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
