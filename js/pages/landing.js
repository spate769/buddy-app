(function () {
  const { renderChrome, $ } = UI;
  renderChrome('home');
  const u = Store.user();
  if (u && u.complete) {
    $('#hero-cta').innerHTML = '<a class="btn btn--light btn--lg" href="events.html">Find an event</a><a class="home-hero__demo" href="groups.html">Go to my groups</a>';
  } else {
    $('#demo').onclick = () => { Store.useDemo(); UI.flash('You are using the demo profile. Your group chat is ready.'); location.href = 'groups.html'; };
  }
})();
