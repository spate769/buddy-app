/* ==========================================================
   Buddy · data layer
   EVERY read and write in the site goes through this file.
   Right now everything is saved in the visitor's browser (localStorage).

   To connect a real backend later, replace the bodies of these
   functions with API calls. Pages don't need to change.
   ========================================================== */
(function () {
  const D = window.BUDDY_DATA;
  const KEY = 'buddy.v1';
  let memory = {};

  function read() {
    try { const raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) : {}; }
    catch (e) { return memory; }
  }
  function write(s) {
    memory = s;
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* storage full or blocked */ }
  }
  function state() {
    const s = read();
    s.accounts = s.accounts || {};
    s.posted = s.posted || [];
    return s;
  }
  function blankAccount(profile, pw) {
    return { profile, pw, groups: {}, joins: {}, messages: {}, going: {}, surveys: {}, reports: [], blocked: [] };
  }
  async function hash(text) {
    try {
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
      return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      let h = 0; for (const c of text) h = (h * 31 + c.charCodeAt(0)) | 0; return 'h' + h;
    }
  }

  /* ---------- Sending data to the team ----------
     For now nothing leaves the visitor's browser. When the backend is ready,
     send these records to it here (sign-ups, joins, posted events, surveys, reports). */
  function sendToTeam(formName, data) { return Promise.resolve({ formName, data }); }

  /* ---------- Dates ---------- */
  function startOf(ev) {
    if (ev.start) return new Date(ev.start);
    const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + ev.dayOffset);
    const [h, m] = ev.time.split(':').map(Number); d.setHours(h, m);
    return d;
  }

  const Store = {
    /* ----- Accounts ----- */
    user() { const s = state(); const a = s.accounts[s.session]; return a ? a.profile : null; },

    async signUp(profile, password) {
      const s = state();
      const email = profile.email.trim().toLowerCase();
      if (s.accounts[email] && email !== D.DEMO_PROFILE.email) throw new Error('exists');
      s.accounts[email] = blankAccount({ ...profile, email, id: 'me', createdAt: new Date().toISOString() }, await hash(password));
      s.session = email;
      write(s);
      return s.accounts[email].profile;
    },
    finishProfile(patch) {
      this._mutate((a) => { a.profile = { ...a.profile, ...patch, complete: true }; });
      const p = this.user();
      sendToTeam('signup', { name: p.name, email: p.email, age: p.age, gender: p.gender || '', life_stage: p.stage, area: this.areaName(p.area), interests: p.interests.map(this.catName), social_link: p.social || '', has_photo: p.photo ? 'yes' : 'no' });
    },
    async logIn(email, password) {
      const s = state(); const key = email.trim().toLowerCase(); const a = s.accounts[key];
      if (!a || a.pw !== (await hash(password))) throw new Error('mismatch');
      s.session = key; write(s); return a.profile;
    },
    useDemo() {
      const s = state(); const email = D.DEMO_PROFILE.email;
      const fresh = !s.accounts[email];
      if (fresh) s.accounts[email] = blankAccount({ ...D.DEMO_PROFILE, id: 'me', complete: true, demo: true }, 'demo');
      s.session = email; write(s);
      // Give the demo profile one group already, so the chat and survey can be seen right away.
      if (fresh && window.BuddyMatch) {
        const ev = this.event('e3') || this.events()[0];
        if (ev && !this.groupForEvent(ev.id)) {
          const prefs = { size: ev.size, similarInterests: true, similarAge: true };
          this.createGroup(ev, window.BuddyMatch.formGroup(this.user(), ev, this.attendees(ev), prefs), prefs);
        }
      }
    },
    logOut() { const s = state(); delete s.session; write(s); },
    updateProfile(patch) { this._mutate((a) => { a.profile = { ...a.profile, ...patch }; }); },
    deleteAccount() { const s = state(); delete s.accounts[s.session]; delete s.session; write(s); },
    _mutate(fn) { const s = state(); const a = s.accounts[s.session]; if (!a) return null; const r = fn(a, s); write(s); return r; },
    _acct() { const s = state(); return s.accounts[s.session] || null; },

    /* ----- Reference data ----- */
    categories: () => D.CATEGORIES,
    catName: (id) => (D.CATEGORIES.find((c) => c.id === id) || { name: id }).name,
    areas: () => D.AREAS,
    areaName: (id) => (D.AREAS.find((a) => a.id === id) || { name: '' }).name,
    places: () => D.PLACES,
    place: (id) => D.PLACES.find((p) => p.id === id),
    lifeStages: () => D.LIFE_STAGES,

    /* ----- People ----- */
    person(id) {
      if (id === 'me') return this.user();
      return D.MEMBERS.find((m) => m.id === id) || null;
    },
    isBlocked(id) { const a = this._acct(); return !!(a && a.blocked.includes(id)); },
    block(id) { this._mutate((a) => { if (!a.blocked.includes(id)) a.blocked.push(id); }); },
    unblock(id) { this._mutate((a) => { a.blocked = a.blocked.filter((x) => x !== id); }); },
    blocked() { const a = this._acct(); return a ? a.blocked : []; },

    /* ----- Events ----- */
    events() {
      const s = state();
      return D.EVENTS.concat(s.posted).map((ev) => ({ ...ev, startDate: startOf(ev) }))
        .filter((ev) => ev.startDate > new Date(Date.now() - 3 * 3600e3))
        .sort((a, b) => a.startDate - b.startDate);
    },
    event(id) { return this.events().find((e) => e.id === id) || null; },
    attendees(ev) {
      const blocked = this.blocked();
      return ev.attendees.filter((id) => id !== 'me' && !blocked.includes(id)).map((id) => this.person(id)).filter(Boolean);
    },
    addEvent(input) {
      const s = state(); const me = this.user();
      const ev = { ...input, id: 'p' + Date.now().toString(36), host: me.name, attendees: [], posted: true, postedBy: s.session };
      s.posted.push(ev); write(s);
      sendToTeam('post-event', { email: me.email, title: ev.title, category: this.catName(ev.cat), place: this.place(ev.place).name, start: ev.start, group_size: ev.size, women_only: ev.womenOnly ? 'yes' : 'no', description: ev.desc });
      return ev;
    },

    /* ----- Groups and chat ----- */
    groupForEvent(eventId) { const a = this._acct(); if (!a) return null; const gid = a.joins[eventId]; return gid ? a.groups[gid] : null; },
    group(gid) { const a = this._acct(); return a ? a.groups[gid] || null : null; },
    groups() {
      const a = this._acct(); if (!a) return [];
      return Object.values(a.groups).sort((x, y) => new Date(x.eventStart) - new Date(y.eventStart));
    },
    createGroup(ev, result, prefs) {
      const me = this.user();
      const gid = 'g' + Date.now().toString(36);
      const g = {
        id: gid, eventId: ev.id, eventTitle: ev.title, eventStart: ev.startDate.toISOString(), cat: ev.cat, place: ev.place,
        name: `${this.catName(ev.cat)} group`, memberIds: result.members.map((m) => m.id), reasons: result.reasons,
        womenOnly: result.womenOnly, prefs, createdAt: new Date().toISOString()
      };
      const intro = [
        { from: 'buddy', text: `This group was made for "${ev.title}". You were matched by distance, age and interests. Use this chat to confirm the plan.`, at: Date.now() - 60e3 }
      ];
      const [a1, a2] = result.members;
      if (a1) intro.push({ from: a1.id, text: `Hi everyone, I'm ${a1.name}. Looking forward to this.`, at: Date.now() - 40e3 });
      if (a2) intro.push({ from: a2.id, text: `Same here. Want to meet at the entrance 10 minutes early so we can find each other?`, at: Date.now() - 20e3 });
      this._mutate((a) => { a.groups[gid] = g; a.joins[ev.id] = gid; a.messages[gid] = intro; });
      sendToTeam('join', { email: me.email, event: ev.title, group_size: result.size, women_only: result.womenOnly ? 'yes' : 'no',
        preferences: Object.entries(prefs).filter(([, v]) => v === true).map(([k]) => k).join(', '), matched_with: result.members.map((m) => m.name).join(', ') });
      return g;
    },
    leaveGroup(gid) {
      this._mutate((a) => { const g = a.groups[gid]; if (!g) return; delete a.joins[g.eventId]; delete a.groups[gid]; delete a.messages[gid]; delete a.going[gid]; });
    },
    messages(gid) { const a = this._acct(); return a ? a.messages[gid] || [] : []; },
    addMessage(gid, text) {
      const msg = { from: 'me', text, at: Date.now() };
      this._mutate((a) => { (a.messages[gid] = a.messages[gid] || []).push(msg); });
      return msg;
    },
    going(gid) { const a = this._acct(); return !!(a && a.going[gid]); },
    setGoing(gid, v) { this._mutate((a) => { a.going[gid] = !!v; }); },

    /* ----- Follow-up survey ----- */
    survey(gid) { const a = this._acct(); return a ? a.surveys[gid] || null : null; },
    saveSurvey(gid, answers) {
      const g = this.group(gid); const me = this.user();
      this._mutate((a) => { a.surveys[gid] = { ...answers, at: new Date().toISOString() }; });
      sendToTeam('survey', { email: me.email, event: g ? g.eventTitle : '', ...answers });
    },

    /* ----- Safety ----- */
    report(r) {
      const me = this.user();
      this._mutate((a) => { a.reports.push({ ...r, at: new Date().toISOString() }); });
      sendToTeam('report', { email: me ? me.email : 'logged out', ...r });
    },

    startOf, sendToTeam
  };

  window.Store = Store;
})();
