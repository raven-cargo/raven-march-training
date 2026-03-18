# Trace Speed and Interaction Fixes -- Implementation Plan

**Created**: 2026-03-17
**Priority**: High (directly impacts student learning experience)
**Scope**: 9 agent traces across 3 modules + JS engine changes

---

## Summary of Changes

- **4 traces stay auto-play** with slowed delays and `data-speed="0.5"`
- **5 traces convert to click-through default** via `data-default-mode="manual"`
- **JS engine** updated to support `data-default-mode="manual"` and new default speed
- **Speed selector** defaults changed: 0.5x active by default, options are [0.5, 1, 2]

---

## Per-Trace Changes

### Trace 1: `m01-first-taste` (Module 01, line 271)
**File**: `docs/curriculum/modules/01-paradigm-shift.md`
**Change type**: Slow down auto-play

Add `data-speed="0.5"` to the component div. Update individual delays:

```
BEFORE → AFTER (data-delay values)
Line 1 (prompt):   0    → 0
Line 2 (think):    1200 → 2500
Line 3 (tool):     800  → 1500
Line 4 (result):   600  → 1500
Line 5 (tool):     600  → 1500
Line 6 (result):   500  → 1500
Line 7 (think):    1000 → 3500
Line 8 (tool):     800  → 1500
Line 9 (tool):     700  → 1500
Line 10 (result):  600  → 1500
```

HTML change on the opening div:
```html
<!-- BEFORE -->
<div class="ix-diagram" data-component="agent-trace"
     data-variant="terminal"
     data-diagram-id="m01-first-taste">

<!-- AFTER -->
<div class="ix-diagram" data-component="agent-trace"
     data-variant="terminal"
     data-diagram-id="m01-first-taste"
     data-speed="0.5">
```

---

### Trace 2: `m01-prao-trace` (Module 01, line 530)
**File**: `docs/curriculum/modules/01-paradigm-shift.md`
**Change type**: Slow down auto-play

Add `data-speed="0.5"`. Update delays:

```
BEFORE → AFTER
Line 1 (prompt):    0    → 0
Line 2 (tool):      800  → 1500
Line 3 (result):    500  → 1500
Line 4 (tool):      600  → 1500
Line 5 (result):    500  → 1500
Line 6 (think):     1200 → 3500
Line 7 (tool):      800  → 1500
Line 8 (result):    400  → 1500
Line 9 (tool):      700  → 1500
Line 10 (error):    600  → 2500
Line 11 (think):    1000 → 3500
Line 12 (tool):     700  → 1500
Line 13 (tool):     600  → 1500
Line 14 (result):   500  → 1500
Line 15 (response): 800  → 2500
```

HTML change:
```html
<!-- AFTER -->
<div class="ix-diagram" data-component="agent-trace"
     data-variant="prao"
     data-diagram-id="m01-prao-trace"
     data-speed="0.5">
```

---

### Trace 3: `m01-era-compare` (Module 01, line 1047)
**File**: `docs/curriculum/modules/01-paradigm-shift.md`
**Change type**: Convert to click-through default

Add `data-default-mode="manual"` and `data-speed="0.5"`. Update delays for when students switch to auto-play:

Group 1 (Era 2) delays:
```
BEFORE → AFTER
Line 1 (prompt):    0    → 0
Line 2 (response):  1000 → 2500
Line 3 (prompt):    800  → 2500
Line 4 (response):  1000 → 2500
Line 5 (prompt):    800  → 2500
Line 6 (response):  600  → 2000
```

Group 2 (Era 3) delays:
```
BEFORE → AFTER
Line 1 (prompt):    0    → 0
Line 2 (tool):      800  → 1500
Line 3 (tool):      600  → 1500
Line 4 (result):    500  → 1500
Line 5 (tool):      700  → 1500
Line 6 (tool):      600  → 1500
Line 7 (result):    500  → 1500
Line 8 (response):  800  → 2500
```

HTML change:
```html
<!-- AFTER -->
<div class="ix-diagram" data-component="agent-trace"
     data-variant="compare"
     data-diagram-id="m01-era-compare"
     data-default-mode="manual"
     data-speed="0.5">
```

Also update the `ix-instruct` preceding this trace:
```html
<!-- BEFORE -->
<p class="ix-instruct">Press play to watch the same task executed in two different paradigms.</p>

<!-- AFTER -->
<p class="ix-instruct">Step through both traces to compare the same task in two different paradigms. Use the arrow keys or click the step button.</p>
```

---

### Trace 4: `m02-claudemd-action` (Module 02, line 762)
**File**: `docs/curriculum/modules/02-claude-code-foundations.md`
**Change type**: Convert to click-through default

Add `data-default-mode="manual"` and `data-speed="0.5"`. Update delays:

```
BEFORE → AFTER
Line 1 (prompt):    0    → 0
Line 2 (think):     1000 → 3500
Line 3 (think):     1200 → 4000
Line 4 (tool):      800  → 1500
Line 5 (result):    500  → 1500
Line 6 (tool):      600  → 1500
Line 7 (result):    400  → 1500
Line 8 (tool):      800  → 1500
Line 9 (tool):      700  → 1500
Line 10 (result):   500  → 1500
Line 11 (response): 800  → 2500
```

HTML change:
```html
<!-- AFTER -->
<div class="ix-diagram" data-component="agent-trace"
     data-variant="annotated"
     data-diagram-id="m02-claudemd-action"
     data-default-mode="manual"
     data-speed="0.5">
```

Update instruction text:
```html
<!-- BEFORE -->
<p class="ix-instruct">Press play to watch how CLAUDE.md shapes agent decisions in a live trace.</p>

<!-- AFTER -->
<p class="ix-instruct">Step through the trace and read each annotation to see how CLAUDE.md shapes agent decisions.</p>
```

---

### Trace 5: `m02-permissions-live` (Module 02, line 1119)
**File**: `docs/curriculum/modules/02-claude-code-foundations.md`
**Change type**: Slow down auto-play

Add `data-speed="0.5"`. Update delays:

```
BEFORE → AFTER
Line 1 (prompt):    0    → 0
Line 2 (tool):      800  → 1500
Line 3 (result):    400  → 1500
Line 4 (tool):      700  → 1500
Line 5 (result):    400  → 1500
Line 6 (tool):      800  → 1500
Line 7 (error):     600  → 2500
Line 8 (think):     1000 → 3500
Line 9 (response):  800  → 2500
```

HTML change:
```html
<!-- AFTER -->
<div class="ix-diagram" data-component="agent-trace"
     data-variant="terminal"
     data-diagram-id="m02-permissions-live"
     data-speed="0.5">
```

---

### Trace 6: `m02-mcp-trace` (Module 02, line 1291)
**File**: `docs/curriculum/modules/02-claude-code-foundations.md`
**Change type**: Convert to click-through default

Add `data-default-mode="manual"` and `data-speed="0.5"`. Update delays:

```
BEFORE → AFTER
Line 1 (prompt):    0    → 0
Line 2 (think):     1000 → 3500
Line 3 (tool):      800  → 1500
Line 4 (result):    600  → 1500
Line 5 (think):     800  → 3500
Line 6 (tool):      700  → 1500
Line 7 (result):    500  → 1500
Line 8 (response):  800  → 2500
```

HTML change:
```html
<!-- AFTER -->
<div class="ix-diagram" data-component="agent-trace"
     data-variant="annotated"
     data-diagram-id="m02-mcp-trace"
     data-default-mode="manual"
     data-speed="0.5">
```

Update instruction text:
```html
<!-- BEFORE -->
<p class="ix-instruct">Press play to watch MCP tools used in a live agent trace.</p>

<!-- AFTER -->
<p class="ix-instruct">Step through the trace and read each annotation to see MCP tools in action.</p>
```

---

### Trace 7: `m03-reading-trace` (Module 03, line 225)
**File**: `docs/curriculum/modules/03-agent-thinking.md`
**Change type**: Convert to click-through default

Add `data-default-mode="manual"` and `data-speed="0.5"`. Update delays:

```
BEFORE → AFTER
Line 1 (prompt):    0    → 0
Line 2 (think):     1200 → 4000
Line 3 (tool):      800  → 1500
Line 4 (result):    500  → 1500
Line 5 (think):     1000 → 4000
Line 6 (tool):      700  → 1500
Line 7 (result):    500  → 1500
Line 8 (tool):      800  → 1500
Line 9 (tool):      700  → 1500
Line 10 (result):   500  → 1500
Line 11 (response): 800  → 2500
```

HTML change:
```html
<!-- AFTER -->
<div class="ix-diagram" data-component="agent-trace"
     data-variant="annotated"
     data-diagram-id="m03-reading-trace"
     data-default-mode="manual"
     data-speed="0.5">
```

Update instruction text:
```html
<!-- BEFORE -->
<p class="ix-instruct">Watch the terminal replay and read each annotation to understand the agent's reasoning process.</p>

<!-- AFTER -->
<p class="ix-instruct">Step through the trace and read each annotation to understand the agent's reasoning process. Click the step button or press the right arrow key.</p>
```

---

### Trace 8: `m03-intervention-signals` (Module 03, line 641)
**File**: `docs/curriculum/modules/03-agent-thinking.md`
**Change type**: Convert to click-through default

Add `data-default-mode="manual"` and `data-speed="0.5"`. Update delays:

Group 1 (Healthy) delays:
```
BEFORE → AFTER
Line 1 (prompt):  0    → 0
Line 2 (tool):    800  → 1500
Line 3 (think):   1000 → 3500
Line 4 (tool):    700  → 1500
Line 5 (tool):    600  → 1500
Line 6 (tool):    600  → 1500
Line 7 (tool):    700  → 1500
Line 8 (result):  500  → 1500
```

Group 2 (Stuck) delays:
```
BEFORE → AFTER
Line 1 (prompt):  0    → 0
Line 2 (tool):    800  → 1500
Line 3 (think):   1200 → 3500
Line 4 (tool):    800  → 1500
Line 5 (think):   1000 → 3500
Line 6 (tool):    800  → 1500
Line 7 (think):   1200 → 3500
Line 8 (error):   800  → 2500
```

HTML change:
```html
<!-- AFTER -->
<div class="ix-diagram" data-component="agent-trace"
     data-variant="compare"
     data-diagram-id="m03-intervention-signals"
     data-default-mode="manual"
     data-speed="0.5">
```

Update instruction text:
```html
<!-- BEFORE -->
<p class="ix-instruct">Watch both traces side by side to see the difference between healthy progress and a stuck loop.</p>

<!-- AFTER -->
<p class="ix-instruct">Step through both traces side by side. Compare how healthy progress differs from a stuck loop. Use the step button or right arrow key.</p>
```

---

### Trace 9: `m03-patterns-live` (Module 03, line 1088)
**File**: `docs/curriculum/modules/03-agent-thinking.md`
**Change type**: Slow down auto-play

Add `data-speed="0.5"`. Update delays:

```
BEFORE → AFTER
Line 1 (prompt):    0    → 0
Line 2 (tool):      800  → 1500
Line 3 (result):    400  → 1500
Line 4 (tool):      600  → 1500
Line 5 (result):    400  → 1500
Line 6 (tool):      600  → 1500
Line 7 (result):    400  → 1500
Line 8 (think):     1200 → 3500
Line 9 (tool):      800  → 1500
Line 10 (tool):     600  → 1500
Line 11 (tool):     700  → 1500
Line 12 (result):   400  → 1500
Line 13 (tool):     600  → 1500
Line 14 (result):   500  → 1500
Line 15 (response): 800  → 2500
```

HTML change:
```html
<!-- AFTER -->
<div class="ix-diagram" data-component="agent-trace"
     data-variant="prao"
     data-diagram-id="m03-patterns-live"
     data-speed="0.5">
```

Update instruction text:
```html
<!-- BEFORE -->
<p class="ix-instruct">Watch the terminal replay and track the Agentic Loop phase transitions as they happen.</p>

<!-- AFTER -->
<p class="ix-instruct">Watch the trace replay at a comfortable pace and track the Agentic Loop phase transitions as they happen. Use the step button to advance manually if needed.</p>
```

---

## JS Engine Changes

### File: `module-viewer.html`, function `initAgentTrace` (line ~3347)

#### Change 1: Support `data-default-mode="manual"`

In the initialization section (after `var autoPlay = ...`), add:

```javascript
// BEFORE (line ~3350)
var autoPlay = el.dataset.autoPlay !== 'false';

// AFTER
var autoPlay = el.dataset.autoPlay !== 'false';
var defaultManual = el.dataset.defaultMode === 'manual';
```

Then in the auto-play IntersectionObserver section (~line 3688), wrap it:

```javascript
// BEFORE
if (autoPlay) {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && state.current === 0 && !state.playing) {
        setTimeout(play, 500);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  observer.observe(el);
}

// AFTER
if (autoPlay && !defaultManual) {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && state.current === 0 && !state.playing) {
        setTimeout(play, 500);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  observer.observe(el);
}
```

#### Change 2: Default speed to 0.5x

```javascript
// BEFORE (line ~3349)
var speed = parseFloat(el.dataset.speed) || 1;

// AFTER
var speed = parseFloat(el.dataset.speed) || 0.5;
```

#### Change 3: Speed selector options

```javascript
// BEFORE (line ~3454)
[0.5, 1, 2].forEach(function (s) {

// No change needed -- 0.5 is already the first option.
// But the default active button changes because speed now defaults to 0.5
```

The active button logic already handles this correctly since it compares `s === speed`.

#### Change 4: Add visual indicator for manual mode

When `defaultManual` is true, add a subtle instruction overlay or highlight the step button:

```javascript
// After controls are built (~line 3468), add:
if (defaultManual) {
  stepBtn.classList.add('ix-trace-btn-primary');
  var hint = document.createElement('span');
  hint.className = 'ix-trace-manual-hint';
  hint.textContent = 'Click step or press \u2192 to advance';
  controls.insertBefore(hint, progress);
}
```

Add CSS for the hint:
```css
.ix-trace-manual-hint {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-style: italic;
  padding: 0 8px;
}

.ix-trace-btn-primary {
  background: var(--primary);
  color: var(--surface);
  border-radius: var(--radius);
}
```

---

## Execution Order

1. Update `module-viewer.html` JS engine (Changes 1-4 above)
2. Update Module 01 traces (traces 1, 2, 3) -- delays + attributes + instruction text
3. Update Module 02 traces (traces 4, 5, 6) -- delays + attributes + instruction text
4. Update Module 03 traces (traces 7, 8, 9) -- delays + attributes + instruction text
5. Update spec docs (CODING-ELEMENTS-SPEC.md, CONTENT-SPEC.md)
6. Test all 9 traces in browser (dark mode primary)
7. Deploy
