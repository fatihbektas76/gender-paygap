'use client';

import { useState, FormEvent } from 'react';
import FadeUp from './FadeUp';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          company: formData.get('company'),
          phone: formData.get('phone'),
          audience: formData.get('audience'),
          disputeType: formData.get('disputeType'),
          disputeValue: formData.get('disputeValue'),
          message: formData.get('message'),
          website: formData.get('website'),
        }),
      });

      if (!res.ok) throw new Error('Failed to submit');
      setSubmitted(true);
    } catch {
      setLoading(false);
      alert('Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an bektas@apos.legal');
    }
  }

  return (
    <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6" id="kontakt">
      <div className="max-w-content mx-auto">
        <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold mb-2.5">
          Kontakt
        </div>
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-[1.25] mb-3.5 max-md:text-2xl">
          Schildern Sie uns Ihre Situation
        </h2>
        <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed mb-10">
          Füllen Sie das Formular aus — wir prüfen Ihren Fall zu Entgelttransparenz, Equal Pay oder
          Compliance. Kostenlos und in der Regel innerhalb von 48 Stunden.
        </p>
        <div className="grid grid-cols-2 gap-14 items-start max-md:grid-cols-1 max-md:gap-8">
          <FadeUp>
            <div>
              <h3 className="font-serif text-[1.4rem] font-bold mb-4">Was passiert danach?</h3>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-6">
                Nach Ihrer Anfrage prüfen wir die Details und melden uns mit einer Ersteinschätzung —
                welche Rechte Sie haben, welche Pflichten gelten und welche nächsten Schritte sinnvoll sind.
              </p>
              <div className="flex items-center gap-3 mb-3.5 text-[0.92rem] text-ink-light">
                <div className="w-11 h-11 min-w-[44px] rounded-[10px] bg-gold-bg border border-gold/[0.12] flex items-center justify-center text-gold">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 4l-10 8L2 4" />
                  </svg>
                </div>
                <div>
                  <strong>E-Mail</strong>
                  <br />
                  <a href="mailto:bektas@apos.legal" className="text-ink-light no-underline hover:text-gold transition-colors">
                    bektas@apos.legal
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-3.5 text-[0.92rem] text-ink-light">
                <div className="w-11 h-11 min-w-[44px] rounded-[10px] bg-gold-bg border border-gold/[0.12] flex items-center justify-center text-gold">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <strong>Telefon</strong>
                  <br />
                  <a href="tel:+49622295992400" className="text-ink-light no-underline hover:text-gold transition-colors">
                    +49 6222 9599 2400
                  </a>
                </div>
              </div>
              <div className="flex justify-center mt-5 mb-3.5">
                <a
                  href="https://meet.brevo.com/fatih-bektas/erstberatung-per-telefon-kuendigung-arbeitsrechtde"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 py-3.5 px-8 border-2 border-gold bg-gold-bg text-gold font-semibold text-[0.95rem] rounded-sm no-underline transition-all hover:bg-gold hover:text-white hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                  Jetzt Online Termin buchen
                </a>
              </div>
              <div className="mt-6 py-4 px-5 bg-slate-50 rounded-sm border-l-[3px] border-gold">
                <p className="text-[0.85rem] text-ink-muted m-0 leading-relaxed">
                  <strong className="text-ink font-semibold">Antwortzeit:</strong> Wir melden uns in der
                  Regel innerhalb von 48 Stunden an Werktagen. Falls Sie laufende Fristen haben,
                  erwähnen Sie dies — wir priorisieren dringende Angelegenheiten.
                </p>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={1}>
            <div className="bg-slate-50 border border-border-light rounded p-9 px-8">
              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  {/* Honeypot */}
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
                    <div>
                      <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                        Vollständiger Name <span className="text-gold ml-0.5">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Max Mustermann"
                        required
                        className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted"
                      />
                    </div>
                    <div>
                      <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                        E-Mail <span className="text-gold ml-0.5">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="max@beispiel.de"
                        required
                        className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
                    <div>
                      <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">Arbeitgeber</label>
                      <input
                        type="text"
                        name="company"
                        placeholder="Name Ihres Arbeitgebers"
                        className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted"
                      />
                    </div>
                    <div>
                      <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">Telefon</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+49 151 1234 5678"
                        className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="audience" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                      Ich bin <span className="text-gold ml-0.5">*</span>
                    </label>
                    <select
                      id="audience"
                      name="audience"
                      aria-label="Ich bin Arbeitnehmer oder Arbeitgeber"
                      required
                      defaultValue=""
                      className="form-select w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)]"
                    >
                      <option value="" disabled>
                        Bitte wählen Sie
                      </option>
                      <option value="arbeitnehmer">Arbeitnehmer:in</option>
                      <option value="arbeitgeber">Arbeitgeber / Unternehmen</option>
                      <option value="betriebsrat">Betriebsrat</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="disputeType" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                      Thema
                    </label>
                    <select
                      id="disputeType"
                      name="disputeType"
                      aria-label="Thema der Anfrage"
                      defaultValue=""
                      className="form-select w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)]"
                    >
                      <option value="" disabled>
                        Bitte wählen Sie
                      </option>
                      <option value="auskunftsrecht">Auskunftsrecht / Gehaltsauskunft</option>
                      <option value="equal-pay-klage">Equal-Pay-Klage / Entschädigung</option>
                      <option value="lohndiskriminierung">Lohndiskriminierung</option>
                      <option value="compliance-audit">Compliance-Audit / Vergütungssystem</option>
                      <option value="berichtspflichten">Berichtspflichten</option>
                      <option value="stellenanzeigen">Gehaltsspanne in Stellenanzeigen</option>
                      <option value="sonstiges">Sonstiges</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="disputeValue" className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                      Unternehmensgröße
                    </label>
                    <select
                      id="disputeValue"
                      name="disputeValue"
                      aria-label="Unternehmensgröße"
                      defaultValue=""
                      className="form-select w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)]"
                    >
                      <option value="" disabled>
                        Bitte wählen Sie
                      </option>
                      <option value="unter-50">Unter 50 Mitarbeiter</option>
                      <option value="50-99">50–99 Mitarbeiter</option>
                      <option value="100-249">100–249 Mitarbeiter</option>
                      <option value="250-499">250–499 Mitarbeiter</option>
                      <option value="500-plus">500+ Mitarbeiter</option>
                      <option value="keine-angabe">Keine Angabe</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                      Ihre Nachricht <span className="text-gold ml-0.5">*</span>
                    </label>
                    <textarea
                      name="message"
                      placeholder="Beschreiben Sie kurz Ihre Situation — z.B. vermutete Lohndiskriminierung, Auskunftsanfrage eines Mitarbeiters, oder bevorstehende Berichtspflicht."
                      required
                      className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none resize-y min-h-[120px] focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)] placeholder:text-ink-muted"
                    />
                    <div className="text-[0.78rem] text-ink-muted mt-1">
                      Nennen Sie uns ggf. Fristen oder anstehende Termine (z.B. Berichtsfrist, laufende Verfahren).
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-gold text-white border-none rounded-sm font-sans text-base font-semibold cursor-pointer transition-all mt-2 hover:bg-gold hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                  >
                    {loading ? 'Wird gesendet...' : 'Anfrage senden \u2192'}
                  </button>
                  <p className="text-[0.76rem] text-ink-muted mt-3 text-center leading-relaxed">
                    Mit dem Absenden stimmen Sie unserer{' '}
                    <a href="/privacy-policy" className="text-gold underline">
                      Datenschutzerklärung
                    </a>{' '}
                    zu. Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet.
                  </p>
                </form>
              ) : (
                <div className="text-center py-10 px-5">
                  <h3 className="font-serif text-[1.3rem] font-bold text-ink mb-2">
                    &#10003; Anfrage eingegangen
                  </h3>
                  <p className="text-[0.95rem] text-ink-muted">
                    Vielen Dank. Wir prüfen Ihren Fall und melden uns innerhalb von 48 Stunden.
                  </p>
                </div>
              )}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
