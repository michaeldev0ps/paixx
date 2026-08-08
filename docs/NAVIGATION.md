# NAVIGATION.md
# PAIXX Project Documentation Map
Version: 1.0

This document is the master navigation file for the entire project.

Every AI agent working on this repository MUST read this document first before making any changes.

---

# RULE #1

DO NOT guess.

DO NOT ignore project documentation.

DO NOT create duplicate rules.

If a rule already exists inside /docs, follow it.

---

# PROJECT DOCUMENTATION

/docs

Contains every rule, specification and engineering document for the project.

Always search here before implementing anything.

---

# ROOT DOCUMENTS

README.md

Project overview.

---

AI_START_HERE.md

Mandatory first document for every AI session.

---

PROJECT_CONSTITUTION.md

Highest level project principles.

Nothing may violate this document.

---

PRODUCTION_QUALITY.md

Defines production-ready requirements.

---

ARCHITECTURE_PRESERVATION.md

Rules for protecting existing architecture.

Never introduce breaking architectural changes.

---

# AI MAP

Location:

/docs/AI map/

Purpose:

Contains every document governing AI behaviour.

Read these before writing code.

Files:

• ARCHITECTURE.md
    Overall architecture philosophy.

• SCAFFOLDING.md
    Development phases and planning process.

• RULES.md
    Global project rules.

• AI_RULES.md
    Behaviour expected from every AI.

• AI_SESSION_PROTOCOL.md
    Session workflow.

• ENGINEERING_PRINCIPLES.md
    Engineering standards.

• AI_BEHAVIOR.md
    Coding behaviour expectations.

---

# IMPLEMENTATION

Location:

/docs/IMPLEMENTATION/

Purpose:

Rules for writing production code.

Files:

SECURITY_RULES.md

Implementation security requirements.

IMPLEMENTATION_PROTOCOL.md

Step-by-step implementation workflow.

ROADMAP.md

Current development roadmap.

DESIGN_SYSTEM.md

UI and component standards.

---

# LEGAL

Location:

/docs/legal/

Purpose:

Legal requirements.

Files:

LEGAL_REQUIREMENTS.md

Explains legal folder structure.

Folder:

T&C/

Contains all legal policies.

Examples:

Privacy Policy

Cookie Policy

Terms & Conditions

Refund Policy

Shipping Policy

Payment Policy

Copyright

Security Policy

AI Policy

Compliance

Disclaimer

User Content Policy

---

# COMPLIANCE

Location:

/docs/COMPLIANCE/

Purpose:

Feature-specific documentation.

Each folder stores documentation related to that subsystem.

Current folders:

backend/

frontend/

database/

branding/

deployment/

testing/

When implementing a feature, first check whether documentation exists inside the corresponding folder.

---

# REQUIRED AI WORKFLOW

Every session must follow this order:

1.
Read AI_START_HERE.md

↓

2.
Read NAVIGATION.md

↓

3.
Read PROJECT_CONSTITUTION.md

↓

4.
Read AI map documents

↓

5.
Read IMPLEMENTATION documents

↓

6.
Read COMPLIANCE documentation for the feature being developed

↓

7.
Implement only after all relevant documentation has been reviewed.

---

# WHEN DOCUMENTS CONFLICT

Priority order:

PROJECT_CONSTITUTION.md

↓

ARCHITECTURE_PRESERVATION.md

↓

AI Rules

↓

Implementation Rules

↓

Compliance Documents

↓

Feature-specific documentation

↓

Developer request

---

# NEVER

• Ignore documentation.
• Invent architecture.
• Duplicate existing functionality.
• Break production code.
• Change security without approval.
• Skip planning phases.
• Assume undocumented behaviour.

---

# ALWAYS

✔ Search documentation first.

✔ Preserve architecture.

✔ Write production-quality code.

✔ Ask for clarification if documentation is unclear.

✔ Keep changes minimal.

✔ Follow existing conventions before creating new ones.