# Agentic AI Engineering Course — Lessons Learned
**Session date**: 2026-03-15
**Applies to**: Any future course build using the Progressive Game Lab Framework

## Critical Errors & Fixes

### Error 1: The 32k Output Token Limit
**What happened**: Labs 04 and 05 (original attempts) failed with "API Error: Claude's response exceeded the 32000 output token maximum."

**Root cause**: Background agents were building the ~2,000-line HTML file in memory, then trying to return the entire file as response text. Claude has a hard 32,000 output token limit.

**Fix**: Add this exact header as the FIRST thing in every lab builder agent prompt:

```
⚠️ CRITICAL: Use the Write tool to save the file directly to disk. Do NOT output the HTML in your response text. Your response should only confirm what was built, not contain any HTML code. The file will be ~1,800 lines; outputting it as text will hit a 32k token limit and fail.
```

**Success rate after fix**: 100% (Labs 04–08 all succeeded on the relaunched attempt)

**Token cost of failure**: Lab 04 was attempted 3 times before success. Each failed attempt cost ~32k tokens for zero deliverable output. Always use the Write tool for files > ~800 lines.

---

### Error 2: Stale Background Agent Notifications
**What happened**: Old background agents (from prior session context) completed during the current session with failure notifications — after the new agents had already succeeded.

**Example**: Agent aa40afe9069b628b8 (Lab 04, original attempt) completed with a 32k error — after agent a0bbe2377a3b6439e had already successfully written the file.

**How to handle**: Check if the file exists on disk before acting on a failure notification. If the file is present and correct, the failure notification is from a stale agent and can be ignored.

**Rule**: File on disk is ground truth. Agent notification status is secondary.

---

## Content Accuracy Rules Discovered

These rules were established during the build to prevent confabulations:

### MCP Specification
| Claim | Correct | Common Error |
|-------|---------|-------------|
| MCP transport options | stdio + Streamable HTTP | Incorrectly listing SSE as current |
| SSE deprecation date | 2025-03-26 | Omitting the date; calling it "recent" |
| MCP primitive count | Exactly 3 (Tools, Resources, Prompts) | Inventing 4th primitive |
| MCP primitive direction: Tools | Client → Server (Claude calls) | Direction reversed |
| MCP primitive direction: Resources | Server exposes, Client reads | Confused with Tools |
| Prompts primitive | Reusable instruction templates | Confused with system prompts |

### Claude Code CLI
| Claim | Correct | Common Error |
|-------|---------|-------------|
| Extended thinking | Model-level API parameter | `--thinking` CLI flag (doesn't exist) |
| Context injection | `@file.py` in prompt or CLAUDE.md | `--context` flag (doesn't exist) |
| Memory persistence | CLAUDE.md file at session start | `/memory` slash command (doesn't exist) |
| Permission config | settings.json allow/deny | "Permission levels" abstraction |

### CLAUDE.md
| Claim | Correct | Common Error |
|-------|---------|-------------|
| How it works | File read at session start | Invoked as a command |
| Location | `.claude/CLAUDE.md` or project root | Described as a database |
| Scope | Available to all agents in session | Agent-specific memory |

### Skill YAML
| Field | Correct | Common Error |
|-------|---------|-------------|
| `triggers` | LUXOR/project convention for docs | Native Claude Code keyword activation |
| `name` | Skill identifier | Slash command name (different system) |
| `description` | For human orchestrators + LLM routing | Required for automatic invocation |

---

## Framework Nuances

### Progressive Game Lab Framework — Tone Calibration
**Issue**: Early lab descriptions used pure gamification language ("XP", "achievement unlocked", "game over"). This felt inconsistent with a professional engineering course.

**Calibration**: Prefer professional-adjacent language:
- "Milestone" over "achievement"
- "Practice" over "game"
- "Checkpoint" over "level up"
- Emojis sparingly and purposefully (not decoratively)
- XP system retained but de-emphasized in UI copy

### Section Unlock Gates — Engagement Threshold
**Issue**: Gates set too high (requiring perfect scores) frustrated learners.
**Calibration**: Knowledge checks require 2/3 correct (not 3/3). Apply tasks unlock on ANY submit (not scored). Only Boss Challenge requires meaningful engagement (min char threshold).

### Concept Registry — Cumulative Approach
**Pattern**: Each lab's CONCEPT_REGISTRY should contain ALL concepts from ALL prior labs, not just prior concepts that happen to resurface in this lab. This enables future labs to reference any past concept without requiring backward edits.

### Boss Challenge — No Knowledge Checks
**Rule**: Boss Challenge sections (S5/S6) contain zero knowledge checks. They are entirely Apply-based. The boss is a synthesis challenge, not a test.

### localStorage Key Naming
**Convention**: `lab-[NN]-xp` (two-digit with leading zero: `lab-04-xp`, `lab-09-xp`)
- XP: `lab-[NN]-xp`
- Streak count: `lab-[NN]-streak-count`
- Section complete: `lab-[NN]-s[N]-complete`
- Textarea content: `lab-[NN]-s[N]-[field-slug]`

### Cross-Lab XP Aggregation (Lab 09 Capstone)
Lab 09 reads `lab-01-xp` through `lab-08-xp` from localStorage to show a "total course XP" summary. This pattern requires consistent key naming across all labs.

---

## Agent Prompt Engineering Lessons

### What Makes a Successful Lab Builder Prompt

**Required elements** (omitting any causes failure or quality degradation):
1. Write-to-file CRITICAL header (prevents 32k error)
2. Complete design system CSS (prevents visual inconsistency)
3. Section-by-section spec with exact Q&A content (prevents vague or invented questions)
4. Per-option incorrect feedback text (prevents "Wrong! Try again" non-explanations)
5. Content accuracy rules (prevents confabulations)
6. Technical requirements checklist (prevents missing WCAG, localStorage, responsiveness)

**Anti-patterns**:
- "Add a section about MCP" — too vague, produces variable content
- Not specifying wrong-answer feedback — agent invents generic "Incorrect" messages
- Not specifying unlock gates — agent sometimes skips them entirely
- Not specifying min char thresholds — agent implements gates with no real threshold

### Parallel Agent Count
- Safe parallel limit: 7–8 agents simultaneously (observed in session)
- No degradation in quality observed at this count
- Agents are independent; no coordination needed for content (each has full spec)

### Agent Output Size
- ~1,800 lines → Write tool works reliably
- ~2,700 lines → Write tool still works (Lab 05 at 2,679 lines)
- > 2,000 lines in response text → WILL fail (32k limit)

---

## What Would Be Done Differently

1. **Write-to-file header first, always** — this is non-negotiable for HTML labs
2. **Spec wrong-answer feedback explicitly** — "Incorrect. The reason is X because Y." not "Wrong!"
3. **Provide the full CONCEPT_REGISTRY** — don't ask agent to infer what prior concepts exist
4. **Use Explore agent for validation** — faster and cheaper than general-purpose for grep-only work
5. **Stagger agent launches slightly** — avoid all agents hitting the same LLM capacity at once (though no issues observed)
