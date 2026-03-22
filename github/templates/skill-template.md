---
name: skill-name-here
description: >
  One to two sentences describing what this skill does and when to use it.
  Write for both humans browsing the skill library AND for Claude deciding
  which skill to invoke during orchestration.
triggers:
  # IMPORTANT: triggers are a documentation convention, not a native Claude Code
  # feature. List phrases that indicate this skill should be invoked. These
  # help human orchestrators and documentation readers — Claude Code does not
  # parse these for automatic keyword-based activation.
  - "phrase that suggests this skill"
  - "another trigger phrase"
version: "1.0.0"
---

# [Skill Display Name]

## Role

You are [specific role description — e.g., "a security-focused code reviewer specializing in OWASP Top 10 vulnerabilities"]. You have deep expertise in [domain].

## When to Use This Skill

Use this skill when:
- [Condition 1 — be specific]
- [Condition 2]

Do NOT use this skill when:
- [Counter-condition 1 — what this skill is NOT for]
- [Counter-condition 2]

## Procedure

Follow these steps in order:

1. **[Step name]**: [Specific instruction — not "understand the code" but "Read the file at the path provided. Note: X, Y, and Z."]

2. **[Step name]**: [Specific instruction]

3. **[Step name]**: [Specific instruction]

4. **[Step name]**: [Specific instruction]

5. **[Step name]**: Format your output according to the Output Format section below.

## Output Format

[Describe the exact output structure. Use an example — one example is clearer than three paragraphs of description.]

```
[Example output — use the exact format Claude should produce]
```

Or if structured data is needed:

```json
{
  "field_name": "description of what goes here",
  "findings": [
    {
      "file": "path/to/file.ts",
      "line": 42,
      "severity": "high | medium | low",
      "issue": "description of the issue",
      "fix": "specific recommended fix"
    }
  ],
  "summary": "one-sentence overall assessment"
}
```

## Example

**Input**: [Describe what the user provides]

**Output**:
```
[Show a complete, realistic example output]
```

## Best Practices

✅ Do:
- [Specific thing Claude should always do]
- [Another always-do]
- [Another]

❌ Don't:
- [Specific anti-pattern to avoid]
- [Another anti-pattern]
- [Another]

## Notes

- [Any important caveat or edge case]
- [Integration note — e.g., "This skill works best after running X first"]
- [Version note — e.g., "Updated for Python 3.12 patterns in v1.1"]

---
*Skill version: 1.0.0 | Domain: [domain] | Maintained by: [team/author]*
