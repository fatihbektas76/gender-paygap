/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  trailingSlash: true,
  poweredByHeader: false,
  env: {
    SITE_URL: 'https://www.gender-paygap.de',
    SITE_NAME: 'gender-paygap.de',
    KANZLEI_NAME: 'APOS Legal Rechtsanwaltsgesellschaft mbH & Co. KG',
    ANWALT_NAME: 'Fatih Bektas',
    ANWALT_TITLE: 'Fachanwalt für Arbeitsrecht',
    PHONE: '+49 6222 9599 2400',
    CITY: 'Heidelberg',
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'gender-paygap.de' }],
        destination: 'https://www.gender-paygap.de/:path*',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      // Template A: /auskunftsrecht-[branche]
      {
        source: '/auskunftsrecht-:branche/',
        destination: '/auskunftsrecht/:branche/',
      },
      // Template B: /entgelttransparenz-[groesse]-mitarbeiter
      {
        source: '/entgelttransparenz-:groesse-mitarbeiter/',
        destination: '/entgelttransparenz-mitarbeiter/:groesse/',
      },
      // Template F: /gender-pay-gap-[bundesland]
      {
        source: '/gender-pay-gap-:bundesland(baden-wuerttemberg|bayern|nordrhein-westfalen|hessen|berlin|hamburg|niedersachsen|sachsen)/',
        destination: '/gender-pay-gap-bundesland/:bundesland/',
      },
      // Template C: /gender-pay-gap-[branche]
      {
        source: '/gender-pay-gap-:branche/',
        destination: '/gender-pay-gap-branche/:branche/',
      },
      // Template D: /equal-pay-klage-[bundesland]
      {
        source: '/equal-pay-klage-:bundesland/',
        destination: '/equal-pay-klage-bundesland/:bundesland/',
      },
      // Template E: /entgelttransparenz-arbeitgeber-[branche]
      {
        source: '/entgelttransparenz-arbeitgeber-:branche/',
        destination: '/entgelttransparenz-arbeitgeber-branche/:branche/',
      },
    ];
  },
};

export default nextConfig;
