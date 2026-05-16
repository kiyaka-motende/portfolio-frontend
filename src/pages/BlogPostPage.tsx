import { useParams, Link } from "react-router-dom";
import { useBlogPost } from "../hooks/useApi";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { post, loading, error } = useBlogPost(slug!);

  if (loading) {
    return (
      <div className="max-w-2xl animate-pulse space-y-6">
        <div className="h-3 bg-zinc-800 rounded w-24" />
        <div className="h-8 bg-zinc-800 rounded w-3/4" />
        <div className="h-3 bg-zinc-800 rounded w-32" />
        <div className="space-y-3 mt-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-3 bg-zinc-800 rounded w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-2xl">
        <Link
          to="/blog"
          className="text-xs font-mono text-zinc-500 hover:text-emerald-400 transition-colors mb-8 inline-block"
        >
          ← Back to blog
        </Link>
        <div className="border border-zinc-800 border-dashed rounded-sm p-12 text-center">
          <p className="text-zinc-600 text-sm font-mono">Post not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">

      {/* Back */}
      <Link
        to="/blog"
        className="text-xs font-mono text-zinc-500 hover:text-emerald-400 transition-colors mb-10 inline-block"
      >
        ← Back to blog
      </Link>

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-mono text-zinc-600 mb-3">
          {formatDate(post.created_at)}
        </p>
        <h1 className="text-3xl font-bold text-zinc-100 mb-4">{post.title}</h1>
        <p className="text-zinc-400 leading-relaxed">{post.excerpt}</p>
      </div>

      {/* Cover image */}
      {post.cover_image && (
        <div className="aspect-video overflow-hidden rounded-sm bg-zinc-900 mb-10">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="border-t border-zinc-800 mb-10" />

      {/* Content */}
      <div className="prose prose-invert prose-zinc prose-sm max-w-none
        prose-headings:font-semibold prose-headings:text-zinc-100
        prose-p:text-zinc-400 prose-p:leading-relaxed
        prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline
        prose-code:text-emerald-300 prose-code:bg-zinc-900 prose-code:px-1 prose-code:rounded
        prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800
        prose-blockquote:border-emerald-500 prose-blockquote:text-zinc-400
        prose-strong:text-zinc-200
        prose-hr:border-zinc-800">
        {/* Render content — assumes plain text or markdown */}
        {post.content.split("\n").map((line, i) => (
          line.trim() === "" ? <br key={i} /> : <p key={i}>{line}</p>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-800 pt-8 mt-12">
        <Link
          to="/blog"
          className="text-xs font-mono text-zinc-500 hover:text-emerald-400 transition-colors"
        >
          ← All posts
        </Link>
      </div>

    </div>
  );
}