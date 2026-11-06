/* ==========================================================
   Buddy · map helper
   One small interface for both map providers:
     - Google Maps, when js/config.js has a googleMapsKey
     - Leaflet + OpenStreetMap (free, no key) otherwise, or if Google fails
   Pages call BuddyMap.create(...) and never talk to either library directly.

   Privacy: pins are only ever public places (venues). Google is only
   contacted on pages that show a map, and only when a key is set.
   ========================================================== */
(function () {
  const cfg = window.BUDDY_CONFIG || {};
  const LONDON = [42.9849, -81.2653];
  let googleLoading = null;
  const SKIP = 'buddy.skipGoogleMaps';
  function useGoogle() {
    if (!cfg.googleMapsKey) return false;
    try { return sessionStorage.getItem(SKIP) !== '1'; } catch (e) { return true; }
  }

  function loadGoogle() {
    if (window.google && window.google.maps && window.google.maps.importLibrary) return Promise.resolve(window.google);
    if (googleLoading) return googleLoading;
    googleLoading = new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Google Maps timed out')), 10000);
      window.__buddyMapsReady = () => { clearTimeout(timer); resolve(window.google); };
      const params = new URLSearchParams({ key: cfg.googleMapsKey, v: 'weekly', loading: 'async', callback: '__buddyMapsReady' });
      const s = document.createElement('script');
      s.src = `https://maps.googleapis.com/maps/api/js?${params}`;
      s.async = true;
      s.onerror = () => { clearTimeout(timer); googleLoading = null; reject(new Error('Google Maps failed to load')); };
      document.head.appendChild(s);
    });
    return googleLoading;
  }

  function toNode(html) {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  /* ---------- Google Maps ---------- */
  async function googleMap(el, opts) {
    const google = await loadGoogle();
    const { Map, InfoWindow } = await google.maps.importLibrary('maps');
    const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
    el.innerHTML = '';
    const map = new Map(el, {
      center: { lat: opts.center[0], lng: opts.center[1] },
      zoom: opts.zoom,
      mapId: cfg.googleMapId || 'DEMO_MAP_ID',
      gestureHandling: opts.interactive === false ? 'none' : 'cooperative',
      disableDefaultUI: opts.interactive === false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      clickableIcons: false
    });
    const info = new InfoWindow();
    let markers = [];
    return {
      provider: 'google',
      clear() { markers.forEach((m) => { m.map = null; }); markers = []; info.close(); },
      addPin(p) {
        const m = new AdvancedMarkerElement({ map, position: { lat: p.lat, lng: p.lng }, content: toNode(p.html), title: p.title || '', gmpClickable: true });
        m.addListener('click', () => {
          if (p.popup) { info.setContent(`<div class="gm-popup">${p.popup}</div>`); info.open({ anchor: m, map }); }
          if (p.onClick) p.onClick();
        });
        markers.push(m);
        return { lat: p.lat, lng: p.lng };
      },
      fit(points, o = {}) {
        if (!points.length) return;
        const b = new google.maps.LatLngBounds();
        points.forEach(([lat, lng]) => b.extend({ lat, lng }));
        map.fitBounds(b, o.padding || 40);
        google.maps.event.addListenerOnce(map, 'idle', () => { if (map.getZoom() > (o.maxZoom || 14)) map.setZoom(o.maxZoom || 14); });
      },
      panTo(lat, lng) { map.panTo({ lat, lng }); }
    };
  }

  /* ---------- Leaflet + OpenStreetMap (free fallback) ---------- */
  function leafletMap(el, opts) {
    if (!window.L) throw new Error('Leaflet missing');
    el.innerHTML = '';
    const interactive = opts.interactive !== false;
    const map = L.map(el, { scrollWheelZoom: false, zoomControl: interactive, dragging: interactive && !L.Browser.mobile }).setView(opts.center, opts.zoom);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19, subdomains: 'abcd',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);
    if (interactive) map.on('click', () => map.scrollWheelZoom.enable());
    const layer = L.layerGroup().addTo(map);
    return {
      provider: 'leaflet',
      clear() { layer.clearLayers(); },
      addPin(p) {
        const m = L.marker([p.lat, p.lng], { icon: L.divIcon({ className: '', iconSize: [34, 34], iconAnchor: [17, 34], popupAnchor: [0, -30], html: p.html }), title: p.title || '', keyboard: true });
        if (p.popup) m.bindPopup(p.popup);
        if (p.onClick) m.on('click', p.onClick);
        m.addTo(layer);
        return { lat: p.lat, lng: p.lng };
      },
      fit(points, o = {}) { if (points.length) map.fitBounds(points, { padding: [o.padding || 40, o.padding || 40], maxZoom: o.maxZoom || 14 }); },
      panTo(lat, lng) { map.panTo([lat, lng]); }
    };
  }

  function failMessage(el) {
    el.innerHTML = '<div class="map-fallback"><p>The map could not load. Check your connection. Every event is still listed here.</p></div>';
  }

  /**
   * BuddyMap.create(element, { center: [lat, lng], zoom, interactive })
   * Resolves to a map with: clear(), addPin({lat,lng,html,title,popup,onClick}), fit(points), panTo(lat,lng)
   * Resolves to null if no map could load (a message is shown in the element instead).
   */
  async function create(el, opts = {}) {
    if (typeof el === 'string') el = document.getElementById(el);
    if (!el) return null;
    opts = { center: LONDON, zoom: 12, ...opts };
    if (useGoogle()) {
      try {
        // If Google rejects the key (wrong website, API not enabled), reload once with the free map.
        window.gm_authFailure = () => {
          console.warn('[Buddy] Google Maps rejected the key. Check its website restrictions. Using OpenStreetMap instead.');
          try { sessionStorage.setItem(SKIP, '1'); location.reload(); } catch (e) {}
        };
        return await googleMap(el, opts);
      } catch (e) {
        console.warn('[Buddy] Google Maps unavailable, using OpenStreetMap instead:', e.message);
      }
    }
    try { return leafletMap(el, opts); } catch (e) { failMessage(el); return null; }
  }

  window.BuddyMap = { create, provider: () => (useGoogle() ? 'google' : 'leaflet') };
})();
