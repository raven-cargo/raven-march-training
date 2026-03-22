# CC2.0 LEARN: Extracted Patterns & Pipeline Elements
**Date**: 2026-03-16
**Learner**: CC2-LEARN Agent
**Source Project**: `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/`
**Files Analyzed**: 25+ source files across meta docs, framework code, NotebookLM prompts, agent team plans, and prompt templates

---

## Executive Summary

- **Parallel agent dispatch is the architecture, not an optimization.** A single Claude Code message dispatching 7-9 background agents compressed a 31-hour sequential build to ~4 hours. The orchestrator thread never writes large files -- it only coordinates.
- **The 32k output token limit is the single most common failure mode.** Every agent building files >800 lines must use the Write tool to disk, never returning content in the response. A one-line header instruction ("Use the Write tool...") eliminated 100% of failures after discovery.
- **Anti-confabulation validation is a hard gate, not optional polish.** 8 domain-specific grep checks across 21 files caught zero errors -- because accuracy rules were embedded in every agent prompt from the start. The validation pass confirms; it does not discover.
- **The Progressive Game Lab Framework is domain-agnostic.** The Seven-Beat Engagement Loop, 5 card types, XP system, section gates, and CONCEPT_REGISTRY apply to any technical domain. Only the Q&A content and accuracy rules change per course.
- **NotebookLM multimedia generation is a pipeline with 28 artifacts.** Module-specific focus prompts with explicit exclusion clauses ("Do NOT cover X -- that belongs to Module Y") prevent content bleed. 6 parallel agents generated 2,938 lines of prompts in one session.

---

## 1. Build Process Patterns

### What Worked

#### 1.1 Orchestrator-Builder Separation
The main thread acts exclusively as an orchestrator. Background agents are the builders. This separation is load-bearing:
- **Orchestrator responsibilities**: Dispatch agents, monitor file existence via `ls -la`, relaunch failed agents, write small sequential files (configs, templates, meta docs)
- **Builder responsibilities**: Read framework spec, build complete HTML/Markdown artifact, write to disk via Write tool
- **Why it works**: Keeps the orchestrator's context window clean. A single 1,900-line lab HTML file would consume most of the orchestrator's context budget if written inline.

#### 1.2 Single-Message Multi-Agent Dispatch
All independent agents dispatched in a single response message achieve true parallelism. Sequential dispatch (one message per agent) runs agents serially -- destroying the primary efficiency multiplier.

**Proven batch sizes**:
- 7 lab agents simultaneously: no quality degradation observed
- 12 module agents simultaneously: all succeeded
- Safe upper bound: 7-8 agents per batch

#### 1.3 File-on-Disk as Ground Truth
Agent completion notifications can be stale, delayed, or from prior session agents. The rule:
- File exists on disk with correct size -> success
- File missing or truncated -> relaunch
- Notification contradicts disk state -> trust disk

**Monitoring commands**:
```bash
ls -la labs/day*/lab-*.html          # existence check
wc -l labs/day*/lab-*.html           # size check (expect 200-600 lines per lab)
tail -1 labs/day*/lab-*.html         # integrity check (should end with </html>)
```

#### 1.4 Accuracy Rules in Every Prompt
Anti-confabulation rules are not a post-build validation step -- they are embedded in every builder agent's prompt. The validation pass then confirms compliance rather than discovering violations.

**Pattern**: Define a content accuracy table per technology domain:
| Claim | Correct | Common Error |
|-------|---------|-------------|
| MCP transport | stdio + Streamable HTTP | Listing SSE as current |
| MCP primitives | Exactly 3 | Inventing a 4th |
| CLAUDE.md | File read at session start | Invoked as a command |

This table goes into every lab builder prompt, every module writer prompt, and every NotebookLM focus prompt.

### What Failed

#### 1.5 The 32k Output Token Limit (Critical)
**Root cause**: Background agents building ~2,000-line HTML files attempted to return the entire file as response text. Claude has a hard 32,000 output token limit.

**Cost of failure**: Lab 04 required 3 attempts. Each failed attempt consumed ~32k tokens for zero deliverable output.

**Fix**: A mandatory one-line header as the FIRST instruction in every builder prompt:
```
CRITICAL: Use the Write tool to save the file directly to disk. Do NOT output
the HTML in your response text. Your response should only confirm what was built.
```

**Success rate after fix**: 100% (Labs 04-09 all succeeded on relaunched attempt).

**Rule**: Any agent expected to produce >800 lines MUST use the Write tool. This is non-negotiable.

#### 1.6 Vague Section Specs
Prompts like "Add a section about MCP" produced variable, sometimes confabulated content. The fix: specify exact Q&A content per section:
- Exact prediction question text
- Exact reveal content
- Exact wrong-answer feedback per option (not generic "Incorrect")
- Exact min-char thresholds for gates
- Exact CONCEPT_REGISTRY entries to callback

**Anti-pattern**: Omitting wrong-answer feedback text. Agents invent generic "That's not right" messages, which provide zero learning value.

#### 1.7 Stale Background Agent Notifications
Old agents from prior sessions completed during the current session, producing confusing failure notifications after the replacement agents had already succeeded.

**Handle**: Always check file existence before acting on a failure notification.

### Reusable Templates

The project produced 4 reusable prompt templates at `docs/meta/prompts/`:

| Template | Purpose | Key Variables |
|----------|---------|---------------|
| `lab-builder-template.md` | Build a single interactive HTML lab | LAB_NUMBER, LAB_NAME, section specs, CONCEPT_REGISTRY |
| `module-writer-template.md` | Write a curriculum module for NotebookLM | MODULE_NUMBER, MODULE_TITLE, LEARNING_OBJECTIVES, SECTION_TOPICS |
| `anti-confabulation-validation-template.md` | Post-build accuracy validation | COURSE_NAME, file paths, technology-specific checks |
| `parallel-orchestration-pattern.md` | Multi-agent dispatch coordination | Agent count, dispatch rules, monitoring strategy, failure recovery |

Additionally, a complete skill file was extracted: `agentic-course-builder-skill.md` -- a YAML-frontmatter skill that encodes the entire 7-phase build process as a reusable Claude Code skill.

---

## 2. Agent Team Patterns

### Team Compositions

Three team configurations were designed, each optimized for a different task profile:

#### 2.1 `course-builders` (Build Team)
**Size**: 4 teammates + 1 lead (tech-lead)
| Slot | Agent | Role |
|------|-------|------|
| Lead | tech-lead | Task decomposition, plan approval, synthesis |
| T1 | frontend-architect | HTML/CSS, design system consistency |
| T2 | practical-programmer | JS correctness, quiz logic, XP system |
| T3 | MERCURIO | Content validation, zero-tolerance accuracy |
| T4 | deployment-orchestrator | Vercel, routing, production checks |

**When**: >= 3 independent files to edit

#### 2.2 `course-reviewers` (Audit Team)
**Size**: 3 teammates + 1 lead (software-architect)
| Slot | Agent | Role |
|------|-------|------|
| Lead | software-architect | Synthesize findings, approve final output |
| T1 | superpowers:code-reviewer | HTML/CSS/JS quality |
| T2 | MARS | System-level structural correctness |
| T3 | debug-detective | Broken links, missing files, edge cases |

**When**: Content accuracy check, PR review, audit

#### 2.3 `course-researchers` (Research Team)
**Size**: 2 teammates + 1 lead (tech-lead)
| Slot | Agent | Role |
|------|-------|------|
| Lead | tech-lead | Frame questions, synthesize findings |
| T1 | deep-researcher | Technical research (Perplexity MCP) |
| T2 | MERCURIO | Confabulation filter on research findings |

**When**: Spec verification, fact-checking

### Orchestration Patterns

#### 2.4 File Ownership Pattern
**Critical constraint**: Each teammate owns a distinct set of files. No two teammates edit the same file.
- Day 1 files -> Teammate A only
- Day 2 files -> Teammate B only
- Day 3 files -> Teammate C only
- Shared files (index.html, module-viewer.html) -> Lead or dedicated singleton

#### 2.5 Plan Approval Gate
Before any teammate modifies HTML files, the lead must approve the plan. Approval criteria:
1. Plan touches only the teammate's assigned files
2. Plan preserves existing JS interactivity
3. Plan follows lab-framework conventions
4. Plan contains no zero-tolerance accuracy violations

#### 2.6 Task Sizing Rule
- One lab file per task (clear deliverable, ~100-150 edits)
- Never combine multiple lab files into one task
- 5-6 tasks per teammate maximum per session

### Key Learnings

1. **Subagents vs. Teams**: Subagents are cheaper and sufficient for focused tasks where only the result matters. Teams are justified when cross-agent discussion is needed (e.g., contradictory accuracy findings).
2. **Decision rule**: `>= 3 independent files -> team; sequential/single-file -> subagent; cross-agent debate -> reviewers team`
3. **Limitation**: One team per lead session. Cannot run builders and reviewers simultaneously -- run builders first, then start a new review session.
4. **TeammateIdle hook**: Can enforce accuracy re-validation before a teammate marks a task as done.

---

## 3. Interactive Diagram System

### Component Registry Pattern

The module-viewer.html implements a **hydration-based component registry** using `data-component` attributes. This is a lightweight alternative to a full framework.

**Registry implementation** (from module-viewer.html, line 1120):
```javascript
function hydrateInteractiveDiagrams(contentEl) {
  var components = contentEl.querySelectorAll('[data-component]');
  components.forEach(function (el) {
    var type = el.dataset.component;
    switch (type) {
      case 'tabbed-panel':     initTabbedPanel(el);     break;
      case 'click-cards':      initClickCards(el);      break;
      case 'flow-diagram':     initFlowDiagram(el);     break;
      case 'decision-tree':    initDecisionTree(el);    break;
      case 'step-walkthrough': initStepWalkthrough(el); break;
    }
  });
  // Render Lucide icons inside hydrated components
  if (window.lucide) {
    try { lucide.createIcons(); } catch (e) { console.warn('[IX] Lucide icon error:', e); }
  }
}
```

**Pattern**: Content is authored as static HTML with `data-component="tabbed-panel"` attributes. JavaScript finds these elements post-render and attaches interactivity. No build step required for content authoring.

### Hydration Approach

Five component types, each hydrated differently:

| Component | Markup Pattern | Hydration Behavior |
|-----------|---------------|-------------------|
| `tabbed-panel` | `.ix-tab` children with `data-tab` labels | Builds tab nav bar, wraps content into panels, first tab active |
| `click-cards` | `.ix-card` children with `.ix-detail-panel` siblings | Builds card grid, wires click to show/hide detail panels |
| `flow-diagram` | `.ix-flow-node` + `.ix-cap-fill[data-width]` | Animates capability bar fills on viewport entry |
| `decision-tree` | `.ix-tree-node` + `.ix-tree-children` | Wires click to toggle children visibility, rotates chevron |
| `step-walkthrough` | `.ix-walk-step` children | Creates prev/next nav, shows one step at a time |

**Key design decision**: Components use CSS `data-accent` attributes for per-instance theming. Each tab or card can specify its own accent color, which gets applied via dynamically generated `<style>` tags scoped by auto-generated element IDs.

### Reusable CSS Variables

The interactive diagram system adds semantic CSS variables on top of the base design system:

```css
--ix-phase-perceive: #6366f1;   /* PRAO phase colors */
--ix-phase-reason:   #8b5cf6;
--ix-phase-act:      #06b6d4;
--ix-phase-observe:  #10b981;
--ix-err:            #ef4444;
--ix-warn:           #f59e0b;
```

The `ix-` prefix namespace prevents collisions with the base design system tokens.

### Content Pipeline Integration
The diagram system operates within the module-viewer's markdown rendering pipeline:
1. Markdown fetched and parsed by `marked.js`
2. Post-processing: h2 sections wrapped into `.module-section` cards, code blocks enhanced, blockquotes transformed to insight cards, tables wrapped
3. `hydrateInteractiveDiagrams()` called on the rendered content element
4. Lucide icons created inside hydrated components
5. Mermaid diagrams rendered via `mermaid.run()`

---

## 4. Lab Framework Patterns

### Exercise Validation

The lab framework (`lab-framework/core.js`, 655 lines) implements a config-driven validation system:

#### 4.1 Character Gate Pattern
Textareas use `checkMinChars(taId, btnId, min, hintId)` to gate progression:
- **15 chars**: Predictions (lightweight -- just prove engagement)
- **40 chars**: Apply tasks (moderate -- require thoughtful response)
- **80 chars**: Boss challenges (substantial -- require synthesis)

XP is awarded once per textarea when the threshold is first reached. The `xpAwardedFor` map prevents double-awards on re-edits.

#### 4.2 Per-Option Feedback Pattern
Every knowledge check option must have specific wrong-answer feedback explaining WHY it is incorrect:
```javascript
{ letter: 'B', text: 'Resources', correct: false,
  feedback: 'Resources are URI-addressable read-only data, not callable actions.' }
```
**Anti-pattern**: Generic "Incorrect" or "Try again" feedback. This was explicitly banned after early builds produced non-explanatory responses.

#### 4.3 Section Gate / Unlock Pattern
Sections are locked by default. Each section unlocks only when all prior sections are complete:
```javascript
function checkSectionUnlock(idx) {
  const allPriorDone = idx === 0 || sectionComplete.slice(0, idx).every(Boolean);
  if (allPriorDone) { section.classList.remove('locked'); }
}
```
**Calibration**: Knowledge checks require 2/3 correct (not 3/3). Apply tasks unlock on ANY submit (not scored). Only Boss Challenge requires meaningful engagement (min char threshold).

#### 4.4 Three-Phase Prediction Challenge
The dominant pattern (6/9 labs): Predict -> Reveal -> Apply
1. Learner writes a prediction (gated at 15 chars)
2. Reveal shows the correct answer
3. Apply phase asks learner to use the concept (gated at 40 chars)
4. Model answer shown after submission

This pattern forces active recall before passive consumption -- the prediction creates a knowledge gap that the reveal fills.

### Gamification Elements

#### 4.5 XP System
- **Knowledge checks**: 30 XP first try, 15 XP second try, 5 XP third try (not implemented per-attempt in current code -- simplified to flat 30 XP on correct)
- **Predictions**: 10 XP for committing (not for correctness)
- **Apply tasks**: 20 XP for submission
- **Lab completion**: 100 XP bonus
- **Streak bonuses**: 25 XP at 3, 5, and 7 consecutive correct answers

#### 4.6 Streak System
Visual escalation with streak thresholds:
- 3 streak: fire emoji, orange color
- 5 streak: lightning emoji, amber color
- 7 streak: crown emoji, gold color with glow

Incorrect answer resets streak to 0. Streak display is hidden when streak is 0.

#### 4.7 XP Toast Notifications
Animated toast appears at top-right on XP award, auto-removes after 2.2s. Uses CSS keyframe animation (`toast-in-out`).

### Progress Tracking

#### 4.8 localStorage Persistence
All state persisted with consistent key convention:
- `{labKey}-xp`: Total XP earned (number)
- `{labKey}-s{idx}`: Section complete flag ('1')
- `{labKey}-complete`: Completion timestamp
- `{labKey}-{textareaId}`: Textarea content

On page load, `loadAllReflections()` restores all textarea values, section completion states, XP, and re-runs unlock checks.

#### 4.9 Cross-Lab XP Aggregation
Lab 09 (Capstone) reads `lab-01-xp` through `lab-08-xp` from localStorage to show total course XP. This requires consistent key naming across all labs -- the two-digit lab number convention (`lab-04`, not `lab-4`) is critical.

#### 4.10 Reflection Export
`exportReflections()` generates a `.txt` download of all non-empty textarea contents. Filename: `{labKey}-reflections.txt`. Useful for instructor review and learner portfolio.

### Framework Architecture

#### 4.11 Self-Contained HTML (Non-Negotiable)
Labs are delivered as single `.html` files that work from `file://` URLs -- no server, no CDN, no internet. The `build.js` script inlines `core.css` and `core.js` at build time. This is designed for air-gapped training environments (financial, government, healthcare clients) where USB distribution is standard.

#### 4.12 IIFE Module Pattern
`core.js` uses an Immediately Invoked Function Expression to avoid global scope pollution while exposing a named `LabFramework` API. All 15 public methods are returned from the closure.

#### 4.13 Code Reduction Metrics
- **Before extraction**: 17,440 lines across 9 labs (~1,938 lines/lab average)
- **After extraction**: ~6,180 lines (1,930 shared + 9 x 450 config)
- **Reduction**: 64.6% -- saves ~1,253 lines per lab
- **Future labs**: ~450 lines of config only

---

## 5. NotebookLM Integration

### Content Pipeline

The complete markdown-to-multimedia pipeline:

```
Phase 1: Course Architecture
    |
Phase 2: Parallel Lab Builds (9 HTML labs, ~17K lines)
    |
Phase 3: Parallel Module Builds (12 markdown docs, ~50K words)
    |
Phase 4: Anti-Confabulation Validation (MUST PASS before upload)
    |
Phase 5: NotebookLM Upload (12 modules as text sources)
    |
Phase 6: Multimedia Generation (28 artifacts)
    |-- 12 explainer videos (whiteboard style)
    |-- 13 slide decks (1 overview + 12 module PDFs)
    |-- 1 deep-dive podcast (~45 min)
    |-- 2 flashcard sets (18 cards total)
    |
Phase 7: URL Extraction to ARTIFACT-URLS.md
```

**Critical gate**: Validation MUST return PASS before NotebookLM upload. NotebookLM treats modules as source material -- inaccurate content becomes inaccurate video scripts, slide decks, and flashcards.

### Prompt Templates

NotebookLM multimedia prompts were generated by 6 parallel agents using a 4-step meta-prompt extraction process:

1. **Read** the source module markdown file
2. **Extract** concepts unique to that module (not in adjacent modules)
3. **Identify** whiteboard-visual structures and anchor analogies
4. **Write** prompts with explicit exclusion clauses

**Total output**: 2,938 lines across 6 prompt files, producing 28 artifact prompts.

**Key technique -- Exclusion Clauses**: Every video focus prompt opens with explicit boundaries:
```
Focus EXCLUSIVELY on Module 01: The Paradigm Shift. Do NOT introduce Claude Code's CLI
commands, CLAUDE.md syntax, or the settings.json permissions file -- those belong to Module 02.
Do NOT cover reasoning traces -- that is Module 03 content.
```

This prevents content bleed between adjacent modules -- the single most common quality issue in auto-generated course media.

### Multimedia Generation

#### 5.1 Video Prompts (Whiteboard Style)
Each video prompt specifies:
- **Opening hook** (first 2 minutes) with a concrete disorientation scenario
- **Concept sections** with minute-by-minute timing
- **Whiteboard diagrams** to draw (cycles, timelines, columns)
- **Anchor analogies** (GPS vs. driver, junior engineer with codebase access)
- **Exclusion clauses** (what NOT to cover)

#### 5.2 Audio Podcast Prompt (Deep Dive)
The podcast prompt specifies:
- **Two-host format**: curious practitioner + course architect
- **Four narrative chapters** (not twelve modules): Disorientation, Craft, Scaling+Security, Production Gap
- **Three engineered "aha moment" beats** at specific positions
- **Before/after state** transformation arc
- **Tone**: "Two engineers who build real systems, not educators reciting content"

#### 5.3 Flashcard Prompts (Application, Not Definition)
Each flashcard topic specifies:
- **Card type**: application, scenario, debugging, or design-decision (never definition)
- **Exact front text** (scenario-based question)
- **Required back content** (specific named answers, not generic explanations)
- **Accuracy rules baked in** (MCP primitives, CLAUDE.md behavior, etc.)

#### 5.4 Slide Deck Prompts
Slide-by-slide specifications with:
- **Slide number ranges** and content targets
- **Visual layout** instructions (timeline, columns, cycle diagrams)
- **Audience context** (e.g., "engineers on Day 1, first session, before any lab work")

### MCP Integration
NotebookLM is accessed via MCP tools:
```python
mcp__notebooklm__video_overview_create(notebook_id, format, visual_style, language, focus_prompt, source_ids)
mcp__notebooklm__slide_deck_create(notebook_id, format, language, focus_prompt, source_ids)
mcp__notebooklm__flashcards_create(notebook_id, difficulty, focus_prompt)
mcp__notebooklm__audio_overview_create(notebook_id, format, focus_prompt)
```

`source_ids` parameter enables pinning generation to specific module sources, preventing cross-module bleed at the API level.

---

## 6. Production Pipeline Elements (NEW)

### Pre-Deployment Checks

Based on patterns discovered in the build:

| Check | Method | Threshold |
|-------|--------|-----------|
| File existence | `ls -la labs/day*/lab-*.html` | All 9 files present |
| File completeness | `wc -l` per file | > 200 lines (labs), > 100 lines (modules) |
| HTML integrity | `tail -1` per file | Ends with `</html>` |
| Anti-confabulation | 8+ grep checks per domain | Zero violations |
| CONCEPT_REGISTRY consistency | Cross-reference lab/section citations | All callbacks point to existing content |
| XP values | Grep for XP award amounts | 30/15/5 for checks, 50 for capstone, 100 for completion |
| Section unlock logic | Grep for `markSectionComplete` | Present in all labs |

### Content Validation Gates

1. **Technology-specific accuracy table** -- define before Phase 1, embed in all prompts
2. **Per-option feedback check** -- no generic "Incorrect" responses allowed
3. **Forward reference check** -- no Concept Callbacks to concepts not yet introduced
4. **Citation audit** -- all external URLs verified, trademark/license attributions present
5. **Accessibility check** -- no nested `<a><button>` patterns, ARIA labels on interactive elements

### Automated Quality Metrics

Measurable metrics from the reference build:

| Metric | Value | Target |
|--------|-------|--------|
| Labs produced | 9 | 9 |
| Total lab lines | 17,440 | > 15,000 |
| Modules produced | 12 | 12 |
| Total module words | ~50,000 | > 40,000 |
| Confabulations found in validation | 0 | 0 |
| Agent first-try success rate | 7/9 (78%) | > 70% |
| Agent success rate after relaunch | 9/9 (100%) | 100% |
| NotebookLM artifacts | 28/28 | 28 |
| Build time (parallel) | ~4 hours | < 6 hours |
| Build time (sequential equivalent) | ~31 hours | N/A |

### CI/CD Recommendations

For automated course builds:

```bash
# 1. Validate all source content before NotebookLM upload
claude -p "$(cat docs/meta/prompts/anti-confabulation-validation-template.md)" \
  --no-interactive --output-format json > validation-result.json
jq '.verdict' validation-result.json  # must be "PASS"

# 2. Verify file integrity
for f in labs/day*/lab-*.html; do
  if [ $(wc -l < "$f") -lt 200 ]; then echo "TRUNCATED: $f"; fi
  if [ "$(tail -1 "$f" | tr -d '[:space:]')" != "</html>" ]; then echo "INCOMPLETE: $f"; fi
done

# 3. Deploy to Vercel
npx vercel deploy --prod --yes --scope [SCOPE]
```

---

## 7. Replication Blueprint

### Step-by-Step Guide to Replicate This Course Creation Approach

#### Step 1: Define Course Architecture (1-2 hours, sequential)

1. Write the 3-day learning arc (one sentence per day: what can the learner do?)
2. Map 9 labs to concepts in learning-dependency order
3. Map 12 modules to theory behind the labs (4 per day)
4. Define the full CONCEPT_REGISTRY (1-3 new concepts per lab)
5. Write content accuracy rules for the technology domain
6. Define the domain's core mental model (equivalent of PRAO Loop)
7. Output: Master outline at `docs/plans/[DATE]-[COURSE-NAME]-master.md`

#### Step 2: Build Lab Framework (if not exists)

If starting fresh, copy `lab-framework/` from the reference project:
- `core.css` (669 lines) -- design system + component styles
- `core.js` (655 lines) -- IIFE module with 15 public API methods
- `build.js` -- Node.js inline build script

The framework is domain-agnostic. Only the Q&A content and CONCEPT_REGISTRY entries change.

#### Step 3: Write Section Specs (2-3 hours, sequential)

For each of 9 labs, write section-by-section specifications:
- Exact prediction question text
- Exact reveal content
- Per-option feedback for knowledge checks (name the misconception)
- Min-char thresholds for gates
- CONCEPT_REGISTRY entries to callback
- Apply task prompt and model answer

**This is the highest-leverage time investment.** Vague specs produce vague labs.

#### Step 4: Parallel Lab Builds (2-4 hours)

1. Fill in `lab-builder-template.md` for each lab
2. Include Write-to-file header as FIRST line of every prompt
3. Dispatch all 9 agents in a single Claude Code message
4. Monitor: `ls -la labs/day*/lab-*.html`
5. Relaunch any failed agents (check file size and tail)

#### Step 5: Parallel Module Builds (1-2 hours)

1. Fill in `module-writer-template.md` for each module
2. Dispatch all 12 agents in a single message
3. Monitor: `ls -la docs/curriculum/modules/*.md`

#### Step 6: Infrastructure (30 min, sequential)

Write sandbox configs, GitHub templates, environment prep script. Small files -- write directly without agent dispatch.

#### Step 7: Anti-Confabulation Validation (30 min)

1. Dispatch validation agent using `anti-confabulation-validation-template.md`
2. Add technology-specific checks (see template customization notes)
3. **GATE**: MUST return PASS before proceeding
4. Fix all findings if FAIL

#### Step 8: NotebookLM Multimedia (2-3 hours, async)

1. Generate module-specific focus prompts using 6 parallel meta-prompting agents
2. Upload all 12 modules as text sources to a NotebookLM notebook
3. Generate: 12 videos + 13 slide decks + 1 podcast + 2 flashcard sets = 28 artifacts
4. Extract all URLs to `docs/notebooklm/ARTIFACT-URLS.md`

#### Step 9: Meta-Layer Documentation (1 hour)

Dispatch 3-4 parallel agents:
1. BUILD-LOG.md -- operational record of the build session
2. LESSONS-LEARNED.md -- what worked, what failed, what to do differently
3. REPLICATION-GUIDE.md -- this document, updated with deviations
4. Prompt templates in `docs/meta/prompts/`

### What to Change Per New Technology

| Element | Change Required |
|---------|----------------|
| CONCEPT_REGISTRY concepts | Replace with your domain's key concepts |
| PRAO Loop equivalent | Replace with your domain's core mental model |
| Content accuracy checks | Add technology-specific grep patterns |
| Section specs (Q&A content) | Rewrite for your domain |
| Module topics | Replace with your domain's conceptual structure |
| `CTX7_IDS` in prep script | Replace with your stack's Context7 library IDs |

### What Stays the Same (Do Not Modify)

| Element | Why |
|---------|-----|
| Progressive Game Lab Framework | Seven-Beat Loop is domain-agnostic learning science |
| Lab HTML structure | Design system, navigation, section gates, XP -- identical for all domains |
| Module markdown structure | Objectives -> sections -> edge cases -> summary -- universal |
| Parallel agent dispatch pattern | Tool-agnostic orchestration |
| Anti-confabulation process | 8 standard checks + technology-specific additions |
| Meta-layer documentation | BUILD-LOG, LESSONS-LEARNED, REPLICATION-GUIDE -- structural, reuse as-is |
| NotebookLM prompt exclusion clause pattern | Prevents content bleed in any multi-module course |

### Minimum Viable Checklist Before First Build

- [ ] Core mental model defined and named (PRAO equivalent)
- [ ] CONCEPT_REGISTRY fully populated (1-3 concepts per lab, all 9 labs)
- [ ] Content accuracy rules documented (technology-specific confabulation risks)
- [ ] Section specs written for all 9 labs (exact Q&A, per-option feedback)
- [ ] At least one reference lab exists (build Lab 01 sequentially first)
- [ ] Progressive Game Lab Framework spec exists at `docs/curriculum/progressive-game-lab-framework.md`
- [ ] Technology-specific validation checks added to anti-confabulation template

---

*Report generated by CC2-LEARN Agent from 25+ source files in the agentic-ai-course project.*
*Total patterns extracted: 47 (from PATTERN-ANALYSIS.md) + 28 NotebookLM prompt patterns + 8 validation checks + 5 component types + 3 team compositions = 91 actionable patterns.*
