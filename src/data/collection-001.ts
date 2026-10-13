const hoodieVariantById = {
  'black-paixx': {
    id: 'black-paixx',
    color: 'black',
    colorLabel: 'Black',
    style: 'paixx',
    styleLabel: 'PAIXX logo',
    image: '/products/collection-001/black-paixx.png',
    priceCents: 79999,
  },
  'black-demon': {
    id: 'black-demon',
    color: 'black',
    colorLabel: 'Black',
    style: 'demon',
    styleLabel: 'Demon',
    image: '/products/collection-001/black-demon.png',
    priceCents: 85599,
  },
  'white-paixx': {
    id: 'white-paixx',
    color: 'white',
    colorLabel: 'White',
    style: 'paixx',
    styleLabel: 'PAIXX logo',
    image: '/products/collection-001/white-paixx.png',
    priceCents: 59999,
  },
  'white-demon': {
    id: 'white-demon',
    color: 'white',
    colorLabel: 'White',
    style: 'demon',
    styleLabel: 'Demon',
    image: '/products/collection-001/white-demon.png',
    priceCents: 65599,
  },
} as const;

export type HoodieVariantId = keyof typeof hoodieVariantById;
export type HoodieVariant = (typeof hoodieVariantById)[HoodieVariantId];
export type HoodieColor = HoodieVariant['color'];
export type HoodieStyle = HoodieVariant['style'];
export const productSizeOptions = ['S', 'M', 'L', 'XL', 'XXL'] as const;
export type ProductSize = (typeof productSizeOptions)[number];
export type ProductMeasurement = {
  label: string;
  values: Readonly<Partial<Record<ProductSize, number>>>;
};
export type ProductSizing = {
  options: readonly ProductSize[];
  availability: Readonly<Partial<Record<ProductSize, 'available' | 'unavailable'>>> | null;
  guide: {
    unit: 'cm';
    measurements: readonly ProductMeasurement[];
  } | null;
};

const collection001Sizing: ProductSizing = {
  options: productSizeOptions,
  availability: null,
  guide: null,
};

export const hoodieVariants = Object.values(hoodieVariantById);

export const collection001Product = {
  id: 'collection-001-rage-hoodie',
  collection: 'Collection 001 — Mental Warfare',
  name: 'Rage Hoodie',
  tagline: 'Wear the War. Earn the Peace.',
  variants: hoodieVariants,
  sizing: collection001Sizing,
};

export const getHoodieVariant = (id: HoodieVariantId) => hoodieVariantById[id];

export const getHoodieVariantForOptions = (
  color: HoodieColor,
  style: HoodieStyle,
): HoodieVariant => {
  const variant = hoodieVariants.find(
    (item) => item.color === color && item.style === style,
  );
  if (!variant) {
    throw new Error(`No Collection 001 variant for ${color} and ${style}.`);
  }
  return variant;
};

export const isHoodieVariantId = (value: unknown): value is HoodieVariantId =>
  typeof value === 'string' &&
  Object.prototype.hasOwnProperty.call(hoodieVariantById, value);

export const isProductSize = (value: unknown): value is ProductSize =>
  typeof value === 'string' &&
  productSizeOptions.includes(value as ProductSize);

export const formatPrice = (priceCents: number | bigint) => {
  const cents = BigInt(priceCents);
  const dollars = cents / 100n;
  const remainder = String(cents % 100n).padStart(2, '0');

  return `$${dollars.toLocaleString('en-US')}.${remainder}`;
};
