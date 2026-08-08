# PROJECT_CONTEXT.md

Version: 1.0

---

# PAIXX Project Context

This document is the primary context file for all AI agents working on the PAIXX project.

Read this file first.

Only consult additional documentation when it is directly relevant to the current task.

This document establishes the project's purpose, engineering philosophy, workflow, architecture boundaries, and operating rules.

---

# Project Overview

PAIXX is a premium luxury streetwear fashion brand.

The long-term vision extends beyond fashion into a unified technology ecosystem that delivers premium digital experiences under one brand identity.

The initial product is a production-ready luxury fashion e-commerce platform.

The platform will include:

- Luxury brand website
- E-commerce storefront
- Customer authentication
- Customer accounts
- Shopping cart
- Checkout
- Product management
- Admin dashboard
- Content management
- Secure payment integration
- Future AI-powered customer experiences

The objective is to build production software—not prototypes.

Every engineering decision should support long-term scalability, maintainability, security, and brand quality.

---

# Workspace Structure

Workspace Root

PAIXX_Project/

Contains two primary directories:

docs/

Project documentation, architecture, engineering standards, governance, legal requirements, and AI guidance.

paixx/

GitHub repository containing all production application source code.

## Rule

Read documentation from:

```
/docs
```

Build the application inside:

```
/paixx
```

Never place production application code inside the documentation directory.

---

# Documentation Philosophy

Documentation is the project's source of truth.

Architecture defines implementation.

Implementation never defines architecture.

When implementation conflicts with documentation:

Stop.

Report the conflict.

Never silently change architectural decisions.

Only read documentation that is relevant to the task currently being performed.

Avoid loading unnecessary documentation.

---

# AI Startup Procedure

Before beginning any task:

1. Read PROJECT_CONTEXT.md.
2. Determine which documentation is required.
3. Read only the relevant documentation.
4. Understand the existing implementation.
5. Plan the solution.
6. Request clarification if requirements are unclear.
7. Begin implementation only after sufficient understanding.

Never immediately begin writing code.

---

# Development Workflow

Every feature follows this lifecycle:

Understand

↓

Research existing implementation

↓

Read relevant documentation

↓

Plan

↓

Approval (when required)

↓

Implementation

↓

Testing

↓

Review

↓

Refactor

↓

Completion

Never skip planning.

Never implement features based on assumptions.

---

# Engineering Principles

Every solution should prioritize:

- Simplicity
- Readability
- Maintainability
- Scalability
- Reusability
- Security
- Performance
- Accessibility
- Production quality

Prefer existing patterns over creating new ones.

Avoid unnecessary abstractions.

Avoid premature optimization.

Choose clarity over cleverness.

---

# Existing Code Policy

Before creating:

- Components
- Hooks
- Utilities
- Services
- Helpers
- Types
- APIs

Search the repository first.

Reuse existing implementations whenever appropriate.

Avoid duplicate functionality.

Maintain architectural consistency.

---

# Architecture

The application follows a modular architecture.

Responsibilities should remain clearly separated.

Components should have one responsibility.

Pages should remain lightweight.

Business logic should remain isolated.

Shared functionality should be reusable.

Never redesign architecture unless explicitly instructed.

---

# Security

Security is mandatory.

Always:

- Validate input
- Sanitize user data
- Protect sensitive information
- Follow secure authentication practices
- Consider abuse prevention
- Protect customer privacy

Never:

- Expose secrets
- Hardcode credentials
- Bypass validation
- Disable security for convenience

Authentication should use an established provider.

Never build custom authentication systems unless explicitly required.

---

# Code Standards

Write code that another engineer can understand without explanation.

Code should be:

- Modular
- Predictable
- Readable
- Well-structured
- Consistent

Do not:

- Duplicate logic
- Introduce unnecessary dependencies
- Refactor unrelated files
- Leave placeholder implementations
- Introduce technical debt intentionally

---

# Technology Stack

Frontend

- Next.js
- React
- TypeScript

Backend

- Supabase

Database

- PostgreSQL

Deployment

- Vercel

Version Control

- GitHub

Additional technologies may be introduced only when justified.

---

# Current Project Phase

Current Phase:

Planning & Scaffolding

Objectives:

- Finalize architecture
- Establish design system
- Build project scaffolding
- Prepare reusable foundation
- Validate engineering decisions

Large production features should not be implemented until the architecture is approved.

---

# Documentation Map

Consult only the documentation required for the task.

Architecture

→ AI map/ARCHITECTURE.md

Engineering Principles

→ AI map/ENGINEERING_PRINCIPLES.md

AI Behaviour

→ AI map/AI_RULES.md

AI Session Workflow

→ AI map/AI_SESSION_PROTOCOL.md

Implementation Workflow

→ IMPLEMENTATION/IMPLEMENTATION_PROTOCOL.md

Security

→ IMPLEMENTATION/SECURITY_RULES.md

Design System

→ IMPLEMENTATION/DESIGN_SYSTEM.md

Roadmap

→ IMPLEMENTATION/ROADMAP.md

Scaffolding

→ AI map/SCAFFOLDING.md

Legal Requirements

→ legal/

Navigation

→ NAVIGATION.md

Workspace

→ WORKSPACE_STRUCTURE.md

---

# Uncertainty Policy

If requirements are unclear:

Stop.

Explain the ambiguity.

Request clarification.

Do not invent requirements.

Do not guess expected behaviour.

---

# Repository Responsibilities

Documentation

```
/docs
```

Production Application

```
/paixx
```

Never mix responsibilities.

Documentation explains.

The repository implements.

---

# Mission

Build a premium luxury fashion platform that reflects the PAIXX brand through exceptional engineering, thoughtful design, robust security, and long-term maintainability.

Every contribution should move the project toward becoming a world-class production system.

Quality takes precedence over speed.


# Context Loading Policy

AI agents should minimize context usage.

Load only the documentation necessary for the current task.

Do not recursively read every referenced document.

If additional information is required, load only the specific document that contains that information.

Avoid unnecessary context consumption.