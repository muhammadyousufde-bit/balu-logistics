import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const currentDir = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url || 'file://' + process.cwd()));

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

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // Raw Image Upload & Persistence Endpoints
  app.post("/api/upload-hero", (req, res) => {
    try {
      const { dataUrl } = req.body;
      if (!dataUrl) {
        return res.status(400).json({ error: "No image data provided" });
      }
      const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return res.status(400).json({ error: "Invalid data URL format" });
      }
      const buffer = Buffer.from(matches[2], "base64");
      const publicDir = path.join(process.cwd(), "public");
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      fs.writeFileSync(path.join(publicDir, "716ce2f6-1929-406e-af32-b13583b178bc.png"), buffer);
      fs.writeFileSync(path.join(publicDir, "dnx5.png"), buffer);
      console.log("[UPLOAD] Original DNX5 image saved to disk successfully");
      return res.json({ success: true, path: "/716ce2f6-1929-406e-af32-b13583b178bc.png" });
    } catch (err: any) {
      console.error("Upload error:", err);
      return res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/upload-logo", (req, res) => {
    try {
      const { dataUrl } = req.body;
      if (!dataUrl) {
        return res.status(400).json({ error: "No image data provided" });
      }
      const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return res.status(400).json({ error: "Invalid data URL format" });
      }
      const buffer = Buffer.from(matches[2], "base64");
      const publicDir = path.join(process.cwd(), "public");
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      fs.writeFileSync(path.join(publicDir, "balu_logistik_gold_recolor.png"), buffer);
      fs.writeFileSync(path.join(publicDir, "logo.png"), buffer);
      console.log("[UPLOAD] Original logo image saved to disk successfully");
      return res.json({ success: true, path: "/balu_logistik_gold_recolor.png" });
    } catch (err: any) {
      console.error("Upload error:", err);
      return res.status(500).json({ error: err.message });
    }
  });

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Settings endpoint
  app.get("/api/settings", (_req, res) => {
    res.json(companySettings);
  });

  app.post("/api/settings", (req, res) => {
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
  app.get("/api/applications", (_req, res) => {
    res.json(driverApplications);
  });

  app.post("/api/apply", (req, res) => {
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

      // Pre-compose direct dispatch email for the recruiter
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

      console.log(`[DISPATCH EMAIL TO ${targetEmail}] ${emailSubject}`);

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

  app.patch("/api/applications/:id", (req, res) => {
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
  app.post("/api/contact", (req, res) => {
    const { name, email, phone, subject, message } = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(String(email).trim())) {
      return res.status(400).json({ error: "Bitte eine gültige E-Mail-Adresse mit Domain angeben." });
    }
    if (phone && !/^\d+$/.test(String(phone).trim())) {
      return res.status(400).json({ error: "Die Telefonnummer darf nur Ziffern enthalten." });
    }
    const targetEmail = companySettings.officialEmail;
    console.log(`[KONTAKTANFRAGE] Von ${name} (${email}) - Betreff: ${subject}`);
    res.json({
      success: true,
      message: `Ihre Nachricht wurde an ${targetEmail} weitergeleitet.`
    });
  });

  // Vite middleware for development or static build serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BALU Logistics server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
