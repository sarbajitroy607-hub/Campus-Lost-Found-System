import React from "react";
import { Award, Braces, Code2, Database, Heart, Server, Sparkles } from "lucide-react";
import Navbar from "../../components/navbar/navbar.jsx";
import Sidebar from "../../components/sidebar/sidebar.jsx";

const technologyGroups = [
  { title: "Frontend", icon: Code2, technologies: ["React", "React DOM", "React Router", "Vite", "Tailwind CSS", "@tailwindcss/vite", "@fontsource-variable/geist", "lucide-react", "shadcn", "Radix UI", "class-variance-authority", "clsx", "tailwind-merge", "tw-animate-css", "next-themes", "sonner", "three"] },
  { title: "Client Data & Forms", icon: Braces, technologies: ["@tanstack/react-query", "@tanstack/react-query-devtools", "axios", "js-cookie", "react-hook-form", "@hookform/resolvers", "Zod"] },
  { title: "Backend & APIs", icon: Server, technologies: ["Node.js", "Express", "cors", "dotenv", "cross-env", "Multer", "express-validator", "http-status-codes", "jsonwebtoken", "bcrypt", "Morgan", "Winston", "express-winston", "Swagger JSDoc", "Swagger UI Express"] },
  { title: "Database & Tooling", icon: Database, technologies: ["MongoDB", "Mongoose", "mongodb", "Nodemon", "ESLint", "@eslint/js", "eslint-plugin-react-hooks", "eslint-plugin-react-refresh", "@vitejs/plugin-react", "@types/node", "@types/react", "@types/react-dom"] },
];

const Credits = () => (
  <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100">
    <Navbar />
    <Sidebar />
    <main className="flex-1 min-w-0 p-4 pt-8 md:p-8 lg:p-10">
      <section className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-violet-700 to-purple-800 px-6 py-12 text-white shadow-2xl md:px-12 md:py-16">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-fuchsia-300/15 blur-3xl" />
        <div className="relative max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur"><Sparkles size={16} /> Project Credits</div>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">Built to help campus communities reconnect.</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-indigo-100 md:text-lg">Campus Lost &amp; Found brings reports, matches, and claims into one thoughtful experience.</p>
        </div>
      </section>

      <section className="mx-auto -mt-8 max-w-5xl px-3 md:px-8">
        <div className="rounded-3xl border border-white/80 bg-white/90 p-6 shadow-xl backdrop-blur md:p-8">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-200"><Award size={30} /></div>
            <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500">Designed &amp; Developed By</p><h2 className="mt-1 text-3xl font-bold text-slate-800">Sarbajit Roy &amp; Sauharja Nath</h2><p className="mt-1 text-slate-500">B.Tech CSE, 3rd Year</p></div>
            <div className="inline-flex items-center gap-2 rounded-xl bg-rose-50 px-4 py-2 text-sm font-medium text-rose-600 sm:ml-auto"><Heart size={16} className="fill-current" /> Made with care</div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-6xl">
        <div className="mb-6 text-center"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500">Technology Stack</p><h2 className="mt-2 text-3xl font-bold text-slate-800">Everything powering this project</h2><p className="mt-2 text-slate-500">Listed from the project&apos;s installed application and development dependencies.</p></div>
        <div className="grid gap-5 md:grid-cols-2">
          {technologyGroups.map(({ title, icon: Icon, technologies }) => (
            <article key={title} className="rounded-3xl border border-white bg-white/85 p-6 shadow-lg shadow-indigo-100/60 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-5 flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><Icon size={21} /></div><h3 className="text-xl font-bold text-slate-800">{title}</h3></div>
              <div className="flex flex-wrap gap-2">{technologies.map((technology) => <span key={technology} className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700">{technology}</span>)}</div>
            </article>
          ))}
        </div>
      </section>
      <footer className="mx-auto max-w-6xl py-10 text-center text-sm text-slate-500"><span className="font-semibold text-indigo-600">Campus Lost &amp; Found</span> · Built for a more helpful campus.</footer>
    </main>
  </div>
);

export default Credits;
