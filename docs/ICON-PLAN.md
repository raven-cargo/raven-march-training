# ICON-PLAN.md — Emoji-to-Icon Replacement Plan

**Version**: 1.0
**Date**: 2026-03-16
**Scope**: All HTML files in the agentic-ai-course project
**Status**: Ready for agent execution

---

## 1. Executive Summary

### Emoji counts per file (HTML files only)

| File | Lines with emojis | Semantic (replace) | Decorative (remove) | JS-only (leave/simplify) |
|------|--------------------|-------------------|---------------------|--------------------------|
| `index.html` | 68 | 8 | 4 | 56 |
| `module-viewer.html` | 32 | 3 | 0 | 29 |
| `labs/day1/lab-01-setup.html` | FILE NOT FOUND | — | — | — |
| `labs/day1/lab-02-first-agent.html` | 97 | 17 | 1 | 79 |
| `labs/day1/lab-03-agent-thinking.html` | 119 | 20 | 1 | 98 |
| `labs/day2/lab-04-mcp-explorer.html` | 142 | 32 | 3 | 107 |
| `labs/day2/lab-05-build-mcp.html` | FILE NOT FOUND | — | — | — |
| `labs/day2/lab-06-skills-commands.html` | 108 | 28 | 1 | 79 |
| `labs/day3/lab-07-multi-agent.html` | 124 | 28 | 1 | 95 |
| `labs/day3/lab-08-production.html` | 108 | 39 | 1 | 68 |
| `labs/day3/lab-09-capstone.html` | 95 | 23 | 0 | 72 |

**Total HTML lines audited**: ~893 across 9 existing files
**Markdown files**: 12 files, ~250 lines with emojis (handled separately — see Section 5)

**Note on "JS-only"**: Many emojis appear only inside `<script>` blocks as `textContent` strings
(e.g., `'✓ Ready'`, `'🏁 Milestone reached'`, streak displays). These are set dynamically
via JavaScript and are handled with Option A/B rules documented in Section 2d.

### Recommended Icon Pack: Lucide Icons

**Winner: Lucide Icons** (MIT license, https://lucide.dev)

Reasons:
- 1,500+ icons covers every semantic emoji in this codebase
- CDN-ready: one script tag, zero build step
- Activates via `<svg data-lucide="name">` + `lucide.createIcons()` — trivially replaces inline emojis
- Stroke-based SVG scales perfectly at any size and inherits CSS `color`
- Actively maintained (2025 releases)
- Lighter than Phosphor/Tabler for this icon coverage scope

**CDN URL**:
```
https://unpkg.com/lucide@latest/dist/umd/lucide.min.js
```

---

## 2. Integration Pattern

### 2a. Script tags to add to each HTML file

Add these two lines immediately before `</body>` in every HTML file:

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<script>lucide.createIcons();</script>
```

**Important**: If the file already has a `<script>` block right before `</body>`, insert the
Lucide script tag BEFORE that block, and call `lucide.createIcons()` at the END of the
existing init script instead of as a separate inline tag.

### 2b. CSS to add to each file's `<style>` block

Add this rule anywhere inside the existing `<style>` block (after the last rule, before `</style>`):

```css
/* ── Lucide icon sizing ── */
.lucide {
  width: 1em;
  height: 1em;
  vertical-align: -0.125em;
  stroke-width: 2;
  display: inline-block;
}
```

### 2c. Icon usage pattern

Every semantic emoji replacement uses this HTML:

```html
<svg data-lucide="ICON-NAME" class="lucide"></svg>
```

The `lucide.createIcons()` call (fired after DOM is ready) replaces all `data-lucide` SVGs
with the correct icon. The `.lucide` class controls sizing so the icon matches surrounding text.

### 2d. Dynamically-set emojis in JavaScript

For emojis set via `textContent` inside `<script>` blocks (e.g., streak displays, toast
messages, button state), use one of two options:

**Option A — Text replacement** (recommended for toasts and button labels):
```js
// Before:
toast.textContent = '🏁 Milestone reached: ' + entry.label;
// After:
toast.textContent = 'Milestone reached: ' + entry.label;
```

**Option B — innerHTML with icon** (for persistent UI elements where icon adds visual meaning):
```js
// Before:
el.textContent = `👑 ${streak} streak`;
// After:
el.innerHTML = `<svg data-lucide="crown" class="lucide"></svg> ${streak} streak`;
lucide.createIcons();  // MUST be called again after DOM mutation
```

Use Option A for ephemeral notifications. Use Option B only for visible persistent elements.

---

## 3. Complete Emoji → Lucide Icon Mapping

### Semantic emoji mappings (all files)

| Emoji | Meaning in context | Lucide icon name | Replacement HTML |
|-------|--------------------|-----------------|-----------------|
| 🎯 | Challenge / goal / target | `target` | `<svg data-lucide="target" class="lucide"></svg>` |
| 🔗 | Callback / link / cross-reference | `link` | `<svg data-lucide="link" class="lucide"></svg>` |
| 💡 | Insight / tip / lightbulb | `lightbulb` | `<svg data-lucide="lightbulb" class="lucide"></svg>` |
| 🔒 | Locked section | `lock` | `<svg data-lucide="lock" class="lucide"></svg>` |
| 🔐 | Security / permission | `shield-check` | `<svg data-lucide="shield-check" class="lucide"></svg>` |
| 🛡️ | Validation / shield | `shield` | `<svg data-lucide="shield" class="lucide"></svg>` |
| ✅ | Correct / pass / success (visible HTML) | `check-circle` | `<svg data-lucide="check-circle" class="lucide"></svg>` |
| ❌ | Wrong / fail / error (visible HTML) | `x-circle` | `<svg data-lucide="x-circle" class="lucide"></svg>` |
| ⚠️ | Warning / caution (visible HTML) | `alert-triangle` | `<svg data-lucide="alert-triangle" class="lucide"></svg>` |
| 🚀 | Launch / deploy | `rocket` | `<svg data-lucide="rocket" class="lucide"></svg>` |
| 🔍 | Search / explore | `search` | `<svg data-lucide="search" class="lucide"></svg>` |
| 🏗️ | Build challenge | `hammer` | `<svg data-lucide="hammer" class="lucide"></svg>` |
| 🧪 | Lab / test / experiment | `flask-conical` | `<svg data-lucide="flask-conical" class="lucide"></svg>` |
| 📚 | Curriculum / books | `library-big` | `<svg data-lucide="library-big" class="lucide"></svg>` |
| 📊 | Stats / rubric / chart | `bar-chart-2` | `<svg data-lucide="bar-chart-2" class="lucide"></svg>` |
| 📋 | Info / clipboard | `clipboard` | `<svg data-lucide="clipboard" class="lucide"></svg>` |
| 📝 | Documentation / notes | `file-text` | `<svg data-lucide="file-text" class="lucide"></svg>` |
| 📅 | Date / calendar | `calendar` | `<svg data-lucide="calendar" class="lucide"></svg>` |
| 📄 | Resource / document | `file` | `<svg data-lucide="file" class="lucide"></svg>` |
| 📥 | Download slide decks | `download` | `<svg data-lucide="download" class="lucide"></svg>` |
| 📹 | Video / explainer | `video` | `<svg data-lucide="video" class="lucide"></svg>` |
| ▶ | Play / video icon | `play` | `<svg data-lucide="play" class="lucide"></svg>` |
| 🔧 | Tool / wrench | `wrench` | `<svg data-lucide="wrench" class="lucide"></svg>` |
| 🔄 | Callback loop / refresh | `refresh-cw` | `<svg data-lucide="refresh-cw" class="lucide"></svg>` |
| 🔁 | Repeat / PRAO trace | `repeat` | `<svg data-lucide="repeat" class="lucide"></svg>` |
| 🤖 | Agent / robot | `bot` | `<svg data-lucide="bot" class="lucide"></svg>` |
| 💬 | Prompt / chat | `message-square` | `<svg data-lucide="message-square" class="lucide"></svg>` |
| 🎓 | Course complete / graduation | `graduation-cap` | `<svg data-lucide="graduation-cap" class="lucide"></svg>` |
| 🎙️ | Audio / voice / next-steps | `mic` | `<svg data-lucide="mic" class="lucide"></svg>` |
| ⚡ | XP / energy / fast | `zap` | `<svg data-lucide="zap" class="lucide"></svg>` |
| ⬇️ | Download button arrow | `arrow-down` | `<svg data-lucide="arrow-down" class="lucide"></svg>` |
| 🗄️ | Database / storage | `database` | `<svg data-lucide="database" class="lucide"></svg>` |
| ⚔️ | Boss challenge | `swords` | `<svg data-lucide="swords" class="lucide"></svg>` |
| 🧮 | Calculator | `calculator` | `<svg data-lucide="calculator" class="lucide"></svg>` |
| ✍️ | Apply task / write | `pen-line` | `<svg data-lucide="pen-line" class="lucide"></svg>` |
| ⭐ | Highlight / star | `star` | `<svg data-lucide="star" class="lucide"></svg>` |
| 🎮 | Interactive game / matcher | `gamepad-2` | `<svg data-lucide="gamepad-2" class="lucide"></svg>` |
| 🃏 | Flashcard | `layers` | `<svg data-lucide="layers" class="lucide"></svg>` |

### JS-only emojis — Option A (remove emoji, keep text)

| Emoji | JS context | Recommended replacement |
|-------|------------|------------------------|
| `👑` | `'👑 ' + streak + ' streak'` | `streak + ' streak — excellent consistency'` |
| `⚡` | `` `⚡ ${streak} streak` `` | `` `${streak} streak — strong consistency` `` |
| `🔥` | `` `🔥 ${streak} streak` `` | `` `${streak} streak — steady progress` `` |
| `🏁` | `'🏁 Milestone reached: '` | `'Milestone reached: '` |
| `✅` | `btn.textContent = '✅ Submitted!'` | `btn.textContent = 'Submitted!'` |
| `❌` | `div.innerHTML = '❌ Please fill...'` | `div.innerHTML = 'Please fill...'` |

### Decorative emojis — remove entirely

| Emoji | Context | Action |
|-------|---------|--------|
| 🎉 | Celebration banner large div (48px) | Remove emoji; CSS/styling carries the meaning |
| 🎬 | Section decorations | Remove |

---

## 4. Per-File Agent Tasks

Agent rules that apply to ALL files:
1. Read the file first before any edit.
2. Line numbers in this plan are from the audit snapshot. If another agent has already made edits, re-read the file to find updated line numbers.
3. The `.lucide` CSS class and Lucide script must be in place before making icon replacements.
4. Preserve all surrounding HTML — only replace the emoji character or emoji span.

---

### File: index.html

**Path**: `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/index.html`
**Agent task**: Add Lucide integration. Replace 8 semantic emojis in HTML.

**Lucide integration** (add to file):
- CSS `.lucide` rule inside `<style>` block
- Two Lucide script tags before `</body>`

**Replacements** (original line numbers from audit):

```
Line 268: 📅  →  <svg data-lucide="calendar" class="lucide"></svg>
          Context: <div class="meta-pill">📅 <strong>Built</strong> 2026-03-15</div>

Line 269: 🧪  →  <svg data-lucide="flask-conical" class="lucide"></svg>
          Context: <div class="meta-pill">🧪 <strong>9</strong> Interactive Labs</div>

Line 270: 📚  →  <svg data-lucide="library-big" class="lucide"></svg>
          Context: <div class="meta-pill">📚 <strong>12</strong> Curriculum Modules</div>

Line 271: ✅  →  <svg data-lucide="check-circle" class="lucide"></svg>
          Context: <div class="meta-pill">✅ <strong>Validation</strong> PASS...</div>

Line 289: 🛡️  →  <svg data-lucide="shield" class="lucide"></svg>
          Context: <div class="val-icon">🛡️</div>

Line 556: 🎙️  →  <svg data-lucide="mic" class="lucide"></svg>
          Context: <div class="mm-icon">🎙️</div>

Line 565: 📹  →  <svg data-lucide="video" class="lucide"></svg>
          Context: <div class="mm-subsection-title">📹 Explainer Videos...</div>

Line 630: 📊  →  <svg data-lucide="bar-chart-2" class="lucide"></svg>
          Context: <div class="mm-subsection-title">📊 Slide Decks...</div>

Line 633-693 (13 instances): 📥  →  <svg data-lucide="download" class="lucide"></svg>
          Context: <div class="mm-icon">📥</div>  (repeats for each slide deck)

Line 700: 🃏  →  <svg data-lucide="layers" class="lucide"></svg>
          Context: <div class="mm-subsection-title">🃏 Flashcards...</div>

Lines 703, 711: 🃏  →  <svg data-lucide="layers" class="lucide"></svg>
          Context: <div class="mm-icon">🃏</div>

Lines 568-623 (12 instances): ▶  →  <svg data-lucide="play" class="lucide"></svg>
          Context: <div class="mm-icon">▶</div>

Line 720: 🔗  →  <svg data-lucide="link" class="lucide"></svg>
          Context: 🔗 Open NotebookLM notebook...
```

**JS content — leave unchanged**: `✓ Done` pill text at lines 312–545 are plain Unicode check marks used as text content. Do not change.

---

### File: module-viewer.html

**Path**: `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/module-viewer.html`
**Agent task**: Add Lucide integration. Replace 2 HTML emojis. Handle 1 JS emoji with Option B.

**Lucide integration** (add to file):
- CSS `.lucide` rule inside `<style>` block
- Lucide script tag before `</body>`. Call `lucide.createIcons()` at the END of the existing init script rather than adding a separate inline tag.

**Replacements**:

```
Line 453: ⚠  →  <svg data-lucide="alert-triangle" class="lucide"></svg>
          Context: <h2>⚠ Module not found</h2>

Line 778: 💡  →  Option B (JS injection)
          Context: icon.textContent = '💡';
          Replace with: icon.innerHTML = '<svg data-lucide="lightbulb" class="lucide"></svg>';
          Then add: lucide.createIcons(); on the next line.

Line 994: 🎓  →  Option B (JS innerHTML injection)
          Context: '<div class="complete-icon">🎓</div>'
          Replace with: '<div class="complete-icon"><svg data-lucide="graduation-cap" class="lucide"></svg></div>'
          Add lucide.createIcons() call after the element is appended to the DOM.
```

**Leave unchanged**: `✓` at lines 723, 951, 965 — plain Unicode text node values, not emoji.

---

### File: labs/day1/lab-02-first-agent.html

**Path**: `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/labs/day1/lab-02-first-agent.html`
**Agent task**: Add Lucide integration. Replace 17 semantic emojis in HTML. Remove 1 decorative. Handle 4 JS emojis with Option A.

**Lucide integration**: Add CSS rule + script tags.

**HTML Replacements**:

```
Line 505:  ⚡  →  <svg data-lucide="zap" class="lucide"></svg>
           Context: <span>⚡</span><span id="xp-value">0</span>...

Line 550:  🔗  →  <svg data-lucide="link" class="lucide"></svg>
           Context: <div class="card-badge callback-badge">🔗 CALLBACK</div>

Line 565, 572, 579: ⚠  →  <svg data-lucide="alert-triangle" class="lucide"></svg>
           Context: <div class="bad-prompt-diag">⚠ Perceive had no file context...</div>
           (three instances in bad-prompt-diag divs)

Line 607:  🔒  →  <svg data-lucide="lock" class="lucide"></svg>
           Context: <div style="font-size:32px;">🔒</div>

Line 619:  🎯  →  <svg data-lucide="target" class="lucide"></svg>
           Context: <div class="card-badge challenge-badge">🎯 CHALLENGE</div>

Line 675:  🎯  →  <svg data-lucide="target" class="lucide"></svg>
           Context: <div class="card-badge challenge-badge">🎯 APPLY</div>

Line 698:  💡  →  <svg data-lucide="lightbulb" class="lucide"></svg>
           Context: <div class="card-badge insight-badge">💡 INSIGHT</div>

Line 714:  🔒  →  <svg data-lucide="lock" class="lucide"></svg>
Line 726:  🎯  →  <svg data-lucide="target" class="lucide"></svg>
Line 756:  🎯  →  <svg data-lucide="target" class="lucide"></svg>
Line 814:  🔒  →  <svg data-lucide="lock" class="lucide"></svg>
Line 928:  🎯  →  <svg data-lucide="target" class="lucide"></svg>
Line 963:  🔒  →  <svg data-lucide="lock" class="lucide"></svg>
Line 981:  🔗  →  <svg data-lucide="link" class="lucide"></svg>
Line 1058: 🎯  →  <svg data-lucide="target" class="lucide"></svg>
Line 1092: 🔒  →  <svg data-lucide="lock" class="lucide"></svg>
Line 1164: 🔒  →  <svg data-lucide="lock" class="lucide"></svg>
Line 1181: 🎯  →  <svg data-lucide="target" class="lucide"></svg>
           Context: <div class="card-badge challenge-badge">🎯 CAPSTONE CHALLENGE</div>
```

**Decorative — remove**:
```
Line 1263: 🎉  →  Remove the emoji character only.
           Context: <div style="font-size:48px;margin-bottom:16px;">🎉</div>
           After: <div style="font-size:48px;margin-bottom:16px;"></div>
           (The container div with styling can remain; only remove the emoji text node)
```

**JS emojis — Option A**:
```
Line 1369: '🏁 Milestone reached: '  →  'Milestone reached: '
Line 1384: '👑 ' + streak + ' streak — excellent consistency'
           →  streak + ' streak — excellent consistency'
Line 1388: '⚡ ' + streak + ' streak — strong consistency'
           →  streak + ' streak — strong consistency'
Line 1392: '🔥 ' + streak + ' streak — steady progress'
           →  streak + ' streak — steady progress'
```

---

### File: labs/day1/lab-03-agent-thinking.html

**Path**: `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/labs/day1/lab-03-agent-thinking.html`
**Agent task**: Add Lucide integration. Replace 20 semantic emojis in HTML. Remove 1 decorative. Handle 4 JS emojis with Option A.

**IMPORTANT NOTE**: Lines 788–833 contain ✓, ✗, ⚠ characters labeling tool-call patterns
(e.g., `✓ Healthy`, `⚠ Watch scope`, `✗ Danger`). These are plain Unicode symbols used
intentionally as semantic status indicators in the pattern-card HTML. Do NOT replace them.

**Lucide integration**: Add CSS rule + script tags.

**HTML Replacements**:

```
Line 568:  ⚡  →  <svg data-lucide="zap" class="lucide"></svg>
           Context: <span>⚡</span><span id="xp-value">0</span>...

Line 657:  🔗  →  <svg data-lucide="link" class="lucide"></svg>
Line 674:  🔒  →  <svg data-lucide="lock" class="lucide"></svg>
Line 685:  🎯  →  <svg data-lucide="target" class="lucide"></svg>
Line 720:  🎯  →  <svg data-lucide="target" class="lucide"></svg>
Line 733:  💡  →  <svg data-lucide="lightbulb" class="lucide"></svg>
Line 771:  🔒  →  <svg data-lucide="lock" class="lucide"></svg>
Line 840:  🎯  →  <svg data-lucide="target" class="lucide"></svg>
Line 868:  🎯  →  <svg data-lucide="target" class="lucide"></svg>
Line 881:  ✓   →  <svg data-lucide="check-circle" class="lucide"></svg>
           Context: <div class="card-badge check-badge">✓ CHECK — Q2 of 5</div>
           (and all other check-badge divs with ✓ CHECK pattern)

Line 906:  ✓   →  <svg data-lucide="check-circle" class="lucide"></svg>
           Context: <div class="card-badge check-badge">✓ CHECK — Q1 of 5</div>

Line 1004: ✓   →  <svg data-lucide="check-circle" class="lucide"></svg>
Line 1028:–1033 section: 🔒  →  <svg data-lucide="lock" class="lucide"></svg>
Line 1092: 🎯  →  <svg data-lucide="target" class="lucide"></svg>
Line 1105: 🔗  →  <svg data-lucide="link" class="lucide"></svg>
Line 1112: 💡  →  <svg data-lucide="lightbulb" class="lucide"></svg>
Line 1128: 🔒  →  <svg data-lucide="lock" class="lucide"></svg>
Line 1141: ✓   →  <svg data-lucide="check-circle" class="lucide"></svg>
Line 1166: ✓   →  <svg data-lucide="check-circle" class="lucide"></svg>
Line 1192: 🏗️  →  <svg data-lucide="hammer" class="lucide"></svg>
           Context: <span class="build-badge">🏗️ Build Challenge</span>

Line 1239: ⚠️  →  <svg data-lucide="alert-triangle" class="lucide"></svg>
           Context: ⚠️ Error in production logs: <code>PrismaClientKnownRequestError</code>

Line 1289: ✅  →  <svg data-lucide="check-circle" class="lucide"></svg>
           Context: <strong style="color:var(--secondary,#6366f1);">✅ Model Answer:</strong>

Line 1318: 🔒  →  <svg data-lucide="lock" class="lucide"></svg>
Line 1390: 🎯  →  <svg data-lucide="target" class="lucide"></svg>
           Context: <div class="card-badge challenge-badge">🎯 BOSS CHALLENGE</div>
```

**Decorative — remove**:
```
Line 1483: 🎉  →  Remove emoji character only.
           Context: <div style="font-size:48px;margin-bottom:16px;">🎉</div>
```

**JS emojis — Option A**:
```
Line 1535: '🏁 Milestone reached: '  →  'Milestone reached: '
Line 1617: `👑 ${streak} streak`  →  `${streak} streak`
Line 1622: `⚡ ${streak} streak`  →  `${streak} streak`
Line 1627: `🔥 ${streak} streak`  →  `${streak} streak`
```

---

### File: labs/day2/lab-04-mcp-explorer.html

**Path**: `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/labs/day2/lab-04-mcp-explorer.html`
**Agent task**: Add Lucide integration. Replace 32 semantic emojis in HTML. Remove 2 decorative. Handle JS emojis.
**This is the most emoji-heavy file — work carefully and verify each replacement.**

**Lucide integration**: Add CSS rule + script tags.

**HTML Replacements**:

```
Line 893:  🔄  →  <svg data-lucide="refresh-cw" class="lucide"></svg>
           Context: <span class="cb-icon">🔄</span>

Line 918:  🤖  →  <svg data-lucide="bot" class="lucide"></svg>
           Context: <span class="arch-emoji">🤖</span>

Line 935:  ⚡  →  <svg data-lucide="zap" class="lucide"></svg>
           Context: <span class="arch-emoji">⚡</span>

Line 952:  🗄️  →  <svg data-lucide="database" class="lucide"></svg>
           Context: <span class="arch-emoji">🗄️</span>

Line 960:  ✅  →  <svg data-lucide="check-circle" class="lucide"></svg>
           Context: ✅ Architecture understood! Section 1 is now unlocked.
           (This is visible text in an unlock message element)

Line 970:  🔒  →  <svg data-lucide="lock" class="lucide"></svg>
           Context: <span class="lock-icon">🔒</span>

Line 984:  🎯  →  <svg data-lucide="target" class="lucide"></svg>
           Context: <h3>🎯 Predict First</h3>

Line 1007: 🔧  →  <svg data-lucide="wrench" class="lucide"></svg>
           Context: <span class="prim-name">🔧 Tools</span>

Line 1017: 📄  →  <svg data-lucide="file" class="lucide"></svg>
           Context: <span class="prim-name">📄 Resources</span>

Line 1027: 💬  →  <svg data-lucide="message-square" class="lucide"></svg>
           Context: <span class="prim-name">💬 Prompts</span>

Line 1036: 🎮  →  <svg data-lucide="gamepad-2" class="lucide"></svg>
           Context: <h3>🎮 Primitive Matcher — Apply Challenge</h3>

Line 1057: 🔒  →  <svg data-lucide="lock" class="lucide"></svg>
Line 1071: 🎯  →  <svg data-lucide="target" class="lucide"></svg>

Line 1126: ⚠️  →  <svg data-lucide="alert-triangle" class="lucide"></svg>
           Context: <strong>⚠️ SSE Deprecated:</strong>

Line 1130: ✍️  →  <svg data-lucide="pen-line" class="lucide"></svg>
           Context: <h3>✍️ Apply Task</h3>

Line 1160: ✅  →  <svg data-lucide="check-circle" class="lucide"></svg>
           Context: ✅ Transport config understood! Section 3 is now unlocked.

Line 1170: 🔒  →  <svg data-lucide="lock" class="lucide"></svg>

Line 1185: 🔍  →  <svg data-lucide="search" class="lucide"></svg>
           Context: <h3>🔍 Interactive Schema Explorer</h3>

Line 1201: ⭐  →  <svg data-lucide="star" class="lucide" style="color:var(--warning);"></svg>
           Context: <span class="schema-hint">⭐ click ▾</span>

Line 1204: ⭐  →  <svg data-lucide="star" class="lucide" style="color:var(--warning);"></svg>
           Context: <span class="star">⭐</span> <strong>description</strong>...

Line 1270: ✍️  →  <svg data-lucide="pen-line" class="lucide"></svg>
           Context: <h3>✍️ Apply Challenge — Write a Tool Schema</h3>

Line 1320: 🏗️  →  <svg data-lucide="hammer" class="lucide"></svg>
           Context: <span class="build-badge">🏗️ Build Challenge</span>

Line 1358: ✅  →  <svg data-lucide="check-circle" class="lucide"></svg>
           Context: <strong style="color:var(--secondary,#6366f1);">✅ Model Answer:</strong>

Line 1403: ✅  →  <svg data-lucide="check-circle" class="lucide"></svg>
           Context: ✅ Schema mastered! Section 4 is now unlocked.

Line 1412: 🔒  →  <svg data-lucide="lock" class="lucide"></svg>

Line 1425: 🔄  →  <svg data-lucide="refresh-cw" class="lucide"></svg>
           Context: <span class="cb-icon">🔄</span>

Line 1433: 🔁  →  <svg data-lucide="repeat" class="lucide"></svg>
           Context: <h3>🔁 Interactive PRAO Trace — MCP Tool Call</h3>

Line 1481: ✅  →  <svg data-lucide="check-circle" class="lucide"></svg>
           Context: <h3>✅ Knowledge Checks</h3>

Line 1498: 🔒  →  <svg data-lucide="lock" class="lucide"></svg>

Line 1503: ⚔️  →  <svg data-lucide="swords" class="lucide"></svg>
           Context: <div class="section-badge" ...>⚔️</div>

Line 1511: 🎯  →  <svg data-lucide="target" class="lucide"></svg>
           Context: <h3 style="color:var(--warning);">🎯 Scenario</h3>

Line 1584: ⬇️  →  <svg data-lucide="arrow-down" class="lucide"></svg>
           Context: <button ...>⬇️ Download as .txt</button>

Line 1601: 🎓  →  <svg data-lucide="graduation-cap" class="lucide"></svg>
           Context: <div style="font-size:2rem;margin-bottom:8px;">🎓</div>
```

**Decorative — remove**:
```
Line 1047: 🎉  →  Remove emoji only. Keep text: "Primitives mastered! Section 2 is now unlocked. +20 XP"
Line 1489: 🎉  →  Remove emoji only. Keep text: "Knowledge checks passed! Section 5 unlocked."
```

**JS emojis — Option A** (in `<script>` blocks):
```
Line 1678: '🏁 Milestone reached: '  →  'Milestone reached: '
Line 1709: '+3 Streak! 🔥 Bonus 25 XP'  →  '+3 Streak! Bonus 25 XP'
Line 1712: '+5 Streak! 🔥 Bonus 50 XP'  →  '+5 Streak! Bonus 50 XP'
```

**JS feedback strings** (lines 2019, 2039, 2050, 2154, 2184, 2253, 2280, 2297, 2305, 2317,
2337, 2393, 2403, 2446, 2451, 2453) — these ✅ and ❌ appear in JavaScript string
concatenation as feedback text. Apply Option A:
```
`✅ Correct! ${scenario.reason}`          →  `Correct! ${scenario.reason}`
`❌ This is a ${scenario.answer}...`      →  `Incorrect: this is a ${scenario.answer}...`
`✅ ${correctCount}/6 correct — ...`      →  `${correctCount}/6 correct — ...`
`❌ ${correctCount}/6 — Need 5 correct.`  →  `${correctCount}/6 — Need 5 correct. Try again.`
`'✅ Prediction recorded!'`               →  `'Prediction recorded!'`
`'✅ Submitted! +20 XP awarded'`          →  `'Submitted! +20 XP awarded'`
`'✅ Document Generated!'`                →  `'Document Generated!'`
`'❌ Please write your schema first.'`    →  `'Please write your schema first.'`
`'❌ Invalid JSON: '`                     →  `'Invalid JSON: '`
`'<strong>❌ Fix these issues:</strong>'` →  `'<strong>Fix these issues:</strong>'`
`'<strong style="...">✅ Schema valid!'`  →  `'<strong style="...">Schema valid!'`
`'<li>⚠️ ' + w + '</li>'`               →  `'<li>Warning: ' + w + '</li>'`
```

---

### File: labs/day2/lab-06-skills-commands.html

**Path**: `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/labs/day2/lab-06-skills-commands.html`
**Agent task**: Add Lucide integration. Replace 28 semantic emojis in HTML. Remove 1 decorative. Handle 4 JS emojis with Option A.

**Lucide integration**: Add CSS rule + script tags.

**HTML Replacements**:

```
Line 491:  ⚡  →  <svg data-lucide="zap" class="lucide"></svg>
           Context: <span aria-hidden="true">⚡</span>

Line 571:  🔗  →  <svg data-lucide="link" class="lucide"></svg>
Line 589:  🔒  →  <svg data-lucide="lock" class="lucide"></svg>
Line 597:  🎯  →  <svg data-lucide="target" class="lucide"></svg>
Line 642:  ✓   →  <svg data-lucide="check-circle" class="lucide"></svg>
           Context: <div class="card-badge check-badge">✓ CHECK — Question 1 of 4</div>

Line 667:  🎯  →  <svg data-lucide="target" class="lucide"></svg>
Line 689:  🔒  →  <svg data-lucide="lock" class="lucide"></svg>

Line 715:  ❌  →  <svg data-lucide="x-circle" class="lucide"></svg>
           Context: Anti-patterns — Explicit ❌ Don't do this sections.

Line 766:  ❌  →  <svg data-lucide="x-circle" class="lucide"></svg>
Line 767:  ❌  →  <svg data-lucide="x-circle" class="lucide"></svg>
Line 785:  🎯  →  <svg data-lucide="target" class="lucide"></svg>
Line 799:  🏗️  →  <svg data-lucide="hammer" class="lucide"></svg>

Line 866:  ✅  →  <svg data-lucide="check-circle" class="lucide"></svg>
           Context: <strong style="color:var(--secondary);">✅ Model Answer:</strong>

Line 912:  💡  →  <svg data-lucide="lightbulb" class="lucide"></svg>
Line 926:  🔒  →  <svg data-lucide="lock" class="lucide"></svg>
Line 934:  🎯  →  <svg data-lucide="target" class="lucide"></svg>

Line 988:  ⚠️  →  <svg data-lucide="alert-triangle" class="lucide"></svg>
           Context: <div class="card-badge warning-badge">⚠️ CRITICAL — Reserved Names</div>

Line 1004: ✓   →  <svg data-lucide="check-circle" class="lucide"></svg>
Line 1029: 🎯  →  <svg data-lucide="target" class="lucide"></svg>
Line 1043: 🏗️  →  <svg data-lucide="hammer" class="lucide"></svg>

Line 1085: ✅  →  <svg data-lucide="check-circle" class="lucide"></svg>
           Context: <strong style="color:var(--secondary);">✅ Model Answer:</strong>

Line 1103: ✅  →  <svg data-lucide="check-circle" class="lucide"></svg>
           Context: | src/auth.ts | ✅ Yes |  (table cell)

Line 1104: ❌  →  <svg data-lucide="x-circle" class="lucide"></svg>
           Context: | src/utils.ts | ❌ Missing |  (table cell)

Line 1128: 🔒  →  <svg data-lucide="lock" class="lucide"></svg>
Line 1161: 🔗  →  <svg data-lucide="link" class="lucide"></svg>
Line 1207: 🎯  →  <svg data-lucide="target" class="lucide"></svg>
Line 1228: 🔒  →  <svg data-lucide="lock" class="lucide"></svg>
Line 1237: ✓   →  <svg data-lucide="check-circle" class="lucide"></svg>
Line 1262: ✓   →  <svg data-lucide="check-circle" class="lucide"></svg>
Line 1299: 🔒  →  <svg data-lucide="lock" class="lucide"></svg>
Line 1308: 🎯  →  <svg data-lucide="target" class="lucide"></svg>
           Context: <div class="card-badge challenge-badge">🎯 BOSS CHALLENGE</div>

Lines 1383-1385: ❌  →  <svg data-lucide="x-circle" class="lucide"></svg>  (3 instances)
           Context: ❌ Never invent fields... / ❌ Never omit error responses... / ❌ Never use OpenAPI 2.0...
```

**Note**: Line 1110 contains `✅ READY TO SUBMIT / ❌ NOT READY` inside a `<textarea placeholder>`.
Leave unchanged — textarea placeholders are plain text and cannot contain HTML.

**Decorative — remove**:
```
Line 1442: 🎉  →  Remove emoji character only.
```

**JS emojis — Option A**:
```
Line 1518: `👑 ${streak} streak`  →  `${streak} streak`
Line 1521: `⚡ ${streak} streak`  →  `${streak} streak`
Line 1524: `🔥 ${streak} streak`  →  `${streak} streak`
Line 1776: '🏁 Milestone reached: '  →  'Milestone reached: '
```

---

### File: labs/day3/lab-07-multi-agent.html

**Path**: `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/labs/day3/lab-07-multi-agent.html`
**Agent task**: Add Lucide integration. Replace 28 semantic emojis in HTML. Remove 1 decorative. Handle 4 JS emojis with Option A.

**Lucide integration**: Add CSS rule + script tags.

**HTML Replacements**:

```
Line 574:  ⚡  →  <svg data-lucide="zap" class="lucide"></svg>
           Context: <span>⚡</span><span id="xp-value">0</span>...

Line 678:  🔗  →  <svg data-lucide="link" class="lucide"></svg>
Line 698:  🔒  →  <svg data-lucide="lock" class="lucide"></svg>
Line 709:  🎯  →  <svg data-lucide="target" class="lucide"></svg>

Line 725:  ✅  →  <svg data-lucide="check-circle" class="lucide"></svg>
           Context: <div class="rule-item rule-yes"><span class="rule-icon">✅</span>...

Line 726:  ✅  →  <svg data-lucide="check-circle" class="lucide"></svg>

Line 727:  ❌  →  <svg data-lucide="x-circle" class="lucide"></svg>
           Context: <div class="rule-item rule-no"><span class="rule-icon">❌</span>...

Line 728:  ❌  →  <svg data-lucide="x-circle" class="lucide"></svg>

Line 751:  🎯  →  <svg data-lucide="target" class="lucide"></svg>
Line 765:  ✓   →  <svg data-lucide="check-circle" class="lucide"></svg>
Line 801:  🔒  →  <svg data-lucide="lock" class="lucide"></svg>
Line 870:  🎯  →  <svg data-lucide="target" class="lucide"></svg>
Line 904:  🎯  →  <svg data-lucide="target" class="lucide"></svg>
Line 918:  🏗️  →  <svg data-lucide="hammer" class="lucide"></svg>

Line 929:  🔐  →  <svg data-lucide="shield-check" class="lucide"></svg>
           Context: <div><strong>🔐 Security Reviewer</strong>...

Line 933:  📝  →  <svg data-lucide="file-text" class="lucide"></svg>
           Context: <div><strong>📝 Documentation Writer</strong>...

Line 937:  🧪  →  <svg data-lucide="flask-conical" class="lucide"></svg>
           Context: <div><strong>🧪 Test Generator</strong>...

Lines 961-966: ✅  →  <svg data-lucide="check-circle" class="lucide"></svg>  (6 instances)
           Context: <li>✅ Role section uses "specialized agent responsible for" pattern...</li>
           (6 checklist items, each prefixed with ✅)

Line 973:  ✅  →  <svg data-lucide="check-circle" class="lucide"></svg>
           Context: <strong ...>✅ Model Answer — Security Reviewer:</strong>

Line 1017: ✓   →  <svg data-lucide="check-circle" class="lucide"></svg>
Line 1049: 🔒  →  <svg data-lucide="lock" class="lucide"></svg>

Lines 1064, 1073, 1083: ❌  →  <svg data-lucide="x-circle" class="lucide"></svg>  (3 instances)
           Context: <p style="color:#fca5a5;...">❌ Anti-pattern N: ...</p>

Lines 1066, 1075, 1085: ✅  →  <svg data-lucide="check-circle" class="lucide"></svg>  (3 instances)
           Context: <p style="color:var(--success);...">✅ Fix: ...</p>

Line 1096: 🔗  →  <svg data-lucide="link" class="lucide"></svg>
Line 1104: 🎯  →  <svg data-lucide="target" class="lucide"></svg>
Line 1116: 💡  →  <svg data-lucide="lightbulb" class="lucide"></svg>
Line 1127: 🔒  →  <svg data-lucide="lock" class="lucide"></svg>
Line 1230: ✓   →  <svg data-lucide="check-circle" class="lucide"></svg>
Line 1261: 🔒  →  <svg data-lucide="lock" class="lucide"></svg>
Line 1274: ✓   →  <svg data-lucide="check-circle" class="lucide"></svg>
Line 1299: ✓   →  <svg data-lucide="check-circle" class="lucide"></svg>
Line 1330: 🔒  →  <svg data-lucide="lock" class="lucide"></svg>
Line 1340: 🎯  →  <svg data-lucide="target" class="lucide"></svg>
           Context: <div class="card-badge challenge-badge">🎯 BOSS CHALLENGE</div>
```

**Decorative — remove**:
```
Line 1421: 🎉  →  Remove emoji character only.
```

**JS emojis — Option A**:
```
Line 1486: `👑 ${streak} streak`  →  `${streak} streak`
Line 1489: `⚡ ${streak} streak`  →  `${streak} streak`
Line 1492: `🔥 ${streak} streak`  →  `${streak} streak`
Line 1532: '🏁 Milestone reached: '  →  'Milestone reached: '
```

---

### File: labs/day3/lab-08-production.html

**Path**: `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/labs/day3/lab-08-production.html`
**Agent task**: Add Lucide integration. Replace 39 semantic emojis in HTML. Remove 1 decorative. Handle JS emojis.

**Lucide integration**: Add CSS rule + script tags.

**HTML Replacements**:

```
Line 495:  ⚡  →  <svg data-lucide="zap" class="lucide"></svg>
           Context: <span>⚡</span><span id="xp-value">0</span>...

Line 541:  🔗  →  <svg data-lucide="link" class="lucide"></svg>

Line 551:  📋  →  <svg data-lucide="clipboard" class="lucide"></svg>
           Context: <div class="card-badge info-badge">📋 INFO</div>

Line 582:  🔒  →  <svg data-lucide="lock" class="lucide"></svg>
Line 595:  🎯  →  <svg data-lucide="target" class="lucide"></svg>

Line 616:  📋  →  <svg data-lucide="clipboard" class="lucide"></svg>
           Context: <div class="card-badge info-badge">📋 The settings.json Permission Model</div>

Line 647:  🎯  →  <svg data-lucide="target" class="lucide"></svg>

Line 671:  🏗️  →  <svg data-lucide="hammer" class="lucide"></svg>
           Context: <span class="build-badge">🏗️ Build Challenge</span>

Line 728:  ✅  →  <svg data-lucide="check-circle" class="lucide"></svg>
           Context: <strong ...>✅ Model Answers:</strong>

Line 793:  ✓   →  <svg data-lucide="check-circle" class="lucide"></svg>
           Context: <div class="card-badge check-badge">✓ KNOWLEDGE CHECK</div>

Line 829:  🔒  →  <svg data-lucide="lock" class="lucide"></svg>

Line 842:  📋  →  <svg data-lucide="clipboard" class="lucide"></svg>
           Context: <div class="card-badge info-badge">📋 Three Secrets Anti-Patterns...</div>

Lines 845, 855, 865: ❌  →  <svg data-lucide="x-circle" class="lucide"></svg>  (3 instances)
           Context: <div class="ap-label bad">❌ Anti-Pattern N — ...</div>

Lines 848, 859, 868: ✅  →  <svg data-lucide="check-circle" class="lucide"></svg>  (3 instances)
           Context: <div class="ap-label good" ...>✅ Fix — ...</div>

Line 876:  🎯  →  <svg data-lucide="target" class="lucide"></svg>
Line 940:  🎯  →  <svg data-lucide="target" class="lucide"></svg>
Line 966:  🔒  →  <svg data-lucide="lock" class="lucide"></svg>

Line 978:  📋  →  <svg data-lucide="clipboard" class="lucide"></svg>
           Context: <div class="card-badge info-badge">📋 Four Cost Levers</div>

Line 1001: 🧮  →  <svg data-lucide="calculator" class="lucide"></svg>
           Context: <div class="card-badge info-badge">🧮 Cost Calculator</div>

Line 1043: ✓   →  <svg data-lucide="check-circle" class="lucide"></svg>
Line 1078: 🔒  →  <svg data-lucide="lock" class="lucide"></svg>

Line 1091: 📋  →  <svg data-lucide="clipboard" class="lucide"></svg>
           Context: <div class="card-badge info-badge">📋 Three Observability Layers</div>

Line 1110: 📋  →  <svg data-lucide="clipboard" class="lucide"></svg>
           Context: <div class="card-badge info-badge">📋 Structured Log Entry — Example</div>

Line 1129: 🎯  →  <svg data-lucide="target" class="lucide"></svg>

Line 1151: 💡  →  <svg data-lucide="lightbulb" class="lucide"></svg>
           Context: <div class="card-badge insight-badge">💡 INSIGHT</div>

Line 1174: 🔒  →  <svg data-lucide="lock" class="lucide"></svg>
Line 1186: ✓   →  <svg data-lucide="check-circle" class="lucide"></svg>
Line 1213: ✓   →  <svg data-lucide="check-circle" class="lucide"></svg>
Line 1248: 🔒  →  <svg data-lucide="lock" class="lucide"></svg>
Line 1261: 🎯  →  <svg data-lucide="target" class="lucide"></svg>

Line 1288: 📋  →  <svg data-lucide="clipboard" class="lucide"></svg>
           Context: <div class="card-badge info-badge">📋 Model Answer</div>

Line 1362: 📊  →  <svg data-lucide="bar-chart-2" class="lucide"></svg>
           Context: <div class="card-badge info-badge">📊 Self-Evaluation Rubric</div>
```

**Decorative — remove**:
```
Line 1396: 🎉  →  Remove emoji character only.
```

**JS emojis — Option A**:
```
Line 1448: '🏁 Milestone reached: '  →  'Milestone reached: '
Line 1480: `👑 ${streak} streak`  →  `${streak} streak`
Line 1481: `⚡ ${streak} streak`  →  `${streak} streak`
Line 1482: `🔥 ${streak} streak`  →  `${streak} streak`
Line 1907: '❌ Please fill in all three scenarios before submitting.'
           →  'Please fill in all three scenarios before submitting.'
Line 1937: '✅ All three scenarios have valid JSON permission structures...'
           →  'All three scenarios have valid JSON permission structures...'
```

---

### File: labs/day3/lab-09-capstone.html

**Path**: `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/labs/day3/lab-09-capstone.html`
**Agent task**: Add Lucide integration. Replace 23 semantic emojis in HTML. Handle 5 JS emojis.

**Lucide integration**: Add CSS rule + script tags.
**Special note**: The course completion banner (line ~1241) is a high-visibility element.
After the banner is shown dynamically, call `lucide.createIcons()` to activate the 🎓 → graduation-cap icon.

**HTML Replacements**:

```
Line 507:  ⚡  →  <svg data-lucide="zap" class="lucide"></svg>
           Context: <span>⚡</span><span id="xp-value">0</span>...

Line 616:  🔒  →  <svg data-lucide="lock" class="lucide"></svg>

Line 628:  🔗  →  <svg data-lucide="link" class="lucide"></svg>
           Context: <div class="card-badge callback-badge">🔗 Callback — PRAO Loop (Lab 01)</div>

Line 690:  💡  →  <svg data-lucide="lightbulb" class="lucide"></svg>
           Context: <div class="card-badge insight-badge">💡 Insight</div>

Line 707:  🔒  →  <svg data-lucide="lock" class="lucide"></svg>

Line 719:  🔗  →  <svg data-lucide="link" class="lucide"></svg>
Line 725:  🔗  →  <svg data-lucide="link" class="lucide"></svg>

Line 777:  🏗️  →  <svg data-lucide="hammer" class="lucide"></svg>
           Context: <span class="build-badge">🏗️ Required Build</span>

Line 851:  ✅  →  <svg data-lucide="check-circle" class="lucide"></svg>
           Context: <strong style="color:#166534;">✅ Skill YAML validated!</strong>

Line 869:  🔒  →  <svg data-lucide="lock" class="lucide"></svg>

Line 881:  🔗  →  <svg data-lucide="link" class="lucide"></svg>
           Context: <div class="card-badge callback-badge">🔗 Callback — Permission Scoping...</div>

Line 956:  🏗️  →  <svg data-lucide="hammer" class="lucide"></svg>
           Context: <span class="build-badge">🏗️ Required Build</span>

Line 992:  ❌  →  <svg data-lucide="x-circle" class="lucide"></svg>
           Context: <strong style="color:#991b1b;">❌ Too vague:</strong>

Line 996:  ✅  →  <svg data-lucide="check-circle" class="lucide"></svg>
           Context: <strong style="color:#166534;">✅ Specific enough:</strong>

Line 1005: ✅  →  <svg data-lucide="check-circle" class="lucide"></svg>
           Context: <strong style="color:#166534;">✅ Integration spec submitted!</strong>

Line 1023: 🔒  →  <svg data-lucide="lock" class="lucide"></svg>
Line 1167: 🔒  →  <svg data-lucide="lock" class="lucide"></svg>

Lines 1182-1202: 🔗  →  <svg data-lucide="link" class="lucide"></svg>  (6 instances)
           Context: <div style="color:var(--secondary);...">🔗 PRAO Loop</div>
           (and 5 more concept-link divs with same pattern)

Line 1241: 🎓  →  <svg data-lucide="graduation-cap" class="lucide"></svg>
           Context: <span class="course-complete-emoji">🎓</span>

Line 1246: ⚡  →  <svg data-lucide="zap" class="lucide"></svg>
           Context: ⚡ <span id="course-total-xp">0</span> XP earned across the full course

Line 1270: 🏗️  →  <svg data-lucide="hammer" class="lucide"></svg>
           Context: <div class="next-card-icon">🏗️</div>

Line 1275: 🔁  →  <svg data-lucide="repeat" class="lucide"></svg>
           Context: <div class="next-card-icon">🔁</div>

Line 1280: 🎙️  →  <svg data-lucide="mic" class="lucide"></svg>
           Context: <div class="next-card-icon">🎙️</div>
```

**JS emojis — Option A**:
```
Line 1342: '🏁 Milestone reached: '  →  'Milestone reached: '
Line 1676: badge.textContent = '👑 Distinguished'  →  badge.textContent = 'Distinguished'
Line 1953: '❌ Too short. A real skill YAML...'  →  'Too short. A real skill YAML...'
Line 1990: '<strong>❌ Fix these:</strong>'  →  '<strong>Fix these:</strong>'
Line 1996: '✅ All 6 required fields present and valid.'  →  'All 6 required fields present and valid.'
```

---

## 5. Markdown Files Strategy

The 12 files in `docs/curriculum/modules/*.md` are rendered at runtime by marked.js into
plain HTML inside `module-viewer.html`. Lucide icons cannot be used here because:
- The markdown source contains emoji in Mermaid diagram node labels and in prose
- marked.js renders markdown as literal Unicode — no `data-lucide` attribute processing
- Mermaid renders its own SVG from text labels — emojis inside ` ```mermaid ``` ` blocks work correctly there

### Rule 1: SKIP all Mermaid code blocks

Never modify emoji inside triple-backtick mermaid code blocks. Examples in these files:
```
A(["📝 Era 1\nAutocomplete"])
P(["👁 Perceive\nRead files"])
DENY -->|"Yes"| BLOCKED(["🚫 Blocked"])
```
These render fine as Mermaid SVG node labels. Leave them exactly as-is.

### Rule 2: Prose emojis — text equivalents

For emoji in prose (outside code blocks), apply these substitutions:

| Emoji | Text equivalent | Notes |
|-------|----------------|-------|
| ✅ | Remove if redundant with bold label | `✅ **Precise**:` → `**Precise**:` |
| ❌ | Remove if redundant with bold label | `❌ **Imprecise**:` → `**Imprecise**:` |
| ⚠️ | `Warning:` | Only if emoji is the only signal |
| 🎯 | Remove | Heading text carries the meaning |
| 💡 | Remove | Summary/heading text carries the meaning |
| 🧭 | Remove | Decorative in summary elements |
| □  | KEEP | Checkbox Unicode, not emoji, renders as expected |
| ★  | KEEP | Star rating, not emoji |
| ✓  | KEEP | Check mark Unicode, used intentionally |
| ✗  | KEEP | X mark Unicode, used intentionally |

**Files with highest prose emoji counts** (prioritize these first):
1. `12-capstone-production.md` — 53 lines (mostly □ checkboxes — leave)
2. `11-tech-stack-adaptation.md` — 46 lines (mostly □ checkboxes — leave)
3. `04-prompt-engineering-depth.md` — 27 lines (✅/❌ bullet prefixes — remove)
4. `09-multi-agent-systems.md` — 26 lines
5. `10-security-sandboxing.md` — 25 lines

**Example transformation** (`04-prompt-engineering-depth.md`):
```markdown
Before:
❌ **Imprecise**: "Improve the TypeScript types in the authentication module."
✅ **Precise**: "Add explicit return type annotations to every exported function..."

After:
**Imprecise**: "Improve the TypeScript types in the authentication module."
**Precise**: "Add explicit return type annotations to every exported function..."
```

The bold labels (`**Imprecise**`, `**Precise**`) carry the semantic meaning — the ✅/❌
prefixes are redundant decorations.

---

## 6. Deployment Sequence

Execute phases in order. Each phase should be run by a separate agent to prevent context overflow.

### Phase 1: Infrastructure (one-time setup — run FIRST)

**Goal**: Add Lucide CSS and script tags to all 9 HTML files BEFORE any emoji replacements.

**Agent instructions**:
> For each of the following 9 HTML files, perform TWO edits:
> (1) Add the `.lucide` CSS rule at the end of the `<style>` block (before `</style>`)
> (2) Add the two Lucide script tags immediately before `</body>`
>
> CSS to add:
> ```css
> /* ── Lucide icon sizing ── */
> .lucide { width: 1em; height: 1em; vertical-align: -0.125em; stroke-width: 2; display: inline-block; }
> ```
>
> Script tags to add:
> ```html
> <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
> <script>lucide.createIcons();</script>
> ```
>
> Files (add integration to all, read each before editing):
> - `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/index.html`
> - `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/module-viewer.html`
> - `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/labs/day1/lab-02-first-agent.html`
> - `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/labs/day1/lab-03-agent-thinking.html`
> - `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/labs/day2/lab-04-mcp-explorer.html`
> - `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/labs/day2/lab-06-skills-commands.html`
> - `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/labs/day3/lab-07-multi-agent.html`
> - `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/labs/day3/lab-08-production.html`
> - `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/labs/day3/lab-09-capstone.html`

---

### Phase 2: Dashboard + Viewer (low risk)

**Agent instructions**:
> Read ICON-PLAN.md at `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/docs/ICON-PLAN.md`.
> Execute all replacements listed under:
> - Section 4 > "File: index.html"
> - Section 4 > "File: module-viewer.html"
>
> Read each target file before editing. Make only the changes listed. Do not reformat or reindent anything else.

---

### Phase 3: Day 1 Labs

**Agent instructions**:
> Read ICON-PLAN.md. Execute all replacements listed under:
> - Section 4 > "File: labs/day1/lab-02-first-agent.html"
> - Section 4 > "File: labs/day1/lab-03-agent-thinking.html"
>
> For lab-03, be careful NOT to modify the ✓, ✗, ⚠ pattern-card characters at lines 788–833.
> Follow the JS Option A rules for streak/milestone emojis.

---

### Phase 4: Day 2 Labs (most complex)

**Agent instructions**:
> Read ICON-PLAN.md. Execute all replacements listed under:
> - Section 4 > "File: labs/day2/lab-04-mcp-explorer.html"
> - Section 4 > "File: labs/day2/lab-06-skills-commands.html"
>
> For lab-04: pay special attention to the ⭐ star replacements in the Schema Explorer section,
> all JS feedback string replacements, and all ✅/❌ in JavaScript btn.textContent assignments.
> For lab-06: the textarea placeholder at line 1110 contains ✅/❌ as plain text — leave unchanged.

---

### Phase 5: Day 3 Labs

**Agent instructions**:
> Read ICON-PLAN.md. Execute all replacements listed under:
> - Section 4 > "File: labs/day3/lab-07-multi-agent.html"
> - Section 4 > "File: labs/day3/lab-08-production.html"
> - Section 4 > "File: labs/day3/lab-09-capstone.html"
>
> For lab-09: the course completion banner uses 🎓 in a span. After replacing with the SVG,
> verify that lucide.createIcons() is called when the banner is shown dynamically.

---

### Phase 6: Markdown files (optional, lowest priority)

**Agent instructions**:
> Read ICON-PLAN.md Section 5. Process all 12 files in:
> `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/docs/curriculum/modules/`
>
> IMPORTANT: Skip all content inside triple-backtick mermaid code blocks completely.
> For prose content only: remove ✅/❌ emoji where bold labels carry the meaning.
> Remove decorative 🎯/💡/🧭 from summary/heading elements.
> Leave □, ★, ✓, ✗ characters unchanged.

---

### Phase 7: Verification

Run this verification script after all phases complete:

```bash
python3 -c "
import re, sys

files = [
  '/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/index.html',
  '/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/module-viewer.html',
  '/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/labs/day1/lab-02-first-agent.html',
  '/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/labs/day1/lab-03-agent-thinking.html',
  '/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/labs/day2/lab-04-mcp-explorer.html',
  '/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/labs/day2/lab-06-skills-commands.html',
  '/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/labs/day3/lab-07-multi-agent.html',
  '/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/labs/day3/lab-08-production.html',
  '/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/labs/day3/lab-09-capstone.html',
]
emoji_re = re.compile(r'[\U0001F300-\U0001F9FF\U00002600-\U000027BF]')

for f in files:
  with open(f) as fh:
    content = fh.read()
  # Check Lucide integration
  lucide_script = 'lucide.min.js' in content
  lucide_init = 'lucide.createIcons' in content
  lucide_css = '.lucide' in content
  # Count remaining emoji in HTML outside script tags
  no_script = re.sub(r'<script[\s\S]*?</script>', '', content, flags=re.DOTALL)
  remaining = emoji_re.findall(no_script)
  status = 'OK' if lucide_script and lucide_init and lucide_css and not remaining else 'NEEDS ATTENTION'
  print(f'{status}: {f.split(\"/\")[-1]}')
  print(f'  Lucide script:{lucide_script} init:{lucide_init} css:{lucide_css} | Remaining emoji in HTML:{len(remaining)}')
  if remaining:
    print(f'  Remaining: {set(remaining)}')
"
```

Expected output: all 9 files showing `OK` with 0 remaining emoji in HTML.

---

## 7. Important Notes for All Agents

1. **Read before writing**: Always Read the file before any Edit. Line numbers in this plan
   are from the audit snapshot — they may shift if previous agents have already made edits.

2. **The lock icon pattern**: 🔒 always appears in `<div style="font-size:32px;">🔒</div>`.
   Replace the emoji only — preserve the wrapper div and inline style.

3. **Badge text pattern**: Card badges follow this structure:
   ```html
   <div class="card-badge challenge-badge">🎯 CHALLENGE</div>
   ```
   Replace only the emoji, keep label text and all class attributes:
   ```html
   <div class="card-badge challenge-badge"><svg data-lucide="target" class="lucide"></svg> CHALLENGE</div>
   ```

4. **XP display pattern**: Replace like this:
   ```html
   Before: <span>⚡</span><span id="xp-value">0</span>
   After:  <svg data-lucide="zap" class="lucide"></svg><span id="xp-value">0</span>
   ```

5. **lucide.createIcons() timing**: Must run after DOM is rendered. For dynamic content
   (completion cards, modals injected via JS), call it again after innerHTML injection.

6. **Files not found**: `lab-01-setup.html` and `lab-05-build-mcp.html` did not exist during
   the audit. When these files are added, apply the same Lucide integration and use the
   mapping table in Section 3 for any emojis encountered.

7. **Do not change textarea placeholders**: Placeholder text cannot contain HTML. Any
   ✅/❌ inside `<textarea placeholder="...">` attributes must remain as Unicode characters.

8. **module-viewer.html init script**: This file has a complex existing `<script>` block.
   Add `lucide.createIcons()` at the END of the existing init function rather than as a
   separate script tag, to ensure icons are initialized after all dynamic content renders.
