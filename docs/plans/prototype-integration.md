# Prototype Integration Plan

11 HTML prototypes from `examples/module-diagrams/` mapped to the `ix-diagram` component system for integration into Modules 02, 03, and 04.

---

## Summary

| Metric | Count |
|--------|-------|
| Total prototypes | 11 |
| Map to existing component types | 9 |
| Require NEW component type | 2 |
| Module 02 additions | 2 prototypes |
| Module 03 additions | 4 prototypes |
| Module 04 additions | 5 prototypes |

### New Component Types Needed

1. **`step-checklist`** -- for m02-setup.html (step-by-step with sub-task checkboxes and progress bar)
2. **`labeled-layers`** -- for m03-layers.html (3-panel layer selector with trace highlighting and insight grid)

The remaining 9 prototypes map to existing registered types: `pattern-grid`, `step-walkthrough`, `tabbed-panel`, `click-cards`, `compare`.

Note: `compare` is listed in CODING-ELEMENTS-SPEC.md as a registered type and is already used in M04 (`m04-constraints-compare`), but has no `init` function in module-viewer.html. It either renders without JS init or needs an `initCompare` added. This plan treats it as "existing but needs init registration" -- grouped with the 2 new types as infra work.

---

## Per-Prototype Integration Spec

---

### 1. m02-patterns.html -- Permission Pattern Syntax

**Module**: 02 (Section: Permissions Model)
**Existing component type**: `pattern-grid`
**Action**: REPLACE existing `tabbed-panel` (`m02-permission-patterns` at line 1108) with this richer pattern-grid

**Current state**: M02 already has a `pattern-grid` component for permission patterns (`permission-patterns`), but the tabbed-panel at line 1108 duplicates permission pattern content in a less interactive format. The prototype offers a superior click-to-reveal interaction with scope badges (broad/scoped/exact) and example text per pattern -- richer than both existing components.

**Decision**: REPLACE the tabbed-panel `m02-permission-patterns` with this prototype's content expressed as `pattern-grid`. The existing `pattern-grid` at line 1143 area covers similar ground but with different data. Evaluate whether to merge or keep both.

**Conversion work**:
- Wrap in `<div class="ix-diagram" data-component="pattern-grid" data-diagram-id="m02-permission-syntax">`
- Structure data as `ix-pg-section` groups (File, Bash, MCP) with `ix-pg-item` elements
- Each item uses `data-syntax`, `data-meaning`, `data-scope`, `data-example` attributes
- The "Starter recipe" code block at the bottom becomes a `<details class="ix-collapse">` with summary "Starter recipe: typical TypeScript project"
- Replace hardcoded hex colors (`#f87171`, `#4ade80`, `#5ba4f5`) with CSS custom properties (`var(--ix-err)`, `var(--success)`, `var(--primary)`)
- Replace `DM Sans` font reference with `Inter`
- Add `aria-label` on clickable pattern rows
- No Lucide icons needed (text-only component)

**Complexity**: Low -- `pattern-grid` is already registered and has an `initPatternGrid` function

---

### 2. m02-setup.html -- Project Setup Checklist

**Module**: 02 (New subsection in CLAUDE.md or Permissions section, or standalone section)
**Component type**: NEW -- `step-checklist`
**Action**: ADD new content -- no existing component covers this

**What it does**: 4-step setup walkthrough (Write CLAUDE.md, Configure settings.json, Connect MCP, Verify) with:
- Progress bar tracking completion (0/4 to 4/4)
- Expandable steps with sub-task checkboxes
- Verification command blocks per step
- Sub-tasks that can be checked off individually

**Why existing types don't work**:
- `step-walkthrough`: Has next/prev navigation but no checkboxes, no progress bar, no sub-tasks
- `debug-steps`: Numbered steps but no interactive checkboxes
- This is a genuinely new interaction pattern: checklist with progress tracking

**Where it goes**: After M02 Section 2.5 (MCP) or as a new capstone section "2.6 Project Setup Exercise" -- gives students a concrete hands-on activity to apply everything they learned in M02.

**Conversion work**:
- Create `initStepChecklist` function in module-viewer.html
- Markup pattern:
  ```html
  <div class="ix-diagram" data-component="step-checklist" data-diagram-id="m02-project-setup" data-xp="20">
    <span class="ix-title">Project setup from scratch</span>
    <div class="ix-checklist-step" data-step-name="Write CLAUDE.md" data-step-time="~10 min">
      <p class="ix-checklist-desc">Create the project briefing...</p>
      <div class="ix-checklist-item">Add <code>## Architecture</code>...</div>
      <div class="ix-checklist-item">Add <code>## Conventions</code>...</div>
      <div class="ix-checklist-verify"><code>cat CLAUDE.md</code></div>
    </div>
  </div>
  ```
- CSS: progress bar uses `var(--success)` for fill, `var(--raised)` for track
- Replace hex colors with theme variables
- Replace `DM Sans` with `Inter`
- Add ARIA: `role="list"` on steps container, `role="checkbox"` and `aria-checked` on sub-items
- Add keyboard: Space/Enter to toggle checkboxes, arrow keys between steps
- Lucide icons: `<i data-lucide="check-circle">` for completed steps, `<i data-lucide="circle">` for pending

**Complexity**: Medium -- new component type, new init function, CSS + JS

---

### 3. m03-exercise.html -- Trace Reading Exercise

**Module**: 03 (Section 3.5 or new section: Trace Reading Practice)
**Existing component type**: `step-walkthrough`
**Action**: ADD new content -- enriches the hands-on practice in M03

**What it does**: 7-step walkthrough of a complete debugging trace with:
- Progress dots showing position
- Phase-labeled steps (Perceive, Reason, Act, Observe, Response)
- Code trace blocks per step
- Toggleable annotations per step
- Next/prev navigation

**Maps to**: `step-walkthrough` -- this is a step-walkthrough with trace content inside. The annotation toggle is the only addition, but it can be implemented as a `<details>` inside each step's content.

**Where it goes**: Section 3.5 "Putting It Together" -- currently has an `agent-trace` and a `step-walkthrough`. This prototype is a BETTER version of the existing `step-walkthrough` (`bug-fix-trace` at line 1161) because it adds PRAO phase labels and annotation toggles. REPLACE `bug-fix-trace`.

**Decision**: REPLACE existing `step-walkthrough` `bug-fix-trace` with this richer version.

**Conversion work**:
- Wrap in `<div class="ix-diagram" data-component="step-walkthrough" data-diagram-id="m03-trace-reading-exercise" data-xp="12">`
- Each step becomes:
  ```html
  <div class="ix-sw-step" data-phase="perceive">
    <span class="ix-sw-step-label">Perceive</span>
    <span class="ix-sw-step-title">Exploration -- find relevant files</span>
    <div class="ix-sw-step-body">
      <pre class="ix-code-block">Bash("grep -r '/api/users' src/ --include='*.ts' -l")
  -> src/routes/users.ts
  -> src/services/userService.ts</pre>
      <details class="ix-collapse">
        <summary>Show annotation</summary>
        <div class="ix-collapse-body"><p>The agent starts with broad exploration...</p></div>
      </details>
    </div>
  </div>
  ```
- Task prompt block above the walkthrough as a `callout` (`data-variant="definition"`)
- Replace hex colors with `data-phase` attribute colors
- Replace `DM Sans` with `Inter`
- ARIA: existing step-walkthrough ARIA applies
- Lucide icons: not needed (monospace trace content)

**Complexity**: Low -- uses existing `step-walkthrough` type

---

### 4. m03-layers.html -- Three Layers of a Reasoning Trace

**Module**: 03 (Section 3.1 The Transparency Advantage)
**Component type**: NEW -- `labeled-layers` (or express as `tabbed-panel` with custom styling)
**Action**: ENHANCE existing content

**What it does**: 3-panel layer selector (Thinking, Tool calls, Response) where:
- Clicking a layer highlights relevant lines in a shared trace
- Each layer shows an insight grid (4 cards: "What to watch for", "Best intervention point", "Key signal", "Red flag")
- Below: a static "Why transparency changes the game" section with 3 numbered insights

**Assessment**: This CAN be expressed as a `tabbed-panel` where each tab contains a trace + insight grid. The "highlight in shared trace" behavior would be lost (each tab shows its own trace excerpt), but the pedagogical value is preserved. The "Why transparency changes the game" section at the bottom is a static block, expressed as a `callout` or collapsed prose.

**Decision**: Express as `tabbed-panel` (existing type). The prototype's layer-highlight behavior is visually appealing but not pedagogically essential -- each tab can show the relevant trace excerpt. This avoids a new component type.

**Where it goes**: Section 3.1, AFTER the existing `click-cards` `agent-output-layers`. The click-cards give the overview of each layer; this tabbed-panel provides the trace-reading practice for each layer. It ENHANCES the section by adding worked examples.

**Conversion work**:
- Wrap in `<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="m03-trace-layers-practice">`
- Three tabs: "Thinking", "Tool calls", "Response"
- Each tab contains: trace excerpt in `<pre class="ix-code-block">` + insight grid as `ix-char-grid` (4 items)
- The "Why transparency changes the game" section becomes a `callout` (`data-variant="core-idea"`) placed after the tabbed panel -- but M03 Section 3.1 already has callouts, so check the 2-callout-per-section limit. If exceeded, place in `<details class="ix-collapse">`.
- Replace hex colors with `data-phase` attribute selectors and CSS custom properties
- Replace `DM Sans` with `Inter`
- ARIA: existing tabbed-panel ARIA applies

**Complexity**: Low -- uses existing `tabbed-panel`

---

### 5. m03-looping.html -- Looping vs Thoroughness

**Module**: 03 (Section 3.3 Tool Call Patterns, or Section 3.4 Intervention Decisions)
**Existing component type**: `compare` (side-by-side comparison)
**Action**: ADD new content -- this concept exists in M03 but without a dedicated interactive

**What it does**: Side-by-side comparison of two traces:
- Left: "Thoroughness" (green dot) -- 4 reads of different files, each discovering new info
- Right: "Looping" (red dot) -- 4 reads of the SAME file, no progress
- Below: 4 diagnostic rules for distinguishing looping from thoroughness

**Maps to**: `compare` component (two-column comparison). The diagnostic rules section at the bottom maps to a numbered list inside a `<details class="ix-collapse">` or as a separate `click-cards` component.

**Note**: `compare` is used in M04 already but has no `initCompare` function. Either: (a) it works without JS init (CSS-only), or (b) it needs an init function added. This needs verification. If it needs init, it becomes infra work.

**Where it goes**: Section 3.3 after the tool call patterns click-cards, or Section 3.4 before the intervention scenario-quiz. Best fit: Section 3.4 "Intervention Decisions" because the looping/thoroughness distinction is the core intervention judgment call.

**Decision**: ADD between the existing predict-reveal and the scenario-quiz in the intervention section.

**Conversion work**:
- Wrap in `<div class="ix-diagram" data-component="compare" data-diagram-id="m03-looping-vs-thoroughness">`
- Two columns:
  ```html
  <div data-col="left" data-label="Thoroughness" data-phase="success">
    <pre class="ix-code-block">Read("src/auth/jwt.ts")
  thinking: JWT module found...
    -> discovered: imports from ./config
  Read("src/auth/config.ts") <- new file
  ...</pre>
    <div class="ix-compare-verdict" data-phase="success">Each read is a new file...</div>
  </div>
  <div data-col="right" data-label="Looping" data-phase="error">
    ...
  </div>
  ```
- The 4 diagnostic rules become either a numbered list below the compare, or a `click-cards` component
- Replace hex colors with CSS variables
- Replace `DM Sans` with `Inter`
- ARIA: `role="group"` on compare container, labels for each column

**Complexity**: Low-Medium -- depends on whether `compare` needs an init function

---

### 6. m03-questions.html -- Clarifying Questions

**Module**: 03 (Section 3.4 Clarifying Questions and Agent Feedback)
**Existing component type**: `tabbed-panel`
**Action**: ENHANCE existing content -- M03 has a section on clarifying questions with a `predict-reveal`, `reveal-quiz`, and `decision-tree`. This prototype adds rich before/after answer examples.

**What it does**: 3-tab panel (Scope, Authority, Context) where each tab shows:
- An example clarifying question from the agent
- A "productive answer" (green) with explanation
- An "unproductive answer" (red, strikethrough) with explanation
- A "Record to CLAUDE.md?" note

**Maps to**: `tabbed-panel` -- each tab has structured content (question, good answer, bad answer, note). Perfect fit.

**Where it goes**: Section 3.4, AFTER the existing `reveal-quiz` (`m03-clarification-type-quiz`) which categorizes question types, and BEFORE the `decision-tree` (`clarification-decision`). The reveal-quiz teaches identification; this tabbed-panel teaches how to respond. Logical flow: identify type -> learn how to answer -> decision tree for recording.

**Decision**: ADD between existing components, enhancing the section.

**Conversion work**:
- Wrap in `<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="m03-clarifying-answers">`
- Three tabs: "Scope", "Authority", "Context"
- Each tab contains:
  ```html
  <div data-tab="Scope">
    <div class="ix-section">
      <div class="ix-sec-label">Agent asks</div>
      <div class="ix-sec-text"><code>"Should I also update the logout endpoint..."</code></div>
    </div>
    <div class="ix-char-grid">
      <div class="ix-char-item" data-phase="success"><strong>Productive</strong><span>"Include logout -- invalidate the refresh token..."</span></div>
      <div class="ix-char-item" data-phase="error"><strong>Unproductive</strong><span>"Do what makes sense."</span></div>
    </div>
    <p class="ix-note"><strong>Record to CLAUDE.md?</strong> No -- this is a one-off scope decision.</p>
  </div>
  ```
- Replace hex colors with CSS variables and `data-phase` attributes
- Replace `DM Sans` with `Inter`
- ARIA: existing tabbed-panel ARIA applies

**Complexity**: Low -- uses existing `tabbed-panel`

---

### 7. m04-gccf.html -- Why GCCF Isn't Enough

**Module**: 04 (Section 4.1 Beyond Basic Prompts)
**Existing component type**: `click-cards`
**Action**: REPLACE existing `click-cards` (`m04-failure-modes`) with this richer version

**What it does**: 3 expandable failure mode cards:
1. Multiple valid interpretations
2. Pattern and style requirements
3. Output feeds another system

Each card expands to show: description, GCCF vs TCEF comparison (side-by-side), and a "TCEF fix" note.

**Assessment**: M04 already has `click-cards` `m04-failure-modes` covering the exact same 3 failure modes. The prototype is RICHER because each card includes a side-by-side comparison (GCCF vs TCEF). The existing click-cards have the same info but in a simpler format.

**Decision**: REPLACE `m04-failure-modes` click-cards. The prototype's accordion-with-comparison pattern can be expressed as `click-cards` with comparison content in the detail panels.

**Conversion work**:
- Keep `<div class="ix-diagram" data-component="click-cards" data-diagram-id="m04-failure-modes">`
- Enrich each `ix-detail-panel` to include:
  ```html
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="error">Multiple Valid Interpretations</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">The Problem</div>
        <div class="ix-sec-text">...</div>
      </div>
      <div class="ix-char-grid">
        <div class="ix-char-item" data-phase="error"><strong>GCCF goal</strong><span>"Refactor the authentication module to improve quality."</span></div>
        <div class="ix-char-item" data-phase="success"><strong>TCEF task</strong><span>"Add explicit return type annotations..."</span></div>
      </div>
      <p class="ix-note"><strong>TCEF fix:</strong> precise verb + measurable outcome.</p>
    </div>
  </div>
  ```
- Replace hex colors, replace `DM Sans` with `Inter`
- Lucide icons: use `<i data-lucide="alert-circle">` for failure numbers
- ARIA: existing click-cards ARIA applies

**Complexity**: Low -- uses existing `click-cards`, just enriches detail panel content

---

### 8. m04-tcef.html -- The TCEF Pattern

**Module**: 04 (Section 4.2 The TCEF Framework)
**Existing component type**: `tabbed-panel`
**Action**: REPLACE existing `tabbed-panel` (`m04-tcef-elements`) with this richer version

**What it does**: 4-element selector (T, C, E, F) where clicking each shows:
- Role description
- Before/after comparison (Imprecise vs Precise, or Telling vs Showing)
- Code block for Examples and Format elements
- Takeaway summary

**Assessment**: M04 already has `tabbed-panel` `m04-tcef-elements` covering the exact same 4 elements. The prototype is visually richer with the letter-based selector and comparison pairs. The content quality is comparable.

**Decision**: REPLACE `m04-tcef-elements` tabbed-panel content. Keep the `tabbed-panel` component type but upgrade the content with the prototype's richer comparisons and code blocks.

**Conversion work**:
- Keep `<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="m04-tcef-elements">`
- Four tabs: "Task", "Context", "Examples", "Format"
- Each tab enriched with:
  - Role description paragraph
  - For T and C tabs: `ix-char-grid` with imprecise vs precise examples
  - For E and F tabs: code block showing the schema/example
  - Takeaway in a `<p class="ix-note">` element
- Replace hex colors with CSS variables
- Replace `DM Sans` with `Inter`
- ARIA: existing tabbed-panel ARIA applies

**Complexity**: Low -- uses existing `tabbed-panel`, content upgrade only

---

### 9. m04-context.html -- Five Context Injection Strategies

**Module**: 04 (Section 4.3 Context Injection Strategies)
**Existing component type**: `click-cards`
**Action**: REPLACE existing `click-cards` (`m04-context-strategies`) with this richer version

**What it does**: 5 strategy cards (File Reference, Pattern, Constraint, Audience, State) where clicking each shows:
- 4-item insight grid (Use for, How, Don't, Signal)
- Code example block
- Frequency badge on each card

**Assessment**: M04 already has `click-cards` `m04-context-strategies` covering the same 5 strategies. The prototype is RICHER because each card has a frequency badge and more structured detail panels with 4-item grids + code examples.

**Decision**: REPLACE `m04-context-strategies` click-cards content. Keep component type, upgrade detail panel content.

**Conversion work**:
- Keep `<div class="ix-diagram" data-component="click-cards" data-diagram-id="m04-context-strategies">`
- 5 cards with frequency badges as subtitle text in `ix-card-label`
- Each `ix-detail-panel` enriched with `ix-char-grid` (4 items) + `<pre class="ix-code-block">`
- The "Progressive context strategy" note at the bottom becomes a `callout` (`data-variant="tip"`) placed after the click-cards
- Replace hex colors with CSS variables
- Replace `DM Sans` with `Inter`
- ARIA: existing click-cards ARIA applies

**Complexity**: Low -- uses existing `click-cards`, content upgrade only

---

### 10. m04-constraints.html -- Constraint Specification

**Module**: 04 (Section 4.4 Constraint Specification)
**Existing component type**: `tabbed-panel`
**Action**: REPLACE existing `tabbed-panel` (`m04-constraint-types`) with this richer version

**What it does**: 4-tab panel (Scope, Compatibility, Style, Approval) where each tab shows:
- Category description
- Verifiable constraint (green box)
- Meaningless constraint (red, strikethrough)
- Callout explaining why the bad version fails

Below: a "Meaningless vs. verifiable" quick reference grid (4 pairs).

**Assessment**: M04 already has `tabbed-panel` `m04-constraint-types` covering the same 4 constraint categories, AND a `compare` component `m04-constraints-compare` showing meaningless vs enforceable. The prototype combines both into one richer tabbed-panel PLUS a summary grid.

**Decision**: REPLACE both `m04-constraint-types` AND `m04-constraints-compare` with the prototype's single enriched tabbed-panel. The "quick reference" grid at the bottom replaces the `compare` component. Express as a `compare` or as a static grid within a `<details class="ix-collapse">`.

**Conversion work**:
- Keep `<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="m04-constraint-types">`
- 4 tabs with enriched content per the prototype
- Each tab: description paragraph + `ix-char-grid` with 2 items (verifiable + meaningless, using `data-phase="success"` and `data-phase="error"`)
- The callout explanation per tab as a `<p class="ix-note">`
- The summary grid at the bottom as a separate `compare` component or a simple HTML grid within the section
- Remove the now-redundant `m04-constraints-compare` component
- Replace hex colors with CSS variables
- Replace `DM Sans` with `Inter`
- ARIA: existing tabbed-panel ARIA applies

**Complexity**: Low -- uses existing `tabbed-panel`, content merge + upgrade

---

### 11. m04-iteration.html -- Prompt Iteration as Debugging

**Module**: 04 (Section 4.5 Prompt Iteration)
**Existing component type**: `step-walkthrough` + `reveal-quiz`
**Action**: REPLACE existing `step-walkthrough` (`m04-iteration-loop`) and REPLACE existing `reveal-quiz` (`m04-failure-diagnosis`)

**What it does**: Two interactive sections:
1. **4-step iteration loop** (Run, Diagnose, Hypothesize, Refine) -- clickable step selector showing description, and for the Diagnose step, a PRAO failure breakdown
2. **Failure diagnosis table** -- 6 symptom rows, click to reveal which PRAO phase failed and the fix

**Assessment**: M04 already has `step-walkthrough` `m04-iteration-loop` (4 steps) and `reveal-quiz` `m04-failure-diagnosis` (symptom diagnosis). The prototype covers the exact same content with richer presentation.

**Part 1 maps to**: `step-walkthrough` (existing type) -- the 4-step selector IS a step-walkthrough. The Diagnose step includes a nested grid, which can be expressed as rich content inside the step body.

**Part 2 maps to**: `reveal-quiz` (existing type) -- the failure diagnosis table IS a reveal-quiz where each item reveals a PRAO phase and fix.

**Decision**: REPLACE both existing components with enriched content from the prototype.

**Conversion work**:
- Part 1: Keep `step-walkthrough` type, enrich step content
  ```html
  <div class="ix-diagram" data-component="step-walkthrough" data-diagram-id="m04-iteration-loop">
    <span class="ix-title">The four-step iteration loop</span>
    <div class="ix-sw-step">
      <span class="ix-sw-step-label">Step 1</span>
      <span class="ix-sw-step-title">Run</span>
      <div class="ix-sw-step-body">
        <p>Execute the prompt and collect the complete output including intermediate reasoning...</p>
      </div>
    </div>
    <!-- Step 2 "Diagnose" includes PRAO failure grid inside body -->
  </div>
  ```
- Part 2: Keep `reveal-quiz` type, enrich with 3-column reveals
  ```html
  <div class="ix-diagram" data-component="reveal-quiz" data-diagram-id="m04-failure-diagnosis">
    <span class="ix-title">Failure diagnosis reference</span>
    <div class="ix-rq-item" data-label="Perceive" data-answer="Add concrete codebase example as Pattern Context">
      Generic library patterns instead of project conventions
    </div>
    <!-- 5 more items -->
  </div>
  ```
- Replace hex colors with CSS variables
- Replace `DM Sans` with `Inter`
- ARIA: existing component ARIA applies

**Complexity**: Low -- uses existing types, content upgrade

---

## New Component Types Needed

### 1. `step-checklist` (for m02-setup.html)

**Purpose**: Multi-step checklist with sub-task checkboxes, progress tracking, and verification blocks.

**JS Init Function** (`initStepChecklist`):
- Parse `ix-checklist-step` elements for step data
- Render progress bar based on completed sub-tasks
- Toggle step expansion on click
- Toggle checkbox state on sub-task click
- Update progress bar on each checkbox change
- Store state in component (not persisted across page loads)

**CSS Classes**:
```
.ix-checklist-progress     -- progress bar container
.ix-checklist-track        -- progress bar track (var(--raised))
.ix-checklist-fill         -- progress bar fill (var(--success))
.ix-checklist-label        -- "0 / 4" counter (JetBrains Mono)
.ix-checklist-step         -- individual step card
.ix-checklist-step.done    -- completed step (green dot)
.ix-checklist-step.active  -- expanded step
.ix-checklist-header       -- step name + time estimate
.ix-checklist-desc         -- step description
.ix-checklist-detail       -- expanded content (hidden by default)
.ix-checklist-item         -- individual sub-task with checkbox
.ix-checklist-verify       -- verification command block (monospace)
```

**ARIA**:
- Progress bar: `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax`
- Steps: `role="list"`, each step `role="listitem"`
- Checkboxes: `role="checkbox"`, `aria-checked="true|false"`
- Keyboard: Space/Enter toggles checkbox, arrow keys navigate steps

**Estimated size**: ~80 lines CSS, ~60 lines JS

### 2. `initCompare` registration (for `compare` component)

The `compare` component type is used in M04 (`m04-constraints-compare`) and will be used for M03 (`m03-looping-vs-thoroughness`), but it has no `case 'compare'` in the switch statement and no `initCompare` function.

**Check needed**: Does `compare` render correctly without JS init? If it's CSS-only (like `callout` or `objective`), it may just need a case in the switch. If it needs JS for interactivity, an `initCompare` function is needed.

**If init needed** (`initCompare`):
- Parse `data-col="left"` and `data-col="right"` containers
- Apply column headers from `data-label` attributes
- Style compare items based on `data-phase` attributes
- No complex interactivity -- primarily layout/styling

**Estimated size**: ~40 lines CSS (may already exist), ~20 lines JS

---

## Per-Module Change List

### Module 02: Claude Code Foundations

| Action | Section | What Changes |
|--------|---------|-------------|
| REPLACE | 2.3 Permissions | `tabbed-panel` `m02-permission-patterns` -> enriched `pattern-grid` `m02-permission-syntax` from m02-patterns.html |
| ADD | 2.6 (new section) | `step-checklist` `m02-project-setup` from m02-setup.html -- new capstone exercise |

**Net component count change**: +1 (replace 1, add 1 new)
**New section added**: Yes -- "2.6 Project Setup Exercise"

### Module 03: Agent Thinking

| Action | Section | What Changes |
|--------|---------|-------------|
| ADD | 3.1 | `tabbed-panel` `m03-trace-layers-practice` from m03-layers.html -- after existing click-cards |
| REPLACE | 3.5 | `step-walkthrough` `bug-fix-trace` -> enriched `step-walkthrough` `m03-trace-reading-exercise` from m03-exercise.html |
| ADD | 3.4 | `compare` `m03-looping-vs-thoroughness` from m03-looping.html -- before scenario-quiz |
| ADD | 3.4 | `tabbed-panel` `m03-clarifying-answers` from m03-questions.html -- after reveal-quiz |

**Net component count change**: +3 (replace 1, add 3 new components)
**New sections added**: No -- all additions enhance existing sections

### Module 04: Prompt Engineering Depth

| Action | Section | What Changes |
|--------|---------|-------------|
| REPLACE | 4.1 | `click-cards` `m04-failure-modes` content enriched from m04-gccf.html |
| REPLACE | 4.2 | `tabbed-panel` `m04-tcef-elements` content enriched from m04-tcef.html |
| REPLACE | 4.3 | `click-cards` `m04-context-strategies` content enriched from m04-context.html |
| REPLACE | 4.4 | `tabbed-panel` `m04-constraint-types` content enriched + `compare` `m04-constraints-compare` removed, replaced by enriched tabbed-panel from m04-constraints.html |
| REPLACE | 4.5 | `step-walkthrough` `m04-iteration-loop` + `reveal-quiz` `m04-failure-diagnosis` content enriched from m04-iteration.html |

**Net component count change**: -1 (remove `m04-constraints-compare`, all others are content replacements within existing components)
**New sections added**: No -- all replacements within existing sections

---

## Phase Breakdown

### Phase 1: Infrastructure (blocking -- must complete first)

**Tasks**:
1. Add `initStepChecklist` function + CSS to module-viewer.html
2. Verify `compare` component rendering -- add `initCompare` to switch statement if needed
3. Register `step-checklist` in the `hydrateInteractiveDiagrams()` switch statement

**Estimated effort**: 1 day
**Blocks**: Phase 2 (M02 step-checklist), Phase 3 (M03 compare)

### Phase 2: Module Integration (3 parallel agents)

After Phase 1 completes, three agents can work in parallel:

#### Agent A: Module 02

**Tasks** (sequential within agent):
1. Convert m02-patterns.html content to `pattern-grid` markup and replace `m02-permission-patterns` tabbed-panel in Section 2.3
2. Convert m02-setup.html content to `step-checklist` markup and add as new Section 2.6 "Project Setup Exercise"
3. Add `ix-instruct` paragraphs for both new components
4. Verify no blank lines inside HTML blocks
5. Run quality checklist

**Estimated effort**: 0.5 day

#### Agent B: Module 03

**Tasks** (sequential within agent):
1. Convert m03-layers.html content to `tabbed-panel` and add to Section 3.1 after existing click-cards
2. Convert m03-exercise.html content to `step-walkthrough` and replace `bug-fix-trace` in Section 3.5
3. Convert m03-looping.html content to `compare` and add to Section 3.4 before scenario-quiz
4. Convert m03-questions.html content to `tabbed-panel` and add to Section 3.4 after reveal-quiz
5. Add `ix-instruct` paragraphs for all 4 new/replaced components
6. Verify callout limits per section (max 2)
7. Run quality checklist

**Estimated effort**: 1 day

#### Agent C: Module 04

**Tasks** (sequential within agent):
1. Enrich `m04-failure-modes` click-cards detail panels from m04-gccf.html
2. Enrich `m04-tcef-elements` tabbed-panel tabs from m04-tcef.html
3. Enrich `m04-context-strategies` click-cards detail panels from m04-context.html
4. Enrich `m04-constraint-types` tabbed-panel tabs from m04-constraints.html and remove `m04-constraints-compare`
5. Enrich `m04-iteration-loop` step-walkthrough and `m04-failure-diagnosis` reveal-quiz from m04-iteration.html
6. Add/update `ix-instruct` paragraphs as needed
7. Run quality checklist

**Estimated effort**: 1 day

### Phase 3: Verification

1. Load each module in module-viewer.html and verify all components render
2. Test keyboard navigation on new/modified components
3. Test dark mode and light mode
4. Verify responsive layout at 600px
5. Check ARIA attributes with accessibility audit

**Estimated effort**: 0.5 day

---

## Cross-Cutting Conversion Rules (all 11 prototypes)

Every conversion MUST apply these rules:

| Rule | From (prototype) | To (ix-diagram) |
|------|-------------------|------------------|
| Font | `DM Sans` | `Inter` (inherited from module-viewer) |
| Colors | Hardcoded hex (`#f87171`, `#4ade80`, etc.) | CSS custom properties (`var(--ix-err)`, `var(--success)`, etc.) |
| Border radius | Hardcoded `12px`, `14px` | `var(--radius)` |
| Emojis | `&#10003;`, `&#9654;`, `&#9675;` | Lucide icons where semantic, CSS `::before` where decorative |
| Inline styles | `style="color:#xxx"` | `data-phase` or `data-variant` attributes |
| Animations | Hardcoded `cubic-bezier(.22,1,.36,1)` | Same (matches spec) |
| Wrapper | `<body><div class="container">` | `<div class="ix-diagram" data-component="TYPE">` |
| Instruction | `<div class="instruct">` | `<p class="ix-instruct">` |
| Objective | `<div class="objective">` | `<div class="ix-diagram" data-component="objective">` |
| Code blocks | `<div class="trace">` / `<div class="recipe-code">` | `<pre class="ix-code-block">` |
| IDs | HTML element IDs | `data-diagram-id` attributes |

---

## Estimated Component Count Summary

| Module | Before | After | Delta |
|--------|--------|-------|-------|
| M02 | ~42 components | ~44 components | +2 |
| M03 | ~33 components | ~36 components | +3 |
| M04 | ~22 components | ~21 components | -1 |
| **Total** | **~97** | **~101** | **+4** |

---

## Decisions Record

| Decision | Rationale |
|----------|-----------|
| m03-layers.html as `tabbed-panel` not new type | Avoids new component; pedagogical value preserved without trace highlighting |
| m02-setup.html as new `step-checklist` type | No existing type supports checkboxes + progress bar; genuinely new pattern |
| M04 prototypes as content upgrades, not new types | All 5 prototypes map to existing click-cards, tabbed-panel, step-walkthrough, reveal-quiz |
| m03-looping.html as `compare` | Natural two-column comparison; `compare` is already in the spec |
| REPLACE over ENHANCE for M04 | Prototype content is strictly richer than existing; replacing avoids duplication |
| `compare` init verification needed | Listed as registered type but no init function found -- needs verification before M03 integration |
