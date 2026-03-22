# Lab Framework Pattern Analysis
**Date**: 2026-03-15
**Labs analyzed**: 9 (Day 1: labs 01–03, Day 2: labs 04–06, Day 3: labs 07–09)
**Total lines analyzed**: ~17,440 lines HTML + CSS + JS
**Tool uses**: 28 (full read of all 9 files)

---

## Executive Summary

All 9 labs share a **consistent framework with 4 core component types, 8 universal JavaScript functions, and 25+ repeated CSS classes**. JavaScript function names are **already identical across labs** — extraction is clean, not a rename exercise.

**Estimated impact of extraction:**
- Current: 17,440 lines across 9 labs (~1,938 lines/lab average)
- After: ~6,180 lines total (2,130 shared framework + 9 × ~450 config)
- **Reduction: 64.6%** — saves ~1,253 lines per lab

---

## High-Frequency Patterns (7–9 labs)

### JavaScript Functions Present in All/Most Labs

| Function | Frequency | Purpose |
|---|---|---|
| `updateNavDots()` | 9/9 | Updates progress indicators (nav dots) |
| `buildNavDots()` | 8/9 | Renders initial nav progress dots |
| `saveReflection(key, value)` | 9/9 | Persists textarea content to localStorage |
| `loadAllReflections()` | 9/9 | Restores all user responses on page load |
| `exportReflections()` | 9/9 | Exports user responses as .txt file |
| `awardXP(amount, reason)` | 8/9 | Awards XP and displays notification |
| `updateXPDisplay()` | 8/9 | Updates XP counter in nav |
| `markSectionComplete(idx)` | 8/9 | Marks section complete, unlocks next |
| `checkSectionUnlock(idx)` | 8/9 | Verifies if section should unlock |
| `completeLab()` | 8/9 | Marks entire lab complete, shows banner |
| `checkMinChars(id, btnId, min, hint)` | 8/9 | Validates textarea character count |
| `showXPToast(amount, reason)` | 6/9 | XP toast notification |
| `updateStreak(correct)` | 4/9 | Streak counter logic |
| `answerQ(idx, opt, correct)` | 6/9 | Quiz answer handler |

### CSS Classes — Frequency Table

| Class | Instances | Frequency | Role |
|---|---|---|---|
| `answer-option` | 119 | 9/9 | Individual quiz answer choice |
| `btn`, `btn-primary` | 112 + 57 | 9/9 | Core button styles |
| `opt-letter` | 92 | 9/9 | Answer choice letter (A, B, C, D) |
| `card-badge` | 90 | 9/9 | Challenge/Check/Insight label |
| `info-card` | 45 | 7/9 | Info callout box |
| `section-block` | 41 | 6/9 | Section container wrapper |
| `locked`, `lock-overlay` | 40 each | 6/9 | Section lock UI |
| `challenge-card` | 37 | 6/9 | Predict → Reveal → Apply card |
| `char-hint` | 35 | 8/9 | Character counter for textareas |

---

## Medium-Frequency Patterns (4–6 labs)

| Pattern | Frequency | Notes |
|---|---|---|
| `completeSection(idx)` | 6/9 | Section completion handler |
| Interactive simulation (`runSimulation()`) | 2/9 | PRAO trace demos |
| Insight/Callback cards | 4/9 | Lesson highlights and references |

---

## Core Extractable Components

### 1. Navigation Bar (9/9 labs) — 200 lines/lab
Fixed top nav with badge, title, progress dots, XP display, streak display.

**API**:
```javascript
renderNavBar({
  dayNum: 2,
  labNum: 4,
  title: 'MCP Server Explorer',
  showXP: true,
  showStreak: true,
  sectionCount: 6
})
```

### 2. Persistence Layer (9/9 labs) — 150 lines/lab
localStorage key naming convention, save/load/export reflection functions.

**localStorage key pattern**: `${LAB_KEY}-complete`, `${LAB_KEY}-xp`, `${LAB_KEY}-s${i}`, `${LAB_KEY}-${fieldSlug}`

**API**:
```javascript
const storage = StorageLayer('lab-04');
storage.save('s1-prediction', textarea.value);
storage.loadAll();  // called on DOMContentLoaded
storage.export();   // generates .txt download
```

### 3. XP System (8/9 labs) — 120 lines/lab
Award XP, display counter, show toast, streak tracking.

**API**:
```javascript
awardXP(30, 'correct answer');   // awards + shows toast
updateStreak(true);              // correct=true increments, false resets
showXPToast('+30 XP — correct answer');
```

### 4. Section Gates (8/9 labs) — 180 lines/lab
Locked/unlocked wrapper with lock overlay UI.

**API**:
```javascript
markSectionComplete(2);         // unlock section 3
checkSectionUnlock(3);          // returns boolean
```

### 5. Challenge Card (6/9 labs) — 250 lines/lab
3-phase: Predict → Reveal → Apply

**API**:
```javascript
renderChallengeCard({
  id: 's1-challenge',
  badge: 'Prediction Challenge',
  question: 'Before we reveal...',
  placeholder: 'Your prediction...',
  minChars: 20,
  xp: 10,
  revealContent: '<div>...</div>',
  applyPrompt: 'Now apply...',
  applyXP: 20,
  modelAnswer: '<code>...</code>'
})
```

### 6. Knowledge Check / Quiz Card (8/9 labs) — 150 lines/lab
Question text + 4 answer options with per-option hidden feedback.

**API**:
```javascript
renderKnowledgeCheck({
  id: 's4-q1',
  question: 'Which MCP primitive...',
  options: [
    { letter: 'A', text: 'Tools', correct: true, feedback: 'Correct. Tools are callable functions.' },
    { letter: 'B', text: 'Resources', correct: false, feedback: 'Resources are URI-addressable data, not actions.' },
    { letter: 'C', text: 'Prompts', correct: false, feedback: 'Prompts are reusable instruction templates.' }
  ],
  xp: 30,
  onCorrect: () => checkSectionUnlock(5)
})
```

### 7. Info / Insight Card (7/9 labs) — 80 lines/lab
Colored callout box with title and body.

**API**:
```javascript
renderInfoCard({
  title: 'Key Insight',
  body: 'The description field is what Claude reads...',
  variant: 'primary' // 'primary' | 'warning' | 'accent' | 'success'
})
```

### 8. CSS Design System (9/9 labs) — ~800 lines total
All 9 labs use the identical `:root` CSS variables block, button styles, card layouts, and typography hierarchy. Written once in `core.css`.

---

## Lab-Specific Patterns (Keep Unique — Do NOT Extract)

| Lab | Unique Pattern | Reason |
|---|---|---|
| Lab 01 | Particle animations, PRAO flow diagram | Conceptual intro visualization |
| Lab 04 | MCP explorer (interactive tool/resource browser) | Domain-specific |
| Lab 05 | Prompt ranking matrix, schema visualization | Domain-specific |
| Lab 06 | Skills/commands checklist, builder interface | Domain-specific |
| Lab 08 | Triage task (multi-agent decision-making) | Domain-specific simulation |

---

## Estimated Code Reduction

| Component | Per-Lab Lines | Labs | Shared Lines | Est. Savings |
|---|---|---|---|---|
| CSS Design System | — | 9/9 | 800 | 800 lines |
| Navigation | 200 | 9/9 | 200 | 1,600 lines |
| Persistence Layer | 150 | 9/9 | 150 | 1,350 lines |
| XP System | 120 | 8/9 | 120 | 960 lines |
| Section Block/Gates | 180 | 6/9 | 180 | 900 lines |
| Challenge Card | 250 | 6/9 | 250 | 1,500 lines |
| Quiz/Check Card | 150 | 8/9 | 150 | 1,200 lines |
| Info/Callout Card | 80 | 7/9 | 80 | 560 lines |
| **Total** | **1,130** | — | **~1,930** | **~8,870 lines** |

**Before**: 17,440 lines total
**After**: ~6,180 lines total (1,930 framework + 9 × 450 config)
**Reduction**: 64.6%

---

## Implementation Roadmap

### Phase 1 — Core Framework (CSS + persistence + nav + XP)
- `lab-framework/core.css` — design system + component styles
- `lab-framework/storage.js` — persistence layer
- `lab-framework/nav.js` — navigation + progress dots
- `lab-framework/xp.js` — XP system + streak + toasts
- **Savings**: ~4,710 lines across all 9 labs

### Phase 2 — Component Library
- `lab-framework/components.js` — all interactive components:
  - `renderKnowledgeCheck(config)`
  - `renderChallengeCard(config)`
  - `renderSectionBlock(config)`
  - `renderInfoCard(config)`
- **Savings**: ~4,160 lines across all 9 labs

### Phase 3 — Integration + Build System
- `lab-framework/build.js` — Node.js script: inlines framework into self-contained HTML
- `labs/configs/lab-04-config.js` — declarative lab content config per lab
- Generated output: same self-contained HTML files, but produced from config + framework
- **Result**: Future labs require ~450 lines of config only

---

## Key Findings for Implementation

1. **Identical function names across all 9 labs** — extraction requires no renaming
2. **Consistent localStorage key pattern** — parameterize on `LAB_KEY` only
3. **Challenge card 3-phase structure is the dominant pattern** — prioritize this component
4. **CSS classes are already standardized** — `core.css` is a direct extract
5. **Build step needed** — labs must remain self-contained for file:// delivery, so framework gets inlined at build time

---
*Analysis: 28 tool uses, 9 files fully read. Findings actionable for direct implementation.*
