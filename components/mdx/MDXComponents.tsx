import type { MDXComponents } from "mdx/types";
import { Callout } from "./Callout";
import Link from "next/link";

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1 className="text-2xl font-bold mt-8 mb-4 text-foreground" {...props} />
  ),
  h2: (props) => (
    <h2
      className="text-xl font-semibold mt-6 mb-3 text-foreground border-b border-border pb-2"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="text-lg font-semibold mt-5 mb-2 text-foreground" {...props} />
  ),
  p: (props) => (
    <p className="my-3 text-foreground/90 leading-7" {...props} />
  ),
  ul: (props) => (
    <ul className="my-3 ml-6 list-disc text-foreground/90 leading-7" {...props} />
  ),
  ol: (props) => (
    <ol className="my-3 ml-6 list-decimal text-foreground/90 leading-7" {...props} />
  ),
  li: (props) => <li className="my-1" {...props} />,
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
          {...props}
        >
          {children}
          <span className="text-xs ml-0.5">&nearr;</span>
        </a>
      );
    }
    return (
      <Link href={href || "#"} className="text-accent hover:underline" {...props}>
        {children}
      </Link>
    );
  },
  blockquote: (props) => (
    <blockquote
      className="my-4 border-l-4 border-accent/30 pl-4 italic text-muted"
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-border" />,
  pre: (props) => (
    <pre
      className="my-4 rounded-lg border border-border bg-card p-4 overflow-x-auto text-sm"
      {...props}
    />
  ),
  code: ({ className, children, ...props }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code
          className="bg-card border border-border rounded px-1.5 py-0.5 text-sm text-accent"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="rounded-lg my-4 max-w-full" alt={props.alt || ""} {...props} />
  ),
  table: (props) => (
    <div className="my-4 overflow-x-auto">
      <table className="w-full text-sm border-collapse" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="border border-border px-3 py-2 text-left font-semibold bg-card"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border border-border px-3 py-2" {...props} />
  ),
  Callout,
};
