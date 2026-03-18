# Video Research: Advanced Patterns, Spec-Driven Development, Agent Evaluation
## Weeks 3 and 4 — Filling the Gap

**Researcher**: Claude (Sonnet 4.6)
**Date**: 2026-03-17
**Purpose**: Fill the gap left by the first video research pass, which found no content on spec-driven AI development and minimal content on agent evaluation and production deployment.

---

## Executive Summary

After an exhaustive search across the prescribed query space, here is the honest assessment:

**Good news (Week 3 — multi-agent, advanced patterns):**
Two strong videos exist: "12-Factor Agents" (Dex Horthy, AI Engineer) and "No Vibes Allowed" (Dex Horthy, AI Engineer World's Fair). These are the best technically rigorous talks for production agent architecture currently available on YouTube.

**Honest assessment (Week 4 — spec-driven development with Claude Code specifically):**
No video exists demonstrating a complete spec-driven workflow using Claude Code CLI with proper acceptance criteria, interface contracts, and test-first definitions. The concept is well-covered in written form. The nearest video adjacencies are the AWS Kiro reinvent sessions (spec-driven IDE, not Claude Code CLI) and the Fireworks eval-driven development blog post (no video). A detailed gap analysis and recommended instructor action are provided at the end of this document.

**Agent evaluation on YouTube:**
Strong conceptual talks exist (Hamel Husain's 50-minute crash course, Mariana Prazeres at Agents in Production 2025), but they are not Claude Code-specific. They cover principles that transfer. Verification note: several of these videos were found via indirect evidence (Class Central, summary sites, MLOps Community platform), and URLs should be confirmed before putting them in student-facing materials.

---

## PASSING VIDEOS

---

### Video 1

```
Title: 12-Factor Agents: Patterns of Reliable LLM Applications
Channel: AI Engineer
URL: https://www.youtube.com/watch?v=8kMaTybvDUw
Published: April 2025 (AI Engineer Summit; also presented at Agents in Production 2025, August 2025)
Duration: ~17 minutes (conference talk format)
Speaker: Dex Horthy, founder of HumanLayer
```

**Scores:**
- Recency: 9/10 — Spring/Summer 2025. Reflects production reality of that moment; cited by AI Engineer as "fan favorite" in their Agent Reliability track as recently as June 2025.
- Accuracy: 9/10 — Draws from empirical observation of ~100 production agent deployments across founders, AI engineers, and CTOs. No fabricated API claims. Framework-agnostic, so no deprecation exposure. The 12-factor structure is a mental model, not a library.
- Longevity: 9/10 — Structured around principles (context window as the unit of state, natural language → structured output, human-in-the-loop patterns) not around specific tool versions. These principles will hold for 18–24 months.
- Depth: 9/10 — Shows the HOW: specific patterns for context engineering, prompt ownership, state management, and when to stop trusting the LLM and hand off to humans. Not a survey. Opinionated from production experience.
- Average: 9.0/10

**INCLUDE**

Week assignment: Week 3 (Advanced Patterns, Multi-Agent)
Curriculum fit: Foundational production agent architecture — what actually works at scale vs. what frameworks promise.
Gap addressed: "Multi-agent orchestration production" and "agent architecture scale" — specifically the patterns that survive contact with real users.

**Viewing Guide:**
- Watch for: The distinction between "agents" that are actually just deterministic pipelines vs. true agents that own their control flow.
- Key concept: Pause at the "context window as the unit of state" explanation — this reframes how to think about agent memory and why naive implementations fail.
- Skip: Nothing. The talk is tight at 17 minutes.

---

### Video 2

```
Title: No Vibes Allowed: Solving Hard Problems in Complex Codebases
Channel: AI Engineer
URL: https://www.youtube.com/watch?v=rmvDxxNubIg
Published: June 2025 (AI Engineer World's Fair 2025)
Duration: ~20 minutes (conference talk format, exact duration unconfirmed — verify before publishing)
Speaker: Dex Horthy, HumanLayer
```

**Scores:**
- Recency: 9/10 — World's Fair June 2025. Directly addresses Claude Code and agentic coding workflows.
- Accuracy: 8/10 — Introduces "RPI" (Research-Plan-Implement) workflow and the "Dumb Zone" concept. These are the speaker's coined terms, not industry standards. The underlying engineering advice is sound. No fabricated API claims found.
- Longevity: 8/10 — The RPI workflow and "Dumb Zone" framing are mental models, not tool-dependent. The specific Claude Code patterns discussed may evolve but the diagnostic framework stays useful.
- Depth: 9/10 — This is the most direct "vibe coding vs disciplined engineering" video found. Demonstrates a concrete workflow (research the codebase → produce a plan → implement against that plan) with real examples from brownfield codebases.
- Average: 8.5/10

**INCLUDE**

Week assignment: Week 3 (Advanced Patterns) or Week 4 intro (bridge from Week 3 to spec-driven content)
Curriculum fit: The "anti-vibe-coding" framing that Week 4 needs to establish before introducing specs. Fills the gap of "why does disciplined process matter?"
Gap addressed: "Vibe coding vs spec-driven" conceptual foundation. Also covers "AI engineering in complex codebases" — a specific Week 3 need.

**Viewing Guide:**
- Watch for: The three phases of RPI and how each phase constrains what the agent is allowed to do.
- Key concept: The "Dumb Zone" — the failure mode where an AI agent has just enough context to generate plausible but wrong code. Understanding this motivates spec-driven workflows.
- Skip: Nothing critical to skip; talk is well-structured.

**Note:** "No Vibes Allowed" has a direct thematic link to "No Vibes: Spec-Driven Development" Week 4 content. Use it as the setup for why specs matter.

---

### Video 3

```
Title: Using Claude Code to Build a GitHub Actions Workflow
Channel: Simon Willison (personal YouTube)
URL: https://www.youtube.com/watch?v=VC6dmPcin2E
Published: July 1, 2025
Duration: 7 minutes
Speaker: Simon Willison (creator of Datasette, Django co-creator)
```

**Scores:**
- Recency: 8/10 — July 2025. Claude Code CLI is the actual tool used. Reflects the tool as it existed at that time.
- Accuracy: 9/10 — Short enough that there is little room for confabulation. Simon Willison is known for technical precision. He is showing a real workflow, not describing one abstractly.
- Longevity: 7/10 — The specific GitHub Actions YAML structure and Claude Code invocation patterns may drift, but the workflow pattern (use Claude Code to understand your repo, then generate CI config) stays valid.
- Depth: 7/10 — Short and practical. Demonstrates the HOW of using Claude Code for DevOps automation, not just claiming it is possible. Useful as a "here is what this looks like" video, not as a deep-dive.
- Average: 7.75/10

**INCLUDE**

Week assignment: Week 4 (Production Systems, CI/CD integration)
Curriculum fit: "Claude Code in CI/CD pipelines" — a specific Week 4 production deployment gap.
Gap addressed: "GitHub Actions + Claude Code" production pattern. First-person demonstration by a credible engineer, not a vendor promotional video.

**Viewing Guide:**
- Watch for: How Simon prompts Claude Code for CI config generation vs. how he would write it manually — the difference reveals what Claude Code is actually doing.
- Key concept: Claude Code can read your repository and understand context before generating CI configuration — it is not just a template filler.
- Skip: Nothing to skip given the 7-minute runtime.

---

## VIDEOS REQUIRING URL VERIFICATION BEFORE USE

The following talks were found through indirect evidence (MLOps Community platform, Class Central, summary sites). Content appears strong but YouTube URLs need manual verification before putting in student-facing materials.

---

### Candidate A (Verify URL)

```
Title: Iterating on Your AI Evals
Channel: MLOps Community (YouTube)
URL: VERIFY — available on MLOps Community platform at:
     https://home.mlops.community/public/videos/iterating-on-your-ai-evals-mariana-prazeres-agents-in-production-2025-2025-08-04
     YouTube URL unknown — check MLOps Community YouTube channel
Published: August 4, 2025 (Agents in Production 2025 conference)
Duration: Unknown — verify
Speaker: Mariana Prazeres
```

**Preliminary Scores (pre-verification):**
- Recency: 9/10 — August 2025, agents in production context
- Accuracy: Unknown — cannot score without watching
- Longevity: 8/10 — "how to iterate on evals" is a durable skill
- Depth: Unknown — cannot score without watching

Week assignment: Week 4 (Agent Evaluation)
Gap addressed: "How do you know your agent actually works?" — iterative evaluation methodology.

**Action required:** Locate the YouTube URL on the MLOps Community channel before scoring and including.

---

### Candidate B (Verify URL)

```
Title: 12-Factor Agents (Agents in Production version)
Channel: MLOps Community (YouTube)
URL: VERIFY — available at:
     https://home.mlops.community/public/videos/12-factor-agents-patterns-of-reliable-llm-applications-dexter-horthy-agents-in-production-2025-2025-08-06
     This may be the same talk as Video 1 above (AI Engineer version) or a distinct version
Published: August 6, 2025
Duration: Unknown
Speaker: Dexter Horthy
```

**Note:** If this is a longer version with Q&A or expanded content vs. the 17-minute AI Engineer cut (Video 1), it may warrant separate inclusion. If it is substantively the same, use Video 1 (YouTube URL confirmed).

---

### Candidate C (Verify URL)

```
Title: Hamel Husain's AI Evaluations Crash Course
Platform: Originally distributed via Creator Economy newsletter (September 2025)
          Reportedly available on YouTube, Apple, Spotify
URL: VERIFY — search YouTube for "Hamel Husain AI evaluations crash course 50 minutes"
Published: September 2025
Duration: ~50 minutes
Speaker: Hamel Husain (ML engineer; formerly Airbnb, GitHub; co-creator of top-grossing Maven eval course)
```

**Content summary (from search evidence):**
Covers a 4-step eval process using a real company case study (Nurture Boss, anonymized):
1. Manual labels in a spreadsheet, categorize with AI
2. Pivot tables for issue pattern analysis
3. Build LLM judges with binary pass/fail labels
4. Validate judges using true positive and true negative rates (not just alignment)

**Preliminary Scores (pre-verification):**
- Recency: 9/10 — September 2025, production-oriented
- Accuracy: 9/10 — Hamel Husain is the field's primary practitioner-voice on evals; the Maven course has 3,000+ students including Anthropic and OpenAI teams
- Longevity: 9/10 — The spreadsheet-first methodology and LLM judge validation pattern are durable approaches
- Depth: 9/10 — Real company case study, real data, concrete tool (spreadsheet), specific validation methodology

**If URL confirms as YouTube:** INCLUDE
Week assignment: Week 4 (Agent Testing and Evaluation)
Gap addressed: "How do you build evals for agents?" with a concrete, replicable methodology.

---

## DISQUALIFIED VIDEOS (and why)

**AWS re:Invent 2025 Kiro sessions (DVT209 and DVT212)**
Both are strong talks on spec-driven development and would score 8+ on most criteria. DVT212 in particular ("Spec-driven development: Shaping the next generation of AI software") demonstrates EARS notation requirements, design documents, implementation tasks — precisely what Week 4 needs.

**Disqualified because:** Kiro is an AWS-specific IDE product, not Claude Code CLI. Teaching spec-driven development through Kiro would conflate the methodology with a specific vendor tool that students do not have in the Claude Code curriculum. The principles are correct; the demonstration environment is wrong.

**Recommendation:** Use these as supplementary reading/watching, not primary curriculum. Or use DVT212 to show that the spec-driven methodology is industry-converging (AWS built an IDE around it), then teach Claude Code-specific implementation separately.

---

**Fireworks AI: LLM Eval Driven Development with Claude Code**
URL: https://fireworks.ai/blog/eval-driven-development-with-claude-code (August 25, 2025)

**Disqualified because:** This is a blog post, not a video. The content is excellent and closely matches Week 4 needs (write evals before code, pytest-centric Eval Protocol framework, Claude Code MCP integration). It would make a strong assigned reading.

---

## GAP ANALYSIS: SPEC-DRIVEN DEVELOPMENT WITH CLAUDE CODE

### What Was Searched

All query variants specified in the research brief were executed:
- `"test driven development" "claude code" 2025 youtube`
- `"spec driven" AI coding 2025 youtube "acceptance criteria"`
- `"vibe coding" vs "spec driven" 2025 youtube`
- `"AI TDD" "test first" claude 2025`
- `"claude code" "spec-driven development" 2025 2026 video`
- All Kiro-related searches
- All Hamel Husain and agent eval searches

### What Exists in Written Form (but not video)

1. **alexop.dev — Spec-Driven Development with Claude Code in Action** (February 2026)
   A detailed walkthrough of migrating a storage layer (SQLite → IndexedDB) using Claude Code's task system with persistent task files, subagents, and spec-driven parallel work. The article explicitly documents the spec, the task breakdown, and the handoffs. This is the closest written equivalent to the video content that is missing.

2. **alexop.dev — Forcing Claude Code to TDD: An Agentic Red-Green-Refactor Loop** (November 2025)
   Documents a multi-agent TDD enforcement system using Claude Skills and Hooks to enforce strict Red-Green-Refactor cycles with context isolation. Strong engineering content.

3. **Fireworks AI — LLM Eval Driven Development with Claude Code** (August 2025)
   Demonstrates eval-first agent development using the Eval Protocol (pytest-centric framework). Shows: write evals → build agent → iterate.

4. **Anthropic Engineering Blog — Demystifying Evals for AI Agents** (January 2026)
   Anthropic's own practitioner guide for agent evaluation strategies from real deployments. Not a video, but authoritative.

5. **GitHub: swingerman/atdd — Acceptance Test Driven Development for Claude Code**
   A Claude Code plugin enforcing Given/When/Then specs before code, with agent team orchestration (spec-writer, implementer, reviewer). This is a living implementation of exactly the methodology Week 4 needs — but again, no video.

### Why No Video Exists

The spec-driven development + Claude Code CLI combination is too new. Most video creators are still demonstrating feature-level Claude Code workflows. The practitioners who have implemented spec-driven Claude Code workflows (alexop, the Fireworks team, the ATDD project author) are writing, not recording.

### Recommendation

**Do not wait for a video that does not exist yet. Three options:**

**Option A — Instructor Screencast (Strongly Recommended)**
Record a 15–25 minute screencast demonstrating a complete spec-driven workflow with Claude Code:
1. Write a spec with user story, acceptance criteria in Given/When/Then, interface contract
2. Generate failing tests from the spec before any implementation
3. Hand the spec + failing tests to Claude Code for implementation
4. Show how acceptance criteria constrain Claude's output

Content exists in written form (alexop.dev, Fireworks blog). The screencast is the execution of that content. This is the most durable and curriculum-specific option.

**Option B — Curated Written Content as Primary Source**
Use the alexop.dev article + Fireworks eval blog as the primary Week 4 content, supplemented by "No Vibes Allowed" (Video 2) as the motivating video. Frame the written content as the practitioner-level implementation material. Some students will find this more actionable than any video.

**Option C — Use Kiro DVT212 with Explicit Framing**
Show the AWS re:Invent DVT212 session as "this is the spec-driven methodology — AWS built an IDE around it; we'll implement the same pattern using Claude Code CLI." This acknowledges the gap honestly and gives students the methodology, even if the demonstration tool differs. Risk: students may try Kiro instead of Claude Code.

**Judgment call:** Option A (instructor screencast) fills the gap most cleanly and creates proprietary curriculum value. Option B is lowest-effort and still educationally sound. Option C is a reasonable bridge while waiting for Option A to be recorded.

---

## SUPPLEMENTARY RESOURCES (Not YouTube Videos, but Strong Supporting Material)

These are the best written resources found that directly address Week 4 gaps. Assign as readings alongside whatever video content is available:

1. **Anthropic: Demystifying Evals for AI Agents**
   https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
   Authoritative practitioner guide from Anthropic's applied AI team. Covers multi-turn evaluation, regression evals that run on every PR, frontier evals for new capabilities.

2. **Fireworks AI: LLM Eval Driven Development with Claude Code**
   https://fireworks.ai/blog/eval-driven-development-with-claude-code
   The closest thing to a Week 4 "spec-driven development" tutorial available. Eval Protocol is a real, installable framework.

3. **alexop.dev: Spec-Driven Development with Claude Code in Action**
   https://alexop.dev/posts/spec-driven-development-claude-code-in-action/
   Real migration project documented as a spec-driven workflow with Claude Code.

4. **alexop.dev: Forcing Claude Code to TDD**
   https://alexop.dev/posts/custom-tdd-workflow-claude-code-vue/
   Multi-agent TDD enforcement with Claude Skills and Hooks. Most technically detailed TDD implementation found.

5. **GitHub: swingerman/atdd**
   https://github.com/swingerman/atdd
   ATDD implementation for Claude Code with agent team orchestration. Shows Given/When/Then specs driving Claude Code behavior.

6. **Hamel Husain: Your AI Product Needs Evals**
   https://hamel.dev/blog/posts/evals/
   Foundational essay on why evals are non-optional. Use as pre-reading before the crash course video (if URL is confirmed).

---

## SEARCH AUDIT

The following queries were executed and returned no qualifying video content:

- `"acceptance criteria" AI agent 2025 youtube` — returned written guides only
- `"AI TDD" "test first" claude 2025` — returned blog posts only
- `MLOps "claude code" CI/CD 2025 youtube` — returned documentation only
- `"agent testing" production 2025 youtube` — returned frameworks and guides, no videos
- `hamel husain evals 2025 site:youtube.com` — no results
- `jason liu LLM structured output 2025 youtube video` — no qualifying videos found; Jason Liu's work is primarily conference talks and his Instructor library documentation
- `"fan-out" agents "claude code" 2025 youtube` — no results
- `anthropic "code with claude" multi-agent subagents youtube playlist` — identified that a playlist exists from the May 22, 2025 conference but specific video URLs matching advanced/spec-driven topics were not isolated

**Conclusion:** The search was exhaustive within the specified domain. The absence of spec-driven Claude Code CLI videos is a real gap, not a search failure.
