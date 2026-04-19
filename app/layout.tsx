import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import LayoutClient from '@/components/LayoutClient';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';

const playfair = localFont({
  src: [
    { path: '../public/fonts/playfair-latin.woff2', weight: '400 800', style: 'normal' },
    { path: '../public/fonts/playfair-italic-latin.woff2', weight: '400', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-serif',
});

const sourceSans = localFont({
  src: [
    { path: '../public/fonts/sourcesans-latin.woff2', weight: '300 700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.gender-paygap.de'),
  verification: {
    google: 'AhwbP6h3RVXLI3d_7zOi1tAd8hBkDpkbHNIfufRvfwA',
  },
  title: {
    default: 'Entgelttransparenz & Gender Pay Gap — Fachanwalt für Arbeitsrecht',
    template: '%s | gender-paygap.de',
  },
  description:
    'Fachanwalt für Arbeitsrecht berät Arbeitnehmer und Arbeitgeber zu Auskunftsrecht, Equal-Pay-Klage und Compliance-Pflichten ab 2026. Kostenlose Ersteinschätzung. APOS Legal Heidelberg.',
  keywords: [
    'Gender Pay Gap',
    'Entgelttransparenz',
    'Equal Pay',
    'Auskunftsrecht',
    'Lohndiskriminierung',
    'Entgelttransparenzgesetz',
    'EU-Richtlinie 2023/970',
    'Compliance Audit',
    'Fachanwalt Arbeitsrecht',
    'APOS Legal',
  ],
  authors: [{ name: 'Fatih Bektas — Fachanwalt für Arbeitsrecht, APOS Legal' }],
  robots: 'index, follow, max-snippet:-1, max-image-preview:large',
  alternates: {
    canonical: 'https://www.gender-paygap.de/',
  },
  openGraph: {
    type: 'website',
    title: 'Entgelttransparenz & Gender Pay Gap — Fachanwalt für Arbeitsrecht',
    description:
      'Arbeitnehmer und Arbeitgeber: Fachanwalt berät zu Auskunftsrecht, Equal-Pay-Klage und Compliance-Pflichten ab 2026. Kostenlose Ersteinschätzung.',
    url: 'https://www.gender-paygap.de/',
    siteName: 'gender-paygap.de',
    locale: 'de_DE',
    images: [
      {
        url: 'https://www.gender-paygap.de/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'gender-paygap.de — Entgelttransparenz & Equal Pay',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Entgelttransparenz & Gender Pay Gap — Fachanwalt für Arbeitsrecht',
    description:
      'Auskunftsrecht, Equal-Pay-Klage, Compliance-Audit. Fachanwalt für Arbeitsrecht. APOS Legal Heidelberg.',
    images: ['https://www.gender-paygap.de/opengraph-image'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
    ],
    apple: [
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  other: {
    'theme-color': '#A68B4B',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" dir="ltr" className={`${playfair.variable} ${sourceSans.variable}`}>
      <head>
        {/* Schema.org - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'gender-paygap.de',
              alternateName: 'Entgelttransparenz & Gender Pay Gap',
              url: 'https://www.gender-paygap.de/',
              inLanguage: 'de-DE',
              publisher: {
                '@type': 'Organization',
                name: 'APOS Legal Rechtsanwaltsgesellschaft mbH & Co. KG',
                url: 'https://www.gender-paygap.de/',
              },
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://www.google.com/search?q=site%3Agender-paygap.de+{search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className="font-sans text-ink bg-white leading-relaxed">
        <SeoGeoBase
          pageUrl={SEO_CONFIG.baseUrl + '/'}
          pageTitle={SEO_CONFIG.siteName}
          pageDescription="Expertenseite für Entgelttransparenz und Gender Pay Gap — Fachanwalt für Arbeitsrecht"
          pageType="WebPage"
          includeOrganization={true}
          includeRating={false}
        />
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
