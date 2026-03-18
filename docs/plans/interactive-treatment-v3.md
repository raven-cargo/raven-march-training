# Interactive Treatment v3: Modules 01-03 Lab-Quality Upgrade

**Date**: 2026-03-16
**Target**: Raise Modules 01-03 from 3.5-4.5/10 to 8+/10 lab quality
**Scope**: 3 module markdown files + 1 module-viewer.html infrastructure file
**Source Audit**: `modules-readiness-audit.md`

---

## Current State Summary

| Module | Lines | Existing ix-components | Quizzes | Predict-Reveals | Terminal Sims | Accordions | Compares | Score |
|--------|-------|------------------------|---------|-----------------|---------------|------------|----------|-------|
| 01 - Paradigm Shift | 1,188 | 9 (tabbed-panel, agent-trace, click-cards, step-walkthrough) | 3 | 1 | 0 | 0 | 0 | 4/10 |
| 02 - Claude Code Foundations | 1,250 | 9 (click-cards, decision-tree, step-walkthrough, agent-trace, tabbed-panel) | 0 | 0 | 0 | 0 | 0 | 3.5/10 |
| 03 - Agent Thinking | 1,190 | 9 (click-cards, agent-trace, tabbed-panel, decision-tree, step-walkthrough) | 0 | 0 | 0 | 0 | 0 | 4.5/10 |
| **Totals** | **3,628** | **27** | **3** | **1** | **0** | **0** | **0** | **4/10 avg** |

### Already Implemented in module-viewer.html

These component types have full CSS + JS in the viewer and only need content in markdown:

| Component | data-component value | CSS | JS (init function) | Status |
|-----------|---------------------|-----|---------------------|--------|
| Tabbed Panel | `tabbed-panel` | Yes | `initTabbedPanel` | Production |
| Click Cards | `click-cards` | Yes | `initClickCards` | Production |
| Decision Tree | `decision-tree` | Yes | `initDecisionTree` | Production |
| Step Walkthrough | `step-walkthrough` | Yes | `initStepWalkthrough` | Production |
| Agent Trace | `agent-trace` | Yes | `initAgentTrace` | Production (4 variants: terminal, annotated, compare, prao) |
| Flow Diagram | `flow-diagram` | Yes | `initFlowDiagram` | Production |
| Quiz | `quiz` | Yes | `initQuiz` | Production |
| Predict-Reveal | `predict-reveal` | Yes | `initPredictReveal` | Production |

### What Needs Building (3 New Component Types)

Quiz and Predict-Reveal are already implemented. Three new component types need CSS + JS in module-viewer.html:

1. **Terminal Simulation** (`terminal-sim`)
2. **Accordion** (`accordion`)
3. **Side-by-Side Compare** (`compare`)

---

## 5 New Component Types: Design Specifications

### 1. `ix-terminal-sim` -- Terminal Simulation

**data-component**: `terminal-sim`

**Purpose**: Animated terminal showing command input + output lines. Auto-types commands with cursor blink, output appears line by line. Different from `agent-trace` -- this is a raw terminal (no type tags, no annotations), simulating what a student would see in their actual terminal.

**Markup Pattern**:
```html
<div class="ix-diagram" data-component="terminal-sim" data-diagram-id="first-60-seconds" data-speed="1">
  <span class="ix-title">Your first 60 seconds with Claude Code</span>
  <div class="ix-term-line" data-type="command" data-delay="600">claude</div>
  <div class="ix-term-line" data-type="output" data-delay="400">Welcome to Claude Code v1.2.3</div>
  <div class="ix-term-line" data-type="output" data-delay="300">Type your instructions, or /help for commands.</div>
  <div class="ix-term-line" data-type="command" data-delay="800">Refactor the auth module to use JWT tokens instead of session cookies</div>
  <div class="ix-term-line" data-type="thinking" data-delay="500">Thinking...</div>
  <div class="ix-term-line" data-type="tool" data-delay="400">Reading src/auth/session.ts</div>
  <div class="ix-term-line" data-type="tool" data-delay="400">Reading src/auth/middleware.ts</div>
  <div class="ix-term-line" data-type="output" data-delay="600">I'll refactor the auth module. Here's my plan:</div>
</div>
```

**CSS Design**:
- Dark terminal background (#04080f), monospace font (JetBrains Mono)
- Command lines: green prompt character `$` + white text, typed-out animation (characters appear one by one)
- Output lines: muted gray text, fade-in line by line
- Thinking lines: italic purple text with animated dots
- Tool lines: cyan text with tool icon prefix
- Cursor: blinking block cursor during typing, disappears between commands
- Container: rounded corners, 1px border, terminal header bar with 3 dots (red/yellow/green)

**JS Behavior**:
- `initTerminalSim(el)` -- collects `.ix-term-line` children
- Typing animation for `data-type="command"` lines (character by character, ~40ms per char)
- Instant reveal (fade-in) for `data-type="output"` lines
- Controls: play/pause/reset (reuse `ix-trace-btn` pattern)
- Speed control: 0.5x / 1x / 2x (reuse `ix-trace-speed` pattern)
- IntersectionObserver auto-play when scrolled into view
- `prefers-reduced-motion`: skip typing animation, show all lines instantly

**Registration**: Add `case 'terminal-sim': initTerminalSim(el); break;` to `hydrateInteractiveDiagrams`

---

### 2. `ix-accordion` -- Collapsible Content Sections

**data-component**: `accordion`

**Purpose**: Convert prose walls into scannable expandable sections. Click header to expand/collapse with smooth animation. Configurable: single-open (only one section open at a time) or multi-open.

**Markup Pattern**:
```html
<div class="ix-diagram" data-component="accordion" data-diagram-id="best-practices-m01" data-mode="single">
  <span class="ix-title">Best practices summary</span>
  <div class="ix-accordion-item" data-icon="message-square">
    <div class="ix-accordion-header">Prompt Design</div>
    <div class="ix-accordion-body">
      <div class="ix-accordion-do">State outcomes and constraints, not step-by-step instructions</div>
      <div class="ix-accordion-dont">Don't micro-manage each edit or dictate implementation</div>
    </div>
  </div>
  <div class="ix-accordion-item" data-icon="database">
    <div class="ix-accordion-header">Context Management</div>
    <div class="ix-accordion-body">
      <div class="ix-accordion-do">Keep CLAUDE.md current with architectural decisions</div>
      <div class="ix-accordion-dont">Don't dump entire codebases into context</div>
    </div>
  </div>
</div>
```

**CSS Design**:
- Items stack vertically, 1px border between items, rounded outer container
- Header: clickable row with chevron icon (rotates on open), Lucide icon from `data-icon`, label text
- Body: hidden by default, smooth height transition (max-height + overflow hidden technique)
- Do/Don't items: green left border for `.ix-accordion-do`, red left border for `.ix-accordion-dont`
- Active header: slightly brighter background, accent-colored left border
- Matches existing design system: `var(--surface)`, `var(--raised)`, `var(--border)`

**JS Behavior**:
- `initAccordion(el)` -- collects `.ix-accordion-item` children
- Click header toggles body visibility with CSS transition
- `data-mode="single"`: clicking one item closes all others (default)
- `data-mode="multi"`: each item toggles independently
- Chevron rotation animation (0deg -> 90deg)
- First item optionally open by default (if `data-default-open` attribute present)

**Registration**: Add `case 'accordion': initAccordion(el); break;` to `hydrateInteractiveDiagrams`

---

### 3. `ix-compare` -- Side-by-Side Comparison Grid

**data-component**: `compare`

**Purpose**: Two-column layout for Do/Don't, Good/Bad, Before/After comparisons. Color-coded headers, card-based cells.

**Markup Pattern**:
```html
<div class="ix-diagram" data-component="compare" data-diagram-id="good-vs-bad-prompts">
  <span class="ix-title">Effective vs ineffective prompts</span>
  <div class="ix-compare-col" data-label="Effective" data-theme="success">
    <div class="ix-compare-cell">State the outcome: "Refactor auth to use JWT"</div>
    <div class="ix-compare-cell">Include constraints: "Keep the existing API contract"</div>
    <div class="ix-compare-cell">Provide context: "The tests in auth.test.ts must pass"</div>
  </div>
  <div class="ix-compare-col" data-label="Ineffective" data-theme="error">
    <div class="ix-compare-cell">Vague request: "Fix the auth"</div>
    <div class="ix-compare-cell">No constraints: agent rewrites the entire API surface</div>
    <div class="ix-compare-cell">No verification: "Just do it, I trust you"</div>
  </div>
</div>
```

**CSS Design**:
- Two-column grid (1fr 1fr), gap 2px between columns
- Column headers: `data-theme="success"` = green background tint + green text, `data-theme="error"` = red background tint + red text
- Cells: card-style with `var(--raised)` background, 1px border, 14px text
- Responsive: stacks to single column on mobile (max-width: 600px)
- Header labels: uppercase, 11px, bold, letter-spacing
- Optional third theme: `data-theme="neutral"` for Before/After comparisons (uses primary/accent colors)

**JS Behavior**:
- `initCompare(el)` -- collects `.ix-compare-col` children
- Builds the grid layout dynamically (header row + cell rows)
- Pairs cells from left and right columns into rows
- No interaction beyond display (this is a static visual component)
- Animate on viewport entry: cells fade in with stagger (50ms per cell)

**Registration**: Add `case 'compare': initCompare(el); break;` to `hydrateInteractiveDiagrams`

---

### 4. `ix-quiz` -- Interactive Knowledge Check (ALREADY IMPLEMENTED)

**Status**: Full CSS + JS exists in module-viewer.html (lines 354-454 CSS, lines 2418-2525 JS). Module 01 already has 3 quiz instances. Modules 02 and 03 need quiz content added to their markdown files only -- no viewer changes needed.

---

### 5. `ix-predict-reveal` -- Predict-Then-Reveal (ALREADY IMPLEMENTED)

**Status**: Full CSS + JS exists in module-viewer.html (lines 456-526 CSS, lines 2527-2606 JS). Module 01 already has 1 predict-reveal instance. Modules 02 and 03 need predict-reveal content added to their markdown files only -- no viewer changes needed.

---

## Module-by-Module Content Transformation Plan

### Module 01: The Paradigm Shift (1,188 lines)

**Current score**: 4/10 (has 3 quizzes + 1 predict-reveal already added)
**Target score**: 8+/10

#### Section-by-Section Changes

| Section | Current State | Action | New Component | XP |
|---------|--------------|--------|---------------|-----|
| **Overview** (L6-21) | Dense paragraph + numbered objectives | KEEP objectives but **no change needed** -- module already has good structure | -- | -- |
| **1.1 intro prose** (L23-26) | 4 lines of dry preamble | Already has predict-reveal before tabbed panel. **Trim** preamble to 1-2 sentences. | -- | -- |
| **Post-eras quiz** (L140) | Already exists | **KEEP** -- 3-question quiz on eras already present | quiz (existing) | 16 |
| **1.2 PRAO prose walls** (L340-354) | ~15 lines of exposition between click-cards and worked example | **REPLACE** with an `ix-compare` showing "PRAO thinking" vs "Linear thinking" side-by-side | compare | -- |
| **Post-PRAO quiz** (L547) | Already exists | **KEEP** -- quiz on PRAO already present | quiz (existing) | 18 |
| **1.3 "What Claude Code Actually Is"** (L514-534) | 20 lines of prose, 3 consecutive paragraphs | **ADD** terminal simulation: "Your first 60 seconds with Claude Code" showing `claude` startup, first prompt, first tool call | terminal-sim | -- |
| **1.3 Session vs Persistent Context** (L646-658) | 12 lines repeating click-cards content | **DELETE** these lines. The ix-diagram click-cards at L536 already cover this. | -- | -- |
| **1.4 Pre-failure-modes** (L661-664) | 4 lines intro | **ADD** predict-reveal: "What do you think is the #1 mistake new users make with agentic AI?" | predict-reveal | 8 |
| **1.5 Strong Fit / Weak Fit** (L881-910) | 30 lines of dense bullet prose | **REPLACE** with `ix-compare`: "Strong Fit Tasks" (green) vs "Weak Fit Tasks" (red) | compare | -- |
| **Post-suitability quiz** (L1092) | Already exists | **KEEP** -- quiz on task suitability already present | quiz (existing) | 14 |
| **Best Practices Summary** (L1015-1036) | 21 lines of Do/Don't lists | **REPLACE** with `ix-accordion` (3 sections: Prompt Design, Context Management, Verification) with do/don't items | accordion | -- |
| **Key Concepts for Review** (L1039-1050) | 11 lines paragraph glossary | **REPLACE** with `ix-accordion` (single glossary accordion, each term is an item) | accordion | -- |
| **Lab Connection** (L1053-1056) | 3 lines plain paragraph | **KEEP** as-is (already brief) | -- | -- |

**Module 01 Component Counts (after treatment)**:

| Component Type | Existing | Adding | Total |
|----------------|----------|--------|-------|
| tabbed-panel | 1 | 0 | 1 |
| agent-trace | 2 | 0 | 2 |
| click-cards | 4 | 0 | 4 |
| step-walkthrough | 1 | 0 | 1 |
| quiz | 3 | 0 | 3 |
| predict-reveal | 1 | 1 | 2 |
| terminal-sim | 0 | 1 | 1 |
| compare | 0 | 2 | 2 |
| accordion | 0 | 2 | 2 |
| **Total** | **12** | **6** | **18** |

**Lines to delete**: ~42 (duplicate prose at L646-658, prose wall at L881-910 replaced, best practices replaced)
**Lines to add**: ~180 (terminal-sim ~60, predict-reveal ~15, 2x compare ~50, 2x accordion ~55)
**Net change**: +138 lines (from 1,188 to ~1,326)

---

### Module 02: Claude Code Foundations (1,250 lines)

**Current score**: 3.5/10 (zero quizzes, zero predict-reveals)
**Target score**: 8+/10

#### Section-by-Section Changes

| Section | Current State | Action | New Component | XP |
|---------|--------------|--------|---------------|-----|
| **Overview** (L6-20) | 14 lines dense paragraph | **KEEP** as-is. Trim 2-3 redundant sentences. | -- | -- |
| **2.1 Before mode-decision tree** | No predict | **ADD** predict-reveal: "Before seeing the modes, predict: when would you choose non-interactive over interactive mode?" | predict-reveal | 8 |
| **2.1 Interactive Mode** (L174-184) | 10 lines "ideal for" bullet list | **KEEP** but trim to 6 lines | -- | -- |
| **2.1 Non-Interactive Mode** (L186-208) | 22 lines + 2 code blocks | **ADD** terminal-sim after the prose showing `claude -p "query"` with piped output. Trim prose to 10 lines. | terminal-sim | -- |
| **Post-2.1 knowledge check** | None exists | **ADD** quiz: 3 questions on interactive vs non-interactive mode selection | quiz | 12 |
| **2.2 Before CLAUDE.md hierarchy** | No predict | **ADD** predict-reveal: "What 3 categories of information would you put in a persistent project brief for an AI agent?" | predict-reveal | 8 |
| **2.2 "What Belongs" code blocks** (L395-468) | 73 lines -- 4 consecutive code blocks in prose. Densest wall in all modules. | **REPLACE** with `tabbed-panel` (5 tabs: Architecture / Conventions / Key Files / Constraints / Decisions). Each tab shows one CLAUDE.md section sample with code block. | tabbed-panel | -- |
| **2.2 "What Does Not Belong"** (L474-496) | 22 lines "don't do this" prose | **REPLACE** with `ix-compare`: "What belongs in CLAUDE.md" (green) vs "What does NOT belong" (red) | compare | -- |
| **2.2 Spot-the-problems challenge** (L498-506) | Static `<details>` tag with code block | **KEEP** as-is (already interactive via details/summary). Consider converting to a quiz in a future pass. | -- | -- |
| **Post-2.2 knowledge check** | None exists | **ADD** quiz: 3 questions on CLAUDE.md content, hierarchy, update triggers | quiz | 12 |
| **2.3 Permissions JSON examples** (L620-740) | 120 lines of JSON blocks with inline prose | **REPLACE** with `ix-accordion` (4 sections: Allow Rules / Deny Rules / Scope Levels / Common Patterns). Each section has a code block + 2-3 line explanation. | accordion | -- |
| **Post-2.3 knowledge check** | None exists | **ADD** quiz: 3 questions on permissions model (allow/deny, scope precedence) | quiz | 12 |
| **2.4 MCP intro** (L792-810) | 18 lines of prose | **TRIM** to 10 lines. Remove duplicate content from Module 01. | -- | -- |
| **2.4 MCP configuration** (L850-938) | 88 lines of JSON code blocks | **REPLACE** with `ix-accordion` (3 sections: Adding MCP Servers / Configuration Format / Verifying Connections). Each with a focused code block. | accordion | -- |
| **2.4 Post-MCP** | No predict | **ADD** predict-reveal: "Before seeing the transport types, predict: how does a local MCP server communicate with Claude Code vs a remote one?" | predict-reveal | 8 |
| **Post-2.4 knowledge check** | None exists | **ADD** quiz: 3 questions on MCP (primitives count = 3, transport types, tool verification) | quiz | 12 |
| **Best Practices Summary** (L1159-1193) | 34 lines Do/Don't lists | **REPLACE** with `ix-accordion` (4 sections: Mode Selection / CLAUDE.md / Permissions / MCP) with do/don't items | accordion | -- |
| **Key Concepts for Review** (L1196-1209) | 13 lines paragraph glossary | **REPLACE** with `ix-accordion` (glossary terms as items) | accordion | -- |

**Module 02 Component Counts (after treatment)**:

| Component Type | Existing | Adding | Total |
|----------------|----------|--------|-------|
| click-cards | 2 | 0 | 2 |
| decision-tree | 2 | 0 | 2 |
| step-walkthrough | 1 | 0 | 1 |
| agent-trace | 3 | 0 | 3 |
| tabbed-panel | 1 | 1 | 2 |
| quiz | 0 | 4 | 4 |
| predict-reveal | 0 | 3 | 3 |
| terminal-sim | 0 | 1 | 1 |
| compare | 0 | 1 | 1 |
| accordion | 0 | 4 | 4 |
| **Total** | **9** | **14** | **23** |

**Lines to delete**: ~250 (permissions JSON wall ~120, CLAUDE.md code blocks ~73, MCP config ~88, best practices ~34, glossary ~13, minus content that moves into components)
**Lines to add**: ~350 (4 quizzes ~160, 3 predict-reveals ~45, 1 terminal-sim ~40, 1 compare ~30, 4 accordions ~120, 1 tabbed-panel ~60)
**Net change**: +100 lines (from 1,250 to ~1,350)

---

### Module 03: Agent Thinking (1,190 lines)

**Current score**: 4.5/10 (zero quizzes, zero predict-reveals)
**Target score**: 8+/10

#### Section-by-Section Changes

| Section | Current State | Action | New Component | XP |
|---------|--------------|--------|---------------|-----|
| **Overview** (L6-22) | 16 lines dense paragraph | **TRIM** to 10 lines | -- | -- |
| **3.1 post-diagram prose** (L140-153) | 14 lines restating click-cards content | **DELETE**. The click-cards detail panels already contain this information. | -- | -- |
| **Pre-3.2 predict** | None | **ADD** predict-reveal: "Before seeing the PRAO state machine, predict: what happens when the Observe phase reveals an error?" | predict-reveal | 8 |
| **Post-3.2 knowledge check** | None | **ADD** quiz: 3 questions on PRAO state machine transitions, chain-of-thought reading | quiz | 12 |
| **3.3 Pattern descriptions** (L450-520) | 70 lines of prose describing scout/focused-edit/iterative-debug/comprehensive-scan | **REPLACE** with `ix-accordion` (4 sections, one per pattern: Scout Pattern / Focused Edit / Iterative Debug / Comprehensive Scan). Each section has a brief description + the agent-trace snippet that follows. | accordion | -- |
| **Post-3.3 knowledge check** | None | **ADD** quiz: 4 questions -- show tool call sequences, student identifies which pattern (scout, focused edit, etc.) | quiz | 16 |
| **Pre-3.4 predict** | None | **ADD** predict-reveal: "When an agent asks a clarifying question, what are the 3 categories of questions it might ask?" | predict-reveal | 8 |
| **3.4 Clarification Requests** (L660-782) | 122 lines -- densest prose block in M03 | **RESTRUCTURE**: Keep the decision-tree at L702 but **REPLACE** surrounding prose with: (a) `ix-compare` showing "Vague answer" vs "Specific answer" with resulting agent behavior, (b) `ix-accordion` with 3 sections (Scope Questions / Authority Questions / Context Questions) | compare + accordion | -- |
| **3.5 Extended Thinking post-panel** (L870-903) | 33 lines discussion of when to use extended thinking | **REPLACE** with `ix-compare`: "Use Extended Thinking When" (green) vs "Standard Thinking is Fine When" (red) | compare | -- |
| **Post-3.5 knowledge check** | None | **ADD** quiz: 3 questions on extended thinking (when valuable, when not, budget tokens) | quiz | 12 |
| **"Putting It Together"** (L904-1106) | 202 lines -- 80 lines connecting prose + interactive components | **TRIM** connecting prose from ~80 lines to ~30 lines. Keep the agent-trace and step-walkthrough components. | -- | -- |
| **Best Practices Summary** (L1107-1141) | 34 lines Do/Don't | **REPLACE** with `ix-accordion` (4 sections: Trace Reading / Pattern Recognition / Intervention Decisions / Extended Thinking) with do/don't items | accordion | -- |
| **Key Concepts for Review** (L1143-1156) | 13 lines glossary | **REPLACE** with `ix-accordion` (glossary terms as items) | accordion | -- |

**Module 03 Component Counts (after treatment)**:

| Component Type | Existing | Adding | Total |
|----------------|----------|--------|-------|
| click-cards | 2 | 0 | 2 |
| agent-trace | 3 | 0 | 3 |
| tabbed-panel | 2 | 0 | 2 |
| decision-tree | 1 | 0 | 1 |
| step-walkthrough | 1 | 0 | 1 |
| quiz | 0 | 3 | 3 |
| predict-reveal | 0 | 2 | 2 |
| compare | 0 | 2 | 2 |
| accordion | 0 | 4 | 4 |
| **Total** | **9** | **11** | **20** |

**Lines to delete**: ~190 (duplicate prose L140-153 ~14, pattern descriptions ~70, clarification wall ~90 partial, best practices ~34, glossary ~13, putting-together trim ~50)
**Lines to add**: ~280 (3 quizzes ~130, 2 predict-reveals ~30, 2 compares ~60, 4 accordions ~100)
**Net change**: +90 lines (from 1,190 to ~1,280)

---

## Phased Execution Plan

### Phase 1: Infrastructure -- Add 3 New Component Types to module-viewer.html

**Files touched**: `module-viewer.html` (CSS + JS sections)
**Dependencies**: None (foundational)
**Estimated work**: 1 agent, ~400 lines of CSS + JS

#### Tasks

- [ ] T001 Add `ix-terminal-sim` CSS styles to module-viewer.html (terminal header bar with 3 dots, command/output/thinking/tool line styles, typing cursor animation, container styles). Insert after the existing `ix-predict-shell` CSS block (~line 527).

- [ ] T002 Add `ix-accordion` CSS styles to module-viewer.html (item container, header with chevron, body with max-height transition, do/don't border colors, active states). Insert after terminal-sim CSS.

- [ ] T003 Add `ix-compare` CSS styles to module-viewer.html (two-column grid, column headers with theme variants success/error/neutral, cell cards, stagger animation, mobile single-column). Insert after accordion CSS.

- [ ] T004 Add mobile responsive overrides for all 3 new components in the existing `@media (max-width: 600px)` block (~line 1571).

- [ ] T005 Add `initTerminalSim(el)` JS function to module-viewer.html. Implements: collect `.ix-term-line` children, build terminal container with header bar, typing animation for commands, fade-in for output, play/pause/reset controls, speed control, IntersectionObserver auto-play, reduced-motion support.

- [ ] T006 Add `initAccordion(el)` JS function to module-viewer.html. Implements: collect `.ix-accordion-item` children, build clickable headers with chevron icons, smooth body expand/collapse, single-open vs multi-open mode, optional default-open first item.

- [ ] T007 Add `initCompare(el)` JS function to module-viewer.html. Implements: collect `.ix-compare-col` children, build two-column grid with headers, pair cells into rows, viewport-entry stagger animation.

- [ ] T008 Register all 3 new components in `hydrateInteractiveDiagrams` switch statement (~line 1740). Add: `case 'terminal-sim': initTerminalSim(el); break;`, `case 'accordion': initAccordion(el); break;`, `case 'compare': initCompare(el); break;`.

**Acceptance criteria**:
- All 3 components render correctly when test markup is placed in a module markdown file
- Light theme and dark theme both work
- Mobile responsive layout works at 600px breakpoint
- Reduced motion respected
- No JS errors in console

---

### Phase 2: Module 01 Transformation

**Files touched**: `docs/curriculum/modules/01-paradigm-shift.md`
**Dependencies**: Phase 1 complete
**Estimated work**: 1 agent

#### Tasks

- [ ] T009 [P] Add `ix-terminal-sim` "Your first 60 seconds" in Section 1.3 (after L534). Show: `$ claude` startup, welcome message, a refactoring prompt, thinking indicator, 3-4 tool calls (Read file, Read file, Edit file), brief response. ~60 lines of markup.

- [ ] T010 [P] Add `ix-predict-reveal` before failure modes in Section 1.4 (before L661). Prompt: "Before seeing the failure modes, write down what you think the #1 mistake new users make with agentic AI." Reveal text: reference to the "autocomplete mindset" as the most common failure. ~15 lines.

- [ ] T011 [P] Add `ix-compare` "PRAO Thinking vs Linear Thinking" replacing prose wall at L340-354. Left column (success): "Define outcome + constraints", "Review at checkpoints", "Trust the PRAO loop". Right column (error): "Dictate each step", "Watch every keystroke", "Treat AI as autocomplete". ~25 lines.

- [ ] T012 [P] Add `ix-compare` "Strong Fit vs Weak Fit Tasks" replacing prose at L881-910. Left column (success): multi-file refactors, test generation, code review, boilerplate. Right column (error): novel algorithm design, subjective UX decisions, security-critical without review. ~25 lines.

- [ ] T013 Replace Best Practices Summary (L1015-1036) with `ix-accordion` (3 items: Prompt Design, Context Management, Verification). Each item has do/don't content from existing prose. ~30 lines.

- [ ] T014 Replace Key Concepts for Review (L1039-1050) with `ix-accordion` (7 items: one per key term -- Agentic AI, PRAO Loop, Context Window, etc.). ~25 lines.

- [ ] T015 Delete duplicate prose at L646-658 (Session vs Persistent Context paragraph that duplicates the click-cards). Replace with a 2-line transition sentence.

**Acceptance criteria**:
- Module 01 renders in module-viewer with all 18 components working
- No console errors
- All quizzes award XP on completion
- Terminal sim auto-plays on scroll, pause/reset work
- Accordions expand/collapse smoothly
- Compare grids display correctly in both themes

---

### Phase 3: Module 02 Transformation

**Files touched**: `docs/curriculum/modules/02-claude-code-foundations.md`
**Dependencies**: Phase 1 complete (can run parallel with Phase 2)
**Estimated work**: 1 agent

#### Tasks

- [ ] T016 Add `ix-predict-reveal` before mode decision tree (~L210). Prompt: "When would you choose non-interactive (`claude -p`) over interactive mode? List 2-3 scenarios." ~15 lines.

- [ ] T017 Add `ix-terminal-sim` after non-interactive mode section (~L208). Show: `$ claude -p "Explain the auth flow in this project" | head -20`, output lines showing a summary response. Then `$ cat requirements.txt | claude -p "Generate tests for these requirements" > tests.py`. ~40 lines.

- [ ] T018 Add `ix-quiz` "Mode Selection Check" after Section 2.1 (~L280). 3 questions: (1) scenario-based "which mode?" (2) pipe usage with non-interactive (3) when to use `--continue` flag. ~50 lines.

- [ ] T019 Add `ix-predict-reveal` before CLAUDE.md hierarchy walkthrough (~L287). Prompt: "What 3 categories of information would you put in a persistent project brief for an AI agent?" ~15 lines.

- [ ] T020 Replace "What Belongs" code blocks (L395-468) with `ix-tabbed-panel` (5 tabs). Each tab shows one CLAUDE.md section with a focused code block and 2-line explanation. Architecture / Conventions / Key Files / Constraints / Decisions. ~60 lines.

- [ ] T021 Replace "What Does Not Belong" prose (L474-496) with `ix-compare`. Left column (success): "Architecture decisions", "File conventions", "Test commands". Right column (error): "Entire API docs", "Auto-generated code", "Temporary debugging notes". ~30 lines.

- [ ] T022 Add `ix-quiz` "CLAUDE.md Knowledge Check" after Section 2.2 (~L506). 3 questions: (1) hierarchy precedence (project > user > global) (2) what triggers a CLAUDE.md update (3) what should NOT go in CLAUDE.md. ~50 lines.

- [ ] T023 Replace Permissions JSON wall (L620-740) with `ix-accordion` (4 items: Allow Rules / Deny Rules / Scope Levels / Common Patterns). Each item has a focused JSON example + 3-line explanation. ~80 lines.

- [ ] T024 Add `ix-quiz` "Permissions Check" after Section 2.3 (~L780). 3 questions: (1) allow/deny model basics (2) what happens when allow and deny conflict (3) THREE scope levels. ~50 lines.

- [ ] T025 Add `ix-predict-reveal` before MCP transport tabbed panel (~L800). Prompt: "How does a local MCP server (like a database connector on localhost) communicate with Claude Code differently from a remote one?" ~15 lines.

- [ ] T026 Replace MCP configuration JSON wall (L850-938) with `ix-accordion` (3 items: Adding MCP Servers / Configuration Format / Verifying Connections). Each with focused code + explanation. ~60 lines.

- [ ] T027 Add `ix-quiz` "MCP Knowledge Check" after Section 2.4 (~L990). 3 questions: (1) exactly THREE MCP primitives (Tools, Resources, Prompts) (2) transport types (3) how to verify an MCP connection. ~50 lines.

- [ ] T028 Replace Best Practices Summary (L1159-1193) with `ix-accordion` (4 items: Mode Selection / CLAUDE.md / Permissions / MCP). Each with do/don't content. ~40 lines.

- [ ] T029 Replace Key Concepts for Review (L1196-1209) with `ix-accordion` glossary. ~30 lines.

- [ ] T030 Trim redundant prose: Overview -4 lines, Interactive Mode -4 lines, MCP intro -8 lines. Total ~16 lines removed.

**Acceptance criteria**:
- Module 02 renders in module-viewer with all 23 components working
- No console errors
- All 4 quizzes enforce correct answers per accuracy rules (THREE MCP primitives, allow/deny model, etc.)
- Content accuracy: No `--thinking` flag, no `--context` flag, no `/memory` command, SSE deprecated (Streamable HTTP only)
- JSON examples in accordions are valid and match actual settings.json format

---

### Phase 4: Module 03 Transformation

**Files touched**: `docs/curriculum/modules/03-agent-thinking.md`
**Dependencies**: Phase 1 complete (can run parallel with Phases 2-3)
**Estimated work**: 1 agent

#### Tasks

- [ ] T031 Delete duplicate prose at L140-153 (3 paragraphs restating click-cards content). Replace with 2-line transition. ~12 lines removed.

- [ ] T032 Add `ix-predict-reveal` before PRAO state machine (~L217). Prompt: "When the Observe phase of the PRAO loop reveals an error, what do you think the agent does next? Does it give up, retry the same action, or something else?" ~15 lines.

- [ ] T033 Add `ix-quiz` "Trace Reading Check" after Section 3.2 (~L340). 3 questions: (1) what does the thinking layer show (2) mapping a trace line to its PRAO phase (3) what to look for in the Observe phase. ~50 lines.

- [ ] T034 Replace pattern descriptions prose (L450-520) with `ix-accordion` (4 items: Scout Pattern / Focused Edit / Iterative Debug / Comprehensive Scan). Each has a 3-line description + key signal to watch for. ~55 lines.

- [ ] T035 Add `ix-quiz` "Pattern Recognition Check" after Section 3.3 (~L530). 4 questions: each shows a tool call sequence, student selects which pattern it represents. This is the core skill Module 03 teaches. ~70 lines.

- [ ] T036 Add `ix-predict-reveal` before clarification section (~L660). Prompt: "When an agent asks a clarifying question, what are the 3 categories it might ask about? And for each, should you answer in-conversation or add to CLAUDE.md?" ~15 lines.

- [ ] T037 Restructure clarification section (L660-782): Keep decision tree at L702. Replace surrounding prose with `ix-compare` "Vague Answer vs Specific Answer". Left (success): specific, actionable answer examples. Right (error): vague, unhelpful answer examples with resulting agent confusion. ~30 lines.

- [ ] T038 Add `ix-accordion` after compare in clarification section (3 items: Scope Questions / Authority Questions / Context Questions). Each with examples and recommended response strategy. ~40 lines.

- [ ] T039 Replace extended thinking prose (L870-903) with `ix-compare` "Use Extended Thinking When" vs "Standard Thinking is Fine When". ~25 lines.

- [ ] T040 Add `ix-quiz` "Thinking & Intervention Check" after Section 3.5 (~L910). 3 questions: (1) when extended thinking is valuable (2) scenario-based "should you intervene?" (3) how to diagnose a stuck loop. ~50 lines.

- [ ] T041 Trim "Putting It Together" connecting prose from ~80 lines to ~30 lines. Keep agent-trace and step-walkthrough components. ~50 lines removed.

- [ ] T042 Replace Best Practices Summary (L1107-1141) with `ix-accordion` (4 items: Trace Reading / Pattern Recognition / Intervention / Extended Thinking). ~40 lines.

- [ ] T043 Replace Key Concepts for Review (L1143-1156) with `ix-accordion` glossary. ~25 lines.

**Acceptance criteria**:
- Module 03 renders in module-viewer with all 20 components working
- No console errors
- Pattern recognition quiz specifically tests the 4 patterns taught in 3.3
- Intervention quiz validates correct decision-making
- All quiz answers are pedagogically accurate

---

### Phase 5: Review Cycle

**Files touched**: All 4 files from Phases 1-4
**Dependencies**: Phases 1-4 complete
**Estimated work**: 2 agents (parallel)

#### Tasks

- [ ] T044 **Code Review**: Verify all HTML/JS in module-viewer.html -- no syntax errors, no broken component registration, all 3 new init functions work, XP system integrates correctly.

- [ ] T045 **Content Accuracy Check (MERCURIO)**: Audit all quiz answers, predict-reveal texts, compare content, and accordion content across all 3 modules against the zero-tolerance accuracy rules:
  - No `--thinking` flag references
  - No `--context` flag references
  - No `/memory` command references
  - SSE deprecated -- Streamable HTTP only for remote MCP
  - Exactly THREE MCP primitives: Tools, Resources, Prompts
  - `settings.json` permissions format: `{"permissions": {"allow": [...], "deny": [...]}}`
  - CLAUDE.md read at session start, not a slash command

- [ ] T046 **Visual QA**: Load each module in module-viewer at `/module/01`, `/module/02`, `/module/03`. Verify:
  - All components render (no blank boxes)
  - Dark theme and light theme both work
  - Mobile layout at 600px breakpoint
  - Quizzes: click options, see feedback, see score
  - Terminal sims: auto-play, pause, reset, speed control
  - Accordions: expand/collapse, single-open mode works
  - Compares: two-column layout, color coding
  - XP awards and milestone toasts fire correctly

- [ ] T047 **Cross-module consistency**: Verify consistent component styling, XP values, and interaction patterns across all 3 modules. Ensure no duplicate diagram IDs.

---

### Phase 6: Deploy

**Files touched**: None (deployment command only)
**Dependencies**: Phase 5 complete

#### Tasks

- [ ] T048 Run pre-deploy validation: verify all HTML files reference correct paths, vercel.json routing correct.

- [ ] T049 Deploy to Vercel:
```bash
cd /Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course
npx vercel deploy --prod --yes --scope manu-mulaveesalas-projects
```

- [ ] T050 Post-deploy smoke test: visit live URLs for `/module/01`, `/module/02`, `/module/03` and verify components load.

---

## Dependency Graph

```
Phase 1 (Infrastructure)
  T001-T008: module-viewer.html CSS + JS
  |
  +---> Phase 2 (Module 01)     Phase 3 (Module 02)     Phase 4 (Module 03)
  |     T009-T015               T016-T030               T031-T043
  |     [PARALLEL]              [PARALLEL]              [PARALLEL]
  |         |                       |                       |
  |         +-------+---------------+-----------------------+
  |                 |
  |                 v
  |           Phase 5 (Review)
  |           T044-T047
  |                 |
  |                 v
  |           Phase 6 (Deploy)
  |           T048-T050
```

**Critical Path**: Phase 1 -> Phase 5 -> Phase 6
**Parallel Opportunities**: Phases 2, 3, 4 can all run simultaneously after Phase 1

---

## Component Count Summary (All Modules After Treatment)

| Component Type | M01 | M02 | M03 | Total |
|----------------|-----|-----|-----|-------|
| tabbed-panel | 1 | 2 | 2 | 5 |
| click-cards | 4 | 2 | 2 | 8 |
| decision-tree | 0 | 2 | 1 | 3 |
| step-walkthrough | 1 | 1 | 1 | 3 |
| agent-trace | 2 | 3 | 3 | 8 |
| flow-diagram | 0 | 0 | 0 | 0 |
| **quiz** | **3** | **4** | **3** | **10** |
| **predict-reveal** | **2** | **3** | **2** | **7** |
| **terminal-sim** | **1** | **1** | **0** | **2** |
| **compare** | **2** | **1** | **2** | **5** |
| **accordion** | **2** | **4** | **4** | **10** |
| **TOTAL** | **18** | **23** | **20** | **61** |

**Before treatment**: 27 components total (all existing types only)
**After treatment**: 61 components total (+34 new, including 10 quizzes, 7 predict-reveals, 2 terminal-sims, 5 compares, 10 accordions)

---

## XP Budget

| Module | Quiz XP | Predict XP | Total New XP |
|--------|---------|------------|--------------|
| M01 | 48 (existing) | 16 | 64 |
| M02 | 48 | 24 | 72 |
| M03 | 40 | 16 | 56 |
| **Total** | **136** | **56** | **192** |

---

## Risk Assessment

### High-Risk Tasks

**T005: initTerminalSim -- Typing animation engine**
- Complexity: Medium-High (character-by-character animation with cursor, timing sync across lines)
- Mitigation: Reuse timing patterns from `initAgentTrace` playback engine. The agent-trace already has play/pause/reset/speed -- terminal-sim is a simpler variant.

**T023: Permissions JSON accordion (Module 02)**
- Complexity: Medium
- Uncertainty: Medium (must ensure JSON examples exactly match real `settings.json` format)
- Mitigation: Cross-reference with lab-04 permissions content and Claude Code documentation.

**T035: Pattern Recognition Quiz (Module 03)**
- Complexity: Medium
- Uncertainty: Medium (quiz content must be pedagogically precise -- each tool call sequence must unambiguously match one pattern)
- Mitigation: Review each quiz question against the pattern definitions in the module content.

### Content Accuracy Risks

All quiz answers and technical content must comply with the zero-tolerance rules. The Phase 5 MERCURIO accuracy check is mandatory before deploy. Specific risk areas:
- MCP quiz in M02 (must say exactly 3 primitives, must use Streamable HTTP not SSE)
- Permissions quiz in M02 (must use `{"permissions": {"allow": [...], "deny": [...]}}` format)
- Any terminal-sim content showing Claude Code CLI flags (must not include `--thinking` or `--context`)

---

## Implementation Strategy

**Bottom-to-Top** for Phase 1 (infrastructure): Build CSS first, then JS init functions, then wire into the component registry. Each component is an independent building block.

**Top-to-Bottom** for Phases 2-4 (content): Work through each module section-by-section from top to bottom, transforming prose walls into components. This ensures consistent reading flow and avoids line-number drift.

**Parallel execution** for Phases 2-4: Each module is an independent file. Three agents can work simultaneously on M01, M02, and M03 without merge conflicts.

---

## Self-Critique Verification

### Q1: Does every identified prose wall have a transformation plan?
**Yes.** All 24 prose walls identified in the audit (6 for M01, 10 for M02, 8 for M03) have explicit "Action" entries in the section-by-section tables above.

### Q2: Do all new components have complete CSS + JS specifications?
**Yes.** Terminal-sim, accordion, and compare all have markup patterns, CSS design specs, JS behavior descriptions, and registration instructions. Quiz and predict-reveal are already implemented -- confirmed by reading the module-viewer.html source (lines 354-526 CSS, lines 2418-2606 JS).

### Q3: Are quiz answers accurate per zero-tolerance rules?
**Deferred to Phase 5.** Quiz content will be written in Phases 2-4 and validated in Phase 5 (T045). The plan explicitly lists all accuracy rules that must be checked.

### Q4: Can Phases 2-4 truly run in parallel?
**Yes.** Each phase touches exactly one markdown file. No shared state. No merge conflicts. Phase 1 must complete first because all three modules need the new CSS + JS.

### Q5: Is the component count realistic for the scope?
**Yes.** Adding 34 components across 3 modules averages ~11 per module. Each component is 15-70 lines of markdown markup. The existing 27 components prove the markup pattern works at scale. Total new markup is ~810 lines across 3 files -- well within scope for 3 parallel agents.
