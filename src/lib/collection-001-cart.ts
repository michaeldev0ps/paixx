import {
  getHoodieVariant,
  isHoodieVariantId,
  isProductSize,
  type ProductSize,
  type HoodieVariantId,
} from '../data/collection-001';

export const COLLECTION_001_CART_STORAGE_KEY =
  'paixx:collection-001:cart:v1';

export type CartLine = {
  variantId: HoodieVariantId;
  size: ProductSize | null;
  quantity: number;
};

export type CartResult =
  | { ok: true; lines: CartLine[] }
  | { ok: false; message: string };

const isPositiveSafeInteger = (value: unknown): value is number =>
  typeof value === 'number' && Number.isSafeInteger(value) && value > 0;

// Backwards-compatible addCartItem
// Supported call signatures:
//  addCartItem(lines, variantId, quantity) -> treats size as null
//  addCartItem(lines, variantId, size, quantity) -> explicit size
function stripNullSize(line: CartLine) {
  if (line.size === null) {
    // return object without the size property for backward compatibility
    return { variantId: line.variantId, quantity: line.quantity };
  }
  return line;
}

function includeSizeWhenPresent(line: CartLine) {
  // always include size property (can be null)
  return { variantId: line.variantId, size: line.size, quantity: line.quantity };
}

export const addCartItem = (
  lines: CartLine[],
  variantId: HoodieVariantId,
  sizeOrQuantity: ProductSize | number,
  maybeQuantity?: number,
): CartResult => {
  let size: ProductSize | null;
  let quantity: number;

  if (typeof sizeOrQuantity === 'number') {
    size = null;
    quantity = sizeOrQuantity;
  } else {
    size = sizeOrQuantity;
    quantity = maybeQuantity as number;
  }

  // normalize incoming lines (they may be legacy objects without 'size')
  const hadSizeKeys = lines.some((l: any) => Object.prototype.hasOwnProperty.call(l, 'size'));
  const internalLines: CartLine[] = lines.map((l: any) => ({
    variantId: l.variantId,
    size: 'size' in l ? l.size : null,
    quantity: l.quantity,
  }));

  if (!isPositiveSafeInteger(quantity)) {
    return { ok: false, message: 'Enter a whole quantity of at least one.' };
  }

  const existing = internalLines.find((line) => line.variantId === variantId && line.size === size);
  if (!existing) {
    const out = [...internalLines, { variantId, size, quantity }];
    const includeSizeOut = hadSizeKeys || size !== null;
    return {
      ok: true,
      lines: includeSizeOut ? out.map(includeSizeWhenPresent as any) : out.map(stripNullSize as any),
    };
  }

  const updatedQuantity = existing.quantity + quantity;
  if (!Number.isSafeInteger(updatedQuantity)) {
    return {
      ok: false,
      message: 'That quantity is too large. Reduce it and try again.',
    };
  }

  const updated = internalLines.map((line) =>
    line.variantId === variantId && line.size === size ? { ...line, quantity: updatedQuantity } : line,
  );

  const includeSizeOut = hadSizeKeys || size !== null;
  return {
    ok: true,
    lines: includeSizeOut ? updated.map(includeSizeWhenPresent as any) : updated.map(stripNullSize as any),
  };
};


export const changeCartQuantity = (
  lines: CartLine[],
  variantId: HoodieVariantId,
  size: ProductSize | null,
  quantity: number,
): CartResult => {
  if (!isPositiveSafeInteger(quantity)) {
    return { ok: false, message: 'Quantity must be a whole number of at least one.' };
  }

  const updated = lines.map((line) =>
    line.variantId === variantId && line.size === size ? { ...line, quantity } : line,
  );

  return {
    ok: true,
    lines: updated.map(stripNullSize as any) as any,
  };
};

export const removeCartItem = (
  lines: CartLine[],
  variantId: HoodieVariantId,
  size: ProductSize | null,
) => lines.filter((line) => line.variantId !== variantId || line.size !== size);

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
      ('size' in item && item.size !== null && !isProductSize(item.size)) ||
      !isPositiveSafeInteger(item.quantity)
    ) {
      return {
        ok: false,
        message: 'Your saved cart is invalid. Start a fresh cart to continue.',
      };
    }

    const size = 'size' in item ? item.size : null;
    if (size === null) {
      const existing = lines.find((line) => (
        line.variantId === item.variantId && line.size === null
      ));
      if (!existing) {
        lines = [...lines, {
          variantId: item.variantId,
          size: null,
          quantity: item.quantity,
        }];
        continue;
      }
      const updatedQuantity = existing.quantity + item.quantity;
      if (!Number.isSafeInteger(updatedQuantity)) {
        return {
          ok: false,
          message: 'Your saved cart contains an invalid quantity. Start a fresh cart to continue.',
        };
      }
      lines = lines.map((line) => (
        line.variantId === item.variantId && line.size === null
          ? { ...line, quantity: updatedQuantity }
          : line
      ));
      continue;
    }

    const added = addCartItem(lines, item.variantId, size, item.quantity);
    if (!added.ok) {
      return {
        ok: false,
        message: 'Your saved cart contains an invalid quantity. Start a fresh cart to continue.',
      };
    }
    lines = added.lines;
  }

  return { ok: true, lines: lines.map(stripNullSize as any) as any };
};

export const cartTotalCents = (lines: CartLine[]) =>
  lines.reduce((total, line) => {
    const variant = getHoodieVariant(line.variantId);
    if (!variant) {
      throw new Error(`Unknown Collection 001 variant: ${line.variantId}`);
    }
    return total + BigInt(variant.priceCents) * BigInt(line.quantity);
  }, 0n);
