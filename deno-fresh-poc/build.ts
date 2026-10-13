import {
  behindScenesPageHtml,
  checkoutPageHtml,
  collectionDetailPageHtml,
  collectionsPageHtml,
  homePageHtml,
  journalEntryPageHtml,
  journalPageHtml,
  productDetailPageHtml,
  productsIndexPageHtml,
  signInPageHtml,
} from "./lib/pages.ts";
import { products } from "./data/products.ts";
import { journalEntries } from "./data/journal.ts";

await Deno.mkdir("public/signin", { recursive: true });
await Deno.mkdir("public/static", { recursive: true });
await Deno.mkdir("public/static/js", { recursive: true });
await Deno.mkdir("public/static/assets", { recursive: true });
await Deno.mkdir("public/products", { recursive: true });
await Deno.mkdir("public/collections", { recursive: true });
await Deno.mkdir("public/journal", { recursive: true });
await Deno.writeTextFile("public/index.html", homePageHtml);
await Deno.writeTextFile("public/signin/index.html", signInPageHtml);
await Deno.writeTextFile("public/products/index.html", productsIndexPageHtml);
await Deno.writeTextFile("public/collections/index.html", collectionsPageHtml);
await Deno.writeTextFile("public/journal/index.html", journalPageHtml);
await Deno.mkdir("public/behind-the-scenes", { recursive: true });
await Deno.writeTextFile(
  "public/behind-the-scenes/index.html",
  behindScenesPageHtml,
);
await Deno.mkdir("public/checkout", { recursive: true });
await Deno.writeTextFile("public/checkout/index.html", checkoutPageHtml);
for (const entry of journalEntries) {
  await Deno.mkdir(`public/journal/${entry.slug}`, { recursive: true });
  await Deno.writeTextFile(
    `public/journal/${entry.slug}/index.html`,
    journalEntryPageHtml(entry.slug),
  );
}
for (const slug of ["ritual-reckoning", "quiet-violence"]) {
  await Deno.mkdir(`public/collections/${slug}`, { recursive: true });
  await Deno.writeTextFile(
    `public/collections/${slug}/index.html`,
    collectionDetailPageHtml(slug),
  );
}
for (const product of products) {
  await Deno.mkdir(`public/products/${product.slug}`, { recursive: true });
  await Deno.writeTextFile(
    `public/products/${product.slug}/index.html`,
    productDetailPageHtml(product.slug),
  );
}
await Deno.copyFile("static/styles.css", "public/static/styles.css");
await Deno.copyFile("static/js/entrance.js", "public/static/js/entrance.js");
await Deno.copyFile("static/js/gallery.js", "public/static/js/gallery.js");
await Deno.copyFile(
  "static/assets/logo_split_left.png",
  "public/static/assets/logo_split_left.png",
);
await Deno.copyFile(
  "static/assets/logo_split_right.png",
  "public/static/assets/logo_split_right.png",
);
await Deno.copyFile(
  "static/paixx-mark-transparent.png",
  "public/static/paixx-mark-transparent.png",
);
