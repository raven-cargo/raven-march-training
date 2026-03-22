# MERCURIO Three-Plane Review: Milestone 1 Dashboard

**Date**: 2026-03-22
**Reviewer**: MERCURIO (Claude Opus 4.6)
**Target**: `index.html` — Course Review Dashboard
**Live URL**: https://agentic-ai-course-hazel.vercel.app/
**Project Root**: `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/`

---

## Mental Plane (Intellectual Rigor) -- SCORE: 8.5/10

### M1. Stat Bar Accuracy

#### Lab Lines Count: 19,645 -- ACCURATE

Verified via `wc -l` on all 9 lab HTML files:

| Lab File | Dashboard Claim | Actual `wc -l` | Match |
|----------|----------------|-----------------|-------|
| lab-01-paradigm-shift.html | 2,030 | 2,030 | PASS |
| lab-02-first-agent.html | 1,976 | 1,976 | PASS |
| lab-03-agent-thinking.html | 2,106 | 2,106 | PASS |
| lab-04-mcp-explorer.html | 2,514 | 2,514 | PASS |
| lab-05-prompt-engineering.html | 2,827 | 2,827 | PASS |
| lab-06-skills-commands.html | 1,999 | 1,999 | PASS |
| lab-07-multi-agent.html | 2,109 | 2,109 | PASS |
| lab-08-production.html | 2,003 | 2,003 | PASS |
| lab-09-capstone.html | 2,081 | 2,081 | PASS |
| **TOTAL** | **19,645** | **19,645** | **PASS** |

Every individual lab card line count is exact. No rounding, no inflation.

#### Module Words: ~90k -- ACCURATE

Verified via `wc -w` on all 12 module markdown files:

| Module | Words |
|--------|-------|
| 01-paradigm-shift.md | 8,341 |
| 02-claude-code-foundations.md | 10,371 |
| 03-agent-thinking.md | 10,398 |
| 04-prompt-engineering-depth.md | 6,150 |
| 05-mcp-architecture.md | 4,907 |
| 06-mcp-building.md | 5,496 |
| 07-skills-commands.md | 5,215 |
| 08-meta-prompting.md | 5,057 |
| 09-multi-agent-systems.md | 5,761 |
| 10-security-sandboxing.md | 8,951 |
| 11-tech-stack-adaptation.md | 7,853 |
| 12-capstone-production.md | 11,599 |
| **TOTAL** | **90,099** |

The dashboard says "~90k" and the actual count is 90,099. The tilde is appropriate and honest.

### M2. Challenge Mission Links -- PASS (with caveat)

All 8 challenge mission `href` values match the expected heading IDs that `marked.js` would generate from the CHALLENGE-MISSIONS.md headings:

| Dashboard href fragment | Markdown heading | Match |
|------------------------|------------------|-------|
| `#mission-11-author-two-skills-from-scratch-` | Mission 1.1: Author Two Skills From Scratch | PASS |
| `#mission-12-build-a-slash-command-that-orchestrates-multiple-steps-` | Mission 1.2: Build a Slash Command That Orchestrates Multiple Steps | PASS |
| `#mission-13-configure-a-specialized-subagent-` | Mission 1.3: Configure a Specialized Subagent | PASS |
| `#mission-21-codebase-archaeology--understand-before-touching-` | Mission 2.1: Codebase Archaeology -- Understand Before Touching | PASS* |
| `#mission-22-issue-to-pr-pipeline-using-linear-or-github-mcp-` | Mission 2.2: Issue-to-PR Pipeline Using Linear or GitHub MCP | PASS |
| `#mission-23-pr-review-workflow--agent-as-reviewer-` | Mission 2.3: PR Review Workflow -- Agent as Reviewer | PASS* |
| `#mission-31-build-a-developer-productivity-toolkit-` | Mission 3.1: Build a Developer Productivity Toolkit | PASS |
| `#mission-32-issue-to-merge-end-to-end-automation-` | Mission 3.2: Issue-to-Merge End-to-End Automation | PASS |

*Caveat: Missions 2.1 and 2.3 use em-dash characters in headings. The dashboard hrefs use double hyphens (`--`) for these. Whether this matches depends on the exact `marked.js` version's slugger behavior. This is **fragile** -- a library update could break these two anchors.

**RECOMMENDATION**: Replace em-dashes in CHALLENGE-MISSIONS.md headings with regular hyphens or colons to make the anchor IDs deterministic.

### M3. Vercel.json Routing -- PASS

- All 9 lab routes (`/lab/1` through `/lab/9` and `/lab/01` through `/lab/09`) point to files that exist on disk.
- All 12 module routes (`/module/1` through `/module/12` and zero-padded equivalents) point to valid `module-viewer.html?m=` query strings with correct slugs.
- All module markdown files exist at `docs/curriculum/modules/`.
- `/challenges` and `/challenge` correctly route to `module-viewer.html` which has special-case handling for the CHALLENGE-MISSIONS slug.

### M4. Framework Section Accuracy -- MINOR ISSUE

| Claim | Actual | Status |
|-------|--------|--------|
| core.css: 19 KB | 19,294 bytes (18.8 KB) | PASS (rounds correctly) |
| core.js: 26 KB | 26,593 bytes (25.9 KB) | PASS (rounds correctly) |
| build.js: 10 KB | 10,721 bytes (10.5 KB) | PASS |
| core.js: "15-function public API" | 19 exported functions | **FAIL** |

**FINDING**: The dashboard claims core.js has a "15-function public API" but the actual `return` statement exports 19 members: `init`, `awardXP`, `updateXPDisplay`, `showXPToast`, `updateStreak`, `saveReflection`, `loadAllReflections`, `exportReflections`, `checkMinChars`, `markSectionComplete`, `checkSectionUnlock`, `completeLab`, `updateNavDots`, `PredictionChallenge`, `KnowledgeCheck`, `ApplyTask`, `renderCallbackCard`, `showCallbackCard`, `renderInfoCard`.

**RECOMMENDATION**: Update line 913 from "15-function" to "19-function".

### M5. Lab Exercise Anchor IDs -- PASS

All 8 lab exercise links (`#ce-03-d`, `#ce-04-b`, `#ce-06-c`, `#ce-06-d`, `#ce-07-b`, `#ce-08-a`, `#ce-09-a`, `#ce-09-c`) point to elements with matching `id` attributes in their respective lab HTML files.

---

## Physical Plane (Practical Usability) -- SCORE: 9.0/10

### P1. HTML Validity -- PASS

Tag balance check on index.html:
- `<div>` / `</div>`: 340 / 340 -- balanced
- `<a>` / `</a>`: 68 / 68 -- balanced
- `<span>` / `</span>`: 106 / 106 -- balanced
- DOCTYPE declared, `lang="en"` set, `charset="UTF-8"` present, viewport meta present
- All `<svg>` elements include `aria-hidden="true"` for accessibility
- External links use `target="_blank" rel="noopener"` -- correct security practice

### P2. Visual Hierarchy -- GOOD

The information flows logically:
1. **Header** -- course title, build date, high-level counts
2. **Stat bar** -- quantitative overview (lines, words, counts)
3. **Validation banner** -- trust signal (anti-confabulation pass)
4. **Labs** (grouped by Day 1/2/3) -- primary interactive content
5. **Modules** (grouped by Day 1/2/3) -- reference material
6. **Multimedia** -- supplementary learning (audio, video, slides, flashcards)
7. **Challenge Missions** (grouped by Track 1/2/3 + Exercises) -- advanced practice
8. **Framework** -- technical infrastructure detail
9. **Footer** -- attribution

The hierarchy makes sense: students encounter labs first (the "do" content), then modules (the "read" content), then supplementary and advanced material. The framework section at the bottom is appropriately placed for technical reference.

### P3. Challenge Track Colors -- PASS

| Track | Background | Text Color | Distinct? |
|-------|-----------|------------|-----------|
| Track 1 (Skills) | `rgba(139,92,246,0.15)` purple | `#a78bfa` light purple | Yes |
| Track 2 (Codebase) | `rgba(6,182,212,0.15)` cyan | `var(--accent)` cyan | Yes |
| Track 3 (Production) | `rgba(239,68,68,0.15)` red | `#f87171` light red | Yes |
| Exercises | `rgba(245,158,11,0.15)` orange | `var(--warning)` amber | Yes |

All four track colors are visually distinct from each other. The color choices align with semantic meaning: purple for creative/authoring work, cyan for navigation/exploration, red for high-stakes production, orange/amber for practice exercises.

**Accessibility note**: The colors use sufficient luminance separation against the dark background (`#080d1a`). However, no colorblind-safe alternatives are provided. Users with protanopia may have difficulty distinguishing Track 3 (red) from Track 1 (purple) at the low-opacity background level.

### P4. Stale Card Metadata -- MINOR ISSUE

- All lab card line counts are verified accurate (see M1).
- Module cards show topic keywords, not quantitative claims -- no staleness risk.
- Challenge mission difficulty ratings and time estimates match CHALLENGE-MISSIONS.md source.
- **FINDING**: The flashcard section claims "2 Sets, 18 Cards Total" (9 + 9). This is not independently verifiable from the codebase since flashcards live in NotebookLM. The claim should be periodically re-verified.

### P5. Multimedia Links -- OBSERVATION

All 26 multimedia cards (1 audio, 12 videos, 13 slide decks) link to the same NotebookLM notebook URL: `https://notebooklm.google.com/notebook/742e3671-5a55-4420-b2a2-5e960e241b2c`. This is correct (NotebookLM hosts all artifacts in one notebook), but the user experience is that clicking any card takes them to the same page. They must then navigate within NotebookLM to find the specific artifact. This is a platform limitation, not a bug.

---

## Spiritual Plane (Purpose & Ethics) -- SCORE: 9.5/10

### S1. Accurate Representation -- PASS

The dashboard accurately represents the course deliverables:
- **9 interactive labs**: All exist as complete HTML files with working JavaScript interactivity (quizzes, coding challenges, XP system).
- **12 curriculum modules**: All exist as complete markdown files totaling 90,099 words.
- **8 challenge missions**: All exist in CHALLENGE-MISSIONS.md with detailed briefings, success criteria, and time estimates.
- **Multimedia materials**: Audio podcast, 12 explainer videos, 13 slide decks, and 18 flashcards -- all hosted on NotebookLM.
- **Lab framework**: Three production files (CSS, JS, build script) with architectural documentation.

The dashboard does not promise anything that doesn't exist. There are no placeholder cards, no "coming soon" sections, and no inflated capabilities.

### S2. Difficulty Ratings -- HONEST

Challenge mission difficulty ratings from the dashboard:

| Mission | Stars | Time | Assessment |
|---------|-------|------|------------|
| 1.1 Author Skills | 3/5 | ~3h | Appropriate -- writing YAML is mechanical but testing requires iteration |
| 1.2 Multi-Step Command | 3/5 | ~3h | Appropriate -- requires understanding orchestration but scope is bounded |
| 1.3 Specialized Subagent | 4/5 | ~4h | Appropriate -- system prompt engineering is genuinely harder |
| 2.1 Codebase Archaeology | 3/5 | ~3h | Appropriate -- navigation is bounded, bug fixing adds moderate difficulty |
| 2.2 Issue-to-PR Pipeline | 4/5 | ~5h | Appropriate -- MCP integration adds real complexity |
| 2.3 PR Review Workflow | 4/5 | ~4h | Appropriate -- structured review requires domain judgment |
| 3.1 Productivity Toolkit | 4/5 | ~6h | Appropriate -- system integration across skill/command/subagent |
| 3.2 Issue-to-Merge E2E | 5/5 | ~10h | Appropriate -- full pipeline with human checkpoints is genuinely 5-star |

The difficulty progression is credible: Track 1 (3-4 stars) < Track 2 (3-4 stars) < Track 3 (4-5 stars). Time estimates increase proportionally. No inflation detected.

The lab exercises are all marked as "+30 XP" or "+40 XP" with no difficulty stars, which is appropriate for embedded practice exercises that are optional (non-gating).

### S3. Attribution Footer -- ACCURATE AND COMPLETE

The footer includes:
1. **Trademark notice**: "Claude" and "Claude Code" are trademarks of Anthropic, PBC -- correct.
2. **Non-affiliation disclaimer**: "This course is not affiliated with or endorsed by Anthropic" -- required and present.
3. **Font attribution**: Inter and JetBrains Mono via Google Fonts under SIL Open Font License 1.1 -- correct license for both fonts.
4. **Copyright**: "Course content (c) 2026 Agentic AI Engineering Course" -- present.

No missing attributions detected. The Lucide icon library (loaded via CDN at line 11) is MIT-licensed and does not require attribution, though adding it would be a best practice.

---

## Summary

| Plane | Score | Key Issues |
|-------|-------|------------|
| **Mental** (Intellectual Rigor) | **8.5/10** | Framework API count is wrong (15 vs 19). Em-dash anchor IDs are fragile. |
| **Physical** (Practical Usability) | **9.0/10** | HTML is valid and balanced. Visual hierarchy is logical. Minor colorblind concern. |
| **Spiritual** (Purpose & Ethics) | **9.5/10** | No inflated claims. Difficulty ratings are honest. Attribution is complete. |
| **OVERALL** | **9.0/10** | |

---

## Recommendations (Priority Order)

### HIGH

1. **Fix framework API count**: Update `index.html` line 913 from `15-function public API` to `19-function public API`.

### MEDIUM

2. **Stabilize em-dash anchor IDs**: Replace em-dash characters in CHALLENGE-MISSIONS.md headings (Missions 2.1 and 2.3) with regular hyphens or colons. This prevents `marked.js` version updates from breaking the anchor links.

### LOW

3. **Add Lucide attribution**: Consider adding "Icons: Lucide (MIT License)" to the footer for completeness.

4. **Re-verify flashcard count**: The "18 Cards Total" claim lives in NotebookLM and cannot be verified from the codebase. Add a note in `progress.md` to re-verify this number if flashcard sets are modified.

5. **Colorblind accessibility**: Consider adding a secondary visual cue (icon shape or border style) to differentiate challenge tracks for users with color vision deficiency.

---

**Review status**: APPROVED with minor corrections needed.
**Blocker issues**: None.
**Next review**: After corrections applied, no re-review required -- changes are mechanical.
