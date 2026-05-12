export interface TechTag {
  id: number;
  name: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  summary: string;
  description: string;
  image: string | null;
  tech_tags: TechTag[];
  github_url: string;
  live_url: string;
  demo_url: string;
  featured: boolean;
  order: number;
  created_at: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  published: boolean;
  created_at: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ResumeEntry {
  id: number;
  title: string;
  organisation: string;
  location: string;
  start_date: string;
  end_date: string | null;
  description: string;
  order: number;
}

export interface ResumeSection {
  id: number;
  section: "experience" | "education" | "skills" | "certifications";
  order: number;
  entries: ResumeEntry[];
}
