(function () {
  const { renderChrome, $ } = UI;
  renderChrome('home');
  const u = Store.user();
  if (u && u.complete) {
    $('#hero-cta').innerHTML = '<a class="btn btn--primary btn--lg" href="events.html">Find an event</a><a class="btn btn--tertiary btn--lg" href="groups.html">My Groups</a>';
    $('#final-btn').textContent = 'Find an event'; $('#final-btn').href = 'events.html';
  } else {
    $('#demo').onclick = () => { Store.useDemo(); UI.flash('You are using the demo profile. Your group chat is ready.'); location.href = 'groups.html'; };
  }
})();
