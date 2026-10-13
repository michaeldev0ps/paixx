import { describe, expect, it } from 'vitest';
import {
  addCartItem,
  parseStoredCart,
  removeCartItem,
} from './collection-001-cart';

describe('Collection 001 sized cart lines', () => {
  it('keeps the same variant in separate lines for different sizes', () => {
    const small = addCartItem([], 'black-paixx', 'S', 1);
    expect(small.ok).toBe(true);
    if (!small.ok) return;

    const medium = addCartItem(small.lines, 'black-paixx', 'M', 2);
    expect(medium).toEqual({
      ok: true,
      lines: [
        { variantId: 'black-paixx', size: 'S', quantity: 1 },
        { variantId: 'black-paixx', size: 'M', quantity: 2 },
      ],
    });
  });

  it('combines quantities only when both variant and size match', () => {
    const first = addCartItem([], 'black-paixx', 'L', 1);
    expect(first.ok).toBe(true);
    if (!first.ok) return;

    expect(addCartItem(first.lines, 'black-paixx', 'L', 2)).toEqual({
      ok: true,
      lines: [{ variantId: 'black-paixx', size: 'L', quantity: 3 }],
    });
  });

  it('removes only the matching size line', () => {
    const lines = [
      { variantId: 'black-paixx' as const, size: 'S' as const, quantity: 1 },
      { variantId: 'black-paixx' as const, size: 'XL' as const, quantity: 1 },
    ];

    expect(removeCartItem(lines, 'black-paixx', 'S')).toEqual([lines[1]]);
  });

  it('preserves old saved cart lines without a size as unselected', () => {
    expect(parseStoredCart('[{"variantId":"black-paixx","quantity":2}]')).toEqual({
      ok: true,
      lines: [{ variantId: 'black-paixx', size: null, quantity: 2 }],
    });
  });

  it('rejects unknown saved size labels', () => {
    expect(parseStoredCart(
      '[{"variantId":"black-paixx","size":"XXXL","quantity":1}]',
    )).toMatchObject({ ok: false });
  });
});
