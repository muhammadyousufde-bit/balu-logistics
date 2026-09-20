import React from 'react';
import { CompanySettings, Language } from '../types';
import { translations } from '../data/translations';
import { FaqSection } from '../components/FaqSection';

interface FaqPageProps {
  settings: CompanySettings;
  lang: Language;
  onOpenApply?: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({
  settings,
  lang
}) => {
  const t = translations[lang];

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header Banner consistent with About, Careers, Fleet & Contact */}
      <section className="relative py-10 sm:py-14 bg-gradient-to-b from-[#FAF7F2] to-white border-b border-slate-100 text-left overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C89C50]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="max-w-3xl space-y-2.5">
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-extrabold text-[#121316] font-['Outfit',sans-serif] tracking-tight leading-[1.12]">
              {t.faqPage.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {t.faqPage.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Clean FAQ Accordion List */}
      <FaqSection
        settings={settings}
        lang={lang}
        hideHeader={true}
      />
    </div>
  );
};
