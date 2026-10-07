import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight, Cpu, Layers } from 'lucide-react';
import { Language } from '../types';
import { EXPERIENCES } from '../data/portfolioData';

interface ExperienceSectionProps {
  currentLang: Language;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ currentLang }) => {
  const [filter, setFilter] = useState<'all' | 'industry' | 'academic' | 'internship'>('all');

  const filteredExperiences =
    filter === 'all' ? EXPERIENCES : EXPERIENCES.filter((exp) => exp.type === filter);

  return (
    <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <p className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
          {currentLang === 'de' ? '// BERUFLICHE STATIONEN & LAUFBAHN' : '// CAREER & RESUME TIMELINE'}
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {currentLang === 'de' ? 'Praktische Engineering-Erfahrung' : 'Professional Engineering Experience'}
        </h2>
        <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full" />
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-2 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
            filter === 'all'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          {currentLang === 'de' ? 'Alle Stationen' : 'All Roles'}
        </button>
        <button
          onClick={() => setFilter('industry')}
          className={`px-4 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
            filter === 'industry'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          {currentLang === 'de' ? 'Industrie & Steuergeräte' : 'Industry & ECUs'}
        </button>
        <button
          onClick={() => setFilter('academic')}
          className={`px-4 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
            filter === 'academic'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          {currentLang === 'de' ? 'Forschung @ HS Wismar' : 'Research @ HS Wismar'}
        </button>
        <button
          onClick={() => setFilter('internship')}
          className={`px-4 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
            filter === 'internship'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          {currentLang === 'de' ? 'Werkstudent / Praktikum' : 'Internship / Werkstudent'}
        </button>
      </div>

      {/* Timeline List */}
      <div className="relative border-l-2 border-amber-500/30 ml-4 sm:ml-8 space-y-10 pl-6 sm:pl-10">
        {filteredExperiences.map((exp, idx) => (
          <div
            key={exp.id}
            className="relative group bg-[#111827]/80 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-4 hover:border-amber-500/40 transition-all shadow-xl"
          >
            {/* Timeline Node Icon */}
            <div className="absolute -left-[35px] sm:-left-[51px] top-6 w-8 h-8 rounded-full bg-slate-950 border-2 border-amber-400 flex items-center justify-center text-amber-400 shadow-md group-hover:scale-110 transition-transform">
              <Briefcase className="w-3.5 h-3.5" />
            </div>

            {/* Header: Role, Company, Period */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  {exp.role[currentLang]}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
                  <span className="font-semibold text-amber-400">{exp.organization}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>{exp.location}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium">
                  <Calendar className="w-3 h-3" />
                  <span>{exp.period[currentLang]}</span>
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-sm leading-relaxed">
              {exp.description[currentLang]}
            </p>

            {/* Key Deliverables & Highlights */}
            <div className="space-y-2 pt-1">
              <h4 className="text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider">
                {currentLang === 'de' ? 'Wesentliche Projektschritte & Aufgaben' : 'Key Engineering Deliverables'}
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {exp.highlights[currentLang].map((hl, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack & Standards Chips */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono text-slate-400 mr-1">Stack:</span>
              {exp.techStack.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-[11px] font-mono text-amber-300"
                >
                  {tech}
                </span>
              ))}

              {exp.standards && (
                <div className="flex flex-wrap gap-1.5 ml-auto">
                  {exp.standards.map((std, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-bold"
                    >
                      {std}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
