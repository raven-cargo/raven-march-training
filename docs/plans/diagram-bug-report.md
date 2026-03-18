# Interactive Diagram Bug Report

**Date**: 2026-03-16
**Scope**: Modules 01-03 interactive diagrams + markdown rendering
**Investigated by**: Debug analysis of full rendering pipeline

---

## Executive Summary

The rendering pipeline (marked.js parse -> postProcess -> hydrateInteractiveDiagrams) is architecturally sound. The HTML parsing, DOM restructuring, and component hydration all work correctly. The root cause of broken diagrams is a **marked.js indentation-as-code-block behavior** that affects exactly 3 decision-tree diagrams. A secondary CSS bug causes unstyled warning-phase nodes. The sidebar complaint relates to the section-card left-border design pattern.

**Verified working**: 24 of 27 diagrams across Modules 01-03
**Broken**: 3 decision-tree diagrams (all same root cause)
**CSS issue**: 1 missing phase-color mapping

---

## BUG 1 (CRITICAL): marked.js converts indented HTML inside nested divs into code blocks

**Affected diagrams**:
- Module 02 `decision-tree` (mode-decision) -- line 212 of `02-claude-code-foundations.md`
- Module 02 `decision-tree` (permissions-flow) -- line 576 of `02-claude-code-foundations.md`
- Module 03 `decision-tree` (clarification-decision) -- line 702 of `03-agent-thinking.md`

### Root cause

When `marked.js` (v17, loaded from CDN) encounters an HTML block containing a nested `<div>` followed by a blank line and then 4+ spaces of indentation, it treats the indented content as a **markdown code block**. The HTML tags get escaped (`<div>` becomes `&lt;div&gt;`) and wrapped in `<pre><code>`.

This happens because CommonMark and marked.js interpret 4-space indentation after a blank line as an indented code block, even inside an HTML block, when the content is at nesting depth >= 2.

### Exact pattern that triggers the bug

```markdown
  <div class="ix-tree-children open">
                                        <-- blank line
    <div class="ix-tree-node">          <-- 4-space indent = code block!
```

The blank line at the boundary between the opening `<div>` tag and the next 4-space-indented line causes marked.js to exit HTML block parsing and enter code block parsing. ALL subsequent content until the indentation drops gets eaten into a single `<pre><code>` block with escaped HTML entities.

### Impact

The nested tree nodes inside `<div class="ix-tree-children">` are rendered as escaped HTML text inside a code block instead of as interactive DOM elements. The `initDecisionTree()` function finds only the root `.ix-tree-node` (1 node instead of 5-10), so clicking the root reveals a code block showing raw HTML markup instead of an interactive tree.

### Fix (choose one)

**Option A (recommended): Remove blank lines after `<div class="ix-tree-children">`**

In each affected file, remove the blank line immediately after `<div class="ix-tree-children...">`:

```markdown
BEFORE (broken):
  <div class="ix-tree-children open">

    <div class="ix-tree-node" ...>

AFTER (fixed):
  <div class="ix-tree-children open">
    <div class="ix-tree-node" ...>
```

**Option B: Reduce indentation inside tree-children to < 4 spaces**

Change the indentation of content inside `ix-tree-children` blocks from 4 spaces to 2 spaces (or 0):

```markdown
BEFORE (broken):
  <div class="ix-tree-children open">

    <div class="ix-tree-node" ...>

AFTER (fixed):
  <div class="ix-tree-children open">

  <div class="ix-tree-node" ...>
```

**Option C: Both (most robust)**

Remove blank lines AND reduce indentation. This prevents any future accidental blank line insertions from re-triggering the bug.

### Files to edit

1. `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/docs/curriculum/modules/02-claude-code-foundations.md`
   - Line 220-222: Remove blank line 221 (between `ix-tree-children open` and first `ix-tree-node`)
   - Lines 232-234, 248-250: Remove blank lines between sibling tree-node groups inside same container
   - Line 584-586: Same fix for second decision tree

2. `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/docs/curriculum/modules/03-agent-thinking.md`
   - Line 709-711: Remove blank line 710 (between `ix-tree-children` and first `ix-tree-node`)
   - Lines 731-732, 752-753: Same fix for sibling groups

### Verification

After fixing, run this test to confirm:
```bash
node -e "
const { marked } = require('marked');
const fs = require('fs');
const html = marked.parse(fs.readFileSync('docs/curriculum/modules/02-claude-code-foundations.md','utf8'));
const broken = (html.match(/<pre><code>[\s\S]*?&lt;div class=&quot;ix-[\s\S]*?<\/code><\/pre>/g) || []);
console.log('Broken blocks:', broken.length); // Should be 0
"
```

---

## BUG 2 (LOW): Missing CSS for `data-phase="warning"` on tree/flow nodes

**File**: `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/module-viewer.html`
**Lines**: 614-670 (phase color variants section)

### Root cause

The CSS defines phase color variants for: `perceive`, `reason`, `act`, `observe`, `goal`, `error`, `success`, `neutral`. The markdown uses `data-phase="warning"` on `.ix-tree-node` elements (e.g., line 250 and 609 of `02-claude-code-foundations.md`), but there is NO CSS rule for:

```css
.ix-flow-node[data-phase="warning"],
.ix-tree-node[data-phase="warning"],
.ix-walk-badge[data-phase="warning"],
.ix-detail-header[data-phase="warning"] { ... }
```

The `data-phase="warning"` value only has CSS for `.ix-cap-fill` and `.ix-cap-val` (lines 679, 689). The yellow/warning color IS available via `data-phase="goal"`, but the markdown uses `"warning"` instead.

### Impact

Tree nodes with `data-phase="warning"` render with no background color, no accent border, and default text color. They appear unstyled compared to other phase-colored nodes. This is a cosmetic issue -- the nodes are functional but visually inconsistent.

### Fix (choose one)

**Option A: Add CSS rules for `data-phase="warning"`**

Add to `module-viewer.html` after the `data-phase="goal"` rules (around line 649):

```css
.ix-flow-node[data-phase="warning"],
.ix-walk-badge[data-phase="warning"],
.ix-detail-header[data-phase="warning"] {
  background: rgba(245,158,11,0.1);
  border-color: rgba(245,158,11,0.3);
  color: var(--ix-warn);
}
.ix-card[data-phase="warning"].active { border-color: var(--ix-warn); }
.ix-card[data-phase="warning"].active .ix-card-icon { color: var(--ix-warn); }
```

**Option B: Change markdown to use `data-phase="goal"` instead of `"warning"`**

Replace `data-phase="warning"` with `data-phase="goal"` in the 3 occurrences in `02-claude-code-foundations.md` (lines 250, 609, 615).

---

## BUG 3 (COSMETIC): Section-card left borders create "sidebar" visual effect

**File**: `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/module-viewer.html`
**Line**: 160

### Description

Each H2 section is wrapped in a `.module-section` card with `border-left: 2px solid var(--primary)`. When scrolling through a long module with 10+ sections, the continuous column of purple left borders creates a visual effect resembling a sidebar. The section number badges (`.section-num`) in each header add numbered circles to this left column, reinforcing the sidebar appearance.

This is not a rendering bug -- it is a design decision that produces an unintended visual pattern at scale.

### Impact

User perceives a "running sidebar that stacks and adds at lower levels." The effect is distracting when many sections are visible simultaneously.

### Fix options

**Option A: Reduce border visibility**
```css
.module-section {
  border-left: 2px solid transparent; /* Remove left border */
  /* Or: border-left-color: var(--border); -- subtle instead of accent */
}
.module-section.read {
  border-left-color: var(--success); /* Keep read indicator */
}
```

**Option B: Only show left border on hover/focus**
```css
.module-section {
  border-left: 2px solid transparent;
  transition: border-left-color 0.3s;
}
.module-section:hover,
.module-section:focus-within {
  border-left-color: var(--primary);
}
```

**Option C: Replace left border with a subtler indicator**

Use a top-border accent or a background tint instead of a left border to differentiate sections without creating the sidebar column effect.

---

## NON-ISSUES (Verified Working)

The following were investigated and confirmed to be working correctly:

### 1. HTML Block Survival Through marked.js

All `ix-diagram` HTML blocks survive `marked.parse()` intact. The `data-component` attributes, class names, and nested structure are preserved perfectly. Tested with marked.js v17.0.4 against all 27 diagrams.

### 2. postProcess DOM Restructuring

The `postProcess()` function wraps H2 sections into `.module-section` > `.section-body` wrappers. This moves `.ix-diagram` elements into `.section-body` but does NOT alter their internal structure. All `:scope > .ix-tab`, `:scope > .ix-card`, `:scope > .ix-trace-line`, `:scope > .ix-walk-step` selectors continue to work correctly after postProcess runs. Verified with JSDOM simulation.

### 3. Hydration Pipeline Order

`postProcess()` runs before `hydrateInteractiveDiagrams()`. The hydration functions find their expected child elements. No timing or ordering issues.

### 4. Component Init Functions

All 6 init functions (`initTabbedPanel`, `initClickCards`, `initFlowDiagram`, `initDecisionTree`, `initStepWalkthrough`, `initAgentTrace`) are logically correct. None throw exceptions that would cascade and prevent subsequent diagrams from being hydrated. The `forEach` loop in `hydrateInteractiveDiagrams` processes all 9 diagrams in each module.

### 5. CSS Completeness

All `ix-trace-*`, `ix-tab-*`, `ix-card-*`, `ix-walk-*`, `ix-tree-*`, `ix-flow-*` CSS classes referenced in the JavaScript and HTML are defined in the stylesheet. No missing selectors (except the `data-phase="warning"` issue noted in BUG 2).

### 6. Agent Trace Auto-Play

The IntersectionObserver-based auto-play (threshold 0.3) is correctly configured. The trace container has sufficient height from the controls bar even when the output area is empty. Auto-play triggers correctly when the element scrolls into view.

---

## Diagram Inventory

### Module 01: The Paradigm Shift (9 diagrams, 0 broken)

| # | Component | ID | Status |
|---|-----------|-------|--------|
| 0 | tabbed-panel | three-eras | OK (3 tabs) |
| 1 | agent-trace/terminal | m01-first-taste | OK (10 lines) |
| 2 | click-cards | prao-loop | OK (4 cards, 4 panels) |
| 3 | step-walkthrough | prao-worked-example | OK (11 steps) |
| 4 | agent-trace/prao | m01-prao-trace | OK (15 lines) |
| 5 | click-cards | session-vs-persistent | OK (7 cards, 7 panels) |
| 6 | click-cards | failure-modes | OK (4 cards, 4 panels) |
| 7 | agent-trace/compare | m01-era-compare | OK (2 groups) |
| 8 | click-cards | task-suitability | OK (4 cards, 4 panels) |

### Module 02: Claude Code Foundations (9 diagrams, 2 broken)

| # | Component | ID | Status |
|---|-----------|-------|--------|
| 0 | click-cards | architecture-overview | OK (7 cards, 7 panels) |
| 1 | decision-tree | mode-decision | **BROKEN** (BUG 1) |
| 2 | step-walkthrough | claudemd-hierarchy | OK (5 steps) |
| 3 | agent-trace/annotated | m02-claudemd-action | OK (11 lines) |
| 4 | decision-tree | permissions-flow | **BROKEN** (BUG 1) |
| 5 | agent-trace/terminal | m02-permissions-live | OK (9 lines) |
| 6 | tabbed-panel | mcp-transport | OK (2 tabs) |
| 7 | agent-trace/annotated | m02-mcp-trace | OK (8 lines) |
| 8 | click-cards | agent-output-layers | OK (3 cards, 3 panels) |

### Module 03: Agent Thinking (9 diagrams, 1 broken)

| # | Component | ID | Status |
|---|-----------|-------|--------|
| 0 | click-cards | agent-output-layers | OK (4 cards, 4 panels) |
| 1 | agent-trace/annotated | m03-reading-trace | OK (11 lines) |
| 2 | tabbed-panel | prao-state-machine | OK (4 tabs) |
| 3 | click-cards | tool-call-patterns | OK (5 cards, 5 panels) |
| 4 | agent-trace/compare | m03-intervention-signals | OK (2 groups) |
| 5 | decision-tree | clarification-decision | **BROKEN** (BUG 1) |
| 6 | tabbed-panel | thinking-depth | OK (3 tabs) |
| 7 | agent-trace/prao | m03-patterns-live | OK (15 lines) |
| 8 | step-walkthrough | bug-fix-trace | OK (7 steps) |

### Modules 04-12

No interactive diagrams. Zero `data-component` attributes found in any markdown file.

---

## Methodology

1. Read and analyzed the complete module-viewer.html (2752 lines)
2. Parsed all 3 module markdown files through marked.js v17.0.4
3. Simulated the full rendering pipeline in JSDOM:
   - `marked.parse(md)` -- HTML generation
   - `postProcess(contentEl)` -- DOM restructuring
   - Tested all component selectors post-restructuring
4. Verified HTML block survival through marked.js (no mangling detected)
5. Verified CSS completeness for all `ix-*` class names
6. Tested multiple fix approaches for the indentation bug
7. Checked live deployed site at agentic-ai-course-hazel.vercel.app

---

## Priority Matrix

| Bug | Severity | Effort | Priority |
|-----|----------|--------|----------|
| BUG 1: marked.js code-block escaping | CRITICAL | 15 min (markdown edits) | P0 -- Fix immediately |
| BUG 2: Missing warning phase CSS | LOW | 5 min (CSS addition) | P2 -- Fix when convenient |
| BUG 3: Section border sidebar effect | COSMETIC | 10 min (CSS change) | P3 -- Design decision |
