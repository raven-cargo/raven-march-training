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

## 7.1 The Persistence Problem

<div class="ix-diagram" data-component="objective">
  <p>Identify why stateless sessions create inconsistency and how skill files solve the persistence problem.</p>
</div>

In Module 02 you configured `CLAUDE.md` as the agent's persistent project context. But `CLAUDE.md` answers "what is this project?" -- it does not answer "how do I perform this specific task consistently?" That gap is what skills fill.

<p class="ix-instruct">Write your prediction, then reveal the reference reasoning.</p>

<div class="ix-diagram" data-component="predict-reveal" data-diagram-id="m07-persistence-predict" data-xp="8">
  <span class="ix-title">Predict Before You Learn</span>
  <p class="ix-predict-prompt">Imagine you use Claude Code to review code for security issues every week. Each Monday you start a fresh session. What problems do you expect from the stateless session model? How would the review quality differ between Week 1 and Week 10?</p>
  <textarea class="ix-predict-input" aria-label="Your prediction" placeholder="Write your reasoning -- what would you expect and why?"></textarea>
  <details class="ix-predict-reveal">
    <summary>Reveal reference reasoning</summary>
    <p>The stateless model creates three compounding problems. First, <strong>re-briefing cost</strong>: every Monday you must re-explain your severity taxonomy, format, and conventions -- or forget to, producing inconsistent output. Second, <strong>quality drift</strong>: Week 1 and Week 10 reviews will differ because your ad-hoc briefings vary each time. Third, <strong>lost institutional knowledge</strong>: when you move projects, all that hard-won review expertise leaves with you. A skill file encodes the expertise once so every session starts at the same quality floor -- no re-briefing, no drift, no knowledge loss.</p>
  </details>
</div>

<p class="ix-instruct">Switch between tabs to compare what each system answers.</p>

<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="m07-skills-vs-claudemd">
  <span class="ix-title">Skills vs CLAUDE.md</span>
  <div data-tab="CLAUDE.md">
    <p><strong>Project context</strong> -- what the project is, its stack, its conventions.</p>
    <ul>
      <li>Loaded automatically at session start</li>
      <li>Always in context</li>
      <li>Answers: <strong>"What is this project?"</strong></li>
    </ul>
    <p>Example: <em>"This is a Node.js REST API using Express and TypeScript. We use parameterized queries for all database access. The test framework is Jest."</em></p>
  </div>
  <div data-tab="Skills">
    <p><strong>Reusable behaviors</strong> -- how to perform a specific task class.</p>
    <ul>
      <li>Loaded when relevant to the current task</li>
      <li>Not always in context -- injected on demand</li>
      <li>Answers: <strong>"How do I do X?"</strong></li>
    </ul>
    <p>Example: <em>"When reviewing code, adopt the role of a senior security engineer. Systematically check for SQL injection, XSS, authentication bypasses. Format each finding as..."</em></p>
  </div>
  <div data-tab="Together">
    <p><strong>Complementary, not competing.</strong></p>
    <ul>
      <li><code>CLAUDE.md</code> provides the <strong>"what"</strong> -- project facts, stack, conventions</li>
      <li>Skills provide the <strong>"how"</strong> -- task methodology, procedure, format</li>
      <li>Together they give the agent both project awareness and task expertise</li>
    </ul>
    <p>A security review skill uses <code>CLAUDE.md</code> to know the project uses parameterized queries, then applies its own 6-step procedure to verify that every query actually follows that convention.</p>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="core-idea">
  <p><strong>Skills encode expertise as files</strong>: A skill file is a self-contained briefing -- a detailed job description for a specialist -- stored in version control, available in every session, always briefed to the same standard.</p>
</div>

<p class="ix-instruct">Click each card to explore the skill location hierarchy.</p>

<div class="ix-diagram" data-component="click-cards" data-diagram-id="m07-skill-locations">
  <span class="ix-title">Skill Location Hierarchy</span>
  <div class="ix-card" data-phase="act">
    <i data-lucide="globe" class="ix-card-icon"></i>
    <span class="ix-card-label">Global Skills</span>
  </div>
  <div class="ix-card" data-phase="observe">
    <i data-lucide="folder" class="ix-card-icon"></i>
    <span class="ix-card-label">Project Skills</span>
  </div>
  <div class="ix-card" data-phase="reason">
    <i data-lucide="layers" class="ix-card-icon"></i>
    <span class="ix-card-label">Precedence</span>
  </div>
  <!-- Detail panels -->
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="act">Global Skills</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">Location</div>
        <div class="ix-sec-text"><code>~/.claude/skills/</code></div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Scope</div>
        <div class="ix-sec-text">Available in every Claude Code session, regardless of which project you are working in.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Best for</div>
        <div class="ix-sec-text">Cross-project expertise: code review, git workflow, documentation generation, debugging methodology.</div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="observe">Project Skills</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">Location</div>
        <div class="ix-sec-text"><code>.claude/skills/</code> in the project root.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Scope</div>
        <div class="ix-sec-text">Available only when Claude Code is run from that project directory.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Best for</div>
        <div class="ix-sec-text">Project-specific expertise: architecture patterns, error handling conventions, deployment workflow.</div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="reason">Precedence</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">Override Rule</div>
        <div class="ix-sec-text">Project skills override global skills with the same name.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Why it matters</div>
        <div class="ix-sec-text">This enables project-specific specialization of global behaviors. A global <code>code-review</code> skill defines the general procedure; a project <code>code-review</code> skill can add project-specific severity criteria, format requirements, and anti-patterns.</div>
      </div>
    </div>
  </div>
</div>

<details class="ix-collapse">
<summary>Deep Dive: The code review consistency problem</summary>
<div class="ix-collapse-body">
<p>Consider the code review workflow at a typical engineering organization. The team has established conventions: specific severity levels, a preferred format for review comments, rules about what counts as a blocking issue versus a suggestion, domain-specific security considerations that non-security reviewers miss, and a standard for when to approve versus request changes.</p>
<p>Without skills, every engineer who uses Claude for code review starts each session by re-explaining these conventions. Some remember to explain them fully; some skip parts. The review quality is inconsistent across engineers and across sessions. The institutional knowledge of "how to do a good code review at this organization" exists only in the memory of the most senior engineers -- it is not operationalized.</p>
<p>With a <code>code-review</code> skill, those conventions are encoded once, stored in version control, and available to every engineer in every session. The quality floor rises because the knowledge is always present; the senior engineer's expertise is no longer locked in their head.</p>
</div>
</details>

---

## 7.2 Anatomy of a Skill File

<div class="ix-diagram" data-component="objective">
  <p>Identify the required elements of a skill file -- YAML frontmatter fields and the four sections of a TCEF skill body.</p>
</div>

The TCEF pattern from Module 04 is not just for prompts you type in a session. It is the structural framework for skill bodies that persist across sessions.

<p class="ix-instruct">Write your prediction, then reveal the reference reasoning.</p>

<div class="ix-diagram" data-component="predict-reveal" data-diagram-id="m07-skill-anatomy-predict" data-xp="8">
  <span class="ix-title">Predict Before You Learn</span>
  <p class="ix-predict-prompt">You know the TCEF framework (Task, Context, Examples, Format) from Module 04. If you were designing the internal structure of a skill file that Claude loads to perform a specific task, what sections would you include? Think about what information a specialist needs to execute a task perfectly on their first attempt.</p>
  <textarea class="ix-predict-input" aria-label="Your prediction" placeholder="Write your reasoning -- what sections would you include and why?"></textarea>
  <details class="ix-predict-reveal">
    <summary>Reveal reference reasoning</summary>
    <p>A complete skill body uses a variation of TCEF with four sections. <strong>Role</strong> (who Claude is -- uniquely identifies the expertise domain). <strong>Procedure</strong> (numbered steps to execute the task -- specific enough that an expert could follow without clarifying questions). <strong>Example</strong> (one complete input/output demonstration -- silently communicates field names, data types, and style). <strong>Anti-patterns</strong> (explicit mistakes to avoid -- pre-emptive constraints on known failure modes). The YAML frontmatter wraps this body with metadata: <code>name</code>, <code>description</code>, <code>version</code>, and <code>triggers</code> (a LUXOR convention, not natively parsed by Claude Code).</p>
  </details>
</div>

<p class="ix-instruct">Step through the sequence to see how a skill file is constructed layer by layer.</p>

<div class="ix-diagram" data-component="step-walkthrough" data-diagram-id="m07-skill-structure">
  <span class="ix-title">Building a Skill File</span>
  <div class="ix-step" data-step="1">
    <div class="ix-step-header">YAML Frontmatter</div>
    <div class="ix-step-body">
      <p>The frontmatter provides metadata about the skill:</p>
      <pre><code>---
name: code-review-security
description: Systematic security-focused code review with severity ratings and remediation guidance.
version: 2.1.0
triggers:
  - "review this code for security"
  - "security review"
---</code></pre>
      <p>Fields: <code>name</code> (identifier, lowercase-hyphenated), <code>description</code> (one-line glanceable summary), <code>version</code> (semver -- increment when output-affecting changes occur), <code>triggers</code> (intent documentation only).</p>
    </div>
  </div>
  <div class="ix-step" data-step="2">
    <div class="ix-step-header">Role Statement</div>
    <div class="ix-step-body">
      <p>Defines who Claude is when executing this skill. Must uniquely identify the expertise domain.</p>
      <pre><code>## Role
You are a senior application security engineer with expertise in OWASP Top 10 vulnerabilities, authentication systems, and secure coding practices.</code></pre>
      <p>A good role statement is specific enough that two different skills would never share it. "You are a security engineer" is too vague. "You are a senior AppSec engineer with OWASP Top 10 and Node.js API expertise" is precise.</p>
    </div>
  </div>
  <div class="ix-step" data-step="3">
    <div class="ix-step-header">Numbered Procedure</div>
    <div class="ix-step-body">
      <p>Systematic steps to execute the task. Each step must be specific enough that an expert could follow without asking clarifying questions.</p>
      <pre><code>## Procedure
1. Identify the attack surface -- list all entry points
2. Check each entry point for injection vulnerabilities
3. Review authentication and authorization logic
4. Check for sensitive data exposure in logs and responses
5. Review dependency usage for known vulnerabilities
6. Produce structured findings with file, line, severity, remediation</code></pre>
      <p>The procedure is the core of the skill. If a step says "check for issues," it is too vague. Every step should name what to check and what to look for.</p>
    </div>
  </div>
  <div class="ix-step" data-step="4">
    <div class="ix-step-header">Example Input/Output</div>
    <div class="ix-step-body">
      <p>One complete, realistic demonstration. Both input and output must be full enough to serve as a template.</p>
      <pre><code>## Example
**Input**: A Node.js Express route handler for user authentication.
**Output**:
### Finding 1
- **File**: src/routes/auth.js, line 34
- **Severity**: Critical
- **Issue**: SQL injection via string concatenation
- **Remediation**: Use parameterized query</code></pre>
      <p>The example silently communicates exact field names, ordering, level of detail, and prose style. One concrete example replaces three paragraphs of abstract rules -- the same TCEF principle from Module 04.</p>
    </div>
  </div>
  <div class="ix-step" data-step="5">
    <div class="ix-step-header">Anti-patterns</div>
    <div class="ix-step-body">
      <p>Explicit list of mistakes to avoid. These are pre-emptive constraints, not optional guidance.</p>
      <pre><code>## Anti-patterns
- Do not flag style issues -- this is a security review
- Do not mark theoretical risks as Critical
- Do not suggest "use a library" without naming the specific library
- Do not omit the line number from any finding</code></pre>
      <p>Without anti-patterns, Claude makes the most common mistakes for the task type. Anti-patterns encode the hard-won lessons that distinguish expert execution from generic output.</p>
    </div>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="warning">
  <p><strong>The <code>triggers</code> field is a LUXOR convention</strong>: It documents when to use the skill, but Claude Code's runtime does not parse or activate skills based on triggers. Do not expect automatic activation when a user types something matching a trigger pattern. The field serves as intent documentation for human developers and external orchestration systems.</p>
</div>

<p class="ix-instruct">Watch the trace replay to see how skills load into context at runtime.</p>

<div class="ix-diagram" data-component="agent-trace"
     data-variant="terminal"
     data-diagram-id="m07-skill-loading-trace"
     data-speed="0.5">
  <span class="ix-title">How Skills Load Into Context</span>
  <div class="ix-trace-row" data-type="prompt" data-delay="0">
    <span class="ix-trace-content">> Review this code for security vulnerabilities</span>
  </div>
  <div class="ix-trace-row" data-type="think" data-delay="3500">
    <span class="ix-trace-content">User wants a security review. Loading skill: code-review-security from ~/.claude/skills/</span>
  </div>
  <div class="ix-trace-row" data-type="result" data-delay="1500">
    <span class="ix-trace-content">-> Skill loaded: Role=Senior AppSec Engineer, Procedure=6 steps, 1 example, 3 anti-patterns</span>
  </div>
  <div class="ix-trace-row" data-type="think" data-delay="3500">
    <span class="ix-trace-content">Following skill procedure step 1: Identify attack surface -- listing all entry points...</span>
  </div>
  <div class="ix-trace-row" data-type="tool" data-delay="1500">
    <span class="ix-trace-content">Read("src/routes/auth.js")</span>
  </div>
  <div class="ix-trace-row" data-type="result" data-delay="1500">
    <span class="ix-trace-content">-> 89 lines, exports: login(), register(), resetPassword()</span>
  </div>
  <div class="ix-trace-row" data-type="think" data-delay="3500">
    <span class="ix-trace-content">Step 2: Check each entry point for injection. Line 34 has string concatenation in SQL query...</span>
  </div>
  <div class="ix-trace-row" data-type="response" data-delay="2500">
    <span class="ix-trace-content">Found 2 findings: Critical SQL injection (line 34), High password logging (line 52). Full report with remediation follows.</span>
  </div>
</div>

<details class="ix-collapse">
<summary>Deep Dive: The "Senior Engineer on Day One" test</summary>
<div class="ix-collapse-body">
<p>A complete skill body should be sufficient to brief a senior engineer who is new to the project. Apply this test: read only the skill file -- not the code it will review, not any other documentation. Could a senior engineer execute the task from this briefing alone, without asking clarifying questions?</p>
<p>If the answer is "they would need to ask what severity taxonomy to use," the severity taxonomy must be in the skill. If "they would ask what format to use for findings," the format must be in the skill. If "they would ask what counts as a Critical finding," the criteria must be in the skill.</p>
<p>This test catches the most common skill authoring mistake: assumed context. When you write a skill while deeply embedded in a project, you unconsciously assume the reader shares your knowledge. The "Day One" test forces you to externalize everything the skill execution requires.</p>
</div>
</details>

---

## 7.3 Writing Effective Skill Bodies

<div class="ix-diagram" data-component="objective">
  <p>Distinguish between beginning, developing, proficient, and distinguished skill quality levels, and write skill bodies at the proficient level or above.</p>
</div>

Understanding where your skills land on the quality spectrum -- and how to move them up -- is the core engineering discipline of skill authoring.

<p class="ix-instruct">Click each stage to see what that quality level looks like in practice.</p>

<div class="ix-diagram" data-component="timeline" data-diagram-id="m07-quality-spectrum">
  <span class="ix-title">Skill Quality Spectrum</span>
  <div class="ix-timeline-stage" data-stage="1">
    <div class="ix-stage-label">Beginning</div>
    <div class="ix-stage-body">
      <p><strong>Vague goal statement.</strong></p>
      <pre><code>Review code for security issues and report what you find.</code></pre>
      <p>No procedure, no format specification, no severity criteria, no examples. Output will be inconsistent and often low quality. Barely better than no skill at all.</p>
    </div>
  </div>
  <div class="ix-timeline-stage" data-stage="2">
    <div class="ix-stage-label">Developing</div>
    <div class="ix-stage-body">
      <p><strong>Procedure with missing specifics.</strong></p>
      <pre><code>## Procedure
1. Check for SQL injection
2. Check for XSS
3. Check for authentication issues
4. Report findings with severity levels</code></pre>
      <p>Has steps and mentions format -- but no severity criteria, no example, no anti-patterns. More consistent than Beginning, still variable in quality.</p>
    </div>
  </div>
  <div class="ix-timeline-stage" data-stage="3">
    <div class="ix-stage-label">Proficient</div>
    <div class="ix-stage-body">
      <p><strong>Complete elements.</strong> Role + Procedure + Example + Anti-patterns all present. Each element has enough detail to be actionable.</p>
      <p>This is the minimum viable production level. Most skills should aim for Proficient as the starting target.</p>
    </div>
  </div>
  <div class="ix-timeline-stage" data-stage="4">
    <div class="ix-stage-label">Distinguished</div>
    <div class="ix-stage-body">
      <p><strong>Expert-level detail.</strong> Every element fully specified. Anti-patterns target the exact mistakes an imprecise skill would make. The example is realistic and complete enough to serve as a template. The procedure is systematic and thorough.</p>
      <p>The full security review skill from section 7.2 represents this level.</p>
    </div>
  </div>
</div>

<p class="ix-instruct">Click each card to explore the most common skill authoring mistakes.</p>

<div class="ix-diagram" data-component="click-cards" data-diagram-id="m07-common-mistakes">
  <span class="ix-title">Common Skill Body Mistakes</span>
  <div class="ix-card" data-phase="error">
    <i data-lucide="maximize" class="ix-card-icon"></i>
    <span class="ix-card-label">Too Broad</span>
  </div>
  <div class="ix-card" data-phase="error">
    <i data-lucide="eye-off" class="ix-card-icon"></i>
    <span class="ix-card-label">Assumed Context</span>
  </div>
  <div class="ix-card" data-phase="error">
    <i data-lucide="file-question" class="ix-card-icon"></i>
    <span class="ix-card-label">Missing Output Format</span>
  </div>
  <div class="ix-card" data-phase="error">
    <i data-lucide="shield-off" class="ix-card-icon"></i>
    <span class="ix-card-label">No Anti-patterns</span>
  </div>
  <!-- Detail panels -->
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="error">Too Broad</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">The Problem</div>
        <div class="ix-sec-text">A skill called <code>programming-help</code> that says "help with programming tasks" provides no actionable specification. The agent has no procedure to follow, no format to produce, no constraints to respect.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">The Fix</div>
        <div class="ix-sec-text">Skills should be narrow and deep, not broad and shallow. Instead of <code>programming-help</code>, create <code>code-review-security</code>, <code>test-generation-jest</code>, <code>api-endpoint-design</code> -- each with a focused procedure.</div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="error">Assumed Context</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">The Problem</div>
        <div class="ix-sec-text">A skill body that references "our error handling convention" without defining it will fail for new team members, in global skills used across projects, and when the convention changes without updating the skill.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">The Fix</div>
        <div class="ix-sec-text">All context necessary for execution must be in the skill itself. If the skill needs to know about an error handling pattern, include the pattern directly. Apply the "Senior Engineer on Day One" test.</div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="error">Missing Output Format</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">The Problem</div>
        <div class="ix-sec-text">Skills that define the role and procedure but not the output structure produce outputs that vary in format between invocations. Downstream consumers -- whether human readers or automated parsers -- cannot rely on consistent field names, ordering, or detail level.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">The Fix</div>
        <div class="ix-sec-text">The Example section implicitly defines the output format. Include a complete, realistic example that serves as the output template. As learned in Module 05, the output contract is what makes output reliable.</div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="error">No Anti-patterns</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">The Problem</div>
        <div class="ix-sec-text">Without explicit anti-patterns, Claude makes the most common mistakes for the task type. A security review skill without anti-patterns will flag style issues, mark theoretical risks as Critical, and suggest vague remediations.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">The Fix</div>
        <div class="ix-sec-text">Anti-patterns are pre-emptive constraint specifications -- they encode the hard-won lessons that distinguish expert execution from generic output. Include at least 3 anti-patterns per skill.</div>
      </div>
    </div>
  </div>
</div>

<p class="ix-instruct">Test your understanding of skill quality levels and authoring principles.</p>

<div class="ix-diagram" data-component="quiz" data-diagram-id="m07-skill-quality-check" data-xp="15">
  <span class="ix-title">Knowledge Check: Skill Quality</span>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q1.</strong> A skill body says "Review the code and report issues." What quality level is this?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="true">Beginning -- vague goal with no procedure, format, or examples</button>
      <button class="ix-quiz-option">Developing -- has a procedure but missing specifics</button>
      <button class="ix-quiz-option">Proficient -- all elements present</button>
      <button class="ix-quiz-option">Distinguished -- expert-level detail</button>
    </div>
    <p class="ix-quiz-explanation">This is a single vague sentence with no procedure, no format, no examples, and no anti-patterns. It sits squarely at the Beginning level -- barely better than no skill at all.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q2.</strong> Which element of a skill body prevents Claude from making the most common mistakes for a task type?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">Role statement</button>
      <button class="ix-quiz-option">Procedure steps</button>
      <button class="ix-quiz-option">Example input/output</button>
      <button class="ix-quiz-option" data-correct="true">Anti-patterns -- pre-emptive constraints on known failure modes</button>
    </div>
    <p class="ix-quiz-explanation">Anti-patterns explicitly name the mistakes to avoid. Without them, Claude defaults to the most common behaviors in its training data, which often include the exact mistakes an expert would avoid. The Role sets identity, Procedure sets steps, and Examples set format -- but Anti-patterns set the guardrails.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q3.</strong> A global skill references "our team's error handling convention" without defining it. What is the primary problem?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">The skill is too broad</button>
      <button class="ix-quiz-option" data-correct="true">The skill has assumed context that will fail for new team members or other projects</button>
      <button class="ix-quiz-option">The skill needs more anti-patterns</button>
      <button class="ix-quiz-option">The skill should be a project skill instead</button>
    </div>
    <p class="ix-quiz-explanation">A global skill must be self-contained because it runs across all projects. Referencing "our convention" without defining it means the skill will produce incorrect or inconsistent output whenever that implicit context is unavailable -- for new hires, on different projects, or when the convention changes.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q4.</strong> A skill has a detailed Role, a 5-step Procedure, and clear Anti-patterns, but no Example section. A teammate argues "the procedure is detailed enough -- examples are optional." Are they right?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">Yes -- a detailed procedure is sufficient for consistent output</button>
      <button class="ix-quiz-option" data-correct="true">No -- examples communicate field names, data types, and style that prose cannot specify precisely</button>
      <button class="ix-quiz-option">It depends on the task complexity</button>
      <button class="ix-quiz-option">Only if the output format is separately specified in a schema</button>
    </div>
    <p class="ix-quiz-explanation">This echoes the TCEF lesson from Module 04: one concrete example replaces three paragraphs of abstract rules. Examples silently communicate exact field names, data types, ordering, and prose style that even a detailed procedure cannot fully specify. "Showing beats telling" applies to skill bodies just as it applies to prompts.</p>
  </div>
</div>

---

## 7.4 Slash Commands

<div class="ix-diagram" data-component="objective">
  <p>Build slash commands that invoke skills, pass arguments via <code>$ARGUMENTS</code>, and are discoverable to team members.</p>
</div>

Skills encode expertise; commands make that expertise accessible. A slash command is the invocation bridge between a team member typing `/security-review` and the skill executing its procedure.

<p class="ix-instruct">Write your prediction, then reveal the reference reasoning.</p>

<div class="ix-diagram" data-component="predict-reveal" data-diagram-id="m07-commands-predict" data-xp="8">
  <span class="ix-title">Predict Before You Learn</span>
  <p class="ix-predict-prompt">You have a skill file that performs security reviews. Currently, using it requires typing a multi-sentence prompt every time. If you could create a shortcut that team members discover via autocomplete and invoke with a single line, what would that shortcut need to contain?</p>
  <textarea class="ix-predict-input" aria-label="Your prediction" placeholder="Write your reasoning -- what would the shortcut need?"></textarea>
  <details class="ix-predict-reveal">
    <summary>Reveal reference reasoning</summary>
    <p>A slash command is a markdown file in <code>.claude/commands/</code> that loads a skill, handles <code>$ARGUMENTS</code> (everything typed after the command name), and provides the invocation bridge. Commands make skills discoverable via <code>/</code> autocomplete -- team members type <code>/</code> and see all available commands listed. The command file contains: which skill to invoke, how to handle the arguments, and what to do when no arguments are provided.</p>
  </details>
</div>

<p class="ix-instruct">Switch between tabs to compare command structure, the $ARGUMENTS variable, and when to use commands.</p>

<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="m07-command-structure">
  <span class="ix-title">Command File Anatomy</span>
  <div data-tab="Basic Command">
    <p>A minimal command that invokes a skill with <code>$ARGUMENTS</code>:</p>
    <pre><code># Security Review Command

Invoke the code-review-security skill to perform a security
review of the specified code.

Use the Skill tool with skill name "code-review-security".

If the user provided arguments ($ARGUMENTS), apply the review
to the files or code specified. If no arguments were provided,
ask the user which files to review.</code></pre>
    <p>Save as <code>.claude/commands/security-review.md</code>. Invoke with: <code>/security-review src/routes/auth.js</code></p>
  </div>
  <div data-tab="$ARGUMENTS Variable">
    <p><code>$ARGUMENTS</code> is a template variable that Claude Code replaces with everything the user typed after the command name.</p>
    <pre><code>/security-review src/routes/
  -> $ARGUMENTS = "src/routes/"

/security-review src/auth.js --verbose
  -> $ARGUMENTS = "src/auth.js --verbose"

/security-review
  -> $ARGUMENTS = "" (empty)</code></pre>
    <p>Commands can use <code>$ARGUMENTS</code> for file paths, task descriptions, configuration options, or any parameter that varies between invocations. Always handle the empty case.</p>
  </div>
  <div data-tab="When to Use Commands">
    <p><strong>Use commands when:</strong></p>
    <ul>
      <li>The skill is used frequently and the invocation pattern is consistent</li>
      <li>The skill requires specific setup or argument handling</li>
      <li>You want team discoverability via <code>/</code> autocomplete</li>
    </ul>
    <p><strong>Use direct skill invocation when:</strong></p>
    <ul>
      <li>The skill is used infrequently</li>
      <li>The invocation is one step in a larger multi-skill workflow</li>
      <li>You are orchestrating skills from another skill's body</li>
    </ul>
  </div>
</div>

<p class="ix-instruct">Review each entry to learn which command names are safe and which are reserved.</p>

<div class="ix-diagram" data-component="entry-list" data-diagram-id="m07-reserved-names">
  <span class="ix-title">Reserved Command Names -- Never Shadow These</span>
  <div class="ix-entry" data-badge="include">
    <span class="ix-entry-title">security-review</span>
    <span class="ix-entry-desc">Descriptive, unique -- no conflict with built-in commands</span>
  </div>
  <div class="ix-entry" data-badge="include">
    <span class="ix-entry-title">ship-feature</span>
    <span class="ix-entry-desc">Clearly describes a custom workflow</span>
  </div>
  <div class="ix-entry" data-badge="include">
    <span class="ix-entry-title">project-config</span>
    <span class="ix-entry-desc">Prefixed to avoid shadowing built-in <code>config</code></span>
  </div>
  <div class="ix-entry" data-badge="include">
    <span class="ix-entry-title">plugin-builder</span>
    <span class="ix-entry-desc">Prefixed to avoid shadowing built-in <code>plugin</code></span>
  </div>
  <div class="ix-entry" data-badge="exclude">
    <span class="ix-entry-title">plugin</span>
    <span class="ix-entry-desc">Shadows the native plugin system -- breaks marketplace access</span>
  </div>
  <div class="ix-entry" data-badge="exclude">
    <span class="ix-entry-title">help</span>
    <span class="ix-entry-desc">Shadows built-in help command</span>
  </div>
  <div class="ix-entry" data-badge="exclude">
    <span class="ix-entry-title">clear</span>
    <span class="ix-entry-desc">Shadows built-in clear screen</span>
  </div>
  <div class="ix-entry" data-badge="exclude">
    <span class="ix-entry-title">config</span>
    <span class="ix-entry-desc">Shadows built-in configuration command</span>
  </div>
  <div class="ix-entry" data-badge="exclude">
    <span class="ix-entry-title">mcp</span>
    <span class="ix-entry-desc">Shadows built-in MCP server management</span>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="warning">
  <p><strong>Never shadow built-in commands</strong>: Custom commands in <code>.claude/commands/</code> take precedence over built-in commands. Creating <code>/plugin.md</code> breaks the native plugin system -- plugin marketplace access, installation, and updates all stop working. Always use descriptive, unique names like <code>plugin-builder</code> instead of <code>plugin</code>.</p>
</div>

---

## 7.5 Skill Composition Patterns

<div class="ix-diagram" data-component="objective">
  <p>Apply pipeline, router, and multi-expert composition patterns to build multi-step workflows from individual skills.</p>
</div>

In Module 06 you orchestrated individual tools. Now you orchestrate entire skills -- each encapsulating the expertise of a specialist.

<p class="ix-instruct">Click each card to explore the three composition patterns.</p>

<div class="ix-diagram" data-component="click-cards" data-diagram-id="m07-composition-patterns">
  <span class="ix-title">Three Composition Patterns</span>
  <div class="ix-card" data-phase="act">
    <i data-lucide="arrow-right" class="ix-card-icon"></i>
    <span class="ix-card-label">Pipeline (Sequential)</span>
  </div>
  <div class="ix-card" data-phase="reason">
    <i data-lucide="git-branch" class="ix-card-icon"></i>
    <span class="ix-card-label">Router (Conditional)</span>
  </div>
  <div class="ix-card" data-phase="observe">
    <i data-lucide="users" class="ix-card-icon"></i>
    <span class="ix-card-label">Multi-Expert (Parallel)</span>
  </div>
  <!-- Detail panels -->
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="act">Pipeline (Sequential)</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">Pattern</div>
        <div class="ix-sec-text">Output of Skill A becomes input of Skill B. A linear chain where each skill processes and passes results forward.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Example</div>
        <div class="ix-sec-text"><code>security-review</code> -> <code>changelog-entry</code> -> <code>git-commit</code>. The review validates; the changelog documents; the commit records.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Gate condition</div>
        <div class="ix-sec-text">Stop on Critical findings -- the pipeline halts and reports rather than proceeding with known blockers.</div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="reason">Router (Conditional)</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">Pattern</div>
        <div class="ix-sec-text">An orchestrator evaluates the input and routes to different specialist skills based on the evaluation.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Example</div>
        <div class="ix-sec-text">Route by file path: auth files -> <code>security-review</code>, UI files -> <code>accessibility-review</code>, infra files -> <code>infrastructure-review</code>.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Routing criteria</div>
        <div class="ix-sec-text">Can be based on file paths, task content, user-provided flags, or any evaluable criterion.</div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="observe">Multi-Expert (Parallel)</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">Pattern</div>
        <div class="ix-sec-text">Multiple skills invoked simultaneously on the same input via the Agent tool. Outputs are synthesized and deduplicated.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Example</div>
        <div class="ix-sec-text">Three parallel agents: <code>security-review</code> + <code>performance-review</code> + <code>accessibility-review</code>. Findings merged by severity.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Trade-off</div>
        <div class="ix-sec-text">Higher token cost but faster and more comprehensive. Use when independent dimensions of analysis are needed and the quality gain justifies the cost.</div>
      </div>
    </div>
  </div>
</div>

<p class="ix-instruct">Step through the trace and read each annotation to understand the ship-feature pipeline in action.</p>

<div class="ix-diagram" data-component="agent-trace"
     data-variant="annotated"
     data-diagram-id="m07-pipeline-trace"
     data-default-mode="manual"
     data-speed="0.5">
  <span class="ix-title">Ship-Feature Pipeline in Action</span>
  <div class="ix-trace-row" data-type="prompt" data-delay="0">
    <span class="ix-trace-content">> /ship-feature src/auth/</span>
    <span class="ix-trace-note">Command invoked with $ARGUMENTS = src/auth/</span>
  </div>
  <div class="ix-trace-row" data-type="think" data-delay="4000">
    <span class="ix-trace-content">Phase 1: Launching parallel validation agents...</span>
    <span class="ix-trace-note">Parallel composition -- three independent analyses</span>
  </div>
  <div class="ix-trace-row" data-type="tool" data-delay="1500">
    <span class="ix-trace-content">Agent(skill="code-review-security", scope="src/auth/")</span>
    <span class="ix-trace-note">Sub-agent 1: security specialist</span>
  </div>
  <div class="ix-trace-row" data-type="tool" data-delay="1500">
    <span class="ix-trace-content">Agent(skill="test-coverage-check", scope="src/auth/")</span>
    <span class="ix-trace-note">Sub-agent 2: test coverage</span>
  </div>
  <div class="ix-trace-row" data-type="tool" data-delay="1500">
    <span class="ix-trace-content">Agent(skill="doc-completeness", scope="src/auth/")</span>
    <span class="ix-trace-note">Sub-agent 3: documentation</span>
  </div>
  <div class="ix-trace-row" data-type="result" data-delay="1500">
    <span class="ix-trace-content">-> Security: 0 Critical, 1 Medium. Tests: 94% coverage. Docs: complete.</span>
    <span class="ix-trace-note">All validations pass -- no blocking findings</span>
  </div>
  <div class="ix-trace-row" data-type="think" data-delay="4000">
    <span class="ix-trace-content">Phase 2: All validations passed. Proceeding to commit sequence.</span>
    <span class="ix-trace-note">Conditional gate: would halt here on Critical findings</span>
  </div>
  <div class="ix-trace-row" data-type="tool" data-delay="1500">
    <span class="ix-trace-content">Skill("changelog-entry") -> Added entry for auth improvements</span>
    <span class="ix-trace-note">Sequential composition -- changelog before commit</span>
  </div>
  <div class="ix-trace-row" data-type="tool" data-delay="1500">
    <span class="ix-trace-content">Skill("git-commit") -> commit abc1234</span>
    <span class="ix-trace-note">Commit only after changelog confirmed</span>
  </div>
  <div class="ix-trace-row" data-type="response" data-delay="2500">
    <span class="ix-trace-content">Feature shipped: abc1234. 1 non-blocking finding (Medium severity) for awareness.</span>
    <span class="ix-trace-note">Summary with non-blocking findings surfaced</span>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="tip">
  <p><strong>Start with pipeline, graduate to parallel</strong>: Pipeline composition is the simplest to reason about and debug. Add router logic when you have multiple specialist skills. Reach for parallel (multi-expert) composition only when independent analysis dimensions justify the additional token cost.</p>
</div>

<p class="ix-instruct">Click to expand each branch and determine whether a task needs a skill.</p>

<div class="ix-diagram" data-component="decision-tree" data-diagram-id="m07-skill-vs-prompt">
  <span class="ix-title">Does This Task Need a Skill?</span>
  <div class="ix-tree-root">
    <div class="ix-tree-node" data-question="true">Have you written this prompt (or similar) more than twice?</div>
    <div class="ix-tree-branch" data-label="Yes">
      <div class="ix-tree-node" data-question="true">Do multiple team members need the same capability?</div>
      <div class="ix-tree-branch" data-label="Yes">
        <div class="ix-tree-node" data-phase="success">Create a skill -- shared, reusable, versioned</div>
      </div>
      <div class="ix-tree-branch" data-label="No">
        <div class="ix-tree-node" data-question="true">Does the task require a systematic procedure?</div>
        <div class="ix-tree-branch" data-label="Yes">
          <div class="ix-tree-node" data-phase="success">Create a skill -- procedure ensures consistency</div>
        </div>
        <div class="ix-tree-branch" data-label="No">
          <div class="ix-tree-node" data-phase="neutral">One-off prompt is sufficient</div>
        </div>
      </div>
    </div>
    <div class="ix-tree-branch" data-label="No">
      <div class="ix-tree-node" data-question="true">Is the task simple enough for TCEF in the prompt?</div>
      <div class="ix-tree-branch" data-label="Yes">
        <div class="ix-tree-node" data-phase="neutral">One-off prompt is sufficient</div>
      </div>
      <div class="ix-tree-branch" data-label="No">
        <div class="ix-tree-node" data-question="true">Is the task highly context-specific to one conversation?</div>
        <div class="ix-tree-branch" data-label="Yes">
          <div class="ix-tree-node" data-phase="neutral">One-off prompt is sufficient</div>
        </div>
        <div class="ix-tree-branch" data-label="No">
          <div class="ix-tree-node" data-phase="perceive">Consider a skill for future reuse</div>
        </div>
      </div>
    </div>
  </div>
</div>

<p class="ix-instruct">Test your understanding of commands and composition patterns.</p>

<div class="ix-diagram" data-component="quiz" data-diagram-id="m07-composition-check" data-xp="15">
  <span class="ix-title">Knowledge Check: Commands and Composition</span>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q1.</strong> Where are global slash commands stored?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option"><code>.claude/commands/</code> (project-level)</button>
      <button class="ix-quiz-option" data-correct="true"><code>~/.claude/commands/</code> (global, available in all projects)</button>
      <button class="ix-quiz-option"><code>~/.claude/skills/</code></button>
      <button class="ix-quiz-option"><code>.claude/skills/</code></button>
    </div>
    <p class="ix-quiz-explanation">Global commands live in <code>~/.claude/commands/</code>, parallel to global skills in <code>~/.claude/skills/</code>. Project-level commands live in <code>.claude/commands/</code>. The same global-vs-project hierarchy applies to both skills and commands.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q2.</strong> In a pipeline composition, what should the command do when the security review finds a Critical finding?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">Continue to the next skill in the pipeline</button>
      <button class="ix-quiz-option">Log the finding and continue</button>
      <button class="ix-quiz-option" data-correct="true">Halt the pipeline and report the finding</button>
      <button class="ix-quiz-option">Retry the security review with different parameters</button>
    </div>
    <p class="ix-quiz-explanation">A Critical finding is a gate condition -- the pipeline halts and reports rather than proceeding. Committing code with known Critical vulnerabilities defeats the purpose of the security review step in the pipeline.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q3.</strong> When is parallel (multi-expert) composition appropriate?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">When subtasks depend on each other's outputs</button>
      <button class="ix-quiz-option" data-correct="true">When independent dimensions of analysis are needed and speed matters</button>
      <button class="ix-quiz-option">Always -- parallel is inherently better than sequential</button>
      <button class="ix-quiz-option">Only when the Agent tool is available</button>
    </div>
    <p class="ix-quiz-explanation">Parallel composition works when analyses are independent -- security, performance, and accessibility reviews do not depend on each other's outputs. The trade-off is higher token cost. If subtasks depend on each other, sequential (pipeline) composition is required.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q4.</strong> A command file is saved as <code>.claude/commands/config.md</code>. A team member types <code>/config</code>. What happens?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">The custom command runs, displaying project configuration</button>
      <button class="ix-quiz-option">Claude Code's built-in config command runs</button>
      <button class="ix-quiz-option" data-correct="true">The custom command shadows the built-in config command, breaking native configuration access</button>
      <button class="ix-quiz-option">Claude Code shows both options and lets the user choose</button>
    </div>
    <p class="ix-quiz-explanation">Custom commands take precedence over built-in commands -- this is the shadowing problem covered in section 7.4. The native <code>/config</code> command becomes inaccessible. Always use unique, descriptive names like <code>project-config</code> to avoid breaking native functionality.</p>
  </div>
</div>

<details class="ix-collapse">
<summary>Deep Dive: The full ship-feature pipeline</summary>
<div class="ix-collapse-body">
<p>A complete <code>ship-feature</code> command illustrates all three composition patterns working together:</p>
<p><strong>Phase 1: Validation (Parallel)</strong> -- Launch three parallel agents to simultaneously check security, test coverage, and documentation completeness. If any validation finds blocking issues (Critical severity or missing required docs), halt and report. Do not proceed until the user resolves all blockers.</p>
<p><strong>Phase 2: Commit (Sequential)</strong> -- Once all validations pass, apply the <code>changelog-entry</code> skill to draft the entry, show it to the user for confirmation, then apply the <code>git-commit</code> skill to create the commit with a conventional commit message.</p>
<p><strong>Phase 3: Summary</strong> -- Report the commit hash, changelog entry, and any non-blocking findings from Phase 1 for awareness.</p>
<p>This single command uses parallel composition in Phase 1, conditional halting based on validation results, sequential composition in Phase 2, and an explicit approval gate before committing. The pattern scales: add more validation agents to Phase 1 without changing the pipeline structure.</p>
</div>
</details>

---

## Lab Connection

**Lab 06** is the direct hands-on companion for this module. You will build and refine skills and slash commands, then compose them into small workflows with explicit constraints and output contracts.

---

## Further Reading

- [Claude Code Slash Commands Reference](https://docs.anthropic.com/en/docs/claude-code/slash-commands)
- [Claude Code Memory and Skills](https://docs.anthropic.com/en/docs/claude-code/memory)
- [Claude Code Settings and Project Configuration](https://docs.anthropic.com/en/docs/claude-code/settings)

---

[Previous Module: Module 06](/module/06) | [Next Module: Module 08](/module/08)
