# Buddy

**Make Friends Doing What You Love.**

Buddy matches young adults into small groups of 5 or 6 for things they already enjoy: pickup basketball, a movie, a morning walk. Our primary customer is 18 to 30, the age group hit hardest by loneliness, and every adult is welcome. Pick an event, and the matching algorithm places you with people nearby who share your interests. A popular event can have lots of people going; they're split into several groups of 5 or 6, so everyone meets a small group, not a crowd. A group chat opens so the group can make the plan. After the meetup, a 5-question check-in asks how it went.

Business 4558 · Checkpoint 2 prototype · Team: Andrew, Carina, Mert, Sheel, Pruthvish

**Live site:** https://buddy-app.prototype-bus4558.workers.dev

---

## Try it in 2 minutes

1. Open the live site and click **Try the demo**.
2. You land on **My Groups** with a board games group already made. Open it to see the **group chat**.
3. In the chat: send a message, tap **I'm going**, then try **People** and **Report**.
4. Click **Rate this meetup** to see the **5-question survey**.
5. Go to **Events**: search, filter by type, open an event and click **Join a Group** to watch the matching.
6. Check **Map**, **Post an event**, **Safety** and **You** (profile).

To sign up as a new person instead, click **You → Log out**, then **Join Buddy**. Sign-up asks for a profile photo, at least 3 interests, your area and your age.

> **Prototype note:** the people and events are examples. Accounts, groups and chats are saved only in your own browser, so two people can't see each other yet. Pages that need an account (groups, chat, survey, profile, post) send you to log in first. Use the demo button there.

## Pages

| Page | File | What it does |
|---|---|---|
| Home | `index.html` | Mission, how it works, Join Buddy, Try the demo |
| Sign up | `signup.html` | 4 steps: account → photo (required, social link optional) → interests → area, age, life stage, gender (optional) |
| Log in | `login.html` | Email and password, or the demo profile |
| Events | `events.html` | Search, event types, day, distance, women-only. Sorted by best fit |
| Map | `map.html` | Same events as pins on a map |
| Event | `event.html?id=…` | Details, why it fits you, group preferences, **Join a Group** |
| Post an event | `post.html` | Anyone can post an event at a public place |
| My Groups | `groups.html` | Every group you're in |
| Group chat | `chat.html?g=…` | The plan, people, messages, Report and Block |
| Survey | `survey.html?g=…` | Rating, meet again, group fit, felt safe, comments |
| Profile | `profile.html` | Edit profile, blocked people, log out, delete |
| Safety | `safety.html` | Commitments, emergencies, tips, reporting, guidelines, privacy |

## How matching works

Events and groups are sorted by three factors:

| Factor | Weight |
|---|---|
| Distance (area to area, never home addresses) | 40% |
| Interests | 35% |
| Life stage (student, working, new to the city, parent, kids have left home, retired) | 25% |

**Age is optional.** It isn't used unless someone ticks **Close to my age** when joining a group. Then it adds 30% weight and keeps people within 8 years of them.

Women-only events and groups include only women. Full details and a Python version are in [`docs/matching-algorithm.md`](docs/matching-algorithm.md). The code is in `js/match.js`.

## Hosting (Cloudflare)

The site is plain HTML, CSS and JavaScript with no build step. It's hosted on Cloudflare and **redeploys automatically on every push to `main`**.

- `wrangler.jsonc`: Cloudflare settings (serves the folder, uses `404.html` for missing pages)
- `_headers`: security headers. Strict everywhere (only this site's own code can run). The Map and Event pages get a looser policy that Google Maps needs. Don't copy it onto other pages.
- `.assetsignore`: keeps `README.md`, `docs/` and settings files off the public website

To set up hosting from scratch: Cloudflare dashboard → your account → **Workers & Pages → Create → Import a repository →** choose this repo. Leave the build command empty. Cloudflare reads `wrangler.jsonc`.

## Working on the code

**Preview locally:** `python3 -m http.server 8000` in this folder, then open http://localhost:8000.

**Make a change:** edit, commit and push to `main`. The live site updates in about a minute.

```
css/        tokens.css (colours, type, spacing), base.css + components.css (from the design guide), fonts.css, app.css
js/         config.js (public settings, Google Maps key), maps.js (map helper: Google Maps or free OpenStreetMap), data.js (sample people, events, places), store.js (all saving and loading), match.js (algorithm), ui.js (shared pieces), filters.js
js/pages/   one script per page
fonts/      Bricolage Grotesque and Figtree, self-hosted (SIL Open Font License)
vendor/     Leaflet 1.9.4 for the map
docs/       design guide, UX spec, matching algorithm
```

**Design rules** are in `docs/design-guide.md`. Use the colour and spacing tokens in `css/tokens.css`. Don't add new colours.

**Colours (v4):** warm and safe rather than corporate. Terracotta for buttons and links, navy for text, sage green for quiet surfaces and success, on a warm off-white background. No neons. Every text colour meets WCAG AA contrast.

| Role | Token | Light |
|---|---|---|
| Buttons, links, active | `--harbor` | `#B85238` terracotta (decorative `--apricot` `#E07A5F`) |
| Text, logo | `--ink` | `#1E293B` navy |
| Quiet surfaces | `--mist` | `#EDF4EF` sage tint (decorative `--sky` `#81B297`) |
| Success | `--moss` | `#3A7557` sage green |
| Page | `--paper` | `#FDFBF7` off-white |

**Capitalization:** headings, event titles and slogans use Title Case ("Events Near You", "Make Friends Doing What You Love"). Buttons and body text use sentence case.

## Google Maps

The Map page and event pages use **Google Maps when a key is set** in `js/config.js`, and the free OpenStreetMap map otherwise. If Google fails or rejects the key, the site switches to the free map by itself, so the map never breaks.

To turn on Google Maps (about 10 minutes, team Google account):

1. **console.cloud.google.com** → turn on 2-step verification → **create a project** (e.g. `buddy-maps`).
2. **Billing** → link a billing account. Google requires a card even inside the free allowance (10,000 map loads/month).
3. **APIs & Services → Library** → enable **Maps JavaScript API** only.
4. **Cap it:** Google Maps Platform → **Quotas** → Maps JavaScript API → *Map loads per day* → **300**. Also Billing → **Budgets & alerts** → $1 budget with email alerts.
5. **APIs & Services → Credentials → Create credentials → API key → Edit API key:**
   - Application restrictions → **Websites**: `https://buddy-app.prototype-bus4558.workers.dev/*` and `http://localhost:8000/*` (add the new address too if the site URL changes).
   - API restrictions → **Restrict key** → Maps JavaScript API only.
6. Paste the key into `js/config.js` → `googleMapsKey`, commit and push. This key is visible in the browser, which is normal for map keys. Steps 4 and 5 are what keep it safe.
7. Optional: Google Maps Platform → **Map Management → Create Map ID**, and paste it into `googleMapId` (the default `DEMO_MAP_ID` is for testing).

If the key leaks or usage spikes: Credentials → the key → **Regenerate key**, update `js/config.js`, push.

**Photos** on the home page are free Unsplash photos linked by URL. To use your own, put them in an `img/` folder and change the `src` in `index.html`. If a photo fails to load, the brand circles show instead.

## Connecting a backend (next step)

All saving and loading goes through **`js/store.js`**. Pages never touch storage directly. To move to a real database, replace the bodies of the `Store` functions with API calls and keep the same names and return shapes:

- Accounts: `signUp`, `logIn`, `logOut`, `user`, `updateProfile`, `finishProfile`, `deleteAccount`
- Events: `events`, `event`, `attendees`, `addEvent`
- Groups and chat: `createGroup`, `groups`, `group`, `groupForEvent`, `leaveGroup`, `messages`, `addMessage`, `going`, `setGoing`
- Survey and safety: `saveSurvey`, `survey`, `report`, `block`, `unblock`, `blocked`
- `sendToTeam(name, data)` is called for sign-ups, joins, posted events, surveys and reports. It does nothing yet. Point it at the backend to collect them.

Group chat will need a live connection (WebSocket or polling) once messages are shared between people.

## Privacy and safety in the prototype

- Nothing leaves the visitor's browser yet. No analytics, no trackers. The only third party is the map: Google Maps (if a key is set) or OpenStreetMap/CARTO tiles, and only on the Map and Event pages. When a map loads, that provider receives the visitor's IP address.
- Passwords are stored hashed. No government ID is collected.
- Meetups are always at public places. Reports are private, and blocking removes someone from your groups.

## Planned next

- Real accounts and shared data (backend)
- Algorithm-based filters
- Real accounts, payments and storage from the team platform kit (Supabase, Stripe, Cloudflare functions)
- Real member photos with moderation
- A new logo
