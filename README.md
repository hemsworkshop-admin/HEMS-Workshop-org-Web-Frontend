# 🏭 Agile Agent Framework
**Business Owner (@bo) & Solution Manager Guide**

Welcome to your AI-driven Agile Release Train (ART). This repository provides a structured, multi-agent workspace for autonomous AI development. You are no longer a solitary developer; you are the Business Owner (`@bo`) of a synthetic software factory. This environment is governed by strict roles, immutable file locks, and automated workflows. Your job is to inject Epics (high-level vision), tune the AI engines, and clear strategic roadblocks. Orchestrate, do not just write code.

---

## 👥 1. The Factory Setup (Agent Skills)

You interact with 8 specialized AI agents. Cross-contamination between them is strictly forbidden by the system's Write-Access Matrix.

### The Leadership Triad (Your Direct Reports)
- **`@prod` (Product Manager):** Focused on R&D, academic literature synthesis, value streams, and mandatory trade-off analysis for new features.
- **`@arch` (System Architect):** Translates vision into blueprints. The *only* agent securely permissioned to write to the core planning templates (`implementation_plan.md` and `session_history.md`).
- **`@rte` (Release Train Engineer):** An invisible background daemon. Acts as the Scrum Master to enforce rules and handoffs. Will only speak to you if the system deadlocks.

### The Execution Team (The Factory Floor)
- **`@dev` (Lead Developer):** Writes the actual code. Locked strictly to the `src/` directory.
- **`@sme` (Subject Matter Expert):** The scientific/math consultant. Verifies algorithmic fidelity and logic. Read-only.
- **`@qa` (QA Engineer):** Writes test suites. Locked strictly to the `tests/` directory.
- **`@brand` (Brand Specialist):** Audits UI, UX, and copy against your style guides. Read-only.
- **`@ops` (DevSecOps):** Manages infrastructure, security hygiene, and automated Git terminal executions.

---

## 📜 2. The Core Rules & Protocols

The framework prevents AI hallucination and scope-creep because agents are bound by unbending rules:

1. **The Write-Access Matrix:** Agents physically cannot modify files outside their domain. `@dev` cannot fix tests; `@qa` cannot fix code.
2. **The Silent Chain-of-Thought (SCoT) Log:** Agents must write their step-by-step reasoning to `docs/logs/thought_trace.md` before coding. They shouldn't read it back (to prevent memory bloat). If you don't understand an AI's decision, read its mind here.
3. **The Two-Strike Escalation:** If `@dev` fails an audit from `@sme`, `@qa`, or `@brand` twice, `@rte` pauses the system and asks `@bo` for a tie-breaking decision to prevent infinite execution loops.

---

## ⚡ 3. The `/dir` Workflow (Direct Execution)

In a heavy Agile pipeline, waking up the entire triad to change a button color wastes compute. Bypass the bureaucracy instantly using the `/dir` slash command.

> **What it does:** It forces all non-targeted agents to go to sleep, disables blueprinting, and grants the targeted agent temporary autonomy to execute your command immediately. Once the command finishes, the full framework automatically wakes back up.

**Examples:**
- **Cosmetic Fast-Track:** `"/dir @dev and @brand: Update header padding to p-4 and do a quick Vibe Check."`
- **Academic Brainstorm:** `"/dir @prod: Let's discuss the viability of using a Monte Carlo simulation. No blueprints yet."`
- **Micro-Script:** `"/dir @dev: Write a standalone 15-line Python script in the root directory. Do not touch src/."`

---

## 🗣️ 4. Operating the Factory (Standard Usage)

When building major features or Epics, you rely on the standard Chain of Command:

> **Epic Injection:** "@arch and @prod: We need a new feature to visualize metrics in real-time. @prod, define the value stream and risks. @arch, draft the implementation plan. Once locked, @dev and @qa may begin execution."

---

## 🔄 5. Automated Sprints & Workflows

Your workspace includes atomic Git workflows (stored in `.agents/workflows/`). You trigger these to manage session state:

- **`session-sprint-review.md`:** Commands `@arch` to compress the session memory into logs, write a handover note, conduct retrospectives, and safely commit/push.
- **`session-sprint-start.md`:** Commands `@ops` to pull the latest repo, and `@arch` to ingest the handover note, initialize standups, and re-orient the team.
- **`atomic-commit-push.md`:** A rapid save-state triggered autonomously or manually during deep coding sessions.

---

## 🧠 6. The Engine Strategy (Fast vs. Thinking Models)

Act as the manual transmission for your models, shifting gears based on the phase of your Agile sprint:

1. **Sprint Planning (Thinking Mode):** When generating the Epic or architectural plan, use high-context, deep-reasoning models (e.g., Gemini 1.5 Pro, o1-preview). The AI needs to synthesize the entire codebase.
2. **Sprint Execution (Fast Mode):** Once the `.plan` is saved, toggle your IDE to a faster, strictly-execution model. Tell `@dev` to execute the plan.
3. **Deadlock Resolution (Specialized Sniper):** If `@dev` gets stuck on a highly specific bug and hits the Two-Strike rule, toggle to a specialized model (e.g., Claude 3.5 Sonnet for UI React bugs) just to break the deadlock and fix that isolated file.

---

## 🎯 7. Getting Started

As the `@bo` of a new project spawned from this template, your immediate responsibility is to establish the **Project Charter**.

Create or update the `.agents/project_charter.md` document at the root level. Define your core epics, business logic, KPIs, and explicit styling rules. You must ensure this base context is established before requesting your AI executives to begin blueprinting.
