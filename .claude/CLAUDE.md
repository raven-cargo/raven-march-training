# Agentic AI Engineering Course — Project Context

**Live site**: https://agentic-ai-course-hazel.vercel.app/
**Project root**: `/Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course/`

## ⚡ Always Read First

Before any work on this project, read these two files for current state and plan:

- **`progress.md`** — inventory of everything built, what's complete, what's missing
- **`next.md`** — prioritized task plan with exact file paths and execution steps
- **`decisions.md`** — durable implementation decisions and renderer rules that should persist across sessions

## Baseline Awareness

- Fix shared interaction patterns in the renderer or shared CSS first. Do not patch quiz, prompt, or feedback bugs one question at a time when the issue is systemic.
- Quiz explanations should contain explanation body copy only. Do not rely on hardcoded `Correct answer:` prefixes in markdown; the viewer must label `Correct.` vs `Not quite.` from runtime state.
- For the Raven extracted course, keep branding, theme, and interactive affordances centralized in shared viewer/CSS logic rather than hardcoded per module or per lab.
- For Raven file intake, prefer direct storage uploads plus shared file-block renderers over base64-through-function uploads or raw link lists. Large artifacts such as `.mp4` should be treated as first-class course assets.
- Treat the Raven environment as a student portal first. Navigation, copy, density, labels, actions, and page structure should optimize for student clarity and long-term course access, not internal planning language, operator workflows, or implementation detail.
- Student-facing titles must be carefully constructed. Prefer the simplest clear course label over implementation-heavy wording. Example: use `Learning Path`, not `Chronological Learning Path`. Keep this rule aligned with `decisions.md`.
- For Raven schedule/order disputes, follow the approved Raven delivery flow recorded in `decisions.md`, not stale extracted numbering and not any temporarily incorrect upstream webpage. Current live order: Day 1 M01/L01, M02/L02, M03/L03, M04/L04; Day 2 M05/L05, M06+M07/L06, M08/L07, M09/L08+L09.
- At session start, infer the current core task from the user's latest request plus `progress.md`, `next.md`, and `decisions.md`. Use that same distilled task statement when briefing subagents so orchestration stays aligned.
- During tight UI/debug loops, redeploy after each major shared-pattern change and report the live check point immediately so review can happen before more context accumulates.

## Key File Locations

| What | Where |
|------|-------|
| Labs (9 HTML files) | `labs/day1/`, `labs/day2/`, `labs/day3/` |
| Modules (12 markdown) | `docs/curriculum/modules/` |
| Module viewer (V2, gamified) | `module-viewer.html` |
| Dashboard | `index.html` |
| Vercel routing | `vercel.json` |
| Lab framework | `lab-framework/core.css`, `core.js`, `build.js` |
| Validation report | `docs/validation-report.md` |
| Citations audit | `docs/meta/framework-architecture/CITATIONS-AUDIT.md` |
| Meta docs | `docs/meta/` |

## COURSEWARE Skill System

The abstraction layer for building new courses lives at a **different location**:
`/Users/manu/Documents/LUXOR/COURSEWARE/`

Load `COURSEWARE/CLAUDE.md` for the full skill/command/agent inventory.

## Deploy Command

```bash
cd /Users/manu/Documents/LUXOR/PROJECTS/agentic-ai-course
npx vercel deploy --prod --yes --scope manu-mulaveesalas-projects
```

## Module Development

**CRITICAL**: Before creating or modifying ANY module content, read all three spec docs:

1. **[CODING-ELEMENTS-SPEC.md](.claude/docs/CODING-ELEMENTS-SPEC.md)** -- HTML/CSS/JS component rules, all 22 component types, visual design, accessibility
2. **[CONTENT-SPEC.md](.claude/docs/CONTENT-SPEC.md)** -- Course content structure, pedagogy, terminology, quiz standards, callout usage
3. **[MODULE-CREATION-GUIDE.md](.claude/docs/MODULE-CREATION-GUIDE.md)** -- Step-by-step guide for creating modules 04-12 at Module 02 quality

These three documents are the single source of truth for all module work. They consolidate every decision, requirement, and pattern from the feedback sprints, UI reviews, and design iterations on Modules 01-03.

### Quick Reference

| Task | Read This |
|------|-----------|
| Writing HTML components | CODING-ELEMENTS-SPEC.md |
| Structuring sections, writing quizzes, using terminology | CONTENT-SPEC.md |
| Building a new module from scratch | MODULE-CREATION-GUIDE.md (references the other two) |
| Reviewing a module for quality | All three -- use the checklists |

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

### Task-to-Agent Routing Matrix

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
| **General one-off** | anything else | `general-purpose` | — | none (subagent) |

### Task Routing Rule
- >= 3 independent files to edit → spawn `course-builders` team
- Content accuracy check → spawn `course-reviewers` team
- Spec verification needed → spawn `course-researchers` team
- Single file / sequential task → use subagent (Task tool), not a team

### Spawn Prompts for Common Workflows

**Parallel Icon/Emoji Replacement:**
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

**Content Accuracy Review (Anti-Confabulation):**
```text
Create an agent team called "accuracy-audit" from the course-reviewers roster.
Spawn 3 reviewers for a parallel content accuracy audit:

- Reviewer 1 (superpowers:code-reviewer): Review all HTML files in labs/day1/
  for accuracy against the zero-tolerance rules in CLAUDE.md.

- Reviewer 2 (MARS): Review labs/day2/ with the same accuracy rules.

- Reviewer 3 (debug-detective): Review labs/day3/ with the same accuracy rules,
  plus check for broken file references and missing lab files.

Have reviewers share findings with each other to avoid duplicate reports.
Lead synthesizes into a single accuracy report at docs/validation-report.md.
```

**Full Deploy Pipeline:**
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

### Zero-Tolerance Accuracy Rules (enforce in all teams)
All teammates must refuse to generate content containing:
1. `--thinking` flag (not a real Claude Code CLI flag)
2. `--context` flag (doesn't exist)
3. `/memory` command (not native Claude Code)
4. SSE for remote MCP (deprecated 2025-03-26; use Streamable HTTP)
5. Any MCP primitive count other than THREE (Tools, Resources, Prompts)

---

## Content Accuracy Rules (zero tolerance)

1. No `--thinking` flag (not a Claude Code CLI flag)
2. No `--context` flag (doesn't exist)
3. No `/memory` command (not native Claude Code)
4. SSE deprecated 2025-03-26 — remote MCP = Streamable HTTP only
5. Exactly THREE MCP primitives: Tools, Resources, Prompts
6. `settings.json`: `{"permissions": {"allow": [...], "deny": [...]}}`
7. CLAUDE.md: read at session start, never invoked as a slash command
8. `triggers` in skill YAML: LUXOR convention, not native Claude Code activation
