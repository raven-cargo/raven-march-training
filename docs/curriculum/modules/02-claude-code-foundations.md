<div class="ix-diagram" data-component="module-hero">
<div class="ix-hero">
<div class="ix-hero-bg"></div>
<div class="ix-hero-module-num">Module 02</div>
<div class="ix-hero-title">Claude Code Foundations</div>
<div class="ix-hero-subtitle">Configure your environment, understand the permission model, connect external tools, and learn to read agent output</div>
<div class="ix-hero-chips">
<span class="ix-hero-chip">Modes and Configuration</span>
<span class="ix-hero-chip">CLAUDE.md System</span>
<span class="ix-hero-chip">Permissions Model</span>
<span class="ix-hero-chip">MCP Servers</span>
<span class="ix-hero-chip">Reading Agent Output</span>
</div>
</div>
</div>

# Module 02: Claude Code Foundations
## Agentic AI Engineering — 3-Day Intensive Course

---

## Overview

<div class="ix-diagram" data-component="objective">
  <p>Configure Claude Code from scratch -- modes, CLAUDE.md, permissions, and MCP servers -- so you can use it confidently, consistently, and safely in under 30 minutes.</p>
</div>

You explored the agentic coding paradigm in Module 01 and learned the shared characteristics of agentic coding tools -- autonomous tool use, the Agentic Loop, persistent context, and permission models. Now let's go deep on Claude Code specifically: its architecture, configuration, and the operational foundation you need before writing your first agentic workflow. For full architecture context, see the [Claude Code documentation](https://docs.anthropic.com/en/docs/claude-code/overview).

---

## Claude Code Architecture

<div class="ix-diagram" data-component="objective">
  <p>Map the Claude Code runtime architecture: CLI entry point, REPL loop, API backend, and the four tool categories (Files, Bash, Web, MCP).</p>
</div>

The click-cards below let you explore the runtime architecture at your own pace. You do not need to memorize this -- it is a reference map for where each concept you learn in this module sits in the system.

<p class="ix-instruct">Click each card to explore the role of each architectural component.</p>

<div class="ix-diagram" data-component="click-cards" data-diagram-id="architecture-overview">
  <span class="ix-title">Claude Code architecture</span>

  <div class="ix-card" data-accent="#10b981">
    <i data-lucide="terminal" class="ix-card-icon"></i>
    <span class="ix-card-label">claude CLI</span>
  </div>

  <div class="ix-card" data-accent="#6366f1">
    <i data-lucide="repeat" class="ix-card-icon"></i>
    <span class="ix-card-label">REPL Loop</span>
  </div>

  <div class="ix-card" data-accent="#06b6d4">
    <i data-lucide="cloud" class="ix-card-icon"></i>
    <span class="ix-card-label">Claude API</span>
  </div>

  <div class="ix-card" data-accent="#94a3b8">
    <i data-lucide="file-text" class="ix-card-icon"></i>
    <span class="ix-card-label">Files</span>
  </div>

  <div class="ix-card" data-accent="#94a3b8">
    <i data-lucide="square-terminal" class="ix-card-icon"></i>
    <span class="ix-card-label">Bash</span>
  </div>

  <div class="ix-card" data-accent="#94a3b8">
    <i data-lucide="globe" class="ix-card-icon"></i>
    <span class="ix-card-label">Web</span>
  </div>

  <div class="ix-card" data-accent="#94a3b8">
    <i data-lucide="plug" class="ix-card-icon"></i>
    <span class="ix-card-label">MCP Servers</span>
  </div>

  <!-- Detail panels (one per card, same order) -->

  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="success">claude CLI -- Terminal Entry Point</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">Role</div>
        <div class="ix-sec-text">The command-line interface you invoke from your terminal. Entry point to the entire system.</div>
      </div>
      <div class="ix-char-grid">
        <div class="ix-char-item"><strong>Interactive</strong><span><code>claude</code> -- starts REPL session</span></div>
        <div class="ix-char-item"><strong>Non-interactive</strong><span><code>claude -p "prompt"</code> -- single-shot</span></div>
      </div>
    </div>
  </div>

  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="perceive">REPL Loop -- Core Runtime</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">Role</div>
        <div class="ix-sec-text">The Read-Eval-Print Loop that orchestrates the conversation. Manages the context window and routes between the model and tools.</div>
      </div>
      <div class="ix-char-grid">
        <div class="ix-char-item"><strong>Context window</strong><span>CLAUDE.md + conversation history + environment state</span></div>
        <div class="ix-char-item"><strong>Persistence</strong><span>Session-only. Ends when you exit.</span></div>
      </div>
    </div>
  </div>

  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="act">Claude API -- Model Backend</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">Role</div>
        <div class="ix-sec-text">The cloud API that provides the language model. The REPL sends context and receives reasoning + tool call decisions.</div>
      </div>
      <div class="ix-char-grid">
        <div class="ix-char-item"><strong>Models</strong><span>Opus, Sonnet, Haiku</span></div>
        <div class="ix-char-item"><strong>Connection</strong><span>Authenticated HTTPS to Anthropic API</span></div>
      </div>
    </div>
  </div>

  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="neutral">Files -- Filesystem Operations</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">Operations</div>
        <div class="ix-sec-text">Read, Write, Edit, Glob, Grep. The primary way the agent interacts with your codebase.</div>
      </div>
      <div class="ix-char-grid">
        <div class="ix-char-item"><strong>Read</strong><span>Load file contents into context</span></div>
        <div class="ix-char-item"><strong>Write / Edit</strong><span>Create or modify files</span></div>
        <div class="ix-char-item"><strong>Glob / Grep</strong><span>Search file names and contents</span></div>
        <div class="ix-char-item"><strong>Permissions</strong><span>Controlled by allow/deny in settings.json</span></div>
      </div>
    </div>
  </div>

  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="neutral">Bash -- Shell Execution</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">Operations</div>
        <div class="ix-sec-text">Execute shell commands: run tests, build projects, inspect git state, install packages.</div>
      </div>
      <div class="ix-char-grid">
        <div class="ix-char-item"><strong>Scope</strong><span>Any command your shell can run</span></div>
        <div class="ix-char-item"><strong>Risk</strong><span>Highest risk tool -- scope tightly in permissions</span></div>
      </div>
    </div>
  </div>

  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="neutral">Web -- Search and Fetch</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">Operations</div>
        <div class="ix-sec-text">Search the web for documentation, fetch URLs for reference. Used for looking up APIs, checking docs, verifying patterns.</div>
      </div>
      <div class="ix-char-grid">
        <div class="ix-char-item"><strong>Search</strong><span>Web search for documentation and references</span></div>
        <div class="ix-char-item"><strong>Fetch</strong><span>Retrieve content from URLs</span></div>
      </div>
    </div>
  </div>

  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="neutral">MCP Servers -- External Capabilities</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">Operations</div>
        <div class="ix-sec-text">Model Context Protocol servers expose tools, resources, and prompts. Extend the agent with database queries, issue trackers, design tools, and more.</div>
      </div>
      <div class="ix-char-grid">
        <div class="ix-char-item"><strong>Transport</strong><span>stdio (local) or Streamable HTTP (remote)</span></div>
        <div class="ix-char-item"><strong>Config</strong><span>settings.json mcpServers block</span></div>
        <div class="ix-char-item"><strong>Permissions</strong><span>mcp__{server}__{tool} patterns</span></div>
        <div class="ix-char-item"><strong>Primitives</strong><span>Tools, Resources, Prompts</span></div>
      </div>
    </div>
  </div>
</div>

## 2.1 The Two Modes of Claude Code

<div class="ix-diagram" data-component="objective">
  <p>Choose the right invocation mode for any task. Interactive mode keeps you in the loop; non-interactive mode produces pipeable output for automation. Knowing which to reach for saves real time.</p>
</div>

<p class=”ix-instruct”>Write your prediction, then reveal the reference reasoning.</p>

<div class=”ix-diagram” data-component=”predict-reveal” data-diagram-id=”m02-mode-predict” data-xp=”8”>
  <span class=”ix-title”>Predict Before You Learn</span>
  <p class=”ix-predict-prompt”>Before we explore the two modes, think about this: what do you think would be different about running an AI agent interactively versus giving it a task to complete on its own? Consider the scenarios “nightly changelog generation in CI” and “first-time debugging of a flaky auth test.” How would you split them, and why?</p>
  <textarea class=”ix-predict-input” placeholder=”Write your reasoning -- what differences would you expect between interactive and autonomous execution?”></textarea>
  <details class=”ix-predict-reveal”>
    <summary>Reveal reference reasoning</summary>
    <p>Claude Code has two invocation modes that differ in context accumulation, human interaction, and system integration. Nightly changelog generation is usually non-interactive (<code>claude -p</code>) because the task is repeatable and pipeline-friendly. First-time flaky test debugging is usually interactive (<code>claude</code>) because discovery and mid-task redirection are likely.</p>
  </details>
</div>

<details class=”ix-collapse”>
<summary>Deep Dive: Interactive vs. non-interactive mode details</summary>
<div class=”ix-collapse-body”>

### Interactive Mode: `claude`

Running `claude` starts an interactive session. You see a prompt. You type instructions. The agent responds with actions. You see the tool calls, the reasoning traces, the results. You can follow up, add context mid-session, redirect the agent, or ask questions about what it did. The conversation history accumulates within the session -- each exchange has access to everything that came before it.

This mode is ideal for:
- Exploratory work: you're not entirely sure what the task requires and you want to learn as you go
- Complex tasks: multi-step work where you want to monitor progress and occasionally redirect
- Debugging: working through a problem interactively where each discovery changes the direction
- Initial project setup: configuring something new where you'll need to answer clarifying questions

The session ends when you exit. The conversation history does not persist. Everything that matters -- decisions made, patterns established, conventions agreed upon -- needs to be written to files (`CLAUDE.md`, actual code files) before the session ends, or it's gone.

### Non-Interactive Mode: `claude -p "prompt"`

Running `claude -p "prompt"` executes a single-shot task. The agent receives the prompt, executes it, prints the result to stdout, and exits. There is no conversation history. There is no interactive follow-up. The agent reads `CLAUDE.md` (if present), executes the task, and stops.

This mode is ideal for:
- CI/CD pipelines: running a code review as part of a pull request workflow
- Scripted workflows: chaining agent tasks together in a shell script
- Scheduled automation: running nightly documentation updates or test generation
- Integration with other tools: using agent output as input to another process

```bash
# Non-interactive examples:
claude -p "Review the changes in this diff for security issues: $(git diff main)"
claude -p "Generate a changelog entry for the commits since the last tag: $(git log $(git describe --tags --abbrev=0)..HEAD --oneline)"
claude -p "Check whether all exported functions in src/api.ts have JSDoc comments"
```

The output from non-interactive mode goes to `stdout`, which means you can pipe it, redirect it, or capture it in a variable:

```bash
REVIEW=$(claude -p "Review src/auth.ts for common security vulnerabilities")
echo "$REVIEW" | mail -s "Security Review" team@example.com
```

</div>
</details>

### Decision Framework

<p class="ix-instruct">Click each node to expand the decision path.</p>

<div class="ix-diagram" data-component="decision-tree" data-diagram-id="mode-decision">
  <span class="ix-title">Mode decision framework</span>

  <div class="ix-tree-node" data-phase="neutral">
    <i data-lucide="git-branch"></i>
    <span class="ix-tree-node-text">New task -- which mode?</span>
    <i data-lucide="chevron-right"></i>
  </div>
  <div class="ix-tree-children open">
    <div class="ix-tree-node" data-phase="observe">
      <i data-lucide="help-circle"></i>
      <span class="ix-tree-node-text">Need to redirect mid-task?</span>
      <i data-lucide="chevron-right"></i>
    </div>
    <div class="ix-tree-children">
      <div class="ix-tree-node" data-phase="observe">
        <i data-lucide="terminal"></i>
        <span class="ix-tree-node-text"><strong>Yes</strong> -- Interactive mode (<code>claude</code>). You stay in the loop during execution.</span>
      </div>
    </div>
    <div class="ix-tree-node" data-phase="act">
      <i data-lucide="help-circle"></i>
      <span class="ix-tree-node-text">No redirect needed -- well-specified with full context?</span>
      <i data-lucide="chevron-right"></i>
    </div>
    <div class="ix-tree-children">
      <div class="ix-tree-node" data-phase="act">
        <i data-lucide="file-output"></i>
        <span class="ix-tree-node-text"><strong>Yes</strong> -- Non-interactive (<code>claude -p</code>). Output to stdout, pipe or capture.</span>
      </div>
      <div class="ix-tree-node" data-phase="observe">
        <i data-lucide="terminal"></i>
        <span class="ix-tree-node-text"><strong>No</strong> -- Interactive mode. Incomplete context needs conversation.</span>
      </div>
    </div>
    <div class="ix-tree-node" data-phase="warning">
      <i data-lucide="help-circle"></i>
      <span class="ix-tree-node-text">Uncertain -- is this exploratory?</span>
      <i data-lucide="chevron-right"></i>
    </div>
    <div class="ix-tree-children">
      <div class="ix-tree-node" data-phase="observe">
        <i data-lucide="terminal"></i>
        <span class="ix-tree-node-text"><strong>Yes, exploratory</strong> -- Interactive. Learn as you go, then promote to <code>claude -p</code> once stable.</span>
      </div>
      <div class="ix-tree-node" data-phase="act">
        <i data-lucide="file-output"></i>
        <span class="ix-tree-node-text"><strong>No, well-defined</strong> -- Non-interactive. Single-shot execution.</span>
      </div>
    </div>
  </div>
</div>

<p class="ix-instruct">Click each scenario to reveal the recommended mode.</p>

<div class="ix-diagram" data-component="reveal-quiz" data-diagram-id="mode-quiz">
  <span class="ix-title">Test yourself: which mode for this task?</span>
  <div class="ix-reveal-item" data-answer="noninteractive" data-label="claude -p" data-variant="scenario">
    <div class="ix-reveal-prompt">Review a PR diff for security vulnerabilities in a GitHub Actions workflow</div>
    <div class="ix-reveal-why">Well-specified, no mid-task input needed, output goes to CI.</div>
  </div>
  <div class="ix-reveal-item" data-answer="interactive" data-label="claude" data-variant="scenario">
    <div class="ix-reveal-prompt">Debug a flaky integration test that fails intermittently</div>
    <div class="ix-reveal-why">Each discovery changes direction. You need to be in the loop.</div>
  </div>
  <div class="ix-reveal-item" data-answer="both" data-label="Start interactive, promote" data-variant="scenario">
    <div class="ix-reveal-prompt">Add JSDoc comments to all exported functions across 12 files</div>
    <div class="ix-reveal-why">Develop the approach interactively on 1-2 files, then script the rest with -p.</div>
  </div>
  <div class="ix-reveal-item" data-answer="noninteractive" data-label="claude -p" data-variant="scenario">
    <div class="ix-reveal-prompt">Generate a nightly changelog from git commits and post to Slack</div>
    <div class="ix-reveal-why">Automated, repeatable, output pipes to another tool.</div>
  </div>
  <div class="ix-reveal-item" data-answer="interactive" data-label="claude" data-variant="scenario">
    <div class="ix-reveal-prompt">Refactor a monolith service into three microservices</div>
    <div class="ix-reveal-why">Complex, multi-step, high-stakes. You need to redirect, verify, and approve.</div>
  </div>
  <div class="ix-reveal-item" data-answer="noninteractive" data-label="claude -p" data-variant="scenario">
    <div class="ix-reveal-prompt">Check that new code follows naming conventions on every PR</div>
    <div class="ix-reveal-why">Runs in CI, well-specified rules, no human in the loop.</div>
  </div>
  <div class="ix-reveal-item" data-answer="interactive" data-label="claude" data-variant="scenario">
    <div class="ix-reveal-prompt">Set up a new Next.js project with your team's standard config</div>
    <div class="ix-reveal-why">Initial setup involves decisions and clarifying questions.</div>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="key-concept">
  <p><strong>The promote pattern:</strong> Develop a task interactively first -- work out the right prompt, verify the agent's approach, adjust CLAUDE.md. Then promote it to <code>claude -p</code> for repeated use. This gives you the best of both modes.</p>
</div>

<p class="ix-instruct">Test your understanding of mode selection.</p>

<div class="ix-diagram" data-component="quiz" data-diagram-id="m02-mode-check" data-xp="14">
  <span class="ix-title">Knowledge Check: Mode Selection</span>

  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q1.</strong> You are integrating agent output into a CI pipeline and need stdout for downstream tools. Best mode?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">Interactive `claude`</button>
      <button class="ix-quiz-option" data-correct="true">Non-interactive `claude -p`</button>
      <button class="ix-quiz-option" data-correct="false">Either mode, no practical difference</button>
      <button class="ix-quiz-option" data-correct="false">Mermaid mode</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: non-interactive mode. Deterministic invocation and stdout output are built for automation flows.</p>
  </div>

  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q2.</strong> The task is ambiguous and likely to need clarifications midway. Best mode?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="true">Interactive `claude`</button>
      <button class="ix-quiz-option" data-correct="false">Non-interactive `claude -p`</button>
      <button class="ix-quiz-option" data-correct="false">Always non-interactive first</button>
      <button class="ix-quiz-option" data-correct="false">Either, because CLAUDE.md removes ambiguity</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: interactive mode. It supports mid-task steering and rapid clarification loops.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q3.</strong> You want to run a well-defined linting task on every PR automatically. Which invocation is correct?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false"><code>claude</code> with the prompt typed interactively</button>
      <button class="ix-quiz-option" data-correct="true"><code>claude -p "Check this PR for lint violations"</code> in a CI script</button>
      <button class="ix-quiz-option" data-correct="false"><code>claude -p</code> with no prompt argument</button>
      <button class="ix-quiz-option" data-correct="false">Either mode -- CI does not affect the choice</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: non-interactive with a prompt argument. CI pipelines require deterministic, non-blocking invocation with output captured to stdout.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q4.</strong> An engineer uses <code>claude -p</code> for an ambiguous refactoring task and gets poor results. They conclude non-interactive mode is broken. What is the actual problem?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">Non-interactive mode uses a weaker model</button>
      <button class="ix-quiz-option" data-correct="false">The prompt was too long for non-interactive mode</button>
      <button class="ix-quiz-option" data-correct="true">The task needed mid-execution clarification that non-interactive mode cannot provide</button>
      <button class="ix-quiz-option" data-correct="false">Non-interactive mode does not support file writes</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: wrong mode for the task. Non-interactive mode runs to completion without human input. Ambiguous tasks that need steering belong in interactive mode. The model and capabilities are the same -- the difference is whether you can intervene mid-task.</p>
  </div>
</div>

---

## 2.2 CLAUDE.md: The Session Briefing System

<div class="ix-diagram" data-component="objective">
  <p>Write effective CLAUDE.md content that gives the agent durable project knowledge. Know exactly what belongs in the file, what doesn't, and how the four-level hierarchy merges at runtime.</p>
</div>

`CLAUDE.md` is the briefing Claude Code reads at every session start -- the memory that survives sessions. In Module 01 you learned that all agentic tools use persistent context. Here is exactly how Claude Code implements it -- and the critical boundary between what survives a session and what vanishes.

<p class="ix-instruct">Click each card to explore what persists and what vanishes between Claude Code sessions.</p>

<div class="ix-diagram" data-component="click-cards" data-diagram-id="session-vs-persistent">
  <span class="ix-title">Session context vs. persistent context</span>
  <div class="ix-card" data-accent="#f59e0b">
    <i data-lucide="hard-drive" class="ix-card-icon"></i>
    <span class="ix-card-label">CLAUDE.md</span>
  </div>
  <div class="ix-card" data-accent="#f59e0b">
    <i data-lucide="settings" class="ix-card-icon"></i>
    <span class="ix-card-label">settings.json</span>
  </div>
  <div class="ix-card" data-accent="#f59e0b">
    <i data-lucide="file-text" class="ix-card-icon"></i>
    <span class="ix-card-label">Files on disk</span>
  </div>
  <div class="ix-card" data-accent="#f59e0b">
    <i data-lucide="plug" class="ix-card-icon"></i>
    <span class="ix-card-label">MCP config</span>
  </div>
  <div class="ix-card" data-accent="#475569">
    <i data-lucide="message-square" class="ix-card-icon"></i>
    <span class="ix-card-label">Conversation</span>
  </div>
  <div class="ix-card" data-accent="#475569">
    <i data-lucide="brain" class="ix-card-icon"></i>
    <span class="ix-card-label">Reasoning</span>
  </div>
  <div class="ix-card" data-accent="#475569">
    <i data-lucide="mic" class="ix-card-icon"></i>
    <span class="ix-card-label">Verbal decisions</span>
  </div>
  <!-- Detail panels -->
  <div class="ix-detail-panel" data-accent="#f59e0b">
    <div class="ix-detail-header" data-phase="goal">
      <i data-lucide="hard-drive"></i> CLAUDE.md -- Persists across sessions
    </div>
    <div class="ix-detail-body">
      <div class="ix-detail-section">
        <div class="ix-detail-text">Standing orders read at the start of every session. The primary mechanism for persistent context: architecture, conventions, constraints, and non-negotiable rules. Whatever you write here shapes every future session.</div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel" data-accent="#f59e0b">
    <div class="ix-detail-header" data-phase="goal">
      <i data-lucide="settings"></i> settings.json -- Persists across sessions
    </div>
    <div class="ix-detail-body">
      <div class="ix-detail-section">
        <div class="ix-detail-text">Permission configurations that control what the agent is allowed to do. Defines allow/deny lists for tool invocations. Survives sessions because it is a file on disk, not part of conversation history.</div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel" data-accent="#f59e0b">
    <div class="ix-detail-header" data-phase="goal">
      <i data-lucide="file-text"></i> Files on disk -- Persists across sessions
    </div>
    <div class="ix-detail-body">
      <div class="ix-detail-section">
        <div class="ix-detail-text">Any file the agent writes to your filesystem: source code, configuration, documentation. These are permanent artifacts that outlive the session. The agent's most durable form of output.</div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel" data-accent="#f59e0b">
    <div class="ix-detail-header" data-phase="goal">
      <i data-lucide="plug"></i> MCP config -- Persists across sessions
    </div>
    <div class="ix-detail-body">
      <div class="ix-detail-section">
        <div class="ix-detail-text">MCP server definitions stored in settings. These configure which external tools the agent can access: databases, APIs, design tools. Available in every session without re-configuration.</div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel" data-accent="#475569">
    <div class="ix-detail-header" data-phase="neutral">
      <i data-lucide="message-square"></i> Conversation history -- Session only
    </div>
    <div class="ix-detail-body">
      <div class="ix-detail-section">
        <div class="ix-detail-text">The back-and-forth between you and the agent within a session. Lost when the session ends unless you explicitly resume with <code>--continue</code> or <code>--resume</code>. Do not rely on this for anything that matters long-term.</div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel" data-accent="#475569">
    <div class="ix-detail-header" data-phase="neutral">
      <i data-lucide="brain"></i> Reasoning traces -- Session only
    </div>
    <div class="ix-detail-body">
      <div class="ix-detail-section">
        <div class="ix-detail-text">The agent's internal thinking output: plans, trade-off analysis, constraint evaluation. Visible during the session but not persisted. If a reasoning conclusion matters, capture it in CLAUDE.md or code comments.</div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel" data-accent="#475569">
    <div class="ix-detail-header" data-phase="neutral">
      <i data-lucide="mic"></i> Verbal decisions -- Session only
    </div>
    <div class="ix-detail-body">
      <div class="ix-detail-section">
        <div class="ix-detail-text">Decisions you make in conversation that are never written down: "yes, use that approach" or "skip that file." These vanish completely. If a decision should persist, write it to CLAUDE.md or the agent will ask again next session.</div>
      </div>
    </div>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="tip">
<p><strong>Practical rule:</strong> Any decision or constraint that matters should be written somewhere permanent -- CLAUDE.md or code -- not just stated in conversation. The click-cards above show exactly what persists and what vanishes.</p>
</div>

### What Belongs (and What Doesn't)

<p class="ix-instruct">Review each entry to learn what belongs in CLAUDE.md and what doesn't.</p>

<div class="ix-diagram" data-component="entry-list" data-diagram-id="claudemd-belongs">
  <span class="ix-title">What belongs in CLAUDE.md</span>
  <div class="ix-entry" data-badge="include">
    <div class="ix-entry-category">Architecture overview</div>
    <div class="ix-entry-example">TypeScript monorepo with pnpm workspaces. Three packages: packages/api (Express), packages/web (Next.js 14), packages/shared (types).</div>
    <div class="ix-entry-why">The agent needs to know what it's working with before it reads a single file.</div>
  </div>
  <div class="ix-entry" data-badge="include">
    <div class="ix-entry-category">Coding conventions</div>
    <div class="ix-entry-example">Use zod for all runtime validation -- do not use joi or yup. Prefer named exports over default exports.</div>
    <div class="ix-entry-why">Specific and decidable. The agent can check any new code against this rule.</div>
  </div>
  <div class="ix-entry" data-badge="include">
    <div class="ix-entry-category">Key file locations</div>
    <div class="ix-entry-example">packages/api/src/db/schema.ts -- Drizzle schema definitions. packages/api/src/routes/ -- one file per resource.</div>
    <div class="ix-entry-why">Saves the agent from spelunking through the filesystem to find important files.</div>
  </div>
  <div class="ix-entry" data-badge="include">
    <div class="ix-entry-category">Constraints / never-dos</div>
    <div class="ix-entry-example">Never modify files in packages/shared/src/generated/ -- these are auto-generated. Never add npm deps without noting them.</div>
    <div class="ix-entry-why">Prevents costly mistakes. The agent won't hand-edit generated code.</div>
  </div>
  <div class="ix-entry" data-badge="include">
    <div class="ix-entry-category">Decisions made</div>
    <div class="ix-entry-example">Auth: JWT with 24h expiry, stateless. Database: PostgreSQL + Drizzle only. Testing: Vitest, not Jest.</div>
    <div class="ix-entry-why">Stops the agent from re-litigating settled choices in every new session.</div>
  </div>
</div>

<div class="ix-diagram" data-component="entry-list" data-diagram-id="claudemd-excludes">
  <span class="ix-title">What does NOT belong in CLAUDE.md</span>
  <div class="ix-entry" data-badge="exclude">
    <div class="ix-entry-category">Secrets and credentials</div>
    <div class="ix-entry-example">API_KEY=sk-abc123... DATABASE_URL=postgresql://user:pass@host/db</div>
    <div class="ix-entry-why">CLAUDE.md gets committed. Secrets in CLAUDE.md = secrets in your git history. Use .env + .gitignore.</div>
  </div>
  <div class="ix-entry" data-badge="exclude">
    <div class="ix-entry-category">Per-task instructions</div>
    <div class="ix-entry-example">Add types to src/utils.ts. Fix the bug in the auth middleware.</div>
    <div class="ix-entry-why">These belong in the prompt, not CLAUDE.md. If left permanently, the agent treats them as standing orders.</div>
  </div>
  <div class="ix-entry" data-badge="exclude">
    <div class="ix-entry-category">Aspirational principles</div>
    <div class="ix-entry-example">Write clean, maintainable, well-documented code. Follow best practices.</div>
    <div class="ix-entry-why">Not actionable. The agent can't make concrete decisions from "write clean code."</div>
  </div>
  <div class="ix-entry" data-badge="exclude">
    <div class="ix-entry-category">Duplicated documentation</div>
    <div class="ix-entry-example">Full API reference, complete style guide, entire README contents.</div>
    <div class="ix-entry-why">Wastes context window. CLAUDE.md should be a briefing, not a manual. Link to docs instead.</div>
  </div>
  <div class="ix-entry" data-badge="exclude">
    <div class="ix-entry-category">Unstable or frequently changing info</div>
    <div class="ix-entry-example">Current sprint goals. Today's deployment schedule. WIP feature flags.</div>
    <div class="ix-entry-why">CLAUDE.md is for durable context. Ephemeral info goes in the prompt for that session.</div>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="merge-note">
  <p><strong>The litmus test:</strong> Could an agent use this entry to make a concrete, binary decision? If it requires interpretation, it's too vague. "Use zod for validation" is decidable. "Use good libraries" is not decidable.</p>
</div>

### The Hierarchy: Global and Project Scopes

<p class="ix-instruct">Use arrows to step through the four layers of the CLAUDE.md hierarchy.</p>

<div class="ix-diagram" data-component="step-walkthrough" data-diagram-id="claudemd-hierarchy">
  <span class="ix-title">CLAUDE.md hierarchy -- broad to specific</span>

  <div class="ix-walk-step">
    <div class="ix-detail-panel" style="margin:0;display:block">
      <div class="ix-detail-header" data-phase="neutral">
        <i data-lucide="globe"></i>
        Layer 1: Global
      </div>
      <div class="ix-detail-body">
        <div class="ix-char-grid">
          <div class="ix-char-item"><strong>Path</strong><span>~/.claude/CLAUDE.md</span></div>
          <div class="ix-char-item"><strong>Scope</strong><span>All projects, all sessions</span></div>
          <div class="ix-char-item"><strong>Shared</strong><span>Personal only (not committed)</span></div>
          <div class="ix-char-item"><strong>Put here</strong><span>Style preferences, universal guardrails, recurring tool habits</span></div>
        </div>
        <div class="ix-cap-section">
          <div class="ix-cap-label">Specificity</div>
          <div class="ix-cap-track"><div class="ix-cap-fill" data-width="15%" data-phase="neutral"></div></div>
          <div class="ix-cap-val" data-phase="neutral">Broadest -- applies everywhere</div>
        </div>
      </div>
    </div>
  </div>

  <div class="ix-walk-step">
    <div class="ix-detail-panel" style="margin:0;display:block">
      <div class="ix-detail-header" data-phase="perceive">
        <i data-lucide="folder"></i>
        Layer 2: Project
      </div>
      <div class="ix-detail-body">
        <div class="ix-char-grid">
          <div class="ix-char-item"><strong>Path</strong><span>./CLAUDE.md (repo root)</span></div>
          <div class="ix-char-item"><strong>Scope</strong><span>This repository only</span></div>
          <div class="ix-char-item"><strong>Shared</strong><span>Committed -- whole team reads it</span></div>
          <div class="ix-char-item"><strong>Put here</strong><span>Architecture, conventions, key files, constraints, decisions</span></div>
        </div>
        <div class="ix-cap-section">
          <div class="ix-cap-label">Specificity</div>
          <div class="ix-cap-track"><div class="ix-cap-fill" data-width="45%" data-phase="perceive"></div></div>
          <div class="ix-cap-val" data-phase="perceive">Project-level -- team-shared context</div>
        </div>
      </div>
    </div>
  </div>

  <div class="ix-walk-step">
    <div class="ix-detail-panel" style="margin:0;display:block">
      <div class="ix-detail-header" data-phase="goal">
        <i data-lucide="user"></i>
        Layer 3: Project (Alt Path)
      </div>
      <div class="ix-detail-body">
        <div class="ix-char-grid">
          <div class="ix-char-item"><strong>Path</strong><span>./.claude/CLAUDE.md</span></div>
          <div class="ix-char-item"><strong>Scope</strong><span>This repository only</span></div>
          <div class="ix-char-item"><strong>Shared</strong><span>Project-level instructions (typically committed)</span></div>
          <div class="ix-char-item"><strong>Put here</strong><span>Same project guidance as root CLAUDE.md when your repo standard uses .claude/</span></div>
        </div>
        <div class="ix-cap-section">
          <div class="ix-cap-label">Specificity</div>
          <div class="ix-cap-track"><div class="ix-cap-fill" data-width="70%" data-phase="goal"></div></div>
          <div class="ix-cap-val" data-phase="goal">Project-level alternative to root CLAUDE.md</div>
        </div>
      </div>
    </div>
  </div>

  <div class="ix-walk-step">
    <div class="ix-detail-panel" style="margin:0;display:block">
      <div class="ix-detail-header" data-phase="observe">
        <i data-lucide="folder-tree"></i>
        Layer 4: Subdirectory
      </div>
      <div class="ix-detail-body">
        <div class="ix-char-grid">
          <div class="ix-char-item"><strong>Path</strong><span>./subdir/CLAUDE.md</span></div>
          <div class="ix-char-item"><strong>Scope</strong><span>Only when working in that subtree</span></div>
          <div class="ix-char-item"><strong>Shared</strong><span>Committed -- domain-specific guidance</span></div>
          <div class="ix-char-item"><strong>Put here</strong><span>Domain-specific rules, package-level conventions, narrower constraints</span></div>
        </div>
        <div class="ix-cap-section">
          <div class="ix-cap-label">Specificity</div>
          <div class="ix-cap-track"><div class="ix-cap-fill" data-width="95%" data-phase="observe"></div></div>
          <div class="ix-cap-val" data-phase="observe">Most specific -- overrides all above</div>
        </div>
      </div>
    </div>
  </div>

  <div class="ix-walk-step">
    <div class="ix-detail-panel" style="margin:0;display:block">
      <div class="ix-detail-header" data-phase="observe">
        <i data-lucide="layers"></i>
        Result: Merged Context
      </div>
      <div class="ix-detail-body">
        <div class="ix-section">
          <div class="ix-sec-text">All layers stack. More specific context augments or overrides broader context when they conflict. The agent reads the merged result at session start.</div>
        </div>
        <div class="ix-char-grid">
          <div class="ix-char-item"><strong>Merge rule</strong><span>Specific overrides general</span></div>
          <div class="ix-char-item"><strong>Relationship</strong><span>Additive -- layers augment each other</span></div>
        </div>
      </div>
    </div>
  </div>
</div>

<p class="ix-instruct">Explore each level of the hierarchy.</p>

<div class="ix-diagram" data-component="hierarchy" data-diagram-id="claudemd-hierarchy">
  <span class="ix-title">CLAUDE.md hierarchy and layers</span>
  <div class="ix-h-level" data-level="0">
    <div class="ix-h-path">~/.claude/CLAUDE.md</div>
    <div class="ix-h-scope">Global -- applies everywhere</div>
    <div class="ix-h-desc">Cross-project defaults: personal style preferences, universal guardrails, recurring tool habits. Things true regardless of which project you're in.</div>
  </div>
  <div class="ix-h-level" data-level="1">
    <div class="ix-h-path">./CLAUDE.md</div>
    <div class="ix-h-scope">Project -- repo root, team-shared</div>
    <div class="ix-h-desc">Architecture, conventions, constraints, decisions. This is the primary briefing document. Committed to git so every team member's agent gets the same context.</div>
  </div>
  <div class="ix-h-level" data-level="2">
    <div class="ix-h-path">./.claude/CLAUDE.md</div>
    <div class="ix-h-scope">Local project -- personal overrides</div>
    <div class="ix-h-desc">Machine-local or personal overrides that shouldn't be team policy. Typically gitignored. Example: "I prefer verbose output" or custom MCP server paths.</div>
  </div>
  <div class="ix-h-level" data-level="3">
    <div class="ix-h-path">./subdir/CLAUDE.md</div>
    <div class="ix-h-scope">Subdirectory -- domain-specific</div>
    <div class="ix-h-desc">Loaded when work enters that subtree. Narrower, domain-specific guidance. Example: packages/api/CLAUDE.md with API-specific conventions.</div>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="tip">
  <p><strong>Layers stack.</strong> More specific context augments or overrides broader context when they conflict. The agent sees the merged result of all applicable layers -- global defaults + project rules + local overrides + subdirectory specifics.</p>
</div>

<p class="ix-instruct">Test your understanding of CLAUDE.md scope hygiene.</p>

<div class="ix-diagram" data-component="quiz" data-diagram-id="m02-claudemd-check" data-xp="16">
  <span class="ix-title">Knowledge Check: CLAUDE.md Scope Hygiene</span>

  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q1.</strong> Where should personal coding preferences that apply across all repositories live?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="true">`~/.claude/CLAUDE.md`</button>
      <button class="ix-quiz-option" data-correct="false">`./CLAUDE.md` in each repository</button>
      <button class="ix-quiz-option" data-correct="false">`README.md`</button>
      <button class="ix-quiz-option" data-correct="false">Inline in each prompt only</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: global scope. Cross-project defaults belong in user-level context.</p>
  </div>

  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q2.</strong> Which item should <em>not</em> be stored in CLAUDE.md?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">Architecture overview</button>
      <button class="ix-quiz-option" data-correct="false">Non-negotiable constraints</button>
      <button class="ix-quiz-option" data-correct="true">API credentials or tokens</button>
      <button class="ix-quiz-option" data-correct="false">Project conventions</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: credentials never belong in CLAUDE.md because it is versioned project context.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q3.</strong> A subdirectory <code>packages/api/CLAUDE.md</code> says "use Express." The root <code>./CLAUDE.md</code> says "use Fastify." Which does the agent follow when working in <code>packages/api/</code>?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="true">Express -- subdirectory context overrides root when it is more specific</button>
      <button class="ix-quiz-option" data-correct="false">Fastify -- root always wins</button>
      <button class="ix-quiz-option" data-correct="false">Whichever was written more recently</button>
      <button class="ix-quiz-option" data-correct="false">The agent will ask for clarification every time</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: Express. The CLAUDE.md hierarchy follows the rule "more specific overrides more general." Subdirectory context takes precedence when the agent is working in that subtree.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q4.</strong> A team puts their entire 500-line style guide into CLAUDE.md. The agent starts ignoring rules at the bottom. What is the most likely cause?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">CLAUDE.md has a hard line limit of 200 lines</button>
      <button class="ix-quiz-option" data-correct="true">Context overload -- overly long CLAUDE.md dilutes the most important rules</button>
      <button class="ix-quiz-option" data-correct="false">The agent only reads the first section of CLAUDE.md</button>
      <button class="ix-quiz-option" data-correct="false">Rules must be numbered to be followed</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: context overload. CLAUDE.md has no hard line limit, but an overly verbose file competes with the actual task for the agent's attention budget. Keep CLAUDE.md focused on high-signal conventions -- link to external docs for details instead of inlining everything.</p>
  </div>
</div>

### CLAUDE.md Pattern Library

<p class="ix-instruct">Select each tab to compare the five operational sections of CLAUDE.md.</p>

<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="m02-claudemd-pattern-library">
  <span class="ix-title">Five sections that make CLAUDE.md operational</span>

  <div class="ix-tab" data-tab="Architecture" data-accent="#6366f1">
    <pre><code class="language-markdown">## Project Architecture
- packages/api: Express + PostgreSQL
- packages/web: Next.js App Router
- packages/shared: shared types/utilities</code></pre>
    <p>Goal: orient the agent quickly so initial reads are targeted.</p>
  </div>

  <div class="ix-tab" data-tab="Conventions" data-accent="#8b5cf6">
    <pre><code class="language-markdown">## Conventions
- Use zod for runtime validation
- Prefer named exports
- Colocate tests as *.test.ts</code></pre>
    <p>Goal: remove avoidable choices the agent should not re-litigate.</p>
  </div>

  <div class="ix-tab" data-tab="Key Files" data-accent="#06b6d4">
    <pre><code class="language-markdown">## Key Files
- packages/api/src/db/schema.ts
- packages/api/src/routes/
- packages/web/src/app/</code></pre>
    <p>Goal: accelerate perception by naming high-value entry points.</p>
  </div>

  <div class="ix-tab" data-tab="Constraints" data-accent="#f59e0b">
    <pre><code class="language-markdown">## Constraints
- Never edit generated sources
- Do not modify production config
- Note dependency additions in-session</code></pre>
    <p>Goal: define hard boundaries before any tool call executes.</p>
  </div>

  <div class="ix-tab" data-tab="Decisions" data-accent="#10b981">
    <pre><code class="language-markdown">## Decided
- Auth: JWT, 24h expiry
- DB: PostgreSQL + Drizzle
- Tests: Vitest + Playwright</code></pre>
    <p>Goal: preserve architectural choices across sessions and teammates.</p>
  </div>
</div>

<p class="ix-instruct">Click each stage to see how CLAUDE.md evolves over time.</p>

<div class="ix-diagram" data-component="timeline" data-diagram-id="claudemd-evolution">
  <span class="ix-title">CLAUDE.md is a living document</span>
  <div class="ix-timeline-stage" data-week="Day 1" data-name="Project kickoff" data-lines="~8 lines">
    <div class="ix-timeline-file"><code># Project<br>TypeScript monorepo, pnpm workspaces<br># Conventions<br>Use zod for validation</code></div>
    <div class="ix-timeline-trigger"><strong>What triggered this:</strong> You created the project and wrote the initial briefing with architecture and one convention.</div>
  </div>
  <div class="ix-timeline-stage" data-week="Week 1" data-name="First agent mistake" data-lines="~18 lines">
    <div class="ix-timeline-file"><code># Constraints<br>Never edit packages/shared/src/generated/<br># Decided<br>Auth: JWT with RS256</code></div>
    <div class="ix-timeline-trigger"><strong>What triggered this:</strong> The agent edited a generated file. You added a constraint to prevent it. The JWT decision was locked in after a design session.</div>
  </div>
  <div class="ix-timeline-stage" data-week="Week 3" data-name="Team conventions stabilize" data-lines="~35 lines">
    <div class="ix-timeline-file"><code># Key Files<br>packages/api/src/db/schema.ts<br>packages/api/src/routes/<br># Testing<br>Vitest for unit, Playwright for e2e</code></div>
    <div class="ix-timeline-trigger"><strong>What triggered this:</strong> The team settled on testing tools and key file locations became clear after several sessions.</div>
  </div>
  <div class="ix-timeline-stage" data-week="Month 2" data-name="Mature project context" data-lines="~55 lines">
    <div class="ix-timeline-file"><code>Full briefing: architecture, conventions,<br>key files, constraints, decisions, testing<br>strategy, and deployment notes.</code></div>
    <div class="ix-timeline-trigger"><strong>What triggered this:</strong> Continuous refinement. Each agent mistake that better context would have prevented became a new CLAUDE.md entry.</div>
  </div>
</div>

<div class="ix-diagram" data-component="predict-reveal" data-diagram-id="m02-claudemd-predict" data-xp="10">
  <span class="ix-title">Predict First: Will This Instruction Survive Sessions?</span>
  <p class="ix-predict-prompt">Write one instruction you currently repeat in prompts. Predict whether it belongs in CLAUDE.md or in task-level prompts only, and explain why.</p>
  <textarea class="ix-predict-input" placeholder="Instruction + where it belongs + why."></textarea>
  <details class="ix-predict-reveal">
    <summary>Reveal rubric</summary>
    <p>If it is recurring, project-level, and decision-shaping, put it in CLAUDE.md. If it is one-off and task-specific, keep it in the conversation.</p>
  </details>
</div>

<details class="ix-collapse">
<summary>Common Mistakes To Avoid</summary>
<div class="ix-collapse-body">

- Never place secrets or credentials in `CLAUDE.md`.
- Never encode one-time task instructions as standing rules.
- Never rely on vague language like "write clean code" when a concrete rule is possible.
- Update `CLAUDE.md` when a repeated error reveals missing context.

**Spot The Problems:**

```markdown
## Config
API_KEY=sk-abc123def456
Write clean, maintainable code.
Currently working on adding user auth.
```

**Answer:** (1) secret in CLAUDE.md, (2) vague aspirational instruction, (3) per-task instruction that should stay in the current prompt.

</div>
</details>

<p class="ix-instruct">Step through the trace and read each annotation to see how CLAUDE.md shapes agent decisions.</p>

<div class="ix-diagram" data-component="agent-trace"
     data-variant="annotated"
     data-diagram-id="m02-claudemd-action"
     data-default-mode="manual"
     data-speed="0.5">
  <span class="ix-title">How CLAUDE.md shapes agent decisions</span>

  <div class="ix-trace-line" data-type="prompt" data-delay="0">
    "Add input validation to the POST /users endpoint."
    <span class="ix-trace-annotation">The engineer gives a brief task. CLAUDE.md provides the standing context.</span>
  </div>

  <div class="ix-trace-line" data-type="think" data-delay="3500">
    Let me check the project context first for conventions and constraints.
    <span class="ix-trace-annotation">The agent reads CLAUDE.md automatically at session start. It already has this context, but the thinking shows it being used.</span>
  </div>

  <div class="ix-trace-line" data-type="think" data-delay="4000">
    From CLAUDE.md: "Use zod for all runtime validation -- do not use joi or yup." I will use zod.
    <span class="ix-trace-annotation">This is the payoff of good CLAUDE.md. Without this entry, the agent might pick any validation library. With it, the decision is made before the agent writes a line of code.</span>
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="1500">
    Read(src/routes/users.ts)
    <span class="ix-trace-annotation">Perceive phase: reading the existing endpoint to understand its structure.</span>
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="1500">
    POST handler accepts req.body directly -- no validation currently
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="1500">
    Read(package.json)
    <span class="ix-trace-annotation">The agent checks if zod is already a dependency. Good practice -- it avoids adding something already present or discovering it is missing before writing code that imports it.</span>
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="1500">
    "zod": "^3.22.0" found in dependencies
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="1500">
    Write(src/routes/users.ts)
    <span class="ix-trace-annotation">Act phase: the agent writes the validation schema using zod (not joi, not yup) because CLAUDE.md specified this.</span>
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="1500">
    Bash(npm test)
    <span class="ix-trace-annotation">Observe phase: verifying the change did not break anything. This act-then-verify pattern is a sign of good agent behavior.</span>
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="1500">
    All 24 tests passed
  </div>

  <div class="ix-trace-line" data-type="response" data-delay="2500">
    Added zod validation schema for POST /users. The schema validates name (string, min 1), email (string, email format), and role (enum: admin | user). Invalid requests now return 400 with detailed error messages. All tests pass.
    <span class="ix-trace-annotation">The response is a summary of what was done. A good engineer reads this, then checks the actual diff to verify it matches.</span>
  </div>
</div>

---

## 2.3 Permissions: The settings.json System

<div class="ix-diagram" data-component="objective">
  <p>Configure allow/deny permissions so the agent can work autonomously within safe boundaries. Understand how every action resolves through the three-state model: permitted, blocked, or ask.</p>
</div>

<div class="ix-diagram" data-component="callout" data-variant="core-idea">
  <p>Every agent action resolves to one of three states: <strong>In allow list</strong> -- execute immediately, no prompt. <strong>In deny list</strong> -- blocked entirely, agent cannot proceed. <strong>Neither</strong> -- ask human (interactive) or skip (non-interactive).</p>
</div>

### The Runtime Approval Prompt

When the agent wants to take an action that is not in your allow list and not in your deny list, Claude Code pauses and presents three options. This is your real-time control surface -- the human-in-the-loop checkpoint that keeps the agent accountable.

<p class="ix-instruct">Click each option to learn when and why to use it.</p>

<div class="ix-diagram" data-component="click-cards" data-diagram-id="m02-approval-options">
  <span class="ix-title">The three approval options</span>
  <div class="ix-card" data-accent="#10b981">
    <i data-lucide="check" class="ix-card-icon"></i>
    <span class="ix-card-label">Yes, allow once</span>
  </div>
  <div class="ix-card" data-accent="#06b6d4">
    <i data-lucide="check-check" class="ix-card-icon"></i>
    <span class="ix-card-label">Yes, allow for this session</span>
  </div>
  <div class="ix-card" data-accent="#6366f1">
    <i data-lucide="file-plus" class="ix-card-icon"></i>
    <span class="ix-card-label">Write a rule</span>
  </div>
  <!-- Detail panels (one per card, same order) -->
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="success">Yes, allow once</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">Scope</div>
        <div class="ix-sec-text">One-time only. Permits this specific action right now. The next time the agent attempts the same action, it will ask again.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">When to use</div>
        <div class="ix-sec-text">The action is unfamiliar or unexpected. You want to observe what happens before granting broader access. This is the safest default -- approve, watch the result, then decide if you trust it going forward.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Best practice</div>
        <div class="ix-sec-text">Start here for any action you have not seen before. One-time approval gives you a chance to evaluate the outcome before committing to broader trust.</div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="act">Yes, allow for this session</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">Scope</div>
        <div class="ix-sec-text">Session-wide. All actions of this type are permitted for the remainder of the current Claude Code session. Once you exit, the permission expires.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">When to use</div>
        <div class="ix-sec-text">You have already approved this action once or twice and trust it for this task. You are tired of clicking approve for the same operation but do not want to make it permanent yet.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Best practice</div>
        <div class="ix-sec-text">Use when the action is clearly safe in context (e.g., writing to a scratch directory) but you are not ready to codify it as a permanent rule across all sessions.</div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="perceive">Write a rule</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">Scope</div>
        <div class="ix-sec-text">Permanent. Adds the action pattern to your <code>settings.json</code> allow list. Every future session inherits this rule automatically.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">When to use</div>
        <div class="ix-sec-text">You have approved this action multiple times and it is clearly part of your standard workflow. Examples: <code>Read</code> for all files, <code>Write(src/**)</code> for source code, <code>Bash(npm test)</code> for test runs.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Best practice</div>
        <div class="ix-sec-text">Only promote to a permanent rule after you have observed the action succeed safely at least once. Review your <code>settings.json</code> periodically to ensure accumulated rules still match your current trust boundaries.</div>
      </div>
    </div>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="tip">
  <p><strong>Start with "allow once" for unfamiliar actions.</strong> If you find yourself approving the same action repeatedly, promote it to a session-wide or permanent rule. This is the same progressive trust pattern used in the Agentic Loop -- observe before committing.</p>
</div>

### The Allow/Deny Model

<p class="ix-instruct">Click each node to expand the permission evaluation path.</p>

<div class="ix-diagram" data-component="decision-tree" data-diagram-id="permissions-flow">
  <span class="ix-title">Permission evaluation flow</span>

  <div class="ix-tree-node" data-phase="neutral">
    <i data-lucide="shield"></i>
    <span class="ix-tree-node-text">Agent wants to take an action</span>
    <i data-lucide="chevron-right"></i>
  </div>
  <div class="ix-tree-children open">
    <div class="ix-tree-node" data-phase="error">
      <i data-lucide="lock"></i>
      <span class="ix-tree-node-text">In deny list?</span>
      <i data-lucide="chevron-right"></i>
    </div>
    <div class="ix-tree-children">
      <div class="ix-tree-node" data-phase="error">
        <i data-lucide="x-circle"></i>
        <span class="ix-tree-node-text"><strong>Yes -- BLOCKED.</strong> Action refused entirely. No override possible.</span>
      </div>
    </div>
    <div class="ix-tree-node" data-phase="success">
      <i data-lucide="unlock"></i>
      <span class="ix-tree-node-text">Not denied -- in allow list?</span>
      <i data-lucide="chevron-right"></i>
    </div>
    <div class="ix-tree-children">
      <div class="ix-tree-node" data-phase="success">
        <i data-lucide="check-circle"></i>
        <span class="ix-tree-node-text"><strong>Yes -- PERMITTED.</strong> Execute immediately, no prompt.</span>
      </div>
      <div class="ix-tree-node" data-phase="warning">
        <i data-lucide="help-circle"></i>
        <span class="ix-tree-node-text">Not in allow list either -- interactive mode?</span>
        <i data-lucide="chevron-right"></i>
      </div>
      <div class="ix-tree-children">
        <div class="ix-tree-node" data-phase="warning">
          <i data-lucide="message-square"></i>
          <span class="ix-tree-node-text"><strong>Yes -- ASK HUMAN.</strong> Approval prompt shown. User approves or denies.</span>
        </div>
        <div class="ix-tree-node" data-phase="neutral">
          <i data-lucide="skip-forward"></i>
          <span class="ix-tree-node-text"><strong>No (non-interactive) -- SKIPPED.</strong> Cannot resolve without human input.</span>
        </div>
      </div>
    </div>
  </div>
</div>

<details class="ix-collapse">
<summary>View full settings.json configuration</summary>
<div class="ix-collapse-body">

Permissions are defined in `settings.json`, which can live at `~/.claude/settings.json` (global) or `.claude/settings.json` (project-level). Settings are merged by precedence (more specific scope wins on conflicts), so project settings can refine or override user defaults for that repository.

```json
{
  "permissions": {
    "allow": [
      "Read",
      "Write(src/**)",
      "Write(tests/**)",
      "Bash(npm test)"
    ],
    "deny": [
      "Bash(rm *)",
      "Bash(git push *)",
      "Write(config/prod*)",
      "Write(.env*)"
    ]
  }
}
```

The `allow` list specifies what the agent can do without asking. The `deny` list specifies what the agent is blocked from doing entirely. Anything not in either list will prompt the agent to ask for approval.

</div>
</details>

### Permission Pattern Syntax

<p class="ix-instruct">Click each pattern to reveal its scope level and what it actually matches.</p>

<div class="ix-diagram" data-component="pattern-grid" data-diagram-id="m02-permission-syntax">
  <span class="ix-title">Permission scope patterns</span>
  <div class="ix-pg-section" data-label="File Permissions">
    <div class="ix-pg-item" data-syntax="Read" data-meaning="Read any file in the project" data-scope="broad" data-example="Matches Read('src/auth.ts'), Read('config/db.ts'), Read('package.json') -- everything.">
    </div>
    <div class="ix-pg-item" data-syntax="Write" data-meaning="Write any file anywhere" data-scope="broad" data-example="Matches all writes. Use cautiously -- prefer scoped patterns below.">
    </div>
    <div class="ix-pg-item" data-syntax="Write(src/**)" data-meaning="Write only within src/ tree" data-scope="scoped" data-example="Matches Write('src/auth.ts'), Write('src/utils/helpers.ts'). Does NOT match Write('config/db.ts').">
    </div>
    <div class="ix-pg-item" data-syntax="Write(*.test.ts)" data-meaning="Write only test files" data-scope="scoped" data-example="Matches Write('auth.test.ts'), Write('utils.test.ts'). Does NOT match Write('auth.ts').">
    </div>
    <div class="ix-pg-item" data-syntax="Write(.env*)" data-meaning="Write .env files (typically in deny)" data-scope="scoped" data-example="Matches Write('.env'), Write('.env.local'), Write('.env.production'). Protect your secrets.">
    </div>
  </div>
  <div class="ix-pg-section" data-label="Bash Permissions">
    <div class="ix-pg-item" data-syntax="Bash" data-meaning="Run any shell command" data-scope="broad" data-example="Matches everything -- npm, git, rm, curl, sudo. Almost never what you want in the allow list.">
    </div>
    <div class="ix-pg-item" data-syntax="Bash(npm test)" data-meaning="This exact npm command only" data-scope="exact" data-example="Matches only 'npm test'. Does NOT match 'npm install' or 'npm run build'.">
    </div>
    <div class="ix-pg-item" data-syntax="Bash(npm *)" data-meaning="Any npm command" data-scope="scoped" data-example="Matches 'npm test', 'npm install lodash', 'npm run build'. Use when you trust all npm operations.">
    </div>
    <div class="ix-pg-item" data-syntax="Bash(git status)" data-meaning="This exact git command only" data-scope="exact" data-example="Read-only git. Does NOT match 'git push', 'git commit', or 'git checkout'.">
    </div>
    <div class="ix-pg-item" data-syntax="Bash(git *)" data-meaning="Any git command" data-scope="scoped" data-example="Matches 'git status', 'git diff', AND 'git push', 'git reset --hard'. More permissive than you might want.">
    </div>
    <div class="ix-pg-item" data-syntax="Bash(rm *)" data-meaning="Any rm command (typically in deny)" data-scope="scoped" data-example="Matches 'rm file.ts', 'rm -rf node_modules'. Put this in deny to prevent accidental deletions.">
    </div>
  </div>
  <div class="ix-pg-section" data-label="MCP Permissions">
    <div class="ix-pg-item" data-syntax="mcp__postgres__query" data-meaning="Allow this specific MCP tool" data-scope="exact" data-example="Allows read-only queries. Use alongside denying mcp__postgres__execute for safe database access.">
    </div>
    <div class="ix-pg-item" data-syntax="mcp__linear__create_issue" data-meaning="Allow creating Linear issues" data-scope="exact" data-example="Granular control over what the agent can do with external services.">
    </div>
  </div>
</div>

<details class="ix-collapse">
<summary>Starter recipe: typical TypeScript project</summary>
<div class="ix-collapse-body">
<pre class="ix-code-block">{ "permissions": {
  "allow": [
    "Read",                    // broad: read anything
    "Write(src/**)",           // scoped: source only
    "Write(tests/**)",         // scoped: test files
    "Bash(npm test)",          // exact: one command
    "Bash(npm run build)",     // exact: one command
    "Bash(npx tsc *)",         // scoped: tsc variants
    "Bash(git status)",        // exact: read-only git
    "Bash(git diff *)"         // scoped: diff variants
  ],
  "deny": [
    "Bash(rm *)",              // block all deletions
    "Bash(sudo *)",            // block escalation
    "Bash(git push *)",        // block push
    "Write(.env*)",            // protect secrets
    "Write(config/prod*)"      // protect prod config
  ]
} }</pre>
</div>
</details>

<p class="ix-instruct">Step through the terminal simulation to see permissions in action.</p>

<div class="ix-diagram" data-component="terminal-sim" data-diagram-id="m02-permission-terminal" data-xp="16">
  <span class="ix-title">Terminal Simulation: Permission Triage</span>

  <div class="ix-terminal-step">
    <div class="ix-term-cmd">claude</div>
    <pre class="ix-term-out">Loaded .claude/settings.json
permissions.allow: Read, Write(src/**), Bash(npm test)
permissions.deny: Bash(rm *), Bash(git push *)</pre>
    <p class="ix-term-note">Project policy is loaded before task execution.</p>
  </div>

  <div class="ix-terminal-step">
    <div class="ix-term-cmd">Tool request: Write(config/production.ts)</div>
    <pre class="ix-term-out">Approval required: action not in allow list.</pre>
    <p class="ix-term-note">Unspecified action in interactive mode requests human approval.</p>
  </div>

  <div class="ix-terminal-step">
    <div class="ix-term-cmd">Tool request: Bash(rm -rf tmp/cache)</div>
    <pre class="ix-term-out">Blocked: matches deny rule Bash(rm *)</pre>
    <p class="ix-term-note">Deny rules are enforced without override.</p>
  </div>

  <div class="ix-terminal-step">
    <div class="ix-term-cmd">Tool request: Bash(npm test)</div>
    <pre class="ix-term-out">Allowed and executed.
Test suite finished: 42 passed.</pre>
    <p class="ix-term-note">Allowed deterministic commands should execute without friction.</p>
  </div>
</div>

<details class="ix-collapse">
<summary>Reference: Permission Syntax Examples and Drill</summary>
<div class="ix-collapse-body">

Use the short forms below when drafting policy quickly.

```json
"Read"                       // broad read
"Write(src/**)"             // scoped write
"Bash(npm test)"            // explicit command
"Bash(rm *)"                // deny destructive command
```

Scope guidance:
- **Global** (`~/.claude/settings.json`): baseline posture across all repositories.
- **Project** (`.claude/settings.json`): task- and repo-specific refinements.

```json
{
  "permissions": {
    "allow": ["Read", "Write(src/**)", "Write(tests/**)", "Bash(npm test)"],
    "deny": ["Bash(rm *)", "Bash(git push *)", "Write(config/prod*)", "Write(.env*)"]
  }
}
```

Recommendation: start scoped, then expand only when repeated approvals are legitimate and low risk.

**Permission Drill:** Your agent must read all files, write only in `src/` and `tests/`, run `npm test` and `npm run build`, and must never run destructive shell commands or push to git. Draft the `permissions` block before you continue.

**Answer check:** include scoped `Write(...)` entries, explicit allow entries for the two Bash commands, and deny entries for `Bash(rm *)` and `Bash(git push *)`.

</div>
</details>

<p class="ix-instruct">Test your understanding of permission evaluation.</p>

<div class="ix-diagram" data-component="quiz" data-diagram-id="m02-permissions-check" data-xp="18">
  <span class="ix-title">Knowledge Check: Permission Evaluation</span>

  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q1.</strong> If an action matches both allow and deny patterns, what should happen?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="true">Deny wins; action is blocked</button>
      <button class="ix-quiz-option" data-correct="false">Allow wins; action proceeds</button>
      <button class="ix-quiz-option" data-correct="false">Agent asks for approval</button>
      <button class="ix-quiz-option" data-correct="false">Behavior is undefined</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: deny wins. Explicit deny rules are hard safety boundaries.</p>
  </div>

  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q2.</strong> Which allow rule is safer for routine development in a large repo?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false"><code>Write</code></button>
      <button class="ix-quiz-option" data-correct="true"><code>Write(src/**)</code></button>
      <button class="ix-quiz-option" data-correct="false"><code>Bash(*)</code></button>
      <button class="ix-quiz-option" data-correct="false"><code>Write(config/**)</code> for convenience</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: scoped write permissions. Least privilege reduces accidental blast radius.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q3.</strong> Your settings allow <code>Bash(npm test)</code> and deny <code>Bash(rm *)</code>. The agent wants to run <code>npm run clean</code> which is not in either list. What happens?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">Allowed -- npm commands are all permitted</button>
      <button class="ix-quiz-option" data-correct="false">Denied -- anything not explicitly allowed is blocked</button>
      <button class="ix-quiz-option" data-correct="true">The agent requests human approval since it matches neither allow nor deny</button>
      <button class="ix-quiz-option" data-correct="false">It runs silently without any check</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: approval requested. Actions not matching allow or deny rules fall through to the default behavior -- asking the human for explicit approval in interactive mode.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q4.</strong> An engineer adds <code>Bash(*)</code> to allow because they are tired of approval prompts. What is the security risk?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">None -- deny rules still override broad allow rules</button>
      <button class="ix-quiz-option" data-correct="false">Minimal -- the agent only runs safe commands anyway</button>
      <button class="ix-quiz-option" data-correct="true">Any command the agent decides to run will execute without human review, including destructive ones not in the deny list</button>
      <button class="ix-quiz-option" data-correct="false">It crashes the permission system entirely</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: broad allow is dangerous. While deny rules still block explicitly denied commands, any destructive command NOT in the deny list (like <code>git push --force</code> or <code>docker rm</code>) would run unchecked. Least privilege means allowing only what you specifically need.</p>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="core-idea">
<span class="ix-callout-label">Reference Config</span>
<div class="ix-callout-body">
<pre style="margin:0;font-family:'JetBrains Mono',monospace;font-size:12px;line-height:1.6;color:var(--muted)"><code>{
  "permissions": {
    "allow": ["Read", "Write(src/**)", "Write(tests/**)", "Bash(npm test)"],
    "deny": ["Bash(rm *)", "Bash(git push *)", "Write(config/prod*)", "Write(.env*)"]
  }
}</code></pre>
</div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="warning">
  <p><strong>Caution: Bypassing Permissions</strong></p>
  <p>Claude Code offers a mode that skips all permission prompts (<code>--dangerously-skip-permissions</code>). When active, the agent executes every action without asking -- reads, writes, deletes, shell commands, everything.</p>
  <ul>
    <li><strong>Never use in production environments.</strong> The agent could modify production configs, delete files, or execute destructive commands without human review.</li>
    <li><strong>Never use in enterprise environments.</strong> It violates the principle of least privilege, audit trail requirements, and security policies.</li>
    <li><strong>Only acceptable use: inside a dedicated sandbox or disposable container</strong> where the agent cannot affect real systems.</li>
  </ul>
  <p>If you need faster iteration, use broad <code>allow</code> rules for safe operations (like <code>Read</code>) rather than skipping permissions entirely. Broad allow rules still respect your deny list; skipping permissions does not.</p>
</div>

<p class="ix-instruct">Given the config above, click each action to predict how it resolves -- permitted, blocked, or ask human?</p>

<div class="ix-diagram" data-component="reveal-quiz" data-diagram-id="permission-quiz" data-variant="permission">
  <span class="ix-title">Test: how does each action resolve?</span>
  <div class="ix-reveal-item" data-answer="allow" data-label="Permitted">
    <div class="ix-reveal-prompt">Read("src/auth.ts")</div>
    <div class="ix-reveal-why">Matches "Read" -- all reads are allowed.</div>
  </div>
  <div class="ix-reveal-item" data-answer="allow" data-label="Permitted">
    <div class="ix-reveal-prompt">Write("src/auth.ts")</div>
    <div class="ix-reveal-why">Matches "Write(src/**)" -- writes within src/ allowed.</div>
  </div>
  <div class="ix-reveal-item" data-answer="deny" data-label="Blocked">
    <div class="ix-reveal-prompt">Write("config/production.ts")</div>
    <div class="ix-reveal-why">Matches "Write(config/prod*)" -- production config denied.</div>
  </div>
  <div class="ix-reveal-item" data-answer="allow" data-label="Permitted">
    <div class="ix-reveal-prompt">Bash("npm test")</div>
    <div class="ix-reveal-why">Exact match in allow list.</div>
  </div>
  <div class="ix-reveal-item" data-answer="deny" data-label="Blocked">
    <div class="ix-reveal-prompt">Bash("rm -rf node_modules")</div>
    <div class="ix-reveal-why">Matches "Bash(rm *)" -- all rm commands blocked.</div>
  </div>
  <div class="ix-reveal-item" data-answer="deny" data-label="Blocked">
    <div class="ix-reveal-prompt">Bash("git push origin main")</div>
    <div class="ix-reveal-why">Matches "Bash(git push *)" -- git push blocked.</div>
  </div>
  <div class="ix-reveal-item" data-answer="ask" data-label="Ask human">
    <div class="ix-reveal-prompt">Write("docs/README.md")</div>
    <div class="ix-reveal-why">Not in allow (only src/** and tests/**) and not in deny. Agent asks.</div>
  </div>
  <div class="ix-reveal-item" data-answer="ask" data-label="Ask human">
    <div class="ix-reveal-prompt">Bash("npm install lodash")</div>
    <div class="ix-reveal-why">Not in allow or deny. Agent must ask for approval.</div>
  </div>
  <div class="ix-reveal-item" data-answer="deny" data-label="Blocked">
    <div class="ix-reveal-prompt">Write(".env.local")</div>
    <div class="ix-reveal-why">Matches "Write(.env*)" -- env files are protected.</div>
  </div>
  <div class="ix-reveal-item" data-answer="ask" data-label="Ask human">
    <div class="ix-reveal-prompt">Bash("curl https://api.com")</div>
    <div class="ix-reveal-why">Not in allow or deny. Consider adding to deny if you block outbound HTTP.</div>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="tip">
  <p><strong>Least privilege.</strong> Configure only what the agent needs for the current task. <strong>Approval as signal.</strong> If the agent keeps asking to approve the same action, either add it to allow (if you trust it) or investigate why it's attempting it. <strong>Two layers stack.</strong> Global (~/.claude/settings.json) sets your baseline. Project (.claude/settings.json) adds project-specific permissions on top.</p>
</div>

<p class="ix-instruct">Press play to watch permission boundaries enforced in a live session.</p>

<div class="ix-diagram" data-component="agent-trace"
     data-variant="terminal"
     data-diagram-id="m02-permissions-live"
     data-speed="0.5">
  <span class="ix-title">Permission boundaries in a live session</span>

  <div class="ix-trace-line" data-type="prompt" data-delay="0">
    "Clean up the test fixtures and remove any unused helper files."
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="1500">
    Read(tests/fixtures/helpers.ts)
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="1500">
    File contents received -- Read is in the allow list, no approval needed
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="1500">
    Write(tests/fixtures/helpers.ts)
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="1500">
    File written -- Write(tests/**) is in the allow list
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="1500">
    Bash(rm tests/fixtures/old-data.json)
  </div>

  <div class="ix-trace-line" data-type="error" data-delay="2500">
    BLOCKED -- Bash(rm *) is in the deny list. This action cannot proceed.
  </div>

  <div class="ix-trace-line" data-type="think" data-delay="3500">
    The rm command is denied by permissions. I will note this file for manual removal instead of trying to delete it.
  </div>

  <div class="ix-trace-line" data-type="response" data-delay="2500">
    Updated helpers.ts to remove unused exports. Note: tests/fixtures/old-data.json appears unused but I cannot delete files (rm is denied). You can remove it manually: rm tests/fixtures/old-data.json
  </div>
</div>

---

## 2.4 MCP Servers: Extending Agent Capability

<div class="ix-diagram" data-component="objective">
  <p>Understand MCP as the way to give Claude Code access to external tools (databases, APIs, issue trackers). Know the two transport types, how to configure them, and how to debug when they don't connect.</p>
</div>

<div class="ix-diagram" data-component="callout" data-variant="core-idea">
  <p><strong>Without MCP</strong>, Claude Code can only read files and run bash commands. <strong>With MCP</strong>, it can query databases, create issues in Linear, fetch Notion pages, search vector stores -- any external tool exposed through the protocol. MCP tools work identically to built-in tools once connected.</p>
</div>

MCP servers expose three primitives: **Tools** (functions the agent can call), **Resources** (data for context), and **Prompts** (pre-defined templates).

### Transport Mechanisms

<p class="ix-instruct">Select each tab to compare stdio (local) and Streamable HTTP (remote) transports.</p>

<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="mcp-transport">
  <span class="ix-title">MCP transport mechanisms</span>

  <div class="ix-tab" data-tab="stdio (local)" data-accent="#6366f1">
    <div class="ix-flow-visual">
      <div class="ix-flow-node" data-phase="perceive">
        <i data-lucide="terminal"></i> Claude Code
      </div>
      <i data-lucide="arrow-right" class="ix-flow-arrow"></i>
      <div class="ix-flow-node" data-phase="neutral">
        <i data-lucide="square-terminal"></i> Subprocess
      </div>
    </div>
    <div class="ix-char-grid">
      <div class="ix-char-item"><strong>Process</strong><span>Subprocess on same machine</span></div>
      <div class="ix-char-item"><strong>Communication</strong><span>stdin / stdout pipes</span></div>
      <div class="ix-char-item"><strong>Lifecycle</strong><span>Starts and ends with session</span></div>
      <div class="ix-char-item"><strong>Use case</strong><span>Local dev servers, file tools</span></div>
    </div>
    <div class="ix-example-box" data-phase="perceive">
      <code>"command": "npx",<br>"args": ["-y", "@mcp/server-postgres", "postgresql://localhost/mydb"],<br>"type": "stdio"</code>
    </div>
    <div class="ix-cap-section">
      <div class="ix-cap-label">Setup complexity</div>
      <div class="ix-cap-track"><div class="ix-cap-fill" data-width="25%" data-phase="success"></div></div>
      <div class="ix-cap-val" data-phase="success">Low -- just command + args</div>
    </div>
  </div>

  <div class="ix-tab" data-tab="Streamable HTTP (remote)" data-accent="#06b6d4">
    <div class="ix-flow-visual">
      <div class="ix-flow-node" data-phase="act">
        <i data-lucide="terminal"></i> Claude Code
      </div>
      <i data-lucide="arrow-right" class="ix-flow-arrow"></i>
      <div class="ix-flow-node" data-phase="act">
        <i data-lucide="globe"></i> HTTP Service
      </div>
    </div>
    <div class="ix-char-grid">
      <div class="ix-char-item"><strong>Process</strong><span>External HTTP service</span></div>
      <div class="ix-char-item"><strong>Communication</strong><span>Network requests (HTTP)</span></div>
      <div class="ix-char-item"><strong>Lifecycle</strong><span>Persistent independently of session</span></div>
      <div class="ix-char-item"><strong>Use case</strong><span>Shared team servers, cloud APIs</span></div>
    </div>
    <div class="ix-example-box" data-phase="act">
      <code>"url": "https://mcp.linear.app/mcp",<br>"type": "http",<br>"headers": { "Authorization": "Bearer ${LINEAR_API_KEY}" }</code>
    </div>
    <div class="ix-cap-section">
      <div class="ix-cap-label">Setup complexity</div>
      <div class="ix-cap-track"><div class="ix-cap-fill" data-width="60%" data-phase="warning"></div></div>
      <div class="ix-cap-val" data-phase="warning">Medium -- URL + auth headers</div>
    </div>
  </div>
</div>

### Verifying MCP Connectivity

<p class="ix-instruct">Walk through the debug steps in order to diagnose common MCP connection failures.</p>

<div class="ix-diagram" data-component="debug-steps" data-diagram-id="mcp-debug">
  <span class="ix-title">When it doesn't connect</span>
  <div class="ix-debug-step">
    <div class="ix-debug-text">Test the command manually -- does the server process start?</div>
    <div class="ix-debug-cmd">npx -y @modelcontextprotocol/server-postgres "postgresql://localhost/mydb"</div>
  </div>
  <div class="ix-debug-step">
    <div class="ix-debug-text">Check environment variables -- are credentials actually set?</div>
    <div class="ix-debug-cmd">echo $LINEAR_API_KEY</div>
  </div>
  <div class="ix-debug-step">
    <div class="ix-debug-text">Start Claude Code and verify tools are available</div>
    <div class="ix-debug-cmd">claude > "What tools are available from the postgres MCP server?"</div>
  </div>
</div>

<p class="ix-instruct">Step through the terminal simulation to debug an MCP connectivity issue.</p>

<div class="ix-diagram" data-component="terminal-sim" data-diagram-id="m02-mcp-connectivity-terminal" data-xp="14">
  <span class="ix-title">Terminal Simulation: MCP Connectivity Debug Loop</span>

  <div class="ix-terminal-step">
    <div class="ix-term-cmd">claude</div>
    <pre class="ix-term-out">Session started.
MCP server status:
- postgres: unavailable
- linear: connected</pre>
    <p class="ix-term-note">Start with observed runtime state, not config assumptions.</p>
  </div>

  <div class="ix-terminal-step">
    <div class="ix-term-cmd">npx -y @modelcontextprotocol/server-postgres "postgresql://localhost/mydb"</div>
    <pre class="ix-term-out">Error: connect ECONNREFUSED 127.0.0.1:5432</pre>
    <p class="ix-term-note">Command launches, but dependency is down. This is not a syntax error.</p>
  </div>

  <div class="ix-terminal-step">
    <div class="ix-term-cmd">echo $LINEAR_API_KEY</div>
    <pre class="ix-term-out">sk_live_xxx... (set)</pre>
    <p class="ix-term-note">Verify env vars explicitly before assuming auth failures.</p>
  </div>

  <div class="ix-terminal-step">
    <div class="ix-term-cmd">Prompt: "What tools are available from postgres MCP server?"</div>
    <pre class="ix-term-out">No tools available from postgres (server unavailable).
Recommendation: restore database service and retry MCP handshake.</pre>
    <p class="ix-term-note">Close the loop with in-session tool visibility.</p>
  </div>
</div>

<p class="ix-instruct">Step through the trace and read each annotation to see MCP tools in action.</p>

<div class="ix-diagram" data-component="agent-trace"
     data-variant="annotated"
     data-diagram-id="m02-mcp-trace"
     data-default-mode="manual"
     data-speed="0.5">
  <span class="ix-title">MCP tools appear in traces just like native tools</span>

  <div class="ix-trace-line" data-type="prompt" data-delay="0">
    "How many users signed up last week?"
    <span class="ix-trace-annotation">A simple question, but it requires data the agent cannot get from the filesystem alone.</span>
  </div>

  <div class="ix-trace-line" data-type="think" data-delay="3500">
    I need to query the database. I have the postgres MCP server available with a query tool.
    <span class="ix-trace-annotation">The agent knows about the MCP tool because it was listed when the session started. MCP tools are discovered automatically.</span>
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="1500">
    mcp__postgres__query("SELECT COUNT(*) FROM users WHERE created_at > NOW() - INTERVAL '7 days'")
    <span class="ix-trace-annotation">MCP tool calls use the pattern: mcp__{server-name}__{tool-name}. This calls the "query" tool on the "postgres" MCP server.</span>
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="1500">
    [{"count": "142"}]
    <span class="ix-trace-annotation">The result comes back as structured data, just like any other tool result. The agent can use this in its response.</span>
  </div>

  <div class="ix-trace-line" data-type="think" data-delay="3500">
    142 signups. Let me also check the previous week for comparison.
    <span class="ix-trace-annotation">The agent decides to add context on its own -- a sign of good reasoning. It was not asked for a comparison, but it anticipates the follow-up.</span>
  </div>

  <div class="ix-trace-line" data-type="tool" data-delay="1500">
    mcp__postgres__query("SELECT COUNT(*) FROM users WHERE created_at BETWEEN NOW() - INTERVAL '14 days' AND NOW() - INTERVAL '7 days'")
  </div>

  <div class="ix-trace-line" data-type="result" data-delay="1500">
    [{"count": "98"}]
  </div>

  <div class="ix-trace-line" data-type="response" data-delay="2500">
    142 users signed up in the last 7 days, up from 98 the previous week (45% increase).
    <span class="ix-trace-annotation">The response synthesizes two MCP tool results into an actionable insight. This is the value of giving agents access to external data sources.</span>
  </div>
</div>

<p class="ix-instruct">Test your understanding of MCP configuration and verification.</p>

<div class="ix-diagram" data-component="quiz" data-diagram-id="m02-mcp-check" data-xp="14">
  <span class="ix-title">Knowledge Check: MCP Configuration & Verification</span>

  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q1.</strong> For a remote MCP server with bearer authentication, which fields are essential?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false"><code>command</code> + <code>args</code> only</button>
      <button class="ix-quiz-option" data-correct="true"><code>url</code>, <code>type: "http"</code>, and auth header</button>
      <button class="ix-quiz-option" data-correct="false"><code>stdio</code> only</button>
      <button class="ix-quiz-option" data-correct="false">No config required after install</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: URL + HTTP type + auth headers for remote connectivity.</p>
  </div>

  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q2.</strong> What is the most reliable first verification step after adding an MCP server?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">Assume it works if JSON parses</button>
      <button class="ix-quiz-option" data-correct="true">Ask Claude Code to list tools from that server in-session</button>
      <button class="ix-quiz-option" data-correct="false">Commit config immediately</button>
      <button class="ix-quiz-option" data-correct="false">Skip verification if environment variables exist</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: in-session tool listing confirms actual runtime availability, not just syntactic config.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q3.</strong> How many primitive types does the MCP protocol define?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">Two: Tools and Resources</button>
      <button class="ix-quiz-option" data-correct="true">Three: Tools, Resources, and Prompts</button>
      <button class="ix-quiz-option" data-correct="false">Four: Tools, Resources, Prompts, and Schemas</button>
      <button class="ix-quiz-option" data-correct="false">Five: Tools, Resources, Prompts, Schemas, and Events</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: three. MCP defines exactly three primitive types -- Tools (executable actions), Resources (readable data), and Prompts (reusable templates).</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q4.</strong> A tutorial recommends using SSE (Server-Sent Events) for connecting to a remote MCP server. Is this advice current?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="false">Yes -- SSE is the standard remote transport</button>
      <button class="ix-quiz-option" data-correct="false">Yes -- SSE and Streamable HTTP are interchangeable</button>
      <button class="ix-quiz-option" data-correct="true">No -- SSE is deprecated; Streamable HTTP is the current remote transport</button>
      <button class="ix-quiz-option" data-correct="false">No -- remote MCP servers are not supported at all</button>
    </div>
    <p class="ix-quiz-explanation">Correct answer: SSE is deprecated. The MCP specification deprecated SSE as of March 2025 in favor of Streamable HTTP for remote server connections. Tutorials recommending SSE are outdated. Local servers still use stdio.</p>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="tip">
  <p><strong>MCP tools use the same permission model.</strong> Allow or deny with <code>mcp__{server}__{tool}</code> in settings.json. Example: allow <code>mcp__postgres__query</code> but deny <code>mcp__postgres__execute</code> for read-only access.</p>
</div>

<details class="ix-collapse">
<summary>View MCP permissions configuration example</summary>
<div class="ix-collapse-body">

MCP tool calls follow the same permission model as built-in tools. The pattern is `mcp__{server-name}__{tool-name}`.

```json
{
  "permissions": {
    "allow": [
      "mcp__postgres__query",
      "mcp__linear__create_issue"
    ],
    "deny": [
      "mcp__postgres__execute"
    ]
  }
}
```

This gives you fine-grained control over which MCP capabilities the agent can use without approval.

</div>
</details>

---

## 2.5 Reading Claude Code Output

<div class="ix-diagram" data-component="objective">
  <p>Read agent output efficiently across its three layers -- thinking, tool calls, and response. Know where to focus and when to step in vs. let the agent iterate.</p>
</div>

<p class="ix-instruct">Click each output layer to see what it looks like, what to watch for, and how to act on it.</p>

<div class="ix-diagram" data-component="click-cards" data-diagram-id="agent-output-layers">
  <span class="ix-title">Agent output layers</span>

  <div class="ix-card" data-accent="#6366f1">
    <i data-lucide="brain" class="ix-card-icon"></i>
    <span class="ix-card-label">Layer 1: Thinking</span>
  </div>

  <div class="ix-card" data-accent="#06b6d4">
    <i data-lucide="wrench" class="ix-card-icon"></i>
    <span class="ix-card-label">Layer 2: Tool Calls</span>
  </div>

  <div class="ix-card" data-accent="#10b981">
    <i data-lucide="message-square" class="ix-card-icon"></i>
    <span class="ix-card-label">Layer 3: Response</span>
  </div>

  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="perceive">Layer 1: Thinking</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">What it contains</div>
        <div class="ix-sec-text">Internal reasoning, assumptions, plan of attack. The agent's scratchpad before it acts.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">How to read it</div>
        <div class="ix-sec-text">Skim for the agent's plan and any wrong assumptions. This is the highest-leverage intervention point.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Engineer action</div>
        <div class="ix-char-grid">
          <div class="ix-char-item"><strong>Intervention</strong><span>Redirect before the agent acts on a wrong plan</span></div>
          <div class="ix-char-item"><strong>Signal</strong><span>Wrong assumption = stop immediately</span></div>
        </div>
      </div>
      <div class="ix-cap-section">
        <div class="ix-cap-label">Intervention leverage</div>
        <div class="ix-cap-track"><div class="ix-cap-fill" data-width="95%" data-phase="perceive"></div></div>
        <div class="ix-cap-val" data-phase="perceive">Highest -- before action</div>
      </div>
    </div>
  </div>

  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="act">Layer 2: Tool Calls</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">What it contains</div>
        <div class="ix-sec-text">Concrete actions: Read, Write, Bash, MCP calls. Each followed by its result (file contents, command output, write confirmation).</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">How to read it</div>
        <div class="ix-sec-text">Track the sequence at a high level. What is it reading? What is it writing? Is it looping or making progress?</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Engineer action</div>
        <div class="ix-char-grid">
          <div class="ix-char-item"><strong>Intervention</strong><span>Watch for loops, wrong scope, unexpected files</span></div>
          <div class="ix-char-item"><strong>Signal</strong><span>Repeated commands = possible stuck state</span></div>
        </div>
      </div>
      <div class="ix-cap-section">
        <div class="ix-cap-label">Intervention leverage</div>
        <div class="ix-cap-track"><div class="ix-cap-fill" data-width="60%" data-phase="act"></div></div>
        <div class="ix-cap-val" data-phase="act">Medium -- during execution</div>
      </div>
    </div>
  </div>

  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="observe">Layer 3: Response</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">What it contains</div>
        <div class="ix-sec-text">Synthesis and summary. What the agent reports back: actions taken, decisions made, follow-up questions.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">How to read it</div>
        <div class="ix-sec-text">Read carefully. Verify that the summary matches the actual diff. Check for omissions or mischaracterizations.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Engineer action</div>
        <div class="ix-char-grid">
          <div class="ix-char-item"><strong>Intervention</strong><span>Verify: does the summary match what actually changed?</span></div>
          <div class="ix-char-item"><strong>Signal</strong><span>Summary mismatch = review the diff directly</span></div>
        </div>
      </div>
      <div class="ix-cap-section">
        <div class="ix-cap-label">Intervention leverage</div>
        <div class="ix-cap-track"><div class="ix-cap-fill" data-width="30%" data-phase="observe"></div></div>
        <div class="ix-cap-val" data-phase="observe">Post-hoc -- verify outputs</div>
      </div>
    </div>
  </div>
</div>

### When to Intervene vs. Hold

<p class="ix-instruct">Review each scenario to decide: intervene or hold?</p>

<div class="ix-diagram" data-component="intervention" data-diagram-id="when-to-intervene">
  <span class="ix-title">When to intervene vs. hold</span>
  <div class="ix-int-item" data-action="intervene">
    <div class="ix-int-text"><strong>Wrong plan</strong> -- the thinking reveals a wrong assumption, wrong library, or wrong scope. Cheaper to fix now than after.</div>
  </div>
  <div class="ix-int-item" data-action="intervene">
    <div class="ix-int-text"><strong>Loop detected</strong> -- same edit, same failure, no progress. The agent is stuck and needs your redirect.</div>
  </div>
  <div class="ix-int-item" data-action="hold">
    <div class="ix-int-text"><strong>Unexpected path</strong> -- the agent is doing something you didn't anticipate, but the reasoning looks sound. Read the thinking first.</div>
  </div>
  <div class="ix-int-item" data-action="hold">
    <div class="ix-int-text"><strong>Test failures mid-task</strong> -- normal Agentic Loop behavior. The agent will observe the failure and fix it in the next cycle.</div>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="approval">
  <p><strong>For high-stakes tasks, use the approval pattern.</strong> Ask the agent to show its complete plan before making any changes: which files it will modify, what changes to each, and in what order. One extra exchange eliminates the need to roll back.</p>
</div>

---

## 2.6 Putting It Together: Project Setup Exercise

<div class="ix-diagram" data-component="objective">
  <p>Configure a new project for Claude Code from scratch -- writing the CLAUDE.md, setting permissions, connecting MCP, and verifying -- in under 30 minutes.</p>
</div>

You explored modes, CLAUDE.md, permissions, and MCP individually in Sections 2.1 through 2.5. Now put them all together in sequence. This checklist walks through a complete project setup, applying everything from this module.

<p class="ix-instruct">Click each step to expand it. Check off sub-tasks as you complete them to track your progress.</p>

<div class="ix-diagram" data-component="step-checklist" data-diagram-id="m02-project-setup" data-xp="20">
  <span class="ix-title">Project setup from scratch</span>
  <div class="ix-checklist-step" data-step-name="Write CLAUDE.md" data-step-time="~10 min">
    <p class="ix-checklist-desc">Create the project briefing with architecture, conventions, constraints, and decisions. Building on the CLAUDE.md patterns from Section 2.2, make every entry decidable.</p>
    <div class="ix-checklist-item">Add <code>## Architecture</code> -- what the system does, how it is structured, key directories</div>
    <div class="ix-checklist-item">Add <code>## Conventions</code> -- validation library, export style, error handling pattern</div>
    <div class="ix-checklist-item">Add <code>## Key files</code> -- schema, routes, config files the agent will need</div>
    <div class="ix-checklist-item">Add <code>## Constraints</code> -- files never to modify, actions requiring approval</div>
    <div class="ix-checklist-item">Add <code>## Decided</code> -- settled architectural choices (ORM, test framework, auth approach)</div>
    <div class="ix-checklist-verify"><code>cat CLAUDE.md</code> -- Review: is every entry decidable? Could an agent act on it?</div>
  </div>
  <div class="ix-checklist-step" data-step-name="Configure settings.json" data-step-time="~8 min">
    <p class="ix-checklist-desc">Set up permissions so the agent can work within safe boundaries. Apply the scope patterns you learned in Section 2.3 -- start restrictive, expand only when needed.</p>
    <div class="ix-checklist-item">Create <code>.claude/settings.json</code> in the project root</div>
    <div class="ix-checklist-item">Add <code>"allow"</code> list -- Read, Write(src/**), Write(tests/**), Bash(npm test), Bash(git status)</div>
    <div class="ix-checklist-item">Add <code>"deny"</code> list -- Bash(rm *), Bash(sudo *), Bash(git push *), Write(.env*)</div>
    <div class="ix-checklist-item">Review: does the allow list match only what this project needs?</div>
    <div class="ix-checklist-verify"><code>cat .claude/settings.json</code> -- Validate JSON syntax</div>
  </div>
  <div class="ix-checklist-step" data-step-name="Connect MCP servers" data-step-time="~8 min">
    <p class="ix-checklist-desc">Add any external tools the agent needs -- database, issue tracker, etc. This applies the MCP setup from Section 2.4.</p>
    <div class="ix-checklist-item">Add <code>"mcpServers"</code> block to settings.json with server configs</div>
    <div class="ix-checklist-item">For stdio servers: verify the command runs manually in your terminal</div>
    <div class="ix-checklist-item">For HTTP servers: verify the URL with <code>curl</code> and check API key env vars</div>
    <div class="ix-checklist-item">Set environment variables for any credentials (<code>export VAR=value</code>)</div>
    <div class="ix-checklist-verify"><code>npx -y @modelcontextprotocol/server-postgres "postgresql://localhost/mydb"</code></div>
  </div>
  <div class="ix-checklist-step" data-step-name="Verify the configuration" data-step-time="~4 min">
    <p class="ix-checklist-desc">Start Claude Code and confirm everything works end-to-end. This is where you catch missing permissions, vague CLAUDE.md entries, and connectivity issues.</p>
    <div class="ix-checklist-item">Run <code>claude</code> and ask: "What do you know about this project?"</div>
    <div class="ix-checklist-item">Verify CLAUDE.md content is reflected in the response</div>
    <div class="ix-checklist-item">Ask: "What MCP tools are available?" -- confirm servers connected</div>
    <div class="ix-checklist-item">Run a simple task that exercises permissions (e.g., "run the test suite")</div>
    <div class="ix-checklist-verify"><code>claude</code> -- then: "What do you know about this project?" and "What MCP tools are available?"</div>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="tip">
  <p><strong>Target: 30 minutes.</strong> A senior engineer should be able to complete this setup in under 30 minutes. If it takes longer, check whether your CLAUDE.md is too verbose (Section 2.2) or your permissions too fine-grained (Section 2.3). Start simple, then refine in later sessions.</p>
</div>

---

<details class="ix-collapse">
<summary>Best Practices Summary</summary>
<div class="ix-collapse-body">

**CLAUDE.md**
- Do: Write concrete, decidable guidance ("use Zod for validation, not Joi")
- Do: Update `CLAUDE.md` when the agent makes a mistake that better context would have prevented
- Do: Include architecture overview, conventions, key files, constraints, and decided questions
- Don't: Put secrets, credentials, or API keys anywhere near `CLAUDE.md`
- Don't: Write aspirational principles -- only write actionable guidance
- Don't: Leave per-task instructions in `CLAUDE.md` -- they become permanent standing orders

**Permissions**
- Do: Start with a restrictive configuration and add permissions as needed
- Do: Scope write permissions to specific directories (`Write(src/**)` not `Write`)
- Do: Explicitly deny high-risk commands (`rm`, `sudo`, `git push`)
- Don't: Grant broad `Bash` permissions to avoid approval prompts
- Don't: Configure permissions to match the maximum the agent might ever need -- configure for the current task

**MCP Servers**
- Do: Verify connectivity after adding a new server before relying on it
- Do: Use environment variables for credentials -- never hardcode them in `settings.json`
- Do: Use `stdio` transport for local development servers, Streamable HTTP for remote services
- Don't: Use the older HTTP+SSE transport pattern for new integrations -- Streamable HTTP supersedes it in MCP 2025-03-26
- Don't: Grant MCP tool access without considering what those tools can do

**Output Reading**
- Do: Read thinking blocks before major actions -- this is the best intervention point
- Do: Review diffs of changed files before accepting agent output
- Do: Use the approval pattern (show me the plan first) for high-stakes tasks
- Don't: Accept agent output without understanding what changed and why
- Don't: Intervene just because the agent's path is unexpected -- read the reasoning first

</div>
</details>

<details class="ix-collapse">
<summary>Key Concepts for Review</summary>
<div class="ix-collapse-body">

**Interactive mode:** `claude` -- starts a session with accumulated conversation context. Best for exploratory and complex tasks where mid-task direction may be needed.

**Non-interactive mode:** `claude -p "prompt"` -- single-shot execution. Output goes to `stdout`. Best for scripted and automated workflows.

**CLAUDE.md:** The Markdown file Claude Code reads at session start. Contains standing context: architecture, conventions, constraints, decisions. Persists between sessions. Never contains secrets.

**Permissions:** Configured in `settings.json`. The `allow` list specifies what the agent can do without approval; the `deny` list specifies what's blocked. Path patterns and command patterns scope permissions precisely.

**MCP (Model Context Protocol):** The standard for extending Claude Code with external tools and data. Servers use either `stdio` (local subprocess) or Streamable HTTP (remote service) transport; Streamable HTTP supersedes the legacy HTTP+SSE pattern.

**Approval pattern:** Asking the agent to produce a plan before executing it -- useful for high-stakes tasks that touch many files or have hard-to-reverse consequences.

</div>
</details>

---

## Lab Connection

In Lab 02, you'll configure a project from scratch: writing a `CLAUDE.md` for a provided codebase, configuring a `settings.json` with appropriate permissions, connecting an MCP server (postgres or filesystem), and verifying the configuration by running a structured set of tasks. The lab is designed to surface common configuration mistakes -- missing permissions, overly vague `CLAUDE.md`, connectivity issues -- in a safe environment.

---

## Further Reading

### Official Documentation

- [Claude Code Overview](https://docs.anthropic.com/en/docs/claude-code/overview) — Anthropic's official reference for Claude Code installation, configuration, and core capabilities.

- [Claude Code GitHub Repository](https://github.com/anthropics/claude-code) — Source, release notes, and issue tracker. The changelog is the most reliable record of new features and breaking changes.

- [Claude Code Settings Reference](https://docs.anthropic.com/en/docs/claude-code/settings) — Complete reference for `settings.json` permission model, path patterns, and tool allow/deny configuration.

- [Claude Code MCP Guide](https://docs.anthropic.com/en/docs/claude-code/mcp) — Official setup and transport guidance for MCP servers in Claude Code.

- [MCP Core Specification (2025-03-26)](https://modelcontextprotocol.io/specification/2025-03-26) — Canonical protocol reference (including transport and capability model).

### Research Papers

- Wei, J., Wang, X., Schuurmans, D., Bosma, M., Ichter, B., Xia, F., Chi, E., Le, Q., & Zhou, D. (2022). Chain-of-thought prompting elicits reasoning in large language models. *Advances in Neural Information Processing Systems, 35*. https://arxiv.org/abs/2201.11903 *(Foundational paper on how structured prompting enables multi-step reasoning — directly relevant to CLAUDE.md design)*

- Yao, S., Zhao, J., Yu, D., Du, N., Shafran, I., Narasimhan, K., & Cao, Y. (2023). ReAct: Synergizing reasoning and acting in language models. *International Conference on Learning Representations (ICLR)*. https://arxiv.org/abs/2210.03629 *(The reasoning + action pattern that underpins Claude Code's tool-use loop)*

---

## Companion Media (NotebookLM)

- [Module 02 Slide Deck (PDF)](https://notebooklm.google.com/notebook/742e3671-5a55-4420-b2a2-5e960e241b2c)
- [Module 02 Explainer Video (open in Notebook Workspace)](https://notebooklm.google.com/notebook/742e3671-5a55-4420-b2a2-5e960e241b2c)
- [Notebook Workspace (all companion media)](https://notebooklm.google.com/notebook/742e3671-5a55-4420-b2a2-5e960e241b2c)

---

[Next Module → Module 03: Agent Thinking](/module/03)
