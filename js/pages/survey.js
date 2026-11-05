(function () {
  const u = UI.requireUser(); if (!u) return;
  const { renderChrome, icon, esc, $, param, fmtDay, openReport } = UI;
  renderChrome('groups');
  const g = Store.group(param('g'));
  const host = $('#survey');
  if (!g) { host.innerHTML = `<section class="empty"><h1 class="empty__title">We can't find that group</h1><p class="empty__body">Pick a group from your list to rate it.</p><a class="btn btn--primary" href="groups.html">Go to my groups</a></section>`; return; }
  const members = g.memberIds.map((id) => Store.person(id)).filter((p) => p && !Store.isBlocked(p.id));

  const done = Store.survey(g.id);
  if (done) return thanks(done, true);

  const radios = (name, opts) => `<div class="scale">${opts.map(([v, l, s]) => `<label><input type="radio" name="${name}" value="${esc(v)}"><span>${esc(l)}${s ? `<small>${esc(s)}</small>` : ''}</span></label>`).join('')}</div>`;
  host.innerHTML = `
    <p class="meta"><a href="chat.html?g=${encodeURIComponent(g.id)}">${esc(g.eventTitle)}</a> · ${esc(fmtDay(new Date(g.eventStart)))}</p>
    <h1>How did it go?</h1>
    <p class="lede">Five quick questions. Your answers are private and help us make better groups.</p>
    <div id="errs" class="banner banner--error error-summary" role="alert" tabindex="-1" hidden></div>
    <form class="survey" id="f" novalidate>
      <fieldset id="q1"><legend><span class="q-num">1 of 5</span>How was the meetup overall?</legend>
        ${radios('rating', [['1', '1', 'Poor'], ['2', '2'], ['3', '3', 'Okay'], ['4', '4'], ['5', '5', 'Great']])}
      </fieldset>
      <fieldset id="q2"><legend><span class="q-num">2 of 5</span>Would you hang out with this group again?</legend>
        ${radios('meet_again', [['Yes', 'Yes'], ['Maybe', 'Maybe'], ['No', 'No']])}
      </fieldset>
      <fieldset id="q3"><legend><span class="q-num">3 of 5</span>How well did the group fit you?</legend>
        ${radios('group_fit', [['Very well', 'Very well'], ['Okay', 'Okay'], ['Not well', 'Not well']])}
      </fieldset>
      <fieldset id="q4"><legend><span class="q-num">4 of 5</span>Did you feel safe and respected?</legend>
        ${radios('felt_safe', [['Yes', 'Yes'], ['Mostly', 'Mostly'], ['No', 'No']])}
        <div class="banner banner--warm mt" id="safe-help" hidden>${icon('shield', 'banner__icon')}<div><p>Thanks for telling us. If something happened, you can report it privately. Nobody is told who reported them.</p><button type="button" class="btn btn--danger-secondary btn--sm" id="report">${icon('flag')}Report a concern</button></div></div>
      </fieldset>
      <fieldset id="q5"><legend><span class="q-num">5 of 5</span>Anything else we should know? (optional)</legend>
        <label class="visually-hidden" for="comments">Comments</label>
        <textarea class="textarea" id="comments" name="comments" rows="4" placeholder="What worked, what didn't, any concerns"></textarea>
      </fieldset>
      <button class="btn btn--primary btn--lg" type="submit">Send feedback</button>
    </form>`;

  const f = $('#f');
  f.addEventListener('change', (e) => { if (e.target.name === 'felt_safe') $('#safe-help').hidden = e.target.value === 'Yes'; });
  $('#report').onclick = () => openReport({ about: 'group', id: g.id, name: g.eventTitle, people: members });
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = (n) => (f.elements[n].value || '');
    const missing = [['q1', 'rating', 'Rate the meetup from 1 to 5'], ['q2', 'meet_again', 'Say whether you would meet this group again'], ['q3', 'group_fit', 'Say how well the group fit you'], ['q4', 'felt_safe', 'Say whether you felt safe and respected']].filter(([, n]) => !val(n));
    const box = $('#errs');
    if (missing.length) {
      box.innerHTML = `${icon('alert', 'banner__icon')}<div><strong>Answer ${missing.length === 1 ? 'this question' : 'these questions'} to send</strong><ul>${missing.map(([id, , m]) => `<li><a href="#${id}">${esc(m)}</a></li>`).join('')}</ul></div>`;
      box.hidden = false; box.focus(); return;
    }
    const answers = { rating: val('rating'), meet_again: val('meet_again'), group_fit: val('group_fit'), felt_safe: val('felt_safe'), comments: $('#comments').value.trim() };
    Store.saveSurvey(g.id, answers);
    if (answers.meet_again === 'Yes') {
      Store._mutate((a) => { (a.messages[g.id] = a.messages[g.id] || []).push({ from: 'buddy', text: `${u.name} would like to meet this group again. Suggest a next plan here.`, at: Date.now() }); });
    }
    thanks(answers);
  });

  function thanks(a, already) {
    host.innerHTML = `
      <div class="banner banner--success" style="margin-bottom:var(--space-5)">${icon('check', 'banner__icon')}<div><strong>${already ? 'You already sent feedback for this meetup.' : 'Thanks. Your feedback was sent.'}</strong></div></div>
      <h1>${a.meet_again === 'Yes' ? 'Glad it went well.' : 'Thanks for telling us.'}</h1>
      <p class="lede">${a.meet_again === 'Yes' ? "We let your group know you'd like to meet again. Suggest a next plan in the group chat." : "We'll use this to make better groups for you next time."}</p>
      <div class="form-actions">
        ${a.meet_again === 'Yes' ? `<a class="btn btn--primary" href="chat.html?g=${encodeURIComponent(g.id)}">Plan the next one</a><a class="btn btn--secondary" href="events.html">Find another event</a>` : `<a class="btn btn--primary" href="events.html">Find another event</a><a class="btn btn--secondary" href="groups.html">Back to my groups</a>`}
      </div>`;
    host.querySelector('h1').setAttribute('tabindex', '-1'); host.querySelector('h1').focus();
  }
})();
