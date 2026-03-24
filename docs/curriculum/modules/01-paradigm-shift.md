<div class="ix-diagram" data-component="module-hero">
<div class="ix-hero">
<div class="ix-hero-bg"></div>
<div class="ix-hero-module-num">Module 01</div>
<div class="ix-hero-title">The Agentic Coding Paradigm</div>
<div class="ix-hero-subtitle">Master the mental models, collaboration patterns, and decision frameworks for working with AI coding agents effectively</div>
<div class="ix-hero-chips">
<span class="ix-hero-chip">Three Eras of AI Coding</span>
<span class="ix-hero-chip">The Agentic Loop (PRAO)</span>
<span class="ix-hero-chip">Collaboration Patterns</span>
<span class="ix-hero-chip">Task Suitability</span>
<span class="ix-hero-chip">Agentic Coding Tools</span>
</div>
</div>
</div>

# Module 01: The Paradigm Shift
## Agentic AI Engineering — 3-Day Intensive Course

---

## Overview

<div class="ix-diagram" data-component="objective">
  <p>Understand why agentic coding represents a fundamental shift from previous AI-assisted development paradigms and identify the characteristics that define each era.</p>
</div>

<p class="ix-instruct">Write your prediction before reading further.</p>

<div class="ix-diagram" data-component="predict-reveal" data-diagram-id="m01-overview-predict" data-xp="6">
  <span class="ix-title">Predict Before You Learn</span>
  <p class="ix-predict-prompt">You have probably used AI tools like Copilot or ChatGPT. What do you think changes when the AI can read your files, run your tests, and edit your code directly -- without you copy-pasting anything? What new risks does that introduce?</p>
  <textarea class="ix-predict-input" aria-label="Your prediction" placeholder="Write 2-3 sentences about what you think changes and what new risks emerge."></textarea>
  <details class="ix-predict-reveal">
    <summary>Reveal reference framing</summary>
    <p>The key shift: the AI moves from producing text you act on to taking actions you verify. This creates a closed feedback loop (the agent acts, observes results, adapts) that is far more powerful -- but also means the agent can modify files, run commands, and make mistakes at scale. Your role shifts from executor to director and reviewer.</p>
  </details>
</div>

<details class="ix-collapse">
<summary>Module overview and learning objectives</summary>
<div class="ix-collapse-body">
This module establishes the conceptual foundation for everything that follows in the course. Before writing a single line of configuration or issuing a single agent command, engineers need to internalize a fundamental shift in how they think about AI collaboration. The shift is not cosmetic. It is not a matter of getting familiar with a new interface. It is a change in the relationship between a human engineer and a software system -- from author and autocomplete to director and agent.

The goal of this module is to give you a clear, accurate mental model of what agentic AI actually does, how it reasons, and what your role is in the collaboration. Engineers who skip this step tend to either under-use the tool (treating it like a smarter autocomplete) or over-trust it (handing off work without verification). Neither produces good outcomes.

**Learning Objectives:**

By the end of this module, you will be able to:

1. Distinguish agentic AI from autocomplete and assistant AI paradigms, and explain why the distinction matters operationally
2. Articulate the Agentic Loop -- Perceive, Reason, Act, Observe (PRAO) -- with concrete examples drawn from real engineering tasks
3. Identify the mental model shift required to collaborate productively with Claude Code
4. Recognize which task categories are well-suited to agentic AI and which are not
</div>
</details>

---

## 1.1 From Autocomplete to Agency: Three Eras of AI-Assisted Engineering

<div class="ix-diagram" data-component="objective">
<p>Distinguish agentic AI from autocomplete and assistant paradigms. Identify which era a given workflow belongs to and explain why the distinction matters for how you work.</p>
</div>

<p class="ix-instruct">Write your prediction, then reveal the reference pattern to compare.</p>

<div class="ix-diagram" data-component="predict-reveal" data-diagram-id="m01-era-predict" data-xp="8">
  <span class="ix-title">Predict Before Reveal</span>
  <p class="ix-predict-prompt">Before opening the era panels, predict where your current team workflow sits today and one behavior you would change this week to move up one level.</p>
  <textarea class="ix-predict-input" aria-label="Your prediction" placeholder="Write a short prediction (2-4 sentences)."></textarea>
  <details class="ix-predict-reveal">
    <summary>Reveal reference pattern</summary>
    <p>Many teams are mixed: assistant-style planning with autocomplete-style execution. The fastest shift toward agentic work is to define outcome + constraints up front, then review diffs/tests at checkpoints instead of micro-directing each edit.</p>
  </details>
</div>

<p class="ix-instruct">Select each tab to compare the three eras of AI-assisted engineering.</p>

<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="three-eras">
  <span class="ix-title">Three eras of AI-assisted engineering</span>

  <div class="ix-tab" data-tab="Era 1: Autocomplete" data-accent="#6366f1">
    <div class="ix-flow-visual">
      <div class="ix-flow-node" data-phase="perceive">
 <i data-lucide="keyboard"></i> You type
      </div>
      <i data-lucide="arrow-right" class="ix-flow-arrow"></i>
      <div class="ix-flow-node" data-phase="reason">
 <i data-lucide="sparkles"></i> AI suggests
      </div>
      <i data-lucide="arrow-right" class="ix-flow-arrow"></i>
      <div class="ix-flow-node" data-phase="observe">
 <i data-lucide="check-circle"></i> You decide
      </div>
    </div>
    <div class="ix-char-grid">
      <div class="ix-char-item"><strong>Scope</strong><span>Single line / block</span></div>
      <div class="ix-char-item"><strong>Memory</strong><span>None between suggestions</span></div>
      <div class="ix-char-item"><strong>Agency</strong><span>Zero -- pure prediction</span></div>
      <div class="ix-char-item"><strong>Feedback loop</strong><span>None beyond accept/reject</span></div>
    </div>
    <div class="ix-cap-section">
      <div class="ix-cap-label">Cost of error</div>
      <div class="ix-cap-track"><div class="ix-cap-fill" data-width="20%" data-phase="success"></div></div>
      <div class="ix-cap-val" data-phase="success">Low -- you discard and retype</div>
    </div>
    <div class="ix-example-box" data-phase="perceive">
      You write <code>function parseUser(</code> -- Copilot suggests the body -- you accept or tab past it. No awareness of your project's auth patterns or test expectations.
    </div>
  </div>

  <div class="ix-tab" data-tab="Era 2: Assistant" data-accent="#8b5cf6">
    <div class="ix-flow-visual">
      <div class="ix-flow-node" data-phase="perceive">
 <i data-lucide="keyboard"></i> You prompt
      </div>
      <i data-lucide="arrow-right" class="ix-flow-arrow"></i>
      <div class="ix-flow-node" data-phase="reason">
 <i data-lucide="sparkles"></i> AI responds
      </div>
      <i data-lucide="arrow-right" class="ix-flow-arrow"></i>
      <div class="ix-flow-node" data-phase="observe">
 <i data-lucide="check-circle"></i> You act
      </div>
    </div>
    <div class="ix-char-grid">
      <div class="ix-char-item"><strong>Scope</strong><span>Full conversation context</span></div>
      <div class="ix-char-item"><strong>Memory</strong><span>Within session only</span></div>
      <div class="ix-char-item"><strong>Agency</strong><span>None -- produces text, not actions</span></div>
      <div class="ix-char-item"><strong>Feedback loop</strong><span>Multi-turn, but you run everything</span></div>
    </div>
    <div class="ix-cap-section">
      <div class="ix-cap-label">Cost of error</div>
      <div class="ix-cap-track"><div class="ix-cap-fill" data-width="50%" data-phase="goal"></div></div>
      <div class="ix-cap-val" data-phase="goal">Medium -- you waste time reading bad output</div>
    </div>
    <div class="ix-example-box" data-phase="reason">
      You describe a bug -- ChatGPT suggests a fix as a code block -- you copy it, paste into your editor, run it yourself, report back. <code>You are the agent.</code>
    </div>
  </div>

  <div class="ix-tab" data-tab="Era 3: Agent" data-accent="#06b6d4">
    <div class="ix-flow-visual">
      <div class="ix-flow-node" data-phase="perceive">
 <i data-lucide="keyboard"></i> You brief
      </div>
      <i data-lucide="arrow-right" class="ix-flow-arrow"></i>
      <div class="ix-flow-node" data-phase="reason">
 <i data-lucide="sparkles"></i> Agent works
      </div>
      <i data-lucide="arrow-right" class="ix-flow-arrow"></i>
      <div class="ix-flow-node" data-phase="act">
 <i data-lucide="search"></i> Observes
      </div>
      <span class="ix-flow-feedback" data-phase="act">
 <i data-lucide="refresh-cw"></i> loops
      </span>
      <i data-lucide="arrow-right" class="ix-flow-arrow"></i>
      <div class="ix-flow-node" data-phase="observe">
 <i data-lucide="check-circle"></i> You verify
      </div>
    </div>
    <div class="ix-char-grid">
      <div class="ix-char-item"><strong>Scope</strong><span>Full codebase + tools</span></div>
      <div class="ix-char-item"><strong>Memory</strong><span>Session + CLAUDE.md persistence</span></div>
      <div class="ix-char-item"><strong>Agency</strong><span>Reads, writes, executes, adapts</span></div>
      <div class="ix-char-item"><strong>Feedback loop</strong><span>Closed loop -- acts and observes</span></div>
    </div>
    <div class="ix-cap-section">
      <div class="ix-cap-label">Cost of error</div>
      <div class="ix-cap-track"><div class="ix-cap-fill" data-width="80%" data-phase="error"></div></div>
      <div class="ix-cap-val" data-phase="error">Higher -- agent modifies files and runs commands</div>
    </div>
    <div class="ix-example-box" data-phase="act">
      You say <code>"refactor auth to JWT, keep tests passing"</code> -- Claude Code reads files, plans, writes code, runs tests, sees failures, fixes them, iterates. You review the diff.
    </div>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="core-idea">
<p><strong>The defining shift</strong> is the feedback loop. In Era 1, AI predicts tokens. In Era 2, AI produces text you act on. In Era 3, the AI <strong>acts, observes results, and adapts</strong> -- a closed loop between action and observation that defines agency.</p>
</div>

<p class="ix-instruct">Test your understanding -- identify the correct era for each scenario.</p>

<div class="ix-diagram" data-component="quiz" data-diagram-id="m01-eras-check" data-xp="16">
  <span class="ix-title">Knowledge Check: Era Identification</span>

  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q1.</strong> You ask for a bug fix, then manually copy code from chat, paste it, run tests, and report results back. Which era is this?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">Era 1: Autocomplete</button>
      <button class="ix-quiz-option" data-correct="true">Era 2: Assistant</button>
      <button class="ix-quiz-option" data-correct="false">Era 3: Agent</button>
      <button class="ix-quiz-option" data-correct="false">Hybrid by default means Era 3</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: Era 2. The model produces text, but you execute every action.</p>
  </div>

  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q2.</strong> The tool reads files, writes edits, runs tests, and adapts based on failures before summarizing outcomes. Which era is this?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">Era 1: Autocomplete</button>
      <button class="ix-quiz-option" data-correct="false">Era 2: Assistant</button>
      <button class="ix-quiz-option" data-correct="true">Era 3: Agent</button>
      <button class="ix-quiz-option" data-correct="false">None, because this is just scripting</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: Era 3. Closed action-observation loops are the defining signal of agency.</p>
  </div>

  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q3.</strong> You type a function signature and get a next-line suggestion with no persistent task memory. Which era is this?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="true">Era 1: Autocomplete</button>
      <button class="ix-quiz-option" data-correct="false">Era 2: Assistant</button>
      <button class="ix-quiz-option" data-correct="false">Era 3: Agent</button>
      <button class="ix-quiz-option" data-correct="false">Could be any era equally</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: Era 1. Local token prediction without broader operational context is autocomplete behavior.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q4.</strong> A tool reads your codebase, proposes a refactor in chat, then waits for you to copy-paste each change manually. It feels agentic because it "understands" the code. Which era is this actually?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">Era 3: Agent -- it understands the whole codebase</button>
      <button class="ix-quiz-option" data-correct="true">Era 2: Assistant -- you are the executor, not the tool</button>
      <button class="ix-quiz-option" data-correct="false">Era 1: Autocomplete -- it only suggests text</button>
      <button class="ix-quiz-option" data-correct="false">It depends on the size of the codebase</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: Era 2. Understanding code is not agency. The defining feature of Era 3 is the closed action-observation loop -- the tool acts, observes results, and adapts. If you are the one executing changes, it is still an assistant regardless of how sophisticated the analysis is.</p>
  </div>
</div>

<details class="ix-collapse">
<summary>Read more: Operational implications of each era</summary>
<div class="ix-collapse-body">

The interactive panels above cover each era in detail. The key operational insight: each era changes what the engineer is responsible for. In Era 1, you write code. In Era 2, you execute the AI's suggestions. In Era 3, you brief, monitor, and verify -- the agent handles execution.

</div>
</details>

<div class="ix-diagram" data-component="callout" data-variant="tip">
<p><strong>The right mental model</strong> is not "smart autocomplete" and not "magic box." Think of the agent as a junior engineer with codebase access -- competent but needs to be briefed, takes initiative but benefits from constraints, and whose work you review before shipping.</p>
</div>

<p class="ix-instruct">Click each scenario to reveal which era it belongs to.</p>

<div class="ix-diagram" data-component="reveal-quiz" data-diagram-id="m01-era-identify">
<span class="ix-title">Which era is this workflow?</span>
<div class="ix-reveal-item" data-answer="assistant" data-label="Era 2: Assistant" data-variant="scenario">
<div class="ix-reveal-prompt">You describe a bug to ChatGPT, copy the suggested fix, paste it into your editor, run tests manually, then report results back.</div>
<div class="ix-reveal-why">The AI produces text, but you execute every action. You are the agent.</div>
</div>
<div class="ix-reveal-item" data-answer="agent" data-label="Era 3: Agent" data-variant="scenario">
<div class="ix-reveal-prompt">You say "fix the failing test in user.test.ts" and watch the tool read the file, run the test, edit line 23, and re-run until tests pass.</div>
<div class="ix-reveal-why">Closed action-observation loop. The AI acts, observes results, and adapts without you running anything.</div>
</div>
<div class="ix-reveal-item" data-answer="autocomplete" data-label="Era 1: Autocomplete" data-variant="scenario">
<div class="ix-reveal-prompt">You type a function signature and a gray suggestion appears for the next few lines. You press Tab to accept.</div>
<div class="ix-reveal-why">Pure token prediction with no task awareness, no memory, no feedback loop.</div>
</div>
<div class="ix-reveal-item" data-answer="agent" data-label="Era 3: Agent" data-variant="scenario">
<div class="ix-reveal-prompt">You ask for error handling across all API routes. The tool reads the routes directory, writes try-catch blocks, runs tests, fixes failures, and reports done.</div>
<div class="ix-reveal-why">Multiple Agentic Loop cycles with autonomous tool use and self-correction.</div>
</div>
<div class="ix-reveal-item" data-answer="assistant" data-label="Era 2: Assistant" data-variant="scenario">
<div class="ix-reveal-prompt">You paste an error message into a chat, get a detailed explanation and code snippet, then manually apply the fix.</div>
<div class="ix-reveal-why">Multi-turn conversation, but all execution is on you. The AI never touches your codebase.</div>
</div>
</div>

<p class="ix-instruct">Press play to watch the agent trace unfold.</p>

<div class="ix-diagram" data-component="agent-trace"
     data-variant="terminal"
     data-diagram-id="m01-first-taste"
     data-speed="0.5">
  <span class="ix-title">What Era 3 actually looks like</span>

  <div class="ix-trace-line" data-type="prompt" data-delay="0">
    "Refactor the auth module to use JWT instead of session cookies. Keep all existing tests passing."
  </div>

  <div class="ix-trace-line" data-type="think" data-delay="2500">
    I need to understand the current auth implementation first. Let me read the auth module and its tests.
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="1500">
    Read(src/auth/session.ts)
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="1500">
    export function createSession(userId: string) { ... } // 47 lines, cookie-based sessions
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="1500">
    Read(src/auth/session.test.ts)
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="1500">
    12 tests found -- testing login, logout, session validation, expiry
  </div>

  <div class="ix-trace-line" data-type="think" data-delay="3500">
    The tests check behavior, not implementation details. I can swap session cookies for JWT tokens and the test assertions should still hold. I will create a new jwt.ts module, update the auth middleware, then run tests.
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="1500">
    Write(src/auth/jwt.ts)
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="1500">
    Bash(npm test -- --filter auth)
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="1500">
    12 tests passed
  </div>
</div>

---

## 1.2 The Agentic Loop

<div class="ix-diagram" data-component="objective">
<p>Articulate the four phases of the Agentic Loop -- Perceive, Reason, Act, Observe (PRAO) -- with concrete examples. Map visible tool calls in an agent trace to each phase and recognize when the loop cycles.</p>
</div>

The Agentic Loop -- the continuous cycle of Perceive, Reason, Act, Observe (PRAO) -- is what distinguishes true agentic coding from simple prompting. We use the mnemonic **PRAO** to remember the four phases. It maps visible tool traces to four phases.

<p class="ix-instruct">Click each card to explore the four phases of the Agentic Loop in detail.</p>

<div class="ix-diagram" data-component="click-cards" data-diagram-id="prao-loop">
  <span class="ix-title">THE AGENTIC LOOP</span>

  <div class="ix-card" data-accent="#6366f1" data-phase="reason">
    <i data-lucide="eye" class="ix-card-icon"></i>
    <span class="ix-card-label">Perceive</span>
  </div>
  <div class="ix-card" data-accent="#8b5cf6" data-phase="reason">
    <i data-lucide="brain" class="ix-card-icon"></i>
    <span class="ix-card-label">Reason</span>
  </div>
  <div class="ix-card" data-accent="#06b6d4" data-phase="act">
    <i data-lucide="zap" class="ix-card-icon"></i>
    <span class="ix-card-label">Act</span>
  </div>
  <div class="ix-card" data-accent="#10b981" data-phase="observe">
    <i data-lucide="search" class="ix-card-icon"></i>
    <span class="ix-card-label">Observe</span>
  </div>

  <div class="ix-detail-panel" data-accent="#6366f1">
    <div class="ix-detail-header" data-phase="perceive">
 <i data-lucide="eye"></i> Perceive
    </div>
    <div class="ix-detail-body">
      <div class="ix-detail-section">
        <div class="ix-detail-label">What happens</div>
        <div class="ix-detail-text">The agent builds a model of the current state. It reads files, runs <code>git status</code>, lists directories, runs tests to see what passes. Perception is active -- the agent chooses what to look at based on the task.</div>
      </div>
      <div class="ix-detail-section">
        <div class="ix-detail-label">Typical tool calls</div>
        <div class="ix-detail-text"><code>Read(src/utils.ts)</code>, <code>Bash(git status)</code>, <code>Bash(npx tsc --noEmit)</code>, <code>Bash(ls src/)</code></div>
      </div>
      <div class="ix-detail-section">
        <div class="ix-detail-label">What to watch for</div>
        <div class="ix-detail-text">Is the agent reading the right files? Is it gathering enough context, or diving in too quickly?</div>
      </div>
    </div>
  </div>

  <div class="ix-detail-panel" data-accent="#8b5cf6">
    <div class="ix-detail-header" data-phase="reason">
 <i data-lucide="brain"></i> Reason
    </div>
    <div class="ix-detail-body">
      <div class="ix-detail-section">
        <div class="ix-detail-label">What happens</div>
        <div class="ix-detail-text">The agent plans its approach, considers trade-offs, identifies constraints, and decides what actions to take. This shows up as thinking output before tool calls. Shaped by the task description, CLAUDE.md, and what was discovered during perception.</div>
      </div>
      <div class="ix-detail-section">
        <div class="ix-detail-label">Typical tool calls</div>
        <div class="ix-detail-text">No tool calls -- this is the internal deliberation phase visible in the thinking trace.</div>
      </div>
      <div class="ix-detail-section">
        <div class="ix-detail-label">What to watch for</div>
        <div class="ix-detail-text">Is the reasoning sound? Does the plan address the actual constraints? Is it overcomplicating things?</div>
      </div>
    </div>
  </div>

  <div class="ix-detail-panel" data-accent="#06b6d4">
    <div class="ix-detail-header" data-phase="act">
 <i data-lucide="zap"></i> Act
    </div>
    <div class="ix-detail-body">
      <div class="ix-detail-section">
        <div class="ix-detail-label">What happens</div>
        <div class="ix-detail-text">The agent executes its plan. Every action is a structured tool call: writing a file, running a bash command, calling an MCP server. Actions are observable and, in many workflows, approvable before execution.</div>
      </div>
      <div class="ix-detail-section">
        <div class="ix-detail-label">Typical tool calls</div>
        <div class="ix-detail-text"><code>Write(src/utils.ts)</code>, <code>Bash(npm test)</code>, <code>Edit(src/config.ts)</code>, MCP tool invocations</div>
      </div>
      <div class="ix-detail-section">
        <div class="ix-detail-label">What to watch for</div>
        <div class="ix-detail-text">Is the action aligned with the plan? Are file modifications scoped correctly? Is the agent touching files outside the intended scope?</div>
      </div>
    </div>
  </div>

  <div class="ix-detail-panel" data-accent="#10b981">
    <div class="ix-detail-header" data-phase="observe">
 <i data-lucide="search"></i> Observe
    </div>
    <div class="ix-detail-body">
      <div class="ix-detail-section">
        <div class="ix-detail-label">What happens</div>
        <div class="ix-detail-text">The agent reads the results of its actions and updates its model. Did the write succeed? Did tests pass? Did the bash command produce expected output? Observation feeds directly into the next Perceive phase, creating the feedback loop that defines agency.</div>
      </div>
      <div class="ix-detail-section">
        <div class="ix-detail-label">Typical tool calls</div>
        <div class="ix-detail-text"><code>Bash(npm test)</code>, <code>Bash(npx tsc --noEmit)</code>, <code>Read(test output)</code></div>
      </div>
      <div class="ix-detail-section">
        <div class="ix-detail-label">What to watch for</div>
        <div class="ix-detail-text">Is the agent actually checking results, or moving on without verification? An agent that skips observation is executing a script, not reasoning.</div>
      </div>
    </div>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="core-idea">
<p><strong>Perceive</strong> -- the agent reads files, checks status, gathers context. <strong>Reason</strong> -- it plans an approach based on what it found plus CLAUDE.md constraints. <strong>Act</strong> -- it executes via tool calls (Write, Bash, Edit, MCP). <strong>Observe</strong> -- it checks results (tests pass? build succeeds?) and feeds that back into the next cycle. The click-cards above show each phase in detail.</p>
</div>

<p class="ix-instruct">Use the arrows to step through the Agentic Loop phases of a real task.</p>

<div class="ix-diagram" data-component="step-walkthrough" data-diagram-id="prao-worked-example">
  <span class="ix-title">Worked example: "Add TypeScript types to src/utils.ts"</span>

  <div class="ix-walk-step">
    <div class="ix-walk-badge" data-phase="perceive">GOAL</div>
 <div class="ix-walk-actor"><i data-lucide="user"></i> Human</div>
    <div class="ix-walk-action">Sends task: <code>"Add TypeScript types to src/utils.ts. Make sure the existing tests still pass."</code></div>
  </div>

  <div class="ix-walk-step">
    <div class="ix-walk-badge" data-phase="perceive">PERCEIVE</div>
    <div class="ix-walk-cycle" data-phase="perceive">Cycle 1</div>
 <div class="ix-walk-actor"><i data-lucide="bot"></i> Agent</div>
    <div class="ix-walk-action"><code>Read(src/utils.ts)</code></div>
    <div class="ix-walk-result">File contents received -- agent sees untyped function exports</div>
  </div>

  <div class="ix-walk-step">
    <div class="ix-walk-badge" data-phase="perceive">PERCEIVE</div>
 <div class="ix-walk-actor"><i data-lucide="bot"></i> Agent</div>
    <div class="ix-walk-action"><code>Read(src/utils.test.ts)</code></div>
    <div class="ix-walk-result">Test file contents -- usage patterns reveal expected parameter and return types</div>
  </div>

  <div class="ix-walk-step">
    <div class="ix-walk-badge" data-phase="perceive">PERCEIVE</div>
 <div class="ix-walk-actor"><i data-lucide="bot"></i> Agent</div>
    <div class="ix-walk-action"><code>Bash(npx tsc --noEmit)</code></div>
    <div class="ix-walk-result">Current type errors listed -- baseline before changes</div>
  </div>

  <div class="ix-walk-step">
    <div class="ix-walk-badge" data-phase="reason">REASON</div>
 <div class="ix-walk-actor"><i data-lucide="bot"></i> Agent</div>
    <div class="ix-walk-action">Plans type additions: parameter types from usage, return types from test assertions, checks for generic patterns and tsconfig constraints</div>
  </div>

  <div class="ix-walk-step">
    <div class="ix-walk-badge" data-phase="act">ACT</div>
 <div class="ix-walk-actor"><i data-lucide="bot"></i> Agent</div>
    <div class="ix-walk-action"><code>Write(src/utils.ts)</code></div>
    <div class="ix-walk-result">File written with type annotations added to all exported functions</div>
  </div>

  <div class="ix-walk-step">
    <div class="ix-walk-badge" data-phase="observe">OBSERVE</div>
 <div class="ix-walk-actor"><i data-lucide="bot"></i> Agent</div>
    <div class="ix-walk-action"><code>Bash(npm test)</code></div>
    <div class="ix-walk-result" data-phase="error">2 tests FAIL -- type mismatch detected</div>
  </div>

  <div class="ix-walk-step">
    <div class="ix-walk-badge" data-phase="reason">REASON</div>
    <div class="ix-walk-cycle" data-phase="error">Cycle 2</div>
 <div class="ix-walk-actor"><i data-lucide="bot"></i> Agent</div>
    <div class="ix-walk-action">Reads failure output, determines type mismatch in return type for <code>parseUser()</code> -- test expects <code>User | null</code>, not <code>User</code></div>
  </div>

  <div class="ix-walk-step">
    <div class="ix-walk-badge" data-phase="act">ACT</div>
 <div class="ix-walk-actor"><i data-lucide="bot"></i> Agent</div>
    <div class="ix-walk-action"><code>Write(src/utils.ts)</code></div>
    <div class="ix-walk-result">File updated -- return type corrected to <code>User | null</code></div>
  </div>

  <div class="ix-walk-step">
    <div class="ix-walk-badge" data-phase="observe">OBSERVE</div>
 <div class="ix-walk-actor"><i data-lucide="bot"></i> Agent</div>
    <div class="ix-walk-action"><code>Bash(npm test)</code></div>
    <div class="ix-walk-result" data-phase="success">All tests PASS</div>
  </div>

  <div class="ix-walk-step">
    <div class="ix-walk-badge" data-phase="observe">DELIVER</div>
 <div class="ix-walk-actor"><i data-lucide="bot"></i> Agent</div>
    <div class="ix-walk-action">Reports to human: <code>Done. Types added to all exported functions in src/utils.ts. Tests pass.</code></div>
  </div>
</div>

<details class="ix-collapse">
<summary>Read more: Worked example walkthrough in prose</summary>
<div class="ix-collapse-body">

**Task prompt:** "Add proper TypeScript types to all exported functions in src/utils.ts. Make sure the existing tests still pass."

**Cycle 1:** *Perceive:* The agent reads `src/utils.ts` to understand the current state -- what functions are exported, what parameters they have, what they return. It also reads the test file to understand how the functions are used, providing additional type information. It may run `npx tsc --noEmit` to see what TypeScript already knows about type errors. *Reason:* Looking at the function signatures and their usage in tests, the agent plans its approach: which functions need parameter types, which need return types, whether there are any generic patterns that suggest utility types. *Act:* The agent writes an updated version of `src/utils.ts` with type annotations added. *Observe:* The agent runs `npx tsc --noEmit` to check for type errors and runs the test suite to check that existing tests still pass.

**Cycle 2 (if tests fail):** *Perceive:* The agent reads the test failure output to understand what broke. *Reason:* The agent determines whether the failure is due to a type error it introduced or some other issue. *Act:* The agent edits `src/utils.ts` to fix the issue. *Observe:* Runs tests again. This cycle continues until either the task is complete or the agent reaches genuine ambiguity requiring human input.

</div>
</details>

<p class="ix-instruct">Press play to watch the same example as a terminal trace with Agentic Loop (PRAO) annotations.</p>

<div class="ix-diagram" data-component="agent-trace"
     data-variant="prao"
     data-diagram-id="m01-prao-trace"
     data-speed="0.5">
  <span class="ix-title">The same example as an agent trace -- watch the Agentic Loop phases</span>

  <div class="ix-trace-line" data-type="prompt" data-delay="0" data-prao="perceive">
    "Add proper TypeScript types to all exported functions in src/utils.ts. Make sure existing tests still pass."
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="1500" data-prao="perceive">
    Read(src/utils.ts)
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="1500" data-prao="perceive">
    export function parseUser(data) { ... }  export function formatDate(ts) { ... }  // 4 functions, no types
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="1500" data-prao="perceive">
    Read(src/utils.test.ts)
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="1500" data-prao="perceive">
    expect(parseUser(validData)).toEqual({ id: '1', name: 'Alice' })  // reveals expected types
  </div>

  <div class="ix-trace-line" data-type="think" data-delay="3500" data-prao="reason">
    Based on tests: parseUser takes unknown data, returns User | null. formatDate takes number, returns string. I will add an interface for User and annotate all four functions.
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="1500" data-prao="act">
    Write(src/utils.ts)
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="1500" data-prao="act">
    File updated -- types added to all exported functions
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="1500" data-prao="observe">
    Bash(npm test)
  </div>

  <div class="ix-trace-line" data-type="error" data-delay="2500" data-prao="observe">
    FAIL: Type 'User' is not assignable to type 'User | null' in parseUser
  </div>

  <div class="ix-trace-line" data-type="think" data-delay="3500" data-prao="reason">
    The return type should be User | null, not User. The function returns null when parsing fails. Fixing.
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="1500" data-prao="act">
    Edit(src/utils.ts) -- return type changed to User | null
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="1500" data-prao="observe">
    Bash(npm test)
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="1500" data-prao="observe">
    All 8 tests passed
  </div>

  <div class="ix-trace-line" data-type="response" data-delay="2500" data-prao="observe">
    Done. Added TypeScript types to all 4 exported functions in src/utils.ts. Created a User interface. Tests pass.
  </div>
</div>

<p class="ix-instruct">Test your understanding -- identify the Agentic Loop phase for each signal.</p>

<div class="ix-diagram" data-component="quiz" data-diagram-id="m01-prao-check" data-xp="18">
  <span class="ix-title">Knowledge Check: Agentic Loop Signal Recognition</span>

  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q1.</strong> The trace shows <code>Read(src/auth/session.ts)</code>. Which Agentic Loop (PRAO) phase does this line represent most directly?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="true">Perceive</button>
      <button class="ix-quiz-option" data-correct="false">Reason</button>
      <button class="ix-quiz-option" data-correct="false">Act</button>
      <button class="ix-quiz-option" data-correct="false">Observe</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: Perceive. Reading is context-gathering before execution.</p>
  </div>

  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q2.</strong> The agent writes a file, then runs <code>npm test</code> and adjusts based on failures. The test output line is primarily which phase?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">Perceive</button>
      <button class="ix-quiz-option" data-correct="false">Reason</button>
      <button class="ix-quiz-option" data-correct="false">Act</button>
      <button class="ix-quiz-option" data-correct="true">Observe</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: Observe. It is feedback about the effect of prior actions.</p>
  </div>

  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q3.</strong> You see a long thinking block that compares two approaches before any write occurs. Which phase is dominant?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">Perceive</button>
      <button class="ix-quiz-option" data-correct="true">Reason</button>
      <button class="ix-quiz-option" data-correct="false">Act</button>
      <button class="ix-quiz-option" data-correct="false">Observe</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: Reason. This is planning and trade-off work before execution.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q4.</strong> The agent runs <code>npm test</code>, sees failures, then immediately runs <code>npm test</code> again without changing any code. Which Agentic Loop (PRAO) phase is the second test run?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">Act -- it is executing a command</button>
      <button class="ix-quiz-option" data-correct="false">Observe -- it is gathering new feedback</button>
      <button class="ix-quiz-option" data-correct="false">Perceive -- it is re-reading the environment</button>
      <button class="ix-quiz-option" data-correct="true">It is Act, but unproductive -- the agent should have edited code first</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: technically Act, but unproductive. Running the same command without changing anything that could alter the result is a sign of a stuck loop, not a healthy Agentic Loop cycle. A productive loop requires an Act that changes something before re-Observing.</p>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="warning">
<p><strong>Watch for stuck loops.</strong> Multiple Agentic Loop cycles are normal -- a complex refactor might take five or six. But if the agent repeats the same action (e.g., <code>Read(auth.ts)</code> three times) without progress, intervene. Ask what information is missing.</p>
</div>

---

## 1.3 Agentic Coding Tools

<div class="ix-diagram" data-component="objective">
<p>Understand the shared characteristics of agentic coding tools and how they differ from traditional AI assistants.</p>
</div>

Agentic coding tools are a new category of development environment. They embed the Agentic Loop (PRAO) directly into a coding workflow -- the AI does not just suggest text, it reads files, writes code, runs commands, observes results, and adapts. Examples include **Claude Code**, **Cursor**, **GitHub Copilot** (agent mode), and **Windsurf**, among others. In this course, we use Claude Code as our primary tool. In Module 02, you will learn its specific architecture, configuration, and permission model in depth.

<p class="ix-instruct">Write your prediction, then reveal the reference reasoning.</p>

<div class="ix-diagram" data-component="predict-reveal" data-diagram-id="m01-agentic-tools-predict" data-xp="8">
  <span class="ix-title">Predict Before You Learn</span>
  <p class="ix-predict-prompt">What do you think makes an "agentic" coding tool different from a regular AI assistant like ChatGPT? Write your answer, then explore the cards below.</p>
  <textarea class="ix-predict-input" aria-label="Your prediction" placeholder="Write 2-3 sentences about what you think distinguishes agentic coding tools."></textarea>
  <details class="ix-predict-reveal">
    <summary>Reveal reference reasoning</summary>
    <p>The key difference is <strong>autonomous action</strong>. A regular AI assistant produces text that you copy-paste and execute yourself. An agentic coding tool reads your codebase, writes edits, runs tests, and observes results -- all within a closed loop. You shift from being the executor to being the director and reviewer. This also means the tool needs a permission model, persistent project context, and external integrations to be effective and safe.</p>
  </details>
</div>

<p class="ix-instruct">Click each card to explore the shared characteristics of agentic coding tools.</p>

<div class="ix-diagram" data-component="click-cards" data-diagram-id="agentic-tool-traits">
  <span class="ix-title">Shared characteristics of agentic coding tools</span>
  <div class="ix-card" data-accent="#06b6d4" data-phase="act">
    <i data-lucide="wrench" class="ix-card-icon"></i>
    <span class="ix-card-label">Autonomous tool use</span>
  </div>
  <div class="ix-card" data-accent="#8b5cf6" data-phase="reason">
    <i data-lucide="refresh-cw" class="ix-card-icon"></i>
    <span class="ix-card-label">The Agentic Loop</span>
  </div>
  <div class="ix-card" data-accent="#10b981" data-phase="observe">
    <i data-lucide="terminal" class="ix-card-icon"></i>
    <span class="ix-card-label">Bash / terminal access</span>
  </div>
  <div class="ix-card" data-accent="#f59e0b" data-phase="perceive">
    <i data-lucide="plug" class="ix-card-icon"></i>
    <span class="ix-card-label">External integrations</span>
  </div>
  <div class="ix-card" data-accent="#6366f1" data-phase="reason">
    <i data-lucide="hard-drive" class="ix-card-icon"></i>
    <span class="ix-card-label">Persistent context</span>
  </div>
  <div class="ix-card" data-accent="#ef4444" data-phase="error">
    <i data-lucide="shield" class="ix-card-icon"></i>
    <span class="ix-card-label">Permission models</span>
  </div>
  <!-- Detail panels -->
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="act">
      <i data-lucide="wrench"></i> Autonomous tool use
    </div>
    <div class="ix-detail-body">
      <div class="ix-detail-section">
        <div class="ix-detail-text">Agentic coding tools can read files, write code, and run commands without step-by-step human instruction. You describe an outcome; the tool decides which actions to take. In Claude Code, this appears as tool calls like <code>Read()</code>, <code>Edit()</code>, and <code>Bash()</code>. In Cursor, it manifests as inline edits and terminal commands within the editor.</div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="reason">
      <i data-lucide="refresh-cw"></i> The Agentic Loop
    </div>
    <div class="ix-detail-body">
      <div class="ix-detail-section">
        <div class="ix-detail-text">Every agentic coding tool implements the Perceive-Reason-Act-Observe cycle internally. The tool perceives your prompt and project state, reasons about what to do, takes an action, observes the result, and loops until the task is complete. You explored this loop in section 1.2 -- it is the universal engine powering all agentic tools.</div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="success">
      <i data-lucide="terminal"></i> Bash / terminal access
    </div>
    <div class="ix-detail-body">
      <div class="ix-detail-section">
        <div class="ix-detail-text">Agentic tools can execute shell commands: run tests, install packages, check git status, build projects. This is what closes the feedback loop -- the tool acts, then observes real output from your system. A regular AI assistant can only suggest commands for you to run manually.</div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="perceive">
      <i data-lucide="plug"></i> External integrations
    </div>
    <div class="ix-detail-body">
      <div class="ix-detail-section">
        <div class="ix-detail-text">Via protocols like MCP (Model Context Protocol), agentic tools connect to external services: databases, issue trackers, design tools, deployment pipelines. This extends the tool's reach beyond your local filesystem. You will explore MCP in depth in Module 02.</div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="perceive">
      <i data-lucide="hard-drive"></i> Persistent context
    </div>
    <div class="ix-detail-body">
      <div class="ix-detail-section">
        <div class="ix-detail-text">Agentic tools use project files to maintain knowledge across sessions. In Claude Code, this is <code>CLAUDE.md</code> -- a briefing file read at every session start. Other tools have equivalent mechanisms: Cursor uses <code>.cursorrules</code>, Copilot uses instruction files. The idea is the same -- the tool needs durable project context to work effectively over time, not just within a single conversation.</div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="error">
      <i data-lucide="shield"></i> Permission models
    </div>
    <div class="ix-detail-body">
      <div class="ix-detail-section">
        <div class="ix-detail-text">Because agentic tools take real actions (writing files, running commands), they need safety controls. Every serious agentic tool implements a permission model: rules that define what the agent can do autonomously and what requires your approval. In Claude Code, this is the <code>settings.json</code> allow/deny system. You will configure it hands-on in Module 02.</div>
      </div>
    </div>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="core-idea">
<p><strong>The category, not the brand.</strong> Agentic coding tools share a common architecture: an LLM with tool access, running inside a loop, governed by permissions, connected to external services, and grounded in persistent project context. Understanding these shared traits prepares you to work with any tool in this category -- not just the one we use in this course.</p>
</div>

---

## 1.4 The Productive Collaboration Model

<div class="ix-diagram" data-component="objective">
<p>Recognize the three collaboration failure modes (autocomplete mindset, magic box mindset, rubber-stamping) and apply the productive pattern: specific goal, rich context, explicit constraints, monitor, verify, close the loop.</p>
</div>

<p class="ix-instruct">Click each card to explore the failure modes and the productive pattern.</p>

<div class="ix-diagram" data-component="click-cards" data-diagram-id="failure-modes">
  <span class="ix-title">Collaboration model -- failure modes and the productive pattern</span>

  <div class="ix-card" data-accent="#f87171" data-phase="error">
    <i data-lucide="align-justify" class="ix-card-icon"></i>
    <span class="ix-card-label">Autocomplete mindset</span>
  </div>
  <div class="ix-card" data-accent="#f59e0b" data-phase="perceive">
    <i data-lucide="box" class="ix-card-icon"></i>
    <span class="ix-card-label">Magic box mindset</span>
  </div>
  <div class="ix-card" data-accent="#a78bfa" data-phase="reason">
    <i data-lucide="stamp" class="ix-card-icon"></i>
    <span class="ix-card-label">Rubber-stamping</span>
  </div>
  <div class="ix-card" data-accent="#10b981" data-phase="observe">
    <i data-lucide="check-circle" class="ix-card-icon"></i>
    <span class="ix-card-label">Productive pattern</span>
  </div>

  <div class="ix-detail-panel" data-accent="#f87171">
    <div class="ix-detail-header" data-phase="error">
 <i data-lucide="align-justify"></i> Failure: Autocomplete mindset
    </div>
    <div class="ix-detail-body">
      <div class="ix-detail-section">
        <div class="ix-detail-label">What it looks like</div>
        <div class="ix-detail-text">Constant micro-prompts: "change line 23," "use a different name," "add a comment." The engineer directs every keystroke -- never letting the agent perceive, reason, or plan.</div>
      </div>
      <div class="ix-detail-section">
        <div class="ix-detail-label">Why it fails</div>
        <div class="ix-detail-text">Treats the agent as a faster typing tool. The continuous interruptions prevent the agent from building a coherent model of the task.</div>
      </div>
      <div class="ix-detail-section">
        <div class="ix-detail-label">The fix</div>
        <div class="ix-detail-text">Start with the goal, not the steps. "Refactor the auth module to use JWT instead of session tokens. The existing tests should all pass."</div>
      </div>
      <div class="ix-cap-section">
        <div class="ix-cap-label">Agent capability utilized</div>
        <div class="ix-cap-track"><div class="ix-cap-fill" data-width="10%" data-phase="error"></div></div>
        <div class="ix-cap-val" data-phase="error">~10%</div>
      </div>
    </div>
  </div>

  <div class="ix-detail-panel" data-accent="#f59e0b">
    <div class="ix-detail-header" data-phase="goal">
 <i data-lucide="box"></i> Failure: Magic box mindset
    </div>
    <div class="ix-detail-body">
      <div class="ix-detail-section">
        <div class="ix-detail-label">What it looks like</div>
        <div class="ix-detail-text">Vague, aspirational prompts with no constraints or definition of done. "Make the code better." "Fix everything." "Improve performance."</div>
      </div>
      <div class="ix-detail-section">
        <div class="ix-detail-label">Why it fails</div>
        <div class="ix-detail-text">Skips the briefing entirely. No CLAUDE.md context, no scope constraints, no definition of "done." The agent makes arbitrary choices that may not align with intent.</div>
      </div>
      <div class="ix-detail-section">
        <div class="ix-detail-label">The fix</div>
        <div class="ix-detail-text">Be specific about goal, scope, and constraints. "Decouple database access from business logic in <code>src/auth/</code>. Don't change the external API."</div>
      </div>
      <div class="ix-cap-section">
        <div class="ix-cap-label">Agent capability utilized</div>
        <div class="ix-cap-track"><div class="ix-cap-fill" data-width="35%" data-phase="goal"></div></div>
        <div class="ix-cap-val" data-phase="goal">~35%</div>
      </div>
    </div>
  </div>

  <div class="ix-detail-panel" data-accent="#a78bfa">
    <div class="ix-detail-header" data-phase="reason">
 <i data-lucide="stamp"></i> Failure: Rubber-stamping
    </div>
    <div class="ix-detail-body">
      <div class="ix-detail-section">
        <div class="ix-detail-label">What it looks like</div>
        <div class="ix-detail-text">Hands off to the agent and accepts output without review. Doesn't read diffs, doesn't run tests independently, doesn't verify the reasoning.</div>
      </div>
      <div class="ix-detail-section">
        <div class="ix-detail-label">Why it fails</div>
        <div class="ix-detail-text">Over-trusts the agent. Forgets that verification is part of the engineering workflow, not optional overhead. The professional standard is understanding what changed and why.</div>
      </div>
      <div class="ix-detail-section">
        <div class="ix-detail-label">The fix</div>
        <div class="ix-detail-text">Read the diff. Run the tests yourself. Ask the agent to explain its approach if the reasoning isn't clear. Understand what changed and why before accepting.</div>
      </div>
      <div class="ix-cap-section">
        <div class="ix-cap-label">Agent capability utilized</div>
        <div class="ix-cap-track"><div class="ix-cap-fill" data-width="60%" data-phase="reason"></div></div>
        <div class="ix-cap-val" data-phase="reason">~60%</div>
      </div>
    </div>
  </div>

  <div class="ix-detail-panel" data-accent="#10b981">
    <div class="ix-detail-header" data-phase="success">
 <i data-lucide="check-circle"></i> The productive pattern
    </div>
    <div class="ix-detail-body">
      <div class="ix-detail-section">
        <div class="ix-detail-label">The six steps</div>
        <div class="ix-detail-text">
          <div class="ix-step-row"><span class="ix-step-num" data-phase="success">1</span><span>Specific goal -- describe what "done" looks like, not the steps to get there</span></div>
          <div class="ix-step-row"><span class="ix-step-num" data-phase="success">2</span><span>Rich context -- ensure CLAUDE.md has architectural context; add file paths to prompt</span></div>
          <div class="ix-step-row"><span class="ix-step-num" data-phase="success">3</span><span>Explicit constraints -- state what must remain unchanged, what patterns to follow</span></div>
          <div class="ix-step-row"><span class="ix-step-num" data-phase="success">4</span><span>Monitor execution -- watch tool calls at a high level; intervene if clearly wrong</span></div>
          <div class="ix-step-row"><span class="ix-step-num" data-phase="success">5</span><span>Verify outputs -- read the diff, run tests, check behavior matches intent</span></div>
          <div class="ix-step-row"><span class="ix-step-num" data-phase="success">6</span><span>Close the loop -- if the agent made a good decision, write it to CLAUDE.md</span></div>
        </div>
      </div>
      <div class="ix-cap-section">
        <div class="ix-cap-label">Agent capability utilized</div>
        <div class="ix-cap-track"><div class="ix-cap-fill" data-width="95%" data-phase="success"></div></div>
        <div class="ix-cap-val" data-phase="success">~95%</div>
      </div>
    </div>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="core-idea">
<p><strong>Execution discipline:</strong> Start with a concrete outcome and explicit boundaries. Let the agent run meaningful chunks instead of micro-directing. Verify via trace + diff + tests before accepting. Promote recurring decisions to CLAUDE.md so the next session starts better.</p>
</div>

<p class="ix-instruct">Write your prediction, then reveal the coaching insight to compare.</p>

<div class="ix-diagram" data-component="predict-reveal" data-diagram-id="m01-collaboration-predict" data-xp="10">
  <span class="ix-title">Predict First: Where Do You Usually Drift?</span>
  <p class="ix-predict-prompt">Before opening the reveal, predict your most common failure mode in real work: over-directing, under-specifying, or under-verifying. Write one concrete correction you will apply in your next session.</p>
  <textarea class="ix-predict-input" aria-label="Your prediction" placeholder="Name the failure mode and your correction."></textarea>
  <details class="ix-predict-reveal">
    <summary>Reveal coaching</summary>
    <p>Most teams improve fastest by tightening one behavior at a time: stronger prompts, clearer constraints, or stricter verification checkpoints. Pick one and run it for a full week.</p>
  </details>
</div>

<p class="ix-instruct">Step through each terminal command to see the first 60 seconds of an agent session.</p>

<div class="ix-diagram" data-component="terminal-sim" data-diagram-id="m01-first-60-seconds" data-xp="14">
  <span class="ix-title">Terminal Simulation: First 60 Seconds With Claude Code</span>

  <div class="ix-terminal-step">
    <div class="ix-term-cmd">claude</div>
    <pre class="ix-term-out">Session started.
Loaded CLAUDE.md from:
- ~/.claude/CLAUDE.md
- ./CLAUDE.md</pre>
    <p class="ix-term-note">The run begins with standing context, not a blank slate.</p>
  </div>

  <div class="ix-terminal-step">
    <div class="ix-term-cmd">Prompt: "Refactor auth flow for refresh tokens. Keep existing API stable. Run tests before summary."</div>
    <pre class="ix-term-out">Thinking: Identify auth entry points, token issuance, middleware checks, and test coverage first.</pre>
    <p class="ix-term-note">This is goal + constraints in one prompt, not micro-instructions.</p>
  </div>

  <div class="ix-terminal-step">
    <div class="ix-term-cmd">Read(src/auth/jwt.ts) • Read(src/middleware/authenticate.ts)</div>
    <pre class="ix-term-out">Result: access token and refresh logic are currently coupled in one module.</pre>
    <p class="ix-term-note">Perceive phase builds the map before any write.</p>
  </div>

  <div class="ix-terminal-step">
    <div class="ix-term-cmd">Write(src/auth/tokens.ts) • Edit(src/routes/auth.ts) • Bash(npm test)</div>
    <pre class="ix-term-out">All tests passed.
Summary: separated token issuance, preserved external API, updated route wiring.</pre>
    <p class="ix-term-note">Healthy loop: act, then observe, then report evidence.</p>
  </div>
</div>

<p class="ix-instruct">Work through two high-signal scenarios and choose your response -- then reveal the coaching feedback.</p>

<div class="ix-diagram" data-component="scenario-quiz" data-diagram-id="m01-disorientation-sim">
<span class="ix-title">The disorientation simulator</span>
<div class="ix-scenario" data-correct="1">
<div class="ix-scenario-terminal">
<div class="ix-term-line" data-type="prompt">> Add error handling to all API routes in src/routes/</div>
<div class="ix-term-line" data-type="tool">  Read("src/routes/")</div>
<div class="ix-term-line" data-type="output">  -> users.ts, products.ts, orders.ts, auth.ts</div>
<div class="ix-term-line" data-type="tool">  Read("src/routes/users.ts")</div>
<div class="ix-term-line" data-type="thinking">  thinking: 14 routes, 3 files have no try-catch...</div>
<div class="ix-term-line" data-type="tool">  Read("src/middleware/errorHandler.ts")</div>
<div class="ix-term-line" data-type="tool">  Write("src/routes/users.ts")</div>
</div>
<div class="ix-scenario-question">The agent started reading files and writing code immediately -- you expected it to ask clarifying questions first. What do you do?</div>
<div class="ix-scenario-choice" data-rating="neutral">Interrupt immediately and tell it to stop. Ask it to confirm its plan before making any changes.</div>
<div class="ix-scenario-choice" data-rating="correct">Let it work. It is perceiving the codebase (reading files) and has started acting. Review its changes when done.</div>
<div class="ix-scenario-choice" data-rating="wrong">Close the terminal. You did not authorize file writes.</div>
<div class="ix-scenario-feedback"><strong>This is normal agent behavior.</strong> The agent is running through the Agentic Loop: perceiving (reading files), reasoning (the thinking trace), and acting (writing the fix). The disorientation you feel is the gap between expecting a response and watching an agent operate. Let it work, then review the diff.</div>
</div>
<div class="ix-scenario" data-correct="1">
<div class="ix-scenario-terminal">
<div class="ix-term-line" data-type="prompt">> Update the user model to support roles</div>
<div class="ix-term-line" data-type="tool">  Read("prisma/schema.prisma")</div>
<div class="ix-term-line" data-type="tool">  Write("prisma/schema.prisma")</div>
<div class="ix-term-line" data-type="tool">  Bash("npx prisma migrate dev --name add-user-roles")</div>
<div class="ix-term-line" data-type="thinking">  thinking: migration created, now update the service...</div>
<div class="ix-term-line" data-type="tool">  Write("src/services/user.ts")</div>
<div class="ix-term-line" data-type="tool">  Write("src/routes/users.ts")</div>
</div>
<div class="ix-scenario-question">The agent modified your Prisma schema and ran a migration -- creating a permanent database change. What do you do?</div>
<div class="ix-scenario-choice" data-rating="neutral">This is fine. You asked it to update the user model, and it needs to change the schema to do that.</div>
<div class="ix-scenario-choice" data-rating="correct">Interrupt NOW. Schema migrations are irreversible in production. Review the migration file before it runs.</div>
<div class="ix-scenario-choice" data-rating="wrong">Let it finish, then check the migration file after.</div>
<div class="ix-scenario-feedback"><strong>This is where intervention is appropriate.</strong> Schema migrations are exactly the kind of action where the cost of error is high. The lesson: add "Do not modify prisma/schema.prisma without asking" to your CLAUDE.md. Constraints prevent repeat mistakes.</div>
</div>
</div>

<p class="ix-instruct">Step through both traces to compare the same task in two different paradigms. Use the arrow keys or click the step button.</p>

<div class="ix-diagram" data-component="agent-trace"
     data-variant="compare"
     data-diagram-id="m01-era-compare"
     data-default-mode="manual"
     data-speed="0.5">
  <span class="ix-title">Same task, different paradigms</span>

  <div class="ix-trace-group" data-label="Era 2: You are the agent">
    <div class="ix-trace-line" data-type="prompt" data-delay="0">
      "The test in user.test.ts is failing. Can you help fix it?"
    </div>
    <div class="ix-trace-line" data-type="response" data-delay="2500">
      Sure! Can you share the test file and the error message?
    </div>
    <div class="ix-trace-line" data-type="prompt" data-delay="2500">
      [You manually copy-paste 47 lines of test code and the error output]
    </div>
    <div class="ix-trace-line" data-type="response" data-delay="2500">
      The issue is on line 23. Change assertEquals to toEqual. Here is the corrected code: ...
    </div>
    <div class="ix-trace-line" data-type="prompt" data-delay="2500">
      [You paste the fix into your editor, run npm test manually, report back]
    </div>
    <div class="ix-trace-line" data-type="response" data-delay="2000">
      Glad it works!
    </div>
  </div>

  <div class="ix-trace-group" data-label="Era 3: Agent is the agent">
    <div class="ix-trace-line" data-type="prompt" data-delay="0">
      "The test in user.test.ts is failing. Fix it."
    </div>
    <div class="ix-trace-line" data-type="tool" data-delay="1500">
      Read(src/user.test.ts)
    </div>
    <div class="ix-trace-line" data-type="tool" data-delay="1500">
      Bash(npm test -- --filter user)
    </div>
    <div class="ix-trace-line" data-type="result" data-delay="1500">
      FAIL line 23: assertEquals is not a function
    </div>
    <div class="ix-trace-line" data-type="tool" data-delay="1500">
      Edit(src/user.test.ts) -- line 23: assertEquals -> toEqual
    </div>
    <div class="ix-trace-line" data-type="tool" data-delay="1500">
      Bash(npm test -- --filter user)
    </div>
    <div class="ix-trace-line" data-type="result" data-delay="1500">
      All tests passed
    </div>
    <div class="ix-trace-line" data-type="response" data-delay="2500">
      Fixed. The test used assertEquals (not available in vitest) instead of toEqual. Tests pass now.
    </div>
  </div>
</div>

---

## 1.5 When Agentic AI Is and Isn't the Right Tool

<div class="ix-diagram" data-component="objective">
<p>Evaluate whether a task is well-suited to agentic AI using specificity, verifiability, and risk criteria. Apply the decision framework before committing to an agentic workflow.</p>
</div>

<p class="ix-instruct">Write your prediction, then reveal the framework.</p>

<div class="ix-diagram" data-component="predict-reveal" data-diagram-id="m01-suitability-predict" data-xp="8">
  <span class="ix-title">Predict Before You Learn</span>
  <p class="ix-predict-prompt">Think of a coding task you did last week. Would an AI agent have been a good fit for it? What criteria would you use to decide whether a task is suitable for an agentic workflow versus doing it manually?</p>
  <textarea class="ix-predict-input" aria-label="Your prediction" placeholder="Describe the task and your suitability criteria."></textarea>
  <details class="ix-predict-reveal">
    <summary>Reveal the decision framework</summary>
    <p>Four questions determine suitability: (1) How long would this take manually? Longer = more value from the agent. (2) How specific can you be about the goal? More specific = lower risk of the agent going off track. (3) How verifiable is the output? Tests and diffs make verification easy. (4) What is the cost if the agent gets it wrong? Lower cost = more appropriate for delegation. Tasks that score high on specificity and verifiability are the sweet spot.</p>
  </details>
</div>

<div class="ix-diagram" data-component="callout" data-variant="core-idea">
<p><strong>The decision framework:</strong> Before using the agent, ask four questions. (1) How long would this take manually? Longer = more value. (2) How specific can I be about the goal? More specific = lower risk. (3) How verifiable is the output? Tests/diffs = safer. (4) What is the cost if the agent gets it wrong? Lower cost = more appropriate.</p>
</div>

<p class="ix-instruct">Click each card to explore the task suitability quadrants.</p>

<div class="ix-diagram" data-component="click-cards" data-diagram-id="task-suitability">
  <span class="ix-title">Task suitability for agentic AI</span>

  <div class="ix-card" data-accent="#10b981" data-phase="observe">
    <i data-lucide="check-circle" class="ix-card-icon"></i>
    <span class="ix-card-label">Best fit</span>
  </div>
  <div class="ix-card" data-accent="#f59e0b" data-phase="perceive">
    <i data-lucide="alert-triangle" class="ix-card-icon"></i>
    <span class="ix-card-label">Needs better spec</span>
  </div>
  <div class="ix-card" data-accent="#ef4444" data-phase="error">
    <i data-lucide="x-circle" class="ix-card-icon"></i>
    <span class="ix-card-label">Poor fit</span>
  </div>
  <div class="ix-card" data-accent="#6366f1" data-phase="reason">
    <i data-lucide="eye" class="ix-card-icon"></i>
    <span class="ix-card-label">Verify manually</span>
  </div>

  <div class="ix-detail-panel" data-accent="#10b981">
    <div class="ix-detail-header" data-phase="success">
 <i data-lucide="check-circle"></i> Best fit -- High specificity + High verifiability
    </div>
    <div class="ix-detail-body">
      <div class="ix-detail-section">
        <div class="ix-detail-label">Tasks in this quadrant</div>
        <div class="ix-detail-text">
          <div class="ix-task-row"><i data-lucide="files" data-phase="success"></i> <strong>Multi-file refactor</strong> -- clear goal, testable outcome</div>
          <div class="ix-task-row"><i data-lucide="test-tubes" data-phase="success"></i> <strong>Test generation</strong> -- spec-driven, pass/fail verification</div>
          <div class="ix-task-row"><i data-lucide="file-text" data-phase="success"></i> <strong>Documentation</strong> -- extractable from code, reviewable</div>
          <div class="ix-task-row"><i data-lucide="settings" data-phase="success"></i> <strong>Config migration</strong> -- deterministic transformation, diffable</div>
        </div>
      </div>
      <div class="ix-detail-section">
        <div class="ix-detail-label">Why it works</div>
        <div class="ix-detail-text">You can describe exactly what "done" looks like, and you can verify the result with tests, diffs, or type checking. The agent has clear constraints and a verifiable target.</div>
      </div>
    </div>
  </div>

  <div class="ix-detail-panel" data-accent="#f59e0b">
    <div class="ix-detail-header" data-phase="goal">
 <i data-lucide="alert-triangle"></i> Needs better spec -- Low specificity + High verifiability
    </div>
    <div class="ix-detail-body">
      <div class="ix-detail-section">
        <div class="ix-detail-label">Tasks in this quadrant</div>
        <div class="ix-detail-text">
          <div class="ix-task-row"><i data-lucide="scan-search" data-phase="goal"></i> <strong>Code review</strong> -- verifiable output, but "what to look for" needs definition</div>
        </div>
      </div>
      <div class="ix-detail-section">
        <div class="ix-detail-label">How to improve</div>
        <div class="ix-detail-text">Add specificity: define the review checklist, the patterns to flag, the style guide to enforce. Once the spec is clear, these tasks move into "best fit."</div>
      </div>
    </div>
  </div>

  <div class="ix-detail-panel" data-accent="#ef4444">
    <div class="ix-detail-header" data-phase="error">
 <i data-lucide="x-circle"></i> Poor fit -- Low specificity + Low verifiability
    </div>
    <div class="ix-detail-body">
      <div class="ix-detail-section">
        <div class="ix-detail-label">Tasks in this quadrant</div>
        <div class="ix-detail-text">
          <div class="ix-task-row"><i data-lucide="sparkles" data-phase="error"></i> <strong>Vague improvement</strong> -- "make it better" with no criteria</div>
          <div class="ix-task-row"><i data-lucide="palette" data-phase="error"></i> <strong>Creative design</strong> -- subjective output, no clear pass/fail</div>
        </div>
      </div>
      <div class="ix-detail-section">
        <div class="ix-detail-label">Why it fails</div>
        <div class="ix-detail-text">You can't describe what "done" looks like, and you can't verify the result mechanically. The agent's choices are arbitrary, and you can't tell good from bad without deep subjective review.</div>
      </div>
    </div>
  </div>

  <div class="ix-detail-panel" data-accent="#6366f1">
    <div class="ix-detail-header" data-phase="perceive">
 <i data-lucide="eye"></i> Verify manually -- High specificity + Low verifiability
    </div>
    <div class="ix-detail-body">
      <div class="ix-detail-section">
        <div class="ix-detail-label">Tasks in this quadrant</div>
        <div class="ix-detail-text">
          <div class="ix-task-row"><i data-lucide="rocket" data-phase="perceive"></i> <strong>Production deploy</strong> -- well-specified steps, but consequences are hard to verify automatically</div>
        </div>
      </div>
      <div class="ix-detail-section">
        <div class="ix-detail-label">How to handle</div>
        <div class="ix-detail-text">The agent can execute the steps, but a human must verify the outcome. Add monitoring, staging environments, and rollback plans. Never skip the manual verification step for high-stakes operations.</div>
      </div>
    </div>
  </div>
</div>

<p class="ix-instruct">Now apply the framework to concrete scenarios.</p>

<div class="ix-diagram" data-component="reveal-quiz" data-diagram-id="m01-task-suitability-quiz">
<span class="ix-title">Is this task right for the agent?</span>
<div class="ix-reveal-item" data-answer="best-fit" data-label="Best fit" data-variant="scenario">
<div class="ix-reveal-prompt">Rename a concept across 60 files, keep tests green, preserve the public API.</div>
<div class="ix-reveal-why">High specificity + high verifiability. Clear goal, testable outcome, diffable changes.</div>
</div>
<div class="ix-reveal-item" data-answer="poor-fit" data-label="Poor fit" data-variant="scenario">
<div class="ix-reveal-prompt">"Make the code better" with no further specification.</div>
<div class="ix-reveal-why">Low specificity + low verifiability. The agent cannot determine what "better" means without criteria.</div>
</div>
<div class="ix-reveal-item" data-answer="best-fit" data-label="Best fit" data-variant="scenario">
<div class="ix-reveal-prompt">Generate test cases for all exported functions in src/utils.ts based on the existing API.</div>
<div class="ix-reveal-why">Spec-driven, pass/fail verification, well-bounded scope.</div>
</div>
<div class="ix-reveal-item" data-answer="needs-spec" data-label="Needs better spec" data-variant="scenario">
<div class="ix-reveal-prompt">Review this PR for "code quality issues."</div>
<div class="ix-reveal-why">Verifiable output, but "quality" is undefined. Add a checklist of what to look for and this becomes a best fit.</div>
</div>
<div class="ix-reveal-item" data-answer="verify-manual" data-label="Verify manually" data-variant="scenario">
<div class="ix-reveal-prompt">Deploy the staging build and verify the checkout flow works end-to-end.</div>
<div class="ix-reveal-why">Well-specified steps, but consequences require human verification. The agent can execute but you must validate.</div>
</div>
<div class="ix-reveal-item" data-answer="poor-fit" data-label="Poor fit" data-variant="scenario">
<div class="ix-reveal-prompt">Run a production database migration with no rollback path and no monitoring access.</div>
<div class="ix-reveal-why">High blast radius with no recovery. Manual control is essential regardless of agent competence.</div>
</div>
</div>

<p class="ix-instruct">Test your understanding of task suitability for agentic AI.</p>

<div class="ix-diagram" data-component="quiz" data-diagram-id="m01-suitability-check" data-xp="10">
  <span class="ix-title">Decision Check: Should You Use The Agent?</span>

  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q1.</strong> A task has a clear, testable definition of done and touches 200 files. An engineer says "too many files for the agent." Is this reasoning correct?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">Yes -- agents should only handle small changes</button>
      <button class="ix-quiz-option" data-correct="false">Yes -- 200 files exceeds the context window by default</button>
      <button class="ix-quiz-option" data-correct="true">No -- specificity and verifiability matter more than file count</button>
      <button class="ix-quiz-option" data-correct="false">No -- but only in non-interactive mode</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: no. File count is not a suitability axis. If the goal is precise and the result is verifiable, it can still be an excellent fit.</p>
  </div>

  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q2.</strong> "Improve product search performance" is the only instruction, but you already know the required solution is Elasticsearch for 10M+ products. Best classification?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="true">Needs better spec -- architecture intent is underspecified</button>
      <button class="ix-quiz-option" data-correct="false">Best fit -- the agent should infer Elasticsearch automatically</button>
      <button class="ix-quiz-option" data-correct="false">Poor fit -- performance tasks should never use agents</button>
      <button class="ix-quiz-option" data-correct="false">Verify manually only -- no prompt changes needed</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: needs better spec. The task can be a good agent fit, but only after you encode the architectural constraint explicitly in the prompt.</p>
  </div>
</div>

---

## Best Practices Summary

<p class="ix-instruct">Use the tabs to review each best-practice category before moving to the key concept recap.</p>

<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="m01-best-practices-tabs">
  <span class="ix-title">Best Practices by Category</span>
  <div data-tab="Prompt Design">
    <p>Describe outcomes ("the tests should still pass after the refactor"). Specify constraints explicitly ("do not modify any files in <code>/config</code>"). Avoid step-by-step micro-instructions for tasks the agent can plan itself. Avoid vague goals like "improve the code" without defining what improvement means.</p>
  </div>
  <div data-tab="Context Management">
    <p>Keep <code>CLAUDE.md</code> up to date with conventions and architecture. Include relevant file paths in your prompt when they are not already in <code>CLAUDE.md</code>. Never rely on in-session instructions for things that matter across sessions. Never include secrets, API keys, or credentials in <code>CLAUDE.md</code>.</p>
  </div>
  <div data-tab="Verification">
    <p>Read the diff of changed files before accepting. Run tests yourself -- do not just trust that the agent reported they pass. Ask the agent to explain its approach if the reasoning is unclear from the trace. Avoid accepting agent output without understanding what changed and why.</p>
  </div>
</div>

---

## Key Concepts for Review

<p class="ix-instruct">Click each concept card to reveal its exact definition.</p>

<div class="ix-diagram" data-component="click-cards" data-diagram-id="m01-key-concepts-cards">
  <span class="ix-title">Module 01 Core Concepts</span>
  <div class="ix-card" data-phase="perceive">
    <i data-lucide="cpu" class="ix-card-icon"></i>
    <span class="ix-card-label">Agentic AI</span>
  </div>
  <div class="ix-card" data-phase="reason">
    <i data-lucide="repeat" class="ix-card-icon"></i>
    <span class="ix-card-label">PRAO Loop</span>
  </div>
  <div class="ix-card" data-phase="observe">
    <i data-lucide="book-open" class="ix-card-icon"></i>
    <span class="ix-card-label">CLAUDE.md</span>
  </div>
  <div class="ix-card" data-phase="neutral">
    <i data-lucide="message-square" class="ix-card-icon"></i>
    <span class="ix-card-label">Session Context</span>
  </div>
  <div class="ix-card" data-phase="act">
    <i data-lucide="wrench" class="ix-card-icon"></i>
    <span class="ix-card-label">Tool Call</span>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="perceive">Agentic AI</div>
    <div class="ix-detail-body">An AI system that takes actions in the world, observes the results, and uses feedback to determine subsequent actions. Distinct from autocomplete (token prediction) and assistant AI (text generation in response to prompts).</div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="reason">The Agentic Loop (PRAO)</div>
    <div class="ix-detail-body">Perceive, Reason, Act, Observe. The four-phase cycle that defines agent operation. Most real tasks involve multiple Agentic Loop cycles.</div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="observe">CLAUDE.md</div>
    <div class="ix-detail-body">The persistent context file that Claude Code reads at the start of every session. The primary mechanism for maintaining continuity between sessions.</div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="neutral">Session context</div>
    <div class="ix-detail-body">The conversation history that accumulates within a session. Does not persist between sessions unless explicitly resumed.</div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="act">Tool call</div>
    <div class="ix-detail-body">The mechanism by which an agent takes actions: reading files, writing files, running bash commands, calling MCP servers. Every agent action is a tool call.</div>
  </div>
</div>

---

## Lab Connection

<div class="ix-diagram" data-component="callout" data-variant="tip">
<p><strong>Up next: Lab 01.</strong> You will observe the Agentic Loop in action by giving Claude Code a real coding task and annotating each tool call with its PRAO phase. You will identify where the agent's reasoning aligns with your expectations, where it diverges, and practice writing a prompt that produces a more directed sequence of tool calls.</p>
</div>

---

## Companion Media (NotebookLM)

- [Module 01 Slide Deck (PDF)](https://notebooklm.google.com/notebook/742e3671-5a55-4420-b2a2-5e960e241b2c)
- [Module 01 Explainer Video (open in Notebook Workspace)](https://notebooklm.google.com/notebook/742e3671-5a55-4420-b2a2-5e960e241b2c)
- [Notebook Workspace (all companion media)](https://notebooklm.google.com/notebook/742e3671-5a55-4420-b2a2-5e960e241b2c)

## Further Reading

### Official Documentation

- [Claude Code Overview (Anthropic)](https://docs.anthropic.com/en/docs/claude-code/overview)
- [Claude Code CLI Reference (Anthropic)](https://docs.anthropic.com/en/docs/claude-code/cli-reference)

### Research Papers

- Yao, S., Zhao, J., Yu, D., Du, N., Shafran, I., Narasimhan, K., & Cao, Y. (2023). ReAct: Synergizing reasoning and acting in language models. *ICLR 2023*. https://arxiv.org/abs/2210.03629

---

[Next Module → Module 02: Claude Code Foundations](/module/02)
