import { getAllProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/ProjectCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built and contributed to.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">
          <span className="text-accent mr-2">$</span>
          ls ~/projects
        </h1>
        <p className="text-muted text-sm">
          Things I&apos;ve built, contributed to, or am currently working on.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-16 text-muted">
          <p className="text-sm">
            <span className="text-accent">$</span> ls ~/projects
          </p>
          <p className="text-sm mt-2">No projects yet. Check back soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      )}
    </div>
  );
}
