/* Site type: a portfolio website. Backed by the `portfolio` extension —
   the fw-portfolio post type, per-project galleries, details meta, archive
   templates and seven builder elements. Nothing claimed here is roadmap. */
export default {
  id: 'portfolio',
  label: 'Portfolio website',
  path: '/build/portfolio-website/',
  page: {
    title: 'Build a Portfolio Website on WordPress — Free',
    description:
      'Build a portfolio website on WordPress free: project pages, galleries, categories and a contact form. Describe your work and your AI agent builds it.',
    schemaName: 'Unyson+ Site Creator — portfolio websites',
    howToName: 'How to build a portfolio website on WordPress',
    h1: 'Build a portfolio website on WordPress',
    lede:
      'Project pages that show the work properly, with galleries, categories and the detail a client actually asks for. Describe what you do and your own AI agent builds it on WordPress.',
    note: 'Free. The site is yours, and the work stays on your own domain.',
  },
  prefill: {
    describe: 'A portfolio site showing my work, with a page per project.',
    pages: 'home,about,work,contact',
    action: 'enquire',
    style: 'monochrome',
  },
  included: [
    ['A page per project', 'Each project is its own page with a gallery, a description and the details that matter — client, role, year, services. Not a grid of images with no context.'],
    ['Galleries that are not an afterthought', 'Per-project galleries with the layout and ratio you choose, so a landscape shoot and a tall poster both look deliberate.'],
    ['Categories people can filter', 'Group work by discipline, client type or year, and let visitors narrow it down instead of scrolling past what they do not need.'],
    ['Results, not just pictures', 'Single-project blocks for the brief, the outcome and a client quote. The part that turns a nice gallery into a reason to hire you.'],
    ['Related work at the end', 'Previous and next project, plus related ones, so somebody who likes one piece sees three more instead of leaving.'],
    ['A contact route on every page', 'An enquiry form wired to the Forms extension, with every submission stored as an entry rather than only emailed.'],
  ],
  faq: [
    { q: 'How do I build a portfolio website on WordPress?',
      a: 'Describe your work in the <a href="/">Site Creator</a>, pick a look, and copy the result into your AI agent. It installs Unyson+, switches on the Portfolio extension and builds the project pages, the archive and the contact form. You add and edit projects afterwards in the WordPress admin.' },
    { q: 'Is it free to build a portfolio site?',
      a: 'Yes. Unyson+, the Portfolio extension and the Site Creator are free, with no monthly platform fee. You pay for your own hosting and domain, and for your AI agent subscription if you use a paid one.' },
    { q: 'Can I show case studies rather than just images?',
      a: 'Yes. Each project has blocks for the brief, the details, the results and a client testimonial alongside the gallery, so a project reads as a case study instead of a picture grid.' },
    { q: 'Can visitors filter the work by category?',
      a: 'Yes. Projects have categories and optional tags, and the archive can filter by them.' },
    { q: 'Do I own the site and the images?',
      a: 'Yes. It is an ordinary self-hosted WordPress site on your own domain and hosting. Nothing is locked to a platform and there is no account with us.' },
    { q: 'Do I need to know how to code?',
      a: 'No. The agent builds it, and you add projects afterwards through the normal WordPress admin with a visual page builder.' },
  ],
  related: [
    ['/', 'Build any kind of site from a description'],
    ['/design-presets/monochrome/', 'See the Monochrome style as a full page'],
    ['/build/one-page-website/', 'Or a one-page site'],
  ],
};
