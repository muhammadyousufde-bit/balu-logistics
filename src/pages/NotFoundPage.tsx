import React from 'react';
import { Link } from 'react-router-dom';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ArrowLeft, Compass } from 'lucide-react';

interface NotFoundPageProps {
  lang: Language;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white px-4 py-20 text-center">
      <div className="max-w-md space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-[#FAF7F2] text-[#C89C50] border border-[#EAD8B3] flex items-center justify-center mx-auto shadow-xs">
          <Compass className="w-8 h-8" />
        </div>

        <h1 className="text-4xl font-extrabold text-[#121316] font-['Outfit',sans-serif]">
          404
        </h1>

        <h2 className="text-xl font-bold text-[#121316] font-['Outfit',sans-serif]">
          {t.notFound.title}
        </h2>

        <p className="text-xs sm:text-sm text-slate-600">
          {t.notFound.desc}
        </p>

        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#1E2024] hover:bg-[#C89C50] hover:text-[#121316] transition-colors font-['Outfit',sans-serif] shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.notFound.button}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
