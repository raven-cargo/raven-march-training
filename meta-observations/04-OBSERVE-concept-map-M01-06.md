# CC2.0 OBSERVE: Concept Map -- Modules 01-06
**Date**: 2026-03-16
**Observer**: CC2-OBSERVE (Concept Foundations)
**Operation**: extract -> duplicate -> extend

---

## Module-by-Module Concept Registry

### Module 01: The Paradigm Shift

| # | Concept | Type | Section | Dependencies | First/Referenced |
|---|---------|------|---------|--------------|-----------------|
| 1 | Three Eras of AI-Assisted Engineering | Mental model | 1.1 | None | INTRODUCED |
| 2 | Era 1: Autocomplete AI | Paradigm | 1.1 | None | INTRODUCED |
| 3 | Era 2: Assistant AI | Paradigm | 1.1 | Era 1 (contrast) | INTRODUCED |
| 4 | Era 3: Agentic AI | Paradigm | 1.1 | Era 1, Era 2 (contrast) | INTRODUCED |
| 5 | Agency (as defining property) | Core concept | 1.1 | None | INTRODUCED |
| 6 | Feedback loop (action-observation) | Core concept | 1.1 | Agency | INTRODUCED |
| 7 | Disorientation Problem | Failure mode | 1.1 | Three Eras | INTRODUCED |
| 8 | PRAO Loop | Framework | 1.2 | Agency, Feedback loop | INTRODUCED |
| 9 | Perceive (PRAO phase) | Component | 1.2 | PRAO Loop | INTRODUCED |
| 10 | Reason (PRAO phase) | Component | 1.2 | PRAO Loop | INTRODUCED |
| 11 | Act (PRAO phase) | Component | 1.2 | PRAO Loop | INTRODUCED |
| 12 | Observe (PRAO phase) | Component | 1.2 | PRAO Loop | INTRODUCED |
| 13 | ReAct framing | Reference | 1.2 | None (external) | INTRODUCED |
| 14 | Tool call | Mechanism | 1.2 | Agency, Act phase | INTRODUCED |
| 15 | PRAO cycle (multi-cycle) | Pattern | 1.2 | PRAO Loop | INTRODUCED |
| 16 | Loop detection (agent stuck) | Diagnostic | 1.2 | PRAO cycle | INTRODUCED |
| 17 | Claude Code (technical reality) | System | 1.3 | Agency, Tool call | INTRODUCED |
| 18 | Interactive mode (`claude`) | Mode | 1.3 | Claude Code | INTRODUCED |
| 19 | Non-interactive mode (`claude -p`) | Mode | 1.3 | Claude Code | INTRODUCED |
| 20 | Session context | Concept | 1.3 | Claude Code | INTRODUCED |
| 21 | Persistent context | Concept | 1.3 | Claude Code | INTRODUCED |
| 22 | CLAUDE.md | Mechanism | 1.3 | Persistent context | INTRODUCED |
| 23 | Session resume (`--continue`, `--resume`) | Feature | 1.3 | Session context | INTRODUCED |
| 24 | settings.json | Configuration | 1.3 | Claude Code | INTRODUCED |
| 25 | MCP servers (preview) | System | 1.3 | Claude Code | INTRODUCED |
| 26 | Junior engineer mental model | Mental model | 1.3 | Three Eras | INTRODUCED |
| 27 | Failure Mode: Autocomplete mindset | Anti-pattern | 1.4 | Three Eras, PRAO | INTRODUCED |
| 28 | Failure Mode: Magic box mindset | Anti-pattern | 1.4 | Three Eras | INTRODUCED |
| 29 | Failure Mode: Rubber-stamping | Anti-pattern | 1.4 | Three Eras | INTRODUCED |
| 30 | Productive collaboration pattern (6 steps) | Framework | 1.4 | All failure modes | INTRODUCED |
| 31 | Task suitability assessment | Framework | 1.5 | Agency | INTRODUCED |
| 32 | Strong fit: Repetitive-but-cognitive tasks | Category | 1.5 | Task suitability | INTRODUCED |
| 33 | Weak fit: Inaccessible data tasks | Category | 1.5 | Task suitability | INTRODUCED |
| 34 | Time/Risk trade-off | Decision model | 1.5 | Task suitability | INTRODUCED |
| 35 | Specificity/Verifiability quadrant | Framework | 1.5 | Task suitability | INTRODUCED |

**Module 01 Total: 35 new concepts**

---

### Module 02: Claude Code Foundations

| # | Concept | Type | Section | Dependencies | First/Referenced |
|---|---------|------|---------|--------------|-----------------|
| 36 | Claude Code Architecture (runtime model) | Mental model | Arch | Claude Code (M01) | INTRODUCED |
| 37 | Interactive mode (`claude`) | Mode | 2.1 | Claude Code | REFERENCED (M01) |
| 38 | Non-interactive mode (`claude -p`) | Mode | 2.1 | Claude Code | REFERENCED (M01) |
| 39 | `--output-format` flag (json, stream-json, text) | Feature | 2.1 | Non-interactive mode | INTRODUCED |
| 40 | Pipe-friendly output | Pattern | 2.1 | Non-interactive mode | INTRODUCED |
| 41 | CLAUDE.md (detailed) | Mechanism | 2.2 | CLAUDE.md (M01) | EXTENDED |
| 42 | CLAUDE.md as standing briefing | Mental model | 2.2 | CLAUDE.md | INTRODUCED |
| 43 | Five CLAUDE.md content categories | Framework | 2.2 | CLAUDE.md | INTRODUCED |
| 44 | Architecture overview (CLAUDE.md) | Content type | 2.2 | CLAUDE.md content | INTRODUCED |
| 45 | Conventions (CLAUDE.md) | Content type | 2.2 | CLAUDE.md content | INTRODUCED |
| 46 | Non-negotiable rules (CLAUDE.md) | Content type | 2.2 | CLAUDE.md content | INTRODUCED |
| 47 | Key file paths (CLAUDE.md) | Content type | 2.2 | CLAUDE.md content | INTRODUCED |
| 48 | Decided questions (CLAUDE.md) | Content type | 2.2 | CLAUDE.md content | INTRODUCED |
| 49 | Decidable guidance principle | Principle | 2.2 | CLAUDE.md | INTRODUCED |
| 50 | CLAUDE.md anti-patterns | Anti-patterns | 2.2 | CLAUDE.md | INTRODUCED |
| 51 | Secrets in CLAUDE.md (anti-pattern) | Anti-pattern | 2.2 | CLAUDE.md | INTRODUCED |
| 52 | Aspirational vs actionable guidance | Distinction | 2.2 | Decidable guidance | INTRODUCED |
| 53 | Global vs project CLAUDE.md | Configuration | 2.2 | CLAUDE.md | INTRODUCED |
| 54 | Permissions system (settings.json) | System | 2.3 | settings.json (M01) | EXTENDED |
| 55 | Allow/Deny model | Framework | 2.3 | Permissions system | INTRODUCED |
| 56 | Permission evaluation flow | Process | 2.3 | Allow/Deny model | INTRODUCED |
| 57 | Tool permission patterns | Syntax | 2.3 | Allow/Deny model | INTRODUCED |
| 58 | Path-scoped permissions | Pattern | 2.3 | Tool permission patterns | INTRODUCED |
| 59 | Command-scoped permissions | Pattern | 2.3 | Tool permission patterns | INTRODUCED |
| 60 | Deny patterns | Pattern | 2.3 | Allow/Deny model | INTRODUCED |
| 61 | Global vs project settings.json | Configuration | 2.3 | Permissions system | INTRODUCED |
| 62 | Principle of Least Privilege | Principle | 2.3 | Permissions system | INTRODUCED |
| 63 | Approval mechanism (unspecified actions) | Mechanism | 2.3 | Allow/Deny model | INTRODUCED |
| 64 | MCP (Model Context Protocol) | Protocol | 2.4 | MCP servers (M01) | EXTENDED |
| 65 | Three MCP primitives (Tools, Resources, Prompts) | Architecture | 2.4 | MCP | INTRODUCED |
| 66 | MCP Tools | Primitive | 2.4 | Three MCP primitives | INTRODUCED |
| 67 | MCP Resources | Primitive | 2.4 | Three MCP primitives | INTRODUCED |
| 68 | MCP Prompts | Primitive | 2.4 | Three MCP primitives | INTRODUCED |
| 69 | stdio transport | Transport | 2.4 | MCP | INTRODUCED |
| 70 | Streamable HTTP transport | Transport | 2.4 | MCP | INTRODUCED |
| 71 | HTTP+SSE (deprecated) | Transport | 2.4 | MCP | INTRODUCED |
| 72 | MCP server configuration (mcpServers block) | Configuration | 2.4 | MCP, settings.json | INTRODUCED |
| 73 | MCP tool naming pattern (`mcp__{server}__{tool}`) | Syntax | 2.4 | MCP Tools | INTRODUCED |
| 74 | MCP connectivity verification | Practice | 2.4 | MCP configuration | INTRODUCED |
| 75 | MCP tool permissions | Configuration | 2.4 | Permissions system, MCP | INTRODUCED |
| 76 | Agent output layers (3 layers) | Framework | 2.5 | PRAO Loop | INTRODUCED |
| 77 | Layer 1: Thinking | Output layer | 2.5 | Agent output layers | INTRODUCED |
| 78 | Layer 2: Tool calls | Output layer | 2.5 | Agent output layers | INTRODUCED |
| 79 | Layer 3: Response | Output layer | 2.5 | Agent output layers | INTRODUCED |
| 80 | Intervention timing | Practice | 2.5 | Agent output layers | INTRODUCED |
| 81 | Approval pattern (plan-before-execute) | Pattern | 2.5 | Intervention timing | INTRODUCED |

**Module 02 Total: 46 concepts (35 new, 11 referenced/extended from M01)**

---

### Module 03: Agent Thinking

| # | Concept | Type | Section | Dependencies | First/Referenced |
|---|---------|------|---------|--------------|-----------------|
| 82 | Transparency advantage | Principle | 3.1 | PRAO Loop | INTRODUCED |
| 83 | Reasoning trace (as professional discipline) | Concept | 3.1 | Agent output layers | EXTENDED |
| 84 | Reasoning trace components | Framework | 3.2 | Reasoning trace | INTRODUCED |
| 85 | Task model (agent's understanding) | Concept | 3.2 | Perceive phase | INTRODUCED |
| 86 | Assumptions (visible in trace) | Diagnostic | 3.2 | Reasoning trace | INTRODUCED |
| 87 | Divergence point (plan vs reality) | Diagnostic | 3.2 | Reasoning trace | INTRODUCED |
| 88 | Five tool call patterns | Framework | 3.3 | Tool call, PRAO | INTRODUCED |
| 89 | Pattern 1: Read-Reason-Write (single file) | Pattern | 3.3 | Five patterns | INTRODUCED |
| 90 | Pattern 2: ReadxN-Reason-WritexN (multi-file) | Pattern | 3.3 | Five patterns | INTRODUCED |
| 91 | Pattern 3: BashxN (exploration) | Pattern | 3.3 | Five patterns | INTRODUCED |
| 92 | Pattern 4: Read-Write-Read (act-and-verify) | Pattern | 3.3 | Five patterns | INTRODUCED |
| 93 | Pattern 5: ThinkxN-no-action (stuck) | Pattern | 3.3 | Five patterns, Loop detection | INTRODUCED |
| 94 | Loop vs thoroughness distinction | Diagnostic | 3.3 | Loop detection (M01), Five patterns | EXTENDED |
| 95 | Intervention decision framework | Framework | 3.3 | Intervention timing (M02) | EXTENDED |
| 96 | Scout-plan-execute pattern | Pattern | 3.3 | Five patterns | INTRODUCED |
| 97 | Clarifying questions (feature, not bug) | Concept | 3.4 | Reasoning trace | INTRODUCED |
| 98 | Scope clarification (question type) | Category | 3.4 | Clarifying questions | INTRODUCED |
| 99 | Authority clarification (question type) | Category | 3.4 | Clarifying questions | INTRODUCED |
| 100 | Context clarification (question type) | Category | 3.4 | Clarifying questions | INTRODUCED |
| 101 | Answering clarifying questions productively | Practice | 3.4 | Clarifying questions | INTRODUCED |
| 102 | Conversation vs CLAUDE.md decision | Decision model | 3.4 | Clarifying questions, CLAUDE.md | INTRODUCED |
| 103 | Extended thinking | Capability | 3.5 | Reasoning trace | INTRODUCED |
| 104 | Thinking depth spectrum (simple/medium/hard) | Framework | 3.5 | Extended thinking | INTRODUCED |
| 105 | Thinking tokens (budget concept) | Concept | 3.5 | Extended thinking | INTRODUCED |
| 106 | Extended thinking value cases | Framework | 3.5 | Extended thinking | INTRODUCED |
| 107 | Complex architectural decisions (value case) | Use case | 3.5 | Extended thinking | INTRODUCED |
| 108 | Multi-system debugging (value case) | Use case | 3.5 | Extended thinking | INTRODUCED |
| 109 | Trade-off analysis (value case) | Use case | 3.5 | Extended thinking | INTRODUCED |
| 110 | Rejected approaches (trace value) | Concept | 3.5 | Extended thinking | INTRODUCED |
| 111 | Uncertainty points (trace value) | Concept | 3.5 | Extended thinking | INTRODUCED |
| 112 | Extended thinking overhead (cost/latency) | Concept | 3.5 | Extended thinking | INTRODUCED |

**Module 03 Total: 31 concepts (28 new, 3 extended from M01/M02)**

---

### Module 04: Prompt Engineering Depth

| # | Concept | Type | Section | Dependencies | First/Referenced |
|---|---------|------|---------|--------------|-----------------|
| 113 | GCCF pattern (Goal, Context, Constraints, Format) | Framework | 4.1 | None (assumed prior) | INTRODUCED |
| 114 | GCCF Failure Mode 1: Multiple valid interpretations | Failure mode | 4.1 | GCCF | INTRODUCED |
| 115 | GCCF Failure Mode 2: Pattern/style requirements | Failure mode | 4.1 | GCCF | INTRODUCED |
| 116 | GCCF Failure Mode 3: Output feeds another system | Failure mode | 4.1 | GCCF | INTRODUCED |
| 117 | TCEF pattern (Task, Context, Examples, Format) | Framework | 4.2 | GCCF (contrast) | INTRODUCED |
| 118 | Task element: Precise verb + measurable outcome | Component | 4.2 | TCEF | INTRODUCED |
| 119 | Precision verbs vs underspecified verbs | Principle | 4.2 | Task element | INTRODUCED |
| 120 | Context element: Five injection strategies | Component | 4.2 | TCEF | INTRODUCED |
| 121 | File Reference Context | Strategy | 4.2 | Context element | INTRODUCED |
| 122 | Pattern Context | Strategy | 4.2 | Context element | INTRODUCED |
| 123 | Constraint Context | Strategy | 4.2 | Context element | INTRODUCED |
| 124 | Audience Context | Strategy | 4.2 | Context element | INTRODUCED |
| 125 | State Context | Strategy | 4.2 | Context element | INTRODUCED |
| 126 | Context noise vs signal | Principle | 4.2 | Context element | INTRODUCED |
| 127 | Examples element: Showing beats telling | Component | 4.2 | TCEF | INTRODUCED |
| 128 | One example replaces three paragraphs rule | Principle | 4.2 | Examples element | INTRODUCED |
| 129 | Few-shot examples (for agentic tasks) | Technique | 4.2 | Examples element | INTRODUCED |
| 130 | Format element: Output schema specification | Component | 4.2 | TCEF | INTRODUCED |
| 131 | Format as contract (downstream consumer) | Principle | 4.2 | Format element | INTRODUCED |
| 132 | Progressive Context | Strategy | 4.3 | Context element | INTRODUCED |
| 133 | Context Quality Exercise (signal vs noise) | Exercise | 4.3 | Context noise vs signal | INTRODUCED |
| 134 | Scope Constraints | Category | 4.4 | Constraint Context | INTRODUCED |
| 135 | Compatibility Constraints | Category | 4.4 | Constraint Context | INTRODUCED |
| 136 | Style Constraints | Category | 4.4 | Constraint Context | INTRODUCED |
| 137 | Approval Constraints | Category | 4.4 | Constraint Context, Approval pattern (M02) | INTRODUCED |
| 138 | Meaningless constraints anti-pattern | Anti-pattern | 4.4 | Constraint categories | INTRODUCED |
| 139 | Prompt iteration as debugging discipline | Framework | 4.5 | PRAO Loop, TCEF | INTRODUCED |
| 140 | Four-step iteration loop | Process | 4.5 | Prompt iteration | INTRODUCED |
| 141 | Diagnose via PRAO phase failure | Diagnostic | 4.5 | PRAO Loop, Four-step iteration | INTRODUCED |
| 142 | Perceive failure (diagnosis) | Failure mode | 4.5 | Diagnose via PRAO | INTRODUCED |
| 143 | Reason failure (diagnosis) | Failure mode | 4.5 | Diagnose via PRAO | INTRODUCED |
| 144 | Act failure (diagnosis) | Failure mode | 4.5 | Diagnose via PRAO | INTRODUCED |
| 145 | Observe failure (diagnosis) | Failure mode | 4.5 | Diagnose via PRAO | INTRODUCED |
| 146 | One-change discipline | Principle | 4.5 | Four-step iteration | INTRODUCED |
| 147 | Hypothesis-driven prompt refinement | Practice | 4.5 | One-change discipline | INTRODUCED |
| 148 | Failure symptom -> diagnosis -> fix table | Reference | 4.5 | Prompt iteration | INTRODUCED |

**Module 04 Total: 36 concepts (all new; PRAO referenced implicitly throughout)**

---

### Module 05: MCP Architecture

| # | Concept | Type | Section | Dependencies | First/Referenced |
|---|---------|------|---------|--------------|-----------------|
| 149 | MCP as infrastructure layer | Architecture | 5.1 | MCP (M02) | EXTENDED |
| 150 | The Extension Problem (pre-MCP state) | Problem framing | 5.1 | MCP | INTRODUCED |
| 151 | USB-C analogy (standardization) | Analogy | 5.1 | Extension Problem | INTRODUCED |
| 152 | MCP standardizes four things | Framework | 5.1 | MCP | INTRODUCED |
| 153 | Discovery (tools/list, resources/list, prompts/list) | Protocol operation | 5.1 | MCP standardization | INTRODUCED |
| 154 | Invocation (tools/call, resources/read, prompts/get) | Protocol operation | 5.1 | MCP standardization | INTRODUCED |
| 155 | Schema (JSON Schema for inputs, URI for resources) | Protocol operation | 5.1 | MCP standardization | INTRODUCED |
| 156 | Transport (stdio, Streamable HTTP) | Protocol operation | 5.1 | MCP standardization | REFERENCED (M02) |
| 157 | Three MCP primitives (detailed) | Architecture | 5.2 | Three primitives (M02) | EXTENDED |
| 158 | "Tools are verbs, Resources are nouns, Prompts are templates" | Mnemonic | 5.2 | Three primitives | INTRODUCED |
| 159 | Tool: name, description, inputSchema | Schema | 5.2 | MCP Tools | EXTENDED |
| 160 | Resource: URI-addressable data objects | Schema | 5.2 | MCP Resources | EXTENDED |
| 161 | Resource URI pattern (scheme://authority/path) | Syntax | 5.2 | MCP Resources | INTRODUCED |
| 162 | Prompt: parameterized instruction template | Schema | 5.2 | MCP Prompts | EXTENDED |
| 163 | Categorization Test (Tool vs Resource vs Prompt) | Decision model | 5.2 | Three primitives | INTRODUCED |
| 164 | Tool schema structure | Schema | 5.3 | MCP Tools | EXTENDED |
| 165 | Description: written for Claude, not humans | Principle | 5.3 | Tool schema | INTRODUCED |
| 166 | Three-part tool description (action, when, returns) | Pattern | 5.3 | Tool description | INTRODUCED |
| 167 | Required vs optional fields | Design pattern | 5.3 | Tool schema | INTRODUCED |
| 168 | Enum constraints | Design pattern | 5.3 | Tool schema | INTRODUCED |
| 169 | stdio transport (detailed) | Transport | 5.4 | stdio (M02) | EXTENDED |
| 170 | Streamable HTTP transport (detailed) | Transport | 5.4 | Streamable HTTP (M02) | EXTENDED |
| 171 | SSE deprecated (formal) | Deprecation | 5.4 | HTTP+SSE (M02) | REFERENCED |
| 172 | Connection handshake (3-phase) | Protocol | 5.4 | MCP | INTRODUCED |
| 173 | Phase 1: initialize | Protocol step | 5.4 | Connection handshake | INTRODUCED |
| 174 | Phase 2: tools/list | Protocol step | 5.4 | Connection handshake | INTRODUCED |
| 175 | Phase 3: Available (connection active) | Protocol step | 5.4 | Connection handshake | INTRODUCED |
| 176 | MCP and the PRAO Loop (integration) | Integration model | 5.5 | PRAO Loop, MCP | INTRODUCED |
| 177 | Perceive phase + MCP (capability inventory) | Integration | 5.5 | PRAO-MCP | INTRODUCED |
| 178 | Reason phase + MCP (tool selection) | Integration | 5.5 | PRAO-MCP | INTRODUCED |
| 179 | Act phase + MCP (tool calls) | Integration | 5.5 | PRAO-MCP | INTRODUCED |
| 180 | Observe phase + MCP (result interpretation) | Integration | 5.5 | PRAO-MCP | INTRODUCED |
| 181 | Content array (tool result structure) | Schema | 5.5 | Act phase + MCP | INTRODUCED |
| 182 | PRAO failure modes in MCP context | Diagnostic | 5.5 | PRAO-MCP, Diagnose via PRAO (M04) | INTRODUCED |

**Module 05 Total: 34 concepts (24 new, 10 referenced/extended from M02)**

---

### Module 06: Building MCP Servers

| # | Concept | Type | Section | Dependencies | First/Referenced |
|---|---------|------|---------|--------------|-----------------|
| 183 | Design before implementation (principle) | Principle | 6.1 | MCP | INTRODUCED |
| 184 | Single Responsibility (one server per domain) | Principle | 6.1 | MCP | INTRODUCED |
| 185 | Security isolation (per-server credentials) | Principle | 6.1 | Single Responsibility | INTRODUCED |
| 186 | Tool count and Claude usability | Principle | 6.1 | MCP Tools | INTRODUCED |
| 187 | 15-tool threshold heuristic | Heuristic | 6.1 | Tool count | INTRODUCED |
| 188 | Primitive selection framework (detailed) | Decision model | 6.1 | Categorization Test (M05) | EXTENDED |
| 189 | Common misclassifications | Anti-patterns | 6.1 | Primitive selection | INTRODUCED |
| 190 | Authentication boundary design | Practice | 6.1 | MCP, Security isolation | INTRODUCED |
| 191 | Minimum permission credentials | Principle | 6.1 | Authentication boundary | INTRODUCED |
| 192 | MCP TypeScript SDK | Tool | 6.2 | MCP | INTRODUCED |
| 193 | McpServer class | API | 6.2 | TypeScript SDK | INTRODUCED |
| 194 | StdioServerTransport class | API | 6.2 | TypeScript SDK, stdio | INTRODUCED |
| 195 | Zod for schema definition | Tool | 6.2 | TypeScript SDK | INTRODUCED |
| 196 | server.tool() API | API | 6.2 | McpServer, Zod | INTRODUCED |
| 197 | server.resource() API | API | 6.2 | McpServer | INTRODUCED |
| 198 | server.prompt() API | API | 6.2 | McpServer | INTRODUCED |
| 199 | console.error for logging (not console.log) | Practice | 6.2 | stdio transport | INTRODUCED |
| 200 | stdout reserved for MCP protocol | Constraint | 6.2 | stdio transport | INTRODUCED |
| 201 | Tool description as prompt to Claude | Principle | 6.3 | Description for Claude (M05) | REFERENCED |
| 202 | Three-question tool description test | Test | 6.3 | Tool description | INTRODUCED |
| 203 | Common schema mistakes | Anti-patterns | 6.3 | Tool schema (M05) | INTRODUCED |
| 204 | Schema testing with Claude Code | Practice | 6.3 | Tool schema | INTRODUCED |
| 205 | isError flag | Protocol | 6.4 | Content array (M05) | INTRODUCED |
| 206 | Structured error result | Pattern | 6.4 | isError flag | INTRODUCED |
| 207 | Graceful errors vs exceptions | Distinction | 6.4 | Structured error result | INTRODUCED |
| 208 | Timeout handling (AbortController) | Pattern | 6.4 | Tool implementation | INTRODUCED |
| 209 | Partial results pattern | Pattern | 6.4 | Tool implementation | INTRODUCED |
| 210 | Secrets management (environment variables) | Practice | 6.5 | Authentication boundary | INTRODUCED |
| 211 | Fail-fast at startup | Principle | 6.5 | Secrets management | INTRODUCED |
| 212 | Logging every invocation | Practice | 6.5 | MCP server production | INTRODUCED |
| 213 | Semver for MCP servers | Practice | 6.5 | MCP server production | INTRODUCED |
| 214 | Breaking vs non-breaking changes | Framework | 6.5 | Semver | INTRODUCED |

**Module 06 Total: 32 concepts (29 new, 3 referenced/extended from M05)**

---

## Concept Relationship Graph (ASCII)

```
                        MODULE 01                           MODULE 02                         MODULE 03
                    THE PARADIGM SHIFT               CLAUDE CODE FOUNDATIONS              AGENT THINKING

    Three Eras -----> Agency -----> PRAO Loop -----> CLAUDE.md (detailed) -----> Reasoning Trace
         |               |            |    |              |                          |
    Era 1/2/3        Feedback     P R A O  |         Five Content            Five Tool Call
    (contrast)        Loop       / | | |   |         Categories              Patterns (88-93)
         |               |     /  |  | |   |              |                      |
    Disorientation    Tool call   |  | |   |---> Permissions -----+        Loop vs Thoroughness
    Problem              |        |  | |   |    (Allow/Deny)      |              |
         |               |        |  | |   |         |            |        Clarifying Questions
    Junior Engineer   Claude     |  | |   |    Least Privilege   |         (3 types: 98-100)
    Mental Model      Code      |  | |    |         |            |              |
         |               |      |  | |    |    Approval          |        Extended Thinking
    Failure Modes     2 Modes   |  | |    |    Mechanism          |         (103-112)
    (27-29)          (18-19)   |  | |    |                       |
         |               |     |  | |    +---> MCP (3 primitives,
    Productive       Session/   |  | |         Tools/Resources/
    Pattern (30)     Persistent |  | |         Prompts, 65-75)
         |           Context    |  | |              |
    Task             (20-21)   |  | |         Transport (69-71)
    Suitability                |  | |              |
    (31-35)                    |  | |         Agent Output
                               |  | |         Layers (76-79)
                               |  | |
                               v  v v

                        MODULE 04                          MODULE 05                      MODULE 06
                   PROMPT ENGINEERING DEPTH             MCP ARCHITECTURE              BUILDING MCP SERVERS

    GCCF -------> TCEF Pattern                  Extension Problem            Design Before Implementation
    (failure       |   |   |   |                      |                              |
    modes)         T   C   E   F                USB-C Analogy               Single Responsibility
    113-116        |   |   |   |                      |                         (184-187)
                   |   |   |   |            4 Standardizations                     |
              Precise  5 Inject  Output          (152-156)              Primitive Selection
              Verbs  Strategies  Schema               |                    Framework (188)
              (118-119) (121-125)  (130)         Three Primitives                  |
                   |       |       |              (detailed)              TypeScript SDK
                   |  Progressive  |             (157-163)               (192-200)
                   |  Context(132) |                  |                        |
                   |       |       |           Tool Schema              Tool Description
              4 Constraint    Context          (164-168)                Test (201-204)
              Categories      Quality               |                        |
              (134-137)    Exercise(133)      Connection Handshake      Error Handling
                   |                           (172-175)                (205-209)
              Prompt Iteration                      |                        |
              as Debugging (139)              MCP + PRAO Loop          Production
                   |                          Integration              Considerations
              4-Step Loop                     (176-182)                (210-214)
              (140-148)
                   |
              One-Change
              Discipline (146)

===== CRITICAL DEPENDENCY CHAINS =====

PRAO Loop (M01) ---> Tool Call Patterns (M03) ---> PRAO Failure Diagnosis (M04) ---> MCP+PRAO Integration (M05)
                                                                                            |
Agency (M01) ---> Claude Code (M01) ---> CLAUDE.md (M02) ---> Context Injection (M04)      |
                       |                      |                                              |
                       +---> Permissions (M02) ---> MCP Config (M02) ---> MCP Architecture (M05) ---> Building MCP (M06)
                       |                                                        |
                       +---> Session/Persistent Context (M01) ---> Clarifying Questions -> CLAUDE.md (M03)

GCCF (M04) ---> TCEF (M04) [contrast relationship; GCCF not introduced before M04]

Three Primitives (M02 preview) ---> Three Primitives detailed (M05) ---> Primitive Selection (M06)
```

---

## Concept Density Analysis

| Module | New Concepts | Referenced/Extended | Total Mentioned | Sections | Density (new per section) |
|--------|-------------|---------------------|-----------------|----------|--------------------------|
| M01: Paradigm Shift | 35 | 0 | 35 | 5 (1.1-1.5) | 7.0 |
| M02: Claude Code Foundations | 35 | 11 | 46 | 5 (Arch, 2.1-2.5) | 7.0 |
| M03: Agent Thinking | 28 | 3 | 31 | 5 (3.1-3.5) | 5.6 |
| M04: Prompt Engineering | 36 | 0 (implicit refs) | 36 | 5 (4.1-4.5) | 7.2 |
| M05: MCP Architecture | 24 | 10 | 34 | 5 (5.1-5.5) | 4.8 |
| M06: Building MCP Servers | 29 | 3 | 32 | 5 (6.1-6.5) | 5.8 |

**Totals across M01-M06: 187 new concepts, 27 references/extensions = 214 total concept mentions**

### Density Observations

- **Highest density**: Module 04 (7.2 new concepts per section). This is the most concept-dense module, introducing an entire prompt engineering framework (TCEF) plus iteration methodology.
- **Second highest**: Modules 01 and 02 (both 7.0). Appropriate -- these are foundation modules that must establish a large vocabulary.
- **Lowest density**: Module 05 (4.8). This module builds heavily on prior concepts from M02, extending rather than introducing. This feels appropriate for a module that deepens existing understanding.
- **M03 is notably lower** (5.6) than its neighbors. This reflects its nature as an observational/interpretive module rather than a concept-introduction module. Many of its concepts are refinements of M01/M02 concepts.

---

## Dependency Chain Analysis

### Critical Path (most-depended-upon concepts)

These concepts are prerequisites for the largest number of downstream concepts:

| Rank | Concept | Module | Downstream Count | Downstream Scope |
|------|---------|--------|-----------------|------------------|
| 1 | **PRAO Loop** | M01 | 40+ | M01-M06 (used in every module) |
| 2 | **Tool call** | M01 | 30+ | M01-M06 (foundation of all agent action) |
| 3 | **CLAUDE.md** | M01/M02 | 20+ | M02-M04 (context, conventions, decisions) |
| 4 | **Three MCP Primitives** | M02/M05 | 25+ | M02, M05, M06 |
| 5 | **Agency** | M01 | 15+ | M01-M03 (foundational concept) |
| 6 | **Permissions system** | M02 | 10+ | M02, M05, M06 |
| 7 | **TCEF pattern** | M04 | 10+ | M04 (all sub-concepts depend on it) |
| 8 | **Reasoning trace** | M02/M03 | 10+ | M03 (all M03 concepts depend on it) |

### Bottleneck Concepts

These are concepts where too many downstream concepts depend on a single concept without alternatives or redundancy:

1. **PRAO Loop** -- Every module references it. If a learner does not internalize PRAO in M01, they will struggle in every subsequent module. The course does mitigate this with repeated worked examples, but there is no alternative framework offered. **Risk: moderate** (mitigated by extensive examples).

2. **Three MCP Primitives** -- M05 and M06 depend entirely on understanding the Tools/Resources/Prompts trichotomy. If a learner confuses these (e.g., exposing everything as Tools), M06 design exercises will fail. **Risk: moderate** (mitigated by the Categorization Test in M05).

3. **TCEF pattern** -- All of M04's sub-concepts (context injection strategies, constraint categories, iteration loop) are scoped within TCEF. If a learner does not grasp TCEF, the entire prompt engineering module collapses. **Risk: low** (TCEF is introduced with clear contrast to GCCF and extensive examples).

### Forward References (concepts used before formally introduced)

| Concept | Used In | Formally Introduced In | Gap |
|---------|---------|----------------------|-----|
| CLAUDE.md | M01 s1.3 (mentioned as "persistent briefing") | M02 s2.2 (detailed treatment) | 1 section gap -- acceptable, explicitly flagged as preview |
| MCP servers | M01 s1.3 (mentioned as "extending capabilities") | M02 s2.4 (first real treatment) | 1 section gap -- acceptable, explicitly flagged as preview |
| settings.json | M01 s1.3 (mentioned as "permission config") | M02 s2.3 (detailed treatment) | 1 section gap -- acceptable |
| GCCF pattern | M04 s4.1 (introduced as assumed prior knowledge) | Never formally taught in M01-M03 | **GAP** -- GCCF is treated as known but never formally introduced |
| Session resume (`--continue`, `--resume`) | M01 s1.3 (mentioned) | Never detailed further | Mentioned but not elaborated in any module |

### Orphan Concepts (introduced but never reused)

| Concept | Module | Observation |
|---------|--------|-------------|
| ReAct framing | M01 s1.2 | Referenced as the academic basis for PRAO. Not used again after introduction. Acceptable -- it's a citation, not a teaching concept. |
| Disorientation Problem | M01 s1.1 | Named once, never referenced again. Could be referenced in M03 when discussing intervention decisions. |
| Junior engineer mental model | M01 s1.3 | Powerful analogy, introduced once, never reinforced. Could be referenced in M02 (when configuring permissions) or M03 (when deciding intervention). |
| USB-C analogy | M05 s5.1 | Used once for motivation, never revisited. Acceptable for a motivational analogy. |
| `--output-format` flag | M02 s2.1 | Introduced but not used in any lab connection or later module reference. |
| Audience Context (injection strategy) | M04 s4.2 | Listed as one of five strategies but has no worked example and is noted as "less common in pure engineering tasks." |
| State Context (injection strategy) | M04 s4.2 | Listed as one of five strategies with minimal elaboration compared to File Reference, Pattern, and Constraint Context. |
| Progressive Context | M04 s4.3 | Introduced as a strategy but never demonstrated with a worked example in the module. |

---

## Concept Gaps Between Modules

### Gap 1: M01 -> M02 (PRAO to Configuration)
**Quality**: Smooth. M02 explicitly opens by saying "Understanding the paradigm is necessary but not sufficient" and connects PRAO to Claude Code's configuration. The bridge concept is "PRAO gives you the model; CLAUDE.md/permissions give you the control." No gap detected.

### Gap 2: M02 -> M03 (Configuration to Trace Reading)
**Quality**: Smooth. M03 opens with transparency as the bridge: "The most significant operational advantage of Claude Code is transparency." This connects naturally from M02's agent output layers. No gap detected.

### Gap 3: M03 -> M04 (Trace Reading to Prompt Engineering)
**Quality**: Minor gap. M03 ends with the conceptual core complete (modules 01-03) and M04 opens with GCCF, which is **assumed prior knowledge never formally taught**. A learner encountering GCCF for the first time in M04 s4.1 must absorb both GCCF and its limitations simultaneously. The module does explain GCCF before contrasting it with TCEF, but the transition from "reading traces" to "writing prompts" could be smoother.

**Missing bridge concept**: "Now that you can READ what the agent does (M03), you need to learn to WRITE effective instructions (M04). The quality of what you read in traces is directly determined by the quality of what you write in prompts."

### Gap 4: M04 -> M05 (Prompt Engineering to MCP Architecture)
**Quality**: Moderate gap. M04 is deeply focused on prompt-level engineering (TCEF, iteration). M05 jumps to protocol architecture. The connection exists (MCP tools are a form of structured input/output that TCEF principles apply to), but it is **never made explicit**. A learner might wonder: "What does prompt engineering have to do with MCP architecture?"

**Missing bridge concept**: "TCEF teaches you to write instructions for Claude. MCP teaches you to give Claude access to new capabilities. Tool descriptions in MCP ARE a form of prompt engineering -- they are TCEF-structured instructions embedded in the protocol."

### Gap 5: M05 -> M06 (MCP Architecture to Building MCP Servers)
**Quality**: Excellent. M06 explicitly opens with "Module 05 established the architecture... This module translates that architectural understanding into implementation practice." The design-before-implementation principle (M06) directly builds on the categorization test (M05). No gap detected.

---

## Worked Example Coverage

| Concept | Has Worked Example? | Module | Quality |
|---------|-------------------|--------|---------|
| PRAO Loop | Yes -- "Add TypeScript types to src/utils.ts" | M01 | Excellent -- full 2-cycle trace with tool calls |
| Three Eras comparison | Yes -- "Same task, different paradigms" trace | M01 | Excellent -- side-by-side Era 2 vs Era 3 |
| Productive collaboration pattern | Yes -- Prompt Clinic exercise | M01 | Good -- compare prompt A vs B |
| Task suitability | Yes -- specificity/verifiability quadrant | M01 | Good -- categorized examples |
| CLAUDE.md content | Yes -- "How CLAUDE.md shapes agent decisions" trace | M02 | Excellent -- shows Zod selection from CLAUDE.md |
| Permissions (allow/deny) | Yes -- "Permission boundaries in live session" trace | M02 | Excellent -- shows blocked rm command |
| MCP tool usage | Yes -- "How many users signed up" database query trace | M02 | Excellent -- full MCP query with follow-up |
| Five tool call patterns | Yes -- each pattern has code-block example | M03 | Good -- but patterns 1-4 use pseudo-code, not full traces |
| Loop vs thoroughness | Yes -- compare sequence A vs B | M03 | Good -- quick drill format |
| Extended thinking | Yes -- standard vs extended trace comparison | M03 | Adequate -- brief comparison, no full trace |
| Clarifying questions (3 types) | Yes -- example of each type | M03 | Good -- realistic dialogue examples |
| GCCF failure modes | Yes -- three failure scenarios | M04 | Good -- each failure mode has a concrete prompt |
| TCEF pattern | Yes -- Task element comparison (imprecise vs precise) | M04 | Good |
| Context injection strategies | Partial -- File Ref and Pattern have examples, Audience/State lack them | M04 | Mixed |
| Constraint categories | Yes -- each has a code-block example | M04 | Good |
| Prompt iteration loop | Yes -- failure symptom -> diagnosis -> fix table | M04 | Good -- tabular reference |
| MCP primitives (Tool/Resource/Prompt) | Yes -- each has JSON schema example | M05 | Excellent |
| Tool schema reading | Yes -- complete search_issues schema | M05 | Excellent |
| Transport configuration | Yes -- both stdio and HTTP config examples | M05 | Excellent |
| Connection handshake | No -- described textually, no trace or diagram | M05 | **Gap** -- would benefit from an example trace |
| MCP + PRAO integration | Yes -- full 5-step trace for "find open issues" | M05 | Excellent |
| server.tool() implementation | Yes -- complete TypeScript code | M06 | Excellent |
| server.resource() implementation | Yes -- complete TypeScript code | M06 | Excellent |
| server.prompt() implementation | Yes -- complete TypeScript code | M06 | Excellent |
| Error handling (isError) | Yes -- TypeScript code with try/catch | M06 | Excellent |
| Timeout handling | Yes -- AbortController example | M06 | Good |
| Partial results | Yes -- TypeScript code example | M06 | Good |
| Production logging | Yes -- complete logging pattern | M06 | Good |
| Semver for MCP | Yes -- package.json + server constructor | M06 | Good |
| Progressive Context | No | M04 | **Gap** -- described but never demonstrated |
| One-change discipline | No -- stated as principle but not demonstrated with before/after | M04 | **Gap** -- would benefit from a multi-iteration trace |
| GCCF pattern itself | No -- treated as assumed knowledge | M04 | **Gap** -- no formal example of a well-formed GCCF prompt |

---

## Meta-Observation (duplicate)

### Observation about the observation quality

**Which modules had the clearest concept structure?**

Module 05 (MCP Architecture) and Module 06 (Building MCP Servers) had the clearest concept structures. Both modules have well-defined ontologies: three primitives, two transports, three handshake phases, four design decisions. The concepts snap into a taxonomy naturally. Module 01 (Paradigm Shift) also has strong structure via the Three Eras and PRAO framework, though it covers more ground.

**Where were concepts implicit rather than explicit?**

- The GCCF pattern in Module 04 is treated as assumed prior knowledge. It is described and contrasted with TCEF, but there is no formal moment of "here is what GCCF is" before jumping to "here is why it fails." A learner without prior prompt engineering training might be confused.
- The concept of "context window" and "token limits" is implicit throughout but never defined. Module 04's discussion of context noise assumes the learner understands why excess context is costly.
- The relationship between TCEF's format element and MCP's tool schema is implicit. Tool descriptions are a form of TCEF applied to protocol design, but this connection is never drawn.

**Were any concepts used before being formally introduced?**

Yes -- CLAUDE.md, MCP servers, and settings.json are all mentioned in M01 before their formal treatment in M02. This is handled well via explicit preview flagging ("we'll cover this extensively in Module 02"). The GCCF pattern in M04 is the most notable case of assumed-but-unintroduced knowledge.

**Are there "orphan concepts" that appear once and never recur?**

The most significant orphans are:
1. **Junior engineer mental model** -- A powerful analogy that deserves reinforcement in M02 (configuring constraints = managing a junior's permissions) and M03 (reviewing traces = reviewing a junior's work).
2. **Progressive Context** -- Introduced as a strategy in M04 but never demonstrated.
3. **Audience Context and State Context** -- Two of the five context injection strategies that receive minimal treatment compared to File Reference, Pattern, and Constraint.

**Overall structural assessment:**

The concept architecture across M01-M06 is strong. The PRAO Loop serves as an effective spine that connects all modules. The three-module conceptual core (M01-M03) and two-module MCP depth (M05-M06) are well-structured. Module 04 (Prompt Engineering) sits somewhat independently -- it builds on PRAO but introduces TCEF as a largely self-contained framework. The main structural weakness is the M04-M05 transition, where the conceptual thread from prompt engineering to protocol architecture is not explicitly drawn.

The concept count per module is remarkably consistent (31-36 per module after accounting for references), suggesting good pacing. The density per section is highest in M04, which may warrant attention -- it packs 36 concepts into 5 sections with high information density, and some concepts (Progressive Context, Audience Context, State Context) receive insufficient treatment as a result.

**Recommendations for concept flow improvement:**

1. Add a bridge paragraph at the end of M04 connecting TCEF's format element to MCP tool schemas.
2. Formally introduce GCCF in M01 or early M04 before contrasting it with TCEF.
3. Reinforce the "junior engineer" mental model in M02 and M03.
4. Add a worked example for the connection handshake in M05.
5. Add a multi-iteration worked example demonstrating the one-change discipline in M04.
6. Consider either expanding Audience/State Context coverage or reducing the framework to "three primary + two supplementary" strategies rather than treating all five equally.
