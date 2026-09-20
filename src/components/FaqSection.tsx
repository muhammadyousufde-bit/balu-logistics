import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { CompanySettings, Language } from '../types';
import { translations } from '../data/translations';

interface FaqSectionProps {
  settings: CompanySettings;
  lang: Language;
  hideHeader?: boolean;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  settings,
  lang,
  hideHeader = false
}) => {
  const t = translations[lang];
  const faqData = t.faqPage;

  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  return (
    <section className="py-12 sm:py-16 bg-white text-left" id="faqs">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">

        {/* Optional standalone header */}
        {!hideHeader && (
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#EAD8B3] text-[#8C6326] text-xs font-bold uppercase tracking-wider font-['Outfit',sans-serif]">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{faqData.sectionTag}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121316] font-['Outfit',sans-serif] tracking-tight leading-tight">
              {faqData.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {faqData.subtitle}
            </p>
          </div>
        )}

        {/* FAQs Accordion List */}
        <div className="space-y-3">
          {faqData.faqs.map((faq) => {
            const isOpen = openFaqId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl transition-all overflow-hidden border ${
                  isOpen
                    ? 'bg-[#FAF7F2]/60 border-[#C89C50] shadow-sm ring-1 ring-[#C89C50]/20'
                    : 'bg-white border-slate-200/90 hover:border-[#C89C50]/50 shadow-2xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 cursor-pointer select-none group"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-xs sm:text-sm md:text-base font-bold text-[#121316] font-['Outfit',sans-serif] leading-snug group-hover:text-[#8C6326] transition-colors">
                    {faq.question}
                  </h3>

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      isOpen
                        ? 'bg-[#C89C50] text-white rotate-180'
                        : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-6 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-[#EAD8B3]/60 bg-white/70">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
