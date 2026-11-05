# Buddy

Buddy puts adults in London, Ontario into small groups of 5 or 6 for things they already like doing: pickup basketball, a movie, a morning walk. You pick an event, the matching algorithm places you with people near you who are close in age and share your interests, and a group chat opens so the group can plan. After the meetup, a 5-question survey asks how it went.

Business 4558 prototype · Andrew, Carina, Mert, Sheel, Pruthvish

## How to try it (2 minutes)

1. Open the site (see "Previewing" below) and click **"Just looking? Try the demo"** on the home page. You can also click **"Use the demo profile"** on the sign-up or log-in page.
2. You land on **My groups** with one group already made for "Board games at the library".
3. Click the group to open the **group chat**. Send a message, tap **I'm going**, and try **People** and **Report**.
4. In the chat, click **Rate this meetup** to see the **5-question survey**.
5. Go to **Events** or **Map**, open any event and click **Join a group** to watch the matching form a new group.
6. Click **You** (top right) to edit the profile or log out. To start over as a new person, log out and click **Create your profile**.

Pages that need an account (groups, chat, survey, profile, post) send you to log in first. That's why a preview may open on the log-in page. Use the demo button there.

## Previewing

- **Quickest:** double-click `index.html`. Headings may show in a fallback font this way.
- **Like the real site:** in Terminal, run `cd ~/Documents/buddy-app && python3 -m http.server 8000`, then open http://localhost:8000.
- **Shareable link:** drag the `buddy-app` folder onto https://app.netlify.com/drop.

## The five steps

| Step | Page | What happens |
|---|---|---|
| 1. Sign up / log in | `signup.html`, `login.html` | Account, then name plus a photo **or** social link (required, so people can put a face to a name), 3+ interests, area, age, life stage, optional gender |
| 2. Find an event | `events.html`, `map.html` | List or map of group events (never one-on-one). Filter by activity, day, distance, women-only. Sorted by fit |
| 3. Join a group | `event.html?id=…` | Shows why the event fits you. Choose group size (5 or 6), similar interests, similar age, same life stage, women-only. The algorithm forms your group |
| 4. Group chat | `chat.html?g=…`, `groups.html` | The plan, the people, "I'm going", messages, Report and Block |
| 5. Follow-up | `survey.html?g=…` | Rating, would you meet again, group fit, felt safe, comments. "Not safe" offers a private report |

Also: `post.html` (anyone can post an event at a public place), `profile.html` (edit, blocked people, log out, delete), `safety.html` (safety tips, guidelines, privacy).

**Demo profile:** the "Use the demo profile" button on the sign-up and log-in pages skips sign-up. That's the fastest way for the professor to try it.

## Deploying on Netlify

1. Push this folder to the GitHub repo (`spate769/buddy-app`). The files go at the top level of the repo, with `index.html` in the root.
2. On app.netlify.com: **Add new site → Import an existing project → GitHub →** pick `buddy-app`.
3. Leave the build command empty. The publish directory is `.` (already set in `netlify.toml`). Click **Deploy**.
4. Go to **Site configuration → Forms** and turn on **form detection**, then redeploy once.
5. Every push to `main` now updates the live site. Pull requests get their own preview link.

### Where the data goes

| Data | Where it lives now |
|---|---|
| Profiles, groups, chat messages, blocks | The visitor's own browser (`localStorage`). Not shared between people or devices yet |
| Sign-ups, joins, posted events, survey answers, reports | **Also** sent to Netlify Forms. The team sees them in Netlify → Forms and can export CSV |

Passwords and photos are **never** sent to Netlify Forms. Government ID is never collected.

## Connecting a backend (for Pruthvish)

All reading and writing goes through one file: **`js/store.js`**. Pages never touch storage directly. To move to a real database, replace the bodies of the `Store` functions with API calls and keep the same names and return shapes:

- Accounts: `signUp`, `logIn`, `logOut`, `user`, `updateProfile`, `finishProfile`, `deleteAccount`
- Events: `events`, `event`, `attendees`, `addEvent`
- Groups and chat: `createGroup`, `groups`, `group`, `groupForEvent`, `leaveGroup`, `messages`, `addMessage`, `going`, `setGoing`
- Survey and safety: `saveSurvey`, `survey`, `report`, `block`, `unblock`, `blocked`

Group chat would need a live connection (WebSocket or polling) once messages are shared between people.

The matching algorithm is in **`js/match.js`**, with no dependencies. A plain-language spec and a Python version are in **`docs/matching-algorithm.md`**.

## Files

```
index.html  signup.html  login.html  events.html  map.html  event.html
post.html   groups.html  chat.html   survey.html  profile.html  safety.html  404.html
css/        tokens.css (design tokens), base.css + components.css (from the design guide), fonts.css, app.css
js/         data.js (sample people/events), store.js (data layer), match.js (algorithm), ui.js (shared UI), filters.js
js/pages/   one script per page
fonts/      Fraunces and Figtree, self-hosted (SIL Open Font License)
vendor/     Leaflet 1.9.4 for the map (BSD-2)
docs/       design-guide.md, ux-design-spec.md, matching-algorithm.md
netlify.toml   publish settings and security headers
```

Everything is self-hosted except the map tiles (CARTO, built on OpenStreetMap data). No other third-party scripts, fonts or trackers.

## Sample data

All people and events in `js/data.js` are **examples**, labelled as such on the site. Venues are real public places in London. Replace them with real data before launch.

## Running locally

Open the folder in a terminal and run `python3 -m http.server`, then visit http://localhost:8000. Netlify Forms only works on the deployed site.
