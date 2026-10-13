# PAIXX Deno POC — Phase 1 Foundation

## Purpose

This document captures the current Phase 1 foundation for the PAIXX Deno
proof-of-concept. It defines the runtime architecture, project structure,
entrypoints, boundaries, and conventions.

This is a Phase 1 artifact only. It does not add new product functionality
beyond preserving the current landing page and validating the Deno runtime.

## Current phase

- **Current Phase:** Phase 1 — Foundation
- **Objective:** Establish a clean, deliberate foundation for later phases.
- **Baseline:** the existing landing page in the Deno POC.

## Project baseline

The current source of truth is the Deno proof-of-concept under
`paixx/deno-fresh-poc`. The previous Node/Next.js implementation is historical
reference only.

The landing page is preserved as the current visual baseline. Do not rebuild its
design direction unnecessarily.

## Current stack

- Runtime: Deno 2.9.5 validated locally
- Framework: current POC uses custom server entrypoints, not a full Fresh app
  router yet
- UI: server-rendered HTML templates in TypeScript
- Styling: static CSS under `static/styles.css`
- Deployment target: local Deno runtime for development and validation

## Key runtime entrypoints

- `deno.json` — project tasks and import map reference
- `main.ts` — offline runtime implementation
- `online.ts` — online runtime implementation using remote Deno std import
- `run.ts` — auto mode, selects online or offline based on network reachability
- `run.ps1` — PowerShell helper for proxy-aware startup and developer workflow

## Offline / online behavior

### Offline mode

- Uses `main.ts`
- No external Deno module imports
- Can run without internet access
- Server is implemented with `Deno.serve`

### Online mode

- Uses `online.ts`
- Imports `serve` from `https://deno.land/std@0.205.0/http/server.ts`
- Requires remote network access to `deno.land`
- Depends on proxy/internet access when behind VPN/proxy

### Auto mode

- Uses `run.ts`
- Checks connectivity to `https://deno.land/std@0.205.0/http/server.ts`
- If reachable, attempts online mode
- If unreachable, falls back to offline mode

## Project structure and conventions

### Key files and folders

- `deno.json` — Deno task definitions and import map pointer
- `deno.lock` — Deno lockfile for reproducible dependency resolution
- `run.ts` — auto runtime selector
- `run.ps1` — Windows proxy helper and launcher
- `main.ts` — offline serving logic
- `online.ts` — online serving logic
- `routes/` — legacy Fresh route files present in the POC but not currently
  active in the server implementation
- `lib/` — shared request handler, page templates, utilities, and service
  clients
- `static/` — static CSS and assets

### Conventions

- Preserve the existing landing page markup and visual direction
- Keep runtime code in TypeScript with direct Deno APIs
- Avoid introducing Node/npm or the old Next.js architecture
- Keep the Deno POC isolated from historical Node implementation
- Prefer explicit entrypoint behavior over hidden automatic imports

## Current application boundaries

### UI / presentation

- HTML is currently generated in server entrypoints
- The landing page is the current presentation baseline and includes hero,
  story, collections, and footer sections
- Sign-in page is present as a visual placeholder

### Routing

- Current route surface:
  - `/` — landing page
  - `/signin` — sign-in page
  - `/static/styles.css` — CSS asset
- Current routing is implemented manually in `main.ts` and `online.ts`
- A `routes/` directory exists from earlier Fresh scaffolding, but it is not
  currently active in the live server implementation
- For Phase 1, the convention is to preserve the current page baseline and treat
  `routes/` as legacy scaffolding until a structured routing strategy is agreed
- Future Phase 2 routing should migrate to a clearer route-file convention when
  the POC evolves from manual entrypoints to a page/router structure

### Route conventions

- Keep route paths explicit and small for Phase 1
- Prefer a separate route handler file once the route surface expands beyond the
  current baseline
- Do not refactor the landing page into a new route system until the
  architecture definition is stable

### Server logic

- `main.ts` and `online.ts` are runtime entrypoints
- Request handling is shared through `lib/server.ts`
- Page rendering remains in `lib/pages.ts`
- This keeps offline and online route behavior aligned while preserving the
  current manual-routing foundation

### API / service layer

- No service API endpoints are implemented yet
- No database or Supabase integration is active in the current runtime
- `lib/supabase.ts` exists as a placeholder for future Phase 3 auth/data work

### Data layer

- No persistent data layer exists yet
- Future data integration should be clearly separated from presentation code

### Authentication boundary

- Authentication is not implemented yet.
- The `/signin` page is currently a UI placeholder only.
- The Phase 1 boundary is: authentication logic must be separated from UI
  rendering and implemented later using a battle-tested provider or Supabase
  auth.
- No auth or account handling will be added until the architecture, security
  model, and service boundaries are defined.

### Security boundary

- Security is currently minimal because the current app only serves static pages
  and UI placeholders.
- The Phase 1 security boundary concept is: keep UI rendering separate from any
  future API/auth/data logic, and do not process sensitive inputs in the current
  runtime yet.
- Before Phase 2, define server-side trust boundaries, input validation
  strategy, and how future API routes will be protected.

### Configuration / environment

- `PORT` — runtime port
- `PAIXX_DENO_MODE` — optional online/offline override (read by `run.ts`)
- `PAIXX_DENO_EXE` — optional path to a local Deno executable for `run.ps1`
- Proxy handling is managed in `run.ps1` via `HTTP_PROXY` and `HTTPS_PROXY`
- `SUPABASE_URL` and `SUPABASE_ANON_KEY` are referenced in `lib/supabase.ts` but
  not yet used

## Development workflow

### Recommended commands

- Offline mode:
  - `deno run --allow-net --allow-read --allow-env main.ts`
- Online mode:
  - `deno run --allow-net --allow-read --allow-env online.ts`
- Auto mode:
  - `deno run --allow-net --allow-read --allow-env run.ts`
- Tests:
  - `deno task test`
- Windows proxy-aware launcher:
  - `./run.ps1 -Mode auto -Proxy 10.168.159.194:8080`

### Runtime discovery

The PowerShell launcher resolves Deno in this order:

1. `PAIXX_DENO_EXE`
2. `deno` on `PATH`
3. workspace-local portable binary at `paixx/.tools/deno/deno.exe`
4. WinGet package fallback path

If none are available, foundation validation is blocked until Deno is installed,
a portable binary is provided, or network/proxy access is available for
installation.

### Validation status

Validated on 2026-08-31 with Deno 2.9.5:

- `deno --version`
- `deno task`
- `deno task test`
- `run.ps1 -Mode offline -Port 8010`
- `/` returned `200 OK`
- landing page response included the footer baseline
- `/signin` returned `200 OK`
- `/static/styles.css` returned `200 OK`
- unknown routes returned `404 Not Found`
- `run.ps1 -Mode auto -Port 8011`
- auto mode selected online mode when `deno.land` was reachable

Remaining validation work:

- validate auto fallback while network is unavailable
- validate any future Fresh route migration only after it is explicitly planned

### Workflow principles

- Preserve the visual landing page baseline
- Validate the Deno runtime before adding features
- Avoid Node/npm runtime or architecture
- Keep Phase 1 focused on architecture and foundation
- Defer product functionality until the architecture is documented

## Decisions made in this foundation

- Deno is the canonical runtime
- The POC is the source of truth
- Offline mode is required
- Online mode is supported but optional and network-dependent
- The landing page is preserved as baseline
- Authentication is deferred
- A simple proxy-aware runner is part of the developer workflow

## Decisions deferred

- Formal Fresh route implementation
- Service API design
- Supabase integration
- Authentication and authorization
- Security model definition
- Database persistence
- Component separation and route boundaries

## Phase 2 transition criteria

Phase 1 is ready to transition when:

- The Deno runtime and entrypoints are documented
- The offline/online behavior is documented
- Current app boundaries are documented
- The landing page remains intact
- A clear path exists for Phase 2 without changing the established foundation

## Next step after Phase 1

- Phase 2 should begin with refining the landing page and brand experience while
  preserving the established architecture.
- Before Phase 2, define how server rendering and route structure will evolve to
  support additional pages.
