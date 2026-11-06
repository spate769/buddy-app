(function () {
  const { renderChrome, eventCard, esc, fmtWhen, $, $$ } = UI;
  renderChrome('map');
  const u = Store.user();
  if (!u) $('#post-btn').href = 'login.html?next=post.html';

  const f = BuddyFilters.setup(draw);
  let map = null; const pins = {};

  function pinHtml(ev, n) {
    return `<span class="pin${ev.womenOnly ? ' pin--warm' : ''}" data-pin="${esc(ev.id)}"><span>${n}</span></span>`;
  }

  function highlight(id, scroll) {
    $$('.map-list .event-card').forEach((c) => c.classList.toggle('is-active', c.dataset.id === id));
    $$('.pin').forEach((p) => p.classList.toggle('is-active', p.dataset.pin === id));
    if (scroll) { const c = $(`.map-list .event-card[data-id="${CSS.escape(id)}"]`); if (c) c.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
  }

  function draw() {
    const list = BuddyFilters.apply(f);
    $('#count').textContent = `${list.length} event${list.length === 1 ? '' : 's'} on the map`;
    $('#list').innerHTML = list.map((x, i) => `<li>${eventCard(x.ev, { compact: true }).replace('<article class="event-card', `<article data-id="${esc(x.ev.id)}" class="event-card`).replace('<div class="stub" aria-hidden="true">', `<div class="stub" aria-hidden="true"><span class="stub__mon">#${i + 1}</span>`)}</li>`).join('');
    $('#empty').innerHTML = list.length ? '' : `<section class="empty"><h2 class="empty__title">No Events Match All These Filters Yet</h2><p class="empty__body">Try fewer filters, or post an event yourself.</p><button type="button" class="btn btn--primary" id="clear">Clear filters</button></section>`;
    if ($('#clear')) $('#clear').onclick = f.clear;
    if (!map) return;
    map.clear();
    const bounds = [];
    list.forEach((x, i) => {
      const p = Store.place(x.ev.place); if (!p) return;
      const people = Store.attendees(x.ev);
      pins[x.ev.id] = map.addPin({
        lat: p.lat, lng: p.lng, title: x.ev.title, html: pinHtml(x.ev, i + 1),
        popup: `<strong>${esc(x.ev.title)}</strong>${esc(fmtWhen(x.ev.startDate))}<br>${esc(p.name)}<br>${people.length} going · groups of ${x.ev.size}<br><a class="btn btn--primary btn--sm" href="event.html?id=${encodeURIComponent(x.ev.id)}">View event</a>`,
        onClick: () => highlight(x.ev.id, true)
      });
      bounds.push([p.lat, p.lng]);
    });
    map.fit(bounds, { padding: 40, maxZoom: 14 });
  }

  // Hovering or focusing a card highlights its pin
  $('#list').addEventListener('mouseover', (e) => { const c = e.target.closest('.event-card'); if (c) highlight(c.dataset.id); });
  $('#list').addEventListener('focusin', (e) => { const c = e.target.closest('.event-card'); if (c && pins[c.dataset.id] && map) { highlight(c.dataset.id); map.panTo(pins[c.dataset.id].lat, pins[c.dataset.id].lng); } });
  draw();
  BuddyMap.create('map', { zoom: 12 }).then((m) => { map = m; if (map) draw(); });
})();
