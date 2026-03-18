# Modules 04-06 Interactive Treatment Plan

**Batch 2** -- Applying all lessons learned from M01-M03
**Date**: 2026-03-17
**Scope**: Transform raw curriculum prose into interactive, gamified module content

---

## Lessons Learned from M01-M03 (Enforced in This Batch)

1. NO blank lines inside nested HTML divs (breaks `marked.js`)
2. NO inline `style` colors -- use `data-phase`, `data-variant`, CSS custom properties
3. NO emojis -- Lucide icons only (`<i data-lucide="icon-name"></i>`)
4. Predict-reveal BEFORE explanation -- no framing text that gives away the answer
5. All quiz reference material VISIBLE above quiz, never collapsed
6. Two-column traces (`annotated`, `compare`) default to `data-default-mode="manual"`
7. All trace delays: tool >= 1500ms, response >= 2500ms, think >= 3500ms
8. Every interactive component gets `ix-instruct` above it
9. Section order: objective, brief intro (1-2 sentences), instruct, interactive, collapse
10. Quizzes: minimum 4 questions, at least 1 tricky per quiz
11. Maximum 2 callouts per section, never more than 2 consecutive
12. Use `<code>` for file names, commands, tool names in prose (inside HTML blocks)
13. All traces have `data-speed="0.5"`
14. Content accuracy: no `--thinking` flag, no `--context` flag, no `/memory` command, SSE deprecated (Streamable HTTP only), exactly THREE MCP primitives

---

## Module 04: Prompt Engineering Depth

### Hero Section

```html
<div class="ix-diagram" data-component="module-hero">
<div class="ix-hero">
<div class="ix-hero-bg"></div>
<div class="ix-hero-module-num">Module 04</div>
<div class="ix-hero-title">Prompt Engineering Depth</div>
<div class="ix-hero-subtitle">Move beyond basic prompts to the TCEF framework -- diagnose failures, inject context strategically, and iterate with engineering discipline</div>
<div class="ix-hero-chips">
<span class="ix-hero-chip">TCEF Framework</span>
<span class="ix-hero-chip">Context Injection Strategies</span>
<span class="ix-hero-chip">Constraint Specification</span>
<span class="ix-hero-chip">Diagnostic Iteration</span>
</div>
</div>
</div>
```

### Overview

- **Objective**: Apply the TCEF pattern to agentic prompts, diagnose prompt failures using the Agentic Loop (PRAO) lens, and iterate systematically.
- **Spiral connection**: "You learned the Agentic Loop (PRAO) in Module 01 and configured `CLAUDE.md` as the agent's persistent memory in Module 02. Now let's apply that understanding to the prompts you write -- because a well-engineered prompt is the single highest-leverage input into the Agentic Loop."

### Section 4.1: Beyond Basic Prompts -- Why GCCF Is Not Enough

**Objective**: Identify the three failure modes where basic prompt patterns break down.

**Components**:

1. **Predict-reveal** (`m04-gccf-limits`) -- BEFORE any failure mode explanation
   - Prompt: "You have been using a simple Goal + Context + Constraints + Format pattern for prompts. Consider these two scenarios: (1) asking an agent to 'refactor the authentication module,' and (2) asking it to produce JSON output that feeds a CI pipeline parser. What could go wrong with a basic prompt pattern in each case? Where would you expect it to break?"
   - Reveal: Explains the three failure modes (ambiguity, pattern mismatch, format drift)

2. **Click-cards** (`m04-failure-modes`) -- 3 cards for 3 failure modes
   - Card 1: "Multiple Valid Interpretations" -- icon: `git-branch` -- detail panel shows the refactor example with why "improve" and "refactor" are underspecified verbs
   - Card 2: "Pattern and Style Requirements" -- icon: `palette` -- detail panel shows why "follow our existing patterns" gives Claude no concrete data
   - Card 3: "Output Feeds Another System" -- icon: `workflow` -- detail panel shows the JSON field name variability problem

3. **Callout** (`warning`): "Verbs like 'improve,' 'update,' 'fix,' and 'refactor' admit dozens of valid interpretations. In agentic contexts, underspecified verbs waste iterations on ambiguity that should be eliminated at prompt-design time."

4. **Collapse**: Move the detailed GCCF prompt example and the extended prose about each failure mode into a Deep Dive collapse.

### Section 4.2: The TCEF Pattern

**Objective**: Apply the four elements of the TCEF pattern -- Task, Context, Examples, Format -- to construct precise, reliable agentic prompts.

**Components**:

1. **Predict-reveal** (`m04-tcef-predict`) -- BEFORE TCEF explanation
   - Prompt: "If you were designing a prompt framework that fixes the three failure modes we just identified (ambiguity, pattern mismatch, format drift), what elements would you include? Think about what each failure mode was missing and what a prompt pattern needs to provide."
   - Reveal: Introduces TCEF as the resolution -- Task (precision verbs), Context (injection strategies), Examples (showing beats telling), Format (output schema)

2. **Tabbed-panel** (`m04-tcef-elements`) -- 4 tabs, one per TCEF element
   - Tab "Task": Precise verb + measurable outcome. Shows the imprecise vs. precise comparison. Lists precision verbs (add, remove, convert, extract, rename, replace, wrap, generate, validate, list) vs. underspecified verbs (improve, update, fix, enhance, refactor, review).
   - Tab "Context": The five injection strategies as a brief list (File Reference, Pattern, Constraint, Audience, State). Links to deeper coverage in 4.3.
   - Tab "Examples": The code review JSON example showing how one example communicates field names, types, style, and vocabulary simultaneously. Key principle: "One concrete example replaces three paragraphs of abstract rules."
   - Tab "Format": Output schema specification. The JSON schema example with typed field descriptions. Key discipline: downstream consumer should be able to write a parser against the Format spec alone.

3. **Callout** (`core-idea`): "TCEF's power comes from specificity. Each element targets a different failure mode: Task eliminates ambiguity, Context provides signal, Examples demonstrate patterns, and Format locks output structure."

4. **Collapse**: Move the extended prose on each TCEF element (the multi-paragraph explanations with code examples) into a Deep Dive.

### Section 4.3: Context Injection Strategies in Depth

**Objective**: Choose and deploy the right context injection strategy from among five distinct approaches.

**Components**:

1. **Click-cards** (`m04-context-strategies`) -- 5 cards for 5 strategies
   - Card 1: "File Reference" -- icon: `file-code` -- when to use, pitfalls (do not include lockfiles)
   - Card 2: "Pattern" -- icon: `copy` -- source from production code, not descriptions
   - Card 3: "Constraint" -- icon: `shield` -- be explicit about what NOT to change
   - Card 4: "Audience" -- icon: `users` -- who consumes the output
   - Card 5: "State" -- icon: `clock` -- current system state, recent changes

2. **Scenario-quiz** (`m04-context-quality`) -- The signal vs. noise exercise
   - Terminal replay showing a task prompt: "Add JSDoc comments to all exported functions in `utils/format.ts`"
   - Quiz: Present 6 context fragments, student identifies 3 signal and 3 noise
   - Signal: the target file itself, an existing JSDoc example from codebase, the TypeDoc config
   - Noise: `utils/parse.ts`, the README, the package.json
   - This is a key pedagogical exercise from the source material

3. **Callout** (`tip`): "Start with minimal context and add only what a specific failure mode indicates is missing. Irrelevant context is not neutral -- it adds noise that dilutes the signal."

4. **Collapse**: Move the Progressive Context prose and the extended do/don't lists into a Deep Dive.

### Section 4.4: Constraint Specification

**Objective**: Write constraint specifications across four categories that prevent common failure modes.

**Components**:

1. **Tabbed-panel** (`m04-constraint-types`) -- 4 tabs for 4 constraint categories
   - Tab "Scope": What files/functions are in and out of scope. Code example.
   - Tab "Compatibility": Interfaces/behaviors that must be preserved. Code example.
   - Tab "Style": Conventions the output must follow. Code example.
   - Tab "Approval": Points where agent must pause for human confirmation. Code example with the three approval elements (what to show, format, wait instruction).

2. **Callout** (`warning`): "Constraints like 'follow best practices,' 'make sure it is secure,' or 'do not break anything' are unenforceable. Replace them with specific, verifiable constraints: 'use parameterized queries for all database calls,' 'the existing 47 unit tests must continue to pass.'"

3. **Compare** (`m04-constraints-compare`) -- Side-by-side: meaningless vs. enforceable constraints
   - Left column: 4 meaningless constraints (follow best practices, make sure it is secure, do not break anything, keep it clean)
   - Right column: 4 enforceable replacements

4. **Collapse**: Move extended discussion of anti-patterns and the approval constraint details.

### Section 4.5: Prompt Iteration as a Debugging Discipline

**Objective**: Execute the four-step prompt iteration loop using the Agentic Loop (PRAO) as a diagnostic lens.

**Components**:

1. **Predict-reveal** (`m04-iteration-predict`) -- BEFORE the iteration loop explanation
   - Prompt: "When a prompt produces wrong output, most people rewrite the entire prompt. If you had to follow a disciplined process instead -- making exactly one change per iteration -- how would you decide WHAT to change? What diagnostic framework would you use?"
   - Reveal: Explains the four-step loop (Run, Diagnose via PRAO phase, Hypothesize one change, Refine) and why single-change discipline matters for attribution.

2. **Step-walkthrough** (`m04-iteration-loop`) -- 4 steps
   - Step 1: "Run" -- execute the prompt, collect complete output
   - Step 2: "Diagnose" -- which PRAO phase failed? (Perceive = missing context, Reason = ambiguous task, Act = wrong format, Observe = misinterpreted feedback)
   - Step 3: "Hypothesize" -- form one falsifiable hypothesis
   - Step 4: "Refine" -- apply the single change, re-run

3. **Agent-trace** (`m04-iteration-trace`, variant: `annotated`, mode: `manual`) -- Shows a concrete prompt iteration cycle
   - Step 1: User sends a GCCF-style prompt for code review
   - Step 2: Agent produces output with generic patterns (not project conventions)
   - Step 3: Developer diagnoses: Perceive failure -- missing pattern context
   - Step 4: Developer adds a pattern example from the codebase
   - Step 5: Agent produces output matching project conventions
   - Annotations explain the diagnostic reasoning at each step

4. **Reveal-quiz** (`m04-failure-diagnosis`) -- 6 failure symptoms, student clicks to reveal diagnosis
   - "Output uses generic patterns" -> Perceive -- add pattern context
   - "Output modifies out-of-scope files" -> Reason -- add scope constraint
   - "Output format has wrong field names" -> Act -- add explicit schema
   - "Output too broad" -> Reason -- replace vague verb
   - "Output ignores edge case" -> Perceive -- add edge case example
   - "Output proceeds without waiting" -> Act -- rewrite approval constraint

5. **Callout** (`key-concept`): "One hypothesis, one change. Making exactly one modification per iteration preserves your ability to attribute improvements to specific changes. A prompt that converged in four iterations with one change each is better understood than one that 'worked' after five simultaneous changes."

### Section: Module 04 Knowledge Check

**Quiz** (`m04-knowledge-check`, 5 questions, xp: 15):

Q1. A developer asks Claude to "fix the authentication bugs." The output is technically correct but addresses the wrong bugs. Which TCEF element was most likely missing?
- A) Format -- the output structure was wrong
- B) **Task -- the verb "fix" is underspecified; precise scope was missing** (correct)
- C) Examples -- Claude needed more few-shot examples
- D) Context -- Claude did not have the right files

Q2. You are building a prompt for Claude to generate API endpoint handlers that match your codebase style. Which context injection strategy is most effective?
- A) Audience context -- specify who reads the code
- B) State context -- describe recent changes
- C) **Pattern context -- include a short excerpt of an existing handler from your codebase** (correct)
- D) Constraint context -- list what must not change

Q3. A TCEF prompt produces correct JSON output, but the field is named `findings` when your parser expects `issues`. What should you add?
- A) More examples showing the correct field name
- B) A constraint saying "do not rename fields"
- C) Pattern context from a working response
- D) **An explicit output schema in the Format element with exact field names** (correct)

Q4. (TRICKY) You add three changes to a failing prompt simultaneously: pattern context, a scope constraint, and a format schema. The output improves. What is the problem with this approach?
- A) Three changes is too many for Claude to process
- B) **You cannot attribute the improvement to any specific change, so you do not know which elements were actually necessary** (correct)
- C) Pattern context and format schema conflict with each other
- D) Scope constraints should always be added last

Q5. Which of these is a meaningful, enforceable constraint?
- A) "Follow best practices for error handling"
- B) "Make sure the code is secure"
- C) **"Use parameterized queries for all database calls -- no string concatenation in SQL"** (correct)
- D) "Keep the code clean and readable"

### Module 04 Component Count

| Component | Count |
|-----------|-------|
| `module-hero` | 1 |
| `objective` | 6 |
| `predict-reveal` | 3 |
| `click-cards` | 2 |
| `tabbed-panel` | 2 |
| `step-walkthrough` | 1 |
| `agent-trace` (annotated, manual) | 1 |
| `scenario-quiz` | 1 |
| `reveal-quiz` | 1 |
| `compare` | 1 |
| `quiz` | 1 |
| `callout` | 5 |
| `ix-collapse` | 4 |
| **Total interactive elements** | **29** |

---

## Module 05: MCP Architecture

### Hero Section

```html
<div class="ix-diagram" data-component="module-hero">
<div class="ix-hero">
<div class="ix-hero-bg"></div>
<div class="ix-hero-module-num">Module 05</div>
<div class="ix-hero-title">MCP Architecture</div>
<div class="ix-hero-subtitle">Understand the Model Context Protocol -- the standard that makes AI agents extensible, composable, and auditable</div>
<div class="ix-hero-chips">
<span class="ix-hero-chip">The Extension Problem</span>
<span class="ix-hero-chip">Three MCP Primitives</span>
<span class="ix-hero-chip">Tool Schema Design</span>
<span class="ix-hero-chip">Transport Configuration</span>
<span class="ix-hero-chip">MCP in the Agentic Loop</span>
</div>
</div>
</div>
```

### Overview

- **Objective**: Explain MCP's role in the agentic ecosystem, distinguish the three primitives, read tool schemas, and configure local and remote MCP connections.
- **Spiral connection**: "In Module 02, you connected your first MCP server and saw how it extends Claude Code's built-in tools. Now let's understand the architecture underneath -- the protocol, the primitives, and the design principles that make MCP servers composable and portable."

### Section 5.1: The Extension Problem MCP Solves

**Objective**: Explain the specific problem MCP solves and why a standard protocol is necessary for AI agent extensibility.

**Components**:

1. **Predict-reveal** (`m05-extension-predict`) -- BEFORE any explanation
   - Prompt: "Imagine you need to give an AI agent access to your company's internal project tracker. Without a standard protocol, what steps would you need to take? Think about prompt engineering, parsing, error handling, and reusability. What would be painful about this approach?"
   - Reveal: Walks through the six-step bespoke integration pain (system prompt, custom wrapper, ad-hoc parsing, no reuse) and introduces MCP as the standardization layer.

2. **Timeline** (`m05-before-after-mcp`) -- 2 stages showing Before MCP and After MCP
   - Stage 1 "Before MCP": Bespoke integration per capability -- custom prompts, custom parsing, fragile, no sharing, no auditing
   - Stage 2 "After MCP": Standard protocol -- discovery, invocation, schema, transport are all standardized. Implement once, use everywhere.

3. **Callout** (`core-idea`): "MCP is to AI agent capabilities what USB-C is to hardware peripherals. One standard interface means any MCP client (Claude Code, any compatible framework) connects to any MCP server. The capability author implements once; every client benefits."

4. **Click-cards** (`m05-mcp-standardizes`) -- 4 cards for the 4 things MCP standardizes
   - Card 1: "Discovery" -- icon: `search` -- `tools/list`, `resources/list`, `prompts/list`
   - Card 2: "Invocation" -- icon: `play` -- `tools/call`, `resources/read`, `prompts/get`
   - Card 3: "Schema" -- icon: `file-json` -- JSON Schema for tool inputs, URI patterns for resources
   - Card 4: "Transport" -- icon: `cable` -- stdio for local, Streamable HTTP for remote

5. **Collapse**: Move extended prose about the USB-C analogy and the pre-MCP integration steps.

### Section 5.2: The Three Primitives

**Objective**: Distinguish the three MCP primitives -- Tools, Resources, and Prompts -- and identify the correct primitive for a given capability.

**Components**:

1. **Predict-reveal** (`m05-primitives-predict`) -- BEFORE primitive explanation
   - Prompt: "MCP servers expose capabilities through exactly three primitives. One is for actions with side effects, one is for passive data the agent reads, and one is for reusable instruction templates. Before we name them, think about a database MCP server: it can run queries, expose the schema for reference, and offer a 'SQL helper' template. Which of these three capabilities would you classify as which primitive type, and why?"
   - Reveal: Names the three primitives (Tools = verbs/actions, Resources = nouns/data, Prompts = templates) and maps the database example.

2. **Click-cards** (`m05-three-primitives`) -- 3 cards
   - Card 1: "Tools" -- icon: `wrench` -- data-phase: `act` -- callable functions with typed parameters, side effects, return results. Examples: `search_issues`, `create_pr`, `run_query`. "The agent's action vocabulary."
   - Card 2: "Resources" -- icon: `database` -- data-phase: `observe` -- addressable data objects read by URI. Examples: `db://users/schema`, `file://README.md`. "Passive context the agent reads."
   - Card 3: "Prompts" -- icon: `message-square` -- data-phase: `perceive` -- parameterized instruction templates. Examples: `code_review`, `incident_report`. "Reusable templates, not executors."

3. **Callout** (`key-concept`): "The conceptual shorthand: Tools are verbs, Resources are nouns, Prompts are templates. A common mistake is exposing everything as Tools. Resources can be cached and prefetched; Prompts can be listed and selected. The distinctions matter architecturally."

4. **Decision-tree** (`m05-categorization-test`) -- The categorization test
   - Root: "New capability -- which primitive?"
   - Branch 1: "Does the operation have side effects or call an external system?" -> Yes: Tool. No -> next
   - Branch 2: "Is the data stable, identified by a URI?" -> Yes: Resource. No -> next
   - Branch 3: "Is the value in the parameterized template itself?" -> Yes: Prompt. No: "Reconsider the design."

5. **Reveal-quiz** (`m05-primitive-sorting`) -- 8 capabilities, student clicks to reveal which primitive
   - `execute_query(sql)` -> Tool (side effects, variable inputs)
   - `db://schema/users` -> Resource (stable data, URI-addressable)
   - `code_review_template(language)` -> Prompt (parameterized template)
   - `create_pr(title, body, branch)` -> Tool (creates state)
   - `config://app/settings` -> Resource (read-only config)
   - `get_schema()` with no params -> Misclassified! Should be Resource (common mistake highlight)
   - `incident_report(severity, desc)` -> Prompt (instruction template)
   - `search_issues(query)` -> Tool (real-time external query)

6. **Collapse**: Move the extended descriptions of each primitive, the "appropriate for" lists, and the detailed examples.

### Section 5.3: Reading Tool Schemas

**Objective**: Interpret a complete MCP server tool schema including name, description, input schema, required vs. optional fields, and enum constraints.

**Components**:

1. **Tabbed-panel** (`m05-schema-anatomy`) -- 4 tabs dissecting the `search_issues` schema
   - Tab "Name + Description": Shows the name field and the full description. Highlights the three-part structure: action, when to use, what it returns. Contrast: human-readable vs. Claude-readable description.
   - Tab "Properties": Shows each property with type, description, and constraints. Highlights `enum` on status field, `default` values, `minimum`/`maximum` on limit.
   - Tab "Required vs Optional": Shows the `required` array. Explains why `query` is required but `status`, `assignee`, `limit` are optional (useful defaults exist).
   - Tab "Full Schema": The complete JSON schema for reference.

2. **Compare** (`m05-description-quality`) -- Side-by-side: human-readable vs. Claude-readable description
   - Left: "Searches issues in the project tracker." (vague, no disambiguation, no return description)
   - Right: Full description with action + when-to-use + what-it-returns + disambiguation

3. **Callout** (`tip`): "A tool description optimized for Claude answers three questions: what does this tool do, when should I use it (vs. alternatives), and what will I get back? If you can give Claude just the description and it accurately explains when to use the tool, the description is good."

4. **Collapse**: Move the extended explanation of required vs. optional design guidelines and the enum constraint prose.

### Section 5.4: Transport Configuration

**Objective**: Configure both local (stdio) and remote (Streamable HTTP) MCP connections and understand the connection handshake.

**Components**:

1. **Tabbed-panel** (`m05-transport-types`) -- 3 tabs
   - Tab "stdio (Local)": JSON config example with `command`, `args`, `env`. Explanation: child process, stdin/stdout JSON. The `claude mcp add` CLI command.
   - Tab "Streamable HTTP (Remote)": JSON config with `url`, `headers`. Explanation: HTTP POST for requests, streaming responses. `${VAR_NAME}` for secrets.
   - Tab "SSE (Deprecated)": Brief example with warning. "Superseded by Streamable HTTP. Migrate for new builds."

2. **Callout** (`warning`): "SSE (Server-Sent Events) was the original remote transport. It is deprecated as of 2025-03-26. Use Streamable HTTP for all new remote MCP server configurations."

3. **Step-walkthrough** (`m05-connection-handshake`) -- 3 steps
   - Step 1: "Initialize" -- client sends protocol version and capabilities; server responds with its version. Incompatible versions fail here.
   - Step 2: "List Capabilities" -- client requests `tools/list`, `resources/list`, `prompts/list`. Server returns all schemas. Claude loads them for the session.
   - Step 3: "Available" -- connection active. Claude can call tools, read resources, request prompts. Persists until session end.

4. **Collapse**: Move extended discussion of transport mechanics, the CLI command examples, and the SSE migration notes.

### Section 5.5: MCP and the Agentic Loop (PRAO)

**Objective**: Map how MCP primitives integrate into each phase of the Agentic Loop.

**Components**:

1. **Agent-trace** (`m05-mcp-prao-trace`, variant: `prao`, speed: 0.5, auto-play) -- Shows a complete PRAO cycle for "find all open issues assigned to the current user"
   - Perceive: Claude reads `search_issues` tool schema at session start
   - Perceive: Claude reads `config://user/current` resource
   - Reason: Claude determines `search_issues` with `assignee="jsmith"` and `status="open"` matches the task
   - Act: Claude calls `search_issues({"query": "", "assignee": "jsmith", "status": "open"})`
   - Observe: Claude receives 7 results, proceeds to present them

2. **Callout** (`core-idea`): "Each PRAO phase has a distinct MCP failure mode. Perceive failure: tool schema was insufficient. Reason failure: Claude chose the wrong tool or arguments. Act failure: server error during tool call. Observe failure: Claude misinterpreted the result."

3. **Collapse**: Move the extended mapping of each phase to MCP primitives and the failure mode descriptions.

### Section: Module 05 Knowledge Check

**Quiz** (`m05-knowledge-check`, 5 questions, xp: 15):

Q1. Your database MCP server needs to expose the users table schema so Claude can write correct SQL. Which primitive should you use?
- A) Tool -- Claude calls `get_schema("users")` to retrieve it
- B) **Resource -- expose it at `db://schema/users` as addressable data** (correct)
- C) Prompt -- create a template that includes the schema
- D) Tool with no parameters that returns the schema

Q2. What three things should a tool description optimized for Claude include?
- A) Name, version number, and author
- B) Input types, output types, and error codes
- C) **What the tool does, when to use it vs. alternatives, and what it returns** (correct)
- D) Installation instructions, dependencies, and configuration

Q3. A tool schema has `"status": {"type": "string"}` with no enum constraint. What risk does this create?
- A) Claude will refuse to use the tool
- B) The tool will crash on any input
- C) **Claude may generate invalid values like "pending" or "active" that the tool does not accept** (correct)
- D) Claude will always pass null for this field

Q4. (TRICKY) You configure a remote MCP server with `"transport": "sse"`. What should you do?
- A) Add `"streaming": true` to enable full functionality
- B) Nothing -- SSE is the standard remote transport
- C) **Migrate to Streamable HTTP -- SSE is deprecated as of 2025-03-26** (correct)
- D) Switch to stdio since SSE only works locally

Q5. During the MCP connection handshake, at which phase does Claude learn what tools the server provides?
- A) Phase 1: Initialize -- the server sends tools with its protocol version
- B) **Phase 2: List Capabilities -- the client requests `tools/list` and the server returns all schemas** (correct)
- C) Phase 3: Available -- tools are discovered lazily on first use
- D) Before connection -- tools are listed in `settings.json`

### Module 05 Component Count

| Component | Count |
|-----------|-------|
| `module-hero` | 1 |
| `objective` | 6 |
| `predict-reveal` | 2 |
| `click-cards` | 2 |
| `tabbed-panel` | 2 |
| `timeline` | 1 |
| `decision-tree` | 1 |
| `step-walkthrough` | 1 |
| `agent-trace` (prao, auto-play) | 1 |
| `reveal-quiz` | 1 |
| `compare` | 1 |
| `quiz` | 1 |
| `callout` | 5 |
| `ix-collapse` | 5 |
| **Total interactive elements** | **30** |

---

## Module 06: Building MCP Servers

### Hero Section

```html
<div class="ix-diagram" data-component="module-hero">
<div class="ix-hero">
<div class="ix-hero-bg"></div>
<div class="ix-hero-module-num">Module 06</div>
<div class="ix-hero-title">Building MCP Servers</div>
<div class="ix-hero-subtitle">Design primitive sets, implement servers with the TypeScript SDK, write schemas Claude uses correctly, and handle production edge cases</div>
<div class="ix-hero-chips">
<span class="ix-hero-chip">Primitive Selection Framework</span>
<span class="ix-hero-chip">TypeScript SDK</span>
<span class="ix-hero-chip">Schema Design for LLMs</span>
<span class="ix-hero-chip">Error Handling Patterns</span>
<span class="ix-hero-chip">Production Hardening</span>
</div>
</div>
</div>
```

### Overview

- **Objective**: Design primitive sets, implement a minimal stdio MCP server, write effective tool schemas, and handle production error cases.
- **Spiral connection**: "Module 05 established the architecture of MCP -- the three primitives, the transports, and the connection handshake. Now we translate that understanding into implementation. You will design before you build, because poor primitive selection produces servers that technically work but that Claude uses poorly."

### Section 6.1: Design Principles for MCP Servers

**Objective**: Apply three design principles -- single responsibility, primitive selection, and authentication scoping -- before writing any server code.

**Components**:

1. **Predict-reveal** (`m06-design-predict`) -- BEFORE design principles
   - Prompt: "You are about to build an MCP server. Before writing any code, what design decisions do you think you need to make? Consider: how many domains should one server cover, how you decide what gets exposed as a Tool vs. a Resource vs. a Prompt, and how you handle credentials. What could go wrong if you skip this design step?"
   - Reveal: Names the three design decisions (domain scope, primitive classification, auth boundaries) and explains why "everything as Tools" is the most common design mistake.

2. **Entry-list** (`m06-server-boundaries`) -- Good vs. bad domain boundaries
   - Include (green): "GitHub server: repo ops, PRs, issues," "Database server: queries, schema, migration status," "Slack server: messaging, channels, users"
   - Exclude (red): "Infrastructure server: GitHub + DB + Slack + AWS," "All-in-one server: every external system through one endpoint"

3. **Decision-tree** (`m06-primitive-selection`) -- Reuse from M05 but with design focus
   - Same categorization test but with additional leaf nodes showing common misclassifications:
     - "Exposing schema as `get_schema()` Tool" -> "Should be Resource at `db://schema`"
     - "Exposing query with no parameters as Tool" -> "Should be Resource if query is always the same"
     - "Embedding prompt templates in tool descriptions" -> "Should be Prompt primitive"

4. **Callout** (`tip`): "A practical rule of thumb: if a server has more than 15 tools, examine whether it should be split into two servers. Tool selection quality degrades as tool count grows."

5. **Click-cards** (`m06-auth-boundaries`) -- 3 cards showing auth scoping examples
   - Card 1: "Read-only analytics" -- icon: `eye` -- database read-only credentials
   - Card 2: "PR review assistant" -- icon: `git-pull-request` -- `repo:read`, `pull_requests:read`
   - Card 3: "Issue management" -- icon: `list-checks` -- issue read/write, no admin

6. **Collapse**: Move extended prose on security isolation and maintainability rationale.

### Section 6.2: The MCP SDK (TypeScript)

**Objective**: Implement a minimal stdio MCP server using the TypeScript SDK, defining tools, resources, and prompts.

**Components**:

1. **Step-walkthrough** (`m06-sdk-setup`) -- 4 steps for project setup
   - Step 1: "Initialize project" -- `npm init -y` + install commands
   - Step 2: "File structure" -- the 3-file layout (`src/index.ts`, `package.json`, `tsconfig.json`)
   - Step 3: "Server skeleton" -- the `McpServer` + `StdioServerTransport` boilerplate. Key note: `console.error` for logging (stdout reserved for protocol).
   - Step 4: "Run and test" -- `npx tsx src/index.ts` and `claude mcp add` command

2. **Tabbed-panel** (`m06-primitive-implementation`) -- 3 tabs showing how to define each primitive
   - Tab "Tool": The `server.tool()` call with Zod schema for `search_issues`. Highlights: `.describe()` on each field, return structure `{ content: [{ type: "text", text: ... }] }`.
   - Tab "Resource": The `server.resource()` call with URI, description, and content return. Highlights: URI naming convention, `mimeType`.
   - Tab "Prompt": The `server.prompt()` call with Zod arguments and `messages` return. Highlights: `role: "user"` in returned message, parameterized template construction.

3. **Callout** (`warning`): "The MCP protocol uses stdout for communication. All diagnostic output -- logging, errors, debug messages -- must go to stderr via <code>console.error()</code>. Any non-protocol output on stdout corrupts the communication channel."

4. **Collapse**: Move the full TypeScript code listings into Deep Dive. Keep only key snippets inline.

### Section 6.3: Writing Tool Schemas That Work

**Objective**: Write tool schemas with descriptions and input specifications that Claude uses correctly on the first attempt.

**Components**:

1. **Compare** (`m06-schema-quality`) -- Side-by-side: bad schema vs. good schema
   - Left: Vague name (`search`), no description detail ("Searches the system"), `q` parameter, no enum
   - Right: Clear name (`search_issues`), three-part description, descriptive parameter names, enum on status, defaults, min/max on limit

2. **Click-cards** (`m06-schema-mistakes`) -- 3 common schema mistakes
   - Card 1: "Too Vague" -- icon: `cloud-fog` -- Claude cannot decide when to use the tool. Fix: add disambiguation ("Do not use this tool to... use X instead").
   - Card 2: "Missing Constraints" -- icon: `alert-circle` -- Claude passes invalid values. Fix: add `enum` for fixed value sets.
   - Card 3: "Wrong Required Fields" -- icon: `toggle-left` -- Claude omits necessary inputs or always specifies optional ones. Fix: mark required only when tool cannot function without it.

3. **Callout** (`tip`): "Test your schema by running Claude Code with the server connected and asking it to use the tool in different ways. If Claude calls the wrong tool, the description needs disambiguation. If it passes wrong arguments, improve field descriptions."

4. **Collapse**: Move the full bad/good schema JSON examples and the testing methodology prose.

### Section 6.4: Error Handling and Robustness

**Objective**: Handle errors using the `isError` flag pattern and implement timeout and partial result strategies.

**Components**:

1. **Tabbed-panel** (`m06-error-patterns`) -- 3 tabs
   - Tab "Structured Errors": The `isError: true` pattern with try/catch. When to use: resource not found, permission denied, rate limiting, invalid arguments.
   - Tab "Timeouts": AbortController pattern with 10-second timeout. Useful error message: "Search timed out after 10 seconds. Try a more specific query or smaller limit."
   - Tab "Partial Results": The bulk operation pattern returning `{ retrieved: [], failed: [], summary: "" }`. `isError` only when NOTHING succeeded.

2. **Intervention** (`m06-error-decision`) -- When to return structured error vs. throw exception
   - "Structured error result (`isError: true`)" (green/hold): recoverable -- resource not found, insufficient permissions, rate limiting, invalid arguments
   - "Throw exception" (red/intervene): unrecoverable -- missing server credentials, infrastructure failure, bugs

3. **Callout** (`key-concept`): "When <code>isError: true</code> is set, Claude understands the tool invocation failed and treats the content as an error message. This lets Claude reason about the failure -- retry, try alternatives, or report to the user -- rather than misinterpreting error text as data."

4. **Collapse**: Move the full TypeScript code examples for each error pattern.

### Section 6.5: Production Considerations

**Objective**: Apply production hardening practices for secrets, logging, and versioning.

**Components**:

1. **Click-cards** (`m06-production-checklist`) -- 3 cards
   - Card 1: "Secrets" -- icon: `lock` -- env vars only, `${VAR_NAME}` in config, fail fast at startup with clear error
   - Card 2: "Logging" -- icon: `scroll` -- log every invocation to stderr: tool name, arguments, result count, elapsed time, errors
   - Card 3: "Versioning" -- icon: `tag` -- semver: major = breaking changes (removing tools, changing types), minor = additions, patch = fixes

2. **Callout** (`warning`): "Never hardcode secrets in server code or configuration files. Store credentials in environment variables. Reference them with <code>${VAR_NAME}</code> in the MCP client config. Failing fast at startup with a clear error message is better than failing mysteriously at the first tool call."

3. **Agent-trace** (`m06-logging-trace`, variant: `terminal`, speed: 0.5, auto-play) -- Shows stderr logging output during a tool invocation
   - Prompt: "Find open issues about the login feature"
   - Think: Agent selects `search_issues` tool
   - Tool: `search_issues(query="login feature", status="open")`
   - Result (stderr log): `[search_issues] called with query="login feature" status="open" assignee=any limit=20`
   - Result (stderr log): `[search_issues] returned 3 results in 142ms`
   - Response: Agent presents the 3 issues

4. **Collapse**: Move the full logging code pattern and the versioning rules table into Deep Dive.

### Section: Module 06 Knowledge Check

**Quiz** (`m06-knowledge-check`, 5 questions, xp: 15):

Q1. You are designing an MCP server and have a capability that exposes the database schema. How should you expose it?
- A) As a Tool called `get_schema()` with no parameters
- B) **As a Resource at `db://schema/tables` -- it is stable data read for context** (correct)
- C) As a Prompt that generates a schema description
- D) Embedded in the server description string

Q2. Why must all logging in an MCP server use `console.error()` instead of `console.log()`?
- A) `console.log()` is slower for high-throughput servers
- B) Error-level logging is required by the MCP specification
- C) **`stdout` is reserved for the MCP protocol -- any non-protocol output corrupts communication** (correct)
- D) `console.error()` provides stack traces automatically

Q3. A tool returns `{ content: [{ type: "text", text: "Issue 42 not found" }], isError: true }`. What does Claude do with this?
- A) Crashes the session with an error
- B) Displays the error to the user and stops
- C) Ignores the error and continues with the next tool
- D) **Treats the content as an error message and reasons about it -- may retry, try alternatives, or report to the user** (correct)

Q4. (TRICKY) Your MCP server has 22 tools covering GitHub operations, database queries, and Slack messaging. A developer reports Claude frequently calls the wrong tool. What is the most likely root cause?
- A) The tool descriptions are too long for Claude to process
- B) The server version is incompatible with Claude Code
- C) **The server covers too many domains -- tool selection degrades with count. Split into separate GitHub, database, and Slack servers.** (correct)
- D) Claude needs more training data on MCP tool selection

Q5. What is the difference between a major and minor version bump for an MCP server?
- A) Major = any tool change; minor = description changes
- B) **Major = breaking changes (removing tools, changing types); minor = non-breaking additions (new tools, optional fields)** (correct)
- C) Major = new features; minor = bug fixes
- D) Major = server restarts needed; minor = hot-reload compatible

### Module 06 Component Count

| Component | Count |
|-----------|-------|
| `module-hero` | 1 |
| `objective` | 6 |
| `predict-reveal` | 1 |
| `click-cards` | 3 |
| `tabbed-panel` | 2 |
| `step-walkthrough` | 1 |
| `entry-list` | 1 |
| `decision-tree` | 1 |
| `compare` | 1 |
| `intervention` | 1 |
| `agent-trace` (terminal, auto-play) | 1 |
| `quiz` | 1 |
| `callout` | 5 |
| `ix-collapse` | 5 |
| **Total interactive elements** | **30** |

---

## Spiral Learning Connections

### Module 04 References to M01-M03

| M04 Section | References | How It Builds |
|-------------|-----------|---------------|
| 4.1 GCCF Limits | M03 prompt patterns | "You used basic prompt patterns in M03 exercises. Now we see where they break." |
| 4.2 TCEF Pattern | M01 Agentic Loop concept | Task element connects to how Claude perceives instructions |
| 4.5 Iteration Loop | M01 PRAO phases | PRAO used as diagnostic lens: which phase failed? |
| 4.5 Iteration Loop | M03 reading agent output | "You learned to read agent traces in M03. Now use that skill to diagnose prompt failures." |

### Module 05 References to M01-M03

| M05 Section | References | How It Builds |
|-------------|-----------|---------------|
| Overview | M02 first MCP server | "You connected your first MCP server in M02. Now understand the architecture underneath." |
| 5.2 Primitives | M02 MCP intro | "M02 introduced MCP servers as external capabilities. Now we distinguish the three primitive types." |
| 5.4 Transport | M02 `settings.json` | "You configured `settings.json` in M02. Now understand the transport mechanics it controls." |
| 5.5 PRAO Integration | M01 Agentic Loop, M03 trace reading | "Map MCP primitives onto the PRAO phases you learned in M01 and traced in M03." |

### Module 06 References to M01-M05

| M06 Section | References | How It Builds |
|-------------|-----------|---------------|
| Overview | M05 architecture | "M05 established the architecture. Now we implement." |
| 6.1 Design | M05 categorization test | "Apply the categorization test from M05 at design time, before writing code." |
| 6.3 Schemas | M05 reading schemas | "In M05 you learned to read schemas. Now write them for Claude." |
| 6.3 Schemas | M04 TCEF descriptions | "Apply TCEF principles to tool descriptions -- they are prompts for Claude." |
| 6.4 Error handling | M03 observe phase | "Errors feed the Observe phase of the Agentic Loop. Good error messages help Claude reason about failures." |

---

## Agent Trace Animations

### Module 04

| Trace ID | Variant | Mode | Scenario | Lines | Rationale |
|----------|---------|------|----------|-------|-----------|
| `m04-iteration-trace` | annotated | manual | Prompt iteration: GCCF fails, diagnose Perceive failure, add pattern context, succeed | ~10 | Two-column reading (annotations explain diagnostic reasoning). Manual required. |

### Module 05

| Trace ID | Variant | Mode | Scenario | Lines | Rationale |
|----------|---------|------|----------|-------|-----------|
| `m05-mcp-prao-trace` | prao | auto-play | Complete PRAO cycle: find open issues via MCP tool | ~6 | Single column, demonstrates MCP in the Agentic Loop. Short, dramatic. |

### Module 06

| Trace ID | Variant | Mode | Scenario | Lines | Rationale |
|----------|---------|------|----------|-------|-----------|
| `m06-logging-trace` | terminal | auto-play | Server stderr logging during a tool invocation | ~6 | Single column, demonstrates production logging pattern. Short. |

---

## Quality Coordination Plan -- Agent Team Phases

### Phase 1: Parallel Build (3 agents)

**Team**: `course-builders` with 3 `frontend-architect` teammates

| Agent | Owns | Input |
|-------|------|-------|
| Builder-04 | `docs/curriculum/modules/04-prompt-engineering-depth.md` | This plan (M04 section) + all 3 spec docs |
| Builder-05 | `docs/curriculum/modules/05-mcp-architecture.md` | This plan (M05 section) + all 3 spec docs |
| Builder-06 | `docs/curriculum/modules/06-mcp-building.md` | This plan (M06 section) + all 3 spec docs |

**Instructions for each builder**:
1. Read MODULE-CREATION-GUIDE.md, CODING-ELEMENTS-SPEC.md, CONTENT-SPEC.md
2. Read the corresponding section of this plan
3. Read Module 02 as quality reference (first 300 lines for structure)
4. Transform the raw curriculum prose into interactive format following the plan exactly
5. Run through the Step 8 Quality Checklist before reporting completion
6. Report: total component count, any deviations from plan with rationale

**Estimated time**: 45-60 minutes per agent (parallel = 60 minutes total wall time)

### Phase 2: Code Review (1 agent)

**Agent**: `superpowers:code-reviewer` or `frontend-architect`

**Checklist** (from CODING-ELEMENTS-SPEC.md):
- [ ] No blank lines inside nested HTML divs (scan every `<div>` pair)
- [ ] No markdown syntax inside HTML blocks (`**bold**` -> `<strong>`, etc.)
- [ ] No inline `style` attributes for colors
- [ ] No emojis -- Lucide icons only
- [ ] All `data-component` values match registered types (22 types)
- [ ] All `data-diagram-id` values unique within each module
- [ ] All `ix-instruct` paragraphs present before every interactive
- [ ] All traces have `data-speed="0.5"`
- [ ] All `data-delay` values meet minimums (tool: 1500, think: 3500, response: 2500)
- [ ] Two-column traces have `data-default-mode="manual"`
- [ ] No `<div>` tags left unclosed

**Estimated time**: 20-30 minutes

### Phase 3: Accuracy Review (1 agent)

**Agent**: MERCURIO (anti-confabulation)

**Checklist**:
- [ ] No `--thinking` flag references
- [ ] No `--context` flag references
- [ ] No `/memory` command references
- [ ] SSE described as deprecated, Streamable HTTP as current
- [ ] Exactly THREE MCP primitives (Tools, Resources, Prompts) -- no fourth
- [ ] `settings.json` format correct: `{"permissions": {"allow": [...], "deny": [...]}}`
- [ ] CLAUDE.md described as read at session start, not invoked
- [ ] All tool schema examples use valid MCP SDK patterns
- [ ] Zod usage matches current `@modelcontextprotocol/sdk` API
- [ ] Transport configuration matches current Claude Code patterns
- [ ] PRAO terminology correct: "Agentic Loop (PRAO)" not "PRAO Loop"

**Estimated time**: 15-20 minutes

### Phase 4: Content Review (1 agent)

**Agent**: Content specialist (CONTENT-SPEC.md compliance)

**Checklist**:
- [ ] Every section follows mandatory order: objective, brief intro, instruct, interactive, collapse
- [ ] Learning objectives FIRST in every section
- [ ] No more than 2-3 sentences before first interactive
- [ ] All prose blocks > 3-4 lines collapsed
- [ ] Predict-reveals BEFORE explanations (no text gives away answers)
- [ ] Spiral learning: references M01-M03, does not re-explain
- [ ] Quizzes: 4+ questions, 1+ tricky per quiz
- [ ] All quiz reference material visible (not collapsed)
- [ ] Maximum 2 callouts per section
- [ ] No stacked callouts (> 2 consecutive)
- [ ] Questions test understanding/application, not recall

**Estimated time**: 15-20 minutes

### Phase 5: Fix Issues

**Agent**: Original builders fix issues found in Phases 2-4

**Estimated time**: 15-30 minutes

### Phase 6: Deploy

**Command**:
```bash
cd /Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course
npx vercel deploy --prod --yes --scope manu-mulaveesalas-projects
```

**Estimated total pipeline time**: ~2 hours (60 min build + 30 min reviews + 30 min fixes)

---

## Summary Statistics

### Per-Module Component Counts

| Component | M04 | M05 | M06 | Total |
|-----------|-----|-----|-----|-------|
| `module-hero` | 1 | 1 | 1 | 3 |
| `objective` | 6 | 6 | 6 | 18 |
| `predict-reveal` | 3 | 2 | 1 | 6 |
| `click-cards` | 2 | 2 | 3 | 7 |
| `tabbed-panel` | 2 | 2 | 2 | 6 |
| `step-walkthrough` | 1 | 1 | 1 | 3 |
| `agent-trace` | 1 | 1 | 1 | 3 |
| `decision-tree` | 0 | 1 | 1 | 2 |
| `timeline` | 0 | 1 | 0 | 1 |
| `entry-list` | 0 | 0 | 1 | 1 |
| `intervention` | 0 | 0 | 1 | 1 |
| `scenario-quiz` | 1 | 0 | 0 | 1 |
| `reveal-quiz` | 1 | 1 | 0 | 2 |
| `compare` | 1 | 1 | 1 | 3 |
| `quiz` | 1 | 1 | 1 | 3 |
| `callout` | 5 | 5 | 5 | 15 |
| `ix-collapse` | 4 | 5 | 5 | 14 |
| **Total** | **29** | **30** | **30** | **89** |

### Quiz Questions

| Module | Questions | Tricky |
|--------|-----------|--------|
| M04 | 5 | 1 (Q4: attribution problem with multiple changes) |
| M05 | 5 | 1 (Q4: SSE deprecation) |
| M06 | 5 | 1 (Q4: server domain splitting) |
| **Total** | **15** | **3** |

### Key Content Decisions

1. **M04: TCEF as primary framework** -- The source material establishes TCEF (Task, Context, Examples, Format) as the professional prompt engineering framework. This is taught as an upgrade from GCCF (introduced earlier in the course). The transition is framed as "why basic patterns break" rather than "basic patterns are wrong."

2. **M04: Context signal/noise exercise as scenario-quiz** -- The "eight fragments, identify three signal" exercise is highly pedagogical and maps perfectly to the scenario-quiz component (terminal replay showing the task + multi-choice classification).

3. **M04: PRAO as diagnostic lens for prompt iteration** -- The prompt iteration loop is explicitly grounded in PRAO phases, creating a strong spiral learning connection back to M01.

4. **M05: Mermaid diagrams replaced with interactive components** -- The source has two Mermaid diagrams (primitives overview, transport architecture). These are replaced with click-cards and tabbed-panels respectively, which are more interactive and match the course's component system.

5. **M05: Categorization test as decision-tree + reveal-quiz combo** -- The primitives categorization test uses both a decision-tree (for the logic flow) and a reveal-quiz (for hands-on practice sorting 8 capabilities). This dual approach teaches the framework then tests application.

6. **M06: Design-before-implementation emphasis** -- The source material explicitly warns against jumping to code. The plan puts design principles (6.1) with rich interactives before any SDK code (6.2), reinforcing this principle structurally.

7. **M06: `isError` pattern as intervention component** -- The structured error vs. exception decision maps cleanly to the intervention component (green = hold/return structured error, red = intervene/throw exception), which was underutilized in M01-M03.

8. **Cross-module: Agent traces kept minimal** -- Only 3 traces total (1 per module), all short (6-10 lines), with clear pedagogical purpose. M04 gets the most complex trace (annotated, manual) because it teaches diagnostic reasoning. M05 and M06 get simpler terminal/prao traces for demonstration.

9. **Cross-module: Predict-reveals front-loaded** -- M04 has 3 predict-reveals (one per major concept introduction). M05 has 2 (extension problem, primitives). M06 has 1 (design decisions). This follows the principle of more prediction in conceptual modules, less in implementation modules where code examples carry the weight.

10. **SSE deprecation handled explicitly** -- M05 Section 5.4 includes a dedicated tab for SSE with a clear deprecation warning callout. This prevents the content accuracy violation (zero tolerance) and teaches students to recognize deprecated patterns.
