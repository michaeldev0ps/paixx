import { parse, serialize } from 'cookie';
import { createServerClient } from '@supabase/ssr';
import type { IncomingMessage, ServerResponse } from 'node:http';

const getCookieOptions = () => ({
  httpOnly: true,
  path: '/',
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
});

export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error('Supabase authentication is not configured.');
  }
  return { url, key };
}

export function getSiteUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) {
    throw new Error('The authentication site URL is not configured.');
  }

  const parsed = new URL(siteUrl);
  const localDevelopment = process.env.NODE_ENV !== 'production'
    && (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1');
  if (parsed.protocol !== 'https:' && !localDevelopment) {
    throw new Error('The authentication site URL must use HTTPS.');
  }

  return parsed.origin;
}

export function getAuthCallbackUrl(next: string) {
  const callback = new URL('/auth/callback', getSiteUrl());
  callback.searchParams.set('next', next);
  return callback.toString();
}

export function createSupabaseServerClient(
  req: Pick<IncomingMessage, 'headers'>,
  res: Pick<ServerResponse, 'getHeader' | 'setHeader'>,
) {
  const { url, key } = getSupabaseConfig();
  return createServerClient(url, key, {
    cookieOptions: getCookieOptions(),
    cookies: {
      getAll() {
        return Object.entries(parse(req.headers.cookie ?? '')).map(
          ([name, value]) => ({ name, value }),
        ).filter((cookie): cookie is { name: string; value: string } => (
          cookie.value !== undefined
        ));
      },
      setAll(cookiesToSet) {
        const current = res.getHeader('Set-Cookie');
        const existing = Array.isArray(current)
          ? current.map(String)
          : typeof current === 'string'
            ? [current]
            : [];
        const next = cookiesToSet.map(({ name, value, options }) =>
          serialize(name, value, options),
        );
        res.setHeader('Set-Cookie', [...existing, ...next]);
      },
    },
  });
}
