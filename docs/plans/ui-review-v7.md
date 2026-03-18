# UI/UX Review v7 -- Modules 01-03 + Module Viewer

**Reviewer**: LibreUIUX Orchestrator (Seven Pillars Framework)
**Date**: 2026-03-17
**Scope**: `module-viewer.html` CSS/JS, Modules 01-03 markdown, comparison against v2 example files
**Output format**: Mechanically executable issue list

---

## Summary

| Priority | Count | Description |
|----------|-------|-------------|
| P0 Critical | 8 | Accessibility failures, contrast violations, missing ARIA |
| P1 Important | 19 | Visual hierarchy gaps, spacing inconsistencies, v2 parity gaps |
| P2 Nice-to-have | 14 | Polish, animation refinements, minor visual tweaks |
| **Total** | **41** | |

---

## Top 10 Highest-Impact Fixes

1. **P0-01**: H2 section titles too small (20px) -- bump to 24px with gradient text treatment
2. **P0-03**: Body paragraph text uses `var(--muted)` (#94a3b8) on dark bg -- contrast ratio 4.6:1, barely AA for body text. Increase to `var(--text)` for primary prose
3. **P0-05**: No focus-visible indicators on click-cards, tree-nodes, or tab buttons
4. **P0-06**: Quiz option 2x2 grid has no keyboard navigation (arrow keys)
5. **P1-01**: Prose paragraphs between interactive components have no top margin separation -- they run into the component above
6. **P1-02**: `.ix-instruct` text too dim (`var(--dim)` = #475569) -- fails 3:1 contrast against dark background
7. **P1-03**: Callout variants lack icon differentiation -- rely on border-left color alone
8. **P1-06**: Click-card detail panel has no prev/next keyboard navigation
9. **P1-09**: Section card padding (24px) is tighter than v2 examples (16px-18px padding on individual entries inside)
10. **P1-12**: Agent trace terminal background (#04080f) too close to page background (#080d1a) -- insufficient figure/ground separation

---

## Module Viewer CSS Fixes

### Headers (H2 Section Titles)

```
ISSUE: H2 font-size too small relative to content density
COMPONENT: .markdown-body h2
CURRENT: font-size: 20px; font-weight: 700; margin: 0 0 16px; padding-bottom: 10px; border-bottom: 1px solid var(--border); color: var(--text)
TARGET: font-size: 24px; font-weight: 800; margin: 48px 0 20px; padding-bottom: 12px; border-bottom: 1px solid var(--border); background: linear-gradient(135deg, var(--text), var(--muted)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text
FILE: module-viewer.html (line ~137)
PRIORITY: P0
```

```
ISSUE: H2 top margin is 0 -- sections blend together without visual separation
COMPONENT: .markdown-body h2
CURRENT: margin: 0 0 16px
TARGET: margin: 48px 0 20px (first h2 inside section-body can override to 0)
FILE: module-viewer.html (line ~138)
PRIORITY: P1
```

```
ISSUE: H3 font-size barely distinguishable from body text
COMPONENT: .markdown-body h3
CURRENT: font-size: 17px; font-weight: 600; margin: 28px 0 10px
TARGET: font-size: 18px; font-weight: 700; margin: 32px 0 12px; letter-spacing: -0.01em
FILE: module-viewer.html (line ~143)
PRIORITY: P2
```

### Prose Paragraphs

```
ISSUE: Body paragraph color too dim for primary reading content
COMPONENT: .markdown-body p
CURRENT: color: var(--muted) [#94a3b8]
TARGET: color: #cbd5e1 (slate-300 equivalent, contrast ratio ~8:1 against #080d1a)
FILE: module-viewer.html (line ~152)
PRIORITY: P0
```

```
ISSUE: Paragraphs immediately above interactive components lack bottom spacing
COMPONENT: .markdown-body p (when followed by .ix-diagram)
CURRENT: margin-bottom: 16px
TARGET: margin-bottom: 24px (add rule: .markdown-body p + .ix-diagram { margin-top: 8px; })
FILE: module-viewer.html (add new rule after line ~153)
PRIORITY: P1
```

```
ISSUE: Paragraphs immediately below interactive components lack top spacing
COMPONENT: .ix-diagram + p (in markdown flow)
CURRENT: no specific rule
TARGET: Add rule: .markdown-body .ix-diagram + p { margin-top: 24px; }
FILE: module-viewer.html (add new rule)
PRIORITY: P1
```

### Instruction Text (.ix-instruct)

```
ISSUE: Instruction text too dim -- fails contrast on dark backgrounds
COMPONENT: .ix-instruct
CURRENT: font-size: 12px; color: var(--dim) [#475569]; font-style: italic
TARGET: font-size: 13px; color: var(--muted) [#94a3b8]; font-style: italic; padding: 0 20px; margin-bottom: 12px
FILE: module-viewer.html (line ~806)
PRIORITY: P1
```

```
ISSUE: Instruction text play triangle is decorative but announced by screen readers
COMPONENT: .ix-instruct::before
CURRENT: content: '\25B6\00a0'
TARGET: content: '\25B6\00a0'; speak: never (or wrap the triangle in an aria-hidden span in JS hydration)
FILE: module-viewer.html (line ~813)
PRIORITY: P1
```

### Learning Objectives (.ix-objective)

```
ISSUE: Objective box left margin (18px) inconsistent with callout left margin (20px)
COMPONENT: .ix-objective
CURRENT: margin: 0 18px 16px
TARGET: margin: 0 20px 20px (match callout margin)
FILE: module-viewer.html (line ~1487)
PRIORITY: P2
```

```
ISSUE: Objective label uses var(--accent) but objective border uses a different blue tint -- inconsistent
COMPONENT: .ix-objective
CURRENT: border-left: 3px solid rgba(91,164,245,0.5); background: rgba(91,164,245,0.08)
TARGET: border-left: 3px solid rgba(6,182,212,0.5); background: rgba(6,182,212,0.08) (align with var(--accent) = #06b6d4)
FILE: module-viewer.html (line ~1484-1486)
PRIORITY: P2
```

### Callouts (.ix-callout Variants)

```
ISSUE: Callout variants only differentiated by border-left color -- too subtle for colorblind users
COMPONENT: .ix-callout[data-variant]
CURRENT: border-left: 3px solid [color]; same background tint pattern
TARGET: Add a distinct icon before the label text in JS hydration (e.g., core-idea gets lightbulb, tip gets check-circle, warning gets alert-triangle, key-concept gets key, definition gets book-open). Apply via Lucide icons in initCallout().
FILE: module-viewer.html (JS: initCallout function)
PRIORITY: P1
```

```
ISSUE: Callout bottom margin (20px) creates tight spacing when followed by another callout
COMPONENT: .ix-callout
CURRENT: margin: 0 20px 20px
TARGET: margin: 0 20px 16px (reduce slightly, but add: .ix-callout + .ix-callout { margin-top: 0; })
FILE: module-viewer.html (line ~1510)
PRIORITY: P2
```

### Click-Cards / Tabbed Panels

```
ISSUE: Click-card grid gap too tight -- cards feel cramped
COMPONENT: .ix-card-grid
CURRENT: gap: 8px; padding: 16px 20px
TARGET: gap: 10px; padding: 16px 20px
FILE: module-viewer.html (line ~876-877)
PRIORITY: P2
```

```
ISSUE: Active click-card lacks distinct background tint (only border changes)
COMPONENT: .ix-card.active
CURRENT: transform: translateY(-2px) [no background change]
TARGET: transform: translateY(-2px); background: rgba(99,102,241,0.06) [for phase-less cards]; phase-specific cards already handled
FILE: module-viewer.html (line ~896-898)
PRIORITY: P1
```

```
ISSUE: Click-cards not keyboard navigable -- no tabindex, no arrow key support
COMPONENT: .ix-card
CURRENT: no tabindex attribute, no keydown handler
TARGET: Add tabindex="0" to each card, role="tab" to card grid (role="tablist"), role="tabpanel" to detail panels. Add arrow key navigation in initClickCards(). Add focus-visible ring: .ix-card:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; }
FILE: module-viewer.html (JS: initClickCards function + CSS addition)
PRIORITY: P0
```

```
ISSUE: Detail panel has no close/collapse mechanism or prev/next navigation
COMPONENT: .ix-detail-panel
CURRENT: Panel shows when card clicked, no navigation controls
TARGET: Add prev/next buttons below detail panel (same pattern as step-walkthrough nav). Allow clicking active card again to collapse panel.
FILE: module-viewer.html (JS: initClickCards function)
PRIORITY: P1
```

```
ISSUE: Tab button active state lacks visible accent line (after pseudo-element has no background set)
COMPONENT: .ix-tab-btn.active::after
CURRENT: width: 40px; height: 2px; border-radius: 1px; [no background color]
TARGET: background: var(--primary) [or use the tab's data-accent attribute]
FILE: module-viewer.html (line ~849-858)
PRIORITY: P1
```

### Agent Traces

```
ISSUE: Trace container background (#04080f) nearly identical to page background (#080d1a) -- no visual separation
COMPONENT: .ix-trace-container
CURRENT: background: #04080f
TARGET: background: #0a0f1e; border: 1px solid var(--border) [add border since container uses border-radius: 0 0 var(--radius) var(--radius)]
FILE: module-viewer.html (line ~2448-2451)
PRIORITY: P1
```

```
ISSUE: Trace type tags too small (10px) to read comfortably
COMPONENT: .ix-trace-tag
CURRENT: font-size: 10px; padding: 2px 8px
TARGET: font-size: 11px; padding: 3px 8px
FILE: module-viewer.html (line ~2479-2482)
PRIORITY: P2
```

```
ISSUE: Speed control buttons lack aria-label explaining what speed they represent
COMPONENT: .ix-trace-speed-btn
CURRENT: no aria-label
TARGET: Add aria-label="Playback speed [value]" to each speed button. Add role="radiogroup" to .ix-trace-speed and role="radio" + aria-checked to each button.
FILE: module-viewer.html (JS: initAgentTrace function)
PRIORITY: P1
```

```
ISSUE: Trace split panel annotation sidebar too narrow on tablet (280px fixed)
COMPONENT: .ix-trace-split
CURRENT: grid-template-columns: 1fr 280px
TARGET: grid-template-columns: 1fr minmax(200px, 280px)
FILE: module-viewer.html (line ~2607)
PRIORITY: P2
```

### Quizzes

```
ISSUE: Quiz 2x2 grid options not keyboard navigable
COMPONENT: .ix-quiz-option
CURRENT: button elements but no keyboard group navigation
TARGET: Add role="radiogroup" to .ix-quiz-options, role="radio" to each option. Arrow keys move selection, Enter/Space confirms.
FILE: module-viewer.html (JS: initQuiz function)
PRIORITY: P0
```

```
ISSUE: Quiz correct/incorrect feedback relies on color alone (green/red) -- colorblind inaccessible
COMPONENT: .ix-quiz-option.is-correct, .ix-quiz-option.is-wrong
CURRENT: Only border-color and background-color change
TARGET: Add check-circle icon (Lucide) to correct answers and x-circle icon to wrong answers via JS after selection
FILE: module-viewer.html (JS: initQuiz function)
PRIORITY: P0
```

```
ISSUE: Quiz explanation panel border-left color (var(--primary)) same as correct answer border -- confusing
COMPONENT: .ix-quiz-explanation
CURRENT: border-left: 3px solid var(--primary); background: rgba(99,102,241,0.08)
TARGET: border-left: 3px solid var(--accent); background: rgba(6,182,212,0.06) [differentiate from answer feedback]
FILE: module-viewer.html (line ~503-505)
PRIORITY: P2
```

### Collapsed Details

```
ISSUE: Details disclosure triangle (Unicode char) too small and not obviously interactive
COMPONENT: .section-body details summary::before
CURRENT: content: '\25B8'; font-size: 12px; color: var(--dim)
TARGET: content: '\25B8'; font-size: 14px; color: var(--muted); transition: transform 0.2s, color 0.2s
FILE: module-viewer.html (line ~251-253)
PRIORITY: P2
```

```
ISSUE: Details open/close has no animation on content reveal
COMPONENT: .section-body details > div, details > p
CURRENT: No animation
TARGET: Add: details[open] > *:not(summary) { animation: ixFadeUp 0.25s ease; }
FILE: module-viewer.html (add new rule after line ~273)
PRIORITY: P2
```

---

## Accessibility Issues (P0)

```
ISSUE: No focus-visible indicators on interactive diagram elements
COMPONENT: .ix-card, .ix-tree-node, .ix-timeline-stage, .ix-h-level, .ix-pattern-card, .ix-rq-item, .ix-sq-choice
CURRENT: No :focus-visible styles (some have :hover only)
TARGET: Add global rule: .ix-card:focus-visible, .ix-tree-node:focus-visible, .ix-timeline-stage:focus-visible, .ix-h-level:focus-visible, .ix-pattern-card:focus-visible, .ix-rq-item:focus-visible, .ix-sq-choice:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; }
FILE: module-viewer.html (add after line ~2430)
PRIORITY: P0
```

```
ISSUE: prefers-reduced-motion only covers some animations -- missing ixFadeUp, slideUp, card hover transforms
COMPONENT: @media (prefers-reduced-motion: reduce)
CURRENT: Covers ix-sq-term-line, ix-sq-cursor, ix-sq-feedback, ix-timeline-detail, ix-hero-dot, ix-hero-scroll, ix-pattern-detail, ix-trace-row, ix-trace-note
TARGET: Add: .ix-tab-panel, .ix-detail-panel, .ix-walk-step, .ix-sq-feedback, .module-complete-banner, .milestone-toast { animation: none !important; } .ix-card:hover, .ix-pattern-card:hover, .ix-sq-choice:hover { transform: none !important; }
FILE: module-viewer.html (append to existing @media block at line ~2423)
PRIORITY: P0
```

```
ISSUE: Reading progress bar lacks aria attributes
COMPONENT: .reading-progress (#reading-progress)
CURRENT: <div class="reading-progress" id="reading-progress"></div>
TARGET: <div class="reading-progress" id="reading-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-label="Reading progress"></div>
FILE: module-viewer.html (line ~2808)
PRIORITY: P1
```

```
ISSUE: Nav progress and XP indicators not announced as live regions
COMPONENT: #nav-progress, #nav-xp
CURRENT: no aria-live
TARGET: Add aria-live="polite" to both elements
FILE: module-viewer.html (line ~2814-2815)
PRIORITY: P1
```

---

## V2 Example Gap Analysis

### Gap 1: Typography Weight and Warmth

```
ISSUE: V2 examples use DM Sans (warmer, friendlier) while module viewer uses Inter -- not an issue per se, but the v2 examples have heavier visual presence in headers due to darker backgrounds
COMPONENT: h1 equivalent in v2 vs .ix-title in viewer
CURRENT: .ix-title uses font-size: 13px; font-weight: 500; color: var(--dim) [#475569]
TARGET: .ix-title: font-size: 13px; font-weight: 600; color: var(--muted) [#94a3b8] -- increase weight and brightness to match v2 header presence
FILE: module-viewer.html (line ~796-800)
PRIORITY: P1
```

### Gap 2: Entry/Badge Card Spacing

```
ISSUE: V2 entry cards (m02-claudemd-v2.html) use padding: 16px 18px with margin-bottom: 10px. Module viewer uses padding: 12px 14px with margin-bottom: 8px -- tighter than v2
COMPONENT: .ix-entry
CURRENT: padding: 12px 14px; margin-bottom: 8px
TARGET: padding: 14px 18px; margin-bottom: 10px
FILE: module-viewer.html (line ~1564-1568)
PRIORITY: P1
```

### Gap 3: Objective Box Styling

```
ISSUE: V2 objective uses distinct blue tint (#0a1525 bg, #1a3a6a border) while module viewer uses lighter tint. V2 text color is #8ab8e8 (blue-tinted body text) vs viewer's var(--muted)
COMPONENT: .ix-objective
CURRENT: background: rgba(91,164,245,0.08); border: 1px solid rgba(6,182,212,0.2)
TARGET: background: rgba(6,182,212,0.06); border: 1px solid rgba(6,182,212,0.2); .ix-objective-text color: #8ab8e8 (match v2 blue-tinted text within objectives)
FILE: module-viewer.html (line ~1482-1501)
PRIORITY: P1
```

### Gap 4: Tab Active State Accent Line

```
ISSUE: V2 tabs have colored underline on active tab (green/red/blue per tab). Module viewer tabs have empty ::after pseudo-element with no background color
COMPONENT: .ix-tab-btn.active::after
CURRENT: No background property set
TARGET: background: var(--_accent, var(--primary)) -- use CSS custom property set per tab via data-accent attribute
FILE: module-viewer.html (line ~849-858)
PRIORITY: P1
```

### Gap 5: Hierarchy Dot Colors

```
ISSUE: V2 hierarchy uses different purple (#a78bfa) for level 2 while module viewer uses var(--accent) [#06b6d4 cyan]. V2 level 3 is #f59e42 (orange) while viewer uses var(--warning) [#f59e0b] -- close but not exact
COMPONENT: .ix-h-level[data-level="2"], .ix-h-level[data-level="3"]
CURRENT: Level 2 = var(--accent) = #06b6d4; Level 3 = var(--warning) = #f59e0b
TARGET: No change needed -- the module viewer correctly uses its own design tokens. The v2 examples are standalone prototypes with hardcoded colors. The viewer's tokenized approach is architecturally better. Document as intentional divergence.
FILE: N/A
PRIORITY: N/A (accepted divergence)
```

### Gap 6: Scenario Quiz Terminal Label

```
ISSUE: V2 disorientation-sim.html has terminal label "CLAUDE CODE SESSION" at 9px with letter-spacing: 1px. Module viewer .ix-sq-terminal::before matches this exactly. No gap.
COMPONENT: .ix-sq-terminal::before
CURRENT: matches v2
TARGET: N/A
FILE: N/A
PRIORITY: N/A (already aligned)
```

### Gap 7: Intervention Badge Colors

```
ISSUE: V2 output-v2.html uses red (#f87171) for "Intervene" badge and green (#4ade80) for "Hold" badge. Module viewer uses var(--ix-err) and var(--success) which map to #ef4444 and #10b981 -- slightly different hues
COMPONENT: .ix-int-badge.intervene, .ix-int-badge.hold
CURRENT: intervene = rgba(239,68,68,0.1) bg, var(--ix-err) text; hold = rgba(16,185,129,0.1) bg, var(--success) text
TARGET: Acceptable -- the viewer uses its own token system consistently. V2 standalone files had direct color picks. No change needed.
FILE: N/A
PRIORITY: N/A (accepted divergence)
```

---

## Mobile Responsiveness (375px)

```
ISSUE: Quiz 2x2 grid correctly collapses to 1-column at 600px but the breakpoint is too wide -- 2x2 still works at 400px
COMPONENT: .ix-quiz-options (mobile override)
CURRENT: @media (max-width: 600px) { grid-template-columns: 1fr; }
TARGET: @media (max-width: 420px) { grid-template-columns: 1fr; } -- keep 2x2 on larger phones
FILE: module-viewer.html (line ~2772)
PRIORITY: P2
```

```
ISSUE: Hero title at 22px on mobile is adequate but hero chips overflow horizontally on 375px
COMPONENT: .ix-hero-chips (mobile)
CURRENT: flex-wrap: wrap; gap: 8px (implicit from desktop styles)
TARGET: Explicitly add to mobile block: .ix-hero-chips { gap: 6px; } .ix-hero-chip { font-size: 10px; padding: 4px 8px; }
FILE: module-viewer.html (add to @media block around line ~2796)
PRIORITY: P1
```

```
ISSUE: Trace split panel stacks correctly on mobile but annotation panel max-height (150px) too short to be useful
COMPONENT: .ix-trace-annotations (mobile)
CURRENT: max-height: 150px
TARGET: max-height: 200px
FILE: module-viewer.html (line ~2760)
PRIORITY: P2
```

```
ISSUE: Scenario quiz choice cards at 375px -- gap between choice-key and choice-text too tight
COMPONENT: .ix-sq-choice (mobile)
CURRENT: padding: 12px 14px; gap: 10px
TARGET: padding: 12px 14px; gap: 12px
FILE: module-viewer.html (line ~2786)
PRIORITY: P2
```

---

## Performance

```
ISSUE: module-viewer.html is 173KB / 5365 lines -- approaching maintainability threshold but not yet a performance concern for single-page load
COMPONENT: module-viewer.html (entire file)
CURRENT: 173KB with all CSS inline + all JS inline
TARGET: No immediate action. Monitor growth. If file exceeds 250KB or 7000 lines, extract CSS to separate file and JS to module-viewer.js. Currently acceptable for a single-page app with no external CSS framework.
FILE: module-viewer.html
PRIORITY: P2
```

```
ISSUE: Lucide loaded from unpkg CDN with @latest tag -- no version pinning, could break on breaking update
COMPONENT: <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js">
CURRENT: @latest (unpinned)
TARGET: Pin to specific version: https://unpkg.com/lucide@0.468.0/dist/umd/lucide.min.js (or current latest stable)
FILE: module-viewer.html (line ~11)
PRIORITY: P1
```

```
ISSUE: Three CDN scripts loaded synchronously in head -- marked and mermaid block rendering
COMPONENT: <script> tags for marked, mermaid, lucide
CURRENT: No defer/async attributes on marked or mermaid scripts
TARGET: Add defer to mermaid script (not needed until content renders). Lucide and marked are needed early, keep synchronous.
FILE: module-viewer.html (line ~12-13)
PRIORITY: P2
```

---

## Module Content Fixes

### Module 01

```
ISSUE: Several sections have dense prose blocks (4+ paragraphs) between interactive components -- no visual breathing room
COMPONENT: Module 01 markdown prose sections
CURRENT: Standard paragraph spacing (16px margin-bottom)
TARGET: Add a horizontal rule (---) or a callout between dense prose sections and interactive components to create visual rhythm. Alternatively, wrap transitional prose in a callout[data-variant="core-idea"] to break monotony.
FILE: /Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/docs/curriculum/modules/01-paradigm-shift.md
PRIORITY: P1
```

### Module 02

```
ISSUE: H2 "2.1 The Two Modes" uses numbering format "2.1" but markdown-body h2 styling does not account for numbered sections -- numbers render at same weight as title text
COMPONENT: .markdown-body h2 (rendering of "2.1 The Two Modes...")
CURRENT: Entire h2 text same style
TARGET: Consider using the section-header pattern (numbered badge + h2 text) already in the section card pattern, or accept as-is since the sections ARE inside section cards
FILE: No change needed -- the section-card wrapper already provides numbered badges via .section-num
PRIORITY: N/A
```

### Module 03

```
ISSUE: Module 03 has 5 learning objectives listed as plain numbered list in markdown -- not using the ix-objective component for visual consistency
COMPONENT: Module 03 "Learning Objectives" numbered list
CURRENT: Standard markdown ordered list
TARGET: Wrap in a single ix-objective component, or keep as-is since the list format is intentional for scanability. Recommend keeping as-is -- the list is a reference, not a single learning objective.
FILE: /Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/docs/curriculum/modules/03-agent-thinking.md
PRIORITY: P2
```

---

## Cross-Cutting Improvements

```
ISSUE: No consistent spacing system between ix-diagram components and surrounding prose
COMPONENT: .ix-diagram
CURRENT: margin: 24px 0
TARGET: margin: 28px 0 (increase slightly). Add: .ix-diagram + .ix-diagram { margin-top: 16px; } to reduce spacing between consecutive diagrams. Add: p + .ix-diagram { margin-top: 20px; }
FILE: module-viewer.html (line ~787-793)
PRIORITY: P1
```

```
ISSUE: Light theme overrides are scattered across file in multiple blocks -- hard to maintain
COMPONENT: [data-theme="light"] rules
CURRENT: Multiple scattered blocks (lines ~2143-2166, ~2393-2420, ~2710-2728)
TARGET: Consolidate all [data-theme="light"] overrides into a single block at end of CSS, before @media queries. Add comment header: /* == Light Theme Overrides == */
FILE: module-viewer.html
PRIORITY: P2
```

```
ISSUE: Milestone toast and completion banner use fixed positioning but no z-index stacking context documentation
COMPONENT: .milestone-toast (z-index: 220), .module-complete-banner (z-index: 200), nav (z-index: 100)
CURRENT: z-index values work but not documented
TARGET: Add CSS comment at top of file: /* Z-Index Stack: nav=100, banner=200, toast=220, progress=1000 */
FILE: module-viewer.html (add comment near line ~15)
PRIORITY: P2
```

---

## Files Referenced

| File | Purpose |
|------|---------|
| `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/module-viewer.html` | Primary file -- all CSS and JS fixes |
| `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/docs/curriculum/modules/01-paradigm-shift.md` | Module 01 content |
| `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/docs/curriculum/modules/02-claude-code-foundations.md` | Module 02 content |
| `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/docs/curriculum/modules/03-agent-thinking.md` | Module 03 content |
| `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/examples/module-diagrams/m02-claudemd-v2.html` | V2 reference (CLAUDE.md diagram) |
| `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/examples/module-diagrams/m02-modes-v2.html` | V2 reference (modes diagram) |
| `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/examples/module-diagrams/m02-output-v2.html` | V2 reference (output layers diagram) |
| `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/examples/module-diagrams/disorientation-sim.html` | V2 reference (scenario quiz) |
| `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/examples/module-diagrams/collaboration-model.html` | V2 reference (click-cards) |
