import React from 'react';
import { CompanySettings, Language } from '../types';
import { translations } from '../data/translations';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ImpressumPageProps {
  settings: CompanySettings;
  lang: Language;
}

export const ImpressumPage: React.FC<ImpressumPageProps> = ({ settings, lang }) => {
  const t = translations[lang];

  return (
    <div className="bg-white min-h-screen py-16 sm:py-24 text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C6326] hover:text-[#C89C50] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{lang === 'de' ? 'Zurück zur Startseite' : 'Back to Homepage'}</span>
        </Link>

        {/* Title */}
        <div className="space-y-2 border-b border-slate-200 pb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8C6326] bg-[#FAF7F2] border border-[#EAD8B3] px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C89C50]" />
            <span>Rechtliche Angaben (§ 5 TMG)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#121316] font-['Outfit',sans-serif]">
            Impressum
          </h1>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-6 leading-relaxed">
          <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#EAD8B3] space-y-2">
            <h3 className="text-base font-bold text-[#121316] font-['Outfit',sans-serif]">
              Angaben gemäß § 5 TMG
            </h3>
            <p className="font-medium text-[#121316]">
              {settings.companyName}
            </p>
            <p>
              {settings.address}<br />
              {settings.postalCode} {settings.city}<br />
              Deutschland
            </p>
            <p className="text-xs text-slate-600">
              <strong>Betriebshof / Station:</strong> Amazon Verteilzentrum DNX5 Paderborn (Gewerbegebiet Mönkeloh)
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#121316] font-['Outfit',sans-serif]">
              Vertreten durch
            </h3>
            <p>Die Geschäftsführung</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#121316] font-['Outfit',sans-serif]">
              Kontakt
            </h3>
            <p>
              Telefon: {settings.phone}<br />
              E-Mail: <a href={`mailto:${settings.officialEmail}`} className="text-[#8C6326] hover:underline font-semibold">{settings.officialEmail}</a>
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#121316] font-['Outfit',sans-serif]">
              Unternehmensgegenstand
            </h3>
            <p>
              Güterkraftverkehr und Kurier-, Express- und Paketdienstleistungen im Rahmen des autorisierten Amazon Delivery Service Partner (DSP) Programms.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#121316] font-['Outfit',sans-serif]">
              Zuständige Aufsichtsbehörde
            </h3>
            <p>
              Bundesamt für Logistik und Mobilität (BALM)<br />
              Werderstraße 34, 50672 Köln
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#121316] font-['Outfit',sans-serif]">
              Haftung für Inhalte & Links
            </h3>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.
            </p>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#121316] font-['Outfit',sans-serif]">
              Markenhinweis
            </h3>
            <p className="text-xs text-slate-500">
              BALU Logistics ist ein eigenständiges Unternehmen, das als autorisierter Delivery Service Partner (DSP) für Amazon tätig ist. Amazon und das Amazon-Logo sind eingetragene Marken von Amazon.com, Inc. oder deren Tochtergesellschaften.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
