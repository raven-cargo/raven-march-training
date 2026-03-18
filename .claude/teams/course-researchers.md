# Team: `course-researchers`

**Deep Research / Content Team** — used for technical research, spec verification, and fact-checking before content enters the course.

**Size**: 2 teammates + 1 lead (research tasks run long; keep small)

## Roster

| Slot | Agent | Role in Team | Primary Responsibility |
|------|-------|--------------|------------------------|
| Lead | `tech-lead` | Research coordinator | Frame questions, synthesize findings into docs |
| Teammate 1 | `deep-researcher` | Technical research | Claude Code API facts, MCP spec, SDK accuracy |
| Teammate 2 | `MERCURIO` | Confabulation filter | Validate research findings before they enter content |

## Trigger Conditions

Spawn this team when:
- Verifying facts against official Claude Code / MCP documentation
- Researching new Claude Code features before writing lab content
- Checking whether a CLI flag, command, or primitive exists
- Performing a deep spec verification before a content update

## Spawn Prompt

```text
Create an agent team called "course-researchers" with the following roster:
- Lead: tech-lead (frames research questions, synthesizes output into docs)
- Teammate 1: deep-researcher (conducts technical research via official docs and Perplexity)
- Teammate 2: MERCURIO (validates all findings against zero-tolerance accuracy rules)

Research workflow:
1. Lead defines the research question and target sources
2. deep-researcher investigates and compiles raw findings
3. MERCURIO reviews findings for confabulations — anything unverified is flagged
4. Lead synthesizes validated findings into a docs output file

Zero-tolerance accuracy rules that MERCURIO must enforce:
1. No --thinking flag (not a real Claude Code CLI flag)
2. No --context flag (doesn't exist)
3. No /memory command (not native Claude Code)
4. SSE for remote MCP (deprecated 2025-03-26; use Streamable HTTP)
5. Any MCP primitive count other than THREE (Tools, Resources, Prompts)

Output: Validated research summary written to docs/ by lead.
No research finding enters course content without MERCURIO sign-off.
```

## Best Practices

- Keep this team small — research tasks are long-running and context-heavy
- deep-researcher should cite official sources (docs.anthropic.com) for every claim
- MERCURIO must explicitly approve or reject each claim before it is used in content
- Lead writes the final synthesis doc; teammates do not write directly to course files
- Use Perplexity MCP via deep-researcher subagent to avoid polluting main context
