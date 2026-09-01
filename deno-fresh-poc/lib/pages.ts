const renderDocument = (title: string, description: string, bodyHtml: string) =>
  `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="article" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <link rel="stylesheet" href="/static/styles.css" />
    <script src="/static/js/gallery.js" defer></script>
    <script src="/static/js/entrance.js" defer></script>
  </head>
  <body>
    ${bodyHtml}
  </body>
</html>`;

export const homePageHtml = renderDocument(
  "PAIXX | Luxury Streetwear",
  "PAIXX is a premium luxury fashion experience built for editorial streetwear storytelling.",
  `
    <div class="page-shell home-shell">
      <section class="monolithic-entrance" aria-label="PAIXX entrance">
        <div id="entrance-canvas">
          <div class="logo-shatter-wrapper">
            <img src="/static/assets/logo_split_left.png" id="logo-part-left" alt="" />
            <img src="/static/assets/logo_split_right.png" id="logo-part-right" alt="" />
          </div>
        </div>
        <p class="entrance-prompt">Scroll to enter</p>
      </section>
      <header class="site-header">
        <a class="wordmark" href="/">PAIXX</a>
        <nav aria-label="Primary navigation">
          <a href="#story">Story</a>
          <a href="#collections">Collections</a>
          <a href="/journal">Journal</a>
          <a href="/signin">Sign in</a>
        </nav>
      </header>
      <main class="hero">
        <section class="hero-copy">
          <p class="eyebrow">PAIXX</p>
          <h1 class="living-type">Wear the War. Earn the Peace.</h1>
          <p class="hero-text">
            A premium luxury streetwear platform designed for editorial collections, bold motion,
            and immersive storytelling.
          </p>
          <a class="editorial-cta" href="#collections">Enter the collection <span aria-hidden="true">↘</span></a>
        </section>

        <aside class="hero-panel">
          <div class="panel-card">
            <span>Editorial collections</span>
            <p>
              Launch with high-contrast visuals, minimal motion, generous spacing, and refined
              typography.
            </p>
            <a class="panel-link" href="#collections">Preview the chapters <span aria-hidden="true">↗</span></a>
          </div>
        </aside>
      </main>

      <section class="brand-story" id="story">
        <div class="brand-story-copy">
          <p class="eyebrow">Brand Narrative</p>
          <h2>Every collection is a chapter of struggle, courage, and calm.</h2>
          <p>
            PAIXX merges editorial fashion with a disciplined luxury attitude. The brand is
            built for people who move through tension with quiet confidence and want streetwear
            that feels rooted, refined, and unmistakably bold.
          </p>
        </div>

        <div class="collection-grid" id="collections">
          <article class="collection-card">
            <p class="eyebrow">Collection 001</p>
            <h3>Ritual & Reckoning</h3>
            <p>
              A limited editorial drop that channels underground street moods and modern armor.
            </p>
          </article>
          <article class="collection-card">
            <p class="eyebrow">Collection 002</p>
            <h3>Quiet Violence</h3>
            <p>
              Sharp silhouettes, strong textures, and luxury details for the next chapter of the brand.
            </p>
          </article>
        </div>
      </section>

      <footer class="site-footer">
        <p class="footer-mark">PAIXX</p>
        <p>Wear the War. Earn the Peace.</p>
      </footer>
    </div>
  `,
);

export const signInPageHtml = renderDocument(
  "Sign In | PA IXX",
  "Sign in to PA IXX for order tracking, account management, and exclusive editorial access.",
  `
    <div class="page-shell">
      <main class="hero hero-single-column">
        <section class="hero-copy">
          <p class="eyebrow">Sign In</p>
          <h1>Member access for the PA IXX experience.</h1>
          <p class="hero-text">
            This page is designed as the first auth step in the Deno prototype. It can be
            connected to Supabase auth and customer session handling in the next validation phase.
          </p>
        </section>

        <aside class="hero-panel">
          <form class="panel-card" method="POST" action="/signin">
            <label>
              Email
              <input type="email" name="email" placeholder="you@example.com" />
            </label>
            <label>
              Password
              <input type="password" name="password" placeholder="Enter password" />
            </label>
            <button type="submit">Continue</button>
          </form>
        </aside>
      </main>
    </div>
  `,
);

export const collectionsPageHtml = renderDocument(
  "Collections | PAIXX",
  "Explore the first PAIXX editorial streetwear collections.",
  `
    <div class="page-shell">
      <header class="site-header"><a class="wordmark" href="/">PAIXX</a><nav><a href="/">Home</a><a href="/signin">Sign in</a></nav></header>
      <main class="catalog-page">
        <p class="eyebrow">The Archive</p>
        <h1>Collections in tension.</h1>
        <p class="hero-text">Two opening chapters. Built in restraint, cut with intent.</p>
        <div class="catalog-grid">
          <article class="catalog-card"><span class="catalog-index">01</span><h2>Ritual &amp; Reckoning</h2><p>Modern armor for the moments that demand a harder silhouette.</p><a class="panel-link" href="/collections/ritual-reckoning">View chapter ↗</a></article>
          <article class="catalog-card"><span class="catalog-index">02</span><h2>Quiet Violence</h2><p>Sharp lines and considered texture for a calmer kind of power.</p><a class="panel-link" href="/collections/quiet-violence">View chapter ↗</a></article>
        </div>
        <div class="product-grid">${
    products.map((product) =>
      `<article class="product-card"><span class="catalog-index">${
        product.collection === "quiet-violence" ? "02" : "01"
      }</span><h3>${product.name}</h3><p>${product.material}</p><a class="panel-link" href="/products/${product.slug}">View product ↗</a></article>`
    ).join("")
  }</div>
      </main>
    </div>
  `,
);

export const collectionDetailPageHtml = (slug: string) => {
  const title = slug === "quiet-violence"
    ? "Quiet Violence"
    : "Ritual & Reckoning";
  const number = slug === "quiet-violence" ? "02" : "01";
  return renderDocument(
    `${title} | PAIXX`,
    `Explore the PAIXX ${title} collection.`,
    `
    <div class="page-shell"><header class="site-header"><a class="wordmark" href="/">PAIXX</a><nav><a href="/collections">Collections</a><a href="/signin">Sign in</a></nav></header>
      <main class="detail-page"><p class="eyebrow">Collection ${number}</p><h1>${title}</h1><p class="hero-text">A considered study in silhouette, texture, and quiet force.</p><div class="detail-placeholder"><span>Editorial chapter</span><p>Product imagery and availability will be introduced in the next product validation phase.</p></div><div class="detail-grid"><section><p class="eyebrow">Fit &amp; form</p><h2>Built with intention.</h2><p class="hero-text">Structured proportions, considered weight, and a finish designed for repeat wear.</p><a class="panel-link" href="#size-guide">View size guide ↘</a></section><section id="size-guide" class="size-guide"><p class="eyebrow">Size guide</p><div><span>Size</span><span>Chest</span><span>Length</span><b>M</b><span>108 cm</span><span>70 cm</span><b>L</b><span>114 cm</span><span>72 cm</span><b>XL</b><span>120 cm</span><span>74 cm</span></div></section></div><a class="editorial-cta" href="mailto:hello@paixx.com">Request collection access <span aria-hidden="true">↗</span></a><br /><a class="panel-link" href="/collections">← Back to collections</a></main>
    </div>`,
  );
};

export const productDetailPageHtml = (slug: string) => {
  const product = products.find((item) => item.slug === slug) ?? products[0];
  return renderDocument(
    `${product.name} | PAIXX`,
    `${product.name} from PAIXX.`,
    `<div class="page-shell"><header class="site-header"><a class="wordmark" href="/">PAIXX</a><nav><a href="/collections">Collections</a><a href="/signin">Sign in</a></nav></header><main class="detail-page product-detail"><p class="eyebrow">Product study</p><h1>${product.name}</h1><p class="hero-text">${product.material}. Designed for movement, built for repeat wear.</p><div class="product-gallery" data-gallery><button class="gallery-panel is-active" data-gallery-panel="0">Editorial image</button><button class="gallery-panel" data-gallery-panel="1">Detail image</button></div><div class="gallery-controls" aria-label="Product gallery"><button type="button" data-gallery-button="0">01</button><button type="button" data-gallery-button="1">02</button></div><div class="product-meta"><p>${product.priceLabel}</p><a class="editorial-cta" href="/checkout?product=${product.slug}">Request access ↗</a></div><a class="panel-link" href="/collections/${product.collection}">← Back to chapter</a></main></div>`,
  );
};

export const productsIndexPageHtml = renderDocument(
  "Products | PAIXX",
  "The PAIXX product archive.",
  `<div class="page-shell"><header class="site-header"><a class="wordmark" href="/">PAIXX</a><nav><a href="/collections">Collections</a><a href="/signin">Sign in</a></nav></header><main class="detail-page"><p class="eyebrow">Product archive</p><h1>Pieces with purpose.</h1><p class="hero-text">Browse the current PAIXX product studies.</p><div class="product-grid">${
    products.map((product) =>
      `<article class="product-card"><span class="catalog-index">${
        product.collection === "quiet-violence" ? "02" : "01"
      }</span><h3>${product.name}</h3><p>${product.material}</p><a class="panel-link" href="/products/${product.slug}">View product ↗</a></article>`
    ).join("")
  }</div></main></div>`,
);
import { products } from "../data/products.ts";
import { journalEntries } from "../data/journal.ts";
import { behindScenesNotes } from "../data/behind_scenes.ts";

export const journalPageHtml = renderDocument(
  "Journal | PAIXX",
  "Stories and field notes from PAIXX.",
  `<div class="page-shell"><header class="site-header"><a class="wordmark" href="/">PAIXX</a><nav><a href="/collections">Collections</a><a href="/signin">Sign in</a></nav></header><main class="detail-page journal-page"><p class="eyebrow">The Journal</p><h1>Notes from the in-between.</h1><p class="hero-text">Stories about pressure, purpose, and becoming.</p><div class="journal-list">${
    journalEntries.map((entry) =>
      `<article><p class="eyebrow">${entry.category}</p><h2>${entry.title}</h2><p class="journal-meta"><time datetime="${entry.date}">${entry.date}</time><span>${entry.readTime}</span></p><p>${entry.excerpt}</p><a class="panel-link" href="/journal/${entry.slug}">Read dispatch ↗</a></article>`
    ).join("")
  }</div></main></div>`,
);

export const behindScenesPageHtml = renderDocument(
  "Behind the Scenes | PAIXX",
  "Process notes from the PAIXX studio.",
  `<div class="page-shell"><header class="site-header"><a class="wordmark" href="/">PAIXX</a><nav><a href="/collections">Collections</a><a href="/journal">Journal</a><a href="/signin">Sign in</a></nav></header><main class="detail-page journal-page"><p class="eyebrow">Behind the scenes</p><h1>The work before the world sees it.</h1><p class="hero-text">Material studies, studio notes, and field tests from the PAIXX process.</p><div class="journal-list">${
    behindScenesNotes.map((note) =>
      `<article><p class="eyebrow">${note.label}</p><h2>${note.title}</h2><p>${note.body}</p></article>`
    ).join("")
  }</div></main></div>`,
);

export const journalEntryPageHtml = (slug: string) => {
  const entryIndex = Math.max(
    0,
    journalEntries.findIndex((item) => item.slug === slug),
  );
  const entry = journalEntries[entryIndex];
  const previous = journalEntries[entryIndex - 1];
  const next = journalEntries[entryIndex + 1];
  const navigation =
    `<nav class="article-nav" aria-label="Journal navigation">${
      previous
        ? `<a class="panel-link" href="/journal/${previous.slug}">← ${previous.title}</a>`
        : "<span></span>"
    }${
      next
        ? `<a class="panel-link" href="/journal/${next.slug}">${next.title} →</a>`
        : "<span></span>"
    }</nav>`;
  return renderDocument(
    `${entry.title} | PAIXX`,
    entry.excerpt,
    `<div class="page-shell"><main class="detail-page journal-entry"><p class="eyebrow">${entry.category}</p><h1>${entry.title}</h1><p class="journal-meta"><time datetime="${entry.date}">${entry.date}</time><span>${entry.readTime}</span></p><p class="hero-text">${entry.excerpt}</p><div class="article-body"><p>PAIXX is interested in the space between struggle and stillness—the decisions, rituals, and objects that help us move through it.</p><p>This dispatch is part of the ongoing archive. More writing, imagery, and field notes will join it as the collection grows.</p></div>${navigation}<a class="panel-link" href="/journal">← Back to journal</a></main></div>`,
  );
};

export const checkoutPageHtml = renderDocument(
  "Checkout | PAIXX",
  "PAIXX checkout preview.",
  `<div class="page-shell"><main class="detail-page checkout-page"><p class="eyebrow">Private access</p><h1>Complete your request.</h1><p class="hero-text">Checkout preview while PAIXX finalizes product availability and payments.</p><div class="checkout-layout"><section class="checkout-summary"><p class="eyebrow">Your selection</p><h2>PAIXX product access</h2><p>Availability and pricing will be confirmed personally before any order is placed.</p><dl><div><dt>Access</dt><dd>Private request</dd></div><div><dt>Payment</dt><dd>Not collected</dd></div></dl></section><form class="checkout-form"><label for="checkout-email">Email<input id="checkout-email" name="email" type="email" autocomplete="email" placeholder="you@example.com" required /></label><label for="checkout-size">Size<select id="checkout-size" name="size" required><option value="">Select size</option><option>M</option><option>L</option><option>XL</option></select></label><button type="button">Request access</button></form></div><p class="checkout-note">No payment is collected in this preview. A PAIXX representative will follow up.</p><a class="panel-link" href="/products/">← Continue browsing</a></main></div>`,
);
