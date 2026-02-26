import { Terminal } from "@/components/Terminal";
import { BlogCard } from "@/components/BlogCard";
import { ProjectCard } from "@/components/ProjectCard";
import { SelfhostedCard } from "@/components/SelfhostedCard";
import { getAllPosts } from "@/lib/blog";
import { getFeaturedProjects } from "@/lib/projects";
import Link from "next/link";

const selfhostedApps = [
  {
    name: "Audiobookshelf",
    description:
      "Audiobook and podcast server with progress tracking across devices.",
    url: "https://abs.shiva.computer",
    local: "http://192.168.5.156:13378",
    status: "online" as const,
  },
  {
    name: "Plex",
    description:
      "Media streaming for movies, TV shows, and music with hardware transcoding.",
    url: "https://plex.shiva.computer",
    local: "http://192.168.4.100:32400/web",
    status: "wip" as const,
  },
  {
    name: "Jellyfin",
    description:
      "Open-source media server. No accounts, no tracking, free transcoding.",
    url: "https://caseflix.shiva.computer",
    local: "http://192.168.5.156:8096",
    status: "online" as const,
  },
  {
    name: "Kavita",
    description:
      "Book, comic, and manga server with a built-in web reader.",
    url: "https://books.shiva.computer",
    local: "http://192.168.5.156:5000",
    status: "online" as const,
  },
  {
    name: "Home Assistant",
    description:
      "Smart home automation hub with 2000+ integrations.",
    url: "https://ha.shiva.computer",
    local: "http://192.168.4.100:8123",
    status: "wip" as const,
  },
  {
    name: "Vaultwarden",
    description:
      "Self-hosted Bitwarden-compatible password manager.",
    url: "https://vault.shiva.computer",
    local: "http://192.168.4.100:8090",
    status: "wip" as const,
  },
];

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);
  const featuredProjects = getFeaturedProjects();

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

      {/* Self-Hosted Apps */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">
            <span className="text-accent mr-2">$</span>
            docker ps --homelab
          </h2>
          <Link
            href="/selfhosted"
            className="text-sm text-muted hover:text-accent transition-colors"
          >
            view all &rarr;
          </Link>
        </div>
        <p className="text-muted text-sm mb-4">
          Services running on my own hardware &mdash; no third-party clouds, no
          subscriptions, full control over my data.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {selfhostedApps.map((app) => (
            <SelfhostedCard key={app.name} {...app} />
          ))}
        </div>
      </section>

      {/* Playground CTA */}
      <section className="mb-16">
        <Link href="/playground" className="block group">
          <div className="relative rounded-lg overflow-hidden">
            {/* Gradient border */}
            <div className="absolute inset-0 glow-border rounded-lg opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative m-[1px] rounded-lg bg-card p-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold glow-text mb-1">
                  ~/playground
                </h2>
                <p className="text-muted text-sm">
                  An interactive terminal. Explore a virtual filesystem, play
                  Snake, take a quiz, and find easter eggs.
                </p>
              </div>
              <span className="text-muted group-hover:text-accent transition-colors text-lg shrink-0 ml-4">
                &rarr;
              </span>
            </div>
          </div>
        </Link>
      </section>

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
