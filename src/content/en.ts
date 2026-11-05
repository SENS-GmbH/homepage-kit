import type { SiteContent } from './types'

export const en: SiteContent = {
  languageName: 'English',
  meta: {
    title: 'Dr. Muster | General Practice in Vienna’s 1st District',
    description:
      'General practice in central Vienna: check-ups, same-day appointments, vaccinations and home visits. Call 01 000 00 00 for an appointment.',
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
    eyebrow: 'General practice · 1010 Vienna',
    headline: 'Your family doctor in the city centre.',
    lead: 'Check-ups, acute complaints and ongoing care for the whole family. We arrange appointments by phone.',
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
    note: 'Please call ahead to arrange an appointment.',
  },
  services: {
    heading: 'Services',
    intro: 'We are your first point of contact for health questions and look after you over many years.',
    items: [
      {
        title: 'Health check-up',
        text: 'Once a year we check your blood values, heart and circulation and take time to discuss the results with you.',
      },
      {
        title: 'Same-day appointments',
        text: 'If you have a fever, pain or an infection, call us and we will see you the same day.',
      },
      {
        title: 'Vaccinations',
        text: 'We review your vaccination record, advise you on boosters that are due and vaccinate in the practice.',
      },
      {
        title: 'Chronic conditions',
        text: 'For high blood pressure, diabetes or asthma we check your values regularly and adjust the treatment.',
      },
      {
        title: 'Home visits',
        text: 'If you cannot come to the practice, we visit you at home by arrangement.',
      },
      {
        title: 'Prescriptions and referrals',
        text: 'Order repeat prescriptions and referrals by phone and collect them on the next working day.',
      },
    ],
  },
  about: {
    heading: 'About the practice',
    paragraphs: [
      'Dr. Maria Muster has run the practice since 2015. After studying in Vienna she worked for several years in internal medicine at a Vienna hospital.',
      'We want you to understand what we examine and why. That is why we plan enough time for every conversation.',
    ],
    facts: [
      { label: 'Specialty', value: 'General medicine' },
      { label: 'Insurance', value: 'All public insurers' },
      { label: 'Languages', value: 'German, English' },
      { label: 'Access', value: 'Step-free with lift' },
    ],
  },
  faq: {
    heading: 'Common questions',
    items: [
      {
        question: 'Do I need an appointment?',
        answer: 'Yes. Please call first so that we can keep waiting times short. We see acute cases the same day.',
      },
      {
        question: 'What should I bring to my first appointment?',
        answer: 'Bring your e-card, a list of your medication and any existing medical reports.',
      },
      {
        question: 'Can I get a prescription without an appointment?',
        answer: 'For repeat medication, yes. Order the prescription by phone and collect it on the next working day.',
      },
      {
        question: 'What do I do outside opening hours?',
        answer: 'In a life-threatening emergency call 144. The health advice line is available around the clock on 1450.',
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
      description: 'Imprint and legal disclosure of Dr. Muster’s practice.',
      sections: [
        {
          heading: 'Media owner and service provider',
          paragraphs: ['TODO: Add the full name, professional title, address, phone number and email address of the business.'],
        },
        {
          heading: 'Professional information',
          paragraphs: [
            'TODO: Add chamber membership, supervisory authority, professional title with the awarding country and the applicable professional rules. For trade businesses add the commercial register number, register court, VAT number and trade authority instead.',
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
          paragraphs: [
            'TODO: Describe how phone and email enquiries are processed and how long they are kept. Please do not send us health data by email.',
          ],
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
