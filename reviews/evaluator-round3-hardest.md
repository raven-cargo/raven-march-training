# Round 3 Evaluation - MERCILESS AUDIT

**Evaluator**: Round 3 GAN Adversary
**Date**: 2026-03-22
**Round 2 Score**: 5.75/10
**Builder Claims**: 15 issues fixed

---

## PART 1: VERIFICATION OF CLAIMED FIXES

### V1: aria-label on textareas | PARTIAL FAIL

**Claim**: "55 aria-labels added to textareas"

| Lab | Total textareas | With aria-label | Broken aria-labels | Verdict |
|-----|----------------|-----------------|-------------------|---------|
| 02 | 7 | 7 | 0 | PASS |
| 03 | 11 | 11 | 0 | PASS |
| 04 | 10 | 10 | **1** (`aria-label="{"`) | **FAIL** |
| 05 | 22 | 22 | 0 | PASS |
| 06 | 12 | 12 | 0 | PASS |
| 07 | 6 | 6 | 0 | PASS |
| 08 | 8 | 8 | **5** (`aria-label="{"`) | **FAIL** |
| 09 | 13 | 13 | 0 | PASS |

**REGRESSION INTRODUCED**: 6 textareas across Labs 04 and 08 have `aria-label="{"` -- the builder's fix clearly truncated the label at the first `{` character from the placeholder JSON. These are WORSE than missing aria-labels because a screen reader will announce a single opening brace, which is meaningless.

**Broken instances**:
- `labs/day2/lab-04-mcp-explorer.html:1352` - `aria-label="{"`
- `labs/day3/lab-08-production.html:710` - `aria-label="{"`
- `labs/day3/lab-08-production.html:742` - `aria-label="{"`
- `labs/day3/lab-08-production.html:753` - `aria-label="{"`
- `labs/day3/lab-08-production.html:764` - `aria-label="{"`
- `labs/day3/lab-08-production.html:1007` - `aria-label="{"`

**Verdict**: **PARTIAL FAIL** -- 83/89 correct (93%), but 6 are regressions.

---

### V2: `<main>` landmark | PASS

| Lab | `<main>` count | `</main>` count | Nav outside main | Verdict |
|-----|---------------|----------------|-----------------|---------|
| 02 | 1 | 1 | Yes (nav:506-519, main:521-1954) | PASS |
| 03 | 1 | 1 | Yes (nav:570-583, main:585-2090) | PASS |
| 04 | 1 | 1 | Yes (nav:872-880, main:887-1637) | PASS |
| 05 | 1 | 1 | Yes | PASS |
| 06 | 1 | 1 | Yes (nav:531-546, main:548-2026) | PASS |
| 07 | 1 | 1 | Yes (nav:688-701, main:703-2200) | PASS |
| 08 | 1 | 1 | Yes (nav:542-555, main:557-2027) | PASS |
| 09 | 1 | 1 | Yes (nav:510-523, main:525-2090) | PASS |

All 8 labs have exactly one `<main>` landmark, all positioned after `</nav>`. Structural semantics are correct.

**Verdict**: **PASS**

---

### V3: localStorage try/catch | FAIL

**Claim**: "localStorage try/catch in 4 labs"

| Lab | localStorage calls | try blocks | Wrapped? | Verdict |
|-----|-------------------|-----------|----------|---------|
| 02 | 0 | N/A | N/A | N/A (no localStorage) |
| 03 | 0 | N/A | N/A | N/A (no localStorage) |
| 04 | **29** | 1 | **NO** -- 1 try/catch is for JSON.parse, not localStorage | **FAIL** |
| 05 | **10** | 1 | **NO** -- same pattern | **FAIL** |
| 06 | 0 | N/A | N/A | N/A (no localStorage) |
| 07 | **30** | 1 | **NO** | **FAIL** |
| 08 | **20** | 1 | **NO** | **FAIL** |
| 09 | 0 | N/A | N/A | N/A |

**Analysis**: Labs 02, 03, 06, 09 have ZERO localStorage calls (the builder may have removed them or they never had them). However, Labs 04, 05, 07, and 08 have a combined **89 raw localStorage calls** that are NOT wrapped in try/catch. The single try/catch in each file is for JSON.parse validation, not localStorage protection.

In Safari private browsing, `localStorage.setItem()` throws a `QuotaExceededError`. Every one of these 89 calls will crash the lab in that environment.

**Verdict**: **FAIL** -- The fix was either never applied or was applied to the wrong labs.

---

### V4: pre overflow-x:auto | PASS

| Lab | overflow-x:auto for pre | Verdict |
|-----|------------------------|---------|
| 03 | Line 562: `pre { overflow-x: auto; }` | PASS |
| 04 | Line 864: `pre { overflow-x: auto; }` | PASS |
| 06 | Line 522: `pre { overflow-x: auto; }` | PASS |
| 07 | Line 681: `pre { overflow-x: auto; }` | PASS |
| 08 | Lines 496-497: code-block + log-block overflow | PASS |
| 09 | Line 502: `pre { overflow-x: auto; }` | PASS |

All 6 labs have `overflow-x: auto` on pre elements. Some also include `-webkit-overflow-scrolling: touch` for iOS momentum scrolling.

**Verdict**: **PASS**

---

### V5: Heading hierarchy | PARTIAL FAIL

**Lab 04**:
- h1 count: 1 (line 889, sr-only) -- PASS for single h1
- h2 count: **0** -- **FAIL**: jumps directly from h1 to h3
- h3 count: 12
- Hierarchy: h1 -> h3 (SKIPS h2 entirely)

**Lab 05**:
- h1 count: 1 (line 1219) -- PASS
- h2 count: 4 -- PASS
- Hierarchy: h1 -> h2 -> (proper)

**All other labs**: Each has exactly 1 h1 and proper h2+ hierarchy.

**Verdict**: **PARTIAL FAIL** -- Lab 04 fixed the duplicate h1 issue but introduced an h1->h3 heading skip. Lab 05 is correctly fixed.

---

## PART 1 SUMMARY

| Verification | Verdict | Notes |
|-------------|---------|-------|
| V1: aria-label | **PARTIAL FAIL** | 6 broken `aria-label="{"` regressions in Labs 04, 08 |
| V2: `<main>` landmark | **PASS** | All 8 labs correct |
| V3: localStorage try/catch | **FAIL** | 89 unprotected calls in Labs 04, 05, 07, 08 |
| V4: pre overflow-x:auto | **PASS** | All 6 labs correct |
| V5: Heading hierarchy | **PARTIAL FAIL** | Lab 04 skips h2 level entirely |

**Fixes verified**: 2/5 PASS, 1/5 FAIL, 2/5 PARTIAL FAIL
**Regressions introduced**: 6 broken aria-labels (new bug from the fix attempt)

---

## PART 2: NEW ISSUE DISCOVERY

### N1: Focus-visible styles | Score: 2/10

**Zero `:focus-visible` styles across all 8 labs.**

Keyboard users have no visual indication of which element has focus. This is a WCAG 2.4.7 violation (Focus Visible, Level AA).

- Labs 02, 03, 04, 05, 07, 09 have some `tabindex` attributes on interactive divs
- Labs 06 and 08 have **zero** tabindex attributes
- None of the 8 labs define `:focus-visible` or `:focus` styles for custom interactive elements

Impact: Keyboard-only users cannot navigate these labs. Given this is an educational product, this is especially problematic for accessibility-conscious institutions.

---

### N2: Form semantics | Score: 2/10

**Zero `<form>` tags across all 8 labs.** Every interactive submission uses raw `onclick` handlers.

| Lab | `<form>` tags | onclick handlers | onclick without role="button" |
|-----|--------------|-----------------|-------------------------------|
| 02 | 0 | 36 | 8 |
| 03 | 0 | 52 | 2 |
| 04 | 0 | 25 | 4 |
| 05 | 0 | 28 | 0 |
| 06 | 0 | 45 | 0 |
| 07 | 0 | 65 | 0 |
| 08 | 0 | 36 | 0 |
| 09 | 0 | 34 | 9 |

**Issues**:
1. Quiz submissions don't use `<form>` + `onsubmit` -- users can't press Enter to submit
2. 23 onclick handlers on non-button elements WITHOUT `role="button"` (Labs 02, 03, 04, 09)
3. Lab 04 architecture boxes (lines 928, 945, 962) have onclick but no role, no tabindex, no keyboard handler -- completely inaccessible to keyboard users
4. Lab 02 has 5 interactive elements (lines 640, 698, 749, 777, 953) that appear to be styled divs with onclick but no role or keyboard support

---

### N3: JavaScript robustness | Score: 4/10

**getElementById without null guards**: 328 instances across all labs.

| Lab | Unguarded getElementById().prop |
|-----|-------------------------------|
| 02 | 63 |
| 03 | 23 |
| 04 | 11 |
| 05 | 89 |
| 06 | 48 |
| 07 | 24 |
| 08 | 45 |
| 09 | 25 |

If any element ID is mistyped, renamed, or conditionally absent, the entire lab crashes with "Cannot read properties of null". No defensive programming.

**innerHTML usage**: 35 instances across labs. While no direct `innerHTML = userInput.value` pattern was found (XSS not exploitable since these are local HTML files), the heavy innerHTML use creates fragile DOM manipulation that could break with malformed content.

**No eval() usage** -- good.

**Event listener pattern**: Low counts (2-6 per lab), no loop-based listener leaks detected.

---

### N4: Cross-browser concerns | Score: 3/10

**backdrop-filter without -webkit- prefix**: Found in ALL 8 labs.

| Lab | backdrop-filter | -webkit-backdrop-filter |
|-----|----------------|----------------------|
| 02 | 2 | 0 |
| 03 | 2 | 0 |
| 04 | 2 | 0 |
| 05 | 1 | 0 |
| 06 | 2 | 0 |
| 07 | 2 | 0 |
| 08 | 2 | 0 |
| 09 | 2 | 0 |

`backdrop-filter` requires `-webkit-backdrop-filter` for Safari < 18 (released Sept 2024). Given this is a course that may be accessed on iPads or older Macs, this will cause visual degradation.

**Total**: 15 backdrop-filter declarations missing webkit prefix.

No `structuredClone` or `replaceAll` usage detected -- good.

---

### N5: Theme / dark mode integrity | Score: 5/10

**Hardcoded colors that bypass CSS variables**:

| Lab | Hardcoded color declarations (not in variable defs) |
|-----|-----------------------------------------------------|
| 02 | 14 |
| 03 | 24 |
| 04 | **58** |
| 05 | 13 |
| 06 | 17 |
| 07 | 20 |
| 08 | 30 |
| 09 | 35 |
| **Total** | **211** |

Lab 04 is the worst offender with 58 hardcoded colors (code syntax highlighting, button colors, etc.). These will NOT respond to theme changes.

The shared `theme-toggle.css` does override some hardcoded backgrounds (e.g., `#050a14`, `#04080f`) using attribute selectors, but this is fragile -- any new hardcoded color requires a corresponding override.

**No `prefers-color-scheme`** media query in any lab (0/8). The theme defaults to dark with no system preference detection in the HTML. The shared `theme-toggle.js` does handle this via JS, but there's a FOUC (Flash of Unstyled Content) risk since the JS is deferred.

---

### N6: Missing skip-to-content links | Score: 1/10

**Zero skip-to-content links across all 8 labs.** This is a WCAG 2.4.1 violation (Bypass Blocks, Level A).

Keyboard users must tab through the entire navigation on every page load before reaching content. With 8 labs each having multi-section navigation, this is a significant barrier.

---

### N7: Buttons without type attribute | Score: 1/10

**265 buttons across all 8 labs. ZERO have a `type` attribute.**

Without `type="button"`, browsers default to `type="submit"`. If any button is ever placed inside a `<form>` element, it will trigger form submission instead of its onclick handler. While there are currently no `<form>` elements (see N2), this is a ticking time bomb -- the moment someone wraps content in a form for proper semantics, every button breaks.

This is also a lint/validator warning that signals low code quality.

---

### N8: Lab 04 heading hierarchy gap (NEW from V5 fix)

Lab 04 has 12 `<h3>` elements but zero `<h2>` elements. The heading hierarchy jumps from `<h1>` (sr-only) directly to `<h3>`. Screen readers and document outliners will flag this as a structural error. This appears to be a regression from the Round 2 fix that addressed the duplicate h1 issue -- the builder removed extra h1s but didn't promote section headings to h2.

---

## PART 2 SUMMARY

| Dimension | Score | Critical Finding |
|-----------|-------|-----------------|
| N1: Focus-visible | 2/10 | Zero :focus-visible styles in 8 labs |
| N2: Form semantics | 2/10 | Zero `<form>` tags, 23 onclick without role="button" |
| N3: JS robustness | 4/10 | 328 unguarded getElementById calls |
| N4: Cross-browser | 3/10 | 15 backdrop-filter missing -webkit- prefix |
| N5: Theme integrity | 5/10 | 211 hardcoded colors bypass CSS variables |
| N6: Skip-to-content | 1/10 | Zero skip links (WCAG Level A violation) |
| N7: Button types | 1/10 | 265 buttons without type="button" |
| N8: Heading regression | N/A | Lab 04 h1->h3 skip (from V5 fix) |

---

## FINAL SCORE

### Scoring Breakdown

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| V1-V5: Fix verification (2 PASS, 1 FAIL, 2 PARTIAL) | 40% | 4.0/10 | 1.60 |
| N1: Focus-visible | 8% | 2/10 | 0.16 |
| N2: Form semantics | 8% | 2/10 | 0.16 |
| N3: JS robustness | 8% | 4/10 | 0.32 |
| N4: Cross-browser | 8% | 3/10 | 0.24 |
| N5: Theme integrity | 8% | 5/10 | 0.40 |
| N6: Skip-to-content | 8% | 1/10 | 0.08 |
| N7: Button types | 8% | 1/10 | 0.08 |
| N8: Heading regression | 4% | 2/10 | 0.08 |

### **FINAL SCORE: 3.12 / 10**

This is LOWER than Round 2's 5.75. The builder introduced regressions (6 broken aria-labels, heading skip), failed to actually implement the localStorage fix, and the codebase has deep structural accessibility problems that were never addressed.

---

## PRIORITIZED FIX LIST FOR ROUND 4

### P0 - CRITICAL (must fix before any deployment)

1. **Fix 6 broken `aria-label="{"` regressions** in Labs 04 (1 instance) and 08 (5 instances). Replace with descriptive labels like "Tool schema JSON input" or "Permission config JSON input".

2. **Wrap ALL localStorage calls in try/catch** in Labs 04, 05, 07, 08. Create a helper function:
   ```javascript
   function safeStorage(op, key, value) {
     try {
       return op === 'get' ? localStorage.getItem(key) : localStorage.setItem(key, value);
     } catch(e) { return null; }
   }
   ```
   Replace all 89 raw calls with this helper.

3. **Add `type="button"` to all 265 buttons** across all 8 labs. This is a one-line regex fix.

4. **Add skip-to-content link** to all 8 labs (WCAG Level A):
   ```html
   <a href="#main-content" class="skip-link">Skip to content</a>
   ```

### P1 - HIGH (required for accessibility compliance)

5. **Add `:focus-visible` styles** to all labs. At minimum:
   ```css
   :focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; }
   ```

6. **Fix Lab 04 heading hierarchy**: Promote the 12 `<h3>` section headings to `<h2>`.

7. **Add `role="button"`, `tabindex="0"`, and keyboard handlers** to the 23 onclick elements that lack them (Labs 02, 03, 04, 09).

### P2 - MEDIUM (quality improvement)

8. **Add `-webkit-backdrop-filter`** alongside all 15 `backdrop-filter` declarations.

9. **Replace hardcoded colors with CSS variables** in the 211 declarations that bypass theming. Priority: Lab 04 (58), Lab 09 (35), Lab 08 (30).

10. **Add null guards to getElementById calls** -- at minimum for the most critical paths (quiz submission, XP tracking). A helper function:
    ```javascript
    function $(id) { return document.getElementById(id); }
    ```
    with null-safe property access.

### P3 - LOW (polish)

11. **Consider wrapping quiz interactions in `<form>` elements** with proper `onsubmit` handlers so Enter key works for submission.

12. **Add FOUC prevention** for theme: inline a minimal `<script>` in `<head>` (before CSS) to set `data-theme` attribute before first paint.

---

## CONCLUSION

The Round 2 fixes were partially applied. Two verifications passed cleanly (main landmark, pre overflow), but the aria-label fix introduced regressions, the localStorage fix was never actually implemented, and the heading fix created a new hierarchy gap. Beyond the claimed fixes, the codebase has systemic accessibility problems (no focus styles, no skip links, no button types, no form semantics) that place it well below WCAG AA compliance.

**Production readiness**: NOT READY. The 265 typeless buttons and zero focus-visible styles alone disqualify this from production deployment at any accessibility-conscious institution.
