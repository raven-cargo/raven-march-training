Now I have the full picture. Module 02 introduces the concepts (Goal, Context, Constraints, Format) but **never names the GCCF acronym**. Let me compile the complete audit.

---

# Audit Report: Modules 04–06

**Scope**: Conceptual flow, terminology consistency, engagement quality, progression alignment
**Date**: 2026-03-16 | **Auditor**: MERCURIO (three-plane convergence)

---

## 🔴 CRITICAL — Must Fix Before Deployment

### C1. Module 04 metadata shows wrong Day/Time
**File**: `docs/curriculum/modules/04-prompt-engineering-depth.md`, line 6–7
**Finding**: Header says `Day: 1, Afternoon`. After Session 8 realignment, Module 04 (Prompt Engineering) is **Day 2, Module 2.1** (09:00–10:30 Morning).
**Impact**: Facilitators and self-directed learners will misplace this module in the schedule.
**Fix**:
```
Day: 1, Afternoon  →  Day: 2, Morning
```

### C2. Module 05 Lab Connection references the wrong lab
**File**: `docs/curriculum/modules/05-mcp-architecture.md`, line 421
**Finding**: Says **"Lab 06"** but describes activities (reading tool schemas, configuring server connections in stdio/HTTP modes) that match **Lab 04 — MCP Server Explorer**. Lab 06 is Skills & Commands Builder.
**Impact**: Learners following the module will navigate to the wrong lab.
**Fix**: Change `Lab 06` → `Lab 04` and verify the activity description matches Lab 04's actual exercises.

### C3. Module 06 Lab Connection references the wrong lab
**File**: `docs/curriculum/modules/06-mcp-building.md`, lines 543–544
**Finding**: Says **"Lab 07"** and describes building a two-tool MCP server from scratch. But Lab 07 is `lab-07-multi-agent.html` (Multi-Agent Orchestrator). The described MCP building exercise either lives inside Lab 04 (extended) or doesn't have a matching lab.
**Impact**: Learners navigating to Lab 07 will find multi-agent content, not MCP server building.
**Fix**: Either (a) correct to `Lab 04` if the MCP building exercise is part of Lab 04, (b) create a dedicated lab for MCP building, or (c) rewrite the Lab Connection to describe what Lab 07 actually covers and move the MCP building exercise to a challenge mission.

---

## 🟠 HIGH — Should Fix Before Next Session

### H1. Module 04 introduces "GCCF" acronym that Module 02 never defines
**File**: `docs/curriculum/modules/04-prompt-engineering-depth.md`, line 12+
**Finding**: Module 04 opens with "A minimal GCCF pattern (Goal + Context + Constraints + Format)" and builds its entire argument on why GCCF is insufficient. However, Module 02 teaches the same four elements (Goal, Context, Constraints, Format in §1.2.2) but **never coins the "GCCF" acronym**. Learners arriving at Module 04 will encounter an unfamiliar acronym presented as prior knowledge.
**Impact**: Terminology discontinuity; learners may feel they missed something.
**Fix**: Either (a) introduce and name the "GCCF" acronym in Module 02 §2.2.2 where those four elements are taught, or (b) add a brief defining sentence in Module 04's overview: *"Module 02 introduced the four-element prompt structure — Goal, Context, Constraints, Format. We'll refer to this as the GCCF pattern."*

### H2. Module 04 missing several prompt patterns specified in the master outline
**File**: `docs/curriculum/modules/04-prompt-engineering-depth.md`
**Finding**: The master outline (Module 2.1) specifies six prompt patterns:
| Pattern | In Module 04? |
|---------|--------------|
| TCEF | ✅ Deep coverage |
| Four-Layer Model (system/task/knowledge/behavioral) | ❌ Missing |
| Chain-of-Thought Elicitation | ❌ Missing |
| Constraint-First Pattern | ✅ Partial (§4.4) |
| Role-Persona Pattern | ❌ Missing |
| Output Scaffold Pattern | ❌ Missing |

Also missing from the outline: **Prompt Versioning** and **Building a Personal Prompt Library** (§2.1.3).
**Impact**: 4 of 6 named patterns from the outline are absent. The outline promises breadth; the module delivers depth on TCEF only.
**Fix**: Either (a) add a section "4.6 Additional Prompt Patterns" covering the missing four patterns at overview depth (~300 words each), or (b) update the master outline to reflect the deliberate decision to focus on TCEF, noting that other patterns are introduced more lightly in labs or Module 08.

### H3. Module 05 uses `claude_desktop_config.json` in a Claude Code course
**File**: `docs/curriculum/modules/05-mcp-architecture.md`, line 289
**Finding**: §5.4 stdio configuration example references `claude_desktop_config.json`. This is a **Claude Desktop** configuration file, not Claude Code. The course is a Claude Code course. The CLI `claude mcp add` command is shown correctly below it, but the JSON config example creates confusion.
**Impact**: Learners may create the wrong config file or confuse Claude Desktop and Claude Code configuration.
**Fix**: Replace `claude_desktop_config.json` reference with the correct Claude Code config path. Use `settings.json` (project-level `.claude/settings.json` or global `~/.claude/settings.json`) or note it as a generic JSON config example:
```
Configuration in Claude Code's project settings (`.claude/settings.json`):
```

### H4. Module 05 missing MCP ecosystem coverage
**File**: `docs/curriculum/modules/05-mcp-architecture.md`
**Finding**: The master outline (Module 2.2.1) includes "The MCP Ecosystem" covering official servers (filesystem, GitHub, Slack), community servers (Linear, Notion, Vercel), and discovery mechanisms. Module 05 has **zero ecosystem coverage** — it goes straight from protocol architecture to schema reading.
**Impact**: Learners understand the theory but can't answer "what MCP servers exist and where do I find them?"
**Fix**: Add a section "5.2.1 The MCP Ecosystem" (~200 words) between §5.2 and §5.3, covering:
- Official servers (filesystem, GitHub, Slack, databases)
- Community servers and MCP registries
- How to discover available servers (`claude mcp list`, registries)

---

## 🟡 MEDIUM — Improve When Practical

### M1. No bridging narrative between Module 04 → Module 05
**Finding**: Module 04 ends with prompt iteration; Module 05 begins with MCP architecture. There's no conceptual bridge explaining why prompts alone aren't enough and why extending agent capabilities matters next.
**Fix**: Add 1–2 bridging sentences to Module 05's Overview: *"In Module 04, you learned to write precise prompts that direct Claude's reasoning and output. But an agent's effectiveness is limited by what it can reach. MCP extends that reach..."*

### M2. Module 06 never references the PRAO loop
**Finding**: Module 05 explicitly ties MCP to the PRAO cycle (§5.5), creating a strong conceptual anchor. Module 06 (the implementation companion) never references PRAO, even though the error handling section (§6.4) maps cleanly: Perceive failures (bad schema → wrong tool selection), Act failures (tool call errors), Observe failures (misinterpreted results).
**Fix**: Add a short PRAO connection in §6.4 or §6.3: *"These error categories map to the PRAO phases: a schema that Claude misreads is a Perceive failure; a tool call that returns an error is an Act failure; a result that Claude misinterprets is an Observe failure."*

### M3. Module 05 missing practical workflow examples
**Finding**: The master outline (Module 2.2.2) specifies "Practical MCP Workflows" — concrete examples of DB+Claude, GitHub+Claude, Docs+Claude, Slack+Claude integration. Module 05 has none of these; it stays at the protocol level.
**Fix**: Add a brief "MCP in Practice" callout box after §5.4 showing 3–4 one-line workflow examples:
- *GitHub MCP: read PR → agent reviews → posts comment*
- *Database MCP: read schema → agent writes migration → runs validation*

### M4. Module 06 duration inconsistency
**File**: `docs/curriculum/modules/06-mcp-building.md`, line 6
**Finding**: Says "Duration: 120 minutes" while all other Day 2 modules are 90 minutes. The master outline allocates 90 minutes for Module 2.2 (which covers both architecture AND building). If Module 06 genuinely needs 120 minutes, the schedule arithmetic doesn't add up.
**Impact**: Facilitators allocating time may run over or confuse the schedule.
**Fix**: Either (a) trim to 90 minutes and note the building exercise extends into Lab time, or (b) update the master outline to reflect a 120-minute slot with a note on what was shortened elsewhere.

### M5. Module 04 Further Reading is thin compared to Modules 05–06
**File**: `docs/curriculum/modules/04-prompt-engineering-depth.md`, lines 325–337
**Finding**: Module 04 has 4 links + 2 papers. Module 05 has 6 links. Module 06 has 6 links. More importantly, Module 04's resources don't include the Anthropic prompt engineering cookbook or interactive prompt examples that would directly support TCEF practice.
**Fix**: Add 1–2 more targeted resources:
- [Anthropic Prompt Engineering Cookbook](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering)
- [Kojima et al. 2022 — Zero-shot Reasoning](https://arxiv.org/abs/2205.11916) (already in `next.md` P4 but not in the module)

---

## 🔵 LOW — Nice to Have

### L1. Modules 04 and 06 lack Mermaid diagrams
**Finding**: Module 05 has two excellent Mermaid diagrams (primitives + transport architecture). Modules 04 and 06 are prose-only. Progress.md already notes these are among the 5 modules without diagrams.
**Suggested diagrams**:
- **Module 04**: TCEF pattern as a flowchart showing the four elements → combined prompt → output
- **Module 06**: MCP server architecture showing SDK → transport → client handshake

### L2. Module 06 Further Reading partially duplicates Module 05
**Finding**: 4 of 6 links in Module 06's Further Reading also appear in Module 05 (TypeScript SDK, Python SDK, Server Primitives spec, Claude Code MCP config). This is fine for standalone reading but creates redundancy if read sequentially.
**Fix**: Replace duplicates with implementation-focused resources (MCP server examples repo, Zod documentation, error handling patterns).

### L3. Module 04 "Context Quality Exercise" deserves more prominence
**Finding**: The exercise in §4.3 (identify 3 signal vs 5 noise context fragments) is an excellent pedagogical element that maps directly to Lab 05's described activity. But it's embedded in prose rather than called out as a distinct practice exercise.
**Fix**: Add a blockquote or callout wrapper: `> **Practice Exercise**: Given these eight fragments...`

---

## Summary Matrix

| ID | Severity | Module | Issue | Effort |
|----|----------|--------|-------|--------|
| C1 | 🔴 Critical | 04 | Wrong Day/Time in header metadata | 1 min |
| C2 | 🔴 Critical | 05 | Lab Connection says Lab 06, should be Lab 04 | 2 min |
| C3 | 🔴 Critical | 06 | Lab Connection says Lab 07, describes MCP building not multi-agent | 5 min |
| H1 | 🟠 High | 04/02 | "GCCF" acronym used but never defined in Module 02 | 10 min |
| H2 | 🟠 High | 04 | 4 of 6 outline prompt patterns missing | 30–60 min |
| H3 | 🟠 High | 05 | `claude_desktop_config.json` → should be Claude Code config | 5 min |
| H4 | 🟠 High | 05 | MCP ecosystem section missing vs outline | 15 min |
| M1 | 🟡 Medium | 05 | No bridging narrative from Module 04 | 5 min |
| M2 | 🟡 Medium | 06 | No PRAO reference in error handling | 5 min |
| M3 | 🟡 Medium | 05 | Missing practical workflow examples | 10 min |
| M4 | 🟡 Medium | 06 | Duration says 120 min, outline says 90 | 5 min |
| M5 | 🟡 Medium | 04 | Further Reading thinner than siblings | 5 min |
| L1 | 🔵 Low | 04, 06 | No Mermaid diagrams (05 has them) | 20 min |
| L2 | 🔵 Low | 06 | Further Reading duplicates Module 05 | 10 min |
| L3 | 🔵 Low | 04 | Context Quality Exercise needs visual callout | 3 min |

**Total findings**: 15 (3 Critical, 4 High, 5 Medium, 3 Low)
**Estimated fix time**: ~2–3 hours for all; ~15 minutes for Critical fixes only

---

### Engagement & Tone Assessment

**Overall quality**: Professional and authoritative across all three modules. The tone is consistent — "engineering discipline" framing without being dry. The ✅/❌ patterns work well for dos/don'ts. Concrete examples (Tracker system, JSON schemas, TypeScript code) are plentiful and grounded.

**Gamification level**: Appropriately minimal for module content (gamification is reserved for labs by design). The interactive knowledge checks and XP are lab-side only. Module content maintains professional credibility.

**Strongest module**: Module 05 (MCP Architecture) — best structural flow, Mermaid diagrams, PRAO integration, and complete coverage of its topic.

**Weakest module**: Module 04 (Prompt Engineering) — excellent depth on TCEF but significant gaps vs the outline's promised breadth, and the GCCF terminology discontinuity from Module 02.
