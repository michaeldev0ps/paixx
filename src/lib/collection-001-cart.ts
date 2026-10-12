import {
  getHoodieVariant,
  isHoodieVariantId,
  type HoodieVariantId,
} from '../data/collection-001';

export const COLLECTION_001_CART_STORAGE_KEY =
  'paixx:collection-001:cart:v1';

export type CartLine = {
  variantId: HoodieVariantId;
  quantity: number;
};

export type CartResult =
  | { ok: true; lines: CartLine[] }
  | { ok: false; message: string };

const isPositiveSafeInteger = (value: unknown): value is number =>
  typeof value === 'number' && Number.isSafeInteger(value) && value > 0;

export const addCartItem = (
  lines: CartLine[],
  variantId: HoodieVariantId,
  quantity: number,
): CartResult => {
  if (!isPositiveSafeInteger(quantity)) {
    return { ok: false, message: 'Enter a whole quantity of at least one.' };
  }

  const existing = lines.find((line) => line.variantId === variantId);
  if (!existing) {
    return { ok: true, lines: [...lines, { variantId, quantity }] };
  }

  const updatedQuantity = existing.quantity + quantity;
  if (!Number.isSafeInteger(updatedQuantity)) {
    return {
      ok: false,
      message: 'That quantity is too large. Reduce it and try again.',
    };
  }

  return {
    ok: true,
    lines: lines.map((line) =>
      line.variantId === variantId
        ? { ...line, quantity: updatedQuantity }
        : line
    ),
  };
};

export const changeCartQuantity = (
  lines: CartLine[],
  variantId: HoodieVariantId,
  quantity: number,
): CartResult => {
  if (!isPositiveSafeInteger(quantity)) {
    return { ok: false, message: 'Quantity must be a whole number of at least one.' };
  }

  return {
    ok: true,
    lines: lines.map((line) =>
      line.variantId === variantId ? { ...line, quantity } : line
    ),
  };
};

export const removeCartItem = (
  lines: CartLine[],
  variantId: HoodieVariantId,
) => lines.filter((line) => line.variantId !== variantId);

export const parseStoredCart = (serialized: string | null): CartResult => {
  if (serialized === null) {
    return { ok: true, lines: [] };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(serialized);
  } catch {
    return {
      ok: false,
      message: 'Your saved cart could not be read. Start a fresh cart to continue.',
    };
  }

  if (!Array.isArray(parsed)) {
    return {
      ok: false,
      message: 'Your saved cart is invalid. Start a fresh cart to continue.',
    };
  }

  let lines: CartLine[] = [];
  for (const item of parsed) {
    if (
      typeof item !== 'object' ||
      item === null ||
      !('variantId' in item) ||
      !('quantity' in item) ||
      !isHoodieVariantId(item.variantId) ||
      !isPositiveSafeInteger(item.quantity)
    ) {
      return {
        ok: false,
        message: 'Your saved cart is invalid. Start a fresh cart to continue.',
      };
    }

    const added = addCartItem(lines, item.variantId, item.quantity);
    if (!added.ok) {
      return {
        ok: false,
        message: 'Your saved cart contains an invalid quantity. Start a fresh cart to continue.',
      };
    }
    lines = added.lines;
  }

  return { ok: true, lines };
};

export const cartTotalCents = (lines: CartLine[]) =>
  lines.reduce((total, line) => {
    const variant = getHoodieVariant(line.variantId);
    if (!variant) {
      throw new Error(`Unknown Collection 001 variant: ${line.variantId}`);
    }
    return total + BigInt(variant.priceCents) * BigInt(line.quantity);
  }, 0n);
