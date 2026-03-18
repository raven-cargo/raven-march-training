# Independent Creator Video Research — Agentic AI Engineering Curriculum
**Research Date**: 2026-03-17
**Scope**: Independent creators and practitioner channels; videos relevant to 4-week agentic AI engineering curriculum
**Methodology**: Multi-pass web search across creator-specific queries, aggregator sites (Class Central, NoxInfluencer, Podwise, Recapio, OpenTools), GitHub repos, and X/Twitter announcements

---

## Important Preamble: What This Research Found (and Didn't Find)

Web search cannot directly access YouTube's search index or retrieve live view counts. What it *can* reliably surface:

- Videos referenced heavily across blogs, GitHub READMEs, X posts, and aggregator sites — a strong proxy for community signal
- Video metadata (title, date, duration, URL) confirmed through third-party indexers (Podwise, OpenTools, NoxInfluencer, Recapio)
- Technical content verified against official Claude Code and MCP documentation

**Confidence notation used below**:
- `URL: CONFIRMED` — direct URL verified via third-party indexer or official source
- `URL: PROBABLE` — URL inferred from confirmed video ID or creator announcement
- `URL: UNVERIFIED` — title/channel confirmed but specific URL not pinned; search YouTube directly

**Critical disambiguation reminder**: This research focuses exclusively on **Claude Code** (the terminal CLI tool, `claude` command). Any video covering only Claude.ai web interface is immediately disqualified regardless of quality.

---

## WEEK 1 VIDEOS
### Topic: CLAUDE.md Architecture, Context Management, TCEF Prompting, Session Discipline, Claude Code Workflow Internals

---

### Video 1.1

```
Title: Building a tool to copy-paste share terminal sessions using Claude Code for web
Channel: Simon Willison (@simonw)
URL: https://www.youtube.com/watch?v=GQvMLLrFPVI  [CONFIRMED via simonwillison.net]
Published: October 23, 2025
Duration: ~11 minutes

Scores:
  Recency: 9/10 — October 2025; covers Claude Code for Web (post-2.0 era); no legacy patterns
  Accuracy: 9/10 — Willison is known for rigorous verification; no fabricated flags observed in
             described content; demonstrates actual Claude Code CLI terminal session workflow, not
             Claude.ai web chat; RTF clipboard, GitHub Gist API, Cloudflare Workers all real
  Longevity: 7/10 — The specific tool built (RTF→HTML sharer) may date; the *workflow pattern*
             (build tool with Claude Code from scratch, iterative prompting, multi-format handling)
             is enduring; UI aesthetics will age
  Depth: 8/10 — Real engineering: authentication flow, multi-format clipboard parsing, Gist API
          integration, Cloudflare Workers auth — actual production concerns addressed
  Average: 8.25/10

INCLUDE

Week assignment: Week 1 (Claude Code workflow internals — session-to-shareable artifact pattern)
Curriculum fit: Fills a gap in showing real iterative Claude Code session workflow; complements
  any lecture on CLAUDE.md context architecture by demonstrating *what a productive session looks
  like end-to-end*; good pairing with context management readings

Viewing Guide:
  Watch for: (1) How Willison structures his prompts as complete specs, not incremental nudges;
             (2) The decision to reference an existing codebase as context rather than explaining
             from scratch; (3) When he switches from building to debugging — how he frames the
             problem for Claude
  Key concept: "Claude Code for Web" uses the same session architecture as the CLI — this video
               implicitly demonstrates that CLAUDE.md-style context priming applies in both modes
  Skip: The UI design aesthetic discussion (3–4 min range) — not curriculum-relevant
```

---

### Video 1.2

```
Title: Context Engineering 101: The Simple Strategy to 100× AI Coding
Channel: Cole Medin (@ColeMedin / coleam00)
URL: UNVERIFIED — announced July 25, 2025 on X (@cole_medin); search YouTube for
     "Cole Medin Context Engineering 101 PRP"
Published: July 25, 2025 (per X announcement timestamp)
Duration: Unknown

Scores:
  Recency: 9/10 — July 2025; post-Claude Code 2.0; covers PRP framework for CLAUDE.md-style
             context; explicitly discusses Claude Code as primary tool
  Accuracy: 8/10 — GitHub repo (coleam00/context-engineering-intro) cross-validates claims;
             PRP framework is real and documented; CLAUDE.md usage as "project constitution"
             is accurate per official docs; no fabricated flags or API claims observed in
             aggregated descriptions
  Longevity: 9/10 — Context engineering as a discipline predates specific tool versions;
             PRP (Product Requirements Prompts) pattern is tool-agnostic; will remain relevant
             even as Claude Code UI changes
  Depth: 8/10 — Cole is an AI educator with 175K+ subscribers; his GitHub repo has real working
          templates; content goes beyond conceptual into PRP structure, CLAUDE.md patterns,
          and multi-agent application
  Average: 8.5/10

INCLUDE

Week assignment: Week 1 (context management, TCEF prompting, session discipline)
Curriculum fit: Directly addresses context engineering as a first-principles discipline; fills
  the gap between "CLAUDE.md is a file" and "CLAUDE.md is a structured context engineering
  artifact"; pairs well with Week 1 architecture lectures; provides concrete PRP template
  students can adopt

Viewing Guide:
  Watch for: (1) The distinction between prompt engineering (single-shot) and context engineering
             (structured persistent context); (2) PRP structure — how it maps to CLAUDE.md project
             sections; (3) How Cole uses the CLAUDE.md global rules section vs. project-level rules
  Key concept: Context engineering is not about a single clever prompt — it's about designing the
               entire context window as a system. This reframes CLAUDE.md from "config file" to
               "engineering artifact"
  Skip: Any segments on other AI coding assistants (Cursor, Windsurf) — curriculum is Claude
        Code-specific; the pattern transfers but the specifics don't
```

---

### Video 1.3 — CONDITIONAL INCLUDE (pending accuracy verification)

```
Title: David Ondrej 27-Minute Claude Code Masterclass Condensation
Channel: David Ondrej (@DavidOndrej1)
URL: UNVERIFIED — announced January 20, 2026 on X (@DavidOndrej1); search YouTube for
     "David Ondrej Claude Code masterclass 27 minutes"
Published: January 20, 2026
Duration: ~27 minutes

Scores:
  Recency: 10/10 — January 2026; distills Anthropic's own 7-hour official Code With Claude course
  Accuracy: CONDITIONAL — 7/10 pending direct verification. The source material is Anthropic's
             official course, which is accurate. However, condensation introduces interpretation
             risk. David Ondrej is a popular educator (318K+ subscribers) but not a practitioner
             in the same depth as Willison or IndyDevDan. Must verify: does he accurately
             represent CLAUDE.md as configuration (not "invocation"), MCP primitive count (3),
             and Claude Code as CLI (not web)?
  Longevity: 7/10 — Condensations of official courses date faster than original engineering insight
  Depth: 6/10 — By definition a condensation; students will need to follow up with primary sources
  Average: 7.5/10 (conditional)

CONDITIONAL INCLUDE — Verify accuracy before assigning

Week assignment: Week 1 (orientation/overview use case)
Curriculum fit: Useful as a Week 1 pre-reading orientation video for students new to Claude Code
  who need a rapid overview before Week 1 deep dives; explicitly NOT the canonical technical
  source; label it "orientation only"
Curriculum note: If accuracy verification fails on MCP primitives or CLAUDE.md framing,
  DISQUALIFY immediately

Viewing Guide:
  Watch for: (1) Whether CLAUDE.md is described as passive context or "invoked command" — the
             latter is factually wrong; (2) Whether he specifies CLI vs. web interface for demos;
             (3) Whether his MCP section mentions 3 primitives correctly
  Key concept: N/A — use as orientation map, not conceptual anchor
  Skip: Any segments framing Claude Code as "vibe coding" tool — the curriculum positions it as
        engineering discipline
```

---

## WEEK 2 VIDEOS
### Topic: MCP Building, Tool Schema Design, MCP Server Patterns, Real-World MCP Integrations

---

### Video 2.1

```
Title: I gave Claude root access to my server... Model Context Protocol explained
Channel: Fireship (@fireship)
URL: https://www.youtube.com/watch?v=HyzlYwjoXOQ  [CONFIRMED via OpenTools indexer]
Published: May 14, 2025 (per OpenTools; some sources cite March 31, 2025 — likely draft/premiere
           date vs. public release date; use May 2025 as the confirmed public date)
Duration: ~8 minutes 30 seconds

Scores:
  Recency: 8/10 — May 2025; MCP spec had been public since November 2024; Streamable HTTP was
             standardized March 26, 2025 — this video *may* predate or barely postdate that
             transition. Content discusses TypeScript/Deno server build. SSE vs. Streamable HTTP
             transport accuracy requires verification against the video itself; score reflects
             this uncertainty
  Accuracy: 7/10 — Demonstrates real TypeScript MCP server build with Zod schema validation,
             resource/tool definitions, PostgreSQL integration. The "HorseTender" project is a
             real implementation. CRITICAL CAVEAT: Must verify the video correctly identifies
             Tools, Resources, and Prompts as the THREE primitives, and does not present SSE
             as the current remote transport standard (deprecated March 26, 2025)
  Longevity: 7/10 — Fireship's conceptual framing ("MCP is a new standard for building APIs
             for AI") is accurate and durable; specific TypeScript/Deno API calls will evolve
             but the architecture pattern is stable
  Depth: 7/10 — 8.5 minutes means breadth over depth; Fireship's style optimizes for concept
          orientation, not implementation mastery; excellent for "what is MCP" not "how to
          build production MCP"
  Average: 7.25/10

INCLUDE (with accuracy caveat)

Week assignment: Week 2 (MCP orientation, tool schema design concepts)
Curriculum fit: Best used as the OPENING video for Week 2 — concept orientation before students
  build their own MCP servers; Fireship's accessibility makes abstract architecture concrete;
  should be paired with official MCP spec documentation for transport accuracy

ACCURACY CAVEAT: Before finalizing this inclusion, instructors should verify:
  - Video correctly names THREE primitives: Tools, Resources, Prompts (not four or more)
  - Video does not present SSE as the current remote transport (deprecated post-March 26, 2025)
  - If either is wrong, replace with a post-June 2025 MCP tutorial

Viewing Guide:
  Watch for: (1) The server-client communication architecture — how the LLM talks to the MCP
             server vs. how the server talks to data sources; (2) Zod schema as the tool
             definition format — this is the "tool schema design" concept made concrete;
             (3) The distinction between Resources (read-only data) and Tools (actions)
  Key concept: "MCP is a standard for building APIs that AI can consume" — this reframes MCP
               from "plugin system" to "AI-native API contract"
  Skip: The clickbait framing around "root access" and "job elimination" — course should focus
        on the technical architecture, not the hype narrative
```

---

### Video 2.2

```
Title: Claude Code + Context7 MCP Server Is a GAME CHANGER for AI Coding
Channel: All About AI (YouTube channel)
URL: UNVERIFIED — listed on Class Central; search YouTube for "All About AI Context7 MCP Claude Code game changer"
Published: 2025 (exact date unconfirmed; Class Central listing suggests late 2025 based on
           Context7 MCP server release timeline)
Duration: ~13 minutes (per Class Central listing)

Scores:
  Recency: 8/10 — Context7 MCP server is a 2025 development; Claude Code integration is current;
             13-min focused tutorial suggests tight scope
  Accuracy: 7/10 — Context7 is a real, production MCP server (upstash/context7 GitHub); the
             tutorial demonstrates actual integration. CAVEAT: "All About AI" channel quality
             is less established than Willison/IndyDevDan; accuracy requires direct verification
             of primitive count and transport claims
  Longevity: 8/10 — Context7's pattern (MCP server providing live library docs to LLM) is a
             canonical real-world MCP use case; the architectural pattern (MCP server as
             knowledge bridge) will remain relevant even as Context7 itself evolves
  Depth: 7/10 — 13 minutes limits depth; useful for "MCP in the real world" demonstration
          but not exhaustive schema design coverage
  Average: 7.5/10

INCLUDE (pending URL and accuracy verification)

Week assignment: Week 2 (real-world MCP integrations, tool schema patterns)
Curriculum fit: Fills the gap between "how MCP works conceptually" (Video 2.1) and "what a
  real production MCP server does in a developer workflow"; Context7 is specifically useful
  because it solves a problem students already face (outdated library docs in LLM context);
  makes MCP feel immediately practical

Viewing Guide:
  Watch for: (1) How Context7 registers itself as an MCP server — what the tool schema looks
             like in practice; (2) The workflow integration — how Claude Code invokes Context7
             during a session; (3) Any discussion of Resources vs. Tools in the Context7 impl
  Key concept: MCP servers don't need to wrap external APIs — they can be knowledge bridges
               that inject live context into the LLM's session
  Skip: Any promotional framing; focus on the technical integration pattern
```

---

### Video 2.3

```
Title: INSANE Parallel Coding with Claude Code and Cursor MCP Server
Channel: All About AI (YouTube channel)
URL: UNVERIFIED — listed on Class Central; search YouTube for "All About AI parallel coding Claude Code Cursor MCP"
Published: 2025 (exact date unconfirmed via Class Central listing)
Duration: ~11 minutes (per Class Central listing)

Scores:
  Recency: 8/10 — Multi-agent parallel coding via MCP is a 2025+ Claude Code capability
  Accuracy: UNCERTAIN — 6/10 pending verification. "Cursor MCP Server" in the title could mean
             different things; need to verify this is about actual MCP protocol integration and
             not a generic multi-tool workflow. "Insane" framing is a yellow flag for hype over accuracy
  Longevity: 7/10 — Parallel agent patterns are durable; specific Cursor+Claude Code integration
             may shift as tools evolve
  Depth: 6/10 — 11 minutes for "parallel coding" is very shallow; likely demonstration-level only
  Average: 7.0/10 (conditional — accuracy uncertain)

CONDITIONAL INCLUDE — Lower priority; verify MCP accuracy before assigning

Week assignment: Week 2 or Week 3 (MCP integrations / multi-agent patterns)
Curriculum fit: If accurate, demonstrates MCP's role in enabling tool interoperability across
  IDEs — a concrete real-world integration pattern. If inaccurate on MCP primitives or
  transport, disqualify. Consider only if Video 2.1 and 2.2 leave a gap in multi-tool MCP coverage

Viewing Guide:
  Watch for: (1) Whether "MCP" is being used correctly or as a buzzword; (2) Whether the
             parallel coding shown is actual Claude Code agent parallelism or manual tab switching;
             (3) Whether tool schemas are shown
  Key concept: MCP enables IDE-agnostic tool sharing — Claude Code and Cursor can consume the
               same MCP server
  Skip: Include only verified segments; use as supplementary not primary
```

---

## WEEK 3 VIDEOS
### Topic: Multi-Agent Orchestration, Agent Evaluation, Meta-Prompting at Scale, Skills vs. Agents Tradeoffs

---

### Video 3.1

```
Title: I'm HOOKED on Claude Code Hooks: Advanced Agentic Coding
Channel: IndyDevDan (@IndyDevDan / disler)
URL: https://www.youtube.com/watch?v=J5B9UGTuNoM  [CONFIRMED via Podwise episode indexer]
Published: July 7, 2025
Duration: 30 minutes

Scores:
  Recency: 9/10 — July 2025; Claude Code Hooks is a 2025 feature; pre-tool-use/post-tool-use/
             notification/stop/sub-agent-stop hook types are the current specification
  Accuracy: 9/10 — IndyDevDan (Dan) is a practitioner engineer with production codebase
             (disler/claude-code-hooks-mastery, disler/claude-code-hooks-multi-agent-observability
             on GitHub); hook types described match official Claude Code Hooks documentation
             exactly; no fabricated CLI flags or API claims found in aggregated descriptions;
             GitHub repos provide verifiable cross-reference
  Longevity: 8/10 — The five hook types (pre-tool-use, post-tool-use, notification, stop,
             sub-agent-stop) are architectural; specific syntax may evolve but the pattern of
             intercepting agent lifecycle events is durable; "big three" principles (context,
             model, prompt) explicitly positioned as tool-agnostic
  Depth: 9/10 — 30 minutes with real observability demo; covers blocking dangerous commands,
          text-to-speech notifications, parallel sub-agent coordination; has companion GitHub
          repo; observability angle is production-grade thinking, not tutorial hand-waving
  Average: 8.75/10

INCLUDE — High confidence; top-tier video for Week 3

Week assignment: Week 3 (multi-agent orchestration, agent evaluation via observability hooks)
Curriculum fit: Directly addresses the Week 3 gap between "multi-agent theory" and "multi-agent
  control and observability in production"; hooks are the mechanism that makes agent teams
  governable; this is the practical engineering layer above orchestration patterns

Viewing Guide:
  Watch for: (1) The pre-tool-use hook for safety — blocking commands before execution is the
             agentic safety primitive students must internalize; (2) Post-tool-use hooks for
             logging — this is the foundation of agent evaluation without formal evals framework;
             (3) Sub-agent-stop hook — understanding the agent lifecycle termination event is
             critical for Week 3's orchestration content
  Key concept: "CLAUDE.md for memory, skills for routines, hooks for guarantees, agents for
               delegation" — this taxonomy is the clearest framework for understanding when to
               use each Claude Code primitive; worth pausing on and discussing in class
  Skip: The competitive landscape discussion (AI tool market commentary) — curriculum-irrelevant;
        approximately the first 3–5 minutes based on described content
```

---

### Video 3.2

```
Title: I just BROKE Claude Code: Infinite Agentic Coding GLITCH (Don't try this at work)
Channel: IndyDevDan (@IndyDevDan / disler)
URL: https://www.youtube.com/watch?v=9ipM_vDwflI  [CONFIRMED via NoxInfluencer analytics]
Published: June 9, 2025
Duration: Unknown (NoxInfluencer data: 65,560 views, 2,280 likes, 3.81% engagement rate)

Scores:
  Recency: 9/10 — June 2025; demonstrates multi-agent Claude Code orchestration using slash
             commands and parallel agent spawning — features current as of Claude Code 2.0+
  Accuracy: 8/10 — GitHub repo (disler/infinite-agentic-loop) is real and documented; the two-
             prompt system, four operational modes (single/small batch/large batch/infinite),
             and parallel sub-agent architecture are verifiable. Clickbait title notwithstanding,
             the technical content is engineering-grade. No fabricated flags observed.
  Longevity: 7/10 — The specific "CLAUDE.md as orchestration spec" pattern is durable; the exact
             token consumption behavior may change with model updates; the core concept (agentic
             loop via slash command + sub-agents) is a stable architectural pattern
  Depth: 8/10 — Real implementation: custom /project:infinite slash command, wave coordination
          across parallel agents, quality assurance hooks, context limit awareness; companion
          GitHub repo with working code is the test of depth
  Average: 8.0/10

INCLUDE

Week assignment: Week 3 (multi-agent orchestration, meta-prompting at scale)
Curriculum fit: Demonstrates the extreme end of multi-agent orchestration — useful for establishing
  the boundary of what Claude Code can do architecturally; the CLAUDE.md-as-spec pattern for
  controlling infinite loops directly feeds Week 3 meta-prompting content; the "this has limits"
  framing is pedagogically valuable for discussing context windows

Viewing Guide:
  Watch for: (1) How the /project:infinite slash command acts as the orchestration spec — this
             is CLAUDE.md-driven meta-prompting in action; (2) The wave coordination mechanism —
             how sub-agents report back to the orchestrator without shared state; (3) The context
             limit failure mode — when and why the loop terminates is as important as when it runs
  Key concept: Sub-agents don't share context — each spawned agent gets a fresh window with only
               what the orchestrator explicitly passes. This is the fundamental constraint that
               makes multi-agent design non-trivial.
  Skip: The "GLITCH" framing; this is not a bug exploitation video — it's a multi-agent
        architecture demonstration with a clickbait wrapper
```

---

### Video 3.3 — PRACTITIONER NOTE

**IndyDevDan "I'm HOOKED" companion context:**
The hooks video (3.1) is part of IndyDevDan's broader "Principled AI Coding" / "Tactical Agentic Coding" course series (agenticengineer.com), which covers the "big three" (context, model, prompt) as the invariant foundation of agentic coding. The YouTube channel functions as a free preview layer for this paid curriculum. This is relevant because:
- The free YouTube content is genuinely deep and independently valuable
- Students who engage deeply may pursue the paid course; no conflict for open curriculum use
- Dan's GitHub repos (disler/) are fully open source and usable without the paid course

---

## WEEK 4 VIDEOS
### Topic: Spec-Driven Development, Production Deployment, Agent Testing, Enterprise Agentic Systems

---

### Video 4.1 — RESEARCH GAP (High Priority)

**No Week 4 video passed the scoring threshold from the independent creator space.**

Research notes on what was found and why each was disqualified or deferred:

**David Ondrej "27-min Claude Code Masterclass"** (January 2026): Accuracy unverified (conditional include in Week 1); too surface-level for Week 4 production/testing content even if accurate.

**Matt Wolfe / Future Tools**: Multiple searches found no specific video covering spec-driven development, agent testing, or production deployment with Claude Code. Matt Wolfe's content is confirmed to be accessible/broad — incompatible with Week 4 depth requirements. No video found that clears the ≥7/10 on all dimensions for Week 4 topics.

**Nicholas Renotte**: No relevant videos found on Claude Code, MCP, or agentic systems in 2025. Appears to focus on computer vision and ML — different domain.

**Cole Medin JSNation US 2025 Talk — "Advanced Claude Code Techniques: Agentic Engineering With Context Driven Development"**: Confirmed at JSNation US 2025. URL not pinned via search. This is a conference talk, not a standalone YouTube upload. If it is available on YouTube (JSNation typically uploads), it *would* score well for Week 4:
- Recency: 9/10 (JSNation US 2025, post-Claude Code 2.0)
- Accuracy: 8/10 (Cole's GitHub cross-validates claims; conference talks are vetted)
- Longevity: 9/10 (context engineering principles are tool-agnostic)
- Depth: 8/10 (conference talk → 30–45 min with real demonstrations)
- **RECOMMENDED ACTION**: Search YouTube for "Cole Medin JSNation 2025 Advanced Claude Code" or "JSNation US 2025 agentic engineering" to find the conference recording

**Spec-Driven Development Videos**: Multiple blog posts, GitHub repos, and written guides confirmed this is an active 2025/2026 topic (github.com/Pimzino/claude-code-spec-workflow, heeki.medium.com, alexop.dev). But no YouTube video from an independent creator was found that specifically covers spec-driven development with Claude Code at engineering depth. This is a **research gap** that likely reflects the topic's recency.

**RECOMMENDED SUPPLEMENTARY SEARCH for Week 4** (not executed in this research pass):
```
youtube "claude code" "spec driven development" OR "spec-first" 2025 2026
youtube "claude code" "production" "testing" "evals" 2025 engineer
youtube "claude code" agent testing "CI CD" 2025
```

---

## VIDEOS THAT WERE RESEARCHED BUT DISQUALIFIED

### Disqualification Log

---

**D-01: Simon Willison General Claude Code Content**
- Channel: simonwillison.net / @simonw
- Why researched: Willison is the most technically accurate Claude Code commentator online
- Why no additional videos found: Willison primarily publishes written content (blog posts, newsletters); the October 2025 video is his only confirmed standalone YouTube video on Claude Code
- Status: Only Video 1.1 applies; his blog posts (simonwillison.net/tags/claude-code/) are curriculum resources but not videos

---

**D-02: Matt Wolfe / Future Tools**
- Channel: @mreflow / Future Tools
- Why researched: Large audience, covers Claude Code
- Disqualification reason: No specific Claude Code video found covering curriculum topics at sufficient depth. Matt Wolfe's content is confirmed to be broad-accessibility AI news rather than engineering practice. No video cleared ≥7/10 on Depth for any curriculum week. His Depth ceiling appears to be approximately 5/10 for this curriculum's requirements.

---

**D-03: Nicholas Renotte**
- Why researched: Listed in prompt as potential source
- Disqualification reason: No Claude Code, MCP, or agentic systems content found for 2025. Domain appears to be computer vision and general ML. No video to evaluate.

---

**D-04: "Unconventional Coding" Channel**
- Why researched: Listed in prompt as potential source
- Disqualification reason: No videos found matching Claude Code or MCP content from this channel. The search for "unconventional coding claude code MCP 2025 youtube" returned no channel-attributed results. Channel may not have covered this topic in 2025.

---

**D-05: Prompt Engineering Channel (@PromptEngineering)**
- Why researched: Listed in prompt as potential source for MCP content
- Disqualification reason: Searches for this channel returned only MCP documentation and YouTube MCP server integrations — not videos from a "Prompt Engineering" creator channel. No attributable videos found.

---

**D-06: Fireship — Any Other Claude Code Videos**
- Disqualification reason: Fireship's MCP video (Video 2.1) is included. Fireship's format (8–10 min concept intro) is appropriate for Week 2 orientation but not Week 3/4 depth requirements. No other Fireship Claude Code content surfaced in searches that would add curriculum value beyond Video 2.1.

---

**D-07: IndyDevDan — "The Claude Code Feature Senior Engineers KEEP MISSING" (January 19, 2026)**
- Why found: Appeared in IndyDevDan video list alongside the hooks video
- Disqualification reason: URL not confirmed; content description too vague to score; January 2026 date means it may cover Claude Code 2.0+ features not yet stabilized in curriculum planning. Recommend revisiting when URL is confirmed. Could be relevant to Week 1 or Week 3 depending on which "feature" is covered.

---

**D-08: IndyDevDan — "AGENT THREADS: How to SHIP like Boris Cherny. Ralph Wiggum in Claude Code" (January 12, 2026)**
- Why found: Appeared in IndyDevDan video list
- Disqualification reason: "Ralph Wiggum" appears to be a reference to a user workflow pattern published by Boris Cherny (Claude Code creator); January 2026; URL not confirmed; curriculum relevance uncertain without viewing. "Agent threads" could be Week 3 material. Recommend URL verification and viewing before curriculum placement.

---

**D-09: All About AI — "Can You Run a YouTube Channel with 7 MCP Servers and Claude Code?"**
- Why found: Class Central listing alongside Video 2.2 and 2.3
- Disqualification reason: Topic (YouTube channel automation with MCP) is a novelty use case, not a curriculum-relevant MCP architecture pattern. The technical content is likely shallow for Week 2 requirements. Depth likely ≤6/10. Not relevant to curriculum learning objectives.

---

**D-10: David Ondrej — "Build Everything with AI Agents: Here's How"**
- Why found: X/Twitter video (ytscribe.com transcript reference)
- Disqualification reason: Published as Twitter video, not YouTube; content appears to be a general AI agents overview, not Claude Code-specific engineering. No URL confirmed for YouTube.

---

## SUMMARY TABLE

| Video ID | Title (Abbreviated) | Channel | Week | Avg Score | URL Status |
|----------|---------------------|---------|------|-----------|------------|
| 1.1 | Building terminal session sharing tool | Simon Willison | 1 | 8.25/10 | CONFIRMED |
| 1.2 | Context Engineering 101: PRP Strategy | Cole Medin | 1 | 8.5/10 | UNVERIFIED |
| 1.3 | 27-Min Masterclass Condensation | David Ondrej | 1 | 7.5/10 COND | UNVERIFIED |
| 2.1 | I gave Claude root access (MCP explained) | Fireship | 2 | 7.25/10 | CONFIRMED |
| 2.2 | Claude Code + Context7 MCP Game Changer | All About AI | 2 | 7.5/10 COND | UNVERIFIED |
| 2.3 | Parallel Coding with Claude Code + Cursor MCP | All About AI | 2 | 7.0/10 COND | UNVERIFIED |
| 3.1 | I'm HOOKED on Claude Code Hooks | IndyDevDan | 3 | 8.75/10 | CONFIRMED |
| 3.2 | Infinite Agentic Coding GLITCH | IndyDevDan | 3 | 8.0/10 | CONFIRMED |
| 4.x | **NO PASSING VIDEO FOUND** | — | 4 | — | — |

**COND = Conditional include; requires accuracy verification before assignment**

---

## RECOMMENDED NEXT STEPS

### Immediate Actions (Before Curriculum Finalization)

1. **Verify Fireship MCP video (2.1) for primitive count and transport accuracy**: Watch the video and confirm (a) three primitives named correctly, (b) no SSE presented as current remote transport. This is the single most important verification step.

2. **Find Cole Medin "Context Engineering 101" YouTube URL**: Search `youtube.com/@ColeMedin` directly; posted July 25, 2025. Confirm duration. Score may rise once direct content review is possible.

3. **Find and verify All About AI URLs (2.2, 2.3)**: Search YouTube for "All About AI Context7 MCP" and "All About AI parallel coding Claude Code Cursor". Watch 5 minutes each to verify MCP accuracy.

4. **Search for Week 4 video**: The most significant research gap is a production/testing/spec-driven-development video. Recommended searches:
   - YouTube: `"claude code" "spec driven development" 2025 2026`
   - YouTube: `"claude code" agent evals testing production 2025`
   - YouTube: `cole medin JSNation 2025` (conference talk may be uploaded)
   - YouTube: `IndyDevDan "claude code" production deployment 2025`

5. **Verify David Ondrej (1.3) accuracy**: Watch first 5 minutes; verify CLAUDE.md framing and MCP primitive count before conditional include becomes full include.

### Channel Monitoring (Ongoing)

These channels are confirmed Claude Code engineering content producers with output that may include future Week 4 candidates:

| Channel | Why Monitor | Watch For |
|---------|-------------|-----------|
| IndyDevDan (@IndyDevDan) | Confirmed engineering depth; January 2026 videos unverified | "Agent threads," Week 4 production topics |
| Cole Medin (@ColeMedin) | Growing Claude Code library; PRP framework | Production deployment, evaluation videos |
| Simon Willison (simonwillison.net) | Highest accuracy; rare videos | Any new Claude Code video |
| All About AI | Multiple MCP videos; accuracy uncertain | MCP server build tutorials |

---

## CREATOR PROFILES — Calibration Notes for Instructors

**Simon Willison** — Highest accuracy ceiling of any creator researched. Co-creator of Django, creator of Datasette. Known for careful technical verification and public corrections when wrong. His blog (simonwillison.net/tags/claude-code/) should be considered required practitioner reading alongside any videos. One confirmed YouTube video to date.

**IndyDevDan (Dan, @disler on GitHub)** — Production practitioner; builds real observability systems alongside YouTube content. Every video has a companion GitHub repo (fully open source) that cross-validates claims. Strong signal-to-noise ratio. Positioned as the curriculum's primary "advanced practitioner" voice for Week 3.

**Cole Medin** — AI educator and consultant; 175K+ subscribers; produces at scale but with above-average depth. PRP framework is original and backed by real GitHub implementations. Weaker on production deployment, stronger on context engineering principles. Best for Weeks 1–2.

**Fireship** — Excellent concept orientation, poor for implementation depth. 8–10 minute format is accurate enough for introductions but cannot carry a technical deep-dive. Best used as "Week N opener" before longer practitioner content.

**David Ondrej** — Popular condensation creator (318K subscribers). Quality depends on source material accuracy. Risk: condensations introduce interpretation errors. Use only for orientation, never as technical authority.

**All About AI** — Produces Claude Code + MCP integration tutorials. Multiple Class Central listings suggest structured content. Accuracy less established than the above creators. Conditional inclusion only; requires verification before curriculum use.

---

*Research compiled 2026-03-17. All video URLs marked UNVERIFIED should be confirmed via direct YouTube search before curriculum publication. Accuracy scores reflect aggregated description analysis; final accuracy scoring requires direct video review.*
