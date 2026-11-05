import type { Business } from './types'

// Example data of an invented practice. Replace every value during onboarding,
// then set demo to false.
export const business: Business = {
  demo: true,
  name: 'Ordination Dr. Muster',
  schemaType: 'Physician',
  phone: '01 000 00 00',
  phoneE164: '+4310000000',
  email: 'ordination@example.at',
  address: {
    street: 'Beispielgasse 1/2',
    postalCode: '1010',
    city: 'Wien',
    country: 'AT',
  },
  mapUrl: 'https://www.openstreetmap.org/search?query=Beispielgasse%201%2C%201010%20Wien',
  bookingUrl: null,
  hours: {
    mo: [['08:00', '12:00']],
    tu: [['14:00', '18:00']],
    we: [['08:00', '12:00']],
    th: [['14:00', '18:00']],
    fr: [['08:00', '12:00']],
    sa: [],
    su: [],
  },
}
