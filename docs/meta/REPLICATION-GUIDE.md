# Replication Guide: Agentic AI Engineering Course Build System

**Version**: 1.0
**Last Updated**: 2026-03-15
**Purpose**: How to build a complete interactive course from scratch using this system

---

## Table of Contents

1. [Overview](#1-overview)
2. [System Requirements](#2-system-requirements)
3. [Phase 1: Course Architecture](#3-phase-1-course-architecture-12-hours)
4. [Phase 2: Lab Builds](#4-phase-2-lab-builds-24-hours-parallel)
5. [Phase 3: Module Builds](#5-phase-3-module-builds-12-hours-parallel)
6. [Phase 4: Infrastructure](#6-phase-4-infrastructure-30-min-sequential)
7. [Phase 5: Validation](#7-phase-5-validation-30-min-automated)
8. [Phase 6: Meta-Layer](#8-phase-6-meta-layer-1-hour)
9. [Phase 7: NotebookLM Upload](#9-phase-7-notebooklm-upload)
10. [Adapting for a New Technology](#10-adapting-for-a-new-technology)
11. [File Structure Reference](#11-file-structure-reference)
12. [Time Budget](#12-time-budget)

---

## 1. Overview

This system produces a complete, professionally structured interactive course in a single multi-phase build session. It is not a content generator — it is a **build system for learning experiences** that combines parallel agent execution, a structured lab framework, and automated validation into a repeatable process.

### What a Full Build Produces

| Artifact | Quantity | Scale |
|----------|----------|-------|
| Interactive HTML labs | 9 | ~17,440 lines total (~1,900 lines each) |
| Curriculum modules (markdown) | 12 | ~50,000 words total (~4,000 words each) |
| Sandbox configuration files | 3 | base / restricted / demo profiles |
| GitHub templates | 4 | CLAUDE.md, skill, command, prep script |
| Meta-layer documentation | 4+ | BUILD-LOG, LESSONS-LEARNED, this file, prompt library |

### Key Metrics from the 2026-03-15 Reference Build

- **Course**: Agentic AI Engineering (Claude Code + MCP)
- **Build time**: ~4 hours (parallel execution across ~7 agents)
- **Labs**: 9 interactive HTML labs, 17,440 lines total
- **Modules**: 12 curriculum modules, ~50,000 words
- **Validation**: Automated anti-confabulation pass with 8+ domain-specific checks
- **Parallelism**: 9 lab agents + 12 module agents dispatched simultaneously

### Core Efficiency Principle

Without parallel agent execution, this build would take 40+ hours of sequential writing. The system achieves 4-hour builds by dispatching all agents simultaneously. **Parallel execution is not optional — it is the architecture.**

---

## 2. System Requirements

### Required Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| `claude` CLI (Claude Code) | All agent dispatch and file generation | Must support multi-agent Task tool calls |
| Progressive Game Lab Framework | Lab design specification | Read `docs/curriculum/progressive-game-lab-framework.md` first — every lab builder agent uses this |
| Prompt templates in `docs/meta/prompts/` | Standardized agent instructions | Fill in variables; do not modify structure |
| NotebookLM account | Media generation (Phase 7) | Separate from content build; async |

### What You Do NOT Need

- A writing team (agents handle all content generation)
- Pre-written content (architecture specs drive generation)
- Sequential time blocks (parallel dispatch compresses the timeline)

### Critical Pre-Read

**Before dispatching any agents**, read the Progressive Game Lab Framework spec in full:

```
docs/curriculum/progressive-game-lab-framework.md
```

This document defines:
- The Seven-Beat Core Engagement Loop (the invariant every lab section must follow)
- The six section types (Concept Introduction, Prediction Challenge, Interactive Simulation, Knowledge Check, Concept Callback, Capstone Challenge)
- The five card types and their CSS visual language (`info`, `challenge`, `check`, `callback`, `insight`)
- The XP scoring system and unlock mechanics
- The CONCEPT_REGISTRY pattern for cross-lab callbacks

Every lab builder agent receives this spec as context. Understanding it before you write section specs will save you multiple correction passes.

---

## 3. Phase 1: Course Architecture (1–2 hours)

This phase is sequential and cannot be parallelized. You are making the structural decisions that all agents depend on. Rushing this phase causes rework in all subsequent phases.

### Step 1: Define the 3-Day Arc

Write one sentence per day answering: what can the learner do that they could not do before?

Example (reference build):
- **Day 1**: Learner can read and write MCP tools, understand PRAO Loop, build a basic agentic workflow
- **Day 2**: Learner can orchestrate multi-tool agents, manage context, handle errors in agentic systems
- **Day 3**: Learner can build production-grade agentic systems, evaluate safety, deploy to real environments

The daily arc determines which concepts belong in which labs and how difficulty should escalate.

### Step 2: Map the 9 Labs

One lab per major concept, sequenced in **learning-dependency order**. A concept that later labs depend on must appear in an earlier lab.

For each lab, define:
- Lab number and name
- The single concept it establishes
- The concrete skill the learner walks away with
- Which prior labs it depends on (for CONCEPT_REGISTRY callbacks)

### Step 3: Map the 12 Modules

Four modules per day. Modules cover the theory that the labs make concrete. A module should answer: "Why does this work, and what are the edge cases?"

Each module maps to 1–2 labs. The module is not a lab walkthrough — it is the conceptual depth that makes the lab meaningful.

### Step 4: Write the Master Outline

Produce a single document at `docs/plans/[DATE]-[COURSE-NAME]-master.md` that contains:
- The 3-day arc (as written in Step 1)
- All 9 labs with concept, skill, and dependencies
- All 12 modules with learning objectives and word count targets
- The full CONCEPT_REGISTRY (see Step 5)

This document is the source of truth for all agent prompts. Every lab builder and module writer receives their section of this document as context.

### Step 5: Define the CONCEPT_REGISTRY

The CONCEPT_REGISTRY is the mechanism that creates the feeling of cumulative learning. Every concept introduced in a lab is registered. Subsequent labs that reference a registered concept trigger a Concept Callback card (purple, with 🔗 badge) pointing back to where the concept originated.

Rules:
- Each lab introduces 1–3 new concepts (not more — this is a constraint, not a target)
- All prior lab concepts are automatically inherited and available for callbacks
- Callbacks must reference the exact lab and section where the concept was introduced
- Do not create callbacks to concepts the learner has not yet encountered (no forward references)

Format:
```
CONCEPT_REGISTRY:
  - concept: "PRAO Loop"
    introduced_in: "Lab 01, Section 2"
    definition: "Perceive → Reason → Act → Observe — the four-phase agentic cycle"
  - concept: "Tool Call"
    introduced_in: "Lab 01, Section 3"
    definition: "A structured request from an LLM to execute an external function"
```

### Key Decisions to Make in Phase 1

Before writing a single section spec, answer these:

| Decision | Why It Matters |
|----------|----------------|
| **Primary technology** | Determines what concepts populate the CONCEPT_REGISTRY and what accuracy checks validation must enforce |
| **PRAO Loop equivalent** | Every course needs a core agentic mental model — the 4-phase loop that unifies all labs. Name it for your domain. |
| **Progressive skill arc** | If you cannot state what learners can do at end of each day, the labs will not cohere. Write this before anything else. |
| **XP milestones** | The XP system is pre-built into the lab framework. Decide if you want day-boundary milestone rewards (recommended). |

### Phase 1 Output

```
docs/plans/[DATE]-[COURSE-NAME]-master.md
```

This file must exist and be complete before dispatching any Phase 2 agents.

---

## 4. Phase 2: Lab Builds (2–4 hours, parallel)

Labs are the highest-effort artifacts. Each interactive HTML lab is ~1,900 lines of structured HTML, CSS, and JavaScript implementing the Seven-Beat Engagement Loop across 5–7 sections. Quality here determines the learner experience.

### Pre-Flight Checklist

Do not dispatch lab agents until all of these are true:

- [ ] Progressive Game Lab Framework spec exists and is complete at `docs/curriculum/progressive-game-lab-framework.md`
- [ ] At least one reference lab exists — use Lab 01 as the canonical example for all agents (if Lab 01 does not exist yet, build it first, sequentially, as a template)
- [ ] CONCEPT_REGISTRY is fully defined for all 9 labs with exact lab/section citations
- [ ] Section specs are written for each lab — not just topic names, but the exact Q&A content: what the prediction asks, what the correct answer reveals, what each wrong option's misconception is named
- [ ] Content accuracy rules are documented for the course's primary technology (these go into the validation-pass-template.md, but write them now so agent prompts can reference them)

### Dispatch Strategy

Use a single Claude Code message with all 9 Agent tool calls. This achieves true parallelism — all 9 agents run simultaneously. Sequential dispatch wastes the primary efficiency multiplier of this system.

Each agent prompt uses `lab-builder-template.md` filled in with:
- The lab's number, name, and concept
- The complete section specs (predict question, reveal content, apply exercise, per-option feedback)
- The CONCEPT_REGISTRY entries relevant to this lab (new concepts + callbacks from prior labs)
- The path to the reference lab (Lab 01 or whichever is canonical)
- The target output file path

### Critical: Write-to-File Header

Every lab builder prompt must begin with this instruction as the first line:

```
CRITICAL: Use the Write tool to save the file directly to disk. Do NOT output the HTML in your response text. Your response should only confirm what was built, not contain any HTML code.
```

Without this, agents will output the entire HTML in their response, consuming context and providing no file. This is the single most common failure mode in Phase 2.

### Lab HTML Structure (Invariants)

Every lab must implement:
- Navigation header with lab title, day indicator, and XP counter
- Section unlock pattern: each section unlocks only after the prior section's Apply step is completed
- The Seven-Beat Loop within each section (Activate → Frame → Predict → Reveal → Apply → Feedback → Connect Forward)
- Five card types with correct CSS: `info`, `challenge`, `check`, `callback`, `insight`
- Concept Callback cards (purple) for every CONCEPT_REGISTRY entry referenced in this lab
- Capstone Challenge as the final section with self-evaluation rubric
- XP scoring: 30/15/5 for knowledge checks (1st/2nd/3rd try), 50 for capstone
- Progress persistence via localStorage (optional but strongly recommended)

### Monitoring Progress

During parallel execution, check file status periodically:

```bash
ls -la labs/day*/lab-*.html
```

When all 9 files exist with sizes above 80KB, all labs are complete. Files below 80KB likely indicate an incomplete build — recheck that agent's output.

### Common Lab Build Failures

| Failure | Symptom | Fix |
|---------|---------|-----|
| HTML output in response | Agent response is 1,900 lines of HTML | Add Write-to-file header to prompt |
| Missing section unlock | Learner can jump to any section | Agent did not follow framework spec — re-run with explicit unlock requirement |
| Generic feedback | "Incorrect" instead of named misconception | Provide exact per-option feedback text in section specs |
| Missing Concept Callbacks | No purple cards | Provide full CONCEPT_REGISTRY in prompt |
| File too small (<80KB) | Lab is incomplete | Agent likely timed out — check which sections are missing, re-run for that lab only |

---

## 5. Phase 3: Module Builds (1–2 hours, parallel)

Modules are structurally simpler than labs (markdown, no JavaScript) and have a lower failure rate. One agent per module, all dispatched simultaneously.

### Module Structure (per module)

Each module follows this structure:
1. Learning objectives (3–5 bullet points)
2. Introduction (context and motivation, ~300 words)
3. Core sections (3–5 sections, each ~600–800 words with code examples)
4. Edge cases and common mistakes
5. Summary and connection to lab

Target: 3,000–5,000 words per module. Total across 12 modules: ~50,000 words.

### Dispatch Strategy

Same as labs: single Claude Code message, all 12 Agent tool calls simultaneously. Each agent uses `module-writer-template.md` filled with:
- Module number, name, and day
- The corresponding lab(s) this module supports
- Learning objectives
- Section topics with depth targets
- Any technology-specific terminology accuracy requirements

### Module Output Locations

```
docs/curriculum/modules/
  01-[topic].md
  02-[topic].md
  ... (12 total)
```

### Why Modules Are Faster Than Labs

- No JavaScript state management
- No unlock sequence logic
- No per-option feedback required
- Markdown formatting, not HTML/CSS
- Failure modes are simpler (incomplete content, not broken interactions)

If a module agent produces an incomplete file, re-running it is a 10-minute fix. Lab re-runs are more involved.

---

## 6. Phase 4: Infrastructure (30 min, sequential)

Infrastructure files are small and precise. Build them sequentially in this order — each is short enough to write directly without agent dispatch.

### Build Order and Rationale

1. **`sandbox/config/base.yaml`**
   Base permissions that all profiles inherit. Defines which Claude Code tools are permitted, which shell commands are allowed, and which MCP servers are available.

2. **`sandbox/config/restricted.yaml`**
   Student profile. Inherits base, then restricts: no arbitrary shell execution, no internet access beyond course APIs, file writes limited to workspace directory.

3. **`sandbox/config/demo.yaml`**
   Instructor profile. Inherits base, then expands: full tool access, internet access, ability to show learners what unrestricted operation looks like.

4. **`github/templates/CLAUDE.md-template.md`**
   The CLAUDE.md file that students clone as their starting configuration. Should include: course context, tech stack identity, skill activation instructions, and placeholder for org-specific context.

5. **`github/templates/skill-template.md`**
   Blank skill template with correct frontmatter. Students use this to build their own skills during Day 3 exercises.

6. **`github/templates/command-template.md`**
   Blank command template. Same pattern as skill template.

7. **`github/templates/prep-course-env.sh`**
   The environment preparation script. See the reference implementation at `github/templates/prep-course-env.sh`. Key sections:
   - Claude Code installation validation
   - Context7 library pre-loading (tech-stack specific — update `CTX7_IDS` map for your stack)
   - Sandbox directory structure creation
   - `settings.json` permission configuration
   - CLAUDE.md seeding with org context

   After writing: `chmod +x github/templates/prep-course-env.sh`

### Updating `prep-course-env.sh` for a New Technology

The `CTX7_IDS` map in the script links stack names to Context7 library IDs. For a new technology stack, update this map:

```bash
declare -A CTX7_IDS=(
  ["your-framework"]="/your-org/your-framework"
  ["your-db"]="/your-org/your-db"
  # Add all stacks your course uses
)
```

Run `claude mcp call context7 resolve-library-id '{"libraryName": "your-framework"}'` to find correct IDs.

---

## 7. Phase 5: Validation (30 min, automated)

Do not proceed to NotebookLM upload until this phase passes. NotebookLM treats your modules as source material — inaccurate content becomes inaccurate media.

### What Validation Checks

Use `anti-confabulation-validation-template.md` to dispatch a single validation agent. The agent performs 8 standard checks plus any technology-specific additions you define.

**Standard checks (all courses)**:
1. Technical claims are accurate (no invented APIs, methods, or behaviors)
2. Code examples are syntactically valid
3. Concept definitions match official documentation
4. CONCEPT_REGISTRY citations are accurate (referenced lab/section actually exists)
5. Section unlock logic is present in all labs (no skippable required sections)
6. Per-option feedback is specific (no generic "Incorrect" responses)
7. XP values are consistent with the framework spec (30/15/5 for checks, 50 for capstone)
8. Day boundaries in navigation match the labs' actual day assignments

**Technology-specific checks (define these in Phase 1)**:
For the reference build (Claude Code + MCP), additional checks included:
- MCP primitive categorizations are correct (sampling is a client primitive, not server)
- Tool call syntax matches the actual MCP spec
- Claude Code command syntax is current (no deprecated flags)
- PRAO Loop steps are described in correct order

### Pass Criteria

Validation returns PASS when:
- Zero fabricated API methods, classes, or behaviors
- Zero incorrect primitive categorizations
- All code examples are syntactically valid
- All CONCEPT_REGISTRY cross-references point to existing content
- XP values are consistent throughout all 9 labs

If validation returns FAIL, the agent will list specific findings with file and section citations. Fix all findings before proceeding.

### Gate

**Do not proceed to Phase 6 (NotebookLM) until validation returns PASS.**

---

## 8. Phase 6: Meta-Layer (1 hour)

Write the meta-layer documentation while the build session is fresh. This step is what makes the build replicable by future you and by collaborators.

### Documents to Write

Dispatch 3–4 agents simultaneously (these are independent):

1. **`docs/meta/BUILD-LOG.md`**
   Chronological record of the build session. Include: what was dispatched when, which agents succeeded on first try, which required re-runs and why, final file sizes, total elapsed time. This is an operational log, not a narrative.

2. **`docs/meta/LESSONS-LEARNED.md`**
   What worked, what did not, what you would do differently. Focus on agent prompt improvements, section spec granularity, and content accuracy issues caught in validation. This document improves the next build.

3. **`docs/meta/REPLICATION-GUIDE.md`**
   This file. If you are building a new course, update this document with any deviations from the standard process.

4. **`docs/meta/prompts/`** (directory of all prompt templates used)
   - `lab-builder-template.md`
   - `module-writer-template.md`
   - `anti-confabulation-validation-template.md`
   - `parallel-orchestration-pattern.md`

   Each template should be the exact prompt structure used, with variables marked as `[VARIABLE_NAME]`. A future builder should be able to fill in the variables and dispatch the agent with no other knowledge.

### Why This Step Is Not Optional

A course build without meta-layer documentation is a one-time artifact. A course build with meta-layer documentation is a replicable system. The difference compounds: by the third course built with this system, you will have a library of proven prompt templates, validated section spec patterns, and a growing LESSONS-LEARNED corpus that prevents repeating earlier mistakes.

---

## 9. Phase 7: NotebookLM Upload

This phase is asynchronous and can run overnight. NotebookLM generation is not instant — budget 2–3 hours for the complete media set.

### Pre-Requisite

Validation (Phase 5) must have returned PASS. All 12 module markdown files must exist and be complete.

### Process Summary

See the `nlm-course-creation` skill for full authentication and upload details. Summary:

1. **Authenticate**: Run `notebooklm-mcp-auth` to establish session
2. **Create notebook**: One notebook per course (not per module)
3. **Upload sources**: Upload all 12 module markdown files as text sources
4. **Generate media set**:
   - 8 chapter overview videos (one per major topic cluster)
   - 9 lab companion slide decks (one per lab)
   - 1 course audio podcast (full course overview)
   - 2 flashcard sets (Day 1–2 concepts, Day 3 concepts)
5. **Extract URLs**: All generated artifacts have shareable URLs — save them all to `docs/meta/ARTIFACT-URLS.md`
6. **Write README.md**: Course README with links to all artifacts, including labs, modules, and NotebookLM media

### NotebookLM Media Generation Times (approximate)

| Artifact | Count | Time per artifact | Total |
|----------|-------|-------------------|-------|
| Chapter videos | 8 | 10–15 min | ~2 hrs |
| Slide decks | 9 | 5–8 min | ~1 hr |
| Audio podcast | 1 | 15–20 min | ~20 min |
| Flashcard sets | 2 | 3–5 min | ~10 min |

Start generation, then do other work. Check back after 2–3 hours.

---

## 10. Adapting for a New Technology

This system was built for Claude Code + MCP. The same process applies to any technology domain with minimal changes.

### What to Change

| Element | Change Required |
|---------|----------------|
| CONCEPT_REGISTRY concepts | Replace Claude Code / MCP primitives with your technology's key concepts |
| PRAO Loop equivalent | Replace with your domain's core mental model (e.g., Request-Response-State for web frameworks; Observe-Orient-Decide-Act for operations) |
| Content accuracy checks in validation | Add technology-specific checks (correct API signatures, version-accurate syntax, no deprecated patterns) |
| `CTX7_IDS` map in `prep-course-env.sh` | Replace with your stack's Context7 library IDs |
| Section specs | Rewrite all 9 labs' Q&A content for your domain |
| Module topics | Replace with your domain's conceptual structure |

### What Stays the Same

Do not modify these elements — they are the stable, validated core of the system:

| Element | Why It's Stable |
|---------|----------------|
| Progressive Game Lab Framework | Seven-Beat Loop, card types, and XP system are domain-agnostic learning science — they apply to any technical domain |
| Lab HTML structure | Design system, navigation, section unlock pattern, and CONCEPT_REGISTRY callback mechanism are identical regardless of content |
| Module markdown structure | Objectives → core sections → edge cases → summary applies to any technical content |
| Parallel agent dispatch pattern | The single-message multi-agent dispatch strategy is tool-agnostic |
| Anti-confabulation validation process | 8 standard checks apply to all technical content; technology-specific checks are additive |
| Meta-layer documentation pattern | BUILD-LOG, LESSONS-LEARNED, REPLICATION-GUIDE, and prompt templates are structural — reuse them as-is |

### Minimum Viable Adaptation Checklist

Before dispatching any agents for a new technology course:

- [ ] New PRAO Loop equivalent defined and named
- [ ] CONCEPT_REGISTRY fully populated with new domain's concepts (1–3 per lab)
- [ ] Section specs written for all 9 labs (predict question, reveal content, apply exercise, per-option misconception names)
- [ ] Content accuracy rules documented (what can agents get wrong in this domain?)
- [ ] `CTX7_IDS` updated with correct Context7 library IDs for new stack
- [ ] At least one technology-specific check added to the validation template

---

## 11. File Structure Reference

```
[course-root]/
├── docs/
│   ├── plans/
│   │   └── [DATE]-[COURSE-NAME]-master.md          # Phase 1 output — source of truth
│   ├── curriculum/
│   │   ├── master-outline.md                        # High-level arc and lab/module map
│   │   ├── progressive-game-lab-framework.md        # The canonical lab design spec
│   │   └── modules/
│   │       ├── 01-[topic].md                        # Phase 3 outputs (12 total)
│   │       ├── 02-[topic].md
│   │       └── ... (12 total)
│   ├── prompt-libraries/
│   │   └── [domain]-contexts.md                     # Domain-specific context snippets for agents
│   ├── meta/
│   │   ├── BUILD-LOG.md                             # Phase 6 output — chronological build record
│   │   ├── LESSONS-LEARNED.md                       # Phase 6 output — improvement notes
│   │   ├── REPLICATION-GUIDE.md                     # This file
│   │   ├── ARTIFACT-URLS.md                         # Phase 7 output — NotebookLM URLs
│   │   └── prompts/
│   │       ├── lab-builder-template.md              # Phase 2 agent prompt template
│   │       ├── module-writer-template.md            # Phase 3 agent prompt template
│   │       ├── anti-confabulation-validation-template.md  # Phase 5 validation prompt
│   │       └── parallel-orchestration-pattern.md   # The multi-agent dispatch pattern
│   └── validation-report.md                         # Phase 5 output — validation findings
├── labs/
│   ├── day1/
│   │   ├── lab-01-[name].html                       # Phase 2 outputs
│   │   ├── lab-02-[name].html
│   │   └── lab-03-[name].html
│   ├── day2/
│   │   ├── lab-04-[name].html
│   │   ├── lab-05-[name].html
│   │   └── lab-06-[name].html
│   └── day3/
│       ├── lab-07-[name].html
│       ├── lab-08-[name].html
│       └── lab-09-[name].html
├── sandbox/
│   └── config/
│       ├── base.yaml                                # Phase 4 output — base permissions
│       ├── restricted.yaml                          # Phase 4 output — student profile
│       └── demo.yaml                               # Phase 4 output — instructor profile
├── github/
│   └── templates/
│       ├── CLAUDE.md-template.md                   # Phase 4 output
│       ├── skill-template.md                        # Phase 4 output
│       ├── command-template.md                      # Phase 4 output
│       └── prep-course-env.sh                      # Phase 4 output (chmod +x required)
└── README.md                                        # Phase 7 output — course index with all links
```

---

## 12. Time Budget

| Phase | Description | Time | Parallelism |
|-------|-------------|------|-------------|
| 1 | Course architecture | 1–2 hrs | Sequential (planning decisions) |
| 2 | Lab builds (9 labs) | 2–4 hrs | 9 simultaneous agents |
| 3 | Module builds (12 modules) | 1–2 hrs | 12 simultaneous agents |
| 4 | Infrastructure | 30 min | Sequential (small files) |
| 5 | Validation | 30 min | 1 validation agent |
| 6 | Meta-layer documentation | 1 hr | 3–4 simultaneous agents |
| 7 | NotebookLM generation | 2–3 hrs | Automated (async, runs overnight) |
| **Total (active)** | | **5–10 hrs** | |
| **Total (with NLM async)** | | **8–13 hrs** | |

### The Parallelism Multiplier

Sequential equivalent of this build:

| Phase | Sequential Time |
|-------|----------------|
| 9 labs × 45 min each | ~7 hrs |
| 12 modules × 90 min each | ~18 hrs |
| Infrastructure | 30 min |
| Validation | 30 min |
| Meta-layer | 2 hrs |
| NotebookLM | 3 hrs |
| **Sequential total** | **~31 hrs** |

Parallel execution compresses 31+ hours to 8–13 hours. The ratio improves further at scale: a 15-lab course does not take proportionally longer because the parallel dispatch overhead is constant.

**The single most important implementation decision in this system is dispatching all lab agents simultaneously in one message.** Do not dispatch them one at a time.

---

## Appendix: Quick-Start Checklist

For experienced users, the minimum steps to begin a new course build:

```
Phase 1 (sequential):
  [ ] Define 3-day arc (3 sentences)
  [ ] Map 9 labs to concepts
  [ ] Map 12 modules to labs
  [ ] Write master outline to docs/plans/
  [ ] Define full CONCEPT_REGISTRY

Phase 2 (single dispatch):
  [ ] Verify progressive-game-lab-framework.md exists
  [ ] Verify section specs are complete for all 9 labs
  [ ] Dispatch all 9 lab agents in one message
  [ ] Monitor: ls -la labs/day*/lab-*.html

Phase 3 (single dispatch):
  [ ] Dispatch all 12 module agents in one message
  [ ] Monitor: ls -la docs/curriculum/modules/*.md

Phase 4 (sequential):
  [ ] Write sandbox/config/{base,restricted,demo}.yaml
  [ ] Write github/templates/{CLAUDE.md-template,skill-template,command-template}.md
  [ ] Write github/templates/prep-course-env.sh + chmod +x

Phase 5 (1 agent):
  [ ] Dispatch validation agent
  [ ] Fix all FAIL findings
  [ ] Confirm PASS before proceeding

Phase 6 (parallel):
  [ ] Dispatch BUILD-LOG, LESSONS-LEARNED, and prompts/ agents simultaneously

Phase 7 (async):
  [ ] Authenticate NotebookLM
  [ ] Upload all 12 modules
  [ ] Trigger media generation
  [ ] Extract URLs to ARTIFACT-URLS.md
  [ ] Write README.md
```

---

*This document is part of the Agentic AI Engineering course build system. For the lab design specification that governs all interactive content, see `docs/curriculum/progressive-game-lab-framework.md`. For the specific build record of the 2026-03-15 course, see `docs/meta/BUILD-LOG.md`.*
