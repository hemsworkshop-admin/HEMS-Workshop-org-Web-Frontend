# Architectural Handover Document: The AI Software Factory
**Date:** April 2026 / Workspace Version: 2.0
**Context:** This document serves as the architectural history and operational philosophy of a highly disciplined, Multi-Agent State Machine environment. It outlines the decisions, rules, and structures designed to facilitate a single-node Agile Release Train (ART) focused on scientific and full-stack development.

*Note to receiving AI Agent: The human user will provide the raw contents of the `.md` files referenced below. Use this document purely to understand the system's underlying logic, constraints, and operational paradigms.*

---

## 1. Core Philosophies & Paradigms

### A. Prompt-as-Code & The Multi-Agent State Machine
We transitioned from a "chatbot" paradigm to a "codebase" paradigm. The `.agents/` directory acts as an immutable Operating System. Markdown files act as executable code, defining agent classes, system firewalls, and runtime configurations. The system operates as a finite state machine routed by a silent orchestrator (`@rte`).

### B. Semantic Referencing (Universal Portability)
Agent personas (`@dev`, `@sme`, `@brand`) are 100% generic. They contain zero project-specific logic. Instead, they use "Semantic Referencing" by reading `.agents/project_charter.md` on initialization. This makes the entire framework instantly portable to any new project by simply swapping the charter.

### C. Context Preservation & Token Optimization
AI memory bloats rapidly. We solved this via two mechanisms:
1. **The Silent Chain-of-Thought (SCoT) Log:** Agents dump their step-by-step reasoning into a write-only log (`thought_trace.md`). They are forbidden from reading it back. This ensures high-quality logic without poisoning the active context window.
2. **Lossless Memory Compression:** When `@arch` compresses the session history, it is mandated to explicitly extract and permanently anchor hard scientific constants, equations, and dependency constraints before summarizing the narrative chatter.

---

## 2. Directory Structure & File System Firewalls

The workspace is rigidly segmented to prevent AI agents from shadow-refactoring or mutating code outside their explicit domains.

```text
/ (Project Root)
│
├── README_BO.md                          # User manual (@bo's guide to running the factory)
│
├── src/                                  # 💻 ACTIVE DEVELOPMENT ZONE (Owned by @dev)
│   ├── frontend/                         # Next.js App Router, React Components, Tailwind
│   └── backend/                          # Python wrappers, FastAPI logic
│
├── tests/                                # 🧪 TESTING ZONE (Owned by @qa)
│   ├── unit/
│   └── integration/
│
├── infrastructure/                       # 🚀 DEPLOYMENT ZONE (Owned by @ops)
│   └── docker-compose.yml
│
├── source-material/                      # 🛑 IMMUTABLE REFERENCE ZONE (Read-Only)
│   └── (Scientific PDFs, raw datasets, original TAMOC fork)
│
└── .agents/                              # ⚙️ THE FACTORY OPERATING SYSTEM
    ├── config/                           # ⚙️ THE FACTORY SETTINGS (Read-Only to AI)
    │   ├── project_charter.md            # <-- (Configure your project here)
    │   ├── environment_config.md         # Cloud & GitHub constraints
    │   └── design/
    │       └── brand-guidelines.md       # Target UI/UX styling rules
    │
    ├── personas/                         # Agent Identities & Mandates
    │   ├── arch.md                       # ART Level(Triad) - System Architect
    │   ├── prod.md                       # ART Level (Triad) - Product / R&D Manager
    │   ├── rte.md                        # ART Level (Triad) - Release Train Engineer (Silent Daemon)
    │   ├── brand.md                      # Scrum Level - UI/UX & Copy Reviewer
    │   ├── dev.md                        # Scrum Level - Lead Developer
    │   ├── ops.md                        # Scrum Level - DevSecOps & Git Manager
    │   ├── qa.md                         # Scrum Level - QA Engineer
    │   └── sme.md                        # Scrum Level - Subject Matter Expert (Physics/Math)
    │
    ├── rules/                            # Global Governance
    │   ├── locksrules.md                 # File-system firewalls & access matrix (System firewalls)
    │   └── scrumrules.md                 # Constitution, Two-Strike rule, Agile flow & /dir protocol
    │
    ├── workflows/                        # On-Demand Execution Scripts
    │   ├── atomic-commit-push.md         # Rapid save-state (@ops + @arch)
    │   ├── direct-execution.md           # The `/dir` protocol for bypassing the Triad
    │   ├── session-end-atomic-git.md     # Memory compression & Git push
    │   └── session-restart-atomic-git.md # Git pull & context rehydration
    │
    └── state/                            # 🧠 SYSTEM MEMORY & ARCHITECTURE (Read/Write)
        ├── implementation_plan.md        # The architectural blueprint (Owned by @arch)
        ├── session_history.md            # The compressed project history (Owned by @arch)
        ├── handover.md                   # Git Context Sync File (Updated by @arch)
        └── logs/
            └── thought_trace.md          # The SCoT Log: Append-only AI brain dump