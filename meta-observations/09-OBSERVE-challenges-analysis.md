# 09-OBSERVE: Challenge Missions — Complete Analysis
**CC2-OBSERVE pass** | Date: 2026-03-22 | Observer: Claude Sonnet 4.6

---

## Executive Summary

The course has two distinct challenge layers that require separate analysis: the **8 standalone Challenge Missions** in `CHALLENGE-MISSIONS.md` (the "full-length" open-ended engineering challenges), and the **in-lab Challenge Exercises** (CEs) in `CHALLENGE-PLAN.md` (shorter, structured, baked into lab HTML files). The naming mismatch between the two systems (the user brief references missions "1.A through 3.C" but the actual document uses tracks 1.1 through 3.2) is itself a gap worth flagging.

**Overall state**: The standalone Challenge Missions are well-written as documents but exist almost entirely outside the interactive UI. The in-lab CEs have 8 implemented (Phase 1 complete) but 29+ planned CEs remain as markdown-only plans. The challenges section is accessible from `index.html` and renders via `module-viewer.html`, but no dedicated challenge viewer, progress tracking, or XP integration exists for the standalone missions.

---

## Part 1: Standalone Challenge Missions — Content Completeness

The 8 missions map to three tracks. Note: the user brief's naming (1.A, 1.B, 2.A, 2.B, 2.C, 3.A, 3.B, 3.C) does not match the document's numbering (1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 3.1, 3.2). The document has **8 missions across 3 tracks** matching the count; the labels differ.

### Mission 1.1 — Author Two Skills From Scratch (★★★)
Maps to brief's "1.B — Build Real Skill"

| Dimension | Assessment |
|-----------|-----------|
| Objectives | Clear — produce two working YAML skills for recurring tasks |
| Success criteria | Excellent — 4 checkbox criteria, specifically testable |
| Step-by-step instructions | Strong — YAML template with all required fields specified |
| Difficulty rating | Accurate at ★★★ — requires iteration, YAML authoring, 3-run testing |
| Time estimate | Missing — no estimate provided |
| Prerequisites | Partial — "After completing core labs" is vague; M07 (Skills & Commands) is referenced in mission map but not in the mission itself |
| Deliverables | Clear — 2 YAML files, each tested 3 times |
| Rubric/assessment | Good — evaluation framework table + 4 binary criteria |

**Gap**: The skill YAML format taught in the mission uses `trigger_phrases` while the course CLAUDE.md explicitly calls out that `triggers` is a LUXOR convention, not native Claude Code activation. Students need explicit guidance that "trigger phrases" are a convention they're authoring as documentation for themselves, not a system-recognized YAML key that Claude Code processes automatically.

### Mission 1.2 — Build a Slash Command (★★★)
Maps to brief's "1.A — Teach the Loop" (unclear mapping — this is actually command authoring)

| Dimension | Assessment |
|-----------|-----------|
| Objectives | Clear — multi-step workflow command with 3+ sequential steps |
| Success criteria | 4 checkbox criteria, all testable |
| Step-by-step instructions | Excellent — 4 concrete options (ship, onboard, incident, custom) |
| Difficulty rating | Accurate at ★★★ |
| Time estimate | Missing |
| Prerequisites | Missing from mission body (referenced in mission map only) |
| Deliverables | Clear — command file with argument spec, data flow, error behavior |
| Rubric/assessment | Good — evaluation framework applies |

**Gap**: No example of what a correct command file looks like syntactically. Students who haven't completed Lab 06 will not know the file format or where commands live.

### Mission 1.3 — Configure a Specialized Subagent (★★★★)
Maps to brief's "3.B — Build a Skill" (naming mismatch — this is subagent config)

| Dimension | Assessment |
|-----------|-----------|
| Objectives | Clear — subagent configuration document for one of 3 roles |
| Success criteria | 4 checkbox criteria |
| Step-by-step instructions | Strong — YAML configuration template with all required fields |
| Difficulty rating | Accurate at ★★★★ |
| Time estimate | Missing |
| Prerequisites | Missing — depends on M09 (Multi-Agent) completion |
| Deliverables | Clear — YAML config + test evidence |
| Rubric/assessment | Good — 4 evaluation questions beyond just checklist |

**Gap**: "Launch the subagent" is the critical instruction, but there is no guidance on *how* to actually launch a configured subagent with Claude Code (the API call pattern, how to pass a system prompt programmatically). This is a significant instructional gap for students not already familiar with the SDK.

### Mission 2.1 — Codebase Archaeology (★★★)
Maps to brief's "3.A — Debug Pipeline"

| Dimension | Assessment |
|-----------|-----------|
| Objectives | Excellent — 3 phases clearly defined |
| Success criteria | 4 checkbox criteria, all objectively verifiable |
| Step-by-step instructions | Best in document — phases 1/2/3 with explicit sub-steps |
| Difficulty rating | Accurate at ★★★ |
| Time estimate | Missing |
| Prerequisites | Missing — requires Claude Code with file access to a real repo |
| Deliverables | Clear — codebase map, root cause analysis, fix + passing tests, PR description |
| Rubric/assessment | Good |

**Gap**: No guidance on what "5,000 lines of code" codebases are recommended as safe practice targets. Students unfamiliar with public open-source repos may pick overly complex codebases for their first attempt.

### Mission 2.2 — Issue-to-PR Pipeline (★★★★)
Maps to brief's "2.A — Build Real MCP Server"

| Dimension | Assessment |
|-----------|-----------|
| Objectives | Excellent — 6-step workflow with explicit tracker integration |
| Success criteria | 5 checkbox criteria |
| Step-by-step instructions | Excellent — numbered steps with explicit data flow |
| Difficulty rating | Accurate at ★★★★ |
| Time estimate | Missing |
| Prerequisites | Partially covered — MCP setup commands shown in "Setup Requirements" section at bottom |
| Deliverables | Clear — complete workflow with tracker artifacts at each step |
| Rubric/assessment | Good — evaluation framework + "The hard part" callout |

**Gap**: The mission requires a repository with an open "good first issue" but gives no guidance on finding one if the student doesn't have an active project. This creates a cold-start problem.

### Mission 2.3 — PR Review Workflow (★★★★)
Maps to brief's "2.B — Prompt Engineering Duel" (naming mismatch)

| Dimension | Assessment |
|-----------|-----------|
| Objectives | Clear — build + run + evaluate + post a PR review agent |
| Success criteria | 4 checkbox criteria |
| Step-by-step instructions | Good — 3 parts with specific requirements |
| Difficulty rating | Accurate at ★★★★ |
| Time estimate | Missing |
| Prerequisites | Missing — implies subagent configuration knowledge from 1.3 |
| Deliverables | Clear — review agent config, output, 4-question comparison |
| Rubric/assessment | Good |

**Gap**: "Post the review to an actual PR" is a real-world requirement that creates friction for students in corporate environments where they cannot post agent-generated content to internal PRs without policy clearance. No alternative path offered.

### Mission 3.1 — Developer Productivity Toolkit (★★★★)
Maps to brief's "2.C — Permissions Audit" (naming mismatch)

| Dimension | Assessment |
|-----------|-----------|
| Objectives | Clear — 3-component toolkit (skill + command + subagent) that interact |
| Success criteria | 4 checkbox criteria |
| Step-by-step instructions | Good — 3 example toolkits with components listed, 4 deliverable requirements |
| Difficulty rating | Accurate at ★★★★ |
| Time estimate | Missing |
| Prerequisites | Missing — requires all prior missions or equivalent lab completion |
| Deliverables | Clear — 3 YAML files + TOOLKIT-README.md + evidence of use |
| Rubric/assessment | Good — TOOLKIT-README test is memorable ("20-minute install test") |

**Gap**: The "three components must interact" requirement is well-stated but no example of *how* interaction is implemented is shown. A student could author three independent tools that share a naming convention and claim they interact.

### Mission 3.2 — Issue-to-Merge End-to-End Automation (★★★★★)
Maps to brief's "3.C — Full Capstone System"

| Dimension | Assessment |
|-----------|-----------|
| Objectives | Excellent — full pipeline diagram + 9 required deliverable categories |
| Success criteria | 5 checkbox criteria |
| Step-by-step instructions | Excellent — most detailed mission; pipeline diagram, 9 numbered deliverables |
| Difficulty rating | Accurate at ★★★★★ — 8–12 hour estimate explicitly given |
| Time estimate | THE ONLY MISSION WITH AN EXPLICIT TIME ESTIMATE (8–12 hours) |
| Prerequisites | Implicit — "every track of the course working together" |
| Deliverables | Outstanding — 9 categories covering all production concerns |
| Rubric/assessment | Excellent — 5 criteria + retrospective with 4 honest questions |

**Gap**: The "cost controls" deliverable mentions a circuit breaker but provides no example of what this looks like in code or config. Students new to LLM cost management have no frame of reference.

---

## Part 2: In-Lab Challenge Exercises (CEs) — Implementation Status

### Implemented CEs (Phase 1 — Complete)

All 8 Phase 1 CEs have been implemented as interactive HTML components in the lab files:

| CE ID | Lab | Title | XP | HTML Element | Validation Type |
|-------|-----|-------|----|-------------|-----------------|
| CE-03-D | lab-03 | Issue Navigation Exercise | +30 | `build-challenge` div | Textarea + model reveal |
| CE-04-B | lab-04 | Tool Schema Design | +30 | `build-challenge` div | JSON auto-validation |
| CE-06-C | lab-06 | Author a Skill YAML | +30 | `build-challenge` div | 5-criteria YAML linter |
| CE-06-D | lab-06 | Build /pr-ready Command | +30 | `build-challenge` div | Structured form |
| CE-07-B | lab-07 | Subagent System Prompt | +30 | `build-challenge` div | Character count (200+ min) |
| CE-08-A | lab-08 | Permission Models | +30 | `build-challenge` div | JSON validated |
| CE-09-A | lab-09 | Capstone Skill YAML | +40 | `build-challenge` div | 6-criteria parse check |
| CE-09-C | lab-09 | Issue Tracker Integration | +40 | `build-challenge` div | 4-question form |

### Unimplemented CEs (Phase 2 + Phase 3 — Markdown Only)

The following CEs exist in `CHALLENGE-PLAN.md` as detailed plans but have **no HTML implementation**:

**Phase 2 (High Priority, ~29 hours):**
- CE-01-A, CE-01-B, CE-01-C (Lab 01 — no challenges in lab-01-paradigm-shift.html)
- CE-02-A, CE-02-B, CE-02-C (Lab 02 — no challenges in lab-02-first-agent.html)
- CE-03-A, CE-03-B, CE-03-C (Lab 03 — only CE-03-D implemented)
- CE-04-A, CE-04-C (Lab 04 — only CE-04-B implemented)
- CE-05-A, CE-05-B, CE-05-C, CE-05-D (Lab 05 — ZERO challenges implemented)
- CE-06-A, CE-06-B (Lab 06 — only CE-06-C and CE-06-D implemented)
- CE-07-A, CE-07-C (Lab 07 — only CE-07-B implemented)
- CE-08-B, CE-08-C, CE-08-D, CE-08-E (Lab 08 — only CE-08-A implemented)
- CE-09-B, CE-09-D (Lab 09 — only CE-09-A and CE-09-C implemented)

**Labs with zero challenge implementation:**
- `lab-01-paradigm-shift.html` — 0 of 3 planned CEs
- `lab-02-first-agent.html` — 0 of 3 planned CEs
- `lab-05-prompt-engineering.html` — 0 of 4 planned CEs (worst gap: core build exercises CE-05-C and CE-05-D missing)

---

## Part 3: UI Integration Status

### What Exists

**index.html** — Challenge section is present and accessible:
- A "Challenge Missions" card links to `/challenges` (routes to `module-viewer.html?m=CHALLENGE-MISSIONS`)
- 8 individual CE cards link directly to lab sections via anchor IDs (e.g., `/lab/06#ce-06-c`)
- Section visually separated with purple styling (`rgba(139,92,246,0.15)`) distinguishing it from lab cards
- Meta text "8 missions · Difficulty ★★☆ to ★★★★★ · Real codebase work · Linear & GitHub MCP" is accurate

**module-viewer.html** — `/challenges` route is registered:
- Routes `/challenges` and `/challenge` → `CHALLENGE-MISSIONS` slug
- Fetches and renders `/docs/curriculum/CHALLENGE-MISSIONS.md` as markdown
- Uses the standard module viewer with XP/section tracking
- XP tracking is localStorage-based per slug — challenge missions earn XP from section reads

**In-lab HTML** — 8 CEs are interactive with:
- Structured input forms (textareas, JSON editors, YAML editors)
- Client-side validation (JSON parse, character count, YAML field checks)
- Model answer reveal on submission
- LocalStorage persistence
- XP award (+30 or +40) via `submitChallenge()` function

### What Does Not Exist

1. **No dedicated challenges page** — `/challenges` renders the raw markdown file via the general-purpose module-viewer. There is no custom challenges dashboard showing all 8 missions, their difficulty, completion status, or which lab labs are prerequisites.

2. **No progress tracking for standalone missions** — Missions 1.1 through 3.2 have no completion states, no checkboxes that persist, no XP attached. A student can read them in module-viewer but there's no way to mark a mission complete or track progress across missions.

3. **No connection between standalone missions and their CE counterparts** — CE-06-C (Author a Skill YAML) directly builds toward Mission 1.1 (Author Two Skills From Scratch), but this link exists only in the CHALLENGE-PLAN.md planning document, not in any UI element visible to students.

4. **No XP for standalone missions** — Module-viewer assigns XP for section reads (scrolling through sections), but the missions don't have meaningful section breaks. A student reading Mission 3.2 earns XP for reading it, not for completing it.

5. **No portfolio/showcase integration** — The brief mentions "Full Capstone System" as mission 3.C but there is no mechanism for students to share, submit, or showcase their deliverables.

6. **No automated validation for standalone missions** — All validation is self-assessed via the checklist ("[ ] criterion"). The in-lab CEs have partial automation (JSON parse, character count, YAML field detection); the standalone missions have none.

7. **No differentiation between track levels** — A beginner starting with Mission 3.2 would have no warning. No gating, no recommended sequencing beyond the prose "A Note on Scope" section.

---

## Part 4: Pedagogical Analysis

### Bloom's Taxonomy by Mission

| Mission | Primary Level | Secondary Level | Notes |
|---------|--------------|-----------------|-------|
| 1.1 Author Two Skills | Create (L6) | Evaluate (L5) | Testing 3 times = evaluating own work |
| 1.2 Slash Command | Create (L6) | Analyze (L4) | Data flow between steps requires analysis |
| 1.3 Subagent Config | Create (L6) | Evaluate (L5) | Edge case testing = evaluation |
| 2.1 Codebase Archaeology | Analyze (L4) | Create (L6) | Root cause analysis + fix = both |
| 2.2 Issue-to-PR Pipeline | Apply (L3) | Create (L6) | Workflow application + PR creation |
| 2.3 PR Review Workflow | Evaluate (L5) | Analyze (L4) | Comparative evaluation with human reviews |
| 3.1 Productivity Toolkit | Create (L6) | Evaluate (L5) | Systems design requires integration |
| 3.2 End-to-End Automation | Create (L6) | Evaluate (L5) | Retrospective is pure evaluation |

All 8 missions operate at L3–L6. This is appropriate for a capstone challenge layer. The lower levels (L1 Remember, L2 Understand) are covered by the module content and lab exercises.

### Scaffolding Assessment

The within-track progression is strong:
- Track 1: Skill (1.1) → Command (1.2) → Subagent (1.3) — each adds a new abstraction layer
- Track 2: Exploration (2.1) → Integration (2.2) → Evaluation (2.3) — each adds stakeholders
- Track 3: System (3.1) → Full pipeline (3.2) — scope expansion

**Cross-track dependencies are not surfaced in the UI.** Mission 3.2 requires skills from all three tracks but there is no visual prerequisite map. A student who skips Track 1 and 2 missions will hit 3.2 unprepared.

The progression from lab exercises to challenge missions is described in prose ("Mission 3.2... requires every track of the course working together") but not mapped. The CE-09-D connection (Lab 09 capstone design document → Mission 3.2 implementation spec) is the clearest intended bridge, but it exists only in the planning document.

### Real-World Relevance

All 8 missions score high on real-world applicability:
- Mission 1.1/1.2: Skills and commands are artifacts engineers would actually maintain
- Mission 2.2/2.3: Linear/GitHub MCP integration is daily engineering workflow
- Mission 3.2: The "retrospective" deliverable mirrors SRE practices (post-mortems)

The missions avoid contrived scenarios. Every deliverable is something that would survive in a real team's toolbox. This is a significant strength.

### Differentiation for Skill Levels

**Missing.** There is no explicit guidance for:
- Students who complete faster (no "extension" path beyond 3.2)
- Students who struggle (no "if this is too hard, try X first" guidance)
- Students with no public GitHub account (Mission 2.3 requires posting to a real PR)
- Students in corporate environments with restricted codebases

The evaluation framework table ("Weak answer vs. Strong answer") is the only differentiation mechanism, and it only distinguishes quality, not path.

---

## Part 5: Gap Analysis

### Gap 1 — Naming Collision (CRITICAL)
The user brief names 8 missions as "1.A, 1.B, 2.A, 2.B, 2.C, 3.A, 3.B, 3.C" while the document uses "1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 3.1, 3.2". These labels do not map cleanly. Before any UI work is built that references mission IDs, this naming must be reconciled.

### Gap 2 — Missing Time Estimates (HIGH)
7 of 8 missions have no time estimate. Only Mission 3.2 explicitly states "8–12 hours." Students planning their study time cannot gauge commitment. Suggested estimates based on deliverable scope:

| Mission | Suggested Estimate |
|---------|-------------------|
| 1.1 Author Two Skills | 3–4 hours |
| 1.2 Slash Command | 2–3 hours |
| 1.3 Subagent Config | 4–5 hours |
| 2.1 Codebase Archaeology | 4–6 hours |
| 2.2 Issue-to-PR Pipeline | 5–7 hours |
| 2.3 PR Review Workflow | 3–4 hours |
| 3.1 Productivity Toolkit | 5–7 hours |
| 3.2 End-to-End Automation | 8–12 hours (documented) |

### Gap 3 — Missing Prerequisites in Mission Bodies (HIGH)
Each mission references "After completing core labs" globally, but the Mission Map at the bottom is the only place that cross-references specific modules (e.g., "1.1 Author Skills → M07 Skills & Commands"). This should be surfaced in each mission body.

### Gap 4 — Lab 01, 02, 05 Have Zero Implemented CEs (HIGH)
Three of nine labs have no interactive challenge exercises. Lab 05 (Prompt Engineering) is the worst gap — it has 4 planned CEs including the "core build exercises" (CE-05-C: Prompt Iteration Chain, CE-05-D: Meta-Prompt Exercise) that are marked Priority: Critical. Students completing Lab 05 have no hands-on challenge depth.

### Gap 5 — No Dedicated Challenge UI (MEDIUM)
The `/challenges` route renders the raw markdown in a general-purpose viewer. Students cannot:
- See all 8 missions at a glance with difficulty badges
- Track which missions they've started or completed
- See which CE in a lab connects to which standalone mission

### Gap 6 — No XP Integration for Standalone Missions (MEDIUM)
The XP system is meaningful for labs (XP per section, bonus XP for CEs). Standalone missions award XP only for *reading* them in module-viewer (section scrolling), not for completing them. A completed Mission 3.2 should award substantial XP (suggested: 200–300 XP, comparable to an entire lab).

### Gap 7 — Skill YAML Convention Ambiguity (MEDIUM)
Missions 1.1 and 1.3 teach a YAML format with `trigger_phrases`, `behavior`, `constraints` fields. The course CLAUDE.md notes that `triggers` is a LUXOR convention, not native Claude Code. The missions do not clarify that these fields are instructional conventions, not parsed by Claude Code's runtime. This could cause student confusion when their "skill" doesn't auto-activate.

### Gap 8 — No Cold-Start Guidance for Track 2 (LOW)
Mission 2.1 requires "a real open-source codebase you've never worked in before" with specific properties. Mission 2.2 requires "a repository with at least one open issue labeled 'good first issue'." Students who don't already navigate open-source repos will spend significant time on setup rather than on the learning objectives.

### Gap 9 — No Portfolio Mechanism (LOW)
Mission deliverables (YAML files, PR descriptions, pipelines, retrospectives) are high-quality portfolio artifacts. There is no mechanism for students to preserve, share, or submit them beyond their local filesystem.

---

## Part 6: Integration Opportunities

### Opportunity 1 — Dedicated Challenge Dashboard (High Value)
A `/challenges` page built as a proper HTML file (not rendered markdown) could show:
- All 8 missions with difficulty stars, time estimates, and track badges
- Per-mission completion state (stored in localStorage)
- Which lab CEs serve as prep for each mission
- A visual prerequisite graph (Track 1 → Track 2 → Track 3)

Implementation: ~6 hours. Could reuse the existing card/pill component system from `index.html`.

### Opportunity 2 — XP Integration for Mission Completion (High Value)
Add an XP award mechanism to standalone missions:
- Self-reported completion button in the mission view ("I completed this mission")
- XP amounts: Track 1 missions = 100 XP each, Track 2 = 150 XP each, Track 3.1 = 200 XP, Track 3.2 = 300 XP
- This creates a clear progression incentive without requiring automated verification

Implementation: ~2 hours. module-viewer.html already has all the XP infrastructure.

### Opportunity 3 — CE-to-Mission Linkage in Lab UI (High Value)
Each implemented CE should visually link to its corresponding standalone mission. Example for CE-06-C:
```html
<div class="mission-link">
  Ready for more? This challenge is the foundation for
  <a href="/challenges#mission-1-1">Mission 1.1 — Author Two Skills From Scratch (★★★)</a>
</div>
```
Implementation: ~3 hours across 8 CE implementations.

### Opportunity 4 — Phase 2 CE Implementation (High Value, High Effort)
The 13 Phase 2 CEs represent ~29 hours of implementation work. Priority order based on impact:
1. CE-05-C (Prompt Iteration Chain) — core Lab 05 build exercise, currently has nothing
2. CE-02-B (Write a Production CLAUDE.md) — directly connects to Mission 1.B
3. CE-04-A (Broken Config Debugger) — adversarial, high engagement
4. CE-06-A (Debug a Broken Skill) — adversarial, connects to Mission 1.1
5. CE-08-B (Secret Exposure Audit) — adversarial, production relevance

### Opportunity 5 — Mission Prerequisites Made Explicit in UI (Medium Value)
Add a "Prerequisites" box to each mission in the module-viewer rendering, or in a custom challenge dashboard:
```
Prerequisites for Mission 2.2:
✓ Lab 04 — MCP Server Explorer (required)
✓ Lab 06 — Skills & Commands (recommended)
✓ Mission 2.1 — Codebase Archaeology (strongly recommended)
✓ MCP setup: GitHub or Linear MCP server configured
```

### Opportunity 6 — Gamification: Mission Badges (Low Value, High Polish)
Each completed mission could award a badge displayed on the index.html dashboard:
- Track 1 completion → "Skill Author" badge
- Track 2 completion → "Codebase Navigator" badge
- Track 3 completion → "Pipeline Engineer" badge
- All 8 complete → "Agentic AI Engineer" badge

This mirrors common course completion systems and creates visual achievement milestones.

### Opportunity 7 — Portfolio Export (Medium Value)
A "Build my portfolio page" button in the challenge dashboard that aggregates:
- CE completions (from localStorage)
- Mission completions (self-reported)
- Generates a shareable HTML page or GitHub README

No server needed — pure client-side localStorage → generated markdown/HTML.

---

## Part 7: Assessment Quality Summary

### Strengths
1. **No rubric theater** — the evaluation framework ("Weak answer vs. Strong answer") is honest about what distinguishes strong work. It doesn't give easy checkboxes that games can pass trivially.
2. **"If it doesn't run, it doesn't count"** — the hard requirement for working artifacts over write-ups is pedagogically sound.
3. **Retrospective in Mission 3.2** — the 4 retrospective questions (what surprised you, where did it need judgment, what would you add to CLAUDE.md, what would you change) are excellent meta-cognitive prompts.
4. **"The hard part" callouts** — each mission identifies the non-obvious difficulty. This is rare and valuable course design.
5. **Error behavior requirement** — explicitly requiring "what happens if a step fails" in Mission 1.2 teaches production thinking, not just happy-path thinking.

### Weaknesses
1. **Zero automated assessment** — all standalone missions are self-assessed. The only automated checking exists in the in-lab CEs (JSON parse, character count, YAML field detection).
2. **No time estimates on 7 of 8 missions** — this is the most actionable quick fix.
3. **"Post to a real PR" requirement** — this creates real-world friction that could block students in restricted environments.
4. **Naming inconsistency** — "1.A through 3.C" vs. "1.1 through 3.2" needs resolution before any UI references mission IDs.

---

## Part 8: Actionable Recommendations

### Immediate (< 2 hours each)
1. Add time estimates to all 7 missions lacking them
2. Add a "Prerequisites" section to each mission body (not just the mission map at bottom)
3. Resolve the naming collision: decide between alphabetic (1.A–3.C) or numeric (1.1–3.2) and apply consistently
4. Add a link from each implemented CE to its corresponding standalone mission

### Short-term (1–3 days)
5. Implement CE-05-C and CE-05-D for Lab 05 (highest gap, priority: Critical)
6. Add XP award to standalone mission completion via self-reported button in module-viewer
7. Implement CE-02-B (Write a Production CLAUDE.md) for Lab 02
8. Add "skill YAML is a convention, not runtime" clarification to Missions 1.1 and 1.3

### Medium-term (1 sprint)
9. Build a dedicated `/challenges` HTML page (not rendered markdown) with all 8 missions, difficulty, time, prerequisites, and completion tracking
10. Implement all Phase 2 CEs (8 exercises, ~29 hours)
11. Add CE-to-mission visual linkage in all 8 lab implementations
12. Add "good first issue" starter repos list for Mission 2.1 and 2.2 cold-start problem

### Long-term
13. Portfolio export mechanism
14. Mission badge system
15. Phase 3 CE implementation (~55 hours)

---

## Appendix: File Reference

| Resource | Path |
|----------|------|
| Standalone missions | `/docs/curriculum/CHALLENGE-MISSIONS.md` |
| In-lab CE plans | `/docs/curriculum/CHALLENGE-PLAN.md` |
| Dashboard with challenge cards | `/index.html` (lines 729–818) |
| Challenge route registration | `/module-viewer.html` (lines 5276–5284) |
| CE-03-D (implemented) | `/labs/day1/lab-03-agent-thinking.html` |
| CE-04-B (implemented) | `/labs/day2/lab-04-mcp-explorer.html` |
| CE-06-C, CE-06-D (implemented) | `/labs/day2/lab-06-skills-commands.html` |
| CE-07-B (implemented) | `/labs/day3/lab-07-multi-agent.html` |
| CE-08-A (implemented) | `/labs/day3/lab-08-production.html` |
| CE-09-A, CE-09-C (implemented) | `/labs/day3/lab-09-capstone.html` |
| Labs with zero CEs | `/labs/day1/lab-01-paradigm-shift.html`, `/labs/day1/lab-02-first-agent.html`, `/labs/day2/lab-05-prompt-engineering.html` |

---

*CC2-OBSERVE analysis complete. Document version 1.0.*
*Next recommended step: Resolve mission naming collision (alphabetic vs. numeric), then add time estimates — both are zero-code, high-impact fixes.*
