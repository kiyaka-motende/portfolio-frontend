import { useState } from "react";
import { Link } from "react-router-dom";
import { useProjects } from "../hooks/useApi";
import type { Project } from "../types";

// ── Project card ──────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group block border border-zinc-800 rounded-sm hover:border-zinc-600 transition-all duration-300 overflow-hidden"
    >
      {/* Image */}
      {project.image ? (
        <div className="aspect-video overflow-hidden bg-zinc-900">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="aspect-video bg-zinc-900 flex items-center justify-center">
          <span className="text-zinc-700 font-mono text-xs">no preview</span>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h2 className="font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors">
            {project.title}
          </h2>
          <span className="text-zinc-600 group-hover:text-emerald-500 transition-colors ml-4 shrink-0">
            ↗
          </span>
        </div>

        <p className="text-sm text-zinc-500 leading-relaxed mb-4">
          {project.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tech_tags.map((t) => (
            <span
              key={t.id}
              className="text-xs font-mono px-2 py-0.5 border border-zinc-800 text-zinc-500 rounded-sm"
            >
              {t.name}
            </span>
          ))}
        </div>

        {/* Links row */}
        <div className="flex gap-4 mt-4 pt-4 border-t border-zinc-800">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs font-mono text-zinc-600 hover:text-emerald-400 transition-colors"
            >
              GitHub ↗
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs font-mono text-zinc-600 hover:text-emerald-400 transition-colors"
            >
              Live ↗
            </a>
          )}
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs font-mono text-zinc-600 hover:text-emerald-400 transition-colors"
            >
              Demo ↗
            </a>
          )}
        </div>
      </div>
    </Link>
  );
}

// ── Skeleton ──────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="border border-zinc-800 rounded-sm overflow-hidden animate-pulse">
          <div className="aspect-video bg-zinc-900" />
          <div className="p-6 space-y-3">
            <div className="h-4 bg-zinc-800 rounded w-3/4" />
            <div className="h-3 bg-zinc-800 rounded w-full" />
            <div className="h-3 bg-zinc-800 rounded w-2/3" />
            <div className="flex gap-2 mt-4">
              <div className="h-5 bg-zinc-800 rounded w-16" />
              <div className="h-5 bg-zinc-800 rounded w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────
export default function ProjectsPage() {
  const { projects, loading, error } = useProjects();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // collect all unique tags
  const allTags = Array.from(
    new Set(projects.flatMap((p) => p.tech_tags.map((t) => t.name)))
  ).sort();

  // filter projects by active tag
  const filtered = activeTag
    ? projects.filter((p) => p.tech_tags.some((t) => t.name === activeTag))
    : projects;

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">
          Work
        </p>
        <h1 className="text-3xl font-bold text-zinc-100 mb-3">Projects</h1>
        <p className="text-zinc-500 text-sm max-w-xl">
          A selection of projects I have worked on...
        </p>
      </div>

      {/* Tag filter */}
      {!loading && allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveTag(null)}
            className={`text-xs font-mono px-3 py-1.5 rounded-sm border transition-colors duration-200 ${
              activeTag === null
                ? "border-emerald-500 text-emerald-400 bg-emerald-950/30"
                : "border-zinc-700 text-zinc-500 hover:border-zinc-500"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`text-xs font-mono px-3 py-1.5 rounded-sm border transition-colors duration-200 ${
                activeTag === tag
                  ? "border-emerald-500 text-emerald-400 bg-emerald-950/30"
                  : "border-zinc-700 text-zinc-500 hover:border-zinc-500"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      {loading ? (
        <Skeleton />
      ) : error ? (
        <div className="border border-zinc-800 border-dashed rounded-sm p-12 text-center">
          <p className="text-zinc-600 text-sm font-mono">Could not load projects.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="border border-zinc-800 border-dashed rounded-sm p-12 text-center">
          <p className="text-zinc-600 text-sm font-mono">
            {activeTag ? `No projects tagged "${activeTag}".` : "Projects coming soon."}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
          <p className="text-xs font-mono text-zinc-600 mt-8">
            {filtered.length} project{filtered.length !== 1 ? "s" : ""}
            {activeTag ? ` tagged "${activeTag}"` : " total"}
          </p>
        </>
      )}
    </div>
  );
}