import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useProjects } from "../hooks/useApi";

// ── Skill pill ────────────────────────────────────────────
function Pill({ label }: { label: string }) {
  return (
    <span className="inline-block px-3 py-1 text-xs font-mono tracking-wide border border-zinc-700 text-zinc-400 rounded-sm hover:border-emerald-500 hover:text-emerald-400 transition-colors duration-200">
      {label}
    </span>
  );
}

// ── Skill group ───────────────────────────────────────────
function SkillGroup({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div>
      <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">{title}</p>
      <div className="flex flex-wrap gap-2">
        {skills.map((s) => <Pill key={s} label={s} />)}
      </div>
    </div>
  );
}

// ── Project card ──────────────────────────────────────────
function ProjectCard({ title, summary, slug, tech_tags }: {
  title: string;
  summary: string;
  slug: string;
  tech_tags: { id: number; name: string }[];
}) {
  return (
    <Link
      to={`/projects/${slug}`}
      className="group block border border-zinc-800 rounded-sm p-6 hover:border-zinc-600 transition-all duration-300 hover:bg-zinc-900/50"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors">
          {title}
        </h3>
        <span className="text-zinc-600 group-hover:text-emerald-500 transition-colors text-lg ml-4">↗</span>
      </div>
      <p className="text-sm text-zinc-500 leading-relaxed mb-4">{summary}</p>
      <div className="flex flex-wrap gap-2">
        {tech_tags.map((t) => (
          <span key={t.id} className="text-xs font-mono text-zinc-600">{t.name}</span>
        ))}
      </div>
    </Link>
  );
}

// ── Animated counter ──────────────────────────────────────
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l border-zinc-800 pl-6 first:border-l-0 first:pl-0">
      <p className="text-2xl font-bold text-zinc-100 font-mono">{value}</p>
      <p className="text-xs text-zinc-500 mt-1">{label}</p>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────
export default function HomePage() {
  const { projects, loading } = useProjects(true);
  const heroRef = useRef<HTMLDivElement>(null);

  // subtle parallax on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${window.scrollY * 0.08}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="space-y-24">

      {/* ── Hero ── */}
      <section className="pt-12 pb-4 relative overflow-hidden">
        {/* background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #10b981 1px, transparent 1px),
                              linear-gradient(to bottom, #10b981 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />

        <div ref={heroRef} className="relative">
          {/* availability badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-emerald-800 bg-emerald-950/30 rounded-sm mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400">Available for freelance work</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-zinc-100 leading-tight tracking-tight mb-2">
            Harold
          </h1>
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight tracking-tight mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
              Kiyaka Motende
            </span>
          </h1>

          <p className="text-lg text-zinc-400 font-mono mb-2">
            Systems Engineer · Data Developer · IoT Architect
          </p>

          <p className="text-zinc-500 max-w-xl leading-relaxed mt-4 mb-10">
            I build end-to-end systems — from IoT sensors and data pipelines to
            web applications — for conservation, utilities, and enterprise.
            Based in Nairobi, Kenya. 
          </p>
          <p className="text-zinc-500 max-w-xl leading-relaxed mt-4 mb-10">Let's connect and build something impactful together.</p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/projects"
              className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm rounded-sm transition-colors duration-200"
            >
              View Projects
            </Link>
            <Link
              to="/contact"
              className="px-6 py-2.5 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-zinc-100 text-sm rounded-sm transition-colors duration-200"
            >
              Get in touch
            </Link>
            <a
              href="https://github.com/kiyaka-motende"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-zinc-100 text-sm rounded-sm transition-colors duration-200"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section>
        <div className="flex flex-wrap gap-8">
          <StatItem value="6+" label="Years experience" />
          <StatItem value="10+" label="Enterprise projects" />
          <StatItem value="5+" label="Countries served" />
          <StatItem value="3" label="Core domains" />
        </div>
      </section>

      {/* ── Skills ── */}
      <section>
        <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-8">
          Expertise
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <SkillGroup
            title="Software & Web"
            skills={["Django", "React", "TypeScript", "SharePoint SPfx", "D365BC", "Power Platform"]}
          />
          <SkillGroup
            title="Data & Analytics"
            skills={["Power BI", "Tableau", "Panel", "Apache Airflow", "PostgreSQL", "MSSQL", "T-SQL", "MQTT","Node-Red", "Grafana", "InfluxDB", "TimescaleDB"]}
          />
                    <SkillGroup
            title="Infrastructure & IoT"
            skills={["LoRaWAN", "MikroTik", "Docker", "VMware", "Hyper-V", "Linux Based Servers", "XCP-NG", "Windows Server","GNS3"]}
          />
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            Featured Projects
          </h2>
          <Link
            to="/projects"
            className="text-xs font-mono text-zinc-500 hover:text-emerald-400 transition-colors"
          >
            All projects →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="border border-zinc-800 rounded-sm p-6 animate-pulse">
                <div className="h-4 bg-zinc-800 rounded w-3/4 mb-3" />
                <div className="h-3 bg-zinc-800 rounded w-full mb-2" />
                <div className="h-3 bg-zinc-800 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="border border-zinc-800 border-dashed rounded-sm p-12 text-center">
            <p className="text-zinc-600 text-sm font-mono">Projects coming soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((p) => (
              <ProjectCard key={p.id} {...p} />
            ))}
          </div>
        )}
      </section>

      {/* ── Notable work ── */}
      <section>
        <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-8">
          Notable Work
        </h2>
        <div className="space-y-3">
          {[
            { org: "Kenya Wildlife Services", desc: "Protected area management system rollout across 8 conservation areas" },
            { org: "Lewa Wildlife Conservancy", desc: "Protected area management system rollout + Data Analytics Dashboards + LoRaWAN IoT" },
            { org: "Loisaba Wildlife Conservancy", desc: "Protected area management system rollout + Data Analytics Dashboards + LoRaWAN IoT" },
            { org: "Ol Jogi Wildlife Conservancy", desc: "Protected area management system rollout + Data Analytics Dashboards + LoRaWAN IoT" },
            { org: "The David Sheldrick Wildlife Trust", desc: "Protected area management system rollout + Data Analytics Dashboards + LoRaWAN IoT" },
            { org: "UN-FAO", desc: "Data capture and management system for locust operation tracking in the Horn of Africa + Integrated Tableau Dashboards" },
            { org: "Kisumu Water & Sanitation Co.", desc: "Lead Developer for full ERP system (D365BC) covering payroll, receivables, inventory and HR" },
            { org: "Capital Markets Authority, Kenya", desc: "Lead Business Intelligence Developer" },
            { org: "Energy & Petroleum Regulatory Authority", desc: "Lead Business Intelligence Developer" },
          ].map(({ org, desc }) => (
            <div
              key={org}
              className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-3 border-b border-zinc-800/50 last:border-0"
            >
              <span className="text-sm font-medium text-zinc-300 sm:w-72 shrink-0">{org}</span>
              <span className="text-sm text-zinc-500">{desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border border-zinc-800 rounded-sm p-8 sm:p-12 text-center">
        <h2 className="text-xl font-semibold text-zinc-100 mb-3">
          Looking for a systems engineer?
        </h2>
        <p className="text-zinc-500 text-sm mb-6 max-w-md mx-auto">
          Whether it's a data pipeline, IoT integration, web application, or BI solution —
          let's talk about what you're building.
        </p>
        <Link
          to="/contact"
          className="inline-block px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm rounded-sm transition-colors duration-200"
        >
          Start a conversation
        </Link>
      </section>

    </div>
  );
}