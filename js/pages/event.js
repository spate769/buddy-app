(function () {
  const { renderChrome, icon, esc, $, param, fmtLong, fmtTime, avatar, avatarStack, openReport, openPerson, toast } = UI;
  renderChrome('events');
  const ev = Store.event(param('id'));
  const host = $('#detail');
  if (!ev) {
    host.innerHTML = `<section class="empty"><h1 class="empty__title">We can't find that event</h1><p class="empty__body">It may have already happened, or the link might be wrong.</p><a class="btn btn--primary" href="events.html">See all events</a></section>`;
    return;
  }
  document.title = `${ev.title} – Buddy`;
  const u = Store.user();
  const place = Store.place(ev.place);
  const people = Store.attendees(ev);
  const ages = people.map((p) => p.age);
  const score = u ? BuddyMatch.eventScore(u, ev, people) : null;

  const groupsCount = Math.max(1, Math.ceil((people.length + 1) / ev.size));
  host.innerHTML = `
    <div class="detail">
      <div>
        <ul class="tag-list"><li class="tag">${esc(Store.catName(ev.cat))}</li>${ev.womenOnly ? '<li class="tag tag--warm">Women only</li>' : ''}${ev.posted ? `<li class="tag">Posted by ${esc(ev.host)}</li>` : ''}</ul>
        <h1>${esc(ev.title)}</h1>
        <ul class="facts">
          <li>${icon('calendar')}<div><strong>${esc(fmtLong(ev.startDate))}</strong><span class="meta">${fmtTime(ev.startDate)}</span></div></li>
          <li>${icon('pin')}<div><strong>${esc(place.name)}</strong><span class="meta">${esc(place.area)}${u ? ` · ${BuddyMatch.distanceLabel(BuddyMatch.km(BuddyMatch.area(u.area), place))}` : ''}</span></div></li>
          <li>${icon('users')}<div><strong>Groups of ${ev.size}</strong><span class="meta">${people.length ? `${people.length} going so far${ages.length ? `, ages ${Math.min(...ages)} to ${Math.max(...ages)}` : ''}. ${groupsCount > 1 ? `They'll be split into ${groupsCount} groups.` : ''}` : 'Be the first to join. Others are placed in your group as they sign up.'}</span></div></li>
        </ul>
        <p class="long prose">${esc(ev.desc)}</p>
        ${people.length ? `<h2 class="mt" style="font-size:var(--text-h3)">Who's Going</h2><p class="going meta">${avatarStack(people, 6)}<span>${people.map((p) => esc(p.name)).slice(0, 4).join(', ')}${people.length > 4 ? ` and ${people.length - 4} more` : ''}</span></p><p class="meta">Example members for the prototype. You'll see your own group's profiles after you join.</p>` : ''}
        <div class="mini-map" id="mini-map" aria-label="Map showing ${esc(place.name)}"></div>
        <p class="mt"><button type="button" class="btn btn--danger-secondary btn--sm" id="report-ev">${icon('flag')}Report this event</button></p>
      </div>
      <aside class="join-panel" id="panel" aria-labelledby="panel-title"></aside>
    </div>`;

  if (window.L) {
    const m = L.map('mini-map', { scrollWheelZoom: false, zoomControl: false, dragging: !L.Browser.mobile }).setView([place.lat, place.lng], 15);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { subdomains: 'abcd', maxZoom: 19, attribution: '&copy; OpenStreetMap &copy; CARTO' }).addTo(m);
    L.marker([place.lat, place.lng], { icon: L.divIcon({ className: '', iconSize: [34, 34], iconAnchor: [17, 34], html: `<span class="pin${ev.womenOnly ? ' pin--warm' : ''}"><span>${icon('pin').replace('class="ico ', 'style="width:16px;height:16px" class="ico ')}</span></span>` }), title: place.name }).addTo(m);
  }
  $('#report-ev').onclick = () => {
    if (!u) { location.href = 'login.html?next=' + encodeURIComponent('event.html?id=' + ev.id); return; }
    openReport({ about: 'event', id: ev.id, name: 'this event' });
  };

  const panel = $('#panel');
  const rowFor = (name, value, text) => `<li><span class="why__name">${name}</span><span class="meter" aria-hidden="true"><span style="width:${Math.round(value * 100)}%"></span></span><span class="meta">${text}</span></li>`;

  function renderPanel() {
    if (!u) {
      panel.innerHTML = `<h2 id="panel-title">Join a Group for This Event</h2>
        <p>Create a profile and we'll place you with ${ev.size - 1} people who fit you best, by distance, age and interests.</p>
        <a class="btn btn--primary btn--lg btn--block" href="signup.html">Create your profile</a>
        <p class="mt meta">Already have one? <a href="login.html?next=${encodeURIComponent('event.html?id=' + ev.id)}">Log in</a></p>`;
      return;
    }
    const g = Store.groupForEvent(ev.id);
    if (g) return renderJoined(g);
    if (!score.eligible) {
      panel.innerHTML = `<h2 id="panel-title">This Is a Women-Only Group</h2>
        <p>Women-only events are open to people who identify as women. You can update your gender on your profile if it isn't right.</p>
        <a class="btn btn--primary btn--block" href="events.html">Find another event</a>
        <p class="mt"><a href="profile.html">Edit profile</a></p>`;
      return;
    }
    const p = score.parts;
    const shared = ev.cat && u.interests.includes(ev.cat);
    panel.innerHTML = `
      <h2 id="panel-title">Join a Group</h2>
      <p class="fit" style="margin-bottom:var(--space-4)"><span class="fit__label">${BuddyMatch.fitLabel(score.percent)} for you</span><span class="meter" aria-hidden="true"><span style="width:${score.percent}%"></span></span><span class="meta tabular">${score.percent}%</span></p>
      <ul class="why" aria-label="Why this fits you">
        ${rowFor('Distance', p.geo, `${BuddyMatch.distanceLabel(score.distance)} from ${esc(Store.areaName(u.area))}`)}
        ${rowFor('Age', p.age, score.ageRange ? `People going are ${score.ageRange[0]} to ${score.ageRange[1]}` : 'No one has joined yet')}
        ${rowFor('Interests', p.interest, shared ? `You picked ${esc(Store.catName(ev.cat)).toLowerCase()}` : `Not one of your picks, but people going share some interests`)}
        ${rowFor('Life stage', p.demo, score.sameStage ? `${score.sameStage} ${score.sameStage === 1 ? 'person is' : 'people are'} also "${esc(u.stage)}"` : 'A mix of life stages')}
      </ul>
      <form id="join" novalidate>
        <fieldset class="field" style="border:0;padding:0;margin-bottom:var(--space-4)">
          <legend class="field__label" style="margin-bottom:var(--space-2)">Group size</legend>
          <div class="seg">
            <label><input type="radio" name="size" value="5"${ev.size === 5 ? ' checked' : ''}><span>5 people</span></label>
            <label><input type="radio" name="size" value="6"${ev.size !== 5 ? ' checked' : ''}><span>6 people</span></label>
          </div>
        </fieldset>
        <fieldset style="border:0;padding:0">
          <legend class="field__label">Match me with people who are</legend>
          <div class="toggle-list">
            <label class="choice"><input type="checkbox" name="similarInterests" checked><span>Into the same things</span></label>
            <label class="choice"><input type="checkbox" name="similarAge" checked><span>Close to my age</span></label>
            <label class="choice"><input type="checkbox" name="sameStage"><span>At the same life stage<small>${esc(u.stage)}</small></span></label>
            ${ev.womenOnly ? `<p class="meta">${icon('check')} Everyone in this group is a woman.</p>` : (u.gender === 'woman' ? `<label class="choice"><input type="checkbox" name="womenOnly"><span>Women only</span></label>` : '')}
          </div>
        </fieldset>
        <button class="btn btn--primary btn--lg btn--block" type="submit">Join a group</button>
        <p class="meta mt">A group chat opens as soon as you're placed. You can leave any time.</p>
      </form>`;
    $('#join').addEventListener('submit', onJoin);
  }

  function onJoin(e) {
    e.preventDefault();
    const fm = e.target;
    const prefs = { size: Number(fm.elements.size.value), similarInterests: fm.elements.similarInterests.checked, similarAge: fm.elements.similarAge.checked, sameStage: fm.elements.sameStage.checked, womenOnly: !!(fm.elements.womenOnly && fm.elements.womenOnly.checked) };
    const steps = ['Checking who lives nearby', 'Grouping people close to your age', 'Matching shared interests', 'Opening your group chat'];
    panel.innerHTML = `<h2 id="panel-title">Finding Your Group</h2><div class="matching" role="status" aria-live="polite"><ol>${steps.map((s, i) => `<li data-i="${i}">${icon('check')}<span>${s}</span></li>`).join('')}</ol></div>`;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lis = panel.querySelectorAll('.matching li');
    let i = 0;
    const tick = () => {
      if (i < lis.length) { lis[i].classList.add('done'); i++; setTimeout(tick, reduce ? 0 : 380); return; }
      const result = BuddyMatch.formGroup(u, ev, people, prefs);
      const g = Store.createGroup(ev, result, prefs);
      toast(`You joined a ${Store.catName(ev.cat).toLowerCase()} group.`);
      renderJoined(g, true);
    };
    setTimeout(tick, reduce ? 0 : 250);
  }

  function renderJoined(g, fresh) {
    const members = g.memberIds.map((id) => Store.person(id)).filter(Boolean).filter((p) => !Store.isBlocked(p.id));
    const r = g.reasons;
    panel.innerHTML = `
      <div class="banner banner--success" style="margin-bottom:var(--space-4)">${icon('check', 'banner__icon')}<div><strong>You're in. Your group chat is ready.</strong><p>${members.length ? `You're with ${members.length} ${members.length === 1 ? 'person' : 'people'}.` : "You're the first one here. People who join next are added to your group."}</p></div></div>
      <h2 id="panel-title">Your Group</h2>
      <ul class="member-list">
        <li class="you">${avatar(u, 40)}<div><strong>${esc(u.name)} (you)</strong></div></li>
        ${members.map((p) => `<li><button type="button" data-person="${esc(p.id)}">${avatar(p, 40)}<div><strong>${esc(p.name)}</strong><p class="meta">${esc(Store.areaName(p.area))} · ${esc(p.stage)}</p></div></button></li>`).join('')}
      </ul>
      ${members.length ? `<ul class="reasons" style="margin-bottom:var(--space-5)">
        <li>${icon('check')}<span>Ages ${r.ageRange[0]} to ${r.ageRange[1]}</span></li>
        <li>${icon('check')}<span>On average ${BuddyMatch.distanceLabel(r.avgKm).replace(' away', '')} from you</span></li>
        ${r.sharedInterests.length ? `<li>${icon('check')}<span>Shared interests: ${r.sharedInterests.map(Store.catName).join(', ')}</span></li>` : ''}
        ${g.womenOnly ? `<li>${icon('check')}<span>Women-only group</span></li>` : ''}
      </ul>` : ''}
      <a class="btn btn--primary btn--lg btn--block" href="chat.html?g=${encodeURIComponent(g.id)}">Open group chat</a>
      <p class="mt"><button type="button" class="btn btn--tertiary btn--sm" id="leave">Leave this group</button></p>`;
    panel.querySelectorAll('[data-person]').forEach((b) => b.onclick = () => openPerson(Store.person(b.dataset.person), { onChange: () => renderJoined(Store.group(g.id)) }));
    $('#leave').onclick = () => {
      const d = UI.dialog(`<h2 id="dlg-title">Leave This Group?</h2><p>You'll leave the group chat. You can join the event again and be placed in a new group.</p><div class="dialog__actions"><button type="button" class="btn btn--secondary" data-cancel>Cancel</button><button type="button" class="btn btn--danger" data-ok>Leave group</button></div>`);
      d.querySelector('[data-cancel]').onclick = () => d.close();
      d.querySelector('[data-ok]').onclick = () => { Store.leaveGroup(g.id); d.close(); toast('You left the group.'); renderPanel(); };
    };
    if (fresh) { const h = panel.querySelector('.banner strong'); h.setAttribute('tabindex', '-1'); h.focus(); }
  }

  renderPanel();
})();
