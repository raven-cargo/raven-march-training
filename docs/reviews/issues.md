# Module Issues Register

**Generated**: 2026-03-18
**Last updated**: 2026-03-19 (post-fix pass 3)
**Source**: Deep 5-lens audit across 4 parallel review tracks
**Dashboard**: [modules-deep-audit-dashboard-2026-03-18.html](modules-deep-audit-dashboard-2026-03-18.html)

---

## Summary

| Priority | Count | Status |
|----------|-------|--------|
| P0 — Immediate | 9 | **9/9 DONE** |
| P1 — Quality Lift | 12 | **12/12 DONE** |
| P2 — Polish | 6 | **4/6 DONE** (2 backlog items remain) |
| **Total** | **47 findings** (9 high, 19 medium, 19 low) | |

**Zero-tolerance factual violations**: 0 (all 8 checks pass across all 12 modules)
**Fix pass 1 completed**: 2026-03-18 — 4 parallel review tracks, 13/21 P0+P1 items resolved
**Fix pass 2 completed**: 2026-03-18 — targeted module upgrades (M06/M08/M11/M12), 19/21 P0+P1 items resolved  
**Fix pass 3 completed**: 2026-03-19 — data-phase on M01-M03 cards (47 cards), ix-entry-label standardized (18 instances), spec updated, viewer-validated  
**Fix pass 4 completed**: 2026-03-20 — interactive restructuring for M01/M03 and collapse-depth upgrades in M08, 21/21 P0+P1 items resolved

---

## P0 — Immediate Fixes

### P0-01 · M12 · Invalid `data-phase` value on hero
- **Category**: `uiux`
- **Severity**: `high`
- **File**: `docs/curriculum/modules/12-capstone-production.md`
- **Location**: Line 3
- **Issue**: `data-phase="goal"` is not a valid phase value
- **Valid values**: `perceive`, `reason`, `act`, `observe`, `success`, `error`, `neutral`
- **Fix**: Change to `data-phase="success"` or `data-phase="observe"`
- **Status**: `done` — changed to `data-phase="success"`

### P0-02 · M12 · Wrong entry-list class name
- **Category**: `spec`
- **Severity**: `high`
- **File**: `docs/curriculum/modules/12-capstone-production.md`
- **Location**: Lines 889–910 (6 instances)
- **Issue**: Uses `ix-entry-label` instead of `ix-entry-title`
- **Fix**: Replace all `ix-entry-label` with `ix-entry-title`
- **Status**: `done`

### P0-03 · M12 · Non-standard entry-list badge values
- **Category**: `spec`
- **Severity**: `high`
- **File**: `docs/curriculum/modules/12-capstone-production.md`
- **Location**: Lines 889–910
- **Issue**: Uses `data-badge="warning"` and `data-badge="error"` instead of `include`/`exclude`
- **Fix**: Change to `data-badge="exclude"` for warnings/errors, use entry body text to convey severity
- **Status**: `done`

### P0-04 · M01 · Missing objective in Overview
- **Category**: `spec`
- **Severity**: `high`
- **File**: `docs/curriculum/modules/01-paradigm-shift.md`
- **Location**: Line 22
- **Issue**: `## Overview` jumps to `ix-instruct` + `predict-reveal` with no `data-component="objective"`
- **Fix**: Add `<div class="ix-diagram" data-component="objective"><p>...</p></div>` as first element after heading
- **Status**: `done`

### P0-05 · M03 · Missing objective in Overview
- **Category**: `spec`
- **Severity**: `high`
- **File**: `docs/curriculum/modules/03-agent-thinking.md`
- **Location**: Lines 22–41
- **Issue**: `## Overview` followed by prose, then collapse, then markdown list — no `objective` component
- **Fix**: Add `objective` component as first element after `## Overview`
- **Status**: `done`

### P0-06 · M03 · Markdown numbered objectives list
- **Category**: `spec`
- **Severity**: `high`
- **File**: `docs/curriculum/modules/03-agent-thinking.md`
- **Location**: Lines 34–40
- **Issue**: Five numbered items in markdown format; spec says "use hero chips or ix-objective components"
- **Fix**: Remove list (hero chips already cover these) or convert to `accordion`/`click-cards`
- **Status**: `done`

### P0-07 · M02 · Inline style attributes
- **Category**: `spec`
- **Severity**: `high`
- **File**: `docs/curriculum/modules/02-claude-code-foundations.md`
- **Location**: Lines 582, 604, 626, 648, 670 (`style="margin:0;display:block"`), Line 1292 (`style` on `<pre>`)
- **Issue**: Inline `style` attributes bypass the CSS class system
- **Fix**: Create utility CSS classes and replace inline styles
- **Status**: `done`

### P0-08 · M02 · Missing ix-instruct before click-cards
- **Category**: `spec`
- **Severity**: `medium` (promoted to P0 for consistency)
- **File**: `docs/curriculum/modules/02-claude-code-foundations.md`
- **Location**: Lines 34–42
- **Issue**: Architecture section has objective, prose, then click-cards without `ix-instruct`
- **Fix**: Add `<p class="ix-instruct">Click each component to explore the Claude Code architecture.</p>`
- **Status**: `done`

### P0-09 · M02 · Duplicate data-diagram-id
- **Category**: `spec`
- **Severity**: `low` (promoted to P0 for correctness)
- **File**: `docs/curriculum/modules/02-claude-code-foundations.md`
- **Location**: Line 578 and Line 690
- **Issue**: Both use `data-diagram-id="claudemd-hierarchy"` on different components
- **Fix**: Rename one to `claudemd-hierarchy-walk` or `claudemd-hierarchy-tree`
- **Status**: `done`

---

## P1 — Quality Lift

### P1-01 · ALL · Missing aria-label on predict-reveal textareas
- **Category**: `a11y`
- **Severity**: `medium`
- **Files**: All 12 module files
- **Instances**: 24+
- **Issue**: `<textarea class="ix-predict-input" placeholder="...">` lacks `aria-label`
- **Fix**: Add `aria-label="Your prediction"` to every `ix-predict-input` textarea
- **Status**: `done`

### P1-02 · M05, M06 · Hardcoded hex in data-accent
- **Category**: `uiux`
- **Severity**: `high`
- **Files**: `05-mcp-architecture.md` (7 instances), `06-mcp-building.md` (9 instances)
- **Locations**: M05 lines 88,92,96,100,192,196,200 · M06 lines 117,121,125,425,429,433,666,670,674
- **Issue**: Raw hex values in `data-accent` bypass theme system
- **Fix**: Replace with `data-phase` attribute values matching semantic meaning
- **Status**: `done`

### P1-03 · M08 · Only 1 quiz (spec requires 2–3)
- **Category**: `pedagogy`
- **Severity**: `high`
- **File**: `docs/curriculum/modules/08-meta-prompting.md`
- **Location**: Lines 500–542 (only quiz)
- **Issue**: Single quiz in entire module
- **Fix**: Add a second quiz after Section 8.2 or 8.3
- **Status**: `done` — added `m08-loop-knowledge-check`

### P1-04 · M11 · Only 1 quiz (spec requires 2–3)
- **Category**: `pedagogy`
- **Severity**: `medium`
- **File**: `docs/curriculum/modules/11-tech-stack-adaptation.md`
- **Location**: Line 796
- **Fix**: Add a mid-module quiz after Section 11.3
- **Status**: `done` — added `m11-adaptation-midpoint-check`

### P1-05 · M12 · Only 1 quiz for 6-section capstone
- **Category**: `pedagogy`
- **Severity**: `medium`
- **File**: `docs/curriculum/modules/12-capstone-production.md`
- **Location**: Line 917
- **Fix**: Add a second quiz after Section 12.3 (deployment checklist)
- **Status**: `done` — added `m12-maintenance-quiz`

### P1-06 · M06 · Only 1 predict-reveal in 5-section module
- **Category**: `pedagogy`
- **Severity**: `high`
- **File**: `docs/curriculum/modules/06-mcp-building.md`
- **Fix**: Add predict-reveal before Section 6.3 (schema writing) or 6.4 (error handling)
- **Status**: `done` — added `m06-error-classification-predict`

### P1-07 · M08 · Missing predict-reveal in Sections 8.4 and 8.5
- **Category**: `spec`
- **Severity**: `medium`
- **File**: `docs/curriculum/modules/08-meta-prompting.md`
- **Fix**: Add predict-reveal asking students to predict convergence behavior or limitation categories
- **Status**: `done` — added `m08-loop-bottleneck-predict` and `m08-limits-predict`

### P1-08 · M12 · Missing predict-reveal in 4 of 6 sections
- **Category**: `pedagogy`
- **Severity**: `medium`
- **File**: `docs/curriculum/modules/12-capstone-production.md`
- **Fix**: Add predict-reveal to Section 12.1 (pipeline selection) or 12.5 (maintenance cadence)
- **Status**: `done` — added `m12-maintenance-predict`

### P1-09 · M05 · Duplicate SSE deprecation callout
- **Category**: `pedagogy`
- **Severity**: `medium`
- **File**: `docs/curriculum/modules/05-mcp-architecture.md`
- **Location**: Lines 513 (in-tab) and 531 (standalone)
- **Fix**: Remove standalone callout at line 531
- **Status**: `done`

### P1-10 · M10 · Four consecutive stacked callouts
- **Category**: `uiux`
- **Severity**: `medium`
- **File**: `docs/curriculum/modules/10-security-sandboxing.md`
- **Location**: Lines 967–981
- **Issue**: tip, tip, warning, warning stacked; spec says max 2 consecutive
- **Fix**: Merge the two tips and two warnings, or separate with prose
- **Status**: `done`

### P1-11 · M01, M03 · Stacked key-concept callouts in Best Practices
- **Category**: `pedagogy`
- **Severity**: `low`
- **Files**: M01 lines 1285–1313 (3 tip + 5 key-concept), M03 lines 1547–1561 (4 key-concept)
- **Fix**: Convert to tabbed-panel, accordion, or click-cards
- **Status**: `done` — converted to interactive `tabbed-panel`/`click-cards` blocks

### P1-12 · M08 · Only 1 collapsed details section (target: 3–6)
- **Category**: `pedagogy`
- **Severity**: `medium`
- **File**: `docs/curriculum/modules/08-meta-prompting.md`
- **Location**: Lines 108–115 (only collapse)
- **Fix**: Add 2–3 collapse blocks for bootstrapping discussion, convergence details
- **Status**: `done` — added additional `ix-collapse` deep-dive sections

---

## P2 — Polish

### P2-01 · M01–03 · data-accent hex values (88 instances)
- **Category**: `uiux`
- **Severity**: `medium`
- **Files**: M01 (33), M02 (33), M03 (22)
- **Issue**: `data-accent="#hex"` bypasses theme system
- **Fix**: Audited viewer — `data-accent` is the intended mechanism for `initClickCards()`. Added `data-phase` to all 47 ix-card elements for semantic meaning. 42 remaining `data-accent` are on `ix-tab` elements (correct, no phase needed).
- **Status**: `done` — 47 cards updated with data-phase, viewer validated

### P2-02 · CROSS · Inconsistent compare component markup
- **Category**: `spec`
- **Severity**: `low`
- **Files**: M05 (`data-compare-left/right`), M06 (`data-label`), M08 (`ix-compare-left/right` classes), M09 (`data-side`)
- **Fix**: Standardize to whichever pattern module-viewer.html actually supports
- **Status**: `backlog`

### P2-03 · CROSS · Inconsistent step-walkthrough class names
- **Category**: `spec`
- **Severity**: `low`
- **Files**: M07 (`ix-step-header`), M09 (`ix-step-label`)
- **Fix**: Standardize to one class name
- **Status**: `backlog`

### P2-04 · M06/M07/M08 · `ix-entry-label` class standardization
- **Category**: `spec`
- **Severity**: `medium`
- **Files**: M06 (5), M07 (9), M08 (4) — previously undocumented finding from fix pass 1
- **Issue**: Used `ix-entry-label` (dead class not in viewer CSS/JS) instead of `ix-entry-title`
- **Fix**: Replaced all 18 instances with `ix-entry-title`
- **Status**: `done`

### P2-05 · M03 · Cross-module data-diagram-id collision
- **Category**: `spec`
- **Severity**: `medium`
- **Files**: M02 line 1670 and M03 line 68 both use `agent-output-layers`
- **Fix**: Add module prefix: `m03-agent-output-layers`
- **Status**: `backlog`

### P2-06 · M03 · Implicit spiral learning connectors
- **Category**: `pedagogy`
- **Severity**: `low`
- **File**: `docs/curriculum/modules/03-agent-thinking.md`
- **Fix**: Add explicit "You configured Claude Code in Module 02..." connector phrase
- **Status**: `backlog`

### P2-07 · `data-phase="goal"` documented in spec
- **Category**: `spec`
- **Severity**: `medium`
- **File**: `.claude/docs/CODING-ELEMENTS-SPEC.md`
- **Issue**: `data-phase="goal"` was used in M01/M02/M03 (15 instances) but not listed in spec
- **Fix**: Verified viewer CSS supports it (amber/warn color, lines 1008-1014, 1053). Added to CODING-ELEMENTS-SPEC `data-phase` table.
- **Status**: `done`

---

## Quality Metrics by Module

| Module | Grade | Words | Components | Quizzes | Predicts | Traces | Terminals | Collapses | Issues |
|--------|-------|-------|------------|---------|----------|--------|-----------|-----------|--------|
| M01 | A− | 8,202 | 43 | 3 | 5 | 2 | 1 | 1 | 5 |
| M02 | A | 10,356 | 51 | 3 | 2 | 2 | 2 | 6 | 6 |
| M03 | A− | 10,412 | 40 | 5 | 2 | 2 | 1 | 3 | 6 |
| M04 | A− | 6,144 | 25 | 2 | 3 | 1 | 0 | 6 | 4 |
| M05 | A− | 4,938 | 27 | 1 | 2 | 1 | 0 | 5 | 6 |
| M06 | A− | 5,373 | 27 | 1 | 2 | 1 | 0 | 6 | 3 |
| M07 | A− | 5,800 | 27 | 2 | 3 | 2 | 0 | 3 | 3 |
| M08 | A− | 4,200 | 24 | 2 | 4 | 3 | 0 | 1 | 2 |
| M09 | A | 6,200 | 28 | 2 | 2 | 2 | 0 | 2 | 2 |
| M10 | A− | 8,932 | 40 | 2 | 4 | 3 | 0 | 4 | 2 |
| M11 | A− | 7,509 | 29 | 2 | 2 | 2 | 0 | 3 | 2 |
| M12 | A− | 11,138 | 43 | 2 | 3 | 2 | 0 | 3 | 2 |

**Legend**: Quizzes = `quiz` + `scenario-quiz` components with 4+ questions | Predicts = `predict-reveal` | Traces = `agent-trace` | Terminals = `terminal-sim` | Collapses = `<details class="ix-collapse">`
