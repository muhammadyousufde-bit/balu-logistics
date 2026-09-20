import React, { useState } from 'react';
import { X, CheckCircle2, Mail, ArrowRight, ArrowLeft, ExternalLink, Copy, Check, Sparkles, User, FileCheck, Briefcase } from 'lucide-react';
import { CompanySettings, DriverApplication, Language } from '../types';
import { translations } from '../data/translations';

interface DriverApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: CompanySettings;
  lang: Language;
  onApplicationSuccess?: (app: DriverApplication) => void;
}

export const DriverApplicationModal: React.FC<DriverApplicationModalProps> = ({
  isOpen,
  onClose,
  settings,
  lang,
  onApplicationSuccess
}) => {
  const t = translations[lang].applyModal;

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    postalCode: '',
    hasClassBLicense: true,
    isMinAge: true,
    workPermitEU: true,
    employmentType: 'full-time' as 'full-time' | 'part-time' | 'mini-job',
    experienceYears: t.experienceOptions[0],
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    id: string;
    targetEmail: string;
    mailtoUrl: string;
    application: DriverApplication;
  } | null>(null);

  if (!isOpen) return null;

  const isValidEmailWithDomain = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateStep = (step: number): boolean => {
    setError(null);
    if (step === 1) {
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        setError(lang === 'de' ? 'Bitte Vor- und Nachnamen eingeben.' : 'Please provide your first and last name.');
        return false;
      }
      if (!isValidEmailWithDomain(formData.email)) {
        setError(
          lang === 'de'
            ? 'Bitte eine gültige E-Mail-Adresse mit Domain angeben (z. B. name@beispiel.de).'
            : 'Please provide a valid email address with a domain (e.g. name@example.com).'
        );
        return false;
      }
      if (!formData.phone.trim()) {
        setError(lang === 'de' ? 'Bitte eine Telefonnummer für den Rückruf angeben.' : 'Please provide a phone number for callback.');
        return false;
      }
      if (!/^\d{5,}$/.test(formData.phone.trim())) {
        setError(
          lang === 'de'
            ? 'Bitte eine gültige Telefonnummer eingeben (nur Zahlen, mindestens 5 Ziffern).'
            : 'Please provide a valid phone number (only numbers, at least 5 digits).'
        );
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3);
      }
    }
  };

  const prevStep = () => {
    setError(null);
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
    }
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1)) {
      setCurrentStep(1);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Fehler beim Absenden');
      }

      setSubmittedData({
        id: data.id,
        targetEmail: data.targetEmail || settings.officialEmail,
        mailtoUrl: data.mailtoUrl,
        application: data.application
      });

      if (onApplicationSuccess && data.application) {
        onApplicationSuccess(data.application);
      }
    } catch (err: any) {
      setError(err.message || 'Die Bewerbung konnte nicht verarbeitet werden.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { num: 1, label: t.step1Name, icon: User },
    { num: 2, label: t.step2Name, icon: FileCheck },
    { num: 3, label: t.step3Name, icon: Briefcase }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-left">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="space-y-0.5">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#8C6326]">
              <Sparkles className="w-3 h-3 text-[#C89C50]" />
              <span>{t.badge} • BALU Logistics</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#121316] font-['Outfit',sans-serif]">
              {t.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3-Step Interactive Stepper Bar (if not submitted) */}
        {!submittedData && (
          <div className="px-6 py-3 bg-[#FAF7F2] border-b border-[#EAD8B3]/80">
            <div className="flex items-center justify-between">
              {steps.map((s, idx) => {
                const IconComponent = s.icon;
                const isActive = currentStep === s.num;
                const isCompleted = currentStep > s.num;

                return (
                  <button
                    key={s.num}
                    type="button"
                    onClick={() => {
                      if (s.num < currentStep || validateStep(currentStep)) {
                        setCurrentStep(s.num as 1 | 2 | 3);
                      }
                    }}
                    className={`flex items-center gap-2 text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'text-[#121316]'
                        : isCompleted
                        ? 'text-[#8C6326]'
                        : 'text-slate-400'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                        isActive
                          ? 'bg-[#1E2024] text-white'
                          : isCompleted
                          ? 'bg-[#C89C50] text-white'
                          : 'bg-white border border-slate-200 text-slate-400'
                      }`}
                    >
                      {isCompleted ? <Check className="w-3 h-3" /> : s.num}
                    </div>
                    <span className="hidden sm:inline">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {submittedData ? (
            /* Success View */
            <div className="py-6 text-center space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-[#FAF7F2] text-[#C89C50] border border-[#EAD8B3] flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl sm:text-2xl font-bold text-[#121316] font-['Outfit',sans-serif]">
                  {t.successTitle}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  {t.successDesc}
                </p>
              </div>

              {/* Reference ID Card with One-Click Copy */}
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EAD8B3] max-w-sm mx-auto flex items-center justify-between">
                <div className="text-left">
                  <span className="text-[11px] text-[#8C6326] font-semibold block">{t.refNumber}</span>
                  <span className="font-mono font-bold text-sm text-[#121316]">{submittedData.id}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyId(submittedData.id)}
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-[#EAD8B3] hover:bg-[#C89C50] hover:text-white text-xs font-semibold text-[#8C6326] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Kopiert' : 'Kopieren'}</span>
                </button>
              </div>

              {/* Target Email Info */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs text-slate-600 space-y-1 max-w-md mx-auto">
                <div className="flex items-center gap-1.5 font-semibold text-[#121316]">
                  <Mail className="w-4 h-4 text-[#C89C50]" />
                  <span>
                    {lang === 'de' ? 'Direkt weitergeleitet an:' : 'Application sent to:'}
                  </span>
                </div>
                <div className="font-mono font-bold text-[#121316] break-all">
                  {submittedData.targetEmail}
                </div>
                <p className="text-[11px] text-slate-500 pt-1">
                  {lang === 'de'
                    ? 'Unser Recruiting-Team am Standort Paderborn prüft deine Angaben und meldet sich innerhalb von 24 Stunden.'
                    : 'Our hiring team in Paderborn is reviewing your application and will contact you within 24 hours.'}
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={submittedData.mailtoUrl}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-[#FAF7F2] hover:text-[#8C6326] hover:border-[#EAD8B3] border border-transparent transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{t.sendEmailCopy}</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold text-white bg-[#1E2024] hover:bg-[#C89C50] hover:text-[#121316] transition-colors font-['Outfit',sans-serif] cursor-pointer"
                >
                  {t.closeButton}
                </button>
              </div>
            </div>
          ) : (
            /* Multi-Step Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium animate-in fade-in">
                  {error}
                </div>
              )}

              {/* Step 1: Personal Data */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="border-b border-slate-100 pb-2">
                    <h4 className="text-sm font-bold text-[#121316] font-['Outfit',sans-serif]">
                      {t.step1Title}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {lang === 'de' ? 'Wie können wir dich am besten erreichen?' : 'How can we best reach you?'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        {t.firstName}
                      </label>
                      <input
                        type="text"
                        required
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Max"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#C89C50] focus:ring-2 focus:ring-[#C89C50]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        {t.lastName}
                      </label>
                      <input
                        type="text"
                        required
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Mustermann"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#C89C50] focus:ring-2 focus:ring-[#C89C50]/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        {t.email}
                      </label>
                      <input
                        type="email"
                        required
                        name="email"
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="beispiel@domain.de"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#C89C50] focus:ring-2 focus:ring-[#C89C50]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        {t.phone}
                      </label>
                      <input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        required
                        name="phone"
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
                        onChange={handleChange}
                        placeholder="015201234567"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#C89C50] focus:ring-2 focus:ring-[#C89C50]/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        {t.postalCode}
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        placeholder="33102"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#C89C50] focus:ring-2 focus:ring-[#C89C50]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        {t.city}
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Paderborn"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#C89C50] focus:ring-2 focus:ring-[#C89C50]/20 transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: German Requirements Checkboxes */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="border-b border-slate-100 pb-2">
                    <h4 className="text-sm font-bold text-[#121316] font-['Outfit',sans-serif]">
                      {t.step2Title}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {lang === 'de' ? 'Gesetzliche Grundlagen für die Fahreranstellung' : 'Legal qualifications for driver position'}
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-[#FAF7F2] hover:border-[#EAD8B3] cursor-pointer text-xs text-slate-800 transition-colors">
                      <input
                        type="checkbox"
                        name="hasClassBLicense"
                        checked={formData.hasClassBLicense}
                        onChange={handleChange}
                        className="mt-0.5 rounded accent-[#C89C50] w-4 h-4 cursor-pointer"
                      />
                      <span className="font-medium leading-relaxed">{t.licenseLabel}</span>
                    </label>

                    <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-[#FAF7F2] hover:border-[#EAD8B3] cursor-pointer text-xs text-slate-800 transition-colors">
                      <input
                        type="checkbox"
                        name="isMinAge"
                        checked={formData.isMinAge}
                        onChange={handleChange}
                        className="mt-0.5 rounded accent-[#C89C50] w-4 h-4 cursor-pointer"
                      />
                      <span className="font-medium leading-relaxed">{t.ageLabel}</span>
                    </label>

                    <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-[#FAF7F2] hover:border-[#EAD8B3] cursor-pointer text-xs text-slate-800 transition-colors">
                      <input
                        type="checkbox"
                        name="workPermitEU"
                        checked={formData.workPermitEU}
                        onChange={handleChange}
                        className="mt-0.5 rounded accent-[#C89C50] w-4 h-4 cursor-pointer"
                      />
                      <span className="font-medium leading-relaxed">{t.workPermitLabel}</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 3: Work Preferences & Notes */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="border-b border-slate-100 pb-2">
                    <h4 className="text-sm font-bold text-[#121316] font-['Outfit',sans-serif]">
                      {t.step3Title}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {lang === 'de' ? 'Deine Einsatzwünsche und Vorerfahrung' : 'Your schedule preferences and experience'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        {t.employmentTypeLabel}
                      </label>
                      <select
                        name="employmentType"
                        value={formData.employmentType}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 bg-white focus:outline-none focus:border-[#C89C50] focus:ring-2 focus:ring-[#C89C50]/20 transition-all"
                      >
                        <option value="full-time">{t.fullTime}</option>
                        <option value="part-time">{t.partTime}</option>
                        <option value="mini-job">{t.miniJob}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        {t.experienceLabel}
                      </label>
                      <select
                        name="experienceYears"
                        value={formData.experienceYears}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 bg-white focus:outline-none focus:border-[#C89C50] focus:ring-2 focus:ring-[#C89C50]/20 transition-all"
                      >
                        {t.experienceOptions.map((opt, i) => (
                          <option key={i} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      {t.notesLabel}
                    </label>
                    <textarea
                      rows={3}
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder={t.notesPlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#C89C50] focus:ring-2 focus:ring-[#C89C50]/20 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Footer Stepper Controls */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{t.prevButton}</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#1E2024] hover:bg-[#C89C50] hover:text-[#121316] transition-all flex items-center gap-2 cursor-pointer font-['Outfit',sans-serif]"
                  >
                    <span>{t.nextButton} {currentStep + 1}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#1E2024] hover:bg-[#C89C50] hover:text-[#121316] shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer font-['Outfit',sans-serif]"
                  >
                    {loading ? (
                      <span>{t.submitting}</span>
                    ) : (
                      <>
                        <span>{t.submitButton}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                )}
              </div>

              <p className="text-[11px] text-slate-500 text-center pt-1">
                {t.privacyNote}
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

