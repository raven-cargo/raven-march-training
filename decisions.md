# Agentic AI Course — Architecture Decision Record

**Created**: 2026-03-22
**Project root**: `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/`
**Related**: `progress.md`, `next.md`

---

## Session 11 Decisions (2026-03-22)

### Decision 1: Challenge Mission Numbering

- **Decision**: Use numeric notation (1.1-3.2) throughout, not alphabetic (1.A-3.C)
- **Rationale**: The `CHALLENGE-MISSIONS.md` already uses numeric notation. The original brief used alphabetic. Numeric is consistent with the authoritative document and avoids ambiguity.
- **Impact**: Dashboard links, meta-observations, and all future references use numeric notation (1.1, 1.2, 2.1, 2.2, 2.3, 3.1, 3.2). Any remaining alpha references (1.A, 2.B, etc.) should be converted in Session 12.

---

### Decision 2: Canonical Day 2 Lab Order

- **Decision**: Lab 05 (Prompt Engineering) -> Lab 04 (MCP Explorer) -> Lab 06 (Skills/Commands)
- **Rationale**: Established in Session 4 and confirmed in Session 11. Prompt engineering foundations must precede MCP tool usage. This is a pedagogical sequencing decision: students need to understand how to communicate with the agent before they start wiring up external tools.
- **Impact**: All connect-forward panels, completion callouts, dashboard card order, and `master-outline.md` follow this sequence. Breaking this order would invalidate navigation links across 6+ files.

---

### Decision 3: Em-dash Removal from Headings

- **Decision**: Replace em-dash (--) with hyphen (-) in `CHALLENGE-MISSIONS.md` headings for anchor stability
- **Rationale**: `marked.js` slugger behavior is version-dependent for Unicode characters like em-dash. Hyphens produce deterministic, stable heading IDs that work reliably with the hash-scroll handler added in Session 11.
- **Impact**: Missions 2.1 and 2.3 headings changed. The custom `marked.js` heading renderer and hash-scroll handler in `module-viewer.html` now produce predictable anchors for deep-linking from the dashboard.

---

### Decision 4: Lab 01 Gamification Gap -- Accept, Don't Fix

- **Decision**: Lab 01 retains lighter v1 gamification (no XP accumulation, no streaks, no milestones) for now
- **Rationale**: Lab 01 is an introductory orientation lab. Full gamification upgrade (LAB_KEY pattern, XP accumulation, streak tracking, milestone strips) would take approximately 4 hours and is lower priority than responsive/accessibility fixes across other labs. The pedagogical cost of a simpler first lab is minimal -- students are still learning the interface.
- **Impact**: First lab experience has a simpler engagement model. Gamification kicks in from Lab 02 onward. Listed as item 7 in the "Nice to Have" section of `next.md` for potential future work.

---

### Decision 5: Challenge Missions Remain as Markdown (No Custom Page)

- **Decision**: `/challenges` continues to render via `module-viewer.html` markdown renderer
- **Rationale**: Building a dedicated HTML page with interactive completion tracking would take approximately 6 hours and is lower priority than content polish. The markdown renderer now has proper heading IDs (custom `marked.js` renderer) and hash-scroll support, making deep-links from the dashboard fully functional.
- **Impact**: No interactive completion tracking or XP awards for standalone mission completion in v1. Students complete missions and self-assess. A dedicated `/challenges` page with tracking is listed as item 11 in "Nice to Have" for a future sprint.

---

### Decision 6: CC2 Framework Used for Analysis

- **Decision**: Used CC2 pipeline (OBSERVE->REASON->CREATE->DEPLOY->LEARN) for this analysis sprint
- **Rationale**: Mirrors the approach used for modules analysis on March 16 (Session 10). Maintaining consistency in meta-observation methodology ensures comparable quality metrics across sprints and enables trend analysis.
- **Impact**: Three new meta-observation files (08, 09, 10) follow the same naming and numbering convention as previous CC2 analyses. The meta-observations dashboard now includes labs and challenges KPIs alongside the existing modules data.

---

## Earlier Decisions (Sessions 1-10)

Decisions from earlier sessions are recorded in `progress.md` under the "Key Decisions Made" section. Notable earlier decisions:

- **Session 4**: Day 2 lab order established (05->04->06)
- **Session 7**: NotebookLM multimedia generated from validated module content only
- **Session 8**: Challenge Missions created as markdown (8 missions, 3 tracks)
- **Session 10**: 5-lens audit methodology; P0/P1/P2 priority framework for fixes
