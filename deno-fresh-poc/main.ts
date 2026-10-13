/// <reference path="./deno.d.ts" />
import { handleRequest } from "./lib/server.ts";

const PORT = Number(Deno.env.get("PORT") ?? "8000");

console.log(`Listening on http://localhost:${PORT}`);

Deno.serve({ port: PORT }, handleRequest());
