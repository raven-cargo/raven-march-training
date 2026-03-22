## Review: Modules 01–03 — Consistency, Flow & Interactivity

### A. Consistency Issues

**1. CLAUDE.md hierarchy description mismatch**
- `01-paradigm-shift.md:155–157` — States "Claude Code reads CLAUDE.md at the start of every session" but only mentions a single file, no hierarchy.
- `02-claude-code-foundations.md:119–126` — Introduces **two levels** (global `~/.claude/CLAUDE.md` + project `.claude/CLAUDE.md`).
- **Fix**: In Module 01, line 155, add a brief note: "Claude Code reads CLAUDE.md files (which can exist at global and project levels, covered in Module 02) at the start of every session..."

**2. Wei et al. citation duplicated across modules**
- `02-claude-code-foundations.md:570` and `03-agent-thinking.md:424` — Same paper cited identically. Module 02 contextualizes it for CLAUDE.md design; Module 03 for chain-of-thought. This is fine academically but the annotation in Module 02 says "directly relevant to CLAUDE.md design" which is a stretch — chain-of-thought prompting is about reasoning, not configuration files.
- **Fix**: `02-claude-code-foundations.md:570` — Change annotation to: *"Foundational paper on structured multi-step reasoning — the mechanism that makes agent tool-call sequences legible"*

**3. Module 03 header has extra NotebookLM directive missing from Modules 01–02**
- `03-agent-thinking.md:4` — `**Source document for NotebookLM. Use to generate: video scripts, slide decks, podcasts, and flashcards.**`
- Modules 01 and 02 lack this line.
- **Fix**: Either add the same line to `01-paradigm-shift.md:3` and `02-claude-code-foundations.md:3`, or remove it from Module 03. Recommend adding to all three for consistency.

**4. "Output reading" introduced twice**
- `02-claude-code-foundations.md:443–496` — Section 2.5 "Reading Claude Code Output" covers three layers, tracking progress, when to intervene, approval pattern.
- `03-agent-thinking.md:26–48` — Section 3.1 "The Transparency Advantage" re-introduces the same three layers (thinking, tool calls, response) with near-identical framing.
- **Fix**: Module 02 Section 2.5 should be shortened to a brief operational checklist ("here's what output looks like — Module 03 covers reading it in depth"). Move the three-layer explanation exclusively to Module 03.

**5. "Approval pattern" taught twice**
- `02-claude-code-foundations.md:481–496` — Full approval pattern with prompt example.
- `03-agent-thinking.md:43–44` — References it back: "This is why the approval pattern from Module 02 is so powerful."
- **No fix needed** — Module 03 references rather than re-teaches. But Module 02 Section 2.5 could defer this to Module 03 if you shorten 2.5 per issue #4.

**6. Intervention guidance overlaps**
- `02-claude-code-foundations.md:470–479` — "When to Intervene" (4 bullet points).
- `03-agent-thinking.md:382–386` — "Intervention Decisions" (6 bullet points, largely superseding Module 02's).
- **Fix**: Collapse Module 02's intervention bullets into a single sentence: *"Knowing when to intervene is covered thoroughly in Module 03; for now, the key rule is: read the thinking block before interrupting."*

---

### B. Flow Issues

**7. Module 01 → 02 transition is abrupt on CLAUDE.md**
- `01-paradigm-shift.md:153–165` — Introduces CLAUDE.md with reasonable depth (what it is, what belongs in it, that it's a living document).
- `02-claude-code-foundations.md:106–209` — Repeats nearly everything from Module 01's treatment, then adds depth.
- **Fix**: Module 01 should mention CLAUDE.md only as a concept preview (3–4 sentences max), explicitly saying *"Module 02 covers CLAUDE.md in full detail."* Current treatment in Module 01 lines 159–165 (listing what belongs in CLAUDE.md) should be cut — it's fully duplicated in Module 02.

**8. Module 02 → 03 transition mismatch**
- `02-claude-code-foundations.md:576` — Teaser: *"Where you learn to read reasoning traces, understand tool call sequences, and make sound decisions about when to intervene."*
- `03-agent-thinking.md:10–14` — Overview promises exactly this but also adds extended thinking, which isn't mentioned in the teaser.
- **Fix**: `02-claude-code-foundations.md:576` — Append: *"...and when to let the agent work. You'll also learn when extended thinking adds value and when it's unnecessary overhead."*

**9. PRAO introduced in Module 01, diagrammed again in Module 03**
- `01-paradigm-shift.md:80–95` — Full PRAO Mermaid diagram.
- `03-agent-thinking.md:54–69` — Another PRAO state diagram (slightly different style: stateDiagram-v2 vs flowchart).
- **Fix**: Module 03's diagram should explicitly note it's a *state machine view* of the same PRAO loop from Module 01. Add a one-line callout: *"This is the PRAO loop from Module 01, now viewed as a state machine to emphasize transitions and termination."*

---

### C. Interactivity Opportunities

**10. Module 01: Add a self-assessment after Section 1.1**
- After `01-paradigm-shift.md:72` (end of "The Disorientation Problem").
- **Suggestion**: Add a "🧪 Quick Check" callout:
  ```markdown
  > **🧪 Quick Check:** A colleague says "I just paste my code into ChatGPT and copy the answer back."  
  > Which era is this? What's missing compared to agentic AI? (Answer: Era 2 — no tool use, no feedback loop, human is the agent.)
  ```

**11. Module 01: Add a prompt comparison exercise in Section 1.4**
- After `01-paradigm-shift.md:200` (end of Failure Mode 2).
- **Suggestion**: Show two prompts side-by-side and ask learners to identify which is agentic-appropriate:
  ```markdown
  > **🧪 Prompt Clinic:** Which prompt will produce better agent results?
  > - A: "Make the auth module better"
  > - B: "Decouple database access from business logic in src/auth/. Don't change the external API. Tests must pass."
  > Why?
  ```

**12. Module 02: Add a "Spot the Problem" exercise for CLAUDE.md**
- After `02-claude-code-foundations.md:208` (end of CLAUDE.md section).
- **Suggestion**: Present a deliberately flawed CLAUDE.md and ask learners to identify issues:
  ```markdown
  > **🧪 Spot the Problems:**
  > ```markdown
  > ## Config
  > API_KEY=sk-abc123def456
  > Write clean, maintainable code.
  > Currently working on adding user auth.
  > ```
  > (3 problems: secret in CLAUDE.md, aspirational principle, per-task instruction)
  ```

**13. Module 02: Add a permissions configuration exercise**
- After `02-claude-code-foundations.md:331` (end of permissions section).
- **Suggestion**: Give a scenario and ask learners to write the `settings.json`:
  ```markdown
  > **🧪 Configure This:** Your agent needs to: read all files, write only in `src/` and `tests/`, run `npm test` and `npm run build`, but never delete files or push to git. Write the permissions block.
  ```

**14. Module 03: Add a trace annotation exercise inline**
- After `03-agent-thinking.md:191` (end of "When Repeated Reads Signal a Loop vs. Thoroughness").
- **Suggestion**: Present a short ambiguous trace and ask: "Loop or thoroughness?"
  ```markdown
  > **🧪 Loop or Thorough?**
  > ```
  > Read("src/config.ts")
  > [thinking: this imports from utils, let me check that]
  > Read("src/utils.ts") 
  > [thinking: utils uses a type from types.ts]
  > Read("src/types.ts")
  > ```
  > vs.
  > ```
  > Read("src/config.ts")
  > [thinking: maybe I should change the timeout...]
  > Read("src/config.ts")
  > [thinking: or maybe the retry count...]
  > Read("src/config.ts")
  > ```
  > (First is thoroughness — each read is new content building a model. Second is looping — same file, no new information.)
  ```

**15. Module 03: Extended thinking needs a concrete before/after**
- `03-agent-thinking.md:245–308` — Section 3.5 explains extended thinking conceptually but lacks a concrete trace snippet showing what extended thinking output actually looks like vs. normal reasoning.
- **Suggestion**: Add a short side-by-side comparison showing the same problem with and without extended thinking — even 5–6 lines each to illustrate the depth difference.

---

### D. Technical Accuracy Notes

**16. Linear MCP URL uses deprecated SSE endpoint**
- `02-claude-code-foundations.md:376` — `"url": "https://mcp.linear.app/sse"` 
- This URL ends in `/sse`, contradicting the module's own guidance at line 356: *"SSE is deprecated."*
- **Fix**: Change to `"url": "https://mcp.linear.app"` and update `"type": "http"` (which is already correct). Add a comment noting the endpoint uses Streamable HTTP.

**17. Module 03 closing line overpromises**
- `03-agent-thinking.md:430` — *"Days two and three move into applied work: multi-agent systems, CI/CD integration, MCP server development, and production deployment patterns."*
- Per the master curriculum, Day 2 is prompt engineering, MCP explorer, and skills — not multi-agent systems.
- **Fix**: Change to: *"Day two moves into applied work: prompt engineering, MCP exploration, and skills development. Day three covers multi-agent patterns, CI/CD integration, and production deployment."*

---

### Summary Table

| # | Type | File | Lines | Severity |
|---|------|------|-------|----------|
| 1 | Consistency | 01 | 155 | Medium |
| 4 | Overlap | 02→03 | 443–496 / 26–48 | High |
| 7 | Flow | 01→02 | 153–165 | High |
| 16 | Accuracy | 02 | 376 | **Critical** |
| 17 | Accuracy | 03 | 430 | High |
| 10–14 | Interactivity | All 3 | Various | Medium |
| 3 | Consistency | 03 | 4 | Low |

**Top 3 actions**: Fix the SSE URL (#16), deduplicate the output-reading / three-layers content (#4 + #7), and add inline exercises (#10–14) to transform passive reading into active learning.
