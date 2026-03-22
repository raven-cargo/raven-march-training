# Anti-Confabulation Validation Prompt Template
# ─────────────────────────────────────────────────────────────────────────────
# Reusable prompt spec for the technical accuracy validation pass.
# Run this as the FINAL gate before any course content is published or
# uploaded to NotebookLM / LMS.
#
# Agent type: Explore (read-only, fast, thorough)
# run_in_background: true
# Proven: 2026-03-15 (21 files, 34 tool uses, returned PASS)
# ─────────────────────────────────────────────────────────────────────────────

---

## PROMPT TEMPLATE (copy from here)

---

You are running the anti-confabulation validation pass for the [COURSE_NAME] course. Your job is to read all lab HTML files and module markdown documents, then check every technical claim against the known-correct behavior of [PRIMARY_TECHNOLOGY] and [SECONDARY_TECHNOLOGY].

**Files to validate:**

Labs (HTML):
[LIST ALL LAB FILE PATHS — one per line]

Modules (Markdown):
[LIST ALL MODULE FILE PATHS — one per line]

---

## Checks to Run

Use the Grep tool for each pattern explicitly. Do not assume files are clean without checking.

### Check 1: Fabricated CLI flags
Grep for: `--thinking`, `--context` as Claude Code CLI flags
- These do NOT exist as Claude Code CLI flags
- Extended thinking is a model-level API parameter, not a CLI flag
- Flag any mention that implies these are valid command-line arguments

### Check 2: Fabricated slash commands
Grep for: `/memory`, `/remember`, `/forget` as native commands
- These are NOT native Claude Code commands
- Flag any claim that `/memory` or similar is built into Claude Code

### Check 3: MCP transport — SSE deprecation
Grep for: `sse`, `SSE`, `server-sent events`
- SSE was deprecated in MCP spec on [DEPRECATION_DATE]
- SSE should ONLY appear with an explicit deprecation warning
- Current remote transport: Streamable HTTP
- Flag any reference to SSE as current or recommended

### Check 4: MCP primitive count
Grep for: any claim of 4+ MCP primitives, or any primitive name beyond Tools/Resources/Prompts
- MCP has exactly THREE primitives: Tools, Resources, Prompts
- Flag any fourth category (e.g., "Capabilities", "Schemas", "Events")

### Check 5: settings.json structure
Grep for: `"permissions"` in settings.json examples
- Correct structure: `{"permissions": {"allow": [...], "deny": [...]}}`
- Flag: nested "level", "mode", "role" keys
- Flag: "allow" or "deny" at top level without wrapping in "permissions"

### Check 6: Convention vs native feature
Grep for: `triggers` in skill YAML examples
- `triggers` is [PROJECT_NAME] convention, NOT a native Claude Code feature
- Flag any example that presents triggers as causing automatic keyword activation

### Check 7: CLAUDE.md as command
Grep for: any slash command that loads CLAUDE.md
- CLAUDE.md is a FILE read at session start — never a slash command
- Flag: `/claude-md`, `/context`, or any command claimed to "load project context"

### Check 8: HTML accessibility
Grep for nested interactive elements in lab HTML files
- Pattern: `<a` followed by `<button` within the same interactive component
- Flag any `<a><button>` nesting (breaks accessibility)
- Correct pattern: `<a class="btn">` for link-buttons

### Check 9: [TECHNOLOGY_SPECIFIC_CHECK]
[Add domain-specific checks relevant to the course topic]
Grep for: [pattern]
- Correct behavior: [what it should say]
- Flag: [what would be wrong]

---

## For Each Error Found

Record:
- File path (relative)
- Approximate line number
- What the content says (quote it)
- Why it is wrong
- What the corrected version should say

---

## Output

Write a validation report to `[OUTPUT_PATH]/validation-report.md` with this structure:

```markdown
# Anti-Confabulation Validation Report
**Date**: [DATE]
**Files checked**: [N] ([N_LABS] labs + [N_MODULES] modules)
**Validator**: Automated grep pass

## Summary
| Metric | Result |
|--------|--------|
| Total errors found | N |
| Files with errors | [list or "None"] |
| Files clean | [N or "All"] |
| Verdict | PASS / FAIL |

## Errors Found (if any)

### [filename]
- **Line ~N**: "[what it says]"
  **Error**: [why wrong]
  **Fix**: [what it should say]

## Clean Files
[List all files with zero errors]

## Verdict
PASS — Zero confabulations detected.
  OR
FAIL — N errors require correction before upload.
```

If PASS: "Ready for [DESTINATION] upload."
If FAIL: "Fix all errors above before proceeding."

---
*Template version: 1.0.0 | Proven 2026-03-15 | 8 check patterns for Claude Code + MCP courses*

## Customization Notes

### Adding checks for other technologies
For a Next.js course, add:
- Check for App Router vs Pages Router confusion
- Check for correct `use client` / `use server` directive placement

For a FastAPI course, add:
- Check for correct Pydantic v2 syntax (model_validator, not validator)
- Check for async/await correctness

For any API course, add:
- Check that all code examples use current SDK version syntax
- Check that deprecated methods are flagged as deprecated

### Adjusting severity
Errors are currently all-or-nothing (PASS/FAIL). For a graduated system:
- CRITICAL: Incorrect technical claims that would break learner's code
- HIGH: Conceptual errors that create misconceptions
- MEDIUM: Outdated but functional information
- LOW: Style/convention issues

### Integrating with CI
To run in automated pipelines:
```bash
# Run validation agent before NotebookLM upload
claude -p "$(cat docs/meta/prompts/anti-confabulation-validation-template.md)" \
  --no-interactive \
  --output-format json > validation-result.json

# Check verdict
jq '.verdict' validation-result.json
```
