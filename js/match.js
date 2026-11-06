/* ==========================================================
   Buddy · matching algorithm
   Sorts and groups people by three factors by default:
     1. Geography     40%  distance from your area to the event / to them
     2. Interests     35%  the event's activity plus interests in common
     3. Demographics  25%  same life stage (student, working, new to London...)
   Age is NOT used by default. It only counts when a person ticks
   "Close to my age" when joining (+30% weight, and people within 8 years).
   Hard rule: women-only events and groups only include women.

   This file has no dependencies, so it can be ported to Python
   (see docs/matching-algorithm.md) and run on a server later.
   ========================================================== */
(function () {
  const D = window.BUDDY_DATA;
  const WEIGHTS = { geo: 0.40, age: 0, interest: 0.35, demo: 0.25 };
  const MAX_KM = 12;      // 0 points at 12 km or more
  const MAX_AGE_GAP = 15; // 0 points at a 15-year gap or more

  const clamp = (n) => Math.max(0, Math.min(1, n));
  const area = (id) => D.AREAS.find((a) => a.id === id) || D.AREAS[0];

  function km(a, b) {
    const R = 6371, rad = (x) => (x * Math.PI) / 180;
    const dLat = rad(b.lat - a.lat), dLng = rad(b.lng - a.lng);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }
  function overlap(a, b) {
    const A = new Set(a), B = new Set(b);
    const inter = [...A].filter((x) => B.has(x)).length;
    const union = new Set([...A, ...B]).size || 1;
    return inter / union;
  }
  const median = (xs) => { const s = [...xs].sort((a, b) => a - b); const m = Math.floor(s.length / 2); return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
  const geoScore = (d) => clamp(1 - d / MAX_KM);
  const ageScore = (gap) => clamp(1 - gap / MAX_AGE_GAP);
  const isWoman = (p) => p.gender === 'woman';

  /** How well one person fits another (used to build groups). */
  function pairScore(me, other, w = WEIGHTS) {
    const parts = {
      geo: geoScore(km(area(me.area), area(other.area))),
      age: ageScore(Math.abs(me.age - other.age)),
      interest: overlap(me.interests, other.interests),
      demo: me.stage === other.stage ? 1 : 0
    };
    return { total: parts.geo * w.geo + parts.age * w.age + parts.interest * w.interest + parts.demo * w.demo, parts };
  }

  /** How well an event fits you (used to sort the events list and map). */
  function eventScore(me, ev, people) {
    const place = D.PLACES.find((p) => p.id === ev.place) || { lat: area(ev.area).lat, lng: area(ev.area).lng };
    const going = people.filter(Boolean);
    const distance = km(area(me.area), place);
    const ages = going.map((p) => p.age);
    const medAge = ages.length ? median(ages) : me.age;
    const likesActivity = me.interests.includes(ev.cat);
    const avgOverlap = going.length ? going.reduce((s, p) => s + overlap(me.interests, p.interests), 0) / going.length : 0;
    const sameStage = going.filter((p) => p.stage === me.stage).length;
    const parts = {
      geo: geoScore(distance),
      age: ageScore(Math.abs(me.age - medAge)),
      interest: clamp((likesActivity ? 0.6 : 0) + avgOverlap * 0.8),
      demo: going.length ? sameStage / going.length : 0
    };
    const total = parts.geo * WEIGHTS.geo + parts.age * WEIGHTS.age + parts.interest * WEIGHTS.interest + parts.demo * WEIGHTS.demo;
    const eligible = !ev.womenOnly || isWoman(me);
    return {
      total, parts, eligible, distance, likesActivity, sameStage,
      ageRange: ages.length ? [Math.min(...ages), Math.max(...ages)] : null,
      percent: Math.round(total * 100)
    };
  }

  /**
   * Form your group for an event.
   * prefs: { size: 5|6, similarInterests, similarAge, sameStage, womenOnly }
   * Returns the people placed with you, best fit first, plus why.
   */
  function formGroup(me, ev, people, prefs) {
    const size = Math.min(6, Math.max(3, prefs.size || ev.size || 6));
    const w = { ...WEIGHTS };
    if (prefs.similarInterests) w.interest += 0.15;
    if (prefs.sameStage) w.demo += 0.15;
    if (prefs.similarAge) w.age += 0.30; // optional, chosen by the person joining

    let pool = people.filter(Boolean);
    const womenOnly = ev.womenOnly || prefs.womenOnly;
    if (womenOnly) pool = pool.filter(isWoman);
    if (prefs.similarAge) {
      const near = pool.filter((p) => Math.abs(p.age - me.age) <= 8);
      if (near.length >= size - 1) pool = near; // widen automatically if too few
    }
    const ranked = pool
      .map((p) => ({ person: p, ...pairScore(me, p, w) }))
      .sort((a, b) => b.total - a.total)
      .slice(0, size - 1);

    const group = ranked.map((r) => r.person);
    const ages = group.map((p) => p.age).concat(me.age);
    const dists = group.map((p) => km(area(me.area), area(p.area)));
    const shared = {};
    group.forEach((p) => p.interests.forEach((i) => { if (me.interests.includes(i)) shared[i] = (shared[i] || 0) + 1; }));
    const topShared = Object.entries(shared).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([i]) => i);
    return {
      members: group,
      size: group.length + 1,
      womenOnly,
      reasons: {
        ageRange: [Math.min(...ages), Math.max(...ages)],
        avgKm: dists.length ? dists.reduce((a, b) => a + b, 0) / dists.length : 0,
        sharedInterests: topShared,
        sameStage: group.filter((p) => p.stage === me.stage).length
      }
    };
  }

  /** Rounded, privacy-safe distance label (never more precise than whole km). */
  function distanceLabel(d) {
    if (d < 1) return 'less than 1 km away';
    return `about ${Math.round(d)} km away`;
  }
  function fitLabel(pct) {
    if (pct >= 72) return 'Great fit';
    if (pct >= 55) return 'Good fit';
    return 'Might fit';
  }

  window.BuddyMatch = { WEIGHTS, km, area, pairScore, eventScore, formGroup, distanceLabel, fitLabel };
})();
