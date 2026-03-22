# Challenge Exercises — Implementation Plan

**Purpose**: Map every proposed challenge exercise to a specific lab, section, and implementation approach.
**Status**: Planning document — each item has an implementation estimate and priority.

---

## How Challenges Integrate Into Labs

Each lab already has a **boss/capstone section** at section 6. Challenge exercises are different: they live **inside** earlier sections as optional-but-encouraged activities that deepen the hands-on work. They don't gate progression (the lab's existing section flow stays intact), but they do award bonus XP and connect directly to the CHALLENGE-MISSIONS.md full-length versions.

**Three types of in-lab challenge exercises**:

| Type | Description | Unlocks |
|------|-------------|---------|
| **🔬 Deep Dive** | Extended version of the current apply task — same topic, harder input | Bonus XP |
| **⚔️ Adversarial** | Broken/bad example the learner must diagnose and fix | Bonus XP |
| **🏗️ Build** | Learner creates a real artifact (YAML, config, schema, command) from scratch | Bonus XP + links to Challenge Mission |

---

## Lab 01 — The Paradigm Shift

**Current sections**: Two Ways to Build Software → PRAO Loop → Watch Claude Think → Your First 5 Commands → Quiz → Reflect & Connect

### Proposed Challenge Exercises

---

**CE-01-A: Categorize Before You Automate** *(adds to Section 1: Two Ways to Build Software)*
Type: 🔬 Deep Dive | Effort to implement: Medium | Priority: High

After the deterministic vs. goal-directed comparison, learner is given 8 real-world engineering tasks and must categorize each:
- Agentic: High value (multi-step, judgment required, verifiable output)
- Agentic: High risk (irreversible, low context, external systems)
- Not agentic: Deterministic code is better
- Needs hybrid: Part agentic, part deterministic

Tasks to classify:
1. "Rename every instance of UserService to AccountService across 47 files"
2. "Review this PR for security vulnerabilities"
3. "Send a billing email to all users whose trial expires tomorrow"
4. "Update the README whenever a new config option is added"
5. "Compress images in /assets/ that are over 1MB"
6. "Generate a weekly engineering metrics report from git history and Jira"
7. "Delete all records in the staging database older than 30 days"
8. "Write JSDoc for every exported function in src/utils/"

**Why it's hard**: Tasks 3, 7 look simple but are high-risk (irreversible). Tasks 4, 6, 8 look complex but have clear evaluation criteria. The discussion section reveals the reasoning, not just the categories.

---

**CE-01-B: Rewrite the Vague Command** *(adds to Section 4: Your First 5 Commands)*
Type: ⚔️ Adversarial | Effort to implement: Low | Priority: High

Learner sees 4 vague/bad prompts paired with the failure output they produce. Task: rewrite each prompt to be specific enough that the agent would succeed.

Bad prompt 1: "Fix the auth bug" → Output: agent reads auth.ts, doesn't know which bug, adds a comment "// TODO: investigate"
Bad prompt 2: "Make the tests pass" → Output: agent deletes the failing test
Bad prompt 3: "Refactor the user module" → Output: agent renames variables to single letters (technically "refactored")
Bad prompt 4: "Update the docs" → Output: agent adds a timestamp to README.md

Each rewrite is scored on: specificity of goal, explicit constraints, measurable success criteria.

---

**CE-01-C: Annotate a Real PRAO Trace** *(adds to Section 2/3: PRAO Loop + Watch Claude Think)*
Type: 🔬 Deep Dive | Effort to implement: High | Priority: High

A simulated 12-step execution trace is shown. Learner must label each step with its PRAO phase AND identify:
- Which tool call represents the first "Observe" that changes what comes next
- Where the agent's reasoning is implicit vs. explicit
- The exact point where human intervention would have been most useful

The trace covers a real-feeling task: "Migrate all console.log statements in src/ to a structured logger."

---

### Lab 01 Implementation Estimate
- CE-01-A: 3 hours (add after current section-1 apply task, add classification UI + reveal)
- CE-01-B: 2 hours (add to section-4, reuse existing textarea pattern)
- CE-01-C: 5 hours (new trace simulator data + annotation UI)

---

## Lab 02 — First Agent Conversation

**Current sections**: Why Prompts Fail → GCCF Pattern → Reading Output → When Things Go Wrong → Conversation Threading → Synthesis Check → Capstone

### Proposed Challenge Exercises

---

**CE-02-A: GCCF Debugger** *(adds to Section 1: GCCF Pattern)*
Type: ⚔️ Adversarial | Effort to implement: Medium | Priority: High

Four prompts are shown that each fail one GCCF component. Learner must identify which component is missing or broken, then complete it. They don't rewrite the whole prompt — they surgically fix the one broken part.

Broken prompt 1 (missing Goal specificity): "Review my authentication code and make it better. The codebase is a Node.js API. Don't change any database queries. Return as a bulleted list."
→ Fix: What does "better" mean? Security? Performance? Readability?

Broken prompt 2 (missing Context): "Refactor this function to handle null inputs gracefully. Use null-coalescing operators where possible. Return as a rewritten function block."
→ Fix: What language? What's the function signature? What should null return?

Broken prompt 3 (missing Constraints): "Write a caching wrapper for this database query function. The project uses Redis. Use TypeScript interfaces."
→ Fix: No TTL specified, no key strategy, no behavior on cache miss

Broken prompt 4 (missing Format): "Identify all the API endpoints that don't have rate limiting. The service is a REST API built in FastAPI. Only check the routers in /api/v1/."
→ Fix: Should output be a list? Include remediation steps? Report only or fix?

---

**CE-02-B: Write a Production CLAUDE.md Entry** *(adds to Section 4: Conversation Threading)*
Type: 🏗️ Build | Effort to implement: Medium | Priority: Critical

The current section 4 asks learners to write a CLAUDE.md entry. This challenge version is more demanding:

Learner writes a full CLAUDE.md for a provided codebase spec (e.g., "a TypeScript monorepo with three packages: API, frontend, shared-types; uses Prisma + PostgreSQL; Jest for testing; GitHub Actions for CI"). The entry must include:

1. **Project overview** (what it does, who uses it)
2. **Architecture summary** (how the packages relate, where the entry points are)
3. **Development conventions** (naming, file structure, import style)
4. **What NOT to do** (at least 3 items with reasons)
5. **How to run tests** (specific commands)
6. **The secrets rule** (no API keys, database URLs, or tokens in any file the agent touches)

The lab then "runs" the CLAUDE.md by asking 5 questions the agent would need to answer. The learner verifies whether their CLAUDE.md has the answers.

---

**CE-02-C: Trace-to-Recovery Mapping** *(adds to Section 3: When Things Go Wrong)*
Type: ⚔️ Adversarial | Effort to implement: Medium | Priority: High

A 3-step error trace is shown (agent attempts a task, fails, produces a wrong output). The learner must:
1. Identify what phase of PRAO the failure occurred in
2. Write the recovery prompt (what to say next to get back on track)
3. Write the CLAUDE.md entry that would prevent this failure in a future session

---

### Lab 02 Implementation Estimate
- CE-02-A: 3 hours (4 interactive GCCF debugger items, reveal-on-submit)
- CE-02-B: 4 hours (new section, guided form with 5 required fields, self-check questions)
- CE-02-C: 2 hours (add to existing section 3 after error-recovery trace)

---

## Lab 03 — Agent Thinking with OpenCode

**Current sections**: The Black Box Problem → Reading Chain-of-Thought → Tool Call Sequences → When Agents Ask for Help → Extended Thinking Mode → Synthesis → Diagnose a Real Trace (boss)

### Proposed Challenge Exercises

---

**CE-03-A: Predict the Next Tool Call** *(adds to Section 2: Tool Call Sequences)*
Type: 🔬 Deep Dive | Effort to implement: High | Priority: High

Given a partial trace (first 4 tool calls), learner must predict:
- What the next 2 tool calls will be
- What the agent will observe from each
- Whether the task will complete in 2 more steps or require more

Three scenarios:
- Scenario A: Renaming a function across a codebase (predictable — agent will search then edit)
- Scenario B: Debugging a failing test (less predictable — depends on what agent reads)
- Scenario C: Adding a new API endpoint (complex — multiple files, possible test gen)

After predicting, the full trace is revealed. The comparison isn't graded on correctness — it's graded on whether the learner's reasoning was sound.

---

**CE-03-B: Write the Corrective Intervention** *(adds to Section 3: When Agents Ask for Help)*
Type: 🏗️ Build | Effort to implement: Medium | Priority: High

An agent is mid-task and has just asked a clarifying question (shown verbatim). The question is poorly phrased or shows a misunderstanding. The learner must:
1. Identify what the agent misunderstood
2. Write a corrective response (not just the answer, but one that re-grounds the agent's understanding)
3. Write a CLAUDE.md addition that would prevent the misunderstanding next time

Three scenarios:
- Agent asks "Should I use single or double quotes?" (wrong level of abstraction — should infer from existing code)
- Agent asks "Do you want me to delete the old function after renaming?" (should clarify — this is a dangerous irreversible action)
- Agent asks "I found 3 different error handling patterns. Which should I standardize to?" (good question but needs context about which files have each)

---

**CE-03-C: Loop Detection Drill** *(adds to Section 4: Extended Thinking Mode)*
Type: ⚔️ Adversarial | Effort to implement: High | Priority: High

Five traces are shown. For each, learner must determine: Is this a productive iteration or a stuck loop?

Trace 1: Agent reads same file 3 times in a row — LOOP (no writes between reads, no new info)
Trace 2: Agent runs tests → fails → edits → runs tests → fails → edits — PRODUCTIVE (different edits each time)
Trace 3: Agent searches for a function, doesn't find it, searches with a different query, finds it — PRODUCTIVE (adapting)
Trace 4: Agent reads file, writes a change, reads file again to verify, reads file a third time — LOOP (verification was complete after second read)
Trace 5: Agent generates a plan, executes step 1, re-generates the plan with the same steps — LOOP (shouldn't re-plan unless something changed)

For each, learner writes: "What would you say to the agent right now?"

---

**CE-03-D: Issue Navigation Exercise** *(adds to Section 5: Synthesis — NEW)*
Type: 🏗️ Build | Effort to implement: High | Priority: High

**This is the codebase + issue integration exercise that lives inside Lab 03.**

Given a specific public GitHub issue (pre-selected, consistent), learner uses the simulation to walk through how Claude Code would approach it:

1. Given the issue title + description, write the first 3 tool calls the agent should make (read which files? run which commands?)
2. Write the PRAO annotation for those 3 tool calls
3. Given a "partial read" of the relevant file (shown in the lab), identify the root cause
4. Write the fix prompt that a developer would give Claude Code to implement the change
5. Write the PR description that Claude Code should generate

This is a simulation (no live execution), but the issue, files, and traces are real — pulled from actual open-source PRs.

---

### Lab 03 Implementation Estimate
- CE-03-A: 5 hours (3 scenario traces with prediction UI + reveal)
- CE-03-B: 3 hours (3 clarifying-question scenarios with textarea + reveal)
- CE-03-C: 4 hours (5 trace classifiers with justification textarea)
- CE-03-D: 6 hours (new section 5 exercise, real issue data, multi-step guided)

---

## Lab 04 — MCP Server Explorer

**Current sections**: The Extension Problem → Three Primitives → Connecting MCP Servers → Reading Tool Schemas → MCP in the PRAO Loop → Capstone (write your MCP plan)

### Proposed Challenge Exercises

---

**CE-04-A: Broken Config Debugger** *(adds to Section 2: Connecting MCP Servers)*
Type: ⚔️ Adversarial | Effort to implement: Medium | Priority: Critical

Five broken `settings.json` snippets are shown. Learner identifies exactly what's wrong in each and writes the corrected version.

Broken config 1: stdio server with a `url` field (mixing transport types)
Broken config 2: HTTP server missing the `type: "http"` field (defaults to stdio, wrong transport)
Broken config 3: API key hardcoded in headers instead of `${ENV_VAR}` syntax
Broken config 4: `args` field contains the command name (command should be separate from args)
Broken config 5: Correct structure but wrong server name in `mcpServers` key — it has spaces, which breaks tool namespace

---

**CE-04-B: Write a Real Tool Schema** *(adds to Section 3: Reading Tool Schemas)*
Type: 🏗️ Build | Effort to implement: Medium | Priority: Critical

The current section has learners read schemas. This challenge has them write one from scratch.

Scenario: "You're building an MCP server for a project management tool. You need a tool that lets Claude Code search for issues, filter by assignee and status, and return results in a structured format."

Learner writes the complete tool schema JSON:
```json
{
  "name": "...",
  "description": "...",
  "inputSchema": {
    "type": "object",
    "properties": {
      ...
    },
    "required": [...]
  }
}
```

The schema is graded by a built-in checker that validates:
- Name follows snake_case convention
- Description is a complete sentence (ends with period, >20 chars)
- Input schema has at least 3 properties
- At least one property is in the `required` array
- All properties have `type` and `description` fields

---

**CE-04-C: Primitive Classification Challenge** *(adds to Section 1: Three Primitives)*
Type: 🔬 Deep Dive | Effort to implement: Low | Priority: High

Beyond the existing primitive matcher, a harder set: 12 capabilities where some are edge cases and some appear to be one primitive but are actually another.

Example edge cases:
- "A list of all available database tables that Claude can read as context" — Resource, not Tool
- "A standard prompt template for code review that developers invoke by name" — Prompt
- "A function that takes a SQL query and returns results" — Tool
- "The current schema of the database, injected automatically as context" — Resource
- "A code formatter that Claude calls with file content and gets formatted content back" — Tool (not Resource even though it provides content)
- "Pre-written system-level instructions for performing security audits" — Prompt

---

**CE-04-D: Configure a Real MCP Integration** *(adds to Section 2, links to Mission 2.A)*
Type: 🏗️ Build | Effort to implement: Low | Priority: High

Learner writes the complete settings.json block to connect THREE real-world MCP servers (all publicly available):
1. `@modelcontextprotocol/server-filesystem` — local file access
2. `@modelcontextprotocol/server-postgres` — database access
3. A remote HTTP MCP server of their choice (suggest Linear or GitHub)

For each, they must specify: transport type, command/URL, environment variable placeholders for credentials, and one-sentence rationale for why each is needed in a real project.

This is the bridge from "understand MCP" to "actually use it."

---

### Lab 04 Implementation Estimate
- CE-04-A: 3 hours (5 broken configs with syntax-highlighted display + correction textarea)
- CE-04-B: 4 hours (schema builder UI with validation checker)
- CE-04-C: 2 hours (extend existing primitive matcher with 12 harder cases)
- CE-04-D: 2 hours (3-server settings.json builder with field validation)

---

## Lab 05 — Prompt Engineering Workshop

**Current sections**: Prompt Quality Gap → TCEF Pattern → Context Injection Strategies → Prompt Iteration → Knowledge Checks → Capstone

### Proposed Challenge Exercises

---

**CE-05-A: TCEF Dissection — Real Production Prompts** *(adds to Section 1: TCEF Pattern)*
Type: ⚔️ Adversarial | Effort to implement: Medium | Priority: High

Three real production-style prompts from common engineering workflows. For each, learner annotates which parts map to T, C, E, F — then identifies which components are weak or missing.

Prompt 1: A code review prompt (likely missing Examples, Format is vague)
Prompt 2: A documentation generation prompt (likely missing Context about audience, Format is missing entirely)
Prompt 3: A refactoring prompt (likely missing Constraints, Examples are there but not labeled)

After annotation, learner rewrites the weakest one using full TCEF.

---

**CE-05-B: Context Injection A/B Test** *(adds to Section 2: Context Injection Strategies)*
Type: 🔬 Deep Dive | Effort to implement: High | Priority: High

Same task, three different context injection strategies. Learner sees the "output" of each approach (simulated response summaries) and must explain:
- Why Strategy A produced the most relevant but least accurate output
- Why Strategy B produced the most accurate but most verbose output
- Why Strategy C produced the most concise output but missed an edge case

Then: for a given new task (shown), which strategy should they use and why?

Strategies: inline (context in the prompt body), structured (context as labeled sections), file-referenced (prompt points to CLAUDE.md sections by name)

---

**CE-05-C: Prompt Iteration Chain** *(adds to Section 3: Prompt Iteration)*
Type: 🏗️ Build | Effort to implement: Medium | Priority: Critical

**This is the core build exercise for Lab 05.** Currently the lab teaches iteration conceptually. This makes it hands-on.

Given a starting prompt (weak but real), learner must:
1. Run it mentally on a provided code sample and predict the output
2. Identify exactly which part of the output would be wrong or missing
3. Write v2 that fixes that one thing
4. Predict v2's output
5. Identify v2's remaining failure
6. Write v3 with a different technique (one of: few-shot, chain-of-thought prefix, output scaffolding, explicit exclusion clause)

The task: "Review this function for edge cases."
The code: a 30-line Python function with 4 edge cases (3 obvious, 1 subtle).

The learner's v3 is graded on whether it would catch all 4 edge cases based on a rubric.

---

**CE-05-D: Meta-Prompt Exercise** *(adds after Section 3, NEW)*
Type: 🏗️ Build | Effort to implement: Medium | Priority: High

**The skill that no prompt engineering course teaches until too late.**

Task: Write a prompt that generates prompts for a specific category.

Scenario: Your team needs to review PRs every day. Different reviewers care about different things. Write a meta-prompt that takes:
- Input: reviewer_name, reviewer_focus_area, PR_context
- Output: a customized TCEF-structured prompt for that reviewer

The meta-prompt is evaluated on:
- Does the output follow TCEF?
- Does it actually vary based on focus_area?
- Is the Format component of the generated prompt specific enough to be acted on?

---

### Lab 05 Implementation Estimate
- CE-05-A: 3 hours (3 prompt dissection cards with annotation textarea + reveal)
- CE-05-B: 4 hours (3 simulated output comparisons + analysis textarea)
- CE-05-C: 5 hours (6-step iteration chain with code sample + graded rubric)
- CE-05-D: 3 hours (meta-prompt builder with validation criteria)

---

## Lab 06 — Skills & Commands Builder

**Current sections**: What Is a Skill? → YAML Frontmatter Deep Dive → Writing the Skill Body → Building Slash Commands → Skill Composition → Putting It All Together → Build a Skill Ecosystem (boss)

### Proposed Challenge Exercises

---

**CE-06-A: Debug a Broken Skill** *(adds to Section 1: YAML Frontmatter Deep Dive)*
Type: ⚔️ Adversarial | Effort to implement: Medium | Priority: Critical

Five broken skill YAML files. For each, learner finds and fixes the error.

Broken skill 1: Missing `name` field — YAML is valid but skill won't register
Broken skill 2: `trigger_phrases` is a string instead of an array
Broken skill 3: `description` is a one-word string — too vague to be useful for activation
Broken skill 4: Behavior instructions say "do the task" with no specifics — will produce inconsistent output
Broken skill 5: Constraints section lists things the skill SHOULD do — backwards from intended purpose

---

**CE-06-B: Write Trigger Phrases That Don't Collide** *(adds to Section 1)*
Type: 🏗️ Build | Effort to implement: Low | Priority: High

A skill has been written for `pr-reviewer`. Learner must write 5 trigger phrases that:
- Would correctly activate this skill
- Would NOT accidentally activate a different nearby skill (`commit-writer`, `changelog-generator`)
- Are phrased naturally (how a developer would actually ask)

Then: given 8 sample user prompts, classify each as: activates pr-reviewer, activates commit-writer, activates neither, ambiguous.

This teaches the collision and gap problem in skill activation design.

---

**CE-06-C: Author a Full Skill From Scratch** *(adds to Section 2: Writing the Skill Body)*
Type: 🏗️ Build | Effort to implement: High | Priority: Critical

**This is the core build exercise for Lab 06.**

Learner authors a complete skill YAML for a `standup-writer` skill:
- Reads recent git commits (last 24 hours, or since last standup)
- Filters to commits by the current user
- Groups by type (feat, fix, chore, test)
- Outputs a standup format: "Yesterday: X, Today: Y, Blockers: Z"

The lab provides a YAML template with blanks. Learner must fill in:
- Description (must mention: what it reads, what it produces, when to use it)
- Trigger phrases (at least 4, no collisions with adjacent skills)
- Behavior (step-by-step instructions, must reference the git log format)
- Output format (exact markdown structure)
- Constraints (what not to include: merge commits, WIP commits, other authors)

Graded by built-in YAML linter + 5-point rubric check.

---

**CE-06-D: Build a Two-Step Slash Command** *(adds to Section 3: Building Slash Commands)*
Type: 🏗️ Build | Effort to implement: High | Priority: Critical

**This is the core build exercise for the slash commands section.**

Learner builds a `/pr-ready` command that:
1. Reads the current branch's diff vs. main
2. Checks which test files exist for changed source files (using a glob pattern)
3. Reads CLAUDE.md for any shipping constraints
4. Outputs a structured readiness report: changed files, test coverage status, CLAUDE.md constraints, go/no-go recommendation

The command file template is provided. Learner must fill in:
- The argument specification (does it take arguments? what?)
- The step-by-step behavior (with data flow between steps)
- The output format
- What to do if no CLAUDE.md exists

---

**CE-06-E: Skill Composition Design** *(adds to Section 4: Skill Composition)*
Type: 🔬 Deep Dive | Effort to implement: Medium | Priority: High

Three composition patterns are shown in the lab (sequential, parallel, conditional). This challenge asks learners to design a skill that uses all three.

Scenario: "You need a `feature-complete` skill that (1) runs tests [sequential first], then (2) checks docs and linting [parallel], then (3) if any fail, generates a fix checklist rather than a PR description [conditional]."

Learner writes the composition diagram (text-based flowchart) and the skill body that implements it.

---

### Lab 06 Implementation Estimate
- CE-06-A: 3 hours (5 broken YAML cards with syntax display + correction textarea)
- CE-06-B: 2 hours (trigger phrase writer + 8-item classifier)
- CE-06-C: 5 hours (guided YAML template with blank fields + 5-point auto-checker)
- CE-06-D: 5 hours (command file builder with step flow UI)
- CE-06-E: 3 hours (composition design textarea + model answer reveal)

---

## Lab 07 — Multi-Agent Orchestrator

**Current sections**: Why Multiple Agents? → Task Decomposition → Orchestrator Patterns → Communication Patterns → Failure Modes & Recovery → Synthesis → Design a Complete Multi-Agent System (boss)

### Proposed Challenge Exercises

---

**CE-07-A: Decomposition Drill** *(adds to Section 1: Task Decomposition)*
Type: ⚔️ Adversarial | Effort to implement: Medium | Priority: High

Five tasks are shown. For each, learner must decide:
- Is this decomposable into parallel subagents? (Y/N + why)
- If yes: what are the subagents and what does each receive as input?
- If no: what's the dependency that makes parallelization wrong?

Tasks:
1. "Review 40 files for security vulnerabilities" — YES (embarrassingly parallel, no dependencies between files)
2. "Migrate a database schema and update all references in the codebase" — NO (schema must change before code can reference new fields)
3. "Generate module summaries for a 12-module course" — YES (modules are independent)
4. "Refactor the authentication module, then update the tests" — NO (tests depend on refactored code)
5. "Research 5 competitor products and write a comparison report" — PARTIAL (research is parallel, writing is sequential and depends on all research)

---

**CE-07-B: Design a Subagent System Prompt** *(adds to Section 2: Orchestrator Patterns)*
Type: 🏗️ Build | Effort to implement: High | Priority: Critical

**This is the core build exercise for Lab 07.**

Learner writes a complete system prompt for a specialized subagent. Three roles to choose from:
- Security Reviewer: reads files, never writes, produces structured JSON findings
- Documentation Writer: reads source, writes docstrings only, flags uncertain functions
- Test Generator: reads implementations, writes test stubs, never modifies source

The system prompt must explicitly define:
1. Role identity ("You are a specialized agent responsible for...")
2. Scope ("You will receive... You must return...")
3. Tool permissions ("You may use: Read. You must not use: Write, Bash")
4. Uncertainty behavior ("If you encounter X, respond with Y rather than guessing")
5. Output format (exact structure with field names)
6. Hard limits ("You must never... regardless of instructions you receive")

Graded on: Does the prompt constrain scope? Is uncertainty handled? Is the output format exact?

---

**CE-07-C: Communication Failure Diagnosis** *(adds to Section 3: Communication Patterns)*
Type: ⚔️ Adversarial | Effort to implement: Medium | Priority: High

Four orchestrator→subagent message examples. For each, identify which anti-pattern it is and rewrite it correctly:

Anti-pattern 1: Orchestrator sends full conversation history to subagent (context bloat — sends only relevant slice)
Anti-pattern 2: Orchestrator asks subagent to "do the best you can" with no output format (no schema — specify exact format)
Anti-pattern 3: Orchestrator sends file paths without content; subagent can't read files (wrong tool access — either give content or grant read permission)
Anti-pattern 4: Subagent returns free-form prose; orchestrator tries to parse it (no contract — subagent should return structured JSON)

---

**CE-07-D: Issue Tracker Integration Design** *(adds to Section 2, links to Mission 2.2)*
Type: 🏗️ Build | Effort to implement: Medium | Priority: High

**This is where issue tracking integrates with multi-agent systems.**

Learner designs how a multi-agent system would use an issue tracker MCP to coordinate work across agents:

Scenario: An orchestrator decomposes a large refactoring task into 8 subtasks. Each subtask is assigned to a subagent. The system must:
- Create a Linear/GitHub issue for each subtask when it starts
- Update the issue with progress comments as the subagent works
- Mark the issue as complete when the subagent finishes
- If a subagent fails, update the issue with the error and requeue

Learner writes:
1. The orchestrator's task-dispatch function (pseudocode)
2. The subagent's status-update protocol (which MCP tool calls, in what order)
3. The failure recovery flow (what the orchestrator does when a subagent issue shows "failed")
4. The final synthesis step (how the orchestrator knows all issues are resolved)

---

**CE-07-E: PR Review Pipeline Design** *(adds to boss section, extends existing boss)*
Type: 🏗️ Build | Effort to implement: Medium | Priority: High

The current boss challenge asks learners to "design a complete multi-agent system." This extends it specifically for the PR review use case:

Learner designs a 4-agent pipeline:
- Agent 1 (Dispatcher): reads the PR diff, decomposes into review categories
- Agent 2 (Correctness Reviewer): checks logic and edge cases
- Agent 3 (Security Reviewer): checks for vulnerabilities and secret exposure
- Agent 4 (Synthesizer): merges findings, deduplicates, assigns severity, produces final review

For each agent: system prompt summary, tool access, input format, output format.
For the pipeline: what happens when Agent 2 and Agent 3 both flag the same issue?

---

### Lab 07 Implementation Estimate
- CE-07-A: 3 hours (5 decomposition classifiers with justification + reveal)
- CE-07-B: 5 hours (structured system prompt builder with 6 required sections + rubric)
- CE-07-C: 3 hours (4 anti-pattern examples with diagnosis textarea + rewrite)
- CE-07-D: 4 hours (issue tracker integration design with 4-part pseudocode builder)
- CE-07-E: 4 hours (extends boss challenge with 4-agent pipeline spec)

---

## Lab 08 — Production Patterns

**Current sections**: The Production Gap → Permission Scoping → Secrets Management → Cost Optimization → Observability → Putting It All Together → Production Deployment Specification (boss)

### Proposed Challenge Exercises

---

**CE-08-A: Permission Model Design** *(adds to Section 1: Permission Scoping)*
Type: 🏗️ Build | Effort to implement: Medium | Priority: Critical

**This is the core build exercise for the permissions section.**

Three real-world scenarios. For each, learner writes the complete `settings.json` permissions block:

Scenario 1: "A CI agent that reads source code, runs tests, and reports results. Should NEVER write to files, commit, or push."

Scenario 2: "A documentation agent that reads source files and writes to /docs/ only. Can run linters but not tests. Must not touch any .env files."

Scenario 3: "A production monitoring agent that reads logs and queries a read-only database connection. Must never write anything, execute shell commands, or access source code."

Each settings.json is validated: all prohibited actions must have explicit `deny` entries. Overly broad allows (like `Bash(*)`) flag a warning.

---

**CE-08-B: Secret Exposure Audit** *(adds to Section 2: Secrets Management)*
Type: ⚔️ Adversarial | Effort to implement: Medium | Priority: High

A simulated codebase snapshot is shown (10 files, all visible). Learner must find all 6 secret exposure risks:

1. API key hardcoded in a Python file
2. Database URL in a `.env.example` file that's been committed (not .env, but still leaks the format + often real values)
3. CLAUDE.md that contains a real-looking Stripe test key "for reference"
4. Shell command in a prompt that echoes the value of an env var (leaks into prompt history)
5. A log statement that prints the full request headers (includes Authorization: Bearer token)
6. A config file that's in .gitignore locally but the MCP server's working directory is the parent (outside the gitignore scope)

For each, learner identifies the exposure risk AND the remediation.

---

**CE-08-C: Write a Cost Budget** *(adds to Section 3: Cost Optimization)*
Type: 🏗️ Build | Effort to implement: Low | Priority: High

Given a proposed agentic workflow description, learner estimates the token cost and writes a cost budget:

Workflow: "A nightly documentation sync agent that reads 150 changed files per run (avg 200 lines each), generates 150 docstring updates (avg 50 lines output each), and runs 5 nights per week."

Learner must:
1. Estimate tokens per run (input tokens + output tokens)
2. Estimate monthly cost (using current Claude pricing tiers)
3. Propose 3 optimizations that would reduce cost by at least 50%
4. Identify the cost control mechanism (what triggers a circuit breaker if tokens exceed budget?)

---

**CE-08-D: Design Structured Log Events** *(adds to Section 4: Observability)*
Type: 🏗️ Build | Effort to implement: Medium | Priority: High

**The exercise that makes observability concrete instead of conceptual.**

Learner designs the log schema for 5 key events in a multi-agent pipeline:

1. `task.dispatched` — orchestrator assigns work to a subagent
2. `tool.called` — any agent calls a tool
3. `tool.failed` — a tool call returns an error
4. `agent.uncertain` — agent flags that it cannot complete the task without more information
5. `pipeline.complete` — the full pipeline finishes

For each event, learner specifies:
- Event name (snake_case)
- Required fields (must include: timestamp, agent_id, task_id)
- Optional fields
- What would make this log entry useless vs. useful (anti-example + correct example)

---

**CE-08-E: Production Incident Response Design** *(adds to boss section)*
Type: 🏗️ Build | Effort to implement: Medium | Priority: High

Extends the existing boss challenge (production deployment specification) with an incident response component.

Scenario: "Your agentic pipeline has been running for 2 weeks when you notice the token cost for Monday was 8x higher than normal. Design the incident response."

Learner must:
1. List the first 3 things they'd check (in order of likelihood)
2. Design the alert that should have fired before you noticed manually
3. Write the cost circuit breaker logic (pseudocode)
4. Write the post-incident CLAUDE.md update that prevents recurrence

---

### Lab 08 Implementation Estimate
- CE-08-A: 4 hours (3 scenario permission builders with validation)
- CE-08-B: 4 hours (10-file simulated codebase viewer + 6-item audit form)
- CE-08-C: 3 hours (cost calculation wizard + 3-optimization textarea)
- CE-08-D: 4 hours (log schema builder for 5 event types)
- CE-08-E: 3 hours (extends boss with 4-part incident response form)

---

## Lab 09 — Capstone Build

**Current sections**: Choosing Your Problem → Pipeline Architecture Design → Prompt & Skill Design → Safety & Production Design → Peer Review Protocol → Your Capstone Design Document

### Proposed Challenge Exercises

---

**CE-09-A: Write a Real Skill YAML in Capstone** *(adds to Section 2: Prompt & Skill Design)*
Type: 🏗️ Build | Effort to implement: Medium | Priority: Critical

**The capstone currently asks learners to design their skill. This requires them to write it.**

Section 2 currently collects prompt design and skill design as text descriptions. This challenge adds a required YAML editor:

Learner must produce a complete, syntactically valid skill YAML for one skill in their pipeline. The YAML is validated (parse check + 5-criteria rubric check). A failing validation returns specific error messages, not just "invalid."

Required fields: name, description (>3 sentences), trigger_phrases (>= 3), behavior (> 100 words, must contain at least one explicit constraint), output_format, examples (>= 1).

---

**CE-09-B: Subagent Configuration in Capstone** *(adds to Section 2)*
Type: 🏗️ Build | Effort to implement: Medium | Priority: Critical

If the learner's pipeline uses subagents (most will), they must produce:
1. A system prompt for their primary subagent (> 200 words, must include: role, scope, tool list, uncertainty behavior, output format)
2. An explicit list of tools allowed vs. denied for that subagent
3. A one-paragraph rationale for the tool access decisions

---

**CE-09-C: Issue Tracker Pipeline Integration** *(adds to Section 3: Safety & Production Design)*
Type: 🏗️ Build | Effort to implement: Medium | Priority: High

**This is where issue tracking integration becomes a required capstone component.**

Learner must specify how their pipeline uses an issue tracker (Linear or GitHub):

1. Which events in their pipeline create or update tracker items?
2. What information is written to each tracker item?
3. Which events require human acknowledgment before the pipeline continues?
4. How does the pipeline handle a tracker item that gets no response in 24 hours?

This is written as a design spec, not pseudocode — but it's specific enough to implement.

---

**CE-09-D: The Live Implementation Option** *(replaces current Section 5 design doc for advanced learners)*
Type: 🏗️ Build | Effort to implement: Low to add, High to complete | Priority: High

After the design document is generated, an optional section appears: "Implement It."

This is not a new lab section with guided steps — it's a pointer to the CHALLENGE-MISSIONS.md Mission 3.2 with the learner's own design document pre-loaded as the specification.

The lab says: "Your design document is your spec. Mission 3.2 in the Challenge Missions is the rubric. Build what you designed."

---

### Lab 09 Implementation Estimate
- CE-09-A: 4 hours (YAML editor component with parse check + rubric)
- CE-09-B: 3 hours (system prompt builder with required fields + tool list)
- CE-09-C: 3 hours (issue tracker integration spec form with 4 required questions)
- CE-09-D: 1 hour (link to Challenge Missions + design doc export)

---

## Implementation Priorities

### Phase 1 — High-Impact Additions (do first)
These exercises directly fill the gaps the user identified — skill authoring, command building, codebase navigation, issue tracking:

| Exercise | Lab | Type | Hours |
|----------|-----|------|-------|
| CE-06-C: Author a Full Skill From Scratch | 06 | Build | 5 |
| CE-06-D: Build a Two-Step Slash Command | 06 | Build | 5 |
| CE-07-B: Design a Subagent System Prompt | 07 | Build | 5 |
| CE-04-B: Write a Real Tool Schema | 04 | Build | 4 |
| CE-08-A: Permission Model Design | 08 | Build | 4 |
| CE-09-A: Write a Real Skill YAML (Capstone) | 09 | Build | 4 |
| CE-09-C: Issue Tracker Pipeline Integration | 09 | Build | 3 |
| CE-03-D: Issue Navigation Exercise | 03 | Build | 6 |

**Phase 1 total**: ~36 hours of implementation work | 8 labs touched | Direct "build real things" coverage

### Phase 2 — Depth Exercises (do second)
Adversarial debugging and analytical challenges:

| Exercise | Lab | Type | Hours |
|----------|-----|------|-------|
| CE-04-A: Broken Config Debugger | 04 | Adversarial | 3 |
| CE-06-A: Debug a Broken Skill | 06 | Adversarial | 3 |
| CE-07-C: Communication Failure Diagnosis | 07 | Adversarial | 3 |
| CE-08-B: Secret Exposure Audit | 08 | Adversarial | 4 |
| CE-05-C: Prompt Iteration Chain | 05 | Build | 5 |
| CE-02-B: Write a Production CLAUDE.md | 02 | Build | 4 |
| CE-01-A: Categorize Before You Automate | 01 | Deep Dive | 3 |
| CE-03-C: Loop Detection Drill | 03 | Adversarial | 4 |

**Phase 2 total**: ~29 hours | All labs have challenges

### Phase 3 — Extended Analysis (do third)
Conceptual depth challenges and extended builds:

All remaining CEs: CE-01-B, CE-01-C, CE-02-A, CE-02-C, CE-03-A, CE-03-B, CE-04-C, CE-04-D, CE-05-A, CE-05-B, CE-05-D, CE-06-B, CE-06-E, CE-07-A, CE-07-D, CE-07-E, CE-08-C, CE-08-D, CE-08-E, CE-09-B, CE-09-D

**Phase 3 total**: ~55 hours | Full coverage across all 9 labs

---

## Implementation Approach

All challenge exercises follow this HTML pattern (matching existing lab style):

```html
<div class="challenge-exercise" id="ce-XX-X">
  <div class="challenge-header">
    <span class="challenge-type-badge">🏗️ Build Challenge</span>
    <span class="challenge-xp">+30 XP</span>
  </div>
  <h3 class="challenge-title">Challenge: [Name]</h3>
  <p class="challenge-brief">[Brief description]</p>

  <!-- Exercise-specific UI (textarea, YAML editor, multi-choice, etc.) -->

  <div class="challenge-criteria">
    <strong>Success criteria:</strong>
    <ul>
      <li>[ ] criterion 1</li>
    </ul>
  </div>

  <button class="challenge-submit-btn" onclick="submitChallenge('CE-XX-X')">
    Submit for XP
  </button>

  <div class="challenge-model" id="ce-XX-X-model" style="display:none">
    <!-- Model answer reveal after submission -->
  </div>
</div>
```

Challenge exercises:
- Do NOT gate progression (section can complete without them)
- Award bonus XP on submission (not graded correctness — self-assessed)
- Show a model answer after submission
- Link to the corresponding Challenge Mission for the full version
- Save to localStorage like existing apply tasks

---

*CHALLENGE-PLAN.md v1.0 — Session 8, 2026-03-16*
*Next step: implement Phase 1 exercises (8 labs, ~36 hours)*
*Parallel agent strategy: one agent per lab, run all 8 simultaneously*
