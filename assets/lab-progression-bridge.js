(function () {
  if (window.__labProgressionBridgeLoaded) return;
  window.__labProgressionBridgeLoaded = true;

  const COURSE_PROGRESS_KEY = 'agentic-course-progress-v1';

  function getSectionCount() {
    if (typeof SECTION_COUNT === 'number' && Number.isFinite(SECTION_COUNT)) return SECTION_COUNT;
    return document.querySelectorAll('.section-block[id^="section-"]').length;
  }

  function getLabKey() {
    if (typeof LAB_KEY === 'string' && LAB_KEY) return LAB_KEY;
    return '';
  }

  function getLabXp() {
    if (typeof xp === 'number' && Number.isFinite(xp)) return xp;
    const labKey = getLabKey();
    if (!labKey) return 0;
    try {
      const raw = localStorage.getItem(`${labKey}-xp`);
      return raw ? parseInt(raw, 10) || 0 : 0;
    } catch (_) {
      return 0;
    }
  }

  function getCompletedSectionsCount() {
    if (typeof sectionComplete !== 'undefined' && Array.isArray(sectionComplete)) {
      return sectionComplete.filter(Boolean).length;
    }
    const labKey = getLabKey();
    const total = getSectionCount();
    let done = 0;
    for (let i = 0; i < total; i++) {
      try {
        if (localStorage.getItem(`${labKey}-s${i}`) === '1') done += 1;
      } catch (_) {
        // no-op
      }
    }
    return done;
  }

  function persistCourseProgress() {
    const labKey = getLabKey();
    if (!labKey) return;

    const totalSections = getSectionCount();
    const completedSections = getCompletedSectionsCount();
    const xpValue = getLabXp();

    let completed = false;
    try {
      completed = localStorage.getItem(`${labKey}-complete`) != null;
    } catch (_) {
      completed = false;
    }

    try {
      const raw = localStorage.getItem(COURSE_PROGRESS_KEY);
      const data = raw ? JSON.parse(raw) : {};
      if (!data || typeof data !== 'object') return;
      if (!data.labs || typeof data.labs !== 'object') data.labs = {};

      data.labs[labKey] = {
        completedSections,
        totalSections,
        completed,
        xp: xpValue,
        updatedAt: Date.now()
      };
      data.updatedAt = Date.now();
      localStorage.setItem(COURSE_PROGRESS_KEY, JSON.stringify(data));
    } catch (_) {
      // no-op
    }
  }

  function awardNextXp(sectionIdx) {
    const key = `next-s${sectionIdx}`;

    if (typeof awardXPOnce === 'function') {
      awardXPOnce(key, 5, 'next progression');
      return;
    }

    if (typeof awardXP === 'function') {
      if (!window.__labNextXpAwarded) window.__labNextXpAwarded = {};
      if (window.__labNextXpAwarded[key]) return;
      window.__labNextXpAwarded[key] = true;
      awardXP(5, 'next progression');
    }
  }

  function unlockSection(idx) {
    if (!Number.isInteger(idx)) return;
    const section = document.getElementById(`section-${idx}`);
    if (!section) return;
    section.classList.remove('locked');
    const overlay = section.querySelector('.lock-overlay');
    if (overlay) overlay.remove();
  }

  function markCompleteFallback(idx) {
    const labKey = getLabKey();
    if (!Number.isInteger(idx) || idx < 0) return;

    if (typeof sectionComplete !== 'undefined' && Array.isArray(sectionComplete) && idx < sectionComplete.length) {
      sectionComplete[idx] = true;
    }

    if (labKey) {
      try {
        localStorage.setItem(`${labKey}-s${idx}`, '1');
      } catch (_) {
        // no-op
      }
    }

    if (typeof checkSectionUnlock === 'function') {
      checkSectionUnlock(idx + 1);
    }
    if (typeof updateNavDots === 'function') {
      updateNavDots();
    }
  }

  function goToNextSection(currentIdx) {
    const next = document.getElementById(`section-${currentIdx + 1}`);
    if (next) {
      next.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function forceAdvance(currentIdx) {
    const total = getSectionCount();
    const isLast = currentIdx >= total - 1;

    let alreadyComplete = false;
    if (typeof sectionComplete !== 'undefined' && Array.isArray(sectionComplete) && currentIdx < sectionComplete.length) {
      alreadyComplete = !!sectionComplete[currentIdx];
    }

    if (!alreadyComplete) {
      let completedThroughPrimaryPath = false;
      if (typeof markSectionComplete === 'function') {
        try {
          markSectionComplete(currentIdx);
          completedThroughPrimaryPath = true;
        } catch (_) {
          completedThroughPrimaryPath = false;
        }
      }
      if (!completedThroughPrimaryPath) {
        markCompleteFallback(currentIdx);
      }
      awardNextXp(currentIdx);
    }

    if (!isLast) {
      unlockSection(currentIdx + 1);
      if (typeof checkSectionUnlock === 'function') {
        checkSectionUnlock(currentIdx + 1);
      }
      goToNextSection(currentIdx);
    } else if (typeof completeLab === 'function') {
      completeLab();
    }

    if (typeof updateXPDisplay === 'function') {
      updateXPDisplay();
    }

    persistCourseProgress();
  }

  function wrapProgressHooks() {
    if (typeof markSectionComplete === 'function' && !window.__labMarkSectionWrapped) {
      const originalMark = markSectionComplete;
      window.markSectionComplete = function () {
        const out = originalMark.apply(this, arguments);
        persistCourseProgress();
        return out;
      };
      window.__labMarkSectionWrapped = true;
    }

    if (typeof completeLab === 'function' && !window.__labCompleteWrapped) {
      const originalComplete = completeLab;
      window.completeLab = function () {
        const out = originalComplete.apply(this, arguments);
        persistCourseProgress();
        return out;
      };
      window.__labCompleteWrapped = true;
    }

    if (typeof awardXP === 'function' && !window.__labAwardXpWrapped) {
      const originalAwardXP = awardXP;
      window.awardXP = function () {
        const out = originalAwardXP.apply(this, arguments);
        persistCourseProgress();
        return out;
      };
      window.__labAwardXpWrapped = true;
    }
  }

  function injectStyles() {
    if (document.getElementById('lab-next-fallback-style')) return;
    const style = document.createElement('style');
    style.id = 'lab-next-fallback-style';
    style.textContent = [
      '.section-next-fallback {',
      '  margin-top: 18px;',
      '  display: flex;',
      '  justify-content: flex-end;',
      '  position: relative;',
      '  z-index: 11;',
      '}',
      '.section-next-fallback .btn {',
      '  min-width: 160px;',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  }

  function injectNextButtons() {
    const sections = Array.from(document.querySelectorAll('.section-block[id^="section-"]'));
    if (!sections.length) return;

    const total = getSectionCount();
    sections.forEach(function (section) {
      if (section.querySelector('.section-next-fallback')) return;
      const match = section.id.match(/section-(\d+)/);
      if (!match) return;

      const idx = parseInt(match[1], 10);
      const row = document.createElement('div');
      row.className = 'section-next-fallback';

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn btn-ghost';
      btn.textContent = idx >= total - 1 ? 'Complete Lab →' : 'Next Section →';
      btn.addEventListener('click', function () {
        forceAdvance(idx);
      });

      row.appendChild(btn);
      section.appendChild(row);
    });
  }

  function init() {
    if (!document.querySelector('.section-block[id^="section-"]')) return;
    injectStyles();
    wrapProgressHooks();
    injectNextButtons();
    persistCourseProgress();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
