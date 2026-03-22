# Progressive Practice Lab Framework
## Agentic AI Engineering Course — Interactive Lab Design Specification

**Version**: 1.0
**Status**: Canonical — all Labs 01–09 conform to this spec
**Last Updated**: 2026-03-15

---

## Philosophy

Labs are not interactive documents. They are **structured practice experiences with a clear learning objective**.

Every design decision serves one principle: **learners are never passive**. They predict before they see, apply before they complete, and reflect before they move on. The XP system makes effort visible and progress tangible. Concept Callbacks create the experience of knowledge accumulating — not just content scrolling by.

Engagement framing is not cosmetic. It structures the cognitive architecture of each section so that engagement gates comprehension. You cannot proceed by scrolling — only by thinking.

### Tone Guidance (Professional + Engaging)
- Keep labels like `Challenge` and `Check` to signal interaction mode clearly.
- Use emojis sparingly for emphasis, not decoration.
- Prefer terms like **Milestone**, **Checkpoint**, **Practice**, **Capstone** over purely game-only language.
- Progress language should feel motivating and operational (for example: "steady progress", "strong consistency", "excellent consistency").

---

## The Seven-Beat Core Engagement Loop

Every section, without exception, runs this internal loop. It is invisible to the learner but governs every interaction.

```
Beat 1: ACTIVATE Prior Knowledge
  ↓
Beat 2: FRAME the Gap (create tension — why doesn't what I know already cover this?)
  ↓
Beat 3: PREDICT (learner makes a commitment — minimum 15 chars, blocks reveal)
  ↓
Beat 4: REVEAL (content appears; prediction comparison is explicit)
  ↓
Beat 5: APPLY (learner produces something — minimum 40 chars or valid interaction)
  ↓
Beat 6: FEEDBACK (specific, named misconceptions for wrong; extensions for right)
  ↓
Beat 7: CONNECT FORWARD (bridge to next section — visible only after Apply)
```

**Architectural invariants:**
- Beats 3 and 5 are never optional (skippable) in a knowledge-bearing section
- Beat 6 names the specific misconception each wrong option represents — never generic "Incorrect"
- Beat 7 is revealed only after the learner completes Beat 5 — no forward peeking

---

## Section Types

Six section types compose all labs. Each maps to a subset of the seven-beat loop.

### 1. Concept Introduction
**Purpose**: Establish a new idea through concrete examples before abstraction
**Beats active**: 1, 2, 4
**Card types used**: `info`, `insight` (revealed after learner clicks a "reveal" trigger)
**Unlock condition**: Completion of prior section

### 2. Prediction Challenge
**Purpose**: Force commitment before exposure to content
**Beats active**: 1, 2, 3, 4
**Card types used**: `challenge`, `info` (after reveal)
**Unlock condition**: Prior section complete
**Minimum commitment**: 15 characters in textarea before "Reveal" activates
**UI**: Reveal button grayed out with counter showing chars remaining until active

### 3. Interactive Simulation
**Purpose**: Kinesthetic learning through a runnable trace or simulation
**Beats active**: 3, 4, 5
**Card types used**: `challenge`, simulation UI
**Unlock condition**: Prior section complete
**Pattern**: Predict → Run → Compare prediction to trace → Reflect textarea (40+ chars)

### 4. Knowledge Check
**Purpose**: Test application, not recall — scenario-based questions
**Beats active**: 5, 6
**Card types used**: `check`
**Unlock condition**: Prior section complete
**Feedback**: Per-option incorrect feedback naming the specific misconception
**XP**: 30 (1st try), 15 (2nd try), 5 (3rd try)

### 5. Concept Callback
**Purpose**: Surface an earlier concept in a new context — makes learning cumulative
**Beats active**: 1, 7
**Card types used**: `callback`
**Trigger**: Detected by `CONCEPT_REGISTRY` when a section references a registered concept
**Visual**: Purple card with 🔗 CALLBACK badge and reference to original section

### 6. Capstone Challenge
**Purpose**: Synthesis — requires integrating all section concepts
**Beats active**: 3, 5, 6
**Card types used**: `challenge`, self-evaluation rubric
**Unlock condition**: All prior sections complete
**Evaluation**: Learner self-scores against model answer using behavioral anchors
**XP**: 50 on completion

---

## Five Card Types

The visual language that distinguishes information delivery from active learning.

### `info` — Information Card
```css
background: var(--bg-surface);
border: 1px solid var(--border);
border-left: 3px solid var(--accent);
```
**Use for**: Explanations, examples, code blocks, diagrams
**Never use for**: Challenges or questions

### `challenge` — Challenge Card (Amber)
```css
background: rgba(245,158,11,0.06);
border: 1px solid rgba(245,158,11,0.3);
border-left: 3px solid var(--warning);
```
**Badge**: `🎯 CHALLENGE` in amber
**Use for**: Prediction textareas, Apply exercises, Capstone Challenges
**Requires**: Minimum character count enforced before proceeding

### `check` — Knowledge Check Card
```css
background: rgba(99,102,241,0.05);
border: 1px solid rgba(99,102,241,0.3);
```
**Badge**: `✓ CHECK` in primary color
**Use for**: Multiple-choice questions with per-option feedback
**Behavior**: Options lock after selection; feedback injected immediately

### `callback` — Concept Callback Card (Purple)
```css
background: rgba(139,92,246,0.06);
border: 1px solid rgba(139,92,246,0.3);
border-left: 3px solid var(--secondary);
```
**Badge**: `🔗 CALLBACK` in purple
**Use for**: Resurfacing earlier concepts in new contexts
**Structure**: "You learned [concept] in [Lab/Section]. Here it appears as [new form]."

### `insight` — Insight Card (Green, Post-Apply)
```css
background: rgba(16,185,129,0.06);
border: 1px solid rgba(16,185,129,0.3);
border-left: 3px solid var(--success);
```
**Badge**: `💡 INSIGHT`
**Reveal condition**: Only visible after the learner completes the Apply step
**Use for**: The "aha" — the generalization that wasn't obvious before the learner did the work

---

## XP System

### Point Schedule (max 1,000 points per lab)

| Action | XP |
|--------|----|
| Prediction written (15+ chars) | 10 |
| Simulation run | 15 |
| Knowledge check — correct 1st try | 30 |
| Knowledge check — correct 2nd try | 15 |
| Knowledge check — correct 3rd try | 5 |
| Apply exercise completed (40+ chars) | 20 |
| Streak bonus (3+ consecutive correct) | 25 |
| Capstone Challenge completed | 50 |
| Lab complete | 100 |

### Streak System
- **3 consecutive correct** → amber streak indicator ("🔥 3 streak")
- **5 consecutive correct** → purple streak ("⚡ 5 streak — strong consistency")
- **7+ consecutive correct** → gold streak ("👑 7 streak — excellent consistency")
- Any wrong answer resets streak counter

### XP Display
```javascript
// Persistent across page reload via localStorage
let xp = parseInt(localStorage.getItem('lab-XX-xp') || '0');

function awardXP(amount, reason) {
  xp += amount;
  localStorage.setItem('lab-XX-xp', xp.toString());
  showXPToast(amount, reason);
  updateXPDisplay();
}

function showXPToast(amount, reason) {
  // Brief floating toast: "+30 XP — first try!" fades in/out over 2s
}
```

### XP Display HTML (nav area)
```html
<div class="xp-display" aria-live="polite" aria-label="Experience points">
  <span class="xp-icon">⚡</span>
  <span id="xp-value">0</span>
  <span class="xp-label">XP</span>
</div>
```

### Milestone System
Milestones provide professional progress markers between sections.

```javascript
const MILESTONES = [
  { section: 1, label: 'Prompt Structure' },
  { section: 3, label: 'Error Diagnosis' },
  { section: 5, label: 'Conversation Design' },
  { section: 6, label: 'Capstone Complete' }
];

function updateMilestoneDisplay(sectionComplete) {
  // Show highest unlocked milestone in nav: "Milestone 2: Error Diagnosis"
}
```

--- 

## Section Unlock Architecture

Sections unlock based on **engagement completion**, not time or correctness.

```javascript
const SECTION_UNLOCK_CONDITIONS = {
  0: () => true,                                    // Section 0 always open
  1: () => sectionComplete[0],                      // Section 1: prior complete
  2: () => sectionComplete[1],                      // Section 2: prior complete
  3: () => sectionComplete[2],
  4: () => sectionComplete[3],
  5: () => sectionComplete[4],                      // Capstone: all prior complete
};

function checkSectionUnlock(idx) {
  const section = document.getElementById(`section-${idx}`);
  if (SECTION_UNLOCK_CONDITIONS[idx]()) {
    section.classList.remove('locked');
    section.querySelector('.lock-overlay')?.remove();
  }
}

function markSectionComplete(idx) {
  sectionComplete[idx] = true;
  localStorage.setItem(`lab-XX-s${idx}`, '1');
  checkSectionUnlock(idx + 1);
  updateNavDots(idx);
  awardXP(20, `Section ${idx + 1} complete`);
}
```

**Lock overlay UI**:
```html
<div class="lock-overlay" aria-hidden="true">
  <div class="lock-icon">🔒</div>
  <p>Complete the section above to unlock</p>
</div>
```

---

## Concept Callback System

The `CONCEPT_REGISTRY` tracks concepts introduced in earlier labs and sections. When a later section references a registered concept, a Callback card is automatically injected.

```javascript
const CONCEPT_REGISTRY = {
  'prao-loop': {
    label: 'PRAO Loop',
    origin: 'Lab 01, Section 1',
    originHref: 'lab-01-paradigm-shift.html#section-1',
    brief: 'Perceive → Reason → Act → Observe — the four-phase agentic execution cycle'
  },
  'gccf-pattern': {
    label: 'GCCF Prompt Pattern',
    origin: 'Lab 02, Section 1',
    originHref: 'lab-02-first-agent.html#section-1',
    brief: 'Goal + Context + Constraints + Format — structured prompt anatomy for complex tasks'
  },
  'claude-md': {
    label: 'CLAUDE.md',
    origin: 'Lab 01, Section 4',
    originHref: 'lab-01-paradigm-shift.html#section-4',
    brief: 'Persistent context file — briefing document you write once, agent reads every session'
  },
  'mcp-primitive': {
    label: 'MCP Primitives',
    origin: 'Lab 04, Section 1',
    originHref: 'lab-04-mcp-explorer.html#section-1',
    brief: 'Tools (actions), Resources (data), Prompts (templates) — three things MCP servers expose'
  },
  'tcef-pattern': {
    label: 'TCEF Prompt Pattern',
    origin: 'Lab 05, Section 2',
    originHref: 'lab-05-prompt-engineering.html#section-2',
    brief: 'Task + Context + Examples + Format — structured prompt anatomy for complex tasks'
  },
  'skill-anatomy': {
    label: 'Skill Anatomy',
    origin: 'Lab 06, Section 1',
    originHref: 'lab-06-skills-commands.html#section-1',
    brief: 'YAML frontmatter (name, description, triggers) + Markdown instructions = a skill file'
  }
};

function buildCallbackCard(conceptKey) {
  const c = CONCEPT_REGISTRY[conceptKey];
  return `
    <div class="card callback-card" role="note" aria-label="Concept callback: ${c.label}">
      <div class="card-badge callback-badge">🔗 CALLBACK</div>
      <p><strong>${c.label}</strong> — first introduced in <a href="${c.originHref}">${c.origin}</a></p>
      <p class="callback-brief">${c.brief}</p>
      <p>Notice how it appears here in a new form.</p>
    </div>`;
}
```

---

## Accessibility Standards (WCAG AA)

All interactive elements that are not `<button>` or `<a>` must carry:

```html
role="button"
tabindex="0"
aria-label="[descriptive label]"
onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); handler();}"
```

**Textarea accessibility:**
```html
<label for="prediction-text" class="sr-only">Write your prediction here</label>
<textarea id="prediction-text"
  aria-describedby="prediction-hint"
  oninput="saveReflection('prediction-text', this.value)">
</textarea>
<span id="prediction-hint" class="char-counter" aria-live="polite">
  15 characters to activate reveal
</span>
```

**Screen-reader-only class:**
```css
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
}
```

---

## localStorage Persistence

Every learner input auto-saves on `input` event and restores on `DOMContentLoaded`.

```javascript
const LAB_KEY = 'lab-02'; // Change per lab

function saveReflection(key, value) {
  localStorage.setItem(`${LAB_KEY}-${key}`, value);
}

function loadAllReflections() {
  const KEYS = [
    'prediction-text', 'apply-0', 'apply-1', 'apply-2',
    'capstone-challenge', 's0', 's1', 's2', 's3', 's4', 's5'
  ];
  KEYS.forEach(key => {
    const el = document.getElementById(key);
    if (el && el.tagName === 'TEXTAREA') {
      const saved = localStorage.getItem(`${LAB_KEY}-${key}`);
      if (saved) el.value = saved;
    }
    if (key.startsWith('s') && localStorage.getItem(`${LAB_KEY}-${key}`) === '1') {
      sectionComplete[parseInt(key.slice(1))] = true;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadAllReflections();
  xp = parseInt(localStorage.getItem(`${LAB_KEY}-xp`) || '0');
  updateXPDisplay();
  // Re-evaluate all section unlocks
  Object.keys(SECTION_UNLOCK_CONDITIONS).forEach(idx => checkSectionUnlock(parseInt(idx)));
});
```

**Export function** (downloadable `.txt`, replaces `window.print()`):
```javascript
function exportReflections() {
  const sections = document.querySelectorAll('textarea');
  let content = `Lab 02 Reflections — ${new Date().toLocaleDateString()}\n`;
  content += `XP Earned: ${xp}\n\n`;
  sections.forEach(ta => {
    if (ta.value.trim()) {
      content += `[${ta.id}]\n${ta.value.trim()}\n\n`;
    }
  });
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${LAB_KEY}-reflections.txt`;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
```

---

## Navigation Dots

Progress dots at top reflect section completion state.

```javascript
const DOT_STATES = {
  locked:    { class: 'dot-locked',    label: 'Locked' },
  active:    { class: 'dot-active',    label: 'Current' },
  complete:  { class: 'dot-complete',  label: 'Complete' },
};

function updateNavDots(completedIdx) {
  const dots = document.querySelectorAll('.nav-dot');
  dots.forEach((dot, i) => {
    dot.className = 'nav-dot';
    if (i <= completedIdx) dot.classList.add('dot-complete');
    else if (i === completedIdx + 1) dot.classList.add('dot-active');
    else dot.classList.add('dot-locked');
    dot.setAttribute('aria-label', `Section ${i + 1}: ${dot.classList.contains('dot-complete') ? 'Complete' : dot.classList.contains('dot-active') ? 'Current' : 'Locked'}`);
  });
}
```

```css
.nav-dot { width: 8px; height: 8px; border-radius: 50%; transition: all 0.3s ease; }
.dot-locked   { background: var(--text-dim); }
.dot-active   { background: var(--primary); box-shadow: 0 0 8px var(--primary-glow); }
.dot-complete { background: var(--success); }
```

---

## Design System (CSS Custom Properties)

All labs share this design system. **Do not introduce new color variables** — use these exclusively.

```css
:root {
  --bg-base:       #080d1a;
  --bg-surface:    #0f1729;
  --bg-raised:     #172035;
  --bg-glass:      rgba(23,32,53,0.7);
  --primary:       #6366f1;
  --primary-glow:  rgba(99,102,241,0.25);
  --secondary:     #8b5cf6;
  --accent:        #06b6d4;
  --accent-glow:   rgba(6,182,212,0.2);
  --success:       #10b981;
  --warning:       #f59e0b;
  --danger:        #ef4444;
  --text:          #f1f5f9;
  --text-muted:    #94a3b8;
  --text-dim:      #475569;
  --border:        rgba(255,255,255,0.08);
  --border-bright: rgba(99,102,241,0.4);
  --radius:        16px;
  --radius-sm:     8px;
}
```

---

## HTML Shell Template

Every lab begins with this shell. Replace `[LAB_NN]`, `[LAB_TITLE]`, `[SECTION_COUNT]`, and `[PREV/NEXT_LAB]` per lab.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Lab [NN] · [LAB_TITLE] | Agentic AI Engineering</title>
  <style>
    /* ─── Design System ───────────────────────────────────── */
    /* [paste full CSS from Lab 01] */

    /* ─── Lab-Specific Additions ──────────────────────────── */
    .callback-card  { background: rgba(139,92,246,0.06); border: 1px solid rgba(139,92,246,0.3); border-left: 3px solid var(--secondary); }
    .callback-badge { color: var(--secondary); }
    .insight-card   { background: rgba(16,185,129,0.06); border: 1px solid rgba(16,185,129,0.3); border-left: 3px solid var(--success); display: none; }
    .insight-card.revealed { display: block; }
    .xp-display     { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; color: var(--warning); }
    .lock-overlay   { position: absolute; inset: 0; background: rgba(8,13,26,0.85); display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: var(--radius); z-index: 10; }
    .streak-display { font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 20px; }
    .streak-3  { background: rgba(245,158,11,0.15); color: var(--warning); }
    .streak-5  { background: rgba(139,92,246,0.15); color: var(--secondary); }
    .streak-7  { background: rgba(245,158,11,0.2); color: gold; }
    .xp-toast  { position: fixed; top: 80px; right: 24px; background: var(--warning); color: #000; padding: 8px 16px; border-radius: 20px; font-weight: 700; font-size: 13px; animation: toastFade 2s forwards; pointer-events: none; z-index: 9999; }
    @keyframes toastFade { 0%{opacity:0;transform:translateY(-10px)} 20%{opacity:1;transform:translateY(0)} 80%{opacity:1} 100%{opacity:0;transform:translateY(-10px)} }
    .char-hint { font-size: 11px; color: var(--text-muted); margin-top: 4px; }
    .reveal-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  </style>
</head>
<body>

<!-- Progress Bar -->
<div id="progress-bar"></div>

<!-- Navigation -->
<nav>
  <div class="nav-brand">
    <span class="nav-badge">Day [D]</span>
    <span>Lab [NN] · [LAB_TITLE]</span>
  </div>
  <div style="display:flex;align-items:center;gap:20px;">
    <div class="xp-display" aria-live="polite" aria-label="Experience points">
      <span>⚡</span><span id="xp-value">0</span><span style="font-size:11px;color:var(--text-muted)">XP</span>
    </div>
    <div id="streak-display" class="streak-display" style="display:none;"></div>
    <div class="nav-dots" id="nav-dots" aria-label="Lab progress">
      <!-- [SECTION_COUNT] dots rendered by JS -->
    </div>
  </div>
</nav>

<!-- Hero -->
<div style="padding: 120px 32px 60px; max-width: 900px; margin: 0 auto; text-align: center;">
  <div style="font-size:11px; text-transform:uppercase; letter-spacing:2px; color:var(--accent); margin-bottom:16px;">
    Day [D] · Lab [NN]
  </div>
  <h1 style="font-size:clamp(32px,5vw,52px); font-weight:800; line-height:1.15; margin-bottom:20px;">
    [LAB_TITLE]
  </h1>
  <p style="font-size:18px; color:var(--text-muted); max-width:600px; margin:0 auto 32px;">
    [One-sentence hook describing the key tension or question this lab resolves]
  </p>
  <div class="objectives-card">
    <strong>After this lab you will be able to:</strong>
    <ul style="text-align:left; margin-top:12px; padding-left:20px;">
      <li>[Objective 1 — Bloom's verb + measurable outcome]</li>
      <li>[Objective 2]</li>
      <li>[Objective 3]</li>
    </ul>
  </div>
</div>

<!-- Sections -->
<div id="lab-sections" style="max-width:900px; margin:0 auto; padding:0 32px 120px;">
  <!-- Section 0: [FIRST_SECTION_TITLE] -->
  <div class="section-block" id="section-0">
    <!-- content -->
  </div>

  <!-- Section 1–N: ... -->

  <!-- Capstone Challenge (final section) -->
  <div class="section-block locked" id="section-[LAST]" style="position:relative;">
    <div class="lock-overlay" aria-hidden="true">
      <div style="font-size:32px;">🔒</div>
      <p style="color:var(--text-muted);">Complete all sections above to unlock</p>
    </div>
    <!-- capstone challenge content -->
  </div>
</div>

<!-- Completion Banner -->
<div id="completion-banner" style="display:none; background:linear-gradient(135deg,var(--primary),var(--secondary)); padding:60px 32px; text-align:center; margin-top:60px;">
  <div style="font-size:48px; margin-bottom:16px;">🎉</div>
  <h2 style="font-size:32px; font-weight:800; margin-bottom:12px;">Lab [NN] Complete!</h2>
  <p style="color:rgba(255,255,255,0.8); margin-bottom:8px;">Final XP: <strong id="final-xp">[NN]</strong></p>
  <div style="display:flex;gap:16px;justify-content:center;margin-top:32px;flex-wrap:wrap;">
    <button onclick="exportReflections()" class="btn" style="background:white;color:var(--primary);font-weight:700;">
      Export Notes
    </button>
    <a href="[NEXT_LAB].html" class="btn" style="text-decoration:none;background:rgba(255,255,255,0.15);color:white;font-weight:700;">
      Continue to Lab [NEXT_NN] →
    </a>
  </div>
</div>

<script>
  /* ─── State ─────────────────────────────────────────────── */
  const LAB_KEY = 'lab-[NN]';
  const SECTION_COUNT = [N];
  let xp = 0, streak = 0, streakMax = 0;
  let sectionComplete = new Array(SECTION_COUNT).fill(false);

  /* ─── Concept Registry ───────────────────────────────────── */
  const CONCEPT_REGISTRY = { /* ... see full spec above ... */ };

  /* ─── XP System ──────────────────────────────────────────── */
  function awardXP(amount, reason) {
    xp += amount;
    localStorage.setItem(`${LAB_KEY}-xp`, xp.toString());
    updateXPDisplay();
    showXPToast(amount, reason);
  }

  function updateXPDisplay() {
    document.getElementById('xp-value').textContent = xp;
    if (document.getElementById('final-xp')) document.getElementById('final-xp').textContent = xp;
  }

  function showXPToast(amount, reason) {
    const toast = document.createElement('div');
    toast.className = 'xp-toast';
    toast.textContent = `+${amount} XP — ${reason}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2100);
  }

  /* ─── Streak System ──────────────────────────────────────── */
  function updateStreak(correct) {
    if (correct) {
      streak++;
      if (streak > streakMax) streakMax = streak;
      const el = document.getElementById('streak-display');
      if (streak >= 7) { el.style.display='block'; el.className='streak-display streak-7'; el.textContent=`👑 ${streak} streak`; awardXP(25, 'streak bonus'); }
      else if (streak >= 5) { el.style.display='block'; el.className='streak-display streak-5'; el.textContent=`⚡ ${streak} streak`; awardXP(25, 'streak bonus'); }
      else if (streak >= 3) { el.style.display='block'; el.className='streak-display streak-3'; el.textContent=`🔥 ${streak} streak`; awardXP(25, 'streak bonus'); }
    } else {
      streak = 0;
      document.getElementById('streak-display').style.display = 'none';
    }
  }

  /* ─── Section Unlock ─────────────────────────────────────── */
  function markSectionComplete(idx) {
    sectionComplete[idx] = true;
    localStorage.setItem(`${LAB_KEY}-s${idx}`, '1');
    checkSectionUnlock(idx + 1);
    updateNavDots();
    if (idx === SECTION_COUNT - 1) completeLab();
  }

  function checkSectionUnlock(idx) {
    if (idx >= SECTION_COUNT) return;
    const section = document.getElementById(`section-${idx}`);
    if (!section) return;
    const allPriorDone = sectionComplete.slice(0, idx).every(Boolean);
    if (allPriorDone) {
      section.classList.remove('locked');
      const overlay = section.querySelector('.lock-overlay');
      if (overlay) overlay.remove();
    }
  }

  /* ─── Prediction Gate ────────────────────────────────────── */
  function checkPrediction(textareaId, btnId, minChars) {
    const ta = document.getElementById(textareaId);
    const btn = document.getElementById(btnId);
    const remaining = Math.max(0, minChars - ta.value.trim().length);
    const hint = document.getElementById(textareaId + '-hint');
    if (hint) hint.textContent = remaining > 0 ? `${remaining} more characters to activate reveal` : '✓ Ready to reveal';
    btn.disabled = remaining > 0;
    if (remaining === 0) awardXP(10, 'prediction committed');
    saveReflection(textareaId, ta.value);
  }

  /* ─── Persistence ────────────────────────────────────────── */
  function saveReflection(key, value) {
    localStorage.setItem(`${LAB_KEY}-${key}`, value);
  }

  function loadAllReflections() {
    document.querySelectorAll('textarea[id]').forEach(ta => {
      const saved = localStorage.getItem(`${LAB_KEY}-${ta.id}`);
      if (saved) ta.value = saved;
    });
    for (let i = 0; i < SECTION_COUNT; i++) {
      if (localStorage.getItem(`${LAB_KEY}-s${i}`) === '1') sectionComplete[i] = true;
    }
    xp = parseInt(localStorage.getItem(`${LAB_KEY}-xp`) || '0');
    updateXPDisplay();
    for (let i = 0; i < SECTION_COUNT; i++) checkSectionUnlock(i);
    updateNavDots();
  }

  function exportReflections() {
    let content = `Lab [NN]: [LAB_TITLE] — ${new Date().toLocaleDateString()}\nXP Earned: ${xp}\n\n`;
    document.querySelectorAll('textarea[id]').forEach(ta => {
      if (ta.value.trim()) content += `[${ta.id}]\n${ta.value.trim()}\n\n`;
    });
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${LAB_KEY}-reflections.txt`;
    document.body.appendChild(a); a.click();
    URL.revokeObjectURL(url); document.body.removeChild(a);
  }

  /* ─── Navigation ─────────────────────────────────────────── */
  function updateNavDots() {
    const container = document.getElementById('nav-dots');
    if (!container) return;
    if (!container.children.length) {
      for (let i = 0; i < SECTION_COUNT; i++) {
        const dot = document.createElement('div');
        dot.className = 'nav-dot';
        dot.setAttribute('aria-label', `Section ${i+1}`);
        container.appendChild(dot);
      }
    }
    [...container.children].forEach((dot, i) => {
      dot.classList.remove('dot-locked', 'dot-active', 'dot-complete');
      if (sectionComplete[i]) dot.classList.add('dot-complete');
      else if (i === sectionComplete.indexOf(false)) dot.classList.add('dot-active');
      else dot.classList.add('dot-locked');
    });
  }

  /* ─── Scroll Progress ────────────────────────────────────── */
  window.addEventListener('scroll', () => {
    const d = document.documentElement;
    const pct = (d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100;
    document.getElementById('progress-bar').style.width = pct + '%';
  });

  /* ─── Completion ─────────────────────────────────────────── */
  function completeLab() {
    awardXP(100, 'lab complete!');
    const banner = document.getElementById('completion-banner');
    banner.style.display = 'block';
    banner.scrollIntoView({ behavior: 'smooth' });
    localStorage.setItem(`${LAB_KEY}-complete`, Date.now().toString());
    updateNavDots();
  }

  /* ─── Init ───────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', loadAllReflections);
</script>
</body>
</html>
```

---

## Lab 02 Blueprint — First Agent Conversation

**File**: `labs/day1/lab-02-first-agent.html`
**Day**: 1, Session 2
**XP Budget**: 1,000 max
**Section Count**: 6 + Capstone Challenge
**Concept Callbacks**: `prao-loop` (from Lab 01)

### Learning Objectives (Bloom's)
1. **Apply** the GCCF pattern (Goal + Context + Constraints + Format) to write effective Claude Code prompts
2. **Interpret** Claude Code output — distinguish successful tool calls from error states
3. **Diagnose** a prompt failure by mapping it to the PRAO loop phase where it broke
4. **Construct** a multi-turn conversation that maintains context across prompts

### Section Breakdown

**Section 0: Why Prompts Fail (Concept Introduction)**
- Activate: "You gave Claude Code a task. It did something — but not what you wanted. What happened?"
- Frame: Show three bad prompt examples with bad outputs. Ask: which PRAO phase broke?
- **Callback card**: `prao-loop` triggered — reminds learner of the four phases from Lab 01
- Info card: "The quality of your Perceive phase determines everything downstream. Bad input → bad reasoning → bad action."
- Reveal: Diagnoses for each example (Perceive failed — no context; Reason failed — ambiguous goal; etc.)
- Connect Forward: "The GCCF pattern is a recipe for feeding Perceive correctly."

**Section 1: The GCCF Pattern (Prediction Challenge)**
- Predict: "Before seeing the pattern, write what you think a 'complete' prompt needs."
- Reveal: G-C-C-F anatomy — Goal, Context, Constraints, Format
  - Goal: What exactly to produce (not "improve this" — "add TypeScript types to all function parameters")
  - Context: What agent needs to know first (files, constraints, existing patterns)
  - Constraints: What not to do (don't rename variables, keep line count under 50)
  - Format: How output should be structured (typed error object, JSON schema, plain text)
- Apply: Write a GCCF prompt for a given scenario (adding error handling to an async function)
- **Insight card** (post-Apply): "Notice: every word in a prompt either helps or hurts Perceive. GCCF is a filter for words that help."
- Connect Forward: "Now let's see what happens when Claude runs a GCCF prompt."

**Section 2: Reading Output (Interactive Simulation)**
- Predict: "Claude ran your prompt. Here's the first line of output. What does it mean?"
- Simulation: Annotated trace of a successful tool call sequence
  - Each step labeled: THINK / TOOL CALL / TOOL RESULT / RESPONSE
  - Color-coded: cyan (THINK), amber (TOOL CALL), green (TOOL RESULT), white (RESPONSE)
  - Click any step to expand its explanation
- Apply: "Map each line of this real output to its PRAO phase."
- Insight: "When Claude says 'I'll look at the file first' — that's the transition from Reason to Act. The sentence structure tells you what phase you're watching."
- Knowledge Check Q1: "This output line says 'Found 3 functions without type annotations'. Which PRAO phase produced this?"
  - A) Perceive — reading the file (CORRECT)
  - B) Reason — planning the approach (INCORRECT: "Reason happens after reading. This IS the reading.")
  - C) Act — executing the change (INCORRECT: "Act writes changes; this reports a finding from a read.")
  - D) Observe — checking the result (INCORRECT: "Observe comes after Act. No action has been taken yet.")

**Section 3: When Things Go Wrong (Knowledge Check + Simulation)**
- Info: Three error patterns with signatures:
  - Permission denied → check `settings.json` allow list
  - Tool timeout → reduce task scope, add explicit file references
  - Confusion loop → Claude asks clarifying questions because Perceive had insufficient context
- Simulation: Error recovery trace — shows Claude hitting permission denied, how you'd fix it, re-run
- Knowledge Check Q2: "Claude is asking 'Which file should I modify?' on a task you thought was clear. What's the root cause?"
  - A) The task is too hard for Claude (INCORRECT: "Difficulty ≠ confusion. The agent has the capability.")
  - B) Your prompt didn't specify Context — Claude is asking to complete its Perceive phase (CORRECT)
  - C) You need to restart the conversation (INCORRECT: "Answer the question in the same conversation.")
  - D) Claude has a bug (INCORRECT: "Clarification requests are a feature — the agent is being honest about uncertainty.")
- Apply: Given a bad prompt + error output, write the fixed GCCF version (40+ chars)

**Section 4: Conversation Threading (Concept Introduction + Apply)**
- Frame: "Claude has no memory between separate claude invocations. Within one session: context accumulates. Between sessions: CLAUDE.md is your bridge."
- **Callback card**: `claude-md` (from Lab 01) — "CLAUDE.md was introduced in Lab 01 as persistent context. Here's how it prevents the 'explain again' problem."
- Info: Three threading patterns:
  1. Single-shot: `-p "task"` — stateless, no prior context
  2. Multi-turn: Interactive session — context accumulates within session
  3. Persistent via CLAUDE.md: Decisions, patterns, and codebase context survive across sessions
- Knowledge Check Q3: "You've explained your project's naming convention in three separate claude sessions. What's the right fix?"
  - A) Repeat it in every prompt (INCORRECT: "This scales to zero. Every new task needs the repetition.")
  - B) Add it to CLAUDE.md (CORRECT: "CLAUDE.md is read at the start of every session. Write it once.")
  - C) Use a different AI tool (INCORRECT: "The problem is context persistence, not the tool.")
  - D) Keep all work in one session (INCORRECT: "Sessions end. CLAUDE.md persists.")
- Apply: Write a CLAUDE.md entry for a given project description (40+ chars)

**Section 5: Putting It Together (Knowledge Check)**
- Knowledge Check Q4: "You run `claude -p 'Fix the bug in my app'`. Claude edits the wrong file. Which phase failed first?"
  - A) Perceive — the prompt gave no file context (CORRECT: "No context = Perceive can't locate the right file.")
  - B) Reason — Claude chose the wrong fix (INCORRECT: "Reason can only work with what Perceive gathered. Fix Perceive first.")
  - C) Act — the edit was wrong (INCORRECT: "The act followed from a flawed reason which followed from flawed perception.")
  - D) Observe — Claude should have checked before editing (INCORRECT: "Observe happens after Act. The problem began earlier.")

**Capstone Challenge (Section 6)**
- Context: "You've inherited a codebase. You need Claude Code to add comprehensive error handling to an async API layer. You have 10 minutes before a demo."
- Task: Write a complete interaction plan:
  1. The GCCF prompt you'd use
  2. What you'd add to CLAUDE.md before running it
  3. One error you'd expect and how to handle it
  4. How you'd verify the output before the demo
- Self-evaluation: Compare to model answer using 4 behavioral anchors
  - Distinguished: All four components present, constraints are specific, error recovery is realistic
  - Proficient: Three components present, goals are measurable
  - Developing: Two components present
  - Beginning: One component or vague/generic responses
- XP: 50 on completion

---

## Lab 03 Blueprint — Agent Thinking (OpenCode)

**File**: `labs/day1/lab-03-agent-thinking.html`
**Concepts covered**: Chain-of-thought, tool call sequences, when agents ask for clarification, reading extended thinking
**Callbacks**: `prao-loop`, `gccf-pattern`

*Full section design follows same template — section outlines to be written during implementation.*

---

## Labs 04–09 Concept Thread Map

| Lab | Title | New Concepts | Callbacks |
|-----|-------|--------------|-----------|
| 04 | MCP Explorer | `mcp-primitive`, tool/resource/prompt anatomy | `prao-loop` |
| 05 | Prompt Engineering | `tcef-pattern`, context injection, constraint spec | `gccf-pattern`, `prao-loop` |
| 06 | Skills & Commands | `skill-anatomy`, YAML frontmatter, triggers | `mcp-primitive`, `tcef-pattern` |
| 07 | Multi-Agent Orchestrator | agent roles, task decomposition, result aggregation | `prao-loop`, `skill-anatomy` |
| 08 | Production Patterns | sandbox, secrets, cost, monitoring | `mcp-primitive`, `skill-anatomy` |
| 09 | Capstone | full pipeline, Context7 adaptation, peer review | All registered concepts |

---

## Quality Gates (Per Lab)

Before any lab is marked complete, it must pass:

- [ ] All interactive elements WCAG AA compliant (role, tabindex, aria-label, keyboard handler)
- [ ] No external dependencies (self-contained HTML)
- [ ] Load time < 2 seconds (measured in browser DevTools, throttled to Fast 3G)
- [ ] localStorage persistence works: refresh restores all textarea content and section states
- [ ] Per-option incorrect feedback names a specific misconception (not "Try again")
- [ ] Capstone Challenge has 4-level behavioral rubric
- [ ] All `<a><button>` nesting eliminated (use `<a class="btn">` pattern)
- [ ] XP system awards correct points per schedule above
- [ ] Concept Registry includes all new concepts introduced
- [ ] All technical claims verified against official docs (no confabulated CLI flags)
- [ ] Section unlock gates enforced (cannot skip ahead without completing)

---

*This document is the canonical specification for all Agentic AI Engineering course labs. Labs 01–09 conform to this framework. Lab 01 was implemented prior to this spec; Labs 02–09 implement it from scratch.*
