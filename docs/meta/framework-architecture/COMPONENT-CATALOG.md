# Lab Framework — Component Catalog
**Version**: 1.0.0
**Date**: 2026-03-15
**Source**: Extracted from 9 Agentic AI Engineering course labs

---

## Overview

This catalog documents every public API exposed by `lab-framework/core.js`. Each entry includes the function signature, configuration object shape, rendered HTML structure, and a usage example.

All function names are **already identical across all 9 labs** — this catalog reflects the existing implementation, not a proposal.

---

## Initialization

### `LabFramework.init(config)`

Top-level initializer. Call once after DOM is ready.

```javascript
document.addEventListener('DOMContentLoaded', () => {
  LabFramework.init({
    labKey:       'lab-04',          // localStorage prefix
    labName:      'MCP Server Explorer',
    dayNum:       2,
    labNum:       4,
    sectionCount: 7,                 // total sections (0-indexed)
    showStreak:   true,              // show streak counter in nav
    concepts: {                      // CONCEPT_REGISTRY entries
      'prao-loop': {
        label:     'PRAO Loop',
        origin:    'Lab 01, Section 1',
        originHref: 'lab-01-paradigm-shift.html#section-1',
        brief:     'Perceive → Reason → Act → Observe — the four-phase agentic execution cycle'
      }
    }
  });
});
```

---

## System Functions

### `awardXP(amount, reason)`

Awards XP, persists to localStorage, updates display, shows toast.

```javascript
awardXP(30, 'correct answer');       // +30 XP with toast notification
awardXP(10, 'prediction committed'); // Used after textarea gate passes
awardXP(100, 'lab complete!');       // Used by completeLab()
```

**Frequency**: 9/9 labs

---

### `updateStreak(correct)`

Updates streak counter. Correct answers increment; incorrect resets.
Automatically awards bonus XP at 3, 5, 7 streak thresholds (once each).

```javascript
updateStreak(true);   // streak++; shows streak badge at 3/5/7
updateStreak(false);  // streak = 0; hides streak display
```

**Frequency**: 4/9 labs (labs with multiple knowledge checks in sequence)

---

### `saveReflection(key, value)`

Persists textarea content to localStorage with lab prefix.

```javascript
// On textarea input:
saveReflection('s1-predict', textarea.value);

// localStorage key becomes: 'lab-04-s1-predict'
```

**Frequency**: 9/9 labs

---

### `loadAllReflections()`

Restores all textarea values, section completion states, and XP from localStorage on page load. Also re-runs `checkSectionUnlock` for all sections and `updateNavDots`.

```javascript
document.addEventListener('DOMContentLoaded', loadAllReflections);
```

**Frequency**: 9/9 labs

---

### `exportReflections()`

Downloads all non-empty textarea contents as a `.txt` file. Filename: `{labKey}-reflections.txt`.

```javascript
// Wire to export button:
document.getElementById('export-btn').onclick = exportReflections;
```

**Frequency**: 9/9 labs

---

### `markSectionComplete(idx)`

Marks section `idx` as complete, persists state, unlocks next section, updates nav dots. If last section, calls `completeLab()`.

```javascript
markSectionComplete(2); // completes section 2, unlocks section 3
```

**Frequency**: 8/9 labs (idempotent — safe to call multiple times)

---

### `checkSectionUnlock(idx)`

Checks if section `idx` should be unlocked (all prior sections complete). Removes `locked` class and hides lock overlay if so.

```javascript
checkSectionUnlock(3); // Called automatically by markSectionComplete
```

**Frequency**: 8/9 labs

---

### `completeLab()`

Awards 100 XP, shows completion banner, persists completion timestamp.

```javascript
// Called automatically by markSectionComplete when last section completes.
// Also callable directly for labs with custom completion logic.
completeLab();
```

**Frequency**: 8/9 labs

---

### `checkMinChars(taId, btnId, min, hintId)`

Character gate for textarea inputs. Enables/disables a button based on minimum character count. Awards XP once per textarea when threshold is first reached.

| Param  | Type   | Description |
|--------|--------|-------------|
| taId   | string | textarea element ID |
| btnId  | string | button element ID to enable/disable |
| min    | number | minimum character count |
| hintId | string | hint element ID for character count display |

```javascript
// Wire to textarea oninput:
checkMinChars('s1-predict', 's1-reveal-btn', 15, 's1-predict-hint');
checkMinChars('s2-apply-text', 's2-apply-btn', 40, 's2-apply-hint');
```

**Threshold convention**: 15 chars for predictions, 40 chars for apply tasks, 80 chars for boss challenges.

**Frequency**: 8/9 labs

---

### `updateNavDots()`

Rebuilds or updates nav dot states (locked / active / complete) based on `sectionComplete` array. Called automatically by `markSectionComplete`.

```javascript
updateNavDots(); // Usually called automatically; force-call after state restore
```

**Frequency**: 9/9 labs

---

## Component Renderers

These functions generate and insert DOM elements. They use a config object pattern for declarative specification.

---

### `PredictionChallenge(config)`

Renders the 3-phase Predict → Reveal → Apply card — the dominant pattern across 6/9 labs.

```javascript
PredictionChallenge({
  containerId:    's1-challenge',        // ID of container element
  labKey:         'lab-04',
  sectionIdx:     1,                     // for markSectionComplete
  badge:          'Prediction Challenge',
  question:       'Before we reveal how MCP primitives work...',
  placeholder:    'Your prediction here...',
  predictMin:     15,                    // min chars to enable Reveal
  predictXP:      10,
  revealContent:  '<div>...</div>',      // HTML shown on reveal
  applyPrompt:    'Now apply this to...',
  applyPlaceholder: 'Your response...',
  applyMin:       40,                    // min chars to submit apply
  applyXP:        20,
  modelAnswer:    '<code>...</code>',    // shown after apply submit
  onComplete:     () => checkSectionUnlock(2)
});
```

**HTML structure produced**:
```html
<div class="challenge-card">
  <span class="card-badge challenge">Prediction Challenge</span>
  <div class="challenge-predict">
    <p>[question]</p>
    <textarea id="s1-challenge-predict" ...></textarea>
    <span class="char-hint" id="s1-challenge-predict-hint"></span>
    <button class="btn btn-primary" id="s1-challenge-reveal-btn" disabled>
      Lock In Prediction →
    </button>
  </div>
  <div class="challenge-reveal" id="s1-challenge-reveal">
    [revealContent]
    <div class="challenge-apply" id="s1-challenge-apply">
      <p>[applyPrompt]</p>
      <textarea id="s1-challenge-apply-text" ...></textarea>
      <span class="char-hint" id="s1-challenge-apply-text-hint"></span>
      <button class="btn btn-primary" id="s1-challenge-apply-btn" disabled>
        Submit →
      </button>
      <div class="model-answer" id="s1-challenge-model-answer">
        [modelAnswer]
      </div>
    </div>
  </div>
</div>
```

**Frequency**: 6/9 labs

---

### `KnowledgeCheck(config)`

Renders a multiple-choice quiz question with per-option feedback, streak integration, and XP award.

```javascript
KnowledgeCheck({
  containerId: 's4-kc',
  labKey:      'lab-04',
  sectionIdx:  4,
  question:    'Which MCP primitive is callable by the model?',
  options: [
    {
      letter:   'A',
      text:     'Tools',
      correct:  true,
      feedback: 'Correct. Tools are callable functions — actions the model can invoke.'
    },
    {
      letter:   'B',
      text:     'Resources',
      correct:  false,
      feedback: 'Resources are URI-addressable read-only data, not callable actions.'
    },
    {
      letter:   'C',
      text:     'Prompts',
      correct:  false,
      feedback: 'Prompts are reusable instruction templates, not callable functions.'
    },
    {
      letter:   'D',
      text:     'Servers',
      correct:  false,
      feedback: 'Servers are the hosts, not a primitive type exposed to the model.'
    }
  ],
  xp:        30,
  onCorrect: () => markSectionComplete(4)
});
```

**Convention**: Always include specific wrong-answer feedback explaining WHY it is incorrect. Never use generic "That's not right" feedback.

**Frequency**: 8/9 labs

---

### `ApplyTask(config)`

Standalone apply textarea with model-answer reveal — used when Predict phase is not needed.

```javascript
ApplyTask({
  containerId:  's3-apply',
  labKey:       'lab-04',
  sectionIdx:   3,
  prompt:       'Write a CLAUDE.md configuration that...',
  placeholder:  'Your CLAUDE.md here...',
  minChars:     40,
  xp:           20,
  modelAnswer:  '<pre><code>...</code></pre>',
  onComplete:   () => markSectionComplete(3)
});
```

**Frequency**: 9/9 labs (every section has at least one apply task)

---

### `renderCallbackCard(config)`

Renders a purple callback card referencing a concept from a prior lab. Uses the CONCEPT_REGISTRY passed to `LabFramework.init()`.

```javascript
renderCallbackCard({
  containerId: 'cf-s1',         // element to render into (or after)
  conceptKey:  'prao-loop',     // key in CONCEPT_REGISTRY
  connection:  'The MCP tool call you just sent IS the Act phase of the PRAO loop.'
});
```

**Rendered HTML**:
```html
<div class="callback-card" id="cf-s1">
  <span class="callback-icon">🔁</span>
  <div class="callback-content">
    <div class="callback-label">Concept Callback</div>
    <strong><a class="callback-link" href="[originHref]">[label]</a></strong>
    <p class="callback-brief">[brief] — [connection]</p>
  </div>
</div>
```

**Trigger**: Callback cards are shown (`.show` class added) after the section completes, not on page load.

**Frequency**: Every section in 7/9 labs

---

### `renderInfoCard(config)`

Renders a colored callout box for key insights, warnings, or definitions.

```javascript
renderInfoCard({
  containerId: 'insight-1',
  title:       'Key Insight',
  body:        'The description field is what Claude reads when deciding which tool to call.',
  variant:     'primary'  // 'primary' | 'warning' | 'success' | 'accent'
});
```

**Frequency**: 7/9 labs

---

## CONCEPT_REGISTRY

Cumulative cross-lab concept index. Each lab inherits all prior labs' concepts and adds 1–3 new ones. Pass the full cumulative registry to `LabFramework.init()`.

```javascript
const CONCEPT_REGISTRY = {
  // Lab 01
  'prao-loop': {
    label:     'PRAO Loop',
    origin:    'Lab 01, Section 1',
    originHref: 'lab-01-paradigm-shift.html#section-1',
    brief:     'Perceive → Reason → Act → Observe — the four-phase agentic execution cycle'
  },
  'claude-md': {
    label:     'CLAUDE.md',
    origin:    'Lab 01, Section 4',
    originHref: 'lab-01-paradigm-shift.html#section-4',
    brief:     'Persistent context file — briefing document read at every session start'
  },
  // Lab 02
  'gccf-pattern': {
    label:     'GCCF Prompt Pattern',
    origin:    'Lab 02, Section 1',
    originHref: 'lab-02-first-agent.html#section-1',
    brief:     'Goal + Context + Constraints + Format — four-part prompt structure'
  },
  // Lab 03
  'agent-trace': {
    label:     'Agent Trace',
    origin:    'Lab 03, Section 2',
    originHref: 'lab-03-agent-thinking.html#section-2',
    brief:     'Step-by-step record of PRAO phases — used to audit and improve agent behavior'
  },
  // Lab 04
  'mcp-primitive': {
    label:     'MCP Primitives',
    origin:    'Lab 04, Section 1',
    originHref: 'lab-04-mcp-explorer.html#section-1',
    brief:     'Tools (actions), Resources (data), Prompts (templates) — exactly three'
  },
  // Lab 05
  'tcef-pattern': {
    label:     'TCEF Prompt Pattern',
    origin:    'Lab 05, Section 2',
    originHref: 'lab-05-prompt-engineering.html#section-2',
    brief:     'Task + Context + Examples + Format — signal-rich prompt structure'
  },
  // Lab 06
  'skill-anatomy': {
    label:     'Skill Anatomy',
    origin:    'Lab 06, Section 1',
    originHref: 'lab-06-skills-commands.html#section-1',
    brief:     'YAML header + trigger list + procedure + output format = a skill file'
  },
  // Lab 07
  'orchestrator-pattern': {
    label:     'Orchestrator Pattern',
    origin:    'Lab 07, Section 2',
    originHref: 'lab-07-multi-agent.html#section-2',
    brief:     'One planner dispatches many workers; workers report back; orchestrator synthesizes'
  },
  // Lab 08
  'permission-gate': {
    label:     'Permission Gate',
    origin:    'Lab 08, Section 1',
    originHref: 'lab-08-production.html#section-1',
    brief:     'settings.json allow/deny list — explicit scope limiting for production agents'
  }
};
```

---

## localStorage Key Convention

All persistence uses a consistent prefix pattern:

| Key | Type | Value |
|-----|------|-------|
| `{labKey}-xp` | number | total XP earned |
| `{labKey}-s{idx}` | '1' | section `idx` complete |
| `{labKey}-complete` | timestamp | lab completion time |
| `{labKey}-{textareaId}` | string | textarea content |

Examples for `labKey = 'lab-04'`:
- `lab-04-xp` → `"240"`
- `lab-04-s3` → `"1"`
- `lab-04-s1-predict` → `"I think MCP servers expose..."`
- `lab-04-complete` → `"1742000000000"`

---

## Content Accuracy Rules (Enforce in All Labs)

These rules must be checked by the anti-confabulation validator on every lab build:

1. **NO `--thinking` flag** — model-level API parameter, not a CLI flag
2. **NO `--context` flag** — doesn't exist in Claude Code CLI
3. **NO `/memory` command** — not a native Claude Code command
4. **SSE deprecated 2025-03-26** — remote MCP uses Streamable HTTP only
5. **Exactly THREE MCP primitives**: Tools, Resources, Prompts
6. **settings.json format**: `{"permissions": {"allow": [...], "deny": [...]}}`
7. **CLAUDE.md**: read at session start, never a slash command
8. **`triggers` in skill YAML**: project convention, not native keyword activation

---
*Component Catalog v1.0.0 | 2026-03-15 | Agentic AI Engineering Course*
