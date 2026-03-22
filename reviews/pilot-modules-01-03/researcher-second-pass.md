I can't write files in don't-ask mode. Here's the complete audit directly:

---

# Confabulation & Factual Audit: Modules 01–03
## Independent Verification Against Primary Sources

**Date**: 2026-03-16 | **Method**: Claim-by-claim verification against Anthropic docs, MCP spec (2025-03-26), arXiv papers  
**Prior audit cross-referenced**: `modules-01-03-second-pass-review.md` (MERCURIO)

### Sources Verified Against

| Source | URL |
|--------|-----|
| MCP Spec – Transports | https://modelcontextprotocol.io/specification/2025-03-26/basic/transports |
| Claude Code Memory | https://docs.anthropic.com/en/docs/claude-code/memory |
| Claude Code Settings | https://docs.anthropic.com/en/docs/claude-code/settings |
| Claude Code MCP | https://docs.anthropic.com/en/docs/claude-code/mcp |
| Extended Thinking | https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking |
| Extended Thinking Models | https://docs.anthropic.com/en/docs/about-claude/models/extended-thinking-models |
| Migrating to Claude 4 | https://docs.anthropic.com/en/docs/about-claude/models/migrating-to-claude-4 |

---

## Summary

| Severity | Count |
|----------|-------|
| 🔴 CRITICAL | 4 |
| 🟠 HIGH | 3 |
| 🟡 MEDIUM | 4 |
| ✅ VERIFIED | 7 claims confirmed accurate |

---

## 🔴 CRITICAL — Factual Inaccuracies

### F1. Extended thinking description is stale — "adaptive thinking" is now the standard
**File**: `03-agent-thinking.md`, §3.5, lines 263–269

**Current text**:
> "Extended thinking is an API-level parameter that, when enabled, causes the model to produce an explicit reasoning trace... It is not a CLI flag. You enable it through API-level configuration or through specific tooling built on top of the Claude API."

**Problems**:
1. **Extended thinking is deprecated on Claude 4.6 models.** Anthropic's migration guide: *"Extended thinking is deprecated in Claude 4.6 or newer models. Use adaptive thinking instead."*
2. **Adaptive thinking** (`thinking: {type: "adaptive"}`) replaces it — the model dynamically decides when and how much to think.
3. **In Claude Code, thinking is automatic** — managed by the runtime. Learners will never configure an "API parameter."
4. **No model specificity** — never states which models support which thinking mode.

**Corrected wording**:
```markdown
Claude models can engage in extended reasoning — producing an explicit internal
"scratchpad" — before generating a response. This capability has evolved:

- **Claude 3.7 Sonnet** introduced extended thinking via the API parameter
  `thinking: {type: "enabled", budget_tokens: N}`.
- **Claude 4 Sonnet/Opus** support extended thinking with interleaved mode.
- **Claude 4.6 Opus** uses **adaptive thinking** (`thinking: {type: "adaptive"}`),
  where the model dynamically decides when and how much to think. Manual extended
  thinking is deprecated on this model.

**In Claude Code, thinking is managed automatically.** You don't configure it —
the runtime decides when a problem warrants deeper deliberation.
```

**Sources**: [Extended Thinking docs](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking), [Migration guide](https://docs.anthropic.com/en/docs/about-claude/models/migrating-to-claude-4), [Extended thinking models](https://docs.anthropic.com/en/docs/about-claude/models/extended-thinking-models)

---

### F2. CLAUDE.md hierarchy teaches two levels — three+ exist
**File**: `02-claude-code-foundations.md`, §2.2, lines 119–126

**Current text**:
> "Claude Code recognizes two CLAUDE.md files, applied in layers: Global CLAUDE.md at `~/.claude/CLAUDE.md`... Project CLAUDE.md at `.claude/CLAUDE.md`..."

**Problem**: Docs say CLAUDE.md files exist at **multiple levels** with more specific taking precedence:
1. **Global**: `~/.claude/CLAUDE.md`
2. **Project root**: `CLAUDE.md` in repo root (git-committed, team-shared)
3. **Project local**: `.claude/CLAUDE.md` (gitignored, personal overrides)
4. **Subdirectory**: CLAUDE.md in subdirs, loaded on demand
5. **Parent directories**: Loaded at launch for dirs above working directory

The module conflates project-root and project-local into one, which matters because root `CLAUDE.md` is team-shared while `.claude/CLAUDE.md` is personal.

**Corrected wording**:
```markdown
### The Hierarchy: Global, Project, and Local

Claude Code recognizes CLAUDE.md files at multiple levels, with more specific
locations taking precedence:

**Global** at `~/.claude/CLAUDE.md` — applies to every session.
**Project root** at `CLAUDE.md` in your repo root — checked into git, shared with team.
**Local** at `.claude/CLAUDE.md` — gitignored by convention, personal overrides.

CLAUDE.md files in subdirectories load on demand when Claude reads files there.
```

**Source**: [Claude Code Memory](https://docs.anthropic.com/en/docs/claude-code/memory)

---

### F3. MCP config examples use fabricated `type` field
**File**: `02-claude-code-foundations.md`, §2.4, lines 384, 391, 396, 407

**Current text** includes:
```json
"type": "stdio"
"type": "http"
```
Line 407: `"type" is either "stdio" or "http"`

**Problem**: Claude Code's `settings.json` does **not** use a `type` field for MCP servers. Transport is inferred from configuration shape:
- `command` + `args` → stdio
- `url` → Streamable HTTP

The `type` field is a **confabulation**. Teaching it will cause learners to add a non-functional field.

**Corrected JSON** (remove all `"type"` lines):
```json
{
  "mcpServers": {
    "filesystem-extended": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/your/projects"]
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"]
    },
    "linear": {
      "url": "https://mcp.linear.app/mcp",
      "headers": { "Authorization": "Bearer ${LINEAR_API_KEY}" }
    }
  }
}
```

**Replace line 407 with**:
> The transport is determined by the configuration shape: servers with `command` and `args` use stdio; servers with `url` use Streamable HTTP.

**Source**: [Claude Code MCP](https://docs.anthropic.com/en/docs/claude-code/mcp)

---

### F4. "Session context does not persist" is now incorrect
**File**: `01-paradigm-shift.md`, §1.3, lines 168–169  
**Status**: NEW — not in MERCURIO audit

**Current text**:
> "Session context — the conversation history — does not persist between sessions. When you start a new Claude Code session, it has no memory of what you discussed in the previous one. This is a hard constraint of the current architecture."

**Problem**: Claude Code now supports session resume via `claude --continue` (resume most recent) and `claude --resume` (pick a previous conversation). Calling this a "hard constraint of the current architecture" is **factually incorrect**.

**Corrected wording**:
```markdown
Session context — the conversation history — does not automatically carry over
to new sessions. By default, a new session starts fresh. However, Claude Code
provides `--continue` (resume most recent conversation) and `--resume` (pick a
previous conversation) for returning to prior context.

The practical implication remains: important decisions and constraints should be
written to CLAUDE.md or code, not just stated in conversation. Session resume
is a convenience, not a substitute for durable project context.
```

**Source**: [Claude Code CLI Reference](https://docs.anthropic.com/en/docs/claude-code/cli-reference)

---

## 🟠 HIGH — Stale/Incomplete Claims

### H1. SSE deprecation claim is imprecise
**File**: `02-claude-code-foundations.md`, line 374 and line 546

**Current text** (line 374):
> "The older SSE (Server-Sent Events) transport is deprecated"

**Line 546**:
> "Don't: Use SSE transport — it is deprecated"

**Problem**: The MCP spec says Streamable HTTP *"replaces the HTTP+SSE transport from protocol version 2024-11-05."* The deprecated thing is the **old HTTP+SSE transport pattern** (separate SSE and POST endpoints), not SSE as a technology. Streamable HTTP itself uses SSE internally for streaming. Telling learners "SSE is deprecated" will confuse them when they see SSE events in Streamable HTTP responses.

**Corrected (line 374)**:
> "Streamable HTTP is the current standard, replacing the older HTTP+SSE transport pattern from protocol version 2024-11-05. Note: Streamable HTTP may still use SSE internally for streaming, but the transport architecture differs from the deprecated pattern."

**Corrected (line 546)**:
> "Don't: Use the old HTTP+SSE transport pattern (separate SSE and POST endpoints) — it is superseded by Streamable HTTP as of MCP spec 2025-03-26"

**Source**: [MCP Spec Transports](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports)

---

### H2. "Thinking" vs "extended thinking" conflation
**File**: `03-agent-thinking.md`, §3.1–3.2  
**Status**: NEW

The module uses "thinking layer," "thinking block," and "thinking output" throughout §3.1–3.3 to describe standard CoT reasoning visible in Claude Code output. Then §3.5 introduces "extended thinking" as a separate concept. Learners may conflate the two.

**Recommended**: Add clarifying note in §3.1:
```markdown
Note: The "thinking" visible in Claude Code traces is the model's natural
chain-of-thought reasoning. This is distinct from "extended thinking" (§3.5),
a specific model capability for deeper reasoning on hard problems.
```

---

### H3. Non-interactive approval behavior is vague
**File**: `02-claude-code-foundations.md`, §2.3, line 346

**Current text**:
> "In non-interactive mode, unresolvable approval prompts will cause the agent to abort or skip the action, depending on configuration."

**Problem**: "Depending on configuration" — *which* configuration? Learners building CI/CD pipelines (the stated use case for `-p`) need to know exactly what happens.

**Recommended**:
> In non-interactive mode (`claude -p`), actions not in the allow list will cause the agent to skip those actions. Ensure your `settings.json` allow list covers all tools the agent needs, since there's no human to approve mid-execution.

---

## 🟡 MEDIUM — Terminology/Wording

### A1. "tool invocations" → "tool calls"
**File**: `01-paradigm-shift.md`, line 111

Anthropic docs consistently use "tool calls" and "tool use." Change "tool invocations" → "tool calls."

**Source**: [Tool Use docs](https://docs.anthropic.com/en/docs/build-with-claude/tool-use)

### A2. "Think" vs "Reason" in pattern names
**File**: `03-agent-thinking.md`, §3.3, lines 122+

Pattern names use "Think" (e.g., "Read → Think → Write") while PRAO uses "Reason." Add PRAO annotations: "Read → Think → Write (Perceive → Reason → Act)"

### A3. Permissions non-interactive behavior unspecified
**File**: `02-claude-code-foundations.md`, line 346 (see H3 above)

### A4. Era boundary visual implication
**File**: `01-paradigm-shift.md`, diagram line 29

Era 1 `~2021–2022` and Era 2 `~2022–2024` overlap at 2022 but the diagram implies sequential. ChatGPT launched Nov 2022, within "Era 1" dates. The disclaimer on line 46 partially mitigates. Low priority.

---

## ✅ VERIFIED ACCURATE

| Claim | Location | Verification |
|-------|----------|-------------|
| MCP primitives: Tools, Resources, Prompts (server-side) + Sampling note | 02, lines 358–366 | ✅ Matches MCP spec |
| `claude -p` for non-interactive mode | 02, line 70 | ✅ Correct flag |
| Wei et al. 2022, NeurIPS 35 | 02 line 597, 03 line 422 | ✅ arXiv 2201.11903 |
| Yao et al. 2023, ICLR | 02 line 599 | ✅ arXiv 2210.03629, ICLR 2023 |
| Kojima et al. 2022, NeurIPS 35 | 03 line 424 | ✅ arXiv 2205.11916 |
| stdio + Streamable HTTP as current transports | 02, lines 371–374 | ✅ MCP spec 2025-03-26 |
| PRAO loop framework description | 01, §1.2 | ✅ Internally consistent, well-sourced |

---

## Prioritized Fix Order

| # | ID | Action | Effort |
|---|-----|--------|--------|
| 1 | F3 | Remove `type` field from MCP config examples + fix line 407 | 5 min |
| 2 | F2 | Rewrite CLAUDE.md hierarchy → 3+ levels | 10 min |
| 3 | F4 | Update session persistence → mention --continue/--resume | 5 min |
| 4 | F1 | Rewrite §3.5 for adaptive thinking + model specificity | 20 min |
| 5 | H1 | Precision-fix SSE deprecation wording (2 locations) | 5 min |
| 6 | A1 | s/tool invocations/tool calls/ | 1 min |
| 7 | A2 | Add PRAO annotations to pattern names | 5 min |
| 8 | H2 | Add CoT vs extended thinking clarification note | 5 min |
| 9 | H3 | Specify non-interactive approval behavior | 5 min |
| 10 | A4 | Soften Era boundary | 2 min |

**Total**: ~65 minutes for all fixes.

---

**New findings vs MERCURIO audit**: 4 new issues discovered (F4 session resume, H1 SSE precision, H2 thinking conflation, H3 approval vagueness). MERCURIO's C1/C2/C3 confirmed still present; C1 is now worse due to adaptive thinking deprecation. MERCURIO's H1 (NotebookLM banner) appears fixed.
