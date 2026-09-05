const sections = ['1 Notice', '2 Grammar', '3 Practice', '4 Reading', '5 Speaking', '6 Writing', '7 Can-do'];
const KEY = 'a21PsPcReviewv1';
function loadState() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); }
  catch { return {}; }
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); }
  catch { /* ignore */ }
}
const state = loadState();
const panels = {
  0: () => noticeHTML(),
  1: () => grammarHTML(),
  2: () => practiceHTML(),
  3: () => readingHTML(),
  4: () => speakingHTML(),
  5: () => writingHTML(),
  6: () => candoHTML()
};
function noticeHTML() {
  return `
    <h4>Same people, different time</h4>
    <p class="intro">Tap a card. Notice: habits and facts use Present Simple. Actions happening now use Present Continuous.</p>
    <div class="scene" aria-label="Simple vs continuous voices">
      <div class="zone">
        <div class="who">
          <div class="avatar">S</div>
          <div><strong>Sofia</strong><span>habit · Present Simple</span></div>
        </div>
        <button type="button" class="bubble" data-who="simple1">
          I usually walk to school.
          <small>usually → Present Simple</small>
        </button>
      </div>
      <div class="zone">
        <div class="who">
          <div class="avatar">S</div>
          <div><strong>Sofia</strong><span>now · Present Continuous</span></div>
        </div>
        <button type="button" class="bubble" data-who="cont1">
          Look! I am walking to school now.
          <small>now / Look! → Present Continuous</small>
        </button>
      </div>
      <div class="zone">
        <div class="who">
          <div class="avatar">M</div>
          <div><strong>Marco</strong><span>routine · Present Simple</span></div>
        </div>
        <button type="button" class="bubble" data-who="simple2">
          He works in an office every day.
          <small>every day → Present Simple</small>
        </button>
      </div>
      <div class="zone">
        <div class="who">
          <div class="avatar">M</div>
          <div><strong>Marco</strong><span>temporary · Present Continuous</span></div>
        </div>
        <button type="button" class="bubble" data-who="cont2">
          Today he is working from home.
          <small>today (temporary) → Present Continuous</small>
        </button>
      </div>
    </div>
    <div class="tip"><strong>Listen for the signals:</strong> usually / every day / on Mondays = Simple. now / look! / listen! / at the moment / today (temporary) = Continuous.</div>
  `;
}
function grammarHTML() {
  return `
    <h4>Choose the right present</h4>
    <p class="intro">Present Simple for habits, routines, and facts. Present Continuous for actions happening now or for a short time.</p>
    <div class="grid2">
      <div class="card mint">
        <div class="label">Present Simple</div>
        <p class="big-rule">habits · routines · facts</p>
        <div class="example">I drink coffee every morning.</div>
        <div class="example">She teaches English on Mondays.</div>
        <div class="example">Water boils at 100°C.</div>
        <div class="times">
          <span>usually</span>
          <span>every day</span>
          <span>on Mondays</span>
          <span>always</span>
          <span>sometimes</span>
          <span>never</span>
        </div>
      </div>
      <div class="card">
        <div class="label">Present Continuous</div>
        <p class="big-rule">now · temporary · right now</p>
        <div class="example">Look! It is raining.</div>
        <div class="example">Listen! Someone is calling.</div>
        <div class="example">I am staying with my aunt this week.</div>
        <div class="times">
          <span>now</span>
          <span>look!</span>
          <span>listen!</span>
          <span>at the moment</span>
          <span>today</span>
          <span>this week</span>
        </div>
      </div>
    </div>
    <h5>Quick form map</h5>
    <div class="map" role="table" aria-label="Form comparison">
      <div class="h"></div>
      <div class="h">Form</div>
      <b>Simple</b>
      <div class="cell">I / you / we / they + verb<br>he / she / it + verb-s <small>She walks.</small></div>
      <b>Cont.</b>
      <div class="cell">am / is / are + verb-ing <small>She is walking.</small></div>
    </div>
    <div class="note"><strong>Remember:</strong> <em>today</em> and <em>this week</em> often mean temporary → Continuous. Facts and habits stay Simple even if you say them today.</div>
  `;
}

function practiceHTML() {
  const saved = state.practice || {};
  return `
    <h4>Choose, then check.</h4>
    <p class="intro">A: pick Simple or Continuous. B: choose the correct verb form. C: match the signal word.</p>
    <h5>A · Simple or Continuous?</h5>
    ${mcGroup('A', [
      { q: 'I ______ to work every day.', opts: ['drive', 'am driving'], a: 'drive', why: 'every day = habit → Present Simple.' },
      { q: 'Look! The children ______ in the park.', opts: ['play', 'are playing'], a: 'are playing', why: 'Look! = happening now → Present Continuous.' },
      { q: 'She usually ______ tea in the morning.', opts: ['drinks', 'is drinking'], a: 'drinks', why: 'usually = routine → Present Simple.' },
      { q: 'At the moment we ______ for a bus.', opts: ['wait', 'are waiting'], a: 'are waiting', why: 'at the moment = now → Present Continuous.' }
    ], saved)}
    <h5>B · Correct form</h5>
    ${mcGroup('B', [
      { q: 'On Mondays he ______ football.', opts: ['plays', 'is playing', 'play'], a: 'plays', why: 'on Mondays = routine → plays.' },
      { q: 'Listen! Someone ______ the door.', opts: ['knocks', 'is knocking', 'knock'], a: 'is knocking', why: 'Listen! = right now → is knocking.' },
      { q: 'They ______ English every evening.', opts: ['study', 'are studying', 'studies'], a: 'study', why: 'every evening = habit → study.' },
      { q: 'Today I ______ from a café (temporary).', opts: ['work', 'am working', 'works'], a: 'am working', why: 'today temporary → am working.' }
    ], saved)}
    <h5>C · Signal words</h5>
    ${mcGroup('C', [
      { q: 'Which signal fits Present Simple?', opts: ['usually', 'at the moment', 'look!'], a: 'usually', why: 'usually marks habits and routines.' },
      { q: 'Which signal fits Present Continuous?', opts: ['every day', 'on Mondays', 'now'], a: 'now', why: 'now marks an action happening at this moment.' },
      { q: '"She ______ French." (fact / ability)', opts: ['speaks', 'is speaking'], a: 'speaks', why: 'Facts and abilities use Present Simple.' },
      { q: '"Shh! The baby ______."', opts: ['sleeps', 'is sleeping'], a: 'is sleeping', why: 'Shh! / right now → Present Continuous.' }
    ], saved)}
    <div style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap">
      <button type="button" class="btn" id="checkPractice">Check answers</button>
      <button type="button" class="btn ghost" id="resetPractice">Reset</button>
    </div>
    <div class="feedback" id="practiceFb"></div>
  `;
}
function mcGroup(group, items, saved) {
  return items.map((item, i) => {
    const id = group + i;
    const picked = saved[id] || '';
    const opts = item.opts.map((o) =>
      `<button type="button" class="opt${picked === o ? ' selected' : ''}" data-g="${group}" data-i="${i}" data-v="${escapeAttr(o)}">${escapeHtml(o)}</button>`
    ).join('');
    return `<div class="q" data-qid="${id}" data-answer="${escapeAttr(item.a)}" data-why="${escapeAttr(item.why)}">
      <p>${item.q}</p>
      <div class="opts">${opts}</div>
      <div class="why"></div>
    </div>`;
  }).join('');
}
function readingHTML() {
  return `
    <h4>Sofia's message. Tap every signal word.</h4>
    <p class="intro">Find all 8 signal words (usually, every day, on Mondays, now, Look!, listen!, at the moment, today). Then answer the questions.</p>
    <div class="reading" id="reading">
      Hi! I <span class="hit" data-ok="1">usually</span> get up early and I walk to school <span class="hit" data-ok="1">every day</span>.
      <span class="hit" data-ok="1">On Mondays</span> I have English class.
      But <span class="hit" data-ok="1">today</span> I am staying home — I feel a little sick.
      <span class="hit" data-ok="1">Look!</span> It is raining outside.
      My brother is watching a film <span class="hit" data-ok="1">at the moment</span>.
      <span class="hit" data-ok="1">Listen!</span> Mum is calling us for lunch.
      I am writing this message <span class="hit" data-ok="1">now</span>.
    </div>
    <div id="readCount" style="margin-top:12px;font-weight:800;color:var(--teal-dark)">Found 0 / 8</div>
    <div class="q">
      <p>Sofia walks to school ______.</p>
      <div class="opts" data-readq="habit">
        <button type="button" class="opt" data-v="every">every day</button>
        <button type="button" class="opt" data-v="today">only today</button>
      </div>
    </div>
    <div class="q">
      <p>Right now her brother ______ a film.</p>
      <div class="opts" data-readq="bro">
        <button type="button" class="opt" data-v="watches">watches</button>
        <button type="button" class="opt" data-v="watching">is watching</button>
      </div>
    </div>
    <button type="button" class="btn" id="checkReading" style="margin-top:8px">Check</button>
    <div class="feedback" id="readFb"></div>
  `;
}
function speakingHTML() {
  const prompts = [
    'Say one habit with usually or every day. Example: I usually…',
    'Say what is happening in the room now. Look! / Listen! / At the moment…',
    'Contrast: On Mondays I ______. But today I am ______.',
    'Talk about a classmate: He/She usually ______. Right now he/she is ______.',
    'Tell a partner three sentences: one Simple fact, one Simple routine, one Continuous action now.'
  ];
  return `
    <h4>Say it out loud. Use the signal words.</h4>
    <p class="intro">A partner gives the prompt. You speak. Then swap. Mix Present Simple and Present Continuous.</p>
    <div class="speak" id="speakPrompts">
      ${prompts.map((p, i) => `<div class="prompt" data-sp="${i}" hidden>${p}</div>`).join('')}
    </div>
    <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
      <button type="button" class="btn" id="nextSpeak">Next prompt</button>
      <button type="button" class="btn ghost" id="showModel">Show a model</button>
    </div>
    <div class="card soft" id="speakModel" hidden style="margin-top:12px">
      <div class="label">Models</div>
      <div class="example">I usually drink coffee in the morning.</div>
      <div class="example">Look! It is raining outside.</div>
      <div class="example">On Mondays I work in the office. But today I am working from home.</div>
      <div class="example">She usually reads after lunch. Right now she is talking on the phone.</div>
      <div class="example">Water boils at 100°C. I get up at 7:00. At the moment I am studying English.</div>
    </div>
  `;
}

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
openTab(typeof state.tab === "number" ? state.tab : 0);
