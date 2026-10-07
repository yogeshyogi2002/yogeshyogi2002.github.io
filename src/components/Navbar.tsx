import React, { useState, useEffect } from 'react';
import { Cpu, Globe, FileText, Send, Menu, X, ChevronRight } from 'lucide-react';
import { Language } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onOpenResume,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'live-lab', 'awards', 'articles', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: currentLang === 'de' ? 'Start' : 'Home' },
    { id: 'about', label: currentLang === 'de' ? 'Über mich' : 'About' },
    { id: 'experience', label: currentLang === 'de' ? 'Erfahrung' : 'Experience' },
    { id: 'projects', label: currentLang === 'de' ? 'Projekte' : 'Projects' },
    { id: 'live-lab', label: currentLang === 'de' ? 'Live-Labor' : 'Live Lab' },
    { id: 'awards', label: currentLang === 'de' ? 'Erfolge' : 'Awards' },
    { id: 'contact', label: currentLang === 'de' ? 'Kontakt' : 'Contact' },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="top-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#090d16]/90 backdrop-blur-md border-b border-amber-500/20 shadow-lg shadow-black/40 py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand & Status */}
        <div className="flex items-center gap-3">
          <button
            id="brand-logo-btn"
            onClick={() => scrollTo('home')}
            className="flex items-center gap-2.5 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/40 flex items-center justify-center group-hover:border-amber-400 transition-colors shadow-sm shadow-amber-500/10">
              <Cpu className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white group-hover:text-amber-300 transition-colors">
                {PERSONAL_INFO.preferredName}
              </span>
              <span className="hidden sm:block text-xs font-mono text-amber-400/80">
                Embedded & Automotive
              </span>
            </div>
          </button>

          {/* Availability Pulse Badge */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{currentLang === 'de' ? 'Offen für Werkstudent / Praktikum / Masterarbeit' : 'Open for Werkstudent / Internship / Thesis'}</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => scrollTo(link.id)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'text-amber-300 bg-amber-500/15 border border-amber-500/30 shadow-sm shadow-amber-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Lang Switcher + CV Button + Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <div className="flex items-center bg-slate-900/80 border border-slate-700/80 rounded-lg p-0.5 text-xs font-mono">
            <button
              id="lang-btn-en"
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 rounded transition-all cursor-pointer ${
                currentLang === 'en'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Switch to English"
            >
              EN
            </button>
            <button
              id="lang-btn-de"
              onClick={() => onLanguageChange('de')}
              className={`px-2 py-1 rounded transition-all cursor-pointer ${
                currentLang === 'de'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Auf Deutsch umschalten"
            >
              DE
            </button>
          </div>

          {/* Resume CTA */}
          <button
            id="nav-resume-btn"
            onClick={onOpenResume}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-900 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{currentLang === 'de' ? 'Lebenslauf' : 'Resume / CV'}</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            id="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="md:hidden bg-[#0a0e17] border-b border-amber-500/20 px-4 pt-3 pb-5 shadow-2xl space-y-2 animate-in slide-in-from-top duration-200"
        >
          <div className="flex items-center gap-2 pb-2 mb-2 border-b border-slate-800 text-xs text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{currentLang === 'de' ? 'Verfügbar für Werkstudent / Praktikum / Masterarbeit' : 'Available for Werkstudent / Internship / Master Thesis'}</span>
          </div>

          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm text-left text-slate-200 hover:bg-slate-800/80 hover:text-amber-300 transition-colors"
            >
              <span>{link.label}</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          ))}

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-slate-950 bg-amber-400 flex items-center justify-center gap-2 shadow"
            >
              <FileText className="w-4 h-4" />
              <span>{currentLang === 'de' ? 'Lebenslauf ansehen' : 'View Resume / CV'}</span>
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-white bg-slate-800 border border-slate-700 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-amber-400" />
              <span>{currentLang === 'de' ? 'Nachricht senden' : 'Get In Touch'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
