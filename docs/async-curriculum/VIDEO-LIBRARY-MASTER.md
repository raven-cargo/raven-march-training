# Master Video Library — Agentic AI Engineering Async Curriculum

**Synthesized:** 2026-03-18
**Source passes:** 5 (VIDEO-LIBRARY-RESEARCH.md, ADVANCED-AND-SPEC-DRIVEN.md, INDEPENDENT-CREATORS.md, AI-ENGINEER-SUMMIT.md, COURSES-AND-PLAYLISTS.md)
**Total videos evaluated:** 50+ across all passes
**Videos confirmed for primary use:** 12 (3 per week)
**Structured courses:** 8 (Anthropic Academy + DeepLearning.AI)

---

## Overview

This document is the authoritative source for all video and structured course assignments in the Agentic AI Engineering async bridge curriculum. It supersedes the inline video lists in ASYNC-BRIDGE-CURRICULUM.md Section 8.

### How This Is Organized

1. **Certificate Pathway** — Anthropic Academy courses that run alongside Weeks 1–3, earning official credentials
2. **Structured Courses** — DeepLearning.AI courses assigned by specific lesson, not "do the whole course"
3. **Week 1–4 Sections** — 3 primary videos per week (embed in HTML pages) + 1–2 alternates
4. **Disqualification Log** — All rejected videos with reasons
5. **Instructor Action Items** — Ordered by priority; must complete before course launch

### Accuracy Policy

**Zero-tolerance red lines** (any violation = automatic disqualification):
- `--thinking` flag — does not exist in Claude Code CLI
- `--context` flag — does not exist in Claude Code CLI
- `/memory` command — not native Claude Code
- SSE as the current remote MCP transport — deprecated March 26, 2025; correct standard is Streamable HTTP
- MCP primitive count other than THREE (Tools, Resources, Prompts)
- CLAUDE.md described as an invokable command rather than a file read at session start

### Update Cadence

See the [Update Cadence](#update-cadence) section at the end of this document.

---

## Certificate Pathway — Anthropic Academy (Weeks 1–3)

**Discovery:** Anthropic launched an official developer academy on Skilljar in March 2026 with 13 free courses. Four courses map directly to the curriculum arc and are the credential path for this course.

**All four courses are:**
- Free (Skilljar account required, no Anthropic subscription)
- Available on Coursera as alternates
- First-party Anthropic content (zero confabulation risk for Claude-specific claims)
- Certificate-awarding — students earn sharable credentials

### The Four-Course Developer Track

| Course | Skilljar URL | Coursera URL | Curriculum Week | Certificate |
|--------|-------------|--------------|-----------------|-------------|
| Claude Code in Action | https://anthropic.skilljar.com/claude-code-in-action | https://www.coursera.org/learn/claude-code-in-action | Week 1 | Cert #1 |
| Introduction to Model Context Protocol | https://anthropic.skilljar.com/introduction-to-model-context-protocol | https://www.coursera.org/learn/introduction-to-model-context-protocol | Week 2 | Cert #2 |
| Model Context Protocol: Advanced Topics | https://anthropic.skilljar.com/model-context-protocol-advanced-topics | https://www.coursera.org/learn/model-context-protocol-advanced-topics | Week 2 | Cert #3 (conditional — see accuracy note below) |
| Introduction to Agent Skills | https://anthropic.skilljar.com/introduction-to-agent-skills | (search Coursera for "Anthropic Agent Skills") | Week 3 | Cert #4 |

### What Each Course Covers

**Claude Code in Action (Week 1, ~1 hour)**
Topics: Coding assistant architecture, tool use system, context management, visual communication workflows, custom automation and commands, MCP server integration, GitHub workflow automation, planning modes.
Published: January 2026.
Scores: Recency 9/10, Accuracy 10/10, Longevity 9/10, Depth 7/10. Average: **8.75/10**

Student-facing assignment:
> "Complete the full Claude Code in Action course and share your certificate screenshot to the cohort channel by end of Week 1. This is the only resource in the curriculum that awards an official Anthropic certificate for Claude Code specifically — treat it as the Week 1 checkpoint artifact."

**Introduction to Model Context Protocol (Week 2, duration TBD)**
Topics: MCP architecture and design principles, transport-agnostic communication, Python SDK server development, built-in MCP Server Inspector, Resource/Tool/Prompt primitive selection strategies, autocomplete integration patterns.
Published: March 2026.
Scores: Recency 10/10, Accuracy 9/10, Longevity 9/10, Depth 8/10. Average: **9.0/10**

Student-facing assignment:
> "Complete 'Introduction to Model Context Protocol' before the Week 2 lab. This earns your second official Anthropic certificate. The three-primitive coverage here (Tools, Resources, Prompts — with guidance on when to use each) is the prerequisite for the Lab 2 design phase."

**Model Context Protocol: Advanced Topics (Week 2, duration TBD)**
Topics: Sampling implementation, progress notifications, roots-based file access control, JSON message architecture, stdio transport handshakes, Streamable HTTP transport, production scaling.
Published: March 2026.
Scores: Recency 10/10, Accuracy **7/10 CONDITIONAL**, Longevity 8/10, Depth 9/10. Average: **8.5/10 CONDITIONAL**

> ⚠️ **ACCURACY CONCERN — INSTRUCTOR PREVIEW REQUIRED BEFORE ASSIGNING:**
> The course description mentions "Streamable HTTP transport with Server-Sent Events" together. The MCP spec (March 26, 2025) replaced the standalone SSE transport with Streamable HTTP. If the course correctly treats SSE as a sub-mechanism *within* Streamable HTTP (acceptable), it passes. If it presents SSE as equivalent to or interchangeable with Streamable HTTP as a standalone option (fails accuracy test), demote to EXCLUDED. This is a priority-1 instructor action item. Certificate #3 is conditional on this review passing.

Student-facing assignment (if accuracy verified):
> "After completing your own MCP server in the Week 2 lab, revisit the Advanced Topics course — specifically the sampling section (MCP servers that can themselves call Claude) and the production scaling section. These prepare you for Week 4 deployment discussions."

**Introduction to Agent Skills (Week 3, duration TBD)**
Topics: Skills vs. Tools/MCP/Subagents distinction, exploring pre-built skills, creating custom skills, skills with Claude API, skills with Claude Code CLI, skills with Claude Agent SDK.
Published: Approximately January–March 2026 (confirm exact date).
Scores: Recency 10/10, Accuracy 10/10, Longevity 10/10, Depth 9/10 (estimated from COURSES-AND-PLAYLISTS.md). Average: **9.75/10**

Student-facing assignment:
> "Complete 'Introduction to Agent Skills' — the taxonomy lesson that explains when to use Skills vs. MCP vs. Subagents is the most important architectural lesson in the entire Week 3 package. Earn Certificate #4 and bring your completed certificate set to Phase 2."

### Certificate Pathway Summary

```
Week 1 → Claude Code in Action → Certificate #1
Week 2 → Intro to MCP → Certificate #2
Week 2 → MCP Advanced Topics → Certificate #3 (pending accuracy review)
Week 3 → Intro to Agent Skills → Certificate #4
```

By end of Week 3, students completing the certificate pathway hold 3–4 official Anthropic credentials. These are LinkedIn-shareable and employer-recognizable.

---

## Structured Courses (Non-YouTube)

These courses are assigned by **specific lesson**, not "complete the whole course." All are free.

### Week 1 — DeepLearning.AI Claude Code Course

```
Title: Claude Code: A Highly Agentic Coding Assistant
Provider: DeepLearning.AI (co-produced with Anthropic)
URL: https://learn.deeplearning.ai/courses/claude-code-a-highly-agentic-coding-assistant/
Instructor: Elie Schoppik, Head of Technical Education at Anthropic
Published: August 5, 2025
Duration: 1 hour 50 minutes (10 video lessons)
Free: Yes
Scores: 8.75/10
```

**Week 1 assignment (specific lessons only):**
> "Watch Lesson 4 (Setup & Codebase Understanding, 14 min) and Lesson 7 (Adding Multiple Features Simultaneously, 11 min). In Lesson 7, focus on the git worktrees + parallel subagent pattern — this is the aha moment that changes how you think about Claude Code. Lesson 8 (GitHub Integration & Hooks, 10 min) is optional but strongly recommended before the Week 1 hooks lab."

### Week 2 — DeepLearning.AI MCP Course (Primary Lab Companion)

```
Title: MCP: Build Rich-Context AI Apps with Anthropic
Provider: DeepLearning.AI (co-produced with Anthropic)
URL: https://learn.deeplearning.ai/courses/mcp-build-rich-context-ai-apps-with-anthropic/
Instructor: Elie Schoppik, Head of Technical Education at Anthropic
Published: May 14, 2025
Duration: ~99 minutes (13 lessons)
Free: Yes
Scores: 9.5/10 — HIGHEST RATED RESOURCE IN RESEARCH
```

**Week 2 assignment:**
> "Watch Lessons 1–8 in order before starting Lab 2. Lesson 8 specifically covers prompt templates as a primitive — this is the concept most practitioners miss. Lessons 9–11 cover deployment and are recommended before Week 4. Skip the Appendix (reference material only)."

### Week 3 — DeepLearning.AI Agent Skills Course

```
Title: Agent Skills with Anthropic
Provider: DeepLearning.AI (co-produced with Anthropic)
URL: https://www.deeplearning.ai/short-courses/agent-skills-with-anthropic/
Instructor: Elie Schoppik, Head of Technical Education at Anthropic
Published: January 26, 2026
Duration: 2 hours 19 minutes (10 video lessons + quiz)
Free: Yes
Scores: 9.75/10 — HIGHEST RATED COURSE IN RESEARCH
```

**Week 3 assignment (specific lessons):**
> "Watch Lesson 5 (Skills vs. Tools, MCP, and Subagents) before the Week 3 lab kickoff — this is the prerequisite taxonomy for the entire week. Then complete Lessons 7 and 9 (Creating Custom Skills + Skills with Claude Code) as your primary lab companion. Lessons 8 and 10 (Skills with API and Agent SDK) are recommended reading for Week 4."

### Week 3 — DeepLearning.AI Agent Evaluation Course

```
Title: Evaluating AI Agents
Provider: DeepLearning.AI (co-produced with Arize AI)
URL: https://www.deeplearning.ai/short-courses/evaluating-ai-agents/
Instructors: John Gilhuly and Aman Khan, Arize AI
Published: February 17, 2025
Duration: 2 hours 16 minutes (15 lessons + 6 code labs + quiz)
Free: Yes
Scores: 8.25/10
Note: Course uses Arize Phoenix tooling; principles are transferable to any tooling.
```

**Week 3 assignment (targeted lessons):**
> "Watch Lessons 2 (Evaluation in the time of LLMs) and 3 (Decomposing agents) as conceptual prep. Lessons 9–10 (trajectory evaluations) are the core Week 3 evaluation concepts. Lesson 13 (Improving your LLM-as-a-judge) is required before Phase 2. Skip the Arize-specific setup in Labs 1–2 if you're not using Arize; focus on the principles in the lesson videos."

### Week 4 — Andrew Ng Agentic AI Course

```
Title: Agentic AI
Provider: DeepLearning.AI
URL: https://www.deeplearning.ai/courses/agentic-ai/
Instructor: Andrew Ng
Published: September 23, 2025
Duration: Self-paced; 5 modules + capstone
Free: Yes (audit; Pro adds labs)
Scores: 8.75/10
```

**Week 4 assignment (specific modules):**
> "Complete Module 4 (Practical Tips for Building Agentic AI) as your Week 4 preparation. Review Module 5 (Planning and Multi-Agent Systems) as a synthesis of Weeks 1–3. The Capstone (Research Agent) is optional but recommended for students who want a worked example of evaluation-driven development."

---

## Week 1 — Consolidation and Depth

*Topic focus: CLAUDE.md, context engineering, session discipline, TCEF prompting, Claude Code workflow internals.*

---

### Primary Videos (embed these 3)

---

**PRIMARY 1.1**

```
Title: Mastering Claude Code in 30 minutes
Channel: Anthropic (official)
URL: https://www.youtube.com/watch?v=6eBSHbLKuN0
Published: May 22, 2025 (Code with Claude conference)
Duration: ~30 minutes
Speaker: Boris Cherny, Head of Claude Code at Anthropic
Scores: Recency 9, Accuracy 10, Longevity 9, Depth 9 — Average: 9.25/10
Confirmed across: VIDEO-LIBRARY-RESEARCH.md (primary), COURSES-AND-PLAYLISTS.md (conference archive)
```

**Viewing Guide:**
- Watch for: (1) The Explore→Plan→Confirm→Code→Commit loop as the canonical workflow. (2) How CLAUDE.md at-mentions work for bringing resources into context. (3) Git worktrees + TMUX for parallel sessions.
- Key concept: "Context management is the core skill" — Boris frames every technique as a way to control what Claude knows and when.
- Skip: Installation walkthrough (students have Claude Code from Phase 1).
- Best timestamps: CLAUDE.md and context techniques (middle third); SDK scripting and parallel sessions (final third).

---

**PRIMARY 1.2**

```
Title: No Vibes Allowed: Solving Hard Problems in Complex Codebases
Channel: AI Engineer
URL: https://www.youtube.com/watch?v=rmvDxxNubIg
Published: December 2, 2025
Duration: 20 minutes 31 seconds
Speaker: Dex Horthy, CEO of HumanLayer
Views: 377,000+
Scores: Recency 10, Accuracy 9, Longevity 9, Depth 10 — Average: 9.5/10
Confirmed across: ADVANCED-AND-SPEC-DRIVEN.md (primary Video 2), AI-ENGINEER-SUMMIT.md (Video 2, confirmed)
```

**Viewing Guide:**
- Watch for: (1) The "dumb zone" — how context utilization above ~40% degrades Claude performance. (2) Why "vibes" (chatting without a plan) produce slop in complex codebases. (3) The RPI (Research-Plan-Implement) workflow as a template for CLAUDE.md-guided sessions.
- Key concept: "Frequent intentional compaction" — deliberately compacting context at phase boundaries, not waiting for the context window to fill naturally.
- Skip: Rust codebase specifics in the last 4 minutes (treat as an example, not Rust-specific instruction).
- Best timestamps: Dumb zone ~4:00; RPI workflow ~7:00; compaction technique ~13:00.

---

**PRIMARY 1.3**

```
Title: Claude Code Complete Guide — Best Strategies
Channel: Cole Medin (Dynamous AI)
URL: https://www.youtube.com/watch?v=amEUIuBKwvg
Published: August 29, 2025
Duration: ~45–60 minutes (estimated)
Views: 110,534+
Scores: Recency 9, Accuracy 8, Longevity 9, Depth 9 — Average: 8.75/10
Confirmed across: VIDEO-LIBRARY-RESEARCH.md (primary), COURSES-AND-PLAYLISTS.md (conference archive reference)
```

**Viewing Guide:**
- Watch for: (1) The PRP (Product Requirements Prompt) framework for context engineering. (2) Hooks JSON configuration in `.claude/hooks/` with PostToolUse examples. (3) How subagents are defined as markdown files in `.claude/agents/`.
- Key concept: "Context engineering is the new vibe coding" — structured context management is what separates production workflows from toy demos.
- Skip: MCP installation walkthrough (Week 2 covers this in greater depth).
- Best timestamps: CLAUDE.md section, Hooks section, PRP section (first two-thirds of video).

**Accuracy note for 1.3:** Before assigning, preview the MCP transport section. If SSE is presented as current for remote servers (deprecated March 26, 2025), instruct students to skip that specific segment. This is Instructor Action Item #3.

---

### Alternates — Week 1

**ALTERNATE 1A**
```
Title: Claude Code: Anthropic's Agent in Your Terminal (Latent Space podcast interview)
Channel: Latent Space
URL: https://youtu.be/zDmW5hJPsvQ
Published: May 7, 2025 | Duration: ~71 minutes
Speakers: Cat Wu (PM), Boris Cherny (Lead Engineer, Claude Code)
Scores: 8.75/10
```
Use when: Students want a deeper architectural discussion with the builders. Covers CLAUDE.md design rationale, autocompact mechanism, and Unix philosophy. Best timestamps: CLAUDE.md ~39:44; autocompact ~45:00; multi-agent ~52:00.

**ALTERNATE 1B**
```
Title: Context Engineering 101: The Simple Strategy to 100× AI Coding
Channel: Cole Medin
URL: UNVERIFIED — search YouTube for "Cole Medin Context Engineering 101 PRP"
Published: July 25, 2025 (per X announcement)
Scores: 8.5/10 (URL requires verification before assigning)
```
Use when: Students need a focused context engineering explainer separate from the full Claude Code guide. PRP framework is backed by a companion GitHub repo (coleam00/context-engineering-intro).

**ALTERNATE 1C**
```
Title: Claude Code Best Practices (Code with Claude 2025)
Channel: Anthropic (official)
URL: https://www.youtube.com/watch?v=gv0WHhKelSE
Published: May 22, 2025 | Duration: ~30 minutes
Scores: 8.75/10
```
Use when: Students want additional Anthropic-first-party Week 1 content; covers /code-review slash command, 100–200 line CLAUDE.md discipline rule, writer/reviewer multi-agent pattern.

---

### Accuracy Notes — Week 1

No confirmed accuracy violations in Week 1 primaries. The Cole Medin video (1.3) has one accuracy risk in the MCP section; see instructor action items. The Dex Horthy video correctly describes CLAUDE.md as a context file, not an invokable command.

---

## Week 2 — MCP and Real Integration

*Topic focus: MCP server architecture, building tools/resources/prompts, wiring servers into Claude Code, transport layer, remote MCP patterns.*

---

### Primary Videos (embed these 3)

---

**PRIMARY 2.1**

```
Title: MCP 201: The Power of the Protocol (Code with Claude 2025)
Channel: Anthropic (official)
URL: https://www.youtube.com/watch?v=HNzH5Us1Rvg
Published: May 22, 2025 | Duration: 26 minutes 31 seconds
Speaker: David Soria Parra, Member of Technical Staff at Anthropic (MCP spec contributor)
Scores: Recency 9, Accuracy 10, Longevity 9, Depth 9 — Average: 9.25/10
Confirmed across: VIDEO-LIBRARY-RESEARCH.md (primary), COURSES-AND-PLAYLISTS.md (conference archive)
```

**Viewing Guide:**
- Watch for: (1) How MCP servers compose and chain. (2) The three-primitive distinction: Tools (model invokes), Resources (model reads), Prompts (pre-packaged templates). (3) Real production examples from Sourcegraph and Anthropic's own toolchain.
- Key concept: MCP is not a "plugin system for Claude" — it is a universal protocol. Any client that speaks MCP can use your server.
- Skip: Nothing — 26 minutes is appropriate.
- Best timestamps: Three primitives ~8:00; composability and real-world examples (final third).

---

**PRIMARY 2.2**

```
Title: Building Headless Automation with Claude Code (Code with Claude 2025)
Channel: Anthropic (official)
URL: https://www.youtube.com/watch?v=dRsjO-88nBs
Published: July 31, 2025 | Duration: ~25–30 minutes
Speaker: Sedara, engineer on the Claude Code team at Anthropic
Scores: Recency 9, Accuracy 10, Longevity 8, Depth 9 — Average: 9.0/10
Confirmed across: VIDEO-LIBRARY-RESEARCH.md (primary), COURSES-AND-PLAYLISTS.md (conference archive)
```

**Viewing Guide:**
- Watch for: (1) The `-p` flag for headless/programmatic Claude Code invocation. (2) How the GitHub Action layers on top of the SDK (don't confuse the two levels). (3) JSON output formatting for structured pipeline integration.
- Key concept: Claude Code is not just a human-in-the-loop tool. The SDK exposes the same agent as a programmable subprocess — this is what CI/CD integration looks like.
- Skip: Introduction/context-setting (first 3 minutes).
- Best timestamps: Live demo section (middle third) — GitHub issue → automated PR with feature implementation.

---

**PRIMARY 2.3**

```
Title: Remote MCPs — What We Learned from Shipping
Channel: AI Engineer (from AI Engineer World's Fair 2025, MCP Track)
URL: See Class Central: classcentral.com/course/youtube-remote-mcps-what-we-learned-from-shipping-john-welsh-anthropic-460921
     (YouTube URL requires manual lookup on @aiDotEngineer channel)
Published: June–July 2025 | Duration: ~15 minutes
Speaker: John Welsh, Software Engineer, Anthropic
Scores: Recency 10, Accuracy 10, Longevity 8, Depth 8 — Average: 9.0/10
New from: AI-ENGINEER-SUMMIT.md (Video 7)
```

**Viewing Guide:**
- Watch for: (1) The "integration chaos" problem that predated MCP Gateway — how Anthropic had the same internal problem MCP solves externally. (2) MCP Gateway architecture — centralized auth, standardized calls, both external and internal MCP. (3) Authentication implementation — OAuth handling at the Gateway layer.
- Key concept: Remote MCP is not just "SSE replacement" — it is an architectural pattern where client and server can be separated across the network with proper auth infrastructure. This is the post-deprecation production pattern.
- Skip: Nothing — 15 minutes, dense, full watch.
- Best timestamps: Integration chaos ~2:00; MCP Gateway ~6:00; auth architecture ~10:00.

**Note:** This video specifically covers post-March 2025 remote MCP architecture (Streamable HTTP, not SSE). It is the REQUIRED companion to any earlier MCP workshop that predates the SSE deprecation, including the Mahesh Murag workshop (see below).

---

> ⚠️ **CRITICAL ACCURACY NOTE — MAHESH MURAG MCP WORKSHOP:**
>
> ```
> Title: Building Agents with Model Context Protocol — Full Workshop
> Channel: AI Engineer
> URL: Requires manual lookup on @aiDotEngineer (search: "Mahesh Murag MCP workshop building agents")
> Published: March 1, 2025 | Duration: 1 hour 44 minutes
> Speaker: Mahesh Murag, Applied AI Engineer and MCP co-creator, Anthropic
> Views: ~325,000
> Scores: Recency 7, Accuracy 6 (CRITICAL FLAG), Longevity 7, Depth 10 — Average: 7.5/10
> Status: NOT a primary pick; included here for awareness because students will find it organically
> ```
>
> **Why this is flagged prominently:** This is the most-watched MCP workshop on YouTube, from MCP's co-creator, with genuinely irreplaceable depth on MCP primitives, sampling, and composability. Students will find it. It scores 10/10 on depth. However:
>
> **The critical accuracy issue:** At approximately ~73:00–79:00, the workshop explicitly describes SSE ("Server-Sent Events") as the remote transport mechanism for MCP. As of March 26, 2025 — 25 days after this workshop was published — Streamable HTTP replaced SSE as the standard for remote MCP servers. SSE as a standalone remote transport is deprecated.
>
> **If students watch this workshop (and they will):**
> - Everything up to ~72:00 is accurate and excellent. The primitives, sampling, composability, and client-server model are all correct.
> - The remote transport section (~73:00–79:00) must be replaced with the John Welsh talk (Primary 2.3 above).
> - Instructor must include a caveat block in any course material that references this workshop.
>
> **Mandatory viewing note to include whenever this workshop is referenced:**
> > "The Mahesh Murag workshop is the deepest available explanation of MCP primitives and sampling (timestamps ~8:00–72:00 are all accurate). SKIP the remote server section at ~73:00–79:00. For current remote MCP transport, watch John Welsh's 'Remote MCPs — What We Learned from Shipping' instead."

---

### Alternates — Week 2

**ALTERNATE 2A**
```
Title: The Creators of Model Context Protocol (Latent Space podcast)
Channel: Latent Space
URL: https://youtu.be/m2VqaNKstGc
Published: April 3, 2025 | Duration: 1 hour 19 minutes
Speakers: David Soria Parra and Justin Spahr-Summers (Anthropic MCP team)
Scores: 8.75/10
```
Use when: Students want the origin story and design rationale. Covers why LSP (Language Server Protocol) served as the template and why the three-primitive taxonomy was chosen. Best timestamps: LSP inspiration ~20:00; primitive design rationale ~30:00; composability ~55:00.

**ALTERNATE 2B**
```
Title: MCP — Origins and Requests For Startups
Channel: AI Engineer (World's Fair 2025, MCP Track)
URL: See Class Central: classcentral.com/course/youtube-mcp-origins-and-requests-for-startups-theodora-chu-model-context-protocol-pm-anthropic-460922
Published: June–July 2025 | Duration: ~18 minutes
Speaker: Theodora Chu, Product Manager for MCP, Anthropic
Scores: 8.5/10
```
Use when: Students need a fast "why does MCP exist and where is it going" framing (18 minutes). Good opener before the Murag workshop or DeepLearning.AI course. The "copy-paste hell" origin problem statement is the clearest single-sentence explanation of MCP's purpose.

**ALTERNATE 2C**
```
Title: Learn MCP Essentials and How to Create Secure Agent Interfaces with FastMCP
Channel: freeCodeCamp.org
URL: https://www.youtube.com/watch?v=DosHnyq78xY
Published: October 15, 2025 | Duration: ~60 minutes
Instructor: Carlos Leon
Scores: 8.0/10
Note: Tests with GitHub Copilot, not Claude Code specifically.
```
Use when: Primary 2.3 URL cannot be located and students need an alternate MCP server building tutorial with correct STDIO/HTTP Stream transport coverage.

---

### Accuracy Notes — Week 2

The SSE deprecation (March 26, 2025) is the primary accuracy risk for all Week 2 content. Any MCP video published before June 2025 that discusses remote transport should be reviewed.

- Primary 2.1 (David Soria Parra): First-party Anthropic, post-deprecation. Accurate. ✓
- Primary 2.2 (Headless Automation): July 2025. Covers SDK, not remote MCP transport. Not at risk. ✓
- Primary 2.3 (John Welsh): June–July 2025. Explicitly covers post-deprecation architecture. Accurate. ✓
- Mahesh Murag Workshop: March 1, 2025. SSE section at ~73:00–79:00 is deprecated. See mandatory caveat above. ⚠️

---

## Week 3 — Advanced Patterns

*Topic focus: Skills architecture, agent evaluation, multi-agent orchestration, production-scale agent design, meta-prompting.*

---

### Primary Videos (embed these 3)

---

**PRIMARY 3.1**

```
Title: Don't Build Agents, Build Skills Instead
Channel: AI Engineer
URL: https://www.youtube.com/watch?v=CEvIs9y1uog
Published: December 8, 2025 | Duration: 16 minutes 22 seconds
Speakers: Barry Zhang and Mahesh Murag, Anthropic Applied AI team
Views: 857,000 (2nd most-watched SE talk of 2025)
Scores: Recency 10, Accuracy 9, Longevity 9, Depth 9 — Average: 9.5/10
Confirmed across: VIDEO-LIBRARY-RESEARCH.md (9.75/10 — Week 3 primary), AI-ENGINEER-SUMMIT.md (Video 9, 9.25/10)
Note: Scores differ slightly between passes due to pass-specific weighting. Both passes confirm INCLUDE.
```

**Viewing Guide:**
- Watch for: (1) The definition of a "skill" vs. an "agent" — skills are dynamically-loadable procedural knowledge packages. (2) The architectural vision: one universal agent + a library of domain-specific skills vs. many purpose-built agents. (3) How skills address the orchestration complexity problem.
- Key concept: "A skill is not a tool." Tools are function calls (MCP). Skills are packaged domain-specific procedural intelligence that an agent can load and execute. Conflating them is the most common Week 3 mistake.
- Skip: Nothing — 16 minutes, full watch.
- Best timestamps: Skills vs. agents definition ~3:00; architectural comparison ~8:00; live demo ~12:00.

---

**PRIMARY 3.2**

```
Title: How We Build Effective Agents
Channel: AI Engineer
URL: https://www.youtube.com/watch?v=D7_ipDqhtwk
Published: April 4, 2025 | Duration: 15 minutes 9 seconds
Speaker: Barry Zhang, Member of Technical Staff, Applied AI Team, Anthropic
Views: 409,000+
Scores: Recency 9, Accuracy 10, Longevity 10, Depth 9 — Average: 9.5/10
Confirmed across: VIDEO-LIBRARY-RESEARCH.md (9.0/10 — slightly different weighting), AI-ENGINEER-SUMMIT.md (Video 8, 9.5/10)
```

**Viewing Guide:**
- Watch for: (1) The four criteria for "when agents are valuable" — complex, ambiguous, high-value, verifiable. Apply this as a filter to any proposed agentic system. (2) "Think like your agents" — the empathetic debugging approach. (3) Multi-agent communication cost — latency and cost are the hidden constraints.
- Key concept: "Don't build agents for everything" is not a limitation — it is engineering discipline. Most problems do not need agents.
- Skip: Nothing — 15 minutes, full watch.
- Best timestamps: When-to-use-agents criteria ~3:00; agent components ~7:00; multi-agent challenges ~11:00.

---

**PRIMARY 3.3**

```
Title: 12-Factor Agents: Patterns of Reliable LLM Applications
Channel: AI Engineer
URL: https://www.youtube.com/watch?v=8kMaTybvDUw
Published: July 3, 2025 | Duration: 17 minutes 6 seconds
Speaker: Dex Horthy, CEO of HumanLayer
Views: 262,000+
Scores: Recency 9, Accuracy 9, Longevity 10, Depth 9 — Average: 9.25/10
Confirmed across: ADVANCED-AND-SPEC-DRIVEN.md (Video 1, 9.0/10), AI-ENGINEER-SUMMIT.md (Video 13, 9.25/10)
```

**Viewing Guide:**
- Watch for: (1) Factor 1 (Natural Language to Tool Calls) and Factor 4 (Tools are just structured outputs) — these reframe how you think about the agent-to-tool interface. (2) Factor 6 (Launch/Pause/Resume with simple APIs) — critical for production multi-agent systems. (3) Factor 8 (Own your control flow) — don't use a framework that hides control flow from you. If you can't see it, you can't debug it.
- Key concept: Factor 12 (Stateless Reducer) — the architectural insight that enables horizontal scaling of agent systems.
- Skip: Factors you already know from Weeks 1–2; watch the first 8 minutes for the most novel insights.
- Best timestamps: Factor overview ~2:00; control flow ~8:00; stateless reducer ~13:00.

---

### Alternates — Week 3

**ALTERNATE 3A**
```
Title: Prompting for Agents (Code with Claude 2025)
Channel: Anthropic (official)
URL: https://www.youtube.com/watch?v=XSZP9GhhuAc
Published: May 22, 2025 | Duration: ~30 minutes
Speaker: Hannah Moran, Anthropic
Scores: 9.5/10
```
Use when: Students need Week 3 content on prompting multi-agent systems specifically. "Agents are models using tools in a loop" is the architectural truth this video teaches prompting around. Can be elevated to primary if 3.1–3.3 are unavailable.

**ALTERNATE 3B**
```
Title: Building and Evaluating AI Agents
Channel: AI Engineer
URL: Requires manual lookup on @aiDotEngineer channel (search: "Sayash Kapoor building evaluating AI agents")
Published: April 17, 2025 | Duration: 20 minutes | Views: ~220,000
Speaker: Sayash Kapoor, Princeton University / AI Snake Oil co-author
Scores: 9.0/10
```
Use when: Additional Week 3 evaluation content is needed. Introduces HAL (Holistic Agent Leaderboard) and the critique that production agents require multi-dimensional evaluation (accuracy + cost + latency jointly, not accuracy alone). Best timestamps: Benchmark critique ~3:00; multi-dimensional metrics ~8:00; HAL framework ~14:00.

**ALTERNATE 3C**
```
Title: I'm HOOKED on Claude Code Hooks: Advanced Agentic Coding
Channel: IndyDevDan
URL: https://www.youtube.com/watch?v=J5B9UGTuNoM
Published: July 7, 2025 | Duration: 30 minutes
Scores: 8.75/10 (URL confirmed via Podwise episode indexer)
```
Use when: Students are building Week 3 automated workflows with hooks. Covers all five hook types (PreToolUse, PostToolUse, notification, stop, sub-agent-stop) with observability demo. Companion GitHub repo: disler/claude-code-hooks-mastery.

**ALTERNATE 3D**
```
Title: What Anthropic Learned Building AI Agents in 2025 (AWS re:Invent AIM277)
Channel: AWS Events
URL: https://www.youtube.com/watch?v=TledrLrVUQI
Published: December 6, 2025 | Speaker: Cal, Applied AI team at Anthropic
Scores: 9.25/10
```
Use when: Students need additional Week 3 or Week 4 production context. Shows Claude's evolution on the same coding task across model versions. Context engineering as the successor to prompt engineering.

---

### Accuracy Notes — Week 3

All three primaries are principle-based (not implementation-specific) and have no accuracy red lines. Primary 3.2 is from a sitting Anthropic applied AI engineer. Primary 3.3 is explicitly model-agnostic and framework-agnostic by design. Primary 3.1 is from the builders of the Skills system.

---

## Week 4 — Phase 2 Preparation

*Topic focus: Spec-driven development, production AI workflows, enterprise deployment, agentic system reliability.*

---

### Primary Videos (embed these 3)

---

**PRIMARY 4.1**

```
Title: The New Code
Channel: AI Engineer
URL: https://www.youtube.com/watch?v=8rABwKRsec4
Published: July 11–12, 2025 (AI Engineer World's Fair keynote) | Duration: 21 minutes 36 seconds
Speaker: Sean Grove, Alignment Research, OpenAI
Views: 1,000,000+
Scores: Recency 10, Accuracy 9, Longevity 10, Depth 9 — Average: 9.5/10
New from: AI-ENGINEER-SUMMIT.md (Video 14)
```

**Viewing Guide:**
- Watch for: (1) The claim that "specifications compile to documentation, evaluations, model behaviors, and code" — this is the spec-driven development value chain. (2) The US Constitution analogy — frame for why specs must be explicit about values, not just behavior. (3) The contrast between prompt engineering (ad hoc) and spec-driven development (formal, versioned).
- Key concept: "The person who communicates the best will be the most valuable programmer in the future. Specifications are now the source code."
- Skip: Nothing — 22 minutes, full watch.
- Best timestamps: Spec as source of truth ~4:00; compilation analogy ~10:00; model spec example ~16:00.

---

**PRIMARY 4.2**

```
Title: Prompting 101 (Code with Claude 2025)
Channel: Anthropic (official)
URL: https://www.youtube.com/watch?v=ysPbXH0LpIE
Published: May 22, 2025 | Duration: ~25–30 minutes
Speaker: Anthropic team (first-party conference session)
Scores: Recency 9, Accuracy 10, Longevity 10, Depth 8 — Average: 9.25/10
Confirmed across: VIDEO-LIBRARY-RESEARCH.md (primary), COURSES-AND-PLAYLISTS.md (conference archive)
```

**Viewing Guide:**
- Watch for: (1) What distinguishes a production prompt from a demo prompt. (2) Prompting techniques specific to Claude 4 (longer context window changes what needs to be in the prompt vs. in CLAUDE.md). (3) Any discussion of spec-as-prompt patterns.
- Key concept: The relationship between prompt precision and agent reliability at scale. A vague prompt costs you one bad response in chat; it costs you hours of agent drift in a production workflow.
- Skip: Nothing.
- Best timestamps: All — 30 minutes is appropriate for the Week 4 prompting anchor.

---

**PRIMARY 4.3**

```
Title: POC to PROD: Hard Lessons from 200+ Enterprise GenAI Deployments
Channel: AI Engineer
URL: Requires manual lookup on @aiDotEngineer (search: "Randall Hunt POC PROD enterprise GenAI deployments")
Published: July 23, 2025 | Duration: 19 minutes 16 seconds
Speaker: Randall Hunt, Caylent
Views: ~39,000
Scores: Recency 9, Accuracy 8, Longevity 9, Depth 8 — Average: 8.5/10
New from: AI-ENGINEER-SUMMIT.md (Video 18)
```

**Viewing Guide:**
- Watch for: (1) The most common POC→PROD failure modes (context management, cost at scale, reliability regression). (2) The gap between "it worked in demo" and "it works for 10,000 users" — what changes. (3) Governance and security patterns that enterprises actually require.
- Key concept: The POC→PROD gap is primarily organizational and operational, not technical. Most production failures are not caused by the model.
- Skip: AWS-specific tooling sections if not using AWS.
- Best timestamps: Failure mode taxonomy ~3:00; organizational patterns ~10:00; production checklist ~15:00.

---

### THE GAP: Spec-Driven Development

**Confirmed finding across multiple research passes:** No video exists that demonstrates a complete spec-driven development workflow with Claude Code CLI on camera with sufficient depth for Week 4 engineers.

**What was confirmed absent after exhaustive search:**
- No YouTube video demonstrating the full workflow: requirements → design document → acceptance criteria → failing tests → Claude Code implementation
- No video covering spec-driven development with Claude Code specifically (as opposed to other IDEs like Kiro)
- This absence was confirmed by two independent research passes (ADVANCED-AND-SPEC-DRIVEN.md and INDEPENDENT-CREATORS.md)

**What exists in written form (assign as reading):**
1. alexop.dev — "Spec-Driven Development with Claude Code in Action" (February 2026): https://alexop.dev/posts/spec-driven-development-claude-code-in-action/ — real SQLite→IndexedDB migration using Claude Code's task system with spec files and subagents
2. Fireworks AI — "LLM Eval Driven Development with Claude Code" (August 2025): https://fireworks.ai/blog/eval-driven-development-with-claude-code — eval-first agent development with Claude Code MCP integration
3. Anthropic Engineering Blog — "Demystifying Evals for AI Agents" (January 2026): https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents — practitioner guide for agent evaluation from real Anthropic deployments
4. GitHub: swingerman/atdd — Acceptance Test Driven Development for Claude Code: https://github.com/swingerman/atdd — Given/When/Then specs driving Claude Code behavior

**Instructor Screencast Required (Instructor Action Item #1):**

Record a 20-minute screencast demonstrating the spec-writing workflow from the Week 4 lab. The screencast should show:

1. **Write the spec** (5 min): Show writing a feature spec with user story, acceptance criteria in Given/When/Then format, and interface contract. Use a real or realistic codebase.
2. **Generate failing tests** (5 min): Demonstrate generating tests from the spec before any implementation exists. Show the tests fail.
3. **Hand spec + tests to Claude Code** (5 min): Show the complete Claude Code session — prompt structure, how the spec constrains Claude's output, how acceptance criteria are verified.
4. **Review and iterate** (5 min): Show at least one cycle of finding a spec ambiguity, resolving it, and re-running.

**Content exists in written form** (alexop.dev, Fireworks blog). The screencast is the execution of that written content on camera. This is the highest-priority item before course launch.

---

### Alternates — Week 4

**ALTERNATE 4A**
```
Title: Taking Claude to the Next Level (Code with Claude 2025)
Channel: Anthropic (official)
URL: https://www.youtube.com/watch?v=nZCy8E5jlok
Published: May 22, 2025 | Duration: ~25–30 minutes
Speaker: Anthropic team
Scores: 8.75/10
REQUIRES INSTRUCTOR PREVIEW — speaker and precise content not confirmed in research
```
Preview checklist: Does this cover production deployment patterns, team workflow patterns, or lessons from scale? If yes to at least two, use as alternate 4A. Update the viewing guide after preview.

**ALTERNATE 4B**
```
Title: Vibe Coding in Prod (Code with Claude 2025)
Channel: Anthropic (official)
URL: https://www.youtube.com/watch?v=fHWFF_pnqDk
Published: May 22, 2025 | Duration: ~25–30 minutes
Scores: 8.5/10
```
Use when: Additional Week 4 production content is needed. The "vibe coding at production scale requires spec discipline" contrast is directly relevant to Week 4's theme.

**ALTERNATE 4C**
```
Title: Evolving Claude APIs for Agents
Channel: AI Engineer
URL: https://www.youtube.com/watch?v=aqW68Is_Kj4
Published: December 2025 | Duration: 13 minutes 25 seconds
Speaker: Katelyn Lesse, Head of API Engineering, Anthropic
Scores: 8.5/10
```
Use when: Students need grounding in the current Anthropic API surface for production agents (memory tool, code execution tool, context management APIs). Covers the three-pillar approach (harnessing intelligence, managing context, enabling autonomy) from the engineer who shipped these features.

**ALTERNATE 4D**
```
Title: No Vibes Allowed: Solving Hard Problems in Complex Codebases
Channel: AI Engineer | URL: https://www.youtube.com/watch?v=rmvDxxNubIg
```
The Dex Horthy "No Vibes" talk (Primary 1.2) serves double duty: it is both a Week 1 context discipline video AND the motivating "why spec discipline matters" setup for Week 4. Use the same video in Week 4 with a different framing: "You saw this in Week 1 as a context engineering talk. Re-watch it now as a spec-driven development argument."

---

### Accuracy Notes — Week 4

Primary 4.1 (Sean Grove) has no MCP or Claude Code specifics — it is a paradigm talk and has no red-line exposure. Primary 4.2 is Anthropic first-party. Primary 4.3 is experience-based (200+ deployments) rather than specification-based; no technical accuracy red lines identified.

---

## Disqualification Log

| Video/Resource | Reason | Pass Found |
|---------------|--------|-----------|
| Tech with Tim — "Build Anything with MCP Agents" | Covers adding MCP servers to Cursor (not building them); target tool is Cursor not Claude Code CLI | VIDEO-LIBRARY-RESEARCH.md |
| Simon Willison — "Building terminal session sharing with Claude Code for Web" (GQvMLLrFPVI) | Covers Claude Code for Web (async cloud agent), not CLI; insufficient depth for Week 3 | VIDEO-LIBRARY-RESEARCH.md |
| AWS re:Invent Kiro sessions (DVT209, DVT212) | Spec-driven development methodology is correct; demonstration environment is Kiro (AWS IDE), not Claude Code CLI. Conflates methodology with vendor tool. | ADVANCED-AND-SPEC-DRIVEN.md |
| Fireworks AI: LLM Eval Driven Development article | Excellent content, not a video. Assigned as reading instead. | ADVANCED-AND-SPEC-DRIVEN.md |
| All "spec-driven development" written articles | Same — not video content; assigned as reading. | ADVANCED-AND-SPEC-DRIVEN.md |
| Peter Yang — "Build a YouTube Research Agent in 15 min" | Depth score 5/10 — demonstrates Cursor slash command, not production workflow; insufficient for Week 4 engineers | VIDEO-LIBRARY-RESEARCH.md |
| freeCodeCamp written article — MCP Server with Python/Docker | Format: written article (March 2026). Not a video; cannot embed. | VIDEO-LIBRARY-RESEARCH.md |
| All About AI — "INSANE Parallel Coding with Claude Code and Cursor MCP" | Accuracy uncertain (6/10); "Insane" framing yellow flag; 11 min too shallow; Cursor/Claude interop unclear | INDEPENDENT-CREATORS.md |
| David Ondrej — 27-min Claude Code Masterclass Condensation | Accuracy conditional — condensation of Anthropic source introduces interpretation risk; depth 6/10; not appropriate for primary assignment | INDEPENDENT-CREATORS.md |
| Matt Wolfe / Future Tools | No specific video found clearing ≥7/10 on Depth for any curriculum week. Depth ceiling ~5/10. | INDEPENDENT-CREATORS.md |
| Nicholas Renotte | No Claude Code or agentic systems content found for 2025; different domain (computer vision) | INDEPENDENT-CREATORS.md |
| Jerry Liu — "Building AI Agents that Actually Automate Knowledge Work" | LlamaIndex-centric framing limits transferability; may conflate RAG patterns with general agent patterns | AI-ENGINEER-SUMMIT.md |
| Richmond Alake — "Architecting Agent Memory" | MongoDB-specific; architecture principles sound but framework-tied | AI-ENGINEER-SUMMIT.md |
| "Function Calling is All You Need" — Ilan Bigio, OpenAI | OpenAI Agent SDK and Swarm are OpenAI-specific; confuses students building with Claude/MCP | AI-ENGINEER-SUMMIT.md |
| AI Agents in LangGraph (DeepLearning.AI) | June 2024 — predates MCP, Skills, Claude Code 2.0; uses LangGraph not Claude Code | COURSES-AND-PLAYLISTS.md |
| Vanderbilt Claude Code (Coursera) | Paid (Coursera subscription required); designed for beginners; third-party accuracy risk | COURSES-AND-PLAYLISTS.md |
| AI Hero — Claude Code for Real Engineers | Paid ($477); cohort-based (specific start date); incompatible with async curriculum | COURSES-AND-PLAYLISTS.md |
| Any video presenting SSE as current remote MCP transport | Deprecated March 26, 2025; automatically disqualified for remote MCP sections | All passes |
| Academic "meta-prompting" literature (Towards Data Science, academic papers) | Academic definition of meta-prompting does not map to how this course uses the term | VIDEO-LIBRARY-RESEARCH.md |

---

## Instructor Action Items

Priority 1 = must complete before course launches. Priority 2 = should complete before cohort starts. Priority 3 = nice to have.

**[Priority 1] Record spec-driven development screencast (20 minutes)**
No video exists demonstrating a complete spec-driven workflow using Claude Code CLI. Record a screencast following the outline in the Week 4 GAP section above. Content blueprint exists in writing (alexop.dev, Fireworks blog). This is the single most important content gap in the curriculum.

**[Priority 1] Preview and verify MCP Advanced Topics accuracy (Anthropic Academy)**
URL: https://anthropic.skilljar.com/model-context-protocol-advanced-topics
Watch specifically for how "Streamable HTTP transport with Server-Sent Events" is framed. If SSE is treated as a sub-mechanism within Streamable HTTP (acceptable), the course passes. If SSE is presented as an equivalent standalone transport to Streamable HTTP (fails), demote to excluded. Certificate #3 depends on this outcome.

**[Priority 1] Locate YouTube URLs for three AI Engineer Summit talks**
These were confirmed to exist with the specified view counts but YouTube IDs were not extractable from available search results. Search @aiDotEngineer directly:
- Mahesh Murag MCP Workshop (~325,000 views) — needed for awareness caveat in student materials
- John Welsh — Remote MCPs (Primary 2.3) — needed for embedding
- Sayash Kapoor — Building and Evaluating AI Agents (~220,000 views) — needed for Alternate 3B

**[Priority 2] Preview "Taking Claude to the Next Level" (nZCy8E5jlok)**
Speaker identity and precise content were not confirmed in research. Watch the full video. If it covers production deployment patterns, team workflows, or lessons from scale, confirm as Alternate 4A and write a viewing guide. If content does not align with Week 4, swap to Alternate 4B (Vibe Coding in Prod).

**[Priority 2] Preview Cole Medin Complete Guide MCP section (amEUIuBKwvg)**
Primary 1.3. Watch the MCP transport section. If SSE is presented as current for remote servers, create a timestamp-specific skip instruction for students: "Skip minutes X:XX–X:XX; for correct remote MCP transport, watch John Welsh's talk." If the section is accurate or avoids remote transport specifics, remove the caveat.

**[Priority 2] Confirm Anthropic Academy durations and lesson counts**
"Claude Code in Action" is reported as ~1 hour from community sources; exact lesson count and duration were not confirmed programmatically. Preview to confirm before assigning as the Week 1 certificate checkpoint. Same for Introduction to Agent Skills — confirm it is the correct URL.

**[Priority 2] Verify Cole Medin Context Engineering 101 URL**
Published July 25, 2025 per X announcement. Search youtube.com/@ColeMedin for "Context Engineering 101 PRP." Confirm duration and URL before assigning as Alternate 1B.

**[Priority 3] Locate Code with Claude 2025 official playlist URL**
All 18 sessions have been individually inventoried in COURSES-AND-PLAYLISTS.md. Find the official Anthropic YouTube playlist link (search youtube.com/@Anthropic for "Code with Claude 2025 playlist") to enable the Week 4 synthesis assignment (browse-one-session task).

**[Priority 3] Verify All About AI Context7 MCP video (Class Central listing)**
If the Cole Medin and freeCodeCamp MCP videos are unavailable, this video (listed on Class Central, URL unverified) would make a reasonable Alternate 2C. Search YouTube for "All About AI Context7 MCP Claude Code" and verify: (a) three primitives named correctly, (b) no SSE as current remote transport.

**[Priority 3] Monitor for new Week 4 spec-driven development videos**
The absence of spec-driven Claude Code CLI videos is a real gap, not a search failure. The practitioners who have implemented this methodology are writing, not recording (as of March 2026). Check these channels quarterly: IndyDevDan, Cole Medin, Simon Willison, alexop.dev. A new video in this space would upgrade immediately to primary.

---

## Update Cadence

The agentic AI engineering space is moving at an unusual pace. Recommendations:

**Quarterly review (before each cohort):** Verify all YouTube URLs are live (videos can be made private or deleted). Run a targeted search for new videos from confirmed-quality creators: IndyDevDan, Cole Medin, Simon Willison, the AI Engineer channel, Latent Space.

**After any major Anthropic release:** New Claude Code features often generate burst video content. Boris Cherny, Mahesh Murag, Barry Zhang, and Cat Wu are the speakers most likely to produce curriculum-grade content. Monitor their conference talks within 2 weeks of a major release.

**Red-line triggers for full re-evaluation:**
- Any change to MCP spec transport standards
- Any change to the Claude Code Skills format or YAML frontmatter
- New Anthropic first-party courses on DeepLearning.AI or the Academy
- A confirmed video demonstrating spec-driven development with Claude Code CLI (this immediately becomes Week 4 Primary 4.3, displacing the current placeholder)

**Videos with the longest shelf life** (lowest re-evaluation priority):
- Barry Zhang "How We Build Effective Agents" (D7_ipDqhtwk) — pure principles, no UI
- 12-Factor Agents (8kMaTybvDUw) — designed to be model-agnostic for 18–24 months
- Sean Grove "The New Code" (8rABwKRsec4) — paradigm talk, not implementation
- Hannah Moran "Prompting for Agents" (XSZP9GhhuAc) — principles, not tool-specific

**Videos with the shortest shelf life** (highest re-evaluation priority):
- Any video covering specific Claude Code CLI flags or settings.json format
- Any video covering MCP transport specifics
- Any video covering Anthropic API-specific features (these evolve with model releases)
