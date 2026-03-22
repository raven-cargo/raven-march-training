# Agentic AI Engineering — Challenge Missions

**Format**: Open-ended engineering challenges with clear success criteria
**Timing**: After completing core labs — these are not guided tutorials
**Output**: Working artifacts, not write-ups. If it doesn't run, it doesn't count.

These missions cover the skills the labs introduce but don't have space to go deep on: authoring skills and slash commands from scratch, configuring subagents, navigating real codebases under agent guidance, and integrating with issue trackers and PR workflows. Each mission requires you to produce something that actually does work — and then to reason about where it breaks.

---

## How Challenge Missions Differ from Labs

| Labs | Challenge Missions |
|------|-------------------|
| Guided, step-by-step | Goal + constraints only |
| One correct path | Many valid solutions |
| 45–90 min | 2–6 hours |
| Section complete = done | Working artifact = done |
| Scaffolded configuration | Author everything from scratch |

---

## Track 1 — Skills, Commands, and Agents

These missions cover the authoring side: writing the YAML that defines skills and subagents, building slash commands that orchestrate workflows, and understanding how the system actually activates and routes these.

---

### Mission 1.1: Author Two Skills From Scratch (★★★)

**The core question**: What makes a skill activatable, reusable, and trustworthy enough to run unsupervised?

**Context**: A skill is a YAML file that gives Claude structured instructions for a specific category of task. Good skills are narrow, opinionated, and self-contained. Bad skills are vague catch-alls that conflict with other context. Writing your first skill from scratch — where the activation trigger, the behavior, and the output format are all your choices — surfaces exactly this tension.

**Your deliverable**: Two working skills for recurring engineering tasks you actually do:

**Skill A — a code-focused skill**, such as:
- `pr-reviewer` — reviews a diff for a specific set of concerns (security, perf, style) and outputs a structured report
- `migration-writer` — generates SQL or ORM migration files from a natural language description of the schema change
- `test-gap-finder` — scans a module for functions with no corresponding test file and reports them with file:line references
- `api-contract-checker` — compares an OpenAPI spec to an implementation and flags divergences

**Skill B — a workflow-focused skill**, such as:
- `standup-writer` — reads recent git commits and drafts a standup summary in a specified format
- `sprint-planner` — reads open issues and drafts a prioritized sprint plan with effort estimates
- `incident-reporter` — given a description of an incident, generates an incident report in a standard format (timeline, impact, root cause, action items)
- `changelog-generator` — reads commits since a given tag and generates a structured CHANGELOG entry

**Each skill YAML must include**:
```yaml
name: your-skill-name
description: |
  One paragraph: what this skill does, when to use it,
  and what category of task it is designed for.
trigger_phrases:
  - exact phrase that activates this skill
  - another activation phrase
behavior: |
  Detailed instructions for how Claude should behave when this skill is active.
  Include: tone, format of output, what to include, what to exclude,
  what to do when input is ambiguous.
output_format: |
  Specify the exact structure of the output (headers, code blocks,
  tables, bullet formats, etc.)
examples:
  - input: "example user request"
    output: |
      example of what a good response looks like
constraints:
  - things the skill must never do
  - hard limits on scope
```

**Testing requirement**: For each skill, run it three times on different real inputs. Document whether the output matches the expected format and quality. If it doesn't, revise the skill YAML until it does.

**The hard part**: Trigger phrases must be specific enough to activate intentionally but broad enough to catch real usage. Behavior instructions must be specific enough that two different runs produce structurally similar output. Most first drafts fail one of these.

**Success criteria**:
- [ ] Both skills run without YAML parse errors
- [ ] Each skill activates on the correct trigger phrases and not on off-topic prompts
- [ ] Output format is consistent across 3 runs on different inputs (not just "it worked once")
- [ ] Constraints section explicitly rules out the most tempting bad behavior for each skill

---

### Mission 1.2: Build a Slash Command That Orchestrates Multiple Steps (★★★)

**The core question**: What's the difference between a slash command that runs a task and a slash command that coordinates a workflow?

**Context**: Slash commands can do more than invoke a single behavior — they can sequence steps, collect information from multiple sources, and route to different behaviors based on what they find. This mission requires you to build a command that does at least three distinct operations in order, where each step's output informs the next.

**Your deliverable**: One working slash command that implements a non-trivial workflow. Choose one:

**Option A — `/ship`**: A pre-ship checklist for a feature branch
1. Read the current branch's commit log since branching from main
2. Check which files changed and identify which test files are missing for changed modules
3. Check CLAUDE.md for any shipping constraints or required steps
4. Produce a ship-readiness report: what's done, what's missing, go/no-go recommendation

**Option B — `/onboard`**: New developer setup assistant
1. Read the repo structure (package.json / requirements.txt / Cargo.toml) and identify the tech stack
2. Check if a CLAUDE.md exists and whether it covers the required onboarding topics
3. Read the README and evaluate whether it covers: local setup, how to run tests, how to contribute
4. Produce a gap report: what's missing, what's unclear, and generate the missing sections

**Option C — `/incident`**: Production incident responder
1. Accept an incident description as input
2. Read recent git commits (last 24 hours) and flag any that touched critical paths
3. Read error logs or a provided stack trace (accept a file path as argument)
4. Generate a structured incident response: likely cause, affected components, immediate mitigations, rollback option

**Option D — your own proposal**: Must have at least 3 sequential steps where each step uses the output of the previous one.

**The command file must include**:
- Clear argument spec (what does the user pass in?)
- Step-by-step behavior with explicit data flow between steps
- Output format for the final report
- Error behavior (what happens if a step fails or returns nothing useful?)

**Testing requirement**: Run the command on two different real repositories (or two real scenarios). Document: did it work? Did it produce useful output? What did it miss?

**Success criteria**:
- [ ] Command executes all 3 steps without manual intervention between steps
- [ ] Output is structured and actionable (not just raw data dumps)
- [ ] Error cases (missing file, empty log, no CLAUDE.md) produce helpful output, not crashes
- [ ] Tested on 2 different real inputs with documented results

---

### Mission 1.3: Configure a Specialized Subagent (★★★★)

**The core question**: When does a task warrant a subagent, and what configuration makes a subagent trustworthy for unsupervised work?

**Context**: A subagent is a Claude agent launched with a specific system prompt, tool set, and scope. Unlike an interactive session, a subagent runs to completion without human intervention. This means its configuration must be conservative enough that bad decisions don't cause irreversible damage — but scoped enough that it can complete real work.

**Your deliverable**: A configured subagent for one of these roles:

**Option A — Security Reviewer subagent**: Launched against a codebase; outputs a structured security report. Must only read files — never write. Must cover: dependency vulnerabilities, hardcoded secrets, injection risks, authentication patterns, and error message exposure. Output: JSON-structured finding list with severity, file, line, and remediation.

**Option B — Documentation Writer subagent**: Launched against a module or package; reads the source, reads existing docs (if any), and writes docstrings/JSDoc/type hints for undocumented public functions. Must never change logic — only add documentation. Must flag functions it wasn't confident about rather than guessing.

**Option C — Test Generator subagent**: Launched against a specific file or function; reads the implementation, generates a test file with unit tests for the public interface. Must infer test cases from the function signature and behavior, not just write trivial "it returns something" tests. Must note any behaviors it can't test without mocking.

**Configuration document** (your deliverable):
```yaml
subagent:
  name: your-agent-name
  system_prompt: |
    Complete system prompt text. This is what the agent reads before starting.
    Must include: role definition, scope constraints, output format,
    what to do when uncertain, what to never do.
  allowed_tools:
    - list of tools this agent can use
  denied_tools:
    - list of tools explicitly blocked
  scope:
    description: "What inputs this agent accepts"
    constraints: "What it must never modify, access, or assume"
  output:
    format: "Exact format of the agent's output"
    location: "Where it writes results (stdout, file, etc.)"
  failure_behavior: |
    What the agent does when it encounters something it can't handle
    (missing context, ambiguous code, permission error, etc.)
```

**Testing requirement**: Launch the subagent on a real codebase (yours or a public repo). Evaluate:
- Did it stay within scope?
- Did it produce output in the specified format?
- Were there cases where it should have flagged uncertainty but didn't?
- Were there cases where it flagged uncertainty correctly?

**The hard part**: The system prompt is the only thing that constrains the subagent's behavior. Vague prompts produce vague results. Overly restrictive prompts prevent useful output. You'll need to iterate.

**Success criteria**:
- [ ] System prompt explicitly defines scope, output format, and uncertainty behavior
- [ ] Denied tools are chosen deliberately (not just "all dangerous tools")
- [ ] Agent runs on a real codebase and produces structured output
- [ ] Tested with at least one edge case that tests the uncertainty/failure path

---

## Track 2 — Codebase Navigation and Issue Resolution

These missions cover the skill of moving through an unfamiliar codebase under agent guidance — finding what's there, understanding what's broken, making targeted changes, and tracking the work in an issue management system.

---

### Mission 2.1: Codebase Archaeology — Understand Before Touching (★★★)

**The core question**: How do you use Claude Code as a navigator in an unfamiliar codebase before writing a single line?

**The setup**: Pick a real open-source codebase you've never worked in before. It must have:
- At least 5,000 lines of code
- Multiple modules or packages
- Some test coverage (doesn't need to be complete)
- At least one open issue or recent bug report

Good candidates: any mid-sized open-source project on GitHub in your primary language.

**Phase 1 — Orientation** (use Claude Code's read tools only — no writes):
Ask Claude Code to build you a codebase map. The output should include:
1. The top-level architecture (what are the major components?)
2. The entry points (where does execution start?)
3. The test coverage hotspots (which parts are well-tested? which aren't?)
4. The dependency graph (which modules depend on which?)
5. Any obvious code smells (long files, duplicated logic, missing error handling)

**Phase 2 — Bug Hunting**:
Take one open issue from the repo (any issue labeled "bug"). Use Claude Code to:
1. Locate the relevant code (which files, which functions?)
2. Reproduce the bug in a test (write a failing test that demonstrates the bug)
3. Identify the root cause (not just "the code is wrong" — trace the specific logic failure)
4. Propose a fix (do not implement it yet)

**Phase 3 — Implement and Verify**:
Implement the fix with Claude Code. Then:
1. Run the failing test — it should now pass
2. Run the full test suite — nothing else should break
3. Write a brief description of the fix suitable for a PR description

**Your deliverable**: The codebase map (Phase 1), the root cause analysis (Phase 2), the working fix + passing tests (Phase 3), and the PR description.

**Success criteria**:
- [ ] Codebase map covers all 5 required sections and is accurate (verify by reading the code manually)
- [ ] Failing test actually fails before the fix and passes after
- [ ] Root cause analysis identifies the specific line/logic failure, not just the symptom
- [ ] Full test suite passes after the fix

---

### Mission 2.2: Issue-to-PR Pipeline Using Linear or GitHub MCP (★★★★)

**The core question**: Can you build a workflow where Claude Code reads a real issue, works on a real codebase, and produces a real PR — with every step tracked in the issue tracker?

**The setup**:
- A repository with at least one open issue labeled "good first issue" or "bug"
- An MCP server configured for your issue tracker (choose one):
  - **GitHub MCP**: reads/writes GitHub Issues and PRs
  - **Linear MCP**: reads/writes Linear issues and updates

**The full workflow you must implement**:

**Step 1 — Read the issue**:
Use your MCP tool to pull the issue content. Parse it: what's the problem description? What's the expected behavior? What's the actual behavior? Are there reproduction steps?

**Step 2 — Acknowledge in the tracker**:
Update the issue status (mark as "In Progress" or leave a comment) so the team knows it's being worked. Include the agent's initial assessment of complexity.

**Step 3 — Locate the relevant code**:
Use Claude Code to navigate the codebase and identify the files that need to change. Comment on the issue with the file list and a one-sentence rationale for each.

**Step 4 — Implement the fix**:
Make the change. Run tests. If tests don't exist for this path, write a test that validates the fix.

**Step 5 — Create the PR**:
Use your MCP tool to open a PR (GitHub) or update the issue to "In Review" (Linear) with:
- A description that references the issue
- A summary of what changed and why
- A testing section (how do you know it works?)
- A "what could still go wrong" section (honest risk assessment)

**Step 6 — Close the loop**:
Link the PR back to the issue. Update the issue status to "In Review" / "Done" as appropriate.

**Your deliverable**: The complete workflow — all 6 steps executed on a real issue, with the tracker showing the progression from open → in progress → in review.

**The hard part**: Issues are often underspecified. You'll have to make judgment calls about what the expected behavior is. The comments you leave in the tracker should reflect your reasoning — not just your conclusions.

**Success criteria**:
- [ ] MCP server is configured and reads issues correctly from the start
- [ ] Each step produces a visible artifact in the tracker (comment, status change, or linked PR)
- [ ] The PR description is specific enough that a reviewer could evaluate it without reading the code
- [ ] Tests pass (existing suite + your new test)
- [ ] "What could still go wrong" section in the PR is honest, not performatively humble

---

### Mission 2.3: PR Review Workflow — Agent as Reviewer (★★★★)

**The core question**: What does a genuinely useful automated PR review look like, and what must it never pretend to do?

**The setup**: Take any open PR in a public repository (or use your own). The PR must have at least 200 changed lines across multiple files.

**Part 1 — Build the review agent**:
Configure Claude Code (or a subagent) to perform a structured review of a PR diff. The review must cover exactly these 5 categories:

1. **Correctness** — does the logic do what the PR description claims? Identify any cases where the implementation diverges from the stated intent.

2. **Test coverage** — which changed code paths are covered by new or existing tests? Which aren't? List specific functions/branches with no test coverage.

3. **Security** — any new attack surfaces? Injection risks? Auth bypasses? Exposed secrets? If none found, say "none found" explicitly (not silence).

4. **Performance** — any O(n²) where O(n) was possible? Any new database queries in a loop? Any blocking operations on a hot path?

5. **API contract** — if this PR changes a public interface (function signatures, REST endpoints, event schemas), is the change backward compatible? If not, is the breaking change documented?

The review must end with: **APPROVE** / **REQUEST CHANGES** / **NEEDS DISCUSSION** — with a one-sentence rationale.

**Part 2 — Run it and evaluate**:
Run your review agent on the real PR. Then compare your agent's review to the actual human reviews (if any exist on the PR).

Answer these questions:
- Where did the agent agree with human reviewers?
- Where did the agent catch something humans missed?
- Where did a human catch something the agent missed?
- What category of issue does the agent consistently miss?

**Part 3 — Post the review**:
If you used a public PR on a real project: post the review (or a selected portion of it) as a comment. Be transparent that it was generated with Claude Code.

If you used a private/internal PR: submit the review to the PR normally.

**Your deliverable**: The review agent configuration, the review output, and the 4-question comparison with human reviews.

**The hard part**: Automated reviewers are tempted to over-review trivial things and under-review subtle things. The 5-category structure prevents both — but only if each category says something specific. "No security issues found" is acceptable. "N/A" is not.

**Success criteria**:
- [ ] Review covers all 5 categories with specific findings (or explicit "none found")
- [ ] APPROVE / REQUEST CHANGES / NEEDS DISCUSSION verdict includes a rationale
- [ ] Comparison with human reviews is honest about gaps in both directions
- [ ] Review is posted to an actual PR (public or private)

---

## Track 3 — Production-Grade Systems

These are the hardest missions. They require building something complete enough to run in the real world — not a demo, not a proof of concept.

---

### Mission 3.1: Build a Developer Productivity Toolkit (★★★★)

**The core question**: Can you build a cohesive set of skills, commands, and a subagent that work together as a system — not just a collection of independent tools?

**The brief**: Build a toolkit that makes a specific engineering workflow meaningfully faster. The toolkit must have at least three components that interact:

**Minimum viable toolkit**:
- **1 skill** that activates automatically for a specific task category
- **1 slash command** that orchestrates a multi-step workflow using that skill
- **1 subagent configuration** that handles a background task related to the workflow

**Example toolkits** (pick one or design your own):

**Example A — Codebase Health Toolkit**:
- Skill: `tech-debt-annotator` — when reading any file, surfaces tech debt markers and classifies them by type and severity
- Command: `/audit [path]` — runs the skill across a directory, aggregates findings, outputs a prioritized tech debt report
- Subagent: `dependency-updater` — reads package files, checks for outdated packages, opens a draft PR with version bumps and a risk assessment per package

**Example B — PR Quality Toolkit**:
- Skill: `pr-describer` — given a diff, generates a structured PR description following the team's template
- Command: `/ship` — runs pre-ship checks (tests passing, coverage not regressed, breaking changes documented), then uses the skill to draft the PR description, then opens the PR via GitHub MCP
- Subagent: `pr-shepherd` — monitors open PRs, identifies ones that have been open for >3 days without activity, posts a gentle ping to the reviewer

**Example C — Documentation Maintenance Toolkit**:
- Skill: `doc-drift-detector` — when reading code, identifies functions whose docstrings/comments don't match the current implementation
- Command: `/sync-docs [module]` — runs the skill across a module, collects all drifted docs, generates updated versions, outputs a diff for human review before writing
- Subagent: `doc-coverage-reporter` — scans a codebase and generates a report of public functions with no documentation, ranked by call frequency (as a proxy for importance)

**Deliverable requirements**:
1. All three components (skill, command, subagent) are authored and run correctly
2. They interact: the command uses the skill, and the subagent's output could be consumed by the command or skill
3. A `TOOLKIT-README.md` explains: what the toolkit does, how to install each component, how to use it, and what it explicitly does not handle
4. Evidence of use: run the full toolkit on a real codebase and document the outputs

**Success criteria**:
- [ ] All three components run without errors
- [ ] The components interact (not just three independent tools with a common theme)
- [ ] TOOLKIT-README.md passes the "could a new team member install and use this in 20 minutes?" test
- [ ] Demonstrated on a real codebase with documented outputs

---

### Mission 3.2: Issue-to-Merge End-to-End Automation (★★★★★)

**This is the hardest mission.** It requires every track of the course working together.

**The brief**: Build a complete, production-grade automation that takes an issue from "open" to "merged PR" with appropriate human checkpoints. Not a demo — something you could actually run on a real codebase.

**The full pipeline**:

```
Issue Tracker (Linear/GitHub)
    ↓  [Agent reads issue, classifies complexity]
    ↓  [Leaves "acknowledging" comment with classification]
Codebase Navigation
    ↓  [Agent identifies affected files and root cause]
    ↓  [Updates issue with file list + ETA estimate]
Implementation
    ↓  [Agent writes the fix]
    ↓  [Agent writes/updates tests]
    ↓  [Agent runs test suite — pipeline halts if tests fail]
Human Checkpoint #1: Code Review
    ↓  [Agent generates PR draft with structured description]
    ↓  [Waits — does not merge without human approval]
Issue Tracker Update
    ↓  [Agent updates issue to "In Review" with PR link]
Human Checkpoint #2: Final Merge Decision
    ↓  [Human approves/requests changes]
    ↓  [Agent closes issue if merged]
```

**Required deliverables**:

1. **Pipeline configuration**: How does the pipeline start? (Triggered manually, scheduled, on-issue-create webhook?) Document the trigger mechanism.

2. **CLAUDE.md for the pipeline**: The agent that runs this pipeline needs a complete CLAUDE.md that covers: what codebase it's operating on, what types of issues it should handle (and which it should decline with a "needs human" response), what patterns to follow, and what it must never do.

3. **Skill + command that implements the pipeline**: Either as a slash command that orchestrates the steps, or as a skill that guides Claude through the workflow.

4. **Two human checkpoint designs**: For each of the two human checkpoints, document:
   - What information is shown to the human?
   - What options does the human have? (approve/reject/modify)
   - What does the pipeline do if it gets no response after N minutes?

5. **Permissions model**: The `settings.json` that correctly scopes the pipeline agent. What can it write? What can it run? What's explicitly blocked?

6. **Observability**: At least 5 log points with structured output (not just "step completed"). Each log entry must include: step name, timestamp, input summary, output summary, and any uncertainty flags.

7. **Cost controls**: What happens if the pipeline runs for 30 minutes instead of 5? Where is the circuit breaker?

8. **Tested end-to-end**: Run the full pipeline on one real issue (can be in a personal/test repo). Document every step with the actual outputs.

9. **Retrospective**: After the run, answer:
   - What did the agent do that surprised you (good or bad)?
   - Where did it need to make a judgment call? Was the judgment correct?
   - What would you add to CLAUDE.md based on what you observed?
   - What would you change about the pipeline structure?

**Success criteria**:
- [ ] Pipeline runs end-to-end on a real issue without manual intervention between checkpoints
- [ ] Human checkpoints are real (not just log messages — actual pause points where a human must take action)
- [ ] All 5 log points produce structured, useful output (not "step N complete")
- [ ] Cost control mechanism is tested by forcing an early termination
- [ ] Retrospective is honest and identifies at least 3 things to change

---

## Mission Map: Skills Used by Track

| Mission | Key Skills | Related Modules |
|---------|-----------|-----------------|
| 1.1 Author Skills | Skill YAML authoring, trigger design, output formatting | M07 Skills & Commands |
| 1.2 Slash Command | Command orchestration, multi-step sequencing | M07 Skills & Commands |
| 1.3 Subagent Config | System prompt engineering, tool scoping, uncertainty handling | M09 Multi-Agent |
| 2.1 Codebase Archaeology | Code navigation, bug localization, root cause analysis | M03 Agent Thinking |
| 2.2 Issue-to-PR | MCP (Linear/GitHub), issue tracking, PR workflow | M05/06 MCP |
| 2.3 PR Review Agent | Structured review, subagent scope, comparative evaluation | M09 Multi-Agent |
| 3.1 Productivity Toolkit | Skills + commands + subagents as a system | M07, M09 |
| 3.2 Full Pipeline | All modules: MCP, permissions, multi-agent, production | All |

---

## Evaluation Framework

There's no rubric that fully captures engineering judgment. But these questions separate strong from weak work:

| Question | Weak answer | Strong answer |
|----------|-------------|---------------|
| Does it work? | "It ran successfully" | "It ran on 3 real inputs, produced correct output on 2, flagged uncertainty on 1" |
| Why did you design it this way? | "It seemed right" | "I tried X first — it failed because Y — so I switched to Z" |
| What can go wrong? | "I'm not sure" | "These specific failure modes — here's how to detect each in production" |
| What did you leave out? | "Nothing" | "I decided not to handle X because [reason] — here's when that decision breaks down" |

---

## Setup Requirements

Before starting Track 2 or 3, you need:

```bash
# GitHub MCP (for Issue/PR integration)
claude mcp add github-mcp npx -- -y @modelcontextprotocol/server-github

# Linear MCP (alternative to GitHub)
claude mcp add linear -- npx -y @linear/mcp-server

# Verify both are available
claude "list available MCP tools"
```

For Track 1 missions, you only need Claude Code itself. No additional MCP servers required.

---

## A Note on Scope

The progression from Mission 1.1 to Mission 3.2 is deliberate:

- **1.x missions** build authoring fluency — you learn what good YAML looks like by writing bad YAML first
- **2.x missions** build navigation and integration fluency — you learn how agents handle real codebases and real trackers
- **3.x missions** build systems thinking — you learn that three working components ≠ a working system

Mission 3.2 is estimated at 8–12 hours for an experienced engineer. That's intentional. The pipeline design, the human checkpoint UX, and the retrospective together are the learning — not just the working code.

---

*Challenge Missions v2.0 — Session 8, 2026-03-16*
*Tracks: Skills/Commands/Agents · Codebase Navigation · Production Systems*
