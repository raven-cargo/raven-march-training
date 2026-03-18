# Feedback Sprint v6 — Modules 01-03 Fixes
## Agentic AI Engineering Course

**Created**: 2026-03-17
**Source**: User feedback on Modules 01-03 (9 items)
**Scope**: 3 module markdown files, module-viewer.html, example reference file

---

## Feedback-to-Task Mapping

| # | Feedback Summary | Change Area | Priority |
|---|-----------------|-------------|----------|
| 1 | Hero sections like labs (particles, gradient text, objectives, scroll) | A. Hero Sections | P1 |
| 2 | Click-box-in-series pattern from m02-patterns.html | E. Pattern Grid Component | P2 |
| 3 | M02 predict-then-reveal for modes comes BEFORE explanation | C. Content Reorder | P1 |
| 4 | Mode decision framework is great | -- (keep as-is) | -- |
| 5 | Click-to-reveal in M02 is better than M01 | F. M01 Interactivity | P2 |
| 6 | Quizzes need 4+ questions each, including a tricky one | D. Quiz Enhancement | P1 |
| 7 | M02 intro too heavy on architecture, use spiral learning | C. Content Reorder | P1 |
| 8 | Rebrand M01 to "Agentic Coding", PRAO = mnemonic for Agentic Loop | B. Rebranding | P1 |
| 9 | More interactivity throughout, less passive scroll | F. M01 Interactivity | P2 |

---

## Architectural Decision: Hero Sections

### The Problem

The lab HTML files (e.g., `lab-01-paradigm-shift.html`) have a full hero section with:
- `#particle-field` canvas with floating dot animation (JS-generated)
- `.hero-label` badge (e.g., "LAB 01")
- `h1` with gradient text
- `.hero-objectives` chips showing learning objectives
- `.scroll-hint` with animated line

Modules are **markdown files** rendered through `module-viewer.html` using `marked.js`. The module-viewer does NOT have a hero rendering system -- it processes markdown into `.module-section` cards with numbered headers.

### The Solution: `ix-diagram` hero component

Add a new `data-component="module-hero"` to the interactive diagram system. This keeps everything in the markdown pipeline (no module-viewer structural changes needed).

**How it works:**
1. Each module markdown starts with an `ix-diagram` block with `data-component="module-hero"`
2. The block contains: module number, title, subtitle/description, and learning objective items
3. `module-viewer.html` gets a new `initModuleHero(el)` function in the hydration registry
4. The function renders: particle field (JS), gradient title, objective chips, scroll indicator
5. The hero replaces the current H1 + Overview section at the top of each module

**Markup pattern (in markdown):**
```html
<div class="ix-diagram" data-component="module-hero" data-module="01">
  <span class="ix-hero-label">Module 01</span>
  <h1 class="ix-hero-title">Agentic Coding</h1>
  <p class="ix-hero-subtitle">The paradigm shift from autocomplete to agency</p>
  <div class="ix-hero-objectives">
    <span class="ix-hero-chip">Distinguish agentic AI from autocomplete</span>
    <span class="ix-hero-chip">Articulate the Agentic Loop (PRAO)</span>
    <span class="ix-hero-chip">Identify the mental model shift</span>
    <span class="ix-hero-chip">Recognize task suitability</span>
  </div>
</div>
```

This approach:
- Stays within the existing `ix-diagram` component system
- No changes to the module-viewer's markdown fetch/parse pipeline
- Hero CSS/JS lives in module-viewer.html alongside other `ix-*` styles
- Each module controls its own hero content via markdown

### New Component: Pattern Grid (from m02-patterns.html)

The `m02-patterns.html` example shows a "click to reveal scope" pattern:
- Grid of items with syntax + meaning columns
- Hidden scope badge revealed on click
- Expanded example text appears on click
- Grouped by category with section labels

This maps to a new `data-component="pattern-grid"` in the ix-diagram system. Useful for:
- M02 permission patterns (directly from the example)
- M01 could use it for era characteristics or PRAO phase signals
- M03 could use it for tool call pattern recognition

---

## Least-to-Most Decomposition

### Level 0 -- Zero Dependencies (Infrastructure)

| ID | Task | File |
|----|------|------|
| T001 | Add `module-hero` CSS styles | `module-viewer.html` |
| T002 | Add `module-hero` JS hydration function | `module-viewer.html` |
| T003 | Add `pattern-grid` CSS styles | `module-viewer.html` |
| T004 | Add `pattern-grid` JS hydration function | `module-viewer.html` |
| T005 | Register both new components in `hydrateInteractiveDiagrams` switch | `module-viewer.html` |

### Level 1 -- Depends on Level 0 (Content Changes)

| ID | Task | File |
|----|------|------|
| T006 | Add hero block to Module 01 | `01-paradigm-shift.md` |
| T007 | Add hero block to Module 02 | `02-claude-code-foundations.md` |
| T008 | Add hero block to Module 03 | `03-agent-thinking.md` |
| T009 | Rebrand M01: "Agentic Coding" + "Agentic Loop" + PRAO as mnemonic | `01-paradigm-shift.md` |
| T010 | Update PRAO references in M02 to say "Agentic Loop (PRAO)" | `02-claude-code-foundations.md` |
| T011 | Update PRAO references in M03 to say "Agentic Loop (PRAO)" | `03-agent-thinking.md` |

### Level 2 -- Depends on Level 1 (Content Restructuring)

| ID | Task | File |
|----|------|------|
| T012 | M02: Move predict-reveal for modes BEFORE the Deep Dive details block | `02-claude-code-foundations.md` |
| T013 | M02: Lighten architecture intro in Overview, add docs link, remove repetition from M01 | `02-claude-code-foundations.md` |
| T014 | M01: Add pattern-grid diagram for era characteristics or PRAO signals | `01-paradigm-shift.md` |
| T015 | M01: Add more interactive elements to passive-scroll sections | `01-paradigm-shift.md` |

### Level 3 -- Depends on Level 2 (Quiz Enhancement)

| ID | Task | File |
|----|------|------|
| T016 | M01 Quiz Audit: Expand all quizzes to 4+ questions with 1 tricky each | `01-paradigm-shift.md` |
| T017 | M02 Quiz Audit: Expand all quizzes to 4+ questions with 1 tricky each | `02-claude-code-foundations.md` |
| T018 | M03 Quiz Audit: Expand all quizzes to 4+ questions with 1 tricky each | `03-agent-thinking.md` |

### Level 4 -- Validation

| ID | Task | File |
|----|------|------|
| T019 | Verify all 3 modules render correctly in module-viewer, test all new components | Browser testing |

---

## Implementation Strategy: Mixed (Top-to-Bottom for hero, Bottom-to-Top for content)

**Rationale:** The hero component and pattern-grid are new infrastructure that must work before content can use them (bottom-to-top). The content changes (rebranding, reordering, quizzes) follow the existing ix-diagram patterns and can be done top-to-bottom since the framework exists.

---

## Phase Breakdown

### Phase 1: Module-Viewer Infrastructure (T001-T005)
**Goal:** Add two new ix-diagram components to module-viewer.html
**Files touched:** 1 (`module-viewer.html`)
**Estimated effort:** 1 agent session

#### Tasks

- [ ] T001 Add `module-hero` CSS to module-viewer.html -- styles for `.ix-hero-shell`, particle field, gradient title, objective chips, scroll indicator. Match lab-01's visual language: `--bg-base` background, `particle-field` with floating colored dots, gradient text on h1, pill-shaped objective chips with checkmark icons, pulsing scroll-line at bottom. Full-viewport-height section.

- [ ] T002 Add `initModuleHero(el)` JS function to module-viewer.html -- reads child elements (`.ix-hero-label`, `h1.ix-hero-title`, `.ix-hero-subtitle`, `.ix-hero-chip` items), builds the hero DOM: creates particle field (20 particles, 4 colors matching design system), wraps title in gradient, renders chips as flex row, adds scroll-hint div. Apply `IntersectionObserver` for fade-in. Particle generation logic: clone from lab-01's `buildParticles()` pattern.

- [ ] T003 Add `pattern-grid` CSS to module-viewer.html -- styles for `.ix-pattern-grid`, `.ix-pattern-row` (grid layout: syntax column + meaning column + scope badge), `.ix-pattern-scope` badges (broad=red, scoped=green, exact=blue, hidden=gray), `.ix-pattern-example` (revealed on click), `.ix-pattern-section-label`. Match m02-patterns.html design: dark background, JetBrains Mono for syntax, hover translateX(3px), revealed state.

- [ ] T004 Add `initPatternGrid(el)` JS function to module-viewer.html -- reads `.ix-pg-section` groups and `.ix-pg-item` children with `data-syntax`, `data-meaning`, `data-scope`, `data-example` attributes. Builds the interactive grid: hidden scope badge shows on click, example text expands below row. Click toggles `.revealed` class. No re-hide (one-way reveal like other ix components).

- [ ] T005 [P] Register `module-hero` and `pattern-grid` in `hydrateInteractiveDiagrams` switch statement in module-viewer.html -- add two case entries: `case 'module-hero': initModuleHero(el); break;` and `case 'pattern-grid': initPatternGrid(el); break;`

### Phase 2: Hero Sections + Rebranding (T006-T011)
**Goal:** All 3 modules have hero sections; PRAO rebranded to Agentic Loop
**Files touched:** 3 (all module markdown files)
**Estimated effort:** 1 agent session (3 agents in parallel, one per module)

#### Tasks

- [ ] T006 [P] Add `module-hero` ix-diagram block at the very top of Module 01 (before the current `## Overview` section). Remove or fold the existing H1 + Overview paragraph into the hero. Content: label="Module 01", title="Agentic Coding", subtitle="The paradigm shift from autocomplete to agency", chips = 4 learning objectives from the current list. File: `docs/curriculum/modules/01-paradigm-shift.md`

- [ ] T007 [P] Add `module-hero` ix-diagram block at the very top of Module 02. Content: label="Module 02", title="Claude Code Foundations", subtitle="Modes, CLAUDE.md, permissions, and MCP servers", chips = 4 learning objectives. File: `docs/curriculum/modules/02-claude-code-foundations.md`

- [ ] T008 [P] Add `module-hero` ix-diagram block at the very top of Module 03. Content: label="Module 03", title="Agent Thinking", subtitle="Reading reasoning traces and knowing when to intervene", chips = 5 learning objectives (from current list). File: `docs/curriculum/modules/03-agent-thinking.md`

- [ ] T009 Rebrand Module 01 throughout. Changes required in `docs/curriculum/modules/01-paradigm-shift.md`:
  - H1 title: "The Paradigm Shift" -> "Agentic Coding"
  - Section 1.2 heading: rename from "The PRAO Loop" to "The Agentic Loop"
  - First mention of PRAO: frame as "We use the mnemonic **PRAO** (Perceive, Reason, Act, Observe) to remember the four phases of the **Agentic Loop**."
  - All subsequent standalone "PRAO" references -> "Agentic Loop (PRAO)" or "the Agentic Loop" depending on context
  - Section headings that say "PRAO" -> "Agentic Loop"
  - Click-card labels, callout text, quiz questions: update to use "Agentic Loop" as the primary term, PRAO as the mnemonic
  - Keep PRAO letters in the cycle diagram (P-R-A-O flow nodes) -- those are the mnemonic
  - Approximately 18 PRAO occurrences to review and selectively update

- [ ] T010 [P] Update the single PRAO reference in Module 02 to say "Agentic Loop (PRAO)" for consistency. File: `docs/curriculum/modules/02-claude-code-foundations.md`

- [ ] T011 [P] Update PRAO references in Module 03 (18 occurrences) to use "Agentic Loop" as primary term with PRAO as mnemonic. Same pattern as T009. Keep P/R/A/O phase labels on flow nodes and trace annotations. File: `docs/curriculum/modules/03-agent-thinking.md`

### Phase 3: Content Restructuring (T012-T015)
**Goal:** M02 content reordered, M01 interactivity improved
**Files touched:** 2 (`01-paradigm-shift.md`, `02-claude-code-foundations.md`)
**Estimated effort:** 1 agent session

#### Tasks

- [ ] T012 Reorder Module 02 section 2.1: The current order is (1) objective, (2) one-line intro, (3) predict-reveal, (4) Deep Dive details with mode explanations. The predict-reveal already comes BEFORE the Deep Dive -- but the one-line intro sentence "Claude Code has two invocation modes that differ in context accumulation, human interaction, and system integration" gives away the concept before the prediction. Fix: move that sentence INTO the Deep Dive details block so the predict-reveal is truly a cold prediction. The student should see only the objective + predict-reveal before any mode explanation. File: `docs/curriculum/modules/02-claude-code-foundations.md`

- [ ] T013 Lighten Module 02 Overview section. Current Overview starts with a deep explanation of the four topics. Changes: (1) Remove the `<details class="ix-collapse">` Deep Dive block from the Overview -- it repeats M01 concepts. (2) Replace with a concise 2-sentence intro that says "Module 01 introduced the Agentic Loop. This module gives you the practical tools: modes, CLAUDE.md, permissions, and MCP servers." (3) Add a link: "For architecture context, see [Claude Code documentation](https://docs.anthropic.com/en/docs/claude-code)." (4) Keep the learning objectives list but move it into the hero chips (T007 handles this). File: `docs/curriculum/modules/02-claude-code-foundations.md`

- [ ] T014 Add a `pattern-grid` interactive diagram to Module 01. Best candidate section: Section 1.1 "Three Eras" -- replace or supplement the existing era comparison with a pattern-grid where students click each era to reveal its characteristics (scope of context, human role, feedback loop type). Alternative: Section 1.2 could use a pattern-grid for PRAO phase signals (tool call types mapped to phases). Choose whichever section currently has the most passive scrolling. File: `docs/curriculum/modules/01-paradigm-shift.md`

- [ ] T015 Add more interactive elements to Module 01 passive-scroll sections. Audit each section for long prose runs without interactivity. Target sections:
  - Section 1.3 "The Mental Model Shift" -- add a predict-reveal or intervention component
  - Section 1.4 "Task Suitability" -- currently has a quadrant diagram; add a scenario-based reveal-quiz or click-cards for the suitability categories
  - Any section with >300 words of unbroken prose: break with a callout, predict-reveal, or click-cards
  File: `docs/curriculum/modules/01-paradigm-shift.md`

### Phase 4: Quiz Enhancement (T016-T018)
**Goal:** Every quiz has 4+ questions including 1 tricky question
**Files touched:** 3 (all module markdown files)
**Estimated effort:** 1 agent session (3 agents in parallel)

#### Current Quiz Audit

**Module 01** (3 quizzes):
| Quiz ID | Title | Current Qs | Need | Action |
|---------|-------|-----------|------|--------|
| m01-eras-check | Era Identification | 3 | +1 tricky | Add Q4: tricky edge case (hybrid workflow that spans two eras) |
| m01-prao-check | PRAO Signal Recognition | 3 | +1 tricky | Add Q4: tricky scenario (ambiguous phase boundary) |
| m01-suitability-check | Should You Use The Agent? | 2 | +2 (one tricky) | Add Q3 + Q4 tricky: task that SEEMS suitable but has a hidden disqualifier |

**Module 02** (4 quizzes):
| Quiz ID | Title | Current Qs | Need | Action |
|---------|-------|-----------|------|--------|
| m02-mode-check | Mode Selection | 2 | +2 (one tricky) | Add Q3 + Q4 tricky: scenario where either mode could work but one is clearly better |
| m02-claudemd-check | CLAUDE.md Scope Hygiene | 2 | +2 (one tricky) | Add Q3 + Q4 tricky: item that seems like it belongs in CLAUDE.md but doesn't |
| m02-permissions-check | Permission Evaluation | 2 | +2 (one tricky) | Add Q3 + Q4 tricky: complex allow/deny interaction |
| m02-mcp-check | MCP Configuration | 2 | +2 (one tricky) | Add Q3 + Q4 tricky: transport confusion (SSE deprecated, Streamable HTTP only) |

**Module 03** (5 quizzes):
| Quiz ID | Title | Current Qs | Need | Action |
|---------|-------|-----------|------|--------|
| m03-output-layers-check | Reading Output Layers | 2 | +2 (one tricky) | Add Q3 + Q4 tricky |
| m03-pattern-check | Pattern Recognition Drill | 2 | +2 (one tricky) | Add Q3 + Q4 tricky |
| m03-clarification-check | Clarification Handling | 2 | +2 (one tricky) | Add Q3 + Q4 tricky |
| m03-intervention-decision-check | Intervene or Continue | 3 | +1 tricky | Add Q4 tricky |
| m03-final-knowledge-check | Module 03 Final | 5 | 0 (already has 5) | Add 1 tricky if none exists |

#### Tasks

- [ ] T016 [P] Module 01 Quiz Enhancement. For each of the 3 quizzes, add questions to reach 4 minimum. Each new question must include: `ix-quiz-question` wrapper, `ix-quiz-prompt` with bold Q number, 4 `ix-quiz-option` buttons (one with `data-correct="true"`), `ix-quiz-explanation` paragraph. At least one question per quiz must be a "tricky" question that tests edge cases or common misconceptions. Update `data-xp` values proportionally. File: `docs/curriculum/modules/01-paradigm-shift.md`

- [ ] T017 [P] Module 02 Quiz Enhancement. For each of the 4 quizzes, add questions to reach 4 minimum. Same format requirements as T016. Tricky questions should test: mode edge cases (when interactive seems right but isn't), CLAUDE.md anti-patterns, permission evaluation order, MCP transport protocol (SSE deprecated). Update `data-xp` values. File: `docs/curriculum/modules/02-claude-code-foundations.md`

- [ ] T018 [P] Module 03 Quiz Enhancement. For each of the 5 quizzes, add questions where needed to reach 4 minimum. The final knowledge check already has 5 questions -- verify at least one is genuinely tricky. Tricky questions should test: distinguishing thoroughness from loops, intervention timing edge cases, extended thinking misuse. Update `data-xp` values. File: `docs/curriculum/modules/03-agent-thinking.md`

### Phase 5: Validation (T019)
**Goal:** Everything renders and functions correctly
**Estimated effort:** Manual browser testing

- [ ] T019 Open each module in module-viewer.html and verify: (1) Hero section renders with particles, gradient text, chips, scroll indicator. (2) Pattern-grid components are interactive (click reveals scope + example). (3) All quizzes have 4+ questions and function correctly. (4) PRAO -> Agentic Loop rebranding is consistent. (5) M02 predict-reveal comes before mode explanation. (6) No broken ix-diagram components. (7) XP system still tracks correctly.

---

## Dependency Graph

```
Phase 1 (Infra)          Phase 2 (Content)         Phase 3 (Restructure)    Phase 4 (Quizzes)
T001 CSS hero     ─┐
T002 JS hero      ─┤
T003 CSS pattern  ─┼──> T005 register ──┐
T004 JS pattern   ─┘                    │
                                        ├──> T006 M01 hero [P] ──┐
                                        ├──> T007 M02 hero [P]   │
                                        ├──> T008 M03 hero [P]   │
                                        ├──> T009 M01 rebrand ───┼──> T014 M01 pattern-grid ──> T016 M01 quizzes [P]
                                        ├──> T010 M02 rebrand [P]├──> T012 M02 reorder      ──> T017 M02 quizzes [P]
                                        └──> T011 M03 rebrand [P]├──> T013 M02 lighten       ──> T018 M03 quizzes [P]
                                                                  └──> T015 M01 interactivity
                                                                                                        │
                                                                                                        v
                                                                                                   T019 Validate
```

## Parallel Opportunities

| Parallel Group | Tasks | Rationale |
|---------------|-------|-----------|
| Phase 1 CSS+JS | T001, T002, T003, T004 | Different sections of same file, no overlap |
| Phase 2 Heroes | T006, T007, T008 | Different files |
| Phase 2 Rebrand | T009, T010, T011 | Different files (T009 is largest) |
| Phase 4 Quizzes | T016, T017, T018 | Different files |

## Critical Path

T001+T002 -> T005 -> T006 -> T009 -> T015 -> T016 -> T019

Estimated total: **4 agent sessions** if parallelized, **6 sessions** if sequential.

---

## Agent Count Needed

| Phase | Agents | Assignment |
|-------|--------|------------|
| Phase 1 | 1 | Single agent edits module-viewer.html (all CSS+JS changes in one file) |
| Phase 2 | 3 | One agent per module file (M01, M02, M03) working in parallel |
| Phase 3 | 2 | One agent for M01 (T014, T015), one for M02 (T012, T013) |
| Phase 4 | 3 | One agent per module file for quiz expansion |
| Phase 5 | 1 | Manual validation |

**Total unique agents needed: 3** (one per module file + the module-viewer agent)
**Peak parallelism: 3 agents** (Phase 2 and Phase 4)

---

## Summary of Changes

| Area | What Changes | Impact |
|------|-------------|--------|
| **Hero Sections** | New `module-hero` ix-diagram component + hero blocks in all 3 modules | Visual: modules open with lab-quality hero sections |
| **Pattern Grid** | New `pattern-grid` ix-diagram component + usage in M01 | Interactivity: click-to-reveal categorization pattern |
| **Rebranding** | "PRAO Loop" -> "Agentic Loop" with PRAO as mnemonic across all 3 modules | Conceptual: clearer framing, PRAO stays as memory aid |
| **M02 Reorder** | Predict-reveal truly before mode explanation; lighter overview | Pedagogy: predict-then-learn sequence restored |
| **Quiz Enhancement** | 12 quizzes audited, ~20 new questions added, each quiz gets 1+ tricky question | Assessment: deeper testing, edge case awareness |
| **M01 Interactivity** | Pattern-grid + additional interactive elements in passive sections | Engagement: M01 catches up to M02 quality |

**Total task count:** 19
**Tasks per module:** M01=6, M02=5, M03=4, module-viewer=5, validation=1
**New questions to write:** ~20 across 12 quizzes
**New ix-diagram components:** 2 (module-hero, pattern-grid)

---

## Content Accuracy Reminders (Zero-Tolerance)

When writing new quiz questions, enforce these rules:
1. No `--thinking` flag (not a real Claude Code CLI flag)
2. No `--context` flag (doesn't exist)
3. No `/memory` command (not native Claude Code)
4. SSE deprecated 2025-03-26 -- remote MCP = Streamable HTTP only
5. Exactly THREE MCP primitives: Tools, Resources, Prompts
6. `settings.json` permissions: `{"permissions": {"allow": [...], "deny": [...]}}`
7. CLAUDE.md is read at session start, never invoked as a slash command
