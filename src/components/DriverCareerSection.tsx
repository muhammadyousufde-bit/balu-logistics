import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  MapPin,
  Briefcase,
  ChevronRight,
  Sparkles,
  Zap,
  Award,
  HeartHandshake,
  Truck
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
  const [activeTab, setActiveTab] = useState<'benefits' | 'requirements'>('benefits');
  const t = translations[lang];

  const benefitIcons = [
    <Clock className="w-5 h-5" key="0" />,
    <Truck className="w-5 h-5" key="1" />,
    <Award className="w-5 h-5" key="2" />,
    <HeartHandshake className="w-5 h-5" key="3" />,
    <Zap className="w-5 h-5" key="4" />
  ];

  return (
    <section id="careers" className={`${hideHeader ? 'py-8 sm:py-12' : 'py-10 sm:py-14'} bg-white border-b border-slate-100`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
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

        {/* Executive Job Position Feature Banner */}
        <div className="p-5 sm:p-7 rounded-2xl bg-gradient-to-br from-[#FAF7F2] via-[#FDFBF8] to-[#F5EFE6] border border-[#EAD8B3] mb-8 text-left shadow-xs transition-all hover:shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-[#EAD8B3] text-[#8C6326] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{lang === 'de' ? 'Aktive Stellenausschreibung • Sofortiger Einstieg' : 'Active Job Opening • Immediate Start'}</span>
              </div>
              
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#121316] font-['Outfit',sans-serif]">
                {t.careers.jobTitle}
              </h3>

              <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs sm:text-sm text-slate-700">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <MapPin className="w-4 h-4 text-[#C89C50]" />
                  <span>{t.careers.jobLocation}</span>
                </span>
                <span className="text-slate-300">•</span>
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <Briefcase className="w-4 h-4 text-[#C89C50]" />
                  <span>{t.careers.jobType}</span>
                </span>
                <span className="text-slate-300">•</span>
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <Clock className="w-4 h-4 text-[#C89C50]" />
                  <span>{lang === 'de' ? '5- bis 6-Tage-Woche (8-Std.-Schichten)' : '5 to 6-day week (8h shifts)'}</span>
                </span>
              </div>
            </div>

            <button
              onClick={onOpenApply}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-[#121316] bg-[#C89C50] hover:bg-[#DFBA73] shadow-sm hover:shadow-md transition-all cursor-pointer font-['Outfit',sans-serif] self-start lg:self-center"
            >
              <span>{t.careers.ctaButton}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Segmented Switcher */}
        <div className="flex justify-start mb-8">
          <div className="inline-flex items-center p-1.5 bg-[#FAF7F2] rounded-2xl border border-[#EAD8B3] shadow-2xs">
            <button
              onClick={() => setActiveTab('benefits')}
              className={`flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer font-['Outfit',sans-serif] ${
                activeTab === 'benefits'
                  ? 'bg-[#1E2024] text-white shadow-sm'
                  : 'text-[#8C6326] hover:text-[#121316] hover:bg-white/60'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#C89C50]" />
              <span>{t.careers.benefitsTitle}</span>
            </button>

            <button
              onClick={() => setActiveTab('requirements')}
              className={`flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer font-['Outfit',sans-serif] ${
                activeTab === 'requirements'
                  ? 'bg-[#1E2024] text-white shadow-sm'
                  : 'text-[#8C6326] hover:text-[#121316] hover:bg-white/60'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-[#C89C50]" />
              <span>{t.careers.requirementsTitle}</span>
            </button>
          </div>
        </div>

        {/* View 1: What We Offer (Clean List) */}
        {activeTab === 'benefits' && (
          <div className="max-w-4xl space-y-4 text-left">
            <div className="space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-bold text-[#121316] font-['Outfit',sans-serif]">
                {t.careers.benefitsTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {lang === 'de'
                  ? 'Verlässliche Konditionen, ein moderner Fuhrpark und ein faires Miteinander auf Augenhöhe.'
                  : 'Dependable conditions, modern fleet, and a fair, supportive team culture.'}
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-3 pt-1">
              {t.careers.benefits.map((b, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-xl bg-[#FAF7F2] border border-[#EAD8B3] text-left hover:border-[#C89C50] transition-colors shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#EAD8B3] flex items-center justify-center text-[#8C6326] flex-shrink-0 shadow-2xs mt-0.5">
                    {benefitIcons[idx % benefitIcons.length]}
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="text-sm sm:text-base font-bold text-[#121316] font-['Outfit',sans-serif]">
                      {b.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>


          </div>
        )}

        {/* View 2: What We Look For (Clean List - No Checklist Menu) */}
        {activeTab === 'requirements' && (
          <div className="max-w-4xl space-y-4 text-left">
            <div className="space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-bold text-[#121316] font-['Outfit',sans-serif]">
                {t.careers.requirementsTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {lang === 'de'
                  ? 'Ein normaler PKW-Führerschein (Klasse B) reicht vollkommen aus – kein LKW-Führerschein oder logistische Vorerfahrung nötig!'
                  : 'A standard car license (Class B) is all you need – no commercial trucking license or previous delivery experience required!'}
              </p>
            </div>

            {/* Requirements List (Pure Clean List) */}
            <div className="space-y-3 pt-1">
              {t.careers.requirements.map((req, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-4 rounded-xl bg-[#FAF7F2] border border-[#EAD8B3] text-left hover:border-[#C89C50] transition-colors shadow-2xs"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#C89C50] flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold text-[#121316] leading-relaxed">
                    {req}
                  </span>
                </div>
              ))}
            </div>


          </div>
        )}

      </div>
    </section>
  );
};
