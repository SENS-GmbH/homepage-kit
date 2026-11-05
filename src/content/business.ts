import type { Business } from './types'

// Example data of an invented business. Replace every value during onboarding,
// then set demo to false.
export const business: Business = {
  demo: true,
  name: 'Musterbetrieb',
  schemaType: 'LocalBusiness',
  phone: '01 000 00 00',
  phoneE164: '+4310000000',
  email: 'kontakt@example.at',
  address: {
    street: 'Beispielgasse 1',
    postalCode: '1010',
    city: 'Wien',
    country: 'AT',
  },
  mapUrl: 'https://www.openstreetmap.org/search?query=Beispielgasse%201%2C%201010%20Wien',
  bookingUrl: null,
  hours: {
    mo: [
      ['09:00', '12:00'],
      ['13:00', '17:00'],
    ],
    tu: [
      ['09:00', '12:00'],
      ['13:00', '17:00'],
    ],
    we: [
      ['09:00', '12:00'],
      ['13:00', '17:00'],
    ],
    th: [
      ['09:00', '12:00'],
      ['13:00', '17:00'],
    ],
    fr: [['09:00', '12:00']],
    sa: [],
    su: [],
  },
}
