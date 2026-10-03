import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, Zap, Star, ChevronRight } from 'lucide-react';
import { CompanySettings, Language } from '../types';
import { translations } from '../data/translations';

import dnx5HeroImg from '../assets/images/dnx5_hero.jpg';

interface HeroProps {
  settings: CompanySettings;
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ settings, lang }) => {
  const t = translations[lang];

  const [heroImgSrc, setHeroImgSrc] = useState<string>(dnx5HeroImg);
  const [imgError, setImgError] = useState<boolean>(false);

  return (
    <section className="relative bg-gradient-to-b from-[#FAF7F2]/50 via-white to-white pt-6 sm:pt-8 pb-10 sm:pb-12 border-b border-slate-200/70 overflow-hidden">
      {/* Background Architectural Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(#1E2024 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Dual Luxury Ambient Spotlights */}
      <div className="absolute -top-24 right-10 w-[620px] h-[620px] bg-gradient-to-br from-[#C89C50]/15 via-[#DFBA73]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 -left-20 w-[450px] h-[450px] bg-gradient-to-tr from-slate-200/40 via-[#FAF7F2]/60 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative">
        
        {/* Main 2-Column Hero Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: High-Impact Corporate Typography & Actions */}
          <div className="lg:col-span-6 space-y-6 text-left">
            

            {/* Main Headline */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-extrabold text-[#121316] tracking-tight leading-[1.12] font-['Outfit',sans-serif]">
                {lang === 'de' ? (
                  <>
                    Präzise Logistik.{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8C6326] via-[#C89C50] to-[#8C6326]">
                      Erstklassiges Team.
                    </span>
                  </>
                ) : (
                  <>
                    Precision Delivery.{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8C6326] via-[#C89C50] to-[#8C6326]">
                      Exceptional Team.
                    </span>
                  </>
                )}
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-lg">
              {lang === 'de' 
                ? 'Als offizieller Amazon Delivery Service Partner sorgen wir täglich für die verlässliche, sichere und umweltfreundliche Paketzustellung in Paderborn und der gesamten Region Ostwestfalen.'
                : 'As an official Amazon Delivery Service Partner, we deliver thousands of packages daily with unmatched reliability, safety, and modern electric fleets across Paderborn and East Westphalia.'}
            </p>

            {/* Interactive Quick-Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="flex items-center gap-2 text-xs font-medium text-[#1E2024] bg-white/80 border border-slate-200/80 rounded-lg p-2 shadow-2xs">
                <div className="w-5 h-5 rounded-md bg-[#FAF7F2] text-[#8C6326] flex items-center justify-center flex-shrink-0">
                  <Zap className="w-3 h-3" />
                </div>
                <span>{lang === 'de' ? '100% Moderne Mercedes E-Flotte' : '100% Modern Mercedes eFleet'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#1E2024] bg-white/80 border border-slate-200/80 rounded-lg p-2 shadow-2xs">
                <div className="w-5 h-5 rounded-md bg-[#FAF7F2] text-[#8C6326] flex items-center justify-center flex-shrink-0">
                  <Shield className="w-3 h-3" />
                </div>
                <span>{lang === 'de' ? 'Feste Routen & pünktliche Bezahlung' : 'Fixed routes & reliable pay'}</span>
              </div>
            </div>

            {/* Action Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                to="/careers"
                className="group relative inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl text-sm font-bold text-white bg-[#1E2024] hover:bg-[#C89C50] hover:text-[#121316] transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-[#C89C50]/25 cursor-pointer font-['Outfit',sans-serif] overflow-hidden"
              >
                <span className="relative z-10">{lang === 'de' ? 'Stellenangebote ansehen' : 'View Open Positions'}</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold text-[#121316] bg-white hover:bg-[#FAF7F2] hover:text-[#8C6326] border border-slate-300 hover:border-[#C89C50] transition-all duration-300 shadow-2xs cursor-pointer font-['Outfit',sans-serif]"
              >
                <span>{t.hero.ctaAbout}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>

            {/* Micro Trust Banner */}
            <p className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C89C50]" />
              <span>
                {lang === 'de' 
                  ? 'Bewerbung in unter 60 Sekunden • Kein Lebenslauf erforderlich • Direkte Rückmeldung'
                  : 'Apply in under 60 seconds • No resume required • Direct confirmation'}
              </span>
            </p>

          </div>

          {/* Right Column: Ultra-Premium Studio Stage & Telemetry Badges */}
          <div className="lg:col-span-6 relative mt-4 lg:mt-0">
            
            {/* Ambient Lighting Dome behind the vehicle */}
            <div className="absolute inset-0 -top-8 bg-radial from-[#C89C50]/20 via-[#FAF7F2]/40 to-transparent rounded-full blur-2xl transform scale-110 pointer-events-none" />

            <div className="relative group perspective-1000">
              
              {/* Studio Floating Pedestal Base */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-12 bg-gradient-to-r from-transparent via-[#C89C50]/25 to-transparent rounded-full blur-xl -z-10" />

              {/* Amazon Delivery Station DNX5 Hero Image */}
              <div className="relative z-10 py-3 sm:py-4 flex items-center justify-center">
                <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#EAD8B3]/90 shadow-2xl shadow-black/15 group-hover:shadow-[#C89C50]/20 transition-all duration-500">
                  <img
                    src={heroImgSrc}
                    alt="Amazon Verteilzentrum DNX5 Paderborn - BALU Logistics"
                    className="w-full h-auto max-h-[380px] sm:max-h-[420px] object-cover transition-all duration-700 group-hover:scale-[1.03]"
                    onError={() => {
                      if (heroImgSrc !== '/dnx5_hero.jpg') {
                        setHeroImgSrc('/dnx5_hero.jpg');
                      } else {
                        setImgError(true);
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Centered Symmetrical Top DSP Partner Badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 bg-white/95 backdrop-blur-md border border-[#EAD8B3] rounded-full px-4 py-2 shadow-lg shadow-black/10 flex items-center gap-2 hover:scale-105 transition-transform whitespace-nowrap">
                <div className="flex items-center text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="text-[11px] font-bold text-[#121316] font-['Outfit',sans-serif] tracking-wide">
                  Top DSP Partner
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Executive Floating KPI Metric Strip */}
        <div className="mt-14 pt-2">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-[#EAD8B3]/90 shadow-md p-6 grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-200/70 text-left">
            
            {/* Stat 1 */}
            <div className="pt-3 md:pt-0 md:px-4 space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#121316] font-['Outfit',sans-serif]">
                {settings.amazonStationCode || 'DNX5'}
              </div>
              <div className="text-xs text-slate-600 font-medium">
                {lang === 'de' ? 'Autorisierter Amazon DSP' : 'Authorized Amazon DSP'}
              </div>
            </div>

            {/* Stat 2 */}
            <div className="pt-3 md:pt-0 md:px-4 space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#121316] font-['Outfit',sans-serif]">
                100%
              </div>
              <div className="text-xs text-slate-600 font-medium">
                {lang === 'de' ? 'Neuste Mercedes & E-Flotte' : 'Modern Mercedes & EV Fleet'}
              </div>
            </div>

            {/* Stat 3 */}
            <div className="pt-3 md:pt-0 md:px-4 space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#121316] font-['Outfit',sans-serif]">
                30+
              </div>
              <div className="text-xs text-slate-600 font-medium">
                {lang === 'de' ? 'Feste Routen in OWL' : 'Daily Dedicated Routes'}
              </div>
            </div>

            {/* Stat 4 */}
            <div className="pt-3 md:pt-0 md:px-4 space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#121316] font-['Outfit',sans-serif] flex items-center gap-1.5">
                <span>4.9</span>
                <div className="flex text-[#C89C50]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>
              <div className="text-xs text-slate-600 font-medium">
                {lang === 'de' ? 'Fahrer- & Teamzufriedenheit' : 'Driver & Team Satisfaction'}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
