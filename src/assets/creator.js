/* The general website generator.
 *
 * The description-first route: the person says what the business is, and this emits
 * (1) a build prompt for their AI agent and (2) a `site-spec.json` conforming to the
 * AI Dev Kit's skills/create-site/site-spec.schema.json with `source: "brief"`.
 *
 * It is deliberately NOT built on the CRM generator's engine. That engine's state is
 * pipeline-shaped - stages, blueprints, extra fields, also-install - and a brief shares
 * almost none of it; folding this in would mean a preset that ignores most of the engine
 * and an engine that grows branches for a second product. The two share the output panel's
 * markup and CSS instead, which is the part that actually is the same.
 *
 * The six questions come from the kit's own intake (skills/create-site/inputs/brief.md):
 * the business, the pages, the style, the one action, real content, where it is built.
 *
 * THE RULE THIS FILE EXISTS TO ENFORCE: anything the person does not tell us goes into
 * `missing[]` rather than being filled in with something plausible. The schema calls that
 * "THE MOST IMPORTANT FIELD", and the build reads it as "do not invent these".
 */
(function () {
  'use strict';

  var form = document.getElementById('cform');
  if (!form) return;

  var STYLES = window.UPWSTYLES || [];
  var KEY = 'upw-creator-v1';

  /* Where the agent gets its instructions and the software. The CRM engine has
     emitted these since the start; the Creator used to say only "follow the
     create-site skill in the Unyson+ AI Dev Kit" without ever saying where the
     kit is — so an agent that had never seen it had nothing to act on. */
  var KIT_URL = 'https://github.com/UnysonPlus/UnysonPlus-AI-Dev-Kit';
  var PLUGIN_ZIP = 'https://github.com/UnysonPlus/UnysonPlus/releases/latest/download/unysonplus.zip';
  var THEME_REPO = 'https://github.com/UnysonPlus/UnysonPlus-Theme';

  /* ---------- small helpers (same vocabulary as the CRM engine) ---------- */
  function slug(s) {
    return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  function lines(s) {
    return String(s || '').split(/\r?\n/).map(function (l) { return l.trim(); }).filter(Boolean);
  }
  function val(name) {
    var el = form.elements[name];
    return el ? String(el.value || '').trim() : '';
  }
  function checked(name) {
    return Array.prototype.map.call(
      form.querySelectorAll('input[name="' + name + '"]:checked'),
      function (i) { return i.value; }
    );
  }
  function radio(name) {
    var el = form.querySelector('input[name="' + name + '"]:checked');
    return el ? el.value : '';
  }
  function styleBy(id) {
    for (var i = 0; i < STYLES.length; i++) if (STYLES[i].slug === id) return STYLES[i];
    return null;
  }

  /* ---------- the page catalogue ----------
     Each entry carries the SHAPE the schema knows about and a default purpose. The purpose
     is a sentence about what the page is for, not about this business - the agent writes the
     copy, and a purpose that asserted facts would be inventing them here instead. */
  var PAGES = {
    home:      { title: 'Home',      shape: 'home',     purpose: 'The front page: what the business does, who it is for, and the one action.' },
    about:     { title: 'About',     shape: 'about',    purpose: 'Who is behind the business and why someone should trust it.' },
    services:  { title: 'Services',  shape: 'services', purpose: 'What is offered, as a list that can grow, each item with its own detail.' },
    work:      { title: 'Work',      shape: 'custom',   purpose: 'Examples of past work, as a gallery or case studies.' },
    pricing:   { title: 'Pricing',   shape: 'pricing',  purpose: 'What it costs, in tiers or from-prices, with one clear next step.' },
    blog:      { title: 'Blog',      shape: 'custom',   purpose: 'An article index, for search and for saying something regularly.' },
    faq:       { title: 'FAQ',       shape: 'custom',   purpose: 'The questions that come up before someone gets in touch.' },
    contact:   { title: 'Contact',   shape: 'contact',  purpose: 'How to reach the business, with the form that captures an enquiry.' }
  };

  var ACTIONS = {
    book:     { label: 'Book an appointment', cta: 'Book now',      form: 'booking' },
    call:     { label: 'Call',                cta: 'Call us',       form: null },
    enquire:  { label: 'Send an enquiry',     cta: 'Get in touch',  form: 'contact' },
    quote:    { label: 'Request a quote',     cta: 'Get a quote',   form: 'quote' },
    buy:      { label: 'Buy online',          cta: 'Shop now',      form: null },
    signup:   { label: 'Sign up or subscribe', cta: 'Get started',  form: 'newsletter' },
    download: { label: 'Download something',  cta: 'Download',      form: 'contact' }
  };

  /* ---------- read the form into a flat state ---------- */
  function readState() {
    return {
      name: val('name'),
      describe: val('describe'),
      market: val('market'),
      type: val('type'),
      phone: val('phone'),
      email: val('email'),
      pages: checked('pages'),
      extraPages: lines(val('extraPages')),
      style: val('style'),
      styleNotes: val('styleNotes'),
      action: radio('action'),
      has: checked('has'),
      target: val('target'),
      agent: val('agent'),
      publish: radio('publish') || 'draft'
    };
  }

  /* ---------- state -> site spec ----------
     Every empty answer becomes a missing[] id rather than a guess. */
  function toSpec(s) {
    var missing = [];
    function orNull(v, id) { if (v) return v; missing.push(id); return null; }

    var picked = s.pages.slice();
    if (picked.indexOf('home') === -1) picked.unshift('home');

    var pages = picked.map(function (k) {
      var p = PAGES[k];
      return { slug: k === 'home' ? '' : k, title: p.title, purpose: p.purpose, shape: p.shape, sections: null };
    }).concat(s.extraPages.map(function (t) {
      return { slug: slug(t), title: t, purpose: 'A page the person asked for by name; ask what it is for before building it.', shape: 'custom', sections: null };
    }));

    var st = styleBy(s.style);
    var has = s.has;

    /* proof[] carries ONLY what was actually supplied, and nothing is supplied through a
       form like this one - at most the person tells us such material exists. So the arrays
       stay empty either way and the distinction goes into missing[]:
         not ticked -> `proof.testimonials`         none exist; build no proof band
         ticked     -> `proof.testimonials.content` they exist; collect them before building
       The schema is blunt about why: "an invented testimonial is not a placeholder, it is a
       fabricated claim about a real business." */
    function proofGap(k, id) { missing.push(has.indexOf(k) !== -1 ? id + '.content' : id); }
    proofGap('testimonials', 'proof.testimonials');
    proofGap('numbers', 'proof.metrics');

    var spec = {
      spec_version: 1,
      source: 'brief',
      vertical: null,
      business: {
        name: s.name || '[Business name]',
        type: s.type || null,
        tagline: null,
        market: orNull(s.market, 'business.market'),
        language: 'en',
        phone: orNull(s.phone, 'business.phone'),
        email: orNull(s.email, 'business.email'),
        address: null,
        hours: null
      },
      pages: pages,
      brand: {
        /* An unpicked style used to fall through to 'monochrome', which asserted a decision
           nobody made - the same fabrication missing[] exists to prevent, just quieter because
           it was always the same answer. Unpicked now says so, and the prompt asks. */
        style: s.style === 'custom' ? 'custom' : (s.style || 'unset'),
        style_notes: s.style === 'custom' ? (s.styleNotes || null) : (st ? st.blurb : null),
        primary: null,
        accent: null,
        logo: has.indexOf('logo') !== -1 ? 'supplied' : 'text'
      },
      primary_action: s.action || 'enquire',
      proof: { testimonials: [], logos: [], metrics: [] },
      seo: {
        title_pattern: s.name ? '%page% | ' + s.name : null,
        description: s.describe || null,
        schema_type: 'LocalBusiness',
        local: !!s.market
      },
      content: null,
      build: {
        target: s.target || '[the WordPress install]',
        publish: s.publish,
        extensions: extensionsFor(s),
        theme: 'unysonplus-theme'
      },
      missing: missing
    };

    if (!s.style) missing.push('brand.style');
    if (!s.name) missing.unshift('business.name');
    if (!s.describe) missing.push('business.description');
    if (!s.target) missing.push('build.target');
    if (has.indexOf('copy') === -1) missing.push('content.copy');
    if (has.indexOf('photos') === -1) missing.push('content.photos');

    return spec;
  }

  function extensionsFor(s) {
    var ext = ['page-builder', 'shortcodes'];
    var a = ACTIONS[s.action];
    if (a && a.form) ext.push('forms');
    if (s.pages.indexOf('blog') !== -1) ext.push('blog');
    if (s.pages.indexOf('work') !== -1) ext.push('portfolio');
    if (s.action === 'buy') ext.push('woocommerce');
    ext.push('seo');
    return ext;
  }

  /* ---------- state -> prompt ---------- */
  /* ---------- the setup the agent needs before it can build anything ----------
     Branches on the chosen agent, because the two cases are genuinely different:
     a coding agent can clone the kit and install the software, while the Claude
     app reaches the site only through the connector and has no local files at
     all. Both end with the same instruction: if you cannot reach the reference,
     stop and say so — a silent fall back to general WordPress knowledge produces
     something that looks like a site and follows none of the rules. */
  function setupSteps(s, spec) {
    var out = [];
    var exts = spec.build.extensions.join(', ');
    var target = s.target || '[the WordPress install]';
    out.push('## Before you build');

    if (s.agent === 'claude-app') {
      out.push('You are working through the **Unyson+ connector** in the Claude app, so you have');
      out.push('the site\'s own tools and no local files.');
      out.push('');
      out.push('1. **The AI Dev Kit is not reachable this way.** Use the connector\'s `build_docs`');
      out.push('   tool for element, option and Theme Settings reference, and call `describe_element`');
      out.push('   before placing any element — unknown option ids are rejected.');
      out.push('   **If neither tool answers, say so and stop. Do not build from general WordPress');
      out.push('   knowledge:** the result would look like a site and follow none of the rules.');
      out.push('2. Unyson+ must already be installed on ' + target + ' and connected');
      out.push('   (**Unyson+ → Connect AI → Set up this site for an AI app**). If the connector does');
      out.push('   not respond, stop and tell me rather than guessing.');
      out.push('3. Check **Settings → Permalinks** is "Post name", then load an inner page. On a');
      out.push('   subfolder install WordPress does not always write `.htaccess`, and the symptom is');
      out.push('   distinctive: the home page works and every other page 404s.');
      out.push('4. Activate these extensions with `manage_extension`, or ask me to: ' + exts + '.');
      out.push('   Forms must be active before any form is built.');
    } else {
      out.push('1. **Get the AI Dev Kit**: clone ' + KIT_URL + '. Read `AGENTS.md`');
      out.push('   first, then `skills/create-site/SKILL.md` and its `build-rules.md`. Look up every');
      out.push('   element, extension and option in the kit\'s `docs/` folder before using it.');
      out.push('   **If you cannot read the kit, say so and stop. Do not build from general WordPress');
      out.push('   knowledge:** the result would look like a site and follow none of the rules.');
      out.push('2. Set **Settings → Permalinks** to "Post name", then load an inner page. On a');
      out.push('   subfolder install WordPress does not always write `.htaccess`, and the symptom is');
      out.push('   distinctive: the home page works and every other page 404s.');
      out.push('3. Install the Unyson+ plugin from ' + PLUGIN_ZIP + '.');
      out.push('   That zip is the core only; the features below come from the Extensions manager.');
      out.push('4. Install the parent theme: from ' + THEME_REPO + '/releases/latest');
      out.push('   download the source zip and rename the extracted folder to `unysonplus-theme`.');
      out.push('   Copy the kit\'s `samples/sample-child-theme` as this site\'s child theme, rename it');
      out.push('   for the business, and activate it.');
      out.push('5. In **Unyson+ → Extensions**, download and then activate: ' + exts + '.');
      out.push('   Some are under "Show other extensions". Forms must be active before any form is built.');
    }
    out.push('');
    return out;
  }

  function toPrompt(s, spec) {
    var a = ACTIONS[s.action] || ACTIONS.enquire;
    var st = styleBy(s.style);
    var out = [];

    out.push('Build a WordPress website with Unyson+.');
    out.push('');
    setupSteps(s, spec).forEach(function (l) { out.push(l); });
    out.push('## The business');
    out.push('- Name: ' + (s.name || '[tell the agent the business name]'));
    out.push('- What it does: ' + (s.describe || '[describe the business]'));
    if (s.market) out.push('- Where: ' + s.market);
    if (s.type) out.push('- Size: ' + s.type);
    if (s.phone) out.push('- Phone: ' + s.phone);
    if (s.email) out.push('- Email: ' + s.email);
    out.push('');

    out.push('## The pages');
    spec.pages.forEach(function (p) {
      out.push('- **' + p.title + '** (`/' + p.slug + '`) — ' + p.purpose);
    });
    out.push('');
    out.push('Propose the sections for each page before building, and say which archetypes you are using.');
    out.push('');

    out.push('## The look');
    if (!s.style) {
      out.push('- No style chosen yet. Propose two from the library that suit the business,');
      out.push('  one line each on what they would cost, and wait for an answer before building.');
      out.push('- The library is in the kit at `docs/site-creator/styles/prompts/`, and every one');
      out.push('  of the thirty has a rendered page under https://create.unysonplus.com/design-presets/');
    } else if (s.style === 'custom') {
      out.push('- Style: described below, not one of the library presets.');
      out.push('- ' + (s.styleNotes || '[describe the look you want]'));
    } else if (st) {
      out.push('- Style: **' + st.label + '** (`' + st.slug + '`) — ' + st.blurb);
      out.push('- Apply it through Theme Settings and presets, not as CSS on each element.');
      out.push('- The brief for it is in the kit at `docs/site-creator/styles/prompts/' + st.slug + '.md`,');
      out.push('  and there is a rendered page at https://create.unysonplus.com/design-presets/' + st.slug + '/');
    }
    out.push('');

    out.push('## The one action');
    out.push('- A visitor should: **' + a.label.toLowerCase() + '**. Every call to action points there.');
    out.push('- Header button and primary CTA: "' + a.cta + '".');
    if (a.form) out.push('- Build a ' + a.form + ' form with the Forms extension; store every submission as an entry, not only an email.');
    out.push('');

    out.push('## What I already have');
    var hasLabels = { copy: 'written copy', photos: 'photographs', logo: 'a logo', testimonials: 'testimonials', numbers: 'real numbers or results' };
    var hasList = s.has.map(function (k) { return hasLabels[k]; }).filter(Boolean);
    out.push(hasList.length ? '- ' + hasList.join(', ') + '. Ask me for these before writing placeholders.' : '- Nothing yet.');
    out.push('');

    out.push('## Build');
    out.push('- Target install: ' + (s.target || '[which WordPress install]'));
    out.push('- Publish state: ' + s.publish + (s.publish === 'draft' ? ' — do not publish until I say so.' : ''));
    out.push('- Extensions to activate: ' + spec.build.extensions.join(', ') + '.');
    out.push('');

    out.push('## Do not invent');
    if (spec.missing.length) {
      out.push('These are not established. Ask me, or leave the element out — do not fill them with plausible text:');
      spec.missing.forEach(function (m) { out.push('- `' + m + '`'); });
    } else {
      out.push('Everything above is established. Anything else you need, ask before assuming.');
    }
    out.push('');
    if (s.agent === 'claude-app') {
      out.push('Work in the order the connector\'s own instructions give: colours, typography,');
      out.push('container width, presets, header and footer, then the pages. The site spec below');
      out.push('is the same information in the form the create-site skill reads, so hand it to a');
      out.push('coding agent later and nothing is lost.');
    } else {
      out.push('Follow the create-site skill you cloned in step 1 (`skills/create-site/SKILL.md`).');
      out.push('The site spec below is the same information in the form that skill reads.');
    }
    out.push('');
    out.push('```json');
    out.push(JSON.stringify(spec, null, 2));
    out.push('```');

    return out.join('\n');
  }

  /* ---------- a plain-language preview of what gets built ---------- */
  function toPreview(s, spec) {
    var a = ACTIONS[s.action] || ACTIONS.enquire;
    var st = styleBy(s.style);
    var h = [];
    h.push('<h3>' + esc(s.name || 'Your site') + '</h3>');
    h.push('<p class="prev__lede">' + esc(s.describe || 'Describe the business and this fills in.') + '</p>');
    h.push('<p class="prev__row"><b>Pages</b> ' + esc(spec.pages.map(function (p) { return p.title; }).join(' · ')) + '</p>');
    h.push('<p class="prev__row"><b>Look</b> ' + esc(s.style === 'custom' ? 'described by you' : (st ? st.label : '—')) + '</p>');
    h.push('<p class="prev__row"><b>One action</b> ' + esc(a.label) + '</p>');
    h.push('<p class="prev__row"><b>Extensions</b> ' + esc(spec.build.extensions.join(', ')) + '</p>');
    if (spec.missing.length) {
      h.push('<p class="prev__miss"><b>' + spec.missing.length + ' thing' + (spec.missing.length === 1 ? '' : 's') +
        ' the agent must not invent</b><br>' + esc(spec.missing.join(', ')) + '</p>');
    }
    return h.join('\n');
  }
  function esc(x) {
    return String(x == null ? '' : x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ---------- render ---------- */
  var promptOut = document.getElementById('cPromptOut');
  var specOut = document.getElementById('cSpecOut');
  var previewOut = document.getElementById('cPreviewOut');
  var meta = document.getElementById('cMeta');
  var statusEl = document.getElementById('cStatus');
  var styleLink = document.getElementById('cStyleLink');
  var styleMini = document.getElementById('cStyleMini');
  var styleThumb = document.getElementById('cStyleThumb');
  var styleImg = document.getElementById('cStyleImg');
  var styleDesc = document.getElementById('cStyleDesc');
  var notesField = document.getElementById('cNotesField');
  var lastPrompt = '';

  /* Step 3 is otherwise blank until someone picks, so the preview - and the fact that there
     are thirty of these at all - is invisible on arrival. This shows ONE OF THEM AS A SAMPLE,
     chosen once per page load, without touching the select.

     Deliberately not a random SELECTION: this generator's one real promise is that it does not
     put words in your mouth, and a style quietly chosen by dice is exactly that - a decision
     the person never made, carried into brand.style as though they had. A sample commits to
     nothing and still shows the library. */
  var sample = STYLES.length ? STYLES[Math.floor(Math.random() * STYLES.length)] : null;

  function render() {
    var s = readState();
    var st = styleBy(s.style);
    var spec = toSpec(s);
    lastPrompt = toPrompt(s, spec);

    promptOut.textContent = lastPrompt;
    specOut.textContent = JSON.stringify(spec, null, 2);
    previewOut.innerHTML = toPreview(s, spec);

    meta.textContent = spec.pages.length + ' pages · ' + spec.missing.length + ' to confirm';

    if (notesField) notesField.hidden = s.style !== 'custom';

    /* A glimpse of the look under the dropdown. The image is only pointed at a file once a
       style is chosen, so nothing is fetched for the 'Pick a style' default or for the
       describe-your-own path, where there is no preset to show. */
    var chosen = (st && s.style && s.style !== 'custom') ? st : null;
    var shown = chosen || (s.style === 'custom' ? null : sample);
    if (styleMini) {
      styleMini.hidden = !shown;
      styleMini.classList.toggle('stylemini--sample', !!shown && !chosen);
    }
    if (shown) {
      var href = '/design-presets/' + shown.slug + '/';
      var src = '/assets/img/styles/' + shown.slug + '.jpg';
      if (styleImg.getAttribute('src') !== src) {
        styleImg.setAttribute('src', src);
        styleImg.setAttribute('alt', shown.label + ' — ' + shown.blurb);
      }
      styleThumb.href = href;
      styleLink.href = href;
      if (styleDesc) {
        styleDesc.textContent = chosen
          ? shown.blurb
          : shown.label + ' — ' + shown.blurb + ' One of thirty; pick one above to choose it.';
      }
      styleLink.textContent = chosen
        ? 'See this style as a full page →'
        : 'See this one as a full page →';
    }

    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* private mode */ }
  }

  /* ---------- restore ---------- */
  function restore() {
    var saved = null;
    try { saved = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { saved = null; }
    if (!saved) return;
    Object.keys(saved).forEach(function (k) {
      var v = saved[k];
      if (Array.isArray(v)) {
        Array.prototype.forEach.call(form.querySelectorAll('input[name="' + k + '"]'), function (i) {
          i.checked = v.indexOf(i.value) !== -1;
        });
      } else if (form.elements[k]) {
        var el = form.elements[k];
        if (el.length && el[0] && el[0].type === 'radio') {
          Array.prototype.forEach.call(el, function (i) { i.checked = i.value === v; });
        } else { el.value = v; }
      }
    });
  }

  /* ---------- prefill from the URL ----------
     So a page like /build/membership-website/ can send someone here with the
     form already shaped for what they came for, instead of dropping them on a
     blank six-question form. Runs AFTER restore(), so a link always beats a
     stale saved draft — somebody who clicked "build a membership site" means
     it, whatever they filled in last week.

       ?name=…&describe=…&market=…&type=…&phone=…&email=…
       &pages=home,pricing,faq,contact      (checkboxes: exact set)
       &style=saas&styleNotes=…
       &action=signup                       (radio)
       &has=copy,photos                     (checkboxes)
       &target=…&agent=claude-code&publish=draft

     Unknown names and values that are not offered are ignored rather than
     trusted: everything here comes from a query string. */
  function prefill() {
    var q;
    try { q = new URLSearchParams(window.location.search); } catch (e) { return false; }
    if (!q || !q.toString()) return false;

    var TEXT = ['name', 'describe', 'market', 'phone', 'email', 'styleNotes', 'target', 'extraPages'];
    var SELECT = ['type', 'style', 'agent'];
    var RADIO = ['action', 'publish'];
    var MULTI = ['pages', 'has'];
    var used = 0;

    TEXT.forEach(function (k) {
      if (!q.has(k) || !form.elements[k]) return;
      form.elements[k].value = q.get(k).slice(0, 600);
      used++;
    });
    SELECT.forEach(function (k) {
      if (!q.has(k)) return;
      var el = form.elements[k];
      if (!el || !el.options) return;
      var want = q.get(k);
      // Only accept a value the select actually offers.
      for (var i = 0; i < el.options.length; i++) {
        if (el.options[i].value === want) { el.value = want; used++; return; }
      }
    });
    RADIO.forEach(function (k) {
      if (!q.has(k)) return;
      var want = q.get(k), hit = false;
      Array.prototype.forEach.call(form.querySelectorAll('input[name="' + k + '"]'), function (i) {
        if (i.value === want) { i.checked = true; hit = true; }
      });
      if (hit) used++;
    });
    MULTI.forEach(function (k) {
      if (!q.has(k)) return;
      var want = q.get(k).split(',').map(function (x) { return x.trim(); }).filter(Boolean);
      Array.prototype.forEach.call(form.querySelectorAll('input[name="' + k + '"]'), function (i) {
        // A disabled box (Home is always built) keeps its state.
        if (!i.disabled) { i.checked = want.indexOf(i.value) !== -1; }
      });
      used++;
    });
    return used > 0;
  }

  /* ---------- tabs ---------- */
  Array.prototype.forEach.call(form.ownerDocument.querySelectorAll('#cgen .tabs button'), function (btn) {
    btn.addEventListener('click', function () {
      var tab = btn.getAttribute('data-tab');
      Array.prototype.forEach.call(form.ownerDocument.querySelectorAll('#cgen .tabs button'), function (b) {
        var on = b === btn;
        b.setAttribute('aria-selected', on ? 'true' : 'false');
        b.tabIndex = on ? 0 : -1;
      });
      ['prompt', 'preview', 'spec'].forEach(function (t) {
        document.getElementById('cpanel-' + t).hidden = t !== tab;
      });
    });
  });

  /* ---------- actions ---------- */
  function say(msg) {
    statusEl.textContent = msg;
    setTimeout(function () { if (statusEl.textContent === msg) statusEl.textContent = ''; }, 4000);
  }
  document.getElementById('cCopy').addEventListener('click', function () {
    navigator.clipboard.writeText(lastPrompt).then(
      function () { say('Prompt copied. Paste it to your AI agent.'); },
      function () { say('Could not copy — select the text and copy it manually.'); }
    );
  });
  document.getElementById('cDownload').addEventListener('click', function () {
    var s = readState();
    var blob = new Blob([lastPrompt], { type: 'text/markdown' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (slug(s.name) || 'site') + '-build-prompt.md';
    a.click();
    URL.revokeObjectURL(a.href);
    say('Downloaded.');
  });
  document.getElementById('cSpecDownload').addEventListener('click', function () {
    var s = readState();
    var blob = new Blob([JSON.stringify(toSpec(s), null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'site-spec.json';
    a.click();
    URL.revokeObjectURL(a.href);
    say('site-spec.json downloaded.');
  });

  form.addEventListener('input', render);
  form.addEventListener('change', render);
  restore();
  if (prefill()) {
    // Say so, rather than leaving someone wondering why the form is not empty.
    say('Filled in from the link. Change anything you like.');
  }
  render();
})();
