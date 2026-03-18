# Team: `course-builders`

**Default Working Team** — used for building, editing, and deploying lab content.

**Size**: 4 teammates + 1 lead (optimal for this project's parallelism profile)

## Roster

| Slot | Agent | Role in Team | Primary Responsibility |
|------|-------|--------------|------------------------|
| Lead | `tech-lead` | Team orchestrator | Task decomposition, plan approval, synthesis |
| Teammate 1 | `frontend-architect` | HTML/CSS specialist | Lab file structure, design system consistency |
| Teammate 2 | `practical-programmer` | JS correctness | Quiz logic, XP system, lab interactivity |
| Teammate 3 | `MERCURIO` | Content validator | Anti-confabulation, zero-tolerance accuracy checks |
| Teammate 4 | `deployment-orchestrator` | Vercel + CI | Deploy, routing, vercel.json, production checks |

## Trigger Conditions

Spawn this team when:
- Building a new lab file
- Refactoring multiple labs in parallel
- Running icon/emoji replacement across day folders
- Deploying to Vercel
- Writing or updating documentation
- Debugging broken links or missing files

## Spawn Prompt

```text
Create an agent team called "course-builders" with the following roster:
- Lead: tech-lead (task decomposition, plan approval, synthesis)
- Teammate 1: frontend-architect (HTML/CSS, lab file structure, design system)
- Teammate 2: practical-programmer (JS correctness, quiz logic, XP system)
- Teammate 3: MERCURIO (content validation, anti-confabulation)
- Teammate 4: deployment-orchestrator (Vercel deploy, routing, vercel.json)

File conflict rule: each teammate owns a distinct set of files.
- Day 1 labs → frontend-architect only
- Day 2 labs → frontend-architect only (separate instance)
- Day 3 labs → frontend-architect only (separate instance)
- index.html, module-viewer.html → Lead or dedicated singleton teammate

Require plan approval from lead before any teammate edits HTML files.
Approval criteria:
- Plan touches only assigned files
- Plan preserves existing JS interactivity
- Plan follows lab-framework/core.css + core.js conventions
- Plan introduces zero accuracy violations (see zero-tolerance rules in CLAUDE.md)
```

## Required Reading Before Module Work

**MANDATORY**: Before any teammate creates or modifies module content (files in `docs/curriculum/modules/`), they MUST read:

1. **`.claude/docs/CODING-ELEMENTS-SPEC.md`** -- All 22 component types, HTML rules, visual design, accessibility, agent trace timing
2. **`.claude/docs/CONTENT-SPEC.md`** -- Section structure, pedagogy (predict-before-explain, spiral learning), terminology (Agentic Loop vs PRAO), quiz standards (4+ questions, tricky question criteria), callout usage
3. **`.claude/docs/MODULE-CREATION-GUIDE.md`** -- Step-by-step guide with templates for hero sections, section structure, component selection, quiz writing, agent trace writing, and the pre-ship quality checklist

These docs consolidate ALL design decisions from Modules 01-03 feedback. Skipping them will produce modules that fail review.

## Best Practices

- One lab file per task -- clear deliverable (~100-150 lines)
- Do not combine multiple lab files into one task
- 5-6 tasks per teammate maximum per session
- Use `TeammateIdle` hook to enforce accuracy check before marking done
- For module work: run the pre-ship checklist in MODULE-CREATION-GUIDE.md before reporting task complete
