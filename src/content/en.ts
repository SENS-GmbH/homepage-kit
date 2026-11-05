import type { SiteContent } from './types'

// Placeholder texts of the template. They describe what belongs in each spot.
// The agent replaces all of them during onboarding.
export const en: SiteContent = {
  languageName: 'English',
  meta: {
    title: 'Musterbetrieb | Your offer in Vienna',
    description:
      'Musterbetrieb in 1010 Vienna. One sentence on what you offer and who it is for. Call 01 000 00 00.',
  },
  ui: {
    skipLink: 'Skip to content',
    demoNotice: 'Example content from the template. These details are invented and not meant for publication yet.',
    mainNavLabel: 'Main navigation',
    languageSwitchLabel: 'Choose language',
    legalNavLabel: 'Legal',
    today: 'Today',
    closed: 'closed',
    notFoundTitle: 'This page does not exist',
    notFoundText: 'The address is misspelled or the page has moved.',
    backHome: 'Go to the home page',
  },
  nav: {
    services: 'Services',
    about: 'About',
    faq: 'Questions',
    contact: 'Contact',
  },
  notice: '',
  hero: {
    eyebrow: 'Your trade · Your town',
    headline: 'What you offer, in one sentence.',
    lead: 'Two sentences on who your business is for and what sets it apart. The agent replaces this text with your own in the first conversation.',
    callLabel: 'Call',
    bookingLabel: 'Book an appointment online',
    directionsLabel: 'Get directions',
  },
  hours: {
    heading: 'Opening hours',
    days: {
      mo: 'Monday',
      tu: 'Tuesday',
      we: 'Wednesday',
      th: 'Thursday',
      fr: 'Friday',
      sa: 'Saturday',
      su: 'Sunday',
    },
    note: 'Appointments outside these hours by arrangement.',
  },
  services: {
    heading: 'Services',
    intro: 'The main services of your business, each with one sentence on what customers get out of it.',
    items: [
      {
        title: 'First service',
        text: 'Describe in one sentence what customers get with this service.',
      },
      {
        title: 'Second service',
        text: 'Name the result, not the process. Visitors read the result first.',
      },
      {
        title: 'Third service',
        text: 'A concrete example says more than a general description.',
      },
      {
        title: 'Fourth service',
        text: 'Four to eight services are enough. Nobody reads more on a home page.',
      },
    ],
  },
  about: {
    heading: 'About us',
    paragraphs: [
      'Tell visitors who is behind the business, how long it has existed and what you do differently from others.',
      'A second paragraph has room for your training, your team or what you pay particular attention to in your work.',
    ],
    facts: [
      { label: 'Founded', value: '2015' },
      { label: 'Team', value: '4 people' },
      { label: 'Languages', value: 'German, English' },
      { label: 'Access', value: 'Step-free' },
    ],
  },
  faq: {
    heading: 'Common questions',
    items: [
      {
        question: 'Do I need an appointment?',
        answer: 'Your answer goes here. The best questions for this section are the ones customers ask most often on the phone.',
      },
      {
        question: 'What does it cost?',
        answer: 'State prices or explain what the price depends on.',
      },
      {
        question: 'What is the best way to reach you?',
        answer: 'Say whether phone, email or a visit is the fastest way.',
      },
    ],
  },
  contact: {
    heading: 'Contact and directions',
    lead: 'The fastest way to reach us is by phone during opening hours.',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    addressLabel: 'Address',
    mapLinkLabel: 'Open in map',
  },
  legal: {
    imprint: {
      slug: 'imprint',
      title: 'Imprint',
      description: 'Imprint and legal disclosure of Musterbetrieb.',
      sections: [
        {
          heading: 'Media owner and service provider',
          paragraphs: ['TODO: Add the full name or company name, address, phone number and email address.'],
        },
        {
          heading: 'Company details',
          paragraphs: [
            'TODO: Add the business purpose, commercial register number and register court, VAT number, competent authority and chamber or professional association, where applicable.',
          ],
        },
        {
          heading: 'Purpose of the website',
          paragraphs: ['TODO: Add one sentence on the purpose of the website, for example: information about the services of the business.'],
        },
      ],
    },
    privacy: {
      slug: 'privacy',
      title: 'Privacy policy',
      description: 'How personal data is processed on this website.',
      sections: [
        {
          heading: 'Controller',
          paragraphs: ['TODO: Add the name and contact details of the party responsible for data processing.'],
        },
        {
          heading: 'Data when you visit the website',
          paragraphs: [
            'This website sets no cookies and embeds no third-party content. Fonts and images load from our own server.',
            'TODO: Add details of the hosting provider and its server logs (which data, how long, legal basis).',
          ],
        },
        {
          heading: 'Contacting us',
          paragraphs: ['TODO: Describe how phone and email enquiries are processed and how long they are kept.'],
        },
        {
          heading: 'Your rights',
          paragraphs: [
            'TODO: Describe the rights of access, rectification, erasure, restriction, data portability and objection and the right to complain to the data protection authority, and have the text checked by a lawyer.',
          ],
        },
      ],
    },
  },
}
