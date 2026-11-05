(function () {
  const { renderChrome, eventCard, esc, fmtWhen, $, $$ } = UI;
  renderChrome('map');
  const u = Store.user();
  if (!u) $('#post-btn').href = 'login.html?next=post.html';

  const f = BuddyFilters.setup(draw);
  let map = null, layer = null; const markers = {};

  if (window.L) {
    map = L.map('map', { scrollWheelZoom: false }).setView([42.9849, -81.2653], 12);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19, subdomains: 'abcd',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);
    layer = L.layerGroup().addTo(map);
    map.on('click', () => map.scrollWheelZoom.enable());
  } else {
    $('#map').innerHTML = '<div class="map-fallback"><p>The map could not load. Check your connection. Every event is still listed here.</p></div>';
  }

  function pinIcon(ev, n) {
    return L.divIcon({ className: '', iconSize: [34, 34], iconAnchor: [17, 34], popupAnchor: [0, -30],
      html: `<span class="pin${ev.womenOnly ? ' pin--warm' : ''}" data-pin="${esc(ev.id)}"><span>${n}</span></span>` });
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
    $('#empty').innerHTML = list.length ? '' : `<section class="empty"><h2 class="empty__title">No events match all these filters yet</h2><p class="empty__body">Try fewer filters, or post an event yourself.</p><button type="button" class="btn btn--primary" id="clear">Clear filters</button></section>`;
    if ($('#clear')) $('#clear').onclick = f.clear;
    if (!map) return;
    layer.clearLayers();
    const bounds = [];
    list.forEach((x, i) => {
      const p = Store.place(x.ev.place); if (!p) return;
      const people = Store.attendees(x.ev);
      const m = L.marker([p.lat, p.lng], { icon: pinIcon(x.ev, i + 1), title: x.ev.title, keyboard: true })
        .bindPopup(`<strong>${esc(x.ev.title)}</strong>${esc(fmtWhen(x.ev.startDate))}<br>${esc(p.name)}<br>${people.length} going · groups of ${x.ev.size}<br><a class="btn btn--primary btn--sm" href="event.html?id=${encodeURIComponent(x.ev.id)}">View event</a>`)
        .on('click', () => highlight(x.ev.id, true))
        .addTo(layer);
      markers[x.ev.id] = m; bounds.push([p.lat, p.lng]);
    });
    if (bounds.length) map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
  }

  // Hovering or focusing a card highlights its pin
  $('#list').addEventListener('mouseover', (e) => { const c = e.target.closest('.event-card'); if (c) highlight(c.dataset.id); });
  $('#list').addEventListener('focusin', (e) => { const c = e.target.closest('.event-card'); if (c && markers[c.dataset.id] && map) { highlight(c.dataset.id); map.panTo(markers[c.dataset.id].getLatLng()); } });
  draw();
})();
