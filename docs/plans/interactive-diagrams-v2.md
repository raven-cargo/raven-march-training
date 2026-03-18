# Interactive Diagrams V2 -- Replace Mermaid with Programmatic HTML/SVG

**Status:** Plan
**Created:** 2026-03-16
**Replaces:** `module-diagrams-phase1.md` (Mermaid approach -- rejected)

---

## 1. Technical Approach

### 1.1 The Core Question: Can Raw HTML Survive the Markdown Pipeline?

**Answer: Yes.** The module viewer uses `marked.parse(md)` (line 1024 of `module-viewer.html`). By default, `marked.js` passes raw HTML blocks through unchanged. Any block of HTML not inside a fenced code block will appear verbatim in the rendered output.

This means we can embed `<div>`, `<style>`, and `<script>` blocks directly in the `.md` files and they will render as live, interactive components inside the module viewer.

**Verified behavior chain:**

```
.md file contains raw HTML block
  -> fetch() loads raw markdown text
  -> marked.parse(md) preserves HTML blocks as-is
  -> contentEl.innerHTML = result (HTML is live in the DOM)
  -> postProcess() wraps h2 sections into cards (HTML blocks inside sections are preserved)
  -> Scripts in the HTML execute after innerHTML assignment
```

**Critical constraint:** Scripts injected via `innerHTML` do NOT execute automatically. The `<script>` tags are inserted into the DOM but the browser does not run them. This is a standard browser security behavior.

### 1.2 Solution: Component Registry in the Module Viewer

Rather than embedding `<script>` tags in markdown (which would not execute), we add a **component registry** to `module-viewer.html` that:

1. Looks for marked-up `<div>` elements with a `data-component` attribute
2. Hydrates them with interactivity after `postProcess()` runs
3. Each component type has a corresponding initializer function

**In the markdown files**, diagrams are declared as:

```html
<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="three-eras">
  <div class="ix-tab" data-tab="Era 1: Autocomplete" data-color="#6366f1">
    <!-- static HTML content for this tab -->
  </div>
  <div class="ix-tab" data-tab="Era 2: Assistant" data-color="#06b6d4">
    <!-- static HTML content for this tab -->
  </div>
  <div class="ix-tab" data-tab="Era 3: Agent" data-color="#10b981">
    <!-- static HTML content for this tab -->
  </div>
</div>
```

**In the module viewer**, a new `hydrateInteractiveDiagrams()` function runs after `postProcess()` and `renderMermaid()`, finding all `[data-component]` elements and initializing them.

This approach:
- Keeps markdown files readable (the HTML is semantic and structured)
- Keeps all JavaScript in `module-viewer.html` (single source of truth)
- Works with the existing section-card wrapping (`postProcess` moves content into `.section-body` containers, but the `data-component` divs survive this move)
- Degrades gracefully -- without JS, the raw content is still visible (just not tabbed/interactive)

### 1.3 Mermaid Removal

The existing Mermaid pipeline (`renderMermaid()`, the Mermaid CDN script, all `.mermaid-wrapper` CSS) will be removed from `module-viewer.html` once all 13 diagrams are replaced. The `mermaid@11` script tag (~400KB) is removed from the page load.

---

## 2. Module Viewer Changes Required

### 2.1 Add to `<head>`: Lucide Icons CDN

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
```

This is the same CDN and version used by all lab files. Lucide `createIcons()` will be called after component hydration.

### 2.2 Add to `<style>`: Interactive Diagram Component CSS

A new CSS block (~200 lines) providing shared styles for all five component types. These styles use the existing CSS custom properties from the module viewer theme (see Section 3).

### 2.3 Add to `<script>`: Component Registry and Hydration

A new function `hydrateInteractiveDiagrams(contentEl)` that:

```javascript
function hydrateInteractiveDiagrams(contentEl) {
  const components = contentEl.querySelectorAll('[data-component]');
  components.forEach(el => {
    const type = el.dataset.component;
    switch (type) {
      case 'tabbed-panel':    initTabbedPanel(el);    break;
      case 'click-cards':     initClickCards(el);     break;
      case 'flow-diagram':    initFlowDiagram(el);    break;
      case 'decision-tree':   initDecisionTree(el);   break;
      case 'step-walkthrough': initStepWalkthrough(el); break;
    }
  });
  // Initialize Lucide icons inside the newly hydrated components
  if (window.lucide) lucide.createIcons();
}
```

Called in the render chain at line ~1050, after `renderMermaid()`:

```javascript
hydrateInteractiveDiagrams(contentEl);
```

### 2.4 Remove: Mermaid Pipeline (after all 13 diagrams replaced)

Remove:
- Line 12: `<script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"></script>`
- Lines 400-426: `.mermaid-wrapper` CSS
- Lines 470-555: `resolvedThemeForMermaid()`, `mermaidThemeVars()`, `mermaid.initialize()`
- Lines 607-640: `renderMermaid()` function
- Line 1050: `renderMermaid(contentEl)` call
- Lines 1069-1073: Theme-change reload listener for Mermaid

### 2.5 Theme Support

The interactive diagrams use the module viewer's existing CSS custom properties, which already support light/dark themes via the `theme-toggle.css` / `theme-toggle.js` system. No additional theme logic is needed -- components inherit theme colors from CSS variables.

---

## 3. Design System -- Shared CSS for Interactive Components

All interactive diagrams share a common design language derived from the existing module viewer theme and the example diagrams.

### 3.1 Color Tokens (from module-viewer.html `:root`)

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#080d1a` | Page background |
| `--surface` | `#0f1729` | Component background |
| `--raised` | `#172035` | Elevated surfaces, tab bars |
| `--primary` | `#6366f1` | Primary accent, active states |
| `--accent` | `#06b6d4` | Secondary accent |
| `--success` | `#10b981` | Positive states, completion |
| `--warning` | `#f59e0b` | Caution, attention |
| `--text` | `#f1f5f9` | Primary text |
| `--muted` | `#94a3b8` | Body text |
| `--dim` | `#475569` | Inactive text |
| `--border` | `rgba(255,255,255,0.07)` | Borders |
| `--radius` | `12px` | Border radius |

### 3.2 Additional Semantic Colors (for diagrams)

```css
--ix-phase-perceive: #6366f1;   /* indigo -- maps to --primary */
--ix-phase-reason:   #8b5cf6;   /* violet */
--ix-phase-act:      #06b6d4;   /* cyan -- maps to --accent */
--ix-phase-observe:  #10b981;   /* emerald -- maps to --success */
--ix-err:            #ef4444;   /* red -- error/failure states */
--ix-warn:           #f59e0b;   /* amber -- warning states */
```

### 3.3 Typography

- **Font family:** `Inter, system-ui, sans-serif` (matches module viewer)
- **Mono:** `'JetBrains Mono', monospace` (code samples, step numbers)
- **Heading (component title):** 13px, weight 500, uppercase, letter-spacing 2px, color `--dim`
- **Tab label:** 14px, weight 600
- **Body text:** 14px, weight 400, color `--muted`, line-height 1.6
- **Section label:** 10px, weight 600, uppercase, letter-spacing 1px, color `--dim`

### 3.4 Shared CSS Classes

```css
/* ── Interactive Diagram Base ── */
.ix-diagram {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  margin: 24px 0;
}

.ix-title {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--dim);
  padding: 20px 24px 0;
}

/* ── Tabbed Panel ── */
.ix-tab-nav {
  display: flex;
  gap: 4px;
  padding: 4px;
  margin: 16px 20px;
  background: var(--raised);
  border-radius: 10px;
}

.ix-tab-btn {
  flex: 1;
  padding: 12px 10px;
  border: none;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  color: var(--dim);
}

.ix-tab-btn.active {
  background: var(--surface);
  color: var(--text);
}

.ix-tab-btn.active::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 2px;
  border-radius: 1px;
  /* color set via inline style or data attribute */
}

.ix-tab-panel {
  display: none;
  padding: 20px 24px 24px;
  animation: ixFadeUp 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.ix-tab-panel.active { display: block; }

@keyframes ixFadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Click Cards ── */
.ix-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 8px;
  padding: 16px 20px;
}

.ix-card {
  padding: 16px 12px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--raised);
  cursor: pointer;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.ix-card:hover {
  border-color: var(--dim);
  transform: translateY(-2px);
}

.ix-card.active {
  transform: translateY(-2px);
}

.ix-card-icon {
  width: 32px;
  height: 32px;
  margin: 0 auto 8px;
  color: var(--dim);
  transition: color 0.3s;
}

.ix-card-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--dim);
  transition: color 0.3s;
}

.ix-card.active .ix-card-label { color: var(--text); }

.ix-detail-panel {
  margin: 0 20px 20px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--raised);
  overflow: hidden;
  animation: ixFadeUp 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.ix-detail-header {
  padding: 14px 20px;
  font-size: 15px;
  font-weight: 600;
  border-bottom: 1px solid var(--border);
}

.ix-detail-body {
  padding: 18px 20px;
}

.ix-section {
  margin-bottom: 14px;
}

.ix-section:last-child { margin-bottom: 0; }

.ix-sec-label {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--dim);
  margin-bottom: 4px;
}

.ix-sec-text {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.6;
}

/* ── Flow Nodes ── */
.ix-flow-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px;
  flex-wrap: wrap;
}

.ix-flow-node {
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  min-width: 90px;
  border: 1px solid;
  transition: all 0.3s;
}

.ix-flow-arrow {
  color: var(--dim);
}

.ix-flow-arrow i { width: 18px; height: 18px; }

/* ── Capability Bar ── */
.ix-cap-section {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid var(--border);
}

.ix-cap-label {
  font-size: 11px;
  color: var(--dim);
  margin-bottom: 6px;
}

.ix-cap-track {
  height: 8px;
  border-radius: 4px;
  background: var(--raised);
  overflow: hidden;
}

.ix-cap-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.ix-cap-val {
  font-size: 12px;
  font-weight: 600;
  font-family: 'JetBrains Mono', monospace;
  margin-top: 4px;
  text-align: right;
}

/* ── Step Walkthrough ── */
.ix-step-list {
  padding: 0 20px 20px;
}

.ix-step-item {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
}

.ix-step-item:last-child { border-bottom: none; }

.ix-step-num {
  font-size: 12px;
  font-weight: 700;
  font-family: 'JetBrains Mono', monospace;
  min-width: 24px;
  flex-shrink: 0;
}

.ix-step-text {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.5;
}

/* ── Characteristic Grid ── */
.ix-char-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 14px;
}

.ix-char-item {
  padding: 12px 14px;
  border-radius: 8px;
  background: var(--bg);
  border: 1px solid var(--border);
}

.ix-char-item strong {
  font-weight: 500;
  color: var(--dim);
  display: block;
  margin-bottom: 2px;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.ix-char-item span {
  font-size: 13px;
  color: var(--muted);
}

/* ── Code Example Box ── */
.ix-example-box {
  padding: 14px 18px;
  border-radius: 8px;
  background: var(--bg);
  border-left: 3px solid var(--border);
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--dim);
  line-height: 1.8;
}

.ix-example-box code {
  color: var(--muted);
  font-family: inherit;
  background: none;
  border: none;
  padding: 0;
}

/* ── Decision Tree ── */
.ix-tree-node {
  padding: 14px 18px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--raised);
  margin: 8px 20px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 12px;
}

.ix-tree-node:hover {
  border-color: var(--primary);
}

.ix-tree-node i { flex-shrink: 0; }

.ix-tree-node-text {
  font-size: 14px;
  color: var(--muted);
  flex: 1;
}

.ix-tree-children {
  display: none;
  padding-left: 20px;
  border-left: 2px solid var(--border);
  margin-left: 36px;
  animation: ixFadeUp 0.3s ease;
}

.ix-tree-children.open { display: block; }

/* ── Quadrant / Suitability Grid ── */
.ix-quadrant {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  margin: 16px 20px;
  border-radius: var(--radius);
  overflow: hidden;
}

.ix-quadrant-cell {
  padding: 16px;
  position: relative;
}

.ix-quadrant-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.ix-quadrant-items {
  list-style: none;
}

.ix-quadrant-items li {
  font-size: 12px;
  color: var(--muted);
  padding: 3px 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.ix-quadrant-items li i {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

/* ── Sequence Diagram (SVG-based) ── */
.ix-sequence {
  padding: 20px;
  overflow-x: auto;
}

.ix-sequence svg {
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
  display: block;
}

/* ── Animation Utilities ── */
@keyframes ixPulseDot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.ix-pulse { animation: ixPulseDot 2s ease infinite; }

@keyframes ixSlideIn {
  from { opacity: 0; transform: translateX(-8px); }
  to   { opacity: 1; transform: translateX(0); }
}
```

### 3.5 Lucide Icon Integration

All icons use inline SVG via Lucide. In the HTML blocks within markdown:

```html
<i data-lucide="eye" class="ix-card-icon"></i>
```

After hydration, `lucide.createIcons()` converts these to inline SVGs. This matches the pattern used in all lab files.

Common icons used across diagrams:

| Concept | Lucide Icon | Usage |
|---------|-------------|-------|
| Perceive | `eye` | PRAO perceive phase |
| Reason | `brain` | PRAO reason phase |
| Act | `zap` | PRAO act phase |
| Observe | `search` | PRAO observe phase |
| Human/Goal | `target` | Human goal node |
| Success | `check-circle` | Completion, deliverable |
| Error | `alert-triangle` | Failure modes |
| File | `file-text` | File operations |
| Terminal | `terminal` | Bash commands |
| Globe | `globe` | Web/MCP |
| Plug | `plug` | MCP connections |
| Arrow Right | `arrow-right` | Flow arrows |
| Refresh | `refresh-cw` | Feedback loops |
| Layers | `layers` | Output layers |
| Shield | `shield` | Permissions |
| Lock | `lock` | Denied permissions |
| Unlock | `unlock` | Allowed permissions |
| Settings | `settings` | Configuration |
| GitBranch | `git-branch` | Decision trees |
| ChevronRight | `chevron-right` | Expandable nodes |
| ChevronDown | `chevron-down` | Expanded nodes |

---

## 4. Per-Diagram Specifications -- All 13 Diagrams

### Module 01: The Paradigm Shift (4 diagrams)

---

#### Diagram 1.1: Three Eras of AI-Assisted Engineering
**Section:** 1.1
**Component type:** `tabbed-panel`
**Location:** Replaces the `flowchart LR` Mermaid block (lines 27-44)

**Initial state:** Three-tab navigation bar with "Era 1: Autocomplete" active. Below the tabs: a flow visualization showing the interaction loop, a 2x2 characteristic grid, a cost-of-error bar, and a concrete example box.

**Interaction:** Click a tab to switch between eras. Each tab panel animates in with a fade-up transition. The flow visualization changes to show the different loop shapes (3 nodes for era 1-2, 4 nodes with a feedback arrow for era 3).

**Lucide icons:**
- Flow nodes: `keyboard` (You type/prompt/brief), `sparkles` (AI suggests/responds/works), `check-circle` (You decide/act/verify), `refresh-cw` (loops -- era 3 only)

**HTML structure:**

```html
<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="three-eras">
  <span class="ix-title">Three eras of AI-assisted engineering</span>
  <!-- Tab nav and panels generated by hydration from data-tab divs -->
  <div class="ix-tab" data-tab="Era 1: Autocomplete" data-accent="#6366f1">
    <div class="ix-flow-visual">
      <div class="ix-flow-node" style="background:rgba(99,102,241,0.1);border-color:rgba(99,102,241,0.3);color:#6366f1">
        <i data-lucide="keyboard" style="width:16px;height:16px"></i> You type
      </div>
      <i data-lucide="arrow-right" class="ix-flow-arrow"></i>
      <div class="ix-flow-node" style="...">AI suggests</div>
      <i data-lucide="arrow-right" class="ix-flow-arrow"></i>
      <div class="ix-flow-node" style="...">You decide</div>
    </div>
    <div class="ix-char-grid">
      <div class="ix-char-item"><strong>Scope</strong><span>Single line / block</span></div>
      <div class="ix-char-item"><strong>Memory</strong><span>None between suggestions</span></div>
      <div class="ix-char-item"><strong>Agency</strong><span>Zero -- pure prediction</span></div>
      <div class="ix-char-item"><strong>Feedback loop</strong><span>None beyond accept/reject</span></div>
    </div>
    <div class="ix-cap-section">
      <div class="ix-cap-label">Cost of error</div>
      <div class="ix-cap-track"><div class="ix-cap-fill" data-width="20%" style="background:#10b981"></div></div>
      <div class="ix-cap-val" style="color:#10b981">Low -- you discard and retype</div>
    </div>
  </div>
  <!-- Similar for Era 2 and Era 3 -->
</div>
```

---

#### Diagram 1.2: PRAO Loop
**Section:** 1.2
**Component type:** `click-cards`
**Location:** Replaces the `flowchart LR` PRAO loop Mermaid block (lines 88-103)

**Initial state:** Four horizontally arranged cards: Perceive, Reason, Act, Observe. "Perceive" is active by default. Below: a detail panel showing what happens in that phase, with a concrete example from the TypeScript task.

**Interaction:** Click any phase card to see its detail panel. Each card has a Lucide icon and a colored accent border when active. The detail panel includes: phase description, what the agent does, tool calls involved, and what to watch for.

**Lucide icons:** `eye` (Perceive), `brain` (Reason), `zap` (Act), `search` (Observe)

**Color mapping:**
- Perceive: `#6366f1` (primary/indigo)
- Reason: `#8b5cf6` (violet)
- Act: `#06b6d4` (cyan/accent)
- Observe: `#10b981` (success/emerald)

---

#### Diagram 1.3: PRAO Worked Example (Sequence Diagram)
**Section:** 1.2
**Component type:** `step-walkthrough`
**Location:** Replaces the `sequenceDiagram` Mermaid block (lines 143-178)

**Initial state:** A step counter showing "Step 1 of 8" with Prev/Next navigation. The first step shows: "Human sends task: Add TypeScript types to src/utils.ts" with the PRAO phase badge and relevant icon.

**Interaction:** Click Next/Prev to walk through each step of the sequence. Each step is labeled with its PRAO phase (color-coded badge). Steps include the actor (Human, Agent, Environment), the action, and the result. Cycle boundaries (Cycle 1 / Cycle 2) are visually distinct separators.

**Steps:**
1. Human -> Agent: Task prompt (labeled "GOAL")
2. Agent -> Env: Read(src/utils.ts) (labeled "PERCEIVE")
3. Agent -> Env: Read(src/utils.test.ts) (labeled "PERCEIVE")
4. Agent -> Env: Bash(npx tsc --noEmit) (labeled "PERCEIVE")
5. Agent: Plan type additions (labeled "REASON")
6. Agent -> Env: Write(src/utils.ts) (labeled "ACT")
7. Agent -> Env: Bash(npm test) -- 2 tests FAIL (labeled "OBSERVE")
8. --- Cycle 2 ---
9. Agent: Fix type mismatch (labeled "REASON")
10. Agent -> Env: Write(src/utils.ts) (labeled "ACT")
11. Agent -> Env: Bash(npm test) -- All pass (labeled "OBSERVE")
12. Agent -> Human: Done (labeled "DELIVER")

---

#### Diagram 1.4: Task Suitability Quadrant
**Section:** 1.5
**Component type:** `click-cards` (quadrant variant)
**Location:** Replaces the `quadrantChart` Mermaid block (lines 353-370)

**Initial state:** A 2x2 grid showing four quadrants. Each quadrant has a title, color, and list of task types. The axes are labeled: X = Specificity (Low -> High), Y = Verifiability (Low -> High).

**Interaction:** Click any task item to highlight it and show a tooltip/detail explaining why it falls in that quadrant. The quadrant cells have subtle background colors to indicate suitability.

**Quadrant layout:**
- Top-right (best fit, green): Multi-file refactor, Test generation, Documentation, Config migration
- Top-left (needs better spec, amber): Code review (medium specificity but verifiable)
- Bottom-right (verify manually, blue): Production deploy
- Bottom-left (poor fit, red): Vague improvement, Creative design

**Lucide icons per item:** `check-circle` (best fit), `alert-triangle` (needs spec), `x-circle` (poor fit), `eye` (verify manually)

---

### Module 01: Diagram 1.5: Session vs. Persistent Context
**Section:** 1.3
**Component type:** `click-cards` (two-column variant)
**Location:** Replaces the `flowchart LR` Mermaid block (lines 217-237)

**Initial state:** Two side-by-side panels: "Persists Across Sessions" (amber/gold border) and "Lives in Session Only" (gray border). Each panel lists its items with icons.

**Interaction:** Click any item to see a brief tooltip/expansion explaining what it is and why it persists (or doesn't). An arrow between the panels shows that session items are "lost on exit unless written" to persistent storage.

**Lucide icons:** `hard-drive` (CLAUDE.md), `settings` (settings.json), `file-text` (Files on disk), `plug` (MCP config), `message-square` (Conversation history), `brain` (Reasoning traces), `mic` (Verbal decisions)

---

### Module 02: Claude Code Foundations (5 diagrams)

---

#### Diagram 2.1: Claude Code Architecture
**Section:** Claude Code Architecture (before 2.1)
**Component type:** `click-cards`
**Location:** Replaces the `flowchart TD` Mermaid block (lines 28-54)

**Initial state:** A top-level entry point card ("claude CLI") with an arrow down to a "REPL Loop" card, then arrows to "Claude API" and four tool cards arranged horizontally: Files, Bash, Web, MCP.

**Interaction:** Click any component card to see its detail panel below: what it does, how it fits in the architecture, and key details. The REPL card shows context window details. The tool cards show available operations.

**Lucide icons:** `terminal` (CLI), `repeat` (REPL Loop), `cloud` (Claude API), `file-text` (Files), `square-terminal` (Bash), `globe` (Web), `plug` (MCP)

---

#### Diagram 2.2: Mode Decision Framework
**Section:** 2.1
**Component type:** `decision-tree`
**Location:** Replaces the `flowchart TD` Mermaid block (lines 99-114)

**Initial state:** A root question node: "New task -- which mode?" with two visible child branches. Each branch is a clickable question that expands to reveal the recommendation.

**Interaction:** Click each question node to expand/collapse its answer branch. The tree has three question levels leading to either "Interactive (claude)" or "Non-interactive (claude -p)" recommendations, each with a brief explanation of when to use.

**Decision tree:**
```
[New task]
  -> Need to redirect mid-task?
     -> Yes -> Interactive (claude)
     -> No -> Well-specified with full context?
        -> Yes -> Non-interactive (claude -p)
        -> No -> Interactive (claude)
        -> Uncertain -> Is this exploratory?
           -> Yes -> Interactive
           -> No -> Non-interactive
```

**Lucide icons:** `git-branch` (decision node), `terminal` (interactive), `file-output` (non-interactive), `chevron-right`/`chevron-down` (expand/collapse)

---

#### Diagram 2.3: CLAUDE.md Hierarchy
**Section:** 2.2
**Component type:** `step-walkthrough` (vertical stack variant)
**Location:** Replaces the `flowchart TD` Mermaid block (lines 141-159)

**Initial state:** Four stacked layers shown as cards, from broadest (top) to most specific (bottom): Global, Project, Local, Subdirectory. The bottom shows the merged result. Only the first layer is expanded initially.

**Interaction:** Click each layer card to expand it and see: file path, what belongs there, and an example snippet. A visual indicator shows the merge direction (arrows flowing down) and that specific overrides general.

**Lucide icons:** `globe` (Global), `folder` (Project), `user` (Local), `folder-tree` (Subdirectory), `layers` (Merged result)

---

#### Diagram 2.4: Permissions Flow (Allow/Deny Model)
**Section:** 2.3
**Component type:** `decision-tree`
**Location:** Replaces the `flowchart TD` Mermaid block (lines 277-293)

**Initial state:** Root node: "Agent wants to take an action" with the first question visible: "In deny list?"

**Interaction:** Click through the decision tree. Each terminal node is color-coded: red for BLOCKED, green for PERMITTED, amber for ASK HUMAN, gray for SKIPPED. Each node has an icon and brief explanation.

**Decision flow:**
```
[Agent action]
  -> In deny list?
     -> Yes -> BLOCKED (red, lock icon)
     -> No -> In allow list?
        -> Yes -> PERMITTED (green, unlock icon)
        -> No -> Interactive mode?
           -> Yes -> ASK HUMAN (amber, message-square icon)
           -> No -> SKIPPED (gray, skip-forward icon)
```

---

#### Diagram 2.5: MCP Transport Mechanisms
**Section:** 2.4
**Component type:** `tabbed-panel` (two tabs)
**Location:** Replaces the `flowchart LR` Mermaid block (lines 435-458)

**Initial state:** Two-tab panel: "stdio (local)" active. Shows: how it works, communication method, lifecycle, and a configuration example.

**Interaction:** Switch between stdio and Streamable HTTP tabs. Each tab shows: transport description, communication flow (3 characteristic items), and a JSON config snippet.

**Lucide icons:** `terminal` (stdio), `globe` (HTTP), `arrow-right-left` (communication)

---

#### Diagram 2.6: Agent Output Layers
**Section:** 2.5
**Component type:** `click-cards` (vertical stack variant)
**Location:** Replaces the `flowchart TD` Mermaid block (lines 563-582)

**Initial state:** Three stacked layer cards: "Thinking", "Tool Calls", "Response". Each card shows the layer name, icon, and brief description. "Thinking" is expanded by default.

**Interaction:** Click any layer card to expand its detail: what it contains, how to read it efficiently, and the best intervention point for that layer. An engineering review sidebar shows: what to look for at each layer.

**Lucide icons:** `brain` (Thinking), `wrench` (Tool Calls), `message-square` (Response), `user` (Engineer Review)

---

### Module 03: Agent Thinking (4 diagrams)

---

#### Diagram 3.1: Reading Agent Output (Detailed Layers)
**Section:** 3.1
**Component type:** `click-cards` (with PRAO mapping)
**Location:** Replaces the `flowchart TD` Mermaid block (lines 33-66)

**Initial state:** Three layer cards (Thinking, Extended Thinking, Tool Calls, Response) arranged vertically with PRAO phase badges alongside each. An "Engineer oversight" sidebar shows what to watch at each layer.

**Interaction:** Click any layer to expand it. The expanded view shows: detailed description, PRAO mapping, and the specific oversight action for that layer. The PRAO badges are color-coded to match the standard PRAO colors.

**Lucide icons:** `brain` (Thinking), `brain` with glow (Extended Thinking), `wrench` (Tool Calls), `message-square` (Response), `eye` (oversight)

---

#### Diagram 3.2: PRAO State Machine
**Section:** 3.2
**Component type:** `tabbed-panel` (four phases as tabs)
**Location:** Replaces the `stateDiagram-v2` Mermaid block (lines 89-103)

**Initial state:** A compact state machine visualization at the top showing four connected nodes (P -> R -> A -> O -> P), with the current phase highlighted. Below: four tabs, one per phase. The "Perceive" tab is active showing what happens during perception.

**Interaction:** Click a phase tab to highlight that node in the state machine visualization and show phase details below. Each phase tab includes: description, common tool calls, what to watch for, and when to intervene.

**Lucide icons:** `eye` (P), `brain` (R), `zap` (A), `search` (O), `refresh-cw` (loop arrow)

---

#### Diagram 3.3: Five Tool Call Patterns
**Section:** 3.3
**Component type:** `click-cards`
**Location:** Replaces the `flowchart LR` five-pattern Mermaid block (lines 161-192)

**Initial state:** Five horizontally scrollable cards, each showing a pattern name and icon. "Pattern 1: Single File" is active. Below: a detail panel showing the pattern's tool call sequence, what it signals, and when to intervene.

**Interaction:** Click any pattern card to see its detail panel. Each pattern includes: a visual representation of the tool call sequence (small flow nodes), a description of what the pattern signals about agent behavior, and guidance on whether to intervene.

**Patterns and icons:**
1. Single File (`file-text`) -- Read -> Think -> Write
2. Multi-File (`files`) -- Read xN -> Think -> Write xN
3. Exploration (`search`) -- Bash -> Bash -> Bash
4. Act & Verify (`check-circle`) -- Read -> Write -> Bash(test) -> Read
5. Stuck (`alert-circle`) -- Think -> Think -> Think (red accent)

---

#### Diagram 3.4: Clarification Question Decision Tree
**Section:** 3.4
**Component type:** `decision-tree`
**Location:** Replaces the `flowchart TD` Mermaid block (lines 315-332)

**Initial state:** Root: "Agent asks a clarifying question" with three type branches visible.

**Interaction:** Click each question type to see guidance. Then each type leads to a decision: "Will this come up again?" -> Yes: "Answer + write to CLAUDE.md" / No: "Answer in conversation only."

**Decision flow:**
```
[Clarifying question]
  -> Type?
     -> Scope clarification
     -> Authority clarification
     -> Context clarification
  -> Will this come up again?
     -> Yes -> Answer + write to CLAUDE.md (green)
     -> No -> Answer in conversation only (gray)
```

**Lucide icons:** `message-circle` (question), `maximize-2` (scope), `shield` (authority), `info` (context), `file-plus` (write to CLAUDE.md), `message-square` (answer in conversation)

---

#### Diagram 3.5: Extended Thinking Depth Spectrum
**Section:** 3.5
**Component type:** `tabbed-panel` (three tabs)
**Location:** Replaces the `flowchart LR` Mermaid block (lines 347-358)

**Initial state:** Three tabs: "Simple (Direct)", "Medium (Step-by-Step)", "Hard (Extended Thinking)". "Simple" active. Each shows: problem type, thinking depth, token budget indicator, and example scenarios.

**Interaction:** Switch tabs to compare the three levels of thinking depth. Each tab includes a visual "depth meter" showing relative thinking token usage and a list of task types that benefit from that depth.

**Lucide icons:** `zap` (Simple/Direct), `list-ordered` (Step-by-Step), `brain` (Extended Thinking)

---

#### Diagram 3.6: Complete Trace Reading Exercise (Sequence)
**Section:** Putting It Together
**Component type:** `step-walkthrough`
**Location:** Replaces the `sequenceDiagram` Mermaid block (lines 422-459)

**Initial state:** Step counter "Step 1 of 7" with Prev/Next. First step: "PERCEIVE -- Agent searches for relevant files: grep -r '/api/users' src/" with a colored phase badge.

**Steps:**
1. PERCEIVE: Bash(grep -r '/api/users' src/) -> 3 files found
2. PERCEIVE: Read(routes/users.ts), Read(services/userService.ts)
3. REASON: Missing error handling detected -- getUser() throws on DB unavailability
4. ACT: Write(routes/users.ts) -- try/catch added
5. OBSERVE: Bash(npm test) -> All pass; Bash(npx tsc --noEmit) -> No errors
6. RESPONSE: Summary to human with fix explanation
7. RECOMMENDATION: Add test for DB failure case

Each step has: PRAO phase badge (color-coded), actor icons, action description, and result. The current step is visually prominent; completed steps are grayed.

---

## 5. Mermaid Removal Plan

### 5.1 Per-File Removal

For each of the 3 markdown files, the replacement process is:

1. Identify the Mermaid block (between `` ```mermaid `` and `` ``` ``)
2. Replace with the corresponding `<div class="ix-diagram" data-component="...">` HTML block
3. Preserve all surrounding prose text unchanged
4. Verify the interactive component renders correctly in the module viewer

**Module 01 (`01-paradigm-shift.md`):**
- Remove Mermaid block at lines 27-44 -> Replace with Diagram 1.1 (tabbed-panel)
- Remove Mermaid block at lines 88-103 -> Replace with Diagram 1.2 (click-cards)
- Remove Mermaid block at lines 143-178 -> Replace with Diagram 1.3 (step-walkthrough)
- Remove Mermaid block at lines 217-237 -> Replace with Diagram 1.5 (click-cards)
- Remove Mermaid block at lines 253-279 -> Replace with Diagram 1.4 (click-cards, removed from 1.4 numbering but this is the collaboration model)
- Remove Mermaid block at lines 353-370 -> Replace with Diagram 1.4 (quadrant)

Wait -- re-counting. Module 01 actually has **4** Mermaid blocks:
1. Lines 27-44: Three Eras flowchart
2. Lines 88-103: PRAO Loop flowchart
3. Lines 143-178: PRAO Worked Example sequence diagram
4. Lines 217-237: Session vs Persistent Context flowchart
5. Lines 258-279: Collaboration Model / Failure Modes flowchart
6. Lines 353-370: Task Suitability quadrant chart

That is **6** Mermaid blocks in Module 01, not 4. Let me recount all three modules.

**Actual Mermaid block count:**

Module 01: 6 blocks (Three Eras, PRAO Loop, PRAO Sequence, Session/Persistent, Failure Modes, Task Suitability)
Module 02: 5 blocks (Architecture, Decision Framework, CLAUDE.md Hierarchy, Permissions Flow, MCP Transport, Agent Output Layers -- wait, that is 6)

Let me recount precisely.

**Module 01 (01-paradigm-shift.md):**
1. Lines 27-44: Three Eras (flowchart LR)
2. Lines 88-103: PRAO Loop (flowchart LR)
3. Lines 143-178: PRAO Worked Example (sequenceDiagram)
4. Lines 217-237: Session vs Persistent Context (flowchart LR)
5. Lines 258-279: Collaboration Model (flowchart TD)
6. Lines 353-370: Task Suitability (quadrantChart)

**Module 02 (02-claude-code-foundations.md):**
1. Lines 28-54: Architecture Overview (flowchart TD)
2. Lines 99-114: Mode Decision Framework (flowchart TD)
3. Lines 141-159: CLAUDE.md Hierarchy (flowchart TD)
4. Lines 277-293: Permissions Flow (flowchart TD)
5. Lines 435-458: MCP Transport (flowchart LR)
6. Lines 563-582: Agent Output Layers (flowchart TD)

**Module 03 (03-agent-thinking.md):**
1. Lines 33-66: Reading Agent Output Detailed (flowchart TD)
2. Lines 89-103: PRAO State Machine (stateDiagram-v2)
3. Lines 161-192: Five Tool Call Patterns (flowchart LR)
4. Lines 315-332: Clarification Question Decision (flowchart TD)
5. Lines 347-358: Extended Thinking Spectrum (flowchart LR)
6. Lines 422-459: Complete Trace Exercise (sequenceDiagram)

**Total: 18 Mermaid blocks**, not 13. The original task description said 13 (4+5+4). Actual count is 18 (6+6+6).

### 5.2 Module Viewer Cleanup

After all 18 diagrams are replaced with interactive components:

1. Remove Mermaid CDN script tag from `<head>`
2. Remove all `.mermaid-wrapper` CSS rules
3. Remove `renderMermaid()` function and its call
4. Remove Mermaid initialization code (`mermaid.initialize()`)
5. Remove theme-change Mermaid reload listener

---

## 6. Implementation Order

### Phase 1: Infrastructure (module-viewer.html changes)

**Task 1.1:** Add Lucide CDN script to module-viewer.html
**Task 1.2:** Add interactive diagram CSS block to module-viewer.html
**Task 1.3:** Add component registry and all 5 hydration functions to module-viewer.html
**Task 1.4:** Add `hydrateInteractiveDiagrams()` call to the render chain
**Task 1.5:** Verify with a single test diagram that HTML blocks in .md files render and hydrate correctly

**Estimated effort:** 1 day
**Blocks:** All subsequent phases

### Phase 2: Module 01 Diagrams (highest priority -- most visible)

**Task 2.1:** Diagram 1.1 -- Three Eras (tabbed-panel) -- this is the hero diagram
**Task 2.2:** Diagram 1.2 -- PRAO Loop (click-cards)
**Task 2.3:** Diagram 1.3 -- PRAO Worked Example (step-walkthrough)
**Task 2.4:** Diagram 1.5 -- Session vs Persistent Context (click-cards)
**Task 2.5:** Diagram 1.4 -- Collaboration / Failure Modes (click-cards)
**Task 2.6:** Diagram 1.6 -- Task Suitability Quadrant (quadrant grid)

**Estimated effort:** 2 days
**Parallel:** Tasks 2.1-2.6 can be built in parallel by different engineers (different sections of the same file, but different Mermaid blocks being replaced)

### Phase 3: Module 02 Diagrams

**Task 3.1:** Diagram 2.1 -- Architecture Overview (click-cards)
**Task 3.2:** Diagram 2.2 -- Mode Decision Framework (decision-tree)
**Task 3.3:** Diagram 2.3 -- CLAUDE.md Hierarchy (step-walkthrough)
**Task 3.4:** Diagram 2.4 -- Permissions Flow (decision-tree)
**Task 3.5:** Diagram 2.5 -- MCP Transport (tabbed-panel)
**Task 3.6:** Diagram 2.6 -- Agent Output Layers (click-cards)

**Estimated effort:** 2 days

### Phase 4: Module 03 Diagrams

**Task 4.1:** Diagram 3.1 -- Reading Agent Output (click-cards)
**Task 4.2:** Diagram 3.2 -- PRAO State Machine (tabbed-panel)
**Task 4.3:** Diagram 3.3 -- Five Tool Call Patterns (click-cards)
**Task 4.4:** Diagram 3.4 -- Clarification Decision Tree (decision-tree)
**Task 4.5:** Diagram 3.5 -- Extended Thinking Spectrum (tabbed-panel)
**Task 4.6:** Diagram 3.6 -- Complete Trace Exercise (step-walkthrough)

**Estimated effort:** 2 days

### Phase 5: Mermaid Removal and Cleanup

**Task 5.1:** Remove Mermaid CDN, CSS, JS from module-viewer.html
**Task 5.2:** Verify all 18 interactive diagrams render correctly
**Task 5.3:** Test light/dark theme toggle for all diagrams
**Task 5.4:** Test mobile responsiveness for all diagrams
**Task 5.5:** Deploy to Vercel and verify on live site

**Estimated effort:** 0.5 days

### Total estimated effort: 7.5 days

---

## 7. Icon Reference -- NO Emojis

All Mermaid blocks currently contain emojis in node labels. These MUST be removed and replaced with Lucide SVG icons during the replacement process. No emoji characters should appear in any interactive diagram HTML.

**Emoji -> Lucide icon mapping for removal:**

| Current Emoji | Replace With | Lucide Icon Name |
|---------------|-------------|-----------------|
| Pencil / notepad | Keyboard input | `keyboard` |
| Speech bubble | Conversation | `message-square` |
| Lightning | Action / speed | `zap` |
| Target | Goal | `target` |
| Eye | Perception | `eye` |
| Brain | Reasoning | `brain` |
| Magnifier | Observation | `search` |
| Checkmark | Completion | `check-circle` |
| Shield | Security | `shield` |
| Gear | Settings | `settings` |
| File | Document | `file-text` |
| Monitor | Terminal | `terminal` |
| Globe | Web/network | `globe` |
| Plug | Connection | `plug` |
| Cloud | API | `cloud` |

All icons rendered as:
```html
<i data-lucide="icon-name"></i>
```

Hydrated by `lucide.createIcons()` after component initialization.

---

## 8. Risks and Mitigations

### Risk 1: `innerHTML` script execution
**Risk:** Scripts inside HTML blocks set via `innerHTML` do not execute.
**Mitigation:** Already addressed -- all JavaScript lives in the module viewer's component registry. No `<script>` tags in the markdown. HTML blocks are purely declarative; hydration adds behavior.

### Risk 2: postProcess() re-ordering breaks component HTML
**Risk:** The `postProcess()` function moves DOM nodes when wrapping h2 sections into `.module-section` cards. If an interactive diagram straddles an h2 boundary, it could be split.
**Mitigation:** All interactive diagram HTML blocks are placed WITHIN a section (between two h2 headings), never spanning across them. The postProcess wrapping collects all siblings between h2s, so the diagram's `<div>` will be collected as a single sibling and moved intact.

### Risk 3: Theme incompatibility
**Risk:** The example diagrams use different base colors (#0c0c0f, DM Sans) than the module viewer (#080d1a, Inter).
**Mitigation:** All interactive diagrams use the module viewer's CSS variables exclusively. No hardcoded colors except within inline `style` attributes for accent colors on specific nodes, and even those use the semantic diagram colors defined in the shared CSS.

### Risk 4: Performance with 6 diagrams per module
**Risk:** 6 interactive components per module could impact scroll performance.
**Mitigation:** Components are lightweight (DOM-only, no canvas/WebGL). The hydration function runs once. CSS animations use `transform` and `opacity` (GPU-accelerated). No animation runs unless the component is in view.

### Risk 5: Mobile responsiveness
**Risk:** Grid layouts and horizontal flows may break on narrow screens.
**Mitigation:** Use `grid-template-columns: repeat(auto-fit, minmax(140px, 1fr))` for card grids. Flow visualizations use `flex-wrap: wrap`. Tab navs switch to scrollable on narrow screens. All dimensions use relative units.

---

## 9. Corrected Diagram Count

The original task description stated 13 Mermaid diagrams (4+5+4). Actual count from reading all three files:

| Module | Stated | Actual | Diagrams |
|--------|--------|--------|----------|
| 01-paradigm-shift | 4 | 6 | Three Eras, PRAO Loop, PRAO Sequence, Session/Persistent, Collaboration Model, Task Suitability |
| 02-claude-code-foundations | 5 | 6 | Architecture, Mode Decision, CLAUDE.md Hierarchy, Permissions Flow, MCP Transport, Agent Output Layers |
| 03-agent-thinking | 4 | 6 | Agent Output Detailed, PRAO State Machine, Five Patterns, Clarification Decision, Extended Thinking, Complete Trace |
| **Total** | **13** | **18** | |

All 18 diagrams are specified in Section 4 above.
