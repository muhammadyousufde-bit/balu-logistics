import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { CompanySettings, Language } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  settings: CompanySettings;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  lang
}) => {
  const t = translations[lang];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F1115] text-slate-400 text-xs border-t border-[#1E2024]">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-left">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-3 md:col-span-2">
            <Link to="/">
              <Logo companyName={settings.companyName} lang={lang} size="md" isDark={true} />
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md pt-1">
              {t.footer.desc}
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 font-['Outfit',sans-serif]">
              {t.footer.quickLinksTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-[#C89C50] transition-colors">
                  {lang === 'de' ? 'Startseite' : 'Home'}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#C89C50] transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-[#C89C50] transition-colors">
                  {t.nav.careers}
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="hover:text-[#C89C50] transition-colors">
                  {t.nav.fleet}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C89C50] transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#C89C50] transition-colors">
                  {t.nav.faqs}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: German Station & Contact */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 font-['Outfit',sans-serif]">
              {t.footer.stationTitle}
            </h4>
            <div className="space-y-2 text-xs">
              <p className="text-slate-300 font-medium">
                Amazon Station <span className="text-[#C89C50]">{settings.amazonStationCode}</span>
              </p>
              <p className="text-slate-400 leading-relaxed">
                {settings.address}<br />
                {settings.postalCode} {settings.city}, {settings.country}
              </p>
              <div className="pt-1 space-y-1">
                <a href={`mailto:${settings.officialEmail}`} className="block hover:text-[#C89C50] transition-colors break-all">
                  {settings.officialEmail}
                </a>
                <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="block hover:text-[#C89C50] transition-colors">
                  {settings.phone}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Disclaimer */}
        <div className="mt-10 pt-6 border-t border-[#1E2024] text-[11px] text-slate-500 leading-relaxed text-left">
          <p>{t.footer.disclaimer}</p>
        </div>

        {/* Bottom Bar: Copyright & Impressum / Privacy Routes */}
        <div className="mt-6 pt-4 border-t border-[#1E2024]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} {settings.companyName}. {t.footer.copyright}
          </p>

          <div className="flex items-center gap-4">
            <Link
              to="/impressum"
              className="hover:text-[#C89C50] transition-colors cursor-pointer underline"
            >
              {t.footer.impressum}
            </Link>
            <span className="text-slate-700">•</span>
            <Link
              to="/datenschutz"
              className="hover:text-[#C89C50] transition-colors cursor-pointer underline"
            >
              {t.footer.privacy}
            </Link>
            <span className="text-slate-700">•</span>
            <button
              onClick={scrollToTop}
              className="hover:text-[#C89C50] transition-colors cursor-pointer flex items-center gap-1"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

