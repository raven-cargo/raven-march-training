# Modules 01-12 Interactive Audit (Pedagogy + Accessibility + Runtime Integrity)

**Date**: 2026-03-18  
**Scope**: Interactive HTML module experience (`/module/01` to `/module/12`) and content source files in `docs/curriculum/modules/*.md`  
**Spec Baseline**:
- `docs/curriculum/progressive-game-lab-framework.md`
- Current platform runtime (`module-viewer.html`, `vercel.json`, `index.html`, `assets/theme-toggle.js`)
- Primary-source product/protocol docs for factual validation (see Sources)

---

## Executive Summary

The modules are materially more interactive than earlier snapshots (21 component types used, quizzes/predict-reveal present across all 12 modules), but there are still production-blocking defects and pedagogical risks that will impede outcomes:

1. **Critical routing defect**: `/challenges` and `/challenge` are miswired and do not resolve cleanly in the module viewer path model.
2. **State loss defect**: theme toggle in module viewer can trigger full reload when Mermaid is present, dropping learner state.
3. **Accessibility deficits**: multiple interactive components are mouse-first (`click` only) and prediction textareas are not explicitly labeled for assistive tech.
4. **Factual drift risks**: at least two high-impact content areas (CLAUDE.md hierarchy and MCP transport deprecation language) are out of sync with current official docs/spec framing.
5. **Pedagogical unevenness**: interaction density is inconsistent after Module 03 (terminal simulations nearly disappear; some modules have low check density relative to concept depth).

---

## Parallel Review Method (Meta-Prompted Rubric)

Since subagent spawning is unavailable in this runtime, the audit was run as parallel evidence tracks:

- **Track A — Pedagogy**: Active-learning loop coverage (predict/apply/feedback/transfer), interaction density, conceptual scaffolding.
- **Track B — Accessibility/UX**: Keyboard accessibility, labeling, state persistence, low-friction navigation continuity.
- **Track C — Runtime/Content Integrity**: Link/routing correctness, component hydration coverage, factual consistency against primary docs.

Evaluation questions used per module:
- Can a student progress without external navigation recovery?
- Does each major concept include a commitment action (predict/decide/apply) and corrective feedback?
- Are interactions usable for keyboard and assistive technologies?
- Are operational claims current and source-verifiable?

---

## Findings (Prioritized)

## Critical

### C1. `/challenges` routing is broken-by-design in current viewer slug resolution
- **Evidence**:
  - `vercel.json` routes `/challenges` and `/challenge` to `"/module-viewer.html?m=../CHALLENGE-MISSIONS"` ([vercel.json](/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/vercel.json):43, [vercel.json](/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/vercel.json):44)
  - `index.html` links challenge card to `/challenges` ([index.html](/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/index.html):737)
  - `module-viewer.html` only auto-resolves path slugs for `/module/{n}` and otherwise requires visible `?m=`; fallback error is `No module specified` ([module-viewer.html](/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/module-viewer.html):5236)
- **Why it matters pedagogically**:
  - The open-ended challenge track is a core transfer mechanism and is currently brittle from the primary dashboard path.
- **Recommended fix**:
  - Add explicit path mapping in viewer for `/challenges` + `/challenge`, or use a redirect (not rewrite) so browser-visible query survives.

## High

### H1. Theme toggle can hard-reload module pages, causing learner state loss
- **Evidence**:
  - On `luxor-theme-change`, module viewer reloads if `.mermaid-wrapper` exists ([module-viewer.html](/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/module-viewer.html):5911, [module-viewer.html](/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/module-viewer.html):5913)
- **Why it matters**:
  - Loses in-progress interaction context; interrupts momentum and harms comprehension continuity.
- **Recommended fix**:
  - Re-render Mermaid nodes in-place with updated theme variables; preserve scroll and interaction state.

### H2. Keyboard accessibility gaps in interactive components
- **Evidence**:
  - `initDecisionTree` uses `click` on `.ix-tree-node` without keyboard parity ([module-viewer.html](/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/module-viewer.html):3445)
  - `initHierarchy` uses container click highlight only ([module-viewer.html](/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/module-viewer.html):4377)
  - `initRevealQuiz` reveal items are click-only cards ([module-viewer.html](/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/module-viewer.html):4678)
- **Why it matters**:
  - Keyboard-only learners cannot reliably complete core interactions; this directly impedes outcomes.
- **Recommended fix**:
  - Add `role="button"`, `tabindex="0"`, `aria-expanded`/`aria-pressed` where relevant, plus Enter/Space key handlers.

### H3. Prediction textareas are generally unlabeled for assistive technology
- **Evidence (sample)**:
  - M01 unlabeled textareas at lines 29, 67, 666, 907, 1093
  - M02 at lines 196, 839
  - M10 at lines 35, 57, 372, 544
  - M12 at lines 322, 697
- **Why it matters**:
  - Placeholder-only labeling is insufficient for robust screen-reader workflows.
- **Recommended fix**:
  - Inject explicit labels (`<label for=...>`) or `aria-label` using prompt text during hydration.

### H4. Module 02 CLAUDE.md hierarchy framing is outdated/incorrect in key places
- **Evidence**:
  - Module states `./.claude/CLAUDE.md` as “Local project -- personal overrides” ([02-claude-code-foundations.md](/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/docs/curriculum/modules/02-claude-code-foundations.md):703, [02-claude-code-foundations.md](/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/docs/curriculum/modules/02-claude-code-foundations.md):704)
- **Current source reality**:
  - Official memory docs treat `./CLAUDE.md` or `./.claude/CLAUDE.md` as project instructions; managed/user/project scopes and path-specific rules are now first-class.
- **Why it matters**:
  - Students build wrong persistence models and misconfigure team-shared context.

### H5. MCP transport deprecation language is over-absolute
- **Evidence**:
  - “never SSE” and “must not appear in any production configuration” language in M11/M12 ([11-tech-stack-adaptation.md](/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/docs/curriculum/modules/11-tech-stack-adaptation.md):149, [12-capstone-production.md](/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/docs/curriculum/modules/12-capstone-production.md):296)
- **Current spec reality**:
  - Streamable HTTP replaces HTTP+SSE for current spec, but backward compatibility guidance still exists in spec migration context.
- **Why it matters**:
  - Overstated “no exceptions” language can create incorrect operational decisions during migration.

## Medium

### M1. Companion media links are mislabeled and weakly accessible
- **Evidence**:
  - In M01-M03, “Slide Deck (PDF)”, “Explainer Video”, and “Notebook Workspace” all point to the same NotebookLM notebook URL ([01-paradigm-shift.md](/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/docs/curriculum/modules/01-paradigm-shift.md):1327, [02-claude-code-foundations.md](/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/docs/curriculum/modules/02-claude-code-foundations.md):1929, [03-agent-thinking.md](/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/docs/curriculum/modules/03-agent-thinking.md):1661)
- **Why it matters**:
  - Learners cannot predict what opens; likely auth/access friction and broken expectations.

### M2. Interaction density is uneven after early modules
- **Evidence (module metrics)**:
  - Terminal simulations: present in M01-M03 only (1,2,1 respectively), zero in M04-M12.
  - Quiz density low in M06 and M08 (1 each) despite high conceptual depth.
  - Long non-interactive spans (`>80` lines between interactive components) cluster in M01, M02, M03, M06, M11, M12.
- **Why it matters**:
  - Reduces retrieval practice frequency and increases passive reading load.

### M3. Citation consistency drops in advanced modules
- **Evidence**:
  - M11 and M12 currently have no explicit “Further Reading”/external citations sections.
- **Why it matters**:
  - Increases confabulation risk exactly where operational guidance is most consequential.

---

## Module-Level Metrics Snapshot

| Module | Components | Quizzes | Predict-Reveal | Terminal Sims | Long Non-Interactive Spans (>80 lines) |
|---|---:|---:|---:|---:|---:|
| 01 | 43 | 6 | 5 | 1 | 6 |
| 02 | 52 | 6 | 2 | 2 | 6 |
| 03 | 41 | 9 | 2 | 1 | 3 |
| 04 | 25 | 3 | 3 | 0 | 1 |
| 05 | 27 | 2 | 2 | 0 | 2 |
| 06 | 26 | 1 | 1 | 0 | 3 |
| 07 | 27 | 2 | 3 | 0 | 0 |
| 08 | 27 | 1 | 2 | 0 | 0 |
| 09 | 27 | 2 | 2 | 0 | 0 |
| 10 | 40 | 3 | 4 | 0 | 0 |
| 11 | 28 | 3 | 2 | 0 | 1 |
| 12 | 41 | 3 | 2 | 0 | 1 |

Interpretation:
- Strong component coverage overall.
- Significant runtime and accessibility issues remain.
- Mid/late modules need stronger active simulation pattern continuity.

---

## Pedagogical Impediments by Learner Profile

1. **Novice learners**
- Impediment: long concept/config stretches with low simulation reinforcement.
- Impact: weak transfer from conceptual understanding to tool behavior in real workflows.

2. **Keyboard-only learners**
- Impediment: click-only interactive surfaces in several components.
- Impact: blocked completion of check/reveal/decision tasks.

3. **Screen-reader users**
- Impediment: unlabeled predictive input fields.
- Impact: ambiguous form purpose and reduced completion confidence.

4. **Learners with low vision or contrast sensitivity**
- Impediment: theme switch can reset module state on some pages, discouraging usage.
- Impact: increased cognitive overhead and session abandonment risk.

5. **Teams using modules as operational reference**
- Impediment: factual drift in CLAUDE.md and MCP transport framing.
- Impact: incorrect setup decisions that propagate into production workflows.

---

## Recommended Remediation Plan

## P0 (Immediate: correctness + access)
1. Fix `/challenges`/`/challenge` routing and slug resolution.
2. Remove hard reload on theme toggle; implement in-place Mermaid retheme.
3. Add keyboard and ARIA parity to decision-tree, hierarchy, reveal-quiz.
4. Auto-label all generated/embedded textareas from prompt text.
5. Correct M02 hierarchy and M11/M12 transport wording against current docs/spec.

## P1 (2nd wave: pedagogy quality lift)
1. Add at least one terminal simulation in modules 04-12 where operational action is taught.
2. Raise minimum quiz/check cadence in M06 and M08 (and any module with <2 checks per major section).
3. Convert long non-interactive spans to structured micro-interactions (decision mini-checks, reveal diagnostics, compare blocks).
4. Normalize companion media links to explicit, distinct resources (direct PDF/video/workspace URLs with access notes).

## P2 (3rd wave: consistency + maintainability)
1. Add citation blocks in M11/M12 for all high-stakes operational assertions.
2. Introduce content linting checks (link validity, labeled controls, required citation markers, interaction density thresholds).
3. Create a single source-of-truth routing map to avoid rewrite/viewer slug drift.

---

## Sources

### Internal
- `docs/curriculum/progressive-game-lab-framework.md`
- `docs/curriculum/modules/*.md`
- `module-viewer.html`
- `vercel.json`
- `index.html`
- `assets/theme-toggle.js`

### External primary docs
- Claude Code memory docs: https://code.claude.com/docs/en/memory
- Claude Code settings docs: https://code.claude.com/docs/en/settings
- Claude Code permissions docs: https://code.claude.com/docs/en/permissions
- MCP transports spec (2025-03-26): https://modelcontextprotocol.io/specification/2025-03-26/basic/transports

