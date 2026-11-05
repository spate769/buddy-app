(function () {
  const { renderChrome, icon, $, param, flash } = UI;
  renderChrome('login');
  const next = param('next');
  const dest = next && /^[a-z-]+\.html/.test(next) ? next : 'events.html';
  if (Store.user() && Store.user().complete) { location.replace(dest); return; }

  const pw = $('#password');
  $('.pw__toggle').onclick = (e) => { const show = pw.type === 'password'; pw.type = show ? 'text' : 'password'; e.currentTarget.textContent = show ? 'Hide' : 'Show'; e.currentTarget.setAttribute('aria-pressed', show); };
  $('#forgot').onclick = (e) => {
    e.preventDefault();
    const box = $('#err'); box.className = 'banner error-summary';
    box.innerHTML = `${icon('info', 'banner__icon')}<p>Password reset by email is coming once accounts move to the Buddy server. For now, create a new profile or use the demo profile.</p>`;
    box.hidden = false; box.focus();
  };
  $('#demo').onclick = () => { Store.useDemo(); flash('You are using the demo profile. Your group chat is ready.'); location.href = next ? dest : 'groups.html'; };
  $('#login').addEventListener('submit', async (e) => {
    e.preventDefault();
    const box = $('#err');
    try {
      const u = await Store.logIn($('#email').value, pw.value);
      location.href = u.complete ? dest : 'signup.html?step=2';
    } catch (err) {
      box.className = 'banner banner--error error-summary';
      box.innerHTML = `${icon('alert', 'banner__icon')}<p>That email and password don't match. Try again, or create a profile if you're new. During the prototype, profiles are saved on the device you signed up on.</p>`;
      box.hidden = false; box.focus();
    }
  });
})();
