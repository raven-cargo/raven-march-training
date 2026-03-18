# Agent Trace Animations Plan

Animated "agent trace replays" for Modules 01--03 that show students what Claude Code actually looks like in action, teaching them to read agent thinking and tool call patterns.

---

## 1. Component Architecture

### 1.1 HTML Structure

The `agent-trace` component is declared in module markdown files using the existing `ix-diagram` pattern. Four variants share the same root structure with variant-specific layout differences.

```html
<div class="ix-diagram" data-component="agent-trace"
     data-variant="terminal"
     data-speed="1"
     data-auto-play="true"
     data-diagram-id="unique-id">

  <span class="ix-title">Trace title goes here</span>

  <!-- Prompt line (always first) -->
  <div class="ix-trace-line" data-type="prompt" data-delay="0">
    "Add TypeScript types to src/utils.ts. Keep tests passing."
  </div>

  <!-- Thinking line -->
  <div class="ix-trace-line" data-type="think" data-delay="1200">
    I need to read the file first to understand what functions are exported and what types they currently have.
    <span class="ix-trace-annotation">The agent builds a plan before acting -- this is the Reason phase.</span>
  </div>

  <!-- Tool call line -->
  <div class="ix-trace-line" data-type="tool" data-delay="800">
    Read(src/utils.ts)
    <span class="ix-trace-annotation">Perceive phase: gathering context about the current state.</span>
  </div>

  <!-- Result line -->
  <div class="ix-trace-line" data-type="result" data-delay="600">
    export function parseUser(data) { ... }
    export function formatDate(ts) { ... }
  </div>

  <!-- Response line -->
  <div class="ix-trace-line" data-type="response" data-delay="1000">
    Done. Added types to all 4 exported functions. Tests pass.
  </div>

  <!-- Error line (when needed) -->
  <div class="ix-trace-line" data-type="error" data-delay="600">
    FAIL src/utils.test.ts -- Type 'User' is not assignable to type 'User | null'
  </div>
</div>
```

**Variant B (Annotated Trace)** uses the same structure. Annotations are pulled from `<span class="ix-trace-annotation">` children and displayed in a right-side panel.

**Variant C (Side-by-Side Compare)** wraps two trace groups:

```html
<div class="ix-diagram" data-component="agent-trace"
     data-variant="compare"
     data-diagram-id="compare-id">
  <span class="ix-title">Good prompt vs vague prompt</span>

  <div class="ix-trace-group" data-label="Specific prompt">
    <div class="ix-trace-line" data-type="prompt" data-delay="0">...</div>
    <!-- lines -->
  </div>

  <div class="ix-trace-group" data-label="Vague prompt">
    <div class="ix-trace-line" data-type="prompt" data-delay="0">...</div>
    <!-- lines -->
  </div>
</div>
```

**Variant D (PRAO Phase Highlight)** adds `data-prao` attributes to lines:

```html
<div class="ix-trace-line" data-type="tool" data-delay="800" data-prao="perceive">
  Read(src/utils.ts)
</div>
```

A vertical phase strip on the left highlights the active PRAO phase as lines appear.


### 1.2 JS Hydration: `initAgentTrace(el)`

Register in the `hydrateInteractiveDiagrams` switch:

```javascript
case 'agent-trace': initAgentTrace(el); break;
```

The `initAgentTrace` function:

```javascript
function initAgentTrace(el) {
  var variant = el.dataset.variant || 'terminal';
  var speed = parseFloat(el.dataset.speed) || 1;
  var autoPlay = el.dataset.autoPlay !== 'false';

  // Collect lines (or groups for compare variant)
  var isCompare = variant === 'compare';
  var groups = isCompare
    ? Array.from(el.querySelectorAll(':scope > .ix-trace-group'))
    : null;
  var lines = isCompare
    ? null
    : Array.from(el.querySelectorAll(':scope > .ix-trace-line'));

  // Build the visual container
  var container = document.createElement('div');
  container.className = 'ix-trace-container ix-trace-' + variant;

  // --- VARIANT D: PRAO strip ---
  var praoStrip = null;
  if (variant === 'prao') {
    praoStrip = document.createElement('div');
    praoStrip.className = 'ix-trace-prao-strip';
    ['perceive', 'reason', 'act', 'observe'].forEach(function (phase) {
      var seg = document.createElement('div');
      seg.className = 'ix-trace-prao-seg';
      seg.dataset.phase = phase;
      seg.textContent = phase.charAt(0).toUpperCase();
      praoStrip.appendChild(seg);
    });
    container.appendChild(praoStrip);
  }

  // --- Terminal output area ---
  var outputArea = document.createElement('div');
  outputArea.className = 'ix-trace-output';
  outputArea.setAttribute('role', 'log');
  outputArea.setAttribute('aria-live', 'polite');
  outputArea.setAttribute('aria-label', 'Agent trace replay');

  // --- VARIANT B: Annotation panel ---
  var annotationPanel = null;
  if (variant === 'annotated') {
    var splitWrap = document.createElement('div');
    splitWrap.className = 'ix-trace-split';
    splitWrap.appendChild(outputArea);
    annotationPanel = document.createElement('div');
    annotationPanel.className = 'ix-trace-annotations';
    annotationPanel.setAttribute('aria-label', 'Trace commentary');
    splitWrap.appendChild(annotationPanel);
    container.appendChild(splitWrap);
  }
  // --- VARIANT C: Side-by-side ---
  else if (isCompare) {
    var compareWrap = document.createElement('div');
    compareWrap.className = 'ix-trace-compare';
    groups.forEach(function (group) {
      var col = document.createElement('div');
      col.className = 'ix-trace-compare-col';
      var colLabel = document.createElement('div');
      colLabel.className = 'ix-trace-compare-label';
      colLabel.textContent = group.dataset.label || '';
      col.appendChild(colLabel);
      var colOutput = document.createElement('div');
      colOutput.className = 'ix-trace-output';
      colOutput.setAttribute('role', 'log');
      col.appendChild(colOutput);
      compareWrap.appendChild(col);
      // Store reference for playback
      group._outputEl = colOutput;
      group._lines = Array.from(group.querySelectorAll('.ix-trace-line'));
    });
    container.appendChild(compareWrap);
  } else {
    container.appendChild(outputArea);
  }

  // --- Control bar ---
  var controls = document.createElement('div');
  controls.className = 'ix-trace-controls';

  var playBtn = document.createElement('button');
  playBtn.className = 'ix-trace-btn ix-trace-play';
  playBtn.setAttribute('aria-label', 'Play trace');
  playBtn.innerHTML = '<i data-lucide="play"></i>';

  var pauseBtn = document.createElement('button');
  pauseBtn.className = 'ix-trace-btn ix-trace-pause';
  pauseBtn.setAttribute('aria-label', 'Pause trace');
  pauseBtn.innerHTML = '<i data-lucide="pause"></i>';
  pauseBtn.style.display = 'none';

  var resetBtn = document.createElement('button');
  resetBtn.className = 'ix-trace-btn ix-trace-reset';
  resetBtn.setAttribute('aria-label', 'Reset trace');
  resetBtn.innerHTML = '<i data-lucide="rotate-ccw"></i>';

  var stepBtn = document.createElement('button');
  stepBtn.className = 'ix-trace-btn ix-trace-step';
  stepBtn.setAttribute('aria-label', 'Step forward');
  stepBtn.innerHTML = '<i data-lucide="skip-forward"></i>';

  var progress = document.createElement('span');
  progress.className = 'ix-trace-progress';

  var speedControl = document.createElement('div');
  speedControl.className = 'ix-trace-speed';
  [0.5, 1, 2].forEach(function (s) {
    var btn = document.createElement('button');
    btn.className = 'ix-trace-speed-btn' + (s === speed ? ' active' : '');
    btn.textContent = s + 'x';
    btn.dataset.speed = s;
    speedControl.appendChild(btn);
  });

  controls.appendChild(playBtn);
  controls.appendChild(pauseBtn);
  controls.appendChild(stepBtn);
  controls.appendChild(resetBtn);
  controls.appendChild(progress);
  controls.appendChild(speedControl);
  container.appendChild(controls);

  // Insert container after title, remove source lines
  var titleEl = el.querySelector('.ix-title');
  if (titleEl) {
    titleEl.after(container);
  } else {
    el.prepend(container);
  }

  // Remove source lines from DOM (they are data, not display)
  if (lines) lines.forEach(function (l) { l.remove(); });
  if (groups) groups.forEach(function (g) { g.remove(); });

  // --- Playback engine ---
  var state = {
    current: 0,
    playing: false,
    timer: null,
    speed: speed,
    allLines: lines || [],
    total: lines ? lines.length : 0
  };

  // For compare variant, interleave lines from both groups
  if (isCompare && groups) {
    // Play groups in parallel -- each group has its own line index
    state.groups = groups.map(function (g) {
      return { lines: g._lines, outputEl: g._outputEl, current: 0 };
    });
    state.total = Math.max.apply(null, state.groups.map(function (g) {
      return g.lines.length;
    }));
  }

  function updateProgress() {
    var cur = state.current;
    var tot = state.total;
    progress.textContent = 'Step ' + Math.min(cur + 1, tot) + ' of ' + tot;
  }

  function renderLine(lineData, targetEl, annotPanel) {
    var row = document.createElement('div');
    row.className = 'ix-trace-row';
    row.dataset.type = lineData.dataset.type;

    // Type tag
    var tag = document.createElement('span');
    tag.className = 'ix-trace-tag ix-trace-tag-' + lineData.dataset.type;
    var tagLabels = {
      prompt: 'PROMPT', think: 'THINK', tool: 'TOOL',
      result: 'RESULT', response: 'RESPONSE', error: 'ERROR'
    };
    tag.textContent = tagLabels[lineData.dataset.type] || 'INFO';
    row.appendChild(tag);

    // Text content (exclude annotation spans)
    var textSpan = document.createElement('span');
    textSpan.className = 'ix-trace-text';
    // Get text without annotation children
    var clone = lineData.cloneNode(true);
    var annots = clone.querySelectorAll('.ix-trace-annotation');
    annots.forEach(function (a) { a.remove(); });
    textSpan.innerHTML = clone.innerHTML;
    row.appendChild(textSpan);

    // Animate entry
    row.style.animation = 'ixTraceLineIn 0.3s ease-out';
    targetEl.appendChild(row);
    targetEl.scrollTop = targetEl.scrollHeight;

    // Annotation
    if (annotPanel) {
      var annotEl = lineData.querySelector('.ix-trace-annotation');
      if (annotEl) {
        var note = document.createElement('div');
        note.className = 'ix-trace-note';
        note.innerHTML = annotEl.innerHTML;
        note.style.animation = 'ixFadeUp 0.4s ease-out';
        // Clear previous
        annotPanel.innerHTML = '';
        annotPanel.appendChild(note);
      }
    }

    // PRAO strip highlight
    if (praoStrip && lineData.dataset.prao) {
      var segs = praoStrip.querySelectorAll('.ix-trace-prao-seg');
      segs.forEach(function (seg) {
        seg.classList.toggle('active', seg.dataset.phase === lineData.dataset.prao);
      });
    }
  }

  function showNext() {
    if (isCompare) {
      var anyRemaining = false;
      state.groups.forEach(function (g) {
        if (g.current < g.lines.length) {
          renderLine(g.lines[g.current], g.outputEl, null);
          g.current++;
          if (g.current < g.lines.length) anyRemaining = true;
        }
      });
      state.current = Math.max.apply(null, state.groups.map(function (g) {
        return g.current;
      }));
      if (!anyRemaining) {
        stop();
      }
    } else {
      if (state.current >= state.total) { stop(); return; }
      var line = state.allLines[state.current];
      renderLine(line, outputArea, annotationPanel);
      state.current++;
      if (state.current >= state.total) { stop(); return; }
    }
    updateProgress();
    scheduleNext();
  }

  function getDelay() {
    var line = isCompare
      ? (state.groups[0].lines[state.groups[0].current] || state.groups[0].lines[0])
      : state.allLines[Math.min(state.current, state.total - 1)];
    var base = parseInt(line.dataset.delay, 10) || 800;
    return base / state.speed;
  }

  function scheduleNext() {
    if (!state.playing) return;
    state.timer = setTimeout(showNext, getDelay());
  }

  function play() {
    state.playing = true;
    playBtn.style.display = 'none';
    pauseBtn.style.display = '';
    scheduleNext();
  }

  function pause() {
    state.playing = false;
    clearTimeout(state.timer);
    playBtn.style.display = '';
    pauseBtn.style.display = 'none';
  }

  function stop() {
    pause();
    playBtn.innerHTML = '<i data-lucide="rotate-ccw"></i>';
  }

  function reset() {
    pause();
    state.current = 0;
    outputArea.innerHTML = '';
    if (annotationPanel) annotationPanel.innerHTML = '';
    if (isCompare) {
      state.groups.forEach(function (g) {
        g.current = 0;
        g.outputEl.innerHTML = '';
      });
    }
    if (praoStrip) {
      praoStrip.querySelectorAll('.ix-trace-prao-seg').forEach(function (s) {
        s.classList.remove('active');
      });
    }
    playBtn.innerHTML = '<i data-lucide="play"></i>';
    playBtn.style.display = '';
    pauseBtn.style.display = 'none';
    updateProgress();
  }

  function stepForward() {
    pause();
    if (state.current < state.total) showNext();
  }

  // Event listeners
  playBtn.addEventListener('click', function () {
    if (state.current >= state.total) { reset(); }
    play();
  });
  pauseBtn.addEventListener('click', pause);
  resetBtn.addEventListener('click', reset);
  stepBtn.addEventListener('click', stepForward);

  speedControl.addEventListener('click', function (e) {
    var btn = e.target.closest('.ix-trace-speed-btn');
    if (!btn) return;
    state.speed = parseFloat(btn.dataset.speed);
    speedControl.querySelectorAll('.ix-trace-speed-btn').forEach(function (b) {
      b.classList.toggle('active', b === btn);
    });
  });

  // Keyboard support
  el.setAttribute('tabindex', '0');
  el.addEventListener('keydown', function (e) {
    if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      state.playing ? pause() : play();
    }
    if (e.key === 'ArrowRight') { e.preventDefault(); stepForward(); }
    if (e.key === 'r') { e.preventDefault(); reset(); }
  });

  updateProgress();

  // Auto-play on scroll into view
  if (autoPlay) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && state.current === 0 && !state.playing) {
          setTimeout(play, 500);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(el);
  }

  // Reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Show all lines immediately, no animation
    if (isCompare) {
      state.groups.forEach(function (g) {
        g.lines.forEach(function (l) { renderLine(l, g.outputEl, null); });
        g.current = g.lines.length;
      });
    } else {
      state.allLines.forEach(function (l) { renderLine(l, outputArea, annotationPanel); });
    }
    state.current = state.total;
    updateProgress();
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'none';
  }
}
```


### 1.3 CSS Additions

All new styles use the `ix-trace-` prefix and reference existing CSS custom properties. No inline styles, no emojis.

```css
/* ── Agent Trace: Base ── */
.ix-trace-container {
  background: #04080f;
  border-radius: 0 0 var(--radius) var(--radius);
  overflow: hidden;
}

.ix-trace-output {
  padding: 16px 20px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  line-height: 1.8;
  max-height: 400px;
  overflow-y: auto;
  scroll-behavior: smooth;
}

/* ── Trace Line Rows ── */
.ix-trace-row {
  display: flex;
  gap: 10px;
  padding: 4px 0;
  align-items: baseline;
}

.ix-trace-row[data-type="prompt"] {
  padding: 8px 0 12px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 8px;
}

/* ── Type Tags ── */
.ix-trace-tag {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 2px 8px;
  border-radius: 4px;
  white-space: nowrap;
  flex-shrink: 0;
  margin-top: 2px;
  text-transform: uppercase;
}

.ix-trace-tag-prompt  { background: rgba(245,158,11,0.15); color: var(--ix-warn); }
.ix-trace-tag-think   { background: rgba(139,92,246,0.15); color: var(--ix-phase-reason); }
.ix-trace-tag-tool    { background: rgba(6,182,212,0.15);  color: var(--ix-phase-act); }
.ix-trace-tag-result  { background: rgba(16,185,129,0.15); color: var(--ix-phase-observe); }
.ix-trace-tag-response { background: rgba(99,102,241,0.15); color: var(--primary); }
.ix-trace-tag-error   { background: rgba(239,68,68,0.15);  color: var(--ix-err); }

/* ── Trace Text ── */
.ix-trace-text {
  color: var(--muted);
  line-height: 1.6;
  flex: 1;
}

.ix-trace-row[data-type="prompt"] .ix-trace-text {
  color: var(--text);
  font-weight: 500;
}

.ix-trace-row[data-type="think"] .ix-trace-text {
  color: #c4b5fd;
  font-style: italic;
}

.ix-trace-row[data-type="tool"] .ix-trace-text {
  color: var(--ix-phase-act);
  font-weight: 600;
}

.ix-trace-row[data-type="error"] .ix-trace-text {
  color: var(--ix-err);
}

.ix-trace-row[data-type="response"] .ix-trace-text {
  color: var(--text);
}

.ix-trace-text code {
  font-family: inherit;
  background: rgba(255,255,255,0.06);
  padding: 1px 4px;
  border-radius: 3px;
}

/* ── Control Bar ── */
.ix-trace-controls {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  background: rgba(0,0,0,0.3);
  border-top: 1px solid var(--border);
}

.ix-trace-btn {
  background: var(--surface);
  color: var(--primary);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 5px 10px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: background 0.15s;
}

.ix-trace-btn:hover { background: var(--raised); }
.ix-trace-btn i, .ix-trace-btn svg { width: 14px; height: 14px; }

.ix-trace-progress {
  font-size: 12px;
  color: var(--dim);
  font-family: 'JetBrains Mono', monospace;
  margin-left: auto;
  margin-right: 8px;
}

/* ── Speed Control ── */
.ix-trace-speed {
  display: flex;
  gap: 2px;
  background: var(--raised);
  border-radius: 6px;
  padding: 2px;
}

.ix-trace-speed-btn {
  background: transparent;
  border: none;
  color: var(--dim);
  font-size: 11px;
  font-family: 'JetBrains Mono', monospace;
  padding: 3px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;
}

.ix-trace-speed-btn.active {
  background: var(--surface);
  color: var(--text);
}

.ix-trace-speed-btn:hover:not(.active) { color: var(--muted); }

/* ── Line Entry Animation ── */
@keyframes ixTraceLineIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Variant B: Annotated (split panel) ── */
.ix-trace-split {
  display: grid;
  grid-template-columns: 1fr 280px;
  min-height: 300px;
}

.ix-trace-annotations {
  padding: 16px 20px;
  border-left: 1px solid var(--border);
  background: rgba(139,92,246,0.04);
  overflow-y: auto;
  max-height: 400px;
}

.ix-trace-note {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.6;
  padding: 12px;
  background: rgba(139,92,246,0.08);
  border-radius: 8px;
  border-left: 3px solid var(--ix-phase-reason);
}

/* ── Variant C: Side-by-Side Compare ── */
.ix-trace-compare {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 300px;
}

.ix-trace-compare-col {
  border-right: 1px solid var(--border);
}

.ix-trace-compare-col:last-child { border-right: none; }

.ix-trace-compare-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--dim);
  padding: 10px 20px;
  background: rgba(0,0,0,0.2);
  border-bottom: 1px solid var(--border);
}

.ix-trace-compare-col .ix-trace-output {
  max-height: 360px;
}

/* ── Variant D: PRAO Phase Strip ── */
.ix-trace-prao {
  display: grid;
  grid-template-columns: 40px 1fr;
}

.ix-trace-prao-strip {
  display: flex;
  flex-direction: column;
  background: rgba(0,0,0,0.3);
  border-right: 1px solid var(--border);
}

.ix-trace-prao-seg {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: var(--dim);
  transition: all 0.3s;
  min-height: 60px;
}

.ix-trace-prao-seg.active {
  font-size: 14px;
}

.ix-trace-prao-seg[data-phase="perceive"].active {
  background: rgba(99,102,241,0.1);
  color: var(--ix-phase-perceive);
  box-shadow: inset -2px 0 0 var(--ix-phase-perceive);
}

.ix-trace-prao-seg[data-phase="reason"].active {
  background: rgba(139,92,246,0.1);
  color: var(--ix-phase-reason);
  box-shadow: inset -2px 0 0 var(--ix-phase-reason);
}

.ix-trace-prao-seg[data-phase="act"].active {
  background: rgba(6,182,212,0.1);
  color: var(--ix-phase-act);
  box-shadow: inset -2px 0 0 var(--ix-phase-act);
}

.ix-trace-prao-seg[data-phase="observe"].active {
  background: rgba(16,185,129,0.1);
  color: var(--ix-phase-observe);
  box-shadow: inset -2px 0 0 var(--ix-phase-observe);
}

/* ── Mobile ── */
@media (max-width: 600px) {
  .ix-trace-split { grid-template-columns: 1fr; }
  .ix-trace-annotations {
    border-left: none;
    border-top: 1px solid var(--border);
    max-height: 150px;
  }
  .ix-trace-compare { grid-template-columns: 1fr; }
  .ix-trace-compare-col { border-right: none; border-bottom: 1px solid var(--border); }
  .ix-trace-compare-col:last-child { border-bottom: none; }
  .ix-trace-prao { grid-template-columns: 30px 1fr; }
  .ix-trace-prao-seg { min-height: 40px; font-size: 10px; }
  .ix-trace-controls { flex-wrap: wrap; gap: 4px; }
  .ix-trace-output { font-size: 11px; padding: 12px; max-height: 300px; }
}

/* ── Reduced Motion ── */
@media (prefers-reduced-motion: reduce) {
  .ix-trace-row { animation: none !important; }
  .ix-trace-note { animation: none !important; }
}
```

### 1.4 Light Theme Overrides

For the existing light theme toggle, the trace component needs these additions:

```css
[data-theme="light"] .ix-trace-container { background: #f0f2f6; }
[data-theme="light"] .ix-trace-output { background: #f7f9fc; }
[data-theme="light"] .ix-trace-controls { background: #e8ecf2; }
[data-theme="light"] .ix-trace-text { color: #475569; }
[data-theme="light"] .ix-trace-row[data-type="prompt"] .ix-trace-text { color: #0f172a; }
[data-theme="light"] .ix-trace-row[data-type="think"] .ix-trace-text { color: #6d28d9; }
[data-theme="light"] .ix-trace-note { background: rgba(139,92,246,0.08); }
```


---

## 2. Variant Designs

### Variant A: Terminal Replay

**Best for:** Showing raw agent execution flow, first exposure to agent output.

- Full-width monospace output area on dark background
- Lines appear one at a time with a slide-up fade
- Each line is prefixed with a color-coded type tag
- No annotation panel -- pure terminal immersion
- Progress indicator in control bar shows "Step N of M"

**Visual weight:** Heavy terminal presence, minimal chrome. Feels like watching a real session.


### Variant B: Annotated Trace

**Best for:** Teaching trace reading skills, explaining what the agent is doing and why.

- Split panel: 65% left (trace output), 35% right (annotation panel)
- As each line appears, the annotation panel updates with a commentary note
- Annotation panel has a subtle violet tint (links to reasoning/thinking)
- On mobile: annotation panel collapses below the trace
- Commentary is written in plain English, instructor voice

**Visual weight:** Educational, dual-focus. The annotation acts as a guide.


### Variant C: Side-by-Side Compare

**Best for:** Contrasting good vs bad prompts, or beginner vs expert agent behavior.

- Two equal columns, each with its own trace output
- Column headers label the two scenarios
- Both traces advance simultaneously (same step index)
- The contrast is immediate and visceral
- On mobile: stacks vertically

**Visual weight:** Comparative, reveals differences through parallel playback.


### Variant D: PRAO Phase Highlight

**Best for:** Connecting the conceptual PRAO framework to real agent output.

- Narrow vertical strip on the left (40px) with P, R, A, O segments
- As lines appear, the corresponding PRAO segment highlights with its phase color
- The strip provides a persistent visual anchor mapping theory to practice
- Lines carry `data-prao` to declare their phase

**Visual weight:** Framework-reinforcing. Shows students exactly where each tool call sits in the loop.


---

## 3. Per-Module Placement Plan


### Module 01: The Paradigm Shift

**Trace 1: First Taste of Agent Output**
- **Location:** After section 1.1, after the "The Disorientation Problem" prose (after the Quick Check details element, before the section 1.2 heading)
- **Variant:** A (Terminal Replay)
- **Scenario:** A developer asks Claude Code to "refactor auth to JWT, keep tests passing" -- the exact example used in the Era 3 description. Students see what that actually looks like as terminal output.
- **Why here:** The prose just described what an agent does in abstract terms. This immediately grounds it in concrete output. It is the "see it live" moment.
- **Beats:** 10

```html
<div class="ix-diagram" data-component="agent-trace"
     data-variant="terminal"
     data-diagram-id="m01-first-taste">
  <span class="ix-title">What Era 3 actually looks like</span>

  <div class="ix-trace-line" data-type="prompt" data-delay="0">
    "Refactor the auth module to use JWT instead of session cookies. Keep all existing tests passing."
  </div>

  <div class="ix-trace-line" data-type="think" data-delay="1200">
    I need to understand the current auth implementation first. Let me read the auth module and its tests.
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="800">
    Read(src/auth/session.ts)
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="600">
    export function createSession(userId: string) { ... } // 47 lines, cookie-based sessions
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="600">
    Read(src/auth/session.test.ts)
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="500">
    12 tests found -- testing login, logout, session validation, expiry
  </div>

  <div class="ix-trace-line" data-type="think" data-delay="1000">
    The tests check behavior, not implementation details. I can swap session cookies for JWT tokens and the test assertions should still hold. I will create a new jwt.ts module, update the auth middleware, then run tests.
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="800">
    Write(src/auth/jwt.ts)
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="700">
    Bash(npm test -- --filter auth)
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="600">
    12 tests passed
  </div>
</div>
```


**Trace 2: PRAO Loop in Action**
- **Location:** After section 1.2, after the prose "A Worked Example" and after the existing `step-walkthrough` diagram (diagram-id: `prao-worked-example`). Place immediately after the walkthrough's closing `</div>`.
- **Variant:** D (PRAO Phase Highlight)
- **Scenario:** The same "Add TypeScript types" worked example, but now as an animated trace with the PRAO strip. Students can compare the step-walkthrough (click-through) with the animated replay (auto-play) and see the PRAO phases light up.
- **Why here:** Reinforces the worked example in a different format. The step-walkthrough is analytical (click through steps); the trace replay is experiential (watch it happen). Both views of the same task.
- **Beats:** 12

```html
<div class="ix-diagram" data-component="agent-trace"
     data-variant="prao"
     data-diagram-id="m01-prao-trace">
  <span class="ix-title">The same example as an agent trace -- watch the PRAO phases</span>

  <div class="ix-trace-line" data-type="prompt" data-delay="0" data-prao="perceive">
    "Add proper TypeScript types to all exported functions in src/utils.ts. Make sure existing tests still pass."
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="800" data-prao="perceive">
    Read(src/utils.ts)
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="500" data-prao="perceive">
    export function parseUser(data) { ... }  export function formatDate(ts) { ... }  // 4 functions, no types
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="600" data-prao="perceive">
    Read(src/utils.test.ts)
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="500" data-prao="perceive">
    expect(parseUser(validData)).toEqual({ id: '1', name: 'Alice' })  // reveals expected types
  </div>

  <div class="ix-trace-line" data-type="think" data-delay="1200" data-prao="reason">
    Based on tests: parseUser takes unknown data, returns User | null. formatDate takes number, returns string. I will add an interface for User and annotate all four functions.
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="800" data-prao="act">
    Write(src/utils.ts)
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="400" data-prao="act">
    File updated -- types added to all exported functions
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="700" data-prao="observe">
    Bash(npm test)
  </div>

  <div class="ix-trace-line" data-type="error" data-delay="600" data-prao="observe">
    FAIL: Type 'User' is not assignable to type 'User | null' in parseUser
  </div>

  <div class="ix-trace-line" data-type="think" data-delay="1000" data-prao="reason">
    The return type should be User | null, not User. The function returns null when parsing fails. Fixing.
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="700" data-prao="act">
    Edit(src/utils.ts) -- return type changed to User | null
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="600" data-prao="observe">
    Bash(npm test)
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="500" data-prao="observe">
    All 8 tests passed
  </div>

  <div class="ix-trace-line" data-type="response" data-delay="800" data-prao="observe">
    Done. Added TypeScript types to all 4 exported functions in src/utils.ts. Created a User interface. Tests pass.
  </div>
</div>
```


**Trace 3: Era Comparison (Autocomplete vs Agent)**
- **Location:** After section 1.3 "The Mental Model Shift", after the "What changes when you shift to director" prose. Before the "When Agentic AI Is Not the Right Tool" section (1.4).
- **Variant:** C (Side-by-Side Compare)
- **Scenario:** Same task ("fix the broken test"), two approaches. Left column: what a developer does with autocomplete/assistant AI (manual steps). Right column: what happens with an agent. Shows the qualitative difference.
- **Why here:** Section 1.3 is about the mental model shift. Seeing both approaches side by side crystallizes the difference.
- **Beats:** 6 per side (12 total)

```html
<div class="ix-diagram" data-component="agent-trace"
     data-variant="compare"
     data-diagram-id="m01-era-compare">
  <span class="ix-title">Same task, different paradigms</span>

  <div class="ix-trace-group" data-label="Era 2: You are the agent">
    <div class="ix-trace-line" data-type="prompt" data-delay="0">
      "The test in user.test.ts is failing. Can you help fix it?"
    </div>
    <div class="ix-trace-line" data-type="response" data-delay="1000">
      Sure! Can you share the test file and the error message?
    </div>
    <div class="ix-trace-line" data-type="prompt" data-delay="800">
      [You manually copy-paste 47 lines of test code and the error output]
    </div>
    <div class="ix-trace-line" data-type="response" data-delay="1000">
      The issue is on line 23. Change assertEquals to toEqual. Here is the corrected code: ...
    </div>
    <div class="ix-trace-line" data-type="prompt" data-delay="800">
      [You paste the fix into your editor, run npm test manually, report back]
    </div>
    <div class="ix-trace-line" data-type="response" data-delay="600">
      Glad it works!
    </div>
  </div>

  <div class="ix-trace-group" data-label="Era 3: Agent is the agent">
    <div class="ix-trace-line" data-type="prompt" data-delay="0">
      "The test in user.test.ts is failing. Fix it."
    </div>
    <div class="ix-trace-line" data-type="tool" data-delay="800">
      Read(src/user.test.ts)
    </div>
    <div class="ix-trace-line" data-type="tool" data-delay="600">
      Bash(npm test -- --filter user)
    </div>
    <div class="ix-trace-line" data-type="result" data-delay="500">
      FAIL line 23: assertEquals is not a function
    </div>
    <div class="ix-trace-line" data-type="tool" data-delay="700">
      Edit(src/user.test.ts) -- line 23: assertEquals -> toEqual
    </div>
    <div class="ix-trace-line" data-type="tool" data-delay="600">
      Bash(npm test -- --filter user)
    </div>
    <div class="ix-trace-line" data-type="result" data-delay="500">
      All tests passed
    </div>
    <div class="ix-trace-line" data-type="response" data-delay="800">
      Fixed. The test used assertEquals (not available in vitest) instead of toEqual. Tests pass now.
    </div>
  </div>
</div>
```


### Module 02: Claude Code Foundations

**Trace 4: CLAUDE.md in Action**
- **Location:** After section 2.2 "CLAUDE.md: Giving the Agent Context", after the "Writing Good CLAUDE.md Content" subsection and its Spot-The-Problems details element. Before the "2.3 Permissions" heading.
- **Variant:** B (Annotated Trace)
- **Scenario:** An agent reads CLAUDE.md at session start, then uses that context to make decisions. Shows how CLAUDE.md content actually shapes agent behavior -- the "use zod" convention prevents the agent from reaching for joi.
- **Why here:** The prose explained what belongs in CLAUDE.md. This shows students the agent reading it and using it in real time.
- **Beats:** 9

```html
<div class="ix-diagram" data-component="agent-trace"
     data-variant="annotated"
     data-diagram-id="m02-claudemd-action">
  <span class="ix-title">How CLAUDE.md shapes agent decisions</span>

  <div class="ix-trace-line" data-type="prompt" data-delay="0">
    "Add input validation to the POST /users endpoint."
    <span class="ix-trace-annotation">The engineer gives a brief task. CLAUDE.md provides the standing context.</span>
  </div>

  <div class="ix-trace-line" data-type="think" data-delay="1000">
    Let me check the project context first for conventions and constraints.
    <span class="ix-trace-annotation">The agent reads CLAUDE.md automatically at session start. It already has this context, but the thinking shows it being used.</span>
  </div>

  <div class="ix-trace-line" data-type="think" data-delay="1200">
    From CLAUDE.md: "Use zod for all runtime validation -- do not use joi or yup." I will use zod.
    <span class="ix-trace-annotation">This is the payoff of good CLAUDE.md. Without this entry, the agent might pick any validation library. With it, the decision is made before the agent writes a line of code.</span>
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="800">
    Read(src/routes/users.ts)
    <span class="ix-trace-annotation">Perceive phase: reading the existing endpoint to understand its structure.</span>
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="500">
    POST handler accepts req.body directly -- no validation currently
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="600">
    Read(package.json)
    <span class="ix-trace-annotation">The agent checks if zod is already a dependency. Good practice -- it avoids adding something already present or discovering it is missing before writing code that imports it.</span>
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="400">
    "zod": "^3.22.0" found in dependencies
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="800">
    Write(src/routes/users.ts)
    <span class="ix-trace-annotation">Act phase: the agent writes the validation schema using zod (not joi, not yup) because CLAUDE.md specified this.</span>
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="700">
    Bash(npm test)
    <span class="ix-trace-annotation">Observe phase: verifying the change did not break anything. This act-then-verify pattern is a sign of good agent behavior.</span>
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="500">
    All 24 tests passed
  </div>

  <div class="ix-trace-line" data-type="response" data-delay="800">
    Added zod validation schema for POST /users. The schema validates name (string, min 1), email (string, email format), and role (enum: admin | user). Invalid requests now return 400 with detailed error messages. All tests pass.
    <span class="ix-trace-annotation">The response is a summary of what was done. A good engineer reads this, then checks the actual diff to verify it matches.</span>
  </div>
</div>
```


**Trace 5: Permissions in Practice**
- **Location:** After section 2.3 "Permissions: The settings.json System", after the "Approval for Unspecified Actions" subsection. Before the "2.4 MCP Servers" heading.
- **Variant:** A (Terminal Replay)
- **Scenario:** An agent tries to perform actions that hit allow, deny, and ask-human boundaries. Students see the three permission outcomes in one trace.
- **Why here:** The decision tree diagram shows the logic abstractly. This trace shows it happening in a real session.
- **Beats:** 8

```html
<div class="ix-diagram" data-component="agent-trace"
     data-variant="terminal"
     data-diagram-id="m02-permissions-live">
  <span class="ix-title">Permission boundaries in a live session</span>

  <div class="ix-trace-line" data-type="prompt" data-delay="0">
    "Clean up the test fixtures and remove any unused helper files."
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="800">
    Read(tests/fixtures/helpers.ts)
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="400">
    File contents received -- Read is in the allow list, no approval needed
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="700">
    Write(tests/fixtures/helpers.ts)
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="400">
    File written -- Write(tests/**) is in the allow list
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="800">
    Bash(rm tests/fixtures/old-data.json)
  </div>

  <div class="ix-trace-line" data-type="error" data-delay="600">
    BLOCKED -- Bash(rm *) is in the deny list. This action cannot proceed.
  </div>

  <div class="ix-trace-line" data-type="think" data-delay="1000">
    The rm command is denied by permissions. I will note this file for manual removal instead of trying to delete it.
  </div>

  <div class="ix-trace-line" data-type="response" data-delay="800">
    Updated helpers.ts to remove unused exports. Note: tests/fixtures/old-data.json appears unused but I cannot delete files (rm is denied). You can remove it manually: rm tests/fixtures/old-data.json
  </div>
</div>
```


**Trace 6: MCP Tool Call**
- **Location:** After section 2.4 "MCP Servers: Extending Agent Capability", after the "Verifying MCP Connectivity" subsection and its Checkpoint details element. Before the "Permissions for MCP Tools" subsection.
- **Variant:** B (Annotated Trace)
- **Scenario:** An agent uses an MCP tool (postgres query) alongside native tools. Students see how MCP calls appear in the trace -- same format as Read/Write/Bash but with the `mcp__` prefix.
- **Why here:** MCP tools are abstract until you see them used. This grounds the concept.
- **Beats:** 7

```html
<div class="ix-diagram" data-component="agent-trace"
     data-variant="annotated"
     data-diagram-id="m02-mcp-trace">
  <span class="ix-title">MCP tools appear in traces just like native tools</span>

  <div class="ix-trace-line" data-type="prompt" data-delay="0">
    "How many users signed up last week?"
    <span class="ix-trace-annotation">A simple question, but it requires data the agent cannot get from the filesystem alone.</span>
  </div>

  <div class="ix-trace-line" data-type="think" data-delay="1000">
    I need to query the database. I have the postgres MCP server available with a query tool.
    <span class="ix-trace-annotation">The agent knows about the MCP tool because it was listed when the session started. MCP tools are discovered automatically.</span>
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="800">
    mcp__postgres__query("SELECT COUNT(*) FROM users WHERE created_at > NOW() - INTERVAL '7 days'")
    <span class="ix-trace-annotation">MCP tool calls use the pattern: mcp__{server-name}__{tool-name}. This calls the "query" tool on the "postgres" MCP server.</span>
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="600">
    [{"count": "142"}]
    <span class="ix-trace-annotation">The result comes back as structured data, just like any other tool result. The agent can use this in its response.</span>
  </div>

  <div class="ix-trace-line" data-type="think" data-delay="800">
    142 signups. Let me also check the previous week for comparison.
    <span class="ix-trace-annotation">The agent decides to add context on its own -- a sign of good reasoning. It was not asked for a comparison, but it anticipates the follow-up.</span>
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="700">
    mcp__postgres__query("SELECT COUNT(*) FROM users WHERE created_at BETWEEN NOW() - INTERVAL '14 days' AND NOW() - INTERVAL '7 days'")
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="500">
    [{"count": "98"}]
  </div>

  <div class="ix-trace-line" data-type="response" data-delay="800">
    142 users signed up in the last 7 days, up from 98 the previous week (45% increase).
    <span class="ix-trace-annotation">The response synthesizes two MCP tool results into an actionable insight. This is the value of giving agents access to external data sources.</span>
  </div>
</div>
```


### Module 03: Agent Thinking

**Trace 7: Reading a Reasoning Trace**
- **Location:** After section 3.1 "The Transparency Advantage", after the prose about "what to look for in a reasoning trace". Before section 3.2.
- **Variant:** B (Annotated Trace)
- **Scenario:** A moderately complex task where the agent's thinking reveals its plan, assumptions, and decision-making. Annotations act as an instructor voice teaching students what to look for.
- **Why here:** Section 3.1 tells students that reading traces is a skill. This trace is the first "practice reading" exercise.
- **Beats:** 11

```html
<div class="ix-diagram" data-component="agent-trace"
     data-variant="annotated"
     data-diagram-id="m03-reading-trace">
  <span class="ix-title">Practice reading: what is the agent's plan?</span>

  <div class="ix-trace-line" data-type="prompt" data-delay="0">
    "The login endpoint returns 500 when the email field is missing. Fix it."
    <span class="ix-trace-annotation">A clear, scoped bug report. Watch how the agent builds a mental model before acting.</span>
  </div>

  <div class="ix-trace-line" data-type="think" data-delay="1200">
    A 500 on missing email likely means the handler is trying to use req.body.email without checking if it exists first. I should look at the login route handler and its validation logic (if any).
    <span class="ix-trace-annotation">KEY SIGNAL: The agent states a hypothesis. This is what you scan for -- is the hypothesis reasonable? Here it is: the handler does not validate inputs. That is a plausible guess for a 500 error.</span>
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="800" data-prao="perceive">
    Read(src/routes/auth.ts)
    <span class="ix-trace-annotation">It reads the specific file mentioned in the error. Good targeting -- it did not start with a broad directory listing.</span>
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="500">
    Line 14: const user = await db.users.findByEmail(req.body.email) -- no null check on email
    <span class="ix-trace-annotation">The result confirms the hypothesis. The agent found the bug: req.body.email is used without validation.</span>
  </div>

  <div class="ix-trace-line" data-type="think" data-delay="1000">
    Confirmed: no input validation. The fix should add a check for missing email and return 400 with a clear error message instead of letting the query fail with a 500. Let me also check if there is a validation pattern used elsewhere in this project.
    <span class="ix-trace-annotation">KEY SIGNAL: The agent does not just fix the immediate bug -- it checks for existing patterns. This prevents introducing an inconsistent style. This is the kind of thinking you want to see.</span>
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="700">
    Read(src/routes/users.ts)
    <span class="ix-trace-annotation">Looking at another route file to find the project's validation pattern. Smart context-gathering.</span>
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="500">
    Line 8: const schema = z.object({ name: z.string(), email: z.string().email() }) -- uses zod
    <span class="ix-trace-annotation">The agent found the pattern: this project uses zod for validation. It will now follow the same approach for consistency.</span>
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="800">
    Edit(src/routes/auth.ts) -- added zod schema for login endpoint, returns 400 on validation failure
    <span class="ix-trace-annotation">The fix follows the existing project pattern rather than inventing a new approach. This is why reading other files before acting matters.</span>
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="700">
    Bash(npm test -- --filter auth)
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="500">
    All 8 tests passed
  </div>

  <div class="ix-trace-line" data-type="response" data-delay="800">
    Fixed. Added zod validation to the login endpoint matching the pattern used in users.ts. Missing or invalid email now returns 400 with a descriptive error instead of 500. Tests pass.
    <span class="ix-trace-annotation">The response accurately describes what changed and why. Compare this to the actual tool calls above -- does it match? (Yes.) This verification step is part of professional trace reading.</span>
  </div>
</div>
```


**Trace 8: Tool Call Patterns**
- **Location:** After section 3.2 "Common Tool Call Patterns", after the existing click-cards diagram (`tool-patterns`) that shows the four patterns. Place after the closing `</div>` of that diagram.
- **Variant:** D (PRAO Phase Highlight)
- **Scenario:** A task that demonstrates the "Scout-Plan-Execute" and "Act-and-Verify" patterns in sequence. Students see the patterns they just learned about appearing in real output.
- **Why here:** The click-cards show patterns abstractly. This trace shows two patterns playing out in sequence in a single task.
- **Beats:** 13

```html
<div class="ix-diagram" data-component="agent-trace"
     data-variant="prao"
     data-diagram-id="m03-patterns-live">
  <span class="ix-title">Two patterns in one task: scout-plan-execute then act-and-verify</span>

  <div class="ix-trace-line" data-type="prompt" data-delay="0" data-prao="perceive">
    "Add a /health endpoint that checks database connectivity."
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="800" data-prao="perceive">
    Bash(ls src/routes/)
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="400" data-prao="perceive">
    auth.ts  users.ts  products.ts  index.ts
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="600" data-prao="perceive">
    Read(src/routes/index.ts)
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="400" data-prao="perceive">
    Router setup file -- mounts /auth, /users, /products
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="600" data-prao="perceive">
    Read(src/db/connection.ts)
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="400" data-prao="perceive">
    Drizzle ORM connection -- exports db instance and pool
  </div>

  <div class="ix-trace-line" data-type="think" data-delay="1200" data-prao="reason">
    Scout complete. I see the pattern: route files in src/routes/, mounted in index.ts, db connection via Drizzle with a pool export. Plan: create health.ts with a GET /health that runs a simple SELECT 1 via the pool, mount it in index.ts.
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="800" data-prao="act">
    Write(src/routes/health.ts)
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="600" data-prao="act">
    Edit(src/routes/index.ts) -- added import and mount for /health
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="700" data-prao="observe">
    Bash(npx tsc --noEmit)
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="400" data-prao="observe">
    No type errors
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="600" data-prao="observe">
    Bash(npm test)
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="500" data-prao="observe">
    All 31 tests passed
  </div>

  <div class="ix-trace-line" data-type="response" data-delay="800" data-prao="observe">
    Added GET /health endpoint in src/routes/health.ts. It queries SELECT 1 against the database pool and returns 200 with {"status": "ok"} or 503 with {"status": "error"} if the query fails. Mounted in index.ts. All tests pass.
  </div>
</div>
```


**Trace 9: Intervention Signals**
- **Location:** After section 3.3 "When to Intervene", after the prose about "Loop Detection" and "Scope Creep". Before section 3.4.
- **Variant:** C (Side-by-Side Compare)
- **Scenario:** Left column: a healthy agent session (making progress, varied tool calls). Right column: a stuck agent (reading the same file three times, no writes). Students learn to visually distinguish progress from spinning.
- **Why here:** Section 3.3 teaches intervention heuristics. This trace makes the "loop detection" pattern visceral -- students can see the repetition in the right column.
- **Beats:** 7 per side (14 total)

```html
<div class="ix-diagram" data-component="agent-trace"
     data-variant="compare"
     data-diagram-id="m03-intervention-signals">
  <span class="ix-title">Healthy progress vs stuck loop -- when to intervene</span>

  <div class="ix-trace-group" data-label="Healthy: making progress">
    <div class="ix-trace-line" data-type="prompt" data-delay="0">
      "Refactor the auth module to separate concerns."
    </div>
    <div class="ix-trace-line" data-type="tool" data-delay="800">
      Read(src/auth.ts)
    </div>
    <div class="ix-trace-line" data-type="think" data-delay="1000">
      This file handles validation, token generation, and middleware. I will split into three files.
    </div>
    <div class="ix-trace-line" data-type="tool" data-delay="700">
      Write(src/auth/validate.ts)
    </div>
    <div class="ix-trace-line" data-type="tool" data-delay="600">
      Write(src/auth/tokens.ts)
    </div>
    <div class="ix-trace-line" data-type="tool" data-delay="600">
      Write(src/auth/middleware.ts)
    </div>
    <div class="ix-trace-line" data-type="tool" data-delay="700">
      Bash(npm test)
    </div>
    <div class="ix-trace-line" data-type="result" data-delay="500">
      All tests passed
    </div>
  </div>

  <div class="ix-trace-group" data-label="Stuck: intervene here">
    <div class="ix-trace-line" data-type="prompt" data-delay="0">
      "Refactor the auth module to separate concerns."
    </div>
    <div class="ix-trace-line" data-type="tool" data-delay="800">
      Read(src/auth.ts)
    </div>
    <div class="ix-trace-line" data-type="think" data-delay="1200">
      This file is complex. I need to understand all the dependencies before I can split it.
    </div>
    <div class="ix-trace-line" data-type="tool" data-delay="800">
      Read(src/auth.ts)
    </div>
    <div class="ix-trace-line" data-type="think" data-delay="1000">
      There are many interconnected functions. Let me re-read to map the dependency graph.
    </div>
    <div class="ix-trace-line" data-type="tool" data-delay="800">
      Read(src/auth.ts)
    </div>
    <div class="ix-trace-line" data-type="think" data-delay="1200">
      I am still not sure how to split the circular dependencies between validateToken and refreshToken...
    </div>
    <div class="ix-trace-line" data-type="error" data-delay="800">
      [Three reads of the same file, zero writes. The agent is stuck in a perception loop. Time to intervene with a specific instruction like "Split into validate.ts, tokens.ts, and middleware.ts".]
    </div>
  </div>
</div>
```


---

## 4. Accessibility

### 4.1 Reduced Motion

When `prefers-reduced-motion: reduce` is set:
- All lines are rendered immediately (no animation delay)
- The `ixTraceLineIn` animation is disabled via CSS
- Play/Pause/Step controls are hidden (not needed)
- The trace is fully readable as a static log

### 4.2 Keyboard Navigation

- `Space` toggles play/pause
- `ArrowRight` steps forward one beat
- `R` resets the trace
- The trace container has `tabindex="0"` for focus
- All buttons have `aria-label` attributes

### 4.3 Screen Readers

- The trace output area has `role="log"` and `aria-live="polite"`
- New lines are announced as they appear
- The annotation panel has `aria-label="Trace commentary"`
- Type tags are part of the text content (e.g., "THINK: I need to read...")
- The progress indicator updates its text content on each step

### 4.4 Color Contrast

All type tag colors meet WCAG AA contrast ratio (4.5:1) against their backgrounds:
- Prompt tag: amber on dark amber bg
- Think tag: violet on dark violet bg
- Tool tag: cyan on dark cyan bg
- Result tag: green on dark green bg
- Response tag: indigo on dark indigo bg
- Error tag: red on dark red bg

These are the same phase colors already validated in the existing `ix-*` system.


---

## 5. Implementation Order

### Phase 1: Infrastructure (CSS + JS)

1. Add all `ix-trace-*` CSS to the `<style>` block in `module-viewer.html` (after the existing `ix-walk-step` styles, around line 1097)
2. Add the `initAgentTrace` function to the `<script>` block in `module-viewer.html` (after `initFlowDiagram`, around line 1530)
3. Register `'agent-trace': initAgentTrace` in the `hydrateInteractiveDiagrams` switch statement (line 1234)
4. Add mobile breakpoint styles inside the existing `@media (max-width: 600px)` block
5. Add the reduced-motion media query

### Phase 2: Module 01 Traces

6. Add Trace 1 (Terminal Replay: "What Era 3 actually looks like") to `01-paradigm-shift.md`
7. Add Trace 2 (PRAO Phase Highlight: worked example trace) to `01-paradigm-shift.md`
8. Add Trace 3 (Side-by-Side Compare: era comparison) to `01-paradigm-shift.md`

### Phase 3: Module 02 Traces

9. Add Trace 4 (Annotated: CLAUDE.md in action) to `02-claude-code-foundations.md`
10. Add Trace 5 (Terminal: permissions in practice) to `02-claude-code-foundations.md`
11. Add Trace 6 (Annotated: MCP tool call) to `02-claude-code-foundations.md`

### Phase 4: Module 03 Traces

12. Add Trace 7 (Annotated: reading a reasoning trace) to `03-agent-thinking.md`
13. Add Trace 8 (PRAO: tool call patterns live) to `03-agent-thinking.md`
14. Add Trace 9 (Side-by-Side: intervention signals) to `03-agent-thinking.md`

### Phase 5: Testing and Polish

15. Test all 9 traces in module-viewer at `/module/01`, `/module/02`, `/module/03`
16. Test mobile layout at 375px and 600px
17. Test reduced-motion behavior
18. Test keyboard navigation
19. Deploy and verify on Vercel


---

## 6. Summary

| Metric | Count |
|--------|-------|
| **Total trace animations** | 9 |
| **Variant A (Terminal Replay)** | 2 (Traces 1, 5) |
| **Variant B (Annotated Trace)** | 3 (Traces 4, 6, 7) |
| **Variant C (Side-by-Side Compare)** | 2 (Traces 3, 9) |
| **Variant D (PRAO Phase Highlight)** | 2 (Traces 2, 8) |
| **Module 01 placements** | 3 |
| **Module 02 placements** | 3 |
| **Module 03 placements** | 3 |
| **Total beats (lines of output)** | 94 |
| **New CSS classes** | ~40 (all `ix-trace-*` prefixed) |
| **New JS functions** | 1 (`initAgentTrace`) |
| **Files modified** | 4 (module-viewer.html + 3 module .md files) |

### Placement Summary

| Trace | Module | Section | Variant | Scenario |
|-------|--------|---------|---------|----------|
| 1 | 01 | After 1.1 (Disorientation Problem) | Terminal | JWT refactor -- what Era 3 looks like |
| 2 | 01 | After 1.2 (Worked Example walkthrough) | PRAO | TypeScript types -- same example, animated |
| 3 | 01 | After 1.3 (Mental Model Shift) | Compare | Same bug fix: assistant vs agent approach |
| 4 | 02 | After 2.2 (CLAUDE.md content) | Annotated | CLAUDE.md shaping validation choice |
| 5 | 02 | After 2.3 (Permissions) | Terminal | Allow/deny/block in a live session |
| 6 | 02 | After 2.4 (MCP: verify connectivity) | Annotated | MCP postgres query in action |
| 7 | 03 | After 3.1 (Transparency Advantage) | Annotated | Reading a trace -- instructor commentary |
| 8 | 03 | After 3.2 (Tool Call Patterns diagram) | PRAO | Scout-plan-execute + act-and-verify live |
| 9 | 03 | After 3.3 (Intervention: loop detection) | Compare | Healthy progress vs stuck loop |
