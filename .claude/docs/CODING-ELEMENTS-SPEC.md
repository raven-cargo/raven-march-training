# Coding Elements Specification

Rules for writing interactive HTML/CSS/JS components rendered inside `module-viewer.html`. Every agent working on module content MUST follow these rules.

---

## Visual Design Rules

### Icons -- No Emojis

- **NEVER** use emojis anywhere in components or prose
- Use Lucide icons exclusively: `<i data-lucide="icon-name"></i>`
- Call `lucide.createIcons()` after any dynamic DOM insertion that adds new `<i data-lucide>` elements
- Icon sizing: use the default Lucide size (24px) for card icons; for inline icons within text, add `width="16" height="16"` attributes

### Colors -- No Hardcoded Values

- **NEVER** use inline `style="color: #xxx"` or `style="background: #xxx"`
- **NEVER** introduce hex/rgb values in CSS without adding them to `:root` first
- Use CSS custom properties from the theme: `--surface`, `--raised`, `--border`, `--primary`, `--text`, `--text-muted`, `--accent`, etc.
- Use `data-phase`, `data-variant`, `data-type` attribute selectors for semantic coloring:
  ```css
  /* Correct */
  [data-phase="perceive"] { color: var(--phase-perceive); }

  /* Wrong */
  .perceive-card { color: #f59e0b; }
  ```
- Colors communicate meaning, not decoration:
  - Green = success/result
  - Red = error
  - Amber = warning/prompt
  - Violet = thinking/reasoning
  - Cyan = tool use
  - Indigo = response

### `data-phase` Color System

The `data-phase` attribute maps PRAO phases and semantic states to colors throughout the course:

| `data-phase` Value | Color Variable | Hex | Usage |
|---|---|---|---|
| `perceive` | `--phase-perceive` | amber | Prompt lines, input steps |
| `reason` | `--phase-reason` | violet | Thinking lines, reasoning steps |
| `act` | `--phase-act` | cyan | Tool calls, actions |
| `observe` | `--phase-observe` | green | Results, observations |
| `success` | `--success` | green | Correct answers, includes, hold badges |
| `error` | `--ix-err` | red | Errors, excludes, intervene badges |
| `neutral` | `--dim` | gray | Neutral states, unclassified |

### `data-variant` Callout System

The `data-variant` attribute on callout components controls visual styling:

| `data-variant` | Left Border | Background Tint | Icon | Usage |
|---|---|---|---|---|
| `core-idea` | cyan (`--accent`) | `rgba(6,182,212,0.06)` | `lightbulb` | Central concept of a section |
| `tip` | green (`--success`) | `rgba(16,185,129,0.06)` | `check-circle` | Practical advice, best practices |
| `warning` | amber (`--ix-warn`) | `rgba(245,158,11,0.06)` | `alert-triangle` | Gotchas, common mistakes |
| `key-concept` | indigo (`--primary`) | `rgba(99,102,241,0.06)` | `key` | Important concept to remember |
| `approval` | cyan | `rgba(6,182,212,0.06)` | `shield-check` | Permission/approval patterns |
| `definition` | purple (`#8b5cf6`) | `rgba(139,92,246,0.06)` | `book-open` | Term definitions |
| `merge-note` | gray (`--dim`) | `var(--raised)` | `git-merge` | Merge/combination notes |

### Theme

- **Dark mode is primary** -- design and test in dark mode first
- Light mode applied via `[data-theme="light"]` overrides on `:root`
- Every color must work in both themes -- test before shipping

### Typography

| Context | Font | Notes |
|---------|------|-------|
| Body text | `Inter` | Default sans-serif |
| Code / technical | `JetBrains Mono` | Monospace for code blocks, file names |
| Uppercase labels | Any | Must use `letter-spacing: 0.06em` |

### Spacing and Shape

- Border radius: `var(--radius)` (12px default) -- never hardcode `border-radius` values
- Compact panels: `padding: 12-14px` -- not 20px+
- Animations: `cubic-bezier(0.22, 1, 0.36, 1)` for all transitions and animations

### Inline Code in Prose

Use backtick-rendered code for:
- File names: `CLAUDE.md`, `settings.json`
- Commands: `claude -p`, `npm install`
- Tool names: `Read()`, `Bash()`
- Code identifiers: `hydrateInteractiveDiagrams()`

Do not overuse -- plain English for concepts, backticks only for literal code/file/command references.

---

## HTML in Markdown Rules

### The Blank Line Rule (CRITICAL)

**NEVER** leave blank lines inside nested `<div>` structures. `marked.js` interprets blank lines inside HTML blocks as paragraph breaks and will escape content as code blocks, destroying the component.

```html
<!-- CORRECT: No blank lines inside nested divs -->
<div class="ix-diagram" data-component="tabbed-panel">
  <div data-tab="First">
    <p>Content here</p>
  </div>
  <div data-tab="Second">
    <p>More content</p>
  </div>
</div>

<!-- WRONG: Blank lines will break rendering -->
<div class="ix-diagram" data-component="tabbed-panel">

  <div data-tab="First">

    <p>Content here</p>

  </div>

</div>
```

**Why this happens**: `marked.js` processes HTML blocks by looking for blank lines as block separators. A blank line inside a `<div>` causes the parser to split the HTML block, which means the inner content gets processed as markdown and may be wrapped in `<pre><code>` blocks.

**How to verify**: After writing any HTML block, scan every line. If any line is completely empty between an opening `<div>` and its closing `</div>`, remove it. Use comments (`<!-- spacing -->`) if you need visual separation in the source.

### Pure HTML Inside HTML Blocks

Content inside HTML blocks must be pure HTML. Do not mix markdown syntax inside `<div>` structures:

| Instead of | Use |
|------------|-----|
| `**bold**` | `<strong>bold</strong>` |
| `` `code` `` | `<code>code</code>` |
| `- list item` | `<ul><li>list item</li></ul>` |
| `[link](url)` | `<a href="url">link</a>` |

---

## Component Wrapper Pattern

Every interactive component follows this structure:

```html
<p class="ix-instruct">Click each tab to explore the concept.</p>

<div class="ix-diagram" data-component="TYPE">
  <!-- component content -->
</div>
```

- The `ix-instruct` paragraph tells the student what to do -- required before every interactive element
- The `ix-diagram` wrapper with `data-component` attribute triggers hydration

---

## Registered Component Types (22 Types)

| `data-component` | Purpose | Complexity |
|---|---|---|
| `tabbed-panel` | Tabbed content sections | Medium |
| `click-cards` | Clickable reveal cards | Medium |
| `decision-tree` | Branching decision flows | Medium |
| `step-walkthrough` | Sequential step-by-step | Medium |
| `agent-trace` | Animated agent execution traces | High |
| `module-hero` | Hero banner at top of module | Medium |
| `pattern-grid` | Grid of pattern cards with click-to-reveal scope | Medium |
| `objective` | Learning objective block | Low |
| `callout` | Info/warning/tip callout | Low |
| `entry-list` | Structured entry list with include/exclude badges | Medium |
| `hierarchy` | Hierarchical tree view with connected dots | Medium |
| `timeline` | Chronological timeline with stage reveal | High |
| `scenario-quiz` | Terminal replay + multi-choice quiz | High |
| `reveal-quiz` | Click-to-reveal categorization quiz | Medium |
| `intervention` | Intervene/hold decision guide | Low |
| `debug-steps` | Numbered debugging walkthrough | Low |
| `quiz` | Knowledge check quiz | Medium |
| `predict-reveal` | Predict-before-explain block | Low |
| `terminal-sim` | Terminal simulation | High |
| `accordion` | Collapsible accordion sections | Low |
| `compare` | Side-by-side comparison | Medium |
| `collapsible-details` | Native `<details>` with course styling | Low |

New component types must be registered in the `hydrateInteractiveDiagrams()` switch statement in `module-viewer.html`.

---

## Hero Section Component

The `module-hero` component creates a lab-quality hero banner at the top of each module.

### Markup Pattern

```html
<div class="ix-diagram" data-component="module-hero">
<div class="ix-hero">
<div class="ix-hero-bg"></div>
<div class="ix-hero-module-num">Module 02</div>
<div class="ix-hero-title">Claude Code Foundations</div>
<div class="ix-hero-subtitle">Configure your environment, understand the permission model, connect external tools</div>
<div class="ix-hero-chips">
<span class="ix-hero-chip">Modes and Configuration</span>
<span class="ix-hero-chip">CLAUDE.md System</span>
<span class="ix-hero-chip">Permissions Model</span>
<span class="ix-hero-chip">MCP Servers</span>
</div>
</div>
</div>
```

### Requirements

- Gradient title text matching module theme
- Floating animated dots (particle field) that respect `prefers-reduced-motion`
- Objective chips summarizing 4-5 learning goals
- Scroll indicator at bottom
- Full-viewport-height section
- No blank lines inside the hero div structure

---

## Pattern Grid Component

The `pattern-grid` component displays a grid of items with syntax + meaning columns and a hidden scope badge revealed on click.

### Markup Pattern

```html
<div class="ix-diagram" data-component="pattern-grid" data-diagram-id="permission-patterns">
  <span class="ix-title">Permission scope patterns</span>
  <div class="ix-pg-section" data-label="File Operations">
    <div class="ix-pg-item" data-syntax="Read(src/**)" data-meaning="Read any source file" data-scope="broad" data-example="The agent reads src/utils.ts and src/api/routes.ts">
    </div>
    <div class="ix-pg-item" data-syntax="Write(src/auth.ts)" data-meaning="Write only auth module" data-scope="exact" data-example="The agent can only modify the single auth file">
    </div>
  </div>
</div>
```

### Scope Badge Colors

| `data-scope` | Color | Meaning |
|---|---|---|
| `broad` | red | Wide scope, higher risk |
| `scoped` | green | Limited scope, controlled |
| `exact` | blue | Single target, precise |
| `hidden` | gray | Not yet revealed |

---

## Instruction Text (`.ix-instruct`)

An `<p class="ix-instruct">` MUST appear before every interactive component. It tells the student what action to take.

### Requirements

- Font: 13px italic
- Color: `var(--muted)` (not `var(--dim)` which is too faint)
- Includes a play triangle prefix (`\25B6`) via CSS `::before`
- The triangle is decorative and uses `speak: never` or `aria-hidden` for screen readers
- Padding: `0 20px`
- Margin bottom: `12px`

### Instruction Text Patterns by Component Type

| Component | Instruction Pattern |
|---|---|
| `tabbed-panel` | "Switch between tabs to compare..." |
| `click-cards` | "Click each card to explore..." |
| `step-walkthrough` | "Step through the sequence to see..." |
| `agent-trace` (auto-play) | "Watch the trace replay..." or "Press play to watch..." |
| `agent-trace` (manual) | "Step through the trace..." or "Click the step button to advance..." |
| `scenario-quiz` | "Choose your response for each scenario..." |
| `decision-tree` | "Click to expand each branch..." |
| `predict-reveal` | "Write your prediction, then reveal the reference reasoning." |
| `quiz` | "Test your understanding of..." |
| `reveal-quiz` | "Click each item to reveal..." |
| `pattern-grid` | "Click each pattern to reveal its scope..." |
| `entry-list` | "Review each entry to learn what belongs..." |

Always mention keyboard alternatives when applicable: "...or press the right arrow key"

---

## Collapsible Details (`ix-collapse`)

Use native `<details>` with course styling for progressive disclosure of long prose.

### Markup Pattern

```html
<details class="ix-collapse">
<summary>Deep Dive: Why the autocomplete mindset persists</summary>
<div class="ix-collapse-body">
<p>Long prose content goes here. This is hidden by default and revealed on click.</p>
</div>
</details>
```

### Requirements

- No blank lines between `<details>`, `<summary>`, and `<div>` tags
- Summary text should be descriptive: "Deep Dive: [topic]" or "Details: [topic]"
- The collapse body uses `padding: 14px 16px`
- Animated disclosure triangle that rotates 90 degrees on open
- No JS required -- native `<details>` behavior

---

## Accessibility Requirements

### Keyboard Navigation

- All interactive components must support keyboard navigation (arrow keys at minimum)
- Tab/Shift+Tab for focus movement between components
- Enter/Space to activate buttons, tabs, cards
- All focusable elements must have `:focus-visible` styles:
  ```css
  .ix-card:focus-visible,
  .ix-tree-node:focus-visible,
  .ix-timeline-stage:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }
  ```

### ARIA Attributes

```html
<!-- Tabs -->
<div role="tablist">
  <button role="tab" aria-selected="true" tabindex="0">Tab 1</button>
  <button role="tab" aria-selected="false" tabindex="-1">Tab 2</button>
</div>
<div role="tabpanel">Content</div>

<!-- Quizzes -->
<div role="radiogroup">
  <button role="radio" aria-checked="false">Option A</button>
  <button role="radio" aria-checked="false">Option B</button>
</div>

<!-- Speed controls -->
<div role="radiogroup" aria-label="Playback speed">
  <button role="radio" aria-checked="true" aria-label="Playback speed 0.5x">0.5x</button>
</div>
```

- Use roving `tabindex` for tab groups (`0` on active, `-1` on inactive)
- `aria-selected` on active tabs
- `aria-expanded` on collapsible elements
- `aria-live="polite"` on dynamic content regions
- Quiz feedback must include icons (check-circle, x-circle) not just color -- colorblind accessible

### Motion

- All animated components must respect `prefers-reduced-motion`:
  ```css
  @media (prefers-reduced-motion: reduce) {
    .animated-element {
      animation: none;
      transition: none;
    }
  }
  ```
- This applies to: hero particles, trace row animations, card hover transforms, detail panel slide-ups, milestone toasts, completion banners, timeline reveals

### Responsive

- All components must be usable at 600px viewport width
- Stack horizontal layouts vertically on mobile
- Touch targets minimum 44x44px on mobile
- Hero chips: reduce gap to 6px and font-size to 10px on mobile
- Trace annotation panel: min-height 200px on mobile (not 150px)
- Quiz grid: keep 2x2 down to 420px, collapse to 1-column below

---

## Agent Trace Component

The `agent-trace` component has specific requirements beyond standard components.

### Variants (4 Types)

| `data-variant` | Layout | Default Mode |
|---|---|---|
| `terminal` | Terminal-style sequential trace | Auto-play (0.5x) |
| `prao` | PRAO-phase-grouped trace | Auto-play (0.5x) |
| `annotated` | Trace with side annotations | **Manual** (click-through) |
| `compare` | Side-by-side trace comparison | **Manual** (click-through) |

### Step Type Colors

| `data-type` | Color Variable | Meaning |
|---|---|---|
| `prompt` | amber | User prompt / perceive |
| `think` | violet | Internal reasoning |
| `tool` | cyan | Tool call / action |
| `result` | green | Tool result / observation |
| `response` | indigo | Final response |
| `error` | red | Error state |

### Playback Controls

- Auto-play on scroll into viewport via `IntersectionObserver` with 500ms delay (only for traces without `data-default-mode="manual"`)
- Controls: Play, Pause, Reset, Step Forward, Speed (0.5x/1x/2x)
- Default speed: `0.5x` (not 1x) -- learning content needs slower pacing
- All controls use Lucide icons (e.g., `<i data-lucide="play">`, `<i data-lucide="pause">`)
- Current step highlighted; previous steps dimmed but visible
- Traces with `data-default-mode="manual"` start paused with step button highlighted
- Speed button aria-labels: `aria-label="Playback speed 0.5x"`
- Speed control group: `role="radiogroup"`

### Animation Timing Standards

Minimum `data-delay` values by line type (enforced for all agent traces):

| `data-type` | Minimum Delay (ms) | Rationale |
|---|---:|---|
| `prompt` | 2000 | Students must read and understand the task |
| `think` | 3500 | Longer text; students evaluate agent reasoning |
| `think` (with annotation) | 4000 | Parallel reading burden |
| `tool` | 1500 | Students parse the command |
| `result` | 1500 | Students read the output |
| `response` | 2500 | Students verify against prior steps |
| `error` | 2500 | Students must understand the failure |
| First line (`data-delay="0"`) | 0 | Immediate display is expected |

These are **minimums at 1x speed**. The default speed of `0.5x` effectively doubles them.

### Manual vs Auto-Play Decision Criteria

| Criterion | Auto-play | Manual |
|---|---|---|
| Column count | Single column | Two columns (parallel reading) |
| Variant | `terminal`, `prao` | `annotated`, `compare` |
| Annotation density | None or brief labels (<3 words) | Substantive learning content |
| Learning goal | Demonstration (watching flow unfold) | Comprehension (studying content) |
| Trace length | Short (6 lines or fewer, borderline up to 16) | Long with dense content |
| Content type | Visually dramatic (errors, recoveries, phase transitions) | Careful comparison or study |

**Rule**: Any trace where students must read two pieces of content simultaneously (annotations, side-by-side columns) MUST default to manual mode.

### Manual Mode Implementation

```html
<div class="ix-diagram" data-component="agent-trace"
     data-variant="annotated"
     data-default-mode="manual"
     data-speed="0.5">
```

- Add `data-default-mode="manual"` to the component div
- The JS engine starts in paused state with step-forward as the primary interaction
- Auto-play remains available via a "Watch it play" toggle
- Step button gets `ix-trace-btn-primary` class (highlighted)
- A hint text appears: "Click step or press arrow-right to advance"

### The Three Approval Options Pattern

When teaching the permission/approval flow, the course uses a specific three-option pattern:

1. **Allow Once** -- permit this specific action this time only
2. **Allow for Session** -- permit this action pattern for the remainder of the session
3. **Write a Rule** -- add to `settings.json` allow list for permanent permission

This pattern should be presented as an `intervention` component or `click-cards` with three cards showing the three escalation levels.

---

## Integration Checklist (Pre-Ship)

Before shipping any new or modified component:

### HTML/Markdown Quality
- [ ] No blank lines inside nested HTML divs (check every `<div>` pair)
- [ ] No markdown syntax inside HTML blocks (use `<strong>`, `<code>`, `<ul>/<li>`)
- [ ] All `<div>` tags properly closed and nested
- [ ] No inline `style` attributes for colors or backgrounds

### Visual Design
- [ ] Uses only CSS custom properties for colors (no hex/rgb literals)
- [ ] No emojis -- Lucide icons only
- [ ] Tested in dark mode (primary) and light mode
- [ ] Matches visual quality of v2 examples in `examples/module-diagrams/`
- [ ] Compact padding (12-14px, not 20px+)

### Instruction and Context
- [ ] `ix-instruct` paragraph precedes the component
- [ ] Instruction text matches the component type (see patterns table above)
- [ ] Instruction text mentions keyboard alternative where applicable

### Accessibility
- [ ] Keyboard navigable (arrow keys, Enter/Space)
- [ ] ARIA attributes present and correct
- [ ] `:focus-visible` styles applied
- [ ] Quiz feedback uses icons, not just colors
- [ ] `prefers-reduced-motion` respected for ALL animations

### Responsive and Performance
- [ ] Responsive at 600px breakpoint
- [ ] Touch targets 44x44px minimum on mobile
- [ ] `lucide.createIcons()` called after dynamic DOM insertion

### Component Registration
- [ ] Component type registered in `hydrateInteractiveDiagrams()` if new
- [ ] `data-component` value exactly matches the registered type string

### Agent Trace Specific
- [ ] Two-column traces (`annotated`, `compare`) have `data-default-mode="manual"`
- [ ] All traces have `data-speed="0.5"`
- [ ] All `data-delay` values meet minimum timing standards
- [ ] Instruction text matches mode (auto-play vs manual wording)
