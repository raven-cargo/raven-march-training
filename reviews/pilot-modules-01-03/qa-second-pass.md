Now I have enough data. Let me compile the audit report.

---

# 🔍 Technical QA Audit Report
## Module Viewer · Theme Toggle · Navigation/Links — Modules 01–03 & Lab Routes

---

## Executive Summary

**14 defects found** across 3 audit domains. **3 CRITICAL**, **5 HIGH**, **4 MEDIUM**, **2 LOW**.

The module-viewer rendering pipeline is architecturally sound, but the theme toggle has a significant gap that leaves module-viewer content in broken light-mode appearance. Navigation has a systemic issue: labs have no "back to dashboard" link, and the lab ordering on the dashboard is wrong for Day 2.

---

## 🔴 CRITICAL — Must Fix

### C1. Theme toggle has ZERO coverage for module-viewer elements

**Impact**: Light mode is visually broken on all 12 module pages.

The `theme-toggle.css` light-mode overrides target lab-specific classes (`pre`, `.code-block`, `.prompt-card`, `.trace-block`, `.terminal-block`, `.generated-library`), but **none** of the module-viewer's dynamically generated elements are covered:

| Module-Viewer Element | Needs Light Override? | Has Override? |
|---|---|---|
| `.module-section` (bg: `var(--surface)`) | ✅ | ❌ |
| `.code-block-wrapper` (bg: `#04080f` hardcoded) | ✅ | ❌ (partially via `[style*="..."]` selectors) |
| `.code-toolbar` (bg: `#0a0f1e` hardcoded) | ✅ | ❌ (partially via `[style*="..."]` selectors) |
| `.insight-card` (bg: `rgba(6,182,212,0.06)`) | ✅ | ❌ |
| `.process-flow` / `.process-step` (bg: `var(--raised)`) | ✅ | ❌ |
| `.mermaid-wrapper` (bg: `var(--surface)`) | ✅ | ❌ |
| `.table-wrapper` / `.module-table th` (bg: `var(--raised)`) | ✅ | ❌ |
| `nav` (bg: `rgba(8,13,26,0.9)` hardcoded) | ✅ | ❌ |
| `.reading-progress` bar | ✅ | ❌ |
| `.module-complete-banner` gradient | ✅ | ❌ |

**Root cause**: `theme-toggle.css` was authored for labs only. The module-viewer's hardcoded hex backgrounds (e.g., `#04080f`, `#0a0f1e`, `rgba(8,13,26,0.9)`) won't respond to CSS variable overrides because they're written as literal values, not `var()` references.

**Reproducible check**: Open `/module/01` → click theme toggle → observe dark code blocks against light backgrounds, dark nav against light body, and illegible mermaid diagrams.

---

### C2. CSS variable naming mismatch between labs and module-viewer

**Impact**: Theme toggle CSS overrides use `var(--bg)`, `var(--surface)`, `var(--raised)` — which matches the module-viewer's `:root` variables. BUT the labs use a **different naming convention**: `--bg-base`, `--bg-surface`, `--bg-raised`. The theme-toggle.css overrides set `--bg`, `--surface`, `--raised` in its `html[data-theme="light"]` block — this will work for the module-viewer but NOT affect any lab element that references `--bg-base` etc.

**However**, theme-toggle.css also sets `--bg-base`, `--bg-surface`, `--bg-raised` (lines 48-51), so labs get partial coverage. The risk is that any new lab or module-viewer element using the "wrong" naming convention will silently break in light mode.

**Reproducible check**: `grep -c "bg-base\|bg-surface\|bg-raised" module-viewer.html` → 0 matches. Module-viewer uses `--bg`, `--surface`, `--raised`. Labs use `--bg-base`, `--bg-surface`, `--bg-raised`. Two parallel systems, fragile.

---

### C3. Dashboard Day 2 lab ordering is wrong (05 → 04 → 06)

**Impact**: Learners see Lab 05 before Lab 04, contradicting the lab numbering and breaking pedagogical sequence.

In `index.html`, lines 343-369, Day 2 labs appear in order: **Lab 05, Lab 04, Lab 06**. The correct order should be **04, 05, 06**.

**Reproducible check**: Open `/` → scroll to Day 2 → observe card numbers: `05`, `04`, `06`.

---

## 🟠 HIGH — Should Fix

### H1. Labs have no "back to dashboard" navigation

**Impact**: Users navigating into a lab from the dashboard have no way to return except browser back button. The module-viewer has `← Dashboard` (line 390), but **zero labs** have any link back to `/` or `index.html`.

**Reproducible check**: Open `/lab/01` → look for dashboard/home link → none exists.

---

### H2. Lab "← Back" links point to wrong labs

Several labs have incorrect back-navigation:

| Lab | Back Link Text | Points To | Should Point To |
|-----|---------------|-----------|----------------|
| Lab 04 | "← Back to Lab 05" | `lab-05-prompt-engineering.html` | Lab 03 (previous) |
| Lab 05 | "← Back to Lab 03" | `lab-03-agent-thinking.html` | Lab 04 (previous in sequence) |

The navigation chain suggests a different lab ordering was intended (05→04→06) that contradicts the numbering. Either the dashboard order or the back-links need correction to create a consistent sequence.

**Reproducible check**: Open Lab 04 → scroll to bottom → "← Back to Lab 05" (semantically wrong — you'd go "back" to a lab with a higher number).

---

### H3. Module-viewer Mermaid diagrams not theme-aware

**Impact**: Mermaid theme variables are hardcoded to dark-mode hex values in `mermaid.initialize()` (lines 424-458). When light mode is active, diagrams will have dark backgrounds and dark text against a light page, making them unreadable.

**Reproducible check**: Open `/module/01` (which has a mermaid flowchart) → toggle to light mode → observe diagram retains dark theme.

**Fix approach**: Re-initialize mermaid with light-mode themeVariables when theme changes, or use CSS overrides on `.mermaid-wrapper svg` elements.

---

### H4. Module-viewer nav background is hardcoded, not variable-based

Line 53: `background: rgba(8,13,26,0.9)` — this is a hardcoded dark blue. In light mode, the sticky nav will remain dark against a light page. Should be `var(--bg)` with opacity or a themed variable.

**Reproducible check**: `/module/01` → toggle light mode → nav bar stays dark.

---

### H5. `IntersectionObserver` with 0.8 threshold may never trigger for tall sections

The read-tracking observer (line 778) uses `threshold: 0.8`, meaning 80% of a section must be visible to mark it as "read." For long sections (especially Module 01's section 1.1, which contains a mermaid diagram + substantial text), a section taller than the viewport **can never** reach 80% visibility.

**Impact**: Read progress tracking and the "Module Complete" banner may never fire for modules with long sections, silently breaking the gamification feature.

**Reproducible check**: Open `/module/01` → scroll through all content → check if nav progress indicator ever reaches "X / X read" for all sections. On viewports < 900px, tall sections likely won't register.

---

## 🟡 MEDIUM

### M1. Dashboard module links use query-string format, not clean URLs

Dashboard `index.html` links modules as `/module-viewer.html?m=01-paradigm-shift` (line 420), while `vercel.json` rewrites `/module/01` → that same URL. Users arriving via dashboard get the ugly URL in their address bar instead of the clean `/module/01` path.

**Reproducible check**: Click "Module 01" on dashboard → address bar shows `/module-viewer.html?m=01-paradigm-shift` instead of `/module/01`.

---

### M2. Module-viewer slug resolution has dead-code path

Line 478-481: The viewer first tries to extract the module number from the URL path (`/module/XX`), then falls back to the `?m=` query parameter. But since the dashboard links use `?m=` format directly, the path-based regex will never match for dashboard-originated traffic. The `MODULE_SLUGS` map (lines 462-475) is only useful when Vercel rewrites fire — but the viewer receives the full slug via `?m=`, not the numeric key.

**Impact**: Not a bug per se, but the `MODULE_SLUGS` map and path regex are dead code for all dashboard-originated visits.

---

### M3. `copyCode` uses `navigator.clipboard` without fallback

Line 549: `navigator.clipboard.writeText()` requires secure context (HTTPS) and may fail silently on HTTP or in some browsers. No fallback is provided.

**Reproducible check**: Open module viewer on `localhost` (non-HTTPS) → click "Copy" on a code block → nothing happens, no error feedback.

---

### M4. Theme toggle button overlaps module completion banner

Both are positioned in the bottom-right:
- Theme toggle: `position: fixed; right: 16px; bottom: 16px; z-index: 5000`
- Completion banner: `position: fixed; bottom: 24px; right: 24px; z-index: 200`

When the completion banner appears, it will be **behind** the theme toggle button (lower z-index), but they'll visually overlap.

**Reproducible check**: Complete all sections of any module → banner appears → observe overlap with theme toggle.

---

## 🟢 LOW

### L1. No `<meta name="description">` on module-viewer pages

Module-viewer.html has no meta description. Each rendered module page will show no description in search results or social shares.

---

### L2. Process-flow stepper lacks keyboard accessibility

The prev/next buttons (lines 710-726) support click events but don't trap focus or support keyboard arrow navigation within the stepper component. Screen reader users can operate the buttons, but the UX is suboptimal.

---

## Summary Matrix

| ID | Severity | Domain | Fix Effort | Description |
|----|----------|--------|------------|-------------|
| **C1** | 🔴 CRITICAL | Theme | ~2hr | Module-viewer elements have zero light-mode CSS coverage |
| **C2** | 🔴 CRITICAL | Theme | ~1hr | CSS variable naming split (`--bg` vs `--bg-base`) across pages |
| **C3** | 🔴 CRITICAL | Navigation | ~5min | Dashboard Day 2 labs in wrong order (05→04→06) |
| **H1** | 🟠 HIGH | Navigation | ~30min | Labs have no "back to dashboard" link |
| **H2** | 🟠 HIGH | Navigation | ~15min | Lab back-links point to wrong previous labs |
| **H3** | 🟠 HIGH | Rendering | ~1hr | Mermaid diagrams hardcoded to dark theme |
| **H4** | 🟠 HIGH | Theme | ~10min | Module-viewer nav has hardcoded dark background |
| **H5** | 🟠 HIGH | Rendering | ~15min | Read-tracking threshold 0.8 won't fire for tall sections |
| **M1** | 🟡 MEDIUM | Navigation | ~10min | Dashboard links use ugly query-string URLs |
| **M2** | 🟡 MEDIUM | Rendering | ~0min | Dead-code path in slug resolution (cosmetic) |
| **M3** | 🟡 MEDIUM | Rendering | ~20min | `navigator.clipboard` has no fallback for HTTP |
| **M4** | 🟡 MEDIUM | Theme | ~10min | Theme toggle and completion banner overlap |
| **L1** | 🟢 LOW | SEO | ~5min | No meta description on module pages |
| **L2** | 🟢 LOW | A11y | ~30min | Process-flow stepper lacks keyboard nav |

## Recommended Fix Order

1. **C3** (5 min) — Swap Lab 04/05 card order on dashboard
2. **C1 + C2 + H3 + H4** (3 hr combined) — Unified theme overhaul: normalize variable names, add light-mode rules for all module-viewer elements, make mermaid theme-aware
3. **H2** (15 min) — Fix lab back-link targets
4. **H1** (30 min) — Add dashboard back-link to all 9 labs
5. **H5** (15 min) — Lower read-tracking threshold to 0.3–0.5
6. **M1** (10 min) — Change dashboard hrefs from `/module-viewer.html?m=...` to `/module/XX`
7. **M4** (10 min) — Offset completion banner or hide theme toggle when banner is visible
