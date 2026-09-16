const sections = ['1 Notice', '2 Grammar', '3 Practice', '4 Listening', '5 Reading', '6 Speaking', '7 Writing'];
const KEY = 'a12SpQuestionsTabsV1';
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
  3: () => listeningHTML(),
  4: () => readingHTML(),
  5: () => speakingHTML(),
  6: () => writingHTML()
};
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;', "'":'&#39;' }[c]));
}
function norm(s) {
  return String(s).trim().toLowerCase().replace(/[’‘']/g, "'").replace(/\s+/g, ' ').replace(/[.!?]+$/, '');
}

function noticeHTML() {
  return `
    <h4>Notice the question pattern</h4>
    <p class="intro">Read aloud. After <strong>do/does</strong>, the verb stays in the <strong>base</strong> form. Short answers match the helper.</p>
    <div class="scene">
      <div class="zone">
        <div class="who"><div class="avatar">1</div><div><strong>Do + I/you/we/they</strong><span>+ base</span></div></div>
        <div class="bubble on" style="cursor:default"><strong>Do</strong> you work on Saturdays?<br>Yes, I <strong>do</strong>. / No, we <strong>don’t</strong>.</div>
        <p class="intro" style="margin-top:8px"><em>Write one new Do question + short answer.</em></p>
        <textarea data-notice="a" placeholder="Do you…? Yes, I do. / No, I don’t.">${escapeHtml((state.notice||{}).a||'')}</textarea>
      </div>
      <div class="zone">
        <div class="who"><div class="avatar">2</div><div><strong>Does + he/she/it</strong><span>+ base</span></div></div>
        <div class="bubble on" style="cursor:default"><strong>Does</strong> Elena start at eight?<br>Yes, she <strong>does</strong>. / No, he <strong>doesn’t</strong>.</div>
        <p class="intro" style="margin-top:8px"><em>Write one new Does question + short answer.</em></p>
        <textarea data-notice="b" placeholder="Does she…? Yes, she does.">${escapeHtml((state.notice||{}).b||'')}</textarea>
      </div>
      <div class="zone">
        <div class="who"><div class="avatar">3</div><div><strong>Light WH</strong><span>same do/does engine</span></div></div>
        <div class="bubble on" style="cursor:default">What <strong>do</strong> you study?<br>Where <strong>does</strong> Omar live?<br>When <strong>do</strong> they finish?</div>
        <p class="intro" style="margin-top:8px"><em>Write one WH question with do and one with does.</em></p>
        <textarea data-notice="c" placeholder="What do…? Where does…?">${escapeHtml((state.notice||{}).c||'')}</textarea>
      </div>
      <div class="zone">
        <div class="who"><div class="avatar">4</div><div><strong>Trap</strong><span>base after does</span></div></div>
        <div class="bubble on" style="cursor:default">Does he <strong>like</strong> coffee? ✓<br>Does he likes coffee? ✗</div>
        <p class="intro" style="margin-top:8px"><em>Why is “Does he likes?” wrong?</em></p>
        <textarea data-notice="d" placeholder="Because…">${escapeHtml((state.notice||{}).d||'')}</textarea>
      </div>
    </div>
    <div class="tip"><strong>Think first:</strong> Question helper = do/does. Verb after helper = always base. Short answer reuses do/does/don’t/doesn’t.</div>
  `;
}

function grammarHTML() {
  return `
    <h4>Structure · do / does + short answers</h4>
    <p class="intro">Lock the two subject teams. Then analyse.</p>
    <div class="grid2">
      <div class="card mint">
        <div class="label">Do + I / you / we / they</div>
        <p class="big-rule">+ base · Yes, … do / No, … don’t</p>
        <div class="example">Do they need help?</div>
        <div class="example">Yes, they do. / No, they don’t.</div>
      </div>
      <div class="card">
        <div class="label">Does + he / she / it</div>
        <p class="big-rule">+ base · Yes, … does / No, … doesn’t</p>
        <div class="example">Does Kenji play tennis?</div>
        <div class="example">Yes, he does. / No, he doesn’t.</div>
      </div>
    </div>
    <div class="card soft" style="margin-top:12px">
      <div class="label">Light WH</div>
      <div class="example">What do you study? · Where does she work? · When do they finish?</div>
    </div>
    <div class="note"><strong>Traps:</strong> Does he likes? ✗ · Do she work? ✗ · Does they live…? ✗ · Yes, she do. ✗</div>
    <h5>Analysis</h5>
    <p class="intro">1. Flip to a question: <strong>“Elena starts at eight.”</strong> Write the question and explain the helper.</p>
    <textarea data-gram="1" placeholder="Does Elena…? Because…">${escapeHtml((state.gram||{})['1']||'')}</textarea>
    <p class="intro">2. Why is <strong>“Does he likes coffee?”</strong> wrong? Rewrite it.</p>
    <textarea data-gram="2" placeholder="Because… Correct:">${escapeHtml((state.gram||{})['2']||'')}</textarea>
    <p class="intro">3. Give a matching short answer for: <strong>“Do they need help?”</strong> (yes) and <strong>“Does she work from home?”</strong> (no).</p>
    <textarea data-gram="3" placeholder="Yes, they do. / No, she doesn’t.">${escapeHtml((state.gram||{})['3']||'')}</textarea>
  `;
}

function practiceHTML() {
  const quiz = [
    { id: '1', q: "Ask about Nina’s home.", opts: ['Do she live near here?', 'Does she live near here?', 'Does she lives near here?'], ans: 'Does she live near here?' },
    { id: '2', q: 'Ask about Tomás and Rita.', opts: ['Does they need help?', 'Do they needs help?', 'Do they need help?'], ans: 'Do they need help?' },
    { id: '3', q: "Ask about Kenji’s sport.", opts: ['Does he play tennis?', 'Does he plays tennis?', 'Do he play tennis?'], ans: 'Does he play tennis?' },
    { id: '4', q: 'Ask your partner.', opts: ['Does you study English?', 'Do you study English?', 'Do you studies English?'], ans: 'Do you study English?' },
    { id: '5', q: 'Ask where Priya works.', opts: ['Where do she work?', 'Where does she works?', 'Where does she work?'], ans: 'Where does she work?' }
  ];
  const fixes = [
    { id: '1', wrong: 'Does he likes coffee?', ans: 'Does he like coffee?' },
    { id: '2', wrong: 'Does they live in León?', ans: 'Do they live in León?' },
    { id: '3', wrong: 'Do she work from home?', ans: 'Does she work from home?' },
    { id: '4', wrong: 'What does you need?', ans: 'What do you need?' },
    { id: '5', wrong: 'Does it starts at nine?', ans: 'Does it start at nine?' }
  ];
  const quizAns = state.quiz || {};
  const fixAns = state.fix || {};
  return `
    <h4>Practice · choose &amp; fix</h4>
    <h5>A · Choose the correct question</h5>
    ${quiz.map((it) => `
      <div class="q" data-quiz="${it.id}" data-answer="${escapeHtml(it.ans)}">
        <p>${it.id}. ${escapeHtml(it.q)}</p>
        <div class="opts">
          ${it.opts.map((o) => {
            const sel = quizAns[it.id] === o ? ' selected' : '';
            return `<button type="button" class="opt quiz-opt${sel}" data-qid="${it.id}" data-val="${escapeHtml(o)}">${escapeHtml(o)}</button>`;
          }).join('')}
        </div>
      </div>`).join('')}
    <h5>B · Fix the question</h5>
    <p class="intro">Type the corrected question, including the question mark.</p>
    ${fixes.map((it) => `
      <div class="q" data-fix="${it.id}" data-text-answer="${escapeHtml(it.ans)}">
        <p>${it.id}. ${escapeHtml(it.wrong)}</p>
        <div class="inline">
          <input type="text" data-fix-in="${it.id}" value="${escapeHtml(fixAns[it.id]||'')}" aria-label="Correction ${it.id}">
          <button type="button" class="btn check-fix" data-fix-btn="${it.id}">Check</button>
        </div>
        <p class="feedback" data-fix-fb="${it.id}"></p>
      </div>`).join('')}
  `;
}

function listeningHTML() {
  const aq = [
    { id: '1', cue: 'Yes, I do. It designs apps for small shops.', ans: 'Do you know the company?' },
    { id: '2', cue: "No, she doesn’t. She speaks English and Portuguese.", ans: 'Does the manager speak Spanish?' },
    { id: '3', cue: 'The interview starts at ten.', ans: 'What time do you start?' },
    { id: '4', cue: "No, she doesn’t. She works downtown on Thursdays.", ans: 'Does Elena go with you?' },
    { id: '5', cue: "Yes, they do. They don’t decide today.", ans: 'Do they call successful candidates on Friday?' },
    { id: '6', cue: 'Yes, she does. The manager asks about that.', ans: 'Does she use design tools every week?' }
  ];
  const tf = [
    { id: '1', text: 'Nadia already knows something about the company before the interview.', ans: 'True' },
    { id: '2', text: 'The manager speaks Spanish with candidates.', ans: 'False' },
    { id: '3', text: 'Nadia leaves home more than an hour before the interview.', ans: 'True' },
    { id: '4', text: 'Elena goes to the interview with Nadia.', ans: 'False' },
    { id: '5', text: 'Nadia feels calm because she thinks her answers went well. (inference)', ans: 'True' },
    { id: '6', text: 'Nadia gets the job on Thursday.', ans: 'False' }
  ];
  const listenA = state.listenA || {};
  const tfAns = state.listenTf || {};
  return `
    <h4>Listening · Nadia’s interview day</h4>
    <p class="intro">Play the audio first. Keep the script closed until Part A is done. Then answer → question and True/False.</p>
    <div class="listen-box">
      <div class="audio-bar">
        <audio controls preload="metadata" controlsList="nodownload">
          <source src="assets/nadia-interview.mp3" type="audio/mpeg">
        </audio>
      </div>
      <button type="button" class="script-btn" id="scriptBtn" aria-expanded="false">Show script</button>
      <div class="script-panel" id="scriptPanel">
        <div class="reading" style="margin:0">
          <p><strong>Nadia has a job interview on Thursday at PixelNest,</strong> a small company that designs apps for shops. Her brother Luca asks her questions after breakfast.</p>
          <p><strong>Luca:</strong> Do you know the company?<br><strong>Nadia:</strong> Yes, I do. It designs apps for small shops. I read about them online last night.<br><strong>Luca:</strong> Does the manager speak Spanish?<br><strong>Nadia:</strong> No, she doesn’t. She speaks English and Portuguese. I practice my English answers on the bus.<br><strong>Luca:</strong> What time do you start?<br><strong>Nadia:</strong> The interview starts at ten. I don’t want to arrive late, so I leave home at eight fifteen. The office is near the river.<br><strong>Luca:</strong> Does Elena go with you?<br><strong>Nadia:</strong> No, she doesn’t. She works downtown on Thursdays. But she texts me before I enter the building.<br><strong>Luca:</strong> Do you take a portfolio?<br><strong>Nadia:</strong> Yes, I do. I show three app screens and one shop logo.</p>
          <p><strong>After the interview, Nadia calls Luca.</strong> She feels calm. The manager asks about her schedule, her English, and whether she uses design tools every week. Nadia answers carefully. She doesn’t get the job today — they call successful candidates on Friday — but she thinks the questions went well. Luca says he is proud of her.</p>
        </div>
      </div>
    </div>
    <h5>A · Answer → question</h5>
    <p class="intro">Write the Do / Does (or light WH) question that fits each cue.</p>
    ${aq.map((it) => `
      <div class="q" data-fix="${it.id}" data-text-answer="${escapeHtml(it.ans)}">
        <p>${it.id}. Cue: <span class="cue">${escapeHtml(it.cue)}</span></p>
        <div class="inline">
          <input type="text" data-fix-in="${it.id}" value="${escapeHtml(listenA[it.id]||'')}" placeholder="Do / Does…?" aria-label="Listening Q${it.id}">
          <button type="button" class="btn check-fix" data-fix-btn="${it.id}">Check</button>
        </div>
        <p class="feedback" data-fix-fb="${it.id}"></p>
      </div>`).join('')}
    <h5>B · True / False (some need inference)</h5>
    ${tf.map((it) => `
      <div class="q" data-tf="${it.id}" data-answer="${it.ans}">
        <p>${it.id}. ${escapeHtml(it.text)}</p>
        <div class="opts">
          <button type="button" class="opt tf-opt${tfAns[it.id]==='True'?' selected':''}" data-tfid="${it.id}" data-val="True">True</button>
          <button type="button" class="opt tf-opt${tfAns[it.id]==='False'?' selected':''}" data-tfid="${it.id}" data-val="False">False</button>
        </div>
      </div>`).join('')}
  `;
}

function readingHTML() {
  const mc = [
    { id: '1', q: 'Main idea: What is this email mainly about?', opts: ["Amira’s first week at a co-working space", 'How to buy cheap coffee', "Omar’s trip to a bakery"], ans: "Amira’s first week at a co-working space" },
    { id: '2', q: 'Word in context: In this email, co-working space means…', opts: ['a place where people share desks to work', 'a school for bakers only', "Omar’s house"], ans: 'a place where people share desks to work' },
    { id: '3', q: 'Inference: Amira probably wants to save money on drinks.', opts: ['True', 'False'], ans: 'True' },
    { id: '4', q: 'Inference: Leila never meets clients face to face.', opts: ['True', 'False'], ans: 'False' }
  ];
  const writeQ = [
    { id: '5', prompt: 'Sentence: No, she doesn’t. She comes to the co-working space four days a week. (about Leila)', ans: 'Does she work from home?' },
    { id: '6', prompt: 'Sentence: Amira asks Hiro this at the end of the email.', ans: 'Do you still study design at night?' }
  ];
  const mcAns = state.readMc || {};
  const wAns = state.readW || {};
  return `
    <h4>Reading · Amira’s first week</h4>
    <p class="intro">Read carefully. Some items need thinking, not copying.</p>
    <div class="reading">
      <p><strong>From:</strong> Amira Hassan<br><strong>To:</strong> Hiro Tanaka<br><strong>Subject:</strong> My first week at Bright Desk</p>
      <p>Hi Hiro,</p>
      <p>I start early at Bright Desk. The building opens at seven, and I usually arrive at seven twenty. I bring my laptop and a small lunch. The café downstairs sells good tea, but I don’t buy coffee every day — it’s expensive.</p>
      <p>My desk partner is named Leila. She designs websites for clinics. Does she work from home? No, she doesn’t. She comes to the co-working space four days a week. On Fridays she visits clients. We share headphones when the room gets noisy.</p>
      <p>The community manager, Omar, speaks English and Arabic. He doesn’t check our screens, but he asks members about their goals every Monday. I like that. This week I finish a short landing page for a bakery. Next week I need help with photos.</p>
      <p>Do you still study design at night? Write soon.</p>
      <p>— Amira</p>
    </div>
    ${mc.map((it) => `
      <div class="q" data-quiz="${it.id}" data-answer="${escapeHtml(it.ans)}">
        <p>${it.id}. ${escapeHtml(it.q)}</p>
        <div class="opts">
          ${it.opts.map((o) => {
            const sel = mcAns[it.id] === o ? ' selected' : '';
            return `<button type="button" class="opt quiz-opt${sel}" data-qid="${it.id}" data-val="${escapeHtml(o)}">${escapeHtml(o)}</button>`;
          }).join('')}
        </div>
      </div>`).join('')}
    <h5>Write the question</h5>
    ${writeQ.map((it) => `
      <div class="q" data-fix="${it.id}" data-text-answer="${escapeHtml(it.ans)}">
        <p>${it.id}. ${escapeHtml(it.prompt)}</p>
        <div class="inline">
          <input type="text" data-fix-in="${it.id}" value="${escapeHtml(wAns[it.id]||'')}" placeholder="Do / Does…?" aria-label="Reading Q${it.id}">
          <button type="button" class="btn check-fix" data-fix-btn="${it.id}">Check</button>
        </div>
        <p class="feedback" data-fix-fb="${it.id}"></p>
      </div>`).join('')}
  `;
}

function speakingHTML() {
  const names = state.fsn || {};
  const items = [
    ['msg', 'checks messages before breakfast'],
    ['night', 'studies English at night'],
    ['coffee', "doesn't drink coffee"],
    ['sport', 'plays a team sport'],
    ['weekend', 'works or studies on weekends'],
    ['family', 'calls family every week']
  ];
  const prompts = [
    'PROMPT — Ask if your partner drinks tea every morning.',
    'PROMPT — Ask if Kenji plays soccer on Sundays.',
    'PROMPT — Ask where your partner studies.',
    'PROMPT — Ask when Priya finishes work.',
    'PROMPT — Ask if they need help with homework.',
    'PROMPT — Ask what Omar usually cooks.',
    'PROMPT — Ask if Elena works from home.',
    'PROMPT — Ask if your partner calls family every week.',
    'PROMPT — Ask if Amira arrives early.',
    'PROMPT — Ask whether Leila works from home.'
  ];
  const i = state.speakIndex || 0;
  return `
    <h4>Speaking · Find someone who… + Hot seat / Speed ask</h4>
    <p class="intro">Ask classmates <strong>Do you…?</strong> Write the name + one follow-up. Then Hot seat (short answers only) or Speed ask.</p>
    <h5>Find someone who…</h5>
    <div class="grid2">
      ${items.map(([id, label]) => `
        <label class="card">${escapeHtml(label)}
          <input type="text" data-fsn="${id}" placeholder="Name + detail" value="${escapeHtml(names[id]||'')}">
        </label>`).join('')}
    </div>
    <h5>Hot seat</h5>
    <div class="grid2">
      <div class="card">
        <div class="label">Question bank</div>
        <p>Do you wake up early?<br>Do you cook at home?<br>Does your family eat together?<br>Do you study on weekends?<br>Does anyone in your house work from home?<br>What do you usually do after class?<br>When do you finish your homework?<br>Where do you buy lunch?</p>
      </div>
      <div class="card">
        <div class="label">Hot-seat notes</div>
        <textarea data-sp="hotseat" placeholder="Student in the seat:&#10;Clean questions I asked:&#10;Short answers I heard:">${escapeHtml(state.hotseat||'')}</textarea>
      </div>
    </div>
    <div class="tip"><strong>Rules:</strong> +1 for a clean Do/Does question · +1 for a matching short answer · ban full-sentence answers for one round.</div>
    <h5>Speed ask</h5>
    <div class="prompt-card" id="promptCard">${escapeHtml(prompts[i % prompts.length])}</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;justify-content:center">
      <button type="button" class="btn" id="nextSpeak">New random card</button>
    </div>
    <div class="timer" id="timer">30</div>
    <div style="text-align:center;display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
      <button type="button" class="btn" id="timerStart">Start</button>
      <button type="button" class="btn ghost" id="timerReset">Reset</button>
    </div>
  `;
}

function writingHTML() {
  const c = state.cando || {};
  const items = [
    ['ask', 'I can ask Yes/No questions with do / does + base.'],
    ['short', 'I can answer with Yes, I do / No, she doesn’t.'],
    ['wh', 'I can ask light WH questions (What / Where / When).'],
    ['trap', 'I can fix traps (Does he likes? / Do she…?).'],
    ['listen', 'I can turn answers into questions after a short listen.'],
    ['produce', 'I can interview a classmate about real habits.']
  ];
  return `
    <h4>Writing · exit ticket + can-do</h4>
    <p class="intro">Write 2 Yes/No questions (mix Do + Does), 1 light WH question, and matching short answers about YOUR week.</p>
    <textarea id="writingBox" style="min-height:160px" placeholder="Do you…? Yes, I do.&#10;Does she…? No, she doesn’t.&#10;Where do you…?">${escapeHtml(state.writing||'')}</textarea>
    <div class="cando" style="margin-top:12px">
      <label><input type="checkbox" data-writechk="mix" ${(state.writechk||{}).mix?'checked':''}> I mixed Do and Does.</label>
      <label><input type="checkbox" data-writechk="base" ${(state.writechk||{}).base?'checked':''}> Verbs after do/does are base form.</label>
      <label><input type="checkbox" data-writechk="short" ${(state.writechk||{}).short?'checked':''}> Short answers match the helper.</label>
    </div>
    <h5>Can-do</h5>
    <div class="cando">
      ${items.map(([id, label]) => `
        <label><input type="checkbox" data-cando="${id}" ${c[id]?'checked':''}><span>${label}</span></label>`).join('')}
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
  document.getElementById('panels').innerHTML = `<div class="panel active">${panels[i]()}</div>`;
  bindPanel(i);
}
function bindPanel(i) {
  document.querySelectorAll('textarea[data-notice]').forEach((el) => {
    el.addEventListener('input', () => { state.notice = state.notice || {}; state.notice[el.dataset.notice] = el.value; save(); });
  });
  document.querySelectorAll('textarea[data-gram]').forEach((el) => {
    el.addEventListener('input', () => { state.gram = state.gram || {}; state.gram[el.dataset.gram] = el.value; save(); });
  });
  if (i === 2) { bindQuiz(); bindFix('quiz'); }
  if (i === 3) { bindListening(); bindFix('listenA'); bindTf('listenTf'); }
  if (i === 4) { bindQuiz('readMc'); bindFix('readW'); }
  if (i === 5) bindSpeaking();
  if (i === 6) bindWriting();
}
function bindQuiz(storeKey) {
  const key = storeKey || 'quiz';
  document.querySelectorAll('.quiz-opt').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.qid;
      const val = btn.dataset.val;
      const q = btn.closest('[data-quiz]');
      const ans = q.dataset.answer;
      state[key] = state[key] || {};
      state[key][id] = val;
      save();
      q.querySelectorAll('.quiz-opt').forEach((b) => {
        b.classList.remove('selected', 'correct', 'wrong');
        if (b.dataset.val === val) b.classList.add(val === ans ? 'correct' : 'wrong');
      });
    });
  });
}
function bindFix(storeKey) {
  const key = storeKey || 'fix';
  document.querySelectorAll('.check-fix').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.fixBtn;
      const q = btn.closest('[data-fix]');
      const input = q.querySelector(`[data-fix-in="${id}"]`);
      const fb = q.querySelector(`[data-fix-fb="${id}"]`);
      const ok = norm(input.value) === norm(q.dataset.textAnswer);
      state[key] = state[key] || {};
      state[key][id] = input.value;
      save();
      fb.textContent = ok ? 'Correct!' : `Try again. Model: ${q.dataset.textAnswer}`;
      fb.className = `feedback ${ok ? 'ok' : 'bad'}`;
    });
  });
  document.querySelectorAll('[data-fix-in]').forEach((el) => {
    el.addEventListener('input', () => {
      state[key] = state[key] || {};
      state[key][el.dataset.fixIn] = el.value;
      save();
    });
  });
}
function bindTf(storeKey) {
  const key = storeKey || 'tf';
  document.querySelectorAll('.tf-opt').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.tfid;
      const val = btn.dataset.val;
      const q = btn.closest('[data-tf]');
      const ans = q.dataset.answer;
      state[key] = state[key] || {};
      state[key][id] = val;
      save();
      q.querySelectorAll('.tf-opt').forEach((b) => {
        b.classList.remove('selected', 'correct', 'wrong');
        if (b.dataset.val === val) b.classList.add(val === ans ? 'correct' : 'wrong');
      });
    });
  });
}
function bindListening() {
  const scriptBtn = document.getElementById('scriptBtn');
  const scriptPanel = document.getElementById('scriptPanel');
  scriptBtn?.addEventListener('click', () => {
    const open = scriptPanel.classList.toggle('show');
    scriptBtn.textContent = open ? 'Hide script' : 'Show script';
    scriptBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}
let timerTick = null;
function bindSpeaking() {
  const prompts = [
    'PROMPT — Ask if your partner drinks tea every morning.',
    'PROMPT — Ask if Kenji plays soccer on Sundays.',
    'PROMPT — Ask where your partner studies.',
    'PROMPT — Ask when Priya finishes work.',
    'PROMPT — Ask if they need help with homework.',
    'PROMPT — Ask what Omar usually cooks.',
    'PROMPT — Ask if Elena works from home.',
    'PROMPT — Ask if your partner calls family every week.',
    'PROMPT — Ask if Amira arrives early.',
    'PROMPT — Ask whether Leila works from home.'
  ];
  document.getElementById('nextSpeak').addEventListener('click', () => {
    let n;
    do { n = Math.floor(Math.random() * prompts.length); } while (n === (state.speakIndex || 0) && prompts.length > 1);
    state.speakIndex = n;
    save();
    document.getElementById('promptCard').textContent = prompts[n];
  });
  document.querySelectorAll('[data-fsn]').forEach((el) => {
    el.addEventListener('input', () => { state.fsn = state.fsn || {}; state.fsn[el.dataset.fsn] = el.value; save(); });
  });
  const hs = document.querySelector('textarea[data-sp="hotseat"]');
  if (hs) hs.addEventListener('input', () => { state.hotseat = hs.value; save(); });
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
    clearInterval(timerTick); seconds = 30; timer.textContent = '30';
  });
}
function bindWriting() {
  const box = document.getElementById('writingBox');
  box.addEventListener('input', () => { state.writing = box.value; save(); });
  document.querySelectorAll('[data-writechk]').forEach((el) => {
    el.addEventListener('change', () => { state.writechk = state.writechk || {}; state.writechk[el.dataset.writechk] = el.checked; save(); });
  });
  document.querySelectorAll('[data-cando]').forEach((el) => {
    el.addEventListener('change', () => { state.cando = state.cando || {}; state.cando[el.dataset.cando] = el.checked; save(); });
  });
}
document.getElementById('tabs').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-tab]');
  if (btn) openTab(Number(btn.dataset.tab));
});
renderTabs();
