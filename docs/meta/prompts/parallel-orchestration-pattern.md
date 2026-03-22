# Parallel Orchestration Pattern
## Agentic AI Engineering — Course Build System

**Purpose**: This document captures the proven pattern for dispatching multiple background agents
simultaneously to build course materials in parallel. Use it as a reference when orchestrating
large multi-file builds (labs, modules, slide decks) where each artifact can be produced
independently.

---

## Pattern Overview

The main thread (the Claude conversation you're interacting with) acts as an **orchestrator**.
Background agents act as **builders**. The orchestrator dispatches builders, monitors their
output files for completion, and collects results. The orchestrator does not build — it coordinates.

```
Main Thread (Orchestrator)
    │
    ├── dispatch Agent 1 (background) → builds Lab 01 HTML
    ├── dispatch Agent 2 (background) → builds Lab 02 HTML
    ├── dispatch Agent 3 (background) → builds Lab 03 HTML
    ├── dispatch Agent 4 (background) → builds Lab 04 HTML
    ├── dispatch Agent 5 (background) → builds Lab 05 HTML
    │
    │   [agents run in parallel — orchestrator waits]
    │
    ├── poll: ls -la labs/*.html      → check file existence
    ├── poll: wc -l labs/*.html       → verify content size
    └── collect results and report
```

This pattern produces artifacts 5–8x faster than sequential builds because agent execution
time is bounded by the slowest single agent, not the sum of all agents.

---

## Agent Dispatch Template

Each background agent is launched using the Agent tool with these exact parameters:

```
Agent tool call:
  subagent_type: "general-purpose"
  run_in_background: true
  description: "Build [Lab N] — [Lab Name] HTML lab"
  prompt: [full builder prompt — see lab-builder-template.md]
```

**Parameter notes**:

- `subagent_type: "general-purpose"` — Required for any agent that writes files. The
  general-purpose subagent has access to the Write tool. Specialized subagents (deep-researcher,
  code-reviewer) do not have Write access.
- `run_in_background: true` — Required for parallelism. Without this flag, the Agent tool
  blocks the main thread until the agent completes. With it, the main thread returns immediately
  and can dispatch additional agents.
- `description` — Short human-readable label. Used in notification messages when the agent
  completes. Make it specific enough to identify which artifact the agent built.
- `prompt` — The full, self-contained build prompt. The background agent has no access to
  the main thread's context window, conversation history, or any other state. Everything the
  agent needs to build the artifact must be in the prompt. Do not rely on implicit context.

---

## Parallel Dispatch Rules

### Rule 1: All Independent Agents in One Message

To achieve true parallelism, ALL independent agent dispatch calls must be issued in a
**single response message** from the orchestrator. Claude Code's execution model launches
tool calls issued in the same response concurrently.

```
✅ CORRECT: Single message, 7 Agent tool calls
   → All 7 agents start simultaneously
   → Total time ≈ slowest single agent's build time

❌ WRONG: 7 separate messages, one Agent call each
   → Agents run sequentially (each waits for prior to complete)
   → Total time ≈ sum of all agents' build times
```

When you identify a set of independent build tasks, issue all dispatch calls in one response,
then wait for completions.

### Rule 2: Safe Upper Bound — 7 to 8 Simultaneous Agents

In practice, 7–8 simultaneous background agents is the safe upper bound. Beyond this:

- Context window pressure increases (each agent's completion notification consumes context)
- API rate limiting may cause silent delays
- Orchestration notifications can overlap in confusing ways

For builds requiring more than 8 artifacts, batch them:
- Batch 1: agents 1–7, wait for completion, collect results
- Batch 2: agents 8–14, wait for completion, collect results

### Rule 3: Respect Dependencies — Launch Sequentially When Needed

If Agent B requires the output of Agent A (e.g., an index file that lists all labs, built
after labs exist), do not launch them in parallel:

```
✅ CORRECT: Sequential launch for dependent artifacts
   Step 1: Launch Agent A (builds lab files)
   Step 2: Wait for Agent A to complete (poll file existence)
   Step 3: Launch Agent B (builds index using lab file list)

❌ WRONG: Parallel launch of dependent agents
   Agent B reads the lab list before Agent A has written it → empty index
```

Identify dependencies before dispatching. Independent artifacts (individual labs, individual
modules) have no dependencies. Index files, summary documents, and navigation pages are
always dependent on the artifacts they reference.

---

## Monitoring Strategy

Background agents write their output to disk. The orchestrator monitors disk state to track
completion — not agent status messages, which can be delayed or ambiguous.

### Check File Existence

```bash
ls -la /path/to/output/lab-01.html
```

- File exists → agent completed the write step
- File missing → agent is still running, or failed before writing

### Verify Content Size

```bash
wc -l /path/to/output/lab-01.html
```

A well-formed HTML lab file should be 200–600 lines. A file with fewer than 50 lines
indicates a truncated write (the agent hit the 32k output limit and stopped mid-file).
A file with 0 lines indicates an empty write.

### Spot-Check Content Integrity

```bash
tail -20 /path/to/output/lab-01.html
```

A complete HTML file ends with `</body></html>`. If the file ends mid-tag or mid-content,
the write was truncated.

### Poll Strategy (When to Check)

Do not poll immediately after dispatch — agents need time to start. Recommended polling sequence:

1. Dispatch all agents in one message.
2. Issue a brief status note ("Agents dispatched. Waiting for completions.").
3. When the first completion notification arrives, run the full poll across all output files.
4. Relaunch any agents whose files are missing or truncated.

---

## Failure Recovery

### Case 1: Agent Completed Notification, File Missing

The notification fired before the file write completed, or the write failed silently.

**Recovery**: Relaunch the agent with the same prompt. Add an explicit instruction at the
end of the prompt: "Your final action must be to write the complete file to disk using the
Write tool. Do not end your response before the Write tool call completes."

### Case 2: File Exists but Truncated (< 50 lines, or no closing tag)

The agent hit the 32k output character limit and was cut off mid-write.

**Recovery**: Relaunch the agent with a modified prompt that either:
- Reduces the output size (split into two files)
- Explicitly instructs: "Write the file in sections using multiple Write tool calls if needed.
  Never truncate — a partial file is worse than no file."

### Case 3: Stale Failure Notification for a File That Exists

Completion notifications and failure notifications can arrive out of order. If a "failure"
notification arrives but `ls -la` shows the file exists with reasonable line count, treat it
as a success. The notification is stale; the file is the source of truth.

### Case 4: Agent Produced Wrong Content (Wrong Lab Number, Wrong Structure)

The prompt contained an error or the agent confused context from a previous dispatch.

**Recovery**: Relaunch with a corrected prompt. Add an explicit first line to the prompt:
"You are building Lab [N]: [Lab Name]. Do not build any other lab. Do not reference other
labs in this file except in the navigation breadcrumb."

---

## Agent Type Selection Matrix

| Task | Agent Type | Reason |
|---|---|---|
| Build HTML lab file | `general-purpose` | Requires Write tool access |
| Write Markdown module | `general-purpose` | Requires Write tool access |
| Validate file structure (grep, ls, wc) | `general-purpose` | Standard shell tools |
| Research current technical content | `deep-researcher` | Perplexity MCP access for web search |
| Review built content for accuracy | `general-purpose` | Can read + reason without write |
| Generate NotebookLM study artifacts | `general-purpose` | Requires Write tool for output |
| Anti-confabulation validation | `general-purpose` | Read + reason; no write needed |

**Note on `deep-researcher`**: This subagent type has Perplexity MCP access for live web
research but may not have Write tool access depending on session configuration. Use it for
research tasks, then pass results to a `general-purpose` agent for writing.

---

## Session Management

### Background Agents Survive Context Window Compaction

When the main thread's context window is compacted (summarized) due to length, background
agents are not affected — they run in isolated contexts. Their output files persist on disk
regardless of what happens to the main conversation. This means:

- A build dispatched before compaction can be polled after compaction by checking file existence.
- Do not assume an agent "failed" because it was dispatched before a compaction event.
- After compaction, re-read the file list to reconstruct state: `ls -la /path/to/output/`

### Polling After Compaction

If the main thread loses track of which agents were dispatched (due to compaction), recover
state by polling the output directory:

```bash
ls -la /path/to/output/*.html | wc -l    # How many files exist?
ls -la /path/to/output/*.html            # Which files?
wc -l /path/to/output/*.html             # Are they complete?
```

Compare the file list against the expected file list to identify which agents still need to run.

### Completion Tail-Check Pattern

For each output file, run a tail check before declaring the build complete:

```bash
tail -1 /path/to/output/lab-01.html    # Should be: </html>
tail -1 /path/to/output/lab-02.html
tail -1 /path/to/output/lab-03.html
# ... etc
```

Any file that does not end with `</html>` (for HTML files) or a valid document-closing marker
is incomplete and must be relaunched.

---

## Complete Dispatch Example

This example shows the orchestrator pattern for building 5 HTML labs in parallel.

**Step 1 — Single message with all dispatch calls**:

```
[Message to Claude: "Dispatch all 5 lab builders in parallel"]

Agent tool call 1:
  subagent_type: "general-purpose"
  run_in_background: true
  description: "Build Lab 01 — Environment Setup HTML lab"
  prompt: [full lab-builder prompt with LAB_NUMBER=01, LAB_TITLE=Environment Setup, ...]

Agent tool call 2:
  subagent_type: "general-purpose"
  run_in_background: true
  description: "Build Lab 02 — CLAUDE.md Configuration HTML lab"
  prompt: [full lab-builder prompt with LAB_NUMBER=02, ...]

Agent tool call 3:
  subagent_type: "general-purpose"
  run_in_background: true
  description: "Build Lab 03 — Prompt Engineering HTML lab"
  prompt: [full lab-builder prompt with LAB_NUMBER=03, ...]

Agent tool call 4:
  subagent_type: "general-purpose"
  run_in_background: true
  description: "Build Lab 04 — MCP Tool Schemas HTML lab"
  prompt: [full lab-builder prompt with LAB_NUMBER=04, ...]

Agent tool call 5:
  subagent_type: "general-purpose"
  run_in_background: true
  description: "Build Lab 05 — Agent Debugging HTML lab"
  prompt: [full lab-builder prompt with LAB_NUMBER=05, ...]
```

**Step 2 — Wait for notifications, then poll**:

```bash
ls -la /path/to/labs/lab-0{1,2,3,4,5}.html
wc -l /path/to/labs/lab-0{1,2,3,4,5}.html
tail -1 /path/to/labs/lab-0{1,2,3,4,5}.html
```

**Step 3 — Identify and relaunch any failed builds**:

If `lab-03.html` is missing or truncated:
```
Agent tool call (relaunch):
  subagent_type: "general-purpose"
  run_in_background: false    # run synchronously if only one relaunch needed
  description: "Relaunch Lab 03 — Prompt Engineering HTML lab"
  prompt: [same lab-builder prompt as original + explicit write instruction]
```

---

## Known Failure Modes and Mitigations

| Failure Mode | Symptom | Mitigation |
|---|---|---|
| Prompt too long → agent truncates output | File < 50 lines, ends mid-content | Split output into parts or reduce prompt size |
| Agent confused by implicit context | File contains wrong lab number/content | Add explicit identity line at prompt start |
| Notification arrives before write completes | Notification says "done", file missing | Wait 10s, re-poll; file usually appears |
| Compaction loses dispatch state | Orchestrator unsure which agents ran | Poll output directory; reconstruct from file list |
| Rate limiting silently delays agent start | All agents appear slow simultaneously | Normal if > 8 agents dispatched; batch instead |
| Write tool call succeeds but file is empty | File exists, 0 bytes | Check prompt for explicit Write instruction; relaunch |
