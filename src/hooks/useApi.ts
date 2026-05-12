import { useEffect, useState } from "react";
import api from "../api/client";
import type { Project, BlogPost, ResumeSection, ContactForm } from "../types";

// ── Projects ──────────────────────────────────────────────
export function useProjects(featured?: boolean) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get("/projects/", { params: featured ? { featured: true } : {} })
      .then((r) => setProjects(r.data.results ?? r.data))
      .catch(() => setError("Failed to load projects"))
      .finally(() => setLoading(false));
  }, [featured]);

  return { projects, loading, error };
}

export function useProject(slug: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get(`/projects/${slug}/`)
      .then((r) => setProject(r.data))
      .catch(() => setError("Project not found"))
      .finally(() => setLoading(false));
  }, [slug]);

  return { project, loading, error };
}

// ── Blog ──────────────────────────────────────────────────
export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get("/blog/")
      .then((r) => setPosts(r.data.results ?? r.data))
      .catch(() => setError("Failed to load posts"))
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading, error };
}

export function useBlogPost(slug: string) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get(`/blog/${slug}/`)
      .then((r) => setPost(r.data))
      .catch(() => setError("Post not found"))
      .finally(() => setLoading(false));
  }, [slug]);

  return { post, loading, error };
}

// ── Resume ─────────────────────────────────────────────────
export function useResume() {
  const [sections, setSections] = useState<ResumeSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get("/resume/")
      .then((r) => setSections(r.data.results ?? r.data))
      .catch(() => setError("Failed to load resume"))
      .finally(() => setLoading(false));
  }, []);

  return { sections, loading, error };
}

// ── Contact ────────────────────────────────────────────────
export async function sendContactMessage(data: ContactForm) {
  const response = await api.post("/contact/", data);
  return response.data;
}
