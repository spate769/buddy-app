# UX Design Spec: High-Engagement Interactive Platform

**As of:** 2026-11-04 · **Fact-checked:** 2026-11-04 (see [Section 16](#16-fact-check-log))

**Assumption:** This spec is written for a content and community platform, where people browse, interact with and create content. Section 3.4 shows how to rename the five core destinations for a marketplace, SaaS or learning product. The layouts, button positions and labelling rules stay the same.

---

## Contents

1. [Executive summary](#1-executive-summary)
2. [Foundations: the cognitive principles](#2-foundations-the-cognitive-principles)
3. [Sitemap and navigation](#3-sitemap-and-navigation)
4. [Layout system and design tokens](#4-layout-system-and-design-tokens)
5. [Global components: what sits where](#5-global-components-what-sits-where)
6. [Page-by-page specifications](#6-page-by-page-specifications)
7. [Master link map: every button and where it goes](#7-master-link-map-every-button-and-where-it-goes)
8. [Labelling and microcopy](#8-labelling-and-microcopy)
9. [Click-through rate: CTAs, copy and layout](#9-click-through-rate-ctas-copy-and-layout)
10. [Onboarding and activation](#10-onboarding-and-activation)
11. [Engagement and time on platform](#11-engagement-and-time-on-platform)
12. [Performance, accessibility and mobile](#12-performance-accessibility-and-mobile)
13. [Ethical guardrails](#13-ethical-guardrails)
14. [Metrics, event tracking and experimentation](#14-metrics-event-tracking-and-experimentation)
15. [Sources](#15-sources)
16. [Fact-check log](#16-fact-check-log)

---

## 1. Executive summary

The research is consistent: the platforms that keep users longest win on speed, clarity and getting users to value fast, not on tricks. Ten rules do most of the work:

1. **Be fast.** The chance of a bounce rises 32% as mobile load time goes from 1 s to 3 s (Google/SOASTA, 2017). Target LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1.
2. **Look good in the first 50 ms.** People judge visual appeal almost instantly, and that judgment colours how usable and trustworthy they later find the site (Lindgaard 2006; Kurosu & Kashimura 1995).
3. **Keep navigation visible.** In NN/g testing with 179 participants, hiding the main navigation cut its discoverability almost in half on desktop: people used hidden menus in 27% of cases, against 48–50% for visible navigation. Use a bottom tab bar with 3–5 items on mobile and a visible top bar or rail on desktop.
4. **Show fewer choices per screen.** Decision time grows with the number of options (Hick's law). Give each screen one primary action.
5. **Make targets big and close.** Bigger, closer targets are faster to hit (Fitts's law). Use at least 44×44 pt on iOS and 48×48 dp on Android.
6. **Design for scanning.** People read in F-patterns and layer-cake patterns. Put the key words first in headings, bold the important phrases, and put the CTA where the eye lands.
7. **Get users to the "aha" moment in their first session.** Activation predicts retention better than anything you do later.
8. **Personalize the feed.** At Netflix, recommendations influence about 80% of hours streamed.
9. **Build habits through value, not compulsion.** Variable rewards, streaks and notifications work, but overusing them drives opt-outs and churn.
10. **Test everything and trust little.** Most ideas fail in controlled experiments. Measure retention and satisfaction, not only clicks.

---

## 2. Foundations: the cognitive principles

Six well-replicated principles drive every spec below.

| Principle | What the research says | Design rule |
| --- | --- | --- |
| Hick's law (Hick, 1952) | Decision time rises with the log of the number of choices | One primary action per screen; 5–7 top-level menu items; group the rest |
| Fitts's law (Fitts, 1954) | The time to hit a target depends on its distance and size | Large primary buttons within easy thumb reach on mobile; on desktop, use screen edges and corners (the pointer can't overshoot them) |
| Cognitive load (Sweller, 1988) | Working memory holds only a few items, and extra load slows learning and raises errors | Progressive disclosure; split forms into steps; let users recognize options instead of recalling them |
| Jakob's law ([NN/g](https://www.nngroup.com/articles/end-of-web-design/)) | Users spend most of their time on other sites and expect yours to work the same way | Use standard patterns: logo top-left, search at the top, profile top-right, bottom tabs on mobile |
| Aesthetic–usability effect (Kurosu & Kashimura, 1995) | People perceive attractive interfaces as easier to use | Invest in polish (consistent spacing, type scale and colour), which buys tolerance for minor friction |
| First impressions ([Lindgaard et al., 2006](https://www.websiteoptimization.com/speed/tweak/blink/)) | People judge visual appeal after 50 ms of exposure, and the judgment sticks | Clean above-the-fold layout, strong hierarchy, no clutter on landing screens |

**Scanning.** NN/g eyetracking shows that when nothing guides the eye, users scan in an [F-shaped pattern](https://nngroup.com/articles/f-shaped-pattern-reading-web-content/). The first lines and the left edge get the most attention. Start headings and list items with the words that carry the information, and add a clear subheading every 3–5 paragraphs. For sparse marketing pages, designers commonly use a **Z-pattern** layout (top-left → top-right → diagonal → bottom-right): logo top-left, CTA top-right, and the CTA repeated bottom-right. This is a practitioner heuristic, not an eyetracking finding.

**Gestalt grouping.** Proximity and shared containers tell users which things belong together. The space between groups must be at least 2× the space inside a group.

**Logo placement.** In NN/g's 2016 test of 14 fashion-retail sites, users were 6 times as likely to fail to get home in one click when the logo was centred (about 24% failed, against 4% with a left-aligned logo) ([NN/g, centered logos](https://nngroup.com/articles/centered-logos/); figures via [WPMU DEV](https://wpmudev.com/blog/logo-placement/)). Always place the logo top-left and link it to Home.

---

## 3. Sitemap and navigation

### 3.1 Sitemap

```
Logged out
├── Landing  /
├── Explore (public preview)  /explore
├── Log in  /login
├── Sign up  /signup
├── Pricing  /pricing            (only if you have a paid tier)
├── Help centre  /help
└── Legal  /terms  /privacy  /cookies

Logged in
├── Onboarding  /welcome/interests → /welcome/follow → /welcome/notifications
├── [Tab 1] Home  /home                     (feed: For you | Following)
├── [Tab 2] Discover  /discover             (search, trending, categories)
│   └── Search results  /search?q=…         (Top | People | Posts | Topics)
│   └── Topic page  /topic/:slug
├── [Tab 3] Create  /create                 (modal over current page)
├── [Tab 4] Activity  /activity             (All | Mentions)
├── [Tab 5] Profile  /:username             (Posts | Likes | Saved*)
│   ├── Followers  /:username/followers
│   ├── Following  /:username/following
│   └── Edit profile  /settings/profile
├── Messages  /messages → /messages/:threadId
├── Content detail  /p/:postId
├── Saved  /saved
└── Settings  /settings
    ├── Account  /settings/account
    ├── Privacy and safety  /settings/privacy
    ├── Notifications  /settings/notifications
    ├── Display  /settings/display
    ├── Accessibility  /settings/accessibility
    ├── Billing  /settings/billing
    └── Help and support  /help

System: 404, error, offline, maintenance
* Saved is visible only on your own profile
```

**Depth rule.** Every core page is no more than 2 taps from any tab root, and no more than 3 from Home.

### 3.2 Primary navigation by screen size

| Screen width | Pattern | Position | Items, in order |
| --- | --- | --- | --- |
| < 600 px (phone) | Bottom tab bar | Fixed to the bottom, 56 px tall + safe area | Home · Discover · Create · Activity · Profile |
| 600–1023 px (tablet) | Navigation rail | Fixed to the left, 80 px wide | Logo, then the same 5 items stacked, Settings at the bottom |
| ≥ 1024 px (desktop) | Top bar + left sidebar | Top bar 64 px; sidebar 240 px | Top bar: logo, search, Create, Messages, Activity, avatar. Sidebar: Home, Discover, Saved, Topics you follow |

Android's guidelines specify a navigation bar with **3–5 destinations** on compact screens that becomes a **navigation rail** on large screens ([Android layout and navigation patterns](https://developer.android.com/design/ui/mobile/guides/layout-and-content/layout-and-nav-patterns)). Apple's tab bar follows the same convention.

### 3.3 Navigation rules

- **Always show a text label** under every tab icon. Icon-only navigation is less discoverable.
- **The active tab** uses a filled icon, the brand colour and a bold label. Inactive tabs use an outlined icon and secondary text colour.
- **Tapping the active tab again** scrolls to the top. A second tap refreshes.
- **Each tab keeps its own history stack.** Switching tabs and coming back returns users to where they were.
- **Badges:** a red dot on Activity for unread items, and a number on Messages capped at "9+". Never put badges on Home or Discover.
- **The system back gesture or button** always goes back one step and keeps scroll position and filters.
- **Hide the bottom bar** only inside full-screen flows (Create, a message thread, video playback). Bring it back on exit.
- **The hamburger menu** is allowed only for secondary links (Help, Legal) on logged-out mobile pages.

### 3.4 Adapting the five destinations to other platform types

| Platform type | Tab 1 | Tab 2 | Tab 3 (centre) | Tab 4 | Tab 5 |
| --- | --- | --- | --- | --- | --- |
| Content / community (this spec) | Home | Discover | Create | Activity | Profile |
| Marketplace | Home | Search | Sell | Inbox | Account |
| SaaS / workspace | Home | Projects | New | Inbox | Profile |
| Learning | Learn | Explore | Practice | Leaderboard | Profile |
| Booking / services | Explore | Saved | Bookings | Messages | Account |

---

## 4. Layout system and design tokens

### 4.1 Grid and breakpoints

| Breakpoint | Columns | Gutter | Side margin | Max content width |
| --- | --- | --- | --- | --- |
| < 600 px | 4 | 16 px | 16 px | 100% |
| 600–1023 px | 8 | 24 px | 24 px | 100% minus the 80 px rail |
| 1024–1439 px | 12 | 24 px | 32 px | 1200 px |
| ≥ 1440 px | 12 | 32 px | auto (centred) | 1280 px |

**Desktop three-column app layout:** left sidebar 240 px · main column 600–680 px · right sidebar 320 px. Below 1280 px, drop the right sidebar first. Below 1024 px, the left sidebar becomes the rail.

**Reading width:** body text never exceeds 75 characters per line (about 680 px at 16 px).

### 4.2 Spacing (8-pt grid)

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96`

- Inside a component (icon to label, avatar to name): 8 px
- Between related items (fields in a group, card rows): 12–16 px
- Between groups and cards: 24 px
- Between page sections: 48 px on mobile, 64–96 px on desktop

### 4.3 Typography

| Token | Size / line height | Weight | Use |
| --- | --- | --- | --- |
| Display | 40/48 (mobile 32/40) | 700 | Landing page H1 only |
| H1 | 32/40 (mobile 24/32) | 700 | Page titles |
| H2 | 24/32 (mobile 20/28) | 600 | Section titles |
| H3 | 18/26 | 600 | Card titles, list headers |
| Body | 16/24 | 400 | All running text (never smaller on mobile) |
| Label | 14/20 | 500–600 | Buttons, tabs, form labels |
| Caption | 12/16 | 400 | Timestamps, metadata, helper text |

Use one typeface (a system stack or one variable font) with at most 3 weights.

### 4.4 Colour roles

| Role | Rule |
| --- | --- |
| Primary (accent) | Used **only** for the primary CTA, the active tab, links and focus. This exclusivity is what makes the CTA stand out (von Restorff effect). |
| On-primary | Text and icons on primary. Contrast ≥ 4.5:1 |
| Surface / background | Page background and cards. Provide light and dark versions |
| Surface variant | Inputs, chips, secondary containers |
| Text primary / secondary | ≥ 4.5:1 / ≥ 4.5:1 on surface (secondary is lighter but still passes) |
| Border / divider | ≥ 3:1 for input borders; dividers can be subtler |
| Error / warning / success | Always paired with an icon and text, never colour alone |

### 4.5 Shape, elevation and motion

- Corner radius: 8 px for inputs and small buttons, 12 px for cards and sheets, full (pill) for chips and avatars.
- Elevation: flat cards with a 1 px border in light mode. Only menus, sheets and dialogs float.
- Motion: 150 ms for micro-interactions (button press, like), 250 ms for sheets and page transitions, ease-out. Respect "reduce motion".

### 4.6 Buttons

| Type | Look | Height | When |
| --- | --- | --- | --- |
| Primary | Filled with the accent colour | 48 px mobile / 40–44 px desktop | One per screen or section: the action you want |
| Secondary | Outlined or tonal | Same | The alternative action |
| Tertiary / text | Text only, accent colour | Same hit area | Low-emphasis actions ("Skip", "Cancel") |
| Destructive | Filled red (in confirmation dialogs only) | Same | Delete, Remove, Block |
| Icon button | 24 px icon in a 44–48 px hit area | 44–48 px | Toolbar actions; always has a tooltip (desktop) and an accessible name |

**Order of buttons in pairs:**
- **Dialogs and forms:** secondary on the left, primary on the right (`[Cancel] [Save]`). On mobile full-width stacks, put primary on **top**.
- **Full-screen flows (Create, Edit):** Cancel top-left as text, primary action top-right ("Post", "Save").
- **Never** use two primary buttons side by side.

---

## 5. Global components: what sits where

### 5.1 Mobile top bar (56 px, on tab roots)

```
┌────────────────────────────────────────┐
│ [Logo]                       [✉] [⚙]* │   * ⚙ only on your own Profile tab
└────────────────────────────────────────┘
```

| Position | Element | Label / accessible name | Action |
| --- | --- | --- | --- |
| Left | Logo | "Home" | → /home (or scroll to top if already there) |
| Right 1 | Messages icon + count badge | "Messages" | → /messages |
| Right 2 (Profile tab only) | Settings icon | "Settings" | → /settings |

On **inner pages** (detail, settings sub-pages), the top bar becomes: `[← Back]  Page title (centred or left)  [contextual action]`.

**Scroll behaviour:** the top bar hides when scrolling down and reappears on the first upward scroll. The bottom tab bar always stays visible.

### 5.2 Mobile bottom tab bar (56 px + safe area)

```
┌────────┬────────┬────────┬────────┬────────┐
│   ⌂    │   ⌕    │   ⊕    │   ♡•   │   ◯    │
│  Home  │Discover│ Create │Activity│Profile │
└────────┴────────┴────────┴────────┴────────┘
```

- Each tab is an equal-width target of at least 48 dp. Create is in the **centre**, in the thumb's natural arc.
- Create opens a **bottom sheet** listing the create types (Post, Photo or video, Poll, Event). If you have only one type, open the editor directly.
- Profile can show the user's avatar (24 px) instead of an icon.

### 5.3 Desktop top bar (64 px, sticky)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ [Logo]   [⌕ Search people, topics, posts…          ]   [+ Create]  ✉  ♡•  (Avatar▾) │
└──────────────────────────────────────────────────────────────────────────────────┘
  32px     search min 27 characters, 400–560 px           primary btn  icons  menu
```

| Position (left → right) | Element | Spec | Action |
| --- | --- | --- | --- |
| 1 | Logo | 32 px tall, 32 px from the left edge | → /home |
| 2 | Search field | An open text field (not just an icon), at least 27 characters wide, per NN/g guidance repeated in the [U.S. Web Design System](https://designsystem.digital.gov/components/search/). Secondary sources say this width fits about 90% of queries. Placeholder: "Search people, topics, posts". Keyboard shortcut `/` | Typing shows a suggestions dropdown; Enter → /search?q= |
| 3 | Create | Primary button with icon and label "Create" | Opens the Create modal |
| 4 | Messages | Icon button + count badge, tooltip "Messages" | → /messages |
| 5 | Activity | Icon button + dot badge, tooltip "Activity" | Opens an Activity dropdown panel (latest 10) with "See all" → /activity |
| 6 | Avatar menu | 32 px avatar + chevron | Opens the account menu (5.5) |

### 5.4 Desktop left sidebar (240 px)

```
  ⌂  Home              ← active: filled icon, bold, accent bar on the left edge
  ⌕  Discover
  ☆  Saved
  ─────────────
  YOUR TOPICS
  #  Design
  #  Photography
  #  + Browse topics
  ─────────────
  (bottom) Help · Terms · Privacy · © 2026
```

### 5.5 Account menu (avatar dropdown or sheet)

Items in this order:

1. **[Avatar] Your name** / "View profile" → /:username
2. Saved → /saved
3. Settings → /settings
4. Display: Light / Dark / System (inline toggle)
5. Help and support → /help
6. *(divider)*
7. Log out → confirmation is not needed; log out and go to /

### 5.6 Content card (used in Home, Discover, Profile, Saved)

```
┌──────────────────────────────────────────┐
│ (Av) Name · @handle · 3h            [⋯]  │  ← header row, 40 px avatar
│                                          │
│ Title or first line of text, bold if     │  ← max 3 lines, then "more"
│ title, max 3 lines then …more            │
│ ┌──────────────────────────────────────┐ │
│ │            media 4:5 or 16:9         │ │  ← full card width
│ └──────────────────────────────────────┘ │
│ ♡ 1.2K    💬 84    ↗ Share          🔖   │  ← action row, 44 px targets
└──────────────────────────────────────────┘
```

| Part | Action |
| --- | --- |
| Avatar or name | → author profile |
| Body or media (anywhere else on the card) | → /p/:postId (content detail) |
| ♡ Like | Toggles in place (optimistic UI). Double-tapping media also likes |
| 💬 Comment count | → /p/:postId#comments with the comment box focused |
| ↗ Share | Opens the native share sheet (mobile) or a share menu: Copy link, Send in Messages, external apps |
| 🔖 Save (right-aligned) | Toggles saved; shows a toast "Saved · View" (View → /saved) |
| ⋯ Overflow | Menu: Not interested · Unfollow @name · Copy link · Report (Report is last and red) |

### 5.7 Feedback components

| Component | Position | Duration | Use |
| --- | --- | --- | --- |
| Toast / snackbar | Bottom centre, above the tab bar | 4 s, or until dismissed if it has an action | Confirmations with Undo ("Post deleted · Undo") |
| Inline error | Under the field | Until fixed | Form validation |
| Banner | Top of content, under the top bar | Until dismissed | Offline, account warnings, system notices |
| Dialog | Centred (desktop), bottom sheet (mobile) | Until a choice is made | Destructive confirmations only |
| Skeleton | In place of content | While loading | Every list and page load longer than 300 ms |

### 5.8 Footer (logged-out pages only)

Four columns on desktop, an accordion on mobile: **Product** (Features, Pricing, Explore) · **Company** (About, Careers, Press) · **Resources** (Help centre, Community guidelines, Blog) · **Legal** (Terms, Privacy, Cookies). The bottom row holds the language selector, social icons and © year. Logged-in app pages have no footer; those links live in the desktop left sidebar bottom and in Settings › About.

---

## 6. Page-by-page specifications

Each page lists its **goal**, its **one primary action**, a **wireframe**, and every element with its **position, label and destination**.

### 6.1 Landing page (logged out) `/`

**Goal:** turn a visitor into a sign-up. **Primary action:** "Get started — it's free".

```
┌──────────────────────────────────────────────────────────────┐
│ [Logo]        Explore  Pricing  Help        Log in [Sign up] │  header 64 px
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   H1: Value proposition in ≤ 8 words           ┌──────────┐  │
│   Subhead: who it's for + outcome, ≤ 20 words  │ product  │  │  hero
│   [ Get started — it's free ]  See how it works│ visual / │  │
│   No credit card needed                        │ live feed│  │
│                                                └──────────┘  │
├──────────────────────────────────────────────────────────────┤
│   ★★★★★ 4.8 · 120K members · logos of known users            │  social proof
├──────────────────────────────────────────────────────────────┤
│   [Benefit 1]        [Benefit 2]        [Benefit 3]          │  3 benefits
│   icon, 3-word title, 1 sentence each                        │
├──────────────────────────────────────────────────────────────┤
│   Live preview: 6 trending posts (clickable, no login)       │  try before signup
│   [ Explore more ]                                           │
├──────────────────────────────────────────────────────────────┤
│   How it works: 1 → 2 → 3                                    │
├──────────────────────────────────────────────────────────────┤
│   Testimonials (named, photo, role)                          │
├──────────────────────────────────────────────────────────────┤
│   FAQ (5–7 questions, accordion)                             │
├──────────────────────────────────────────────────────────────┤
│   Final CTA band: H2 + [ Get started — it's free ]           │
├──────────────────────────────────────────────────────────────┤
│   Footer                                                     │
└──────────────────────────────────────────────────────────────┘
```

| Element | Position | Label | Links to |
| --- | --- | --- | --- |
| Logo | Header, left | — | / |
| Nav links | Header, centre-left | Explore · Pricing · Help | /explore · /pricing · /help |
| Log in | Header, right | "Log in" (text button) | /login |
| Sign up | Header, far right | "Sign up" (primary, small) | /signup |
| Hero CTA | Hero, under the subhead, left-aligned | "Get started — it's free" | /signup |
| Secondary hero link | Next to the CTA | "See how it works" | Scrolls to How it works, or plays a 60 s video in a modal |
| Risk reducer | Under the CTA, caption size | "No credit card needed" | — |
| Preview cards | Mid-page | Post titles | /p/:id (public view, with a sign-up prompt after 3 views) |
| Explore more | Under the preview | "Explore more" (secondary) | /explore |
| Final CTA | Bottom band | "Get started — it's free" | /signup |

**Mobile:** the header shows Logo left and "Log in" + "Sign up" right. The hero stacks: H1, subhead, full-width CTA, then the visual. Show a sticky bottom CTA bar ("Get started") after the user scrolls past the hero CTA.

### 6.2 Sign up `/signup` and Log in `/login`

**Goal:** account created in under 30 seconds. **Primary action:** "Continue".

```
┌────────────────────────────┐
│          [Logo]            │
│   Create your account      │  H1
│                            │
│ [ G  Continue with Google ]│  social / passkey first
│ [   Continue with Apple   ]│
│ ───────── or ─────────     │
│ Email                      │
│ [________________________] │
│ [        Continue        ] │  primary
│                            │
│ By continuing you agree to │  caption, links
│ the Terms and Privacy Policy│
│                            │
│ Already have an account?   │
│ Log in                     │
└────────────────────────────┘
  max width 400 px, centred
```

| Element | Position | Label | Links to / behaviour |
| --- | --- | --- | --- |
| Social buttons | Top, full width | "Continue with Google", "Continue with Apple" | OAuth → onboarding |
| Email field | Middle | Label above: "Email"; type=email; autofocus on desktop | — |
| Continue | Under the field | "Continue" | Step 2: create a password **or** send a magic link / passkey prompt |
| Legal text | Under the button | "By continuing, you agree to the Terms and Privacy Policy" | /terms, /privacy (open in a new tab) |
| Switch link | Bottom | "Already have an account? **Log in**" | /login |

- Ask for **email only** on the first screen. Ask for name and username during onboarding, pre-filled from the social account where possible.
- Password rules show as a live checklist under the field, not as an error after submit.
- **Log in** mirrors this layout. H1: "Welcome back". Add "Forgot password?" right-aligned above the password field (→ /reset). Bottom link: "New here? **Sign up**".
- After login, return users to the page they came from (deep link preserved), otherwise /home.

### 6.3 Onboarding `/welcome/*` (3 steps)

**Goal:** a personalized first feed. **Primary action:** "Continue".

```
┌────────────────────────────┐
│ ●●○  Step 2 of 3     Skip  │  progress left, Skip right (steps 2–3 only)
│                            │
│ Pick topics you like       │  H1
│ We'll use these to build   │  subhead
│ your feed.                 │
│                            │
│ (Design)(Music)(Travel)    │  chips, 2-line wrap
│ (Food)(Tech)(Photography)  │
│ (Fitness)(Books)(Gaming) … │
│                            │
├────────────────────────────┤
│ [  Continue · pick 1 more  ]│  sticky bottom, disabled until 3 picked
└────────────────────────────┘
```

| Step | H1 | Content | Primary button | Secondary |
| --- | --- | --- | --- | --- |
| 1 `/welcome/interests` | "Pick topics you like" | 20–30 topic chips; pick at least 3 | "Continue" (shows "pick N more" until valid) | none (this step builds the feed) |
| 2 `/welcome/follow` | "Follow a few people to start" | 6–10 suggested accounts, based on step 1, each with a "Follow" button; a "Follow all" link at the top | "Continue" | "Skip" (top-right) |
| 3 `/welcome/notifications` | "Get notified when people reply" | Plain-language list of what they'll receive, plus a preview image | "Turn on notifications" (then the OS prompt) | "Not now" |

- **No pre-selected follows or chips.** Users choose; "Follow all" is an explicit action.
- End → /home, with a dismissible **"Get started" checklist card** at the top of the feed: ✔ Create account (pre-ticked), ○ Follow 5 people, ○ Like or save a post, ○ Make your first post, ○ Add a profile photo.

### 6.4 Home `/home`

**Goal:** consume and react. **Primary action:** open or react to content.

**Mobile**

```
┌────────────────────────────┐
│ [Logo]               [✉3]  │  top bar (hides on scroll down)
│  For you  │  Following     │  segmented tabs, sticky
├────────────────────────────┤
│ ┌ Get started 2/5 ──── ✕ ┐ │  checklist (new users only)
│ └────────────────────────┘ │
│ ┌ Continue watching ─────┐ │  "Continue" row (returning users)
│ └────────────────────────┘ │
│ [ Content card ]           │
│ [ Content card ]           │
│ [ Suggested people row → ] │  every ~8 cards
│ [ Content card ]           │
│ ── You're all caught up ── │  in Following, after the last new post
├────────────────────────────┤
│ Home Discover ⊕ Activity Me│  tab bar
└────────────────────────────┘
```

**Desktop:** left sidebar (5.4) · main column (tabs + feed, 600–680 px) · right sidebar with: "Who to follow" (3 people, Follow buttons, "Show more" → /discover?tab=people), "Trending" (5 topics → /topic/:slug), then footer links.

| Element | Position | Label | Action |
| --- | --- | --- | --- |
| Feed tabs | Under the top bar, sticky | "For you" (default) · "Following" | Switch feed; remember the last choice |
| New posts pill | Floats at top centre when new items arrive | "↑ New posts" | Scrolls to top and loads them (never auto-inserts and shifts content) |
| Checklist card | First item, new users only | "Get started · 2 of 5" | Each item deep-links to the action; ✕ dismisses |
| Continue row | First item for returning users | "Continue where you left off" | → the item at the saved position |
| Content cards | Main list | see 5.6 | see 5.6 |
| Suggested row | Every 8–10 cards | "People you might like" | Horizontal carousel with Follow buttons |
| Caught-up marker | After the last unseen post in Following | "You're all caught up" + "See older posts" | Natural stopping point |
| Pull to refresh | Top (mobile) | — | Reloads the feed |

**Feed loading:** infinite scroll on Home. Prefetch the next page 3 cards before the end. Show skeleton cards while loading.

### 6.5 Discover `/discover` and Search results `/search?q=`

**Goal:** find something new. **Primary action:** search or tap a topic.

```
┌────────────────────────────┐
│ [⌕ Search people, topics…] │  full width, 48 px
│ (All)(Design)(Music)(Tech)→│  category chips, horizontal scroll
├────────────────────────────┤
│ Trending now               │  H2 + "See all" right
│ [card][card][card] →       │
│ Popular in Design          │  rows by the user's interests
│ [card][card][card] →       │
│ People to follow           │
│ (Av)(Av)(Av)(Av) →         │
│ New this week              │
│ ▦ ▦ ▦  (grid)              │
└────────────────────────────┘
```

**On search focus** (before typing): "Recent" (up to 8, each with ✕, plus "Clear all") and "Trending searches" (5).

**While typing** (from 2 characters): up to 8 suggestions, grouped as People (avatar), Topics (#) and Posts (text). Matched characters in bold. Enter → full results.

**Results page:**

| Element | Position | Label | Action |
| --- | --- | --- | --- |
| Query field | Top, with ✕ to clear | Shows the query | Edit and resubmit |
| Result tabs | Under the field | "Top · People · Posts · Topics" | Filter by type |
| Sort / filter | Right of the tabs | "Filters" (icon + label) | Sheet: Date, Type, Sort (Relevance, Newest, Most liked) |
| Results | List or grid | — | People → profile; Posts → detail; Topics → /topic/:slug |
| No results | Centre | "No results for 'xyz'" + "Check the spelling or try a broader term" + 3 suggested topics | — |

Use **pagination or "Show more results"** on search results (goal-directed tasks), not infinite scroll.

### 6.6 Content detail `/p/:postId`

**Goal:** go deeper, react and continue to the next item. **Primary action:** react or comment.

```
┌────────────────────────────┐
│ [←]   Post            [⋯]  │  back = previous page, scroll restored
├────────────────────────────┤
│ (Av) Name  @handle [Follow]│  Follow right-aligned (hidden if already following)
│ Full title / text          │
│ [ media, full width ]      │
│ 3h · 1,240 views · Design  │  metadata; topic → /topic/design
│ ♡ 1.2K  💬 84  ↗  🔖       │  action row
├────────────────────────────┤
│ More like this →           │  3–6 related cards (horizontal)
├────────────────────────────┤
│ Comments (84)   Top ▾      │  sort: Top / Newest
│ (Av) comment … ♡ Reply     │
│   └ (Av) reply …           │  max 1 level of visible nesting; "View 5 replies"
├────────────────────────────┤
│ (Av) [Add a comment…   ] ➤ │  sticky composer at the bottom
└────────────────────────────┘
```

| Element | Position | Label | Action |
| --- | --- | --- | --- |
| Back | Top-left | "Back" (accessible name) | Previous page, same scroll position. If opened from a share link → /home |
| Overflow ⋯ | Top-right | — | Copy link · Save · Not interested · Report. For the author: Edit · Delete |
| Follow | Author row, right | "Follow" → becomes "Following" | Toggle. Hover or long-press "Following" shows "Unfollow" |
| Topic tag | Metadata line | "#Design" | → /topic/design |
| More like this | Between the content and comments | "More like this" + "See all" | → related detail / /topic |
| Comment sort | Comments header, right | "Top ▾" | Top / Newest |
| Composer | Sticky bottom (mobile); under the comments header (desktop) | Placeholder "Add a comment…" | Send button "Post" enabled when there's text |

**Desktop:** content in the main column; the right sidebar shows the author card (bio, Follow) and "More from @handle".

**Logged-out viewers:** show the full content and the first 3 comments, then a soft prompt: "Join to see all 84 comments · **Sign up**" (no blocking modal on the first view).

### 6.7 Create `/create` (modal)

**Goal:** publish. **Primary action:** "Post".

```
┌────────────────────────────┐
│ Cancel    New post    [Post]│  Post disabled until valid
├────────────────────────────┤
│ (Av) [Everyone ▾]          │  audience selector
│                            │
│ What do you want to share? │  placeholder; autofocus
│                            │
│ [ media preview(s) ✕ ]     │
│                            │
│ # Add topics               │
├────────────────────────────┤
│ 🖼 Photo  🎥 Video  📊 Poll   │  toolbar, above the keyboard
│                  280 left  │  counter appears in the last 20%
└────────────────────────────┘
```

| Element | Position | Label | Action |
| --- | --- | --- | --- |
| Cancel | Top-left (text) | "Cancel" | If empty, close. If there is content: dialog "Save this post as a draft?" [Discard] [Save draft] |
| Title | Top centre | "New post" | — |
| Post | Top-right (primary) | "Post" (or "Publish", "Share", whichever verb fits) | Publish → toast "Posted · View" → detail page |
| Audience | Under the avatar | "Everyone ▾" | Everyone / Followers / Only me |
| Media toolbar | Above the keyboard / bottom of the dialog | Icon + label | Opens the picker |
| Topics | Under the body | "# Add topics" | Autocomplete from existing topics |

Autosave drafts every 5 s. Drafts live in Profile › Drafts. Desktop: a centred dialog 640 px wide, with the same layout.

### 6.8 Activity `/activity`

**Goal:** see and respond to interactions. **Primary action:** open the related item.

```
┌────────────────────────────┐
│ Activity   Mark all read ⚙ │  ⚙ → /settings/notifications
│  All  │  Mentions          │
├────────────────────────────┤
│ Today                      │
│ • (Av) Ana and 12 others   │  unread dot, left
│   liked your post    [img] │  thumbnail right
│ • (Av) Ben replied: "…"    │
│   2h · [Reply]             │  inline Reply for comments
│ This week                  │
│   (Av) Cleo followed you   │
│   [Follow back]            │
└────────────────────────────┘
```

| Row type | Text template | Tap goes to | Inline action |
| --- | --- | --- | --- |
| Like | "{Name} and {N} others liked your post" | Post detail | — |
| Comment | "{Name} replied: '{first 60 characters}'" | Post detail, scrolled to the comment | "Reply" |
| Mention | "{Name} mentioned you" | Post detail, scrolled to the mention | "Reply" |
| Follow | "{Name} followed you" | Their profile | "Follow back" |
| System | Plain sentence | The relevant settings or help page | — |

Group similar events ("Ana and 12 others"). Group the list by Today / This week / Earlier. Opening the page marks items as seen but keeps the dot until the row is tapped or "Mark all read" is used.

### 6.9 Messages `/messages` and thread `/messages/:id`

- **List:** search field at the top ("Search messages"); rows with avatar, name, last message (1 line, bold if unread), time and unread dot. Top-right: "New message" icon (✎) → recipient picker. Tabs if needed: "Primary · Requests".
- **Thread:** top bar `[←] (Av) Name [ⓘ]` (ⓘ → conversation details: mute, block, report). Messages bottom-aligned; your messages on the right in the accent colour, theirs on the left in surface variant. Composer sticky at the bottom: `[+] [Message…] [Send]`. "Seen" receipt under the last message (users can turn it off in Privacy).
- **Empty list:** "No messages yet" + "Start a conversation" (primary) → recipient picker.

### 6.10 Profile `/:username`

**Goal:** identity and social proof (own); follow or message (others). **Primary action:** "Follow" (others) / "Edit profile" (own).

```
┌────────────────────────────┐
│ @handle               [⚙]  │  ⚙ own profile only; ⋯ on others
│ (  Avatar 88  )            │
│ Display Name ✓             │
│ Bio, max 160 characters    │
│ 🔗 website.com · 📍 City    │
│ 120 Posts  4.3K Followers  │  each count is tappable
│ 310 Following              │
│ [  Follow  ] [ Message ]   │  others
│ [Edit profile][Share profile]│ own
├────────────────────────────┤
│  Posts │ Likes │ Saved*    │  *own only
│ ▦ ▦ ▦                      │  grid (media) or list (text)
└────────────────────────────┘
```

| Element | Own profile | Someone else's profile |
| --- | --- | --- |
| Top-right | ⚙ Settings → /settings | ⋯ menu: Share profile · Copy link · Mute · Block · Report |
| Primary button | "Edit profile" (secondary style) → /settings/profile | "Follow" (primary) → "Following" (secondary) |
| Second button | "Share profile" → share sheet | "Message" (secondary) → /messages/:id |
| Followers / Following | → lists | → lists |
| Tabs | Posts · Likes · Saved · Drafts | Posts · Likes (if public) |
| Empty Posts tab | "Share your first post" + "Create" button | "@handle hasn't posted yet" |

Show a **profile completeness** nudge on your own profile only while it is under 100%: "Add a photo so people recognize you".

### 6.11 Settings `/settings`

**Layout:** a grouped list (mobile); a two-pane layout on desktop (240 px category list left, form right). Each row: label left; current value + chevron right.

| Group | Rows | Notes |
| --- | --- | --- |
| Account | Name, Username, Email, Password, Passkeys, Connected accounts, **Delete account** (last, red, behind confirmation) | Changes save on "Save"; show a toast "Saved" |
| Privacy and safety | Private account, Who can message you, Blocked accounts, Muted words, Read receipts, Download your data | Toggles save instantly |
| Notifications | Push: Likes, Comments, Mentions, Follows, Messages, Recommendations, Product news · Email: same + weekly digest · Quiet hours | Each a toggle; a "Pause all" switch at the top |
| Display | Theme (Light / Dark / System), Text size, Autoplay videos (On / Wi-Fi only / Off) | — |
| Accessibility | Reduce motion, Captions always on, High contrast | — |
| Billing | Plan, Payment method, Invoices, **Cancel subscription** (as easy to find as Upgrade) | — |
| Help and support | Help centre, Contact us, Report a problem, Community guidelines | — |
| About | Terms, Privacy Policy, Licences, Version | — |
| *(bottom)* | **Log out** | Text button, centred |

The settings search field sits at the top ("Search settings").

### 6.12 Topic page `/topic/:slug`

Header: topic name (H1), follower count, "Follow topic" (primary) / "Following" (secondary), 1-line description. Tabs: "Top · Latest · People". Content cards below. Related topics as chips at the bottom.

### 6.13 Pricing `/pricing` (if paid)

- 2–3 plans side by side (stacked on mobile). Mark the recommended plan "Most popular" with the accent border. A Monthly / Yearly toggle above the plans, defaulting to Yearly, showing the saving ("Save 20%").
- Each plan: name, price, 1-line who it's for, CTA ("Start free trial" / "Get Pro"), then 5–7 feature ticks.
- Below: a full comparison table, FAQ, "Cancel anytime" stated plainly.

### 6.14 System states

| State | Layout | Copy | Buttons |
| --- | --- | --- | --- |
| 404 | Centred illustration + text | H1 "We can't find that page" · "It may have been moved or deleted." | "Go to Home" (primary) + search field |
| Error (500 / failed load) | Inline where the content failed, not a full page | "Something went wrong loading this." | "Try again" |
| Offline | Banner under the top bar | "You're offline. Showing saved content." | — (disappears on reconnect) |
| Empty list | Centred in the list area: icon, 1 heading, 1 sentence, 1 button | e.g. "No saved posts yet" · "Tap 🔖 on any post to save it here." | "Explore posts" → /discover |
| Loading | Skeletons in the final layout shape | — | — |
| Permission denied | Centred | "This account is private" · "Follow to see their posts." | "Follow" |

---

## 7. Master link map: every button and where it goes

| Where | Button / link (label) | Type | Goes to | Notes |
| --- | --- | --- | --- | --- |
| Everywhere | Logo | Link | /home (logged in) or / (logged out) | Scroll to top if already there |
| Tab bar / rail / sidebar | Home | Tab | /home | Re-tap = scroll to top, then refresh |
| Tab bar / rail / sidebar | Discover | Tab | /discover | Re-tap = focus search |
| Tab bar / header | Create | Tab / primary | Create modal | Bottom sheet if multiple types |
| Tab bar / header | Activity | Tab / icon | /activity (mobile), dropdown (desktop) | — |
| Tab bar | Profile | Tab | /:username (own) | — |
| Header | Messages | Icon | /messages | Badge count |
| Header | Search field | Input | Suggestions → /search?q= | `/` shortcut on desktop |
| Avatar menu | View profile · Saved · Settings · Help · Log out | Menu items | /:username · /saved · /settings · /help · / | Log out last |
| Landing | Sign up / Get started — it's free | Primary | /signup | Repeated in hero, header, final band, sticky mobile bar |
| Landing | Log in | Text | /login | — |
| Landing | See how it works | Secondary | Anchor or video modal | — |
| Landing | Explore more | Secondary | /explore | Public, no login |
| Sign up | Continue with Google / Apple | Secondary (full width) | OAuth → /welcome/interests | — |
| Sign up | Continue | Primary | Password or magic-link step → /welcome/interests | — |
| Sign up | Log in | Text | /login | — |
| Log in | Forgot password? | Text | /reset | — |
| Log in | Log in | Primary | Previous page, or /home | — |
| Onboarding | Continue | Primary | Next step; the last step → /home | Disabled until valid |
| Onboarding | Skip / Not now | Text | Next step / /home | Not on step 1 |
| Feed card | Avatar / name | Link | /:username | — |
| Feed card | Card body / media | Link | /p/:id | — |
| Feed card | Like | Toggle | In place | Optimistic |
| Feed card | Comment | Icon | /p/:id#comments | Composer focused |
| Feed card | Share | Icon | Share sheet | — |
| Feed card | Save | Toggle | In place + toast "Saved · View" | View → /saved |
| Feed card | ⋯ | Menu | Not interested · Unfollow · Copy link · Report | — |
| Home | For you / Following | Tabs | Same page, different feed | — |
| Home | ↑ New posts | Pill | Scroll top + load | — |
| Home | See older posts | Text | Older items in Following | After "caught up" |
| Home (right column) | Show more (Who to follow) | Text | /discover?tab=people | — |
| Discover | Category chip | Chip | Filters the Discover page | — |
| Discover | See all (row) | Text | /topic/:slug or /discover/:row | — |
| Search | Top / People / Posts / Topics | Tabs | Same page, filtered | — |
| Search | Filters | Secondary | Filter sheet | — |
| Detail | ← Back | Icon | Previous page, scroll restored | /home if there's no history |
| Detail | Follow | Primary (small) | In place → "Following" | — |
| Detail | #Topic | Link | /topic/:slug | — |
| Detail | Post (comment) | Primary (small) | In place; comment appears instantly | — |
| Create | Cancel | Text | Closes; draft dialog if there is content | — |
| Create | Post | Primary | Publishes → /p/:id | Disabled until valid |
| Activity | Mark all read | Text | In place | — |
| Activity | ⚙ | Icon | /settings/notifications | — |
| Activity | Row | Link | Related post / profile | — |
| Activity | Reply / Follow back | Secondary (small) | In place | — |
| Profile (own) | Edit profile | Secondary | /settings/profile | — |
| Profile (own) | Share profile | Secondary | Share sheet | — |
| Profile (other) | Follow / Message | Primary / secondary | In place / /messages/:id | — |
| Profile | Followers / Following count | Link | /:username/followers · /following | — |
| Settings | Each row | Row | Sub-page | — |
| Settings | Delete account | Destructive text | Confirmation flow (re-enter password, 30-day grace) | — |
| Settings | Log out | Text | / | — |
| 404 | Go to Home | Primary | /home | — |
| Empty states | Contextual CTA | Primary | The action that fills the list | One per empty state |

---

## 8. Labelling and microcopy

### 8.1 Rules

1. **Navigation uses nouns; buttons use verbs.** Tabs: "Home", "Discover", "Activity". Buttons: "Follow", "Save", "Post".
2. **Use sentence case everywhere.** "Edit profile", not "Edit Profile" or "EDIT PROFILE".
3. **Length limits:** tabs 1 word (2 at most); buttons 1–4 words; headings ≤ 8 words; helper text ≤ 1 sentence.
4. **One word per concept, everywhere.** If it's "Post", it is never also "Publish", "Share" or "Submit" elsewhere. Keep a glossary (8.2) and enforce it in reviews.
5. **Label the outcome, not the mechanism.** "Save changes", not "Submit". "Send message", not "OK".
6. **Write in the user's words.** Validate tab and category names with card sorting. Avoid internal jargon ("Hub", "Stream", "Engagements").
7. **Address the user as "you"**, and the product as "we" in system messages. Use the first person ("my") only where the user is choosing for themselves, and only if a test shows it helps.
8. **No icon without a label** in navigation. Icon-only buttons inside content (♡, 🔖, ⋯) need an accessible name and a desktop tooltip.
9. **Buttons must say what will happen.** In dialogs, never "Yes / No" or "OK / Cancel". Use the verb: "Delete post" / "Cancel".
10. **State-changing buttons show the new state.** "Follow" → "Following" (hover: "Unfollow"). "Save" → "Saved".

### 8.2 Standard labels (glossary)

| Use this | Not this | Where |
| --- | --- | --- |
| Sign up | Register, Join now, Create account (as a button) | Logged-out header and CTAs |
| Log in / Log out | Sign in / Sign out (pick one pair, never mix) | Auth |
| Get started — it's free | Submit, Learn more, Click here | Landing primary CTA |
| Continue | Next (in sign-up and onboarding), Proceed | Multi-step flows |
| Back | Previous, Return | Step flows (as a text button) |
| Skip / Not now | No thanks, Maybe later (with guilt copy) | Optional steps |
| Post | Publish, Submit, Share (for creating) | Create flow |
| Share | Send, Forward | Distributing existing content |
| Save / Saved | Bookmark, Favourite, Collect | Saving content |
| Like | Love, Heart, Upvote (pick one) | Reactions |
| Follow / Following | Subscribe, Add, Connect (unless that's your model) | People and topics |
| Message | DM, Chat, PM | Profile button, nav |
| Edit profile | Profile settings, Update info | Own profile |
| Settings | Preferences, Options, Config | Account area |
| Delete | Remove, Destroy, Erase | Permanent removal of your own content |
| Remove | Delete | Taking something out of a list without destroying it (e.g. remove from Saved) |
| Report | Flag, Complain | Safety |
| Cancel | Close, Abort, Never mind | Abandoning a flow or dialog |
| Done | Finish, Complete, OK | Finishing an edit with no "save" semantics |
| Try again | Retry, Reload | Errors |

### 8.3 Headings and page titles

- The page title matches the link that opened it ("Saved" opens a page titled "Saved").
- The browser `<title>` format is `Page – Product name` (e.g. "Activity – YourApp"). Content pages use `Post title by Name – Product name`.
- Section headings say what is in the section: "People you might like", not "Recommendations".

### 8.4 Form labels and helper text

- Labels always sit **above** the field and stay visible. Placeholders are examples ("e.g. alex.kim"), never the label.
- Mark **optional** fields "(optional)" instead of starring required ones, since most fields should be required.
- Helper text sits under the field in caption size: "This is what people will see on your profile."
- Validate on blur, not on every keystroke. Show success ticks only for things that are hard to get right (username available, password strength).

### 8.5 Error messages

**Formula:** what happened + why (if useful) + how to fix it. Plain language, no blame, no codes up front.

| Situation | Write | Don't write |
| --- | --- | --- |
| Invalid email | "Enter an email address like name@example.com" | "Invalid input" |
| Username taken | "@alex is taken. Try @alex.kim or @alexk" | "Error 409: conflict" |
| Wrong password | "That password doesn't match. Try again or reset your password." | "Authentication failed" |
| Upload too large | "This video is over 500 MB. Trim it or choose a smaller file." | "Upload error" |
| Network failure | "We couldn't load this. Check your connection and try again." | "Something broke :(" |

### 8.6 Empty states

**Formula:** heading (what goes here) + one sentence (how it fills) + one button (the action).

| Page | Heading | Sentence | Button |
| --- | --- | --- | --- |
| Following feed (no follows) | "Follow people to fill this feed" | "Their posts will show up here." | "Find people" → /discover?tab=people |
| Saved | "No saved posts yet" | "Tap 🔖 on any post to save it for later." | "Explore posts" |
| Activity | "No activity yet" | "When people like or reply to your posts, you'll see it here." | "Make your first post" |
| Messages | "No messages yet" | "Start a conversation with someone you follow." | "New message" |
| Own Posts tab | "Share your first post" | "It only takes a minute." | "Create" |

### 8.7 Confirmation dialogs

Use only for destructive or irreversible actions. Prefer **Undo** in a toast for everything else.

```
┌──────────────────────────────────┐
│ Delete this post?                │  title = question naming the object
│ This can't be undone. Comments   │  consequence in 1–2 sentences
│ and likes will be removed too.   │
│                                  │
│            [Cancel] [Delete post]│  destructive = red, verb + object, right
└──────────────────────────────────┘
```

### 8.8 Notification copy

- **Format:** who + what + context. "Ana replied to your post: 'Love this palette!'"
- **Lead with the person or the content**, never the product name ("YourApp: You have a new notification" is useless).
- **Max 60 characters** for the title, 120 for the body. Deep-link to the exact item.
- **No fake urgency** ("Don't miss out!!!") and no guilt ("We miss you 😢").

### 8.9 Numbers, dates and tone

- Counts: 999 · 1.2K · 34K · 1.2M. Show exact numbers on hover or in detail views.
- Times: "now", "5m", "3h", "2d" for under 7 days; then "Mar 4"; add the year if it's not the current year.
- **Tone:** friendly, direct, calm. Use humour only in low-stakes moments (empty states, success), never in errors, billing or safety.

---

## 9. Click-through rate: CTAs, copy and layout

Clicks follow visibility, clarity and relevance; no button colour is magic. NN/g eyetracking found that people spend about 57% of their page-viewing time above the fold and about 74% in the first two screenfuls ([NN/g, scrolling and attention](https://www.nngroup.com/articles/scrolling-and-attention/)), so the primary action belongs there.

| Element | Spec | Why |
| --- | --- | --- |
| Primary CTA | One per screen; a filled button in the single accent colour that no other element uses | Isolation (von Restorff) effect: the one distinct item is noticed and remembered |
| Secondary CTA | Outline or text button; never the same weight as the primary | Equal, competing buttons raise decision time (Hick's law) |
| Size | 44–56 px tall; full width on mobile forms; label 16–18 px semibold | Fitts's law; legibility |
| Placement | Above the fold and repeated after long content; within thumb reach on mobile | Viewing time concentrates at the top; thumbs reach the lower screen easily |
| Copy | Verb + specific outcome, 2–5 words: "Start my free trial", "See my matches" | Specific, benefit-led labels set clear expectations; avoid "Submit" and "Click here" |
| Risk reducers | Microcopy under the CTA: "No card needed", "Cancel anytime" | Removes the main hesitation at the moment of decision |
| Social proof | Counts, ratings or named testimonials near the CTA | Cialdini's social-proof principle; must be real |
| Cards and thumbnails | Large image, 1–2 line title, one metadata line; the whole card is clickable | A whole-card target is bigger and faster to hit (Fitts's law) |
| Link style | Links look like links: colour + underline in body text | WCAG 1.4.1: colour must not be the only cue |
| Feedback | The button shows a pressed state within 100 ms, and a spinner if the action takes over 1 s | Nielsen's response-time limits: 0.1 s feels instant, 1 s keeps flow, 10 s loses attention |

**Forms.** Every extra field costs completions. Ask only what you need now. Use a single column, labels above fields, inline validation on blur, and social or passkey sign-in.

**A caution on "best practices".** Famous CTR lifts (red vs green buttons, "my" vs "your") come from single-site tests and often fail to replicate. Treat them as hypotheses to A/B test on your platform (Section 14).

---

## 10. Onboarding and activation

The first session decides retention. [Lenny's Newsletter](https://www.lennysnewsletter.com/i/77646597/what-is-activation-rate) defines the activation ("aha") milestone as the earliest point that shows the product's value and predicts long-term retention. Its October 2022 survey of 500+ products, run with Yuriy Timen, found an average activation rate of 34% (median 25%). For SaaS products alone, the average was 36% (median 30%). The rates are self-reported, and each team defines "activated" differently.

**Step 1: Define your aha moment from data.** Compare retained and churned users and find the early action that best separates them (for example, "followed 5 creators on day 1" or "sent a first message"). Avoid trivial actions like "completed profile", which inflate activation without predicting retention.

**Step 2: Design the shortest path to it** (implemented in 6.1–6.3).

- Let people see value before signing up where possible (browse, preview, demo content).
- Make sign-up a single screen: email or passkey/social, no more than 3 fields.
- Ask 1–3 preference questions that visibly shape the first feed ("Pick 3 topics"). This personalizes the feed and creates commitment.
- Skip product tours of 5+ tooltips. Use contextual hints shown at the moment a feature is needed.
- Pre-fill fields and use templates or sample content so no screen starts empty.

**Step 3: Show progress.** A checklist of 3–5 setup steps with one already ticked uses the endowed-progress effect. In [Nunes & Drèze (2006)](https://knowledge.wharton.upenn.edu/podcast/knowledge-at-wharton-podcast/the-lowdown-on-customer-loyalty-programs-which-are-the-most-effective-and-why/), 34% of customers completed a 10-stamp car-wash card with 2 stamps pre-filled, against 19% for a blank 8-stamp card, even though both needed 8 purchases. The goal-gradient effect (Kivetz et al., 2006) means effort rises as people near completion, so show a progress bar.

**Step 4: Progressive disclosure.** Show the core features first and reveal advanced options after users succeed with the basics (NN/g). Suggested internal target (not a research benchmark): a new user completes the aha action in the first session, in under 3 minutes.

**Metrics:** activation rate (aha action within 7 days of sign-up), time-to-value, drop-off at each onboarding step, and day-1/7/30 retention split by activation status.

---

## 11. Engagement and time on platform

Personalized discovery is the biggest lever. Netflix reports that its recommender influences about 80% of hours streamed, and that about 2 of every 3 hours are discovered on the personalized homepage. Netflix estimates that personalization and recommendations save it more than $1B a year by reducing churn ([Gomez-Uribe & Hunt, 2015](https://gwern.net/doc/reinforcement-learning/exploration/2015-gomezuribe.pdf)).

### 11.1 Feed and discovery

- The home screen is a personalized feed or set of rows ("Because you liked X", "Trending", "Continue where you left off"). Explain *why* each item is shown.
- Mix known interests with some exploration so the feed does not go stale. Start at about 10–20% and tune it by testing; this is a starting point, not a research figure.
- Put the "Continue" row first for returning users: unfinished items pull people back (Zeigarnik effect).
- Use infinite scroll for browse-and-snack feeds, and pagination or "Load more" for goal-directed search results and anything with a footer. Add natural stopping points ("You're all caught up"). In a 30-person [design-friction study](https://arxiv.org/html/2407.18803v3) (Ruiz, Molina León & Heuer, Mensch und Computer 2024), an interface that added breaks improved recall of the content people had seen.
- Show skeleton screens, not spinners, while the feed loads, and prefetch the next page.

### 11.2 Habit loop (Fogg Behavior Model; Eyal's Hook model)

A behaviour happens when motivation, ability and a prompt come together (Fogg). Design each loop as trigger → easy action → variable reward → user investment.

| Mechanic | Spec | Evidence |
| --- | --- | --- |
| Streaks | Count consecutive active days; offer a "streak freeze"; celebrate milestones (7, 30, 100, 365) | Sensor Tower data links Duolingo's record 17M daily users to streaks, and shows Busuu's total sessions rose 15% in the month after it added one ([Business of Apps](https://www.businessofapps.com/news/duolingos-streak-feature-drives-record-17-million-daus)). This is correlational, not a controlled test |
| Progress and levels | A visible progress bar to the next level; goals set by the user | Goal-gradient effect |
| Variable rewards | New content, replies and recommendations that differ on each visit | Skinner-style variable schedules sustain behaviour; the reward must be genuinely useful |
| Social | Follows, replies, reactions, collaborative spaces; notify on direct interaction | Practitioner consensus, not a single study; check it in your own retention data |
| Investment | Saved items, playlists, profiles, created content | Stored value raises switching costs and improves personalization |

### 11.3 Notifications

Volume drives opt-outs. In a 2017 Localytics survey of 1,000 US smartphone users, 10% said they would turn off an app's notifications at 1 per week, and 37% at 2–5 per week ([MarketingProfs](https://www.marketingprofs.com/charts/2018/33486/how-many-mobile-push-notifications-are-too-many)). An older (2016) Braze post also names irrelevant messages as the top reason people opt out, though it gives no survey method ([Braze](https://www.braze.com/blog/opt-out-of-push-notifications-why-users-do-it/)).

- Ask for push permission only after the user has seen value, with a pre-prompt explaining what they will get (onboarding step 3).
- Default to triggered, personal notifications (a reply, a match, a saved item on sale). Start marketing pushes at 1 per week at most, and raise the cap only if opt-outs stay flat in testing.
- Offer per-category settings, quiet hours and a weekly digest option.
- Deep-link every notification to the exact content, never to the home screen.

---

## 12. Performance, accessibility and mobile

Speed is a feature: Google/SOASTA mobile data from 2017 found that the chance of a bounce rises 32% as page load time goes from 1 s to 3 s ([Think with Google](https://thinkwithgoogle.com/data/page-load-time-statistics)). Accessibility widens your audience and improves usability for everyone.

| Area | Spec | Source |
| --- | --- | --- |
| Largest Contentful Paint | ≤ 2.5 s at the 75th percentile | Google Core Web Vitals |
| Interaction to Next Paint | ≤ 200 ms | Google Core Web Vitals |
| Cumulative Layout Shift | ≤ 0.1; reserve space for images and ads | Google Core Web Vitals |
| Perceived speed | Optimistic UI (show the like instantly), skeleton screens, prefetch the next screen | Nielsen response-time limits |
| Touch targets | ≥ 44×44 pt (iOS), ≥ 48×48 dp (Android), ≥ 8 dp spacing; WCAG 2.2 AA minimum 24×24 CSS px | Apple HIG, Material Design, WCAG 2.2 |
| Text contrast | ≥ 4.5:1 for body text, ≥ 3:1 for large text and UI components | WCAG 2.2 AA |
| Type | Body ≥ 16 px; line length 50–75 characters; line height 1.4–1.6 | Readability research |
| Thumb reach | Primary actions and tabs within easy thumb reach; give targets near screen edges extra size and padding | [Hoober (2013)](https://www.uxmatters.com/mt/archives/2013/02/how-do-users-really-hold-mobile-devices.php): 49% of touching users in 1,333 observations held the phone one-handed. Hoober has reportedly since called the widely shared "thumb zone" chart wrong, so don't treat the lower third as a rule |
| Motion | Animations of 150–300 ms; respect "reduce motion" | Material motion guidelines |
| Dark mode | Follow the system light/dark setting | Platform conventions |
| Keyboard and screen readers | Visible focus, logical tab order, labels on all controls and icons; skip-to-content link | WCAG 2.2 |

**Mobile first.** Design the phone layout first, then expand it. Use native gestures (swipe back, pull to refresh) and never hijack scrolling.

---

## 13. Ethical guardrails

Maximize time *well spent*, not time captured. Dark patterns are widespread: [Mathur et al. (2019)](https://arxiv.org/abs/1907.07032v2) found 1,818 instances across about 11K shopping sites, more often on popular ones. They raise short-term clicks at the cost of trust, and regulators now act on them:

- **EU:** Article 25 of the Digital Services Act, which has applied since 17 February 2024, bars online platforms from interface designs that deceive, manipulate or distort users' choices.
- **US:** In September 2025, Amazon agreed to pay $2.5 billion to settle FTC charges that it used dark patterns to enrol people in Prime and to make cancelling hard. It must now make cancelling as easy as signing up ([MediaPost](https://www.mediapost.com/publications/article/409399/amazon-settles-dark-patterns-charges-for-25-bi.html)).
- **Fake urgency:** The FTC's 2022 staff report "Bringing Dark Patterns to Light" names countdown timers that reset as deceptive. New York's attorney general reached a $2.6 million settlement with Fareportal over this tactic.

**Do not ship:**

- Confirmshaming ("No thanks, I don't like saving money").
- Fake urgency or scarcity (countdowns that reset, an invented "3 people viewing").
- A roach motel: easy to join, hard to cancel. Cancelling must take no more steps than signing up.
- Hidden costs revealed at the last step, or pre-ticked consent or add-on boxes.
- Disguised ads, or notifications that look like personal messages.
- Autoplay and streak pressure aimed at minors, or nagging that punishes users for leaving.

**Do ship:**

- Natural stopping points and "You're all caught up" messages.
- Time and notification settings the user controls.
- Honest social proof and clear pricing.
- Health metrics alongside engagement: satisfaction ("Was this worth your time?"), regret and unsubscribe rates.

The 30-person [design-friction study](https://arxiv.org/html/2407.18803v3) shows the trade-off: the breaks improved recall, but most participants found them frustrating. Test gentle versions and watch long-run retention, not session length alone.

---

## 14. Metrics, event tracking and experimentation

Pick one north-star metric that reflects the value users get (for example, weekly users who complete a core action). Then protect it with health metrics so CTR wins don't hide churn.

| Layer | Metrics |
| --- | --- |
| North star | Weekly active users completing the core action |
| Acquisition and CTR | Click-through rate per surface, sign-up conversion, CTA click rate |
| Activation | % reaching aha within 7 days, time-to-value, drop-off at each onboarding step |
| Engagement | DAU/MAU (stickiness), sessions per user per week, time spent, items consumed per session |
| Retention | Day-1, 7 and 30 cohort retention; resurrection rate |
| Health guardrails | Satisfaction survey score, notification opt-out rate, unsubscribes, complaints, page speed |

### 14.1 Events to track per page

Name events as `object_action` in snake_case, and attach `surface` (the page) and `position` (index in the list) to every click event, so you can compute CTR per slot.

| Page | Events |
| --- | --- |
| Landing | `landing_viewed`, `cta_clicked {location: hero/header/sticky/footer}`, `preview_card_clicked` |
| Sign up / Log in | `signup_started {method}`, `signup_completed`, `login_completed`, `auth_error {type}` |
| Onboarding | `onboarding_step_viewed {step}`, `topic_selected`, `onboarding_skipped {step}`, `push_permission {granted}` |
| Home | `feed_viewed {tab}`, `card_impression {post_id, position}`, `card_clicked`, `post_liked`, `post_saved`, `post_shared`, `caught_up_reached` |
| Discover / Search | `search_submitted {query_length}`, `suggestion_clicked {type}`, `search_result_clicked {position}`, `zero_results` |
| Detail | `post_viewed {dwell_ms}`, `comment_posted`, `related_clicked`, `follow_clicked {surface}` |
| Create | `create_opened {entry}`, `post_published {type}`, `draft_discarded` |
| Activity | `notification_opened {type}`, `inline_reply_sent` |
| Settings | `notification_setting_changed {category, value}`, `subscription_cancelled` |

**CTR** = `card_clicked / card_impression` (count an impression only when ≥ 50% of the card is visible for ≥ 1 s).

### 14.2 Experimentation rules

From [Kohavi, Tang & Xu, *Trustworthy Online Controlled Experiments*](https://www.kameleoon.com/enronny-kohavi-getting-results-you-trust):

1. Write down the hypothesis, primary metric and guardrails before launch.
2. Calculate the sample size up front. Run for whole weeks (at least 1–2) to cover weekday effects, and don't stop early because results look good.
3. Check every test for sample ratio mismatch. A mismatch means the result can't be trusted.
4. Apply Twyman's law: a surprisingly large win is more likely a bug than a breakthrough.
5. Expect most ideas to be flat or negative. At Microsoft, only about a third of tested ideas improved the metric they targeted; a third were flat and a third were negative ([Kohavi et al., 2012](https://ai.stanford.edu/~ronnyk/2012-09ACMRecSysNR.pdf)).
6. Watch for novelty effects, and re-check engagement features against long-term holdout groups.

**First tests to run** (highest expected impact for a new platform):

| # | Test | Primary metric | Guardrail |
| --- | --- | --- | --- |
| 1 | Topic picker in onboarding vs none | Day-7 retention | Onboarding completion |
| 2 | Public preview on the landing page vs a hero image only | Sign-up conversion | Bounce rate |
| 3 | "Continue" row first vs feed first for returning users | Sessions per week | Satisfaction score |
| 4 | Notification pre-prompt vs an immediate OS prompt | Push opt-in rate | Day-30 opt-out rate |
| 5 | "Caught up" marker vs endless feed | Day-30 retention | Time spent |

**Qualitative loop.** Pair A/B tests with 5-user usability tests every sprint. NN/g's model says 5 comparable users find about 85% of problems, so it recommends several small rounds over one large one ([NN/g](https://nngroup.com/articles/why-you-only-need-to-test-with-5-users/)). Add session recordings and heatmaps to explain *why* a metric moved.

---

## 15. Sources

Some figures come from secondary summaries of the original work. Check them against the primary paper before quoting them publicly.

**Academic research**

- Gomez-Uribe & Hunt (2015), [The Netflix Recommender System](https://gwern.net/doc/reinforcement-learning/exploration/2015-gomezuribe.pdf), ACM TMIS
- Mathur et al. (2019), [Dark Patterns at Scale](https://arxiv.org/abs/1907.07032v2), CSCW
- Lindgaard, Fernandes, Dudek & Brown (2006), "Attention web designers: You have 50 milliseconds to make a good first impression!", *Behaviour & Information Technology* 25(2), 115–126 ([summary](https://www.websiteoptimization.com/speed/tweak/blink/))
- Nunes & Drèze (2006), endowed progress effect, *Journal of Consumer Research* ([Wharton](https://knowledge.wharton.upenn.edu/podcast/knowledge-at-wharton-podcast/the-lowdown-on-customer-loyalty-programs-which-are-the-most-effective-and-why/))
- Rixen et al. (2023), [The Loop and Reasons to Break It](https://www.uni-ulm.de/fileadmin/website_uni_ulm/iui.inst.100/1-hci/hci-paper/2023/4-TheLoopAndHowToBreakIT.pdf), Proc. ACM HCI 7 (MobileHCI), further reading on why people stop scrolling
- Ruiz, Molina León & Heuer (2024), [Design Frictions on Social Media](https://arxiv.org/html/2407.18803v3), Mensch und Computer 2024
- Kohavi, Tang & Xu (2020), *Trustworthy Online Controlled Experiments*, Cambridge University Press
- Kohavi et al. (2012), [Online controlled experiments: introduction, learnings and humbling statistics](https://ai.stanford.edu/~ronnyk/2012-09ACMRecSysNR.pdf), ACM RecSys
- Hoober (2013), [How do users really hold mobile devices?](https://www.uxmatters.com/mt/archives/2013/02/how-do-users-really-hold-mobile-devices.php), UXmatters
- Classics: Hick (1952), Fitts (1954), Sweller (1988), Kurosu & Kashimura (1995), Kivetz et al. (2006), Fogg (2009)

**Industry research, design systems and newsletters**

- Nielsen Norman Group: [F-shaped reading pattern](https://nngroup.com/articles/f-shaped-pattern-reading-web-content/), [hamburger menus and hidden navigation](https://www.nngroup.com/articles/hamburger-menus/) and its [methodology](https://www.nngroup.com/articles/hidden-navigation-methodology/), [centered logos](https://nngroup.com/articles/centered-logos/), [scrolling and attention](https://www.nngroup.com/articles/scrolling-and-attention/), [Jakob's law](https://www.nngroup.com/articles/end-of-web-design/), [testing with 5 users](https://nngroup.com/articles/why-you-only-need-to-test-with-5-users/)
- MediaPost: [Amazon settles "dark patterns" charges for $2.5 billion](https://www.mediapost.com/publications/article/409399/amazon-settles-dark-patterns-charges-for-25-bi.html)
- web.dev: [How the Core Web Vitals thresholds were defined](https://web.dev/articles/defining-core-web-vitals-thresholds)
- Android Developers: [Layouts and navigation patterns](https://developer.android.com/design/ui/mobile/guides/layout-and-content/layout-and-nav-patterns)
- U.S. Web Design System: [Search component](https://designsystem.digital.gov/components/search/)
- Lenny's Newsletter: [What is a good activation rate](https://www.lennysnewsletter.com/i/77646597/what-is-activation-rate)
- Think with Google: [page load time statistics](https://thinkwithgoogle.com/data/page-load-time-statistics)
- Braze: [why users opt out of push](https://www.braze.com/blog/opt-out-of-push-notifications-why-users-do-it/); MarketingProfs/Localytics: [how many pushes are too many](https://www.marketingprofs.com/charts/2018/33486/how-many-mobile-push-notifications-are-too-many)
- Business of Apps: [Duolingo streaks](https://www.businessofapps.com/news/duolingos-streak-feature-drives-record-17-million-daus)
- Smart Insights: [hidden navigation study summary](https://www.smartinsights.com/digital-marketing-strategy/are-hamburger-menus-hidden-navigation-good-for-ux/)
- WPMU DEV: [logo placement research summary](https://wpmudev.com/blog/logo-placement/)
- Standards: Google Core Web Vitals, WCAG 2.2, Apple Human Interface Guidelines, Material Design 3

---

## 16. Fact-check log

Checked on 2026-11-04. Of the 25 sourced claims checked, 12 held up as written. Another 7 were right but needed more precise wording or a caveat, and 6 were wrong, overstated or wrongly attributed. Five more statements had no real source and were relabelled or replaced. Everything has been fixed in the text above.

**How this was checked.** This session's network policy blocked direct page access to nngroup.com, thinkwithgoogle.com and gwern.net. Those claims were checked against search-indexed excerpts of the original pages and against independent secondary reports. Where only secondary sources were available, the verdict says so.

### Errors corrected

| Claim (before) | Verdict | Corrected to |
| --- | --- | --- |
| Hidden navigation cut discoverability ~20% and made desktop tasks ~39% slower (NN/g) | **Wrong** | NN/g says discoverability was cut **almost in half** on desktop (hidden menus used in 27% of cases vs 48–50% for visible or combo navigation), and using hidden navigation took 5–7 s longer on desktop. The 39%/15% figures come from a secondary summary and could not be matched to NN/g. |
| Lenny's survey puts typical activation at 30–40% | **Imprecise** | Average 34%, median 25% (SaaS: 36% average, 30% median). Oct 2022, 500+ products, self-reported. |
| "Duolingo credits streaks with major DAU growth" | **Misattributed** | The link between streaks and Duolingo's 17M daily users is Sensor Tower's analysis, not a Duolingo statement. The Busuu +15% sessions figure is also Sensor Tower's, and it is correlational. |
| "The US FTC has brought cases over … fake urgency" | **No case found** | No FTC fake-countdown case was found. Replaced with the FTC's 2022 staff report, which names resetting timers as deceptive, and New York's $2.6M Fareportal settlement. The subscription-trap example is confirmed: Amazon's $2.5B FTC settlement over Prime (Sept 2025). |
| Thumb zone = bottom third of the screen (Hoober) | **Overstated** | Hoober's 2013 data supports only "49% of touching users held the phone one-handed". A secondary source reports that he has since called the popular thumb-zone heat-map wrong. The guidance now says "within easy thumb reach", with bigger targets near the edges. |
| Design-friction study: breaks "frustrated some users" | **Understated** | **Most** of the 30 participants found the friction interface frustrating. The citation was corrected to Ruiz, Molina León & Heuer, Mensch und Computer 2024. |

### Confirmed, with wording made more precise

| Claim | Verdict | Note |
| --- | --- | --- |
| Bounce probability +32% from 1 s to 3 s | Confirmed (secondary sources) | Google/SOASTA, 2017, **mobile** pages. The primary page was blocked, but the figure is consistent across sources. |
| Localytics: ~10% disable notifications at 1 per week | Confirmed | 10% at 1 per week, **37% at 2–5 per week** (2017 survey, 1,000 US users). The suggested push cap was lowered from 1–3 per week to 1 per week as a result. |
| Irrelevance is the top opt-out reason (Braze) | Weak source | A 2016 Appboy/Braze blog post with no published method. Kept, with that caveat stated. |
| Kohavi: only a minority of experiments win | Confirmed | At Microsoft, about ⅓ positive, ⅓ flat, ⅓ negative. |
| EU DSA bans deceptive design | Confirmed | Article 25 covers online platforms and has applied since 17 Feb 2024. Practices already covered by consumer law or the GDPR are carved out. |
| Netflix: 80% of hours streamed; 2 of 3 hours found on the homepage; $1B a year | Mostly confirmed | 80% and $1B are consistent across sources; the paper hedges the $1B with "We think". One source attributes "2 of 3 hours" to a New America report rather than the paper, and the paper itself couldn't be opened to settle this. |
| Search box ≥ 27 characters fits ~90% of queries | Partly confirmed | The 27-character minimum is in the U.S. Web Design System, attributed to NN/g. The 90% figure appears only in secondary sources. |

### Confirmed as written

| Claim | Source checked |
| --- | --- |
| Core Web Vitals thresholds: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1, at the 75th percentile | web.dev and consistent third-party documentation |
| Visual appeal judged in 50 ms (Lindgaard et al., 2006) | Paper citation and abstract. Caveat: it measures appeal ratings, not whether users leave. |
| 57% of viewing time above the fold, 74% in the first two screenfuls | NN/g 2018 eyetracking (down from 80% above the fold in 2010) |
| Centred logos: 6× as likely to fail to get home in one click (~24% vs 4%) | NN/g 2016, 14 fashion-retail sites; raw percentages via secondary reports |
| F-shaped scanning pattern | NN/g (2006; re-confirmed in later studies) |
| Jakob's law (users spend most of their time on other sites) | Nielsen, 2000 |
| Android navigation bar: 3–5 destinations, becoming a rail on large screens | Android developer guidelines |
| Endowed progress: 34% vs 19% card completion | Nunes & Drèze, *Journal of Consumer Research*, 2006 |
| Mathur et al.: 1,818 dark-pattern instances on ~11K sites; more common on popular sites | CSCW 2019 abstract |
| WCAG 2.2 SC 2.5.8: 24×24 CSS px minimum target, Level AA | W3C and accessibility references |
| 5 users find ~85% of problems | NN/g. Caveat: across groups of 5 the range was 55–100% (Faulkner, 2003). |
| Rixen et al. (2023): week-long field study, N = 46 | Proc. ACM HCI 7 (MobileHCI) |

### Unsupported claims removed or relabelled

| Claim (before) | Change |
| --- | --- |
| Sparse pages are scanned in a Z-pattern | Relabelled as a practitioner heuristic, not an eyetracking finding |
| "Social feedback is the strongest return trigger" | Relabelled as practitioner consensus to verify with your own data |
| "Images draw the first fixations" | Replaced with the Fitts's-law rationale for whole-card targets |
| "NN/g: users miss links that rely on colour alone" | Replaced with WCAG 1.4.1 (colour must not be the only cue) |
| 10–20% feed exploration; aha moment in under 3 minutes | Labelled as starting points to tune by testing, not research figures |

### Not re-checked (standard references)

Hick (1952), Fitts (1954), Sweller (1988), Kurosu & Kashimura (1995), Kivetz, Urminsky & Zheng (2006), Fogg (2009), Nielsen's 0.1 s / 1 s / 10 s response-time limits, Apple's 44 pt and Material's 48 dp touch targets, and the WCAG contrast ratios (4.5:1 and 3:1). These are long-established, widely cited references.

**Scope.** Sections 3–8 (sitemap, layouts, button positions, link map and labels) are design recommendations built on the principles above, not factual claims, except where a source is cited.
