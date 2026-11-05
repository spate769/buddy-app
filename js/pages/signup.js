(function () {
  const { renderChrome, icon, esc, $, param, chips, readPhoto, avatar, flash } = UI;
  renderChrome('signup');

  const STEPS = ['Account', 'Photo', 'Interests', 'About you'];
  let step = 1;
  const existing = Store.user();
  if (existing && existing.complete) { location.replace('events.html'); return; }
  if (existing) step = Math.max(2, Number(param('step')) || 2);

  const host = $('#step');

  function setProgress() {
    $('#progress-text').textContent = `Step ${step} of 4 · ${STEPS[step - 1]}`;
    $('#progress-bar').style.width = `${step * 25}%`;
  }
  function errorSummary(errors) {
    const box = $('#errs');
    if (!errors.length) { box.hidden = true; return false; }
    box.innerHTML = `${icon('alert', 'banner__icon')}<div><strong>Fix ${errors.length === 1 ? 'this' : 'these'} to continue</strong><ul>${errors.map(([id, msg]) => `<li><a href="#${id}">${esc(msg)}</a></li>`).join('')}</ul></div>`;
    box.hidden = false; box.focus();
    return true;
  }
  function fieldError(id, msg) {
    const input = document.getElementById(id); const err = document.getElementById(id + '-err');
    if (input) { input.setAttribute('aria-invalid', msg ? 'true' : 'false'); }
    if (err) { err.hidden = !msg; err.querySelector('span').textContent = msg || ''; }
  }
  const errP = (id) => `<p class="field__error" id="${id}-err" hidden>${icon('alert')}<span></span></p>`;
  const go = (n) => { step = n; render(); window.scrollTo(0, 0); };

  function render() {
    setProgress();
    if (step === 1) return renderAccount();
    if (step === 2) return renderIdentity();
    if (step === 3) return renderInterests();
    return renderAbout();
  }

  /* Step 1 · Account */
  function renderAccount() {
    host.innerHTML = `
      <h1>Create Your Profile</h1>
      <p class="lede">It takes about a minute. Buddy is free.</p>
      <div id="errs" class="banner banner--error error-summary" role="alert" tabindex="-1" hidden></div>
      <form id="f" novalidate>
        <div class="field">
          <label class="field__label" for="email">Email</label>
          <input class="input" id="email" type="email" autocomplete="email" inputmode="email" aria-describedby="email-err" required>
          ${errP('email')}
        </div>
        <div class="field">
          <label class="field__label" for="password">Password</label>
          <p class="field__hint" id="pw-hint">At least 12 characters. A short phrase is easy to remember.</p>
          <div class="pw">
            <input class="input" id="password" type="password" autocomplete="new-password" aria-describedby="pw-hint password-err" required>
            <button type="button" class="btn btn--tertiary btn--sm pw__toggle" aria-controls="password" aria-pressed="false">Show</button>
          </div>
          <ul class="checklist" aria-live="polite"><li id="pw-len">${icon('check')}<span>12 or more characters</span></li></ul>
          ${errP('password')}
        </div>
        <label class="choice"><input type="checkbox" id="adult" aria-describedby="adult-err"><span>I'm 18 or older</span></label>
        ${errP('adult')}
        <p class="meta mt">By creating a profile, you agree to our <a href="safety.html#guidelines">Community guidelines</a> and <a href="safety.html#privacy">Privacy policy</a>.</p>
        <button class="btn btn--primary btn--lg btn--block" type="submit">Continue</button>
      </form>
      <p class="mt">Already have a profile? <a href="login.html">Log in</a></p>
      <div class="demo-box">
        <p><strong>Reviewing the prototype?</strong></p>
        <p class="meta">Skip sign-up and use a ready-made profile.</p>
        <button type="button" class="btn btn--secondary" id="demo">Use the demo profile</button>
      </div>`;
    const pw = $('#password');
    pw.addEventListener('input', () => $('#pw-len').classList.toggle('ok', pw.value.length >= 12));
    $('.pw__toggle').onclick = (e) => { const show = pw.type === 'password'; pw.type = show ? 'text' : 'password'; e.currentTarget.textContent = show ? 'Hide' : 'Show'; e.currentTarget.setAttribute('aria-pressed', show); };
    $('#demo').onclick = () => { Store.useDemo(); flash('You are using the demo profile. Your group chat is ready.'); location.href = 'groups.html'; };
    $('#email').addEventListener('blur', (e) => { if (e.target.value) fieldError('email', /^\S+@\S+\.\S+$/.test(e.target.value.trim()) ? '' : 'Enter an email address like name@example.com'); });
    $('#f').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = $('#email').value.trim(); const errs = [];
      const eMsg = /^\S+@\S+\.\S+$/.test(email) ? '' : 'Enter an email address like name@example.com';
      const pMsg = pw.value.length >= 12 ? '' : 'Use at least 12 characters for your password';
      const aMsg = $('#adult').checked ? '' : 'Buddy is for adults. Confirm you are 18 or older.';
      fieldError('email', eMsg); fieldError('password', pMsg); fieldError('adult', aMsg);
      if (eMsg) errs.push(['email', eMsg]); if (pMsg) errs.push(['password', pMsg]); if (aMsg) errs.push(['adult', aMsg]);
      if (errorSummary(errs)) return;
      try {
        await Store.signUp({ email, name: '', interests: [], adult: true }, pw.value);
        go(2);
      } catch (err) {
        fieldError('email', 'That email already has a profile. Log in instead?');
        errorSummary([['email', 'That email already has a profile. Log in instead?']]);
      }
    });
  }

  /* Step 2 · Name, photo or social link */
  function renderIdentity() {
    const u = Store.user();
    let photo = u.photo || '';
    host.innerHTML = `
      <h1>Add Your Photo</h1>
      <p class="lede">A clear photo of your face helps your group recognize you when you meet.</p>
      <div id="errs" class="banner banner--error error-summary" role="alert" tabindex="-1" hidden></div>
      <form id="f" novalidate>
        <div class="field">
          <label class="field__label" for="name">First name</label>
          <p class="field__hint" id="name-hint">This is how you'll appear to others. First name is fine.</p>
          <input class="input" id="name" autocomplete="given-name" value="${esc(u.name)}" aria-describedby="name-hint name-err" required>
          ${errP('name')}
        </div>
        <fieldset class="identity" aria-describedby="id-err">
          <legend class="field__label">Profile photo</legend>
          <div class="photo-pick">
            <span id="photo-preview">${avatar({ name: u.name || '?', photo }, 96)}</span>
            <div class="stack-sm">
              <label class="btn btn--secondary" for="photo">${icon('upload')}<span id="photo-label">${photo ? 'Change photo' : 'Upload a photo'}</span></label>
              <input type="file" id="photo" accept="image/jpeg,image/png,image/webp,image/heic">
              <p class="field__hint">A clear photo of your face. JPG, PNG or WebP.</p>
              <button type="button" class="btn btn--tertiary btn--sm" id="photo-remove"${photo ? '' : ' hidden'}>Remove photo</button>
            </div>
          </div>
          <div class="field" style="margin:var(--space-5) 0 0">
            <label class="field__label" for="social">Social link (optional)</label>
            <p class="field__hint" id="social-hint">Instagram, LinkedIn, Facebook or TikTok. Your group can see it.</p>
            <input class="input" id="social" type="url" inputmode="url" placeholder="e.g. instagram.com/yourname" value="${esc(u.social || '')}" aria-describedby="social-hint">
          </div>
          ${errP('id')}
        </fieldset>
        <div class="form-actions">
          <button class="btn btn--primary btn--lg" type="submit">Continue</button>
        </div>
      </form>`;
    $('#photo').addEventListener('change', async (e) => {
      const file = e.target.files[0]; if (!file) return;
      try {
        photo = await readPhoto(file);
        $('#photo-preview').innerHTML = avatar({ name: $('#name').value, photo }, 96, { alt: 'Your photo' });
        $('#photo-label').textContent = 'Change photo'; $('#photo-remove').hidden = false; fieldError('id', '');
      } catch (err) {
        fieldError('id', err.message === 'size' ? 'That photo is over 10 MB. Choose a smaller one or crop it.' : 'Use a JPG, PNG or WebP photo.');
      }
    });
    $('#photo-remove').onclick = () => { photo = ''; $('#photo-preview').innerHTML = avatar({ name: $('#name').value || '?' }, 96); $('#photo-label').textContent = 'Upload a photo'; $('#photo-remove').hidden = true; };
    $('#f').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = $('#name').value.trim(); let social = $('#social').value.trim(); const errs = [];
      if (social && !/^https?:\/\//i.test(social)) social = 'https://' + social;
      const nMsg = name ? '' : 'Enter your first name';
      const sValid = !social || /^https?:\/\/[^\s.]+\.[^\s]+/i.test(social);
      const iMsg = !photo ? 'Add a photo of your face so your group can recognize you' : (!sValid ? 'Enter a full link like instagram.com/yourname' : '');
      fieldError('name', nMsg); fieldError('id', iMsg);
      if (nMsg) errs.push(['name', nMsg]); if (iMsg) errs.push([photo ? 'social' : 'photo', iMsg]);
      if (errorSummary(errs)) return;
      Store.updateProfile({ name, photo, social });
      go(3);
    });
  }

  /* Step 3 · Interests */
  function renderInterests() {
    const u = Store.user();
    const picked = new Set(u.interests || []);
    host.innerHTML = `
      <h1>What Do You Like Doing?</h1>
      <p class="lede">Pick at least 3. We use these to suggest events and to match your group.</p>
      <div id="errs" class="banner banner--error error-summary" role="alert" tabindex="-1" hidden></div>
      <form id="f" novalidate>
        <fieldset class="field" style="border:0;padding:0" aria-describedby="int-count">
          <legend class="visually-hidden">Interests</legend>
          <div class="chip-row" id="interests"></div>
          <p class="meta" id="int-count" aria-live="polite"></p>
        </fieldset>
        <div class="form-actions form-actions--split">
          <button type="button" class="btn btn--tertiary" id="back">Back</button>
          <button class="btn btn--primary btn--lg" type="submit" id="next">Continue</button>
        </div>
      </form>`;
    const update = () => {
      const n = picked.size;
      $('#int-count').textContent = `${n} selected${n < 3 ? ` · pick ${3 - n} more` : ''}`;
      $('#next').textContent = n < 3 ? `Continue · pick ${3 - n} more` : 'Continue';
    };
    chips($('#interests'), Store.categories().map((c) => [c.id, c.name]), picked, { onChange: update });
    update();
    $('#back').onclick = () => { Store.updateProfile({ interests: [...picked] }); go(2); };
    $('#f').addEventListener('submit', (e) => {
      e.preventDefault();
      if (picked.size < 3) { errorSummary([['interests', `Pick ${3 - picked.size} more so we can match you well`]]); return; }
      Store.updateProfile({ interests: [...picked] });
      go(4);
    });
  }

  /* Step 4 · Area, age, life stage, gender */
  function renderAbout() {
    const u = Store.user();
    const opt = (v, l, sel) => `<option value="${esc(v)}"${sel === v ? ' selected' : ''}>${esc(l)}</option>`;
    host.innerHTML = `
      <h1>A Little About You</h1>
      <p class="lede">This helps us put you with people you'll get on with.</p>
      <div id="errs" class="banner banner--error error-summary" role="alert" tabindex="-1" hidden></div>
      <form id="f" novalidate>
        <div class="field">
          <label class="field__label" for="area">Where in London are you?</label>
          <p class="field__hint" id="area-hint">Others only see your area and a rounded distance, never your address.</p>
          <select class="select" id="area" aria-describedby="area-hint area-err" required>
            <option value="">Choose your area</option>
            ${Store.areas().map((a) => opt(a.id, a.name, u.area)).join('')}
          </select>
          ${errP('area')}
        </div>
        <div class="field">
          <label class="field__label" for="age">Your age</label>
          <p class="field__hint" id="age-hint">We group you with people around your age. Others don't see your exact age.</p>
          <input class="input" id="age" type="number" inputmode="numeric" min="18" max="100" style="max-width:10rem" value="${esc(u.age || '')}" aria-describedby="age-hint age-err" required>
          ${errP('age')}
        </div>
        <div class="field">
          <label class="field__label" for="stage">Which fits you best?</label>
          <select class="select" id="stage" aria-describedby="stage-err" required>
            <option value="">Choose one</option>
            ${Store.lifeStages().map((s) => opt(s, s, u.stage)).join('')}
          </select>
          ${errP('stage')}
        </div>
        <div class="field">
          <label class="field__label" for="gender">Gender (optional)</label>
          <p class="field__hint" id="gender-hint">Only used for women-only groups. It isn't shown on your profile.</p>
          <select class="select" id="gender" aria-describedby="gender-hint">
            ${opt('', 'Prefer not to say', u.gender || '')}${opt('woman', 'Woman', u.gender)}${opt('man', 'Man', u.gender)}${opt('non-binary', 'Non-binary', u.gender)}${opt('self', 'Prefer to self-describe', u.gender)}
          </select>
        </div>
        <div class="form-actions form-actions--split">
          <button type="button" class="btn btn--tertiary" id="back">Back</button>
          <button class="btn btn--primary btn--lg" type="submit">See events for you</button>
        </div>
      </form>`;
    $('#back').onclick = () => go(3);
    $('#f').addEventListener('submit', (e) => {
      e.preventDefault();
      const area = $('#area').value, age = Number($('#age').value), stage = $('#stage').value, gender = $('#gender').value; const errs = [];
      const aMsg = area ? '' : 'Choose your area';
      const gMsg = !age ? 'Enter your age' : (age < 18 ? 'Buddy is for adults 18 and older' : (age > 100 ? 'Enter your age in years' : ''));
      const sMsg = stage ? '' : 'Choose what fits you best';
      fieldError('area', aMsg); fieldError('age', gMsg); fieldError('stage', sMsg);
      if (aMsg) errs.push(['area', aMsg]); if (gMsg) errs.push(['age', gMsg]); if (sMsg) errs.push(['stage', sMsg]);
      if (errorSummary(errs)) return;
      Store.finishProfile({ area, age, stage, gender });
      flash(`Welcome, ${Store.user().name}. Events are sorted by how well they fit you.`);
      location.href = 'events.html';
    });
  }

  render();
})();
