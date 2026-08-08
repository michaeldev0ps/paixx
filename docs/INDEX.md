# INDEX.md
# PAIXX Documentation Index

Version: 1.0

Welcome to the official documentation index for the PAIXX project.

This file provides a complete overview of every documentation file and folder used throughout the project.

If you are an AI agent or developer joining this repository, this is the quickest way to understand where everything is located.

---

# Root Documentation

These documents govern the entire project.

| File | Purpose |
|------|---------|
| README.md | General project overview and setup instructions. |
| AI_START_HERE.md | Mandatory starting point for every AI session. |
| NAVIGATION.md | Master documentation map. Explains where every document is located. |
| PROJECT_CONSTITUTION.md | Defines the project's core principles and non-negotiable rules. |
| PRODUCTION_QUALITY.md | Production readiness standards. |
| ARCHITECTURE_PRESERVATION.md | Prevents architectural degradation and unnecessary rewrites. |

---

# AI Documentation

Location:

/docs/AI map/

Purpose:

Defines how AI agents should behave while contributing to the project.

Contents:

ARCHITECTURE.md
> High-level architecture philosophy.

SCAFFOLDING.md
> Planning workflow before implementation.

RULES.md
> General project development rules.

AI_RULES.md
> AI-specific coding and collaboration rules.

AI_SESSION_PROTOCOL.md
> Required workflow for every AI session.

ENGINEERING_PRINCIPLES.md
> Software engineering standards.

AI_BEHAVIOR.md
> Expected AI


---

# Workspace Layout

This project consists of two distinct areas.

```
PAIXX_Project/
│
├── docs/
│   ├── INDEX.md                ← Entry point for every AI session.
│   ├── README.md
│   ├── NAVIGATION.md
│   ├── AI_START_HERE.md
│   ├── ...
│   │
│   ├── AI map/
│   ├── IMPLEMENTATION/
│   ├── COMPLIANCE/
│   └── legal/
│
└── paixx/
    └── GitHub repository
```

## AI Working Rules

- Read this INDEX.md first.
- Read NAVIGATION.md second.
- Load only the documentation relevant to the current task.
- All production code belongs inside the `paixx/` directory.
- Never place application source code inside `docs/`.
- Never modify documentation unless explicitly instructed.
- Never restructure folders without approval.
- Documentation is the project's knowledge base.
- The `paixx/` directory is the live GitHub repository.
- Treat `docs/` as read-first guidance and `paixx/` as the implementation workspace.

## Separation of Responsibilities

### docs/
Contains:
- Architecture
- Engineering rules
- AI behavior
- Design system
- Security
- Legal
- Roadmaps
- Project governance

### paixx/
Contains:
- Frontend
- Backend
- Database
- Assets
- Configuration
- Source code
- Tests
- Git history

All implementation happens inside `paixx/`.
All project decisions originate from `docs/`.