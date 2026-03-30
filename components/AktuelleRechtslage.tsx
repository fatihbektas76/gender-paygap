const monatsTipps = [
  { // Januar
    titel: 'Neues Jahr, neue Pflichten: Entgelttransparenz 2026',
    text: 'Ab diesem Jahr müssen Unternehmen mit mehr als 50 Mitarbeitern Auskunftsanfragen zu Gehältern beantworten. Prüfen Sie jetzt, ob Ihr Arbeitgeber seine Pflichten kennt — und ob Sie Ihr Auskunftsrecht nutzen sollten.',
  },
  { // Februar
    titel: 'Equal Pay Day: Frauen arbeiten bis heute „umsonst"',
    text: 'Der Equal Pay Day markiert den Tag, bis zu dem Frauen rechnerisch unbezahlt arbeiten. In Deutschland liegt der Gender Pay Gap bei 16% (Destatis 2025). Das neue EU-Recht gibt Ihnen Werkzeuge, dagegen vorzugehen.',
  },
  { // März
    titel: 'BAG-Urteil stärkt Arbeitnehmerrechte bei Equal Pay',
    text: 'Das BAG-Urteil Az. 8 AZR 300/24 vom 23.10.2025 bestätigt: Ein Paarvergleich reicht aus, um eine Diskriminierungsvermutung auszulösen. Die Beweislast liegt dann beim Arbeitgeber.',
  },
  { // April
    titel: 'Stellenanzeigen: Gehaltsspannen werden Pflicht',
    text: 'Die EU-Entgelttransparenzrichtlinie verpflichtet Arbeitgeber, in Stellenanzeigen eine Gehaltsspanne anzugeben. Unternehmen, die das nicht tun, riskieren Sanktionen ab Juni 2026.',
  },
  { // Mai
    titel: 'Countdown: Noch einen Monat bis zur EU-Richtlinie',
    text: 'Am 7. Juni 2026 tritt die EU-Entgelttransparenzrichtlinie in Kraft. Arbeitgeber müssen Auskunftsanfragen beantworten, Vergütungskriterien offenlegen und Berichtspflichten einhalten.',
  },
  { // Juni
    titel: 'EU-Entgelttransparenzrichtlinie tritt in Kraft',
    text: 'Ab heute gilt: Alle Beschäftigten in Unternehmen ab 50 Mitarbeitern haben ein Auskunftsrecht über Vergleichsgehälter (Art. 7 EU-RL 2023/970). Arbeitgeber müssen innerhalb von 2 Monaten antworten.',
  },
  { // Juli
    titel: 'Erste Auskunftsanfragen: Arbeitgeber unter Druck',
    text: 'Einen Monat nach Inkrafttreten der Richtlinie häufen sich die Auskunftsanfragen. Viele Arbeitgeber sind schlecht vorbereitet. Nutzen Sie jetzt Ihr Recht — wir unterstützen Sie dabei.',
  },
  { // August
    titel: 'Rückkehr aus Elternzeit: Gehaltscheck machen',
    text: 'Nach der Elternzeit haben viele Beschäftigte eine Gehaltslücke. Die neue Richtlinie gibt Ihnen das Recht, Ihr Gehalt mit dem Ihrer Vergleichsgruppe abzugleichen.',
  },
  { // September
    titel: 'Compliance-Audit: Jetzt vorbereiten statt reagieren',
    text: 'Unternehmen ab 250 Mitarbeitern müssen 2027 erstmals über den Gender Pay Gap berichten. Beginnen Sie jetzt mit der Analyse Ihrer Vergütungsstrukturen.',
  },
  { // Oktober
    titel: 'Teilzeit & Equal Pay: Ihre Rechte als Teilzeitkraft',
    text: 'Teilzeitbeschäftigte — überwiegend Frauen — sind häufig von Entgeltdiskriminierung betroffen. Die EU-Richtlinie schützt auch Teilzeitkräfte: Gleiche Arbeit verdient gleiches Entgelt.',
  },
  { // November
    titel: 'Jahresbonus & Gehaltsrunde: Transparenz einfordern',
    text: 'Vor den Jahresgesprächen lohnt sich ein Gehaltsvergleich. Nutzen Sie Ihr Auskunftsrecht, um mit konkreten Zahlen in die Verhandlung zu gehen.',
  },
  { // Dezember
    titel: 'Jahresrückblick: Entgelttransparenz-Bilanz ziehen',
    text: 'Das erste Jahr unter der neuen EU-Richtlinie zeigt: Wer sein Auskunftsrecht nutzt, hat bessere Chancen auf faire Bezahlung. Planen Sie jetzt Ihre Schritte für das neue Jahr.',
  },
];

export default function AktuelleRechtslage() {
  const now = new Date();
  const monat = now.getMonth();
  const tipp = monatsTipps[monat];

  const monate = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
  ];

  return (
    <section className="py-12 px-8 bg-white">
      <div className="max-w-content mx-auto">
        <div className="max-w-[740px] border border-gold/30 rounded overflow-hidden">
          <div className="bg-cream px-6 py-3 border-b border-gold/30 flex items-center justify-between">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold">
              Aktuelle Rechtslage
            </div>
            <div className="text-[0.72rem] text-ink-muted">
              {monate[monat]} {now.getFullYear()}
            </div>
          </div>
          <div className="p-6">
            <h2 className="font-serif text-[1.1rem] font-bold text-ink mb-2">
              {tipp.titel}
            </h2>
            <p className="text-[0.92rem] text-ink-light leading-relaxed m-0">
              {tipp.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
