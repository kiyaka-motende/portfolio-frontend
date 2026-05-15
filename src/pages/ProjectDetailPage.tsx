import { useParams, Link } from "react-router-dom";
import { useProject } from "../hooks/useApi";

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { project, loading, error } = useProject(slug!);

  if (loading) {
    return (
      <div className="max-w-3xl animate-pulse space-y-6">
        <div className="h-3 bg-zinc-800 rounded w-24" />
        <div className="h-8 bg-zinc-800 rounded w-2/3" />
        <div className="aspect-video bg-zinc-900 rounded-sm" />
        <div className="space-y-3">
          <div className="h-3 bg-zinc-800 rounded w-full" />
          <div className="h-3 bg-zinc-800 rounded w-full" />
          <div className="h-3 bg-zinc-800 rounded w-3/4" />
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="max-w-3xl">
        <Link
          to="/projects"
          className="text-xs font-mono text-zinc-500 hover:text-emerald-400 transition-colors mb-8 inline-block"
        >
          ← Back to projects
        </Link>
        <div className="border border-zinc-800 border-dashed rounded-sm p-12 text-center">
          <p className="text-zinc-600 text-sm font-mono">Project not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">

      {/* Back link */}
      <Link
        to="/projects"
        className="text-xs font-mono text-zinc-500 hover:text-emerald-400 transition-colors mb-8 inline-block"
      >
        ← Back to projects
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-100 mb-3">{project.title}</h1>
        <p className="text-zinc-400 leading-relaxed">{project.summary}</p>
      </div>

      {/* Image */}
      {project.image && (
        <div className="aspect-video overflow-hidden rounded-sm bg-zinc-900 mb-8">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Links */}
      <div className="flex flex-wrap gap-3 mb-8">
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-700 hover:border-emerald-600 text-zinc-300 hover:text-emerald-400 text-xs font-mono rounded-sm transition-colors"
          >
            GitHub ↗
          </a>
        )}
        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs rounded-sm transition-colors"
          >
            Live Site ↗
          </a>
        )}
        {project.demo_url && (
          <a
            href={project.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-700 hover:border-emerald-600 text-zinc-300 hover:text-emerald-400 text-xs font-mono rounded-sm transition-colors"
          >
            Live Demo ↗
          </a>
        )}
      </div>

      <div className="border-t border-zinc-800 mb-8" />

      {/* Tech tags */}
      {project.tech_tags.length > 0 && (
        <div className="mb-8">
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech_tags.map((t) => (
              <span
                key={t.id}
                className="text-xs font-mono px-3 py-1 border border-zinc-700 text-zinc-400 rounded-sm"
              >
                {t.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      {project.description && (
        <div className="mb-8">
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">
            About this project
          </p>
          <div className="text-zinc-400 leading-relaxed text-sm whitespace-pre-line">
            {project.description}
          </div>
        </div>
      )}

      {/* Footer nav */}
      <div className="border-t border-zinc-800 pt-8 mt-12">
        <Link
          to="/projects"
          className="text-xs font-mono text-zinc-500 hover:text-emerald-400 transition-colors"
        >
          ← All projects
        </Link>
      </div>

    </div>
  );
}