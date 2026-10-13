/// <reference path="./deno.d.ts" />
import { serve } from "https://deno.land/std@0.205.0/http/server.ts";
import { handleRequest } from "./lib/server.ts";

const PORT = Number(Deno.env.get("PORT") ?? "8000");

console.log(`Listening on http://localhost:${PORT}`);

serve(handleRequest(), { port: PORT });
