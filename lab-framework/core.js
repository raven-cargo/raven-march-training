/**
 * Lab Framework — Core JavaScript Module
 * ═══════════════════════════════════════════════════════════════════
 * Functional module (IIFE) extracted from 9 Agentic AI Engineering labs.
 * All function names are identical to those used in the existing labs.
 *
 * Usage:
 *   // In lab HTML (after framework is inlined by build.js):
 *   LabFramework.init({ labKey: 'lab-04', sectionCount: 7, ... });
 *
 * Public API:
 *   LabFramework.init(config)
 *   LabFramework.awardXP(amount, reason)
 *   LabFramework.updateStreak(correct)
 *   LabFramework.saveReflection(key, value)
 *   LabFramework.loadAllReflections()
 *   LabFramework.exportReflections()
 *   LabFramework.markSectionComplete(idx)
 *   LabFramework.checkSectionUnlock(idx)
 *   LabFramework.completeLab()
 *   LabFramework.checkMinChars(taId, btnId, min, hintId)
 *   LabFramework.updateNavDots()
 *   LabFramework.PredictionChallenge(config)
 *   LabFramework.KnowledgeCheck(config)
 *   LabFramework.ApplyTask(config)
 *   LabFramework.renderCallbackCard(config)
 *   LabFramework.renderInfoCard(config)
 * ═══════════════════════════════════════════════════════════════════
 */

const LabFramework = (function () {
  'use strict';

  // ─── Module State ──────────────────────────────────────────────────
  let LAB_KEY = '';
  let SECTION_COUNT = 0;
  let CONCEPT_REGISTRY = {};
  let sectionComplete = [];
  let xp = 0;
  let streak = 0;
  const xpAwardedFor = {};
  const streakThresholdsHit = { 3: false, 5: false, 7: false };

  // ─── Init ───────────────────────────────────────────────────────────
  /**
   * Initialize the lab framework.
   * @param {Object} config
   * @param {string} config.labKey          — localStorage prefix (e.g. 'lab-04')
   * @param {string} config.labName         — displayed in nav title
   * @param {number} config.dayNum          — 1 | 2 | 3
   * @param {number} config.labNum          — 1-9
   * @param {number} config.sectionCount    — total sections (0-indexed)
   * @param {boolean} [config.showStreak]   — show streak display in nav
   * @param {Object} [config.concepts]      — CONCEPT_REGISTRY entries
   */
  function init(config) {
    LAB_KEY       = config.labKey;
    SECTION_COUNT = config.sectionCount;
    CONCEPT_REGISTRY = config.concepts || {};
    sectionComplete = new Array(SECTION_COUNT).fill(false);

    _buildNav(config);
    _setupScrollProgress();
    _setupScrollVisibility();
    loadAllReflections();
  }

  // ─── Navigation ─────────────────────────────────────────────────────
  function _buildNav(config) {
    const nav = document.querySelector('nav');
    if (!nav) return;

    const brand = nav.querySelector('.nav-brand');
    if (brand) {
      brand.innerHTML = `
        <span class="nav-badge">Day ${config.dayNum} · Lab ${String(config.labNum).padStart(2, '0')}</span>
        <span>${config.labName}</span>
      `;
    }

    // Build nav dots container if not present
    let dotsContainer = document.getElementById('nav-dots');
    if (!dotsContainer) {
      dotsContainer = document.createElement('div');
      dotsContainer.id = 'nav-dots';
      dotsContainer.className = 'nav-sections';
      dotsContainer.setAttribute('role', 'list');
      nav.appendChild(dotsContainer);
    }

    // Stats (XP + streak)
    let stats = nav.querySelector('.nav-stats');
    if (!stats) {
      stats = document.createElement('div');
      stats.className = 'nav-stats';
      stats.innerHTML = `
        <div class="xp-display">⚡ <span id="xp-value">0</span> XP</div>
        ${config.showStreak !== false ? '<div class="streak-display" id="streak-display"></div>' : ''}
        <button class="btn btn-ghost" onclick="LabFramework.exportReflections()" style="padding:6px 14px;font-size:13px;">↓ Export</button>
      `;
      nav.appendChild(stats);
    }

    updateNavDots();
  }

  function updateNavDots() {
    const container = document.getElementById('nav-dots');
    if (!container) return;

    // Build dots if empty
    if (container.children.length === 0) {
      for (let i = 0; i < SECTION_COUNT; i++) {
        const dot = document.createElement('div');
        dot.className = 'nav-dot dot-locked';
        dot.setAttribute('role', 'listitem');
        dot.setAttribute('aria-label', `Section ${i + 1}`);
        dot.addEventListener('click', () => {
          const section = document.getElementById('section-' + i);
          if (section) section.scrollIntoView({ behavior: 'smooth' });
        });
        container.appendChild(dot);
      }
    }

    const dots = container.querySelectorAll('.nav-dot');
    const firstIncomplete = sectionComplete.indexOf(false);

    dots.forEach((dot, i) => {
      dot.classList.remove('dot-locked', 'dot-active', 'dot-complete');
      if (sectionComplete[i]) {
        dot.classList.add('dot-complete');
        dot.setAttribute('aria-label', `Section ${i + 1}: Complete`);
      } else if (i === firstIncomplete) {
        dot.classList.add('dot-active');
        dot.setAttribute('aria-label', `Section ${i + 1}: Current`);
      } else {
        dot.classList.add('dot-locked');
        dot.setAttribute('aria-label', `Section ${i + 1}: Locked`);
      }
    });
  }

  // ─── Scroll Progress & Section Visibility ──────────────────────────
  function _setupScrollProgress() {
    const bar = document.getElementById('progress-bar');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const d = document.documentElement;
      const pct = (d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100;
      bar.style.width = Math.min(pct, 100) + '%';
    }, { passive: true });
  }

  function _setupScrollVisibility() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });
  }

  // ─── XP System ──────────────────────────────────────────────────────
  function awardXP(amount, reason) {
    xp += amount;
    localStorage.setItem(LAB_KEY + '-xp', xp.toString());
    updateXPDisplay();
    showXPToast(amount, reason);
  }

  function updateXPDisplay() {
    const el = document.getElementById('xp-value');
    if (el) el.textContent = xp;
    const finalEl = document.getElementById('final-xp');
    if (finalEl) finalEl.textContent = xp;
  }

  function showXPToast(amount, reason) {
    const toast = document.createElement('div');
    toast.className = 'xp-toast';
    toast.textContent = '+' + amount + ' XP — ' + reason;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2200);
  }

  // ─── Streak System ───────────────────────────────────────────────────
  function updateStreak(correct) {
    if (correct) {
      streak++;
      const el = document.getElementById('streak-display');
      if (!el) return;
      el.style.display = 'flex';
      if (streak >= 7) {
        el.className = 'streak-display streak-7';
        el.textContent = '👑 ' + streak + ' streak';
        if (!streakThresholdsHit[7]) { streakThresholdsHit[7] = true; awardXP(25, 'streak bonus'); }
      } else if (streak >= 5) {
        el.className = 'streak-display streak-5';
        el.textContent = '⚡ ' + streak + ' streak';
        if (!streakThresholdsHit[5]) { streakThresholdsHit[5] = true; awardXP(25, 'streak bonus'); }
      } else if (streak >= 3) {
        el.className = 'streak-display streak-3';
        el.textContent = '🔥 ' + streak + ' streak';
        if (!streakThresholdsHit[3]) { streakThresholdsHit[3] = true; awardXP(25, 'streak bonus'); }
      }
    } else {
      streak = 0;
      const el = document.getElementById('streak-display');
      if (el) el.style.display = 'none';
    }
  }

  // ─── Persistence ─────────────────────────────────────────────────────
  function saveReflection(key, value) {
    localStorage.setItem(LAB_KEY + '-' + key, value);
  }

  function loadAllReflections() {
    // Restore textarea values
    document.querySelectorAll('textarea[id]').forEach(ta => {
      const saved = localStorage.getItem(LAB_KEY + '-' + ta.id);
      if (saved) ta.value = saved;
    });

    // Restore section completion
    for (let i = 0; i < SECTION_COUNT; i++) {
      if (localStorage.getItem(LAB_KEY + '-s' + i) === '1') {
        sectionComplete[i] = true;
      }
    }

    // Restore XP
    xp = parseInt(localStorage.getItem(LAB_KEY + '-xp') || '0');
    updateXPDisplay();

    // Re-check all section unlocks and nav dots
    for (let i = 0; i < SECTION_COUNT; i++) checkSectionUnlock(i);
    updateNavDots();
  }

  function exportReflections() {
    let content = 'Lab ' + LAB_KEY.replace('lab-', '') + ' — Reflections\n';
    content += 'Exported: ' + new Date().toLocaleDateString() + '\n';
    content += 'XP Earned: ' + xp + '\n\n';
    document.querySelectorAll('textarea[id]').forEach(ta => {
      if (ta.value.trim()) {
        content += '[' + ta.id + ']\n' + ta.value.trim() + '\n\n';
      }
    });
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = LAB_KEY + '-reflections.txt';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  // ─── Character Gate ───────────────────────────────────────────────────
  function checkMinChars(taId, btnId, min, hintId) {
    const ta   = document.getElementById(taId);
    const btn  = document.getElementById(btnId);
    const hint = document.getElementById(hintId);
    if (!ta || !btn) return;

    const len       = ta.value.trim().length;
    const remaining = Math.max(0, min - len);

    if (remaining > 0) {
      if (hint) { hint.textContent = remaining + ' more characters to activate'; hint.className = 'char-hint'; }
      btn.disabled = true;
    } else {
      if (hint) { hint.textContent = '✓ Ready'; hint.className = 'char-hint char-ready'; }
      btn.disabled = false;
      if (!xpAwardedFor[taId]) {
        xpAwardedFor[taId] = true;
        const isPrediction = (min === 15);
        awardXP(isPrediction ? 10 : 20, isPrediction ? 'prediction committed' : 'response submitted');
      }
    }
  }

  // ─── Section Gates ────────────────────────────────────────────────────
  function markSectionComplete(idx) {
    if (sectionComplete[idx]) return; // idempotent
    sectionComplete[idx] = true;
    localStorage.setItem(LAB_KEY + '-s' + idx, '1');
    checkSectionUnlock(idx + 1);
    updateNavDots();
    if (idx === SECTION_COUNT - 1) completeLab();
  }

  function checkSectionUnlock(idx) {
    if (idx >= SECTION_COUNT) return;
    const section = document.getElementById('section-' + idx);
    if (!section) return;
    const allPriorDone = idx === 0 || sectionComplete.slice(0, idx).every(Boolean);
    if (allPriorDone) {
      section.classList.remove('locked');
      const overlay = section.querySelector('.lock-overlay');
      if (overlay) overlay.style.display = 'none';
    }
  }

  function completeLab() {
    awardXP(100, 'lab complete!');
    const banner = document.getElementById('completion-banner');
    if (banner) {
      banner.style.display = 'block';
      banner.scrollIntoView({ behavior: 'smooth' });
    }
    localStorage.setItem(LAB_KEY + '-complete', Date.now().toString());
  }

  // ─── Component: Prediction Challenge ─────────────────────────────────
  /**
   * Renders a 3-phase Predict → Reveal → Apply card.
   * @param {Object} config
   * @param {string} config.containerId     — ID of container to render into
   * @param {string} config.badge           — Badge label text
   * @param {string} config.question        — Predict phase question
   * @param {string} [config.placeholder]   — Textarea placeholder
   * @param {number} [config.predictMin=15] — Min chars to enable reveal
   * @param {number} [config.predictXP=10]  — XP for committing prediction
   * @param {string} config.revealContent   — HTML content for reveal phase
   * @param {string} config.applyPrompt     — Apply phase instructions
   * @param {number} [config.applyMin=40]   — Min chars for apply
   * @param {string} [config.modelAnswer]   — HTML for model answer
   * @param {Function} [config.onComplete]  — Called after apply submitted
   */
  function PredictionChallenge(config) {
    const container = document.getElementById(config.containerId);
    if (!container) return;

    const id          = config.containerId;
    const predictMin  = config.predictMin  || 15;
    const applyMin    = config.applyMin    || 40;
    const placeholder = config.placeholder || 'Write your prediction here...';
    const applyPlaceholder = config.applyPlaceholder || 'Write your response here...';

    container.innerHTML = `
      <div class="challenge-card">
        <span class="card-badge challenge">${_esc(config.badge || 'Prediction Challenge')}</span>
        <div class="challenge-predict">
          <p style="margin-bottom:16px;color:var(--text-muted);">${config.question || ''}</p>
          <textarea id="${id}-predict"
            placeholder="${_esc(placeholder)}"
            rows="4"
            oninput="LabFramework.saveReflection('${id}-predict',this.value);LabFramework.checkMinChars('${id}-predict','${id}-reveal-btn',${predictMin},'${id}-predict-hint')"
          ></textarea>
          <span class="char-hint" id="${id}-predict-hint">${predictMin} characters to activate</span>
          <div style="margin-top:12px;">
            <button class="btn btn-primary" id="${id}-reveal-btn" disabled
              onclick="document.getElementById('${id}-reveal').classList.add('revealed');this.style.display='none';">
              Lock In Prediction →
            </button>
          </div>
        </div>
        <div class="challenge-reveal" id="${id}-reveal">
          ${config.revealContent || ''}
          <div class="challenge-apply" id="${id}-apply" style="margin-top:20px;padding-top:20px;border-top:1px solid var(--border);display:none;">
            <p style="margin-bottom:16px;color:var(--text-muted);">${config.applyPrompt || 'Now apply this:'}</p>
            <textarea id="${id}-apply-text"
              placeholder="${_esc(applyPlaceholder)}"
              rows="5"
              oninput="LabFramework.saveReflection('${id}-apply-text',this.value);LabFramework.checkMinChars('${id}-apply-text','${id}-apply-btn',${applyMin},'${id}-apply-hint')"
            ></textarea>
            <span class="char-hint" id="${id}-apply-hint">${applyMin} characters to activate</span>
            <div style="margin-top:12px;">
              <button class="btn btn-primary" id="${id}-apply-btn" disabled
                onclick="_challengeSubmit('${id}')">
                Submit Response →
              </button>
            </div>
            ${config.modelAnswer ? `
            <div class="model-answer" id="${id}-model-answer">
              <div class="card-badge insight" style="margin-bottom:12px;">Model Answer</div>
              ${config.modelAnswer}
            </div>` : ''}
          </div>
        </div>
      </div>
    `;

    // Show apply phase when reveal is opened
    const revealEl = document.getElementById(id + '-reveal');
    if (revealEl) {
      const applyEl = document.getElementById(id + '-apply');
      const observer = new MutationObserver(() => {
        if (revealEl.classList.contains('revealed') && applyEl) {
          applyEl.style.display = 'block';
        }
      });
      observer.observe(revealEl, { attributes: true, attributeFilter: ['class'] });
    }

    // Store callback for submit
    window['_challengeSubmit'] = window['_challengeSubmit'] || {};
    window._challengeOnComplete = window._challengeOnComplete || {};
    window._challengeOnComplete[id] = config.onComplete;

    window._challengeSubmit = function(challengeId) {
      const modelAnswer = document.getElementById(challengeId + '-model-answer');
      if (modelAnswer) modelAnswer.classList.add('show');
      const cb = window._challengeOnComplete && window._challengeOnComplete[challengeId];
      if (cb) cb();
    };

    // Restore saved state
    _restoreTextarea(id + '-predict');
    _restoreTextarea(id + '-apply-text');
  }

  // ─── Component: Knowledge Check ──────────────────────────────────────
  /**
   * Renders a multiple-choice knowledge check.
   * @param {Object} config
   * @param {string} config.containerId    — element to render into
   * @param {string} config.question       — question text
   * @param {Array}  config.options        — [{letter, text, correct, feedback}]
   * @param {number} [config.xp=30]        — XP for correct answer
   * @param {Function} [config.onCorrect]  — called on correct answer
   */
  function KnowledgeCheck(config) {
    const container = document.getElementById(config.containerId);
    if (!container) return;

    const id  = config.containerId;
    const xpAmt = config.xp || 30;

    const optionsHTML = (config.options || []).map((opt, idx) => `
      <button class="answer-option" id="${id}-opt-${idx}"
        onclick="_kcAnswer('${id}', ${idx}, ${opt.correct}, ${xpAmt})">
        <span class="opt-letter">${_esc(opt.letter)}</span>
        <div style="flex:1;">
          <div class="opt-text">${_esc(opt.text)}</div>
          <div class="opt-feedback ${opt.correct ? 'correct-fb' : 'incorrect-fb'}" id="${id}-fb-${idx}">
            ${_esc(opt.feedback || '')}
          </div>
        </div>
      </button>
    `).join('');

    container.innerHTML = `
      <div class="quiz-container">
        <span class="card-badge knowledge">Knowledge Check</span>
        <p style="font-size:16px;font-weight:600;color:var(--text);margin-bottom:4px;">${config.question || ''}</p>
        <div class="answer-options" id="${id}-options">
          ${optionsHTML}
        </div>
      </div>
    `;

    // Store callbacks
    window._kcCallbacks = window._kcCallbacks || {};
    window._kcCallbacks[id] = config.onCorrect;

    window._kcAnswer = function(kcId, idx, correct, xpAmount) {
      const optionsEl = document.getElementById(kcId + '-options');
      if (!optionsEl) return;

      // Disable all options
      optionsEl.querySelectorAll('.answer-option').forEach(btn => {
        btn.disabled = true;
        btn.style.cursor = 'default';
      });

      // Mark selected
      const selectedBtn = document.getElementById(kcId + '-opt-' + idx);
      const feedback    = document.getElementById(kcId + '-fb-' + idx);
      if (selectedBtn) selectedBtn.classList.add(correct ? 'correct' : 'incorrect');
      if (feedback)    feedback.classList.add('show');

      if (correct) {
        awardXP(xpAmount, 'correct answer');
        updateStreak(true);
        const cb = window._kcCallbacks && window._kcCallbacks[kcId];
        if (cb) cb();
      } else {
        updateStreak(false);
      }
    };
  }

  // ─── Component: Apply Task ───────────────────────────────────────────
  /**
   * Standalone textarea with optional model-answer reveal.
   * @param {Object} config
   * @param {string} config.containerId    — element to render into
   * @param {string} config.prompt         — instructions above textarea
   * @param {string} [config.placeholder]
   * @param {number} [config.minChars=40]
   * @param {number} [config.xp=20]
   * @param {string} [config.modelAnswer]  — HTML for model answer
   * @param {Function} [config.onComplete]
   */
  function ApplyTask(config) {
    const container = document.getElementById(config.containerId);
    if (!container) return;

    const id         = config.containerId;
    const minChars   = config.minChars   || 40;
    const xpAmt      = config.xp         || 20;
    const placeholder = config.placeholder || 'Write your response here...';

    container.innerHTML = `
      <p style="margin-bottom:16px;color:var(--text-muted);">${config.prompt || ''}</p>
      <textarea id="${id}-text"
        placeholder="${_esc(placeholder)}"
        rows="6"
        oninput="LabFramework.saveReflection('${id}-text',this.value);LabFramework.checkMinChars('${id}-text','${id}-btn',${minChars},'${id}-hint')"
      ></textarea>
      <span class="char-hint" id="${id}-hint">${minChars} characters to activate</span>
      <div style="margin-top:12px;">
        <button class="btn btn-primary" id="${id}-btn" disabled
          onclick="_applySubmit('${id}')">
          Submit →
        </button>
      </div>
      ${config.modelAnswer ? `
      <div class="model-answer" id="${id}-model-answer">
        <div class="card-badge insight" style="margin-bottom:12px;">Model Answer</div>
        ${config.modelAnswer}
      </div>` : ''}
    `;

    window._applyCallbacks = window._applyCallbacks || {};
    window._applyCallbacks[id] = config.onComplete;

    window._applySubmit = function(applyId) {
      const modelAnswer = document.getElementById(applyId + '-model-answer');
      if (modelAnswer) modelAnswer.classList.add('show');
      const cb = window._applyCallbacks && window._applyCallbacks[applyId];
      if (cb) cb();
    };

    _restoreTextarea(id + '-text');
  }

  // ─── Component: Callback Card ─────────────────────────────────────────
  /**
   * Renders a "Concept Callback" card referencing a prior lab concept.
   * @param {Object} config
   * @param {string} config.containerId   — element to render into
   * @param {string} config.conceptKey    — key in CONCEPT_REGISTRY
   * @param {string} [config.connection]  — how concept connects to current section
   */
  function renderCallbackCard(config) {
    const container = document.getElementById(config.containerId);
    if (!container) return;

    const concept = CONCEPT_REGISTRY[config.conceptKey];
    if (!concept) {
      console.warn('LabFramework: unknown concept key:', config.conceptKey);
      return;
    }

    container.innerHTML = `
      <div class="callback-card" id="${config.containerId}-card">
        <span class="callback-icon">🔁</span>
        <div class="callback-content">
          <div class="callback-label">Concept Callback</div>
          <strong>
            <a class="callback-link" href="${_esc(concept.originHref)}">${_esc(concept.label)}</a>
          </strong>
          <p class="callback-brief">
            ${_esc(concept.brief)}${config.connection ? ' — ' + _esc(config.connection) : ''}
          </p>
        </div>
      </div>
    `;
  }

  /**
   * Show a callback card (add .show class).
   * @param {string} containerId
   */
  function showCallbackCard(containerId) {
    const el = document.getElementById(containerId);
    if (el) el.classList.add('show');
    const card = document.getElementById(containerId + '-card');
    if (card) card.classList.add('show');
  }

  // ─── Component: Info Card ─────────────────────────────────────────────
  /**
   * Renders a colored callout/insight card.
   * @param {Object} config
   * @param {string} config.containerId
   * @param {string} config.title
   * @param {string} config.body          — HTML allowed
   * @param {string} [config.variant]     — 'primary' | 'warning' | 'success' | 'accent'
   */
  function renderInfoCard(config) {
    const container = document.getElementById(config.containerId);
    if (!container) return;

    const variant = config.variant || 'primary';
    container.innerHTML = `
      <div class="info-card ${variant}">
        ${config.title ? `<div class="info-card-title">${_esc(config.title)}</div>` : ''}
        <div>${config.body || ''}</div>
      </div>
    `;
  }

  // ─── Utilities ────────────────────────────────────────────────────────
  function _esc(str) {
    if (typeof str !== 'string') return str || '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function _restoreTextarea(id) {
    const ta = document.getElementById(id);
    if (!ta) return;
    const saved = localStorage.getItem(LAB_KEY + '-' + id);
    if (saved) ta.value = saved;
  }

  // ─── Public API ────────────────────────────────────────────────────────
  return {
    init,
    awardXP,
    updateXPDisplay,
    showXPToast,
    updateStreak,
    saveReflection,
    loadAllReflections,
    exportReflections,
    checkMinChars,
    markSectionComplete,
    checkSectionUnlock,
    completeLab,
    updateNavDots,
    PredictionChallenge,
    KnowledgeCheck,
    ApplyTask,
    renderCallbackCard,
    showCallbackCard,
    renderInfoCard,
  };
})();
