# Workspace Layout

PAIXX_Project/

├── docs/
│
└── paixx/

The AI has access to BOTH directories.

The purpose of this structure is to separate project documentation from production source code.

---

# docs/

Purpose:

Contains all project documentation, architecture, implementation guides, engineering standards, AI rules, compliance documents, and legal policies.

This directory is the project's knowledge base.

No production application code should be written here.

---

# paixx/

Purpose:

This folder is the actual GitHub repository.

Everything related to the application lives here.

This is the only directory where production code should be created, edited, deleted, or refactored unless explicitly instructed otherwise.

Examples:

• app/

• src/

• public/

• components/

• package.json

• .git/

• README.md

---

# AI Working Rules

Always begin by reading documentation inside:

/docs

After understanding the project requirements, navigate to:

/paixx

All implementation work must occur inside this directory.

Never place application code inside /docs.

Never move documentation into /paixx unless it belongs to the software itself.

---

# Development Workflow

1. Read documentation from /docs.

2. Understand project architecture and rules.

3. Navigate to /paixx.

4. Implement the requested feature.

5. Ensure all changes follow the documented standards.

6. Update documentation in /docs if the project architecture or rules change.

---

# Repository Rules

The GitHub repository is located at:

/paixx

All Git operations (commit, pull, push, merge, branch creation, tags, releases) should be performed from this directory.

Assume /paixx is the project root for all development activities.




# Path Resolution Rule

When this documentation refers to the "project root", it means the root of the workspace (PAIXX_Project/).

When referring to the application root, it means the GitHub repository located at:

/paixx

Example:

Workspace Root
PAIXX_Project/

Application Root
PAIXX_Project/paixx/

Documentation Root
PAIXX_Project/docs/

Always distinguish between the workspace root and the application root before creating or modifying files.