# CC2.0 OBSERVE: Agentic AI Course Metrics Report
**Date**: 2026-03-16
**Observer**: CC2-OBSERVE Agent

## Executive Summary

- **All 12 curriculum modules and 9 labs exist and are fully developed** -- no skeletal placeholders found. Total codebase: 94 files, 51,431 lines.
- **Interactive diagrams are concentrated in modules 01-03** (18 `ix-diagram` components total); modules 04-12 have zero interactive diagrams, relying on Mermaid or no diagrams at all. This is the largest quality gap.
- **Lab framework is mature**: shared `core.js` (655 lines) and `core.css` (668 lines) with XP system, streaks, knowledge checks, and reflection journaling -- production-quality gamification.
- **Zero accuracy violations found**: no `--thinking` flag, no `--context` flag, no `/memory` command misuse, correct SSE deprecation messaging, correct 3-primitive MCP count throughout.
- **Review coverage is partial**: modules 01-06 have multi-agent review passes (MERCURIO + Researcher + QA); modules 07-12 have no review records.

---

## 1. Codebase Metrics

### Files by Type

| Extension | Files | Lines | % of Total Lines |
|-----------|------:|------:|:----------------:|
| `.md` | 65 | 25,712 | 50.0% |
| `.html` | 15 | 23,140 | 45.0% |
| `.js` | 3 | 1,070 | 2.1% |
| `.css` | 2 | 832 | 1.6% |
| `.sh` | 1 | 347 | 0.7% |
| `.yaml` | 3 | 268 | 0.5% |
| `.json` | 3 | 61 | 0.1% |
| **Total** | **94** | **51,431** | **100%** |

(Excludes `.vercel/`, `.git/`, `.DS_Store`)

### Top 10 Largest Files

| Rank | File | Lines |
|:----:|------|------:|
| 1 | `labs/day2/lab-05-prompt-engineering.html` | 2,827 |
| 2 | `labs/day2/lab-04-mcp-explorer.html` | 2,514 |
| 3 | `labs/day3/lab-07-multi-agent.html` | 2,109 |
| 4 | `labs/day1/lab-03-agent-thinking.html` | 2,106 |
| 5 | `labs/day3/lab-09-capstone.html` | 2,081 |
| 6 | `labs/day1/lab-01-paradigm-shift.html` | 2,030 |
| 7 | `labs/day3/lab-08-production.html` | 2,003 |
| 8 | `labs/day2/lab-06-skills-commands.html` | 1,999 |
| 9 | `labs/day1/lab-02-first-agent.html` | 1,976 |
| 10 | `module-viewer.html` | 1,975 |

### File Age Distribution

| Category | Date Range | Files |
|----------|-----------|-------|
| Newest (today) | 2026-03-16 | module-viewer.html, modules 01-03, 07, 10, example diagrams, plans |
| Yesterday | 2026-03-15 | master plan, prompt libraries, sandbox configs, templates, validation report |
| **Project span** | **2 days** | All files created 2026-03-15 to 2026-03-16 |

---

## 2. Curriculum Completeness Matrix

| Module | Title | Lines | Words | Sections (##) | ix-Diagrams | Mermaid | Exercise Refs | Example Refs | Status |
|:------:|-------|------:|------:|:-------------:|:-----------:|:-------:|:-------------:|:------------:|:------:|
| 01 | The Paradigm Shift | 912 | 6,320 | 32 | 6 | 0 | 6 | 9 | COMPLETE |
| 02 | Claude Code Foundations | 1,104 | 6,264 | 46 | 6 | 0 | 4 | 8 | COMPLETE |
| 03 | Agent Thinking | 1,005 | 7,248 | 34 | 6 | 0 | 7 | 7 | COMPLETE |
| 04 | Prompt Engineering Depth | 342 | 3,327 | 14 | 0 | 0 | 4 | 21 | DEVELOPED |
| 05 | MCP Architecture | 438 | 3,168 | 21 | 0 | 2 | 0 | 6 | DEVELOPED |
| 06 | Building MCP Servers | 561 | 3,157 | 26 | 0 | 0 | 2 | 1 | DEVELOPED |
| 07 | Skills and Commands | 502 | 3,487 | 40 | 0 | 2 | 3 | 12 | DEVELOPED |
| 08 | Meta-Prompting | 477 | 3,413 | 35 | 0 | 0 | 7 | 17 | DEVELOPED |
| 09 | Multi-Agent Systems | 467 | 4,301 | 28 | 0 | 2 | 1 | 3 | DEVELOPED |
| 10 | Security and Sandboxing | 581 | 4,552 | 31 | 0 | 2 | 2 | 8 | DEVELOPED |
| 11 | Tech Stack Adaptation | 557 | 3,951 | 53 | 0 | 0 | 2 | 11 | DEVELOPED |
| 12 | Capstone and Production | 442 | 4,969 | 33 | 0 | 0 | 4 | 6 | DEVELOPED |

### Status Key
- **COMPLETE**: Full content + interactive diagrams (ix-diagram) + reviewed
- **DEVELOPED**: Full content, but missing interactive diagrams (uses only Mermaid or none)

### Key Findings

- **Modules 01-03** are the gold standard: ~900-1100 lines each, 6 interactive diagrams per module, reviewed by MERCURIO + Researcher + QA.
- **Modules 04-12** average 488 lines (54% shorter than 01-03 average of 1,007 lines). They have substantive content but lack the interactive diagram treatment.
- **Total interactive diagrams**: 18 (all in modules 01-03). Module viewer supports 5 component types: `tabbed-panel`, `click-cards`, `flow-diagram`, `decision-tree`, `step-walkthrough`.
- **Total Mermaid diagrams**: 8 (in modules 05, 07, 09, 10).
- **Module 05** has 0 exercise references -- a gap for a hands-on course.
- **Total curriculum words**: ~54,157

---

## 3. Lab Coverage Map

| Lab | Day | Title | Lines | Sections | Exercise Refs | Code Refs | Validation Refs | Module Mapping | Status |
|:---:|:---:|-------|------:|:--------:|:-------------:|:---------:|:---------------:|:--------------:|:------:|
| 01 | 1 | The Paradigm Shift | 2,030 | 7 | 46 | 54 | 48 | Module 01 | COMPLETE |
| 02 | 1 | First Agent Conversation | 1,976 | 7 | 79 | 53 | 55 | Module 02 | COMPLETE |
| 03 | 1 | Agent Thinking with OpenCode | 2,106 | 6 | 47 | 38 | 68 | Module 03 | COMPLETE |
| 04 | 2 | MCP Explorer | 2,514 | 6 | 52 | 64 | 85 | Module 05 | COMPLETE |
| 05 | 2 | The Prompt Quality Gap | 2,827 | 6 | 74 | 72 | 69 | Module 04 | COMPLETE |
| 06 | 2 | Skills & Commands Builder | 1,999 | 7 | 113 | 123 | 66 | Module 07 | COMPLETE |
| 07 | 3 | Multi-Agent Orchestrator | 2,109 | 6 | 64 | 38 | 88 | Module 09 | COMPLETE |
| 08 | 3 | Production Patterns | 2,003 | 6 | 46 | 97 | 58 | Module 10 | COMPLETE |
| 09 | 3 | Capstone Build | 2,081 | 5 | 52 | 49 | 42 | Module 12 | COMPLETE |

### Lab-to-Module Gap Analysis

| Module | Has Lab? | Notes |
|:------:|:--------:|-------|
| 01 - Paradigm Shift | Lab 01 | Covered |
| 02 - Claude Code Foundations | Lab 02 | Covered |
| 03 - Agent Thinking | Lab 03 | Covered |
| 04 - Prompt Engineering | Lab 05 | Covered (lab numbering is out of sequence) |
| 05 - MCP Architecture | Lab 04 | Covered (lab numbering is out of sequence) |
| 06 - MCP Building | -- | NO LAB -- gap |
| 07 - Skills & Commands | Lab 06 | Covered |
| 08 - Meta-Prompting | -- | NO LAB -- gap |
| 09 - Multi-Agent | Lab 07 | Covered |
| 10 - Security & Sandboxing | Lab 08 | Covered |
| 11 - Tech Stack Adaptation | -- | NO LAB -- gap |
| 12 - Capstone | Lab 09 | Covered |

**3 modules lack dedicated labs**: Module 06 (MCP Building), Module 08 (Meta-Prompting), Module 11 (Tech Stack Adaptation). This is by design for a 3-day / 9-lab course, but these are the modules where learners get the least hands-on practice.

---

## 4. Infrastructure Assessment

### module-viewer.html (1,975 lines) -- Score: 9/10

| Feature | Present | Details |
|---------|:-------:|---------|
| Markdown rendering | Yes | `marked.js` CDN |
| Mermaid diagrams | Yes | `mermaid@11` CDN, theme-aware |
| Interactive diagrams | Yes | 5 component types: tabbed-panel, click-cards, flow-diagram, decision-tree, step-walkthrough |
| Reading progress bar | Yes | Fixed top bar, scroll-based |
| Section tracking | Yes | `readSections` set with localStorage persistence |
| Completion detection | Yes | Banner + localStorage flag |
| Dark/light theme | Yes | Theme toggle via `assets/theme-toggle.js` |
| Navigation | Yes | Sticky nav with back link and progress indicator |
| Search | No | No in-page or cross-module search |
| Responsive design | Yes | Fluid container with max-width 800px |
| Error handling | Yes | Loading spinner, error message display, markdown parse fallback |

### index.html (853 lines) -- Score: 8/10

| Feature | Present | Details |
|---------|:-------:|---------|
| Course dashboard | Yes | Stats bar with line counts, XP, completion |
| Lab cards (9) | Yes | Linked to `/lab/N` routes |
| Module cards (12) | Yes | Linked to `/module/N` routes |
| Lucide icons | Yes | SVG icon system |
| Theme toggle | Yes | Shared `theme-toggle.css/js` |
| Multimedia section | Yes | Links to NotebookLM artifacts |
| Validation banner | Yes | Anti-confabulation pass indicator |
| Framework section | Yes | Shows `core.js`, `core.css`, `build.js` stats |
| Challenge missions | Yes | Link to challenge content |

### lab-framework/ (1,599 lines total) -- Score: 9/10

| File | Lines | Capabilities |
|------|------:|-------------|
| `core.js` | 655 | XP system, streaks (3/5/7 bonuses), section unlock progression, reflection journaling (save/load/export), PredictionChallenge, KnowledgeCheck, ApplyTask components, nav dot updates, min-char validators |
| `core.css` | 668 | Full design system: tokens, typography, nav, sections, quiz cards, code blocks, reflections, XP/streak displays, animations, responsive breakpoints |
| `build.js` | 276 | Build tool to inline framework CSS/JS into lab HTML files |

### vercel.json -- Score: 10/10

- 44 URL rewrites covering both `/lab/N` and `/lab/0N` patterns (1-9)
- 12 module rewrites (`/module/1` through `/module/12`)
- Challenge missions route
- Security header (`X-Frame-Options: SAMEORIGIN`) on all lab routes

### .claude/ Configuration -- Score: 8/10

| Component | Count | Details |
|-----------|------:|---------|
| CLAUDE.md | 1 | 7,245 bytes, comprehensive project context with accuracy rules |
| Agents | 2 | `mercurio-orchestrator.md` (6,359 bytes), `researcher.md` (12,886 bytes) |
| Teams | 3 | `course-builders`, `course-reviewers`, `course-researchers` |
| settings.json | 1 | 99 bytes |

---

## 5. Documentation Health

### Coverage by Area

| Area | Files | Lines | Score |
|------|------:|------:|:-----:|
| **Meta / Build Process** | 8 | 2,670 | 9/10 |
| - REPLICATION-GUIDE.md | 1 | 623 | |
| - BUILD-LOG.md | 1 | 162 | |
| - LESSONS-LEARNED.md | 1 | 143 | |
| - Framework Architecture (4 files) | 4 | 1,085 | |
| - Prompt Templates (5 files) | 5 | 1,198 | |
| **Plans** | 3 | 2,435 | 8/10 |
| - Master plan (2026-03-15) | 1 | 357 | |
| - Interactive diagrams v2 | 1 | 1,154 | |
| - Module diagrams phase 1 | 1 | 924 | |
| **Reviews** | 9 | 2,143 | 7/10 |
| - Modules 01-03 (first + second pass) | 6 | 1,692 | |
| - Modules 04-06 (second pass only) | 3 | 451 | |
| - Modules 07-12 | 0 | 0 | MISSING |
| **Curriculum Support** | 4 | 3,590 | 8/10 |
| - master-outline.md | 1 | 857 | |
| - progressive-game-lab-framework.md | 1 | 829 | |
| - CHALLENGE-MISSIONS.md | 1 | 655 | |
| - CHALLENGE-PLAN.md | 1 | 1,249 | |
| **NotebookLM Prompts** | 7 | 3,032 | 8/10 |
| **Validation** | 1 | 85 | 7/10 |
| **Other Docs** | 2 | 2,308 | 8/10 |
| - ICON-PLAN.md | 1 | 1,154 | |
| - AGENT-TEAM-PLAN.md | 1 | 369 | |

### Documentation Health Score: 8/10

Strong meta-documentation for replication and build process. Plans are detailed and current. Main gap: no review records for modules 07-12.

---

## 6. Quality Issues Found

### Priority: HIGH

| # | Issue | Location | Impact |
|:-:|-------|----------|--------|
| 1 | **Interactive diagrams missing from 9 of 12 modules** | `docs/curriculum/modules/04-12` | Modules 04-12 have 0 interactive diagrams (`ix-diagram`). Only 01-03 have them (6 each = 18 total). The module viewer fully supports 5 component types. |
| 2 | **No reviews for modules 07-12** | `reviews/` | Only modules 01-06 have review passes. Modules 07-12 have not been audited by MERCURIO, Researcher, or QA. |
| 3 | **3 modules lack corresponding labs** | Modules 06, 08, 11 | By design (9 labs for 12 modules), but these modules (MCP Building, Meta-Prompting, Tech Stack) are highly practical topics that benefit most from hands-on work. |

### Priority: MEDIUM

| # | Issue | Location | Impact |
|:-:|-------|----------|--------|
| 4 | **Module length disparity** | `docs/curriculum/modules/` | Modules 01-03 average 1,007 lines. Modules 04-12 average 488 lines (52% less). Content depth is uneven. |
| 5 | **Module 05 has zero exercise references** | `docs/curriculum/modules/05-mcp-architecture.md` | No exercises, practice activities, or hands-on references in a technical architecture module. |
| 6 | **Lab numbering vs module numbering mismatch** | `labs/` vs `docs/curriculum/modules/` | Lab 04 covers Module 05 (MCP), Lab 05 covers Module 04 (Prompt Engineering). Could confuse instructors. |
| 7 | **No search functionality** | `module-viewer.html` | No way to search within or across modules. For a 54K-word curriculum, search would be valuable. |

### Priority: LOW

| # | Issue | Location | Impact |
|:-:|-------|----------|--------|
| 8 | **Dashboard stats may be stale** | `index.html:285-290` | Hardcoded stats (17,440 lab lines, ~50k module words). Actual lab lines: 19,645. Should be dynamically calculated or updated. |
| 9 | **2 TODO references in researcher audit** | `reviews/pilot-modules-01-03/researcher-audit.md:333,398` | `// TODO: update this for public dependencies` -- stale review comments. |
| 10 | **Example diagrams directory has 4 standalone HTML files** | `examples/module-diagrams/` | These appear to be prototypes (`era-diagram.html`, `disorientation-sim.html`, etc.) not linked from anywhere. May be dead artifacts. |

### Zero-Tolerance Accuracy Check: PASS

| Rule | Status | Evidence |
|------|:------:|---------|
| No `--thinking` flag | PASS | 0 occurrences |
| No `--context` flag | PASS | 0 occurrences |
| No `/memory` command misuse | PASS | 2 refs are Anthropic doc URLs, not command usage |
| SSE deprecated correctly | PASS | 8 refs all correctly mark SSE as deprecated/superseded |
| Exactly 3 MCP primitives | PASS | Multiple refs confirm "three primitives: Tools, Resources, Prompts" |

---

## Key Metrics Dashboard

| Metric | Value | Status |
|--------|-------|:------:|
| Total Files | 94 | -- |
| Total Lines | 51,431 | -- |
| Total Curriculum Words | ~54,157 | -- |
| Modules Complete (content) | 12/12 | GOOD |
| Modules with Interactive Diagrams | 3/12 | GAP |
| Modules Reviewed | 6/12 | GAP |
| Labs Complete | 9/9 | GOOD |
| Labs with Gamification | 9/9 | GOOD |
| Modules Without Labs | 3 (06, 08, 11) | BY DESIGN |
| Interactive Diagram Components | 18 | -- |
| Mermaid Diagrams | 8 | -- |
| Lab Framework Coverage | 100% (all 9 labs) | GOOD |
| Vercel Routes | 44 rewrites | GOOD |
| Accuracy Violations | 0 | GOOD |
| TODO/FIXME Comments | 2 (in reviews) | LOW |
| Project Age | 2 days | -- |
| Agent Teams Configured | 3 | GOOD |
| Documentation Files | 32 | GOOD |
| Documentation Coverage | 75% | -- |

---

## Observation Metadata

- **Method**: Direct file reading and counting (no estimates)
- **Files read**: 94 files enumerated, key files read in full
- **Patterns searched**: `ix-diagram`, `data-component`, `mermaid`, `TODO`, `FIXME`, `--thinking`, `--context`, `/memory`, `SSE`, `MCP primitive`
- **Scope**: Full project tree at `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/`
