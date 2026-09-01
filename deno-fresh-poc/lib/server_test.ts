/// <reference path="../deno.d.ts" />
import { handleRequest } from "./server.ts";

const expectStatus = (actual: number, expected: number) => {
  if (actual !== expected) {
    throw new Error(`Expected status ${expected}, received ${actual}`);
  }
};

const expectIncludes = (text: string, expected: string) => {
  if (!text.includes(expected)) {
    throw new Error(`Expected response to include "${expected}"`);
  }
};

Deno.test("serves the landing page", async () => {
  const response = await handleRequest()(new Request("http://localhost/"));
  expectStatus(response.status, 200);
  expectIncludes(response.headers.get("content-type") ?? "", "text/html");
  const html = await response.text();
  expectIncludes(html, "Wear the War. Earn the Peace.");
  expectIncludes(html, "site-footer");
});

Deno.test("serves the sign-in placeholder", async () => {
  const response = await handleRequest()(
    new Request("http://localhost/signin"),
  );
  expectStatus(response.status, 200);
  expectIncludes(response.headers.get("content-type") ?? "", "text/html");
  expectIncludes(await response.text(), "Member access");
});

Deno.test("serves the collections catalog", async () => {
  const response = await handleRequest()(
    new Request("http://localhost/collections"),
  );
  expectStatus(response.status, 200);
  expectIncludes(await response.text(), "Collections in tension.");
});

Deno.test("serves a collection detail route", async () => {
  const response = await handleRequest()(
    new Request("http://localhost/collections/quiet-violence"),
  );
  expectStatus(response.status, 200);
  expectIncludes(await response.text(), "Quiet Violence");
});

Deno.test("serves a product detail route", async () => {
  const response = await handleRequest()(
    new Request("http://localhost/products/quiet-shell"),
  );
  expectStatus(response.status, 200);
  expectIncludes(await response.text(), "Quiet Shell");
});

Deno.test("serves the products index route", async () => {
  const response = await handleRequest()(
    new Request("http://localhost/products/"),
  );
  expectStatus(response.status, 200);
  expectIncludes(await response.text(), "Pieces with purpose.");
});

Deno.test("serves the checkout preview", async () => {
  const response = await handleRequest()(
    new Request("http://localhost/checkout?product=quiet-shell"),
  );
  expectStatus(response.status, 200);
  const html = await response.text();
  expectIncludes(html, "Complete your request.");
  expectIncludes(html, "Your selection");
});

Deno.test("serves journal metadata", async () => {
  const response = await handleRequest()(
    new Request("http://localhost/journal"),
  );
  expectStatus(response.status, 200);
  expectIncludes(await response.text(), "journal-meta");
});

Deno.test("serves the stylesheet", async () => {
  const css = new TextEncoder().encode(":root { --bg: #090909; }");
  const response = await handleRequest(async () => css)(
    new Request("http://localhost/static/styles.css"),
  );

  expectStatus(response.status, 200);
  expectIncludes(response.headers.get("content-type") ?? "", "text/css");
  expectIncludes(await response.text(), "--bg");
});

Deno.test("serves the logo asset", async () => {
  const response = await handleRequest(async () =>
    new Uint8Array([137, 80, 78, 71])
  )(
    new Request("http://localhost/static/assets/logo_split_left.png"),
  );
  expectStatus(response.status, 200);
  expectIncludes(response.headers.get("content-type") ?? "", "image/png");
});

Deno.test("returns 404 for unknown routes", async () => {
  const response = await handleRequest()(
    new Request("http://localhost/unknown"),
  );
  expectStatus(response.status, 404);
  expectIncludes(await response.text(), "Not found");
});
