# Navigation Consistency Audit -- module-viewer.html

**Date**: 2026-03-17
**File**: `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/module-viewer.html`
**Total lines**: 5390

---

## Component-by-Component Audit

### COMPONENT: tabbed-panel (`initTabbedPanel`, line 2988)
- **NAV BUTTONS**: YES (lines 3057-3063) -- Prev/Next via `.ix-walk-nav` bar with `.ix-tab-prev` / `.ix-tab-next`
- **ARROW KEYS**: YES (lines 3101-3109) -- ArrowLeft/ArrowRight call `goToTab()`
- **TABINDEX**: YES (line 3101) -- `tabindex="0"` on container; also line 3113 on each tab button
- **COUNTER**: YES (line 3062) -- "1 / N" format via `.ix-walk-counter`
- **BOUNDARY DISABLE**: YES (lines 3078-3079) -- Prev disabled at idx 0, Next disabled at last
- **BUG**: NONE -- fully wired

---

### COMPONENT: click-cards (`initClickCards`, line 3124)
- **NAV BUTTONS**: YES (lines 3217-3223) -- Prev/Next via `.ix-walk-nav` bar with `.ix-card-prev` / `.ix-card-next`
- **ARROW KEYS**: YES (lines 3240-3248) -- ArrowLeft/ArrowRight call `goToCard()`
- **TABINDEX**: YES (line 3240) -- `tabindex="0"` on container
- **COUNTER**: YES (line 3222) -- "1 / N" format via `.ix-walk-counter`
- **BOUNDARY DISABLE**: YES (lines 3202-3204) -- Prev disabled at idx 0, Next disabled at last
- **BUG**: NONE -- fully wired

---

### COMPONENT: step-walkthrough (`initStepWalkthrough`, line 3296)
- **NAV BUTTONS**: YES (lines 3316-3332) -- Prev/Next buttons created and appended to `.ix-walk-nav`
- **ARROW KEYS**: **NO** -- No `keydown` listener exists in this function (lines 3296-3350)
- **TABINDEX**: **NO** -- No `tabindex` attribute set on the container
- **COUNTER**: YES (line 3323) -- "Step 1 of N" format via `.ix-walk-counter`
- **BOUNDARY DISABLE**: YES (lines 3344-3345) -- Prev disabled at 0, Next disabled at last
- **BUG**: **MISSING arrow key navigation and tabindex**. The function ends at line 3350 without adding keyboard support, unlike tabbed-panel and click-cards which both have it.

**FIX**: Add after line 3349 (before the closing brace of `initStepWalkthrough`):
```javascript
    // Arrow key navigation
    el.setAttribute('tabindex', '0');
    el.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        if (e.key === 'ArrowRight' && current < total - 1) goTo(current + 1);
        else if (e.key === 'ArrowLeft' && current > 0) goTo(current - 1);
      }
    });
```

---

### COMPONENT: agent-trace (`initAgentTrace`, line 3361)
- **NAV BUTTONS**: YES (but different pattern) -- Play/Pause/Step/Reset buttons (lines 3443-3463)
- **ARROW KEYS**: YES (lines 3696-3703) -- ArrowRight calls `stepForward()`, Space toggles play/pause, 'r' resets
- **TABINDEX**: YES (line 3695) -- `tabindex="0"` on container
- **COUNTER**: YES (line 3530) -- "Step X of N" format via `.ix-trace-progress`
- **BOUNDARY DISABLE**: N/A (uses play/step paradigm, not prev/next)
- **BUG**: NONE -- uses a different but internally consistent navigation model (play/pause/step/reset)

---

### COMPONENT: decision-tree (`initDecisionTree`, line 3254)
- **NAV BUTTONS**: NO -- expand/collapse model, not sequential
- **ARROW KEYS**: NO
- **TABINDEX**: NO
- **BUG**: NONE -- decision trees are hierarchical expand/collapse, not sequential. Nav buttons would be inappropriate.

---

### COMPONENT: quiz (`initQuiz`, line 3745)
- **NAV BUTTONS**: NO -- all questions displayed at once in a scrollable shell
- **ARROW KEYS**: NO
- **TABINDEX**: NO
- **BUG**: NONE -- quiz shows all questions simultaneously with a progress counter and score. Sequential nav is not needed.

---

### COMPONENT: predict-reveal (`initPredictReveal`, line 3854)
- **NAV BUTTONS**: NO -- single prediction + reveal, not sequential
- **ARROW KEYS**: NO
- **TABINDEX**: NO
- **BUG**: NONE -- single-item component (one prediction, one reveal). No sequence to navigate.

---

### COMPONENT: terminal-sim (`initTerminalSim`, line 3935)
- **NAV BUTTONS**: YES (but different model) -- "Run Next" / "Run All" / "Reset" buttons (lines 3957-3968)
- **ARROW KEYS**: **NO** -- No `keydown` listener exists in this function (lines 3935-4050)
- **TABINDEX**: **NO** -- No `tabindex` attribute set on the container
- **COUNTER**: YES (line 4010) -- "idx / N" format via `.ix-terminal-progress`
- **BUG**: **MISSING keyboard support**. Unlike agent-trace which has Space/ArrowRight/r keyboard shortcuts, terminal-sim has no keyboard support at all. This is an inconsistency for components that both use a step-forward model.

**FIX**: Add after line 4046 (after the resetBtn event listener):
```javascript
    // Keyboard support
    el.setAttribute('tabindex', '0');
    el.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        runStep();
      }
      if (e.key === 'r') {
        e.preventDefault();
        reset();
      }
    });
```

---

### COMPONENT: scenario-quiz (`initScenarioQuiz`, line 4274)
- **NAV BUTTONS**: YES (lines 4301-4316) -- Prev/Next via `.ix-sq-nav` bar with `.ix-sq-nav-btn`
- **ARROW KEYS**: **NO** -- No `keydown` listener exists in this function (lines 4274-4435)
- **TABINDEX**: **NO** -- No `tabindex` attribute set on the container
- **COUNTER**: YES (line 4389) -- "X / N" format via `.ix-sq-nav-counter`
- **BOUNDARY DISABLE**: YES (lines 4410-4411) -- Prev disabled at 0, Next disabled at last
- **BUG**: **MISSING arrow key navigation and tabindex**. Has Prev/Next buttons but no keyboard equivalent, unlike tabbed-panel and click-cards.

**FIX**: Add after line 4432 (after the nextBtn event listener, before `renderScenario()`):
```javascript
    // Arrow key navigation
    el.setAttribute('tabindex', '0');
    el.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        if (e.key === 'ArrowRight' && sIdx < scenarioData.length - 1) { sIdx++; renderScenario(); }
        else if (e.key === 'ArrowLeft' && sIdx > 0) { sIdx--; renderScenario(); }
      }
    });
```

---

### COMPONENT: reveal-quiz (`initRevealQuiz`, line 4440)
- **NAV BUTTONS**: NO -- all items displayed as a list, click-to-reveal individually
- **ARROW KEYS**: NO
- **TABINDEX**: NO
- **BUG**: NONE -- items are displayed simultaneously as a list. Each item is independently click-to-reveal. No sequential navigation needed.

---

### COMPONENT: intervention (`initIntervention`, line 4506)
- **NAV BUTTONS**: NO -- all items displayed as a list with action badges
- **ARROW KEYS**: NO
- **TABINDEX**: NO
- **BUG**: NONE -- static list display, no sequential navigation model.

---

### COMPONENT: debug-steps (`initDebugSteps`, line 4523)
- **NAV BUTTONS**: NO -- all steps displayed as numbered list
- **ARROW KEYS**: NO
- **TABINDEX**: NO
- **BUG**: NONE -- static numbered list display, no sequential navigation model.

---

### COMPONENT: pattern-grid (`initPatternGrid`, line 4597)
- **NAV BUTTONS**: **NO** -- has clickable cards with detail panels but no Prev/Next bar
- **ARROW KEYS**: YES (lines 4618-4637) -- ArrowLeft/Right/Up/Down plus Home/End on individual cards
- **TABINDEX**: YES (line 4606/4616) -- via roving tabindex on cards (0 for active, -1 for others)
- **COUNTER**: **NO**
- **BUG**: **PARTIAL -- Missing Prev/Next nav bar**. Has arrow key support on individual cards, but no `.ix-walk-nav` bar like tabbed-panel and click-cards have. Since pattern-grid shows cards with detail panels (same UX as click-cards), it should have the same nav bar for consistency.

**FIX**: Add after line 4645 (after `activate(0)`):
```javascript
    // Add prev/next nav bar
    var pgNav = document.createElement('div');
    pgNav.className = 'ix-walk-nav';
    pgNav.innerHTML =
      '<button class="ix-walk-btn ix-pg-prev" disabled>&larr; Prev</button>' +
      '<span class="ix-walk-counter">1 / ' + cards.length + '</span>' +
      '<button class="ix-walk-btn ix-pg-next"' + (cards.length <= 1 ? ' disabled' : '') + '>Next &rarr;</button>';
    el.appendChild(pgNav);

    var pgPrevBtn = pgNav.querySelector('.ix-pg-prev');
    var pgNextBtn = pgNav.querySelector('.ix-pg-next');
    var pgCounter = pgNav.querySelector('.ix-walk-counter');

    function updatePgNav(idx) {
      pgPrevBtn.disabled = idx === 0;
      pgNextBtn.disabled = idx === cards.length - 1;
      pgCounter.textContent = (idx + 1) + ' / ' + cards.length;
    }

    // Patch activate to also update nav
    var origActivate = activate;
    activate = function (idx) {
      origActivate(idx);
      updatePgNav(idx);
    };

    pgPrevBtn.addEventListener('click', function () {
      var cur = cards.findIndex(function (c) { return c.classList.contains('active'); });
      if (cur > 0) activate(cur - 1);
    });
    pgNextBtn.addEventListener('click', function () {
      var cur = cards.findIndex(function (c) { return c.classList.contains('active'); });
      if (cur < cards.length - 1) activate(cur + 1);
    });
```

---

### COMPONENT: flow-diagram (`initFlowDiagram`, line 4055)
- **NAV BUTTONS**: NO -- only animates capability bars
- **ARROW KEYS**: NO
- **TABINDEX**: NO
- **BUG**: NONE -- purely visual/decorative component, no sequential items.

---

### COMPONENT: objective (`initObjective`, line 4066)
- **NAV BUTTONS**: NO -- single content block
- **ARROW KEYS**: NO
- **TABINDEX**: NO
- **BUG**: NONE -- single-item display component.

---

### COMPONENT: callout (`initCallout`, line 4097)
- **NAV BUTTONS**: NO -- single content block
- **ARROW KEYS**: NO
- **TABINDEX**: NO
- **BUG**: NONE -- single-item display component.

---

### COMPONENT: entry-list (`initEntryList`, line 4133)
- **NAV BUTTONS**: NO -- list display
- **ARROW KEYS**: NO
- **TABINDEX**: NO
- **BUG**: NONE -- static list display.

---

### COMPONENT: hierarchy (`initHierarchy`, line 4163)
- **NAV BUTTONS**: NO -- hierarchical display
- **ARROW KEYS**: NO
- **TABINDEX**: NO
- **BUG**: NONE -- hierarchical/tree display.

---

### COMPONENT: timeline (`initTimeline`, line 4181)
- **NAV BUTTONS**: NO -- click stages to expand detail
- **ARROW KEYS**: **NO** -- No `keydown` listener (lines 4181-4269)
- **TABINDEX**: **NO**
- **BUG**: **MINOR -- Missing keyboard support for stage selection**. Timeline uses a click-to-select model similar to pattern-grid but lacks any keyboard navigation. Since it has selectable stages with detail panels, basic arrow key support would improve accessibility.

**FIX** (lower priority, since timeline is more of a click-to-expand than sequential nav): Add after line 4268:
```javascript
    // Keyboard support for stage navigation
    el.setAttribute('tabindex', '0');
    el.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        var cur = stages.findIndex(function (s) { return s.classList.contains('active'); });
        if (cur < stages.length - 1) stages[cur + 1].click();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        var cur = stages.findIndex(function (s) { return s.classList.contains('active'); });
        if (cur > 0) stages[cur - 1].click();
      }
    });
```

---

### COMPONENT: module-hero (`initModuleHero`, line 4550)
- **NAV BUTTONS**: NO
- **ARROW KEYS**: NO
- **TABINDEX**: NO
- **BUG**: NONE -- decorative hero section, no navigation needed.

---

## CSS Audit

### `.ix-walk-nav` (line 1341)
- **Defined**: YES -- flexbox layout, background, border-top
- **`.ix-walk-btn`** (line 1356): YES -- styled with background, border, cursor, transitions
- **`:disabled`** (line 1372): YES -- opacity 0.3, cursor not-allowed
- **`.ix-walk-counter`** (line 1350): YES -- monospace font, dim color
- **Responsive** (line 2767): YES -- reduced padding for mobile

### `.ix-sq-nav` (line 1952)
- **Defined**: YES -- separate CSS for scenario-quiz nav
- **`.ix-sq-nav-btn`** (line 1958): YES -- styled
- **`:disabled`** (line 1973): YES
- **`.ix-sq-nav-counter`** (line 1974): YES
- **Responsive** (line 2801): YES

### `.prev-btn` / `.next-btn` (line 388)
- **Defined**: YES -- used by `initInteractiveRevealMilestones` (line 5089), a different system for the interactive-reveal milestones section

---

## Summary of Bugs Found

| # | Component | Issue | Severity | Lines |
|---|-----------|-------|----------|-------|
| 1 | **step-walkthrough** | Missing arrow key navigation and tabindex | **HIGH** | 3296-3350 |
| 2 | **scenario-quiz** | Missing arrow key navigation and tabindex (has Prev/Next buttons but no keyboard) | **HIGH** | 4274-4435 |
| 3 | **terminal-sim** | Missing keyboard support (no arrow/space to step, unlike agent-trace) | **MEDIUM** | 3935-4050 |
| 4 | **pattern-grid** | Missing Prev/Next nav bar (has arrow keys but no visible buttons) | **MEDIUM** | 4597-4646 |
| 5 | **timeline** | Missing keyboard support for stage selection | **LOW** | 4181-4269 |

### Root Cause

The inconsistency is not a regression; it is an omission pattern. The components were built at different times (the "Phase 1" comment at line 4059 confirms a multi-phase approach). The original components (tabbed-panel, click-cards) were built with full nav (buttons + keyboard). Later components were built with partial nav:

- **step-walkthrough**: Got buttons but forgot keyboard
- **scenario-quiz**: Got buttons (different CSS class) but forgot keyboard
- **terminal-sim**: Got "Run Next" button but no keyboard shortcut
- **pattern-grid**: Got keyboard (via roving tabindex on cards) but no nav bar
- **timeline**: Got click handler but no keyboard at all

The two "golden standard" components are `initTabbedPanel` and `initClickCards`, both of which have: Prev/Next buttons, arrow key handlers, tabindex on container, counter display, and boundary disable states.

### Priority Fix Order

1. **step-walkthrough** (HIGH) -- most commonly used sequential component, users expect arrow keys
2. **scenario-quiz** (HIGH) -- has visible Prev/Next buttons, keyboard parity expected
3. **terminal-sim** (MEDIUM) -- step-forward model should match agent-trace keyboard support
4. **pattern-grid** (MEDIUM) -- visual parity with click-cards (both show card+detail)
5. **timeline** (LOW) -- less critical, click-to-expand is acceptable without keyboard
