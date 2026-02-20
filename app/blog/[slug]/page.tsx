import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { renderMDX } from "@/lib/mdx";
import { formatDate } from "@/lib/format";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const content = await renderMDX(post.content);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link
        href="/blog"
        className="text-sm text-muted hover:text-accent transition-colors mb-8 inline-block"
      >
        &larr; cd ~/blog
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-3">{post.title}</h1>
          <div className="flex items-center gap-3 text-sm text-muted">
            <span>{formatDate(post.date)}</span>
            <span className="text-border">|</span>
            <span>{post.readingTime}</span>
          </div>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded border border-border text-muted"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose-terminal">{content}</div>
      </article>
    </div>
  );
}
