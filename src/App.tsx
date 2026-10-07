import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AvailabilityBanner } from './components/AvailabilityBanner';
import { AboutSection } from './components/AboutSection';
import { CanBusSimulator } from './components/CanBusSimulator';
import { LogicAnalyzerViewer } from './components/LogicAnalyzerViewer';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AwardsSection } from './components/AwardsSection';
import { ArticlesSection } from './components/ArticlesSection';
import { ContactSection } from './components/ContactSection';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';
import { Language } from './types';
import { Activity } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    if (typeof window !== 'undefined' && window.navigator) {
      return window.navigator.language?.startsWith('de') ? 'de' : 'en';
    }
    return 'en';
  });

  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Gated CV access state - remembers in session
  const [isCvUnlocked, setIsCvUnlocked] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        return sessionStorage.getItem('cv_unlocked') === 'true';
      } catch (e) {
        return false;
      }
    }
    return false;
  });

  const handleUnlockCv = () => {
    setIsCvUnlocked(true);
    try {
      sessionStorage.setItem('cv_unlocked', 'true');
    } catch (e) {
      // ignore
    }
  };

  const handleNavigateToContact = () => {
    setIsResumeOpen(false);
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-300">
      {/* Top Sticky Header */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          currentLang={currentLang}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* Werkstudent / Internship Callout Banner */}
        <AvailabilityBanner
          currentLang={currentLang}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* About & Technical Skills Matrix */}
        <AboutSection currentLang={currentLang} />

        {/* Live Embedded Engineering Lab (CAN Bus Monitor & Logic Analyzer) */}
        <section id="live-lab" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold flex items-center justify-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              <span>{currentLang === 'de' ? '// INTERAKTIVES HARDWARE- & BUS-LABOR' : '// INTERACTIVE HARDWARE & BUS LAB'}</span>
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {currentLang === 'de' ? 'Live Telemetrie & Signal-Verifikation' : 'Live Bus Telemetry & Waveform Inspector'}
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">
              {currentLang === 'de'
                ? 'Testen Sie interaktiv die Dekodierung automobiler CAN FD Frames und analysieren Sie Signalverläufe wie an einem Labor-Oszilloskop.'
                : 'Interact with automotive CAN FD frame decoding and inspect real-time waveforms as measured in an embedded hardware lab.'}
            </p>
            <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full" />
          </div>

          <div className="space-y-10">
            <CanBusSimulator currentLang={currentLang} />
            <LogicAnalyzerViewer currentLang={currentLang} />
          </div>
        </section>

        {/* Real Engineering Experience Timeline */}
        <ExperienceSection currentLang={currentLang} />

        {/* Technical Projects Portfolio */}
        <ProjectsSection currentLang={currentLang} />

        {/* Awards & Achievements */}
        <AwardsSection currentLang={currentLang} />

        {/* Technical Articles & Insights */}
        <ArticlesSection currentLang={currentLang} />

        {/* Direct Contact & Inquiry Form */}
        <ContactSection
          currentLang={currentLang}
          onUnlockCv={handleUnlockCv}
          onOpenCvModal={() => setIsResumeOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer currentLang={currentLang} />

      {/* Printable / Downloadable Resume Modal (Gated with Request Form) */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        currentLang={currentLang}
        isUnlocked={isCvUnlocked}
        onUnlock={handleUnlockCv}
        onRequestViaMailMe={handleNavigateToContact}
      />
    </div>
  );
}
