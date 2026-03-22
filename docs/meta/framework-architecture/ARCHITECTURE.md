# Lab Framework — System Architecture
**Version**: 1.0.0
**Date**: 2026-03-15
**Status**: Specification (implementation ready)

---

## Overview

The Lab Framework is a functional JavaScript module + design system CSS extracted from 9 interactive HTML labs. It eliminates 64.6% of duplicated code while preserving the self-contained, `file://`-deliverable nature of every lab.

**Before extraction**: 17,440 lines across 9 labs (~1,938 lines/lab)
**After extraction**: ~6,180 lines total (1,930 shared + 9 × 450 config)
**Reduction**: 64.6% — saves ~1,253 lines per lab

---

## Architecture Principles

### 1. Self-Contained Output (Non-Negotiable)
Labs must work when opened from a USB drive or file:// URL with no internet. This means:
- The framework is **inlined at build time**, not linked
- `build.js` reads `core.css` + `core.js` and writes them inline into each lab HTML file
- Learners receive the final `.html` files — they never see the framework source

### 2. Functional Module (IIFE)
`core.js` uses the Immediately Invoked Function Expression pattern:
```javascript
const LabFramework = (function() {
  // All components defined here — no global namespace pollution
  return { /* public API */ };
})();
```
This keeps the global scope clean while exposing a named API.

### 3. Config-Driven Labs
Each lab's unique content lives in a config object:
```javascript
LabFramework.init({
  labKey:       'lab-04',
  labName:      'MCP Server Explorer',
  dayNum:       2,
  labNum:       4,
  sectionCount: 7,
  concepts: { /* CONCEPT_REGISTRY entries */ },
  // ... lab-specific config
});
```

### 4. No Framework Lock-In
The framework generates standard DOM elements. Labs can override any style or behavior by adding inline `<style>` or `<script>` blocks after the framework include. Lab 01's particle field, Lab 04's MCP explorer, etc. remain as lab-specific code.

---

## File Structure

```
lab-framework/
├── core.css      — Design system + all component styles (800 lines)
├── core.js       — Functional module with all 9 components
├── build.js      — Node.js build script: config + framework → HTML
└── README.md     — Quick start for framework authors

labs/
├── day1/
│   ├── lab-01-paradigm-shift.html   — Self-contained (build output)
│   └── lab-01-config.js             — Lab 01 config (future labs)
├── day2/
│   └── ...
└── day3/
    └── ...

docs/meta/framework-architecture/
├── ARCHITECTURE.md      — This file
├── COMPONENT-CATALOG.md — Full API reference with examples
├── PATTERN-ANALYSIS.md  — Pattern extraction analysis (47 patterns)
└── CITATIONS-AUDIT.md   — Attribution + license audit
```

---

## Build Pipeline

```
lab-01-config.js ──┐
core.css ──────────┼──► build.js ──► lab-01-paradigm-shift.html
core.js ───────────┘                 (self-contained, ~450 lines config + ~1,930 inlined)
```

### Build Command
```bash
# Build one lab
node lab-framework/build.js labs/day1/lab-01-config.js

# Build all labs
node lab-framework/build.js --all
```

### What build.js does
1. Reads the lab config file
2. Reads `core.css` → inlines as `<style>` block
3. Reads `core.js` → inlines as `<script>` block
4. Generates lab HTML from config using component renderers
5. Writes output to `labs/day{N}/lab-{NN}-{name}.html`

---

## Component Dependency Map

```
LabFramework.init()
  │
  ├── initNavigation(sectionCount)
  │     └── updateNavDots()       ← called by markSectionComplete
  │
  ├── initPersistence(labKey)
  │     ├── saveReflection(key, value)
  │     ├── loadAllReflections()
  │     └── exportReflections()
  │
  ├── createXPEngine(labKey)
  │     ├── awardXP(amount, reason)
  │     ├── updateXPDisplay()
  │     ├── showXPToast(amount, reason)
  │     └── updateStreak(correct)
  │
  ├── createSectionGates(labKey, sectionCount)
  │     ├── markSectionComplete(idx)
  │     ├── checkSectionUnlock(idx)
  │     └── completeLab()
  │
  └── Components (render to DOM)
        ├── PredictionChallenge(config)
        ├── KnowledgeCheck(config)
        ├── ApplyTask(config)
        ├── renderCallbackCard(config)
        └── renderInfoCard(config)
```

---

## Extraction Rationale

### Why These 9 Functions Are Identical Across All Labs

The pattern analysis confirmed that function names such as `awardXP`, `markSectionComplete`, `checkSectionUnlock`, `saveReflection`, `loadAllReflections`, `exportReflections`, `updateNavDots`, `checkMinChars`, and `showXPToast` appear **verbatim** in every lab that includes them. This is not coincidence — it reflects a deliberate design decision made during the initial framework specification. Extraction requires zero renaming.

### Why CSS Is Identical

All labs share the identical `:root` token block (19 variables), typography hierarchy, button styles, card layouts, and quiz component styles. The only differences are lab-specific sections (particle field in Lab 01, schema visualizer in Lab 05, etc.) which remain as inline styles in each lab.

### Why Self-Contained HTML (Not a Live CDN)

The course is designed for professional training environments where:
- Internet access may be restricted (financial, government, healthcare clients)
- USB-based distribution is standard practice
- Participants open files directly in browser without a server

A build step that inlines framework code preserves this delivery model while eliminating the maintenance burden of duplicated code.

---

## Implementation Phases

### Phase 1 — Specification (COMPLETE)
- Pattern analysis across all 9 labs ✅
- Component API design ✅
- Architecture documentation ✅
- Citation audit ✅

### Phase 2 — Framework Files (READY)
- `core.css` written ✅
- `core.js` to write (component implementations)
- `build.js` to write (inline build script)

### Phase 3 — Migration (Future)
- Write `lab-01-config.js` through `lab-09-config.js`
- Run build.js to regenerate labs from config
- Verify output matches current lab behavior
- Future labs require only ~450 lines of config

---
*Framework Architecture v1.0.0 | 2026-03-15 | Agentic AI Engineering Course*
