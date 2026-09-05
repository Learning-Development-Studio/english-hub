function writingHTML() {
  const text = state.writing || '';
  return `
    <h4>Write 6–8 sentences about your week.</h4>
    <p class="intro">Use <strong>Present Simple</strong> for habits and facts (usually, every day, on Mondays). Use <strong>Present Continuous</strong> for now / temporary actions (now, at the moment, today).</p>
    <div class="stems">
      <button type="button">I usually…</button>
      <button type="button">Every day I…</button>
      <button type="button">On Mondays I…</button>
      <button type="button">At the moment I am…</button>
      <button type="button">Today I am…</button>
      <button type="button">Look! …</button>
    </div>
    <textarea id="writingBox" placeholder="I usually get up at 7:00. Every day I study English. At the moment I am writing this paragraph.…">${escapeHtml(text)}</textarea>
    <div class="cando" style="margin-top:12px">
      <label><input type="checkbox" data-writechk="simple"> I used Present Simple with usually / every day / on Mondays.</label>
      <label><input type="checkbox" data-writechk="cont"> I used Present Continuous with now / at the moment / today.</label>
      <label><input type="checkbox" data-writechk="contrast"> I showed a clear contrast between habit and now.</label>
    </div>
  `;
}
function candoHTML() {
  const c = state.cando || {};
  const items = [
    ['habit', 'I can talk about habits and routines with Present Simple (usually, every day, on Mondays).'],
    ['now', 'I can talk about actions happening now with Present Continuous (now, look!, listen!, at the moment).'],
    ['temp', 'I can use Present Continuous for temporary situations (today, this week).'],
    ['signals', 'I can use signal words to choose Simple vs Continuous.'],
    ['form', 'I remember the forms: verb / verb-s vs am/is/are + -ing.'],
    ['contrast', 'I can contrast a habit and a present action in the same conversation.']
  ];
  return `
    <h4>Can-do · Present Simple vs Present Continuous</h4>
    <p class="intro">Check what is true for you now. Keep this review open when you write or speak this week.</p>
    <div class="cando">
      ${items.map(([id, label]) => `
        <label>
          <input type="checkbox" data-cando="${id}" ${c[id] ? 'checked' : ''}>
          <span>${label}</span>
        </label>`).join('')}
    </div>
  `;
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;', "'":'&#39;' }[c]));
}
function escapeAttr(s) { return escapeHtml(s); }
function renderTabs() {
  const i = state.tab || 0;
  document.getElementById('tabs').innerHTML = sections.map((s, n) =>
    `<button type="button" class="tab ${n === i ? 'active' : ''}" data-tab="${n}">${s}</button>`
  ).join('');
  openTab(i);
}
function openTab(i) {
  state.tab = i;
  save();
  document.querySelectorAll('.tab').forEach((el, n) => el.classList.toggle('active', n === i));
  const host = document.getElementById('panels');
  host.innerHTML = `<div class="panel active">${panels[i]()}</div>`;
  bindPanel(i);
  const lesson = document.querySelector('.lesson');
  if (lesson) window.scrollTo({ top: lesson.offsetTop - 80, behavior: 'smooth' });
}
function bindPanel(i) {
  if (i === 0) {
    document.querySelectorAll('.bubble').forEach((btn) => {
      btn.addEventListener('click', () => btn.classList.toggle('on'));
    });
  }
  if (i === 2) bindPractice();
  if (i === 3) bindReading();
  if (i === 4) bindSpeaking();
  if (i === 5) bindWriting();
  if (i === 6) {
    document.querySelectorAll('[data-cando]').forEach((el) => {
      el.addEventListener('change', () => {
        state.cando = state.cando || {};
        state.cando[el.dataset.cando] = el.checked;
        save();
      });
    });
  }
}
function bindPractice() {
  document.querySelectorAll('.opt[data-g]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const group = btn.dataset.g;
      const idx = btn.dataset.i;
      document.querySelectorAll(`.opt[data-g="${group}"][data-i="${idx}"]`).forEach((o) => o.classList.remove('selected'));
      btn.classList.add('selected');
      state.practice = state.practice || {};
      state.practice[group + idx] = btn.dataset.v;
      save();
    });
  });
  document.getElementById('checkPractice').addEventListener('click', () => {
    let right = 0, total = 0;
    document.querySelectorAll('.q[data-qid]').forEach((q) => {
      total += 1;
      const answer = q.dataset.answer;
      const picked = q.querySelector('.opt.selected');
      q.querySelectorAll('.opt').forEach((o) => {
        o.classList.remove('correct', 'wrong');
        if (o.dataset.v === answer) o.classList.add('correct');
        else if (o.classList.contains('selected')) o.classList.add('wrong');
      });
      const ok = picked && picked.dataset.v === answer;
      if (ok) right += 1;
      q.classList.add('done');
      q.querySelector('.why').textContent = q.dataset.why;
    });
    const fb = document.getElementById('practiceFb');
    fb.className = 'feedback show ' + (right === total ? 'good' : 'warn');
    fb.textContent = right === total
      ? `All ${total} correct. Habits/facts → Simple. Now/temporary → Continuous.`
      : `${right} / ${total}. Read the note under each item.`;
  });
  document.getElementById('resetPractice').addEventListener('click', () => {
    state.practice = {};
    save();
    openTab(2);
  });
}
function bindReading() {
  let found = 0;
  const total = document.querySelectorAll('#reading .hit[data-ok]').length;
  document.querySelectorAll('#reading .hit').forEach((el) => {
    el.addEventListener('click', () => {
      if (el.classList.contains('found')) return;
      el.classList.add(el.dataset.ok ? 'found' : 'miss');
      if (el.dataset.ok) found += 1;
      document.getElementById('readCount').textContent = `Found ${found} / ${total}`;
    });
  });
  const answers = { habit: 'every', bro: 'watching' };
  document.querySelectorAll('.opt[data-v]').forEach((btn) => {
    if (!btn.closest('[data-readq]')) return;
    btn.addEventListener('click', () => {
      btn.parentElement.querySelectorAll('.opt').forEach((o) => o.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });
  document.getElementById('checkReading').addEventListener('click', () => {
    let ok = found === total;
    document.querySelectorAll('[data-readq]').forEach((box) => {
      const key = box.dataset.readq;
      const picked = box.querySelector('.opt.selected');
      box.querySelectorAll('.opt').forEach((o) => {
        o.classList.remove('correct', 'wrong');
        if (o.dataset.v === answers[key]) o.classList.add('correct');
        else if (o.classList.contains('selected')) o.classList.add('wrong');
      });
      if (!(picked && picked.dataset.v === answers[key])) ok = false;
    });
    const fb = document.getElementById('readFb');
    fb.className = 'feedback show ' + (ok ? 'good' : 'warn');
    fb.textContent = ok
      ? 'Nice work. Signal words show Simple vs Continuous.'
      : 'Tap all 8 signal words, then finish both questions.';
  });
}
function bindSpeaking() {
  let n = state.speakIndex || 0;
  const prompts = document.querySelectorAll('[data-sp]');
  function show() {
    prompts.forEach((p, i) => { p.hidden = i !== n; });
    state.speakIndex = n;
    save();
  }
  show();
  document.getElementById('nextSpeak').addEventListener('click', () => {
    n = (n + 1) % prompts.length;
    show();
  });
  document.getElementById('showModel').addEventListener('click', () => {
    const box = document.getElementById('speakModel');
    box.hidden = !box.hidden;
  });
}
function bindWriting() {
  const box = document.getElementById('writingBox');
  box.addEventListener('input', () => { state.writing = box.value; save(); });
  document.querySelectorAll('.stems button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const pad = box.value && !box.value.endsWith('\n') ? '\n' : '';
      box.value += pad + btn.textContent + ' ';
      box.focus();
      state.writing = box.value;
      save();
    });
  });
  document.querySelectorAll('[data-writechk]').forEach((el) => {
    el.checked = !!(state.writechk && state.writechk[el.dataset.writechk]);
    el.addEventListener('change', () => {
      state.writechk = state.writechk || {};
      state.writechk[el.dataset.writechk] = el.checked;
      save();
    });
  });
}
document.getElementById('tabs').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-tab]');
  if (btn) openTab(Number(btn.dataset.tab));
});
renderTabs();
