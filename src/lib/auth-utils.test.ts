import { describe, expect, it } from 'vitest';
import {
  getSafeReturnPath,
  isEmailConfirmed,
  isSameOriginRequest,
} from './auth-utils';

describe('getSafeReturnPath', () => {
  it('preserves safe internal paths and their query strings', () => {
    expect(getSafeReturnPath('/checkout?step=delivery')).toBe('/checkout?step=delivery');
  });

  it('falls back for external and protocol-relative destinations', () => {
    expect(getSafeReturnPath('https://example.com')).toBe('/account');
    expect(getSafeReturnPath('//example.com')).toBe('/account');
  });

  it('rejects backslash and control-character paths', () => {
    expect(getSafeReturnPath('/\\example.com')).toBe('/account');
    expect(getSafeReturnPath('/account\n')).toBe('/account');
  });
});

describe('isSameOriginRequest', () => {
  it('accepts an exact same-origin browser request', () => {
    expect(isSameOriginRequest('http://localhost:3002', 'localhost:3002', false)).toBe(true);
  });

  it('rejects missing, mismatched, or insecure production origins', () => {
    expect(isSameOriginRequest(undefined, 'localhost:3002', false)).toBe(false);
    expect(isSameOriginRequest('http://evil.example', 'localhost:3002', false)).toBe(false);
    expect(isSameOriginRequest('http://shop.example', 'shop.example', true)).toBe(false);
  });
});

describe('isEmailConfirmed', () => {
  it('accepts Supabase confirmed-at timestamps', () => {
    expect(isEmailConfirmed('2026-10-13T07:00:00.000Z')).toBe(true);
  });

  it('rejects absent confirmation timestamps', () => {
    expect(isEmailConfirmed(null)).toBe(false);
    expect(isEmailConfirmed(undefined)).toBe(false);
    expect(isEmailConfirmed('')).toBe(false);
  });
});
