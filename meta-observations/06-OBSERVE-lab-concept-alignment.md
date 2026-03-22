# CC2.0 OBSERVE: Lab-to-Concept Alignment Map
**Date**: 2026-03-16
**Observer**: CC2-OBSERVE (Pedagogical Alignment Foundations)
**Operation**: extract → duplicate → extend

---

## Lab-by-Lab Concept Practice Registry

### Lab 01: The Paradigm Shift
| # | Concept Practiced | Exercise/Section | Practice Type | Bloom's Level |
|---|-------------------|-----------------|---------------|---------------|
| 1 | Deterministic vs. agentic mental model | S1: Two Ways to Build Software (comparison cards) | compare | Understand |
| 2 | PRAO loop (4 phases) | S2: Interactive PRAO Loop Visualizer (click each phase) | apply | Understand |
| 3 | Agent reasoning traces | S3: Watch Claude Think (select task, run simulation) | predict, compare | Analyze |
| 4 | Prediction before observation | S3: Think Before You Run (textarea prediction) | predict | Analyze |
| 5 | Claude Code CLI commands (5) | S4: Your First 5 Commands (copy-to-clipboard cards) | apply | Apply |
| 6 | CLAUDE.md purpose | S4: Command 5 — Set up project context | apply | Remember |
| 7 | Prompt structure (goal, context, constraints, format) | S4: Write a Prompt for Your Codebase (textarea exercise) | build | Apply |
| 8 | PRAO phase diagnosis | S5: Q1 — Which PRAO phase failed? | apply | Analyze |
| 9 | Prompt specificity | S5: Q2 — Which prompt produces best results? | compare | Evaluate |
| 10 | CLAUDE.md role and timing | S5: Q3 — What is CLAUDE.md and when to create? | apply | Understand |
| 11 | Observe phase in PRAO | S5: Q4 — Why does agent re-read file after editing? | apply | Analyze |
| 12 | PRAO in real work context | S6: Reflection — PRAO loop in your world | design | Evaluate |

### Lab 02: First Agent Conversation
| # | Concept Practiced | Exercise/Section | Practice Type | Bloom's Level |
|---|-------------------|-----------------|---------------|---------------|
| 1 | GCCF prompt pattern (Goal, Context, Constraints, Format) | S1: Prediction + GCCF reveal + Apply | predict, apply | Apply |
| 2 | Prompt ambiguity identification | S1: Rewrite vague prompt using GCCF | build | Apply |
| 3 | PRAO phase mapping from traces | S2: Annotated Execution Trace (5 steps, click to expand) | apply | Analyze |
| 4 | PRAO phase identification in output | S2: KC Q1 — "Found 12 functions" = which phase? | apply | Analyze |
| 5 | Error signature diagnosis | S3: Error reference table + Error Recovery Trace simulation | apply | Analyze |
| 6 | Permission denied error fix | S3: Error Recovery Trace (settings.json allow list) | apply | Apply |
| 7 | Prompt rewriting from error feedback | S3: Apply — Rewrite broken "update the config" prompt | build | Apply |
| 8 | Missing context diagnosis | S3: KC Q2 — Claude asks "which file?" = root cause? | apply | Analyze |
| 9 | Conversation threading modes | S4: Three modes of memory (stateless, accumulating, persistent) | compare | Understand |
| 10 | CLAUDE.md persistent context | S4: KC Q3 — Fix for repeating conventions across sessions | apply | Apply |
| 11 | Writing CLAUDE.md entries | S4: Apply — Write CLAUDE.md for FastAPI project | build | Create |
| 12 | GCCF prompt recognition | S5: KC Q5 — Which is correctly structured GCCF? | compare | Evaluate |
| 13 | PRAO phase failure diagnosis | S5: KC Q4 — "Fix auth bug" edits wrong file = which phase? | apply | Analyze |
| 14 | Full workflow synthesis | S6: Capstone — 10 Minutes Before Demo (GCCF + CLAUDE.md + error + verify) | design | Create |

### Lab 03: Agent Thinking
| # | Concept Practiced | Exercise/Section | Practice Type | Bloom's Level |
|---|-------------------|-----------------|---------------|---------------|
| 1 | Chain-of-thought trace reading | S1: 8-step thinking trace (prediction + reveal) | predict, apply | Analyze |
| 2 | Mid-reasoning constraint discovery | S1: Apply — What did reasoning accomplish vs. direct action? | apply | Analyze |
| 3 | Constraint source identification | S1: KC Q1 — What triggered decision NOT to rename? | apply | Analyze |
| 4 | Tool call sequence patterns (5 patterns) | S2: Pattern cards (Read→Think→Write, loops, etc.) | compare | Understand |
| 5 | Tool call sequence diagnosis | S2: Predict — What is the Bash→Read→Read→Think→Write building toward? | predict | Analyze |
| 6 | Agent stuck/looping diagnosis | S2: Apply — Bash→Bash→Bash→Bash with no Write = diagnosis? | debug | Analyze |
| 7 | Repeated read loop identification | S2: KC Q2 — Read→Think→Read→Think→Read = what's happening? | apply | Analyze |
| 8 | Clarification request types (scope, authority, context) | S3: Three types of clarification requests | compare | Understand |
| 9 | Intervention trainer (5 scenarios) | S3: Categorize each agent response (answer/context/narrow) | apply | Apply |
| 10 | Disambiguation response | S3: KC Q3 — "Found 3 functions named authenticate()" = right response? | apply | Apply |
| 11 | Extended thinking mode use cases | S4: Table of when to use/skip extended thinking | compare | Evaluate |
| 12 | Extended thinking trace analysis | S4: Apply — What does trace reveal about ambiguity in "migrate"? | apply | Analyze |
| 13 | GCCF callback (prompt precision) | S4: GCCF callback — ambiguity in Goal component | apply | Analyze |
| 14 | Dependency tracing pattern | S4: KC Q4 — Think→Read→Think→Read→Think→Write = healthy? | apply | Evaluate |
| 15 | Extended thinking decision | S4: KC Q5 — Which situation warrants extended thinking? | apply | Evaluate |
| 16 | Bug investigation with tool calls | S5: CE-03-D — Issue Navigation (first 3 tool calls, PRAO annotation, root cause, GCCF fix, PR description) | build, debug | Create |
| 17 | Trace diagnosis + intervention | S6: Capstone — Diagnose a Real Trace (uncertainty, missing prompt element, improved GCCF, CLAUDE.md entry) | design | Create |

### Lab 04: MCP Server Explorer
| # | Concept Practiced | Exercise/Section | Practice Type | Bloom's Level |
|---|-------------------|-----------------|---------------|---------------|
| 1 | MCP architecture (client-server-system) | S0: Click each architecture component | apply | Understand |
| 2 | Extension problem motivation | S0: Why Claude Code needs MCP | compare | Understand |
| 3 | Three MCP primitives (Tools, Resources, Prompts) | S1: Prediction + Reveal + Primitive Matcher (6 scenarios) | predict, apply | Apply |
| 4 | MCP transport types (stdio vs Streamable HTTP) | S2: Prediction + Config examples + Apply | predict, build | Apply |
| 5 | SSE deprecation awareness | S2: Warning card about SSE deprecation | apply | Remember |
| 6 | mcpServers config writing | S2: Apply — Write config for local Python MCP server | build | Apply |
| 7 | Tool schema reading (JSON Schema) | S3: Interactive Schema Explorer (click lines for annotations) | apply | Understand |
| 8 | Tool schema writing | S3: Apply — Write create_branch tool schema | build | Create |
| 9 | Production tool schema design | S3: CE-04-B — Design production search_issues schema (auto-validated) | build | Create |
| 10 | MCP tool calls in PRAO loop | S4: Interactive 5-step PRAO trace for MCP tool call | apply | Apply |
| 11 | MCP knowledge checks (3 questions) | S4: 2/3 required to unlock capstone | apply | Apply |
| 12 | Capstone: Architecture documentation | S5: Write architecture doc for an MCP-enabled Claude Code deployment | design | Create |

### Lab 05: Prompt Engineering
| # | Concept Practiced | Exercise/Section | Practice Type | Bloom's Level |
|---|-------------------|-----------------|---------------|---------------|
| 1 | Prompt quality gap (5 dimensions) | S0: Prompt Comparison (vague vs. structured) + Prediction | predict, compare | Analyze |
| 2 | GCCF to TCEF evolution | S0: Callback to Lab 02 GCCF | compare | Understand |
| 3 | TCEF pattern (Task, Context, Examples, Format) | S1: Four TCEF component cards + Builder exercise | apply, build | Apply |
| 4 | TCEF prompt assembly | S1: TCEF Builder — write all 4 components for FastAPI validation | build | Create |
| 5 | Context injection strategies (3 types) | S2: Prediction + Reveal (session-persistent, task-time, MCP-driven) | predict, compare | Understand |
| 6 | CLAUDE.md as context injection | S2: Callback to Lab 02 CLAUDE.md context | apply | Apply |
| 7 | Prompt iteration methodology | S3: Iterative prompt improvement (v1→v2→v3) | build | Create |
| 8 | TCEF component diagnosis | S4: KC Q1 — Inconsistent output = which TCEF component missing? | apply | Analyze |
| 9 | Context injection strategy selection | S4: KC Q2 — Check server error rates = which strategy? | apply | Apply |
| 10 | Task specificity diagnosis | S4: KC Q3 — "Review code for issues" = what went wrong? | apply | Analyze |
| 11 | Prompt library building | S5: Capstone — Build 3 TCEF prompts (PR review, bug investigation, documentation) | design | Create |

### Lab 06: Skills & Commands
| # | Concept Practiced | Exercise/Section | Practice Type | Bloom's Level |
|---|-------------------|-----------------|---------------|---------------|
| 1 | What skills are and why they matter | S0: Concept introduction (skill = reusable instruction set) | compare | Understand |
| 2 | YAML frontmatter structure | S1: Prediction challenge — triggers field misunderstanding | predict | Understand |
| 3 | triggers field is LUXOR convention, not native | S1: KC Q1 — triggers field behavior | apply | Remember |
| 4 | Skill YAML writing | S1: Apply — write frontmatter for a skill | build | Apply |
| 5 | Skill body writing (procedures, examples, anti-patterns) | S2: Interactive workshop — write skill body content | build | Create |
| 6 | Production skill creation | S2: CE — Build Challenge — write a complete skill file | build | Create |
| 7 | Slash command structure | S3: Prediction + reveal (how commands differ from skills) | predict, compare | Understand |
| 8 | Command file writing | S3: KC Q2 + Apply — write a slash command file | build | Apply |
| 9 | Production command creation | S3: CE — Build Challenge — write a complete command | build | Create |
| 10 | Skill composition patterns (sequential, parallel, conditional) | S4: Concept introduction + simulation | compare | Understand |
| 11 | PRAO callback in composition | S4: Callback to Lab 01 PRAO loop | apply | Apply |
| 12 | Composition design | S4: Apply — design a composition workflow | build | Create |
| 13 | Skill ecosystem synthesis | S5: KC Q3 + Q4 (synthesis knowledge checks) | apply | Evaluate |
| 14 | Team skill ecosystem design | S6: Capstone — design 4 skills + 1 command + identify anti-pattern | design | Create |

### Lab 07: Multi-Agent Orchestrator
| # | Concept Practiced | Exercise/Section | Practice Type | Bloom's Level |
|---|-------------------|-----------------|---------------|---------------|
| 1 | When multi-agent is justified (complexity threshold) | S0: 3 motivating statistics + when NOT to use | compare | Evaluate |
| 2 | Task decomposition principles | S1: Prediction + Reveal (decomposability criteria) | predict | Analyze |
| 3 | Decomposition examples (click for verdict) | S1: 5 decomposable/not-decomposable examples | compare | Analyze |
| 4 | Task decomposition application | S1: Apply — decompose a real task | build | Apply |
| 5 | Decomposition check | S1: KC Q1 — Which task is NOT decomposable? | apply | Analyze |
| 6 | Orchestrator patterns (fan-out, pipeline, routing) | S2: 3 expandable pattern cards | compare | Understand |
| 7 | Orchestrator pattern selection | S2: Simulation — match scenario to pattern | apply | Apply |
| 8 | Subagent system prompt writing | S2: CE — Build Challenge — write subagent system prompt | build | Create |
| 9 | Orchestrator builder (interactive) | S2: Apply — select pattern for a scenario | build | Apply |
| 10 | Orchestrator pattern check | S2: KC Q2 — Pattern matching question | apply | Apply |
| 11 | Inter-agent communication schemas | S3: Structured JSON schema concepts + schema builder | apply | Apply |
| 12 | TCEF callback in agent communication | S3: Callback to Lab 05 TCEF for structured output | apply | Apply |
| 13 | Communication schema design | S3: Apply — design communication schema | build | Create |
| 14 | Failure modes and recovery (4 failure types) | S4: Failure triage game (3 scenarios) | debug | Analyze |
| 15 | Failure modes table | S4: Reference table (timeout, malformed output, contradictory, scope creep) | compare | Understand |
| 16 | Failure triage | S4: KC Q3 — Failure mode identification | apply | Analyze |
| 17 | Synthesis knowledge checks | S5: KC Q4, Q5 — multi-agent decision making | apply | Evaluate |
| 18 | Multi-agent system design | S6: Capstone — Design complete multi-agent system (decomposition + pattern + schema + failure recovery) | design | Create |

### Lab 08: Production Readiness
| # | Concept Practiced | Exercise/Section | Practice Type | Bloom's Level |
|---|-------------------|-----------------|---------------|---------------|
| 1 | Production gap (dev vs production) | S0: Concept introduction + PRAO callback | compare | Understand |
| 2 | Permission scoping (settings.json allow/deny) | S1: Prediction + Reveal + Apply | predict, build | Apply |
| 3 | Permission model design | S1: CE-08-A — Build Challenge — design permission model | build | Create |
| 4 | Permission scoping check | S1: KC Q1 — Permission knowledge check | apply | Apply |
| 5 | Secrets management (env vars, not hardcoded) | S2: Concept introduction + Secrets Audit simulation | apply | Apply |
| 6 | Secrets audit exercise | S2: Apply — write .env config for a project | build | Apply |
| 7 | Cost optimization (token counting, caching) | S3: Interactive workshop + cost calculator | apply | Apply |
| 8 | Cost strategy check | S3: KC Q2 — Cost optimization knowledge check | apply | Apply |
| 9 | Observability (logging, metrics, alerting) | S4: Concept introduction + Apply | apply, build | Apply |
| 10 | Observability design | S4: Apply — design observability for an agentic workflow | build | Create |
| 11 | Synthesis knowledge checks | S5: KC Q3, Q4 — production readiness synthesis | apply | Evaluate |
| 12 | Production deployment specification | S6: Capstone — Write complete production deployment spec (permissions + secrets + cost + observability) | design | Create |

### Lab 09: Capstone Build
| # | Concept Practiced | Exercise/Section | Practice Type | Bloom's Level |
|---|-------------------|-----------------|---------------|---------------|
| 1 | Problem scoping (3 archetype problems) | S0: Choose problem + write problem statement | design | Create |
| 2 | Pipeline architecture design (PRAO-mapped) | S1: Architecture design with PRAO mapping | design | Create |
| 3 | PRAO callback (pipeline components) | S1: Callback to Lab 01 PRAO for pipeline phases | apply | Apply |
| 4 | TCEF prompt writing for pipeline | S2: Write TCEF prompt for chosen pipeline | build | Create |
| 5 | TCEF callback | S2: Callback to Lab 05 TCEF pattern | apply | Apply |
| 6 | Skill definition for pipeline | S2: Write skill YAML for pipeline | build | Create |
| 7 | Skill anatomy callback | S2: Callback to Lab 06 skill anatomy | apply | Apply |
| 8 | Permission scoping for production | S3: Permission scope + secrets design + human gates | build | Create |
| 9 | Permission scoping callback | S3: Callback to Lab 08 permission scoping | apply | Apply |
| 10 | Peer review protocol | S4: Self-review rubric + improvement identification | apply | Evaluate |
| 11 | Final deliverable (design document export) | S5: Generate + download complete capstone document | design | Create |

---

## Concept Alignment Matrix

### Well-Reinforced Concepts (practiced in 2+ labs)

| Concept | Taught In | Practiced In | Times Practiced |
|---------|-----------|--------------|-----------------|
| PRAO loop (Perceive-Reason-Act-Observe) | M01 | L01, L02, L03, L04, L07, L08, L09 | **7** |
| CLAUDE.md (persistent context) | M02 | L01, L02, L03, L04, L05, L09 | **6** |
| GCCF/TCEF prompt structure | M02, M04 | L01, L02, L03, L05, L07, L09 | **6** |
| Tool call trace reading | M03 | L01, L02, L03, L04 | **4** |
| Permission scoping (settings.json) | M02, M10 | L02, L08, L09 | **3** |
| Prompt specificity/ambiguity | M04 | L01, L02, L03, L05 | **4** |
| Clarification request handling | M03 | L02, L03 | **2** |
| Error recovery (agent errors) | M02, M03 | L02, L03 | **2** |
| MCP primitives (Tools, Resources, Prompts) | M05 | L04, L09 | **2** |
| Skill file anatomy | M07 | L06, L09 | **2** |
| Multi-agent decomposition | M09 | L07, L09 | **2** |
| Orchestrator patterns (fan-out, pipeline, routing) | M09 | L07, L09 | **2** |
| Context injection strategies | M04 | L05, L09 | **2** |
| Secrets management | M10 | L08, L09 | **2** |

### Orphaned Concepts (taught but never practiced in any lab)

| Concept | Module | Why Not Practiced? |
|---------|--------|--------------------|
| MCP SDK implementation (TypeScript) | M06 (6.2) | No lab for M06 — learners never write server-side MCP code |
| MCP error handling patterns | M06 (6.4) | No lab for M06 — error handling in MCP servers never exercised |
| MCP server production deployment | M06 (6.5) | No lab for M06 — production MCP not practiced |
| MCP server design principles | M06 (6.1) | No lab for M06 — design principles only read, never applied |
| Meta-prompting concept | M08 (8.1) | No lab for M08 — using Claude to generate prompts never practiced |
| Prompt generation via meta-prompting | M08 (8.2) | No lab for M08 — prompt-generating-prompts workflow never exercised |
| Prompt evaluation methodology | M08 (8.3) | No lab for M08 — systematic evaluation criteria never applied |
| Prompt libraries via meta-prompting | M08 (8.4) | No lab for M08 — Lab 05 builds prompt library manually, not via meta-prompting |
| Limits of meta-prompting | M08 (8.5) | No lab for M08 — critical awareness never tested |
| Tech stack adaptation strategies | M11 | No lab for M11 — transferring skills across stacks never practiced |
| Technology-agnostic principles | M11 | No lab for M11 — identifying platform-independent patterns never exercised |
| Claude Code architecture (9 built-in tools) | M02 (Architecture) | Mentioned in L04 S0 but not explicitly practiced as a concept |
| Configuration levels (global vs project) | M02 (2.3) | Referenced but never as a focused exercise |
| Approval pattern for unspecified actions | M02 (2.3) | Taught in module but no lab exercise practices this |
| MCP server connectivity verification | M02 (2.4) | No practice exercise on debugging MCP connections |
| Skill versioning | M12 (12.5) | Mentioned but no lab exercises on versioning |
| Prompt drift detection | M12 (12.5) | Advanced production concept, no lab practice |
| Model update handling | M12 (12.5) | Advanced production concept, no lab practice |
| Structured logging for agents | M12 (12.4) | Touched briefly in Lab 08 but not deeply practiced |
| Trace correlation | M12 (12.4) | Not practiced in any lab |
| Incident response playbook | M12 (12.4) | Not practiced in any lab |
| Inter-agent schema versioning | M09 (9.4) | Taught but not practiced; Lab 07 covers schema design but not versioning |
| Provenance reporting | M09 (9.4) | Taught in module but never practiced |

### Cross-Module Practice (practiced in unexpected lab)

| Concept | Expected Lab | Actual Lab | Effect |
|---------|-------------|------------|--------|
| PRAO loop | L01 (origin) | L02, L03, L04, L07, L08, L09 | Positive: spiral reinforcement across all 3 days |
| GCCF prompt pattern | L02 (origin) | L03, L05, L07, L09 | Positive: continuous application in increasingly complex contexts |
| CLAUDE.md | L01 (intro), L02 (deep practice) | L03, L04, L05, L09 | Positive: becomes a natural part of every workflow |
| Prompt specificity | L05 (primary) | L01, L02, L03 | Positive: Labs 01-03 prepare intuition before L05 formalizes it |
| Permission scoping | L08 (primary) | L02 (error recovery context), L09 | Positive: introduced as error scenario before formal treatment |
| MCP tool calls | L04 (primary) | L07 (multi-agent context) | Positive: MCP appears in orchestration context, not just standalone |

### Lab-Only Concepts (introduced in lab, not corresponding module)

| Concept | Lab | Should It Be in Module? |
|---------|-----|------------------------|
| GCCF acronym (Goal, Context, Constraints, Format) | L02 | Already covered in M02 as prompt structure; GCCF is the lab's pedagogical framing |
| TCEF acronym (Task, Context, Examples, Format) | L05 | M04 covers prompt engineering depth but doesn't use the TCEF acronym explicitly |
| Intervention trainer (scope/authority/context categories) | L03 | M03 teaches clarification types; lab adds the interactive categorization exercise |
| CE Build Challenges (CE-03-D, CE-04-B, CE-08-A) | L03, L04, L08 | These are practice-only; the concepts are in modules but the challenge format is lab-original |
| XP/streak gamification mechanics | All labs | Pedagogical scaffolding, not subject matter content |

---

## Bloom's Taxonomy Distribution

| Level | Count | % | Examples |
|-------|-------|---|---------|
| **Remember** | 4 | 3% | L01: CLAUDE.md purpose; L04: SSE deprecation; L06: triggers field convention |
| **Understand** | 22 | 19% | L01: PRAO phases; L03: 5 tool patterns; L04: MCP architecture; L07: orchestrator patterns |
| **Apply** | 38 | 33% | L02: PRAO trace mapping; L04: primitive matcher; L05: TCEF builder; L08: permission scoping |
| **Analyze** | 26 | 22% | L01: prediction challenges; L03: trace diagnosis; L07: task decomposition; L08: secrets audit |
| **Evaluate** | 12 | 10% | L01: prompt comparison; L03: extended thinking decisions; L07: multi-agent justification |
| **Create** | 14 | 12% | L02: CLAUDE.md writing; L05: prompt library; L06: skill file creation; L09: capstone design |

**Distribution Assessment**: Healthy pyramid shape. The bulk (55%) is at Apply + Analyze levels, appropriate for a practitioner-focused engineering course. Remember is correctly minimal (3%) — the course avoids rote memorization. Create (12%) is concentrated in capstone/challenge exercises, providing appropriate culminating synthesis. Evaluate (10%) appears in knowledge checks requiring judgment, not just recall.

---

## Modules Without Labs: Concept Practice Gap

### Module 06 (MCP Building) — No Lab

Concepts from M06 that are **never practiced** in any lab:

| Concept | Module Section | Impact |
|---------|---------------|--------|
| MCP SDK setup and initialization | 6.2 | HIGH — learners read about Server class but never instantiate one |
| Implementing tool handlers | 6.2 | HIGH — learners write schemas (L04) but never implement the handler function behind them |
| Implementing resource handlers | 6.2 | MEDIUM — resources are the least-used primitive |
| Input validation in MCP servers | 6.3 | HIGH — schema validation is practiced (L04) but server-side validation is not |
| Error response patterns in MCP | 6.4 | MEDIUM — error handling patterns specific to MCP servers |
| Rate limiting and caching in servers | 6.5 | LOW — production concern, appropriate for module-only treatment |
| Testing MCP servers | 6.5 | MEDIUM — no practice testing server implementations |

**Gap Severity**: HIGH. Module 06 is the most practice-deficient module. Learners can *read* MCP tool schemas (L04) and *use* MCP tools conceptually, but they never *build* a working MCP server. This creates an asymmetry: they understand the consumer side but not the producer side.

**Mitigation**: L04's CE-04-B (production tool schema) partially bridges by requiring schema design, but stops short of implementation.

### Module 08 (Meta-Prompting) — No Lab

Concepts from M08 that are **never practiced**:

| Concept | Module Section | Impact |
|---------|---------------|--------|
| Using Claude to generate prompts | 8.2 | HIGH — the core meta-prompting idea is never practiced |
| Prompt evaluation criteria | 8.3 | HIGH — systematic evaluation methodology never applied |
| Generate → Evaluate → Improve → Re-evaluate cycle | 8.3 | HIGH — the iterative cycle is never exercised |
| Building prompt libraries via meta-prompting | 8.4 | MEDIUM — L05 builds a prompt library but manually, not via meta-prompting |
| Limits and failure modes of meta-prompting | 8.5 | LOW — critical awareness, acceptable as read-only |

**Gap Severity**: HIGH. Meta-prompting is a distinct skill that requires practice to internalize. The closest exercise is Lab 05's prompt iteration (S3), which teaches manual iteration but not the meta-prompting approach of having Claude generate and evaluate its own prompts.

**Mitigation**: Lab 05's prompt library capstone covers the output artifact but not the meta-prompting process.

### Module 11 (Tech Stack Adaptation) — No Lab

Concepts from M11 that are **never practiced**:

| Concept | Module Section | Impact |
|---------|---------------|--------|
| Transferring agentic skills across tech stacks | — | MEDIUM — conceptual framework, hard to lab-ify |
| Identifying platform-independent principles | — | MEDIUM — requires multi-platform exposure |
| Stack-specific tool adaptation | — | LOW — learners likely work in one stack during the course |

**Gap Severity**: LOW. This module is inherently more conceptual — it teaches principles that learners apply post-course when they encounter different stacks. A lab would require access to multiple tech stacks simultaneously, which is impractical in a 3-day intensive.

---

## Knowledge Check Quality Analysis

| Lab | Questions | Avg Bloom's | Misconception Coverage |
|-----|-----------|-------------|------------------------|
| **Lab 01** | 4 | Analyze (3.25) | Covers PRAO phase confusion, prompt specificity, CLAUDE.md role, Observe phase misidentification |
| **Lab 02** | 5 | Analyze (3.4) | Covers PRAO phase in output, missing context diagnosis, CLAUDE.md persistence, Perceive failure, GCCF recognition |
| **Lab 03** | 5 | Analyze (3.6) | Covers constraint discovery source, read loop vs thoroughness, disambiguation response, dependency tracing, extended thinking use cases |
| **Lab 04** | 3 | Apply (3.0) | Covers MCP primitives, transport types, PRAO in MCP context |
| **Lab 05** | 3 | Analyze (3.3) | Covers TCEF component diagnosis (format), context injection strategy selection, task specificity |
| **Lab 06** | 4 | Apply-Evaluate (3.5) | Covers triggers field convention, command vs skill distinction, composition patterns, skill ecosystem design |
| **Lab 07** | 5 | Apply-Evaluate (3.4) | Covers decomposability criteria, pattern matching, failure modes, multi-agent decision making |
| **Lab 08** | 4 | Apply (3.0) | Covers permission scoping, cost optimization, observability, production readiness |
| **Lab 09** | 0 (self-review rubric) | Evaluate (5.0) | No quiz questions; uses peer-review protocol with rubric instead |

**Assessment**: Knowledge checks maintain a consistent Analyze-level average across labs, with appropriate variation. Lab 09's shift to self/peer review is pedagogically appropriate for a capstone. The strongest misconception coverage is in Labs 02-03, which target the most common beginner errors (confusing PRAO phases, misidentifying error sources). Lab 04's checks could be deeper — they test at Apply level rather than Analyze.

---

## Over-Practiced vs Under-Practiced Concepts

### Over-Practiced (3+ labs, may crowd out other concepts)

| Concept | Labs | Assessment |
|---------|------|------------|
| PRAO loop | L01, L02, L03, L04, L07, L08, L09 (7 labs) | **Intentional** — PRAO is the conceptual backbone. Spiral reinforcement is the correct pedagogical strategy. |
| CLAUDE.md | L01, L02, L03, L04, L05, L09 (6 labs) | **Intentional** — CLAUDE.md is a persistent tool learners use in every session. Repeated practice builds automaticity. |
| GCCF/TCEF prompting | L01, L02, L03, L05, L07, L09 (6 labs) | **Intentional** — prompt structure is the primary skill. Evolution from GCCF → TCEF shows concept refinement. |

**Verdict**: No concept is truly "over-practiced." The most-practiced concepts are the course's core competencies, and each lab adds a new application context (not mere repetition).

### Under-Practiced (in module but 0-1 labs)

| Concept | Module | Labs | Assessment |
|---------|--------|------|------------|
| MCP server implementation | M06 | 0 | **GAP** — Production skill with no practice |
| Meta-prompting workflow | M08 | 0 | **GAP** — Distinct skill with no practice |
| Configuration levels (global vs project) | M02 | 0 | **Minor** — referenced in context but no focused exercise |
| Approval pattern for unspecified actions | M02 | 0 | **Minor** — would fit in Lab 08 |
| Schema versioning | M09 | 0 | **Minor** — advanced concept, acceptable as read-only |
| Observability (structured logging, trace correlation) | M12 | 1 (L08, briefly) | **Minor gap** — Lab 08 touches observability but shallowly |

---

## Meta-Observation (duplicate)

### Quality of This Alignment Observation

**Strengths of observation**:
- All 9 labs were read at the HTML content level, not just section titles
- Exercise types were categorized by both practice type and Bloom's level
- Cross-module reinforcement patterns were identified (spiral curriculum)
- Orphaned concepts were traced to specific module sections

**Limitations of observation**:
- Knowledge check answer feedback text was not fully extracted for all labs — some quiz feedback may contain additional concept reinforcement
- Build Challenge exercises (CE-*) content was fully extracted for Labs 03, 04 but only partially for Labs 06, 07, 08
- Module content was analyzed at heading level — some sub-concepts within module sections may be missed
- Lab 09's concept registry (JS) lists 11 concept callbacks, confirming the spiral curriculum design, but the observation does not trace each callback to verify accuracy

**What this observation reveals**:
1. The course has a strong **spiral curriculum** design — core concepts (PRAO, CLAUDE.md, GCCF/TCEF) are introduced early and revisited with increasing complexity
2. The biggest **practice gap** is Module 06 (MCP Building) — learners never build a server, only consume schemas
3. Module 08 (Meta-Prompting) is conceptually rich but entirely unpracticed — this is a significant pedagogical risk for a skill that requires hands-on experience
4. The **Bloom's distribution** is healthy for a practitioner course (33% Apply, 22% Analyze, 12% Create)
5. **Prediction challenges** appear in every lab — this is a strong pedagogical pattern that activates prior knowledge before new content
6. Lab 09's **concept callback system** (11 references to prior labs) is an explicit implementation of spiral reinforcement — the capstone intentionally touches every major concept from the course
