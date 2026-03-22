# Day 2a Module Multimedia Prompts

> **Usage**: Pass the text under each heading directly as the `focus_prompt` parameter to
> `video_overview_create` or `slide_deck_create` in NotebookLM. Do not paraphrase.
>
> **Accuracy constraints enforced in every prompt**:
> - MCP has exactly THREE primitives: Tools, Resources, Prompts (not four, not two)
> - Remote MCP transport = Streamable HTTP only (SSE deprecated 2025-03-26)
> - TCEF and GCCF are proprietary course frameworks — do not attribute them to external sources

---

## Module 04: Prompt Engineering Depth

### Video Focus Prompt

Focus EXCLUSIVELY on Module 04: Prompt Engineering Depth. Do NOT cover MCP architecture, agent
reasoning traces, PRAO annotation from Module 03, or skill YAML files from Module 07. This
video is a standalone deep-dive on structured prompt design and systematic iteration.

Open by establishing the central contrast: the GCCF pattern (Goal + Context + Constraints +
Format) is solid for narrow, well-scoped tasks, but breaks under three specific real-world
engineering conditions. Name those three failure modes explicitly and visibly:

1. Tasks with multiple valid interpretations (e.g., "refactor" without a precise verb)
2. Tasks that require matching a codebase's specific style or convention, not generic best practice
3. Tasks whose output feeds a downstream automated system that requires schema-exact output

Make the transition unmistakable: TCEF (Task + Context + Examples + Format) was designed to
close exactly these three gaps. The presenter should treat TCEF and GCCF as course-specific
frameworks, not external academic citations.

**Concept 1 — The TCEF Pattern (central anchor)**
Draw a 2x2 whiteboard table: rows are GCCF vs. TCEF, columns are "What it specifies" vs.
"What it leaves unresolved." Fill in each cell with concrete content. The key insight for
each TCEF element:
- Task: precise verb + measurable outcome (not vague verbs like "improve", "fix", "enhance")
- Context: five distinct injection strategies (File Reference, Pattern, Constraint, Audience,
  State) — each is a named strategy with its own use case, not a single undifferentiated blob
- Examples: the principle "one concrete example replaces three paragraphs of abstract rules" —
  demonstrate this live by showing a JSON code review object and the abstract rule list it replaces
- Format: treated as a machine-readable contract (an output schema), not a stylistic preference

**Concept 2 — Five Context Injection Strategies**
Draw a vertical decision tree on the whiteboard. The trunk is "What does Claude need to produce
the right output for THIS codebase vs. a generic codebase?" The five branches are File Reference,
Pattern, Constraint, Audience, and State. For each branch, name one task type where that strategy
is the primary lever. Emphasize that irrelevant context is not neutral — it degrades output quality
by diluting the signal-to-noise ratio.

**Concept 3 — The Signal vs. Noise Exercise**
Present the "Context Quality Exercise" as a live sorting exercise. Show eight context fragments
for the task "Add JSDoc to all exported functions in utils/format.ts." Walk through each fragment
and label it Signal or Noise. The reveal: only three fragments are signal. This should be a
presenter-drawn T-chart on the whiteboard (left: Signal, right: Noise).

**Concept 4 — Constraint Specification: Four Categories**
Draw four labeled boxes: Scope, Compatibility, Style, Approval. For each, show one ❌ meaningless
constraint and its ✅ specific, verifiable replacement. Spend the most time on the Approval
constraint — explain why it is the most important safety mechanism in agentic workflows and what
a well-formed approval constraint must specify (what to show, what format, what to wait for).

**Concept 5 — Prompt Iteration as a Debugging Discipline**
This is NOT about guessing. Draw the four-step iteration loop as a cycle diagram (not a linear
flowchart): Run → Diagnose (which PRAO phase failed?) → Hypothesize (one change theory) →
Refine → Run again. The discipline of making exactly ONE change per iteration is the core message.
Show the failure symptom table: match each symptom to its diagnosis and prescribed fix. The
presenter should say explicitly: "If you change three things and it improves, you have learned
nothing about why."

**Diagram 1 — TCEF Element Functions (Whiteboard)**
Draw four horizontal rows, each labelled with a TCEF element. In column 1: what the element
specifies. In column 2: the engineering failure mode it prevents. In column 3: a one-line
example of a well-formed instance. This replaces any abstract explanation of the framework.

**Diagram 2 — Prompt Iteration Cycle (Whiteboard)**
A circular flow: Run → Diagnose (PRAO phase?) → Hypothesize (one change) → Apply → Run.
Annotate each arrow with the rule it enforces: Diagnose must precede Hypothesize, Hypothesize
must be a single falsifiable theory, Apply must be exactly one change. Add callouts at Diagnose
showing the four failure modes: Perceive / Reason / Act / Observe.

Duration: 15–22 minutes. Allocate roughly 5 minutes to the TCEF pattern walkthrough, 4 minutes
to the five context strategies with the signal/noise exercise, 4 minutes to constraint categories
with the approval constraint in detail, and 5 minutes to the iteration cycle with the failure
symptom table.

EXCLUSION CLAUSE: Do not introduce chain-of-thought prompting, system prompts, few-shot learning
as general academic techniques, or any reference to PRAO as a reasoning model trace framework.
PRAO appears here only in the context of diagnosing prompt iteration failures — not as an agent
observation mechanism.

---

### Slide Deck Focus Prompt

Focus EXCLUSIVELY on Module 04: Prompt Engineering Depth. Do NOT include slides about MCP,
agent architectures, tool schemas, or reasoning model traces. Every slide must anchor to one
of the five concepts: GCCF failure modes, TCEF pattern, context injection strategies, constraint
specification, or prompt iteration discipline.

**Slide 1 — Opening Hook**
Title: "Your Prompt Failed. Now What?"
Visual: A split screen. Left side: a well-intentioned GCCF prompt for "Refactor the auth module."
Right side: three different outputs Claude might produce, each valid, each wrong. No text beyond
the slide title and the two panels. The hook is the visual demonstration that vague prompts
produce unpredictable outputs.

**Slide 2 — Three Ways GCCF Breaks Down**
Title: "GCCF: Good Foundation, Real Ceiling"
Three numbered items, each with a single-sentence failure mode and a one-phrase example:
1. Multiple valid interpretations — "refactor" admits dozens of correct actions
2. Style/pattern requirements — GCCF context describes patterns, doesn't demonstrate them
3. Downstream system consumption — format precision is a correctness requirement, not a preference
No bullets beyond these three. One slide, three items.

**Slide 3 — Introducing TCEF**
Title: "TCEF: The Professional-Grade Framework"
A four-box grid: Task | Context | Examples | Format. Each box contains only: the element name,
a two-word function description ("Precise verb", "Injection strategy", "Pattern demonstration",
"Output contract"), and the GCCF failure mode it addresses. This slide is a reference card,
not a prose explanation.

**Slide 4 — Task Element Deep Dive**
Title: "Task: Precise Verb + Measurable Outcome"
Two columns. Left: "Verbs to avoid" list (improve, update, fix, enhance, refactor, review).
Right: "Precision verbs" list (add, remove, convert, extract, rename, replace, wrap, generate,
validate, list). Below: a before/after pair — the imprecise task spec vs. the precise one
for adding return type annotations. Code font for both.

**Slide 5 — Five Context Injection Strategies**
Title: "Context Is Not Background — It's Signal"
A five-row table: Strategy Name | What it answers | Primary use case.
Rows: File Reference / Pattern / Constraint / Audience / State.
Bottom callout box: "Irrelevant context degrades output. Noise dilutes signal."

**Slide 6 — Signal vs. Noise: Live Exercise**
Title: "Which Context Actually Matters?"
Task shown at top: "Add JSDoc to all exported functions in utils/format.ts"
Eight numbered items listed. Three are highlighted as Signal (the file itself, an existing
JSDoc example, the TypeDoc config). Five are greyed as Noise (parse.ts, README, package.json,
test files, CI config). No explanatory prose — the visual sorting is the lesson.

**Slide 7 — Examples: The Highest-Leverage Element**
Title: "One Example Replaces Three Paragraphs"
Left column: abstract rule list for code review comment format (7 bullet points, prose).
Right column: the actual JSON object that communicates all the same information plus field types,
naming conventions, and prose style. Bold annotation: "This is not documentation. It is a
precision instrument."

**Slide 8 — Format as Output Contract**
Title: "Format: Write It Like a Parser Will Read It"
Show the full JSON schema for a code review output. Annotate three fields with callouts
explaining why each matters: field name precision ("issues" not "findings"), type precision
("line": "number — integer"), and enum precision ("critical | high | medium | low").

**Slide 9 — Four Constraint Categories**
Title: "Constraints That Actually Constrain"
Four quadrants: Scope / Compatibility / Style / Approval. Each quadrant has one ❌ example
and one ✅ replacement. The Approval quadrant should be visually emphasized (larger, different
background) with the label "Most important safety mechanism in agentic workflows."

**Slide 10 — The Approval Constraint**
Title: "Approval Constraint: How to Make the Agent Wait"
Three numbered requirements a well-formed approval constraint must meet:
1. What to show (e.g., "a numbered list of all files that will be modified")
2. What format the plan should take
3. What explicit signal the agent waits for ("wait for my confirmation before writing any code")
Bottom: one well-formed approval constraint written out in full, in monospace.

**Slide 11 — Prompt Iteration: The Four-Step Loop**
Title: "Iteration Is Debugging, Not Guessing"
Circular diagram (not a linear list): Run → Diagnose → Hypothesize → Apply → Run.
Annotations on the Diagnose node: four PRAO failure modes (Perceive / Reason / Act / Observe)
with a one-line description of what each looks like in output.
Bold rule at the bottom: "One change per iteration. Always."

**Slide 12 — Failure Symptom Table**
Title: "Match the Symptom to the Fix"
Full six-row table: Failure Symptom | Probable Diagnosis | Prescribed Fix.
Rows derived from the module content. Presented in table format, code font for tool/field names.
This slide is a reference card for the lab.

**Slide 13 — Lab Preview: Lab 05**
Title: "Lab 05: Signal/Noise + TCEF + Iteration"
Three-step description of what the lab does:
1. Sort eight context fragments into signal vs. noise for a code review task
2. Write a TCEF prompt, run it, observe the intentional failure
3. Apply one-change-per-iteration discipline until output matches the specification
Note: "The initial prompt is calibrated to fail in an instructive way."

**Slide 14 — Module Summary**
Title: "TCEF: What You Can Do Now"
Four bullet points, one per TCEF element, each written as a skill statement:
- "Apply precise verb + measurable outcome to eliminate interpretation ambiguity"
- "Select the right context injection strategy for each task type"
- "Use one concrete example to replace abstract rule specifications"
- "Write Format as a machine-readable output schema, not a style note"
No other content.

Target: 14 slides. Do not add a slide for general prompt engineering theory, chain-of-thought,
or few-shot learning as external academic topics.

---

## Module 05: MCP Architecture

### Video Focus Prompt

Focus EXCLUSIVELY on Module 05: MCP Architecture. Do NOT cover TypeScript SDK implementation,
Zod schemas, or tool handler code from Module 06. Do NOT cover YAML-based skill files or slash
commands from Module 07. This video covers the conceptual and architectural layer of MCP — what
the protocol is, what problems it solves, what its three primitives are, and how connections work.

Open with the "before MCP" problem statement. Describe in concrete operational terms what it
actually took to give an AI agent access to an internal system before a standard protocol existed:
a natural-language API description in the system prompt, custom parsing wrappers, ad hoc error
handling, and integrations that couldn't be shared, versioned, or composed. This is not a
hypothetical — it was the standard approach.

**Concept 1 — The USB-C Analogy (central anchor)**
The presenter should draw this analogy explicitly and let it breathe. Before USB standardization:
incompatible connectors, every peripheral-device pair was a custom negotiation. USB-C established
one standard — any device, any host. MCP does the same for AI capability extensions: any MCP
client connects to any MCP server. The capability author implements the server once; every
client gains the capability immediately. The whiteboard diagram for this concept: two columns
(Before MCP / After MCP), each showing the integration graph — chaotic web of bespoke arrows
on the left, clean hub-and-spoke with MCP protocol in the center on the right.

**Concept 2 — What MCP Standardizes (Four Things)**
MCP standardizes exactly four things: Discovery, Invocation, Schema, and Transport. The
presenter must be precise about what "standardized" means here vs. what remains in the server
under the capability author's control. Draw this as a boundary diagram: the MCP protocol zone
(what is standardized) vs. the server implementation zone (what is not).

**Concept 3 — The Three Primitives (core technical content)**
CRITICAL: MCP has exactly THREE primitives — Tools, Resources, and Prompts. Not four. Not two.
The conceptual shorthand: "Tools are verbs, Resources are nouns, Prompts are templates."
Spend the most time of the video here.

For each primitive, the presenter must cover:
- What it IS (structural definition)
- What it is APPROPRIATE for (use cases)
- What it is NOT (explicit contrast with the other two primitives)

Tools: callable functions with typed parameters. They have side effects or call external systems.
The agent selects and invokes them. Appropriate for: mutating state, querying live external data,
operations with variable inputs.

Resources: passive data objects identified by URIs (scheme://authority/path). The client reads
them; there are no side effects. Appropriate for: stable or slowly changing reference data,
data the agent needs as context not as an action. Contrast explicitly with Tools: "the key
distinction — resources are passive, tools are invocations."

Prompts: parameterized instruction templates that the server exposes for client use. They return
instruction text, not execution results. Appropriate for: domain-specific task templates,
templates requiring server-side data, standardizing team interaction patterns.

Draw the "Categorization Test" decision tree on the whiteboard: three decision nodes
(Has side effects? / Stable data with URI identity? / Value in the template itself?), each
leading to the correct primitive. This tree is the primary visual for this segment.

**Concept 4 — Reading Tool Schemas**
Walk through the `search_issues` tool schema line by line. The presenter must explain:
- The name field: function identifier
- The description field: the single most important element — written for Claude, not humans
- The inputSchema: JSON Schema definition of parameters
Show the contrast between a human-focused description ("Searches issues in the tracker system")
and a Claude-optimized description that includes when to use vs. when not to use, and what the
return value looks like. Draw this as a two-panel comparison on the whiteboard.
Cover required vs. optional fields design and enum constraints.

**Concept 5 — Transport Configuration**
Two active transports: stdio (local subprocess) and Streamable HTTP (remote).
CRITICAL: SSE (Server-Sent Events) was deprecated in the MCP specification on 2025-03-26 and
must be explicitly named as deprecated — do not present it as a current option.

For stdio: JSON in via stdin, JSON out via stdout. Runs as a child process. Show the
`claude_desktop_config.json` structure with `command`, `args`, and `env` fields.
For Streamable HTTP: HTTP POST for requests, streaming responses for long-running operations.
Show the `url` and `headers` config structure. Emphasize `${VAR_NAME}` syntax for secrets.

Draw the Host/Client/Server architecture diagram on the whiteboard: MCP Host (Claude Code)
contains the Claude Model and the MCP Client. Local servers connect via stdio. Remote servers
connect via Streamable HTTP. The deprecated SSE path should be shown struck through.

**Diagram 1 — Before MCP vs. After MCP (Whiteboard)**
Left: A chaotic web of bespoke arrows between "Agent" and five external systems, each arrow
labelled with a bespoke integration artifact (system prompt desc, custom parser, ad hoc error
handler). Right: A clean hub with "MCP Protocol" at center, standard arrows to each system,
labelled with protocol primitives (tools/list, tools/call). The visual makes the "extension
problem" argument concrete.

**Diagram 2 — The Three Primitives + Categorization Tree (Whiteboard)**
A central box labelled "MCP Server exposes capabilities." Three branches: Tools (verbs),
Resources (nouns), Prompts (templates). Under each branch: 2 examples in URI or function form.
Below the tree: the three decision questions as a vertical decision flow. This is the reference
diagram for the entire primitive taxonomy.

Duration: 15–22 minutes. Allocate roughly 3 minutes to the before-MCP problem, 3 minutes to
the USB-C analogy and what MCP standardizes, 7 minutes to the three primitives with the
categorization tree, 4 minutes to tool schema anatomy, 3 minutes to transport configuration.

EXCLUSION CLAUSE: Do not cover TypeScript `server.tool()` calls, Zod schema definitions, npm
package installation, error handling code, `isError` flags, or any implementation detail that
belongs in Module 06.

---

### Slide Deck Focus Prompt

Focus EXCLUSIVELY on Module 05: MCP Architecture. Every slide must address one of five
architectural concepts: the extension problem MCP solves, what MCP standardizes, the three
primitives taxonomy, tool schema anatomy, or transport configuration. Do not include slides
about TypeScript SDK usage, Zod schemas, tool implementation code, or skill YAML files.

**Slide 1 — Opening Hook**
Title: "Before MCP: Every Integration Was Bespoke"
Visual: Six bullet points describing the pre-MCP reality in operational terms — system prompt
API descriptions, custom parsing wrappers, ad hoc error handling, integrations that can't be
shared, capabilities encoded in natural language that drifts, no versioning. No commentary.
Just the six bullets. The slide makes the problem visceral before the solution is introduced.

**Slide 2 — The USB-C Analogy**
Title: "MCP Is the USB-C for AI Capability Extensions"
Two panels side by side. Left: "Before" — peripheral compatibility matrix (N devices × M hosts
= NxM custom integrations). Right: "After" — one standard in the middle, every device connects
to every host. Bottom line: "Implement the MCP server once. Every MCP client gains the capability."
No prose beyond captions.

**Slide 3 — What MCP Standardizes**
Title: "MCP Standardizes Exactly Four Things"
Numbered list, one item per line:
1. Discovery — how a client learns what capabilities a server provides
2. Invocation — how a client calls a capability
3. Schema — how capabilities describe themselves
4. Transport — how client and server communicate
Bottom callout: "Everything above the protocol — what a tool does, what data a resource
exposes — remains in the server, under the capability author's control."

**Slide 4 — The Three Primitives: Overview**
Title: "Three Primitives. Tools Are Verbs. Resources Are Nouns. Prompts Are Templates."
Three columns, each with a header (Tools / Resources / Prompts), a one-sentence definition,
and two concrete examples. No prose. This is a reference card. The title is the entire lesson.

**Slide 5 — Tools: The Agent's Action Vocabulary**
Title: "Tools: Callable Functions With Side Effects"
Three-section layout:
- What a Tool IS: callable function with typed parameters; the agent invokes it; it has side
  effects or queries external systems in real time
- Every Tool exposes: name (function identifier), description (instruction to the LLM),
  inputSchema (JSON Schema parameters)
- Appropriate for: mutating state / querying live external data / variable inputs at call time
Bottom: "The description is the tool's instruction to the LLM — not documentation for humans."

**Slide 6 — Resources: Addressable Data Objects**
Title: "Resources: Passive Data Identified by URI"
Two-column layout. Left: URI pattern examples (db://users/schema, file://project/README.md,
git://repo/main/diff, config://app/settings). Right: The key distinction in bold —
"Resources are passive. The client reads them. No side effects." Below: appropriate use
cases (stable reference data, context the agent reads but does not invoke).
Explicit contrast callout: "Resources ≠ Tools that return data. Resources have no invocation."

**Slide 7 — Prompts: Reusable Instruction Templates**
Title: "Prompts: Server-Side Templates the Client Can List and Use"
Three-row table: Prompt name | Arguments | What it returns.
Rows: code_review (language, code) / incident_report (severity, description) /
sql_query_helper (schema, natural_language_query).
Bottom: "Prompts do not execute actions. They return instruction text. Template, not executor."
Explicit contrast: "Prompts ≠ Tools. Prompts ≠ system prompt sections. They are discoverable,
parameterized, server-maintained templates."

**Slide 8 — The Categorization Test**
Title: "Which Primitive? Apply the Decision Test."
A vertical decision flowchart with three yes/no nodes:
Node 1: "Does the operation have side effects or call an external system?" → Yes: Tool
Node 2 (if No): "Is the data stable or slowly changing with a URI identity?" → Yes: Resource
Node 3 (if No): "Is the value in the parameterized template itself, not in executing it?" → Yes: Prompt
Bottom callout: "Common mistake: exposing everything as Tools because Tools are most familiar."

**Slide 9 — Tool Schema Anatomy**
Title: "Tool Schema: Written for Claude, Not Humans"
The full `search_issues` schema rendered in code font (name, description, inputSchema with
query/status/assignee/limit). Four callout annotations:
- On `name`: "Function identifier — precise, unambiguous"
- On `description`: "The most important field. Tells Claude when to use vs. when not to."
- On `enum`: "Prevents Claude from generating invalid values"
- On `required`: "Only fields the tool cannot function without"

**Slide 10 — Description: Human Docs vs. Claude Instruction**
Title: "The Description Field Must Answer Three Questions"
Top: three questions Claude needs answered — What does this tool do? When should I use it
(vs. alternatives)? What will I get back?
Middle: two panels. Left (❌): "Searches issues in the project tracker." Right (✅): Full
Claude-optimized description with when-to-use, when-NOT-to-use, and return value description.
Bottom rule: "If you cover only what the tool does, the description is incomplete."

**Slide 11 — Transport: Two Active Options**
Title: "Two Active Transports. One Deprecated."
Three-row table: Transport | Status | When to use | Config key.
Row 1: stdio | Active | Local subprocess servers | command + args + env
Row 2: Streamable HTTP | Active | Remote/shared servers | url + headers
Row 3: SSE (Server-Sent Events) | DEPRECATED 2025-03-26 | Do not use | —
The SSE row should be visually distinct (strikethrough or red). This is the slide that
enforces the SSE deprecation rule.

**Slide 12 — The Connection Handshake**
Title: "Three-Phase Handshake at Session Start"
Three numbered steps:
1. initialize — client sends protocol version + capabilities; server responds or rejects
2. tools/list + resources/list + prompts/list — client loads all schemas
3. Available — connection active; Claude can call tools, read resources, request prompts
Callout: "Schema changes don't take effect until the next session. The schema is loaded at
connection time, not at call time."

**Slide 13 — MCP in the PRAO Cycle**
Title: "Where MCP Primitives Fit in the Agent Loop"
A four-phase horizontal flow: Perceive → Reason → Act → Observe.
Annotations under each phase:
- Perceive: "Reads tool schemas at session start. Reads resources for world state."
- Reason: "Selects tools by matching task against descriptions. Constructs arguments against schemas."
- Act: "Calls tools via MCP. Receives content array result."
- Observe: "Interprets result. Decides: retry / alternative / report failure."
One concrete example trace shown below the flow for "find all open issues assigned to current user."

**Slide 14 — Module Summary + Lab Preview**
Title: "Module 05 Complete: What's Next"
Left column — four skills mastered:
- Explain MCP's role and the extension problem it solves
- Distinguish Tools, Resources, and Prompts with the categorization test
- Read a tool schema and identify description quality
- Configure stdio and Streamable HTTP connections
Right column — Lab 06 preview:
- Annotate tool schemas for Claude-adequacy
- Configure server in stdio and Streamable HTTP modes
- Verify handshake by listing available tools

Target: 14 slides. Do not add slides for TypeScript implementation, Zod, npm commands,
isError handling, or any content belonging to Module 06.

---

## Module 06: Building MCP Servers

### Video Focus Prompt

Focus EXCLUSIVELY on Module 06: Building MCP Servers. Do NOT re-explain MCP's three primitives,
the USB-C analogy, or the Host/Client/Server architecture from Module 05 — those are assumed
knowledge. Do NOT cover skill YAML files or slash commands from Module 07. This video is about
design decisions, TypeScript SDK implementation mechanics, schema quality, error handling, and
production readiness.

Open by naming the most common mistake engineers make when building MCP servers: jumping to
implementation before deciding what to expose and how to expose it. The entire module flows
from this premise — design comes first, implementation is the consequence of design.

**Concept 1 — Single Responsibility: One Server Per Domain (central anchor)**
The presenter should draw the "over-broad server" anti-pattern explicitly: an "infrastructure
server" that handles GitHub, database, Slack, and AWS in one MCP endpoint. Then redraw it
correctly as four separate domain-scoped servers. The analogy to draw: a single-domain server
has clear ownership, a small surface area, and isolated credentials. An omnibus server is
owned by nobody and its credentials are co-located.

Three concrete consequences of single responsibility: security isolation (compromising one
server doesn't expose all credentials), maintainability (small surface area, clear ownership),
and Claude usability (tool selection quality degrades as tool count grows — practical limit: 15
tools before considering a split).

**Concept 2 — TypeScript SDK: The Minimal Server Skeleton**
Walk through the minimal server skeleton in detail. The presenter must explain every structural
element:
- `McpServer` constructor with name, version, description
- `StdioServerTransport` as the local transport
- The critical rule: `console.error` for all diagnostic messages, NEVER `console.log` —
  stdout is reserved for the MCP protocol and any non-protocol output corrupts the channel
- `server.connect(transport)` as the activation step

Draw a diagram on the whiteboard showing the stdio channel: Claude Code process (left) ←→
stdin/stdout pipe ←→ MCP server process (right). Mark stdout as "MCP protocol only" and
stderr as "diagnostic logs." This visualization makes the `console.error` rule memorable.

**Concept 3 — Tool, Resource, and Prompt Implementation Patterns**
For each primitive, show the SDK call pattern in detail:

`server.tool(name, description, zodSchema, handlerFn)` — four arguments in order. The Zod
schema uses `.describe()` on each field to populate the JSON Schema description. Show how
`z.enum()`, `z.string().optional()`, and `z.number().int().min(1).max(100)` map to JSON
Schema constraints.

`server.resource(name, uri, description, handlerFn)` — the URI as a stable identifier, the
handler returning a `contents` array with `uri`, `mimeType`, and `text` fields.

`server.prompt(name, description, zodSchema, handlerFn)` — the handler returning a `messages`
array (role + content structure), not a result object.

Draw a three-panel comparison on the whiteboard: same logical capability (issue schema) shown
as Tool (❌ wrong — `get_schema()` with no parameters) vs. Resource (✅ correct — `db://tracker/schema/issues`). This makes the "common misclassification" lesson visual.

**Concept 4 — Tool Schema Quality: The Description as a Prompt to Claude**
This concept extends Module 05's schema anatomy into implementation practice. The test: give
just the description (not the tool name, not the input schema) to Claude and ask "what does
this tool do and when would you use it?" If the answer is vague, the description is inadequate.

Walk through the full before/after schema comparison (the vague `search` tool vs. the specific
`search_issues` tool). For each difference, name the specific failure mode the vague version
causes: ambiguous tool name → Claude can't discriminate between tools; ambiguous field name `q`
→ Claude may omit or misuse it; no return value description → Claude may misinterpret results.

Cover the three most common schema mistakes: too vague (Claude can't decide when to use the
tool), missing enum constraints (Claude passes invalid values), wrong required fields (Claude
is forced to specify values it has no basis for).

**Concept 5 — Error Handling: isError Flag + Graceful vs. Exception**
The MCP protocol defines two error communication paths. The presenter must be precise:

Structured error result (`isError: true`): used when the error is recoverable and Claude can
reason about it (not found, insufficient permissions, rate limiting, invalid argument combinations).
Claude receives the error content, interprets it, and decides whether to retry or report.

Exception (throw): used for unrecoverable server-level failures (missing credentials, bugs).
The SDK handles these as transport errors.

Draw a decision tree on the whiteboard: "Can Claude reason about this error and respond to it?"
Yes → `isError: true` structured result. No → throw exception.

Also cover timeout handling (AbortController + 10-second timeout pattern) and partial results
(returning what succeeded with a clear indication of what failed — `isError` only when nothing
succeeded).

**Concept 6 — Production Considerations: Secrets, Logging, Semver**
Three areas. For each, the presenter should give the rule and the anti-pattern:

Secrets: `${VAR_NAME}` in client config, `process.env.VAR_NAME` in server code, fail-fast at
startup with `process.exit(1)` if required variable is missing. Anti-pattern: hardcoded API
key in source code.

Logging: every tool invocation logged to stderr with tool name, all arguments, result size,
elapsed time. Anti-pattern: `console.log` on stdout (corrupts the protocol channel).

Semver: define breaking vs. non-breaking changes precisely. Breaking = major version bump:
removing a tool, removing a required field, changing a field type, renaming a tool. Non-breaking
addition = minor version bump: new tool, new optional field. Fix = patch. When breaking changes
are unavoidable: versioned tool names (`search_issues_v2`) during transition.

**Diagram 1 — stdio Communication Channel (Whiteboard)**
Two process boxes connected by a pipe. Left box: "Claude Code (MCP Client)." Right box: "MCP
Server Process." The pipe has two arrows: stdin → (client to server, JSON messages) and
stdout ← (server to client, JSON responses). Below the right box: a separate stderr arrow
pointing down labelled "Diagnostic logs — never protocol messages." This diagram makes the
`console.error` rule concrete and memorable.

**Diagram 2 — Error Routing Decision Tree (Whiteboard)**
Root node: "Tool handler encounters an error." First decision: "Is this a recoverable error
that Claude can reason about?" Yes → "Return `isError: true` structured result" with four
examples: not found / permissions / rate limit / invalid args. No → "Throw exception" with
two examples: missing credentials / internal bug. Each leaf shows the consequence for Claude:
structured result = Claude reasons and responds; exception = transport error reported to user.

Duration: 15–22 minutes. Allocate roughly 3 minutes to single-responsibility design, 4 minutes
to the SDK skeleton and the stdio channel diagram, 5 minutes to the three implementation
patterns with the misclassification anti-pattern, 3 minutes to schema quality with the
before/after comparison, 3 minutes to error handling with the decision tree, 2 minutes to
production considerations.

EXCLUSION CLAUSE: Do not re-explain what Tools, Resources, and Prompts are conceptually —
Module 05 established that. Do not introduce MCP transport configuration for remote servers —
that was covered in Module 05. Do not cover YAML-based skill files, slash commands, or any
Module 07 content.

---

### Slide Deck Focus Prompt

Focus EXCLUSIVELY on Module 06: Building MCP Servers. Every slide must address an implementation
or design decision: server design principles, TypeScript SDK patterns, schema quality, error
handling, or production operations. Do not re-introduce the three primitives conceptually —
treat them as assumed knowledge from Module 05. Do not include slides about MCP architecture,
the USB-C analogy, or transport configuration (covered in Module 05).

**Slide 1 — Opening Hook**
Title: "The Most Common MCP Mistake: Jumping to Implementation"
Visual: A flowchart with two paths. Bad path: "Design the domain" → SKIPPED → "Open VS Code"
→ "Write server.tool() calls" → "Claude uses tools inconsistently." Good path: "Design the
domain" → "Assign primitives" → "Set auth boundaries" → "Implement" → "Test schema quality."
The hook is the contrast between the paths.

**Slide 2 — Single Responsibility: One Server Per Domain**
Title: "One Domain Per Server — Three Reasons"
Top: ❌ "Infrastructure Server" with a list: GitHub + Database + Slack + AWS in one endpoint.
Bottom: ✅ Four separate servers, each with a named domain.
Three consequences in callout boxes:
- Security isolation: "Compromising one server doesn't expose all credentials"
- Maintainability: "Small surface area, clear ownership, easy to update"
- Claude usability: "Tool selection quality degrades with count — practical limit: 15 tools"

**Slide 3 — Primitive Selection Framework (Implementation Version)**
Title: "Before Writing Code: Assign Each Capability to a Primitive"
Three-column decision table (not the conceptual overview from Mod 05 — this is the
implementation decision version):
Column headers: Use Tool When / Use Resource When / Use Prompt When
Three rows of specific implementation criteria (side effects, URI identity, template value).
Bottom: three common misclassifications to avoid in code, each shown as ❌ with correction.

**Slide 4 — The Minimal Server Skeleton**
Title: "Every MCP Server Starts Here"
Full code block: the minimal `index.ts` skeleton with McpServer constructor, StdioServerTransport,
and the `main()` function. Four inline code annotations:
- `name/version`: "Included in initialize response — use semver"
- `StdioServerTransport`: "Local subprocess transport"
- `console.error`: "NEVER console.log — stdout is the protocol channel"
- `server.connect(transport)`: "Activates the handshake"

**Slide 5 — The stdio Channel Rule**
Title: "stdout = Protocol. stderr = Everything Else."
Diagram: two process boxes connected by a pipe. Stdin arrow: "JSON messages → server."
Stdout arrow: "JSON responses → client. Protocol ONLY." Stderr arrow pointing down: "Logs,
diagnostics, debug output. Never stdout."
Bold rule at bottom: "Any non-protocol output on stdout corrupts the MCP communication channel.
Use console.error for all server-side logging."

**Slide 6 — Implementing a Tool with Zod**
Title: "server.tool(): Four Arguments in Order"
Full code block for the `search_issues` tool definition. Four annotations on the code:
- Second argument (description string): "Three-question structure: what / when / returns"
- `z.enum([...])`: "Generates JSON Schema enum constraint — prevents invalid values"
- `.optional()`: "Field not in required array — Claude omits when no value known"
- `return { content: [{ type: "text", text: ... }] }`: "Always a content array"

**Slide 7 — Implementing a Resource**
Title: "server.resource(): URI as Stable Identity"
Full code block for the `issue-schema` resource. Annotations:
- URI argument: "Stable address — hierarchical, meaningful, consistent"
- `contents` array vs `content` array: "Resources return contents (plural); tools return content"
- `mimeType`: "Signals content type to client for correct interpretation"
Bottom callout: "Compare to ❌ Tool version: `get_schema()` with no parameters — same data,
wrong primitive. Resources are for passive reads."

**Slide 8 — Implementing a Prompt**
Title: "server.prompt(): Returns Messages, Not Results"
Full code block for the `review-issue` prompt. Annotations:
- `messages` array: "Role + content structure — same as conversation messages"
- `role: 'user'`: "The template is presented as a user turn"
- Async handler fetching server-side data: "Server-side data enriches the template"
Bottom: "Prompt ≠ Tool. Prompt ≠ system prompt string. A discoverable, parameterized template
the client can list, select, and compose."

**Slide 9 — Schema Quality: The Three-Question Test**
Title: "Is Your Description Sufficient? Run the Test."
Test instructions at top: "Give just the description (not the tool name, not the schema) to
Claude. Ask: 'What does this tool do and when would you use it?' If the answer is vague, the
description is inadequate."
Three questions the description must answer, each with a ✅ example from the search_issues tool:
1. What does this tool do? — "Search for project tracker issues matching given criteria."
2. When should I use it? — "When you need to find issues by keyword, status, or assignee."
3. What will I get back? — "An array of issues with IDs, titles, statuses, assignees. Empty array if none."

**Slide 10 — Three Common Schema Mistakes**
Title: "Schema Mistakes That Cost You Tool Reliability"
Three-section layout, each with ❌ code snippet + failure consequence + ✅ fix:
1. Vague description — Claude can't discriminate tools → add when/when-not-to-use language
2. Missing enum constraint — Claude passes invalid string values → add `z.enum([...])`
3. Wrong required fields — Claude forced to specify values it has no basis for → make optional with `.optional()`

**Slide 11 — Error Handling: Two Paths**
Title: "isError: true vs. throw — Two Different Things"
Two-column layout:
Left (isError: true): recoverable errors Claude can reason about — not found, permissions,
rate limiting, invalid args. Claude receives error content and decides what to do next.
Right (throw): unrecoverable server errors — missing credentials, bugs. SDK handles as
transport error.
Decision rule in bold: "Can Claude reason about this error and respond to it? Yes → isError. No → throw."

**Slide 12 — isError in Code**
Title: "Structured Error Results Enable Claude to Recover"
Full code block showing the try/catch with `isError: true` return. Annotations:
- `NOT_FOUND` branch: "Returns descriptive message — Claude can retry with a different ID"
- `isError: true`: "Signals to Claude this is a failure, not a data result"
- `throw error`: "For unexpected errors — not for user-facing failures"

**Slide 13 — Production: Secrets + Logging + Semver**
Title: "Three Production Requirements"
Three-row table: Area | Rule | Anti-pattern.
Secrets: `${VAR_NAME}` in config + `process.env` in code + fail-fast | ❌ hardcoded API key
Logging: stderr only, every invocation with args + result size + elapsed time | ❌ console.log
Semver: breaking = major (remove tool, change type), addition = minor, fix = patch | ❌ no versioning

**Slide 14 — Breaking vs. Non-Breaking Changes**
Title: "Semver for MCP Servers: Define Breaking Precisely"
Two-column table:
Left (Major version bump — breaking): removing a tool / removing a required field / changing
a field type / renaming a tool.
Right (Minor version bump — non-breaking): adding a new tool / adding an optional field /
adding a new resource or prompt.
Bottom: "When breaking changes are unavoidable: versioned tool names (search_issues_v2) during
the transition period. Don't remove the old version immediately."

**Slide 15 — Lab Preview: Lab 07**
Title: "Lab 07: Build a Full MCP Server From Scratch"
Specification summary:
- Two tools: list_issues, create_issue
- One resource: repo://schema
Connect to Claude Code via stdio. Verify Claude uses all three primitives correctly via
scripted task sequence. Pre-built test suite validates schema correctness and error handling.
Callout: "The lab is graded on schema quality, not just server startup."

**Slide 16 — Module Summary**
Title: "Module 06: What You Can Build Now"
Five bullet points, each a skill statement:
- "Apply the primitive selection framework before writing any implementation code"
- "Build a minimal TypeScript MCP server using the SDK skeleton"
- "Write tool descriptions that pass the three-question Claude test"
- "Return isError structured results for recoverable errors; throw for unrecoverable ones"
- "Apply secrets, logging, and semver patterns for production-ready servers"

Target: 16 slides. Do not add slides re-explaining MCP architecture, the three primitives
conceptually, or transport configuration — those are Module 05 content.
