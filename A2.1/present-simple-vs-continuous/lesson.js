const sections = ['1 Notice', '2 Grammar', '3 Analyse', '4 Listening', '5 Reading', '6 Speaking', '7 Writing', '8 Can-do'];
const KEY = 'a21PsPcReviewv2';
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
    <p class="intro">Read each pair. Do not choose yet — <strong>explain</strong> why the verb form changes. Tap a card to reveal a thinking prompt, then write your idea.</p>
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
function listeningHTML() {
  return `
    <h4>Listening · After class</h4>
    <p class="intro">Play the full conversation (it is a bit longer). Listen for habits vs now/temporary actions. Then answer — gist, detail, inference, and language in context.</p>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">
      <button type="button" class="btn" id="playListen">Play conversation</button>
      <button type="button" class="btn ghost" id="stopListen">Stop</button>
      <button type="button" class="btn ghost" id="toggleScript">Show / hide script</button>
    </div>
    <div id="listenScript" class="card" style="display:none;padding:14px;margin-bottom:12px"></div>
    <h5 style="color:var(--navy)">A · Gist</h5>
    <p class="intro">In one or two sentences: what is the conversation mainly about?</p>
    <textarea data-li="gist" placeholder="It is mainly about…">${escapeHtml((state.listen||{}).gist||'')}</textarea>
    <h5 style="color:var(--navy)">B · Detail</h5>
    <p class="intro">How does Lucia usually go home? What is different today, and why?</p>
    <textarea data-li="detail" placeholder="Usually… Today… because…">${escapeHtml((state.listen||{}).detail||'')}</textarea>
    <h5 style="color:var(--navy)">C · Inference</h5>
    <p class="intro">Why does Diego say his walking is temporary? What clue tells you that?</p>
    <textarea data-li="infer" placeholder="I think… because…">${escapeHtml((state.listen||{}).infer||'')}</textarea>
    <h5 style="color:var(--navy)">D · Language in context</h5>
    <p class="intro">Diego says “Next Monday I go back to my normal routine.” What does <strong>routine</strong> mean here? Use a clue from the conversation.</p>
    <textarea data-li="vocab" placeholder="Here, routine means… The clue is…">${escapeHtml((state.listen||{}).vocab||'')}</textarea>
    <h5 style="color:var(--navy)">E · Form hunt</h5>
    <p class="intro">List 2 Present Simple ideas and 2 Present Continuous ideas you heard. Do not copy long sentences — paraphrase.</p>
    <textarea data-li="forms" placeholder="Simple: … / Continuous: …">${escapeHtml((state.listen||{}).forms||'')}</textarea>
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
  document.querySelectorAll('textarea[data-li]').forEach((el) => {
    el.addEventListener('input', () => {
      state.listen = state.listen || {};
      state.listen[el.dataset.li] = el.value;
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
let speakQueue = [];
function bindListening() {
  const box = document.getElementById('listenScript');
  box.innerHTML = LISTEN_SCRIPT.map((t) => `<p><strong>${t.who}:</strong> ${t.line}</p>`).join('');
  document.getElementById('toggleScript').addEventListener('click', () => {
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
  });
  document.getElementById('stopListen').addEventListener('click', () => {
    if (window.speechSynthesis) speechSynthesis.cancel();
    speakQueue = [];
  });
  document.getElementById('playListen').addEventListener('click', () => {
    if (!window.speechSynthesis) {
      alert('Speech playback is not available in this browser. Use Show script and read aloud with a partner.');
      return;
    }
    speechSynthesis.cancel();
    speakQueue = LISTEN_SCRIPT.slice();
    const next = () => {
      if (!speakQueue.length) return;
      const turn = speakQueue.shift();
      const u = new SpeechSynthesisUtterance(`${turn.who}. ${turn.line}`);
      u.rate = 0.95;
      u.onend = next;
      speechSynthesis.speak(u);
    };
    next();
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
