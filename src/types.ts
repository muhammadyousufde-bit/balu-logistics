export type Language = 'de' | 'en';

export interface CompanySettings {
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

export interface DriverApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  postalCode: string;
  hasClassBLicense: boolean;
  isMinAge: boolean;
  cleanRecord?: boolean;
  workPermitEU: boolean;
  employmentType: 'full-time' | 'part-time' | 'mini-job';
  experienceYears: string;
  notes: string;
  submittedAt: string;
  status: 'submitted' | 'under_review' | 'interview_scheduled' | 'approved';
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}
