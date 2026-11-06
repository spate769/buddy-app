(function () {
  const u = UI.requireUser(); if (!u) return;
  const { renderChrome, esc, $, avatarStack, fmtWhen, icon } = UI;
  renderChrome('groups');

  const groups = Store.groups();
  if (!groups.length) {
    $('#list').innerHTML = `<section class="empty" aria-labelledby="empty-title">
      <h2 class="empty__title" id="empty-title">You Haven't Joined a Group Yet</h2>
      <p class="empty__body">Pick an event and we'll place you in a group of 5 or 6. Your group chat will show up here.</p>
      <a class="btn btn--primary" href="events.html">Find an event</a>
    </section>`;
    return;
  }
  $('#list').innerHTML = `<ul class="group-list">${groups.map((g) => {
    const members = [u, ...g.memberIds.map((id) => Store.person(id)).filter((p) => p && !Store.isBlocked(p.id))];
    const msgs = Store.messages(g.id); const last = msgs[msgs.length - 1];
    const lastWho = last ? (last.from === 'me' ? 'You' : last.from === 'buddy' ? 'Buddy' : (Store.person(last.from) || {}).name) : '';
    const done = Store.survey(g.id);
    const place = Store.place(g.place);
    return `<li class="group-row">
      ${avatarStack(members, 3)}
      <div>
        <h2><a href="chat.html?g=${encodeURIComponent(g.id)}">${esc(g.eventTitle)}</a></h2>
        <p class="meta">${esc(fmtWhen(new Date(g.eventStart)))} · ${esc(place ? place.name : '')} · ${members.length} people</p>
        ${last ? `<p class="meta">${esc(lastWho)}: ${esc(last.text.slice(0, 80))}${last.text.length > 80 ? '…' : ''}</p>` : ''}
      </div>
      <div class="group-row__actions">
        ${done ? `<span class="tag">${icon('check')}Feedback sent</span>` : `<a class="btn btn--secondary btn--sm" href="survey.html?g=${encodeURIComponent(g.id)}">Rate your meetup</a>`}
      </div>
    </li>`;
  }).join('')}</ul>
  <p class="meta mt">After each meetup, rate it so we can make better groups. It takes under a minute.</p>`;
})();
