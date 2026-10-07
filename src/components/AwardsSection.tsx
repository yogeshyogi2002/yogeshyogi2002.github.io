import React from 'react';
import { Trophy, Award, Star, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { AWARDS } from '../data/portfolioData';

interface AwardsSectionProps {
  currentLang: Language;
}

export const AwardsSection: React.FC<AwardsSectionProps> = ({ currentLang }) => {
  return (
    <section id="awards" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <p className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
          {currentLang === 'de' ? '// WETTBEWERBE & AUSZEICHNUNGEN' : '// RECOGNITION & COMPETITIONS'}
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {currentLang === 'de' ? 'Auszeichnungen & Erfolge' : 'Awards & Achievements'}
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          {currentLang === 'de'
            ? 'Anerkannt für herausragende Innovationen in der Elektrofahrzeug-Architektur, Kostenoptimierung und akademische Spitzenleistungen.'
            : 'Recognized for innovation in electric vehicle architecture, embedded platform engineering, and academic excellence.'}
        </p>
        <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full" />
      </div>

      {/* Awards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {AWARDS.map((award) => (
          <div
            key={award.id}
            className="relative bg-gradient-to-b from-[#111827] to-[#0c121e] rounded-2xl border border-amber-500/30 p-6 sm:p-7 space-y-4 shadow-xl hover:border-amber-400 transition-all hover:-translate-y-1 group"
          >
            {/* Top Badge */}
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:rotate-6 transition-transform">
                <Trophy className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-mono font-bold text-xs shadow">
                {award.badge}
              </span>
            </div>

            {/* Title & Event */}
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                {award.title[currentLang]}
              </h3>
              <p className="text-xs font-semibold text-amber-400/90 font-mono">
                {award.event}
              </p>
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span>{award.organizer}</span>
                <span className="font-mono">{award.year}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
              {award.description[currentLang]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
