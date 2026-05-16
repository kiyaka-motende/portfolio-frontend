import { Outlet, NavLink } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b border-zinc-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <NavLink to="/" className="font-semibold text-zinc-100 hover:text-emerald-400 transition-colors">
            KIYAKA-MOTENDE
          </NavLink>
          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <NavLink to="/projects" className={({ isActive }) => isActive ? "text-emerald-400" : "hover:text-zinc-100 transition-colors"}>
              Projects
            </NavLink>
            <NavLink to="/blog" className={({ isActive }) => isActive ? "text-emerald-400" : "hover:text-zinc-100 transition-colors"}>
              Blog
            </NavLink>
            <NavLink to="/resume" className={({ isActive }) => isActive ? "text-emerald-400" : "hover:text-zinc-100 transition-colors"}>
              Resume
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "text-emerald-400" : "hover:text-zinc-100 transition-colors"}>
              Contact
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        <Outlet />
      </main>

      <footer className="border-t border-zinc-800 px-6 py-6 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} kiyaka-motende
      </footer>
    </div>
  );
}