import { Language } from '../types';

export interface TranslationContent {
  topBar: {
    partnerBadge: string;
    contactQuick: string;
  };
  nav: {
    about: string;
    careers: string;
    fleet: string;
    contact: string;
    faqs: string;
    applyButton: string;
    adminPortal: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    ctaApply: string;
    ctaAbout: string;
    stats: {
      stat1Number: string;
      stat1Label: string;
      stat2Number: string;
      stat2Label: string;
      stat3Number: string;
      stat3Label: string;
      stat4Number: string;
      stat4Label: string;
    };
  };
  about: {
    sectionTag: string;
    title: string;
    description1: string;
    description2: string;
    valuesTitle: string;
    values: Array<{
      title: string;
      desc: string;
    }>;
  };
  careers: {
    sectionTag: string;
    title: string;
    subtitle: string;
    jobTitle: string;
    jobLocation: string;
    jobType: string;
    benefitsTitle: string;
    benefits: Array<{
      title: string;
      desc: string;
    }>;
    requirementsTitle: string;
    requirements: string[];
    timelineTag: string;
    timelineTitle: string;
    timelineSubtitle: string;
    timeline: Array<{
      time: string;
      title: string;
      desc: string;
      badge: string;
    }>;
    quizTag: string;
    quizTitle: string;
    quizSubtitle: string;
    quizQuestions: {
      license: string;
      age: string;
      permit: string;
    };
    quizResultSuccessTitle: string;
    quizResultSuccessDesc: string;
    quizResultPendingTitle: string;
    quizResultPendingDesc: string;
    ctaCardTitle: string;
    ctaCardDesc: string;
    ctaButton: string;
  };
  contact: {
    sectionTag: string;
    title: string;
    subtitle: string;
    hubLabel: string;
    stationTitle: string;
    emailLabel: string;
    phoneLabel: string;
    hoursLabel: string;
    hoursValue: string;
    directionsButton: string;
    faqTag: string;
    faqTitle: string;
    faqSubtitle: string;
    faqs: Array<{
      question: string;
      answer: string;
    }>;
    formTitle: string;
    formSubtitle: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    messagePlaceholder: string;
    sendButton: string;
    successMessage: string;
  };
  applyModal: {
    badge: string;
    title: string;
    subtitle: string;
    step1Title: string;
    step1Name: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    postalCode: string;
    step2Title: string;
    step2Name: string;
    licenseLabel: string;
    ageLabel: string;
    workPermitLabel: string;
    step3Title: string;
    step3Name: string;
    employmentTypeLabel: string;
    fullTime: string;
    partTime: string;
    miniJob: string;
    experienceLabel: string;
    experienceOptions: string[];
    notesLabel: string;
    notesPlaceholder: string;
    privacyNote: string;
    submitButton: string;
    submitting: string;
    nextButton: string;
    prevButton: string;
    successTitle: string;
    successDesc: string;
    refNumber: string;
    closeButton: string;
    sendEmailCopy: string;
  };
  footer: {
    desc: string;
    quickLinksTitle: string;
    careersTitle: string;
    stationTitle: string;
    disclaimer: string;
    copyright: string;
    impressum: string;
    privacy: string;
  };
  homePillars: {
    sectionTag: string;
    title: string;
    subtitle: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar1Link: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar2Link: string;
    pillar3Title: string;
    pillar3Desc: string;
    pillar3Link: string;
    hubBadge: string;
    hubTitle: string;
    hubDesc: string;
    hubAction: string;
  };
  fleetPage: {
    sectionTag: string;
    title: string;
    subtitle: string;
    eMobilityBadge: string;
    eMobilityTitle: string;
    eMobilityDesc: string;
    specs: Array<{ label: string; value: string }>;
    featuresTitle: string;
    features: Array<{ title: string; desc: string }>;
    chargingTitle: string;
    chargingDesc: string;
    safetyTitle: string;
    safetyDesc: string;
  };
  notFound: {
    title: string;
    desc: string;
    button: string;
  };
  faqPage: {
    sectionTag: string;
    title: string;
    subtitle: string;
    faqs: Array<{
      id: string;
      question: string;
      answer: string;
    }>;
  };
}

export const translations: Record<Language, TranslationContent> = {
  de: {
    topBar: {
      partnerBadge: 'Offizieller Amazon Delivery Service Partner (DSP)',
      contactQuick: 'Amazon Verteilzentrum Paderborn (Navarrastr. 8)'
    },
    nav: {
      about: 'Über uns',
      careers: 'Karriere',
      fleet: 'Flotte',
      contact: 'Kontakt',
      faqs: 'FAQs',
      applyButton: 'Jetzt bewerben',
      adminPortal: 'Disponenten-Portal'
    },
    hero: {
      badge: 'Amazon Delivery Service Partner • Deutschland',
      title: 'Zuverlässige Zustellung.',
      titleHighlight: 'Gemeinsam im Team.',
      subtitle: 'BALU Logistics liefert täglich tausende Pakete sicher und pünktlich an Kunden in der Region. Wir setzen auf Verlässlichkeit, modernste Fahrzeuge und ein respektvolles Miteinander.',
      ctaApply: 'Als Fahrer bewerben',
      ctaAbout: 'Unser Unternehmen',
      stats: {
        stat1Number: '100%',
        stat1Label: 'Moderne Transporter',
        stat2Number: 'Klasse B',
        stat2Label: 'PKW-Führerschein erforderlich',
        stat3Number: '5–6 Tage',
        stat3Label: 'Geregelte Arbeitswoche',
        stat4Number: '33106',
        stat4Label: 'Paderborn • Navarrastr. 8'
      }
    },
    about: {
      sectionTag: 'Über BALU Logistics',
      title: 'Professionelle Letzte-Meile-Logistik in Deutschland',
      description1: 'Als autorisierter Amazon Delivery Service Partner (DSP) sind wir das entscheidende Bindeglied zwischen dem Amazon Verteilzentrum und der Haustür der Kunden. Unser Unternehmen steht für Verlässlichkeit, strukturierte Abläufe und höchste Sicherheitsstandards.',
      description2: 'Wir legen großen Wert auf eine partnerschaftliche Unternehmenskultur: Bei uns begegnen sich Disponenten und Zustellfahrer auf Augenhöhe. Ein gepflegter Fuhrpark, digitale Routenführung und eine gründliche Einarbeitung sorgen für einen reibungslosen Arbeitsalltag.',
      valuesTitle: 'Unsere Leitprinzipien',
      values: [
        {
          title: 'Sicherheit an erster Stelle',
          desc: 'Tägliche Sicherheitschecks aller Fahrzeuge und moderne Fahrerassistenzsysteme schützen Fahrer und Verkehrsteilnehmer.'
        },
        {
          title: 'Respekt & Teamgeist',
          desc: 'Flache Hierarchien, offene Kommunikation und ein wertschätzendes Betriebsklima stehen bei uns im Mittelpunkt.'
        },
        {
          title: 'Moderne Arbeitsmittel',
          desc: 'Neuwertige Transporter, Arbeitskleidung und digitale Zustellgeräte werden vollständig vom Unternehmen gestellt.'
        },
        {
          title: 'Nachhaltige Mobilität',
          desc: 'Kontinuierlicher Ausbau emissionsfreier Elektro-Lieferwagen für eine zukunftsorientierte Zustellung.'
        }
      ]
    },
    careers: {
      sectionTag: 'Offene Stellen',
      title: 'Werde Teil unseres Zustellteams',
      subtitle: 'Wir suchen engagierte und zuverlässige Zustellfahrer (m/w/d) in Vollzeit und Teilzeit.',
      jobTitle: 'Zustellfahrer / Paketzusteller (m/w/d)',
      jobLocation: 'Paderborn & Region Ostwestfalen (Navarrastr. 8)',
      jobType: 'Vollzeit / Teilzeit',
      benefitsTitle: 'Was wir bieten',
      benefits: [
        {
          title: 'Geregelte 8-Stunden-Schichten',
          desc: 'Planbare Touren mit verlässlichen 8-Stunden-Arbeitstagen in einer 5- bis 6-Tage-Woche.'
        },
        {
          title: 'Komplette Ausstattung inklusive',
          desc: 'Moderne Transporter, Bereitstellung & Laden der Fahrzeuge, professionelle Arbeitskleidung und Smartphone-Scanner.'
        },
        {
          title: 'Gründliche Einarbeitung',
          desc: 'Bezahlte Einführungsschulung und Begleitfahrten mit erfahrenen Kollegen.'
        },
        {
          title: 'Kollegiales Arbeitsumfeld',
          desc: 'Ein hilfsbereites Team vor Ort im Verteilzentrum, das dich bei jeder Tour unterstützt.'
        },
        {
          title: 'Ergonomische & moderne Arbeitsmittel',
          desc: 'Hochwertige Arbeitsschuhe, wetterfeste Schutzkleidung und moderne Navigationsgeräte für einen rückenschonenden Alltag.'
        }
      ],
      requirementsTitle: 'Das bringst du mit',
      requirements: [
        'Gültiger Führerschein der Klasse B (PKW bis 3,5 t) erforderlich',
        'Mindestalter gemäß betrieblicher Vorgabe (ab 18 bzw. 21 Jahre)',
        'Gültige Arbeitserlaubnis in Deutschland / EU',
        'Zuverlässigkeit, Pünktlichkeit und kundenorientiertes Auftreten',
        'Freude am eigenverantwortlichen Arbeiten im Straßenverkehr'
      ],
      timelineTag: 'Arbeitsalltag im Überblick',
      timelineTitle: 'Ein typischer Tag als BALU-Fahrer',
      timelineSubtitle: 'Vom morgendlichen Check-in bis zum verlässlichen Feierabend – so läuft deine Schicht ab.',
      timeline: [
        {
          time: '09:00 Uhr',
          title: 'Check-In & Team-Briefing',
          desc: 'Ankunft am Depot Paderborn, Ausgabe des Smartphones mit fertig berechneter Tagestour und kurzes Sicherheits-Briefing.',
          badge: 'Depot Paderborn'
        },
        {
          time: '09:30 Uhr',
          title: 'Fahrzeug-Check & Beladung',
          desc: 'Übernahme deines vorkonditionierten Transporters. Die Pakete sind bereits in handlichen Taschen vorsortiert und schnell geladen.',
          badge: 'Vorsortiert'
        },
        {
          time: '10:00 Uhr',
          title: 'Auf Tour: Sichere Zustellung',
          desc: 'Abfahrt in dein festes Zustellgebiet. Die smarte Navigation führt dich Haus für Haus auf der effizientesten Route.',
          badge: 'GPS-Navigation'
        },
        {
          time: '17:30 Uhr',
          title: 'Rückkehr & Feierabend',
          desc: 'Kurze Fahrzeugrückgabe am Verteilzentrum, Smartphone-Abgabe und planmäßiger Feierabend ohne Papierkram.',
          badge: 'Pünktlicher Feierabend'
        }
      ],
      quizTag: '60-Sekunden Eignungs-Check',
      quizTitle: 'Passt die Stelle zu dir?',
      quizSubtitle: 'Klicke die 3 Kriterien an, um sofort zu sehen, ob du direkt starten kannst.',
      quizQuestions: {
        license: 'Ich besitze einen Führerschein der Klasse B (PKW)',
        age: 'Ich bin mindestens 18 Jahre alt',
        permit: 'Ich habe eine gültige Arbeitserlaubnis in Deutschland/EU'
      },
      quizResultSuccessTitle: '100% Passend! Du erfüllst alle Voraussetzungen.',
      quizResultSuccessDesc: 'Kein Anschreiben oder Lebenslauf nötig. Sende uns jetzt deine Kurzbewerbung in unter 2 Minuten.',
      quizResultPendingTitle: 'Fast geschafft – Wähle alle 3 Kriterien aus',
      quizResultPendingDesc: 'Für die Anstellung als Zustellfahrer sind diese 3 gesetzlichen Grundlagen erforderlich.',
      ctaCardTitle: 'Bereit für die Straße?',
      ctaCardDesc: 'Die Bewerbung dauert nur 2 Minuten. Kein Anschreiben und kein Lebenslauf zwingend erforderlich.',
      ctaButton: 'Direkt online bewerben'
    },
    contact: {
      sectionTag: 'Kontakt & Standort',
      title: 'Hier findest du uns',
      subtitle: 'Unser Betriebshof befindet sich direkt am Amazon Verteilzentrum in Paderborn.',
      hubLabel: 'Amazon Verteilzentrum (DNX5)',
      stationTitle: 'BALU Logistics Betriebsstätte',
      emailLabel: 'E-Mail',
      phoneLabel: 'Telefon',
      hoursLabel: 'Betriebszeiten',
      hoursValue: 'Montag – Samstag: 07:00 – 20:00 Uhr',
      directionsButton: 'Route in Google Maps öffnen',
      faqTag: 'Häufig gestellte Fragen',
      faqTitle: 'Fragen & Antworten zu BALU Logistics',
      faqSubtitle: 'Die wichtigsten Antworten für Bewerber und Interessierte.',
      faqs: [
        {
          question: 'Brauche ich Vorerfahrung als Paketzusteller?',
          answer: 'Nein, eine Vorerfahrung ist nicht zwingend erforderlich. Auch motivierte Quereinsteiger sind herzlich willkommen. Du erhältst eine bezahlte Einarbeitung und Begleitfahrten mit erfahrenen Kollegen.'
        },
        {
          question: 'Welcher Führerschein wird benötigt?',
          answer: 'Ein regulärer PKW-Führerschein der Klasse B (bis 3,5 Tonnen) ist vollkommen ausreichend. Du benötigst keinen LKW- oder Personenbeförderungsschein.'
        },
        {
          question: 'Wer stellt das Fahrzeug und das Smartphone?',
          answer: 'BALU Logistics stellt sämtliche Arbeitsmittel vollständig zur Verfügung: neuwertige Transporter, Kraftstoff/Ladestrom, Arbeitskleidung, Sicherheitsschuhe und das Dienst-Smartphone mit Routing-Software.'
        },
        {
          question: 'Wie sind die Arbeitszeiten geregelt?',
          answer: 'Wir arbeiten in verlässlichen 8-Stunden-Schichten in einer 5- bis 6-Tage-Woche (Montag bis Samstag, mit rollierenden freien Tagen). Dadurch ist dein Feierabend planbar.'
        },
        {
          question: 'Wo befindet sich der tägliche Startpunkt der Touren?',
          answer: 'Der tägliche Arbeitsbeginn und die Fahrzeugrückgabe finden am Amazon Verteilzentrum DNX5 in der Navarrastraße 8, 33106 Paderborn (Gewerbegebiet Mönkeloh) statt.'
        }
      ],
      formTitle: 'Nachricht senden',
      formSubtitle: 'Hast du Fragen zu unserem Unternehmen oder zu offenen Stellen?',
      namePlaceholder: 'Dein Name',
      emailPlaceholder: 'Deine E-Mail-Adresse',
      phonePlaceholder: 'Deine Telefonnummer',
      messagePlaceholder: 'Deine Nachricht an uns...',
      sendButton: 'Nachricht absenden',
      successMessage: 'Vielen Dank! Deine Nachricht wurde weitergeleitet.'
    },
    homePillars: {
      sectionTag: 'Unsere Kernbereiche',
      title: 'Was BALU Logistics als Amazon DSP auszeichnet',
      subtitle: 'Als professioneller Letzte-Meile-Partner verbinden wir verlässliche Logistik mit moderner Flotte und erstklassigen Arbeitsbedingungen.',
      pillar1Title: 'Amazon DSP Partnerschaft',
      pillar1Desc: 'Täglich tausende pünktliche und sichere Paketzustellungen für Kunden in Paderborn und der Region Ostwestfalen.',
      pillar1Link: 'Über das Unternehmen',
      pillar2Title: 'Moderne Transporter-Flotte',
      pillar2Desc: 'Neuwertige Mercedes-Benz eSprinter & Sprinter mit zukunftsorientierter Depot-Ladeinfrastruktur.',
      pillar2Link: 'Flotte entdecken',
      pillar3Title: 'Fahrer & Karriereportal',
      pillar3Desc: 'Geregelte 8-Stunden-Schichten, bezahlte Einarbeitung und 100% gestellte Arbeitsmittel für unser Team.',
      pillar3Link: 'Offene Stellen ansehen',
      hubBadge: 'Betriebshof DNX5',
      hubTitle: 'Zentraler Standort am Amazon Verteilzentrum Paderborn',
      hubDesc: 'Unser Fuhrpark und das Disponenten-Team starten täglich direkt an der Navarrastraße 8 im Gewerbegebiet Mönkeloh.',
      hubAction: 'Standort & Anfahrt'
    },
    fleetPage: {
      sectionTag: 'Fuhrpark & Logistikbetrieb',
      title: 'Einsatzbereite Flotte für zuverlässige Touren in OWL',
      subtitle: 'Täglich pünktlich, sicher und gut gerüstet: BALU Logistics setzt auf maximale Einsatzbereitschaft, kontinuierliche Wartung und eine moderne Transporterflotte mit wachsendem Elektro-Anteil am Amazon Verteilzentrum DNX5 Paderborn.',
      eMobilityBadge: 'Zuverlässigkeit & Flottenpraxis',
      eMobilityTitle: 'Höchste Verfügbarkeit für den täglichen Lieferbetrieb',
      eMobilityDesc: 'Als Amazon Delivery Service Partner (DSP) steht bei uns die verlässliche Paketzustellung im Mittelpunkt. Unsere Flotte ist exakt auf die Anforderungen moderner Liefertouren abgestimmt: Tägliche Abfahrtsgarantie, vollständige Absicherung bei Ausfällen und optimaler Arbeitskomfort für unsere Zustellfahrer.',
      specs: [
        { label: 'Einsatzgebiet', value: 'Paderborn & ostwestfälische Region (OWL)' },
        { label: 'Abfahrtsbereitschaft', value: '100% pünktliche Tourenstarts jeden Morgen' },
        { label: 'Ausfallsicherheit', value: 'Sofort einsatzbereite Reservefahrzeuge am Hub DNX5' },
        { label: 'Fahrerentlastung', value: 'Vollständige Übernahme aller Wartungs- & Betriebskosten' }
      ],
      featuresTitle: 'Operative Standards für verlässliche Paketzustellung',
      features: [
        {
          title: 'Flächendeckende Tourenabdeckung',
          desc: 'Strukturierte und optimierte Zustellbezirke in Paderborn und den Landkreisen sorgen für planbare, pünktliche Lieferungen.'
        },
        {
          title: 'Nachhaltige E-Mobilität',
          desc: 'Ein wachsender Anteil an modernen Elektro-Transportern ermöglicht leise und emissionsfreie Lieferungen in Wohnvierteln.'
        },
        {
          title: 'Präventive Flottenwartung',
          desc: 'Tägliche digitale Sicherheits-Checks und regelmäßige Fachwartung sichern den reibungslosen Betrieb ohne technische Verzögerungen.'
        },
        {
          title: 'Rundum-Support für Fahrer',
          desc: 'Fahrzeuge, Ladeinfrastruktur, Bereifung und mobile Arbeitsmittel werden zu 100% von BALU Logistics bereitgestellt und gepflegt.'
        }
      ],
      chargingTitle: 'Zukunftsorientierte Logistik am Standort Paderborn',
      chargingDesc: 'An unserem Betriebshof im Gewerbegebiet Mönkeloh (Navarrastraße 8) laden unsere Elektro-Transporter über Nacht mit zertifiziertem Grünstrom. So startet jede Tour mit voller Reichweite und ohne zeitaufwändige Zwischenstopps.',
      safetyTitle: 'Verantwortung & Sicherheit im Straßenverkehr',
      safetyDesc: 'Vor jedem Tourenstart durchläuft jedes Fahrzeug einen standardisierten digitalen Sicherheits-Check. Für unvorhergesehene Fälle stehen jederzeit betriebsbereite Reservefahrzeuge bereit – für maximale Sicherheit unserer Fahrer und der Nachbarschaft.'
    },
    notFound: {
      title: 'Seite nicht gefunden',
      desc: 'Die angeforderte Seite existiert leider nicht oder wurde verschoben.',
      button: 'Zur Startseite'
    },
    applyModal: {
      badge: 'Bewerbung als Zustellfahrer',
      title: 'Online-Kurzbewerbung',
      subtitle: 'Einfach ausfüllen. Wir melden uns innerhalb von 24 Stunden bei dir.',
      step1Title: '1. Persönliche Kontaktdaten',
      step1Name: 'Kontaktdaten',
      firstName: 'Vorname *',
      lastName: 'Nachname *',
      email: 'E-Mail-Adresse *',
      phone: 'Telefonnummer *',
      city: 'Wohnort *',
      postalCode: 'Postleitzahl *',
      step2Title: '2. Gesetzliche Voraussetzungen (Deutschland)',
      step2Name: 'Voraussetzungen',
      licenseLabel: 'Ich besitze einen gültigen Führerschein der Klasse B (PKW bis 3,5t)',
      ageLabel: 'Ich erfülle das Mindestalter (mindestens 18 Jahre)',
      workPermitLabel: 'Ich besitze eine gültige Arbeitserlaubnis in Deutschland / EU',
      step3Title: '3. Anstellung & Fahrerfahrung',
      step3Name: 'Anstellung',
      employmentTypeLabel: 'Gewünschte Anstellungsart',
      fullTime: 'Vollzeit (5- bis 6-Tage-Woche)',
      partTime: 'Teilzeit',
      miniJob: 'Minijob / Aushilfe',
      experienceLabel: 'Bisherige Fahrerfahrung',
      experienceOptions: [
        'Quereinsteiger (keine Vorerfahrung, motiviert)',
        '1–2 Jahre Erfahrung (Transporter / Lieferdienst)',
        'Mehrjährige Erfahrung im Kurier- und Expressbereich',
        'Bereits Erfahrung als Amazon DSP Fahrer'
      ],
      notesLabel: 'Mitteilung oder möglicher Starttermin (optional)',
      notesPlaceholder: 'Z.B. frühester Starttermin, Verfügbarkeit...',
      privacyNote: 'Deine Angaben werden vertraulich behandelt und direkt an unser Bewerbermanagement gesendet.',
      submitButton: 'Bewerbung jetzt absenden',
      submitting: 'Wird übermittelt...',
      nextButton: 'Weiter zu Schritt',
      prevButton: 'Zurück',
      successTitle: 'Bewerbung eingegangen!',
      successDesc: 'Vielen Dank für deine Bewerbung. Deine Unterlagen wurden erfolgreich an unser Recruiting-Team übermittelt.',
      refNumber: 'Bewerbungs-ID',
      closeButton: 'Fenster schließen',
      sendEmailCopy: 'E-Mail-Bestätigung öffnen'
    },
    footer: {
      desc: 'BALU Logistics ist ein unabhängiges deutsches Transportunternehmen und offizieller Delivery Service Partner (DSP) von Amazon.',
      quickLinksTitle: 'Übersicht',
      careersTitle: 'Karriere',
      stationTitle: 'Standort',
      disclaimer: 'BALU Logistics ist ein unabhängiges Unternehmen, das als autorisierter Delivery Service Partner (DSP) für Amazon tätig ist. Amazon und das Amazon-Logo sind Marken von Amazon.com, Inc. oder deren Tochtergesellschaften.',
      copyright: 'Alle Rechte vorbehalten.',
      impressum: 'Impressum',
      privacy: 'Datenschutz'
    },
    faqPage: {
      sectionTag: 'Häufig gestellte Fragen',
      title: 'Fragen & Antworten zu BALU Logistics',
      subtitle: 'Hier findest du Antworten auf die wichtigsten Fragen zu unserem Fahrbetrieb, Arbeitszeiten und dem Einstieg als Kurierfahrer in Paderborn.',
      faqs: [
        {
          id: 'faq-1',
          question: 'Brauche ich Vorerfahrung als Paketzusteller?',
          answer: 'Nein, eine Vorerfahrung ist nicht zwingend erforderlich. Auch motivierte Quereinsteiger sind bei uns herzlich willkommen. Du erhältst eine bezahlte, strukturierte Einarbeitung sowie gemeinsame Begleitfahrten mit erfahrenen Kollegen, bis du dich auf deiner Tour absolut sicher fühlst.'
        },
        {
          id: 'faq-2',
          question: 'Welcher Führerschein wird benötigt?',
          answer: 'Ein regulärer PKW-Führerschein der Klasse B (für Fahrzeuge bis 3,5 Tonnen) ist vollkommen ausreichend. Du benötigst keinen LKW-Führerschein und keinen Personenbeförderungsschein.'
        },
        {
          id: 'faq-4',
          question: 'Wie sind die Arbeitszeiten geregelt?',
          answer: 'Wir arbeiten in verlässlichen 8-Stunden-Schichten in einer 5- bis 6-Tage-Woche (Montag bis Samstag, mit rollierenden freien Tagen). Durch feste Schichtzeiten ist dein Feierabend verlässlich planbar.'
        },
        {
          id: 'faq-5',
          question: 'Wo befindet sich der tägliche Startpunkt der Touren?',
          answer: 'Der tägliche Arbeitsbeginn, die Fahrzeugübernahme und die Rückkehr finden direkt an unserer Betriebsstätte am Amazon Verteilzentrum DNX5 statt: Navarrastraße 8, 33106 Paderborn (Gewerbegebiet Mönkeloh).'
        },
        {
          id: 'faq-7',
          question: 'Welche Sprachkenntnisse sind erforderlich?',
          answer: 'Grundlegende Deutsch- oder Englischkenntnisse genügen, um die Anweisungen auf dem Dienst-Smartphone zu verstehen und freundlich mit Kunden bei der Zustellung zu interagieren.'
        }
      ]
    }
  },
  en: {
    topBar: {
      partnerBadge: 'Authorized Amazon Delivery Service Partner (DSP)',
      contactQuick: 'Amazon Delivery Station Paderborn (Navarrastr. 8)'
    },
    nav: {
      about: 'About Us',
      careers: 'Careers',
      fleet: 'Fleet',
      contact: 'Contact Us',
      faqs: 'FAQs',
      applyButton: 'Apply Now',
      adminPortal: 'Dispatcher Portal'
    },
    hero: {
      badge: 'Amazon Delivery Service Partner • Germany',
      title: 'Reliable Delivery.',
      titleHighlight: 'Driven by Teamwork.',
      subtitle: 'BALU Logistics delivers thousands of packages safely and punctually to customers across the region every day. We prioritize safety, a modern vehicle fleet, and a respectful workplace.',
      ctaApply: 'Apply as Driver',
      ctaAbout: 'About Company',
      stats: {
        stat1Number: '100%',
        stat1Label: 'Modern Delivery Vans',
        stat2Number: 'Class B',
        stat2Label: 'Valid car license required',
        stat3Number: '5–6 Days',
        stat3Label: 'Scheduled working week',
        stat4Number: '33106',
        stat4Label: 'Paderborn • Navarrastr. 8'
      }
    },
    about: {
      sectionTag: 'About BALU Logistics',
      title: 'Professional Last-Mile Logistics in Germany',
      description1: 'As an authorized Amazon Delivery Service Partner (DSP), we are the vital link between the Amazon delivery station and customer doorsteps. Our company stands for reliability, structured operations, and the highest safety standards.',
      description2: 'We place strong emphasis on an appreciative corporate culture: dispatchers and drivers collaborate on equal footing. Modern vans, digital navigation, and comprehensive paid training ensure a smooth daily work experience.',
      valuesTitle: 'Our Core Principles',
      values: [
        {
          title: 'Safety First',
          desc: 'Daily vehicle safety checks and modern driver assistance systems protect drivers and the community.'
        },
        {
          title: 'Respect & Teamwork',
          desc: 'Open communication, flat hierarchies, and an inclusive, supportive workplace are central to our team.'
        },
        {
          title: 'Modern Equipment',
          desc: 'Well-maintained vans, uniforms, and smartphone scanners are completely company-provided.'
        },
        {
          title: 'Sustainable Mobility',
          desc: 'Continuous transition to zero-emission electric delivery vans for a sustainable logistics future.'
        }
      ]
    },
    careers: {
      sectionTag: 'Open Positions',
      title: 'Join Our Delivery Team',
      subtitle: 'We are hiring dedicated and reliable Delivery Associates (m/f/d) for full-time and part-time positions.',
      jobTitle: 'Delivery Associate / Courier (m/f/d)',
      jobLocation: 'Paderborn & East Westphalia (Navarrastr. 8)',
      jobType: 'Full-Time / Part-Time',
      benefitsTitle: 'What We Offer',
      benefits: [
        {
          title: 'Structured 8-Hour Shifts',
          desc: 'Predictable routes with reliable 8-hour daily shifts on a 5- to 6-day work week.'
        },
        {
          title: 'Complete Equipment Provided',
          desc: 'Modern delivery vans, charging/fleet maintenance provided, official uniform, and digital scanner.'
        },
        {
          title: 'Paid Training & Onboarding',
          desc: 'Paid classroom training and ride-along shifts with experienced driver mentors.'
        },
        {
          title: 'Supportive Team Culture',
          desc: 'A friendly on-site dispatch team ready to assist you on every delivery route.'
        },
        {
          title: 'Ergonomic & Modern Equipment',
          desc: 'High-quality safety footwear, all-weather gear, and modern digital routing for a safe, ergonomic work environment.'
        }
      ],
      requirementsTitle: 'What We Look For',
      requirements: [
        'Valid Class B driver’s license (standard car up to 3.5 t) required',
        'Minimum age requirement (18/21 years)',
        'Valid work authorization in Germany / EU',
        'Reliability, punctuality, and friendly customer-oriented attitude',
        'Enjoys working independently on the road'
      ],
      timelineTag: 'Daily Routine Overview',
      timelineTitle: 'A Typical Day as a BALU Driver',
      timelineSubtitle: 'From morning check-in to structured on-time finish – here is how your shift works.',
      timeline: [
        {
          time: '09:00 AM',
          title: 'Check-In & Team Briefing',
          desc: 'Arrival at Paderborn station, receive your smartphone with pre-calculated route and quick safety brief.',
          badge: 'Paderborn Station'
        },
        {
          time: '09:30 AM',
          title: 'Vehicle Check & Loading',
          desc: 'Pick up your pre-conditioned delivery van. Packages are pre-sorted into convenient totes for rapid loading.',
          badge: 'Pre-Sorted Totes'
        },
        {
          time: '10:00 AM',
          title: 'On Route: Safe Delivery',
          desc: 'Depart to your dedicated delivery zone. Smart GPS navigation guides you door-to-door on the most efficient sequence.',
          badge: 'Smart Navigation'
        },
        {
          time: '05:30 PM',
          title: 'Return & Shift Completion',
          desc: 'Quick vehicle return at the station, scanner return, and predictable finish time with zero paperwork.',
          badge: 'On-Time Finish'
        }
      ],
      quizTag: '60-Second Eligibility Quiz',
      quizTitle: 'Are You a Match?',
      quizSubtitle: 'Click the 3 criteria below to see if you can start right away.',
      quizQuestions: {
        license: 'I hold a valid Class B (standard car) driver’s license',
        age: 'I am at least 18 years old',
        permit: 'I have valid work authorization for Germany / EU'
      },
      quizResultSuccessTitle: '100% Match! You meet all initial requirements.',
      quizResultSuccessDesc: 'No resume or lengthy cover letter required. Submit your quick application in under 2 minutes.',
      quizResultPendingTitle: 'Almost there – Check all 3 criteria',
      quizResultPendingDesc: 'These 3 legal requirements are necessary for starting as a delivery associate.',
      ctaCardTitle: 'Ready to Hit the Road?',
      ctaCardDesc: 'Applying takes only 2 minutes. No lengthy cover letter required.',
      ctaButton: 'Apply Online Now'
    },
    contact: {
      sectionTag: 'Contact & Station Location',
      title: 'Find Us Here',
      subtitle: 'Our dispatch base is located directly at the Amazon Delivery Station in Paderborn.',
      hubLabel: 'Amazon Delivery Station (DNX5)',
      stationTitle: 'BALU Logistics Dispatch Operations',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      hoursLabel: 'Operating Hours',
      hoursValue: 'Monday – Saturday: 07:00 – 20:00',
      directionsButton: 'Open Directions in Google Maps',
      faqTag: 'Frequently Asked Questions',
      faqTitle: 'Frequently Asked Questions',
      faqSubtitle: 'Everything you need to know about working with BALU Logistics.',
      faqs: [
        {
          question: 'Do I need prior delivery experience?',
          answer: 'No prior experience is necessary. We welcome motivated career changers! You will receive comprehensive paid training and ride-alongs with experienced drivers.'
        },
        {
          question: 'What driver’s license do I need?',
          answer: 'A standard passenger car license (Class B, up to 3.5 tons) is all you need. No commercial truck license is required.'
        },
        {
          question: 'Who provides the delivery vehicle and equipment?',
          answer: 'BALU Logistics provides all tools: modern vans, fuel/charging, official uniform, safety gear, and a work smartphone with GPS routing.'
        },
        {
          question: 'What are the shift schedules?',
          answer: 'We operate on structured 8-hour shifts across a 5- to 6-day week (Monday to Saturday, with rotating days off), allowing for a healthy work-life balance.'
        },
        {
          question: 'Where is the daily starting location?',
          answer: 'Shifts begin and end at the Amazon Delivery Station DNX5 at Navarrastraße 8, 33106 Paderborn (Gewerbegebiet Mönkeloh).'
        }
      ],
      formTitle: 'Send a Message',
      formSubtitle: 'Have a question about our operations or open driver roles?',
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Your Email Address',
      phonePlaceholder: 'Your Phone Number',
      messagePlaceholder: 'Your message...',
      sendButton: 'Send Message',
      successMessage: 'Thank you! Your inquiry has been forwarded.'
    },
    homePillars: {
      sectionTag: 'Core Focus Areas',
      title: 'What Defines BALU Logistics as an Amazon DSP',
      subtitle: 'As a professional last-mile partner, we combine reliable logistics operations with modern fleet technology and premier working conditions.',
      pillar1Title: 'Amazon DSP Operations',
      pillar1Desc: 'Thousands of packages delivered safely and punctually every day for customers across East Westphalia.',
      pillar1Link: 'About Our Company',
      pillar2Title: 'Modern Van Fleet',
      pillar2Desc: 'State-of-the-art Mercedes-Benz eSprinter & Sprinter fleet with dedicated overnight depot charging.',
      pillar2Link: 'Explore Our Fleet',
      pillar3Title: 'Driver Career Hub',
      pillar3Desc: 'Structured 8-hour shifts, paid comprehensive onboarding, and 100% company-provided equipment.',
      pillar3Link: 'View Driver Positions',
      hubBadge: 'Operating Station DNX5',
      hubTitle: 'Central Base at Amazon Delivery Station Paderborn',
      hubDesc: 'Our fleet and dispatch team operate daily directly from Navarrastraße 8 in Gewerbegebiet Mönkeloh.',
      hubAction: 'Station Info & Directions'
    },
    fleetPage: {
      sectionTag: 'Fleet & Operations',
      title: 'Reliable Fleet Powering Daily Deliveries in East Westphalia',
      subtitle: 'Punctual, safe, and mission-ready: BALU Logistics maintains a high-availability delivery fleet combining dependable daily operations, comprehensive maintenance, and an expanding electric share at Amazon Delivery Station DNX5 Paderborn.',
      eMobilityBadge: 'Operational Excellence',
      eMobilityTitle: 'Maximum Route Availability for Daily Last-Mile Logistics',
      eMobilityDesc: 'As an authorized Amazon Delivery Service Partner (DSP), our fleet operations prioritize punctuality and reliability. Our vehicles are deployed specifically for demanding regional delivery cycles: guaranteed morning departures, instant standby vehicle capacity, and zero equipment burden on drivers.',
      specs: [
        { label: 'Operating Area', value: 'Paderborn & East Westphalia (OWL)' },
        { label: 'Dispatch Readiness', value: '100% on-time morning route departures' },
        { label: 'Backup Capacity', value: 'Standby reserve vehicles stationed on-site at DNX5' },
        { label: 'Driver Support', value: '100% company-covered maintenance, fueling & operations' }
      ],
      featuresTitle: 'Operational Standards for High-Paced Logistics',
      features: [
        {
          title: 'Dependable Route Coverage',
          desc: 'Structured delivery territories across Paderborn and surrounding districts ensure punctual and predictable delivery schedules.'
        },
        {
          title: 'Clean Neighborhood Deliveries',
          desc: 'An expanding fleet of modern electric vans delivers packages quietly and without tailpipe emissions in residential neighborhoods.'
        },
        {
          title: 'Proactive Fleet Maintenance',
          desc: 'Daily digital pre-trip inspections and routine professional servicing prevent breakdowns and maintain peak operational safety.'
        },
        {
          title: 'Complete Driver Support',
          desc: 'Vehicles, overnight charging, seasonal tires, and digital equipment are 100% supplied, managed, and paid for by BALU Logistics.'
        }
      ],
      chargingTitle: 'Dedicated Overnight Charging at Station DNX5',
      chargingDesc: 'At our Mönkeloh operating base (Navarrastraße 8), our electric vans charge overnight using certified green electricity. This guarantees full daily operating range without mid-day downtime or route interruptions.',
      safetyTitle: 'Road Safety & Community Responsibility',
      safetyDesc: 'Every delivery van completes a mandatory digital safety inspection prior to route departure. Standby replacement vans are immediately available at the station if needed, keeping safety as our foremost priority.'
    },
    notFound: {
      title: 'Page Not Found',
      desc: 'The page you requested could not be found or has been moved.',
      button: 'Return to Homepage'
    },
    applyModal: {
      badge: 'Driver Application',
      title: 'Quick Online Application',
      subtitle: 'Fill out the form below. We will contact you within 24 hours.',
      step1Title: '1. Contact Details',
      step1Name: 'Contact',
      firstName: 'First Name *',
      lastName: 'Last Name *',
      email: 'Email Address *',
      phone: 'Phone Number *',
      city: 'City *',
      postalCode: 'Postal Code *',
      step2Title: '2. Qualifications (Germany)',
      step2Name: 'Qualifications',
      licenseLabel: 'I hold a valid Class B driver’s license (car up to 3.5t)',
      ageLabel: 'I meet the minimum age requirement (at least 18/21 years)',
      workPermitLabel: 'I have a valid work permit for Germany / EU',
      step3Title: '3. Schedule & Experience',
      step3Name: 'Preferences',
      employmentTypeLabel: 'Desired Employment Type',
      fullTime: 'Full-Time (5- to 6-day week)',
      partTime: 'Part-Time',
      miniJob: 'Mini-Job / Student',
      experienceLabel: 'Prior Driving Experience',
      experienceOptions: [
        'Career Starter (no prior experience, highly motivated)',
        '1–2 years delivery / van driving experience',
        'Multi-year courier or parcel delivery background',
        'Former Amazon DSP Delivery Associate'
      ],
      notesLabel: 'Notes or preferred start date (optional)',
      notesPlaceholder: 'E.g., available start date, prior experience...',
      privacyNote: 'Your information is treated confidentially and sent directly to our hiring team.',
      submitButton: 'Submit Application Now',
      submitting: 'Submitting...',
      nextButton: 'Continue to Step',
      prevButton: 'Back',
      successTitle: 'Application Received!',
      successDesc: 'Thank you for applying. Your details have been submitted directly to our recruiting inbox.',
      refNumber: 'Application ID',
      closeButton: 'Close Window',
      sendEmailCopy: 'Open Email Confirmation Copy'
    },
    footer: {
      desc: 'BALU Logistics is an independent German transport company and authorized Delivery Service Partner (DSP) of Amazon.',
      quickLinksTitle: 'Navigation',
      careersTitle: 'Careers',
      stationTitle: 'Location',
      disclaimer: 'BALU Logistics is an independent business operating as an authorized Delivery Service Partner (DSP) of Amazon. Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.',
      copyright: 'All rights reserved.',
      impressum: 'Legal Notice (Impressum)',
      privacy: 'Privacy Policy'
    },
    faqPage: {
      sectionTag: 'Frequently Asked Questions',
      title: 'Frequently Asked Questions',
      subtitle: 'Find clear answers to key questions regarding delivery shifts, requirements, and joining BALU Logistics in Paderborn.',
      faqs: [
        {
          id: 'faq-1',
          question: 'Do I need prior delivery experience?',
          answer: 'No prior experience is necessary. We welcome motivated career changers! You will receive comprehensive paid training and ride-alongs with experienced driver mentors until you feel completely confident on your delivery route.'
        },
        {
          id: 'faq-2',
          question: 'What driver’s license do I need?',
          answer: 'A standard passenger car license (Class B, up to 3.5 tons) is all you need. No commercial truck license or passenger transport license is required.'
        },
        {
          id: 'faq-4',
          question: 'What are the shift schedules?',
          answer: 'We operate on structured 8-hour shifts across a 5- to 6-day work week (Monday through Saturday, with rotating days off). Predictable shift schedules ensure a reliable work-life balance.'
        },
        {
          id: 'faq-5',
          question: 'Where is the daily starting location?',
          answer: 'Daily shifts begin and end directly at our operating station at the Amazon Delivery Hub DNX5: Navarrastraße 8, 33106 Paderborn (Gewerbegebiet Mönkeloh).'
        },
        {
          id: 'faq-7',
          question: 'What language skills are required?',
          answer: 'Basic working proficiency in German or English is sufficient to understand delivery scanner prompts and communicate politely with customers during parcel drop-offs.'
        }
      ]
    }
  }
};
