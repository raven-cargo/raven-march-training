# CC2-OBSERVE: Labs Deep Analysis
**Date**: 2026-03-22
**Observer**: CC2-OBSERVE Agent
**Scope**: All 9 lab HTML files + lab-framework (core.css, core.js, build.js)

---

## Executive Summary

The 9-lab suite is **complete, fully interactive, and pedagogically coherent** — no skeletal placeholders, no missing HTML pages. Total lab volume: **19,645 lines** across 9 files averaging **2,183 lines/lab**. The core design pattern (Predict → Reveal → Apply → Reflect → XP) is consistently applied. Labs 02–08 represent the mature design standard; Labs 01 and 09 diverge in significant ways that warrant attention.

**Key findings in brief**:
- Lab 01 uses a legacy architecture (scroll-snapping sections, no LAB_KEY, no streak/milestone system) compared to Labs 02–09's sequential unlock model.
- Lab 04 (SSE deprecation) and Lab 09 (mcp-primitive reference) contain accuracy-adjacent content that is **handled correctly** — no violations found.
- Labs 06 and 07 have **zero `@media` breakpoints** — mobile layout collapses to inline flow only.
- Lab 09 replaces quizzes with a **5-dimension weighted self-assessment rubric** — the most sophisticated evaluation mechanism in the suite.
- Module 06 (MCP Building), Module 08 (Meta-Prompting), and Module 11 (Tech Stack Adaptation) have no dedicated labs — confirmed architectural gap.
- The `lab-framework/` directory (core.js, core.css, build.js) is **not referenced by any lab** — all 9 files are self-contained monoliths.

---

## 1. Quantitative Metrics — Per Lab

| Lab | Lines | Sections | Textareas | Buttons | Quiz MCQ | Gamif. Elements | localStorage Ops | aria-labels | code-blocks | External Links | JS Functions |
|:---:|------:|:--------:|:---------:|:-------:|:--------:|:---------------:|:----------------:|:-----------:|:-----------:|:--------------:|:------------:|
| 01 | 2,030 | 7 | 8 | 14 | 4 MCQ | prediction only | 3 | 21 | 10 | 3 | 28 |
| 02 | 1,976 | 7 | 7 | 32 | 4 MCQ + prediction | streak/milestone/connect | 7 | 48 | 26 | 3 | 39 |
| 03 | 2,106 | 7 | 11 | 48 | 4 MCQ + intervention | streak/milestone/connect | 9 | 42 | 18 | 3 | 32 |
| 04 | 2,514 | 6 | 10 | 14 | matcher + kcheck | streak/milestone | 29 | 29 | 38 | 6 | 49 |
| 05 | 2,827 | 5+KCheck | 22 | 15 | MCQ + iteration | streak/milestone | 10 | 52 | 8 | 6 | 38 |
| 06 | 1,999 | 7 | 12 | 49 | MCQ + predict | streak/milestone/connect | 14 | 25 | 73 | 3 | 33 |
| 07 | 2,109 | 7 | 6 | 63 | MCQ + intervention | streak/milestone/connect | 30 | 44 | 9 | 3 | 33 |
| 08 | 2,003 | 7 | 8 | 39 | MCQ + prediction | streak/milestone/connect | 20 | 42 | 51 | 3 | 30 |
| 09 | 2,081 | 6 | 10 | 31 | none (rubric-based) | milestone/connect | 18 | 28 | 19 | 3 | 25 |
| **Total** | **19,645** | **59** | **94** | **305** | — | — | **140** | **331** | **252** | **33** | **307** |

### Section Count Notes
- Labs 01–03, 06–08: Use `section-block` + `h2` pattern (7 sections each, including hero and completion)
- Labs 04–05: Use `<section class="section">` pattern with `section-badge`/`section-title` (6 sections each, no `h2` tags — uses `section-title` div instead)
- Lab 09: 6 sections using mixed `section-block` pattern

---

## 2. Gamification Depth — Per Lab

| Lab | XP System | Streak System | Milestones | Predictions | connect-forward | Lock/Unlock Progression | XP Amounts Visible |
|:---:|:---------:|:-------------:|:----------:|:-----------:|:---------------:|:-----------------------:|:------------------:|
| 01 | Basic (no LAB_KEY) | None | None | Yes (7) | None | None | Not shown |
| 02 | Full LAB_KEY | Yes (3/5/7) | Yes (13) | Yes (12) | Yes (5 triggers) | Yes (locked sections) | Inline (+XP) |
| 03 | Full LAB_KEY | Yes (3/5/7) | Yes (13) | Yes (7) | Yes (3 triggers) | Yes | Inline (+30 XP) |
| 04 | Full STORAGE_KEYS | Yes | Yes (14) | Yes (15) | None | Yes (29 ops) | Inline (+10/+20/+30/+100 XP) |
| 05 | Full STATE obj | Yes | Yes (25) | Yes (22) | None | Yes | Inline (+10/+20/+25/+50/+100 XP) |
| 06 | Full LAB_KEY | Yes | Yes (13) | Yes (12) | Yes (8 triggers) | Yes | Inline (+30 XP) |
| 07 | Full LAB_KEY | Yes | Yes (13) | Yes (5) | Yes (4 triggers) | Yes (30 ops) | Inline (+30/+50 XP) |
| 08 | Full LAB_KEY | Yes | Yes (13) | Yes (9) | Yes (5 triggers) | Yes | Inline (+30 XP) |
| 09 | Full LAB_KEY | Minimal (5) | Yes (13) | None | Yes (8 triggers) | Yes | Inline (+40 XP) |

### Gamification Architecture Observations

**Lab 01 is the anomaly**: It has no streak system, no milestone toasts, no connect-forward nudges, and no LAB_KEY-based localStorage. XP tracking appears absent from its JS — the quiz shows a score ring (0–4 correct) rather than XP accumulation. This is the original v1 architecture.

**Labs 02–09** share a consistent gamification engine: streak bonuses at 3 (amber)/5 (purple)/7 (gold), milestone toast notifications, section unlock via completion gates, XP accumulation persisted to localStorage, and XP toast animations.

**Lab 04** has the richest localStorage usage (29 operations) and most aggressive XP amounts, including a +100 XP reward — the only 100-point award in the suite outside Lab 05.

**Lab 09** has the weakest streak implementation (count 5 vs 19–23 for other labs) and no prediction challenges — this is appropriate for a capstone format, but creates a jarring transition from Lab 08's dense gamification.

---

## 3. Section-by-Section Content Map

### Lab 01 — The Paradigm Shift (2,030 lines)

| Section | Title | Key Interaction | XP |
|:-------:|-------|:---------------:|:--:|
| 0 | Hero | Scroll/particle animation | — |
| 1 | Two Ways to Build Software | Comparison card, 5 clickable commands | — |
| 2 | The PRAO Loop | SVG interactive diagram (4 clickable nodes) | — |
| 3 | Watch Claude Think | Animated trace simulator (4 scenarios) | — |
| 4 | Your First 5 Commands | Copy-to-clipboard command cards | — |
| 5 | Test Your Understanding | 4-question MCQ with score ring | — |
| 6 | Reflect & Connect | 4 reflection textareas + export button | — |

**Unique elements**: PRAO SVG diagram with guided traversal nudge; animated trace simulator with 4 realistic scenarios; reflection export to `.txt` file.

### Lab 02 — First Agent Conversation (1,976 lines)

| Section | Title | Key Interaction | XP |
|:-------:|-------|:---------------:|:--:|
| 0 | Hero/Objectives | Locked sections unlock progression | — |
| 1 | Why Prompts Fail | 3 bad-prompt diagnosis cards; predict challenge | +XP |
| 2 | The GCCF Pattern | GCCF anatomy cards; prompt writing textarea | +XP |
| 3 | Reading Output | Trace viewer (clickable expand); MCQ | +XP |
| 4 | When Things Go Wrong | Error simulation (3 expandable scenarios) | +XP |
| 5 | Conversation Threading | 3 threading mode cards; apply task | +XP |
| 6 | Synthesis Check | 4-question MCQ + grade rubric | +XP |
| 7 | Lab 02 Complete | connect-forward to Lab 03 | — |

**Unique elements**: Error simulation with expandable TOOL/ERROR/FIX trace steps; GCCF component anatomy grid; rubric (Distinguished/Proficient/Developing/Beginning).

### Lab 03 — Agent Thinking (2,106 lines)

| Section | Title | Key Interaction | XP |
|:-------:|-------|:---------------:|:--:|
| 0 | Hero | Locked sections | — |
| 1 | The Black Box Problem | Before/After comparison panels | +XP |
| 2 | Reading a Chain-of-Thought | Thought trace viewer (3 layers) | +XP |
| 3 | Tool Call Sequences | 6 clickable pattern cards (expand details) | +XP |
| 4 | When Agents Ask for Help | Intervention trainer (4 scenarios, choose action) | +XP |
| 5 | Extended Thinking Mode | Extended thinking block + comparison table | +XP |
| 6 | Synthesis | MCQ knowledge check | +XP |
| 7 | Diagnose a Real Trace | Full trace analysis challenge (CE-03) | +XP |

**Unique elements**: Three-layer visualization (think/tool/response); intervention trainer with correct/wrong button choices; extended thinking block with purple-tinted formatting; chain-of-thought pattern cards with sequences.

### Lab 04 — MCP Server Explorer (2,514 lines)

| Section | Title | Key Interaction | XP |
|:-------:|-------|:---------------:|:--:|
| 0 | The Extension Problem | 3 architecture click-boxes (must complete all) | +XP |
| 1 | The Three Primitives | Predict + Primitive Matcher (5/6 to unlock) | +XP |
| 2 | Connecting MCP Servers | Transport config; apply task (write JSON) | +XP |
| 3 | Reading Tool Schemas | Schema builder + tool comparison table | +XP |
| 4 | MCP in the PRAO Loop | Trace + Knowledge Check (2/3 to unlock) | +XP |
| 5 | Capstone Challenge | Full MCP server design exercise | +100 XP |

**Unique elements**: Primitive Matcher game (6 scenarios, must score 5+); Knowledge Check with minimum threshold (2/3); progressive unlock requiring specific scores; architecture click-boxes as section gate.

### Lab 05 — Prompt Engineering Workshop (2,827 lines — largest lab)

| Section | Title | Key Interaction | XP |
|:-------:|-------|:---------------:|:--:|
| 0 | The Prompt Quality Gap | Prediction textarea | +XP |
| 1 | The TCEF Pattern | 4-part TCEF builder (T/C/E/F textareas) | +XP |
| 2 | Context Injection Strategies | 3 strategy cards + compare textarea | +XP |
| 3 | Prompt Iteration | Before/after prompt + iteration textarea | +XP |
| 4 | Knowledge Checks | 6-question MCQ bank | +100 XP |

**Unique elements**: TCEF multi-part builder with live completeness check; prompt iteration workflow (write, analyze, rewrite); 25 milestone definitions (most of any lab); largest XP variety (+10/+20/+25/+50/+100).

### Lab 06 — Skills & Commands Builder (1,999 lines)

| Section | Title | Key Interaction | XP |
|:-------:|-------|:---------------:|:--:|
| 0 | Hero | Locked sections | — |
| 1 | What Is a Skill? | Predict + MCQ + YAML write task | +XP |
| 2 | YAML Frontmatter Deep Dive | Predict + triggers MCQ + frontmatter textarea | +XP |
| 3 | Writing the Skill Body | Skill body textarea (standup-writer CE) | +XP |
| 4 | Building Slash Commands | Command file anatomy + predict | +XP |
| 5 | Skill Composition | Composition patterns + apply | +XP |
| 6 | Putting It All Together | Full skill YAML validator exercise | +XP |
| 7 | Build a Skill Ecosystem | Complete ecosystem design | +XP |

**Unique elements**: Most code blocks of any lab (73); skills YAML validator with field-by-field checking; commands anatomy with fill-in sections; highest button count (49) for interactive toggling.

### Lab 07 — Multi-Agent Orchestrator (2,109 lines)

| Section | Title | Key Interaction | XP |
|:-------:|-------|:---------------:|:--:|
| 0 | Hero | Locked sections | — |
| 1 | Why Multiple Agents? | Predict + apply decomposition | +XP |
| 2 | Task Decomposition | Decomposition textarea + MCQ | +XP |
| 3 | Orchestrator Patterns | Pattern selection + apply | +XP |
| 4 | Communication Patterns | Spec textarea + MCQ | +XP |
| 5 | Failure Modes & Recovery | Failure scenario MCQ + apply | +XP |
| 6 | Synthesis | Knowledge check MCQ | +50 XP |
| 7 | Design a Complete Multi-Agent System | Full system design (80-char min) | +XP |

**Unique elements**: Highest button count (63) — used for multiple MCQ option sets; specialist agent cards (Test Generator etc.) in CE exercise; system design with char-minimum validation.

### Lab 08 — Production Patterns (2,003 lines)

| Section | Title | Key Interaction | XP |
|:-------:|-------|:---------------:|:--:|
| 0 | Hero | Locked sections + prediction | — |
| 1 | The Production Gap | Prediction + reveal | +30 XP |
| 2 | Permission Scoping | 3 permission JSON textareas (CE-08-A) | +XP |
| 3 | Secrets Management | Config JSON textarea + MCQ | +XP |
| 4 | Cost Optimization | Cost calculator interaction + MCQ | +XP |
| 5 | Observability | Log analysis textarea + structured MCQ | +XP |
| 6 | Putting It All Together | Production spec textarea + MCQ | +XP |
| 7 | Production Deployment Specification | Full production spec (4-part design) | +XP |

**Unique elements**: Cost calculator with grid interaction; 3 separate permission JSON textareas for different security scenarios; highest code-block count of any non-skills lab (51); log analysis with structured data.

### Lab 09 — Capstone Build (2,081 lines)

| Section | Title | Key Interaction | XP |
|:-------:|-------|:---------------:|:--:|
| 0 | Hero | Locked sections | — |
| 1 | Choosing Your Problem | Problem selection (4 radio options) | +XP |
| 2 | Pipeline Architecture Design | Architecture textarea + pipe example | +XP |
| 3 | Prompt & Skill Design | TCEF build + Skill YAML validator | +XP |
| 4 | Safety & Production Design | Permission JSON + human gate spec | +XP |
| 5 | Peer Review Protocol | 5-dimension self-assessment rubric | +40 XP |
| 6 | Your Capstone Design Document | Auto-assembled export + completion | — |

**Unique elements**: Only lab with no MCQ questions; 5-dimension weighted self-assessment rubric (correctness/architecture/safety/adaptability/communication); problem selection via ARIA radio buttons; auto-assembled design document export.

---

## 4. Content Quality Assessment

| Lab | Completeness | Code Examples | Instruction Clarity | Progressive Difficulty | Overall Quality |
|:---:|:------------:|:-------------:|:-------------------:|:---------------------:|:---------------:|
| 01 | Complete | Working (4 realistic scenarios) | High — specific | Moderate (flat sections) | **8/10** |
| 02 | Complete | Working (GCCF, trace, error sim) | High | Good (predict→apply→reflect) | **9/10** |
| 03 | Complete | Working (3-layer traces, patterns) | High | Good (black box → full trace) | **9/10** |
| 04 | Complete | Working (JSON schemas, configs) | High — very specific | Excellent (gated by score) | **9.5/10** |
| 05 | Complete | Partially working (no real API) | High — very structured | Excellent (atomic → full prompt) | **9/10** |
| 06 | Complete | Working (YAML, CLI commands) | High | Good | **8.5/10** |
| 07 | Complete | Working (system prompts, specs) | High | Good | **8.5/10** |
| 08 | Complete | Working (JSON configs, logs) | High — production-realistic | Good | **9/10** |
| 09 | Complete | Working (TCEF, YAML, JSON) | High — synthesis focus | Good (accumulates all prior skills) | **8.5/10** |

### Placeholder Analysis

"Placeholder" counts from the search were driven by `placeholder` attributes on `<textarea>` elements — not by missing or stub content. Every placeholder text contains detailed example answers. No skeletal TODO comments or stub content was found. The 8–23 count per lab is entirely HTML form `placeholder=""` attributes containing instructive examples.

### Code Example Quality

Labs consistently use realistic code examples:
- File paths (`src/api/routes.ts`, `config/production.json`)
- Real command patterns (`claude "..."`, `claude -p "..."`)
- Working JSON (settings.json with permissions, mcpServers configs)
- Accurate error messages and trace sequences

No invented flags (`--thinking`, `--context`) or non-existent commands (`/memory`) were found in lab content proper. The two accuracy-flag matches in Labs 02 and 09 are internal JS object key names (`'mcp-primitive'` as a dictionary key), not instructional content — these are false positives.

Lab 04 handles SSE deprecation **correctly and explicitly**: it teaches that SSE was deprecated 2025-03-26 and includes it as a quiz question where the correct answer is "use Streamable HTTP."

---

## 5. Interactivity Assessment

### Interaction Type Inventory

| Interaction Type | Labs Using It | Notes |
|:-----------------|:-------------:|:------|
| Textarea (free-write) | All 9 | Core apply mechanism |
| MCQ (multiple choice) | 01–08 | Missing from Lab 09 |
| Click-to-expand (trace/pattern) | 01, 02, 03, 07 | Expandable detail panels |
| Animated trace simulator | 01, 02, 03 | Step-by-step with typed output |
| Prediction + reveal gate | 02–08 | 15-char minimum to unlock |
| Score-gated section unlock | 04 | 5/6 matcher, 2/3 kcheck |
| Intervention trainer | 03, 07 | Choose correct response to agent question |
| YAML validator | 06, 09 | Field-by-field validation logic |
| JSON textarea (structured output) | 04, 08, 09 | Formatted input with syntax hints |
| Copy-to-clipboard | 01, 04, 06 | Command copying |
| Weighted self-assessment rubric | 09 | 5-dimension with score calculation |
| Problem selection (radio) | 09 | ARIA radio button pattern |
| Drag/touch hints | All 9 | CSS drag class present (minor) |
| Document export | 01, 09 | Download as `.txt` |
| Cost calculator | 08 | Token/cost math interaction |

### Gamification Depth Rating

| Lab | Depth | Rationale |
|:---:|:-----:|-----------|
| 01 | Shallow | Score ring only; no streak/milestone/XP persistence |
| 02 | Deep | Full system: streak, milestone, connect-forward, locked sections, XP persistence |
| 03 | Deep | Full system + intervention trainer |
| 04 | Deep+ | Most localStorage ops (29); score-gated unlocks; largest XP amounts |
| 05 | Deep+ | Most milestones (25); highest XP variety; TCEF completeness gate |
| 06 | Deep | Full system; highest code density; YAML validation |
| 07 | Deep | Full system; most buttons (63); multi-scenario MCQ |
| 08 | Deep | Full system; cost calculator; structured log analysis |
| 09 | Different | No predictions or MCQ; rubric-based depth; export artifact |

### Feedback Mechanism Analysis

| Mechanism | Immediacy | Visual | Text | Labs |
|-----------|:---------:|:------:|:----:|:----:|
| MCQ correct/incorrect highlight | Immediate | Green/red border | Explanation text | 01–08 |
| XP toast (+N XP, fades) | Immediate | Amber badge | XP amount | 02–09 |
| Streak toast | Immediate | Color-coded badge | 3x/5x/7x text | 02–08 |
| Milestone toast | Immediate | Cyan badge | Milestone name | 02–09 |
| Prediction reveal (char gate) | Triggered | Button enable | Reveal text | 02–08 |
| YAML validation feedback | Triggered | Green check/red X | Field-by-field | 06, 09 |
| JSON schema feedback | Triggered | Visual highlight | Error message | 04, 08, 09 |
| Score ring (0–4) | After all Q | Color-coded | Score + message | 01 |
| Self-assessment score bar | Per dimension | Animated bar | Weighted total | 09 |
| connect-forward | Delayed (section end) | Cyan card | Next-lab teaser | 02–03, 06–09 |

### State Persistence (localStorage)

| Lab | Keys Persisted | Scope |
|:---:|:--------------:|:------|
| 01 | 3 (reflections, completion) | Custom `lab01-*` prefix |
| 02 | 7 (xp, sections, questions, complete) | `lab-02-*` via LAB_KEY |
| 03 | 9 (xp, sections, ce state, complete) | `lab-03-*` via LAB_KEY |
| 04 | 29 (xp, streak, sections, textareas) | `STORAGE_KEYS` object |
| 05 | 10 (full STATE object as JSON) | `lab-05-state` (monolithic) |
| 06 | 14 (xp, questions, sections, complete) | `lab-06-*` via LAB_KEY |
| 07 | 30 (xp, sections, apply states, reveals) | `lab-07-*` via LAB_KEY |
| 08 | 20 (xp, sections, completion, predictions) | `lab-08-*` via LAB_KEY |
| 09 | 18 (xp, problem choice, sections, dimensions) | `lab-09-*` via LAB_KEY |

**Lab 05 anomaly**: Uses a monolithic `JSON.stringify(STATE)` pattern rather than granular keys. This means any corruption of the state object clears all progress simultaneously. All other labs use granular key-per-item persistence.

---

## 6. Cross-Lab Consistency

### Design System Consistency

| Element | Lab 01 | Labs 02–09 | Gap |
|---------|:------:|:----------:|:----|
| CSS variable token set (`:root`) | Identical | Identical | None |
| Nav bar | Custom (progress dots only) | `nav-dot` with locked/active/complete | Minor |
| Section pattern | `<section>` with scroll snap | `section-block` with lock overlay | **Architectural divergence** |
| XP system | None (score ring only) | Full LAB_KEY + toast system | **Major gap** |
| Streak system | None | Yes (3/5/7 levels) | **Major gap** |
| Milestones | None | Yes | **Major gap** |
| Button styles | btn-primary, btn-ghost | btn-primary, btn-ghost, btn-success, btn-amber | Minor |
| Lucide icons | Yes | Yes | None |
| `@media` breakpoint | 1 (768px) | 0–2 | Inconsistent (see below) |
| Scroll-behavior | `html { scroll-behavior: smooth }` | same | None |
| Footer attribution | Yes | Partial (02–09 have abbreviated) | Minor |
| connect-forward | None | Labs 02, 03, 06, 07, 08, 09 | Missing from 01, 04, 05 |

### Media Query Coverage

| Lab | `@media` Count | Responsive Rules Defined |
|:---:|:--------------:|:-------------------------|
| 01 | 1 | `max-width: 768px` — nav padding, comparison grid |
| 02 | 1 | `max-width: 768px` — nav, gccf-grid, bad-prompt-cards, rubric |
| 03 | 1 | `max-width: 768px` — nav, compare-grid, layers-grid, rubric |
| 04 | 2 | `max-width: 768px` + `max-width: 480px` — layout adjustments |
| 05 | 2 | `max-width: 768px` + `max-width: 480px` |
| **06** | **0** | **None — no responsive rules** |
| **07** | **0** | **None — no responsive rules** |
| 08 | 1 | `max-width: 600px` — calc-grid only |
| 09 | 1 | `max-width: 768px` — basic nav padding |

### Naming Convention Consistency

| Pattern | Labs Using It | Deviation |
|---------|:-------------:|:----------|
| `LAB_KEY = 'lab-0N'` | 02, 03, 06, 07, 08, 09 | Lab 04 uses `STORAGE_KEYS` object; Lab 05 uses `STATE` object; Lab 01 uses no key |
| `section-block` | 01, 02, 03, 06, 07, 08, 09 | Lab 04 uses `<section class="section">` |
| `dot-locked / dot-active / dot-complete` | 02–09 | Lab 01 uses `.nav-dot.active` / `.nav-dot.done` |
| `answer-option` | 01, 02, 03, 05, 06, 07, 08 | Lab 04 uses `kcheck-opt`; Lab 09 has none |
| `challenge-card` | 01, 02, 03, 06, 07, 08 | Labs 04, 05, 09 use custom card types |
| `connect-forward` | 02, 03, 06, 07, 08, 09 | Missing from 01, 04, 05 |
| `lab-framework/` reference | **None** | All 9 labs are self-contained — framework unused |

### UI Element Consistency (Score: 7/10)

The CSS token set (colors, radii, spacing) is **perfectly consistent** across all 9 labs — same `:root` variable block appears in every file. Component-level patterns are **mostly consistent** for Labs 02–09 but Lab 01 is architecturally distinct.

---

## 7. Gap Analysis

### Critical Gaps

| Gap | Affected Labs | Severity | Description |
|-----|:-------------:|:--------:|-------------|
| Lab 01 XP system missing | Lab 01 | **High** | Only lab with no XP accumulation, no streak, no milestone. Learners returning to the course dashboard will see 0 XP for their Day 1 opening lab. |
| Labs 06, 07 — zero media queries | Labs 06, 07 | **High** | On viewports < 768px, multi-column grids (skills cards, agent cards, code blocks with 73 instances) will overflow or compress unreadably. |
| lab-framework unused | All 9 | **Medium** | The `lab-framework/core.css` (668 lines) and `core.js` (655 lines) exist and are comprehensive but no lab includes them. All labs inline all CSS and JS. This means bug fixes to the shared framework don't propagate. |
| connect-forward missing | Labs 01, 04, 05 | **Medium** | No explicit "next lab" nudge at completion. Lab 01 lacks it entirely. Labs 04 and 05 have no connect-forward panel despite being mid-sequence. |
| Prediction challenges absent | Lab 09 | **Medium** | Lab 09 has 0 prediction challenges — the only lab with none. Breaks the "predict before you learn" pedagogical pattern established across Labs 01–08. |
| Lab 05 monolithic localStorage | Lab 05 | **Medium** | Single `JSON.stringify(STATE)` key means any corruption of STATE clears all 5-section progress at once. Other labs use granular keys. |
| Module 06 has no lab | Architecture | **Medium** | MCP Building (TypeScript SDK, writing tool schemas, error handling) has no hands-on lab. Lab 04 covers architecture and reading schemas, but learners never write a server. |
| Module 08 has no lab | Architecture | **Medium** | Meta-Prompting has no lab. Lab 06 (Skills) touches adjacent territory but meta-prompting as a discipline (prompt chaining, self-modifying prompts, recursive prompt structures) is absent. |
| Module 11 has no lab | Architecture | **Low** | Tech Stack Adaptation has no lab — partially intentional (it's a cross-cutting concern). |

### Accessibility Gaps

| Gap | Affected Labs | Description |
|-----|:-------------:|-------------|
| Low `role=` attribute count | Labs 06, 08 | Labs 06 and 08 have only 2 `role=` attributes each. Complex interactive patterns (button groups, collapsible sections) lack semantic ARIA roles. |
| Zero `tabindex` in Labs 06, 08 | Labs 06, 08 | Interactive elements beyond buttons are not keyboard-navigable. |
| Intervention options missing aria-pressed | Lab 03, 07 | `intervention-opt` buttons don't update aria state when selected. |
| Missing lang on all labs | All 9 | `<html lang="en">` is present on all — no gap here. |
| Modal focus trap | Lab 01 only | The "About" modal in Lab 01 has explicit focus management; no other lab has modal dialogs, so this is not a gap elsewhere. |
| Trace line expandables missing aria-expanded | Labs 01, 02, 03, 07 | Clickable trace lines have no `aria-expanded` state toggle. |

### Mobile Responsiveness Issues

| Lab | Issue | Specific Elements Affected |
|:---:|:-----:|:--------------------------|
| 06 | No breakpoints | 73 code blocks at 100% width; skills card grids; YAML textarea at `min-height: 280px` |
| 07 | No breakpoints | Agent card grids; multi-column layouts; large MCQ button groups |
| 08 | Only `calc-grid` responsive | Permission JSON textareas; code block grids; production spec layout |
| 04 | Better than most (2 breakpoints) | Still has complex matcher UI that could break on very small screens |

---

## 8. Lab-to-Module Alignment

### Mapping Table

| Lab | Day | Module(s) | Alignment Score | Covered Concepts | Missing Concepts |
|:---:|:---:|:---------:|:---------------:|:----------------:|:----------------:|
| 01 | 1 | M01 | **9/10** | Paradigm shift, PRAO loop, agentic trace, 5 CLI commands, prompt specificity | M01.5 (when NOT to use agentic AI) |
| 02 | 1 | M02 | **8.5/10** | GCCF, CLAUDE.md, settings.json, trace reading, error handling, threading | Two modes (headless vs interactive) underemphasized |
| 03 | 1 | M03 | **9.5/10** | Chain-of-thought, tool call sequences, clarification requests, extended thinking | — (excellent coverage) |
| 04 | 2 | M05 + partial M06 | **8/10** | Three primitives, transport config, schema reading, MCP in PRAO | M06 (SDK, writing servers, error handling) |
| 05 | 2 | M04 | **9/10** | TCEF, context injection, prompt iteration, constraint specification | M04.1 (GCCF limitations deep-dive) |
| 06 | 2 | M07 + partial M08 | **7.5/10** | Skill anatomy, YAML frontmatter, triggers, slash commands, composition | M08 (meta-prompting, chaining, recursive prompts) |
| 07 | 3 | M09 | **9/10** | Why multi-agent, task decomposition, orchestrator patterns, failure modes | M09.4 (inter-agent communication protocols detailed) |
| 08 | 3 | M10 | **8.5/10** | Permission scoping, secrets management, cost optimization, observability | M10.4 (prompt injection awareness, M10.5 approval gates theory) |
| 09 | 3 | M12 + partial M11 | **8/10** | Production pipeline design, prompt+skill synthesis, safety, peer review | M12.4 (observability/incident response); M11 (tech stack adaptation) |

### Concept Coverage Gaps (by module section)

| Module Section | Concept | Lab Coverage | Gap Level |
|:--------------|:--------|:------------:|:---------:|
| M01.5 | When NOT to use agentic AI | Not in Lab 01 | Low |
| M02.1 | Two modes (headless vs interactive) | Mentioned in Lab 02 code examples | Low |
| M04.1 | Why GCCF is insufficient | Lab 05 starts with this but briefly | Low |
| M06.1–6.5 | MCP Server Building (full module) | **No dedicated lab** | **High** |
| M08.1–8.5 | Meta-Prompting (full module) | Lab 06 touches skill composition only | **High** |
| M09.4 | Inter-agent communication (structured output schemas) | Lab 07 covers format generally | Medium |
| M10.4 | Prompt injection awareness | Lab 08 mentions briefly (4 matches) | Medium |
| M10.5 | Approval gates theory | Lab 08 CE has permission scopes but not gates | Medium |
| M11.1–11.5 | Tech Stack Adaptation (full module) | **No dedicated lab** | **Medium** |
| M12.4 | Observability and incident response | Lab 08 covers observability; Lab 09 skips it | Medium |

### Orphan Lab Exercises (not tied to module concepts)

| Lab | Exercise | Orphan? | Assessment |
|:---:|:--------|:-------:|:----------:|
| Lab 01 | Reflection export as `.txt` | Partially | Valuable pedagogically but not in module content |
| Lab 02 | Conversation threading (3 modes) | No | M02 covers threading |
| Lab 04 | Primitive Matcher game | No | M05.2 |
| Lab 06 | Skill Ecosystem design (Section 7) | Partially | M07 has skill composition but not ecosystem design at this scope |
| Lab 07 | Specialist agent system prompt writing (CE-07-B) | No | M09.2 orchestrator patterns |
| Lab 09 | 5-dimension self-assessment rubric | No | M12 has assessment discussion |

No orphan exercises were found — every exercise connects to a module concept, though some are extended beyond module scope.

---

## 9. Framework Decoupling Issue

The `lab-framework/` directory contains mature, well-engineered code:

| File | Lines | Capabilities |
|------|------:|:------------|
| `core.js` | 655 | XP system, streaks, section unlock, reflection journaling, PredictionChallenge, KnowledgeCheck, ApplyTask, nav dots, char validators |
| `core.css` | 668 | Full design system tokens, all component styles, animations, responsive breakpoints |
| `build.js` | 276 | Build tool to inline CSS/JS into lab HTML |

**None of the 9 lab HTML files reference `core.js`, `core.css`, or `build.js`.**

Each lab inlines the entire design system (~400–600 lines of CSS) and a custom JS engine (~200–400 lines). This creates:
- **Code divergence**: Labs 01 uses a different XP/nav pattern than the shared framework suggests. Lab 04 uses `STORAGE_KEYS` object instead of `LAB_KEY`. Lab 05 uses monolithic STATE.
- **Maintenance burden**: Bug fixes require touching all 9 files independently.
- **Framework value unrealized**: The `build.js` tool exists to solve exactly this problem but is not in use.

---

## 10. Actionable Findings — Priority Stack

### P1 — Fix within one sprint

| Finding | Action | Files |
|---------|:------:|:------|
| Lab 01 missing XP/streak system | Upgrade Lab 01 to LAB_KEY-based XP pattern with milestone toasts — or explicitly document it as an "intro" lab with lighter gamification | `lab-01-paradigm-shift.html` |
| Lab 06 has no media queries | Add `@media (max-width: 768px)` breakpoints for code blocks, skill cards, YAML grids | `lab-06-skills-commands.html` |
| Lab 07 has no media queries | Add `@media (max-width: 768px)` breakpoints for agent cards and MCQ grids | `lab-07-multi-agent.html` |
| Lab 01, 04, 05 missing connect-forward | Add connect-forward panel at each lab's completion section pointing to the next lab | Three files |

### P2 — Address in next iteration

| Finding | Action | Files |
|---------|:------:|:------|
| Lab 05 monolithic localStorage | Refactor `STATE` object to granular keys (one per section, per question) | `lab-05-prompt-engineering.html` |
| Labs 06, 08 low accessibility | Add `role=` and `tabindex` to all interactive non-button elements; add `aria-expanded` to trace line toggles | Labs 06, 08 |
| lab-framework not in use | Either adopt `build.js` (inline via build step) or formally deprecate the framework directory to avoid false impression of shared code | All 9 labs + `lab-framework/` |
| Module 06 (MCP Building) gap | Design a Lab 04b or extend Lab 04 with a Capstone Challenge requiring a TypeScript MCP server stub | New lab or Lab 04 extension |

### P3 — Long-term roadmap

| Finding | Action |
|---------|:------:|
| Module 08 (Meta-Prompting) gap | Add meta-prompting exercises to Lab 06 (skill composition section) or create Lab 06b |
| Lab 09 no predictions | Add 2–3 prediction challenges in Sections 1–3 to restore pedagogical pattern consistency |
| Prompt injection coverage | Expand Lab 08 Section 2 or add a dedicated subsection on prompt injection defense patterns |
| Approval gates theory | Add a conceptual panel in Lab 08 or Lab 09 on human-in-the-loop gate design |

---

## 11. Quality Scorecard — Summary

| Lab | Lines | Gamification | Accessibility | Responsiveness | Content Accuracy | Module Alignment | Overall |
|:---:|------:|:------------:|:-------------:|:--------------:|:----------------:|:----------------:|:-------:|
| 01 | 2,030 | 5/10 | 7/10 | 8/10 | 10/10 | 9/10 | **8/10** |
| 02 | 1,976 | 9/10 | 9/10 | 8/10 | 10/10 | 8.5/10 | **9/10** |
| 03 | 2,106 | 9/10 | 8/10 | 8/10 | 10/10 | 9.5/10 | **9/10** |
| 04 | 2,514 | 9.5/10 | 8/10 | 9/10 | 10/10 | 8/10 | **9/10** |
| 05 | 2,827 | 9/10 | 9/10 | 9/10 | 10/10 | 9/10 | **9.5/10** |
| 06 | 1,999 | 8.5/10 | 5/10 | 4/10 | 10/10 | 7.5/10 | **7/10** |
| 07 | 2,109 | 9/10 | 7/10 | 4/10 | 10/10 | 9/10 | **7.5/10** |
| 08 | 2,003 | 8.5/10 | 5/10 | 6/10 | 10/10 | 8.5/10 | **8/10** |
| 09 | 2,081 | 7/10 | 8/10 | 8/10 | 10/10 | 8/10 | **8.5/10** |
| **Avg** | **2,183** | **8.2/10** | **7.3/10** | **7.1/10** | **10/10** | **8.6/10** | **8.4/10** |

**Content accuracy is perfect across all 9 labs** (10/10). No banned flags, no deprecated API patterns presented as current, correct SSE deprecation messaging, correct 3-primitive MCP count.

**Responsiveness is the weakest dimension** (7.1/10 average), driven by Labs 06 and 07 having no mobile breakpoints at all.

---

*Analysis generated: 2026-03-22*
*Total lab lines analyzed: 19,645*
*Total observations: 9 labs × 6 dimensions + cross-lab + framework*
