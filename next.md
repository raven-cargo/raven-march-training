# Agentic AI Engineering Course — Next Steps

**Last updated**: 2026-03-22
**Project root**: `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/`
**Live site**: https://agentic-ai-course-hazel.vercel.app/
**Progress reference**: `progress.md` (same directory)
**Issues register**: `docs/reviews/issues.md` (47 findings)
**Audit dashboard**: `docs/reviews/modules-deep-audit-dashboard-2026-03-18.html`

---

## Session 12 — Remaining Polish (Next Session)

### SHOULD DO (gets to 99%)

1. **Lab 08 responsive polish** - add @media breakpoints (1h)
2. **Labs 06/08 accessibility** - add role=, tabindex to interactive elements (2h)
3. **CE-to-Mission linkage** - add "Ready for more?" links from 8 CE exercises to corresponding missions (2h)
4. **Lab 09 prediction challenges** - add 2-3 predictions to restore pedagogical pattern (1h)
5. **Challenge naming standardization** - pick numeric (1.1-3.2) everywhere, remove alpha refs (30m)
6. **Pin CDN versions** - marked.js, mermaid, lucide should use exact versions not @latest (30m)

### NICE TO HAVE (beyond 99%)

7. Lab 01 XP system upgrade to LAB_KEY pattern (4h)
8. Lab 05 localStorage refactor to granular keys (2h)
9. Implement CE-05-C/D (Lab 05 highest gap: zero challenges) (4h)
10. Implement CE-02-B (Write Production CLAUDE.md) (3h)
11. Dedicated /challenges HTML page with completion tracking (6h)
12. XP for mission completion via self-report button (2h)
13. Portfolio export mechanism (4h)
14. Compare-component markup standardization across M05/M06/M08/M09 (2h)
15. Fix data-diagram-id collision M02/M03 (30m)

### ARCHITECTURAL (future sprint)

16. Activate lab-framework build pipeline (all labs inline CSS/JS currently)
17. Add package.json + CI/CD pipeline
18. Async bridge curriculum completion (paused, 4 weeks of content)
19. Regenerate NotebookLM multimedia with improved prompts

---

## Priority Stack (Post-Audit)

```
P0  Module quality remediation — 9/9 DONE ✅
P1  Module quality lift — 12/12 DONE ✅ (quizzes + predict-reveals added)
P2  Cross-module consistency — 4/7 DONE (3 backlog: compare markup, step class names, diagram-id collision)
P3  Content restructuring — 0/2 (callout conversion M01/M03, details sections M08)
P4  Challenge Missions UI integration ← CURRENT
P5  Dashboard stats accuracy ← IN PROGRESS
P6  Lab config extraction (future infrastructure)
```

---

## Completed In Session 4 ✅

- Fixed broken inter-lab links and callback anchors across Labs 01–09.
- Added direct progression controls where missing (notably Labs 04, 05, 06, 07).
- Added modular light/dark theme plugin across dashboard, module viewer, and all labs.
- Added `module-viewer.html` fallback rendering when markdown CDN is unavailable.
- Standardized terminology drift (`GCF` → `GCCF`, `Boss Challenge` → `Capstone Challenge` in learner-facing labs).

---

## P0 — Day 2 Sequence Finalization (Post-Fix)

**Status**: Locally resolved. Canonical order is now `Lab 05 → Lab 04 → Lab 06` across:
- `labs/day1/lab-03-agent-thinking.html` (next links)
- `labs/day2/lab-05-prompt-engineering.html` (prev/next + completion CTA)
- `labs/day2/lab-04-mcp-explorer.html` (prev/next + completion CTA)
- `labs/day2/lab-06-skills-commands.html` (back-links)
- `index.html` Day 2 card order
- `docs/curriculum/master-outline.md` Module 2.1/2.2 order
- `progress.md` / `next.md` state notes

**Remaining to close**:
1. Deploy latest changes to Vercel.
2. Smoke-test routes: `/labs/day1/lab-03-agent-thinking.html` → `/labs/day2/lab-05-prompt-engineering.html` → `/labs/day2/lab-04-mcp-explorer.html` → `/labs/day2/lab-06-skills-commands.html`.
3. Confirm milestone persistence still behaves correctly after reorder (localStorage keys unchanged).

---

## P1 — Milestone Standardization

**Problem**: Milestones are rich in Lab 02 but not consistently implemented in Labs 03–09.
**Goal**: Add a consistent milestone strip and threshold logic across all remaining labs.

### Scope
- Labs: `lab-03` through `lab-09`
- Add:
  - nav milestone display
  - 3–5 milestone checkpoints tied to section completion
  - localStorage persistence for milestone level

---

## P2 — Visual Content Layer

**Problem**: All 12 modules are pure text. Labs are rich and interactive. Modules feel like reading a textbook.
**Goal**: Embed architectural diagrams directly in modules using Mermaid.js, rendered client-side in module-viewer.html.

### Step 1: Add Mermaid.js to module-viewer.html

**File to edit**: `module-viewer.html`

After the `marked.js` script tag (line ~9), add:
```html
<script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"></script>
```

In the `postProcess()` function, add a Mermaid render pass after marked parsing:
```javascript
// After marked.parse(md), before postProcess():
mermaid.initialize({ startOnLoad: false, theme: 'dark',
  themeVariables: { primaryColor: '#6366f1', edgeLabelBackground: '#0f1729' }
});
// Inside postProcess():
mermaid.run({ nodes: contentEl.querySelectorAll('.language-mermaid') });
```

**Test**: Any module with a ` ```mermaid ` fenced block will render as a live diagram.

### Step 2: Add diagrams to modules

**Files to edit**: specific module markdown files in `docs/curriculum/modules/`

**Priority diagrams to add**:

#### Module 01 — `01-paradigm-shift.md`
- Diagram: Three-era timeline (Autocomplete → Assistant → Agent)
  ```mermaid
  timeline
    title AI Coding Tool Eras
    2021 : Autocomplete : GitHub Copilot : Token prediction
    2023 : Assistant : ChatGPT + Copilot Chat : Conversation
    2025 : Agent : Claude Code : Autonomous execution
  ```

#### Module 02 — `02-claude-code-foundations.md`
- Diagram: Claude Code architecture (CLI → API → Tools → File System)

#### Module 03 — `03-agent-thinking.md`
- Diagram: PRAO loop (Perceive → Reason → Act → Observe) as flowchart

#### Module 05 — `05-mcp-architecture.md`
- Diagram: MCP client/server/transport model (already well-written — just needs the diagram)

#### Module 07 — `07-skills-commands.md`
- Diagram: Skill invocation flow (user request → skill check → prompt assembly → execution)

#### Module 09 — `09-multi-agent-systems.md`
- Diagram: Orchestrator → subagent topology patterns (star, pipeline, parallel)

#### Module 10 — `10-security-sandboxing.md`
- Diagram: settings.json permission hierarchy (deny overrides allow, tool categories)

### Step 3: Deploy and verify

```bash
cd /Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course
npx vercel deploy --prod --yes --scope manu-mulaveesalas-projects
```

Verify at: https://agentic-ai-course-hazel.vercel.app/module/05 (MCP diagram)

### Execution approach
Use a single background agent per module that:
1. Reads the existing module file
2. Adds Mermaid diagram(s) at appropriate section(s)
3. Writes back with Write tool

Run all 7 diagram agents in parallel in one message.

---

## P3 — NotebookLM Multimedia Package

**Problem**: Course has no audio, no video, no slide decks. Text-only learning.
**Goal**: Use `nlm-course-creation` skill to generate a complete multimedia layer.
**Skill reference**: Load with `Skill: "nlm-course-creation"` before executing.

### What this produces
- 12 explainer videos (one per module, whiteboard style, ~15-20 min each)
- 13 slide decks (1 course overview + 12 chapter decks)
- 1 audio podcast (~45 min deep dive)
- 18 flashcards (2 sets: fundamentals + advanced)

### Source material
The 12 module markdown files in `docs/curriculum/modules/` are the source.
Total: ~46,000 words — well within NotebookLM's capacity.

### Execution steps

1. **Authenticate**: `notebooklm-mcp-auth`
2. **Create notebook**: `mcp__notebooklm__notebook_create(title="Agentic AI Engineering Course")`
3. **Upload all 12 modules**: `mcp__notebooklm__notebook_add_text(...)` for each
4. **Generate in parallel**:
   - 12 videos with chapter-specific focus prompts (preventing content overlap)
   - 13 slide decks
   - 1 audio podcast (`format: "deep_dive", length: "long"`)
   - 2 flashcard sets (medium + hard difficulty)
5. **Monitor**: `mcp__notebooklm__studio_status(notebook_id=...)` until complete (~20 min)
6. **Extract all URLs**: Save to `docs/notebooklm/ARTIFACT-URLS.md`
7. **Embed in course**: Add a "Multimedia Learning" section to `index.html` linking to videos/podcast/slides

### Files to create/update after completion
- `docs/notebooklm/ARTIFACT-URLS.md` — all NotebookLM artifact URLs (new file)
- `index.html` — add multimedia section below lab/module grids
- `docs/curriculum/modules/*.md` — optionally link to chapter video at top of each module

### Anti-confabulation note
NotebookLM generates from source text only — no confabulation risk since the source is our already-validated modules. Still spot-check first 2 min of each video.

---

## P4 — Further Reading: Modules 02, 03, 04

**Problem**: Modules 02, 03, 04 have no research citations or Further Reading sections.
**Files**:
- `docs/curriculum/modules/02-claude-code-foundations.md`
- `docs/curriculum/modules/03-agent-thinking.md`
- `docs/curriculum/modules/04-prompt-engineering-depth.md`

### Citations to add per module

**Module 02 — Claude Code Foundations**:
- Anthropic Claude Code docs: https://docs.anthropic.com/en/docs/claude-code/overview
- Claude Code GitHub: https://github.com/anthropics/claude-code
- Wei et al. 2022 — Chain-of-thought (if module covers reasoning): https://arxiv.org/abs/2201.11903

**Module 03 — Agent Thinking**:
- ReAct (Reasoning + Acting): Yao et al. 2023 https://arxiv.org/abs/2210.03629
- Tree of Thoughts: Yao et al. 2023 https://arxiv.org/abs/2305.10601
- Anthropic system prompt docs: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts

**Module 04 — Prompt Engineering Depth**:
- TCEF framework (if original to course): no citation needed
- Brown et al. 2020 — Few-shot learners (GPT-3): https://arxiv.org/abs/2005.14165
- Kojima et al. 2022 — Zero-shot reasoning: https://arxiv.org/abs/2205.11916
- Anthropic prompt engineering guide: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview

### Execution
Add a `## Further Reading` section to each file using Edit tool. Format: match modules 05-12 style.

---

## P5 — URL Verification

**Problem**: 24 external URLs in `docs/meta/framework-architecture/CITATIONS-AUDIT.md` have not been live-checked.

### Execution
Run an Explore agent or bash script:
```bash
# Check each URL and report HTTP status
while IFS= read -r url; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  echo "$status $url"
done < <(grep -Eo 'https?://[^ ]+' docs/meta/framework-architecture/CITATIONS-AUDIT.md)
```

Update `docs/meta/framework-architecture/CITATIONS-AUDIT.md` with verification date and status codes.

---

## P6 — Lab Config Extraction (Future Infrastructure)

**Problem**: All 9 lab HTML files have config embedded inline. The `lab-framework/build.js` pipeline was documented but never used in production. Extracting configs would make labs regeneratable.

**Status**: Aspirational — not blocking any current goals.

**When to do this**: When rebuilding a lab becomes necessary (content update), or when starting a new course using the COURSEWARE system.

**Approach**:
1. For each lab, extract the config object at top of HTML into `labs/day{N}/lab-0N-config.js`
2. Test that `node lab-framework/build.js labs/day1/lab-01-config.js` regenerates identical output
3. Update COURSEWARE/CLAUDE.md to mark config-driven build as production-validated

---

## Execution Sequence

```
Session 4 completed:
✅ P2-Step1: Mermaid.js integrated in module-viewer.html (theme:'base', full hex palette, Inter font)
✅ P2-Step2: Diagrams added to modules 01, 02, 03, 05, 07, 09, 10 (7 modules, 14 diagrams total)
✅ Deployed: https://agentic-ai-course-hazel.vercel.app/

Session 5 completed:
✅ P0: master-outline.md updated — Day 2 is now canonical 05→04→06 (Prompt Engineering first, then MCP)
✅ P4: Further Reading added to module 02 (modules 03 and 04 already had it)

Session 6 completed:
✅ P1: Milestone strips added to Labs 03–09 (7 parallel agents, each adapted to lab's state pattern)
✅ P5: 25 URLs live-checked — 22 pass, 1×404, 2×000 (bot-blocked spec subdomain). Logged in CITATIONS-AUDIT.md.
✅ Deployed: https://agentic-ai-course-hazel.vercel.app/

Session 7 completed:
✅ P3: NotebookLM multimedia generation complete
       - 12 explainer videos (one per module, whiteboard style)
       - 13 slide decks (1 course overview + 12 module-specific PDFs)
       - 1 audio podcast (~45 min deep dive)
       - 2 flashcard sets (18 cards total: medium + hard)
       - URLs saved to: `docs/notebooklm/ARTIFACT-URLS.md`
       - Multimedia section embedded in `index.html`
✅ Deployed: https://agentic-ai-course-hazel.vercel.app/

Session 8 completed:
✅ Module 01 + 02 rendering fixed: removed "Source document for NotebookLM" banner (line 4 of both files)
✅ Module 02 diagram fixed: added `## Claude Code Architecture` heading to orphaned Mermaid block
✅ Challenge Missions created: `docs/curriculum/CHALLENGE-MISSIONS.md`
       - 8 open-ended engineering challenges, difficulty ★★☆ to ★★★★★
       - Mission 1.A (Teach the Loop), 1.B (Build CLAUDE.md)
       - Mission 2.A (Build Real MCP Server), 2.B (Prompt Engineering Duel), 2.C (Permissions Audit)
       - Mission 3.A (Debug Pipeline), 3.B (Build a Skill), 3.C (Full Capstone System)
✅ Deployed: https://agentic-ai-course-hazel.vercel.app/

Session 10 — Module Quality Remediation (2026-03-18):

## P0 — Immediate Fixes (9 items) → Agent Team: course-builders

1. [x] M12 line 3: Change `data-phase="goal"` to `data-phase="success"`
2. [x] M12 lines 889-910: Replace `ix-entry-label` → `ix-entry-title` (6 instances)
3. [x] M12 lines 889-910: Fix `data-badge="warning"/"error"` → `data-badge="exclude"`
4. [x] M01 line 22: Add `objective` component to Overview section
5. [x] M03 lines 22-41: Add `objective` component to Overview section
6. [x] M03 lines 34-40: Remove markdown numbered objectives list
7. [x] M02 lines 582-670: Remove inline `style` attributes (6 instances)
8. [x] M02 lines 34-42: Add `ix-instruct` before architecture click-cards
9. [x] M02 line 578/690: Fix duplicate `data-diagram-id="claudemd-hierarchy"`

## P1 — Quality Lift (12 items) → Agent Team: course-builders

10. [x] ALL modules: Add `aria-label="Your prediction"` to predict-reveal textareas (24+ instances)
11. [x] M05+M06: Replace hardcoded hex `data-accent` with `data-phase` (16 instances)
12. [x] M08: Add second quiz after Section 8.2 or 8.3 ← content creation needed
13. [x] M11: Add mid-module quiz after Section 11.3 ← content creation needed
14. [x] M12: Add second quiz after Section 12.3 ← content creation needed
15. [x] M06: Add predict-reveal before Section 6.3 or 6.4 ← content creation needed
16. [x] M08: Add predict-reveal to Sections 8.4 and 8.5 ← content creation needed
17. [x] M12: Add predict-reveal to Section 12.1 or 12.5 ← content creation needed
18. [x] M05: Remove duplicate SSE callout at line 531
19. [x] M10: Break up 4 stacked callouts at lines 967-981
20. [ ] M01+M03: Convert stacked callouts to interactive components ← content restructuring
21. [ ] M08: Add 2-3 more collapsed details sections ← content restructuring

## Deferred from Session 9

22. [ ] Embed Challenge Missions in course UI
23. [ ] Regenerate NotebookLM multimedia with improved prompts
24. [ ] Lab config extraction (aspirational)
```

---

## COURSEWARE Reference

The COURSEWARE system at `/Users/manu/Documents/LUXOR/COURSEWARE/` is the abstraction layer for building new courses. It is NOT where current course content lives.

| Question | Answer |
|----------|--------|
| Where are the labs? | `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/labs/` |
| Where are the modules? | `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/docs/curriculum/modules/` |
| Where is the module viewer? | `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/module-viewer.html` |
| Where is the COURSEWARE system? | `/Users/manu/Documents/LUXOR/COURSEWARE/` |
| How do I build a new course? | Load `Skill: "course-orchestrator"` and run `/new-course "[topic]"` |
| How do I add a single lab? | Load `Skill: "progressive-game-lab"` and run `/build-lab [N] "[title]"` |
| How do I run NotebookLM generation? | Load `Skill: "nlm-course-creation"` and follow the 6-phase workflow |
