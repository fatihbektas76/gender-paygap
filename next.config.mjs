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
};

export default nextConfig;
