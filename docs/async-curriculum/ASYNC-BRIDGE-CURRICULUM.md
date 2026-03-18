# Async Bridge Curriculum — Instructor and Designer Reference

**Agentic AI Engineering — Phase 1 → Phase 2 Bridge**
**Duration:** 4 weeks | **Weekly investment:** 5–10 hours | **Total:** 20–40 hours
**Audience:** Professional engineers who completed Phase 1 (2-day live training)

> **Video Library:** All video assignments, structured courses, and the Anthropic Academy certificate pathway are maintained in the authoritative master library:
> **[`docs/async-curriculum/VIDEO-LIBRARY-MASTER.md`](VIDEO-LIBRARY-MASTER.md)**
> Section 8 of this document links to that file rather than duplicating content inline.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Curriculum Architecture](#2-curriculum-architecture)
3. [Week 1 — Consolidation and Depth](#3-week-1--consolidation-and-depth)
4. [Week 2 — MCP and Real Integration](#4-week-2--mcp-and-real-integration)
5. [Week 3 — Advanced Patterns](#5-week-3--advanced-patterns)
6. [Week 4 — Phase 2 Preparation](#6-week-4--phase-2-preparation)
7. [Lab Specifications](#7-lab-specifications)
8. [Video Library with Viewing Guides](#8-video-library-with-viewing-guides)
9. [Facilitator Notes](#9-facilitator-notes)
10. [Phase 2 Readiness Criteria](#10-phase-2-readiness-criteria)
11. [Async Engagement Strategy](#11-async-engagement-strategy)

---

## 1. Executive Summary

### The Bridge Problem

Students leave Phase 1 with two things: a working mental model of agentic AI (PRAO loop, TCEF prompting, CLAUDE.md, basic MCP) and a problem — they have not yet engineered anything. They have used Claude Code productively. That is not the same as engineering agentic systems.

Phase 2 covers spec-driven development, agent evaluation, complex multi-agent orchestration, CI/CD integration, and enterprise deployment. The gap between where students land at Phase 1 exit and where Phase 2 entry expects them to be is approximately 60 hours of deliberate practice compressed into 4 weeks.

This curriculum bridges that gap.

### The 4-Week Arc

```
Week 1: Solidify the foundation
        Students arrive with concepts. They leave with a production CLAUDE.md
        and internalized TCEF patterns applied to their real codebase.

Week 2: Build real MCP tooling
        Students arrive knowing what MCP is. They leave with a working MCP
        server running against a real API or system they own.

Week 3: Think at the system level
        Students arrive thinking in single-agent terms. They leave able to
        map workflows to agent architectures and evaluate the tradeoffs.

Week 4: Prepare Phase 2 entry material
        Students arrive with partial experience. They leave with a production
        spec their Phase 2 team can build from on Day 1.
```

### What Students Achieve

By end of Week 4, each student will have:
- A committed, production-grade CLAUDE.md for their real project
- A working MCP server with at least 2 tools connecting to a real system
- One automated workflow running in their actual development environment
- A Phase 2 entry spec document that Phase 2 instructors can use directly
- Documented evidence of at least 40+ hours of deliberate agentic practice

### Time Budget

| Week | Video | Reading | Lab Work | Reflection | Total |
|------|-------|---------|----------|------------|-------|
| 1 | 2h | 1.5h | 3h | 30m | **7h** |
| 2 | 2h | 1h | 4h | 45m | **7h 45m** |
| 3 | 2.5h | 1.5h | 4h | 45m | **8h 45m** |
| 4 | 1.5h | 1h | 5h | 1h | **8h 30m** |
| **Total** | **8h** | **5h** | **16h** | **3h** | **32h** |

---

## 2. Curriculum Architecture

### Design Principles

**Principle 1: Real codebase, not sample repos.**
Every lab runs against the student's actual project. The friction of "making the lab work on my real code" is the learning. Sample repos remove this friction and remove the value.

**Principle 2: Progressive artifact building.**
Each week's lab output becomes Week 4's Phase 2 entry spec's raw material. Students are not doing disconnected exercises — they are building a portfolio that Phase 2 uses directly. This creates the "I need to finish this" pull that async learning research identifies as the primary completion driver.

**Principle 3: Consolidation before advancement.**
Week 1 is deliberately backward-looking. Students who skip consolidation plateau at Phase 1 level regardless of what new content they encounter. The TCEF framework and CLAUDE.md patterns from Phase 1 are the load-bearing structures for everything in Phase 2. They must be second-nature before Week 3.

**Principle 4: The unlock moment.**
Each week has one "unlock concept" — the insight that makes the week feel like a breakthrough rather than a checklist. Facilitators should name this concept explicitly in their weekly intro message to create anticipation.

### What Phase 1 Covered vs. What Bridge Fills

| Module | Phase 1 Coverage | Bridge Fills |
|--------|-----------------|--------------|
| M01 Paradigm Shift | Deep — PRAO loop fully established | Reinforced through real use |
| M02 Claude Code Foundations | Deep — CLAUDE.md, settings.json | Extended: production CLAUDE.md patterns |
| M03 Agent Thinking | Deep — trace reading, intervention | Extended: Week 1 reflection practice |
| M04 Prompt Engineering (TCEF) | Deep — TCEF framework | Extended: TCEF applied to real codebase |
| M05 MCP Architecture | Partial — primitives, protocol | Extended: Week 2 full coverage |
| M06 Building MCP Servers | Partial — design, basic impl | Extended: Week 2 full implementation |
| M07 Skills and Commands | Partial — overview | Extended: Week 1 applied practice |
| M08 Meta-Prompting | Brief intro | Extended: Week 3 full coverage |
| M09 Multi-Agent Systems | Brief intro | Extended: Week 3 system thinking |
| M10 Security | Deep — covered in Phase 1 | Reinforced in production context |
| M11 Tech Stack Adaptation | Partial — demo | Extended: Week 1 Lab 1 |
| M12 Capstone | Framing only | Extended: Week 4 full spec work |

---

## 3. Week 1 — Consolidation and Depth

### Theme: From Concepts to Muscle Memory

**The Core Problem Week 1 Solves:** Students leave Phase 1 with understood but not embodied concepts. TCEF makes sense when explained. It does not yet feel natural when writing prompts at 2pm during a real feature sprint. Week 1 changes that.

### Learning Goal

By end of Week 1, students will:
- Apply TCEF automatically when writing any agentic prompt (not consciously as a checklist)
- Have a production CLAUDE.md committed to their real project that their team could use today
- Have three working skills/commands that automate recurring tasks in their actual workflow
- Be able to read a Claude reasoning trace and identify the intervention decision within 30 seconds

### Weekly Schedule (7 hours)

#### Anthropic Academy Certificate Track — Week 1

Complete this course to earn your first official Anthropic credential:

**Course: Claude Code in Action (Anthropic Academy, ~1 hour)**
- URL: https://anthropic.skilljar.com/claude-code-in-action
- Also on Coursera: https://www.coursera.org/learn/claude-code-in-action
- Published: January 2026 | Free | Awards certificate
- Assignment: Complete the full course and share your certificate screenshot to the cohort channel by end of Week 1.

This is the Week 1 checkpoint artifact — the only resource in the curriculum that awards an official Anthropic certificate for Claude Code specifically.

#### Video Block (2 hours)

> **Specific video assignments are in the master library:** [`VIDEO-LIBRARY-MASTER.md`](VIDEO-LIBRARY-MASTER.md) — Week 1 section.
> The three primaries below are confirmed picks; use the master library for viewing guides and alternates.

**Video 1.1 — Required:** "Mastering Claude Code in 30 minutes" (Boris Cherny, Anthropic)
- URL: https://www.youtube.com/watch?v=6eBSHbLKuN0
- Watch time: ~30 minutes | Published: May 22, 2025 (Code with Claude conference)
- Focus: Explore→Plan→Confirm→Code→Commit loop; CLAUDE.md at-mentions; git worktrees for parallel sessions
- Viewing guide: (1) Note every time Boris describes a failure mode — these are the plateau points your cohort will hit. (2) Pay attention to the CLAUDE.md pruning philosophy — "Would removing this cause Claude to make mistakes?" (3) Watch the multi-session worktree demo.

**Video 1.2 — Required:** "No Vibes Allowed: Solving Hard Problems in Complex Codebases" (Dex Horthy, AI Engineer)
- URL: https://www.youtube.com/watch?v=rmvDxxNubIg
- Watch time: ~21 minutes | Published: December 2, 2025 | 377,000+ views
- Focus: The "dumb zone" (context degradation above ~40%), RPI workflow, frequent intentional compaction
- Viewing guide: (1) What specifically happens at the "dumb zone" threshold? (2) How does RPI map to CLAUDE.md session structure? (3) What does "intentional compaction" look like in practice?

**Video 1.3 — Required:** "Claude Code Complete Guide — Best Strategies" (Cole Medin)
- URL: https://www.youtube.com/watch?v=amEUIuBKwvg
- Watch time: ~45–60 minutes | Published: August 29, 2025 | 110,000+ views
- Focus: PRP (Product Requirements Prompt) framework, hooks configuration, subagent architecture, YOLO mode
- Viewing guide: (1) Map the PRP framework to CLAUDE.md structure — how are they related? (2) When does Cole use hooks vs. CLAUDE.md instructions? (3) How are subagents defined vs. invoked?
- Accuracy note: Preview the MCP transport section. If SSE is presented as current for remote servers (deprecated March 26, 2025), skip that segment. See VIDEO-LIBRARY-MASTER.md Instructor Action Items.

**Video 1.4 — Supplemental (DeepLearning.AI):** "Claude Code: A Highly Agentic Coding Assistant"
- URL: https://learn.deeplearning.ai/courses/claude-code-a-highly-agentic-coding-assistant/
- Assignment: Watch Lesson 4 (Setup & Codebase Understanding, 14 min) and Lesson 7 (Adding Multiple Features Simultaneously, 11 min). Lesson 8 (GitHub Integration & Hooks, 10 min) is optional but recommended before the Week 1 hooks lab.

#### Reading Block (1.5 hours)

**Re-read:** Module 04 (Prompt Engineering Depth) — TCEF section
- Focus: The three GCCF failure modes and their TCEF fixes
- Task: For each failure mode, find a real prompt you wrote in Phase 1 that exhibits it. Write the TCEF-corrected version in your Week 1 reflection.

**Re-read:** Module 11 (Tech Stack Adaptation) — Section 11.1 and 11.2
- Focus: The three adaptation gaps (documentation currency, convention encoding, context grounding)
- Task: Before starting Lab 1, complete the pre-audit checklist in Section 11.3

**Read (new):** Claude Code Best Practices documentation at code.claude.com/docs/en/best-practices
- Focus: "Avoid common failure patterns" section and "Configure your environment" section
- Task: Check each failure pattern against your Phase 1 experience. Mark which ones you've already hit.

**Read (new):** Claude Code Skills documentation at code.claude.com/docs/en/skills
- Focus: Frontmatter fields, SKILL.md structure, `disable-model-invocation` flag
- Task: Draft a skill for your most repeated agentic task before Lab 1 begins.

#### Lab Work (3 hours) — See Lab 1 Specification in Section 7

#### Reflection Deliverable (30 minutes)

**Week 1 Reflection Document** (500–800 words)

Students write a document addressing:
1. **The TCEF Audit:** Three prompts from Phase 1 (or the first week of real use) that failed. Rewritten in TCEF. What specifically changed and why does the new version work better?
2. **The CLAUDE.md Delta:** What was in your CLAUDE.md at Phase 1 exit vs. what is in it now after Lab 1? List additions and explain why each one prevents a specific mistake.
3. **The Context Window Moment:** Describe one specific session this week where you consciously managed context (used /clear, started a new session, used a subagent). What triggered the decision? What would have happened without it?

**Post to:** Course discussion board with tag `#week1-reflection`

### Unlock Concept: CLAUDE.md is code, not documentation

The breakthrough students report in Week 1 is recognizing that CLAUDE.md should be treated with the same engineering discipline as production code — version-controlled, reviewed, tested, and pruned. The moment this shifts from "I should add my conventions" to "I need to remove things that aren't load-bearing," the CLAUDE.md becomes genuinely useful rather than aspirationally complete.

Facilitators: Say this explicitly in your Monday intro message. "This week's unlock is treating CLAUDE.md as code, not documentation."

---

## 4. Week 2 — MCP and Real Integration

### Theme: From Consumer to Builder

**The Core Problem Week 2 Solves:** Students who learned MCP architecture but have not yet built an MCP server have a theoretical understanding with no practical anchor. The protocol design principles only become intuitive after you have felt the friction of a poorly-designed tool schema failing at runtime.

### Learning Goal

By end of Week 2, students will:
- Have a working MCP server with at least 2 tools running against a real system they control
- Be able to explain the three MCP primitives (Tools, Resources, Prompts) by pointing to concrete examples in their own server
- Know exactly what makes a tool schema LLM-friendly vs. LLM-hostile (from having fixed at least one broken schema)
- Understand when to use stdio vs. Streamable HTTP transport, with a real example of each

### Weekly Schedule (7h 45m)

#### Anthropic Academy Certificate Track — Week 2

Complete these courses to earn your second (and potentially third) official Anthropic credentials:

**Course: Introduction to Model Context Protocol (Anthropic Academy)**
- URL: https://anthropic.skilljar.com/introduction-to-model-context-protocol
- Published: March 2026 | Free | Awards certificate
- Assignment: Complete before the Week 2 lab. Covers all three primitives (Tools, Resources, Prompts) with Python SDK implementation and the built-in MCP Server Inspector. Earns Certificate #2.

**Course: Model Context Protocol: Advanced Topics (Anthropic Academy) — CONDITIONAL**
- URL: https://anthropic.skilljar.com/model-context-protocol-advanced-topics
- Published: March 2026 | Free | Awards certificate
- Assignment (if accuracy confirmed): After completing your MCP server in the lab, watch the sampling section and the production scaling section. Earns Certificate #3.
- NOTE: This course has an accuracy concern with SSE/Streamable HTTP framing. Your instructor will confirm whether it is cleared for assignment before Week 2 begins.

#### Video Block (2 hours)

> **Specific video assignments are in the master library:** [`VIDEO-LIBRARY-MASTER.md`](VIDEO-LIBRARY-MASTER.md) — Week 2 section.
> The three primaries below are confirmed picks. Note the mandatory accuracy caveat for the Mahesh Murag workshop.

**Video 2.1 — Required:** "MCP 201: The Power of the Protocol" (David Soria Parra, Anthropic)
- URL: https://www.youtube.com/watch?v=HNzH5Us1Rvg
- Watch time: ~27 minutes | Published: May 22, 2025 | Anthropic first-party
- Focus: MCP composability, three-primitive taxonomy (Tools/Resources/Prompts), production examples from Sourcegraph and Anthropic's own toolchain
- Viewing guide: (1) Pause when he distinguishes the three primitives — write a one-sentence definition of each. (2) How do MCP servers compose? What does "any MCP client can use your server" mean in practice?

**Video 2.2 — Required:** "Building Headless Automation with Claude Code" (Anthropic)
- URL: https://www.youtube.com/watch?v=dRsjO-88nBs
- Watch time: ~25–30 minutes | Published: July 31, 2025 | Anthropic first-party
- Focus: The `-p` flag for headless Claude Code invocation, GitHub Action on top of the SDK, JSON output for pipelines
- Viewing guide: (1) What is the difference between the Claude Code SDK and the GitHub Action? (2) How does JSON output enable pipeline integration? (3) What does "session state preservation" enable that a stateless invocation cannot?

**Video 2.3 — Required:** "Remote MCPs — What We Learned from Shipping" (John Welsh, Anthropic)
- Channel: AI Engineer | Published: June–July 2025 | Duration: ~15 minutes
- URL: Requires manual lookup on @aiDotEngineer channel. Search: "John Welsh Remote MCPs What We Learned Shipping"
- Focus: Post-deprecation remote MCP architecture (Streamable HTTP), OAuth at the Gateway layer, MCP Gateway for standardizing calls
- Viewing guide: (1) What changed between the pre-Gateway architecture and MCP Gateway? (2) What problem does centralized auth solve that server-level auth creates?
- Accuracy context: This video is the REQUIRED counterpart to any earlier MCP workshop that discusses remote transport. It covers the architecture after the March 26, 2025 SSE deprecation.

**Video 2.4 — Primary Lab Companion (DeepLearning.AI):** "MCP: Build Rich-Context AI Apps with Anthropic"
- URL: https://learn.deeplearning.ai/courses/mcp-build-rich-context-ai-apps-with-anthropic/
- Assignment: Watch Lessons 1–8 before starting Lab 2. Lesson 8 (prompt templates as a primitive) is the concept most practitioners miss. Lessons 9–11 cover deployment context.
- Instructor: Elie Schoppik, Anthropic's Head of Technical Education | Score: 9.5/10 — highest-rated resource in all research

> ⚠️ **MANDATORY CAVEAT — MAHESH MURAG MCP WORKSHOP:** Students will find this video organically (1h44m, ~325,000 views, from MCP's co-creator). The workshop is excellent for primitives, sampling, and composability (~timestamps 0:00–72:00). The remote transport section (~73:00–79:00) describes SSE, which was deprecated on March 26, 2025 — 25 days after this video was published. When referring students to this workshop, include: "Skip ~73:00–79:00 and watch the John Welsh talk (Video 2.3) for current remote transport architecture instead."

#### Reading Block (1 hour)

**Re-read:** Module 05 (MCP Architecture) — Complete
- Focus: The three primitives distinction, tool schema anatomy, transport comparison
- Task: Before Lab 2, complete the primitive classification exercise: for the API or system you plan to automate, list every capability and classify each as Tool, Resource, or Prompt before writing any code.

**Re-read:** Module 06 (Building MCP Servers) — Sections 6.1, 6.2, 6.3
- Focus: Design principles, the 15-tool threshold, schema writing for LLMs
- Task: Complete the "Design before code" template from Section 6.1 before opening your editor.

**Read (new):** MCP Architecture docs at modelcontextprotocol.io/docs/learn/architecture
- Focus: The two-layer model (data + transport), lifecycle management, JSON-RPC 2.0 structure
- Task: Note the exact JSON for a `tools/call` request. This is what Claude Code sends. Understanding it prevents schema design errors.

#### Lab Work (4 hours) — See Lab 2 Specification in Section 7

#### Reflection Deliverable (45 minutes)

**Week 2 Reflection Document** (600–900 words)

Students write a document addressing:
1. **The Design Decision Log:** For each tool in your MCP server, document: (a) why it is a Tool and not a Resource or Prompt, (b) what the description communicates to the LLM, (c) one schema design decision you changed between first draft and final version.
2. **The First Working Call:** Describe the exact moment your first tool call returned a real result. What was the prompt that triggered it? What did the tool call look like in the agent trace?
3. **The Error You Did Not Expect:** Every engineer hits at least one unexpected error during MCP development. Describe yours, what it taught you about the protocol, and how you fixed it.
4. **The Extension You Did Not Build:** For each tool you did NOT build (because of scope), explain why you chose not to and whether the decision was correct.

**Post to:** Course discussion board with tag `#week2-reflection`

### Unlock Concept: The schema IS the interface

Students building their first MCP server often write code first and schema second, treating the description as documentation. The unlock is realizing the description IS the interface — it is the only mechanism through which Claude selects the right tool, constructs valid arguments, and interprets the response. A vague description is not "missing documentation," it is a broken interface.

Facilitators: "This week's unlock is that your tool description is not documentation. It is the interface."

---

## 5. Week 3 — Advanced Patterns

### Theme: From Single-Agent Thinking to System Design

**The Core Problem Week 3 Solves:** Students who understand individual agentic concepts cannot yet compose them into system-level designs. Multi-agent thinking requires a different abstraction level than single-agent work — one that most engineers only develop through deliberate exposure to failure modes and pattern analysis.

### Learning Goal

By end of Week 3, students will:
- Be able to apply the meta-prompting generate-evaluate-improve loop to create, critique, and refine prompt libraries
- Map real workflows to the correct agentic architecture (single-agent, orchestrator/sub-agent, parallel fan-out) using evidence from Module 09's four-question framework
- Identify at least three multi-agent failure modes from their own or team's experience
- Have one automated workflow running in production (or staging) on their real codebase

### Weekly Schedule (8h 45m)

#### Anthropic Academy Certificate Track — Week 3

Complete this course to earn your fourth official Anthropic credential:

**Course: Introduction to Agent Skills (Anthropic Academy)**
- URL: https://anthropic.skilljar.com/introduction-to-agent-skills
- Published: Early 2026 | Free | Awards certificate
- Assignment: Watch the taxonomy lesson (Skills vs. Tools, MCP, and Subagents) before the Week 3 lab kickoff. Complete the custom skills and skills-with-Claude-Code lessons as your primary lab companion. Earns Certificate #4.

By end of Week 3, students who have completed the certificate pathway hold 3–4 official Anthropic credentials for their LinkedIn profile.

#### Video Block (2.5 hours)

> **Specific video assignments are in the master library:** [`VIDEO-LIBRARY-MASTER.md`](VIDEO-LIBRARY-MASTER.md) — Week 3 section.
> The three primaries below are confirmed picks. All are from Anthropic's Applied AI team or production practitioners with no accuracy red lines.

**Video 3.1 — Required:** "Don't Build Agents, Build Skills Instead" (Barry Zhang & Mahesh Murag, Anthropic)
- URL: https://www.youtube.com/watch?v=CEvIs9y1uog
- Watch time: ~16 minutes | Published: December 8, 2025 | 857,000+ views
- Focus: Skills vs. agents distinction, the one-universal-agent architecture, how skills address orchestration complexity
- Viewing guide: (1) What is the specific difference between a Skill and an MCP Tool? (2) How does the skills architecture change the design of a multi-agent system? (3) What problem does "too many specialized agents" create that skills solve?

**Video 3.2 — Required:** "How We Build Effective Agents" (Barry Zhang, Anthropic)
- URL: https://www.youtube.com/watch?v=D7_ipDqhtwk
- Watch time: ~15 minutes | Published: April 4, 2025 | 409,000+ views
- Focus: When agents are valuable (four criteria), agent component definition, "think like your agents" perspective-taking, multi-agent communication costs
- Viewing guide: (1) Apply the four criteria to your Lab 3 workflow before starting. (2) What does "think like your agents" mean concretely? What perspective shift does it require? (3) What is the cost/latency tradeoff in multi-agent architectures?

**Video 3.3 — Required:** "12-Factor Agents: Patterns of Reliable LLM Applications" (Dex Horthy, AI Engineer)
- URL: https://www.youtube.com/watch?v=8kMaTybvDUw
- Watch time: ~17 minutes | Published: July 3, 2025 | 262,000+ views
- Focus: 12 production-derived principles for agent reliability, Factor 8 (own your control flow), Factor 12 (stateless reducer)
- Viewing guide: (1) Which three factors most directly apply to your Lab 3 workflow? (2) Why does "owning your control flow" matter for debugging? (3) What does a "stateless reducer" architecture enable that a stateful one cannot?

**Video 3.4 — Supplemental (DeepLearning.AI):** "Agent Skills with Anthropic"
- URL: https://www.deeplearning.ai/short-courses/agent-skills-with-anthropic/
- Assignment: Watch Lesson 5 (Skills vs. Tools, MCP, and Subagents) before the Week 3 lab kickoff — this is the prerequisite taxonomy. Then complete Lessons 7 and 9 (Creating Custom Skills + Skills with Claude Code) as your lab companion.

**Video 3.5 — Optional:** "I'm HOOKED on Claude Code Hooks: Advanced Agentic Coding" (IndyDevDan)
- URL: https://www.youtube.com/watch?v=J5B9UGTuNoM
- Watch time: 30 minutes | Published: July 7, 2025 | Companion GitHub repo: disler/claude-code-hooks-mastery
- Focus: PreToolUse, PostToolUse, Stop, sub-agent-stop hook types; observability demo; "hooks for guarantees" framing
- Viewing guide: (1) What problems do hooks solve that CLAUDE.md instructions cannot? (2) Watch for the determinism argument — "hooks always run, instructions are advisory." (3) Note the sub-agent-stop hook — understanding agent lifecycle termination is critical for Week 3 orchestration work.

#### Reading Block (1.5 hours)

**Re-read:** Module 08 (Meta-Prompting) — Complete
- Focus: The generate-evaluate-improve loop, the failure mode evaluation pattern, skill template libraries
- Task: Before Lab 3, run the meta-prompting GEI loop on one skill file you built in Week 1. Document the evaluator's findings and what the improver changed.

**Re-read:** Module 09 (Multi-Agent Systems) — Sections 9.1, 9.2, 9.4
- Focus: The four-question decision framework, orchestrator patterns, failure recovery
- Task: For each of the three workflows you will audit in Lab 3, complete the four-question framework before building anything.

**Read (new):** Claude Code Sub-agents documentation at code.claude.com/docs/en/sub-agents
- Focus: Frontmatter fields (description, tools, model, permissionMode), built-in vs. custom sub-agents, persistent memory
- Task: Design (on paper) a sub-agent for your Lab 3 automated workflow before writing any code.

**Read (new):** Claude Code Hooks guide at code.claude.com/docs/en/hooks-guide
- Focus: PreToolUse, PostToolUse, Stop events, the three hook types (command, prompt, agent), matcher patterns
- Task: Identify one quality gate in your Lab 3 workflow that should be a hook rather than a CLAUDE.md instruction.

#### Lab Work (4 hours) — See Lab 3 Specification in Section 7

#### Reflection Deliverable (45 minutes)

**Week 3 Reflection Document** (700–1000 words)

Students write a document addressing:
1. **The Meta-Prompting Loop Result:** Show the before and after of one skill file through the generate-evaluate-improve cycle. What specific issues did the evaluator identify? What changed and why?
2. **The Workflow Audit Decisions:** For each of the three workflows you assessed, document: the four-question framework result, your architecture decision, and the confidence level in that decision. What would change your mind?
3. **The Automation You Built:** Describe your Week 3 automated workflow — what it does, what triggered it, what the agent does, and how you verified it. Paste the TCEF prompt or skill file.
4. **The Failure Mode You Fear:** Based on your Lab 3 work, identify one failure mode that concerns you in a production deployment of what you built. How would you detect it? What would recovery look like?

**Post to:** Course discussion board with tag `#week3-reflection`

### Unlock Concept: Agents are unreliable; systems make them reliable

The breakthrough in Week 3 is recognizing that individual agent reliability is a red herring. What matters is system-level reliability — which comes from deterministic hooks, structured inter-agent communication, approval gates, and testable success criteria. An agent that is "90% reliable" can be made "99% reliable" with the right system design. This reframe converts students from hoping agents work to engineering that they work.

Facilitators: "This week's unlock is that you cannot fix agent unreliability through better prompting alone. You fix it through system design."

---

## 6. Week 4 — Phase 2 Preparation

### Theme: From Experience to Specification

**The Core Problem Week 4 Solves:** Students who have been working with AI agents for three weeks now have experience without structure. Phase 2 requires them to bring structured thinking — the ability to write a spec that an engineer (or agent) can execute without additional clarification. Week 4 converts experience into specification discipline.

### Learning Goal

By end of Week 4, students will:
- Have a Phase 2 entry spec document that Phase 2 instructors can use directly on Day 1
- Understand the anatomy of a spec-driven development brief that AI agents can execute reliably
- Be able to distinguish a spec that produces reliable agent execution from one that produces inconsistent output
- Have synthesized their four weeks of lab artifacts into a coherent portfolio

### Weekly Schedule (8h 30m)

#### Video Block (1.5 hours)

**Video 4.1 — Required:** "Spec-Driven Development with AI Agents" (2024-2025)
- Find on: YouTube search "spec driven development AI 2025" or "ai agent test driven development specification"
- Watch time: ~40 minutes
- Focus: How to write specifications that AI agents can execute reliably, acceptance criteria patterns, interface contracts
- Viewing guide: (1) What makes a spec "executable" by an agent? Make a list of the specific elements (verbs, measurable outcomes, example cases). (2) Where does the spec author have to make a decision vs. leave it to the agent? (3) How do they handle ambiguity — do they resolve it in the spec or allow the agent to ask?

**Video 4.2 — Required:** "Production AI Workflow Review" (any practitioner retrospective, 2024-2025)
- Find on: YouTube search "claude code production workflow retrospective 2025" or "ai engineering workflow review"
- Watch time: ~30 minutes
- Focus: What actually works in production vs. what works in demos, real failure modes, team adoption patterns
- Viewing guide: (1) What surprised them about production use that demos did not predict? (2) What changed between their first CLAUDE.md and their current one? (3) What would they tell themselves 6 weeks ago?

**Video 4.3 — Optional:** "Advanced CLAUDE.md Patterns for Teams" (2024-2025)
- Watch time: ~25 minutes
- Focus: Multi-file CLAUDE.md, import syntax, team-wide vs. personal configuration
- Viewing guide: How do they handle disagreements between team members about what goes in CLAUDE.md?

#### Reading Block (1 hour)

**Re-read:** Module 12 (Capstone and Production Deployment)
- Focus: The five pipeline components (Trigger, Context Gathering, Decision Logic, Action Scope, Output Delivery), the agentic deployment checklist
- Task: Map your Lab 4 spec to all five pipeline components before writing.

**Re-read:** Module 04 (Prompt Engineering Depth) — Section 4.3 (Output Contracts)
- Focus: JSON schemas, field naming, the distinction between structural contracts and content contracts
- Task: Identify which components of your Phase 2 spec require output contracts and write them.

**Read (new):** Review your own Weeks 1–3 reflections
- Task: Identify the three most important things you learned across the four weeks. These become the opening of your Lab 4 spec's "Engineering Approach" section.

#### Lab Work (5 hours) — See Lab 4 Specification in Section 7

#### Reflection Deliverable (1 hour)

**Week 4 Phase 2 Readiness Statement** (800–1200 words)

This document serves double duty — it is the student's self-assessment AND the Phase 2 instructors' onboarding brief for that student.

Students write a document addressing:
1. **What I Can Now Do (Evidence-Based):** Three specific capabilities they have developed, with evidence from the labs. Not "I understand MCP" — "I built an MCP server with a GitHub integration that does X, and the schema design decision I made was Y because Z."
2. **What I Am Bringing to Phase 2:** A summary of their Lab 4 spec, including the system they want to build, the architecture they have chosen, and the open questions Phase 2 should resolve.
3. **My Biggest Technical Uncertainty:** The thing they most need Phase 2 to address. This tells instructors where to focus Day 1.
4. **What Almost Stopped Me:** One moment from the four weeks where they nearly disengaged. What kept them going? This is useful for cohort design feedback.

**Post to:** Course discussion board with tag `#week4-readiness` AND submit directly to instructors via LMS

### Unlock Concept: A good spec removes decisions, not just work

The Week 4 unlock is understanding that spec-driven development is not about doing less work — it is about making decisions at spec time rather than execution time. A spec that leaves decisions to the agent produces inconsistent output. A spec that makes every decision in advance produces reliable output. The discipline of "what decisions am I leaving implicit?" is the core skill of Phase 2. Students who arrive having asked this question about their own spec are Phase 2-ready.

Facilitators: "This week's unlock is that a spec does not tell the agent what to do — it tells the agent what decisions have already been made."

---

## 7. Lab Specifications

### Lab 1 — Stack Audit and CLAUDE.md Architecture

**Week:** 1
**Time:** 3 hours
**Prerequisite:** Student's real development project (codebase they work in regularly)
**Minimum Deliverable:** A CLAUDE.md committed to their real project repository

#### What Students Build

A production-grade CLAUDE.md that encodes their team's conventions, architecture decisions, and anti-patterns — one that their team could commit to their real project today and immediately benefit from.

#### Step 1: The Codebase Audit (45 minutes)

Students run Claude Code on their real codebase with the following audit prompt sequence:

```
Start Claude Code in your project root.

Prompt 1:
"Read the project structure and give me a codebase overview.
Focus on: what are the entry points, what is the test setup,
what package manager is in use, and what are the key directories."

Prompt 2 (after reviewing output):
"Now identify the three most common anti-patterns in this codebase —
things that appear in older code but should not be in new code.
Be specific: quote examples from actual files."

Prompt 3:
"What conventions does this codebase use for: naming (files, functions,
variables), imports, error handling, and async patterns?
Quote specific examples from the source files."
```

After each prompt: pause and note what the agent got right and what it missed. The gaps are exactly what your CLAUDE.md needs to fill.

#### Step 2: The Anti-Pattern Catalog (30 minutes)

Create a markdown file `.claude/antipatterns.md` that lists:
- At least 5 anti-patterns with examples from your actual code
- The correct pattern for each
- Why the anti-pattern exists (legacy decision, migration in progress, etc.)

This file will be imported into CLAUDE.md.

#### Step 3: CLAUDE.md Construction (60 minutes)

Build a CLAUDE.md using this template, filling every section with real content from your audit:

```markdown
# Project: [Name]

## Stack
- [Language and version]
- [Framework and version]
- [Key libraries with versions]
- [Test framework]
- [Package manager]

## Build and Test Commands
# What Claude must run to verify work is correct:
- Build: [exact command]
- Test all: [exact command]
- Test single file: [exact command pattern]
- Lint: [exact command]
- Type check: [exact command]

## Architectural Decisions
# Decisions already made that Claude should not re-litigate:
- [Decision and rationale]
- [Decision and rationale]

## Conventions
# Patterns that must match existing code (not just be "correct"):
- Naming: [specific rules]
- Imports: [absolute vs relative, barrel files, etc.]
- Error handling: [exact pattern with example reference]
- Async: [patterns in use, patterns to avoid]

## Anti-Patterns
@.claude/antipatterns.md

## What Claude Must NOT Do
- [Specific prohibition with rationale]
- [Specific prohibition with rationale]

## Verification Before Committing
1. [Step 1]
2. [Step 2]
```

**Rules for CLAUDE.md construction:**
- Every line must either: prevent a specific mistake OR communicate something Claude cannot infer from code
- No generic advice ("write clean code", "follow best practices")
- Every command must be runnable as-is in the project root
- Total length target: 150–300 lines (longer = lower adherence)

#### Step 4: The Skills Sprint (45 minutes)

Create at least 3 skill files in `.claude/skills/`:

**Skill 1: Code Review**
File: `.claude/skills/code-review/SKILL.md`
```yaml
---
name: code-review
description: Review code changes for quality, conventions, and anti-patterns
---
# Code Review Process
[Student fills in: their specific review checklist, severity taxonomy, output format]
```

**Skill 2: A recurring task specific to their codebase** (student designs this)
Examples: migration writing, API endpoint generation, test writing for their test framework

**Skill 3: Daily development workflow** (e.g., PR preparation, commit message writing, changelog generation)

#### Step 5: Validation (30 minutes)

Start a fresh Claude Code session and run 3 tasks that specifically test your CLAUDE.md:
1. Ask Claude to add a new feature using the wrong data-fetching pattern (one you listed in anti-patterns). Does it use the wrong pattern, or does it catch itself?
2. Ask Claude to write a test. Does it use your test framework, your naming conventions, and your assertion patterns?
3. Ask Claude to suggest a refactoring. Does it respect the architectural decisions you encoded?

Document the results. If Claude uses a wrong pattern, identify which CLAUDE.md line failed (missing, ambiguous, or buried).

#### Deliverable

- `CLAUDE.md` committed to real project repository
- `.claude/antipatterns.md` with at least 5 specific anti-patterns
- `.claude/skills/` with at least 3 skill files
- Validation test results documented in Week 1 reflection

---

### Lab 2 — MCP Integration Sprint

**Week:** 2
**Time:** 4 hours
**Prerequisite:** Lab 1 complete, Node.js/TypeScript installed, access to one real API or internal system
**Minimum Deliverable:** Working MCP server with at least 2 tools that successfully execute against a real system

#### What Students Build

An MCP server that automates one real repetitive task in their workflow. "Repetitive task" means something they do manually at least twice per week. The server must run against a real API or system — not a stub, not a mock, not localhost with fake data.

**Examples of viable tasks:**
- Creating Jira tickets with their team's required fields pre-populated
- Querying their database schema and running safe read queries
- Posting formatted summaries to their team's Slack channel
- Creating GitHub issues with labels, assignees, and milestone from a template
- Reading from and writing to their team's internal wiki or documentation system
- Querying their deployment system for service status

**Examples of tasks that are NOT viable (too trivial):**
- Reading local files (built into Claude Code)
- Running bash commands (built into Claude Code)
- Fetching public web pages (built into Claude Code)

#### Step 1: Design Before Code (30 minutes)

Complete this template BEFORE opening your editor:

```markdown
## MCP Server Design: [Name]

### Single Responsibility
This server handles: [one sentence describing the domain]
It does NOT handle: [list what you are explicitly excluding]

### Primitive Classification
For each capability, answer: is this a Tool, Resource, or Prompt?

| Capability | Primitive | Reasoning |
|------------|-----------|-----------|
| [capability] | Tool/Resource/Prompt | [why] |

### Tool Designs
For each Tool:
- Name: [verb-noun, e.g., create-ticket, query-schema]
- Description (what the LLM needs to know): [2-3 sentences]
- Required inputs: [name, type, description]
- Optional inputs: [name, type, description, default]
- Return format: [what Claude will receive]
- Error cases: [what can go wrong and how you'll communicate it]

### Authentication
- Credential type: [API key, OAuth token, etc.]
- Storage: [environment variable name]
- Scope: [minimum required permissions]

### Transport
- Type: stdio (local) — correct for this lab
```

#### Step 2: Environment Setup (20 minutes)

```bash
mkdir mcp-[server-name]
cd mcp-[server-name]
npm init -y
npm install @modelcontextprotocol/sdk
npm install typescript ts-node @types/node --save-dev
npx tsc --init
```

Set up your credentials as environment variables (never hardcoded):
```bash
export [YOUR_API_KEY_ENV_VAR]="your-key-here"
```

#### Step 3: Implement the Server (90 minutes)

Build your MCP server following the TypeScript SDK patterns from Module 06. The implementation must:

1. Follow single responsibility — one coherent domain per server
2. Have at least 2 tools with distinct purposes (not "create X" and "create X with different params")
3. Include proper error handling — structured error responses, not thrown exceptions
4. Have tool descriptions that contain enough information for Claude to use the tool correctly without additional context

Minimum viable server structure:
```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({
  name: "your-server-name",
  version: "1.0.0",
}, {
  capabilities: { tools: {} },
});

// Register tools with server.setRequestHandler(ListToolsRequestSchema, ...)
// Implement tools with server.setRequestHandler(CallToolRequestSchema, ...)

const transport = new StdioServerTransport();
await server.connect(transport);
```

#### Step 4: Test Before Connecting to Claude Code (30 minutes)

Use the MCP Inspector to validate your server before connecting it to Claude Code:

```bash
npx @modelcontextprotocol/inspector node dist/server.js
```

Verify:
- All tools appear in the inspector's tool list
- Each tool's schema is correct
- Calling each tool returns a real response (not an error)
- Error cases return structured errors, not thrown exceptions

Fix any issues before proceeding. Connecting a broken server to Claude Code and trying to debug through Claude's interface is significantly harder than fixing it in the Inspector.

#### Step 5: Connect to Claude Code (20 minutes)

Add to `.claude/settings.json`:
```json
{
  "mcpServers": {
    "your-server-name": {
      "command": "node",
      "args": ["/absolute/path/to/your/server/dist/server.js"],
      "env": {
        "YOUR_API_KEY_ENV_VAR": "${YOUR_API_KEY_ENV_VAR}"
      }
    }
  }
}
```

Start a new Claude Code session and verify:
- Claude can list your tools
- Claude can successfully call each tool
- Claude uses your tools when you describe tasks (not just when you name the tool explicitly)

#### Step 6: The Extension (30 minutes)

Add at least one Resource or Prompt to your server. This step tests whether you understand the primitive distinction beyond "just use Tools."

**If adding a Resource:** It should expose stable, structured data that Claude can read as context (e.g., your Jira project configuration, your Slack channel list, your database schema).

**If adding a Prompt:** It should encode a reusable interaction pattern (e.g., "create a bug report" that pre-fills the required fields with sensible defaults).

#### Deliverable

- Working MCP server source code in a repository (or at minimum, a directory the student can reference in Phase 2)
- Configured in `.claude/settings.json` with the server running
- Documentation: the design template from Step 1, completed
- At least 2 successful tool calls demonstrated in the Week 2 reflection

---

### Lab 3 — Agentic Workflow Audit

**Week:** 3
**Time:** 4 hours
**Prerequisite:** Labs 1 and 2 complete, comfort with Claude Code in daily use
**Minimum Deliverable:** One automated workflow running + documented decision rationale for two others

#### What Students Build

Students map three real workflows they currently do manually, assess each for agentic automation potential, build one of them, and document their decision-making for the others. The automated workflow should run by end of Week 3.

#### Step 1: Workflow Identification (30 minutes)

Identify three workflows from your actual work. Each must be:
- Something you actually do (not theoretical)
- Something you do at least once per week
- Something that currently takes 15+ minutes

For each workflow, complete a preliminary assessment:

```markdown
## Workflow: [Name]

### Current Steps
1. [Step]
2. [Step]

### Time Required (current): [minutes]
### Frequency: [times per week/month]
### Quality: [how often does the manual version have errors?]

### Agentic Potential Pre-Assessment
- Is the input well-defined? [yes/no]
- Are the steps deterministic given the input? [yes/no]
- Would a mistake be immediately detectable? [yes/no]
- Is the output consumed by a system (not just read by a human)? [yes/no]
```

#### Step 2: The Four-Question Framework (30 minutes)

Apply Module 09's four-question decision framework to each workflow:

**Question 1 — Context window:** Can the workflow fit in a single agent's context window, or does it require more than one agent's "brain"?

**Question 2 — Parallelism:** Are there subtasks that are genuinely independent and could run simultaneously?

**Question 3 — Specialization:** Do different subtasks require meaningfully different expertise or tool access that would benefit from separate agents?

**Question 4 — Error surface:** Would an error in one phase of the workflow contaminate the next phase, or are phases naturally isolated?

Based on this analysis, classify each workflow:
- **Single-agent** — one session, well-scoped prompt, skills
- **Orchestrated** — orchestrator + specialized sub-agents
- **Parallel fan-out** — orchestrator spawning independent parallel agents
- **Not yet ready for automation** — the workflow is not deterministic enough, or the error surface is too high

#### Step 3: Architecture Sketching (30 minutes)

For the workflow you will build, create an architecture sketch:

```markdown
## Workflow Architecture: [Name]

### Trigger
How does this run? [manual claude command / git hook / scheduled / event-triggered]

### Context Gathering
What does the agent need before it can reason?
- [Input 1]: source = [where it comes from]
- [Input 2]: source = [MCP tool / file / user input]

### Decision Logic
What decisions does the agent make?
- [Decision]: based on [what information]

### Action Scope
What can the agent do?
- Allowed: [specific actions]
- Forbidden: [explicit prohibitions — these become settings.json deny rules]

### Output Delivery
What does the agent produce?
- Format: [structured file / GitHub PR / Slack message / etc.]
- Destination: [where it goes]

### Success Criteria
How do I know it worked? [specific, testable criterion]

### Failure Handling
If the agent fails, what happens?
- [Failure mode]: [response]
```

#### Step 4: Build One Workflow (90 minutes)

Build the workflow you chose as "single-agent" (or the simplest multi-agent workflow if all three qualify). The implementation must include:

1. **A trigger mechanism** — a slash command, a CLAUDE.md-defined command, or a hook
2. **A TCEF-structured prompt or skill** — not an ad-hoc prompt
3. **A success verification step** — the agent checks its own output against the success criteria
4. **At least one approval gate** — a human-in-the-loop checkpoint before any irreversible action

Run the workflow at least three times before considering it done:
- Run 1: Does it work at all?
- Run 2: Does it produce the same output on the same input (consistency check)?
- Run 3: Does it handle the edge case you did not think about in Run 1?

#### Step 5: Document the Decisions Not Taken (30 minutes)

For the two workflows you chose NOT to build, write:
- The specific reason this workflow is not being built now
- What would need to be true for it to be ready for automation
- A preliminary design sketch so you have a starting point when you return to it

#### Step 6: The Meta-Prompting Check (30 minutes)

Run the generate-evaluate-improve loop from Module 08 on the skill or prompt you wrote for your automated workflow:

1. **Generate:** Show the prompt/skill to Claude and ask it to generate three alternative versions that might work better
2. **Evaluate:** Ask Claude to evaluate your original against the three alternatives using this prompt:
   ```
   Evaluate each of these four prompts (the original plus 3 alternatives) for:
   1. Specificity of the task description (1-5)
   2. Clarity of the constraints (1-5)
   3. Likelihood of consistent output across runs (1-5)
   4. Likelihood of the agent selecting the correct tool call sequence (1-5)
   Rate each and explain the highest-leverage difference between the best and worst.
   ```
3. **Improve:** Using the evaluation, rewrite your prompt/skill. What changed?

Document this loop in your Week 3 reflection.

#### Deliverable

- One automated workflow running (can be invoked and produces correct output)
- Skill file or TCEF prompt documented
- Decision rationale for the two workflows not built
- Meta-prompting loop documented (before, evaluation, after)

---

### Lab 4 — Phase 2 Entry Spec

**Week:** 4
**Time:** 5 hours
**Prerequisite:** Labs 1–3 complete, three weeks of real Claude Code use experience
**Minimum Deliverable:** A spec document that Phase 2 instructors can use to run a live build session on Day 1

#### What Students Build

A complete spec-driven development brief for a system they want to build in Phase 2. This is not a wish list or a design doc — it is a spec that contains enough information for an engineer (or agent) to start building immediately.

Phase 2 instructors will use this document as the kickoff for a live build session. Students who write vague specs will watch Phase 2 instructors ask clarifying questions for 30 minutes before building begins. Students who write precise specs will watch Phase 2 instructors build from the first minute.

#### Step 1: System Selection (30 minutes)

Choose one system to spec. Criteria for a good Phase 2 spec target:
- It solves a real problem you have (not a learning exercise)
- It uses at least one agentic pattern from Phase 1 (TCEF prompt, MCP tool, multi-agent)
- It is complex enough to take at least a day to build
- It is scoped enough that it could be demonstrated in a 2-hour session
- You have access to all the external systems it needs (APIs, databases, etc.)

Examples of appropriate scope:
- A code review automation pipeline that runs on PRs and posts structured feedback to GitHub
- A documentation generation system that creates API docs from annotated source code
- An issue triage agent that classifies incoming GitHub issues and routes them to the correct team
- A test generation system that writes test cases from function signatures and docstrings
- An MCP-powered workflow for their team's specific development process

Examples of scope problems:
- Too large: "An AI coding assistant for our entire platform" (unbounded)
- Too small: "A slash command to format my commit messages" (not complex enough for Phase 2)
- Not real: "A sample todo app with AI features" (no genuine problem solved)

#### Step 2: Spec Writing (3 hours)

Write the spec using this structure:

```markdown
# Phase 2 Build Spec: [System Name]

## Problem Statement
[2-3 sentences: what problem does this solve, for whom, and how do they experience it today]

## What Success Looks Like
[Specific, observable outcomes — not "works well" but "given input X, the system produces output Y"]

### Acceptance Criteria
- [ ] [Specific, testable criterion 1]
- [ ] [Specific, testable criterion 2]
- [ ] [Specific, testable criterion 3]
[At least 5 criteria — each must be falsifiable]

## System Architecture

### Trigger
[What initiates this system? Be specific: "A GitHub webhook fires when a PR is opened with the label 'needs-review'"]

### Context Gathering
[What information does the system need before it can act?]
- Input 1: [name, source, format]
- Input 2: [name, source, format]

### Decision Logic
[What decisions does the agent make? For each decision, specify the inputs and the possible outputs]

### Action Scope
[What can the system do?]
Allowed:
- [Specific permitted action]

Forbidden (and why):
- [Specific prohibited action]: [rationale — what could go wrong]

### Output Contract
[Exact format of what the system produces — if it writes to a file, show the schema; if it posts to an API, show the request structure]

## Agent Architecture Decision

### Chosen Pattern
[Single-agent / Orchestrator + sub-agents / Parallel fan-out]

### Reasoning
[Why this pattern? Apply the four-question framework from Module 09]

### Alternative Considered
[What pattern did you reject and why?]

## MCP Dependencies

### Servers Required
| Server | Purpose | Tools Used |
|--------|---------|------------|
| [server name] | [what it provides] | [specific tools] |

### Servers to Build
[If any MCP servers need to be built for this system, describe them — this is Lab 2 output reused]

## CLAUDE.md Requirements

### Project-Specific Rules This System Needs
[What must be in CLAUDE.md for this system to work correctly?]

### Skills Required
[What skill files does this system need? Describe the purpose of each]

## Security and Approval Gates

### Irreversible Actions
[List every action this system can take that cannot be undone]

### Approval Gates
[For each irreversible action, specify when and how human approval is required]

### Permission Configuration
[What should be in settings.json permissions.allow and permissions.deny?]

## Test Strategy

### Unit-Level
[How do you test individual components without running the full pipeline?]

### Integration-Level
[How do you test the full pipeline end-to-end without affecting production?]

### Success Verification
[The specific command or check that confirms the system worked correctly for a given run]

## Known Risks and Open Questions

### Technical Risks
[What could go wrong that you do not know how to handle yet?]

### Open Questions for Phase 2
[Questions you need Phase 2 instructors/peers to help answer — be specific]

## Build Sequence (Suggested)

### Day 1 (Phase 2) Target
[What should be working by end of Day 1? This is what Phase 2 Day 1 will aim to demonstrate]

### Day 2-3 Target
[What gets added in days 2-3?]

## Artifacts Brought from Async Period
- CLAUDE.md: [describe what you built in Lab 1]
- MCP Server: [describe what you built in Lab 2]
- Workflow Pattern: [describe what you built in Lab 3]
```

#### Step 3: Spec Review (1 hour)

Before submitting, review your spec against these criteria:

**The Phase 2 Day 1 Test:** Could Phase 2 instructors start a Claude Code session right now and build from this spec, with zero clarifying questions from you? If not, find the ambiguities and resolve them.

**The Acceptance Criteria Test:** For each acceptance criterion, can you write a test that would definitively confirm it passes or fails? If you cannot write the test, the criterion is not specific enough.

**The Decision Test:** For each decision in the spec, have you already made the decision or are you leaving it to Phase 2? Every decision you leave to Phase 2 is a question the build session will have to answer. Some questions are genuinely for Phase 2. Most can be resolved now.

**The Ambiguity Audit:** Highlight any sentence containing words like "appropriate," "suitable," "good," "correct," or "proper" without further specification. These are ambiguity markers. Replace them with specific criteria.

#### Step 4: Portfolio Synthesis (30 minutes)

Add an "Artifacts from Async Period" section to your spec that links to:
- Your CLAUDE.md (committed to your real repository)
- Your MCP server (with the location/URL)
- Your automated workflow (with instructions to run it)
- Your three weeks of reflections (links to posts)

This portfolio is the evidence that demonstrates Phase 2 readiness.

#### Deliverable

- Completed spec document (submitted to instructors and posted to discussion board)
- Phase 2 Readiness Statement (Week 4 reflection — see Section 6)
- Portfolio synthesis in the spec

---

## 8. Video Library with Viewing Guides

> **This section now references the master library document rather than maintaining video lists inline.**
>
> All video assignments, structured courses, alternates, disqualification logs, accuracy flags, and instructor action items are maintained in:
>
> **[`docs/async-curriculum/VIDEO-LIBRARY-MASTER.md`](VIDEO-LIBRARY-MASTER.md)**
>
> The master library was synthesized from five parallel research passes (March 2026) covering 50+ videos across all four curriculum weeks. It is the single source of truth for all video decisions.

### What the Master Library Contains

| Section | Contents |
|---------|----------|
| Certificate Pathway | Anthropic Academy 4-course developer track (Weeks 1–3, Certificates #1–#4) |
| Structured Courses | DeepLearning.AI course assignments by specific lesson |
| Week 1 Primary Videos | 3 confirmed picks with full viewing guides |
| Week 2 Primary Videos | 3 confirmed picks + mandatory Mahesh Murag caveat |
| Week 3 Primary Videos | 3 confirmed picks with full viewing guides |
| Week 4 Primary Videos | 3 confirmed picks + THE GAP section (spec-driven screencast needed) |
| Alternates | 2–3 alternates per week with use-when guidance |
| Accuracy Notes | Per-week SSE and red-line status for all assigned videos |
| Disqualification Log | All rejected videos with reasons |
| Instructor Action Items | 8 items, priority-ordered (1 = must do before launch) |
| Update Cadence | Recommended re-evaluation schedule |

### Key Findings Summary (from master library)

**The Certificate Pathway (NEW — March 2026 discovery):**
Anthropic Academy launched in March 2026 with 13 free courses. Four map directly to Weeks 1–3. Students who complete all four earn official Anthropic certificates. This is the credential pathway for the entire curriculum.

**Week 4 Gap (confirmed across all 5 research passes):**
No video exists demonstrating a complete spec-driven development workflow using Claude Code CLI. An instructor-recorded screencast is the highest-priority pre-launch item. The master library contains a detailed content outline for this screencast.

**Critical accuracy flag:**
The Mahesh Murag MCP Workshop (~325K views, from MCP's co-creator) has an SSE accuracy issue at ~73:00–79:00. Students will find this video organically. The master library contains a mandatory caveat block that must appear in any student-facing reference to this workshop.

**Top-scoring videos:**
- DeepLearning.AI Agent Skills course (9.75/10) — highest-rated course
- No Vibes Allowed — Dex Horthy (9.5/10) — highest-rated individual YouTube video for Week 1
- Sean Grove "The New Code" (9.5/10) — highest-rated Week 4 video
- DeepLearning.AI MCP course (9.5/10) — highest-rated Week 2 resource

### Accuracy Policy (preserved here for quick reference)

Zero-tolerance red lines that disqualify any video regardless of other scores:
- `--thinking` flag — does not exist in Claude Code CLI
- `/memory` command — not native Claude Code
- SSE as the current remote MCP transport — deprecated March 26, 2025
- MCP primitive count other than THREE (Tools, Resources, Prompts)
- CLAUDE.md described as an invokable command rather than a file read at session start

---

## 9. Facilitator Notes

### Weekly Cadence

Each week follows this rhythm from the facilitator's perspective:

**Monday:** Post the weekly intro message (see templates below). This is the single highest-leverage action. A strong intro message that names the unlock concept and creates anticipation generates significantly higher completion rates than a neutral "here is your content for the week."

**Wednesday:** Check discussion board for Week's reflection tags. Post 2-3 substantive responses to student reflections. Substantive means engaging with their specific situation — not "great work!" Respond to the failure story in their reflection, not the success story.

**Friday:** Post a "Week in Review" message that surfaces 2-3 insights from student reflections. This creates social proof that others are doing the work and makes visible the quality bar for reflections.

**Sunday:** Send a private message to any student who has not posted a reflection. Do not mention completion or grades. Say: "I noticed you did not post this week — is there something blocking you? I can help."

### Weekly Intro Message Templates

**Week 1 Intro:**
"Welcome to Week 1. Phase 1 gave you concepts. This week is about turning them into muscle memory.

Your CLAUDE.md is the most important file you will create this week. Not because it is in the lab spec — because it is the difference between an agent that knows your codebase and one that knows about codebases. That gap is everything.

This week's unlock: treat CLAUDE.md as code, not documentation. Every line that does not prevent a specific mistake is noise that buries the lines that do. By Friday, I want you to have removed at least as many lines as you added.

Your lab is in [link]. Your first reflection is due Sunday. Post it with #week1-reflection.

One last thing: when Claude does something wrong this week, do not correct it — update your CLAUDE.md so it cannot do it again. This is the discipline."

**Week 2 Intro:**
"Welcome to Week 2. You understand MCP. Now you build it.

The thing most engineers do wrong in their first MCP server is writing code before thinking about the schema. The schema is not documentation. It is the interface through which Claude selects your tool. A description that is one sentence vague produces a tool Claude uses inconsistently. This week you will feel the difference.

This week's unlock: the tool description IS the interface. You are not writing for humans. You are writing for an LLM making selection decisions in milliseconds.

Your lab is in [link]. One rule: no stubs, no mocks. Your server talks to a real system or it does not count."

**Week 3 Intro:**
"Welcome to Week 3. This is where the ceiling changes.

Weeks 1 and 2 built single-agent patterns. This week you start thinking at the system level — where single agents fit, where multi-agent patterns are justified, and where agentic automation creates more risk than it removes.

The key question this week is not 'can I automate this?' It is 'should I automate this, and if yes, what does failure look like?'

This week's unlock: reliability does not come from better prompting. It comes from system design — hooks, approval gates, output contracts, structured verification. An agent that is 90% reliable can become 99% reliable without changing the prompt.

Your lab is in [link]."

**Week 4 Intro:**
"Welcome to Week 4. This is the capstone.

Everything you built in Weeks 1–3 is raw material for what you write this week. Your Phase 2 entry spec is not a design document — it is a build document. The test is simple: could Phase 2 instructors open a Claude Code session right now and build from your spec, without asking you a single question?

This week's unlock: a good spec removes decisions, it does not just remove work. Every decision you leave implicit in your spec is a question Phase 2 will have to answer in real time. Make as many decisions as you can now. Name the ones you genuinely cannot make yet — those become your open questions for Day 1.

Your lab is in [link]. Your Phase 2 Readiness Statement is due Sunday. Phase 2 instructors will read it before Day 1."

### Responding to Common Student Problems

**Problem: "My CLAUDE.md is getting really long"**
Response: "Good — that means you are noticing things. Now go through it line by line and delete anything that Claude already does correctly without the instruction. Run the test: start a fresh session, give Claude a task, and see which lines in your CLAUDE.md would have been needed. Cut the rest."

**Problem: "My MCP server runs but Claude does not use it"**
Response: "Two likely causes: the tool description is too vague for Claude to recognize when to apply it, or the server is not correctly listed in your settings.json. Start with /mcp in a Claude session to confirm the server is connected. Then check your tool descriptions — they should explain not just what the tool does but when to use it."

**Problem: "I cannot find a workflow to automate for Lab 3"**
Response: "You are looking for something fancy. Look for something boring — the repetitive thing you do every week that you have learned to do without thinking. Those are the best automation targets because they are well-understood and have predictable inputs. Ask yourself: what do I do every week that I could write a checklist for? That is your target."

**Problem: "My Phase 2 spec feels too simple"**
Response: "Simple specs that are complete are far more valuable than complex specs that are vague. The question is not complexity — it is completeness. Can Phase 2 instructors build from it on Day 1 without asking you questions? If yes, the spec is good. If not, find the gap."

**Problem: "I am behind on the labs"**
Response: "Which lab are you on? All labs build on each other, but Labs 1 and 2 are the foundation. If you have not finished Lab 1, everything else is harder. Let us figure out what is blocking you specifically."

---

## 10. Phase 2 Readiness Criteria

### How Instructors Assess Readiness

Phase 2 readiness is not a grade. It is a binary assessment: can this student benefit from Phase 2, or do they need more time in the async period first?

### Objective Criteria (Must Have All)

**Artifact Criteria:**
- [ ] A CLAUDE.md committed to a real project repository (not a sample)
- [ ] The CLAUDE.md encodes at least 3 team-specific conventions that Claude would not know from training data
- [ ] A working MCP server with at least 2 tools that successfully call a real external system
- [ ] One automated workflow running (can be invoked and produces consistent output)
- [ ] A Phase 2 entry spec with at least 5 falsifiable acceptance criteria

**Reflection Criteria:**
- [ ] All 4 weekly reflections posted
- [ ] At least 2 reflections include a specific failure — what went wrong and what they changed
- [ ] The Week 4 Phase 2 Readiness Statement addresses all 4 required questions

### Qualitative Criteria (Instructor Judgment)

**Signal: Student is ready**
- Their reflections describe specific failures and specific fixes (not just successes)
- Their CLAUDE.md has been edited multiple times (visible in git history)
- Their Phase 2 spec describes what can go wrong, not just what should happen
- They ask questions in the discussion board that reveal they have tried something before asking

**Signal: Student needs more time**
- Their reflections describe what they learned (theoretically) but not what changed in their practice
- Their CLAUDE.md is a template with their project name filled in
- Their Phase 2 spec describes what they want to build but not how
- They ask questions in the discussion board before attempting the work

### The Phase 2 Entry Conversation

For students near the readiness threshold, facilitators should conduct a 15-minute conversation covering:
1. "Walk me through one thing that did not work this month and what you changed." — Looking for: specific failure, specific diagnosis, specific fix
2. "Show me your MCP server and describe one design decision you made." — Looking for: understanding of why they made the decision, not just what they built
3. "What is the riskiest thing about your Phase 2 spec?" — Looking for: awareness of the hard parts, not just the easy parts

Students who cannot answer these questions concretely are not Phase 2-ready regardless of artifact completion.

---

## 11. Async Engagement Strategy

### What Research Says About Completion in Async Technical Programs

The research on async technical program completion consistently identifies three primary completion drivers:

**Driver 1: Progressive artifact with real stakes.**
Programs where students build something they actually care about completing (because it will be used, shown, or evaluated) have completion rates 2–3x higher than programs where students complete exercises. The async labs are designed around this principle — every artifact has a real use (CLAUDE.md goes in their repo, the MCP server runs in their stack, the Phase 2 spec is used on Day 1).

**Driver 2: Social proof of completion.**
Students who see peers posting reflections, asking questions, and sharing failures are significantly more likely to complete than students working in isolation. The weekly reflection + discussion board rhythm creates this visibility. Facilitators amplify it by sharing insights from reflections (with permission) in the Friday wrap-up.

**Driver 3: Low friction at the start.**
Completion studies consistently show that the decision to engage or disengage happens in the first 10 minutes of a work session. Programs that start with a 5-minute orienting task before the "real work" have higher completion. Each lab starts with a 15–30 minute structured step before students touch code.

### Engagement Mechanics Built Into This Curriculum

**The "show your work" norm.** Every reflection asks students to paste actual content from their labs (a CLAUDE.md section, a tool description, a prompt before and after). This is not optional — it is the reflection. This creates quality pressure without grading pressure.

**The failure story requirement.** Weeks 2 and 3 reflections explicitly ask for "The Error You Did Not Expect" and "The Failure Mode You Fear." This normalizes failure as evidence of engagement, not evidence of inadequacy. It also creates the most useful discussion board content — failure stories teach more than success stories.

**The Phase 2 stake.** Students know Phase 2 instructors will read their Week 4 spec before Day 1. This creates a real external deadline with real consequences (not a grade — the Phase 2 experience itself). Students who write vague specs experience this on Day 1 when instructors ask clarifying questions.

**The portfolio arc.** Each lab's output feeds the next lab. By Week 4, students can see what they built across the period. This makes the accumulated effort visible, which is a significant motivator for completing the final week.

### Interventions for Low Engagement

**Early warning signal:** No reflection posted by Wednesday (for the prior Sunday deadline). This is the most reliable predictor of dropout.

**First intervention (Wednesday of Week 2):** Private message — not about completion, about content. "I read your Week 1 reflection. I noticed you mentioned [specific thing]. What happened after that?"

**Second intervention (Friday of Week 3):** Facilitator calls or voice note. "I am going around and talking to everyone before Week 4. When is a good time for 10 minutes?"

**Structural support:** Offer to review a Lab draft mid-week (not at the end). Students who get feedback on incomplete work are significantly more likely to finish than students who submit and wait.

### What Not To Do

**Do not use grade pressure.** This cohort is made of professional engineers. Grade pressure activates the wrong motivation system (avoiding failure vs. building capability). The stakes are real and external — use those.

**Do not extend deadlines liberally.** Every extension signals that deadlines are not real. One extension for one student with a documented reason is fine. Extensions for everyone because the cohort is running slow signals that the curriculum is not working and the deadlines are negotiable.

**Do not overload the discussion board with content.** One facilitator post per day maximum. If the discussion board feels like homework to read, students stop reading it.

**Do not post generic encouragement.** "Great work everyone!" is ignored. "I read three reflections this week that described the same problem with CLAUDE.md getting too long. Here is what one student did that worked..." creates engagement.

---

*Document version: 1.0*
*Audience: Curriculum designers and instructors*
*This document is a standalone reference — someone who has not attended the program should be able to run it from this document without additional guidance.*
