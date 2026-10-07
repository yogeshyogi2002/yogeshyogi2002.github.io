import React from 'react';
import { Cpu, Phone, Mail, Linkedin, MapPin, ArrowUp } from 'lucide-react';
import { Language } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080c14] border-t border-amber-500/20 pt-12 pb-8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          {/* Brand Info */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white font-mono">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-slate-400 text-xs max-w-md">
              {currentLang === 'de'
                ? 'Embedded Systems & Automotive ECU Validierungsingenieur • Hochschule Wismar, Deutschland'
                : 'Embedded Systems & Automotive ECU Validation Engineer • Hochschule Wismar, Germany'}
            </p>
          </div>

          {/* Contact Direct Links */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              className="flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{PERSONAL_INFO.phone}</span>
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>{PERSONAL_INFO.email}</span>
            </a>

            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-300 hover:text-blue-400 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-blue-400" />
              <span>LinkedIn Profile</span>
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 transition-colors ml-auto cursor-pointer"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name} — All Rights Reserved | Germany (DE - 2026)
          </div>
        </div>
      </div>
    </footer>
  );
};
