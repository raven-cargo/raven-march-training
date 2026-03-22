# Day 2b Module Multimedia Prompts

> These prompts are designed to be passed verbatim to NotebookLM's `focus_prompt` parameter
> for `video_overview_create` and `slide_deck_create` calls. Each prompt is module-specific
> enough that swapping it into the wrong slot would be immediately obvious.
>
> Source modules: 07-skills-commands.md, 08-meta-prompting.md, 09-multi-agent-systems.md
> Generated: 2026-03-15

---

## Module 07: Skills and Commands

### Video Focus Prompt

Focus EXCLUSIVELY on Module 07: Skills and Commands. Do NOT cover MCP server implementation,
TypeScript SDK, Zod schemas, or tool handler registration — that is Module 06 content.
Do NOT introduce multi-agent orchestration or inter-agent communication — that is Module 09.

This module solves one specific problem: Claude Code has no memory between sessions. Every session
starts fresh. Skills and commands are the engineering solution to that statelessness problem.

Open the video by establishing the stateless session problem concretely. Use this scenario: a
team has established a code review convention — severity levels, blocking vs. non-blocking issue
criteria, a specific output format for findings. Without skills, every engineer re-explains these
conventions every session. Quality is inconsistent. The institutional expertise exists only in
the heads of senior engineers. Skills operationalize that expertise into a versioned file.

Cover these five concepts in this order, each with its own whiteboard segment:

1. **Skill file anatomy — YAML frontmatter + skill body**
   Draw a two-box diagram on the whiteboard: the top box is YAML frontmatter (four fields: name,
   description, version, triggers) and the bottom box is the skill body (four sections: Role,
   Procedure, Example, Anti-patterns). Highlight the triggers field with a WARNING label: triggers
   are a LUXOR project convention — they are NOT parsed by the Claude Code runtime for automatic
   activation. They are documentation for human developers and orchestration systems, not a native
   feature. This distinction must be stated explicitly in the video.

2. **The TCEF skill body quality spectrum**
   Draw a horizontal spectrum line labeled "Beginning" on the left and "Distinguished" on the
   right. Place four cards along the spectrum: (a) vague goal statement, (b) procedure with
   missing specifics, (c) complete elements without refinement, (d) complete briefing with
   expert-level detail. Walk through a real security review skill body at each level, showing
   exactly what is missing at each stage. Apply the "Senior Engineer on Day One" test: a complete
   skill body should be sufficient to brief a new hire without them needing to ask clarifying
   questions.

3. **Skill location hierarchy: global vs. project**
   Draw a directory tree showing `~/.claude/skills/` (global, available in every session) and
   `.claude/skills/` (project-level, takes precedence over global for the same skill name).
   Contrast this with CLAUDE.md: skills answer "how do I do X?", CLAUDE.md answers "what is
   this project?" These are complementary, not competing.

4. **Slash commands and the $ARGUMENTS variable**
   Draw the command invocation flow: user types `/security-review src/routes/auth.js` → Claude
   Code reads `.claude/commands/security-review.md` → `$ARGUMENTS` is substituted with
   `src/routes/auth.js` → skill is invoked. Show the reserved command names table (plugin, help,
   clear, config, mcp) and explain that custom commands in `.claude/commands/` shadow built-ins —
   this is a real production pitfall that has broken teams' plugin access.

5. **Skill composition: sequential, conditional, and parallel patterns**
   Draw three separate diagrams:
   - Pipeline: Skill A → output → Skill B → output → Skill C (the `ship-feature` command example)
   - Router: input → evaluation → branch to different skills based on file path or content type
   - Parallel: same input → three simultaneous agents each using a different skill → merge findings
   For the parallel pattern, note the trade-off explicitly: parallel composition increases token
   usage significantly. Use it when analytical quality gain justifies the cost.

Whiteboard Diagram 1 — Skill Invocation Flow: Draw the flowchart from the module — "User Message
→ Skill applies? → Load Skill from ~/.claude/skills/ → Inject into Context Window → Execute with
skill protocol → Output." Show the "Reply directly" branch for when no skill applies. Label the
catalog as "global + project skills."

Whiteboard Diagram 2 — Composition Pattern Comparison: Side-by-side three boxes showing
Sequential Pipeline, Conditional Router, and Parallel Multi-Expert. Under each box, write the
condition for when to use it: sequential when order matters, conditional when routing logic is
evaluable, parallel when analyses are truly independent and time matters.

Duration guidance: 15–22 minutes. Spend approximately 4 minutes on skill anatomy, 4 minutes on
the quality spectrum, 3 minutes on location hierarchy and CLAUDE.md contrast, 3 minutes on slash
commands, and 4–8 minutes on composition patterns.

Exclusion clause: Do not discuss how MCP tools are implemented, how tool handlers are registered,
or how the TypeScript SDK is used to build servers. Do not discuss orchestrators dispatching
agents via structured JSON — that belongs to Module 09.

---

### Slide Deck Focus Prompt

Focus EXCLUSIVELY on Module 07: Skills and Commands. Target slide count: 14–16 slides.
Do NOT include slides about TypeScript, Zod, MCP server implementation, or inter-agent JSON
communication schemas.

**Slide 1 — Opening Hook: The Stateless Session Problem**
Visual: a clock resetting to zero at the top of each session. Headline: "Every Claude Code
session starts with amnesia." Body text: describe the code review scenario — conventions
established yesterday, forgotten today. No memory. No consistency. This is the problem skills
solve.

**Slide 2 — What Skills Are**
One-sentence definition: "A skill file is a versioned, reusable briefing that encodes expertise
in a form that survives session boundaries." Three bullet points: (1) stored as YAML/markdown
files in well-known locations, (2) loaded into context when relevant, (3) answers "how do I do
X?" (contrasted with CLAUDE.md which answers "what is this project?")

**Slide 3 — Skill File Anatomy: Frontmatter**
Code slide showing the four YAML frontmatter fields: name, description, version, triggers. Call
out the triggers field with a colored WARNING box: "LUXOR convention — NOT a native Claude Code
activation mechanism. Triggers are documentation, not runtime behavior." This is a common
misconception that must be corrected on its own slide.

**Slide 4 — Skill File Anatomy: Skill Body**
Code/diagram slide showing the four required sections of a skill body: Role, Procedure, Example,
Anti-patterns. Sub-label each: Role = "who Claude is", Procedure = "systematic steps",
Example = "realistic input + complete output", Anti-patterns = "pre-emptive constraint spec."

**Slide 5 — The TCEF Quality Spectrum**
Horizontal spectrum diagram from Beginning to Distinguished, with four labeled stops. One column
per level showing what is present and what is missing. The "Distinguished" column should show all
four sections fully populated. Apply the "Senior Engineer on Day One" test as a callout.

**Slide 6 — What Makes Anti-patterns Non-Optional**
One focused slide on anti-patterns as the most commonly skipped section. Show a before (no
anti-patterns) and after (three explicit anti-patterns from the security review example). Frame:
"Without explicit anti-patterns, Claude makes the most predictable mistakes for this task type."

**Slide 7 — Skill Location Hierarchy**
Directory tree diagram: `~/.claude/skills/` (global) and `.claude/skills/` (project-level).
Rule: project-level takes precedence for same-named skills. One-line contrast with CLAUDE.md.

**Slide 8 — Slash Commands: Structure and Invocation**
Code slide showing a minimal command file (no YAML frontmatter, plain markdown). Show the
invocation: `/security-review src/routes/auth.js`. Show how `$ARGUMENTS` is substituted.
Callout: "Commands are the invocation interface; skills are the expertise definition."

**Slide 9 — Reserved Command Names: A Pitfall**
Table slide showing five reserved names (plugin, help, clear, config, mcp) and their built-in
functions. Warning framing: "Creating `/plugin.md` shadows native plugin management — teams have
broken their plugin marketplace access this way."

**Slide 10 — When to Use a Command vs. Direct Skill Invocation**
Two-column slide: Command (when skill is used frequently, invocation pattern is consistent, want
discoverability via autocomplete) vs. Direct Invocation (infrequent use, one step in a
multi-skill workflow, orchestrating from another skill body).

**Slide 11 — Composition Pattern 1: Sequential Pipeline**
Diagram: Skill A → Skill B → Skill C with arrows and labels. Use the `ship-feature` command
as the concrete example: code-review-security → git-commit → changelog-entry. Label the
hand-off conditions (stop on Critical findings).

**Slide 12 — Composition Pattern 2: Conditional Router**
Diagram: input → evaluation box → three branches to different skills based on file path or
content type. Use the `review` command router example. Label when this is appropriate: "when
routing logic is evaluable from the input."

**Slide 13 — Composition Pattern 3: Parallel Multi-Expert**
Diagram: same input → three simultaneous agents → merge findings. Label the trade-off:
"Parallel composition increases token usage significantly. Use when analytical independence and
time savings justify the cost."

**Slide 14 — Decision Framework: Skill vs. One-Off Prompt**
Table slide: five "create a skill" conditions (used more than twice, multiple team members need
it, requires consistent domain expertise, systematic procedure must be followed, re-used as a
template) vs. three "one-off prompt" conditions (won't recur, simple enough for inline TCEF,
highly context-specific to one conversation). Callout: "Rough rule: expected to use it more
than three times? Make it a skill."

**Slide 15 — Module Summary + Lab Preview**
Three bullet takeaways: (1) Skills solve the stateless session problem by encoding expertise as
versioned files, (2) Slash commands are the parameterized invocation interface, (3) Composition
patterns — sequential, conditional, parallel — multiply the value of individual skills. Lab
preview: "Lab 08 — write a complete `api-contract-review` skill and chain it with a
`generate-tests` skill in a two-skill pipeline command."

---

## Module 08: Meta-Prompting

### Video Focus Prompt

Focus EXCLUSIVELY on Module 08: Meta-Prompting. Do NOT cover YAML skill file anatomy or the
four sections of a skill body — that is Module 07. Do NOT discuss orchestrator/sub-agent
patterns or inter-agent JSON schemas — that is Module 09.

This module is about using LLMs to generate, evaluate, and improve other prompts. Frame it
from the first sentence as a scaling solution: the direct approach — write a prompt manually,
test it, revise it — does not scale to building a library of dozens of skill files. Meta-
prompting automates or accelerates the prompt development process itself.

Establish the core analogy immediately and return to it throughout the video: meta-prompting is
to prompting what metaprogramming is to programming. A program computes a result from data.
A metaprogram generates or transforms programs. A prompt directs an LLM to produce a result.
A meta-prompt directs an LLM to generate or transform prompts.

Cover these five concepts in this order:

1. **The three applications of meta-prompting**
   Write three labels on the whiteboard: Prompt Generation, Prompt Evaluation, Prompt
   Improvement. Draw arrows connecting them in a loop: generate → evaluate → improve →
   re-evaluate. Explain each application in one sentence. Then state clearly: these can be
   used independently or chained into a semi-automated loop.

2. **Prompt generation: the basic meta-prompt pattern**
   Show the minimal meta-prompt structure on screen: Task description, Target audience,
   Constraints, Output format, TCEF structure definition. Emphasize: the meta-prompt itself
   is a TCEF prompt. This is self-referential and worth pausing on. Walk through the
   bootstrapping pattern: when you lack domain expertise in the target domain, use meta-
   prompting to generate a first batch, review and select the best, then use the best as
   examples in the next iteration. Show the database performance review example as a concrete
   instance of bootstrapping across five task types simultaneously.

3. **Prompt evaluation: the failure mode finding pattern**
   Draw the adversarial frame on the whiteboard: "Given this prompt, what will go wrong?"
   Show the evaluation meta-prompt structure: for each issue found, specify (a) the type of
   failure, (b) what a model would do incorrectly as a result, (c) the specific text change
   that fixes it. Then show the criteria-based scorecard approach: six criteria, each rated
   PASS / PARTIAL / FAIL with specific evidence from the skill text. Contrast: adversarial
   evaluation surfaces surprise failures; criteria-based evaluation ensures systematic coverage.

4. **The generate → evaluate → improve loop**
   Draw the four-step loop as a whiteboard cycle: Generate (claude -p with meta-prompt template)
   → Evaluate (claude -p with evaluation criteria + v1 prompt) → Improve (claude -p applying
   FAIL corrections) → Re-evaluate. State the convergence signal: the loop typically converges
   in two to three iterations. Human role in the loop: review the final evaluation to confirm
   no FAIL criteria remain and that improvements didn't introduce new problems.

5. **Confabulation risk — the non-negotiable limit of meta-prompting**
   This concept must get dedicated time and must not be minimized. When Claude generates a
   prompt for a technical domain, it may include technically incorrect assertions that sound
   authoritative. An incorrectly authored security review skill references outdated vulnerability
   taxonomies. But a meta-prompted security review skill may reference them with even more
   apparent authority — because the generation process is fluent and detailed. The risk is
   compounded at the meta level: if the generated prompt contains incorrect guidance, that
   incorrectness propagates into every task the skill is applied to.

   State the four mitigation strategies explicitly: (1) always have a domain expert review
   meta-prompted prompts before adding them to production skill libraries, (2) test against
   known examples before trusting for new cases, (3) date-stamp versions and periodically
   re-validate, (4) mark prompts with their generation method. State the two prohibitions:
   do not trust technical assertions without verification; do not add to high-stakes domain
   libraries (security, compliance, safety) without expert sign-off.

Whiteboard Diagram 1 — The Meta-Prompting Loop: Draw a cycle with four nodes: Generate →
Evaluate → Improve → Re-evaluate → (back to Evaluate). In the center of the cycle, write
"Human Judgment Layer." Draw three arrows from the center to the outer ring labeled "Domain
validation," "Context grounding," "Quality judgment." The diagram's message: meta-prompting
generates candidates; engineers select, evaluate, and refine.

Whiteboard Diagram 2 — When to Use Meta-Prompting vs. Direct Prompting: Draw a two-column
table. Left column header: "Meta-prompting provides leverage." Right column header: "Direct
prompting is better." Left: building a library of skill files, maintaining consistency across
team-authored prompts, bootstrapping prompts in a new domain. Right: simple one-sentence tasks
with obvious output format, tasks requiring deep tacit knowledge that cannot be captured in
text, novel task types with no analogues in training data.

Duration guidance: 15–22 minutes. Spend approximately 2 minutes on the metaprogramming analogy,
5 minutes on prompt generation (basic pattern + bootstrapping), 5 minutes on prompt evaluation
(adversarial + criteria-based), 3 minutes on the automated loop, and 5 minutes on confabulation
risk and the human judgment layer.

Exclusion clause: Do not cover how skill files are structured (YAML frontmatter, Role/Procedure/
Example/Anti-patterns sections) — that is Module 07. Do not introduce DSPy as a framework to
use in this course — reference it as a related academic approach but do not present it as
something students will implement. Do not discuss prompt injection as a security vector — that
is Module 10.

---

### Slide Deck Focus Prompt

Focus EXCLUSIVELY on Module 08: Meta-Prompting. Target slide count: 13–16 slides. Do NOT
include slides about skill file YAML structure, multi-agent orchestration, or prompt injection
attacks.

**Slide 1 — Opening Hook: The Scaling Problem**
Visual: a single engineer manually writing prompts on one side; a library of fifty skill files
on the other side, with a question mark between them. Headline: "Manual prompt development does
not scale." Body: the direct approach — write, test, revise — works for one prompt. A skill
library of fifty requires a different strategy.

**Slide 2 — What Meta-Prompting Is**
The metaprogramming analogy, displayed as two parallel rows:
- Row 1: Program → computes result from data
- Row 2: Metaprogram → generates or transforms programs
- Row 3: Prompt → directs LLM to produce a result
- Row 4: Meta-prompt → directs LLM to generate or transform prompts
One-sentence definition at the bottom: "Meta-prompting is using an LLM to generate, evaluate,
or improve other prompts."

**Slide 3 — Three Applications**
Diagram of the generate → evaluate → improve loop, with all three labeled as independent
applications that can also be chained. One sentence per application. Small callout: "These can
be used independently or combined into a semi-automated pipeline."

**Slide 4 — Prompt Generation: The Basic Pattern**
Code slide showing the minimal meta-prompt structure (Task description, Target audience,
Constraints, Output format, TCEF structure definition). Callout: "Notice: the meta-prompt
is itself a TCEF prompt. Self-referential by design."

**Slide 5 — Template Generation: Scale to Five at Once**
Show the database performance review example as a concrete instance of generating five prompts
in one invocation (index coverage analysis, N+1 detection, query plan analysis, connection pool
review, slow query log review). Key point: "Output is a starting point — 70-80% of what a
manually authored skill would contain. The remaining 20-30% requires domain expert review."

**Slide 6 — The Bootstrapping Pattern**
Step-by-step diagram: (1) Write high-quality meta-prompt that understands TCEF, (2) Provide
domain description + task list, (3) Generate first batch, (4) Review, select, refine best ones,
(5) Use best ones as examples in next iteration. Callout: "Particularly valuable when you lack
deep expertise in the target domain."

**Slide 7 — Prompt Evaluation: The Adversarial Frame**
Show the evaluation meta-prompt structure. Bold the key instruction: "Given this prompt, what
will go wrong?" Three-column output format: (1) Type of failure, (2) What model does incorrectly
as a result, (3) Specific text change that fixes it. Callout: "The evaluating LLM can miss
failures and fabricate issues — but it consistently surfaces real issues that manual review
misses."

**Slide 8 — Criteria-Based Evaluation: The Scorecard**
Table slide showing the six evaluation criteria (Role precision, Procedure completeness, Example
quality, Anti-pattern specificity, Format specification, Severity taxonomy) with three columns:
Criterion, PASS/PARTIAL/FAIL, Specific evidence from skill text. One sentence at bottom:
"Criteria-based evaluation ensures systematic coverage; adversarial evaluation surfaces surprises.
Use both."

**Slide 9 — The Automated Generate → Evaluate → Improve Loop**
Code slide showing the four-step bash pipeline from the module (generate, evaluate, improve,
re-evaluate). Label convergence signal: "Typically converges in two to three iterations."
Label human checkpoint: "Human reviews final evaluation — confirms no FAIL criteria remain."

**Slide 10 — Building a Skill Library at Scale**
Two-stage process: Stage 1 (use meta-prompt to generate skill inventory organized by domain,
with name, description, frequency, beneficiary) and Stage 2 (use skill generation meta-prompt
for each inventory item). Callout: "A library of ten well-crafted skills is more valuable than
forty poorly crafted ones. Prioritize by frequency of use."

**Slide 11 — Confabulation Risk: The Critical Limit**
Full dedicated slide. Headline: "Meta-prompted prompts carry compounded confabulation risk."
Two-level explanation: Level 1 — a meta-prompted security skill may reference outdated
vulnerability taxonomies with apparent authority. Level 2 — if the generated prompt contains
incorrect guidance, that incorrectness propagates into every task the skill is applied to.
Use a bold callout: "The fluency of generation is not evidence of correctness."

**Slide 12 — Confabulation Mitigation: Four Rules**
Checklist slide with four green checkmarks and two red X marks:
  Checkmarks: (1) domain expert reviews before adding to production library,
  (2) test against known examples before trusting for new cases, (3) date-stamp versions and
  periodically re-validate, (4) mark prompts with generation method in a comment.
  X marks: (1) do not trust technical assertions without verification, (2) do not add to
  security/compliance/safety libraries without expert sign-off.

**Slide 13 — The Human Judgment Layer**
Diagram: meta-prompting loop on the outside; "Human Engineer" box in the center with four
outbound labels: Domain Validation, Context Grounding, Quality Judgment, Iteration Direction.
One-sentence frame: "Meta-prompting shifts labor from generation to evaluation and selection —
but never removes the engineer from the loop."

**Slide 14 — When to Use Meta-Prompting vs. Direct Prompting**
Two-column decision table:
- Meta-prompting: building a skill library, team consistency enforcement, bootstrapping in new
  domain, generating multiple prompt variants simultaneously.
- Direct prompting: simple one-sentence tasks, tasks requiring deep tacit expertise, novel task
  types with no training analogues, when evaluation is the bottleneck.

**Slide 15 — When to Stop Iterating**
Three convergence signals: (1) evaluation meta-prompt returns all PASS, (2) domain expert
confirms technical accuracy, (3) three successive improvements produce no FAIL corrections.
Callout: "Diminishing returns appear when evaluation produces only stylistic suggestions rather
than substantive corrections. At that point, testing against real cases is more valuable."

**Slide 16 — Module Summary + Lab Preview**
Three bullet takeaways: (1) Meta-prompting is metaprogramming for prompts — generate, evaluate,
improve, (2) Confabulation risk is compounded at the meta level — human review is non-negotiable,
(3) The human engineer shifts from generation to evaluation — the loop is semi-automated, not
autonomous. Lab preview: "Lab 09 — generate a `database-query-review` skill using a provided
meta-prompt, run evaluation criteria against it, apply all FAIL corrections, then compare to
a manually authored reference skill on three real database code samples."

---

## Module 09: Multi-Agent Systems

### Video Focus Prompt

Focus EXCLUSIVELY on Module 09: Multi-Agent Systems. Do NOT cover skill file YAML anatomy,
slash command invocation, or the TCEF quality spectrum — that is Module 07. Do NOT cover prompt
generation, the generate/evaluate/improve loop, or confabulation in meta-prompted prompts —
that is Module 08. Do NOT cover permission models, prompt injection, or sandbox policy — that
is Module 10.

This module has a counterintuitive opening: the most important lesson is when NOT to use
multi-agent systems. Begin the video with this framing. Most engineers who reach for multi-
agent do so because it seems more sophisticated, not because it is technically necessary.
The module's first job is to calibrate that instinct.

Cover these five concepts with the indicated whiteboard segments:

1. **The three legitimate motivations for multi-agent — in descending order of how often they
   actually apply**
   Write three labels on the board numbered 1, 2, 3: Parallelism, Specialization, Context
   Isolation. For each, write the exact condition under which it is a valid justification.
   Parallelism: subtasks share no mutable state, each can be fully specified before any runs,
   aggregation is straightforward. Specialization: different subtasks genuinely benefit from
   different system prompts or MCP tool configurations. Context isolation: input physically
   exceeds one context window (note: context windows have grown — this is less common than it
   was). Then write on the board: "If you cannot name which of these three applies, you don't
   have a multi-agent problem."

2. **The real costs of multi-agent — three specific costs, not vague warnings**
   Coordination overhead: for tasks that take 30 seconds in a single agent, multi-agent
   coordination may add 15–20 seconds — a 50% penalty before any benefit. Aggregation
   complexity: grows nonlinearly with agent count — two agents means one aggregation step;
   five agents means four potential conflicts, five schema variations, and combinatorial partial
   failure modes. Debugging difficulty: when a multi-agent system produces wrong results, the
   error may have originated in any sub-agent, been compounded at aggregation, and been masked
   by a partial-result-acceptance policy. Reproducing multi-agent failures reliably is
   genuinely hard.

3. **The four-question decision framework**
   Draw a decision flowchart with four gates:
   - Gate 1: Can a single agent do this? (Try a single-agent sketch for 10 minutes first.)
   - Gate 2: Are the subtasks actually independent? (Define: independent means B does not need
     A's output, A and B do not modify the same files, all inputs can be fully specified before
     any agent runs.)
   - Gate 3: Is the aggregation strategy clear? (Design aggregation before designing agents.)
   - Gate 4: Does the benefit outweigh the coordination cost? (Estimate wall-clock time saved
     vs. engineering + debugging time.)
   Label each gate: if the answer is no at any gate, do not proceed. Only a clear affirmative
   at all four gates justifies multi-agent design.

4. **Orchestrator patterns: fan-out/fan-in, pipeline, and conditional routing**
   Draw three side-by-side diagrams. Fan-out/fan-in: Orchestrator fans to N sub-agents in
   parallel, results aggregate to a single output. Label: "The aggregation step is the hardest
   part — engineers who hand-wave fan-in discover this in production." Pipeline: Agent A →
   Agent B → Agent C sequentially. Label: "Interfaces between stages are contracts — treat them
   with the rigor of public APIs." Conditional routing: Classifier agent → routes to different
   specialist based on input type. Label: "Routing logic is itself a failure point — validate
   that specialist output is consistent with the routing decision."

5. **Inter-agent communication: the mandatory structured JSON schema with exactly five fields**
   This is the most technically precise section. Write on the board exactly five field names
   and their meanings. DO NOT add extra fields or combine fields:
   - `status`: one of "success", "error", or "partial" — first field the orchestrator checks;
     "partial" means completed some but not all assigned scope; never fold partial into success.
   - `checked_scope`: array of resource identifiers actually examined — DISTINCT from assigned
     scope; turns output from "findings" into "findings plus coverage."
   - `findings`: array of finding objects, empty array `[]` is valid; this field must never be
     absent — absence is ambiguous between "no findings" and "agent failed to populate it."
   - `error`: string describing failure or null if success; must be specific ("Token limit
     exceeded at src/services/large-service.ts after 2,300 lines"), not generic ("An error
     occurred").
   - `metadata`: freeform object for domain-specific supplemental info: agent version, model,
     time elapsed, cost estimate, confidence score.
   State clearly: structured JSON is NOT optional. It is the contract between agents. Prose
   communication creates parsing ambiguity that compounds at every aggregation step.

Whiteboard Diagram 1 — The Three Orchestrator Patterns: Draw three boxes side by side labeled
"Fan-Out/Fan-In," "Pipeline," and "Conditional Routing." Each box should contain a simple
ASCII-style flow showing the shape of the pattern. Under Fan-Out/Fan-In, write the condition:
"Subtasks are independent, speed matters." Under Pipeline, write: "Each stage needs the full
output of the previous stage." Under Conditional Routing, write: "Input type determines which
specialist is needed."

Whiteboard Diagram 2 — Inter-Agent JSON Schema (the five mandatory fields): Draw a JSON object
on the board with exactly five top-level keys. Annotate each key with a one-line description of
its role. Highlight `checked_scope` with a distinct color and the label: "Provenance — what was
actually examined, not just what was assigned." Highlight `status: "partial"` as distinct from
`"error"` — partial means some work was done; error means the agent could not complete any of
its work.

Duration guidance: 15–22 minutes. Spend approximately 4 minutes on motivations and costs,
4 minutes on the four-question decision framework, 5 minutes on the three orchestrator patterns,
5 minutes on the inter-agent JSON schema and the five mandatory fields, and 3 minutes on failure
modes and recovery policies.

Exclusion clause: Do not explain how to write YAML skill files, how skill triggers work, or how
slash commands are structured — that is Module 07. Do not discuss the Claude Code permission
model, how to configure `settings.json` allow/deny lists, or how to defend against prompt
injection — that is Module 10.

---

### Slide Deck Focus Prompt

Focus EXCLUSIVELY on Module 09: Multi-Agent Systems. Target slide count: 14–18 slides. Do NOT
include slides about YAML frontmatter, meta-prompt generation loops, or security sandboxing.

**Slide 1 — Opening Hook: The Sophistication Trap**
Visual: an elaborate multi-agent architecture diagram on one side, a single well-prompted agent
on the other side. Headline: "More agents is not more better." Body: "Multi-agent systems are
not inherently better than single-agent systems. They are a tool for a specific class of problems.
Before designing one, you need to know which problem you're actually solving."

**Slide 2 — The Three Legitimate Motivations**
Three-panel slide, numbered 1, 2, 3. Each panel: label (Parallelism / Specialization / Context
Isolation) + exact condition that makes it valid. Under Context Isolation, add a note: "Context
windows have grown substantially — many situations that required this in 2023 can be handled in
a single context today." Footer: "If you cannot name which of these three applies to your
situation, you do not have a multi-agent problem."

**Slide 3 — The Real Costs (Quantified)**
Three-panel slide:
- Coordination overhead: "For a 30-second single-agent task, multi-agent coordination may add
  15–20 seconds — a 50% penalty before any benefit."
- Aggregation complexity: "Grows nonlinearly. Two agents = one aggregation step. Five agents =
  four potential conflicts, five schema variations, combinatorial partial failure modes."
- Debugging difficulty: "Error may have originated in any sub-agent, been compounded at
  aggregation, been masked by partial-result acceptance. Reproducing multi-agent failures
  reliably is genuinely hard."

**Slide 4 — The Four-Question Decision Framework**
Flowchart diagram with four sequential gates. Each gate shows the yes path (continue) and the
no path (stop, do not use multi-agent). Gate questions: (1) Can a single agent do this? (2) Are
subtasks actually independent? (3) Is the aggregation strategy clear? (4) Does the benefit
outweigh the coordination cost? Callout: "Design the aggregation step BEFORE designing the
sub-agents. If you can't specify aggregation, the decomposition is wrong."

**Slide 5 — What "Actually Independent" Means**
Definition slide. Three necessary conditions for independence, all of which must hold
simultaneously: (1) Subtask B does not need the output of Subtask A to execute. (2) Subtask A
and Subtask B do not modify the same files or data structures. (3) You can fully specify all
inputs to each subtask before any of them runs. Two "not decomposable" failure patterns:
sequential dependencies, shared mutable state.

**Slide 6 — Orchestrator Pattern 1: Fan-Out / Fan-In**
Diagram: Orchestrator → four parallel sub-agents → aggregation step → unified output. Three
responsibilities of the orchestrator labeled: (1) Decompose into correctly scoped sub-task
specs, (2) Dispatch all sub-agents in parallel, (3) Aggregate, validate schemas, resolve
conflicts. Warning callout: "The aggregation step is the hardest part. Engineers who design
the fan-out carefully and hand-wave the fan-in discover this in production."

**Slide 7 — Orchestrator Pattern 2: Pipeline**
Diagram: Agent A → Agent B → Agent C → Agent D sequentially, with labeled interface contracts
between each stage. Key principle: "Each interface between stages is a contract — treat it with
the same rigor as a public API." Warning: "Breaking the output format of stage N without
updating stage N+1 breaks the pipeline." Callout: "Before designing a pipeline, ask: could a
single well-prompted agent perform all transformations in sequence? Often the answer is yes."

**Slide 8 — Orchestrator Pattern 3: Conditional Routing**
Diagram: Classifier agent → three branches based on input type (bug / feature / refactor) →
Synthesis agent. Risk call-out: "The routing logic is itself a failure point. If the classifier
routes incorrectly, the specialist produces plausible-looking output for the wrong task type."
Mitigation: "Build validation into the synthesis stage — check that specialist output is
consistent with the routing decision."

**Slide 9 — Task Decomposition: The Worksheet**
Show the decomposition worksheet fields as a structured template: Task name, Trigger, Scope
boundaries, Proposed subtasks (with inputs/outputs/independence check for each), Independence
matrix, Shared state check, Aggregation strategy, Time comparison. Callout: "If the net benefit
(single-agent time minus multi-agent time minus coordination overhead) is small or negative,
the case for multi-agent is weak regardless of how elegant the architecture looks."

**Slide 10 — Why Structured JSON Is Mandatory**
Two-column contrast slide. Left: a sub-agent returning natural language prose ("The security
review found some potential issues with the authentication module, primarily around token
validation, though the exact scope wasn't entirely clear.") Right: the same information as
structured JSON. Key statement: "Prose communication requires NLP comprehension at every
aggregation step. Structured JSON makes aggregation mechanical rather than interpretive.
Structured JSON is not optional — it is the contract between agents."

**Slide 11 — The Five Mandatory Inter-Agent JSON Fields**
Code slide showing a complete JSON example with exactly five top-level fields. Annotate each:
- `status`: "success" | "error" | "partial" — first field orchestrator checks; "partial" is
  distinct from "error"
- `checked_scope`: array of what was actually examined — provides provenance
- `findings`: array of finding objects; empty array `[]` is valid; never omit this field
- `error`: specific failure description or null — "An error occurred" is not acceptable
- `metadata`: freeform supplemental info for debugging and monitoring
Bold callout: "Exactly five fields. No more, no fewer. Specify this schema before building any
agent."

**Slide 12 — The Provenance Principle**
Dedicated slide on `checked_scope`. Headline: "Absence of a finding is meaningful — but only
if you know the agent actually examined that file." Security audit example: an agent that
reports zero SQL injection vulnerabilities but only checked 60% of the data access layer has
NOT confirmed the absence of SQL injection. It has confirmed absence in 60% of the data access
layer. Callout: "`checked_scope` turns 'findings' into 'findings plus coverage.'"

**Slide 13 — Failure Mode 1: Agent Timeout**
Recovery policy labeled as a two-step rule: Step 1 — retry once with explicit scope reduction
and explicit permission to be partial ("Focus on the highest-priority items first; mark findings
as partial if you cannot complete the full scope."). Step 2 — if timeout recurs, mark as
`"status": "error"` and propagate to final output: "This file requires manual review." Warning:
"Never silently omit the timed-out agent's scope. A confident-looking report that omits
unchecked files is worse than a report that surfaces the gap."

**Slide 14 — Failure Mode 2: Malformed Output**
Recovery policy: Step 1 — retry with schema example embedded directly in prompt ("Your response
must be valid JSON matching exactly this structure..."). Step 2 — if malformed again, treat as
complete failure. Warning: "Attempting to parse partial JSON or extract findings from prose with
regex is fragile and produces unreliable results that are worse than acknowledging the failure."

**Slide 15 — Failure Mode 3: Contradictory Findings**
Show the escalation JSON from the module: contradiction_detected, item, finding_a, finding_b,
escalation_required, recommended_action. Key rule: "Never silently resolve contradictions by
picking one finding. Both were produced by the same model — there is no reliable automated
way to determine which is correct." Policy: escalate to human with both findings surfaced
explicitly. Callout: "This is not a system failure. It is the system working correctly."

**Slide 16 — Do / Don't Summary**
Two-column slide, green checkmarks vs. red X marks. Checkmarks (6 items from the module's
Do/Don't list): start with single agent, design aggregation before sub-agents, require
structured JSON with all five mandatory fields, include checked_scope in every sub-agent
output, escalate contradictory findings to human, validate sub-agent output scope before
accepting. X marks (5 items): don't use multi-agent as substitute for prompt engineering,
don't let sub-agents communicate in prose, don't silently omit timed-out scopes, don't pick
between contradictory findings automatically, don't skip schema versioning.

**Slide 17 — Schema Versioning: Inter-Agent Contracts Are APIs**
Short slide. Show `"schema_version": "2.1"` as a top-level field. Rule: "A breaking change in
a communication schema — removing a field, renaming a field, changing valid status values —
is an API change. Increment major version. Orchestrator must validate schema_version before
processing output and fail clearly — not silently — on unexpected version."

**Slide 18 — Module Summary + Lab Preview**
Three bullet takeaways: (1) Multi-agent has three legitimate motivations — if you can't name
one, you don't need it; (2) Inter-agent communication requires exactly five structured JSON
fields — prose is not acceptable; (3) Three failure modes (timeout, malformed output,
contradictory findings) each have a specific recovery policy. Lab preview: "Lab 09 — build a
three-agent code review pipeline with security sub-agent, performance sub-agent, and
orchestrator; implement the five-field JSON schema; inject a contradictory finding and verify
your orchestrator escalates correctly."
