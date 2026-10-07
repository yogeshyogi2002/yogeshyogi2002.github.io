import React from 'react';
import { Briefcase, MapPin, Calendar, FileText, Send, CheckCircle2, Bot, Cpu, Car, GraduationCap } from 'lucide-react';
import { Language } from '../types';

interface AvailabilityBannerProps {
  currentLang: Language;
  onOpenResume: () => void;
}

type Localized = { en: string; de: string };

interface RoleGroup {
  id: string;
  icon: React.ElementType;
  accent: string;
  title: Localized;
  roles: Localized[];
}

// Ordered by focus: robotics -> embedded -> automotive.
// German titles mirror the wording used in job ads on StepStone, Indeed and company career pages.
const ROLE_GROUPS: RoleGroup[] = [
  {
    id: 'robotics',
    icon: Bot,
    accent: 'text-cyan-400',
    title: { en: 'Robotics & Automation', de: 'Robotik & Automatisierung' },
    roles: [
      { en: 'Robotics Software Engineer (ROS 2 / C++)', de: 'Werkstudent Robotik-Softwareentwicklung (ROS 2 / C++)' },
      { en: 'Motion Control & Drive Firmware (BLDC / FOC)', de: 'Motion Control & Antriebsfirmware (BLDC / FOC)' },
      { en: 'Sensor Fusion, SLAM & Localisation', de: 'Sensorfusion, SLAM & Lokalisierung' },
      { en: 'Mobile Robots / AMR & AGV Development', de: 'Mobile Robotik / AMR- & FTS-Entwicklung' },
      { en: 'Cobot & Industrial Robot Safety Software', de: 'Sicherheitssoftware für Cobots & Industrieroboter' }
    ]
  },
  {
    id: 'embedded',
    icon: Cpu,
    accent: 'text-amber-400',
    title: { en: 'Embedded Systems', de: 'Embedded Systems' },
    roles: [
      { en: 'Embedded Software Developer (C / C++)', de: 'Werkstudent Embedded-Softwareentwicklung (C / C++)' },
      { en: 'Firmware & RTOS (FreeRTOS / Zephyr)', de: 'Firmware & RTOS (FreeRTOS / Zephyr)' },
      { en: 'Low-Level Drivers & Board Bring-Up', de: 'Treiberentwicklung & Hardware-Inbetriebnahme' },
      { en: 'Embedded Linux & Yocto', de: 'Embedded Linux & Yocto' },
      { en: 'Test Automation & HIL (Python)', de: 'Testautomatisierung & HIL (Python)' }
    ]
  },
  {
    id: 'automotive',
    icon: Car,
    accent: 'text-emerald-400',
    title: { en: 'Automotive & E-Mobility', de: 'Automotive & E-Mobilität' },
    roles: [
      { en: 'ECU Software Development (AUTOSAR Classic)', de: 'Steuergeräte-Softwareentwicklung (AUTOSAR Classic)' },
      { en: 'ECU Validation & HIL Testing (CANoe / CAPL)', de: 'Steuergeräte-Validierung & HIL-Test (CANoe / CAPL)' },
      { en: 'Vehicle Diagnostics (UDS / CAN FD)', de: 'Fahrzeugdiagnose (UDS / CAN FD)' },
      { en: 'ADAS Sensor & Embedded Software', de: 'ADAS-Sensorik & Embedded-Software' },
      { en: 'BMS & Power Electronics Firmware', de: 'BMS- & Leistungselektronik-Firmware' }
    ]
  }
];

// Domains only - specific thesis ideas are shared privately on request.
const THESIS_DOMAINS: Localized[] = [
  { en: 'Robotics & Autonomous Systems', de: 'Robotik & autonome Systeme' },
  { en: 'Embedded & Real-Time Systems', de: 'Embedded- & Echtzeitsysteme' },
  { en: 'Automotive E/E & Vehicle Networks', de: 'Automotive E/E & Fahrzeugnetzwerke' },
  { en: 'Functional Safety', de: 'Funktionale Sicherheit' },
  { en: 'E-Mobility & Battery Systems', de: 'E-Mobilität & Batteriesysteme' }
];

export const AvailabilityBanner: React.FC<AvailabilityBannerProps> = ({
  currentLang,
  onOpenResume,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto">
      <div className="relative rounded-2xl bg-gradient-to-r from-amber-950/40 via-[#131b2c] to-slate-900 border-2 border-amber-500/40 p-6 sm:p-10 shadow-2xl shadow-amber-900/10 overflow-hidden space-y-8">
        {/* Glow & Circuit Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-semibold">
              <Briefcase className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {currentLang === 'de'
                  ? 'Karrierechancen in Deutschland'
                  : 'Career Opportunity in Germany'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {currentLang === 'de' ? (
                <>
                  Verfügbar für{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
                    Werkstudent / Praktikum / Masterarbeit
                  </span>
                </>
              ) : (
                <>
                  Open for{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
                    Werkstudent / Internship / Master Thesis
                  </span>
                </>
              )}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {currentLang === 'de' ? (
                <>
                  Aktuell im Masterstudium der <strong>Informations- und Elektrotechnik</strong> (Aktuelle Note: <strong>1,7</strong>) an der <strong>Hochschule Wismar</strong>. Auf der Suche nach einer langfristigen Werkstudententätigkeit, einem Praktikum oder einer <strong>Masterarbeit in Kooperation mit der Industrie</strong> in den Bereichen <strong>Robotik, Embedded Systems und Automotive-Elektronik</strong> — mit Schwerpunkt auf Echtzeit-Software, Motorregelung und Steuergeräte-Firmware.
                </>
              ) : (
                <>
                  Currently pursuing a Master’s in <strong>Information and Electrical Engineering</strong> (Current Grade: <strong>1.7</strong>) at <strong>Hochschule Wismar, Germany</strong>. Seeking a long-term Werkstudent role, an internship, or an <strong>industry Master’s thesis</strong> in <strong>Robotics, Embedded Systems, and Automotive Electronics</strong> — with a focus on real-time software, motion control, and ECU firmware.
                </>
              )}
            </p>

            {/* Availability Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-200">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {currentLang === 'de'
                    ? 'Sofortige deutschlandweite Umzugsbereitschaft'
                    : 'Immediate relocation available within Germany'}
                </span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-200">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {currentLang === 'de'
                    ? 'Start: Ab sofort / Flexibel'
                    : 'Start Date: Immediately / Flexible'}
                </span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>
                  {currentLang === 'de'
                    ? 'Arbeitsberechtigt für Studenten in DE'
                    : 'Authorized to work as student in DE'}
                </span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-center">
            <button
              id="banner-resume-btn"
              onClick={onOpenResume}
              className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>{currentLang === 'de' ? 'Vollständigen Lebenslauf ansehen' : 'View Complete Resume'}</span>
            </button>

            <button
              id="banner-contact-btn"
              onClick={() => scrollTo('contact')}
              className="w-full py-3 px-5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 text-amber-300 font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:border-amber-400 cursor-pointer"
            >
              <Send className="w-4 h-4 text-amber-400" />
              <span>{currentLang === 'de' ? 'Vorstellungsgespräch anfragen' : 'Request Interview / Contact'}</span>
            </button>
          </div>
        </div>

        {/* Target Roles: robotics -> embedded -> automotive, plus thesis */}
        <div className="relative z-10 space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
            {currentLang === 'de' ? '// Gesuchte Positionen' : '// Target Roles'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {ROLE_GROUPS.map((group) => {
              const Icon = group.icon;
              return (
                <div key={group.id} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${group.accent}`} />
                    <span className="text-sm font-bold text-white">{group.title[currentLang]}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {group.roles.map((role) => (
                      <li key={role.en} className="flex items-start gap-2 text-xs text-slate-300 leading-snug">
                        <span className={`mt-1.5 w-1 h-1 rounded-full shrink-0 bg-current ${group.accent}`} />
                        <span>{role[currentLang]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}

            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/30 space-y-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-amber-300" />
                <span className="text-sm font-bold text-white">
                  {currentLang === 'de' ? 'Masterarbeit (Industrie)' : 'Master’s Thesis (Industry)'}
                </span>
              </div>
              <ul className="space-y-1.5">
                {THESIS_DOMAINS.map((domain) => (
                  <li key={domain.en} className="flex items-start gap-2 text-xs text-slate-300 leading-snug">
                    <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-amber-300" />
                    <span>{domain[currentLang]}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-slate-500 italic leading-snug">
                {currentLang === 'de'
                  ? 'Konkrete Themenvorschläge auf Anfrage.'
                  : 'Specific topic proposals available on request.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
