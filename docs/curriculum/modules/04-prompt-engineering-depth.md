<div class="ix-diagram" data-component="module-hero">
<div class="ix-hero">
<div class="ix-hero-bg"></div>
<div class="ix-hero-module-num">Module 04</div>
<div class="ix-hero-title">Prompt Engineering Depth</div>
<div class="ix-hero-subtitle">Move beyond basic prompts to the TCEF framework -- diagnose failures, inject context strategically, and iterate with engineering discipline</div>
<div class="ix-hero-chips">
<span class="ix-hero-chip">TCEF Framework</span>
<span class="ix-hero-chip">Context Injection Strategies</span>
<span class="ix-hero-chip">Constraint Specification</span>
<span class="ix-hero-chip">Diagnostic Iteration</span>
</div>
</div>
</div>

# Module 04: Prompt Engineering Depth
## Agentic AI Engineering -- 3-Day Intensive Course

---

## Overview

<div class="ix-diagram" data-component="objective">
  <p>Apply the TCEF pattern to agentic prompts, diagnose prompt failures using the Agentic Loop (PRAO) as a diagnostic lens, and iterate systematically until prompts produce reliable, precise output.</p>
</div>

You learned the Agentic Loop (PRAO) in Module 01 and configured `CLAUDE.md` as the agent's persistent memory in Module 02. Now let's apply that understanding to the prompts you write -- because a well-engineered prompt is the single highest-leverage input into the Agentic Loop. For prompt engineering fundamentals, see the [Anthropic Prompt Engineering Guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview).

---

## 4.1 Beyond Basic Prompts: Why GCCF Is Not Enough

<div class="ix-diagram" data-component="objective">
  <p>Identify the three failure modes where basic prompt patterns (Goal + Context + Constraints + Format) break down in real engineering tasks.</p>
</div>

A basic GCCF pattern works for narrow, well-defined tasks. It fails predictably in three scenarios that every engineer encounters.

<p class="ix-instruct">Write your prediction, then reveal the reference reasoning.</p>

<div class="ix-diagram" data-component="predict-reveal" data-diagram-id="m04-gccf-limits" data-xp="8">
  <span class="ix-title">Predict Before You Learn</span>
  <p class="ix-predict-prompt">You use Goal + Context + Constraints + Format prompts today. Where will that break first in two cases: (1) "refactor the authentication module," and (2) JSON output consumed by a CI parser?</p>
  <textarea class="ix-predict-input" aria-label="Your prediction" placeholder="Write your reasoning -- what failure modes would you expect and why?"></textarea>
  <details class="ix-predict-reveal">
    <summary>Reveal reference reasoning</summary>
    <p>The basic GCCF pattern breaks in three predictable ways. First, <strong>multiple valid interpretations</strong>: "refactor" admits dozens of operations (extract functions, rename variables, convert async) and GCCF provides no way to disambiguate which one you meant. Second, <strong>pattern and style requirements</strong>: when output must match your codebase's specific conventions, GCCF's context field rarely provides the concrete demonstration needed. Third, <strong>output feeds another system</strong>: when a parser expects exact field names like <code>issues</code> not <code>findings</code>, GCCF's format field ("provide JSON") is too vague to guarantee structural correctness.</p>
  </details>
</div>

<p class="ix-instruct">Click each failure mode to see the problem, a GCCF vs TCEF comparison, and what TCEF element fixes it.</p>

<div class="ix-diagram" data-component="click-cards" data-diagram-id="m04-failure-modes">
  <span class="ix-title">Why GCCF is not enough</span>
  <div class="ix-card" data-phase="error">
    <i data-lucide="alert-circle" class="ix-card-icon"></i>
    <span class="ix-card-label">Multiple Valid Interpretations</span>
  </div>
  <div class="ix-card" data-phase="error">
    <i data-lucide="alert-circle" class="ix-card-icon"></i>
    <span class="ix-card-label">Pattern and Style Requirements</span>
  </div>
  <div class="ix-card" data-phase="error">
    <i data-lucide="alert-circle" class="ix-card-icon"></i>
    <span class="ix-card-label">Output Feeds Another System</span>
  </div>
  <!-- Detail panels -->
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="error">Multiple Valid Interpretations</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">The Problem</div>
        <div class="ix-sec-text">"Refactor the authentication module" admits dozens of valid interpretations -- extract functions, rename variables, convert to async/await, reorganize files, add types. Claude picks one (often the most common in training data) that may not be yours. Result: wasted iterations.</div>
      </div>
      <div class="ix-char-grid">
        <div class="ix-char-item" data-phase="error"><strong>GCCF goal</strong><span>"Refactor the authentication module to improve quality."</span></div>
        <div class="ix-char-item" data-phase="success"><strong>TCEF task</strong><span>"Add explicit return type annotations to every exported function in <code>auth/index.ts</code> that currently lacks one. Do not modify signatures or implementations."</span></div>
      </div>
      <p class="ix-note"><strong>TCEF fix: precise verb + measurable outcome.</strong> "Add return type annotations" admits exactly one interpretation. "Refactor" admits dozens.</p>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="error">Pattern and Style Requirements</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">The Problem</div>
        <div class="ix-sec-text">"Follow our existing patterns" gives Claude no concrete data to pattern-match against. Output will be generic idiomatic code, not your-codebase code. In production, consistency is a maintenance requirement -- generic correct does not equal project-correct.</div>
      </div>
      <div class="ix-char-grid">
        <div class="ix-char-item" data-phase="error"><strong>GCCF context</strong><span>"Follow our existing error handling patterns in the Express routes."</span></div>
        <div class="ix-char-item" data-phase="success"><strong>TCEF context + example</strong><span>"Match this pattern from our codebase:" followed by a real code excerpt showing the try/catch structure, error types, status codes, and logger usage.</span></div>
      </div>
      <p class="ix-note"><strong>TCEF fix: Pattern Context + Examples.</strong> One concrete excerpt from production code communicates style with zero ambiguity. Prose descriptions of patterns always leak precision.</p>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="error">Output Feeds Another System</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">The Problem</div>
        <div class="ix-sec-text">When output is consumed by a parser, database, or CI pipeline, format precision is a correctness requirement. "Provide a JSON object" is insufficient when the consumer expects exact field names, specific nesting, particular data types.</div>
      </div>
      <div class="ix-char-grid">
        <div class="ix-char-item" data-phase="error"><strong>GCCF format</strong><span>"Provide a JSON object with the review results."</span></div>
        <div class="ix-char-item" data-phase="success"><strong>TCEF format</strong><span>Full schema with field names, types, enum values, and constraints. A downstream parser can be written against the spec without seeing output.</span></div>
      </div>
      <p class="ix-note"><strong>TCEF fix: Format as output schema contract.</strong> The Format element is a contract between the agent's output and the downstream consumer. Any variation breaks the pipeline.</p>
    </div>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="warning">
  <p><strong>Underspecified verbs waste iterations</strong>: Verbs like "improve," "update," "fix," and "refactor" admit dozens of valid interpretations. In agentic contexts, underspecified verbs waste iterations on ambiguity that should be eliminated at prompt-design time.</p>
</div>

<details class="ix-collapse">
<summary>Deep Dive: The GCCF pattern and its limits</summary>
<div class="ix-collapse-body">
<p>The GCCF pattern -- Goal, Context, Constraints, Format -- provides a solid mental scaffold for the majority of prompt-writing tasks. When you need to summarize a document, generate a changelog entry, or answer a focused technical question, GCCF gives you enough structure to produce a useful result on the first or second attempt.</p>
<p>Consider a typical GCCF prompt that triggers the first failure mode:</p>
<p><strong>Goal:</strong> Refactor the authentication module.<br>
<strong>Context:</strong> We use Express and Passport.js.<br>
<strong>Constraints:</strong> Do not break existing tests.<br>
<strong>Format:</strong> Provide the updated files.</p>
<p>The word "refactor" is the problem. It admits extract functions, rename variables, convert callbacks to async/await, reorganize file structure, remove duplication, add type annotations, and more. Claude picks one interpretation -- often the most common from training data -- and produces output that is technically correct but not what you needed.</p>
<p>The second failure mode, pattern mismatch, occurs because GCCF's context field typically contains background information ("we use Express and Passport") rather than the concrete code excerpt the agent needs to replicate your specific error handling shape, middleware invocation order, or logging call signature.</p>
<p>The third failure mode, format drift, occurs because GCCF's format field specifies high-level shape ("provide JSON") rather than an exact schema. When the output feeds a downstream parser, the difference between <code>issues</code> and <code>findings</code> is a broken pipeline.</p>
</div>
</details>

---

## 4.2 The TCEF Pattern

<div class="ix-diagram" data-component="objective">
  <p>Apply the four elements of the TCEF pattern -- Task, Context, Examples, Format -- to construct precise, reliable agentic prompts that resolve the three failure modes.</p>
</div>

Building on the failure modes from Module 03's prompt foundations, TCEF provides a targeted fix for each one.

<p class="ix-instruct">Write your prediction, then reveal the reference reasoning.</p>

<div class="ix-diagram" data-component="predict-reveal" data-diagram-id="m04-tcef-predict" data-xp="8">
  <span class="ix-title">Predict Before You Learn</span>
  <p class="ix-predict-prompt">If you were designing a prompt framework that fixes the three failure modes we just identified (ambiguity, pattern mismatch, format drift), what elements would you include? Think about what each failure mode was missing and what a prompt pattern needs to provide.</p>
  <textarea class="ix-predict-input" aria-label="Your prediction" placeholder="Write your reasoning -- what elements would your framework include and why?"></textarea>
  <details class="ix-predict-reveal">
    <summary>Reveal reference reasoning</summary>
    <p>TCEF resolves each failure mode with a targeted element. <strong>Task</strong> eliminates ambiguity through precision verbs and measurable outcomes -- "add return type annotations to exported functions" not "improve types." <strong>Context</strong> provides the specific data Claude needs through five injection strategies (File Reference, Pattern, Constraint, Audience, State). <strong>Examples</strong> demonstrate the exact output pattern -- one concrete example replaces three paragraphs of abstract rules. <strong>Format</strong> locks output structure with an explicit schema including field names, types, and nesting. Each element targets a different failure mode.</p>
  </details>
</div>

<p class="ix-instruct">Click each element to see its engineering function, a real before/after comparison, and the key principle.</p>

<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="m04-tcef-elements">
  <span class="ix-title">The TCEF pattern</span>
  <div data-tab="Task">
    <p><strong>Precise verb + measurable outcome.</strong> Replace vague goals with a specific operation and a definition of "done" you can verify programmatically.</p>
    <div class="ix-char-grid">
      <div class="ix-char-item" data-phase="error"><strong>Imprecise</strong><span>"Improve the TypeScript types in the authentication module."</span></div>
      <div class="ix-char-item" data-phase="success"><strong>Precise</strong><span>"Add explicit return type annotations to every exported function in <code>auth/index.ts</code> that currently lacks one. Do not modify function signatures, implementations, or internal types."</span></div>
    </div>
    <p class="ix-note"><strong>Precision verbs:</strong> <code>add</code>, <code>remove</code>, <code>convert</code>, <code>extract</code>, <code>rename</code>, <code>replace</code>, <code>wrap</code>, <code>generate</code>, <code>validate</code>. <strong>Avoid at Task level:</strong> <code>improve</code>, <code>update</code>, <code>fix</code>, <code>enhance</code>, <code>refactor</code> -- these admit multiple valid interpretations.</p>
  </div>
  <div data-tab="Context">
    <p><strong>Specific data Claude needs for your situation.</strong> Five injection strategies: File Reference (@filename), Pattern (code excerpt), Constraint (what not to change), Audience (who consumes output), State (current system facts).</p>
    <div class="ix-char-grid">
      <div class="ix-char-item" data-phase="error"><strong>Imprecise</strong><span>"Follow our existing patterns for error handling."</span></div>
      <div class="ix-char-item" data-phase="success"><strong>Precise</strong><span>"Match this error handling pattern from our codebase:" followed by a real code excerpt showing the try/catch structure, error types, status codes, and logger usage.</span></div>
    </div>
    <p class="ix-note"><strong>Include only signal.</strong> Irrelevant context is not neutral -- it adds noise that distracts. Start minimal, add context only when a failure mode indicates it is missing.</p>
  </div>
  <div data-tab="Examples">
    <p><strong>Showing beats telling.</strong> One concrete example replaces three paragraphs of abstract rules. Examples communicate field names, data types, prose style, and edge cases with zero ambiguity.</p>
    <div class="ix-char-grid">
      <div class="ix-char-item" data-phase="error"><strong>Telling (verbose, ambiguous)</strong><span>"Each issue should include the file path, line number, severity level (critical/high/medium/low), a description, and a suggested fix."</span></div>
    </div>
    <pre class="ix-code-block">"file": "src/auth/session.ts",
"line": 47,
"severity": "high",
"issue": "Session token stored in localStorage, exposing to XSS.",
"suggestion": "Use HttpOnly cookies for session token storage."</pre>
    <p class="ix-note"><strong>This example silently communicates:</strong> exact field names (not filePath, not filename -- exactly "file"), data types (line is number), severity vocab (four values, lowercase), prose style. No rule list achieves this precision.</p>
  </div>
  <div data-tab="Format">
    <p><strong>Output schema specification -- a contract.</strong> The downstream consumer of this output should be able to write a parser against your Format spec without seeing example outputs.</p>
    <div class="ix-char-grid">
      <div class="ix-char-item" data-phase="error"><strong>Imprecise</strong><span>"Provide a JSON object with the review results."</span></div>
    </div>
    <pre class="ix-code-block">"review": {
  "summary": string    -- one sentence, overall quality
  "issues": [
    {
      "file": string   -- relative path from project root
      "line": number   -- integer
      "severity": "critical" | "high" | "medium" | "low"
      "issue": string  -- present tense
      "suggestion": string -- imperative mood
    }
  ],
  "approved": boolean
}</pre>
    <p class="ix-note"><strong>Format matters most when output feeds another system</strong> (parser, CI, database). "Provide JSON" is insufficient when the consumer expects exact field names and specific nesting.</p>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="core-idea">
  <p><strong>TCEF targets failure modes</strong>: Each element resolves a specific failure. Task eliminates ambiguity. Context provides signal. Examples demonstrate patterns. Format locks output structure. The power comes from specificity, not from adding more text.</p>
</div>

<details class="ix-collapse">
<summary>Deep Dive: TCEF elements in full detail</summary>
<div class="ix-collapse-body">
<p><strong>Task precision</strong>: The difference between an imprecise and precise task specification is the difference between "improve the types" (dozens of valid operations) and "add return type annotations to exported functions that lack them" (exactly one operation, verifiable). Precision verbs like <code>add</code>, <code>remove</code>, <code>convert</code>, and <code>extract</code> each identify a single, unambiguous operation.</p>
<p><strong>Context discipline</strong>: Irrelevant context is not neutral -- it adds noise that dilutes the signal. A 2,000-token context that includes one irrelevant 500-token document is measurably less effective than a 1,500-token context with only relevant material. The five injection strategies (File Reference, Pattern, Constraint, Audience, State) give you a vocabulary for selecting the right context type for each task.</p>
<p><strong>Example leverage</strong>: When writing few-shot examples for agentic tasks, use examples from your actual codebase or domain, not generic ones. Include at least one example that illustrates a boundary case. Ensure examples are complete enough to be unambiguous. Do not use simplified toy examples that omit relevant complexity. Do not include more than three to five examples -- beyond this, the agent may pattern-match too literally.</p>
<p><strong>Format as contract</strong>: For JSON output, specify field names, data types, nesting structure, and naming conventions explicitly. For text output, specify structure through header levels, section names, and ordering. For code output, specify language, style conventions, and whether to include surrounding boilerplate.</p>
</div>
</details>

---

## 4.3 Context Injection Strategies in Depth

<div class="ix-diagram" data-component="objective">
  <p>Choose and deploy the right context injection strategy from among five distinct approaches, distinguishing signal context from noise context.</p>
</div>

You saw the five strategies listed in the TCEF Context tab. Now let's examine each one in detail -- when to use it, how to execute it effectively, and what to avoid.

<p class="ix-instruct">Click each strategy to see when to use it, what to include, and a real prompt example.</p>

<div class="ix-diagram" data-component="click-cards" data-diagram-id="m04-context-strategies">
  <span class="ix-title">Five context injection strategies</span>
  <div class="ix-card" data-phase="success">
    <i data-lucide="file-code" class="ix-card-icon"></i>
    <span class="ix-card-label">File Reference</span>
    <span class="ix-card-sub">Most common</span>
  </div>
  <div class="ix-card" data-phase="reason">
    <i data-lucide="copy" class="ix-card-icon"></i>
    <span class="ix-card-label">Pattern</span>
    <span class="ix-card-sub">High impact</span>
  </div>
  <div class="ix-card" data-phase="perceive">
    <i data-lucide="shield" class="ix-card-icon"></i>
    <span class="ix-card-label">Constraint</span>
    <span class="ix-card-sub">Critical for refactoring</span>
  </div>
  <div class="ix-card" data-phase="act">
    <i data-lucide="users" class="ix-card-icon"></i>
    <span class="ix-card-label">Audience</span>
    <span class="ix-card-sub">For docs and UX</span>
  </div>
  <div class="ix-card" data-phase="error">
    <i data-lucide="clock" class="ix-card-icon"></i>
    <span class="ix-card-label">State</span>
    <span class="ix-card-sub">Essential for debugging</span>
  </div>
  <!-- Detail panels -->
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="success">File Reference</div>
    <div class="ix-detail-body">
      <div class="ix-char-grid">
        <div class="ix-char-item"><strong>Use for</strong><span>Code review, refactoring, documentation, test writing -- any task operating on specific files</span></div>
        <div class="ix-char-item"><strong>How</strong><span>@filename syntax loads current content. Include only files directly relevant -- not entire directories.</span></div>
        <div class="ix-char-item"><strong>Don't</strong><span>Don't include 10 files when 3 suffice. Every irrelevant file adds noise to the context window.</span></div>
        <div class="ix-char-item"><strong>Signal</strong><span>The agent uses generic patterns instead of matching your code -- missing File Reference context.</span></div>
      </div>
      <pre class="ix-code-block">@src/auth/jwt.ts @src/middleware/authenticate.ts

Add explicit return types to all exported functions in these files.</pre>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="reason">Pattern</div>
    <div class="ix-detail-body">
      <div class="ix-char-grid">
        <div class="ix-char-item"><strong>Use for</strong><span>Adding new code that must match existing style -- functions, components, error handlers, API routes</span></div>
        <div class="ix-char-item"><strong>How</strong><span>Short excerpt from production code that exemplifies the pattern. Not a description -- the actual code.</span></div>
        <div class="ix-char-item"><strong>Don't</strong><span>Don't describe the pattern in prose when a code example is available. Showing always beats telling.</span></div>
        <div class="ix-char-item"><strong>Signal</strong><span>Output is "correct" but doesn't match your codebase style -- missing Pattern context.</span></div>
      </div>
      <pre class="ix-code-block">Match this error handling pattern from our codebase:

try {
  const result = await service.execute(input);
  return res.status(200).json({ data: result });
} catch (err) {
  if (err instanceof ValidationError)
    return res.status(400).json({ error: err.message });
  logger.error('Unhandled', { err });
  return res.status(500).json({ error: 'Internal error' });
}</pre>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="perceive">Constraint</div>
    <div class="ix-detail-body">
      <div class="ix-char-grid">
        <div class="ix-char-item"><strong>Use for</strong><span>Refactoring, migrations, any task touching shared interfaces or configuration</span></div>
        <div class="ix-char-item"><strong>How</strong><span>Explicit list of files, functions, signatures, behaviors that must be preserved unchanged</span></div>
        <div class="ix-char-item"><strong>Don't</strong><span>Don't use generic constraints like "don't break anything" -- no useful guidance for the agent.</span></div>
        <div class="ix-char-item"><strong>Signal</strong><span>Agent modifies files or interfaces outside scope -- missing Constraint context.</span></div>
      </div>
      <pre class="ix-code-block">Constraints:
- Only modify files in src/auth/
- Do NOT modify src/middleware/, src/models/, or test files
- validateToken(token: string): Promise&lt;User | null&gt;
  signature must remain unchanged</pre>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="act">Audience</div>
    <div class="ix-detail-body">
      <div class="ix-char-grid">
        <div class="ix-char-item"><strong>Use for</strong><span>Documentation, error messages, user-facing content, API descriptions -- anything humans read</span></div>
        <div class="ix-char-item"><strong>How</strong><span>Specify who reads it and their expertise level. "Junior developer onboarding" vs "senior SRE debugging."</span></div>
        <div class="ix-char-item"><strong>Don't</strong><span>Don't use for pure engineering tasks where the output is code -- Audience context adds noise there.</span></div>
        <div class="ix-char-item"><strong>Signal</strong><span>Output tone is wrong (too technical for users, too basic for seniors) -- missing Audience context.</span></div>
      </div>
      <pre class="ix-code-block">Write error messages for the auth module.
Audience: end users of a consumer web app.
Assume no technical knowledge.
Be specific about what went wrong and what to do next.</pre>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="error">State</div>
    <div class="ix-detail-body">
      <div class="ix-char-grid">
        <div class="ix-char-item"><strong>Use for</strong><span>Debugging tasks where history matters, post-deployment issues, tasks depending on environment state</span></div>
        <div class="ix-char-item"><strong>How</strong><span>Recent changes, active issues, environmental facts. "We deployed v2.3 yesterday, Redis was upgraded last week."</span></div>
        <div class="ix-char-item"><strong>Don't</strong><span>Don't include irrelevant system state. Focus on changes that could plausibly cause the issue.</span></div>
        <div class="ix-char-item"><strong>Signal</strong><span>Agent's fix doesn't account for recent changes -- missing State context.</span></div>
      </div>
      <pre class="ix-code-block">State: Intermittent 500 errors started after yesterday's deploy.
Recent changes: upgraded pg driver from 8.7 to 8.11,
added connection pooling (max 20 connections).
No other changes to auth module in 2 weeks.</pre>
    </div>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="tip">
  <p><strong>Progressive context strategy:</strong> Start with Task + Format only. Run. Observe what failed. Add only the context type the failure mode indicates is missing. This prevents over-specifying before knowing what is actually needed. Irrelevant context is not neutral -- it is noise that distracts.</p>
</div>

<p class="ix-instruct">Choose your response for each scenario in this signal-versus-noise exercise.</p>

<div class="ix-diagram" data-component="scenario-quiz" data-diagram-id="m04-context-quality" data-xp="12">
  <span class="ix-title">Signal vs. Noise: Context Quality Exercise</span>
  <div class="ix-scenario-terminal">
    <div class="ix-terminal-line" data-type="prompt">> Task: "Add JSDoc comments to all exported functions in utils/format.ts"</div>
    <div class="ix-terminal-line" data-type="think">Which context fragments help the agent produce correct output?</div>
  </div>
  <div class="ix-scenario-question">
    <p class="ix-quiz-prompt"><strong>Q1.</strong> You have the file <code>utils/format.ts</code> itself. Is this signal or noise for the JSDoc task?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option" data-correct="true">Signal -- the agent must read the file to know what functions to document</button>
      <button class="ix-quiz-option">Noise -- the agent can infer function names from the file path</button>
      <button class="ix-quiz-option">Depends -- only signal if the file is short</button>
      <button class="ix-quiz-option">Noise -- JSDoc is a standard pattern, no file needed</button>
    </div>
    <p class="ix-quiz-explanation">The target file is always signal. The agent needs to see the actual function signatures, parameters, and return types to write accurate JSDoc comments.</p>
  </div>
  <div class="ix-scenario-question">
    <p class="ix-quiz-prompt"><strong>Q2.</strong> You have an existing JSDoc example from another file in your codebase. Signal or noise?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">Noise -- JSDoc is standardized, no example needed</button>
      <button class="ix-quiz-option" data-correct="true">Signal -- it demonstrates your team's specific JSDoc conventions (custom tags, style)</button>
      <button class="ix-quiz-option">Noise -- it is from a different file and will confuse the agent</button>
      <button class="ix-quiz-option">Signal -- but only if it is from the same directory</button>
    </div>
    <p class="ix-quiz-explanation">An existing example is pattern context. It shows your team's specific conventions -- custom tags, description style, parameter format -- that differ from generic JSDoc defaults.</p>
  </div>
  <div class="ix-scenario-question">
    <p class="ix-quiz-prompt"><strong>Q3.</strong> You have the project's <code>README.md</code>. Signal or noise for the JSDoc task?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">Signal -- it provides project context the agent needs</button>
      <button class="ix-quiz-option">Signal -- it might mention documentation conventions</button>
      <button class="ix-quiz-option" data-correct="true">Noise -- it describes the project but does not affect what correct JSDoc looks like</button>
      <button class="ix-quiz-option">Depends -- signal if the README is short</button>
    </div>
    <p class="ix-quiz-explanation">The README describes the project at a high level but does not constrain what correct JSDoc comments look like. Including it adds tokens without adding signal, diluting the context the agent actually needs.</p>
  </div>
  <div class="ix-scenario-question">
    <p class="ix-quiz-prompt"><strong>Q4.</strong> You have the <code>package.json</code>. Signal or noise?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">Signal -- it lists dependencies the agent needs to know</button>
      <button class="ix-quiz-option">Signal -- it shows the project name for JSDoc headers</button>
      <button class="ix-quiz-option">Depends -- signal if it contains a JSDoc config script</button>
      <button class="ix-quiz-option" data-correct="true">Noise -- dependency lists and project metadata do not affect JSDoc content</button>
    </div>
    <p class="ix-quiz-explanation"><code>package.json</code> contains dependency versions and scripts. None of this information affects what correct JSDoc comments look like for the functions in <code>utils/format.ts</code>.</p>
  </div>
</div>

<details class="ix-collapse">
<summary>Deep Dive: Progressive context and the signal-to-noise discipline</summary>
<div class="ix-collapse-body">
<p>When you are unsure how much context is necessary, start minimal and add context only when the first run reveals what was missing. This discipline prevents the common failure mode of providing so much context that the relevant signal is diluted.</p>
<p><strong>Progressive context workflow:</strong></p>
<p>Starting prompt: just the Task and Format, no Context. Run, observe output. If the output is wrong because Claude used generic conventions rather than your project's conventions, add Pattern Context. If the output is wrong because Claude modified something it should not have, add Constraint Context. Each iteration adds exactly the context type that the failure mode indicates is missing.</p>
<p>A 2,000-token context that includes one irrelevant 500-token document is measurably less effective than a 1,500-token context with only relevant material. Every token in the context window competes for attention. Irrelevant tokens do not just take up space -- they actively reduce the probability that the agent will attend to the signal.</p>
</div>
</details>

---

## 4.4 Constraint Specification

<div class="ix-diagram" data-component="objective">
  <p>Write constraint specifications across four categories -- Scope, Compatibility, Style, and Approval -- that prevent common failure modes with verifiable, enforceable language.</p>
</div>

You configured permissions and safety rules in Module 02's `settings.json`. Constraints in prompts serve a similar purpose: they define the boundary of acceptable agent behavior for a specific task.

<p class="ix-instruct">Switch between constraint types to see what each protects, with verifiable examples vs. meaningless ones.</p>

<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="m04-constraint-types">
  <span class="ix-title">Constraint specification</span>
  <div data-tab="Scope">
    <p>Define what files, functions, and systems are in and out of scope. Prevents the agent from wandering into adjacent code that should not be touched.</p>
    <div class="ix-char-grid">
      <div class="ix-char-item" data-phase="success"><strong>Verifiable constraint</strong><span>Only modify files in <code>src/auth/</code>. Do not modify files in <code>src/middleware/</code>, <code>src/models/</code>, or any test files.</span></div>
      <div class="ix-char-item" data-phase="error"><strong>Meaningless constraint</strong><span>Don't break anything outside the auth module.</span></div>
    </div>
    <p class="ix-note"><strong>Why the bad version fails:</strong> "Don't break anything" requires the agent to know all downstream consumers of every file it touches. It can't verify this. Explicit file paths are verifiable.</p>
  </div>
  <div data-tab="Compatibility">
    <p>Define interfaces, behaviors, and formats that must be preserved. Critical for refactoring and migrations where the internal implementation changes but the external contract must not.</p>
    <div class="ix-char-grid">
      <div class="ix-char-item" data-phase="success"><strong>Verifiable constraint</strong><span>The function signature <code>validateToken(token: string): Promise&lt;User | null&gt;</code> must remain unchanged. All 47 existing unit tests must pass without modification.</span></div>
      <div class="ix-char-item" data-phase="error"><strong>Meaningless constraint</strong><span>Make sure it's backward compatible.</span></div>
    </div>
    <p class="ix-note"><strong>Why the bad version fails:</strong> "Backward compatible" is undefined without specifying which interfaces, which callers, and which behaviors. The good version names the exact function signature and a measurable test suite.</p>
  </div>
  <div data-tab="Style">
    <p>Define conventions the output must follow. Ensures new code matches existing codebase style -- generic correct does not equal project-correct.</p>
    <div class="ix-char-grid">
      <div class="ix-char-item" data-phase="success"><strong>Verifiable constraint</strong><span>Use camelCase for all new variables and functions. Use snake_case for database column names. Use parameterized queries -- no string concatenation in SQL.</span></div>
      <div class="ix-char-item" data-phase="error"><strong>Meaningless constraint</strong><span>Follow best practices and keep it clean.</span></div>
    </div>
    <p class="ix-note"><strong>Why the bad version fails:</strong> "Best practices" varies by community, language, and era. "Clean" is a subjective aesthetic. The agent can't make a binary decision from either. Specific naming conventions are checkable.</p>
  </div>
  <div data-tab="Approval">
    <p>Define points where the agent must pause and get human confirmation before proceeding. The most important safety mechanism in agentic workflows -- converts autonomous executor to collaborative planner.</p>
    <div class="ix-char-grid">
      <div class="ix-char-item" data-phase="success"><strong>Verifiable constraint</strong><span>Before writing any code, present a numbered list of changes you plan to make, specifying which files and what modifications. Do not write code until I reply "proceed."</span></div>
      <div class="ix-char-item" data-phase="error"><strong>Meaningless constraint</strong><span>Be careful with your changes.</span></div>
    </div>
    <p class="ix-note"><strong>A well-formed approval constraint specifies three things:</strong> what must be shown before proceeding (numbered list of changes), what format the plan takes (files + modifications), and what the agent waits for (the word "proceed").</p>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="warning">
  <p><strong>Meaningless constraints provide false confidence</strong>: Constraints like "follow best practices," "make sure it is secure," or "do not break anything" are unenforceable. The quick reference below shows four common pairs.</p>
</div>

<details class="ix-collapse">
<summary>Quick reference: meaningless vs. verifiable constraints</summary>
<div class="ix-collapse-body">
<div class="ix-char-grid">
<div class="ix-char-item" data-phase="error"><strong><i data-lucide="x-circle" width="16" height="16"></i> Meaningless</strong><span>"Follow best practices"</span></div>
<div class="ix-char-item" data-phase="success"><strong><i data-lucide="check-circle" width="16" height="16"></i> Verifiable</strong><span>"Use parameterized queries for all DB calls"</span></div>
<div class="ix-char-item" data-phase="error"><strong><i data-lucide="x-circle" width="16" height="16"></i> Meaningless</strong><span>"Make sure it's secure"</span></div>
<div class="ix-char-item" data-phase="success"><strong><i data-lucide="check-circle" width="16" height="16"></i> Verifiable</strong><span>"Validate all input with Zod before use"</span></div>
<div class="ix-char-item" data-phase="error"><strong><i data-lucide="x-circle" width="16" height="16"></i> Meaningless</strong><span>"Don't break anything"</span></div>
<div class="ix-char-item" data-phase="success"><strong><i data-lucide="check-circle" width="16" height="16"></i> Verifiable</strong><span>"The 47 unit tests must pass without modification"</span></div>
<div class="ix-char-item" data-phase="error"><strong><i data-lucide="x-circle" width="16" height="16"></i> Meaningless</strong><span>"Keep it clean"</span></div>
<div class="ix-char-item" data-phase="success"><strong><i data-lucide="check-circle" width="16" height="16"></i> Verifiable</strong><span>"Use camelCase for variables, snake_case for DB columns"</span></div>
</div>
</div>
</details>

<details class="ix-collapse">
<summary>Deep Dive: The approval constraint as a safety mechanism</summary>
<div class="ix-collapse-body">
<p>The approval constraint is the most important safety mechanism in agentic workflows. For tasks that involve deleting data, modifying shared infrastructure, or making changes that cannot be easily reversed, the approval constraint converts the agent from an autonomous executor to a collaborative planner.</p>
<p>A well-formed approval constraint specifies three things:</p>
<p>1. <strong>What must be shown before proceeding</strong> -- a numbered list of all files that will be modified, the specific changes planned for each.</p>
<p>2. <strong>What format the plan should take</strong> -- structured list, diff preview, or prose summary.</p>
<p>3. <strong>What the agent should wait for</strong> -- "wait for my confirmation before writing any code." Without an explicit wait instruction, the agent may present a plan and then immediately proceed to execute it.</p>
<p>This connects directly to the permission model you learned in Module 02. The approval constraint in a prompt works alongside <code>settings.json</code> permissions: permissions control <em>which tools</em> the agent can use, while approval constraints control <em>when</em> the agent should pause within a task.</p>
</div>
</details>

---

## 4.5 Prompt Iteration as a Debugging Discipline

<div class="ix-diagram" data-component="objective">
  <p>Execute the four-step prompt iteration loop -- Run, Diagnose, Hypothesize, Refine -- using the Agentic Loop (PRAO) as a diagnostic lens for identifying which prompt element to change.</p>
</div>

In Module 01, you learned how the Agentic Loop (PRAO) drives every agent action. Now we use that same framework as a diagnostic tool for prompt engineering.

<p class="ix-instruct">Write your prediction, then reveal the reference reasoning.</p>

<div class="ix-diagram" data-component="predict-reveal" data-diagram-id="m04-iteration-predict" data-xp="8">
  <span class="ix-title">Predict Before You Learn</span>
  <p class="ix-predict-prompt">When a prompt produces wrong output, most people rewrite the entire prompt. If you had to follow a disciplined process instead -- making exactly one change per iteration -- how would you decide WHAT to change? What diagnostic framework would you use to identify the root cause?</p>
  <textarea class="ix-predict-input" aria-label="Your prediction" placeholder="Write your reasoning -- how would you systematically diagnose a prompt failure?"></textarea>
  <details class="ix-predict-reveal">
    <summary>Reveal reference reasoning</summary>
    <p>The four-step iteration loop uses PRAO as a diagnostic lens. <strong>Run</strong>: execute the prompt and collect complete output. <strong>Diagnose</strong>: ask which PRAO phase failed -- Perceive (missing context), Reason (ambiguous task), Act (wrong format), or Observe (misinterpreted feedback). <strong>Hypothesize</strong>: form one falsifiable hypothesis about what to change. <strong>Refine</strong>: apply that single change and re-run. Single-change discipline preserves your ability to attribute improvements to specific changes. A prompt that converged in four iterations with one change each is better understood than one that "worked" after five simultaneous changes.</p>
  </details>
</div>

<p class="ix-instruct">Click each step of the four-step iteration loop to see what happens and why.</p>

<div class="ix-diagram" data-component="step-walkthrough" data-diagram-id="m04-iteration-loop">
  <span class="ix-title">The four-step iteration loop</span>
  <div class="ix-sw-step" data-phase="act">
    <span class="ix-sw-step-label">Step 1</span>
    <span class="ix-sw-step-title">Run</span>
    <div class="ix-sw-step-body">
      <p><strong>Execute the prompt</strong> and collect the complete output including intermediate reasoning. Don't just look at the final result -- the thinking trace tells you where things went wrong.</p>
    </div>
  </div>
  <div class="ix-sw-step" data-phase="error">
    <span class="ix-sw-step-label">Step 2</span>
    <span class="ix-sw-step-title">Diagnose</span>
    <div class="ix-sw-step-body">
      <p><strong>Identify which PRAO phase failed.</strong> The failure mode tells you exactly what to fix -- you don't have to guess.</p>
      <div class="ix-char-grid">
        <div class="ix-char-item" data-phase="perceive"><strong>Perceive</strong><span>Claude didn't "see" what it needed. Missing or misleading input. Fix: add missing context.</span></div>
        <div class="ix-char-item" data-phase="reason"><strong>Reason</strong><span>Claude saw the right input but reasoned incorrectly. Task spec ambiguous or constraints underspecified. Fix: add precision.</span></div>
        <div class="ix-char-item" data-phase="act"><strong>Act</strong><span>Claude reasoned correctly but output was wrong format, scope, or mechanics. Fix: refine Format or scope.</span></div>
        <div class="ix-char-item" data-phase="observe"><strong>Observe</strong><span>Less common in single-turn. Agent misinterpreted feedback in a multi-turn loop. Fix: clarify the feedback signal.</span></div>
      </div>
    </div>
  </div>
  <div class="ix-sw-step" data-phase="reason">
    <span class="ix-sw-step-label">Step 3</span>
    <span class="ix-sw-step-title">Hypothesize</span>
    <div class="ix-sw-step-body">
      <p><strong>Form one specific, falsifiable hypothesis.</strong> "If I add a pattern context example of our error handling style, Claude will match it rather than using generic Express error handling." One hypothesis, one change -- this maintains attribution clarity.</p>
      <div class="ix-diagram" data-component="callout" data-variant="key-concept">
        <p><strong>Why exactly one change:</strong> If you make 3 changes and output improves, you don't know which was responsible. A prompt that converged in 4 iterations with 1 change each is better understood than one that "worked" after 1 iteration with 5 simultaneous changes.</p>
      </div>
    </div>
  </div>
  <div class="ix-sw-step" data-phase="success">
    <span class="ix-sw-step-label">Step 4</span>
    <span class="ix-sw-step-title">Refine</span>
    <div class="ix-sw-step-body">
      <p><strong>Apply the single change, re-run, return to Step 2.</strong> If the hypothesis was correct, the specific failure is fixed. If not, you've learned something about the problem and can form a better hypothesis.</p>
    </div>
  </div>
</div>

<p class="ix-instruct">Step through the trace and read each annotation to understand the diagnostic reasoning at each point.</p>

<div class="ix-diagram" data-component="agent-trace"
     data-variant="annotated"
     data-diagram-id="m04-iteration-trace"
     data-default-mode="manual"
     data-speed="0.5">
  <span class="ix-title">Prompt iteration: diagnosing and fixing a Perceive failure</span>
  <div class="ix-trace-row" data-type="prompt" data-delay="0">
    <span class="ix-trace-content">> "Review src/api/handlers.ts for code quality issues. Output JSON with file, line, severity, issue, suggestion fields."</span>
    <span class="ix-trace-note">Iteration 1: GCCF-style prompt with basic format spec. No pattern context, no example.</span>
  </div>
  <div class="ix-trace-row" data-type="tool" data-delay="1500">
    <span class="ix-trace-content">Read("src/api/handlers.ts")</span>
    <span class="ix-trace-note">Agent reads the target file -- the Perceive phase begins.</span>
  </div>
  <div class="ix-trace-row" data-type="result" data-delay="1500">
    <span class="ix-trace-content">-> 89 lines, exports: createUser(), getUser(), updateUser(), deleteUser()</span>
    <span class="ix-trace-note">Agent has the file contents in context.</span>
  </div>
  <div class="ix-trace-row" data-type="think" data-delay="3500">
    <span class="ix-trace-content">I will review this file for code quality. I see no input validation on createUser, a SQL concatenation in getUser, and inconsistent error handling.</span>
    <span class="ix-trace-note">Reason phase: the agent identifies real issues. But it has no project-specific patterns to compare against.</span>
  </div>
  <div class="ix-trace-row" data-type="response" data-delay="2500">
    <span class="ix-trace-content">{"issues": [{"file": "src/api/handlers.ts", "line": 12, "severity": "high", "issue": "No input validation", "suggestion": "Add validation middleware"}]}</span>
    <span class="ix-trace-note">Act phase: output uses generic Express patterns. "Add validation middleware" is not how YOUR codebase does validation.</span>
  </div>
  <div class="ix-trace-row" data-type="think" data-delay="4000">
    <span class="ix-trace-content">[Developer diagnosis] Perceive failure: the agent had no pattern context showing how our codebase validates input. It defaulted to generic Express middleware advice. Hypothesis: adding a pattern example from our existing validation code will fix this.</span>
    <span class="ix-trace-note">Diagnostic step: the developer maps the failure to the Perceive phase and forms a single hypothesis.</span>
  </div>
  <div class="ix-trace-row" data-type="prompt" data-delay="2000">
    <span class="ix-trace-content">> "Review src/api/handlers.ts for code quality issues. Here is how we validate input in this codebase: [excerpt from src/api/users.ts showing Zod schema validation]. Match this pattern in suggestions."</span>
    <span class="ix-trace-note">Iteration 2: one change -- added Pattern context from the actual codebase. Same task, same format.</span>
  </div>
  <div class="ix-trace-row" data-type="response" data-delay="2500">
    <span class="ix-trace-content">{"issues": [{"file": "src/api/handlers.ts", "line": 12, "severity": "high", "issue": "No Zod schema validation on createUser input", "suggestion": "Add UserCreateSchema.parse(req.body) before processing"}]}</span>
    <span class="ix-trace-note">Now the suggestion matches your codebase's pattern. The Perceive failure is resolved.</span>
  </div>
</div>

<p class="ix-instruct">Click each symptom to reveal which PRAO phase failed and the fix.</p>

<div class="ix-diagram" data-component="reveal-quiz" data-diagram-id="m04-failure-diagnosis">
  <span class="ix-title">Failure diagnosis reference</span>
  <div class="ix-reveal-item" data-answer="perceive" data-label="Perceive" data-variant="scenario">
    <div class="ix-reveal-prompt">Generic library patterns instead of project conventions</div>
    <div class="ix-reveal-why">Add concrete codebase example as Pattern Context. The agent didn't "see" your project's conventions -- it defaulted to training data patterns.</div>
  </div>
  <div class="ix-reveal-item" data-answer="reason" data-label="Reason" data-variant="scenario">
    <div class="ix-reveal-prompt">Modifies files outside the intended scope</div>
    <div class="ix-reveal-why">Add explicit scope constraint listing excluded files. The agent reasoned that those files were relevant, but your intent was narrower.</div>
  </div>
  <div class="ix-reveal-item" data-answer="act" data-label="Act" data-variant="scenario">
    <div class="ix-reveal-prompt">Format almost correct but field names wrong</div>
    <div class="ix-reveal-why">Add explicit schema with exact field names. The agent's reasoning was correct but the output mechanics diverged from your expected structure.</div>
  </div>
  <div class="ix-reveal-item" data-answer="reason" data-label="Reason" data-variant="scenario">
    <div class="ix-reveal-prompt">Output is too broad -- does more than asked</div>
    <div class="ix-reveal-why">Replace vague verb with precise operation. The underspecified verb ("improve", "update") admitted a wider interpretation than intended.</div>
  </div>
  <div class="ix-reveal-item" data-answer="perceive" data-label="Perceive" data-variant="scenario">
    <div class="ix-reveal-prompt">Missing edge case the example didn't cover</div>
    <div class="ix-reveal-why">Add example that includes the edge case. The agent's perception was incomplete -- it had no demonstration of the boundary condition.</div>
  </div>
  <div class="ix-reveal-item" data-answer="act" data-label="Act" data-variant="scenario">
    <div class="ix-reveal-prompt">Shows plan then proceeds without waiting</div>
    <div class="ix-reveal-why">Rewrite approval constraint with explicit wait instruction. The agent acted on its plan immediately because the constraint lacked a clear "do not proceed until I confirm."</div>
  </div>
</div>

<details class="ix-collapse">
<summary>Deep Dive: Why single-change discipline matters</summary>
<div class="ix-collapse-body">
<p>The one-change discipline serves two purposes beyond attribution clarity. First, it forces you to commit to a specific diagnosis before acting, which trains the diagnostic skill itself. Over time, you develop an intuition for which PRAO phase failed just by reading the output -- a skill that transfers to debugging agent behavior in production systems.</p>
<p>Second, it prevents the common failure mode of over-engineering prompts: adding context, examples, constraints, and format specifications simultaneously until the prompt is bloated and brittle. Every element in a TCEF prompt should be there because a specific failure mode demonstrated its necessity -- not because it seemed like it might help.</p>
<p>A prompt that converged in four iterations with one change each is better understood and more maintainable than a prompt that "worked" after a single iteration in which five elements were added simultaneously. When the task requirements change, you know exactly which elements to update because you know why each one is there.</p>
</div>
</details>

---

## Module 04 Knowledge Check

<div class="ix-diagram" data-component="objective">
  <p>Demonstrate mastery of the TCEF pattern, context injection strategies, constraint specification, and the prompt iteration loop.</p>
</div>

<p class="ix-instruct">Test your understanding of prompt engineering depth. All reference material is visible above.</p>

<div class="ix-diagram" data-component="quiz" data-diagram-id="m04-knowledge-check" data-xp="15">
  <span class="ix-title">Knowledge Check: Prompt Engineering Depth</span>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q1.</strong> A developer asks Claude to "fix the authentication bugs." The output is technically correct but addresses the wrong bugs. Which TCEF element was most likely missing?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">Format -- the output structure was wrong</button>
      <button class="ix-quiz-option" data-correct="true">Task -- the verb "fix" is underspecified; precise scope was missing</button>
      <button class="ix-quiz-option">Examples -- Claude needed more few-shot examples</button>
      <button class="ix-quiz-option">Context -- Claude did not have the right files</button>
    </div>
    <p class="ix-quiz-explanation">"Fix" is an underspecified verb that admits many interpretations. The Task element should use a precision verb and specify exactly which bugs or behaviors to address. The output was technically correct -- just for the wrong interpretation.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q2.</strong> You are building a prompt for Claude to generate API endpoint handlers that match your codebase style. Which context injection strategy is most effective?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">Audience context -- specify who reads the code</button>
      <button class="ix-quiz-option">State context -- describe recent changes</button>
      <button class="ix-quiz-option" data-correct="true">Pattern context -- include a short excerpt of an existing handler from your codebase</button>
      <button class="ix-quiz-option">Constraint context -- list what must not change</button>
    </div>
    <p class="ix-quiz-explanation">Pattern context answers "what does correct look like in this codebase?" A concrete excerpt from an existing handler demonstrates error shapes, middleware patterns, and logging conventions simultaneously -- information that prose descriptions cannot convey with the same precision.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q3.</strong> A TCEF prompt produces correct JSON output, but the field is named <code>findings</code> when your parser expects <code>issues</code>. What should you add?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">More examples showing the correct field name</button>
      <button class="ix-quiz-option">A constraint saying "do not rename fields"</button>
      <button class="ix-quiz-option">Pattern context from a working response</button>
      <button class="ix-quiz-option" data-correct="true">An explicit output schema in the Format element with exact field names</button>
    </div>
    <p class="ix-quiz-explanation">Field naming is a Format problem. The Format element should define an explicit schema with exact field names, types, and nesting. The downstream parser should be able to write its parsing logic from the Format spec alone.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q4.</strong> You add three changes to a failing prompt simultaneously: pattern context, a scope constraint, and a format schema. The output improves. What is the problem with this approach?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">Three changes is too many for Claude to process at once</button>
      <button class="ix-quiz-option" data-correct="true">You cannot attribute the improvement to any specific change, so you do not know which elements were actually necessary</button>
      <button class="ix-quiz-option">Pattern context and format schema always conflict with each other</button>
      <button class="ix-quiz-option">Scope constraints should always be added last in the iteration sequence</button>
    </div>
    <p class="ix-quiz-explanation">This is the core argument for single-change discipline. With three simultaneous changes, the improvement could be from one, two, or all three. You cannot remove the unnecessary elements, and the prompt may be bloated with redundant specifications that make future maintenance harder.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q5.</strong> Which of these is a meaningful, enforceable constraint?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">"Follow best practices for error handling"</button>
      <button class="ix-quiz-option">"Make sure the code is secure"</button>
      <button class="ix-quiz-option" data-correct="true">"Use parameterized queries for all database calls -- no string concatenation in SQL"</button>
      <button class="ix-quiz-option">"Keep the code clean and readable"</button>
    </div>
    <p class="ix-quiz-explanation">An enforceable constraint is specific enough to verify by inspection. "Use parameterized queries" names the exact technique, "no string concatenation in SQL" names the exact anti-pattern. The other options use subjective terms ("best practices," "secure," "clean") that cannot be verified.</p>
  </div>
</div>

---

## Lab Connection

Building on the prompt foundations from Module 03, **Lab 05** applies this module's concepts directly. You will receive context fragments for a code review task and identify signal versus noise. You will then write a TCEF prompt, run it, diagnose the failure mode using the PRAO lens, and iterate until the output matches a provided specification.

---

## Further Reading

- [Anthropic Prompt Engineering Guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)
- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- Brown, T. B., et al. (2020). *Language Models are Few-Shot Learners.* https://arxiv.org/abs/2005.14165

---

[Previous Module -- Module 03](/module/03) | [Next Module -- Module 05](/module/05)
