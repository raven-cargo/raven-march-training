I now have a complete picture. Here is the technical QA report for modules 04-06:

---

## Technical QA Report: Modules 04–06 + Linked Labs/Routes

### 🔴 P0 — Critical: Lab Connection Cross-References are Wrong

**Issue 1: Module 05 references wrong lab**
- **Location**: `docs/curriculum/modules/05-mcp-architecture.md`, line 421
- **States**: *"Lab 06 connects to this module"* — describes MCP server configuration exercises (schema annotation, stdio/Streamable HTTP)
- **Reality**: Lab 06 (`labs/day2/lab-06-skills-commands.html`) is **"Skills & Commands Builder"** — covers skill anatomy and builder interfaces, not MCP configuration
- **Correct lab**: Lab 04 (`labs/day2/lab-04-mcp-explorer.html`) is **"MCP Server Explorer"** — covers Tools/Resources/Prompts primitives, which is exactly the Module 05 content
- **Reproduce**: Open `/module/05` → scroll to "Lab Connection" → click through to `/lab/06` → topic mismatch

**Issue 2: Module 06 references wrong lab**
- **Location**: `docs/curriculum/modules/06-mcp-building.md`, line 544
- **States**: *"Lab 07 is a full implementation lab"* — describes building a two-tool, one-resource MCP server with TypeScript SDK
- **Reality**: Lab 07 (`labs/day3/lab-07-multi-agent.html`) is **"Multi-Agent Orchestrator"** — covers orchestrator pattern and agent dispatch, not MCP server building
- **No matching lab exists** for the MCP server implementation exercise described
- **Reproduce**: Open `/module/06` → scroll to "Lab Connection" → note Lab 07 description doesn't match

**Impact**: Learners following the lab references from the module text will land on unrelated labs. This breaks the pedagogical flow of Day 2.

**Correct mapping should be**:

| Module | Topic | Lab Reference In Text | Actual Lab Topic | Fix |
|--------|-------|----------------------|------------------|-----|
| 04 | Prompt Engineering | Lab 05 ✅ | Prompt Engineering Workshop | No change needed |
| 05 | MCP Architecture | Lab 06 ❌ | Skills & Commands Builder | Change to Lab 04 (MCP Explorer) |
| 06 | Building MCP Servers | Lab 07 ❌ | Multi-Agent Orchestrator | Update text or create missing lab |

---

### 🟠 P1 — High: Reading Progress Broken for Main Content Section

**Issue 3: IntersectionObserver threshold too high for large sections**
- **Location**: `module-viewer.html`, line 928 — `threshold: 0.45`
- **Problem**: All three modules have only **4 h2 headings** (Overview, Learning Objectives, Lab Connection, Further Reading). The substantive content (sections 4.1–4.5, 5.1–5.5, 6.1–6.5) are all `###` (h3), so they nest inside the "Learning Objectives" section card. This one card holds ~90% of the module's content — easily 4000+ pixels tall.
- **Effect**: The 45% visibility threshold requires ~1800px of the section to be visible simultaneously. On a typical 900px viewport, the section would need to fill the entire screen AND be 45% scrolled — which is geometrically impossible for sections this tall. The "Learning Objectives" section card **never gets marked as read**.
- **Reproduce**: Open `/module/04` → scroll through the entire module → check the nav progress indicator → the "Learning Objectives" section stays ○ (unread) → completion banner never fires
- **Fix**: Either (a) lower the threshold to `0.10`–`0.15` for sections taller than the viewport, or (b) promote `###` subsections to `##` in the markdown

**Issue 4: Learning Objectives rendered as process flow widgets**
- **Location**: All three modules' "Learning Objectives" sections contain 4–5 item ordered lists
- **Problem**: The viewer's post-processor converts `<ol>` with 3+ items inside `.section-body` into interactive process flow widgets (step 1/2/3/4 with prev/next buttons). Learning objectives are not sequential steps — they're parallel goals.
- **Effect**: Learners see "Step 1 of 4: Apply the TCEF pattern..." with prev/next navigation, implying the objectives must be achieved sequentially. Only one objective is visible at a time.
- **Reproduce**: Open `/module/04` → observe learning objectives section → only objective #1 visible, others hidden behind "Next →" button
- **Fix**: Use an unordered list (`-`) for learning objectives instead of numbered list (`1. 2. 3. 4.`), or add an exclusion rule in the viewer for lists directly following an h2

---

### 🟡 P2 — Medium: Navigation & Rendering Consistency

**Issue 5: Plain markdown nav links instead of styled buttons**
- **Location**: All three modules end with `[Previous Module → Module XX](/module/XX)` markdown links
- **Problem**: The viewer's `appendModuleNav()` function checks `if (contentEl.querySelector('a[href^="/module/"]')) return;` — finding the existing markdown links and skipping its styled `.module-nav-links` buttons
- **Effect**: Bottom navigation renders as plain underlined text links instead of the styled bordered buttons the viewer was designed to produce. Inconsistent with modules that lack manual nav links.
- **Fix**: Remove the manual `[Previous Module...]` lines from modules 04–06 markdown (and all other modules) and let the viewer generate styled navigation automatically

**Issue 6: Section card imbalance degrades gamification**
- **Problem**: With only 4 h2s, the progress indicator shows "0 / 4 read" — but one section is trivial (Overview, ~1 paragraph), one is massive (Learning Objectives + all content), and two are minimal (Lab Connection, Further Reading). The gamification signal ("3 / 4 read") becomes meaningless since it doesn't correlate with actual reading progress.
- **Fix**: Consider making numbered subsections (4.1, 4.2, etc.) into h2 headings so each becomes its own section card with independent read tracking

---

### 🟢 P3 — Low: Missing Enhancement Opportunities

**Issue 7: No Mermaid diagrams in modules 04 and 06**
- Module 05 has 2 Mermaid diagrams (primitives map and transport diagram) — renders correctly via `renderMermaid()`
- Module 04 (TCEF pattern, iteration loop) and Module 06 (SDK architecture, error flow) would benefit from visual diagrams but have none

**Issue 8: No `<details>` interactive elements in any of the three modules**
- The viewer has full CSS support for `.interactive-reveal`, `.check-card`, `.challenge-card`, and `.milestone-card` variants
- None of modules 04–06 use `<details>/<summary>` for knowledge checks or self-assessment, despite having natural insertion points (TCEF quiz, categorization test, schema reading exercise)

---

### ✅ Verified Working

| Check | Status | Detail |
|-------|--------|--------|
| Vercel routes (both `/module/4` and `/module/04`) | ✅ | Both numeric formats resolve correctly for 04, 05, 06 |
| Lab routes (both `/lab/4` and `/lab/04`) | ✅ | All Day 2 labs resolve correctly |
| MODULE_SLUGS consistency | ✅ | Viewer slug map matches vercel.json and actual filenames |
| Markdown file existence | ✅ | All three `.md` files exist at expected paths |
| Prev/Next module links | ✅ | All 6 links (2 per module) point to correct modules |
| Dashboard grouping | ✅ | Module 04 in Day 1, Modules 05-06 in Day 2 — matches module headers |
| Theme toggle assets | ✅ | `assets/theme-toggle.css` and `.js` exist, referenced by all labs and viewer |
| Mermaid rendering (Module 05) | ✅ | Two `mermaid` code blocks properly structured for `renderMermaid()` |
| Lab files exist for Day 2 | ✅ | `lab-04`, `lab-05`, `lab-06` all present in `labs/day2/` |
| Code block language tags | ✅ | All fenced code blocks have language identifiers (json, typescript, bash) |
| External links | ✅ | Further Reading URLs use HTTPS, reference official docs |

---

### Recommended Fix Priority

1. **Fix Lab Connection references** (P0) — modules 05 and 06 markdown text edits
2. **Fix IntersectionObserver threshold** (P1) — viewer JS, adaptive threshold for tall sections
3. **Prevent learning-objectives → process-flow conversion** (P1) — either markdown change or viewer logic
4. **Remove manual nav links** from markdown (P2) — let viewer generate styled nav
5. **Add Mermaid diagrams** to modules 04 and 06 (P3) — content enhancement

Shall I proceed with fixing the P0 lab connection mismatches?
