import React, { useState, useEffect } from 'react';
import { Cpu, Terminal, ArrowRight, Download, Activity, CheckCircle2, MapPin, Award, Radio } from 'lucide-react';
import { Language } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  currentLang: Language;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onOpenResume }) => {
  const titles = PERSONAL_INFO.titles[currentLang];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = titles[currentTitleIndex];
    const typingSpeed = isDeleting ? 30 : 60;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < fullText.length) {
          setDisplayedText(fullText.slice(0, displayedText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(fullText.slice(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentTitleIndex, titles]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-24 pb-16 flex items-center justify-center overflow-hidden"
    >
      {/* High-Tech Circuit Board Background Pattern (SVGs inspired by gradient.png) */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="goldCopperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#d97706" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="cyanDataGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Circuit Traces */}
          <path
            d="M 100,50 L 300,50 L 380,130 L 700,130 L 780,210 L 1100,210 L 1180,290 L 1400,290"
            stroke="url(#goldCopperGrad)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M 50,180 L 220,180 L 290,250 L 520,250 L 590,320 L 950,320 L 1020,390 L 1400,390"
            stroke="url(#goldCopperGrad)"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M 200,850 L 450,850 L 550,750 L 850,750 L 950,650 L 1350,650"
            stroke="url(#goldCopperGrad)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M 800,850 L 1000,650 L 1200,650 L 1300,550 L 1400,550"
            stroke="url(#cyanDataGrad)"
            strokeWidth="1.2"
            fill="none"
          />

          {/* Vias / Contact Points */}
          <circle cx="380" cy="130" r="3" fill="#f59e0b" filter="url(#glow)" />
          <circle cx="780" cy="210" r="3" fill="#fbbf24" />
          <circle cx="1180" cy="290" r="3.5" fill="#f59e0b" filter="url(#glow)" />
          <circle cx="290" cy="250" r="2.5" fill="#d97706" />
          <circle cx="590" cy="320" r="3" fill="#f59e0b" />
          <circle cx="1020" cy="390" r="3" fill="#06b6d4" filter="url(#glow)" />
          <circle cx="550" cy="750" r="3" fill="#f59e0b" />
          <circle cx="950" cy="650" r="3.5" fill="#fbbf24" filter="url(#glow)" />
        </svg>
      </div>

      {/* Subtle Radial Gradient Wash */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 items-center">
          {/* Main Hero Content (Left 7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium">
                <Radio className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                <span>{currentLang === 'de' ? 'Hochschule Wismar • Note 1,7' : 'Hochschule Wismar • Grade 1.7'}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-slate-300 text-xs font-medium">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Germany (Relocation Ready)</span>
              </span>
            </div>

            {/* Name and Greeting */}
            <div className="space-y-2">
              <p className="text-sm sm:text-base font-mono text-amber-400 font-semibold tracking-wide">
                {currentLang === 'de' ? '// WILLKOMMEN • EMBEDDED SYSTEMS PORTFOLIO' : '// WELCOME • EMBEDDED SYSTEMS PORTFOLIO'}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
                {PERSONAL_INFO.name}
              </h1>
            </div>

            {/* Dynamic Typing Role */}
            <div className="h-10 sm:h-12 flex items-center">
              <div className="inline-flex items-center text-lg sm:text-2xl font-mono text-slate-200">
                <span className="text-amber-400 mr-2">&gt;</span>
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
                  {displayedText}
                </span>
                <span className="w-2.5 h-6 bg-amber-400 ml-1 animate-pulse" />
              </div>
            </div>

            {/* Core Summary Description */}
            <p className="text-base sm:text-lg 2xl:text-xl text-slate-300 leading-relaxed max-w-2xl xl:max-w-3xl font-normal">
              {currentLang === 'de'
                ? 'Masterstudent der Informations- und Elektrotechnik an der Hochschule Wismar. Ich verbinde praktische Robotik-Entwicklung (ROS 2, micro-ROS, Motorregelung, Sensorfusion) mit fast 2 Jahren Berufserfahrung in Echtzeit-Embedded-Software (C/C++, FreeRTOS, Zephyr), CAN/CAN FD-Protokollstacks und ISO 26262-orientierter Steuergeräte-Validierung.'
                : 'Master’s student in Information and Electrical Engineering at Hochschule Wismar. I combine hands-on robotics development (ROS 2, micro-ROS, motor control, sensor fusion) with nearly 2 years of professional experience in real-time embedded software (C/C++, FreeRTOS, Zephyr), CAN/CAN FD protocol stacks, and ISO 26262-aligned automotive ECU validation.'}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                id="hero-projects-btn"
                onClick={() => scrollTo('projects')}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>{currentLang === 'de' ? 'Technische Projekte' : 'Explore Projects'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-lab-btn"
                onClick={() => scrollTo('live-lab')}
                className="px-5 py-3 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 text-amber-300 font-semibold text-sm flex items-center gap-2 transition-all hover:border-amber-400 cursor-pointer"
              >
                <Activity className="w-4 h-4 text-amber-400" />
                <span>{currentLang === 'de' ? 'Live CAN-Bus Simulator' : 'Live CAN-Bus Lab'}</span>
              </button>

              <button
                id="hero-resume-btn"
                onClick={onOpenResume}
                className="px-4 py-3 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 font-medium text-sm flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-slate-400" />
                <span>{currentLang === 'de' ? 'CV anzeigen' : 'View CV'}</span>
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 xl:gap-4 border-t border-slate-800/80 xl:max-w-3xl">
              <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800">
                <div className="text-amber-400 font-mono font-bold text-xl">2+ Years</div>
                <div className="text-xs text-slate-400">{currentLang === 'de' ? 'Embedded Erfahrung' : 'Embedded Exp.'}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800">
                <div className="text-amber-400 font-mono font-bold text-xl">5.0 Mbps</div>
                <div className="text-xs text-slate-400">CAN FD Telemetry</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800">
                <div className="text-amber-400 font-mono font-bold text-xl">ASIL-B/C</div>
                <div className="text-xs text-slate-400">ISO 26262 Safety</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800">
                <div className="text-amber-400 font-mono font-bold text-xl">1.7 Grade</div>
                <div className="text-xs text-slate-400">Hochschule Wismar</div>
              </div>
            </div>
          </div>

          {/* Premium Portrait (Right 5 cols) */}
          <div className="lg:col-span-5 relative flex flex-col items-center lg:items-start justify-center pt-4 lg:pt-0">
            {/* Ambient glow behind the portrait */}
            <div className="absolute inset-0 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative w-full max-w-[300px] sm:max-w-[330px] lg:max-w-[340px] xl:max-w-[360px] 2xl:max-w-[390px] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] group border border-amber-500/20 bg-[#a07a45]">
              {/* Portrait: web-sized copies of the original 24 MP photo (the 12 MB original rendered poorly) */}
              <img
                src="/portrait-960.jpg"
                srcSet="/portrait-640.jpg 640w, /portrait-960.jpg 960w, /portrait-1280.jpg 1280w"
                sizes="(min-width: 1536px) 390px, (min-width: 1280px) 360px, (min-width: 1024px) 340px, 330px"
                width={960}
                height={1440}
                alt={PERSONAL_INFO.name}
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover object-[center_12%] transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Bottom gradient keeps the embedded tags readable without hiding the face */}
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#0b0f17]/90 via-[#0b0f17]/40 to-transparent pointer-events-none" />

              {/* Quick Contact & tech stack tags, embedded in the photo */}
              <div className="absolute bottom-4 inset-x-0 z-20 flex flex-col items-center space-y-2.5 px-3">
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <span className="text-[10px] sm:text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-[#0b0f17]/90 text-amber-400 border border-amber-500/30 shadow-lg backdrop-blur-md">
                    C/C++
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-[#0b0f17]/90 text-cyan-400 border border-cyan-500/30 shadow-lg backdrop-blur-md">
                    CAN FD
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-[#0b0f17]/90 text-emerald-400 border border-emerald-500/30 shadow-lg backdrop-blur-md">
                    RTOS
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] sm:text-[11px] font-mono font-medium bg-[#0b0f17]/90 px-3.5 py-2 rounded-xl border border-slate-700 shadow-xl backdrop-blur-md">
                  <a href={`tel:${PERSONAL_INFO.phone}`} className="text-slate-300 hover:text-amber-300 flex items-center gap-1.5 transition-colors whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{PERSONAL_INFO.phone}</span>
                  </a>
                  <span className="text-slate-700">|</span>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
