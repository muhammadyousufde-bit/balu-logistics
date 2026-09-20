import React from 'react';
import { CompanySettings, Language } from '../types';
import { translations } from '../data/translations';
import { AboutSection } from '../components/AboutSection';
import { CheckCircle2 } from 'lucide-react';
import { amazonDriverEquipmentUniformsImg } from '../data/companyData';

interface AboutPageProps {
  settings: CompanySettings;
  lang: Language;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  settings,
  lang
}) => {
  const t = translations[lang];

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header Banner */}
      <section className="relative py-10 sm:py-14 bg-gradient-to-b from-[#FAF7F2] to-white border-b border-slate-100 text-left overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C89C50]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="max-w-3xl space-y-2.5">
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-extrabold text-[#121316] font-['Outfit',sans-serif] tracking-tight leading-[1.12]">
              {t.about.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {t.about.description1}
            </p>
          </div>
        </div>
      </section>

      {/* Main Interactive About Showcase without duplicated header */}
      <AboutSection settings={settings} lang={lang} hideHeader={true} />

      {/* Deep Dive: Station & Infrastructure with authentic BALU Logistik van */}
      <section className="py-10 sm:py-14 bg-slate-50/60 border-b border-slate-100 text-left">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-3.5">
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#121316] font-['Outfit',sans-serif] tracking-tight leading-snug">
                {lang === 'de'
                  ? 'Zentraler Betriebshof im Gewerbegebiet Mönkeloh'
                  : 'Central Operations Hub in Mönkeloh Paderborn'}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {lang === 'de'
                  ? 'Von unserer Betriebsstätte am Amazon Verteilzentrum DNX5 (Navarrastraße 8, 33106 Paderborn) bedienen wir täglich Zustellbezirke in Paderborn und den umliegenden Landkreisen. Die direkte Anbindung an die A33 ermöglicht schnelle Tourenstarts ohne Stadtverkehrsstau.'
                  : 'From our operating station at the Amazon Delivery Hub DNX5 (Navarrastraße 8, 33106 Paderborn), we serve delivery areas across Paderborn and surrounding districts daily. Direct access to the A33 ensures quick departure without urban bottlenecks.'}
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs text-xs sm:text-sm text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#C89C50] flex-shrink-0" />
                  <span>{lang === 'de' ? 'Offizieller Amazon Delivery Service Partner (DSP)' : 'Authorized Amazon Delivery Service Partner (DSP)'}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs text-xs sm:text-sm text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#C89C50] flex-shrink-0" />
                  <span>{lang === 'de' ? 'Gewerbeerlaubnis nach § 3 GüKG (Güterkraftverkehrsgesetz)' : 'Freight transport license under § 3 GüKG'}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs text-xs sm:text-sm text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#C89C50] flex-shrink-0" />
                  <span>{lang === 'de' ? '100% Bereitstellung von Fahrzeugen, Kleidung & Scannern' : '100% Company-provided vans, uniforms & mobile scanners'}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-[#EAD8B3] shadow-lg group">
                <img
                  src={amazonDriverEquipmentUniformsImg}
                  alt="Amazon Fahrer-Ausstattung, Uniformen und Scanner-App"
                  className="w-full h-[360px] object-cover group-hover:scale-102 transition-transform duration-500"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
