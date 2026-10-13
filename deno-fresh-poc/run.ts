/// <reference path="./deno.d.ts" />
const DEFAULT_MODE = "offline";
const TEST_URL = "https://deno.land/std@0.205.0/http/server.ts";
const TIMEOUT_MS = 2500;

const requestedMode = Deno.env.get("PAIXX_DENO_MODE")?.toLowerCase();

const resolveMode = async () => {
  if (requestedMode === "online" || requestedMode === "offline") {
    return requestedMode;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(TEST_URL, {
      method: "HEAD",
      signal: controller.signal,
    });
    if (response.ok) {
      return "online";
    }
    return "offline";
  } catch {
    return "offline";
  } finally {
    clearTimeout(timeout);
  }
};

const safePort = () => {
  try {
    const raw = Deno.env.get("PORT");
    const parsed = raw ? Number(raw) : NaN;
    return Number.isInteger(parsed) && parsed > 0 ? parsed : 8000;
  } catch {
    return 8000;
  }
};

const mode = await resolveMode();
const port = safePort();

console.log(`Deno run mode: ${mode}`);
console.log(`Listening on http://localhost:${port}`);

if (mode === "online") {
  try {
    await import("./online.ts");
  } catch (err) {
    console.warn("Online mode failed, falling back to offline mode.", err);
    await import("./main.ts");
  }
} else {
  await import("./main.ts");
}
