# Team: `course-reviewers`

**PR / Audit Team** — used for reviewing, auditing, and validating course content and code.

**Size**: 3 teammates + 1 lead (review tasks need focused, independent lenses)

## Roster

| Slot | Agent | Role in Team | Primary Responsibility |
|------|-------|--------------|------------------------|
| Lead | `software-architect` | Review coordinator | Synthesize findings, approve final output |
| Teammate 1 | `superpowers:code-reviewer` | Code review | HTML/CSS/JS quality, lab framework conventions |
| Teammate 2 | `MARS` | Architecture review | System-level structural correctness |
| Teammate 3 | `debug-detective` | Bug hunter | Broken links, missing files, JS errors, edge cases |

## Trigger Conditions

Spawn this team when:
- Running a content accuracy / anti-confabulation check
- Conducting a CSS or design system audit
- Reviewing JS logic (quiz logic, XP system, interactivity bugs)
- Performing a full PR review or audit
- Validating a feature branch before merge

## Spawn Prompt

```text
Create an agent team called "accuracy-audit" from the course-reviewers roster.
Spawn 3 reviewers for a parallel content accuracy audit:

- Reviewer 1 (superpowers:code-reviewer): Review all HTML files in labs/day1/
  for accuracy against the zero-tolerance rules:
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
Lead (software-architect) synthesizes into a single accuracy report at docs/validation-report.md.
```

## Module Review Criteria

When reviewing module content (files in `docs/curriculum/modules/`), reviewers MUST check against these specification documents:

1. **`.claude/docs/CODING-ELEMENTS-SPEC.md`** -- Verify:
   - No emojis (Lucide icons only)
   - No inline style colors (CSS custom properties only)
   - No blank lines inside nested HTML divs
   - No markdown syntax inside HTML blocks
   - All `ix-instruct` paragraphs present before interactives
   - Two-column traces (annotated, compare) have `data-default-mode="manual"`
   - All traces have `data-speed="0.5"` and meet minimum timing standards
   - Accessibility: `:focus-visible`, ARIA attributes, `prefers-reduced-motion`
   - All component types registered in `hydrateInteractiveDiagrams()`

2. **`.claude/docs/CONTENT-SPEC.md`** -- Verify:
   - Section structure: objective FIRST, then brief intro, then instruct, then interactive, then collapsed prose
   - Predict-reveal elements come BEFORE explanations (not after)
   - No text gives away predict-reveal answers
   - Spiral learning: references previous modules, does not re-explain
   - Quiz standards: minimum 4 questions, at least 1 tricky, reference material visible
   - Terminology: "Agentic Loop (PRAO)" not "PRAO Loop"
   - Content accuracy: zero-tolerance rules (no --thinking, no SSE, etc.)
   - Content density: no >3-4 line prose blocks outside collapsed sections
   - Callouts: maximum 2 per section, no more than 2 stacked

3. **`.claude/docs/MODULE-CREATION-GUIDE.md`** -- Use the pre-ship checklist as the review gate

## Best Practices

- Assign each reviewer to a distinct day folder (day1 / day2 / day3) to prevent duplicate findings
- For module reviews: assign each reviewer to a distinct module file
- Reviewers share findings via team messaging before lead synthesizes
- Lead does not approve output until all three reviewers have reported
- Final report goes to `docs/validation-report.md`
- Reviewers must cite the specific spec rule for each finding (e.g., "CONTENT-SPEC: predict-before-explain rule violated at line 245")
