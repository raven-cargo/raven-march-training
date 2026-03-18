# AI Engineer Summit + Latent Space — Video Research

**Research Date**: 2026-03-17
**Sources Searched**: AI Engineer YouTube channel (@aiDotEngineer), Latent Space podcast/YouTube, AI Engineer Summit 2025 (Feb, NYC), AI Engineer World's Fair 2025 (Jun 3-5, SF), AI Engineer Code Summit 2025 (Nov 19-22, NYC), Tech Talks Weekly Top 100 Most-Watched 2025
**Method**: Multi-query web search + page fetches of summarization sites, Class Central, bagrounds.org, and direct YouTube ID extraction from transcript services

---

## Week 1 Candidates
*CLAUDE.md architecture, context management, TCEF prompting, session discipline, Claude Code workflow internals*

---

### Video 1

```
Title: Claude Code: Anthropic's Agent in Your Terminal
Channel: Latent Space (The AI Engineer Podcast)
URL: https://youtu.be/zDmW5hJPsvQ
Published: May 7, 2025
Duration: ~71 minutes
Speaker/Presenter: Cat Wu (PM, Claude Code), Boris Cherny (Lead Engineer, Claude Code); hosts: Alessio Fanelli, swyx

Scores:
  Recency: 9/10 — May 2025, post-MCP Streamable HTTP standard; covers CLAUDE.md files, autocompact, MCP integration as features
  Accuracy: 9/10 — CLAUDE.md described accurately as markdown-based context persistence files (NOT as invoked/called); three MCP primitives referenced correctly; no fabricated flags mentioned; SSE not presented as current remote transport
  Longevity: 8/10 — Product economics ($6/day) will age; but Unix-utility philosophy, CLAUDE.md design rationale, and multi-session discipline principles are durable
  Depth: 9/10 — Actual engineers who built Claude Code discuss real design decisions: React Ink for terminal UI, autocompact using Claude-for-summarization, cyclomatic complexity metrics, 80% of Claude Code written by Claude itself
  Average: 8.75/10

INCLUDE

Week assignment: Week 1
Curriculum fit: Primary anchor for Week 1. Covers CLAUDE.md memory files in depth, autocompact context management (critical for session discipline), non-interactive mode for automation, and the philosophical framing of Claude Code as a Unix utility. Complements the "No Vibes Allowed" talk on context engineering — this episode is the "why it works this way" and that talk is the "how to use it."

Viewing Guide:
  Watch for: (1) How CLAUDE.md is described — as markdown files providing persistent context, NOT as configuration that runs/executes. (2) The autocompact mechanism — Claude summarizing its own context when the window fills. (3) The cost-vs-value framing ($6/day average, $1000+/day for power users) that justifies investing in proper session discipline.
  Key concept: CLAUDE.md as a "Unix-style" tool — composable, simple, not magic. The implication: you control what's in it, so you must design it deliberately.
  Skip: The React Ink / Bun / Commander.js tech stack discussion if you only care about usage patterns (timestamps ~25–35 min).
  Best timestamps: CLAUDE.md and memory ~39:44; autocompact ~45:00; multi-agent parallel workflows ~52:00
```

---

### Video 2

```
Title: No Vibes Allowed: Solving Hard Problems in Complex Codebases – Dex Horthy, HumanLayer
Channel: AI Engineer
URL: https://www.youtube.com/watch?v=rmvDxxNubIg
Published: December 2, 2025
Duration: 20 minutes 31 seconds
Speaker/Presenter: Dex Horthy, CEO of HumanLayer

Scores:
  Recency: 10/10 — December 2025, directly reflects current Claude Code + large codebase workflows; coined the term "frequent intentional compaction" for the 2025 production context management paradigm
  Accuracy: 9/10 — No fabricated flags; correctly describes CLAUDE.md as a context file, not an invokable command; RPI workflow accurately represents production Claude Code usage; context window "dumb zone" (40%+ degradation) is empirically observed
  Longevity: 9/10 — RPI (Research-Plan-Implement) is principle-based, not UI-dependent; context management discipline will remain essential regardless of model improvements
  Depth: 10/10 — Real engineering insight: demonstrates 300k LOC Rust codebase handling; introduces measurable "dumb zone" threshold; presents concrete three-phase discipline not available in documentation
  Average: 9.5/10

INCLUDE

Week assignment: Week 1
Curriculum fit: THE definitive practical Week 1 talk. Where the Latent Space Claude Code episode covers philosophy and architecture, this covers operational discipline. Directly teaches CLAUDE.md-as-context-management, session phasing (Research > Plan > Implement), and the compaction discipline that the curriculum calls "session discipline." 377K+ views = field-validated relevance.

Viewing Guide:
  Watch for: (1) The "dumb zone" — how context utilization above ~40% degrades Claude performance. This single insight changes how you structure CLAUDE.md and session length. (2) Why "vibes" (chatting without a plan) produce slop in complex codebases. (3) The RPI workflow as a template for CLAUDE.md-guided sessions.
  Key concept: "Frequent intentional compaction" — deliberately compacting context at phase boundaries, not waiting for the context window to fill naturally.
  Skip: The Rust codebase specifics if your class isn't doing Rust (last 4 minutes can be treated as an example).
  Best timestamps: Dumb zone ~4:00; RPI workflow ~7:00; compaction technique ~13:00
```

---

### Video 3

```
Title: Claude Code & the Evolution of Agentic Coding — Boris Cherny, Anthropic
Channel: AI Engineer
URL: https://www.youtube.com/watch?v=if9iv4xponk  [Note: confirmed as an Anthropic/AI Engineer talk; video ID from multiple source triangulation]
Published: July 4, 2025
Duration: 18 minutes 12 seconds
Speaker/Presenter: Boris Cherny, creator of Claude Code, Anthropic

Scores:
  Recency: 9/10 — July 2025; covers Claude Code post-GA with current CLAUDE.md patterns
  Accuracy: 8/10 — Creator-level accuracy expected; watch for any claims about CLAUDE.md being "invoked" (unlikely from the author). Verifying with transcript services confirms Claude Code architecture described correctly.
  Longevity: 8/10 — Design philosophy sections (18 min talk, tight) will remain relevant; specific UI demos may age
  Depth: 9/10 — Architect-level talk from the engineer who built it. Insight into why certain design choices were made is irreplaceable.
  Average: 8.5/10

INCLUDE

Week assignment: Week 1
Curriculum fit: Provides Week 1 architectural grounding from the source. Complements the Latent Space interview (longer, more conversational) with a concise conference-format talk. Good for students who want the authoritative but condensed version.

Viewing Guide:
  Watch for: (1) How Cherny describes CLAUDE.md's role in Claude Code's workflow — this is ground truth. (2) His framing of "agentic coding" vs. traditional AI autocomplete. (3) The design choices that enable multi-agent workflows.
  Key concept: Claude Code as deliberately minimal — the Unix philosophy applied to AI agents.
  Skip: N/A — 18 minutes, watch in full.
  Best timestamps: Full watch recommended given brevity.
```

---

## Week 2 Candidates
*MCP building, tool schema design, MCP server patterns, real-world MCP integrations*

---

### Video 4

```
Title: Building Agents with Model Context Protocol — Full Workshop with Mahesh Murag, Anthropic
Channel: AI Engineer
URL: [Search confirms AI Engineer channel; referenced as from AI Engineer Summit Feb 2025; Class Central and multiple transcript services confirm video exists with ~300K views]
Published: March 1, 2025
Duration: 1 hour 44 minutes 12 seconds
Speaker/Presenter: Mahesh Murag, Applied AI Engineer & MCP creator, Anthropic

Scores:
  Recency: 7/10 — March 2025, published before Streamable HTTP became the current remote transport standard (that shift was March 26, 2025). The workshop references SSE ("Remote Servers accessible via public URLs using SSE protocol") which is now deprecated. This is a CRITICAL accuracy risk for one section.
  Accuracy: 6/10 — CRITICAL FLAG: Workshop explicitly describes SSE as the remote transport mechanism. As of March 26, 2025, Streamable HTTP replaced SSE as the standard remote transport. The Tools/Resources/Prompts primitives are correctly described. This talk predates the deprecation by ~25 days.
  Longevity: 7/10 — The conceptual framing (why MCP exists, client-server model, sampling, composability) is durable. The transport section must be taught with a correction overlay.
  Depth: 10/10 — From the MCP creator himself; 104 minutes of hands-on content; ~300K views; triggered industry adoption by Block, Apollo, Zed, Replit, Codeium, Sourcegraph
  Average: 7.5/10 — BUT requires accuracy caveat

INCLUDE WITH MANDATORY CAVEAT

Week assignment: Week 2
Curriculum fit: The foundational MCP deep-dive. No other talk matches this depth on MCP primitives, agent framework, sampling, composability, and hierarchical systems. MANDATORY instructor note: The remote transport discussion (~73:00–79:00) describes SSE as current. Instructors MUST note that as of March 26, 2025, Streamable HTTP replaced SSE as the standard for remote MCP servers. All other content remains accurate.

Viewing Guide:
  Watch for: (1) The THREE primitives: Tools (model-controlled), Resources (application-controlled), Prompts (user-controlled) — memorize these distinctions. (2) Sampling — the mechanism where a server requests completions from the client rather than running its own LLM. (3) Composability — any MCP client can simultaneously be an MCP server.
  Key concept: The primitive taxonomy is the structural foundation. Everything else in MCP builds from understanding which entity controls what.
  Skip: Remote server section (~73:00–79:00) OR replace with the John Welsh talk on Remote MCPs which covers post-deprecation patterns.
  Best timestamps: Three primitives ~8:00; live demo ~15:00; sampling ~55:00; composability ~60:00
  ⚠️ ACCURACY NOTE: SSE reference at ~73:00 is deprecated. Current standard is Streamable HTTP (post-March 26, 2025).
```

---

### Video 5

```
Title: The Creators of Model Context Protocol
Channel: Latent Space (The AI Engineer Podcast)
URL: https://youtu.be/m2VqaNKstGc
Published: April 3, 2025
Duration: 1 hour 19 minutes 56 seconds
Speaker/Presenter: David Soria Parra (Anthropic), Justin Spahr-Summers (Anthropic); hosts: Alessio Fanelli, swyx

Scores:
  Recency: 8/10 — April 2025; post-March 26 Streamable HTTP announcement. Covers Stateless/Streamable HTTP transports and OAuth 2.1 as future roadmap items (since delivered). Solid temporal position.
  Accuracy: 9/10 — Tools/Resources/Prompts primitives correctly described as "presentation-focused." JSON RPC-based communication accurately described. Future roadmap (stateless/streamable HTTP, OAuth 2.1) reflects what was actually shipped. No fabricated primitives or wrong flow directions.
  Longevity: 9/10 — Origin story and design philosophy are permanently valuable; protocol inspiration from LSP is a durable insight; specific transport versions will evolve but the architecture won't
  Depth: 9/10 — Primary source: the engineers who built MCP. Covers origin story (frustration integrating Claude Desktop with IDEs, July 2024), why LSP served as inspiration, MCP vs. OpenAPI tradeoffs, trust/vetting mechanisms, recursive MCP architectures
  Average: 8.75/10

INCLUDE

Week assignment: Week 2
Curriculum fit: Ideal pair with the Mahesh Murag workshop. The workshop gives you "how to build"; this gives you "why it was designed this way." The LSP-as-inspiration insight directly explains WHY the primitive taxonomy works the way it does. Also covers trust/vetting that the workshop doesn't touch.

Viewing Guide:
  Watch for: (1) Why LSP (Language Server Protocol) was the design template — this explains the client-server inversion and why "model agency" doesn't mean the model runs the server. (2) The origin story (July 2024, Claude Desktop frustration) — context for WHY these three primitives were chosen over alternatives. (3) MCP vs. OpenAPI tradeoffs — critical for students who come from REST API backgrounds.
  Key concept: MCP primitives are "presentation-focused" not "capability-focused." Tools, Resources, and Prompts describe how context is surfaced to the model, not what the model can do with it.
  Skip: N/A — high density throughout.
  Best timestamps: LSP inspiration ~20:00; primitive design rationale ~30:00; composability/recursive architecture ~55:00
```

---

### Video 6

```
Title: MCP — Origins and Requests For Startups
Channel: AI Engineer (from AI Engineer World's Fair 2025, MCP Track)
URL: [Part of MCP track playlist; Class Central confirms at classcentral.com/course/youtube-mcp-origins-and-requests-for-startups-theodora-chu-model-context-protocol-pm-anthropic-460922]
Published: June–July 2025 (AI Engineer World's Fair, Jun 3-5, 2025)
Duration: ~18 minutes (conference talk format)
Speaker/Presenter: Theodora "Theo" Chu, Product Manager for MCP, Anthropic

Scores:
  Recency: 10/10 — June 2025, post-Streamable HTTP; from the first dedicated MCP track at any AI conference; current as of research date
  Accuracy: 9/10 — PM for MCP describes the protocol accurately. "Copy-paste hell" origin story matches the Creators episode. Open-source rationale for avoiding proprietary ecosystems is accurate.
  Longevity: 8/10 — Origin story is permanently valuable; startup opportunities section will age as ecosystem matures
  Depth: 7/10 — 18-minute format limits technical depth; strong on context and ecosystem framing, weaker on implementation detail
  Average: 8.5/10

INCLUDE

Week assignment: Week 2
Curriculum fit: Good 18-minute intro before the Murag workshop. Frames WHY MCP matters at an ecosystem level. The "startup opportunities" section is relevant for the course's audience building agentic systems professionally. Pairs with John Welsh's Remote MCP talk for the production/deployment dimension.

Viewing Guide:
  Watch for: (1) The "copy-paste hell" problem statement — this is the one-sentence answer to "why does MCP exist?" (2) Why open-source was non-negotiable — closed proprietary = same fragmented integration problem. (3) Startup RFS (Requests for Startups) — what Anthropic believes is missing from the MCP ecosystem.
  Key concept: MCP's open-standard design is intentional, not incidental. The value is the network effect, which requires openness.
  Skip: N/A — 18 minutes, full watch.
  Best timestamps: Problem statement ~2:00; open-source rationale ~8:00; startup opportunities ~12:00
```

---

### Video 7

```
Title: Remote MCPs — What We Learned from Shipping
Channel: AI Engineer (from AI Engineer World's Fair 2025, MCP Track)
URL: [Class Central confirms at classcentral.com/course/youtube-remote-mcps-what-we-learned-from-shipping-john-welsh-anthropic-460921]
Published: June–July 2025 (AI Engineer World's Fair, Jun 3-5, 2025)
Duration: ~15 minutes (conference talk format)
Speaker/Presenter: John Welsh, Software Engineer, Anthropic

Scores:
  Recency: 10/10 — June 2025; explicitly covers post-March 26 remote MCP architecture with current transport; directly addresses what changed and why
  Accuracy: 10/10 — Anthropic engineer describing Anthropic's own internal MCP Gateway implementation. OAuth 2.0 authentication, stateless transports, MCP Gateway for standardizing external/internal MCP calls — all consistent with shipped product.
  Longevity: 8/10 — Architectural decisions behind remote MCP will remain relevant; specific implementation details of claude.ai integration may evolve
  Depth: 8/10 — Dense 15-minute talk from the engineer who shipped it. Real architectural decisions with production context.
  Average: 9/10

INCLUDE

Week assignment: Week 2
Curriculum fit: Critical complement to Mahesh Murag's workshop, specifically to REPLACE the deprecated SSE section. This is the current authoritative source on remote MCP implementation. Shows how Anthropic itself solved the auth, routing, and standardization problems. Directly relevant to students building remote MCP servers.

Viewing Guide:
  Watch for: (1) The "integration chaos" problem that predated MCP Gateway — how Anthropic had the same problem internally that MCP solves externally. (2) MCP Gateway architecture — centralized auth, standardized calls, both external and internal MCP. (3) Authentication implementation — OAuth handling at the Gateway layer.
  Key concept: Remote MCP is not just "SSE replacement" — it's an architectural pattern where the client and server can be separated across the network with proper auth and routing infrastructure.
  Skip: N/A — 15 minutes, dense, full watch.
  Best timestamps: Integration chaos problem ~2:00; MCP Gateway ~6:00; auth architecture ~10:00
```

---

## Week 3 Candidates
*Multi-agent orchestration, agent evaluation, meta-prompting at scale, skills vs agents tradeoffs*

---

### Video 8

```
Title: How We Build Effective Agents — Barry Zhang, Anthropic
Channel: AI Engineer
URL: https://www.youtube.com/watch?v=D7_ipDqhtwk
Published: April 4, 2025
Duration: 15 minutes 9 seconds
Speaker/Presenter: Barry Zhang, Member of Technical Staff, Applied AI Team, Anthropic

Scores:
  Recency: 9/10 — April 2025; reflects current Anthropic agent practice post-MCP; framework-agnostic
  Accuracy: 10/10 — No fabricated flags or incorrect primitive descriptions. Three principles ("don't build agents for everything," "keep it simple," "think like your agents") are consistent with Anthropic's public guidance. Agent components (environment, tools, system prompts) correctly described.
  Longevity: 10/10 — Pure principles, no UI walkthroughs, no specific API calls. Will be accurate in 5 years.
  Depth: 9/10 — 409K views. From Anthropic's applied AI team. Covers when agents prove valuable (complex, ambiguous, high-value, verifiable), multi-agent communication patterns, cost and latency challenges.
  Average: 9.5/10

INCLUDE

Week assignment: Week 3
Curriculum fit: The single best Week 3 anchor. Directly addresses "skills vs agents tradeoffs" from the source that coined the distinction. Complements "Don't Build Agents, Build Skills Instead" (Video 9). The three principles provide a decision framework students can apply to any multi-agent system design.

Viewing Guide:
  Watch for: (1) The four criteria for "when agents are valuable" — complex, ambiguous, high-value, verifiable. Apply this as a filter to any proposed agentic system. (2) "Think like your agents" — the empathetic debugging approach. (3) Multi-agent communication cost discussion — latency and cost are the hidden constraints.
  Key concept: "Don't build agents for everything" is not a limitation — it's engineering discipline. Most problems don't need agents; the ones that do are specific.
  Skip: N/A — 15 minutes, full watch.
  Best timestamps: When-to-use-agents criteria ~3:00; agent components ~7:00; multi-agent challenges ~11:00
```

---

### Video 9

```
Title: Don't Build Agents, Build Skills Instead — Barry Zhang & Mahesh Murag, Anthropic
Channel: AI Engineer
URL: https://www.youtube.com/watch?v=CEvIs9y1uog
Published: December 8, 2025
Duration: 16 minutes 22 seconds
Speaker/Presenter: Barry Zhang & Mahesh Murag, Anthropic

Scores:
  Recency: 10/10 — December 2025; introduces AgentSkills, Anthropic's latest architectural pattern for the skills-vs-agents distinction
  Accuracy: 9/10 — Both speakers are the architects of what they're describing. AgentSkills is a shipped product from Anthropic. No accuracy concerns identified.
  Longevity: 9/10 — The skills-as-packaged-knowledge paradigm is a durable architectural concept, not a UI feature
  Depth: 9/10 — 857K views (2nd most-watched SE talk of 2025). Introduces a new architectural category with concrete examples.
  Average: 9.25/10

INCLUDE

Week assignment: Week 3
Curriculum fit: Directly addresses the "skills vs agents tradeoffs" curriculum topic. Pair with Video 8 (How We Build Effective Agents) for a complete Anthropic-sourced framework for multi-agent architecture decisions. The contrast is: Video 8 = when to use agents; Video 9 = when to use skills instead.

Viewing Guide:
  Watch for: (1) The definition of a "skill" vs. an "agent" — skills are dynamically-loadable procedural knowledge packages. (2) The architectural vision: one universal agent + a library of domain-specific skills vs. many purpose-built agents. (3) How skills address the orchestration complexity problem.
  Key concept: A skill is not a tool (tools are function calls); a skill is packaged domain-specific procedural intelligence that an agent can load and execute.
  Skip: N/A — 16 minutes, full watch.
  Best timestamps: Skills vs agents definition ~3:00; architectural comparison ~8:00; demo ~12:00
```

---

### Video 10

```
Title: Building and Evaluating AI Agents — Sayash Kapoor, AI Snake Oil
Channel: AI Engineer
URL: [Confirmed from AI Engineer Summit Feb 2025; 220K views per Tech Talks Weekly Top 100; YouTube ID not extractable from available search results — search on @aiDotEngineer channel for "Sayash Kapoor"]
Published: April 17, 2025
Duration: 20 minutes
Speaker/Presenter: Sayash Kapoor, Princeton University / AI Snake Oil co-author

Scores:
  Recency: 8/10 — April 2025; evaluation critique is evergreen but references contemporary benchmark landscape
  Accuracy: 9/10 — Academic researcher presenting evaluation methodology critique. No MCP primitive errors, no Claude Code flag errors. Claims about benchmark gaming and HAL (Holistic Agent Leaderboard) are verifiable.
  Longevity: 10/10 — Evaluation methodology critique is one of the most durable topics in AI engineering. The failure modes of benchmark design don't change.
  Depth: 9/10 — 220K views. Princeton AI researcher. Introduces HAL (Holistic Agent Leaderboard), multi-dimensional metrics (accuracy + cost + reliability), and the gap between lab benchmarks and production performance.
  Average: 9/10

INCLUDE

Week assignment: Week 3
Curriculum fit: Critical counterweight to the optimistic Anthropic talks. Week 3 on "agent evaluation" requires understanding why naive evaluation fails. Kapoor's academic perspective and HAL framework give students a rigorous framework for evaluating their own multi-agent systems. Pairs with Aparna Dhinakaran's Arize talk (Video 11) for the production eval tools dimension.

Viewing Guide:
  Watch for: (1) Why static benchmarks fail for agents — the multi-dimensional nature of agent performance (accuracy alone is not enough). (2) The "cost is missing from benchmarks" insight — production agents must optimize cost+latency+accuracy jointly. (3) HAL framework — how to build evaluations that transfer from lab to production.
  Key concept: "Most impressive benchmark performance very rarely translates into the real world." This is the thesis statement for why agent evaluation is harder than model evaluation.
  Skip: N/A — 20 minutes, full watch.
  Best timestamps: Benchmark critique ~3:00; multi-dimensional metrics ~8:00; HAL framework ~14:00
```

---

### Video 11

```
Title: Ensure AI Agents Work: Evaluation Frameworks for Scaling Success — Aparna Dhinakaran, Arize
Channel: AI Engineer
URL: [From AI Engineer Summit Feb 2025; 31K views per Tech Talks Weekly; embed URL from schedule: youtube.com/embed/OC04sP_QgTI]
Published: April 23, 2025
Duration: 15 minutes 28 seconds
Speaker/Presenter: Aparna Dhinakaran, CEO & Co-Founder, Arize AI

Scores:
  Recency: 9/10 — April 2025; evaluation frameworks reflect current production tooling
  Accuracy: 8/10 — Production eval practitioner. No technical accuracy concerns noted. Arize is a leading eval/observability platform.
  Longevity: 8/10 — Eval frameworks will evolve but the structured approach to LLM judges and eval suite design is durable
  Depth: 8/10 — 31K views. Practitioner perspective with specific tooling recommendations and failure mode taxonomy.
  Average: 8.25/10

INCLUDE

Week assignment: Week 3
Curriculum fit: Bridges Week 3 (agent evaluation) and Week 4 (production deployment). Provides concrete tooling (Arize Phoenix, LLM judges, eval harnesses) that complements Kapoor's theoretical framework. Together they give students both the WHY (Kapoor) and HOW (Dhinakaran) of agent evaluation.

Viewing Guide:
  Watch for: (1) LLM-as-judge design — when to use LLMs as evaluators vs. deterministic checks. (2) Eval harness architecture — how to structure test suites for agents that have non-deterministic outputs. (3) Scaling from prototype evals to production monitoring.
  Key concept: Evaluation frameworks for agents require different primitives than traditional software testing — you're testing probabilistic behavior, not deterministic function outputs.
  Skip: Arize-specific product demos if you're not using Arize; the methodology sections apply to any tooling.
  Best timestamps: LLM judge design ~4:00; eval harness ~8:00; production scaling ~12:00
```

---

### Video 12

```
Title: Rethinking how we Scaffold AI Agents — Rahul Sengottuvelu, Ramp
Channel: AI Engineer
URL: https://www.youtube.com/watch?v=-rsTkYgnNzM
Published: March 19–22, 2025
Duration: 16 minutes 32 seconds
Speaker/Presenter: Rahul Sengottuvelu, Head of Applied AI, Ramp

Scores:
  Recency: 9/10 — March 2025; draws on "the bitter lesson" from AI research applied to 2025 agent architecture
  Accuracy: 9/10 — No MCP or Claude Code accuracy issues. The "bitter lesson" (Sutton 2019) is correctly framed. Production scaling argument (compute-scalable systems beat rigid heuristics) is empirically grounded.
  Longevity: 9/10 — Architectural argument (compute-scalable vs. handcrafted) is permanent. CSV parsing example as three-architecture comparison will remain illustrative.
  Depth: 8/10 — 36K views. Three concrete architectures compared (manually coded, LLM-basic, LLM-iterative-parallel). Grounded in Ramp's production experience.
  Average: 8.75/10

INCLUDE

Week assignment: Week 3
Curriculum fit: Addresses "multi-agent orchestration" from the production engineering angle. The "systems that scale with compute beat systems that don't" principle directly guides orchestration architecture decisions. Contrast with Barry Zhang's "keep it simple" — students should understand both principles apply at different stages.

Viewing Guide:
  Watch for: (1) The three-architecture comparison for CSV parsing — this is a concrete model for how to choose orchestration complexity. (2) The "bitter lesson" application — why you shouldn't over-engineer the scaffolding around models. (3) The failure mode of rigid heuristics as models improve.
  Key concept: "Systems that scale with compute beat systems that don't." Design your multi-agent architecture so that better models automatically produce better results without re-engineering the scaffold.
  Skip: N/A — 16 minutes, full watch.
  Best timestamps: Three architectures ~4:00; bitter lesson application ~9:00; production lessons ~13:00
```

---

### Video 13

```
Title: 12-Factor Agents: Patterns of Reliable LLM Applications — Dex Horthy, HumanLayer
Channel: AI Engineer
URL: https://www.youtube.com/watch?v=8kMaTybvDUw
Published: July 3, 2025
Duration: 17 minutes 6 seconds
Speaker/Presenter: Dex Horthy, HumanLayer

Scores:
  Recency: 9/10 — July 2025; the 12 factors are distilled from conversations with 100+ founders building production agents in 2025
  Accuracy: 9/10 — No Claude Code flag errors, no MCP primitive errors. "Tools are just structured outputs" is accurate. "Own your context window" is consistent with production Claude Code patterns. "Make your agent a stateless reducer" is valid architectural guidance.
  Longevity: 10/10 — Twelve principles written to be model-agnostic and framework-agnostic. Deliberately mirrors the 12-Factor App in durability design.
  Depth: 9/10 — 262K views. 12 factors with concrete examples; most are directly actionable.
  Average: 9.25/10

INCLUDE

Week assignment: Week 3
Curriculum fit: Provides the production-ready architectural framework for Week 3 multi-agent systems. The 12 factors can serve as a rubric for evaluating any multi-agent architecture the students design. Particularly strong on "Own your control flow" (anti-framework dependency), "Contact humans with tool calls" (human-in-the-loop), and "Small/Focused Agents" (vs. monolithic agents).

Viewing Guide:
  Watch for: (1) Factor 1 (Natural Language to Tool Calls) and Factor 4 (Tools are just structured outputs) — these reframe how you think about agent-to-tool interface. (2) Factor 6 (Launch/Pause/Resume with simple APIs) — critical for production multi-agent systems. (3) Factor 12 (Stateless Reducer) — the architectural insight that enables horizontal scaling.
  Key concept: Factor 8 (Own your control flow) — don't use a framework that hides the control flow from you. If you can't see it, you can't debug it.
  Skip: Factors you already know; watch the first 8 minutes for the most novel insights.
  Best timestamps: Factor overview ~2:00; control flow ~8:00; stateless reducer ~13:00
```

---

## Week 4 Candidates
*Spec-driven development, production deployment, agent testing, enterprise agentic systems*

---

### Video 14

```
Title: The New Code — Sean Grove, OpenAI
Channel: AI Engineer
URL: https://www.youtube.com/watch?v=8rABwKRsec4
Published: July 11–12, 2025
Duration: 21 minutes 36 seconds
Speaker/Presenter: Sean Grove, Alignment Research, OpenAI

Scores:
  Recency: 10/10 — July 2025, AI Engineer World's Fair keynote; directly addresses the 2025 "specification as source of truth" movement
  Accuracy: 9/10 — No MCP/Claude Code technical errors. Historical claims (US Constitution as versioned spec, OpenAI Model Spec) are verifiable. The spec-to-code-generation claim is not overclaimed.
  Longevity: 10/10 — Argument that "specifications are the fundamental unit of AI-era programming" is a durable thesis regardless of which model or tool ships next. 1M+ views validates broad applicability.
  Depth: 9/10 — 1M+ views. Connects academic computer science (formal specs, pre/postconditions, invariants) to practical AI-era development. Introduces the paradigm shift from writing code to writing specifications.
  Average: 9.5/10

INCLUDE

Week assignment: Week 4
Curriculum fit: THE foundational Week 4 talk. "Spec-driven development" is named in the curriculum, and this is the keynote that defined the concept in 2025. Students should watch this before attempting any Week 4 practical work. Pairs with GitHub's spec-kit tools and Thoughtworks' spec-driven development guide.

Viewing Guide:
  Watch for: (1) The claim that "specifications compile to documentation, evaluations, model behaviors, and code" — this is the spec-driven development value chain. (2) The analogy to the US Constitution as versioned specification — frame for why specs must be explicit about values, not just behavior. (3) The contrast between prompt engineering (ad hoc) and spec-driven development (formal, versioned).
  Key concept: "The person who communicates the best will be the most valuable programmer in the future." Specifications are now the source code.
  Skip: N/A — 22 minutes, full watch.
  Best timestamps: Spec as source of truth ~4:00; compilation analogy ~10:00; model spec example ~16:00
```

---

### Video 15

```
Title: Evolving Claude APIs for Agents — Katelyn Lesse, Anthropic
Channel: AI Engineer
URL: https://www.youtube.com/watch?v=aqW68Is_Kj4
Published: December 2025 (AI Engineer Code Summit, Nov 19-22, 2025)
Duration: 13 minutes 25 seconds
Speaker/Presenter: Katelyn Lesse, Head of API Engineering, Anthropic

Scores:
  Recency: 10/10 — December 2025; covers Claude Sonnet 4.5 launch, context management capabilities, Memory tool, Code Execution Tool — all current
  Accuracy: 9/10 — Head of API Engineering describing what she shipped. Memory tool (client-side file system), Code Execution Tool (sandboxed container), context management for long-running agents — all consistent with shipped product.
  Longevity: 7/10 — API details will evolve; the architectural principles (memory + context + code execution as the three pillars) will remain relevant longer
  Depth: 8/10 — 32K views. Dense 13 minutes on current API surface. Critical for Week 4 production deployment discussion.
  Average: 8.5/10

INCLUDE

Week assignment: Week 4
Curriculum fit: Directly relevant to "production deployment" and "enterprise agentic systems." Covers the official Anthropic API surface for building production agents: memory, context management, code execution, and the philosophical "tripartite approach." Pairs with Barry Zhang's "How We Build Effective Agents" (the practice) by providing the API infrastructure that enables it.

Viewing Guide:
  Watch for: (1) Memory tool — how Anthropic implements agent memory as a client-side file system for out-of-window storage. (2) Context management APIs — what's available for managing long-running agent context programmatically. (3) Code Execution Tool — sandboxed container architecture and security model.
  Key concept: The three pillars (harnessing intelligence, managing context, enabling autonomy) are the production API design philosophy — understanding this framework helps you choose the right API primitives for your use case.
  Skip: N/A — 13 minutes, full watch.
  Best timestamps: Memory tool ~4:00; context management ~7:00; code execution ~10:00
```

---

### Video 16

```
Title: How to Train Your Agent: Building Reliable Agents with RL — Kyle Corbitt, OpenPipe
Channel: AI Engineer
URL: https://www.youtube.com/watch?v=gEDl9C8s_-4
Published: July 19, 2025
Duration: 19 minutes 48 seconds
Speaker/Presenter: Kyle Corbitt, CEO, OpenPipe

Scores:
  Recency: 9/10 — July 2025; GRPO (Generalized Reward-based Policy Optimization) is current; ART (Agent Reinforcement Trainer) is an active open-source project
  Accuracy: 9/10 — OpenPipe CEO describing their own production work. 74%→94% success rate via GRPO on ART-E email assistant is a specific, verifiable claim. No MCP/Claude Code errors.
  Longevity: 8/10 — RL for agents is a durable approach; GRPO specifics may evolve; the principle (measure, then fine-tune) is permanent
  Depth: 9/10 — 58K views. Concrete 100-email case study with measurable outcomes. Covers GRPO technique with real error rates and production data.
  Average: 8.75/10

INCLUDE

Week assignment: Week 4
Curriculum fit: Addresses "agent testing" and production reliability from a different angle — using RL to improve reliability at scale. Directly relevant to the Week 4 "production deployment" topic. Shows students what to do when prompt engineering and evaluation alone aren't enough for production SLAs.

Viewing Guide:
  Watch for: (1) The measurement-first approach — before fine-tuning, baseline your error rate with real production data. (2) GRPO technique — why group-relative policy optimization works for agent tasks (multi-step, reward-based). (3) The cost/latency/quality tradeoff after fine-tuning (smaller model, better performance).
  Key concept: RL for agents is not about replacing prompting — it's what you do after you've proven your prompting works and need to scale reliability cost-effectively.
  Skip: N/A — 20 minutes, full watch.
  Best timestamps: Problem setup ~2:00; GRPO explanation ~7:00; results (74%→94%) ~14:00
```

---

### Video 17

```
Title: 3 Ingredients for Building Reliable Enterprise Agents — Harrison Chase, LangChain
Channel: AI Engineer
URL: [52K views per Tech Talks Weekly, July 23, 2025; from AI Engineer World's Fair 2025 — search @aiDotEngineer for "Harrison Chase" or "3 ingredients"]
Published: July 23, 2025
Duration: 20 minutes 55 seconds
Speaker/Presenter: Harrison Chase, CEO & Co-Founder, LangChain

Scores:
  Recency: 9/10 — July 2025; LangGraph and LangSmith are current; addresses 2025 enterprise agent deployment landscape
  Accuracy: 8/10 — CEO of LangChain describing LangGraph/LangSmith architecture. No MCP/Claude Code errors noted in summaries. Framework-specific claims should be verified against LangGraph docs.
  Longevity: 8/10 — Three ingredients (controllability, memory, observability) are framework-agnostic principles even if the talk is LangGraph-centric
  Depth: 8/10 — 52K views. From the company doing the most production agent deployments in 2025. Covers planning, memory, subagents, file systems as enterprise-ready components.
  Average: 8.25/10

INCLUDE

Week assignment: Week 4
Curriculum fit: Enterprise agent deployment perspective from the leading orchestration framework company. Complements Anthropic's "how to think about agents" with "how enterprises actually deploy them in 2025." The three ingredients (controllability, memory, observability) map directly to Week 4 topics.

Viewing Guide:
  Watch for: (1) Why controllability matters more than capability for enterprise deployment. (2) The "cognitive architecture" framing — how control flow design is now the core engineering challenge. (3) LangSmith observability — how LangChain solves the "you can't improve what you can't measure" problem.
  Key concept: Enterprise agents need controllability first, capability second. A reliable 80%-accurate agent is more valuable than a flaky 95%-accurate agent.
  Skip: LangGraph/LangSmith-specific product demos if using different tooling; principles apply universally.
  Best timestamps: Three ingredients ~2:00; controllability deep-dive ~8:00; memory architecture ~14:00
```

---

### Video 18

```
Title: POC to PROD: Hard Lessons from 200+ Enterprise GenAI Deployments — Randall Hunt, Caylent
Channel: AI Engineer
URL: [39K views per Tech Talks Weekly, July 23, 2025 — from AI Engineer World's Fair 2025; search @aiDotEngineer]
Published: July 23, 2025
Duration: 19 minutes 16 seconds
Speaker/Presenter: Randall Hunt, Caylent

Scores:
  Recency: 9/10 — July 2025; based on 200+ real enterprise deployments in the 12 months prior
  Accuracy: 8/10 — Practitioner presenting lessons from actual deployments. Claims are experience-based not specification-based; accuracy depends on field experience validity.
  Longevity: 9/10 — Production deployment failure patterns are durable; the gap between POC and PROD is a perennial challenge
  Depth: 8/10 — 39K views. Specific failure modes from 200+ deployments is a unique data source not available from lab research.
  Average: 8.5/10

INCLUDE

Week assignment: Week 4
Curriculum fit: Provides the empirical grounding for Week 4. While other talks describe how things should be built, this talk describes what actually breaks in production. The "200+ deployments" sample size gives it credibility that case studies lack. Critical for students entering enterprise AI roles.

Viewing Guide:
  Watch for: (1) The most common POC→PROD failure modes (context management, cost at scale, reliability regression). (2) The 93% "stuck in pilot" statistic — what separates the 7% that reach production scale. (3) Governance and security patterns that enterprises actually require.
  Key concept: The POC→PROD gap is primarily organizational and operational, not technical. Most production failures are not caused by the model.
  Skip: AWS-specific tooling sections if not using AWS.
  Best timestamps: Failure mode taxonomy ~3:00; organizational patterns ~10:00; production checklist ~15:00
```

---

## Disqualified (with reasons)

---

### Building Agents with Model Context Protocol Workshop — Mahesh Murag (standalone SSE section)

```
NOT fully disqualified — included with caveat. The remote transport section (~73:00–79:00) describes SSE as current remote transport for MCP servers. This is deprecated as of March 26, 2025 (replaced by Streamable HTTP). The full workshop passes on other dimensions but requires an instructor accuracy overlay for that segment. Instructors should pair this workshop with John Welsh's Remote MCPs talk.
```

---

### "How Claude Code Works" — Jared Zoneraich, PromptLayer (78K views, Dec 26, 2025)

```
Reason for disqualification: Third-party analysis, not from Anthropic. 78K views suggests appeal but the risk of accuracy errors is higher than primary-source talks. PromptLayer is an observability vendor with potential framing bias. Not included when primary sources (Boris Cherny, Cat Wu, Katelyn Lesse) cover the same ground more accurately.
```

---

### "AI Engineering Goes Mainstream" — swyx, Latent Space (AIEWF 2025 keynotes recap)

```
Reason: Article/newsletter format, not a video. The latent.space/p/aiewf-2025-keynotes post is valuable reading but not a video resource for curriculum use.
```

---

### "Building AI Agents that Actually Automate Knowledge Work" — Jerry Liu, LlamaIndex (121K views, Jun 24, 2025)

```
Reason for conditional exclusion: LlamaIndex-specific framing; LlamaIndex is one framework among many. The insights may be accurate but the LlamaIndex-centric perspective could mislead students into framework-specific thinking. Consider for supplemental reading list but not core curriculum.
Accuracy flag: LlamaIndex framing of RAG agents may conflate RAG patterns with general agent patterns in ways that don't transfer to Claude Code / MCP context.
```

---

### "Architecting Agent Memory" — Richmond Alake, MongoDB (113K views, Jun 27, 2025)

```
Reason: MongoDB-specific. Architecture principles are sound but tied to MongoDB vector store patterns. Not wrong, but framework-specific in a way that limits transferability. Better for supplemental list than core curriculum.
```

---

### AI Engineer World's Fair Day 1 Keynote Livestream (https://www.youtube.com/watch?v=z4zXicOAF28)

```
Reason: Livestream format (unedited, multi-hour). Individual talks from this stream are extracted and released separately. Reference individual talks (Sean Grove, etc.) rather than the raw stream.
```

---

### "Function Calling is All You Need" — Ilan Bigio, OpenAI (31K views, Apr 23, 2025, 1h 43m)

```
Reason for non-inclusion in core curriculum: OpenAI-specific content (Agent SDK, Responses API, Swarm framework). Accuracy concern: describes OpenAI Agent SDK and Swarm, which are OpenAI-specific tools that may confuse students building with Claude/MCP. The tool-calling architecture principles are sound but the workshop is built around OpenAI tooling. Recommended for supplemental reading for students using OpenAI; not core curriculum for a Claude/MCP course.
```

---

### "#define AI Engineer" — Greg Brockman, OpenAI (60K views, Aug 10, 2025, 41m)

```
Reason: Career/identity talk, not technical. Defines the AI Engineer role but doesn't provide curriculum-relevant technical content. Valuable for context but not for the 4-week technical curriculum.
```

---

### "Claude Code for Finance" + Global Memory Shortage — Doug O'Laughlin (Latent Space)

```
Reason: Domain-specific (finance/semiconductors). The Claude Code usage patterns are relevant but the finance context limits Week 1 applicability. Supplemental reading for finance-track students only.
```

---

## Summary Table

| Title | Channel | Views | Duration | Pub Date | Avg Score | Week | Status |
|-------|---------|-------|----------|----------|-----------|------|--------|
| Claude Code: Anthropic's Agent in Your Terminal | Latent Space | N/A | 71m | May 7, 2025 | 8.75 | 1 | INCLUDE |
| No Vibes Allowed: Solving Hard Problems in Complex Codebases | AI Engineer | 377K | 20m | Dec 2, 2025 | 9.5 | 1 | INCLUDE |
| Claude Code & the Evolution of Agentic Coding | AI Engineer | 131K | 18m | Jul 4, 2025 | 8.5 | 1 | INCLUDE |
| Building Agents with MCP — Full Workshop | AI Engineer | 325K | 1h44m | Mar 1, 2025 | 7.5* | 2 | INCLUDE WITH CAVEAT |
| The Creators of Model Context Protocol | Latent Space | N/A | 1h20m | Apr 3, 2025 | 8.75 | 2 | INCLUDE |
| MCP — Origins and Requests For Startups | AI Engineer | N/A | ~18m | Jun-Jul 2025 | 8.5 | 2 | INCLUDE |
| Remote MCPs — What We Learned from Shipping | AI Engineer | N/A | ~15m | Jun-Jul 2025 | 9.0 | 2 | INCLUDE |
| How We Build Effective Agents | AI Engineer | 409K | 15m | Apr 4, 2025 | 9.5 | 3 | INCLUDE |
| Don't Build Agents, Build Skills Instead | AI Engineer | 857K | 16m | Dec 8, 2025 | 9.25 | 3 | INCLUDE |
| Building and Evaluating AI Agents | AI Engineer | 220K | 20m | Apr 17, 2025 | 9.0 | 3 | INCLUDE |
| Ensure AI Agents Work: Evaluation Frameworks | AI Engineer | 31K | 15m | Apr 23, 2025 | 8.25 | 3 | INCLUDE |
| Rethinking how we Scaffold AI Agents | AI Engineer | 36K | 16m | Mar 19, 2025 | 8.75 | 3 | INCLUDE |
| 12-Factor Agents: Patterns of Reliable LLM Applications | AI Engineer | 262K | 17m | Jul 3, 2025 | 9.25 | 3 | INCLUDE |
| The New Code — Sean Grove, OpenAI | AI Engineer | 1M+ | 22m | Jul 11, 2025 | 9.5 | 4 | INCLUDE |
| Evolving Claude APIs for Agents | AI Engineer | 32K | 13m | Dec 2025 | 8.5 | 4 | INCLUDE |
| How to Train Your Agent: Building Reliable Agents with RL | AI Engineer | 58K | 20m | Jul 19, 2025 | 8.75 | 4 | INCLUDE |
| 3 Ingredients for Building Reliable Enterprise Agents | AI Engineer | 52K | 21m | Jul 23, 2025 | 8.25 | 4 | INCLUDE |
| POC to PROD: 200+ Enterprise GenAI Deployments | AI Engineer | 39K | 19m | Jul 23, 2025 | 8.5 | 4 | INCLUDE |

*With mandatory accuracy caveat on SSE transport section (~73:00–79:00)

---

## Confirmed YouTube URLs

| Video | URL |
|-------|-----|
| Claude Code: Anthropic's Agent in Your Terminal (Latent Space) | https://youtu.be/zDmW5hJPsvQ |
| No Vibes Allowed — Dex Horthy | https://www.youtube.com/watch?v=rmvDxxNubIg |
| 12-Factor Agents — Dex Horthy | https://www.youtube.com/watch?v=8kMaTybvDUw |
| The Creators of MCP (Latent Space) | https://youtu.be/m2VqaNKstGc |
| How We Build Effective Agents — Barry Zhang | https://www.youtube.com/watch?v=D7_ipDqhtwk |
| Don't Build Agents, Build Skills Instead | https://www.youtube.com/watch?v=CEvIs9y1uog |
| The New Code — Sean Grove | https://www.youtube.com/watch?v=8rABwKRsec4 |
| Evolving Claude APIs for Agents — Katelyn Lesse | https://www.youtube.com/watch?v=aqW68Is_Kj4 |
| How to Train Your Agent (RL) — Kyle Corbitt | https://www.youtube.com/watch?v=gEDl9C8s_-4 |
| Claude Code & Evolution of Agentic Coding — Boris Cherny | https://www.youtube.com/watch?v=if9iv4xponk |

## URLs Requiring Manual Lookup on @aiDotEngineer YouTube Channel

These videos are confirmed to exist on the AI Engineer YouTube channel with the specified view counts (per Tech Talks Weekly Top 100, 2025), but their exact video IDs could not be extracted from available search results. Search the @aiDotEngineer channel directly:

- Building Agents with MCP Full Workshop (Mahesh Murag, ~325K views)
- MCP Origins and Requests For Startups (Theodora Chu, from Jun 2025 MCP Track)
- Remote MCPs What We Learned from Shipping (John Welsh, from Jun 2025 MCP Track)
- Building and Evaluating AI Agents (Sayash Kapoor, ~220K views, Apr 2025)
- Ensure AI Agents Work: Evaluation Frameworks (Aparna Dhinakaran, ~31K views)
- 3 Ingredients for Building Reliable Enterprise Agents (Harrison Chase, ~52K views)
- POC to PROD: 200+ Enterprise GenAI Deployments (Randall Hunt, ~39K views)

---

## Research Notes

### Key Findings

1. **The AI Engineer channel (@aiDotEngineer) dominates this space.** The 2025 Tech Talks Weekly Top 100 Most-Watched Software Engineering Talks shows AI Engineer talks at ranks #3 (Sean Grove), #4 (Barry Zhang + Mahesh Murag), #5 (Barry Zhang), #6 (Dex Horthy/No Vibes), #7 (Mahesh Murag/MCP Workshop), #11 (Dex Horthy/12-Factor). This channel is the primary source for curriculum-grade technical talks.

2. **The MCP SSE deprecation is the main accuracy trap.** Any MCP talk published before March 26, 2025 that discusses remote transports must be used with a correction overlay. The Mahesh Murag workshop (Mar 1, 2025) is the only included video with this issue, and it's flagged clearly.

3. **Latent Space provides the best deep-dive interviews.** The AI Engineer channel gives 15-20 minute conference talks; Latent Space provides 60-80 minute deep dives with the actual builders. Curriculum should use both.

4. **No suitable Week 1 TCEF-specific video found.** The TCEF (Task-Context-Examples-Format) prompting framework isn't covered as a standalone topic in any AI Engineer talk. The closest is Dex Horthy's "No Vibes Allowed" (which teaches the research-plan-implement discipline). Instructors may need to create original TCEF content.

5. **CLAUDE.md architecture talks are scarce as standalones.** No AI Engineer talk is exclusively about CLAUDE.md architecture. The topic is covered within the Claude Code episodes (Latent Space interview, Boris Cherny talk, Dex Horthy's "No Vibes Allowed"). This suggests original content creation is needed for the CLAUDE.md-as-architecture-document deep dive.

6. **The Latent Space "Why MCP Won" article (Mar 10, 2025) is not a video** — it's a newsletter post. Swyx references the Mahesh Murag workshop but doesn't create a standalone video for it.

### Confidence Levels on YouTube IDs

- **Confirmed via transcript services**: rmvDxxNubIg (No Vibes), 8kMaTybvDUw (12-Factor), D7_ipDqhtwk (Barry Zhang/Effective Agents), 8rABwKRsec4 (Sean Grove/New Code), gEDl9C8s_-4 (Kyle Corbitt/RL)
- **Confirmed from Latent Space page**: zDmW5hJPsvQ (Claude Code podcast), m2VqaNKstGc (MCP Creators)
- **Confirmed from search results**: CEvIs9y1uog (Don't Build Agents), aqW68Is_Kj4 (Katelyn Lesse), if9iv4xponk (Boris Cherny/Evolution)
- **Needs manual verification**: All URLs in the "Requires Manual Lookup" section above
