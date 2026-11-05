(function () {
  const u = UI.requireUser(); if (!u) return;
  const { renderChrome, icon, esc, $, param, fmtLong, fmtTime, fmtDay, avatar, openReport, openPerson, dialog, toast } = UI;
  renderChrome('groups');
  const g = Store.group(param('g'));
  const host = $('#chat');
  if (!g) {
    host.innerHTML = `<section class="empty page"><h1 class="empty__title">We can't find that group</h1><p class="empty__body">You may have left it, or it was made on another device.</p><a class="btn btn--primary" href="groups.html">Go to my groups</a></section>`;
    return;
  }
  document.title = `${g.eventTitle} – Buddy`;
  const place = Store.place(g.place);
  const start = new Date(g.eventStart);
  const members = () => g.memberIds.map((id) => Store.person(id)).filter((p) => p && !Store.isBlocked(p.id));

  host.innerHTML = `
    <div class="chat__head">
      <a class="btn btn--icon" href="groups.html" aria-label="Back to my groups">${icon('back')}</a>
      <div class="chat__title">
        <h1>${esc(g.eventTitle)}</h1>
        <p class="meta" id="head-meta"></p>
      </div>
      <div class="chat__tools">
        <button type="button" class="btn btn--secondary btn--sm" id="people">${icon('users')}People</button>
        <button type="button" class="btn btn--danger-secondary btn--sm" id="report">${icon('flag')}Report</button>
      </div>
    </div>
    <div>
      <section class="card plan" aria-labelledby="plan-title">
        <h2 id="plan-title">The plan</h2>
        <ul class="facts">
          <li>${icon('calendar')}<div><strong>${esc(fmtLong(start))}</strong><span class="meta">${fmtTime(start)}</span></div></li>
          <li>${icon('pin')}<div><strong>${esc(place ? place.name : '')}</strong><span class="meta">${esc(place ? place.area : '')} · public place</span></div></li>
        </ul>
        <div class="plan__actions">
          <button type="button" class="btn btn--secondary btn--sm" id="going" aria-pressed="false"></button>
          <a class="btn btn--tertiary btn--sm" href="event.html?id=${encodeURIComponent(g.eventId)}">Event details</a>
          <a class="btn btn--tertiary btn--sm" href="survey.html?g=${encodeURIComponent(g.id)}">Rate this meetup</a>
        </div>
      </section>
      <div class="banner safety-note" id="safety-note">${icon('shield', 'banner__icon')}<div><p>Meet at the place above, tell a friend where you're going, and leave whenever you like. <a href="safety.html">Safety tips</a></p></div></div>
    </div>
    <div class="thread" id="thread" role="log" aria-live="polite" aria-label="Messages"></div>
    <form class="composer" id="composer">
      <div style="flex:1;display:grid;gap:var(--space-2)">
        <div class="chips-suggest" id="suggest"></div>
        <label class="visually-hidden" for="msg">Message your group</label>
        <textarea class="textarea" id="msg" rows="1" placeholder="Message your group"></textarea>
      </div>
      <button class="btn btn--primary" type="submit" aria-label="Send">${icon('send')}<span class="send-label">Send</span></button>
    </form>`;

  function drawHead() {
    const ms = members();
    $('#head-meta').textContent = `${ms.length + 1} people${g.womenOnly ? ' · Women-only group' : ''}`;
  }
  function drawGoing() {
    const on = Store.going(g.id); const b = $('#going');
    b.setAttribute('aria-pressed', on); b.innerHTML = on ? `${icon('check')}You're going` : "I'm going";
  }
  $('#going').onclick = () => { const on = !Store.going(g.id); Store.setGoing(g.id, on); drawGoing(); if (on) { Store.addMessage(g.id, "I'm in. See you there."); draw(); } };

  function draw() {
    const msgs = Store.messages(g.id).filter((m) => !Store.isBlocked(m.from));
    let html = '', lastDay = '', lastFrom = '', lastAt = 0;
    msgs.forEach((m) => {
      const d = new Date(m.at); const day = fmtDay(d);
      if (day !== lastDay) { html += `<p class="day-sep">${esc(day)}</p>`; lastDay = day; lastFrom = ''; }
      if (m.from === 'buddy') { html += `<p class="msg-sys">${esc(m.text)}</p>`; lastFrom = 'buddy'; return; }
      const mine = m.from === 'me';
      const p = mine ? u : Store.person(m.from);
      const newRun = m.from !== lastFrom || m.at - lastAt > 5 * 60e3;
      if (!mine && newRun) html += `<div class="msg-who">${avatar(p, 32)}<button type="button" data-person="${esc(p.id)}">${esc(p.name)}</button></div>`;
      html += `<p class="bubble ${mine ? 'bubble--mine' : 'bubble--theirs'}" style="margin:0"><span class="visually-hidden">${mine ? 'You' : esc(p.name)} at ${fmtTime(d)}: </span>${esc(m.text)}</p>`;
      if (mine) html += `<span class="bubble-meta bubble-meta--mine">Sent · ${fmtTime(d)}</span>`;
      lastFrom = m.from; lastAt = m.at;
    });
    $('#thread').innerHTML = html;
    $('#thread').querySelectorAll('[data-person]').forEach((b) => b.onclick = () => openPerson(Store.person(b.dataset.person), { onChange: refresh }));
    const sentAny = msgs.some((m) => m.from === 'me');
    const sug = sentAny ? [] : [`Hi everyone, I'm ${u.name}.`, 'What time works for everyone?', "I'll be at the entrance 10 minutes early."];
    $('#suggest').innerHTML = sug.map((s) => `<button type="button" class="chip" aria-pressed="false">${esc(s)}</button>`).join('');
    $('#suggest').hidden = !sug.length;
  }
  function refresh() { drawHead(); draw(); }

  $('#suggest').addEventListener('click', (e) => { const b = e.target.closest('.chip'); if (!b) return; const t = $('#msg'); t.value = b.textContent; t.focus(); });
  const ta = $('#msg');
  ta.addEventListener('input', () => { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 152) + 'px'; });
  ta.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey && window.matchMedia('(pointer: fine)').matches) { e.preventDefault(); $('#composer').requestSubmit(); } });
  $('#composer').addEventListener('submit', (e) => {
    e.preventDefault();
    const text = ta.value.trim(); if (!text) return;
    Store.addMessage(g.id, text); ta.value = ''; ta.style.height = 'auto'; draw();
    window.scrollTo({ top: document.body.scrollHeight });
  });

  $('#people').onclick = () => {
    const ms = members();
    const d = dialog(`<h2 id="dlg-title">People in this group</h2>
      <ul class="member-list">
        <li class="you">${avatar(u, 40)}<div><strong>${esc(u.name)} (you)</strong></div></li>
        ${ms.map((p) => `<li><button type="button" data-person="${esc(p.id)}">${avatar(p, 40)}<div><strong>${esc(p.name)}</strong><p class="meta">${esc(Store.areaName(p.area))} · ${esc(p.stage)}</p></div></button></li>`).join('')}
      </ul>
      <p class="meta">Choose a person to see what you share, or to report or block them.</p>
      <div class="dialog__actions"><button type="button" class="btn btn--tertiary" data-leave>Leave group</button></div>`);
    d.querySelectorAll('[data-person]').forEach((b) => b.onclick = () => { d.close(); openPerson(Store.person(b.dataset.person), { onChange: refresh }); });
    d.querySelector('[data-leave]').onclick = () => {
      d.close();
      const c = dialog(`<h2 id="dlg-title">Leave this group?</h2><p>You'll leave this chat. You can join the event again and be placed in a new group.</p><div class="dialog__actions"><button type="button" class="btn btn--secondary" data-cancel>Cancel</button><button type="button" class="btn btn--danger" data-ok>Leave group</button></div>`);
      c.querySelector('[data-cancel]').onclick = () => c.close();
      c.querySelector('[data-ok]').onclick = () => { Store.leaveGroup(g.id); UI.flash('You left the group.'); location.href = 'groups.html'; };
    };
  };
  $('#report').onclick = () => openReport({ about: 'group', id: g.id, name: g.eventTitle, people: members(), onBlock: refresh });

  drawHead(); drawGoing(); draw();
})();
