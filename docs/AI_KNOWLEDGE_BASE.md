# PAIXX AI Knowledge Base

Version: 1.0
Last updated: 2026-08-31

This document is durable institutional memory for AI agents working on PAIXX. It exists so future Codex, Copilot, Google AI, or other architecture/implementation agents can understand the current project state without relying on chat history.

This file records conclusions, decisions, evidence, constraints, and open questions. It must not contain private chain-of-thought.

---

## 1. Project Identity

PAIXX is a premium luxury streetwear fashion brand.

Brand philosophy:

Pain -> Purpose -> Peace

The product vision is a luxury digital fashion experience, not merely a basic ecommerce website. The experience should feel like an art gallery combined with a luxury clothing store. Every collection should feel like a chapter in a larger story.

The current product direction is a Deno-first luxury ecommerce platform. The immediate focus is preserving and validating the current landing-page baseline and Deno foundation before implementing deeper commerce functionality.

Current maturity:

- Early foundation stage
- Deno proof of concept exists
- Landing page baseline exists
- Landing page now includes hero, story, collections, and footer
- Core ecommerce, auth, database, checkout, CMS, and payments are not implemented

---

## 2. Authoritative Documentation

Primary workspace documentation lives in:

```text
PAIXX_Project/docs
```

Production repository documentation also exists in:

```text
PAIXX_Project/paixx/docs
```

Authoritative documents:

- `AGENTS.md` - repository-level AI operating rules
- `docs/PROJECT_CONTEXT.md` - project purpose, engineering philosophy, workflow, and stack context
- `docs/INDEX.md` - documentation index
- `docs/NAVIGATION.md` - documentation map and authority order
- `docs/PROJECT_CONSTITUTION.md` - highest-level principles and non-negotiables
- `docs/ARCHITECTURE_PRESERVATION.md` - prevents casual architecture rewrites
- `docs/AI map/ARCHITECTURE.md` - original architecture and brand experience principles
- `docs/IMPLEMENTATION/ROADMAP.md` - product roadmap phases
- `docs/IMPLEMENTATION/DESIGN_SYSTEM.md` - brand colors, typography, spacing, and UI style
- `docs/IMPLEMENTATION/SECURITY_RULES.md` - security and authentication rules
- `deno-fresh-poc/PHASE_1_FOUNDATION.md` - current Deno POC foundation authority

Conflict hierarchy from documentation:

1. `PROJECT_CONSTITUTION.md`
2. `ARCHITECTURE_PRESERVATION.md`
3. AI rules
4. Implementation rules
5. Compliance and feature documentation
6. Developer or founder request

Important current conflict:

Older documentation describes Next.js as the intended stack. Current project direction and Deno foundation documentation establish Deno-first as the active direction. Treat Next.js files and older Node-oriented documentation as historical unless explicitly reapproved.

---

## 3. Current Technology Stack

### Active Technology

- Runtime: Deno 2.9.5 is available locally through WinGet
- Language: TypeScript
- Framework: no full Fresh app router is active yet
- Frontend: server-rendered HTML templates from TypeScript
- Backend/server: Deno server entrypoints
- Routing: manual routing in `main.ts` and `online.ts`
- Database: none active
- Authentication: none active
- Styling: static CSS in `deno-fresh-poc/static/styles.css`
- Testing: no confirmed active tests
- Deployment: local Deno validation; Deno-compatible deployment intended later
- Development tooling: `deno.json`, `run.ts`, `run.ps1`

### Planned Technology

- Fresh or Fresh-style route architecture
- Supabase
- PostgreSQL
- Supabase Auth
- Secure API and service boundaries
- Deno Deploy or another Deno-compatible host
- Deno-based tests and route smoke checks

### Historical or Deprecated Technology

- Node.js as canonical runtime
- Next.js as active framework
- npm as primary tooling
- Vercel-only deployment assumptions
- Historical React/Next scaffold
- Historical Vitest/Testing Library setup

These files still exist and must not be casually deleted.

---

## 4. Architecture

Current implementation lives primarily in:

```text
paixx/deno-fresh-poc
```

Current structure:

- `deno.json` - Deno tasks and import map pointer
- `main.ts` - offline server implementation
- `online.ts` - online server implementation using remote Deno std import
- `run.ts` - automatic online/offline selector
- `run.ps1` - Windows proxy-aware launcher
- `lib/server.ts` - shared request handler for active manual routes
- `lib/pages.ts` - HTML document and page templates
- `lib/supabase.ts` - placeholder Supabase client
- `lib/server_test.ts` - repeatable route smoke tests
- `static/styles.css` - page styling
- `routes/` - Fresh-style route files from earlier scaffolding; not active in current runtime

Current request flow:

1. Request enters `main.ts` or `online.ts`.
2. Runtime entrypoint delegates to `handleRequest()` from `lib/server.ts`.
3. Handler checks `url.pathname`.
4. `/` returns `homePageHtml`.
5. `/signin` returns `signInPageHtml`.
6. `/static/styles.css` reads and returns CSS.
7. Unknown paths return `404`.

Rendering:

- HTML is generated from TypeScript string templates.
- `renderDocument()` wraps page HTML in a full document.
- No client-side React runtime is active in the Deno POC.

Static assets:

- CSS is actively served.
- Product images, media assets, and ecommerce assets are not wired in yet.

Service boundaries:

- No API endpoints are implemented.
- No service layer is active.
- Future API/data/auth work must be separated from presentation rendering.

Data boundaries:

- No persistent data layer exists.
- No product schema exists.
- No inventory, order, checkout, or customer data model exists.

Configuration:

- `PORT` - runtime port
- `PAIXX_DENO_MODE` - optional online/offline override for `run.ts`
- `PAIXX_DENO_EXE` - optional local Deno executable path for `run.ps1`
- `HTTP_PROXY` and `HTTPS_PROXY` - used by the proxy-aware launcher
- `SUPABASE_URL` and `SUPABASE_ANON_KEY` - referenced by placeholder Supabase client, not actively used

Security boundaries:

- Current app serves public pages and placeholder UI only.
- No sensitive input should be processed yet.
- Authentication must use a battle-tested provider.
- Supabase Auth is preferred unless the founder approves otherwise.
- No custom password storage.
- No custom JWT logic.
- Threat model and auth plan are required before auth implementation.

---

## 5. Deno Migration

Deno is the canonical runtime direction.

Migration rationale:

- Move away from the previous Node/Next.js runtime direction
- Keep TypeScript
- Preserve SEO, performance, luxury presentation, and future ecommerce architecture
- Support offline validation and proxy-aware development conditions

What has migrated:

- Deno POC folder
- Offline Deno server
- Online Deno server
- Automatic online/offline selector
- Proxy-aware PowerShell launcher
- Shared HTML page templates
- Static CSS
- Landing page baseline
- Sign-in placeholder
- Supabase placeholder client
- Deno foundation documentation

Incomplete:

- Full POC validation is partially complete
- Fresh routing not active
- API/service architecture not complete
- Supabase integration not active
- Auth not implemented
- Deployment not validated
- Tests not established

Offline mode:

- Uses `main.ts`
- Uses `Deno.serve`
- Avoids external Deno module imports
- Intended to work without internet once Deno exists locally

Online mode:

- Uses `online.ts`
- Imports `serve` from Deno standard library URL
- Requires access to `deno.land`
- May require VPN/proxy in restricted networks

Auto mode:

- Uses `run.ts`
- Checks remote Deno std URL reachability
- Uses online mode if reachable
- Falls back to offline mode if not reachable

Proxy/VPN handling:

- `run.ps1` supports proxy input
- Saved proxy file may exist at `deno-fresh-poc/.last_proxy.txt`
- Proxy workflow must not be casually removed
- If network fails, distinguish application failure from network/proxy failure

Fresh status:

- Fresh import map and `routes/` files exist
- Fresh routing is not active
- Do not activate Fresh casually
- Fresh migration should be planned, incremental, and reversible

Node/Next status:

- Node/Next files are historical reference
- Do not migrate back to Node/npm just because old files exist
- Do not delete old files without approval

---

## 6. Current Landing Page

The existing Deno POC landing page is the current visual and product baseline.

Visual direction:

- Dark luxury editorial
- Black dominant background
- White typography
- Blood red accent
- Generous spacing
- Minimal UI
- Premium, restrained presentation

Current sections:

- Hero
- Brand/story section
- Collection preview cards
- Footer

Current routes:

- `/`
- `/signin`
- `/static/styles.css`

Implementation:

- Markup in `deno-fresh-poc/lib/pages.ts`
- Served by `main.ts` and `online.ts`
- Styled by `static/styles.css`

Must be preserved:

- Existing visual/product baseline
- Current dark editorial direction
- PAIXX tone and luxury spacing
- Landing page structure unless a founder-approved redesign occurs

Incomplete:

- No real products
- No product media
- No data-backed collections
- No commerce flows
- No implemented auth

Later phases:

- Product pages
- Product gallery
- Size guide
- Checkout
- Journal/blog
- CMS
- Inventory
- Orders
- Payments
- Analytics and SEO launch work

---

## 7. Product Roadmap

### Phase 1 - Brand Identity

Objective:

Establish brand identity.

Major features:

- Logo
- Icons
- Typography
- Colors

Current status:

Marked complete in roadmap.

Dependencies:

- Founder brand direction

Completion criteria:

- Brand identity assets and tokens established

### Phase 2 - Landing Page

Objective:

Build the landing page.

Major features:

- Hero
- Story
- Collections
- Footer

Current status:

Implemented at baseline level; still needs visual/product approval before moving beyond foundation.

Dependencies:

- Brand identity
- Deno foundation validation

Completion criteria:

- Existing landing page baseline preserved
- Required sections present
- Runtime validated
- Responsive, premium experience confirmed

### Phase 3 - Product Pages

Objective:

Create product shopping experience.

Major features:

- Gallery
- Size guide
- Checkout

Current status:

Planned.

Dependencies:

- Stable routing
- Product model
- Security planning
- Design system maturity

Completion criteria:

- Product pages and checkout flow implemented and validated

### Phase 4 - Journal

Objective:

Editorial content and brand storytelling.

Major features:

- Blog
- Behind-the-scenes content

Current status:

Planned.

Dependencies:

- Content model
- Route architecture
- CMS decision

Completion criteria:

- Journal/content routes and content architecture implemented

### Phase 5 - CMS

Objective:

Operational commerce management.

Major features:

- CMS
- Inventory
- Orders
- Payments

Current status:

Planned.

Dependencies:

- Database schema
- Auth
- Admin security
- Payment provider planning

Completion criteria:

- Secure admin, inventory, order, payment, and content workflows

### Phase 6 - Launch

Objective:

Production launch readiness.

Major features:

- SEO
- Analytics
- Production
- Marketing

Current status:

Planned.

Dependencies:

- Completed product, content, commerce, and deployment foundation

Completion criteria:

- Production deployment and launch readiness validated

Current product phase:

Phase 2 - Landing Page

Current migration phase:

Deno Phase 1 - Foundation

Next product phase:

Phase 3 - Product Pages

Next migration phase:

Deno Phase 2 - Landing Experience

---

## 8. Completed Work

Confirmed completed:

- Documentation workspace exists
- Production repo exists
- Brand identity roadmap phase marked complete
- Deno POC exists
- Offline server entrypoint exists
- Online server entrypoint exists
- Auto runtime selector exists
- Proxy-aware launcher exists
- Runtime discovery convention documented
- Landing page baseline exists
- Landing page footer exists
- Sign-in placeholder exists
- Static CSS exists
- Deno Phase 1 foundation documentation exists
- Supabase placeholder client exists
- Deno route smoke tests exist and pass
- Git repository has commits

Evidence:

- `docs/IMPLEMENTATION/ROADMAP.md`
- `deno-fresh-poc/PHASE_1_FOUNDATION.md`
- `deno-fresh-poc/main.ts`
- `deno-fresh-poc/online.ts`
- `deno-fresh-poc/run.ts`
- `deno-fresh-poc/run.ps1`
- `deno-fresh-poc/lib/pages.ts`
- `deno-fresh-poc/static/styles.css`

---

## 9. Incomplete Work

### Blockers

- Authoritative architecture docs still need formal Deno-first reconciliation
- Full phase completion still needs route architecture clarity before additional pages are added

### Normal Engineering Tasks

- Decide route structure before adding more pages
- Reconcile Deno-first documentation

### Founder Decisions

- Formal approval to update authoritative architecture docs to Deno-first
- Approval of landing page copy and collection naming
- Deployment target confirmation
- Approval before destructive cleanup of historical Node/Next files
- Approval before auth, payment, checkout, and product business rules

### Future Work

- Supabase integration
- Authentication
- Product schema
- Product pages
- Checkout
- Payments
- CMS/admin
- Inventory/orders
- Journal
- Analytics
- SEO launch work

---

## 10. Architectural Decisions

### Deno Is Canonical Runtime

- Reason: founder direction and Deno foundation documentation
- Status: active
- Reversible: yes, but major and founder-level
- Approval: founder-approved direction

### Deno POC Is Current Source of Truth

- Reason: current foundation document names POC as baseline
- Status: active
- Reversible: yes, but requires approval
- Approval: engineering-derived from current direction

### Preserve Current Landing Page Baseline

- Reason: founder direction and foundation documentation
- Status: active
- Reversible: visual redesign requires founder approval
- Approval: founder-approved

### Offline Mode Required

- Reason: network/proxy constraints and Deno foundation goal
- Status: active
- Reversible: yes, but not recommended
- Approval: engineering-derived

### Online Mode Optional

- Reason: remote imports require network access
- Status: active
- Reversible: yes
- Approval: engineering-derived

### Fresh Not Active Yet

- Reason: current server uses manual routing
- Status: current reality
- Reversible: yes
- Approval: engineering-derived

### Authentication Deferred

- Reason: security docs require provider selection, threat model, and approval
- Status: active
- Reversible: auth can be implemented later
- Approval: documented rule

### Do Not Delete Node/Next Files Casually

- Reason: historical scaffold may be useful and deletion is destructive
- Status: active
- Reversible: only safely reversible if tracked/committed
- Approval: documented and founder-directed

---

## 11. Open Decisions

Founder/human decisions required:

- Formal approval to update authoritative architecture docs to Deno-first
- Approval of landing page copy and collection names
- Confirmation of deployment target
- Product/business rules for products, checkout, payments, refunds, shipping, and customer accounts
- Auth provider approval if choosing anything other than Supabase Auth
- Approval before destructive cleanup/removal of historical Node/Next files

---

## 12. Constraints

Technologies that must not be reintroduced casually:

- Node/npm as canonical runtime
- Next.js as active architecture
- Vercel-only assumptions
- Custom authentication
- Custom JWT/password handling

Things that must not be deleted casually:

- Existing landing page baseline
- Deno POC
- Proxy-aware launcher
- Historical Node/Next scaffold
- Documentation
- Legal documentation
- Untracked work

Compatibility constraints:

- Windows and PowerShell workflow matters
- Proxy/VPN conditions may recur
- Offline runtime path matters
- Deno executable may come from `PATH`, `PAIXX_DENO_EXE`, or `paixx/.tools/deno/deno.exe`

Security constraints:

- Do not expose secrets
- Do not hardcode credentials
- Validate inputs before sensitive flows
- Use battle-tested auth
- Threat model before auth
- Do not process credentials with placeholder form

Brand constraints:

- Luxury
- Minimal
- Editorial
- Dark
- Black dominant
- White contrast
- Blood red accent
- Generous spacing
- No casual visual rebuilds
- Animation should enhance, not distract

Deployment constraints:

- Deno-first deployment not fully validated
- Deno Deploy intended but not final
- Old Vercel assumptions are historical

Development constraints:

- Read docs first
- Plan before large changes
- Preserve architecture
- Avoid unnecessary dependencies
- Keep changes incremental and reversible
- Validate after meaningful changes
- Update documentation when architecture or durable state changes

---

## 13. Known Problems

### Deno Runtime Was Previously Unavailable

- Severity: resolved
- Cause: `deno` was previously not discoverable
- Impact: previously blocked runtime validation
- Recommended resolution: continue using local Deno 2.9.5 through WinGet, or use `PAIXX_DENO_EXE` / `paixx/.tools/deno/deno.exe` if the PATH changes

### Network/Proxy State Changed

- Severity: low to medium
- Cause: network was previously unavailable, but GitHub and Deno online mode were reachable during later validation
- Impact: online mode currently works, but proxy/VPN conditions may recur
- Recommended resolution: keep proxy-aware launcher and preserve offline mode

### Documentation Conflict Around Stack

- Severity: high
- Cause: older docs say Next.js; newer direction says Deno-first
- Impact: future agents may choose wrong architecture
- Recommended resolution: formally update authoritative docs after founder approval

### Fresh Files Exist but Are Inactive

- Severity: medium
- Cause: POC currently uses manual Deno routing
- Impact: confusion about actual framework state
- Recommended resolution: document clearly and plan route migration before activation

### Git Working Tree Has Substantial Uncommitted/Untracked Work

- Severity: high
- Cause: prior scaffold/migration work not committed
- Impact: accidental deletion or loss risk
- Recommended resolution: review, stabilize, and commit coherent milestones

### CI Is Node/npm-Based

- Severity: medium
- Cause: historical scaffold
- Impact: CI does not validate Deno-first app
- Recommended resolution: replace or supplement with Deno validation after Deno runtime is established

### Auth UI Exists Without Auth Implementation

- Severity: medium
- Cause: placeholder sign-in route
- Impact: could be mistaken for implemented auth
- Recommended resolution: keep marked as placeholder until security workflow is approved

### Product Roadmap Phase 2 Footer May Be Missing

- Severity: low to medium
- Cause: landing page has hero/story/collections but no confirmed footer
- Impact: Phase 2 cannot be considered complete if footer is required
- Recommended resolution: add footer only after Deno foundation validation while preserving baseline

---

## 14. Validation State

Previously tested or inspected:

- Governing docs read
- Repository structure audited
- Deno POC files inspected
- Git status inspected
- Deno availability checked and confirmed with Deno 2.9.5
- Launcher failure mode checked
- Network/proxy reachability checked
- Launcher hardened to fail cleanly when Deno is missing
- Offline server started through `run.ps1`
- Auto mode started through `run.ps1`
- Auto mode selected online mode when network was reachable
- `/` returned `200 OK`
- `/signin` returned `200 OK`
- `/static/styles.css` returned `200 OK`
- Unknown route returned `404 Not Found`
- Repeatable Deno route smoke tests passed with `deno task test`

Not yet tested:

- Fresh route behavior
- Supabase connectivity
- Deployment
- Automated tests as a repeatable suite
- Auto fallback behavior when network is unavailable but Deno is installed

Current runtime availability:

- Deno 2.9.5 is available locally.

Known validation failures:

- Earlier `deno --version` failed because command was not found; later validation passed.
- Earlier Deno task validation was blocked by missing Deno; later task discovery passed.
- Earlier direct network checks failed; later GitHub and online-mode validation passed.
- Saved proxy check previously failed because proxy was unreachable.
- `run.ts` previously failed with an illegal top-level `return`; this was fixed.
- `run.ps1` and `deno.json` previously lacked `--allow-env` despite reading `PORT`; this was fixed.

Relevant validation commands:

```powershell
git status --short
deno --version
deno task --config deno.json
powershell.exe -ExecutionPolicy Bypass -File run.ps1 -Mode offline -Port 8000
curl.exe -I https://deno.land/std@0.205.0/http/server.ts
curl.exe -I -x http://10.168.159.194:8080 https://deno.land/std@0.205.0/http/server.ts
```

---

## 15. Repository/Git State

Known commits:

- `55ab5f2 Initial commit`
- `c31821c sigh`

Known uncommitted tracked changes before this knowledge-base commit:

- `package.json`
- `tsconfig.json`

Known untracked work before this knowledge-base commit:

- `.env.example`
- `.eslintrc.json`
- `.github/`
- `.gitignore`
- `.prettierrc`
- `README_DEVELOPMENT.md`
- `SECURITY.md`
- `deno-fresh-poc/`
- `next-env.d.ts`
- `next.config.js`
- `package-lock.json`
- `src/`
- `vitest.config.ts`

Historical code:

- Node/Next scaffold and config
- `src/pages/index.tsx` placeholder
- npm scripts and CI workflow

Protect from accidental deletion:

- Entire `deno-fresh-poc/`
- Current landing page implementation
- `run.ps1` proxy-aware launcher
- `.last_proxy.txt` local workflow state
- Historical Node/Next scaffold until cleanup is approved
- All docs/legal files

Security note:

- Git remote configuration may contain an embedded credential. Do not print or expose remote URLs in logs or reports. Prefer credential-manager based remotes when cleaning this up.

---

## 16. Development Workflow

Engineering AI workflow:

1. Read `AGENTS.md`.
2. Read `docs/PROJECT_CONTEXT.md`.
3. Read only task-relevant docs.
4. Inspect `paixx/deno-fresh-poc` for current implementation.
5. Run `rg --files` for file discovery.
6. Run Git status/diff before editing.
7. Determine current phase from roadmap and Deno foundation docs.
8. Separate product phase from migration phase.
9. Make ordinary engineering decisions autonomously when docs and repo make the next step clear.
10. Keep changes small and reversible.
11. Preserve the landing page baseline.
12. Avoid casual architecture refactors.
13. Validate after meaningful changes.
14. Update docs when architecture or durable state changes.
15. Commit coherent validated milestones.

Stop and ask founder when:

- Product/brand decision is required
- Authoritative docs conflict
- Credentials/secrets are required
- Destructive cleanup or migration is required
- Major irreversible architecture decision is required
- Validation exposes a human-only blocker

---

## 17. AI Operating Rules

AI agents should:

- Reason from project documentation first
- Treat Deno as current canonical runtime
- Treat Node/Next as historical unless reapproved
- Make ordinary engineering decisions autonomously
- Avoid unnecessary questions
- Preserve existing work
- Avoid destructive changes
- Never reset, delete, or revert casually
- Validate changes with evidence
- Update docs for durable architecture/state decisions
- Maintain a founder-decision list
- Determine the next engineering task when roadmap and repo make it clear
- Stop only for true founder-level decisions, conflicts, secrets, destructive work, or validation blockers

---

## 18. Current Handoff

CURRENT PRODUCT PHASE: Phase 3/4 presentation foundation (commerce and CMS remain gated)

CURRENT MIGRATION PHASE: Deno Phase 1 - Foundation

CURRENT OBJECTIVE: Validate and refine presentation-safe product, checkout-preview, Journal, and Behind-the-Scenes routes while preserving the Deno-first foundation.

CURRENT BLOCKERS: Real authentication, payments, orders, CMS, and production product data require founder decisions; authoritative legacy docs still describe Next.js; local branch contains substantial pre-existing untracked scaffold work.

NEXT ENGINEERING STEP: Continue responsive/accessibility validation and route hardening; then prepare a Deno-first architecture reconciliation proposal for founder approval.

NEXT PRODUCT MILESTONE: Founder-approved product catalog and business rules, followed by a real product data boundary and gated commerce implementation.

FOUNDER DECISIONS REQUIRED: Product catalog/pricing, payment provider, shipping/returns/tax rules, authentication approval, launch domain, final brand/content approval, and formal Deno-first documentation approval.

---

## 19. Recommended Improvements

Recommendations:

- Create or update a single authoritative Deno-first architecture document.
- Add a phase-gate checklist for Deno Foundation completion.
- Add Deno-based CI once runtime is available.
- Add smoke tests for `/`, `/signin`, and `/static/styles.css`.
- Decide whether manual routing remains temporary or whether Fresh becomes the formal framework.
- Keep the Deno POC isolated until validated.
- Plan any historical Node/Next cleanup separately and destructively only after approval.
- Document the deployment target and validation path.
- Commit coherent milestones sooner to protect untracked work.
- Maintain this AI knowledge base whenever project state changes materially.
