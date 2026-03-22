# Prompt Library: Core Agentic Contexts
## Agentic AI Engineering Course — Day 1–3 Reference

**Version:** 1.0.0
**Purpose:** Immediately-usable, production-tested prompts organized by task type, complexity, and phase of the PRAO loop they primarily target.

**How to Use:**
1. Copy the prompt as-is for learning contexts
2. Replace `[bracketed variables]` with your specific values
3. Save prompts that work for you to your personal prompt library
4. Rate each prompt after use (⭐ to ⭐⭐⭐⭐⭐) — track what works for YOUR context

---

## Domain 1: Codebase Understanding (Perceive-Focused)

These prompts are optimized for the **Perceive** phase — giving the agent rich context to work from.

### 1.1 Architecture Overview

```
Explain the architecture of this codebase in three levels:
1. Bird's eye: What is this system and what problem does it solve?
2. Component level: What are the main modules and how do they interact?
3. Key patterns: What design patterns are in use? (e.g., repository pattern, MVC, event-driven)

Do NOT write new code. Focus on what already exists.
```

**Best for:** Onboarding, unfamiliar repos, post-merge orientation
**Expected output:** 300-600 words, structured list
**Reliability:** ⭐⭐⭐⭐⭐

---

### 1.2 Dependency and Risk Mapping

```
Analyze the dependencies in [filename or directory] and:
1. List all external dependencies with their versions
2. Flag any that are outdated (> 6 months since major release) or have known security issues
3. Identify which internal modules depend on [specific module]
4. Mark the three highest-risk dependencies and explain why

Focus on factual analysis only — do not suggest replacements yet.
```

**Best for:** Security audits, upgrade planning, impact analysis
**Reliability:** ⭐⭐⭐⭐

---

### 1.3 Data Flow Tracing

```
Trace the data flow for the [user action] use case from [entry point] to [exit point].
Show:
- What data enters at each step
- What transformations occur
- What is persisted and where
- What is returned to the caller
- Any validation or sanitization points

Present as a numbered list of steps, not prose.
```

**Best for:** Debugging, documentation, onboarding
**Reliability:** ⭐⭐⭐⭐

---

### 1.4 "What Changed" Analysis

```
Look at the git history for the last [N] commits on [file/directory].
Summarize:
1. What was the original design intent?
2. What changed and in roughly what order?
3. Are there any patterns in the changes? (e.g., repeated bug in same area)
4. What was the most significant structural change?

Use specific commit references when naming changes.
```

**Best for:** Historical understanding, debugging regressions
**Reliability:** ⭐⭐⭐⭐

---

## Domain 2: Code Creation (Act-Focused)

### 2.1 Feature Implementation — Standard

```
Implement [feature name] in [language/framework].

Requirements:
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

Constraints:
- Follow the existing patterns in [reference file]
- Do NOT modify [files/directories to protect]
- [Language/framework]-specific constraints: [e.g., "use Prisma for DB operations, not raw SQL"]

Output format:
- New files with full content
- Modified files with ONLY the changed sections shown
- A summary of what was added/changed and why
```

**Best for:** New feature development
**Reliability:** ⭐⭐⭐⭐

---

### 2.2 Test Suite Generation

```
Write comprehensive tests for [function/class/module name] in [file path].

Read the implementation first. Then write tests that cover:
1. Happy path: all valid input combinations
2. Edge cases: empty inputs, zero, max values, nulls
3. Error cases: what should throw? what should return error types?
4. Integration: how does this interact with [dependency]?

Follow the test patterns in [reference test file].
Use [testing framework] (already configured in package.json).

Do NOT mock [specific dependencies] — test them for real in this context.
```

**Best for:** TDD adoption, coverage improvement, regression testing
**Reliability:** ⭐⭐⭐⭐⭐

---

### 2.3 Refactor for Readability

```
Refactor [file/function] for readability. Do NOT change behavior.

Specifically:
- Extract magic numbers into named constants
- Break functions longer than 30 lines into smaller named functions
- Add inline comments only where the "why" is non-obvious
- Rename variables that are single letters (except loop counters)
- Preserve all existing tests passing

Show a before/after diff for each meaningful change.
Do NOT add new features or change the public API.
```

**Best for:** Code quality sprints, legacy code improvement
**Reliability:** ⭐⭐⭐⭐⭐

---

### 2.4 Migration Script Generation

```
Write a migration script that [migration goal].

Context:
- Current state: [describe current schema/structure/format]
- Target state: [describe desired schema/structure/format]
- Data volume: [approximate rows/files/records]
- Reversibility: [can this be rolled back? what's the rollback plan?]

Requirements:
- Must be idempotent (safe to run multiple times)
- Must log progress every [N] records
- Must produce a dry-run mode (no writes) activated by [flag/env var]
- Must exit with non-zero code if any record fails

Language: [Python/SQL/TypeScript/Bash]
```

**Best for:** Database migrations, data format changes, ETL pipelines
**Reliability:** ⭐⭐⭐⭐

---

## Domain 3: Code Review (Reason-Focused)

### 3.1 Security-First Review

```
Review [file or diff] for security vulnerabilities. Check for:

CRITICAL (block merge):
- Injection vulnerabilities (SQL, command, LDAP, XPath)
- Hardcoded secrets, keys, or tokens
- Authentication bypass possibilities
- Insecure deserialization

HIGH (require fix before merge):
- Missing input validation
- Overly permissive CORS or CSP
- Sensitive data in logs
- Missing rate limiting on auth endpoints

MEDIUM (flag with recommendation):
- Dependency versions with known CVEs
- Overly verbose error messages
- Missing security headers

For each finding: file:line, severity, description, recommended fix.
```

**Best for:** Security audits, PR reviews, compliance checks
**Reliability:** ⭐⭐⭐⭐⭐

---

### 3.2 Performance Review

```
Review [file/function] for performance issues. Focus on:
1. Algorithm complexity: any O(n²) or worse that could be O(n log n) or better?
2. Database queries: N+1 query patterns, missing indexes, unneeded data fetched
3. Memory: large objects held in scope longer than needed, missing cleanup
4. Caching opportunities: what's computed repeatedly that could be memoized?
5. Blocking operations: synchronous calls that should be async

For each issue: location, current complexity, impact (low/medium/high), suggested fix.
Do NOT suggest premature optimization — only flag actual bottlenecks.
```

**Best for:** Performance reviews, scaling preparation
**Reliability:** ⭐⭐⭐⭐

---

### 3.3 PR Review (Standard Engineering)

```
Review this PR as a senior engineer on the team. Read the diff carefully.

Check for:
1. Does the implementation match the stated goal?
2. Are there edge cases the author didn't consider?
3. Is there a simpler approach to any complex section?
4. Does it follow team conventions? (reference CLAUDE.md)
5. Are tests adequate? What's missing?

Format your review as:
## Summary (1-2 sentences: overall assessment)
## Must Fix (blocking issues)
## Should Fix (non-blocking but important)
## Nice to Have (optional improvements)
## Questions (things you genuinely don't understand yet)
```

**Best for:** Code review automation, PR assistance
**Reliability:** ⭐⭐⭐⭐⭐

---

## Domain 4: Documentation Generation (Observe-Focused)

### 4.1 API Documentation

```
Generate API documentation for [file/module] in [format: OpenAPI YAML / JSDoc / Markdown].

For each exported function/endpoint:
- Name and signature
- Purpose (one sentence)
- Parameters: name, type, required/optional, description, constraints
- Returns: type, structure, possible error states
- Example request/response (realistic values, not "foo"/"bar")
- Side effects (what does it mutate or trigger?)

Read the implementation to infer correct types — do NOT guess or assume.
Flag any parameters whose types you cannot determine from the code.
```

**Best for:** Documentation generation, API design review
**Reliability:** ⭐⭐⭐⭐

---

### 4.2 README Generation

```
Generate a README.md for [project/module].

Required sections:
1. What this is (1 paragraph, no jargon)
2. When to use this vs. alternatives
3. Prerequisites (exact versions where relevant)
4. Installation (every command needed, in order)
5. Basic usage (copy-paste working example)
6. Configuration reference (all env vars and config options)
7. Contributing guide (how to run tests, PR expectations)

Read the actual code — do not fabricate API signatures or config options.
Flag any section where information is insufficient in the codebase.
```

**Best for:** Open-source projects, internal tools, onboarding
**Reliability:** ⭐⭐⭐⭐

---

### 4.3 Decision Documentation (ADR)

```
Write an Architecture Decision Record (ADR) documenting the decision to [decision].

Context from the codebase:
[paste relevant code snippet or describe what you see]

ADR format:
## Title: [ADR-NNN: Decision Title]
## Status: [Proposed / Accepted / Deprecated / Superseded]
## Context: What problem were we solving? What were the constraints?
## Decision: What did we decide and why?
## Alternatives Considered: What else was evaluated and why rejected?
## Consequences: What are the trade-offs? What becomes easier/harder?
## Implementation Notes: What must the team know to work with this decision?

Do not editorialize — describe what IS, not what you think SHOULD be.
```

**Best for:** Tech debt tracking, knowledge transfer, governance
**Reliability:** ⭐⭐⭐⭐

---

## Domain 5: MCP and Tool Integration

### 5.1 MCP Server Tool Invocation

```
Using the [MCP server name] MCP server, [task description].

Before calling any tool:
1. List the available tools from this server
2. Identify which tool(s) are needed for this task
3. Describe the inputs you'll provide and why

After calling:
- Show the raw result
- Interpret what it means for the task
- If the result is unexpected, describe what went wrong and what to try next
```

**Best for:** Learning MCP, debugging MCP connections, tool exploration
**Reliability:** ⭐⭐⭐⭐

---

### 5.2 MCP Tool Design

```
Design an MCP tool for [capability].

The tool should:
- Name: [verb_noun format, e.g., "get_user_permissions"]
- Do exactly ONE thing well
- Accept the minimum required inputs
- Return structured data (JSON), not prose

Provide:
1. Tool name and description (as they'll appear in the MCP schema — this is Claude's API doc)
2. Input schema (JSON Schema format)
3. Example inputs and expected outputs (3 examples: happy path, edge case, error)
4. Implementation sketch in [Node.js / Python]
5. Test cases for the tool handler

The description MUST be specific enough for Claude to know when to call this tool and what to expect back.
```

**Best for:** Building MCP servers, tool design review
**Reliability:** ⭐⭐⭐⭐

---

## Domain 6: Skill and Command Creation (Meta-Prompting)

### 6.1 Skill Generator

```
Write a Claude Code skill (saved to ~/.claude/skills/) that teaches Claude to [behavior].

The skill should:
1. Activate when: [trigger condition — what user input or context triggers this skill?]
2. Instruct Claude to: [specific behavior, step by step]
3. Include explicit DON'Ts: what should Claude NEVER do when this skill is active?
4. Provide one example: INPUT → EXPECTED OUTPUT

Format as a markdown file with YAML frontmatter:
---
name: skill-name
description: One sentence for skill discovery
triggers:
  - keyword or pattern
---

[Instructions body]

Make the instructions specific enough that any Claude model could follow them reliably. Avoid vague terms like "appropriately" or "as needed."
```

**Best for:** Building team skills, encoding team knowledge
**Reliability:** ⭐⭐⭐⭐⭐

---

### 6.2 Command Generator

```
Create a Claude Code slash command called /[command-name] that [command purpose].

The command should:
- Accept these arguments: [list optional arguments and their types]
- When run, perform: [ordered list of steps]
- Output: [describe expected output format]
- Fail gracefully if: [list conditions where it should stop and explain why]

Include:
1. The command file content (markdown, saved to ~/.claude/commands/[name].md)
2. 3 example invocations with expected behavior
3. One "gotcha" the user should know about

The command file MUST start with a clear sentence describing what this command does, so Claude understands it when loading.
```

**Best for:** Team workflow standardization, repeatability
**Reliability:** ⭐⭐⭐⭐

---

### 6.3 Prompt Self-Critique

```
You will now act as a prompt critic. Read this prompt:

---
[PASTE PROMPT HERE]
---

Evaluate it against these criteria:
1. Clarity (1-5): Is the goal unambiguous?
2. Specificity (1-5): Are constraints specific enough to prevent unwanted behavior?
3. Context (1-5): Does the agent have everything it needs to complete the task?
4. Format clarity (1-5): Is the expected output format clear?
5. Reliability (1-5): Would this produce consistent results across 10 runs?

For each criterion below 4: describe the problem and suggest a specific fix.
Then output an improved version of the prompt.
```

**Best for:** Prompt iteration, teaching prompt design
**Reliability:** ⭐⭐⭐⭐⭐

---

## Domain 7: Multi-Agent Orchestration

### 7.1 Task Decomposition for Parallel Agents

```
I need to accomplish: [high-level task]

Decompose this into parallel subtasks for multiple Claude Code agents.

For each subtask:
1. Name and description (what does this agent do?)
2. Inputs it needs (from user, from other agents, from codebase)
3. Outputs it produces (format, file location, or message content)
4. Dependencies: which other subtasks must complete BEFORE this one can start?
5. Estimated complexity: small (< 5 min) / medium (5-15 min) / large (> 15 min)

Then produce:
- A dependency graph (text-based: A → B means A must complete before B)
- Recommended execution order (which can run in parallel?)
- Any shared resources that need coordination
```

**Best for:** Complex task planning, multi-agent pipeline design
**Reliability:** ⭐⭐⭐⭐

---

### 7.2 Orchestrator System Prompt

```
You are the orchestrator for a [task type] pipeline.

Your job:
1. Receive a task from the user
2. Decompose it into subtasks
3. Assign subtasks to worker agents using the Task tool
4. Collect results from all workers
5. Synthesize results into a coherent final output
6. Report: what succeeded, what failed, what needs human review

Rules:
- Launch workers in parallel when they have no dependencies
- If a worker fails: describe the failure and whether to retry or skip
- Never modify files directly — workers do that
- Final output must be in [format: JSON / Markdown / structured list]

Current task: [TASK_DESCRIPTION]
```

**Best for:** Orchestrator agent configuration, multi-agent systems
**Reliability:** ⭐⭐⭐⭐

---

## Domain 8: CLAUDE.md Templates

### 8.1 Project CLAUDE.md Starter

```markdown
# [Project Name] — Claude Code Context

## What This Is
[One paragraph: what this project does, who uses it, what problems it solves]

## Tech Stack
- Language: [e.g., TypeScript 5.x]
- Framework: [e.g., Next.js 14, Express 4]
- Database: [e.g., PostgreSQL 15 via Prisma]
- Testing: [e.g., Jest + Supertest]
- CI/CD: [e.g., GitHub Actions → Vercel]

## Conventions
- Naming: [e.g., "camelCase for variables, PascalCase for components"]
- File structure: [e.g., "features/ contains feature folders, each with component/, hooks/, utils/"]
- Commits: [e.g., "conventional commits: feat/fix/docs/refactor/test/chore"]
- PRs: [e.g., "must have tests, must pass CI, requires 1 review"]

## Critical Rules (NEVER violate)
- NEVER commit secrets or API keys
- NEVER modify [protected files/dirs] directly
- ALWAYS run [test command] before suggesting a commit
- API responses MUST match [schema location] — validate before returning

## Database
- Migrations: [e.g., "use Prisma migrations, never direct SQL"]
- Transactions: [e.g., "any multi-step write must be in a transaction"]
- Never drop tables without explicit user confirmation

## Known Gotchas
- [Common mistake 1 and how to avoid it]
- [Common mistake 2 and how to avoid it]

## Useful Commands
- `[command]` — [what it does]
- `[command]` — [what it does]
```

**Best for:** Project initialization, team onboarding, consistency
**Reliability:** ⭐⭐⭐⭐⭐

---

### 8.2 Security-Hardened CLAUDE.md Addition

```markdown
## Security Policy (Mandatory)

Claude must:
- NEVER write code that stores plaintext passwords
- ALWAYS use parameterized queries (never string interpolation in SQL)
- ALWAYS validate and sanitize user inputs before use
- NEVER log request bodies that may contain PII
- ALWAYS use the existing auth middleware for protected routes (see middleware/auth.ts)

Before suggesting any change that touches authentication, authorization, or data access:
1. State explicitly what security implications the change has
2. Confirm the approach with the user before implementing
3. Add a comment in the code explaining the security consideration

If you are uncertain whether an approach is secure: SAY SO and suggest the user consult a security expert.
```

**Best for:** Production systems, regulated industries, security-conscious teams
**Reliability:** ⭐⭐⭐⭐⭐

---

## Domain 9: Evaluation and Quality

### 9.1 Output Quality Check

```
Evaluate this [code/documentation/test suite] against these criteria. Score each 1-5:

1. Correctness: Does it do what it claims to do?
2. Completeness: Are there obvious missing cases or gaps?
3. Clarity: Would another engineer understand this without the author present?
4. Maintainability: Will this be easy to modify in 6 months?
5. Convention alignment: Does it follow the patterns in the codebase?

For each criterion below 4: cite a specific example and suggest a concrete improvement.
```

**Best for:** Code review, self-review, quality gates
**Reliability:** ⭐⭐⭐⭐

---

### 9.2 Test Quality Evaluation

```
Evaluate these tests. For each, determine:
1. What behavior is being tested? (be specific — not "tests createUser" but "tests createUser returns 400 when email is invalid")
2. Is the assertion specific? (checking exact values, not just "truthy")
3. Are mocks appropriate? (mocked too much? too little?)
4. Is this test brittle? (would it break on a valid refactor that doesn't change behavior?)
5. What's the most important case that ISN'T tested?

Score the overall suite: 1 (fragile/incomplete) to 5 (production-grade)
```

**Best for:** Test review, TDD coaching, coverage quality
**Reliability:** ⭐⭐⭐⭐

---

## Prompt Anti-Patterns (What NOT to Do)

| Anti-Pattern | Why It Fails | Better Alternative |
|-------------|-------------|-------------------|
| "Improve this code" | No definition of "improve" | "Reduce cyclomatic complexity of [fn] while maintaining all tests passing" |
| "Make this secure" | Security is domain-specific | "Check for SQL injection and XSS vulnerabilities in [file]" |
| "You are a 10x engineer" | Persona without specifics adds noise | Describe the actual expertise needed |
| "Write tests for everything" | Scope is unbounded | "Write tests for [specific function] covering happy path and these 3 edge cases" |
| "Don't break anything" | Agent can't verify this without tests | "All existing tests in [test file] must continue passing" |
| "Do your best" | Ambiguous quality target | Define measurable success criteria |
| Long prompts with no structure | Buries the actual ask | Use bullet points, clear sections, numbered lists |

---

## Prompt Rating Key

After using any prompt, rate it:
- ⭐ — Failed: produced wrong or harmful output
- ⭐⭐ — Weak: needed major revision to be useful
- ⭐⭐⭐ — Acceptable: got me to 70% of the goal
- ⭐⭐⭐⭐ — Good: got me to 90%, minor tweaks needed
- ⭐⭐⭐⭐⭐ — Excellent: reliable, reusable, taught me something

**Track your ratings.** Prompts you rate ⭐⭐⭐⭐⭐ become your personal library. Share them with your team.

---

## Your Personal Prompt Library Template

Copy this section to `~/.claude/skills/my-prompt-library.md`:

```markdown
# My Prompt Library
_Last updated: [date]_

## Highly Reliable (⭐⭐⭐⭐⭐)

### [Task Name]
Context: [when to use]
Prompt:
\`\`\`
[full prompt text]
\`\`\`

## Notes
[What worked, what to watch for]
```

---

*Maintained by the CETI AI Engineering Training team.*
*Submit new prompts via PR to `docs/prompt-libraries/` in the course repo.*
