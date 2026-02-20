import { Terminal } from "@/components/Terminal";
import { BlogCard } from "@/components/BlogCard";
import { ProjectCard } from "@/components/ProjectCard";
import { getAllPosts } from "@/lib/blog";
import { getFeaturedProjects } from "@/lib/projects";
import Link from "next/link";

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);
  const featuredProjects = getFeaturedProjects().slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Hero */}
      <section className="mb-16">
        <Terminal />
        <p className="mt-6 text-muted text-sm leading-relaxed">
          Welcome to my corner of the internet. I write about software
          engineering, share projects I&apos;m working on, and document things I
          learn along the way.
        </p>
      </section>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">
              <span className="text-accent mr-2">$</span>
              ls ~/blog --recent
            </h2>
            <Link
              href="/blog"
              className="text-sm text-muted hover:text-accent transition-colors"
            >
              view all &rarr;
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">
              <span className="text-accent mr-2">$</span>
              ls ~/projects --featured
            </h2>
            <Link
              href="/projects"
              className="text-sm text-muted hover:text-accent transition-colors"
            >
              view all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </div>
        </section>
      )}

      {/* Quick Links */}
      <section>
        <h2 className="text-lg font-semibold mb-4">
          <span className="text-accent mr-2">$</span>
          cat links.txt
        </h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <a
            href="https://github.com/shivajreddy"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded border border-border text-muted hover:text-accent hover:border-accent/30 transition-colors"
          >
            github
          </a>
          <a
            href="https://www.linkedin.com/in/kshivareddy"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded border border-border text-muted hover:text-accent hover:border-accent/30 transition-colors"
          >
            linkedin
          </a>
        </div>
      </section>
    </div>
  );
}
