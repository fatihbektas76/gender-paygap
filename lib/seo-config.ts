import type { Metadata } from 'next';
import { SITE, KANZLEI, ANWALT, RATING, SOCIAL } from './config';

export const SEO_CONFIG = {
  siteName: SITE.name,
  baseUrl: SITE.url,

  author: {
    name: ANWALT.name,
    jobTitle: ANWALT.title,
    credential: ANWALT.credential,
    organization: ANWALT.organization,
    telephone: KANZLEI.phoneE164,
    email: KANZLEI.email,
    memberOf: [
      { '@type': 'Organization' as const, name: 'Deutscher Anwaltverein' },
      { '@type': 'Organization' as const, name: 'BVAU' },
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential' as const,
        credentialCategory: 'Fachanwalt für Arbeitsrecht',
      },
      {
        '@type': 'EducationalOccupationalCredential' as const,
        credentialCategory: 'Zertifizierter Mediator',
      },
    ],
    sameAs: [
      SOCIAL.anwaltde,
      SOCIAL.linkedin,
      SOCIAL.teamPage,
    ],
  },

  organization: {
    id: `${SITE.url}/#organization`,
    name: KANZLEI.displayName,
    legalName: KANZLEI.name,
    url: `${SITE.url}/`,
    description: SITE.description,
    telephone: KANZLEI.phoneE164,
    email: KANZLEI.email,
    address: {
      streetAddress: KANZLEI.address.street,
      addressLocality: KANZLEI.address.city,
      postalCode: KANZLEI.address.plz,
      addressCountry: KANZLEI.address.country,
    },
    areaServed: { '@type': 'Country' as const, name: 'Germany' },
    serviceType: [
      'Entgelttransparenz',
      'Equal Pay Beratung',
      'Lohndiskriminierung',
      'Compliance Audit',
      'Auskunftsrecht',
      'Gender Pay Gap Analyse',
    ],
    knowsLanguage: ['de', 'en'],
  },

  rating: {
    ratingValue: RATING.value,
    reviewCount: RATING.count,
    bestRating: RATING.best,
    worstRating: RATING.worst,
  },

  reviews: [
    {
      '@type': 'Review' as const,
      author: { '@type': 'Person' as const, name: 'Mandantin' },
      datePublished: '2025-11-15',
      reviewBody: 'Herr Bektas hat mein Auskunftsrecht erfolgreich durchgesetzt und eine erhebliche Gehaltsnachzahlung erwirkt. Sehr kompetent und schnell.',
      reviewRating: { '@type': 'Rating' as const, ratingValue: '5', bestRating: '5' },
    },
    {
      '@type': 'Review' as const,
      author: { '@type': 'Person' as const, name: 'Mandant' },
      datePublished: '2025-09-22',
      reviewBody: 'Ausgezeichnete Compliance-Beratung zur Entgelttransparenz. Unser Vergütungssystem ist jetzt audit-ready. Klare Empfehlung.',
      reviewRating: { '@type': 'Rating' as const, ratingValue: '5', bestRating: '5' },
    },
    {
      '@type': 'Review' as const,
      author: { '@type': 'Person' as const, name: 'Mandantin' },
      datePublished: '2025-07-10',
      reviewBody: 'Professionelle Equal-Pay-Beratung mit konkreten Ergebnissen. Die Entschädigung wurde innerhalb weniger Wochen durchgesetzt.',
      reviewRating: { '@type': 'Rating' as const, ratingValue: '5', bestRating: '5' },
    },
  ],
} as const;

export function buildMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const canonical = `${SEO_CONFIG.baseUrl}${path}${path.endsWith('/') ? '' : '/'}`;
  return {
    title,
    description,
    alternates: { canonical },
    robots: noindex ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical,
      siteName: SEO_CONFIG.siteName,
      locale: 'de_DE',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
