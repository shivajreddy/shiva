import { getAllPosts, getAllTags } from "@/lib/blog";
import { BlogCard } from "@/components/BlogCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "~/blog",
  description: "Thoughts on software engineering, technology, and more.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">
          <span className="text-accent mr-2">$</span>
          ls ~/blog
        </h1>
        <p className="text-muted text-sm">
          Thoughts on software engineering, technology, and things I learn along
          the way.
        </p>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-xs text-muted">tags:</span>
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded border border-border text-muted"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {posts.length === 0 ? (
        <div className="text-center py-16 text-muted">
          <p className="text-sm">
            <span className="text-accent">$</span> ls ~/blog
          </p>
          <p className="text-sm mt-2">No posts yet. Check back soon.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      )}
    </div>
  );
}
