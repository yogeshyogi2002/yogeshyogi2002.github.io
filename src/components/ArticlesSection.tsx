import React, { useState } from 'react';
import { BookOpen, Clock, Tag, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { ARTICLES } from '../data/portfolioData';

interface ArticlesSectionProps {
  currentLang: Language;
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({ currentLang }) => {
  const [expandedId, setExpandedId] = useState<string | null>("art-1");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="articles" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <p className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
          {currentLang === 'de' ? '// FACHARTIKEL & ENGINEERING INSIGHTS' : '// ARTICLES & ENGINEERING INSIGHTS'}
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {currentLang === 'de' ? 'Praxisnahe Embedded Leitfäden' : 'Technical Insights & Engineering Notes'}
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          {currentLang === 'de'
            ? 'Tiefgehende Analysen zu CAN FD Bitraten-Timing, deterministischem Task-Scheduling unter FreeRTOS und Board-Bring-Up Methodik.'
            : 'Deep dives on CAN FD bit timing, deterministic FreeRTOS scheduling, and hands-on board bring-up methodologies.'}
        </p>
        <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full" />
      </div>

      {/* Articles Cards */}
      <div className="space-y-4">
        {ARTICLES.map((article) => {
          const isExpanded = expandedId === article.id;
          return (
            <div
              key={article.id}
              className="bg-[#111827]/80 rounded-2xl border border-slate-800 p-6 transition-all hover:border-amber-500/40 shadow-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer" onClick={() => toggleExpand(article.id)}>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-3 text-xs font-mono text-amber-400">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white hover:text-amber-300 transition-colors">
                    {article.title[currentLang]}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {article.summary[currentLang]}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2 sm:pt-0">
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    className="p-2 rounded-lg bg-slate-800 text-amber-400 hover:bg-slate-700 transition-colors shrink-0"
                    aria-label="Expand article"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expandable Key Takeaways */}
              {isExpanded && (
                <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-3 animate-in fade-in duration-200">
                  <h4 className="text-xs font-mono uppercase text-amber-400 font-semibold tracking-wider">
                    {currentLang === 'de' ? 'Kerneinsichten & Praxisempfehlungen' : 'Key Engineering Takeaways'}
                  </h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    {article.keyTakeaways[currentLang].map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
