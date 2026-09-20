import React from 'react';
import { CompanySettings, Language } from '../types';
import { translations } from '../data/translations';
import {
  MapPin,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { esprinterChargingImg } from '../data/companyData';
import { FleetCarousel } from '../components/FleetCarousel';

interface FleetPageProps {
  settings: CompanySettings;
  lang: Language;
}

export const FleetPage: React.FC<FleetPageProps> = ({
  settings: _settings,
  lang
}) => {
  const t = translations[lang];
  const fp = t.fleetPage;

  const featureIcons = [MapPin, Zap, ShieldCheck, CheckCircle2];

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header Banner */}
      <section className="relative py-10 sm:py-14 bg-gradient-to-b from-[#FAF7F2] to-white border-b border-slate-100 text-left overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C89C50]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="max-w-3xl space-y-2.5">
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-extrabold text-[#121316] font-['Outfit',sans-serif] tracking-tight leading-[1.12]">
              {fp.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {fp.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Operational Readiness & Standby Fleet */}
      <section className="py-10 sm:py-14 bg-white border-b border-slate-100 text-left">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FAF7F2] text-[#8C6326] border border-[#EAD8B3] shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#C89C50]" />
                <span>{fp.eMobilityBadge}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#121316] font-['Outfit',sans-serif] tracking-tight leading-snug">
                {fp.eMobilityTitle}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {fp.eMobilityDesc}
              </p>

              {/* Operational Standards & Commitments */}
              <div className="space-y-2 pt-1">
                {fp.specs.map((s, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EAD8B3] text-xs gap-1 sm:gap-4 shadow-2xs hover:border-[#C89C50] transition-colors"
                  >
                    <span className="font-bold text-[#8C6326] flex-shrink-0">{s.label}</span>
                    <span className="font-semibold text-[#121316] sm:text-right">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <FleetCarousel lang={lang} />
            </div>

          </div>
        </div>
      </section>

      {/* Operational Standards in Daily Delivery */}
      <section className="py-10 sm:py-14 bg-slate-50/60 border-b border-slate-100 text-left">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl mb-8 space-y-1.5">
            <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#121316] font-['Outfit',sans-serif] tracking-tight">
              {fp.featuresTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {fp.features.map((feat, idx) => {
              const Icon = featureIcons[idx % featureIcons.length];
              return (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 hover:border-[#C89C50] hover:shadow-md transition-all duration-300 group text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#EAD8B3] flex items-center justify-center text-[#8C6326] group-hover:bg-[#1E2024] group-hover:text-[#C89C50] group-hover:border-[#1E2024] transition-all shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-base font-bold text-[#121316] font-['Outfit',sans-serif] group-hover:text-[#8C6326] transition-colors">
                      {feat.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Charging & Green Logistics */}
      <section className="py-10 sm:py-14 bg-white border-b border-slate-100 text-left">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden border border-[#EAD8B3] shadow-md group">
                <img
                  src={esprinterChargingImg}
                  alt="Mercedes-Benz eSprinter Ladevorgang Depot Hub Paderborn"
                  className="w-full h-[280px] object-cover group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-3">
              <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#121316] font-['Outfit',sans-serif] tracking-tight">
                {fp.chargingTitle}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {fp.chargingDesc}
              </p>

              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EAD8B3] space-y-1.5 shadow-2xs">
                <h4 className="text-xs font-bold uppercase text-[#8C6326] font-['Outfit',sans-serif] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C89C50]" />
                  <span>{fp.safetyTitle}</span>
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {fp.safetyDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
