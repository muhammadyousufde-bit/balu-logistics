import React from 'react';
import { motion, type Variants } from 'motion/react';
import { CompanySettings, Language } from '../types';
import { Hero } from '../components/Hero';
import { Link } from 'react-router-dom';
import { translations } from '../data/translations';
import {
  Truck,
  Building2,
  Users,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import {
  amazonDnx5StationImg
} from '../data/companyData';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

interface HomePageProps {
  settings: CompanySettings;
  lang: Language;
}

export const HomePage: React.FC<HomePageProps> = ({
  settings,
  lang
}) => {
  const t = translations[lang];
  const hp = t.homePillars;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${settings.address}, ${settings.postalCode} ${settings.city}`
  )}`;

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <Hero
        settings={settings}
        lang={lang}
      />

      {/* 2. Three Core DSP Pillars (Overview & Navigation Gateway) */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="py-10 sm:py-14 bg-white border-b border-slate-100 text-left"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          
          {/* Header */}
          <div className="max-w-3xl mb-8 space-y-2">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#121316] font-['Outfit',sans-serif] tracking-tight leading-tight">
              {hp.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {hp.subtitle}
            </p>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Pillar 1: About / Partnership */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#EAD8B3] flex flex-col justify-between space-y-4 hover:shadow-md hover:border-[#C89C50] transition-all group">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-white border border-[#EAD8B3] flex items-center justify-center text-[#8C6326] group-hover:bg-[#C89C50] group-hover:text-white transition-colors shadow-2xs">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#121316] font-['Outfit',sans-serif]">
                  {hp.pillar1Title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {hp.pillar1Desc}
                </p>
              </div>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#8C6326] group-hover:text-[#121316] transition-colors font-['Outfit',sans-serif] pt-1"
              >
                <span>{hp.pillar1Link}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Pillar 2: Fleet & Technology */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#EAD8B3] flex flex-col justify-between space-y-4 hover:shadow-md hover:border-[#C89C50] transition-all group">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-white border border-[#EAD8B3] flex items-center justify-center text-[#8C6326] group-hover:bg-[#C89C50] group-hover:text-white transition-colors shadow-2xs">
                  <Truck className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#121316] font-['Outfit',sans-serif]">
                  {hp.pillar2Title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {hp.pillar2Desc}
                </p>
              </div>

              <Link
                to="/fleet"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#8C6326] group-hover:text-[#121316] transition-colors font-['Outfit',sans-serif] pt-1"
              >
                <span>{hp.pillar2Link}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Pillar 3: Driver Careers */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#EAD8B3] flex flex-col justify-between space-y-4 hover:shadow-md hover:border-[#C89C50] transition-all group">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-white border border-[#EAD8B3] flex items-center justify-center text-[#8C6326] group-hover:bg-[#C89C50] group-hover:text-white transition-colors shadow-2xs">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#121316] font-['Outfit',sans-serif]">
                  {hp.pillar3Title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {hp.pillar3Desc}
                </p>
              </div>

              <Link
                to="/careers"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#8C6326] group-hover:text-[#121316] transition-colors font-['Outfit',sans-serif] pt-1"
              >
                <span>{hp.pillar3Link}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </div>
      </motion.section>

      {/* 3. Station Hub Spotlight (Amazon DNX5 Paderborn) */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="py-10 sm:py-14 bg-gradient-to-br from-[#FAF7F2] via-[#FDFBF8] to-[#F5EFE6] border-b border-[#EAD8B3] text-left"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#121316] font-['Outfit',sans-serif] tracking-tight leading-tight">
                {hp.hubTitle}
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {hp.hubDesc}
              </p>

              <div className="p-3.5 rounded-xl bg-white border border-[#EAD8B3]/90 space-y-0.5 shadow-2xs">
                <div className="text-xs font-bold text-[#8C6326] uppercase">Offizieller Betriebssitz:</div>
                <div className="text-sm font-bold text-[#121316]">{settings.companyName}</div>
                <div className="text-xs text-slate-600">
                  {settings.address} • {settings.postalCode} {settings.city} ({settings.country})
                </div>
              </div>

              <div className="pt-1 flex flex-wrap items-center gap-3">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#8C6326] bg-white border border-[#EAD8B3] hover:bg-[#FAF7F2] transition-colors shadow-2xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Google Maps Route</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-[#EAD8B3] shadow-md group">
                <img
                  src={amazonDnx5StationImg}
                  alt="Amazon Verteilzentrum DNX5 Paderborn"
                  className="w-full h-[280px] object-cover group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>
      </motion.section>

    </div>
  );
};
