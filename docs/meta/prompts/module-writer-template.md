# Module Writer Template
## Agentic AI Engineering — 3-Day Intensive Course

**Purpose**: Use this template to write curriculum module source documents.
These files are uploaded to NotebookLM as source material — they are NOT
student-facing documents. NotebookLM generates the actual student artifacts
(video scripts, slide decks, podcasts, flashcards) from this source text.
Write for depth and completeness, not for presentation.

---

## How to Use This Template

1. Fill in all `[PLACEHOLDER]` values before issuing the prompt.
2. Paste the completed prompt into a fresh Claude conversation (no prior context).
3. The output should be ready for NotebookLM upload without editing.
4. Target: 3,000–5,000 words. Do not truncate to hit a lower count.

---

## Filled-In Placeholders (Complete Before Prompting)

| Placeholder | Value |
|---|---|
| `[MODULE_NUMBER]` | e.g., `05` |
| `[MODULE_TITLE]` | e.g., `MCP Architecture` |
| `[CORE_CONCEPT]` | e.g., `The Model Context Protocol — how it extends agent capabilities through standardized tool, resource, and prompt primitives` |
| `[LEARNING_OBJECTIVES]` | 4–6 bullet points; paste the exact list |
| `[SECTION_TOPICS]` | Comma-separated list of 4–6 section titles |
| `[DAY_AND_SESSION]` | e.g., `Day 2, Morning` |
| `[CONNECTED_LAB]` | e.g., `Lab 06` |

---

## The Prompt

```
Write a comprehensive curriculum module for the Agentic AI Engineering 3-Day Intensive course.

This document will be uploaded to NotebookLM as source material. NotebookLM will use it to
generate video scripts, slide decks, podcast scripts, and flashcards. Write for a technical
depth appropriate for practicing engineers. Prefer concrete over abstract. Show examples
before giving the general rule.

---

MODULE METADATA
Module Number: [MODULE_NUMBER]
Module Title: [MODULE_TITLE]
Course Day / Session: [DAY_AND_SESSION]
Connected Lab: [CONNECTED_LAB]
Core Concept: [CORE_CONCEPT]

---

LEARNING OBJECTIVES
By the end of this module, the reader will be able to:
[LEARNING_OBJECTIVES]

(Include exactly 4–6 objectives. Each should be testable: "explain X", "distinguish X from Y",
"configure X", "write X that does Y". Avoid vague objectives like "understand X".)

---

REQUIRED STRUCTURE

Write the module with the following top-level organization:

# Module [MODULE_NUMBER]: [MODULE_TITLE]

**Course**: Agentic AI Engineering — 3-Day Intensive
**Module**: [MODULE_NUMBER] of 12
**Duration**: 90 minutes
**Day**: [DAY_AND_SESSION]

---

## Overview
[3–4 paragraph overview. First paragraph: the problem this module addresses. Second paragraph:
why this problem matters operationally for engineers (not theoretically). Third paragraph:
what the module covers and in what order. Optional fourth paragraph: connection to adjacent
modules.]

---

## Learning Objectives
[The 4–6 objectives as a numbered list.]

---

### [MODULE_NUMBER].1 [First Section Title from SECTION_TOPICS]
[Content — see Section Content Rules below]

### [MODULE_NUMBER].2 [Second Section Title]
[Content]

### [MODULE_NUMBER].3 [Third Section Title]
[Content]

### [MODULE_NUMBER].4 [Fourth Section Title]
[Content]

(Add .5 and .6 if the section count warrants it.)

---

## Lab Connection
[One paragraph connecting this module to [CONNECTED_LAB]. Describe what the lab exercises,
what artifact or configuration the student produces, and how it applies the concepts here.]

---

## Further Reading
[4–6 authoritative links: official docs, specs, SDK repos. No blog posts unless from the
primary maintainer. No paywalled sources.]

---

SECTION CONTENT RULES

Each section ([MODULE_NUMBER].1 through [MODULE_NUMBER].N) must include all of the following:

1. NARRATIVE EXPLANATION (required)
   - Open with the problem or question the section answers
   - Explain the concept in prose before showing code or diagrams
   - Use an analogy when introducing an abstract mechanism for the first time
   - Minimum 300 words of prose per major section

2. CODE EXAMPLES (required where applicable)
   - Include at least one Python example and one TypeScript example per module
     (exceptions: modules that are purely conceptual with no API surface)
   - Every code block must be self-contained and runnable in isolation
   - Annotate non-obvious lines with inline comments
   - Show the realistic case first, then explain what each part does

3. BEST PRACTICES (required)
   Format as a table or paired list using this exact style:
   ✅ [What to do] — [Why it matters, one sentence]
   ❌ [What NOT to do] — [Consequence if ignored, one sentence]
   Minimum 4 pairs per module (can be distributed across sections).

4. REAL-WORLD USE CASES (required)
   - Include 2–3 concrete use cases per module
   - Each use case: 1–2 sentences naming the scenario, then 2–4 sentences
     explaining how the concept applies and what the outcome is
   - Use realistic company/system names (not "FooBar Corp" or "Example Inc")
   - Ground use cases in industries relevant to engineers: fintech, developer tooling,
     healthcare systems, e-commerce infrastructure, SaaS products

5. DECISION TABLES (include where the module requires choosing between alternatives)
   - Use Markdown tables to express decision logic
   - Columns: the decision dimension | option A | option B | when to use each
   - Keep tables to 4 columns maximum

---

TONE AND VOICE

- Voice: direct, precise, technically confident. Not academic, not casual.
- Sentence length: vary. Avoid both run-on sentences and staccato fragments.
- No motivational language ("exciting", "powerful", "game-changing").
- No hedging ("you might want to consider", "it could be argued").
- Make statements. If something is a tradeoff, name both sides.
- Technical terms: define on first use, then use without re-defining.
- Audience: engineers with 3+ years of experience who are new to agentic AI.
  Do not explain basic software engineering concepts (REST, async/await, JSON Schema).
  Do explain all agentic AI concepts, even if they seem obvious.

---

SUMMARY AND KEY TAKEAWAYS

End the module (before Lab Connection) with a "Summary" section:

## Summary

[3–5 sentence prose recap of the module's core argument.]

**Key Takeaways:**
- [Takeaway 1 — one sentence, actionable or testable]
- [Takeaway 2]
- [Takeaway 3]
- [Takeaway 4]
- [Optional Takeaway 5]

---

CONTENT ACCURACY RULES (apply to every technical claim)

1. Do not invent API method names. If uncertain, use generic placeholder names and flag them.
2. Do not assert version-specific behavior unless the version is specified in the prompt.
3. Do not claim a feature is "recommended" or "best practice" without a concrete reason.
4. Do not present deprecated patterns as current. If a pattern is deprecated, say so explicitly.
5. All JSON Schema examples must be syntactically valid.
6. All code examples must be plausibly runnable — no stub functions with no body unless labeled.
7. If a transport, API, or configuration field has changed since a known date, note the date.
8. Do not confabulate SDK class names, constructor signatures, or method parameters.
   If a real SDK exists (Claude SDK, MCP TypeScript SDK), use its actual public API.

---

NOTEBOOKLM OPTIMIZATION NOTES

NotebookLM uses document structure (headers, code blocks, lists) for semantic chunking.
These guidelines ensure the source document produces high-quality generated artifacts:

- Every H3 section (###) should be independently understandable without reading prior sections.
  A reader dropped into section 3.4 should understand what's happening.
- Code blocks should include the language identifier on the opening fence (```python, ```typescript,
  ```json, ```bash) — NotebookLM uses this to classify content type.
- Avoid forward references. If you refer to a concept introduced in a later section, briefly
  define it inline rather than saying "as we'll cover in section X.Y."
- Lists and tables should carry enough context in their own labels to be understood in isolation.
  "Option A" is bad. "Option A: stdio transport (local subprocess)" is good.
- Aim for one key idea per paragraph. Dense paragraphs with multiple concepts produce lower-quality
  flashcards and podcast segments.

---

WORD COUNT TARGET

3,000–5,000 words total. Distribution guideline:
- Overview: ~200 words
- Each major section: 400–700 words
- Summary + Key Takeaways: ~150 words
- Lab Connection: ~100 words
- Further Reading: list only (no word count)

Do not truncate content to hit a lower count. Err toward 4,000–5,000 for technically dense topics.
Write the full module in a single response. Do not stop and ask for permission to continue.
```

---

## Adaptation Notes

**When to add a section**: If the module covers a topic with a natural decision tree (e.g., "which
transport to use"), add a dedicated decision-table section rather than embedding the table in
narrative prose. NotebookLM produces better flashcards from dedicated tables.

**When to add a second code example**: If the Python and TypeScript implementations differ
meaningfully in API shape (not just syntax), show both. If they're structurally identical,
show one and note that the other follows the same pattern.

**Module interconnections**: Modules that reference the PRAO loop (01) should call it by name
and tie back to the phase being illustrated. This gives NotebookLM enough signal to connect
the concepts across modules when generating study materials.

**Sensitive accuracy areas by module number**:
- Modules 04–06 (MCP): verify transport names (Streamable HTTP, NOT SSE), primitive names
  (Tools/Resources/Prompts), and connection lifecycle steps against the official MCP spec.
- Modules 07–09 (Claude SDK): verify agent constructor signatures, tool registration patterns,
  and streaming API shapes against the official Anthropic Claude SDK documentation.
- Modules 10–12 (production): avoid asserting specific platform defaults (timeouts, limits)
  without citing the platform's current documentation.
