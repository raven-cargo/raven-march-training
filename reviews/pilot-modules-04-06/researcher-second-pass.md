I can't write files in don't-ask mode. Here's the complete audit output directly:

---

# Factual Accuracy Audit: Modules 04–06

**Date**: 2026-03-16  
**Scope**: Modules 04 (Prompt Engineering Depth), 05 (MCP Architecture), 06 (Building MCP Servers)  
**Method**: Three parallel deep-researcher agents verified 27 claims against primary sources  
**Sources checked**: Anthropic Claude Code docs, MCP specification, MCP TypeScript SDK (GitHub + npm), arXiv

---

## Summary

| Module | Checked | Confirmed | Inaccurate | Unverifiable |
|--------|---------|-----------|------------|--------------|
| **04** | 7 | 4 | 2 | 1 |
| **05** | 10 | 8 | 2 | 0 |
| **06** | 10 | 10 | 0 | 0 |
| **Total** | **27** | **22** | **4** | **1** |

---

## Defects Found (4 inaccuracies + 1 unverifiable)

### DEFECT-05-01 — CRITICAL: Wrong config file name for Claude Code

**Location**: `05-mcp-architecture.md`, line 289  
**Claim**: *"Configuration in Claude Code's `claude_desktop_config.json` or project-level settings"*  
**Finding**: `claude_desktop_config.json` is the config file for **Claude Desktop** (the Electron app), NOT Claude Code (the CLI). Claude Code uses:
- **CLI**: `claude mcp add <name> ...` (recommended)
- **Project scope**: `.mcp.json` at repo root (shareable via VCS)
- **User scope**: `~/.claude.json` (global, private)

**Source**: [Claude Code MCP docs](https://docs.anthropic.com/en/docs/claude-code/mcp)

**Corrected wording**:
> Configuration via the Claude Code CLI or project-level `.mcp.json`:

Update the following JSON block to show `.mcp.json` format with a comment:
```json
// .mcp.json (project root) or ~/.claude.json (user-level)
{
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
}
```

---

### DEFECT-04-01 — HIGH: TCEF/GCCF presented as established frameworks

**Location**: `04-prompt-engineering-depth.md`, lines 10–14, 29–31  
**Claim**: Introduces "GCCF" and "TCEF" as named prompt engineering patterns, implying industry provenance.  
**Finding**: Neither acronym appears in Anthropic's official prompt engineering docs. Anthropic describes techniques (be clear/direct, multishot prompting, chain of thought, extended thinking) but defines **no acronym-based frameworks**. TCEF and GCCF are course-invented pedagogical constructs.

**Source**: [Anthropic Prompt Engineering Guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)

**Corrected wording** (line 12–14):
> This module introduces the TCEF pattern — Task + Context + Examples + Format — as a structured framework developed for this course for professional-grade agentic prompt engineering. TCEF synthesizes principles from Anthropic's prompt engineering documentation and established few-shot prompting research (Brown et al., 2020).

Similarly GCCF (line 29–31):
> The GCCF pattern — Goal, Context, Constraints, Format — is a simplified mental scaffold used in this course to represent the most common ad-hoc prompting structure.

---

### DEFECT-05-02 — MEDIUM: `claude mcp add` CLI syntax has flags in wrong position

**Location**: `05-mcp-architecture.md`, lines 315–318  
**Claim**:
```bash
claude mcp add my-tracker node /path/to/tracker-mcp/index.js \
  -e TRACKER_API_KEY \
  -e TRACKER_BASE_URL=https://tracker.internal.example.com
```
**Finding**: Per Claude Code docs and confirmed issues (anthropics/claude-code#18722), flags must precede the server name, and `--` separator is required before command+args.

**Source**: [Claude Code MCP docs](https://docs.anthropic.com/en/docs/claude-code/mcp)

**Corrected wording**:
```bash
# Add a local MCP server
claude mcp add \
  -e TRACKER_API_KEY \
  -e TRACKER_BASE_URL=https://tracker.internal.example.com \
  my-tracker -- node /path/to/tracker-mcp/index.js
```

---

### DEFECT-05-03 — MEDIUM: Handshake missing `notifications/initialized` step

**Location**: `05-mcp-architecture.md`, lines 362–375  
**Claim**: Three-phase handshake: (1) `initialize`, (2) `tools/list` etc., (3) Available  
**Finding**: The MCP lifecycle spec requires a `notifications/initialized` notification from client to server after the `initialize` response and before any other requests. The server must not accept non-`initialize` requests until receiving this notification. The course omits this mandatory step.

**Source**: [MCP Lifecycle spec](https://spec.modelcontextprotocol.io/specification/basic/lifecycle/)

**Corrected wording** (replace the three phases with four):

> **Phase 1: initialize** — Client sends `initialize` with protocol version and capabilities. Server responds with its version, capabilities, and info.
> 
> **Phase 2: initialized notification** — Client sends `notifications/initialized` to confirm it processed the server's capabilities. The server will not accept other requests until it receives this notification.
> 
> **Phase 3: Discovery** — Client calls `tools/list`, `resources/list`, and `prompts/list`. Server returns all schemas.
> 
> **Phase 4: Active** — Connection is fully active. Claude can call tools, read resources, and request prompts.

---

### DEFECT-04-02 — LOW: "The principle is" implies external authority

**Location**: `04-prompt-engineering-depth.md`, lines 104–105  
**Claim**: *"The principle is: **one concrete example replaces three paragraphs of abstract rules**."*  
**Finding**: This formulation doesn't appear in Anthropic docs. It's a course-authored aphorism (pedagogically sound, supported by Brown et al. 2020).

**Corrected wording**:
> A useful working principle for this course: **one concrete example replaces three paragraphs of abstract rules**.

---

## All Confirmed Claims (22 of 27)

### Module 04
| Claim | Verdict | Source |
|-------|---------|--------|
| `@filename` syntax for file context in Claude Code | ✅ | [Claude Code docs](https://docs.anthropic.com/en/docs/claude-code) |
| Brown et al. (2020): NeurIPS 33, arXiv 2005.14165 | ✅ | [arXiv](https://arxiv.org/abs/2005.14165) |
| Wei et al. (2022): NeurIPS 35, arXiv 2201.11903 | ✅ | [arXiv](https://arxiv.org/abs/2201.11903) |
| Brown et al. "introduced few-shot prompting" | ✅ | [arXiv](https://arxiv.org/abs/2005.14165) |

### Module 05
| Claim | Verdict | Source |
|-------|---------|--------|
| SSE deprecated 2025-03-26 | ✅ | [MCP Transports spec](https://spec.modelcontextprotocol.io/specification/basic/transports/) |
| Two transports: stdio + Streamable HTTP | ✅ | MCP Transports spec |
| Three primitives: Tools, Resources, Prompts | ✅ | [MCP Server spec](https://spec.modelcontextprotocol.io/specification/server/) |
| Control: Tools=model, Resources=app, Prompts=user | ✅ | MCP Server spec |
| `tools/list`, `resources/list`, `prompts/list` endpoint names | ✅ | MCP Server spec |
| `tools/call`, `resources/read`, `prompts/get` endpoint names | ✅ | MCP Server spec |
| Tool result: content array + optional `isError` | ✅ | MCP Server spec |
| Changes require new session | ✅ | [Claude Code MCP docs](https://docs.anthropic.com/en/docs/claude-code/mcp) |

### Module 06
| Claim | Verdict | Source |
|-------|---------|--------|
| Import `@modelcontextprotocol/sdk/server/mcp.js` | ✅ | [SDK README](https://github.com/modelcontextprotocol/typescript-sdk) |
| Import `@modelcontextprotocol/sdk/server/stdio.js` | ✅ | SDK README |
| `McpServer({ name, version, description })` constructor | ✅ | [SDK docs](https://github.com/modelcontextprotocol/typescript-sdk/blob/main/docs/server.md) |
| `server.tool(name, desc, schema, handler)` 4-arg | ✅ | SDK docs |
| `server.resource(name, uri, desc, handler)` 4-arg | ✅ | SDK docs |
| `server.prompt(name, desc, schema, handler)` 4-arg | ✅ | SDK docs |
| Zod auto-converts to JSON Schema | ✅ | [npm](https://www.npmjs.com/package/@modelcontextprotocol/sdk) |
| `StdioServerTransport()` + `server.connect()` | ✅ | SDK README |
| Tool returns `{ content: [{ type, text }] }` | ✅ | SDK docs |
| Resource returns `{ contents: [{ uri, mimeType, text }] }` (plural) | ✅ | SDK docs |

---

## Action Plan

| Priority | ID | Module | Fix | Lines |
|----------|-----|--------|-----|-------|
| **CRITICAL** | DEFECT-05-01 | 05 | Replace `claude_desktop_config.json` with `.mcp.json` / `claude mcp add` | 289–304 |
| **HIGH** | DEFECT-04-01 | 04 | Label TCEF/GCCF as course-defined frameworks | 12–14, 29–31 |
| **MEDIUM** | DEFECT-05-02 | 05 | Fix `claude mcp add` flag ordering + add `--` separator | 315–318 |
| **MEDIUM** | DEFECT-05-03 | 05 | Add `notifications/initialized` to handshake (3→4 phases) | 362–375 |
| **LOW** | DEFECT-04-02 | 04 | Soften "The principle is" to "A useful working principle" | 104–105 |

---

**Note**: Module 06 (Building MCP Servers) passed with zero defects — all 10 SDK claims verified against the TypeScript SDK source and official guides. The code examples are production-accurate for the v1 convenience API. An observation: the SDK main branch is introducing `registerTool()`/`registerResource()`/`registerPrompt()` as the v2 API; the v1 methods remain backwards-compatible.

I attempted to write this to `docs/meta/FACTUAL-AUDIT-MODULES-04-06.md` but file writes are blocked in the current permission mode. To save this audit, please either grant write permission or copy the output above.
