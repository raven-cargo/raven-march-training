# Audio Podcast & Course Overview Prompts

---

## Audio Podcast Focus Prompt

### Narrative Arc Design

**The central tension**: Most engineers think agentic AI is "better autocomplete." This course dismantles that belief systematically and replaces it with a new professional identity — agentic AI engineer — that changes how they design, build, and deploy software systems.

**Before state** (what listeners arrive with): Prompt-and-paste muscle memory. They treat the AI as a smarter Stack Overflow: describe problem, receive code block, paste into editor, repeat. The human is the agent. The AI is a sophisticated search engine.

**After state** (what they leave with): The ability to architect, prompt, secure, and ship autonomous pipelines that run without continuous human involvement — PR review agents, incident triage bots, documentation sync workflows, onboarding assistants — running in production, reliably, on their actual tech stack.

**The four narrative chapters** (not twelve modules):

1. **The Disorientation** (Modules 01–03): The paradigm shift lands. Most engineers feel it as vertigo — the AI is doing things, not suggesting things. PRAO loop. "Junior engineer with codebase access." The right mental model is the unlock.

2. **The Craft Layer** (Modules 04–08): Precision prompting (TCEF), the extension infrastructure (MCP), organizational memory (skills/commands), and the meta-level move — using the AI to improve your prompts. This is where engineers build the professional vocabulary that separates amateurs from practitioners.

3. **The Scaling Problem** (Modules 09–10): When one agent isn't enough — but also why most engineers reach for multi-agent too early. Then the dark side: agentic systems can act autonomously in ways that break things, expose secrets, and accept injected instructions from malicious content. Security is not a phase you add later.

4. **The Production Gap** (Modules 11–12): The moment every course fails to address — the demo worked in the lab, the deployment failed in the org. Stack adaptation, CLAUDE.md as institutional memory, observability design, the integrated capstone. The final insight: you're not building a tool. You're deploying a system that will run and evolve without you watching it.

**Climactic insight (final 10 minutes)**: Every concept in the course — PRAO, TCEF, MCP, skills, multi-agent patterns, permissions, stack adaptation — is a component in a single integrated pipeline. The quality of the pipeline is determined by the weakest component, not the strongest. Engineers who master one layer and skip another ship systems that fail in production in exactly the ways they didn't anticipate. The capstone forces the integration: design the whole thing at once, before you build any of it.

**Three "aha moment" beats** to engineer into the conversation:
- **Aha 1** (early): "The agent isn't writing suggestions for you to act on. It's acting. You've gone from author to director — and that's a bigger shift than it sounds."
- **Aha 2** (midpoint): "A skill file is literally institutional memory. The team's conventions, the architectural decisions, the things you'd have to explain to a new hire — encoded once, loaded on every session. Your agent stops forgetting."
- **Aha 3** (final chapter): "The demo-to-deployment gap isn't a technology gap. It's a specificity gap. Generic patterns fail because your codebase isn't generic. The last layer of the course is making everything you've built actually fit where you work."

---

### Focus Prompt (pass to NotebookLM audio_overview_create)

**Format**: deep_dive
**Target runtime**: 40–50 minutes
**Style**: Two hosts — one acts as the curious, analytically sharp practitioner asking the right questions; the other is the course architect who has seen the pattern repeat across dozens of engineering teams. Neither is a professor. Both are practitioners.

---

Create a 40–50 minute deep dive podcast hosted by two voices who talk like engineers who build real systems, not educators reciting content. The episode covers the Agentic AI Engineering course — all 12 modules — as a single coherent journey, not a topic list.

**Open with urgency, not context.** The hook is a provocation: most engineers using AI coding tools in 2025 are using them at 10% of their actual capability, because they never made the mental model shift from assistant to agent. The episode is about that shift — and everything it unlocks once you make it.

**Chapter 1 — The Disorientation (~10 min)**: Start with what engineers feel the first time they watch Claude Code operate: the AI is doing things without being asked step-by-step. It's reading files, running commands, checking output, adjusting. The hosts should name this feeling — it's disorienting because the engineer's role has changed. Introduce the PRAO loop (Perceive, Reason, Act, Observe) not as a definition to recite but as a way to explain what you're watching when an agent runs. Land the right mental model: a junior engineer with codebase access who is competent but needs briefing, who benefits from constraints, whose work you review before shipping. Contrast this with the two failure modes: treating it like smarter autocomplete (under-use) and treating it like a magic box (over-trust). The right role for the human engineer is director, not author, not supervisor.

**Chapter 2 — The Craft (~15 min)**: This is where the tone shifts from conceptual to technical. The hosts dig into the craft layer — why GCCF prompts break down on complex tasks and what TCEF (Task, Context, Examples, Format) does differently. Bring in MCP as the infrastructure that makes agentic systems extensible without custom integration work for every capability — the standard protocol that lets agents talk to any tool, database, or API. Then the insight about skills and commands: every Claude Code session starts fresh. The agent doesn't remember yesterday. Skills and commands are how you solve the stateless session problem — encoding your team's conventions, your architectural decisions, your anti-patterns into files that load on every session. And then the meta-level move: you can use the agent to improve your prompts, generate your skill files, and evaluate failure modes. Meta-prompting is metaprogramming for LLMs. The hosts should pause on this — it's the point where the compounding starts.

**Chapter 3 — The Scaling and Security Double-Header (~10 min)**: Multi-agent systems are seductive and frequently unnecessary. The hosts need to make this point honestly: the most common mistake is reaching for multi-agent architecture because it feels more sophisticated, not because it's technically required. Cover the three legitimate reasons — parallelism, specialization, context isolation — and make the case for the single-agent baseline. Then pivot without softening it: the same properties that make agentic AI powerful (autonomous actions, file system access, tool invocation, external API calls) create a security surface that traditional application security was not designed to address. The agent can read malicious content in a file and treat it as instructions. That's prompt injection. The attack surface is now everything the agent reads, not just the input you typed. Walk through least-privilege permissions, secrets management, and approval gates for irreversible actions — not as a compliance lecture, but as design decisions that distinguish production systems from demos.

**Chapter 4 — The Production Gap (~10 min)**: Name the gap that every AI course skips: the demo worked in the lab, the deployment struggled in the org. The agent doesn't know your team uses Zod not class-validator, that you've banned useEffect for data fetching, that your Go services follow a specific error wrapping convention. Technically correct but organizationally wrong. Explain CLAUDE.md as institutional memory — the file the agent reads at the start of every session that encodes who your team is and how you work. Then bring it all together with the integrated pipeline view from the capstone: trigger, context gathering, decision logic, action scope, output delivery. Five components. Every production pipeline needs all five. The quality of the system is the quality of the weakest component.

**Close on what's buildable tomorrow (~5 min)**: Land on concrete — not "AI will change software development" but specific pipelines engineers could deploy next week: automated PR review agents, documentation sync triggered by a merge to main, incident triage that reads logs and runbooks before paging the on-call engineer, onboarding assistants that give a new hire a personalized codebase walkthrough on day one. The closing beat is not hype — it's craft. These systems work reliably when you've designed all five pipeline components explicitly, secured the permission surface, adapted the prompts to your stack, and built in observability. That's the course. That's the work.

**Tone throughout**: Technical but never jargon-dense. Neither host mansplains or over-qualifies. They disagree occasionally — one host is more skeptical about multi-agent complexity, the other is more willing to defend it. They use concrete examples over abstract descriptions. Appropriate for commute listening: a motivated engineer in headphones who can't take notes, but will remember the three failure modes, the two mental model traps, and the five pipeline components.

---

## Course Overview Slide Deck Focus Prompt

### Focus Prompt (pass to NotebookLM slide_deck_create)

**Target**: 18–22 slides
**Audience**: Software engineers on Day 1, first session, before any lab work
**Purpose**: Give learners the map before they enter the territory

---

Create an 18–22 slide course overview deck for the Agentic AI Engineering 3-Day Intensive. This deck is shown to engineers at the very start of the course — before any labs, before any module content. Its job is to orient them, establish the stakes, and give them a map of where they're going.

**Slide 1 — The provocation**: One question, large text. "What if your AI coding tool could work while you sleep?" Not hype — setup. The course answers this with engineering rigor.

**Slides 2–3 — The three eras**: Walk through the progression from autocomplete (Era 1: Copilot, token suggestion, you act) to assistant (Era 2: ChatGPT, you prompt, you act) to agent (Era 3: Claude Code, the AI acts, you direct). The key distinction: in Eras 1 and 2, the human is the agent. In Era 3, the AI is. This is the paradigm shift the course is built around.

**Slides 4–5 — What "agentic" actually means**: The PRAO loop (Perceive → Reason → Act → Observe) visualized as a cycle. Not a definition — an operational model. What you are watching when an agent runs. The right mental model: junior engineer with codebase access, not magic box, not autocomplete.

**Slides 6–7 — The two failure modes**: Under-use (treating it like smarter autocomplete, missing 90% of capability) and over-trust (handing off work without structure, reviewing nothing, shipping broken output). The course positions engineers in the productive middle: informed directors who understand what the agent is doing and why.

**Slides 8–9 — The 3-day arc**: Day 1 = Foundation (how agents work, how to think, how to prompt). Day 2 = Architecture (MCP infrastructure, skills and commands for organizational memory, meta-prompting for scale). Day 3 = Production (multi-agent patterns, security design, stack adaptation, integrated capstone). Three days, three layers: think → build → ship.

**Slide 10 — The module map**: 12 modules across 3 days. Show the sequence: 01 Paradigm Shift → 02 Claude Code Foundations → 03 Agent Thinking → 04 Prompt Engineering Depth → 05 MCP Architecture → 06 Building MCP Servers → 07 Skills and Commands → 08 Meta-Prompting → 09 Multi-Agent Systems → 10 Security and Sandboxing → 11 Tech Stack Adaptation → 12 Capstone and Production. Each module is a component. The capstone is where all components integrate.

**Slide 11 — The 9 labs**: Nine hands-on labs, one per session, each mapped to a module. Not exercises at the end of a chapter — immersive build experiences throughout. Engineers who finish all 9 labs have built a working agentic pipeline by the end of Day 3.

**Slides 12–13 — What you'll build**: Concrete outputs. By the end of this course, engineers will have: a working CLAUDE.md for their organization, a configured MCP server, at least one production-grade skill file, a multi-agent architecture design, a security permission configuration, and a complete integrated pipeline specification for a real organizational problem. This is a design and engineering course, not a theory course.

**Slides 14–15 — The five pipeline components**: Every production agentic pipeline has five components that must be designed explicitly: Trigger (what starts it), Context Gathering (what the agent perceives), Decision Logic (how it reasons — the TCEF prompt), Action Scope (what it can do — permissions), Output Delivery (where the result goes). This is the integration model the whole course builds toward. Introduce it early so every module lands in the right frame.

**Slides 16–17 — Prerequisites and what to expect**: What engineers need coming in (experience with a programming language, familiarity with a terminal, basic git). What they don't need (prior AI/ML experience, Python specifically, any existing Claude Code usage). What the course is not: a prompt-tricks collection, a ChatGPT tutorial, an AI theory lecture. What it is: a professional engineering curriculum for building systems that run in production.

**Slides 18–19 — The production systems engineers build in the wild**: Showcase four pipeline archetypes that represent immediate organizational value — PR Review Pipeline (triggered by PR open, reviews for security and conventions, posts structured comment), Documentation Sync (triggered by merge to main, updates stale docs, opens PR for review), Incident Triage (triggered by alert, reads logs and runbooks, posts initial triage to Slack), Onboarding Assistant (generates personalized codebase guide for new developers). These exist. Engineers on this course have shipped them.

**Slide 20 — The agenda**: Hour-by-hour schedule across Day 1, Day 2, Day 3. Labs are interleaved with modules, not bolted on at the end. The capstone lab is Day 3 afternoon.

**Closing slide — The mindset shift**: Return to the opening provocation and answer it. Yes — with the right architecture, prompting structure, security controls, and organizational memory, agentic pipelines run reliably without continuous human involvement. The course is the engineering discipline that makes that true. Welcome.

**Tone**: Confident without being evangelical. These are engineers who will rightfully push back on hype. Every claim should be backed by a concrete example or a mechanism. The deck should feel like it was designed by someone who has shipped these systems, not someone who read about them.
