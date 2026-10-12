import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const storefrontRoutes = [
  'behind-the-scenes',
  'checkout',
  'collections',
  'collections/quiet-violence',
  'collections/ritual-reckoning',
  'journal',
  'journal/after-the-noise',
  'journal/the-discipline-of-becoming',
  'journal/uniforms-for-the-in-between',
  'products',
  'products/quiet-shell',
  'products/reckoning-tee',
  'products/ritual-overshirt',
  'products/violence-trouser',
  'signin',
] as const;

export type StorefrontPageContent = {
  title: string;
  description: string;
  html: string;
  home: boolean;
};

export const loadStorefrontPage = async (
  route: string,
): Promise<StorefrontPageContent | null> => {
  const file = path.join(
    process.cwd(),
    'src',
    'content',
    'storefront',
    route,
    'index.html',
  );

  let document: string;
  try {
    document = await readFile(file, 'utf8');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }
    throw error;
  }

  const title = document.match(/<title>([\s\S]*?)<\/title>/i)?.[1];
  const description = document.match(
    /<meta\s+name="description"\s+content="([^"]*)"\s*\/?>/i,
  )?.[1];
  const html = document.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1];

  if (title === undefined || description === undefined || html === undefined) {
    throw new Error(`Storefront page "${route}" is missing its document metadata or body.`);
  }

  const safeHtml = route === 'signin'
    ? html.replace(
      '<button type="submit">Continue</button>',
      '<button type="button" disabled>Continue</button><p class="auth-note">Account access is coming soon. Your details are not submitted or stored.</p>',
    )
    : html;

  return { title, description, html: safeHtml, home: false };
};

export const loadHomePage = async () => {
  const page = await loadStorefrontPage('.');
  if (!page) {
    throw new Error('The PAIXX homepage could not be loaded.');
  }

  return { ...page, home: true };
};
