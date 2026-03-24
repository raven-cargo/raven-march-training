<div class="ix-diagram" data-component="module-hero">
<div class="ix-hero">
<div class="ix-hero-bg" data-phase="act"></div>
<div class="ix-hero-module-num">Module 11</div>
<div class="ix-hero-title">Tech Stack Adaptation</div>
<div class="ix-hero-subtitle">Close the gap between course demos and production reality by encoding your stack, conventions, and team decisions into the agent's context</div>
<div class="ix-hero-chips">
<span class="ix-hero-chip">Adaptation Problem</span>
<span class="ix-hero-chip">Context7 Pre-loading</span>
<span class="ix-hero-chip">Stack CLAUDE.md</span>
<span class="ix-hero-chip">TCEF for Your Stack</span>
<span class="ix-hero-chip">Deployment Checklist</span>
</div>
</div>
</div>

# Module 11: Tech Stack Adaptation
---

## Overview

<div class="ix-diagram" data-component="objective">
<p>Adapt generic agentic patterns to your organization's specific stack by pre-loading accurate documentation, encoding team conventions, writing stack-specific prompts, and executing a production deployment checklist.</p>
</div>

Modules 02 through 10 taught generic patterns: CLAUDE.md structure, skills composition, MCP server wiring, security gates. Now we close the gap -- what it actually takes to make those patterns deliver consistent value in your organization's specific environment, with your specific versions, your naming rules, and your accumulated team decisions.

<p class="ix-instruct">Write your prediction, then reveal the reference reasoning.</p>

<div class="ix-diagram" data-component="predict-reveal" data-diagram-id="m11-overview-predict" data-xp="8">
<span class="ix-title">Predict Before You Learn</span>
<p class="ix-predict-prompt">Your agent's code compiles and tests pass, but every PR still gets the same convention fixes. What context is missing, and what one-word fix category resolves it?</p>
<textarea class="ix-predict-input" aria-label="Your prediction" placeholder="Write your reasoning -- what is missing and why does it keep happening?"></textarea>
<details class="ix-predict-reveal">
<summary>Reveal reference reasoning</summary>
<p>The agent's training data knows how to write code, but it does not know <strong>how your team writes code</strong>. Compiling and passing tests is a low bar -- the agent clears it. Convention compliance is a higher bar that requires explicit context. The one-word fix is <strong>encoding</strong>: encoding your team's decisions into CLAUDE.md, skills, and prompts so the agent has access to them on every run. Technically correct code that violates team conventions is the signature failure of a generic, unadapted agentic setup.</p>
</details>
</div>

---

## 11.1 The Adaptation Problem

<div class="ix-diagram" data-component="objective">
<p>Diagnose the three gaps -- documentation currency, convention encoding, and context grounding -- that cause organizational deployment failures.</p>
</div>

A well-constructed lab succeeds because the environment is designed to match the agent's capabilities. Organizational deployment is different in almost every dimension. The gap between them is not a single problem -- it is three distinct problems that require three distinct interventions.

<p class="ix-instruct">Write your prediction, then reveal the reference reasoning.</p>

<div class="ix-diagram" data-component="predict-reveal" data-diagram-id="m11-adapt-predict" data-xp="8">
<span class="ix-title">Predict Before You Learn</span>
<p class="ix-predict-prompt">Your team standardized on React Query, but a fresh session generates <code>useEffect</code> data fetching. Why does this happen, and what one-word action fixes it?</p>
<textarea class="ix-predict-input" aria-label="Your prediction" placeholder="Write your reasoning -- why useEffect, and what is the fix?"></textarea>
<details class="ix-predict-reveal">
<summary>Reveal reference reasoning</summary>
<p>The agent uses <code>useEffect</code> because that is what its training data shows for React data fetching -- it has seen millions of examples. Your team's six-month-old decision to switch to React Query exists nowhere in the agent's context. The agent is not wrong by any absolute standard; it is wrong for <strong>your</strong> codebase. The one-word fix is <strong>encode</strong>: encode the decision into CLAUDE.md so it is present from the first loop iteration of every session.</p>
</details>
</div>

<p class="ix-instruct">Click each card to explore what causes the gap and what fixes it.</p>

<div class="ix-diagram" data-component="click-cards" data-diagram-id="m11-three-gaps">
<span class="ix-title">The Three Adaptation Gaps</span>
<div class="ix-card" data-phase="reason">
<i data-lucide="clock" class="ix-card-icon"></i>
<span class="ix-card-label">Documentation Currency</span>
<span class="ix-card-sub">Agent suggests <code>getServerSideProps</code> in a Next.js 15 App Router project</span>
</div>
<div class="ix-card" data-phase="act">
<i data-lucide="code-2" class="ix-card-icon"></i>
<span class="ix-card-label">Convention Encoding</span>
<span class="ix-card-sub">Agent uses <code>useEffect</code> when your team mandates React Query</span>
</div>
<div class="ix-card" data-phase="observe">
<i data-lucide="map-pin" class="ix-card-icon"></i>
<span class="ix-card-label">Context Grounding</span>
<span class="ix-card-sub">Agent generates a service-layer function that bypasses your DI container</span>
</div>
<div class="ix-detail-panel">
<div class="ix-detail-header" data-phase="reason">Documentation Currency</div>
<div class="ix-detail-body">
<div class="ix-section">
<div class="ix-sec-label">What Causes It</div>
<div class="ix-sec-text">AI models are trained on data with a cutoff date. For rapidly evolving frameworks, the model's knowledge of current APIs and patterns may be months or years out of date. An agent advising on Next.js 15 with training data from an earlier major version will suggest patterns that are not just outdated but actively wrong.</div>
</div>
<div class="ix-section">
<div class="ix-sec-label">What Fixes It</div>
<div class="ix-sec-text"><strong>Context7 pre-loading.</strong> Context7 is an MCP server that fetches current documentation directly from official sources and makes it available in the session. Pre-loading brings the agent's knowledge of version-sensitive libraries up to date before work begins.</div>
</div>
</div>
</div>
<div class="ix-detail-panel">
<div class="ix-detail-header" data-phase="act">Convention Encoding</div>
<div class="ix-detail-body">
<div class="ix-section">
<div class="ix-sec-label">What Causes It</div>
<div class="ix-sec-text">Your team has made thousands of implicit decisions about how code should be written: naming conventions, which libraries to use, which patterns are forbidden, how errors are wrapped. None of these exist in a form the agent can discover from the codebase alone. They are distributed across PR comments, architectural decision records, and institutional memory.</div>
</div>
<div class="ix-section">
<div class="ix-sec-label">What Fixes It</div>
<div class="ix-sec-text"><strong>CLAUDE.md stack encoding + skills.</strong> Explicit directives in CLAUDE.md ("NEVER use <code>useEffect</code> for data fetching; use React Query") and reusable skill files for repeated patterns encode the team's decisions into persistent session context.</div>
</div>
</div>
</div>
<div class="ix-detail-panel">
<div class="ix-detail-header" data-phase="observe">Context Grounding</div>
<div class="ix-detail-body">
<div class="ix-section">
<div class="ix-sec-label">What Causes It</div>
<div class="ix-sec-text">The agent does not know which layer of your system it is operating in, what the contracts are between this module and its callers, what invariants must be preserved, or what the deployment target is. Generic code generation that ignores these questions produces code that may work in isolation but fails to integrate.</div>
</div>
<div class="ix-section">
<div class="ix-sec-label">What Fixes It</div>
<div class="ix-sec-text"><strong>Architecture documentation in CLAUDE.md.</strong> Explicit descriptions of the layered structure, data flow, and key files (main schema, auth middleware, shared types) give the agent the architectural awareness to generate code that fits where it needs to go.</div>
</div>
</div>
</div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="core-idea">
<p><strong>Generic is not good enough for production.</strong> The difference between an agentic workflow that demonstrates well in a course lab and one that delivers consistent value in your organization is the degree to which it has been adapted to your specific technology choices, naming conventions, and team decisions. An agent that produces technically correct but organizationally wrong code erodes trust faster than outright errors do -- because it requires correction on every interaction.</p>
</div>

<div class="ix-diagram" data-component="callout" data-variant="key-concept">
<p><strong>Adaptation investment produces compounding returns.</strong> Time spent writing a thorough CLAUDE.md reduces the correction burden on every subsequent session. Time spent encoding a skill for your team's error-handling pattern produces correct error handling on every invocation of that skill, permanently. The breakeven on this investment is typically reached within the first few weeks of active use.</p>
</div>

<details class="ix-collapse">
<summary>Deep Dive: The cost of not adapting -- friction, not catastrophic failure</summary>
<div class="ix-collapse-body">
<p>The cost of not adapting is not catastrophic failure. The agent will still produce code, and that code will often compile and sometimes work. The cost is friction: every output requires review against conventions the agent did not know, every suggestion requires consideration of context the agent did not have, every code generation produces a draft rather than a deliverable.</p>
<p>This friction is invisible in aggregate but very visible per-interaction. A developer who must manually correct three things per agent suggestion will, over time, reduce their reliance on the agent for those suggestions. The tool gets mentally categorized as "faster autocomplete" rather than "engineering collaborator." The potential ROI of agentic coding narrows to the cases where convention compliance is not critical.</p>
<p>The mismatches that erode trust the most are the subtle ones -- not syntax errors but architectural mismatches, not compilation failures but convention violations. A suggestion to use <code>useEffect</code> in a React Query codebase is not wrong in any way the type system can catch. It looks like valid code. It requires a human who knows the convention to recognize and correct it. That is the failure mode adaptation prevents.</p>
</div>
</details>

---

## 11.2 Context7 for Documentation Pre-Loading

<div class="ix-diagram" data-component="objective">
<p>Use Context7 to pre-load current library documentation for version-sensitive frameworks before starting agentic sessions on those codebases.</p>
</div>

Context7 is an MCP server -- it connects to Claude Code using the same stdio or Streamable HTTP transport as any other MCP server. For new remote deployments, use Streamable HTTP; HTTP+SSE is a deprecated legacy path from older protocol versions. It fetches and indexes current documentation for software libraries, making that documentation available to the agent as a resource it can reference during a session. Unlike the model's training data, which is a fixed snapshot, Context7 fetches from the current state of official sources.

<p class="ix-instruct">Step through the three-step Context7 workflow to see how pre-loading works.</p>

<div class="ix-diagram" data-component="step-walkthrough" data-diagram-id="m11-ctx7-workflow">
<span class="ix-title">Context7 Pre-Load Workflow</span>
<div class="ix-step">
<div class="ix-step-num">1</div>
<div class="ix-step-content">
<div class="ix-step-title">Resolve the library identifier</div>
<div class="ix-step-body">Context7 uses library identifiers to locate documentation. The <code>resolve-library-id</code> tool takes a library name and returns the canonical identifier Context7 uses for that library.
<pre><code>Use the Context7 MCP tool to resolve the library ID for "next.js"
→ Library ID: /vercel/next.js</code></pre>
</div>
</div>
</div>
<div class="ix-step">
<div class="ix-step-num">2</div>
<div class="ix-step-content">
<div class="ix-step-title">Fetch documentation for the relevant topic</div>
<div class="ix-step-body">The <code>query-docs</code> tool fetches documentation for a specific topic within a library using the resolved ID. Target the documentation most relevant to your current task.
<pre><code>Use Context7 to fetch Next.js App Router documentation,
specifically Server Components and the data fetching patterns
available in them. Library ID: /vercel/next.js</code></pre>
</div>
</div>
</div>
<div class="ix-step">
<div class="ix-step-num">3</div>
<div class="ix-step-content">
<div class="ix-step-title">Confirm documentation is loaded</div>
<div class="ix-step-body">Ask the agent to confirm before proceeding. This ensures the documentation is in context and surfaces any resolution failures before the actual work begins. The agent responds with a confirmation like: <strong>"Stack documentation loaded. Ready to proceed."</strong> This confirmation also gives you a checkpoint to add more libraries if needed.</div>
</div>
</div>
</div>

<p class="ix-instruct">Review each entry to see which libraries benefit most from Context7 pre-loading -- and which ones do not need it.</p>

<div class="ix-diagram" data-component="entry-list" data-diagram-id="m11-ctx7-libraries">
<span class="ix-title">Context7 Pre-Loading: Include vs Skip</span>
<div class="ix-entry-section" data-label="Pre-load these (version-sensitive)">
<div class="ix-entry" data-badge="include">
<div class="ix-entry-title">Next.js</div>
<div class="ix-entry-body">Major App Router change between 12/13 and 14/15. Training data may contain significant Pages Router examples that are wrong for App Router projects.</div>
</div>
<div class="ix-entry" data-badge="include">
<div class="ix-entry-title">React</div>
<div class="ix-entry-body">Class components to hooks to Server Components represents three distinct paradigms. Version-specific patterns vary significantly.</div>
</div>
<div class="ix-entry" data-badge="include">
<div class="ix-entry-title">Pydantic</div>
<div class="ix-entry-body">v1 to v2 migration changed core APIs: <code>@validator</code> replaced by <code>model_validator</code>, <code>class Config</code> replaced by <code>ConfigDict</code>. v1 patterns are actively wrong in v2 codebases.</div>
</div>
<div class="ix-entry" data-badge="include">
<div class="ix-entry-title">SQLAlchemy</div>
<div class="ix-entry-body">1.x to 2.0 async patterns changed significantly. ORM query syntax changed. Training data has heavy 1.x representation.</div>
</div>
</div>
<div class="ix-entry-section" data-label="Skip these (stable APIs, broad training coverage)">
<div class="ix-entry" data-badge="exclude">
<div class="ix-entry-title">Python standard library</div>
<div class="ix-entry-body">Evolves slowly, has been in widespread use for decades, model training data is comprehensive and accurate.</div>
</div>
<div class="ix-entry" data-badge="exclude">
<div class="ix-entry-title">Java core libraries</div>
<div class="ix-entry-body">Core Java APIs are stable across major versions. Training data representation is deep and reliable.</div>
</div>
<div class="ix-entry" data-badge="exclude">
<div class="ix-entry-title">Unix CLI tools</div>
<div class="ix-entry-body"><code>grep</code>, <code>awk</code>, <code>sed</code>, <code>curl</code> -- these have not changed meaningfully in years. Pre-loading adds no value.</div>
</div>
</div>
</div>

<p class="ix-instruct">Watch the trace replay to see a Context7 pre-load session in action.</p>

<div class="ix-diagram" data-component="agent-trace"
     data-variant="terminal"
     data-diagram-id="m11-ctx7-trace"
     data-speed="0.5">
<span class="ix-title">Context7 Pre-Load Session (from prep-agent-session.sh)</span>
<div class="ix-trace-row" data-type="prompt" data-delay="0">
<span class="ix-trace-content">> Before we start, please pre-load documentation for our tech stack: (1) Resolve and fetch Next.js 15 App Router docs, focusing on Server Components and the new caching model. (2) Fetch Prisma 5.x docs, focusing on the $transaction API and typed SQL queries. (3) Fetch Zod docs, focusing on .transform() and .refine(). Once loaded, confirm with "Stack documentation loaded."</span>
</div>
<div class="ix-trace-row" data-type="think" data-delay="3500">
<span class="ix-trace-content">I'll resolve all three library IDs first, then fetch the relevant documentation topics for each. Starting with Next.js.</span>
</div>
<div class="ix-trace-row" data-type="tool" data-delay="1500">
<span class="ix-trace-content">context7: resolve-library-id("next.js")</span>
</div>
<div class="ix-trace-row" data-type="result" data-delay="1500">
<span class="ix-trace-content">-> Library ID: /vercel/next.js</span>
</div>
<div class="ix-trace-row" data-type="tool" data-delay="1500">
<span class="ix-trace-content">context7: query-docs(/vercel/next.js, topic="App Router Server Components caching")</span>
</div>
<div class="ix-trace-row" data-type="result" data-delay="1500">
<span class="ix-trace-content">-> Fetched 4,200 tokens of Next.js 15 App Router documentation (Server Components, fetch caching, use cache directive)</span>
</div>
<div class="ix-trace-row" data-type="response" data-delay="2500">
<span class="ix-trace-content">Stack documentation loaded. Next.js 15 App Router (4,200 tokens), Prisma 5.x $transaction API (2,800 tokens), Zod schema validation (1,900 tokens). Ready to proceed.</span>
</div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="tip">
<p><strong>Create a <code>prep-agent-session.sh</code> for your stack.</strong> Turn the Context7 pre-load prompt into a shell script that prints the pre-load instructions to copy-paste at session start. This makes the pre-load repeatable, shareable across the team, and self-documenting about which library versions the team targets. Store it in the repo root so every team member uses the same pre-load.</p>
</div>

<details class="ix-collapse">
<summary>Deep Dive: Which libraries benefit most and why training data cutoffs matter</summary>
<div class="ix-collapse-body">
<p>Context7 is most valuable for libraries that meet one or more of these criteria: rapid major version evolution with breaking changes, a large API surface where deprecated methods look like valid alternatives, and recent major changes where the model has heavy training representation of the old approach but not the new one.</p>
<p>The training data cutoff problem is asymmetric. A library that made a major breaking change six months ago will have years of training data showing the old patterns and only months showing the new ones. The model's prior for the old pattern is much stronger. Without explicit documentation in context, the model will often default to what it has seen more frequently -- which is the wrong version for your project.</p>
<p>This is why exact version specification matters. "Use Next.js App Router" is ambiguous in a model that has seen both Next.js 12 with experimental App Router and Next.js 15 with stable App Router. "Use Next.js 15.x App Router with the stable <code>use cache</code> directive" is unambiguous. Context7 loaded documentation gives the model the precise vocabulary to match your version.</p>
<p>Context7 uses stdio transport when running as a local MCP server and Streamable HTTP when accessed remotely. HTTP+SSE is deprecated in current MCP specs and should be treated as legacy compatibility only.</p>
</div>
</details>

---

## 11.3 CLAUDE.md for Stack Encoding

<div class="ix-diagram" data-component="objective">
<p>Write a CLAUDE.md tech stack section that encodes exact versions, architecture patterns, naming conventions, and code generation rules specific to your organization's codebase.</p>
</div>

CLAUDE.md is read at session start, making every entry available from the first Agentic Loop iteration. This makes it the right location for organization-specific decisions the agent cannot infer from the codebase alone.

<div class="ix-diagram" data-component="callout" data-variant="core-idea">
<p><strong>Five categories every stack CLAUDE.md must cover:</strong> (1) <strong>Framework versions</strong> -- exact version numbers with implications of the version choice; (2) <strong>Architecture patterns</strong> -- directory structure, data flow, which abstractions belong at which layer; (3) <strong>Naming conventions</strong> -- file names, variable names, database columns, CSS class names; (4) <strong>Code generation rules</strong> -- explicit do/don't directives encoding accumulated team decisions; (5) <strong>Key files</strong> -- pointers to the main schema, routing config, auth middleware, shared type definitions.</p>
</div>

<p class="ix-instruct">Switch between tabs to see CLAUDE.md stack encoding examples for five different tech stacks.</p>

<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="m11-stack-tabs">
<span class="ix-title">Stack CLAUDE.md Examples</span>
<div data-tab="Next.js 15">
<pre><code>## Tech Stack: Next.js 15 + TypeScript

### Framework Version
- Next.js: 15.x (App Router)
- React: 19.x
- TypeScript: 5.x (strict mode)

### Architecture
- All routes live in app/ using App Router conventions
- Server Components are the default; Client Components
  require explicit 'use client' directive
- Database access happens ONLY in Server Components and
  Route Handlers, never in Client Components
- Shared types live in types/ at the project root
- Server actions live in app/actions/ with 'use server'

### Code Generation Rules
- NEVER use getServerSideProps or getStaticProps
- NEVER fetch data in Client Components using useEffect
- ALWAYS use the Image component from next/image
- ALWAYS use Link from next/link for internal navigation
- Use loading.tsx and error.tsx for loading/error states
- Use Zod for ALL runtime validation

### Naming Conventions
- Route handlers: app/api/[resource]/route.ts
- Page components: app/[path]/page.tsx
- Server actions: camelCase verb+noun (createUser, deleteSession)
- Zod schemas: PascalCase + Schema suffix (CreateUserSchema)</code></pre>
</div>
<div data-tab="FastAPI">
<pre><code>## Tech Stack: FastAPI + Python 3.12 + Pydantic v2

### Framework Versions
- FastAPI: 0.115.x
- Pydantic: v2.x (NOT v1 -- migration is complete)
- SQLAlchemy: 2.x with async engine

### Architecture
- Routers live in app/routers/, one file per resource
- Models (Pydantic) live in app/schemas/
- Database models (SQLAlchemy) live in app/models/
- Business logic lives in app/services/
- Database session injected via FastAPI dependency injection

### Code Generation Rules
- ALWAYS use model_validator and field_validator (Pydantic v2)
  NOT @validator (that is Pydantic v1)
- ALWAYS use model_config = ConfigDict(...) NOT class Config:
- ALWAYS use async def for route handlers
- Use Annotated[type, Field(...)] syntax for field definitions
- Response models must be defined; NEVER return SQLAlchemy
  ORM objects directly from route handlers

### Pydantic v2 Patterns
- Field: email: Annotated[str, Field(min_length=5)]
- Cross-field validation: @model_validator(mode='after')
- Strict mode: model_config = ConfigDict(strict=True)</code></pre>
</div>
<div data-tab="Spring Boot">
<pre><code>## Tech Stack: Spring Boot 3.x + Java 21

### Framework Versions
- Spring Boot: 3.3.x
- Java: 21 (virtual threads enabled)
- Spring Data JPA + Hibernate 6

### Architecture
- Controllers: com.org.project.controller
- Services: com.org.project.service
- Repositories: com.org.project.repository
- DTOs: com.org.project.dto (separate from entities)
- Entities: com.org.project.entity

### Code Generation Rules
- ALWAYS use Java records for DTOs
- ALWAYS use sealed interfaces for domain discriminated unions
- Virtual threads: spring.threads.virtual.enabled=true is set
- Use @Transactional(readOnly = true) for read-only methods
- NEVER expose JPA entities directly from controllers;
  always map to DTOs

### Error Handling
- All service-layer errors must extend ApplicationException
- Controller advice in GlobalExceptionHandler handles all
- Never throw raw JPA exceptions from service methods; wrap</code></pre>
</div>
<div data-tab="Rails 7">
<pre><code>## Tech Stack: Rails 7.2 + Hotwire (Turbo + Stimulus)

### Framework Versions
- Rails: 7.2.x
- Ruby: 3.3.x
- Turbo: 8.x / Stimulus: 3.x

### Architecture
- Standard Rails MVC with Hotwire for interactivity
- No separate frontend build: importmap-rails for JavaScript
- Database: PostgreSQL with pg gem

### Code Generation Rules
- Prefer Turbo Frames and Turbo Streams over full-page nav
- Stimulus controllers live in app/javascript/controllers/
- Each Stimulus controller targets a behavior, not a page
- Use respond_to blocks for turbo_stream + html responses
- NEVER use remote: true (deprecated); use Turbo instead
- Forms use data-turbo-frame to target the correct frame

### Turbo Patterns
- Inline editing: wrap in a Turbo Frame with matching id
- Live updates: broadcast Turbo Streams from AR callbacks
- Optimistic UI: update the frame, let server confirm</code></pre>
</div>
<div data-tab="Go">
<pre><code>## Tech Stack: Go 1.23 + Standard Library

### Go Version
- Go: 1.23.x
- No ORM: raw database/sql with sqlx for struct scanning
- HTTP: net/http (stdlib), no external router framework
- Testing: testing + testify

### Architecture
- Handlers: internal/handler/
- Business logic: internal/service/
- Database access: internal/store/
- Domain types: internal/domain/
- Entry point: cmd/server/

### Code Generation Rules
- ALWAYS handle errors explicitly; never use _ for errors
- Wrap errors: fmt.Errorf("service.CreateUser: %w", err)
- Sentinel errors: var ErrNotFound = errors.New("not found")
- Table-driven tests mandatory for multiple input cases
- Interfaces defined at consumer, not at implementation
- Context passed as first parameter to all I/O functions

### Error Handling Convention
- Service layer wraps errors with package-qualified function name
- Handler layer converts domain errors to HTTP status codes
- Never log in service layer; log at handler layer only</code></pre>
</div>
</div>

<p class="ix-instruct">Click each item to reveal whether it is a good organizational rule or too generic for CLAUDE.md.</p>

<div class="ix-diagram" data-component="reveal-quiz" data-diagram-id="m11-rule-quality">
<span class="ix-title">Good Org Rule or Too Generic?</span>
<div class="ix-rq-item" data-answer="good" data-label="Good org rule">
<span class="ix-rq-text">Use Zod for all runtime validation</span>
</div>
<div class="ix-rq-item" data-answer="bad" data-label="Too generic">
<span class="ix-rq-text">Handle errors properly</span>
</div>
<div class="ix-rq-item" data-answer="good" data-label="Good org rule">
<span class="ix-rq-text">NEVER use getServerSideProps -- this is an App Router project</span>
</div>
<div class="ix-rq-item" data-answer="bad" data-label="Too generic">
<span class="ix-rq-text">Write clean code</span>
</div>
<div class="ix-rq-item" data-answer="good" data-label="Good org rule">
<span class="ix-rq-text">Use model_validator(mode='after') for cross-field validation</span>
</div>
<div class="ix-rq-item" data-answer="good" data-label="Good org rule">
<span class="ix-rq-text">Server actions live in app/actions/ and are marked with 'use server'</span>
</div>
<div class="ix-rq-item" data-answer="bad" data-label="Too generic">
<span class="ix-rq-text">Be concise</span>
</div>
<div class="ix-rq-item" data-answer="good" data-label="Good org rule">
<span class="ix-rq-text">Never expose JPA entities directly from controllers; always map to DTOs</span>
</div>
<div class="ix-rq-item" data-answer="bad" data-label="Too generic">
<span class="ix-rq-text">Document your functions</span>
</div>
<div class="ix-rq-item" data-answer="good" data-label="Good org rule">
<span class="ix-rq-text">Wrap errors with fmt.Errorf("package.Function: %w", err)</span>
</div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="warning">
<p><strong>Don't put generic advice in CLAUDE.md.</strong> Entries like "write clean code" or "handle errors" consume space without providing any information the agent could not already infer. CLAUDE.md is valuable because it is specific -- every entry should encode a decision your team made that the agent could not reasonably discover from the codebase alone. When CLAUDE.md is full of generic advice, the signal-to-noise ratio drops and the genuinely useful entries lose impact.</p>
</div>

<details class="ix-collapse">
<summary>Deep Dive: Why "don't" rules are often more valuable than "do" rules</summary>
<div class="ix-collapse-body">
<p>Affirmative rules tell the agent what to use. Prohibitive rules tell the agent what NOT to use -- and in many cases, the prohibitive rule is more valuable because it eliminates an entire category of wrong answers rather than nudging toward one right answer.</p>
<p>"NEVER use <code>getServerSideProps</code>" is more powerful than "Use Server Components" because it closes the door on a specific wrong answer the agent would otherwise consider. The agent knows how to write Server Components; it also knows how to write <code>getServerSideProps</code>. Without the prohibition, it might choose the wrong one based on subtle context signals. With the prohibition, the wrong choice is off the table entirely.</p>
<p>The same principle applies to library conflicts: "NEVER use <code>class-validator</code>; use Zod" is more useful than "Use Zod" because it prevents the agent from reaching for a library that is installed but not approved. The agent does not know your team's library policy from package.json -- it only knows which packages are available, not which ones are sanctioned.</p>
<p><strong>Note on skill YAML frontmatter:</strong> If you write skill files to encode stack patterns, the frontmatter should include <code>name:</code>, <code>version:</code>, and <code>applies_to:</code> fields. Do not include a <code>triggers:</code> field -- that is a LUXOR-specific convention, not a native Claude Code feature. See Module 05 for the correct skill frontmatter format used by Claude Code natively.</p>
</div>
</details>

---

## 11.4 Adapting Prompt Patterns to Your Stack

<div class="ix-diagram" data-component="objective">
<p>Write stack-specific TCEF prompts with concrete Examples and Constraints components that eliminate wrong-framework suggestions at the prompt level.</p>
</div>

The TCEF framework from Module 04 adapts naturally to each stack. The Examples component -- the most powerful component -- requires stack-specific instantiation. A generic example teaches the pattern; a stack-specific example encodes the convention.

<p class="ix-instruct">Compare the generic and stack-specific versions side by side -- then reflect on what the stack-specific version encodes that prose rules alone cannot.</p>

<div class="ix-diagram" data-component="compare" data-diagram-id="m11-tcef-compare" data-default-mode="manual" data-speed="0.5">
<span class="ix-title">Generic vs Stack-Specific TCEF Examples Component</span>
<div class="ix-compare-left">
<div class="ix-compare-label">Generic TCEF Example</div>
<pre><code>## Example

Example input:
A function that accepts user input

Example output:
The same function with validation added</code></pre>
<p>This tells the agent to add validation but gives it no information about <em>which</em> validation library to use, which version's API to apply, or what the expected output structure looks like.</p>
</div>
<div class="ix-compare-right">
<div class="ix-compare-label">Stack-Specific TCEF Example (FastAPI + Pydantic v2)</div>
<pre><code>## Example

Add validation to the CreateUserRequest schema.

Before:
class CreateUserRequest(BaseModel):
    email: str
    age: int

After (Pydantic v2 style):
class CreateUserRequest(BaseModel):
    model_config = ConfigDict(strict=True)
    email: Annotated[str, Field(
        min_length=5,
        pattern=r'^[\w.-]+@[\w.-]+\.\w+$'
    )]
    age: Annotated[int, Field(ge=0, le=150)]

    @model_validator(mode='after')
    def validate_adult_email(self) -> 'CreateUserRequest':
        if self.age &lt; 18 and '@edu' not in self.email:
            raise ValueError('Under-18 users need edu email')
        return self</code></pre>
<p>The example encodes <code>ConfigDict</code>, <code>Annotated</code>, <code>Field</code>, and <code>model_validator</code> -- all v2 API. Any v1-era suggestion (<code>@validator</code>, <code>class Config:</code>) is now implicitly wrong by comparison to the example.</p>
</div>
</div>

<p class="ix-instruct">Step through the skill creation workflow to see how to turn a repeated pattern into a reusable session resource.</p>

<div class="ix-diagram" data-component="step-walkthrough" data-diagram-id="m11-skill-workflow">
<span class="ix-title">Skill Creation Workflow for Stack Patterns</span>
<div class="ix-step">
<div class="ix-step-num">1</div>
<div class="ix-step-content">
<div class="ix-step-title">Identify a repeated pattern</div>
<div class="ix-step-body">Look for patterns you specify in multiple prompts per week -- error wrapping conventions, authentication patterns, schema validation approaches. If you are re-specifying it in every prompt, it belongs in a skill file.</div>
</div>
</div>
<div class="ix-step">
<div class="ix-step-num">2</div>
<div class="ix-step-content">
<div class="ix-step-title">Draft the skill file</div>
<div class="ix-step-body">Write a markdown file with frontmatter (<code>name:</code>, <code>version:</code>, <code>applies_to:</code>) and a body that describes the pattern with concrete code examples. The skill body is the Examples component of TCEF -- specific enough to constrain output, complete enough to be self-contained.
<pre><code>---
name: fastapi-pydantic-v2
version: 1.0
applies_to: [FastAPI 0.115+, Pydantic v2]
---

# FastAPI + Pydantic v2 Patterns
...</code></pre>
Note: <code>triggers:</code> is not a native Claude Code skill field -- it is a LUXOR convention. See Module 07 for standard skill frontmatter.</div>
</div>
</div>
<div class="ix-step">
<div class="ix-step-num">3</div>
<div class="ix-step-content">
<div class="ix-step-title">Test the skill in a session</div>
<div class="ix-step-body">Load the skill manually in a test session and run 3-5 representative prompts. Verify the agent applies the pattern correctly without being explicitly instructed to. If the agent reverts to the old pattern, the skill body needs more specificity.</div>
</div>
</div>
<div class="ix-step">
<div class="ix-step-num">4</div>
<div class="ix-step-content">
<div class="ix-step-title">Load via CLAUDE.md</div>
<div class="ix-step-body">Add a reference to the skill in your CLAUDE.md so it is pre-loaded at session start. This ensures the pattern is active from the first Agentic Loop iteration without requiring manual loading each session.</div>
</div>
</div>
</div>

<p class="ix-instruct">Step through the annotated trace to see TCEF with stack-specific constraints in action -- click the step button or press the right arrow key to advance.</p>

<div class="ix-diagram" data-component="agent-trace"
     data-variant="annotated"
     data-diagram-id="m11-tcef-trace"
     data-default-mode="manual"
     data-speed="0.5">
<span class="ix-title">TCEF Prompt with Stack-Specific Constraints (FastAPI + Pydantic v2)</span>
<div class="ix-trace-row" data-type="prompt" data-delay="0">
<span class="ix-trace-content">> Add Pydantic v2 validation to CreateUserRequest schema in app/schemas/user.py</span>
<span class="ix-trace-note"><strong>T:</strong> Task is precise -- one schema, one operation, one file. No ambiguity about scope.</span>
</div>
<div class="ix-trace-row" data-type="think" data-delay="3500">
<span class="ix-trace-content">Pydantic v2 skill is loaded. I should use model_validator(mode='after') for cross-field validation and Annotated[type, Field(...)] for field-level constraints. ConfigDict(strict=True) is the project standard. I'll read the current schema first.</span>
<span class="ix-trace-note"><strong>C:</strong> Context from the loaded skill -- no re-specification needed. The agent knows the v2 API from the skill, not from guessing.</span>
</div>
<div class="ix-trace-row" data-type="tool" data-delay="1500">
<span class="ix-trace-content">Read("app/schemas/user.py")</span>
<span class="ix-trace-note"><strong>E:</strong> Agent uses the existing schema as the "before" example baseline. This is the Examples component of TCEF working at the tool-use level.</span>
</div>
<div class="ix-trace-row" data-type="result" data-delay="1500">
<span class="ix-trace-content">-> class CreateUserRequest(BaseModel): email: str, age: int (23 lines total)</span>
<span class="ix-trace-note">Existing code structure confirms this is a v1-style schema. Needs ConfigDict, Annotated fields, and model_validator.</span>
</div>
<div class="ix-trace-row" data-type="think" data-delay="4000">
<span class="ix-trace-content">Applying Pydantic v2 pattern: ConfigDict(strict=True), email as Annotated[str, Field(min_length=5, pattern=...)], age as Annotated[int, Field(ge=0, le=150)], model_validator for cross-field business rule. NEVER use @validator or class Config: -- those are v1.</span>
<span class="ix-trace-note"><strong>F:</strong> Output constrained to v2 patterns only. The CLAUDE.md "don't" rules eliminate @validator and class Config: entirely before a single line is written.</span>
</div>
<div class="ix-trace-row" data-type="response" data-delay="2500">
<span class="ix-trace-content">Updated CreateUserRequest with ConfigDict(strict=True), Annotated fields with Field constraints, and @model_validator(mode='after') for business rule. Zero v1-era patterns in output.</span>
<span class="ix-trace-note"><strong>Result:</strong> The skill + CLAUDE.md + TCEF example together made the correct v2 output the path of least resistance. No correction needed.</span>
</div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="tip">
<p><strong>Constraints in the Format component eliminate entire categories of wrong answers.</strong> Rather than generic constraints ("be concise"), stack-specific Format constraints close doors: "NEVER use <code>useEffect</code> for data fetching," "NEVER return ORM objects directly from route handlers," "ALWAYS wrap errors with <code>fmt.Errorf</code>." Each prohibition removes a class of suggestions that would require correction. The more precisely you constrain the Format component, the closer the first output is to a deliverable rather than a draft.</p>
</div>

<details class="ix-collapse">
<summary>Deep Dive: Go error-handling skill example -- full skill markdown</summary>
<div class="ix-collapse-body">
<p>Skill files encode patterns at a level of detail that would be unwieldy in CLAUDE.md. Here is a complete Go error-handling skill:</p>
<pre><code>---
name: go-error-handling
version: 1.0
applies_to: [Go 1.23+]
---

# Go Error Handling -- [Organization] Conventions

### Pattern

All functions that can fail return (T, error). Errors are wrapped
at each layer boundary with the function's package-qualified name.

### Service Layer

func (s *UserService) CreateUser(ctx context.Context,
    req CreateUserRequest) (*User, error) {
    if err := s.store.InsertUser(ctx, req); err != nil {
        return nil, fmt.Errorf("UserService.CreateUser: %w", err)
    }
    return user, nil
}

### Sentinel Errors

Define at the package level for expected failure conditions:

var (
    ErrNotFound      = errors.New("not found")
    ErrAlreadyExists = errors.New("already exists")
    ErrUnauthorized  = errors.New("unauthorized")
)

### Handler Layer Conversion

func handleError(w http.ResponseWriter, err error) {
    switch {
    case errors.Is(err, store.ErrNotFound):
        http.Error(w, "not found", http.StatusNotFound)
    default:
        log.Printf("unexpected error: %v", err)
        http.Error(w, "internal server error", http.StatusInternalServerError)
    }
}</code></pre>
<p>Loading this skill ensures every function the agent writes or modifies follows the team's error-handling conventions without requiring the developer to specify those conventions in every prompt. The skill is version-stamped (<code>version: 1.0</code>), making it easy to audit whether team members are using the current version.</p>
<p>Note: the frontmatter above uses <code>name:</code>, <code>version:</code>, and <code>applies_to:</code> -- these are the standard Claude Code skill fields. The <code>triggers:</code> field sometimes seen in LUXOR-convention skill files is not a native Claude Code feature; do not include it in skills you write for general use.</p>
</div>
</details>

<p class="ix-instruct">Run a mid-module check before moving into deployment readiness.</p>

<div class="ix-diagram" data-component="quiz" data-diagram-id="m11-adaptation-midpoint-check" data-xp="16">
<span class="ix-title">Checkpoint Quiz: Stack Encoding and Pattern Adaptation</span>
<div class="ix-quiz-question">
<p class="ix-quiz-prompt"><strong>Q1.</strong> Why is “Use TypeScript” a weak CLAUDE.md rule compared to “Use TypeScript 5.x strict mode with no implicit any”?</p>
<div class="ix-quiz-options">
<button class="ix-quiz-option">Because shorter rules are always better</button>
<button class="ix-quiz-option" data-correct="true">Because the second rule removes ambiguity and encodes enforceable constraints</button>
<button class="ix-quiz-option">Because CLAUDE.md only supports versioned rules</button>
<button class="ix-quiz-option">Because strict mode is required by Context7</button>
</div>
<p class="ix-quiz-explanation">Specificity is the value of CLAUDE.md. Version and constraint details reduce incorrect alternatives and produce more consistent first outputs.</p>
</div>
<div class="ix-quiz-question">
<p class="ix-quiz-prompt"><strong>Q2.</strong> A generated FastAPI snippet uses <code>@validator</code> and <code>class Config</code>. Your stack is Pydantic v2. What is the best immediate fix?</p>
<div class="ix-quiz-options">
<button class="ix-quiz-option">Keep the code and patch it manually each time</button>
<button class="ix-quiz-option">Add only a generic “follow latest docs” note</button>
<button class="ix-quiz-option" data-correct="true">Add explicit CLAUDE.md prohibitions plus a v2 example in skill/Prompt Examples</button>
<button class="ix-quiz-option">Disable Context7 because it can conflict with CLAUDE.md</button>
</div>
<p class="ix-quiz-explanation">You need both directional constraints (“never use v1 patterns”) and a concrete v2 example so the correct pattern becomes the default output path.</p>
</div>
<div class="ix-quiz-question">
<p class="ix-quiz-prompt"><strong>Q3.</strong> Which item belongs in a reusable skill file rather than as a one-off prompt note?</p>
<div class="ix-quiz-options">
<button class="ix-quiz-option">“Please summarize this one PR”</button>
<button class="ix-quiz-option">“Use markdown bullets in this answer”</button>
<button class="ix-quiz-option" data-correct="true">A recurring Go error-wrapping convention used across many services</button>
<button class="ix-quiz-option">“Use a friendly tone for this message”</button>
</div>
<p class="ix-quiz-explanation">Skills should encode repeatable, high-frequency patterns with clear reuse value, not one-time style instructions.</p>
</div>
<div class="ix-quiz-question">
<p class="ix-quiz-prompt"><strong>Q4.</strong> What is the strongest signal that adaptation is incomplete after updating CLAUDE.md?</p>
<div class="ix-quiz-options">
<button class="ix-quiz-option">The agent replies more concisely</button>
<button class="ix-quiz-option">The checklist has six categories filled in</button>
<button class="ix-quiz-option" data-correct="true">Representative tasks still require repeated convention corrections in output</button>
<button class="ix-quiz-option">Context7 loads documentation faster than before</button>
</div>
<p class="ix-quiz-explanation">Behavioral validation on representative tasks is the acceptance test. If repeated corrections remain, rules or examples are still under-specified.</p>
</div>
</div>

---

## 11.5 Deploying to a New Team or Stack

<div class="ix-diagram" data-component="objective">
<p>Execute the organizational deployment checklist with a second reviewer to verify that an agentic system is production-ready in your specific environment.</p>
</div>

The checklist below covers the six categories that most commonly cause production failures when deploying agentic systems in organizations. It is most useful as a shared document reviewed by two people: the developer who built the workflow and a second engineer who will maintain it.

<div class="ix-diagram" data-component="callout" data-variant="core-idea">
<p><strong>Treat adaptation as a project, not an afterthought.</strong> The adaptation work -- CLAUDE.md completeness, permission scoping, skill creation, pre-load scripting -- is a one-time investment that pays back across every subsequent session. Teams that skip it do not avoid the work; they distribute it across every PR review, every correction loop, every "why did it do that" conversation. Front-loading the investment produces compound returns.</p>
</div>

<p class="ix-instruct">Step through the two deployment-readiness scenarios and choose the correct response.</p>

<div class="ix-diagram" data-component="scenario-quiz" data-diagram-id="m11-deploy-scenarios">
<span class="ix-title">Deployment Readiness Scenarios</span>
<div class="ix-scenario">
<div class="ix-scenario-label">Scenario A</div>
<div class="ix-scenario-body">
<p>Your team has a new React codebase with class components. You want to set up Claude Code for the project. You have added the project to CLAUDE.md with general instructions. Before you run the deployment checklist, what is the FIRST thing to verify?</p>
</div>
<div class="ix-scenario-options">
<button class="ix-scenario-option">That Context7 is installed and configured</button>
<button class="ix-scenario-option" data-correct="true">Whether the team's class component convention is intentional (legacy migration) or an oversight -- this determines what goes in CLAUDE.md Code Generation Rules</button>
<button class="ix-scenario-option">That all npm packages are up to date</button>
<button class="ix-scenario-option">That settings.json has the correct format</button>
</div>
<p class="ix-scenario-explanation">Audit the team's conventions before encoding them. Class components might be intentional (gradual migration plan) or accidental (no one updated the convention). If you encode the wrong convention, every session reinforces the wrong pattern. Convention audit comes before CLAUDE.md authoring.</p>
</div>
<div class="ix-scenario">
<div class="ix-scenario-label">Scenario B</div>
<div class="ix-scenario-body">
<p>You've inherited a Python codebase that uses <code>requests</code> for HTTP calls. Your team's standard is <code>httpx</code> (async). You want the agent to use <code>httpx</code> in all new code. Which adaptation step addresses this most directly?</p>
</div>
<div class="ix-scenario-options">
<button class="ix-scenario-option">Step 1: Audit team conventions -- classify the existing requests usage</button>
<button class="ix-scenario-option">Step 2: Use Context7 to pre-load httpx documentation</button>
<button class="ix-scenario-option" data-correct="true">Step 3: Add to CLAUDE.md Code Generation Rules: "ALWAYS use httpx for HTTP calls. NEVER use requests in new code (legacy code uses it, do not change existing calls)"</button>
<button class="ix-scenario-option">Step 5: Validate with representative tasks -- write a function that makes an HTTP call</button>
</div>
<p class="ix-scenario-explanation">Convention encoding (Step 3) is the right tool. Context7 pre-loading (Step 2) would help the agent understand httpx's API but would not prevent it from reaching for requests. The CLAUDE.md rule is explicit, binary, and survives across sessions. Step 5 validation comes after encoding, not instead of it.</p>
</div>
<div class="ix-scenario">
<div class="ix-scenario-label">Scenario C</div>
<div class="ix-scenario-body">
<p>A team is using SQLAlchemy 2.x, but the agent consistently generates <code>session.query()</code> style queries (the SQLAlchemy 1.x pattern) instead of the 2.x <code>select()</code> construct. The team has an accurate version line in CLAUDE.md: "SQLAlchemy 2.1". What is the most likely root cause?</p>
</div>
<div class="ix-scenario-options">
<button class="ix-scenario-option">The version line in CLAUDE.md is incorrect</button>
<button class="ix-scenario-option" data-correct="true">Training data has heavy representation of the older 1.x pattern -- a documentation currency gap that requires Context7 pre-loading of SQLAlchemy 2.x docs and an explicit CLAUDE.md prohibition: "NEVER use session.query() -- use select() with session.execute()"</button>
<button class="ix-scenario-option">The agent cannot learn new API patterns from CLAUDE.md alone</button>
<button class="ix-scenario-option">The skills library for SQLAlchemy needs to be reinstalled</button>
</div>
<p class="ix-scenario-explanation">This is a documentation currency gap compounded by a convention encoding gap. The version line tells the agent which version is in use, but the agent's training data contains far more 1.x examples than 2.x. The agent defaults to the most common pattern it has seen. The fix requires both tools: Context7 pre-loading supplies the current API documentation so the agent has accurate 2.x patterns available, and an explicit CLAUDE.md prohibition closes the door on the legacy approach. Neither tool alone is sufficient -- the prohibition without the docs means the agent knows what not to do but may not know the correct 2.x alternative; the docs without the prohibition leave the old pattern as a valid choice.</p>
</div>
<div class="ix-scenario">
<div class="ix-scenario-label">Scenario D</div>
<div class="ix-scenario-body">
<p>A developer writes a Go error-handling skill and includes a <code>triggers:</code> field in the frontmatter so "the skill activates automatically when the agent writes Go code." The deployment checklist item for the Skill Library reads: "Skills include version numbers in frontmatter (name, version, applies_to -- no triggers field)." What is wrong, and what is the correct fix?</p>
</div>
<div class="ix-scenario-options">
<button class="ix-scenario-option">Nothing is wrong -- triggers is a standard Claude Code skill field that enables automatic loading</button>
<button class="ix-scenario-option">The fix is to rename triggers to activates</button>
<button class="ix-scenario-option" data-correct="true">The triggers field is a LUXOR convention, not a native Claude Code feature -- remove it and instead load the skill via CLAUDE.md reference so it pre-loads at session start</button>
<button class="ix-scenario-option">The fix is to move the skill into settings.json</button>
</div>
<p class="ix-scenario-explanation">The <code>triggers:</code> field is specific to the LUXOR project convention and is not recognized by Claude Code natively. Including it in a skill intended for general team use adds a non-functional field that could confuse maintainers who expect it to do something. The correct approach is to reference the skill in CLAUDE.md: when Claude Code reads CLAUDE.md at session start, it loads all referenced skill files automatically. That is the native automatic-loading mechanism -- not a triggers field in the YAML frontmatter.</p>
</div>
</div>

<p class="ix-instruct">Work through the deployment checklist -- each section covers one category of production readiness.</p>

<div class="ix-diagram" data-component="step-checklist" data-diagram-id="m11-deploy-checklist">
<span class="ix-title">Organizational Deployment Checklist</span>
<div class="ix-checklist-section">
<div class="ix-checklist-label">1. CLAUDE.md Completeness</div>
<div class="ix-checklist-item">Tech stack section present with exact version numbers (not just library names)</div>
<div class="ix-checklist-item">Architecture section describes file/directory conventions and data flow</div>
<div class="ix-checklist-item">Naming conventions section covers the main patterns for this codebase</div>
<div class="ix-checklist-item">Code generation rules are explicit (do this / don't do that) -- no generic advice</div>
<div class="ix-checklist-item">Key files listed: main schema, routing config, auth middleware, shared types</div>
<div class="ix-checklist-item">Context7 pre-load instructions included for all rapidly-evolving libraries</div>
<div class="ix-checklist-item">Architectural decisions documented: which libraries are canonical, which are banned</div>
</div>
<div class="ix-checklist-section">
<div class="ix-checklist-label">2. Permission Configuration</div>
<div class="ix-checklist-item">settings.json allow list is specific to this workflow's required file and command access</div>
<div class="ix-checklist-item">settings.json deny list includes destructive commands relevant to this deployment target</div>
<div class="ix-checklist-item">The agent cannot write to directories outside its functional scope</div>
<div class="ix-checklist-item">The agent cannot execute network commands it does not need for this workflow</div>
<div class="ix-checklist-item">Separate settings.json configurations exist for dev, CI, and production contexts</div>
</div>
<div class="ix-checklist-section">
<div class="ix-checklist-label">3. Secrets Management</div>
<div class="ix-checklist-item">No credentials in CLAUDE.md (it is committed to git)</div>
<div class="ix-checklist-item">No credentials in settings.json or MCP config values -- use ${VAR_NAME} references</div>
<div class="ix-checklist-item">.env file is in .gitignore</div>
<div class="ix-checklist-item">.env.example is committed with placeholder values only</div>
<div class="ix-checklist-item">All required env vars documented in .env.example</div>
<div class="ix-checklist-item">CI/CD secrets configured in the platform's secret management (not in pipeline YAML)</div>
</div>
<div class="ix-checklist-section">
<div class="ix-checklist-label">4. MCP Server Verification</div>
<div class="ix-checklist-item">Each MCP server needed by this workflow is configured in settings.json</div>
<div class="ix-checklist-item">MCP server transport verified: stdio for local servers, Streamable HTTP for remote servers. If any legacy HTTP+SSE endpoint remains, track a migration plan and do not use it for new deployments.</div>
<div class="ix-checklist-item">MCP server permissions are scoped to this workflow's requirements</div>
<div class="ix-checklist-item">MCP server connections tested and verified before deployment</div>
</div>
<div class="ix-checklist-section">
<div class="ix-checklist-label">5. Skill Library</div>
<div class="ix-checklist-item">Core team patterns are encapsulated as skills (not repeated in every prompt)</div>
<div class="ix-checklist-item">Skills include version numbers in frontmatter (name, version, applies_to -- no triggers field)</div>
<div class="ix-checklist-item">Skills are loaded via CLAUDE.md references for automatic pre-loading at session start</div>
<div class="ix-checklist-item">Skills have been reviewed by a second team member for accuracy and completeness</div>
</div>
<div class="ix-checklist-section">
<div class="ix-checklist-label">6. Approval Gate Verification</div>
<div class="ix-checklist-item">Irreversible actions (file deletes, DB writes, external API posts, email sends) have approval gates</div>
<div class="ix-checklist-item">Production-touching workflows have explicit human review steps before execution</div>
<div class="ix-checklist-item">Audit trail captures: session ID, plan hash, approver identity, timestamp</div>
<div class="ix-checklist-item">Two-person review completed: developer who built the workflow + second engineer who will maintain it</div>
</div>
</div>

<p class="ix-instruct">Test your understanding of tech stack adaptation.</p>

<div class="ix-diagram" data-component="quiz" data-diagram-id="m11-final-quiz" data-xp="20">
<span class="ix-title">Knowledge Check: Tech Stack Adaptation</span>
<div class="ix-quiz-question">
<p class="ix-quiz-prompt"><strong>Q1.</strong> A developer completes the organizational deployment checklist alone, reviewing each item from memory. What does the checklist say about this practice?</p>
<div class="ix-quiz-options">
<button class="ix-quiz-option">It is acceptable for experienced developers</button>
<button class="ix-quiz-option">It is the standard approach for solo projects</button>
<button class="ix-quiz-option" data-correct="true">It is explicitly insufficient -- the checklist requires a second reviewer who asks questions from the configuration files, not from memory</button>
<button class="ix-quiz-option">It is fine as long as the developer documents their answers</button>
</div>
<p class="ix-quiz-explanation">The checklist explicitly requires two people: the developer who built the workflow and a second engineer who will maintain it. The reviewer asks questions; the developer answers from the configuration files, not from memory. Any item that cannot be demonstrated from the configuration is incomplete. Solo self-review misses exactly the gaps that a second set of eyes would catch.</p>
</div>
<div class="ix-quiz-question">
<p class="ix-quiz-prompt"><strong>Q2.</strong> Which of the following should NOT be included in your organization's CLAUDE.md tech stack section?</p>
<div class="ix-quiz-options">
<button class="ix-quiz-option" data-correct="true">"Write clean, readable code with good variable names"</button>
<button class="ix-quiz-option">"NEVER use getServerSideProps -- this is an App Router project"</button>
<button class="ix-quiz-option">"Use Zod for all runtime validation, not class-validator or joi"</button>
<button class="ix-quiz-option">"Wrap errors with fmt.Errorf('package.Function: %w', err)"</button>
</div>
<p class="ix-quiz-explanation">"Write clean, readable code" is generic advice the agent already has from its training. CLAUDE.md is valuable because it is specific -- it encodes decisions the agent could not infer from the codebase. The other three options are specific, actionable, and organization-specific. Generic advice dilutes the signal of the useful entries.</p>
</div>
<div class="ix-quiz-question">
<p class="ix-quiz-prompt"><strong>Q3.</strong> A new Context7 session loads Next.js 13 App Router docs when your project uses Next.js 15. Is this a documentation currency gap or a convention encoding gap?</p>
<div class="ix-quiz-options">
<button class="ix-quiz-option" data-correct="true">Documentation currency gap -- the issue is version staleness in the loaded documentation, not a missing team convention</button>
<button class="ix-quiz-option">Convention encoding gap -- the team should have encoded the Next.js 15 preference in CLAUDE.md</button>
<button class="ix-quiz-option">Both equally -- it is both a documentation problem and a convention problem</button>
<button class="ix-quiz-option">Neither -- this is a Context7 configuration error</button>
</div>
<p class="ix-quiz-explanation">This is a documentation currency gap. The problem is that the documentation being loaded is for the wrong version -- it is a staleness issue in the source documentation, not a missing team convention. Convention encoding would address patterns like "use server components" vs "use client components." The fix here is to specify the correct version when querying Context7 (e.g., query-docs for Next.js 15 specifically, not Next.js in general).</p>
</div>
<div class="ix-quiz-question">
<p class="ix-quiz-prompt"><strong>Q4.</strong> Your CLAUDE.md lists every framework by name but not by version. Why is adding exact version numbers more valuable than listing library names?</p>
<div class="ix-quiz-options">
<button class="ix-quiz-option">It helps the agent check package.json for the correct version</button>
<button class="ix-quiz-option">It is required by the Claude Code specification</button>
<button class="ix-quiz-option" data-correct="true">It eliminates version ambiguity that causes the agent to blend patterns from multiple versions -- "Next.js" includes 12, 13, 14, and 15; "Next.js 15.x" does not</button>
<button class="ix-quiz-option">It allows Context7 to automatically load the correct documentation</button>
</div>
<p class="ix-quiz-explanation">The agent has seen code from multiple major versions of every popular framework. Without a version number, "Next.js" could mean Pages Router or App Router, hooks-era React or Server Components React. The version number collapses this ambiguity. "Next.js 15.x App Router" leaves the agent no room to suggest a Pages Router pattern. Specificity is the mechanism by which CLAUDE.md entries reduce wrong-version suggestions.</p>
</div>
<div class="ix-quiz-question">
<p class="ix-quiz-prompt"><strong>Q5.</strong> When should you use Context7 pre-loading rather than relying on the model's training data?</p>
<div class="ix-quiz-options">
<button class="ix-quiz-option">For every library, on every session, regardless of stability</button>
<button class="ix-quiz-option">Only when the model produces a syntax error</button>
<button class="ix-quiz-option" data-correct="true">For libraries with rapid major-version evolution, large API surfaces, or recent breaking changes where training data may have heavy representation of the old approach</button>
<button class="ix-quiz-option">Only for libraries that are not in the model's training data at all</button>
</div>
<p class="ix-quiz-explanation">Context7 is most valuable for version-sensitive libraries: those with rapid major version evolution (Next.js, React), those with significant breaking changes where the model has trained on both old and new patterns (Pydantic v1 vs v2, SQLAlchemy 1.x vs 2.x), and those with large API surfaces where deprecated methods are easy to confuse with current ones. Stable libraries like Python's standard library or Java's core libs do not benefit -- the training data is comprehensive and accurate.</p>
</div>
</div>

<details class="ix-collapse">
<summary>Deep Dive: The five-step adaptation sequence for any new team or stack</summary>
<div class="ix-collapse-body">
<p>When joining a new team or taking on a new codebase, run the adaptation steps in this sequence:</p>
<p><strong>Step 1: Audit team conventions.</strong> Before writing a single line of CLAUDE.md, spend time understanding what the team actually does -- not what the documentation says, but what the PR history shows. Look at recent merged PRs to understand the naming patterns, the error-handling style, the library preferences. Ask the team lead what the three most common PR correction comments are. Those corrections are the highest-value CLAUDE.md entries.</p>
<p><strong>Step 2: Research version gaps.</strong> For each major framework the project uses, identify whether it has had a major version change in the last two years. If so, use Context7 to pre-load documentation. Run a test session and check whether the agent's suggestions match the version the project uses. The gap between what the agent produces and what the project uses is the documentation currency gap you need to close.</p>
<p><strong>Step 3: Build the stack CLAUDE.md.</strong> Write the five required sections: framework versions (with implications), architecture patterns (with directory structure), naming conventions (with examples), code generation rules (with specific prohibitions), and key files (with their purpose). Have a second team member review it for accuracy before committing it.</p>
<p><strong>Step 4: Create reusable skills.</strong> Identify the top 3-5 patterns the team uses repeatedly that would be unwieldy to specify in every prompt. Write a skill file for each. Test each skill in a session before adding it to CLAUDE.md. Version-stamp each skill so updates are trackable.</p>
<p><strong>Step 5: Validate with representative tasks.</strong> Run the agent on 5-10 representative tasks from the team's actual work. Review each output against the team's conventions. Count the corrections per output. The target is zero corrections for convention violations (as opposed to substantive improvements, which are expected). If convention violations persist, the relevant rules need to be strengthened in CLAUDE.md or the skill files.</p>
</div>
</details>

---

## Lab Connection

**Lab 11: Stack Adaptation Sprint**

Participants choose one of the five tech stacks covered in Section 11.3 and complete a full adaptation sprint: write the CLAUDE.md for their chosen stack, configure Context7 pre-loading for the most version-sensitive libraries in that stack, write one domain-specific skill encoding a key team pattern, and run the organizational deployment checklist against their configuration. The lab concludes with a peer review of CLAUDE.md completeness -- two participants review each other's configurations using the deployment checklist.

---

## Further Reading

- [Standalone Diagram: Stack Adaptation Decision Map](/examples/module-diagrams/m11-stack-adaptation.html)

---
