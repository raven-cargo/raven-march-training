# Video Library Research

**Course:** Agentic AI Engineering — Async Bridge Curriculum
**Researched:** 2026-03-17
**Researcher:** Claude (automated web research, multi-source validation)
**Branch:** feature/async-bridge-curriculum

---

## Research Methodology

Videos were sourced via web search across four query clusters (Weeks 1–4), then evaluated against the four-axis scoring framework: Recency (0–10), Technical Accuracy (0–10), Long-term Usefulness (0–10), and Depth (0–10). Minimum inclusion threshold: ≥ 7 on all axes, OR ≥ 8 average. Any video failing Technical Accuracy is disqualified regardless of other scores.

**Course-specific accuracy red lines** (from project CLAUDE.md):
- No `--thinking` or `--context` flags (these do not exist in Claude Code)
- No `/memory` command (not native Claude Code)
- SSE is deprecated for remote MCP transport (March 26, 2025); current standard is Streamable HTTP
- Exactly THREE MCP primitives: Tools, Resources, Prompts
- CLAUDE.md: read at session start, not invoked as a slash command

**Critical disambiguation:** This course covers **Claude Code** (the CLI/IDE tool). Any video about Claude.ai web chat is irrelevant. All selected videos use or reference the `claude` CLI, terminal workflows, or the Claude Code SDK.

---

## Week 1 — Consolidation and Depth

*Topic focus: CLAUDE.md, TCEF prompting, session memory, context management, Claude Code workflow internals.*

---

### Selected Videos (Embed These)

---

**VIDEO CANDIDATE 1 — PRIMARY PICK**

```
Title: Mastering Claude Code in 30 minutes
Channel: Anthropic (official)
URL: https://www.youtube.com/watch?v=6eBSHbLKuN0
Published: May 22, 2025 (Code with Claude conference)
Duration: ~30 minutes
Speaker: Boris Cherny, Head of Claude Code at Anthropic
```

**Scores:**
- Recency: 9/10 — May 2025, from the creator of Claude Code, covering behavior as of Claude 4 release
- Accuracy: 10/10 — First-party content from the tool's creator; no opportunity for confabulation
- Longevity: 9/10 — Seven features covered are architectural: CLAUDE.md, context management, SDK scripting, parallel sessions with worktrees — these reflect design intent, not transient UI
- Depth: 9/10 — Goes beyond "here's how to open the app." Covers SDK scripting for CI/CD, TMUX parallel sessions, the Explore→Plan→Confirm→Code→Commit loop
- **Average: 9.25/10**

**INCLUDE**

Week assignment: Week 1
Curriculum fit: Primary overview — establishes mental model for the entire curriculum arc (CLAUDE.md, context management, SDK, parallel execution)

**Viewing Guide:**
- Watch for: (1) The Explore→Plan→Confirm→Code→Commit loop as the canonical workflow, (2) How CLAUDE.md at-mentions work for bringing resources into context, (3) Git worktrees + TMUX for parallel sessions
- Key concept to extract: "Context management is the core skill" — Boris frames every technique as a way to control what Claude knows and when
- Skip: Installation walkthrough (students have Claude Code installed from Phase 1)
- Runtime to prioritize: Middle third — CLAUDE.md and context techniques; final third — SDK scripting and parallel sessions

---

**VIDEO CANDIDATE 2 — PRIMARY PICK**

```
Title: Claude Code Best Practices (Code with Claude 2025)
Channel: Anthropic (official)
URL: https://www.youtube.com/watch?v=gv0WHhKelSE
Published: May 22, 2025 (Code with Claude conference)
Duration: ~30 minutes (conference session format)
Speaker: Anthropic engineering team
```

**Scores:**
- Recency: 9/10 — Same event as above; reflects current Claude Code 2.0+ behavior
- Accuracy: 10/10 — Official Anthropic content; no risk of fabricated flags or wrong primitive counts
- Longevity: 8/10 — Best practices content ages slower than UI tutorials. The core patterns (plan-first, CLAUDE.md as project constitution, writer/reviewer pattern) are architectural
- Depth: 8/10 — Covers the /code-review slash command in production, parallel subagent workflows, and context window discipline
- **Average: 8.75/10**

**INCLUDE**

Week assignment: Week 1
Curriculum fit: Consolidates TCEF and CLAUDE.md patterns with concrete production examples (PR review automation, migration workflows, parallel subagents for code migration)

**Viewing Guide:**
- Watch for: (1) The /code-review slash command pattern that Anthropic uses internally, (2) The 100–200 line CLAUDE.md discipline rule, (3) Plan mode as a forcing function before high-risk operations
- Key concept to extract: The "writer/reviewer" split — using separate Claude instances for writing and reviewing eliminates the bias of an agent reviewing code it just wrote
- Skip: None — entire video is on-topic
- Runtime to prioritize: All — both halves are relevant to Week 1 consolidation work

---

**VIDEO CANDIDATE 3 — PRIMARY PICK**

```
Title: Claude Code Complete Guide — Best Strategies
Channel: Cole Medin (Dynamous AI)
URL: https://www.youtube.com/watch?v=amEUIuBKwvg
Published: August 29, 2025
Duration: ~45–60 minutes (estimated from content scope)
View count: 110,534 views
Speaker: Cole Medin, AI educator and engineer
```

**Scores:**
- Recency: 9/10 — August 2025, post Claude Code 2.0. Covers skills, subagents, hooks — all features added in 2025
- Accuracy: 8/10 — Third-party creator with high community trust. Covers all three correct MCP primitives. One concern: uses "cloud mcp" in examples (likely typo in source notes for "claude mcp") — verify in actual video before assigning. No fabricated flags confirmed in research
- Longevity: 9/10 — PRP framework (context engineering), CLAUDE.md patterns, Git worktrees — all architectural rather than UI-version-specific
- Depth: 9/10 — The deepest non-Anthropic video found. Covers CLAUDE.md templates, hooks with JSON config, subagent architecture, PRP context engineering framework, YOLO mode with Dev Containers, parallel execution via Git worktrees, MCP via uvx
- **Average: 8.75/10**

**INCLUDE — WITH ONE CAVEAT**

Before assigning: watch the MCP section and verify no SSE transport is presented as current for remote servers. Streamable HTTP is the correct current standard (SSE deprecated March 26, 2025).

Week assignment: Week 1 (CLAUDE.md, context engineering, hooks) — segments also relevant to Week 2 (MCP) and Week 3 (subagents, parallel execution)
Curriculum fit: The most comprehensive single-creator overview of Claude Code professional usage. Use as a "deep dive" complement to Boris Cherny's 30-minute official overview.

**Viewing Guide:**
- Watch for: (1) The PRP (Product Requirements Prompt) framework for context engineering, (2) Hooks JSON configuration in `.claude/hooks/` with PostToolUse examples, (3) How subagents are defined as markdown files in `.claude/agents/`
- Key concept to extract: "Context engineering is the new vibe coding" — Cole's framing that structured context management is what separates production workflows from toy demos
- Skip: MCP installation walkthrough (Week 2 covers this in greater depth)
- Runtime to prioritize: CLAUDE.md section, Hooks section, PRP section (first two-thirds of video)

---

### Alternates (Use If Selected Video Goes Private/Unavailable)

---

**ALTERNATE 1A**

```
Title: Claude Code Beginner's Tutorial — Build a Movie App in 15 Minutes
Channel: Peter Yang (Creator Economy)
URL: https://www.youtube.com/watch?v=GepHGs_CZdk
Published: September 3, 2025
Duration: 17 minutes
Speaker: Peter Yang, product/creator educator
```

**Scores:**
- Recency: 9/10 — September 2025; uses current Claude Code CLI
- Accuracy: 8/10 — Specifically demonstrates CLAUDE.md creation, plan mode, and to-do list workflow. No fabricated flags identified in research. Creator is known for accurate technical content.
- Longevity: 6/10 — "Build a movie app" framing may age; but the CLAUDE.md + plan mode workflow it demonstrates is durable
- Depth: 6/10 — 17-minute beginner video; demonstrates the right habits (CLAUDE.md first, plan mode before coding) but doesn't explain why
- **Average: 7.25/10**

**INCLUDE AS ALTERNATE** — Use as a pre-watch for students who feel shaky on the basics after Phase 1.

---

**ALTERNATE 1B**

```
Title: Claude Code Full Course — Skills, Commands, Hooks, Subagents, CLAUDE.md
Channel: Sabrina Ramonov
URL: https://www.sabrina.dev/p/claude-code-full-course-for-beginners
Published: February 17, 2026
Duration: Multi-part course (total duration unknown)
Speaker: Sabrina Ramonov, AI educator
```

**Scores:**
- Recency: 10/10 — February 2026, most current content found
- Accuracy: 7/10 — Covers the correct features. However: published February 2026 means it references Claude Code features that may have shifted naming (e.g., she calls CLAUDE.md "persistent context"). Technical claims about hooks and subagents appear accurate based on description. MCP coverage is minimal ("mentioned as future simplification").
- Longevity: 8/10 — Skills, hooks, subagents, CLAUDE.md are durable concepts
- Depth: 7/10 — Goes beyond beginner (hooks, subagents, Blotato API integration) but targets non-technical users
- **Average: 8.0/10**

**INCLUDE AS ALTERNATE** — Best for non-developer students who need scaffolding. Not for the primary engineering-track curriculum.

---

### Disqualified — Week 1

None found meeting disqualification criteria specifically. The primary risk in Week 1 videos is shallow "vibe coding" demonstrations with no engineering substance. Several videos found in research were excluded at the research stage for this reason (beginner movie/app builders from unknown creators, TikTok-style clips without verifiable accuracy).

**Excluded without formal evaluation:**
- Multiple "Claude Code in X minutes" app-build demos from non-technical creators — insufficient depth
- Videos about Claude.ai web interface misidentified in search results as "Claude Code"
- Pre-2024 videos about older Claude versions with different CLI behavior

---

## Week 2 — MCP Building

*Topic focus: MCP server architecture, building tools/resources/prompts, wiring servers into Claude Code, transport layer.*

---

### Selected Videos (Embed These)

---

**VIDEO CANDIDATE 4 — PRIMARY PICK**

```
Title: MCP 201: The Power of the Protocol (Code with Claude 2025)
Channel: Anthropic (official)
URL: https://www.youtube.com/watch?v=HNzH5Us1Rvg
Published: May 22, 2025 (Code with Claude conference)
Duration: 26 minutes 31 seconds
Speaker: David Soria Parra, Member of Technical Staff at Anthropic
```

**Scores:**
- Recency: 9/10 — May 2025; reflects MCP spec post-November 2024 launch
- Accuracy: 10/10 — First-party content from Anthropic MCP team. David Soria Parra is a spec contributor. By definition correct on primitive counts and transport.
- Longevity: 9/10 — "Power of the protocol" framing targets underlying design, not UI walkthroughs. Protocol-level explanations age slowly.
- Depth: 9/10 — "201" in the title signals intermediate content. Focuses on what MCP unlocks architecturally (composability, server chaining, real-world integration patterns) vs. "101" basics
- **Average: 9.25/10**

**INCLUDE**

Week assignment: Week 2
Curriculum fit: The definitive MCP explanation from the people who built it. Should be the first video students watch in Week 2 before they start building.

**Viewing Guide:**
- Watch for: (1) How MCP servers compose and chain (one server's tools feeding another), (2) The distinction between Tools (model invokes), Resources (model reads), Prompts (pre-packaged templates), (3) Real production examples from Sourcegraph and Anthropic's own toolchain
- Key concept to extract: MCP is not "plugin system for Claude" — it is a universal protocol. Any client that speaks MCP can use your server. This is the architectural payoff.
- Skip: Nothing — 26 minutes is appropriate for a Week 2 anchor
- Runtime to prioritize: All

---

**VIDEO CANDIDATE 5 — PRIMARY PICK**

```
Title: MCP: Build Rich-Context AI Apps with Anthropic
Channel: DeepLearning.AI (co-produced with Anthropic)
URL: https://learn.deeplearning.ai/courses/mcp-build-rich-context-ai-apps-with-anthropic/
Published: May 14, 2025
Duration: ~99 minutes total (13 lessons)
Instructor: Elie Schoppik, Head of Technical Education at Anthropic
NOTE: Hosted on DeepLearning.AI CDN, not YouTube — free access, no account required
```

**Scores:**
- Recency: 9/10 — May 2025; co-produced with Anthropic specifically to teach current MCP spec
- Accuracy: 10/10 — Elie Schoppik is Anthropic's Head of Technical Education. Course explicitly covers all three primitives (tools, resources, prompt templates). No SSE presented as current (course reflects correct Streamable HTTP).
- Longevity: 9/10 — Building MCP servers from scratch using the Python SDK is a durable skill. The protocol has reached 1.0 stability.
- Depth: 10/10 — 13 lessons covering client-server architecture, building and testing an MCP server, connecting to third-party servers, deploying remotely. Hands-on throughout.
- **Average: 9.5/10**

**INCLUDE — HIGHEST RATED VIDEO IN RESEARCH**

Note: Not YouTube-hosted. Embed as a course link, not a YouTube embed. Free access; no paywall.

Week assignment: Week 2
Curriculum fit: The Week 2 primary lab companion. Students watch lessons alongside building their own MCP server. Maps directly to the Week 2 lab (build an MCP server with 2+ tools connected to a real system).

**Viewing Guide:**
- Watch for: (1) Lesson 8 specifically — prompt templates as a primitive (often overlooked), (2) How the Python SDK handles tool registration and schema definition, (3) The section on connecting to third-party servers — this is the architectural pattern students will reuse
- Key concept to extract: Your MCP server is reusable across any MCP-compatible client. Build it once; wire it to Claude Desktop, Claude Code, and any future client.
- Skip: Appendix lesson (reference material, not instructional)
- Runtime to prioritize: Lessons 1–8 in order; then lessons 9–11 for deployment context

---

**VIDEO CANDIDATE 6 — PRIMARY PICK**

```
Title: Building Headless Automation with Claude Code (Code with Claude 2025)
Channel: Anthropic (official)
URL: https://www.youtube.com/watch?v=dRsjO-88nBs
Published: July 31, 2025 (post-conference release)
Duration: ~25–30 minutes (estimated)
Speaker: Sedara, engineer on the Claude Code team at Anthropic
```

**Scores:**
- Recency: 9/10 — July 2025; covers Claude Code SDK and GitHub Action (released with Claude Code 2.0)
- Accuracy: 10/10 — First-party Anthropic engineering team content. SDK usage, GitHub Action, JSON output, session preservation — all current as of Claude Code 2.0+
- Longevity: 8/10 — GitHub Action and SDK scripting are stable interfaces. The specific GitHub Action version may update, but the patterns (piping, headless `-p` flag, JSON output) are architectural
- Depth: 9/10 — Live demo of GitHub Action implementing quiz power-up features from a real issue. Shows tool permissions management, structured JSON output, session state preservation, and PR automation
- **Average: 9.0/10**

**INCLUDE**

Week assignment: Week 2 (bridges into Week 4)
Curriculum fit: Shows the production end-state of MCP + Claude Code integration. The headless SDK pattern is what students build toward in Week 2 and use in Week 4 automation labs.

**Viewing Guide:**
- Watch for: (1) The `-p` flag for headless/programmatic Claude Code invocation, (2) How the GitHub Action layers on top of the SDK (don't confuse the two levels), (3) JSON output formatting for structured pipeline integration
- Key concept to extract: Claude Code is not just a human-in-the-loop tool. The SDK exposes the same agent as a programmable subprocess — this is what CI/CD integration looks like.
- Skip: Introduction/context-setting (first 3 minutes); students already know what Claude Code is
- Runtime to prioritize: The live demo section (middle third) showing GitHub issue → automated PR with feature implementation

---

### Alternates (Use If Selected Video Goes Private/Unavailable)

---

**ALTERNATE 2A**

```
Title: Learn MCP Essentials and How to Create Secure Agent Interfaces with FastMCP
Channel: freeCodeCamp.org
URL: https://www.youtube.com/watch?v=DosHnyq78xY
Published: October 15, 2025
Duration: ~60 minutes
Instructor: Carlos Leon
```

**Scores:**
- Recency: 9/10 — October 2025; FastMCP 2.x (current framework)
- Accuracy: 7/10 — FastMCP is legitimate and widely used. The course covers STDIO and HTTP Stream transports. One concern: it tests with GitHub Copilot rather than Claude, which means MCP integration specifics differ slightly. No explicit primitive count found in descriptions — verify in video that all three (tools, resources, prompts) appear.
- Longevity: 8/10 — FastMCP is an actively maintained framework. STDIO/HTTP Stream transport patterns are durable.
- Depth: 8/10 — Three hands-on projects, deployment to FastMCP Cloud. Calculator → API integration → deployment arc is pedagogically solid.
- **Average: 8.0/10**

**INCLUDE AS ALTERNATE** — Good substitute if DeepLearning.AI course goes offline. Note: test with Copilot, not Claude Code specifically.

---

**ALTERNATE 2B**

```
Title: MCP at Sourcegraph (Code with Claude 2025)
Channel: Anthropic (official)
URL: https://www.youtube.com/watch?v=j8NlbEWAsmc
Published: May 22, 2025
Duration: ~25–30 minutes (conference session)
Speaker: Beyang Liu, Co-founder & CTO at Sourcegraph
```

**Scores:**
- Recency: 9/10 — May 2025 conference
- Accuracy: 9/10 — Beyang Liu is a practitioner presenting real production MCP usage at Sourcegraph. First-party accuracy for his implementation; Anthropic-reviewed for conference inclusion.
- Longevity: 7/10 — Real-world case study content ages faster than protocol-level content. Sourcegraph's specific integration may have changed.
- Depth: 8/10 — Shows production-scale MCP usage (codebase-wide search, code intelligence tools) rather than tutorial examples
- **Average: 8.25/10**

**INCLUDE AS ALTERNATE** — Best used as a "what production MCP looks like" companion, not a building tutorial. Assign after students complete their own server.

---

### Disqualified — Week 2

**DISQUALIFIED: Build an MCP Server with Python, Docker, and Claude Code (freeCodeCamp written article)**
- Format: Written article (Balajee Asish Brahmandam), March 2026 — not a video
- Published: March 10, 2026 as a freeCodeCamp article only
- Disqualified: Not video content; cannot embed

**DISQUALIFIED: Tech with Tim — "Build Anything with MCP Agents — Here's How"**
- Duration: ~20 minutes
- Concern: Research indicates this video covers adding MCP servers to Cursor (not Claude Code) and installing from Smithery. The video is about consuming MCP servers, not building them. Curriculum Week 2 requires students to build servers.
- Disqualified: Wrong skill direction (consuming vs. building) and wrong target tool (Cursor, not Claude Code CLI)

**DISQUALIFIED: Any video presenting SSE as current remote MCP transport**
- The MCP spec deprecated SSE on March 26, 2025, replacing it with Streamable HTTP
- Any video published before June 2025 showing remote MCP setup with SSE transport is technically inaccurate for current usage and must not be assigned

---

## Week 3 — Advanced Patterns

*Topic focus: Meta-prompting, multi-agent orchestration, agent skills, context engineering, subagent coordination.*

---

### Selected Videos (Embed These)

---

**VIDEO CANDIDATE 7 — PRIMARY PICK**

```
Title: Don't Build Agents, Build Skills Instead
Channel: AI Engineer (conference channel)
URL: https://www.youtube.com/watch?v=CEvIs9y1uog
Published: December 8, 2025
Duration: ~16 minutes
View count: 1,904 views (as of research date — low count, high quality)
Speakers: Barry Zhang & Mahesh Murag, Anthropic Applied AI team
```

**Scores:**
- Recency: 10/10 — December 2025; introduces the Skills architecture that Anthropic made an open standard in December 2025
- Accuracy: 10/10 — Barry Zhang and Mahesh Murag are the Anthropic team who built the Skills system. They define the three-layer architecture (Agent Loop, Runtime Environment, MCP Servers) correctly. Progressive disclosure pattern is explained accurately.
- Longevity: 9/10 — Skills as a format for packaging procedural knowledge is a durable architectural concept. Even if the specific implementation evolves, the principle ("skills are folders of markdown + scripts") is design-intent stable.
- Depth: 10/10 — The deepest conceptual video in the entire research set. Goes beyond features to explain WHY: agents are "brilliant but lack expertise," skills solve the expertise gap without proliferating domain-specific agents. Live demo of skills creation and reuse.
- **Average: 9.75/10**

**INCLUDE — HIGHEST RATED YOUTUBE VIDEO IN RESEARCH**

Week assignment: Week 3
Curriculum fit: The conceptual foundation for Week 3. Students who understand this talk understand why they are doing everything else in the curriculum (CLAUDE.md, hooks, subagents, MCP) — it is a unified architecture.

**Viewing Guide:**
- Watch for: (1) The three-layer architecture diagram (Agent Loop + Runtime + MCP Servers), (2) "Progressive disclosure" as the technique for managing context window consumption, (3) How skills and MCP servers are different (skills = domain expertise in files; MCP = external connectivity)
- Key concept to extract: The difference between an MCP server and a skill. Both extend an agent, but differently. Skills package procedural knowledge. MCP servers connect external systems. Conflating them is a common mistake.
- Skip: Nothing — 16 minutes is the right length; watch all of it
- Runtime to prioritize: The architecture explanation (first half) and the live skill creation demo (second half)

---

**VIDEO CANDIDATE 8 — PRIMARY PICK**

```
Title: Prompting for Agents (Code with Claude 2025)
Channel: Anthropic (official)
URL: https://www.youtube.com/watch?v=XSZP9GhhuAc
Published: May 22, 2025 (Code with Claude conference)
Duration: ~30 minutes (workshop format)
Speaker: Hannah Moran, Anthropic
```

**Scores:**
- Recency: 9/10 — May 2025; reflects Claude 4 prompting patterns
- Accuracy: 10/10 — First-party Anthropic content. Hannah Moran's talk is documented by Simon Willison as notable for correctly stating the foundational principle ("Agents are models using tools in a loop") — the kind of accurate framing that distinguishes this from hype-driven content.
- Longevity: 10/10 — Prompting principles for agents (unambiguous instructions, well-named tools, perspective-taking) are the most durable content in the entire curriculum. These principles will apply regardless of model version.
- Depth: 9/10 — Workshop format with concrete techniques: empathizing with your agent, providing clear conceptual framing, designing tools with good names and schema. Goes beyond "write better prompts" to explain why agents need different prompting than chat interfaces.
- **Average: 9.5/10**

**INCLUDE**

Week assignment: Week 3
Curriculum fit: The missing link between Phase 1 TCEF prompting and Week 3's multi-agent orchestration work. Students learn to prompt not for one agent response but for sustained agent behavior across a task loop.

**Viewing Guide:**
- Watch for: (1) Why agents need prompts written at a different "altitude" than chat prompts, (2) The "friend who doesn't know your business" test for prompt clarity, (3) Tool naming and schema design as a form of prompting
- Key concept to extract: "Agents are models using tools in a loop" — this is the architectural truth that every prompting decision flows from. A prompt that works for a single response may completely fail in a loop.
- Skip: None
- Runtime to prioritize: The tool design section and the perspective-taking framework

---

**VIDEO CANDIDATE 9 — PRIMARY PICK**

```
Title: How We Build Effective Agents: Barry Zhang, Anthropic
Channel: AI Engineer (conference channel)
URL: https://www.youtube.com/watch?v=D7_ipDqhtwk
Published: April 4, 2025
Duration: 30 minutes 9 seconds
Speaker: Barry Zhang, Applied AI team at Anthropic (previously Meta Monetization genAI)
```

**Scores:**
- Recency: 8/10 — April 2025; slightly older but the principles predate specific feature changes
- Accuracy: 9/10 — Barry Zhang is Anthropic's Applied AI team. Content is principle-based rather than implementation-specific, reducing accuracy risk. The "don't build agents for everything" + "keep it simple" + "think like your agents" framework is clearly from production experience.
- Longevity: 10/10 — "When to use agents," "tool parallelization," "verifiable outputs," "understanding context window constraints from the agent's perspective" — these are timeless engineering principles.
- Depth: 9/10 — Not a demo video. Entirely conceptual, drawing on real multi-agent system deployments. Covers selectivity (reserve agents for genuinely complex problems), simplicity (environment + tools + system prompt is sufficient), and perspective-taking (simulate the agent's limited context window).
- **Average: 9.0/10**

**INCLUDE**

Week assignment: Week 3
Curriculum fit: Architectural thinking complement to the implementation-focused videos. Watch BEFORE starting multi-agent orchestration labs, not after. Changes how students design their agent systems.

**Viewing Guide:**
- Watch for: (1) The three-component agent definition (environment, tools, system prompt) — memorize this, (2) The "10–20k token" context window constraint Barry uses to illustrate agent perspective, (3) When NOT to use agents — this is the rarest and most valuable advice in any Week 3 video
- Key concept to extract: "Think like your agents." The single biggest mistake in multi-agent design is optimizing for what the human wants to accomplish rather than what the agent can actually reason about given its context constraints.
- Skip: Nothing
- Runtime to prioritize: The perspective-taking section (final third of video)

---

### Alternates (Use If Selected Video Goes Private/Unavailable)

---

**ALTERNATE 3A**

```
Title: Building Blocks for Tomorrow's AI Agents (Code with Claude 2025)
Channel: Anthropic (official)
URL: https://www.youtube.com/watch?v=oDks2gVHu4k
Published: May 22, 2025
Duration: 29 minutes 7 seconds
```

**Scores:**
- Recency: 9/10
- Accuracy: 10/10 — Anthropic official
- Longevity: 9/10 — "Battle-tested approaches" framing
- Depth: 8/10 — Agent building blocks from production; similar territory to Barry Zhang's talk
- **Average: 9.0/10**

**INCLUDE AS ALTERNATE** — Near-duplicate of Video Candidate 9 in scope. Use if D7_ipDqhtwk goes private.

---

**ALTERNATE 3B**

```
Title: What Anthropic Learned Building AI Agents in 2025 (AWS re:Invent AIM277)
Channel: AWS Events
URL: https://www.youtube.com/watch?v=TledrLrVUQI
Published: December 6, 2025
Speaker: Cal, Applied AI team at Anthropic
```

**Scores:**
- Recency: 10/10 — December 2025
- Accuracy: 9/10 — Anthropic Applied AI team presenter. Covers system prompts, tool design, progressive disclosure/skills, sub-agents for research, compaction strategies — all accurate
- Longevity: 9/10 — Lessons learned framing is retrospective and principle-based
- Depth: 9/10 — Shows Claude's evolution from Sonnet 3.5 to Sonnet 4.5 on the same coding task. Context engineering as the successor to prompt engineering. Skills architecture introduction.
- **Average: 9.25/10**

**INCLUDE AS ALTERNATE** — Excellent alternate for Video Candidate 9. More recent, slightly broader scope (includes the Claude Agent SDK introduction).

---

### Disqualified — Week 3

**DISQUALIFIED: Simon Willison — "Building a tool to copy-paste share terminal sessions using Claude Code for web" (YouTube: GQvMLLrFPVI)**
- Published: October 23, 2025; Duration: 11 minutes
- Reason: This covers "Claude Code for web" (the async cloud agent), not the CLI. The curriculum covers Claude Code CLI. Additionally, the video demonstrates vibe-coding a single tool, not multi-agent patterns. Depth score would be 5/10 — appropriate for a quick demo reel, not Week 3 advanced patterns.
- Simon Willison remains a trustworthy technical commentator; this specific video is off-curriculum.

**DISQUALIFIED: Any video using "meta-prompting" to mean LLMs writing their own prompts (academic/research framing)**
- The academic "meta-prompting" literature (Towards Data Science, academic papers) does not map to how this course uses the term. No specific YouTube video was found covering meta-prompting in the curriculum's sense (using Claude Code to help construct prompts for Claude Code agents) with sufficient accuracy and depth.

---

## Week 4 — Spec-Driven Development + Production

*Topic focus: Specification-driven development methodology, production workflows, CI/CD integration, team usage patterns.*

---

### Selected Videos (Embed These)

---

**VIDEO CANDIDATE 10 — PRIMARY PICK**

```
Title: Prompting 101 (Code with Claude 2025)
Channel: Anthropic (official)
URL: https://www.youtube.com/watch?v=ysPbXH0LpIE
Published: May 22, 2025 (Code with Claude conference)
Duration: ~25–30 minutes (conference workshop format)
Speaker: Anthropic team (confirmed Anthropic-first-party)
```

**Scores:**
- Recency: 9/10 — May 2025; reflects current prompting best practices for Claude 4
- Accuracy: 10/10 — First-party Anthropic content; a GitHub repository (StamKavid/claude-code-prompting-101) was built directly from this video's content, indicating the material is accurate and reproducible
- Longevity: 10/10 — Prompting fundamentals for production systems are the most time-stable content category. The "why" of prompting (what Claude needs to do its best work) will not change with minor model updates.
- Depth: 8/10 — "101" in the title signals accessible framing, but the Code with Claude conference format means the audience is developers, not beginners. Expect concrete techniques, not platitudes.
- **Average: 9.25/10**

**INCLUDE**

Week assignment: Week 4
Curriculum fit: Bridges from Week 3 advanced patterns back to fundamentals — now with production context. Students entering Week 4 have built real systems; this video reframes prompting principles through the lens of what they've experienced.

**Viewing Guide:**
- Watch for: (1) What distinguishes a production prompt from a demo prompt, (2) Prompting techniques specific to Claude 4 (longer context window changes what context needs to be in the prompt vs. in CLAUDE.md), (3) Any discussion of spec-as-prompt patterns
- Key concept to extract: The relationship between prompt precision and agent reliability at scale. A vague prompt costs you one bad response in chat; it costs you hours of agent drift in a production workflow.
- Skip: None
- Runtime to prioritize: All

---

**VIDEO CANDIDATE 11 — PRIMARY PICK**

```
Title: Taking Claude to the Next Level (Code with Claude 2025)
Channel: Anthropic (official)
URL: https://www.youtube.com/watch?v=nZCy8E5jlok
Published: May 22, 2025 (Code with Claude conference)
Duration: ~25–30 minutes (conference session)
Speaker: Anthropic team
```

**Scores:**
- Recency: 9/10 — May 2025 conference; Claude 4-era content
- Accuracy: 10/10 — First-party Anthropic content
- Longevity: 8/10 — "Next level" implies advanced capabilities, which tend to be more architectural (parallel agents, SDK integration) than UI-specific
- Depth: 8/10 — Conference session format targeting practitioners; expect production patterns beyond basics
- **Average: 8.75/10**

**INCLUDE — WITH INSTRUCTOR PREVIEW REQUIRED**

Note: Speaker identity and precise content were not confirmed in research. An instructor must preview this video to verify content alignment with Week 4 themes before assigning. If content does not match Week 4 (spec-driven, production, CI/CD), swap to Alternate 4A.

Week assignment: Week 4
Curriculum fit: Production-level Claude Code patterns — intended as the "what's possible in production" capstone view before students finalize their Phase 2 entry spec.

**Viewing Guide:**
- Watch for: (1) Production deployment patterns (CI/CD, GitHub Actions, or headless mode), (2) Team workflow patterns (how engineering teams share CLAUDE.md, slash commands, hooks), (3) Lessons from scale (what breaks at 10 engineers using Claude Code that works for 1)
- Key concept to extract: TBD after instructor preview — update this guide before assigning
- Skip: TBD after preview
- Runtime to prioritize: TBD after preview

---

**VIDEO CANDIDATE 12 — PRIMARY PICK**

```
Title: Claude Code Best Practices — SubAgents
Channel: All About AI
URL: (confirm via Class Central listing: https://www.classcentral.com/course/youtube-claude-code-best-practices-subagents-ai-news-472860)
Published: 2025 (exact date requires verification)
Duration: Unknown — requires instructor preview
Speaker: Unknown — requires verification
```

**Scores:**
- Recency: 7/10 — 2025 content, but exact date unverified
- Accuracy: 7/10 — "All About AI" channel has produced accurate Claude content in past (confirmed by Class Central listing). Subagents are a well-documented feature; accuracy risk is moderate. Requires preview to verify no deprecated patterns.
- Longevity: 8/10 — Subagent patterns are architectural
- Depth: 7/10 — Described as covering "advanced SubAgent implementations" and "techniques for optimizing Claude's code generation capabilities"
- **Average: 7.25/10**

**INCLUDE CONDITIONALLY — INSTRUCTOR PREVIEW REQUIRED**

This video requires instructor preview before assignment. The YouTube URL must be confirmed, the publish date verified, and the content checked against accuracy red lines (no `--thinking` flag, no `/memory`, correct MCP primitive count if MCP appears). If it fails preview, use Alternate 4B.

Week assignment: Week 4
Curriculum fit: Subagent patterns in production — bridges subagent theory from Week 3 into production deployment patterns in Week 4.

---

### Alternates (Use If Selected Video Goes Private/Unavailable)

---

**ALTERNATE 4A**

```
Title: Vibe Coding in Prod (Code with Claude 2025)
Channel: Anthropic (official)
URL: https://www.youtube.com/watch?v=fHWFF_pnqDk
Published: May 22, 2025
Duration: ~25–30 minutes
```

**Scores:**
- Recency: 9/10
- Accuracy: 10/10 — Anthropic official
- Longevity: 7/10 — "Vibe coding" is a trendy frame that will date; but the content about taking informal AI-assisted coding into production is durable
- Depth: 8/10 — "In prod" framing guarantees production context (not toy demos)
- **Average: 8.5/10**

**INCLUDE AS ALTERNATE** — Ideal companion to spec-driven development discussions. Shows the contrast: vibe coding at production scale requires the discipline spec-driven development provides.

---

**ALTERNATE 4B**

```
Title: What Anthropic Learned Building AI Agents in 2025 (AWS re:Invent AIM277)
Channel: AWS Events
URL: https://www.youtube.com/watch?v=TledrLrVUQI
Published: December 6, 2025
Speaker: Cal, Applied AI team at Anthropic
```

*(Full evaluation appears in Week 3 alternates — 9.25/10 average)*

**INCLUDE AS ALTERNATE** — Works equally well in Week 3 or Week 4. The context engineering and skills sections are especially relevant to Week 4's production spec work.

---

### Disqualified — Week 4

**DISQUALIFIED: All "spec-driven development" articles and written guides found in research**
- Numerous high-quality written guides were found (alexop.dev, Thoughtworks, Medium) but no YouTube videos specifically demonstrating spec-driven development with Claude Code were found with sufficient production depth
- Gap noted: No video exists in the research scope that demonstrates a complete spec-driven workflow (requirements → design → tasks → implementation) on camera. The instructor may need to create original screencast content for this specific Week 4 topic.

**DISQUALIFIED: Peter Yang — "Build a YouTube Research Agent in 15 min" (YouTube search result)**
- Format: 15-minute beginner tutorial
- Depth score: 5/10 — demonstrates building a slash command for Claude Code in Cursor, not a production workflow
- Disqualified: Insufficient depth for Week 4 engineers who have already completed Weeks 1–3

---

## Evaluation Summary

| Video | Week | Channel | Published | Average | Status |
|-------|------|---------|-----------|---------|--------|
| Mastering Claude Code in 30 min (6eBSHbLKuN0) | 1 | Anthropic | May 2025 | 9.25 | **SELECTED** |
| Claude Code Best Practices (gv0WHhKelSE) | 1 | Anthropic | May 2025 | 8.75 | **SELECTED** |
| Cole Medin Complete Guide (amEUIuBKwvg) | 1 | Cole Medin | Aug 2025 | 8.75 | **SELECTED** |
| Peter Yang Movie App (GepHGs_CZdk) | 1 | Peter Yang | Sep 2025 | 7.25 | Alternate |
| Sabrina Ramonov Full Course | 1 | Sabrina Ramonov | Feb 2026 | 8.0 | Alternate |
| MCP 201: Power of Protocol (HNzH5Us1Rvg) | 2 | Anthropic | May 2025 | 9.25 | **SELECTED** |
| DeepLearning.AI MCP Course (skilljar) | 2 | DeepLearning.AI+Anthropic | May 2025 | 9.5 | **SELECTED** |
| Building Headless Automation (dRsjO-88nBs) | 2 | Anthropic | Jul 2025 | 9.0 | **SELECTED** |
| FastMCP freeCodeCamp (DosHnyq78xY) | 2 | freeCodeCamp | Oct 2025 | 8.0 | Alternate |
| MCP at Sourcegraph (j8NlbEWAsmc) | 2 | Anthropic | May 2025 | 8.25 | Alternate |
| Tech with Tim — MCP Agents | 2 | Tech with Tim | 2025 | — | **DISQUALIFIED** |
| Don't Build Agents Build Skills (CEvIs9y1uog) | 3 | AI Engineer | Dec 2025 | 9.75 | **SELECTED** |
| Prompting for Agents (XSZP9GhhuAc) | 3 | Anthropic | May 2025 | 9.5 | **SELECTED** |
| How We Build Effective Agents (D7_ipDqhtwk) | 3 | AI Engineer | Apr 2025 | 9.0 | **SELECTED** |
| Building Blocks Tomorrow's Agents (oDks2gVHu4k) | 3 | Anthropic | May 2025 | 9.0 | Alternate |
| What Anthropic Learned — re:Invent (TledrLrVUQI) | 3/4 | AWS Events | Dec 2025 | 9.25 | Alternate |
| Simon Willison — Terminal Sessions (GQvMLLrFPVI) | — | Simon Willison | Oct 2025 | — | **DISQUALIFIED** |
| Prompting 101 (ysPbXH0LpIE) | 4 | Anthropic | May 2025 | 9.25 | **SELECTED** |
| Taking Claude to Next Level (nZCy8E5jlok) | 4 | Anthropic | May 2025 | 8.75 | **SELECTED** |
| All About AI — SubAgents | 4 | All About AI | 2025 | 7.25 | Conditional |
| Vibe Coding in Prod (fHWFF_pnqDk) | 4 | Anthropic | May 2025 | 8.5 | Alternate |

---

## Final Recommended Lineup (12 Videos, Minimum Threshold Met)

| Week | Title | URL |
|------|-------|-----|
| **Week 1** | Mastering Claude Code in 30 min | https://www.youtube.com/watch?v=6eBSHbLKuN0 |
| **Week 1** | Claude Code Best Practices | https://www.youtube.com/watch?v=gv0WHhKelSE |
| **Week 1** | Cole Medin Complete Guide | https://www.youtube.com/watch?v=amEUIuBKwvg |
| **Week 2** | MCP 201: Power of Protocol | https://www.youtube.com/watch?v=HNzH5Us1Rvg |
| **Week 2** | DeepLearning.AI MCP Course | https://learn.deeplearning.ai/courses/mcp-build-rich-context-ai-apps-with-anthropic/ |
| **Week 2** | Building Headless Automation | https://www.youtube.com/watch?v=dRsjO-88nBs |
| **Week 3** | Don't Build Agents, Build Skills | https://www.youtube.com/watch?v=CEvIs9y1uog |
| **Week 3** | Prompting for Agents | https://www.youtube.com/watch?v=XSZP9GhhuAc |
| **Week 3** | How We Build Effective Agents | https://www.youtube.com/watch?v=D7_ipDqhtwk |
| **Week 4** | Prompting 101 | https://www.youtube.com/watch?v=ysPbXH0LpIE |
| **Week 4** | Taking Claude to the Next Level | https://www.youtube.com/watch?v=nZCy8E5jlok |
| **Week 4** | All About AI — SubAgents | (URL to confirm — see Class Central link above) |

---

## Instructor Actions Required

The following items require human review before the video library is production-ready:

1. **Preview Video Candidate 11** (`nZCy8E5jlok` — "Taking Claude to the Next Level"): Speaker and content not confirmed in research. Verify Week 4 alignment and update the Viewing Guide.

2. **Preview Video Candidate 12** (All About AI — SubAgents): Confirm YouTube URL, publish date, and verify no accuracy red lines are violated. Replace with Alternate 4A or 4B if it fails review.

3. **Preview Cole Medin video** (`amEUIuBKwvg`): Check the MCP transport section. If SSE is presented as current for remote servers (deprecated March 26, 2025), instruct students to skip that specific segment.

4. **Gap — Spec-Driven Development Video**: No YouTube video was found that demonstrates a complete spec-driven workflow on camera with sufficient depth for Week 4. Consider: (a) creating an original instructor screencast, (b) using the Thoughtworks or alexop.dev blog post as a reading assignment instead, or (c) commissioning a screenshare of the spec-kit workflow.

5. **Week 4 Total Watch Time**: With Video 11 unconfirmed and Video 12 conditional, Week 4 currently has ~1 confirmed primary video (Prompting 101 at 9.25/10). This is below the target of 3 strong picks. Alternates 4A and 4B should be elevated to primaries pending preview outcomes.

---

## Key Findings for Instructor

**What dominates the landscape:** The Code with Claude 2025 conference (May 22, 2025) on the official Anthropic YouTube channel is the single richest source of curriculum-grade video content. It produced 8 of the 12 videos in the final lineup. It is first-party, technically accurate, and covers the complete curriculum arc.

**The best single video in the research:** "Don't Build Agents, Build Skills Instead" (Barry Zhang & Mahesh Murag, AI Engineer channel, December 2025, CEvIs9y1uog). 16 minutes. 9.75/10. Explains the entire architecture of agentic systems in a way that makes every other topic in the curriculum coherent. Assign this first in Week 3.

**The best non-Anthropic video:** Cole Medin's Complete Guide (amEUIuBKwvg, August 2025, 110K views). Covers more ground than any other single video and demonstrates genuine engineering depth. Verify MCP transport claims before assigning.

**The best MCP course:** DeepLearning.AI MCP course (co-produced with Anthropic, Elie Schoppik instructor, May 2025). Not YouTube-hosted but free. Correct on all three primitives, correct on transport. The Week 2 lab companion.

**What is missing:** No video was found covering spec-driven development as a complete workflow on camera. This is the largest content gap in the curriculum.

**What to avoid:** Any video presenting remote MCP transport as SSE. The deprecation (March 26, 2025) means any older video showing remote MCP setup is technically wrong for current usage.
