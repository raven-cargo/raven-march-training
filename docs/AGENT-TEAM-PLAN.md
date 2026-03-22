# Agent Team Plan — Agentic AI Course

**Version**: 1.0
**Date**: 2026-03-16
**Project**: https://agentic-ai-course-hazel.vercel.app/
**Status**: Ready for activation

---

## 1. What Agent Teams Enable (from Official Docs)

Agent teams (Claude Code v2.1.32+, experimental) let you coordinate multiple Claude Code sessions working together on a shared task list. Key distinctions vs. subagents:

| Feature | Subagents | Agent Teams |
|---------|-----------|-------------|
| Context | Own window; result returns to caller | Own window; fully independent |
| Communication | Report back to main agent only | Teammates message each other directly |
| Coordination | Main agent controls all work | Shared task list with self-coordination |
| Best for | Focused tasks where only result matters | Complex work needing discussion + collaboration |
| Token cost | Lower | Higher (each teammate = full Claude instance) |

**Best use cases** for this project:
- Parallel HTML lab file edits (each teammate owns separate files — no conflicts)
- Cross-layer validation (HTML structure + CSS consistency + JS logic simultaneously)
- Content accuracy review with competing perspectives (anti-confabulation enforcement)
- Parallel deployment checks (build + lint + Vercel deploy)

**Enable with** (add to `.claude/settings.json`):
```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

Team config is stored at: `~/.claude/teams/{team-name}/config.json`
Task list at: `~/.claude/tasks/{team-name}/`

---

## 2. Recommended Team Roster

### Team: `course-builders` (Default Working Team)

**Size**: 4 teammates + 1 lead (optimal for this project's parallelism profile)

| Slot | Agent | Role in Team | Primary Responsibility |
|------|-------|--------------|------------------------|
| Lead | `tech-lead` | Team orchestrator | Task decomposition, plan approval, synthesis |
| Teammate 1 | `frontend-architect` | HTML/CSS specialist | Lab file structure, design system consistency |
| Teammate 2 | `practical-programmer` | JS correctness | Quiz logic, XP system, lab interactivity |
| Teammate 3 | `MERCURIO` | Content validator | Anti-confabulation, zero-tolerance accuracy checks |
| Teammate 4 | `deployment-orchestrator` | Vercel + CI | Deploy, routing, vercel.json, production checks |

### Team: `course-reviewers` (PR / Audit Team)

**Size**: 3 teammates + 1 lead (review tasks need focused, independent lenses)

| Slot | Agent | Role in Team | Primary Responsibility |
|------|-------|--------------|------------------------|
| Lead | `software-architect` | Review coordinator | Synthesize findings, approve final output |
| Teammate 1 | `superpowers:code-reviewer` | Code review | HTML/CSS/JS quality, lab framework conventions |
| Teammate 2 | `MARS` | Architecture review | System-level structural correctness |
| Teammate 3 | `debug-detective` | Bug hunter | Broken links, missing files, JS errors, edge cases |

### Team: `course-researchers` (Deep Research / Content Team)

**Size**: 2 teammates + 1 lead (research tasks run long; keep small)

| Slot | Agent | Role in Team | Primary Responsibility |
|------|-------|--------------|------------------------|
| Lead | `tech-lead` | Research coordinator | Frame questions, synthesize findings into docs |
| Teammate 1 | `deep-researcher` | Technical research | Claude Code API facts, MCP spec, SDK accuracy |
| Teammate 2 | `MERCURIO` | Confabulation filter | Validate research findings before they enter content |

---

## 3. Task-to-Agent Routing Matrix

### Meta-prompting map: F(Task Type) → Agent Assignment

| Task Type | Trigger Keywords | Lead Agent | Teammate(s) | Team Name |
|-----------|-----------------|------------|-------------|-----------|
| **Build new lab file** | "create lab", "new lab", "build lab-0X" | `tech-lead` | `frontend-architect`, `practical-programmer` | `course-builders` |
| **Refactor multiple labs** | "refactor labs", "update all labs", "replace icons" | `tech-lead` | `frontend-architect` x3 (one per day) | `course-builders` |
| **CSS/design system audit** | "design consistency", "design system", "CSS audit" | `tech-lead` | `frontend-architect`, `superpowers:code-reviewer` | `course-reviewers` |
| **JS logic review** | "quiz logic", "XP system", "JS bug", "interactivity" | `software-architect` | `practical-programmer`, `debug-detective` | `course-reviewers` |
| **Content accuracy check** | "accuracy", "validate content", "anti-confabulation" | `software-architect` | `MERCURIO`, `MARS` | `course-reviewers` |
| **Deploy to Vercel** | "deploy", "production", "vercel.json", "routing" | `tech-lead` | `deployment-orchestrator` | `course-builders` |
| **Deep research** | "research", "verify spec", "Claude Code docs" | `tech-lead` | `deep-researcher`, `MERCURIO` | `course-researchers` |
| **Full PR review** | "review PR", "review all changes", "audit" | `software-architect` | `superpowers:code-reviewer`, `MARS`, `debug-detective` | `course-reviewers` |
| **Documentation** | "write docs", "update progress.md", "spec" | `tech-lead` | `docs-generator`, `MERCURIO` | `course-builders` |
| **Debugging** | "broken", "404", "not found", "error" | `tech-lead` | `debug-detective`, `practical-programmer` | `course-builders` |
| **Icon replacement** | "emoji", "icon", "lucide", "replace icons" | `tech-lead` | `frontend-architect` x3 (parallel by file set) | `course-builders` |
| **General one-off** | anything else | general-purpose | — | none (subagent) |

### Decision Rule

```
If task spans >= 3 files AND tasks are independent → use agent team
If task is sequential or single-file → use subagent (Task tool)
If task requires cross-agent debate (content accuracy) → use course-reviewers team
If task is a quick lookup or single action → general-purpose inline
```

---

## 4. Spawn Prompts for Common Workflows

### 4a. Parallel Icon/Emoji Replacement (Current Priority)

```text
Create an agent team called "icon-replacement" from the course-builders roster.
The goal is to replace emojis with Lucide SVG icons across all lab HTML files.

Spawn 3 frontend-architect teammates:
- Teammate 1 owns: labs/day1/ (lab-02, lab-03)
- Teammate 2 owns: labs/day2/ (lab-04, lab-06)
- Teammate 3 owns: labs/day3/ (lab-07, lab-08, lab-09)

Each teammate should:
1. Read ICON-PLAN.md at docs/ICON-PLAN.md for the full plan
2. Replace semantic emojis with Lucide SVG icons per the plan
3. Remove decorative emojis from HTML
4. Leave JS-only emoji strings untouched
5. Validate HTML still renders (no broken structure)
6. Report completion with a summary of changes

Require plan approval from lead before any teammate makes file edits.
Only approve plans that touch only their assigned files.
```

### 4b. Content Accuracy Review (Anti-Confabulation)

```text
Create an agent team called "accuracy-audit" from the course-reviewers roster.
Spawn 3 reviewers for a parallel content accuracy audit:

- Reviewer 1 (superpowers:code-reviewer): Review all HTML files in labs/day1/
  for accuracy against these zero-tolerance rules:
  1. No --thinking flag (not a Claude Code CLI flag)
  2. No --context flag (doesn't exist)
  3. No /memory command (not native Claude Code)
  4. Exactly THREE MCP primitives: Tools, Resources, Prompts
  5. SSE deprecated 2025-03-26 — remote MCP = Streamable HTTP only
  6. settings.json: {"permissions": {"allow": [...], "deny": [...]}}
  7. CLAUDE.md: read at session start, never invoked as slash command

- Reviewer 2 (MARS): Review labs/day2/ with the same accuracy rules.

- Reviewer 3 (debug-detective): Review labs/day3/ with the same accuracy rules,
  plus check for broken file references and missing lab files.

Have reviewers share findings with each other to avoid duplicate reports.
Lead synthesizes into a single accuracy report at docs/validation-report.md.
```

### 4c. Full Deploy Pipeline

```text
Create a small agent team for the deploy pipeline. Spawn 2 teammates:

- Teammate 1 (practical-programmer): Run pre-deploy checks:
  * Validate all HTML files have correct lab-framework references
  * Check vercel.json routing is correct for all lab paths
  * Confirm no broken relative links

- Teammate 2 (deployment-orchestrator): Execute deployment after Teammate 1 reports green:
  * cd /Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course
  * npx vercel deploy --prod --yes --scope manu-mulaveesalas-projects
  * Report the deployed URL

Lead waits for Teammate 1 to complete before Teammate 2 begins.
```

---

## 5. CLAUDE.md Additions (Recommended)

Add the following section to `.claude/CLAUDE.md` to activate team routing for this project:

```markdown
## Agent Team Routing

Enable agent teams in settings.json:
```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

### Team Roster Quick Reference

| Team Name | Use When | Lead | Size |
|-----------|----------|------|------|
| `course-builders` | Building, editing, deploying | `tech-lead` | 4+1 |
| `course-reviewers` | Auditing, reviewing, validating | `software-architect` | 3+1 |
| `course-researchers` | Research, fact-checking | `tech-lead` | 2+1 |

### Task Routing Rule
- >= 3 independent files to edit → spawn `course-builders` team
- Content accuracy check → spawn `course-reviewers` team
- Spec verification needed → spawn `course-researchers` team
- Single file / sequential task → use subagent (Task tool), not a team

### Zero-Tolerance Accuracy Rules (enforce in all teams)
All teammates must refuse to generate content containing:
1. `--thinking` flag (not a real Claude Code CLI flag)
2. `--context` flag (doesn't exist)
3. `/memory` command (not native Claude Code)
4. SSE for remote MCP (deprecated 2025-03-26; use Streamable HTTP)
5. Any MCP primitive count other than THREE (Tools, Resources, Prompts)
```

---

## 6. settings.json Config

Add to `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/.claude/settings.json`:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  },
  "teammateMode": "in-process"
}
```

Note: Use `"tmux"` instead of `"in-process"` if running inside a tmux session for split-pane visibility.

---

## 7. Best Practices for This Project

### File Conflict Prevention
Each teammate must own a distinct set of files. For lab work:
- Day 1 files → Teammate A only
- Day 2 files → Teammate B only
- Day 3 files → Teammate C only
- `index.html`, `module-viewer.html` → Lead or dedicated singleton teammate

### Task Sizing for Labs
- One lab file per task (good size — clear deliverable, ~100-150 lines)
- Do not combine multiple lab files into one task
- 5-6 tasks per teammate maximum per session

### Plan Approval for Risky Edits
Always require plan approval before teammates modify HTML files. Approval criteria for lead:
- Plan touches only assigned files
- Plan preserves existing JS interactivity
- Plan follows lab-framework/core.css + core.js conventions
- Plan does not introduce any of the zero-tolerance accuracy violations

### Content Validation Hook
Use `TeammateIdle` hook to enforce accuracy check before any teammate goes idle after writing content. Exit code 2 forces the teammate to re-validate against the zero-tolerance rules before marking done.

### Recommended Team Size
- Icon replacement: 3 teammates (one per day folder)
- Content review: 3 teammates (one per day folder)
- Deploy pipeline: 2 teammates (pre-check + deploy)
- Research: 2 teammates (researcher + validator)

---

## 8. Limitations to Know

| Limitation | Impact on This Project | Mitigation |
|-----------|----------------------|------------|
| No session resumption with in-process teammates | If session interrupts, teammates are lost | Always run full workflows in a single uninterrupted session |
| Task status can lag | A completed lab edit may not auto-unblock dependencies | Check teammate output manually; tell lead to nudge |
| One team per lead session | Can't run builders + reviewers simultaneously | Run builders first, then start a new review session |
| No nested teams | Teammates can't spawn sub-reviewers | Keep team structure flat; lead handles coordination |
| Permissions set at spawn | All teammates inherit lead's permissions | Set lead permissions correctly before spawning |

---

## 9. Prerequisites

```bash
# Verify Claude Code version (must be >= 2.1.32)
claude --version

# Enable agent teams
# Add to .claude/settings.json:
# { "env": { "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1" } }

# For split-pane mode (optional but helpful for lab work)
which tmux  # or use iTerm2 with it2 CLI
```

---

*Generated 2026-03-16 based on official Claude Code Agent Teams documentation (https://docs.anthropic.com/en/docs/claude-code/agent-teams) and agentic-ai-course project context.*
