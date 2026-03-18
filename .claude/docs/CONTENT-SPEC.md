# Course Content Specification

Rules for structuring course content, pedagogy, terminology, and quizzes. Every agent writing or editing module content MUST follow these rules.

---

## Section Structure (Mandatory Order)

Every section within a module MUST follow this sequence:

1. **Learning Objective** (`ix-objective`) -- FIRST, before any prose
2. **Brief intro** -- 1-2 sentences max, framing the section
3. **Instruction text** (`ix-instruct`) -- tells the student what to interact with
4. **Interactive component** -- the primary learning element
5. **Additional interactives** -- if the section needs more (each with its own `ix-instruct`)
6. **Remaining detailed text** -- COLLAPSED inside `<details class="ix-collapse">`

The interactive component is the centerpiece. Text supports it, not the other way around.

### HTML Template

```html
## 2.1 Section Title

<div class="ix-diagram" data-component="objective">
  <p>One-sentence learning objective describing what the student will be able to do.</p>
</div>

Brief framing sentence connecting this section to what came before. One more sentence if needed.

<p class="ix-instruct">Click each card to explore the concept.</p>

<div class="ix-diagram" data-component="click-cards" data-diagram-id="unique-id">
  <!-- interactive component content -->
</div>

<details class="ix-collapse">
<summary>Deep Dive: Additional context and details</summary>
<div class="ix-collapse-body">
<p>All remaining detailed prose goes here, hidden by default.</p>
</div>
</details>
```

### What Goes Wrong When Structure Is Violated

- **Objective missing or buried**: Students scroll through prose without knowing why. They cannot self-assess progress.
- **Interactive after prose wall**: Students glaze over the text and may never reach the interactive. The interactive becomes decoration instead of the learning vehicle.
- **No instruction text**: Students see the component but do not know what to do. They click randomly or skip it.
- **Prose not collapsed**: Sections feel overwhelming. Students scroll past instead of engaging.

---

## Module Intro Pattern

Every module should open with:

1. **Hero section** (`module-hero`) -- gradient title, floating dots, objective chips
2. **Brief framing** -- 1-2 sentences connecting to the previous module using spiral learning
3. **First interactive element** -- get the student doing something immediately

### Hero Section Content Template

```html
<div class="ix-diagram" data-component="module-hero">
<div class="ix-hero">
<div class="ix-hero-bg"></div>
<div class="ix-hero-module-num">Module NN</div>
<div class="ix-hero-title">Module Title</div>
<div class="ix-hero-subtitle">One sentence describing the module scope</div>
<div class="ix-hero-chips">
<span class="ix-hero-chip">Learning Goal 1</span>
<span class="ix-hero-chip">Learning Goal 2</span>
<span class="ix-hero-chip">Learning Goal 3</span>
<span class="ix-hero-chip">Learning Goal 4</span>
</div>
</div>
</div>
```

### What NOT to Do in Module Intros

- Do NOT jump straight into heavy technical definitions
- Do NOT re-explain concepts from previous modules (reference and build on them)
- Do NOT start with a wall of text
- Do NOT list learning objectives as plain markdown numbered lists -- use hero chips or `ix-objective` components
- Do NOT include architecture deep dives in the overview -- link to official docs instead

---

## Pedagogical Principles

### Predict-Before-Explain (CRITICAL)

Always ask students to predict or reflect BEFORE revealing a concept. The predict-reveal element MUST come BEFORE the explanation, never after.

```
CORRECT ORDER:
1. "What do you think happens when...?" (predict-reveal component)
2. Explanation of what actually happens

WRONG ORDER:
1. "Here's how X works..." (explanation)
2. "Now, can you predict...?" (too late -- they already know)
```

#### What Goes Wrong When Violated

The M02 modes lesson demonstrated this problem. The original version had a one-sentence intro ("Claude Code has two invocation modes that differ in context accumulation, human interaction, and system integration") BEFORE the predict-reveal component. This sentence gave away the key concepts, defeating the prediction exercise.

**Fix applied**: The framing sentence was moved INTO the Deep Dive details block so the predict-reveal is truly a cold prediction. The student sees only the objective + predict-reveal before any mode explanation.

**Rule**: If any text between the section heading and the predict-reveal component gives away the answer, move that text to AFTER the reveal or collapse it.

### Spiral Learning

Do NOT repeat Module N content in Module N+1. Instead:
- Briefly reference the prior module: "You explored X in Module N."
- Build on it: "Now let's see how X enables Y."
- Never re-explain a concept that was the focus of a previous module

#### Spiral Learning Phrases

Use these patterns to connect modules:

- "You explored [concept] in Module N. Now let's see how..."
- "Building on the [concept] from Module N, we'll now..."
- "In Module N you learned [concept]. Here, we go deeper into..."
- "Module N introduced [concept]. This module gives you the practical tools..."

#### Spiral Learning Examples

**Good** (M02 opening):
> "You explored the agentic coding paradigm in Module 01. Now let's look under the hood at the tool that makes it possible."

**Bad** (M02 opening, before fix):
> "Claude Code is an agentic AI coding tool that uses the Perceive-Reason-Act-Observe loop..." (re-explains M01 concepts)

### Generation Effect

Active engagement (writing, clicking, choosing, predicting) produces better retention than passive reading. Prioritize:
1. Interactive components (best)
2. Short targeted prose (acceptable)
3. Long explanatory paragraphs (collapse these)

### Progressive Disclosure

- Show the essential first
- Hide the detailed in `<details class="ix-collapse">`
- If more than 3-4 lines of prose would appear consecutively, collapse it or convert to an interactive element

### Content Density Rule

**If more than 3-4 lines of prose would appear consecutively** between interactive elements, you must either:
1. Collapse the prose into `<details class="ix-collapse">`
2. Convert the prose into an interactive element (callout, click-cards, tabbed-panel)
3. Cut the prose to 1-2 sentences

This rule applies everywhere except inside `ix-collapse` bodies, where longer prose is expected.

### Interactivity Over Text

If a concept CAN be taught with an interactive element, use the interactive element instead of prose. Prose supports and contextualizes interactives -- it does not replace them.

### Progressive Trust Teaching Pattern

When teaching the permission/approval system, follow this progression:

1. **Introduce the concept**: The agent asks permission for actions not in the allow list
2. **Show the three options**: Allow Once, Allow for Session, Write a Rule
3. **Explain the trust gradient**: From one-time permission to permanent rule
4. **Interactive exercise**: Students categorize actions as allow/deny/ask

This pattern models how real trust builds between a human and an agentic system.

---

## Naming and Terminology

### Core Terms

| Term | Usage | Notes |
|------|-------|-------|
| Agentic Loop | Primary concept name | The main loop concept |
| PRAO | Mnemonic only | Perceive, Reason, Act, Observe |
| Agentic coding | Preferred term | Not "AI-assisted development" |

### PRAO Usage Rules

- In running prose: "the Agentic Loop (PRAO)" -- PRAO is always parenthetical
- On phase badges, cards, interactive labels: use PRAO letters (P, R, A, O) as the mnemonic aid
- Never write "the PRAO Loop" as if PRAO is the concept name -- it is the mnemonic
- First mention in a module: "We use the mnemonic **PRAO** (Perceive, Reason, Act, Observe) to remember the four phases of the **Agentic Loop**."
- Subsequent mentions: "the Agentic Loop" or "the Agentic Loop (PRAO)" depending on context
- In section headings: use "Agentic Loop" not "PRAO Loop"
- Keep P/R/A/O letters on cycle diagrams, flow nodes, and trace phase annotations -- those are the mnemonic in action

---

## Quiz Standards

### Minimum Requirements

- **Minimum 4 questions** per knowledge check
- **At least 1 tricky question** per quiz that tests a common misconception
- Questions test understanding (application/analysis), not just recall
- All reference material needed to answer quiz questions MUST be visible and accessible -- never collapse required context inside `<details>` above a quiz

### Self-Contained Rule (Permissions Quiz Lesson)

The permissions quiz in M02 demonstrated this problem: students needed to reference the permissions configuration shown above the quiz, but that content was collapsed inside a `<details>` block. Students had to scroll up, expand the collapsed section, read the configuration, scroll back down, and answer the question.

**Rule**: Any quiz or exercise that requires reference material must have that material:
1. Visible (not collapsed) directly above the quiz, OR
2. Reproduced within the quiz component itself, OR
3. Presented as a tabbed-panel alongside the quiz

### Question Quality

| Aspect | Rule |
|--------|------|
| Question text | Concise: 1-2 sentences max |
| Option text | Short: under 15 words per option |
| Tricky questions | Must include brief explanation in feedback |
| Answer distribution | Correct answers should vary position (not always "A") |

### What Makes a Good Tricky Question

A tricky question tests a common misconception or edge case. It should:
- Present a scenario that SEEMS like one answer but is actually another
- Test understanding of boundaries or exceptions
- Include clear feedback explaining WHY the obvious answer is wrong

**Good tricky question** (permissions):
> "A settings.json has `allow: ['Read(src/**)']` and `deny: ['Read(src/secrets/*)']`. An agent tries to `Read(src/secrets/api-keys.ts)`. What happens?"
> - A) Allowed (matches allow rule) -- **wrong, explain deny takes precedence**
> - B) Blocked (deny rule overrides) -- **correct**
> - C) Agent asks for permission -- wrong
> - D) Error thrown -- wrong

**Good tricky question** (modes):
> "You need to debug a production incident at 2am. You know the exact error and the file. Which mode?"
> - A) Interactive -- correct (even though the task seems well-defined, debugging requires iterative discovery)
> - B) Non-interactive -- **seems right but wrong; explain that debugging is inherently exploratory**

### What Makes a Good Question

**Good** (tests understanding):
> "A Claude Code agent calls `Read()` on a file that doesn't exist. What happens next in the Agentic Loop?"

**Bad** (tests recall):
> "What are the four phases of the Agentic Loop?"

---

## Animation and Trace Speed Guidelines

### Auto-Play vs Manual Decision

| Use auto-play when: | Use manual (click-through) when: |
|---|---|
| Single-column trace (terminal or prao variant) | Two-column trace (compare or annotated variant) |
| Learning goal is watching flow unfold (demonstration) | Learning goal is comprehension, not demonstration |
| Short trace (6 lines or fewer, borderline up to 16) | Annotations contain substantive learning content |
| Visually dramatic (errors, recoveries, phase transitions) | Students need to study contrasts carefully |

### Two-Column Reading Prohibition

**Rule**: Any trace with parallel reading requirements MUST default to click-through (manual step) mode, not auto-play.

**Definition of "parallel reading"**:
- `compare` variant: Two trace columns that animate simultaneously
- `annotated` variant: Trace column + annotation panel where annotations contain substantive learning content

Students CANNOT read two columns at animation speed. This was validated with 5 of 9 traces in Modules 01-03.

**Exception**: If a future annotated trace has only decorative/brief annotations (fewer than 3 words per annotation), auto-play may be acceptable. Currently no such traces exist.

### Speed Defaults

- Default speed: `0.5x` (not `1x`)
- Speed options: `0.5x`, `1x`, `2x` (no `3x` -- never useful for learning)
- Active button on load: `0.5x`

---

## Callout Usage Guidelines

### When to Use Each Variant

| Variant | Use When | Example |
|---|---|---|
| `core-idea` | Presenting the central concept of a section | "Without MCP, Claude Code can only read files and run bash. With MCP, it can query databases, create issues, fetch pages." |
| `tip` | Offering practical advice or best practice | "Start with strict permissions and loosen as you build trust with the agent." |
| `warning` | Highlighting a common mistake or gotcha | "CLAUDE.md is committed to git. Never put secrets or API keys in it." |
| `key-concept` | Marking an important concept for review | "The agent's context window resets with each new session. Persistent knowledge lives in CLAUDE.md." |
| `approval` | Describing permission/approval patterns | "For high-stakes tasks, use the approval pattern: allow the agent to propose changes, then review before applying." |
| `definition` | Defining a technical term | "MCP (Model Context Protocol): A standard for connecting AI agents to external tools and data sources." |
| `merge-note` | Explaining how concepts combine or merge | "The litmus test: Could an agent use this entry to make a concrete, binary decision?" |

### Callout Frequency

- Maximum 2 callouts per section before they lose impact
- Never stack more than 2 callouts consecutively -- separate with other content
- Use callouts for emphasis, not as a substitute for interactive components

---

## Dangerous Mode Warnings Template

When a section discusses potentially destructive agent behavior (e.g., `Bash(rm -rf)`, force push, dropping databases), use this pattern:

```html
<div class="ix-diagram" data-component="callout" data-variant="warning">
  <p><strong>Dangerous operation</strong>: [Description of what could go wrong]. The agent will ask for permission before executing this command unless your <code>settings.json</code> explicitly allows it. Never add broad bash permissions like <code>Bash(*)</code> to your allow list.</p>
</div>
```

Always follow a dangerous-mode warning with the three approval options (Allow Once / Allow Session / Write Rule) to show students how the safety net works.

---

## Content Accuracy (Zero Tolerance)

These are WRONG and must NEVER appear in any content:

| Incorrect | Why |
|-----------|-----|
| `--thinking` flag | Not a real Claude Code CLI flag |
| `--context` flag | Does not exist |
| `/memory` command | Not native Claude Code |
| SSE for remote MCP | Deprecated 2025-03-26; Streamable HTTP only |
| Four+ MCP primitives | Exactly THREE: Tools, Resources, Prompts |
| `settings.json` with other formats | Must be `{"permissions": {"allow": [...], "deny": [...]}}` |
| CLAUDE.md as a slash command | Read at session start, never invoked |
| `triggers` as native feature | LUXOR convention, not native Claude Code |

When referencing tools, APIs, or CLI flags, verify against official documentation. If uncertain, link to official docs rather than guessing.

---

## Visual Presentation Rules

### Instruction Text

An `<p class="ix-instruct">` MUST appear before every interactive component. It tells the student what action to take:
- "Click each card to reveal the concept."
- "Step through the trace to see the agent's reasoning."
- "Select your prediction before revealing the answer."

### Text Density

- **No walls of text** -- if more than 3-4 consecutive lines, collapse or convert to interactive
- Use inline code formatting for file names, commands, and tool names in prose (but do not overuse)
- Colors communicate information (green=success, red=error, amber=warning) not just decorate

### Dark Mode First

- Dark mode is the primary viewing experience
- Design, author, and test all components in dark mode first
- Light mode is a secondary theme applied via `[data-theme="light"]` overrides

### Reference Material

Link to official documentation for reference material rather than reproducing it in the course. The course teaches concepts and builds skills -- it does not serve as a reference manual.

---

## What NOT to Do

This is a quick-reference checklist of anti-patterns. Every item here has caused problems before.

- [ ] Do NOT introduce concepts before asking students to predict/reflect
- [ ] Do NOT repeat content from previous modules -- reference and build on it
- [ ] Do NOT use emojis for any visual cues (Lucide icons only)
- [ ] Do NOT use inline style colors in HTML components
- [ ] Do NOT leave blank lines inside nested HTML divs (breaks `marked.js`)
- [ ] Do NOT make quizzes with fewer than 4 questions
- [ ] Do NOT write long prose paragraphs when an interactive element would work better
- [ ] Do NOT start a module with heavy technical definitions -- frame and connect first
- [ ] Do NOT place predict-reveal elements AFTER the explanation
- [ ] Do NOT use "PRAO Loop" as the concept name -- it is "Agentic Loop (PRAO)"
- [ ] Do NOT reproduce reference material -- link to official docs instead
- [ ] Do NOT collapse reference material that quizzes depend on
- [ ] Do NOT stack more than 2 callouts consecutively
- [ ] Do NOT use auto-play on two-column traces (annotated, compare)
- [ ] Do NOT set trace speed faster than 0.5x default
- [ ] Do NOT write framing text that gives away predict-reveal answers
- [ ] Do NOT list learning objectives as plain markdown lists -- use hero chips or `ix-objective`
- [ ] Do NOT include architecture deep dives in the overview section
