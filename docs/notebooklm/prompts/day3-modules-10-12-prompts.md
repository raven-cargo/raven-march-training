# Day 3 Module Multimedia Prompts

> **Usage**: Pass the text under each heading verbatim as the `focus_prompt` parameter to
> `video_overview_create` or `slide_deck_create` in NotebookLM. These prompts are designed
> to be module-specific: swapping one into a neighboring module's slot will immediately
> produce mismatched content.

---

## Module 10: Security and Sandboxing

### Video Focus Prompt

Focus EXCLUSIVELY on Module 10: Security and Sandboxing. Do NOT cover inter-agent JSON communication, orchestrator routing patterns, or any topic from the multi-agent module that preceded this one.

This video covers four concepts that are unique to Module 10 and appear nowhere else in the course:

**1. The `settings.json` allow/deny permission model — with exact syntax.**
The permission configuration format is `{"permissions": {"allow": [...], "deny": [...]}}`. Every item in the `deny` list overrides any matching item in the `allow` list — there are no exceptions to deny-overrides-allow. Show the audience the three concrete profiles from the module (development, read-only analysis, CI/CD pipeline) side-by-side on the whiteboard. Emphasize that glob patterns control file-system access and command strings control bash execution. Draw this as a flowchart: tool request → check deny list → if match: BLOCKED, no prompt → check allow list → if match: PERMITTED, no prompt → else: require human approval.

**2. The three agentic threat categories: scope creep, secret exposure, prompt injection.**
These are not generic application security concepts — they are specific to systems that make autonomous decisions, read untrusted content, and hold credentials across multiple configuration locations. Spend roughly equal time on each. For scope creep, contrast it with a traditional misconfiguration bug: in a traditional app, a misconfiguration produces the same wrong behavior every run; in an agentic system, scope creep produces intermittent, amplified damage because the agent's autonomous reasoning amplifies the unauthorized access differently on each run.

**3. The trust hierarchy: CLAUDE.md > operator prompt > content being processed.**
CLAUDE.md is read once at session start — it is a configuration file, not a command the operator invokes during a session. Tier 3 (content being processed) has zero instruction authority: files the agent reads, web pages it fetches, database records it queries. Draw the trust pyramid on the whiteboard with three labeled tiers, explicitly noting that anything in a file the agent is analyzing belongs at Tier 3 regardless of whether it uses imperative language.

**4. The "show me the plan" approval gate with plan-hash audit trail.**
The approval gate is a two-phase CLAUDE.md instruction: Phase 1 produces a numbered action plan listing each action, what it affects, and whether it is reversible — then STOPS. Phase 2 begins only after the operator sends "Approved, proceed." The audit trail must capture: session ID, timestamp of plan presentation, SHA-256 hash of the plan text, identity of the approver, execution timestamp, and a `deviation_from_plan` field. A non-null deviation field is a mandatory human-review trigger. Draw the audit record JSON structure on the whiteboard.

**Two whiteboard diagrams to draw during the video:**

Diagram 1 — The permission evaluation flowchart: Start with a tool request box. Arrow to "In deny list?" diamond. Yes → BLOCKED (red box, no execution, no prompt). No → arrow to "In allow list?" diamond. Yes → PERMITTED (green box, executes immediately). No → arrow to "Prompt user" (yellow box). User approves → execute. User denies → cancel. Label the `settings.json` as the source evaluated at every tool call.

Diagram 2 — The prompt injection threat model: Draw three concentric zones. Outer zone: "Content processed" (files, web pages, API responses) — labeled "Data only, zero instruction authority." Middle zone: "Operator prompts" — labeled "Session instructions." Inner zone: "CLAUDE.md + system config" — labeled "Canonical behavioral directives." Show an attacker's injection attempt hitting the outer zone and being blocked from propagating inward.

**Duration guidance:** 15–22 minutes. Allocate approximately 4 minutes to the permission model and its three configuration profiles, 5 minutes to the three threat categories, 5 minutes to the trust hierarchy and prompt injection defenses, and 4 minutes to approval gates and the audit trail.

**Explicit exclusion:** Do NOT discuss Context7, CLAUDE.md stack encoding for tech stacks, organizational deployment checklists, or production pipeline archetypes. Those are Module 11 and 12 content. This module covers security primitives and enforcement mechanisms only.

---

### Slide Deck Focus Prompt

Focus EXCLUSIVELY on Module 10: Security and Sandboxing. Every slide must present security concepts specific to agentic AI systems — not general application security, and not multi-agent architecture.

**Target: 14–16 slides.**

**Slide 1 — Opening hook: "What's new about agentic security?"**
Headline: "Traditional security protects code paths. Agentic security must protect autonomous decisions." Present three bullet points that contrast traditional application security (deterministic code paths, network interface attack surface, detectable misconfiguration) with agentic security (autonomous reasoning amplifies mistakes, attack surface includes content the agent reads, non-deterministic sessions make incident reconstruction hard). This slide must frame why the audience can't just reuse their existing security mental model.

**Slide 2 — The three threat categories (overview).**
Three boxes in a row: Scope Creep | Secret Exposure | Prompt Injection. One-sentence definition for each. Visual indicator showing which part of the system each threat targets: permissions layer, configuration files, content processing layer respectively.

**Slide 3 — Scope creep deep dive.**
Explain why autonomous decision-making amplifies scope violations: an agent with overly broad write permissions won't always overwrite unintended files, making the issue intermittent. The fix is the principle of least privilege: give the agent exactly the file access and commands its task requires, nothing more. One concrete example: an agent authorized to write to `src/` cannot overwrite `infrastructure/terraform/` regardless of its reasoning.

**Slide 4 — The `settings.json` permission model (exact syntax).**
Show the structure: `{"permissions": {"allow": [...], "deny": [...]}}`. Two-column layout: allow list controls what is permitted without prompting; deny list overrides the allow list unconditionally. Rule: deny always wins. No exceptions. Present the evaluation order as three steps: check deny → check allow → require user approval.

**Slide 5 — Permission profiles: three production configurations.**
Three code blocks (or three callout boxes) showing the development, read-only analysis, and CI/CD pipeline configurations from the module. Label the key design decisions: why the read-only analysis config denies `Write(**)` explicitly rather than simply omitting it from the allow list (explicit denials produce clear rejection messages and prevent accidental allow-list additions from granting write access).

**Slide 6 — Global vs. project `settings.json` layering.**
Diagram showing `~/.claude/settings.json` (global baseline) and `.claude/settings.json` (project-level extension or restriction). Emphasize: global rules apply to every project. Project-level denies can further restrict what global allows permit. Use cases: a CI project that needs `kubectl` access (project allow) vs. a read-only audit project that strips write access from the global baseline (project deny).

**Slide 7 — Secrets management: the three anti-patterns.**
Three red-bordered code boxes showing exactly what NOT to do: API key in a prompt string, API key hardcoded in CLAUDE.md, API key inline in MCP server configuration JSON. For each, state why it creates exposure: prompt content can appear in logs, CLAUDE.md is committed to version control, MCP config files live in `.claude/` and are often checked in.

**Slide 8 — Secrets management: the correct pattern.**
Three green-bordered code boxes showing the correct versions: environment variable export in shell/CI, CLAUDE.md referencing credentials by name only (`PAYMENTS_API_KEY` environment variable), MCP config using `${PAYMENTS_API_KEY}` substitution syntax. Include the `.env.example` protocol: committed to version control with placeholder values, never with real values. `.env` always in `.gitignore`.

**Slide 9 — Prompt injection: what it looks like in agentic contexts.**
Show the two concrete examples from the module: (1) instruction text embedded in a Python file comment that directs the agent to email source code to an external address, (2) a `<div style="display:none">` block in a fetched web page instructing the agent to output SSH keys. These are data-embedded attacks, not user-input attacks. Agentic systems are uniquely exposed because content-reading is their normal operation.

**Slide 10 — The trust hierarchy diagram.**
Three-tier pyramid: Tier 1 (top, highest trust) = CLAUDE.md and system configuration. Tier 2 = operator-provided session prompts. Tier 3 (base, zero instruction authority) = files, web pages, database records, API responses. Key rule: instruction-like text appearing in Tier 3 content is data, not instruction. Show the CLAUDE.md content trust policy block that makes this explicit in configuration.

**Slide 11 — Prompt injection defenses.**
Four structural patterns: (1) Scope validation before action — verify the action was authorized in original instructions, not derived from content. (2) Output validation — flag agent outputs that cite data sources as the reason for an action. (3) MCP tool scoping — analysis agents don't need email-sending tools; removing tools eliminates injection vectors. (4) Sandboxed web fetch — restrict fetch tools to an approved domain allowlist.

**Slide 12 — Approval gates: when they are mandatory.**
Four categories: irreversible actions (deletes without backup, sent emails, published content), public-facing changes (production deploys, merges to main), production database operations (any write including schema changes), changes at scale (more than 5 files affected). These are non-negotiable categories, not guidelines.

**Slide 13 — The "show me the plan" pattern.**
Two-phase protocol from CLAUDE.md: Phase 1 = produce numbered action list (action, affected files/services, reversibility status), then STOP and wait. Phase 2 = begin only after "Approved, proceed." Show a sample plan output with three actions, each labeled reversible or irreversible. Emphasize that this requires no infrastructure — the CLAUDE.md instruction alone implements the gate.

**Slide 14 — The audit trail JSON.**
Show the full `audit_record` JSON structure: `session_id`, `plan_presented_at`, `plan_hash` (SHA-256), `plan_summary`, `approved_by`, `approved_at`, `approval_channel`, `execution_completed_at`, `deviation_from_plan`. Call out `deviation_from_plan` as the field that triggers mandatory human review when non-null.

**Slide 15 — Do/Don't summary.**
Two columns. Do: least privilege permissions, environment variables for credentials, explicit trust hierarchy in CLAUDE.md, approval gates for all irreversible actions, audit trails with plan hashes. Don't: credentials in prompts or CLAUDE.md, tools agents don't need, instruction authority for processed content, approval without audit records.

**Slide 16 — Lab preview: Production-grade security profile.**
Brief description of Lab 10: configuring `settings.json` for a financial services analysis agent (read-only audit scope, write to output directory only, no network commands), implementing the CLAUDE.md approval gate for human escalation, and verifying permission denials behave as configured.

---

## Module 11: Tech Stack Adaptation

### Video Focus Prompt

Focus EXCLUSIVELY on Module 11: Tech Stack Adaptation. Do NOT cover the `settings.json` permission model, prompt injection, approval gates, or secrets management — those are Module 10 content. Do NOT cover production observability, alerting thresholds, or pipeline archetypes — those are Module 12 content.

This video covers four concepts unique to Module 11:

**1. Context7 as an MCP server for live documentation fetching.**
Context7 is not a search tool — it is an MCP server that pre-loads current documentation into the session context, solving the training data cutoff problem for rapidly evolving frameworks. The workflow has exactly three steps: (a) call `resolve-library-id` with the library name to get its canonical Context7 identifier, (b) call `query-docs` with the library ID and a specific topic, (c) Claude Code uses the returned documentation during the session. Show the whiteboard diagram of this three-step flow. The key insight: Context7 fetches from current official sources, not from training data frozen at a cutoff date. Name the library categories that benefit most: Next.js (Pages Router → App Router), React (class components → hooks → Server Components), Pydantic (v1 → v2), SQLAlchemy (1.x → 2.x async patterns). Name the categories that benefit least: stable standard libraries, command-line tools, languages with slow API evolution.

**2. CLAUDE.md stack encoding — five required categories.**
CLAUDE.md in the tech stack adaptation context is not about security policies (that was Module 10). It is about encoding organizational knowledge the agent cannot infer from the codebase alone. The five required categories are: (a) exact framework version numbers with implications ("Next.js 15.x — App Router is default, Pages Router is not used"), (b) architectural patterns (which directories contain which layer of code, how data flows), (c) naming conventions (file names, function names, database columns, CSS classes), (d) code generation rules (explicit do/don't directives for this codebase), (e) key files and decisions (main schema file, routing config, auth middleware, shared types). Walk through at least two of the five stack examples from the module — Next.js 15 and one other — showing how the same five categories apply differently to each stack.

**3. Stack-specific TCEF prompt instantiation.**
The TCEF structure (Task, Context, Examples, Format) from earlier in the course requires stack-specific instantiation at the Examples and Format components to be effective. Show the contrast: a generic TCEF example block for "add input validation" vs. a FastAPI + Pydantic v2 example block. The stack-specific version encodes the convention — `ConfigDict`, `Annotated`, `Field`, `model_validator` — as a concrete before/after code block that functions as a specification, not just an illustration. Draw on the whiteboard: generic TCEF example → leaves room for wrong-version patterns; stack-specific example → eliminates entire classes of wrong answers by showing the exact syntax expected.

**4. The organizational deployment checklist — six verification categories.**
This checklist is run before any agentic workflow goes into production. The six categories are: CLAUDE.md completeness audit, permission configuration review (references Module 10's settings.json but the focus here is on workflow-specific scope), secrets management audit, MCP server verification (including: SSE transport is deprecated as of 2025-03-26 — Streamable HTTP is the only valid remote transport), skill library verification, observability verification. The checklist is most effective as a two-person exercise: one person built the workflow, the second reviews and asks questions; every item must be demonstrated from configuration files, not from memory.

**Two whiteboard diagrams to draw during the video:**

Diagram 1 — Context7 three-step pre-load flow: Box labeled "Library Name (e.g., 'next.js')" → arrow labeled "resolve-library-id" → Box labeled "Context7 Library ID (/vercel/next.js)" → arrow labeled "query-docs + topic" → Box labeled "Current Documentation (fetched live)" → arrow → Box labeled "Claude Code session context." Add a contrasting dashed line from "Training data (cutoff date)" showing what the model would use without Context7. Label the gap between the cutoff and today as "the stale zone."

Diagram 2 — CLAUDE.md five-category structure: Draw a table with five rows labeled: Versions | Architecture | Naming | Rules | Key Files. For each row, show one cell with a generic placeholder and one cell with a concrete Next.js 15 example. The visual point: the five categories are universal; the content in each row is stack-specific.

**Duration guidance:** 15–22 minutes. Allocate approximately 5 minutes to the documentation currency problem and Context7, 6 minutes to CLAUDE.md stack encoding (walking through two stacks), 4 minutes to stack-specific TCEF and skill files, and 4 minutes to the organizational deployment checklist.

**Explicit exclusion:** Do NOT discuss the `settings.json` permission evaluation flowchart, the three agentic threat categories (scope creep, secret exposure, prompt injection), approval gates, or plan-hash audit trails. Those belong entirely in Module 10. Do NOT discuss production pipeline archetypes, structured JSON event logging schemas, alerting thresholds, or incident response playbooks — those are Module 12.

---

### Slide Deck Focus Prompt

Focus EXCLUSIVELY on Module 11: Tech Stack Adaptation. Every slide must address the gap between how agentic systems perform in course lab environments and how they perform in specific organizational technology stacks. No slide should cover permission configuration, secrets management, or production observability — those are covered in Modules 10 and 12.

**Target: 14–16 slides.**

**Slide 1 — Opening hook: "Demos work. Deployments struggle. Here's why."**
Headline: "An agent that doesn't know your team uses Zod instead of class-validator will produce technically correct, organizationally wrong code — on every interaction." Frame the adaptation problem: lab environments are designed to match agent capabilities; organizational deployments have invisible conventions, framework versions the model's training data may predate, and context only accessible through accumulated team decisions.

**Slide 2 — The adaptation problem: three root causes.**
Three-column layout: (1) Documentation currency — model training has a cutoff date; rapidly evolving frameworks may have breaking changes the model learned before the change. (2) Convention encoding — team decisions about naming, patterns, and approved libraries live in institutional memory, not in a form the agent can discover from the codebase. (3) Context grounding — which layer of the architecture is this code in? What are the contracts it must preserve? The agent doesn't know unless told.

**Slide 3 — The cost of not adapting.**
Not catastrophic failure — the agent will still generate code that compiles. The cost is friction: every output requires convention review, every suggestion requires architectural context-checking, every code generation produces a draft rather than a deliverable. The agent becomes a slightly smarter autocomplete. Contrast with a well-adapted agent: outputs that match team conventions on first generation, reducing review burden from every session to occasional spot-checks.

**Slide 4 — Context7: solving the documentation currency problem.**
What Context7 is: an MCP server that fetches current documentation from official sources on demand, making it available in the session context. What it solves: the gap between the model's training data cutoff and the framework version your project actually runs. Key phrase: "Context7 gives the model documentation that matches the version you're using, not the version that was current when the model was trained."

**Slide 5 — Context7 three-step workflow.**
Step 1: `resolve-library-id` — pass the library name, receive the canonical Context7 library identifier. Step 2: `query-docs` — pass the library ID and a specific topic, receive current documentation. Step 3: Claude Code uses the fetched documentation during the session. Show the three steps as a sequential flow diagram. Include one concrete example: resolving `next.js` → `/vercel/next.js`, then fetching documentation for "App Router Server Components and data fetching patterns."

**Slide 6 — Which libraries benefit most from Context7 pre-loading.**
Two-column table: "High benefit" vs. "Low benefit." High benefit column: Next.js (major architectural shift Pages Router → App Router), React (class components → hooks → Server Components), Pydantic (v1 → v2 migration, breaking syntax changes), SQLAlchemy (1.x → 2.x async patterns). Low benefit column: Python standard library, Java core libraries, Unix command-line tools, languages/frameworks with slow API evolution. Decision rule: if the library had a breaking major version change after your model's training cutoff, pre-load it.

**Slide 7 — CLAUDE.md five-category structure for stack encoding.**
Introduce the five categories that a stack-specific CLAUDE.md must cover: (1) Framework versions — exact version numbers with implications, not just library names. (2) Architectural patterns — directory structure, data flow, layering rules. (3) Naming conventions — file names, function names, database columns. (4) Code generation rules — explicit do/don't directives for this codebase. (5) Key files and decisions — main schema, routing config, auth middleware, shared types. These five categories apply universally; the content in each is stack-specific.

**Slide 8 — Stack example: Next.js 15 + TypeScript CLAUDE.md.**
Show the Next.js 15 CLAUDE.md excerpt from the module. Highlight the code generation rules section: "NEVER use `getServerSideProps` or `getStaticProps` — these are Pages Router APIs," "NEVER fetch data in Client Components using useEffect," "Use Zod for ALL runtime validation, not class-validator or joi." Emphasize: the "don't" rules are often more valuable than the "do" rules because they eliminate wrong-version patterns by name.

**Slide 9 — Stack example: a second stack (FastAPI + Pydantic v2 or Go).**
Show the equivalent CLAUDE.md excerpt for a second stack from the module. Highlight how the five-category structure produces entirely different content for a different technology. For FastAPI: "ALWAYS use `model_validator` and `field_validator` (Pydantic v2), NOT `@validator`," "ALWAYS use `model_config = ConfigDict(...)`, NOT `class Config:`." The structure is identical; the conventions are stack-specific. This slide demonstrates the transferability of the approach.

**Slide 10 — Stack-specific TCEF: the Examples component.**
Show the contrast: generic TCEF example block ("add validation to a function that accepts user input") vs. the FastAPI + Pydantic v2 example block from the module (before/after code showing exact v2 syntax with `ConfigDict`, `Annotated`, `Field`, `model_validator`). Key point: the concrete code example is more than illustration — it is a specification that eliminates all v1-era alternatives. The agent cannot suggest `@validator` or `class Config:` after seeing a v2-style example.

**Slide 11 — Stack-specific skill files.**
Skill files encode team-specific patterns at a level of detail unwieldy in CLAUDE.md. Show the Go error handling skill from the module: YAML frontmatter with `name`, `version`, `applies_to`, then the pattern specification with service-layer error wrapping, sentinel errors, and handler-layer conversion. Loading this skill ensures every function the agent writes follows the team's exact error convention without repeating it in every prompt. Skill files are reusable context documents, not slash commands.

**Slide 12 — The organizational deployment checklist overview.**
Six verification categories shown as a checklist: (1) CLAUDE.md completeness audit, (2) Permission configuration review, (3) Secrets management audit, (4) MCP server verification, (5) Skill library verification, (6) Observability verification. One key requirement that belongs exclusively in this module: MCP server transport — "SSE transport is deprecated as of 2025-03-26. Remote MCP servers must use Streamable HTTP. Verify no SSE configuration remains."

**Slide 13 — Checklist execution: two-person review protocol.**
The checklist is most effective when the developer who built the workflow and a second engineer who will maintain it review it together. The reviewer asks questions; the developer answers by pointing to configuration files, not from memory. Any item that cannot be demonstrated from configuration is incomplete. This review doubles as knowledge transfer: after the review, the second engineer can maintain the workflow when the original developer is unavailable.

**Slide 14 — Stack prep script: repeatable session initialization.**
Show the `prep-agent-session.sh` pattern from the module. Purpose: a shareable, repeatable script that generates the Context7 pre-load instructions specific to the team's stack. It documents which library versions the team is targeting and ensures every team member starts sessions with the same documentation pre-loaded. This script belongs in version control alongside the project it serves.

**Slide 15 — Do/Don't summary.**
Do: use Context7 for libraries with breaking major version changes before they reach the model's training cutoff; state exact version numbers in CLAUDE.md (not just library names); write explicit "don't" rules in CLAUDE.md for banned patterns by name; write stack-specific skill files for repeated patterns; run the deployment checklist with a second engineer. Don't: assume the model knows your team's conventions (if it's not in CLAUDE.md, assume the agent doesn't know it); put generic programming advice in CLAUDE.md ("write clean code" wastes space that should encode organizational decisions); skip Context7 pre-loading then attribute wrong-version suggestions to the agent.

**Slide 16 — Lab preview: Stack Adaptation Sprint.**
Brief description of Lab 11: choose one of the five tech stacks covered in the module, write the CLAUDE.md for that stack (all five categories), configure Context7 pre-loading for the most version-sensitive libraries, write one domain-specific skill encoding a key team pattern, run the organizational deployment checklist against the configuration, and complete a peer review of CLAUDE.md completeness with a lab partner.

---

## Module 12: Capstone and Production

### Video Focus Prompt

Focus EXCLUSIVELY on Module 12: Capstone and Production Deployment. Do NOT revisit the `settings.json` permission flowchart in detail, the Context7 pre-loading workflow, or multi-agent orchestration patterns — those were covered in Modules 10, 11, and 09 respectively. This module integrates all prior concepts into a production-ready design process and then extends into observability and maintenance topics that appear nowhere else in the course.

This video covers five concepts unique to Module 12:

**1. The five fixed pipeline archetypes.**
There are exactly five archetypes: PR Review Pipeline, Documentation Sync, Incident Triage, Onboarding Assistant, Data Quality Monitor. These are not examples — they are the canonical organizational use-case patterns that cover the majority of agentic pipeline deployments. For each, state: trigger mechanism, context gathering method, decision logic approach, output delivery destination, and action scope. The presenter should draw all five on the whiteboard as a reference table with trigger / context / output columns. Emphasize: the goal is not to pick the "right" archetype and copy it verbatim — it is to recognize which archetype your problem maps to and adapt its structure.

**2. The five-phase capstone design process.**
Phase 1: Problem scoping (trigger specification, measurable success definition, beneficiary chain). Phase 2: Pipeline architecture (component diagram, agent allocation decision referencing Module 09 criteria, interface specifications). Phase 3: Prompt and skill design (full TCEF prompt, skill identification, output schema). Phase 4: Safety and production design (permission audit, secrets audit, approval gate placement, blast radius analysis). Phase 5: Observability design (session ID schema, events to log, alert thresholds, session retrieval procedure). The key message: skipping Phase 1 produces systems that solve the wrong problem; skipping Phase 5 produces systems that cannot be debugged when they fail in production.

**3. Structured JSON event logging — eight event types.**
Every event in an agentic session is logged as a separate structured JSON record. The eight event types are fixed: `session_start`, `tool_call`, `agent_dispatch`, `agent_result`, `approval_gate`, `approval_granted`, `session_end`, `error`. Draw the minimum-required JSON structure on the whiteboard: `timestamp`, `session_id`, `pipeline`, `event_type`, `tool`, `tool_input`, `tool_output_summary`, `tokens_consumed`, `duration_ms`, `error`. The `session_id` field is the trace correlation key: it appears in every event, enabling retrieval of the complete execution sequence for any session. In multi-agent systems, each sub-agent also carries the parent `session_id` and its own `agent_id`.

**4. Alerting thresholds — four specific metrics with starting values.**
Error rate: alert when sessions ending with `"status": "error"` exceeds 5% over a one-hour window. Timeout rate: alert when sessions or tool calls ending in timeout exceeds 10%. Cost spike: alert when daily token consumption exceeds 150% of the rolling 7-day average. Session duration spike: alert when median session duration exceeds 200% of the rolling 7-day median. These four thresholds are starting points, not universal laws — the presenter should explain what each threshold is designed to detect (systematic failures, scope-too-large problems, prompt context explosions, reasoning loops) so the audience can calibrate thresholds for their specific pipelines.

**5. Maintenance framework: skill versioning (major.minor), prompt drift, model update testing.**
Skills use major.minor version numbering: major version increment = breaking change (the generated code pattern changes); minor version increment = non-breaking addition or clarification. Skill frontmatter must include `breaking_change` and `supersedes` fields on major version changes. Prompt drift is addressed through a tiered maintenance cadence: monthly CLAUDE.md review, review at every major dependency upgrade, review after any architectural decision, quarterly regression test run. Model updates require a structured compatibility test: run the regression test set (20-50 known-good inputs), compare format compliance, reasoning quality, verbosity, and tool call patterns, then either adjust prompts or stage the rollout — with the staged rollout running in a staging environment for at least one week before production deployment.

**Two whiteboard diagrams to draw during the video:**

Diagram 1 — The five pipeline archetypes reference table: Five rows, one per archetype. Three columns: Trigger | Context gathered | Output delivered. PR Review: pull request event | changed files + PR description + CLAUDE.md | PR comment. Documentation Sync: merge to main | changed source files + existing docs | documentation-update PR. Incident Triage: PagerDuty alert / error spike | error logs + deployment history + runbooks | Slack channel message + incident record. Onboarding Assistant: new developer / on-demand | CLAUDE.md + architecture docs + recent git history | personalized onboarding guide. Data Quality Monitor: daily/weekly schedule | database table samples | structured report + issues for findings above threshold.

Diagram 2 — The structured log event timeline: A horizontal timeline for one agent session. Mark events as vertical tick marks: session_start → tool_call (read file) → tool_call (bash lint) → tool_call (read file) → approval_gate → approval_granted → tool_call (write output) → session_end. Show each tick mark accompanied by a small JSON record icon. The visual point: observability is captured as discrete events during the session, not reconstructed afterward.

**Duration guidance:** 15–22 minutes. Allocate approximately 5 minutes to the five pipeline archetypes and the five-phase design process overview, 4 minutes to the observability design (structured logging and trace correlation), 4 minutes to alerting thresholds and the incident response playbook, and 5 minutes to the maintenance framework (skill versioning, prompt drift, model update testing, skill library contribution process).

**Explicit exclusion:** Do NOT cover the `settings.json` allow/deny evaluation logic, the three agentic threat categories (scope creep, secret exposure, prompt injection), or the Context7 three-step pre-loading workflow — those are fully covered in Modules 10 and 11. This module assumes the audience has those concepts and focuses exclusively on integration, observability, and long-term maintenance.

---

### Slide Deck Focus Prompt

Focus EXCLUSIVELY on Module 12: Capstone and Production Deployment. Every slide must address production system design, observability, or long-term maintenance of agentic pipelines. Do not re-teach permission configuration, secrets management, or Context7 — reference them by name as prerequisites and move on.

**Target: 15–18 slides.**

**Slide 1 — Opening hook: "The course is over. Now comes the hard part."**
Headline: "A system with brilliant prompting but no observability design is impossible to debug when it fails. A system with perfect permissions but no maintenance plan degrades within months." Frame Module 12 as the integration and production layer: all prior concepts compose into a pipeline, and the pipeline is only as robust as its weakest component and its least-designed connection between components.

**Slide 2 — The integrated pipeline view: eight components that must all be present.**
Eight components listed: PRAO (reasoning cycle), TCEF (prompt structure), MCP servers (Act phase tools), Skills (pre-loaded organizational context), Multi-agent patterns (when applicable), Permission configuration (scope boundaries), Secrets management (credential safety), Stack adaptation (organizational conventions). Key message: "No production agentic system succeeds by implementing some of these and ignoring others." Present this as a chain — any broken link degrades the whole.

**Slide 3 — The five required pipeline components (design decisions, not features).**
Five components every pipeline must design explicitly: (1) Trigger — human-initiated, event-triggered, schedule-triggered, or threshold-triggered. (2) Context gathering — which resources the agent reads before reasoning and in what order. (3) Decision logic — the TCEF prompt that guides reasoning. (4) Action scope — what actions are permitted (design question) and allowed (security question). (5) Output delivery — how results reach the audience (PR comment, Slack message, file write, etc.).

**Slide 4 — The five pipeline archetypes.**
Table with five rows: PR Review | Documentation Sync | Incident Triage | Onboarding Assistant | Data Quality Monitor. Three columns per row: Trigger | Context gathered | Output destination. These are the canonical organizational use-case patterns. Emphasize: these are fixed archetypes — not a sample set. The audience's problem maps to one of these patterns (or a clear combination).

**Slide 5 — Archetype deep dive: PR Review Pipeline.**
Trigger: pull request opened or updated webhook. Context: changed files, PR description, CLAUDE.md conventions. Decision logic: security vulnerability review, convention violation check, test coverage analysis, documentation completeness. Output: structured PR review comment. Action scope: read files, post comment — explicitly NO write access to the codebase. This scope constraint is not optional; the pipeline's value proposition depends on it being read-only.

**Slide 6 — Archetype deep dive: Incident Triage Pipeline.**
Trigger: PagerDuty alert or error rate spike. Context: recent error logs, relevant service's deployment history, on-call runbooks. Decision logic: produce initial triage summary (likely cause, affected scope, recommended immediate actions). Output: Slack channel message + preliminary incident record. Key design challenge: the context gathering phase must be fast — the value of incident triage degrades rapidly with time, so the perceive phase must minimize latency.

**Slide 7 — The five-phase capstone design process.**
Numbered list with one-sentence description per phase: (1) Problem scoping — specify the trigger, define measurable success, trace the value chain to the beneficiary. (2) Pipeline architecture — component diagram, agent allocation decision, interface specifications. (3) Prompt and skill design — full TCEF prompt, skill identification, output JSON schema. (4) Safety and production design — permission audit, secrets audit, approval gate placement, blast radius analysis. (5) Observability design — session ID schema, events to log, alert thresholds, log retrieval procedure. Call out phases most often skipped: Phase 1 (produces systems solving the wrong problem) and Phase 5 (produces systems impossible to debug in production).

**Slide 8 — Problem scoping: the three questions that must be answered.**
Question 1: "What triggers it, and what input does it have at that moment?" — contrast a bad spec ("the CI pipeline fails") with a good spec (GitHub Actions webhook on failure status, carrying workflow run ID and repository name). Question 2: "What does success look like, and how will you measure it?" — contrast "better code quality" with "correctly identifies ≥80% of security vulnerabilities in a test set of 50 PRs with known vulnerabilities." Question 3: "Who benefits, and how does the output reach them?" — trace from agent output to beneficiary, revealing delivery mechanism requirements.

**Slide 9 — Structured event logging: the eight event types.**
Table: Event type | When to log | Key fields. Rows: `session_start` (beginning of every session, pipeline + trigger + input hash), `tool_call` (every tool invocation, tool + inputs + output summary + duration + cost), `agent_dispatch` (sub-agent started, sub-agent role + assigned scope), `agent_result` (sub-agent returns, role + status + findings count), `approval_gate` (gate triggered, plan summary + plan hash), `approval_granted` (human approves, approver identity + timestamp), `session_end` (session complete, status + total duration + total cost + output hash), `error` (any error, error type + message + recoverable flag).

**Slide 10 — Minimum-required log event JSON structure.**
Show the full JSON object from the module: `timestamp`, `session_id`, `pipeline`, `event_type`, `tool`, `tool_input`, `tool_output_summary`, `tokens_consumed`, `duration_ms`, `error`. Call out `session_id` as the trace correlation key that must appear in every event. In multi-agent systems, add `agent_id` to every event, carrying both the parent `session_id` and the sub-agent's own `agent_id`. This enables per-agent cost calculation and per-agent execution sequence reconstruction.

**Slide 11 — Alerting thresholds: four metrics with starting values.**
Four alert conditions in a table: Error rate (>5% of sessions with status error over 1-hour window — indicates systematic failure), Timeout rate (>10% of sessions or tool calls — indicates scope too large or slow MCP server), Cost spike (daily token consumption >150% of rolling 7-day average — indicates prompt context explosion or runaway multi-agent), Session duration spike (median duration >200% of rolling 7-day median — indicates reasoning loops or unexpectedly deep inputs). Note: these are starting points calibrated to the specific pipeline's expected behavior.

**Slide 12 — The incident response playbook.**
Five-minute playbook presented as a timeline: Minute 0-1: characterize (all sessions or subset? error type?). Minute 1-2: identify failing component (last successful tool call + first error event in logs). Minute 2-3: determine reversibility (did any failing sessions take irreversible actions?). Minute 3-5: containment (disable MCP server in settings.json, or disable pipeline trigger). After containment: mandatory written RCA for any incident involving irreversible actions, lasting >15 minutes, or affecting >10 sessions. The RCA must include: what happened, why monitoring didn't catch it sooner, fix applied, recurrence prevention.

**Slide 13 — Skill versioning: major.minor convention.**
Major version increment: the generated code pattern changes (breaking change — sessions loading old vs. new version produce different output). Minor version increment: additions, clarifications, typo fixes (non-breaking — both versions produce equivalent output). Show the skill frontmatter example from the module: `name`, `version: 2.0`, `applies_to`, `breaking_change: "Replaces fmt.Errorf wrapping pattern with errors.Join for Go 1.20+"`, `supersedes: go-error-handling@1.x`. Rule: when a major version ships, audit all active workflows that load that skill to verify compatibility with the codebases they operate on.

**Slide 14 — Prompt drift: the maintenance cadence.**
Four-tier schedule: Monthly — review CLAUDE.md for each active pipeline against current codebase (file paths, library versions, convention references). At every major dependency upgrade — review all skills and prompts referencing that dependency before the upgrade reaches production. After any architectural decision — any decision that changes how the team writes code triggers immediate review of affected skills and prompts. Quarterly — run a representative sample of each active pipeline on known-good inputs and compare outputs to initial validation results. Prompt drift is gradual and cumulative; the quarterly regression run makes accumulated drift visible.

**Slide 15 — Model update testing protocol.**
Four steps: (1) Regression test set — maintain 20-50 inputs with known-good outputs per production pipeline (created during initial validation). (2) Behavioral comparison — compare new model outputs on four dimensions: format compliance, reasoning quality, verbosity changes, tool call sequence patterns. (3) Prompt adjustment — preferred over version pinning; prompt adjustments extract better results from a better model; version pinning accumulates technical debt as pinned versions become unsupported. (4) Staged rollout — deploy to staging environment, run production trigger mechanism for at least one week, monitor error rate and output quality before production deployment.

**Slide 16 — Skill library contribution process.**
Four-stage lifecycle: Proposal (team member identifies a repeated or inconsistently-specified pattern, proposes name + target pattern + version + draft). Review (second engineer checks accuracy, coverage, version numbering, frontmatter completeness). Testing (load skill in test session, generate code, domain expert reviews). Publication (added to shared skill library, all workflows referencing the pattern updated). Maintenance ownership: skill creator is default owner; ownership can be transferred explicitly; skills with no identified owner are flagged for review. Cultural adoption: skill pre-loading in standard session init scripts, skill reference checks in code review.

**Slide 17 — The production deployment checklist: six categories.**
Present as a scannable checklist summary: Technical accuracy (20+ real inputs tested, domain expert review, edge cases, approval gate tested, output schema validated). Scope testing (out-of-scope inputs tested, permission denials logged clearly). Failure mode testing (tool timeout, malformed MCP response, empty results, contradictory multi-agent findings). Permission audit (second engineer review, every allow-list item justified, deny list covers conceivable unwanted actions). Secrets audit (git history checked for previously committed secrets, .env.example complete, CI secrets in platform management). Observability (session logs retrievable by ID within 5 minutes, cost tracked per session, error rate alerting tested).

**Slide 18 — Do/Don't summary + lab preview.**
Do: complete the five-phase design process before writing code; define measurable success criteria before building; log every tool call with the eight minimum fields; maintain a regression test set from initial validation; version skills as APIs with breaking change documentation. Don't: ship without a documented incident response playbook; upgrade model versions in production without regression testing; treat prompts as write-once artifacts; grow the skill library without a contribution process; skip cost projection before deployment. Lab 12: design a complete agentic pipeline for a real organizational problem — five artifacts: problem scoping document, architecture diagram, TCEF prompt, settings.json configuration, observability design — presented to the group for review.
