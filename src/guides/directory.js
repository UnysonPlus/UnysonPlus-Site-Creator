/* Site type: a directory or listing site. Backed by `post-types` (no-code
   custom post types and taxonomies, registered with plain register_post_type)
   and `custom-fields` (an ACF-style no-code field builder, values stored in
   the post's framework options and read with fw_get_field). No third-party
   directory plugin involved. */
export default {
  id: 'directory',
  label: 'Directory website',
  path: '/build/directory-website/',
  page: {
    title: 'Build a Directory Website on WordPress — Free',
    description:
      'Build a directory or listing website on WordPress free: a custom listing type, your own fields, categories and search. Built by your AI agent.',
    schemaName: 'Unyson+ Site Creator — directory websites',
    howToName: 'How to build a directory website on WordPress',
    h1: 'Build a directory website on WordPress',
    lede:
      'A listing type that fits what you are actually listing, with your own fields, categories and search. Describe the directory and your own AI agent builds it on WordPress.',
    note: 'Free, and no directory plugin with a yearly licence.',
  },
  prefill: {
    describe: 'A directory of listings people can browse, filter and search.',
    pages: 'home,about,pricing,faq,contact',
    action: 'enquire',
    style: 'professional',
  },
  included: [
    ['A listing type, not forced posts', 'Members, venues, suppliers, jobs, properties — whatever you list gets its own post type with its own name, archive and URLs, registered the ordinary WordPress way.'],
    ['The fields you actually need', 'Opening hours, price band, capacity, a map pin, a phone number: build the fields with no code, and read them anywhere on the site.'],
    ['Categories and tags that fit', 'Your own taxonomies, hierarchical where it helps, so "Restaurants → Italian" works as a structure rather than a tag soup.'],
    ['Browse, filter and search', 'Archive pages that list, filter by your taxonomies, and search across the fields you chose.'],
    ['A way in for new listings', 'A submission form through the Forms extension, stored as an entry, so people can ask to be listed without you giving out logins.'],
    ['Import and export', 'Listings move in and out as a file, so starting from a spreadsheet does not mean typing two hundred entries by hand.'],
  ],
  faq: [
    { q: 'How do I build a directory website on WordPress?',
      a: 'Describe the directory in the <a href="/">Site Creator</a> and copy the result into your AI agent. It installs Unyson+, switches on the Post Types and Custom Fields extensions, and builds the listing type, its fields, the categories and the archive pages.' },
    { q: 'Do I need a directory plugin?',
      a: 'No, and that is the point. The listing type is a normal WordPress custom post type and the fields are built with the no-code Custom Fields builder, so there is no separate directory plugin with its own yearly licence or its own idea of how a listing works.' },
    { q: 'Can listings have their own fields, like hours or a price band?',
      a: 'Yes. You build the fields with no code and they are stored with the listing, readable anywhere on the site and usable in search and filters.' },
    { q: 'Can visitors filter and search the listings?',
      a: 'Yes. Archives can filter by your own categories and tags, and search across the fields you defined.' },
    { q: 'Can people submit their own listing?',
      a: 'Yes. A submission form through the Forms extension stores each request as an entry for you to approve, without handing out WordPress logins.' },
    { q: 'Can I import listings I already have?',
      a: 'Yes. Listings import and export as a file, so an existing spreadsheet is a starting point rather than a retyping job.' },
  ],
  related: [
    ['/', 'Build any kind of site from a description'],
    ['/build/booking-website/', 'Or take bookings instead of listings'],
    ['/crm/real-estate/', 'Property listings with a CRM'],
  ],
};
