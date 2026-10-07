import React, { useState } from 'react';
import { GraduationCap, Award, ShieldCheck, CheckCircle2, Wrench, Code2, Car, Cpu } from 'lucide-react';
import { Language } from '../types';
import { PERSONAL_INFO, SKILL_CATEGORIES } from '../data/portfolioData';

interface AboutSectionProps {
  currentLang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ currentLang }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: currentLang === 'de' ? 'Alle Kompetenzen' : 'All Competencies' },
    ...SKILL_CATEGORIES.map((cat) => ({
      id: cat.id,
      label: cat.title[currentLang],
    })),
  ];

  const filteredCategories =
    selectedCategory === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.id === selectedCategory);

  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Section Header */}
      <div className="text-center space-y-3">
        <p className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
          {currentLang === 'de' ? '// ÜBER MEIN PROFIL' : '// LEARN ABOUT ME'}
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {currentLang === 'de' ? '2+ Jahre Erfahrung in Embedded & Automotive Systems' : '2+ Years of Embedded & Automotive Systems Experience'}
        </h2>
        <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full" />
      </div>

      {/* Main Grid: Bio & Academic Credentials */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Bio Card (7 Cols) */}
        <div className="lg:col-span-7 bg-[#111827]/80 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {currentLang === 'de' ? 'Ingenieursprofil & Kernkompetenzen' : 'Engineering Profile & Core Focus'}
              </h3>
              <p className="text-xs font-mono text-slate-400">
                Safety-Critical Systems & E/E Architecture
              </p>
            </div>
          </div>

          <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
            {PERSONAL_INFO.bio[currentLang]}
          </p>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <Car className="w-4 h-4" />
                <span>{currentLang === 'de' ? 'Automotive Steuergeräte' : 'Automotive ECUs'}</span>
              </div>
              <p className="text-xs text-slate-400">
                CAN / CAN FD, UDS (ISO 14229), Vector CANoe, HIL testing, bus load optimization.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <Code2 className="w-4 h-4" />
                <span>{currentLang === 'de' ? 'Firmware & RTOS' : 'Firmware & RTOS'}</span>
              </div>
              <p className="text-xs text-slate-400">
                Embedded C/C++, FreeRTOS, Zephyr, deterministic scheduling, DMA ring buffers.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <Cpu className="w-4 h-4" />
                <span>{currentLang === 'de' ? 'Hardware & Bring-Up' : 'Hardware & Bring-Up'}</span>
              </div>
              <p className="text-xs text-slate-400">
                JTAG/SWD, GDB, 4-ch DSOs, Logic Analyzers, PCB schematics, board bring-up.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <Wrench className="w-4 h-4" />
                <span>{currentLang === 'de' ? 'GUI & Regelungstechnik' : 'GUI & Power Control'}</span>
              </div>
              <p className="text-xs text-slate-400">
                TouchGFX, Qt Creator, AC-DC digital power conversion, TI C2000 DSP, PWM.
              </p>
            </div>
          </div>
        </div>

        {/* Academic Card (5 Cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#121a2d] to-[#0c121e] rounded-2xl border border-amber-500/30 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {currentLang === 'de' ? 'Akademische Ausbildung' : 'Academic Education'}
              </h3>
              <p className="text-xs font-mono text-amber-400">
                Hochschule Wismar, Germany
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-white text-base">
                  {PERSONAL_INFO.degree[currentLang]}
                </h4>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
                  {currentLang === 'de' ? 'Note: 1,7' : 'Grade: 1.7'}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">
                Hochschule Wismar – University of Applied Sciences, Technology, Business and Design
              </p>
              <div className="pt-2 text-xs text-slate-300 space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{currentLang === 'de' ? 'Schwerpunkt: Echtzeit-Embedded-Systeme & Leistungselektronik' : 'Focus: Real-Time Embedded Systems & Power Electronics'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{currentLang === 'de' ? 'AC-DC Digitale Regelung & DSP Algorithmen' : 'AC-DC Digital Control & DSP Algorithms'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{currentLang === 'de' ? 'Automotive HMI Prototyping mit TouchGFX & Qt' : 'Automotive HMI Prototyping with TouchGFX & Qt'}</span>
                </div>
              </div>
            </div>

            {/* Language Proficiencies */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h5 className="text-xs font-mono uppercase text-slate-400 font-semibold">
                {currentLang === 'de' ? 'Sprachkenntnisse' : 'Language Competencies'}
              </h5>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {PERSONAL_INFO.languages.map((lang, idx) => (
                  <div key={idx} className="p-2 rounded bg-slate-950/60 border border-slate-800">
                    <span className="text-white font-medium block">{lang.name}</span>
                    <span className="text-amber-400 font-mono">{lang.level[currentLang]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Technical Skills Matrix */}
      <div id="skills" className="space-y-6 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              {currentLang === 'de' ? '// TECHNISCHE EXPERTISE' : '// TECHNICAL CAPABILITIES'}
            </p>
            <h3 className="text-2xl font-bold text-white">
              {currentLang === 'de' ? 'Fachkompetenzen & Toolchains' : 'Proficiencies & Toolchains'}
            </h3>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-[#111827]/70 rounded-2xl border border-slate-800/80 p-5 space-y-4 hover:border-amber-500/30 transition-colors"
            >
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <h4 className="font-bold text-white text-sm tracking-wide">
                  {category.title[currentLang]}
                </h4>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-200">{skill.name}</span>
                      <span className="font-mono text-amber-400 font-bold">{skill.level}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-700"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-slate-400 leading-snug">
                      {skill.note[currentLang]}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {skill.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
