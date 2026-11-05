(function () {
  const user = UI.requireUser(); if (!user) return;
  const { renderChrome, icon, esc, $, avatar, chips, readPhoto, dialog, toast, flash } = UI;
  renderChrome('you');
  const host = $('#profile');
  const genderName = { woman: 'Woman', man: 'Man', 'non-binary': 'Non-binary', self: 'Self-described', '': 'Not shared' };

  function view() {
    const u = Store.user();
    const blocked = Store.blocked().map((id) => Store.person(id)).filter(Boolean);
    host.innerHTML = `
      <div class="banner" style="margin-bottom:var(--space-6)">${icon('info', 'banner__icon')}<p>This is how people in your groups see you.${u.demo ? ' You are using the demo profile.' : ''}</p></div>
      <div class="profile-head">
        ${avatar(u, 128, { alt: '' })}
        <div>
          <h1>${esc(u.name)}</h1>
          <p class="meta">${esc(Store.areaName(u.area))} · ${esc(u.stage)}</p>
          ${u.social ? `<p><a href="${esc(u.social)}" rel="noopener" target="_blank">${icon('link').replace('class="ico ', 'style="display:inline;vertical-align:-4px;width:18px;height:18px" class="ico ')} ${esc(u.social.replace(/^https?:\/\//, ''))}<span class="visually-hidden"> (opens in new tab)</span></a></p>` : ''}
          <ul class="tag-list">${u.interests.map((i) => `<li class="tag">${esc(Store.catName(i))}</li>`).join('')}</ul>
          <p class="mt" style="margin-bottom:0"><button type="button" class="btn btn--secondary" id="edit">Edit profile</button></p>
        </div>
      </div>
      <div class="profile-grid">
        <section class="card" aria-labelledby="private-title">
          <h2 id="private-title">Only you can see these</h2>
          <dl class="kv">
            <dt>Email</dt><dd>${esc(u.email)}</dd>
            <dt>Age</dt><dd>${esc(u.age)} <span class="meta">(used to group you with people around your age)</span></dd>
            <dt>Gender</dt><dd>${esc(genderName[u.gender || ''] || 'Not shared')} <span class="meta">(only for women-only groups)</span></dd>
          </dl>
        </section>
        <section class="card" id="safety" aria-labelledby="safety-title">
          <h2 id="safety-title">Safety</h2>
          <p>Report or block someone from any group chat. Reports are private and reviewed within 24 hours.</p>
          <h4>Blocked people</h4>
          ${blocked.length ? `<ul class="member-list">${blocked.map((p) => `<li class="you">${avatar(p, 32)}<span style="flex:1">${esc(p.name)}</span><button type="button" class="btn btn--tertiary btn--sm" data-unblock="${esc(p.id)}">Unblock</button></li>`).join('')}</ul>` : '<p class="meta">You haven\'t blocked anyone.</p>'}
          <p><a href="safety.html">Read our safety guide</a></p>
        </section>
        <section class="card" aria-labelledby="acct-title">
          <h2 id="acct-title">Account</h2>
          <div class="form-actions" style="margin:0">
            <button type="button" class="btn btn--secondary" id="logout">${icon('door')}Log out</button>
            <button type="button" class="btn btn--danger-secondary" id="delete">Delete my profile</button>
          </div>
        </section>
      </div>`;
    $('#edit').onclick = edit;
    $('#logout').onclick = () => { Store.logOut(); flash('You logged out.'); location.href = 'index.html'; };
    $('#delete').onclick = () => {
      const d = dialog(`<h2 id="dlg-title">Delete your profile?</h2><p>Your profile, groups and messages are removed from this device right away. This can't be undone.</p><div class="dialog__actions"><button type="button" class="btn btn--secondary" data-cancel>Cancel</button><button type="button" class="btn btn--danger" data-ok>Delete my profile</button></div>`);
      d.querySelector('[data-cancel]').onclick = () => d.close();
      d.querySelector('[data-ok]').onclick = () => { Store.deleteAccount(); flash('Your profile was deleted.'); location.href = 'index.html'; };
    };
    host.querySelectorAll('[data-unblock]').forEach((b) => b.onclick = () => { Store.unblock(b.dataset.unblock); toast('Unblocked.'); view(); });
    if (location.hash === '#safety') $('#safety').scrollIntoView();
  }

  function edit() {
    const u = Store.user();
    let photo = u.photo || '';
    const picked = new Set(u.interests);
    const opt = (v, l, sel) => `<option value="${esc(v)}"${sel === v ? ' selected' : ''}>${esc(l)}</option>`;
    host.innerHTML = `
      <div class="container-narrow" style="padding:0;margin:0">
        <h1>Edit profile</h1>
        <div id="errs" class="banner banner--error error-summary" role="alert" tabindex="-1" hidden></div>
        <form id="f" novalidate>
          <div class="field"><label class="field__label" for="name">First name</label><input class="input" id="name" autocomplete="given-name" value="${esc(u.name)}"></div>
          <fieldset class="identity"><legend class="field__label">Your photo or social link</legend>
            <div class="photo-pick">
              <span id="photo-preview">${avatar({ name: u.name, photo }, 96)}</span>
              <div class="stack-sm">
                <label class="btn btn--secondary" for="photo">${icon('upload')}<span>${photo ? 'Change photo' : 'Upload a photo'}</span></label>
                <input type="file" id="photo" accept="image/jpeg,image/png,image/webp">
                <button type="button" class="btn btn--tertiary btn--sm" id="photo-remove"${photo ? '' : ' hidden'}>Remove photo</button>
              </div>
            </div>
            <div class="or">or</div>
            <div class="field" style="margin:0"><label class="field__label" for="social">Social link</label><input class="input" id="social" type="url" inputmode="url" value="${esc(u.social || '')}" placeholder="e.g. instagram.com/yourname"></div>
          </fieldset>
          <fieldset class="field" style="border:0;padding:0"><legend class="field__label" style="margin-bottom:var(--space-2)">Interests (at least 3)</legend><div class="chip-row" id="interests"></div></fieldset>
          <div class="field"><label class="field__label" for="area">Area</label><select class="select" id="area">${Store.areas().map((a) => opt(a.id, a.name, u.area)).join('')}</select></div>
          <div class="field"><label class="field__label" for="age">Age</label><input class="input" id="age" type="number" min="18" max="100" style="max-width:10rem" value="${esc(u.age)}"></div>
          <div class="field"><label class="field__label" for="stage">Life stage</label><select class="select" id="stage">${Store.lifeStages().map((s) => opt(s, s, u.stage)).join('')}</select></div>
          <div class="field"><label class="field__label" for="gender">Gender (optional)</label><p class="field__hint">Only used for women-only groups.</p><select class="select" id="gender">${opt('', 'Prefer not to say', u.gender || '')}${opt('woman', 'Woman', u.gender)}${opt('man', 'Man', u.gender)}${opt('non-binary', 'Non-binary', u.gender)}${opt('self', 'Prefer to self-describe', u.gender)}</select></div>
          <div class="form-actions form-actions--split"><button type="button" class="btn btn--tertiary" id="cancel">Cancel</button><button type="submit" class="btn btn--primary btn--lg">Save changes</button></div>
        </form>
      </div>`;
    chips($('#interests'), Store.categories().map((c) => [c.id, c.name]), picked);
    $('#cancel').onclick = view;
    $('#photo').onchange = async (e) => {
      const file = e.target.files[0]; if (!file) return;
      try { photo = await readPhoto(file); $('#photo-preview').innerHTML = avatar({ name: u.name, photo }, 96, { alt: 'Your photo' }); $('#photo-remove').hidden = false; }
      catch (err) { toast(err.message === 'size' ? 'That photo is over 10 MB. Choose a smaller one.' : 'Use a JPG, PNG or WebP photo.'); }
    };
    $('#photo-remove').onclick = () => { photo = ''; $('#photo-preview').innerHTML = avatar({ name: u.name }, 96); $('#photo-remove').hidden = true; };
    $('#f').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = $('#name').value.trim(); let social = $('#social').value.trim(); const age = Number($('#age').value);
      if (social && !/^https?:\/\//i.test(social)) social = 'https://' + social;
      const errs = [];
      if (!name) errs.push(['name', 'Enter your first name']);
      if (!photo && !social) errs.push(['photo', 'Keep a photo or a social link so your group knows who they are meeting']);
      if (picked.size < 3) errs.push(['interests', 'Pick at least 3 interests']);
      if (!age || age < 18 || age > 100) errs.push(['age', 'Enter an age of 18 or older']);
      const box = $('#errs');
      if (errs.length) { box.innerHTML = `${icon('alert', 'banner__icon')}<div><strong>Fix ${errs.length === 1 ? 'this' : 'these'} to save</strong><ul>${errs.map(([id, m]) => `<li><a href="#${id}">${esc(m)}</a></li>`).join('')}</ul></div>`; box.hidden = false; box.focus(); return; }
      Store.updateProfile({ name, photo, social, interests: [...picked], area: $('#area').value, age, stage: $('#stage').value, gender: $('#gender').value });
      flash('Changes saved');
      location.reload();
    });
  }
  view();
})();
