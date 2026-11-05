# [Site Name] Design & Build Specification

**A people-connecting website that is blue, warm, welcoming, clear, and does not look AI-generated.**

| | |
|---|---|
| **Version** | 3.0 (fact-checked build spec) |
| **Date** | 4 November 2026 |
| **Replaces** | v2 "research-backed design guide" |
| **Audience** | Designers, front-end developers, product managers, and AI coding tools building the site |
| **Status of evidence** | Every research claim re-checked against the primary source or the closest available record. Corrections are listed in §1 and fully logged in Appendix A. |

---

## Table of contents

- [0. How to use this document](#0-how-to-use-this-document)
- [1. What the fact check changed](#1-what-the-fact-check-changed)
- [2. The evidence, rated](#2-the-evidence-rated)
- [3. Design principles](#3-design-principles)
- [4. What "looks AI-generated" means, and the avoid list](#4-what-looks-ai-generated-means-and-the-avoid-list)
- [5. Color system](#5-color-system)
- [6. Typography](#6-typography)
- [7. Layout, grid and spacing](#7-layout-grid-and-spacing)
- [8. Shape, borders and elevation](#8-shape-borders-and-elevation)
- [9. Icons, photography, avatars and illustration](#9-icons-photography-avatars-and-illustration)
- [10. Motion](#10-motion)
- [11. Components](#11-components)
- [12. Page-by-page specifications](#12-page-by-page-specifications)
- [13. Content and microcopy](#13-content-and-microcopy)
- [14. Trust, safety and honest design](#14-trust-safety-and-honest-design)
- [15. Accessibility specification (WCAG 2.2 AA)](#15-accessibility-specification-wcag-22-aa)
- [16. Performance](#16-performance)
- [17. Implementation kit (copy-paste code)](#17-implementation-kit-copy-paste-code)
- [18. QA and acceptance tests](#18-qa-and-acceptance-tests)
- [19. Prompt for AI coding tools](#19-prompt-for-ai-coding-tools)
- [20. References](#20-references)
- [Appendix A. Full fact-check log](#appendix-a-full-fact-check-log)
- [Appendix B. Full contrast matrix](#appendix-b-full-contrast-matrix)

---

## 0. How to use this document

### 0.1 Requirement keywords
This spec uses three levels, in the style of RFC 2119:

| Keyword | Meaning |
|---|---|
| **MUST** | Required. Shipping without it is a bug. Most MUSTs are accessibility, safety, or honesty requirements. |
| **SHOULD** | Strong default. Deviate only with a written reason. |
| **MAY** | Optional; use judgment. |

### 0.2 How evidence is labelled
Each recommendation carries an evidence tag so the team knows how hard to hold it:

| Tag | Meaning |
|---|---|
| 🟢 **Strong** | A standard (W3C) or several consistent studies. |
| 🟡 **Moderate** | One well-designed study, or a large practitioner study (e.g. NN/g eyetracking). |
| 🟠 **Limited** | Small samples, mixed results, or findings contested by later work. Use as direction, not proof. |
| ⚪ **Practice** | Widely used professional convention or expert guidance without a specific controlled study. |
| 🔵 **Decision** | A design choice made for this brand. Changeable, but change it everywhere. |

### 0.3 Where to start, by role

| You are… | Read first |
|---|---|
| A developer setting up the project | §17 (copy the tokens and base CSS), then §11 components |
| A designer | §3, §5, §6, §9, then §12 pages |
| A PM or content writer | §3, §12, §13, §14 |
| QA | §15, §18 |
| An AI coding tool | §19 (paste the prompt), then §17 and §11 |

### 0.4 Files that come with this spec
- `design-guide.md` (this file)
- `tokens.css` (the CSS custom properties from §17.1, ready to import)

---

## 1. What the fact check changed

Short version of Appendix A. Everything not listed here was confirmed.

| # | v2 said | Verdict | v3 says |
|---|---|---|---|
| 1 | Body text 16–18px is backed by Rello et al. (2016); "below 16px goes against the evidence." | **Corrected** | Rello et al. measured in **points**. CSS defines 1pt = 1.333px, and the authors' own CHI presentation equates 18pt with 24px. So 16px ≈ 12pt, which was one of the sizes with *lower* comprehension. v3 raises body text to **18px** for interface text and **20–24px** for long reading (§6). |
| 2 | Input borders use Sand `#E7E1D8`. | **Corrected (accessibility failure)** | Sand is 1.23:1 on Paper. WCAG 1.4.11 needs 3:1 for boundaries that identify a control. v3 adds **Stone `#857E75`** (3.78:1 on Paper) for input and control borders. Sand stays for decorative dividers only. |
| 3 | Apricot notification dots. | **Corrected (accessibility failure)** | Apricot is 2.53:1, failing 1.4.11 for meaningful indicators. Unread badges and dots now use **Clay `#B4512B`** (4.77:1) and always include a count or text alternative. Apricot is decoration only. |
| 4 | Dark mode reused light-mode success/error colors. | **Corrected** | Dark-mode Moss and Brick were never defined, so error text would have been unreadable. v3 defines `#6FC29B` and `#F08A7A` (both ≥7:1). |
| 5 | Passive scrolling lowers well-being; active use doesn't (Verduyn et al., 2015). | **Qualified** | The 2015 experiment is real, but a 2022 review of 40 survey studies (Valkenburg et al.) found the active/passive pattern was **mostly not** supported and recommends looking at content, intimacy and private vs public use instead. v3 keeps "design for direct, private connection," labelled 🟠 Limited. |
| 6 | Good typography induces a good mood and improves creative tasks (Larson & Picard). | **Qualified** | Two studies of 20 people each. Mood was **inferred**, not directly measured. Reading felt shorter in both studies, but the cognitive benefit appeared in only one of the two (candle task yes, remote-associates task not significant). Paper is undated (c. 2005). Labelled 🟠 Limited. |
| 7 | Sans-serifs are "more casual and neutral" (Shaikh et al., 2006). | **Corrected attribution** | In the *Usability News* survey, sans-serifs were **neutral** (no extreme traits) and serifs were rated stable, practical, mature, formal. "Casual" comes from a separate 2006 HFES paper by the same team on ClearType fonts. Both are now cited. |
| 8 | Tap targets at least 44×44px (implied WCAG requirement). | **Clarified** | WCAG 2.2 **AA** minimum is **24×24 CSS px** (SC 2.5.8). 44×44 is the stricter **AAA** level (SC 2.5.5). v3 keeps 44px as the target and labels it correctly. |
| 9 | "Reputable newsletters" on AI design tells: 925 Studios, Glitch. | **Downgraded** | These are agency/tool blogs, not reputable newsletters. The core list is backed by **Anthropic's own article** (12 Nov 2025). Other commentary is labelled as industry commentary. |
| 10 | Dyson & Haselgrove: ~55 characters per line is best. | **Qualified** | Correct for the balance of speed and comprehension, but related studies found long lines (95–100 cpl) can be read *faster*, and stated preferences vary (one study: moderate lines rated easiest; another: people preferred the extremes). v3 keeps ~60ch as a comprehension and comfort choice, labelled 🟡 Moderate. |
| 11 | Infinite scroll causes regretted sessions (Rixen 2023; Meinhardt 2025). | **Re-worded** | Rixen et al. (N=46, one week) found scrolling-dominated sessions were rated **less positively** than posting or story sessions and described a habitual "loop." Regret comes from earlier work they review. Wording now matches. |
| 12 | Tailwind default blue `#3B82F6` / indigo `#6366F1`. | **Clarified** | Those are **Tailwind v3** values. Tailwind v4 rebuilt the palette in OKLCH, so v4 shades differ slightly. Avoid both versions' defaults. |
| 13 | Google Fonts URL for Fraunces with SOFT/WONK axes. | **Not live-tested** | The build environment blocks Google Fonts, so the URL couldn't be loaded here. The axis ranges were verified on the font's official repository. v3 adds a self-hosting option (Fontsource) and a test step in §18. |
| 14 | Kurosu & Kashimura found aesthetics drive perceived usability. | **Confirmed, with nuance** | Beauty and apparent usability correlated at 0.589 across 26 ATM layouts and 252 raters. Notably, **familiarity** correlated even more strongly (0.730) with apparent usability, which supports the "familiar structure" principle. |
| 15 | NN/g flat design study. | **Confirmed, details added** | Kate Moran (2017): 71 users, 9 pages; weak signifiers took 22% longer and produced 25% more fixations. Harm was smallest on simple, traditional, high-contrast pages. |

---

## 2. The evidence, rated

Every finding below was checked. Numbers in brackets refer to §20.

| Finding | Source | Evidence | Implication |
|---|---|---|---|
| People rate a page's visual appeal within **50 ms**, and those ratings correlate highly with ratings after 500 ms. | Lindgaard et al., 2006 [1] | 🟡 | The first screen is judged before anything is read. Get palette, type and layout right at the top of every page. |
| Low **visual complexity** and high **prototypicality** (looking like what people expect for the category) produce the highest appeal; effects appear within 17–50 ms. Complexity acts first; familiarity catches up by 50 ms. | Tuch et al., 2012 [2] | 🟡 | Simple and familiar in structure; distinctive in surface. Do not "solve" AI sameness with strange layouts. |
| Across 26 ATM layouts rated by 252 people, beauty correlated 0.589 with *apparent* usability, while most *inherent* usability measures did not; familiarity correlated 0.730. | Kurosu & Kashimura, 1995 [3] | 🟡 (correlational) | Looks shape perceived ease of use. Familiar patterns feel easier. |
| A more attractive ATM interface was rated more usable even after use; actual usability didn't change post-use aesthetic ratings. | Tractinsky et al., 2000 [4] | 🟡 | Visual quality has lasting effects on perception. |
| Attractive design makes people forgive **minor** usability problems, not major ones, and can **hide** problems during testing. | Moran, NN/g, 2024 [5] | ⚪ | Invest in visuals, but test by watching behavior, not by asking opinions. |
| Weak clickability signifiers: **22% longer** to find targets, **25% more fixations** (71 users, 9 pages). Harm smallest on simple, traditional, high-contrast pages. | Moran, NN/g, 2017 [6] | 🟡 | Buttons look like buttons; links look like links. |
| Readability (eye fixation duration) improved up to **18 pt**; comprehension was **lower at 10 and 12 pt** than at 18 pt. Line spacing 0.8× hurt comprehension; 1.8× was rated worse. N=104, Arial, Wikipedia text. | Rello, Pielot & Marcos, 2016 [7] | 🟡 | 18px minimum for body copy, 20–24px for long reading. Normal-to-generous line height (~1.5). |
| On screen, ~**55 cpl** gave the best balance of reading speed and comprehension; very long lines (95–100 cpl) may be read faster, and preferences differ between studies. | Dyson & Haselgrove, 2001 [8]; Dyson & Kipping, 1998 [9]; Shaikh & Chaparro, 2005 [10] | 🟡 | Cap paragraphs at ~60ch. |
| Across 50 well-typeset sites, line-height ÷ font-size averaged **1.48**. | Smashing Magazine, 2009 [11] | ⚪ | Body line height ~1.5. |
| Reading well-typeset text made time feel shorter (both studies) and helped one creative task (one of two studies). | Larson & Picard, c. 2005 [12]; Larson et al., 2007 [13] | 🟠 | Quality typography is part of "feeling welcoming." Not proof of productivity gains. |
| People attribute personality to typefaces: serifs rated stable, mature, formal; sans-serifs neutral (one study) or casual (another). | Shaikh, Chaparro & Fox, 2006 [14][15] | 🟡 | Pick fonts whose personality matches "warm and trustworthy." |
| A typeface whose personality fits the content changes how quickly and how emotionally text is processed. | Hazlett et al., 2013 [16] | 🟡 | Don't pair cheerful copy with cold type, or vice versa. |
| A **blue** scheme was rated most trustworthy and **black** least, but color's effect was significant and **limited** relative to other trust cues. | Alberts & van der Geest, 2011 [17]; Sasidharan & Dhanesh, 2007 (pilot) [18] | 🟡 | Blue is a sound base for a people site. Color alone will not create trust. |
| Hue, saturation and lightness each shape perceived brand personality; blue is associated with competence. | Labrecque & Milne, 2012 [19] | 🟡 (full text not accessible here; title and abstract verified) | Tune blue's saturation and lightness deliberately. |
| Users look at **photos of real people** and information-carrying images, and ignore generic stock and decorative images. | Nielsen, NN/g, 2010 (eyetracking) [20] | 🟡 | Real member photos; no stock people. |
| In a lab experiment and a 6-day field study, **passive** Facebook browsing predicted lower affect via envy; active use did not. | Verduyn et al., 2015 [21]; summarized by the same group in 2021 [35] | 🟡 for the study itself | Lean toward direct interaction… |
| …but a review of 40 survey studies found the active/passive hypotheses were **mostly not** supported and recommends studying content, intimacy, and private vs public use. | Valkenburg, van Driel & Beyens, 2022 [22] | 🟢 (review) | …so the defensible rule is: **favor private, direct, intimate interactions over public broadcasting and comparison.** 🟠 overall |
| Scrolling-dominated sessions were rated less positively than posting/story sessions; infinite scroll creates habitual "loops." | Rixen et al., 2023 [23]; Meinhardt et al., 2025 [36] | 🟠 (N=46; N=72) | Provide natural stopping points. |
| Infinite scroll suits aimless browsing of uniform items; it hurts refinding, footer access, keyboard and screen-reader users. "Load more" and pagination are alternatives. | Neusesser, NN/g, 2022 [24] | ⚪ | Use "Show more" for people lists. |
| Progressive disclosure improves learnability, efficiency and error rate; more than **two** levels usually hurts. | Nielsen, NN/g, 2006 [25] | ⚪ | Ask for little at sign-up; keep settings two levels deep max. |
| Empty states should communicate status, teach, and provide a direct path to the key task; in-context help beats up-front tutorials. | Kaplan, NN/g, 2021 [26] | ⚪ | Every empty screen has a reason and one action. |
| 1,818 dark-pattern instances on 1,254 of ~11K shopping sites (~11.1%), in 15 types, including fake activity notifications, countdown timers, confirmshaming. | Mathur et al., 2019 [27] | 🟢 | Ban these patterns (§14). |
| Practitioners' dark patterns fall into nagging, obstruction, sneaking, interface interference, forced action. | Gray et al., 2018 [28] | 🟡 | Use as a review checklist. |
| Without guidance, models default to Inter-type fonts, purple gradients on white, minimal animation and predictable layouts ("distributional convergence"). | Anthropic, 2025 [29] | ⚪ (vendor's own analysis) | This is the "AI look" to avoid. |
| Text needs 4.5:1 contrast (3:1 large); UI component boundaries and states need 3:1; targets at least 24×24 CSS px (AA). | W3C WCAG 2.2 [30][31][32] | 🟢 | Hard requirements (§15). |

---

## 3. Design principles

These five principles resolve most decisions. When two options both seem fine, pick the one that better serves the principle higher on this list.

1. **Safe before clever.** People are meeting strangers. Trust, safety controls and honesty outrank engagement and visual flair. 🟢 [27][28]
2. **Clear before beautiful, but make it beautiful.** Every screen answers *Where am I? What can I do? What happens next?* Then polish, because people judge in 50 ms and forgive small flaws in attractive designs. 🟡 [1][5]
3. **Familiar structure, distinctive surface.** Standard navigation, forms and page anatomy. Personality comes from color, type, real photography, copy and detail. 🟡 [2][3]
4. **Real over generic.** Real people, real numbers, real places, specific words. Nothing fabricated, nothing that could be any other product. 🟡 [20][27]
5. **Toward each other, not toward the feed.** The product's job is to get two people talking, not to keep one person scrolling. 🟠 [21][22][23]

---

## 4. What "looks AI-generated" means, and the avoid list

### 4.1 Why it happens
Anthropic's design write-up explains that, without direction, a model drifts toward the most common choices in its training data, which it calls distributional convergence. The result it names: Inter-style fonts, purple gradients on white backgrounds, minimal animation and predictable layouts [29]. Industry commentary adds three rounded feature cards, glass cards, centered heroes and vague headlines [33][34] (these are agency and tool blogs, so treat them as observation, not research).

**The fix is not novelty. It is deliberate choice.** Tuch et al. showed people prefer familiar structures [2], so the goal is to replace each *default* with a *decision*, not to be weird.

### 4.2 Avoid list (MUST NOT, unless a written reason exists)

**Color and surface**
- Purple, violet or indigo gradients anywhere; blue-to-purple gradients especially [29]
- Gradient text (`background-clip: text`)
- Blurred color blobs or glowing orbs behind content
- Glassmorphism (frosted translucent panels with white hairline borders)
- Framework default blues and indigos as the brand color: Tailwind v3 `#3B82F6` / `#6366F1`, or their Tailwind v4 OKLCH equivalents, Bootstrap `#0D6EFD`
- Pure `#FFFFFF` page background with cool slate-gray text
- Neon glows in dark mode
- One identical radius and one identical large soft shadow on every element

**Layout**
- The default hero: centered headline, one-line subhead, two buttons ("Get started" / "Learn more"), screenshot below
- A row of three (or four) feature cards, each with an icon in a rounded square, a title and two lines of text
- Bento grids without a content reason
- Stat bands ("10K+ users · 99% satisfaction") unless the numbers are real, current and sourced
- Logo walls without real partners
- Pill badge above the headline ("✨ Now in beta")
- Every section centered, every section the same height and padding
- Fade-up-on-scroll on every block

**Type**
- Inter, Roboto, Arial, Open Sans, Lato, Poppins, Montserrat or system-ui as the *display* face [29]
- One family, two weights, no personality
- Huge tight headlines over small gray body text

**Imagery**
- Stock photos of people, AI-generated people, "Corporate Memphis" flat illustrations [20]
- Sparkle/magic icons
- Decorative icons that add no information

**Copy**
- Unlock, unleash, elevate, empower, seamless, supercharge, revolutionize, journey, game-changer, next-level, effortless, cutting-edge
- Headlines that could sell any product ("Connect like never before")
- Three-word slogans ("Meet. Connect. Grow.")
- Emoji bullet points
- Fake testimonials, fake counts, fake "someone just joined" notifications [27]

### 4.3 The "swap test"
Before any page ships: replace the logo and name with a competitor's. If nothing else on the page would need to change, it is generic. Change something that only *this* product could say or show.

---

## 5. Color system

### 5.1 Strategy
- **Blue for trust.** Blue rated most trustworthy in a controlled comparison, though the effect is modest [17]. 🟡
- **Warm neutrals for welcome.** Cream and sand backgrounds instead of white and slate. 🔵 Decision (no direct study; this is the brand's main differentiator from generic blue sites).
- **Navy, not black.** Black was the least trusted scheme [17]; navy keeps contrast high without harshness. 🟡
- **One warm accent, used sparingly.** Apricot/clay for warmth and attention. 🔵

### 5.2 Light mode tokens

| Token | Name | Hex | Role | Allowed uses |
|---|---|---|---|---|
| `--paper` | Paper | `#FBF8F3` | Page background | Body background |
| `--card` | Card | `#FFFDF9` | Raised surfaces | Cards, inputs, modals, menus |
| `--mist` | Mist | `#E9EFF7` | Tinted surface | Selected rows, info panels, tags, hover backgrounds |
| `--sand` | Sand | `#E7E1D8` | Decorative line | Dividers, card outlines, disabled fills. **Never** the only boundary of an input or control |
| `--stone` | Stone | `#857E75` | Control boundary | Input, checkbox, radio, toggle-track and select borders |
| `--ink` | Ink | `#16243A` | Primary text | Headings, body, icons |
| `--driftwood` | Driftwood | `#6B6660` | Secondary text | Metadata, helper text, timestamps, placeholders |
| `--harbor` | Harbor | `#2456A6` | Primary | Primary buttons, links, focus rings, active nav, selected states |
| `--harbor-deep` | Deep Harbor | `#1A4280` | Primary pressed | Hover/pressed states, text on Mist |
| `--on-harbor` | — | `#FFFFFF` | Text on primary | Labels on Harbor and Deep Harbor |
| `--sky` | Sky | `#A9C2E4` | Soft blue fill | Initials avatars, illustration fills. Not for text |
| `--apricot` | Apricot | `#E8835A` | Decorative accent | Illustration, small decorative highlights. **Never** text or meaningful indicators |
| `--apricot-tint` | — | `#F6E7DF` | Warm tint | "New" banners, highlight panels |
| `--clay` | Clay | `#B4512B` | Accent, readable | Unread badges and dots, accent text |
| `--on-clay` | — | `#FFFFFF` | Text on Clay | Badge counts |
| `--moss` | Moss | `#2F7D5B` | Success | Success text and icons |
| `--moss-tint` | — | `#E3F1EA` | Success surface | Success banners |
| `--brick` | Brick | `#B3402F` | Error / danger | Error text and icons, destructive buttons |
| `--brick-tint` | — | `#F8E4E0` | Error surface | Error banners, error summary |
| `--on-danger` | — | `#FFFFFF` | Text on Brick | Destructive button labels |

### 5.3 Dark mode tokens

Dark mode is optional for launch but, if shipped, **MUST** use all of these (not just the background and text).

| Token | Hex | Notes |
|---|---|---|
| `--paper` | `#101A2A` | Deep navy, not black |
| `--card` | `#17243A` | |
| `--mist` | `#1E3050` | |
| `--sand` | `#2A3A55` | Decorative only |
| `--stone` | `#6A7B97` | 4.07:1 on paper, 3.62:1 on card |
| `--ink` | `#EEE9E1` | Warm off-white |
| `--driftwood` | `#A8A39B` | |
| `--harbor` | `#7FA7E0` | Lighter blue for dark backgrounds |
| `--harbor-deep` | `#A3C0EA` | Hover = lighter in dark mode |
| `--on-harbor` | `#101A2A` | **Dark** text on the light blue. White on `#7FA7E0` fails. |
| `--sky` | `#3D5A85` | Initials use `--ink` (5.79:1) |
| `--apricot` | `#F0A07E` | |
| `--apricot-tint` | `#3A2A22` | |
| `--clay` | `#F0A07E` | |
| `--on-clay` | `#101A2A` | |
| `--moss` | `#6FC29B` | |
| `--moss-tint` | `#1F3A30` | |
| `--brick` | `#F08A7A` | |
| `--brick-tint` | `#3A2226` | |
| `--on-danger` | `#101A2A` | |

### 5.4 Contrast results (computed)
All ratios computed with the WCAG 2 relative-luminance formula. Full matrix in Appendix B.

**Text (needs 4.5:1, or 3:1 for large text ≥24px regular / ≥18.66px bold)** [30]

| Pair | Light | Dark |
|---|---|---|
| Ink on Paper | 14.71 ✅ | 14.44 ✅ |
| Ink on Card | 15.34 ✅ | 12.87 ✅ |
| Driftwood on Paper | 5.37 ✅ | 6.96 ✅ |
| Driftwood on Card | 5.59 ✅ | 6.21 ✅ |
| Driftwood on Mist | 4.91 ✅ | 5.26 ✅ |
| Harbor (link) on Paper | 6.70 ✅ | 7.07 ✅ |
| Harbor on Card | 6.99 ✅ | 6.30 ✅ |
| Harbor on Mist | 6.14 ✅ | 5.34 ✅ |
| On-harbor on Harbor (button) | 7.10 ✅ | 7.07 ✅ |
| On-harbor on Deep Harbor (hover) | 9.84 ✅ | 9.38 ✅ |
| Deep Harbor on Mist (tag) | 8.50 ✅ | 7.08 ✅ |
| Clay on Paper | 4.77 ✅ | 8.34 ✅ |
| On-clay on Clay (badge) | 5.06 ✅ | 8.34 ✅ |
| Moss on Paper | 4.71 ✅ | 8.20 ✅ |
| Brick on Paper | 5.37 ✅ | 7.17 ✅ |
| On-danger on Brick | 5.69 ✅ | 7.17 ✅ |
| Ink on Sky (initials) | 8.55 ✅ | 5.79 ✅ |
| Ink on any tint | ≥12.7 ✅ | ≥10.1 ✅ |
| **Apricot on Paper** | **2.53 ❌ never text** | — |

**Non-text (needs 3:1 for control boundaries, states, focus indicators and meaningful icons)** [31]

| Pair | Light | Dark |
|---|---|---|
| Stone border on Paper | 3.78 ✅ | 4.07 ✅ |
| Stone border on Card | 3.95 ✅ | 3.62 ✅ |
| Harbor focus ring on Paper | 6.70 ✅ | 7.07 ✅ |
| Clay unread dot on Paper | 4.77 ✅ | 8.34 ✅ |
| Moss icon on Moss tint | 4.29 ✅ | 5.78 ✅ |
| Brick icon on Brick tint | 4.65 ✅ | 6.00 ✅ |
| Clay icon on Apricot tint | 4.19 ✅ | 6.54 ✅ |
| **Sand border on Paper** | **1.23 ❌ decorative only** | 1.52 ❌ |
| **Apricot dot on Paper** | **2.53 ❌ decorative only** | — |

**Status-banner rule:** banner *text* is always Ink; the status color is used for the icon and a 4px left border. (Clay text on Apricot tint is only 4.19:1, below 4.5.)

### 5.5 Usage rules
1. **MUST** keep all text pairs at or above the ratios in §5.4. Adding a new pair means computing it first.
2. **MUST NOT** convey meaning with color alone (unread, error, selected, online). Add text, an icon, a count or a weight change. 🟢 WCAG 1.4.1
3. **SHOULD** follow roughly 60% warm neutrals, 30% blues, ≤10% accent per screen. ⚪ Practice (the 60/30/10 rule is a design convention, not research).
4. **SHOULD** use one solid Harbor button per view. Secondary actions are outlined or text. This keeps complexity low [2]. 🟡
5. **MUST NOT** use gradients on buttons, backgrounds or text. 🔵
6. **MUST NOT** add new blues. If a new shade seems needed, it is probably a state of an existing token. 🔵
7. **SHOULD** keep large areas calm (Paper, Card) so member photos carry the color. 🔵

### 5.6 Color do / don't

| Do | Don't |
|---|---|
| Paper background, Ink text | White background, `#64748B` slate text |
| Harbor primary button with white label | Blue-to-purple gradient button |
| Clay badge with a count: "3" | Apricot dot with no text alternative |
| Error: Brick icon + Brick text + message | Red border only |
| Selected tag: solid Harbor + check icon | Selected tag: slightly different blue only |

---

## 6. Typography

### 6.1 What the research supports (and doesn't)
- **Size matters most.** In Rello et al. (N=104), eye-fixation readability improved up to 18pt and comprehension was significantly lower at 10–12pt than at 18pt [7]. Points vs pixels: CSS defines 1pt = 1.333px, and the authors' CHI presentation equates 18pt with 24px. Their test used Arial on Wikipedia articles, i.e. long reading. 🟡
- **Line spacing:** default (1.2×) through 1.4× and probably 1.5× are fine; 0.8× hurt comprehension and 1.8× was rated worse [7]. 🟡
- **Line length:** ~55 characters balanced speed and comprehension; very long lines can be read faster, and preferences differ between studies [8][9][10]. 🟡
- **Personality:** serifs read as stable and mature; sans-serifs as neutral or casual [14][15]; fitting personality to content changes emotional processing [16]. 🟡
- **Quality and mood:** well-set type made reading feel shorter (small studies) [12][13]. 🟠
- **Not researched:** no study tested Fraunces or Figtree specifically. The picks below are 🔵 decisions informed by the findings above.

### 6.2 Typefaces

| Role | Family | Source / license | Why |
|---|---|---|---|
| Display & headings | **Fraunces** (variable: `opsz` 9–144, `wght` 100–900, `SOFT` 0–100, `WONK` 0–1) | Google Fonts, SIL OFL | A serif for stability and trust [14], with the SOFT axis rounding its terminals for warmth. Not a convergence default [29]. |
| Body & UI | **Figtree** (variable `wght`, by Erik Kennedy) | Google Fonts, SIL OFL | Geometric sans with rounded terminals and open apertures; neutral and legible [14] without being Inter. |

**Fraunces axis notes (verified on the official repository)**
- `SOFT` 100 gives the softest, rounded forms. Its effect is strongest at smaller optical sizes, so check headings visually at each size.
- `WONK` defaults to on above opsz 18 (leaning n, m, h). Set it to 0 for calmer, more readable headings.
- The repository's default weight is 900; always set `font-weight` explicitly.

**Alternative pairings** (pick one family pair for the whole product)

| Feel | Headings | Body | Notes |
|---|---|---|---|
| Cozy, bookish | Newsreader | Figtree | Softer than Fraunces, more editorial |
| Friendly, all-sans | Nunito 700–800 | Atkinson Hyperlegible Next | Atkinson Next is variable 200–800, designed with the Braille Institute for low-vision legibility |
| Modern with character | Bricolage Grotesque | Figtree | More energetic; check it stays warm |
| Maximum accessibility | Lexend | Lexend | Very clear; less personality |

### 6.3 Loading fonts

**Option A: Google Fonts (quickest)**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400..700;1,400..700&family=Fraunces:opsz,wght,SOFT,WONK@9..144,500..700,100,0&display=swap">
```
The Fraunces part requests optical sizes 9–144, weights 500–700, SOFT fixed at 100 and WONK fixed at 0. **Test it in a browser before relying on it** (§18, test T-TYPE-1); the URL could not be loaded from the environment this spec was written in.

**Option B: self-host with Fontsource (recommended for production)**
```bash
npm install @fontsource-variable/fraunces @fontsource-variable/figtree
```
```js
// in your app entry
import '@fontsource-variable/fraunces/full.css'; // includes SOFT & WONK axes
import '@fontsource-variable/figtree';
```
Then use `font-family: 'Fraunces Variable'` and `'Figtree Variable'`. Check the package README for the exact import path that includes all axes, since naming can change between versions.

**Fallback stacks** (what shows while fonts load, or if they fail)
```css
:root {
  --font-display: 'Fraunces', 'Fraunces Variable', Georgia, 'Times New Roman', serif;
  --font-body: 'Figtree', 'Figtree Variable', ui-sans-serif, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
```
Fallbacks are allowed here; the rule against Roboto/Arial applies to the *chosen* face, not emergency fallbacks.

### 6.4 Type scale

Sizes use `rem` so they follow the user's browser setting (WCAG 1.4.4). Fluid sizes use `clamp()`; test at 200% zoom.

| Token | Use | Size | Line height | Weight | Family |
|---|---|---|---|---|---|
| `--text-display` | Landing hero only | `clamp(2.5rem, 1.8rem + 3.2vw, 4rem)` (40→64px) | 1.08 | 600 | Fraunces |
| `--text-h1` | Page titles | `clamp(2.125rem, 1.6rem + 2.2vw, 3.25rem)` (34→52px) | 1.12 | 600 | Fraunces |
| `--text-h2` | Section titles | `clamp(1.625rem, 1.4rem + 1vw, 2.125rem)` (26→34px) | 1.2 | 600 | Fraunces |
| `--text-h3` | Card and sub-section titles | `clamp(1.25rem, 1.15rem + 0.4vw, 1.5rem)` (20→24px) | 1.3 | 600 | Fraunces |
| `--text-h4` | Small headings, list group labels | 1.125rem (18px) | 1.35 | 650 | Figtree |
| `--text-long` | Long reading: bios, posts, guides, about, policies | 1.25rem (20px); MAY go to 1.5rem (24px) on reading-only pages | 1.6 | 400 | Figtree |
| `--text-body` | Default body and UI copy | **1.125rem (18px)** | 1.5 | 400 | Figtree |
| `--text-ui` | Buttons, inputs, tabs, nav labels | 1rem (16px) | 1.25 | 600 (buttons), 400 (inputs: 1.0625rem/17px recommended) | Figtree |
| `--text-meta` | Timestamps, helper text, captions | 0.9375rem (15px) | 1.4 | 500 | Figtree |
| `--text-min` | Absolute floor (legal footers, badge counts) | 0.875rem (14px) | 1.3 | 600 | Figtree |

**Why 18px body and not 24px?** The 18pt (≈24px) finding came from long article reading [7]. Most of this site is short interface text, where 18px is a practical compromise. Anything people read for more than a few lines uses `--text-long` (20px+). 🟡 + 🔵

**Input font size:** at least 16px; below that, iOS Safari zooms the page on focus. ⚪

### 6.5 Typography rules
1. **MUST NOT** set body copy below 18px or any text below 14px.
2. **MUST** cap reading text at `max-width: 60ch` [8]. Interface text in narrow cards is naturally shorter.
3. **SHOULD** use line-height 1.5 for body and 1.6 for long reading [7][11].
4. **MUST** left-align paragraphs. Only short headings (≤2 lines) MAY be centered.
5. **SHOULD** use sentence case for headings, buttons, tabs and labels.
6. **MUST NOT** use all-caps for more than 3 words; if used for an eyebrow label, add `letter-spacing: 0.06em`.
7. **MUST NOT** add negative letter-spacing to body text. Headings MAY use `-0.01em` at display sizes only.
8. **SHOULD NOT** use italics for long passages; keep italics for short emphasis. ⚪ Practice
9. **MUST** support user text-spacing overrides (WCAG 1.4.12): no fixed-height text containers that clip.
10. **SHOULD** use `font-variant-numeric: tabular-nums` for counts and times that update.
11. **SHOULD** use `text-wrap: balance` on headings and `text-wrap: pretty` on paragraphs where supported.

---

## 7. Layout, grid and spacing

### 7.1 Breakpoints (mobile-first)

| Token | Min width | Typical device | Columns | Gutter / side margin |
|---|---|---|---|---|
| (base) | 0 | Phones | 4 | 16px |
| `--bp-sm` | 480px | Large phones | 4 | 20px |
| `--bp-md` | 768px | Tablets | 8 | 24px |
| `--bp-lg` | 1024px | Laptops | 12 | 32px |
| `--bp-xl` | 1280px | Desktops | 12 | 32px |

CSS custom properties can't be used inside media queries, so the values are written literally in `@media` rules. The tokens are documentation.

### 7.2 Containers

| Container | Max width | Use |
|---|---|---|
| `.container` | 1200px | Page frame |
| `.container-narrow` | 760px | Forms, settings, onboarding, conversation |
| `.prose` | 60ch | Long text |

The site **MUST** reflow without horizontal scrolling at 320 CSS px wide (WCAG 1.4.10).

### 7.3 Spacing scale (4px base, 8px rhythm)

| Token | Value | Typical use |
|---|---|---|
| `--space-1` | 4px | Icon-to-text gap, tight inline |
| `--space-2` | 8px | Between related small items, chip gaps |
| `--space-3` | 12px | Input inner padding, list item padding |
| `--space-4` | 16px | Card inner gaps, mobile side margin |
| `--space-5` | 24px | Card padding, form field gaps |
| `--space-6` | 32px | Between groups inside a section |
| `--space-7` | 48px | Between sections on mobile |
| `--space-8` | 64px | Between sections on desktop |
| `--space-9` | 96px | Major landing-page sections |
| `--space-10` | 128px | Hero top/bottom on large screens |

**Spacing rules**
- **SHOULD** vary section spacing by importance; identical padding on every section reads as templated. 🔵
- **MUST** group related things by proximity (closer together) before adding borders or boxes [2]. ⚪
- **MUST NOT** nest cards inside cards. ⚪ [34]

### 7.4 Layering (z-index)

| Token | Value | Use |
|---|---|---|
| `--z-base` | 0 | Content |
| `--z-sticky` | 100 | Sticky header, bottom tab bar, composer |
| `--z-dropdown` | 200 | Menus, popovers |
| `--z-overlay` | 300 | Modal backdrop |
| `--z-modal` | 400 | Dialogs, sheets |
| `--z-toast` | 500 | Toasts |

Sticky elements **MUST NOT** fully hide the focused element (WCAG 2.4.11). Use `scroll-padding-top` and `scroll-padding-bottom` equal to header and tab-bar heights.

---

## 8. Shape, borders and elevation

### 8.1 Radius (vary by role, on purpose) 🔵

| Token | Value | Use |
|---|---|---|
| `--radius-input` | 8px | Inputs, selects, textareas |
| `--radius-button` | 10px | Buttons |
| `--radius-card` | 14px | Cards, panels, images in feeds |
| `--radius-sheet` | 20px | Top corners of mobile bottom sheets, large modals |
| `--radius-pill` | 999px | Tags, chips, badges, toggles |
| — | 50% | Avatars |

Images inside a padded card use `calc(var(--radius-card) - <padding>)` or 8px so corners look concentric.

### 8.2 Borders

| Token | Value | Use |
|---|---|---|
| `--border-hair` | `1px solid var(--sand)` | Card outlines, dividers (decorative) |
| `--border-control` | `1.5px solid var(--stone)` | Inputs, checkboxes, radios, selects, secondary-button-like controls |
| `--border-focus` | `2px solid var(--harbor)` | Focus outline |

### 8.3 Elevation

Prefer borders. Use shadows only for things that float above the page. 🔵

| Token | Value (light) | Use |
|---|---|---|
| `--shadow-1` | `0 1px 2px rgb(22 36 58 / 0.06)` | Optional card lift on hover |
| `--shadow-2` | `0 2px 4px rgb(22 36 58 / 0.06), 0 8px 24px rgb(22 36 58 / 0.08)` | Menus, popovers, toasts |
| `--shadow-3` | `0 4px 8px rgb(22 36 58 / 0.08), 0 24px 48px rgb(22 36 58 / 0.14)` | Modals, sheets |

In dark mode, shadows are barely visible; elevate by using the next-lighter surface (`--card` over `--paper`, `--mist` over `--card`) plus a Sand hairline.

### 8.4 Clickability signifiers (NN/g [6]) 🟡
- Buttons **MUST** be filled (primary, danger) or outlined with a 1.5px border (secondary). Text-only buttons are allowed only for tertiary actions and **MUST** be Harbor colored.
- Body-text links **MUST** be Harbor **and** underlined (`text-underline-offset: 0.15em`).
- Navigation links MAY drop the underline because their position signals them, but the active item **MUST** have a non-color cue (weight 700 and a 3px indicator bar).
- Cards that open something **MUST** show a hover/focus state and contain a visible text link or button; whole-card click is an addition, not a replacement.

---

## 9. Icons, photography, avatars and illustration

### 9.1 Icons
- **SHOULD** use one icon family. Phosphor (Regular weight) or Tabler (1.5px stroke). Lucide is fine too; it's very common in AI-built sites, so it adds less personality. 🔵
- Sizes: 20px inline with 16–18px text, 24px in buttons and nav.
- Icons **MUST** have a text label next to them, or an accessible name (`aria-label`) and a tooltip if label-less (icon-only buttons only for universally known actions: close, back, more, send).
- **MUST NOT** put decorative icons in colored rounded squares.
- Meaningful icons **MUST** reach 3:1 against their background [31].

### 9.2 Photography 🟡 [20]
- **MUST** use real photos of real members and real gatherings, with written consent and a way to withdraw it.
- **MUST NOT** use stock photos of people or AI-generated people to represent members.
- **SHOULD** prefer natural light, candid moments, small groups, everyday places.
- **SHOULD** apply a light, consistent warm grade (slight warmth, lifted shadows), never heavy filters.
- Aspect ratios: person cards 4:5, group/event covers 16:9, avatars 1:1.
- Every meaningful image **MUST** have alt text. Member photos: "Photo of Priya". Decorative images: `alt=""`.
- Before launch, if you have no real photos, use **product screenshots with real test accounts** (with consent) or no people imagery at all. Don't fill the gap with stock.

### 9.3 Avatars

| Size token | px | Use |
|---|---|---|
| `--avatar-xs` | 24 | Inline mentions |
| `--avatar-sm` | 32 | Dense lists, message groups |
| `--avatar-md` | 40 | Conversation list, comments |
| `--avatar-lg` | 56 | Person cards (list layout), headers |
| `--avatar-xl` | 96 | Profile header mobile |
| `--avatar-2xl` | 128 | Profile header desktop |

- No photo: initials (first + last initial) in Ink on Sky, Figtree 600 at ~40% of the avatar size. (Ink on Sky 8.55:1.)
- **MUST NOT** use a gray silhouette placeholder.
- **MUST NOT** show a fake "online" green dot. If presence is shown, it is text ("Active today") and members can turn it off.

### 9.4 Illustration
- Optional. If used: commissioned, simple, slightly hand-made line work in Ink with Sky and Apricot fills. Max 160px tall in empty states.
- **MUST NOT** use Corporate Memphis style, 3D blobs, or AI-generated illustration that imitates a living artist.

---

## 10. Motion

### 10.1 Tokens

| Token | Value | Use |
|---|---|---|
| `--dur-fast` | 120ms | Hover, press, toggle |
| `--dur-base` | 180ms | Menus, tabs, small reveals |
| `--dur-slow` | 240ms | Modals, sheets, toasts |
| `--ease-out` | `cubic-bezier(0.2, 0, 0, 1)` | Things entering |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Things leaving |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Things moving |

### 10.2 Rules 🔵
- **MUST** animate only in response to user action or a real state change (message sent, person joined *your* group).
- **MUST NOT** use scroll-triggered fade-ins, parallax, auto-playing carousels, bouncing, or looping decorative animation.
- **MUST** honor `prefers-reduced-motion: reduce` by removing movement (opacity changes MAY remain). WCAG 2.3.3 is AAA, but this is cheap and expected.
- Loading: skeletons appear only after 300ms (to avoid flicker), with no shimmer under reduced motion.

---

## 11. Components

Each component lists **anatomy**, **variants**, **states**, **behavior**, **accessibility** and **don'ts**. CSS for each is in §17.3.

Universal state rules (apply to every interactive component):

| State | Visual | Notes |
|---|---|---|
| Default | As specified | |
| Hover (pointer only) | Background or border shifts one step (e.g. Harbor → Deep Harbor; transparent → Mist) | Wrap in `@media (hover: hover)` so touch devices don't get stuck hover |
| Active / pressed | Deep Harbor (or equivalent) + `transform: translateY(1px)` | No transform under reduced motion |
| Focus-visible | `outline: 2px solid var(--harbor); outline-offset: 2px` | **MUST** be visible on every focusable element. Never `outline: none` without a replacement |
| Disabled | Sand fill, Driftwood text, `cursor: not-allowed` | Prefer `aria-disabled="true"` + explanation over hiding the reason. Disabled controls are exempt from contrast rules, but say *why* it's disabled |
| Loading | Spinner + verb label ("Sending…"), width locked, `aria-busy="true"` | Never remove the label |
| Error | Brick border + icon + message | Message linked via `aria-describedby` |

### 11.1 Button

**Anatomy:** optional leading icon (20px) · label · optional trailing icon.

**Variants**

| Variant | Fill | Text | Border | When |
|---|---|---|---|---|
| Primary | Harbor | On-harbor | none | The one main action in a view ("Say hi", "Create your profile", "Send") |
| Secondary | transparent (hover Mist) | Harbor | 1.5px Harbor | Other actions next to a primary ("View profile", "Cancel" in forms) |
| Tertiary | transparent (hover Mist) | Harbor, underlined on hover | none | Low-emphasis actions ("Skip for now", "Show more") |
| Danger | Brick | On-danger | none | Destructive confirmation only ("Delete account", "Block") |
| Danger-secondary | transparent | Brick | 1.5px Brick | Opening a destructive flow ("Report") |
| Icon-only | transparent (hover Mist) | Ink | none | Close, back, more, send. Must have `aria-label` |

**Sizes**

| Size | Height | Padding (x) | Font | Use |
|---|---|---|---|---|
| Large | 52px | 24px | 17px/600 | Landing CTA, onboarding "Continue" |
| Medium (default) | 44px | 20px | 16px/600 | Everywhere else |
| Small | 36px | 14px | 15px/600 | Dense desktop lists only; keep ≥8px between targets (WCAG 2.5.8 AA is 24px) |

**Behavior**
- Labels are verbs describing the outcome ("Send message", not "Submit"). §13.
- Full-width on mobile for the primary action in forms and onboarding; auto width elsewhere.
- Button order in dialogs: secondary (Cancel) left, primary right on desktop; on mobile stack with primary on top.
- Never more than one primary per view. If you think you need two, one of them is secondary.

**Accessibility**
- Use `<button>` for actions, `<a>` for navigation. Never `<div onclick>`.
- Icon-only buttons: `aria-label="Close"` etc.
- Loading: keep the button focusable, set `aria-busy="true"`, announce completion via a status message.

**Don't:** gradients, shadows on idle buttons, pill-shaped primary buttons with glow, all-caps labels, "Click here".

### 11.2 Link
- Body links: Harbor, underlined, `text-underline-offset: 0.15em`, `text-decoration-thickness: 1px` (2px on hover).
- Visited: same color (this is an app, not a document site). ⚪
- External links: add "(opens in new tab)" visually hidden text if `target="_blank"`, and avoid new tabs unless needed.
- Link text **MUST** make sense out of context (WCAG 2.4.4): "Read our safety guide", not "Learn more".

### 11.3 Text input and textarea

**Anatomy:** label (always visible, above) · optional hint (Driftwood, below label) · field · error message (Brick, below field) · optional character count.

| Property | Value |
|---|---|
| Height | 48px (single line) |
| Padding | 12px 14px |
| Font | Figtree 17px/400 (≥16px to prevent iOS zoom) |
| Border | 1.5px Stone, radius 8px |
| Background | Card |
| Focus | Border Harbor + 3px Mist ring (`box-shadow`) + default outline replaced by the Harbor border (6.7:1) |
| Error | Border Brick, error icon + message below, `aria-invalid="true"` |
| Disabled | Sand background, Driftwood text |

**Rules**
- **MUST** have a visible `<label>`. Placeholders are examples only ("e.g. Leeds"), never the label.
- **MUST** use correct `type`, `autocomplete` and `inputmode` (`email`, `name`, `given-name`, `new-password`, `current-password`, `one-time-code`, `address-level2` for city). WCAG 1.3.5.
- **MUST** allow paste in all fields, including passwords and codes (WCAG 3.3.8).
- Validate on blur and on submit, not on every keystroke. Clear the error as soon as the input becomes valid.
- Textarea: auto-grow to 6 lines, then scroll. Character counts appear only when within 20% of the limit, and are announced politely.
- Optional fields are marked "(optional)"; required fields are the default and are not marked with red asterisks alone.

### 11.4 Select, checkbox, radio, toggle
- **Select:** native `<select>` styled with Stone border, 48px height, custom chevron icon. Native is more accessible than custom listboxes; only build custom if search is needed (then use the ARIA combobox pattern).
- **Checkbox / radio:** 20px box with 1.5px Stone border; checked = Harbor fill with white check or dot. The whole label is clickable and the row is ≥44px tall.
- **Toggle (switch):** only for settings that apply immediately. 44×24px track; off = Stone border, Card fill; on = Harbor fill, white thumb. `role="switch"` + `aria-checked`. Show the state in text next to it ("On"/"Off") for clarity. ⚪
- Group related options in `<fieldset>` with a `<legend>`.

### 11.5 Chip / tag

| Type | Default | Selected | Use |
|---|---|---|---|
| Interest tag (display) | Mist bg, Deep Harbor text | — | On profiles and cards |
| Shared-interest tag | Harbor bg, On-harbor text, check icon | — | Highlights what *you* share with this person |
| Filter / choice chip | Card bg, 1.5px Stone border, Ink text | Harbor bg, On-harbor text, check icon | Onboarding interests, filters |

- Height 36px (display) / 40px (interactive), pill radius, 15px/500 text, 12–16px horizontal padding, 8px gaps.
- Interactive chips: `<button aria-pressed="true|false">`. The check icon on selection means state isn't color-only.
- Cards show at most 3 tags + "+2 more".

### 11.6 Avatar
- See §9.3 for sizes and fallback.
- `<img alt="Priya">` when it adds information; `alt=""` when the name is printed right next to it (avoid double announcement).
- Stacked avatars (group members): max 4, overlap 25%, 2px Card ring, then "+12".

### 11.7 Person card (the core component)

```
┌──────────────────────────────┐
│ [ photo 4:5 ]                │
│                              │
├──────────────────────────────┤
│ Priya                         │  ← name (h3, Fraunces 20px), links to profile
│ Leeds · about 2 km away       │  ← meta (Driftwood 15px)
│ "Looking for a Saturday       │  ← one-line hook from their prompt (Ink 17px, 2-line clamp)
│  running buddy"               │
│ [✓ Running] [✓ Board games] +2│  ← shared tags first (Harbor), then others (Mist)
│                              │
│ [ Say hi ]  [ ··· ]           │  ← primary button + overflow (Block, Report, Hide)
└──────────────────────────────┘
```

- Width: 1 column (<768px), 2 columns (768–1023px), 3 columns (≥1024px). Gap 24px.
- Card: Card background, 1px Sand outline, radius 14px, padding 0 (photo) / 20px (body).
- The name is the link (use the "stretched link" pattern only if the "Say hi" button and menu sit above it with `position: relative; z-index: 1`).
- **MUST NOT** show exact location, last-seen time to the minute, or age unless the member chose to show it.
- Hover (pointer): Shadow-1 and border darkens to Stone. Focus: outline on the focused link/button, not the whole card.

### 11.8 Profile header
- Mobile: avatar 96px centered above name; desktop: avatar 128px left, text right.
- Content order: name (h1) → area + distance → "Active this week" (if member allows) → **What you share** (tags + one sentence: "You both run and live in Headingley") → primary "Say hi" + secondary "Invite to a group" + overflow (Block, Report).
- Safety actions **MUST** be reachable in ≤2 taps from here (overflow → Report).

### 11.9 Navigation

**Top bar (all sizes)**
- Height 64px desktop / 56px mobile, Paper background, Sand bottom hairline when scrolled.
- Left: logo (links home). Right (logged out): "Log in" (tertiary) + "Create your profile" (primary). Right (logged in, desktop): People, Messages, Groups, You (avatar + name) as text links with icons.

**Bottom tab bar (logged in, <768px)**
- 4 items: People · Messages · Groups · You. Icon 24px **and** label 14px (the type floor).
- Height 64px plus safe-area inset (`padding-bottom: env(safe-area-inset-bottom)`).
- Active: Harbor icon + label weight 700 + 3px Harbor bar on top. Inactive: Driftwood.
- Unread count on Messages: Clay badge with number, plus `aria-label="Messages, 3 unread"`.

**Rules**
- Max 5 top-level destinations. ⚪ Practice (mobile platform guidelines commonly cap bottom tab bars at five)
- Current page: `aria-current="page"`.
- Skip link ("Skip to main content") as the first focusable element.

### 11.10 Tabs
- Use for switching views within one page (e.g. Profile: About · Groups).
- Underline style: 3px Harbor bar under the active tab, active label weight 700; inactive Driftwood.
- ARIA tabs pattern (`role="tablist"`, arrow-key navigation) **or** plain links if each tab is a separate URL (preferred for shareable views).

### 11.11 Dialog (modal) and bottom sheet
- Use for: confirmations, report flow, block confirmation, short forms. Not for content people need to compare with the page behind.
- Desktop: centered, max-width 520px, radius 20px, Shadow-3, backdrop `rgb(16 26 42 / 0.5)`.
- Mobile (<768px): bottom sheet, full width, top radius 20px, drag handle (decorative), max-height 90vh.
- **MUST:** use `<dialog>` with `showModal()` or the ARIA dialog pattern; move focus into it; trap focus; Esc closes; return focus to the trigger; label with `aria-labelledby`.
- Title is a question or action ("Block Priya?"); body explains consequences in one or two sentences; buttons name the action ("Block", not "OK").

### 11.12 Toast and banner

| | Toast | Inline banner |
|---|---|---|
| For | Confirmation of something the user just did | Status that persists or needs attention |
| Position | Bottom center (above tab bar on mobile) | Top of the relevant section |
| Duration | 6s; pauses on hover/focus; dismissible | Until resolved or dismissed |
| ARIA | `role="status"` (polite) | `role="status"` or `role="alert"` for errors |
| Content | One sentence + optional "Undo" | Icon + title + sentence + optional action |

- **MUST NOT** put the only copy of important information or the only path to an action in a toast (it disappears; WCAG 2.2.1).
- Banners use the tint backgrounds with a 4px status-color left border; text is Ink.

### 11.13 Empty state (NN/g [26]) ⚪
Three parts, always:
1. **Status:** what this space is and that it's empty ("No conversations yet").
2. **Learning cue:** what will appear here and how ("When you say hi to someone, your chat shows up here").
3. **Direct path:** one button to the key task ("Find people near you").

- Optional small illustration (≤160px). No sad faces, no "Oops", no jokes about loneliness.
- Different copy for **first-run** (nothing yet), **cleared** (you dealt with everything), and **no results** (filters too narrow → offer "Clear filters").

### 11.14 Form error handling
- Inline: Brick icon + message under the field, linked with `aria-describedby`; field gets `aria-invalid="true"`.
- On submit with errors: an **error summary** at the top of the form (Brick-tint banner, `role="alert"`, focus moved to it) listing each error as a link to its field.
- Messages say what's wrong and how to fix it (§13.5). WCAG 3.3.1, 3.3.3.
- **MUST** keep what the user typed (WCAG 3.3.7: don't make them re-enter).

### 11.15 Loading and skeletons
- <300ms: show nothing.
- 300ms–3s: skeletons shaped like the content (Mist blocks, radius matching), no shimmer under reduced motion.
- >3s or uncertain: progress text ("Finding people near you…").
- Buttons: inline spinner + verb ("Saving…").

### 11.16 "Show more" (instead of infinite scroll) 🟠/⚪ [23][24]
- Load 12 people (or 20 messages/groups) at a time.
- Button: secondary, full-width on mobile: "Show 12 more people".
- After loading: move focus to the first new item's heading; announce "12 more people loaded" via a polite live region.
- Keep the footer reachable. Show the end clearly: "You've seen everyone who matches these filters. [Change filters]".
- Infinite scroll MAY be used only in the chat message history (loading older messages upward), where content is chronological and the composer anchors the view.

### 11.17 Unread badge and indicators
- Count badge: Clay background, On-clay text, 14px/600, min-width 20px, height 20px, pill radius. "9+" above nine.
- Dot (when a count doesn't make sense): 10px Clay dot **plus** visually hidden text ("New").
- **MUST NOT** use Apricot for badges or dots (2.53:1 fails WCAG 1.4.11).

### 11.18 Message bubble and conversation

```
                         ┌──────────────────────┐
                         │ Saturday works! Park │  ← your message: Harbor bg, On-harbor text
                         │ run at 9?            │     right-aligned, radius 16px (4px bottom-right)
                         └──────────────────────┘
                                    Sent · 10:42  ← meta (Driftwood 15px), status text
┌──────────────────────┐
│ Perfect, see you at   │  ← their message: Card bg, 1px Sand outline, Ink text
│ the main gate         │     left-aligned, radius 16px (4px bottom-left)
└──────────────────────┘
Priya · 10:44
```

- Max bubble width: 75% of the column, and ≤60ch.
- Group consecutive messages from the same person within 5 minutes; show the name/avatar once.
- Day separators: "Today", "Yesterday", then dates ("Mon 3 Nov").
- Status text, not just icons: "Sending…" → "Sent" → "Read" (read only if *both* people have read receipts on).
- Failed send: Brick text "Not sent. Tap to try again." with a retry button.
- Links inside messages are underlined and, in your own bubbles, use On-harbor color.

### 11.19 Message composer
- Sticky at the bottom (above the safe area), Card background, Sand top hairline.
- Textarea (auto-grow to 6 lines) with label "Message Priya" (visually hidden is OK, since the context is obvious) + Send button (icon + "Send" label on desktop; icon-only with `aria-label="Send"` on mobile).
- Desktop: Enter sends, Shift+Enter newline. Mobile: Enter inserts a newline; Send button sends.
- **First-message helpers** (empty conversation only): 2–3 suggestion chips drawn from shared interests ("Ask about their favorite running route"). Tapping inserts editable text into the composer; it **MUST NOT** auto-send.

### 11.20 Overflow menu (···)
- Icon button, `aria-label="More options for Priya"`, `aria-haspopup="menu"`.
- Items: Hide from my list · Block · Report. Destructive items in Brick text with icon, separated by a divider.
- Menu: Card bg, Shadow-2, radius 12px, items 44px tall. Arrow keys move, Esc closes, focus returns to the button.

### 11.21 Report flow
Three short steps in one dialog/sheet:
1. **Why are you reporting Priya?** Radio list: Fake profile · Harassment or threats · Inappropriate photos · Spam or scam · They may be under 18 · Something else.
2. **Anything else we should know?** Optional textarea ("Optional. Don't include your password or bank details.") + checkbox "Also block Priya" (checked by default).
3. **Confirmation:** "Thanks. We've received your report." Explain the real next steps and a *real* review time only if the team can meet it. Link to safety resources.

- Reporting **MUST NOT** notify the reported person.
- Provide an emergency line for immediate danger ("If you're in danger right now, contact local emergency services.").

### 11.22 Block confirmation
- Dialog: "Block Priya?" / "They won't be able to see your profile or message you. They won't be told you blocked them. You can unblock them in Settings." / [Cancel] [Block].
- After blocking: return to the previous list with a toast "You blocked Priya. [Undo]" (undo available for 10s, and permanently in Settings → Blocked).

---

## 12. Page-by-page specifications

Each page lists **purpose**, **layout**, **content**, **states**, and **acceptance criteria** (testable statements QA can check).

### 12.1 Global page anatomy
- `<header>` with skip link, logo, navigation.
- `<main id="main">` with exactly one `<h1>`.
- `<footer>`: About, Safety, Community guidelines, Privacy, Terms, Help/Contact (same order and location on every page; WCAG 3.2.6 consistent help).
- `<html lang="en">` (or the site's language).
- Page `<title>` pattern: "Page name · [Site Name]".

### 12.2 Landing page (logged out)

**Purpose:** In under 5 seconds, a visitor understands: this helps me meet people nearby who share my interests, it looks friendly and safe, and here's how to start.

**Layout (desktop ≥1024px)**
```
┌────────────────────────────────────────────────────────────────┐
│ [logo]                                    Log in  [Create your profile] │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Meet people in Leeds who like      ┌───────────────────────┐   │
│ what you like.                     │  real photo: members   │   │
│                                    │  at a park run / game  │   │
│ Pick a few interests. See who's    │  night (with consent)  │   │
│ nearby. Say hi.                    └───────────────────────┘   │
│                                    ┌──────────┐                │
│ [ Create your profile ]            │ real UI  │ ← small, tilted│
│ See how it works ↓                 │ card     │   0°, not 3D   │
│                                    └──────────┘                │
├────────────────────────────────────────────────────────────────┤
│ How it works (numbered, vertical, each with a real screenshot) │
│ 1  Tell us what you're into   [screenshot of interest chips]   │
│ 2  See people near you        [screenshot of person cards]     │
│ 3  Say hi                     [screenshot of first message]    │
├────────────────────────────────────────────────────────────────┤
│ Happening this week (real groups/events, if any exist)          │
├────────────────────────────────────────────────────────────────┤
│ How we keep it safe (4 concrete bullets + link to safety guide) │
├────────────────────────────────────────────────────────────────┤
│ Final CTA: one sentence + [Create your profile]                │
├────────────────────────────────────────────────────────────────┤
│ footer                                                         │
└────────────────────────────────────────────────────────────────┘
```
- Hero is **left-aligned** text with imagery on the right. Mobile: text first, image below, CTA visible without scrolling on a 667px-tall screen.
- Hero headline: `--text-display`, Fraunces 600, max 2 lines on desktop. Must be specific (place and purpose).
- "How it works" is a **vertical numbered list** with real screenshots, not a three-card icon grid.
- "Happening this week" only renders if there is real content. If there isn't, omit the section.
- Social proof only if true and current ("214 people in Leeds joined this month", sourced from real data, updated automatically). Otherwise omit.

**Safety section copy example**
- Your exact location is never shown. People see your area and an approximate distance.
- Block or report anyone in two taps. They're never told who reported them.
- You choose who can message you.
- Real people review reports. [Read our safety guide]

**Acceptance criteria**
- [ ] One primary button visible above the fold at 375×667 and 1440×900.
- [ ] H1 names a place or audience and an action.
- [ ] No stock people, no gradients, no three-card feature grid, no invented numbers.
- [ ] Lighthouse accessibility score 100 and axe: 0 violations.
- [ ] 1-second test (§18): 4 of 5 testers say what the site does.

### 12.3 Sign up

**Purpose:** create an account with the least effort, safely.

**Content**
- H1 "Create your profile". One line: "It takes about a minute."
- Options: Continue with Google / Apple (if offered) · or email + password · or passkey.
- Fields (email route): Email (`autocomplete="email"`), Password (`autocomplete="new-password"`, show/hide toggle, rules shown *before* typing: "At least 12 characters"). No "confirm password" field (show/hide replaces it). ⚪
- Age confirmation if the service is adults-only: "I'm 18 or older" checkbox with link to why. Set and state a minimum age; check local law (this spec is not legal advice).
- Consent: links to Terms and Privacy in plain text above the button ("By creating a profile you agree to our Terms and Privacy policy"). Marketing emails: separate **unchecked** opt-in.
- Primary button: "Create profile".
- Link: "Already have a profile? Log in".

**Acceptance criteria**
- [ ] Paste works in every field; password managers can fill it (WCAG 3.3.8).
- [ ] No CAPTCHA puzzle without an accessible alternative.
- [ ] Errors follow §11.14 and keep entered values.
- [ ] Marketing opt-in is unchecked by default.

### 12.4 Log in and recovery
- Fields: Email, Password (`current-password`), "Forgot password?" link next to the password label.
- Error: "That email and password don't match. Try again or reset your password." (Don't reveal which field was wrong.)
- Recovery: email a link; confirmation page says to check spam and when to try again.

### 12.5 Onboarding (progressive disclosure [25])

Four steps, each on its own screen, in `.container-narrow`.

| Step | Title | Required? | Content | Primary button |
|---|---|---|---|---|
| 1 | What should people call you? | Name required; photo optional | First name (`given-name`), photo upload with crop; tip: "A clear photo of your face gets more replies." | Continue |
| 2 | What are you into? | Choose at least 3 | Search + chips grouped (Outdoors, Games, Food, Arts, Learning, Sport, Volunteering…). Selected count shown: "4 selected" | Continue |
| 3 | Where are you based? | Required (city level) | City field with suggestions; explanation: "We use this to show people nearby. Others only see your area and an approximate distance, never your address." | Continue |
| 4 | Here are some people you might get on with | — | 3–6 person cards with shared interests | Finish ("Start exploring") |

- Progress: "Step 2 of 4 · Interests" in text (plus a thin bar if desired). Not dots alone.
- Every step has Back. Optional steps have "Skip for now" (tertiary).
- After onboarding, ask for more (prompts, more photos) **in context**, e.g. a dismissible card on the profile page: "Add a prompt so people have something to ask you about."
- Never more than 2 levels of settings or nested flows [25].

**Acceptance criteria**
- [ ] A new user sees real people by step 4 with only name, 3 interests and city entered.
- [ ] Each data request explains why it's asked.
- [ ] Photo step can be skipped.

### 12.6 People (discover), the logged-in home

**Layout**
```
┌───────────────────────────────────────────────┐
│ h1: People near you                            │
│ Filters: [Interests ▾] [Distance: 5 km ▾] [New this week] [Clear] │
│ "38 people match"                              │
├───────────────────────────────────────────────┤
│ [person card] [person card] [person card]      │
│ [person card] [person card] [person card]      │
│ …12 total                                      │
│          [ Show 12 more people ]               │
└───────────────────────────────────────────────┘
```
- Default sort: most shared interests, then most recently active (only "active this week" granularity).
- Filters are visible chips/selects, not hidden in a modal (mobile: horizontally scrollable chip row + "All filters" sheet).
- Result count announced on filter change (polite live region).
- Optional "Suggested for you" row above, max 3 people with a one-line reason ("You both picked climbing and board games").

**States**
- Loading: 6 skeleton cards.
- No results: "No one matches all these filters yet." / "Try a wider distance or fewer interests." / [Clear filters].
- End of list: "You've seen everyone who matches. New people join every week." / [Change filters].
- Location not set: prompt to add city.

**Acceptance criteria**
- [ ] No infinite scroll; "Show more" behaves per §11.16.
- [ ] Shared interests appear first and are marked with a check icon.
- [ ] Every card has a reachable Report/Block via overflow menu.

### 12.7 Person profile (someone else)

**Order of content** (shared-first, then about them):
1. Profile header (§11.8).
2. **What you share**: tags + sentence.
3. Prompts (2–4): "Ask me about…", "A perfect Saturday is…", "I'm looking for…". `--text-long` size.
4. Photos (up to 6), tappable to enlarge, with alt text from the owner or "Photo 2 of Priya".
5. Groups they're in that you can see.
6. Footer: "Report Priya" (danger-secondary text link) visible at the bottom too.

**Acceptance criteria**
- [ ] "Say hi" is the only primary button.
- [ ] Report reachable in ≤2 taps from the top (overflow) and visible at the bottom.
- [ ] No exact location, no precise last-seen.

### 12.8 Your profile and editing
- View mode = what others see, with a banner "This is how others see your profile" and an "Edit profile" secondary button.
- Edit: sections (Photos, About, Prompts, Interests, Area) on one page with section-level "Save" or a single sticky "Save changes" bar that appears only when something changed.
- Unsaved changes: on navigation, dialog "Leave without saving?" [Keep editing] [Leave].
- Profile completeness: show helpful next steps, **not** a percentage meter with pressure. ("Add a prompt so people have something to ask you about.")

### 12.9 Messages list
```
Messages                               [filter: All · Unread]
──────────────────────────────────────────────
(avatar) Priya             Sat run at 9?      10:44   (3)
(avatar) Board games group Tom: I'll bring…   Yesterday
(avatar) Sam               You: Sounds good    Mon
```
- Row: 72px tall, avatar 40px, name (600), preview (Driftwood, 1 line), time (meta), unread count (Clay badge) + name in 700 when unread.
- Requests from people you haven't replied to: separate tab "Requests (2)", so strangers don't land in the main inbox. 🔵 Safety decision.
- Empty: "No conversations yet" / "When you say hi to someone, your chat shows up here." / [Find people near you].

### 12.10 Conversation
- Header: back (mobile), avatar + name (links to profile), overflow (View profile, Mute, Block, Report).
- Message list per §11.18; older messages load upward automatically (the only allowed infinite scroll).
- Composer per §11.19.
- Safety note on first conversation with a new person (dismissible, Mist banner): "Meeting up? Choose a public place and tell a friend where you're going. [Safety tips]".
- Links from strangers: show the domain and a gentle warning before opening external links in a first conversation. 🔵

### 12.11 Groups
- **List:** "Your groups" then "Groups near you" (cards: cover 16:9 real photo or Sky placeholder with group initials, name, member count, next meetup, shared-interest tag, "Join" button).
- **Group page:** name (h1), description (`--text-long`), next meetups (date, place area, who's going), members (stacked avatars + "See all"), group chat link, organizer(s), "Report group" in overflow.
- Joining: one click for open groups; "Request to join" with a short optional note for closed groups.

### 12.12 Notifications
- Default **on**: new message, reply to your request, someone joined *your* group meetup, safety/account notices.
- Default **off**: "people viewed your profile," weekly suggestions, marketing.
- Batch low-priority items: "3 new people joined Leeds Board Games this week."
- **MUST NOT** send manipulative notifications ("Someone is waiting for you!", "Don't miss out!"). [27][28]
- Page lists notifications by day; each is a link to the thing it's about.

### 12.13 Settings
Two levels max [25]: Settings → section page.

| Section | Contents |
|---|---|
| Profile visibility | Who can see my profile (Everyone signed in / People with shared interests / Only people I've messaged); show "Active this week" (on/off); show distance (on/off) |
| Messages | Who can message me (Everyone / Shared interests only / People in my groups); read receipts (on/off) |
| Notifications | Per-type toggles (email and push), as in §12.12 |
| Blocked people | List with Unblock |
| Account | Email, password/passkeys, connected logins, download my data, **delete account** |
| Help & safety | Safety guide, community guidelines, contact |

**Delete account** **MUST** be as easy to find and finish as signing up: Settings → Account → Delete account → one confirmation dialog (type nothing, no guilt copy) → done, with a clear statement of what's deleted and when. [27] (Obstruction / "hard to cancel")

### 12.14 Error and system pages
- **404:** "We can't find that page." / "It may have moved, or the link might be wrong." / [Go to People] + search.
- **500 / offline:** "Something went wrong on our side. Your messages are safe." / [Try again] + status page link if one exists.
- **Maintenance:** time window in the user's time zone.
- No jokes, no illustrations of broken robots, no "Oops!".

---

## 13. Content and microcopy

### 13.1 Voice
A friendly host introducing two guests: **warm, specific, brief, honest.**

| We are | We are not |
|---|---|
| Warm | Gushing ("We're SO excited!!") |
| Specific | Vague ("Unlock meaningful connections") |
| Brief | Chatty filler |
| Honest | Pushy, guilt-tripping, falsely urgent |
| Calm about safety | Alarmist or legalistic |

### 13.2 Rules
1. Say "people" and "you", not "users" or "members" in UI copy (members is OK in policies).
2. Buttons describe the outcome: "Send message", "Join group", "Save changes", "Block Priya".
3. Sentence case everywhere.
4. Numbers as digits ("3 new people"), real and current only.
5. One idea per sentence; aim for under 20 words.
6. No exclamation marks in errors, safety copy or confirmations of destructive actions.
7. Use the person's name where it helps ("Say hi to Priya").
8. Read every line aloud; if you wouldn't say it to a friend, rewrite it.
9. **MUST NOT** use confirmshaming ("No thanks, I prefer being lonely") [27].
10. Emoji: none in system copy. Members can use whatever they like.

### 13.3 Banned words and phrases (UI and marketing)
unlock · unleash · elevate · empower · seamless(ly) · supercharge · revolutionize · game-changer · next-level · cutting-edge · effortless(ly) · journey (as metaphor) · "like never before" · "where X comes to life" · "your all-in-one" · "dive in" · "magic/magical" · "AI-powered" (unless it's true and relevant) · "Oops!" · "Uh-oh"

### 13.4 Microcopy library

**Landing and marketing**

| Slot | Use | Not |
|---|---|---|
| Hero H1 | Meet people in Leeds who like what you like. | Connect like never before. |
| Hero sub | Pick a few interests, see who's nearby, and say hi. | Unlock meaningful connections in your community. |
| Primary CTA | Create your profile | Get started |
| Secondary | See how it works | Learn more |
| Final CTA | Your next Saturday plan might be one message away. [Create your profile] | Join thousands of happy users! |

**Buttons**

| Action | Label |
|---|---|
| Start a chat | Say hi |
| Send | Send |
| Join open group | Join group |
| Join closed group | Ask to join |
| Save edits | Save changes |
| Skip optional step | Skip for now |
| Load more | Show 12 more people |
| Destructive | Block Priya / Delete account / Leave group |
| Cancel destructive | Cancel (not "No") |

**Empty states**

| Screen | Heading | Body | Button |
|---|---|---|---|
| Messages (first run) | No conversations yet | When you say hi to someone, your chat shows up here. | Find people near you |
| Messages (all read) | You're all caught up | New messages will show up here. | — |
| People (no results) | No one matches all these filters yet | Try a wider distance or fewer interests. | Clear filters |
| People (end of list) | You've seen everyone who matches | New people join every week. | Change filters |
| Groups (none joined) | You haven't joined a group yet | Groups are an easy way to meet a few people at once. | Browse groups near you |
| Notifications | Nothing new | We'll let you know when someone replies or a meetup is coming up. | — |
| Search (no results) | No results for "pottery" | Check the spelling or try a related interest like "ceramics". | — |

**Errors** (§13.5 for the pattern)

| Situation | Message |
|---|---|
| Email already registered | That email already has a profile. Log in instead? |
| Invalid email | Enter an email address like name@example.com |
| Password too short | Use at least 12 characters |
| Wrong login | That email and password don't match. Try again or reset your password. |
| Message failed | Not sent. Check your connection and tap to try again. |
| Photo too large | That photo is over 10 MB. Choose a smaller one or crop it. |
| Photo wrong type | Use a JPG, PNG, HEIC or WebP photo. |
| Rate limit | You're sending messages very quickly. Wait a minute and try again. |
| Server error | Something went wrong on our side. Your messages are safe. Try again in a moment. |
| Offline | You're offline. We'll send your message when you're back online. |

**Confirmations (toasts)**

| Event | Toast |
|---|---|
| Profile saved | Changes saved |
| Joined group | You joined Leeds Board Games |
| Blocked | You blocked Priya. [Undo] |
| Report sent | Thanks. We've received your report. |
| Left group | You left Leeds Board Games. [Undo] |

**Onboarding helper text**

| Field | Helper |
|---|---|
| Name | This is how you'll appear to others. First name is fine. |
| Photo | A clear photo of your face gets more replies. You can add more later. |
| Interests | Pick at least 3. These help us show you people you'll get on with. |
| Area | We use this to show people nearby. Others only see your area and an approximate distance. |

**Notifications (push/email)**

| Event | Copy |
|---|---|
| New message | Priya: "Saturday works! Park run at 9?" |
| Message request | Sam wants to say hi. You both like climbing. |
| Meetup reminder | Board games tomorrow at 7pm, Headingley. 6 going. |
| Weekly digest (opt-in) | 3 new people near you like running. |

### 13.5 Error message pattern
**What happened + how to fix it**, in plain words, next to the problem.
- Do: "Use at least 12 characters"
- Don't: "Invalid input", "Error 422", "Something went wrong" (without a next step)

---

## 14. Trust, safety and honest design

### 14.1 Banned dark patterns (MUST NOT ship)
Mapped to Mathur et al.'s 15 types [27] and Gray et al.'s 5 strategies [28]. 🟢

| Pattern (source) | What it would look like here | Instead |
|---|---|---|
| Activity notifications (Mathur, Social proof) | "Sarah from Leeds just joined!" pop-ups, fabricated or not | Show real activity only where it helps a task (e.g. "6 going" on a meetup) |
| Testimonials of uncertain origin (Mathur) | Unattributed glowing quotes | Real, named stories with consent, or nothing |
| Countdown timers / limited-time messages (Mathur, Urgency) | "Your matches expire in 2:59" | No artificial time pressure |
| High-demand / low-stock (Mathur, Scarcity) | "Only 3 spots left!" when untrue | State real limits only (group capacity set by the organizer) |
| Confirmshaming (Mathur, Misdirection) | "No thanks, I don't want friends" | "Not now" |
| Visual interference / trick questions (Mathur) | Pre-checked marketing boxes, double negatives, de-emphasized "decline" | Unchecked opt-ins, plain wording, equal-weight choices |
| Hard to cancel (Mathur, Obstruction) | Account deletion hidden behind support email | Self-serve deletion in ≤3 steps |
| Forced enrollment (Mathur, Forced action) | Must invite contacts or upload address book to continue | Contacts import optional and clearly skippable |
| Sneaking (Mathur, Gray) | Silent auto-subscription to a paid tier | Explicit consent for any charge |
| Nagging (Gray) | Repeated "Turn on notifications?" prompts | Ask once in context, remember the answer |
| Interface interference (Gray) | "Accept all" huge, "Settings" tiny gray link | Cookie banner (if needed) with equal-weight choices |

### 14.2 Safety features (MUST for launch)
1. Block and Report reachable in ≤2 taps from every profile, card, conversation and group. 🔵
2. Reports never revealed to the reported person.
3. Approximate location only (area name + distance rounded to whole km, minimum "less than 1 km"); never coordinates or street names. Compute distances from a coarse, randomly offset location (e.g. snapped to a ~1 km grid), not raw GPS, because repeated precise distance readings from different points can reveal where someone lives (trilateration).
4. "Who can message me" setting, defaulting to *people with shared interests* or *people in my groups* (product decision; pick one and document it). 🔵
5. Message requests from new people land in a separate Requests tab (§12.9).
6. First-conversation safety note (§12.10).
7. Community guidelines written in plain language, linked in the footer and in the report flow.
8. Minimum age stated and enforced at sign-up; "They may be under 18" as a report reason.
9. Photo moderation for profile images before they're shown widely (or at least post-upload review with fast takedown).
10. Clear account deletion and data download (§12.13).

### 14.3 Why this matters for design, not just policy
People forgive minor flaws in attractive, trustworthy-looking designs [5], and blue reads as trustworthy [17], but those first impressions are quickly overturned by any sign of manipulation. Honest design protects the trust the visual design earns. 🔵

---

## 15. Accessibility specification (WCAG 2.2 AA)

**Target:** WCAG 2.2 Level AA across the whole product, plus selected AAA items marked below. 🟢

| SC | Level | Requirement | How this spec meets it |
|---|---|---|---|
| 1.1.1 Non-text content | A | Text alternatives | Alt text rules §9.2–9.3; `aria-label` on icon buttons |
| 1.3.1 Info and relationships | A | Structure in code | Real headings, lists, `<label>`, `<fieldset>`/`<legend>`, landmarks |
| 1.3.5 Identify input purpose | AA | `autocomplete` on personal fields | §11.3 |
| 1.4.1 Use of color | A | Not color alone | Icons, text, weight, counts (§5.5) |
| 1.4.3 Contrast (minimum) | AA | 4.5:1 text, 3:1 large | §5.4, Appendix B |
| 1.4.4 Resize text | AA | 200% without loss | `rem` units, no fixed heights |
| 1.4.10 Reflow | AA | No 2-D scroll at 320px | Mobile-first layout §7 |
| 1.4.11 Non-text contrast | AA | 3:1 for controls, states, focus, meaningful graphics | Stone borders, Clay badges, Harbor focus (§5.4) |
| 1.4.12 Text spacing | AA | Survives user spacing overrides | No clipped fixed-height text boxes |
| 1.4.13 Content on hover or focus | AA | Dismissible, hoverable, persistent | Tooltips stay while hovered, close on Esc |
| 2.1.1 Keyboard | A | All functions by keyboard | Native elements; menus/dialogs follow ARIA patterns |
| 2.1.2 No keyboard trap | A | Can always leave | Dialog trap releases on Esc/close |
| 2.2.1 Timing adjustable | A | No disappearing essential info | Toasts pause on hover/focus; nothing essential only in toasts |
| 2.3.3 Animation from interactions | AAA | Can disable motion | `prefers-reduced-motion` handling §10 |
| 2.4.1 Bypass blocks | A | Skip link | §11.9 |
| 2.4.2 Page titled | A | Descriptive titles | §12.1 |
| 2.4.3 Focus order | A | Logical order | DOM order = visual order |
| 2.4.4 Link purpose (in context) | A | Meaningful link text | §11.2 |
| 2.4.6 Headings and labels | AA | Descriptive | One `<h1>`; labels on all inputs |
| 2.4.7 Focus visible | AA | Visible focus | 2px Harbor outline, 2px offset |
| 2.4.11 Focus not obscured (minimum) | AA | Sticky UI doesn't hide focus | `scroll-padding` §7.4 |
| 2.5.3 Label in name | A | Accessible name contains visible label | Don't override visible labels with different `aria-label`s |
| 2.5.5 Target size (enhanced) | AAA | 44×44 CSS px | Our target for all primary touch controls |
| 2.5.8 Target size (minimum) | AA | 24×24 CSS px or spacing | Floor for dense desktop controls |
| 3.1.1 Language of page | A | `lang` attribute | §12.1 |
| 3.2.6 Consistent help | A | Help in the same place | Footer order fixed §12.1 |
| 3.3.1 Error identification | A | Errors described in text | §11.14 |
| 3.3.2 Labels or instructions | A | Visible labels/hints | §11.3 |
| 3.3.3 Error suggestion | AA | How to fix | §13.4–13.5 |
| 3.3.7 Redundant entry | A | Don't ask twice | Keep form values; prefill known data |
| 3.3.8 Accessible authentication (minimum) | AA | No memory/puzzle tests without alternatives | Paste allowed, password managers, passkeys |
| 4.1.2 Name, role, value | A | Correct semantics | Native elements; ARIA only where needed |
| 4.1.3 Status messages | AA | Announced without focus change | `role="status"` for toasts, result counts, "loaded" messages |

**Screen-reader specifics**
- Person card: name is a heading link; image `alt` is empty if the name is adjacent; shared interests list is a `<ul>` with visually hidden "Shared:" prefix.
- Conversation: message list is a `role="log"` region with `aria-live="polite"` for incoming messages; each message includes sender and time in text.
- Unread counts: "Messages, 3 unread".

---

## 16. Performance

Performance is part of the first impression [1]. ⚪ Targets (75th percentile, mobile):

| Metric | Target |
|---|---|
| Largest Contentful Paint | ≤ 2.5 s |
| Interaction to Next Paint | ≤ 200 ms |
| Cumulative Layout Shift | ≤ 0.1 |

**Rules**
- Fonts: subset to the languages you need; `font-display: swap`; preload the one body font file used above the fold; at most 2 families.
- Images: AVIF/WebP with JPEG fallback; `srcset`/`sizes`; explicit `width`/`height` or `aspect-ratio` to prevent layout shift; `loading="lazy"` below the fold; hero image `fetchpriority="high"`.
- Avatars: server-side resized to 2× display size.
- No autoplay video; no heavy animation libraries for decorative effects.
- Skeletons sized exactly like content to avoid shift.

---

## 17. Implementation kit (copy-paste code)

### 17.1 `tokens.css`

```css
/* ==========================================================
   [Site Name] design tokens · v3.0
   Light is default. Dark applies via OS preference unless
   the page sets data-theme="light"; data-theme="dark" forces dark.
   ========================================================== */

:root {
  color-scheme: light;

  /* ---- Color: surfaces ---- */
  --paper: #FBF8F3;
  --card: #FFFDF9;
  --mist: #E9EFF7;
  --sand: #E7E1D8;          /* decorative lines only */
  --stone: #857E75;         /* control boundaries (3:1+) */

  /* ---- Color: text ---- */
  --ink: #16243A;
  --driftwood: #6B6660;

  /* ---- Color: brand ---- */
  --harbor: #2456A6;
  --harbor-deep: #1A4280;
  --on-harbor: #FFFFFF;
  --sky: #A9C2E4;

  /* ---- Color: accent ---- */
  --apricot: #E8835A;       /* decorative only, never text/indicators */
  --apricot-tint: #F6E7DF;
  --clay: #B4512B;
  --on-clay: #FFFFFF;

  /* ---- Color: status ---- */
  --moss: #2F7D5B;
  --moss-tint: #E3F1EA;
  --brick: #B3402F;
  --brick-tint: #F8E4E0;
  --on-danger: #FFFFFF;

  /* ---- Overlays & shadows ---- */
  --backdrop: rgb(16 26 42 / 0.5);
  --shadow-1: 0 1px 2px rgb(22 36 58 / 0.06);
  --shadow-2: 0 2px 4px rgb(22 36 58 / 0.06), 0 8px 24px rgb(22 36 58 / 0.08);
  --shadow-3: 0 4px 8px rgb(22 36 58 / 0.08), 0 24px 48px rgb(22 36 58 / 0.14);

  /* ---- Typography ---- */
  --font-display: 'Fraunces', 'Fraunces Variable', Georgia, 'Times New Roman', serif;
  --font-body: 'Figtree', 'Figtree Variable', ui-sans-serif, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

  --text-display: clamp(2.5rem, 1.8rem + 3.2vw, 4rem);
  --text-h1: clamp(2.125rem, 1.6rem + 2.2vw, 3.25rem);
  --text-h2: clamp(1.625rem, 1.4rem + 1vw, 2.125rem);
  --text-h3: clamp(1.25rem, 1.15rem + 0.4vw, 1.5rem);
  --text-h4: 1.125rem;
  --text-long: 1.25rem;
  --text-body: 1.125rem;
  --text-input: 1.0625rem;
  --text-ui: 1rem;
  --text-meta: 0.9375rem;
  --text-min: 0.875rem;

  --leading-tight: 1.12;
  --leading-heading: 1.2;
  --leading-body: 1.5;
  --leading-long: 1.6;

  --measure: 60ch;

  /* ---- Spacing ---- */
  --space-1: 0.25rem;  /*   4px */
  --space-2: 0.5rem;   /*   8px */
  --space-3: 0.75rem;  /*  12px */
  --space-4: 1rem;     /*  16px */
  --space-5: 1.5rem;   /*  24px */
  --space-6: 2rem;     /*  32px */
  --space-7: 3rem;     /*  48px */
  --space-8: 4rem;     /*  64px */
  --space-9: 6rem;     /*  96px */
  --space-10: 8rem;    /* 128px */

  /* ---- Shape ---- */
  --radius-input: 8px;
  --radius-button: 10px;
  --radius-menu: 12px;
  --radius-card: 14px;
  --radius-bubble: 16px;
  --radius-sheet: 20px;
  --radius-pill: 999px;

  --border-hair: 1px solid var(--sand);
  --border-control: 1.5px solid var(--stone);

  /* ---- Sizing ---- */
  --control-h-lg: 52px;
  --control-h: 44px;
  --control-h-sm: 36px;
  --input-h: 48px;
  --header-h: 56px;
  --tabbar-h: 64px;

  --avatar-xs: 24px;
  --avatar-sm: 32px;
  --avatar-md: 40px;
  --avatar-lg: 56px;
  --avatar-xl: 96px;
  --avatar-2xl: 128px;

  --container: 1200px;
  --container-narrow: 760px;

  /* ---- Layers ---- */
  --z-base: 0;
  --z-sticky: 100;
  --z-dropdown: 200;
  --z-overlay: 300;
  --z-modal: 400;
  --z-toast: 500;

  /* ---- Motion ---- */
  --dur-fast: 120ms;
  --dur-base: 180ms;
  --dur-slow: 240ms;
  --ease-out: cubic-bezier(0.2, 0, 0, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}

@media (min-width: 768px) {
  :root { --header-h: 64px; }
}

/* Dark: follow OS unless the page forces light */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    color-scheme: dark;
    --paper: #101A2A;
    --card: #17243A;
    --mist: #1E3050;
    --sand: #2A3A55;
    --stone: #6A7B97;
    --ink: #EEE9E1;
    --driftwood: #A8A39B;
    --harbor: #7FA7E0;
    --harbor-deep: #A3C0EA;
    --on-harbor: #101A2A;
    --sky: #3D5A85;
    --apricot: #F0A07E;
    --apricot-tint: #3A2A22;
    --clay: #F0A07E;
    --on-clay: #101A2A;
    --moss: #6FC29B;
    --moss-tint: #1F3A30;
    --brick: #F08A7A;
    --brick-tint: #3A2226;
    --on-danger: #101A2A;
    --backdrop: rgb(0 0 0 / 0.6);
    --shadow-1: none;
    --shadow-2: 0 8px 24px rgb(0 0 0 / 0.35);
    --shadow-3: 0 24px 48px rgb(0 0 0 / 0.45);
  }
}

/* Dark: forced by the page */
:root[data-theme="dark"] {
  color-scheme: dark;
  --paper: #101A2A;
  --card: #17243A;
  --mist: #1E3050;
  --sand: #2A3A55;
  --stone: #6A7B97;
  --ink: #EEE9E1;
  --driftwood: #A8A39B;
  --harbor: #7FA7E0;
  --harbor-deep: #A3C0EA;
  --on-harbor: #101A2A;
  --sky: #3D5A85;
  --apricot: #F0A07E;
  --apricot-tint: #3A2A22;
  --clay: #F0A07E;
  --on-clay: #101A2A;
  --moss: #6FC29B;
  --moss-tint: #1F3A30;
  --brick: #F08A7A;
  --brick-tint: #3A2226;
  --on-danger: #101A2A;
  --backdrop: rgb(0 0 0 / 0.6);
  --shadow-1: none;
  --shadow-2: 0 8px 24px rgb(0 0 0 / 0.35);
  --shadow-3: 0 24px 48px rgb(0 0 0 / 0.45);
}
```

### 17.2 `base.css`

```css
*,
*::before,
*::after { box-sizing: border-box; }

html {
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
  scroll-padding-top: calc(var(--header-h) + var(--space-4));
  scroll-padding-bottom: calc(var(--tabbar-h) + var(--space-4));
}

body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-body);
  font-size: var(--text-body);
  line-height: var(--leading-body);
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-variation-settings: 'SOFT' 100, 'WONK' 0;
  line-height: var(--leading-heading);
  margin: 0 0 var(--space-4);
  text-wrap: balance;
}
h1 { font-size: var(--text-h1); line-height: var(--leading-tight); }
h2 { font-size: var(--text-h2); }
h3 { font-size: var(--text-h3); line-height: 1.3; }
h4 { font-family: var(--font-body); font-size: var(--text-h4); font-weight: 650; margin: 0 0 var(--space-2); }

.display {
  font-family: var(--font-display);
  font-size: var(--text-display);
  font-weight: 600;
  font-variation-settings: 'SOFT' 100, 'WONK' 0;
  line-height: 1.08;
  letter-spacing: -0.01em;
}

p { margin: 0 0 var(--space-4); text-wrap: pretty; }
.prose { max-width: var(--measure); }
.long { font-size: var(--text-long); line-height: var(--leading-long); }
.meta { font-size: var(--text-meta); color: var(--driftwood); line-height: 1.4; font-weight: 500; }

a {
  color: var(--harbor);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.15em;
}
@media (hover: hover) {
  a:hover { color: var(--harbor-deep); text-decoration-thickness: 2px; }
}

:focus-visible {
  outline: 2px solid var(--harbor);
  outline-offset: 2px;
}

img, svg, video { display: block; max-width: 100%; height: auto; }

.container { width: 100%; max-width: var(--container); margin-inline: auto; padding-inline: var(--space-4); }
.container-narrow { width: 100%; max-width: var(--container-narrow); margin-inline: auto; padding-inline: var(--space-4); }
@media (min-width: 480px)  { .container, .container-narrow { padding-inline: 1.25rem; } }
@media (min-width: 768px)  { .container, .container-narrow { padding-inline: var(--space-5); } }
@media (min-width: 1024px) { .container, .container-narrow { padding-inline: var(--space-6); } }

.visually-hidden {
  position: absolute !important;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

.skip-link {
  position: absolute;
  left: var(--space-4);
  top: -100px;
  z-index: var(--z-toast);
  background: var(--harbor);
  color: var(--on-harbor);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-button);
  font-weight: 600;
}
.skip-link:focus { top: var(--space-4); }

.tabular { font-variant-numeric: tabular-nums; }

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 17.3 `components.css`

```css
/* ---------- Buttons ---------- */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: var(--control-h);
  padding: 0 1.25rem;
  border: 1.5px solid transparent;
  border-radius: var(--radius-button);
  font: 600 var(--text-ui)/1.25 var(--font-body);
  text-decoration: none;
  cursor: pointer;
  transition: background-color var(--dur-fast) var(--ease-out),
              border-color var(--dur-fast) var(--ease-out),
              color var(--dur-fast) var(--ease-out),
              transform var(--dur-fast) var(--ease-out);
}
.btn:active { transform: translateY(1px); }
.btn svg { width: 20px; height: 20px; flex: none; }

.btn--primary { background: var(--harbor); color: var(--on-harbor); }
.btn--secondary { background: transparent; color: var(--harbor); border-color: var(--harbor); }
.btn--tertiary { background: transparent; color: var(--harbor); padding-inline: var(--space-3); }
.btn--danger { background: var(--brick); color: var(--on-danger); }
.btn--danger-secondary { background: transparent; color: var(--brick); border-color: var(--brick); }
.btn--icon { background: transparent; color: var(--ink); padding: 0; width: var(--control-h); }

@media (hover: hover) {
  .btn--primary:hover { background: var(--harbor-deep); }
  .btn--secondary:hover,
  .btn--tertiary:hover,
  .btn--icon:hover { background: var(--mist); }
  .btn--tertiary:hover { text-decoration: underline; }
  .btn--danger-secondary:hover { background: var(--brick-tint); }
}
.btn--primary:active { background: var(--harbor-deep); }

.btn--lg { min-height: var(--control-h-lg); padding-inline: var(--space-5); font-size: 1.0625rem; }
.btn--sm { min-height: var(--control-h-sm); padding-inline: 0.875rem; font-size: var(--text-meta); }
.btn--block { width: 100%; }

.btn[aria-disabled="true"],
.btn:disabled {
  background: var(--sand);
  color: var(--driftwood);
  border-color: transparent;
  cursor: not-allowed;
  transform: none;
}

.btn[aria-busy="true"] { cursor: progress; }

/* ---------- Form fields ---------- */
.field { display: grid; gap: var(--space-2); margin-bottom: var(--space-5); }
.field__label { font-weight: 600; font-size: var(--text-ui); color: var(--ink); }
.field__hint { font-size: var(--text-meta); color: var(--driftwood); margin: 0; }
.field__error {
  display: flex;
  gap: var(--space-2);
  align-items: flex-start;
  font-size: var(--text-meta);
  font-weight: 500;
  color: var(--brick);
  margin: 0;
}

.input,
.select,
.textarea {
  width: 100%;
  min-height: var(--input-h);
  padding: var(--space-3) 0.875rem;
  background: var(--card);
  color: var(--ink);
  border: var(--border-control);
  border-radius: var(--radius-input);
  font: 400 var(--text-input)/1.4 var(--font-body);
  transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
}
.textarea { resize: vertical; min-height: 7rem; }
.input::placeholder,
.textarea::placeholder { color: var(--driftwood); opacity: 1; }

.input:focus-visible,
.select:focus-visible,
.textarea:focus-visible {
  outline: none;
  border-color: var(--harbor);
  box-shadow: 0 0 0 3px var(--mist);
}

.input[aria-invalid="true"],
.select[aria-invalid="true"],
.textarea[aria-invalid="true"] { border-color: var(--brick); }

.input:disabled,
.select:disabled,
.textarea:disabled { background: var(--sand); color: var(--driftwood); cursor: not-allowed; }

.choice {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  min-height: var(--control-h);
  cursor: pointer;
}
.choice input[type="checkbox"],
.choice input[type="radio"] {
  width: 20px;
  height: 20px;
  margin: 0;
  accent-color: var(--harbor);
}

/* ---------- Chips & tags ---------- */
.tag {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  min-height: 36px;
  padding: 0 var(--space-3);
  border-radius: var(--radius-pill);
  background: var(--mist);
  color: var(--harbor-deep);
  font: 500 var(--text-meta)/1 var(--font-body);
}
.tag--shared { background: var(--harbor); color: var(--on-harbor); }

.chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  min-height: 40px;
  padding: 0 var(--space-4);
  border-radius: var(--radius-pill);
  border: var(--border-control);
  background: var(--card);
  color: var(--ink);
  font: 500 var(--text-meta)/1 var(--font-body);
  cursor: pointer;
}
.chip[aria-pressed="true"] { background: var(--harbor); border-color: var(--harbor); color: var(--on-harbor); }
@media (hover: hover) {
  .chip[aria-pressed="false"]:hover { background: var(--mist); }
}
.tag-list { display: flex; flex-wrap: wrap; gap: var(--space-2); list-style: none; padding: 0; margin: 0; }

/* ---------- Avatar ---------- */
.avatar {
  --size: var(--avatar-md);
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  object-fit: cover;
  flex: none;
}
.avatar--initials {
  display: inline-grid;
  place-items: center;
  background: var(--sky);
  color: var(--ink);
  font: 600 calc(var(--size) * 0.4)/1 var(--font-body);
}

/* ---------- Card & person card ---------- */
.card {
  background: var(--card);
  border: var(--border-hair);
  border-radius: var(--radius-card);
  padding: var(--space-5);
}

.person-grid {
  display: grid;
  gap: var(--space-5);
  grid-template-columns: 1fr;
  list-style: none;
  padding: 0;
  margin: 0;
}
@media (min-width: 768px)  { .person-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .person-grid { grid-template-columns: repeat(3, 1fr); } }

.person-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--card);
  border: var(--border-hair);
  border-radius: var(--radius-card);
  overflow: hidden;
  transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
}
@media (hover: hover) {
  .person-card:hover { border-color: var(--stone); box-shadow: var(--shadow-1); }
}
.person-card__photo { aspect-ratio: 4 / 5; width: 100%; object-fit: cover; }
.person-card__body { display: grid; gap: var(--space-3); padding: 1.25rem; }
.person-card__name { font-size: var(--text-h3); margin: 0; }
.person-card__name a { color: var(--ink); text-decoration: none; }
.person-card__name a::after { content: ""; position: absolute; inset: 0; } /* stretched link */
.person-card__hook {
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.person-card__actions { display: flex; gap: var(--space-2); align-items: center; }
.person-card__actions > * { position: relative; z-index: 1; } /* above stretched link */

/* ---------- Badge ---------- */
.badge {
  display: inline-grid;
  place-items: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: var(--radius-pill);
  background: var(--clay);
  color: var(--on-clay);
  font: 600 var(--text-min)/1 var(--font-body);
  font-variant-numeric: tabular-nums;
}
.dot { width: 10px; height: 10px; border-radius: 50%; background: var(--clay); display: inline-block; }

/* ---------- Banner ---------- */
.banner {
  display: flex;
  gap: var(--space-3);
  align-items: flex-start;
  padding: var(--space-4);
  border-radius: var(--radius-input);
  border-left: 4px solid var(--harbor);
  background: var(--mist);
  color: var(--ink);
}
.banner--success { background: var(--moss-tint); border-left-color: var(--moss); }
.banner--error   { background: var(--brick-tint); border-left-color: var(--brick); }
.banner--warm    { background: var(--apricot-tint); border-left-color: var(--clay); }
.banner__icon { flex: none; width: 20px; height: 20px; color: var(--harbor); }
.banner--success .banner__icon { color: var(--moss); }
.banner--error .banner__icon { color: var(--brick); }
.banner--warm .banner__icon { color: var(--clay); }

/* ---------- Toast ---------- */
.toast-region {
  position: fixed;
  left: 50%;
  bottom: calc(var(--tabbar-h) + env(safe-area-inset-bottom) + var(--space-4));
  transform: translateX(-50%);
  z-index: var(--z-toast);
  display: grid;
  gap: var(--space-2);
  width: min(92vw, 480px);
}
@media (min-width: 768px) { .toast-region { bottom: var(--space-6); } }
.toast {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-3) var(--space-4);
  background: var(--ink);
  color: var(--paper);
  border-radius: var(--radius-menu);
  box-shadow: var(--shadow-2);
  font-size: var(--text-ui);
}
.toast a,
.toast button { color: var(--paper); font-weight: 600; }

/* ---------- Dialog / sheet ---------- */
dialog.dialog {
  width: min(100% - 2rem, 520px);
  padding: var(--space-6);
  border: none;
  border-radius: var(--radius-sheet);
  background: var(--card);
  color: var(--ink);
  box-shadow: var(--shadow-3);
}
dialog.dialog::backdrop { background: var(--backdrop); }
.dialog__actions { display: flex; flex-direction: column-reverse; gap: var(--space-3); margin-top: var(--space-6); }
@media (min-width: 768px) {
  .dialog__actions { flex-direction: row; justify-content: flex-end; }
}
@media (max-width: 767px) {
  dialog.dialog {
    width: 100%;
    max-width: 100%;
    max-height: 90vh;
    margin: auto 0 0;
    border-radius: var(--radius-sheet) var(--radius-sheet) 0 0;
    padding-bottom: calc(var(--space-6) + env(safe-area-inset-bottom));
  }
}

/* ---------- Menu ---------- */
.menu {
  min-width: 220px;
  padding: var(--space-1);
  background: var(--card);
  border: var(--border-hair);
  border-radius: var(--radius-menu);
  box-shadow: var(--shadow-2);
  z-index: var(--z-dropdown);
}
.menu__item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  width: 100%;
  min-height: var(--control-h);
  padding: 0 var(--space-3);
  border: 0;
  border-radius: var(--radius-input);
  background: transparent;
  color: var(--ink);
  font: 500 var(--text-ui)/1.25 var(--font-body);
  text-align: left;
  cursor: pointer;
}
.menu__item:hover,
.menu__item:focus-visible { background: var(--mist); }
.menu__item--danger { color: var(--brick); }
.menu__divider { height: 1px; background: var(--sand); margin: var(--space-1) 0; border: 0; }

/* ---------- Bottom tab bar ---------- */
.tabbar {
  position: fixed;
  inset: auto 0 0 0;
  z-index: var(--z-sticky);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  min-height: var(--tabbar-h);
  padding-bottom: env(safe-area-inset-bottom);
  background: var(--paper);
  border-top: var(--border-hair);
}
@media (min-width: 768px) { .tabbar { display: none; } }
.tabbar__item {
  position: relative;
  display: grid;
  place-items: center;
  gap: 2px;
  padding-top: var(--space-2);
  color: var(--driftwood);
  font: 500 var(--text-min)/1.2 var(--font-body);
  text-decoration: none;
}
.tabbar__item svg { width: 24px; height: 24px; }
.tabbar__item[aria-current="page"] { color: var(--harbor); font-weight: 700; }
.tabbar__item[aria-current="page"]::before {
  content: "";
  position: absolute;
  top: 0;
  left: 25%;
  right: 25%;
  height: 3px;
  border-radius: 0 0 3px 3px;
  background: var(--harbor);
}

/* ---------- Empty state ---------- */
.empty {
  display: grid;
  justify-items: start;
  gap: var(--space-3);
  max-width: 44ch;
  padding: var(--space-7) 0;
}
.empty__title { font-size: var(--text-h3); margin: 0; }
.empty__body { margin: 0; color: var(--driftwood); }

/* ---------- Show more ---------- */
.show-more { display: flex; flex-direction: column; align-items: center; gap: var(--space-3); margin-top: var(--space-6); }
.show-more .btn { width: 100%; }
@media (min-width: 768px) { .show-more .btn { width: auto; } }

/* ---------- Messages ---------- */
.thread { display: grid; gap: var(--space-2); padding: var(--space-4) 0; }
.bubble {
  max-width: min(75%, 60ch);
  padding: 0.625rem 0.875rem;
  border-radius: var(--radius-bubble);
  font-size: var(--text-body);
  line-height: 1.45;
  overflow-wrap: anywhere;
}
.bubble--mine {
  justify-self: end;
  background: var(--harbor);
  color: var(--on-harbor);
  border-bottom-right-radius: 4px;
}
.bubble--mine a { color: var(--on-harbor); }
.bubble--theirs {
  justify-self: start;
  background: var(--card);
  color: var(--ink);
  border: var(--border-hair);
  border-bottom-left-radius: 4px;
}
.bubble-meta { font-size: var(--text-meta); color: var(--driftwood); }
.bubble-meta--mine { justify-self: end; }
.bubble-meta--failed { color: var(--brick); }

.composer {
  position: sticky;
  bottom: 0;
  z-index: var(--z-sticky);
  display: flex;
  align-items: flex-end;
  gap: var(--space-2);
  padding: var(--space-3) 0 calc(var(--space-3) + env(safe-area-inset-bottom));
  background: var(--card);
  border-top: var(--border-hair);
}
.composer .textarea { min-height: var(--control-h); max-height: 9.5rem; resize: none; }
```

### 17.4 `tokens.json` (W3C Design Tokens format, for Figma/Style Dictionary)

```json
{
  "color": {
    "paper":        { "$type": "color", "$value": "#FBF8F3", "$extensions": { "dark": "#101A2A" } },
    "card":         { "$type": "color", "$value": "#FFFDF9", "$extensions": { "dark": "#17243A" } },
    "mist":         { "$type": "color", "$value": "#E9EFF7", "$extensions": { "dark": "#1E3050" } },
    "sand":         { "$type": "color", "$value": "#E7E1D8", "$extensions": { "dark": "#2A3A55" } },
    "stone":        { "$type": "color", "$value": "#857E75", "$extensions": { "dark": "#6A7B97" } },
    "ink":          { "$type": "color", "$value": "#16243A", "$extensions": { "dark": "#EEE9E1" } },
    "driftwood":    { "$type": "color", "$value": "#6B6660", "$extensions": { "dark": "#A8A39B" } },
    "harbor":       { "$type": "color", "$value": "#2456A6", "$extensions": { "dark": "#7FA7E0" } },
    "harbor-deep":  { "$type": "color", "$value": "#1A4280", "$extensions": { "dark": "#A3C0EA" } },
    "on-harbor":    { "$type": "color", "$value": "#FFFFFF", "$extensions": { "dark": "#101A2A" } },
    "sky":          { "$type": "color", "$value": "#A9C2E4", "$extensions": { "dark": "#3D5A85" } },
    "apricot":      { "$type": "color", "$value": "#E8835A", "$extensions": { "dark": "#F0A07E" } },
    "apricot-tint": { "$type": "color", "$value": "#F6E7DF", "$extensions": { "dark": "#3A2A22" } },
    "clay":         { "$type": "color", "$value": "#B4512B", "$extensions": { "dark": "#F0A07E" } },
    "on-clay":      { "$type": "color", "$value": "#FFFFFF", "$extensions": { "dark": "#101A2A" } },
    "moss":         { "$type": "color", "$value": "#2F7D5B", "$extensions": { "dark": "#6FC29B" } },
    "moss-tint":    { "$type": "color", "$value": "#E3F1EA", "$extensions": { "dark": "#1F3A30" } },
    "brick":        { "$type": "color", "$value": "#B3402F", "$extensions": { "dark": "#F08A7A" } },
    "brick-tint":   { "$type": "color", "$value": "#F8E4E0", "$extensions": { "dark": "#3A2226" } },
    "on-danger":    { "$type": "color", "$value": "#FFFFFF", "$extensions": { "dark": "#101A2A" } }
  },
  "font": {
    "display": { "$type": "fontFamily", "$value": ["Fraunces", "Georgia", "serif"] },
    "body":    { "$type": "fontFamily", "$value": ["Figtree", "ui-sans-serif", "Segoe UI", "Roboto", "Arial", "sans-serif"] }
  },
  "space": {
    "1": { "$type": "dimension", "$value": "4px" },
    "2": { "$type": "dimension", "$value": "8px" },
    "3": { "$type": "dimension", "$value": "12px" },
    "4": { "$type": "dimension", "$value": "16px" },
    "5": { "$type": "dimension", "$value": "24px" },
    "6": { "$type": "dimension", "$value": "32px" },
    "7": { "$type": "dimension", "$value": "48px" },
    "8": { "$type": "dimension", "$value": "64px" },
    "9": { "$type": "dimension", "$value": "96px" },
    "10": { "$type": "dimension", "$value": "128px" }
  },
  "radius": {
    "input":  { "$type": "dimension", "$value": "8px" },
    "button": { "$type": "dimension", "$value": "10px" },
    "menu":   { "$type": "dimension", "$value": "12px" },
    "card":   { "$type": "dimension", "$value": "14px" },
    "bubble": { "$type": "dimension", "$value": "16px" },
    "sheet":  { "$type": "dimension", "$value": "20px" },
    "pill":   { "$type": "dimension", "$value": "999px" }
  },
  "duration": {
    "fast": { "$type": "duration", "$value": "120ms" },
    "base": { "$type": "duration", "$value": "180ms" },
    "slow": { "$type": "duration", "$value": "240ms" }
  }
}
```
The `$extensions.dark` key is a convention for this project, not part of the token standard. Tools like Style Dictionary can read it with a custom transform.

### 17.5 Tailwind CSS v4 mapping (if the project uses Tailwind)

Import `tokens.css` first, then map tokens to Tailwind utilities and **remove the default palette** so default blues/indigos can't sneak in:

```css
@import "tailwindcss";
@import "./tokens.css";

@theme inline {
  --color-*: initial;               /* drop Tailwind's default colors */
  --color-paper: var(--paper);
  --color-card: var(--card);
  --color-mist: var(--mist);
  --color-sand: var(--sand);
  --color-stone: var(--stone);
  --color-ink: var(--ink);
  --color-driftwood: var(--driftwood);
  --color-harbor: var(--harbor);
  --color-harbor-deep: var(--harbor-deep);
  --color-on-harbor: var(--on-harbor);
  --color-sky: var(--sky);
  --color-apricot: var(--apricot);
  --color-apricot-tint: var(--apricot-tint);
  --color-clay: var(--clay);
  --color-on-clay: var(--on-clay);
  --color-moss: var(--moss);
  --color-moss-tint: var(--moss-tint);
  --color-brick: var(--brick);
  --color-brick-tint: var(--brick-tint);
  --color-on-danger: var(--on-danger);
  --color-white: #FFFFFF;
  --color-transparent: transparent;
  --color-current: currentColor;

  /* Names differ from tokens.css on purpose: a theme variable that
     references a variable of the same name would create a cycle. */
  --font-heading: var(--font-display);
  --font-sans: var(--font-body);

  --radius-control: 8px;
  --radius-btn: 10px;
  --radius-panel: 14px;
  --radius-sheet-top: 20px;
}
```
Usage: `bg-paper text-ink`, `bg-harbor text-on-harbor`, `border-stone`, `font-heading`, `rounded-panel`, `rounded-btn`. `--color-*: initial` removes Tailwind's built-in palette so default blues, indigos and violets can't be used by accident. Check the Tailwind v4 docs for `@theme inline` behavior in your version.

### 17.6 Minimal HTML examples

**Person card**
```html
<li class="person-card">
  <img class="person-card__photo" src="/u/priya-480.webp" alt="" width="480" height="600" loading="lazy">
  <div class="person-card__body">
    <h3 class="person-card__name"><a href="/people/priya">Priya</a></h3>
    <p class="meta">Headingley, Leeds · about 2 km away</p>
    <p class="person-card__hook">Looking for a Saturday running buddy</p>
    <ul class="tag-list" aria-label="Interests">
      <li class="tag tag--shared"><span class="visually-hidden">Shared: </span>Running</li>
      <li class="tag tag--shared"><span class="visually-hidden">Shared: </span>Board games</li>
      <li class="tag">Pottery</li>
    </ul>
    <div class="person-card__actions">
      <a class="btn btn--primary" href="/messages/new?to=priya">Say hi</a>
      <button class="btn btn--icon" aria-label="More options for Priya" aria-haspopup="menu" aria-expanded="false">
        <!-- 24px "more" icon svg, aria-hidden="true" -->
      </button>
    </div>
  </div>
</li>
```
(Add the check icon inside shared tags with `aria-hidden="true"`; the hidden "Shared:" text carries the meaning for screen readers.)

**Form field with error**
```html
<div class="field">
  <label class="field__label" for="email">Email</label>
  <input class="input" id="email" name="email" type="email" autocomplete="email"
         aria-invalid="true" aria-describedby="email-error">
  <p class="field__error" id="email-error">
    <!-- error icon svg aria-hidden="true" -->
    Enter an email address like name@example.com
  </p>
</div>
```

**Empty state**
```html
<section class="empty" aria-labelledby="empty-messages">
  <h2 class="empty__title" id="empty-messages">No conversations yet</h2>
  <p class="empty__body">When you say hi to someone, your chat shows up here.</p>
  <a class="btn btn--primary" href="/people">Find people near you</a>
</section>
```

**Status region for "Show more" and filter counts**
```html
<p class="visually-hidden" role="status" aria-live="polite" id="results-status"></p>
<!-- JS: results-status.textContent = "12 more people loaded"; -->
```

### 17.7 Suggested file structure
```
/styles
  tokens.css        ← §17.1
  base.css          ← §17.2
  components.css    ← §17.3
/design
  tokens.json       ← §17.4
  design-guide.md   ← this file
/components
  Button, Field, Chip, Tag, Avatar, PersonCard, Badge, Banner,
  Toast, Dialog, Menu, TabBar, EmptyState, ShowMore,
  MessageBubble, Composer, ReportFlow, BlockDialog
/pages
  landing, signup, login, onboarding/[1-4], people, people/[id],
  me, me/edit, messages, messages/[id], groups, groups/[id],
  notifications, settings/[section], 404, 500
```

---

## 18. QA and acceptance tests

### 18.1 Automated (run in CI on every pull request)

| ID | Test | Tool | Pass condition |
|---|---|---|---|
| T-A11Y-1 | Accessibility scan of every page template, light and dark | axe-core (e.g. `@axe-core/playwright`) | 0 serious/critical violations |
| T-A11Y-2 | Lighthouse accessibility | Lighthouse CI | Score 100 |
| T-PERF-1 | Core Web Vitals lab run on landing, people, conversation | Lighthouse CI | LCP ≤2.5s, CLS ≤0.1 on mobile profile |
| T-TOKEN-1 | No raw hex colors outside `tokens.css` | Stylelint `color-no-hex` (with tokens.css excluded) | 0 hits |
| T-TOKEN-2 | No default framework palette classes | grep for `blue-500`, `indigo-`, `violet-`, `purple-` | 0 hits |
| T-SLOP-1 | No banned gradient/blur patterns | grep for `linear-gradient`, `background-clip: text`, `backdrop-filter` | 0 hits (or approved exceptions) |
| T-COPY-1 | Banned words | grep the copy files for §13.3 list | 0 hits |
| T-CONTRAST-1 | Token pair contrast | script computing all pairs in Appendix B | All required pairs pass |

### 18.2 Manual (before each release)

| ID | Test | Pass condition |
|---|---|---|
| T-KEY-1 | Keyboard only: sign up, onboard, find a person, send a message, report, block, delete account | All possible; focus always visible; no traps |
| T-SR-1 | Screen reader (VoiceOver iOS + NVDA/Windows): same tasks | All possible; cards, unread counts and statuses announced sensibly |
| T-ZOOM-1 | 200% browser zoom and 320px width | No lost content, no horizontal scroll |
| T-SPACING-1 | Apply WCAG 1.4.12 text-spacing bookmarklet | No clipped or overlapping text |
| T-MOTION-1 | OS reduced motion on | No movement animations |
| T-DARK-1 | Dark mode on every template | All text readable; buttons use dark labels on light blue |
| T-TYPE-1 | Fonts load: inspect computed font for headings and body; confirm SOFT=100, WONK=0 on headings | Fraunces and Figtree render; leaning-n "wonky" forms absent |
| T-TAP-1 | Measure touch targets on mobile | Primary controls ≥44×44; nothing below 24×24 without spacing |
| T-SAFE-1 | Report and block from card, profile, conversation, group | ≤2 taps to start each |
| T-HONEST-1 | Review every number, testimonial and notification | All real, sourced, current |

### 18.3 Five-person checks (cheap user research)

| ID | Method | Pass |
|---|---|---|
| T-USER-1 | **First-impression test:** show the landing page for ~1 second (a nod to the 50 ms finding [1], made practical), then ask "What is this site for? How did it feel?" | 4 of 5 say "meet people nearby with similar interests" and use words like friendly, warm, calm, safe |
| T-USER-2 | **Swap test (§4.3):** show two blurred screenshots, ours and a generic AI-built site; ask which feels more like "a real place run by real people" | 4 of 5 pick ours |
| T-USER-3 | **Task test:** "Find someone who likes running and say hi." Observe; don't ask for opinions until after | 5 of 5 succeed; watch for hesitation on clickable elements [6] |
| T-USER-4 | **Safety test:** "This person is bothering you. What would you do?" | 5 of 5 find Block/Report within 10 seconds |

Remember the aesthetic-usability effect [5]: people will praise attractive screens they struggled with. Judge by what they do.

### 18.4 Definition of done (per page)
- [ ] Matches the page spec in §12 and the acceptance criteria listed there
- [ ] Uses only tokens (no raw colors, sizes, radii)
- [ ] Passes T-A11Y-1 and T-KEY-1
- [ ] Empty, loading, error and end states designed and built
- [ ] Copy reviewed against §13
- [ ] Works in light and (if shipped) dark mode
- [ ] Checked at 320px, 768px, 1280px

---

## 19. Prompt for AI coding tools

Paste this at the start of a session with Claude Code, Cursor, v0, Lovable, Bolt or similar, with this file and `tokens.css` attached or in the repo.

```text
You are building [Site Name], a website that helps people meet others nearby who share
their interests. Follow design-guide.md exactly. It overrides your defaults.

Non-negotiable:
- Use ONLY the CSS custom properties in tokens.css for color, type, spacing, radius,
  shadow and motion. Never write raw hex values or framework default colors
  (no Tailwind blue-500/indigo/violet/purple, no Bootstrap blue).
- Fonts: Fraunces (headings, font-variation-settings 'SOFT' 100, 'WONK' 0, weight 600)
  and Figtree (everything else). Never Inter, Roboto, Arial, Poppins or Montserrat as
  the chosen face.
- Body text 18px (var(--text-body)); long reading 20px (var(--text-long)); nothing
  below 14px. Paragraphs max-width 60ch. Line-height 1.5.
- Background is var(--paper), text var(--ink). No gradients, no gradient text, no
  glassmorphism, no blurred blobs, no neon glows.
- Inputs and checkboxes use var(--stone) borders (Sand is decorative only).
- Unread badges use var(--clay) with a number. Never use apricot for text or indicators.
- One primary (Harbor) button per view. Buttons look like buttons; body links are
  underlined.
- No three-column icon feature grids, no centered default hero, no stat bands or
  testimonials unless real data is provided, no stock or AI-generated people.
- No infinite scroll for people/groups lists: use "Show 12 more people" (§11.16).
- Every list or inbox has empty, loading, error and end states (§11.13, §13.4).
- Block and Report reachable in ≤2 taps from every card, profile, conversation, group.
- Never build fake activity notifications, countdowns, scarcity messages,
  confirmshaming or hard-to-find account deletion (§14.1).
- Meet WCAG 2.2 AA: visible labels, autocomplete attributes, focus-visible outlines,
  keyboard support, aria-live status messages, prefers-reduced-motion support.
- Copy: use §13.4 microcopy where it exists. Never use the banned words in §13.3.

Before finishing each page, check it against its acceptance criteria in §12 and the
Definition of Done in §18.4, and list anything you could not meet.
```

---

## 20. References

All entries were checked during the v3 fact check (Appendix A records how). Where a full text could not be opened, that is stated.

### Peer-reviewed and academic
1. Lindgaard, G., Fernandes, G., Dudek, C., & Brown, J. (2006). Attention web designers: You have 50 milliseconds to make a good first impression! *Behaviour & Information Technology*, 25(2), 115–126. Verified via abstract; news summary in *Nature* (13 Jan 2006): https://www.nature.com/news/2006/060109/full/news060109-13.html
2. Tuch, A. N., Presslaber, E. E., Stöcklin, M., Opwis, K., & Bargas-Avila, J. A. (2012). The role of visual complexity and prototypicality regarding first impression of websites: Working towards understanding aesthetic judgments. *International Journal of Human-Computer Studies*, 70(11), 794–811. https://doi.org/10.1016/j.ijhcs.2012.06.003 · https://research.google/pubs/pub38315/
3. Kurosu, M., & Kashimura, K. (1995). Apparent usability vs. inherent usability: Experimental analysis on the determinants of the apparent usability. *CHI '95 Conference Companion* (short paper). https://chi1995.chistatic.hosting.acm.org/proceedings/shortppr/mk_bdy.htm
4. Tractinsky, N., Katz, A. S., & Ikar, D. (2000). What is beautiful is usable. *Interacting with Computers*, 13(2), 127–145.
7. Rello, L., Pielot, M., & Marcos, M.-C. (2016). Make It Big! The effect of font size and line spacing on online readability. *Proc. CHI 2016*, 3637–3648. https://doi.org/10.1145/2858036.2858204 · PDF: https://pielot.org/pubs/Rello2016-Fontsize.pdf
8. Dyson, M. C., & Haselgrove, M. (2001). The influence of reading speed and line length on the effectiveness of reading from screen. *International Journal of Human-Computer Studies*, 54(4), 585–612. (Full text not opened; findings verified through multiple secondary summaries.)
9. Dyson, M. C., & Kipping, G. J. (1998). The effects of line length and method of movement on patterns of reading from screen. *Visible Language*, 32(2), 150–181.
10. Shaikh, A. D., & Chaparro, B. S. (2005). The effects of line length on reading performance of online news articles. *Proc. Human Factors and Ergonomics Society 49th Annual Meeting*.
12. Larson, K., & Picard, R. W. (c. 2005, undated). The Aesthetics of Reading. MIT Media Lab / Microsoft. PDF copy: https://outgrow.co/blog/wp-content/uploads/2018/04/05.larson-picard.pdf
13. Larson, K., Hazlett, R. L., Chaparro, B. S., & Picard, R. W. (2007). Measuring the aesthetics of reading. In *People and Computers XX: Engage*. Springer.
14. Shaikh, A. D., Chaparro, B. S., & Fox, D. (2006). Perception of fonts: Perceived personality traits and uses. *Usability News*, 8(1).
15. Shaikh, A. D., Chaparro, B. S., & Fox, D. (2006). Personality of ClearType fonts. *Proc. Human Factors and Ergonomics Society 50th Annual Meeting* (presentation).
16. Hazlett, R. L., Larson, K., Shaikh, A. D., & Chaparro, B. S. (2013). Two studies on how a typeface congruent with content can enhance onscreen communication. *Information Design Journal*, 20(3), 207–219.
17. Alberts, W. A., & van der Geest, T. M. (2011). Color matters: Color as trustworthiness cue in web sites. *Technical Communication*, 58(2). https://www.ingentaconnect.com/contentone/stc/tc/2011/00000058/00000002/art00004 (abstract)
18. Sasidharan, S., & Dhanesh, G. (2007). The role of color in influencing trust in e-commerce web sites. *MWAIS 2007 Proceedings*, 16. https://aisel.aisnet.org/mwais2007/16 (pilot study)
19. Labrecque, L. I., & Milne, G. R. (2012). Exciting red and competent blue: The importance of color in marketing. *Journal of the Academy of Marketing Science*, 40(5), 711–727. https://doi.org/10.1007/s11747-010-0245-y (title and abstract verified; full text not opened)
21. Verduyn, P., Lee, D. S., Park, J., Shablack, H., Orvell, A., Bayer, J., Ybarra, O., Jonides, J., & Kross, E. (2015). Passive Facebook usage undermines affective well-being: Experimental and longitudinal evidence. *Journal of Experimental Psychology: General*, 144(2), 480–488.
22. Valkenburg, P. M., van Driel, I. I., & Beyens, I. (2022). The associations of active and passive social media use with well-being: A critical scoping review. *New Media & Society*, 24(2), 530–549. https://doi.org/10.1177/14614448211065425
23. Rixen, J. O., Meinhardt, L.-M., Glöckler, M., Ziegenbein, M.-L., Schlothauer, A., Colley, M., Rukzio, E., & Gugenheimer, J. (2023). The Loop and Reasons to Break It: Investigating infinite scrolling behaviour in social media applications and reasons to stop. *Proc. ACM on Human-Computer Interaction*, 7(MHCI), Article 228. https://doi.org/10.1145/3604275
27. Mathur, A., Acar, G., Friedman, M. J., Lucherini, E., Mayer, J., Chetty, M., & Narayanan, A. (2019). Dark patterns at scale: Findings from a crawl of 11K shopping websites. *Proc. ACM on Human-Computer Interaction*, 3(CSCW), Article 81. https://doi.org/10.1145/3359183 · https://arxiv.org/abs/1907.07032
28. Gray, C. M., Kou, Y., Battles, B., Hoggatt, J., & Toombs, A. L. (2018). The dark (patterns) side of UX design. *Proc. CHI 2018*, Paper 534. https://doi.org/10.1145/3173574.3174108
35. Verduyn, P., Gugushvili, N., & Kross, E. (2021). The impact of social network sites on mental health: Distinguishing active from passive use. *World Psychiatry*, 20(1), 133–134. https://doi.org/10.1002/wps.20820
36. Meinhardt, L.-M., Elhaidary, M., Colley, M., Rietzler, M., Rixen, J. O., Purohit, A. K., & Rukzio, E. (2025). Scrolling in the Deep: Analysing contextual influences on intervention effectiveness during infinite scrolling on social media. *Proc. CHI 2025*. https://doi.org/10.1145/3706598.3713187

### Standards
30. W3C. Understanding SC 1.4.3 Contrast (Minimum). https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum
31. W3C. Understanding SC 1.4.11 Non-text Contrast. https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast
32. W3C. Understanding SC 2.5.8 Target Size (Minimum). https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html

### Practitioner research and reputable publications
5. Moran, K. (2024 revision). The aesthetic-usability effect. Nielsen Norman Group. https://www.nngroup.com/articles/aesthetic-usability-effect/
6. Moran, K. (3 Sep 2017). Flat UI elements attract less attention and cause uncertainty. Nielsen Norman Group (eyetracking, 71 users). https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty/
11. Smashing Magazine (2009). Typographic design patterns and best practices (survey of 50 sites). https://www.smashingmagazine.com/2009/08/typographic-design-survey-best-practices-from-the-best-blogs/ · 2013 follow-up: https://www.smashingmagazine.com/2013/05/typographic-design-patterns-practices-case-study-2013/
20. Nielsen, J. (31 Oct 2010). Photos as web content (eyetracking). Nielsen Norman Group. https://www.nngroup.com/articles/photos-as-web-content/
24. Neusesser, T. (4 Sep 2022). Infinite scrolling: When to use it, when to avoid it. Nielsen Norman Group. https://www.nngroup.com/articles/infinite-scrolling-tips/
25. Nielsen, J. (3 Dec 2006). Progressive disclosure. Nielsen Norman Group. https://www.nngroup.com/articles/progressive-disclosure/
26. Kaplan, K. (19 Sep 2021). Designing empty states in complex applications: 3 guidelines. Nielsen Norman Group. https://www.nngroup.com/articles/empty-state-interface-design/
29. Anthropic (12 Nov 2025). Improving frontend design through Skills. https://claude.com/resources/articles/improving-frontend-design-through-skills

### Industry commentary (observational, lower reliability)
33. 925 Studios. AI slop fonts and gradients: The tells that give away AI design. https://www.925studios.co/blog/ai-slop-design-tells
34. Glitch guides. How to make AI websites not look AI. https://www.askglitch.com/guides/how-to-make-ai-websites-not-look-ai

### Font sources
- Fraunces (Undercase Type; SIL OFL), axes verified at https://github.com/googlefonts/fraunces
- Figtree (Erik Kennedy; SIL OFL), Google Fonts
- Atkinson Hyperlegible Next (Braille Institute & Applied Design Works; SIL OFL), Google Fonts; details via https://fontsource.org/fonts/atkinson-hyperlegible-next/about

---

## Appendix A. Full fact-check log

Method: each claim in v2 was traced to the primary source (paper PDF, publisher record, conference page, W3C document or the publisher's article). If the primary source wasn't reachable, the closest reliable record (abstract, author page, or multiple consistent secondary summaries) was used and that is noted. Ratios were recomputed with the WCAG 2 formula.

| # | Claim in v2 | Checked against | Result | Action in v3 |
|---|---|---|---|---|
| A1 | Visual appeal judged in ~50 ms; consistent with 500 ms judgments | Lindgaard et al. abstract; *Nature* news | ✅ Confirmed | Kept |
| A2 | Low complexity + high prototypicality = most appealing; effects at 17–50 ms | Tuch et al. abstract (Google Research, Univ. Basel record) | ✅ Confirmed. Added: complexity acts first; prototypicality catches up by 50 ms | Kept, detail added |
| A3 | Kurosu & Kashimura: aesthetic appeal drives perceived usability | CHI '95 short paper | ✅ Confirmed (r=0.589, 26 layouts, 252 raters). Correlational. Familiarity r=0.730 | Added nuance, linked to principle 3 |
| A4 | Tractinsky et al. 2000: aesthetics affected post-use perceptions; actual usability didn't | Author's research page abstract | ✅ Confirmed | Kept |
| A5 | NN/g: attractive design forgives minor issues; masks problems in testing | NN/g article (Kate Moran, 2024 revision) | ✅ Confirmed. v2 had no date | Dated |
| A6 | NN/g flat UI: weak signifiers slower | NN/g article (Moran, 2017) | ✅ Confirmed: 71 users, 9 pages, +22% time, +25% fixations; v2 linked the wrong NN/g article | Fixed link, added numbers and conditions |
| A7 | Rello et al.: readability improves to 18pt; 10–12pt hurt comprehension; extreme spacing hurt | Full paper PDF | ✅ Findings confirmed. ❌ v2 implied 16px was adequate; 16px ≈ 12pt. N=104, Arial, Wikipedia | **Body raised to 18px; long text 20–24px** |
| A8 | ~55 cpl best on screen | Multiple summaries of Dyson & Haselgrove 2001; Dyson & Kipping 1998 abstract; Shaikh & Chaparro 2005 abstract | ✅ Confirmed for speed+comprehension balance. ⚠️ Long lines can be faster; preferences mixed | Qualified |
| A9 | Smashing: line-height ratio 1.48 across 50 sites | Smashing Magazine 2009 article | ✅ Confirmed | Kept |
| A10 | Larson & Picard: good typography → good mood, shorter perceived time, better creative tasks | Paper PDF | ⚠️ Two studies, n=20 each; mood inferred; subjective-duration effect in both; candle task significant in study 1 only; RAT not significant; undated | Qualified, 🟠 Limited |
| A11 | Shaikh et al. 2006: serif stable/mature/formal; sans casual/neutral | Usability News record; HFES 2006 ClearType abstract | ⚠️ "Casual" is from the HFES paper; Usability News found sans-serifs neutral | Attribution split into [14] and [15] |
| A12 | Hazlett et al. 2013: congruent typeface affects emotional processing | Publisher/author abstract | ✅ Confirmed | Kept |
| A13 | Blue most trustworthy, black least; limited effect | Abstract via library listings; author confirmed as Wouter A. Alberts | ✅ Confirmed | Kept, author name verified |
| A14 | Sasidharan & Dhanesh: blue most trust (pilot) | AIS eLibrary abstract | ✅ Confirmed (pilot study) | Labelled as pilot |
| A15 | Labrecque & Milne: hue/saturation/value shape personality; blue → competence | Title and abstract | ✅ Partially: abstract confirms hue mapping and saturation/value roles; "competent blue" is in the title. Full text not opened | Noted as partially verified |
| A16 | NN/g: users study real-people photos, ignore stock | NN/g article (Nielsen, 2010) | ✅ Confirmed (eyetracking) | Dated |
| A17 | Verduyn 2015: passive use lowers well-being via envy; active doesn't | Publisher record; U-Michigan release | ✅ Confirmed for that study | Kept |
| A18 | (implied) Active/passive distinction is settled | Valkenburg et al. 2022 scoping review | ❌ Not settled: hypotheses mostly unsupported across 40 surveys | Added counter-evidence; principle relabelled 🟠 |
| A19 | Rixen 2023: infinite scroll linked to regret | Full paper PDF | ⚠️ Own finding is lower valence for scroll-heavy sessions and "loops"; regret is from cited prior work. N=46 | Re-worded; full author list and DOI added |
| A20 | Meinhardt 2025 CHI | KIT repository record | ✅ Venue/DOI confirmed | Kept |
| A21 | NN/g infinite scroll guidance | NN/g article (Neusesser, 2022) | ✅ Confirmed; added accessibility details (footer, keyboard, screen readers, ARIA feed) | Expanded |
| A22 | NN/g progressive disclosure | NN/g article (Nielsen, 2006) | ✅ Confirmed: improves learnability, efficiency, error rate; >2 levels hurts | Added 2-level rule |
| A23 | NN/g empty states: status, learning, direct path | NN/g article (Kaplan, 2021) | ✅ Confirmed; in-context help beats up-front tutorials | Kept, dated |
| A24 | Mathur 2019: dark patterns on >10% of 11K sites | Full paper | ✅ 1,818 instances, 1,254 of 11,286 sites (11.1%), 15 types, 7 categories, 183 deceptive sites | Added full taxonomy mapping |
| A25 | Gray 2018: five strategies | Paper/record | ✅ Nagging, obstruction, sneaking, interface interference, forced action | Kept |
| A26 | Anthropic 2025: Inter, purple gradients on white, predictable layouts | Anthropic article (12 Nov 2025) | ✅ Confirmed; also names minimal animations | Kept |
| A27 | 925 Studios & Glitch as "reputable newsletters" | Source type review | ❌ Agency/tool blogs | Moved to "industry commentary" |
| A28 | WCAG 1.4.3: 4.5:1 / 3:1 | W3C Understanding doc | ✅ Confirmed; thresholds are not rounded | Kept |
| A29 | (missing in v2) Non-text contrast | W3C Understanding 1.4.11 | ❌ v2 input borders (Sand, 1.23:1) and Apricot dots (2.53:1) failed | **Added Stone token; dots/badges moved to Clay** |
| A30 | Tap targets ≥44×44 | W3C SC 2.5.8 | ⚠️ AA is 24×24; 44×44 is AAA (2.5.5) | Labelled correctly |
| A31 | Palette contrast table | Recomputed | ✅ All v2 text pairs correct. ❌ Dark mode lacked success/error values | Added dark Moss/Brick and full matrix |
| A32 | Tailwind default blue `#3B82F6` / indigo `#6366F1` | Tailwind palette documentation summaries | ⚠️ v3 values; v4 uses OKLCH with shifted colors | Clarified |
| A33 | Fraunces SOFT/WONK axes | Official googlefonts/fraunces repository | ✅ opsz 9–144, wght 100–900, SOFT 0–100, WONK 0–1 (auto-on above opsz 18) | Added axis notes |
| A34 | Google Fonts URL works | Live request | ⚠️ Could not test (network blocked in build environment) | Added Fontsource option + test T-TYPE-1 |
| A35 | Atkinson Hyperlegible Next available | Fontsource record | ✅ Google Fonts, variable 200–800, OFL | Kept |
| A36 | Figtree availability/weights | Font directory record | ✅ Google Fonts, OFL, variable wght (range listed inconsistently by third parties; check specimen) | Kept |
| A37 | "60/30/10" rule | Source search | ⚠️ Design convention, not research | Labelled ⚪ Practice |
| A38 | Phosphor/Tabler "warmer than Lucide" | — | ⚠️ Opinion | Reworded as a decision |
| A39 | Dark-mode white text on light-blue button | Recomputed | ❌ Would fail; v2 already flagged; token `--on-harbor` now enforces it | Fixed in tokens |

---

## Appendix B. Full contrast matrix

Computed with the WCAG 2 relative-luminance formula. "Text" requires 4.5:1 (3:1 for large text); "UI" requires 3:1.

| Foreground | Background | Type | Use | Light | Dark |
|---|---|---|---|---|---|
| ink | paper | Text | Body text | 14.71 ✅ | 14.44 ✅ |
| ink | card | Text | Text on cards | 15.34 ✅ | 12.87 ✅ |
| ink | mist | Text | Text on tinted panels | 13.47 ✅ | 10.90 ✅ |
| ink | sky | Text | Initials on avatar | 8.55 ✅ | 5.79 ✅ |
| ink | apricot-tint | Text | Banner text | 12.92 ✅ | 11.33 ✅ |
| ink | moss-tint | Text | Banner text | 13.38 ✅ | 10.19 ✅ |
| ink | brick-tint | Text | Banner/error summary text | 12.74 ✅ | 12.10 ✅ |
| driftwood | paper | Text | Meta text | 5.37 ✅ | 6.96 ✅ |
| driftwood | card | Text | Meta on cards | 5.59 ✅ | 6.21 ✅ |
| driftwood | mist | Text | Meta on tint | 4.91 ✅ | 5.26 ✅ |
| harbor | paper | Text | Links | 6.70 ✅ | 7.07 ✅ |
| harbor | card | Text | Links on cards | 6.99 ✅ | 6.30 ✅ |
| harbor | mist | Text | Selected/hover text | 6.14 ✅ | 5.34 ✅ |
| harbor-deep | mist | Text | Tags | 8.50 ✅ | 7.08 ✅ |
| on-harbor | harbor | Text | Primary button, own bubbles, shared tags | 7.10 ✅ | 7.07 ✅ |
| on-harbor | harbor-deep | Text | Primary hover | 9.84 ✅ | 9.38 ✅ |
| clay | paper | Text | Accent text | 4.77 ✅ | 8.34 ✅ |
| clay | card | Text | Accent text on cards | 4.98 ✅ | 7.43 ✅ |
| on-clay | clay | Text | Badge count | 5.06 ✅ | 8.34 ✅ |
| moss | paper | Text | Success text | 4.71 ✅ | 8.20 ✅ |
| moss | card | Text | Success text on cards | 4.92 ✅ | 7.31 ✅ |
| brick | paper | Text | Error text | 5.37 ✅ | 7.17 ✅ |
| brick | card | Text | Error text on cards | 5.60 ✅ | 6.39 ✅ |
| on-danger | brick | Text | Danger button | 5.69 ✅ | 7.17 ✅ |
| paper | ink | Text | Toast (inverted) | 14.71 ✅ | 14.44 ✅ |
| stone | paper | UI | Input/checkbox border | 3.78 ✅ | 4.07 ✅ |
| stone | card | UI | Input border on card | 3.95 ✅ | 3.62 ✅ |
| stone | mist | UI | Chip border on tint | 3.47 ✅ | 3.07 ✅ |
| harbor | paper | UI | Focus ring | 6.70 ✅ | 7.07 ✅ |
| harbor | card | UI | Focus ring on card | 6.99 ✅ | 6.30 ✅ |
| clay | paper | UI | Unread dot | 4.77 ✅ | 8.34 ✅ |
| moss | moss-tint | UI | Banner icon | 4.29 ✅ | 5.78 ✅ |
| brick | brick-tint | UI | Banner icon | 4.65 ✅ | 6.00 ✅ |
| clay | apricot-tint | UI | Banner icon | 4.19 ✅ | 6.54 ✅ |
| sand | paper | Decorative | Dividers, card outline (not a control boundary) | 1.23 (n/a) | 1.52 (n/a) |
| apricot | paper | Decorative | Illustration accents only | 2.53 (n/a) | 8.34 (n/a) |

Result: **every required text and UI pair passes in both modes.** Sand and Apricot are listed to show why they are restricted to decoration.

*End of specification.*

