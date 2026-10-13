export type Product = {
  slug: string;
  collection: string;
  name: string;
  material: string;
  priceLabel: string;
};

export const products: Product[] = [
  {
    slug: "ritual-overshirt",
    collection: "ritual-reckoning",
    name: "Ritual Overshirt",
    material: "Heavy cotton twill",
    priceLabel: "Access on request",
  },
  {
    slug: "reckoning-tee",
    collection: "ritual-reckoning",
    name: "Reckoning Tee",
    material: "Structured jersey",
    priceLabel: "Access on request",
  },
  {
    slug: "quiet-shell",
    collection: "quiet-violence",
    name: "Quiet Shell",
    material: "Technical nylon",
    priceLabel: "Access on request",
  },
  {
    slug: "violence-trouser",
    collection: "quiet-violence",
    name: "Violence Trouser",
    material: "Brushed cotton",
    priceLabel: "Access on request",
  },
];
