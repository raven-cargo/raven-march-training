# EVALUATOR Round 2 -- Brutal Review

**Date**: 2026-03-22
**Evaluator**: EVALUATOR GAN-loop adversarial agent
**Scope**: All 9 labs (lab-01 through lab-09)
**Target**: Find flaws that MERCURIO (9.0/10) missed
**Live URL**: https://agentic-ai-course-hazel.vercel.app/

---

## 1. INTERACTIVITY DEPTH TEST -- Score: 5/10

### 1a. Textarea Accessibility: CATASTROPHIC

Only **2 of 9 labs** have `aria-label` on their textareas:

| Lab | Textareas | With aria-label | Coverage |
|-----|-----------|-----------------|----------|
| 01  | 8         | 8               | 100%     |
| 02  | 7         | 0               | **0%**   |
| 03  | 11        | 0               | **0%**   |
| 04  | 10        | 0               | **0%**   |
| 05  | 22        | 22              | 100%     |
| 06  | 12        | 0               | **0%**   |
| 07  | 6         | 0               | **0%**   |
| 08  | 8         | 0               | **0%**   |
| 09  | 10        | 0               | **0%**   |

**Total**: 94 textareas, only 30 with aria-labels. **68% failure rate**. A screen reader user encounters 64 unlabeled form controls. This is a WCAG 2.1 Level A violation (Success Criterion 4.1.2).

### 1b. localStorage Without try/catch: HIGH RISK

localStorage calls vs try/catch blocks:

| Lab | localStorage calls | try blocks | Protected? |
|-----|--------------------|------------|------------|
| 01  | 3                  | 1          | Partial    |
| 02  | 7                  | 0          | **NO**     |
| 03  | 9                  | 0          | **NO**     |
| 04  | 29                 | 1          | Partial    |
| 05  | 10                 | 1          | Partial    |
| 06  | 14                 | 0          | **NO**     |
| 07  | 30                 | 1          | Partial    |
| 08  | 20                 | 1          | Partial    |
| 09  | 18                 | 0          | **NO**     |

**4 of 9 labs have ZERO try/catch protection** around localStorage. In Safari private browsing, or when storage quota is exceeded, or when cookies are disabled, **all localStorage calls throw**. This will crash the entire XP tracking system and may prevent section progression. Labs 04 and 07 have 29 and 30 unprotected calls respectively -- a single failure corrupts the entire lab state.

### 1c. Code Block Overflow: INADEQUATE

13 `<pre>` tags across all labs. Only Lab 05 has explicit overflow rules for `<pre>`. Labs 03, 04, 06, 07, 08, 09 have `<pre>` tags with **no overflow handling**. Long code lines will overflow their containers on narrow screens, creating horizontal scroll issues or visual breakage.

### 1d. Console Calls: CLEAN

No `console.error`, `console.warn`, or `console.log` found in any lab. Full marks here.

---

## 2. NAVIGATION INTEGRITY -- Score: 4/10

### 2a. Navigation Chain Contradictions: BROKEN

The expected canonical flow is: 01 -> 02 -> 03 -> 04 -> 05 -> 06 -> 07 -> 08 -> 09.

**Lab 04 has CONTRADICTORY navigation:**
- Top nav: `<- Lab 03` / `Lab 05 ->`  (correct)
- Bottom connect-forward panel: `Continue to Lab 06 ->` (WRONG -- skips Lab 05!)
- Bottom secondary nav: `<- Back to Lab 03` / `Continue to Lab 05 ->` (correct)

Result: A student who clicks the prominent "Continue to Lab 06" button at the bottom **skips Lab 05 entirely**. This is a critical content sequencing bug.

**Lab 05 has CONTRADICTORY navigation:**
- Top nav: `<- Lab 04` / `Lab 06 ->` (correct)
- Bottom connect-forward: `Continue to Lab 04 ->` (WRONG -- goes backward!)
- Bottom secondary: `<- Back to Lab 03` / `Continue to Lab 04 ->` (WRONG x2 -- back goes to 03 instead of 04, forward goes to 04 instead of 06)

Result: Lab 05 has **every single bottom navigation link wrong**. The connect-forward sends the student backward. The "Back" link skips Lab 04. This is completely broken.

### 2b. Missing Back Navigation

| Lab | Has Back Link? | Target |
|-----|---------------|--------|
| 01  | No            | N/A (first lab, acceptable) |
| 02  | Yes           | /lab/01 |
| 03  | Yes           | /lab/02 |
| 04  | Yes           | /lab/03 |
| 05  | Yes (wrong)   | /lab/03 (should be /lab/04) |
| 06  | Yes           | /lab/05 |
| 07  | Yes           | /lab/06 |
| 08  | Yes           | /lab/07 |
| 09  | Yes           | /lab/08 |

### 2c. Vercel Rewrites vs Navigation Links

Navigation links use `/lab/02` format. Vercel rewrites support both `/lab/2` and `/lab/02`. This is correct -- no issue here.

---

## 3. VISUAL CONSISTENCY AUDIT -- Score: 6/10

### 3a. Monospace Font Split: TWO COMPETING SYSTEMS

| Lab | Fira Code refs | JetBrains Mono refs | Primary |
|-----|---------------|---------------------|---------|
| 01  | 5             | 1                   | Fira Code |
| 02  | 4             | 1                   | Fira Code |
| 03  | 7             | 1                   | Fira Code |
| 04  | 1             | **27**              | JetBrains Mono |
| 05  | 0             | **5**               | JetBrains Mono |
| 06  | 6             | 1                   | Fira Code |
| 07  | 4             | 1                   | Fira Code |
| 08  | 11            | 1                   | Fira Code |
| 09  | 3             | 1                   | Fira Code |

Labs 04 and 05 use JetBrains Mono as their primary monospace font. All other labs use Fira Code. This creates a **visible font change** when a student navigates from Lab 03 to Lab 04, and again from Lab 05 to Lab 06. The code blocks will render in different typefaces.

### 3b. Google Fonts Loading Split

Only Labs 04 and 05 load Google Fonts via `<link>` (with preconnect). The other 7 labs rely on self-hosted/embedded fonts from the font license comment block. This means:
- Labs 04-05: Fonts load from Google CDN (render-blocking potential)
- All others: Fonts must be locally available or fallback kicks in

### 3c. Border-radius Chaos

Each lab uses a different distribution of border-radius values. Sample:
- Lab 01: 10x `var(--radius)`, 6x `8px`, 4x `50%`, 3x `var(--radius-sm)`, 3x `100px`, 2x `6px`...
- Lab 04: 16x `4px`, 16x `var(--radius-sm)`, 9x `var(--radius)`, 8x `20px`...
- Lab 09: 13x `6px`, 13x `var(--radius)`, 7x `8px`...

The mix of CSS variables (`var(--radius)`, `var(--radius-sm)`) and hardcoded pixel values (`4px`, `6px`, `8px`, `10px`, `12px`, `20px`, `100px`, `999px`) means the design system is only partially adopted. Hardcoded values cannot be themed.

### 3d. Inline Style Explosion

| Lab | Inline `style=` attributes |
|-----|---------------------------|
| 01  | 126                       |
| 02  | 130                       |
| 03  | 167                       |
| 04  | 123                       |
| 05  | 47                        |
| 06  | **211**                   |
| 07  | **191**                   |
| 08  | **209**                   |
| 09  | 167                       |

Labs 06, 07, and 08 have over 190 inline styles each. These override the CSS design system, cannot be themed, and make maintenance extremely difficult. Lab 06 has 211 inline styles -- nearly one per 10 lines of HTML.

### 3e. Color Variables: CONSISTENT

All 9 labs use `--primary: #6366f1` and `--accent: #06b6d4`. No deviations found. This is correct.

---

## 4. SEMANTIC HTML AUDIT -- Score: 5/10

### 4a. `<main>` Landmark

Only **2 of 9 labs** (04 and 05) have a `<main>` element. Labs 01-03, 06-09 have no `<main>` landmark. Screen readers and assistive technology rely on `<main>` to skip navigation and reach content.

### 4b. `<section>` Usage

| Lab | `<section>` elements |
|-----|---------------------|
| 01  | 7                   |
| 02  | 0                   |
| 03  | 0                   |
| 04  | 6                   |
| 05  | 6                   |
| 06  | 0                   |
| 07  | 0                   |
| 08  | 0                   |
| 09  | 0                   |

5 of 9 labs use zero `<section>` elements. They presumably use `<div>` for all content grouping.

### 4c. Heading Hierarchy: BADLY BROKEN in 2 Labs

**Lab 04**: Has **0 `<h1>` and 0 `<h2>` elements**. Starts at `<h3>`. This is a complete heading hierarchy failure. There is no document title in the heading structure. Assistive technology will report no page heading.

**Lab 05**: Has **5 `<h1>` elements and 0 `<h2>` or `<h3>`**. Uses `<h1>` for every section title. Multiple `<h1>` elements violate the document outline model. There should be exactly one `<h1>` per page.

### 4d. `<div onclick>` vs `<button>`

Total `<div onclick>` counts: Lab 01 (9), Lab 02 (6), Lab 03 (5), Lab 04 (11), Lab 05 (17), Lab 07 (6). However, examination shows most of these have `role="button"`, `tabindex="0"`, and `onkeydown` handlers -- so they are **functionally accessible** even if semantically impure. Labs 06, 08, 09 properly use `<button>` exclusively (0 div onclick). Deduction is moderate, not severe, since ARIA roles compensate.

---

## 5. PERFORMANCE CONCERNS -- Score: 7/10

### 5a. Inline CSS/JS Size

| Lab | Inline CSS | Inline JS | Total |
|-----|-----------|-----------|-------|
| 01  | ~22KB     | ~29KB     | ~51KB |
| 02  | ~23KB     | ~30KB     | ~53KB |
| 03  | ~27KB     | ~22KB     | ~49KB |
| 04  | ~23KB     | ~35KB     | ~58KB |
| 05  | ~27KB     | ~29KB     | ~56KB |
| 06  | ~24KB     | ~22KB     | ~46KB |
| 07  | ~30KB     | ~25KB     | ~55KB |
| 08  | ~22KB     | ~26KB     | ~48KB |
| 09  | ~23KB     | ~30KB     | ~53KB |

Average: ~52KB of inline CSS+JS per lab. This is not terrible for self-contained HTML files, but it means **zero caching** -- every page load re-parses 22-30KB of CSS and 22-35KB of JS. A shared CSS/JS file would allow browser caching across labs.

### 5b. External Resource Blocking

All 9 labs load `lucide@latest` from unpkg CDN. Using `@latest` means:
- **No version pinning**: A breaking change to Lucide could break all labs simultaneously
- **No SRI hash**: The loaded script has no subresource integrity check
- **CDN dependency**: If unpkg goes down, all icons break

Labs 04 and 05 additionally load Google Fonts CSS, adding 1-2 render-blocking requests.

### 5c. No Base64 Data URIs

Only 2 labs have `data:` references (05 and 09), and these appear minimal. No bloat concern.

---

## 6. CONTENT ACCURACY -- Score: 9/10

### 6a. MCP Primitives: CORRECT

No mention of "4 primitives" found. No confabulation detected.

### 6b. SSE Deprecation: CORRECTLY HANDLED

Lab 04 explicitly marks SSE as deprecated with proper context: "SSE (Server-Sent Events) transport was the original remote option. It was deprecated in MCP spec 2025-03-26." The quiz also tests this knowledge. Correct.

### 6c. Claude Code Flags: CLEAN

No references to `--thinking`, `--context`, or `--verbose` flags found.

### 6d. Broken/Placeholder URLs: CLEAN

No `href="#"` or `href="javascript:void(0)"` found.

### 6e. Minor Concern: Font License Block

Every lab includes a comment block with links to `fonts.google.com/specimen/Inter` and `fonts.google.com/specimen/JetBrains+Mono` as license references, but Labs 01-03 and 06-09 do not actually load these fonts from Google. They reference Fira Code in CSS but the Google Fonts comment says JetBrains Mono. This is confusing but not technically inaccurate.

---

## 7. MOBILE RENDERING PREDICTION -- Score: 5/10

### 7a. Media Query Coverage

| Lab | @media queries | Breakpoints |
|-----|---------------|-------------|
| 01  | 1             | 768px       |
| 02  | 1             | 768px       |
| 03  | 1             | 768px       |
| 04  | 2             | 640px, 600px |
| 05  | 2             | 640px       |
| 06  | 2             | 768px, 480px |
| 07  | 2             | 768px, 480px |
| 08  | 1             | 600px       |
| 09  | 1             | 768px       |

Only 1-2 media queries per lab is inadequate for a production course. No lab targets 320px (smallest supported viewport). The nav bar dot system will compress but may not wrap gracefully below 375px.

### 7b. Touch Targets

No lab specifies `min-height: 44px` or `min-width: 44px` explicitly for interactive elements. While padding on buttons generally exceeds 44px total, the nav dots (small circles ~28-32px) likely fail the WCAG 2.5.5 target size requirement (44x44px) on mobile.

### 7c. Code Block Horizontal Scroll

`<pre>` blocks without `overflow-x: auto` (Labs 03, 04, 06, 07, 08, 09) will cause page-wide horizontal scroll on mobile devices when code lines exceed viewport width.

### 7d. No `<meta name="viewport">` Check

All labs should have `<meta name="viewport" content="width=device-width, initial-scale=1">`. Not verified individually but assumed present given responsive rules exist.

---

## DIMENSION SCORES

| Dimension | Score | Weight | Weighted |
|-----------|-------|--------|----------|
| 1. Interactivity Depth | 5/10 | 20% | 1.00 |
| 2. Navigation Integrity | 4/10 | 20% | 0.80 |
| 3. Visual Consistency | 6/10 | 15% | 0.90 |
| 4. Semantic HTML | 5/10 | 10% | 0.50 |
| 5. Performance | 7/10 | 10% | 0.70 |
| 6. Content Accuracy | 9/10 | 15% | 1.35 |
| 7. Mobile Rendering | 5/10 | 10% | 0.50 |
| **OVERALL** | | **100%** | **5.75/10** |

**Unweighted Average: 5.86/10**

---

## CRITICAL FINDINGS SUMMARY

1. **Lab 05 bottom navigation sends students BACKWARD** (to Lab 04 instead of Lab 06). Every bottom link in Lab 05 is wrong.
2. **Lab 04 bottom connect-forward skips Lab 05** entirely (links to Lab 06).
3. **68% of textareas (64 of 94) lack aria-labels** -- WCAG Level A failure.
4. **4 labs have zero try/catch around localStorage** -- will crash in private browsing.
5. **Lab 04 has no h1 or h2** -- page has no heading for screen readers.
6. **Lab 05 has 5 h1 elements** -- violates single-h1 document model.
7. **7 of 9 labs lack `<main>` landmark** -- screen readers cannot skip to content.
8. **Monospace font switches between Fira Code and JetBrains Mono** at Lab 04/05 boundary.
9. **`<pre>` blocks in 6 labs lack overflow handling** -- will break on mobile.
10. **lucide@latest has no version pin or SRI** -- supply chain risk.

---

## PRIORITIZED FIX LIST (15 items)

### P0 -- SHIP BLOCKERS (fix before any student sees this)

1. **FIX Lab 05 bottom navigation**: Change connect-forward from `/lab/04` to `/lab/06`. Change "Back to Lab 03" to "Back to Lab 04". This is actively sending students in circles.

2. **FIX Lab 04 bottom connect-forward**: Change from `/lab/06` to `/lab/05`. Students currently skip an entire lab.

3. **FIX Lab 05 "Back" link**: Points to `/lab/03` (skipping Lab 04). Should point to `/lab/04`.

### P1 -- ACCESSIBILITY (fix within 1 week)

4. **Add aria-labels to all 64 unlabeled textareas** across Labs 02, 03, 04, 06, 07, 08, 09. Each textarea's placeholder text can serve as the aria-label value.

5. **Add `<main>` landmark** to Labs 01, 02, 03, 06, 07, 08, 09. Wrap the content area (excluding nav) in `<main>`.

6. **Fix Lab 04 heading hierarchy**: Add an `<h1>` for the page title and ensure sections use `<h2>`.

7. **Fix Lab 05 heading hierarchy**: Change section `<h1>` elements to `<h2>`. Add a single `<h1>` for the page title.

### P2 -- ROBUSTNESS (fix within 2 weeks)

8. **Wrap ALL localStorage calls in try/catch** across all 9 labs. A utility function like `safeSave(key, value)` and `safeLoad(key, fallback)` would centralize this. Priority on Labs 02, 03, 06, 09 which have zero protection.

9. **Add `overflow-x: auto` to `<pre>` and code block containers** in Labs 03, 04, 06, 07, 08, 09 to prevent horizontal page scroll on mobile.

10. **Pin lucide version** in the unpkg URL (e.g., `lucide@0.460.0`) and add SRI hash via `integrity` attribute on the `<script>` tag.

### P3 -- CONSISTENCY (fix within 1 month)

11. **Standardize monospace font**: Pick either Fira Code OR JetBrains Mono for ALL labs. Currently Labs 04-05 use JetBrains Mono while all others use Fira Code. This creates a visible font change mid-course.

12. **Standardize Google Fonts loading**: Either all labs load from Google Fonts CDN or none do. Currently only Labs 04-05 use Google Fonts links.

13. **Reduce inline styles**: Labs 06 (211), 08 (209), and 07 (191) should migrate repeated inline styles into CSS classes. Target: under 50 inline styles per lab.

14. **Standardize border-radius values**: Replace hardcoded pixel values (`4px`, `6px`, `8px`, `10px`, `12px`, `20px`) with CSS variable references (`var(--radius-sm)`, `var(--radius)`, `var(--radius-lg)`). Define these variables consistently.

15. **Add mobile breakpoint at 375px and 320px**: Current responsive rules only target 480px-768px. Navigation dots, quiz buttons, and code blocks need explicit handling at smaller viewports to meet WCAG 2.5.5 touch target requirements.

---

## MERCURIO MISSED THESE

MERCURIO gave 9.0/10. This review finds:
- 2 broken navigation chains (P0 severity -- students get lost)
- 68% WCAG textarea failure (P1 severity)
- 4 labs with zero localStorage error handling (P2 severity)
- Font switching mid-course (P3 severity)
- 2 labs with completely broken heading hierarchies (P1 severity)

A 9.0/10 score was **unjustified**. The navigation bugs alone would justify no higher than 7.0/10 in a shipping product. With accessibility failures added, this is a 5.75/10 course that needs targeted fixes before pilot delivery.

---

*Review generated by EVALUATOR agent, GAN-style adversarial loop, Round 2.*
