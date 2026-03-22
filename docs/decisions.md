# Design Decisions Record

Accumulated decisions from user feedback sessions on the agentic-ai-course interactive elements.

---

## 1. Agent Trace Speed and Interaction Decisions

### Decision: All traces are too fast

**Context**: User tested all 9 agent traces and found them universally too fast for students to read and absorb. The animations complete before the content can be processed.

**Decision**: All auto-play delays must be increased by at minimum 2x (effectively 0.5x of current speed). The default speed selector should start at 0.5x, not 1x.

**Rationale**: Students are reading trace content for the first time. Unlike developers scanning familiar output, they need to comprehend the meaning of each line, connect it to the pedagogical point, and potentially re-read annotations.

---

### Decision: Two-column traces must default to click-through, not auto-play

**Context**: The `compare` variant (side-by-side traces) and `annotated` variant (trace + annotation panel) require students to read two columns simultaneously. At any animation speed, students cannot track both columns because:
- Eyes must jump horizontally between columns
- New content appears in both columns at once (compare) or in sequence that scrolls the other column out of view (annotated)
- Cognitive load of reading + understanding + comparing exceeds what auto-play supports

**Affected traces (5 of 9)**:
1. `m01-era-compare` (compare) -- M01 L1047
2. `m02-claudemd-action` (annotated) -- M02 L762
3. `m02-mcp-trace` (annotated) -- M02 L1291
4. `m03-reading-trace` (annotated) -- M03 L225
5. `m03-intervention-signals` (compare) -- M03 L641

**Decision**: These traces must default to manual step-through mode (`data-default-mode="manual"`). Auto-play remains available as a secondary option ("Watch it play" button), but the primary experience is clicking through steps at the student's own pace.

**Rationale**: Click-through gives students control over pacing. They can read the trace line, then read the annotation, then advance. This matches the learning goal (comprehension) better than passive watching. The "compare" variant is ESPECIALLY problematic because both columns animate simultaneously.

---

### Per-Trace Evaluation

#### Trace 1: `m01-first-taste` (terminal, 10 lines)
- **Decision**: Keep auto-play, slow down
- **Rationale**: Single column, terminal variant, visually demonstrative. Students are seeing their first trace -- watching it flow is the pedagogical point. 10 lines is borderline but acceptable.
- **New speed**: `data-speed="0.5"` (default to half speed)

#### Trace 2: `m01-prao-trace` (prao, 14 lines)
- **Decision**: Keep auto-play, significantly slow down
- **Rationale**: Single column with PRAO phase strip (not a reading burden -- it is a passive indicator). 14 lines is long but the PRAO strip adds visual interest that makes watching worthwhile. The learning goal is seeing the loop cycle through phases.
- **New speed**: `data-speed="0.5"`

#### Trace 3: `m01-era-compare` (compare, 14 total lines)
- **Decision**: CONVERT to click-through default
- **Rationale**: Two columns. Students must compare Era 2 vs Era 3 side by side. At any auto-play speed, they cannot read both columns. The learning goal is comprehension of the contrast, not watching output flow.
- **Change**: Add `data-default-mode="manual"`

#### Trace 4: `m02-claudemd-action` (annotated, 11 lines, 8 annotations)
- **Decision**: CONVERT to click-through default
- **Rationale**: Two columns (trace + annotations). Annotations are DENSE -- they explain WHY each step matters. The annotations are the primary learning content. Students need time to read the trace line, then read the annotation, then connect the two. Auto-play makes this impossible.
- **Change**: Add `data-default-mode="manual"`

#### Trace 5: `m02-permissions-live` (terminal, 9 lines)
- **Decision**: Keep auto-play, slow down
- **Rationale**: Single column, short, demonstrates permission boundaries being enforced. Visual demonstration is the point. The error line and the agent's recovery are dramatic enough to work as auto-play.
- **New speed**: `data-speed="0.5"`

#### Trace 6: `m02-mcp-trace` (annotated, 9 lines, 6 annotations)
- **Decision**: CONVERT to click-through default
- **Rationale**: Two columns. Annotations explain MCP-specific concepts that students have just encountered for the first time. Dense conceptual content that requires careful reading.
- **Change**: Add `data-default-mode="manual"`

#### Trace 7: `m03-reading-trace` (annotated, 11 lines, 9 annotations)
- **Decision**: CONVERT to click-through default
- **Rationale**: Two columns. 9 out of 11 lines have annotations. The annotations contain the MOST IMPORTANT content in this section (teaching students what to look for in traces). This is the single most annotation-heavy trace in the course. Click-through is essential.
- **Change**: Add `data-default-mode="manual"`

#### Trace 8: `m03-intervention-signals` (compare, 16 total lines)
- **Decision**: CONVERT to click-through default
- **Rationale**: Two columns comparing healthy vs stuck agent. Students need to study the contrast carefully to learn the intervention signals. The stuck loop column has subtle repeated reads that are the key teaching point -- auto-play would scroll past them.
- **Change**: Add `data-default-mode="manual"`

#### Trace 9: `m03-patterns-live` (prao, 16 lines)
- **Decision**: Keep auto-play, slow down significantly
- **Rationale**: Single column with PRAO strip. 16 lines is long, but the learning goal is watching the phase transitions happen in real time. The PRAO strip provides a visual anchor. However, the speed must be very slow due to length.
- **New speed**: `data-speed="0.5"`

---

## 2. General Animation Speed Guidelines

### Minimum Delays by Content Type

| Content Type | Minimum Delay (ms) | Rationale |
|-------------|--------------------:|-----------|
| Short code output (tool call, result) | 1500 | Students need to read and parse the command/result |
| Thinking lines (agent reasoning) | 3500 | Longer text, students need to evaluate the reasoning |
| Thinking lines with annotations | 4000 | Reading two pieces of content |
| Prompt lines | 2000 | Establishes context, students need to understand the task |
| Response lines | 2500 | Summary content, students verify against what they saw |
| Error lines | 2500 | Students need to understand what went wrong |
| First line (data-delay="0") | 0 | Keep initial display immediate |

### Speed Multiplier Defaults

- Default speed: `0.5x` (not `1x`)
- Speed options: `0.5x`, `1x`, `2x` (remove `3x` -- never useful for learning)
- Active button on load: `0.5x`

---

## 3. Two-Column Reading Rule

**Rule**: Any trace with parallel reading requirements (compare variant, annotated variant) MUST default to click-through (manual step) mode, not auto-play.

**Definition of "parallel reading"**:
- `compare` variant: Two trace columns that animate simultaneously
- `annotated` variant: Trace column + annotation panel where annotations contain substantive learning content

**Implementation**: Add `data-default-mode="manual"` attribute. The JS engine starts in paused state with step-forward as the primary interaction. Auto-play is available via a "Watch it play" toggle.

**Exception**: If a future annotated trace has only decorative/brief annotations (fewer than 3 words per annotation), auto-play may be acceptable. Currently no such traces exist.

---

## 4. User Feedback Organized by Category

### Visual Design Feedback

- Dark mode is primary design target (confirmed, already in spec)
- No emojis anywhere -- Lucide icons only (confirmed, already in spec)
- Colors communicate meaning, not decoration (confirmed, already in spec)

### Content Structure Feedback

- Predict-before-explain must always come BEFORE the explanation (confirmed, already in spec)
- Progressive disclosure: collapse long prose (confirmed, already in spec)
- Interactive elements are the centerpiece, not supporting text (confirmed, already in spec)

### Interaction Design Feedback

- **All agent trace animations are too fast** -- minimum 2x slowdown required
- **Two-column traces are VERY difficult to read at any speed** -- must default to click-through
- **Click-through may be better than auto-play for many traces** -- promotes accessibility and learner control
- **Each trace should be individually evaluated** -- not all traces serve the same pedagogical purpose; some benefit from auto-play (demonstration) while others need click-through (comprehension)
- Speed selector should default to 0.5x, not 1x
- Consider removing 3x speed option entirely (no learning use case)

### Terminology and Naming Decisions

- "Agentic Loop" is the concept name; "PRAO" is the mnemonic only (already in spec)
- "Agentic coding" preferred over "AI-assisted development" (already in spec)
- Never write "the PRAO Loop" (already in spec)

### Quality Standards

- Zero tolerance for content inaccuracies (already in spec, enforced)
- Real tests only -- no mock-based claims of success
- All interactive components must support keyboard navigation
- All animations must respect `prefers-reduced-motion`
