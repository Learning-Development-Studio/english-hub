const sections = ['1 Notice', '2 Grammar', '3 Practice', '4 Reading', '5 Listening', '6 Speaking', '7 Writing', '8 Can-do'];
const KEY = 'a21CountableUncountablev2';

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
  2: practiceHTML,
  3: readingHTML,
  4: listeningHTML,
  5: speakingHTML,
  6: writingHTML,
  7: candoHTML
};

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;', "'":'&#39;' }[c]));
}
function escapeAttr(s) { return escapeHtml(s); }

function noticeHTML() {
  return `
    <h4>Open the fridge. Tap a thing.</h4>
    <p class="intro">Left: you can count them (1, 2, 3). Right: you measure them. Tap to see the sentence.</p>
    <div class="scene" aria-label="Fridge">
      <div class="zone">
        <h5>Countable · you can number them</h5>
        <div class="things">
          <button type="button" class="thing" data-sent="I have three eggs.">
            <span class="ico" aria-hidden="true">🥚</span>eggs
            <span class="sent">I have three eggs.</span>
          </button>
          <button type="button" class="thing" data-sent="We have a few tortillas.">
            <span class="ico" aria-hidden="true">🌮</span>tortillas
            <span class="sent">We have a few tortillas.</span>
          </button>
          <button type="button" class="thing" data-sent="How many tomatoes do we have?">
            <span class="ico" aria-hidden="true">🍅</span>tomatoes
            <span class="sent">How many tomatoes do we have?</span>
          </button>
          <button type="button" class="thing" data-sent="We have three bottles.">
            <span class="ico" aria-hidden="true">🍼</span>bottles
            <span class="sent">We have three bottles.</span>
          </button>
        </div>
      </div>
      <div class="zone far">
        <h5>Uncountable · you measure them</h5>
        <div class="things">
          <button type="button" class="thing" data-sent="I have some rice.">
            <span class="ico" aria-hidden="true">🍚</span>rice
            <span class="sent">I have some rice.</span>
          </button>
          <button type="button" class="thing" data-sent="How much milk do we have?">
            <span class="ico" aria-hidden="true">🥛</span>milk
            <span class="sent">How much milk do we have?</span>
          </button>
          <button type="button" class="thing" data-sent="We have a little salsa.">
            <span class="ico" aria-hidden="true">🌶️</span>salsa
            <span class="sent">We have a little salsa.</span>
          </button>
          <button type="button" class="thing" data-sent="We don’t have any cheese.">
            <span class="ico" aria-hidden="true">🧀</span>cheese
            <span class="sent">We don’t have any cheese.</span>
          </button>
        </div>
      </div>
    </div>
    <div class="tip"><strong>American English:</strong> I have / I don’t have / Do you have. Not <em>have got</em>.</div>
  `;
}

function grammarHTML() {
  return `
    <h4>Two kinds of nouns. Then the little words.</h4>
    <p class="intro">Countable = 1 egg, 2 eggs. Uncountable = some rice — not “two rices.”</p>
    <div class="grid2">
      <div class="card mint">
        <div class="label">Countable</div>
        <p class="big-rule">a / an · plural -s · how many</p>
        <div class="example">an egg · two eggs · a few tortillas</div>
        <div class="times"><span>egg</span><span>tomato</span><span>bottle</span><span>lime</span></div>
      </div>
      <div class="card">
        <div class="label">Uncountable</div>
        <p class="big-rule">no a/an · no plural · how much</p>
        <div class="example">some rice · some milk · a little salsa</div>
        <div class="times"><span>rice</span><span>milk</span><span>cheese</span><span>time</span></div>
      </div>
    </div>
    <h5>Quantifiers</h5>
    <div class="map" role="table" aria-label="Quantifiers">
      <b class="h"></b><div class="h">Use with</div>
      <b>some</b><div class="cell">both · usually yes-sentences<small>We have some cheese.</small></div>
      <b>any</b><div class="cell">both · no-sentences and questions<small>Do you have any salsa? We don’t have any eggs.</small></div>
      <b>a lot of</b><div class="cell">both<small>We have a lot of rice.</small></div>
      <b>many / a few</b><div class="cell">countable<small>How many limes? a few tortillas</small></div>
      <b>much / a little</b><div class="cell">uncountable<small>How much milk? a little salsa</small></div>
    </div>
    <div class="note"><strong>American English:</strong> I <em>have</em> some milk. I <em>don’t have</em> any eggs. <em>Do you have</em> any cash?</div>
    <h5>Watch out</h5>
    <div class="grid2">
      <div class="card" style="background:var(--bad)">
        <div class="label">Common mix-up</div>
        <p style="margin:8px 0 0;font-weight:800">✗ I have many informations.<br>✗ She bought two breads.<br>✗ Have you got any tomatoes?</p>
      </div>
      <div class="card mint">
        <div class="label">Say this</div>
        <p style="margin:8px 0 0;font-weight:800">✓ I have a lot of information.<br>✓ She bought some bread. / two loaves.<br>✓ Do you have any tomatoes?</p>
      </div>
    </div>
    <div class="tip"><strong>To count the uncountable:</strong> a bottle of water · a piece of bread · a cup of coffee · a bag of rice.</div>
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

function practiceHTML() {
  const saved = state.practice || {};
  return `
    <h4>Choose, then check. The why matters.</h4>
    <p class="intro">A: countable or uncountable. B: the little word. C: fix the sentence.</p>

    <h5>A · Countable or uncountable?</h5>
    ${mcGroup('A', [
      { q: 'apples', opts: ['Countable', 'Uncountable'], a: 'Countable', why: 'You can say one apple, two apples.' },
      { q: 'rice', opts: ['Countable', 'Uncountable'], a: 'Uncountable', why: 'You measure rice. Not “two rices.”' },
      { q: 'tortillas', opts: ['Countable', 'Uncountable'], a: 'Countable', why: 'You can count them: three tortillas.' },
      { q: 'milk', opts: ['Countable', 'Uncountable'], a: 'Uncountable', why: 'How much milk? Not how many milks.' },
      { q: 'information', opts: ['Countable', 'Uncountable'], a: 'Uncountable', why: 'No plural: information, not informations.' },
      { q: 'bottles', opts: ['Countable', 'Uncountable'], a: 'Countable', why: 'A bottle is a container you can count. Water inside is uncountable.' }
    ], saved)}

    <h5>B · Choose the word</h5>
    ${mcGroup('B', [
      { q: 'How _____ eggs do we have?', opts: ['many', 'much'], a: 'many', why: 'Eggs are countable → how many.' },
      { q: 'How _____ milk do we have?', opts: ['many', 'much'], a: 'much', why: 'Milk is uncountable → how much.' },
      { q: 'We don’t have _____ tomatoes.', opts: ['some', 'any'], a: 'any', why: 'Negatives usually take any.' },
      { q: 'We have _____ cheese.', opts: ['some', 'any'], a: 'some', why: 'Yes-sentences usually take some.' },
      { q: 'We have _____ tortillas. Not many.', opts: ['a few', 'a little'], a: 'a few', why: 'Tortillas are countable → a few.' },
      { q: 'We have _____ salsa.', opts: ['a few', 'a little'], a: 'a little', why: 'Salsa is uncountable → a little.' }
    ], saved)}

    <h5>C · Fix the sentence</h5>
    ${mcGroup('C', [
      { q: 'I have many informations.', opts: ['I have a lot of information.', 'I have many information.', 'I have a lot of informations.'], a: 'I have a lot of information.', why: 'Information is uncountable. No -s.' },
      { q: 'How many milks do we have?', opts: ['How much milk do we have?', 'How many milk do we have?', 'How much milks do we have?'], a: 'How much milk do we have?', why: 'Milk is uncountable → how much milk.' },
      { q: 'She bought two breads.', opts: ['She bought some bread.', 'She bought two bread.', 'She bought many bread.'], a: 'She bought some bread.', why: 'Bread is uncountable. Or: two loaves of bread.' },
      { q: 'Have you got any tomatoes?', opts: ['Do you have any tomatoes?', 'Have you any tomatoes?', 'Do you got any tomatoes?'], a: 'Do you have any tomatoes?', why: 'This course uses American Do you have…?' }
    ], saved)}

    <div style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap">
      <button type="button" class="btn" id="checkPractice">Check answers</button>
      <button type="button" class="btn ghost" id="resetPractice">Reset</button>
    </div>
    <div class="feedback" id="practiceFb"></div>
  `;
}

function readingHTML() {
  return `
    <h4>Diego’s message. Tap the quantity words.</h4>
    <p class="intro">Find all 8. Then answer the questions under the text.</p>
    <div class="reading" id="reading">
      Hey, I’m at the store after work. We don’t have
      <span class="hit" data-ok="1">much</span> time tonight, so I’m buying food for tacos.
      We have <span class="hit" data-ok="1">a few</span> tortillas, not a full pack.
      We don’t have <span class="hit" data-ok="1">any</span> chicken.
      There’s <span class="hit" data-ok="1">some</span> cheese and <span class="hit" data-ok="1">a little</span> salsa.
      We have <span class="hit" data-ok="1">a lot of</span> rice, but we don’t need rice tonight.
      <span class="hit" data-ok="1">How many</span> limes do we have? I think zero. I’ll buy some.
      Do you have <span class="hit" data-ok="1">any</span> cash? I don’t have much money on me.
      There’s a bottle of water in the fridge. We don’t need more water.
      See you around 9:10. — Diego
    </div>
    <div class="notice-bar" id="readCount">Found 0 / 8</div>
    <div class="q">
      <p>1. Why is Diego at the store?</p>
      <div class="opts" data-readq="why">
        <button type="button" class="opt" data-v="tacos">He is buying food for tacos.</button>
        <button type="button" class="opt" data-v="rice">He needs a bag of rice.</button>
        <button type="button" class="opt" data-v="water">He needs more water.</button>
      </div>
    </div>
    <div class="q">
      <p>2. Do they have chicken?</p>
      <div class="opts" data-readq="chicken">
        <button type="button" class="opt" data-v="no">No. They don’t have any chicken.</button>
        <button type="button" class="opt" data-v="yes">Yes. They have some chicken.</button>
        <button type="button" class="opt" data-v="little">They have a little chicken.</button>
      </div>
    </div>
    <div class="q">
      <p>3. Will he buy rice?</p>
      <div class="opts" data-readq="rice">
        <button type="button" class="opt" data-v="no">No. They have a lot of rice.</button>
        <button type="button" class="opt" data-v="yes">Yes. They don’t have any rice.</button>
        <button type="button" class="opt" data-v="few">He will buy a few rice.</button>
      </div>
    </div>
    <div class="q">
      <p>4. Do they need water?</p>
      <div class="opts" data-readq="water">
        <button type="button" class="opt" data-v="no">No. There is a bottle in the fridge.</button>
        <button type="button" class="opt" data-v="yes">Yes. They don’t have any water.</button>
        <button type="button" class="opt" data-v="much">They don’t have much water.</button>
      </div>
    </div>
    <div class="q">
      <p>5. “I don’t have much money on me” means:</p>
      <div class="opts" data-readq="cash">
        <button type="button" class="opt" data-v="pocket">He doesn’t have much cash with him now.</button>
        <button type="button" class="opt" data-v="poor">He never has money.</button>
        <button type="button" class="opt" data-v="card">He doesn’t have a card.</button>
      </div>
    </div>
    <button type="button" class="btn" id="checkReading" style="margin-top:8px">Check</button>
    <div class="feedback" id="readFb"></div>
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

function listeningHTML() {
  const who = state.listenWho || {};
  const tf = state.listenTf || {};
  const buy = state.listenBuy || '';
  return `
    <h4>Listening · After work, tacos</h4>
    <p class="intro">Listen once for the people. Listen again for what they have and what they need.</p>
    <div class="listen-player">
      <audio id="listenAudio" src="./audio/fridge-check.mp3" controls preload="metadata"></audio>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">
        <button type="button" class="btn" id="playListen">Play</button>
        <button type="button" class="btn ghost" id="stopListen">Stop</button>
        <button type="button" class="btn ghost" id="toggleScript">Show / hide script</button>
      </div>
    </div>
    <div id="listenScript" class="card" style="display:none;padding:14px;margin-bottom:12px"></div>

    <h5>A · Who said it?</h5>
    ${[
      { id: '1', text: 'Do we have any tortillas?', opts: ['Marta', 'Luis', 'Narrator'] },
      { id: '2', text: 'We don’t have any chicken.', opts: ['Marta', 'Luis', 'Narrator'] },
      { id: '3', text: 'We have a lot of rice, but rice is not for tacos tonight.', opts: ['Marta', 'Luis', 'Narrator'] },
      { id: '4', text: 'We don’t have much time before the store closes.', opts: ['Marta', 'Luis', 'Narrator'] }
    ].map((it) => `
      <div class="q">
        <p>${it.id}. ${it.text}</p>
        <div class="opts" data-who="${it.id}">
          ${it.opts.map((o) => `<button type="button" class="opt listen-who${who[it.id]===o?' selected':''}" data-who="${it.id}" data-val="${o}">${o}</button>`).join('')}
        </div>
      </div>`).join('')}

    <h5>B · True or false?</h5>
    ${[
      { id: '1', text: 'They have some chicken in the fridge.' },
      { id: '2', text: 'They have a few tortillas.' },
      { id: '3', text: 'They need to buy water.' }
    ].map((it) => `
      <div class="q">
        <p>${it.id}. ${it.text}</p>
        <div class="opts" data-tf="${it.id}">
          <button type="button" class="opt listen-tf${tf[it.id]==='T'?' selected':''}" data-tf="${it.id}" data-val="T">True</button>
          <button type="button" class="opt listen-tf${tf[it.id]==='F'?' selected':''}" data-tf="${it.id}" data-val="F">False</button>
        </div>
      </div>`).join('')}

    <h5>C · What do they need to buy?</h5>
    <div class="q">
      <p>Choose the best list.</p>
      <div class="opts" data-buy="1">
        <button type="button" class="opt listen-buy${buy==='food'?' selected':''}" data-val="food">Chicken, tomatoes, and limes</button>
        <button type="button" class="opt listen-buy${buy==='rice'?' selected':''}" data-val="rice">Rice, water, and cheese</button>
        <button type="button" class="opt listen-buy${buy==='all'?' selected':''}" data-val="all">Chicken, rice, and water</button>
      </div>
    </div>
    <button type="button" class="btn" id="checkListen" style="margin-top:8px">Check</button>
    <div class="feedback" id="listenFb"></div>
  `;
}

const MYSTERY_PROMPTS = [
  { icon: '🥚', text: 'How many eggs do you have at home?' },
  { icon: '🥛', text: 'How much milk do you have?' },
  { icon: '🌮', text: 'I have a few…' },
  { icon: '🌶️', text: 'We have a little…' },
  { icon: '🍚', text: 'I have some…' },
  { icon: '🛒', text: 'I don’t have any…' },
  { icon: '🧀', text: 'Do you have any…?' },
  { icon: '🍼', text: 'Say a container: a bottle of / a piece of / a cup of…' },
  { icon: '🍅', text: 'We need to buy… (mix countable and uncountable).' },
  { icon: '⏰', text: 'We don’t have much time. What do you have a lot of?' },
  { icon: '🛠️', text: 'Fix this: I have many informations.' },
  { icon: '🍞', text: 'Fix this: She bought two breads. / Have you got any tomatoes?' }
];

function speakingHTML() {
  const opened = new Set(state.mysteryOpened || []);
  const boxes = MYSTERY_PROMPTS.map((p, i) => {
    const isOpen = opened.has(String(i));
    return `
      <button type="button" class="mbox ${isOpen ? 'open' : ''}" data-box="${i}" ${isOpen ? 'disabled' : ''} aria-label="Mystery box ${i + 1}">
        <span class="lid">${isOpen ? '📭' : '🎁'}</span>
        <span class="tag">${isOpen ? 'Opened' : 'Box ' + (i + 1)}</span>
      </button>`;
  }).join('');
  return `
    <h4>Mystery Box · the fridge</h4>
    <p class="intro">Tap a closed box. Say the prompt to a partner. Use <strong>have / don’t have / do you have</strong>. Opened boxes stay open.</p>
    <div class="mystery-wrap">
      <div class="mystery-grid" id="mysteryGrid">${boxes}</div>
      <div class="mystery-reveal empty" id="mysteryReveal">Tap a box to open a speaking prompt.</div>
      <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
        <button type="button" class="btn ghost" id="resetBoxes">Reset boxes</button>
        <button type="button" class="btn ghost" id="showModel">Show a model</button>
      </div>
      <div class="card soft" id="speakModel" hidden style="margin-top:12px">
        <div class="label">Models</div>
        <div class="example">I have some rice. I don’t have any tomatoes.</div>
        <div class="example">How many eggs? How much milk?</div>
        <div class="example">We have a few tortillas and a little salsa.</div>
        <div class="example">I have a lot of information. Do you have any bread?</div>
      </div>
    </div>
    <div class="play-row">
      <a href="../fridge-battle/">Play Fridge Battle →</a>
    </div>
  `;
}

function writingHTML() {
  return `
    <h4>Write 6 sentences about your kitchen tonight.</h4>
    <p class="intro">Use the stems. Mix countable and uncountable. Use American <strong>have / don’t have</strong>.</p>
    <div class="stems">
      <button type="button" class="stem">I have…</button>
      <button type="button" class="stem">I don’t have any…</button>
      <button type="button" class="stem">How many…?</button>
      <button type="button" class="stem">How much…?</button>
      <button type="button" class="stem">We have a few…</button>
      <button type="button" class="stem">We have a little…</button>
    </div>
    <textarea id="writingBox" placeholder="I have some rice. I don’t have any tomatoes.…">${escapeHtml(state.writing||'')}</textarea>
    <div class="cando" style="margin-top:12px">
      <label><input type="checkbox" data-writechk="count"> I used a countable noun (eggs, tortillas…).</label>
      <label><input type="checkbox" data-writechk="uncount"> I used an uncountable noun (rice, milk…).</label>
      <label><input type="checkbox" data-writechk="ame"> I used have / don’t have — not have got.</label>
    </div>
  `;
}

function candoHTML() {
  const c = state.cando || {};
  const items = [
    ['count', 'I can name countable things: eggs, tortillas, bottles.'],
    ['uncount', 'I can name uncountable things: rice, milk, cheese, time.'],
    ['quant', 'I can use some / any / a lot of / much / many / a few / a little.'],
    ['ask', 'I can ask Do you have…? How many…? How much…?'],
    ['fix', 'I can fix informations, two breads, and have got.']
  ];
  return `
    <h4>Can-do · the fridge test</h4>
    <p class="intro">Check only what you can really do in class tonight.</p>
    <div class="play-row" style="margin:0 0 14px">
      <a href="../fridge-battle/">Play Fridge Battle →</a>
    </div>
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
  if (i === 0) {
    document.querySelectorAll('.thing').forEach((btn) => {
      btn.addEventListener('click', () => btn.classList.toggle('on'));
    });
  }
  if (i === 2) bindPractice();
  if (i === 3) bindReading();
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
      if (picked && picked.dataset.v === answer) right += 1;
      q.classList.add('done');
      q.querySelector('.why').textContent = q.dataset.why;
    });
    const fb = document.getElementById('practiceFb');
    fb.className = 'feedback show ' + (right === total ? 'good' : 'warn');
    fb.textContent = right === total
      ? `All ${total} correct. You can count it or measure it.`
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
  const answers = { why: 'tacos', chicken: 'no', rice: 'no', water: 'no', cash: 'pocket' };
  document.querySelectorAll('.opt[data-v]').forEach((btn) => {
    if (!btn.closest('[data-readq]')) return;
    btn.addEventListener('click', () => {
      btn.parentElement.querySelectorAll('.opt').forEach((o) => o.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });
  document.getElementById('checkReading').addEventListener('click', () => {
    let right = 0, n = 0;
    Object.keys(answers).forEach((key) => {
      n += 1;
      const group = document.querySelector(`[data-readq="${key}"]`);
      const picked = group.querySelector('.opt.selected');
      group.querySelectorAll('.opt').forEach((o) => {
        o.classList.remove('correct', 'wrong');
        if (o.dataset.v === answers[key]) o.classList.add('correct');
        else if (o.classList.contains('selected')) o.classList.add('wrong');
      });
      if (picked && picked.dataset.v === answers[key]) right += 1;
    });
    const fb = document.getElementById('readFb');
    fb.className = 'feedback show ' + (right === n ? 'good' : 'warn');
    fb.textContent = `${right} / ${n} questions. Quantity words found: ${found} / ${total}.`;
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
  document.querySelectorAll('.listen-who').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.who;
      const val = btn.dataset.val;
      state.listenWho = state.listenWho || {};
      state.listenWho[id] = val;
      save();
      btn.parentElement.querySelectorAll('.listen-who').forEach((b) => b.classList.toggle('selected', b.dataset.val === val));
    });
  });
  document.querySelectorAll('.listen-tf').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.tf;
      const val = btn.dataset.val;
      state.listenTf = state.listenTf || {};
      state.listenTf[id] = val;
      save();
      btn.parentElement.querySelectorAll('.listen-tf').forEach((b) => b.classList.toggle('selected', b.dataset.val === val));
    });
  });
  document.querySelectorAll('.listen-buy').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.listenBuy = btn.dataset.val;
      save();
      document.querySelectorAll('.listen-buy').forEach((b) => b.classList.toggle('selected', b === btn));
    });
  });
  const whoAns = { '1': 'Marta', '2': 'Luis', '3': 'Marta', '4': 'Luis' };
  const tfAns = { '1': 'F', '2': 'T', '3': 'F' };
  document.getElementById('checkListen').addEventListener('click', () => {
    let right = 0, total = 0;
    Object.keys(whoAns).forEach((id) => {
      total += 1;
      const group = document.querySelector(`[data-who="${id}"]`);
      group.querySelectorAll('.opt').forEach((o) => {
        o.classList.remove('correct', 'wrong');
        if (o.dataset.val === whoAns[id]) o.classList.add('correct');
        else if (o.classList.contains('selected')) o.classList.add('wrong');
      });
      if (state.listenWho && state.listenWho[id] === whoAns[id]) right += 1;
    });
    Object.keys(tfAns).forEach((id) => {
      total += 1;
      const group = document.querySelector(`[data-tf="${id}"]`);
      group.querySelectorAll('.opt').forEach((o) => {
        o.classList.remove('correct', 'wrong');
        if (o.dataset.val === tfAns[id]) o.classList.add('correct');
        else if (o.classList.contains('selected')) o.classList.add('wrong');
      });
      if (state.listenTf && state.listenTf[id] === tfAns[id]) right += 1;
    });
    total += 1;
    document.querySelectorAll('.listen-buy').forEach((o) => {
      o.classList.remove('correct', 'wrong');
      if (o.dataset.val === 'food') o.classList.add('correct');
      else if (o.classList.contains('selected')) o.classList.add('wrong');
    });
    if (state.listenBuy === 'food') right += 1;
    const fb = document.getElementById('listenFb');
    fb.className = 'feedback show ' + (right === total ? 'good' : 'warn');
    fb.textContent = `${right} / ${total}.`;
  });
}

function bindSpeaking() {
  const opened = new Set((state.mysteryOpened || []).map(String));
  const reveal = document.getElementById('mysteryReveal');
  const grid = document.getElementById('mysteryGrid');

  function persist() {
    state.mysteryOpened = Array.from(opened);
    save();
  }

  function openBox(i, btn) {
    const key = String(i);
    if (opened.has(key)) return;
    opened.add(key);
    persist();
    const p = MYSTERY_PROMPTS[i];
    btn.classList.add('open');
    btn.disabled = true;
    btn.querySelector('.lid').textContent = '📭';
    btn.querySelector('.tag').textContent = 'Opened';
    reveal.classList.remove('empty');
    reveal.innerHTML = `<span aria-hidden="true">${p.icon}</span> ${p.text}`;
  }

  grid.querySelectorAll('.mbox').forEach((btn) => {
    btn.addEventListener('click', () => openBox(Number(btn.dataset.box), btn));
  });

  document.getElementById('resetBoxes').addEventListener('click', () => {
    opened.clear();
    persist();
    reveal.classList.add('empty');
    reveal.textContent = 'Tap a box to open a speaking prompt.';
    grid.querySelectorAll('.mbox').forEach((btn, i) => {
      btn.classList.remove('open');
      btn.disabled = false;
      btn.querySelector('.lid').textContent = '🎁';
      btn.querySelector('.tag').textContent = 'Box ' + (i + 1);
    });
  });

  document.getElementById('showModel').addEventListener('click', () => {
    const box = document.getElementById('speakModel');
    box.hidden = !box.hidden;
  });
}

function bindWriting() {
  const box = document.getElementById('writingBox');
  box.addEventListener('input', () => { state.writing = box.value; save(); });
  document.querySelectorAll('.stem').forEach((btn) => {
    btn.addEventListener('click', () => {
      const stem = btn.textContent.replace('…', '').replace('...', '').trim();
      const cur = box.value;
      box.value = cur ? `${cur}\n${stem} ` : `${stem} `;
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
