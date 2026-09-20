import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { Mail, Phone, ArrowRight, Menu, X } from 'lucide-react';
import { CompanySettings, Language } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  settings: CompanySettings;
  lang: Language;
  onLanguageChange: (newLang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  lang,
  onLanguageChange
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: lang === 'de' ? 'Startseite' : 'Home', path: '/' },
    { name: t.nav.about, path: '/about' },
    { name: t.nav.careers, path: '/careers' },
    { name: t.nav.fleet, path: '/fleet' },
    { name: t.nav.contact, path: '/contact' },
    { name: t.nav.faqs, path: '/faq' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all">
      {/* Main Navigation Bar */}
      <nav className={`bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all ${
        scrolled ? 'py-3 shadow-sm' : 'py-4'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo companyName={settings.companyName} lang={lang} size="md" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-medium">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `transition-all py-1 font-semibold relative ${
                    isActive
                      ? 'text-[#8C6326]'
                      : 'text-slate-600 hover:text-[#121316]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C89C50] rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Action: Language Switcher (DE | EN) */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center bg-[#FAF7F2] rounded-lg p-0.5 border border-[#EAD8B3]">
              <button
                type="button"
                onClick={() => onLanguageChange('de')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  lang === 'de'
                    ? 'bg-[#1E2024] text-[#DFBA73] shadow-2xs'
                    : 'text-slate-600 hover:text-[#121316]'
                }`}
                title="Auf Deutsch umschalten"
              >
                DE
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-[#1E2024] text-[#DFBA73] shadow-2xs'
                    : 'text-slate-600 hover:text-[#121316]'
                }`}
                title="Switch to English"
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Right Controls: Language Switcher & Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="flex items-center bg-[#FAF7F2] rounded-lg p-0.5 border border-[#EAD8B3]">
              <button
                type="button"
                onClick={() => onLanguageChange('de')}
                className={`px-2 py-0.5 text-xs font-bold rounded transition-all ${
                  lang === 'de'
                    ? 'bg-[#1E2024] text-[#DFBA73]'
                    : 'text-slate-600'
                }`}
              >
                DE
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-0.5 text-xs font-bold rounded transition-all ${
                  lang === 'en'
                    ? 'bg-[#1E2024] text-[#DFBA73]'
                    : 'text-slate-600'
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-[#1E2024] hover:bg-slate-100 cursor-pointer"
              aria-label="Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `py-2.5 text-sm font-semibold transition-colors ${
                      isActive
                        ? 'text-[#8C6326] bg-[#FAF7F2] px-3 rounded-lg border border-[#EAD8B3]'
                        : 'text-slate-700 hover:text-[#8C6326] px-3'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

