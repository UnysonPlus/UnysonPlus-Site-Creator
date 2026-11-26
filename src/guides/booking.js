/* Site type: a booking website. Backed by the `bookings` extension —
   reservations for rooms, rentals, tables and appointments, with the booking
   field and action coming from `forms`. The doc is explicit that bookables,
   the admin and REST availability work even without Forms, so the Forms
   dependency is described as "works best with", not "required". */
export default {
  id: 'booking',
  label: 'Booking website',
  path: '/build/booking-website/',
  page: {
    title: 'Build a Booking Website on WordPress — Free',
    description:
      'Build a booking website on WordPress free: availability, a booking form and reservations for rooms, rentals, tables or appointments. Your AI agent builds it.',
    schemaName: 'Unyson+ Site Creator — booking websites',
    howToName: 'How to build a booking website on WordPress',
    h1: 'Build a booking website on WordPress',
    lede:
      'Take reservations for rooms, rentals, tables or appointments, with real availability behind them. Describe the business and your own AI agent builds it on WordPress.',
    note: 'Free. No per-booking fee, and the bookings are yours.',
  },
  prefill: {
    describe: 'A site that takes bookings, with availability and a booking form.',
    pages: 'home,about,services,pricing,faq,contact',
    action: 'book',
    style: 'professional',
  },
  included: [
    ['Whatever you actually book out', 'Rooms, rentals, tables or appointments — the bookable is yours to define, rather than being forced into somebody else’s idea of a slot.'],
    ['Availability that is checked', 'Availability is held on the site and queried over REST, so a date that is gone stops being offered instead of being taken twice.'],
    ['A booking form, not a contact form', 'The booking field and action come from the Forms extension, so a reservation arrives as a booking with its dates, not as an email you have to re-key.'],
    ['Every request kept', 'Each booking is stored as an entry in the admin as well as emailed, so nothing is lost to a spam folder.'],
    ['Pages that answer first', 'Services, prices and an FAQ built alongside, because most booking sites lose people to an unanswered question rather than a missing button.'],
    ['Your own notifications', 'Confirmations go out through the Mailer extension with your own sender and SMTP, not a third party’s.'],
  ],
  faq: [
    { q: 'How do I build a booking website on WordPress?',
      a: 'Describe the business in the <a href="/">Site Creator</a>, choose the pages and the look, and copy the result into your AI agent. It installs Unyson+, switches on the Bookings and Forms extensions and builds the bookables, the availability and the booking form.' },
    { q: 'What can it take bookings for?',
      a: 'Rooms, rentals, tables and appointments. You define the bookable, so a treatment room, a holiday let, a restaurant table and a one-hour consultation are all the same mechanism.' },
    { q: 'Does it stop double bookings?',
      a: 'Availability is held on the site and checked over the REST API, so a date or slot that has gone is no longer offered.' },
    { q: 'Is there a fee per booking?',
      a: 'No. The software is free and takes nothing per booking. You pay for your own hosting and, if you take payment, your payment provider’s fees.' },
    { q: 'Where do the bookings go?',
      a: 'Each one is stored as an entry in the WordPress admin and emailed to you through the Mailer extension using your own sender address.' },
    { q: 'Do I need to know how to code?',
      a: 'No. The agent builds it, and bookables, availability and prices are edited in the WordPress admin afterwards.' },
  ],
  related: [
    ['/', 'Build any kind of site from a description'],
    ['/crm/', 'Or an industry CRM website'],
    ['/design-presets/professional/', 'See the Professional style as a full page'],
  ],
};
