# Second-Pass Review: Modules 01–03
## Independent Quality & Accuracy Audit

**Reviewer**: MERCURIO (second-pass, independent)
**Date**: 2026-03-16
**Scope**: `docs/curriculum/modules/01-paradigm-shift.md`, `02-claude-code-foundations.md`, `03-agent-thinking.md`
**Method**: Coherence, terminology, engagement, factual accuracy, UX opportunities

---

## Executive Summary

Modules 01–03 form a strong conceptual foundation. The prose is professional, clear, and appropriately opinionated for a senior engineering audience. The PRAO framework is well-introduced and consistently threaded. However, this review surfaces **14 defects** across five categories, including **3 factual issues** that should be corrected before the next deployment.

| Severity | Count | Category |
|----------|-------|----------|
| 🔴 CRITICAL | 3 | Factual accuracy |
| 🟠 HIGH | 4 | Coherence & progression |
| 🟡 MEDIUM | 4 | Terminology & consistency |
| 🔵 LOW | 3 | Engagement & UX |

---

## 🔴 CRITICAL — Factual Accuracy

### C1. Extended thinking described inaccurately (Module 03, lines 263–269)

**Current text** (03, §3.5):
> "Extended thinking is an API-level parameter that, when enabled, causes the model to produce an explicit reasoning trace..."
> "It is not a CLI flag. You enable it through API-level configuration or through specific tooling built on top of the Claude API."

**Problem**: This is technically correct but misleadingly incomplete for a Claude Code course. In Claude Code, extended thinking is **automatic** — the model decides when to use it based on task complexity. Users don't manually enable it via an API parameter; Claude Code's runtime manages this. The text implies learners would need to configure an API parameter, which is not how they'll encounter it.

Additionally, the text never mentions which models support extended thinking (Claude 3.5 Sonnet does not; Claude 3.7 Sonnet and Claude 4 Sonnet/Opus do). The master outline (line 203) correctly notes "Claude 3.7 Sonnet with extended thinking API parameter, or Sonnet 4 series" — but Module 03 omits model specificity entirely.

**Recommended edit** (03, lines 263–269):
```markdown
Extended thinking is a model capability available in Claude 3.7 Sonnet and later
models (including the Claude 4 series). When enabled, the model produces an
explicit reasoning trace — sometimes called a "scratchpad" — before generating
its response. In Claude Code, extended thinking is managed automatically by the
runtime based on task complexity — you don't need to configure it manually.
The model decides when a problem warrants extended deliberation. When using the
Claude API directly, extended thinking is controlled via the `thinking` parameter
with a specified `budget_tokens` allocation.
```

**Citation**: https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking

---

### C2. CLAUDE.md hierarchy is incomplete (Module 02, lines 119–126)

**Current text** (02, §2.2):
> "Claude Code recognizes two CLAUDE.md files, applied in layers:
> Global CLAUDE.md at `~/.claude/CLAUDE.md`...
> Project CLAUDE.md at `.claude/CLAUDE.md`..."

**Problem**: Claude Code actually recognizes **three** levels of CLAUDE.md:
1. **Global**: `~/.claude/CLAUDE.md` — applies everywhere
2. **Project root**: `CLAUDE.md` in the repository root (git-committed, shared with team)
3. **Project local**: `.claude/CLAUDE.md` — gitignored by convention, personal overrides

The module conflates the project-root and project-local files into one. This matters operationally because the root-level `CLAUDE.md` is the team-shared file (checked into git), while `.claude/CLAUDE.md` is for personal/local overrides. Teaching only two levels will cause confusion when learners encounter three in practice.

**Recommended edit** (02, replace lines 119–126):
```markdown
### The Hierarchy: Global, Project, and Local

Claude Code recognizes CLAUDE.md files at three levels, applied in layers:

**Global CLAUDE.md** at `~/.claude/CLAUDE.md` applies to every session, regardless
of project. Put cross-project preferences here: your preferred style, global
constraints, personal conventions.

**Project CLAUDE.md** at `CLAUDE.md` in your repository root applies to everyone
working on this project. This is checked into git and shared with the team.
Put architecture overviews, coding conventions, and team constraints here.

**Local CLAUDE.md** at `.claude/CLAUDE.md` within your project directory applies
only to you, for this project. By convention, `.claude/` is gitignored, making
this the place for personal overrides and local-only context.

The agent sees all three. They stack — local augments project, which augments
global. When entries conflict, the more specific level takes precedence.
```

**Citation**: https://docs.anthropic.com/en/docs/claude-code/memory — "CLAUDE.md files can exist at multiple levels"

---

### C3. MCP config example uses incorrect/outdated field names (Module 02, lines 360–383)

**Current text** (02, §2.4):
```json
{
  "mcpServers": {
    "linear": {
      "url": "https://mcp.linear.app/sse",
      "type": "http",
      "headers": {
        "Authorization": "Bearer ${LINEAR_API_KEY}"
      }
    }
  }
}
```

**Problems**:
1. The URL `https://mcp.linear.app/sse` uses the deprecated SSE endpoint — contradicting the module's own statement on line 356 that "SSE is deprecated." The URL should use the Streamable HTTP endpoint.
2. The field `"type": "http"` — Claude Code settings.json does not use a `type` field for MCP servers. For stdio servers, you specify `command` + `args`. For remote servers, you specify `url`. The transport is inferred from the configuration shape, not an explicit type field.
3. The `"headers"` field structure should be verified against current Claude Code MCP configuration syntax.

**Recommended edit** (02, replace the linear server block):
```json
"linear": {
  "url": "https://mcp.linear.app/mcp",
  "headers": {
    "Authorization": "Bearer ${LINEAR_API_KEY}"
  }
}
```

And remove the line (02, line 389):
> `"type" is either "stdio" or "http"`

Replace with:
> The transport is determined by the configuration shape: servers with `command` and `args` use stdio; servers with `url` use Streamable HTTP.

Also remove `"type": "stdio"` from the filesystem-extended and postgres examples (lines 365–373).

**Citation**: https://docs.anthropic.com/en/docs/claude-code/mcp-servers

---

## 🟠 HIGH — Coherence & Curriculum Progression

### H1. Module 03 still has NotebookLM banner (line 4)

**Current text** (03, line 4):
> `**Source document for NotebookLM. Use to generate: video scripts, slide decks, podcasts, and flashcards.**`

**Problem**: Session 8 notes in `progress.md` (line 109) state this banner was removed from Modules 01 and 02, but it **remains in Module 03**. This is a production artifact that should not be visible to learners in the module viewer.

**Recommended edit**: Delete line 4 of `03-agent-thinking.md`.

---

### H2. Module 04 references "GCCF" but Module 02 never introduces it

**Current text** (04, line 12):
> "Module 03 introduced the GCCF pattern (Goal + Context + Constraints + Format) as a foundation for structured prompting."

**Problem**: Module 03 (`03-agent-thinking.md`) does **not** introduce GCCF anywhere. Module 02 (§1.4) describes a productive pattern with "Specific goal, Rich context, Explicit constraints, Monitor, Verify, Close the loop" — but never names it GCCF. The GCCF acronym appears to be introduced only in Lab 02. This creates a broken reference chain: Module 04 claims Module 03 taught it, but no module does.

**Recommended fix (two options)**:
- **Option A**: Add a brief named introduction of GCCF in Module 02 §2.5 or Module 03, creating the reference Module 04 expects.
- **Option B**: Change Module 04 line 12 to: "Module 02 introduced a structured approach to prompting — goal, context, constraints, and format — as a foundation. This module formalizes that into the TCEF pattern..."

**Local ref**: `02-claude-code-foundations.md` lines 210–217, `04-prompt-engineering-depth.md` line 12

---

### H3. "Three eras" timeline dates are imprecise (Module 01, line 29)

**Current text** (01, §1.1 diagram):
> Era 1 Autocomplete 2021–2022 / Era 2 Assistant 2023–2024 / Era 3 Agent 2025+

**Problem**: GitHub Copilot technical preview was June 2021, GA June 2022. ChatGPT launched November 2022 (not 2023). Claude Code launched as research preview in early 2025. The dates are compressed and the "2023–2024" for Assistant era is misleading — ChatGPT defined this era starting November 2022.

**Recommended edit**: Adjust to:
- Era 1: 2021–2022 ✅ (fine)
- Era 2: 2022–2024 (ChatGPT launched Nov 2022)
- Era 3: 2025+ ✅ (fine)

Or soften the labels to "~2021", "~2023", "~2025" to signal approximation.

---

### H4. Module 01→02→03 progression has a redundancy gap

**Observation**: Module 01 §1.3 ("What Claude Code Actually Is") covers CLAUDE.md, session context, and tool calls. Module 02 §2.2 covers CLAUDE.md again in greater depth. This is intentional scaffolding — but the Module 01 treatment (lines 153–183) is substantial enough that it partially pre-empts Module 02's "aha moment."

**Recommended edit**: In Module 01 §1.3, trim the CLAUDE.md and session-vs-persistent context sections to ~3 sentences each, with an explicit forward reference: "Module 02 covers CLAUDE.md configuration in depth. For now, the key fact is..." This preserves the scaffold without diminishing Module 02.

**Specific lines**: 01, lines 153–183 → condense to ~8 lines with forward pointer.

---

## 🟡 MEDIUM — Terminology & Consistency

### T1. "PRAO" vs master outline's framing inconsistency

Module 01 introduces PRAO as the "canonical model for agentic AI behavior used throughout this course" (line 78). The master outline (line 44) says "Agency = perception + reasoning + action + observation (PRAO loop)." This is consistent. However:

- Module 03 §3.2 (line 56) uses a `stateDiagram-v2` Mermaid diagram that labels states as "Perceive", "Reason", "Act", "Observe" — ✅ consistent.
- Module 03 §3.3 (line 124) labels patterns as "Read → Think → Write" using "Think" instead of "Reason." This is a terminology slip.

**Recommended edit**: In 03, §3.3 pattern descriptions, use "Reason" consistently instead of "Think" when mapping to PRAO phases. The bracketed `[thinking: ...]` traces are fine — those describe the output format. But the pattern name "Read → Think → Write" should be "Read → Reason → Write" or annotated as "(Perceive → Reason → Act)".

**Lines**: 03, lines 124, 128, 131, 141, etc.

---

### T2. "Junior engineer" metaphor appears only in Module 01

**Current text** (01, line 72):
> "The right mental model is: a junior engineer with codebase access..."

This is an excellent metaphor that sets calibration for the entire course. However, it appears only once and is never reinforced in Modules 02 or 03. Module 02's "Failure Modes" section (inherited from Module 01 §1.4, but the concepts carry through) and Module 03's clarification questions section would both benefit from callback to this metaphor.

**Recommended edit**: Add brief callbacks:
- Module 02, §2.2 (near line 114): "Remember the junior engineer mental model from Module 01 — CLAUDE.md is the briefing document you'd give that engineer on day one."
- Module 03, §3.4 (near line 197): "A junior engineer who asks 'should I use Postgres or Redis for this?' is doing their job well. So is the agent."

---

### T3. Inconsistent capitalization of "settings.json"

Across all three modules, `settings.json` is always lowercase — ✅ consistent. However, "CLAUDE.md" is sometimes referred to as "the CLAUDE.md" and sometimes "CLAUDE.md" without article. Minor, but worth standardizing to always use the article ("the CLAUDE.md file" or just "CLAUDE.md") — pick one pattern.

**Impact**: Low. No action required unless doing a full copy-edit pass.

---

### T4. "Tool call" vs "tool invocation" inconsistency

Module 01 uses "tool call" exclusively. Module 02 uses "tool call" predominantly but introduces "tool invocation" once (line 103: "actions are tool invocations"). Module 03 returns to "tool call" exclusively. Standardize on "tool call" throughout — it's the term used in the API documentation.

**Lines**: 02, line 103 — change "tool invocations" to "tool calls".

**Citation**: https://docs.anthropic.com/en/docs/build-with-claude/tool-use — official docs use "tool use" and "tool calls"

---

## 🔵 LOW — Engagement & UX Opportunities

### E1. No interactive reveal opportunities in modules

All three modules are linear prose. The module-viewer supports section cards and IntersectionObserver (per `progress.md`), but the content doesn't leverage progressive disclosure. Several sections would benefit from **collapsible detail blocks** or **"try this" callouts**:

**Opportunities**:
- Module 01, §1.2 "Worked Example" (lines 107–133): Wrap in a `<details>` or equivalent viewer mechanism. Let learners predict the PRAO phases before revealing them.
- Module 02, §2.3 permission examples (lines 249–282): Present as a "build your own" exercise before showing the answer.
- Module 03, §3.6 "Complete Trace Reading Exercise" (lines 311–358): This is the strongest candidate — present each step, ask "what PRAO phase is this?", then reveal the annotation.

**Implementation note**: The module-viewer already uses marked.js. Custom `:::reveal` or `<details>` blocks could be post-processed in `postProcess()`.

---

### E2. Engagement tone is appropriately professional but could use more "hooks"

The modules correctly avoid gamification language (no "boss battles," "XP," or "level up" in module prose — those are lab-only). However, the modules could benefit from **opening hooks** that create stakes or curiosity:

- Module 01 opens well with a conceptual framing. ✅
- Module 02 opens with "Understanding the paradigm is necessary but not sufficient" — functional but flat. **Suggestion**: Open with a concrete scenario: "You've just joined a team that uses Claude Code. You start a session and... the agent begins modifying files before you finish typing. What do you do?"
- Module 03 opens with "The most significant operational advantage of Claude Code over previous AI tools is transparency." This is a claim, not a hook. **Suggestion**: Open with a 2-line trace snippet showing the agent discovering a bug, then say: "Can you read what just happened? By the end of this module, you'll be fluent in traces like this."

---

### E3. Diagrams could include reading annotations

The Mermaid diagrams in all three modules are clean and well-styled. However, they're purely structural — they show relationships but don't guide reading. For a course teaching engineers to *read* agent behavior, the diagrams could include:

- **Numbered reading order** on the PRAO loop diagram (Module 01, line 80)
- **Annotation callouts** on the Claude Code Architecture diagram (Module 02, line 26) — e.g., "← This is where permissions are enforced"
- **A "you are here" marker** on the state diagram (Module 03, line 55) showing which phase the trace example is currently in

These are enhancement opportunities, not defects.

---

## Curriculum Progression Assessment

### Strengths
1. **PRAO threading is excellent**: Introduced in 01, operationalized in 02 (via tool calls), and made readable in 03 (via traces). Each module adds a new lens on the same core concept.
2. **Professional tone is consistent**: No gamer language leaks into modules. The "director and agent" metaphor (01, line 8) sets the right frame.
3. **Practical grounding**: Every concept connects to a concrete example. The TypeScript typing example (01), the auth refactoring example (03), and the permission configs (02) are all realistic.
4. **Forward references work**: Module 01 → 02 ("Module 02 covers CLAUDE.md") and 02 → 03 ("Module 03 teaches trace reading") create clear progression.

### Weaknesses
1. **Module 01 is slightly too comprehensive**: It covers CLAUDE.md, session context, tool calls, and collaboration models — all of which Module 02 covers in more depth. This creates a "double introduction" effect that could be tightened.
2. **Module 03 doesn't build on Module 02's MCP content**: Module 02 introduces MCP servers, but Module 03's trace examples are all local file operations. An MCP tool call in the trace example (§3.6) would reinforce Module 02.
3. **The GCCF gap** (H2 above) is the most significant progression defect — Module 04 expects a concept that Modules 01–03 don't name.

---

## Summary of Recommended Actions

| ID | Severity | Action | File | Lines |
|----|----------|--------|------|-------|
| C1 | 🔴 | Correct extended thinking description | 03 | 263–269 |
| C2 | 🔴 | Add three-level CLAUDE.md hierarchy | 02 | 119–126 |
| C3 | 🔴 | Fix MCP config example (remove `type`, fix URL) | 02 | 360–390 |
| H1 | 🟠 | Remove NotebookLM banner | 03 | 4 |
| H2 | 🟠 | Introduce GCCF before Module 04 references it | 02 or 03 | — |
| H3 | 🟠 | Adjust Era 2 date to 2022–2024 | 01 | 29 |
| H4 | 🟠 | Trim CLAUDE.md coverage in Module 01 | 01 | 153–183 |
| T1 | 🟡 | Use "Reason" not "Think" in PRAO pattern names | 03 | 124+ |
| T2 | 🟡 | Add "junior engineer" metaphor callbacks | 02, 03 | — |
| T3 | 🟡 | Standardize CLAUDE.md article usage | all | — |
| T4 | 🟡 | "tool invocations" → "tool calls" | 02 | 103 |
| E1 | 🔵 | Add interactive reveal to trace exercise | 03 | 311–358 |
| E2 | 🔵 | Strengthen Module 02 & 03 opening hooks | 02, 03 | 1–15 |
| E3 | 🔵 | Add reading annotations to diagrams | all | — |

---

## Citations

| Claim Area | Official Source |
|------------|---------------|
| Extended thinking | https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking |
| CLAUDE.md hierarchy | https://docs.anthropic.com/en/docs/claude-code/memory |
| Claude Code overview | https://docs.anthropic.com/en/docs/claude-code/overview |
| Settings/permissions | https://docs.anthropic.com/en/docs/claude-code/settings |
| MCP server config | https://docs.anthropic.com/en/docs/claude-code/mcp-servers |
| Tool use terminology | https://docs.anthropic.com/en/docs/build-with-claude/tool-use |
| MCP specification | https://modelcontextprotocol.io/specification |
| SSE deprecation | MCP spec changelog 2025-03-26 |

---

*Review produced by MERCURIO second-pass audit. All defects are independently identified — no overlap with prior review sessions.*
