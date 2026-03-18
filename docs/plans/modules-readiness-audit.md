# Modules 01-03 Readiness Audit: Lab-Quality Interactive Standard

**Date**: 2026-03-16
**Auditor**: Tech Lead
**Standard**: Labs (lab-01, lab-04) and example diagrams (era-diagram, collaboration-model, disorientation-sim, claude-md-evolution) set the quality bar.

---

## What "Lab Quality" Means (The Bar)

The labs deliver learning through:

1. **Hero sections** with particle animations, gradient text, objective chips
2. **Progress bars** and **section dot navigation** (visible completion state)
3. **XP system** with toasts, streaks, milestone badges
4. **Progress-gated sections** (locked until prior section completed)
5. **Interactive quizzes** with per-question feedback, score rings, explanations
6. **Prediction-first pedagogy** ("predict before we reveal" textareas)
7. **Click-to-explore architecture diagrams** (click all boxes to unlock next section)
8. **Animated agent trace simulations** (lines appear sequentially with typed-out effect)
9. **Drag-and-drop / button-based matchers** (e.g., MCP primitive matcher in lab-04)
10. **Scenario-based simulations** (disorientation-sim: terminal replay + multiple-choice)
11. **Build challenges** with requirements, XP rewards, and model answers
12. **Reflection textareas** with guided prompts
13. **Completion banners** with congratulations and next-lab links
14. **Callback cards** ("Remember from Lab 01...") connecting concepts across labs
15. **Capability utilization bars** (animated percentage fills, as in collaboration-model)
16. **Timeline progression** (as in claude-md-evolution: stage-by-stage reveal)

The modules currently use a custom `ix-diagram` component system with these types: `tabbed-panel`, `agent-trace`, `click-cards`, `step-walkthrough`, `decision-tree`. These are good -- but they are a subset of the lab patterns, and they only appear where Mermaid diagrams used to be.

---

## Module 01: The Paradigm Shift (1,078 lines)

### A. Current Interactive Components (9 total)

| # | Line | Type | Diagram ID | Covers |
|---|------|------|------------|--------|
| 1 | 27 | tabbed-panel | three-eras | Three eras of AI engineering |
| 2 | 164 | agent-trace | (refactoring) | PRAO loop example trace |
| 3 | 216 | click-cards | prao-loop | PRAO loop phases |
| 4 | 355 | step-walkthrough | prao-worked-example | PRAO worked example |
| 5 | 434 | agent-trace | (context example) | Understanding context |
| 6 | 536 | click-cards | session-vs-persistent | Session vs persistent context |
| 7 | 665 | click-cards | failure-modes | Collaboration failure modes |
| 8 | 821 | agent-trace | (task suitability) | Task suitability trace |
| 9 | 911 | click-cards | task-suitability | Task suitability quadrant |

### B. Walls of Text Still Present

| Section | Lines | Problem | Recommended Interactive Format |
|---------|-------|---------|-------------------------------|
| **Overview** (L6-21) | 16 | Dense paragraph explaining module goals. Learning objectives are a numbered list. | **Objective chips** (like lab-01 hero) with checkmarks that activate as sections complete. Wrap in a hero-style intro card with gradient. |
| **1.1 intro prose** (L23-26) | 4 | Dry preamble before the tabbed panel. | Fold into the tabbed panel as its header text or remove. |
| **1.2 "What the PRAO loop captures"** (L212-215) | 3 + extended prose between the click-cards and the worked example (L340-354) | ~15 lines of pure exposition explaining why PRAO matters, repeated partly by the interactive. | Convert to a **collapsed insight card** or fold the text into the click-card detail panels. |
| **1.3 "What Claude Code Actually Is"** (L514-534) | 20 | Three consecutive paragraphs of expository prose ("The Technical Reality", "CLAUDE.md: The Persistent Briefing") with zero interactivity. | **Animated architecture diagram** (like lab-04's click-to-expand boxes) showing Claude Code's internal architecture: LLM + Tools + Session + CLAUDE.md. Each box clickable for detail. |
| **1.3 "Session Context vs. Persistent Context"** (L646-658) | 12 | Bullet lists repeating what the click-cards already show. | **DELETE** or collapse into a `<details>` summary. The ix-diagram already covers this. |
| **1.4 prose before failure-modes diagram** (L661-664) | 4 | Short but could be stronger. | Fine as-is, but add a **"predict first"** textarea: "Before seeing the failure modes, write down what you think the #1 mistake new users make with agentic AI." |
| **1.5 "Strong Fit / Weak Fit / Time-Risk"** (L881-910) | 30 | Three subsections of dense bullet-heavy prose before the click-cards. | **Comparison grid** (two-column like lab-01's Old World vs New World) with animated capability bars. Or a **tabbed panel** with "Strong Fit / Weak Fit / Edge Cases" tabs. |
| **Best Practices Summary** (L1015-1036) | 21 | Three Do/Don't lists in plain markdown. | **Collapsible accordion cards** with category labels (Prompt Design / Context Management / Verification). Each card has a green/red visual for do/don't. |
| **Key Concepts for Review** (L1039-1050) | 11 | Glossary in paragraph form. | **Flashcard carousel** or **hover-to-reveal** glossary cards. |
| **Lab Connection** (L1053-1056) | 3 | Plain paragraph. | **CTA card** with button linking to lab-01, styled like lab nav buttons. |

### C. Missing Interaction Types (Not Used in Module 01)

- **Interactive quiz** -- Labs have multi-question quizzes with per-question feedback, score rings, XP rewards. Module 01 has zero quizzes.
- **Prediction-first textareas** -- Lab-04 uses "predict before we reveal." Module 01 never asks the student to predict or reflect inline.
- **Progress-gated sections** -- Lab sections are locked until prior is completed. Module sections are all visible at once.
- **Scenario simulation** -- The disorientation-sim is a terminal replay + decision exercise. Module 01 has nothing like this despite covering "how the agent works."
- **Timeline/evolution visualization** -- claude-md-evolution shows progressive document growth. Nothing similar in Module 01.
- **Animated SVG with hover states** -- The era-diagram example has animated flow nodes, cost bars, pulse-dot animations. The module's tabbed-panel is static by comparison.
- **Capability utilization bars** -- collaboration-model uses animated percentage fills. Module 01's failure-modes cards don't show this.
- **Build challenge / hands-on exercise** -- Labs have structured build challenges with XP. Module 01 has no practice exercises.
- **Milestone checks** -- Only one `<details>` milestone card at L1008. Labs have XP toasts, streak rewards, milestone displays.

### D. Content That Should Be ADDED (New Interactive Elements)

1. **"Your First 60 Seconds" Terminal Simulation**: Animated terminal showing claude startup, first prompt, first tool call sequence. Like disorientation-sim but as an introduction, not a quiz.
2. **PRAO Phase Identifier Quiz**: Show 5-6 agent actions, student identifies which PRAO phase each belongs to. Button-based matcher like lab-04's primitive matcher.
3. **"Good Prompt vs Bad Prompt" Side-by-Side**: Interactive comparison where student clicks a prompt and sees the resulting agent behavior (trace snippet). Drives home the collaboration model.
4. **Capability Utilization Bars on Failure Modes**: The collaboration-model example has these -- "10% utilized" for autocomplete mindset, "95% utilized" for productive pattern. Should be in the module's failure-modes section.
5. **Section Progress Tracker**: At minimum, a visual progress indicator showing which of the 5 sections the student has read.

### E. Readiness Score: 4/10

Strong prose content. Good conceptual coverage. The 9 ix-diagram components are a solid start. But:
- Zero quizzes
- Zero prediction exercises
- Zero progress gating
- Zero terminal simulations
- Zero build challenges
- Multiple 15-30 line walls of prose with no visual relief
- No XP or gamification
- The module reads like a well-illustrated textbook chapter, not a lab

---

## Module 02: Claude Code Foundations (1,248 lines)

### A. Current Interactive Components (9 total)

| # | Line | Type | Diagram ID | Covers |
|---|------|------|------------|--------|
| 1 | 27 | click-cards | architecture-overview | Claude Code architecture |
| 2 | 212 | decision-tree | mode-decision | Interactive vs non-interactive |
| 3 | 293 | step-walkthrough | claudemd-hierarchy | CLAUDE.md hierarchy |
| 4 | 508 | agent-trace | m02-claudemd-action | How CLAUDE.md shapes decisions |
| 5 | 576 | decision-tree | permissions-flow | Permissions decision flow |
| 6 | 748 | agent-trace | (permissions example) | Permissions in action |
| 7 | 810 | tabbed-panel | mcp-transport | MCP transport types |
| 8 | 940 | agent-trace | (MCP example) | MCP tool call trace |
| 9 | 1012 | click-cards | agent-output-layers | Reading agent output |

### B. Walls of Text Still Present

| Section | Lines | Problem | Recommended Interactive Format |
|---------|-------|---------|-------------------------------|
| **Overview** (L6-20) | 14 | Dense paragraph. | Hero card with objective chips. |
| **2.1 Interactive Mode** (L174-184) | 10 | Bullet list of "ideal for" use cases, pure text. | **Scenario cards** -- 4 clickable cards showing real situations, each revealing "Use interactive because..." when clicked. |
| **2.1 Non-Interactive Mode** (L186-208) | 22 | Explanation + 2 code blocks. The code blocks are static markdown. | **Live code preview** -- show the command, then show an animated "output" panel that simulates what would happen. Or at minimum, **copy-to-clipboard code blocks** with syntax highlighting (like labs have). |
| **2.2 CLAUDE.md "What It Is"** (L285-288) | 4 | Preamble prose. | Fine, but pair with the claude-md-evolution timeline visualization from the example diagrams. This is the perfect place for it. |
| **2.2 "What Belongs" content blocks** (L395-468) | 73 | FOUR consecutive markdown code blocks (Architecture, Conventions, Key Files, Constraints, Decided) inside prose paragraphs. This is the densest wall of text in all three modules. | **Tabbed code editor** with 5 tabs (Architecture / Conventions / Key Files / Constraints / Decisions). Each tab shows the sample CLAUDE.md section with syntax highlighting. Bonus: let student toggle between "good" and "bad" versions. |
| **2.2 "What Does Not Belong"** (L474-496) | 22 | Three paragraphs of "don't do this." | **Red/green comparison cards** (3 cards showing bad example on left, good alternative on right). |
| **2.2 "Writing Good CLAUDE.md"** (L482-496) | 14 | More prose. | Merge with the red/green cards above. |
| **2.2 Spot-the-problems challenge** (L498-506) | 8 | A `<details>` tag with a static code block. | Convert to an **interactive challenge**: show the bad CLAUDE.md, student clicks on each problem line, feedback appears. Like lab-04's annotation explorer. |
| **2.3 Permissions** (L568-575) | 7 | Intro prose before decision tree. | Fine. |
| **2.3 Permissions JSON examples** (L620-740) | 120 | MASSIVE block. Multiple JSON code blocks with inline prose explaining each field. | **Schema explorer** (like lab-04's JSON schema explorer with clickable lines and annotation popups). This would be the single highest-impact interactive addition across all three modules. |
| **2.4 MCP intro** (L792-810) | 18 | Prose explaining MCP concept before tabbed panel. | Compress. Some of this duplicates Module 01 Section 1.3. |
| **2.4 MCP configuration** (L850-938) | 88 | Multiple JSON code blocks showing settings.json with MCP config. | **Side-by-side code editor**: left panel = settings.json, right panel = "what the agent sees" (tool list). Interactive: change a config value, see the effect. |
| **2.5 "Reading Claude Code Output"** (L1006-1012) | 6 | Brief intro. | This section heading appears but the content is mostly the agent-output-layers click-cards (which duplicate Module 03 Section 3.1). Consider consolidating. |
| **Best Practices Summary** (L1159-1193) | 34 | Four Do/Don't subsections in plain lists. | **Accordion cards** with visual do/don't indicators. |
| **Key Concepts for Review** (L1196-1209) | 13 | Paragraph glossary. | **Flashcard carousel** or **hover-to-reveal cards**. |

### C. Missing Interaction Types

- **Interactive quiz** -- Zero quizzes in Module 02. No knowledge checks at all.
- **CLAUDE.md builder exercise** -- The module teaches CLAUDE.md writing but never has the student practice. Add a **structured textarea exercise**: "Write the Architecture section for this project description: [scenario]." Compare with model answer.
- **Permissions configurator** -- Interactive widget where student toggles allow/deny rules and sees the resulting permissions state. Like a visual settings.json editor.
- **MCP connectivity test simulation** -- Terminal simulation showing `claude mcp list`, expected vs actual output.
- **Prediction-first textareas** -- Zero.
- **Progress-gated sections** -- Zero.
- **Timeline visualization** -- The claude-md-evolution example diagram is PERFECT for Section 2.2 but is not used.

### D. Content That Should Be ADDED

1. **CLAUDE.md Evolution Timeline**: Embed the claude-md-evolution example diagram (or its pattern) directly into Section 2.2. It shows how CLAUDE.md grows from 8 lines on Day 1 to 60+ lines by Week 4, with triggers for each addition.
2. **"Build a CLAUDE.md" Exercise**: Given a project description, student writes each section. Model answer shown after. XP reward.
3. **Permissions Sandbox**: Interactive JSON editor. Student configures allow/deny, then clicks "Test" to see whether specific agent actions are allowed or denied. Immediate feedback.
4. **MCP Server Catalog Browser**: Clickable cards showing 5-6 common MCP servers (postgres, filesystem, GitHub, Slack, etc.) with what they provide (tools/resources/prompts).
5. **"Spot the Security Risk" Challenge**: Show a settings.json with overly broad permissions. Student clicks the dangerous lines.

### E. Readiness Score: 3.5/10

Module 02 has the most content (1,248 lines) and the most prose walls. The 9 ix-diagrams are well-placed but the surrounding text is dense. The permissions section (L620-740) and CLAUDE.md code blocks (L395-468) are the worst offenders -- 190+ lines of JSON and markdown code blocks embedded in expository prose with no interactivity. The module teaches configuration but never lets the student configure anything. This is the module most in need of interactive work.

---

## Module 03: Agent Thinking (1,194 lines)

### A. Current Interactive Components (9 total)

| # | Line | Type | Diagram ID | Covers |
|---|------|------|------------|--------|
| 1 | 32 | click-cards | agent-output-layers | Three layers of agent output |
| 2 | 154 | agent-trace | (reading a trace) | Trace reading example |
| 3 | 219 | tabbed-panel | prao-state-machine | PRAO as state machine |
| 4 | 349 | click-cards | tool-call-patterns | Tool call pattern recognition |
| 5 | 522 | agent-trace | (pattern examples) | Tool call patterns in action |
| 6 | 702 | decision-tree | clarification-decision | Clarification question flow |
| 7 | 789 | tabbed-panel | thinking-depth | Extended thinking depth |
| 8 | 910 | agent-trace | (complete trace) | Complete trace example |
| 9 | 978 | step-walkthrough | bug-fix-trace | Bug fix trace walkthrough |

### B. Walls of Text Still Present

| Section | Lines | Problem | Recommended Interactive Format |
|---------|-------|---------|-------------------------------|
| **Overview** (L6-22) | 16 | Dense explanatory paragraph. | Hero card with objective chips. |
| **3.1 "The Transparency Advantage" intro** (L24-27) | 3 | Short but dry. | Fine, but pair with a visual showing the opacity spectrum: black box (autocomplete) -> translucent (assistant) -> transparent (agent). |
| **3.1 post-diagram prose** (L140-153) | 14 | Three paragraphs restating what the click-cards already cover. "The thinking layer is...", "The tool call layer is...", "The response layer is..." | **DELETE or collapse**. The click-cards already have this content in their detail panels. This is pure duplication. |
| **3.2 Chain-of-Thought intro** (L215-218) | 3 | Minimal. Fine. |
| **3.3 "Reading Tool Call Sequences" intro** (L343-348) | 5 | Intro prose. | Fine. |
| **3.3 Pattern descriptions** (L450-520) | 70 | Extended prose describing "scout pattern", "focused edit", "iterative debug", "comprehensive scan" with examples in paragraph form. | These should be **individual agent-trace simulations**, one per pattern. Student watches the terminal replay, then identifies the pattern. Like the disorientation-sim format. |
| **3.4 "Clarification Requests" full section** (L660-782) | 122 | The single densest prose block in Module 03. Five subsections of explanatory text with inline blockquotes. The decision-tree at L702 helps, but the surrounding text is overwhelming. | **Scenario-based simulation**: Show 3-4 agent clarification questions. Student categorizes each (Scope / Authority / Context) and decides whether to answer in-conversation or add to CLAUDE.md. Like a quiz but narrative-driven. |
| **3.4 "Answering Clarifying Questions"** (L690-698) | 8 | Three "be specific" guidelines in prose. | **Good/Bad answer comparison cards**: Show a clarifying question, then side-by-side "vague answer" vs "specific answer" with the resulting agent behavior difference. |
| **3.5 Extended Thinking intro** (L785-788) | 4 | Short. Fine. |
| **3.5 post-tabbed-panel prose** (L870-903) | 33 | Extended discussion of when to use extended thinking, with inline examples. | **Decision flowchart**: "Is this problem multi-constraint? -> Yes -> Use extended thinking. Is this a simple edit? -> Yes -> Standard thinking is fine." Or fold into the tabbed panel as additional tab content. |
| **"Putting It Together" section** (L904-1106) | 202 | By far the largest section in any module. Contains a full trace walkthrough with agent-trace and step-walkthrough components, but ALSO has ~80 lines of connecting prose. | **Trim connecting prose to 30 lines max**. The interactive components carry the content. The prose should be connective tissue, not a parallel essay. |
| **Best Practices Summary** (L1107-1141) | 34 | Four subsections of Do/Don't lists. | **Accordion cards**. |
| **Key Concepts for Review** (L1143-1156) | 13 | Paragraph glossary. | **Flashcard carousel**. |

### C. Missing Interaction Types

- **Interactive quiz** -- Zero quizzes. This module is about pattern RECOGNITION, which is perfect for quiz-based learning. Missing opportunity.
- **Pattern matcher exercise** -- Show 5 tool call sequences, student matches each to its pattern (scout / focused edit / iterative debug / loop). Button-based matcher like lab-04's primitive matcher.
- **"Should I Intervene?" Scenario Sim** -- Show an agent trace unfolding in real time. At key moments, ask the student: "Intervene now, or let the agent continue?" With feedback on their choice. This is the disorientation-sim pattern applied to Module 03's core teaching goal.
- **Trace annotation exercise** -- Show a raw trace. Student clicks on lines to label them (Perceive / Reason / Act / Observe). Score at end.
- **Terminal replay with pause points** -- For the "Putting It Together" trace, show it as a terminal replay (like the example diagrams) with pause points where the student answers a question before seeing the next step.

### D. Content That Should Be ADDED

1. **"Identify the PRAO Phase" Interactive Quiz**: 6-8 tool call lines, student labels each. Immediate feedback. This is the core skill Module 03 teaches.
2. **"Spot the Loop" Simulation**: Terminal replays showing a healthy agent sequence vs a stuck loop. Student identifies where the loop starts and what intervention to apply.
3. **Extended Thinking Before/After Comparison**: Side-by-side showing the same problem with standard vs extended thinking. Student sees the difference in reasoning depth and output quality.
4. **Intervention Decision Simulator**: Real-time trace playback. At 3-4 decision points, student chooses "intervene" or "let continue." Scores their accuracy. This is the module's capstone teaching tool.

### E. Readiness Score: 4.5/10

Module 03 is the closest to lab quality because its content is inherently about observation and pattern recognition, and the 9 ix-diagrams map well to that. The agent-trace components especially work here. But it still lacks any quiz, any simulation, any hands-on exercise. The clarification request section (122 lines of prose) and the "Putting It Together" section (202 lines) need significant interactive conversion. The module teaches trace reading but never asks the student to actually read and annotate a trace interactively.

---

## Top 5 Gaps Across All Three Modules

### 1. ZERO Interactive Quizzes / Knowledge Checks

**Impact: Critical**

All three modules combined have 27 ix-diagram components but exactly 0 quizzes, 0 knowledge checks, 0 scored assessments. The labs have multi-question quizzes with per-question feedback, score rings, and XP rewards in every section. This is the single largest gap between module quality and lab quality. Students can passively read through all three modules without ever being asked to demonstrate understanding.

**Fix**: Add 3-5 quiz questions per module, placed after each major concept. Use the lab quiz pattern (question card + answer options + feedback + XP).

### 2. No "Predict-Then-Reveal" Pedagogy

**Impact: High**

Lab-04 uses the "predict first" pattern: before revealing content, it asks the student to write their prediction in a textarea. This is a research-backed active learning technique (generation effect). None of the three modules use it. Every major concept introduction should have a prediction prompt.

**Fix**: Add predict-first textareas before the three-eras reveal (M01), before CLAUDE.md hierarchy reveal (M02), before tool-call patterns reveal (M03), and 2-3 more per module.

### 3. Massive Prose Walls in Configuration/Reference Sections

**Impact: High**

Module 02 Sections 2.2 and 2.3 contain 190+ lines of JSON code blocks and explanatory prose with no interactivity. Module 03 Section 3.4 has 122 lines of clarification question prose. These sections read like reference documentation, not courseware.

**Fix**: Convert JSON blocks to **schema explorers** (clickable lines with annotations, like lab-04). Convert prose explanations to **scenario cards** or **comparison grids**. Use the claude-md-evolution timeline pattern for Section 2.2.

### 4. No Terminal Simulations / Scenario Simulators

**Impact: High**

The example diagrams include a disorientation-sim (terminal replay + decision quiz) and the labs have animated architecture diagrams with progress gating. The modules have no terminal simulations, no scenario-based decision exercises, no animated sequences. For a course about using a CLI tool, this is a significant gap.

**Fix**: Add at least one terminal simulation per module. M01: "Your first 60 seconds with Claude Code." M02: "Configuring and testing an MCP connection." M03: "Watch this trace -- when should you intervene?"

### 5. No Progress/Gamification System

**Impact: Medium-High**

Labs have XP points, streak bonuses, milestone toasts, progress-gated sections, and completion banners. Modules have none of this. The module viewer may provide some outer wrapper, but the content itself has no internal sense of progress.

**Fix**: Add section progress indicators (completion dots/checkmarks), milestone checks between sections (not just the single `<details>` tag in M01), and a completion card at the end of each module. Consider lightweight XP if the module viewer supports it.

---

## Summary Scores

| Module | Score | Interactive Components | Prose Walls | Quizzes | Simulations |
|--------|-------|----------------------|-------------|---------|-------------|
| 01 - Paradigm Shift | **4/10** | 9 ix-diagrams | 6 significant | 0 | 0 |
| 02 - Claude Code Foundations | **3.5/10** | 9 ix-diagrams | 10 significant | 0 | 0 |
| 03 - Agent Thinking | **4.5/10** | 9 ix-diagrams | 8 significant | 0 | 0 |

**Average: 4/10** -- The modules are well-written expository content with a solid foundation of ix-diagram components. They are not yet at lab quality. The gap is not in the concepts covered or the writing quality -- it is in the interaction density, the absence of assessment, and the passive reading experience of the prose-heavy sections.

---

## Prioritized Action Items

1. **Add quizzes** (3-5 per module) -- highest impact, most missing
2. **Convert M02 L395-740 to interactive components** (schema explorer + tabbed code editor) -- worst prose wall
3. **Add terminal simulations** (1 per module minimum) -- leverages existing example patterns
4. **Add predict-first textareas** (2-3 per module) -- low effort, high pedagogical impact
5. **Convert M03 L660-782 clarification section to scenario simulation** -- second-worst prose wall
6. **Embed claude-md-evolution timeline into M02 Section 2.2** -- ready-made, just needs embedding
7. **Add Best Practices accordions + glossary flashcards** to all three modules' end sections
8. **Add section progress indicators** -- even simple dot navigation like labs
9. **Delete/collapse duplicate prose** where ix-diagrams already cover the content (M01 L646-658, M03 L140-153)
10. **Add capability utilization bars** to M01 failure-modes section (pattern exists in collaboration-model example)
