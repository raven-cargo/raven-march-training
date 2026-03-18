# Agentic AI Engineering: 3-Day Immersive Course — Master Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the world's most sophisticated 3-day technical course introducing engineers to Claude Code, Agentic AI, MCP Servers, and prompt engineering — combining pedagogical gold standards with never-before-seen interactive delivery infrastructure.

**Architecture:** A multi-layer adaptive course platform comprising: (1) NotebookLM-powered pre-reading and multimedia, (2) NanoBanana2-generated visual diagrams, (3) OpenCode-based transparent reasoning labs, (4) self-contained interactive HTML labs with sandbox simulation, (5) a Context7-backed tech-stack adaptor system, (6) a structured prompt library covering skills, commands, subagents, and meta-prompting patterns.

**Tech Stack:** HTML5/CSS3/Vanilla JS (labs), Python (sandbox tooling), Claude Code + MCP (course tooling), NotebookLM MCP (content generation), NanoBanana2 (diagrams), OpenCode (agent transparency), GitHub (distribution), Context7 (tech-stack adaptation), Vercel (lab hosting)

---

## Course Vision

> "Not a course about AI. A course that *is* agentic AI in action."

Every design decision serves one imperative: **learners leave Day 3 able to build, extend, and deploy agentic systems in their actual organization**. No toy demos. No vague theory. Real tools, real workflows, real value from Hour 1.

### The Five Pillars of Delivery Innovation

| Pillar | Technology | Pedagogical Purpose |
|--------|-----------|---------------------|
| **Pre-Flight Learning** | NotebookLM audio/video | Flipped classroom — concepts arrive before class |
| **Visual Cognition** | NanoBanana2 diagrams | Spatial memory encoding of system architectures |
| **Transparent Reasoning** | OpenCode | Metacognition — see *how* agents think, not just what they do |
| **Kinesthetic Labs** | Interactive HTML | Constructivist learning through active simulation |
| **Adaptive Context** | Context7 | Real-world transfer — your tech stack, your problems |

---

## Team Build Environment

### Team Structure (Concurrent Build)

```
TEAM ALPHA — Content & Curriculum
├── Curriculum Architect (Claude Code)
│   └── Owns: master outline, learning objectives, assessment design
├── Module Writer (Claude Code)
│   └── Owns: 12 module content docs, NotebookLM source material
└── Prompt Librarian (Claude Code)
    └── Owns: 6 prompt library domains, 90+ curated prompts

TEAM BETA — Labs & Interactivity
├── Lab Engineer (Claude Code)
│   └── Owns: 9 HTML labs (3 per day), interactive simulations
├── Visual Designer (NanoBanana2 + Claude Code)
│   └── Owns: 40+ process diagrams, concept maps, architecture visuals
└── Sandbox Engineer (Claude Code)
    └── Owns: isolated execution environments, safety wrappers

TEAM GAMMA — Infrastructure & Delivery
├── GitHub Architect (Claude Code)
│   └── Owns: repo structure, tech-stack templates, customization system
├── Context7 Integrator (Claude Code)
│   └── Owns: library documentation pre-population for class prep
└── Deployment Engineer (Claude Code)
    └── Owns: Vercel hosting, lab serving, analytics
```

### Build Order (Dependency Graph)

```
Phase 0: Architecture (Day 0)
├── Master curriculum outline ← THIS PLAN
├── Directory structure ← DONE
└── Team assignment

Phase 1: Content Foundation (Days 1-3)
├── 12 module source documents (NotebookLM ready)
├── NotebookLM notebook creation + source upload
└── Content generation: 8 videos, 9 slide decks, podcast, flashcards

Phase 2: Labs (Days 2-4)
├── Lab 01: Paradigm Shift ← IN THIS PR
├── Lab 02: First Agent Conversation
├── Lab 03: Agent Thinking (OpenCode integration)
├── Lab 04: MCP Server Explorer
├── Lab 05: Prompt Engineering Workshop
├── Lab 06: Skills & Commands Builder
├── Lab 07: Multi-Agent Orchestrator
├── Lab 08: Production Patterns
└── Lab 09: Capstone Build

Phase 3: Prompt Libraries (Day 3)
├── Core agentic contexts
├── MCP tool patterns
├── Meta-prompting templates
├── Tech-stack adaptors
├── Evaluation frameworks
└── Skill/command generators

Phase 4: Delivery Infrastructure (Days 4-5)
├── GitHub repo structure + templates
├── Sandbox configuration
├── Context7 pre-population scripts
└── Vercel deployment

Phase 5: Validation & Refinement (Day 5-6)
├── Full dry-run of Day 1
├── Pedagogical review (objectives vs. labs alignment)
├── Anti-confabulation check on all technical content
└── Facilitator guide creation
```

---

## Task Breakdown

### PHASE 0: Architecture

#### Task 1: Directory Structure Creation
**Files:**
- Create: `PROJECTS/agentic-ai-course/` (entire tree)

**Step 1: Create base structure**
```bash
mkdir -p PROJECTS/agentic-ai-course/{docs/{plans,curriculum,prompt-libraries,facilitator-guides},labs/{day1,day2,day3},sandbox/{config,profiles},github/{templates,workflows},assets/{diagrams,icons},notebooklm/{sources,artifacts}}
```
**Step 2: Verify structure**
```bash
tree PROJECTS/agentic-ai-course/ -L 3
```
**Step 3: Commit**
```bash
git add PROJECTS/agentic-ai-course/
git commit -m "feat: initialize agentic-ai-course project structure"
```

---

### PHASE 1: Content Foundation

#### Task 2: Module Source Documents (12 modules × 3,000-5,000 words each)

**Files:**
- Create: `docs/curriculum/modules/01-paradigm-shift.md`
- Create: `docs/curriculum/modules/02-claude-code-foundations.md`
- Create: `docs/curriculum/modules/03-agent-thinking.md`
- Create: `docs/curriculum/modules/04-prompt-engineering-depth.md`
- Create: `docs/curriculum/modules/05-mcp-architecture.md`
- Create: `docs/curriculum/modules/06-mcp-building.md`
- Create: `docs/curriculum/modules/07-skills-commands.md`
- Create: `docs/curriculum/modules/08-meta-prompting.md`
- Create: `docs/curriculum/modules/09-multi-agent-systems.md`
- Create: `docs/curriculum/modules/10-security-sandboxing.md`
- Create: `docs/curriculum/modules/11-tech-stack-adaptation.md`
- Create: `docs/curriculum/modules/12-capstone-production.md`

**Step 1: Write module 01**
Each module follows the nlm-course-creation template:
- Concept explanation (with analogies)
- Code examples (Claude Code commands + configs)
- Real-world use cases (2-3 industry scenarios)
- Best practices (✅ Do / ❌ Don't)
- Lab connection (links to corresponding HTML lab)

**Step 2: Validate against official docs**
```bash
# Use Context7 for Claude Code, MCP Specification
/ctx7 claude-code
/ctx7 model-context-protocol
```

**Step 3: Upload to NotebookLM**
See Phase 1 in nlm-course-creation skill.

---

### PHASE 2: Interactive HTML Labs

#### Task 3: Lab 01 — The Paradigm Shift (Day 1, Session 1)
**File:** `labs/day1/lab-01-paradigm-shift.html`
Status: ✅ **IN THIS PR**

Concepts covered:
- Traditional programming vs. agentic AI
- The perception-reasoning-action-observation loop
- What Claude Code actually does (concrete, not abstract)
- First 5 Claude Code commands

#### Task 4: Lab 02 — First Agent Conversation (Day 1, Session 2)
**File:** `labs/day1/lab-02-first-agent.html`

Concepts covered:
- Effective prompting (specificity, context, constraints)
- Conversation threading and memory
- Reading Claude Code output (understanding responses)
- Basic error handling

#### Task 5: Lab 03 — Agent Thinking with OpenCode (Day 1, Session 3)
**File:** `labs/day1/lab-03-agent-thinking.html`

Concepts covered:
- OpenCode integration for transparent reasoning
- Following an agent's chain-of-thought
- Understanding tool calls and results
- When agents ask for clarification

#### Task 6: Lab 04 — MCP Server Explorer (Day 2, Session 1)
**File:** `labs/day2/lab-04-mcp-explorer.html`

Concepts covered:
- MCP architecture (clients, servers, tools, resources)
- Connecting existing MCP servers
- Reading MCP server schemas
- Calling tools through Claude

#### Task 7: Lab 05 — Prompt Engineering Workshop (Day 2, Session 2)
**File:** `labs/day2/lab-05-prompt-engineering.html`

Concepts covered:
- Anatomy of a high-quality prompt
- Context injection strategies
- Constraint specification
- Prompt iteration workflow

#### Task 8: Lab 06 — Skills & Commands Builder (Day 2, Session 3)
**File:** `labs/day2/lab-06-skills-commands.html`

Concepts covered:
- Writing skills (YAML frontmatter + markdown instructions)
- Building slash commands
- Skill composition patterns
- Testing and validation

#### Task 9: Lab 07 — Multi-Agent Orchestrator (Day 3, Session 1)
**File:** `labs/day3/lab-07-multi-agent.html`

Concepts covered:
- Task decomposition for parallel agents
- Communication patterns between agents
- Result aggregation and synthesis
- Failure modes and recovery

#### Task 10: Lab 08 — Production Patterns (Day 3, Session 2)
**File:** `labs/day3/lab-08-production.html`

Concepts covered:
- Sandbox configuration and safety
- Secrets management
- Cost optimization strategies
- Monitoring and observability

#### Task 11: Lab 09 — Capstone Build (Day 3, Session 3)
**File:** `labs/day3/lab-09-capstone.html`

Concepts covered:
- Full agentic pipeline design
- Tech-stack specific adaptation (Context7)
- Deployment checklist
- Peer review protocol

---

### PHASE 3: Prompt Libraries

#### Task 12: Core Agentic Context Library
**File:** `docs/prompt-libraries/01-core-agentic-contexts.md`
Status: ✅ **IN THIS PR**

90+ prompts across 6 domains:
- Agent initialization contexts
- Tool use guidance
- Error handling instructions
- Output formatting templates
- Safety constraints
- Meta-prompting patterns

---

### PHASE 4: Infrastructure

#### Task 13: GitHub Repository Templates
**Files:**
- `github/templates/README-template.md`
- `github/templates/CLAUDE.md-template.md`
- `github/templates/mcp-server-template/`
- `github/templates/skill-template.md`
- `github/templates/command-template.md`

#### Task 14: Sandbox Configuration
**Files:**
- `sandbox/config/base.yaml`
- `sandbox/config/restricted.yaml` (student environments)
- `sandbox/config/demo.yaml` (instructor environment)
- `sandbox/profiles/nodejs.yaml`
- `sandbox/profiles/python.yaml`
- `sandbox/profiles/java.yaml`

#### Task 15: Context7 Pre-Population Script
**File:** `github/templates/prep-course-env.sh`
```bash
#!/bin/bash
# Pre-populate class environment with org-specific tech stack docs
# Usage: ./prep-course-env.sh --stack "nextjs,postgres,docker"
```

---

### PHASE 5: Validation

#### Task 16: Pedagogical Alignment Check
**For each lab:**
- [ ] Lab learning objectives match module objectives
- [ ] Cognitive load is appropriate (max 3 new concepts per lab)
- [ ] Interactivity is genuine (not passive reading)
- [ ] Quiz questions test application (not recall)
- [ ] Real-world transfer is explicit

#### Task 17: Anti-Confabulation Check
```bash
# Validate all technical claims
Task tool with subagent_type="deep-researcher"
"Validate all Claude Code API references, MCP specification claims,
and skill YAML format in PROJECTS/agentic-ai-course/docs/curriculum/"
```

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Learner NPS | ≥ 75 |
| Concept retention (day 3 quiz) | ≥ 80% |
| Practical task completion (capstone) | 100% |
| Facilitator adaptation time (new org) | ≤ 2 hours |
| Lab load time | < 2s (no external deps) |
| Content accuracy | Zero confabulations |
| Tech-stack coverage | 10+ stacks via Context7 |

---

## Execution Handoff

Plan saved to `docs/plans/2026-03-15-agentic-ai-course-master.md`.

**Proceeding with Subagent-Driven execution** — creating all initial deliverables in this session.
Sequence: Curriculum Outline → Lab 01 HTML → Prompt Library → (next session: remaining labs + NotebookLM content generation)
