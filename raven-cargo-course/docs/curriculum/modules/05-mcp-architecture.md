<div class="ix-diagram" data-component="module-hero">
<div class="ix-hero">
<div class="ix-hero-bg"></div>
<div class="ix-hero-module-num">Module 05</div>
<div class="ix-hero-title">MCP Architecture</div>
<div class="ix-hero-subtitle">Understand the Model Context Protocol -- the standard that makes AI agents extensible, composable, and auditable</div>
<div class="ix-hero-chips">
<span class="ix-hero-chip">The Extension Problem</span>
<span class="ix-hero-chip">Three MCP Primitives</span>
<span class="ix-hero-chip">Tool Schema Design</span>
<span class="ix-hero-chip">Transport Configuration</span>
<span class="ix-hero-chip">MCP in the Agentic Loop</span>
</div>
</div>
</div>

# Module 05: MCP Architecture
---

## Overview

<div class="ix-diagram" data-component="objective">
  <p>Explain MCP's role in the agentic ecosystem, distinguish the three primitives (Tools, Resources, Prompts), read tool schemas, and configure local and remote MCP connections.</p>
</div>

In Module 02, you connected your first MCP server and saw how it extends Claude Code's built-in tools. Now let's understand the architecture underneath -- the protocol, the primitives, and the design principles that make MCP servers composable and portable. For the full protocol specification, see the [MCP documentation](https://modelcontextprotocol.io).

---

## 5.1 The Extension Problem MCP Solves

<div class="ix-diagram" data-component="objective">
  <p>Explain the specific problem MCP solves and why a standard protocol is necessary for AI agent extensibility.</p>
</div>

<p class="ix-instruct">Write your prediction, then reveal the reference reasoning.</p>

<div class="ix-diagram" data-component="predict-reveal" data-diagram-id="m05-extension-predict" data-xp="8">
  <span class="ix-title">Predict Before You Learn</span>
  <p class="ix-predict-prompt">Imagine you need to give an AI agent access to your company's internal project tracker. Without a standard protocol, what steps would you need to take? Think about prompt engineering, parsing, error handling, and reusability. What would be painful about this approach?</p>
  <textarea class="ix-predict-input" aria-label="Your prediction" placeholder="Write your reasoning -- what steps would be needed and what would be painful?"></textarea>
  <details class="ix-predict-reveal">
    <summary>Reveal reference reasoning</summary>
    <p>Without a standard protocol, you would need to: (1) write system prompt sections describing the tracker's API, (2) build a custom wrapper to parse and execute the agent's HTTP requests, (3) handle response formats the agent was not trained on, (4) build ad-hoc error handling, (5) maintain prompt-embedded instructions that drift as the API evolves, and (6) accept that no other agent can reuse your integration. MCP eliminates all six pain points by standardizing discovery, invocation, schema, and transport into one protocol. Implement once, connect everywhere.</p>
  </details>
</div>

<p class="ix-instruct">Click each stage to see how MCP transforms AI agent integration.</p>

<div class="ix-diagram" data-component="timeline" data-diagram-id="m05-before-after-mcp">
  <span class="ix-title">The evolution of AI agent extensibility</span>
  <div class="ix-timeline-stage" data-label="Before MCP" data-phase="error">
    <div class="ix-stage-content">
      <p><strong>Bespoke integration per capability</strong></p>
      <ul>
        <li>Custom system prompt describing each API surface</li>
        <li>Custom parsing wrappers for every response format</li>
        <li>Ad-hoc error handling per integration</li>
        <li>No sharing -- integration embedded in one system prompt</li>
        <li>No versioning, no auditing, no composability</li>
      </ul>
    </div>
  </div>
  <div class="ix-timeline-stage" data-label="After MCP" data-phase="success">
    <div class="ix-stage-content">
      <p><strong>Standard protocol for all capabilities</strong></p>
      <ul>
        <li>Discovery: <code>tools/list</code>, <code>resources/list</code>, <code>prompts/list</code></li>
        <li>Invocation: <code>tools/call</code>, <code>resources/read</code>, <code>prompts/get</code></li>
        <li>Schema: JSON Schema for inputs, URI patterns for resources</li>
        <li>Transport: stdio (local) or Streamable HTTP (remote)</li>
        <li>Implement once, every MCP client benefits</li>
      </ul>
    </div>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="core-idea">
  <p><strong>MCP is to AI agent capabilities what USB-C is to hardware peripherals</strong>. One standard interface means any MCP client (Claude Code, any compatible framework) connects to any MCP server. The capability author implements once; every client benefits.</p>
</div>

<p class="ix-instruct">Click each card to explore what MCP standardizes.</p>

<div class="ix-diagram" data-component="click-cards" data-diagram-id="m05-mcp-standardizes">
  <span class="ix-title">The four things MCP standardizes</span>
  <div class="ix-card" data-phase="reason">
    <i data-lucide="search" class="ix-card-icon"></i>
    <span class="ix-card-label">Discovery</span>
  </div>
  <div class="ix-card" data-phase="observe">
    <i data-lucide="play" class="ix-card-icon"></i>
    <span class="ix-card-label">Invocation</span>
  </div>
  <div class="ix-card" data-phase="act">
    <i data-lucide="file-json" class="ix-card-icon"></i>
    <span class="ix-card-label">Schema</span>
  </div>
  <div class="ix-card" data-phase="perceive">
    <i data-lucide="cable" class="ix-card-icon"></i>
    <span class="ix-card-label">Transport</span>
  </div>
  <!-- Detail panels -->
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="reason">Discovery -- How a client learns what a server provides</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">Mechanism</div>
        <div class="ix-sec-text">The client sends <code>tools/list</code>, <code>resources/list</code>, and <code>prompts/list</code> requests. The server responds with the complete catalog of its capabilities, including schemas.</div>
      </div>
      <div class="ix-char-grid">
        <div class="ix-char-item"><strong>When</strong><span>At connection time, during the handshake</span></div>
        <div class="ix-char-item"><strong>Result</strong><span>Claude knows every tool, resource, and prompt available for the session</span></div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="success">Invocation -- How a client calls a capability</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">Mechanism</div>
        <div class="ix-sec-text">The client sends <code>tools/call</code>, <code>resources/read</code>, or <code>prompts/get</code> with the appropriate name and parameters. The server executes and returns a structured result.</div>
      </div>
      <div class="ix-char-grid">
        <div class="ix-char-item"><strong>Tools</strong><span><code>tools/call</code> with name and arguments object</span></div>
        <div class="ix-char-item"><strong>Resources</strong><span><code>resources/read</code> with URI</span></div>
        <div class="ix-char-item"><strong>Prompts</strong><span><code>prompts/get</code> with name and arguments</span></div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="act">Schema -- How capabilities describe themselves</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">Mechanism</div>
        <div class="ix-sec-text">Tools use JSON Schema to define their input parameters -- types, descriptions, constraints, required fields. Resources use URI patterns. Prompts define their arguments and return message sequences.</div>
      </div>
      <div class="ix-char-grid">
        <div class="ix-char-item"><strong>Tool inputs</strong><span>JSON Schema with <code>properties</code>, <code>required</code>, <code>enum</code></span></div>
        <div class="ix-char-item"><strong>Resource URIs</strong><span><code>scheme://authority/path</code> patterns</span></div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="perceive">Transport -- How client and server communicate</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">Mechanism</div>
        <div class="ix-sec-text">Two transport options: <strong>stdio</strong> for local servers (child process, stdin/stdout JSON) and <strong>Streamable HTTP</strong> for remote servers (HTTP POST with streaming responses).</div>
      </div>
      <div class="ix-char-grid">
        <div class="ix-char-item"><strong>Local</strong><span>stdio -- server runs as a child process</span></div>
        <div class="ix-char-item"><strong>Remote</strong><span>Streamable HTTP -- server deployed as HTTP service</span></div>
      </div>
    </div>
  </div>
</div>

<details class="ix-collapse">
<summary>Deep Dive: The pre-MCP integration problem in detail</summary>
<div class="ix-collapse-body">
<p>Consider what it takes to give an AI agent access to a company's internal project management system without MCP. An engineer writes a system prompt section describing the API surface. The agent generates HTTP requests as text, which must be parsed and executed by a custom wrapper. The wrapper returns responses in a format the agent was not explicitly trained to parse. Error handling is ad hoc -- the agent may retry requests incorrectly or silently ignore failures. The entire integration is encoded in natural language instructions that drift as the API evolves. No other agent can reuse this integration.</p>
<p>This was the standard approach before MCP. Every agent capability was bespoke. Capabilities could not be shared, audited, versioned, or composed. MCP standardizes the protocol layer so that everything above it -- the actual implementation of what a tool does, what data a resource exposes, what text a prompt contains -- remains under the control of the capability author while the interface is universal.</p>
</div>
</details>

---

## 5.2 The Three Primitives

<div class="ix-diagram" data-component="objective">
  <p>Distinguish the three MCP primitives -- Tools, Resources, and Prompts -- and identify the correct primitive for a given capability.</p>
</div>

<p class="ix-instruct">Write your prediction, then reveal the reference reasoning.</p>

<div class="ix-diagram" data-component="predict-reveal" data-diagram-id="m05-primitives-predict" data-xp="8">
  <span class="ix-title">Predict Before You Learn</span>
  <p class="ix-predict-prompt">MCP servers expose capabilities through exactly three primitives. One is for actions with side effects, one is for passive data the agent reads, and one is for reusable instruction templates. Think about a database MCP server: it can run queries, expose the schema for reference, and offer a "SQL helper" template. Which of these three capabilities would you classify as which primitive type, and why?</p>
  <textarea class="ix-predict-input" aria-label="Your prediction" placeholder="Write your reasoning -- how would you classify each database capability?"></textarea>
  <details class="ix-predict-reveal">
    <summary>Reveal reference reasoning</summary>
    <p>The three primitives are <strong>Tools</strong>, <strong>Resources</strong>, and <strong>Prompts</strong>. Running queries is a <strong>Tool</strong> -- it has side effects (executes SQL), takes variable inputs, and returns results. The database schema is a <strong>Resource</strong> -- it is stable reference data identified by a URI like <code>db://schema/users</code> that the agent reads for context. The SQL helper template is a <strong>Prompt</strong> -- it is a parameterized instruction template that helps users construct queries. The shorthand: Tools are verbs, Resources are nouns, Prompts are templates.</p>
  </details>
</div>

<p class="ix-instruct">Click each card to explore the three MCP primitives.</p>

<div class="ix-diagram" data-component="click-cards" data-diagram-id="m05-three-primitives">
  <span class="ix-title">The three MCP primitives</span>
  <div class="ix-card" data-phase="observe">
    <i data-lucide="wrench" class="ix-card-icon"></i>
    <span class="ix-card-label">Tools</span>
  </div>
  <div class="ix-card" data-phase="act">
    <i data-lucide="database" class="ix-card-icon"></i>
    <span class="ix-card-label">Resources</span>
  </div>
  <div class="ix-card" data-phase="perceive">
    <i data-lucide="message-square" class="ix-card-icon"></i>
    <span class="ix-card-label">Prompts</span>
  </div>
  <!-- Detail panels -->
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="act">Tools -- The Agent's Action Vocabulary</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">What they are</div>
        <div class="ix-sec-text">Callable functions with typed parameters. When the agent calls a tool, it is taking an action: querying a database, posting a message, creating a file, running a test.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Control</div>
        <div class="ix-sec-text">Model-controlled -- the LLM decides when and how to invoke tools based on the task.</div>
      </div>
      <div class="ix-char-grid">
        <div class="ix-char-item"><strong>Examples</strong><span><code>search_issues</code>, <code>create_pr</code>, <code>run_query</code></span></div>
        <div class="ix-char-item"><strong>Use when</strong><span>Operations that mutate state, query external systems in real time, or have inputs that vary at call time</span></div>
        <div class="ix-char-item"><strong>Exposes</strong><span>Name, description, and JSON Schema input definition</span></div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="observe">Resources -- Addressable Data Objects</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">What they are</div>
        <div class="ix-sec-text">Data objects that can be read by the client. Identified by URIs following the pattern <code>scheme://authority/path</code>. Passive -- the client reads them, no side effects.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Control</div>
        <div class="ix-sec-text">Application-controlled -- the client or application decides when to read resources for context.</div>
      </div>
      <div class="ix-char-grid">
        <div class="ix-char-item"><strong>Examples</strong><span><code>db://schema/users</code>, <code>file://README.md</code>, <code>config://app/settings</code></span></div>
        <div class="ix-char-item"><strong>Use when</strong><span>Static or slowly changing reference data, content that benefits from URI addressability</span></div>
        <div class="ix-char-item"><strong>Benefit</strong><span>Can be cached and prefetched by the client</span></div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="perceive">Prompts -- Reusable Instruction Templates</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">What they are</div>
        <div class="ix-sec-text">Parameterized instruction templates that accept arguments and produce structured message sequences. They do not execute actions -- they return instruction text.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Control</div>
        <div class="ix-sec-text">User-controlled -- users select prompts from a list and fill in parameters.</div>
      </div>
      <div class="ix-char-grid">
        <div class="ix-char-item"><strong>Examples</strong><span><code>code_review(language)</code>, <code>incident_report(severity, desc)</code></span></div>
        <div class="ix-char-item"><strong>Use when</strong><span>Domain-specific templates, prompts requiring server-side data, standardizing team interactions</span></div>
        <div class="ix-char-item"><strong>Benefit</strong><span>Can be listed and presented to users as selectable options</span></div>
      </div>
    </div>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="key-concept">
  <p><strong>Tools are verbs, Resources are nouns, Prompts are templates</strong>. A common mistake is exposing everything as Tools because they are the most familiar primitive. Resources can be cached and prefetched; Prompts can be listed and selected by users. The distinctions matter architecturally.</p>
</div>

<p class="ix-instruct">Click to expand each branch and trace the categorization logic.</p>

<div class="ix-diagram" data-component="decision-tree" data-diagram-id="m05-categorization-test">
  <span class="ix-title">Primitive categorization test</span>
  <div class="ix-tree-node" data-node-id="root" data-children="q1">
    <span class="ix-node-label">New capability -- which primitive?</span>
  </div>
  <div class="ix-tree-node" data-node-id="q1" data-children="tool,q2">
    <span class="ix-node-label">Does the operation have side effects or call an external system?</span>
  </div>
  <div class="ix-tree-node" data-node-id="tool" data-leaf="true">
    <span class="ix-node-label" data-phase="act">Tool</span>
    <span class="ix-node-detail">Callable function with typed parameters. The agent decides when to invoke it. Examples: <code>search_issues</code>, <code>create_pr</code>, <code>run_query</code>.</span>
  </div>
  <div class="ix-tree-node" data-node-id="q2" data-children="resource,q3">
    <span class="ix-node-label">Is the data stable, identified by a URI?</span>
  </div>
  <div class="ix-tree-node" data-node-id="resource" data-leaf="true">
    <span class="ix-node-label" data-phase="observe">Resource</span>
    <span class="ix-node-detail">Addressable data object read by URI. Passive -- no side effects. Examples: <code>db://schema/users</code>, <code>config://app/settings</code>.</span>
  </div>
  <div class="ix-tree-node" data-node-id="q3" data-children="prompt,reconsider">
    <span class="ix-node-label">Is the value in the parameterized template itself?</span>
  </div>
  <div class="ix-tree-node" data-node-id="prompt" data-leaf="true">
    <span class="ix-node-label" data-phase="perceive">Prompt</span>
    <span class="ix-node-detail">Parameterized instruction template. Returns text, does not execute actions. Examples: <code>code_review(language)</code>, <code>incident_report(severity)</code>.</span>
  </div>
  <div class="ix-tree-node" data-node-id="reconsider" data-leaf="true">
    <span class="ix-node-label" data-phase="error">Reconsider the design</span>
    <span class="ix-node-detail">If none of the three primitives fit, the capability may need to be restructured. Consider splitting it into multiple primitives or re-examining its purpose.</span>
  </div>
</div>

<p class="ix-instruct">Click each item to reveal which primitive it should be.</p>

<div class="ix-diagram" data-component="reveal-quiz" data-diagram-id="m05-primitive-sorting" data-xp="10">
  <span class="ix-title">Sort these capabilities into the correct primitive</span>
  <div class="ix-rq-item" data-reveal="Tool" data-phase="act">
    <span class="ix-rq-label"><code>execute_query(sql)</code></span>
    <span class="ix-rq-explanation">Side effects (executes SQL), variable inputs -- this is a Tool.</span>
  </div>
  <div class="ix-rq-item" data-reveal="Resource" data-phase="observe">
    <span class="ix-rq-label"><code>db://schema/users</code></span>
    <span class="ix-rq-explanation">Stable reference data, identified by URI -- this is a Resource.</span>
  </div>
  <div class="ix-rq-item" data-reveal="Prompt" data-phase="perceive">
    <span class="ix-rq-label"><code>code_review_template(language)</code></span>
    <span class="ix-rq-explanation">Parameterized instruction template -- returns text, does not execute. This is a Prompt.</span>
  </div>
  <div class="ix-rq-item" data-reveal="Tool" data-phase="act">
    <span class="ix-rq-label"><code>create_pr(title, body, branch)</code></span>
    <span class="ix-rq-explanation">Creates state (a pull request) -- this is a Tool.</span>
  </div>
  <div class="ix-rq-item" data-reveal="Resource" data-phase="observe">
    <span class="ix-rq-label"><code>config://app/settings</code></span>
    <span class="ix-rq-explanation">Read-only configuration data, identified by URI -- this is a Resource.</span>
  </div>
  <div class="ix-rq-item" data-reveal="Misclassified! Should be Resource" data-phase="error">
    <span class="ix-rq-label"><code>get_schema()</code> with no params</span>
    <span class="ix-rq-explanation">Common mistake: exposing stable data as a parameterless Tool. This should be a Resource at <code>db://schema</code> -- it is read-only data with no side effects.</span>
  </div>
  <div class="ix-rq-item" data-reveal="Prompt" data-phase="perceive">
    <span class="ix-rq-label"><code>incident_report(severity, desc)</code></span>
    <span class="ix-rq-explanation">Parameterized instruction template that produces a formatted report -- this is a Prompt.</span>
  </div>
  <div class="ix-rq-item" data-reveal="Tool" data-phase="act">
    <span class="ix-rq-label"><code>search_issues(query)</code></span>
    <span class="ix-rq-explanation">Real-time external query with variable inputs -- this is a Tool.</span>
  </div>
</div>

<details class="ix-collapse">
<summary>Deep Dive: When each primitive is appropriate</summary>
<div class="ix-collapse-body">
<p><strong>Tools</strong> are appropriate for any operation that mutates state (write, create, update, delete), any operation that queries external systems in real time, and any operation with inputs that vary at call time. Every tool exposes a name, a description (natural language explanation for the LLM), and an input schema (JSON Schema definition of parameters).</p>
<p><strong>Resources</strong> are appropriate for static or slowly changing reference data (database schemas, API specifications), data the agent needs to read but not modify, and content that benefits from URI addressability. The key distinction from Tools: resources are passive. There are no side effects to reading a resource. Claude uses resources as context -- data that informs its reasoning rather than actions it takes.</p>
<p><strong>Prompts</strong> are appropriate for domain-specific task templates that would be tedious to construct from scratch, prompts that require server-side data to construct (e.g., a code review prompt that includes your style guide), and standardizing how users interact with a capability across a team. The distinction from Tools: prompts do not execute actions. They return instruction text that the client can then use, display, or inject into a conversation.</p>
</div>
</details>

---

## 5.3 Reading Tool Schemas

<div class="ix-diagram" data-component="objective">
  <p>Interpret a complete MCP server tool schema including name, description, input schema, required vs. optional fields, and enum constraints.</p>
</div>

Tool schemas are the contract between the MCP server and any client that calls the tool. Claude reads schemas at connection time and uses them throughout the session.

<p class="ix-instruct">Switch between tabs to dissect each layer of a tool schema.</p>

<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="m05-schema-anatomy">
  <span class="ix-title">Anatomy of a tool schema</span>
  <div data-tab="Name + Description">
    <p>The <strong>name</strong> is the function identifier Claude uses to invoke the tool:</p>
    <pre><code>"name": "search_issues"</code></pre>
    <p>The <strong>description</strong> is the most important field. It must answer three questions for Claude:</p>
    <ol>
      <li><strong>What</strong>: "Search for issues in the project tracker matching the given criteria."</li>
      <li><strong>When</strong>: "Use this tool when you need to find existing issues by keyword, status, or assignee. Do not use this tool to create new issues (use <code>create_issue</code>) or get a specific issue by ID (use <code>get_issue</code>)."</li>
      <li><strong>Returns</strong>: "Returns an array of matching issues with their IDs, titles, statuses, and assignees."</li>
    </ol>
    <p>This three-part structure helps Claude select the right tool and interpret results correctly.</p>
  </div>
  <div data-tab="Properties">
    <p>Each property defines a parameter the tool accepts:</p>
    <pre><code>"query": {
  "type": "string",
  "description": "Full-text search query. Matches against issue titles and descriptions."
}
"status": {
  "type": "string",
  "enum": ["open", "in_progress", "closed", "all"],
  "description": "Filter by issue status. Use 'all' to search across all statuses.",
  "default": "open"
}
"limit": {
  "type": "integer",
  "description": "Maximum number of results to return.",
  "default": 20, "minimum": 1, "maximum": 100
}</code></pre>
    <p>Key patterns: <code>enum</code> constrains values to a fixed set (prevents invalid values like "pending"). <code>default</code> documents the fallback. <code>minimum</code>/<code>maximum</code> bound numeric ranges.</p>
  </div>
  <div data-tab="Required vs Optional">
    <p>The <code>required</code> array specifies which fields must be provided:</p>
    <pre><code>"required": ["query"]</code></pre>
    <p>Fields not in <code>required</code> are optional. Claude omits optional fields when it has no specific value -- which is usually correct behavior.</p>
    <p><strong>Design guidelines</strong>:</p>
    <ul>
      <li>Mark a field <strong>required</strong> when the tool cannot function without it</li>
      <li>Mark a field <strong>optional</strong> when a useful default exists</li>
      <li>Provide <code>default</code> values in the schema to document fallback behavior</li>
      <li>Do not mark fields required if there is a sensible default -- this forces Claude to guess</li>
    </ul>
  </div>
  <div data-tab="Full Schema">
    <pre><code>{
  "name": "search_issues",
  "description": "Search for issues in the project tracker matching the given criteria. Use this tool when you need to find existing issues by keyword, status, or assignee. Do not use this tool to create new issues (use create_issue instead) or to get the details of a specific issue by ID (use get_issue instead). Returns an array of matching issues with their IDs, titles, statuses, and assignees.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "Full-text search query. Matches against issue titles and descriptions."
      },
      "status": {
        "type": "string",
        "enum": ["open", "in_progress", "closed", "all"],
        "description": "Filter by issue status.",
        "default": "open"
      },
      "assignee": {
        "type": "string",
        "description": "Filter by assignee username. Omit to search across all assignees."
      },
      "limit": {
        "type": "integer",
        "description": "Maximum number of results to return.",
        "default": 20,
        "minimum": 1,
        "maximum": 100
      }
    },
    "required": ["query"]
  }
}</code></pre>
  </div>
</div>

<p class="ix-instruct">Compare the two descriptions side by side to see the quality difference.</p>

<div class="ix-diagram" data-component="compare" data-diagram-id="m05-description-quality">
  <span class="ix-title">Tool description quality: human-readable vs. Claude-readable</span>
  <div data-compare-left="Vague (for humans)">
    <pre><code>"description": "Searches issues in the project tracker."</code></pre>
    <p><i data-lucide="x-circle" width="16" height="16"></i> No disambiguation -- Claude cannot tell when to use this vs. other tools</p>
    <p><i data-lucide="x-circle" width="16" height="16"></i> No return description -- Claude does not know what to expect</p>
    <p><i data-lucide="x-circle" width="16" height="16"></i> No usage guidance -- Claude may pass wrong arguments</p>
  </div>
  <div data-compare-right="Precise (for Claude)">
    <pre><code>"description": "Search for issues in the project tracker matching the given criteria. Use this tool when you need to find existing issues by keyword, status, or assignee. Do not use this tool to create new issues (use create_issue) or to get a specific issue by ID (use get_issue). Returns an array of matching issues with their IDs, titles, statuses, and assignees."</code></pre>
    <p><i data-lucide="check-circle" width="16" height="16"></i> Clear action, disambiguation, and return format</p>
    <p><i data-lucide="check-circle" width="16" height="16"></i> Claude knows when to use this tool and when not to</p>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="tip">
  <p><strong>A tool description optimized for Claude answers three questions</strong>: what does this tool do, when should I use it (vs. alternatives), and what will I get back? If you can give Claude just the description and it accurately explains when to use the tool, the description is good.</p>
</div>

<details class="ix-collapse">
<summary>Deep Dive: Enum constraints and required field design</summary>
<div class="ix-collapse-body">
<p>When a field has a fixed set of valid values, use an <code>enum</code> constraint. Without it, Claude might generate values like <code>"pending"</code>, <code>"active"</code>, or other plausible-sounding strings that the tool does not accept. The <code>enum</code> constraint both prevents invalid values and helps Claude make appropriate choices.</p>
<p>For <code>required</code> vs. optional fields: mark a field required only when the tool truly cannot function without it. If a useful default behavior exists when a field is omitted, make it optional with a documented <code>default</code> value. Over-requiring fields forces Claude to make decisions when it has no basis for choosing -- it may guess incorrectly. Under-requiring fields risks Claude omitting values that would produce better results, but this is usually less harmful since the tool still works.</p>
</div>
</details>

---

## 5.4 Transport Configuration

<div class="ix-diagram" data-component="objective">
  <p>Configure both local (stdio) and remote (Streamable HTTP) MCP connections and understand the connection handshake.</p>
</div>

You configured <code>settings.json</code> in Module 02. Now let's understand the transport mechanics it controls.

<p class="ix-instruct">Switch between tabs to compare the two transport mechanisms and the deprecated SSE pattern.</p>

<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="m05-transport-types">
  <span class="ix-title">MCP transport mechanisms</span>
  <div data-tab="stdio (Local)">
    <p>The <strong>stdio transport</strong> runs the MCP server as a child process. The client communicates by writing JSON to stdin and reading JSON from stdout.</p>
    <pre><code>{
  "mcpServers": {
    "my-tracker": {
      "command": "node",
      "args": ["/path/to/tracker-mcp/index.js"],
      "env": {
        "TRACKER_API_KEY": "${TRACKER_API_KEY}",
        "TRACKER_BASE_URL": "https://tracker.internal.example.com"
      }
    }
  }
}</code></pre>
    <p><strong>Key fields</strong>: <code>command</code> (executable to run), <code>args</code> (command-line arguments), <code>env</code> (environment variables -- use <code>${VAR_NAME}</code> for secrets).</p>
    <p>CLI equivalent: <code>claude mcp add my-tracker node /path/to/tracker-mcp/index.js -e TRACKER_API_KEY</code></p>
  </div>
  <div data-tab="Streamable HTTP (Remote)">
    <p>The <strong>Streamable HTTP transport</strong> connects to a remote HTTP server. Use this for servers deployed as shared services or running in cloud environments.</p>
    <pre><code>{
  "mcpServers": {
    "shared-tracker": {
      "url": "https://mcp.example.com/tracker",
      "headers": {
        "Authorization": "Bearer ${MCP_AUTH_TOKEN}"
      }
    }
  }
}</code></pre>
    <p><strong>Key fields</strong>: <code>url</code> (base URL of the MCP server endpoint), <code>headers</code> (HTTP headers sent with every request -- use <code>${VAR_NAME}</code> for secrets).</p>
    <p>Uses HTTP POST for requests and supports streaming responses for long-running operations.</p>
  </div>
  <div data-tab="SSE (Deprecated)">
    <div class="ix-diagram" data-component="callout" data-variant="warning">
      <p><strong>SSE (Server-Sent Events) is deprecated as of 2025-03-26</strong>. Do not use SSE for new remote MCP server configurations. Use Streamable HTTP instead.</p>
    </div>
    <p>SSE was the original remote transport. It used HTTP GET with Server-Sent Events for server-to-client messages and HTTP POST for client-to-server messages. This split mechanism added complexity and has been superseded by the unified Streamable HTTP approach.</p>
    <p>If you encounter SSE configuration in existing code:</p>
    <pre><code>{
  "mcpServers": {
    "old-server": {
      "url": "https://example.com/mcp",
      "transport": "sse"
    }
  }
}
// DEPRECATED -- migrate to Streamable HTTP</code></pre>
    <p>Keep legacy HTTP+SSE only for compatibility with older integrations you cannot yet migrate.</p>
  </div>
</div>

<p class="ix-instruct">Step through the three phases of the MCP connection handshake.</p>

<div class="ix-diagram" data-component="step-walkthrough" data-diagram-id="m05-connection-handshake">
  <span class="ix-title">The MCP connection handshake</span>
  <div class="ix-step" data-step="1">
    <div class="ix-step-header">
      <span class="ix-step-num">1</span>
      <span class="ix-step-title">Initialize</span>
    </div>
    <div class="ix-step-body">
      <p>The client sends an <code>initialize</code> request with its protocol version and capabilities. The server responds with its protocol version, capabilities, and server information.</p>
      <p>If versions are incompatible, the connection fails here with a clear error.</p>
    </div>
  </div>
  <div class="ix-step" data-step="2">
    <div class="ix-step-header">
      <span class="ix-step-num">2</span>
      <span class="ix-step-title">List Capabilities</span>
    </div>
    <div class="ix-step-body">
      <p>The client requests the complete catalog: <code>tools/list</code>, <code>resources/list</code>, and <code>prompts/list</code>. The server returns all schemas.</p>
      <p>Claude loads these schemas and makes them available for the remainder of the session. This is when Claude learns what the server can do.</p>
    </div>
  </div>
  <div class="ix-step" data-step="3">
    <div class="ix-step-header">
      <span class="ix-step-num">3</span>
      <span class="ix-step-title">Available</span>
    </div>
    <div class="ix-step-body">
      <p>The connection is now active. Claude can call tools, read resources, and request prompts. This state persists until the session ends or the connection is explicitly closed.</p>
      <p><strong>Practical implication</strong>: MCP server changes (adding tools, modifying schemas) usually require reconnecting or starting a new session before updated schemas are visible.</p>
    </div>
  </div>
</div>

<details class="ix-collapse">
<summary>Deep Dive: Transport mechanics and CLI commands</summary>
<div class="ix-collapse-body">
<p>The stdio transport creates the MCP server as a child process of Claude Code. Communication happens via JSON-RPC messages written to the process's stdin and read from its stdout. This means all diagnostic output -- logging, errors, debug messages -- must go to stderr via <code>console.error()</code>. Any non-protocol output on stdout corrupts the communication channel.</p>
<p>The Streamable HTTP transport connects to a remote HTTP server endpoint. It uses HTTP POST for all client-to-server requests (tool calls, resource reads) and supports streaming responses for long-running operations. This replaced the older SSE pattern which used separate GET (server-to-client SSE stream) and POST (client-to-server messages) channels.</p>
<p>The Claude Code CLI supports adding servers directly: <code>claude mcp add server-name command [args...]</code> with <code>-e VAR_NAME</code> for environment variables. This writes the configuration to <code>settings.json</code> so you do not need to edit the file manually.</p>
</div>
</details>

---

## 5.5 MCP and the Agentic Loop (PRAO)

<div class="ix-diagram" data-component="objective">
  <p>Map how MCP primitives integrate into each phase of the Agentic Loop.</p>
</div>

In Module 01 you learned the Agentic Loop (PRAO) and in Module 03 you practiced reading agent traces. Now let's map MCP primitives onto each phase to see how the protocol serves the loop.

<p class="ix-instruct">Watch the trace replay to see a complete Agentic Loop cycle with MCP tools.</p>

<div class="ix-diagram" data-component="agent-trace"
     data-variant="prao"
     data-diagram-id="m05-mcp-prao-trace"
     data-speed="0.5">
  <span class="ix-title">Complete PRAO cycle: find open issues via MCP</span>
  <div class="ix-trace-row" data-type="prompt" data-delay="0" data-phase="perceive">
    <span class="ix-trace-content">> Find all open issues assigned to me</span>
  </div>
  <div class="ix-trace-row" data-type="think" data-delay="3500" data-phase="perceive">
    <span class="ix-trace-content">Reading search_issues tool schema... accepts query, status, assignee, limit. Reading config://user/current resource for username.</span>
  </div>
  <div class="ix-trace-row" data-type="think" data-delay="3500" data-phase="reason">
    <span class="ix-trace-content">search_issues with assignee="jsmith" and status="open" matches the task. query="" for broad match.</span>
  </div>
  <div class="ix-trace-row" data-type="tool" data-delay="1500" data-phase="act">
    <span class="ix-trace-content">mcp__tracker__search_issues({"query": "", "assignee": "jsmith", "status": "open"})</span>
  </div>
  <div class="ix-trace-row" data-type="result" data-delay="1500" data-phase="observe">
    <span class="ix-trace-content">-> 7 issues found: #42 Login timeout, #51 API rate limit, #63 Dashboard filter, #71 Export CSV, #82 Auth token refresh, #90 Search pagination, #95 Mobile layout</span>
  </div>
  <div class="ix-trace-row" data-type="response" data-delay="2500" data-phase="observe">
    <span class="ix-trace-content">You have 7 open issues assigned to you. Here they are by ID...</span>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="core-idea">
  <p><strong>Each PRAO phase has a distinct MCP failure mode</strong>. Perceive failure: tool schema was insufficient for Claude to understand the tool. Reason failure: Claude chose the wrong tool or wrong arguments. Act failure: server error during tool call. Observe failure: Claude misinterpreted the result.</p>
</div>

<details class="ix-collapse">
<summary>Deep Dive: MCP primitives mapped to PRAO phases</summary>
<div class="ix-collapse-body">
<p><strong>Perceive</strong>: At session start, Claude perceives all available tools by reading their schemas -- this is the agent's capability inventory. Resources become available as context Claude can read. A database schema resource helps Claude write correct SQL. An API specification resource helps Claude construct valid API calls. Resources answer "what is true right now" to inform the Reason phase.</p>
<p><strong>Reason</strong>: Using its understanding of available tools (from Perceive) and the current state (from resources), Claude reasons about what sequence of tool calls will accomplish the goal. It selects tools by matching task requirements against tool descriptions, constructs arguments by matching task parameters against tool schemas, and sequences calls based on dependencies. The quality of this reasoning depends directly on the quality of tool descriptions.</p>
<p><strong>Act</strong>: Claude executes tool calls by sending structured requests to the MCP server. Each call includes the tool name and a JSON object containing arguments validated against the input schema. Results are returned as content arrays -- arrays of content objects with <code>type</code> (text, image, resource) and the corresponding content.</p>
<p><strong>Observe</strong>: Claude reads the tool result and updates its understanding. If the result indicates success, it proceeds. If the result indicates an error (via <code>isError: true</code>), it reasons about whether to retry, try alternatives, or report the failure. Good error messages from MCP servers help Claude reason about failures effectively.</p>
</div>
</details>

---

## Module 05 Knowledge Check

<div class="ix-diagram" data-component="objective">
  <p>Verify your understanding of MCP architecture, primitives, schemas, transport, and integration with the Agentic Loop.</p>
</div>

<p class="ix-instruct">Test your understanding of MCP architecture.</p>

<div class="ix-diagram" data-component="quiz" data-diagram-id="m05-knowledge-check" data-xp="15">
  <span class="ix-title">Knowledge Check: MCP Architecture</span>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q1.</strong> Your database MCP server needs to expose the users table schema so Claude can write correct SQL. Which primitive should you use?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">Tool -- Claude calls <code>get_schema("users")</code> to retrieve it</button>
      <button class="ix-quiz-option" data-correct="true">Resource -- expose it at <code>db://schema/users</code> as addressable data</button>
      <button class="ix-quiz-option">Prompt -- create a template that includes the schema</button>
      <button class="ix-quiz-option">Tool with no parameters that returns the schema</button>
    </div>
    <p class="ix-quiz-explanation">The schema is stable reference data that the agent reads for context, not an action with side effects. Exposing it as a Resource at a URI like <code>db://schema/users</code> allows it to be cached, prefetched, and referenced by name. Exposing it as a parameterless Tool is a common misclassification.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q2.</strong> What three things should a tool description optimized for Claude include?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">Name, version number, and author</button>
      <button class="ix-quiz-option">Input types, output types, and error codes</button>
      <button class="ix-quiz-option" data-correct="true">What the tool does, when to use it vs. alternatives, and what it returns</button>
      <button class="ix-quiz-option">Installation instructions, dependencies, and configuration</button>
    </div>
    <p class="ix-quiz-explanation">A good tool description answers three questions for Claude: what does this tool do (the action), when should I use it and when should I use something else (disambiguation), and what will I get back (return format). This helps Claude select the right tool and interpret results correctly.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q3.</strong> A tool schema has <code>"status": {"type": "string"}</code> with no enum constraint. What risk does this create?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">Claude will refuse to use the tool</button>
      <button class="ix-quiz-option">The tool will crash on any input</button>
      <button class="ix-quiz-option" data-correct="true">Claude may generate invalid values like "pending" or "active" that the tool does not accept</button>
      <button class="ix-quiz-option">Claude will always pass null for this field</button>
    </div>
    <p class="ix-quiz-explanation">Without an <code>enum</code> constraint, Claude generates values that seem plausible in natural language but may not match the tool's accepted values. Adding <code>"enum": ["open", "in_progress", "closed", "all"]</code> prevents this by constraining Claude to only valid options.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q4.</strong> You configure a remote MCP server with <code>"transport": "sse"</code>. What should you do?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">Add <code>"streaming": true</code> to enable full functionality</button>
      <button class="ix-quiz-option">Nothing -- SSE is the standard remote transport</button>
      <button class="ix-quiz-option" data-correct="true">Migrate to Streamable HTTP -- SSE is deprecated as of 2025-03-26</button>
      <button class="ix-quiz-option">Switch to stdio since SSE only works locally</button>
    </div>
    <p class="ix-quiz-explanation">SSE (Server-Sent Events) was the original remote transport but is deprecated as of 2025-03-26. The answer that SSE is "the standard remote transport" is wrong -- Streamable HTTP replaced it. SSE is not a local-only transport either (that is stdio). Migrate to Streamable HTTP for all new configurations.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q5.</strong> During the MCP connection handshake, at which phase does Claude learn what tools the server provides?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">Phase 1: Initialize -- the server sends tools with its protocol version</button>
      <button class="ix-quiz-option" data-correct="true">Phase 2: List Capabilities -- the client requests <code>tools/list</code> and the server returns all schemas</button>
      <button class="ix-quiz-option">Phase 3: Available -- tools are discovered lazily on first use</button>
      <button class="ix-quiz-option">Before connection -- tools are listed in <code>settings.json</code></button>
    </div>
    <p class="ix-quiz-explanation">Phase 1 (Initialize) exchanges protocol versions and capabilities, not tool schemas. Phase 2 (List Capabilities) is when the client explicitly requests <code>tools/list</code>, <code>resources/list</code>, and <code>prompts/list</code> and the server returns all schemas. Tools are not discovered lazily (Phase 3 is the active state) and <code>settings.json</code> contains connection configuration, not tool schemas.</p>
  </div>
</div>

---

## Lab Connection

**Lab 04** connects directly to this module. You will analyze an existing MCP server configuration, map tools/resources/prompts to their roles in the Agentic Loop (PRAO), and verify connection health by listing available capabilities in-session.

---

## Further Reading

- [Model Context Protocol Official Documentation](https://modelcontextprotocol.io)
- [MCP Specification -- Transports (2025-03-26)](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports)
- [Claude Code MCP Configuration](https://docs.anthropic.com/en/docs/claude-code/mcp)

---


