<div class="ix-diagram" data-component="module-hero">
<div class="ix-hero">
<div class="ix-hero-bg"></div>
<div class="ix-hero-module-num">Module 03</div>
<div class="ix-hero-title">Reading Agent Thinking</div>
<div class="ix-hero-subtitle">Learn to read agent traces, recognize tool call patterns, and know exactly when to intervene versus let the agent work</div>
<div class="ix-hero-chips">
<span class="ix-hero-chip">Output Layer Reading</span>
<span class="ix-hero-chip">The Agentic Loop in Practice</span>
<span class="ix-hero-chip">Tool Call Patterns</span>
<span class="ix-hero-chip">Intervention Decisions</span>
<span class="ix-hero-chip">Extended Thinking</span>
</div>
</div>
</div>

# Module 03: Agent Thinking
## Agentic AI Engineering — 3-Day Intensive Course

---

## Overview

Claude Code's transparency lets you watch the agent reason, plan, and act in real time. This module teaches you to read that transparency productively -- scanning traces to catch wrong assumptions early and knowing when to intervene versus when to hold.

<details class="ix-collapse">
<summary>Deep Dive: Why trace reading matters</summary>
<div class="ix-collapse-body">
The most significant operational advantage of Claude Code over previous AI tools is transparency. You can see the reasoning. You can watch the agent build its plan, surface assumptions, discover constraints, and adjust its approach in response to what it learns. This is not incidental -- it is the property that makes agentic engineering a professional discipline rather than a faith exercise.
Engineers who develop fluency with reasoning traces become significantly more effective at directing agents. They catch wrong assumptions early. They know when to let the agent work without interruption. They write better `CLAUDE.md` content because they can see exactly what context the agent lacked. And they can diagnose stuck or looping agents rather than having to restart from scratch.
</div>
</details>

**Learning Objectives:**

1. Read and interpret a Claude Code reasoning trace, identifying the function of each component
2. Map each step in a tool call sequence to its Agentic Loop (PRAO) phase
3. Recognize the common tool call patterns that signal different agent behaviors
4. Distinguish situations requiring intervention from situations where the agent should be allowed to continue
5. Understand what extended thinking provides, when it's valuable, and when it isn't

---

## 3.1 The Transparency Advantage

<div class="ix-diagram" data-component="objective">
  <p>Read and interpret a Claude Code reasoning trace across its three output layers -- thinking, tool calls, and response. Identify the highest-leverage intervention points and know when to act versus when to hold.</p>
</div>

Instead of checking output and reverse-engineering whether the process was sound, you watch the process directly -- assumptions before they become actions, plans before they become commits, mistakes before they become expensive.

<p class="ix-instruct">Predict your answer before revealing the reference reasoning.</p>

<div class="ix-diagram" data-component="predict-reveal" data-diagram-id="m03-transparency-predict" data-xp="8">
  <span class="ix-title">Predict Before Reveal</span>
  <p class="ix-predict-prompt">Before reviewing output layers, predict your highest-leverage intervention moment in an agent run: before tool calls, during tool calls, or after final summary. Explain why.</p>
  <textarea class="ix-predict-input" placeholder="Write your prediction and rationale."></textarea>
  <details class="ix-predict-reveal">
    <summary>Reveal reference reasoning</summary>
    <p>The highest-leverage intervention point is usually before major actions, when assumptions and plan quality are visible in the thinking layer and still cheap to redirect.</p>
  </details>
</div>

### Three Layers of Agent Output

<p class="ix-instruct">Click each card to explore what each output layer contains and when to pay attention.</p>

<div class="ix-diagram" data-component="click-cards" data-diagram-id="agent-output-layers">
  <span class="ix-title">Reading agent output (detailed)</span>

  <div class="ix-card" data-accent="#8b5cf6">
    <i data-lucide="brain" class="ix-card-icon"></i>
    <span class="ix-card-label">Thinking Layer</span>
  </div>

  <div class="ix-card" data-accent="#06b6d4">
    <i data-lucide="sparkles" class="ix-card-icon"></i>
    <span class="ix-card-label">Extended Thinking</span>
  </div>

  <div class="ix-card" data-accent="#6366f1">
    <i data-lucide="wrench" class="ix-card-icon"></i>
    <span class="ix-card-label">Tool Call Layer</span>
  </div>

  <div class="ix-card" data-accent="#10b981">
    <i data-lucide="message-square" class="ix-card-icon"></i>
    <span class="ix-card-label">Response Layer</span>
  </div>

  <!-- Detail: Thinking Layer -->
  <div class="ix-detail-panel" data-phase="reason">
    <div class="ix-detail-header" data-phase="reason">Thinking Layer</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">What it is</div>
        <div class="ix-sec-text">Internal scratchpad where the agent explores possibilities, surfaces assumptions, and builds its task model before acting. Not a performance -- the actual reasoning process, made visible.</div>
      </div>
      <div class="ix-char-grid">
        <div class="ix-char-item"><strong>PRAO Mapping</strong><span>Reason phase</span></div>
        <div class="ix-char-item"><strong>Activates</strong><span>Before every significant action</span></div>
        <div class="ix-char-item"><strong>Visible in</strong><span>Reasoning trace (thinking blocks)</span></div>
        <div class="ix-char-item"><strong>Key signal</strong><span>Plans, assumptions, alternatives</span></div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Engineer oversight</div>
        <div class="ix-sec-text"><i data-lucide="eye" data-phase="warning"></i> Intervene if the agent's assumption about the task is wrong -- before any action is taken</div>
      </div>
    </div>
  </div>

  <!-- Detail: Extended Thinking -->
  <div class="ix-detail-panel" data-phase="act">
    <div class="ix-detail-header" data-phase="act">Extended Thinking</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">What it is</div>
        <div class="ix-sec-text">Deep multi-step reasoning activated for complex problems. The model allocates additional reasoning budget to explore alternatives, backtrack, and refine before committing. Longer planning horizon than standard thinking.</div>
      </div>
      <div class="ix-char-grid">
        <div class="ix-char-item"><strong>PRAO Mapping</strong><span>Reason phase (extended)</span></div>
        <div class="ix-char-item"><strong>Activates when</strong><span>Problem complexity exceeds threshold</span></div>
        <div class="ix-char-item"><strong>Token budget</strong><span>~10k+ thinking tokens</span></div>
        <div class="ix-char-item"><strong>Output</strong><span>Refined plan fed to Tool Call layer</span></div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">When valuable</div>
        <div class="ix-sec-text">Multi-constraint architecture decisions, debugging multi-system failures, trade-off analysis with competing objectives, formal verification tasks</div>
      </div>
    </div>
  </div>

  <!-- Detail: Tool Call Layer -->
  <div class="ix-detail-panel" data-phase="perceive">
    <div class="ix-detail-header" data-phase="perceive">Tool Call Layer</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">What it is</div>
        <div class="ix-sec-text">Concrete actions: Read, Write, Bash, MCP calls. Each tool call is followed by a tool result. This is the action part of the Agentic Loop made visible.</div>
      </div>
      <div class="ix-char-grid">
        <div class="ix-char-item"><strong>PRAO Mapping</strong><span>Act + Observe phases</span></div>
        <div class="ix-char-item"><strong>Contains</strong><span>Read / Write / Bash / MCP calls</span></div>
        <div class="ix-char-item"><strong>Each call</strong><span>Action + result pair</span></div>
        <div class="ix-char-item"><strong>Key signal</strong><span>Patterns reveal agent behavior</span></div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Engineer oversight</div>
        <div class="ix-sec-text"><i data-lucide="eye" data-phase="warning"></i> Detect loop vs. thoroughness -- repeated reads of same file without progress signal an impasse</div>
      </div>
    </div>
  </div>

  <!-- Detail: Response Layer -->
  <div class="ix-detail-panel" data-phase="observe">
    <div class="ix-detail-header" data-phase="observe">Response Layer</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">What it is</div>
        <div class="ix-sec-text">Synthesis narrative -- what the agent reports after completing a unit of work. Draws on thinking and tool call layers to present a coherent "what did I do?" summary.</div>
      </div>
      <div class="ix-char-grid">
        <div class="ix-char-item"><strong>PRAO Mapping</strong><span>Synthesis after loop completes</span></div>
        <div class="ix-char-item"><strong>Contains</strong><span>Summary, recommendations, caveats</span></div>
        <div class="ix-char-item"><strong>Format</strong><span>Conversational output</span></div>
        <div class="ix-char-item"><strong>Danger</strong><span>May omit details visible in trace</span></div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Engineer oversight</div>
        <div class="ix-sec-text"><i data-lucide="eye" data-phase="warning"></i> Cross-check the summary against the actual diff -- the response is a narrative, not proof of correctness</div>
      </div>
    </div>
  </div>
</div>

<p class="ix-instruct">Switch between tabs to practice reading each layer in a real trace. Examine the insight grid for each layer.</p>

<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="m03-trace-layers-practice">
  <span class="ix-title">Layer reading practice: what to watch for in each layer</span>
  <div class="ix-tab" data-tab="Thinking" data-accent="#8b5cf6">
    <pre class="ix-code-block">thinking: I need to understand the current auth architecture
before making changes. Let me check for: auth middleware,
JWT generation/validation, login/logout handlers.
  ...
thinking: Current implementation: single JWT with 7-day expiry
in src/auth/jwt.ts. No refresh token infrastructure.
To implement refresh tokens I need to:
  1. Add refresh token storage (database table)
  2. Short-lived access tokens (15m) + refresh tokens (7d)
  3. Add refresh endpoint
  4. Maintain backward compat for existing long-lived tokens
Uncertainty: refresh token storage. PostgreSQL available,
no Redis. I'll use database unless constrained.</pre>
    <div class="ix-char-grid">
      <div class="ix-char-item"><strong>What to watch for</strong><span>Assumptions, the plan, and uncertainty markers. This agent explicitly calls out what it does not know -- that is calibrated behavior.</span></div>
      <div class="ix-char-item"><strong>Best intervention point</strong><span>Right here. If the plan is wrong (e.g., you want Redis, not Postgres), correct it now -- before any files are changed.</span></div>
      <div class="ix-char-item"><strong>Key signal</strong><span>The agent identifies an ambiguity (storage location) and makes a reasoned default. You can agree or redirect.</span></div>
      <div class="ix-char-item"><strong>Red flag</strong><span>Plans with no uncertainty markers on complex tasks. Overconfident reasoning usually means blind spots.</span></div>
    </div>
  </div>
  <div class="ix-tab" data-tab="Tool calls" data-accent="#f59e0b">
    <pre class="ix-code-block">Read("src/auth/jwt.ts")
-> 47 lines, JWT sign/verify with 7-day expiry
Read("src/middleware/authenticate.ts")
-> 23 lines, express middleware checking req.headers.authorization
Read("src/config/production.ts")
-> JWT_EXPIRY = '7d' as constant
thinking: CLAUDE.md says "never modify config/production.ts"
I'll need a different mechanism for expiry...
Write("src/auth/jwt.ts", ...)
Write("src/auth/refreshToken.ts", ...)  -- new file
Write("src/middleware/authenticate.ts", ...)</pre>
    <div class="ix-char-grid">
      <div class="ix-char-item"><strong>What to watch for</strong><span>The sequence of reads before writes -- is the agent building a complete picture? And constraint discovery: it found the CLAUDE.md rule before violating it.</span></div>
      <div class="ix-char-item"><strong>Pattern check</strong><span>Read x N then Think then Write x N = correct multi-file approach. Agent gathered all info before making changes.</span></div>
      <div class="ix-char-item"><strong>Key signal</strong><span>Agent discovering a constraint mid-task and adapting. This is the Agentic Loop working as designed.</span></div>
      <div class="ix-char-item"><strong>Red flag</strong><span>Writes to files not mentioned in the task scope, or tool calls that repeat the same reads without new writes.</span></div>
    </div>
  </div>
  <div class="ix-tab" data-tab="Response" data-accent="#6366f1">
    <pre class="ix-code-block">I've implemented refresh token authentication:
Changes:
  src/auth/jwt.ts -- access tokens now 15m expiry
  src/auth/refreshToken.ts -- new, handles refresh token
    generation, storage (PostgreSQL), and validation
  src/middleware/authenticate.ts -- updated to handle
    short-lived access tokens
  Existing 7-day tokens remain valid (backward compat)
Note: used PostgreSQL for refresh token storage since
no Redis is configured. Created migration file.</pre>
    <div class="ix-char-grid">
      <div class="ix-char-item"><strong>What to watch for</strong><span>Does the summary match the actual tool calls above? The response should be consistent with what you saw happen.</span></div>
      <div class="ix-char-item"><strong>Your next step</strong><span>Review the diff, run tests yourself, verify backward compatibility actually works. Do not trust the summary alone.</span></div>
      <div class="ix-char-item"><strong>Key signal</strong><span>The agent surfaced its storage decision in the response. Good -- you can evaluate it without re-reading the thinking trace.</span></div>
      <div class="ix-char-item"><strong>Red flag</strong><span>Summary claims "all tests pass" but you did not see a <code>Bash("npm test")</code> in the tool calls. Verify independently.</span></div>
    </div>
  </div>
</div>

<details class="ix-collapse">
<summary>Deep Dive: Why transparency changes the game</summary>
<div class="ix-collapse-body">
<p><strong>You see assumptions before they become code.</strong> The thinking layer reveals what the agent believes about your system -- and you can correct wrong beliefs before they produce wrong changes.</p>
<p><strong>The approval pattern works because plans are legible.</strong> Asking "show me your plan first" is useful precisely because you can read the reasoning, not just the conclusion.</p>
<p><strong>You are accountable for what you approve.</strong> When reasoning is transparent, watching a clearly wrong plan proceed without intervening is an active choice.</p>
</div>
</details>

<p class="ix-instruct">Click each scenario to decide: intervene or hold?</p>

<div class="ix-diagram" data-component="intervention" data-diagram-id="m03-output-intervention">
  <span class="ix-title">When to intervene vs. hold during a trace</span>
  <div class="ix-int-item" data-action="intervene">
    <div class="ix-int-text"><strong>Wrong assumption in thinking</strong> -- the agent states a hypothesis that you know is incorrect. Cheaper to fix before any action is taken.</div>
  </div>
  <div class="ix-int-item" data-action="intervene">
    <div class="ix-int-text"><strong>Wrong scope</strong> -- the agent's plan includes files or systems outside the task boundary. Redirect before writes begin.</div>
  </div>
  <div class="ix-int-item" data-action="hold">
    <div class="ix-int-text"><strong>Unexpected path</strong> -- the agent is doing something you did not anticipate, but the reasoning in the thinking layer looks sound. Read before reacting.</div>
  </div>
  <div class="ix-int-item" data-action="hold">
    <div class="ix-int-text"><strong>Test failures mid-task</strong> -- normal Agentic Loop behavior. The agent will observe the failure and fix it in the next cycle.</div>
  </div>
  <div class="ix-int-item" data-action="hold">
    <div class="ix-int-text"><strong>Reading many files</strong> -- the agent is building context before acting. Multi-file reads before writes signal thoroughness, not confusion.</div>
  </div>
</div>

<p class="ix-instruct">For each scenario, decide your action before revealing the answer.</p>

<div class="ix-diagram" data-component="reveal-quiz" data-diagram-id="m03-trace-reading-quiz">
  <span class="ix-title">What would you do? Trace reading decisions</span>
  <div class="ix-reveal-item" data-answer="intervene" data-label="Intervene" data-variant="scenario">
    <div class="ix-reveal-prompt">The thinking block says "I'll use HS256 for JWT signing" but your CLAUDE.md specifies RS256.</div>
    <div class="ix-reveal-why">Wrong assumption visible before action. Correct it now -- 30 seconds saves 10 minutes of rollback.</div>
  </div>
  <div class="ix-reveal-item" data-answer="hold" data-label="Hold" data-variant="scenario">
    <div class="ix-reveal-prompt">The agent reads 6 files before making any edits. You expected it to start writing after 2.</div>
    <div class="ix-reveal-why">Multi-file reads before writes is the scout pattern -- it is gathering context to avoid breaking dependencies.</div>
  </div>
  <div class="ix-reveal-item" data-answer="intervene" data-label="Intervene" data-variant="scenario">
    <div class="ix-reveal-prompt">The agent starts writing to production config files, but the task scope was limited to tests and documentation.</div>
    <div class="ix-reveal-why">Scope violation. Redirect immediately before any production changes land.</div>
  </div>
  <div class="ix-reveal-item" data-answer="hold" data-label="Hold" data-variant="scenario">
    <div class="ix-reveal-prompt">npm test shows 3 failures after the agent's first edit. The agent begins reading the failing test file.</div>
    <div class="ix-reveal-why">The agent observed the failure and is entering the next Agentic Loop cycle. This is the feedback loop working correctly.</div>
  </div>
  <div class="ix-reveal-item" data-answer="intervene" data-label="Intervene" data-variant="scenario">
    <div class="ix-reveal-prompt">The agent has read the same file three times with thinking blocks that repeat the same unresolved question.</div>
    <div class="ix-reveal-why">Loop detected. Provide a clarifying decision to break the impasse.</div>
  </div>
</div>

<p class="ix-instruct">Step through the trace and read each annotation to understand the agent's reasoning process. Click the step button or press the right arrow key.</p>

<div class="ix-diagram" data-component="agent-trace"
     data-variant="annotated"
     data-diagram-id="m03-reading-trace"
     data-default-mode="manual"
     data-speed="0.5">
  <span class="ix-title">Practice reading: what is the agent's plan?</span>

  <div class="ix-trace-line" data-type="prompt" data-delay="0">
    "The login endpoint returns 500 when the email field is missing. Fix it."
    <span class="ix-trace-annotation">A clear, scoped bug report. Watch how the agent builds a mental model before acting.</span>
  </div>

  <div class="ix-trace-line" data-type="think" data-delay="4000">
    A 500 on missing email likely means the handler is trying to use req.body.email without checking if it exists first. I should look at the login route handler and its validation logic (if any).
    <span class="ix-trace-annotation">KEY SIGNAL: The agent states a hypothesis. This is what you scan for -- is the hypothesis reasonable? Here it is: the handler does not validate inputs. That is a plausible guess for a 500 error.</span>
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="1500" data-prao="perceive">
    Read(src/routes/auth.ts)
    <span class="ix-trace-annotation">It reads the specific file mentioned in the error. Good targeting -- it did not start with a broad directory listing.</span>
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="1500">
    Line 14: const user = await db.users.findByEmail(req.body.email) -- no null check on email
    <span class="ix-trace-annotation">The result confirms the hypothesis. The agent found the bug: req.body.email is used without validation.</span>
  </div>

  <div class="ix-trace-line" data-type="think" data-delay="4000">
    Confirmed: no input validation. The fix should add a check for missing email and return 400 with a clear error message instead of letting the query fail with a 500. Let me also check if there is a validation pattern used elsewhere in this project.
    <span class="ix-trace-annotation">KEY SIGNAL: The agent does not just fix the immediate bug -- it checks for existing patterns. This prevents introducing an inconsistent style. This is the kind of thinking you want to see.</span>
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="1500">
    Read(src/routes/users.ts)
    <span class="ix-trace-annotation">Looking at another route file to find the project's validation pattern. Smart context-gathering.</span>
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="1500">
    Line 8: const schema = z.object({ name: z.string(), email: z.string().email() }) -- uses zod
    <span class="ix-trace-annotation">The agent found the pattern: this project uses zod for validation. It will now follow the same approach for consistency.</span>
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="1500">
    Edit(src/routes/auth.ts) -- added zod schema for login endpoint, returns 400 on validation failure
    <span class="ix-trace-annotation">The fix follows the existing project pattern rather than inventing a new approach. This is why reading other files before acting matters.</span>
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="1500">
    Bash(npm test -- --filter auth)
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="1500">
    All 8 tests passed
  </div>

  <div class="ix-trace-line" data-type="response" data-delay="2500">
    Fixed. Added zod validation to the login endpoint matching the pattern used in users.ts. Missing or invalid email now returns 400 with a descriptive error instead of 500. Tests pass.
    <span class="ix-trace-annotation">The response accurately describes what changed and why. Compare this to the actual tool calls above -- does it match? (Yes.) This verification step is part of professional trace reading.</span>
  </div>
</div>

<p class="ix-instruct">Test your understanding of the three output layers.</p>

<div class="ix-diagram" data-component="quiz" data-diagram-id="m03-output-layers-check" data-xp="14">
  <span class="ix-title">Knowledge Check: Reading Output Layers</span>

  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q1.</strong> You notice a wrong assumption in a thinking block before any write occurs. Best action?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="true">Intervene immediately and correct the assumption</button>
      <button class="ix-quiz-option" data-correct="false">Wait for final response, then decide</button>
      <button class="ix-quiz-option" data-correct="false">Ignore thinking; only diff matters</button>
      <button class="ix-quiz-option" data-correct="false">Restart session without explanation</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: intervene early. Pre-action corrections avoid downstream churn and risky edits.</p>
  </div>

  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q2.</strong> Which layer is most likely to hide omissions if read alone?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">Thinking layer</button>
      <button class="ix-quiz-option" data-correct="false">Tool-call layer</button>
      <button class="ix-quiz-option" data-correct="true">Response layer</button>
      <button class="ix-quiz-option" data-correct="false">None, all layers are equivalent summaries</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: response layer. It is a narrative summary and should be cross-checked against trace + diff.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q3.</strong> The response summary says "I updated the authentication module." Which layer should you check to see exactly what files were changed?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">Response layer -- it describes changes</button>
      <button class="ix-quiz-option" data-correct="false">Thinking layer -- it lists intentions</button>
      <button class="ix-quiz-option" data-correct="true">Tool-call layer -- it shows the actual Read, Write, and Bash operations</button>
      <button class="ix-quiz-option" data-correct="false">Any layer -- they all contain the same information</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: tool-call layer. The response layer is a narrative summary that may omit details. The tool-call layer is the authoritative record of what the agent actually did.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q4.</strong> The thinking layer shows a correct plan, but the tool-call layer reveals the agent wrote to a different file than planned. The response layer says everything went well. Which layer exposed the real problem?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">Thinking layer -- planning errors are always caught there</button>
      <button class="ix-quiz-option" data-correct="true">Tool-call layer -- it revealed the plan-to-action mismatch</button>
      <button class="ix-quiz-option" data-correct="false">Response layer -- it would mention the discrepancy</button>
      <button class="ix-quiz-option" data-correct="false">No layer can catch this -- you need external verification</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: tool-call layer. The thinking layer showed the right intent, and the response layer summarized optimistically. Only by comparing the plan in thinking against the actual operations in tool calls could you catch the mismatch. This is why professional trace reading cross-checks layers rather than trusting any single one.</p>
  </div>
</div>

---

## 3.2 Chain-of-Thought in Practice

<div class="ix-diagram" data-component="objective">
  <p>Map each step in a tool call sequence to its Agentic Loop (PRAO) phase. Recognize how chain-of-thought reasoning surfaces as visible thinking blocks, and use the Agentic Loop state machine to interpret what the agent is doing at any point in a trace.</p>
</div>

Chain-of-thought is the thinking layer made operational -- the model reasons step by step, surfacing its plan and assumptions before committing to action.

<p class="ix-instruct">Switch between tabs to see what happens at each Agentic Loop phase and when to intervene.</p>

<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="prao-state-machine">
  <span class="ix-title">Agentic Loop (PRAO) cycle -- state machine</span>

  <div class="ix-flow-visual">
    <div class="ix-flow-node" data-phase="perceive">
      <i data-lucide="eye"></i> P
    </div>
    <div class="ix-flow-arrow"><i data-lucide="arrow-right"></i></div>
    <div class="ix-flow-node" data-phase="reason">
      <i data-lucide="brain"></i> R
    </div>
    <div class="ix-flow-arrow"><i data-lucide="arrow-right"></i></div>
    <div class="ix-flow-node" data-phase="act">
      <i data-lucide="zap"></i> A
    </div>
    <div class="ix-flow-arrow"><i data-lucide="arrow-right"></i></div>
    <div class="ix-flow-node" data-phase="observe">
      <i data-lucide="search"></i> O
    </div>
    <div class="ix-flow-arrow"><i data-lucide="refresh-cw" data-phase="goal"></i></div>
  </div>

  <div class="ix-tab" data-tab="Perceive" data-accent="#6366f1">
    <div class="ix-section">
      <div class="ix-sec-label">What happens</div>
      <div class="ix-sec-text">The agent reads files, searches the codebase, runs exploratory commands. It builds its model of the task and the current state of the code before reasoning about what to do.</div>
    </div>
    <div class="ix-char-grid">
      <div class="ix-char-item"><strong>Common tool calls</strong><span>Read, Bash(grep/find/ls), Glob</span></div>
      <div class="ix-char-item"><strong>Triggers</strong><span>Task received, new information needed</span></div>
      <div class="ix-char-item"><strong>What to watch</strong><span>Is it reading relevant files?</span></div>
      <div class="ix-char-item"><strong>When to intervene</strong><span>If exploring wrong directory or scope</span></div>
    </div>
  </div>

  <div class="ix-tab" data-tab="Reason" data-accent="#8b5cf6">
    <div class="ix-section">
      <div class="ix-sec-label">What happens</div>
      <div class="ix-sec-text">The agent plans its approach -- identifying constraints, forming hypotheses, choosing between alternatives. This is the thinking layer where assumptions become explicit and plans take shape.</div>
    </div>
    <div class="ix-char-grid">
      <div class="ix-char-item"><strong>Visible in</strong><span>Thinking blocks in the trace</span></div>
      <div class="ix-char-item"><strong>Triggers</strong><span>Sufficient context gathered</span></div>
      <div class="ix-char-item"><strong>What to watch</strong><span>Are assumptions correct?</span></div>
      <div class="ix-char-item"><strong>When to intervene</strong><span>Wrong assumption about task or constraints</span></div>
    </div>
  </div>

  <div class="ix-tab" data-tab="Act" data-accent="#06b6d4">
    <div class="ix-section">
      <div class="ix-sec-label">What happens</div>
      <div class="ix-sec-text">The agent executes its plan: writing files, running commands, calling MCP tools. Each action produces a concrete, observable change in the environment.</div>
    </div>
    <div class="ix-char-grid">
      <div class="ix-char-item"><strong>Common tool calls</strong><span>Write, Edit, Bash(build/run)</span></div>
      <div class="ix-char-item"><strong>Triggers</strong><span>Plan formed during Reason phase</span></div>
      <div class="ix-char-item"><strong>What to watch</strong><span>Does the action match the plan?</span></div>
      <div class="ix-char-item"><strong>When to intervene</strong><span>Destructive operations, wrong file targets</span></div>
    </div>
  </div>

  <div class="ix-tab" data-tab="Observe" data-accent="#10b981">
    <div class="ix-section">
      <div class="ix-sec-label">What happens</div>
      <div class="ix-sec-text">The agent checks the results of its actions: running tests, reading compiler output, verifying file contents. Results feed back into the next Perceive phase or trigger task completion.</div>
    </div>
    <div class="ix-char-grid">
      <div class="ix-char-item"><strong>Common tool calls</strong><span>Bash(npm test/tsc), Read (verify)</span></div>
      <div class="ix-char-item"><strong>Transitions</strong><span>Back to Perceive (loop) or Done</span></div>
      <div class="ix-char-item"><strong>What to watch</strong><span>Does it react correctly to failures?</span></div>
      <div class="ix-char-item"><strong>When to intervene</strong><span>Ignoring test failures, infinite retry loops</span></div>
    </div>
  </div>
</div>

<p class="ix-instruct">Watch the terminal replay to see how reasoning precedes action in a real refactoring task.</p>

<div class="ix-diagram" data-component="terminal-sim" data-diagram-id="m03-reasoning-live" data-xp="14">
  <span class="ix-title">Terminal Simulation: Reasoning Before Action</span>

  <div class="ix-terminal-step">
    <div class="ix-term-cmd">Prompt: "Refactor auth flow for refresh tokens while preserving active sessions."</div>
    <pre class="ix-term-out">Thinking: I need current token issuance, middleware validation paths, and storage constraints before edits.</pre>
    <p class="ix-term-note">Perceive starts with map-building, not edits.</p>
  </div>

  <div class="ix-terminal-step">
    <div class="ix-term-cmd">Read(src/auth/jwt.ts) • Read(src/middleware/authenticate.ts)</div>
    <pre class="ix-term-out">Result: current design uses single 7-day JWT; no refresh store exists.</pre>
    <p class="ix-term-note">Evidence collection drives planning quality.</p>
  </div>

  <div class="ix-terminal-step">
    <div class="ix-term-cmd">Thinking: "Need refresh storage. PostgreSQL available; no Redis in this project."</div>
    <pre class="ix-term-out">Plan: add refresh table + endpoint + middleware update, then run tests.</pre>
    <p class="ix-term-note">Reason phase exposes assumptions and chosen trade-offs.</p>
  </div>

  <div class="ix-terminal-step">
    <div class="ix-term-cmd">Constraint check: Read(CLAUDE.md)</div>
    <pre class="ix-term-out">Found rule: never modify config/production.ts
Adapt plan: introduce configurable expiry via existing auth module, not production config.</pre>
    <p class="ix-term-note">Constraint discovery mid-reasoning prevents expensive rework.</p>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="tip">
  <p><strong>The thinking layer is pre-action quality control.</strong> It surfaces assumptions, reveals ambiguity, and catches conflicts before writes occur. That is the cheapest correction point in the Agentic Loop.</p>
</div>

---

## 3.3 Reading Tool Call Sequences

<div class="ix-diagram" data-component="objective">
  <p>Recognize the five common tool call patterns that signal different agent behaviors. Distinguish healthy progress from stuck loops, and know when each pattern warrants intervention.</p>
</div>

A sequence of tool calls tells a story about what the agent is doing and why. Learning to read these patterns is the skill that lets you oversee an agent without becoming a bottleneck.

<p class="ix-instruct">Click each card to explore the five tool call patterns and when each warrants intervention.</p>

<div class="ix-diagram" data-component="click-cards" data-diagram-id="tool-call-patterns">
  <span class="ix-title">Five tool call patterns</span>

  <div class="ix-card" data-accent="#6366f1">
    <i data-lucide="file-text" class="ix-card-icon"></i>
    <span class="ix-card-label">Single File</span>
  </div>

  <div class="ix-card" data-accent="#8b5cf6">
    <i data-lucide="files" class="ix-card-icon"></i>
    <span class="ix-card-label">Multi-File</span>
  </div>

  <div class="ix-card" data-accent="#06b6d4">
    <i data-lucide="search" class="ix-card-icon"></i>
    <span class="ix-card-label">Exploration</span>
  </div>

  <div class="ix-card" data-accent="#10b981">
    <i data-lucide="check-circle" class="ix-card-icon"></i>
    <span class="ix-card-label">Act & Verify</span>
  </div>

  <div class="ix-card" data-accent="#ef4444">
    <i data-lucide="alert-circle" class="ix-card-icon"></i>
    <span class="ix-card-label">Stuck</span>
  </div>

  <!-- Detail: Single File -->
  <div class="ix-detail-panel" data-phase="perceive">
    <div class="ix-detail-header" data-phase="perceive">Pattern 1: Single File</div>
    <div class="ix-detail-body">
      <div class="ix-flow-visual">
        <div class="ix-flow-node" data-phase="perceive">
          <i data-lucide="eye"></i> Read
        </div>
        <div class="ix-flow-arrow"><i data-lucide="arrow-right"></i></div>
        <div class="ix-flow-node" data-phase="reason">
          <i data-lucide="brain"></i> Think
        </div>
        <div class="ix-flow-arrow"><i data-lucide="arrow-right"></i></div>
        <div class="ix-flow-node" data-phase="observe">
          <i data-lucide="file-output"></i> Write
        </div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">What it signals</div>
        <div class="ix-sec-text">Focused, well-understood task. One file, one change, one Agentic Loop cycle. The simplest and fastest pattern.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">When to intervene</div>
        <div class="ix-sec-text">Rarely. This pattern is almost always correct and efficient.</div>
      </div>
    </div>
  </div>

  <!-- Detail: Multi-File -->
  <div class="ix-detail-panel" data-phase="reason">
    <div class="ix-detail-header" data-phase="reason">Pattern 2: Multi-File</div>
    <div class="ix-detail-body">
      <div class="ix-flow-visual">
        <div class="ix-flow-node" data-phase="perceive">
          <i data-lucide="eye"></i> Read xN
        </div>
        <div class="ix-flow-arrow"><i data-lucide="arrow-right"></i></div>
        <div class="ix-flow-node" data-phase="reason">
          <i data-lucide="brain"></i> Think
        </div>
        <div class="ix-flow-arrow"><i data-lucide="arrow-right"></i></div>
        <div class="ix-flow-node" data-phase="observe">
          <i data-lucide="file-output"></i> Write xN
        </div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">What it signals</div>
        <div class="ix-sec-text">The agent is gathering all information before acting -- correct behavior for tasks with dependencies between files. Avoids making changes that break related files it hasn't read yet.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">When to intervene</div>
        <div class="ix-sec-text">If the agent is reading files that aren't relevant to the task scope.</div>
      </div>
    </div>
  </div>

  <!-- Detail: Exploration -->
  <div class="ix-detail-panel" data-phase="act">
    <div class="ix-detail-header" data-phase="act">Pattern 3: Exploration</div>
    <div class="ix-detail-body">
      <div class="ix-flow-visual">
        <div class="ix-flow-node" data-phase="act">
          <i data-lucide="terminal"></i> Bash
        </div>
        <div class="ix-flow-arrow"><i data-lucide="arrow-right"></i></div>
        <div class="ix-flow-node" data-phase="act">
          <i data-lucide="terminal"></i> Bash
        </div>
        <div class="ix-flow-arrow"><i data-lucide="arrow-right"></i></div>
        <div class="ix-flow-node" data-phase="act">
          <i data-lucide="terminal"></i> Bash
        </div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">What it signals</div>
        <div class="ix-sec-text">Pure Perceive phase -- the agent is building a map of the environment. Common at task start or after discovering something unexpected. This is correct behavior.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">When to intervene</div>
        <div class="ix-sec-text">If exploration never transitions to action, the agent may be stuck. Watch for the shift from Perceive to Reason.</div>
      </div>
    </div>
  </div>

  <!-- Detail: Act & Verify -->
  <div class="ix-detail-panel" data-phase="observe">
    <div class="ix-detail-header" data-phase="observe">Pattern 4: Act & Verify</div>
    <div class="ix-detail-body">
      <div class="ix-flow-visual">
        <div class="ix-flow-node" data-phase="perceive">
          <i data-lucide="eye"></i> Read
        </div>
        <div class="ix-flow-arrow"><i data-lucide="arrow-right"></i></div>
        <div class="ix-flow-node" data-phase="observe">
          <i data-lucide="file-output"></i> Write
        </div>
        <div class="ix-flow-arrow"><i data-lucide="arrow-right"></i></div>
        <div class="ix-flow-node" data-phase="act">
          <i data-lucide="terminal"></i> Test
        </div>
        <div class="ix-flow-arrow"><i data-lucide="arrow-right"></i></div>
        <div class="ix-flow-node" data-phase="perceive">
          <i data-lucide="eye"></i> Verify
        </div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">What it signals</div>
        <div class="ix-sec-text">Disciplined, professional behavior. The agent acts then observes the effects. A Read-Write-Read-Write cycle on the same file is iterating toward correctness -- fine until iterations stop converging.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">When to intervene</div>
        <div class="ix-sec-text">Only if the test-fix cycle doesn't converge after 2-3 iterations -- that signals a loop, not refinement.</div>
      </div>
    </div>
  </div>

  <!-- Detail: Stuck -->
  <div class="ix-detail-panel" data-phase="error">
    <div class="ix-detail-header" data-phase="error">Pattern 5: Stuck</div>
    <div class="ix-detail-body">
      <div class="ix-flow-visual">
        <div class="ix-flow-node" data-phase="error">
          <i data-lucide="brain"></i> Think
        </div>
        <div class="ix-flow-arrow"><i data-lucide="arrow-right"></i></div>
        <div class="ix-flow-node" data-phase="error">
          <i data-lucide="brain"></i> Think
        </div>
        <div class="ix-flow-arrow"><i data-lucide="arrow-right"></i></div>
        <div class="ix-flow-node" data-phase="error">
          <i data-lucide="brain"></i> Think
        </div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">What it signals</div>
        <div class="ix-sec-text">The agent is at an impasse -- genuine ambiguity it cannot resolve with available information. Repeated thinking without action means it is deliberating in circles rather than surfacing the question.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">When to intervene</div>
        <div class="ix-sec-text">Immediately. Provide a clarifying statement or answer the question the agent is visibly circling around. After 2-3 unproductive thinking cycles, redirect.</div>
      </div>
    </div>
  </div>
</div>

<p class="ix-instruct">Step through both traces side by side. Compare how healthy progress differs from a stuck loop. Use the step button or right arrow key.</p>

<div class="ix-diagram" data-component="agent-trace"
     data-variant="compare"
     data-diagram-id="m03-intervention-signals"
     data-default-mode="manual"
     data-speed="0.5">
  <span class="ix-title">Healthy progress vs stuck loop -- when to intervene</span>

  <div class="ix-trace-group" data-label="Healthy: making progress">
    <div class="ix-trace-line" data-type="prompt" data-delay="0">
      "Refactor the auth module to separate concerns."
    </div>
    <div class="ix-trace-line" data-type="tool" data-delay="1500">
      Read(src/auth.ts)
    </div>
    <div class="ix-trace-line" data-type="think" data-delay="3500">
      This file handles validation, token generation, and middleware. I will split into three files.
    </div>
    <div class="ix-trace-line" data-type="tool" data-delay="1500">
      Write(src/auth/validate.ts)
    </div>
    <div class="ix-trace-line" data-type="tool" data-delay="1500">
      Write(src/auth/tokens.ts)
    </div>
    <div class="ix-trace-line" data-type="tool" data-delay="1500">
      Write(src/auth/middleware.ts)
    </div>
    <div class="ix-trace-line" data-type="tool" data-delay="1500">
      Bash(npm test)
    </div>
    <div class="ix-trace-line" data-type="result" data-delay="1500">
      All tests passed
    </div>
  </div>

  <div class="ix-trace-group" data-label="Stuck: intervene here">
    <div class="ix-trace-line" data-type="prompt" data-delay="0">
      "Refactor the auth module to separate concerns."
    </div>
    <div class="ix-trace-line" data-type="tool" data-delay="1500">
      Read(src/auth.ts)
    </div>
    <div class="ix-trace-line" data-type="think" data-delay="3500">
      This file is complex. I need to understand all the dependencies before I can split it.
    </div>
    <div class="ix-trace-line" data-type="tool" data-delay="1500">
      Read(src/auth.ts)
    </div>
    <div class="ix-trace-line" data-type="think" data-delay="3500">
      There are many interconnected functions. Let me re-read to map the dependency graph.
    </div>
    <div class="ix-trace-line" data-type="tool" data-delay="1500">
      Read(src/auth.ts)
    </div>
    <div class="ix-trace-line" data-type="think" data-delay="3500">
      I am still not sure how to split the circular dependencies between validateToken and refreshToken...
    </div>
    <div class="ix-trace-line" data-type="error" data-delay="2500">
      [Three reads of the same file, zero writes. The agent is stuck in a perception loop. Time to intervene with a specific instruction like "Split into validate.ts, tokens.ts, and middleware.ts".]
    </div>
  </div>
</div>

<p class="ix-instruct">Test your pattern recognition skills.</p>

<div class="ix-diagram" data-component="quiz" data-diagram-id="m03-pattern-check" data-xp="18">
  <span class="ix-title">Pattern Recognition Drill</span>

  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q1.</strong> Sequence: <code>Read(auth.ts)</code> → <code>Read(auth.test.ts)</code> → <code>Write(auth.ts)</code> → <code>Bash(npm test)</code>. Best label?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="true">Act-and-verify progression</button>
      <button class="ix-quiz-option" data-correct="false">Stuck loop</button>
      <button class="ix-quiz-option" data-correct="false">Pure exploration only</button>
      <button class="ix-quiz-option" data-correct="false">Authority clarification request</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: act-and-verify. Evidence changes between steps and converges via tests.</p>
  </div>

  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q2.</strong> Sequence: <code>Read(auth.ts)</code> -- same concern in thinking -- <code>Read(auth.ts)</code> -- same concern again. Best interpretation?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">Normal thoroughness, do nothing</button>
      <button class="ix-quiz-option" data-correct="true">Loop risk; intervene with scoped guidance</button>
      <button class="ix-quiz-option" data-correct="false">Guaranteed bug fix in progress</button>
      <button class="ix-quiz-option" data-correct="false">Signal to switch to non-interactive mode</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: loop risk. Repeated same-file reads without new evidence is a strong intervention signal.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q3.</strong> Sequence: <code>Read(config.ts)</code> followed by a thinking block: "I need to understand the deployment setup before making changes." Then <code>Read(deploy.yml)</code>. Best label?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="true">Context-gathering before action -- healthy exploration</button>
      <button class="ix-quiz-option" data-correct="false">Stuck loop -- two reads with no write</button>
      <button class="ix-quiz-option" data-correct="false">Authority clarification request</button>
      <button class="ix-quiz-option" data-correct="false">The agent is ignoring its task</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: healthy exploration. The key difference from a stuck loop is that each read targets a different file and the thinking shows new information being gathered. Stuck loops repeat the same read with the same concern.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q4.</strong> Sequence: <code>Write(auth.ts)</code> followed by <code>Bash(npm test)</code>, then <code>Write(auth.ts)</code> again, then <code>Bash(npm test)</code> again with all tests passing both times. Is this a stuck loop?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">Yes -- it repeated the same write-test cycle</button>
      <button class="ix-quiz-option" data-correct="true">No -- if the second write changed different content, this is iterative refinement</button>
      <button class="ix-quiz-option" data-correct="false">Yes -- tests passed the first time so the second cycle was wasted</button>
      <button class="ix-quiz-option" data-correct="false">Cannot determine without seeing the thinking layer</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: not necessarily a loop. The same pattern of write-then-test can be either productive iteration or a stuck loop. The distinguishing factor is whether the writes contain different content. If the agent is making incremental improvements (e.g., first fix the bug, then add validation), this is the act-and-verify progression working correctly.</p>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="warning">
  <p><strong>Stuck detection rule of thumb:</strong> If you see the same file read three times without an intervening write, and each thinking block covers the same ground, the agent is looping. Intervene with a specific instruction like "Split into validate.ts, tokens.ts, and middleware.ts" rather than waiting for it to resolve on its own.</p>
</div>

<p class="ix-instruct">Compare these two traces side by side. Same number of reads -- very different behavior.</p>

<div class="ix-diagram" data-component="compare" data-diagram-id="m03-looping-vs-thoroughness" role="group" aria-label="Comparison of thoroughness versus looping traces">
  <span class="ix-title">Looping vs thoroughness</span>
  <div data-col="left" data-label="Thoroughness" data-phase="success">
    <pre class="ix-code-block">Read("src/auth/jwt.ts")
thinking: JWT module found. Uses HS256.
  -&gt; discovered: imports from ./config
Read("src/auth/config.ts")       -- new file
thinking: config exports JWT_SECRET and EXPIRY.
  -&gt; discovered: references userService
Read("src/services/userService.ts")  -- new file
thinking: userService uses jwt.verify in getUser.
  -&gt; discovered: test file exists
Read("src/auth/jwt.test.ts")     -- new file
thinking: tests cover sign/verify but not refresh.
Now I have the full picture. Planning changes...</pre>
    <div class="ix-compare-verdict" data-phase="success">Each read is a <strong>new file</strong> discovered from the previous one. Thinking covers <strong>new ground</strong> each time. The agent is building a coherent model. Let it work.</div>
  </div>
  <div data-col="right" data-label="Looping" data-phase="error">
    <pre class="ix-code-block">Read("src/auth/jwt.ts")
thinking: could use approach A (RS256)...
  -&gt; doesn't resolve, considers approach B
Read("src/auth/jwt.ts")          -- same file
thinking: approach B would work, but what about
  backward compatibility? Maybe approach A...
Read("src/auth/jwt.ts")          -- same file again
thinking: if I use approach A, the config issue...
  -&gt; same reasoning, no new conclusion
Read("src/auth/jwt.ts")          -- same file again
thinking: not sure whether A or B. Perhaps...</pre>
    <div class="ix-compare-verdict" data-phase="error">Same file read repeatedly. Thinking <strong>rehearses the same options</strong> without reaching a conclusion. No new information being gathered. The agent is stuck -- <strong>intervene with a decision</strong>.</div>
  </div>
</div>

<details class="ix-collapse">
<summary>The four diagnostic rules for looping vs thoroughness</summary>
<div class="ix-collapse-body">
<p><strong>1. Are the reads hitting new files?</strong> New files = thoroughness. Same file without intervening writes = likely loop.</p>
<p><strong>2. Is the thinking covering new ground?</strong> New observations, new files discovered, new constraints identified = thoroughness. Same options reconsidered = loop.</p>
<p><strong>3. Has there been a write between repeated reads?</strong> Re-reading after a write makes sense -- the content changed. Re-reading without a write = the agent is looking for something it already found.</p>
<p><strong>4. Your intervention for a loop:</strong> Answer the question the agent is circling. "Use RS256, store refresh tokens in PostgreSQL, maintain backward compatibility for existing tokens." Specific decisions break loops.</p>
</div>
</details>

<p class="ix-instruct">Choose the correct pattern label for each terminal sequence.</p>

<div class="ix-diagram" data-component="scenario-quiz" data-diagram-id="m03-pattern-recognition-sim">
  <span class="ix-title">Pattern recognition: identify the tool call pattern</span>
  <div class="ix-scenario" data-correct="2">
    <div class="ix-scenario-terminal">
      <div class="ix-term-line" data-type="prompt">> Add input validation to the user registration endpoint</div>
      <div class="ix-term-line" data-type="tool">  Read("src/routes/users.ts")</div>
      <div class="ix-term-line" data-type="tool">  Read("src/routes/products.ts")</div>
      <div class="ix-term-line" data-type="tool">  Read("src/middleware/validate.ts")</div>
      <div class="ix-term-line" data-type="thinking">  thinking: found zod validation pattern in products.ts, will follow same approach...</div>
      <div class="ix-term-line" data-type="tool">  Write("src/routes/users.ts")</div>
    </div>
    <div class="ix-scenario-question">What pattern is this agent demonstrating?</div>
    <div class="ix-scenario-choice" data-rating="wrong">Stuck loop -- reading too many files before acting</div>
    <div class="ix-scenario-choice" data-rating="neutral">Single-file edit -- just one file changed</div>
    <div class="ix-scenario-choice" data-rating="correct">Multi-file scout -- gathering context before a targeted edit</div>
    <div class="ix-scenario-feedback"><strong>Multi-file scout pattern.</strong> The agent reads related files to discover the existing validation pattern before writing. Each read brings new evidence (route structure, existing validation middleware, established conventions). This is healthy dependency-aware planning.</div>
  </div>
  <div class="ix-scenario" data-correct="0">
    <div class="ix-scenario-terminal">
      <div class="ix-term-line" data-type="prompt">> Refactor the auth module to separate concerns</div>
      <div class="ix-term-line" data-type="tool">  Read("src/auth.ts")</div>
      <div class="ix-term-line" data-type="thinking">  thinking: complex file, need to understand all dependencies...</div>
      <div class="ix-term-line" data-type="tool">  Read("src/auth.ts")</div>
      <div class="ix-term-line" data-type="thinking">  thinking: still mapping the circular dependency between validate and refresh...</div>
      <div class="ix-term-line" data-type="tool">  Read("src/auth.ts")</div>
      <div class="ix-term-line" data-type="thinking">  thinking: I'm not sure how to resolve the circular reference...</div>
    </div>
    <div class="ix-scenario-question">What pattern is this, and what should you do?</div>
    <div class="ix-scenario-choice" data-rating="correct">Stuck loop -- intervene with specific decomposition guidance</div>
    <div class="ix-scenario-choice" data-rating="neutral">Thoroughness -- it is being careful, let it continue</div>
    <div class="ix-scenario-choice" data-rating="wrong">Act-and-verify -- the agent is iterating toward correctness</div>
    <div class="ix-scenario-feedback"><strong>Stuck loop.</strong> Three reads of the same file with no writes and thinking that revisits the same concern. The agent cannot resolve the ambiguity on its own. Intervene with a specific instruction: "Split into validate.ts, tokens.ts, and middleware.ts -- break the circular dependency by having middleware import from both."</div>
  </div>
  <div class="ix-scenario" data-correct="1">
    <div class="ix-scenario-terminal">
      <div class="ix-term-line" data-type="prompt">> Fix the type errors in the auth module</div>
      <div class="ix-term-line" data-type="tool">  Read("src/auth/jwt.ts")</div>
      <div class="ix-term-line" data-type="tool">  Write("src/auth/jwt.ts")</div>
      <div class="ix-term-line" data-type="tool">  Bash("npx tsc --noEmit")</div>
      <div class="ix-term-line" data-type="fail">  -> 2 errors remaining</div>
      <div class="ix-term-line" data-type="tool">  Read("src/auth/jwt.ts")</div>
      <div class="ix-term-line" data-type="tool">  Write("src/auth/jwt.ts")</div>
      <div class="ix-term-line" data-type="tool">  Bash("npx tsc --noEmit")</div>
      <div class="ix-term-line" data-type="success">  -> 0 errors</div>
    </div>
    <div class="ix-scenario-question">What pattern is this?</div>
    <div class="ix-scenario-choice" data-rating="wrong">Stuck loop -- it had to edit the same file twice</div>
    <div class="ix-scenario-choice" data-rating="correct">Act-and-verify -- iterating toward correctness with test feedback</div>
    <div class="ix-scenario-choice" data-rating="neutral">Exploration -- the agent is still learning the codebase</div>
    <div class="ix-scenario-feedback"><strong>Act-and-verify pattern.</strong> Read-Write-Test cycles with converging results (errors went from 2 to 0). Each iteration makes measurable progress. This is the Agentic Loop feedback loop working as designed -- the agent observes test results and corrects in the next cycle.</div>
  </div>
  <div class="ix-scenario" data-correct="0">
    <div class="ix-scenario-terminal">
      <div class="ix-term-line" data-type="prompt">> Set up the development environment for the new service</div>
      <div class="ix-term-line" data-type="tool">  Bash("ls src/")</div>
      <div class="ix-term-line" data-type="tool">  Bash("cat package.json")</div>
      <div class="ix-term-line" data-type="tool">  Bash("cat tsconfig.json")</div>
      <div class="ix-term-line" data-type="tool">  Bash("ls -la .env*")</div>
      <div class="ix-term-line" data-type="tool">  Bash("cat docker-compose.yml")</div>
    </div>
    <div class="ix-scenario-question">Five sequential Bash commands with no writes. What is happening?</div>
    <div class="ix-scenario-choice" data-rating="correct">Exploration phase -- building a map of the project before acting</div>
    <div class="ix-scenario-choice" data-rating="wrong">The agent is stuck and needs redirection</div>
    <div class="ix-scenario-choice" data-rating="neutral">The agent is wasting tokens on unnecessary reads</div>
    <div class="ix-scenario-feedback"><strong>Exploration pattern.</strong> Pure Perceive phase at task start. Each command examines a different aspect of the project (source structure, dependencies, TypeScript config, environment, infrastructure). This is correct behavior for an unfamiliar project -- the agent builds a comprehensive map before planning any changes.</div>
  </div>
</div>

---

## 3.4 Clarification Requests: A Feature, Not a Bug

<div class="ix-diagram" data-component="objective">
  <p>Distinguish the three types of clarifying questions -- scope, authority, and context -- and decide whether to answer in the conversation or promote the decision to CLAUDE.md for future sessions.</p>
</div>

Clarifying questions from a well-calibrated agent are a feature, not a failure. The alternative is confident wrong assumptions -- harder to catch than explicit questions.

<p class="ix-instruct">Predict the clarification type and quality bar before revealing the answer.</p>

<div class="ix-diagram" data-component="predict-reveal" data-diagram-id="m03-clarification-predict" data-xp="10">
  <span class="ix-title">Predict First: Which Clarification Type Is This?</span>
  <p class="ix-predict-prompt">Prompt scenario: "I can store refresh tokens in PostgreSQL or Redis. Which should I use?" Predict the clarification type and the quality bar for your answer.</p>
  <textarea class="ix-predict-input" placeholder="Type + what your answer should include."></textarea>
  <details class="ix-predict-reveal">
    <summary>Reveal</summary>
    <p>This is authority clarification. A strong answer picks one path, states why, and records it in CLAUDE.md if it will recur.</p>
  </details>
</div>

<p class="ix-instruct">For each question, classify it as scope, authority, or context before revealing the answer.</p>

<div class="ix-diagram" data-component="reveal-quiz" data-diagram-id="m03-clarification-type-quiz">
  <span class="ix-title">Classify the clarification: scope, authority, or context?</span>
  <div class="ix-reveal-item" data-answer="scope" data-label="Scope" data-variant="scenario">
    <div class="ix-reveal-prompt">"Should I also update the logout endpoint to invalidate refresh tokens, or handle that separately?"</div>
    <div class="ix-reveal-why">The agent is uncertain about task boundaries. Answer with a specific scope decision and move on.</div>
  </div>
  <div class="ix-reveal-item" data-answer="authority" data-label="Authority" data-variant="scenario">
    <div class="ix-reveal-prompt">"For refresh token storage, I can use PostgreSQL (new table) or Redis (in-memory, not persistent). Which do you prefer?"</div>
    <div class="ix-reveal-why">Architectural decision the agent correctly escalates rather than making silently. Answer and consider adding to CLAUDE.md.</div>
  </div>
  <div class="ix-reveal-item" data-answer="context" data-label="Context" data-variant="scenario">
    <div class="ix-reveal-prompt">"The current tests use a mock JWT library. Should the new refresh token tests use the same mock or test with real JWT operations?"</div>
    <div class="ix-reveal-why">Testing philosophy question the agent cannot infer from code alone. Answer and add to CLAUDE.md if it is a standing convention.</div>
  </div>
  <div class="ix-reveal-item" data-answer="scope" data-label="Scope" data-variant="scenario">
    <div class="ix-reveal-prompt">"You asked me to add error handling. Should I also add input validation, or only catch existing errors?"</div>
    <div class="ix-reveal-why">Task boundary question. The agent found a related improvement and is asking whether to include it.</div>
  </div>
  <div class="ix-reveal-item" data-answer="authority" data-label="Authority" data-variant="scenario">
    <div class="ix-reveal-prompt">"I can implement this as a middleware or as a decorator pattern. Both work, but they have different testing tradeoffs. Which approach?"</div>
    <div class="ix-reveal-why">Design decision between valid alternatives. The agent identified the tradeoff and escalated correctly.</div>
  </div>
</div>

<p class="ix-instruct">Switch between the three question types to see example questions, productive vs unproductive answers, and whether to record the decision.</p>

<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="m03-clarifying-answers">
  <span class="ix-title">How to answer each clarification type</span>
  <div class="ix-tab" data-tab="Scope" data-accent="#6366f1">
    <div class="ix-section">
      <div class="ix-sec-label">Agent asks</div>
      <div class="ix-sec-text"><code>"Should I also update the logout endpoint to invalidate refresh tokens, or is that a separate task?"</code></div>
    </div>
    <div class="ix-char-grid">
      <div class="ix-char-item" data-phase="success"><strong>Productive</strong><span>"Include logout -- invalidate the refresh token in the database when the user logs out. That is part of this task."</span></div>
      <div class="ix-char-item" data-phase="error"><strong>Unproductive</strong><span>"Do what makes sense." Forces the agent to guess at scope. It may include logout (adding scope) or skip it (missing critical work).</span></div>
    </div>
    <p class="ix-note"><strong>Record to CLAUDE.md?</strong> No -- this is a one-off scope decision for this task. If you find yourself repeatedly answering scope questions about what "auth refactor" includes, then yes.</p>
  </div>
  <div class="ix-tab" data-tab="Authority" data-accent="#8b5cf6">
    <div class="ix-section">
      <div class="ix-sec-label">Agent asks</div>
      <div class="ix-sec-text"><code>"Store refresh tokens in PostgreSQL (new table, persistent, queryable) or in-memory store (simpler, faster, but not persistent across restarts)?"</code></div>
    </div>
    <div class="ix-char-grid">
      <div class="ix-char-item" data-phase="success"><strong>Productive</strong><span>"Use PostgreSQL -- we do not have Redis in production, and refresh tokens need to survive restarts. Create a new refresh_tokens table."</span></div>
      <div class="ix-char-item" data-phase="error"><strong>Unproductive</strong><span>"Whatever you think is best." This is an architectural decision the agent correctly escalated. "Whatever you think" delegates authority for a choice that affects production infrastructure.</span></div>
    </div>
    <p class="ix-note"><strong>Record to CLAUDE.md?</strong> Yes -- this is a standing architectural decision. Add under Decided: "Refresh tokens stored in PostgreSQL (refresh_tokens table). No Redis in production."</p>
  </div>
  <div class="ix-tab" data-tab="Context" data-accent="#06b6d4">
    <div class="ix-section">
      <div class="ix-sec-label">Agent asks</div>
      <div class="ix-sec-text"><code>"Should new refresh token tests use the existing JWT mock (fast, isolated) or test with real JWT sign/verify operations (slower, but catches encoding issues)?"</code></div>
    </div>
    <div class="ix-char-grid">
      <div class="ix-char-item" data-phase="success"><strong>Productive</strong><span>"Use real JWT operations for the refresh token tests -- we have had encoding bugs before. Keep the existing tests with mocks as they are."</span></div>
      <div class="ix-char-item" data-phase="error"><strong>Unproductive</strong><span>"Follow the existing test patterns." The agent is asking precisely because existing patterns do not clearly apply to this new case.</span></div>
    </div>
    <p class="ix-note"><strong>Record to CLAUDE.md?</strong> Yes, if it is a standing convention -- add under Conventions: "Auth tests use real JWT operations, not mocks. Other tests can use mocks." If one-off, leave in conversation.</p>
  </div>
</div>

### When to Answer in the Conversation vs. Add to `CLAUDE.md`

<p class="ix-instruct">Click to expand each branch of the decision tree to see the recommended action.</p>

<div class="ix-diagram" data-component="decision-tree" data-diagram-id="clarification-decision">
  <span class="ix-title">Clarification question decision tree</span>

  <div class="ix-tree-node" data-phase="perceive">
    <i data-lucide="chevron-right" data-phase="perceive"></i>
    <span class="ix-tree-node-text"><i data-lucide="message-circle" data-phase="perceive"></i> <strong>Agent asks a clarifying question -- what type?</strong></span>
  </div>
  <div class="ix-tree-children">
    <div class="ix-tree-node" data-phase="perceive">
      <i data-lucide="chevron-right" data-phase="perceive"></i>
      <span class="ix-tree-node-text"><i data-lucide="maximize-2" data-phase="perceive"></i> <strong data-phase="perceive">Scope</strong> -- uncertain about task boundaries. "Should I also update the logout endpoint?"</span>
    </div>
    <div class="ix-tree-children">
      <div class="ix-tree-node" data-phase="neutral">
        <i data-lucide="chevron-right" data-phase="neutral"></i>
        <span class="ix-tree-node-text">Will this scope decision come up again in future sessions?</span>
      </div>
      <div class="ix-tree-children">
        <div class="ix-tree-node" data-phase="success">
          <i data-lucide="file-plus" data-phase="success"></i>
          <span class="ix-tree-node-text" data-phase="success"><strong>Yes</strong> -- Answer + write the scope convention to CLAUDE.md</span>
        </div>
        <div class="ix-tree-node" data-phase="neutral">
          <i data-lucide="message-square" data-phase="neutral"></i>
          <span class="ix-tree-node-text"><strong>No</strong> -- Answer in conversation only and move on</span>
        </div>
      </div>
    </div>
    <div class="ix-tree-node" data-phase="reason">
      <i data-lucide="chevron-right" data-phase="reason"></i>
      <span class="ix-tree-node-text"><i data-lucide="shield" data-phase="reason"></i> <strong data-phase="reason">Authority</strong> -- choice between approaches. "PostgreSQL table or in-memory store?"</span>
    </div>
    <div class="ix-tree-children">
      <div class="ix-tree-node" data-phase="neutral">
        <i data-lucide="chevron-right" data-phase="neutral"></i>
        <span class="ix-tree-node-text">Will this architectural decision come up again?</span>
      </div>
      <div class="ix-tree-children">
        <div class="ix-tree-node" data-phase="success">
          <i data-lucide="file-plus" data-phase="success"></i>
          <span class="ix-tree-node-text" data-phase="success"><strong>Yes</strong> -- Answer + write architectural decision to CLAUDE.md</span>
        </div>
        <div class="ix-tree-node" data-phase="neutral">
          <i data-lucide="message-square" data-phase="neutral"></i>
          <span class="ix-tree-node-text"><strong>No</strong> -- Answer in conversation only</span>
        </div>
      </div>
    </div>
    <div class="ix-tree-node" data-phase="act">
      <i data-lucide="chevron-right" data-phase="act"></i>
      <span class="ix-tree-node-text"><i data-lucide="info" data-phase="act"></i> <strong data-phase="act">Context</strong> -- needs information it can't access. "Should new tests use the same mock JWT?"</span>
    </div>
    <div class="ix-tree-children">
      <div class="ix-tree-node" data-phase="neutral">
        <i data-lucide="chevron-right" data-phase="neutral"></i>
        <span class="ix-tree-node-text">Is this a standing convention (testing philosophy, tooling preference)?</span>
      </div>
      <div class="ix-tree-children">
        <div class="ix-tree-node" data-phase="success">
          <i data-lucide="file-plus" data-phase="success"></i>
          <span class="ix-tree-node-text" data-phase="success"><strong>Yes</strong> -- Answer + write the convention to CLAUDE.md</span>
        </div>
        <div class="ix-tree-node" data-phase="neutral">
          <i data-lucide="message-square" data-phase="neutral"></i>
          <span class="ix-tree-node-text"><strong>No</strong> -- Answer in conversation only</span>
        </div>
      </div>
    </div>
  </div>
</div>

<p class="ix-instruct">Test your understanding of clarification handling.</p>

<div class="ix-diagram" data-component="quiz" data-diagram-id="m03-clarification-check" data-xp="14">
  <span class="ix-title">Knowledge Check: Clarification Handling</span>

  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q1.</strong> The agent asks whether to use PostgreSQL or Redis for refresh-token storage. This question is primarily:</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">Scope clarification</button>
      <button class="ix-quiz-option" data-correct="true">Authority clarification</button>
      <button class="ix-quiz-option" data-correct="false">Context clarification only</button>
      <button class="ix-quiz-option" data-correct="false">A failure that should be ignored</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: authority clarification. It asks you to choose between architectural approaches.</p>
  </div>

  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q2.</strong> You make a choice that will recur in future tasks. Where should it go after answering?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">Only in this chat thread</button>
      <button class="ix-quiz-option" data-correct="true">Promote to CLAUDE.md</button>
      <button class="ix-quiz-option" data-correct="false">Nowhere; memory is automatic</button>
      <button class="ix-quiz-option" data-correct="false">In package-lock.json comments</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: CLAUDE.md. Recurring decisions should become standing context.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q3.</strong> The agent asks "Should new tests use the same mock JWT secret used elsewhere in the test suite?" This is primarily which type of clarification?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">Scope clarification</button>
      <button class="ix-quiz-option" data-correct="false">Authority clarification</button>
      <button class="ix-quiz-option" data-correct="true">Context clarification -- it needs a fact it cannot find</button>
      <button class="ix-quiz-option" data-correct="false">This is not a valid clarification question</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: context clarification. The agent is asking for factual information about existing conventions -- not making an architectural choice (authority) or asking about task boundaries (scope).</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q4.</strong> The agent asks a clarification question that you already answered in CLAUDE.md. What does this most likely indicate?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">CLAUDE.md is broken and not being loaded</button>
      <button class="ix-quiz-option" data-correct="true">The relevant section of CLAUDE.md may be buried or ambiguously worded</button>
      <button class="ix-quiz-option" data-correct="false">The agent never reads CLAUDE.md after the first session</button>
      <button class="ix-quiz-option" data-correct="false">You need to restart the session to reload CLAUDE.md</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: buried or ambiguous. CLAUDE.md is always loaded at session start, but if the relevant guidance is lost in a long file or worded vaguely, the agent may miss it. This is a signal to make that section more prominent or more precise -- not a system failure.</p>
  </div>
</div>

---

## 3.5 Extended Thinking

<div class="ix-diagram" data-component="objective">
  <p>Understand what extended thinking provides, when it adds meaningful value for complex problems, and when it introduces unnecessary overhead. Read an extended thinking trace to identify assumptions, rejected approaches, and uncertainty points.</p>
</div>

Extended thinking allocates additional reasoning budget for complex problems. Understanding when it is genuinely valuable prevents both under-use and over-use.

<p class="ix-instruct">Switch between tabs to compare thinking depth levels and when each applies.</p>

<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="thinking-depth">
  <span class="ix-title">Thinking depth spectrum</span>

  <div class="ix-tab" data-tab="Simple (Direct)" data-accent="#10b981">
    <div class="ix-section">
      <div class="ix-sec-label">Response type</div>
      <div class="ix-sec-text"><i data-lucide="zap" data-phase="observe"></i> Direct response with minimal deliberation</div>
    </div>
    <div class="ix-char-grid">
      <div class="ix-char-item"><strong>Thinking tokens</strong><span>~0 (near-instant)</span></div>
      <div class="ix-char-item"><strong>Latency</strong><span>Fastest</span></div>
      <div class="ix-char-item"><strong>Best for</strong><span>Well-defined, single-action tasks</span></div>
      <div class="ix-char-item"><strong>Examples</strong><span>Fix a typo, add a field, update a URL</span></div>
    </div>
    <div class="ix-cap-section">
      <div class="ix-cap-label">Thinking depth</div>
      <div class="ix-cap-track"><div class="ix-cap-fill" data-width="10%" data-phase="observe"></div></div>
      <div class="ix-cap-val" data-phase="observe">Minimal</div>
    </div>
  </div>

  <div class="ix-tab" data-tab="Medium (Step-by-Step)" data-accent="#6366f1">
    <div class="ix-section">
      <div class="ix-sec-label">Response type</div>
      <div class="ix-sec-text"><i data-lucide="list-ordered" data-phase="perceive"></i> Plans before acting -- numbered steps, sequential reasoning</div>
    </div>
    <div class="ix-char-grid">
      <div class="ix-char-item"><strong>Thinking tokens</strong><span>~1k tokens</span></div>
      <div class="ix-char-item"><strong>Latency</strong><span>Moderate</span></div>
      <div class="ix-char-item"><strong>Best for</strong><span>Multi-step tasks with clear requirements</span></div>
      <div class="ix-char-item"><strong>Examples</strong><span>Refactor a module, add error handling, write tests</span></div>
    </div>
    <div class="ix-cap-section">
      <div class="ix-cap-label">Thinking depth</div>
      <div class="ix-cap-track"><div class="ix-cap-fill" data-width="45%" data-phase="perceive"></div></div>
      <div class="ix-cap-val" data-phase="perceive">Moderate</div>
    </div>
  </div>

  <div class="ix-tab" data-tab="Hard (Extended)" data-accent="#06b6d4">
    <div class="ix-section">
      <div class="ix-sec-label">Response type</div>
      <div class="ix-sec-text"><i data-lucide="brain" data-phase="act"></i> Explores alternatives, backtracks, holds multiple constraints simultaneously</div>
    </div>
    <div class="ix-char-grid">
      <div class="ix-char-item"><strong>Thinking tokens</strong><span>~10k+ tokens</span></div>
      <div class="ix-char-item"><strong>Latency</strong><span>Highest (worth it)</span></div>
      <div class="ix-char-item"><strong>Best for</strong><span>Multi-constraint decisions, complex debugging</span></div>
      <div class="ix-char-item"><strong>Examples</strong><span>Architecture selection, multi-system bugs, trade-off analysis</span></div>
    </div>
    <div class="ix-cap-section">
      <div class="ix-cap-label">Thinking depth</div>
      <div class="ix-cap-track"><div class="ix-cap-fill" data-width="95%" data-phase="act"></div></div>
      <div class="ix-cap-val" data-phase="act">Deep</div>
    </div>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="core-idea">
  <p><strong>When to expect extended thinking:</strong> Multi-constraint architecture decisions, debugging failures across multiple systems, trade-off analysis with competing objectives, and formal verification tasks. For simple edits, boilerplate generation, and single-file changes with clear requirements, extended thinking adds overhead without improving output quality.</p>
</div>

<details class="ix-collapse">
<summary>Deep Dive: How extended thinking works and what to read in the trace</summary>
<div class="ix-collapse-body">
Extended thinking is managed by the Claude Code runtime -- it is not a learner-adjustable CLI flag. The model allocates additional reasoning budget when problem complexity exceeds a threshold, producing traces that explore alternatives, backtrack, and refine before committing.
The value of an extended thinking trace is not just the conclusion -- it is the path. The trace reveals assumptions made explicit, rejected approaches and why they were rejected, constraint interactions, and uncertainty points where human review should concentrate. A final response that says "use approach B" is less useful than a trace showing why approaches A and C were rejected.
</div>
</details>

---

## Putting It Together: A Complete Trace Reading Exercise

<div class="ix-diagram" data-component="objective">
  <p>Apply all trace reading skills together on a complete multi-phase task. Identify Agentic Loop (PRAO) phases, recognize tool call patterns, and make intervention decisions at realistic decision points.</p>
</div>

Two exercises below: an Agentic Loop-tagged trace replay, then an annotated step-by-step walkthrough of a complete bug fix.

<p class="ix-instruct">Watch the trace replay at a comfortable pace and track the Agentic Loop phase transitions as they happen. Use the step button to advance manually if needed.</p>

<div class="ix-diagram" data-component="agent-trace"
     data-variant="prao"
     data-diagram-id="m03-patterns-live"
     data-speed="0.5">
  <span class="ix-title">Two patterns in one task: scout-plan-execute then act-and-verify</span>

  <div class="ix-trace-line" data-type="prompt" data-delay="0" data-prao="perceive">
    "Add a /health endpoint that checks database connectivity."
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="1500" data-prao="perceive">
    Bash(ls src/routes/)
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="1500" data-prao="perceive">
    auth.ts  users.ts  products.ts  index.ts
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="1500" data-prao="perceive">
    Read(src/routes/index.ts)
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="1500" data-prao="perceive">
    Router setup file -- mounts /auth, /users, /products
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="1500" data-prao="perceive">
    Read(src/db/connection.ts)
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="1500" data-prao="perceive">
    Drizzle ORM connection -- exports db instance and pool
  </div>

  <div class="ix-trace-line" data-type="think" data-delay="3500" data-prao="reason">
    Scout complete. I see the pattern: route files in src/routes/, mounted in index.ts, db connection via Drizzle with a pool export. Plan: create health.ts with a GET /health that runs a simple SELECT 1 via the pool, mount it in index.ts.
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="1500" data-prao="act">
    Write(src/routes/health.ts)
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="1500" data-prao="act">
    Edit(src/routes/index.ts) -- added import and mount for /health
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="1500" data-prao="observe">
    Bash(npx tsc --noEmit)
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="1500" data-prao="observe">
    No type errors
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="1500" data-prao="observe">
    Bash(npm test)
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="1500" data-prao="observe">
    All 31 tests passed
  </div>

  <div class="ix-trace-line" data-type="response" data-delay="2500" data-prao="observe">
    Added GET /health endpoint in src/routes/health.ts. It queries SELECT 1 against the database pool and returns 200 with {"status": "ok"} or 503 with {"status": "error"} if the query fails. Mounted in index.ts. All tests pass.
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="definition">
  <p><strong>Task prompt:</strong> <code>"Find and fix the bug causing intermittent 500 errors on /api/users."</code></p>
</div>

<p class="ix-instruct">Step through the 7-step trace with the arrows or arrow keys. Toggle annotations at each step to check your understanding of the PRAO phase.</p>

<div class="ix-diagram" data-component="step-walkthrough" data-diagram-id="m03-trace-reading-exercise" data-xp="12">
  <span class="ix-title">Trace reading exercise: debugging /api/users 500 errors</span>
  <div class="ix-sw-step" data-phase="perceive">
    <span class="ix-sw-step-label">Perceive</span>
    <span class="ix-sw-step-title">Exploration -- find relevant files</span>
    <div class="ix-sw-step-body">
      <pre class="ix-code-block">Bash("grep -r '/api/users' src/ --include='*.ts' -l")
-&gt; src/routes/users.ts
-&gt; src/services/userService.ts
-&gt; src/middleware/authenticate.ts</pre>
      <details class="ix-collapse">
        <summary>Show annotation</summary>
        <div class="ix-collapse-body">
          <p>The agent starts with broad exploration -- grep to find all files referencing the endpoint. Three files found. This is Pattern 3 (Bash exploration) at task start, which is correct. No action yet -- pure perception.</p>
        </div>
      </details>
    </div>
  </div>
  <div class="ix-sw-step" data-phase="perceive">
    <span class="ix-sw-step-label">Perceive</span>
    <span class="ix-sw-step-title">Targeted reading of key files</span>
    <div class="ix-sw-step-body">
      <pre class="ix-code-block">Read("src/routes/users.ts")
-&gt; 45 lines, GET /api/users/:id route handler
Read("src/services/userService.ts")
-&gt; 62 lines, getUser(id) queries PostgreSQL</pre>
      <details class="ix-collapse">
        <summary>Show annotation</summary>
        <div class="ix-collapse-body">
          <p>Pattern 2 (Read x N) -- reading multiple related files to build a complete picture before acting. Thoroughness, not looping: each read is a new file, each provides new information. The agent is mapping the call chain: route to service to database.</p>
        </div>
      </details>
    </div>
  </div>
  <div class="ix-sw-step" data-phase="reason">
    <span class="ix-sw-step-label">Reason</span>
    <span class="ix-sw-step-title">Hypothesis formation</span>
    <div class="ix-sw-step-body">
      <pre class="ix-code-block">thinking: Route handler calls userService.getUser(id).
The query could fail if connection pool is exhausted or
query throws. No error handling in route handler -- not
catching promise rejection -&gt; 500.
Let me check whether getUser throws for not-found vs
database unavailability...</pre>
      <details class="ix-collapse">
        <summary>Show annotation</summary>
        <div class="ix-collapse-body">
          <p>This is the Reason phase producing a hypothesis: unhandled promise rejection in the route handler. Key observation: the agent identifies a specific mechanism (connection pool exhaustion) for the "intermittent" part. It then plans to verify before acting -- correct behavior.</p>
        </div>
      </details>
    </div>
  </div>
  <div class="ix-sw-step" data-phase="reason">
    <span class="ix-sw-step-label">Perceive + Reason</span>
    <span class="ix-sw-step-title">Hypothesis verification</span>
    <div class="ix-sw-step-body">
      <pre class="ix-code-block">Read("src/services/userService.ts")  -- focused re-read
thinking: getUser throws when database is unavailable --
doesn't catch connection errors. Route handler is async
with no try/catch, no .catch().
Any database error = unhandled rejection = 500.
Intermittent because it only occurs under database load.</pre>
      <details class="ix-collapse">
        <summary>Show annotation</summary>
        <div class="ix-collapse-body">
          <p>Re-reading the same file -- but this time it is justified: the agent is looking for specific error behavior it was not focused on in the first read. This is thoroughness (focused re-read with new question), not looping (same question, no progress). The hypothesis is now confirmed with a root cause.</p>
        </div>
      </details>
    </div>
  </div>
  <div class="ix-sw-step" data-phase="act">
    <span class="ix-sw-step-label">Act</span>
    <span class="ix-sw-step-title">Apply the fix</span>
    <div class="ix-sw-step-body">
      <pre class="ix-code-block">Write("src/routes/users.ts", ...)
-&gt; Added try/catch around userService.getUser()
-&gt; 503 for database connection errors
-&gt; 404 for user not found</pre>
      <details class="ix-collapse">
        <summary>Show annotation</summary>
        <div class="ix-collapse-body">
          <p>Pattern 1 (Read then Think then Write) for the actual fix. Single file change, well-targeted. The agent chose appropriate HTTP status codes: 503 for infrastructure failure (database), 404 for missing resources. This differentiates between "something is broken" and "that user does not exist."</p>
        </div>
      </details>
    </div>
  </div>
  <div class="ix-sw-step" data-phase="observe">
    <span class="ix-sw-step-label">Observe</span>
    <span class="ix-sw-step-title">Verify the fix</span>
    <div class="ix-sw-step-body">
      <pre class="ix-code-block">Bash("npm test")
-&gt; 31 passing, 0 failing
Bash("npx tsc --noEmit")
-&gt; no type errors</pre>
      <details class="ix-collapse">
        <summary>Show annotation</summary>
        <div class="ix-collapse-body">
          <p>Pattern 4 (Act then Verify). The agent runs both tests and type checking after the fix. This is the Observe phase closing the Agentic Loop. Tests pass and types check -- the fix did not break anything. Good discipline.</p>
        </div>
      </details>
    </div>
  </div>
  <div class="ix-sw-step" data-phase="observe">
    <span class="ix-sw-step-label">Response</span>
    <span class="ix-sw-step-title">Summary and recommendation</span>
    <div class="ix-sw-step-body">
      <pre class="ix-code-block">Fixed intermittent 500 errors on /api/users.
Root cause: route handler had no error handling for
userService.getUser() -- database connection failures
caused unhandled promise rejections -&gt; 500.
Fix: added try/catch with:
  503 for database unavailability
  404 for user not found
Tests pass. Recommend adding a specific test for the
database failure case.</pre>
      <details class="ix-collapse">
        <summary>Show annotation</summary>
        <div class="ix-collapse-body">
          <p>The response matches the trace: root cause correctly identified, fix correctly described, and the agent proactively recommends additional test coverage. Your next step: review the actual diff, run tests yourself, and consider adding that database failure test. The trace reading confirms the agent's work is sound.</p>
        </div>
      </details>
    </div>
  </div>
</div>

<p class="ix-instruct">Choose your response for each intervention scenario -- would you step in or let it run?</p>

<div class="ix-diagram" data-component="scenario-quiz" data-diagram-id="m03-intervention-sim">
  <span class="ix-title">Intervention simulator: would you step in or let it run?</span>
  <div class="ix-scenario" data-correct="1">
    <div class="ix-scenario-terminal">
      <div class="ix-term-line" data-type="prompt">> Add caching to the product search endpoint</div>
      <div class="ix-term-line" data-type="tool">  Read("src/routes/products.ts")</div>
      <div class="ix-term-line" data-type="tool">  Read("src/services/productService.ts")</div>
      <div class="ix-term-line" data-type="thinking">  thinking: I'll add Redis caching with a 5-minute TTL...</div>
      <div class="ix-term-line" data-type="tool">  Bash("npm install redis")</div>
    </div>
    <div class="ix-scenario-question">The agent is installing Redis, but your stack uses only PostgreSQL. What do you do?</div>
    <div class="ix-scenario-choice" data-rating="neutral">Let it finish -- Redis is a reasonable caching choice.</div>
    <div class="ix-scenario-choice" data-rating="correct">Intervene: "We don't use Redis. Use PostgreSQL materialized views or in-memory Map with TTL."</div>
    <div class="ix-scenario-choice" data-rating="wrong">Close the terminal and start over.</div>
    <div class="ix-scenario-feedback"><strong>Intervene with a redirect.</strong> The agent made a reasonable default choice but one that conflicts with your infrastructure constraints. A specific redirect ("use PostgreSQL materialized views or in-memory Map with TTL") is better than a vague "don't use Redis" -- it gives the agent a concrete alternative to work with. The lesson: if your stack constraints aren't in CLAUDE.md, add them.</div>
  </div>
  <div class="ix-scenario" data-correct="0">
    <div class="ix-scenario-terminal">
      <div class="ix-term-line" data-type="prompt">> Fix the failing integration tests</div>
      <div class="ix-term-line" data-type="tool">  Read("src/tests/integration/auth.test.ts")</div>
      <div class="ix-term-line" data-type="tool">  Read("src/auth/jwt.ts")</div>
      <div class="ix-term-line" data-type="thinking">  thinking: tests expect HS256 but code uses RS256. I'll update the tests to match the code...</div>
    </div>
    <div class="ix-scenario-question">The agent plans to update the tests to match the code, rather than fixing the code. What do you do?</div>
    <div class="ix-scenario-choice" data-rating="correct">Intervene: "The tests are correct -- the code should use HS256 per our auth spec. Fix the code, not the tests."</div>
    <div class="ix-scenario-choice" data-rating="wrong">Let it continue -- making tests pass is the goal.</div>
    <div class="ix-scenario-choice" data-rating="neutral">Wait for the final summary to verify the approach.</div>
    <div class="ix-scenario-feedback"><strong>Intervene now.</strong> The thinking block reveals a wrong assumption: that the code is the source of truth and the tests are wrong. In this case, the tests encode the specification. Waiting until after the change is made means reverting edits. This is exactly the highest-leverage intervention point -- the assumption is visible and correctable before any action.</div>
  </div>
  <div class="ix-scenario" data-correct="0">
    <div class="ix-scenario-terminal">
      <div class="ix-term-line" data-type="prompt">> Add user roles to the database schema</div>
      <div class="ix-term-line" data-type="tool">  Read("prisma/schema.prisma")</div>
      <div class="ix-term-line" data-type="tool">  Write("prisma/schema.prisma")</div>
      <div class="ix-term-line" data-type="tool">  Bash("npx prisma migrate dev --name add-roles")</div>
      <div class="ix-term-line" data-type="thinking">  thinking: migration created, now update the service layer...</div>
    </div>
    <div class="ix-scenario-question">The agent modified your Prisma schema and ran a migration. What do you do?</div>
    <div class="ix-scenario-choice" data-rating="correct">Intervene. Schema migrations are high-stakes -- review the migration SQL before it runs.</div>
    <div class="ix-scenario-choice" data-rating="neutral">Let it finish, then review the migration file after.</div>
    <div class="ix-scenario-choice" data-rating="wrong">This is fine -- you asked for schema changes.</div>
    <div class="ix-scenario-feedback"><strong>Intervene for high-stakes operations.</strong> Schema migrations create permanent database changes. Even in dev, reviewing the migration SQL before execution is good practice. The lesson: add "Don't run prisma migrate without asking" to your CLAUDE.md to prevent repeat occurrences.</div>
  </div>
</div>

<p class="ix-instruct">Test your intervention judgment across three high-stakes scenarios.</p>

<div class="ix-diagram" data-component="quiz" data-diagram-id="m03-intervention-decision-check" data-xp="16">
  <span class="ix-title">Scenario Check: Intervene or Let It Continue?</span>

  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q1.</strong> The thinking layer says “I’ll update production config directly to speed this up,” but your task was limited to tests and docs. Best move?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="true">Intervene immediately and restate scope constraints</button>
      <button class="ix-quiz-option" data-correct="false">Wait until final summary and review then</button>
      <button class="ix-quiz-option" data-correct="false">Let it run because it might still pass tests</button>
      <button class="ix-quiz-option" data-correct="false">Silently restart the session</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: intervene now. Wrong scope in the planning phase is the highest-leverage correction point.</p>
  </div>

  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q2.</strong> You observe repeated <code>Read</code> + <code>Bash(grep)</code> cycles with no edits and no new findings across three loops. Best move?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">Do nothing; repetition always means thoroughness</button>
      <button class="ix-quiz-option" data-correct="true">Intervene with a narrower target and explicit decision criteria</button>
      <button class="ix-quiz-option" data-correct="false">Approve broader filesystem write permissions</button>
      <button class="ix-quiz-option" data-correct="false">Accept the current output as complete</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: intervene with constraints. Persistent no-progress loops need direction, not more time.</p>
  </div>

  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q3.</strong> The final response claims “all tests pass,” but the trace only shows one filtered test command. Best move?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">Trust the response layer and move on</button>
      <button class="ix-quiz-option" data-correct="true">Verify with full-suite command or ask the agent to run it now</button>
      <button class="ix-quiz-option" data-correct="false">Mark complete because scoped test passed</button>
      <button class="ix-quiz-option" data-correct="false">Only check changed files manually</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: verify explicitly. Response summaries are useful, but tool-call evidence is the source of truth.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q4.</strong> The agent takes an unexpected approach -- using a regex instead of a parser for HTML transformation. The thinking layer explains why: "The HTML is generated from a known template with no nested tags, so regex is safe here." Should you intervene?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">Yes -- regex for HTML is always wrong</button>
      <button class="ix-quiz-option" data-correct="true">No -- the reasoning is sound given the stated constraints; monitor the result</button>
      <button class="ix-quiz-option" data-correct="false">Yes -- always intervene when the approach is unexpected</button>
      <button class="ix-quiz-option" data-correct="false">No -- never intervene once the agent has started writing</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: do not intervene. "Regex for HTML" sounds wrong as a general rule, but the agent explicitly justified the choice with valid constraints (known template, no nesting). Reading the reasoning before reacting is the core skill. Intervene on wrong assumptions, not on unfamiliar approaches with sound justification.</p>
  </div>
</div>

---

## Best Practices Summary

<div class="ix-diagram" data-component="callout" data-variant="key-concept">
  <p><strong>Reading traces:</strong> Scan thinking blocks for the agent's task model and assumptions before it acts. Track tool call sequences at a high level. Pay attention to thinking blocks after test failures. Do not try to read every tool result -- focus on what is relevant to the decision you need to make.</p>
</div>

<div class="ix-diagram" data-component="callout" data-variant="key-concept">
  <p><strong>Clarifying questions:</strong> Answer with specific, bounded decisions. Include reasoning when it affects downstream choices. Promote standing conventions to CLAUDE.md. Avoid vague answers -- "do whatever makes sense" is no better than no clarification at all.</p>
</div>

<div class="ix-diagram" data-component="callout" data-variant="key-concept">
  <p><strong>Intervention decisions:</strong> Intervene when thinking reveals a wrong assumption before action, or when you see the loop pattern (same operations repeating without progress). Do not intervene just because the path is unexpected -- read the reasoning first. After two or three unproductive cycles, redirect.</p>
</div>

<div class="ix-diagram" data-component="callout" data-variant="key-concept">
  <p><strong>Extended thinking:</strong> Valuable for multi-constraint architecture, complex debugging, and formal reasoning. Read rejected approaches in the trace -- they contain valuable context. Not necessary for simple edits, boilerplate, or single-file changes with clear requirements.</p>
</div>

---

## Module 03 Knowledge Check

<p class="ix-instruct">Complete the final knowledge check to verify your understanding of all Module 03 concepts.</p>

<div class="ix-diagram" data-component="quiz" data-diagram-id="m03-final-knowledge-check" data-xp="20">
  <span class="ix-title">Module 03 Final Knowledge Check</span>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q1.</strong> What are the three layers of Claude Code agent output?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="true">Thinking, tool calls, response</button>
      <button class="ix-quiz-option" data-correct="false">Input, processing, output</button>
      <button class="ix-quiz-option" data-correct="false">Prompt, completion, summary</button>
      <button class="ix-quiz-option" data-correct="false">Planning, execution, reporting</button>
    </div>
    <p class="ix-quiz-explanation">The three layers are thinking (internal reasoning), tool calls (concrete actions), and response (synthesis narrative).</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q2.</strong> An agent reads the same file three times with no intervening writes. What is the most likely interpretation?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">Normal thoroughness</button>
      <button class="ix-quiz-option" data-correct="true">Stuck loop -- intervene with specific guidance</button>
      <button class="ix-quiz-option" data-correct="false">Extended thinking in progress</button>
      <button class="ix-quiz-option" data-correct="false">The agent is verifying its work</button>
    </div>
    <p class="ix-quiz-explanation">Three reads of the same file without writes suggests the agent is looping. Provide a clarifying decision to break the impasse.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q3.</strong> The agent asks "Should I use PostgreSQL or Redis for caching?" This is what type of clarification?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">Scope clarification</button>
      <button class="ix-quiz-option" data-correct="true">Authority clarification</button>
      <button class="ix-quiz-option" data-correct="false">Context clarification</button>
      <button class="ix-quiz-option" data-correct="false">Not a valid clarification</button>
    </div>
    <p class="ix-quiz-explanation">Authority clarification -- the agent has identified an architectural choice between valid alternatives and is correctly escalating the decision to you.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q4.</strong> You answer a clarifying question about your testing philosophy. Where should this answer go?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">Only in the current conversation</button>
      <button class="ix-quiz-option" data-correct="true">CLAUDE.md -- it is a standing convention</button>
      <button class="ix-quiz-option" data-correct="false">In a comment in the test file</button>
      <button class="ix-quiz-option" data-correct="false">Nowhere -- the agent will remember</button>
    </div>
    <p class="ix-quiz-explanation">Standing conventions and recurring decisions belong in CLAUDE.md so future sessions have the context without asking.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q5.</strong> When is extended thinking most valuable?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">Adding JSDoc comments to exported functions</button>
      <button class="ix-quiz-option" data-correct="false">Generating a standard route handler</button>
      <button class="ix-quiz-option" data-correct="true">Choosing between architectures with fifteen constraints</button>
      <button class="ix-quiz-option" data-correct="false">Fixing a spelling error in a config file</button>
    </div>
    <p class="ix-quiz-explanation">Extended thinking is valuable for multi-constraint decisions where the correct answer requires reasoning through many intermediate steps. Simple, well-defined tasks do not benefit from the additional reasoning overhead.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q6.</strong> The agent's response says "I fixed the bug and all tests pass." The thinking layer shows sound reasoning. You should trust this and move on. True or false?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">True -- sound reasoning plus a confident response is sufficient</button>
      <button class="ix-quiz-option" data-correct="false">True -- if thinking is correct, tool calls must be correct too</button>
      <button class="ix-quiz-option" data-correct="true">False -- you must verify the tool-call layer shows the full test suite ran, not just a subset</button>
      <button class="ix-quiz-option" data-correct="false">False -- you should never trust any layer of agent output</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: false, verify tool calls. Good reasoning and a confident summary do not guarantee the agent ran the full test suite. The response layer often claims "all tests pass" when only a filtered subset was executed. Cross-checking the tool-call layer is non-negotiable -- trust is earned from evidence, not narrative.</p>
  </div>
</div>

---

## Lab Connection

<div class="ix-diagram" data-component="callout" data-variant="tip">
  <p><strong>Lab 03</strong> provides pre-recorded agent traces for three tasks. You will annotate Agentic Loop (PRAO) phases, locate reasoning behind key decisions, identify the highest-leverage intervention point, and distinguish looping from thoroughness. You will then run a live task and produce your own annotated trace analysis.</p>
</div>

---

## Further Reading

### Official Documentation

- [Claude Code Overview](https://docs.anthropic.com/en/docs/claude-code/overview)
- [Claude Code CLI Reference](https://docs.anthropic.com/en/docs/claude-code/cli-reference)
- [MCP Core Specification](https://modelcontextprotocol.io/specification)

### Research Papers

- Wei, J., Wang, X., Schuurmans, D., Bosma, M., Ichter, B., Xia, F., Chi, E., Le, Q., & Zhou, D. (2022). Chain-of-thought prompting elicits reasoning in large language models. *Advances in Neural Information Processing Systems, 35*. https://arxiv.org/abs/2201.11903

- Kojima, T., Gu, S. S., Reid, M., Matsuo, Y., & Iwasawa, Y. (2022). Large language models are zero-shot reasoners. *Advances in Neural Information Processing Systems, 35*. https://arxiv.org/abs/2205.11916 *(The "Let's think step by step" paper)*

---

## Companion Media (NotebookLM)

- [Module 03 Slide Deck (PDF)](https://notebooklm.google.com/notebook/742e3671-5a55-4420-b2a2-5e960e241b2c)
- [Module 03 Explainer Video (open in Notebook Workspace)](https://notebooklm.google.com/notebook/742e3671-5a55-4420-b2a2-5e960e241b2c)
- [Notebook Workspace (all companion media)](https://notebooklm.google.com/notebook/742e3671-5a55-4420-b2a2-5e960e241b2c)

---

The conceptual core (Modules 01–03) is now complete. Day 2 moves into applied execution with prompt engineering depth, then MCP architecture/building, followed by skills/commands. Day 3 advances into multi-agent orchestration, production controls, and capstone delivery.

---

[Previous Module → Module 02](/module/02)
[Next Module → Module 04: Prompt Engineering Depth](/module/04)
