/* A SITE-TYPE page: "how do I build a membership website on WordPress".
 *
 * Deliberately NOT a second generator. /crm/<industry> pages each carry their
 * own form; the Site Creator already asks the same six questions better, so
 * these pages explain the shape of the job and hand over to it with the form
 * already filled in (creator.js reads the query string).
 *
 * Everything claimed here is backed by a real extension: membership,
 * membership-building and payments all ship in Unyson+. Nothing on this page
 * describes a feature that does not exist. */
export default {
  id: 'membership',
  label: 'Membership website',
  path: '/build/membership-website/',
  page: {
    title: 'Build a Membership Website on WordPress — Free',
    description:
      'Build a membership website on WordPress free: paid plans, members-only content, courses, a login area and recurring payments. Your AI agent builds it.',
    schemaName: 'Unyson+ Site Creator — membership websites',
    howToName: 'How to build a membership website on WordPress',
    h1: 'Build a membership website on WordPress',
    lede:
      'Paid plans, content only members can reach, a login area and payments that repeat. Describe the business and your own AI agent builds it on WordPress, with the membership tools already switched on.',
    note: 'Free. No monthly platform fee, and the site is yours.',
  },

  /* The CTA deep-links into the Creator with the form already shaped. */
  prefill: {
    describe: 'A membership site that sells access to content and courses.',
    pages: 'home,about,pricing,faq,contact',
    action: 'signup',
    style: 'saas',
  },

  /* What the build actually gives you, each tied to the extension that does it. */
  included: [
    ['Plans people pay for', 'Free, one-off and recurring plans, with the price, the billing period and what each one unlocks. Set up in the Membership extension, not in code.'],
    ['Content only members see', 'Lock a page, a post type, a category or a single section. Everyone else sees whatever you choose instead — a teaser, a price, or the sign-up form.'],
    ['Courses and lessons', 'Group lessons into a course, release them on a schedule or all at once, and track who has finished what.'],
    ['A real account area', 'Sign up, log in, reset a password, see the plan, change a card, cancel. Built from the membership elements rather than a plugin’s own styling.'],
    ['Payments that repeat', 'Take the first payment and the renewals through the Payments extension. The money goes to your account; nothing routes through us.'],
    ['Everything a normal site has', 'It is still an ordinary WordPress site: a page builder, a design system, SEO, forms and a blog. The membership part is an extension, not a cage.'],
  ],

  /* Question-shaped, because that is what an AI answer quotes. */
  faq: [
    { q: 'How do I build a membership website on WordPress?',
      a: 'Describe the business in the <a href="/">Site Creator</a>, choose the pages and the look, and copy the result into your AI agent. It installs Unyson+, switches on the Membership and Payments extensions, and builds the plans, the locked content and the account area. You edit everything afterwards in the WordPress admin.' },
    { q: 'Can I build a membership site for free?',
      a: 'The software is free: Unyson+, the Membership extension and the Site Creator cost nothing and there is no monthly platform fee. You pay for your own hosting, your payment provider’s transaction fees, and your AI agent subscription if you use a paid one.' },
    { q: 'Does it do recurring payments and subscriptions?',
      a: 'Yes. Plans can be one-off or recurring, with the billing period you choose, handled by the Payments extension. Payments go to your own account.' },
    { q: 'Can I sell online courses on it?',
      a: 'Yes. Lessons group into a course, you can release them on a schedule or all at once, and progress is tracked per member. A course can be tied to a plan so only paying members reach it.' },
    { q: 'Can I lock only part of a page?',
      a: 'Yes. You can lock a whole page or a single section inside one, and choose what everyone else sees in its place — a teaser, the price, or the sign-up form.' },
    { q: 'Do I need to know how to code?',
      a: 'No. The agent does the building, and afterwards the site is edited with a visual page builder in the WordPress admin.' },
  ],

  /* Related pages, so each of these is not a dead end. */
  related: [
    ['/', 'Build any kind of site from a description'],
    ['/crm/', 'CRM websites by industry'],
    ['/design-presets/saas/', 'See the Minimalist Modern style as a full page'],
  ],
};
