import React from 'react';
import {
  CheckCircle2,
  MapPin,
  Briefcase,
  ChevronRight,
  Sparkles,
  Truck,
  Timer,
  Zap
} from 'lucide-react';
import { CompanySettings, Language } from '../types';
import { translations } from '../data/translations';

interface DriverCareerSectionProps {
  settings: CompanySettings;
  lang: Language;
  onOpenApply: () => void;
  hideHeader?: boolean;
}

export const DriverCareerSection: React.FC<DriverCareerSectionProps> = ({
  settings: _settings,
  lang,
  onOpenApply,
  hideHeader = false
}) => {
  const t = translations[lang];

  return (
    <section id="careers" className={`${hideHeader ? 'py-8 sm:py-12' : 'py-10 sm:py-14'} bg-white border-b border-slate-100`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        
        {/* Optional Section Header */}
        {!hideHeader && (
          <div className="max-w-3xl text-left mb-8 space-y-2">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#121316] font-['Outfit',sans-serif] tracking-tight leading-tight">
              {t.careers.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {t.careers.subtitle}
            </p>
          </div>
        )}

        {/* Single Unified DHL-Style Job Posting Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#EAD8B3] p-6 sm:p-8 lg:p-10 shadow-xs hover:shadow-sm transition-all text-left">
          
          {/* Header, Tags & Short Intro */}
          <div className="space-y-3 pb-6 sm:pb-8 border-b border-[#EAD8B3]/60">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF7F2] border border-[#EAD8B3] text-[#8C6326] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{lang === 'de' ? 'Aktive Stelle • Sofortiger Einstieg' : 'Active Opening • Immediate Start'}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF7F2] border border-[#EAD8B3] text-[#121316] shadow-2xs">
                <Briefcase className="w-3.5 h-3.5 text-[#C89C50]" />
                <span>{t.careers.jobType}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-[#C89C50]" />
                <span>Paderborn (DNX5)</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121316] font-['Outfit',sans-serif] tracking-tight">
              {t.careers.jobTitle}
            </h2>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-3xl pt-1">
              {t.careers.jobIntro}
            </p>
          </div>

          {/* 3 Clean Scannable Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 py-6 sm:py-8">
            
            {/* Section 1: Was wir bieten */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF7F2] border border-[#EAD8B3] flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2.5 text-[#121316] mb-4">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#EAD8B3] flex items-center justify-center text-[#C89C50] shadow-2xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-['Outfit',sans-serif] text-[#121316]">
                    {t.careers.offerTitle}
                  </h3>
                </div>

                <ul className="space-y-3">
                  {t.careers.offerItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#C89C50] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 2: Deine Aufgaben */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF7F2] border border-[#EAD8B3] flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2.5 text-[#121316] mb-4">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#EAD8B3] flex items-center justify-center text-[#C89C50] shadow-2xs">
                    <Truck className="w-4 h-4" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-['Outfit',sans-serif] text-[#121316]">
                    {t.careers.tasksTitle}
                  </h3>
                </div>

                <ul className="space-y-3">
                  {t.careers.tasksItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C89C50] flex-shrink-0 mt-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 3: Was du mitbringst */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF7F2] border border-[#EAD8B3] flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2.5 text-[#121316] mb-4">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#EAD8B3] flex items-center justify-center text-[#C89C50] shadow-2xs">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-['Outfit',sans-serif] text-[#121316]">
                    {t.careers.requirementsTitle}
                  </h3>
                </div>

                <ul className="space-y-3">
                  {t.careers.requirementsItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C89C50] flex-shrink-0 mt-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Call to Action Footer */}
          <div className="pt-6 sm:pt-8 border-t border-[#EAD8B3]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
              <span className="inline-flex items-center gap-1 font-medium text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'de' ? 'Kein Lebenslauf zwingend' : 'No CV required'}</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1 font-medium">
                <Timer className="w-3.5 h-3.5 text-[#C89C50]" />
                <span>{lang === 'de' ? '2-Minuten-Kurzbewerbung' : 'Quick 2-minute apply'}</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1 font-medium">
                <Zap className="w-3.5 h-3.5 text-[#C89C50]" />
                <span>{lang === 'de' ? 'Sofortiger Einstieg' : 'Start immediately'}</span>
              </span>
            </div>

            <button
              onClick={onOpenApply}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm sm:text-base font-bold text-[#121316] bg-[#C89C50] hover:bg-[#DFBA73] shadow-sm hover:shadow-md transition-all cursor-pointer font-['Outfit',sans-serif] self-stretch sm:self-auto"
            >
              <span>{t.careers.ctaButton}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
