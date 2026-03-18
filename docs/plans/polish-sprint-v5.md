# Polish Sprint v5 -- From 6/10 to 9/10

**Goal**: Fix all 9 user-reported issues to bring module quality from 6/10 to 9/10.
**Scope**: `module-viewer.html` (component system) + 3 module markdown files.
**Constraint**: Keep terminal trace animations (user loves them).

---

## Root Cause Analysis

| # | User Complaint | Root Cause | Fix Location |
|---|----------------|------------|--------------|
| 1 | Numbering broken ("1Specific goal") | `.ix-step-row` class used in markdown but has NO CSS in module-viewer.html | module-viewer.html CSS |
| 2 | Tab panels too large | `.ix-tab-panel` has `padding: 20px 24px 24px` -- too generous for compact content | module-viewer.html CSS |
| 3 | No arrow navigation on tabs/cards | `initTabbedPanel` and `initClickCards` have click-only -- no keyboard or prev/next buttons | module-viewer.html JS |
| 4 | No instruction text above interactives | No `.ix-instruct` component exists (only `.ix-rq-instruct` for reveal-quiz) | module-viewer.html CSS + module markdown |
| 5 | Section structure wrong | Objectives buried mid-section, prose walls before interactives, no collapse | All 3 module .md files |
| 6 | Learning objectives not appearing first | `ix-objective` placed after intro paragraphs in many sections | All 3 module .md files |
| 7 | Callouts/concepts not distinct enough | `.ix-callout` variants lack strong visual differentiation vs v2 examples | module-viewer.html CSS |
| 8 | Too much text | No accordion/collapse mechanism for prose sections | module-viewer.html CSS+JS + module markdown |
| 9 | Not matching v2 example quality | v2 examples use: compact padding, `.instruct` italic gray text, stronger badge colors, tighter density | module-viewer.html CSS |

---

## Part A: Component System Fixes (module-viewer.html)

All changes in a single file: `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/module-viewer.html`

### A1. Fix step numbering CSS (CRITICAL -- fixes issue #1)

**Problem**: `.ix-step-row` is used in module markdown to display numbered steps inside detail panels (e.g., the productive pattern's 6 steps). This class has zero CSS, so the `<span class="ix-step-num">1</span>` runs directly into the text.

**Fix**: Add CSS for `.ix-step-row` and `.ix-step-num` when used inside it:

```css
/* ---- Step Row (inline numbered items inside detail panels) ---- */
.ix-step-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid var(--border);
}
.ix-step-row:last-child { border-bottom: none; }
.ix-step-row .ix-step-num {
  font-size: 12px;
  font-weight: 700;
  font-family: 'JetBrains Mono', monospace;
  min-width: 24px;
  flex-shrink: 0;
  text-align: center;
}
.ix-step-row > span:last-child {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.5;
}
```

This mirrors the `.step-item` / `.step-num` / `.step-text` pattern from the v2 `collaboration-model.html` example.

**Verification**: Load Module 01, navigate to section 1.4, click "Productive pattern" card. Steps should show "1  Specific goal" with proper spacing.

---

### A2. Add `.ix-instruct` instruction text component (fixes issue #4)

**Problem**: The v2 examples consistently show italic gray instruction text above every interactive (e.g., `<div class="instruct">Play icon Review each category...</div>`). The module-viewer has no equivalent.

**Fix**: Add CSS and auto-detection in the init pipeline.

CSS to add:
```css
/* ---- Instruction text above interactives ---- */
.ix-instruct {
  font-size: 12px;
  color: var(--dim);
  font-style: italic;
  padding: 0 20px;
  margin-bottom: 10px;
  line-height: 1.5;
}
.ix-instruct::before {
  content: '\25B6\00a0';  /* play triangle + space */
  font-style: normal;
}
```

Usage in markdown (authors add this inside `ix-diagram` divs, before the interactive content):
```html
<p class="ix-instruct">Click each card to explore the failure modes and the productive pattern.</p>
```

**No JS changes needed** -- this is pure CSS + content authoring.

---

### A3. Add arrow/prev-next navigation to tabbed-panel and click-cards (fixes issue #3)

**Problem**: `initTabbedPanel` and `initClickCards` only support click. The `initStepWalkthrough` already has prev/next buttons and keyboard support. Users want the same on tabs and cards.

**Fix for `initTabbedPanel`**: After building the tab nav, add a bottom nav bar with prev/next buttons and wire keyboard left/right arrow events.

```javascript
// Inside initTabbedPanel, after panels are appended:

// -- Add prev/next nav bar --
var walkNav = document.createElement('div');
walkNav.className = 'ix-walk-nav';
walkNav.innerHTML =
  '<button class="ix-walk-btn ix-tab-prev" disabled>&larr; Prev</button>' +
  '<span class="ix-walk-counter">1 / ' + panels.length + '</span>' +
  '<button class="ix-walk-btn ix-tab-next"' + (panels.length <= 1 ? ' disabled' : '') + '>Next &rarr;</button>';
el.appendChild(walkNav);

var prevBtn = walkNav.querySelector('.ix-tab-prev');
var nextBtnEl = walkNav.querySelector('.ix-tab-next');
var counterEl = walkNav.querySelector('.ix-walk-counter');

function goToTab(idx) {
  if (idx < 0 || idx >= panels.length) return;
  Array.from(nav.children).forEach(function(b) { b.classList.remove('active'); });
  panels.forEach(function(p) { p.classList.remove('active'); });
  nav.children[idx].classList.add('active');
  panels[idx].classList.add('active');
  setActiveAccent(nav.children[idx]);
  animateCapBars(panels[idx]);
  prevBtn.disabled = idx === 0;
  nextBtnEl.disabled = idx === panels.length - 1;
  counterEl.textContent = (idx + 1) + ' / ' + panels.length;
}

prevBtn.addEventListener('click', function() {
  var cur = panels.findIndex(function(p) { return p.classList.contains('active'); });
  goToTab(cur - 1);
});
nextBtnEl.addEventListener('click', function() {
  var cur = panels.findIndex(function(p) { return p.classList.contains('active'); });
  goToTab(cur + 1);
});

// Keyboard arrow support (when diagram is in viewport)
el.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowLeft') goToTab(panels.findIndex(function(p) { return p.classList.contains('active'); }) - 1);
  if (e.key === 'ArrowRight') goToTab(panels.findIndex(function(p) { return p.classList.contains('active'); }) + 1);
});
el.setAttribute('tabindex', '0');
```

**Fix for `initClickCards`**: Same pattern -- add bottom nav bar with prev/next, wire arrow keys.

```javascript
// Inside initClickCards, after detail panel handling:

var cardNav = document.createElement('div');
cardNav.className = 'ix-walk-nav';
cardNav.innerHTML =
  '<button class="ix-walk-btn ix-card-prev" disabled>&larr; Prev</button>' +
  '<span class="ix-walk-counter">1 / ' + cards.length + '</span>' +
  '<button class="ix-walk-btn ix-card-next"' + (cards.length <= 1 ? ' disabled' : '') + '>Next &rarr;</button>';
el.appendChild(cardNav);

// ... wire prev/next/keyboard same as above, calling card click simulation
```

**Verification**: All tabbed panels and click-card grids show prev/next buttons at the bottom. Arrow keys cycle through items when the component has focus.

---

### A4. Make tab panels more compact (fixes issue #2)

**Problem**: `.ix-tab-panel` padding is `20px 24px 24px`. The v2 examples use `padding: 16px 18px` -- much tighter.

**Fix**: Reduce padding and tighten child element spacing:

```css
/* Tighter tab panels */
.ix-tab-panel {
  padding: 14px 18px 16px;  /* was 20px 24px 24px */
}

/* Tighter detail panels inside cards */
.ix-detail-body {
  padding: 14px 18px;  /* was 18px 20px */
}

/* Tighter entry list items */
.ix-entry {
  padding: 12px 14px;  /* was 16px 18px */
  margin-bottom: 8px;  /* was 10px */
}

/* Tighter callouts */
.ix-callout {
  padding: 12px 16px;  /* was 16px 20px */
}

/* Tighter objective */
.ix-objective {
  padding: 12px 16px;  /* was 14px 18px */
  margin: 0 18px 16px; /* was 0 20px 20px */
}
```

---

### A5. Improve callout visual hierarchy (fixes issue #7)

**Problem**: Callout variants look too similar. The v2 examples have stronger color coding: tinted backgrounds, uppercase labels with color, distinct left borders.

**Fix**: Strengthen each variant's visual differentiation:

```css
/* Stronger callout variant backgrounds */
.ix-callout[data-variant="core-idea"] {
  background: rgba(6,182,212,0.06);
  border-left: 3px solid var(--accent);
}
.ix-callout[data-variant="key-concept"] {
  background: rgba(99,102,241,0.06);
  border-left: 3px solid var(--primary);
}
.ix-callout[data-variant="tip"] {
  background: rgba(16,185,129,0.06);
  border-left: 3px solid var(--success);
}
.ix-callout[data-variant="warning"] {
  background: rgba(245,158,11,0.06);
  border-left: 3px solid var(--ix-warn);
}
.ix-callout[data-variant="definition"] {
  background: rgba(139,92,246,0.06);
  border-left: 3px solid #8b5cf6;
}
.ix-callout[data-variant="definition"] .ix-callout-label {
  color: #8b5cf6;
}

/* Make labels larger and bolder */
.ix-callout-label {
  font-size: 11px;      /* was 10px */
  font-weight: 700;     /* was 600 */
  letter-spacing: 1px;  /* was 0.8px */
  margin-bottom: 8px;   /* was 6px */
}
```

Also add a new `definition` variant for concept definitions, and an `instructor-note` variant for instructor guidance.

---

### A6. Add collapsible/accordion for prose sections (fixes issue #8)

**Problem**: Modules have too much text. Need a way to collapse "deep dive" prose into expandable sections. The v2 examples handle this by being self-contained interactives with no surrounding prose.

**Fix**: Add a new `ix-collapse` component that renders `<details>` with course styling.

CSS to add:
```css
/* ---- Collapsible prose section ---- */
.ix-collapse {
  margin: 16px 0;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  overflow: hidden;
}
.ix-collapse > summary {
  list-style: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  color: var(--muted);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  user-select: none;
  transition: color 0.15s;
}
.ix-collapse > summary:hover { color: var(--text); }
.ix-collapse > summary::-webkit-details-marker { display: none; }
.ix-collapse > summary::before {
  content: '\25B8';  /* right-pointing triangle */
  font-size: 12px;
  color: var(--dim);
  transition: transform 0.2s;
}
.ix-collapse[open] > summary::before {
  transform: rotate(90deg);
}
.ix-collapse[open] > summary {
  border-bottom: 1px solid var(--border);
}
.ix-collapse > .ix-collapse-body {
  padding: 14px 16px;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.65;
}
```

Usage in markdown:
```html
<details class="ix-collapse">
<summary>Deep Dive: Why the autocomplete mindset persists</summary>
<div class="ix-collapse-body">
[Long prose content here...]
</div>
</details>
```

JS: No init function needed -- native `<details>` handles open/close.

---

## Part B: Content Structure Fixes (All 3 Modules)

### Target section structure (enforced everywhere)

Every section MUST follow this order:

```
1. ## Section Title
2. <div class="ix-diagram" data-component="objective">   <-- FIRST, before any prose
     Learning objective text
   </div>
3. Brief intro blurb (1-2 sentences MAX)
4. <p class="ix-instruct">Instruction text for the interactive below.</p>
5. <div class="ix-diagram" data-component="...">          <-- The interactive component
     ...
   </div>
6. <details class="ix-collapse">                           <-- Remaining prose COLLAPSED
     <summary>Deep Dive: [topic]</summary>
     <div class="ix-collapse-body">All the detailed text</div>
   </details>
```

### B1. Module 01 restructuring

**File**: `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/docs/curriculum/modules/01-paradigm-shift.md`

| Section | Current Problem | Fix |
|---------|----------------|-----|
| 1.1 Three Eras | Objective is first (good), but 4 paragraphs of prose follow before the timeline interactive | Move prose after interactive into `ix-collapse`. Add `ix-instruct` above the timeline. |
| 1.2 PRAO Loop | Objective first (good), but long prose before the walkthrough | Cut to 2 sentences. Add `ix-instruct`: "Step through each phase of the PRAO loop to see how the agent operates." Collapse remaining text. |
| 1.3 Mental Model | Objective OK, but "What to Watch For" section is a prose wall | Wrap "What to Watch For" in `ix-collapse`. Add `ix-instruct` above the disorientation quiz. |
| 1.4 Productive Pattern | Objective OK. Prose before click-cards is too long | Cut to 1-2 sentences. Add `ix-instruct`: "Click each card to explore the failure modes and the productive pattern." Collapse detailed discussion. |
| 1.5 Task Suitability | Objective OK, prose manageable | Add `ix-instruct` above the quadrant grid. |
| Knowledge Check 1 | OK | Add `ix-instruct`: "Test your understanding of the paradigm shift concepts." |

**Module 01-specific fix**: The productive pattern numbering. The `.ix-step-row` elements at lines 825-828 will render correctly once CSS from A1 is applied. No markdown changes needed for this issue.

---

### B2. Module 02 restructuring

**File**: `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/docs/curriculum/modules/02-claude-code-foundations.md`

| Section | Current Problem | Fix |
|---------|----------------|-----|
| Architecture Overview | No objective callout at top | Add `ix-objective` before prose. Add `ix-instruct`. |
| 2.1 Two Modes | Objective is there. Good structure, but long prose before tabs. | Trim to 2 sentences. Add `ix-instruct`: "Switch between tabs to compare the two modes." Collapse deep prose. |
| 2.2 CLAUDE.md | Objective present. Entry list needs instruction text. | Add `ix-instruct`: "Review each entry to learn what belongs in CLAUDE.md and what doesn't." |
| 2.3 Permissions | Objective present. Long table/prose. | Add `ix-instruct`. Collapse "Common Patterns" into `ix-collapse`. |
| 2.4 MCP Servers | Objective present. Timeline needs instruction. | Add `ix-instruct`: "Click each stage to explore the MCP connection lifecycle." |
| Knowledge Check 2 | OK | Add `ix-instruct`. |

**Module 02-specific checks**:
- Entry-list badges: Verify `.ix-entry-badge.include` renders green and `.ix-entry-badge.exclude` renders red. The CSS already defines these correctly (lines 1478-1487 of module-viewer.html). Content authors must use `class="ix-entry-badge include"` or `class="ix-entry-badge exclude"`.
- Hierarchy visualization: Verify connected dots render. CSS is correct (lines 1504-1568). Verify markdown uses `data-level="0"` through `data-level="3"`.
- Timeline stages: CSS is correct (lines 1570-1599). Verify markdown uses `ix-timeline-stage` with proper structure.

---

### B3. Module 03 restructuring

**File**: `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/docs/curriculum/modules/03-agent-thinking.md`

| Section | Current Problem | Fix |
|---------|----------------|-----|
| 3.1 Transparency Advantage | Objective present, long prose | Trim, add `ix-instruct`, collapse deep text. |
| 3.2 Anatomy of Reasoning | Objective present. Terminal trace is great -- keep it. | Add `ix-instruct`: "Watch the terminal replay, then click each output layer to explore." |
| 3.3 Tool Call Patterns | Objective present. Heavy prose. | Trim to 2 sentences. Add `ix-instruct` above pattern cards. Collapse detailed analysis. |
| 3.4 Intervention | Objective present. Cards need instruction. | Add `ix-instruct`: "Click each scenario to decide: intervene or hold?" |
| 3.5 Extended Thinking | Objective present, manageable. | Add `ix-instruct`. |
| Knowledge Check 3 | OK | Add `ix-instruct`. |

**Module 03-specific checks**:
- Scenario-quiz terminal replays: Verify `initScenarioQuiz` renders terminal lines with animation. Already has animation delay logic in JS.
- Intervention cards: Verify `initIntervention` shows Intervene (red badge) / Hold (green badge) correctly. CSS at lines int-badge.yes (red) / int-badge.no (green) handles this.

---

## Part C: Visual Polish Comparison

### v2 Examples vs Current Module-Viewer: Key Differences

| Aspect | v2 Examples | Current Module-Viewer | Fix |
|--------|-------------|----------------------|-----|
| **Density** | `padding: 14px 18px` on entries, `16px` max | `padding: 16px 20px` or more | A4 reduces padding globally |
| **Instruction text** | `.instruct` -- italic, gray, with play icon | Missing entirely | A2 adds `.ix-instruct` |
| **Callout backgrounds** | Tinted backgrounds per variant | Only border-left, no bg tint on most | A5 adds tinted backgrounds |
| **Badge colors** | `#4ade80` green, `#f87171` red -- strong contrast | Already defined but may not render if class names mismatch | B2 verifies class usage |
| **Tab content height** | Compact, no excess padding | Over-padded | A4 |
| **Step numbering** | `.step-num` with flex + gap | `.ix-step-row` has no CSS | A1 |
| **Panel animations** | `fadeUp 0.35s` | Already has `ixFadeUp 0.4s` -- OK | None needed |
| **Font** | DM Sans in examples | Inter in viewer -- OK, consistent | None needed |

---

## Part D: Execution Plan

### Agent Assignment

| Phase | Agent | Files | Tasks |
|-------|-------|-------|-------|
| **Phase 1** | `frontend-architect` | `module-viewer.html` | A1, A2, A4, A5, A6 (CSS-only changes) |
| **Phase 2** | `frontend-architect` | `module-viewer.html` | A3 (JS changes for arrow nav) |
| **Phase 3a** | `frontend-architect` (teammate 1) | `01-paradigm-shift.md` | B1 restructuring |
| **Phase 3b** | `frontend-architect` (teammate 2) | `02-claude-code-foundations.md` | B2 restructuring |
| **Phase 3c** | `frontend-architect` (teammate 3) | `03-agent-thinking.md` | B3 restructuring |
| **Phase 4** | `tech-lead` | All files | Visual QA pass, verify all 9 issues resolved |

### Phase 1: CSS Fixes (module-viewer.html) -- BLOCKING

**Must complete before Phase 3 because module markdown depends on new CSS classes.**

1. Add `.ix-step-row` CSS (A1) -- near line 1098, after `.ix-step-num` styles
2. Add `.ix-instruct` CSS (A2) -- after `.ix-title` styles around line 748
3. Reduce padding on `.ix-tab-panel`, `.ix-detail-body`, `.ix-entry`, `.ix-callout`, `.ix-objective` (A4)
4. Strengthen callout variant backgrounds and label sizing (A5)
5. Add `.ix-collapse` / `.ix-collapse-body` styles (A6) -- after the interactive-reveal styles around line 376

### Phase 2: JS Fixes (module-viewer.html) -- BLOCKING

1. In `initTabbedPanel` (line 2605): Add prev/next nav bar after panels are appended. Wire click handlers and keyboard arrows. Set `tabindex="0"` on the diagram element.
2. In `initClickCards` (line 2701): Same pattern -- prev/next nav bar after detail panels, keyboard arrow support.
3. Update the existing tab click handler to also update the new counter/button state.

### Phase 3: Module Restructuring -- PARALLEL (3 agents)

For each module file, the agent must:

1. **Verify every section has objective FIRST** -- if objective div is not the first child after the `## heading`, move it up.
2. **Trim pre-interactive prose to 1-2 sentences** -- everything else goes into `<details class="ix-collapse">`.
3. **Add `<p class="ix-instruct">` above every interactive component** -- use descriptive action text matching the component type:
   - Tabbed panels: "Switch between tabs to compare..."
   - Click cards: "Click each card to explore..."
   - Step walkthrough: "Step through the sequence to see..."
   - Terminal sim: "Watch the terminal replay to observe..."
   - Scenario quiz: "Choose your response for each scenario..."
   - Decision tree: "Click to expand each branch..."
   - Quadrant grid: "Review each quadrant to assess..."
4. **Wrap "What to Watch For", "Common Patterns", and other long prose blocks** in `ix-collapse`.
5. **Do NOT change**: terminal trace animations, quiz logic, diagram data-component attributes, or any interactive component structure.

### Phase 4: QA Pass

Verify all 9 issues are resolved:

- [ ] "1Specific goal" now shows "1  Specific goal" with proper spacing
- [ ] Tab panels are visually more compact
- [ ] All tabbed-panel and click-card components have prev/next buttons
- [ ] Every interactive has italic instruction text above it
- [ ] Every section follows: objective -> brief blurb -> instruct -> interactive -> collapsed prose
- [ ] Learning objectives appear BEFORE introductory paragraphs
- [ ] Callout variants have distinct tinted backgrounds and stronger labels
- [ ] Long prose sections are collapsed by default
- [ ] Visual density matches the v2 example quality level

---

## What 9/10 Looks Like

A 9/10 module has these properties:

1. **Scannable** -- you can scroll through a section and immediately see: objective (blue box), 1-2 sentence intro, instruction text (italic gray), interactive component. No prose walls.
2. **Interactive-first** -- the interactive IS the learning, not decoration after a text dump. Users interact THEN read details if curious.
3. **Navigable** -- every multi-panel component (tabs, cards, walkthroughs) has visible prev/next buttons AND keyboard arrow support. Users never wonder "is there more?"
4. **Visually distinct** -- callouts, objectives, and definitions are immediately recognizable by color and label without reading the content. Core ideas = cyan. Key concepts = indigo. Warnings = amber. Definitions = purple.
5. **Compact** -- padding and spacing match the v2 examples. Dense but readable. No wasted vertical space.
6. **Progressive disclosure** -- surface-level content is visible. Deep dives are one click away in collapsible sections. Users control their depth.
7. **Terminal animations preserved** -- the trace replays that got positive feedback remain untouched.

---

## Change Count Summary

| Category | Count |
|----------|-------|
| CSS additions (new classes) | 3 (`.ix-step-row`, `.ix-instruct`, `.ix-collapse`) |
| CSS modifications (tighter padding, stronger callouts) | 7 selectors modified |
| JS modifications (arrow nav) | 2 functions modified (`initTabbedPanel`, `initClickCards`) |
| Module 01 sections to restructure | 6 sections |
| Module 02 sections to restructure | 6 sections |
| Module 03 sections to restructure | 6 sections |
| `ix-instruct` elements to add | ~25 (across all 3 modules) |
| Prose blocks to collapse | ~15-20 (across all 3 modules) |
| **Total discrete changes** | **~65** |

---

## Risk Items

1. **Arrow nav focus management**: Adding `tabindex="0"` to diagrams means keyboard focus. Must ensure it does not interfere with page scrolling. Mitigation: only capture left/right arrows, not up/down.
2. **Collapsing prose may hide important context**: Some prose provides setup for the interactive. Mitigation: the 1-2 sentence intro retained above the interactive covers essential context; collapsed content is supplementary.
3. **Existing component structure must not break**: Phase 3 agents must not modify `data-component` attributes, `data-diagram-id`, or internal interactive HTML structure. Only move elements and add wrappers.
