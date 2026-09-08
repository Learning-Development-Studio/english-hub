const sections = ['1 Notice', '2 Grammar', '3 Analyse', '4 Listening', '5 Reading', '6 Speaking', '7 Writing', '8 Can-do'];
const KEY = 'a21PsPcReviewv3';
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
  2: () => analyseHTML(),
  3: () => listeningHTML(),
  4: () => readingHTML(),
  5: () => speakingHTML(),
  6: () => writingHTML(),
  7: () => candoHTML()
};
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;', "'":'&#39;' }[c]));
}


function noticeHTML() {
  return `
    <h4>Same week, different meanings</h4>
    <p class="intro">Read each pair. Do not choose yet — <strong>explain</strong> why the verb form changes. Each card shows a thinking prompt; write your idea below.</p>
    <div class="scene" aria-label="Contrast pairs">
      <div class="zone">
        <div class="who"><div class="avatar">1</div><div><strong>Pair A</strong><span>habit vs now</span></div></div>
        <div class="bubble on" style="cursor:default">Maya <strong>takes</strong> the bus to work.<br>Look! She <strong>is taking</strong> a taxi today.</div>
        <p class="intro" style="margin-top:8px"><em>Why is the second sentence Continuous?</em></p>
        <textarea data-notice="a" placeholder="Because…">${escapeHtml((state.notice||{}).a||'')}</textarea>
      </div>
      <div class="zone">
        <div class="who"><div class="avatar">2</div><div><strong>Pair B</strong><span>fact vs temporary</span></div></div>
        <div class="bubble on" style="cursor:default">Leo <strong>lives</strong> in Celaya.<br>This month he <strong>is living</strong> with his uncle.</div>
        <p class="intro" style="margin-top:8px"><em>What does “this month” tell us about the Continuous form?</em></p>
        <textarea data-notice="b" placeholder="Because…">${escapeHtml((state.notice||{}).b||'')}</textarea>
      </div>
      <div class="zone">
        <div class="who"><div class="avatar">3</div><div><strong>Pair C</strong><span>signal words</span></div></div>
        <div class="bubble on" style="cursor:default">We <strong>usually cook</strong> at home.<br>Listen! Dad <strong>is cooking</strong> something special.</div>
        <p class="intro" style="margin-top:8px"><em>Which words push you to Simple? Which to Continuous?</em></p>
        <textarea data-notice="c" placeholder="Simple signals… Continuous signals…">${escapeHtml((state.notice||{}).c||'')}</textarea>
      </div>
      <div class="zone">
        <div class="who"><div class="avatar">4</div><div><strong>Pair D</strong><span>permanent vs this week</span></div></div>
        <div class="bubble on" style="cursor:default">Omar <strong>works</strong> at a bookstore downtown.<br>This week he <strong>is working</strong> from home.</div>
        <p class="intro" style="margin-top:8px"><em>Why is “this week” paired with Continuous here?</em></p>
        <textarea data-notice="d" placeholder="Because…">${escapeHtml((state.notice||{}).d||'')}</textarea>
      </div>
    </div>
    <div class="tip"><strong>Think first:</strong> Present Simple = what is normal / true. Present Continuous = what is happening now or for a short time.</div>
  `;
}


function grammarHTML() {
  return `
    <h4>Build the contrast — then prove it</h4>
    <p class="intro">Study the forms. Then answer the analysis questions in full sentences.</p>
    <div class="grid2">
      <div class="card mint">
        <div class="label">Present Simple</div>
        <p class="big-rule">habits · routines · facts · permanent</p>
        <div class="example">I / you / we / they + verb</div>
        <div class="example">he / she / it + verb-s / -es</div>
        <div class="times"><span>usually</span><span>every day</span><span>on Mondays</span><span>always</span><span>sometimes</span><span>never</span></div>
      </div>
      <div class="card">
        <div class="label">Present Continuous</div>
        <p class="big-rule">now · temporary · in progress</p>
        <div class="example">am / is / are + verb-ing</div>
        <div class="example">Spelling: take → taking, run → running, lie → lying</div>
        <div class="times"><span>now</span><span>look!</span><span>listen!</span><span>at the moment</span><span>today</span><span>this week</span></div>
      </div>
    </div>
    <h5 style="margin-top:18px;color:var(--navy)">Analysis</h5>
    <p class="intro">1. Why do we say <strong>“She works in a bank”</strong> but <strong>“She is working from home this week”</strong>?</p>
    <textarea data-gram="1" placeholder="Write 2–3 sentences…">${escapeHtml((state.gram||{})['1']||'')}</textarea>
    <p class="intro">2. Can Present Continuous talk about the future sometimes? Give one classroom-safe example and say how we know.</p>
    <textarea data-gram="2" placeholder="Example + explanation…">${escapeHtml((state.gram||{})['2']||'')}</textarea>
    <p class="intro">3. Fix the thinking error: “I am knowing the answer.” What is wrong, and which form is better? Why?</p>
    <textarea data-gram="3" placeholder="Because…">${escapeHtml((state.gram||{})['3']||'')}</textarea>
    <div class="tip"><strong>Stative verbs:</strong> know, like, want, believe, understand — usually Simple, not Continuous.</div>
  `;
}


function analyseHTML() {
  const items = [
    { id: '1', s: 'Every Saturday Nora visits her grandma.', task: 'Underline the time expression (in your mind). Name the tense and justify it with the signal.' },
    { id: '2', s: 'Shh! The baby is sleeping in the next room.', task: 'What does “Shh!” force you to notice about time? Rewrite the sentence as a habit (change meaning).' },
    { id: '3', s: 'Water boils at 100°C.', task: 'Is this a habit or a fact? Why is Continuous odd here?' },
    { id: '4', s: 'This week we are studying for an exam.', task: 'Is “this week” always Continuous? Explain when it pairs with Continuous.' },
    { id: '5', s: 'He usually wears glasses, but today he is wearing contact lenses.', task: 'Explain the contrast in one clear sentence (habit vs temporary).' },
    { id: '6', s: 'I am wanting a sandwich.', task: 'Diagnose the error. Rewrite it. Explain the rule you used.' }
  ];
  return `
    <h4>Analyse the structure</h4>
    <p class="intro">No multiple-choice. For each sentence: identify the form, justify it, and complete the task.</p>
    ${items.map((it) => `
      <div class="card" style="margin-bottom:12px;padding:14px 16px">
        <div class="example" style="margin:0 0 8px">${it.s}</div>
        <p class="intro" style="margin:0 0 8px"><strong>Task:</strong> ${it.task}</p>
        <textarea data-an="${it.id}" placeholder="Your analysis…">${escapeHtml((state.analyse||{})[it.id]||'')}</textarea>
      </div>`).join('')}
    <div class="tip"><strong>Teacher check:</strong> Strong answers name the tense + the signal / meaning (habit, now, temporary, fact, stative).</div>
  `;
}


const LISTEN_SCRIPT = [
  { who: 'Narrator', line: 'After English class, two classmates are talking near the front door.' },
  { who: 'Diego', line: 'You usually walk home, right?' },
  { who: 'Lucia', line: 'Yes, I usually walk. It takes about fifteen minutes.' },
  { who: 'Diego', line: 'But look outside — it is raining hard right now.' },
  { who: 'Lucia', line: 'I know. That is why I am waiting here.' },
  { who: 'Diego', line: 'So what are you doing now? Are you calling a taxi?' },
  { who: 'Lucia', line: 'No. I am waiting for my brother. He is picking me up today because of the rain.' },
  { who: 'Diego', line: 'That makes sense. I take the bus every day.' },
  { who: 'Lucia', line: 'Do you like the bus?' },
  { who: 'Diego', line: 'It is okay. But this week I am staying with my aunt near school, so I am walking in the mornings.' },
  { who: 'Lucia', line: 'Oh — so your walking is temporary.' },
  { who: 'Diego', line: 'Exactly. My aunt is visiting for work this month. Next Monday I go back to my normal routine.' },
  { who: 'Lucia', line: 'Lucky you this week. I usually enjoy walking, but I am not enjoying this storm.' },
  { who: 'Diego', line: 'Same. Listen — a car is stopping outside. Is that your brother?' },
  { who: 'Lucia', line: 'Yes! He is waving at me. See you tomorrow in class.' },
  { who: 'Diego', line: 'See you. I am going to the bus stop before it rains even more.' }
];

const WHO_ITEMS = [
  { id: '1', text: 'Asks if the other person usually walks home', answer: 'Diego' },
  { id: '2', text: 'Usually walks; takes about fifteen minutes', answer: 'Lucia' },
  { id: '3', text: 'Waiting for brother because of the rain', answer: 'Lucia' },
  { id: '4', text: 'Staying with aunt near school this week', answer: 'Diego' },
  { id: '5', text: 'Sets the scene after English class', answer: 'Narrator' }
];

const SORT_ITEMS = [
  { id: '1', text: 'usually walk home' },
  { id: '2', text: 'it is raining hard right now' },
  { id: '3', text: 'waiting for brother' },
  { id: '4', text: 'take the bus every day' },
  { id: '5', text: 'staying with aunt this week' },
  { id: '6', text: 'aunt is visiting this month' }
];

const TF_ITEMS = [
  { id: '1', text: 'Lucia usually takes a taxi home.' },
  { id: '2', text: 'Diego’s walking to school this week is temporary.' },
  { id: '3', text: 'Lucia’s brother is picking her up today because of the rain.' }
];

function listeningHTML() {
  const who = state.listenWho || {};
  const sort = state.listenSort || {};
  const tf = state.listenTf || {};
  const vocab = state.listenVocab || {};
  return `
    <h4>Listening · After class</h4>
    <p class="intro">Play the conversation. Listen for habits vs now/temporary actions. Then complete the tasks below — tap choices, do not write long essays.</p>
    <div class="listen-player">
      <audio id="listenAudio" src="./audio/after-class.mp3" controls preload="metadata"></audio>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">
        <button type="button" class="btn" id="playListen">Play</button>
        <button type="button" class="btn ghost" id="stopListen">Stop</button>
        <button type="button" class="btn ghost" id="toggleScript">Show / hide script</button>
      </div>
    </div>
    <div id="listenScript" class="card" style="display:none;padding:14px;margin-bottom:12px"></div>

    <h5 style="color:var(--navy)">A · Who said it?</h5>
    <p class="intro">Tap Diego, Lucia, or Narrator for each paraphrase.</p>
    <div class="listen-tasks">
      ${WHO_ITEMS.map((it) => `
        <div class="listen-item" data-who-item="${it.id}">
          <p class="listen-prompt">${it.id}. ${it.text}</p>
          <div class="btn-group" role="group" aria-label="Who said it ${it.id}">
            ${['Diego','Lucia','Narrator'].map((opt) => `
              <button type="button" class="opt listen-who ${who[it.id]===opt?'selected':''}" data-who="${it.id}" data-val="${opt}">${opt}</button>
            `).join('')}
          </div>
        </div>`).join('')}
    </div>

    <h5 style="color:var(--navy)">B · Habit or now?</h5>
    <p class="intro">Is each idea a habit/routine or something now/temporary?</p>
    <div class="listen-tasks">
      ${SORT_ITEMS.map((it) => `
        <div class="listen-item" data-sort-item="${it.id}">
          <p class="listen-prompt">${it.id}. ${it.text}</p>
          <div class="btn-group" role="group" aria-label="Habit or now ${it.id}">
            <button type="button" class="opt listen-sort ${sort[it.id]==='habit'?'selected':''}" data-sort="${it.id}" data-val="habit">Habit / routine</button>
            <button type="button" class="opt listen-sort ${sort[it.id]==='now'?'selected':''}" data-sort="${it.id}" data-val="now">Now / temporary</button>
          </div>
        </div>`).join('')}
    </div>

    <h5 style="color:var(--navy)">C · True / False + evidence</h5>
    <p class="intro">Choose T or F, then write one short line of evidence from the audio.</p>
    <div class="listen-tasks">
      ${TF_ITEMS.map((it) => `
        <div class="listen-item" data-tf-item="${it.id}">
          <p class="listen-prompt">${it.id}. ${it.text}</p>
          <div class="btn-group" role="group" aria-label="True or false ${it.id}">
            <button type="button" class="opt listen-tf ${tf[it.id] && tf[it.id].ans==='T'?'selected':''}" data-tf="${it.id}" data-val="T">True</button>
            <button type="button" class="opt listen-tf ${tf[it.id] && tf[it.id].ans==='F'?'selected':''}" data-tf="${it.id}" data-val="F">False</button>
          </div>
          <textarea class="short" data-tf-ev="${it.id}" placeholder="Evidence (one line)…">${escapeHtml((tf[it.id]&&tf[it.id].ev)||'')}</textarea>
        </div>`).join('')}
    </div>

    <h5 style="color:var(--navy)">D · Word in context</h5>
    <p class="intro">Two short items only — what do these mean in the conversation?</p>
    <div class="listen-tasks">
      <div class="listen-item">
        <p class="listen-prompt">1. <strong>routine</strong> (Diego: “Next Monday I go back to my normal routine.”)</p>
        <textarea class="short" data-vocab="routine" placeholder="Here, routine means…">${escapeHtml(vocab.routine||'')}</textarea>
      </div>
      <div class="listen-item">
        <p class="listen-prompt">2. <strong>picking me up</strong> (Lucia about her brother)</p>
        <textarea class="short" data-vocab="pickup" placeholder="Here, picking me up means…">${escapeHtml(vocab.pickup||'')}</textarea>
      </div>
    </div>
  `;
}


function readingHTML() {
  return `
    <h4>Reading · A message from campus</h4>
    <p class="intro">Read carefully. Then answer inference and vocabulary-in-context questions. Support answers with evidence from the text.</p>
    <div class="card" style="padding:16px;margin-bottom:14px;line-height:1.55">
      <p>Hi class,</p>
      <p>I <strong>usually post</strong> homework on Sunday nights, but this week I <strong>am posting</strong> it on Friday because Monday is a holiday. Please check the platform tonight.</p>
      <p>Also, remember: Ana <strong>works</strong> at the library every afternoon. Today, however, she <strong>is helping</strong> with the school open house, so the library desk <strong>is staying</strong> closed until 5:00.</p>
      <p>One more thing — some of you asked about “busy.” In this note, when I say the library desk is busy later, I mean there will be many visitors, not that the desk itself is a person with a job!</p>
      <p>See you Tuesday.<br>— Mr. Rivera</p>
    </div>
    <h5 style="color:var(--navy)">1 · Inference</h5>
    <p class="intro">Why is Mr. Rivera posting homework on Friday instead of Sunday? Answer with evidence.</p>
    <textarea data-rd="1" placeholder="Because… Evidence: …">${escapeHtml((state.read||{})['1']||'')}</textarea>
    <h5 style="color:var(--navy)">2 · Inference</h5>
    <p class="intro">Will students find Ana at the library desk this afternoon? How do you know?</p>
    <textarea data-rd="2" placeholder="I think… Evidence: …">${escapeHtml((state.read||{})['2']||'')}</textarea>
    <h5 style="color:var(--navy)">3 · Word in context</h5>
    <p class="intro">In the last paragraph, what does <strong>busy</strong> mean? Which words in the note help you?</p>
    <textarea data-rd="3" placeholder="Busy means… The clue words are…">${escapeHtml((state.read||{})['3']||'')}</textarea>
    <h5 style="color:var(--navy)">4 · Word in context</h5>
    <p class="intro">What does <strong>open house</strong> most likely mean here? Use context, not a dictionary first.</p>
    <textarea data-rd="4" placeholder="I think open house means… because…">${escapeHtml((state.read||{})['4']||'')}</textarea>
    <h5 style="color:var(--navy)">5 · Structure analysis</h5>
    <p class="intro">Find one Present Simple and one Present Continuous in the note. Explain the meaning difference.</p>
    <textarea data-rd="5" placeholder="Simple: … means … / Continuous: … means …">${escapeHtml((state.read||{})['5']||'')}</textarea>
    <h5 style="color:var(--navy)">6 · Author purpose</h5>
    <p class="intro">What is the main purpose of this message? Choose by thinking, then justify (do not just name a letter).</p>
    <textarea data-rd="6" placeholder="The purpose is to… I know because…">${escapeHtml((state.read||{})['6']||'')}</textarea>
  `;
}


function speakingHTML() {
  const prompts = [
    { t: 'Contrast', p: 'Tell a partner: one thing you usually do after class, and one thing you are doing differently this week. Use a clear signal in each sentence.' },
    { t: 'Defend the form', p: 'Partner A says a sentence in Simple or Continuous. Partner B must say WHY that form fits (habit, now, temporary, fact, stative).' },
    { t: 'Repair', p: 'Correct this idea out loud: “I am knowing your name.” Then explain the repair in one sentence.' },
    { t: 'Campus scene', p: 'Look around (or imagine the classroom). Describe 3 things happening now and 2 routines that are normally true for your class.' }
  ];
  const i = state.speakIndex || 0;
  return `
    <h4>Speaking · Make the contrast clear</h4>
    <p class="intro">Say full answers. Your goal is justification, not one-word replies.</p>
    <div class="card" style="padding:16px;margin-bottom:12px">
      <div class="label">${prompts[i].t}</div>
      <p style="margin:8px 0 0;color:var(--navy);font-weight:600">${prompts[i].p}</p>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button type="button" class="btn" id="nextSpeak">Next prompt</button>
    </div>
    <p class="intro" style="margin-top:14px">After you speak, write a short reflection: Which signal words did you use?</p>
    <textarea data-sp="reflect" placeholder="I used…">${escapeHtml((state.speakNote||''))}</textarea>
  `;
}
function writingHTML() {
  return `
    <h4>Writing · Two timelines</h4>
    <p class="intro">Write a short paragraph (8–10 sentences) about your real week. Requirements:</p>
    <ul style="margin:0 0 12px 18px;color:var(--muted);line-height:1.5">
      <li>At least 3 Present Simple ideas (habits/facts) with signals</li>
      <li>At least 3 Present Continuous ideas (now/temporary) with signals</li>
      <li>One sentence that contrasts both in the same line (like “usually… but today…”)</li>
      <li>One sentence explaining <em>why</em> a Continuous action is temporary</li>
    </ul>
    <textarea id="writingBox" style="min-height:180px" placeholder="I usually… Every day… At the moment… This week…">${escapeHtml(state.writing||'')}</textarea>
    <div class="cando" style="margin-top:12px">
      <label><input type="checkbox" data-writechk="signals"> I used clear signal words for both tenses.</label>
      <label><input type="checkbox" data-writechk="contrast"> I wrote an explicit contrast (usually / but today…).</label>
      <label><input type="checkbox" data-writechk="why"> I explained why one Continuous action is temporary.</label>
      <label><input type="checkbox" data-writechk="stative"> I avoided Continuous with stative verbs (know, like, want…).</label>
    </div>
  `;
}
function candoHTML() {
  const c = state.cando || {};
  const items = [
    ['analyse', 'I can explain why a sentence uses Present Simple or Present Continuous (not only choose the form).'],
    ['signals', 'I can use signal words as evidence for my choice.'],
    ['stative', 'I can spot stative-verb problems (know, like, want…) and repair them.'],
    ['listen', 'I can catch habit vs now/temporary ideas in a short conversation and infer meaning.'],
    ['infer', 'I can answer inference and word-in-context questions with evidence.'],
    ['produce', 'I can speak and write a clear contrast between routines and temporary actions.']
  ];
  return `
    <h4>Can-do · A2.1 review</h4>
    <p class="intro">Check only what you can really do with evidence from this lesson.</p>
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
  document.querySelectorAll('textarea[data-an]').forEach((el) => {
    el.addEventListener('input', () => {
      state.analyse = state.analyse || {};
      state.analyse[el.dataset.an] = el.value;
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
  if (i === 3) bindListening();
  if (i === 5) bindSpeaking();
  if (i === 6) bindWriting();
  if (i === 7) {
    document.querySelectorAll('[data-cando]').forEach((el) => {
      el.addEventListener('change', () => {
        state.cando = state.cando || {};
        state.cando[el.dataset.cando] = el.checked;
        save();
      });
    });
  }
}
function bindListening() {
  const box = document.getElementById('listenScript');
  const audio = document.getElementById('listenAudio');
  box.innerHTML = LISTEN_SCRIPT.map((t) => `<p><strong>${t.who}:</strong> ${t.line}</p>`).join('');
  document.getElementById('toggleScript').addEventListener('click', () => {
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
  });
  document.getElementById('playListen').addEventListener('click', () => {
    if (audio) audio.play();
  });
  document.getElementById('stopListen').addEventListener('click', () => {
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  });

  document.querySelectorAll('.listen-who').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.who;
      const val = btn.dataset.val;
      state.listenWho = state.listenWho || {};
      state.listenWho[id] = val;
      save();
      const group = btn.closest('.btn-group');
      group.querySelectorAll('.listen-who').forEach((b) => b.classList.toggle('selected', b.dataset.val === val));
    });
  });

  document.querySelectorAll('.listen-sort').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.sort;
      const val = btn.dataset.val;
      state.listenSort = state.listenSort || {};
      state.listenSort[id] = val;
      save();
      const group = btn.closest('.btn-group');
      group.querySelectorAll('.listen-sort').forEach((b) => b.classList.toggle('selected', b.dataset.val === val));
    });
  });

  document.querySelectorAll('.listen-tf').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.tf;
      const val = btn.dataset.val;
      state.listenTf = state.listenTf || {};
      state.listenTf[id] = state.listenTf[id] || {};
      state.listenTf[id].ans = val;
      save();
      const group = btn.closest('.btn-group');
      group.querySelectorAll('.listen-tf').forEach((b) => b.classList.toggle('selected', b.dataset.val === val));
    });
  });

  document.querySelectorAll('textarea[data-tf-ev]').forEach((el) => {
    el.addEventListener('input', () => {
      const id = el.dataset.tfEv;
      state.listenTf = state.listenTf || {};
      state.listenTf[id] = state.listenTf[id] || {};
      state.listenTf[id].ev = el.value;
      save();
    });
  });

  document.querySelectorAll('textarea[data-vocab]').forEach((el) => {
    el.addEventListener('input', () => {
      state.listenVocab = state.listenVocab || {};
      state.listenVocab[el.dataset.vocab] = el.value;
      save();
    });
  });
}
function bindSpeaking() {
  document.getElementById('nextSpeak').addEventListener('click', () => {
    state.speakIndex = ((state.speakIndex || 0) + 1) % 4;
    save();
    openTab(5);
  });
  const reflect = document.querySelector('textarea[data-sp="reflect"]');
  if (reflect) reflect.addEventListener('input', () => { state.speakNote = reflect.value; save(); });
}
function bindWriting() {
  const box = document.getElementById('writingBox');
  box.addEventListener('input', () => { state.writing = box.value; save(); });
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
