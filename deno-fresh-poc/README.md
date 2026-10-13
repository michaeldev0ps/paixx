# PAIXX Deno Fresh POC

This folder contains a minimal proof-of-concept for migrating the PAIXX frontend
to Deno + Fresh while preserving the luxury brand experience, SEO, and Supabase
connectivity.

## Goal

Build a clean, brand-aligned homepage in Fresh, using the existing design tokens
and layout guidance from `docs/AI map/ARCHITECTURE.md` and
`docs/IMPLEMENTATION/DESIGN_SYSTEM.md`.

## Scope

- Minimal landing page
- SEO metadata
- Tailwind-style utility classes (Fresh-compatible)
- Supabase auth-ready structure
- No Node runtime dependencies

## Notes

This POC is intentionally separate from the current `paixx/` Next.js app. Keep
the existing app unchanged until the Deno path is validated.

## Local environment prerequisites

Before building or running the POC, install Deno locally.

### Windows install guidance

1. Set PowerShell to use TLS 1.2:

   ```powershell
   [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
   ```

2. Install using the official installer script with `curl.exe`:

   ```powershell
   curl.exe -fsSL https://deno.land/install.ps1 | out-string | iex
   ```

3. If the installer fails because of TLS or network restrictions, use a package
   manager:

   - `winget install DenoLand.Deno`
   - `scoop install deno`
   - `choco install deno`

4. As a last resort, download the release ZIP directly from GitHub, unzip
   `deno.exe` to a local folder, and add that folder to `PATH`.

5. Confirm the runtime:

   ```powershell
   deno --version
   deno run --version
   ```

If Deno is not available locally, resolve the installation issue before
continuing with the POC.

### Portable workspace runtime

If Deno cannot be installed globally, the launcher also supports a
workspace-local binary:

```text
paixx/.tools/deno/deno.exe
```

You can also point the launcher at any local Deno executable:

```powershell
$env:PAIXX_DENO_EXE = "C:\path\to\deno.exe"
./run.ps1 -Mode offline
```

## Phase 1 Foundation

This POC is currently in Phase 1 — Foundation. The architecture and runtime
behavior are documented in `PHASE_1_FOUNDATION.md`.

Read that file before making significant changes.

## Phase 2 Landing Experience

Phase 2 begins with refining the homepage brand experience while preserving the
validated Phase 1 runtime and route boundaries.

Focus areas:

- richer editorial hero copy and brand narrative
- a premium collection preview for storytelling
- refined typography, spacing, and interaction cues
- preserve offline-first Deno behavior and minimal route surface area

## Run modes

- Offline mode: `deno run --allow-net --allow-read main.ts`
- Online mode: `deno run --allow-net --allow-read online.ts`
- Auto mode: `deno run --allow-net --allow-read run.ts`
- Windows proxy-aware launcher:
  `./run.ps1 -Mode auto -Proxy 10.168.159.194:8080`

`online.ts` uses remote Deno standard library imports and requires internet
access. `main.ts` runs fully offline with no external Deno module imports.

### Mode override

The auto launcher also supports an explicit runtime mode override with the
environment variable:

```powershell
$env:PAIXX_DENO_MODE = "online"
deno run --allow-net --allow-read run.ts
```

Use this only when the automatic connectivity check is not sufficient or when
you want to force a specific runtime.
