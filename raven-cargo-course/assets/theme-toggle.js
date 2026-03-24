(function () {
  'use strict';

  const COURSE_HOME = '/raven-cargo-course';
  const STORAGE_KEY = 'luxor-theme';
  const root = document.documentElement;
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
  const onRavenCourse =
    window.location.pathname === COURSE_HOME ||
    window.location.pathname === COURSE_HOME + '/index.html' ||
    window.location.pathname.startsWith(COURSE_HOME + '/') ||
    (window.location.protocol === 'file:' && window.location.pathname.indexOf('/raven-cargo-course/') >= 0);

  function storedTheme() {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return value === 'light' || value === 'dark' ? value : null;
    } catch (_) {
      return null;
    }
  }

  function resolvedTheme() {
    if (onRavenCourse) return 'dark';
    const saved = storedTheme();
    if (saved) return saved;
    return prefersDark && prefersDark.matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;
    updateButton(theme);
    window.dispatchEvent(new CustomEvent('luxor-theme-change', { detail: { theme } }));
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (_) {
      // no-op
    }
  }

  function nextTheme() {
    return (root.getAttribute('data-theme') || resolvedTheme()) === 'dark' ? 'light' : 'dark';
  }

  function toggleTheme() {
    const theme = nextTheme();
    saveTheme(theme);
    setTheme(theme);
  }

  function updateButton(theme) {
    const button = document.getElementById('theme-toggle-button');
    if (!button) return;

    const icon = button.querySelector('.theme-toggle-icon');
    const text = button.querySelector('.theme-toggle-text');
    const toTheme = theme === 'dark' ? 'light' : 'dark';

    button.setAttribute('aria-label', 'Switch to ' + toTheme + ' mode');
    button.setAttribute('title', 'Switch to ' + toTheme + ' mode');
    button.setAttribute('aria-pressed', String(theme === 'dark'));

    if (icon) icon.textContent = theme === 'dark' ? '🌙' : '☀️';
    if (text) text.textContent = theme === 'dark' ? 'Dark' : 'Light';
  }

  function ensureButton() {
    if (onRavenCourse) return;
    if (!document.body || document.getElementById('theme-toggle-button')) return;

    const control = document.createElement('div');
    control.className = 'theme-toggle-control';

    const button = document.createElement('button');
    button.id = 'theme-toggle-button';
    button.className = 'theme-toggle-button';
    button.type = 'button';
    button.innerHTML = '<span class="theme-toggle-icon" aria-hidden="true"></span><span class="theme-toggle-text"></span>';
    button.addEventListener('click', toggleTheme);

    control.appendChild(button);
    document.body.appendChild(control);
    updateButton(root.getAttribute('data-theme') || resolvedTheme());
  }

  function ensureDashboardLink() {
    if (!document.body || document.getElementById('dashboard-link-button')) return;
    if (window.location.pathname === COURSE_HOME || window.location.pathname === COURSE_HOME + '/index.html') return;
    if (document.querySelector('a[href="' + COURSE_HOME + '"], a[href="' + COURSE_HOME + '/index.html"]')) return;

    const control = document.createElement('div');
    control.className = 'dashboard-link-control';

    const link = document.createElement('a');
    link.id = 'dashboard-link-button';
    link.className = 'dashboard-link-button';
    link.href = COURSE_HOME;
    link.setAttribute('aria-label', 'Back to Raven course home');
    link.textContent = 'Course Home';

    control.appendChild(link);
    document.body.appendChild(control);
  }

  function init() {
    setTheme(resolvedTheme());
    ensureButton();
    ensureDashboardLink();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  if (prefersDark && typeof prefersDark.addEventListener === 'function') {
    prefersDark.addEventListener('change', function () {
      if (!storedTheme()) {
        setTheme(resolvedTheme());
      }
    });
  }

  window.LuxorTheme = {
    get: function () {
      return root.getAttribute('data-theme') || resolvedTheme();
    },
    set: function (theme) {
      if (theme !== 'light' && theme !== 'dark') return;
      saveTheme(theme);
      setTheme(theme);
    },
    clear: function () {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (_) {
        // no-op
      }
      setTheme(resolvedTheme());
    }
  };
})();
