import { describe, expect, it } from 'vitest';
import {
  addCartItem,
  cartTotalCents,
  parseStoredCart,
} from '../src/lib/collection-001-cart';

describe('Collection 001 cart', () => {
  it('merges quantities for the same color and style', () => {
    const first = addCartItem([], 'black-paixx', 2);
    expect(first.ok).toBe(true);
    if (!first.ok) return;

    const second = addCartItem(first.lines, 'black-paixx', 3);
    expect(second).toEqual({
      ok: true,
      lines: [{ variantId: 'black-paixx', size: null, quantity: 5 }],
    });
  });

  it('keeps different variants as separate cart lines', () => {
    const first = addCartItem([], 'black-paixx', 1);
    expect(first.ok).toBe(true);
    if (!first.ok) return;

    expect(addCartItem(first.lines, 'white-demon', 2)).toEqual({
      ok: true,
      lines: [
        { variantId: 'black-paixx', size: null, quantity: 1 },
        { variantId: 'white-demon', size: null, quantity: 2 },
      ],
    });
  });

  it('rejects quantities that are not positive whole numbers', () => {
    expect(addCartItem([], 'black-paixx', 0).ok).toBe(false);
    expect(addCartItem([], 'black-paixx', 1.5).ok).toBe(false);
  });

  it('validates saved variants and combines duplicate entries', () => {
    expect(
      parseStoredCart(
        JSON.stringify([
          { variantId: 'black-paixx', quantity: 2 },
          { variantId: 'black-paixx', quantity: 3 },
        ]),
      ),
    ).toEqual({
      ok: true,
      lines: [{ variantId: 'black-paixx', size: null, quantity: 5 }],
    });

    expect(
      parseStoredCart(JSON.stringify([{ variantId: 'unknown', quantity: 1 }])),
      ).toMatchObject({ ok: false });
  });

  it('reports malformed saved data instead of accepting it', () => {
    expect(parseStoredCart('{').ok).toBe(false);
    expect(parseStoredCart(JSON.stringify([{ variantId: 'white-demon', quantity: -1 }])).ok)
      .toBe(false);
  });

  it('calculates totals from the approved variant prices', () => {
    expect(
      cartTotalCents([
        { variantId: 'white-paixx', quantity: 2 },
        { variantId: 'black-demon', quantity: 1 },
      ]),
    ).toBe(205597n);
  });
});
