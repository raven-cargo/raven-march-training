# Interactive Treatment v4: Example-Driven Re-Plan

**Date**: 2026-03-16
**Supersedes**: `interactive-treatment-v3.md`
**Target**: Raise Modules 01-03 from 4/10 to 9+/10 by using v2 example designs as PRIMARY reference
**Key Insight**: The 7 example files in `examples/module-diagrams/` ARE production-quality targets. v4 adapts them into the module-viewer system rather than building from scratch.

---

## Source Example Inventory

| Example File | Maps To | Key Patterns Demonstrated |
|---|---|---|
| `m02-claudemd-v2.html` | M02 Section 2.2 | Learning objective, tabbed Include/Exclude/Hierarchy, entry cards with badges, vertical hierarchy with connected dots, update-trigger list, merge-note callout |
| `m02-mcp-v2.html` | M02 Section 2.4 | Learning objective, core-idea callout, transport selector grid, config code blocks, debug-steps numbered cards, permission note |
| `m02-modes-v2.html` | M02 Section 2.1 | Learning objective, mode tabs with detail grid + use-case lists + code blocks, scenario quiz (click-to-reveal answer + reasoning) |
| `m02-output-v2.html` | M02 Section 2.5 / M03 Section 3.1 | Learning objective, 3-layer selector with terminal examples + takeaway cards, intervene/hold decision badges, approval-box callout |
| `m02-permissions-v2.html` | M02 Section 2.3 | Learning objective, 3-state flow summary, side-by-side config + test panel, click-to-reveal permission test (allow/deny/ask badges), key principles |
| `claude-md-evolution.html` | M02 Section 2.2 supplement | Vertical timeline with connected dots, stage-by-stage CLAUDE.md growth, file-block with diff highlighting, trigger explanations |
| `disorientation-sim.html` | M01 Section 1.4 or M03 | Terminal replay with typed lines + cursor blink, multi-scenario quiz (A/B/C with correct/wrong/neutral), per-scenario feedback, prev/next navigation |
| `era-diagram.html` | M01 Section 1.1 | 3-era tabs with flow visuals, characteristic grids, cost bars with pulse animation, example boxes |
| `collaboration-model.html` | M01 Section 1.4 | 4-card selector (failure modes + productive pattern), symptom/why/example/fix sections, capability utilization bars (animated fill) |

---

## New Component Types Required

Based on pattern analysis of all 9 example files, the module-viewer needs 9 new component types. Each is defined below with the CSS/JS specification derived directly from the example HTML.

### 1. `ix-objective` -- Learning Objective Callout

**data-component**: `objective`
**Source pattern**: Every v2 file (`.objective` class)
**Frequency**: 1 per section (appears at top of every major section)

**Visual**: Blue-tinted box (background `rgba(6,182,212,0.06)` in module-viewer palette). Two-line layout: uppercase "LEARNING OBJECTIVE" label in accent color, followed by descriptive text in muted color.

**Markup in markdown**:
```html
<div class="ix-diagram" data-component="objective">
  <p>Write effective CLAUDE.md content that gives the agent durable project knowledge. Know exactly what belongs in the file, what doesn't, and how the four-level hierarchy merges at runtime.</p>
</div>
```

**CSS** (adapt v2 `.objective` to module-viewer variables):
```css
.ix-objective {
  padding: 14px 18px;
  border-radius: var(--radius);
  background: rgba(6,182,212,0.06);
  border: 1px solid rgba(6,182,212,0.2);
  margin: 0 20px 20px;
}
.ix-objective-label {
  color: var(--accent);
  font-weight: 600;
  display: block;
  margin-bottom: 4px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.ix-objective-text {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.6;
}
```

**JS**: `initObjective(el)` -- reads `<p>` child, wraps in label+text structure. Minimal logic.

---

### 2. `ix-callout` -- Multi-Variant Callout Box

**data-component**: `callout`
**Source patterns**: `.core-idea` (m02-mcp-v2), `.merge-note` (m02-claudemd-v2), `.approval-box` (m02-output-v2), `.perm-note` (m02-mcp-v2)
**Variants**: `core-idea`, `tip`, `warning`, `key-concept`, `approval`, `merge-note`

**Markup**:
```html
<div class="ix-diagram" data-component="callout" data-variant="core-idea">
  <p><strong>Without MCP</strong>, Claude Code can only read files and run bash commands. <strong>With MCP</strong>, it can query databases, create issues in Linear, fetch Notion pages.</p>
</div>
```

**CSS**: Each variant gets a different left-border color and subtle background tint. Base structure:
```css
.ix-callout {
  padding: 16px 20px;
  border-radius: var(--radius);
  background: var(--raised);
  border: 1px solid var(--border);
  margin: 0 20px 20px;
  font-size: 14px;
  color: var(--muted);
  line-height: 1.65;
}
.ix-callout strong { color: var(--text); }
.ix-callout[data-variant="core-idea"] { border-left: 3px solid var(--accent); }
.ix-callout[data-variant="approval"] {
  background: rgba(6,182,212,0.06);
  border: 1px solid rgba(6,182,212,0.2);
}
.ix-callout[data-variant="warning"] { border-left: 3px solid var(--warning); }
.ix-callout[data-variant="tip"] { border-left: 3px solid var(--success); }
.ix-callout[data-variant="merge-note"] { border-left: 3px solid var(--dim); }
```

**JS**: `initCallout(el)` -- reads variant from `data-variant`, applies class. Minimal.

---

### 3. `ix-entry-list` -- Entry Cards with Include/Exclude Badges

**data-component**: `entry-list`
**Source pattern**: m02-claudemd-v2 (`.entry`, `.entry-badge.yes`, `.entry-badge.no`)
**Purpose**: Categorized content cards with green INCLUDE or red EXCLUDE badges, each with category label, example content, and "why" explanation.

**Markup**:
```html
<div class="ix-diagram" data-component="entry-list" data-diagram-id="claudemd-belongs">
  <span class="ix-title">What belongs in CLAUDE.md</span>
  <div class="ix-entry" data-badge="include">
    <div class="ix-entry-category">Architecture overview</div>
    <div class="ix-entry-example">TypeScript monorepo with pnpm workspaces. Three packages: packages/api, packages/web, packages/shared.</div>
    <div class="ix-entry-why">The agent needs to know what it's working with before it reads a single file.</div>
  </div>
  <div class="ix-entry" data-badge="exclude">
    <div class="ix-entry-category">Secrets and credentials</div>
    <div class="ix-entry-example">API_KEY=sk-abc123...</div>
    <div class="ix-entry-why">CLAUDE.md gets committed. Secrets in CLAUDE.md = secrets in your git history.</div>
  </div>
</div>
```

**CSS** (from v2 `.entry` pattern, adapted to module-viewer variables):
```css
.ix-entry-list { padding: 0 20px 20px; }
.ix-entry {
  padding: 16px 18px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--raised);
  margin-bottom: 10px;
  display: flex;
  gap: 14px;
  align-items: flex-start;
}
.ix-entry-badge {
  font-size: 10px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.5px;
  padding: 4px 10px; border-radius: 6px;
  white-space: nowrap; margin-top: 2px; flex-shrink: 0;
}
.ix-entry-badge.include {
  background: rgba(16,185,129,0.1);
  color: var(--success);
  border: 1px solid rgba(16,185,129,0.3);
}
.ix-entry-badge.exclude {
  background: rgba(239,68,68,0.1);
  color: var(--ix-err);
  border: 1px solid rgba(239,68,68,0.3);
}
.ix-entry-content { flex: 1; }
.ix-entry-category {
  font-size: 10px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.8px;
  color: var(--dim); margin-bottom: 4px;
}
.ix-entry-example {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px; color: var(--muted);
  line-height: 1.6; margin-bottom: 6px;
}
.ix-entry-why {
  font-size: 12px; color: var(--dim); line-height: 1.5;
}
```

**JS**: `initEntryList(el)` -- reads `.ix-entry` children, prepends badge element based on `data-badge`, wraps content.

---

### 4. `ix-timeline` -- Vertical Timeline with Connected Dots

**data-component**: `timeline`
**Source pattern**: `claude-md-evolution.html` (`.timeline`, `.stage`)
**Purpose**: Vertical timeline with connected-dot progression. Click a stage to reveal its detail (file content + trigger explanation). Active dot glows.

**Markup**:
```html
<div class="ix-diagram" data-component="timeline" data-diagram-id="claudemd-evolution">
  <span class="ix-title">CLAUDE.md is a living document</span>
  <div class="ix-timeline-stage" data-week="Day 1" data-name="Project kickoff" data-lines="~8 lines">
    <div class="ix-timeline-file"><!-- code block content --></div>
    <div class="ix-timeline-trigger"><strong>What triggered this:</strong> You created the project...</div>
  </div>
  <!-- more stages -->
</div>
```

**CSS** (from v2 `.timeline`, `.stage` pattern):
```css
.ix-timeline {
  position: relative;
  padding-left: 32px;
  margin: 0 20px 20px;
}
.ix-timeline::before {
  content: '';
  position: absolute;
  left: 11px; top: 0; bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--border), var(--primary), var(--accent));
  border-radius: 1px;
}
.ix-timeline-stage {
  position: relative;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.3s;
}
.ix-timeline-stage::before {
  content: '';
  position: absolute;
  left: -25px; top: 16px;
  width: 12px; height: 12px;
  border-radius: 50%;
  background: var(--raised);
  border: 2px solid var(--dim);
  transition: all 0.35s;
  z-index: 1;
}
.ix-timeline-stage.active::before {
  background: var(--primary);
  border-color: var(--primary);
  box-shadow: 0 0 12px rgba(99,102,241,0.3);
}
.ix-timeline-header {
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--raised);
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.ix-timeline-stage.active .ix-timeline-header {
  border-color: rgba(99,102,241,0.3);
  background: rgba(99,102,241,0.06);
}
.ix-timeline-detail {
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--raised);
  overflow: hidden;
  margin-top: 12px;
  animation: ixFadeUp 0.4s ease;
}
```

**JS**: `initTimeline(el)` -- reads stages, builds header+detail structure, click handler toggles active stage and renders detail panel with file block + trigger.

---

### 5. `ix-scenario-quiz` -- Terminal Replay + Multi-Choice Quiz

**data-component**: `scenario-quiz`
**Source pattern**: `disorientation-sim.html` (terminal replay + A/B/C choices + feedback + prev/next navigation)
**Purpose**: Full scenario simulation. Shows animated terminal output, then asks a question with 3 choices. Each choice has a rating (correct/wrong/neutral) and reveals feedback.

**Markup**:
```html
<div class="ix-diagram" data-component="scenario-quiz" data-diagram-id="disorientation-sim">
  <span class="ix-title">The disorientation simulator</span>
  <div class="ix-scenario" data-correct="1">
    <div class="ix-scenario-terminal">
      <div class="ix-term-line" data-type="prompt">> Add error handling to all API routes</div>
      <div class="ix-term-line" data-type="tool">  Read("src/routes/")</div>
      <div class="ix-term-line" data-type="output">  -> users.ts, products.ts, orders.ts</div>
    </div>
    <div class="ix-scenario-question">The agent started reading files and writing code immediately. What do you do?</div>
    <div class="ix-scenario-choice" data-rating="neutral">Interrupt and ask for a plan first.</div>
    <div class="ix-scenario-choice" data-rating="correct">Let it work. Review changes when done.</div>
    <div class="ix-scenario-choice" data-rating="wrong">Close the terminal.</div>
    <div class="ix-scenario-feedback">This is normal agent behavior. The agent is running through PRAO...</div>
  </div>
  <!-- more scenarios -->
</div>
```

**CSS**: Combines terminal styling (from v2 `.terminal` class) with choice cards (from v2 `.choice` class). Terminal has dark background, typed-line animation. Choices have hover states and colored reveal states (green=correct, red=wrong, amber=neutral). Feedback slides up from bottom.

**JS**: `initScenarioQuiz(el)` -- multi-scenario state machine. Renders terminal lines with staggered animation delays, presents choices, handles selection with rating reveal + feedback display. Prev/Next navigation between scenarios. Tracks answered state per scenario.

---

### 6. `ix-reveal-quiz` -- Click-to-Reveal Action Cards

**data-component**: `reveal-quiz`
**Source patterns**: m02-modes-v2 (`.scenario` with hidden answer), m02-permissions-v2 (`.test-action` with allow/deny/ask reveal)
**Purpose**: List of items where clicking reveals a categorized answer + reasoning. Used for "which mode?" and "how does this permission resolve?"

**Markup**:
```html
<div class="ix-diagram" data-component="reveal-quiz" data-diagram-id="mode-quiz">
  <span class="ix-title">Test yourself: which mode for this task?</span>
  <div class="ix-reveal-item" data-answer="noninteractive" data-label="claude -p" data-variant="scenario">
    <div class="ix-reveal-prompt">Review a PR diff for security vulnerabilities in CI</div>
    <div class="ix-reveal-why">Well-specified, no mid-task input needed, output goes to CI.</div>
  </div>
  <div class="ix-reveal-item" data-answer="interactive" data-label="claude" data-variant="scenario">
    <div class="ix-reveal-prompt">Debug a flaky integration test</div>
    <div class="ix-reveal-why">Each discovery changes direction. You need to be in the loop.</div>
  </div>
</div>
```

**Variant**: `scenario` (mode quiz -- answer labels are "claude -p" / "claude" / "Start interactive, promote") or `permission` (answer labels are "Permitted" / "Blocked" / "Ask human" with color-coded badges).

**CSS**: Items have card styling with `justify-content: space-between`. Hidden answer badge on right. On click: badge colorizes (green/red/amber per answer type), "why" text slides in below prompt. Card gets `revealed` class preventing re-click.

**JS**: `initRevealQuiz(el)` -- reads items, creates badge elements, click handler reveals answer+why with animation.

---

### 7. `ix-hierarchy` -- Vertical Connected-Dot Hierarchy

**data-component**: `hierarchy`
**Source pattern**: m02-claudemd-v2 (`.hierarchy`, `.h-level`)
**Purpose**: Vertical hierarchy with left-side connected dots and colored scope labels. Each level has a path, scope label, and description. Used for CLAUDE.md file hierarchy.

**Markup**:
```html
<div class="ix-diagram" data-component="hierarchy" data-diagram-id="claudemd-hierarchy">
  <span class="ix-title">CLAUDE.md hierarchy and layers</span>
  <div class="ix-h-level" data-level="0" data-color="var(--success)">
    <div class="ix-h-path">~/.claude/CLAUDE.md</div>
    <div class="ix-h-scope">Global -- applies everywhere</div>
    <div class="ix-h-desc">Cross-project defaults: personal style preferences, universal guardrails.</div>
  </div>
  <!-- more levels -->
</div>
```

**CSS** (from v2 `.hierarchy` pattern):
```css
.ix-hierarchy {
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
  padding-left: 24px;
  margin: 0 20px 20px;
}
.ix-hierarchy::before {
  content: '';
  position: absolute;
  left: 11px; top: 20px; bottom: 20px;
  width: 2px;
  background: linear-gradient(to bottom, var(--success), var(--primary), var(--accent), var(--warning));
  border-radius: 1px;
}
.ix-h-level {
  padding: 16px 18px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--raised);
  position: relative;
  margin-bottom: 8px;
}
.ix-h-level::before {
  content: '';
  position: absolute;
  left: -17px; top: 22px;
  width: 10px; height: 10px;
  border-radius: 50%;
  border: 2px solid var(--dim);
  background: var(--raised);
}
.ix-h-path {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px; color: var(--dim); margin-bottom: 4px;
}
.ix-h-scope {
  font-size: 10px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.8px;
  margin-bottom: 4px;
}
.ix-h-desc {
  font-size: 13px; color: var(--muted); line-height: 1.5;
}
```

Level-specific colors applied via `data-level` attribute (0=success, 1=primary, 2=accent, 3=warning).

**JS**: `initHierarchy(el)` -- reads levels, applies dot colors based on `data-level`, builds connected-dot structure.

---

### 8. `ix-intervention` -- Intervene/Hold Decision Guide

**data-component**: `intervention`
**Source pattern**: m02-output-v2 (`.int-item`, `.int-badge.yes`, `.int-badge.no`)
**Purpose**: Decision guide cards with red INTERVENE or green HOLD badges. Each card describes a scenario and the recommended action.

**Markup**:
```html
<div class="ix-diagram" data-component="intervention" data-diagram-id="when-to-intervene">
  <span class="ix-title">When to intervene vs. hold</span>
  <div class="ix-int-item" data-action="intervene">
    <div class="ix-int-text"><strong>Wrong plan</strong> -- the thinking reveals a wrong assumption. Cheaper to fix now.</div>
  </div>
  <div class="ix-int-item" data-action="hold">
    <div class="ix-int-text"><strong>Test failures mid-task</strong> -- normal PRAO behavior. Agent will fix in next cycle.</div>
  </div>
</div>
```

**CSS**: Badge styling mirrors entry-list badges but with INTERVENE (red) and HOLD (green). Cards are stacked vertically.

**JS**: `initIntervention(el)` -- reads items, prepends action badges, wraps content. Minimal logic.

---

### 9. `ix-debug-steps` -- Numbered Debug/Troubleshooting Steps

**data-component**: `debug-steps`
**Source pattern**: m02-mcp-v2 (`.debug-steps`, `.debug-step`, `.ds-num`, `.ds-cmd`)
**Purpose**: Numbered troubleshooting steps, each with a text description and a monospace command example.

**Markup**:
```html
<div class="ix-diagram" data-component="debug-steps" data-diagram-id="mcp-debug">
  <span class="ix-title">When it doesn't connect</span>
  <div class="ix-debug-step">
    <div class="ix-debug-text">Test the command manually -- does the server process start?</div>
    <div class="ix-debug-cmd">npx -y @modelcontextprotocol/server-postgres "postgresql://localhost/mydb"</div>
  </div>
  <div class="ix-debug-step">
    <div class="ix-debug-text">Check environment variables -- are credentials actually set?</div>
    <div class="ix-debug-cmd">echo $LINEAR_API_KEY</div>
  </div>
</div>
```

**CSS** (from v2 `.debug-step` pattern):
```css
.ix-debug-steps { padding: 0 20px 20px; display: flex; flex-direction: column; gap: 6px; }
.ix-debug-step {
  padding: 12px 16px;
  border-radius: 10px;
  background: var(--raised);
  border: 1px solid var(--border);
  display: flex; gap: 12px; align-items: flex-start;
}
.ix-debug-num {
  font-size: 12px; font-weight: 700;
  font-family: 'JetBrains Mono', monospace;
  min-width: 22px; height: 22px;
  border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; margin-top: 1px;
  background: rgba(6,182,212,0.1);
  color: var(--accent);
}
.ix-debug-text { font-size: 13px; color: var(--muted); line-height: 1.4; margin-bottom: 4px; }
.ix-debug-cmd {
  font-size: 11px;
  font-family: 'JetBrains Mono', monospace;
  color: var(--dim);
  background: var(--bg);
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
}
```

**JS**: `initDebugSteps(el)` -- reads steps, auto-numbers them, wraps in num+content structure.

---

## Per-Module Transformation Plan

### Module 02: Claude Code Foundations (PRIMARY -- we have 5 v2 reference files)

Module 02 has the most direct mapping: each v2 file corresponds to a section. The plan is to replace current markdown content with component-driven equivalents that reproduce the v2 designs.

#### Section 2.1: Two Modes of Claude Code (Reference: `m02-modes-v2.html`)

**Current state**: decision-tree component + prose
**Transform to**:

| # | Component | Content Source | Replaces |
|---|-----------|---------------|----------|
| 1 | `objective` | "Choose the right invocation mode for any task..." | Overview prose |
| 2 | `tabbed-panel` (existing) | Interactive vs Non-interactive with detail grids, use-case lists, code blocks | Current decision-tree + prose blocks L174-208 |
| 3 | `reveal-quiz` (NEW) | 7 scenarios from v2 (PR review -> noninteractive, debug flaky test -> interactive, etc.) | Nothing (NEW content) |

**Content kept**: Minimal connecting prose (2-3 sentences between components)
**Content removed**: L174-184 bullet list (folded into tab panels), L186-208 code blocks (folded into tab panels)

#### Section 2.2: CLAUDE.md (References: `m02-claudemd-v2.html` + `claude-md-evolution.html`)

**Current state**: step-walkthrough + agent-trace + massive prose walls (L395-496)
**Transform to**:

| # | Component | Content Source | Replaces |
|---|-----------|---------------|----------|
| 1 | `objective` | "Write effective CLAUDE.md content..." | Overview prose |
| 2 | `entry-list` (NEW, tabbed) | What Belongs (5 include entries) / What Doesn't (5 exclude entries) via tabs | L395-496 prose walls (73 + 22 lines) |
| 3 | `callout` variant `merge-note` | "The litmus test: Could an agent use this entry to make a concrete, binary decision?" | Nothing (NEW) |
| 4 | `hierarchy` (NEW) | 4-level CLAUDE.md file hierarchy with paths and descriptions | Current step-walkthrough L293 (REPLACED with richer version) |
| 5 | `timeline` (NEW) | CLAUDE.md evolution from Day 1 (~8 lines) to Month 2 (~55 lines) | Nothing (NEW -- from claude-md-evolution.html) |
| 6 | existing `agent-trace` | How CLAUDE.md shapes agent decisions (keep L508 trace) | Keep as-is |

**Content removed**: L395-468 code blocks (replaced by entry-list), L474-496 "What Does Not Belong" prose (replaced by entry-list exclude tab), L482-496 "Writing Good CLAUDE.md" (merged into callout)

#### Section 2.3: Permissions (Reference: `m02-permissions-v2.html`)

**Current state**: decision-tree + agent-trace + 120 lines of JSON prose
**Transform to**:

| # | Component | Content Source | Replaces |
|---|-----------|---------------|----------|
| 1 | `objective` | "Configure allow/deny permissions so the agent can work autonomously within safe boundaries." | Overview prose |
| 2 | `callout` variant `core-idea` | 3-state flow summary (allow -> execute, deny -> blocked, neither -> ask) | Brief new content (from v2 flow-summary) |
| 3 | `tabbed-panel` (existing) | Left tab: example settings.json with syntax highlighting. Right tab: permission test | L620-740 JSON prose (120 lines REPLACED) |
| 4 | `reveal-quiz` variant `permission` (NEW) | 10 actions to test (Read src/auth.ts, Write config/prod.ts, Bash rm -rf, etc.) with allow/deny/ask answers | Nothing (NEW -- from v2 permission test) |
| 5 | `callout` variant `tip` | Key principles (least privilege, approval as signal, two layers stack) | Current prose |

**Content removed**: L620-740 JSON walls, L568-575 intro prose (replaced by objective)

#### Section 2.4: MCP Servers (Reference: `m02-mcp-v2.html`)

**Current state**: tabbed-panel + agent-trace + 88 lines of config prose
**Transform to**:

| # | Component | Content Source | Replaces |
|---|-----------|---------------|----------|
| 1 | `objective` | "Understand MCP as the way to give Claude Code access to external tools..." | Overview prose |
| 2 | `callout` variant `core-idea` | "Without MCP, Claude Code can only read files and run bash. With MCP..." | L792-810 prose (18 lines) |
| 3 | `tabbed-panel` (existing, enhanced) | stdio vs Streamable HTTP transport cards with config examples | Current tabbed-panel (ENHANCED with v2 transport-grid styling) |
| 4 | `debug-steps` (NEW) | 3-step debug sequence: test command manually, check env vars, verify tools | Nothing (NEW -- from v2 debug-steps) |
| 5 | `callout` variant `tip` | MCP permission note (mcp__server__tool pattern) | L850-938 config prose (88 lines REPLACED) |

**Content removed**: L850-938 JSON config blocks (replaced by transport card details), L792-810 intro prose

#### Section 2.5: Reading Agent Output (Reference: `m02-output-v2.html`)

**Current state**: click-cards with brief detail panels
**Transform to**:

| # | Component | Content Source | Replaces |
|---|-----------|---------------|----------|
| 1 | `objective` | "Read agent output efficiently across its three layers..." | Brief intro |
| 2 | `click-cards` (existing, enhanced) | 3-layer selector (Thinking / Tool calls / Response) with terminal examples + takeaway cards | Current click-cards (ENHANCED with v2's richer detail panels) |
| 3 | `intervention` (NEW) | Intervene vs Hold decision cards (4 items) | Nothing (NEW -- from v2 int-grid) |
| 4 | `callout` variant `approval` | "For high-stakes tasks, use the approval pattern" with prompt example | Nothing (NEW -- from v2 approval-box) |

#### Module 02 Component Counts

| Component Type | Count | New/Existing |
|---|---|---|
| `objective` | 5 | NEW |
| `callout` | 7 | NEW |
| `entry-list` | 1 (tabbed with 2 views) | NEW |
| `hierarchy` | 1 | NEW |
| `timeline` | 1 | NEW |
| `reveal-quiz` | 2 (mode + permission) | NEW |
| `intervention` | 1 | NEW |
| `debug-steps` | 1 | NEW |
| `tabbed-panel` (existing) | 3 | ENHANCED |
| `click-cards` (existing) | 2 | ENHANCED |
| `agent-trace` (existing) | 2 | KEPT |
| `predict-reveal` (existing) | 1 | ADD |
| `quiz` (existing) | 2 | ADD |
| **Total** | **29** | +19 new, 10 existing |

---

### Module 01: The Paradigm Shift (Apply v2 patterns)

Module 01 does not have dedicated v2 files, but its content maps directly to two standalone examples (`era-diagram.html`, `collaboration-model.html`, `disorientation-sim.html`). Apply the same v2 patterns for consistency.

#### Section 1.1: Three Eras (Reference: `era-diagram.html`)

| # | Component | Content | Replaces |
|---|-----------|---------|----------|
| 1 | `objective` | "Distinguish agentic AI from autocomplete and assistant paradigms..." | L6-21 overview prose |
| 2 | `predict-reveal` (existing) | Already present | Keep |
| 3 | `tabbed-panel` (existing, enhance) | Already present -- enhance with v2's characteristic grids, cost bars, example boxes | Current tabbed-panel |
| 4 | `quiz` (existing) | Already has 3 questions | Keep |

#### Section 1.2: The PRAO Loop

| # | Component | Content | Replaces |
|---|-----------|---------|----------|
| 1 | `objective` | "Articulate the PRAO loop with concrete examples..." | Section intro |
| 2 | `click-cards` (existing) | Keep PRAO phase cards | Keep |
| 3 | `agent-trace` (existing) | Keep refactoring trace | Keep |
| 4 | `step-walkthrough` (existing) | Keep worked example | Keep |
| 5 | `callout` variant `core-idea` | Fold L340-354 prose into a callout | L340-354 (15 lines) |

#### Section 1.3: What Claude Code Actually Is

| # | Component | Content | Replaces |
|---|-----------|---------|----------|
| 1 | `objective` | "Understand Claude Code's architecture and context model" | Section intro |
| 2 | `click-cards` (existing) | Session vs persistent context | Keep |
| 3 | `agent-trace` (existing) | Context example trace | Keep |
| 4 | `callout` variant `core-idea` | Fold L514-534 prose into callout (3 paragraphs -> 1 callout) | L514-534 (20 lines) |

**DELETE**: L646-658 bullet lists (duplicate of click-cards content)

#### Section 1.4: The Collaboration Model (References: `collaboration-model.html` + `disorientation-sim.html`)

| # | Component | Content | Replaces |
|---|-----------|---------|----------|
| 1 | `objective` | "Recognize collaboration failure modes and adopt the productive pattern" | Section intro |
| 2 | `predict-reveal` | "Before seeing the failure modes, write what you think the #1 mistake is" | L661-664 prose |
| 3 | `click-cards` (existing, enhance) | Failure modes + productive pattern -- enhance with capability utilization bars from v2 | Current click-cards |
| 4 | `scenario-quiz` (NEW) | Disorientation simulator: 4 terminal scenarios from v2 | Nothing (NEW) |

#### Section 1.5: Task Suitability

| # | Component | Content | Replaces |
|---|-----------|---------|----------|
| 1 | `objective` | "Identify which tasks are well-suited to agentic AI" | Section intro |
| 2 | `tabbed-panel` | Strong Fit / Weak Fit / Edge Cases (convert L881-910 prose) | L881-910 (30 lines) |
| 3 | `click-cards` (existing) | Task suitability quadrant | Keep |
| 4 | `agent-trace` (existing) | Task suitability trace | Keep |
| 5 | `quiz` (existing) | Keep section quiz | Keep |

#### End Sections

| # | Component | Content | Replaces |
|---|-----------|---------|----------|
| 1 | `callout` variant `key-concept` | Best practices as accordion-style callouts (3 cards) | L1015-1036 (21 lines) |
| 2 | `callout` variant `tip` | Lab connection CTA | L1053-1056 |

#### Module 01 Component Counts

| Component Type | Count | New/Existing |
|---|---|---|
| `objective` | 5 | NEW |
| `callout` | 5 | NEW |
| `scenario-quiz` | 1 | NEW |
| `predict-reveal` (existing) | 2 | 1 existing + 1 ADD |
| `tabbed-panel` (existing) | 2 | ENHANCED |
| `click-cards` (existing) | 4 | ENHANCED |
| `agent-trace` (existing) | 3 | KEPT |
| `step-walkthrough` (existing) | 1 | KEPT |
| `quiz` (existing) | 3 | KEPT |
| **Total** | **26** | +11 new, 15 existing |

---

### Module 03: Agent Thinking (Apply v2 patterns)

Module 03's content is inherently about observation and pattern recognition. The v2 patterns (especially scenario-quiz and intervention) are a natural fit.

#### Section 3.1: The Transparency Advantage (Reference: `m02-output-v2.html` patterns)

| # | Component | Content | Replaces |
|---|-----------|---------|----------|
| 1 | `objective` | "Read and interpret a Claude Code reasoning trace..." | L24-27 intro |
| 2 | `predict-reveal` (existing) | Already present | Keep |
| 3 | `click-cards` (existing, enhance) | 3 output layers -- enhance with v2's terminal examples + takeaway cards | Current click-cards |

**DELETE**: L140-153 post-diagram prose (pure duplication of click-card content)

#### Section 3.2: Chain of Thought / PRAO State Machine

| # | Component | Content | Replaces |
|---|-----------|---------|----------|
| 1 | `objective` | "Map each step in a tool call sequence to its PRAO phase" | Section intro |
| 2 | `tabbed-panel` (existing) | PRAO state machine tabs | Keep |
| 3 | `agent-trace` (existing) | Trace reading example | Keep |
| 4 | `reveal-quiz` (NEW) | "Identify the PRAO phase" -- 6-8 tool call lines, student labels each | Nothing (NEW) |

#### Section 3.3: Tool Call Patterns

| # | Component | Content | Replaces |
|---|-----------|---------|----------|
| 1 | `objective` | "Recognize common tool call patterns that signal different agent behaviors" | Section intro |
| 2 | `click-cards` (existing) | Tool call pattern cards | Keep |
| 3 | `agent-trace` (existing) | Pattern examples trace | Keep |
| 4 | `scenario-quiz` (NEW) | Pattern recognition: show 4 terminal replays, student identifies pattern (scout/focused-edit/iterative-debug/loop) | L450-520 (70 lines of prose REPLACED) |

#### Section 3.4: Clarification Requests

| # | Component | Content | Replaces |
|---|-----------|---------|----------|
| 1 | `objective` | "Distinguish situations requiring intervention from those where the agent should continue" | Section intro |
| 2 | `decision-tree` (existing) | Clarification decision flow | Keep |
| 3 | `reveal-quiz` (NEW) | 4-5 clarification questions -- student categorizes (Scope/Authority/Context) and decides action | L660-782 prose (122 lines REPLACED) |
| 4 | `intervention` (NEW) | Intervene vs Hold decision guide (adapted from m02-output-v2 pattern) | L690-698 prose |

#### Section 3.5: Extended Thinking

| # | Component | Content | Replaces |
|---|-----------|---------|----------|
| 1 | `objective` | "Understand what extended thinking provides and when it's valuable" | Section intro |
| 2 | `tabbed-panel` (existing) | Thinking depth tabs | Keep |
| 3 | `callout` variant `core-idea` | When to use extended thinking (fold L870-903 prose) | L870-903 (33 lines) |

#### Section 3.6: Putting It Together

| # | Component | Content | Replaces |
|---|-----------|---------|----------|
| 1 | `agent-trace` (existing) | Complete trace example | Keep |
| 2 | `step-walkthrough` (existing) | Bug fix trace walkthrough | Keep |
| 3 | `scenario-quiz` (NEW) | "Should I intervene?" simulator -- 3-4 decision points during trace playback | L904-1106 connecting prose (trim to 30 lines max) |

#### End Sections

| # | Component | Content | Replaces |
|---|-----------|---------|----------|
| 1 | `callout` variant `key-concept` | Best practices accordion callouts | L1107-1141 (34 lines) |
| 2 | `quiz` | Module-end knowledge check (5 questions) | Nothing (NEW) |

#### Module 03 Component Counts

| Component Type | Count | New/Existing |
|---|---|---|
| `objective` | 6 | NEW |
| `callout` | 3 | NEW |
| `scenario-quiz` | 2 | NEW |
| `reveal-quiz` | 2 | NEW |
| `intervention` | 1 | NEW |
| `predict-reveal` (existing) | 1 | KEPT |
| `tabbed-panel` (existing) | 2 | KEPT |
| `click-cards` (existing) | 2 | ENHANCED |
| `agent-trace` (existing) | 3 | KEPT |
| `decision-tree` (existing) | 1 | KEPT |
| `step-walkthrough` (existing) | 1 | KEPT |
| `quiz` (existing) | 1 | ADD |
| **Total** | **25** | +14 new, 11 existing |

---

## Phase Breakdown

### Phase 1: Infrastructure (module-viewer.html)

Add 9 new component types to the component registry. Each needs: CSS rules, `init*()` function, registration in the `hydrateInteractiveDiagrams` switch statement.

| Task | Component | Complexity | Estimated Lines |
|---|---|---|---|
| 1.1 | `objective` | Low | ~30 CSS, ~15 JS |
| 1.2 | `callout` | Low | ~40 CSS, ~20 JS |
| 1.3 | `entry-list` | Medium | ~60 CSS, ~40 JS |
| 1.4 | `hierarchy` | Medium | ~50 CSS, ~30 JS |
| 1.5 | `timeline` | High | ~70 CSS, ~80 JS |
| 1.6 | `scenario-quiz` | High | ~90 CSS, ~150 JS |
| 1.7 | `reveal-quiz` | Medium | ~60 CSS, ~60 JS |
| 1.8 | `intervention` | Low | ~40 CSS, ~20 JS |
| 1.9 | `debug-steps` | Low | ~40 CSS, ~25 JS |
| **Total** | | | **~480 CSS, ~440 JS** |

**Dependency**: All Phase 2+ work depends on Phase 1 completion.

### Phase 2: Module 02 -- Claude Code Foundations (5 v2 reference files)

Module 02 comes first because we have direct v2 references for every section. This is the highest-confidence transformation.

| Task | Section | Changes |
|---|---|---|
| 2.1 | Section 2.1 Modes | Replace decision-tree with enhanced tabbed-panel + add reveal-quiz |
| 2.2 | Section 2.2 CLAUDE.md | Replace prose walls with entry-list + hierarchy + timeline + callouts |
| 2.3 | Section 2.3 Permissions | Replace JSON walls with tabbed config + reveal-quiz (permission variant) |
| 2.4 | Section 2.4 MCP | Enhance tabbed-panel + add debug-steps + callouts |
| 2.5 | Section 2.5 Output | Enhance click-cards + add intervention + approval callout |
| 2.6 | Add objectives | Add `objective` to all 5 sections |
| 2.7 | Add quizzes | Add 2 `quiz` components (mid-module + end-module) |
| 2.8 | Add predict-reveal | Add 1 predict-reveal before CLAUDE.md hierarchy |
| 2.9 | Delete prose | Remove ~300 lines of redundant prose walls |

### Phase 3: Module 01 -- The Paradigm Shift

| Task | Section | Changes |
|---|---|---|
| 3.1 | Section 1.1 Eras | Enhance tabbed-panel with v2 characteristic grids + cost bars |
| 3.2 | Section 1.2 PRAO | Add objective + core-idea callout |
| 3.3 | Section 1.3 Architecture | Add objective + callout, DELETE duplicate prose |
| 3.4 | Section 1.4 Collaboration | Enhance click-cards with capability bars + add scenario-quiz (disorientation sim) |
| 3.5 | Section 1.5 Task Suitability | Convert prose to tabbed-panel + add objective |
| 3.6 | End sections | Convert best practices to callouts |
| 3.7 | Add objectives | Add `objective` to all 5 sections |
| 3.8 | Delete prose | Remove ~80 lines of duplicate/redundant prose |

### Phase 4: Module 03 -- Agent Thinking

| Task | Section | Changes |
|---|---|---|
| 4.1 | Section 3.1 Transparency | Enhance click-cards, DELETE duplicate prose |
| 4.2 | Section 3.2 PRAO phases | Add reveal-quiz (PRAO phase identifier) |
| 4.3 | Section 3.3 Tool patterns | Add scenario-quiz, REPLACE 70 lines of pattern prose |
| 4.4 | Section 3.4 Clarification | Add reveal-quiz + intervention, REPLACE 122 lines of prose |
| 4.5 | Section 3.5 Extended thinking | Add callout, fold 33 lines of prose |
| 4.6 | Section 3.6 Putting it together | Add scenario-quiz (intervention simulator), trim prose |
| 4.7 | Add objectives | Add `objective` to all 6 sections |
| 4.8 | Add end-module quiz | Add 5-question knowledge check |
| 4.9 | Delete prose | Remove ~225 lines of redundant/duplicate prose |

### Phase 5: Polish and Cross-Cutting

| Task | What |
|---|---|
| 5.1 | Verify all component initializations work (browser test) |
| 5.2 | Ensure consistent spacing/padding across all 9 new component types |
| 5.3 | Mobile responsiveness check for all new components |
| 5.4 | Verify Lucide icon rendering in new components |
| 5.5 | Deploy and verify on Vercel |

---

## Summary

### Component Counts per Module

| Module | Existing (kept/enhanced) | New Components | Total | Prose Lines Removed |
|---|---|---|---|---|
| 01 - Paradigm Shift | 15 | 11 | **26** | ~80 |
| 02 - Claude Code Foundations | 10 | 19 | **29** | ~300 |
| 03 - Agent Thinking | 11 | 14 | **25** | ~225 |
| **Totals** | **36** | **44** | **80** | **~605** |

### New Component Types (9 total)

| # | Component | Instances Across All Modules | Complexity |
|---|---|---|---|
| 1 | `objective` | 16 | Low |
| 2 | `callout` | 15 | Low |
| 3 | `entry-list` | 1 | Medium |
| 4 | `hierarchy` | 1 | Medium |
| 5 | `timeline` | 1 | High |
| 6 | `scenario-quiz` | 3 | High |
| 7 | `reveal-quiz` | 4 | Medium |
| 8 | `intervention` | 2 | Low |
| 9 | `debug-steps` | 1 | Low |
| **Total** | | **44** | |

### Phase Sequence

| Phase | Scope | Dependency | Estimated Size |
|---|---|---|---|
| 1. Infrastructure | module-viewer.html (9 new components) | None | ~920 lines (CSS+JS) |
| 2. Module 02 | 5 sections, 29 components, v2 reference available | Phase 1 | ~500 lines of markdown changes |
| 3. Module 01 | 5 sections, 26 components | Phase 1 | ~400 lines of markdown changes |
| 4. Module 03 | 6 sections, 25 components | Phase 1 | ~450 lines of markdown changes |
| 5. Polish | Cross-cutting QA | Phases 1-4 | Testing only |

### Key Advantages of v4 over v3

1. **Reference-driven**: Every design decision traces to an existing v2 example file, not invented from scratch
2. **Higher component count**: 80 total components (v3 planned ~45)
3. **More prose removed**: ~605 lines of walls of text eliminated (v3 planned ~200)
4. **New interaction patterns**: scenario-quiz and reveal-quiz bring the disorientation-sim learning pattern into all 3 modules
5. **Consistent visual language**: All 9 new component types derive from the same v2 design system (DM Sans + JetBrains Mono, dark surface palette, 12px rounded corners, subtle borders)
6. **Module 02 first**: Highest confidence start because every section has a direct v2 reference file

### Expected Score Impact

| Module | Before | After | Key Improvements |
|---|---|---|---|
| 01 | 4/10 | 8.5/10 | +scenario-quiz, +objectives, +enhanced click-cards with capability bars, +prose reduction |
| 02 | 3.5/10 | 9/10 | +entry-list, +hierarchy, +timeline, +reveal-quizzes, +debug-steps, massive prose wall elimination |
| 03 | 4.5/10 | 9/10 | +scenario-quizzes (2), +reveal-quizzes (2), +intervention, +prose wall elimination |
