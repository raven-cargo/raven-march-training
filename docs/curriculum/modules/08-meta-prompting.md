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

## 8.1 What Is Meta-Prompting?

<div class="ix-diagram" data-component="objective">
  <p>Explain meta-prompting as "prompts that generate/evaluate prompts" and distinguish the three applications: generation, evaluation, improvement.</p>
</div>

You used the TCEF pattern in Module 04 to write precise prompts. Meta-prompting applies TCEF at a higher level of abstraction.

<p class="ix-instruct">Write your prediction, then reveal the reference reasoning.</p>

<div class="ix-diagram" data-component="predict-reveal" data-diagram-id="m08-meta-concept-predict" data-xp="8">
  <span class="ix-title">Predict Before You Learn</span>
  <p class="ix-predict-prompt">You have been writing TCEF prompts by hand. Imagine you need to create 10 different code review skill files for 10 different review dimensions (security, performance, accessibility, etc.). What approach could make this faster and more consistent than writing each one manually?</p>
  <textarea class="ix-predict-input" aria-label="Your prediction" placeholder="Write your reasoning -- what approach would you try and why?"></textarea>
  <details class="ix-predict-reveal">
    <summary>Reveal reference reasoning</summary>
    <p>Meta-prompting -- using Claude to generate structured prompts given a specification. The meta-prompt is itself a TCEF prompt whose Task is "generate a TCEF prompt for [domain]." This works because LLMs are exceptionally capable at generating structured instructional text. One meta-prompt invocation can produce five complete skill files with consistent structure, where manual authoring would take hours and drift in format across authors.</p>
  </details>
</div>

<p class="ix-instruct">Switch between tabs to compare the three applications of meta-prompting.</p>

<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="m08-three-applications">
  <span class="ix-title">Three Applications of Meta-Prompting</span>
  <div data-tab="Generation">
    <p><strong>Using Claude to write prompts for specific tasks.</strong> You provide a goal, target audience, and constraints. Claude produces a complete TCEF prompt or skill file as output.</p>
    <div class="ix-char-grid">
      <div class="ix-char-item" data-phase="perceive"><strong>Input</strong><span>Task domain description, target audience, constraints, desired output structure (e.g., TCEF format).</span></div>
      <div class="ix-char-item" data-phase="observe"><strong>Output</strong><span>A complete, ready-to-use TCEF prompt or skill file. First drafts typically reach 70-80% quality.</span></div>
    </div>
    <p class="ix-note"><strong>Best for</strong>: Bootstrapping prompt libraries, entering new domains, producing multiple similar prompts quickly.</p>
  </div>
  <div data-tab="Evaluation">
    <p><strong>Using Claude to find failure modes, gaps, and ambiguities in existing prompts.</strong> Claude adopts an adversarial perspective: "Given this prompt, what will go wrong?"</p>
    <div class="ix-char-grid">
      <div class="ix-char-item" data-phase="perceive"><strong>Input</strong><span>An existing prompt or skill file, plus evaluation criteria (optional but recommended).</span></div>
      <div class="ix-char-item" data-phase="observe"><strong>Output</strong><span>A structured critique with specific issues and specific fixes -- not generic advice like "add more context."</span></div>
    </div>
    <p class="ix-note"><strong>Best for</strong>: Improving existing prompts, finding blind spots, quality assurance before adding skills to a library.</p>
  </div>
  <div data-tab="Improvement">
    <p><strong>Applying evaluation findings to revise a prompt.</strong> Claude takes the original prompt plus the evaluation output and produces an improved version that addresses each finding.</p>
    <div class="ix-char-grid">
      <div class="ix-char-item" data-phase="perceive"><strong>Input</strong><span>Original prompt + evaluation scorecard with PASS/PARTIAL/FAIL ratings and specific issues.</span></div>
      <div class="ix-char-item" data-phase="observe"><strong>Output</strong><span>Revised prompt with all FAIL and PARTIAL findings addressed. Quality typically improves to 85-95%.</span></div>
    </div>
    <p class="ix-note"><strong>Best for</strong>: Combining with generation and evaluation into an automated generate-evaluate-improve loop.</p>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="key-concept">
  <p><strong>Meta-prompting is metaprogramming</strong>: If prompts are programs that instruct LLMs, then meta-prompts are programs that write programs. The leverage point: LLMs excel at generating structured text, including structured instructional text like TCEF prompts and skill files.</p>
</div>

<p class="ix-instruct">Review each entry to learn what meta-prompting is NOT.</p>

<div class="ix-diagram" data-component="entry-list" data-diagram-id="m08-meta-is-not">
  <span class="ix-title">What Meta-Prompting Is NOT</span>
  <div class="ix-entry" data-badge="exclude">
    <span class="ix-entry-title">A substitute for domain expertise</span>
    <span class="ix-entry-desc">The human judgment layer is non-negotiable. Meta-prompted prompts in security, compliance, or safety domains require expert review before deployment.</span>
  </div>
  <div class="ix-entry" data-badge="exclude">
    <span class="ix-entry-title">A guarantee of prompt quality</span>
    <span class="ix-entry-desc">LLMs can generate plausible-sounding but ineffective prompts. Structural correctness does not equal domain accuracy.</span>
  </div>
  <div class="ix-entry" data-badge="exclude">
    <span class="ix-entry-title">Autonomous prompt development</span>
    <span class="ix-entry-desc">Generated prompts require testing and refinement. No meta-prompting workflow removes the need for human validation.</span>
  </div>
  <div class="ix-entry" data-badge="exclude">
    <span class="ix-entry-title">A one-shot solution</span>
    <span class="ix-entry-desc">Meta-prompted prompts need iteration like any prompt. The first draft is a starting point, not a finished product.</span>
  </div>
</div>

<details class="ix-collapse">
<summary>Deep Dive: The metaprogramming analogy</summary>
<div class="ix-collapse-body">
<p>The relationship between prompts and meta-prompts mirrors the relationship between programs and metaprograms in software engineering. A program computes a result from input data. A metaprogram generates or transforms programs. Similarly, a prompt directs an LLM to produce a result, while a meta-prompt directs an LLM to generate or transform other prompts.</p>
<p>This analogy is not merely decorative. It carries practical implications: just as metaprograms inherit the limitations of the language they target, meta-prompts inherit the limitations of the LLM that executes them. A meta-prompt cannot generate a prompt that exceeds the generating model's understanding of the domain. The output quality ceiling is bounded by the model's training distribution.</p>
<p>The three applications -- generation, evaluation, improvement -- can be used independently or combined into a semi-automated loop. The loop pattern (generate, then evaluate, then improve, then re-evaluate) typically converges in two to three iterations. The human role is reviewing the final output to confirm technical accuracy and fitness for purpose.</p>
</div>
</details>

---

## 8.2 Prompt Generation

<div class="ix-diagram" data-component="objective">
  <p>Write meta-prompts that generate complete TCEF prompts and skill files for specific task domains.</p>
</div>

The simplest application of meta-prompting is asking Claude to write a prompt for a specific task. The key is providing enough specification to produce focused, high-quality output rather than generic text.

<p class="ix-instruct">Step through the sequence to see how the prompt generation pattern works.</p>

<div class="ix-diagram" data-component="step-walkthrough" data-diagram-id="m08-generation-pattern">
  <span class="ix-title">The Prompt Generation Pattern</span>
  <div class="ix-step" data-step="1">
    <span class="ix-step-label">Specify the meta-prompt</span>
    <div class="ix-step-body">
      <p>Write a TCEF meta-prompt whose <strong>Task</strong> is generating a TCEF prompt. Provide: task description, target audience, constraints, and output format (the TCEF structure itself). The meta-prompt is itself a TCEF prompt operating one level of abstraction above the target.</p>
    </div>
  </div>
  <div class="ix-step" data-step="2">
    <span class="ix-step-label">Provide domain specifics</span>
    <div class="ix-step-body">
      <p>Include the domain, the expert role, the review dimensions, or whatever domain detail the target prompt needs. The more specific the domain input, the less generic the output. "Generate a security review skill" produces weaker output than "Generate a security review skill covering OWASP Top 10 categories for Node.js Express APIs."</p>
    </div>
  </div>
  <div class="ix-step" data-step="3">
    <span class="ix-step-label">Request complete output</span>
    <div class="ix-step-body">
      <p>Instruct: "Generate the complete prompt ready to use, not a template with placeholders." Without this constraint, Claude defaults to producing templates with bracketed placeholders that require manual filling -- defeating the purpose of meta-prompting.</p>
    </div>
  </div>
  <div class="ix-step" data-step="4">
    <span class="ix-step-label">Review and refine</span>
    <div class="ix-step-body">
      <p>The output is a first draft at 70-80% quality. A domain expert review catches the remaining 20-30% -- the tacit knowledge, edge cases, and domain nuances that distinguish an expert-authored skill from a competent one.</p>
    </div>
  </div>
</div>

<p class="ix-instruct">Compare the two approaches side by side.</p>

<div class="ix-diagram" data-component="compare" data-diagram-id="m08-manual-vs-meta">
  <span class="ix-title">Manual vs Meta-Prompted Skill Generation</span>
  <div class="ix-compare-left" data-label="Manual Authoring">
    <ul>
      <li>Engineer writes one skill file in 30-45 minutes</li>
      <li>Full domain expertise applied from the start</li>
      <li>Format and style inconsistent across authors</li>
      <li>Scales linearly -- 10 skills = 10x the effort</li>
      <li>Quality depends entirely on the individual author</li>
    </ul>
  </div>
  <div class="ix-compare-right" data-label="Meta-Prompted">
    <ul>
      <li>Meta-prompt generates 5 skill files in one invocation</li>
      <li>Consistent structure and format across all outputs</li>
      <li>Requires expert review for domain accuracy (20-30% gap)</li>
      <li>Scales logarithmically -- 10 skills = ~2x the effort</li>
      <li>Quality floor is higher, but ceiling requires human refinement</li>
    </ul>
  </div>
</div>

<p class="ix-instruct">Watch the trace replay to see a meta-prompt generating a skill file.</p>

<div class="ix-diagram" data-component="agent-trace"
     data-variant="terminal"
     data-diagram-id="m08-generation-trace"
     data-speed="0.5">
  <span class="ix-title">Meta-Prompt Generating a Security Review Skill</span>
  <div class="ix-trace-row" data-type="prompt" data-delay="0">
    <span class="ix-trace-content">> Generate a complete skill file for security code review of Node.js APIs. Cover OWASP Top 10, include severity taxonomy, one Critical example finding, three anti-patterns. YAML frontmatter with name, description, version, plus optional LUXOR-specific triggers metadata.</span>
  </div>
  <div class="ix-trace-row" data-type="think" data-delay="3500">
    <span class="ix-trace-content">Generating skill file. Role: senior AppSec engineer specializing in Node.js. Mapping OWASP categories to Express/Fastify API patterns...</span>
  </div>
  <div class="ix-trace-row" data-type="think" data-delay="3500">
    <span class="ix-trace-content">Building procedure: 1) identify attack surface, 2) check injection vectors, 3) review auth/session management, 4) check data exposure, 5) review dependencies, 6) produce findings with severity.</span>
  </div>
  <div class="ix-trace-row" data-type="think" data-delay="3500">
    <span class="ix-trace-content">Generating example: Critical SQL injection finding at src/api/users.ts:47 with file path, line number, severity, description, and remediation steps.</span>
  </div>
  <div class="ix-trace-row" data-type="response" data-delay="2500">
    <span class="ix-trace-content">Generated complete skill file: code-review-security (v1.0.0). 4 sections: Role, Procedure (6 steps), Example (1 Critical finding), Anti-patterns (3). Ready for domain expert review.</span>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="tip">
  <p><strong>The bootstrapping pattern</strong>: When entering a new domain where you lack deep expertise, use meta-prompting to generate a first batch of skill files. Use the best ones as examples in subsequent iterations. The library does not need to be complete before it is useful -- ten well-crafted skills beat forty shallow ones. If your organization uses <code>triggers</code>, treat it as project metadata (for example, LUXOR convention), not a native Claude Code runtime field.</p>
</div>

<details class="ix-collapse">
<summary>Deep Dive: Template generation and the bootstrapping pattern</summary>
<div class="ix-collapse-body">
<p>When you need a class of prompts rather than a single prompt -- say, code review prompts for ten different aspects of code quality -- template generation provides the scaffold. A single meta-prompt can generate all ten specialized prompts in one invocation by providing the dimensions as a list and instructing Claude to generate a fully instantiated prompt for each dimension.</p>
<p>The bootstrapping pattern extends this to new domains where you lack deep expertise. The five-step process: (1) write a high-quality meta-prompt that understands the TCEF structure, (2) provide it with a domain description and task list, (3) generate a first batch of prompts, (4) review, select, and refine the best ones, (5) use the best ones as examples in the next meta-prompting iteration. Each iteration improves because the meta-prompt now has real examples of what "good" looks like in this domain.</p>
<p>The output is never final -- it requires review by someone with domain expertise, or testing against real inputs. But it produces a usable starting point across multiple task types simultaneously, with domain-specific detail that a non-expert would struggle to supply manually.</p>
</div>
</details>

---

## 8.3 Prompt Evaluation

<div class="ix-diagram" data-component="objective">
  <p>Write evaluation meta-prompts that find failure modes, gaps, and ambiguities in existing prompts using both adversarial and criteria-based approaches.</p>
</div>

Prompt evaluation is, in many cases, more valuable than prompt generation. A well-designed evaluation meta-prompt surfaces failure modes that the prompt author is too close to see.

<p class="ix-instruct">Write your prediction, then reveal the reference reasoning.</p>

<div class="ix-diagram" data-component="predict-reveal" data-diagram-id="m08-evaluation-predict" data-xp="8">
  <span class="ix-title">Predict Before You Learn</span>
  <p class="ix-predict-prompt">You have a skill file that your team has been using for three months. It works "well enough" but occasionally produces inconsistent output. Rather than rewriting it from scratch, what approach could you take to systematically identify what is wrong with it?</p>
  <textarea class="ix-predict-input" aria-label="Your prediction" placeholder="Write your reasoning -- what approach would you try and why?"></textarea>
  <details class="ix-predict-reveal">
    <summary>Reveal reference reasoning</summary>
    <p>Prompt evaluation -- using Claude in adversarial mode to find failure modes. Two approaches work well: (1) open-ended failure mode finding, where you ask Claude "given this prompt, what will go wrong?" and receive specific issues with specific fixes, and (2) criteria-based evaluation, where you provide explicit quality criteria (role precision, procedure completeness, example quality, anti-pattern specificity, format specification) and receive a PASS/PARTIAL/FAIL scorecard with evidence for each criterion. The criteria-based approach is more systematic and produces more actionable output.</p>
  </details>
</div>

<p class="ix-instruct">Switch between tabs to compare the two evaluation approaches.</p>

<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="m08-evaluation-approaches">
  <span class="ix-title">Two Evaluation Approaches</span>
  <div data-tab="Failure Mode Finding">
    <p><strong>Adversarial perspective: "What will go wrong with this prompt?"</strong></p>
    <p>Ask Claude to adopt an adversarial role and identify specific issues. For each issue, require: (1) the type of failure (ambiguity, missing context, underspecified format, missing constraint), (2) what a model would likely do incorrectly as a result, and (3) the specific text change that would fix the issue.</p>
    <div class="ix-char-grid">
      <div class="ix-char-item" data-phase="observe"><strong>Output format</strong><span>A list of specific issues, each with failure type, predicted wrong behavior, and exact fix. No generic advice.</span></div>
    </div>
    <p class="ix-note"><strong>Best for</strong>: Discovering unknown failure modes -- issues you did not know to look for.</p>
  </div>
  <div data-tab="Criteria-Based Evaluation">
    <p><strong>Explicit quality criteria with PASS/PARTIAL/FAIL ratings.</strong></p>
    <p>Provide criteria such as role precision, procedure completeness, example quality, anti-pattern specificity, format specification, and severity taxonomy. Claude evaluates the prompt against each criterion and provides evidence from the prompt text for each rating.</p>
    <div class="ix-char-grid">
      <div class="ix-char-item" data-phase="observe"><strong>Output format</strong><span>A scorecard: each criterion rated PASS/PARTIAL/FAIL with specific evidence and recommended changes.</span></div>
    </div>
    <p class="ix-note"><strong>Best for</strong>: Systematic quality assurance. Produces a repeatable, comparable evaluation across prompts.</p>
  </div>
</div>

<p class="ix-instruct">Step through the trace and read each annotation to understand how criteria-based evaluation works.</p>

<div class="ix-diagram" data-component="agent-trace"
     data-variant="annotated"
     data-diagram-id="m08-evaluation-trace"
     data-default-mode="manual"
     data-speed="0.5">
  <span class="ix-title">Evaluating an Existing Skill File</span>
  <div class="ix-trace-row" data-type="prompt" data-delay="0">
    <span class="ix-trace-content">> Evaluate this skill file against quality criteria: role precision, procedure completeness, example quality, anti-pattern specificity, format specification.</span>
    <span class="ix-trace-note">Criteria-based evaluation meta-prompt with five explicit quality dimensions.</span>
  </div>
  <div class="ix-trace-row" data-type="think" data-delay="4000">
    <span class="ix-trace-content">Evaluating role precision... "You are a security engineer" is too generic. Does not specify OWASP expertise or Node.js focus.</span>
    <span class="ix-trace-note">PARTIAL -- role should uniquely identify the expertise domain. Could apply to any security task.</span>
  </div>
  <div class="ix-trace-row" data-type="think" data-delay="4000">
    <span class="ix-trace-content">Evaluating procedure... 4 steps but missing dependency review step and output production step.</span>
    <span class="ix-trace-note">PARTIAL -- procedure incomplete. A practitioner following only these steps would miss dependency vulnerabilities.</span>
  </div>
  <div class="ix-trace-row" data-type="think" data-delay="4000">
    <span class="ix-trace-content">Evaluating example... Example shows Critical finding but input is not specified. Cannot reproduce the scenario.</span>
    <span class="ix-trace-note">FAIL -- example needs both input and output to be unambiguous. Output-only examples leave interpretation open.</span>
  </div>
  <div class="ix-trace-row" data-type="think" data-delay="4000">
    <span class="ix-trace-content">Evaluating anti-patterns... "Don't flag style issues" is good. But only 1 anti-pattern, need 3+.</span>
    <span class="ix-trace-note">PARTIAL -- too few anti-patterns. Three is the minimum for meaningful constraint.</span>
  </div>
  <div class="ix-trace-row" data-type="response" data-delay="2500">
    <span class="ix-trace-content">Evaluation complete: 0 PASS, 3 PARTIAL, 1 FAIL. Priority fix: Example section needs complete input/output pair.</span>
    <span class="ix-trace-note">Actionable scorecard with specific fixes, prioritized by severity. FAIL items first.</span>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="core-idea">
  <p><strong>Evaluation is often more valuable than generation</strong>: A well-designed evaluation meta-prompt surfaces failure modes the author is too close to see. The output is a specific, actionable critique -- not generic advice like "add more context." Evaluation catches the 20-30% quality gap that generation alone cannot close.</p>
</div>

---

## 8.4 The Generate-Evaluate-Improve Loop

<div class="ix-diagram" data-component="objective">
  <p>Combine generation and evaluation into a semi-automated loop that converges on high-quality prompts in 2-3 iterations.</p>
</div>

The three applications from Section 8.1 combine into a single repeatable workflow. Each iteration narrows the quality gap until only human domain judgment remains.

<p class="ix-instruct">Predict the most likely bottleneck before stepping through the loop.</p>

<div class="ix-diagram" data-component="predict-reveal" data-diagram-id="m08-loop-bottleneck-predict" data-xp="8">
  <span class="ix-title">Predict: Where Does Iteration Stall?</span>
  <p class="ix-predict-prompt">A team generated v1 and v2 prompts, but quality stopped improving. The evaluation output says: "better wording" and "more polished tone," with no concrete failures. What should they do next?</p>
  <textarea class="ix-predict-input" aria-label="Your prediction" placeholder="Write your next action and why..."></textarea>
  <details class="ix-predict-reveal">
    <summary>Reveal reference reasoning</summary>
    <p>Stop looping and switch to real-case testing. If evaluation feedback becomes stylistic instead of identifying concrete failures, the loop has converged. Further meta-iteration yields diminishing returns. Move to representative task runs, compare outputs against expected behavior, and involve a domain reviewer for accuracy checks.</p>
  </details>
</div>

<p class="ix-instruct">Step through the sequence to see each phase of the loop.</p>

<div class="ix-diagram" data-component="step-walkthrough" data-diagram-id="m08-gei-loop">
  <span class="ix-title">The Generate-Evaluate-Improve Loop</span>
  <div class="ix-step" data-step="1">
    <span class="ix-step-label">Generate</span>
    <div class="ix-step-body">
      <p>A meta-prompt produces the first draft skill file. Quality is typically 70-80%. The structure is correct, but domain-specific nuances may be shallow or slightly off.</p>
    </div>
  </div>
  <div class="ix-step" data-step="2">
    <span class="ix-step-label">Evaluate</span>
    <div class="ix-step-body">
      <p>An evaluation meta-prompt applies quality criteria and produces a PASS/PARTIAL/FAIL scorecard with specific issues. The evaluation identifies what the generation step got wrong or left incomplete.</p>
    </div>
  </div>
  <div class="ix-step" data-step="3">
    <span class="ix-step-label">Improve</span>
    <div class="ix-step-body">
      <p>An improvement meta-prompt takes the original prompt plus the evaluation output and applies all FAIL and PARTIAL findings. The result is v2 -- typically 85-90% quality.</p>
    </div>
  </div>
  <div class="ix-step" data-step="4">
    <span class="ix-step-label">Re-evaluate</span>
    <div class="ix-step-body">
      <p>The same evaluation criteria run against v2. Check for regressions -- did the improvements introduce new problems? The loop typically converges in 2-3 iterations.</p>
    </div>
  </div>
  <div class="ix-step" data-step="5">
    <span class="ix-step-label">Human Review</span>
    <div class="ix-step-body">
      <p>A domain expert confirms technical accuracy. The loop generates candidates; engineers select and validate. This step is non-negotiable -- automated evaluation cannot fully replace domain judgment.</p>
    </div>
  </div>
</div>

<p class="ix-instruct">Watch the trace replay to see the loop execute across two iterations.</p>

<div class="ix-diagram" data-component="agent-trace"
     data-variant="prao"
     data-diagram-id="m08-loop-trace"
     data-speed="0.5">
  <span class="ix-title">Generate-Evaluate-Improve: Two Iterations</span>
  <div class="ix-trace-row" data-type="prompt" data-delay="0">
    <span class="ix-trace-content">> Generate a TCEF skill for database query optimization review.</span>
  </div>
  <div class="ix-trace-row" data-type="think" data-delay="3500">
    <span class="ix-trace-content">Generating skill v1: Role=DBA specializing in PostgreSQL. 4-step procedure. 1 example with EXPLAIN output. 2 anti-patterns.</span>
  </div>
  <div class="ix-trace-row" data-type="response" data-delay="2500">
    <span class="ix-trace-content">v1 generated. Skill file complete. Now evaluating against quality criteria...</span>
  </div>
  <div class="ix-trace-row" data-type="prompt" data-delay="2000">
    <span class="ix-trace-content">> Evaluate v1 against criteria: role precision, procedure completeness, example quality, anti-pattern specificity, format specification.</span>
  </div>
  <div class="ix-trace-row" data-type="think" data-delay="3500">
    <span class="ix-trace-content">v1 evaluation: Role PASS. Procedure PARTIAL -- missing index analysis step. Example FAIL -- uses placeholder data, not realistic EXPLAIN output. Anti-patterns PARTIAL -- only 2, need 3+.</span>
  </div>
  <div class="ix-trace-row" data-type="response" data-delay="2500">
    <span class="ix-trace-content">Evaluation: 1 PASS, 2 PARTIAL, 1 FAIL. Priority fix: replace placeholder example with realistic query plan.</span>
  </div>
  <div class="ix-trace-row" data-type="prompt" data-delay="2000">
    <span class="ix-trace-content">> Improve v1: add index analysis step, replace placeholder example with realistic EXPLAIN output, add third anti-pattern.</span>
  </div>
  <div class="ix-trace-row" data-type="think" data-delay="3500">
    <span class="ix-trace-content">Adding index analysis as step 3. Replacing placeholder with real EXPLAIN showing Seq Scan on orders table. Adding anti-pattern: "Do not recommend indexes without checking write frequency."</span>
  </div>
  <div class="ix-trace-row" data-type="response" data-delay="2500">
    <span class="ix-trace-content">v2 generated. Re-evaluation: 4 PASS, 1 PARTIAL. Converging. Ready for domain expert review.</span>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="tip">
  <p><strong>Know when to stop iterating</strong>: Stop when evaluation returns all PASS, when a domain expert confirms accuracy, or when three successive improvements produce only stylistic suggestions. At that point, testing the prompt against real cases is more valuable than further meta-level iteration.</p>
</div>

<p class="ix-instruct">Step through the handoff to see how Module 08 outputs become Module 09 building blocks.</p>

<div class="ix-diagram" data-component="step-walkthrough" data-diagram-id="m08-to-m09-bridge">
  <span class="ix-title">From Meta-Prompt to Multi-Agent Specialist</span>
  <div class="ix-step" data-step="1">
    <span class="ix-step-label">Generate the specialist artifact</span>
    <div class="ix-step-body">
      <p>Use a meta-prompt to generate a first-draft skill file, review rubric, or structured output contract for one specialist role -- security reviewer, documentation auditor, dependency checker, or another bounded responsibility.</p>
    </div>
  </div>
  <div class="ix-step" data-step="2">
    <span class="ix-step-label">Evaluate against a stable rubric</span>
    <div class="ix-step-body">
      <p>Run criteria-based evaluation until the artifact has no blocking FAIL items. The goal is not stylistic polish; it is a specialist artifact another engineer could trust as a repeatable briefing.</p>
    </div>
  </div>
  <div class="ix-step" data-step="3">
    <span class="ix-step-label">Freeze the interface</span>
    <div class="ix-step-body">
      <p>Lock down the input expectations and output shape. In multi-agent systems, this becomes the contract the orchestrator relies on when it dispatches work and aggregates results.</p>
    </div>
  </div>
  <div class="ix-step" data-step="4">
    <span class="ix-step-label">Assign the artifact to a role</span>
    <div class="ix-step-body">
      <p>Module 09 does not start from a blank specialist. It starts from the reusable artifacts created here: a skill file loaded into a sub-agent, an evaluation rubric used by a reviewer, or a structured schema used by the orchestrator.</p>
    </div>
  </div>
  <div class="ix-step" data-step="5">
    <span class="ix-step-label">Pilot the orchestration</span>
    <div class="ix-step-body">
      <p>Run a small fan-out with one orchestrator and two or three specialists. If the aggregation breaks, the problem is usually not "multi-agent magic" -- it is an interface that was never made explicit during the meta-prompting phase.</p>
    </div>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="core-idea">
  <p><strong>Module 08 feeds Module 09 directly</strong>: The highest-value output of meta-prompting is a reusable specialist artifact with a stable interface. Once a prompt, skill, or rubric is reliable enough to survive evaluation, it becomes a sub-agent role, routing target, or aggregation contract in a multi-agent system.</p>
</div>

<details class="ix-collapse">
<summary>Deep Dive: Practical convergence rubric for teams</summary>
<div class="ix-collapse-body">
<p>Use this three-part rubric before declaring convergence: (1) <strong>Defect signal</strong> -- no unresolved FAIL items and no new high-impact regressions in the latest evaluation pass; (2) <strong>Stability signal</strong> -- two consecutive iterations produce only low-impact wording suggestions; (3) <strong>Transfer signal</strong> -- representative real tasks produce outputs consistent with expected structure and quality. If any signal fails, continue with a focused improvement pass instead of broad prompt rewrites.</p>
<p>Most teams over-iterate because they chase style polish. Separate stylistic preference from functional defects. If the output contract is met and decision quality is stable across representative inputs, ship to controlled use and collect real feedback.</p>
</div>
</details>

<p class="ix-instruct">Check your understanding of loop execution and convergence criteria.</p>

<div class="ix-diagram" data-component="quiz" data-diagram-id="m08-loop-knowledge-check" data-xp="14">
  <span class="ix-title">Knowledge Check: Generate-Evaluate-Improve Loop</span>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q1.</strong> Which condition most strongly indicates the loop has converged?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">The output uses the same tone in every iteration</button>
      <button class="ix-quiz-option" data-correct="true">Evaluations surface no substantive failures, only stylistic suggestions</button>
      <button class="ix-quiz-option">The generated prompt exceeds 500 words</button>
      <button class="ix-quiz-option">The model stops using tool calls</button>
    </div>
    <p class="ix-quiz-explanation">Convergence is about quality signal, not length or style. When evaluations stop finding actionable defects, further looping is low value compared to real-case testing.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q2.</strong> In the loop, why is criteria-based evaluation usually preferred for team workflows?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">It always produces fewer findings</button>
      <button class="ix-quiz-option">It removes the need for domain experts</button>
      <button class="ix-quiz-option" data-correct="true">It yields repeatable PASS/PARTIAL/FAIL evidence that teams can compare over time</button>
      <button class="ix-quiz-option">It guarantees the first generated prompt is production-ready</button>
    </div>
    <p class="ix-quiz-explanation">Criteria-based scoring creates a stable rubric. Teams can track quality movement between versions instead of relying on subjective judgments.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q3.</strong> A team fixes all PARTIAL items but leaves one FAIL item unresolved. Should they proceed to production?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">Yes, because most criteria now pass</button>
      <button class="ix-quiz-option" data-correct="true">No, FAIL items are blocking and must be resolved or explicitly accepted with risk review</button>
      <button class="ix-quiz-option">Yes, if they add one more anti-pattern</button>
      <button class="ix-quiz-option">No, unless the prompt is under 300 words</button>
    </div>
    <p class="ix-quiz-explanation">A FAIL is a known defect in behavior quality. Treat FAIL as a release gate issue, not a cosmetic enhancement.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q4.</strong> After loop convergence, what is the highest-value next step?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">Regenerate from scratch with a different tone</button>
      <button class="ix-quiz-option">Increase model temperature for diversity</button>
      <button class="ix-quiz-option" data-correct="true">Run representative real tasks and compare outputs to expected outcomes</button>
      <button class="ix-quiz-option">Convert the prompt into three shorter prompts automatically</button>
    </div>
    <p class="ix-quiz-explanation">Real-task validation is where latent failures appear. Loop quality without execution evidence is incomplete for production use.</p>
  </div>
</div>

---

## 8.5 Limits of Meta-Prompting

<div class="ix-diagram" data-component="objective">
  <p>Recognize when direct prompting is better than meta-prompting and identify the confabulation risk in meta-prompted prompts.</p>
</div>

Meta-prompting provides genuine leverage in the scenarios above. It also has real limitations that engineering teams must understand to avoid misapplying it.

<p class="ix-instruct">Predict the safer choice before opening the decision tree.</p>

<div class="ix-diagram" data-component="predict-reveal" data-diagram-id="m08-limits-predict" data-xp="8">
  <span class="ix-title">Predict: Direct Prompt or Meta-Prompt?</span>
  <p class="ix-predict-prompt">You need one high-stakes compliance summary for a board meeting tomorrow. The domain has strict legal terminology and your legal reviewer is available. Do you start with meta-prompting or direct prompting?</p>
  <textarea class="ix-predict-input" aria-label="Your prediction" placeholder="State your choice and risk rationale..."></textarea>
  <details class="ix-predict-reveal">
    <summary>Reveal reference reasoning</summary>
    <p>Start with direct prompting plus legal reviewer validation. For single, high-stakes outputs with strict domain language, meta-prompting overhead and confabulation risk often outweigh leverage. Meta-prompting helps when you need a reusable family of prompts; this scenario needs one precise deliverable under tight risk constraints.</p>
  </details>
</div>

<p class="ix-instruct">Click to expand each branch and determine whether meta-prompting or direct prompting is the better choice.</p>

<div class="ix-diagram" data-component="decision-tree" data-diagram-id="m08-when-direct">
  <span class="ix-title">Direct Prompting vs Meta-Prompting</span>
  <div class="ix-tree-node" data-node-id="root" data-question="Is the task simple and concrete (1-2 sentences, obvious format)?">
    <div class="ix-tree-branch" data-answer="Yes" data-target="direct-simple" data-phase="success">
      <span class="ix-tree-endpoint">Direct prompting is faster. The meta-prompting overhead exceeds the benefit for simple, bounded tasks.</span>
    </div>
    <div class="ix-tree-branch" data-answer="No" data-target="q2">
      <div class="ix-tree-node" data-node-id="q2" data-question="Does the task require deep tacit domain expertise?">
        <div class="ix-tree-branch" data-answer="Yes" data-target="direct-expert" data-phase="success">
          <span class="ix-tree-endpoint">Direct prompting by a domain expert produces higher quality. Tacit knowledge cannot be fully captured in a meta-prompt specification.</span>
        </div>
        <div class="ix-tree-branch" data-answer="No" data-target="q3">
          <div class="ix-tree-node" data-node-id="q3" data-question="Do you need multiple prompts for similar tasks?">
            <div class="ix-tree-branch" data-answer="Yes" data-target="meta-leverage" data-phase="act">
              <span class="ix-tree-endpoint">Meta-prompting provides leverage. Consistent structure across prompts, logarithmic scaling.</span>
            </div>
            <div class="ix-tree-branch" data-answer="No" data-target="q4">
              <div class="ix-tree-node" data-node-id="q4" data-question="Is the task in a domain you lack expertise in?">
                <div class="ix-tree-branch" data-answer="Yes" data-target="meta-bootstrap" data-phase="perceive">
                  <span class="ix-tree-endpoint">Meta-prompting bootstraps a starting point, but requires expert review before production use.</span>
                </div>
                <div class="ix-tree-branch" data-answer="No" data-target="either" data-phase="neutral">
                  <span class="ix-tree-endpoint">Either approach works. Choose by preference and time available.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<p class="ix-instruct">Click each card to explore the confabulation risks in meta-prompted prompts.</p>

<div class="ix-diagram" data-component="click-cards" data-diagram-id="m08-confabulation-risks">
  <span class="ix-title">Confabulation Risks in Meta-Prompted Prompts</span>
  <div class="ix-card" data-phase="error">
    <i data-lucide="alert-triangle" class="ix-card-icon"></i>
    <span class="ix-card-label">Outdated Assertions</span>
  </div>
  <div class="ix-card" data-phase="error">
    <i data-lucide="alert-triangle" class="ix-card-icon"></i>
    <span class="ix-card-label">Propagation Risk</span>
  </div>
  <div class="ix-card" data-phase="error">
    <i data-lucide="alert-triangle" class="ix-card-icon"></i>
    <span class="ix-card-label">Plausible but Wrong</span>
  </div>
  <div class="ix-card" data-phase="success">
    <i data-lucide="shield-check" class="ix-card-icon"></i>
    <span class="ix-card-label">Mitigation Strategies</span>
  </div>
  <!-- Detail panels -->
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="error">Outdated Assertions</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">The Risk</div>
        <div class="ix-sec-text">Meta-prompted security skills may reference superseded vulnerability taxonomies, outdated best practices, or deprecated API patterns. The model generates from its training distribution, which may not reflect the current state of a rapidly evolving domain.</div>
      </div>
      <p class="ix-note"><strong>Example</strong>: A generated OWASP review skill references the 2017 Top 10 categories instead of the current version, or recommends a hashing algorithm that has been deprecated.</p>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="error">Propagation Risk</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">The Risk</div>
        <div class="ix-sec-text">If a generated prompt contains incorrect guidance and is added to a skill library without review, the incorrectness propagates to every task the skill is applied to. One wrong assertion in a security review skill contaminates every code review that uses it.</div>
      </div>
      <p class="ix-note"><strong>The multiplier effect</strong>: Meta-prompting creates prompts at scale. Errors in those prompts also propagate at scale. The productivity gain amplifies both correct and incorrect content equally.</p>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="error">Plausible but Wrong</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">The Risk</div>
        <div class="ix-sec-text">Generated prompts for novel task types -- tasks without clear analogues in the training data -- may sound authoritative but be subtly incorrect in ways that are hard to detect without domain expertise. The structural quality of the output masks substantive errors.</div>
      </div>
      <p class="ix-note"><strong>Detection difficulty</strong>: Plausible-but-wrong content is harder to catch than obviously wrong content. The well-structured TCEF format makes generated prompts look professional regardless of their domain accuracy.</p>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="success">Mitigation Strategies</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">What To Do</div>
        <div class="ix-sec-text">Four practices reduce confabulation risk to manageable levels: (1) always have a domain expert review meta-prompted prompts before adding them to production skill libraries, (2) test meta-prompted prompts against known examples before trusting them for new cases, (3) add a date stamp to skill versions and periodically re-validate against current best practices, (4) mark meta-prompted prompts with their generation method in a comment so future readers know the provenance.</div>
      </div>
      <p class="ix-note"><strong>In high-stakes domains</strong> (security, compliance, safety): never add meta-prompted prompts to the library without expert sign-off. The cost of incorrect guidance exceeds the time saved by automated generation.</p>
    </div>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="warning">
  <p><strong>Confabulation compounds at the meta level</strong>: A confabulated assertion in a regular prompt affects one task. A confabulated assertion in a meta-prompted skill file affects every task that skill is applied to. Always validate domain-specific claims in generated prompts against authoritative sources.</p>
</div>

<details class="ix-collapse">
<summary>Deep Dive: Lightweight confabulation red-team checklist</summary>
<div class="ix-collapse-body">
<p>Run a fast red-team pass before adding generated prompts to production libraries: (1) challenge factual claims against one authoritative source per high-risk domain statement, (2) test one adversarial input that targets known failure modes, (3) verify examples for version correctness (API names, transport terms, deprecations), and (4) require explicit reviewer sign-off for security/compliance/safety domains.</p>
<p>Document reviewer name and review date in the prompt header. This makes later maintenance and audits tractable when the stack evolves.</p>
</div>
</details>

<p class="ix-instruct">Test your understanding of meta-prompting concepts and limits.</p>

<div class="ix-diagram" data-component="quiz" data-diagram-id="m08-meta-check" data-xp="15">
  <span class="ix-title">Knowledge Check: Meta-Prompting</span>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q1.</strong> A meta-prompt is best described as:</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">A prompt that is longer than 100 words</button>
      <button class="ix-quiz-option" data-correct="true">A prompt that instructs an LLM to generate, evaluate, or modify other prompts</button>
      <button class="ix-quiz-option">A prompt stored in a skill file</button>
      <button class="ix-quiz-option">A prompt that uses the TCEF framework</button>
    </div>
    <p class="ix-quiz-explanation">A meta-prompt operates one level of abstraction above regular prompts. Its Task is to produce, evaluate, or transform other prompts. Length, storage format, and framework usage are orthogonal properties -- a short prompt can be a meta-prompt, and a long prompt can be a regular prompt.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q2.</strong> When does the generate-evaluate-improve loop typically converge?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">After 1 iteration</button>
      <button class="ix-quiz-option" data-correct="true">After 2-3 iterations</button>
      <button class="ix-quiz-option">After 5-10 iterations</button>
      <button class="ix-quiz-option">It does not converge -- iteration is unlimited</button>
    </div>
    <p class="ix-quiz-explanation">The loop converges in 2-3 iterations because each evaluation pass fixes the most significant issues first. After 2-3 rounds, remaining findings are typically stylistic rather than substantive. Beyond that point, testing against real cases provides more value than further meta-level iteration.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q3.</strong> A team uses meta-prompting to generate a security review skill for a new codebase. The generated skill produces plausible output. What is the MOST important next step?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">Deploy the skill to production immediately</button>
      <button class="ix-quiz-option">Run the generate-evaluate-improve loop one more time</button>
      <button class="ix-quiz-option" data-correct="true">Have a domain expert review the skill for technical accuracy</button>
      <button class="ix-quiz-option">Test the skill against a large codebase for speed</button>
    </div>
    <p class="ix-quiz-explanation">Plausible output does not mean accurate output. In security domains, incorrect guidance propagates to every review the skill performs. A domain expert catches the confabulation risks that automated evaluation cannot: outdated taxonomies, incorrect severity criteria, and subtle technical inaccuracies. No amount of loop iteration substitutes for this human validation.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q4.</strong> Your teammate uses meta-prompting to generate a 3-line commit message for a single bugfix. Is this a good use of meta-prompting?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">Yes -- meta-prompting improves all prompt tasks</button>
      <button class="ix-quiz-option" data-correct="true">No -- for simple, bounded tasks, the meta-prompting overhead exceeds the benefit</button>
      <button class="ix-quiz-option">Yes -- consistency matters even for small tasks</button>
      <button class="ix-quiz-option">No -- meta-prompting only works for code review</button>
    </div>
    <p class="ix-quiz-explanation">This is a tricky question. Meta-prompting provides leverage when generation is the bottleneck and the task is complex enough to justify the overhead of writing a meta-prompt, evaluating output, and iterating. A 3-line commit message is simple, concrete, and has an obvious format. Direct prompting -- or just writing it yourself -- is faster and equally effective. The overhead of constructing a meta-prompt exceeds the time saved.</p>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="key-concept">
  <p><strong>Meta-prompting generates candidates; engineers select and validate</strong>: The human provides domain validation, context grounding, quality judgment, and iteration direction. Meta-prompting shifts labor from generation to evaluation -- a leverage gain only when generation is the bottleneck.</p>
</div>

---

## Lab Connection

**Lab 06** is the closest applied companion. You will build skills and commands where meta-prompting can be used to bootstrap first drafts, then refine them with explicit evaluation criteria before reuse. The reusable artifacts you create here -- skills, rubrics, and output formats -- are the exact kind of building blocks Module 09 turns into specialist roles inside an orchestrated system.

---

## Further Reading

- [Anthropic Prompt Engineering Techniques](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)
- [Meta-Prompting: Enhancing Language Models with Task-Agnostic Scaffolding](https://arxiv.org/abs/2401.12954)
- [Automatic Prompt Engineer (APE)](https://arxiv.org/abs/2211.01910)
- [Standalone Diagram: Generate-Evaluate-Improve Loop](/examples/module-diagrams/m08-meta-loop.html)

---

[Previous Module: Module 07](/module/07) | [Next Module: Module 09](/module/09)
