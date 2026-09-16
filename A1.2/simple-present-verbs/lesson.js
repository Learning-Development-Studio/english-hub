const sections = ['1 Notice', '2 Grammar', '3 Practice', '4 Reading', '5 Speaking', '6 Writing'];
const KEY = 'a12SpAffNegTabsV1';
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
  5: () => writingHTML()
};
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;', "'":'&#39;' }[c]));
}
function norm(s) {
  return String(s).trim().toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, ' ').replace(/[.!?]+$/, '');
}

function noticeHTML() {
  return `
    <h4>Notice the pattern</h4>
    <p class="intro">Read each pair aloud. Affirmative and negative use the same subject split: <strong>I/you/we/they</strong> vs <strong>he/she/it</strong>.</p>
    <div class="scene" aria-label="Pattern cards">
      <div class="zone">
        <div class="who"><div class="avatar">1</div><div><strong>I / You / We / They</strong><span>base verb</span></div></div>
        <div class="bubble on" style="cursor:default">We <strong>need</strong> more time.<br>We <strong>don’t need</strong> more time.</div>
        <p class="intro" style="margin-top:8px"><em>Write one new affirmative + one negative with we/they.</em></p>
        <textarea data-notice="a" placeholder="We… / We don’t…">${escapeHtml((state.notice||{}).a||'')}</textarea>
      </div>
      <div class="zone">
        <div class="who"><div class="avatar">2</div><div><strong>He / She / It</strong><span>verb-s · doesn’t + base</span></div></div>
        <div class="bubble on" style="cursor:default">She <strong>calls</strong> her friend.<br>She <strong>doesn’t call</strong> her friend.</div>
        <p class="intro" style="margin-top:8px"><em>Write one new affirmative + one negative with he/she.</em></p>
        <textarea data-notice="b" placeholder="She… / She doesn’t…">${escapeHtml((state.notice||{}).b||'')}</textarea>
      </div>
      <div class="zone">
        <div class="who"><div class="avatar">3</div><div><strong>Don’t vs doesn’t</strong><span>helper matches subject</span></div></div>
        <div class="bubble on" style="cursor:default">I <strong>don’t use</strong> the car on weekdays.<br>Sara <strong>doesn’t believe</strong> that story.</div>
        <p class="intro" style="margin-top:8px"><em>Which subject takes don’t? Which takes doesn’t?</em></p>
        <textarea data-notice="c" placeholder="don’t = … · doesn’t = …">${escapeHtml((state.notice||{}).c||'')}</textarea>
      </div>
      <div class="zone">
        <div class="who"><div class="avatar">4</div><div><strong>Base after don’t/doesn’t</strong><span>no -s after helper</span></div></div>
        <div class="bubble on" style="cursor:default">He <strong>doesn’t play</strong> tennis. ✓<br>He doesn’t plays tennis. ✗</div>
        <p class="intro" style="margin-top:8px"><em>Why is “doesn’t plays” wrong?</em></p>
        <textarea data-notice="d" placeholder="Because…">${escapeHtml((state.notice||{}).d||'')}</textarea>
      </div>
    </div>
    <div class="tip"><strong>Think first:</strong> Affirmative = subject + right verb form. Negative = don’t/doesn’t + <em>base</em>.</div>
  `;
}

function grammarHTML() {
  return `
    <h4>Structure · clear rules</h4>
    <p class="intro">Study the forms. Then answer the analysis questions in full sentences.</p>
    <div class="grid2">
      <div class="card mint">
        <div class="label">I / You / We / They</div>
        <p class="big-rule">base verb · don’t + base</p>
        <div class="example">We need more time.</div>
        <div class="example">We don’t need more time.</div>
        <div class="times"><span>every day</span><span>usually</span><span>on Mondays</span><span>after work</span></div>
      </div>
      <div class="card">
        <div class="label">He / She / It</div>
        <p class="big-rule">verb-s / -es · doesn’t + base</p>
        <div class="example">She calls her friend.</div>
        <div class="example">She doesn’t call her friend.</div>
        <div class="times"><span>make → makes</span><span>watch → watches</span><span>study → studies</span></div>
      </div>
    </div>
    <div class="note" style="margin-top:14px"><strong>Trap:</strong> <em>doesn’t makes</em> ✗ → <em>doesn’t make</em> ✓ · <em>He don’t…</em> ✗ → <em>He doesn’t…</em> ✓ · <em>They lives…</em> ✗ → <em>They live…</em> ✓</div>
    <h5>Analysis</h5>
    <p class="intro">1. Why do we say <strong>“Leo makes breakfast”</strong> but <strong>“We don’t use the car”</strong>?</p>
    <textarea data-gram="1" placeholder="Write 2–3 sentences…">${escapeHtml((state.gram||{})['1']||'')}</textarea>
    <p class="intro">2. Fix the thinking error: “She doesn’t likes coffee.” What is wrong, and which form is better?</p>
    <textarea data-gram="2" placeholder="Because…">${escapeHtml((state.gram||{})['2']||'')}</textarea>
    <p class="intro">3. Explain in one clear sentence: when do we use <strong>don’t</strong> and when <strong>doesn’t</strong>?</p>
    <textarea data-gram="3" placeholder="We use don’t when… We use doesn’t when…">${escapeHtml((state.gram||{})['3']||'')}</textarea>
  `;
}

function practiceHTML() {
  const quiz = [
    { id: '1', q: 'Leo ___ breakfast every morning.', opts: ['make', 'makes', "doesn't makes"], ans: 'makes' },
    { id: '2', q: 'We ___ the car on weekdays.', opts: ["doesn't use", "don't use", 'not use'], ans: "don't use" },
    { id: '3', q: 'Sara ___ that story.', opts: ["don't believe", "doesn't believes", "doesn't believe"], ans: "doesn't believe" },
    { id: '4', q: 'I ___ my cousins on Sundays.', opts: ['see', 'sees', 'seeing'], ans: 'see' }
  ];
  const fixes = [
    { id: '1', wrong: "He don't play tennis.", ans: "He doesn't play tennis." },
    { id: '2', wrong: 'She not use a laptop.', ans: "She doesn't use a laptop." },
    { id: '3', wrong: 'They lives near here.', ans: 'They live near here.' }
  ];
  const quizAns = state.quiz || {};
  const fixAns = state.fix || {};
  return `
    <h4>Practice · choose &amp; fix</h4>
    <p class="intro">A · Choose the correct form. B · Fix the traps (He don’t / They lives).</p>
    <h5>A · Choose the form</h5>
    ${quiz.map((it) => `
      <div class="q" data-quiz="${it.id}" data-answer="${escapeHtml(it.ans)}">
        <p>${it.id}. ${it.q}</p>
        <div class="opts">
          ${it.opts.map((o) => {
            const sel = quizAns[it.id] === o ? ' selected' : '';
            return `<button type="button" class="opt quiz-opt${sel}" data-qid="${it.id}" data-val="${escapeHtml(o)}">${escapeHtml(o)}</button>`;
          }).join('')}
        </div>
      </div>`).join('')}
    <h5>B · Fix the sentence</h5>
    <p class="intro">Type the corrected sentence, including punctuation.</p>
    ${fixes.map((it) => `
      <div class="q" data-fix="${it.id}" data-text-answer="${escapeHtml(it.ans)}">
        <p>${it.id}. ${escapeHtml(it.wrong)}</p>
        <div class="inline">
          <input type="text" data-fix-in="${it.id}" value="${escapeHtml(fixAns[it.id]||'')}" aria-label="Correction ${it.id}">
          <button type="button" class="btn check-fix" data-fix-btn="${it.id}">Check</button>
        </div>
        <p class="feedback" data-fix-fb="${it.id}"></p>
      </div>`).join('')}
    <div class="tip"><strong>Teacher check:</strong> Strong answers keep base after don’t/doesn’t and -s only on he/she/it affirmatives.</div>
  `;
}

function readingHTML() {
  const tf = [
    { id: '1', text: 'Daniel works from home once a week.', ans: 'True' },
    { id: '2', text: 'Daniel drives to work every day.', ans: 'False' },
    { id: '3', text: 'He plays basketball twice a week.', ans: 'True' },
    { id: '4', text: 'Daniel studies English on Friday evenings.', ans: 'False' },
    { id: '5', text: 'Daniel helps his grandmother with technology.', ans: 'True' },
    { id: '6', text: 'Daniel enjoys getting up early on Mondays.', ans: 'False' }
  ];
  const tfAns = state.tf || {};
  return `
    <h4>Reading · Daniel’s busy week</h4>
    <p class="intro">Read for detail. Then answer True / False and discuss with a partner.</p>
    <div class="reading">
      <p><strong>Daniel lives in Puebla with his cousin, Andrés.</strong> He works at a small technology company near the city center. He usually takes the bus to work, but he doesn’t use it on Wednesdays because he works from home. He starts at eight thirty, checks his messages, and talks to his team before he begins his main tasks. Daniel likes his job because he learns something new every week.</p>
      <p><strong>After work, Daniel doesn’t go home immediately.</strong> On Mondays and Thursdays, he plays basketball with friends at a local sports center. On Tuesdays, he studies English at a community school. He wants to speak more confidently, so he practices short conversations with his classmates and writes new verbs in a notebook. He doesn’t study on Friday evenings; he meets friends or watches a movie instead.</p>
      <p><strong>Weekends are quieter, but Daniel still has plans.</strong> He makes breakfast for Andrés on Saturday morning, and they clean the apartment together. In the afternoon, Daniel visits his grandmother and helps her with her phone. On Sundays, the cousins call their parents, prepare food for the week, and sometimes play video games. Daniel enjoys his routine, but he doesn’t like waking up early on Monday.</p>
    </div>
    <h5>True / False</h5>
    ${tf.map((it) => `
      <div class="q" data-tf="${it.id}" data-answer="${it.ans}">
        <p>${it.id}. ${it.text}</p>
        <div class="opts">
          <button type="button" class="opt tf-opt${tfAns[it.id]==='True'?' selected':''}" data-tfid="${it.id}" data-val="True">True</button>
          <button type="button" class="opt tf-opt${tfAns[it.id]==='False'?' selected':''}" data-tfid="${it.id}" data-val="False">False</button>
        </div>
      </div>`).join('')}
    <h5>Discuss with a partner</h5>
    <div class="card soft">
      <p>1. Why does Daniel study English?</p>
      <p>2. What does he do before he starts his main tasks?</p>
      <p>3. Which parts of Daniel’s routine are similar to yours?</p>
      <p>4. Choose two affirmative sentences from the text and change them to negative.</p>
      <p>5. What activity would you add to Daniel’s weekend?</p>
    </div>
    <textarea data-rd="discuss" placeholder="Notes from your discussion…">${escapeHtml((state.read||{}).discuss||'')}</textarea>
  `;
}

function speakingHTML() {
  const prompts = [
    'MAKE — Say two things you make and one thing you don’t make.',
    'USE — Name something you use daily and something you rarely use.',
    'BELIEVE — Say something you believe and something you don’t believe.',
    'NEED — Say three things you need every day.',
    'CALL — Who do you call often? Who don’t you call often?',
    'PLAY — Say one game you play and one you don’t play.',
    'THINK — Say what you think about learning English.',
    'LIVE — Describe where someone in your family lives.'
  ];
  const i = state.speakIndex || 0;
  const names = state.fsn || {};
  const items = [
    ['breakfast', 'makes breakfast'],
    ['laptop', 'uses a laptop every day'],
    ['soccer', "doesn't play soccer"],
    ['family', 'calls their family often'],
    ['hardwork', 'believes in hard work'],
    ['early', "doesn't leave home early"]
  ];
  return `
    <h4>Speaking · Find someone who… + interview cards</h4>
    <p class="intro">Ask classmates <strong>Do you…?</strong> When someone says yes, write their name and ask one follow-up. Then use a speaking card with a partner.</p>
    <h5>Find someone who…</h5>
    <div class="grid2">
      ${items.map(([id, label]) => `
        <label class="card">${escapeHtml(label)}
          <input type="text" data-fsn="${id}" placeholder="Name + detail" value="${escapeHtml(names[id]||'')}">
        </label>`).join('')}
    </div>
    <h5>Speaking card</h5>
    <div class="prompt-card" id="promptCard">${escapeHtml(prompts[i % prompts.length])}</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">
      <button type="button" class="btn" id="nextSpeak">New random card</button>
    </div>
    <p class="intro" style="margin-top:14px">Optional energy: partner gives a verb — make one affirmative and one negative in 30 seconds.</p>
    <div class="timer" id="timer">${state.timerSec != null ? state.timerSec : 30}</div>
    <div style="text-align:center;display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
      <button type="button" class="btn" id="timerStart">Start</button>
      <button type="button" class="btn ghost" id="timerReset">Reset</button>
    </div>
    <textarea data-sp="reflect" placeholder="After you speak: which don’t/doesn’t forms did you use?" style="margin-top:14px">${escapeHtml(state.speakNote||'')}</textarea>
  `;
}

function writingHTML() {
  const c = state.cando || {};
  const items = [
    ['aff', 'I can make affirmative Simple Present sentences for I/you/we/they and he/she/it.'],
    ['neg', 'I can make negative sentences with don’t / doesn’t + base.'],
    ['trap', 'I can spot and fix traps (He don’t / They lives / doesn’t makes).'],
    ['read', 'I can answer True/False about a short habit text with evidence.'],
    ['speak', 'I can ask Do you…? and talk about real habits with a partner.'],
    ['write', 'I can write 3–5 sentences about my week using aff and neg forms.']
  ];
  return `
    <h4>Writing · short production + can-do</h4>
    <p class="intro">Write 5–8 sentences about your real week. Include at least 2 affirmative (mix I + he/she) and 2 negative with don’t OR doesn’t.</p>
    <textarea id="writingBox" style="min-height:160px" placeholder="I usually… He/She… I don’t… She doesn’t…">${escapeHtml(state.writing||'')}</textarea>
    <div class="cando" style="margin-top:12px">
      <label><input type="checkbox" data-writechk="mix" ${(state.writechk||{}).mix?'checked':''}> I mixed I/you/we/they and he/she/it.</label>
      <label><input type="checkbox" data-writechk="neg" ${(state.writechk||{}).neg?'checked':''}> I used don’t and/or doesn’t + base.</label>
      <label><input type="checkbox" data-writechk="real" ${(state.writechk||{}).real?'checked':''}> My sentences are about real life.</label>
    </div>
    <h5>Can-do</h5>
    <div class="cando">
      ${items.map(([id, label]) => `
        <label>
          <input type="checkbox" data-cando="${id}" ${c[id] ? 'checked' : ''}>
          <span>${label}</span>
        </label>`).join('')}
    </div>
  `;
}

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
}
function bindPanel(i) {
  document.querySelectorAll('textarea[data-notice]').forEach((el) => {
    el.addEventListener('input', () => {
      state.notice = state.notice || {};
      state.notice[el.dataset.notice] = el.value;
      save();
    });
  });
  document.querySelectorAll('textarea[data-gram]').forEach((el) => {
    el.addEventListener('input', () => {
      state.gram = state.gram || {};
      state.gram[el.dataset.gram] = el.value;
      save();
    });
  });
  document.querySelectorAll('textarea[data-rd]').forEach((el) => {
    el.addEventListener('input', () => {
      state.read = state.read || {};
      state.read[el.dataset.rd] = el.value;
      save();
    });
  });
  if (i === 2) bindPractice();
  if (i === 3) bindReading();
  if (i === 4) bindSpeaking();
  if (i === 5) bindWriting();
}
function bindPractice() {
  document.querySelectorAll('.quiz-opt').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.qid;
      const val = btn.dataset.val;
      const q = btn.closest('[data-quiz]');
      const ans = q.dataset.answer;
      state.quiz = state.quiz || {};
      state.quiz[id] = val;
      save();
      q.querySelectorAll('.quiz-opt').forEach((b) => {
        b.classList.remove('selected', 'correct', 'wrong');
        if (b.dataset.val === val) {
          b.classList.add(val === ans ? 'correct' : 'wrong');
        }
      });
    });
  });
  document.querySelectorAll('.check-fix').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.fixBtn;
      const q = btn.closest('[data-fix]');
      const input = q.querySelector(`[data-fix-in="${id}"]`);
      const fb = q.querySelector(`[data-fix-fb="${id}"]`);
      const ok = norm(input.value) === norm(q.dataset.textAnswer);
      state.fix = state.fix || {};
      state.fix[id] = input.value;
      save();
      fb.textContent = ok ? 'Correct!' : `Try again. Model: ${q.dataset.textAnswer}`;
      fb.className = `feedback ${ok ? 'ok' : 'bad'}`;
    });
  });
  document.querySelectorAll('[data-fix-in]').forEach((el) => {
    el.addEventListener('input', () => {
      state.fix = state.fix || {};
      state.fix[el.dataset.fixIn] = el.value;
      save();
    });
  });
}
function bindReading() {
  document.querySelectorAll('.tf-opt').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.tfid;
      const val = btn.dataset.val;
      const q = btn.closest('[data-tf]');
      const ans = q.dataset.answer;
      state.tf = state.tf || {};
      state.tf[id] = val;
      save();
      q.querySelectorAll('.tf-opt').forEach((b) => {
        b.classList.remove('selected', 'correct', 'wrong');
        if (b.dataset.val === val) b.classList.add(val === ans ? 'correct' : 'wrong');
      });
    });
  });
}
let timerTick = null;
function bindSpeaking() {
  const prompts = [
    'MAKE — Say two things you make and one thing you don’t make.',
    'USE — Name something you use daily and something you rarely use.',
    'BELIEVE — Say something you believe and something you don’t believe.',
    'NEED — Say three things you need every day.',
    'CALL — Who do you call often? Who don’t you call often?',
    'PLAY — Say one game you play and one you don’t play.',
    'THINK — Say what you think about learning English.',
    'LIVE — Describe where someone in your family lives.'
  ];
  document.getElementById('nextSpeak').addEventListener('click', () => {
    let n;
    do { n = Math.floor(Math.random() * prompts.length); } while (n === (state.speakIndex || 0) && prompts.length > 1);
    state.speakIndex = n;
    save();
    document.getElementById('promptCard').textContent = prompts[n];
  });
  document.querySelectorAll('[data-fsn]').forEach((el) => {
    el.addEventListener('input', () => {
      state.fsn = state.fsn || {};
      state.fsn[el.dataset.fsn] = el.value;
      save();
    });
  });
  const reflect = document.querySelector('textarea[data-sp="reflect"]');
  if (reflect) reflect.addEventListener('input', () => { state.speakNote = reflect.value; save(); });
  const timer = document.getElementById('timer');
  let seconds = 30;
  document.getElementById('timerStart').addEventListener('click', () => {
    clearInterval(timerTick);
    seconds = 30;
    timer.textContent = seconds;
    timerTick = setInterval(() => {
      seconds--;
      timer.textContent = seconds;
      if (seconds <= 0) { clearInterval(timerTick); timer.textContent = 'Time!'; }
    }, 1000);
  });
  document.getElementById('timerReset').addEventListener('click', () => {
    clearInterval(timerTick);
    seconds = 30;
    timer.textContent = '30';
  });
}
function bindWriting() {
  const box = document.getElementById('writingBox');
  box.addEventListener('input', () => { state.writing = box.value; save(); });
  document.querySelectorAll('[data-writechk]').forEach((el) => {
    el.addEventListener('change', () => {
      state.writechk = state.writechk || {};
      state.writechk[el.dataset.writechk] = el.checked;
      save();
    });
  });
  document.querySelectorAll('[data-cando]').forEach((el) => {
    el.addEventListener('change', () => {
      state.cando = state.cando || {};
      state.cando[el.dataset.cando] = el.checked;
      save();
    });
  });
}
document.getElementById('tabs').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-tab]');
  if (btn) openTab(Number(btn.dataset.tab));
});
renderTabs();
