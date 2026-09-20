import React from 'react';
import { CompanySettings, Language } from '../types';
import { translations } from '../data/translations';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PrivacyPageProps {
  settings: CompanySettings;
  lang: Language;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ settings, lang }) => {
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
            <span>Datenschutz nach DSGVO & BDSG</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#121316] font-['Outfit',sans-serif]">
            Datenschutzerklärung
          </h1>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-6 leading-relaxed">
          
          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#121316] font-['Outfit',sans-serif]">
              1. Name und Kontaktdaten des Verantwortlichen
            </h3>
            <p>
              Verantwortlicher für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
            </p>
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EAD8B3] text-xs">
              <strong>{settings.companyName}</strong><br />
              {settings.address}<br />
              {settings.postalCode} {settings.city}<br />
              E-Mail: <a href={`mailto:${settings.officialEmail}`} className="text-[#8C6326] underline font-medium">{settings.officialEmail}</a><br />
              Telefon: {settings.phone}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#121316] font-['Outfit',sans-serif]">
              2. Verarbeitung von Bewerberdaten
            </h3>
            <p>
              Wenn Sie sich über unser Online-Bewerbungsformular als Zustellfahrer bei {settings.companyName} bewerben, verarbeiten wir die von Ihnen eingegebenen personenbezogenen Daten (Name, E-Mail-Adresse, Telefonnummer, Wohnort, Angaben zum Führerschein und zur Arbeitserlaubnis) ausschließlich zur Prüfung Ihrer Eignung für das Beschäftigungsverhältnis und zur Durchführung des Bewerbungsverfahrens.
            </p>
            <p>
              Rechtsgrundlage für diese Datenverarbeitung ist Art. 6 Abs. 1 lit. b DSGVO in Verbindung mit § 26 Abs. 1 BDSG (Entscheidung über die Begründung eines Beschäftigungsverhältnisses).
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#121316] font-['Outfit',sans-serif]">
              3. Kontaktaufnahme per Formular oder E-Mail
            </h3>
            <p>
              Wenn Sie uns per Kontaktformular oder E-Mail Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#121316] font-['Outfit',sans-serif]">
              4. Speicherdauer & Löschfristen
            </h3>
            <p>
              Im Falle einer Absage Ihrer Bewerbung werden die übermittelten Daten nach Abschluss des Bewerbungsverfahrens für eine Dauer von 6 Monaten aufbewahrt, um rechtlichen Verpflichtungen (z. B. Nachweispflichten nach dem Allgemeinen Gleichbehandlungsgesetz – AGG) nachzukommen. Anschließend werden die Daten datenschutzkonform und vollständig gelöscht.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#121316] font-['Outfit',sans-serif]">
              5. Ihre Rechte als betroffene Person
            </h3>
            <p>
              Sie haben nach der DSGVO folgende Rechte:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li><strong>Recht auf Auskunft</strong> über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO).</li>
              <li><strong>Recht auf Berichtigung</strong> unrichtiger oder unvollständiger Daten (Art. 16 DSGVO).</li>
              <li><strong>Recht auf Löschung</strong> („Recht auf Vergessenwerden“, Art. 17 DSGVO).</li>
              <li><strong>Recht auf Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO).</li>
              <li><strong>Recht auf Widerspruch</strong> gegen die Verarbeitung (Art. 21 DSGVO).</li>
              <li><strong>Beschwerderecht</strong> bei der zuständigen Aufsichtsbehörde (Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen – LDI NRW).</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#121316] font-['Outfit',sans-serif]">
              6. Datensicherheit
            </h3>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte (z.B. Bewerbungen oder Kontaktanfragen) eine SSL/TLS-Verschlüsselung.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
