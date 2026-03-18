# Your 4-Week Bridge Guide

**Agentic AI Engineering — Between Phase 1 and Phase 2**

Welcome to the async period. You have just completed two intense days of live training. You are not going to forget what you learned — you are going to build something with it.

This guide is yours. It tells you exactly what to do each week, how long each piece takes, what you will build, and what the unlock concept is that makes the week click.

**Your commitment:** 5–10 hours per week, over 4 weeks.

**What you will have at the end:**
- A production-grade CLAUDE.md committed to your real project
- A working MCP server that connects to a real system you use
- One automated workflow running in your actual development environment
- A Phase 2 entry spec that Phase 2 instructors will build from on Day 1

These are not exercises. They are artifacts you will use.

---

## Before You Begin

**Read this first.**

The biggest failure mode in this program is treating the labs as abstract exercises on sample code. They are not. They are designed to be done on your real codebase, your real API, and your real workflow.

The friction you feel when "making this work on my actual code" is not a problem to avoid. It is the learning. Work through it.

If you do not have a codebase you can use, pick the closest thing to your actual work — a personal project, a side project, or a work project where you have permission to experiment. Generic sample repos will not give you the depth the labs require.

---

## Week 1 — Consolidation and Depth

**Time this week:** ~7 hours
**Theme:** From concepts to muscle memory

### What This Week Accomplishes

You leave Phase 1 knowing how TCEF works. You leave Week 1 knowing TCEF the way you know your keyboard — automatically, without conscious effort.

You also leave with a CLAUDE.md that actually works on your real codebase. Not a template. Not a Phase 1 exercise. The file your team could commit today.

### The Unlock

Treat CLAUDE.md as code, not documentation. Every line that does not prevent a specific mistake is noise. Noise buries the lines that matter, and Claude starts ignoring them. By end of week, you should have removed at least as many lines as you added.

### Your Week 1 Schedule

#### Day 1–2: Video and Reading (3.5 hours)

**Watch (2 hours):**

Find and watch these types of videos. Use the search terms below to locate current, high-quality content. Before watching each video, read the viewing guide — it tells you what to look for.

**Video 1 — Claude Code Best Practices (45 min)**
Search: `claude code best practices 2025` or check Anthropic's official YouTube channel

*Viewing guide:* (1) Pause every time the presenter describes a failure mode. These are exactly the plateau points you will hit. Write them down. (2) Pay close attention to the CLAUDE.md pruning philosophy. The phrase to listen for: "Would removing this cause Claude to make mistakes?" (3) Watch the session naming and `/clear` patterns. If you are not naming sessions and clearing context between unrelated tasks, start this week.

**Video 2 — CLAUDE.md and Context Management (30 min)**
Search: `claude code CLAUDE.md tutorial 2024` or `claude code memory context management`

*Viewing guide:* (1) Compare their CLAUDE.md to the Module 02 template. What do they encode that the template misses? (2) What did they remove and why? (3) Watch for the `@import` syntax. If your project has multiple components, this matters.

**Video 3 — Skills and Commands (30 min)**
Search: `claude code skills slash commands 2025`

*Viewing guide:* (1) When Claude applies a skill, what triggered it? Is it automatic or explicit? (2) What is the difference between what goes in CLAUDE.md and what goes in a skill? Module 07 says: CLAUDE.md answers "what is this project?" and skills answer "how do I do X?" Watch for examples of this distinction. (3) Note any slash command patterns that would immediately help your workflow.

**Read (1.5 hours):**

- **Re-read Module 04** (Prompt Engineering Depth) — TCEF section. This time, apply it actively: for each GCCF failure mode, find a real prompt you wrote in Phase 1 that exhibits it. Rewrite it in TCEF.
- **Re-read Module 11** (Tech Stack Adaptation) — Sections 11.1 and 11.2. Complete the pre-audit checklist before starting the lab.
- **Read** Claude Code Best Practices at code.claude.com/docs/en/best-practices — focus on "Avoid common failure patterns" and "Configure your environment."
- **Read** Claude Code Skills documentation at code.claude.com/docs/en/skills — focus on frontmatter fields and the skill file structure.

#### Day 3–5: Lab 1 (3 hours)

**Lab 1 — Stack Audit and CLAUDE.md Architecture**

This is your core Week 1 work. Full instructions are in the course lab guide. Here is the structure:

**Step 1 — The Codebase Audit (45 min)**
Run Claude Code on your real codebase with a structured audit prompt sequence. You are looking for what the agent knows and what it misses. The gaps are what CLAUDE.md needs to fill.

Start Claude Code in your project root and run:
```
"Read the project structure and give me a codebase overview.
Focus on: what are the entry points, what is the test setup,
what package manager is in use, and what are the key directories."
```

Then:
```
"Now identify the three most common anti-patterns in this codebase —
things that appear in older code but should not be in new code.
Be specific: quote examples from actual files."
```

Then:
```
"What conventions does this codebase use for: naming (files, functions,
variables), imports, error handling, and async patterns?
Quote specific examples from the source files."
```

After each response: pause. Note what the agent got right and what it missed.

**Step 2 — Anti-Pattern Catalog (30 min)**
Create `.claude/antipatterns.md` with at least 5 anti-patterns from your actual code. For each: what it looks like, what the correct pattern is, and why it exists (legacy decision, migration in progress, etc.).

**Step 3 — CLAUDE.md Construction (60 min)**
Build a CLAUDE.md using the template in the lab guide. Rules:
- Every line must either prevent a specific mistake OR communicate something Claude cannot infer from code
- No generic advice ("write clean code," "follow best practices")
- Every command must be runnable as-is in your project root
- Target length: 150–300 lines

**Step 4 — The Skills Sprint (45 min)**
Create at least 3 skill files in `.claude/skills/`. The required three:
- A code review skill (your specific review checklist and format)
- A recurring task specific to your codebase (you design this)
- A daily workflow skill (PR prep, commit messages, changelogs — whatever you do often)

**Step 5 — Validation (30 min)**
Start a fresh Claude Code session. Run 3 tasks that test your CLAUDE.md:
1. A task that would tempt Claude to use an anti-pattern you listed
2. A task that requires your test framework and naming conventions
3. A task that requires an architectural decision you encoded

Document: did Claude follow your rules? If not, which line failed?

**Deliverables from Lab 1:**
- CLAUDE.md committed to your real repository
- `.claude/antipatterns.md` with at least 5 entries
- At least 3 skill files in `.claude/skills/`
- Validation results to mention in your reflection

#### Day 6–7: Reflection (30 min)

**Week 1 Reflection (500–800 words)**

Write a document addressing:

1. **The TCEF Audit:** Three prompts from Phase 1 (or early this week) that failed. Rewritten in TCEF. What specifically changed?
2. **The CLAUDE.md Delta:** What was in your CLAUDE.md before Lab 1 vs. after? List additions AND deletions. Why did each addition prevent a specific mistake?
3. **The Context Window Moment:** Describe one session this week where you consciously managed context. What triggered the decision? What would have happened without it?

Post to the discussion board with tag `#week1-reflection`.

---

## Week 2 — MCP and Real Integration

**Time this week:** ~7h 45m
**Theme:** From consumer to builder

### What This Week Accomplishes

You understand MCP. This week you build it. Theory that is not anchored in a working implementation stays theory. By end of week, you have an MCP server with at least 2 tools running against a real system you use.

### The Unlock

The tool description IS the interface. You are not writing documentation for humans. You are writing the selection signal for an LLM making decisions in milliseconds. A vague description is not missing documentation — it is a broken interface.

### Your Week 2 Schedule

#### Day 1–2: Video and Reading (3 hours)

**Watch (2 hours):**

**Video 1 — Building MCP Servers from Scratch (45 min)**
Search: `build mcp server typescript 2024` or `mcp server tutorial 2025`

*Viewing guide:* (1) When they define the first tool schema, pause. Before they explain it, predict: what would happen if the description were 5 words shorter? (2) How do they test the server before connecting to Claude Code? Note the tools they use — you will need them for Lab 2. (3) When they hit an error, watch what it looks like. MCP errors have a specific pattern.

**Video 2 — MCP Inspector and Debugging (30 min)**
Search: `mcp inspector debug 2024` or `mcp server testing`

*Viewing guide:* (1) Note the JSON-RPC message structure when a tool call is made. This is exactly what your Lab 2 server will produce. (2) What does a schema error look like in the Inspector? (3) Does the video show any Resource or Prompt primitives? If not, notice the absence — and think about what you would add.

**Video 3 — Real-World MCP Patterns (30 min)**
Search: `claude code mcp production patterns 2025`

*Viewing guide:* (1) What authentication pattern do they use? How are credentials kept out of the schema? (2) How do they handle API errors? Structured return vs. thrown exception? (3) What is the server's single responsibility? If it handles multiple domains, flag it as an anti-pattern to avoid.

**Read (1 hour):**

- **Re-read Module 05** (MCP Architecture) — complete. Before Lab 2: for every capability in the system you plan to automate, classify it as Tool, Resource, or Prompt before writing any code.
- **Re-read Module 06** (Building MCP Servers) — Sections 6.1, 6.2, 6.3. Complete the "Design before code" template from Section 6.1 before opening your editor.
- **Read** MCP Architecture docs at modelcontextprotocol.io/docs/learn/architecture — focus on the two-layer model and the JSON-RPC 2.0 structure.

#### Day 3–6: Lab 2 (4 hours)

**Lab 2 — MCP Integration Sprint**

Build an MCP server that automates one real repetitive task in your workflow. The server must run against a real system — not a stub, not a mock, not fake data.

**Good candidates:** Jira ticket creation, database schema queries, Slack message posting, GitHub issue creation, internal wiki access, deployment system queries.

**Not valid:** Reading local files, running bash commands, fetching public URLs (Claude Code already does these).

**Step 1 — Design Before Code (30 min)**
Complete a design template for your server BEFORE opening your editor. For each tool:
- Name (verb-noun format)
- Description (what Claude needs to know to select and use this tool correctly — 2-3 sentences)
- Required inputs (name, type, description)
- Return format (what Claude will receive)
- Error cases (what can go wrong and how you will communicate it)

Also document: authentication approach, environment variable names, transport type (stdio for this lab).

**Step 2 — Environment Setup (20 min)**
```bash
mkdir mcp-[server-name]
cd mcp-[server-name]
npm init -y
npm install @modelcontextprotocol/sdk
npm install typescript ts-node @types/node --save-dev
npx tsc --init
```
Set your credentials as environment variables. Never hardcode them.

**Step 3 — Implement (90 min)**
Build following the TypeScript SDK patterns from Module 06. Must have:
- At least 2 tools with distinct purposes
- Proper error handling (structured responses, not thrown exceptions)
- Tool descriptions that give Claude enough to use the tool correctly without additional prompting

**Step 4 — Test in Inspector Before Connecting to Claude Code (30 min)**
```bash
npx @modelcontextprotocol/inspector node dist/server.js
```
Verify all tools appear, schemas are correct, and each tool returns a real response. Fix issues here — debugging through Claude Code's interface is significantly harder.

**Step 5 — Connect to Claude Code (20 min)**
Add to `.claude/settings.json`:
```json
{
  "mcpServers": {
    "your-server-name": {
      "command": "node",
      "args": ["/absolute/path/to/dist/server.js"],
      "env": {
        "YOUR_API_KEY": "${YOUR_API_KEY}"
      }
    }
  }
}
```
Verify Claude can list and call your tools.

**Step 6 — Add a Resource or Prompt (30 min)**
Add at least one non-Tool primitive. A Resource exposes stable data Claude can read as context. A Prompt encodes a reusable interaction pattern. If you can only use Tools, document why.

**Deliverables from Lab 2:**
- Working MCP server with at least 2 tools (+ 1 resource or prompt)
- Connected and verified in Claude Code
- Design template from Step 1, completed

#### Day 6–7: Reflection (45 min)

**Week 2 Reflection (600–900 words)**

1. **The Design Decision Log:** For each tool, document: (a) why it is a Tool not a Resource or Prompt, (b) what the description communicates to the LLM, (c) one schema design decision you changed between draft and final.
2. **The First Working Call:** Describe the exact moment your first tool returned a real result. What was the prompt? What did the tool call look like in the agent trace?
3. **The Error You Did Not Expect:** Every engineer hits at least one unexpected error during MCP development. Describe yours and what it taught you.
4. **The Extension You Did Not Build:** For each tool you chose not to build, explain why. Was the decision correct?

Post with tag `#week2-reflection`.

---

## Week 3 — Advanced Patterns

**Time this week:** ~8h 45m
**Theme:** From single-agent thinking to system design

### What This Week Accomplishes

Weeks 1 and 2 were about individual capabilities. This week is about composing them. You will learn to map real workflows to agentic architectures, apply meta-prompting to improve your prompt library, and understand what makes multi-agent systems fail.

By end of week, you have one automated workflow running in your actual development environment.

### The Unlock

Reliability does not come from better prompting. It comes from system design — hooks, approval gates, output contracts, structured verification. An agent that is 90% reliable can become 99% reliable with the right system around it. This week is about building that system.

### Your Week 3 Schedule

#### Day 1–2: Video and Reading (4 hours)

**Watch (2.5 hours):**

**Video 1 — Meta-Prompting and Prompt Engineering Automation (40 min)**
Search: `meta prompting claude 2025` or `prompt engineering automation AI`

*Viewing guide:* (1) When they generate a prompt, what context do they give the generator? Build a checklist. (2) Watch the evaluation step. What dimensions does the evaluator check beyond "is it correct"? (3) Is the improvement step automatic or does it require human judgment? Why does that matter?

**Video 2 — Multi-Agent Architectures with Claude Code (45 min)**
Search: `claude code multi agent subagents 2025` or `claude code agent teams`

*Viewing guide:* (1) Map every agent in the demo to Module 09's three motivations (parallelism, specialization, context isolation). Does the demo use each motivation correctly? (2) When does the orchestrator fail? Watch for coordination overhead and aggregation complexity. (3) How do they handle a sub-agent returning an error?

**Video 3 — Debugging Agentic Systems (40 min)**
Search: `debugging claude code agent failures 2025` or `agentic system debugging`

*Viewing guide:* (1) Note every debugging technique they use. Which ones work for single-agent? Which only apply to multi-agent? (2) When an agent produces wrong output, how do they trace the root cause? (3) Do they demonstrate or discuss prompt injection? What does it look like?

**Read (1.5 hours):**

- **Re-read Module 08** (Meta-Prompting) — complete. Before Lab 3: run the generate-evaluate-improve loop on one skill file you built in Week 1.
- **Re-read Module 09** (Multi-Agent Systems) — Sections 9.1, 9.2, 9.4. For each workflow you will audit in Lab 3, complete the four-question framework before building.
- **Read** Claude Code Sub-agents docs at code.claude.com/docs/en/sub-agents — focus on frontmatter fields and the pattern of built-in vs. custom sub-agents.
- **Read** Claude Code Hooks guide at code.claude.com/docs/en/hooks-guide — focus on PreToolUse, PostToolUse, Stop hooks, and when each is appropriate.

#### Day 3–6: Lab 3 (4 hours)

**Lab 3 — Agentic Workflow Audit**

Identify three real workflows you do manually. Assess each for agentic automation potential. Build one. Document your decision for the others.

**Step 1 — Workflow Identification (30 min)**
Identify three workflows from your actual work. Requirements:
- Something you actually do (not hypothetical)
- At least once per week
- Currently takes 15+ minutes

For each, write: the current steps, time required, frequency, and whether errors occur.

**Step 2 — The Four-Question Framework (30 min)**
Apply Module 09's decision framework to each workflow:
1. Can this fit in a single agent's context window?
2. Are there subtasks that are genuinely independent?
3. Do subtasks require meaningfully different expertise or tool access?
4. Would an error in one phase contaminate the next?

Classify each: Single-agent / Orchestrated / Parallel fan-out / Not ready for automation.

**Step 3 — Architecture Sketch (30 min)**
For the workflow you will build, write an architecture sketch:
- Trigger: how does this run? (manual command / git hook / scheduled)
- Context: what does the agent need before it can act?
- Decisions: what choices does the agent make?
- Action scope: what is allowed? what is explicitly forbidden?
- Output: what does it produce and where does it go?
- Success criteria: how do I know it worked?

**Step 4 — Build One Workflow (90 min)**
Build the workflow you classified as single-agent (or simplest). Must include:
- A trigger mechanism (slash command, CLAUDE.md command, or hook)
- A TCEF-structured prompt or skill file
- A success verification step (agent checks its own output)
- At least one approval gate before any irreversible action

Run it three times:
- Run 1: Does it work at all?
- Run 2: Does it produce the same output on the same input?
- Run 3: Does it handle the edge case you did not plan for?

**Step 5 — Document the Decisions Not Taken (30 min)**
For the two workflows you did NOT build: why not, what would need to change, and a preliminary design sketch.

**Step 6 — Meta-Prompting Check (30 min)**
Run the generate-evaluate-improve loop from Module 08 on the prompt/skill you wrote:

Generate three alternatives, evaluate all four on (1) task specificity, (2) constraint clarity, (3) consistency across runs, (4) correct tool selection. Rewrite using the evaluation. What changed?

**Deliverables from Lab 3:**
- One automated workflow running
- Skill file or TCEF prompt documented
- Decision rationale for two workflows not built
- Meta-prompting loop: before, evaluation criteria, after

#### Day 6–7: Reflection (45 min)

**Week 3 Reflection (700–1000 words)**

1. **The Meta-Prompting Loop Result:** Show before and after of one skill through the GEI cycle. What did the evaluator find? What changed?
2. **The Workflow Audit Decisions:** For each of the three workflows, document the four-question result, your architecture decision, and your confidence level.
3. **The Automation You Built:** Describe your workflow — what it does, what triggers it, what the agent does, how you verified it. Paste the TCEF prompt or skill file.
4. **The Failure Mode You Fear:** Based on your Lab 3 work, what concerns you about deploying this in production? How would you detect a failure? What would recovery look like?

Post with tag `#week3-reflection`.

---

## Week 4 — Phase 2 Preparation

**Time this week:** ~8h 30m
**Theme:** From experience to specification

### What This Week Accomplishes

You have three weeks of real experience. This week you convert it into structure. Your Phase 2 entry spec is what Phase 2 Day 1 is built from. Instructors will read it before you arrive.

By end of week, you have a spec document that Phase 2 instructors can build from on Day 1 — without asking you a single clarifying question.

### The Unlock

A good spec removes decisions, not just work. Every decision you leave implicit in your spec is a question Phase 2 will have to answer in real time during a live build session. Make as many decisions as you can now. Name the ones you genuinely cannot make yet — those become your open questions for Day 1.

### Your Week 4 Schedule

#### Day 1–2: Video and Reading (2.5 hours)

**Watch (1.5 hours):**

**Video 1 — Spec-Driven Development with AI Agents (40 min)**
Search: `spec driven development AI agents 2025` or `ai agent test driven development`

*Viewing guide:* (1) What makes a spec "executable" by an agent? Make a list of specific elements (verbs, measurable outcomes, example cases). (2) Where does the spec author make decisions vs. leave them to the agent? (3) How do they handle ambiguity — resolve it in the spec or let the agent ask?

**Video 2 — Production AI Workflow Retrospective (30 min)**
Search: `claude code production workflow retrospective 2025` or `ai engineering workflow review`

*Viewing guide:* (1) What surprised them about production use that demos did not predict? (2) What changed between their first CLAUDE.md and their current one? (3) What would they tell themselves 6 weeks ago?

**Read (1 hour):**

- **Re-read Module 12** (Capstone and Production Deployment) — complete. Map your Lab 4 spec to the five pipeline components.
- **Re-read Module 04** (Prompt Engineering Depth) — Section on output contracts. Identify which parts of your spec require output contracts.
- **Read your own reflections from Weeks 1–3.** Identify the three most important things you learned. These open your spec's "Engineering Approach" section.

#### Day 2–6: Lab 4 (5 hours)

**Lab 4 — Phase 2 Entry Spec**

Write the spec for a system you want to build in Phase 2. Phase 2 instructors will use this document to run a live build session on Day 1.

**Step 1 — System Selection (30 min)**
Choose one system. It must:
- Solve a real problem you have (not a learning exercise)
- Use at least one agentic pattern from Phase 1
- Be complex enough to take at least a day to build
- Be scoped enough to demonstrate in a 2-hour session
- Use systems you can access (APIs, databases, etc.)

**Step 2 — Spec Writing (3 hours)**
Use this structure:

```
System Name: [Name]

Problem Statement: [2-3 sentences — what problem, for whom, how they experience it now]

What Success Looks Like: [specific observable outcomes]

Acceptance Criteria:
- [ ] [Specific, testable criterion — falsifiable]
[At least 5 criteria]

System Architecture:
  Trigger: [specific — e.g., "GitHub webhook fires when PR opens with label 'needs-review'"]
  Context Gathering: [what the agent needs, where it comes from]
  Decision Logic: [what decisions the agent makes, what inputs each requires]
  Action Scope: [what is allowed / what is explicitly forbidden and why]
  Output Contract: [exact format of what the system produces]

Agent Architecture Decision:
  Chosen pattern: [Single-agent / Orchestrated / Parallel fan-out]
  Reasoning: [four-question framework result]
  Alternative considered: [what you rejected and why]

MCP Dependencies:
  Servers required: [name, purpose, specific tools used]
  Servers to build: [description — reference Lab 2 work where applicable]

CLAUDE.md Requirements:
  [What must be in CLAUDE.md for this to work correctly]

Security and Approval Gates:
  Irreversible actions: [list every action that cannot be undone]
  Approval gates: [when/how human approval is required for each]
  Permission configuration: [allow/deny rules for settings.json]

Test Strategy:
  Unit-level: [how to test components without running the full pipeline]
  Integration-level: [how to test end-to-end without affecting production]
  Success verification: [specific command or check that confirms a run worked]

Known Risks and Open Questions:
  Technical risks: [what could go wrong that you do not know how to handle]
  Open questions for Phase 2: [specific questions you need Day 1 to answer]

Build Sequence:
  Day 1 (Phase 2) target: [what should be working by end of Day 1]
  Day 2-3 target: [what gets added]

Artifacts from Async Period:
  CLAUDE.md: [describe what you built in Lab 1]
  MCP Server: [describe what you built in Lab 2]
  Workflow Pattern: [describe what you built in Lab 3]
```

**Step 3 — Spec Review (1 hour)**
Before submitting, check your spec against these three tests:

**The Day 1 Test:** Could Phase 2 instructors start a Claude Code session right now and build from this spec, with zero clarifying questions from you? If not, find the ambiguities and resolve them.

**The Acceptance Criteria Test:** For each criterion, can you write a test that definitively confirms pass or fail? If not, the criterion is not specific enough.

**The Ambiguity Audit:** Highlight any sentence containing "appropriate," "suitable," "good," "correct," or "proper" without specification. These are ambiguity markers. Replace them.

**Step 4 — Portfolio Synthesis (30 min)**
Add an "Artifacts from Async Period" section that documents:
- Your CLAUDE.md (link to repository commit)
- Your MCP server (link or location)
- Your automated workflow (instructions to run it)
- Your four weeks of reflections (links to posts)

This is your evidence portfolio.

**Deliverables from Lab 4:**
- Complete spec document (submitted to instructors)
- Portfolio synthesis in the spec
- Phase 2 Readiness Statement (see below)

#### Day 6–7: Phase 2 Readiness Statement (1 hour)

**Week 4 Phase 2 Readiness Statement (800–1200 words)**

This document serves two purposes. It is your self-assessment. It is also the brief Phase 2 instructors read to understand who you are when you walk in on Day 1.

Write a document addressing:

1. **What I Can Now Do (Evidence-Based):** Three specific capabilities you developed, with evidence from the labs. Not "I understand MCP" — "I built an MCP server with a GitHub integration that does X, and the schema design decision I made was Y because Z."

2. **What I Am Bringing to Phase 2:** Summary of your Lab 4 spec — the system you want to build, the architecture you chose, and the open questions Phase 2 should resolve.

3. **My Biggest Technical Uncertainty:** The thing you most need Phase 2 to address. This tells instructors where to focus Day 1.

4. **What Almost Stopped Me:** One moment from the four weeks where you nearly disengaged. What kept you going? (This is useful feedback for the program, and instructors appreciate honesty here.)

Post with tag `#week4-readiness` AND submit directly to instructors through the LMS.

---

## A Note on Failure

Every lab in this program will produce at least one unexpected error. Every student who completes the program has a story about something that did not work.

Your reflection for each week asks you to describe a failure — not because failure is the goal, but because the students who learn the most are the ones who treat failure as information. When something does not work, do not restart. Ask: "What does this tell me about the system?"

The engineers who become most effective with agentic AI are not the ones who found it easy. They are the ones who built the most thorough mental model — and the only way to build a thorough mental model is to break things and understand why.

Break things. Document it. Fix it. That is the work.

---

## Quick Reference: Lab Deliverables

| Lab | Week | Minimum Deliverable |
|-----|------|---------------------|
| Lab 1 — Stack Audit + CLAUDE.md | 1 | CLAUDE.md committed to real repo |
| Lab 2 — MCP Integration Sprint | 2 | Working MCP server, 2+ tools, runs against real system |
| Lab 3 — Agentic Workflow Audit | 3 | One automated workflow running + 2 documented decisions |
| Lab 4 — Phase 2 Entry Spec | 4 | Spec document Phase 2 can build from on Day 1 |

## Quick Reference: Reflection Tags

| Week | Tag | Length |
|------|-----|--------|
| 1 | `#week1-reflection` | 500–800 words |
| 2 | `#week2-reflection` | 600–900 words |
| 3 | `#week3-reflection` | 700–1000 words |
| 4 | `#week4-readiness` | 800–1200 words (also submit to instructors) |

## Quick Reference: When to Ask for Help

Ask in the discussion board when you are stuck for more than 45 minutes on the same problem. Post:
1. What you were trying to do
2. What you tried
3. What happened (paste the error or unexpected output)

Do not post "it is not working." Post the evidence.

Facilitators read the discussion board daily Monday through Friday. Expect a response within 24 hours.

---

*This guide is yours. Return to it each Monday morning to orient yourself for the week.*
*Good luck. See you in Phase 2.*
