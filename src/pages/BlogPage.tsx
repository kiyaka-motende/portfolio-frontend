import { Link } from "react-router-dom";
import { useBlogPosts } from "../hooks/useApi";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Skeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border-b border-zinc-800 pb-6 animate-pulse space-y-3">
          <div className="h-3 bg-zinc-800 rounded w-24" />
          <div className="h-5 bg-zinc-800 rounded w-2/3" />
          <div className="h-3 bg-zinc-800 rounded w-full" />
          <div className="h-3 bg-zinc-800 rounded w-3/4" />
        </div>
      ))}
    </div>
  );
}

export default function BlogPage() {
  const { posts, loading, error } = useBlogPosts();

  return (
    <div className="max-w-2xl">

      {/* Header */}
      <div className="mb-12">
        <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">
          Writing
        </p>
        <h1 className="text-3xl font-bold text-zinc-100 mb-3">Blog</h1>
        <p className="text-zinc-500 text-sm">
          Thoughts on systems engineering, data, IoT, and building technology
          in East Africa.
        </p>
      </div>

      {/* Posts */}
      {loading ? (
        <Skeleton />
      ) : error ? (
        <div className="border border-zinc-800 border-dashed rounded-sm p-12 text-center">
          <p className="text-zinc-600 text-sm font-mono">Could not load posts.</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="border border-zinc-800 border-dashed rounded-sm p-12 text-center space-y-3">
          <p className="text-zinc-400 text-sm font-semibold">Coming soon.</p>
          <p className="text-zinc-600 text-xs font-mono max-w-sm mx-auto">
            Writing about IoT systems, data engineering, and building
            technology across East Africa.
          </p>
        </div>
      ) : (
        <div className="space-y-0">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group block border-b border-zinc-800 py-8 hover:bg-zinc-900/20 -mx-4 px-4 transition-colors duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-xs font-mono text-zinc-600 mb-2">
                    {formatDate(post.created_at)}
                  </p>
                  <h2 className="font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                <span className="text-zinc-600 group-hover:text-emerald-500 transition-colors shrink-0 mt-1">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

    </div>
  );
}