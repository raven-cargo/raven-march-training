# NotebookLM Multimedia Prompts

**Generated**: 2026-03-15 (Session 7 — parallel meta-prompting run)
**Method**: 6 parallel agents, each reading source module files and applying a 4-step meta-prompt extraction process
**Total**: 2,938 lines across 6 files

---

## What These Files Are

High-quality, module-specific focus prompts for NotebookLM multimedia generation. Each prompt was derived by:

1. **Reading** the source module markdown file
2. **Extracting** concepts unique to that module (not in adjacent modules)
3. **Identifying** whiteboard-visual structures and anchor analogies
4. **Writing** prompts with explicit exclusion clauses (preventing content bleed)

These prompts are substantially more precise than generic prompts — each is specific enough that swapping it into the wrong module's slot would be immediately detectable.

---

## Files

| File | Covers | Prompts | Lines |
|------|--------|---------|-------|
| `day1-modules-01-03-prompts.md` | Paradigm Shift · Foundations · Agent Thinking | 6 (3 video + 3 slides) | 1,019 |
| `day2a-modules-04-06-prompts.md` | Prompt Engineering · MCP Architecture · MCP Building | 6 (3 video + 3 slides) | 715 |
| `day2b-modules-07-09-prompts.md` | Skills & Commands · Meta-Prompting · Multi-Agent | 6 (3 video + 3 slides) | 623 |
| `day3-modules-10-12-prompts.md` | Security · Stack Adaptation · Capstone | 6 (3 video + 3 slides) | 279 |
| `audio-and-overview-prompts.md` | Deep-dive podcast + course overview deck | 2 | 98 |
| `flashcards-prompts.md` | Medium (M01–06) + Hard (M07–12) card sets | 2 | 204 |
| **Total** | | **28** | **2,938** |

---

## How to Use These Prompts

### Regenerate a single video

```python
mcp__notebooklm__video_overview_create(
    notebook_id="742e3671-5a55-4420-b2a2-5e960e241b2c",
    format="explainer",
    visual_style="whiteboard",
    language="en",
    focus_prompt="""[paste video focus prompt from the relevant file]""",
    confirm=True,
    source_ids=["[module source ID from ARTIFACT-URLS.md]"]
)
```

### Regenerate a slide deck

```python
mcp__notebooklm__slide_deck_create(
    notebook_id="742e3671-5a55-4420-b2a2-5e960e241b2c",
    format="detailed_deck",
    language="en",
    focus_prompt="""[paste slide deck focus prompt from the relevant file]""",
    confirm=True,
    source_ids=["[module source ID from ARTIFACT-URLS.md]"]
)
```

### Module source IDs (for `source_ids` pinning)

| Module | Source ID |
|--------|-----------|
| 01 | `(retrieve from notebook_get)` |
| 02 | `(retrieve from notebook_get)` |
| 03–12 | `(retrieve from notebook_get)` |

Run `mcp__notebooklm__notebook_get(notebook_id="742e3671-5a55-4420-b2a2-5e960e241b2c")` to get current source IDs.

---

## Accuracy Rules Baked Into All Prompts

These constraints are embedded in every prompt to prevent common confabulation errors:

| Rule | Correct value |
|------|--------------|
| MCP primitives | Exactly THREE: Tools, Resources, Prompts |
| Remote MCP transport | Streamable HTTP only (SSE deprecated 2025-03-26) |
| CLAUDE.md | Read at session start — never invoked as a slash command |
| `settings.json` format | `{"permissions": {"allow": [...], "deny": [...]}}` — deny overrides allow |
| TCEF / GCCF / PRAO | Course-proprietary frameworks — not external standards |
| `triggers` in skill YAML | LUXOR convention — NOT native Claude Code activation |
| CLI flags | No `--thinking` flag, no `--context` flag |

---

*Prompts produced by 6 parallel meta-prompting agents — Session 7, 2026-03-15*
*Source modules: `docs/curriculum/modules/01-*.md` through `12-*.md`*
