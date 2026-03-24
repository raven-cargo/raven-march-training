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

---

## Session 12 Decisions (2026-03-23)

### Decision 7: Quiz Feedback Labels Must Be Renderer-Driven

- **Decision**: Interactive quiz explanations must not rely on hardcoded prefixes like `Correct answer:` inside module markdown. The viewer renderer is responsible for labeling feedback from the actual selected state.
- **Rationale**: Static explanation copy is ambiguous when a learner picks the wrong option. It also creates drift bugs such as `Correct anwer here` or misleading feedback panels that still announce `Correct answer:` after an incorrect click. The UI should derive `Correct.` vs `Not quite.` from runtime state and normalize any legacy content automatically.
- **Impact**: Both `module-viewer.html` and `raven-cargo-course/module-viewer.html` now strip legacy `Correct answer:` / `Correct anwer here:` prefixes at render time, prepend state-aware labels, and reset explanations from stored base HTML. Future quiz authoring should write explanation body copy only, without answer-state prefixes.

### Decision 8: Persistent Baseline Rules Live In CLAUDE.md + decisions.md

- **Decision**: Repo-level baseline awareness should be persisted in `.claude/CLAUDE.md` and `decisions.md`, not left in ad hoc session memory.
- **Rationale**: `CLAUDE.md` is the repo start-context file and `decisions.md` is the durable architecture log. Keeping renderer rules and extracted-course conventions there makes them visible across context windows and future sessions.
- **Impact**: New sessions should inherit the quiz renderer rule, the Raven extracted-course UI conventions, and the “fix patterns in shared code, not content-by-content” baseline from these files first.

### Decision 9: Scenario Quiz Must Announce Verdict On The Selected Choice

- **Decision**: Scenario quiz interactions must render an explicit verdict on the selected option and in the feedback panel, not just tint all answer cards.
- **Rationale**: Subtle multi-color states force learners to infer whether they were right or wrong. The selected answer needs an unmistakable local state (`Your choice - Correct` / `Your choice - Wrong`) and the feedback panel must repeat that verdict immediately.
- **Impact**: Both viewer files now track the chosen option index, render a result pill on the selected card, de-emphasize unselected cards, and style the feedback panel by result state. Future scenario-style components should follow the same “selected answer + verdict + explanation” pattern.

### Decision 10: Tight-Deadline Workflow Requires Frequent Deploy Checkpoints

- **Decision**: On this sprint, major shared-pattern changes should be followed by a Vercel deploy and an explicit live-check handoff.
- **Rationale**: The review loop is fast and visual. Delaying deploys causes stacked uncertainty and makes it harder to isolate regressions under deadline.
- **Impact**: After major viewer/style logic changes, deploy immediately, notify the user, and iterate from the live route rather than batching too much local-only work.

### Decision 11: Trace Animation Controls Belong Below The Stage

- **Decision**: Agent trace and animation components must keep playback controls in a dedicated grouped control bar below the content stage, not compressed into the same visual plane as the animation itself.
- **Rationale**: When play/pause, progress, and speed toggles compete with the stage layout, the viewport collapses and the interaction becomes visually ambiguous. The content stage needs reserved height; the controls should read as a separate control surface.
- **Impact**: Both viewers now use an `ix-trace-stage` wrapper with minimum height plus grouped control rows for transport, progress, speed, and manual-mode hints. Future trace-style UI should follow the same stage-first, controls-below pattern.

### Decision 12: Raven File Intake Uses Direct Storage Uploads And Explicit Review Blocks

- **Decision**: Raven `Submissions` and `Resources` must upload files through direct storage transfer rather than base64-posting file payloads through the app server, and all returned files must render inside dedicated file blocks with media-aware previews when possible.
- **Rationale**: Base64 API uploads create artificial serverless payload limits and break for large course artifacts like `.mp4` walkthroughs. The UI also became hard to grade when files were reduced to plain links. Direct uploads keep large assets viable; explicit file blocks make grading and resource review visually obvious.
- **Impact**: The Raven upload endpoint now issues signed upload sessions, the dashboard uploads files directly to storage, submissions render newest-first for grading, resources render core-first with uploaded items in chronological order, and video/image/audio files can embed inline when the browser supports them. Future file-backed Raven surfaces should preserve the same ordering and block-based review pattern.

### Decision 13: Interactive Quiz Cards Need A Safe Reading Gutter

- **Decision**: Shared multiple-choice and quiz cards must reserve a stronger internal left/right gutter, larger option padding, and a tighter prompt line-length cap so questions do not visually collide with the card edge.
- **Rationale**: When prompts start too close to the shell edge, the whole interaction reads jagged and low-trust, especially on dense modules like Module 04. The issue is not content-specific; it is a rhythm problem in the shared renderer. Better horizontal padding and spacing improve scanability, calm the layout, and make options feel intentional instead of cramped.
- **Impact**: Both viewer files now use larger shell margins, larger question padding, wider option gaps, larger answer-card padding, and a bounded prompt width. Future interactive card work should preserve this “safe reading gutter” rule rather than compressing text to maximize density.

### Decision 14: Teaching Caution States Use Orange Before Red

- **Decision**: In module pedagogy surfaces, conceptual warning/problem/failure-mode states should default to a light orange caution palette. Red should be reserved for genuine runtime, system, or destructive error states.
- **Rationale**: Students read red as immediate alarm. Many instructional components are explaining “why this approach fails” or “what goes wrong conceptually,” which is cautionary but not an actual live error. Using orange keeps the UI calmer, improves hierarchy, and prevents teaching cards from feeling like hard-stop alerts.
- **Impact**: Shared viewer components such as phase cards, compare blocks, and instructional problem-state headers now render orange for pedagogical `error` phases. Actual load errors and true runtime error surfaces remain red. Future callout/category work should apply the same severity distinction.

### Decision 15: Raven Is A Student Portal, Not An Internal Dashboard

- **Decision**: The Raven course instance should be designed and maintained as a student portal first.
- **Rationale**: Students need a durable course home they can navigate during and after training. Internal planning language, overloaded controls, implementation details, and operator-oriented layouts reduce trust and make the experience feel like a prototype rather than a course product.
- **Impact**: Raven pages should prefer clear student-facing labels, separated destinations, low-clutter layouts, obvious calls to action, and course-oriented content hierarchy. Future changes should remove internal workflow language from the UI and evaluate new features against student usability first.

### Decision 16: Locked Learning States Must Preserve Layout And Readability

- **Decision**: Gated sections in Raven labs should never be dimmed by reducing the opacity of the full section. Locked states must preserve the original spacing and typography, then layer a dedicated centered gate panel above the section.
- **Rationale**: Blanket opacity flattens the entire section, makes headings and prompts look left-crunched, and turns pre-unlock content into visual noise. Students should immediately understand that a section is unavailable without the lock treatment degrading the underlying layout rhythm.
- **Impact**: Locked lab sections should use a frosted or masked overlay with a clear unlock message, preserve section padding, and avoid collapsing contrast across the whole section. Future Raven gating patterns should follow this overlay-panel model instead of section-wide dimming.

### Decision 17: Student-Facing Choices Must Use Plain Language, Not Internal Keys

- **Decision**: Internal shorthand such as `S1`, `S2`, `S3`, enum values, or implementation labels may exist in logic, but student-facing answer options and feedback must render full descriptive labels.
- **Rationale**: Internal keys leak engineering structure into the learning experience and make choices feel abstract or cryptic. Students should evaluate concepts directly, not decode internal notation first.
- **Impact**: Interactive choices should display a readable title plus a short descriptor when useful. Runtime feedback should also reference the descriptive label, not the internal key. Future Raven interactions should keep machine-stable values in code and human-readable labels in the UI.

### Decision 18: During Live Course Hardening, Raven Labs Default To Traversable

- **Decision**: During this stabilization window, Raven labs should prefer uninterrupted traversal over gated progression. Locked overlays and pointer-blocking gates should be disabled until each lab’s progression logic is explicitly revalidated.
- **Rationale**: A blocked student flow is worse than a temporarily less-gameified flow. Under deadline, gating bugs create hard stops that prevent course completion, while ungated traversal still preserves learning content and lets us iterate safely on the interaction model.
- **Impact**: Raven lab CSS currently suppresses lock overlays globally, and Lab 05’s apply task now uses explicit `Re-attempt Quiz` and `Next Section` controls instead of requiring exact-answer gating to proceed. Future reintroduction of gates should happen only after per-lab validation.
## Decision 19: Student-Facing Raven Lab Numbers Follow The Current CETI Schedule

For the Raven student portal, the visible lab numbering and `/raven-cargo-course/lab/:id` routes must follow the current CETI Raven schedule rather than the original extracted file names. The shared rule is:

- Lab 03 = Prompt Engineering Workshop
- Lab 04 = Agentic Reasoning
- Lab 05 = Skills & Commands Builder
- Lab 06 = MCP Server Explorer

Implementation rule: preserve the extracted source files if needed, but remap the student-facing aliases, manifest entries, sequence cards, and next/back navigation so students move through the portal in the same order they see in class.

This also applies inside lab bodies: titles, completion banners, callback references, export headers, and glossary/concept maps must use the same student-facing lab numbers as the route.

## Decision 20: Student-Facing Titles Favor Clarity Over Implementation Framing

The Raven portal should present the course in the exact order taught in class, not as separate extracted module and lab inventories. Student-facing titles should stay short, clear, and course-oriented rather than exposing implementation reasoning. For example, `Learning Path` is the correct heading, while `Chronological Learning Path` leaks internal framing the student does not need.

The student-facing path is:

- Module 01, Lab 01
- Module 02, Lab 02
- Module 03, Lab 03
- Module 04, Lab 04
- Module 05, Lab 05
- Module 06, Module 07, Lab 06
- Module 08, Lab 07
- Module 09, Lab 08, Lab 09

Implementation rule:

- landing pages should render one learning path derived from the live schedule
- student-facing module ids and lab ids should match the approved Raven delivery schedule, even if extracted source filenames differ or the upstream CETI page is temporarily wrong
- viewer titles, manifest ordering, next/previous links, and block labels must all follow the same schedule numbering
- headings, nav labels, and section titles should use the simplest accurate wording available and avoid implementation descriptors unless they are necessary for learning

Current approved Raven live order:

- Day 1: Module 01, Lab 01; Module 02, Lab 02; Module 03, Lab 03; Module 04, Lab 04
- Day 2: Module 05, Lab 05; Module 06, Module 07, Lab 06; Module 08, Lab 07; Module 09, Lab 08, Lab 09
