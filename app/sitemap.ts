import type { MetadataRoute } from 'next';
import { entries } from '@/lib/betriebszugehoerigkeit';
import { abmahnungEntries } from '@/lib/abmahnung-content';
import { lebenssituationData } from '@/lib/lebenssituation-data';
import { aufhebungsvertragData } from '@/lib/aufhebungsvertrag-data';
import { musterPages } from '@/lib/muster-data';
import { staedte } from '@/data/staedte';
import { gemeinden } from '@/data/gemeinden';
import { berlinBezirke } from '@/data/bezirke';
import { urteile } from '@/lib/urteile';
import { branchen } from '@/data/branchen';
import { bundeslaender } from '@/data/bundeslaender';
import { unternehmensgroessen } from '@/data/unternehmensgroesse';

export const revalidate = 3600;

const BASE_URL = 'https://www.gender-paygap.de';

/** Stable date: first Monday of current week — changes only once per week */
function weeklyDate(): Date {
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? 6 : day - 1; // Monday = 0 offset
  now.setDate(now.getDate() - diff);
  now.setHours(6, 0, 0, 0);
  return now;
}

/** Stable date: first day of current month */
function monthlyDate(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

const templateCSlugs = [
  'it', 'gesundheitswesen', 'bankwesen', 'einzelhandel', 'oeffentlicher-dienst',
  'produktion', 'bildung', 'pflege', 'versicherung', 'logistik', 'finanzwesen', 'chemie',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const weekly = weeklyDate();
  const monthly = monthlyDate();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: weekly, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/abfindung/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/kuendigung/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/aufhebungsvertrag/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/abmahnung/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/ratgeber/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/ratgeber/urteile/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/ratgeber/muster/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/abfindungsrechner/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/kuendigung-pruefen/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/schwellenwert-rechner/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/tools/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/ueberstundenrechner/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/kuendigungsfrist-rechner/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/urlaubsabgeltung-rechner/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/urlaub-teilzeit-rechner/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/aufhebungsvertrag-pruefen/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/glossar/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/team/`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.5 },

    // Hub pages
    { url: `${BASE_URL}/arbeitnehmer/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/arbeitgeber/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/gender-pay-gap/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/entgelttransparenzgesetz/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/kontakt/`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/equal-pay-klage/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.9 },

    // AN content pages
    { url: `${BASE_URL}/auskunftsrecht-entgelttransparenz/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/lohndiskriminierung-nachweisen/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/entschaedigung-entgeltdiskriminierung/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/beweislastumkehr-equal-pay/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/gleicher-lohn-gleiche-arbeit/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/elternzeit-gehaltsluecke/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/rueckkehr-elternzeit-gehalt/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/teilzeit-gehaltsvergleich/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.8 },

    // AG content pages
    { url: `${BASE_URL}/entgelttransparenz-arbeitgeber/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/berichtspflichten-gender-pay-gap/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/entgeltgleichheit-audit/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/stellenanzeige-gehaltsspanne-pflicht/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/auskunftsrecht-arbeitnehmer-beantworten/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/verguetungssystem-rechtssicher/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/esg-gender-pay-gap-berichterstattung/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/tarifbindung-entgelttransparenz/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/entgelttransparenz-sanktionen-bussgeld/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.8 },

    // Interactive tools — AN
    { url: `${BASE_URL}/auskunftsrecht-checker/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/auskunftsrecht-checker/schreiben-generator/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/equal-pay-anspruch-schnellcheck/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/equal-pay-klage/entschaedigung-berechnen/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/gehaltsverhandlung-vorbereiter/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/vergleichsgruppen-finder/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/gender-pay-gap-rechner/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/equal-pay-day-zaehler/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/situationscheck/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },

    // Interactive tools — AG
    { url: `${BASE_URL}/compliance-check-arbeitgeber/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/compliance-check-arbeitgeber/sanktionsrechner/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/entgeltluecken-ampel/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/verguetungssystem-selbsttest/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/stellenanzeigen-checker/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/berichtspflicht-kalender/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
  ];

  const clusterAPages: MetadataRoute.Sitemap = entries.map((e) => ({
    url: `${BASE_URL}/abfindung-nach-${e.slug}-betriebszugehoerigkeit/`,
    lastModified: monthly,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const clusterDPages: MetadataRoute.Sitemap = entries.map((e) => ({
    url: `${BASE_URL}/gekuendigt-nach-${e.slug}-betriebszugehoerigkeit/`,
    lastModified: monthly,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const clusterGPages: MetadataRoute.Sitemap = abmahnungEntries.map((e) => ({
    url: `${BASE_URL}/kuendigung-nach-${e.slug}/`,
    lastModified: monthly,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const clusterHPages: MetadataRoute.Sitemap = lebenssituationData.map((e) => ({
    url: `${BASE_URL}/kuendigung/${e.slug}/`,
    lastModified: monthly,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const clusterJPages: MetadataRoute.Sitemap = aufhebungsvertragData.map((e) => ({
    url: `${BASE_URL}/aufhebungsvertrag/${e.slug}/`,
    lastModified: monthly,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const clusterFPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/fristlose-kuendigung/`,
      lastModified: weekly,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...entries.map((e) => ({
      url: `${BASE_URL}/fristlose-kuendigung-nach-${e.slug}-betriebszugehoerigkeit/`,
      lastModified: monthly as Date,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];

  const musterSubPages: MetadataRoute.Sitemap = musterPages.map((e) => ({
    url: `${BASE_URL}/ratgeber/muster/${e.slug}/`,
    lastModified: monthly,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const arbeitsrechtAnwaltPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/arbeitsrecht-anwalt/`,
      lastModified: weekly,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...[...staedte, ...gemeinden, ...berlinBezirke].map((ort) => ({
      url: `${BASE_URL}/arbeitsrecht-anwalt/${ort.slug}/`,
      lastModified: monthly as Date,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];

  const urteilPages: MetadataRoute.Sitemap = urteile.map((u) => ({
    url: `${BASE_URL}/urteile/${u.slug}/`,
    lastModified: monthly,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Template A: /auskunftsrecht-[branche] (all except finanzwesen)
  const auskunftsrechtBranchePages: MetadataRoute.Sitemap = branchen
    .filter((b) => b.slug !== 'finanzwesen')
    .map((b) => ({
      url: `${BASE_URL}/auskunftsrecht-${b.slug}/`,
      lastModified: monthly,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  // Template B: /entgelttransparenz-[groesse]-mitarbeiter
  const entgelttransparenzGroessePages: MetadataRoute.Sitemap = unternehmensgroessen.map((g) => ({
    url: `${BASE_URL}/entgelttransparenz-${g.slug}-mitarbeiter/`,
    lastModified: monthly,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Template C: /gender-pay-gap-[branche] (12 branches)
  const genderPayGapBranchePages: MetadataRoute.Sitemap = templateCSlugs.map((slug) => ({
    url: `${BASE_URL}/gender-pay-gap-${slug}/`,
    lastModified: monthly,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Template D: /equal-pay-klage-[bundesland]
  const equalPayKlageBundeslandPages: MetadataRoute.Sitemap = bundeslaender.map((bl) => ({
    url: `${BASE_URL}/equal-pay-klage-${bl.slug}/`,
    lastModified: monthly,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Template E: /entgelttransparenz-arbeitgeber-[branche] (all except finanzwesen)
  const entgelttransparenzArbeitgeberBranchePages: MetadataRoute.Sitemap = branchen
    .filter((b) => b.slug !== 'finanzwesen')
    .map((b) => ({
      url: `${BASE_URL}/entgelttransparenz-arbeitgeber-${b.slug}/`,
      lastModified: monthly,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  return [
    ...staticPages,
    ...clusterAPages,
    ...clusterDPages,
    ...clusterGPages,
    ...clusterHPages,
    ...clusterJPages,
    ...clusterFPages,
    ...musterSubPages,
    ...arbeitsrechtAnwaltPages,
    ...urteilPages,
    ...auskunftsrechtBranchePages,
    ...entgelttransparenzGroessePages,
    ...genderPayGapBranchePages,
    ...equalPayKlageBundeslandPages,
    ...entgelttransparenzArbeitgeberBranchePages,
  ];
}
