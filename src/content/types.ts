import type { ImageMetadata } from 'astro'

export type Weekday = 'mo' | 'tu' | 'we' | 'th' | 'fr' | 'sa' | 'su'

/** Opening and closing time in 24-hour notation, e.g. ['08:00', '12:00']. */
export type TimeRange = [open: string, close: string]

/** Facts about the business that are the same in every language. */
export interface Business {
  /** true while the site still shows the template's example content. Blocks publishing. */
  demo: boolean
  name: string
  /** schema.org type for search engines, e.g. LocalBusiness, Physician, Dentist, Restaurant. */
  schemaType: string
  /** Phone number as people read it. */
  phone: string
  /** Phone number in international format without spaces, e.g. +4310000000. */
  phoneE164: string
  email: string
  address: {
    street: string
    postalCode: string
    city: string
    /** Two-letter country code, e.g. AT. */
    country: string
  }
  /** Link to the location in a map service. Opens in the visitor's map app. */
  mapUrl: string
  /** Link to an online booking service, or null when appointments are made by phone. */
  bookingUrl: string | null
  /** Opening hours per weekday. An empty list means closed. */
  hours: Record<Weekday, TimeRange[]>
}

export interface LegalPage {
  /** Last part of the address, e.g. 'impressum' for /impressum/. */
  slug: string
  title: string
  description: string
  sections: { heading: string; paragraphs: string[] }[]
}

/** Everything a visitor reads, in one language. */
export interface SiteContent {
  /** Name of this language in the language itself, e.g. Deutsch. */
  languageName: string
  meta: { title: string; description: string }
  ui: {
    skipLink: string
    demoNotice: string
    mainNavLabel: string
    languageSwitchLabel: string
    legalNavLabel: string
    today: string
    closed: string
    notFoundTitle: string
    notFoundText: string
    backHome: string
  }
  nav: { services: string; about: string; faq: string; contact: string }
  /** Short current notice above the headline, e.g. holiday closure and stand-in. Empty string = none. */
  notice: string
  hero: {
    eyebrow: string
    headline: string
    lead: string
    callLabel: string
    bookingLabel: string
    directionsLabel: string
  }
  hours: { heading: string; days: Record<Weekday, string>; note: string }
  services: { heading: string; intro: string; items: { title: string; text: string }[] }
  about: {
    heading: string
    paragraphs: string[]
    facts: { label: string; value: string }[]
    /** Optional photo. Import it from src/assets so it is resized automatically. */
    image?: { src: ImageMetadata; alt: string }
  }
  faq: { heading: string; items: { question: string; answer: string }[] }
  contact: {
    heading: string
    lead: string
    phoneLabel: string
    emailLabel: string
    addressLabel: string
    mapLinkLabel: string
  }
  legal: { imprint: LegalPage; privacy: LegalPage }
}
