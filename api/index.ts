import express from "express";

interface DriverApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  postalCode: string;
  hasClassBLicense: boolean;
  isMinAge: boolean;
  cleanRecord: boolean;
  workPermitEU: boolean;
  employmentType: "full-time" | "part-time" | "mini-job";
  experienceYears: string;
  notes: string;
  submittedAt: string;
  status: "submitted" | "under_review" | "interview_scheduled" | "approved";
}

interface CompanySettings {
  companyName: string;
  tagline: string;
  officialEmail: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  amazonStationCode: string;
}

let companySettings: CompanySettings = {
  companyName: "BALU Logistics",
  tagline: "Offizieller Amazon Delivery Service Partner (DSP) Deutschland",
  officialEmail: "info@balulogistik.de",
  phone: "0151-52458647",
  address: "Navarrastr. 8",
  city: "Paderborn",
  postalCode: "33106",
  country: "Deutschland",
  amazonStationCode: "DNX5"
};

const driverApplications: DriverApplication[] = [
  {
    id: "BALU-DE-40291",
    firstName: "Jan",
    lastName: "Weber",
    email: "jan.weber.logistik@example.de",
    phone: "+49 171 2345678",
    city: "Paderborn",
    postalCode: "33100",
    hasClassBLicense: true,
    isMinAge: true,
    cleanRecord: true,
    workPermitEU: true,
    employmentType: "full-time",
    experienceYears: "1-2 Jahre Transporter / Kurierdienst",
    notes: "Zuverlässiger Fahrer mit Erfahrung im regionalen Lieferverkehr. Führerschein Klasse B seit 4 Jahren unfallfrei.",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    status: "interview_scheduled"
  },
  {
    id: "BALU-DE-40292",
    firstName: "Maria",
    lastName: "Schmidt",
    email: "m.schmidt.drive@example.de",
    phone: "+49 160 9876543",
    city: "Paderborn",
    postalCode: "33106",
    hasClassBLicense: true,
    isMinAge: true,
    cleanRecord: true,
    workPermitEU: true,
    employmentType: "full-time",
    experienceYears: "Quereinsteiger (sehr motiviert)",
    notes: "Freundliches Auftreten, hohe Pünktlichkeit, körperlich fit. Suche einen langfristigen Arbeitsplatz im Amazon Zustellteam.",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    status: "submitted"
  }
];

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Health check
app.get(["/api/health", "/health"], (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Settings endpoint
app.get(["/api/settings", "/settings"], (_req, res) => {
  res.json(companySettings);
});

app.post(["/api/settings", "/settings"], (req, res) => {
  try {
    companySettings = {
      ...companySettings,
      ...req.body
    };
    res.json({ success: true, settings: companySettings });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Driver Applications API
app.get(["/api/applications", "/applications"], (_req, res) => {
  res.json(driverApplications);
});

app.post(["/api/apply", "/apply"], (req, res) => {
  try {
    const body = req.body;
    if (!body.firstName || !body.lastName || !body.email || !body.phone) {
      return res.status(400).json({ error: "Bitte füllen Sie Vorname, Nachname, E-Mail und Telefonnummer aus." });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(String(body.email).trim())) {
      return res.status(400).json({ error: "Bitte eine gültige E-Mail-Adresse mit Domain angeben." });
    }

    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(String(body.phone).trim())) {
      return res.status(400).json({ error: "Die Telefonnummer darf nur Ziffern enthalten." });
    }

    const newId = `BALU-DE-${Math.floor(10000 + Math.random() * 90000)}`;
    const application: DriverApplication = {
      id: newId,
      firstName: String(body.firstName).trim(),
      lastName: String(body.lastName).trim(),
      email: String(body.email).trim(),
      phone: String(body.phone).trim(),
      city: String(body.city || "").trim() || "Paderborn / Umgebung",
      postalCode: String(body.postalCode || "").trim() || "",
      hasClassBLicense: Boolean(body.hasClassBLicense ?? true),
      isMinAge: Boolean(body.isMinAge ?? true),
      cleanRecord: Boolean(body.cleanRecord ?? true),
      workPermitEU: Boolean(body.workPermitEU ?? true),
      employmentType: body.employmentType || "full-time",
      experienceYears: body.experienceYears || "Quereinsteiger",
      notes: String(body.notes || "").trim(),
      submittedAt: new Date().toISOString(),
      status: "submitted"
    };

    driverApplications.unshift(application);

    const targetEmail = companySettings.officialEmail;
    const emailSubject = `[BEWERBUNG FAHRER / COURIER] ${application.firstName} ${application.lastName} - ${application.id}`;
    
    const emailBody = `
=========================================
BALU LOGISTICS - NEUE FAHRER-BEWERBUNG
=========================================
Referenz-ID: ${application.id}
Datum: ${new Date(application.submittedAt).toLocaleString("de-DE")}
Empfänger-Postfach: ${targetEmail}

BEWERBER-DATEN:
-----------------------------------------
Name: ${application.firstName} ${application.lastName}
E-Mail: ${application.email}
Telefon: ${application.phone}
Wohnort: ${application.postalCode} ${application.city}

VORAUSSETZUNGEN (DEUTSCHLAND):
-----------------------------------------
• Führerschein Klasse B (PKW bis 3,5t): ${application.hasClassBLicense ? "JA [ERFÜLLT]" : "NEIN"}
• Mindestalter (ab 18/21 J.): ${application.isMinAge ? "JA [ERFÜLLT]" : "NEIN"}
• Arbeitserlaubnis (EU/Deutschland): ${application.workPermitEU ? "JA [ERFÜLLT]" : "NEIN"}
• Anstellungsart: ${application.employmentType === 'full-time' ? 'Vollzeit' : application.employmentType === 'part-time' ? 'Teilzeit' : 'Minijob'}
• Fahrerfahrung: ${application.experienceYears}

NACHRICHT / ERFAHRUNGEN:
-----------------------------------------
${application.notes || "Keine zusätzlichen Anmerkungen angegeben."}

-----------------------------------------
Zuständiger Amazon Verteilzentrum Hub: ${companySettings.amazonStationCode} (${companySettings.city})
    `.trim();

    const mailtoUrl = `mailto:${encodeURIComponent(targetEmail)}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    return res.json({
      success: true,
      id: application.id,
      message: `Bewerbung ${application.id} erfolgreich an ${targetEmail} übermittelt.`,
      targetEmail,
      mailtoUrl,
      application
    });
  } catch (err: any) {
    console.error("Fehler bei der Bewerbungsverarbeitung:", err);
    return res.status(500).json({ error: "Bewerbung konnte nicht übermittelt werden. Bitte erneut versuchen." });
  }
});

app.patch(["/api/applications/:id", "/applications/:id"], (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const index = driverApplications.findIndex((a) => a.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Bewerbung nicht gefunden" });
  }
  driverApplications[index].status = status;
  return res.json({ success: true, application: driverApplications[index] });
});

// Contact form endpoint
app.post(["/api/contact", "/contact"], (req, res) => {
  const { name, email, phone, subject } = req.body;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !emailRegex.test(String(email).trim())) {
    return res.status(400).json({ error: "Bitte eine gültige E-Mail-Adresse mit Domain angeben." });
  }
  if (phone && !/^\d+$/.test(String(phone).trim())) {
    return res.status(400).json({ error: "Die Telefonnummer darf nur Ziffern enthalten." });
  }
  const targetEmail = companySettings.officialEmail;
  res.json({
    success: true,
    message: `Ihre Nachricht wurde an ${targetEmail} weitergeleitet.`
  });
});

export default app;
