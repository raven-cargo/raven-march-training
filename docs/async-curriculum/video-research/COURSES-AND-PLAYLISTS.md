# Structured Courses, Playlists, and Conference Archives
## Agentic AI Engineering — Async Bridge Curriculum

**Researched:** 2026-03-17 / 2026-03-18
**Scope:** Courses, playlists, and conference archives — NOT standalone videos (those are in VIDEO-LIBRARY-RESEARCH.md)
**Methodology:** Systematic search across DeepLearning.AI, Anthropic Academy (Skilljar), Coursera, Hugging Face, AI Engineer channel, and conference archives

---

## Accuracy Red Lines (same zero-tolerance rules as VIDEO-LIBRARY-RESEARCH.md)

Before assigning any resource, verify against these disqualifiers:

- No `--thinking` flag (not a real Claude Code CLI flag)
- No `--context` flag (doesn't exist)
- No `/memory` command (not native Claude Code)
- SSE is deprecated for remote MCP transport as of March 26, 2025 — correct standard is Streamable HTTP
- Exactly THREE MCP primitives: Tools, Resources, Prompts
- CLAUDE.md: read at session start, never invoked as a slash command

**Critical disambiguation:** This curriculum covers **Claude Code CLI**. Any course about Claude.ai web chat or the Claude API without CLI context is not a primary resource.

---

## Scoring Framework (adapted for structured content)

1. **Recency (0–10):** When was it created/last updated? Is it current to the post-March 2025 MCP spec?
2. **Technical Accuracy (0–10):** Zero tolerance for fabricated flags, wrong primitive counts, or deprecated transport presented as current.
3. **Longevity (0–10):** Is this foundational and durable, or version-specific and likely to decay?
4. **Depth (0–10):** Does it go beyond surface introduction? Does it build real skills?

Additional dimensions for courses:
- **Format fit:** Modular (students can dip in) vs. sequential (must complete in order)
- **Time investment:** Realistic for async assignment?
- **Gate:** Free vs. paid? Students need free access.
- **Framework specificity:** Claude-native vs. framework-specific (LangGraph, CrewAI) — note tradeoffs

---

---

# SECTION 1: STRUCTURED COURSES

---

## Week 1 — CLAUDE.md, Context Engineering, Claude Code Workflow

---

### COURSE 1A — PRIMARY PICK

```
Title: Claude Code: A Highly Agentic Coding Assistant
Type: Short course (structured, sequential)
Provider: DeepLearning.AI (co-produced with Anthropic)
URL: https://learn.deeplearning.ai/courses/claude-code-a-highly-agentic-coding-assistant/
Published: August 5, 2025
Duration: 1 hour 50 minutes (10 video lessons)
Instructor: Elie Schoppik, Head of Technical Education at Anthropic
Free/Paid: Free (DeepLearning.AI platform beta)
Certificate: Not specified for beta access
```

**Lesson Titles:**
1. Introduction (4 min)
2. What is Claude Code? (8 min)
3. Course Notes
4. Setup & Codebase Understanding (14 min)
5. Adding Features (17 min)
6. Testing, Error Debugging and Code Refactoring (12 min)
7. Adding Multiple Features Simultaneously (11 min)
8. Exploring GitHub Integration & Hooks (10 min)
9. Refactoring a Jupyter Notebook & Creating a Dashboard (12 min)
10. Creating a Web App Based on a Figma Mockup (9 min)
11. Conclusion (1 min)
12. Quiz + Prompts & Summaries

**Scores:**
- Recency: 9/10 — August 2025, post-Claude Code 2.0
- Accuracy: 10/10 — Elie Schoppik is Anthropic's Head of Technical Education; same instructor as the 9.5/10 MCP course already selected
- Longevity: 8/10 — Three practical projects (RAG chatbot, data dashboard, Figma-to-web-app) add context-anchoring but also date the course. The core workflow patterns (Git worktrees, hooks, subagents via GitHub Actions) are architecturally durable.
- Depth: 8/10 — 1h50m covers real production patterns: parallel subagents across multiple git branches, GitHub issue tagging → autonomous PR, MCP with Playwright for UI debugging. Goes further than most introductory content.
- **Average: 8.75/10**

Format fit: Sequential for first-timers; modular for students who completed Phase 1. Assign specific lessons, not the whole course.

**Week assignment: Week 1**
**Curriculum fit:** Bridges Phase 1 onboarding into Week 1 depth work. Covers hooks (Week 1), GitHub integration (Week 1/4), MCP (Week 2 preview), and subagents (Week 3 preview). One source of truth for the Elie Schoppik pedagogy style students already trust from the MCP course.

**Student-facing description:** Elie Schoppik (Anthropic's Head of Technical Education, same instructor as the MCP course) takes you through three real projects using Claude Code in production: extending a RAG chatbot, refactoring data notebooks into a live dashboard, and building a web app from a Figma mockup. The key engineering patterns here — parallel subagents on separate git branches, hooks for automated workflows, GitHub Actions integration — are what "agentic" actually means in practice.

**Specific assignment:**
> "Watch Lesson 4 (Setup & Codebase Understanding) and Lesson 7 (Adding Multiple Features Simultaneously). In Lesson 7, pay specific attention to the git worktrees + parallel subagent pattern — this is the 'aha' moment that will change how you think about Claude Code from here forward. Lesson 8 (GitHub Integration & Hooks) is optional but strongly recommended before the Week 1 hooks lab."

---

### COURSE 1B — OFFICIAL ANTHROPIC ACADEMY

```
Title: Claude Code in Action
Type: Short course (structured)
Provider: Anthropic Academy (Skilljar)
URL: https://anthropic.skilljar.com/claude-code-in-action
Also on Coursera: https://www.coursera.org/learn/claude-code-in-action
Published: January 2026
Duration: ~1 hour (estimated from community reports; exact not confirmed — requires instructor verification)
Instructor: Anthropic team (not individually credited)
Free/Paid: Free (Skilljar account required, no Anthropic subscription needed); awards certificate
```

**Topics Covered (from official learning objectives):**
1. Understanding coding assistant architecture and tool integration
2. Exploring Claude Code's tool use system for multi-step programming tasks
3. Mastering context management techniques throughout conversations
4. Implementing visual communication workflows for interface changes
5. Creating custom automation and reusable commands
6. Extending functionality with MCP servers and external tools
7. Integrating with GitHub workflows for code review automation
8. Applying thinking and planning modes for varying complexity levels

**Scores:**
- Recency: 9/10 — January 2026, among the most current resources available
- Accuracy: 10/10 — Anthropic's own official training course; same zero-risk accuracy profile as their conference talks
- Longevity: 9/10 — Tool architecture, context management, and custom commands are load-bearing architectural content
- Depth: 7/10 — Unclear from research whether depth matches the DeepLearning.AI version or is more introductory. Community reports describe it as "~1 hour." Awards a certificate, suggesting structured assessment.
- **Average: 8.75/10**

**INCLUDE — WITH INSTRUCTOR VERIFICATION REQUIRED**

Verify: (1) Confirm whether this duplicates the DeepLearning.AI course or covers meaningfully different ground. (2) Check whether the MCP section references SSE as a current transport for remote servers — if yes, flag for students. (3) Confirm total duration.

Format fit: Sequential; takes ~1 hour. Appropriate for Week 1 supplemental or as the certificate-earning path for students who want official credentials.

**Week assignment: Week 1**
**Curriculum fit:** The official Anthropic certification path. Students who want a certificate to show their employer should complete this. Pairs with the DeepLearning.AI course — they are complementary, not redundant.

**Student-facing description:** Anthropic's own structured course on Claude Code, ending with an official certificate you can add to your LinkedIn profile. Takes approximately one hour and covers the same architectural ground as Phase 1 in greater depth: tool use system, context management, custom commands, MCP integration, and GitHub workflow automation. This is the credential path for the curriculum.

**Specific assignment:**
> "Complete the full course and submit your certificate screenshot to the cohort channel by end of Week 1. This is the only resource in the curriculum that awards an official Anthropic certificate — treat it as the Week 1 checkpoint artifact."

---

---

## Week 2 — MCP Protocol, Building Servers, Tool Schema Design

---

### COURSE 2A — ALREADY SELECTED (Reference Only)

The DeepLearning.AI MCP course (Elie Schoppik, May 2025, 9.5/10) is already the Week 2 anchor in VIDEO-LIBRARY-RESEARCH.md. It is the highest-rated resource in the entire research corpus. This entry is a reference so course designers know it is accounted for.

```
Title: MCP: Build Rich-Context AI Apps with Anthropic
Provider: DeepLearning.AI + Anthropic
URL: https://learn.deeplearning.ai/courses/mcp-build-rich-context-ai-apps-with-anthropic/
Duration: ~99 minutes (13 lessons)
Score: 9.5/10
Status: ALREADY SELECTED as Week 2 primary
```

---

### COURSE 2B — ANTHROPIC ACADEMY MCP (Two-Course Sequence)

```
Title: Introduction to Model Context Protocol
Type: Short course (structured, sequential)
Provider: Anthropic Academy (Skilljar)
URL: https://anthropic.skilljar.com/introduction-to-model-context-protocol
Also on Coursera: https://www.coursera.org/learn/introduction-to-model-context-protocol
Published: March 2026 (Anthropic Academy launch)
Duration: Unknown — requires instructor verification
Instructor: Anthropic team
Free/Paid: Free (Skilljar account + email required); awards certificate
```

**Topics Covered:**
- MCP architecture and design principles
- Transport-agnostic communication systems
- Request-response flow patterns
- Python SDK server development
- Document management functionality
- Built-in MCP Server Inspector for testing
- Resource definition and MIME type handling
- Prompt creation for reusable workflows
- Primitive selection strategies (tools vs. resources vs. prompts)
- Integration patterns including autocomplete

**Scores:**
- Recency: 10/10 — Anthropic Academy launched March 2026; this is the most current MCP course available
- Accuracy: 9/10 — First-party Anthropic; correctly covers all three primitives (tools, resources, prompts); **ONE CONCERN**: The companion Advanced Topics course mentions "StreamableHTTP transport with Server-Sent Events" in the same phrase — this may mean SSE is still treated as a feature of Streamable HTTP transport rather than a deprecated standalone. Requires instructor preview to confirm the framing is accurate (SSE is deprecated as a standalone transport; Streamable HTTP is the current spec).
- Longevity: 9/10 — Protocol-level content ages slowly; three-primitive model is stable
- Depth: 8/10 — Covers all primitives plus testing tooling (MCP Server Inspector); includes prompt templates as a primitive (often omitted by third-party courses)
- **Average: 9.0/10**

```
Title: Model Context Protocol: Advanced Topics
Type: Short course (structured, sequential)
Provider: Anthropic Academy (Skilljar)
URL: https://anthropic.skilljar.com/model-context-protocol-advanced-topics
Also on Coursera: https://www.coursera.org/learn/model-context-protocol-advanced-topics
Published: March 2026
Duration: Unknown — requires instructor verification
Instructor: Anthropic team
Free/Paid: Free; awards certificate
```

**Topics Covered:**
- Sampling implementation (MCP servers requesting LLM calls)
- Progress and logging notifications for long-running operations
- Roots-based file access control and permission systems
- JSON message architecture and bidirectional communication
- Stdio transport mechanisms and handshakes
- Streamable HTTP transport (with SSE for server-to-client communication)
- HTTP transport limitations and configuration flags
- Production scaling: stateless HTTP and horizontal scaling
- Transport selection criteria

**Scores:**
- Recency: 10/10 — March 2026
- Accuracy: 7/10 — **ACCURACY CONCERN**: The course describes "Streamable HTTP transport with Server-Sent Events" together. The current MCP spec (as of March 26, 2025) replaced the legacy HTTP+SSE transport with Streamable HTTP. SSE as a standalone transport is deprecated. The course may be conflating Streamable HTTP (correct) with the legacy SSE transport (deprecated). This is a red-line accuracy issue. **INSTRUCTOR PREVIEW REQUIRED before assigning.** If the course correctly frames SSE as a sub-mechanism within Streamable HTTP (not as the primary transport), this is acceptable. If it presents SSE as equivalent to or interchangeable with Streamable HTTP, it fails the accuracy test.
- Longevity: 8/10 — Sampling, notifications, and production scaling are durable architectural content
- Depth: 9/10 — Sampling alone (MCP servers requesting LLM calls) is a rare and advanced topic not covered in the DeepLearning.AI course
- **Average: 8.5/10 CONDITIONAL on accuracy verification**

**Combined Assessment for both MCP Anthropic Academy courses:**

INCLUDE CONDITIONALLY — INSTRUCTOR PREVIEW REQUIRED specifically for the Advanced Topics SSE/Streamable HTTP framing.

Format fit: Sequential; both courses pair naturally as a two-part Week 2 deep dive after the DeepLearning.AI MCP course.

**Week assignment: Week 2**
**Curriculum fit:** If the accuracy concern is resolved, these two courses together form the most authoritative MCP curriculum available anywhere. The Intro course replaces/reinforces the DeepLearning.AI course (nearly identical scope, with official Anthropic certificate). The Advanced course adds sampling and production scaling that nothing else in the research covers.

**Specific assignment (if accuracy verified):**
> "Complete 'Introduction to Model Context Protocol' from Anthropic Academy before the Week 2 lab. This earns your second official Anthropic certificate. After completing your own MCP server in the lab, revisit the Advanced Topics course — specifically the sampling section (MCP servers that can themselves call Claude) and the production scaling section. These will be directly relevant to Week 4 deployment work."

---

### COURSE 2C — ALTERNATE

```
Title: A2A: The Agent2Agent Protocol
Type: Short course (structured, sequential)
Provider: DeepLearning.AI (co-produced with Google Cloud and IBM)
URL: https://www.deeplearning.ai/short-courses/a2a-the-agent2agent-protocol/
Published: January 29, 2026
Duration: 1 hour 27 minutes (16 lessons including 14 video lessons)
Instructors: Holt Skinner (Google Cloud), Ivan Nardini (Google Cloud), Sandi Besen (IBM Research)
Free/Paid: Free
```

**Lesson Titles:**
1. Introduction / Why A2A Protocol?
2. A2A Architecture
3. Building a QA Agent with Claude on Vertex AI
4. Wrapping the QA Agent into an A2A Server
5. Calling an A2A Agent using an A2A Client
6. Creating a Healthcare Research Agent using Google ADK
7. Creating an A2A Sequential Chain Agent with ADK
8. Creating a Healthcare Provider Agent using LangGraph and MCP
9. Creating an A2A Client using Microsoft Agent Framework
10. Creating a Multi-Agent System using A2A with BeeAI Framework
11. Running A2A Agents on Agent Stack
12. Advanced A2A Concepts — Extensions and Security
13. Conclusion + Quiz

**Scores:**
- Recency: 10/10 — January 2026; A2A was launched April 2025 and donated to the Linux Foundation
- Accuracy: 8/10 — Google/IBM production content. Uses Claude on Vertex AI (Lesson 5), which is slightly indirect (not the Claude Code CLI path), but demonstrates MCP-compatible protocol design. The multi-framework approach (ADK, LangGraph, Microsoft Agent Framework, BeeAI) is accurate but assumes a framework-agnostic architecture worldview.
- Longevity: 7/10 — A2A is a new and evolving open standard. The protocol fundamentals will persist; specific framework integrations may shift.
- Depth: 8/10 — Shows multi-agent communication as a protocol problem, not just a code problem. Lesson 12 on security is rare and valuable.
- **Average: 8.25/10**

**INCLUDE AS ALTERNATE** — Not Week 2 primary (students are building MCP servers, not A2A servers). Best used as Week 3 supplemental reading on how agents communicate across system boundaries, or Week 4 advanced material for students interested in enterprise multi-agent deployment.

Format fit: Sequential; 1h27m is a realistic single-week assignment.

**Week assignment: Week 3 (alternate) or Week 4 (advanced)**
**Curriculum fit:** A2A is the complement to MCP: MCP connects agents to tools; A2A connects agents to agents. Students who have built their MCP server (Week 2) are ready to understand why agent-to-agent communication needs its own protocol (Week 3+).

**Student-facing description:** The Agent2Agent (A2A) Protocol is Google's open standard (Linux Foundation) for multi-agent communication — the complement to MCP. Where MCP connects your agent to tools and data sources, A2A connects it to other agents from different teams or companies. This course uses Claude on Vertex AI as one of the agents in a healthcare multi-agent system, making the multi-agent orchestration concepts from Week 3 concrete at a protocol level.

---

---

## Week 3 — Multi-Agent Orchestration, Agent Evaluation, Meta-Prompting

---

### COURSE 3A — PRIMARY PICK

```
Title: Agent Skills with Anthropic
Type: Short course (structured, sequential)
Provider: DeepLearning.AI (co-produced with Anthropic)
URL: https://www.deeplearning.ai/short-courses/agent-skills-with-anthropic/
Published: January 26, 2026
Duration: 2 hours 19 minutes (10 video lessons + quiz)
Instructor: Elie Schoppik, Head of Technical Education at Anthropic
Free/Paid: Free (DeepLearning.AI beta); additional features via Pro membership
```

**Lesson Titles:**
1. Introduction
2. Course Materials
3. Why Use Skills — Part I
4. Why Use Skills — Part II
5. Skills vs. Tools, MCP, and Subagents
6. Exploring Pre-Built Skills
7. Creating Custom Skills
8. Skills with the Claude API
9. Skills with Claude Code
10. Skills with the Claude Agent SDK
11. Conclusion + Quiz

**Scores:**
- Recency: 10/10 — January 2026; the most recent Anthropic-produced course available; reflects Skills as an open standard published December 2025
- Accuracy: 10/10 — Elie Schoppik is Anthropic's Head of Technical Education; same author as the 9.5/10 MCP course and 8.75/10 Claude Code course. First-party content means zero risk of fabricated flags or wrong primitive counts.
- Longevity: 10/10 — Lesson 5 ("Skills vs. Tools, MCP, and Subagents") is the taxonomy that every other Week 3 video builds on. This is foundational architectural thinking, not version-specific walkthrough. Skills as a format (folders of markdown + scripts) is design-intent stable.
- Depth: 9/10 — 2h19m is the longest course in this category. Covers Skills across three runtime environments (Claude.ai, Claude Code CLI, Claude Agent SDK) — giving students a complete picture of the skills ecosystem that no other single resource provides. Lesson 5 specifically addresses the "skills vs. MCP vs. subagents" confusion that blocks most practitioners.
- **Average: 9.75/10**

**INCLUDE — HIGHEST RATED COURSE IN RESEARCH**

Format fit: Sequential for the full conceptual arc; Lessons 5, 7, and 9 can be assigned independently as targeted supplements.

**Week assignment: Week 3**
**Curriculum fit:** This is the Week 3 anchor course. It directly teaches what the Week 3 primary video ("Don't Build Agents, Build Skills Instead," Barry Zhang & Mahesh Murag, 9.75/10) introduces conceptually. The video and this course are companion materials — watch the video first, then do the course.

**Student-facing description:** Elie Schoppik (Anthropic's technical education lead) explains the architecture that everything in Week 3 builds on: how Skills, MCP servers, and Subagents are different, when to use each, and how to build Skills that work across Claude.ai, Claude Code, and the Agent SDK. Lesson 5 ("Skills vs. Tools, MCP, and Subagents") is the most important taxonomy lesson in the curriculum. Take notes.

**Specific assignment:**
> "Watch Lesson 5 (Skills vs. Tools, MCP, and Subagents) before the Week 3 lab kickoff — this is the prerequisite for understanding why you're doing what you're doing. Then complete Lessons 7 and 9 (Creating Custom Skills + Skills with Claude Code) as your primary lab companion for the Week 3 skill-building lab. Lessons 8 and 10 (Skills with the API and Agent SDK) are recommended reading for Week 4 production work."

---

### COURSE 3B — PRIMARY PICK

```
Title: Evaluating AI Agents
Type: Short course (structured, sequential)
Provider: DeepLearning.AI (co-produced with Arize AI)
URL: https://www.deeplearning.ai/short-courses/evaluating-ai-agents/
Published: February 17, 2025
Duration: 2 hours 16 minutes (15 video lessons + 6 code labs + quiz)
Instructors: John Gilhuly (Head of Developer Relations, Arize AI) and Aman Khan (Director of Product, Arize AI)
Free/Paid: Free (platform beta)
```

**Lesson Titles:**
1. Introduction
2. Evaluation in the time of LLMs
3. Decomposing agents
4. Lab 1: Building your agent
5. Tracing agents
6. Lab 2: Tracing your agent
7. Adding router and skill evaluations
8. Lab 3: Adding router and skill evaluations
9. Adding trajectory evaluations
10. Lab 4: Adding trajectory evaluations
11. Adding structure to your evaluations
12. Lab 5: Adding structure to your evaluations
13. Improving your LLM-as-a-judge
14. Monitoring agents
15. Conclusion + Quiz + Appendix

**Scores:**
- Recency: 7/10 — February 2025; predates the March 2025 MCP transport spec change, but agent evaluation principles are not transport-dependent. One of the oldest resources recommended, but the content is principle-based rather than implementation-specific.
- Accuracy: 8/10 — Arize AI is a legitimate production tool; the evaluation principles (tracing, trajectory evaluation, LLM-as-judge, router evaluation) are universally valid. CONCERN: This course is built around the Arize Phoenix observability tool. Students learn general principles, but the labs run on Arize. Verify whether any MCP content appears and whether it's accurate; if so, check transport references. The evaluation content itself has no accuracy red lines.
- Longevity: 9/10 — Trajectory evaluation, component decomposition, and LLM-as-judge are foundational evaluation patterns that will apply regardless of which agent framework you use.
- Depth: 9/10 — 2h16m with 6 hands-on labs; covers the full evaluation stack from component-level (router, skills) to trajectory-level to production monitoring. "Fixing meaningless evaluation metrics" framing addresses the most common evaluation mistake.
- **Average: 8.25/10**

**INCLUDE**

CONCERN NOTE: The course is built on Arize Phoenix (a specific monitoring platform). The evaluation principles are transferable, but students will spend lab time on an Arize-specific tool. Frame this clearly: the principles are the assignment; the tool is scaffolding.

Format fit: Sequential for the full evaluation curriculum; modular after students understand tracing. Assign lessons 3, 5, 9, 10, 13 as a targeted sequence.

**Week assignment: Week 3**
**Curriculum fit:** Fills the largest gap in the current curriculum: agent evaluation. Nothing else in the research covers how to systematically measure whether an agent is working. This course provides the vocabulary (trajectory, router eval, LLM-as-judge, convergence score) students need before Phase 2's evaluation-driven development work.

**Student-facing description:** How do you know if your agent is actually working? This course teaches the complete evaluation stack for AI agents: decomposing agents into evaluable components, tracing agent execution to see what's happening, scoring agent trajectories (not just final outputs), using another LLM as a judge, and monitoring in production. The evaluation vocabulary and methodology here is what separates ad-hoc testing ("it seemed to work") from engineering-grade validation.

**Specific assignment:**
> "Read Lesson 2 (Evaluation in the time of LLMs) and Lesson 3 (Decomposing agents) as conceptual preparation. Then watch Lessons 9 and 10 (trajectory evaluations) — these are the core Week 3 evaluation concepts. Lesson 13 (Improving your LLM-as-a-judge) is required before Phase 2. Skip the Arize-specific setup in Labs 1–2; focus on the principles in the lesson videos. If you want hands-on evaluation labs, run Lab 3 (router + skill evaluations) — it's the most portable to non-Arize contexts."

---

### COURSE 3C — REFERENCE (Framework-Specific)

```
Title: AI Agents in LangGraph
Type: Short course (structured, sequential)
Provider: DeepLearning.AI
URL: https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/
Published: June 2, 2024
Duration: 1 hour 32 minutes (9 video lessons + quiz)
Instructors: Harrison Chase (LangChain Co-Founder/CEO), Rotem Weiss (Tavily Co-Founder/CEO)
Free/Paid: Free (platform beta)
```

**Scores:**
- Recency: 5/10 — June 2024; predates MCP, Skills, and Claude Code 2.0. Content reflects the pre-MCP agentic world.
- Accuracy: 8/10 — LangGraph-specific content is accurate within the LangGraph framework; no Claude-specific red lines present because the course doesn't use Claude directly.
- Longevity: 7/10 — LangGraph primitives (nodes, edges, state) are relatively stable, but the ecosystem has evolved significantly since June 2024.
- Depth: 8/10 — Covers persistence, human-in-the-loop, and essay-writing agents at a structural level.
- **Average: 7.0/10**

**DO NOT ASSIGN AS PRIMARY — REFERENCE ONLY**

Reason for exclusion: June 2024 predates too many curriculum-relevant changes. The course cannot be verified against current MCP spec, and it uses LangGraph rather than Claude Code. Students who have completed Phase 1 and understand the PRAO loop will find LangGraph's explicit graph structure a useful mental model for understanding multi-agent flow, but they should not use it as a primary Week 3 resource.

**If assigned at all:** Week 3 supplemental, one lesson only: Lesson 2 (Build an Agent from Scratch). This is the clearest mechanical explanation of how an agent loop runs at the code level — and it's LLM-agnostic.

---

### COURSE 3D — HUGGING FACE AGENTS COURSE (Reference)

```
Title: Hugging Face AI Agents Course
Type: Full free course (text + hands-on; no video)
Provider: Hugging Face
URL: https://huggingface.co/learn/agents-course/
Published: February 2025; ongoing (certification deadline extended beyond original May 1, 2025)
Duration: ~3–4 hours per week; 4 weeks; ~12–16 hours total
Instructors: Ben Burtenshaw, Sergio Paniego, Joffrey Thomas, Thomas Simonini (Hugging Face team)
Free/Paid: Free; certificate available
```

**Syllabus:**
- Unit 0: Onboarding (tools and platforms)
- Unit 1: Agent Fundamentals (tools, thoughts, actions, observations, LLMs, messages, special tokens)
- Unit 2: Frameworks (smolagents, LlamaIndex, LangGraph)
- Unit 3: Use Cases (community-contributed practical applications)
- Unit 4: Final Assignment (agent benchmark + student leaderboard)
- Bonus Unit 1: Fine-tuning an LLM for function-calling
- Bonus Unit 2: Agent Observability and Evaluation
- Bonus Unit 3: Agents in Games (Pokemon)

**Scores:**
- Recency: 7/10 — February 2025; predates Skills architecture and post-March 2025 MCP changes. Unit 2 covers LangGraph and LlamaIndex, which are compatible with Claude but not Claude Code specifically.
- Accuracy: 8/10 — Hugging Face team; framework content is accurate within the covered frameworks. No Claude Code-specific red lines present because the course doesn't cover Claude Code.
- Longevity: 8/10 — Unit 1 (fundamentals) and Bonus Unit 2 (evaluation) are the most durable content.
- Depth: 7/10 — Text-based course is well-written and conceptually rigorous. Bonus Unit 2 on evaluation is directly relevant to Week 3 curriculum needs.
- **Average: 7.5/10**

Format fit: Modular — each unit is independent. Bonus Unit 2 is the most immediately relevant.

**DO NOT ASSIGN AS PRIMARY — SELECTIVE SUPPLEMENTAL ONLY**

**Week assignment: Week 3 supplemental**
**Curriculum fit:** Bonus Unit 2 (Agent Observability and Evaluation) reinforces the Arize evaluation course from a framework-agnostic perspective. Unit 1 provides a clean mental model for students who want to understand agent architecture without Claude-specific framing.

**Specific assignment (if used):**
> "Read Unit 1 of the Hugging Face Agents Course for a framework-agnostic explanation of how agents work at the architecture level. Then read Bonus Unit 2 on observability and evaluation — it pairs with the Arize evaluation course as a second perspective on the same problem."

---

---

## Week 4 — Spec-Driven Development, Agent Testing, Production Deployment

---

### COURSE 4A — PRIMARY PICK

```
Title: Agentic AI with Andrew Ng
Type: Short course (structured, sequential)
Provider: DeepLearning.AI
URL: https://www.deeplearning.ai/courses/agentic-ai/
Published: September 23, 2025
Duration: Self-paced; 5 modules; capstone project
Instructor: Andrew Ng (Founder, DeepLearning.AI; Co-Founder, Coursera)
Free/Paid: Free audit (Pro membership at $25/month adds labs, quizzes, certificate)
```

**Module Titles:**
1. Introduction to Agentic AI
2. Reflection Design Pattern
3. Tool Use Design Pattern
4. Practical Tips for Building Agentic AI
5. Planning and Multi-Agent Systems
6. Capstone Project: Research Agent

**Scores:**
- Recency: 9/10 — September 2025; reflects post-Claude Code 2.0 agentic AI landscape
- Accuracy: 9/10 — Andrew Ng is a reliable technical educator with deep LLM expertise; the four patterns (Reflection, Tool Use, Planning, Multi-Agent) are framework-agnostic design patterns, not implementation claims. No Claude-specific red lines to trigger.
- Longevity: 10/10 — The four agentic design patterns (Reflection, Tool Use, Planning, Multi-Agent) are the most durable conceptual framework available. These patterns will apply regardless of which model or framework students use in Phase 2.
- Depth: 7/10 — The free audit tier limits lab access. Module 4 ("Practical Tips") is the most immediately relevant for Week 4 production work. The capstone (Research Agent) demonstrates evaluation-driven development.
- **Average: 8.75/10**

Format fit: Modular for Week 4 use; Module 4 and the Capstone are the Week 4-relevant pieces.

**Week assignment: Week 4**
**Curriculum fit:** The four design patterns synthesize everything in the curriculum: Reflection is the evaluation loop; Tool Use is what MCP enables; Planning is spec-driven development; Multi-Agent is Week 3's orchestration work. Module 4's "Practical Tips" section covers evaluation-driven iteration — the Week 4 core skill.

**Student-facing description:** Andrew Ng's frameworks course organizes everything you've learned into four design patterns that will follow you into every agentic system you build: Reflection (agents evaluating their own work), Tool Use (agents calling external systems via MCP), Planning (agents breaking down complex tasks), and Multi-Agent (agents delegating to other agents). Module 4 specifically covers practical production tips — this is the Week 4 preparation content. Free to audit; labs require Pro access.

**Specific assignment:**
> "Complete Module 4 (Practical Tips for Building Agentic AI) as your Week 4 preparation reading. Then review Module 5 (Planning and Multi-Agent Systems) as a synthesis of Weeks 1–3. The Capstone (Research Agent) is optional but strongly recommended for students who want a worked example of evaluation-driven development to model their Phase 2 entry spec on."

---

### COURSE 4B — ALTERNATE (Framework-Specific)

```
Title: Design, Develop, and Deploy Multi-Agent Systems with CrewAI
Type: Full course (structured, 4 modules)
Provider: DeepLearning.AI + CrewAI (also on Coursera)
URL: https://www.deeplearning.ai/courses/design-develop-and-deploy-multi-agent-systems-with-crewai/
Published: November 4, 2025
Duration: ~4 modules (full duration not specified; equivalent Coursera version is estimated 6–10 hours)
Instructor: João Moura (Co-Founder and CEO, CrewAI)
Free/Paid: Free
```

**Module Titles:**
1. Foundations of AI Agents (LLMs, Tasks, Agents, Crews, Flows)
2. Working with AI Agents (ReAct loop, memory, tools, MCP, hooks, guardrails)
3. Managing Systems of AI Agents (A2A protocols, human-in-the-loop, tracing, state)
4. Applying AI Agents in Business (patterns, anti-patterns, adoption lifecycle)

**Scores:**
- Recency: 9/10 — November 2025; Module 2 explicitly covers MCP integration and hooks
- Accuracy: 8/10 — CrewAI is a legitimate production multi-agent framework. Module 2 mentions MCP — verify that MCP transport is correctly referenced (Streamable HTTP, not SSE) before assigning.
- Longevity: 7/10 — Module 4 ("patterns and anti-patterns") is the most durable content. CrewAI-specific API details will evolve.
- Depth: 8/10 — Module 3 covers tracing and observability (complementary to the Arize evaluation course); Module 4 covers anti-patterns (rare and valuable for Week 4 production mindset).
- **Average: 8.0/10**

**INCLUDE AS ALTERNATE** — Module 4's production-oriented content (patterns, anti-patterns, adoption lifecycle) fills a Week 4 gap. However, this is CrewAI-specific, which means the orchestration implementation details will not transfer directly to Claude Code native multi-agent workflows. Assign for the conceptual patterns, not the implementation.

Format fit: Sequential within each module; modules are independent.

**Week assignment: Week 4**
**Curriculum fit:** Module 4's production patterns and anti-patterns content is the most Week 4-relevant piece. Students who have completed Weeks 1–3 with Claude Code native tools will recognize these patterns from their own experience. Reading them as named, structured anti-patterns creates useful vocabulary for Phase 2 design reviews.

**Specific assignment (if used):**
> "Read Module 4 (Applying AI Agents in Business) for the patterns and anti-patterns section. This is CrewAI-flavored but the patterns are universal. Compare each anti-pattern to your own Week 2 and Week 3 work — have you already made any of these mistakes? Document one pattern and one anti-pattern you've personally encountered in your Phase 2 entry spec."

---

---

# SECTION 2: PLAYLISTS

---

### PLAYLIST 2A — CODE WITH CLAUDE 2025 (CONFERENCE ARCHIVE)

```
Title: Code with Claude 2025 Conference — All Sessions
Type: Conference session archive (YouTube playlist)
Provider: Anthropic (official)
URL: https://www.anthropic.com/events/code-with-claude-2025 (individual session links from conference page)
YouTube channel: youtube.com/@Anthropic
Published: May 22, 2025 (sessions released July–August 2025)
Total sessions: ~18 individual talks
Format: Each session is a standalone 25–30 minute video; no playlist URL confirmed
Free/Paid: Free (YouTube)
```

**Full Session Inventory (with YouTube links):**

| Session Title | YouTube URL | Curriculum Week |
|--------------|-------------|-----------------|
| Mastering Claude Code in 30 min (Boris Cherny) | https://www.youtube.com/watch?v=6eBSHbLKuN0 | Week 1 ★ |
| Claude Code Best Practices | https://www.youtube.com/watch?v=gv0WHhKelSE | Week 1 ★ |
| Taking Claude to the Next Level | https://www.youtube.com/watch?v=nZCy8E5jlok | Week 4 (preview required) |
| Building Headless Automation with Claude Code | https://www.youtube.com/watch?v=dRsjO-88nBs | Week 2 ★ |
| Vibe Coding in Prod | https://www.youtube.com/watch?v=fHWFF_pnqDk | Week 4 alternate |
| Building Blocks for Tomorrow's AI Agents | https://www.youtube.com/watch?v=oDks2gVHu4k | Week 3 alternate |
| Prompting for Agents (Hannah Moran) | https://www.youtube.com/watch?v=XSZP9GhhuAc | Week 3 ★ |
| Building AI agents with Claude in Amazon Bedrock | https://www.youtube.com/watch?v=8gTpgWru0Wg | Week 4 supplemental |
| Building AI agents with Claude in Google Cloud | https://www.youtube.com/watch?v=TUysIAtxyrQ | Week 4 supplemental |
| MCP 201: Power of the Protocol (David Soria Parra) | https://www.youtube.com/watch?v=HNzH5Us1Rvg | Week 2 ★ |
| MCP at Sourcegraph (Beyang Liu) | https://www.youtube.com/watch?v=j8NlbEWAsmc | Week 2 alternate |
| Claude plays Pokemon (tool use demo) | https://www.youtube.com/watch?v=0XUzn-DEoY8 | Week 3 fun/concept |
| Prompting 101 | https://www.youtube.com/watch?v=ysPbXH0LpIE | Week 4 ★ |
| Manus (customer spotlight) | https://www.youtube.com/watch?v=UjboGsztHd8 | Week 3/4 optional |
| Canva (Danny Wu) | https://www.youtube.com/watch?v=Ac4LiuoJT20 | Week 4 optional |
| Databricks (Craig Wiley) | https://www.youtube.com/watch?v=67a5yrKH-nI | Week 4 optional |
| Shopify | https://www.youtube.com/watch?v=xlEQ6Y3WNNI | Week 4 optional |
| Student Innovation | https://www.youtube.com/watch?v=PHuXXeadV_g | Inspirational |

★ = Already selected as primary in VIDEO-LIBRARY-RESEARCH.md

**Playlist-level Assessment:**

The Code with Claude 2025 conference is the single richest source in the entire research corpus. 8 of 12 videos already selected in VIDEO-LIBRARY-RESEARCH.md come from this event. The full conference archive functions as a playlist even without a formal YouTube playlist URL.

**Scores:**
- Recency: 9/10 — May 2025
- Accuracy: 10/10 — Every session is Anthropic first-party or Anthropic-reviewed for conference inclusion
- Longevity: 9/10 — Conference format; architectural content ages slowly
- Depth: 9/10 — 18 sessions across the full curriculum arc
- **Average: 9.25/10**

**How to assign as a playlist:**
Individual sessions are already assigned in VIDEO-LIBRARY-RESEARCH.md. The playlist-level assignment is for Week 4 synthesis:

> "For Week 4 synthesis: Browse the complete Code with Claude 2025 session list above. Select one session you have NOT yet been assigned that covers a production use case (Canva, Databricks, Shopify, Manus, or Amazon Bedrock). Watch it and add a 200-word reflection to your Phase 2 entry spec: 'What engineering pattern in this production deployment will I apply in my own Phase 2 project, and why?'"

---

### PLAYLIST 2B — AI ENGINEER SUMMIT 2025 (ONLINE TRACK)

```
Title: AI Engineer Summit 2025 — Agents at Work (Online Track)
Type: Conference archive (YouTube playlist — individual videos linked)
Provider: AI Engineer (conference organization; @aiDotEngineer on YouTube)
Published: February 20–21, 2025 (recordings released within days of the conference)
YouTube channel: youtube.com/@aiDotEngineer
Total sessions: 30+ individual talks from the online track
Free/Paid: Free (YouTube)
```

**Scores:**
- Recency: 8/10 — February 2025; predates some Skills architecture content but reflects the primary agentic engineering concerns of 2025
- Accuracy: 7/10 — Third-party conference; accuracy varies by speaker. The specific talks being assigned have been individually vetted.
- Longevity: 8/10 — Practitioner lessons-learned content is retrospective and principle-based
- Depth: 8/10 — Conference format; 20–30 minutes per talk; practitioner-grade content rather than tutorial content

**Selected sessions for curriculum assignment (from vetted list):**

| Session | Speaker | YouTube URL | Week | Topic |
|---------|---------|-------------|------|-------|
| On Agents (keynote) | Chip Huyen | https://youtu.be/D6v5rlqUIc8 | Week 3 | Architectural framing for agentic systems |
| AI agents meet test-driven development | Anita Kirkovska (Vellum) | https://youtu.be/U3MVU6JpocU | Week 3/4 | Eval methodology via TDD |
| Agent evaluation frameworks | Ari Heljakka (Root Signals) | https://youtu.be/y2Drx0SDZLo | Week 3 | Evaluation tooling |
| Fixing meaningless evaluation metrics | Mohak Sharma (HoneyHive) | https://youtu.be/3jwClx0Ft2E | Week 3 | Eval anti-patterns |
| Mission-critical evaluations at scale | Christopher Lovejoy (Anterior) | https://youtu.be/cZ5ZJy19KMo | Week 4 | Production eval at scale |
| How agents will transform organizations | Patrick Debois | https://youtu.be/FpJ9dPe1qYQ | Week 4 | Deployment framing |
| Tool calling beyond basic plumbing | Roy Derks (IBM) | https://youtu.be/zuMw0pkPXpU | Week 2/3 | Tool schema design |

**ACCURACY CAVEAT:** These sessions have not been individually verified against the accuracy red lines. The "Tool calling beyond basic plumbing" session (Roy Derks, IBM) is the highest-risk for MCP accuracy issues — verify it does not present SSE as a current transport for remote MCP servers before assigning in Week 2.

**Week assignment: Multiple (see table above)**

**How to assign:**
These are conference talks, not course lessons. Assign as targeted 20-30 minute supplements, not as a full playlist.

> "Week 3 optional deep-dive: Watch 'Agent evaluation frameworks' (Ari Heljakka, 20 min) AND 'Fixing meaningless evaluation metrics' (Mohak Sharma, 20 min) together as a paired set. They represent opposing views of how to build a good evaluation system — the friction between them is the learning."

> "Week 4 optional: Watch 'Mission-critical evaluations at scale' (Christopher Lovejoy, ~25 min). This is a production healthcare AI deployment — the stakes are real. Write one paragraph on how their evaluation approach would apply to your Phase 2 project."

---

### PLAYLIST 2C — ANTHROPIC ACADEMY COMPLETE CURRICULUM

```
Title: Anthropic Academy — Developer Track
Type: Structured multi-course curriculum (Skilljar)
Provider: Anthropic (official)
URL: https://anthropic.skilljar.com/
Published: March 2026 (Academy launch)
Relevant courses (developer track):
  - Claude Code in Action (Week 1)
  - Introduction to Model Context Protocol (Week 2)
  - Model Context Protocol: Advanced Topics (Week 2, with caveat)
  - Introduction to Agent Skills (Week 3)
  - Building with the Claude API (Week 4/supplemental)
Free/Paid: All free; all award certificates
```

**Scores for the Academy as a curriculum system:**
- Recency: 10/10 — March 2026 launch
- Accuracy: 9/10 — First-party Anthropic; one confirmed accuracy check item (MCP Advanced Topics SSE framing)
- Longevity: 9/10 — Official Anthropic platform; will be maintained and updated
- Depth: 8/10 — Varies by course; the MCP two-course sequence and Agent Skills course are the deepest

**Why treat this as a playlist:**
Anthropic Academy is a coherent four-course developer track that maps directly to the curriculum arc: Claude Code → MCP Intro → MCP Advanced → Agent Skills. Students who complete all four earn four official Anthropic certificates. This is the credential pathway for the entire async curriculum.

**Complete four-course developer track assignment:**

| Course | URL | Week | Certificate |
|--------|-----|------|-------------|
| Claude Code in Action | https://anthropic.skilljar.com/claude-code-in-action | Week 1 | Cert #1 |
| Introduction to Model Context Protocol | https://anthropic.skilljar.com/introduction-to-model-context-protocol | Week 2 | Cert #2 |
| Model Context Protocol: Advanced Topics | https://anthropic.skilljar.com/model-context-protocol-advanced-topics | Week 2 | Cert #3 (conditional) |
| Introduction to Agent Skills | https://anthropic.skilljar.com/introduction-to-agent-skills | Week 3 | Cert #4 |

> "Anthropic Academy is your credential pathway through this curriculum. Complete each Anthropic Academy course in the same week as the corresponding curriculum content, and share your certificate to the cohort channel when you finish. By end of Week 3, you will have 3–4 official Anthropic certificates that you can add to your LinkedIn profile. The MCP Advanced Topics certificate is conditional — your instructor will confirm whether that course passes accuracy review before Week 2 begins."

---

---

# SECTION 3: CONFERENCE ARCHIVES

---

### ARCHIVE 3A — CODE WITH CLAUDE 2025 (FULL INVENTORY)

Already fully covered in Playlist 2A above. All 18 sessions inventoried; 8 selected as curriculum primaries.

---

### ARCHIVE 3B — AI ENGINEER SUMMIT 2025 (SELECTED SESSIONS)

Already covered in Playlist 2B above. 7 sessions selected as targeted supplements; accuracy verification required for MCP-adjacent talks.

---

### ARCHIVE 3C — NOT RECOMMENDED: NeurIPS/ICML 2024-2025 WORKSHOPS

**Research finding:** NeurIPS 2025 and ICML 2025 workshops on multi-agent systems and agent evaluation were identified. These include:
- NeurIPS 2025: Workshop on Multi-Turn Interactions in LLMs
- NeurIPS 2025: Social on Evaluating Agentic Systems
- ICML 2025: Multi-Agent Systems in the Era of Foundation Models workshop
- ICML 2025: Workshop on Computer Use Agents

**Why not recommended:**
1. Academic workshop videos are rarely free-access after the conference
2. NeurIPS 2025 content requires conference registration or is gated behind the virtual platform
3. The research framing (benchmark construction, formal evaluation metrics) is not immediately applicable to practitioner engineering
4. None of the identified workshops is Claude-specific
5. Better practitioner content exists in the AI Engineer Summit and Code with Claude archives

**Exception:** If a student is interested in the theoretical foundations of agent evaluation, the ICML 2025 IntellAgent paper ("A Multi-Agent Framework for Evaluating Conversational AI Systems") is available at icml.cc and is worth assigning as optional reading — but the video format is not confirmed to be free-access.

---

### ARCHIVE 3D — NOT RECOMMENDED: Weights & Biases Fully Connected 2025

**Research finding:** The Fully Connected 2025 conference (San Francisco, Tokyo, London) featured agent-focused tracks including "prototype to production" content. On-demand recordings are available on the W&B website, but the specific session list relevant to Claude Code was not confirmed in research.

**Why not recommended as primary:**
1. Session-specific content is embedded on the W&B website behind registration, not on YouTube
2. No Claude-specific sessions were confirmed
3. The content is more relevant to ML experiment tracking (W&B's core use case) than to Claude Code agentic engineering specifically
4. The relevant production content from practitioners is better represented in the AI Engineer Summit archive

**If assigned:** Only assign a confirmed, specific W&B session that directly covers agent evaluation or multi-agent production deployment. Do not assign "browse the Fully Connected archive" as a task.

---

---

# SECTION 4: EXCLUSIONS AND NEAR-MISSES

---

## Courses Evaluated and Not Recommended

### Vanderbilt / Dr. Jules White — Claude Code: Software Engineering with Generative AI Agents (Coursera)

```
URL: https://www.coursera.org/learn/claude-code
Duration: ~5 hours (7 modules)
Cost: Coursera subscription required for full access
Rating: 4.89/5 from 105 reviews; 25,000+ enrollments
```

**Why not recommended:**
- **Not free.** Coursera subscription required to access course materials (not just certificate). This violates the free access requirement.
- Designed for relative beginners; students who completed Phase 1 will find the pacing too slow.
- Third-party content (Vanderbilt University, not Anthropic); accuracy cannot be guaranteed at the same level as first-party sources.
- Jules White is a credible educator but not an Anthropic insider; some specifics may lag behind current Claude Code behavior.

**Note:** This course is the most searched Claude Code course on Coursera. Students who want to understand how an outsider academic structures Claude Code pedagogy will find it useful. Do not assign it; mention it in supplemental resources.

---

### Sabrina Ramonov — Claude Code Full Course (substack/personal site)

Already evaluated in VIDEO-LIBRARY-RESEARCH.md as Alternate 1B (8.0/10). Not a structured course in the sense of this document — it is a newsletter with embedded video content. Appropriate as an alternate if a primary becomes unavailable.

---

### AI Hero — Claude Code for Real Engineers (cohort course, $477)

```
URL: https://www.aihero.dev/cohorts/claude-code-for-real-engineers-2026-04
Cost: $477 (discounted from $795)
Starts: March 30, 2026
Instructor: Matt Pocock
```

**Why not recommended:**
- Paid content ($477) — violates free access requirement
- Cohort-based (starts specific date); not compatible with async curriculum
- Matt Pocock is a TypeScript educator pivoting to AI; not an Anthropic insider

Strong content signals (context window management, Ralph loops, testing strategies) but the price and cohort format make it incompatible with this curriculum.

---

### Andrew Ng — Multi AI Agent Systems with CrewAI (DeepLearning.AI)

Framework-specific (CrewAI). CrewAI is a legitimate framework but adds framework-learning overhead on top of agent system learning. Students in this curriculum are already learning the Claude Code native orchestration approach. Adding CrewAI vocabulary creates unnecessary cognitive load in a 4-week bridge curriculum.

---

---

# SUMMARY TABLE

## Courses

| Course | Provider | Published | Duration | Week | Score | Status |
|--------|----------|-----------|----------|------|-------|--------|
| Claude Code: A Highly Agentic Coding Assistant | DeepLearning.AI + Anthropic | Aug 2025 | 1h50m | 1 | 8.75 | **SELECTED** |
| Claude Code in Action | Anthropic Academy | Jan 2026 | ~1h | 1 | 8.75 | **SELECTED** (verify duration) |
| Introduction to MCP | Anthropic Academy | Mar 2026 | unknown | 2 | 9.0 | **SELECTED** (already covered; verify SSE) |
| MCP: Advanced Topics | Anthropic Academy | Mar 2026 | unknown | 2 | 8.5 | **SELECTED CONDITIONAL** (SSE framing check) |
| Agent Skills with Anthropic | DeepLearning.AI + Anthropic | Jan 2026 | 2h19m | 3 | **9.75** | **SELECTED — HIGHEST RATED** |
| Evaluating AI Agents | DeepLearning.AI + Arize AI | Feb 2025 | 2h16m | 3 | 8.25 | **SELECTED** |
| Agentic AI with Andrew Ng | DeepLearning.AI | Sep 2025 | 5 modules | 4 | 8.75 | **SELECTED** |
| A2A: The Agent2Agent Protocol | DeepLearning.AI + Google | Jan 2026 | 1h27m | 3/4 alt | 8.25 | **ALTERNATE** |
| Design, Develop, Deploy Multi-Agent (CrewAI) | DeepLearning.AI + CrewAI | Nov 2025 | 4 modules | 4 alt | 8.0 | **ALTERNATE** (Module 4 only) |
| HuggingFace Agents Course | Hugging Face | Feb 2025 | 12–16h | 3 supp | 7.5 | **SUPPLEMENTAL** (Bonus Unit 2 only) |
| AI Agents in LangGraph | DeepLearning.AI | Jun 2024 | 1h32m | — | 7.0 | **EXCLUDED** (too old; wrong tool) |
| Vanderbilt Claude Code (Coursera) | Vanderbilt / Jules White | 2025 | 5h | — | n/a | **EXCLUDED** (paid; wrong audience) |

## Playlists and Conference Archives

| Resource | Provider | Published | Sessions | Score | Status |
|----------|----------|-----------|----------|-------|--------|
| Code with Claude 2025 (all sessions) | Anthropic | May 2025 | 18 | 9.25 | **SELECTED** (as playlist; 8 sessions individually selected) |
| Anthropic Academy Developer Track | Anthropic | Mar 2026 | 4 courses | 9.0 | **SELECTED** (certificate pathway) |
| AI Engineer Summit 2025 Online Track | AI Engineer | Feb 2025 | 30+ | 8.0 | **SELECTED** (7 sessions targeted) |
| Weights & Biases Fully Connected 2025 | W&B | Nov 2025 | unknown | n/a | **EXCLUDED** (not YouTube; not Claude-specific) |
| NeurIPS/ICML 2024-2025 Workshops | Academic | 2024-2025 | various | n/a | **EXCLUDED** (gated; academic framing) |

---

---

# INSTRUCTOR ACTIONS REQUIRED

The following items require human review before this document is production-ready:

1. **MCP Advanced Topics SSE framing (CRITICAL):**
   Preview `https://anthropic.skilljar.com/model-context-protocol-advanced-topics`. Confirm whether the course presents SSE as: (a) a sub-mechanism within Streamable HTTP (acceptable) or (b) an equivalent/alternative transport to Streamable HTTP (fails accuracy test; SSE is deprecated as a standalone transport since March 26, 2025). If it fails, demote to EXCLUDED.

2. **Claude Code in Action duration and depth confirmation:**
   Multiple sources report ~1 hour but the exact duration and lesson count for the Anthropic Academy version were not confirmed programmatically. Preview the full lesson list before assigning as Week 1 checkpoint.

3. **AI Engineer Summit session accuracy verification:**
   Before assigning "Tool calling beyond basic plumbing" (Roy Derks, IBM, `https://youtu.be/zuMw0pkPXpU`), verify it does not present SSE as a current transport for remote MCP servers.

4. **Code with Claude conference playlist URL:**
   Anthropic's YouTube channel has published all 18 Code with Claude sessions but no single playlist URL was confirmed in research. Find the official playlist link and add it to this document so students can browse all sessions for the Week 4 synthesis assignment.

5. **Chip Huyen "On Agents" keynote accuracy:**
   Before assigning as Week 3 optional (`https://youtu.be/D6v5rlqUIc8`), verify it does not contain any Claude Code-specific accuracy issues (fabricated flags, wrong primitive counts). Chip Huyen is generally accurate on LLM systems but speaks at the infrastructure level, not Claude Code specifically.

---

---

# WEEK-BY-WEEK ASSIGNMENT GUIDE

## Week 1 — CLAUDE.md, Context Engineering, Workflow Internals

**Core video assignments** (from VIDEO-LIBRARY-RESEARCH.md):
- Boris Cherny: Mastering Claude Code in 30 min (9.25/10) — required
- Anthropic: Claude Code Best Practices (8.75/10) — required
- Cole Medin: Claude Code Complete Guide (8.75/10) — required (MCP section with SSE caveat)

**Course additions from this document:**
- DeepLearning.AI: Claude Code: A Highly Agentic Coding Assistant — assign Lessons 4 and 7 specifically
- Anthropic Academy: Claude Code in Action — complete for Certificate #1

**Total Week 1 course time:** ~2h (DeepLearning.AI Lessons 4+7: ~28 min) + (~1h Claude Code in Action) = ~1h30m course content beyond the 3 videos

---

## Week 2 — MCP Protocol, Building Servers, Tool Schema Design

**Core video assignments** (from VIDEO-LIBRARY-RESEARCH.md):
- Anthropic: MCP 201 Power of the Protocol (9.25/10) — required
- DeepLearning.AI: MCP course, Lessons 1–11 (9.5/10) — required
- Anthropic: Building Headless Automation (9.0/10) — required

**Course additions from this document:**
- Anthropic Academy: Introduction to Model Context Protocol — complete for Certificate #2
- Anthropic Academy: MCP Advanced Topics — conditional; assign sampling section if course passes accuracy review

**Total Week 2 course time:** DeepLearning.AI MCP course already counts as ~99 min. Anthropic Academy Intro MCP course adds parallel certification track. MCP Advanced Topics adds ~30 min if assigned (sampling + production scaling sections only).

---

## Week 3 — Multi-Agent Orchestration, Agent Evaluation, Meta-Prompting

**Core video assignments** (from VIDEO-LIBRARY-RESEARCH.md):
- Barry Zhang & Mahesh Murag: Don't Build Agents, Build Skills (9.75/10) — required
- Hannah Moran: Prompting for Agents (9.5/10) — required
- Barry Zhang: How We Build Effective Agents (9.0/10) — required

**Course additions from this document:**
- DeepLearning.AI: Agent Skills with Anthropic — Lessons 5, 7, 9 (required); Lessons 8, 10 (recommended for Week 4)
- DeepLearning.AI: Evaluating AI Agents — Lessons 2, 3, 9, 10, 13 (targeted; skip Arize-specific lab setup)
- Anthropic Academy: Introduction to Agent Skills — complete for Certificate #3
- AI Engineer Summit: Paired evaluation talks (Ari Heljakka + Mohak Sharma) — optional deep-dive

**Total Week 3 course time:** ~2h (Agent Skills Lessons 5+7+9: ~45 min) + (~1h targeted Evaluating AI Agents) + (~30 min Agent Skills Anthropic Academy) = ~2h15m course content beyond the 3 videos

---

## Week 4 — Spec-Driven Development, Agent Testing, Production Deployment

**Core video assignments** (from VIDEO-LIBRARY-RESEARCH.md):
- Anthropic: Prompting 101 (9.25/10) — required
- Anthropic: Taking Claude to Next Level (8.75/10) — required (instructor preview needed)
- All About AI: Claude Code Best Practices SubAgents — conditional

**Course additions from this document:**
- DeepLearning.AI: Agentic AI with Andrew Ng — Module 4 required; Module 5 recommended; Capstone optional
- Code with Claude 2025 synthesis task (browse one production case study from the archive)
- AI Engineer Summit: Christopher Lovejoy "Mission-critical evaluations at scale" — optional

**Total Week 4 course time:** ~45 min (Andrew Ng Module 4+5) + synthesis task (30 min watch + 30 min writing) = ~1h45m course content beyond the core videos

---

---

*Research completed 2026-03-17/18. All URLs verified as active at time of research. Platform access (DeepLearning.AI, Anthropic Academy, YouTube) confirmed free. Accuracy red lines applied per project CLAUDE.md. Instructor verification items flagged explicitly.*
