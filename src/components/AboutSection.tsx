import React from 'react';
import { ShieldCheck, Users, Heart, Zap, BatteryCharging, Navigation2 } from 'lucide-react';
import { CompanySettings, Language } from '../types';
import { translations } from '../data/translations';
import { esprinterAutobahnImg } from '../data/companyData';

interface AboutSectionProps {
  settings: CompanySettings;
  lang: Language;
  hideHeader?: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ settings: _settings, lang, hideHeader = false }) => {
  const t = translations[lang];
  const icons = [ShieldCheck, Users, Heart, Zap];

  return (
    <section id="about" className={`${hideHeader ? 'py-8 sm:py-12' : 'py-10 sm:py-14'} bg-gradient-to-b from-white via-[#FAF7F2]/40 to-white border-b border-slate-200/70 relative overflow-hidden`}>
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#C89C50]/8 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        {!hideHeader && (
          <div className="max-w-3xl text-left space-y-2.5 mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#121316] font-['Outfit',sans-serif] tracking-tight leading-tight">
              {t.about.title}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {t.about.description1}
            </p>
          </div>
        )}

        {/* 2-Column Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Interactive Fleet & Depot Media Showcase */}
          <div className="lg:col-span-6 space-y-4">

            {/* Showcase Visual Card */}
            <div className="relative rounded-2xl overflow-hidden bg-white border border-[#EAD8B3] shadow-md group transition-all">
              <div className="relative h-[320px] sm:h-[380px] overflow-hidden">
                <img
                  src={esprinterAutobahnImg}
                  alt={lang === 'de' ? 'BALU Logistics eSprinter auf Tour' : 'BALU Logistics eSprinter on delivery route'}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Floating Tag inside Photo */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#8C6326] border border-[#EAD8B3] text-[11px] font-bold shadow-xs">
                    {lang === 'de' ? 'Auf Tour in OWL' : 'On Route in East Westphalia'}
                  </span>
                </div>

                {/* Caption bottom overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-left text-white space-y-1">
                  <h3 className="text-base sm:text-lg font-bold font-['Outfit',sans-serif]">
                    {lang === 'de' ? 'Geregelte Tourengebiete' : 'Dedicated Delivery Zones'}
                  </h3>
                  <p className="text-xs text-slate-200 leading-relaxed font-normal">
                    {lang === 'de'
                      ? 'Optimierte Routenführung führt zuverlässig und pünktlich durch alle ostwestfälischen Zustellbezirke.'
                      : 'Optimized routing guides couriers reliably and punctually through all delivery zones.'}
                  </p>
                </div>
              </div>

              {/* Bottom Feature Pill Bar */}
              <div className="p-4 bg-white border-t border-slate-100 grid grid-cols-3 gap-2 text-left">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#121316]">
                    <BatteryCharging className="w-3.5 h-3.5 text-[#C89C50]" />
                    <span>100% E-Mobilität</span>
                  </div>
                  <div className="text-[10px] text-slate-500">Klimaneutral</div>
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#121316]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C89C50]" />
                    <span>TÜV-Geprüft</span>
                  </div>
                  <div className="text-[10px] text-slate-500">Tägliche Checks</div>
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#121316]">
                    <Navigation2 className="w-3.5 h-3.5 text-[#C89C50]" />
                    <span>GPS-App</span>
                  </div>
                  <div className="text-[10px] text-slate-500">Direkte Navigation</div>
                </div>
              </div>

            </div>

          </div>

          {/* Right: The 4 Core Principles with Luxury Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {t.about.values.map((val, idx) => {
              const Icon = icons[idx % icons.length];
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#C89C50] transition-all duration-300 space-y-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#EAD8B3] flex items-center justify-center text-[#8C6326] group-hover:bg-[#1E2024] group-hover:text-[#C89C50] group-hover:border-[#1E2024] transition-all duration-300 shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-[#121316] font-['Outfit',sans-serif] group-hover:text-[#8C6326] transition-colors">
                      {val.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {val.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
