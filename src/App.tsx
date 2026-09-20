import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { CompanySettings, Language } from './types';
import { defaultCompanySettings } from './data/companyData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { DriverApplicationModal } from './components/DriverApplicationModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CareersPage } from './pages/CareersPage';
import { FleetPage } from './pages/FleetPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { ImpressumPage } from './pages/ImpressumPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const [lang, setLang] = useState<Language>('de');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001
  });

  const [settings, setSettings] = useState<CompanySettings>(() => {
    const saved = localStorage.getItem('balu_logistics_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.amazonStationCode === 'DNX5' && parsed.address?.includes('Navarrastr')) {
          return parsed;
        }
      } catch (e) {
        // fallback
      }
    }
    return defaultCompanySettings;
  });

  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Monitor scroll offset for floating Back to Top button (> 500px)
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch initial settings from server
  useEffect(() => {
    fetch('/api/settings')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.companyName) {
          setSettings((prev) => ({ ...prev, ...data }));
        }
      })
      .catch(() => {
        // fallback to default
      });
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-white text-slate-900 flex flex-col antialiased selection:bg-[#C89C50] selection:text-white">
        {/* Sleek Scroll Progress Bar at very top */}
        <motion.div
          id="scroll-progress-bar"
          className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C89C50] via-[#DFBA73] to-[#C89C50] origin-left z-50 pointer-events-none shadow-[0_1px_6px_rgba(200,156,80,0.4)]"
          style={{ scaleX }}
        />

        {/* Navigation Bar with DE | EN switcher */}
        <Navbar
          settings={settings}
          lang={lang}
          onLanguageChange={setLang}
        />

        {/* Main Multi-Page Routed Content */}
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  settings={settings}
                  lang={lang}
                />
              }
            />
            <Route
              path="/about"
              element={
                <AboutPage
                  settings={settings}
                  lang={lang}
                />
              }
            />
            <Route
              path="/careers"
              element={
                <CareersPage
                  settings={settings}
                  lang={lang}
                  onOpenApply={() => setIsApplyOpen(true)}
                />
              }
            />
            <Route
              path="/fleet"
              element={
                <FleetPage
                  settings={settings}
                  lang={lang}
                />
              }
            />
            <Route
              path="/contact"
              element={
                <ContactPage
                  settings={settings}
                  lang={lang}
                />
              }
            />
            <Route
              path="/faq"
              element={
                <FaqPage
                  settings={settings}
                  lang={lang}
                  onOpenApply={() => setIsApplyOpen(true)}
                />
              }
            />
            <Route
              path="/faqs"
              element={
                <FaqPage
                  settings={settings}
                  lang={lang}
                  onOpenApply={() => setIsApplyOpen(true)}
                />
              }
            />
            <Route
              path="/impressum"
              element={
                <ImpressumPage
                  settings={settings}
                  lang={lang}
                />
              }
            />
            <Route
              path="/datenschutz"
              element={
                <PrivacyPage
                  settings={settings}
                  lang={lang}
                />
              }
            />
            <Route
              path="*"
              element={
                <NotFoundPage
                  lang={lang}
                />
              }
            />
          </Routes>
        </main>

        {/* Minimalist Footer */}
        <Footer
          settings={settings}
          lang={lang}
        />

        {/* Quick-Apply Modal forwarding directly to official email */}
        <DriverApplicationModal
          isOpen={isApplyOpen}
          onClose={() => setIsApplyOpen(false)}
          settings={settings}
          lang={lang}
        />

        {/* Floating Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              id="back-to-top-button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              initial={{ opacity: 0, y: 16, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.85 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#1E2024] text-white shadow-lg shadow-black/20 border border-[#2C3038] hover:bg-[#2C3038] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C89C50] focus:ring-offset-2 cursor-pointer flex items-center justify-center group"
              aria-label={lang === 'de' ? 'Nach oben scrollen' : 'Back to top'}
              title={lang === 'de' ? 'Nach oben scrollen' : 'Back to top'}
            >
              <ArrowUp className="w-4 h-4 text-slate-200 group-hover:text-white transition-colors" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
}

