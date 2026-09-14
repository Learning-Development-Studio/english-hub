const sections = ['1 Notice', '2 Grammar', '3 Analyse', '4 Listening', '5 Reading', '6 Speaking', '7 Writing', '8 Can-do'];
const KEY = 'a21CountableUncountablev1';
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
    <h4>Same kitchen, different grammar</h4>
    <p class="intro">Read each pair. Do not choose yet — <strong>explain</strong> why the form changes. Each card shows a thinking prompt; write your idea below.</p>
    <div class="scene" aria-label="Contrast pairs">
      <div class="zone">
        <div class="who"><div class="avatar">1</div><div><strong>Pair A</strong><span>count vs measure</span></div></div>
        <div class="bubble on" style="cursor:default">I have <strong>three apples</strong>.<br>I have <strong>some rice</strong>.</div>
        <p class="intro" style="margin-top:8px"><em>Why can we say “three apples” but not “three rices” here?</em></p>
        <textarea data-notice="a" placeholder="Because…">${escapeHtml((state.notice||{}).a||'')}</textarea>
      </div>
      <div class="zone">
        <div class="who"><div class="avatar">2</div><div><strong>Pair B</strong><span>how many vs how much</span></div></div>
        <div class="bubble on" style="cursor:default"><strong>How many eggs</strong> do we have?<br><strong>How much milk</strong> do we have?</div>
        <p class="intro" style="margin-top:8px"><em>What does “how many” ask for? What does “how much” ask for?</em></p>
        <textarea data-notice="b" placeholder="How many… How much…">${escapeHtml((state.notice||{}).b||'')}</textarea>
      </div>
      <div class="zone">
        <div class="who"><div class="avatar">3</div><div><strong>Pair C</strong><span>any with both</span></div></div>
        <div class="bubble on" style="cursor:default">We don’t have <strong>any tomatoes</strong>.<br>We don’t have <strong>any milk</strong>.</div>
        <p class="intro" style="margin-top:8px"><em>Why does “any” work with both tomatoes and milk?</em></p>
        <textarea data-notice="c" placeholder="Because…">${escapeHtml((state.notice||{}).c||'')}</textarea>
      </div>
      <div class="zone">
        <div class="who"><div class="avatar">4</div><div><strong>Pair D</strong><span>a few vs a little</span></div></div>
        <div class="bubble on" style="cursor:default">We have <strong>a few tortillas</strong>.<br>We have <strong>a little salsa</strong>.</div>
        <p class="intro" style="margin-top:8px"><em>Both mean “not a lot.” Why is one “few” and the other “little”?</em></p>
        <textarea data-notice="d" placeholder="Because…">${escapeHtml((state.notice||{}).d||'')}</textarea>
      </div>
    </div>
    <div class="tip"><strong>Think first:</strong> Countable = you can number it (1, 2, 3). Uncountable = you measure it. Possession here is American: <strong>I have / I don’t have / Do you have</strong>.</div>
  `;
}


function grammarHTML() {
  return `
    <h4>Build the contrast — then prove it</h4>
    <p class="intro">Study the forms. Then answer the analysis questions in full sentences.</p>
    <div class="grid2">
      <div class="card mint">
        <div class="label">Countable</div>
        <p class="big-rule">you can number them</p>
        <div class="example">an egg · two eggs · three apples</div>
        <div class="example">How many…? · many · a few · a lot of · some / any</div>
        <div class="times"><span>egg</span><span>tortilla</span><span>tomato</span><span>bottle</span><span>lime</span><span>onion</span></div>
      </div>
      <div class="card">
        <div class="label">Uncountable</div>
        <p class="big-rule">you measure them</p>
        <div class="example">some rice · some milk · some information</div>
        <div class="example">How much…? · much · a little · a lot of · some / any</div>
        <div class="times"><span>rice</span><span>milk</span><span>cheese</span><span>salsa</span><span>time</span><span>money</span></div>
      </div>
    </div>
    <h5 style="margin-top:18px;color:var(--navy)">Quantifiers at a glance</h5>
    <div class="map" style="margin-top:8px">
      <b class="h"></b><div class="h">Use with</div>
      <b>some</b><div class="cell">both · usually affirmative<small>We have some cheese.</small></div>
      <b>any</b><div class="cell">both · negatives and most questions<small>Do you have any salsa? We don’t have any eggs.</small></div>
      <b>a lot of</b><div class="cell">both · all sentence types<small>We have a lot of rice. We don’t have a lot of time.</small></div>
      <b>many / a few</b><div class="cell">countable<small>How many limes? a few tortillas</small></div>
      <b>much / a little</b><div class="cell">uncountable<small>How much milk? a little salsa</small></div>
    </div>
    <div class="note"><strong>American English in this course:</strong> I <em>have</em> some milk. I <em>don’t have</em> any eggs. <em>Do you have</em> any cash? We do not teach <em>have got / haven’t got / Have you got</em> as the model.</div>
    <h5 style="margin-top:18px;color:var(--navy)">Analysis</h5>
    <p class="intro">1. Why do we say <strong>“How many tomatoes?”</strong> but <strong>“How much salsa?”</strong>?</p>
    <textarea data-gram="1" placeholder="Write 2–3 sentences…">${escapeHtml((state.gram||{})['1']||'')}</textarea>
    <p class="intro">2. Why is <strong>“I have many informations”</strong> wrong? Repair it and name the rule.</p>
    <textarea data-gram="2" placeholder="Repair + rule…">${escapeHtml((state.gram||{})['2']||'')}</textarea>
    <p class="intro">3. <strong>Chicken</strong> can be countable or uncountable. What is the difference between “two chickens” and “some chicken”? Give a kitchen example.</p>
    <textarea data-gram="3" placeholder="Example + explanation…">${escapeHtml((state.gram||{})['3']||'')}</textarea>
    <div class="tip"><strong>To count the uncountable:</strong> a bottle of water · a piece of bread · a cup of coffee · a bag of rice · a loaf of bread. <strong>Traps:</strong> information, news, advice, homework, furniture, money — no plural in this meaning.</div>
  `;
}


function analyseHTML() {
  const items = [
    { id: '1', s: 'How many milks do we have?', task: 'Diagnose the error. Rewrite it two ways: with milk as uncountable, and with a container (bottle/carton).' },
    { id: '2', s: 'We don’t have any eggs, and we don’t have any cheese.', task: 'Name the noun types. Why is “any” legal in both halves?' },
    { id: '3', s: 'I have a few friends in this class, but I have a little time tonight.', task: 'Explain few vs little. Do the two sentences mean “almost none” or “some, not a lot”?' },
    { id: '4', s: 'Do you have some cash?', task: 'This is a real question, not a negative. Why might a speaker still use “some” (offers/requests) — and what is the safer classroom default?' },
    { id: '5', s: 'She bought two breads at the store.', task: 'Repair it. Give the natural American options (loaf / some bread / pieces).' },
    { id: '6', s: 'Have you got any tomatoes?', task: 'The meaning is clear. Why do we rewrite it in this course? Give the American form.' }
  ];
  return `
    <h4>Analyse the structure</h4>
    <p class="intro">No multiple-choice. For each sentence: identify countable/uncountable, justify the quantifier, and complete the task.</p>
    ${items.map((it) => `
      <div class="card" style="margin-bottom:12px;padding:14px 16px">
        <div class="example" style="margin:0 0 8px">${it.s}</div>
        <p class="intro" style="margin:0 0 8px"><strong>Task:</strong> ${it.task}</p>
        <textarea data-an="${it.id}" placeholder="Your analysis…">${escapeHtml((state.analyse||{})[it.id]||'')}</textarea>
      </div>`).join('')}
    <div class="tip"><strong>Teacher check:</strong> Strong answers name countable vs uncountable + the quantifier evidence (many/much, few/little, some/any) and, for item 6, the American have/do you have form.</div>
  `;
}


const LISTEN_SCRIPT = [
  { who: 'Narrator', line: 'After work, Marta and Luis are in the kitchen. They want chicken tacos.' },
  { who: 'Marta', line: 'Do we have any tortillas?' },
  { who: 'Luis', line: 'We have a few tortillas. Not many.' },
  { who: 'Marta', line: 'How much chicken do we have?' },
  { who: 'Luis', line: 'We don’t have any chicken. We have some cheese and a little salsa.' },
  { who: 'Marta', line: 'I have some onions. How many tomatoes do we have?' },
  { who: 'Luis', line: 'Only two. That is not a lot of tomatoes.' },
  { who: 'Marta', line: 'We need to buy chicken, tomatoes, and some limes.' },
  { who: 'Luis', line: 'Do we have any rice?' },
  { who: 'Marta', line: 'Yes. We have a lot of rice, but rice is not for tacos tonight.' },
  { who: 'Luis', line: 'True. Let’s make a list. We don’t have much time before the store closes.' },
  { who: 'Marta', line: 'OK. Chicken, tomatoes, limes. And I want a bottle of water too.' },
  { who: 'Luis', line: 'Water is in the fridge. We have three bottles.' },
  { who: 'Marta', line: 'Perfect. Then we only need food for the tacos.' }
];

const WHO_ITEMS = [
  { id: '1', text: 'Asks if they have any tortillas', answer: 'Marta' },
  { id: '2', text: 'Says they have some cheese and a little salsa, but no chicken', answer: 'Luis' },
  { id: '3', text: 'Says they have a lot of rice, but not for tacos tonight', answer: 'Marta' },
  { id: '4', text: 'Says they don’t have much time before the store closes', answer: 'Luis' },
  { id: '5', text: 'Sets the scene after work in the kitchen', answer: 'Narrator' }
];

const SORT_ITEMS = [
  { id: '1', text: 'tortillas' },
  { id: '2', text: 'chicken (in “How much chicken?”)' },
  { id: '3', text: 'cheese' },
  { id: '4', text: 'tomatoes' },
  { id: '5', text: 'rice' },
  { id: '6', text: 'time' }
];

const TF_ITEMS = [
  { id: '1', text: 'They have some chicken in the fridge.' },
  { id: '2', text: 'They have a few tortillas, but not many.' },
  { id: '3', text: 'They need to buy a bottle of water.' }
];

function listeningHTML() {
  const who = state.listenWho || {};
  const sort = state.listenSort || {};
  const tf = state.listenTf || {};
  const vocab = state.listenVocab || {};
  return `
    <h4>Listening · After work, tacos</h4>
    <p class="intro">Play the conversation. Listen for countable vs uncountable and for <strong>have / don’t have / do you have</strong>. Then complete the tasks below — tap choices, do not write long essays.</p>
    <div class="listen-player">
      <audio id="listenAudio" src="./audio/fridge-check.mp3" controls preload="metadata"></audio>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">
        <button type="button" class="btn" id="playListen">Play</button>
        <button type="button" class="btn ghost" id="stopListen">Stop</button>
        <button type="button" class="btn ghost" id="toggleScript">Show / hide script</button>
      </div>
    </div>
    <div id="listenScript" class="card" style="display:none;padding:14px;margin-bottom:12px"></div>

    <h5 style="color:var(--navy)">A · Who said it?</h5>
    <p class="intro">Tap Marta, Luis, or Narrator for each paraphrase.</p>
    <div class="listen-tasks">
      ${WHO_ITEMS.map((it) => `
        <div class="listen-item" data-who-item="${it.id}">
          <p class="listen-prompt">${it.id}. ${it.text}</p>
          <div class="btn-group" role="group" aria-label="Who said it ${it.id}">
            ${['Marta','Luis','Narrator'].map((opt) => `
              <button type="button" class="opt listen-who ${who[it.id]===opt?'selected':''}" data-who="${it.id}" data-val="${opt}">${opt}</button>
            `).join('')}
          </div>
        </div>`).join('')}
    </div>

    <h5 style="color:var(--navy)">B · Countable or uncountable?</h5>
    <p class="intro">In this conversation, is each idea countable or uncountable?</p>
    <div class="listen-tasks">
      ${SORT_ITEMS.map((it) => `
        <div class="listen-item" data-sort-item="${it.id}">
          <p class="listen-prompt">${it.id}. ${it.text}</p>
          <div class="btn-group" role="group" aria-label="Countable or uncountable ${it.id}">
            <button type="button" class="opt listen-sort ${sort[it.id]==='count'?'selected':''}" data-sort="${it.id}" data-val="count">Countable</button>
            <button type="button" class="opt listen-sort ${sort[it.id]==='uncount'?'selected':''}" data-sort="${it.id}" data-val="uncount">Uncountable</button>
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
        <p class="listen-prompt">1. <strong>a few</strong> (Luis: “We have a few tortillas.”)</p>
        <textarea class="short" data-vocab="few" placeholder="Here, a few means…">${escapeHtml(vocab.few||'')}</textarea>
      </div>
      <div class="listen-item">
        <p class="listen-prompt">2. <strong>a bottle of water</strong> (Marta wants one; Luis talks about bottles in the fridge)</p>
        <textarea class="short" data-vocab="bottle" placeholder="Why do they say “a bottle of” instead of “a water”?">${escapeHtml(vocab.bottle||'')}</textarea>
      </div>
    </div>
  `;
}


function readingHTML() {
  return `
    <h4>Reading · A message from the store</h4>
    <p class="intro">Read carefully. Then answer inference and vocabulary-in-context questions. Support answers with evidence from the text.</p>
    <div class="card" style="padding:16px;margin-bottom:14px;line-height:1.55">
      <p>Hey,</p>
      <p>I’m at the store after work. We don’t have much time tonight, so I’m buying food for tacos.</p>
      <p>Quick fridge check from this morning:</p>
      <p>We have a few tortillas, not a full pack. We don’t have any chicken. There’s some cheese and a little salsa. We have a lot of rice, but we don’t need rice tonight. How many limes do we have? I think zero. I’ll buy some.</p>
      <p>Do you have any cash? I don’t have much money on me. I can use my card.</p>
      <p>One more thing: there’s a bottle of water in the door of the fridge. We don’t need more water.</p>
      <p>See you around 9:10.<br>— Diego</p>
    </div>
    <h5 style="color:var(--navy)">1 · Inference</h5>
    <p class="intro">Why is Diego buying chicken? Answer with evidence.</p>
    <textarea data-rd="1" placeholder="Because… Evidence: …">${escapeHtml((state.read||{})['1']||'')}</textarea>
    <h5 style="color:var(--navy)">2 · Inference</h5>
    <p class="intro">Will he buy rice? How do you know?</p>
    <textarea data-rd="2" placeholder="I think… Evidence: …">${escapeHtml((state.read||{})['2']||'')}</textarea>
    <h5 style="color:var(--navy)">3 · Word in context</h5>
    <p class="intro">In “I don’t have much money <strong>on me</strong>,” what does <strong>on me</strong> mean? Which words help you?</p>
    <textarea data-rd="3" placeholder="On me means… The clue words are…">${escapeHtml((state.read||{})['3']||'')}</textarea>
    <h5 style="color:var(--navy)">4 · Word in context</h5>
    <p class="intro">What does <strong>a full pack</strong> most likely mean here? Use context, not a dictionary first.</p>
    <textarea data-rd="4" placeholder="I think a full pack means… because…">${escapeHtml((state.read||{})['4']||'')}</textarea>
    <h5 style="color:var(--navy)">5 · Structure analysis</h5>
    <p class="intro">Find one countable noun and one uncountable noun in the note. Name the quantifier with each and explain why it fits.</p>
    <textarea data-rd="5" placeholder="Countable: … + quantifier… / Uncountable: … + quantifier…">${escapeHtml((state.read||{})['5']||'')}</textarea>
    <h5 style="color:var(--navy)">6 · Author purpose</h5>
    <p class="intro">What is the main purpose of this message? Justify with evidence (do not just name a letter).</p>
    <textarea data-rd="6" placeholder="The purpose is to… I know because…">${escapeHtml((state.read||{})['6']||'')}</textarea>
  `;
}


function speakingHTML() {
  const prompts = [
    { t: 'Fridge', p: 'Tell a partner what you have and don’t have at home tonight. Use at least one countable and one uncountable noun, plus some/any or a few/a little.' },
    { t: 'Defend the form', p: 'Partner A says a sentence with a quantifier. Partner B must say WHY it fits (countable, uncountable, negative, question, small amount).' },
    { t: 'Repair', p: 'Correct this idea out loud: “I have many informations” and “Have you got any milks?” Then explain each repair in one sentence.' },
    { t: 'Store run', p: 'You have 8 minutes before the store closes. Make a shopping list together: 4 countable items and 3 uncountable items. Ask Do you have…? How much…? How many…?' }
  ];
  const i = state.speakIndex || 0;
  return `
    <h4>Speaking · Make the quantity clear</h4>
    <p class="intro">Say full answers. Your goal is justification, not one-word replies. Use American <strong>have / don’t have / do you have</strong>.</p>
    <div class="card" style="padding:16px;margin-bottom:12px">
      <div class="label">${prompts[i].t}</div>
      <p style="margin:8px 0 0;color:var(--navy);font-weight:600">${prompts[i].p}</p>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button type="button" class="btn" id="nextSpeak">Next prompt</button>
    </div>
    <p class="intro" style="margin-top:14px">After you speak, write a short reflection: Which quantifiers did you use?</p>
    <textarea data-sp="reflect" placeholder="I used…">${escapeHtml((state.speakNote||''))}</textarea>
  `;
}
function writingHTML() {
  return `
    <h4>Writing · What’s in my kitchen</h4>
    <p class="intro">Write a short paragraph (8–10 sentences) about your real kitchen or last store run. Requirements:</p>
    <ul style="margin:0 0 12px 18px;color:var(--muted);line-height:1.5">
      <li>At least 3 countable nouns with a number, <em>many</em>, or <em>a few</em></li>
      <li>At least 3 uncountable nouns with <em>much</em>, <em>a little</em>, or <em>a lot of</em></li>
      <li>One negative with <em>any</em> and one question with <em>Do you have…?</em> (you can write the question to a roommate)</li>
      <li>One sentence that uses a container to count an uncountable noun (a bottle of / a piece of / a cup of…)</li>
      <li>American possession only: have / don’t have — not have got</li>
    </ul>
    <textarea id="writingBox" style="min-height:180px" placeholder="Tonight I have… I don’t have any… How much…? We have a few…">${escapeHtml(state.writing||'')}</textarea>
    <div class="cando" style="margin-top:12px">
      <label><input type="checkbox" data-writechk="count"> I used clear countable examples (number / many / a few).</label>
      <label><input type="checkbox" data-writechk="uncount"> I used clear uncountable examples (much / a little / a lot of).</label>
      <label><input type="checkbox" data-writechk="any"> I used any in a negative or a question.</label>
      <label><input type="checkbox" data-writechk="ame"> I used have / don’t have / do you have — not have got.</label>
    </div>
  `;
}
function candoHTML() {
  const c = state.cando || {};
  const items = [
    ['analyse', 'I can explain why a noun is countable or uncountable (not only choose the label).'],
    ['quant', 'I can choose some / any / a lot of / much / many / a few / a little with evidence.'],
    ['traps', 'I can repair traps like informations, two breads, many money, and a milk.'],
    ['ame', 'I can ask and answer with I have / I don’t have / Do you have (American model).'],
    ['listen', 'I can catch quantities in a short kitchen conversation and infer meaning.'],
    ['produce', 'I can speak and write a clear fridge / shopping description with mixed noun types.']
  ];
  return `
    <h4>Can-do · A2.1 quantities</h4>
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
    if (audio) audio.play().catch(() => {});
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
