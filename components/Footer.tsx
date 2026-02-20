import Link from "next/link";

const socialLinks = [
  { href: "https://github.com/shivajreddy", label: "github" },
  { href: "https://www.linkedin.com/in/kshivareddy", label: "linkedin" },
];

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
          <div className="flex items-center gap-1">
            <span className="text-accent">$</span>
            <span>echo &quot;built by shiva&quot;</span>
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="text-center sm:text-left mt-4 text-xs text-muted/60">
          &copy; {new Date().getFullYear()} shiva. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
