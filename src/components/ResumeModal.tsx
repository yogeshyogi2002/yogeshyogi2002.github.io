import React, { useState } from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, Linkedin, GraduationCap, Briefcase, Award, CheckCircle2, Lock, ShieldCheck, ArrowDownRight, Send } from 'lucide-react';
import { Language } from '../types';
import { PERSONAL_INFO, EXPERIENCES, SKILL_CATEGORIES, AWARDS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  isUnlocked: boolean;
  onUnlock: () => void;
  onRequestViaMailMe: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  isUnlocked,
  onUnlock,
  onRequestViaMailMe,
}) => {
  if (!isOpen) return null;

  const [requestData, setRequestData] = useState({
    name: '',
    email: '',
    company: '',
    purpose: 'recruiter',
    note: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [justUnlocked, setJustUnlocked] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Send mail notification to Yogesh via mailto or background handler
    const subject = encodeURIComponent(`[CV Access Request] ${requestData.name} (${requestData.company || 'Direct Contact'})`);
    const body = encodeURIComponent(
      `Hello Yogesh,\n\nI would like to review your CV.\n\nRequester Details:\n- Name: ${requestData.name}\n- Email: ${requestData.email}\n- Company / Organization: ${requestData.company}\n- Purpose: ${requestData.purpose}\n- Note: ${requestData.note || 'N/A'}\n\nRequested from Portfolio Website.`
    );

    // Prepare mailto link trigger in background
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    
    // Attempt silent trigger
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = mailtoUrl;
    document.body.appendChild(iframe);
    setTimeout(() => {
      try { document.body.removeChild(iframe); } catch(err){}
    }, 1000);

    // Unlock after small delay
    setTimeout(() => {
      setIsSubmitting(false);
      setJustUnlocked(true);
      onUnlock();
    }, 600);
  };

  const showCv = isUnlocked || justUnlocked;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0b0f17] border-2 border-amber-500/40 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Toolbar (Non-printable) */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${showCv ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              {showCv
                ? currentLang === 'de'
                  ? 'Lebenslauf • Yogesh Radhakrishnan (Freigeschaltet)'
                  : 'Curriculum Vitae • Yogesh Radhakrishnan (Unlocked)'
                : currentLang === 'de'
                ? 'CV Zugriffsschutz • Yogesh Radhakrishnan'
                : 'CV Access Gate • Yogesh Radhakrishnan'}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {showCv && (
              <>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{currentLang === 'de' ? 'Zugriff erteilt' : 'Access Granted'}</span>
                </span>
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{currentLang === 'de' ? 'Drucken / PDF' : 'Print / Save PDF'}</span>
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Either Gate Form OR CV Content */}
        {!showCv ? (
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-200 font-sans">
            {/* Security Header Banner */}
            <div className="text-center max-w-xl mx-auto space-y-3 pt-2">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 shadow-lg shadow-amber-500/10">
                <Lock className="w-7 h-7" />
              </div>
              <p className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
                {currentLang === 'de' ? '// LEBENSLAUF ANFORDERN' : '// RESUME ACCESS REQUEST'}
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {currentLang === 'de'
                  ? 'CV anfordern & freischalten'
                  : 'Request Access to Full CV'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentLang === 'de'
                  ? 'Um den vollständigen Lebenslauf von Yogesh Radhakrishnan (Master Information & Elektrotechnik, HS Wismar) einzusehen oder als PDF zu speichern, füllen Sie bitte kurz dieses Formular aus. Dadurch wird Yogesh direkt per E-Mail benachrichtigt.'
                  : 'To view or download Yogesh Radhakrishnan\'s comprehensive Curriculum Vitae and technical credentials, please fill out the quick request form below. This sends an instant notification to Yogesh.'}
              </p>
            </div>

            {/* Request Form */}
            <div className="max-w-xl mx-auto bg-slate-900/80 rounded-xl border border-slate-800 p-6 shadow-xl">
              <form onSubmit={handleRequestSubmit} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-medium">
                      {currentLang === 'de' ? 'Ihr Name *' : 'Your Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={requestData.name}
                      onChange={(e) => setRequestData({ ...requestData, name: e.target.value })}
                      placeholder="e.g. Dr. Thomas Müller"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-medium">
                      {currentLang === 'de' ? 'Ihre E-Mail *' : 'Work Email *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={requestData.email}
                      onChange={(e) => setRequestData({ ...requestData, email: e.target.value })}
                      placeholder="recruiter@company.de"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-medium">
                      {currentLang === 'de' ? 'Unternehmen / Institution *' : 'Company / Organization *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={requestData.company}
                      onChange={(e) => setRequestData({ ...requestData, company: e.target.value })}
                      placeholder="e.g. Bosch, Continental, BMW..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-medium">
                      {currentLang === 'de' ? 'Zweck der Anfrage' : 'Purpose / Opportunity'}
                    </label>
                    <select
                      value={requestData.purpose}
                      onChange={(e) => setRequestData({ ...requestData, purpose: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      <option value="recruiter">Recruiting / Talent Acquisition</option>
                      <option value="werkstudent">Werkstudent Position (Robotics / Embedded / Automotive)</option>
                      <option value="praktikum">Praktikum / Internship Position</option>
                      <option value="engineering_lead">Direct Team Lead / Engineering Manager</option>
                      <option value="collaboration">Technical Collaboration / Master Thesis</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium">
                    {currentLang === 'de' ? 'Nachricht / Notiz (optional)' : 'Optional Note'}
                  </label>
                  <textarea
                    rows={2}
                    value={requestData.note}
                    onChange={(e) => setRequestData({ ...requestData, note: e.target.value })}
                    placeholder={
                      currentLang === 'de'
                        ? 'Kurze Anmerkung zur Position oder zum Team...'
                        : 'Brief note about the role, location, or team...'
                    }
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                  />
                </div>

                <div className="pt-3 space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>
                      {isSubmitting
                        ? currentLang === 'de'
                          ? 'Wird autorisiert & gesendet...'
                          : 'Authorizing & Submitting...'
                        : currentLang === 'de'
                        ? 'Anfrage senden & CV jetzt freischalten'
                        : 'Submit Request & Unlock CV'}
                    </span>
                  </button>

                  <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-slate-800"></div>
                    <span className="flex-shrink mx-3 text-[10px] text-slate-500 uppercase font-mono tracking-widest">
                      {currentLang === 'de' ? 'oder direkt kontaktieren' : 'or contact directly'}
                    </span>
                    <div className="flex-grow border-t border-slate-800"></div>
                  </div>

                  <button
                    type="button"
                    onClick={onRequestViaMailMe}
                    className="w-full py-2.5 px-4 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:border-amber-400 cursor-pointer"
                  >
                    <ArrowDownRight className="w-3.5 h-3.5 text-amber-400" />
                    <span>
                      {currentLang === 'de'
                        ? 'Formular im Bereich "Kontakt & Mail Me" nutzen ↓'
                        : 'Use Website "Mail Me / Contact" Section ↓'}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Printable CV Content (Unlocked) */
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-white text-slate-900 font-sans animate-in fade-in duration-300">
            {/* Header */}
            <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-sm font-semibold text-amber-600 tracking-wide font-mono uppercase mt-1">
                  Embedded Systems & Automotive Firmware Engineer
                </p>
                <p className="text-xs text-slate-600 mt-1 max-w-xl">
                  Master’s Candidate at Hochschule Wismar, Germany (Current Grade: 1.7). Nearly 2 years of professional experience in safety-critical automotive ECUs, low-level C/C++ driver development, CAN/CAN FD, and ISO 26262 environments.
                </p>
              </div>

              <div className="text-xs font-mono space-y-1 sm:text-right shrink-0">
                <div className="text-slate-800 font-semibold">{PERSONAL_INFO.phone}</div>
                <div className="text-slate-800">{PERSONAL_INFO.email}</div>
                <div className="text-slate-600">{PERSONAL_INFO.location.city}, Germany</div>
                <div className="text-blue-700 underline font-sans">linkedin.com/in/yogesh2002/</div>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase font-bold text-slate-900 border-b border-slate-300 pb-1 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-amber-600" />
                <span>Education</span>
              </h2>
              <div className="flex justify-between items-start text-xs">
                <div>
                  <h3 className="font-bold text-slate-950">
                    Hochschule Wismar – University of Applied Sciences, Technology, Business and Design
                  </h3>
                  <p className="text-slate-700 italic">
                    Master of Science (M.Sc.) in Information and Electrical Engineering
                  </p>
                  <p className="text-slate-600 text-[11px] mt-0.5">
                    Focus: Real-Time Digital Control, Power Electronics Firmware, Automotive HMI Prototyping
                  </p>
                </div>
                <div className="text-right font-mono text-[11px]">
                  <span className="font-bold text-amber-700 block">Current Grade: 1.7</span>
                  <span className="text-slate-500">2024 – Present (Germany)</span>
                </div>
              </div>
            </div>

            {/* Core Technical Skills */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase font-bold text-slate-900 border-b border-slate-300 pb-1 flex items-center gap-1.5">
                <span>Technical Skills & Toolchains</span>
              </h2>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-bold text-slate-950 block">Languages & Core:</span>
                  <span className="text-slate-700">Embedded C (C99/C11), Modern C++ (C++17), Python, Assembly, MISRA-C:2012</span>
                </div>
                <div>
                  <span className="font-bold text-slate-950 block">Protocols & Automotive:</span>
                  <span className="text-slate-700">CAN, CAN FD (up to 5 Mbps), UDS (ISO 14229), ISO 15765-2 (ISO-TP), SPI, I2C, UART, PWM</span>
                </div>
                <div>
                  <span className="font-bold text-slate-950 block">RTOS & Microcontrollers:</span>
                  <span className="text-slate-700">FreeRTOS, Zephyr RTOS, ARM Cortex-M (STM32H7/F7/F4), RISC-V (RV32IMAC), TI C2000 DSP</span>
                </div>
                <div>
                  <span className="font-bold text-slate-950 block">Hardware & Validation:</span>
                  <span className="text-slate-700">Vector CANoe, PCAN-USB, 4-Channel DSO Oscilloscopes, Logic Analyzers, JTAG/SWD, GDB, TouchGFX, Qt Creator</span>
                </div>
                <div className="col-span-2 pt-1 border-t border-slate-200">
                  <span className="font-bold text-slate-950 inline">Spoken Languages: </span>
                  <span className="text-slate-700">English (Fluent / C1 Professional), German (B2 — En route to C1)</span>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-4">
              <h2 className="text-xs font-mono uppercase font-bold text-slate-900 border-b border-slate-300 pb-1 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-amber-600" />
                <span>Engineering Experience</span>
              </h2>

              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="space-y-1 text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-slate-950 text-sm">
                        {exp.role.en}
                      </h3>
                      <p className="text-slate-700 font-medium">
                        {exp.organization} — <span className="italic">{exp.location}</span>
                      </p>
                    </div>
                    <span className="font-mono text-slate-500 text-[11px] shrink-0">
                      {exp.period.en}
                    </span>
                  </div>

                  <ul className="list-disc list-inside text-slate-700 space-y-0.5 text-[11px] pt-1">
                    {exp.highlights.en.map((hl, hIdx) => (
                      <li key={hIdx}>{hl}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Recognitions */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono uppercase font-bold text-slate-900 border-b border-slate-300 pb-1 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Awards & Honors</span>
              </h2>
              <div className="space-y-1 text-xs">
                {AWARDS.map((aw) => (
                  <div key={aw.id} className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-slate-900">{aw.title.en}</span> —{' '}
                      <span className="text-slate-700">{aw.event} ({aw.organizer})</span>
                    </div>
                    <span className="font-mono text-amber-700 text-[11px] shrink-0">{aw.badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
