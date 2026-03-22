<div class="ix-diagram" data-component="module-hero">
<div class="ix-hero">
<div class="ix-hero-bg"></div>
<div class="ix-hero-module-num">Module 09</div>
<div class="ix-hero-title">Multi-Agent Systems</div>
<div class="ix-hero-subtitle">Know when to split work across agents, design orchestrator patterns, structure inter-agent communication, and handle failure gracefully</div>
<div class="ix-hero-chips">
<span class="ix-hero-chip">Single vs Multi-Agent Decision</span>
<span class="ix-hero-chip">Orchestrator Patterns</span>
<span class="ix-hero-chip">Task Decomposition</span>
<span class="ix-hero-chip">Structured Communication</span>
<span class="ix-hero-chip">Failure Recovery</span>
</div>
</div>
</div>

# Module 09: Multi-Agent Systems
## Agentic AI Engineering -- 3-Day Intensive Course

---

## Overview

<div class="ix-diagram" data-component="objective">
  <p>Determine when tasks warrant multi-agent decomposition, design orchestrator/sub-agent architectures, specify structured inter-agent communication, and handle the three primary failure modes.</p>
</div>

Everything from Modules 01-08 assumed a single agent: one session, one context, one Agentic Loop (PRAO) chain. In Module 07 you composed skills into multi-step workflows within a single agent, and in Module 08 you learned how to generate and evaluate the specialist artifacts those workflows depend on. Now you will learn when to break that single-agent boundary -- and, critically, when NOT to. Understanding the difference is the core skill this module develops. For sub-agent mechanics, see the [Claude Code Sub-agents docs](https://docs.anthropic.com/en/docs/claude-code/sub-agents).

---

## 9.1 Why Multi-Agent Systems

<div class="ix-diagram" data-component="objective">
  <p>Apply a four-question decision framework to determine whether a task warrants multi-agent decomposition or is better served by a single well-prompted agent.</p>
</div>

In Module 07 you composed skills into pipelines within a single agent session. In Module 08 you learned how to generate, evaluate, and stabilize those specialist skills and rubrics. Multi-agent extends that idea across session boundaries -- but at a real cost in complexity, debugging difficulty, and coordination overhead.

<p class="ix-instruct">Write your prediction, then reveal the reference reasoning.</p>

<div class="ix-diagram" data-component="predict-reveal" data-diagram-id="m09-multi-agent-predict" data-xp="8">
  <span class="ix-title">Predict Before You Learn</span>
  <p class="ix-predict-prompt">You have a code review pipeline that checks security, performance, documentation, and test coverage. Currently, a single agent runs all four checks sequentially, taking about 4 minutes total. A colleague suggests using four agents in parallel. Before you agree, what costs and risks should you consider? Under what conditions would you say "no, keep it single-agent"?</p>
  <textarea class="ix-predict-input" aria-label="Your prediction" placeholder="Write your reasoning -- what costs and risks would you expect and why?"></textarea>
  <details class="ix-predict-reveal">
    <summary>Reveal reference reasoning</summary>
    <p>Multi-agent adds <strong>coordination overhead</strong> (15-20 seconds for orchestration on a 30-second task), <strong>aggregation complexity</strong> (4 result sets to merge with potential conflicts and deduplication), and <strong>debugging difficulty</strong> (4 logs instead of 1, with errors potentially originating in any sub-agent or the aggregation step). It is justified only when subtasks are genuinely independent, the aggregation strategy is clear, and the net time benefit exceeds coordination cost. Many tasks that <em>seem</em> to need multi-agent only need better prompting of a single agent.</p>
  </details>
</div>

<p class="ix-instruct">Click each card to explore the three legitimate motivations for multi-agent systems.</p>

<div class="ix-diagram" data-component="click-cards" data-diagram-id="m09-three-motivations">
  <span class="ix-title">Three Legitimate Motivations for Multi-Agent</span>
  <div class="ix-card" data-phase="act">
    <i data-lucide="git-branch" class="ix-card-icon"></i>
    <span class="ix-card-label">Parallelism</span>
  </div>
  <div class="ix-card" data-phase="reason">
    <i data-lucide="settings" class="ix-card-icon"></i>
    <span class="ix-card-label">Specialization</span>
  </div>
  <div class="ix-card" data-phase="perceive">
    <i data-lucide="boxes" class="ix-card-icon"></i>
    <span class="ix-card-label">Context Isolation</span>
  </div>
  <!-- Detail panels -->
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="act">Parallelism</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">When It Applies</div>
        <div class="ix-sec-text">Independent subtasks running simultaneously. This is the most frequently valid motivation. A code review checking security, performance, docs, and tests in parallel finishes in one-quarter the time of a sequential single agent.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Requirements</div>
        <div class="ix-sec-text">No shared mutable state between subtasks. Each subtask can be fully specified without knowing outputs of others. Aggregation of results after the fact is straightforward.</div>
      </div>
      <p class="ix-note"><strong>Key test:</strong> Can you write the input specification for every subtask before any of them runs? If yes, parallelism is valid.</p>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="reason">Specialization</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">When It Applies</div>
        <div class="ix-sec-text">Different subtasks benefit from different system prompts, tools, or MCP server configurations. A research sub-agent needs web fetch tools and an exploratory prompt. A synthesis sub-agent needs no external tools and a precise, conservative prompt.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Why One Agent Cannot Do Both</div>
        <div class="ix-sec-text">You cannot simultaneously optimize one agent for exploratory comprehensiveness and precise conservatism. Two agents with different configurations let you optimize each mode independently.</div>
      </div>
      <p class="ix-note"><strong>Key test:</strong> Would the system prompts or tool configurations for the subtasks be contradictory if combined into one agent?</p>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="perceive">Context Isolation</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">When It Applies</div>
        <div class="ix-sec-text">The task is too large to fit in a single context window -- the codebase is too large, the document corpus too extensive. Multiple agents, each working on a bounded slice, can process inputs that would exceed any single context.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Reality Check</div>
        <div class="ix-sec-text">This is the least common justification in practice. Context windows have grown substantially, and many situations that required context isolation in 2023 are handled in a single context today.</div>
      </div>
      <p class="ix-note"><strong>Key test:</strong> Have you actually measured that the task exceeds context limits, or are you assuming it does?</p>
    </div>
  </div>
</div>

<p class="ix-instruct">Click each cost to determine whether to intervene or hold steady.</p>

<div class="ix-diagram" data-component="intervention" data-diagram-id="m09-real-costs">
  <span class="ix-title">The Real Costs of Multi-Agent</span>
  <div class="ix-intervention-item" data-badge="intervene">
    <div class="ix-intervention-label">Coordination overhead</div>
    <div class="ix-intervention-body">15-20 second penalty for orchestration on tasks that take 30 seconds single-agent. That is a 50% time penalty before you see any benefit from parallelism. For short tasks, coordination cost may exceed the entire single-agent execution time.</div>
  </div>
  <div class="ix-intervention-item" data-badge="intervene">
    <div class="ix-intervention-label">Aggregation complexity</div>
    <div class="ix-intervention-body">Grows nonlinearly with the number of sub-agents. 5 agents means 4 potential conflicts to resolve, 5 schema variations to normalize, and a combinatorial explosion in how partial failure can manifest. The orchestrator's aggregation job is harder than it appears.</div>
  </div>
  <div class="ix-intervention-item" data-badge="intervene">
    <div class="ix-intervention-label">Debugging difficulty</div>
    <div class="ix-intervention-body">One agent means one log, one context, one trace. N agents means N logs plus aggregation logic to examine. Errors may originate in any sub-agent, compound at the aggregation step, or be masked by partial-result-acceptance policies. Reproducing multi-agent failures is genuinely hard.</div>
  </div>
  <div class="ix-intervention-item" data-badge="hold">
    <div class="ix-intervention-label">Honest assessment</div>
    <div class="ix-intervention-body">If single-agent takes 10 minutes and multi-agent takes 3 minutes plus 2 minutes coordination, the net benefit is 5 minutes. Worth it for repeated pipelines processing hundreds of tasks. Rarely worth it for one-off tasks where you also pay the engineering cost of building the system.</div>
  </div>
</div>

<p class="ix-instruct">Step through the four-question decision framework in order.</p>

<div class="ix-diagram" data-component="step-walkthrough" data-diagram-id="m09-decision-framework">
  <span class="ix-title">The Four-Question Decision Framework</span>
  <div class="ix-step" data-step="1">
    <div class="ix-step-label">Can a single agent do this?</div>
    <div class="ix-step-body">
      <p>Start here, not at question 2. Take ten minutes and sketch a single-agent approach. Most of the time, this produces something workable. If you find a genuine blocker -- the task is parallelizable and time matters, or one context window is physically insufficient -- move to question 2.</p>
      <p class="ix-note"><strong>The default answer is yes.</strong> You need a specific, named reason to proceed.</p>
    </div>
  </div>
  <div class="ix-step" data-step="2">
    <div class="ix-step-label">Are the subtasks actually independent?</div>
    <div class="ix-step-body">
      <p>Independent means three things simultaneously: Subtask B does not need the output of Subtask A. Subtasks do not modify the same files or data structures. You can fully specify inputs to each subtask before any runs. If the answer to any of these is no, you have a dependency chain, not a parallelism opportunity.</p>
    </div>
  </div>
  <div class="ix-step" data-step="3">
    <div class="ix-step-label">Is the aggregation strategy clear?</div>
    <div class="ix-step-body">
      <p>Design the aggregation BEFORE designing the agents. How will you combine their outputs? What happens when they conflict? What happens when one fails? If you cannot articulate a clear aggregation strategy, the subtask decomposition is probably wrong.</p>
    </div>
  </div>
  <div class="ix-step" data-step="4">
    <div class="ix-step-label">Does the benefit outweigh coordination cost?</div>
    <div class="ix-step-body">
      <p>Estimate wall-clock time saved by parallelism. Compare it to engineering time to build and maintain the system, plus debugging time when it fails. One-time tasks: rarely justified. Continuous pipelines with significant throughput: often justified.</p>
    </div>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="core-idea">
  <p><strong>Start single-agent</strong>: Multi-agent is not inherently better. It solves a specific class of problems -- parallelism, specialization, or context isolation. If you cannot articulate which motivation applies, you do not need multi-agent.</p>
</div>

---

## 9.2 Orchestrator Patterns

<div class="ix-diagram" data-component="objective">
  <p>Distinguish between fan-out/fan-in, pipeline, and conditional routing patterns and select the appropriate one for a given task structure.</p>
</div>

With the decision framework from 9.1 confirming that multi-agent is warranted, the next question is how to structure the agents. Three patterns cover the vast majority of production systems.

<p class="ix-instruct">Switch between tabs to compare the three orchestrator patterns and the hybrid approach.</p>

<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="m09-orchestrator-patterns">
  <span class="ix-title">Three Orchestrator Patterns</span>
  <div data-tab="Fan-Out / Fan-In">
    <p><strong>One input, N parallel agents, one aggregated output.</strong> The orchestrator decomposes the input into N independent sub-tasks, dispatches each to a dedicated sub-agent, and aggregates all N results back into a single output.</p>
    <div class="ix-char-grid">
      <div class="ix-char-item" data-phase="act"><strong>Orchestrator Job 1</strong><span>Decompose the input into correctly scoped sub-task specifications. Vague specs produce vague results that are hard to aggregate.</span></div>
      <div class="ix-char-item" data-phase="act"><strong>Orchestrator Job 2</strong><span>Dispatch all sub-agents in parallel using <code>run_in_background: true</code>, managing concurrency.</span></div>
      <div class="ix-char-item" data-phase="error"><strong>Orchestrator Job 3 (hardest)</strong><span>Aggregation: collect outputs, validate schemas, resolve conflicts, deduplicate, synthesize a coherent result.</span></div>
    </div>
    <p class="ix-note"><strong>When to use:</strong> Subtasks are genuinely independent, no shared mutable state, aggregation is well-defined. This is the most common and most useful pattern.</p>
  </div>
  <div data-tab="Pipeline">
    <p><strong>Sequential transformation: Agent A output becomes Agent B input.</strong> Each agent transforms the data, passing results forward. Appropriate when each stage needs the full output of the previous stage.</p>
    <div class="ix-char-grid">
      <div class="ix-char-item" data-phase="observe"><strong>Critical Design Decision</strong><span>The interface between stages is a contract. Changing Agent N's output format without updating Agent N+1 breaks the pipeline. Treat these interfaces with the same rigor as public APIs.</span></div>
    </div>
    <p class="ix-note"><strong>Before designing a pipeline, ask:</strong> Could a single, well-prompted agent perform all transformations in sequence? Often the answer is yes.</p>
  </div>
  <div data-tab="Conditional Routing">
    <p><strong>Classify-then-route to specialists.</strong> A classifier agent evaluates the input and routes to different specialists based on the result. More complex because routing logic itself becomes a potential failure point.</p>
    <div class="ix-char-grid">
      <div class="ix-char-item" data-phase="error"><strong>The Hidden Risk</strong><span>If the classifier is wrong -- routes a bug report to the feature assessment agent -- the error propagates invisibly. The specialist produces plausible-looking output for the wrong kind of task.</span></div>
      <div class="ix-char-item" data-phase="success"><strong>The Mitigation</strong><span>Build validation into the synthesis stage that checks whether the specialist's output is consistent with the routing decision.</span></div>
    </div>
    <p class="ix-note"><strong>When to use:</strong> Input types are categorically different and require genuinely different processing strategies.</p>
  </div>
  <div data-tab="Hybrid">
    <p><strong>Combine patterns at different levels.</strong> A fan-out where some branches are themselves pipelines. An outer fan-out with inner conditional routing for complex cases.</p>
    <div class="ix-char-grid">
      <div class="ix-char-item" data-phase="perceive"><strong>The Complexity Cost</strong><span>Each layer of nesting multiplies debugging complexity. Document the pattern explicitly -- preferably as a diagram in <code>CLAUDE.md</code> -- so future maintainers understand the structure without reverse-engineering it.</span></div>
    </div>
    <p class="ix-note"><strong>Rule of thumb:</strong> If you cannot draw the full pattern on a whiteboard in under 60 seconds, the nesting is probably too deep.</p>
  </div>
</div>

<p class="ix-instruct">Step through the trace and read each annotation to understand how the orchestrator coordinates four parallel sub-agents.</p>

<div class="ix-diagram" data-component="agent-trace"
     data-variant="annotated"
     data-diagram-id="m09-fanout-trace"
     data-default-mode="manual"
     data-speed="0.5">
  <span class="ix-title">Fan-Out / Fan-In: Parallel Code Review</span>
  <div class="ix-trace-row" data-type="prompt" data-delay="0">
    <span class="ix-trace-content">> Review src/api/ comprehensively: security, performance, docs, tests.</span>
    <span class="ix-trace-note">Input to orchestrator -- single task, four dimensions</span>
  </div>
  <div class="ix-trace-row" data-type="think" data-delay="4000">
    <span class="ix-trace-content">Decomposing into 4 independent sub-tasks. No shared mutable state. Aggregation: merge by severity.</span>
    <span class="ix-trace-note">Three conditions checked: independent, no shared state, clear aggregation</span>
  </div>
  <div class="ix-trace-row" data-type="tool" data-delay="1500">
    <span class="ix-trace-content">Agent(role="security", scope="src/api/", run_in_background=true)</span>
    <span class="ix-trace-note">Sub-agent 1 dispatched in background</span>
  </div>
  <div class="ix-trace-row" data-type="tool" data-delay="1500">
    <span class="ix-trace-content">Agent(role="performance", scope="src/api/", run_in_background=true)</span>
    <span class="ix-trace-note">Sub-agent 2 dispatched in parallel</span>
  </div>
  <div class="ix-trace-row" data-type="tool" data-delay="1500">
    <span class="ix-trace-content">Agent(role="docs", scope="src/api/", run_in_background=true)</span>
    <span class="ix-trace-note">Sub-agent 3 dispatched in parallel</span>
  </div>
  <div class="ix-trace-row" data-type="tool" data-delay="1500">
    <span class="ix-trace-content">Agent(role="tests", scope="src/api/", run_in_background=true)</span>
    <span class="ix-trace-note">Sub-agent 4 dispatched in parallel</span>
  </div>
  <div class="ix-trace-row" data-type="result" data-delay="1500">
    <span class="ix-trace-content">-> Security: 2 findings. Performance: 1 finding. Docs: 3 gaps. Tests: 94% coverage.</span>
    <span class="ix-trace-note">All 4 return via task-notification to parent</span>
  </div>
  <div class="ix-trace-row" data-type="think" data-delay="4000">
    <span class="ix-trace-content">Aggregation: merging 6 findings. Deduplicating: 1 overlap between security and performance. Sorting by severity.</span>
    <span class="ix-trace-note">The hardest part -- conflict resolution and deduplication</span>
  </div>
  <div class="ix-trace-row" data-type="response" data-delay="2500">
    <span class="ix-trace-content">Unified report: 5 unique findings (1 Critical, 2 High, 2 Medium). 3 documentation gaps. 94% test coverage.</span>
    <span class="ix-trace-note">Single coherent output from 4 parallel agents</span>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="warning">
  <p><strong>Design aggregation before agents</strong>: Engineers who design the fan-out carefully and then hand-wave the fan-in almost always discover that aggregation is where the system breaks in production.</p>
</div>

<p class="ix-instruct">Switch between tabs to compare where the same orchestration pattern lives once you move from interactive use to production systems.</p>

<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="m09-runtime-surfaces">
  <span class="ix-title">Three Runtime Surfaces for the Same Pattern</span>
  <div data-tab="Claude Code Session">
    <p><strong>Interactive orchestration inside Claude Code.</strong> The operator is present, the working directory is live, and the orchestration happens through tools like <code>Agent</code>, <code>Task</code>, MCP connections, skills, and <code>CLAUDE.md</code>.</p>
    <p><strong>Best for</strong>: live engineering work, debugging, prompt design, and proving the decomposition before building automation around it.</p>
  </div>
  <div data-tab="Agent SDK / API">
    <p><strong>Programmatic orchestration inside your application.</strong> The same pattern now lives in code: your service owns the queue, retries, fan-out width, output validation, and budget enforcement. Claude becomes one component in a larger runtime rather than the entire runtime.</p>
    <p><strong>Best for</strong>: webhook-triggered pipelines, cron jobs, ticket triage, and any workflow that must run without an operator at the keyboard.</p>
  </div>
  <div data-tab="Hybrid Rollout">
    <p><strong>Prototype interactively, operationalize programmatically.</strong> Use Claude Code to discover the right decomposition, specialist prompts, and aggregation contracts. When the pattern is stable, move the orchestration into the Agent SDK or Messages API and keep Claude Code for debugging and incident response.</p>
    <p><strong>Design rule</strong>: if you cannot explain the pattern clearly in Claude Code first, you are not ready to automate it behind a webhook or queue.</p>
  </div>
</div>

---

## 9.3 Task Decomposition

<div class="ix-diagram" data-component="objective">
  <p>Apply three decomposability conditions (independence, no shared mutable state, clear I/O boundaries) to evaluate whether a task can be split across agents.</p>
</div>

The decision framework in 9.1 established whether multi-agent is warranted. Now you need to determine whether the specific task can actually be decomposed. Three conditions must all hold simultaneously.

<p class="ix-instruct">Click each card to explore the three conditions that must hold for a task to be decomposable.</p>

<div class="ix-diagram" data-component="click-cards" data-diagram-id="m09-decomposition-conditions">
  <span class="ix-title">Three Conditions for Decomposability</span>
  <div class="ix-card" data-phase="success">
    <i data-lucide="unlink" class="ix-card-icon"></i>
    <span class="ix-card-label">Independent Subtasks</span>
  </div>
  <div class="ix-card" data-phase="success">
    <i data-lucide="lock" class="ix-card-icon"></i>
    <span class="ix-card-label">No Shared Mutable State</span>
  </div>
  <div class="ix-card" data-phase="success">
    <i data-lucide="frame" class="ix-card-icon"></i>
    <span class="ix-card-label">Clear I/O Boundaries</span>
  </div>
  <!-- Detail panels -->
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="success">Independent Subtasks</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">The Condition</div>
        <div class="ix-sec-text">Each subtask can execute without knowing the outcome of the others. If Subtask B needs the output of Subtask A to execute, that is a dependency chain, not a fan-out opportunity.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Example</div>
        <div class="ix-sec-text">Security review and performance review of the same codebase are independent -- neither needs the other's findings to proceed. But "refactor the interface" and "update all callers of the interface" are sequential -- callers cannot be updated until the new interface exists.</div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="success">No Shared Mutable State</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">The Condition</div>
        <div class="ix-sec-text">Subtasks must not write to the same files, database tables, or data structures. Two sub-agents both trying to modify <code>src/config.ts</code> creates a concurrency conflict with no built-in resolution mechanism.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Read-Only Is Safe</div>
        <div class="ix-sec-text">Multiple agents reading the same files is safe -- that is shared immutable state. The problem arises only when agents write to overlapping scopes.</div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="success">Clear I/O Boundaries</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">The Condition</div>
        <div class="ix-sec-text">You can fully specify what goes in to each subtask and what must come out.</div>
      </div>
      <div class="ix-char-grid">
        <div class="ix-char-item" data-phase="error"><strong>Unbounded</strong><span>"Review the codebase." -- scope is undefined, output format unspecified, completion criteria absent.</span></div>
        <div class="ix-char-item" data-phase="success"><strong>Well-bounded</strong><span>"Review <code>src/api/</code> for input validation. Report unvalidated parameters with file path and line number." -- scope, dimension, and output structure all defined.</span></div>
      </div>
    </div>
  </div>
</div>

<p class="ix-instruct">Click each card to see why certain tasks resist decomposition regardless of architecture.</p>

<div class="ix-diagram" data-component="click-cards" data-diagram-id="m09-not-decomposable">
  <span class="ix-title">When Tasks Resist Decomposition</span>
  <div class="ix-card" data-phase="error">
    <i data-lucide="link" class="ix-card-icon"></i>
    <span class="ix-card-label">Sequential Dependencies</span>
  </div>
  <div class="ix-card" data-phase="error">
    <i data-lucide="database" class="ix-card-icon"></i>
    <span class="ix-card-label">Shared State</span>
  </div>
  <div class="ix-card" data-phase="error">
    <i data-lucide="brain" class="ix-card-icon"></i>
    <span class="ix-card-label">Holistic Reasoning</span>
  </div>
  <!-- Detail panels -->
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="error">Sequential Dependencies</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">The Problem</div>
        <div class="ix-sec-text">"Refactor the authentication module, then update all callers to use the new interface." The caller-update step cannot run until the refactor defines the new interface. Attempting to parallelize this produces agents working against each other.</div>
      </div>
      <p class="ix-note"><strong>Test:</strong> Can you write the full input specification for Subtask B without knowing what Subtask A will produce? If no, this is sequential.</p>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="error">Shared State</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">The Problem</div>
        <div class="ix-sec-text">The task requires consistent reasoning about a changing system -- a live database being written to, a codebase where other developers are committing during analysis. Distributing that reasoning across multiple agents does not help. Each agent sees a potentially different snapshot.</div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="error">Holistic Reasoning</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">The Problem</div>
        <div class="ix-sec-text">Architecture review weighing security, performance, maintainability, and team capability simultaneously. The right answer for one team with one set of constraints is wrong for a different team. Decomposing into "security agent + performance agent + maintainability agent" produces results that are locally optimal on each dimension but globally suboptimal because dimension interactions were never considered.</div>
      </div>
      <p class="ix-note"><strong>Key insight:</strong> When the interactions between dimensions matter more than the dimensions themselves, decomposition loses the cross-cutting judgment that makes the analysis valuable.</p>
    </div>
  </div>
</div>

<p class="ix-instruct">Choose your response for each scenario to test whether you can identify decomposable tasks.</p>

<div class="ix-diagram" data-component="scenario-quiz" data-diagram-id="m09-decomposition-scenarios" data-xp="12">
  <span class="ix-title">Is This Task Decomposable?</span>
  <div class="ix-scenario">
    <div class="ix-scenario-terminal">
      <div class="ix-terminal-row" data-type="prompt">> Review security, performance, and accessibility of src/api/ in parallel.</div>
      <div class="ix-terminal-row" data-type="think">Three independent read-only analyses on the same files. No agent modifies any file.</div>
      <div class="ix-terminal-row" data-type="tool">Agent(role="security", scope="src/api/", mode="read-only")</div>
      <div class="ix-terminal-row" data-type="tool">Agent(role="performance", scope="src/api/", mode="read-only")</div>
      <div class="ix-terminal-row" data-type="tool">Agent(role="accessibility", scope="src/api/", mode="read-only")</div>
    </div>
    <div class="ix-scenario-question">
      <p class="ix-quiz-prompt"><strong>Scenario 1.</strong> Is this task decomposable across agents?</p>
      <div class="ix-quiz-options">
        <button class="ix-quiz-option" data-correct="true">Yes -- read-only, independent dimensions, aggregation is merging findings</button>
        <button class="ix-quiz-option">No -- the agents share the same files</button>
        <button class="ix-quiz-option">Only if the codebase is larger than one context window</button>
      </div>
      <p class="ix-quiz-explanation">All three conditions hold: subtasks are independent (each analyzes a different dimension), no shared mutable state (all are read-only), and I/O boundaries are clear (each reports findings in its domain). Sharing the same read-only files is safe -- it is shared immutable state, not shared mutable state.</p>
    </div>
  </div>
  <div class="ix-scenario">
    <div class="ix-scenario-terminal">
      <div class="ix-terminal-row" data-type="prompt">> Refactor the database module, then update all service files that import from it.</div>
      <div class="ix-terminal-row" data-type="think">The service updates depend on the new interface from the refactor...</div>
      <div class="ix-terminal-row" data-type="error">Cannot specify service update inputs without knowing refactor output.</div>
    </div>
    <div class="ix-scenario-question">
      <p class="ix-quiz-prompt"><strong>Scenario 2.</strong> Is this task decomposable across agents?</p>
      <div class="ix-quiz-options">
        <button class="ix-quiz-option">Yes -- refactor and update are separate tasks</button>
        <button class="ix-quiz-option" data-correct="true">No -- sequential dependency, services cannot start until refactor defines new interface</button>
        <button class="ix-quiz-option">Yes -- if you give each agent a copy of the codebase</button>
      </div>
      <p class="ix-quiz-explanation">This fails the independence condition. The service update subtask cannot be specified until the refactor subtask completes and defines the new interface. This is a pipeline (sequential), not a fan-out (parallel). Giving each agent a copy does not help -- the service agent still does not know what the new interface looks like.</p>
    </div>
  </div>
  <div class="ix-scenario">
    <div class="ix-scenario-terminal">
      <div class="ix-terminal-row" data-type="prompt">> Generate documentation for 4 independent microservices simultaneously.</div>
      <div class="ix-terminal-row" data-type="tool">Agent(scope="services/auth/", task="generate docs")</div>
      <div class="ix-terminal-row" data-type="tool">Agent(scope="services/billing/", task="generate docs")</div>
      <div class="ix-terminal-row" data-type="tool">Agent(scope="services/notifications/", task="generate docs")</div>
      <div class="ix-terminal-row" data-type="tool">Agent(scope="services/analytics/", task="generate docs")</div>
    </div>
    <div class="ix-scenario-question">
      <p class="ix-quiz-prompt"><strong>Scenario 3.</strong> Is this task decomposable across agents?</p>
      <div class="ix-quiz-options">
        <button class="ix-quiz-option" data-correct="true">Yes -- no shared state, independent services, aggregation is concatenation</button>
        <button class="ix-quiz-option">No -- documentation style must be consistent across services</button>
        <button class="ix-quiz-option">Only if the services have no shared libraries</button>
      </div>
      <p class="ix-quiz-explanation">All three conditions hold. Each agent works on its own service directory with no file overlap. Independence is clear since no agent needs another's output. Aggregation is simple concatenation. Style consistency is handled through the shared system prompt, not through inter-agent coordination.</p>
    </div>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="tip">
  <p><strong>The decomposition worksheet</strong>: Before building multi-agent, fill out the worksheet: task name, subtasks with inputs/outputs, independence matrix, shared state check, aggregation strategy, and net benefit estimate. If net benefit is small or negative, keep it single-agent.</p>
</div>

<details class="ix-collapse">
<summary>Deep Dive: The full decomposition worksheet template</summary>
<div class="ix-collapse-body">
<p>Complete this worksheet before building any multi-agent system. It forces clarity about each decision the system will need to make.</p>
<pre class="ix-code-block">TASK DECOMPOSITION WORKSHEET
=============================
Task name: [one-line description]
Trigger: [what event or input causes the system to run?]
Scope boundaries: [what files, services, or data is this system allowed to touch?]

Proposed subtasks:
  1. [name]: [one-sentence description]
     - Inputs: [what data does this subtask need to start?]
     - Outputs: [what data does this subtask produce?]
     - Independence check: [can this run before knowing outputs of others?]
  2. [repeat for each subtask]

Independence matrix:
  [for each pair, mark: parallel | sequential-A-before-B | sequential-B-before-A]

Shared state check:
  [list any files or data that more than one subtask touches]

Aggregation strategy:
  - How are outputs combined? [description]
  - What happens when one subtask fails? [policy]
  - What happens when two subtasks contradict? [policy]

Estimated single-agent time: [X minutes]
Estimated multi-agent time: [Y minutes with Z sub-agents]
Coordination overhead estimate: [W minutes]
Net benefit: [(X - Y - W) minutes]</pre>
<p>If the net benefit is small or negative, the case for multi-agent is weak regardless of how elegant the architecture looks.</p>
</div>
</details>

---

## 9.4 Inter-Agent Communication

<div class="ix-diagram" data-component="objective">
  <p>Design structured JSON communication schemas with the five mandatory fields (status, checked_scope, findings, error, metadata) and explain why prose communication fails.</p>
</div>

In Module 05 you learned that output contracts make agent output reliable for downstream consumers. Inter-agent communication schemas are output contracts between agents -- they deserve the same precision.

<p class="ix-instruct">Write your prediction, then reveal the reference reasoning.</p>

<div class="ix-diagram" data-component="predict-reveal" data-diagram-id="m09-communication-predict" data-xp="8">
  <span class="ix-title">Predict Before You Learn</span>
  <p class="ix-predict-prompt">Two sub-agents have completed their security and performance reviews. One returns a detailed paragraph describing its findings. The other returns structured JSON with severity levels and file paths. The orchestrator needs to merge their results into a unified report. Which output will be easier to aggregate, and what specific problems will the prose output cause?</p>
  <textarea class="ix-predict-input" aria-label="Your prediction" placeholder="Write your reasoning -- which format will the orchestrator prefer and why?"></textarea>
  <details class="ix-predict-reveal">
    <summary>Reveal reference reasoning</summary>
    <p>Structured JSON eliminates parsing ambiguity entirely. The orchestrator can programmatically extract findings, count by severity, and merge without interpretation. Prose requires natural language comprehension at every aggregation step, introduces instability (different runs may extract different information from the same text), and makes deduplication across agents nearly impossible. When Agent A says "some potential issues with token validation" and Agent B reports <code>{"file":"src/auth/token.ts","line":47,"severity":"high"}</code>, the orchestrator cannot reliably determine whether these refer to the same issue or different ones.</p>
  </details>
</div>

<p class="ix-instruct">Switch between tabs to examine the five mandatory fields for inter-agent schemas.</p>

<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="m09-schema-fields">
  <span class="ix-title">Five Mandatory Schema Fields</span>
  <div data-tab="status">
    <p><strong>The first field the orchestrator checks.</strong> One of <code>"success"</code>, <code>"error"</code>, or <code>"partial"</code>.</p>
    <div class="ix-char-grid">
      <div class="ix-char-item" data-phase="success"><strong>success</strong><span>Agent completed its full assigned scope and produced findings.</span></div>
      <div class="ix-char-item" data-phase="error"><strong>error</strong><span>Agent could not complete any meaningful work. The <code>error</code> field contains the reason.</span></div>
      <div class="ix-char-item" data-phase="perceive"><strong>partial</strong><span>Agent completed some but not all of its assigned scope. Never fold partial into success -- the orchestrator needs to know coverage is incomplete.</span></div>
    </div>
  </div>
  <div data-tab="checked_scope">
    <p><strong>What the agent actually examined -- distinct from what it was assigned.</strong> An array of resource identifiers (file paths, table names, API endpoints).</p>
    <div class="ix-char-grid">
      <div class="ix-char-item" data-phase="error"><strong>Without checked_scope</strong><span>Agent assigned 3 files, examines 2, reports success. Silent scope reduction looks like full completion. The orchestrator believes all 3 files were reviewed.</span></div>
      <div class="ix-char-item" data-phase="success"><strong>With checked_scope</strong><span>Agent reports exactly which files it examined. The orchestrator calculates coverage and flags the uncovered file for follow-up or manual review.</span></div>
    </div>
  </div>
  <div data-tab="findings">
    <p><strong>Array of finding objects with consistent internal structure.</strong> The empty array <code>[]</code> is a valid value meaning "no findings."</p>
    <div class="ix-char-grid">
      <div class="ix-char-item" data-phase="error"><strong>Field absent</strong><span>Ambiguous -- does the agent mean "no findings" or "I failed to populate this field"? The orchestrator cannot tell.</span></div>
      <div class="ix-char-item" data-phase="success"><strong>Empty array</strong><span>Unambiguous -- the agent examined its scope and found nothing to report. This is meaningful data, not missing data.</span></div>
    </div>
  </div>
  <div data-tab="error">
    <p><strong>A specific description of what went wrong, or <code>null</code> if status is success.</strong></p>
    <div class="ix-char-grid">
      <div class="ix-char-item" data-phase="error"><strong>Useless error</strong><span><code>"An error occurred"</code> -- tells the orchestrator nothing about root cause or recovery strategy.</span></div>
      <div class="ix-char-item" data-phase="success"><strong>Useful error</strong><span><code>"Token limit exceeded at src/services/large-service.ts after 2,300 lines"</code> -- identifies the file, the cause, and suggests a scope reduction for retry.</span></div>
    </div>
  </div>
  <div data-tab="metadata">
    <p><strong>Freeform object for supplemental information.</strong> Agent version, model used, time elapsed, cost estimate, confidence score. Supports debugging and monitoring even when it does not affect aggregation logic.</p>
    <pre class="ix-code-block">"metadata": {
  "agent_id": "security-reviewer-v2",
  "scope_assigned": ["src/api/users.ts", "src/api/auth.ts", "src/api/payments.ts"],
  "completion_percentage": 67,
  "elapsed_ms": 14200,
  "model": "claude-sonnet-4-20250514"
}</pre>
  </div>
</div>

<p class="ix-instruct">Compare the two communication approaches side by side to see why structured JSON is mandatory.</p>

<div class="ix-diagram" data-component="compare" data-diagram-id="m09-prose-vs-json">
  <span class="ix-title">Prose vs Structured JSON Communication</span>
  <div data-side="left" data-label="Prose Output">
    <pre class="ix-code-block">"The security review found some potential
issues with the authentication module,
primarily around token validation,
though the exact scope wasn't entirely
clear. There may also be concerns about
the session handling in the middleware
layer, but further investigation would
be needed to confirm."</pre>
    <div class="ix-char-grid">
      <div class="ix-char-item" data-phase="error"><strong>Ambiguous severity</strong><span>"potential issues" and "concerns" give no actionable severity level.</span></div>
      <div class="ix-char-item" data-phase="error"><strong>Unstable extraction</strong><span>Different parsing runs may extract different information from the same paragraph.</span></div>
      <div class="ix-char-item" data-phase="error"><strong>Deduplication impossible</strong><span>No way to programmatically determine if this refers to the same issue as another agent's findings.</span></div>
    </div>
  </div>
  <div data-side="right" data-label="JSON Output">
    <pre class="ix-code-block">{
  "status": "success",
  "checked_scope": ["src/auth/token.ts"],
  "findings": [{
    "severity": "high",
    "file": "src/auth/token.ts",
    "line": 47,
    "description": "Token expiry not validated"
  }],
  "error": null,
  "metadata": {"agent_id": "security-v2"}
}</pre>
    <div class="ix-char-grid">
      <div class="ix-char-item" data-phase="success"><strong>Programmatic extraction</strong><span>Severity, file, line -- every field is machine-readable.</span></div>
      <div class="ix-char-item" data-phase="success"><strong>Deterministic</strong><span>Same JSON always produces same parsed result.</span></div>
      <div class="ix-char-item" data-phase="success"><strong>Mergeable</strong><span>Deduplication by file + line across agents is trivial.</span></div>
    </div>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="key-concept">
  <p><strong>Provenance: report what was examined</strong>: <code>checked_scope</code> turns agent output from "findings" into "findings plus coverage." Zero findings in a file only means absence of issues if the agent actually examined that file. Without provenance, a silent scope reduction looks like a clean bill of health.</p>
</div>

<details class="ix-collapse">
<summary>Deep Dive: Schema versioning for inter-agent contracts</summary>
<div class="ix-collapse-body">
<p>Inter-agent communication schemas are APIs. A breaking change -- removing a field, renaming a field, changing a type or the valid values of a status field -- breaks any orchestrator that consumes the old schema.</p>
<p>In production multi-agent systems, this can cause silent failures: the orchestrator receives valid JSON that it can parse, but interprets incorrectly because the semantics have changed. A <code>status</code> field that once allowed <code>"warning"</code> now only allows <code>"partial"</code> -- the orchestrator sees an unrecognized value and falls through to default handling.</p>
<p>Include a <code>schema_version</code> field in every inter-agent communication document. Increment the major version for breaking changes. The orchestrator should validate <code>schema_version</code> before attempting to process any sub-agent output and fail clearly -- not silently -- when it receives an unexpected version.</p>
</div>
</details>

---

## 9.5 Failure Modes and Recovery

<div class="ix-diagram" data-component="objective">
  <p>Identify and recover from the three primary multi-agent failure modes: timeout, malformed output, and contradictory findings.</p>
</div>

Every multi-agent system fails eventually. The difference between a robust system and a fragile one is not whether failures occur, but whether the system surfaces them honestly or hides them.

<p class="ix-instruct">Click each card to explore the three primary failure modes and their recovery strategies.</p>

<div class="ix-diagram" data-component="click-cards" data-diagram-id="m09-failure-modes">
  <span class="ix-title">Three Primary Failure Modes</span>
  <div class="ix-card" data-phase="perceive">
    <i data-lucide="clock" class="ix-card-icon"></i>
    <span class="ix-card-label">Agent Timeout</span>
  </div>
  <div class="ix-card" data-phase="error">
    <i data-lucide="file-x" class="ix-card-icon"></i>
    <span class="ix-card-label">Malformed Output</span>
  </div>
  <div class="ix-card" data-phase="reason">
    <i data-lucide="git-pull-request" class="ix-card-icon"></i>
    <span class="ix-card-label">Contradictory Findings</span>
  </div>
  <!-- Detail panels -->
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="perceive">Agent Timeout</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">What Happens</div>
        <div class="ix-sec-text">Agent does not return within an acceptable time window. Occurs when scope is too large, input is unexpectedly complex, or the agent enters an unproductive reasoning loop.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Recovery Policy</div>
        <div class="ix-sec-text">Retry once with an explicit scope reduction and time constraint in the prompt: "Focus on the highest-priority items first and mark findings as partial if you cannot complete the full scope." On second timeout, mark as <code>"status": "error"</code> and propagate the uncovered scope into the final output.</div>
      </div>
      <p class="ix-note"><strong>Never silently omit timed-out scope from the final report.</strong> Surfaced gaps are better than hidden gaps.</p>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="error">Malformed Output</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">What Happens</div>
        <div class="ix-sec-text">Sub-agent returns output that does not conform to the expected schema -- prose instead of JSON, truncated JSON due to context limits, or missing required fields.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Recovery Policy</div>
        <div class="ix-sec-text">Retry once with the schema example directly in the prompt and the instruction "Do not include any text before or after the JSON object." On second failure, treat as complete failure of that sub-agent. Do NOT attempt regex parsing of partial JSON -- unreliable results are worse than acknowledged failure.</div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="reason">Contradictory Findings</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">What Happens</div>
        <div class="ix-sec-text">Two agents examining overlapping scopes reach contradictory conclusions. Agent A says authentication is secure. Agent B says it has a vulnerability. Both were produced by the same model with the same capabilities.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Recovery Policy</div>
        <div class="ix-sec-text">NEVER silently resolve contradictions by picking one finding. There is no reliable automated way to determine which is correct. Escalate to human with both findings surfaced explicitly. This is not a system failure -- it is the system working correctly.</div>
      </div>
    </div>
  </div>
</div>

<p class="ix-instruct">Step through the compare trace to see how two agents reach contradictory conclusions and how the orchestrator escalates correctly. This is the most important trace in the module.</p>

<div class="ix-diagram" data-component="agent-trace"
     data-variant="compare"
     data-diagram-id="m09-contradiction-trace"
     data-default-mode="manual"
     data-speed="0.5">
  <span class="ix-title">Contradictory Findings: Escalation in Action</span>
  <div class="ix-trace-row" data-type="think" data-delay="0" data-col="left" data-col-label="Agent A (Security Reviewer)">
    <span class="ix-trace-content">Reviewing src/auth/token.ts... Token validation logic checks existence of expiry field. Looks complete.</span>
  </div>
  <div class="ix-trace-row" data-type="think" data-delay="0" data-col="right" data-col-label="Agent B (Broad Scope Reviewer)">
    <span class="ix-trace-content">Reviewing src/auth/token.ts... Line 47: expiry field checked for existence but not for value > current timestamp.</span>
  </div>
  <div class="ix-trace-row" data-type="result" data-delay="1500" data-col="left">
    <span class="ix-trace-content">-> {"status":"success","findings":[],"checked_scope":["src/auth/token.ts"]}</span>
  </div>
  <div class="ix-trace-row" data-type="result" data-delay="1500" data-col="right">
    <span class="ix-trace-content">-> {"status":"success","findings":[{"severity":"high","line":47,"description":"Token expiry not validated"}]}</span>
  </div>
  <div class="ix-trace-row" data-type="response" data-delay="2500" data-col="left">
    <span class="ix-trace-content">Assessment: Secure. Token validation is complete and correct.</span>
  </div>
  <div class="ix-trace-row" data-type="response" data-delay="2500" data-col="right">
    <span class="ix-trace-content">Assessment: Vulnerable. Token expiry not validated against current timestamp.</span>
  </div>
  <div class="ix-trace-row" data-type="error" data-delay="2500">
    <span class="ix-trace-content">Contradiction detected on src/auth/token.ts line 47. Escalating to human review. Neither finding discarded.</span>
  </div>
</div>

<p class="ix-instruct">Click each situation to determine whether to intervene or hold steady on scope creep.</p>

<div class="ix-diagram" data-component="intervention" data-diagram-id="m09-scope-creep">
  <span class="ix-title">Scope Creep: When Agents Exceed Boundaries</span>
  <div class="ix-intervention-item" data-badge="intervene">
    <div class="ix-intervention-label">Action-taking agent modifies files outside scope</div>
    <div class="ix-intervention-body">Validate changed files against assigned scope BEFORE accepting output. Any discrepancy must be flagged and reviewed before the sub-agent's changes are merged into the working state. This validation step is non-optional.</div>
  </div>
  <div class="ix-intervention-item" data-badge="intervene">
    <div class="ix-intervention-label">Analysis agent reports findings outside scope</div>
    <div class="ix-intervention-body">Filter findings to include only those within the sub-agent's assigned scope. Discard out-of-scope findings from the primary report and log them separately for review. Out-of-scope findings may duplicate or conflict with another agent's work.</div>
  </div>
  <div class="ix-intervention-item" data-badge="hold">
    <div class="ix-intervention-label">Agent stays within assigned scope</div>
    <div class="ix-intervention-body">Accept output normally. This is the expected behavior -- the agent respected its boundaries and the orchestrator can proceed with standard aggregation.</div>
  </div>
</div>

<p class="ix-instruct">Test your understanding of multi-agent systems. All reference material for these questions is visible above.</p>

<div class="ix-diagram" data-component="quiz" data-diagram-id="m09-failure-check" data-xp="15">
  <span class="ix-title">Knowledge Check: Multi-Agent Systems</span>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q1.</strong> What is the FIRST question in the multi-agent decision framework?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">Are the subtasks independent?</button>
      <button class="ix-quiz-option" data-correct="true">Can a single agent do this?</button>
      <button class="ix-quiz-option">Is the aggregation strategy clear?</button>
      <button class="ix-quiz-option">Does the benefit outweigh coordination cost?</button>
    </div>
    <p class="ix-quiz-explanation">The framework starts with the assumption that single-agent is sufficient. Q1 -- "Can a single agent do this?" -- establishes the default. You need a specific, named reason to proceed past this question.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q2.</strong> A sub-agent's <code>checked_scope</code> shows it examined 2 of 3 assigned files but its status is <code>"success"</code>. What is wrong?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">Nothing -- it found no issues in the files it checked</button>
      <button class="ix-quiz-option">The checked_scope field should be removed</button>
      <button class="ix-quiz-option" data-correct="true">Status should be "partial" because it did not complete its full assigned scope</button>
      <button class="ix-quiz-option">The orchestrator should retry the agent automatically</button>
    </div>
    <p class="ix-quiz-explanation">When an agent completes only part of its assigned scope, the status must be <code>"partial"</code>, not <code>"success"</code>. Folding partial completion into success creates silent scope reduction -- the orchestrator believes all 3 files were reviewed when only 2 were.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q3.</strong> Two sub-agents produce contradictory assessments of the same file. The orchestrator should:</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">Pick the finding with higher confidence</button>
      <button class="ix-quiz-option">Discard both findings and re-run the review</button>
      <button class="ix-quiz-option" data-correct="true">Escalate both findings to a human reviewer</button>
      <button class="ix-quiz-option">Average the severity ratings</button>
    </div>
    <p class="ix-quiz-explanation">Both findings were produced by the same model with the same capabilities. There is no reliable automated way to determine which is correct. Silent resolution produces false confidence. Escalation to a human with both findings surfaced is the system working correctly, not failing.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q4 (tricky).</strong> A team builds a multi-agent system for a task that takes 30 seconds with a single well-prompted agent. The multi-agent version uses 3 agents in parallel. Wall-clock time drops to 25 seconds, but coordination overhead adds 20 seconds. Is this a good use of multi-agent?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">Yes -- 25 seconds is faster than 30 seconds</button>
      <button class="ix-quiz-option" data-correct="true">No -- 5-second savings does not justify the engineering and debugging complexity of a 3-agent system</button>
      <button class="ix-quiz-option">Yes -- parallel execution is always better</button>
      <button class="ix-quiz-option">No -- multi-agent requires at least 5 agents</button>
    </div>
    <p class="ix-quiz-explanation">The decision framework asks: does the benefit outweigh the coordination cost? For a one-time task, 5 seconds of savings rarely justifies the engineering time to build, test, debug, and maintain a 3-agent system. The total engineering cost (design + implementation + testing + debugging) far exceeds the wall-clock savings. For a continuously running pipeline processing thousands of tasks, the calculation changes -- context matters.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q5.</strong> In the fan-out/fan-in pattern, which of the orchestrator's three responsibilities is the HARDEST to get right?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">Decomposing the task into subtasks</button>
      <button class="ix-quiz-option">Dispatching sub-agents in parallel</button>
      <button class="ix-quiz-option" data-correct="true">The aggregation step -- collecting, validating, deduplicating, and synthesizing results</button>
      <button class="ix-quiz-option">Designing the sub-agent prompts</button>
    </div>
    <p class="ix-quiz-explanation">Engineers who design the fan-out carefully and then hand-wave the fan-in almost always discover that aggregation is where the system breaks in production. Aggregation involves schema validation, conflict resolution, deduplication, and synthesis -- each of which can fail independently. Dispatching is mechanical; aggregation requires judgment.</p>
  </div>
</div>

---

## Lab Connection

**Lab 07: Multi-Agent Code Review System** -- In this lab, you build a three-agent code review pipeline: a security sub-agent, a performance sub-agent, and an orchestrator that dispatches both in parallel and synthesizes results into a single report. You implement the inter-agent communication schema from Section 9.4, test the timeout recovery policy from Section 9.5, and deliberately inject a contradictory finding to verify that your orchestrator escalates correctly rather than silently resolving it.

---

## Further Reading

- [Claude Code Sub-agents](https://docs.anthropic.com/en/docs/claude-code/sub-agents)
- [Claude Code Overview](https://docs.anthropic.com/en/docs/claude-code/overview)
- [Claude Code Agent SDK Overview](https://docs.anthropic.com/en/docs/claude-code/sdk)
- [Anthropic API Overview](https://docs.anthropic.com/en/api/overview)
- [Anthropic: Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)
- [Standalone Diagram: Orchestrator Runtime Patterns](/examples/module-diagrams/m09-orchestrator-patterns.html)

---

[Previous Module: Module 08](/module/08) | [Next Module: Module 10](/module/10)
