# Repository Guidelines

## Workspace Overview

This repository (`paixx/`) is part of a larger workspace.

```
PAIXX_Project/
├── docs/          ← Project knowledge base
└── paixx/         ← Production GitHub repository (this repository)
```

The `docs` directory is the authoritative source for architecture, engineering standards, implementation workflow, legal requirements, design principles and AI operating procedures.

All production code belongs inside this repository.

---

# Startup Procedure

Before implementing any feature:

1. Read:

- ../docs/AI_START_HERE.md
- ../docs/INDEX.md
- ../docs/NAVIGATION.md
- ../docs/PROJECT_CONTEXT.md

2. Follow every referenced document.

3. Build an internal understanding before writing code.

4. If documentation conflicts, stop and report the conflict instead of guessing.

5. Never skip required documentation.

---

# Working Rules

Always:

- understand before implementing
- reuse existing architecture
- keep components modular
- avoid unnecessary complexity
- preserve project consistency
- maintain production quality

Never:

- invent architecture
- ignore documentation
- duplicate components
- introduce unnecessary dependencies
- modify legal documentation without approval

---

# Repository Scope

All application code lives inside this repository.

Documentation lives in:

```
../docs/
```

Read documentation.

Implement here.

Never mix the two.

---

# Development Workflow

Every feature follows:

Understand
→ Plan
→ Approve
→ Implement
→ Review
→ Test
→ Refactor
→ Commit

Never skip planning.

---

# Security

Follow:

../docs/IMPLEMENTATION/SECURITY_RULES.md

Do not expose secrets.

Never hardcode credentials.

Validate all inputs.

---

# Architecture

The architecture is defined inside:

../docs/AI map/ARCHITECTURE.md

Do not redesign the architecture unless explicitly instructed.

---

# Design System

Use:

../docs/IMPLEMENTATION/DESIGN_SYSTEM.md

Maintain visual consistency.

---

# If Unsure

Stop.

Explain the uncertainty.

Ask before continuing.

Never guess.