# Buddy matching algorithm

The JavaScript version is in `js/match.js`. This document explains it in plain language and gives an equivalent Python version for a future server.

## Factors and weights

People are sorted by four factors, in this order:

| Factor | Weight | Score from 0 to 1 |
|---|---|---|
| Geography | 35% | `1 − distance_km / 12` (0 at 12 km or more). Distance is between area centres, never home addresses |
| Age | 30% | `1 − age_gap / 15` (0 at a 15-year gap or more) |
| Interests | 20% | Overlap of interest lists: shared ÷ combined (Jaccard) |
| Demographics | 15% | 1 if the same life stage (Student, Working, New to London, Parent, Kids have left home, Retired), otherwise 0 |

**Hard rule:** women-only events and women-only groups include only members who identify as women.

## 1. Event fit (sorting the list and the map)

For you and one event:

- **Geography:** distance from your area to the venue.
- **Age:** gap between your age and the median age of people going.
- **Interests:** 0.6 if the event's activity is one of your interests, plus 0.8 × your average overlap with the people going, capped at 1.
- **Demographics:** share of people going who are at your life stage.

`fit = 0.35·geo + 0.30·age + 0.20·interests + 0.15·demo`, shown as a percentage. Labels: 72%+ "Great fit", 55%+ "Good fit", otherwise "Might fit".

## 2. Forming your group (when you join)

1. Start with everyone going to the event, minus anyone you blocked.
2. If the event or your choice is women-only, keep only women.
3. If "Close to my age" is on, keep people within 8 years of you. If that leaves too few people, use everyone instead.
4. Score each person against you with the four factors. Your choices add weight: similar interests +0.15, same life stage +0.15, similar age +0.10.
5. Take the top `size − 1` people (size is 5 or 6). That's your group.

The page then explains the group: age range, average distance, top shared interests.

## Python version

```python
from math import radians, sin, cos, asin, sqrt
from statistics import median

WEIGHTS = {"geo": 0.35, "age": 0.30, "interest": 0.20, "demo": 0.15}
MAX_KM, MAX_AGE_GAP = 12, 15

def km(a, b):
    dlat, dlng = radians(b["lat"] - a["lat"]), radians(b["lng"] - a["lng"])
    h = sin(dlat / 2) ** 2 + cos(radians(a["lat"])) * cos(radians(b["lat"])) * sin(dlng / 2) ** 2
    return 2 * 6371 * asin(sqrt(h))

clamp = lambda x: max(0.0, min(1.0, x))

def overlap(a, b):
    a, b = set(a), set(b)
    return len(a & b) / (len(a | b) or 1)

def pair_score(me, other, areas, w=WEIGHTS):
    parts = {
        "geo": clamp(1 - km(areas[me["area"]], areas[other["area"]]) / MAX_KM),
        "age": clamp(1 - abs(me["age"] - other["age"]) / MAX_AGE_GAP),
        "interest": overlap(me["interests"], other["interests"]),
        "demo": 1.0 if me["stage"] == other["stage"] else 0.0,
    }
    return sum(parts[k] * w[k] for k in w), parts

def event_score(me, event, venue, going, areas):
    ages = [p["age"] for p in going] or [me["age"]]
    avg_overlap = sum(overlap(me["interests"], p["interests"]) for p in going) / len(going) if going else 0
    parts = {
        "geo": clamp(1 - km(areas[me["area"]], venue) / MAX_KM),
        "age": clamp(1 - abs(me["age"] - median(ages)) / MAX_AGE_GAP),
        "interest": clamp((0.6 if event["cat"] in me["interests"] else 0) + avg_overlap * 0.8),
        "demo": (sum(p["stage"] == me["stage"] for p in going) / len(going)) if going else 0,
    }
    eligible = not event.get("womenOnly") or me.get("gender") == "woman"
    return sum(parts[k] * WEIGHTS[k] for k in WEIGHTS), parts, eligible

def form_group(me, event, going, areas, prefs):
    size = min(6, max(3, prefs.get("size") or event.get("size", 6)))
    w = dict(WEIGHTS)
    if prefs.get("similarInterests"): w["interest"] += 0.15
    if prefs.get("sameStage"): w["demo"] += 0.15
    if prefs.get("similarAge"): w["age"] += 0.10
    pool = list(going)
    if event.get("womenOnly") or prefs.get("womenOnly"):
        pool = [p for p in pool if p.get("gender") == "woman"]
    if prefs.get("similarAge"):
        near = [p for p in pool if abs(p["age"] - me["age"]) <= 8]
        if len(near) >= size - 1:
            pool = near
    ranked = sorted(pool, key=lambda p: pair_score(me, p, areas, w)[0], reverse=True)
    return ranked[: size - 1]
```

## Ideas for the next version

- Form all groups for an event at once (clustering), instead of one group around each person as they join.
- Use survey answers: people who said "Yes, meet again" get grouped together again; low-fit pairs are kept apart.
- Snap member locations to a ~1 km grid before computing distance, so repeated distance readings can't reveal a home address.
