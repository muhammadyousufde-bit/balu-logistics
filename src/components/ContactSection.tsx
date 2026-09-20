import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ExternalLink, Sparkles } from 'lucide-react';
import { CompanySettings, Language } from '../types';
import { translations } from '../data/translations';

interface ContactSectionProps {
  settings: CompanySettings;
  lang: Language;
  hideHeader?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings, lang, hideHeader = false }) => {
  const t = translations[lang];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValidEmailWithDomain = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${settings.address}, ${settings.postalCode} ${settings.city}`
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isValidEmailWithDomain(formData.email)) {
      setError(
        lang === 'de'
          ? 'Bitte eine gültige E-Mail-Adresse mit Domain angeben (z. B. name@beispiel.de).'
          : 'Please provide a valid email address with a domain (e.g. name@example.com).'
      );
      return;
    }

    if (formData.phone && !/^\d+$/.test(formData.phone.trim())) {
      setError(
        lang === 'de'
          ? 'Bitte eine gültige Telefonnummer eingeben (nur Zahlen).'
          : 'Please enter a valid phone number (only numbers).'
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: 'Website-Kontaktanfrage',
          message: formData.message
        })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Fehler beim Senden');
      }
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || (lang === 'de' ? 'Fehler beim Senden der Nachricht.' : 'Error sending message.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className={`${hideHeader ? 'py-8 sm:py-12' : 'py-10 sm:py-14'} bg-white border-b border-slate-100`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        {!hideHeader && (
          <div className="max-w-3xl mb-8 text-left space-y-2">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#121316] font-['Outfit',sans-serif] tracking-tight leading-tight">
              {t.contact.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {t.contact.subtitle}
            </p>
          </div>
        )}

        {/* 2-Column Grid: Station Details & Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-start mb-16">
          
          {/* Left: Contact Info & Station Card */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Station Location Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#FAF7F2] to-[#F7F2E7] border border-[#EAD8B3] space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-[#8C6326] uppercase">
                  <MapPin className="w-4 h-4 text-[#C89C50]" />
                  <span>{t.contact.stationTitle}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#C89C50] text-white">
                  Amazon DNX5
                </span>
              </div>

              <div className="text-base font-bold text-[#121316]">
                {settings.companyName}
              </div>

              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {settings.address}<br />
                {settings.postalCode} {settings.city}, {settings.country}
              </div>

              <div className="pt-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-[#8C6326] bg-white border border-[#EAD8B3] hover:bg-[#C89C50] hover:text-white transition-all shadow-2xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{t.contact.directionsButton}</span>
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-5 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-[#C89C50] transition-colors space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8C6326] uppercase">
                <Mail className="w-4 h-4 text-[#C89C50]" />
                <span>{t.contact.emailLabel}</span>
              </div>
              <a
                href={`mailto:${settings.officialEmail}`}
                className="text-sm font-bold text-[#121316] hover:text-[#C89C50] transition-colors block pt-1 break-all"
              >
                {settings.officialEmail}
              </a>
            </div>

            {/* Phone Card */}
            <div className="p-5 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-[#C89C50] transition-colors space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8C6326] uppercase">
                <Phone className="w-4 h-4 text-[#C89C50]" />
                <span>{t.contact.phoneLabel}</span>
              </div>
              <a
                href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                className="text-sm font-bold text-[#121316] hover:text-[#C89C50] transition-colors block pt-1"
              >
                {settings.phone}
              </a>
            </div>

          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
              {submitted ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#FAF7F2] text-[#C89C50] border border-[#EAD8B3] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#121316] font-['Outfit',sans-serif]">
                    {lang === 'de' ? 'Nachricht erfolgreich versendet' : 'Message Sent Successfully'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                    {t.contact.successMessage} ({settings.officialEmail})
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', message: '' });
                    }}
                    className="mt-4 px-4 py-2 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    {lang === 'de' ? 'Weitere Nachricht verfassen' : 'Send Another Message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium animate-in fade-in">
                      {error}
                    </div>
                  )}

                  <div>
                    <h3 className="text-base font-bold text-[#121316] font-['Outfit',sans-serif]">
                      {t.contact.formTitle}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {t.contact.formSubtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        {lang === 'de' ? 'Name *' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={t.contact.namePlaceholder}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#C89C50] focus:ring-2 focus:ring-[#C89C50]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        {lang === 'de' ? 'E-Mail-Adresse *' : 'Email Address *'}
                      </label>
                      <input
                        type="email"
                        required
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                        placeholder={t.contact.emailPlaceholder}
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (error) setError(null);
                        }}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                          error && !isValidEmailWithDomain(formData.email)
                            ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-slate-200 focus:border-[#C89C50] focus:ring-[#C89C50]/20'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      {lang === 'de' ? 'Telefonnummer' : 'Phone Number'}
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder={t.contact.phonePlaceholder}
                      value={formData.phone}
                      onKeyDown={(e) => {
                        if (
                          ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key) ||
                          ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x', 'z'].includes(e.key.toLowerCase()))
                        ) {
                          return;
                        }
                        if (!/^\d$/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#C89C50] focus:ring-2 focus:ring-[#C89C50]/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      {lang === 'de' ? 'Ihre Nachricht *' : 'Your Message *'}
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder={t.contact.messagePlaceholder}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#C89C50] focus:ring-2 focus:ring-[#C89C50]/20 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#1E2024] hover:bg-[#C89C50] hover:text-[#121316] shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer font-['Outfit',sans-serif]"
                  >
                    {loading ? (
                      <span>...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>{t.contact.sendButton}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>



      </div>
    </section>
  );
};

