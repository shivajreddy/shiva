import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { renderMDX } from "@/lib/mdx";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const content = await renderMDX(project.content);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link
        href="/projects"
        className="text-sm text-muted hover:text-accent transition-colors mb-8 inline-block"
      >
        &larr; cd ~/projects
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-3">
            <span className="text-accent mr-1">./</span>
            {project.title}
          </h1>
          <p className="text-muted text-sm mb-4">{project.description}</p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent transition-colors"
              >
                [source code]
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent transition-colors"
              >
                [live demo]
              </a>
            )}
          </div>
        </header>

        <div className="prose-terminal">{content}</div>
      </article>
    </div>
  );
}
