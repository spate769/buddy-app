(function () {
  const { renderChrome, icon, esc, $, flash } = UI;
  const u = UI.requireUser(); if (!u) return;
  renderChrome('events');

  const today = new Date(); const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const def = new Date(today.getTime() + 3 * 864e5);
  const errP = (id) => `<p class="field__error" id="${id}-err" hidden>${icon('alert')}<span></span></p>`;
  const f = $('#f');
  f.innerHTML = `
    <div class="field">
      <label class="field__label" for="title">What's the plan?</label>
      <p class="field__hint" id="title-hint">Say what you'll do. For example, "Sunday morning pickup basketball".</p>
      <input class="input" id="title" maxlength="80" aria-describedby="title-hint title-err" required>
      ${errP('title')}
    </div>
    <div class="field">
      <label class="field__label" for="cat">Activity</label>
      <select class="select" id="cat" aria-describedby="cat-err" required><option value="">Choose an activity</option>${Store.categories().map((c) => `<option value="${c.id}">${esc(c.name)}</option>`).join('')}</select>
      ${errP('cat')}
    </div>
    <div class="field">
      <label class="field__label" for="place">Where</label>
      <p class="field__hint" id="place-hint">Events are only at public places, so everyone can meet safely.</p>
      <select class="select" id="place" aria-describedby="place-hint place-err" required><option value="">Choose a public place</option>${Store.places().map((p) => `<option value="${p.id}">${esc(p.name)} · ${esc(p.area)}</option>`).join('')}</select>
      ${errP('place')}
    </div>
    <div class="filters__row" style="margin-bottom:var(--space-5)">
      <div class="field" style="max-width:none;margin:0">
        <label class="field__label" for="date">Date</label>
        <input class="input" id="date" type="date" min="${iso(today)}" value="${iso(def)}" aria-describedby="date-err" required>
      </div>
      <div class="field" style="max-width:none;margin:0">
        <label class="field__label" for="time">Start time</label>
        <input class="input" id="time" type="time" value="18:30" required>
      </div>
    </div>
    ${errP('date')}
    <fieldset class="field" style="border:0;padding:0">
      <legend class="field__label" style="margin-bottom:var(--space-2)">Group size</legend>
      <div class="seg">
        <label><input type="radio" name="size" value="5"><span>5 people</span></label>
        <label><input type="radio" name="size" value="6" checked><span>6 people</span></label>
      </div>
    </fieldset>
    <fieldset class="field" style="border:0;padding:0">
      <legend class="field__label">Who can join</legend>
      <label class="choice"><input type="radio" name="who" value="all" checked><span>Everyone 18+</span></label>
      <label class="choice"><input type="radio" name="who" value="women"${u.gender === 'woman' ? '' : ' disabled'}><span>Women only${u.gender === 'woman' ? '' : ' <small class="meta">(available to women members)</small>'}</span></label>
    </fieldset>
    <div class="field">
      <label class="field__label" for="desc">Details (optional)</label>
      <textarea class="textarea" id="desc" rows="4" maxlength="400" placeholder="What to bring, where exactly to meet, skill level"></textarea>
    </div>
    <div class="form-actions form-actions--split">
      <a class="btn btn--tertiary" href="events.html">Cancel</a>
      <button class="btn btn--primary btn--lg" type="submit">Post event</button>
    </div>`;

  function fieldError(id, msg) {
    const input = document.getElementById(id), err = document.getElementById(id + '-err');
    if (input) input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (err) { err.hidden = !msg; err.querySelector('span').textContent = msg || ''; }
  }

  f.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = $('#title').value.trim(), cat = $('#cat').value, place = $('#place').value, date = $('#date').value, time = $('#time').value;
    const start = date && time ? new Date(`${date}T${time}`) : null;
    const errs = [];
    const checks = [
      ['title', title ? '' : 'Say what the plan is'],
      ['cat', cat ? '' : 'Choose an activity'],
      ['place', place ? '' : 'Choose a public place'],
      ['date', !start ? 'Choose a date and time' : (start < new Date() ? 'Choose a time in the future' : '')]
    ];
    checks.forEach(([id, msg]) => { fieldError(id, msg); if (msg) errs.push([id, msg]); });
    const box = $('#errs');
    if (errs.length) {
      box.innerHTML = `${icon('alert', 'banner__icon')}<div><strong>Fix ${errs.length === 1 ? 'this' : 'these'} to post</strong><ul>${errs.map(([id, m]) => `<li><a href="#${id}">${esc(m)}</a></li>`).join('')}</ul></div>`;
      box.hidden = false; box.focus(); return;
    }
    const ev = Store.addEvent({ title, cat, place, start: start.toISOString(), size: Number(f.elements.size.value), womenOnly: f.elements.who.value === 'women', desc: $('#desc').value.trim() || 'Posted by a Buddy member. Details will be shared in the group chat.' });
    const full = Store.event(ev.id);
    Store.createGroup(full, BuddyMatch.formGroup(u, full, [], { size: full.size }), { size: full.size });
    flash("Event posted. You're in the first group, and others will be added as they join.");
    location.href = 'event.html?id=' + encodeURIComponent(ev.id);
  });
})();
