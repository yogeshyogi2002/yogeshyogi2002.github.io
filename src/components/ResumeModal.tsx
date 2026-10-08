import React, { useState } from 'react';
import { X, Lock, ArrowDownRight, Send, CheckCircle2, AlertTriangle, Mail } from 'lucide-react';
import { Language } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sendToInbox } from '../lib/sendToInbox';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onRequestViaMailMe: () => void;
}

type SendStatus = 'idle' | 'sending' | 'sent' | 'error';

const EMPTY_REQUEST = {
  name: '',
  email: '',
  company: '',
  purpose: 'recruiter',
  note: '',
};

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onRequestViaMailMe,
}) => {
  const [requestData, setRequestData] = useState(EMPTY_REQUEST);
  const [status, setStatus] = useState<SendStatus>('idle');

  if (!isOpen) return null;

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await sendToInbox(
        `[CV Request] ${requestData.name} (${requestData.company || 'Direct Contact'})`,
        requestData.email,
        {
          Name: requestData.name,
          Email: requestData.email,
          Company: requestData.company,
          Purpose: requestData.purpose,
          Note: requestData.note || 'N/A',
          Source: 'Portfolio website – CV request form',
        }
      );
      setStatus('sent');
      setRequestData(EMPTY_REQUEST);
    } catch {
      setStatus('error');
    }
  };

  const mailtoFallback = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
    `[CV Request] ${requestData.name || ''} (${requestData.company || 'Direct Contact'})`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0b0f17] border-2 border-amber-500/40 rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Toolbar */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${status === 'sent' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              {currentLang === 'de' ? 'CV-Anfrage • Yogesh Radhakrishnan' : 'CV Request • Yogesh Radhakrishnan'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-200 font-sans">
          {status === 'sent' ? (
            /* Confirmation */
            <div className="text-center max-w-md mx-auto space-y-4 py-6">
              <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-extrabold text-white">
                {currentLang === 'de' ? 'Vielen Dank für Ihre Anfrage' : 'Thank you for your request'}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {currentLang === 'de'
                  ? 'Ihre Anfrage ist erfolgreich eingegangen. Yogesh Radhakrishnan wird sie prüfen und Ihnen seinen vollständigen Lebenslauf innerhalb von 1–2 Werktagen an die angegebene E-Mail-Adresse senden.'
                  : 'Your request has been received successfully. Yogesh Radhakrishnan will review it and send his complete CV to the email address you provided within 1–2 business days.'}
              </p>
              <p className="text-xs text-slate-400">
                {currentLang === 'de' ? 'In dringenden Fällen erreichen Sie ihn direkt unter ' : 'For urgent matters, please contact him directly at '}
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-amber-300 hover:text-amber-200 underline">
                  {PERSONAL_INFO.email}
                </a>
                .
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold font-mono transition-colors cursor-pointer"
              >
                {currentLang === 'de' ? 'Schließen' : 'Close'}
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center max-w-xl mx-auto space-y-3 pt-2">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 shadow-lg shadow-amber-500/10">
                  <Lock className="w-7 h-7" />
                </div>
                <p className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
                  {currentLang === 'de' ? '// LEBENSLAUF ANFORDERN' : '// RESUME REQUEST'}
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {currentLang === 'de' ? 'Vollständigen CV anfordern' : 'Request the Full CV'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentLang === 'de'
                    ? 'Füllen Sie kurz das Formular aus. Yogesh erhält Ihre Anfrage direkt und sendet Ihnen seinen Lebenslauf persönlich per E-Mail zu.'
                    : 'Fill out the short form below. Yogesh receives your request directly and will email his CV to you personally.'}
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

                  {status === 'error' && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/40 text-red-200 flex items-start gap-2 font-sans">
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                      <span>
                        {currentLang === 'de' ? 'Senden fehlgeschlagen. Bitte schreiben Sie direkt an ' : 'Sending failed. Please email '}
                        <a href={mailtoFallback} className="underline text-amber-300 hover:text-amber-200">
                          {PERSONAL_INFO.email}
                        </a>
                        {currentLang === 'de' ? '.' : ' directly.'}
                      </span>
                    </div>
                  )}

                  <div className="pt-3 space-y-3">
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full py-3 px-5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-60 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>
                        {status === 'sending'
                          ? currentLang === 'de'
                            ? 'Wird gesendet...'
                            : 'Sending...'
                          : currentLang === 'de'
                          ? 'CV-Anfrage senden'
                          : 'Send CV Request'}
                      </span>
                    </button>

                    <div className="relative flex py-1 items-center">
                      <div className="flex-grow border-t border-slate-800"></div>
                      <span className="flex-shrink mx-3 text-[10px] text-slate-500 uppercase font-mono tracking-widest">
                        {currentLang === 'de' ? 'oder direkt kontaktieren' : 'or contact directly'}
                      </span>
                      <div className="flex-grow border-t border-slate-800"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <a
                        href={`mailto:${PERSONAL_INFO.email}`}
                        className="w-full py-2.5 px-4 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:border-amber-400"
                      >
                        <Mail className="w-3.5 h-3.5 text-amber-400" />
                        <span>{PERSONAL_INFO.email}</span>
                      </a>
                      <button
                        type="button"
                        onClick={onRequestViaMailMe}
                        className="w-full py-2.5 px-4 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:border-amber-400 cursor-pointer"
                      >
                        <ArrowDownRight className="w-3.5 h-3.5 text-amber-400" />
                        <span>{currentLang === 'de' ? 'Zum Kontaktbereich ↓' : 'Go to Contact Section ↓'}</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
