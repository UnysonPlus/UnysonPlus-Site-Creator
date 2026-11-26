/* Site type: an online shop. Backed by the `shop` extension (fw_product,
   variants, stock, digital files, cart, one-page checkout through `payments`)
   — selling is shipped, not roadmap: a shop starts in catalog mode and sells
   once "Start selling online" is turned on. The `woocommerce` extension is a
   different thing: an integration for a site already running WooCommerce. */
export default {
  id: 'shop',
  label: 'Online shop',
  path: '/build/online-shop-website/',
  page: {
    title: 'Build an Online Shop on WordPress — Free',
    description:
      'Build an online shop on WordPress free: products with options and stock, a cart, checkout and payments. Describe what you sell and your AI agent builds it.',
    schemaName: 'Unyson+ Site Creator — online shops',
    howToName: 'How to build an online shop on WordPress',
    h1: 'Build an online shop on WordPress',
    lede:
      'Products with options and stock, a cart, a one-page checkout and payments into your own account. Describe what you sell and your own AI agent builds the shop on WordPress.',
    note: 'Free. No commission, and no monthly platform fee.',
  },
  prefill: {
    describe: 'An online shop selling my own products.',
    pages: 'home,about,faq,contact',
    action: 'buy',
    style: 'saas',
  },
  included: [
    ['Products with real options', 'Size, colour, material — every product has variants, and the price, SKU, stock and picture live on the variant rather than being faked with separate products.'],
    ['Stock that counts down', 'Track stock per variant, with the out-of-stock behaviour you choose. Digital products deliver a file instead.'],
    ['A cart and a one-page checkout', 'Not a form pretending to be a checkout. A real cart, a single-page checkout, delivery zones and orders with their own admin screen.'],
    ['Payments into your account', 'Checkout is paid through the Payments extension, straight to your own provider. No commission, and nothing routes through us.'],
    ['Start as a catalogue if you prefer', 'A shop can open in catalog mode, where products end in an enquiry button rather than a basket, and start selling later with one setting.'],
    ['Already on WooCommerce?', 'There is a separate WooCommerce integration, so a site that already runs WooCommerce keeps it and gets the Unyson+ builder and design system around it.'],
  ],
  faq: [
    { q: 'How do I build an online shop on WordPress?',
      a: 'Describe what you sell in the <a href="/">Site Creator</a>, pick a look, and copy the result into your AI agent. It installs Unyson+, switches on the Shop and Payments extensions and builds the catalogue, cart and checkout. You add products afterwards in the WordPress admin.' },
    { q: 'Is it free, and do you take a commission?',
      a: 'The software is free and we take no commission on anything you sell. You pay for your own hosting, your payment provider’s transaction fees, and your AI agent subscription if you use a paid one.' },
    { q: 'Can products have sizes, colours and stock?',
      a: 'Yes. Every product has at least one variant, and price, sale price, SKU, stock and picture all live on the variant — so a t-shirt in three sizes is one product, not three.' },
    { q: 'Can I sell digital downloads?',
      a: 'Yes. A product can deliver a file rather than ship, and the file is attached to the variant.' },
    { q: 'Do I have to sell straight away?',
      a: 'No. A shop can start in catalog mode, where each product ends in an enquiry button instead of a basket. You turn selling on later under Shop → Settings.' },
    { q: 'What if I already use WooCommerce?',
      a: 'Keep it. The WooCommerce integration is a separate extension that wraps an existing WooCommerce store in the Unyson+ builder and design system rather than replacing it.' },
  ],
  related: [
    ['/', 'Build any kind of site from a description'],
    ['/build/membership-website/', 'Or sell access instead of products'],
    ['/design-presets/saas/', 'See the Minimalist Modern style as a full page'],
  ],
};
