import type { SiteContent } from './types'

// Placeholder texts of the template. They describe what belongs in each spot.
// The agent replaces all of them during onboarding.
export const de: SiteContent = {
  languageName: 'Deutsch',
  meta: {
    title: 'Musterbetrieb | Ihr Angebot in Wien',
    description:
      'Musterbetrieb in 1010 Wien. Hier steht in einem Satz, was Sie anbieten und für wen. Erreichbar unter 01 000 00 00.',
  },
  ui: {
    skipLink: 'Zum Inhalt springen',
    demoNotice: 'Beispielinhalt der Vorlage. Diese Angaben sind erfunden und noch nicht zur Veröffentlichung bestimmt.',
    mainNavLabel: 'Hauptnavigation',
    languageSwitchLabel: 'Sprache wählen',
    legalNavLabel: 'Rechtliches',
    today: 'Heute',
    closed: 'geschlossen',
    notFoundTitle: 'Diese Seite gibt es nicht',
    notFoundText: 'Die Adresse ist falsch geschrieben oder die Seite wurde verschoben.',
    backHome: 'Zur Startseite',
  },
  nav: {
    services: 'Leistungen',
    about: 'Über uns',
    faq: 'Häufige Fragen',
    contact: 'Kontakt',
  },
  notice: '',
  hero: {
    eyebrow: 'Ihre Branche · Ihr Ort',
    headline: 'Was Sie anbieten, in einem Satz.',
    lead: 'Hier steht in zwei Sätzen, für wen Ihr Betrieb da ist und was ihn ausmacht. Der Agent ersetzt diesen Text im ersten Gespräch durch Ihren eigenen.',
    callLabel: 'Anrufen',
    bookingLabel: 'Termin online buchen',
    directionsLabel: 'Anfahrt planen',
  },
  hours: {
    heading: 'Öffnungszeiten',
    days: {
      mo: 'Montag',
      tu: 'Dienstag',
      we: 'Mittwoch',
      th: 'Donnerstag',
      fr: 'Freitag',
      sa: 'Samstag',
      su: 'Sonntag',
    },
    note: 'Termine außerhalb dieser Zeiten nach Vereinbarung.',
  },
  services: {
    heading: 'Leistungen',
    intro: 'Die wichtigsten Leistungen Ihres Betriebs, jede mit einem Satz dazu, was Kunden davon haben.',
    items: [
      {
        title: 'Erste Leistung',
        text: 'Beschreiben Sie in einem Satz, was Kunden bei dieser Leistung bekommen.',
      },
      {
        title: 'Zweite Leistung',
        text: 'Nennen Sie das Ergebnis und nicht den Ablauf. Das Ergebnis lesen Besucher zuerst.',
      },
      {
        title: 'Dritte Leistung',
        text: 'Ein konkretes Beispiel sagt mehr als eine allgemeine Beschreibung.',
      },
      {
        title: 'Vierte Leistung',
        text: 'Vier bis acht Leistungen reichen. Mehr liest auf einer Startseite niemand.',
      },
    ],
  },
  about: {
    heading: 'Über uns',
    paragraphs: [
      'Hier erzählen Sie, wer hinter dem Betrieb steht, seit wann es ihn gibt und was Sie anders machen als andere.',
      'Ein zweiter Absatz ist Platz für Ihre Ausbildung, Ihr Team oder das, worauf Sie bei der Arbeit besonders achten.',
    ],
    facts: [
      { label: 'Gegründet', value: '2015' },
      { label: 'Team', value: '4 Personen' },
      { label: 'Sprachen', value: 'Deutsch, Englisch' },
      { label: 'Zugang', value: 'Barrierefrei' },
    ],
  },
  faq: {
    heading: 'Häufige Fragen',
    items: [
      {
        question: 'Brauche ich einen Termin?',
        answer: 'Hier steht Ihre Antwort. Die besten Fragen für diesen Bereich sind die, die Kunden am Telefon am häufigsten stellen.',
      },
      {
        question: 'Was kostet das?',
        answer: 'Nennen Sie Preise oder erklären Sie, wovon der Preis abhängt.',
      },
      {
        question: 'Wie erreiche ich Sie am besten?',
        answer: 'Schreiben Sie, ob Telefon, E-Mail oder ein Besuch der schnellste Weg ist.',
      },
    ],
  },
  contact: {
    heading: 'Kontakt und Anfahrt',
    lead: 'Am schnellsten erreichen Sie uns telefonisch während der Öffnungszeiten.',
    phoneLabel: 'Telefon',
    emailLabel: 'E-Mail',
    addressLabel: 'Adresse',
    mapLinkLabel: 'In der Karte öffnen',
  },
  legal: {
    imprint: {
      slug: 'impressum',
      title: 'Impressum',
      description: 'Impressum und Offenlegung von Musterbetrieb.',
      sections: [
        {
          heading: 'Medieninhaber und Diensteanbieter',
          paragraphs: ['TODO: Vollständigen Namen oder Firmenwortlaut, Anschrift, Telefonnummer und E-Mail-Adresse eintragen.'],
        },
        {
          heading: 'Unternehmensangaben',
          paragraphs: [
            'TODO: Unternehmensgegenstand, Firmenbuchnummer und Firmenbuchgericht, UID-Nummer, zuständige Behörde sowie Kammer oder Berufsverband eintragen, soweit vorhanden.',
          ],
        },
        {
          heading: 'Grundlegende Richtung der Website',
          paragraphs: ['TODO: Einen Satz zum Zweck der Website eintragen, etwa: Information über die Leistungen des Betriebs.'],
        },
      ],
    },
    privacy: {
      slug: 'datenschutz',
      title: 'Datenschutzerklärung',
      description: 'Informationen zur Verarbeitung personenbezogener Daten auf dieser Website.',
      sections: [
        {
          heading: 'Verantwortliche Stelle',
          paragraphs: ['TODO: Name und Kontaktdaten der für die Datenverarbeitung verantwortlichen Stelle eintragen.'],
        },
        {
          heading: 'Daten beim Besuch der Website',
          paragraphs: [
            'Diese Website setzt keine Cookies und bindet keine Inhalte von Drittanbietern ein. Schriften und Bilder werden vom eigenen Server geladen.',
            'TODO: Angaben zum Hosting-Anbieter und zu dessen Server-Protokollen ergänzen (welche Daten, wie lange, Rechtsgrundlage).',
          ],
        },
        {
          heading: 'Kontaktaufnahme',
          paragraphs: ['TODO: Beschreiben, wie Anfragen per Telefon und E-Mail verarbeitet und wie lange sie aufbewahrt werden.'],
        },
        {
          heading: 'Ihre Rechte',
          paragraphs: [
            'TODO: Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch sowie das Beschwerderecht bei der Datenschutzbehörde beschreiben und rechtlich prüfen lassen.',
          ],
        },
      ],
    },
  },
}
