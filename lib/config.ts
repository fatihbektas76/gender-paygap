// Globale Konstanten für gender-paygap.de

export const SITE = {
  name: 'gender-paygap.de',
  url: 'https://www.gender-paygap.de',
  title: 'Entgelttransparenz & Gender Pay Gap',
  description:
    'Fachanwalt für Arbeitsrecht berät Arbeitnehmer und Arbeitgeber zu Auskunftsrecht, Equal-Pay-Klage und Compliance-Pflichten ab 2026.',
} as const;

export const KANZLEI = {
  name: 'APOS Legal Rechtsanwaltsgesellschaft mbH & Co. KG',
  shortName: 'APOS Legal',
  displayName: 'APOS Legal — Kanzlei Fatih Bektas',
  address: {
    street: 'Am Paradeplatz 20',
    plz: '69126',
    city: 'Heidelberg',
    state: 'Baden-Württemberg',
    country: 'DE',
  },
  phone: '+49 6222 9599 2400',
  phoneE164: '+49622295992400',
  email: 'bektas@apos.legal',
  domain: 'www.gender-paygap.de',
} as const;

export const ANWALT = {
  name: 'Fatih Bektas',
  title: 'Fachanwalt für Arbeitsrecht',
  zusatz: 'Ex-CEO / CFO / COO (Unzer, iCOM Group)',
  credential: 'Fachanwalt für Arbeitsrecht seit 2011',
  organization: 'Rechtsanwaltskammer Karlsruhe',
} as const;

export const TEAM = [
  'Georg Willem Büchler',
  'Dr. Martin Duncker',
  'Tobias Fürniss',
  'Dr. Heiko Hofstätter',
  'Vincent Samklu',
] as const;

export const RATING = {
  value: '4.9',
  count: '68',
  best: '5',
  worst: '1',
  platform: 'anwalt.de',
} as const;

export const ANALYTICS = {
  gaId: 'G-XXXXXXXXXX', // Platzhalter — neues GA4-Property anlegen
} as const;

export const SOCIAL = {
  anwaltde: 'https://www.anwalt.de/fatihbektas',
  linkedin: 'https://www.linkedin.com/in/fatih-bektas',
  teamPage: 'https://www.gender-paygap.de/team/',
} as const;
