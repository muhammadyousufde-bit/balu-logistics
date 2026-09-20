import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Language } from '../types';
import {
  fleetFacilityImg,
  fleetRowImg,
  fleetResidentialFrontImg,
  fleetResidentialRearImg
} from '../data/companyData';

interface FleetCarouselProps {
  lang: Language;
}

export const FleetCarousel: React.FC<FleetCarouselProps> = ({ lang }) => {
  const slides = [
    {
      src: fleetFacilityImg,
      alt: lang === 'de' 
        ? 'Mercedes-Benz eSprinter der BALU Logistics Flotte am Verteilzentrum'
        : 'Mercedes-Benz eSprinter of BALU Logistics fleet at delivery station',
      caption: lang === 'de'
        ? 'Mercedes-Benz eSprinter • Flottenstart am Verteilzentrum'
        : 'Mercedes-Benz eSprinter • Fleet Hub Departure',
      tag: lang === 'de' ? '100% E-Mobilität' : '100% Electric'
    },
    {
      src: fleetRowImg,
      alt: lang === 'de'
        ? 'Amazon Prime Mercedes eSprinter Flotte in Reihe einsatzbereit'
        : 'Amazon Prime Mercedes eSprinter fleet lineup ready for routes',
      caption: lang === 'de'
        ? 'Moderne E-Flotte • Volle Verfügbarkeit & Einsatzbereitschaft'
        : 'Modern EV Fleet • Maximum Availability & Route Readiness',
      tag: lang === 'de' ? 'Standby-Garantie' : 'Standby Guarantee'
    },
    {
      src: fleetResidentialFrontImg,
      alt: lang === 'de'
        ? 'BALU Logistics Amazon Prime Lieferfahrzeug auf Wohngebietstour'
        : 'BALU Logistics Amazon Prime delivery van on residential route',
      caption: lang === 'de'
        ? 'Emissionsfreie Zustellung • Wohngebiete in Paderborn & OWL'
        : 'Zero-Emission Delivery • Residential Neighborhoods in OWL',
      tag: lang === 'de' ? 'Leise & Nachhaltig' : 'Quiet & Clean'
    },
    {
      src: fleetResidentialRearImg,
      alt: lang === 'de'
        ? 'Amazon Prime Mercedes eSprinter Heckansicht auf Zustelltour'
        : 'Amazon Prime Mercedes eSprinter rear view on active delivery tour',
      caption: lang === 'de'
        ? 'Zuverlässige Last-Mile-Logistik • Pünktlich an jedem Ziel'
        : 'Reliable Last-Mile Logistics • On-Time at Every Stop',
      tag: lang === 'de' ? 'Pünktliche Zustellung' : 'On-Time Delivery'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      // Swiped left
      nextSlide();
    } else if (diff < -45) {
      // Swiped right
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#EAD8B3] shadow-lg bg-slate-900 group select-none transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Fleet Image Carousel"
    >
      {/* Slides Container */}
      <div className="relative h-[340px] sm:h-[390px] lg:h-[420px] w-full overflow-hidden">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
            }`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className={`w-full h-full object-cover transform transition-transform duration-700 ease-out ${
                idx === currentIndex ? 'scale-100' : 'scale-105'
              }`}
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
            {/* Cinematic Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-16 z-20 text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FAF7F2]/95 text-[#8C6326] border border-[#EAD8B3] shadow-xs mb-2 backdrop-blur-xs">
                <Sparkles className="w-3 h-3 text-[#C89C50]" />
                <span>{slide.tag}</span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white tracking-wide font-['Outfit',sans-serif] drop-shadow-sm line-clamp-2">
                {slide.caption}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Top Counter Badge */}
      <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md text-white border border-white/15 px-3 py-1 rounded-full text-xs font-semibold tracking-wider font-['Outfit',sans-serif] shadow-md">
        <span>{currentIndex + 1}</span>
        <span className="text-white/50 mx-1">/</span>
        <span>{slides.length}</span>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-[#121316] hover:text-[#8C6326] border border-[#EAD8B3] shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer backdrop-blur-xs focus:outline-hidden focus:ring-2 focus:ring-[#C89C50]"
        aria-label={lang === 'de' ? 'Vorheriges Bild' : 'Previous slide'}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-[#121316] hover:text-[#8C6326] border border-[#EAD8B3] shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer backdrop-blur-xs focus:outline-hidden focus:ring-2 focus:ring-[#C89C50]"
        aria-label={lang === 'de' ? 'Nächstes Bild' : 'Next slide'}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bottom Indicator Dots */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-hidden ${
              idx === currentIndex
                ? 'w-6 h-2 bg-[#C89C50]'
                : 'w-2 h-2 bg-white/60 hover:bg-white'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
