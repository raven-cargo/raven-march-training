# Modules 07-09 Transformation Plan

Builder instructions for three parallel agents. Each agent needs ONLY this plan + the three spec docs (MODULE-CREATION-GUIDE.md, CODING-ELEMENTS-SPEC.md, CONTENT-SPEC.md) + their assigned module source file.

---

## Shared Conventions (All Three Builders)

### Spiral Learning Back-References

| Prior Module | Concept Available to Reference |
|---|---|
| M01 | Agentic Loop (PRAO), agentic coding paradigm, era comparison |
| M02 | CLAUDE.md system, permissions model, MCP primitives (Tools/Resources/Prompts), settings.json |
| M03 | Trace reading, intervention signals, the Observe phase, healthy vs stuck loops |
| M04 | TCEF framework (Task/Context/Examples/Format), precision verbs, context injection, diagnostic iteration |
| M05 | Output contracts, constraint specification, structured output as API |
| M06 | Tool orchestration, Bash/Read/Write/Edit/Glob/Grep tools, tool selection discipline |

### Content Accuracy Zero-Tolerance (enforce in ALL modules)

- No `--thinking` flag, no `--context` flag, no `/memory` command
- `triggers` in skill YAML = LUXOR convention, NOT native Claude Code
- Exactly THREE MCP primitives: Tools, Resources, Prompts
- `settings.json` format: `{"permissions": {"allow": [...], "deny": [...]}}`
- CLAUDE.md is read at session start, never invoked as a slash command
- SSE deprecated -- Streamable HTTP only for remote MCP

### Component ID Namespace

- Module 07: `m07-*`
- Module 08: `m08-*`
- Module 09: `m09-*`

---

# MODULE 07: Skills and Commands

## Hero Section

```html
<div class="ix-diagram" data-component="module-hero">
<div class="ix-hero">
<div class="ix-hero-bg"></div>
<div class="ix-hero-module-num">Module 07</div>
<div class="ix-hero-title">Skills and Commands</div>
<div class="ix-hero-subtitle">Encode expertise as reusable skill files, build slash commands, and compose multi-step workflows that survive session boundaries</div>
<div class="ix-hero-chips">
<span class="ix-hero-chip">Skill File Anatomy</span>
<span class="ix-hero-chip">TCEF Skill Bodies</span>
<span class="ix-hero-chip">Slash Commands</span>
<span class="ix-hero-chip">Composition Patterns</span>
<span class="ix-hero-chip">Skill vs Prompt Decision</span>
</div>
</div>
</div>

# Module 07: Skills and Commands
## Agentic AI Engineering -- 3-Day Intensive Course

---

## Overview

<div class="ix-diagram" data-component="objective">
  <p>Write effective skill files, build slash commands, and compose skills into multi-step workflows that encode expertise for consistent, repeatable execution across sessions.</p>
</div>

You applied the TCEF pattern to individual prompts in Module 04 and orchestrated tools in Module 06. Now you will package that expertise into persistent, reusable artifacts -- skill files and slash commands -- so that your engineering knowledge survives session boundaries and scales across a team. For the official reference, see the [Claude Code Memory and Skills docs](https://docs.anthropic.com/en/docs/claude-code/memory).

---
```

## Section-by-Section Specifications

### 7.1 The Persistence Problem

**Objective**: Identify why stateless sessions create inconsistency and how skill files solve the persistence problem.

**Spiral ref**: "In Module 02 you configured CLAUDE.md as the agent's persistent project context. But CLAUDE.md answers 'what is this project?' -- it does not answer 'how do I perform this specific task consistently?' That gap is what skills fill."

**Components**:

1. **Predict-Reveal** (`m07-persistence-predict`, xp=8)
   - Prompt: "Imagine you use Claude Code to review code for security issues every week. Each Monday you start a fresh session. What problems do you expect from the stateless session model? How would the review quality differ between Week 1 and Week 10?"
   - Reveal: Explains the re-briefing problem, inconsistency across sessions, lost institutional knowledge. A skill file encodes the expertise once so every session starts at the same quality floor.

2. **Tabbed-Panel** (`m07-skills-vs-claudemd`)
   - Title: "Skills vs CLAUDE.md"
   - Tab "CLAUDE.md": Project context -- what the project is, stack, conventions. Loaded automatically. Answers "What is this project?"
   - Tab "Skills": Reusable behaviors -- how to perform a task class. Loaded when relevant. Answers "How do I do X?"
   - Tab "Together": CLAUDE.md provides the "what" (project facts), skills provide the "how" (task methodology). Complementary, not competing.

3. **Callout** (variant=`core-idea`)
   - "**Skills encode expertise as files**: A skill file is a self-contained briefing -- a detailed job description for a specialist -- stored in version control, available in every session, always briefed to the same standard."

4. **Click-Cards** (`m07-skill-locations`)
   - Title: "Skill Location Hierarchy"
   - Card 1 "Global Skills": `~/.claude/skills/` -- Available everywhere. Use for cross-project expertise: code review, git workflow, documentation, debugging.
   - Card 2 "Project Skills": `.claude/skills/` -- Project-specific. Use for architecture patterns, error handling conventions, deployment workflow.
   - Card 3 "Precedence": Project skills override global skills with the same name. Enables project-specific specialization of global behaviors.

<details class="ix-collapse">
<summary>Deep Dive: The code review consistency problem</summary>
Full narrative from source 7.1 about the engineering org with review conventions, severity levels, format rules, etc. Collapsed because the interactives already convey the key ideas.
</details>

---

### 7.2 Anatomy of a Skill File

**Objective**: Identify the required elements of a skill file -- YAML frontmatter fields and the four sections of a TCEF skill body.

**Spiral ref**: "The TCEF pattern from Module 04 is not just for prompts you type in a session. It is the structural framework for skill bodies that persist across sessions."

**Components**:

1. **Predict-Reveal** (`m07-skill-anatomy-predict`, xp=8)
   - Prompt: "You know the TCEF framework (Task, Context, Examples, Format) from Module 04. If you were designing the internal structure of a skill file that Claude loads to perform a specific task, what sections would you include? Think about what information a specialist needs to execute a task perfectly on their first attempt."
   - Reveal: A complete skill body uses a variation of TCEF with four sections: Role (who Claude is), Procedure (numbered steps), Example (one complete input/output demo), Anti-patterns (explicit mistakes to avoid). The YAML frontmatter adds name, description, version, and triggers (LUXOR convention, not natively parsed).

2. **Step-Walkthrough** (`m07-skill-structure`)
   - Title: "Building a Skill File"
   - Step 1 "YAML Frontmatter": `name`, `description`, `version`, `triggers` (LUXOR convention -- NOT natively parsed by Claude Code). Show the exact YAML block.
   - Step 2 "Role Statement": Who Claude is when executing this skill. Must uniquely identify the expertise domain.
   - Step 3 "Numbered Procedure": Systematic steps to execute the task. Each step specific enough that an expert could follow without asking questions.
   - Step 4 "Example Input/Output": One complete, realistic demonstration. Both input and output must be full enough to serve as a template.
   - Step 5 "Anti-patterns": Explicit list of mistakes to avoid. Pre-emptive constraints, not optional.

3. **Callout** (variant=`warning`)
   - "**The <code>triggers</code> field is a LUXOR convention**: It documents when to use the skill, but Claude Code's runtime does not parse or activate skills based on triggers. Do not expect automatic activation when a user types something matching a trigger pattern."

4. **Agent Trace** (`m07-skill-loading-trace`, variant=`terminal`, auto-play, speed=0.5)
   - Title: "How Skills Load Into Context"
   - Scenario: User sends a message. Claude resolves a relevant skill from `~/.claude/skills/`. Skill content is injected into context. Claude executes using the skill protocol.
   - Rows:
     - prompt (delay=0): `> Review this code for security vulnerabilities`
     - think (delay=3500): `User wants a security review. Loading skill: code-review-security from ~/.claude/skills/`
     - result (delay=1500): `-> Skill loaded: Role=Senior AppSec Engineer, Procedure=6 steps, 1 example, 3 anti-patterns`
     - think (delay=3500): `Following skill procedure step 1: Identify attack surface -- listing all entry points...`
     - tool (delay=1500): `Read("src/routes/auth.js")`
     - result (delay=1500): `-> 89 lines, exports: login(), register(), resetPassword()`
     - think (delay=3500): `Step 2: Check each entry point for injection. Line 34 has string concatenation in SQL query...`
     - response (delay=2500): `Found 2 findings: Critical SQL injection (line 34), High password logging (line 52).`

<details class="ix-collapse">
<summary>Deep Dive: The "Senior Engineer on Day One" test</summary>
Explains the completeness test: Could a senior engineer new to the project execute the task from the skill file alone, without asking clarifying questions? If they would ask about severity taxonomy, format, or criteria -- those must be in the skill.
</details>

---

### 7.3 Writing Effective Skill Bodies

**Objective**: Distinguish between beginning, developing, proficient, and distinguished skill quality levels, and write skill bodies at the proficient level or above.

**Components**:

1. **Timeline** (`m07-quality-spectrum`)
   - Title: "Skill Quality Spectrum"
   - Stage 1 "Beginning": Vague goal statement. "Review code for security issues." No procedure, no format, no examples.
   - Stage 2 "Developing": Procedure with missing specifics. Has steps but no severity criteria, no example, no anti-patterns.
   - Stage 3 "Proficient": Complete elements. Role + Procedure + Example + Anti-patterns. Consistently useful output.
   - Stage 4 "Distinguished": Expert-level detail. Every element fully specified. Anti-patterns target exact mistakes. Example is realistic and complete.

2. **Click-Cards** (`m07-common-mistakes`)
   - Title: "Common Skill Body Mistakes"
   - Card 1 "Too Broad": `programming-help` that says "help with programming tasks." Skills should be narrow and deep.
   - Card 2 "Assumed Context": References "our error handling convention" without defining it. All context must be self-contained.
   - Card 3 "Missing Output Format": Defines role and procedure but not output structure. Inconsistent outputs.
   - Card 4 "No Anti-patterns": Without explicit anti-patterns, Claude makes the most common mistakes for the task type.

3. **Quiz** (`m07-skill-quality-check`, xp=15)
   - Title: "Knowledge Check: Skill Quality"
   - Q1: A skill body says "Review the code and report issues." What quality level is this?
     - A) Beginning (correct -- vague goal, no procedure/format/examples)
     - B) Developing
     - C) Proficient
     - D) Distinguished
   - Q2: Which element of a skill body prevents Claude from making the most common mistakes for a task type?
     - A) Role statement
     - B) Procedure steps
     - C) Example input/output
     - D) Anti-patterns (correct -- pre-emptive constraints on known failure modes)
   - Q3: A global skill references "our team's error handling convention" without defining it. What is the problem?
     - A) The skill is too broad
     - B) The skill has assumed context that will fail for new team members or other projects (correct)
     - C) The skill needs more anti-patterns
     - D) The skill is at the wrong location
   - Q4 (TRICKY): A skill has a detailed Role, a 5-step Procedure, and clear Anti-patterns, but no Example section. A teammate argues "the procedure is detailed enough -- examples are optional." Are they right?
     - A) Yes -- a detailed procedure is sufficient
     - B) No -- examples communicate field names, data types, and style that prose cannot specify precisely (correct -- "showing beats telling" from TCEF in M04)
     - C) It depends on the task complexity
     - D) Only if the output format is separately specified
   - Explanation for Q4: "This echoes the TCEF lesson from Module 04: one concrete example replaces three paragraphs of abstract rules. Examples silently communicate exact field names, data types, and prose style that even a detailed procedure cannot fully specify."

---

### 7.4 Slash Commands

**Objective**: Build slash commands that invoke skills, pass arguments via `$ARGUMENTS`, and are discoverable to team members.

**Components**:

1. **Predict-Reveal** (`m07-commands-predict`, xp=8)
   - Prompt: "You have a skill file that performs security reviews. Currently, using it requires typing a multi-sentence prompt every time. If you could create a shortcut that team members discover via autocomplete and invoke with a single line, what would that shortcut need to contain?"
   - Reveal: A slash command is a markdown file in `.claude/commands/` that loads a skill, handles `$ARGUMENTS` (everything typed after the command name), and provides the invocation bridge. Commands make skills discoverable via `/` autocomplete.

2. **Tabbed-Panel** (`m07-command-structure`)
   - Title: "Command File Anatomy"
   - Tab "Basic Command": Shows a minimal command that invokes a skill with `$ARGUMENTS`. File saved as `.claude/commands/security-review.md`, invoked as `/security-review src/routes/auth.js`.
   - Tab "$ARGUMENTS Variable": Shows how `$ARGUMENTS` captures everything after the command name. Can be file paths, task descriptions, flags.
   - Tab "When to Use Commands": Frequent, consistent invocation. Specific setup/argument handling. Team discoverability via autocomplete. Contrast: direct skill invocation for infrequent or multi-skill orchestration use.

3. **Entry-List** (`m07-reserved-names`)
   - Title: "Reserved Command Names -- Never Shadow These"
   - Include (safe names): `security-review`, `ship-feature`, `project-config`, `plugin-builder`
   - Exclude (reserved -- will shadow built-in): `plugin`, `help`, `clear`, `config`, `mcp`

4. **Callout** (variant=`warning`)
   - "**Never shadow built-in commands**: Custom commands in <code>.claude/commands/</code> take precedence over built-in commands. Creating <code>/plugin.md</code> breaks the native plugin system. Use descriptive, unique names."

---

### 7.5 Skill Composition Patterns

**Objective**: Apply pipeline, router, and multi-expert composition patterns to build multi-step workflows from individual skills.

**Spiral ref**: "In Module 06 you orchestrated individual tools. Now you orchestrate entire skills -- each encapsulating the expertise of a specialist."

**Components**:

1. **Click-Cards** (`m07-composition-patterns`)
   - Title: "Three Composition Patterns"
   - Card 1 "Pipeline (Sequential)": Output of Skill A becomes input of Skill B. Example: security review -> commit -> changelog. Gate: stop on Critical findings.
   - Card 2 "Router (Conditional)": Orchestrator evaluates input and routes to different specialists. Example: route by file path -- auth files to security skill, UI files to accessibility skill.
   - Card 3 "Multi-Expert (Parallel)": Multiple skills invoked simultaneously on same input via Agent tool. Outputs synthesized and deduplicated. Higher token cost but faster and more comprehensive.

2. **Agent Trace** (`m07-pipeline-trace`, variant=`annotated`, manual mode, speed=0.5)
   - Title: "Ship-Feature Pipeline in Action"
   - Scenario: A `/ship-feature` command executing three phases: parallel validation, sequential commit, summary.
   - Rows:
     - prompt (delay=0): `> /ship-feature src/auth/` -- annotation: "Command invoked with $ARGUMENTS = src/auth/"
     - think (delay=4000): `Phase 1: Launching parallel validation agents...` -- annotation: "Parallel composition -- three independent analyses"
     - tool (delay=1500): `Agent(skill="code-review-security", scope="src/auth/")` -- annotation: "Sub-agent 1: security specialist"
     - tool (delay=1500): `Agent(skill="test-coverage-check", scope="src/auth/")` -- annotation: "Sub-agent 2: test coverage"
     - tool (delay=1500): `Agent(skill="doc-completeness", scope="src/auth/")` -- annotation: "Sub-agent 3: documentation"
     - result (delay=1500): `-> Security: 0 Critical, 1 Medium. Tests: 94% coverage. Docs: complete.` -- annotation: "All validations pass -- no blocking findings"
     - think (delay=4000): `Phase 2: All validations passed. Proceeding to commit sequence.` -- annotation: "Conditional gate: would halt here on Critical findings"
     - tool (delay=1500): `Skill("changelog-entry") -> Added entry for auth improvements` -- annotation: "Sequential composition -- changelog before commit"
     - tool (delay=1500): `Skill("git-commit") -> commit abc1234` -- annotation: "Commit only after changelog confirmed"
     - response (delay=2500): `Feature shipped: abc1234. 1 non-blocking finding (Medium severity) for awareness.` -- annotation: "Summary with non-blocking findings surfaced"

3. **Decision-Tree** (`m07-skill-vs-prompt`)
   - Title: "Does This Task Need a Skill?"
   - Root: "Have you written this prompt (or similar) more than twice?"
     - Yes -> "Do multiple team members need the same capability?"
       - Yes -> "Create a skill" (green endpoint)
       - No -> "Does the task require a systematic procedure?"
         - Yes -> "Create a skill" (green endpoint)
         - No -> "One-off prompt is sufficient" (gray endpoint)
     - No -> "Is the task simple enough for TCEF in the prompt?"
       - Yes -> "One-off prompt is sufficient" (gray endpoint)
       - No -> "Is the task highly context-specific to one conversation?"
         - Yes -> "One-off prompt is sufficient" (gray endpoint)
         - No -> "Consider a skill for future reuse" (amber endpoint)

4. **Quiz** (`m07-composition-check`, xp=15)
   - Title: "Knowledge Check: Commands and Composition"
   - Q1: Where are global slash commands stored?
     - A) `.claude/commands/` (project)
     - B) `~/.claude/commands/` (correct -- global)
     - C) `~/.claude/skills/`
     - D) `.claude/skills/`
   - Q2: In a pipeline composition, what should the command do when the security review finds a Critical finding?
     - A) Continue to the next skill
     - B) Log the finding and continue
     - C) Halt the pipeline and report the finding (correct -- gate condition)
     - D) Retry the security review
   - Q3: When is parallel (multi-expert) composition appropriate?
     - A) When subtasks depend on each other's outputs
     - B) When independent dimensions of analysis are needed and speed matters (correct)
     - C) Always -- parallel is faster
     - D) Only when using the Agent tool
   - Q4 (TRICKY): A command file is saved as `.claude/commands/config.md`. A team member types `/config`. What happens?
     - A) The custom command runs, displaying project configuration
     - B) Claude Code's built-in config command runs
     - C) The custom command shadows the built-in config command, breaking native configuration access (correct)
     - D) Claude Code shows both options
   - Explanation for Q4: "Custom commands take precedence over built-in commands. This is the shadowing problem covered in section 7.4 -- always use unique, descriptive names to avoid breaking native functionality."

---

## Module 07 Component Count

| Component Type | Count |
|---|---|
| `module-hero` | 1 |
| `objective` | 5 (one per section) |
| `predict-reveal` | 3 |
| `tabbed-panel` | 2 |
| `click-cards` | 3 |
| `step-walkthrough` | 1 |
| `timeline` | 1 |
| `agent-trace` | 2 (1 terminal auto, 1 annotated manual) |
| `decision-tree` | 1 |
| `entry-list` | 1 |
| `callout` | 4 (1 core-idea, 2 warning, 1 tip implied) |
| `quiz` | 2 (8 questions total) |
| `ix-collapse` | 2 |
| **Total interactive** | **26** |

---

---

# MODULE 08: Meta-Prompting

## Hero Section

```html
<div class="ix-diagram" data-component="module-hero">
<div class="ix-hero">
<div class="ix-hero-bg"></div>
<div class="ix-hero-module-num">Module 08</div>
<div class="ix-hero-title">Meta-Prompting</div>
<div class="ix-hero-subtitle">Use LLMs to generate, evaluate, and improve prompts -- turning prompt development into an engineering discipline that scales</div>
<div class="ix-hero-chips">
<span class="ix-hero-chip">Prompt Generation</span>
<span class="ix-hero-chip">Failure Mode Evaluation</span>
<span class="ix-hero-chip">Generate-Evaluate-Improve Loop</span>
<span class="ix-hero-chip">Skill Template Libraries</span>
<span class="ix-hero-chip">Meta-Prompting Limits</span>
</div>
</div>
</div>

# Module 08: Meta-Prompting
## Agentic AI Engineering -- 3-Day Intensive Course

---

## Overview

<div class="ix-diagram" data-component="objective">
  <p>Write meta-prompts that generate, evaluate, and improve prompts at scale -- and recognize when direct prompting is the better approach.</p>
</div>

In Module 04 you learned the TCEF framework for writing precise prompts. In Module 07 you packaged those prompts into skill files. Now you will use Claude itself to generate, critique, and refine those skill files -- meta-prompting turns the prompt development process into an automated, repeatable engineering workflow. For prompt engineering fundamentals, see the [Anthropic Prompt Engineering Guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview).

---
```

## Section-by-Section Specifications

### 8.1 What Is Meta-Prompting?

**Objective**: Explain meta-prompting as "prompts that generate/evaluate prompts" and distinguish the three applications: generation, evaluation, improvement.

**Spiral ref**: "You used the TCEF pattern in Module 04 to write precise prompts. Meta-prompting applies TCEF at a higher level of abstraction -- your TCEF prompt instructs Claude to produce other TCEF prompts."

**Components**:

1. **Predict-Reveal** (`m08-meta-concept-predict`, xp=8)
   - Prompt: "You have been writing TCEF prompts by hand. Imagine you need to create 10 different code review skill files for 10 different review dimensions (security, performance, accessibility, etc.). What approach could make this faster and more consistent than writing each one manually?"
   - Reveal: Meta-prompting -- using Claude to generate structured prompts given a specification. The meta-prompt is itself a TCEF prompt whose Task is "generate a TCEF prompt for [domain]." This works because LLMs are exceptionally capable at generating structured instructional text.

2. **Tabbed-Panel** (`m08-three-applications`)
   - Title: "Three Applications of Meta-Prompting"
   - Tab "Generation": Using Claude to write prompts for specific tasks given goal, audience, constraints. Produces first drafts at 70-80% quality.
   - Tab "Evaluation": Using Claude to find failure modes, gaps, and ambiguities in existing prompts. Adversarial perspective. Often MORE valuable than generation.
   - Tab "Improvement": Applying evaluation findings to revise prompts. Can be combined into generate -> evaluate -> improve loop.

3. **Callout** (variant=`key-concept`)
   - "**Meta-prompting is metaprogramming**: If prompts are programs that instruct LLMs, then meta-prompts are programs that write programs. The leverage point: LLMs excel at generating structured text, including structured instructional text."

4. **Entry-List** (`m08-meta-is-not`)
   - Title: "What Meta-Prompting Is NOT"
   - Exclude: "A substitute for domain expertise" -- the human judgment layer is non-negotiable
   - Exclude: "A guarantee of prompt quality" -- LLMs can generate plausible but ineffective prompts
   - Exclude: "Autonomous prompt development" -- generated prompts require testing and refinement
   - Exclude: "A one-shot solution" -- meta-prompted prompts need iteration like any prompt

---

### 8.2 Prompt Generation

**Objective**: Write meta-prompts that generate complete TCEF prompts and skill files for specific task domains.

**Components**:

1. **Step-Walkthrough** (`m08-generation-pattern`)
   - Title: "The Prompt Generation Pattern"
   - Step 1 "Specify the meta-prompt": Write a TCEF meta-prompt whose Task is generating a TCEF prompt. Provide: task description, target audience, constraints, output format (the TCEF structure itself).
   - Step 2 "Provide domain specifics": Include the domain, the expert role, the review dimensions, or whatever domain detail the target prompt needs.
   - Step 3 "Request complete output": Instruct "generate the complete prompt ready to use, not a template with placeholders."
   - Step 4 "Review and refine": The output is a first draft at 70-80% quality. Domain expert review catches the remaining 20-30%.

2. **Compare** (`m08-manual-vs-meta`)
   - Title: "Manual vs Meta-Prompted Skill Generation"
   - Left "Manual": Engineer writes one skill file in 30-45 minutes. Full domain expertise applied. Inconsistent format across authors. Scales linearly.
   - Right "Meta-Prompted": Meta-prompt generates 5 skill files in one invocation. Consistent structure. Requires expert review for domain accuracy. Scales logarithmically.

3. **Agent Trace** (`m08-generation-trace`, variant=`terminal`, auto-play, speed=0.5)
   - Title: "Meta-Prompt Generating a Security Review Skill"
   - Rows:
     - prompt (delay=0): `> Generate a complete skill file for security code review of Node.js APIs. Cover OWASP Top 10, include severity taxonomy, one Critical example finding, three anti-patterns. YAML frontmatter with name, description, version, triggers.`
     - think (delay=3500): `Generating skill file. Role: senior AppSec engineer. Mapping OWASP categories to Node.js API patterns...`
     - think (delay=3500): `Building procedure: 1) identify attack surface, 2) check injection, 3) review auth, 4) check data exposure, 5) review dependencies, 6) produce findings.`
     - think (delay=3500): `Generating example: Critical SQL injection finding with file path, line number, remediation.`
     - response (delay=2500): `Generated complete skill file: code-review-security (v1.0.0). 4 sections, 6-step procedure, 1 example, 3 anti-patterns. Ready for domain expert review.`

4. **Callout** (variant=`tip`)
   - "**The bootstrapping pattern**: When entering a new domain where you lack deep expertise, use meta-prompting to generate a first batch of skill files. Use the best ones as examples in subsequent iterations. The library does not need to be complete before it is useful."

<details class="ix-collapse">
<summary>Deep Dive: Template generation and the bootstrapping pattern</summary>
Full content on generating a class of prompts (e.g., code review for 10 dimensions) and the 5-step bootstrapping pattern for new domains.
</details>

---

### 8.3 Prompt Evaluation

**Objective**: Write evaluation meta-prompts that find failure modes, gaps, and ambiguities in existing prompts using both adversarial and criteria-based approaches.

**Components**:

1. **Predict-Reveal** (`m08-evaluation-predict`, xp=8)
   - Prompt: "You have a skill file that your team has been using for three months. It works 'well enough' but occasionally produces inconsistent output. Rather than rewriting it from scratch, what approach could you take to systematically identify what is wrong with it?"
   - Reveal: Prompt evaluation -- using Claude in adversarial mode to find failure modes. Two approaches: (1) open-ended failure mode finding ("given this prompt, what will go wrong?") and (2) criteria-based evaluation with explicit quality criteria and PASS/PARTIAL/FAIL ratings.

2. **Tabbed-Panel** (`m08-evaluation-approaches`)
   - Title: "Two Evaluation Approaches"
   - Tab "Failure Mode Finding": Adversarial perspective. Ask Claude: "What will go wrong with this prompt?" Output: specific issues + specific fixes. Good for discovering unknowns.
   - Tab "Criteria-Based Evaluation": Explicit quality criteria (role precision, procedure completeness, example quality, anti-pattern specificity, format specification, severity taxonomy). Output: PASS/PARTIAL/FAIL scorecard with evidence.

3. **Agent Trace** (`m08-evaluation-trace`, variant=`annotated`, manual mode, speed=0.5)
   - Title: "Evaluating an Existing Skill File"
   - Rows:
     - prompt (delay=0): `> Evaluate this skill file against quality criteria: role precision, procedure completeness, example quality, anti-pattern specificity, format specification.` -- annotation: "Criteria-based evaluation meta-prompt"
     - think (delay=4000): `Evaluating role precision... "You are a security engineer" is too generic. Does not specify OWASP expertise or Node.js focus.` -- annotation: "PARTIAL -- role should uniquely identify expertise"
     - think (delay=4000): `Evaluating procedure... 4 steps but missing dependency review step and output production step.` -- annotation: "PARTIAL -- procedure incomplete"
     - think (delay=4000): `Evaluating example... Example shows Critical finding but input is not specified. Cannot reproduce.` -- annotation: "FAIL -- example needs both input and output"
     - think (delay=4000): `Evaluating anti-patterns... "Don't flag style issues" is good. But only 1 anti-pattern, need 3+.` -- annotation: "PARTIAL -- too few anti-patterns"
     - response (delay=2500): `Evaluation complete: 0 PASS, 3 PARTIAL, 1 FAIL. Priority fix: Example section needs complete input/output pair.` -- annotation: "Actionable scorecard with specific fixes"

4. **Callout** (variant=`core-idea`)
   - "**Evaluation is often more valuable than generation**: A well-designed evaluation meta-prompt surfaces failure modes the author is too close to see. The evaluation output is a specific, actionable critique -- not generic advice like 'add more context.'"

---

### 8.4 The Generate-Evaluate-Improve Loop

**Objective**: Combine generation and evaluation into a semi-automated loop that converges on high-quality prompts in 2-3 iterations.

**Components**:

1. **Step-Walkthrough** (`m08-gei-loop`)
   - Title: "The Generate-Evaluate-Improve Loop"
   - Step 1 "Generate": Meta-prompt produces first draft skill file. Quality: ~70-80%.
   - Step 2 "Evaluate": Evaluation meta-prompt produces PASS/PARTIAL/FAIL scorecard with specific issues.
   - Step 3 "Improve": Improvement meta-prompt applies all FAIL and PARTIAL findings. Produces v2.
   - Step 4 "Re-evaluate": Same evaluation criteria on v2. Check for regressions. Typically converges in 2-3 iterations.
   - Step 5 "Human Review": Domain expert confirms technical accuracy. The loop generates candidates; engineers select and validate.

2. **Agent Trace** (`m08-loop-trace`, variant=`prao`, auto-play, speed=0.5)
   - Title: "Generate-Evaluate-Improve: Two Iterations"
   - Rows:
     - prompt (delay=0): `> Generate a TCEF skill for database query optimization review.`
     - think (delay=3500): `Generating skill v1: Role=DBA, 4-step procedure, 1 example, 2 anti-patterns.`
     - response (delay=2500): `v1 generated. Now evaluating...`
     - prompt (delay=2000): `> Evaluate v1 against quality criteria.`
     - think (delay=3500): `v1 evaluation: Role PASS, Procedure PARTIAL (missing index analysis step), Example FAIL (placeholder), Anti-patterns PARTIAL.`
     - response (delay=2500): `2 PARTIAL, 1 FAIL. Improving...`
     - prompt (delay=2000): `> Improve v1 applying all findings.`
     - think (delay=3500): `Adding index analysis step, replacing placeholder example with realistic EXPLAIN output, adding 2 more anti-patterns.`
     - response (delay=2500): `v2 generated. Re-evaluating: 4 PASS, 1 PARTIAL. Converging.`

3. **Callout** (variant=`tip`)
   - "**Know when to stop iterating**: Stop when evaluation returns all PASS, when a domain expert confirms accuracy, or when three successive improvements produce only stylistic suggestions. At that point, testing against real cases is more valuable than further meta-level iteration."

---

### 8.5 Limits of Meta-Prompting

**Objective**: Recognize when direct prompting is better than meta-prompting and identify the confabulation risk in meta-prompted prompts.

**Components**:

1. **Decision-Tree** (`m08-when-direct`)
   - Title: "Direct Prompting vs Meta-Prompting"
   - Root: "Is the task simple and concrete (1-2 sentences, obvious format)?"
     - Yes -> "Direct prompting is faster" (green endpoint)
     - No -> "Does the task require deep tacit domain expertise?"
       - Yes -> "Direct prompting by domain expert is higher quality" (green endpoint)
       - No -> "Do you need multiple prompts for similar tasks?"
         - Yes -> "Meta-prompting provides leverage" (cyan endpoint)
         - No -> "Is the task in a domain you lack expertise in?"
           - Yes -> "Meta-prompting bootstraps, but requires expert review" (amber endpoint)
           - No -> "Either approach works -- choose by preference" (gray endpoint)

2. **Click-Cards** (`m08-confabulation-risks`)
   - Title: "Confabulation Risks in Meta-Prompted Prompts"
   - Card 1 "Outdated Assertions": Meta-prompted security skills may reference superseded vulnerability taxonomies or outdated best practices.
   - Card 2 "Propagation Risk": If a generated prompt contains incorrect guidance and is used without review, the incorrectness propagates to every task the skill is applied to.
   - Card 3 "Plausible but Wrong": Generated prompts for novel task types may sound authoritative but be subtly incorrect in ways hard to detect without domain expertise.
   - Card 4 "Mitigation": Always have domain expert review. Test against known examples. Date-stamp versions. Mark generation method in comments.

3. **Quiz** (`m08-meta-check`, xp=15)
   - Title: "Knowledge Check: Meta-Prompting"
   - Q1: A meta-prompt is best described as:
     - A) A prompt that is longer than 100 words
     - B) A prompt that instructs an LLM to generate, evaluate, or modify other prompts (correct)
     - C) A prompt stored in a skill file
     - D) A prompt that uses the TCEF framework
   - Q2: When does the generate-evaluate-improve loop typically converge?
     - A) After 1 iteration
     - B) After 2-3 iterations (correct)
     - C) After 5-10 iterations
     - D) It does not converge
   - Q3: A team uses meta-prompting to generate a security review skill for a new codebase. The generated skill produces plausible output. What is the MOST important next step?
     - A) Deploy the skill to production immediately
     - B) Run the generate-evaluate-improve loop one more time
     - C) Have a domain expert review the skill for technical accuracy (correct)
     - D) Test the skill against a large codebase
   - Q4 (TRICKY): Your teammate uses meta-prompting to generate a 3-line commit message for a single bugfix. Is this a good use of meta-prompting?
     - A) Yes -- meta-prompting improves all prompt tasks
     - B) No -- for simple, bounded tasks, the meta-prompting overhead exceeds the benefit (correct)
     - C) Yes -- consistency matters even for small tasks
     - D) No -- meta-prompting only works for code review
   - Explanation for Q4: "Meta-prompting provides leverage when generation is the bottleneck and the task is complex enough to justify the overhead. A 3-line commit message is simple, concrete, and obvious -- direct prompting is faster and equally effective."

4. **Callout** (variant=`key-concept`)
   - "**Meta-prompting generates candidates; engineers select and validate**: The human provides domain validation, context grounding, quality judgment, and iteration direction. Meta-prompting shifts labor from generation to evaluation -- a leverage gain only when generation is the bottleneck."

---

## Module 08 Component Count

| Component Type | Count |
|---|---|
| `module-hero` | 1 |
| `objective` | 5 (one per section) |
| `predict-reveal` | 2 |
| `tabbed-panel` | 2 |
| `click-cards` | 2 |
| `step-walkthrough` | 2 |
| `compare` | 1 |
| `agent-trace` | 3 (1 terminal auto, 1 annotated manual, 1 prao auto) |
| `decision-tree` | 1 |
| `entry-list` | 1 |
| `callout` | 4 (1 key-concept, 1 core-idea, 2 tip) |
| `quiz` | 1 (4 questions) |
| `ix-collapse` | 1 |
| **Total interactive** | **26** |

---

---

# MODULE 09: Multi-Agent Systems

## Hero Section

```html
<div class="ix-diagram" data-component="module-hero">
<div class="ix-hero">
<div class="ix-hero-bg"></div>
<div class="ix-hero-module-num">Module 09</div>
<div class="ix-hero-title">Multi-Agent Systems</div>
<div class="ix-hero-subtitle">Know when to split work across agents, design orchestrator patterns, structure inter-agent communication, and handle failure gracefully</div>
<div class="ix-hero-chips">
<span class="ix-hero-chip">Single vs Multi-Agent Decision</span>
<span class="ix-hero-chip">Orchestrator Patterns</span>
<span class="ix-hero-chip">Task Decomposition</span>
<span class="ix-hero-chip">Structured Communication</span>
<span class="ix-hero-chip">Failure Recovery</span>
</div>
</div>
</div>

# Module 09: Multi-Agent Systems
## Agentic AI Engineering -- 3-Day Intensive Course

---

## Overview

<div class="ix-diagram" data-component="objective">
  <p>Determine when tasks warrant multi-agent decomposition, design orchestrator/sub-agent architectures, specify structured inter-agent communication, and handle the three primary failure modes.</p>
</div>

Everything from Modules 01-08 assumed a single agent: one session, one context, one PRAO chain. In Module 07 you composed skills into multi-step workflows within a single agent. Now you will learn when to break that single-agent boundary -- and, critically, when NOT to. Understanding the difference is the core skill this module develops. For sub-agent mechanics, see the [Claude Code Sub-agents docs](https://docs.anthropic.com/en/docs/claude-code/sub-agents).

---
```

## Section-by-Section Specifications

### 9.1 Why Multi-Agent Systems

**Objective**: Apply a four-question decision framework to determine whether a task warrants multi-agent decomposition or is better served by a single well-prompted agent.

**Spiral ref**: "In Module 07 you composed skills into pipelines within a single agent session. Multi-agent extends this idea across session boundaries -- but at a real cost in complexity, debugging difficulty, and coordination overhead."

**Components**:

1. **Predict-Reveal** (`m09-multi-agent-predict`, xp=8)
   - Prompt: "You have a code review pipeline that checks security, performance, documentation, and test coverage. Currently, a single agent runs all four checks sequentially, taking about 4 minutes total. A colleague suggests using four agents in parallel. Before you agree, what costs and risks should you consider? Under what conditions would you say 'no, keep it single-agent'?"
   - Reveal: Multi-agent adds coordination overhead (15-20s), aggregation complexity (4 result sets to merge, potential conflicts), and debugging difficulty (4 logs instead of 1). It is justified only when: subtasks are genuinely independent, aggregation strategy is clear, and the net time benefit exceeds coordination cost. Many tasks that SEEM to need multi-agent only need better prompting.

2. **Click-Cards** (`m09-three-motivations`)
   - Title: "Three Legitimate Motivations for Multi-Agent"
   - Card 1 "Parallelism": Independent subtasks running simultaneously. Most frequently valid. Requires: no shared mutable state, fully specifiable inputs, straightforward aggregation.
   - Card 2 "Specialization": Different subtasks need different system prompts, tools, or MCP configurations. Cannot optimize one agent for both exploratory research and precise synthesis simultaneously.
   - Card 3 "Context Isolation": Task exceeds single context window. Least common in practice -- context windows have grown substantially. Valid when it genuinely applies.

3. **Intervention** (`m09-real-costs`)
   - Title: "The Real Costs of Multi-Agent"
   - Intervene "Coordination overhead": 15-20 second penalty for orchestration on tasks that take 30 seconds single-agent. 50% penalty before any benefit.
   - Intervene "Aggregation complexity": Grows nonlinearly. 5 agents = 4 conflicts to resolve, 5 schema variations, combinatorial partial failure.
   - Intervene "Debugging difficulty": One agent = one log. N agents = N logs + aggregation logic. Reproducing failures is genuinely hard.
   - Hold "Honest assessment": If single-agent takes 10 minutes and multi-agent takes 3 minutes + 2 minutes coordination, the net benefit is 5 minutes. Worth it for repeated pipelines, rarely for one-off tasks.

4. **Step-Walkthrough** (`m09-decision-framework`)
   - Title: "The Four-Question Decision Framework"
   - Step 1 "Can a single agent do this?": Try to sketch a single-agent approach first. Most of the time, this works.
   - Step 2 "Are the subtasks actually independent?": Independent = no shared mutable state, no output dependencies, fully specifiable inputs before any subtask runs.
   - Step 3 "Is the aggregation strategy clear?": Design the aggregation BEFORE the agents. How do you combine outputs? Handle conflicts? Handle partial failure?
   - Step 4 "Does the benefit outweigh coordination cost?": Estimate wall-clock savings vs engineering + debugging time. One-time tasks: rarely justified. Continuous pipelines: often justified.

5. **Callout** (variant=`core-idea`)
   - "**Start single-agent**: Multi-agent is not inherently better. It solves a specific class of problems. If you cannot articulate which of the three motivations (parallelism, specialization, context isolation) applies, you do not need multi-agent."

---

### 9.2 Orchestrator Patterns

**Objective**: Distinguish between fan-out/fan-in, pipeline, and conditional routing patterns and select the appropriate one for a given task structure.

**Components**:

1. **Tabbed-Panel** (`m09-orchestrator-patterns`)
   - Title: "Three Orchestrator Patterns"
   - Tab "Fan-Out / Fan-In": Orchestrator decomposes input into N independent sub-tasks, dispatches in parallel, aggregates results. Orchestrator has 3 jobs: decompose, dispatch, aggregate. The aggregation step is the hardest part.
   - Tab "Pipeline": Sequential: Agent A output -> Agent B input -> Agent C input. Appropriate when each stage needs full output of previous stage. Interface between stages is a contract. Before designing a pipeline, ask: could one well-prompted agent do all stages?
   - Tab "Conditional Routing": Classifier agent evaluates input, routes to different specialists. Routing logic is a potential failure point -- wrong classification propagates invisibly. Build validation into synthesis stage.
   - Tab "Hybrid": Combine patterns. Fan-out where some branches are pipelines. Document explicitly in CLAUDE.md. Each nesting layer multiplies debugging complexity.

2. **Agent Trace** (`m09-fanout-trace`, variant=`annotated`, manual mode, speed=0.5)
   - Title: "Fan-Out / Fan-In: Parallel Code Review"
   - Rows:
     - prompt (delay=0): `> Review src/api/ comprehensively: security, performance, docs, tests.` -- annotation: "Input to orchestrator"
     - think (delay=4000): `Decomposing into 4 independent sub-tasks. No shared mutable state. Aggregation: merge by severity.` -- annotation: "Three conditions checked: independent, no shared state, clear aggregation"
     - tool (delay=1500): `Agent(role="security", scope="src/api/", run_in_background=true)` -- annotation: "Sub-agent 1 dispatched in background"
     - tool (delay=1500): `Agent(role="performance", scope="src/api/", run_in_background=true)` -- annotation: "Sub-agent 2 dispatched in parallel"
     - tool (delay=1500): `Agent(role="docs", scope="src/api/", run_in_background=true)` -- annotation: "Sub-agent 3 dispatched in parallel"
     - tool (delay=1500): `Agent(role="tests", scope="src/api/", run_in_background=true)` -- annotation: "Sub-agent 4 dispatched in parallel"
     - result (delay=1500): `-> Security: 2 findings. Performance: 1 finding. Docs: 3 gaps. Tests: 94% coverage.` -- annotation: "All 4 return via task-notification"
     - think (delay=4000): `Aggregation: merging 6 findings. Deduplicating: 1 overlap between security and performance. Sorting by severity.` -- annotation: "The hardest part -- conflict resolution and deduplication"
     - response (delay=2500): `Unified report: 5 unique findings (1 Critical, 2 High, 2 Medium). 3 documentation gaps. 94% test coverage.` -- annotation: "Single coherent output from 4 agents"

3. **Callout** (variant=`warning`)
   - "**Design aggregation before agents**: Engineers who design the fan-out carefully and then hand-wave the fan-in almost always discover that aggregation is where the system breaks in production."

---

### 9.3 Task Decomposition

**Objective**: Apply three decomposability conditions (independence, no shared mutable state, clear I/O boundaries) to evaluate whether a task can be split across agents.

**Components**:

1. **Click-Cards** (`m09-decomposition-conditions`)
   - Title: "Three Conditions for Decomposability"
   - Card 1 "Independent Subtasks": Each subtask executes without knowing outcomes of others. If B needs A's output, that is a dependency chain, not a fan-out.
   - Card 2 "No Shared Mutable State": Subtasks must not write to the same files or data structures. Two agents modifying `src/config.ts` = concurrency conflict with no resolution.
   - Card 3 "Clear I/O Boundaries": Fully specify what goes in and comes out. "Review the codebase" is not well-bounded. "Review `src/api/` for input validation, report unvalidated parameters with file and line" is well-bounded.

2. **Click-Cards** (`m09-not-decomposable`)
   - Title: "When Tasks Resist Decomposition"
   - Card 1 "Sequential Dependencies": "Refactor auth module, then update all callers." Callers depend on the new interface. Cannot parallelize.
   - Card 2 "Shared State": Task requires consistent reasoning about changing system. Each agent sees potentially different snapshot.
   - Card 3 "Holistic Reasoning": Architecture review weighing security + performance + maintainability + team capability simultaneously. Dimension interactions matter. Decomposing loses the cross-cutting judgment.

3. **Scenario-Quiz** (`m09-decomposition-scenarios`)
   - Title: "Is This Task Decomposable?"
   - Scenario 1: "Review security, performance, and accessibility of `src/api/` in parallel."
     - Terminal replay shows three independent read-only analyses on the same files.
     - Correct: Yes -- read-only, independent dimensions, clear aggregation (merge findings).
   - Scenario 2: "Refactor the database module, then update all service files that import from it."
     - Terminal replay shows dependency -- services need the new interface.
     - Correct: No -- sequential dependency, services cannot start until refactor defines new interface.
   - Scenario 3: "Generate documentation for 4 independent microservices simultaneously."
     - Terminal replay shows 4 agents each working on their own service directory.
     - Correct: Yes -- no shared state, independent services, aggregation is concatenation.

4. **Callout** (variant=`tip`)
   - "**The decomposition worksheet**: Before building multi-agent, fill out the worksheet: task name, subtasks with inputs/outputs, independence matrix, shared state check, aggregation strategy, and net benefit estimate. If net benefit is small or negative, keep it single-agent."

<details class="ix-collapse">
<summary>Deep Dive: The full decomposition worksheet template</summary>
The complete worksheet from the source material with all fields: task name, trigger, scope boundaries, proposed subtasks (with inputs, outputs, independence check), independence matrix, shared state check, aggregation strategy, time estimates.
</details>

---

### 9.4 Inter-Agent Communication

**Objective**: Design structured JSON communication schemas with the five mandatory fields (status, checked_scope, findings, error, metadata) and explain why prose communication fails.

**Spiral ref**: "In Module 05 you learned that output contracts make agent output reliable for downstream consumers. Inter-agent communication schemas are output contracts between agents -- they deserve the same precision."

**Components**:

1. **Predict-Reveal** (`m09-communication-predict`, xp=8)
   - Prompt: "Two sub-agents have completed their security and performance reviews. One returns a detailed paragraph describing its findings. The other returns structured JSON with severity levels and file paths. The orchestrator needs to merge their results into a unified report. Which output will be easier to aggregate, and what specific problems will the prose output cause?"
   - Reveal: Structured JSON eliminates parsing ambiguity entirely -- the orchestrator programmatically extracts findings, counts by severity, merges without interpretation. Prose requires NL comprehension at every aggregation step, introduces instability (different runs extract different information), and makes deduplication across agents nearly impossible.

2. **Tabbed-Panel** (`m09-schema-fields`)
   - Title: "Five Mandatory Schema Fields"
   - Tab "status": `"success"` / `"error"` / `"partial"`. First field the orchestrator checks. Never fold partial into success.
   - Tab "checked_scope": Array of resource identifiers actually examined. Distinct from scope assigned. Agents do not always complete full scope. Without this, silent scope reduction looks like full completion.
   - Tab "findings": Array of finding objects, consistent internal structure. Empty array `[]` = no findings. Field must never be absent (ambiguous between "no findings" and "failed to populate").
   - Tab "error": String describing failure, or `null`. When not success, must contain specific description. "Token limit exceeded at src/services/large-service.ts after 2,300 lines" -- not "An error occurred."
   - Tab "metadata": Freeform object: agent version, model, time elapsed, cost estimate, confidence. Supports debugging even when it does not affect aggregation.

3. **Compare** (`m09-prose-vs-json`)
   - Title: "Prose vs Structured JSON Communication"
   - Left "Prose": "The security review found some potential issues with the authentication module, primarily around token validation, though the exact scope wasn't entirely clear." -- Ambiguous. Parsing varies between runs. Deduplication impossible.
   - Right "JSON": `{"status":"success","checked_scope":["src/auth/token.ts"],"findings":[{"severity":"high","file":"src/auth/token.ts","line":47,...}],"error":null}` -- Programmatic extraction. Deterministic. Mergeable.

4. **Callout** (variant=`core-idea`)
   - "**Structured JSON is not optional**: It is the contract between agents. Specify it before any agent is built. Prose communication creates parsing ambiguity that compounds at every aggregation step."

5. **Callout** (variant=`key-concept`)
   - "**Provenance: report what was examined**: <code>checked_scope</code> turns agent output from 'findings' into 'findings plus coverage.' Zero findings in a file only means absence of issues if the agent actually examined that file."

<details class="ix-collapse">
<summary>Deep Dive: Schema versioning</summary>
Inter-agent schemas are APIs. Breaking changes (removing/renaming fields, changing types) break orchestrators silently. Include `schema_version` field. Increment major version for breaking changes. Orchestrator should validate version before processing.
</details>

---

### 9.5 Failure Modes and Recovery

**Objective**: Identify and recover from the three primary multi-agent failure modes: timeout, malformed output, and contradictory findings.

**Components**:

1. **Click-Cards** (`m09-failure-modes`)
   - Title: "Three Primary Failure Modes"
   - Card 1 "Agent Timeout": Agent does not return in acceptable time. Recovery: retry once with reduced scope + explicit time constraint, then accept partial results. NEVER silently omit timed-out scope from final report.
   - Card 2 "Malformed Output": Output does not conform to schema. Recovery: retry once with schema example in prompt, then fail gracefully. Do NOT attempt regex parsing of partial JSON -- unreliable results worse than acknowledged failure.
   - Card 3 "Contradictory Findings": Two agents disagree on overlapping scope. Recovery: NEVER silently resolve by picking one. Escalate to human with both findings surfaced. This is the system working correctly.

2. **Agent Trace** (`m09-contradiction-trace`, variant=`compare`, manual mode, speed=0.5)
   - Title: "Contradictory Findings: Escalation in Action"
   - Left column "Agent A (Security Reviewer)":
     - think: `Reviewing src/auth/token.ts... Token validation logic is complete.`
     - result: `{"status":"success","findings":[],"checked_scope":["src/auth/token.ts"]}`
     - response: `Assessment: Secure. Token validation is complete and correct.`
   - Right column "Agent B (Broad Scope Reviewer)":
     - think: `Reviewing src/auth/token.ts... Line 47: expiry field checked for existence but not value.`
     - result: `{"status":"success","findings":[{"severity":"high","line":47,"description":"Token expiry not validated"}]}`
     - response: `Assessment: Vulnerable. Token expiry not validated against current timestamp.`
   - Orchestrator final row (both columns): `Contradiction detected. Escalating to human review: src/auth/token.ts line 47.`

3. **Intervention** (`m09-scope-creep`)
   - Title: "Scope Creep: When Agents Exceed Boundaries"
   - Intervene "Action-taking agent modifies files outside scope": Validate changed files against assigned scope BEFORE accepting output. Discrepancy = flag and review.
   - Intervene "Analysis agent reports findings outside scope": Filter findings to assigned scope only. Log out-of-scope findings separately.
   - Hold "Agent stays within assigned scope": Accept output normally. This is the expected behavior.

4. **Quiz** (`m09-failure-check`, xp=15)
   - Title: "Knowledge Check: Multi-Agent Systems"
   - Q1: What is the FIRST question in the multi-agent decision framework?
     - A) Are the subtasks independent?
     - B) Is the aggregation strategy clear?
     - C) Can a single agent do this? (correct)
     - D) Does the benefit outweigh coordination cost?
   - Q2: A sub-agent's `checked_scope` shows it examined 2 of 3 assigned files but status is `"success"`. What is wrong?
     - A) Nothing -- it found no issues
     - B) Status should be `"partial"` because it did not complete its full scope (correct)
     - C) The `checked_scope` field is optional
     - D) The orchestrator should retry automatically
   - Q3: Two sub-agents produce contradictory assessments of the same file. The orchestrator should:
     - A) Pick the finding with higher confidence
     - B) Average the severity ratings
     - C) Escalate both findings to a human reviewer (correct)
     - D) Discard both and re-run the review
   - Q4 (TRICKY): A team builds a multi-agent system for a task that takes 30 seconds with a single well-prompted agent. The multi-agent version uses 3 agents and adds 20 seconds of coordination overhead. The total wall-clock time is 25 seconds. Is this a good use of multi-agent?
     - A) Yes -- it is faster (25s vs 30s)
     - B) No -- the 5-second savings does not justify the engineering and debugging complexity of maintaining a multi-agent system (correct)
     - C) Yes -- parallel execution is always better
     - D) No -- multi-agent requires at least 5 agents to be useful
   - Explanation for Q4: "The decision framework asks: does the benefit outweigh the coordination cost? For a one-time task, 5 seconds of savings rarely justifies the engineering time to build, test, debug, and maintain a 3-agent system. For a continuously running pipeline processing thousands of tasks, the calculation changes. Context matters."
   - Q5: In the fan-out/fan-in pattern, which is the HARDEST part to get right?
     - A) Decomposing the task into subtasks
     - B) Dispatching sub-agents in parallel
     - C) The aggregation step -- collecting, validating, deduplicating, and synthesizing results (correct)
     - D) Designing the sub-agent prompts

---

## Module 09 Component Count

| Component Type | Count |
|---|---|
| `module-hero` | 1 |
| `objective` | 5 (one per section) |
| `predict-reveal` | 2 |
| `tabbed-panel` | 2 |
| `click-cards` | 4 |
| `step-walkthrough` | 1 |
| `compare` | 1 |
| `agent-trace` | 2 (1 annotated manual, 1 compare manual) |
| `decision-tree` | 0 (covered by step-walkthrough for the 4-question framework) |
| `intervention` | 2 |
| `scenario-quiz` | 1 (3 scenarios) |
| `callout` | 4 (1 core-idea, 1 key-concept, 1 warning, 1 tip) |
| `quiz` | 1 (5 questions) |
| `ix-collapse` | 2 |
| **Total interactive** | **28** |

---

---

# CROSS-MODULE SUMMARY

## Component Counts

| | M07 | M08 | M09 | Total |
|---|---|---|---|---|
| Hero | 1 | 1 | 1 | 3 |
| Objectives | 5 | 5 | 5 | 15 |
| Predict-Reveal | 3 | 2 | 2 | 7 |
| Tabbed-Panel | 2 | 2 | 2 | 6 |
| Click-Cards | 3 | 2 | 4 | 9 |
| Step-Walkthrough | 1 | 2 | 1 | 4 |
| Timeline | 1 | 0 | 0 | 1 |
| Compare | 0 | 1 | 1 | 2 |
| Agent-Trace | 2 | 3 | 2 | 7 |
| Decision-Tree | 1 | 1 | 0 | 2 |
| Entry-List | 1 | 1 | 0 | 2 |
| Intervention | 0 | 0 | 2 | 2 |
| Scenario-Quiz | 0 | 0 | 1 | 1 |
| Callout | 4 | 4 | 4 | 12 |
| Quiz | 2 | 1 | 1 | 4 |
| Collapse | 2 | 1 | 2 | 5 |
| **Total Interactive** | **26** | **26** | **28** | **80** |

## Total Quiz Questions

| Module | Questions | Tricky |
|---|---|---|
| M07 | 8 (2 quizzes) | 2 |
| M08 | 4 (1 quiz) | 1 |
| M09 | 5 (1 quiz) + 3 scenario | 1 + 1 scenario |
| **Total** | **20** | **5** |

## Key Content Decisions

### M07: Skills and Commands
- **`triggers` handling**: Explicitly marked as LUXOR convention, not native Claude Code. Warning callout reinforces this.
- **Skills vs CLAUDE.md**: Dedicated tabbed-panel to prevent conflation. Skills = "how to do X" (behavior), CLAUDE.md = "what is this project" (context).
- **Composition patterns**: Three patterns (pipeline, router, multi-expert) mapped to skill composition from the source. Full annotated trace shows the ship-feature pipeline executing all three phases.
- **Reserved command names**: Entry-list with include/exclude badges makes the shadowing problem visually concrete.

### M08: Meta-Prompting
- **Three applications, not one**: Generation, evaluation, and improvement are presented as distinct capabilities, not a single "meta-prompting" concept. Tabbed-panel separates them.
- **Evaluation > Generation**: Core-idea callout explicitly states evaluation is often MORE valuable. This counters the natural assumption that generation is the primary application.
- **Limits section is substantial**: Decision-tree and click-cards for confabulation risks prevent over-enthusiasm. The tricky quiz question (commit message example) reinforces that meta-prompting is not always appropriate.
- **Loop convergence**: Explicitly stated as 2-3 iterations. Prevents infinite iteration.

### M09: Multi-Agent Systems
- **"Start single-agent" as core message**: The module opens with skepticism, not enthusiasm. The predict-reveal asks students to identify costs BEFORE benefits.
- **Four-question decision framework**: Step-walkthrough forces sequential evaluation. Q1 is "Can a single agent do this?" -- not "How many agents do I need?"
- **Structured JSON mandatory**: Compare component (prose vs JSON) makes the case viscerally. Five mandatory fields presented in tabbed-panel with rationale for each.
- **Contradictory findings = escalate, never resolve**: The compare trace showing two agents disagreeing + escalation is the most important trace in the module. Manual mode forces students to study the contradiction carefully.
- **Net benefit tricky question**: The 30s -> 25s scenario with 20s overhead deliberately tests whether students calculate total engineering cost, not just wall-clock time.

## Agent Trace Summary

| Trace ID | Module | Variant | Mode | Lines | Purpose |
|---|---|---|---|---|---|
| `m07-skill-loading-trace` | M07 | terminal | auto | 8 | Show how skills load into context |
| `m07-pipeline-trace` | M07 | annotated | manual | 10 | Ship-feature pipeline with 3 composition patterns |
| `m08-generation-trace` | M08 | terminal | auto | 5 | Meta-prompt generating a skill file |
| `m08-evaluation-trace` | M08 | annotated | manual | 6 | Criteria-based evaluation of a skill |
| `m08-loop-trace` | M08 | prao | auto | 9 | Generate-evaluate-improve loop, 2 iterations |
| `m09-fanout-trace` | M09 | annotated | manual | 9 | Fan-out/fan-in parallel code review |
| `m09-contradiction-trace` | M09 | compare | manual | ~8 | Two agents contradicting, escalation |

## Spiral Learning Chain

```
M01-M03 (foundations) -> M04 (TCEF) -> M05 (output contracts) -> M06 (tools)
                                |                |                      |
                                v                v                      v
                           M07 (skills)     M09 (inter-agent     M07 (skill
                           uses TCEF as     schemas = output     composition =
                           skill body       contracts between    tool orchestration
                           structure        agents)              at skill level)
                                |
                                v
                           M08 (meta-prompting
                           uses TCEF to generate
                           TCEF at scale)
```

## Builder Assignment

| Agent | Module | Key Challenge | Estimated Components |
|---|---|---|---|
| Builder A | M07 | 5 sections, 2 quizzes, annotated pipeline trace | 26 |
| Builder B | M08 | 5 sections, 3 agent traces (all different variants), abstract concepts need concrete demos | 26 |
| Builder C | M09 | 5 sections, compare trace for contradictions, scenario-quiz with terminal replays | 28 |

All three builders can work in parallel. No cross-dependencies between modules.

---

## Builder Pre-Flight Checklist

Before writing any HTML, each builder MUST verify:

- [ ] Read MODULE-CREATION-GUIDE.md (component templates, quality checklist)
- [ ] Read CODING-ELEMENTS-SPEC.md (22 component types, HTML rules, accessibility)
- [ ] Read CONTENT-SPEC.md (section structure, pedagogy, terminology, quiz standards)
- [ ] All `data-diagram-id` values use the `m0N-` prefix for their module
- [ ] No blank lines inside nested HTML divs
- [ ] No markdown syntax inside HTML blocks
- [ ] No emojis anywhere -- Lucide icons only
- [ ] Every interactive has an `ix-instruct` paragraph above it
- [ ] Every section starts with `objective` component
- [ ] All agent traces have `data-speed="0.5"`
- [ ] Two-column traces (annotated, compare) have `data-default-mode="manual"`
- [ ] Every quiz has 4+ questions with at least 1 tricky
- [ ] Predict-reveals come BEFORE explanations
- [ ] Correct answer positions vary across quiz questions
- [ ] No `--thinking`, `--context`, `/memory`, SSE references
- [ ] `triggers` always noted as LUXOR convention, not native
