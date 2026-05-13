import { useResume } from "../hooks/useApi";
import type { ResumeSection, ResumeEntry } from "../types";

// ── Helpers ───────────────────────────────────────────────
function formatDate(dateStr: string | null): string {
  if (!dateStr) return "Present";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-KE", { month: "short", year: "numeric" });
}

function duration(start: string, end: string | null): string {
  const s = new Date(start);
  const e = end ? new Date(end) : new Date();
  const months =
    (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
  if (months < 12) return `${months}mo`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  return rem > 0 ? `${years}y ${rem}mo` : `${years}y`;
}

// ── Entry card ────────────────────────────────────────────
function EntryCard({ entry }: { entry: ResumeEntry }) {
  return (
    <div className="group relative pl-6 border-l border-zinc-800 hover:border-emerald-800 transition-colors duration-300">
      {/* timeline dot */}
      <span className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-zinc-700 bg-zinc-950 group-hover:border-emerald-500 transition-colors duration-300" />

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
        <div>
          <h3 className="font-semibold text-zinc-100 text-sm">{entry.title}</h3>
          <p className="text-sm text-emerald-500 font-mono">{entry.organisation}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs font-mono text-zinc-500">
            {formatDate(entry.start_date)} — {formatDate(entry.end_date)}
          </p>
          <p className="text-xs font-mono text-zinc-600">
            {duration(entry.start_date, entry.end_date)}
          </p>
          {entry.location && (
            <p className="text-xs text-zinc-600">{entry.location}</p>
          )}
        </div>
      </div>

      {entry.description && (
        <p className="text-sm text-zinc-500 leading-relaxed mt-2 mb-4">
          {entry.description}
        </p>
      )}
    </div>
  );
}

// ── Section ───────────────────────────────────────────────
function Section({ section }: { section: ResumeSection }) {
  const labels: Record<string, string> = {
    experience: "Experience",
    education: "Education",
    skills: "Skills",
    certifications: "Certifications",
  };

  return (
    <div>
      <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6">
        {labels[section.section] ?? section.section}
      </h2>
      <div className="space-y-6">
        {section.entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}

// ── Skeleton ──────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="space-y-12">
      {[1, 2].map((s) => (
        <div key={s}>
          <div className="h-3 bg-zinc-800 rounded w-24 mb-6 animate-pulse" />
          <div className="space-y-6">
            {[1, 2, 3].map((e) => (
              <div key={e} className="pl-6 border-l border-zinc-800 space-y-2 animate-pulse">
                <div className="h-4 bg-zinc-800 rounded w-48" />
                <div className="h-3 bg-zinc-800 rounded w-32" />
                <div className="h-3 bg-zinc-800 rounded w-full" />
                <div className="h-3 bg-zinc-800 rounded w-3/4" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────
export default function ResumePage() {
  const { sections, loading, error } = useResume();

  return (
    <div className="max-w-3xl">

      {/* Header */}
      <div className="mb-12">
        <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">
          Curriculum Vitae
        </p>
        <h1 className="text-3xl font-bold text-zinc-100 mb-2">
          Harold Kiyaka Motende
        </h1>
        <p className="text-zinc-400 font-mono text-sm mb-6">
          Systems Engineer · Data Developer · IoT Architect
        </p>

        {/* Contact row */}
        <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-500">
          <a href="https://www.linkedin.com/in/haroldgetenga-742352101" target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors">
            LinkedIn
          </a>
          <span>·</span>
          <span>Nairobi, Kenya</span>
          <span>·</span>
          <a
            href="https://github.com/kiyaka-motende"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors"
          >
            github.com/kiyaka-motende
          </a>
          <span>·</span>
          <a href="https://kiyaka-motende.dev" className="hover:text-emerald-400 transition-colors">
            kiyaka-motende.dev
          </a>
        </div>

        {/* Download button */}
        <div className="mt-6">
          <a
            href="/Harold_K_Motende-CV.pdf"
            download
            className="inline-flex items-center gap-2 px-5 py-2 border border-zinc-700 hover:border-emerald-600 text-zinc-300 hover:text-emerald-400 text-xs font-mono rounded-sm transition-colors duration-200"
          >
            ↓ Download PDF
          </a>
        </div>
      </div>

      <div className="border-t border-zinc-800 mb-12" />

      {/* Profile summary */}
      <div className="mb-12">
        <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">
          Profile
        </h2>
        <p className="text-zinc-400 leading-relaxed text-sm">
          Technology leader and systems engineer with extensive experience delivering IoT,
          data, and analytics solutions across conservation, utilities, and enterprise
          environments. Proven track record in systems architecture, BI, and data engineering,
          with strong hands-on expertise in SQL, Python, virtualization, and enterprise
          platforms. Skilled at translating business requirements into scalable,
          production-ready systems.
        </p>
      </div>

      {/* API-driven sections */}
      {loading ? (
        <Skeleton />
      ) : error ? (
        <div className="border border-zinc-800 border-dashed rounded-sm p-8 text-center">
          <p className="text-zinc-600 text-sm font-mono">Could not load resume data.</p>
        </div>
      ) : sections.length === 0 ? (
        /* Fallback static content when DB is empty */
        <div className="space-y-12">

          <div>
            <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6">
              Experience
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "Head of Technology Development",
                  org: "51 Degrees Ltd",
                  period: "Nov 2021 — Present",
                  desc: "Oversee implementation of EarthRanger, LoRaWAN IoT & BI Reporting solutions. Manage IT department, software development oversight, server systems and O365 user management.",
                },
                {
                  title: "IT & Technology Specialist",
                  org: "51 Degrees Ltd",
                  period: "Jul 2020 — Nov 2021",
                  desc: "Developed and commissioned bespoke DMS system. Designed Tableau reporting solutions across clientele. Managed device integrations and ER system rollouts.",
                },
                {
                  title: "Junior Systems Developer",
                  org: "Attain Enterprise Solutions",
                  period: "Jan 2019 — Jul 2020",
                  desc: "Designed and implemented ERP systems (Microsoft Dynamics NAV / D365BC) and Power BI solutions for enterprise clients.",
                },
              ].map((item) => (
                <div key={item.title} className="group relative pl-6 border-l border-zinc-800 hover:border-emerald-800 transition-colors duration-300">
                  <span className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-zinc-700 bg-zinc-950 group-hover:border-emerald-500 transition-colors duration-300" />
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 mb-1">
                    <div>
                      <h3 className="font-semibold text-zinc-100 text-sm">{item.title}</h3>
                      <p className="text-sm text-emerald-500 font-mono">{item.org}</p>
                    </div>
                    <p className="text-xs font-mono text-zinc-500 shrink-0">{item.period}</p>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed mt-2 mb-4">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6">
              Education
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "B.Sc. Electrical & Telecommunications Engineering",
                  org: "Multimedia University of Kenya",
                  period: "Sept 2013 — May 2018",
                  desc: "Upper Second Class Honours · GPA 69.92",
                },
              ].map((item) => (
                <div key={item.title} className="group relative pl-6 border-l border-zinc-800 hover:border-emerald-800 transition-colors duration-300">
                  <span className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-zinc-700 bg-zinc-950 group-hover:border-emerald-500 transition-colors duration-300" />
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 mb-1">
                    <div>
                      <h3 className="font-semibold text-zinc-100 text-sm">{item.title}</h3>
                      <p className="text-sm text-emerald-500 font-mono">{item.org}</p>
                    </div>
                    <p className="text-xs font-mono text-zinc-500 shrink-0">{item.period}</p>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed mt-2 mb-4">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6">
              Certifications
            </h2>
            <div className="space-y-6">
              {[
                { title: "Cisco Certified Network Administrator (CCNA)", org: "Africa Advanced Level Telecommunications Institute" },
                { title: "MCSA: BI Reporting", org: "Microsoft" },
              ].map((item) => (
                <div key={item.title} className="group relative pl-6 border-l border-zinc-800 hover:border-emerald-800 transition-colors duration-300">
                  <span className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-zinc-700 bg-zinc-950 group-hover:border-emerald-500 transition-colors duration-300" />
                  <h3 className="font-semibold text-zinc-100 text-sm mb-1">{item.title}</h3>
                  <p className="text-sm text-emerald-500 font-mono mb-4">{item.org}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* API-driven content */
        <div className="space-y-12">
          {sections.map((section) => (
            <Section key={section.id} section={section} />
          ))}
        </div>
      )}

      {/* Skills grid — always shown -->*/}
      <div className="mt-12 border-t border-zinc-800 pt-12">
        <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6">
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          {[
            { label: "Software & Web", skills: "Django, React, TypeScript, SharePoint SPfx, D365BC, Power Platform" },
            { label: "Data & Analytics", skills: "Power BI, Tableau, Panel, Apache Airflow, SSIS, T-SQL, DAX, Power Query" },
            { label: "Databases", skills: "PostgreSQL, MSSQL, SQLite" },
            { label: "Infrastructure", skills: "Hyper-V, VMware ESXi, XCP-NG, Docker, Ubuntu Server, AlmaLinux, Windows Server" },
            { label: "IoT & Networking", skills: "LoRaWAN, MikroTik RouterOS, Cisco Meraki L2/L3, LinkPlanner, CloudRF" },
            { label: "GIS & Mapping", skills: "QGIS, Google Earth, EarthRanger, Actility Admin" },
          ].map(({ label, skills }) => (
            <div key={label}>
              <p className="text-xs font-mono text-zinc-600 uppercase tracking-wider mb-1">{label}</p>
              <p className="text-zinc-400 text-sm leading-relaxed">{skills}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}