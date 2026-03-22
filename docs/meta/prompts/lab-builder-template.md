# Lab Builder Prompt Template
# ─────────────────────────────────────────────────────────────────────────────
# Reusable prompt spec for building one interactive HTML lab.
# Part of the Agentic AI Course meta-layer.
#
# HOW TO USE:
#   Replace all [BRACKETED] placeholders with lab-specific values.
#   This template produced Labs 03–09 successfully when used with the
#   "write to file, not response" execution pattern (see CRITICAL note below).
#
# PROVEN EXECUTION PATTERN (from session 2026-03-15):
#   Agent type: general-purpose, run_in_background: true
#   ⚠️ CRITICAL header MUST be the first thing in the prompt — see below.
# ─────────────────────────────────────────────────────────────────────────────

---

## PROMPT TEMPLATE (copy from here)

---

Build a complete interactive HTML lab file and write it to disk.

⚠️ CRITICAL: Use the Write tool to save the file directly to disk. Do NOT output the HTML in your response text. Your response should only confirm what was built, not contain any HTML code. The file will be ~1,800 lines; outputting it as text will hit a 32k token limit and fail.

**Target file**: `/[COURSE_ROOT]/labs/day[LAB_DAY]/lab-[LAB_NUMBER]-[lab-slug].html`

---

## Lab [LAB_NUMBER]: [LAB_NAME]

This is Day [LAB_DAY]'s [POSITION] lab in a 3-day Agentic AI Engineering course. It teaches [CORE_CONCEPT_ONE_SENTENCE].

### Design System (copy EXACTLY from Lab 01)

Use this CSS design system verbatim:
```css
:root {
  --bg-base:    #080d1a;
  --bg-surface: #0f1729;
  --bg-raised:  #172035;
  --bg-glass:   rgba(23, 32, 53, 0.7);
  --primary:    #6366f1;
  --primary-glow: rgba(99,102,241,0.25);
  --secondary:  #8b5cf6;
  --accent:     #06b6d4;
  --accent-glow: rgba(6,182,212,0.2);
  --success:    #10b981;
  --warning:    #f59e0b;
  --danger:     #ef4444;
  --text:       #f1f5f9;
  --text-muted: #94a3b8;
  --text-dim:   #475569;
  --border:     rgba(255,255,255,0.08);
  --border-bright: rgba(99,102,241,0.4);
  --radius:     16px;
  --radius-sm:  8px;
}
```

### Page Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lab [LAB_NUMBER] · [LAB_NAME] | Agentic AI Engineering</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
</head>
<body>
  <div id="progress-bar"></div>
  <nav>...</nav>
  <main>...</main>
  <script>...</script>
</body>
</html>
```

### Navigation

- Fixed top nav: "Day [LAB_DAY] · Lab [LAB_NUMBER]" brand + "[LAB_NAME]" title + XP counter (`<span id="xp-count">0</span> XP`)
- [SECTION_COUNT] section dots (S0–S[N]), clicking scrolls to section, active dot highlighted in primary color
- Fixed gradient progress bar at very top (updates on scroll via `requestAnimationFrame`)

### XP & Streak System

```javascript
// XP schedule (proven values from session)
const XP = {
  predictionAttempt: 10,    // any text submitted to prediction field
  predictionBonus:   15,    // awarded on top if prediction was correct
  applyComplete:     20,    // apply task textarea submitted
  knowledgeCheck:    30,    // correct multiple-choice answer
  bossChallenge:    100     // boss challenge completed
};

// Streak bonuses
// 3 consecutive correct → +25 XP toast "🔥 3-answer streak! +25 XP"
// 5 consecutive correct → +50 XP toast "🔥 5-answer streak! +50 XP"

// localStorage keys
localStorage.setItem('lab-[LAB_NUMBER]-xp', totalXP);
localStorage.setItem('lab-[LAB_NUMBER]-streak', streakCount);
localStorage.setItem('lab-[LAB_NUMBER]-streak-count', highStreak);
```

### CONCEPT_REGISTRY

Populate with ALL concepts from ALL prior labs, plus new concepts introduced in this lab:
```javascript
const CONCEPT_REGISTRY = {
  // From Lab 01
  'prao-loop':      { lab: 'Lab 01', section: 'S1', title: 'PRAO Loop' },
  // From Lab 02
  'gccf-pattern':   { lab: 'Lab 02', section: 'S1', title: 'GCCF Pattern' },
  'claude-md':      { lab: 'Lab 02', section: 'S3', title: 'CLAUDE.md Context' },
  // From Lab 03
  'chain-of-thought': { lab: 'Lab 03', section: 'S1', title: 'Chain of Thought' },
  // ... add all prior lab concepts ...
  // New concepts THIS lab introduces:
  '[CONCEPT_SLUG]': { lab: 'Lab [LAB_NUMBER]', section: 'S[N]', title: '[Concept Name]' },
};
```

When a section references a concept from a prior lab, render a **Callback Card** (purple left border, `🔁` icon):
```html
<div class="callback-card">
  <span class="callback-badge">🔁 From [Lab X]</span>
  <p>[Connection between prior concept and current content]</p>
</div>
```

### Section Unlock Gates (engagement gates)

- S0: Always unlocked
- S1: Unlock after [SPECIFIC_S0_GATE_CONDITION]
- S2: Unlock after [SPECIFIC_S1_GATE_CONDITION]
- ... (define per lab)
- Locked sections show a blurred overlay with: "Complete the previous section to unlock this content."
- Gate state persisted to localStorage: `lab-[LAB_NUMBER]-s[N]-complete`

---

## Section Specifications

[FOR EACH SECTION, follow this beat structure — the Seven-Beat Engagement Loop:]

### Section 0: [SECTION_NAME]

**Beat 1 — Frame the Gap**: [Opening hook that identifies what the learner doesn't know yet]

**Beat 2 — Predict**: [What should learners predict before the reveal? Give the exact question text and textarea placeholder.]

**Beat 3 — Reveal**: [The core concept, revealed after prediction submitted. What content appears?]

**Beat 4 — Apply**: [The apply task — what should learners DO with the concept? Exact instructions.]

**Beat 5 — Feedback**: [How does the system respond? Correct/incorrect messages, model answers.]

**Beat 6 — Connect**: [Callback cards or insight cards that connect to prior/future concepts]

**Gate condition**: [What must happen for S1 to unlock?]

### Section 1: [SECTION_NAME]

[Repeat beat structure for each section]

...

### Section [N]: Boss Challenge

No knowledge checks — entirely Apply-based.

**Scenario**: "[A realistic professional scenario requiring synthesis of all lab concepts]"

**Structure**: [Labeled textareas for each design decision / component]

**Completion**: "Generate [Document Type]" button appears when all fields filled (min [N] chars each) → assembles formatted output → offers download as `.txt` → awards 100 XP → shows completion callout linking to next lab.

**Model answer**: Revealed after document generated.

---

## Content Accuracy Rules (enforce for every lab)

1. **NO `--thinking` flag** — extended thinking is a model-level API parameter, not a CLI flag
2. **NO `--context` flag** — Claude Code has no such flag
3. **NO `/memory` command** — not a native Claude Code command
4. **SSE deprecated 2025-03-26** — remote MCP transport = Streamable HTTP only
5. **Exactly THREE MCP primitives**: Tools, Resources, Prompts — no others
6. **settings.json allow/deny** — `{"permissions": {"allow": [...], "deny": [...]}}` — no "levels" or "modes"
7. **CLAUDE.md is a file** — read at session start, not a slash command
8. **`triggers` in skill YAML** — LUXOR convention, not native Claude Code feature (always add note)

---

## Technical Requirements

- Self-contained single HTML file — no external JS dependencies
- Google Fonts OK: `Inter` + `JetBrains Mono` via `fonts.googleapis.com`
- All XP/streak/section state in localStorage (keys listed above)
- All textarea content auto-saved on `input` event, restored on `DOMContentLoaded`
- WCAG AA compliance:
  - All interactive non-`<button>`/non-`<a>` elements: `role="button"`, `tabindex="0"`, `aria-label="..."`, `onkeydown` handler for Enter (key code 13) and Space (key code 32)
  - No `<a><button>` nesting — use `<a class="btn">` pattern instead
- Mobile responsive (grid layouts collapse to single column below 640px)
- Section dots update active state on scroll

---

## Confirmation Output

After writing the file, confirm with:
- File path
- Line count
- Sections built (S0–SN, Boss)
- Key interactive elements implemented

---
*Template version: 1.0.0 | Produces labs of ~1,800–2,400 lines | Proven 2026-03-15*
*Key learning: Always use Write tool; never output HTML in agent response text (32k limit)*
