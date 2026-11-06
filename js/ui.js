/* ==========================================================
   Buddy · shared interface pieces
   Header, tab bar, footer, icons, avatars, event cards,
   toasts, and the report / block / person dialogs.
   ========================================================== */
(function () {
  const S = window.Store, M = window.BuddyMatch;

  /* ---------- Icons (24px, 1.75 stroke) ---------- */
  const P = {
    calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    pin: '<path d="M12 21s-6.5-5.8-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.2-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
    users: '<circle cx="9" cy="8.5" r="3.3"/><path d="M3 19.5c.6-3.3 3-5.5 6-5.5s5.4 2.2 6 5.5"/><path d="M15.5 5.4a3.3 3.3 0 0 1 0 6.3M17.6 14.3c1.8.8 3 2.6 3.4 5.2"/>',
    user: '<circle cx="12" cy="8" r="3.8"/><path d="M4.5 20.5c.8-3.9 3.8-6.5 7.5-6.5s6.7 2.6 7.5 6.5"/>',
    list: '<path d="M9 6.5h11M9 12h11M9 17.5h11"/><circle cx="4.75" cy="6.5" r=".9"/><circle cx="4.75" cy="12" r=".9"/><circle cx="4.75" cy="17.5" r=".9"/>',
    map: '<path d="M9 4.5 3.5 6.5v13l5.5-2 6 2 5.5-2v-13l-5.5 2-6-2z"/><path d="M9 4.5v13M15 6.5v13"/>',
    chat: '<path d="M4 5.5h16v10.5H10l-4.5 3.5V16H4z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    back: '<path d="M14.5 5.5 8 12l6.5 6.5"/>',
    flag: '<path d="M5.5 21V4M5.5 4.5h11l-2 4 2 4h-11"/>',
    shield: '<path d="M12 3.5 19 6v5.5c0 4.6-3 7.7-7 9-4-1.3-7-4.4-7-9V6z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
    send: '<path d="M4.5 12 20 4.5 15.5 20l-3-6.5z"/><path d="m12.5 13.5 3-3"/>',
    x: '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/>',
    alert: '<path d="M12 4 21 19.5H3z"/><path d="M12 10v4M12 17h.01"/>',
    upload: '<path d="M12 15.5V4.5M7.5 9 12 4.5 16.5 9M4.5 19.5h15"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    filter: '<path d="M4 6.5h16M7 12h10M10 17.5h4"/>',
    more: '<circle cx="5.5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="18.5" cy="12" r="1.2"/>',
    star: '<path d="m12 4 2.4 5 5.4.6-4 3.7 1.1 5.4L12 16l-4.9 2.7 1.1-5.4-4-3.7 5.4-.6z"/>',
    door: '<path d="M14 4.5H6.5v15H14M10 12h10M17 9l3 3-3 3"/>'
  };
  const icon = (name, cls = '') => `<svg class="ico ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name] || ''}</svg>`;

  /* ---------- Small helpers ---------- */
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const param = (k) => new URLSearchParams(location.search).get(k);

  const DAY = new Intl.DateTimeFormat('en-CA', { weekday: 'short' });
  const MON = new Intl.DateTimeFormat('en-CA', { month: 'short' });
  const LONG = new Intl.DateTimeFormat('en-CA', { weekday: 'long', month: 'long', day: 'numeric' });
  function fmtTime(d) {
    let h = d.getHours(); const m = d.getMinutes(); const ap = h >= 12 ? 'p.m.' : 'a.m.'; h = h % 12 || 12;
    return `${h}:${String(m).padStart(2, '0')} ${ap}`;
  }
  function fmtDay(d) {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const diff = Math.round((new Date(d).setHours(0, 0, 0, 0) - today) / 864e5);
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    return `${DAY.format(d)}, ${MON.format(d)} ${d.getDate()}`;
  }
  const fmtLong = (d) => LONG.format(d);
  const fmtWhen = (d) => `${fmtDay(d)} · ${fmtTime(d)}`;

  function initials(name) {
    const parts = String(name || '?').trim().split(/\s+/);
    return ((parts[0] || '?')[0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
  }
  function avatar(p, size = 40, { alt = '' } = {}) {
    if (!p) return '';
    if (p.photo) return `<img class="avatar" style="--size:${size}px" src="${p.photo}" alt="${esc(alt)}" width="${size}" height="${size}">`;
    return `<span class="avatar avatar--initials" style="--size:${size}px" aria-hidden="true">${esc(initials(p.name))}</span>`;
  }
  function avatarStack(people, max = 4) {
    const shown = people.slice(0, max);
    const extra = people.length - shown.length;
    return `<span class="stack">${shown.map((p) => avatar(p, 32)).join('')}${extra > 0 ? `<span class="stack__more">+${extra}</span>` : ''}</span>`;
  }

  /* ---------- Toast ---------- */
  function toast(text, action) {
    let region = $('.toast-region');
    if (!region) { region = document.createElement('div'); region.className = 'toast-region'; region.setAttribute('role', 'status'); region.setAttribute('aria-live', 'polite'); document.body.appendChild(region); }
    const t = document.createElement('div'); t.className = 'toast';
    t.innerHTML = `<span>${esc(text)}</span>${action ? `<button type="button" class="toast__action">${esc(action.label)}</button>` : ''}`;
    if (action) $('.toast__action', t).onclick = () => { action.run(); t.remove(); };
    region.appendChild(t);
    let timer; const start = () => { timer = setTimeout(() => t.remove(), 6000); };
    t.addEventListener('mouseenter', () => clearTimeout(timer)); t.addEventListener('mouseleave', start);
    start();
  }
  function flash(text) { try { sessionStorage.setItem('buddy.flash', text); } catch (e) {} }
  function showFlash() { try { const f = sessionStorage.getItem('buddy.flash'); if (f) { sessionStorage.removeItem('buddy.flash'); toast(f); } } catch (e) {} }

  /* ---------- Page chrome ---------- */
  const LOGO = `<svg class="logo__mark" viewBox="0 0 40 28" aria-hidden="true"><circle cx="9" cy="16" r="7" fill="var(--sky)"/><circle cx="31" cy="16" r="7" fill="var(--apricot)"/><circle cx="20" cy="12" r="8" fill="var(--ink)"/></svg><span class="logo__word">Buddy</span>`;

  function renderChrome(active) {
    const u = S.user();
    const home = 'index.html';
    const nav = [
      ['events', 'Events', 'events.html', 'list'],
      ['map', 'Map', 'map.html', 'map'],
      ['groups', 'My Groups', 'groups.html', 'chat'],
      ['safety', 'Safety', 'safety.html', 'shield'],
      ['you', 'You', 'profile.html', 'user']
    ];
    const header = document.createElement('div');
    header.innerHTML = `
      <a class="skip-link" href="#main">Skip to main content</a>
      <header class="topbar">
        <div class="container topbar__inner">
          <a class="logo" href="${home}" aria-label="Buddy home">${LOGO}</a>
          ${u ? `<nav class="topnav" aria-label="Main">
              ${nav.slice(0, 4).map(([k, l, h, i]) => `<a href="${h}" class="topnav__link"${k === active ? ' aria-current="page"' : ''}>${icon(i)}<span>${l}</span></a>`).join('')}
            </nav>
            <div class="topbar__actions">
              <a class="btn btn--secondary btn--sm topbar__post" href="post.html">${icon('plus')}Post an event</a>
              <a class="topnav__you" href="profile.html"${active === 'you' ? ' aria-current="page"' : ''}>${avatar(u, 32)}<span>${esc(u.name)}</span></a>
            </div>`
          : `<nav class="topnav topnav--public" aria-label="Main">
              <a href="events.html" class="topnav__link"${active === 'events' ? ' aria-current="page"' : ''}>${icon('list')}<span>Events</span></a>
              <a href="map.html" class="topnav__link"${active === 'map' ? ' aria-current="page"' : ''}>${icon('map')}<span>Map</span></a>
              <a href="safety.html" class="topnav__link"${active === 'safety' ? ' aria-current="page"' : ''}>${icon('shield')}<span>Safety</span></a>
            </nav>
            <div class="topbar__actions">
              <a class="btn btn--tertiary" href="login.html">Log in</a>
              <a class="btn btn--primary" href="signup.html">Join Buddy</a>
            </div>`}
        </div>
      </header>`;
    document.body.prepend(...header.children);

    if (u) {
      const tab = document.createElement('nav');
      tab.className = 'tabbar'; tab.setAttribute('aria-label', 'Main');
      tab.innerHTML = nav.map(([k, l, h, i]) => `<a class="tabbar__item" href="${h}"${k === active ? ' aria-current="page"' : ''}>${k === 'you' ? avatar(u, 24) : icon(i)}<span>${l}</span></a>`).join('');
      document.body.appendChild(tab);
      document.body.classList.add('has-tabbar');
    }

    const f = document.createElement('footer');
    f.className = 'site-footer';
    f.innerHTML = `<div class="container site-footer__inner">
      <p class="site-footer__brand">${LOGO}</p>
      <nav aria-label="Footer"><ul>
        <li><a href="safety.html">Safety</a></li>
        <li><a href="safety.html#guidelines">Community guidelines</a></li>
        <li><a href="safety.html#privacy">Privacy</a></li>
        <li><a href="safety.html#contact">Contact</a></li>
      </ul></nav>
      <p class="meta">A Business 4558 prototype. People and events shown are examples.</p>
    </div>`;
    document.body.appendChild(f);
    // If a stock photo can't load, hide it and show the brand shapes behind it.
    document.querySelectorAll('img[data-fallback]').forEach((img) => {
      const fail = () => { img.hidden = true; };
      if (img.complete && img.naturalWidth === 0) fail(); else img.addEventListener('error', fail);
    });
    showFlash();
  }

  function requireUser() {
    const u = S.user();
    if (!u) { location.replace('login.html?next=' + encodeURIComponent(location.pathname.split('/').pop() + location.search)); return null; }
    if (!u.complete) { location.replace('signup.html?step=2'); return null; }
    return u;
  }

  /* ---------- Event card (list, map, landing) ---------- */
  function eventCard(ev, { compact = false } = {}) {
    const u = S.user();
    const place = S.place(ev.place);
    const people = S.attendees(ev);
    const d = ev.startDate;
    const joined = u && S.groupForEvent(ev.id);
    let fit = '';
    if (u) {
      const sc = M.eventScore(u, ev, people);
      fit = sc.eligible
        ? `<p class="fit"><span class="fit__label">${M.fitLabel(sc.percent)}</span><span class="meter" aria-hidden="true"><span style="width:${sc.percent}%"></span></span><span class="meta tabular">${sc.percent}%</span></p>`
        : `<p class="fit fit--no">${icon('info')}<span>Women-only group</span></p>`;
    }
    const distance = u ? ` · ${M.distanceLabel(M.km(M.area(u.area), place))}` : '';
    return `<article class="event-card${compact ? ' event-card--compact' : ''}">
      <div class="stub" aria-hidden="true"><span class="stub__dow">${DAY.format(d)}</span><span class="stub__day tabular">${d.getDate()}</span><span class="stub__mon">${MON.format(d)}</span></div>
      <div class="event-card__body">
        <ul class="tag-list"><li class="tag">${esc(S.catName(ev.cat))}</li>${ev.womenOnly ? '<li class="tag tag--warm">Women only</li>' : ''}${joined ? `<li class="tag tag--shared">${icon('check')}You're in a group</li>` : ''}</ul>
        <h3 class="event-card__title"><a href="event.html?id=${encodeURIComponent(ev.id)}">${esc(ev.title)}</a></h3>
        <p class="meta event-card__meta">${icon('clock')}<span><span class="visually-hidden">When: </span>${fmtWhen(d)}</span></p>
        <p class="meta event-card__meta">${icon('pin')}<span><span class="visually-hidden">Where: </span>${esc(place ? place.name : '')}${distance}</span></p>
        <div class="event-card__foot">
          <p class="meta going">${avatarStack(people)}<span>${people.length} going${people.length ? ` · ${Math.max(1, Math.ceil(people.length / ev.size))} ${Math.ceil(people.length / ev.size) > 1 ? 'groups' : 'group'} of ${ev.size}` : ''}</span></p>
          ${fit}
        </div>
      </div>
    </article>`;
  }

  /* ---------- Dialogs ---------- */
  function dialog(html, { label } = {}) {
    const d = document.createElement('dialog');
    d.className = 'dialog';
    d.setAttribute('aria-labelledby', 'dlg-title');
    d.innerHTML = `<button type="button" class="btn btn--icon dialog__close" aria-label="Close">${icon('x')}</button>${html}`;
    document.body.appendChild(d);
    const opener = document.activeElement;
    d.addEventListener('close', () => { d.remove(); if (opener && opener.focus) opener.focus(); });
    $('.dialog__close', d).onclick = () => d.close();
    d.addEventListener('click', (e) => { if (e.target === d) d.close(); });
    d.showModal();
    return d;
  }

  const REPORT_REASONS = ['Made me feel unsafe', 'Harassment or threats', 'Fake profile', 'Inappropriate messages or photos', 'Spam or scam', 'They may be under 18', "Didn't show up or was disruptive", 'Something else'];

  /**
   * Report flow. ctx: { about: 'person'|'group'|'event', id, name, people:[...] (optional, to pick who) }
   */
  function openReport(ctx) {
    const pick = ctx.people && ctx.people.length;
    const who = pick
      ? `<fieldset class="field"><legend class="field__label">Who is this about?</legend>
          ${ctx.people.map((p, i) => `<label class="choice"><input type="radio" name="who" value="${esc(p.id)}"${i === 0 ? ' checked' : ''}><span>${esc(p.name)}</span></label>`).join('')}
          <label class="choice"><input type="radio" name="who" value="${esc(ctx.about)}"><span>The ${ctx.about === 'group' ? 'group' : 'event'} in general</span></label>
        </fieldset>` : '';
    const d = dialog(`
      <form class="report" novalidate>
        <h2 id="dlg-title">Report ${pick ? 'a Concern' : esc(ctx.name)}</h2>
        <p class="meta">Reports are private. Nobody is told who reported them.</p>
        ${who}
        <fieldset class="field"><legend class="field__label">What happened?</legend>
          ${REPORT_REASONS.map((r) => `<label class="choice"><input type="radio" name="reason" value="${esc(r)}"><span>${esc(r)}</span></label>`).join('')}
          <p class="field__error" id="reason-err" hidden>${icon('alert')}Choose what happened so we can send this to the right person.</p>
        </fieldset>
        <div class="field">
          <label class="field__label" for="rep-details">Anything else we should know? (optional)</label>
          <textarea class="textarea" id="rep-details" name="details" rows="3"></textarea>
          <p class="field__hint">Don't include passwords or bank details.</p>
        </div>
        ${pick || ctx.about === 'person' ? `<label class="choice"><input type="checkbox" name="block" checked><span id="block-label">Also block ${pick ? 'this person' : esc(ctx.name)}</span></label>` : ''}
        <div class="dialog__actions">
          <button type="button" class="btn btn--secondary" data-cancel>Cancel</button>
          <button type="submit" class="btn btn--danger">Send report</button>
        </div>
      </form>`);
    $('[data-cancel]', d).onclick = () => d.close();
    const form = $('form', d);
    if (pick) form.addEventListener('change', (e) => {
      if (e.target.name !== 'who') return;
      const p = ctx.people.find((x) => x.id === e.target.value);
      const bl = $('#block-label', d); const box = form.elements.block;
      if (p) { bl.textContent = `Also block ${p.name}`; box.disabled = false; } else { bl.textContent = 'Also block someone (choose a person above)'; box.checked = false; box.disabled = true; }
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const reason = form.elements.reason.value;
      if (!reason) { $('#reason-err', d).hidden = false; form.querySelector('input[name=reason]').focus(); return; }
      const whoId = pick ? form.elements.who.value : ctx.id;
      const person = S.person(whoId);
      const doBlock = form.elements.block && form.elements.block.checked && person && whoId !== 'group' && whoId !== 'event';
      S.report({ context: ctx.about, context_name: ctx.name || '', about: person ? person.name : ctx.name, reason, details: form.elements.details.value.trim(), blocked: doBlock ? 'yes' : 'no' });
      if (doBlock) S.block(whoId);
      form.outerHTML = `<div class="report-done">
        <h2 id="dlg-title">Thanks, We've Received Your Report</h2>
        <p>A person on the Buddy team reviews every report within 24 hours. We may contact you by email if we need more detail.</p>
        ${doBlock ? `<p>You blocked ${esc(person.name)}. They can't see your profile or join your groups.</p>` : ''}
        <div class="banner banner--warm">${icon('alert', 'banner__icon')}<p>If you are in danger right now, call 911.</p></div>
        <div class="dialog__actions"><button type="button" class="btn btn--primary" data-done>Done</button></div>
      </div>`;
      $('[data-done]', d).onclick = () => { d.close(); if (doBlock && ctx.onBlock) ctx.onBlock(whoId); };
      $('[data-done]', d).focus();
    });
  }

  function openBlock(p, onDone) {
    const d = dialog(`
      <h2 id="dlg-title">Block ${esc(p.name)}?</h2>
      <p>They won't see your profile or be placed in your groups. They won't be told you blocked them. You can unblock them from your profile.</p>
      <div class="dialog__actions"><button type="button" class="btn btn--secondary" data-cancel>Cancel</button><button type="button" class="btn btn--danger" data-ok>Block ${esc(p.name)}</button></div>`);
    $('[data-cancel]', d).onclick = () => d.close();
    $('[data-ok]', d).onclick = () => {
      S.block(p.id); d.close();
      toast(`You blocked ${p.name}.`, { label: 'Undo', run: () => { S.unblock(p.id); onDone && onDone(); } });
      onDone && onDone();
    };
  }

  /** A short profile card for someone in your group, with Report and Block. */
  function openPerson(p, { onChange } = {}) {
    const u = S.user();
    const shared = p.interests.filter((i) => u.interests.includes(i));
    const others = p.interests.filter((i) => !u.interests.includes(i));
    const d = dialog(`
      <div class="person-head">${avatar(p, 72)}<div><h2 id="dlg-title">${esc(p.name)}</h2><p class="meta">${esc(S.areaName(p.area))} · ${esc(p.stage)}</p></div></div>
      ${shared.length ? `<h4>What You Share</h4><ul class="tag-list">${shared.map((i) => `<li class="tag tag--shared">${icon('check')}<span class="visually-hidden">Shared: </span>${esc(S.catName(i))}</li>`).join('')}</ul>` : ''}
      ${others.length ? `<h4 class="mt">Also Into</h4><ul class="tag-list">${others.map((i) => `<li class="tag">${esc(S.catName(i))}</li>`).join('')}</ul>` : ''}
      ${p.sample ? '<p class="meta mt">Example member for the prototype.</p>' : ''}
      <div class="dialog__actions"><button type="button" class="btn btn--danger-secondary" data-report>${icon('flag')}Report</button><button type="button" class="btn btn--secondary" data-block>Block</button></div>`);
    $('[data-report]', d).onclick = () => { d.close(); openReport({ about: 'person', id: p.id, name: p.name, onBlock: onChange }); };
    $('[data-block]', d).onclick = () => { d.close(); openBlock(p, onChange); };
  }

  /* ---------- Chip groups ---------- */
  function chips(host, items, selected, { max, onChange } = {}) {
    host.innerHTML = items.map(([id, label]) => `<button type="button" class="chip" data-id="${esc(id)}" aria-pressed="${selected.has(id)}">${icon('check', 'chip__check')}<span>${esc(label)}</span></button>`).join('');
    host.addEventListener('click', (e) => {
      const b = e.target.closest('.chip'); if (!b) return;
      const id = b.dataset.id;
      if (selected.has(id)) selected.delete(id);
      else { if (max && selected.size >= max) return; selected.add(id); }
      b.setAttribute('aria-pressed', selected.has(id));
      onChange && onChange(selected);
    });
  }

  /* ---------- Photo resize (keeps uploads small) ---------- */
  function readPhoto(file, size = 320) {
    return new Promise((resolve, reject) => {
      if (!/^image\//.test(file.type)) return reject(new Error('type'));
      if (file.size > 10 * 1024 * 1024) return reject(new Error('size'));
      const r = new FileReader();
      r.onload = () => {
        const img = new Image();
        img.onload = () => {
          const c = document.createElement('canvas'); c.width = c.height = size;
          const s = Math.min(img.width, img.height);
          c.getContext('2d').drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, size, size);
          resolve(c.toDataURL('image/jpeg', 0.82));
        };
        img.onerror = () => reject(new Error('type'));
        img.src = r.result;
      };
      r.onerror = () => reject(new Error('type'));
      r.readAsDataURL(file);
    });
  }

  window.UI = { icon, esc, $, $$, param, fmtTime, fmtDay, fmtLong, fmtWhen, avatar, avatarStack, toast, flash, renderChrome, requireUser, eventCard, dialog, openReport, openBlock, openPerson, chips, readPhoto };
})();
