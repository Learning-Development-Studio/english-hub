const sections = ['1 Notice', '2 Grammar', '3 Analyse', '4 Reading', '5 Listening', '6 Speaking', '7 Writing', '8 Can-do'];
const KEY = 'a21PastOfBev2';

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
  0: noticeHTML,
  1: grammarHTML,
  2: analyseHTML,
  3: readingHTML,
  4: listeningHTML,
  5: speakingHTML,
  6: writingHTML,
  7: candoHTML
};

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;', "'":'&#39;' }[c]));
}

function noticeHTML() {
  const picks = state.noticePick || {};
  const items = [
    { id: 'n1', subject: 'Nora', hint: 'one person', sentence: 'Nora ___ at the library yesterday.', answer: 'was' },
    { id: 'n2', subject: 'She', hint: 'negative', sentence: 'She ___ at home last night.', answer: 'wasn\'t' },
    { id: 'n3', subject: 'Hugo & Priya', hint: 'two people', sentence: 'Hugo and Priya ___ late for class.', answer: 'were' },
    { id: 'n4', subject: 'They', hint: 'question', sentence: '___ they tired?', answer: 'Were' },
    { id: 'n5', subject: 'You', hint: 'question', sentence: '___ you at the market last night?', answer: 'Were' },
    { id: 'n6', subject: 'I', hint: 'one person', sentence: 'No — I ___ at home.', answer: 'was' }
  ];
  const cards = items.map((it) => {
    const sel = picks[it.id] || '';
    const opts = it.answer === 'was' || it.answer === "wasn't"
      ? ['was', "wasn't", 'were', "weren't"]
      : (it.answer === 'Were' ? ['Was', 'Were', 'Is', 'Are'] : ['was', 'were', "wasn't", "weren't"]);
    // keep option sets simple and relevant
    const optionSets = {
      n1: ['was', 'were'],
      n2: ['was', "wasn't", 'were', "weren't"],
      n3: ['was', 'were'],
      n4: ['Was', 'Were'],
      n5: ['Was', 'Were'],
      n6: ['was', 'were']
    };
    const buttons = (optionSets[it.id] || ['was', 'were']).map((o) => {
      const cls = sel === o ? 'opt selected' : 'opt';
      return `<button type="button" class="${cls}" data-notice-pick="${it.id}" data-val="${o.replace(/"/g, '&quot;')}">${o}</button>`;
    }).join('');
    return `<div class="zone" data-notice-item="${it.id}" data-answer="${it.answer.replace(/"/g, '&quot;')}">
        <div class="who"><div class="avatar">${it.id.slice(1)}</div><div><strong>${it.subject}</strong><span>${it.hint}</span></div></div>
        <div class="bubble on" style="cursor:default">${it.sentence.replace('___', '<strong>______</strong>')}</div>
        <div class="opts" role="group" aria-label="Choose the form">${buttons}</div>
        <p class="fb" data-fb="${it.id}" style="min-height:1.2em;margin:8px 0 0;font-size:.86rem;font-weight:700"></p>
      </div>`;
  }).join('');
  return `
    <h4>Yesterday snapshots</h4>
    <p class="intro">Look at each sentence. Tap <strong>was</strong> or <strong>were</strong> (or the negative / question form). Do <em>not</em> explain why yet — just notice the subject and choose.</p>
    <div class="scene" aria-label="Yesterday snapshots">${cards}</div>
    <div class="tip"><strong>Your job here:</strong> match the form to the subject. The clear rule comes next, in <strong>Grammar</strong>.</div>
  `;
}

function grammarHTML() {
  return `
    <h4>Build was / were — then prove it</h4>
    <p class="intro">Study the forms. Then answer the analysis questions in full sentences.</p>
    <div class="grid2">
      <div class="card mint">
        <div class="label">was</div>
        <p class="big-rule">I · he · she · it</p>
        <div class="example">I was tired. · She was at school.</div>
        <div class="example">Negative: wasn’t (was not)</div>
        <div class="times"><span>I was</span><span>he was</span><span>she was</span><span>it was</span></div>
      </div>
      <div class="card">
        <div class="label">were</div>
        <p class="big-rule">you · we · they</p>
        <div class="example">You were late. · They were happy.</div>
        <div class="example">Negative: weren’t (were not)</div>
        <div class="times"><span>you were</span><span>we were</span><span>they were</span></div>
      </div>
    </div>
    <h5 style="margin-top:18px;color:var(--navy)">Questions + short answers</h5>
    <div class="map" role="table" aria-label="Questions">
      <b class="h"></b><div class="h">Pattern</div>
      <b>Was…?</b><div class="cell">Was I / he / she / it …?<small>Was Reza at home? — Yes, he was. / No, he wasn’t.</small></div>
      <b>Were…?</b><div class="cell">Were you / we / they …?<small>Were Elena and Omar busy? — Yes, they were. / No, they weren’t.</small></div>
    </div>
    <h5 style="margin-top:18px;color:var(--navy)">Watch out · classic traps</h5>
    <div class="grid2">
      <div class="card" style="background:var(--bad)">
        <div class="label">Don’t say</div>
        <p style="margin:8px 0 0;font-weight:800">✗ He were tired.<br>✗ They was at the park.<br>✗ Was you at school?</p>
      </div>
      <div class="card mint">
        <div class="label">Say this</div>
        <p style="margin:8px 0 0;font-weight:800">✓ He was tired.<br>✓ They were at the park.<br>✓ Were you at school?</p>
      </div>
    </div>
    <h5 style="margin-top:18px;color:var(--navy)">Analysis</h5>
    <p class="intro">1. Why do we say <strong>“She was at work”</strong> but <strong>“They were at work”</strong>?</p>
    <textarea data-gram="1" placeholder="Write 2–3 sentences…">${escapeHtml((state.gram||{})['1']||'')}</textarea>
    <p class="intro">2. Explain the error in <strong>“Was you hungry?”</strong> and rewrite the question + a short answer.</p>
    <textarea data-gram="2" placeholder="Error… Rewrite… Short answer…">${escapeHtml((state.gram||{})['2']||'')}</textarea>
    <p class="intro">3. When do we use <strong>wasn’t</strong> vs <strong>weren’t</strong>? Give one example of each with a clear subject.</p>
    <textarea data-gram="3" placeholder="wasn’t… weren’t…">${escapeHtml((state.gram||{})['3']||'')}</textarea>
    <div class="tip"><strong>Memory hook:</strong> One person (I/he/she/it) → was. More than one or <em>you</em> → were.</div>
  `;
}

function analyseHTML() {
  const items = [
    { id: '1', s: 'Kenji were at the cinema last night.', task: 'Diagnose the trap. Name the subject type (singular/plural/you). Rewrite the sentence.' },
    { id: '2', s: 'Amira and Leila was happy after the game.', task: 'Why is was wrong here? Rewrite. Then make a Yes/No question about Amira and Leila.' },
    { id: '3', s: 'Was you at the meeting yesterday?', task: 'Fix the question. Write a short answer with No + contraction.' },
    { id: '4', s: 'It weren’t cold this morning.', task: 'Subject is it — which form do we need? Rewrite affirmative and negative.' },
    { id: '5', s: 'You was late, but we weren’t.', task: 'Two clauses — which half is wrong? Repair only what is broken and explain why.' },
    { id: '6', s: 'Were Reza tired after class?', task: 'Is the helping form right for Reza? Rewrite the question and give Yes + short answer.' }
  ];
  return `
    <h4>Analyse · trap hunt</h4>
    <p class="intro">Thinking first — not only multiple choice. For each line: name the problem, fix it, and justify with the was/were rule.</p>
    ${items.map((it) => `
      <div class="card" style="margin-bottom:12px;padding:14px 16px">
        <div class="example" style="margin:0 0 8px">${it.s}</div>
        <p class="intro" style="margin:0 0 8px"><strong>Task:</strong> ${it.task}</p>
        <textarea data-an="${it.id}" placeholder="Your analysis…">${escapeHtml((state.analyse||{})[it.id]||'')}</textarea>
      </div>`).join('')}
    <div class="tip"><strong>Teacher check:</strong> Strong answers name the subject (I/he/she/it vs you/we/they) and show the repaired form.</div>
  `;
}

function readingHTML() {
  return `
    <h4>Reading · A note from Elena</h4>
    <p class="intro">Read carefully. Tap every <strong>was / were / wasn’t / weren’t</strong> you find. Then answer with evidence.</p>
    <div class="reading" id="reading">
      <p>Hi class,</p>
      <p>Sorry I missed yesterday’s study group. I <span class="hit" data-ok="1">was</span> at the clinic with my brother — he <span class="hit" data-ok="1">wasn’t</span> feeling well in the morning. The waiting room <span class="hit" data-ok="1">was</span> crowded, and the chairs <span class="hit" data-ok="1">were</span> all taken, so we stood for a while.</p>
      <p>Omar and Priya, thank you for the photos you sent. You <span class="hit" data-ok="1">were</span> both so organised! The whiteboard notes <span class="hit" data-ok="1">were</span> clear. I <span class="hit" data-ok="1">wasn’t</span> sure about exercise 4, but now I understand.</p>
      <p>One question: <span class="hit" data-ok="1">Were</span> the homework answers on the platform last night? My laptop <span class="hit" data-ok="1">was</span> slow, and I <span class="hit" data-ok="1">wasn’t</span> able to open the file. If the answers <span class="hit" data-ok="1">weren’t</span> online yet, no problem — I can check tomorrow.</p>
      <p>See you Thursday.<br>— Elena</p>
    </div>
    <div class="notice-bar" id="readCount">Found 0 / 12</div>
    <h5 style="color:var(--navy)">1 · Inference</h5>
    <p class="intro">Why did Elena miss the study group? Answer with evidence from the note.</p>
    <textarea data-rd="1" placeholder="Because… Evidence: …">${escapeHtml((state.read||{})['1']||'')}</textarea>
    <h5 style="color:var(--navy)">2 · Detail</h5>
    <p class="intro">What problem did Elena and her brother have in the waiting room?</p>
    <textarea data-rd="2" placeholder="The chairs…">${escapeHtml((state.read||{})['2']||'')}</textarea>
    <h5 style="color:var(--navy)">3 · Word in context</h5>
    <p class="intro">In “You were both so organised,” what does <strong>organised</strong> most likely mean here?</p>
    <textarea data-rd="3" placeholder="Organised means… The clue is…">${escapeHtml((state.read||{})['3']||'')}</textarea>
    <h5 style="color:var(--navy)">4 · Structure analysis</h5>
    <p class="intro">Find one <strong>was</strong> and one <strong>were</strong> in the note. Explain why each form fits its subject.</p>
    <textarea data-rd="4" placeholder="was: … / were: …">${escapeHtml((state.read||{})['4']||'')}</textarea>
    <h5 style="color:var(--navy)">5 · Author purpose</h5>
    <p class="intro">What is the main purpose of Elena’s message? Justify in 1–2 sentences.</p>
    <textarea data-rd="5" placeholder="The purpose is… because…">${escapeHtml((state.read||{})['5']||'')}</textarea>
  `;
}

const LISTEN_SCRIPT = [
  { who: 'Narrator', line: 'After English class, two classmates talk near the bus stop.' },
  { who: 'Diego', line: 'Were you at Nora’s birthday yesterday?' },
  { who: 'Lucia', line: 'No, I wasn’t. I was at home with my little sister.' },
  { who: 'Diego', line: 'Oh. Was she sick?' },
  { who: 'Lucia', line: 'She wasn’t sick, but she was tired after a long day at school.' },
  { who: 'Diego', line: 'Kenji and Amira were at the party. They were really happy.' },
  { who: 'Lucia', line: 'Were the sandwiches good?' },
  { who: 'Diego', line: 'Yes, they were. And the music wasn’t too loud.' },
  { who: 'Lucia', line: 'Nice. Was Reza there too?' },
  { who: 'Diego', line: 'No, he wasn’t. He was in León with his cousins.' },
  { who: 'Lucia', line: 'Were you late?' },
  { who: 'Diego', line: 'A little. The bus was slow, but my friends were patient.' },
  { who: 'Lucia', line: 'Next time I want to go. Was the cake chocolate?' },
  { who: 'Diego', line: 'It was vanilla — and it wasn’t small!' }
];

function listeningHTML() {
  return `
    <h4>Listening · After the party</h4>
    <p class="intro">Play the conversation. Listen for <strong>was / were / wasn’t / weren’t</strong>. Then answer — gist, detail, inference, and form hunt.</p>
    <div class="listen-player">
      <audio id="listenAudio" src="./audio/past-of-be.mp3" controls preload="metadata"></audio>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">
        <button type="button" class="btn" id="playListen">Play</button>
        <button type="button" class="btn ghost" id="stopListen">Stop</button>
        <button type="button" class="btn ghost" id="toggleScript">Show / hide script</button>
      </div>
    </div>
    <div id="listenScript" class="card" style="display:none;padding:14px;margin:12px 0"></div>
    <h5 style="color:var(--navy)">A · Gist</h5>
    <p class="intro">In one or two sentences: what is the conversation mainly about?</p>
    <textarea data-li="gist" placeholder="It is mainly about…">${escapeHtml((state.listen||{}).gist||'')}</textarea>
    <h5 style="color:var(--navy)">B · Detail</h5>
    <p class="intro">Where was Lucia yesterday, and why?</p>
    <textarea data-li="detail" placeholder="She was… because…">${escapeHtml((state.listen||{}).detail||'')}</textarea>
    <h5 style="color:var(--navy)">C · Inference</h5>
    <p class="intro">Why might Diego say his friends were patient? What clue helps you?</p>
    <textarea data-li="infer" placeholder="I think… because…">${escapeHtml((state.listen||{}).infer||'')}</textarea>
    <h5 style="color:var(--navy)">D · Language in context</h5>
    <p class="intro">Diego says “it wasn’t small.” What does he mean about the cake?</p>
    <textarea data-li="vocab" placeholder="He means…">${escapeHtml((state.listen||{}).vocab||'')}</textarea>
    <h5 style="color:var(--navy)">E · Form hunt</h5>
    <p class="intro">List 2 ideas with <strong>was/wasn’t</strong> and 2 with <strong>were/weren’t</strong> (paraphrase — don’t copy long lines).</p>
    <textarea data-li="forms" placeholder="was/wasn’t: … / were/weren’t: …">${escapeHtml((state.listen||{}).forms||'')}</textarea>
  `;
}

function speakingHTML() {
  const prompts = [
    { t: 'Timeline stand', p: 'Stand on an imaginary timeline: left = yesterday morning, middle = yesterday afternoon, right = last night. Say 3 sentences with was/were about where you were.' },
    { t: 'Odd sentence out', p: 'Partner reads three sentences (two correct, one trap like “He were tired”). You spot the odd one and repair it out loud.' },
    { t: 'Photo prompt', p: 'Imagine a photo from last weekend. Describe who was there, where you were, and one thing that wasn’t true (use wasn’t / weren’t).' },
    { t: 'Short-answer duel', p: 'Partner asks 6 Was/Were questions about yesterday. Answer only with short answers: Yes, I was. / No, they weren’t.' }
  ];
  const i = state.speakIndex || 0;
  return `
    <h4>Speaking · Make yesterday clear</h4>
    <p class="intro">Say full answers. Your goal is correct was/were + a clear time idea.</p>
    <div class="card" style="padding:16px;margin-bottom:12px">
      <div class="label">${prompts[i].t}</div>
      <p style="margin:8px 0 0;color:var(--navy);font-weight:600">${prompts[i].p}</p>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button type="button" class="btn" id="nextSpeak">Next prompt</button>
    </div>
    <p class="intro" style="margin-top:14px">After you speak, write a short reflection: Which subjects did you use with was? With were?</p>
    <textarea data-sp="reflect" placeholder="was: … were: …">${escapeHtml((state.speakNote||''))}</textarea>
  `;
}

function writingHTML() {
  return `
    <h4>Writing · My yesterday</h4>
    <p class="intro">Write a short paragraph (8–10 sentences) about a real yesterday. Requirements:</p>
    <ul style="margin:0 0 12px 18px;color:var(--muted);line-height:1.5">
      <li>At least 3 sentences with <strong>was / wasn’t</strong></li>
      <li>At least 3 sentences with <strong>were / weren’t</strong></li>
      <li>One Yes/No question with Was or Were (you can “ask” a friend in the text)</li>
      <li>One short answer (Yes, … was/were. / No, … wasn’t/weren’t.)</li>
    </ul>
    <div class="stems">
      <button type="button" class="stem">I was…</button>
      <button type="button" class="stem">I wasn’t…</button>
      <button type="button" class="stem">We were…</button>
      <button type="button" class="stem">They weren’t…</button>
      <button type="button" class="stem">Was she…?</button>
      <button type="button" class="stem">Were you…?</button>
    </div>
    <textarea id="writingBox" style="min-height:180px" placeholder="Yesterday I was… My friends were…">${escapeHtml(state.writing||'')}</textarea>
    <div class="cando" style="margin-top:12px">
      <label><input type="checkbox" data-writechk="was"> I used was / wasn’t with I / he / she / it.</label>
      <label><input type="checkbox" data-writechk="were"> I used were / weren’t with you / we / they.</label>
      <label><input type="checkbox" data-writechk="q"> I included a Was/Were question.</label>
      <label><input type="checkbox" data-writechk="short"> I included a short answer.</label>
    </div>
  `;
}

function candoHTML() {
  const c = state.cando || {};
  const items = [
    ['aff', 'I can make affirmative sentences with was and were.'],
    ['neg', 'I can make negatives with wasn’t and weren’t.'],
    ['q', 'I can ask Was…? / Were…? and give short answers.'],
    ['trap', 'I can spot traps: He were / They was / Was you…? and repair them.'],
    ['listen', 'I can catch was/were ideas in a short conversation and infer meaning.'],
    ['produce', 'I can speak and write about yesterday with clear was/were choices.']
  ];
  return `
    <h4>Can-do · yesterday check</h4>
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
  document.querySelectorAll('[data-notice-pick]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.noticePick;
      const val = btn.dataset.val;
      const zone = btn.closest('[data-notice-item]');
      const answer = zone?.dataset.answer || '';
      state.noticePick = state.noticePick || {};
      state.noticePick[id] = val;
      save();
      zone.querySelectorAll('[data-notice-pick]').forEach((b) => {
        b.classList.remove('selected', 'correct', 'wrong');
        if (b.dataset.val === val) b.classList.add('selected');
      });
      const fb = zone.querySelector('[data-fb="' + id + '"]');
      const ok = val === answer;
      btn.classList.add(ok ? 'correct' : 'wrong');
      if (fb) {
        fb.textContent = ok ? '✓ Nice — keep looking at the subject.' : 'Try again — look at who the sentence is about.';
        fb.style.color = ok ? '#16865c' : '#c44b4b';
      }
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
  document.querySelectorAll('textarea[data-li]').forEach((el) => {
    el.addEventListener('input', () => {
      state.listen = state.listen || {};
      state.listen[el.dataset.li] = el.value;
      save();
    });
  });
  if (i === 3) bindReadingHits();
  if (i === 4) bindListening();
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

function bindReadingHits() {
  let found = 0;
  const total = document.querySelectorAll('#reading .hit[data-ok]').length;
  document.querySelectorAll('#reading .hit').forEach((el) => {
    el.addEventListener('click', () => {
      if (el.classList.contains('found') || el.classList.contains('miss')) return;
      const ok = el.dataset.ok === '1';
      el.classList.add(ok ? 'found' : 'miss');
      if (ok) found += 1;
      document.getElementById('readCount').textContent = `Found ${found} / ${total}`;
    });
  });
}

function bindListening() {
  const box = document.getElementById('listenScript');
  const audio = document.getElementById('listenAudio');
  box.innerHTML = LISTEN_SCRIPT.map((t) => `<p><strong>${t.who}:</strong> ${t.line}</p>`).join('');
  document.getElementById('toggleScript').addEventListener('click', () => {
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
  });
  document.getElementById('playListen').addEventListener('click', () => {
    if (audio) audio.play().catch(() => {});
  });
  document.getElementById('stopListen').addEventListener('click', () => {
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
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
  document.querySelectorAll('.stem').forEach((btn) => {
    btn.addEventListener('click', () => {
      const stem = btn.textContent.trim();
      const start = box.selectionStart || box.value.length;
      const before = box.value.slice(0, start);
      const after = box.value.slice(start);
      const needsSpace = before.length && !/\s$/.test(before);
      const insert = (needsSpace ? ' ' : '') + stem + ' ';
      box.value = before + insert + after;
      state.writing = box.value;
      save();
      box.focus();
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
