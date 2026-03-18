# Module Creation Guide

Step-by-step guide for creating a new module (04-12) at the quality level of Module 02. An agent reading ONLY this file should be able to produce a module that meets the project standard.

---

## Prerequisites

Before creating any module content, you MUST read these files:

1. **[CODING-ELEMENTS-SPEC.md](CODING-ELEMENTS-SPEC.md)** -- HTML/CSS/JS component rules, all 22 component types, visual design rules, accessibility requirements
2. **[CONTENT-SPEC.md](CONTENT-SPEC.md)** -- Pedagogy, section structure, terminology, quiz standards, callout usage
3. **Example reference designs** -- Study the v2 HTML files in `examples/module-diagrams/` for visual quality targets:
   - `m02-claudemd-v2.html` -- entry lists, hierarchy, timeline
   - `m02-modes-v2.html` -- tabbed panels, scenario quiz
   - `disorientation-sim.html` -- terminal replay + multi-choice quiz
4. **Completed Module 02** -- `docs/curriculum/modules/02-claude-code-foundations.md` -- the output standard

---

## Step 1: Hero Section

Every module starts with a hero section. This is the first thing the student sees.

### Template

```html
<div class="ix-diagram" data-component="module-hero">
<div class="ix-hero">
<div class="ix-hero-bg"></div>
<div class="ix-hero-module-num">Module NN</div>
<div class="ix-hero-title">MODULE TITLE</div>
<div class="ix-hero-subtitle">One sentence describing the module scope and what students will accomplish</div>
<div class="ix-hero-chips">
<span class="ix-hero-chip">LEARNING GOAL 1</span>
<span class="ix-hero-chip">LEARNING GOAL 2</span>
<span class="ix-hero-chip">LEARNING GOAL 3</span>
<span class="ix-hero-chip">LEARNING GOAL 4</span>
</div>
</div>
</div>

# Module NN: MODULE TITLE
## Agentic AI Engineering -- 3-Day Intensive Course

---

## Overview

<div class="ix-diagram" data-component="objective">
  <p>Module-level objective: what students will be able to do after completing this module.</p>
</div>

Spiral learning connector: "You explored [concept] in Module N-1. Now [what this module adds]." One more sentence framing the module scope. For full context on [relevant topic], see the [official documentation](URL).

---
```

### Hero Section Rules

- Module number: `Module NN` (two digits)
- Title: concise, action-oriented
- Subtitle: one sentence describing scope
- Chips: 4-5 learning goals, each under 8 words
- No blank lines inside the hero div structure
- The hero replaces any old-style H1 + numbered objectives list

### After the Hero

Immediately after the hero and overview, the first interactive component should appear. Do not place more than 2-3 sentences of prose before the first interactive element.

---

## Step 2: Section Structure

For each section in the module, follow this exact order:

### 2A. Section Heading + Objective

```html
## N.X Section Title

<div class="ix-diagram" data-component="objective">
  <p>What the student will be able to do after this section. Use action verbs: configure, identify, distinguish, write, debug.</p>
</div>
```

### 2B. Brief Intro (1-2 sentences max)

```html
Brief framing sentence that connects this section to previous content or establishes context. No more than two sentences.
```

### 2C. Instruction Text + Interactive Component

```html
<p class="ix-instruct">Action instruction matching the component type below.</p>

<div class="ix-diagram" data-component="TYPE" data-diagram-id="unique-id">
  <!-- component content -->
</div>
```

### 2D. Additional Interactives (if needed)

Each additional interactive gets its own `ix-instruct`:

```html
<p class="ix-instruct">Action instruction for the next component.</p>

<div class="ix-diagram" data-component="TYPE" data-diagram-id="another-id">
  <!-- component content -->
</div>
```

### 2E. Collapsed Prose (if needed)

```html
<details class="ix-collapse">
<summary>Deep Dive: Topic details</summary>
<div class="ix-collapse-body">
<p>All remaining detailed text goes here. This can be multiple paragraphs.</p>
<p>Students who want more depth can expand this. Students who got the concept from the interactive can skip it.</p>
</div>
</details>
```

### Section Structure Checklist

- [ ] Objective is the FIRST element after `## heading`
- [ ] No more than 2 sentences before the first interactive
- [ ] Every interactive has an `ix-instruct` above it
- [ ] Any prose block longer than 3-4 lines is collapsed
- [ ] No predict-reveal comes AFTER the concept it tests

---

## Step 3: Component Selection

Use this decision matrix to choose the right component for each concept:

### Concept Type to Component Matrix

| Concept Type | Best Component | Why |
|---|---|---|
| **Comparison** (A vs B) | `tabbed-panel` | Side-by-side tabs let students switch and compare |
| **Categorization** (types/kinds) | `click-cards` | Cards with reveal panels for each category |
| **Process/Sequence** | `step-walkthrough` | Step-by-step with next/prev navigation |
| **Decision/Branching** | `decision-tree` | Interactive branching flow |
| **Live behavior demo** | `agent-trace` | Animated trace showing agent behavior |
| **Predict-then-learn** | `predict-reveal` | Student predicts, then reveals answer |
| **Knowledge check** | `quiz` | 4+ question multiple choice |
| **Scenario practice** | `scenario-quiz` | Terminal replay + decision quiz |
| **Quick categorization test** | `reveal-quiz` | Click items to reveal category/answer |
| **Central insight** | `callout` (core-idea) | Highlighted box for key concept |
| **Warning/gotcha** | `callout` (warning) | Amber-bordered warning box |
| **Include/exclude** lists | `entry-list` | Cards with green include / red exclude badges |
| **Hierarchy/levels** | `hierarchy` | Connected-dot vertical hierarchy |
| **Evolution/growth** | `timeline` | Stage-by-stage vertical timeline |
| **Intervene/hold** decision | `intervention` | Red/green badge decision cards |
| **Debug/troubleshoot** steps | `debug-steps` | Numbered debug step cards |
| **Scope/pattern** recognition | `pattern-grid` | Click-to-reveal scope grid |
| **Term definition** | `callout` (definition) | Purple-bordered definition box |

### When NOT to Use an Interactive

- Pure reference information (link to official docs instead)
- Content that would be better as a 1-sentence callout
- Content that duplicates an interactive already present in the section

---

## Step 4: Quiz Writing

### Template

```html
<p class="ix-instruct">Test your understanding of [topic].</p>

<div class="ix-diagram" data-component="quiz" data-diagram-id="mNN-section-check" data-xp="15">
  <span class="ix-title">Knowledge Check: [Topic]</span>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q1.</strong> Question text here. Keep to 1-2 sentences.</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">Option A text (under 15 words)</button>
      <button class="ix-quiz-option" data-correct="true">Option B text (the correct answer)</button>
      <button class="ix-quiz-option">Option C text</button>
      <button class="ix-quiz-option">Option D text</button>
    </div>
    <p class="ix-quiz-explanation">Explanation of why B is correct and why common wrong answers are wrong.</p>
  </div>
  <!-- Q2, Q3, Q4 follow the same pattern -->
</div>
```

### Quiz Standards

- **Minimum 4 questions** per quiz
- **At least 1 tricky question** per quiz (tests common misconception)
- Correct answer position should vary (not always the same slot)
- Questions test application/analysis, not recall
- All reference material needed to answer must be visible above the quiz (not collapsed)
- Each question has a clear explanation in `ix-quiz-explanation`
- Tricky question explanations must say WHY the obvious answer is wrong

### Tricky Question Guidelines

A good tricky question:
1. Presents a scenario that seems like one answer but is actually another
2. Tests understanding of boundaries, exceptions, or precedence rules
3. Has clear feedback explaining the misconception

Common tricky question patterns:
- "This SEEMS like X but is actually Y because..."
- "The obvious answer is A, but the correct answer is B because of [edge case]"
- "Students often confuse X with Y. The difference is..."

---

## Step 5: Agent Trace Writing

### When to Use Agent Traces

Use agent traces when:
- Demonstrating how the agent works through a real task
- Showing phase transitions in the Agentic Loop
- Comparing healthy vs. stuck agent behavior
- Teaching students to read tool call output

### Variant Selection

| Variant | Use When | Default Mode |
|---|---|---|
| `terminal` | Simple sequential demo, first exposure | Auto-play |
| `prao` | Teaching phase transitions with PRAO strip | Auto-play |
| `annotated` | Teaching trace reading with explanations | Manual |
| `compare` | Comparing two approaches side by side | Manual |

### Template (Terminal Variant)

```html
<p class="ix-instruct">Watch the trace replay to see how the agent handles this task.</p>

<div class="ix-diagram" data-component="agent-trace"
     data-variant="terminal"
     data-diagram-id="mNN-trace-name"
     data-speed="0.5">
  <span class="ix-title">Trace title describing the scenario</span>
  <div class="ix-trace-row" data-type="prompt" data-delay="0">
    <span class="ix-trace-content">> User prompt text here</span>
  </div>
  <div class="ix-trace-row" data-type="think" data-delay="3500">
    <span class="ix-trace-content">Agent reasoning text here</span>
  </div>
  <div class="ix-trace-row" data-type="tool" data-delay="1500">
    <span class="ix-trace-content">Read("src/auth.ts")</span>
  </div>
  <div class="ix-trace-row" data-type="result" data-delay="1500">
    <span class="ix-trace-content">-> 142 lines, exports: login(), logout(), validateToken()</span>
  </div>
  <div class="ix-trace-row" data-type="response" data-delay="2500">
    <span class="ix-trace-content">Agent response summarizing what it did</span>
  </div>
</div>
```

### Template (Annotated Variant -- Manual Mode)

```html
<p class="ix-instruct">Step through the trace and read each annotation to understand the agent's reasoning.</p>

<div class="ix-diagram" data-component="agent-trace"
     data-variant="annotated"
     data-diagram-id="mNN-annotated-trace"
     data-default-mode="manual"
     data-speed="0.5">
  <span class="ix-title">Trace title</span>
  <div class="ix-trace-row" data-type="prompt" data-delay="0">
    <span class="ix-trace-content">> User prompt</span>
    <span class="ix-trace-note">Annotation explaining this step</span>
  </div>
  <!-- more rows with annotations -->
</div>
```

### Timing Rules

- ALL traces must have `data-speed="0.5"`
- First line: `data-delay="0"` always
- Subsequent lines: follow the minimum delay table in CODING-ELEMENTS-SPEC.md
- Two-column traces (annotated, compare): add `data-default-mode="manual"`
- Update instruction text to match mode: "Step through..." (manual) vs "Watch..." (auto-play)

---

## Step 6: Callout Writing

### Template

```html
<div class="ix-diagram" data-component="callout" data-variant="VARIANT">
  <p><strong>Key point</strong>: Explanation text. Keep to 2-3 sentences. Use <code>inline code</code> for technical terms.</p>
</div>
```

### Variant Selection Guide

| Situation | Variant | Example Opening |
|---|---|---|
| Central insight of the section | `core-idea` | "Without MCP, Claude Code can only..." |
| Practical tip | `tip` | "Start with strict permissions and loosen..." |
| Common mistake | `warning` | "CLAUDE.md is committed to git. Never put..." |
| Concept to remember | `key-concept` | "The agent's context window resets with each..." |
| Safety/permission pattern | `approval` | "For high-stakes tasks, use the approval pattern..." |
| Technical term | `definition` | "MCP (Model Context Protocol): A standard for..." |
| How concepts combine | `merge-note` | "The litmus test: Could an agent use this entry..." |

### Callout Rules

- Maximum 2 callouts per section
- Never stack more than 2 consecutively
- Keep text to 2-3 sentences
- Use `<strong>` for the opening phrase
- Use `<code>` for file names, commands, tool names

---

## Step 7: Predict-Reveal Writing

### Template

```html
<p class="ix-instruct">Write your prediction, then reveal the reference reasoning.</p>

<div class="ix-diagram" data-component="predict-reveal" data-diagram-id="mNN-predict-topic" data-xp="8">
  <span class="ix-title">Predict Before You Learn</span>
  <p class="ix-predict-prompt">Before we explore [topic], think about this: [question that requires the student to reason about the concept WITHOUT having been told the answer]. Consider [concrete scenario 1] and [concrete scenario 2]. What would you expect?</p>
  <textarea class="ix-predict-input" placeholder="Write your reasoning -- what would you expect and why?"></textarea>
  <details class="ix-predict-reveal">
    <summary>Reveal reference reasoning</summary>
    <p>The reference answer. This should confirm or gently correct the student's prediction. Include the concept explanation here.</p>
  </details>
</div>
```

### Predict-Reveal Prompt Writing Guide

A good prediction prompt:
1. **Asks about behavior or outcome**, not definitions ("What happens when..." not "What is...")
2. **Provides a concrete scenario** for the student to reason about
3. **Does not give away the answer** in the question framing
4. **Is answerable through reasoning** even without prior knowledge

A bad prediction prompt:
1. Asks for a definition the student could not know
2. Uses jargon the student has not encountered
3. Is so open-ended that any answer seems valid
4. Is placed AFTER the explanation it tests

### Placement Rule

The predict-reveal MUST come BEFORE any explanation of the concept. No text between the section heading and the predict-reveal should give away the answer. If framing text is needed, move it to the reveal or collapse it.

---

## Step 8: Quality Checklist (Pre-Ship)

Run through this checklist before considering any module complete:

### Structure
- [ ] Hero section is the first element in the file
- [ ] Hero has module number, title, subtitle, and 4-5 chips
- [ ] Overview section uses spiral learning (references previous module, does not re-explain)
- [ ] Every section follows the mandatory order: objective, brief intro, instruct, interactive, collapsed prose
- [ ] Learning objectives appear FIRST in every section (before any prose)
- [ ] No section has more than 3-4 lines of prose before the first interactive
- [ ] All prose blocks >3-4 lines are collapsed in `<details class="ix-collapse">`

### Components
- [ ] Every interactive component has an `ix-instruct` paragraph above it
- [ ] Instruction text matches the component type (see patterns in CODING-ELEMENTS-SPEC.md)
- [ ] All `data-diagram-id` values are unique within the module
- [ ] All `data-component` values match registered types

### HTML Quality
- [ ] No blank lines inside nested HTML divs
- [ ] No markdown syntax inside HTML blocks
- [ ] No inline `style` attributes for colors
- [ ] No emojis anywhere -- Lucide icons only
- [ ] All `<div>` tags properly closed

### Quizzes
- [ ] Every quiz has minimum 4 questions
- [ ] Every quiz has at least 1 tricky question
- [ ] Correct answer positions vary across questions
- [ ] All reference material needed for quiz answers is visible (not collapsed)
- [ ] Each question has a clear explanation

### Agent Traces
- [ ] All traces have `data-speed="0.5"`
- [ ] Two-column traces (annotated, compare) have `data-default-mode="manual"`
- [ ] All `data-delay` values meet minimum timing standards
- [ ] Instruction text matches mode (auto-play vs manual wording)

### Pedagogy
- [ ] Predict-reveal elements come BEFORE explanations
- [ ] No text gives away predict-reveal answers
- [ ] Spiral learning: previous modules referenced, not re-explained
- [ ] Maximum 2 callouts per section
- [ ] No stacked callouts (more than 2 consecutive)

### Content Accuracy
- [ ] No `--thinking` flag (not a real CLI flag)
- [ ] No `--context` flag (does not exist)
- [ ] No `/memory` command (not native)
- [ ] SSE not mentioned for remote MCP (Streamable HTTP only)
- [ ] MCP primitives: exactly THREE (Tools, Resources, Prompts)
- [ ] `settings.json` format: `{"permissions": {"allow": [...], "deny": [...]}}`
- [ ] CLAUDE.md described as read at session start, not invoked as command

### Terminology
- [ ] "Agentic Loop" is the concept name, "PRAO" is the mnemonic
- [ ] Never "the PRAO Loop" -- always "the Agentic Loop (PRAO)" or "the Agentic Loop"
- [ ] "Agentic coding" not "AI-assisted development"
- [ ] First mention includes full expansion: "the mnemonic PRAO (Perceive, Reason, Act, Observe)"

---

## Reference

### Key Files

| File | Purpose |
|---|---|
| `CODING-ELEMENTS-SPEC.md` | Component types, HTML rules, visual design, accessibility |
| `CONTENT-SPEC.md` | Pedagogy, section structure, terminology, quiz standards |
| `examples/module-diagrams/*.html` | V2 reference designs (visual quality target) |
| `docs/curriculum/modules/02-claude-code-foundations.md` | Completed module (output standard) |
| `module-viewer.html` | The rendering engine (component registry, CSS, JS) |
| `docs/decisions.md` | Design decisions record with rationale |

### Component Count Targets

Based on Modules 01-03, a well-built module should have approximately:

| Component Type | Expected Count |
|---|---|
| `objective` | 1 per section (5-7 per module) |
| Interactive components (click-cards, tabbed-panel, etc.) | 1-3 per section |
| `callout` | 3-7 per module |
| `predict-reveal` | 1-3 per module |
| `quiz` | 2-3 per module (one mid-module, one end-module at minimum) |
| `agent-trace` | 1-3 per module (if topic involves agent behavior) |
| Collapsed `<details>` | 3-6 per module |
| **Total interactive elements** | **25-30 per module** |

### Module File Location

All module markdown files go in: `docs/curriculum/modules/NN-module-slug.md`

Where `NN` is the two-digit module number (04, 05, ... 12) and `module-slug` is a hyphenated short name.
