import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Copy, Check, Linkedin, ArrowRight, Clock } from 'lucide-react';
import { Language } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sendToInbox } from '../lib/sendToInbox';

interface ContactSectionProps {
  currentLang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  currentLang,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    roleInterest: 'cv_request',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [sendFailed, setSendFailed] = useState(false);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSendFailed(false);

    const isCv = formData.roleInterest === 'cv_request';
    try {
      await sendToInbox(
        `${isCv ? '[CV Request]' : `[Inquiry: ${formData.roleInterest}]`} ${formData.name} (${formData.company || 'Direct'})`,
        formData.email,
        {
          Name: formData.name,
          Email: formData.email,
          Company: formData.company,
          Topic: formData.roleInterest,
          Message: formData.message,
          Source: 'Portfolio website – contact form',
        }
      );
      setSubmittedSuccess(true);
    } catch {
      setSendFailed(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMailtoBackup = () => {
    const isCv = formData.roleInterest === 'cv_request';
    const subjectPrefix = isCv ? '[CV Request]' : `[Inquiry: ${formData.roleInterest.toUpperCase()}]`;
    const subject = encodeURIComponent(
      `${subjectPrefix} - ${formData.name} (${formData.company || 'Direct'})`
    );
    const body = encodeURIComponent(
      `Hello Yogesh,\n\nName: ${formData.name}\nCompany: ${formData.company}\nEmail: ${formData.email}\nTopic: ${formData.roleInterest}\n\nMessage / Request:\n${formData.message}\n`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <p className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
          {currentLang === 'de' ? '// DIREKTER KONTAKT & CV ANFRAGE' : '// GET IN TOUCH & CV REQUEST'}
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {currentLang === 'de' ? 'Lassen Sie uns zusammenarbeiten' : 'Let\'s Discuss Opportunities'}
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          {currentLang === 'de'
            ? 'Füllen Sie das Formular aus, um den Lebenslauf anzufordern oder ein Vorstellungsgespräch für eine Werkstudentenstelle oder ein Praktikum in Deutschland zu vereinbaren.'
            : 'Fill out this form to request Yogesh\'s complete CV or discuss Werkstudent, Internship, and Embedded Engineering opportunities in Germany.'}
        </p>
        <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full" />
      </div>

      {/* Grid: Direct Contact Details + Interactive Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Cards (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Email Card */}
          <div className="bg-[#111827]/80 rounded-2xl border border-slate-800 p-5 space-y-3 hover:border-amber-500/30 transition-colors shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block uppercase">
                    {currentLang === 'de' ? 'E-Mail Adresse' : 'Email Address'}
                  </span>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-sm font-semibold text-white hover:text-amber-400 transition-colors"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700 text-xs flex items-center gap-1 cursor-pointer transition-colors"
                title="Copy Email"
              >
                {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Phone Card */}
          <div className="bg-[#111827]/80 rounded-2xl border border-slate-800 p-5 space-y-3 hover:border-amber-500/30 transition-colors shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block uppercase">
                    {currentLang === 'de' ? 'Telefon / WhatsApp' : 'Phone / Mobile'}
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {PERSONAL_INFO.phone}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700 text-xs flex items-center gap-1 cursor-pointer transition-colors"
                title="Copy Phone"
              >
                {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-[#111827]/80 rounded-2xl border border-slate-800 p-5 space-y-3 hover:border-amber-500/30 transition-colors shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400 block uppercase">
                  {currentLang === 'de' ? 'Aktueller Standort' : 'Current Location'}
                </span>
                <span className="text-sm font-semibold text-white">
                  {PERSONAL_INFO.location.city}, {PERSONAL_INFO.location.state}, Germany
                </span>
                <span className="text-xs text-amber-400/80 block mt-0.5">
                  {currentLang === 'de' ? 'Deutschlandweit umzugsbereit' : 'Willing to relocate across Germany'}
                </span>
              </div>
            </div>
          </div>

          {/* Response Time Badge */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-300/90 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              {currentLang === 'de'
                ? 'Antwortgarantie: In der Regel innerhalb weniger Stunden.'
                : 'Guaranteed response: Typically within a few hours.'}
            </span>
          </div>
        </div>

        {/* Interactive Contact & CV Form (7 Cols) */}
        <div className="lg:col-span-7 bg-[#111827]/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span>{currentLang === 'de' ? 'Nachricht & CV-Anfrage senden' : 'Send Message & Request CV'}</span>
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              {currentLang === 'de'
                ? 'Füllen Sie das Formular aus, um Yogesh direkt eine Nachricht oder Lebenslaufanfrage zu senden.'
                : 'Fill out this form to message Yogesh directly or request his CV.'}
            </p>
          </div>

          {submittedSuccess ? (
            <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/40 space-y-4 text-center animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">
                {currentLang === 'de' ? 'Vielen Dank für Ihre Nachricht' : 'Thank you for your message'}
              </h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                {currentLang === 'de'
                  ? `Ihre Nachricht ist erfolgreich eingegangen. Yogesh Radhakrishnan wird sich innerhalb von 1–2 Werktagen unter der angegebenen E-Mail-Adresse bei Ihnen melden. In dringenden Fällen erreichen Sie ihn direkt unter ${PERSONAL_INFO.email}.`
                  : `Your message has been received successfully. Yogesh Radhakrishnan will respond to the email address you provided within 1–2 business days. For urgent matters, please contact him directly at ${PERSONAL_INFO.email}.`}
              </p>
              
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setSubmittedSuccess(false)}
                  className="px-4 py-2 rounded-lg bg-slate-900 text-slate-400 text-xs font-mono hover:text-slate-200 transition-colors cursor-pointer"
                >
                  {currentLang === 'de' ? 'Weitere Nachricht' : 'Send Another'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium">
                    {currentLang === 'de' ? 'Ihr Name *' : 'Your Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Thomas Müller"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium">
                    {currentLang === 'de' ? 'Ihre E-Mail *' : 'Your Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.de"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium">
                    {currentLang === 'de' ? 'Unternehmen / Institution' : 'Company / Institution'}
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Bosch, Continental, BMW..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium">
                    {currentLang === 'de' ? 'Themenbereich / Rolle' : 'Topic / Role'}
                  </label>
                  <select
                    value={formData.roleInterest}
                    onChange={(e) => setFormData({ ...formData, roleInterest: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    <option value="cv_request">{currentLang === 'de' ? '📄 Lebenslauf anfordern (CV / Resume Request)' : '📄 CV / Resume Request'}</option>
                    <option value="werkstudent">Werkstudent (Robotics / Embedded / Automotive)</option>
                    <option value="praktikum">Praktikum / Internship</option>
                    <option value="masterthesis">Master Thesis Collaboration</option>
                    <option value="other">General Engineering Discussion</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">
                  {currentLang === 'de' ? 'Ihre Nachricht *' : 'Message *'}
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={
                    currentLang === 'de'
                      ? 'Beschreiben Sie kurz das Projekt, die Stelle oder Ihren Lebenslauf-Anfragewunsch...'
                      : 'Briefly describe the role, opportunity, or request for Yogesh\'s CV...'
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                />
              </div>

              {sendFailed && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/40 text-red-200 font-sans">
                  {currentLang === 'de' ? 'Senden fehlgeschlagen. ' : 'Sending failed. '}
                  <button type="button" onClick={handleMailtoBackup} className="underline text-amber-300 hover:text-amber-200 cursor-pointer">
                    {currentLang === 'de' ? 'Stattdessen per E-Mail-Programm senden' : 'Send via your email app instead'}
                  </button>
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-between">
                <span className="text-[11px] text-slate-400">
                  {currentLang === 'de'
                    ? 'Direkte Weiterleitung an yogeshr.de@gmail.com'
                    : 'Direct forwarding to yogeshr.de@gmail.com'}
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {isSubmitting
                      ? currentLang === 'de'
                        ? 'Wird gesendet...'
                        : 'Sending...'
                      : currentLang === 'de'
                      ? 'Nachricht absenden'
                      : 'Send Message'}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
