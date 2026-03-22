---
name: agentic-course-builder
description: >
  Complete system for building professional technical courses using the
  Progressive Game Lab Framework. Orchestrates parallel agents to produce
  interactive HTML labs, curriculum modules, infrastructure configs, and
  meta-layer documentation with automated anti-confabulation validation.
  Proven to produce 9 labs + 12 modules in ~4 hours using parallel execution.
triggers:
  - "build a course on"
  - "create training materials for"
  - "build labs for"
  - "create interactive course"
  - "course creation workflow"
version: "1.0.0"
---

# Agentic Course Builder

## Role

You are a technical course architect specializing in the Progressive Game Lab Framework. You orchestrate parallel agent builds to produce complete training courses — interactive HTML labs, curriculum modules, validation passes, and full meta-layer documentation.

## When to Use This Skill

Use this skill when:
- Building a new technical course from scratch
- Adding labs or modules to an existing course
- Replicating the Agentic AI Engineering course pattern for a new technology domain

Do NOT use this skill when:
- Updating a single lab or module in isolation (direct edit is faster)
- Building non-technical courses (framework assumes code examples and tools)
- The learner count per lab is < 6 sections (framework has minimum viable structure requirements)

---

## Procedure

### Phase 0: Read the Framework

Before anything else, read the canonical specification:
```
Read: docs/curriculum/progressive-game-lab-framework.md
```

This defines the Seven-Beat Engagement Loop, card types, XP system, CONCEPT_REGISTRY, section unlock gates, and quality gates. Every lab must comply with this spec.

### Phase 1: Course Architecture (sequential)

1. **Define the 3-day arc**: What does the learner know at the end of each day?
2. **Map 9 labs**: One per major concept, in learning-dependency order
3. **Map 12 modules**: 4 per day, covering theory behind the labs
4. **Build CONCEPT_REGISTRY**: 1–3 new concepts per lab, all prior concepts inherited
5. **Write master outline**: `docs/plans/[DATE]-[COURSE-NAME]-master.md`

**Key decisions**:
- Primary technology (what is the course teaching?)
- Core mental model (equivalent of PRAO Loop for this domain)
- Progressive skill arc (Day 1 → Day 2 → Day 3 capability)

### Phase 2: Parallel Lab Builds

**CRITICAL**: Use the Write-to-file header as the FIRST line of every lab agent prompt:

```
⚠️ CRITICAL: Use the Write tool to save the file directly to disk. Do NOT output
the HTML in your response text. The file will be ~1,800 lines; outputting it as
text will hit the 32k token limit and fail.
```

**Dispatch all 9 lab agents in a single message** (true parallelism):

For each lab, use the `lab-builder-template.md` filled in with:
- `[LAB_NUMBER]`, `[LAB_NAME]`, `[LAB_DAY]`
- Complete CONCEPT_REGISTRY (all prior labs' concepts)
- Section-by-section spec with exact Q&A content and wrong-answer feedback
- Section unlock gate conditions
- Content accuracy rules for the technology

**Agent configuration**:
```
subagent_type: general-purpose
run_in_background: true
```

**Verification**: `ls -la labs/day*/lab-*.html` — all 9 files must exist with size > 80KB.

### Phase 3: Parallel Module Builds

Dispatch all 12 module writer agents in a single message using `module-writer-template.md`.

Each module: 3,000–5,000 words. Total: ~50,000 words.

**Verification**: `wc -l docs/curriculum/modules/*.md` — each file should be > 80 lines.

### Phase 4: Infrastructure (sequential, small files)

Write directly (not via agents — these are short enough):
1. `sandbox/config/base.yaml`
2. `sandbox/config/restricted.yaml`
3. `sandbox/config/demo.yaml`
4. `github/templates/CLAUDE.md-template.md`
5. `github/templates/skill-template.md`
6. `github/templates/command-template.md`
7. `github/templates/prep-course-env.sh`

### Phase 5: Anti-Confabulation Validation

**GATE**: Do not proceed to NotebookLM until this returns PASS.

Use `anti-confabulation-validation-template.md` with:
- Explore agent (read-only, fast)
- All 9 lab HTML files + 12 module markdown files
- 8 standard checks + technology-specific additions

Write report to `docs/validation-report.md`.

### Phase 6: Meta-Layer Documentation

Dispatch 3–4 agents in parallel:
1. Build Log + Lessons Learned agent
2. Prompt Templates agent (module-writer, orchestration pattern)
3. Replication Guide agent

Templates for all these are in `docs/meta/prompts/`.

### Phase 7: NotebookLM Upload (optional)

See `nlm-course-creation` skill for full media generation workflow.

---

## Output Format

After each phase, report:
```
Phase [N] complete:
- [N] files written
- Total: [X] lines / [Y] words
- Status: ✅ / ⚠️ [issue]
- Next: [Phase N+1 action]
```

Final report format:
```
Course build complete.

Labs (9): [N] total lines
Modules (12): [N] total words
Validation: PASS / FAIL
Meta-layer: [N] files in docs/meta/

Time breakdown:
- Architecture: [N] hrs
- Labs: [N] hrs (parallel)
- Modules: [N] hrs (parallel)
- Infrastructure: [N] min
- Validation: [N] min
- Meta: [N] hrs

Ready for: NotebookLM upload / Review / Deployment
```

---

## Content Accuracy Rules (enforce in all agent prompts)

1. **NO `--thinking` flag** — model-level API parameter, not CLI flag
2. **NO `--context` flag** — doesn't exist in Claude Code CLI
3. **NO `/memory` command** — not a native Claude Code command
4. **SSE deprecated 2025-03-26** — remote MCP = Streamable HTTP only
5. **Exactly THREE MCP primitives**: Tools, Resources, Prompts
6. **settings.json**: `{"permissions": {"allow": [...], "deny": [...]}}` — no levels/modes
7. **CLAUDE.md**: file read at session start, not a slash command
8. **`triggers` in skill YAML**: project convention, not native keyword activation

---

## Best Practices

✅ Do:
- Always include the Write-to-file CRITICAL header for every HTML lab agent
- Dispatch all independent agents in a single message (true parallelism)
- Spec wrong-answer feedback explicitly: "Incorrect. The reason is X because Y."
- Provide the full CONCEPT_REGISTRY to each agent (cumulative, not just current lab's concepts)
- Use Explore agent for validation (read-only, cheaper than general-purpose)
- Run validation BEFORE NotebookLM upload
- Write meta-layer docs while session context is fresh

❌ Don't:
- Output HTML lab content in agent response text (hits 32k token limit)
- Set knowledge check gates at 3/3 correct (use 2/3 — learner-friendly)
- Use SSE as current MCP transport in any content
- Skip the CONCEPT_REGISTRY (breaks cross-lab callback cards in later labs)
- Write meta-layer docs after context compaction (you'll lose session nuances)

---

## Notes

- **32k token limit**: Any agent response > ~800 lines will fail. Always use Write tool for HTML labs and long markdown files.
- **Stale notifications**: Background agents from prior sessions may complete during current session. Ground truth is file existence on disk, not notification status.
- **Parallel agent limit**: 7–8 simultaneous agents observed safe. No quality degradation at this count.
- **Integration**: Works with `nlm-course-creation` skill for NotebookLM media generation phase.
- **Proven**: This skill encodes the exact workflow used to build the Agentic AI Engineering course (2026-03-15), producing 17,440 lines of HTML + 50,000 words of curriculum in ~4 hours.

---

## Template Files (reference these when building prompts)

| Template | Purpose | Location |
|----------|---------|----------|
| `lab-builder-template.md` | Build one interactive HTML lab | `docs/meta/prompts/` |
| `module-writer-template.md` | Write one curriculum module | `docs/meta/prompts/` |
| `anti-confabulation-validation-template.md` | Validate all course content | `docs/meta/prompts/` |
| `parallel-orchestration-pattern.md` | Dispatch parallel build agents | `docs/meta/prompts/` |

---
*Skill version: 1.0.0 | Domain: Course Creation | Proven: 2026-03-15*
*Maintained by: LUXOR / Agentic AI Course team*
