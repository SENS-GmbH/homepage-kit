import type { SiteContent } from './types'

export const de: SiteContent = {
  languageName: 'Deutsch',
  meta: {
    title: 'Ordination Dr. Muster | Allgemeinmedizin in 1010 Wien',
    description:
      'Hausärztliche Ordination in der Wiener Innenstadt: Vorsorge, Akutsprechstunde, Impfungen und Hausbesuche. Termine telefonisch unter 01 000 00 00.',
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
    eyebrow: 'Allgemeinmedizin · 1010 Wien',
    headline: 'Ihre Hausärztin in der Innenstadt.',
    lead: 'Vorsorge, akute Beschwerden und laufende Betreuung für die ganze Familie. Termine vergeben wir telefonisch.',
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
    note: 'Bitte vereinbaren Sie vorab telefonisch einen Termin.',
  },
  services: {
    heading: 'Leistungen',
    intro: 'Wir sind Ihre erste Anlaufstelle bei gesundheitlichen Fragen und begleiten Sie über viele Jahre.',
    items: [
      {
        title: 'Vorsorgeuntersuchung',
        text: 'Einmal im Jahr prüfen wir Blutwerte, Herz und Kreislauf und besprechen die Ergebnisse in Ruhe mit Ihnen.',
      },
      {
        title: 'Akutsprechstunde',
        text: 'Bei Fieber, Schmerzen oder Infekten erhalten Sie nach Anruf noch am selben Tag einen Termin.',
      },
      {
        title: 'Impfungen',
        text: 'Wir prüfen Ihren Impfpass, beraten zu fälligen Auffrischungen und impfen direkt in der Ordination.',
      },
      {
        title: 'Chronische Erkrankungen',
        text: 'Bei Bluthochdruck, Diabetes oder Asthma kontrollieren wir regelmäßig Ihre Werte und passen die Behandlung an.',
      },
      {
        title: 'Hausbesuche',
        text: 'Wenn Sie die Ordination nicht aufsuchen können, kommen wir nach Vereinbarung zu Ihnen nach Hause.',
      },
      {
        title: 'Rezepte und Überweisungen',
        text: 'Dauermedikamente und Überweisungen können Sie telefonisch bestellen und am nächsten Werktag abholen.',
      },
    ],
  },
  about: {
    heading: 'Über die Ordination',
    paragraphs: [
      'Dr. Maria Muster führt die Ordination seit 2015. Nach dem Studium in Wien arbeitete sie mehrere Jahre in der Inneren Medizin eines Wiener Spitals.',
      'Uns ist wichtig, dass Sie verstehen, was wir untersuchen und warum. Deshalb planen wir für jedes Gespräch genug Zeit ein.',
    ],
    facts: [
      { label: 'Fachrichtung', value: 'Allgemeinmedizin' },
      { label: 'Kassen', value: 'Alle Kassen' },
      { label: 'Sprachen', value: 'Deutsch, Englisch' },
      { label: 'Zugang', value: 'Barrierefrei mit Lift' },
    ],
  },
  faq: {
    heading: 'Häufige Fragen',
    items: [
      {
        question: 'Brauche ich einen Termin?',
        answer: 'Ja. Bitte rufen Sie vorher an, damit wir Wartezeiten kurz halten können. Akute Fälle nehmen wir am selben Tag an.',
      },
      {
        question: 'Was muss ich zum ersten Termin mitbringen?',
        answer: 'Bringen Sie Ihre e-card, eine Liste Ihrer Medikamente und vorhandene Befunde mit.',
      },
      {
        question: 'Kann ich ein Rezept ohne Termin bekommen?',
        answer: 'Für Dauermedikamente ja. Bestellen Sie das Rezept telefonisch, es liegt am nächsten Werktag für Sie bereit.',
      },
      {
        question: 'Was tue ich außerhalb der Öffnungszeiten?',
        answer: 'Bei einem lebensbedrohlichen Notfall wählen Sie 144. Die telefonische Gesundheitsberatung erreichen Sie rund um die Uhr unter 1450.',
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
      description: 'Impressum und Offenlegung der Ordination Dr. Muster.',
      sections: [
        {
          heading: 'Medieninhaber und Diensteanbieter',
          paragraphs: [
            'TODO: Vollständiger Name, Berufsbezeichnung, Anschrift, Telefonnummer und E-Mail-Adresse des Betriebs eintragen.',
          ],
        },
        {
          heading: 'Berufsrechtliche Angaben',
          paragraphs: [
            'TODO: Kammerzugehörigkeit, Aufsichtsbehörde, Berufsbezeichnung mit verleihendem Staat und anwendbare Berufsvorschriften eintragen. Bei Gewerbebetrieben stattdessen Firmenbuchnummer, Firmenbuchgericht, UID-Nummer und Gewerbebehörde.',
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
          paragraphs: [
            'TODO: Beschreiben, wie Anfragen per Telefon und E-Mail verarbeitet und wie lange sie aufbewahrt werden. Bitte senden Sie uns keine Gesundheitsdaten per E-Mail.',
          ],
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
