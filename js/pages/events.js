(function () {
  const { renderChrome, eventCard, icon, $ } = UI;
  renderChrome('events');
  const u = Store.user();
  const PAGE = 12;
  let shown = PAGE;

  if (!u) {
    $('#signin-note').innerHTML = `<div class="banner mt" style="margin:0 0 var(--space-5)">${icon('info', 'banner__icon')}<div><strong>See how well each event fits you</strong><p>Create a profile to join a group. We'll sort events by distance, age and interests.</p><a class="btn btn--primary btn--sm" href="signup.html">Create your profile</a></div></div>`;
    $('#post-btn').href = 'login.html?next=post.html';
  }

  const f = BuddyFilters.setup(() => { shown = PAGE; draw(); });

  function draw() {
    const list = BuddyFilters.apply(f);
    const visible = list.slice(0, shown);
    $('#list').innerHTML = visible.map((x) => `<li>${eventCard(x.ev)}</li>`).join('');
    $('#count').textContent = `${list.length} event${list.length === 1 ? '' : 's'}`;
    $('#more-wrap').hidden = list.length <= shown;
    $('#empty').innerHTML = list.length ? (list.length <= shown && list.length > PAGE ? `<p class="meta mt">That's every event that matches. <button type="button" class="btn btn--tertiary btn--sm" id="clear2">Change filters</button></p>` : '') : `
      <section class="empty" aria-labelledby="empty-title">
        <h2 class="empty__title" id="empty-title">No events match all these filters yet</h2>
        <p class="empty__body">Try a wider distance or fewer activities. Or post one yourself and others can join.</p>
        <div class="form-actions" style="margin:0"><button type="button" class="btn btn--primary" id="clear">Clear filters</button><a class="btn btn--secondary" href="post.html">Post an event</a></div>
      </section>`;
    const c = $('#clear') || $('#clear2'); if (c) c.onclick = f.clear;
  }
  $('#more').onclick = () => { const first = shown; shown += PAGE; draw(); const items = $('#list').children; if (items[first]) items[first].querySelector('a').focus(); };
  draw();
})();
