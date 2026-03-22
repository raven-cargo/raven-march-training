# Day 1 Module Multimedia Prompts

Generated for the Agentic AI Engineering course (Day 1 modules).
Each prompt is written to pass directly as the `focus_prompt` parameter to NotebookLM's
`video_overview_create` or `slide_deck_create` tools.

---

## Module 01: The Paradigm Shift

### Video Focus Prompt

Focus EXCLUSIVELY on Module 01: The Paradigm Shift. Do NOT introduce Claude Code's CLI
commands, CLAUDE.md syntax, or the settings.json permissions file — those belong to Module 02.
Do NOT cover reasoning traces or how to read agent thinking output — that is Module 03 content.
Do NOT introduce prompt engineering patterns (TCEF/GCCF) — those are Module 04 territory.

This video covers one idea: the relationship between a human engineer and a software system
has changed categorically — not incrementally — and engineers who miss this distinction will
consistently misuse the tool in one of two predictable directions.

**Opening hook (first 2 minutes):** Open by describing the specific disorientation engineers
feel the first time they run Claude Code. They expect to type a prompt and receive a response.
Instead, they watch the system start reading files, running git commands, and modifying code
— without waiting for permission. That disorientation is the subject of this module. What
is actually happening? The presenter should draw a rough analogy on the whiteboard: the
difference between asking a GPS for directions (you act on its output) versus handing your
car keys to a driver (the system acts in the world on your behalf).

**Concept 1 — Three Eras of AI-Assisted Engineering (minutes 2–8):**
Draw a horizontal timeline on the whiteboard with three labeled boxes:

  Era 1 (2021–2022): AUTOCOMPLETE — GitHub Copilot, Tabnine. The loop is: you type → AI
  suggests next tokens → you decide. The AI has no task model, no memory of what you
  accepted before, no awareness of goals. It predicts the most likely continuation of text.

  Era 2 (2023–2024): ASSISTANT — ChatGPT, Copilot Chat. The loop is: you prompt → AI
  generates text → you act. The AI produces richer outputs across longer context windows.
  But the critical point: YOU are still the agent. YOU run the code, check the output,
  report back. All action flows through the human.

  Era 3 (2025+): AGENT — Claude Code. The critical difference: the AI is no longer producing
  text for you to act on. It is taking actions itself. It reads your filesystem. It writes
  files. It runs shell commands. It observes results and uses feedback to determine the next
  step. The AI IS the agent now.

  The presenter must land this point hard: the cost profile changes. In Era 2, a bad AI
  response wastes your reading time. In Era 3, a poorly-directed agent modifies files, runs
  commands, calls services. The stakes are categorically higher.

**Concept 2 — The PRAO Loop: Perceive, Reason, Act, Observe (minutes 8–16):**
This is the core technical concept of Module 01. Draw the PRAO loop on the whiteboard as a
four-node cycle — not a linear flowchart. Arrows: Perceive → Reason → Act → Observe →
back to Perceive. A separate arrow from Act points out of the cycle to "Deliverable."

Walk through each phase with concrete grounding:

  PERCEIVE: The agent reads files, runs `git status`, lists directories, runs existing tests
  to see what passes and what doesn't. Perception is active — the agent is choosing what to
  look at based on what it's been asked to do. It is constructing a representation of the
  current world state, not passively ingesting data.

  REASON: Internal deliberation before action. The agent plans its approach, identifies
  constraints, considers trade-offs, decides what actions to take. This shows up in the
  output as thinking text that precedes tool calls.

  ACT: Every action is a structured tool invocation — writing a file, executing a bash
  command, reading another file discovered during reasoning, calling an external service.
  The agent does not free-form execute code; every action is a named, observable tool call.

  OBSERVE: The agent reads the results of its actions and updates its world model. Did the
  tests pass after the edit? Did the command produce the expected output? This feedback loop
  is what defines agency. Without observe, the agent is executing a script, not reasoning.

Walk the audience through a complete two-cycle PRAO trace using the TypeScript typing task
from the module: "Add proper TypeScript types to all exported functions in src/utils.ts."
Show Cycle 1 (read file → plan approach → write types → run tsc → run tests) and Cycle 2
(if tests fail: read failure output → determine cause → fix → re-run tests). Emphasize that
multiple cycles are correct behavior — not a sign of failure.

**Concept 3 — The "Junior Engineer with Codebase Access" Mental Model (minutes 16–19):**
The right mental model is neither "smart autocomplete" nor "magic box." It is: a junior
engineer who is competent but needs to be briefed, who will take initiative but benefits from
constraints, and whose work you review before shipping. This mental model correctly predicts
when to give context upfront, when to let the agent work, and when to intervene. The
autocomplete model leads to constant micro-direction. The magic box model leads to vague
prompts and disappointed expectations. Neither uses the tool at its actual capability.

**Concept 4 — Three Failure Modes (minutes 19–22):**
Draw three columns on the whiteboard: "Treating it like autocomplete," "Treating it like
magic," "Not watching what it does." For each: describe the symptom, the root cause, and the
productive alternative. The productive pattern has six steps: specific goal → rich context →
explicit constraints → monitor during execution → verify outputs → close the loop to CLAUDE.md.

**Concept 5 — When Agentic AI Is and Isn't the Right Tool:**
Cover the task classification briefly. Strong fit: repetitive-but-cognitive tasks (cross-file
refactoring, migration tasks, test generation, documentation). Weak fit: tasks requiring
real-time data the agent cannot access, production systems with no rollback, tasks where error
cost is catastrophically high. The decision framework: How long manually? How specific can the
goal be? How verifiable is the output? What is the cost of an agent error?

**Duration guidance:** 15–22 minutes total.

**Explicit exclusion:** Do NOT demonstrate any Claude Code CLI commands during this video.
No terminal windows, no `claude` invocations, no CLAUDE.md file contents shown. The entire
module is conceptual framing. The moment a CLI prompt appears on screen, you have drifted
into Module 02 content.

---

### Slide Deck Focus Prompt

Focus EXCLUSIVELY on Module 01: The Paradigm Shift. Do not include any slides about CLI
commands, CLAUDE.md configuration, settings.json, MCP servers, reasoning traces, or prompt
engineering patterns. This deck establishes conceptual foundations only.

Target: 14–16 slides.

**Slide 1 — Hook / Opening Provocation:**
Title: "You ran Claude Code. It started reading your files without asking. What just happened?"
Visual: A single terminal window showing lines scrolling by autonomously — no prompt from the
user visible. No bullets. Just the image and the question. This should feel slightly unsettling.

**Slide 2 — The Disorientation Is The Lesson:**
Title: "That confusion you felt is the gap between paradigms."
Two columns: "What you expected" (prompt → response → you act) vs "What actually happened"
(prompt → system reads files → system writes files → system runs commands → system checks
results → system acts again). The right column has more lines. That is the point.

**Slide 3 — Three Eras of AI-Assisted Engineering:**
Title: "The history in three boxes."
Three horizontally arranged boxes on a timeline:
  Box 1: Era 1 — Autocomplete (2021–2022). Key words: token prediction, local, reactive,
  no task model.
  Box 2: Era 2 — Assistant (2023–2024). Key words: conversational, multi-turn, generates
  text, YOU are the agent.
  Box 3: Era 3 — Agent (2025+). Key words: takes actions, observes results, feedback loop,
  the AI is the agent.
The Era 3 box should be visually distinct — larger, different border color.

**Slide 4 — The Defining Difference:**
Title: "The line that matters: who acts?"
One large diagram: In Era 2, arrows show Human → (prompt) → AI → (text) → Human → (acts
on text). In Era 3, arrows show Human → (goal) → AI → (reads files) → AI → (writes files)
→ AI → (runs commands) → AI → (reads results) → AI → (adjusts and continues). The Era 3
side has no arrow returning to the human mid-loop. That is intentional and should be
visually obvious.

**Slide 5 — The PRAO Loop:**
Title: "How an agent actually works: Perceive → Reason → Act → Observe."
Full-slide diagram: four nodes in a cycle with directional arrows. Perceive node label:
"reads files, runs git status, runs existing tests." Reason node label: "plans approach,
identifies constraints, considers trade-offs." Act node label: "structured tool invocation:
Read, Write, Bash, MCP call." Observe node label: "reads results, updates world model,
determines next step." Arrow from Act pointing outward to "Deliverable." No bullets. The
diagram carries this slide.

**Slide 6 — PRAO in a Real Task (Part 1: Cycle 1):**
Title: 'Tracing "Add TypeScript types to src/utils.ts" through PRAO.'
Left column: the four PRAO phases as row headers. Right column: what actually happens in
each phase for this specific task.
  Perceive: Reads utils.ts, reads utils.test.ts, runs tsc --noEmit to see existing errors.
  Reason: Plans which functions need parameter types, which need return types, checks tsconfig
  for strict mode.
  Act: Writes updated utils.ts with type annotations.
  Observe: Runs tsc --noEmit, runs npm test. If tests fail → Cycle 2.
Bottom note: "Multiple cycles = agent working correctly. Not a sign of failure."

**Slide 7 — PRAO in a Real Task (Part 2: Why Cycles Matter):**
Title: "A simple task: 1 cycle. A complex refactor: 5–6 cycles. Both are correct."
Visual: Two timelines side by side. Left: simple task — single clean PRAO arc with
"Deliverable" at end. Right: complex task — four overlapping PRAO arcs, each one feeding
into the next, "Deliverable" at the end of the last arc. Caption: "What you should watch for:
an agent cycling through the SAME operations with no observable progress. That is a loop.
That requires intervention."

**Slide 8 — The Right Mental Model:**
Title: "Neither smart autocomplete nor magic box."
Three-row table:
  Row 1: Mental Model "Smart Autocomplete" | Behavior: constant micro-direction ("change
  line 23," "use a different name") | Result: 10% of capability, high overhead
  Row 2: Mental Model "Magic Box" | Behavior: vague goals ("make it better") | Result:
  outputs that don't match unstated requirements
  Row 3: Mental Model "Junior Engineer with Codebase Access" ✓ | Behavior: brief upfront,
  let it work, review output | Result: full capability, appropriate oversight
Row 3 is highlighted.

**Slide 9 — The Three Failure Modes:**
Title: "Three predictable ways engineers underuse this tool."
Three columns, each with a failure mode header, one symptom sentence, and one corrective:
  Column 1: "Autocomplete Mindset" — symptom: stream of micro-prompts — corrective: lead
  with the goal and outcome criteria
  Column 2: "Magic Box Mindset" — symptom: vague goals, inconsistent results — corrective:
  specific goal + explicit constraints + defined done criteria
  Column 3: "Hands-Off Mindset" — symptom: accepting output without verification — corrective:
  read the diff, run the tests yourself, understand what changed

**Slide 10 — What Productive Collaboration Looks Like:**
Title: "The six-step pattern."
Numbered list — large type, one item per line:
  1. Specific goal (describe done, not the steps)
  2. Rich context (CLAUDE.md + task-specific additions)
  3. Explicit constraints (what must not change, what to avoid)
  4. Monitor during execution (watch tool calls at a high level)
  5. Verify outputs (read the diff, run the tests)
  6. Close the loop (write lasting decisions to CLAUDE.md)
Note at bottom: "Steps 1–3 are setup. Step 6 is what prevents re-learning the same lessons
next session."

**Slide 11 — When Agentic AI Is the Right Tool:**
Title: "Strong fit: repetitive-but-cognitive tasks."
Two-column layout:
  Left (Strong Fit): Cross-file refactoring, dependency migration and break-fix, documentation
  generation from code structure, test generation from existing functions, code review for
  adherence to established patterns.
  Right (Weak Fit): Tasks requiring real-time data the agent cannot access, production systems
  with no rollback path, tasks where a single agent error has catastrophic cost, one-time
  30-minute tasks where context setup overhead exceeds the savings.
Do not include any CLI examples on this slide.

**Slide 12 — The Decision Framework:**
Title: "Four questions before using the agent."
Four large question boxes arranged in a 2×2 grid:
  Q1: "How long would this take me manually?" (Longer → more agentic value)
  Q2: "How specific can I be about goal and constraints?" (More specific → lower risk)
  Q3: "How verifiable is the output?" (More verifiable → lower risk)
  Q4: "What is the cost if the agent does something wrong?" (Lower cost → more appropriate)
Caption: "If Q1 is long, Q2 is high, Q3 is high, Q4 is low: use the agent confidently."

**Slide 13 — The Persistent Memory Gap:**
Title: "Session context does not survive sessions. This surprises people."
Two-column table:
  Column 1 header: "Persists between sessions" — rows: CLAUDE.md files, settings.json, files
  the agent writes to disk, MCP server configurations
  Column 2 header: "Gone when the session ends" — rows: conversation history, in-session
  reasoning traces, verbal decisions not written anywhere, constraints stated only in chat
Bottom call-out: "Any decision that matters must be written to a file — preferably CLAUDE.md.
Not just stated in the session." (Note: the mechanics of CLAUDE.md are covered in Module 02.
This slide introduces the concept only — do not show CLAUDE.md syntax or structure here.)

**Slide 14 — Summary and Bridge:**
Title: "Module 01 in three sentences."
Three large statements, one per line:
  "The paradigm shift is about who acts — not who generates text."
  "The PRAO loop is the operating model: Perceive, Reason, Act, Observe."
  "Your role changes from author to director. The quality of your direction determines the
  quality of the output."
Bottom: "Next: Module 02 — the CLI, CLAUDE.md mechanics, permissions, and MCP servers.
The infrastructure that makes direction precise."

---

---

## Module 02: Claude Code Foundations

### Video Focus Prompt

Focus EXCLUSIVELY on Module 02: Claude Code Foundations. Do NOT cover the three-era history
of AI tools or the conceptual argument for why agentic AI is categorically different — that
is Module 01 content. Do NOT cover how to read reasoning traces, interpret thinking blocks,
or distinguish looping from thoroughness — that is Module 03 content. Do NOT cover prompt
engineering patterns or TCEF/GCCF frameworks — those are Module 04 content.

This video is operational infrastructure. By the end, an engineer watching must be able to
sit down at a terminal and configure a new project for Claude Code from scratch — CLAUDE.md,
settings.json, and at least one MCP server — within 30 minutes. That is the target outcome.
Every section should be tested against this goal: does it move the viewer toward that 30-minute
first-time setup capability?

**Opening hook (first 2 minutes):** The presenter should open at a terminal. Run `claude`.
Show the interactive prompt appearing. Then exit and run `claude -p "list the files in this
directory"`. Show the output going to stdout. These two commands represent the module's first
major concept. Build from this moment — the same tool, two completely different operational
modes.

**Concept 1 — Two Invocation Modes (minutes 2–7):**
Draw a two-column whiteboard comparison:

  Left column — INTERACTIVE MODE (`claude`):
  - Starts a REPL (Read-Eval-Print Loop)
  - Conversation history accumulates within the session
  - You can redirect mid-task, answer clarifying questions, add context
  - Session ends when you exit; conversation history does not persist
  - Best for: exploratory work, complex multi-step tasks, debugging where each discovery
    changes direction, initial project setup with unknowns

  Right column — NON-INTERACTIVE MODE (`claude -p "prompt"`):
  - Single-shot execution: prompt in, output to stdout, process exits
  - No conversation history, no mid-task interaction
  - Output can be piped, redirected, captured in a variable
  - Best for: CI/CD pipelines, scripted workflows, scheduled automation, integration with
    other tools

Show concrete non-interactive examples:
  `claude -p "Review the changes in this diff for security issues: $(git diff main)"`
  `REVIEW=$(claude -p "Review src/auth.ts for security vulnerabilities")`
  `echo "$REVIEW" | mail -s "Security Review" team@example.com`

The development → automation pipeline: work out the right prompt and approach in interactive
mode first, then promote it to a non-interactive invocation for repeated use.

**Concept 2 — CLAUDE.md: The Session Briefing System (minutes 7–15):**
The presenter should have a real CLAUDE.md file open in an editor for this section. This is
not optional — watching someone construct a real CLAUDE.md file is worth more than any
diagram of what one contains.

Draw the two-level hierarchy on the whiteboard:
  Global CLAUDE.md at `~/.claude/CLAUDE.md` — applies to ALL sessions regardless of project.
  Contains: preferred code style, tools always used, global constraints.
  Project CLAUDE.md at `.claude/CLAUDE.md` within the project root — applies only to this
  project. Takes precedence when it overlaps with global. These stack; project augments global,
  does not replace it.

Walk through the five categories of content with live examples for each:

  1. ARCHITECTURE OVERVIEW: "This is a TypeScript monorepo using pnpm workspaces. Three
  packages: packages/api (Express + PostgreSQL), packages/web (Next.js 14 App Router),
  packages/shared (shared types and utilities). Drizzle ORM manages the schema, migrations
  in packages/api/migrations/."

  2. CODING CONVENTIONS: "Use zod for all runtime validation — not joi, not yup. Prefer
  named exports. All async functions must handle errors explicitly. Test files colocated with
  source as *.test.ts."

  3. KEY FILE LOCATIONS: The files the agent will need to know about for most tasks.
  Database schema, route handlers, config files, the .env.example.

  4. CONSTRAINTS AND NEVER-DOS: "Never modify files in packages/shared/src/generated/ —
  auto-generated. Never add npm dependencies without noting them. config/production.ts must
  never be modified." Make this section visually distinct in the document — the agent should
  be able to find it immediately.

  5. DECIDED QUESTIONS: "Authentication: JWT tokens with 24h expiry, stateless session
  management. Database: PostgreSQL only, Drizzle only. Testing: Vitest for unit,
  Playwright for e2e."

Three explicit exclusions from CLAUDE.md — present these with the same weight as what belongs:
  SECRETS: CLAUDE.md is committed to git. API keys in CLAUDE.md become API keys in git
  history. Never.
  PER-TASK INSTRUCTIONS: "Add types to src/utils.ts" in CLAUDE.md becomes a permanent
  standing order. Belongs in the prompt, not CLAUDE.md.
  ASPIRATIONAL PRINCIPLES: "Write clean, maintainable code" is not decidable. The agent
  cannot make a concrete decision based on it. Only write actionable, decidable guidance.

The test for every CLAUDE.md entry: "Could an agent use this to make a concrete decision
without further interpretation?" If not, rewrite it or remove it.

**Concept 3 — Permissions: The settings.json System (minutes 15–20):**
Draw the allow/deny model on the whiteboard as a three-zone diagram:

  Zone 1 (ALLOW list): Agent acts without approval. Write these carefully.
  Zone 2 (DENY list): Agent is blocked entirely. Write the dangerous things here.
  Zone 3 (unspecified): Agent asks for approval before acting. This is the safe default.

Show the JSON structure:
  `{"permissions": {"allow": [...], "deny": [...]}}`

Walk through the permission pattern syntax:
  - `"Read"` — allow reading any file
  - `"Write(src/**)"` — allow writes only within src/
  - `"Bash(npm test)"` — allow only this specific command
  - `"Bash(git *)"` — allow any git command
  - `"Bash(rm *)"` in DENY — block all deletions
  - `"Bash(sudo *)"` in DENY — block privilege escalation
  - `"Write(config/prod*)"` in DENY — block production config modification
  - `"Write(.env*)"` in DENY — block environment file modification

Show the complete workable baseline configuration from the module. Walk through each entry
and explain the reasoning: why is `git push` in the deny list? (The agent should not be
committing and pushing without human review.) Why is `Write(src/**)` scoped rather than
just `Write`? (Least privilege — if the task is in src/, the agent doesn't need write access
to config/ or scripts/.)

Principle of least privilege: configure only what the agent needs for the task at hand.
Add permissions as needs emerge; don't start permissive and try to restrict later.

The global vs. project split: global settings.json is your baseline security posture.
Project settings add task-specific permissions on top. They are additive.

**Concept 4 — MCP Servers: Extending Agent Capability (minutes 20–26):**
Draw the conceptual picture: Claude Code has built-in tools (Read, Write, Bash, WebSearch).
MCP servers add external tools that the agent can call exactly as naturally as the built-in
ones. When you configure a postgres MCP server, the agent can run SQL queries as casually as
it reads a file.

Three types of MCP capabilities:
  TOOLS: Functions the agent can call with parameters. Most common. Examples: run a database
  query, create a Linear issue, fetch a Notion page, search a vector store.
  RESOURCES: Data the agent can access as context — documentation corpus, database schema,
  design token set.
  PROMPTS: Pre-defined templates invokable by name. Less common in practice.

Two transport mechanisms — draw as a two-column whiteboard:
  stdio (local): Server runs as a subprocess on the same machine. Claude starts it, talks via
  stdin/stdout, subprocess dies when session ends. Simplest setup for local development.
  Streamable HTTP (remote): External HTTP service. Claude connects over the network. For
  shared team servers, cloud-hosted tools, stateful services.
  EXPLICITLY STATE: SSE (Server-Sent Events) is deprecated as of the MCP spec updated March
  26, 2025. Do not use SSE in new configurations. Remote MCP = Streamable HTTP.

Show the settings.json mcpServers configuration structure with two examples: one stdio
(postgres MCP server), one HTTP (Linear). Call out the `${ENV_VAR}` pattern for credentials
— values come from the shell environment, not from the settings file.

Verifying connectivity: after adding a server, start an interactive session and ask:
"What tools are available from the [server-name] MCP server?" If connected, the agent lists
them. If not, it reports unavailable. Debug workflow: test the command manually in the
terminal first, then verify the environment variable is set, then check Claude.

MCP permissions: the same allow/deny model applies. Pattern: `mcp__{server}__{tool}`.
Example: `"mcp__postgres__query"` in allow, `"mcp__postgres__execute"` in deny — permit
reads, block writes.

**Concept 5 — Reading Agent Output Efficiently (minutes 26–30):**
Three layers of output, quickly:
  Thinking blocks: the scratchpad. Read these before the agent acts — they contain the plan.
  Tool calls + results: the action sequence. Track at a high level; read results for key
  writes and bash commands.
  Response: the synthesis. Read this carefully — it's the agent's summary of what it did
  and what you should verify.

The approval pattern: "Before making any changes, show me your complete plan: which files,
what changes, in what order." One extra exchange that eliminates rollback. Use for any task
touching critical files or hard-to-reverse changes.

**Duration guidance:** 15–22 minutes total. This is the most technically dense module of
Day 1 — resist the temptation to expand. A viewer who can set up CLAUDE.md, settings.json,
and verify an MCP connection in 30 minutes after watching this video is the success criterion.

**Explicit exclusion:** Do NOT cover the PRAO loop in this video — assume viewers have
watched Module 01. Do NOT show how to annotate tool call sequences by phase — that is
Module 03. When the agent's thinking output appears during demos, acknowledge it briefly
("we'll examine this in Module 03") and move on. The focus is the configuration system,
not the reasoning trace.

---

### Slide Deck Focus Prompt

Focus EXCLUSIVELY on Module 02: Claude Code Foundations. No slides about the three-era AI
history, the conceptual argument for agency, reasoning trace annotation, extended thinking,
or prompt engineering patterns. This deck is operational: CLI, CLAUDE.md, settings.json, MCP.

Target: 16–18 slides.

**Slide 1 — Hook:**
Title: "Two commands. Same tool. Completely different operational model."
Side by side, terminal-style:
  Left: `$ claude` → shows interactive prompt appearing, cursor waiting
  Right: `$ claude -p "Review src/auth.ts for security issues"` → output flowing to stdout,
  process exits
One sentence below: "Choosing wrong costs you hours. This module prevents that."

**Slide 2 — Interactive Mode:**
Title: "`claude` — the interactive session."
Two-column layout:
  Left: What it provides: conversation history accumulates, mid-task redirection possible,
  clarifying questions answered in real time, reasoning trace visible as it builds.
  Right: Best for: exploratory work (task requirements emerge as you go), complex multi-step
  tasks where monitoring and occasional redirection matter, debugging with emerging discoveries,
  initial project setup with unknowns.
Bottom: "When the session ends, the conversation history ends with it."

**Slide 3 — Non-Interactive Mode:**
Title: "`claude -p` — single-shot execution."
Two-column layout:
  Left: What it provides: prompt in, output to stdout, process exits. No history, no mid-task
  interaction. Composable with shell tools.
  Right: Best for: CI/CD pipeline steps, scripted automation, scheduled tasks, agent output
  as input to another process.
Code block showing the piping pattern:
  `REVIEW=$(claude -p "Review src/auth.ts for vulnerabilities")`
  `echo "$REVIEW" | mail -s "Security Review" team@example.com`

**Slide 4 — The Development → Automation Pipeline:**
Title: "Develop in interactive. Automate in non-interactive."
Three-step flow diagram:
  Step 1: Interactive session — work out the right prompt, verify the agent's approach,
  identify context gaps.
  Step 2: Update CLAUDE.md with any context the agent lacked during exploration.
  Step 3: Promote to `claude -p "..."` for repeated automated use.
Caption: "The promotion pattern: interactive is the laboratory, non-interactive is the
production run."

**Slide 5 — CLAUDE.md: What It Is:**
Title: "CLAUDE.md is the standing orders document."
Single large call-out box: "CLAUDE.md is read at the start of every session. It is the
briefing that orients the agent to your project before any task begins. It is the memory
that survives sessions."
Below: three-column comparison:
  Without CLAUDE.md: Agent asks basic questions every session, re-learns project structure,
  makes conventions decisions inconsistently.
  With weak CLAUDE.md: Agent has aspirational guidance it can't apply concretely.
  With strong CLAUDE.md: Agent makes correct project-specific decisions from the first
  tool call of every session.

**Slide 6 — The Two-Level Hierarchy:**
Title: "Global CLAUDE.md + Project CLAUDE.md. They stack."
Visual: two document icons with arrows showing they stack:
  Global (~/.claude/CLAUDE.md): Applies to every session. Your preferences, style, global
  conventions that are true across all projects.
  Project (.claude/CLAUDE.md): Applies only to this project. Architecture, conventions,
  constraints specific to this codebase. Augments global; does not replace it.
Caption: "The agent sees both. Project content takes precedence when there is overlap."

**Slide 7 — What Belongs in CLAUDE.md (Part 1: Structure):**
Title: "Five categories. Each earns its place by being actionable."
Numbered list with short definition and one example line per item:
  1. Architecture Overview — "TypeScript monorepo, pnpm workspaces, three packages:
  api/web/shared."
  2. Coding Conventions — "Use zod for validation — not joi, not yup."
  3. Key File Locations — "Database schema: packages/api/src/db/schema.ts"
  4. Constraints and Never-Dos — "Never modify config/production.ts."
  5. Decided Questions — "Authentication: JWT, 24h expiry, stateless."
Bottom caption: "The test for every entry: can an agent make a concrete decision from this
without further interpretation?"

**Slide 8 — What Does NOT Belong in CLAUDE.md:**
Title: "Three categories that actively harm session quality."
Three rows, each as a warning:
  SECRETS: "CLAUDE.md is committed to git. Credentials in CLAUDE.md become credentials
  in git history. Use environment variables."
  PER-TASK INSTRUCTIONS: "Adding 'Add types to src/utils.ts' to CLAUDE.md makes it a
  permanent standing order the agent follows every session."
  ASPIRATIONAL PRINCIPLES: "'Write clean, maintainable code' is not decidable. The agent
  cannot make a concrete choice from it. Only write actionable guidance."
Visual treatment: each row with a red border or strike-through marker.

**Slide 9 — The Permissions Model:**
Title: "Allow list. Deny list. Everything else: ask."
Full-slide three-zone diagram:
  Zone labeled ALLOW: "Agent acts without approval. Write carefully." Examples: Read,
  Write(src/**), Bash(npm test), Bash(git status).
  Zone labeled DENY: "Agent blocked entirely." Examples: Bash(rm *), Bash(sudo *),
  Write(config/prod*), Write(.env*).
  Zone labeled UNSPECIFIED (center or connecting): "Agent asks for approval before acting.
  The safe default for anything not explicitly listed."
JSON structure shown: `{"permissions": {"allow": [...], "deny": [...]}}`

**Slide 10 — Permission Pattern Syntax:**
Title: "Broad, path-scoped, or command-scoped — you choose the precision."
Three-column table:
  Column 1 header: Pattern Type
  Column 2 header: Example
  Column 3 header: What it permits
Rows:
  Broad tool | "Read" | Read any file
  Path-scoped | "Write(src/**)" | Writes only within src/
  Command-scoped | "Bash(npm test)" | Only this specific command
  Wildcard command | "Bash(git *)" | Any git subcommand
  Deny: broad | "Bash(rm *)" | Blocks all delete commands
  Deny: path | "Write(config/prod*)" | Blocks production config writes
  MCP tool | "mcp__postgres__query" | This specific MCP tool only

**Slide 11 — The Baseline Configuration:**
Title: "A workable starting point for any development project."
Full code block showing the complete settings.json from the module.
Two annotations overlaid or beside the code block:
  Annotation 1 (pointing to allow list): "Allows: reading anything, writing to source and
  test directories, running the test and build commands, inspecting git state."
  Annotation 2 (pointing to deny list): "Blocks: file deletion, privilege escalation, git
  push and commit, production config, environment files."
Caption: "Start here. Add specific permissions as tasks require them. Do not start permissive."

**Slide 12 — MCP: Extending Beyond the Local Filesystem:**
Title: "MCP servers give the agent external tools — used exactly like built-in tools."
Conceptual diagram:
  Center: Claude Code agent
  Built-in tools radiating out: Read, Write, Bash, WebSearch
  MCP tools also radiating out (same visual treatment, different color): postgres query,
  Linear issue creation, Notion fetch, vector store search
Caption: "When you configure a postgres MCP server, the agent runs SQL queries as naturally
as it reads a file. No special invocation. Same tool loop."

**Slide 13 — MCP Transport Mechanisms:**
Title: "Two transports. Use the right one. One is deprecated."
Two-column layout:
  stdio (local): Server runs as subprocess on same machine. Started by Claude, dies when
  session ends. Simplest for local dev. Config: command + args.
  Streamable HTTP (remote): External HTTP service, connects over network. For shared team
  servers and cloud-hosted tools. Config: url + optional headers.
Large warning box: "SSE (Server-Sent Events) was deprecated March 26, 2025.
Remote MCP = Streamable HTTP only."

**Slide 14 — MCP Configuration in settings.json:**
Title: "Two examples: one local (stdio), one remote (HTTP)."
Code block showing the mcpServers configuration structure with the postgres stdio example
and the Linear HTTP example. Two callouts:
  Callout on postgres: "command + args — Claude spawns this process"
  Callout on Linear: "url — Claude connects to this endpoint. ${LINEAR_API_KEY} — value
  comes from shell environment, never hardcoded here."

**Slide 15 — MCP Verification Workflow:**
Title: "After configuring: verify before you rely."
Three-step flow:
  Step 1: `npx -y @modelcontextprotocol/server-postgres "postgresql://localhost/mydb"` —
  test the server command manually in your terminal first.
  Step 2: `echo $LINEAR_API_KEY` — verify the environment variable is actually set.
  Step 3: Start `claude`, ask: "What tools are available from the postgres MCP server?" —
  if connected, agent lists tools; if not, agent reports unavailable.
Caption: "If tools are not listed: the server failed to start or the connection failed. Debug
the command directly, not through Claude."

**Slide 16 — Reading Agent Output: Three Layers:**
Title: "Three layers. Three different reading strategies."
Three-row layout:
  Layer 1 — Thinking blocks: "The scratchpad. Read before major actions — contains the plan
  and assumptions. Highest-leverage intervention point."
  Layer 2 — Tool calls + results: "The action sequence. Track at a high level. Read results
  for key writes and bash commands. Not every file read."
  Layer 3 — Response: "The synthesis. Read carefully. This is what the agent did and what
  you should verify."
Bottom: "The approval pattern: 'Show me your complete plan before making any changes.'
Use for any task touching critical files."

**Slide 17 — Summary and Bridge:**
Title: "Module 02: You now have the infrastructure."
Four-item checklist (visually as checked boxes):
  ✓ Interactive vs. non-interactive: you know which to use and when.
  ✓ CLAUDE.md: you know what to put in it, what to leave out, and why.
  ✓ settings.json: you know how to scope permissions to the task at hand.
  ✓ MCP servers: you know how to configure, verify, and use external tools.
Bottom: "Next: Module 03 — Agent Thinking. How to read what the agent is doing inside that
tool loop you've now configured. Reasoning traces, tool call patterns, and when to intervene."

---

---

## Module 03: Agent Thinking

### Video Focus Prompt

Focus EXCLUSIVELY on Module 03: Agent Thinking. Do NOT cover the three-era AI history or the
conceptual case for why agentic AI is different — that is Module 01. Do NOT cover CLI mode
selection, CLAUDE.md construction, settings.json configuration, or MCP server setup — those
are Module 02. Do NOT introduce TCEF, GCCF, or structured prompt engineering patterns —
those are Module 04.

This module is about reading transparency. The subject is the reasoning trace — the visible
output of the agent's internal process — and the skill of reading it well enough to know when
to intervene, when to wait, and what to do in each case. The central argument of the module:
agentic engineering is a professional discipline rather than a faith exercise because the
reasoning is transparent. You can see the process, not just evaluate the output.

**Opening hook (first 2 minutes):** Start with a specific scenario. Show a terminal with
Claude Code running. The agent has produced 400 lines of output — thinking blocks, tool calls,
tool results, more thinking. Ask the audience: what do you actually read? What do you skip?
How long does it take before you know whether the agent is on track or heading somewhere
wrong? The answer to that question is the entire module.

**Concept 1 — Three Layers of Agent Output (minutes 2–6):**
Draw three horizontal bands on the whiteboard. Each is a layer of Claude Code's output.

  Layer 1 — THINKING LAYER (scratchpad):
  Before significant actions, the agent reasons through the problem visibly. It explores
  possibility space, surfaces constraints, plans the action sequence. This is not a
  performance — it is the actual reasoning process made visible. Crucially: the agent does
  not commit to actions during thinking. It is exploring before deciding.
  Read this layer: before major actions, to understand what the agent believes about the
  task. This is the highest-leverage intervention point — you can correct a wrong assumption
  before a single file is touched.

  Layer 2 — TOOL CALL LAYER (action sequence):
  Concrete actions with their results. Read("src/auth.ts") followed by the file contents.
  Write("src/auth.ts", ...) followed by the write confirmation. Bash("npm test") followed
  by the test output. This is the Act and Observe part of the PRAO loop made visible.
  Read this layer: track the sequence at a high level. Read the actual results for key writes
  and bash commands. You do not need to read every file the agent reads.

  Layer 3 — RESPONSE LAYER (synthesis):
  The agent's summary of what it did. The conversational output. What the agent would say
  if you asked "what happened?" It draws on the thinking and tool call layers but presents
  a narrative.
  Read this layer: carefully, every time. This is the agent's own account of what changed
  and why. Verify it matches what you saw in the tool calls.

**Concept 2 — Chain-of-Thought in Practice: What a Real Trace Looks Like (minutes 6–12):**
The presenter should have a pre-prepared reasoning trace on screen — either from the
authentication refactoring example in the module or a similar real task. Walk through it
section by section, with the audience watching.

Annotate the trace by phase as you walk through it:
  "This thinking block is the Perceive phase — the agent is deciding what to read before
  reading anything."
  "This is the Reason phase — the agent has now built a plan with numbered steps. Notice it
  has identified an ambiguity (where to store refresh tokens) and made a reasoned choice,
  stating its reasoning explicitly."
  "These tool calls are the Act phase."
  "This Bash command is the Observe phase — the agent is checking whether its action
  succeeded."

Highlight constraint discovery mid-reasoning. The agent finds that `config/production.ts`
must not be modified (from CLAUDE.md) in the middle of reasoning through its plan. Show how
this discovery changes the approach. This is the reasoning trace doing its job — revealing
an adaptation that you would otherwise only see in the final output, with no visibility
into why the structure is what it is.

The key point about the thinking layer: it is not overhead. It is quality control at the
cheapest point in the process. An agent that reasons through a plan before acting catches
wrong assumptions before they become file modifications. The alternative — acting without
reasoning — produces code that may work locally but doesn't account for constraints the
agent didn't discover because it didn't look.

**Concept 3 — Five Tool Call Patterns (minutes 12–18):**
This is the pattern recognition section. Draw each pattern on the whiteboard as a compact
sequence — tool name, result, tool name, result.

  Pattern 1: Read → Think → Write (single file)
  The simplest pattern. Perceive one file, reason, act by writing it. Signals a focused,
  well-understood task. Usually fast and correct. This is what you want to see for simple,
  bounded tasks.

  Pattern 2: Read×N → Think → Write×N (multi-file)
  The agent reads all relevant files before making any changes. Correct behavior for tasks
  with dependencies between files — avoids making a change in file A that breaks something
  in file B it hasn't read yet. If you see this, the agent is being thorough, not lost. The
  key: it eventually transitions to action.

  Pattern 3: Bash→Bash→Bash (exploration)
  The agent is exploring the environment. ls, find, cat package.json, tsc --noEmit to see
  existing errors. Pure Perceive phase. Happens at the start of tasks or when the agent
  encounters something unexpected. Correct behavior. The signal to watch: if exploration
  never transitions to action, the agent is stuck.

  Pattern 4: Read → Write → Bash → Read (act and verify)
  The agent acts and then verifies the effect — the Observe phase made visible. Re-reading
  a file after writing it is the agent verifying the write succeeded. Running tsc --noEmit
  after a write is verifying no type errors were introduced. A Read→Write→Read→Write
  sequence on the same file is the agent iterating toward correctness. Correct behavior
  until the iterations stop converging.

  Pattern 5: Think×N → (no action)
  Repeated thinking without action. The agent has hit genuine ambiguity it cannot resolve
  with available information. This is not failure — it is the agent correctly identifying
  it lacks what it needs. A well-calibrated agent surfaces this as a clarifying question.
  The problem is when it loops through thinking without surfacing the impasse. If you see
  long thinking sequences with no action, intervene.

  The key diagnostic for Pattern 4 vs. a stuck loop: are repeated reads of the same file
  separated by writes (content changes) or not? If writes are happening between the reads,
  the agent is iterating. If the same file is being read repeatedly with no intervening
  write, and the thinking blocks are covering the same ground, it is a loop. Intervene with
  a clarifying statement or the answer to the question the agent is visibly circling around.

**Concept 4 — Clarifying Questions: A Feature, Not a Failure (minutes 18–21):**
Many engineers feel frustrated when the agent asks a clarifying question. The expectation is
that the agent should figure it out or try its best. This expectation produces worse results.

Clarifying questions are the agent surfacing genuine ambiguity rather than resolving it with
a silent wrong assumption. A confident wrong assumption shows up later — as incorrect code
that looks correct at first glance. An explicit question gives you a decision point.

Three types of clarifying questions with examples:
  Scope clarification: "Should I also update the logout endpoint to invalidate refresh tokens,
  or should that be a separate task?" — Answer with a bounded scope decision.
  Authority clarification: "For storing refresh tokens, I can use PostgreSQL (new table) or
  in-memory (simpler but not persistent across restarts). Which do you prefer?" — This is an
  architectural decision. Answer and add to CLAUDE.md if it's a standing convention.
  Context clarification: "Should the new refresh token tests use the existing mock JWT
  library?" — This is a testing philosophy question the codebase alone can't answer.

Answering well: be specific and bounded. Include your reasoning if it affects downstream
decisions the agent hasn't asked about yet. Decide whether the answer reflects a standing
convention (CLAUDE.md) or a one-time task-specific choice (answer in conversation, done).

**Concept 5 — Extended Thinking: When More Deliberation Is Worth It (minutes 21–28):**
Draw the three-level spectrum on the whiteboard:
  Simple request → Direct response (~0 thinking tokens). "Add a comment here." No need for
  deliberation.
  Medium complexity → Step-by-step reasoning (~1K tokens). Most coding tasks. The agent
  plans before acting.
  Hard problem → Extended thinking (~10K+ tokens). Multi-constraint architectural decisions,
  complex multi-system debugging, formal verification tasks.

What extended thinking is technically: an API-level parameter, not a CLI flag. It causes the
model to produce an explicit reasoning trace before responding. More extensive, more
exploratory than ordinary chain-of-thought. The model may backtrack, explore rejected paths,
and refine its approach. The trace is often longer than the final response.

When it is worth the overhead:
  Complex architectural decisions with many competing constraints.
  Debugging multi-system failures where the causal chain spans multiple services and states.
  Trade-off analysis where objectives compete quantitatively.
  Formal verification: verifying a solution satisfies a precise set of requirements, checking
  edge cases systematically.

When it is not worth the overhead (be explicit):
  Simple well-defined edits (add a field, fix a spelling error).
  Boilerplate generation following an established pattern.
  Single-file changes with clear requirements.
  Repetitive transformations across many files.

What the extended thinking trace reveals beyond the conclusion:
  Assumptions made explicit (invisible in a final answer).
  Rejected approaches and why (as valuable as understanding the chosen approach).
  Constraint interactions (which constraints conflict, how conflicts were resolved).
  Uncertainty points — exactly where human review should concentrate.

End with the authentication example: an extended thinking trace might reveal "Approach A
fails under high concurrency. Approach C requires an additional service that violates the
operational simplicity constraint. Approach B satisfies all hard constraints." The final
answer says "Approach B." The trace explains why in terms that let you verify the reasoning
is sound. These are different levels of trust in the output.

**Duration guidance:** 15–22 minutes total.

**Explicit exclusion:** Do NOT discuss how to write CLAUDE.md or configure settings.json in
this module — assume those are complete from Module 02. When the trace annotation exercise
references CLAUDE.md content (such as the constraint on production.ts), acknowledge it
briefly and move forward. Do NOT frame this module as being about how to prompt the agent
better — that is Module 04. The focus here is reading what the agent produces, not shaping
what it receives.

---

### Slide Deck Focus Prompt

Focus EXCLUSIVELY on Module 03: Agent Thinking. No slides about the three-era AI history,
CLI mode selection, CLAUDE.md configuration, settings.json, MCP servers, or prompt
engineering patterns. This deck teaches a reading skill: how to interpret reasoning traces
efficiently and make sound intervention decisions.

Target: 14–16 slides.

**Slide 1 — Hook:**
Title: "The agent just produced 400 lines of output. What do you read?"
Visual: a scrolling terminal window filled with dense output — thinking blocks, tool calls,
tool results. Arrow pointing to a specific thinking block: "this?" Arrow pointing to a tool
call: "this?" Arrow pointing to a Bash result: "this?"
One sentence below: "Engineers who can answer this question catch bugs before they're
committed. Engineers who can't either miss them or read everything, which takes as long as
doing the work manually."

**Slide 2 — Why Transparency Changes Everything:**
Title: "Previous AI tools: evaluate the output. Claude Code: watch the process."
Two-column comparison:
  Era 1 + 2: Black box. You get a suggestion or a text response. You evaluate the output.
  You cannot see what assumptions drove it. You cannot catch a wrong assumption before it
  produces wrong output.
  Era 3: Transparent process. You see the agent's task model. You see its assumptions. You
  see its plan before it acts. You can catch a wrong assumption before a single file is
  modified.
Caption: "This transparency is why agentic engineering is a professional discipline rather
than a faith exercise. The reasoning is visible. You are accountable for what you approve."

**Slide 3 — Three Layers of Agent Output:**
Title: "Three layers. Three reading strategies. Different information at each level."
Three-row diagram (horizontal bands):
  Row 1 — THINKING LAYER: "Internal scratchpad. Agent explores before committing. Not
  a performance — actual reasoning. Read before major actions."
  Row 2 — TOOL CALL LAYER: "Concrete actions with results. The Act+Observe phases of
  PRAO made visible. Track sequence; read key results."
  Row 3 — RESPONSE LAYER: "Agent's synthesis. What it did and why. Read carefully every
  time. Verify it matches what you saw in the tool calls."
Right margin annotation: "Thinking = where to intervene. Tools = what is happening. Response
= what to verify."

**Slide 4 — The Thinking Layer is Quality Control:**
Title: "The thinking layer is not overhead. It is error correction before errors are made."
Single large call-out: "An agent that reasons through a plan before acting catches wrong
assumptions before they become file modifications. The alternative — acting without reasoning
— produces code that may work locally but doesn't account for constraints the agent didn't
discover because it didn't look."
Below: two-column contrast:
  Thinking → then Act: wrong assumption caught in thinking block, zero files modified.
  Act immediately: wrong assumption discovered in code review or test failure, rollback
  required.
Caption: "The thinking layer catches mistakes at the cheapest point in the cycle."

**Slide 5 — Reading a Real Reasoning Trace:**
Title: "Annotating the authentication refactoring trace."
Layout: a condensed but real reasoning trace excerpt occupying most of the slide, with
callout annotations pointing to specific sections:
  Callout 1 (pointing to opening thinking block): "PERCEIVE — agent decides what to read
  before reading anything."
  Callout 2 (pointing to post-read thinking): "REASON — numbered plan, ambiguity surfaced
  (storage choice), reasoned resolution stated explicitly."
  Callout 3 (pointing to tool calls): "ACT — executing the plan in sequence."
  Callout 4 (pointing to bash command): "OBSERVE — checking the effect of the action."
Caption: "Each callout is a PRAO phase made visible. The trace is the loop, annotated."

**Slide 6 — Constraint Discovery Mid-Reasoning:**
Title: "The trace shows you what the prompt couldn't tell the agent."
Condensed trace excerpt showing the moment the agent encounters the CLAUDE.md constraint on
config/production.ts while reasoning about the refresh token implementation. Callout: "The
agent discovers a constraint it wasn't explicitly given in the prompt. It adapts its plan.
You see the adaptation. Without the trace, you'd only see the resulting structure with no
explanation."
Caption: "This is the trace doing its job. Not overhead. Evidence of reasoning quality."

**Slide 7 — Five Tool Call Patterns:**
Title: "Pattern recognition: what the sequence tells you."
Five-row table:
  Pattern | Sequence | What it signals | Your response
  Single-file | Read → Think → Write | Focused, bounded task | Watch for correctness
  Multi-file | Read×N → Think → Write×N | Cross-file dependencies, being thorough | Let it
  build before acting
  Exploration | Bash→Bash→Bash | Pure Perceive; environment mapping | Normal; watch for
  transition to action
  Act+Verify | Read→Write→Bash→Read | Iterating toward correctness | Normal; watch for
  convergence
  Impasse | Think→Think→Think (no action) | Genuine ambiguity, needs input | Intervene with
  clarification

**Slide 8 — Distinguishing Loops from Thoroughness:**
Title: "Same-file reads: iteration or stuck?"
Two-column comparison:
  THOROUGHNESS: Reads file A → reads file B it discovered → reads test file for A → all
  new content each time → transitions to action.
  LOOPING: Reads file A → thinking covers same ground → reads file A again → thinking
  covers same ground → no write occurs between reads.
Diagnostic rule in large type: "Are writes happening between the repeated reads? If yes:
iterating. If no: looping."
Caption: "When you identify a loop: intervene with the answer to the question the agent is
visibly circling. Do not just say 'continue' — that continues the loop."

**Slide 9 — Clarifying Questions: Feature, Not Failure:**
Title: "A clarifying question is the agent refusing to make a silent wrong assumption."
Two-column contrast:
  Silent wrong assumption: Confident incorrect code. Discovered at code review or test
  failure. May have cascading effects on downstream decisions already made.
  Explicit clarifying question: Decision point surfaced to you. You answer with the correct
  choice. Downstream decisions made correctly.
Caption: "The engineer who finds agent clarifying questions frustrating is choosing to prefer
confident wrong assumptions over explicit decision points."

**Slide 10 — Three Types of Clarifying Questions:**
Title: "What the agent is asking, and how to answer well."
Three rows:
  Row 1: SCOPE — "Should I also update the logout endpoint?" — Answer with: a bounded yes
  or no with clear justification. Update CLAUDE.md if this defines task scope conventions.
  Row 2: AUTHORITY — "Store refresh tokens in PostgreSQL or in-memory?" — Answer with: the
  architectural decision plus the reasoning that drove it. Add to CLAUDE.md — this is a
  standing choice.
  Row 3: CONTEXT — "Should new tests use the existing mock JWT library?" — Answer with: the
  testing philosophy and why. Add to CLAUDE.md if it's a standing convention.
Bottom caption: "One-time task choices: answer in conversation. Standing conventions: answer
in conversation AND add to CLAUDE.md."

**Slide 11 — When to Intervene vs. When to Wait:**
Title: "The intervention decision framework."
Two-column table:
  INTERVENE when: Thinking block reveals a wrong assumption before any action is taken.
  | Agent is reading/modifying files outside the task scope. | Loop pattern detected (same
  operations repeating, no progress). | Agent has discovered something that changes the task
  requirements and needs human input.
  WAIT when: Agent's path is unexpected but the reasoning is sound. | Agent is reading many
  files before acting (multi-file thoroughness pattern). | Agent is verifying its own writes
  (act+verify pattern). | Thinking is exploratory but still building toward a plan.
Caption: "The discipline: read the reasoning before deciding to interrupt. Unexpected ≠
wrong."

**Slide 12 — Extended Thinking: The Spectrum:**
Title: "More deliberation is not always better. Match thinking depth to problem complexity."
Three-level horizontal spectrum diagram:
  Level 1 — Direct response: "Simple, well-defined edit. 'Add a JSDoc comment.' ~0 thinking
  tokens. No benefit from extensive deliberation."
  Level 2 — Step-by-step reasoning: "Standard coding task. Plan before acting. ~1K tokens.
  Normal agent behavior for most tasks."
  Level 3 — Extended thinking: "Multi-constraint architectural decision. Complex multi-system
  debug. Formal verification. ~10K+ tokens. Use deliberately."
Caption: "Extended thinking is an API-level capability, not a CLI flag. It is for problems
where the correct answer requires reasoning through many intermediate steps, holding multiple
constraints simultaneously, or exploring a large possibility space."

**Slide 13 — When Extended Thinking Is Worth the Overhead:**
Title: "Four problem types that benefit. Everything else does not."
Four-box grid:
  Box 1: Multi-constraint architectural decisions — choosing between architectures when 15+
  specific constraints must all be satisfied.
  Box 2: Multi-system debugging — bug that manifests in service A, caused by service B,
  triggered by state in service C, under a specific event sequence.
  Box 3: Quantitative trade-off analysis — competing objectives with numbers: latency vs.
  throughput, consistency vs. availability.
  Box 4: Formal verification — verifying a solution satisfies a precise set of requirements,
  checking edge cases systematically.
Below in smaller text: "Does NOT benefit: simple edits, boilerplate generation, single-file
changes with clear requirements, repetitive same-transformation-across-many-files tasks."

**Slide 14 — What the Extended Thinking Trace Reveals:**
Title: "The recommendation is the same. The trace is what makes it trustworthy."
Two-column comparison using the authentication example:
  Final answer only: "I recommend Approach B."
  Extended thinking trace: "Approach A fails under high concurrency (constraint 7). Approach
  C requires an additional service violating operational simplicity (constraint 12). Approach
  B satisfies all hard constraints and is an acceptable trade-off on the soft constraints.
  One uncertainty: this assumption holds if traffic stays under X req/s."
Caption: "The recommendation is identical. The trace reveals why it is correct and where
the uncertainty lives — exactly where human review should concentrate."

**Slide 15 — A Complete Trace Reading Exercise:**
Title: "Tracing the /api/users bug fix: all seven steps annotated."
Condensed seven-step sequence from the module's worked example, each step labeled with its
PRAO phase and tool call pattern:
  Step 1: Bash(grep...) — PERCEIVE / Exploration pattern
  Step 2: Read(users.ts), Read(userService.ts) — PERCEIVE / Multi-file read
  Step 3: [thinking: hypothesis formation] — REASON
  Step 4: Read(userService.ts again, focused) + thinking — PERCEIVE + REASON / Verification
  Step 5: Write(routes/users.ts) — ACT
  Step 6: Bash(npm test), Bash(tsc --noEmit) — OBSERVE / Act+Verify pattern
  Step 7: Response with fix summary and test coverage recommendation — SYNTHESIS
Caption: "Each step is classifiable. Each classification tells you what to expect next and
what to verify."

**Slide 16 — Summary and Bridge:**
Title: "Module 03: You can now read the transparency."
Four-item summary (large type):
  "Three layers: thinking (read before action), tool calls (track at a high level), response
  (verify carefully)."
  "Five patterns: single-file, multi-file, exploration, act+verify, impasse. Each has a
  distinct look and a distinct appropriate response."
  "Clarifying questions: answer specifically, with reasoning, and record standing decisions."
  "Extended thinking: reserved for genuinely hard problems — multi-constraint, multi-system,
  formal reasoning."
Bottom: "Modules 01–03 complete. You have the conceptual model, the configuration
infrastructure, and the trace-reading skill. Days 2 and 3: multi-agent systems, CI/CD
integration, MCP server development, and production deployment."
