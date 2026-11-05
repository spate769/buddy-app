/* Shared filters for the events list and the map. Remembers your choices for this visit. */
(function () {
  const { $, chips } = UI;
  const KEY = 'buddy.filters';
  function load() { try { return JSON.parse(sessionStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save(f) { try { sessionStorage.setItem(KEY, JSON.stringify({ ...f, cats: [...f.cats] })); } catch (e) {} }

  function setup(onChange) {
    const u = Store.user();
    const saved = load();
    const f = { cats: new Set(saved.cats || []), when: saved.when || 'any', dist: saved.dist || 'any', sort: saved.sort || (u ? 'fit' : 'soon'), women: !!saved.women };

    const catHost = $('#cats');
    chips(catHost, Store.categories().map((c) => [c.id, c.name]), f.cats, { onChange: () => { save(f); onChange(); } });

    const when = $('#when'), dist = $('#dist'), sort = $('#sort'), women = $('#women');
    when.value = f.when; dist.value = f.dist; women.setAttribute('aria-pressed', f.women);
    if (!u) {
      [...sort.options].forEach((o) => { if (o.value !== 'soon') o.remove(); });
      $('#dist-field').hidden = true; f.dist = 'any'; f.sort = 'soon';
    }
    sort.value = f.sort;
    when.onchange = () => { f.when = when.value; save(f); onChange(); };
    dist.onchange = () => { f.dist = dist.value; save(f); onChange(); };
    sort.onchange = () => { f.sort = sort.value; save(f); onChange(); };
    women.onclick = () => { f.women = !f.women; women.setAttribute('aria-pressed', f.women); save(f); onChange(); };

    f.clear = () => {
      f.cats.clear(); f.when = 'any'; f.dist = 'any'; f.women = false;
      when.value = 'any'; dist.value = 'any'; women.setAttribute('aria-pressed', 'false');
      [...catHost.children].forEach((b) => b.setAttribute('aria-pressed', 'false'));
      save(f); onChange();
    };
    return f;
  }

  function apply(f) {
    const u = Store.user();
    const now = new Date();
    const weekEnd = new Date(now.getTime() + 7 * 864e5);
    // "This weekend" = the coming Saturday and Sunday
    const sat = new Date(now); sat.setHours(0, 0, 0, 0); sat.setDate(sat.getDate() + ((6 - sat.getDay() + 7) % 7));
    const monAfter = new Date(sat.getTime() + 2 * 864e5);
    if (now.getDay() === 0) sat.setDate(sat.getDate() - 7);

    let list = Store.events().map((ev) => {
      const people = Store.attendees(ev);
      const score = u ? BuddyMatch.eventScore(u, ev, people) : null;
      const place = Store.place(ev.place);
      const km = u ? BuddyMatch.km(BuddyMatch.area(u.area), place) : 0;
      return { ev, score, km };
    });
    if (f.cats.size) list = list.filter((x) => f.cats.has(x.ev.cat));
    if (f.women) list = list.filter((x) => x.ev.womenOnly);
    if (f.when === 'week') list = list.filter((x) => x.ev.startDate <= weekEnd);
    if (f.when === 'weekend') list = list.filter((x) => x.ev.startDate >= sat && x.ev.startDate < monAfter);
    if (f.when === 'evening') list = list.filter((x) => x.ev.startDate.getHours() >= 17);
    if (u && f.dist !== 'any') list = list.filter((x) => x.km <= Number(f.dist));
    if (f.sort === 'fit' && u) list.sort((a, b) => (b.score.eligible - a.score.eligible) || (b.score.total - a.score.total));
    else if (f.sort === 'near' && u) list.sort((a, b) => a.km - b.km);
    else list.sort((a, b) => a.ev.startDate - b.ev.startDate);
    return list;
  }

  window.BuddyFilters = { setup, apply };
})();
