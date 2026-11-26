/* Site type: a one-page website. The only one of the six that needs no extra
   extension — it is the page builder, the design system and a form. Said
   plainly on the page rather than dressed up, because the honest selling point
   is that there is nothing to install. */
export default {
  id: 'one-page',
  label: 'One-page website',
  path: '/build/one-page-website/',
  page: {
    title: 'Build a One-Page Website on WordPress — Free',
    description:
      'Build a one-page website on WordPress free: one scrolling page with anchor navigation, a contact form and a design system you can edit. Built by your agent.',
    schemaName: 'Unyson+ Site Creator — one-page websites',
    howToName: 'How to build a one-page website on WordPress',
    h1: 'Build a one-page website on WordPress',
    lede:
      'Everything on one scrolling page, with navigation that jumps to each section and a form at the end. Describe the business and your own AI agent builds it on WordPress.',
    note: 'Free, and the quickest of these to get live.',
  },
  prefill: {
    describe: 'A one-page site: everything on a single scrolling page.',
    pages: 'home,contact',
    action: 'enquire',
    style: 'saas',
  },
  included: [
    ['One page, real sections', 'Hero, what you do, proof, prices, FAQ, contact — each a proper section in the page builder, not one long block of text you cannot rearrange.'],
    ['Navigation that goes to the section', 'The menu scrolls to an anchor instead of loading a new page, and the current section can be marked as you pass it.'],
    ['A form at the end', 'The whole page is pointed at one action, with an enquiry form through the Forms extension and every submission stored as an entry.'],
    ['Nothing extra to install', 'This is the one site type here that needs no additional extension. The page builder, the design system and Forms are all you need.'],
    ['Easy to grow later', 'If one page stops being enough, the sections are already real builder content — move any of them onto a new page without rebuilding.'],
    ['Motion where it helps', 'Sections can arrive as you scroll, through the Animation Engine, at whatever level of restraint the style you chose allows.'],
  ],
  faq: [
    { q: 'How do I build a one-page website on WordPress?',
      a: 'Describe the business in the <a href="/">Site Creator</a>, pick a look, and copy the result into your AI agent. It installs Unyson+ and builds a single page with the sections, the anchor navigation and the contact form.' },
    { q: 'Is a one-page site bad for SEO?',
      a: 'It is a trade-off, not a mistake. One page can only rank well for one cluster of terms, so a one-page site suits a business with a single clear offer. If you need to rank for several different things, a few real pages will beat one long one — and because the sections are builder content, you can split them out later without rebuilding.' },
    { q: 'Can I add more pages later?',
      a: 'Yes. Every section is ordinary page-builder content, so moving one onto its own page is a copy, not a rebuild.' },
    { q: 'Does the menu scroll to the section?',
      a: 'Yes. Menu items point at anchors and scroll to the section rather than loading a new page.' },
    { q: 'Is it really free?',
      a: 'Yes. Unyson+, the builder and the Site Creator are free with no monthly platform fee. You pay for hosting and a domain, and your AI agent subscription if you use a paid one.' },
    { q: 'Do I need to know how to code?',
      a: 'No. The agent builds it and you edit the sections afterwards in the WordPress admin.' },
  ],
  related: [
    ['/', 'Build any kind of site from a description'],
    ['/build/portfolio-website/', 'Or a portfolio with a page per project'],
    ['/design-presets/', 'Browse the design styles'],
  ],
};
