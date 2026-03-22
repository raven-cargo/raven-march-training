# Modules 01–12 Second-Pass Clean Review (2026-03-18)

## Scope
- Audited all 12 module markdown sources and runtime routing behavior.
- Re-validated lab/module/challenge route health on production.
- Re-checked curriculum consistency against:
  - `docs/curriculum/progressive-game-lab-framework.md`
  - `docs/plans/modules-readiness-audit.md`
- Applied targeted pedagogy and interaction fixes for weak modules.

## Execution Model
- Attempted to run review via subagents (including MERCURIO variants).
- Runtime limitation encountered: agent launcher reports no available agent types.
- Continued with 4 parallel review tracks in-context:
  1. Runtime/routes/links
  2. Interaction coverage (quiz/predict/terminal/trace)
  3. Terminology and conceptual consistency
  4. Accessibility and UX risk signals

## What Was Fixed In This Pass

### 1) Interaction density upgrades (M06, M08, M11, M12)
- Added new `predict-reveal` in M06:
  - `m06-error-classification-predict`
- Added new `predict-reveal` + new quiz in M08:
  - `m08-loop-bottleneck-predict`
  - `m08-limits-predict`
  - `m08-loop-knowledge-check`
- Added new mid-module quiz in M11:
  - `m11-adaptation-midpoint-check`
- Added new `predict-reveal` + new quiz in M12:
  - `m12-maintenance-predict`
  - `m12-maintenance-quiz`

### 2) Terminology consistency hardening
- Updated M08 wording where trace examples referenced `triggers` to explicitly mark it as optional LUXOR-specific metadata, not native Claude Code runtime behavior.

### 3) Issue register updates
- Updated `docs/reviews/issues.md` to reflect pass-2 status changes:
  - P1 resolved moved from **4/12** to **10/12**
  - Remaining open P1 items reduced to 2 (`P1-11`, `P1-12`)

### 4) Module viewer resilience patch
- Added error-state diagnostics and one-click retry in `module-viewer.html`:
  - `#error-hint` contextual troubleshooting message
  - `#retry-load` button for immediate reload

## Validation Results

### Production route health (deployed)
- `200` for all audited routes:
  - `/`, `/challenges`
  - `/lab/01` ... `/lab/09`
  - `/module/01` ... `/module/12`
  - `/module/1` ... `/module/9`

### Content endpoint health (deployed)
- `200` for all module markdown endpoints and challenge markdown endpoint:
  - `/docs/curriculum/modules/01-paradigm-shift.md` ... `/12-capstone-production.md`
  - `/docs/curriculum/CHALLENGE-MISSIONS.md`

### Navigation integrity
- Labs: all expected adjacent links present (`prev` / `next`) across Lab 01–09.
- Modules: all module files include previous/next mapping coverage (`/module/NN` links present; viewer also appends missing links dynamically).

### Module-viewer runtime sanity
- Inline JavaScript parse check in `module-viewer.html`: pass.

## Updated Interaction Coverage (selected modules)
| Module | Quizzes | Predict-Reveal | Terminal Sim |
|---|---:|---:|---:|
| M06 | 1 | 2 | 0 |
| M08 | 2 | 4 | 0 |
| M11 | 2 | 2 | 0 |
| M12 | 2 | 3 | 0 |

## Remaining Critical/High-Leverage Gaps

### R1 — Some modules still under-assess comprehension mid-flow
- Modules 04, 05, 06, and 09 still have one `quiz` component each.
- Risk: weaker retrieval-practice cadence compared to labs.
- Recommendation: add one mid-module check each (prefer section transitions where misconceptions are predictable).

### R2 — Terminal simulation coverage remains thin outside early modules
- Terminal sims are concentrated in M01–M03 and M02 specifically.
- Risk: reduced transfer for CLI decision-making in advanced modules.
- Recommendation: add at least one `terminal-sim` in M05 or M06 and one in M11 or M12 for “production debugging” transfer.

### R3 — M08 still has low collapse depth
- P1-12 remains open: collapse/disclosure density below target.
- Risk: long-scroll fatigue and weaker learner pacing control.

### R4 — Callout stacking remains in M01/M03
- P1-11 remains open: stacked callouts reduce signal-to-noise.
- Recommendation: refactor grouped callouts to `tabbed-panel` or `click-cards` where concept families exist.

## “Module Content Not Showing” Incident Review
- Could not reproduce blank-module failure in this pass:
  - route health and markdown fetch health both valid (`200`)
  - module-viewer script parse is valid
- Most likely causes when this appears in-user:
  1. stale deploy/client cache,
  2. transient third-party script load failure (renderer dependency),
  3. temporary network/CSP edge condition.
- Recommendation: add explicit in-page diagnostics banner for fetch/render dependency failures (with retry + fallback state).

## Confabulation Check and Source Grounding
High-risk claims were rechecked against primary sources.

### Claim A: Streamable HTTP is the current remote MCP transport; legacy HTTP+SSE is deprecated path
- Status: confirmed against MCP spec.
- Source: Model Context Protocol Transports spec (2025-03-26).

### Claim B: Retrieval checks (quizzes) improve durable retention more than restudy-only workflows
- Status: confirmed.
- Source: Roediger & Karpicke (2006), *Psychological Science* (test-enhanced learning).

### Claim C: Predict-before-reveal (generation effect) is supported by robust memory findings
- Status: confirmed.
- Source: Slamecka & Graf (1978) foundational study; Bertsch et al. (2007) meta-analytic review.

### Claim D: WCAG AA contrast thresholds remain required for text readability
- Status: confirmed.
- Source: W3C Understanding SC 1.4.3 (Contrast Minimum).

## Source Citations
- MCP specification (primary): https://modelcontextprotocol.io/specification/2025-03-26/basic/transports
- Test-enhanced learning (primary indexing): https://pubmed.ncbi.nlm.nih.gov/16507066/
- Generation effect meta-analysis (primary indexing): https://pubmed.ncbi.nlm.nih.gov/17645161/
- Generation effect foundational paper (index): https://psycnet.apa.org/record/1980-20399-001
- WCAG contrast criterion (primary): https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html

## Next Recommended Sprint (if approved)
1. Add one mid-module quiz each to M04/M05/M06/M09.
2. Add two advanced terminal simulations (M06 + M12).
3. Resolve remaining P1 items (`P1-11`, `P1-12`) and close pass-3.
