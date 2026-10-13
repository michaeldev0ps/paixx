import Head from 'next/head';
import Script from 'next/script';
import AccountNavStatus from './account-nav-status';
import type { StorefrontPageContent } from '../lib/storefront-pages';

type StorefrontPageProps = StorefrontPageContent & {
  collection001?: boolean;
};

export default function StorefrontPage({
  title,
  description,
  html,
  home,
  collection001 = false,
}: StorefrontPageProps) {
  let pageHtml = html.replace(
    /<a\b(?=[^>]*\bhref=["']\/signin(?:[?#][^"']*)?["'])[^>]*>[\s\S]*?<\/a>/gi,
    '<a href="/signin" data-account-nav>Sign in</a>',
  );
  if (home && collection001) {
    const footerPosition = pageHtml.toLowerCase().lastIndexOf('<footer');
    if (footerPosition < 0) {
      throw new Error('The homepage is missing its footer.');
    }

    const collectionPromo = `
      <section class="collection001-promo" aria-label="Collection 001 Rage Hoodie">
        <p class="eyebrow">The first drop</p>
        <h2>Collection 001: Rage Hoodie</h2>
        <p>Black or white. PAIXX logo or Demon. Four ways to wear the war.</p>
        <a class="editorial-cta" href="/collections/001">
          Shop Collection 001 <span aria-hidden="true">↗</span>
        </a>
      </section>
    `;
    pageHtml = `${pageHtml.slice(0, footerPosition)}${collectionPromo}${pageHtml.slice(footerPosition)}`;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        {/* Keep the legacy stylesheet page-scoped instead of applying it to the hoodie storefront. */}
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/static/styles.css" />
      </Head>
      <Script src="/static/js/gallery.js" strategy="afterInteractive" />
      {home && <Script src="/static/js/entrance.js" strategy="afterInteractive" />}
      <div dangerouslySetInnerHTML={{ __html: pageHtml }} />
      <AccountNavStatus />
    </>
  );
}
