/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  trailingSlash: true,
  env: {
    SITE_URL: 'https://www.gender-paygap.de',
    SITE_NAME: 'gender-paygap.de',
    KANZLEI_NAME: 'APOS Legal Rechtsanwaltsgesellschaft mbH & Co. KG',
    ANWALT_NAME: 'Fatih Bektas',
    ANWALT_TITLE: 'Fachanwalt für Arbeitsrecht',
    PHONE: '+49 6222 9599 2400',
    CITY: 'Heidelberg',
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
