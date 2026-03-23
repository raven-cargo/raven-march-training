<div class="ix-diagram" data-component="module-hero">
<div class="ix-hero">
<div class="ix-hero-bg" data-phase="success"></div>
<div class="ix-hero-module-num">Module 12</div>
<div class="ix-hero-title">Capstone and Production Deployment</div>
<div class="ix-hero-subtitle">Integrate everything you've learned to design, build, validate, and maintain a production-grade agentic system</div>
<div class="ix-hero-chips">
<span class="ix-hero-chip">Pipeline Architecture</span>
<span class="ix-hero-chip">Capstone Project</span>
<span class="ix-hero-chip">Deployment Checklist</span>
<span class="ix-hero-chip">Observability</span>
<span class="ix-hero-chip">Long-term Maintenance</span>
</div>
</div>
</div>

# Module 12: Capstone and Production Deployment
## Agentic AI Engineering -- 3-Day Intensive Course

---

## Overview

<div class="ix-diagram" data-component="objective">
  <p>Design and specify a complete agentic pipeline for an organizational problem, applying all course concepts in a single integrated design.</p>
</div>

You have built a complete mental model across eleven modules. The Agentic Loop (PRAO) from Module 01. Claude Code foundations from Module 02. Trace reading from Module 03. TCEF prompting from Module 04. MCP architecture and primitives from Module 05. Building MCP servers with schema discipline from Module 06. The skills system from Module 07. Meta-prompting from Module 08. Multi-agent patterns from Module 09. Security and approval gates from Module 10. Stack adaptation from Module 11. This module is where those pieces integrate into a single, production-ready pipeline design -- not another lesson, but an arrival.

<p class="ix-instruct">Click each component to see its role in a production pipeline and the prior module that built its foundation.</p>

<div class="ix-diagram" data-component="click-cards" data-diagram-id="m12-pipeline-overview">
<span class="ix-title">The Five Pipeline Components</span>
<div class="ix-card" data-phase="perceive">
<i data-lucide="zap" class="ix-card-icon"></i>
<span class="ix-card-label">Trigger</span>
</div>
<div class="ix-card" data-phase="perceive">
<i data-lucide="search" class="ix-card-icon"></i>
<span class="ix-card-label">Context Gathering</span>
</div>
<div class="ix-card" data-phase="reason">
<i data-lucide="brain" class="ix-card-icon"></i>
<span class="ix-card-label">Decision Logic</span>
</div>
<div class="ix-card" data-phase="act">
<i data-lucide="shield" class="ix-card-icon"></i>
<span class="ix-card-label">Action Scope</span>
</div>
<div class="ix-card" data-phase="observe">
<i data-lucide="send" class="ix-card-icon"></i>
<span class="ix-card-label">Output Delivery</span>
</div>
<div class="ix-detail-panel">
<div class="ix-detail-header" data-phase="perceive">Trigger</div>
<div class="ix-detail-body">
<div class="ix-section">
<div class="ix-sec-label">What It Is</div>
<div class="ix-sec-text">What initiates the pipeline: human-initiated (<code>claude</code> or <code>claude -p "..."</code>), event-triggered (webhook from GitHub or Jira), schedule-triggered (cron job), or threshold-triggered (alert when a metric exceeds a bound).</div>
</div>
<div class="ix-section">
<div class="ix-sec-label">Production Example</div>
<div class="ix-sec-text">A GitHub webhook fires on PR open, carrying the workflow run ID and repository name to the pipeline endpoint.</div>
</div>
<p class="ix-note"><strong>Foundation</strong>: Module 01 -- the Agentic Loop (PRAO) begins with a Perceive phase, and the trigger is what delivers the initial input to perceive.</p>
</div>
</div>
<div class="ix-detail-panel">
<div class="ix-detail-header" data-phase="perceive">Context Gathering</div>
<div class="ix-detail-body">
<div class="ix-section">
<div class="ix-sec-label">What It Is</div>
<div class="ix-sec-text">What the agent reads before it can reason: files, git status, documentation, database records. This is the Perceive phase in action -- determining how much context window the agent consumes before reasoning begins.</div>
</div>
<div class="ix-section">
<div class="ix-sec-label">Production Example</div>
<div class="ix-sec-text">Read changed files via <code>Read()</code>, fetch team docs via a Context7 MCP server, check PR description.</div>
</div>
<p class="ix-note"><strong>Foundations</strong>: Module 02 (context discipline), Module 05 (MCP architecture), Module 06 (MCP server implementation), and Module 11 (Context7 grounding for stack-specific docs).</p>
</div>
</div>
<div class="ix-detail-panel">
<div class="ix-detail-header" data-phase="reason">Decision Logic</div>
<div class="ix-detail-body">
<div class="ix-section">
<div class="ix-sec-label">What It Is</div>
<div class="ix-sec-text">How the agent reasons about the task. The TCEF prompt structure defines the Task, the grounding Context, concrete Examples, and the required Format. Skills pre-load organization-specific knowledge so it does not need to be re-specified in every session.</div>
</div>
<div class="ix-section">
<div class="ix-sec-label">Production Example</div>
<div class="ix-sec-text">TCEF prompt with the review task + loaded skill files encoding team security conventions.</div>
</div>
<p class="ix-note"><strong>Foundations</strong>: Module 04 (TCEF framework) + Module 07 (skills and session context).</p>
</div>
</div>
<div class="ix-detail-panel">
<div class="ix-detail-header" data-phase="act">Action Scope</div>
<div class="ix-detail-body">
<div class="ix-section">
<div class="ix-sec-label">What It Is</div>
<div class="ix-sec-text">Both a design question (what actions are needed?) and a security question (what actions are allowed?). The action scope is bounded by <code>settings.json</code> permission configuration and, for high-consequence actions, by approval gates.</div>
</div>
<div class="ix-section">
<div class="ix-sec-label">Production Example</div>
<div class="ix-sec-text">Allow list: read files, post comment. Deny list: write to codebase, git push. Approval gate on any action that modifies shared state.</div>
</div>
<p class="ix-note"><strong>Foundations</strong>: Module 02 (<code>settings.json</code>) + Module 10 (approval gates, principle of least privilege).</p>
</div>
</div>
<div class="ix-detail-panel">
<div class="ix-detail-header" data-phase="observe">Output Delivery</div>
<div class="ix-detail-body">
<div class="ix-section">
<div class="ix-sec-label">What It Is</div>
<div class="ix-sec-text">How the agent's result reaches its audience. Output delivery is part of the pipeline design -- a structured JSON output consumed by a downstream system, a PR comment posted via GitHub MCP, a Slack message from an incident triage agent.</div>
</div>
<div class="ix-section">
<div class="ix-sec-label">Production Example</div>
<div class="ix-sec-text">Post a structured PR review comment via GitHub MCP tool, using the Format contract from Module 04 and the MCP schema discipline from Module 05 as the integration contract.</div>
</div>
<p class="ix-note"><strong>Foundations</strong>: Module 04 (Format as contract) + Module 05 (MCP schemas and structured results).</p>
</div>
</div>
</div>

---

## 12.1 Production Pipeline Architecture

<div class="ix-diagram" data-component="objective">
  <p>Map any agentic task to one of three pipeline archetypes and identify its integration points across all five pipeline components.</p>
</div>

Every agentic pipeline composes the five components above into a recognizable archetype. Knowing the archetype tells you the coordination complexity, the integration points, and the risks before you write a single line of configuration.

<p class="ix-instruct">Click each card to see the archetype pattern, when to use it, and a real-world example.</p>

<div class="ix-diagram" data-component="click-cards" data-diagram-id="m12-pipeline-archetypes-cards">
<span class="ix-title">Three Pipeline Archetypes</span>
<div class="ix-card" data-phase="act">
<i data-lucide="arrow-right" class="ix-card-icon"></i>
<span class="ix-card-label">Simple Chain</span>
</div>
<div class="ix-card" data-phase="reason">
<i data-lucide="git-branch" class="ix-card-icon"></i>
<span class="ix-card-label">Parallel Fan-Out</span>
</div>
<div class="ix-card" data-phase="observe">
<i data-lucide="shuffle" class="ix-card-icon"></i>
<span class="ix-card-label">Conditional Router</span>
</div>
<div class="ix-detail-panel">
<div class="ix-detail-header" data-phase="act">Simple Chain</div>
<div class="ix-detail-body">
<div class="ix-section">
<div class="ix-sec-label">Pattern</div>
<div class="ix-sec-text">Trigger → single agent → output. One sequential execution path. No orchestration layer, no sub-agents, no result aggregation.</div>
</div>
<div class="ix-section">
<div class="ix-sec-label">When to Use</div>
<div class="ix-sec-text">The task fits in one context window, subtasks are not genuinely independent, and the output goes to one destination. This is the starting point from Module 09: single-agent first.</div>
</div>
<div class="ix-section">
<div class="ix-sec-label">Real Example</div>
<div class="ix-sec-text">PR review pipeline: trigger (PR opened) → agent reads diff and CLAUDE.md → agent posts review comment. Three MCP primitives in play: Tools (Read, post comment), Resources (CLAUDE.md), Prompts (review task template).</div>
</div>
</div>
</div>
<div class="ix-detail-panel">
<div class="ix-detail-header" data-phase="reason">Parallel Fan-Out</div>
<div class="ix-detail-body">
<div class="ix-section">
<div class="ix-sec-label">Pattern</div>
<div class="ix-sec-text">Trigger → orchestrator → N sub-agents running simultaneously → orchestrator aggregates results → output. Requires independent subtasks and a clear aggregation strategy.</div>
</div>
<div class="ix-section">
<div class="ix-sec-label">When to Use</div>
<div class="ix-sec-text">Subtasks can be fully specified before any runs, they have no shared mutable state, and coordination cost is justified by the time benefit. See Module 09 for the four-question decision framework.</div>
</div>
<div class="ix-section">
<div class="ix-sec-label">Real Example</div>
<div class="ix-sec-text">Code review with four independent checks (security, performance, docs, tests) running in parallel. Each sub-agent has its own <code>settings.json</code> scope and skill files. Results aggregated by orchestrator into one structured comment.</div>
</div>
</div>
</div>
<div class="ix-detail-panel">
<div class="ix-detail-header" data-phase="observe">Conditional Router</div>
<div class="ix-detail-body">
<div class="ix-section">
<div class="ix-sec-label">Pattern</div>
<div class="ix-sec-text">Trigger → orchestrator evaluates input → routes to specialized agent based on condition → specialist returns result. Routing logic may itself use an LLM classification step.</div>
</div>
<div class="ix-section">
<div class="ix-sec-label">When to Use</div>
<div class="ix-sec-text">Input types require different system prompts, tools, or MCP configurations. A research sub-agent needs web-fetch tools and an exploratory prompt; a synthesis sub-agent needs a conservative, precise prompt. You cannot optimize for both in one agent.</div>
</div>
<div class="ix-section">
<div class="ix-sec-label">Real Example</div>
<div class="ix-sec-text">Incident triage router: PagerDuty alert → router classifies incident type → routes to database-specialist, network-specialist, or deployment-specialist. Each specialist has its own CLAUDE.md and scoped permissions.</div>
</div>
</div>
</div>
</div>

<p class="ix-instruct">Click each stage to reveal the archetype, trigger, and scope for that pipeline type.</p>

<div class="ix-diagram" data-component="timeline" data-diagram-id="m12-pipeline-archetypes">
<span class="ix-title">Five Production Pipeline Archetypes</span>
<div class="ix-timeline-stage" data-phase="perceive">
<div class="ix-stage-label">PR Review Pipeline</div>
<div class="ix-stage-body">
<p><strong>Trigger:</strong> PR opened or updated webhook</p>
<p><strong>Archetype:</strong> Simple chain (read + comment scope)</p>
<p><strong>Scope:</strong> Read changed files, post review comment — no write access to codebase</p>
<p><strong>Spiral:</strong> Action scope bounded by M02 <code>settings.json</code>, output structured per M05 contracts.</p>
</div>
</div>
<div class="ix-timeline-stage" data-phase="reason">
<div class="ix-stage-label">Documentation Sync</div>
<div class="ix-stage-body">
<p><strong>Trigger:</strong> Merge to main webhook</p>
<p><strong>Archetype:</strong> Simple chain with gated output (opens a documentation-update PR for human review)</p>
<p><strong>Scope:</strong> Read source files, compare to existing docs, write docs PR — approval gate before merge</p>
<p><strong>Spiral:</strong> Approval gate pattern from M10 -- "show me the plan" before irreversible write.</p>
</div>
</div>
<div class="ix-timeline-stage" data-phase="act">
<div class="ix-stage-label">Incident Triage</div>
<div class="ix-stage-body">
<p><strong>Trigger:</strong> PagerDuty alert or error rate spike</p>
<p><strong>Archetype:</strong> Conditional router (routes by incident type) or simple chain (for simpler setups)</p>
<p><strong>Scope:</strong> Read error logs + runbooks, post to incident Slack channel, create incident record</p>
<p><strong>Spiral:</strong> Multi-agent routing from M09 if incident types require specialized agents.</p>
</div>
</div>
<div class="ix-timeline-stage" data-phase="observe">
<div class="ix-stage-label">Onboarding Assistant</div>
<div class="ix-stage-body">
<p><strong>Trigger:</strong> On-demand or new developer join event</p>
<p><strong>Archetype:</strong> Simple chain (read-only scope)</p>
<p><strong>Scope:</strong> Read CLAUDE.md, architecture docs, git history — generate personalized onboarding guide</p>
<p><strong>Spiral:</strong> CLAUDE.md is read at session start (M02) -- the agent loads it as context, not a command.</p>
</div>
</div>
<div class="ix-timeline-stage" data-phase="neutral">
<div class="ix-stage-label">Data Quality Monitor</div>
<div class="ix-stage-body">
<p><strong>Trigger:</strong> Scheduled (daily or weekly cron)</p>
<p><strong>Archetype:</strong> Parallel fan-out (one sub-agent per database table or domain area)</p>
<p><strong>Scope:</strong> Read DB records, compare against schema, open issues above severity threshold</p>
<p><strong>Spiral:</strong> Fan-out pattern from M09 -- subtasks are independent by table/domain, each has its own bounded context.</p>
</div>
</div>
</div>

<p class="ix-instruct">Watch the trace replay to see a complete PR Review pipeline cycle through all four PRAO phases.</p>

<div class="ix-diagram" data-component="agent-trace"
     data-variant="prao"
     data-diagram-id="m12-pr-review-trace"
     data-speed="0.5">
<span class="ix-title">PR Review Pipeline -- Complete Agentic Loop (PRAO) Cycle</span>
<div class="ix-trace-row" data-type="prompt" data-phase="perceive" data-delay="0">
<span class="ix-trace-content">> PR #247 opened: "Add OAuth2 login flow" -- 8 files changed, +412 lines</span>
</div>
<div class="ix-trace-row" data-type="tool" data-phase="perceive" data-delay="2000">
<span class="ix-trace-content">Read("CLAUDE.md") -- loading team conventions and review guidelines</span>
</div>
<div class="ix-trace-row" data-type="result" data-phase="perceive" data-delay="1500">
<span class="ix-trace-content">-> CLAUDE.md loaded: security review required for auth changes, test coverage minimum 80%</span>
</div>
<div class="ix-trace-row" data-type="tool" data-phase="perceive" data-delay="1500">
<span class="ix-trace-content">Read("src/auth/oauth.ts"), Read("src/auth/session.ts"), Read("tests/auth.test.ts")</span>
</div>
<div class="ix-trace-row" data-type="result" data-phase="perceive" data-delay="1500">
<span class="ix-trace-content">-> oauth.ts: 187 lines, session.ts: 94 lines, auth.test.ts: 43 lines (3 tests)</span>
</div>
<div class="ix-trace-row" data-type="think" data-phase="reason" data-delay="3500">
<span class="ix-trace-content">Applying TCEF prompt (M04): Task = security review for OAuth2 changes. Context = CLAUDE.md conventions loaded, 3 files read. Examples = team security skill patterns. Format = structured JSON findings with severity.</span>
</div>
<div class="ix-trace-row" data-type="think" data-phase="reason" data-delay="4000">
<span class="ix-trace-content">Issue 1 (HIGH): No CSRF token validation in session creation -- tokens could be replayed. Issue 2 (MEDIUM): Refresh token stored in localStorage -- should be httpOnly cookie. Issue 3 (INFO): Test coverage 3 tests / 281 lines = ~1% -- below 80% threshold.</span>
</div>
<div class="ix-trace-row" data-type="tool" data-phase="act" data-delay="1500">
<span class="ix-trace-content">github_mcp.post_review_comment(pr=247, body={"findings": [...], "severity": "HIGH", "blocking": true})</span>
</div>
<div class="ix-trace-row" data-type="result" data-phase="observe" data-delay="1500">
<span class="ix-trace-content">-> Review comment posted. PR #247 marked "Changes requested". Webhook confirmed receipt.</span>
</div>
<div class="ix-trace-row" data-type="response" data-phase="observe" data-delay="2500">
<span class="ix-trace-content">Pipeline complete. 2 security findings (1 HIGH, 1 MEDIUM), 1 coverage finding. PR blocked pending fixes. This trace uses the Agentic Loop (PRAO) from Module 01: Perceive (read PR + CLAUDE.md) -> Reason (TCEF analysis) -> Act (post review) -> Observe (confirm delivery).</span>
</div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="core-idea">
<p><strong>MCP servers are integration points</strong>: Every external interaction in the Act phase -- posting a GitHub comment, querying a database, fetching documentation -- goes through an MCP server. For new remote deployments, use Streamable HTTP transport. HTTP+SSE is a deprecated legacy path from older spec versions and should be migrated when present. The three MCP primitives (Tools, Resources, Prompts) are the only building blocks -- no others exist.</p>
</div>

<details class="ix-collapse">
<summary>Deep Dive: When to add a parallel fan-out vs a simple chain</summary>
<div class="ix-collapse-body">
<p>The question is never "could this be parallelized?" -- almost anything can be parallelized. The question is "does the coordination cost justify the parallelism benefit?"</p>
<p>A parallel fan-out adds three costs: (1) orchestration overhead -- typically 15-20 seconds to launch sub-agents and coordinate their sessions; (2) aggregation complexity -- you must merge N result sets, deduplicate findings, resolve conflicts between sub-agents; (3) debugging difficulty -- instead of one session log to reconstruct, you have N sub-agent logs plus the orchestrator log, all correlated by <code>session_id</code>.</p>
<p>A simple chain avoids all three costs. For most organizational tasks -- PR review, documentation sync, onboarding guide generation -- the task fits comfortably in a single context window and the sequential execution is fast enough. The Module 09 rule applies here: start with a single agent. Add a second agent only when you can demonstrate that the task genuinely requires parallelism, specialization, or context isolation.</p>
<p>The PR review pipeline illustrates this exactly. A four-check sequential agent (security, performance, docs, tests) may take 90 seconds. A parallel fan-out with four sub-agents may take 35 seconds. The 55-second improvement matters for a high-volume team; it does not matter for a team with five PRs per day. Always measure before you parallelize.</p>
</div>
</details>

---

## 12.2 The Five Design Phases

<div class="ix-diagram" data-component="objective">
  <p>Apply all five design phases to plan a production agentic system, producing a complete specification before any configuration is written.</p>
</div>

<p class="ix-instruct">Write your prediction, then reveal the reference reasoning.</p>

<div class="ix-diagram" data-component="predict-reveal" data-diagram-id="m12-design-predict" data-xp="8">
<span class="ix-title">Predict Before You Learn</span>
<p class="ix-predict-prompt">Before we walk through the five design phases: a team ships an agentic code reviewer on day one -- no CLAUDE.md committed, no approval gates configured, permissions set to broad bash access for convenience. What is the most likely first incident, and in which of the five pipeline components does the failure originate?</p>
<textarea class="ix-predict-input" aria-label="Your prediction" placeholder="Write your reasoning -- what would you expect and why?"></textarea>
<details class="ix-predict-reveal">
<summary>Reveal reference reasoning</summary>
<p>The most likely first incident is an unintended write or destructive action. With broad bash permissions and no approval gate, the agent has the ability to execute any command -- and in attempting to "fix" what it perceives as an issue, it may delete files, reset git history, or modify production configuration. The failure originates in the <strong>Action Scope</strong> component: the permissions were not bounded to the read-and-comment scope the pipeline actually required. The absence of a committed CLAUDE.md means the agent has no grounding in team conventions, compounding the problem by making reasoning errors more likely. This is exactly what Module 10's security framework prevents: a permission audit (Phase 4) would have caught the broad bash access before deployment.</p>
</details>
</div>

<p class="ix-instruct">Step through the five phases to see the deliverable each phase produces before you begin the next.</p>

<div class="ix-diagram" data-component="step-walkthrough" data-diagram-id="m12-design-phases">
<span class="ix-title">The Five Design Phases</span>
<div class="ix-step">
<div class="ix-step-label">Phase 1: Problem Scoping</div>
<div class="ix-step-body">
<p><strong>Deliverable:</strong> trigger specification, measurable success criterion, delivery path</p>
<ul>
<li>Define the trigger with exact mechanism and input data (not "CI fails" -- "GitHub Actions workflow completes with failure status, emits webhook with run ID")</li>
<li>Write a measurable success criterion: "agent identifies X% of Y in a test set of Z known cases"</li>
<li>Trace the value chain: output → delivery mechanism → beneficiary</li>
</ul>
<p><strong>Why first:</strong> Engineers who skip problem scoping build for the problem they imagined, not the problem that needs solving. The trigger determines what information is available at startup, which constrains every phase that follows.</p>
</div>
</div>
<div class="ix-step">
<div class="ix-step-label">Phase 2: Pipeline Architecture</div>
<div class="ix-step-body">
<p><strong>Deliverable:</strong> component diagram, agent allocation decision, interface specifications</p>
<ul>
<li>Draw the pipeline stages and data flow: Trigger → Context → Decision → Action → Output</li>
<li>Apply the Module 09 decision framework: single agent first, multi-agent only with justification</li>
<li>Write interface specs for every pipeline boundary -- these become the contracts each component implements</li>
</ul>
<p><strong>Agent allocation from M09:</strong> Document whether you chose single-agent or multi-agent, and why. If multi-agent, specify the orchestration pattern (simple chain, fan-out, or conditional router) and each sub-agent's role.</p>
</div>
</div>
<div class="ix-step">
<div class="ix-step-label">Phase 3: Prompt and Skill Design</div>
<div class="ix-step-body">
<p><strong>Deliverable:</strong> full TCEF prompt, skill list with loading plan, output schema</p>
<ul>
<li>Write the full TCEF prompt (Module 04): Task with precision verbs, grounding Context, concrete domain-specific Examples, constrained Format</li>
<li>Identify domain knowledge that belongs in skill files (Module 07) rather than inline in the prompt</li>
<li>Define the output schema for any programmatic output (Module 05 output contracts)</li>
</ul>
<p><strong>The key discipline:</strong> knowledge that will be re-used across sessions belongs in a skill file, not copy-pasted into every prompt. Skills are loaded in CLAUDE.md at session start -- they do not need to be re-specified.</p>
</div>
</div>
<div class="ix-step">
<div class="ix-step-label">Phase 4: Safety and Production Design</div>
<div class="ix-step-body">
<p><strong>Deliverable:</strong> <code>settings.json</code> allow/deny lists, secrets audit, approval gate placements, blast radius analysis</p>
<ul>
<li>Write the <code>settings.json</code> allow list for exactly the actions this pipeline requires -- nothing more</li>
<li>Write the deny list for destructive commands and out-of-scope actions</li>
<li>Audit every credential: environment variables only -- never in CLAUDE.md or MCP config</li>
<li>Place approval gates for every irreversible or high-consequence action (Module 10 "show me the plan" pattern)</li>
</ul>
<p><strong>Blast radius:</strong> If the agent makes a reasoning error, what is the maximum scope of damage? If the blast radius is unacceptable, add constraints -- more restrictive permissions, more granular approval gates, or a mandatory human review step.</p>
</div>
</div>
<div class="ix-step">
<div class="ix-step-label">Phase 5: Observability Design</div>
<div class="ix-step-body">
<p><strong>Deliverable:</strong> session ID schema, event log specification, alerting thresholds</p>
<ul>
<li>Define the session ID schema (generated before session starts, propagated to every component)</li>
<li>Enumerate events to log: at minimum <code>session_start</code>, each <code>tool_call</code>, <code>session_end</code>, each <code>error</code></li>
<li>Set alerting thresholds: error rate, timeout rate, cost spike, session duration spike</li>
</ul>
<p><strong>Observability design before deployment, not after:</strong> The decisions you make now determine your ability to debug failures and detect degradation when the system runs in production at 3am.</p>
</div>
</div>
</div>

<p class="ix-instruct">Work through the capstone checklist to build your complete pipeline specification. This is the deliverable you take away from the course.</p>

<div class="ix-diagram" data-component="step-checklist" data-diagram-id="m12-capstone-checklist">
<span class="ix-title">Capstone Project Checklist -- Complete Pipeline Specification</span>
<div class="ix-checklist-section">
<div class="ix-checklist-section-title">Section 1: Problem Scoping</div>
<label class="ix-checklist-item"><input type="checkbox"><span>Define the task: what does the agent produce, and for whom?</span></label>
<label class="ix-checklist-item"><input type="checkbox"><span>Specify the trigger with exact mechanism and input data available at startup</span></label>
<label class="ix-checklist-item"><input type="checkbox"><span>Write a measurable success criterion ("X% accuracy on Y test set of Z cases")</span></label>
<label class="ix-checklist-item"><input type="checkbox"><span>Identify irreversible actions the pipeline may take and confirm human oversight plan</span></label>
</div>
<div class="ix-checklist-section">
<div class="ix-checklist-section-title">Section 2: Architecture Selection</div>
<label class="ix-checklist-item"><input type="checkbox"><span>Choose pipeline archetype: simple chain, parallel fan-out, or conditional router</span></label>
<label class="ix-checklist-item"><input type="checkbox"><span>Document agent allocation decision: single-agent or multi-agent with justification (M09 framework)</span></label>
<label class="ix-checklist-item"><input type="checkbox"><span>Select MCP servers for each external integration point</span></label>
<label class="ix-checklist-item"><input type="checkbox"><span>Write interface specifications for all pipeline boundaries</span></label>
</div>
<div class="ix-checklist-section">
<div class="ix-checklist-section-title">Section 3: Prompt Design</div>
<label class="ix-checklist-item"><input type="checkbox"><span>Write the full TCEF prompt: Task (precision verb), Context (constraints), Examples (domain-specific), Format (schema)</span></label>
<label class="ix-checklist-item"><input type="checkbox"><span>Identify patterns to encode as skill files vs inline prompt content</span></label>
<label class="ix-checklist-item"><input type="checkbox"><span>Define output schema for programmatic outputs (JSON schema with required fields)</span></label>
</div>
<div class="ix-checklist-section">
<div class="ix-checklist-section-title">Section 4: Permission Configuration</div>
<label class="ix-checklist-item"><input type="checkbox"><span>Write <code>settings.json</code>: <code>{"permissions": {"allow": [...], "deny": [...]}}</code> -- allow list contains only required actions</span></label>
<label class="ix-checklist-item"><input type="checkbox"><span>Deny list includes destructive bash commands, git push/force, and writes outside functional scope</span></label>
<label class="ix-checklist-item"><input type="checkbox"><span>All credentials in environment variables -- verified not in CLAUDE.md, prompts, or MCP config</span></label>
<label class="ix-checklist-item"><input type="checkbox"><span>Approval gates placed for every irreversible action (M10 "show me the plan" pattern)</span></label>
<label class="ix-checklist-item"><input type="checkbox"><span>Blast radius documented: maximum damage scope from a reasoning error</span></label>
</div>
<div class="ix-checklist-section">
<div class="ix-checklist-section-title">Section 5: Validation</div>
<label class="ix-checklist-item"><input type="checkbox"><span>Tested on 20+ representative real inputs reviewed by a domain expert</span></label>
<label class="ix-checklist-item"><input type="checkbox"><span>Output contracts validated against the defined JSON schema</span></label>
<label class="ix-checklist-item"><input type="checkbox"><span>Edge cases tested: empty input, malformed input, unusually large input</span></label>
<label class="ix-checklist-item"><input type="checkbox"><span>Approval gate tested: agent presents plan and stops awaiting confirmation</span></label>
</div>
<div class="ix-checklist-section">
<div class="ix-checklist-section-title">Section 6: Deployment Readiness</div>
<label class="ix-checklist-item"><input type="checkbox"><span>CLAUDE.md committed to git with no secrets, referencing all relevant skill files</span></label>
<label class="ix-checklist-item"><input type="checkbox"><span>Remote MCP servers configured with Streamable HTTP transport; any legacy HTTP+SSE usage is documented with an explicit migration plan</span></label>
<label class="ix-checklist-item"><input type="checkbox"><span>Audit trail configured: session logs retrievable by session ID within 5 minutes</span></label>
<label class="ix-checklist-item"><input type="checkbox"><span>Alerting thresholds set and tested: error rate, timeout rate, cost spike, duration spike</span></label>
<label class="ix-checklist-item"><input type="checkbox"><span>Incident response playbook written and reviewed with a second engineer</span></label>
</div>
</div>

<p class="ix-instruct">Step through the trace and read each annotation to see Phase 3 (prompt design) applied to the PR review pipeline.</p>

<div class="ix-diagram" data-component="agent-trace"
     data-variant="annotated"
     data-diagram-id="m12-phase3-trace"
     data-default-mode="manual"
     data-speed="0.5">
<span class="ix-title">Phase 3: TCEF Prompt Design in Action (Module 04 Applied)</span>
<div class="ix-trace-row" data-type="think" data-delay="0">
<span class="ix-trace-content">Task: "Review this pull request for security vulnerabilities, convention violations, and test coverage gaps. Output a structured JSON findings object."</span>
<span class="ix-trace-note"><strong>T -- Task</strong>: Precision verb "review" with bounded scope. Three specific dimensions named. Output type specified. Applying the TCEF framework from Module 04 to this specific production context.</span>
</div>
<div class="ix-trace-row" data-type="think" data-delay="4000">
<span class="ix-trace-content">Context: "Team conventions in CLAUDE.md (loaded at session start). Security skill file: go-security-patterns@2.1. Test coverage minimum: 80% per CLAUDE.md. Repository: internal API service, Go 1.22."</span>
<span class="ix-trace-note"><strong>C -- Context</strong>: CLAUDE.md is read at session start -- not invoked as a command. Skills loaded in CLAUDE.md pre-load team knowledge. Context injection avoids re-specifying conventions in every prompt (M07 pattern).</span>
</div>
<div class="ix-trace-row" data-type="tool" data-delay="1500">
<span class="ix-trace-content">Read("examples/good-review.md"), Read("examples/bad-review.md")</span>
<span class="ix-trace-note"><strong>E -- Examples</strong>: Concrete, domain-specific examples of a good and a bad review output. Examples grounded in the actual codebase -- not generic. This is Module 04's principle: examples must be from the domain the agent is working in.</span>
</div>
<div class="ix-trace-row" data-type="result" data-delay="1500">
<span class="ix-trace-content">-> good-review.md: 3 findings, JSON format, severity HIGH/MEDIUM/INFO. bad-review.md: vague prose, no structure, no severity.</span>
<span class="ix-trace-note">The contrast between good and bad examples teaches the agent what to produce and what to avoid -- more precisely than any prose description could.</span>
</div>
<div class="ix-trace-row" data-type="think" data-delay="4000">
<span class="ix-trace-content">Format: {"findings": [{"severity": "HIGH|MEDIUM|LOW|INFO", "location": "file:line", "description": "...", "recommendation": "..."}], "blocking": true|false, "coverage_pct": number}</span>
<span class="ix-trace-note"><strong>F -- Format</strong>: Machine-readable JSON schema. <code>blocking</code> field enables downstream automation (auto-label PR). This is a Module 05 output contract: the format is the integration point. A downstream system can parse this without understanding the agent's reasoning.</span>
</div>
<div class="ix-trace-row" data-type="response" data-delay="2500">
<span class="ix-trace-content">TCEF prompt complete. All four components present: Task (bounded output), Context (skills + CLAUDE.md), Examples (domain-specific contrast pair), Format (machine-readable schema). Agent is ready for production deployment.</span>
<span class="ix-trace-note"><strong>All four TCEF components</strong>: A prompt missing any one of the four components is incomplete. Missing Format means the output can't be parsed programmatically. Missing Examples means the agent reasons from first principles rather than team conventions. Missing Task precision means scope creep.</span>
</div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="key-concept">
<p><strong>The approval gate pattern (Module 10)</strong>: Before any irreversible action, the agent presents its plan: "I am about to [action]. Here is what will change: [specific changes]. Shall I proceed?" This is the "show me the plan" pattern. It applies in Phase 4 (safety design) and must be tested explicitly -- confirm the agent stops and waits, not that it looks like it would stop.</p>
</div>

<div class="ix-diagram" data-component="callout" data-variant="tip">
<p><strong>Start single-agent (Module 09)</strong>: Every pipeline starts as a simple chain. Move to parallel fan-out only when you can demonstrate that subtasks are genuinely independent and coordination cost is justified by the time benefit. The most common over-engineering mistake is adding a second agent before measuring whether the first agent is fast enough.</p>
</div>

<details class="ix-collapse">
<summary>Deep Dive: Full example task scoping for the PR review pipeline</summary>
<div class="ix-collapse-body">
<p><strong>Trigger specification</strong>: "A GitHub Actions workflow annotated as <code>on: [pull_request]</code> transitions to <code>opened</code> or <code>synchronize</code> state and emits a webhook to the pipeline endpoint at <code>/hooks/pr-review</code>, carrying: repository full name, PR number, head SHA, PR description text, and list of changed file paths."</p>
<p><strong>Success criterion</strong>: "The agent correctly identifies at least 80% of HIGH-severity security vulnerabilities (as classified by a human security reviewer) in a test set of 50 PRs with known vulnerabilities, with a false-positive rate below 15%."</p>
<p><strong>Value chain</strong>: Agent output (JSON findings object) → GitHub PR review comment (formatted by pipeline layer) → developer who opened the PR (notified by GitHub) → PR cannot be merged while blocking = true. The developer benefits by catching security issues before code review, not in production.</p>
<p><strong>Why this level of specificity matters</strong>: The trigger specification reveals that the pipeline needs the PR description text and changed file paths at startup -- these must be passed to the agent as initial context, not fetched via tool call (the PR may be modified while the agent is running). The success criterion reveals that a 79% identification rate is a failure, which means the validation phase must include a 50-PR test set, not a five-PR sanity check. The value chain reveals that the output must be formatted as a GitHub PR review comment, not a Slack message or email -- which determines which MCP server is needed in the Act phase.</p>
</div>
</details>

---

## 12.3 Deployment Checklist

<div class="ix-diagram" data-component="objective">
  <p>Execute production deployment across six checklist categories, verifying each item from configuration and test evidence rather than self-assessment.</p>
</div>

The deployment checklist extends the stack adaptation checklist from Module 11 with production-specific verification items. Every item must be demonstrable from configuration files or test output -- "I believe it's configured correctly" is not a passing answer.

<p class="ix-instruct">Switch between tabs to review each checklist category and its verification items.</p>

<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="m12-deploy-tabs">
<span class="ix-title">Production Deployment Checklist</span>
<div data-tab="CLAUDE.md">
<ul>
<li>CLAUDE.md is committed to the project repository (not only on the developer's machine)</li>
<li>No secrets or API keys in CLAUDE.md (secrets belong in environment variables only)</li>
<li>All relevant skill files referenced in CLAUDE.md and verified to exist at the specified paths</li>
<li>Team conventions for the project tech stack are encoded (referencing M11 stack CLAUDE.md patterns)</li>
<li>CLAUDE.md tested: open a new session, verify the agent demonstrates expected behavior from session start</li>
</ul>
</div>
<div data-tab="Permissions">
<ul>
<li><code>settings.json</code> allow list reviewed by a second engineer -- not self-reviewed</li>
<li>Format verified: <code>{"permissions": {"allow": [...], "deny": [...]}}</code> -- never an abbreviated format</li>
<li>Every item on the allow list is required by the pipeline's core function -- remove anything speculative</li>
<li>Deny list includes: destructive bash commands, git push/force, writes outside functional scope</li>
<li>Approval gates configured and tested: agent presents plan and stops, does not proceed autonomously</li>
<li>CI context has its own <code>settings.json</code>, separate from developer context</li>
</ul>
</div>
<div data-tab="MCP Servers">
<ul>
<li>All remote MCP servers configured with <strong>Streamable HTTP transport</strong>; any legacy HTTP+SSE endpoint has a documented migration owner and date</li>
<li>All local MCP servers configured with <strong>stdio transport</strong></li>
<li>MCP server endpoints tested: each server responds to a test tool call before deployment</li>
<li>MCP primitives in use verified: Tools (actions), Resources (context), Prompts (templates) -- only these three exist</li>
<li>No MCP server configuration includes hardcoded credentials -- all via environment variables</li>
</ul>
</div>
<div data-tab="Secrets">
<ul>
<li>All prompts, CLAUDE.md, and MCP config files scanned for hardcoded credentials -- none found</li>
<li>Git history checked for previously committed secrets (use <code>git-secrets</code> or <code>trufflehog</code>)</li>
<li>All required environment variables documented in <code>.env.example</code> with placeholder values</li>
<li><code>.env</code> is in <code>.gitignore</code> -- verified with <code>git check-ignore -v .env</code></li>
<li>CI/CD secrets configured in platform secret management -- not in pipeline YAML files</li>
</ul>
</div>
<div data-tab="Output Contracts">
<ul>
<li>Output schema defined for all programmatic outputs (JSON schema with required fields)</li>
<li>Agent output validated against schema on all 20+ test inputs -- no schema violations</li>
<li>Error handling defined for malformed output: pipeline fails gracefully with a clear error event logged</li>
<li>Downstream systems confirmed compatible with the output schema before deployment</li>
</ul>
</div>
<div data-tab="Monitoring">
<ul>
<li>Session logs can be retrieved by session ID within 5 minutes of session completing</li>
<li>Error rate alerting configured and tested (verify a test error triggers the alert)</li>
<li>Timeout rate alerting configured</li>
<li>Per-session token budget documented and tested on representative high-context runs</li>
<li>Fan-out concurrency cap and rate-limit backoff policy tested before launch</li>
<li>Cost spike alerting configured (alert if daily cost exceeds 150% of 7-day rolling average)</li>
<li>Incident response playbook documented and reviewed by the on-call team</li>
<li>On-call team knows how to access session logs and what they contain</li>
</ul>
</div>
</div>

<p class="ix-instruct">Choose your response for each deployment scenario. Is the system ready to deploy?</p>

<div class="ix-diagram" data-component="scenario-quiz" data-diagram-id="m12-deploy-scenarios">
<span class="ix-title">Deployment Readiness Scenarios</span>
<div class="ix-scenario">
<div class="ix-scenario-header">Scenario A</div>
<div class="ix-scenario-body">
<p>The deployment checklist is complete across all six categories. However, reviewing the MCP server configuration file reveals: <code>"transport": "sse"</code> for the GitHub MCP server.</p>
</div>
<div class="ix-scenario-question">What must be changed before this system can deploy to production?</div>
<div class="ix-scenario-options">
<button class="ix-scenario-option">Nothing -- SSE is a valid transport option alongside Streamable HTTP</button>
<button class="ix-scenario-option" data-correct="true">Change the transport from SSE to Streamable HTTP -- migrate off the deprecated legacy path</button>
<button class="ix-scenario-option">Add a note to the documentation that SSE is in use</button>
<button class="ix-scenario-option">Test the SSE connection and proceed if it works</button>
</div>
<div class="ix-scenario-explanation">SSE transport is deprecated as of 2025-03-26 and should not be used for new remote deployments. Existing systems still on SSE are on a legacy path and should be migrated deliberately. The fix is a configuration change: update the transport field to Streamable HTTP and verify the endpoint URL matches the Streamable HTTP endpoint (not the SSE endpoint -- they may differ).</div>
</div>
<div class="ix-scenario">
<div class="ix-scenario-header">Scenario B</div>
<div class="ix-scenario-body">
<p>A developer added <code>GITHUB_TOKEN=ghp_xxx</code> to CLAUDE.md "for convenience so the agent can always find the token." The rest of the checklist is complete.</p>
</div>
<div class="ix-scenario-question">Which two checklist categories does this violation appear in?</div>
<div class="ix-scenario-options">
<button class="ix-scenario-option">MCP Servers and Monitoring</button>
<button class="ix-scenario-option">Permissions and Output Contracts</button>
<button class="ix-scenario-option" data-correct="true">CLAUDE.md and Secrets</button>
<button class="ix-scenario-option">Permissions and CLAUDE.md</button>
</div>
<div class="ix-scenario-explanation">CLAUDE.md is committed to git -- any secret placed in it is now in the repository's history and accessible to anyone with repo access. This violates the CLAUDE.md checklist item ("no secrets in CLAUDE.md") AND the Secrets checklist item ("all credentials in environment variables -- none in CLAUDE.md or MCP config"). The fix: remove the token from CLAUDE.md immediately, rotate the GitHub token (it is now compromised), add it to the <code>.env</code> file as <code>GITHUB_TOKEN=</code> with the actual value, and add it to <code>.env.example</code> with a placeholder.</div>
</div>
<div class="ix-scenario">
<div class="ix-scenario-header">Scenario C</div>
<div class="ix-scenario-body">
<p>A team ships a documentation sync pipeline with a broad <code>settings.json</code> allow list: <code>Write(**)</code>. The reasoning: "The agent needs to write docs everywhere, so we kept it broad for flexibility." No approval gate is configured because "documentation changes are low risk." Two weeks in, the agent writes incorrect content to a file it should not have touched. Which Phase of the five design phases should have caught this before deployment?</p>
</div>
<div class="ix-scenario-question">Which design phase was skipped or done incorrectly?</div>
<div class="ix-scenario-options">
<button class="ix-scenario-option">Phase 1: Problem Scoping -- the trigger was not specified precisely enough</button>
<button class="ix-scenario-option">Phase 2: Pipeline Architecture -- the wrong archetype was chosen</button>
<button class="ix-scenario-option" data-correct="true">Phase 4: Safety and Production Design -- the allow list was not scoped to required paths, and no blast radius analysis was performed</button>
<button class="ix-scenario-option">Phase 5: Observability Design -- session logs were not configured</button>
</div>
<div class="ix-scenario-explanation">Phase 4 (Safety and Production Design) requires writing the allow list for exactly the actions the pipeline requires -- nothing more. <code>Write(**)</code> violates least privilege by permitting writes anywhere on the filesystem. A scoped allow list -- for example, <code>Write(docs/**)</code> -- limits the blast radius to the docs directory. Additionally, Phase 4 requires a blast radius analysis: "if the agent makes a reasoning error, what is the maximum scope of damage?" An unlimited write permission means the blast radius is unbounded. An approval gate for any write outside the primary docs path would have prevented the out-of-scope write entirely. "Low risk" is not a valid reason to skip approval gates for irreversible file writes.</div>
</div>
<div class="ix-scenario">
<div class="ix-scenario-header">Scenario D</div>
<div class="ix-scenario-body">
<p>A production incident occurs. The on-call engineer retrieves session logs but finds that <code>tool_call</code> events do not carry a <code>session_id</code> field -- only <code>session_start</code> and <code>session_end</code> events do. The pipeline has been running for three months. The engineer cannot reconstruct what the agent did during the failing session.</p>
</div>
<div class="ix-scenario-question">Which observability design failure caused this, and what is the minimal fix?</div>
<div class="ix-scenario-options">
<button class="ix-scenario-option">The logging library was not initialized -- reinstall it and redeploy</button>
<button class="ix-scenario-option">The session_id schema was defined incorrectly -- change to UUID v4</button>
<button class="ix-scenario-option" data-correct="true">The session_id was not propagated to all event types at design time -- the fix is to emit session_id on every event (session_start, tool_call, error, session_end) going forward, and accept that historical sessions cannot be reconstructed</button>
<button class="ix-scenario-option">The alerting threshold was too low -- raise it to reduce log volume</button>
</div>
<div class="ix-scenario-explanation">Phase 5 (Observability Design) requires specifying that session_id is generated before the session starts and propagated to every event type. Logging session_id only on start/end events creates exactly this failure: you know a session started and ended, but you cannot associate any intermediate events with it. The fix is forward-looking -- update the logging code to include session_id on every emitted event. Historical sessions without session_id on tool_call events are unrecoverable from logs alone, which is why Phase 5 must be designed before deployment, not retrofitted after an incident.</div>
</div>
</div>

<p class="ix-instruct">Work through the debug steps when a checklist item cannot be demonstrated from configuration.</p>

<div class="ix-diagram" data-component="debug-steps" data-diagram-id="m12-debug-steps">
<span class="ix-title">Common Deployment Failures and Fixes</span>
<div class="ix-debug-step">
<div class="ix-debug-label">Failure 1: MCP server not connecting</div>
<div class="ix-debug-body">
<p><strong>Symptom:</strong> Tool calls to MCP server fail with connection error or timeout</p>
<p><strong>Check transport config:</strong> Open the MCP server config. Verify <code>"transport"</code> field is not <code>"sse"</code> (deprecated) -- it should be Streamable HTTP for remote servers.</p>
<p><strong>Verify endpoint:</strong> Confirm the Streamable HTTP endpoint URL is reachable from the deployment environment. SSE and Streamable HTTP endpoints may be different paths on the same server.</p>
<p><strong>Test isolation:</strong> Make a direct HTTP request to the endpoint before involving Claude Code -- confirm the server is running and responding before debugging the MCP layer.</p>
</div>
</div>
<div class="ix-debug-step">
<div class="ix-debug-label">Failure 2: Agent not respecting CLAUDE.md rules</div>
<div class="ix-debug-body">
<p><strong>Symptom:</strong> Agent ignores team conventions, skill loading, or scoping rules defined in CLAUDE.md</p>
<p><strong>Check file is committed:</strong> CLAUDE.md must be committed to the repository. A file only on the developer's machine is invisible in CI or other sessions.</p>
<p><strong>Verify project-level vs global scope:</strong> A CLAUDE.md in the project root applies to that project. A CLAUDE.md in a subdirectory applies only to that subdirectory. Verify the file is in the correct location for the pipeline's working directory.</p>
<p><strong>Check loading:</strong> Add a simple rule to CLAUDE.md like "Always start responses with [CLAUDE.md loaded]" -- run a test session and verify the agent includes this prefix. If it doesn't, CLAUDE.md is not being read.</p>
</div>
</div>
<div class="ix-debug-step">
<div class="ix-debug-label">Failure 3: Approval gate not triggering</div>
<div class="ix-debug-body">
<p><strong>Symptom:</strong> Agent proceeds with irreversible actions without presenting a plan for approval</p>
<p><strong>Check gate conditions in CLAUDE.md:</strong> The approval gate is defined as a rule in CLAUDE.md, not as a configuration setting. Open the file and verify the gate condition is clearly specified: "Before executing any action that writes to the database, present the full list of changes and wait for confirmation."</p>
<p><strong>Verify phrasing matches source:</strong> The gate trigger must match the exact action the agent takes. If the CLAUDE.md says "before writing to database" but the agent uses a tool named <code>update_record</code>, the phrasing may not trigger. Test with the specific tool names the agent actually uses.</p>
<p><strong>Test explicitly:</strong> Run a test session that includes a confirmed irreversible action. Verify the agent presents the plan and does not proceed until you type a confirmation response.</p>
</div>
</div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="warning">
<p><strong>SSE transport deprecated</strong>: New remote deployments should use Streamable HTTP. Systems still using <code>"transport": "sse"</code> are on a legacy path and should be migrated with a tracked rollout plan. The migration requires updating the transport field and verifying the Streamable HTTP endpoint URL -- the two endpoints are often different paths.</p>
</div>

<div class="ix-diagram" data-component="callout" data-variant="tip">
<p><strong>Run the checklist as a PR review</strong>: Before every production deployment, treat the six-category checklist as a code review. One engineer executes the checklist, a second engineer reviews the evidence. Items that can only be verified by the engineer who built the system should be flagged for independent verification -- self-review misses systematic blind spots.</p>
</div>

<details class="ix-collapse">
<summary>Deep Dive: Migration guide from SSE to Streamable HTTP for existing MCP servers</summary>
<div class="ix-collapse-body">
<p>If you have an existing MCP server deployment using SSE, migration to Streamable HTTP follows these steps:</p>
<p><strong>Step 1: Identify all SSE endpoints</strong>. Scan all MCP server configuration files for <code>"transport": "sse"</code>. Note the current endpoint URLs -- they typically look like <code>https://server/sse</code> or use an SSE-specific path.</p>
<p><strong>Step 2: Find the Streamable HTTP endpoint</strong>. MCP servers that supported SSE typically also support Streamable HTTP on a different path (often <code>https://server/mcp</code> or <code>https://server/v1/mcp</code>). Check the server's documentation or repository for the Streamable HTTP endpoint path.</p>
<p><strong>Step 3: Update configuration</strong>. Change <code>"transport": "sse"</code> to <code>"transport": "http"</code> (or the equivalent Streamable HTTP transport identifier for your MCP client). Update the endpoint URL to the Streamable HTTP path.</p>
<p><strong>Step 4: Test in staging</strong>. Run a complete test session against the staging environment with the updated configuration. Verify that all three MCP primitives (Tools, Resources, Prompts) function as expected over the new transport.</p>
<p><strong>Step 5: Deploy configuration update</strong>. Deploy the configuration change without a code change. The transport migration is a configuration-only change -- no prompt or skill file changes are required.</p>
<p>For MCP servers you own and operate: update the server to support Streamable HTTP. The MCP specification and reference implementations document the server-side implementation. Custom SSE-only servers should be considered technical debt and prioritized for migration.</p>
</div>
</details>

---

## 12.4 Cost Control, Observability, and Incident Response

<div class="ix-diagram" data-component="objective">
  <p>Set token budgets, configure structured logging, define alert thresholds, and execute the five-minute incident response playbook for a production agentic system.</p>
</div>

<p>Production reliability is not only about correctness. A pipeline that returns good answers while blowing through its token budget, saturating rate limits, or spawning too many parallel agents is still failing in production. Cost control belongs in the architecture, not in a finance spreadsheet after launch.</p>

<p class="ix-instruct">Switch between tabs to see the four controls that keep production usage predictable.</p>

<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="m12-cost-controls">
<span class="ix-title">Cost and Context Budget Controls</span>
<div data-tab="Estimate Before Run">
<p><strong>Define the normal run before you ship.</strong> Estimate input tokens, expected output tokens, and any fan-out multiplier. For interactive Claude Code work, track representative sessions with the session cost view. For programmatic pipelines, use token counting or dry runs before enabling the trigger.</p>
<p><strong>Ship with three numbers</strong>: per-session ceiling, daily pipeline budget, and monthly team budget. If none of those numbers exist, the system is not production-ready yet.</p>
</div>
<div data-tab="Reduce Context Load">
<p><strong>Most cost overruns start as context mistakes.</strong> Read only the files needed for the current phase, summarize before handing off to the next phase, and keep stable reference material in skills, resources, or external docs instead of re-inlining it every run.</p>
<p><strong>Warning sign</strong>: if each new feature request makes every session materially longer, your context strategy is decaying faster than your prompt quality is improving.</p>
</div>
<div data-tab="Rate Limits">
<p><strong>Budget for throughput, not just price.</strong> Provider rate limits, MCP server limits, and downstream API limits can all turn a healthy pipeline into a retry storm. Cap fan-out width, queue long-running jobs, and use bounded retries with jitter instead of open-ended retry loops.</p>
<p><strong>Design question</strong>: what happens when a parallel review pipeline wants to launch four specialists, but the current rate limit only supports two? Your answer should be a queue or graceful degradation policy, not wishful thinking.</p>
</div>
<div data-tab="Circuit Breakers">
<p><strong>Every production agent needs a stop condition.</strong> Abort or degrade when any one of these trips: per-session token ceiling exceeded, daily cost spikes above threshold, retry count crosses the recovery limit, or queue backlog shows the trigger is firing faster than the system can drain it.</p>
<p><strong>Typical degradation path</strong>: switch from parallel fan-out to a single-agent chain, reduce optional context gathering, and require human approval before resuming full throughput.</p>
</div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="tip">
  <p><strong>Budget before you scale</strong>: Cost surprises usually come from one of four causes: over-reading context, over-fanning out agents, retry storms, or a trigger firing more often than expected. Instrument all four before launch.</p>
</div>

<p class="ix-instruct">Write your prediction, then reveal the reference reasoning.</p>

<div class="ix-diagram" data-component="predict-reveal" data-diagram-id="m12-observability-predict" data-xp="8">
<span class="ix-title">Predict Before You Learn</span>
<p class="ix-predict-prompt">An agentic system has been in production for two weeks. You get an alert at 3am -- error rate is 12%, up from a baseline of 1%. Before you look at any logs, what is the single most important piece of information you need in the first 60 seconds to determine whether you should roll back the system immediately or investigate further?</p>
<textarea class="ix-predict-input" aria-label="Your prediction" placeholder="Write your reasoning -- what would you need to know first and why?"></textarea>
<details class="ix-predict-reveal">
<summary>Reveal reference reasoning</summary>
<p>The most important first piece of information is: <strong>did any failing session take an irreversible action?</strong> If yes, you must escalate to the pipeline owner immediately for human review -- the irreversible action may have already caused damage that investigation cannot undo. If no, the incident scope is limited to failed sessions that need to be re-run, and you have time to investigate the root cause before taking action. This determines the urgency and the decision frame for the next four minutes. Knowing the error type or the failing component is important, but secondary -- you cannot undo a write to a production database or a sent email, and determining whether that happened is the first gate. The structured log event <code>session_end</code> with its <code>status</code> field, combined with tool call logs showing write operations, gives you this answer within seconds if your logging is configured correctly.</p>
</details>
</div>

<p class="ix-instruct">Click each card to explore what it captures and when to rely on it.</p>

<div class="ix-diagram" data-component="click-cards" data-diagram-id="m12-observability-differences">
<span class="ix-title">Three Observability Layers</span>
<div class="ix-card" data-phase="perceive">
<i data-lucide="file-text" class="ix-card-icon"></i>
<span class="ix-card-label">Agent Logs</span>
</div>
<div class="ix-card" data-phase="reason">
<i data-lucide="bar-chart-2" class="ix-card-icon"></i>
<span class="ix-card-label">Metric Dashboards</span>
</div>
<div class="ix-card" data-phase="act">
<i data-lucide="git-commit" class="ix-card-icon"></i>
<span class="ix-card-label">Trace Sampling</span>
</div>
<div class="ix-detail-panel">
<div class="ix-detail-header" data-phase="perceive">Agent Logs</div>
<div class="ix-detail-body">
<div class="ix-section">
<div class="ix-sec-label">What It Captures</div>
<div class="ix-sec-text">The complete event sequence for every session: <code>session_start</code>, each <code>tool_call</code> with inputs and output summary, <code>approval_gate</code> events, <code>session_end</code> with status and cost, and <code>error</code> events. Every event carries a <code>session_id</code> for correlation.</div>
</div>
<div class="ix-section">
<div class="ix-sec-label">When to Rely On It</div>
<div class="ix-sec-text">Incident investigation: reconstructing exactly what happened in a failing session. Cost attribution: summing <code>tokens_consumed</code> by session or pipeline. Trace reading at scale -- this is the Module 03 skill applied to production systems, where there are thousands of traces instead of one.</div>
</div>
</div>
</div>
<div class="ix-detail-panel">
<div class="ix-detail-header" data-phase="reason">Metric Dashboards</div>
<div class="ix-detail-body">
<div class="ix-section">
<div class="ix-sec-label">What It Captures</div>
<div class="ix-sec-text">Aggregated statistics over time: error rate %, success rate %, median session duration, daily token cost, approval gate trigger rate. These metrics are derived from the event logs by aggregation queries.</div>
</div>
<div class="ix-section">
<div class="ix-sec-label">When to Rely On It</div>
<div class="ix-sec-text">Proactive monitoring: detecting degradation before it becomes an incident. Capacity planning: tracking cost trends. Health checks: the 3am alert fires from a dashboard threshold, not from reading individual logs.</div>
</div>
</div>
</div>
<div class="ix-detail-panel">
<div class="ix-detail-header" data-phase="act">Trace Sampling</div>
<div class="ix-detail-body">
<div class="ix-section">
<div class="ix-sec-label">What It Captures</div>
<div class="ix-sec-text">A representative sample of full session traces selected for quality review -- typically 5-10% of sessions, or 100% of sessions ending with errors. Sampled traces are reviewed manually to assess output quality, detect prompt drift, and identify edge cases that metrics miss.</div>
</div>
<div class="ix-section">
<div class="ix-sec-label">When to Rely On It</div>
<div class="ix-sec-text">Weekly quality review: does the agent's reasoning quality match the baseline from initial validation? Prompt drift detection: are outputs subtly changing as the codebase evolves? Error pattern identification: do failing sessions share a common tool call sequence?</div>
</div>
</div>
</div>
</div>

<p class="ix-instruct">Switch between tabs to see the JSON log structure for each event type.</p>

<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="m12-log-events">
<span class="ix-title">Structured Log Event Types</span>
<div data-tab="session_start">
<pre><code>{
  "timestamp": "2026-03-17T09:14:02.100Z",
  "session_id": "sess_2026_03_17_a4f9d2",
  "pipeline": "pr-security-review",
  "event_type": "session_start",
  "trigger": "github_webhook",
  "input_hash": "sha256:abc123...",
  "tokens_consumed": 0
}</code></pre>
</div>
<div data-tab="tool_call">
<pre><code>{
  "timestamp": "2026-03-17T09:14:05.234Z",
  "session_id": "sess_2026_03_17_a4f9d2",
  "pipeline": "pr-security-review",
  "event_type": "tool_call",
  "tool": "read_file",
  "tool_input": {"path": "src/api/auth.ts"},
  "tool_output_summary": "Read 847 lines successfully",
  "tokens_consumed": 2341,
  "duration_ms": 287,
  "error": null
}</code></pre>
</div>
<div data-tab="approval_gate">
<pre><code>{
  "timestamp": "2026-03-17T09:14:12.501Z",
  "session_id": "sess_2026_03_17_a4f9d2",
  "pipeline": "pr-security-review",
  "event_type": "approval_gate",
  "action_type": "post_pr_review",
  "plan_summary": "Post review with 3 findings (1 HIGH) to PR #247",
  "plan_hash": "sha256:def456...",
  "awaiting_approval": true
}</code></pre>
</div>
<div data-tab="session_end">
<pre><code>{
  "timestamp": "2026-03-17T09:14:18.899Z",
  "session_id": "sess_2026_03_17_a4f9d2",
  "pipeline": "pr-security-review",
  "event_type": "session_end",
  "status": "success",
  "total_duration_ms": 16799,
  "total_tokens_consumed": 8432,
  "output_hash": "sha256:ghi789...",
  "findings_count": 3
}</code></pre>
</div>
<div data-tab="error">
<pre><code>{
  "timestamp": "2026-03-17T10:02:44.123Z",
  "session_id": "sess_2026_03_17_b7e1c3",
  "pipeline": "pr-security-review",
  "event_type": "error",
  "error_type": "tool_call_failure",
  "error_message": "MCP server github-mcp: connection timeout after 30s",
  "tool": "post_review_comment",
  "recoverable": false,
  "irreversible_action_taken": false
}</code></pre>
</div>
</div>

<p class="ix-instruct">Click each stage to reveal the action steps for that minute of the incident response playbook.</p>

<div class="ix-diagram" data-component="timeline" data-diagram-id="m12-incident-playbook">
<span class="ix-title">Incident Response Playbook -- First Five Minutes</span>
<div class="ix-timeline-stage" data-phase="perceive">
<div class="ix-stage-label">Minute 0-1: Characterize the Failure</div>
<div class="ix-stage-body">
<p>Is the failure affecting all sessions or a subset?</p>
<p>When did it start? Check the timestamp on the first failing <code>session_end</code> event with <code>"status": "error"</code>.</p>
<p>What type of failure: error rate spike, cost spike, or availability issue?</p>
<p><strong>Dashboard first, logs second</strong>: The metric dashboard tells you scope and start time in 30 seconds. Individual logs tell you cause -- read them in minute 1-2.</p>
</div>
</div>
<div class="ix-timeline-stage" data-phase="reason">
<div class="ix-stage-label">Minute 1-2: Identify the Failing Component</div>
<div class="ix-stage-body">
<p>Retrieve the log for the <strong>first</strong> failing session (not the most recent -- you need the session that started the failure to establish causality).</p>
<p>Identify the last successful <code>tool_call</code> event and the first <code>error</code> event.</p>
<p>Is the failure in the agent's reasoning, in an MCP server, or in a downstream system? The <code>error_type</code> and <code>tool</code> fields in the error event identify the layer.</p>
</div>
</div>
<div class="ix-timeline-stage" data-phase="act">
<div class="ix-stage-label">Minute 2-3: Determine Reversibility</div>
<div class="ix-stage-body">
<p>Did any failing session take an irreversible action? Check <code>"irreversible_action_taken"</code> in error events and <code>tool_call</code> events for write operations.</p>
<p>If yes: escalate to the pipeline owner immediately for human review before proceeding.</p>
<p>If no: incident scope is limited to failed sessions. Investigate cause before deciding on rollback.</p>
</div>
</div>
<div class="ix-timeline-stage" data-phase="observe">
<div class="ix-stage-label">Minute 3-5: Containment</div>
<div class="ix-stage-body">
<p><strong>MCP server failure:</strong> Disable the MCP server in configuration, deploy the config change, verify sessions stop attempting the failing tool call.</p>
<p><strong>Prompt failure:</strong> Disable the pipeline trigger (cron job or webhook endpoint) until the prompt is corrected. Do not leave a failing prompt in production.</p>
<p><strong>Permission failure:</strong> If the agent attempted an action it should not have, review all recent sessions for similar attempts before re-enabling.</p>
</div>
</div>
<div class="ix-timeline-stage" data-phase="neutral">
<div class="ix-stage-label">Post-Containment: Root Cause Analysis</div>
<div class="ix-stage-body">
<p>A written RCA is mandatory when ANY ONE of these conditions is met:</p>
<ul>
<li>An irreversible action was taken</li>
<li>The incident lasted more than 15 minutes</li>
<li>More than 10 sessions were affected</li>
</ul>
<p>The RCA must include: what happened, why monitoring did not catch it sooner, what was done to fix it, and what configuration or process change prevents recurrence.</p>
</div>
</div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="key-concept">
<p><strong>Trace correlation</strong>: Every log event carries a <code>session_id</code>. In multi-agent systems (Module 09), each sub-agent also carries the parent <code>session_id</code> and its own <code>agent_id</code>. This allows you to filter all events for a session, order them by timestamp, and filter by agent for per-agent cost analysis. The <code>session_id</code> must be generated before the session starts and propagated to every component -- not generated mid-session.</p>
</div>

<p class="ix-instruct">Review each alert threshold to understand when it signals a problem requiring action.</p>

<div class="ix-diagram" data-component="entry-list" data-diagram-id="m12-alert-thresholds">
<span class="ix-title">Alerting Thresholds</span>
<div class="ix-entry" data-badge="exclude">
<div class="ix-entry-title">Error rate &gt; 5% (1-hour window)</div>
<div class="ix-entry-body">Sustained above 5% indicates a systematic problem: MCP server down, permission blocking a required action, or prompt failing on a class of inputs. Below 5% may be transient noise.</div>
</div>
<div class="ix-entry" data-badge="exclude">
<div class="ix-entry-title">Error rate &gt; 20% (1-hour window) -- CRITICAL</div>
<div class="ix-entry-body">Majority of sessions failing. Likely a complete MCP server outage or a breaking change in a dependency. Consider disabling the pipeline trigger until the cause is identified.</div>
</div>
<div class="ix-entry" data-badge="exclude">
<div class="ix-entry-title">Timeout rate &gt; 10%</div>
<div class="ix-entry-body">Sustained timeouts indicate the agent's scope is too large for reliable completion, or an MCP server is responding slowly. Check MCP server health and median session duration trend.</div>
</div>
<div class="ix-entry" data-badge="exclude">
<div class="ix-entry-title">Cost spike: daily cost &gt; 150% of 7-day average</div>
<div class="ix-entry-body">A sudden cost increase signals a prompt generating unexpectedly large context, a runaway multi-agent system, or a trigger firing far more frequently than expected. Check session count and per-session token consumption.</div>
</div>
<div class="ix-entry" data-badge="exclude">
<div class="ix-entry-title">Session duration &gt; 200% of 7-day median</div>
<div class="ix-entry-body">Slow sessions indicate reasoning loops, slow MCP server responses, or inputs requiring unexpectedly deep analysis. Retrieve a sample of slow sessions and check for repeated tool calls on the same resource.</div>
</div>
<div class="ix-entry" data-badge="exclude">
<div class="ix-entry-title">Approval gate bypasses &gt; 0 -- CRITICAL</div>
<div class="ix-entry-body">Any bypass of a configured approval gate is a critical signal -- the agent took an irreversible action without human review. Immediately check what action was taken and escalate to the pipeline owner.</div>
</div>
</div>

<p><strong>Threshold summary (text version):</strong> Trigger an alert when error rate exceeds <code>5%</code> (critical at <code>20%</code>), timeout rate exceeds <code>10%</code>, daily cost exceeds <code>150%</code> of 7-day average, session duration exceeds <code>200%</code> of 7-day median, or any approval gate bypass occurs.</p>

<p class="ix-instruct">Test your understanding of observability and incident response.</p>

<div class="ix-diagram" data-component="quiz" data-diagram-id="m12-observability-quiz" data-xp="15">
<span class="ix-title">Knowledge Check: Observability and Incident Response</span>
<div class="ix-quiz-question">
<p class="ix-quiz-prompt"><strong>Q1.</strong> A session log has no <code>session_id</code> field on any <code>tool_call</code> events. Why is this a problem for incident response?</p>
<div class="ix-quiz-options">
<button class="ix-quiz-option">Tool calls are less important than session_start and session_end events</button>
<button class="ix-quiz-option" data-correct="true">You cannot reconstruct the full session sequence from the logs -- the tool calls cannot be associated with a session</button>
<button class="ix-quiz-option">The dashboard metrics will still work correctly without session_id on tool calls</button>
<button class="ix-quiz-option">session_id is only required on error events, not tool_call events</button>
</div>
<p class="ix-quiz-explanation">The entire trace correlation model depends on every event carrying the session_id. Without it on tool_call events, you cannot filter "all events for session X" -- you have session_start and session_end with no connecting steps. You cannot identify which tool call failed, calculate per-session cost, or reconstruct the execution path. Every event type must carry the session_id.</p>
</div>
<div class="ix-quiz-question">
<p class="ix-quiz-prompt"><strong>Q2.</strong> A mandatory written RCA is required when an incident lasts more than 15 minutes. An agent made an irreversible action AND the incident lasted 8 minutes. Is an RCA required?</p>
<div class="ix-quiz-options">
<button class="ix-quiz-option">No -- the incident was under 15 minutes, so no RCA is required</button>
<button class="ix-quiz-option">No -- both conditions must be true (irreversible action AND over 15 minutes)</button>
<button class="ix-quiz-option" data-correct="true">Yes -- irreversible action is a separate trigger; any ONE of the three conditions requires an RCA</button>
<button class="ix-quiz-option">Only if the irreversible action caused visible damage to users</button>
</div>
<p class="ix-quiz-explanation">This is the tricky question. The three RCA triggers are: (1) irreversible action taken, (2) incident lasted more than 15 minutes, (3) more than 10 sessions affected. These are OR conditions -- any ONE triggers the mandatory RCA. A student who only reads the 15-minute rule will incorrectly answer "no" here. An irreversible action -- regardless of incident duration -- always requires a written RCA because it may have caused damage that takes time to surface.</p>
</div>
<div class="ix-quiz-question">
<p class="ix-quiz-prompt"><strong>Q3.</strong> An error rate alert fires showing 8% of sessions failing. Step 2 of the playbook says to retrieve the log for "the first failing session." Why the first, not the most recent?</p>
<div class="ix-quiz-options">
<button class="ix-quiz-option">The most recent session may still be running, making its log incomplete</button>
<button class="ix-quiz-option">The first failing session is always the most severe failure</button>
<button class="ix-quiz-option" data-correct="true">The first failing session establishes when the failure started -- causality requires the earliest event, not the most recent</button>
<button class="ix-quiz-option">Recent sessions are more likely to have been affected by human changes</button>
</div>
<p class="ix-quiz-explanation">To diagnose a failure, you need to know what changed immediately before the first failure. If failures started at 09:02, you look for what changed around 09:00 -- a deployment, an MCP server restart, a dependency update. If you look at a session that failed at 10:15, you cannot tell if the failure is the same root cause or a new one. The first failing session is the causal anchor.</p>
</div>
<div class="ix-quiz-question">
<p class="ix-quiz-prompt"><strong>Q4.</strong> In a multi-agent system, every log event carries <code>session_id</code> AND <code>agent_id</code>. What does filtering by <code>session_id</code> only give you, vs filtering by both <code>session_id</code> AND <code>agent_id</code>?</p>
<div class="ix-quiz-options">
<button class="ix-quiz-option">They are equivalent -- agent_id is redundant when session_id is present</button>
<button class="ix-quiz-option" data-correct="true">session_id alone gives the full session view; session_id + agent_id gives the per-agent view for cost attribution and scope analysis</button>
<button class="ix-quiz-option">agent_id alone is sufficient -- session_id is only needed for single-agent systems</button>
<button class="ix-quiz-option">filtering by both always returns fewer events than filtering by session_id alone</button>
</div>
<p class="ix-quiz-explanation">Filtering by session_id gives you the complete execution sequence across all agents in that session -- the orchestrator plus all sub-agents. This is the investigation view. Adding agent_id filters to one sub-agent's events only -- useful for per-agent cost (SUM tokens WHERE agent_id = 'security-reviewer') and for understanding one agent's behavior in isolation. Both views are necessary: session_id for "what happened in this session," session_id + agent_id for "how much did the security-reviewer sub-agent cost."</p>
</div>
</div>

<details class="ix-collapse">
<summary>Deep Dive: Structuring RCA documents for agentic incidents</summary>
<div class="ix-collapse-body">
<p>A well-structured RCA for an agentic incident contains five sections:</p>
<p><strong>1. Incident summary</strong>: One paragraph. What failed, when, for how long, and what the impact was. Include: first alert timestamp, containment timestamp, total sessions affected, and whether any irreversible actions were taken.</p>
<p><strong>2. Timeline</strong>: A chronological list of events with timestamps, starting from the last known-good state before the incident. Include: deployments, configuration changes, trigger frequency changes, and the sequence of alerts and response actions. The session log provides the raw material; the RCA timeline synthesizes it.</p>
<p><strong>3. Root cause</strong>: A specific, falsifiable statement of what caused the failure. "The MCP server returned malformed JSON on inputs longer than 4096 tokens" is a root cause. "The system was not working correctly" is not. Cite the specific log event that demonstrates the root cause.</p>
<p><strong>4. Contributing factors</strong>: What made the failure worse than it needed to be, or made it harder to detect? Common contributing factors: no alerting on the specific failure mode, approval gate not covering the affected action, insufficient test coverage for the input class that triggered the failure.</p>
<p><strong>5. Remediation actions</strong>: What was done to fix the immediate problem (containment) and what will be done to prevent recurrence (prevention). Prevention actions should be specific and assigned to owners with due dates. "Improve monitoring" is not a prevention action. "Add an alert for MCP server responses with JSON parse errors, owner: @team-member, due: 2026-03-24" is a prevention action.</p>
</div>
</details>

---

## 12.5 Long-term Maintenance

<div class="ix-diagram" data-component="objective">
  <p>Apply the four-category maintenance cadence to keep production agentic systems aligned with a codebase as it evolves over time.</p>
</div>

Agentic systems are not write-once artifacts. The codebase they operate on evolves, the libraries they reference change, and the conventions they encode drift. Without a maintenance discipline, a system that works reliably at deployment degrades silently over months.

<p class="ix-instruct">Predict the first maintenance action before reviewing the full cadence.</p>

<div class="ix-diagram" data-component="predict-reveal" data-diagram-id="m12-maintenance-predict" data-xp="8">
<span class="ix-title">Predict: First Response to Drift</span>
<p class="ix-predict-prompt">Your quarterly check shows a formerly reliable pipeline now missing medium-severity findings. You have no recent incident alerts. What should be your first diagnostic step?</p>
<textarea class="ix-predict-input" aria-label="Your prediction" placeholder="Describe your first diagnostic action..."></textarea>
<details class="ix-predict-reveal">
<summary>Reveal reference reasoning</summary>
<p>Start with a controlled baseline replay: run the same known-good validation inputs used at deployment and compare current outputs to historical outputs. This isolates drift before changing prompts or infrastructure. Only after confirming where behavior diverged should you decide whether the cause is prompt changes, skill updates, model updates, or stack evolution.</p>
</details>
</div>

<p class="ix-instruct">Switch between tabs to review each maintenance topic and its action protocol.</p>

<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="m12-maintenance-tabs">
<span class="ix-title">Three Maintenance Topics</span>
<div data-tab="Skill Versioning">
<p><strong>Convention</strong>: Major.minor version numbers. Treat skills as APIs (Module 07 -- skills encode one solved problem per file).</p>
<p><strong>Major version increment</strong>: Changes that alter what code the skill generates -- changing the pattern, removing a pattern, changing an import convention. Any session loading the previous major version may produce different output. Document the breaking change explicitly in the skill frontmatter.</p>
<p><strong>Minor version increment</strong>: Additions, clarifications, or corrections that do not alter the generated patterns -- adding an example, fixing a typo, clarifying an ambiguity.</p>
<pre><code>---
name: go-error-handling
version: 2.0
applies_to: [Go 1.20+]
breaking_change: "Replaces fmt.Errorf wrapping with errors.Join for multi-error"
supersedes: go-error-handling@1.x
---</code></pre>
<p><strong>After a major version</strong>: Audit all active pipelines that load this skill. Verify the new pattern is compatible with the codebase those pipelines operate on.</p>
</div>
<div data-tab="Prompt Drift">
<p><strong>The problem</strong>: A PR review prompt written when the codebase used Express routes gives incorrect guidance after migration to tRPC. A documentation audit prompt written for <code>docs/</code> fails silently after docs are reorganized. Prompts degrade as codebases evolve -- this is not a failure, it is a maintenance reality.</p>
<p><strong>Four triggers for review</strong>:</p>
<ul>
<li><strong>Monthly</strong>: Review CLAUDE.md file paths and library versions against the current codebase</li>
<li><strong>At every major dependency upgrade</strong>: Review all skills and prompts referencing the upgraded dependency before the upgrade reaches production</li>
<li><strong>After any architectural decision</strong>: Any convention change -- adopting a new state management library, switching ORMs -- triggers immediate review of affected skills and prompts</li>
<li><strong>Quarterly</strong>: Run a representative sample of each active pipeline on known-good inputs and compare outputs to the baseline from initial validation</li>
</ul>
</div>
<div data-tab="Model Updates">
<p><strong>Before upgrading</strong>: Run the full regression test set (20-50 inputs with known-good outputs per pipeline) against the new model version before deploying to production.</p>
<p><strong>Behavioral comparison</strong>: Check format compliance (does the new model follow the output schema?), reasoning quality (same issues identified?), verbosity changes, and tool call patterns.</p>
<p><strong>Prompt adjustment vs version pinning</strong>: If outputs differ, prefer adjusting prompts to work better with the new model. Version pinning accumulates technical debt -- pinned versions become unsupported.</p>
<p><strong>Staged rollout</strong>: Deploy the model upgrade to staging first. Run the production trigger mechanism against staging for at least one week before rolling out to production. Monitor error rate and output quality throughout.</p>
</div>
</div>

<p class="ix-instruct">Click to expand each branch of the skill versioning decision tree.</p>

<div class="ix-diagram" data-component="decision-tree" data-diagram-id="m12-version-decision">
<span class="ix-title">Skill Version Decision: Major or Minor?</span>
<div class="ix-tree-node" data-level="0">
<div class="ix-node-question">Does this change alter what code the skill generates?</div>
</div>
<div class="ix-tree-branch" data-answer="yes">
<div class="ix-tree-node" data-level="1" data-phase="error">
<div class="ix-node-label">YES</div>
<div class="ix-node-body">Major version increment. Document <code>breaking_change</code> in frontmatter. Audit all active pipelines loading this skill. Update <code>supersedes</code> field.</div>
</div>
</div>
<div class="ix-tree-branch" data-answer="no">
<div class="ix-tree-node" data-level="1">
<div class="ix-node-question">Does this change add, clarify, or correct without changing generated patterns?</div>
</div>
<div class="ix-tree-branch" data-answer="yes">
<div class="ix-tree-node" data-level="2" data-phase="success">
<div class="ix-node-label">YES</div>
<div class="ix-node-body">Minor version increment. No pipeline audit needed. Update version number and add a changelog note in the skill file.</div>
</div>
</div>
<div class="ix-tree-branch" data-answer="no">
<div class="ix-tree-node" data-level="2" data-phase="neutral">
<div class="ix-node-label">NO</div>
<div class="ix-node-body">Not a valid skill change. Reconsider the scope -- are you trying to add a new skill or modify an unrelated skill? Each skill encodes one solved problem (Module 07 principle).</div>
</div>
</div>
</div>
</div>

<p class="ix-instruct">Step through the skill contribution workflow to understand how the skill library grows with discipline.</p>

<div class="ix-diagram" data-component="step-walkthrough" data-diagram-id="m12-skill-contribution">
<span class="ix-title">Skill Contribution Workflow</span>
<div class="ix-step">
<div class="ix-step-label">Step 1: Proposal</div>
<div class="ix-step-body">
<p>A team member identifies a pattern being repeated across multiple prompt sessions or specified inconsistently. They propose a skill: name, target pattern, version (starting at 1.0), and a draft file.</p>
<p><strong>Skills accumulate as institutional memory</strong>: each skill is one solved problem encoded once, inherited by every new team member and every new session that loads it.</p>
</div>
</div>
<div class="ix-step">
<div class="ix-step-label">Step 2: Review</div>
<div class="ix-step-body">
<p>A second engineer reviews the draft for accuracy (does it correctly encode the pattern?), coverage (does it cover the edge cases?), and format (correct version numbering, complete frontmatter?).</p>
<p>This is the same code review discipline applied to skills as to code.</p>
</div>
</div>
<div class="ix-step">
<div class="ix-step-label">Step 3: Test</div>
<div class="ix-step-body">
<p>Load the skill in a test session and use it to generate code. A domain expert reviews the generated output for correctness -- not whether it looks right, but whether it works correctly in the target context.</p>
</div>
</div>
<div class="ix-step">
<div class="ix-step-label">Step 4: Publish</div>
<div class="ix-step-body">
<p>Add the skill to the team's skill library (a designated directory in the project or shared repository). Update all team members' CLAUDE.md files and pipeline configurations that should load it.</p>
</div>
</div>
<div class="ix-step">
<div class="ix-step-label">Step 5: Maintain</div>
<div class="ix-step-body">
<p>The skill's creator is the default owner responsible for updating it when the underlying convention changes. Ownership can be transferred explicitly. A skill with no identified owner is flagged for review.</p>
<p><strong>Unmanaged skill libraries degrade</strong>: contradictory, outdated, and redundant context hurts agent performance. The contribution process exists to prevent this.</p>
</div>
</div>
</div>

<p class="ix-instruct">Click each stage to see what to review and what actions to take at that maintenance interval.</p>

<div class="ix-diagram" data-component="timeline" data-diagram-id="m12-maintenance-cadence">
<span class="ix-title">Maintenance Cadence</span>
<div class="ix-timeline-stage" data-phase="perceive">
<div class="ix-stage-label">Monthly</div>
<div class="ix-stage-body">
<p><strong>Review:</strong> CLAUDE.md file paths and library versions against the current codebase state</p>
<p><strong>Check:</strong> Are file paths still valid? Have library versions been updated? Are convention references still accurate?</p>
<p><strong>Action:</strong> Update any stale references. Run a spot-check session to verify the agent still demonstrates expected behavior.</p>
</div>
</div>
<div class="ix-timeline-stage" data-phase="reason">
<div class="ix-stage-label">At Major Dependency Upgrade</div>
<div class="ix-stage-body">
<p><strong>Review:</strong> All skills and prompts referencing the upgraded dependency, BEFORE the upgrade reaches production</p>
<p><strong>Check:</strong> Do skill patterns still apply to the new version? Are API signatures still correct? Are import paths still valid?</p>
<p><strong>Action:</strong> Update skills with a major or minor version increment as appropriate. Run the regression test set against the new dependency version.</p>
<p><strong>Spiral (M11):</strong> Each stack migration checklist item from Module 11 doubles as a maintenance trigger -- use the same Context7 validation approach.</p>
</div>
</div>
<div class="ix-timeline-stage" data-phase="act">
<div class="ix-stage-label">After Architectural Decision</div>
<div class="ix-stage-body">
<p><strong>Review:</strong> Any convention change -- new state management library, new ORM, new API design pattern -- triggers an immediate review of all affected skills and prompts</p>
<p><strong>Check:</strong> Which skill files encode patterns that the architectural decision changes? Which prompts reference the old approach?</p>
<p><strong>Action:</strong> Update skills with major version increment (architectural decisions usually cause breaking changes). Brief the team on the new skill versions before deploying pipelines that use them.</p>
</div>
</div>
<div class="ix-timeline-stage" data-phase="observe">
<div class="ix-stage-label">Quarterly</div>
<div class="ix-stage-body">
<p><strong>Review:</strong> Run a representative sample of each active pipeline on known-good inputs from the initial validation set</p>
<p><strong>Check:</strong> Have outputs drifted from the baseline? Is the agent still identifying the same issues in the same inputs? Are there new patterns of false positives or false negatives?</p>
<p><strong>Action:</strong> If drift is detected, identify whether it stems from prompt changes, skill changes, model updates, or codebase evolution. Remediate at the source, not by patching symptoms.</p>
</div>
</div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="core-idea">
<p><strong>Skills as institutional memory (Module 07)</strong>: Each skill encodes one solved problem. Skills accumulate across months. New team members inherit the team's collective knowledge by loading the skill library. When a team member leaves, their expertise does not leave -- it is encoded in the skill files they contributed. This is the compounding return of the skills system: each skill investment pays dividends for every future session that loads it.</p>
</div>

<div class="ix-diagram" data-component="callout" data-variant="tip">
<p><strong>Stack migration as maintenance trigger (Module 11)</strong>: Every stack migration checklist item from Module 11 doubles as a maintenance trigger. When you change your stack, run the full Module 11 adaptation process -- Context7 re-validation, stack CLAUDE.md review, TCEF prompt update. Do not treat stack adaptation as a one-time event; treat it as a recurring maintenance discipline triggered by every architectural decision.</p>
</div>

<p class="ix-instruct">Validate your maintenance decision-making before moving to course completion.</p>

<div class="ix-diagram" data-component="quiz" data-diagram-id="m12-maintenance-quiz" data-xp="16">
<span class="ix-title">Knowledge Check: Long-term Maintenance</span>
<div class="ix-quiz-question">
<p class="ix-quiz-prompt"><strong>Q1.</strong> Which change should trigger a major skill version bump?</p>
<div class="ix-quiz-options">
<button class="ix-quiz-option">Fixing a typo in an example comment</button>
<button class="ix-quiz-option" data-correct="true">Changing the generated error-handling pattern used by downstream services</button>
<button class="ix-quiz-option">Adding one explanatory sentence to a callout</button>
<button class="ix-quiz-option">Reordering checklist bullets without behavioral change</button>
</div>
<p class="ix-quiz-explanation">Major versions are for behavior-changing updates that can alter generated outputs or compatibility expectations in active pipelines.</p>
</div>
<div class="ix-quiz-question">
<p class="ix-quiz-prompt"><strong>Q2.</strong> A team updates model version and output style changes, but schema validity remains 100%. What is the right next action?</p>
<div class="ix-quiz-options">
<button class="ix-quiz-option">Rollback immediately because any change is a failure</button>
<button class="ix-quiz-option" data-correct="true">Run representative regression tasks and assess whether style changes affect operational decisions</button>
<button class="ix-quiz-option">Ignore it since schema validity passed</button>
<button class="ix-quiz-option">Increase token limits to restore old style</button>
</div>
<p class="ix-quiz-explanation">Format compliance alone is insufficient. You still need behavioral review to ensure decision quality and downstream usability remain acceptable.</p>
</div>
<div class="ix-quiz-question">
<p class="ix-quiz-prompt"><strong>Q3.</strong> When is retire-and-rebuild usually better than incremental refactor?</p>
<div class="ix-quiz-options">
<button class="ix-quiz-option">When one skill needs a minor update</button>
<button class="ix-quiz-option">When a quarterly check finds one false positive</button>
<button class="ix-quiz-option" data-correct="true">When multiple core pipeline components must change and original architecture no longer fits the task</button>
<button class="ix-quiz-option">When documentation is outdated by one version</button>
</div>
<p class="ix-quiz-explanation">If scope changes touch several core components and architectural assumptions no longer hold, rebuilding from design phases is safer than patching.</p>
</div>
<div class="ix-quiz-question">
<p class="ix-quiz-prompt"><strong>Q4.</strong> Which maintenance activity best protects new team members from inheriting stale patterns?</p>
<div class="ix-quiz-options">
<button class="ix-quiz-option">Rely on oral handoffs during onboarding</button>
<button class="ix-quiz-option">Keep deprecated skills but mark them “old” in comments</button>
<button class="ix-quiz-option" data-correct="true">Version skills, assign owners, and enforce scheduled review against current stack and outcomes</button>
<button class="ix-quiz-option">Reduce number of skills to avoid confusion, even if patterns are missing</button>
</div>
<p class="ix-quiz-explanation">Institutional memory only compounds when skills are owned, versioned, and audited against current reality.</p>
</div>
</div>

<details class="ix-collapse">
<summary>Deep Dive: When to retire an agentic system vs refactor it</summary>
<div class="ix-collapse-body">
<p>Not every agentic system improves with age. Some pipelines are worth refactoring as requirements evolve; others accumulate so much technical debt that rebuilding from scratch is faster than fixing. How do you know which you have?</p>
<p><strong>Signs a system is worth refactoring</strong>: The core task is still the same, the architecture (archetype, agent allocation) is still appropriate, and the degradation is localized to specific skills, prompts, or MCP integrations. Refactoring updates the components without changing the architecture.</p>
<p><strong>Signs a system should be retired and rebuilt</strong>: The core task has changed substantially (the original trigger, success criterion, or delivery path no longer applies), the architecture is no longer appropriate (a simple chain that has grown to 15 sequential steps is probably better as a conditional router or fan-out), or the blast radius has grown beyond what the original permission design can contain.</p>
<p><strong>The rebuild threshold</strong>: If fixing the system requires changing more than two of the five pipeline components (Trigger, Context Gathering, Decision Logic, Action Scope, Output Delivery), you are effectively rebuilding it. Run the full five design phases from scratch rather than patching the existing system. The new system will be safer and more maintainable than the patched one.</p>
<p><strong>Deprecation protocol</strong>: When retiring a pipeline, document the deprecation in the pipeline's CLAUDE.md and in the team's skill library. Identify which skills were created for the retired pipeline and evaluate whether they are reusable for other pipelines or should be archived. Remove the pipeline from CI/CD and monitoring configurations to eliminate noise from defunct alerts.</p>
</div>
</details>

---

## Further Reading

- [Claude Code Cost Management](https://docs.anthropic.com/en/docs/claude-code/costs)
- [Anthropic Token Counting](https://docs.anthropic.com/en/docs/build-with-claude/token-counting)
- [Claude Code Agent SDK Overview](https://docs.anthropic.com/en/docs/claude-code/sdk)
- [Standalone Diagram: Production Observability Companion](/examples/module-diagrams/m12-production-observability.html)

---

## 12.6 Course Completion

<div class="ix-diagram" data-component="objective">
  <p>Confirm mastery across all twelve modules and identify your next step as an Agentic AI Engineer.</p>
</div>

<div class="ix-diagram" data-component="callout" data-variant="core-idea">
<p><strong>You now have a complete mental model</strong>: The Agentic Loop (PRAO) is not a metaphor -- it is a repeatable engineering discipline. You know how to configure it, prompt it, observe it, secure it, and maintain it. You have the five pipeline components, the five design phases, the six-category deployment checklist, the incident response playbook, and the maintenance cadence. Every piece is yours to keep.</p>
</div>

<p class="ix-instruct">Work through the completion checklist to confirm your mastery of each prior module's core concept.</p>

<div class="ix-diagram" data-component="step-checklist" data-diagram-id="m12-completion-checklist">
<span class="ix-title">Course Completion Checklist -- Modules 01-11</span>
<div class="ix-checklist-section">
<div class="ix-checklist-section-title">Your Engineering Toolkit</div>
<label class="ix-checklist-item"><input type="checkbox"><span><strong>M01:</strong> I can describe the Agentic Loop (PRAO) -- Perceive, Reason, Act, Observe -- and identify where a stuck loop breaks down and where intervention is appropriate</span></label>
<label class="ix-checklist-item"><input type="checkbox"><span><strong>M02:</strong> I can write a <code>settings.json</code> with correct allow/deny permissions using the format <code>{"permissions": {"allow": [...], "deny": [...]}}</code> and a working CLAUDE.md that is read at session start</span></label>
<label class="ix-checklist-item"><input type="checkbox"><span><strong>M03:</strong> I can read an agent trace and identify healthy loops, stuck loops, and the correct intervention signal -- and I know when to hold vs intervene</span></label>
<label class="ix-checklist-item"><input type="checkbox"><span><strong>M04:</strong> I can write a TCEF prompt with precision verbs in the Task, grounding Context from CLAUDE.md and skills, concrete domain-specific Examples, and a constrained machine-readable Format</span></label>
<label class="ix-checklist-item"><input type="checkbox"><span><strong>M05:</strong> I understand MCP architecture -- exactly three primitives (Tools, Resources, Prompts), transport choices, and capability discovery at session start</span></label>
<label class="ix-checklist-item"><input type="checkbox"><span><strong>M06:</strong> I can design and implement MCP servers with correct primitive selection, tool schemas Claude can use reliably, and structured <code>isError</code> handling for recoverable failures</span></label>
<label class="ix-checklist-item"><input type="checkbox"><span><strong>M07:</strong> I can create skill files, load them in CLAUDE.md, build a reusable skill library, and distinguish LUXOR conventions (like <code>triggers</code>) from native Claude Code features</span></label>
<label class="ix-checklist-item"><input type="checkbox"><span><strong>M08:</strong> I can use meta-prompting to generate, evaluate, and improve prompts, and I know when direct prompting is the safer or faster choice</span></label>
<label class="ix-checklist-item"><input type="checkbox"><span><strong>M09:</strong> I can apply the four-question decision framework to choose between single-agent and multi-agent architectures, and I default to single-agent until I can justify multi-agent with clear evidence</span></label>
<label class="ix-checklist-item"><input type="checkbox"><span><strong>M10:</strong> I can configure permission boundaries with the principle of least privilege, manage secrets correctly (environment variables only, never in CLAUDE.md), and design approval gates for irreversible actions</span></label>
<label class="ix-checklist-item"><input type="checkbox"><span><strong>M11:</strong> I can adapt any agentic system to a specific tech stack using Context7 for documentation pre-loading and a stack-specific CLAUDE.md encoding team conventions</span></label>
</div>
</div>

<p class="ix-instruct">Click each concept to reveal which module introduced it.</p>

<div class="ix-diagram" data-component="reveal-quiz" data-diagram-id="m12-concept-map">
<span class="ix-title">Concept to Module Map -- Click to Reveal</span>
<div class="ix-reveal-item">
<div class="ix-reveal-label">Perceive → Reason → Act → Observe</div>
<div class="ix-reveal-answer" data-phase="perceive">Module 01 -- the Agentic Loop (PRAO) is the foundational model for all agentic reasoning</div>
</div>
<div class="ix-reveal-item">
<div class="ix-reveal-label"><code>settings.json</code> allow/deny permissions</div>
<div class="ix-reveal-answer" data-phase="act">Module 02 -- the permissions model and CLAUDE.md system, foundations of Claude Code configuration</div>
</div>
<div class="ix-reveal-item">
<div class="ix-reveal-label">Trace reading and intervention signals</div>
<div class="ix-reveal-answer" data-phase="reason">Module 03 -- reading agent traces, identifying stuck loops, and knowing when to hold vs intervene</div>
</div>
<div class="ix-reveal-item">
<div class="ix-reveal-label">TCEF framework (Task, Context, Examples, Format)</div>
<div class="ix-reveal-answer" data-phase="reason">Module 04 -- the structured prompting framework for production-grade agent prompts</div>
</div>
<div class="ix-reveal-item">
<div class="ix-reveal-label">Tools, Resources, Prompts (THREE primitives -- not four)</div>
<div class="ix-reveal-answer" data-phase="act">Module 05 -- MCP architecture introduces the three primitives, and Module 06 turns them into concrete server implementations</div>
</div>
<div class="ix-reveal-item">
<div class="ix-reveal-label"><code>isError</code> pattern in MCP tool responses</div>
<div class="ix-reveal-answer" data-phase="observe">Module 06 -- building MCP servers, including how recoverable tool failures return <code>isError: true</code> instead of crashing the server</div>
</div>
<div class="ix-reveal-item">
<div class="ix-reveal-label"><code>triggers</code> is a LUXOR convention, not native Claude Code</div>
<div class="ix-reveal-answer" data-phase="neutral">Module 07 -- the skills system and the distinction between LUXOR project conventions and native Claude Code features</div>
</div>
<div class="ix-reveal-item">
<div class="ix-reveal-label">Evaluation is more valuable than generation</div>
<div class="ix-reveal-answer" data-phase="reason">Module 08 -- meta-prompting patterns, where the insight is that judging outputs critically often creates more value than generating new ones</div>
</div>
<div class="ix-reveal-item">
<div class="ix-reveal-label">Start single-agent; justify multi-agent explicitly</div>
<div class="ix-reveal-answer" data-phase="act">Module 09 -- multi-agent systems and the four-question decision framework that defaults to single-agent</div>
</div>
<div class="ix-reveal-item">
<div class="ix-reveal-label">Principle of least privilege in permissions</div>
<div class="ix-reveal-answer" data-phase="error">Module 10 -- security architecture, approval gates, secrets management, and prompt injection defense</div>
</div>
<div class="ix-reveal-item">
<div class="ix-reveal-label">Context7 for stack-specific documentation pre-loading</div>
<div class="ix-reveal-answer" data-phase="neutral">Module 11 -- adapting agentic patterns to specific tech stacks using documentation as grounding context</div>
</div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="tip">
<p><strong>Your next step</strong>: Pick one production task you do manually today. Apply the five design phases from Section 12.2. Scope it (trigger, success criterion, delivery path). Choose your archetype (start with simple chain). Write the TCEF prompt. Configure the permissions. Define the observability. Ship it. The first pipeline you ship in production teaches you more than any module can -- and now you have the complete framework to do it safely.</p>
</div>

---

[Previous Module -- Module 11](/module/11)
[Back To Dashboard](/)
