# Agentic AI Engineering: 3-Day Immersive Course
## Master Curriculum Outline — Two Degrees of Depth

**Course ID:** CETI-AGT-301
**Duration:** 3 days (18 contact hours + 6 pre-work hours)
**Audience:** Technical engineers with software development background, minimal AI exposure
**Outcome:** Graduates can design, build, and deploy agentic AI systems using Claude Code, MCP, and advanced prompt engineering in their organizational context.

---

## Pedagogical Design Principles

1. **Flipped Classroom** — Pre-work (NotebookLM audio/video) handles concept introduction; class time = application
2. **Cognitive Scaffolding** — Each concept builds on prior; no orphaned knowledge
3. **Constructive Alignment** — Every lab directly serves a stated learning objective
4. **Spaced Practice** — Core concepts revisited on Days 2 and 3 with increasing complexity
5. **Metacognitive Transparency** — OpenCode shows agents thinking; learners model that thinking
6. **Transfer Readiness** — Every session ends with: "How does this apply to YOUR stack/org?"
7. **Assessment for Learning** — Quizzes are diagnostic tools, not gatekeepers

---

## Pre-Work (Before Day 1) — 4-6 Hours

### Pre-Work Module A: Mental Model Reset
**Learning Objective:** Arrive Day 1 with the mental model that AI is a reasoning collaborator, not a search engine or autocomplete tool.

**Deliverables:**
- NotebookLM Audio Podcast: "From Scripting to Cognition" (45 min)
- Reading: Chapter 1 source material "The Paradigm Shift" (2,500 words)
- Self-reflection worksheet: "My current relationship with AI tools"

#### Sub-Concepts
- A.1 What LLMs actually are (prediction machines → emergent reasoning)
  - A.1.1 Tokens, context windows, and attention mechanisms (conceptual, not mathematical)
  - A.1.2 The difference between retrieval, generation, and reasoning
  - A.1.3 Why LLMs make mistakes and how to compensate
- A.2 The software development lifecycle is changing
  - A.2.1 Tasks that stay human vs. tasks that become collaborative
  - A.2.2 The "10x engineer" narrative: what it actually means
  - A.2.3 Organizational implications: roles, workflows, culture
- A.3 The agentic paradigm shift
  - A.3.1 Script → Program → Service → Agent: the evolutionary arc
  - A.3.2 Agency = perception + reasoning + action + observation (PRAO loop)
  - A.3.3 Real examples: Claude Code in a production engineering workflow

### Pre-Work Module B: Environment Setup
**Learning Objective:** Arrive Day 1 with a functional, sandboxed development environment ready for lab work.

**Deliverables:**
- Setup guide with verification commands
- Pre-check script (runs in 60 seconds to verify readiness)

#### Sub-Concepts
- B.1 Claude Code installation and authentication
  - B.1.1 Installation paths for Mac/Linux/Windows
  - B.1.2 API key configuration (secure patterns only)
  - B.1.3 Verification: `claude --version` and health check
- B.2 Sandbox environment activation
  - B.2.1 What sandboxing means and why it matters in training
  - B.2.2 Restricted permissions profile: what it blocks and why
  - B.2.3 How to restore full permissions post-training
- B.3 Course repository clone and orientation
  - B.3.1 Repository structure tour
  - B.3.2 Customization variables (org name, tech stack, team name)
  - B.3.3 First command: running the environment health check

---

## Day 1: The Paradigm — Understanding Agentic Intelligence

**Day Theme:** "Seeing the world the way an agent sees it."
**Daily Goal:** Learners can describe the PRAO loop, write their first effective Claude Code prompt, and explain what makes AI "agentic" vs. merely automated.

**Pre-Assessment (09:00, 5 minutes):** "Draw or describe in words how you currently think AI tools like ChatGPT or Copilot work. What happens when you send a prompt?" — No right or wrong answers; reveals baseline mental models and surfaces the misconceptions this day is designed to correct. Revisit at Day 1 close.

---

### Module 1.1: The Paradigm Shift — From Code to Cognition
**Time:** 09:00–10:30 (90 minutes)
**Lab:** Lab 01 — The Paradigm Shift (interactive HTML)
**Pre-work:** Module A required

**Learning Objective:** Articulate the fundamental difference between procedural automation and agentic AI, and explain why this changes how software is built.

#### 1.1.1 The Old Mental Model: Deterministic Systems
- **Sub-concept:** Input → Process → Output pipelines
  - What "deterministic" means in software engineering
  - Why traditional code can't handle ambiguity
  - The limits of if-then-else reasoning at scale
- **Sub-concept:** Automation vs. Intelligence
  - Automation: doing a known sequence reliably
  - Intelligence: navigating novel situations with judgment
  - The Moravec paradox: hard for computers, easy for humans — and vice versa
- **Sub-concept:** Why Current AI Tools Feel Limited
  - Copilot/autocomplete: next-token prediction, not task completion
  - Chatbots: conversation without context persistence or tool use
  - The missing ingredient: agency (ability to perceive, decide, and act)

#### 1.1.2 The New Mental Model: Agentic Systems
- **Sub-concept:** The PRAO Loop (Perceive → Reason → Act → Observe)
  - Perceive: reading files, running commands, browsing docs
  - Reason: planning approach, weighing options, writing and revising plans
  - Act: calling tools, editing files, running code, sending requests
  - Observe: reading results, detecting errors, updating understanding
- **Sub-concept:** What Makes a System "Agentic"
  - Autonomy: acts without step-by-step instructions
  - Tool use: extends capabilities beyond pure language
  - Memory: maintains context across steps
  - Goal-directedness: pursues outcomes, not just instructions
- **Sub-concept:** Claude Code as an Agentic System
  - Architecture: Claude model + tool layer + file system + shell
  - How Claude Code reads your codebase (context window, glob, grep)
  - The "conversation" that never appears in a chat UI
  - Real example: "Add authentication to this Express app" — what actually happens

#### 1.1.3 Implications for Engineering Practice
- **Sub-concept:** New Debugging Paradigm
  - Debugging code: deterministic, traceable
  - Debugging agent behavior: probabilistic, context-dependent
  - Tools: verbose output mode (shows tool calls in real time), OpenCode transparency TUI, conversation review
- **Sub-concept:** New Design Paradigm
  - Designing for agent collaboration (descriptive code, good test coverage, clear comments)
  - What agents need to work well: context, constraints, clear goals
  - Tech debt implications: poorly-structured code is harder for agents to navigate
- **Sub-concept:** New Professional Identity
  - From "code writer" to "systems orchestrator"
  - Knowing when to intervene vs. let the agent proceed
  - Developing taste for effective agent prompting

---

### Module 1.2: Claude Code Foundations
**Time:** 10:45–12:15 (90 minutes)
**Lab:** Lab 02 — First Agent Conversation (interactive HTML)

**Learning Objective:** Operate Claude Code effectively for common engineering tasks, understand its capabilities and limits, and develop intuition for effective task framing.

**Responsible Use Baseline (10 minutes, start of session):** Before touching tools, establish three commitments that apply for the rest of the course: (1) You review everything the agent produces before accepting it — agents make mistakes. (2) You never use real production credentials, PII, or proprietary secrets in training environments. (3) You stay curious about failure, not frustrated — agent failures are learning data, not errors. These aren't rules imposed on learners; they're professional practices that make agentic systems actually trustworthy.

#### 1.2.1 Claude Code Architecture
- **Sub-concept:** The Three Layers
  - Language model layer: reasoning, planning, code generation
  - Tool layer: file operations, shell execution, search, web fetch
  - Context layer: CLAUDE.md, settings.json, skills, conversation history
- **Sub-concept:** How Claude Code Reads Your Codebase
  - Glob patterns for file discovery (`**/*.ts`, `src/**/*.py`)
  - Grep for semantic search across code
  - Shell commands (`find`, `cat`, `git log`) for deeper exploration
  - File references in prompts: "read src/utils.ts before answering"
- **Sub-concept:** Safety Architecture
  - What Claude Code will and won't do by default
  - The `settings.json` allow/deny system: per-tool permission configuration
  - How tool blocking works (e.g. blocking `Bash` or restricting paths)
  - How the sandbox profile restricts capabilities in training environments

#### 1.2.2 Effective Task Communication
- **Sub-concept:** Anatomy of an Effective Claude Code Prompt
  - Goal: what outcome do you want?
  - Context: what does Claude need to know that it can't see?
  - Constraints: what must NOT happen?
  - Format: how should the output be structured?
- **Sub-concept:** The Specificity Spectrum
  - Too vague: "improve this code"
  - Too prescriptive: "on line 47 add a try-catch with..."
  - Goldilocks zone: "add error handling for network failures in the API client, preserving the existing retry logic"
- **Sub-concept:** Iterative Refinement
  - First response as a draft, not a final answer
  - Effective follow-up: "keep X, change Y, also add Z"
  - When to start a new conversation vs. continue refining

#### 1.2.3 Core Claude Code Commands
- **Sub-concept:** The Essential Command Set
  - `claude` — interactive mode (most powerful)
  - `claude -p "..."` — one-shot print mode
  - `claude --continue` — resume last conversation
  - `claude --model` — model selection
  - `claude /help` — discover available commands
- **Sub-concept:** Slash Commands in Interactive Mode
  - `/clear` — reset conversation context
  - `/compact` — compress conversation history to reduce token usage
  - `/cost` — view token usage for the current session
  - `/help` — discover all available built-in and custom commands
  - Custom commands: your own `/slash-commands` stored in `.claude/commands/`
  - Note: persistent project context lives in CLAUDE.md, not a `/memory` command
- **Sub-concept:** Output Modes and Piping
  - JSON output for programmatic use
  - Streaming vs. complete responses
  - Piping into other tools: `claude -p "..." | jq`
  - Exit codes for scripting

---

### Module 1.3: Agent Thinking — The OpenCode Window
**Time:** 13:15–14:45 (90 minutes)
**Lab:** Lab 03 — Agent Thinking with OpenCode (interactive HTML)

**Learning Objective:** Use OpenCode to observe and interpret an agent's chain-of-thought, distinguish effective from ineffective reasoning patterns, and use this insight to write better prompts.

#### 1.3.1 What Thinking Traces Reveal
- **Sub-concept:** Extended Thinking and Reasoning Visibility
  - What extended thinking is: the model reasoning through its approach before responding
  - How it's enabled: model-level configuration (Claude 3.7 Sonnet with extended thinking API parameter, or Sonnet 4 series); not a CLI flag
  - OpenCode as the transparency layer: shows tool calls, results, and reasoning in real time
  - What a thinking trace looks like: plan formation, uncertainty markers, decision branching
- **Sub-concept:** Reading Agent Reasoning
  - Plan formation: seeing the agent outline its approach
  - Uncertainty markers: where the agent hedges or considers alternatives
  - Decision points: what causes the agent to choose one path
  - Self-correction: catching and fixing mistakes mid-stream
- **Sub-concept:** Common Thinking Pathologies to Recognize
  - Premature commitment: deciding before gathering enough context
  - Context blindness: ignoring available information
  - Overconfidence: not hedging on ambiguous cases
  - Recursive confusion: reasoning in circles

#### 1.3.2 OpenCode Integration
- **Sub-concept:** OpenCode Architecture
  - What OpenCode is and how it differs from Claude Code's default UI
  - The transparency philosophy: see every tool call, every result
  - Installation and configuration for course environment
- **Sub-concept:** Live Reasoning Sessions
  - Running a task in OpenCode and narrating what you see
  - Using the step-through mode for pedagogical analysis
  - Exporting reasoning traces for reflection and study
- **Sub-concept:** Using Transparency to Improve Prompts
  - Identifying where the agent got confused (context gap)
  - Identifying where the agent over-engineered (over-specified prompt)
  - The feedback loop: trace → insight → revised prompt → better outcome

#### 1.3.3 Developing Agentic Intuition
- **Sub-concept:** Mental Simulation
  - Before sending a prompt: mentally simulate the agent's PRAO cycle
  - Ask: "What will the agent perceive? What might confuse it? What action will it take?"
  - Building the habit of pre-prompt simulation
- **Sub-concept:** The PRAO Retrospective
  - After each agent task: walk through what happened at each loop phase
  - What did the agent perceive that you didn't expect?
  - What did it reason that surprised you?
  - How does this inform your next prompt?
- **Sub-concept:** Calibrating Trust and Verification
  - When to trust agent output (low-risk, well-defined, verifiable tasks)
  - When to always verify (security, external APIs, data mutations)
  - Building verification into your workflow: tests, diffs, staging

---

### Module 1.4: Day 1 Integration Lab & Reflection
**Time:** 15:00–17:00 (120 minutes)
**Lab:** Integrated practice (use all three tools on a real task from your org)

**Learning Objective:** Apply Day 1 concepts to a real engineering task from the learner's own context, receiving peer feedback and facilitator coaching.

#### 1.4.1 Structured Practice Session
- **Sub-concept:** Task Selection Framework
  - Choosing an appropriate Day 1 task (complexity range: small-medium)
  - Defining success criteria before starting
  - Documenting your PRAO predictions
- **Sub-concept:** Facilitated Problem-Solving
  - Facilitator circulates, coaching on prompt specificity
  - Pair observation: watch your partner's agent, narrate what you see
  - "Hot seat" demonstration: one learner drives, cohort observes and suggests
- **Sub-concept:** Debugging Your First Agent Failure
  - What to do when the agent goes wrong (don't start over — trace first)
  - The three most common Day 1 failures and their fixes
  - Building your personal "agent failure journal"

#### 1.4.2 Day 1 Retrospective
- **Sub-concept:** Knowledge Consolidation
  - Three things you understood that you didn't before
  - One thing that's still unclear (these feed tomorrow's warm-up)
  - One thing you want to try on your own codebase
- **Sub-concept:** Mental Model Mapping
  - Sketch your mental model of an agentic system (no looking at notes)
  - Compare with partner's sketch: what's different? What did each person emphasize?
  - Facilitator synthesizes into canonical "Day 1 model" on the shared board
- **Sub-concept:** Pre-work Preview for Day 2
  - What to watch/read tonight (NotebookLM: MCP Architecture module)
  - Preview question: "How would you add a new tool to Claude Code's capability set?"

---

## Day 2: The Architecture — Prompting, MCP, and Skill Systems

**Day Theme:** "Extending and directing the agent's capabilities."
**Daily Goal:** Learners can connect MCP servers to Claude Code, write high-quality prompts using structured patterns, and build their first custom skill and slash command.
**Instructional Sequence:** Lab 05 (Prompt Engineering) → Lab 04 (MCP Server Explorer) → Lab 06 (Skills & Commands Builder)

**Morning Retrieval Sprint (09:00, 10 minutes):** Without notes, each learner writes answers to three questions: (1) Name the four phases of the PRAO loop and what happens in each. (2) What's the difference between `claude` and `claude -p "..."`? (3) What does CLAUDE.md do? — Pairs compare, then facilitator synthesizes. Surfaces gaps from Day 1 before building on top of them.

---

### Module 2.1: Prompt Engineering as a Discipline
**Time:** 09:00–10:30 (90 minutes)
**Lab:** Lab 05 — Prompt Engineering Workshop (interactive HTML)
**Pre-work:** NotebookLM Module 4 required

**Learning Objective:** Apply structured prompt engineering patterns to produce reliable, high-quality agent behavior across a variety of engineering tasks.

#### 2.1.1 Prompt Anatomy and Layers
- **Sub-concept:** The Four-Layer Model
  - System context (CLAUDE.md): permanent instructions, persona, constraints
  - Task context: what this specific invocation is about
  - Knowledge injection: relevant code, docs, examples
  - Behavioral modifiers: output format, tone, depth
- **Sub-concept:** Context Window Economics
  - Tokens are finite: every word you add displaces something
  - What to include (high-signal) vs. exclude (low-signal)
  - Compression strategies: summaries, references, glob patterns
  - When context compression hurts (nuance loss)
- **Sub-concept:** The Signal-to-Noise Ratio
  - What makes a prompt high-signal: specificity, examples, constraints
  - What makes a prompt low-signal: filler words, vague adjectives, redundancy
  - Prompt linting: reading your own prompts as an agent would

#### 2.1.2 Prompt Patterns (The Pattern Library)
- **Sub-concept:** The Task-Context-Examples-Format (TCEF) Pattern
  - Task: clear, specific goal statement
  - Context: what the agent must know
  - Examples: one or two demonstrations of desired output
  - Format: exact structure expected in response
- **Sub-concept:** The Chain-of-Thought Elicitation Pattern
  - Forcing explicit reasoning: "Think through this step by step before responding"
  - Breaking complex tasks into visible reasoning steps
  - When to use vs. when it adds overhead
- **Sub-concept:** The Constraint-First Pattern
  - Leading with what must NOT happen (negative space design)
  - Critical for security-sensitive, data-sensitive operations
  - Combining with positive instruction for complete specification
- **Sub-concept:** The Role-Persona Pattern (used carefully)
  - Persona assignment for specialized knowledge access
  - Why "you are an expert X" works (and its limits)
  - Safe persona patterns vs. problematic ones
- **Sub-concept:** The Output Scaffold Pattern
  - Providing exact output template for agent to fill
  - JSON schema enforcement via example
  - Markdown structure enforcement

#### 2.1.3 Prompt Iteration Workflow
- **Sub-concept:** The Write-Test-Refine Cycle
  - Write: initial prompt from requirements
  - Test: run against representative cases (at least 3)
  - Observe: identify failure modes (confabulation, hallucination, over-refusal)
  - Refine: targeted improvements (add constraint, add example, clarify scope)
- **Sub-concept:** Prompt Versioning
  - Why prompts deserve version control (they're code)
  - Naming conventions for prompt files
  - Tracking prompt changes and their effects
- **Sub-concept:** Building a Personal Prompt Library
  - Extracting prompts that work (save immediately, before you forget)
  - Categorizing: task type, domain, reliability rating
  - Sharing with team: the organizational prompt library

---

### Module 2.2: MCP Servers — The Capability Extension Layer
**Time:** 10:45–12:15 (90 minutes)
**Lab:** Lab 04 — MCP Server Explorer (interactive HTML)
**Pre-work:** NotebookLM Module 5 required

**Learning Objective:** Explain the MCP architecture, connect at least two MCP servers to Claude Code, and use them to accomplish tasks that extend Claude Code's default capabilities.

#### 2.2.1 MCP Architecture Deep Dive
- **Sub-concept:** The MCP Protocol Fundamentals
  - What MCP is: a standardized interface between AI systems and external tools/data
  - Client-server model: Claude Code is the client, your tool is the server
  - The three MCP primitives: Tools (callable functions), Resources (data sources), Prompts (reusable templates)
  - Transport layer: stdio (local subprocess), Streamable HTTP (remote, current standard as of MCP spec 2025-03-26); SSE was the prior remote transport and is now deprecated in favour of Streamable HTTP
- **Sub-concept:** What MCP Servers Can Expose
  - Tools: anything a program can do (database queries, API calls, file operations)
  - Resources: structured data sources (code repos, documentation, knowledge bases)
  - Prompts: pre-configured task templates (reusable agentic workflows)
- **Sub-concept:** The MCP Ecosystem
  - Official servers: filesystem, GitHub, Slack, databases, web search
  - Community servers: Linear, Notion, Vercel, Asana (via MCP marketplaces)
  - Your servers: internal tools, proprietary systems, bespoke integrations
  - Discovery: MCP server registries and Claude Code's MCP management

#### 2.2.2 Connecting and Using MCP Servers
- **Sub-concept:** MCP Configuration in Claude Code
  - Where config lives: `.claude/settings.json` and `~/.claude/settings.json`
  - Adding a server: `claude mcp add <name> <command>`
  - Verifying connection: `claude mcp list` and health checks
  - Troubleshooting: common connection failures and their causes
- **Sub-concept:** Discovery and Schema Reading
  - How Claude Code discovers available tools from connected servers
  - Reading a tool schema: name, description, parameters, return type
  - Why tool descriptions matter (they're prompts for the agent)
  - Testing tools: calling them explicitly in conversation
- **Sub-concept:** Practical MCP Workflows
  - Database + Claude Code: query → analyze → generate migration
  - GitHub + Claude Code: read PR → review → comment
  - Docs + Claude Code: search docs → implement → verify against docs
  - Slack + Claude Code: read thread → draft response → send (with approval)

#### 2.2.3 Building Your First MCP Server
- **Sub-concept:** MCP Server Anatomy
  - The minimum viable MCP server (under 50 lines)
  - Tool definition: name, description, inputSchema, handler function
  - Error handling patterns: when to error vs. return empty vs. return partial
  - Testing locally before connecting to Claude Code
- **Sub-concept:** Tool Design Philosophy
  - Atomic tools: one thing, done well
  - Descriptive names and descriptions (these are Claude's API docs)
  - Input schema design: required vs. optional, validation, defaults
  - Idempotency: tools Claude can safely retry
- **Sub-concept:** Connecting Your Server
  - Running the server as a subprocess (stdio transport)
  - Adding to Claude Code configuration
  - First successful tool call: celebration moment
  - Iteration: improving based on how Claude actually uses the tool

---

### Module 2.3: Skills, Commands, and Subagents
**Time:** 13:15–14:45 (90 minutes)
**Lab:** Lab 06 — Skills & Commands Builder (interactive HTML)

**Learning Objective:** Create a custom skill and slash command that encodes team knowledge, and understand when to use subagents vs. single-agent approaches.

#### 2.3.1 Skills as Codified Expertise
- **Sub-concept:** What a Skill Is
  - A skill = persistent instruction set that Claude loads when invoked
  - Where skills live: `~/.claude/skills/` (global) and `.claude/skills/` (project)
  - How skills activate: explicit invocation vs. automatic (via triggers)
  - Skills are prompts: the quality of the skill = the quality of the guidance
- **Sub-concept:** Skill Anatomy
  - Frontmatter: YAML block with `name` and `description` (the key fields Claude Code uses)
  - Body: markdown instructions Claude reads when the skill is invoked
  - Examples section: demonstrate desired behavior with sample I/O to establish tone and format
  - Anti-patterns section: explicitly prohibit known failure modes ("Never modify test files without permission")
  - Note: `triggers` (auto-activation conditions) is a LUXOR framework convention used in this course environment; native Claude Code activates skills via explicit invocation or `Skill` tool
- **Sub-concept:** Skill Design Patterns
  - The Domain Expert skill: "You are the team's Python style enforcer"
  - The Workflow skill: "To add a new API endpoint, follow these steps..."
  - The Validation skill: "Before committing code, verify these properties..."
  - The Adapter skill: "When working with our legacy Java modules, note that..."

#### 2.3.2 Slash Commands as Workflow Shortcuts
- **Sub-concept:** Commands vs. Skills
  - Commands = entry points (what users type)
  - Skills = instruction sets (what Claude reads)
  - A command can invoke one or many skills
  - Commands can accept arguments: `/review --strict` vs. `/review --quick`
- **Sub-concept:** Building a Slash Command
  - File naming: `~/.claude/commands/mycommand.md`
  - Argument handling: `$ARGUMENTS` variable
  - Multi-step commands: sequential skill invocation
  - Testing: `claude /mycommand "test input"`
- **Sub-concept:** Command Design for Teams
  - The Onboarding Command: `/onboard-new-engineer`
  - The Review Command: `/code-review --pr 123`
  - The Deploy Command: `/deploy --env staging`
  - Version-controlling commands with the team's dotfiles

#### 2.3.3 Subagent Patterns
- **Sub-concept:** When to Use Subagents
  - Task decomposition: one agent per independent subtask
  - Context isolation: keep each agent's context clean and focused
  - Parallel execution: multiple agents on parallelizable work
  - Specialization: different agents with different skill sets
- **Sub-concept:** Subagent Communication Patterns
  - Result passing: how one agent's output becomes another's input
  - Shared resources: what subagents can and can't share
  - Failure propagation: what happens when one subagent fails
  - Coordination agents: one agent orchestrating multiple workers
- **Sub-concept:** Practical Subagent Examples
  - Code review pipeline: analysis agent → security agent → style agent → summary agent
  - Documentation generation: code reader → structure builder → writer → formatter
  - Data pipeline: extractor → transformer → validator → loader

---

### Module 2.4: Meta-Prompting and Advanced Patterns
**Time:** 15:00–17:00 (120 minutes, including Day 2 integration lab)

**Learning Objective:** Apply meta-prompting techniques to generate, improve, and compose prompts, and understand how to build self-improving agentic systems.

#### 2.4.1 Meta-Prompting Fundamentals
- **Sub-concept:** What Meta-Prompting Is
  - Using an agent to write, critique, and improve prompts
  - The prompt generator → executor → evaluator loop
  - When to invest in meta-prompting (high-reuse prompts, team skills)
- **Sub-concept:** Prompt Generation Patterns
  - "Write a skill that teaches Claude to do X for our team"
  - "Critique this prompt and suggest three improvements"
  - "Generate five variants of this prompt with different approaches"
- **Sub-concept:** Prompt Evaluation Frameworks
  - Automated: run against test cases, score outputs
  - Peer: structured critique protocol (What works? What's missing? What could go wrong?)
  - Iterative: A/B test prompt variants on real tasks

#### 2.4.2 Advanced Composition Patterns
- **Sub-concept:** Skill Chaining
  - Skills that invoke other skills (compositional knowledge)
  - Building a skills library where components are reusable
  - Avoiding skill collisions (when two skills conflict)
- **Sub-concept:** Context Engineering
  - CLAUDE.md as the organizational "character" document
  - Injecting team-specific knowledge at the project level
  - Dynamic context: scripts that update CLAUDE.md based on git state
- **Sub-concept:** Prompt Libraries as Team Infrastructure
  - Versioning and ownership of prompts
  - The prompt review process (treat prompts like PRs)
  - Measuring prompt effectiveness in production

---

## Day 3: The Production System — Multi-Agent, Security, and Deployment

**Day Theme:** "Building systems that work in the real world."
**Daily Goal:** Learners can design a multi-agent pipeline for a real organizational problem, configure appropriate security controls, and deploy an agentic workflow to their tech stack.

**Morning Retrieval Sprint (09:00, 10 minutes):** Without notes: (1) Describe the TCEF prompt pattern and give an example. (2) What are the three MCP primitives? (3) What's the difference between a skill and a slash command? — Pairs compare. Facilitator addresses any persistent gaps before building multi-agent systems that depend on these foundations.

---

### Module 3.1: Multi-Agent Orchestration
**Time:** 09:00–10:30 (90 minutes)
**Lab:** Lab 07 — Multi-Agent Orchestrator (interactive HTML)
**Pre-work:** NotebookLM Module 9 required

**Learning Objective:** Design a multi-agent system for a complex engineering task, including task decomposition, agent communication, and failure handling.

#### 3.1.1 Multi-Agent System Design
- **Sub-concept:** When to Go Multi-Agent
  - Parallelism: tasks that can run simultaneously
  - Specialization: subtasks requiring different expertise/context
  - Scale: tasks too large for a single context window
  - Isolation: subtasks that must not contaminate each other's context
- **Sub-concept:** The Orchestrator-Worker Pattern
  - Orchestrator: decomposes task, assigns work, synthesizes results
  - Workers: execute focused subtasks, report back
  - Coordination protocol: input format, output format, error codes
  - When orchestrator becomes a bottleneck (and how to fix it)
- **Sub-concept:** Task Decomposition Strategies
  - Functional decomposition: by task type (read, transform, write)
  - Domain decomposition: by area of code (frontend agent, backend agent, DB agent)
  - Sequential decomposition: step 1 agent feeds step 2 agent
  - Parallel decomposition: independent tasks running simultaneously

#### 3.1.2 Agent Communication and Coordination
- **Sub-concept:** Message Passing Patterns
  - Structured outputs: JSON schemas for agent-to-agent communication
  - Artifact sharing: files, memory keys, shared state
  - Broadcast vs. point-to-point messaging
  - The cost of communication (tokens, latency, complexity)
- **Sub-concept:** State Management in Multi-Agent Systems
  - Shared state: risks and mitigations (race conditions, stale data)
  - Immutable artifacts: safer than shared mutable state
  - Checkpointing: saving intermediate results for recovery
  - Session memory: CLAUDE.md as shared context
- **Sub-concept:** Failure Modes and Recovery
  - Agent timeout: what happens, how to detect, how to restart
  - Partial completion: how to resume rather than restart
  - Conflicting outputs: how to resolve when two agents disagree
  - Cascading failures: preventing one agent's error from destroying the pipeline

#### 3.1.3 Production Multi-Agent Patterns
- **Sub-concept:** The Code Review Pipeline
  - Agent 1: Code analyzer (what does this PR do?)
  - Agent 2: Security scanner (are there vulnerabilities?)
  - Agent 3: Style checker (does this match team conventions?)
  - Orchestrator: synthesizes findings into structured review comment
- **Sub-concept:** The Documentation Generator
  - Agent 1: Code reader (extract structure, dependencies, exported APIs)
  - Agent 2: Spec writer (generate technical spec from structure)
  - Agent 3: Example writer (generate usage examples)
  - Agent 4: Formatter (assemble into final documentation)
- **Sub-concept:** The Continuous Intelligence Pipeline
  - Triggered on: git push, PR open, deployment, alert
  - Agents run in CI: analyze, test, report, notify
  - Integration with existing DevOps tooling
  - Cost model: when is continuous agentic intelligence worth it?

---

### Module 3.2: Security, Sandboxing, and Safety
**Time:** 10:45–12:15 (90 minutes)
**Lab:** Lab 08 — Production Patterns (interactive HTML)

**Learning Objective:** Configure appropriate security controls for agentic systems, understand the threat model, and implement responsible deployment practices.

#### 3.2.1 The Agentic Threat Model
- **Sub-concept:** Unique Risks of Agentic Systems
  - Prompt injection: malicious content in the agent's environment
  - Excessive agency: agent takes irreversible actions without verification
  - Data exfiltration: agent reads and transmits sensitive data
  - Tool misuse: agent uses a tool in an unintended way
  - Cascading hallucination: one wrong assumption compounds into disaster
- **Sub-concept:** Trust Boundaries in Multi-Agent Systems
  - The "human in the loop" spectrum (fully autonomous ↔ fully supervised)
  - Defining approval gates: what requires human confirmation
  - Principle of least privilege: agents should only access what they need
  - Audit trails: every agent action should be logged
- **Sub-concept:** Prompt Injection Defense
  - How prompt injection works (environment content hijacking agent instructions)
  - Defense patterns: input sanitization, output validation, sandboxed reading
  - The "confused deputy" problem in agentic systems
  - Testing for injection vulnerabilities

#### 3.2.2 Sandbox Configuration
- **Sub-concept:** Sandbox Architecture in Claude Code
  - What the sandbox restricts: network, filesystem, shell commands
  - Graduated profiles: training (most restricted) → dev → staging → production
  - Configuration: `settings.json` permission blocks
  - Verification: testing what the agent can and can't do
- **Sub-concept:** Data Handling in Training Environments
  - Never use production data in training (policy + technical enforcement)
  - Synthetic data generation for realistic labs
  - Data classification and appropriate sandbox profiles per class
  - Student environment isolation (can't see each other's work)
- **Sub-concept:** Sandbox Escape Patterns to Know
  - Tool chaining: using allowed tools to circumvent restrictions
  - Social engineering: agent convincing user to lower restrictions
  - Configuration drift: sandbox settings not applied consistently
  - Monitoring for escape attempts: log analysis

#### 3.2.3 Responsible Deployment
- **Sub-concept:** The Deployment Maturity Model
  - Level 0: Human does everything
  - Level 1: Agent drafts, human approves
  - Level 2: Agent executes low-risk tasks autonomously
  - Level 3: Agent executes with selective human-in-the-loop
  - Level 4: Full autonomous operation with monitoring and alerting
- **Sub-concept:** Rollout Strategy
  - Start with read-only agents (zero risk of damage)
  - Expand to write operations in staging first
  - Gate on: monitoring coverage, rollback capability, audit trail completeness
  - The "reversibility test": can everything this agent does be undone?
- **Sub-concept:** Incident Response for Agentic Systems
  - Kill switch: how to stop all agents immediately
  - Forensics: reconstructing what an agent did and why
  - Communication: how to explain agentic incidents to stakeholders
  - Post-mortem: extracting learning from agentic failures

---

### Module 3.3: Tech Stack Adaptation
**Time:** 13:15–14:15 (60 minutes)
**Integration:** Context7 for library documentation, GitHub templates

**Learning Objective:** Adapt the course's core agentic patterns to the learner's specific technology stack using Context7, customization templates, and org-specific examples.

#### 3.3.1 The Adaptation Framework
- **Sub-concept:** Universal Patterns vs. Stack-Specific Patterns
  - What stays the same across all tech stacks (PRAO, MCP protocol, skill structure)
  - What changes per stack (tool names, configuration format, deployment targets)
  - The adaptation variables: language, framework, cloud, CI/CD, data store
- **Sub-concept:** Context7 for Real-Time Documentation
  - How Context7 pre-populates Claude's context with your framework's docs
  - Supported libraries: React, Django, Spring Boot, Rails, Go, Rust, and 1000+
  - Running the pre-population script: `./prep-course-env.sh --stack "nextjs,postgres"`
  - Testing: asking Claude questions that require the injected docs
- **Sub-concept:** Organization-Specific CLAUDE.md Templates
  - The corporate identity layer: values, conventions, tooling preferences
  - The security policy layer: what must never happen
  - The domain knowledge layer: your product, your APIs, your architecture
  - Template variables: fill once, applies everywhere

#### 3.3.2 Stack-Specific MCP Server Selection
- **Sub-concept:** MCP Server Selection Matrix
  - By function: database access, CI/CD, issue tracking, docs, comms
  - By stack: Node ecosystem, Python ecosystem, JVM ecosystem, etc.
  - By org type: startup (speed), enterprise (security), regulated (compliance)
- **Sub-concept:** Configuring for Your CI/CD
  - GitHub Actions integration: Claude Code in pipelines
  - Jenkins / CircleCI / GitLab CI: adapter patterns
  - GitOps: agent as pull request generator
- **Sub-concept:** Database-Specific Patterns
  - PostgreSQL: query generation, schema migration, explain plan analysis
  - MongoDB: aggregation pipeline generation, index optimization
  - Redis: cache pattern generation, TTL strategy
  - ORMs: SQLAlchemy, Prisma, Hibernate — how agents navigate each

---

### Module 3.4: Capstone — Build a Real Agentic Pipeline
**Time:** 14:30–17:00 (150 minutes)
**Lab:** Lab 09 — Capstone Build (interactive HTML with guided structure)

**Learning Objective:** Design and implement a complete agentic pipeline solving a real problem from the learner's organization, demonstrating mastery of all course concepts.

#### 3.4.1 Capstone Design Session
- **Sub-concept:** Problem Selection Criteria
  - Appropriate scope: completable in 90 minutes of implementation
  - Real impact: solves actual organizational pain (not a toy)
  - Demonstrable: can be shown to colleagues in a 5-minute demo
  - Multi-concept: uses at least 3 course concepts (skills + MCP + multi-agent preferred)
- **Sub-concept:** The Design Document
  - Problem statement (one sentence)
  - PRAO flow design (what will the agent perceive, reason, act on, observe?)
  - Agent architecture (single? orchestrator-worker? pipeline?)
  - MCP servers needed (which tools?)
  - Skills/commands required (what persistent knowledge?)
  - Security controls (what permissions? what approval gates?)
- **Sub-concept:** Peer Design Review
  - 5-minute design share (one partner critiques)
  - Critique framework: Will this work? What's the biggest risk? What's missing?
  - Facilitator coaching: one tip per pair before implementation begins

#### 3.4.2 Implementation Sprint
- **Sub-concept:** Implementation Sequence
  - Step 1: Scaffold the CLAUDE.md (context foundation)
  - Step 2: Configure MCP servers (capabilities)
  - Step 3: Write required skills (behavioral instructions)
  - Step 4: Test with simple case (validate foundation)
  - Step 5: Expand to full complexity (build the pipeline)
  - Step 6: Document and demonstrate
- **Sub-concept:** Facilitator-Assisted Debugging
  - Common capstone failures and first questions to ask
  - Live debugging protocol: trace before fixing
  - When to scope down vs. push through
- **Sub-concept:** Demo Preparation
  - The 5-minute demo structure: problem → solution → live demo → impact
  - Narrating agent behavior (not just showing results)
  - Handling live demo failures gracefully

#### 3.4.3 Course Synthesis
- **Sub-concept:** Knowledge Mapping
  - Complete the mental model canvas (from Day 1 sketch → final architecture diagram)
  - Which concepts felt most powerful? Most surprising? Most concerning?
  - "I used to think... Now I think..."
- **Sub-concept:** Next 30 Days Commitment
  - One agentic improvement per week for 4 weeks
  - Week 1: Deploy your capstone in your actual org
  - Week 2: Build one team skill/command from your daily workflows
  - Week 3: Connect one new MCP server to your org's tooling
  - Week 4: Introduce one colleague to Claude Code using what you learned
- **Sub-concept:** Course Conclusion and Community
  - Resources for continued learning (curated, not overwhelming)
  - The cohort Slack/Teams channel (keep the community alive)
  - Office hours schedule (3 months post-course)
  - Certification pathway (if applicable)

---

## Assessment Architecture

### Formative Assessments (Learning-Oriented, No Grade)
| Lab | Assessment Type | Objective Tested |
|-----|----------------|-----------------|
| Lab 01 | 4-question quiz | Understand PRAO loop |
| Lab 02 | Prompt scoring rubric | Effective task framing |
| Lab 03 | Trace annotation | Reading agent reasoning |
| Lab 04 | MCP connection checklist | Technical setup |
| Lab 05 | Prompt before/after pair | Pattern application |
| Lab 06 | Skill peer review | Skill design quality |
| Lab 07 | Architecture diagram review | Multi-agent design |
| Lab 08 | Security audit checklist | Risk identification |
| Lab 09 | Capstone demo | Full synthesis |

### Summative Assessment (Day 3 Capstone)
**Rubric Dimensions with Behavioral Anchors:**

| Dimension | Weight | Distinguished (4) | Proficient (3) | Developing (2) | Beginning (1) |
|-----------|--------|-------------------|----------------|----------------|---------------|
| **Correctness** | 25% | Pipeline runs end-to-end, handles edge cases and failures gracefully | Pipeline runs for the primary case; minor failures noted | Pipeline partially runs; at least one stage demonstrably works | Pipeline does not run; design only |
| **Architecture** | 25% | Design choice (single/multi-agent, MCP selection) is justified by problem requirements with explicit trade-offs stated | Design is appropriate; some justification provided | Design works but pattern choice is not explained | Design appears arbitrary or copied without adaptation |
| **Safety** | 20% | Explicit permission scope, at least one approval gate, audit trail described; reversibility addressed | At least two security controls present and explained | One security control mentioned; limited explanation | No security controls; agent given unlimited trust |
| **Adaptability** | 15% | Learner demonstrates how to swap one component (different MCP server, different stack) without rebuilding | Learner can describe what would change for a different org | Learner identifies adaptation points but cannot describe changes | Learner cannot describe how to adapt the pipeline |
| **Communication** | 15% | Narrates the PRAO cycle of the running system, explains trade-offs made, answers questions clearly | Explains what the agent does; some PRAO framing | Demonstrates output but cannot fully explain agent reasoning | Reads from notes; cannot explain agent decisions |

---

## Facilitator Notes

### Adaptive Delivery by Audience
| Audience Profile | Emphasis | De-emphasize | Adapt Labs |
|-----------------|----------|--------------|------------|
| Backend engineers | MCP building, API patterns | UI labs | Context7 → their stack |
| DevOps engineers | CI/CD integration, security | Prompt aesthetics | Lab 08 extended |
| Data engineers | Pipeline patterns, multi-agent | Slash commands | Context7 → Spark/dbt |
| Full-stack engineers | End-to-end patterns | Deep security | Full curriculum |
| Engineering managers | Architecture, team patterns | Deep CLI | Labs 01, 06, 09 only |

### Dynamic Injection (Context7)
Before each class, run:
```bash
./prep-course-env.sh --org "OrganizationName" --stack "tech,stack,here" --team "team-name"
```
This pre-configures:
- CLAUDE.md template with org-specific values
- Context7 documentation pre-load for their specific libraries
- GitHub templates customized for their CI/CD
- MCP server selection recommendations based on their tooling
