import React, { useState } from 'react';
import { Layers, ArrowUpRight, Cpu, Zap, Activity, CheckCircle2, X, Code, ShieldCheck } from 'lucide-react';
import { Language, Project, ProjectCategory } from '../types';
import { PROJECTS } from '../data/portfolioData';

interface ProjectsSectionProps {
  currentLang: Language;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ currentLang }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all' as ProjectCategory, label: currentLang === 'de' ? 'Alle Projekte' : 'All Projects' },
    { id: 'robotics' as ProjectCategory, label: currentLang === 'de' ? 'Robotik & Navigation' : 'Robotics & Navigation' },
    { id: 'embedded' as ProjectCategory, label: currentLang === 'de' ? 'Embedded & RTOS' : 'Embedded & RTOS' },
    { id: 'automotive' as ProjectCategory, label: currentLang === 'de' ? 'Automotive & ECU' : 'Automotive & ECU' },
    { id: 'power_electronics' as ProjectCategory, label: currentLang === 'de' ? 'BMS & Leistungselektronik' : 'BMS & Power Electronics' },
  ];

  // Display order follows the category tabs: robotics → embedded → automotive → power electronics
  const categoryRank = (c: ProjectCategory) => {
    const idx = categories.findIndex((cat) => cat.id === c);
    return idx === -1 ? categories.length : idx;
  };
  const orderedProjects = [...PROJECTS].sort((a, b) => categoryRank(a.category) - categoryRank(b.category));

  const filteredProjects =
    selectedCategory === 'all'
      ? orderedProjects
      : orderedProjects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <p className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
          {currentLang === 'de' ? '// TECHNISCHE PROJEKTE & SYSTEMARCHITEKTUR' : '// TECHNICAL PROJECTS & PORTFOLIO'}
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {currentLang === 'de' ? 'Ausgewählte Embedded-, Automotive- & Robotik-Projekte' : 'Featured Embedded, Automotive & Robotics Systems'}
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          {currentLang === 'de'
            ? 'Hardwarenahe Softwareentwicklung, deterministisches Echtzeit-Routing, Batteriemanagementsysteme und funktionale Sicherheit nach ISO 26262.'
            : 'Low-level driver development, deterministic real-time routing, battery management systems, and ISO 26262 functional safety.'}
        </p>
        <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full" />
      </div>

      {/* Category Filter */}
      <div className="flex justify-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5 2xl:gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group bg-[#111827]/80 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between space-y-5 hover:border-amber-500/40 transition-all hover:-translate-y-1 shadow-xl"
          >
            <div className="space-y-3">
              {/* Category & Tag Bar */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-mono font-semibold uppercase">
                  {project.category.replace('_', ' ')}
                </span>
                <span className="text-slate-500 text-xs font-mono">
                  {project.standards[0] || 'Embedded'}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                {project.title}
              </h3>

              {/* Subtitle */}
              <p className="text-xs text-amber-400/90 font-mono">
                {project.subtitle[currentLang]}
              </p>

              {/* Summary */}
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                {project.summary[currentLang]}
              </p>

              {/* Metrics Highlights */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                {project.metrics.slice(0, 2).map((m, mIdx) => (
                  <div key={mIdx} className="p-2 rounded bg-slate-900/90 border border-slate-800 text-center">
                    <span className="block text-amber-400 font-mono font-bold text-xs">{m.value}</span>
                    <span className="text-[10px] text-slate-400">{m.label}</span>
                  </div>
                ))}
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.slice(0, 4).map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Inspect Button */}
            <div className="pt-2">
              <button
                onClick={() => setActiveModalProject(project)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 text-slate-200 hover:text-amber-300 text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>{currentLang === 'de' ? 'Architektur & Details prüfen' : 'Inspect Architecture & Specs'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Deep-Dive Project Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0f172a] rounded-2xl border-2 border-amber-500/50 max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl shadow-black relative">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 pr-10">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold">
                SYSTEM DEEP-DIVE
              </span>
              <h3 className="text-2xl font-bold text-white">
                {activeModalProject.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-mono">
                {activeModalProject.subtitle[currentLang]}
              </p>
            </div>

            {/* Challenge & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <span className="text-xs font-mono text-amber-400 font-semibold uppercase">
                  {currentLang === 'de' ? 'Herausforderung' : 'Engineering Challenge'}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeModalProject.challenge[currentLang]}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">
                  {currentLang === 'de' ? 'Architektur-Lösung' : 'Architectural Solution'}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeModalProject.solution[currentLang]}
                </p>
              </div>
            </div>

            {/* Architecture Blocks */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-slate-400 uppercase font-semibold">
                {currentLang === 'de' ? 'Systemarchitektur & Komponenten' : 'System Architecture & Components'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeModalProject.architecture.map((arch, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start gap-2 text-xs text-slate-300">
                    <Cpu className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{arch}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hardware Specs & Metrics */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-slate-400 uppercase font-semibold">
                {currentLang === 'de' ? 'Hardware-Spezifikationen & Timing' : 'Hardware Specs & Timing Metrics'}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {activeModalProject.hardwareSpecs.map((spec, sIdx) => (
                  <div key={sIdx} className="p-2.5 rounded bg-slate-950 border border-slate-800 text-center">
                    <span className="block text-slate-400 text-[10px]">{spec.label}</span>
                    <span className="text-amber-300 font-mono font-bold text-xs">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Validated Results */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-slate-400 uppercase font-semibold">
                {currentLang === 'de' ? 'Messergebnisse' : 'Measured Results'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {activeModalProject.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="p-2.5 rounded bg-slate-950 border border-emerald-500/20 text-center">
                    <span className="block text-slate-400 text-[10px]">{m.label}</span>
                    <span className="text-emerald-300 font-mono font-bold text-xs">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Protocols & Standards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-slate-400 uppercase font-semibold">
                  {currentLang === 'de' ? 'Protokolle & Schnittstellen' : 'Protocols & Interfaces'}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalProject.protocols.map((p) => (
                    <span key={p} className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-[11px] font-mono text-slate-300">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-slate-400 uppercase font-semibold">
                  {currentLang === 'de' ? 'Normen & Richtlinien' : 'Standards & Guidelines'}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalProject.standards.map((s) => (
                    <span key={s} className="px-2 py-1 rounded bg-amber-500/5 border border-amber-500/30 text-[11px] font-mono text-amber-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Code Snippet if present */}
            {activeModalProject.codeSnippet && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-amber-400" />
                    <span>{activeModalProject.codeSnippet.filename}</span>
                  </span>
                  <span className="text-slate-500 uppercase">
                    {activeModalProject.codeSnippet.language === 'c'
                      ? 'C99 · MISRA C:2012 guided'
                      : activeModalProject.codeSnippet.language === 'cpp'
                        ? 'C++17'
                        : activeModalProject.codeSnippet.language}
                  </span>
                </div>
                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-200 overflow-x-auto">
                  <code>{activeModalProject.codeSnippet.code}</code>
                </pre>
              </div>
            )}

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs font-mono">
              <div className="flex items-center gap-2 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified in Laboratory & Test Bench</span>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors cursor-pointer"
              >
                {currentLang === 'de' ? 'Schließen' : 'Close Deep-Dive'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
