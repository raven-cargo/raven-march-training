<div class="ix-diagram" data-component="module-hero">
<div class="ix-hero">
<div class="ix-hero-bg"></div>
<div class="ix-hero-module-num">Module 07</div>
<div class="ix-hero-title">Building MCP Servers</div>
<div class="ix-hero-subtitle">Design primitive sets, implement servers with the TypeScript SDK, write schemas Claude uses correctly, and handle production edge cases</div>
<div class="ix-hero-chips">
<span class="ix-hero-chip">Primitive Selection Framework</span>
<span class="ix-hero-chip">TypeScript SDK</span>
<span class="ix-hero-chip">Schema Design for LLMs</span>
<span class="ix-hero-chip">Error Handling Patterns</span>
<span class="ix-hero-chip">Production Hardening</span>
</div>
</div>
</div>

# Module 07: Building MCP Servers
---

## Overview

<div class="ix-diagram" data-component="objective">
  <p>Design primitive sets, implement a minimal stdio MCP server using the TypeScript SDK, write effective tool schemas, and handle production error cases -- so you can extend Claude Code with custom capabilities.</p>
</div>

Module 06 established the architecture of MCP -- the three primitives, the transports, and the connection handshake. Now we translate that understanding into implementation. You will design before you build, because poor primitive selection produces servers that technically work but that Claude uses poorly. For the full SDK reference, see the [MCP TypeScript SDK documentation](https://github.com/modelcontextprotocol/typescript-sdk).

---

## 7.1 Design Principles for MCP Servers

<div class="ix-diagram" data-component="objective">
  <p>Apply three design principles -- single responsibility, primitive selection, and authentication scoping -- before writing any server code.</p>
</div>

<p class="ix-instruct">Write your prediction, then reveal the reference reasoning.</p>

<div class="ix-diagram" data-component="predict-reveal" data-diagram-id="m06-design-predict" data-xp="8">
  <span class="ix-title">Predict Before You Learn</span>
  <p class="ix-predict-prompt">Before writing code, which three design decisions must you lock in for an MCP server: domain scope, primitive mapping (Tool/Resource/Prompt), and credential boundaries? What fails first if you skip this step?</p>
  <textarea class="ix-predict-input" aria-label="Your prediction" placeholder="Write your reasoning -- what design decisions matter before implementation?"></textarea>
  <details class="ix-predict-reveal">
    <summary>Reveal reference reasoning</summary>
    <p>Three design decisions must come before any code: <strong>domain scope</strong> (one server per coherent domain -- not an omnibus server covering everything), <strong>primitive classification</strong> (systematically deciding Tool vs. Resource vs. Prompt for each capability), and <strong>authentication boundaries</strong> (minimum-privilege credentials scoped to the server's domain). The most common design mistake is "everything as Tools" -- exposing stable data as Tool calls when Resources would be more appropriate, or embedding prompt templates in tool descriptions when the Prompt primitive exists for exactly that purpose. Skipping the design step produces servers that technically work but that Claude uses poorly or inconsistently.</p>
  </details>
</div>

<p class="ix-instruct">Review each entry to learn what belongs as a well-scoped server vs. what violates single responsibility.</p>

<div class="ix-diagram" data-component="entry-list" data-diagram-id="m06-server-boundaries">
  <span class="ix-title">MCP server domain boundaries</span>
  <div class="ix-entry" data-badge="include">
    <span class="ix-entry-title">GitHub server</span>
    <span class="ix-entry-detail">Repository operations, PR management, issue tracking -- one coherent domain with shared GitHub credentials</span>
  </div>
  <div class="ix-entry" data-badge="include">
    <span class="ix-entry-title">Database server</span>
    <span class="ix-entry-detail">Query execution, schema inspection, migration status -- single database system with scoped read/write credentials</span>
  </div>
  <div class="ix-entry" data-badge="include">
    <span class="ix-entry-title">Slack server</span>
    <span class="ix-entry-detail">Message posting, channel listing, user lookup -- one communication platform with its own API token</span>
  </div>
  <div class="ix-entry" data-badge="exclude">
    <span class="ix-entry-title">Infrastructure server</span>
    <span class="ix-entry-detail">Talks to GitHub, runs database queries, posts to Slack, and manages AWS resources -- too many domains, all credentials co-located, compromise of one exposes all</span>
  </div>
  <div class="ix-entry" data-badge="exclude">
    <span class="ix-entry-title">All-in-one agent server</span>
    <span class="ix-entry-detail">Exposes every external system the organization uses through one MCP endpoint -- tool selection degrades as count grows, no clear ownership, impossible to scope permissions</span>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="tip">
  <p><strong>15-tool threshold</strong>: If a server has more than 15 tools, examine whether it should be split into two servers. Tool selection quality degrades as tool count grows -- Claude has more difficulty identifying the right tool when choosing from 50 options across five domains than from 10 options in one domain.</p>
</div>

<p class="ix-instruct">Click to expand each branch and see how to classify capabilities as Tool, Resource, or Prompt -- including common misclassifications.</p>

<div class="ix-diagram" data-component="decision-tree" data-diagram-id="m06-primitive-selection">
  <span class="ix-title">Primitive selection framework</span>
  <div class="ix-tree-node" data-question="Does this capability have side effects or call an external API in real time?">
    <div class="ix-tree-branch" data-answer="Yes -- it creates, modifies, or deletes data">
      <div class="ix-tree-leaf" data-phase="act">
        <strong>Use a Tool</strong>
        <p>Tools are verbs -- actions the model invokes. Examples: <code>create_issue</code>, <code>search_issues</code>, <code>send_message</code>.</p>
        <p><i data-lucide="alert-triangle" width="16" height="16"></i> <strong>Common mistake</strong>: Exposing <code>get_schema()</code> as a Tool when the schema is stable data. If the query never changes and has no parameters, it should be a Resource.</p>
      </div>
    </div>
    <div class="ix-tree-branch" data-answer="No -- it reads stable or slowly-changing data">
      <div class="ix-tree-node" data-question="Can the data be addressed by a natural URI?">
        <div class="ix-tree-branch" data-answer="Yes -- it has a stable identity (db://schema, file://config)">
          <div class="ix-tree-leaf" data-phase="observe">
            <strong>Use a Resource</strong>
            <p>Resources are nouns -- data the application reads into context. Examples: <code>db://tracker/schema/issues</code>, <code>config://project/settings</code>.</p>
            <p><i data-lucide="alert-triangle" width="16" height="16"></i> <strong>Common mistake</strong>: Exposing a parameterless query as a Tool when it always returns the same data. If no inputs vary, it belongs as a Resource.</p>
          </div>
        </div>
        <div class="ix-tree-branch" data-answer="It is a parameterized template for the model">
          <div class="ix-tree-leaf" data-phase="perceive">
            <strong>Use a Prompt</strong>
            <p>Prompts are templates -- parameterized instruction sets that users or orchestrators select. Examples: <code>review-issue</code>, <code>debug-assist</code>.</p>
            <p><i data-lucide="alert-triangle" width="16" height="16"></i> <strong>Common mistake</strong>: Embedding prompt templates inside tool descriptions. The Prompt primitive exists for exactly this purpose -- it lets templates be listed, selected, and composed.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<p class="ix-instruct">Click each card to explore authentication scoping examples.</p>

<div class="ix-diagram" data-component="click-cards" data-diagram-id="m06-auth-boundaries">
  <span class="ix-title">Authentication boundary examples</span>
  <div class="ix-card" data-phase="act">
    <i data-lucide="eye" class="ix-card-icon"></i>
    <span class="ix-card-label">Read-Only Analytics</span>
  </div>
  <div class="ix-card" data-phase="reason">
    <i data-lucide="git-pull-request" class="ix-card-icon"></i>
    <span class="ix-card-label">PR Review Assistant</span>
  </div>
  <div class="ix-card" data-phase="observe">
    <i data-lucide="list-checks" class="ix-card-icon"></i>
    <span class="ix-card-label">Issue Management</span>
  </div>
  <!-- Detail panels -->
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="act">Read-Only Analytics Server</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">Credential scope</div>
        <div class="ix-sec-text">Database read-only credentials. Cannot modify data, only query for analytics and reporting.</div>
      </div>
      <div class="ix-char-grid">
        <div class="ix-char-item"><strong>Allowed</strong><span>SELECT queries, schema inspection, view definitions</span></div>
        <div class="ix-char-item"><strong>Denied</strong><span>INSERT, UPDATE, DELETE, DDL operations</span></div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="perceive">PR Review Assistant</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">Credential scope</div>
        <div class="ix-sec-text">GitHub token with <code>repo:read</code> and <code>pull_requests:read</code>. Can view code and PRs but cannot merge, approve, or modify repository settings.</div>
      </div>
      <div class="ix-char-grid">
        <div class="ix-char-item"><strong>Allowed</strong><span>Read repo contents, list PRs, read PR diffs and comments</span></div>
        <div class="ix-char-item"><strong>Denied</strong><span>Merge PRs, push commits, modify repo settings, admin actions</span></div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="success">Issue Management Server</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">Credential scope</div>
        <div class="ix-sec-text">Tracker API key with issue read/write permissions. Can create, update, and search issues but cannot perform administrative operations like project deletion or user management.</div>
      </div>
      <div class="ix-char-grid">
        <div class="ix-char-item"><strong>Allowed</strong><span>Create issues, update status, assign users, search, comment</span></div>
        <div class="ix-char-item"><strong>Denied</strong><span>Delete projects, manage users, modify workspace settings</span></div>
      </div>
    </div>
  </div>
</div>

<details class="ix-collapse">
<summary>Deep Dive: Why single responsibility matters for security and maintainability</summary>
<div class="ix-collapse-body">
<p><strong>Security isolation</strong>: Each server has its own credentials and permission scope. A GitHub MCP server holds GitHub tokens; a database MCP server holds database credentials. Compromising one server does not grant access to the capabilities of another. If you combine everything into one server, all credentials are co-located and a compromise of one credential exposes all of them.</p>
<p><strong>Maintainability</strong>: A server with a single domain is easier to update when that domain's API changes. A single-domain server has a small surface area and clear ownership. An omnibus server is a dependency of everything and owned by no one.</p>
<p><strong>Claude usability</strong>: Tool selection quality degrades as tool count grows. When a server exposes 50 tools across five domains, Claude has more difficulty identifying the right tool for a given task than when working with a focused 10-tool server covering one domain. Store credentials in environment variables, not in the server code or configuration files. Reference them with <code>${VAR_NAME}</code> in the MCP client configuration.</p>
</div>
</details>

---

## 7.2 The MCP SDK (TypeScript)

<div class="ix-diagram" data-component="objective">
  <p>Implement a minimal stdio MCP server using the TypeScript SDK, defining tools, resources, and prompts with proper schema declarations.</p>
</div>

The TypeScript SDK handles protocol handshake, message framing, and transport -- you implement the capability logic. The walkthrough below takes you from an empty directory to a running server.

<p class="ix-instruct">Step through the sequence to see the full SDK setup process.</p>

<div class="ix-diagram" data-component="step-walkthrough" data-diagram-id="m06-sdk-setup">
  <span class="ix-title">MCP server setup in four steps</span>
  <div class="ix-step" data-step="1">
    <div class="ix-step-title">Initialize project</div>
    <div class="ix-step-body">
      <p>Create a new directory and install the SDK with TypeScript tooling:</p>
      <pre><code>mkdir tracker-mcp &amp;&amp; cd tracker-mcp
npm init -y
npm install @modelcontextprotocol/sdk
npm install -D typescript @types/node tsx</code></pre>
    </div>
  </div>
  <div class="ix-step" data-step="2">
    <div class="ix-step-title">File structure</div>
    <div class="ix-step-body">
      <p>A minimal MCP server needs three files:</p>
      <pre><code>tracker-mcp/
  src/
    index.ts      # Server entry point
  package.json
  tsconfig.json</code></pre>
      <p>The <code>src/index.ts</code> file contains all server logic. For larger servers, split tool handlers into separate modules.</p>
    </div>
  </div>
  <div class="ix-step" data-step="3">
    <div class="ix-step-title">Server skeleton</div>
    <div class="ix-step-body">
      <p>The core boilerplate creates a server instance and connects it to stdio transport:</p>
      <pre><code>import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "tracker-mcp",
  version: "1.0.0",
  description: "MCP server for the internal project tracker"
});

// Tool, Resource, and Prompt definitions go here

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Tracker MCP server running on stdio");
}

main().catch(console.error);</code></pre>
      <p><strong>Key detail</strong>: Use <code>console.error()</code> for all logging. stdout is reserved for the MCP protocol -- any non-protocol output on stdout corrupts communication.</p>
    </div>
  </div>
  <div class="ix-step" data-step="4">
    <div class="ix-step-title">Run and connect</div>
    <div class="ix-step-body">
      <p>Run with <code>tsx</code> during development, then register with Claude Code:</p>
      <pre><code># Test the server directly
npx tsx src/index.ts

# Register with Claude Code
claude mcp add tracker -- npx tsx /path/to/tracker-mcp/src/index.ts</code></pre>
      <p>After adding, restart Claude Code. The server's tools, resources, and prompts appear in the available capabilities.</p>
    </div>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="warning">
  <p><strong>stdout is sacred</strong>: The MCP protocol uses stdout for all communication between client and server. All diagnostic output -- logging, errors, debug messages -- must go to stderr via <code>console.error()</code>. A single <code>console.log()</code> call can corrupt the protocol stream and crash the connection.</p>
</div>

<p class="ix-instruct">Switch between tabs to compare how each primitive type is defined in the SDK.</p>

<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="m06-primitive-implementation">
  <span class="ix-title">Defining primitives with the TypeScript SDK</span>
  <div data-tab="Tool">
    <p>The <code>server.tool()</code> method registers a tool with a name, description, Zod schema for inputs, and a handler function:</p>
    <pre><code>import { z } from "zod";

server.tool(
  "search_issues",
  "Search for issues in the project tracker matching " +
  "the given criteria. Use this tool when you need to " +
  "find existing issues by keyword, status, or assignee. " +
  "Returns an array of matching issues with IDs, titles, " +
  "statuses, and assignees.",
  {
    query: z.string()
      .describe("Full-text search query"),
    status: z.enum(["open", "in_progress", "closed", "all"])
      .default("open")
      .describe("Filter by issue status"),
    limit: z.number().int().min(1).max(100).default(20)
      .describe("Maximum number of results to return")
  },
  async ({ query, status, limit }) =&gt; {
    const results = await trackerClient
      .searchIssues({ query, status, limit });
    return {
      content: [{
        type: "text",
        text: JSON.stringify(results, null, 2)
      }]
    };
  }
);</code></pre>
    <p><strong>Key points</strong>: The <code>.describe()</code> method on each Zod field populates the JSON Schema <code>description</code>. The return structure is always <code>{ content: [{ type: "text", text: ... }] }</code>.</p>
  </div>
  <div data-tab="Resource">
    <p>The <code>server.resource()</code> method registers a resource with a name, URI, description, and a read handler:</p>
    <pre><code>server.resource(
  "issue-schema",
  "db://tracker/schema/issues",
  "The database schema for the issues table, " +
  "including all column names, types, and constraints.",
  async () =&gt; {
    const schema = await trackerClient
      .getTableSchema("issues");
    return {
      contents: [{
        uri: "db://tracker/schema/issues",
        mimeType: "application/json",
        text: JSON.stringify(schema, null, 2)
      }]
    };
  }
);</code></pre>
    <p><strong>Key points</strong>: Resources return <code>contents</code> (plural) with a <code>uri</code>, <code>mimeType</code>, and <code>text</code>. The URI is the stable address clients use to request the resource. Choose meaningful, hierarchical URIs.</p>
  </div>
  <div data-tab="Prompt">
    <p>The <code>server.prompt()</code> method registers a prompt with a name, description, Zod arguments, and a handler returning messages:</p>
    <pre><code>server.prompt(
  "review-issue",
  "Generate a structured analysis prompt for " +
  "reviewing a tracker issue.",
  {
    issue_id: z.string()
      .describe("The ID of the issue to review"),
    focus_area: z.enum([
      "completeness", "feasibility",
      "priority", "all"
    ]).default("all")
      .describe("Aspect to focus the review on")
  },
  async ({ issue_id, focus_area }) =&gt; {
    const issue = await trackerClient
      .getIssue(issue_id);
    return {
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `Review this issue (${focus_area}):\n` +
            JSON.stringify(issue, null, 2)
        }
      }]
    };
  }
);</code></pre>
    <p><strong>Key points</strong>: Prompts return <code>messages</code> with <code>role: "user"</code>. The handler fetches server-side data and constructs a parameterized template that the client can use directly.</p>
  </div>
</div>

<details class="ix-collapse">
<summary>Deep Dive: Full server example with all three primitives</summary>
<div class="ix-collapse-body">
<p>A complete server combining all three primitive types follows this structure. The SDK uses Zod for schema definition -- Zod schemas are automatically converted to JSON Schema for the MCP protocol. Each <code>.describe()</code> call on a Zod field populates the <code>description</code> in the generated JSON Schema, which Claude reads when deciding how to use the tool.</p>
<p>For resources, the URI pattern is critical. Choose URIs that are meaningful (<code>db://tracker/schema/issues</code> not <code>resource://1</code>), hierarchical (using path segments to express containment), and consistent across all resources in the server.</p>
<p>For prompts, the <code>messages</code> return structure lets you inject server-side data into the template before Claude sees it. This is more powerful than asking Claude to fetch data and then construct the prompt itself -- the server has direct access to the data source and can format it optimally.</p>
</div>
</details>

---

## 7.3 Writing Tool Schemas That Work

<div class="ix-diagram" data-component="objective">
  <p>Write tool schemas with descriptions and input specifications that Claude uses correctly on the first attempt.</p>
</div>

The tool schema -- name, description, and input specification -- is the interface between your server and Claude's reasoning. In Module 04, you learned to apply TCEF principles for writing effective prompts. Tool descriptions are prompts for Claude: they determine whether Claude selects the right tool and constructs correct arguments.

<p class="ix-instruct">Compare the two schemas side by side to see how description quality affects Claude's behavior.</p>

<div class="ix-diagram" data-component="compare" data-diagram-id="m06-schema-quality">
  <span class="ix-title">Tool schema quality comparison</span>
  <div data-label="Vague Schema">
    <pre><code>{
  "name": "search",
  "description": "Searches the system.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "q": { "type": "string" }
    }
  }
}</code></pre>
    <p><i data-lucide="x-circle" width="16" height="16"></i> <strong>Problems</strong>: Which system? What does it search? What does it return? The parameter name <code>q</code> is a convention known to search engineers but not obvious to an LLM. No disambiguation from other tools. No return value description.</p>
  </div>
  <div data-label="Effective Schema">
    <pre><code>{
  "name": "search_issues",
  "description": "Search for project tracker
    issues by keyword. Use when you need to
    find existing issues by content. For
    issues by ID, use get_issue. Returns up
    to 20 issues with id, title, status.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "Full-text search
          terms for titles and descriptions."
      },
      "status": {
        "type": "string",
        "enum": ["open", "closed", "all"]
      },
      "limit": {
        "type": "integer",
        "default": 20,
        "minimum": 1,
        "maximum": 100
      }
    },
    "required": ["query"]
  }
}</code></pre>
    <p><i data-lucide="check-circle" width="16" height="16"></i> <strong>Why this works</strong>: Three-part description (what, when, returns). Disambiguation from similar tools. Descriptive parameter names. Enum constraints on status. Only truly required fields marked required.</p>
  </div>
</div>

<p class="ix-instruct">Click each card to explore the three most common schema mistakes and their fixes.</p>

<div class="ix-diagram" data-component="click-cards" data-diagram-id="m06-schema-mistakes">
  <span class="ix-title">Common schema mistakes</span>
  <div class="ix-card" data-phase="neutral">
    <i data-lucide="cloud-fog" class="ix-card-icon"></i>
    <span class="ix-card-label">Too Vague</span>
  </div>
  <div class="ix-card" data-phase="perceive">
    <i data-lucide="alert-circle" class="ix-card-icon"></i>
    <span class="ix-card-label">Missing Constraints</span>
  </div>
  <div class="ix-card" data-phase="reason">
    <i data-lucide="toggle-left" class="ix-card-icon"></i>
    <span class="ix-card-label">Wrong Required Fields</span>
  </div>
  <!-- Detail panels -->
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="neutral">Too Vague -- Claude cannot decide when to use the tool</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">Symptom</div>
        <div class="ix-sec-text">Claude calls the wrong tool for a task, or avoids using the tool entirely because it cannot determine what it does or when it applies.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Fix</div>
        <div class="ix-sec-text">Write a three-part description: (1) what the tool does, (2) when to use it and when to use alternatives, (3) what it returns. Add explicit disambiguation: "Do not use this tool to create issues -- use <code>create_issue</code> instead."</div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="perceive">Missing Constraints -- Claude passes invalid values</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">Symptom</div>
        <div class="ix-sec-text">Claude passes arbitrary strings where only specific values are valid, or sends numbers outside the acceptable range.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Fix</div>
        <div class="ix-sec-text">Add <code>enum</code> for fixed value sets (<code>["open", "closed", "all"]</code>). Add <code>minimum</code>/<code>maximum</code> for numeric ranges. Add <code>pattern</code> for string formats. Zod equivalents: <code>z.enum()</code>, <code>z.number().min().max()</code>.</div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="act">Wrong Required Fields -- Claude omits necessary inputs or always specifies optional ones</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">Symptom</div>
        <div class="ix-sec-text">Claude always specifies a <code>limit</code> even when the default is appropriate, or omits a field that the tool cannot function without.</div>
      </div>
      <div class="ix-section">
        <div class="ix-sec-label">Fix</div>
        <div class="ix-sec-text">Mark a field as required only when the tool genuinely cannot function without it. Give optional fields sensible defaults using <code>.default()</code>. Use <code>.optional()</code> with clear <code>.describe()</code> text explaining what happens when omitted.</div>
      </div>
    </div>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="tip">
  <p><strong>Test the schema with Claude</strong>: After implementing a tool, connect the server to Claude Code and ask it to use the tool in several ways. If Claude calls the wrong tool, the description needs better disambiguation. If it passes wrong arguments, improve field descriptions. If it always specifies optional parameters, consider adding better defaults.</p>
</div>

<details class="ix-collapse">
<summary>Deep Dive: The three-question description test</summary>
<div class="ix-collapse-body">
<p>Every tool description should answer three questions in order: (1) <strong>What does this tool do?</strong> -- a precise action description, (2) <strong>When should I use this tool?</strong> -- conditions and disambiguation from similar tools, (3) <strong>What will I get back?</strong> -- return value description including structure and edge cases.</p>
<p>A litmus test for description quality: give just the description (not the tool name, not the input schema) to Claude and ask "what does this tool do and when would you use it?" If the answer is accurate and specific, the description is good. If the answer is vague or wrong, the description needs work.</p>
<p>For parameter names, use descriptive words (<code>query</code> not <code>q</code>, <code>assignee</code> not <code>a</code>). Claude reads parameter names as part of its reasoning about how to use the tool. A descriptive name reduces the need for lengthy field descriptions.</p>
</div>
</details>

---

## 7.4 Error Handling and Robustness

<div class="ix-diagram" data-component="objective">
  <p>Handle errors using the <code>isError</code> flag pattern and implement timeout and partial result strategies for production MCP servers.</p>
</div>

In Module 06, you learned that tool results flow back through the Observe phase of the Agentic Loop. Good error messages help Claude reason about failures -- retry, try alternatives, or report to the user. Poor error handling produces servers that crash silently or return confusing results.

<p class="ix-instruct">Predict the handler behavior before comparing the reference implementation.</p>

<div class="ix-diagram" data-component="predict-reveal" data-diagram-id="m06-error-classification-predict" data-xp="8">
  <span class="ix-title">Predict: Structured Error or Exception?</span>
  <p class="ix-predict-prompt">Your <code>create_issue</code> tool receives an invalid assignee ID from the user request. Should the tool return <code>isError: true</code> with guidance, or throw an exception? Explain how Claude should recover.</p>
  <textarea class="ix-predict-input" aria-label="Your prediction" placeholder="Write your decision and rationale..."></textarea>
  <details class="ix-predict-reveal">
    <summary>Reveal reference reasoning</summary>
    <p>Return a structured error with <code>isError: true</code>. This is a recoverable input problem that Claude can act on by asking for a valid assignee or retrying with corrected arguments. Throw exceptions for server-side failures Claude cannot fix (missing credentials, infrastructure outage, internal defects). Use structured errors for caller-correctable issues; use exceptions for system failures.</p>
  </details>
</div>

<p class="ix-instruct">Switch between tabs to compare three error handling patterns.</p>

<div class="ix-diagram" data-component="tabbed-panel" data-diagram-id="m06-error-patterns">
  <span class="ix-title">MCP error handling patterns</span>
  <div data-tab="Structured Errors">
    <p>Return <code>isError: true</code> for recoverable failures that Claude can reason about:</p>
    <pre><code>async ({ issue_id }) =&gt; {
  try {
    const issue = await trackerClient
      .getIssue(issue_id);
    return {
      content: [{
        type: "text",
        text: JSON.stringify(issue, null, 2)
      }]
    };
  } catch (error) {
    if (error.code === "NOT_FOUND") {
      return {
        content: [{
          type: "text",
          text: `Issue ${issue_id} not found. ` +
            `Verify the ID and try again.`
        }],
        isError: true
      };
    }
    throw error; // Re-throw unexpected errors
  }
}</code></pre>
    <p><strong>Use for</strong>: resource not found, permission denied, rate limiting, invalid argument combinations.</p>
  </div>
  <div data-tab="Timeouts">
    <p>Use <code>AbortController</code> to prevent tool calls from hanging indefinitely:</p>
    <pre><code>async ({ query, limit }) =&gt; {
  const controller = new AbortController();
  const timeout = setTimeout(
    () =&gt; controller.abort(), 10000
  );
  try {
    const results = await trackerClient
      .searchIssues(
        { query, limit },
        { signal: controller.signal }
      );
    return {
      content: [{
        type: "text",
        text: JSON.stringify(results, null, 2)
      }]
    };
  } catch (error) {
    if (error.name === "AbortError") {
      return {
        content: [{
          type: "text",
          text: "Search timed out after 10s. " +
            "Try a more specific query."
        }],
        isError: true
      };
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}</code></pre>
    <p><strong>Use for</strong>: external API calls, database queries, any operation that could hang.</p>
  </div>
  <div data-tab="Partial Results">
    <p>For bulk operations, return what succeeded with a clear summary:</p>
    <pre><code>async ({ issue_ids }) =&gt; {
  const results = [];
  const errors = [];
  for (const id of issue_ids) {
    try {
      const issue = await trackerClient
        .getIssue(id);
      results.push(issue);
    } catch (error) {
      errors.push({
        id, error: error.message
      });
    }
  }
  return {
    content: [{
      type: "text",
      text: JSON.stringify({
        retrieved: results,
        failed: errors,
        summary: `Retrieved ${results.length}` +
          ` of ${issue_ids.length} issues`
      }, null, 2)
    }],
    isError: errors.length &gt; 0
      &amp;&amp; results.length === 0
  };
}</code></pre>
    <p><strong>Key detail</strong>: Set <code>isError: true</code> only when <em>nothing</em> succeeded. If some results were retrieved, Claude can use them while noting the partial failure.</p>
  </div>
</div>

<p class="ix-instruct">Review each decision to understand when to return a structured error vs. throw an exception.</p>

<div class="ix-diagram" data-component="intervention" data-diagram-id="m06-error-decision">
  <span class="ix-title">Structured error vs. exception</span>
  <div class="ix-intervention-item" data-action="hold">
    <span class="ix-intervention-label">Resource not found</span>
    <span class="ix-intervention-detail">Return structured error with <code>isError: true</code> -- Claude can retry with a different ID or ask the user</span>
  </div>
  <div class="ix-intervention-item" data-action="hold">
    <span class="ix-intervention-label">Insufficient permissions</span>
    <span class="ix-intervention-detail">Return structured error -- Claude can explain the permission gap to the user or try a different approach</span>
  </div>
  <div class="ix-intervention-item" data-action="hold">
    <span class="ix-intervention-label">Rate limiting</span>
    <span class="ix-intervention-detail">Return structured error -- Claude can wait and retry, or inform the user about the rate limit</span>
  </div>
  <div class="ix-intervention-item" data-action="hold">
    <span class="ix-intervention-label">Invalid argument combination</span>
    <span class="ix-intervention-detail">Return structured error -- Claude can correct the arguments and retry the call</span>
  </div>
  <div class="ix-intervention-item" data-action="intervene">
    <span class="ix-intervention-label">Missing server credentials</span>
    <span class="ix-intervention-detail">Throw exception -- this is a server configuration error, not something Claude can fix at runtime</span>
  </div>
  <div class="ix-intervention-item" data-action="intervene">
    <span class="ix-intervention-label">Infrastructure failure</span>
    <span class="ix-intervention-detail">Throw exception -- database down, network unreachable -- the server cannot serve any requests</span>
  </div>
  <div class="ix-intervention-item" data-action="intervene">
    <span class="ix-intervention-label">Internal bug</span>
    <span class="ix-intervention-detail">Throw exception -- unexpected errors indicate a server defect that needs developer attention, not LLM reasoning</span>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="key-concept">
  <p><strong>The isError contract</strong>: When <code>isError: true</code> is set, Claude understands the tool invocation failed and treats the content as an error message. This lets Claude reason about the failure -- retry with different arguments, try a different tool, or report to the user -- rather than misinterpreting error text as successful data.</p>
</div>

<details class="ix-collapse">
<summary>Deep Dive: Designing actionable error messages</summary>
<div class="ix-collapse-body">
<p>The distinction between structured errors and exceptions maps directly to recoverability. Structured errors (<code>isError: true</code>) are for situations where the LLM can reason about the failure and take corrective action. Exceptions are for situations where something is fundamentally wrong with the server -- missing credentials, infrastructure failures, bugs -- that no amount of LLM reasoning can fix.</p>
<p>When writing error messages for structured errors, include: (1) what went wrong, (2) why it went wrong if known, and (3) what the caller can do about it. "Issue 42 not found. Verify the issue ID and try again." is better than "Not found." because it gives Claude actionable information.</p>
<p>For timeout errors, include the timeout duration and a suggestion for reducing scope: "Search timed out after 10 seconds. Try a more specific query or smaller limit." This helps Claude self-correct rather than retrying the exact same request.</p>
</div>
</details>

---

## 7.5 Production Considerations

<div class="ix-diagram" data-component="objective">
  <p>Apply production hardening practices for secrets management, observability logging, and semantic versioning to a working MCP server.</p>
</div>

A server that works in development differs from one that can be relied upon in production. Three areas require deliberate attention.

<p class="ix-instruct">Click each card to explore production hardening practices.</p>

<div class="ix-diagram" data-component="click-cards" data-diagram-id="m06-production-checklist">
  <span class="ix-title">Production hardening checklist</span>
  <div class="ix-card" data-phase="perceive">
    <i data-lucide="lock" class="ix-card-icon"></i>
    <span class="ix-card-label">Secrets</span>
  </div>
  <div class="ix-card" data-phase="act">
    <i data-lucide="scroll" class="ix-card-icon"></i>
    <span class="ix-card-label">Logging</span>
  </div>
  <div class="ix-card" data-phase="observe">
    <i data-lucide="tag" class="ix-card-icon"></i>
    <span class="ix-card-label">Versioning</span>
  </div>
  <!-- Detail panels -->
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="perceive">Secrets -- Environment Variables Only</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">Rule</div>
        <div class="ix-sec-text">All credentials, API keys, and tokens come from environment variables. Never hardcode secrets in server code, configuration files, or version-controlled files.</div>
      </div>
      <div class="ix-char-grid">
        <div class="ix-char-item"><strong>In MCP config</strong><span>Reference with <code>${VAR_NAME}</code> in the <code>env</code> block</span></div>
        <div class="ix-char-item"><strong>In server code</strong><span>Read from <code>process.env.VAR_NAME</code></span></div>
        <div class="ix-char-item"><strong>At startup</strong><span>Validate required vars exist -- fail fast with a clear error message rather than failing mysteriously at first tool call</span></div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="act">Logging -- Every Invocation to stderr</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">Rule</div>
        <div class="ix-sec-text">Log every tool invocation with enough context to debug failures. All logging goes to stderr via <code>console.error()</code>.</div>
      </div>
      <div class="ix-char-grid">
        <div class="ix-char-item"><strong>Log on call</strong><span>Tool name, all input arguments</span></div>
        <div class="ix-char-item"><strong>Log on success</strong><span>Result count, elapsed time in milliseconds</span></div>
        <div class="ix-char-item"><strong>Log on error</strong><span>Error message, elapsed time, input arguments that caused the failure</span></div>
      </div>
    </div>
  </div>
  <div class="ix-detail-panel">
    <div class="ix-detail-header" data-phase="success">Versioning -- Semver for MCP Servers</div>
    <div class="ix-detail-body">
      <div class="ix-section">
        <div class="ix-sec-label">Rule</div>
        <div class="ix-sec-text">Use semantic versioning. The version is included in the <code>initialize</code> response and used by clients to track deployments.</div>
      </div>
      <div class="ix-char-grid">
        <div class="ix-char-item"><strong>Major (breaking)</strong><span>Removing a tool, changing a field type, renaming a tool</span></div>
        <div class="ix-char-item"><strong>Minor (addition)</strong><span>Adding a new tool, adding an optional field, new resource or prompt</span></div>
        <div class="ix-char-item"><strong>Patch (fix)</strong><span>Bug fixes, description improvements, performance improvements</span></div>
      </div>
    </div>
  </div>
</div>

<div class="ix-diagram" data-component="callout" data-variant="warning">
  <p><strong>Never hardcode secrets</strong>: Store credentials in environment variables. Reference them with <code>${VAR_NAME}</code> in the MCP client config. Failing fast at startup with a clear error message is better than failing mysteriously at the first tool call when the missing credential is finally needed.</p>
</div>

<p class="ix-instruct">Watch the trace replay to see stderr logging output during a tool invocation.</p>

<div class="ix-diagram" data-component="agent-trace"
     data-variant="terminal"
     data-diagram-id="m06-logging-trace"
     data-speed="0.5">
  <span class="ix-title">Production logging: stderr output during tool invocation</span>
  <div class="ix-trace-row" data-type="prompt" data-delay="0">
    <span class="ix-trace-content">> Find open issues about the login feature</span>
  </div>
  <div class="ix-trace-row" data-type="think" data-delay="3500">
    <span class="ix-trace-content">The user wants to search for issues. I should use search_issues with query="login feature" and status="open".</span>
  </div>
  <div class="ix-trace-row" data-type="tool" data-delay="1500">
    <span class="ix-trace-content">search_issues(query="login feature", status="open")</span>
  </div>
  <div class="ix-trace-row" data-type="result" data-delay="1500">
    <span class="ix-trace-content">stderr: [search_issues] called with query="login feature" status="open" assignee=any limit=20</span>
  </div>
  <div class="ix-trace-row" data-type="result" data-delay="1500">
    <span class="ix-trace-content">stderr: [search_issues] returned 3 results in 142ms</span>
  </div>
  <div class="ix-trace-row" data-type="response" data-delay="2500">
    <span class="ix-trace-content">Found 3 open issues about the login feature: TRACK-142 "Login timeout on slow connections", TRACK-187 "Login page accessibility", TRACK-201 "SSO login redirect loop"</span>
  </div>
</div>

<details class="ix-collapse">
<summary>Deep Dive: Logging code pattern and version management</summary>
<div class="ix-collapse-body">
<p>The minimum logging pattern captures: the tool name, all input arguments, the result size, elapsed time, and any errors. Here is the template:</p>
<pre><code>server.tool(
  "search_issues",
  // ... description and schema ...
  async ({ query, status, assignee, limit }) =&gt; {
    const start = Date.now();
    console.error(`[search_issues] called with query="${query}" status="${status}" assignee="${assignee ?? 'any'}" limit=${limit}`);
    try {
      const results = await trackerClient.searchIssues({ query, status, assignee, limit });
      console.error(`[search_issues] returned ${results.length} results in ${Date.now() - start}ms`);
      return { content: [{ type: "text", text: JSON.stringify(results, null, 2) }] };
    } catch (error) {
      console.error(`[search_issues] error after ${Date.now() - start}ms: ${error.message}`);
      return { content: [{ type: "text", text: `Search failed: ${error.message}` }], isError: true };
    }
  }
);</code></pre>
<p>For version management, read the version from <code>package.json</code> so the server constructor always reflects the current version without manual synchronization:</p>
<pre><code>import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { version } = require("../package.json");

const server = new McpServer({
  name: "tracker-mcp",
  version,
  description: "MCP server for the internal project tracker"
});</code></pre>
</div>
</details>

<details class="ix-collapse">
<summary>Deep Dive: MCP client configuration with environment variables</summary>
<div class="ix-collapse-body">
<p>In the MCP client configuration (e.g., Claude Code <code>settings.json</code>), reference environment variables with <code>${VAR_NAME}</code> syntax in the <code>env</code> block:</p>
<pre><code>{
  "mcpServers": {
    "tracker": {
      "command": "node",
      "args": ["/opt/mcp-servers/tracker/index.js"],
      "env": {
        "TRACKER_API_KEY": "${TRACKER_API_KEY}",
        "TRACKER_BASE_URL": "${TRACKER_BASE_URL}"
      }
    }
  }
}</code></pre>
<p>In the server code, validate required environment variables at startup:</p>
<pre><code>const apiKey = process.env.TRACKER_API_KEY;
if (!apiKey) {
  console.error("TRACKER_API_KEY environment variable is required");
  process.exit(1);
}</code></pre>
<p>Failing fast at startup with a clear error message is far better than failing at runtime when the first tool call tries to use the missing credential.</p>
</div>
</details>

---

## Module 07 Knowledge Check

<div class="ix-diagram" data-component="objective">
  <p>Verify your understanding of MCP server design, SDK implementation, schema writing, error handling, and production practices.</p>
</div>

<p class="ix-instruct">Test your understanding of MCP server building concepts.</p>

<div class="ix-diagram" data-component="quiz" data-diagram-id="m06-knowledge-check" data-xp="15">
  <span class="ix-title">Knowledge Check: Building MCP Servers</span>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q1.</strong> You are designing an MCP server and have a capability that returns the database schema. The schema changes rarely and has no input parameters. How should you expose it?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">As a Tool called <code>get_schema()</code> with no parameters</button>
      <button class="ix-quiz-option" data-correct="true">As a Resource at <code>db://schema/tables</code> -- it is stable data read for context</button>
      <button class="ix-quiz-option">As a Prompt that generates a schema description</button>
      <button class="ix-quiz-option">Embedded in the server's description string</button>
    </div>
    <p class="ix-quiz-explanation">Stable, rarely-changing data with a natural URI identity belongs as a Resource, not a Tool. Resources are nouns -- data the application reads into context. Tools are for operations with side effects or variable inputs. Exposing a parameterless, stable query as a Tool is a common misclassification.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q2.</strong> Why must all logging in an MCP server use <code>console.error()</code> instead of <code>console.log()</code>?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option"><code>console.log()</code> is slower for high-throughput servers</button>
      <button class="ix-quiz-option">Error-level logging is required by the MCP specification</button>
      <button class="ix-quiz-option" data-correct="true"><code>stdout</code> is reserved for the MCP protocol -- any non-protocol output corrupts communication</button>
      <button class="ix-quiz-option"><code>console.error()</code> provides stack traces automatically</button>
    </div>
    <p class="ix-quiz-explanation">The MCP protocol uses stdout as the communication channel between client and server. Any output sent to stdout that is not a valid MCP message corrupts the protocol stream. All diagnostic output -- logging, debug messages, errors -- must go to stderr via <code>console.error()</code>.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q3.</strong> A tool returns <code>{ content: [{ type: "text", text: "Issue 42 not found" }], isError: true }</code>. What does Claude do with this?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">Crashes the session with an error</button>
      <button class="ix-quiz-option">Displays the error to the user and stops</button>
      <button class="ix-quiz-option">Ignores the error and continues with the next tool</button>
      <button class="ix-quiz-option" data-correct="true">Treats the content as an error message and reasons about it -- may retry, try alternatives, or report to the user</button>
    </div>
    <p class="ix-quiz-explanation">When <code>isError: true</code> is set, Claude understands the tool invocation failed and treats the content as an error message rather than data. This enables Claude to reason about the failure -- it might retry with different arguments, try a different tool, or report the failure to the user. The session does not crash; structured errors are the graceful failure path.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q4.</strong> Your MCP server has 22 tools covering GitHub operations, database queries, and Slack messaging. A developer reports Claude frequently calls the wrong tool. What is the most likely root cause?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">The tool descriptions are too long for Claude to process</button>
      <button class="ix-quiz-option">The server version is incompatible with Claude Code</button>
      <button class="ix-quiz-option" data-correct="true">The server covers too many domains -- tool selection degrades with count; split into separate GitHub, database, and Slack servers</button>
      <button class="ix-quiz-option">Claude needs more training data on MCP tool selection</button>
    </div>
    <p class="ix-quiz-explanation">This is a single-responsibility violation. Tool selection quality degrades as tool count grows. With 22 tools across three unrelated domains, Claude struggles to disambiguate between tools. The fix is architectural: split into three focused servers (GitHub, database, Slack), each with a manageable tool set and its own scoped credentials. Longer descriptions are not the issue -- domain confusion is.</p>
  </div>
  <div class="ix-quiz-question">
    <p class="ix-quiz-prompt"><strong>Q5.</strong> What is the difference between a major and minor version bump for an MCP server?</p>
    <div class="ix-quiz-options">
      <button class="ix-quiz-option">Major = any tool change; minor = description changes</button>
      <button class="ix-quiz-option" data-correct="true">Major = breaking changes (removing tools, changing types); minor = non-breaking additions (new tools, optional fields)</button>
      <button class="ix-quiz-option">Major = new features; minor = bug fixes</button>
      <button class="ix-quiz-option">Major = server restarts needed; minor = hot-reload compatible</button>
    </div>
    <p class="ix-quiz-explanation">MCP servers follow semantic versioning (semver). A major bump signals breaking changes: removing a tool, removing a required field, changing a field type, or renaming a tool -- anything that would break existing clients. A minor bump signals non-breaking additions: new tools, new optional fields, new resources or prompts. Patch bumps cover bug fixes, description improvements, and performance work.</p>
  </div>
</div>

---

## Lab Connection

**Lab 04** reinforces this module's fundamentals by having you inspect and validate MCP capability surfaces (tools/resources/prompts) and verify server connectivity in-session. For full server implementation practice, use the optional build challenge in the advanced project track.

---

## Further Reading

- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [MCP Python SDK](https://github.com/modelcontextprotocol/python-sdk)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/specification)
- [MCP Server Examples](https://github.com/modelcontextprotocol/servers)
- [Zod Schema Validation](https://zod.dev)
- [Claude Code MCP Configuration Reference](https://docs.anthropic.com/en/docs/claude-code/mcp)
- [Standalone Diagram: MCP Server Design Boundaries](/examples/module-diagrams/m06-server-boundaries.html)

---
