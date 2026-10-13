const INTERNAL_ORIGIN = 'https://paixx.invalid';

export function getSafeReturnPath(value: unknown, fallback = '/account'): string {
  if (
    typeof value !== 'string' ||
    value.length > 2048 ||
    !value.startsWith('/') ||
    value.startsWith('//') ||
    /[\\\u0000-\u001f\u007f]/.test(value)
  ) {
    return fallback;
  }

  const target = new URL(value, INTERNAL_ORIGIN);
  if (target.origin !== INTERNAL_ORIGIN) {
    return fallback;
  }

  return `${target.pathname}${target.search}${target.hash}`;
}

export function isEmailConfirmed(confirmedAt: unknown): boolean {
  return typeof confirmedAt === 'string' && confirmedAt.length > 0;
}

export function isSameOriginRequest(
  origin: string | undefined,
  host: string | undefined,
  production: boolean,
): boolean {
  if (!origin || !host) {
    return false;
  }

  try {
    const parsedOrigin = new URL(origin);
    const expectedProtocol = production ? 'https:' : 'http:';
    return parsedOrigin.protocol === expectedProtocol && parsedOrigin.host === host;
  } catch {
    return false;
  }
}
