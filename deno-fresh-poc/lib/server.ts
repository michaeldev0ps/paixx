/// <reference path="../deno.d.ts" />
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
} from "./pages.ts";

type ReadFile = (path: URL) => Promise<Uint8Array<ArrayBuffer>>;

const staticDir = new URL("../static/", import.meta.url);

const htmlResponse = (html: string) =>
  new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });

const serveStatic = async (pathname: string, readFile: ReadFile) => {
  const assets: Record<string, { file: string; type: string }> = {
    "/static/styles.css": {
      file: "styles.css",
      type: "text/css; charset=utf-8",
    },
    "/static/paixx-mark-transparent.png": {
      file: "paixx-mark-transparent.png",
      type: "image/png",
    },
    "/static/js/entrance.js": {
      file: "js/entrance.js",
      type: "text/javascript; charset=utf-8",
    },
    "/static/js/gallery.js": {
      file: "js/gallery.js",
      type: "text/javascript; charset=utf-8",
    },
    "/static/assets/logo_split_left.png": {
      file: "assets/logo_split_left.png",
      type: "image/png",
    },
    "/static/assets/logo_split_right.png": {
      file: "assets/logo_split_right.png",
      type: "image/png",
    },
  };
  const asset = assets[pathname];
  if (!asset) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const file = await readFile(new URL(asset.file, staticDir));
    return new Response(new Blob([file]), {
      status: 200,
      headers: { "content-type": asset.type },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
};

export const handleRequest =
  (readFile: ReadFile = Deno.readFile) => async (request: Request) => {
    const url = new URL(request.url);
    const slugFromPath = (prefix: string) => {
      const slug = url.pathname.slice(prefix.length).replace(/^\/|\/$/g, "");
      return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ? slug : null;
    };

    if (url.pathname === "/") {
      return htmlResponse(homePageHtml);
    }

    if (url.pathname === "/signin") {
      return htmlResponse(signInPageHtml);
    }
    if (url.pathname === "/collections") {
      return htmlResponse(collectionsPageHtml);
    }
    if (
      url.pathname.startsWith("/products/") && url.pathname !== "/products/"
    ) {
      const slug = slugFromPath("/products/");
      if (!slug) return new Response("Not found", { status: 404 });
      return htmlResponse(
        productDetailPageHtml(slug),
      );
    }
    if (url.pathname === "/products" || url.pathname === "/products/") {
      return htmlResponse(productsIndexPageHtml);
    }
    if (url.pathname === "/journal" || url.pathname === "/journal/") {
      return htmlResponse(journalPageHtml);
    }
    if (
      url.pathname === "/behind-the-scenes" ||
      url.pathname === "/behind-the-scenes/"
    ) return htmlResponse(behindScenesPageHtml);
    if (url.pathname === "/checkout" || url.pathname === "/checkout/") {
      return htmlResponse(checkoutPageHtml);
    }
    if (url.pathname.startsWith("/journal/")) {
      const slug = slugFromPath("/journal/");
      if (!slug) return new Response("Not found", { status: 404 });
      return htmlResponse(
        journalEntryPageHtml(slug),
      );
    }
    if (
      url.pathname === "/collections/ritual-reckoning" ||
      url.pathname === "/collections/quiet-violence"
    ) {
      return htmlResponse(
        collectionDetailPageHtml(url.pathname.split("/").pop() ?? ""),
      );
    }

    if (url.pathname.startsWith("/static/")) {
      return serveStatic(url.pathname, readFile);
    }

    return new Response("Not found", { status: 404 });
  };
