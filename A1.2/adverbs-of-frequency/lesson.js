const sections = ['1 Notice', '2 Grammar', '3 Practice', '4 Listening', '5 Reading', '6 Speaking', '7 Writing'];
const KEY = 'a12AdverbsFreqTabsV1';
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
    <h4>Notice the frequency pattern</h4>
    <p class="intro">Read the scale and the position rules. With <strong>be</strong>, the adverb comes <strong>after</strong>; with other verbs, it comes <strong>before</strong>.</p>
    <div class="scale" aria-label="Frequency scale">
      <span><em>never</em>0%</span>
      <span><em>rarely</em>seldom</span>
      <span><em>sometimes</em>~50%</span>
      <span><em>often</em></span>
      <span><em>usually</em></span>
      <span><em>always</em>100%</span>
    </div>
    <div class="scene">
      <div class="zone">
        <div class="who"><div class="avatar">1</div><div><strong>Before the main verb</strong><span>subject + adverb + verb</span></div></div>
        <div class="bubble on" style="cursor:default">I <strong>usually</strong> drink tea.<br>She <strong>often</strong> studies at night.<br>They <strong>never</strong> eat fish.</div>
        <p class="intro" style="margin-top:8px"><em>Write two before-verb sentences about you.</em></p>
        <textarea data-notice="a" placeholder="I usually… / I never…">${escapeHtml((state.notice||{}).a||'')}</textarea>
      </div>
      <div class="zone">
        <div class="who"><div class="avatar">2</div><div><strong>After be</strong><span>am / is / are + adverb</span></div></div>
        <div class="bubble on" style="cursor:default">He <strong>is always</strong> early.<br>We <strong>are sometimes</strong> tired.<br>It <strong>is rarely</strong> quiet here.</div>
        <p class="intro" style="margin-top:8px"><em>Write two after-be sentences.</em></p>
        <textarea data-notice="b" placeholder="I am sometimes… / She is always…">${escapeHtml((state.notice||{}).b||'')}</textarea>
      </div>
      <div class="zone">
        <div class="who"><div class="avatar">3</div><div><strong>How often…?</strong><span>ask about habits</span></div></div>
        <div class="bubble on" style="cursor:default">How often <strong>do</strong> you cook?<br>How often <strong>does</strong> Remy go to the gym?<br>How often <strong>are</strong> you late?</div>
        <p class="intro" style="margin-top:8px"><em>Write one How often do… and one How often are…</em></p>
        <textarea data-notice="c" placeholder="How often do you…? How often are you…?">${escapeHtml((state.notice||{}).c||'')}</textarea>
      </div>
      <div class="zone">
        <div class="who"><div class="avatar">4</div><div><strong>Trap</strong><span>wrong seat</span></div></div>
        <div class="bubble on" style="cursor:default">I usually drink tea. ✓<br>I drink usually tea. ✗<br>She is always happy. ✓<br>She always is happy. ✗</div>
        <p class="intro" style="margin-top:8px"><em>Explain the two position rules in your own words.</em></p>
        <textarea data-notice="d" placeholder="Before verb… After be…">${escapeHtml((state.notice||{}).d||'')}</textarea>
      </div>
    </div>
  `;
}

function grammarHTML() {
  return `
    <h4>Structure · scale + position</h4>
    <p class="intro">Study the forms. Then answer the analysis questions.</p>
    <div class="grid2">
      <div class="card mint">
        <div class="label">Before main verb</div>
        <p class="big-rule">subject + adverb + verb</p>
        <div class="example">Yuki usually walks to work.</div>
        <div class="example">They never eat meat.</div>
        <div class="times"><span>never</span><span>rarely</span><span>sometimes</span><span>often</span><span>usually</span><span>always</span></div>
      </div>
      <div class="card">
        <div class="label">After be</div>
        <p class="big-rule">subject + be + adverb</p>
        <div class="example">Nora is always kind.</div>
        <div class="example">We are sometimes busy on Fridays.</div>
        <div class="times"><span>How often do…?</span><span>How often does…?</span><span>How often are…?</span></div>
      </div>
    </div>
    <div class="note"><strong>Traps:</strong> I drink usually tea. ✗ · She always is happy. ✗ · How often you study? ✗</div>
    <h5>Analysis</h5>
    <p class="intro">1. Why is <strong>“I drink usually tea”</strong> wrong? Rewrite it and name the rule.</p>
    <textarea data-gram="1" placeholder="Because… Correct:">${escapeHtml((state.gram||{})['1']||'')}</textarea>
    <p class="intro">2. Why is <strong>“She always is kind”</strong> wrong with be? Rewrite it.</p>
    <textarea data-gram="2" placeholder="Because… Correct:">${escapeHtml((state.gram||{})['2']||'')}</textarea>
    <p class="intro">3. Write one How often question with a main verb and one with be. Answer both about yourself.</p>
    <textarea data-gram="3" placeholder="How often do you…? I… / How often are you…? I am…">${escapeHtml((state.gram||{})['3']||'')}</textarea>
  `;
}

function practiceHTML() {
  const quiz = [
    { id: '1', q: 'Yuki walks to work most days (not every day).', opts: ['Yuki walks usually to work.', 'Yuki usually walks to work.', 'Yuki walks to work usually always.'], ans: 'Yuki usually walks to work.' },
    { id: '2', q: 'Nora = kind every time people meet her.', opts: ['Nora always is kind.', 'Nora is always kind.', 'Nora is kind always never.'], ans: 'Nora is always kind.' },
    { id: '3', q: 'Hassan and Bea do not eat meat — 0%.', opts: ['They eat never meat.', 'They never eat meat.', 'They are never eat meat.'], ans: 'They never eat meat.' },
    { id: '4', q: "Ask about Ivan’s tennis habit.", opts: ['How often Ivan plays tennis?', 'How often does Ivan play tennis?', 'How often is Ivan play tennis?'], ans: 'How often does Ivan play tennis?' },
    { id: '5', q: 'About half the Fridays, the team is busy.', opts: ['We sometimes are busy on Fridays.', 'We are sometimes busy on Fridays.', 'We busy are sometimes on Fridays.'], ans: 'We are sometimes busy on Fridays.' },
    { id: '6', q: 'Fatima almost never watches TV.', opts: ['Fatima watches rarely TV.', 'Fatima rarely watches TV.', 'Fatima is rarely watches TV.'], ans: 'Fatima rarely watches TV.' }
  ];
  const fixes = [
    { id: '1', wrong: 'I wake usually up early.', ans: 'I usually wake up early.' },
    { id: '2', wrong: 'She often is tired after work.', ans: 'She is often tired after work.' },
    { id: '3', wrong: 'They drink never coffee.', ans: 'They never drink coffee.' },
    { id: '4', wrong: 'How often you study English?', ans: 'How often do you study English?' },
    { id: '5', wrong: 'We always are happy to help.', ans: 'We are always happy to help.' },
    { id: '6', wrong: 'He cooks sometimes pasta.', ans: 'He sometimes cooks pasta.' }
  ];
  const quizAns = state.quiz || {};
  const fixAns = state.fix || {};
  return `
    <h4>Practice · choose &amp; fix</h4>
    <h5>A · Choose the correct form</h5>
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
    <h5>B · Fix the sentence</h5>
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
  const detail = [
    { id: '1', q: 'How often does Remy study English?', opts: ['always · every night', 'usually · four nights a week', 'never · he only watches TV'], ans: 'usually · four nights a week' },
    { id: '2', q: 'About drinks…', opts: ['always coffee in the morning', 'often tea; never coffee after lunch', 'never drinks anything hot'], ans: 'often tea; never coffee after lunch' },
    { id: '3', q: 'Remy and lateness:', opts: ['always late every day', 'sometimes on Mondays; never on Wednesdays', 'rarely late only on Fridays'], ans: 'sometimes on Mondays; never on Wednesdays' },
    { id: '4', q: 'How often does Yuki go to the gym?', opts: ['never', 'usually three times a week', 'always every morning at 5'], ans: 'usually three times a week' }
  ];
  const tf = [
    { id: '5', text: "Remy’s hardest mornings are probably Mondays. (inference)", ans: 'True' },
    { id: '6', text: 'Yuki watches a lot of TV at night.', ans: 'False' },
    { id: '7', text: 'Priya wants to avoid planning hard practice on Monday. (inference)', ans: 'True' }
  ];
  const dAns = state.listenD || {};
  const tfAns = state.listenTf || {};
  return `
    <h4>Listening · Remy’s week</h4>
    <p class="intro">Play the audio first. Keep the script closed until Part A is done. Placeholder audio is fine until the final file lands.</p>
    <div class="listen-box">
      <div class="audio-bar">
        <audio controls preload="metadata" controlsList="nodownload">
          <source src="assets/remy-week.mp3" type="audio/mpeg">
        </audio>
      </div>
      <button type="button" class="script-btn" id="scriptBtn" aria-expanded="false">Show script</button>
      <div class="script-panel" id="scriptPanel">
        <div class="reading" style="margin:0">
          <p><strong>Priya asks Remy about his habits</strong> before they plan a study group.</p>
          <p><strong>Priya:</strong> How often do you study English?<br><strong>Remy:</strong> I usually study four nights a week. On Fridays I rarely open my notebook — I’m tired.<br><strong>Priya:</strong> Do you always drink coffee in the morning?<br><strong>Remy:</strong> No. I often drink tea. I never drink coffee after lunch.<br><strong>Priya:</strong> How often are you late to class?<br><strong>Remy:</strong> I’m sometimes late on Mondays because the bus is slow. I’m never late on Wednesdays — I walk.<br><strong>Priya:</strong> Does your sister exercise a lot?<br><strong>Remy:</strong> Yuki usually goes to the gym three times a week. She is always careful with sleep. She seldom watches TV at night.</p>
          <p><strong>After the chat,</strong> Priya writes: Remy is a steady student, but Monday mornings are hard for him. She decides to put their hardest practice on Tuesday or Thursday.</p>
        </div>
      </div>
    </div>
    <h5>A · Detail</h5>
    ${detail.map((it) => `
      <div class="q" data-quiz="${it.id}" data-answer="${escapeHtml(it.ans)}">
        <p>${it.id}. ${escapeHtml(it.q)}</p>
        <div class="opts">
          ${it.opts.map((o) => {
            const sel = dAns[it.id] === o ? ' selected' : '';
            return `<button type="button" class="opt quiz-opt${sel}" data-qid="${it.id}" data-val="${escapeHtml(o)}">${escapeHtml(o)}</button>`;
          }).join('')}
        </div>
      </div>`).join('')}
    <h5>B · Inference · True / False</h5>
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
    { id: '1', q: 'Main idea: What is this note mainly about?', opts: ["Nora’s habits and study places", 'How to bake bread', "Ivan’s trip to Fatima’s house"], ans: "Nora’s habits and study places" },
    { id: '2', q: 'Word in context: In this note, seldom means…', opts: ['every day', 'almost never', 'right now'], ans: 'almost never' },
    { id: '3', q: 'Inference: Bea often forgets to buy bread.', opts: ['True', 'False'], ans: 'True' },
    { id: '4', q: 'Inference: Nora prefers the café for quiet study.', opts: ['True', 'False'], ans: 'False' }
  ];
  const mcAns = state.readMc || {};
  const wAns = state.readW || {};
  return `
    <h4>Reading · Nora’s note to Ivan</h4>
    <p class="intro">Read carefully. Some answers need thinking, not copying.</p>
    <div class="reading">
      <p><strong>From:</strong> Nora Okonkwo<br><strong>To:</strong> Ivan Petrov<br><strong>Subject:</strong> My new routine</p>
      <p>Hi Ivan,</p>
      <p>I usually wake up at six now. I always stretch for five minutes, and I often walk to the bakery before class. I sometimes buy bread for Bea — she never remembers. On Sundays I rarely leave home; I usually cook a big lunch and call my parents.</p>
      <p>How often do you go to the library? I’m there three evenings a week. Fatima is always quiet at the big table, so I sit near her. The café downstairs is sometimes noisy, so I seldom study there.</p>
      <p>Write soon — and tell me about your week!</p>
      <p>— Nora</p>
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
    <div class="q" data-fix="5" data-text-answer="How often do you go to the library?">
      <p>5. Nora asks Ivan this in the note.</p>
      <div class="inline">
        <input type="text" data-fix-in="5" value="${escapeHtml(wAns['5']||'')}" placeholder="How often…?" aria-label="Reading Q5">
        <button type="button" class="btn check-fix" data-fix-btn="5">Check</button>
      </div>
      <p class="feedback" data-fix-fb="5"></p>
    </div>
  `;
}

function speakingHTML() {
  const names = state.fsn || {};
  const interview = [
    ['cook', 'cook at home'],
    ['drink', 'drink tea or coffee'],
    ['study', 'study English at night'],
    ['late', 'late to class / work'],
    ['gym', 'exercise / walk / gym'],
    ['tv', 'watch TV or videos']
  ];
  const fsn = [
    ['wake', 'usually wakes up before 7'],
    ['coffee', 'never drinks coffee'],
    ['weekend', 'often studies on weekends'],
    ['late2', 'is sometimes late'],
    ['tv2', 'rarely watches TV'],
    ['water', 'always carries a water bottle']
  ];
  const prompts = [
    'PROMPT — Tell a partner how often you cook.',
    'PROMPT — Ask how often Remy studies.',
    'PROMPT — Say something you never do.',
    'PROMPT — Ask how often your partner is late.',
    'PROMPT — Use usually + a main verb about your week.',
    'PROMPT — Use always after be about a classmate.',
    'PROMPT — Ask How often does Yuki…?',
    'PROMPT — Say something you rarely do.',
    'PROMPT — Ask how often Fatima goes to the library.',
    'PROMPT — Answer with sometimes + be.'
  ];
  const i = state.speakIndex || 0;
  return `
    <h4>Speaking · How often…? + Find someone who…</h4>
    <p class="intro">Interview a partner with <strong>How often do you…?</strong> / <strong>How often are you…?</strong> Then survey the class.</p>
    <h5>Partner interview</h5>
    <div class="grid2">
      ${interview.map(([id, label]) => `
        <label class="card">${escapeHtml(label)}
          <input type="text" data-iv="${id}" placeholder="e.g. usually — detail" value="${escapeHtml((state.iv||{})[id]||'')}">
        </label>`).join('')}
    </div>
    <div class="card soft" style="margin-top:12px">
      <div class="label">Useful frames</div>
      <p>How often do you…? · How often does she…? · How often are you…?<br>I usually… · I’m sometimes… · I never… · She is always…</p>
    </div>
    <h5>Find someone who…</h5>
    <div class="grid2">
      ${fsn.map(([id, label]) => `
        <label class="card">${escapeHtml(label)}
          <input type="text" data-fsn="${id}" placeholder="Name + detail" value="${escapeHtml(names[id]||'')}">
        </label>`).join('')}
    </div>
    <h5>Prompt card</h5>
    <div class="prompt-card" id="promptCard">${escapeHtml(prompts[i % prompts.length])}</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;justify-content:center">
      <button type="button" class="btn" id="nextSpeak">New random prompt</button>
    </div>
  `;
}

function writingHTML() {
  const c = state.cando || {};
  const items = [
    ['before', 'I can put frequency adverbs before the main verb.'],
    ['after', 'I can put frequency adverbs after be.'],
    ['ask', 'I can ask How often…? and answer with a frequency adverb.'],
    ['trap', 'I can fix wrong-seat traps (drink usually / always is).'],
    ['listen', 'I can catch how often someone does something in a short listen.'],
    ['produce', 'I can describe my real habits with clear adverbs.']
  ];
  return `
    <h4>Writing · exit ticket + can-do</h4>
    <p class="intro">Write 3 lines: 1 before-verb · 1 after-be · 1 How often question about YOUR week. Use a frequency adverb in each habit line.</p>
    <div class="q"><p>1. I _______________ (habit with a main verb).</p>
      <input type="text" data-wline="1" value="${escapeHtml((state.wline||{})['1']||'')}" placeholder="e.g. I usually walk to school."></div>
    <div class="q"><p>2. I am _______________ (feeling / state with be).</p>
      <input type="text" data-wline="2" value="${escapeHtml((state.wline||{})['2']||'')}" placeholder="e.g. I am sometimes nervous before tests."></div>
    <div class="q"><p>3. Write one How often question for a classmate:</p>
      <input type="text" data-wline="3" value="${escapeHtml((state.wline||{})['3']||'')}" placeholder="How often do you…?"></div>
    <textarea id="writingBox" style="min-height:120px;margin-top:12px" placeholder="Optional: longer paragraph about your week…">${escapeHtml(state.writing||'')}</textarea>
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
  if (i === 2) { bindQuiz(); bindFix(); }
  if (i === 3) { bindListening(); bindQuiz('listenD'); bindTf('listenTf'); }
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
function bindSpeaking() {
  const prompts = [
    'PROMPT — Tell a partner how often you cook.',
    'PROMPT — Ask how often Remy studies.',
    'PROMPT — Say something you never do.',
    'PROMPT — Ask how often your partner is late.',
    'PROMPT — Use usually + a main verb about your week.',
    'PROMPT — Use always after be about a classmate.',
    'PROMPT — Ask How often does Yuki…?',
    'PROMPT — Say something you rarely do.',
    'PROMPT — Ask how often Fatima goes to the library.',
    'PROMPT — Answer with sometimes + be.'
  ];
  document.getElementById('nextSpeak').addEventListener('click', () => {
    let n;
    do { n = Math.floor(Math.random() * prompts.length); } while (n === (state.speakIndex || 0) && prompts.length > 1);
    state.speakIndex = n;
    save();
    document.getElementById('promptCard').textContent = prompts[n];
  });
  document.querySelectorAll('[data-iv]').forEach((el) => {
    el.addEventListener('input', () => { state.iv = state.iv || {}; state.iv[el.dataset.iv] = el.value; save(); });
  });
  document.querySelectorAll('[data-fsn]').forEach((el) => {
    el.addEventListener('input', () => { state.fsn = state.fsn || {}; state.fsn[el.dataset.fsn] = el.value; save(); });
  });
}
function bindWriting() {
  const box = document.getElementById('writingBox');
  if (box) box.addEventListener('input', () => { state.writing = box.value; save(); });
  document.querySelectorAll('[data-wline]').forEach((el) => {
    el.addEventListener('input', () => { state.wline = state.wline || {}; state.wline[el.dataset.wline] = el.value; save(); });
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
