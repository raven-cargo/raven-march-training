# [Command Display Name]
#
# Slash command: /[command-name]
# Usage: /[command-name] [optional arguments]
#
# NAMING WARNING: Never use reserved names: plugin, help, clear, config, mcp
# These shadow Claude Code's built-in commands and break native functionality.
# Use descriptive, unique names instead: /my-review, /project-config, /run-checks
#
# File location:
#   ~/.claude/commands/[command-name].md  (global — available in all projects)
#   .claude/commands/[command-name].md    (project — available in this project only)

## What This Command Does

[One sentence: what this command accomplishes when invoked.]

## Usage

```
/[command-name]
/[command-name] [argument]
/[command-name] [argument1] [argument2]
```

**Arguments**: `$ARGUMENTS` — [describe what arguments are accepted, or "No arguments — runs with no input"]

## Steps

[The instructions Claude follows when this command is invoked. Be explicit and ordered.]

1. [First thing Claude does — e.g., "Read the current git diff using `git diff HEAD`"]

2. [Second thing — e.g., "Use the Skill tool to invoke the `[skill-name]` skill with the diff as context"]

3. [Third thing — e.g., "Output the result in the format specified by the skill"]

## Skill Invocations

This command uses the following skills (loaded via the `Skill` tool):

- `[skill-name]` — [what this skill contributes]
- `[skill-name]` — [what this skill contributes] (optional, used when [condition])

## Example

**Invocation**: `/[command-name] [example argument]`

**What happens**:
1. [Concrete step 1]
2. [Concrete step 2]
3. [Concrete output description]

**Expected output**:
```
[Show realistic example output]
```

## When to Use

- [Situation 1 — be specific about when this is the right command]
- [Situation 2]

## When NOT to Use

- [Counter-situation — what this command is not for]
- [Another counter-situation]

## Related Commands

- `/[related-command]` — [brief description of the related command and how it differs]
- `/[related-command]` — [brief description]

---
*Command version: 1.0.0 | Related skill: [skill-name] | Part of: [workflow or category]*
