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

function accBlock(letter, title, blurb, inner) {
  const open = letter === 'A' ? ' open' : '';
  return `
    <details class="acc"${open}>
      <summary>
        <span><span class="acc-kicker">Activity ${letter}</span>${title}</span>
        <span class="acc-chev" aria-hidden="true">⌄</span>
      </summary>
      <div class="acc-body">
        <p class="intro">${blurb}</p>
        ${inner}
        <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
          <button type="button" class="btn" data-check="${letter}">Check</button>
        </div>
        <div class="feedback" id="practiceFb${letter}"></div>
      </div>
    </details>`;
}

function practiceHTML() {
  const saved = state.practice || {};
  return `
    <h4>Open one activity at a time.</h4>
    <p class="intro">Choose, then check. The note under each item explains why.</p>
    ${accBlock('A', 'Countable or uncountable?', 'Tap the type for each noun.',
      mcGroup('A', [
        { q: 'apples', opts: ['Countable', 'Uncountable'], a: 'Countable', why: 'You can say one apple, two apples.' },
        { q: 'rice', opts: ['Countable', 'Uncountable'], a: 'Uncountable', why: 'You measure rice. Not “two rices.”' },
        { q: 'tortillas', opts: ['Countable', 'Uncountable'], a: 'Countable', why: 'You can count them: three tortillas.' },
        { q: 'milk', opts: ['Countable', 'Uncountable'], a: 'Uncountable', why: 'How much milk? Not how many milks.' },
        { q: 'information', opts: ['Countable', 'Uncountable'], a: 'Uncountable', why: 'No plural: information, not informations.' },
        { q: 'bottles', opts: ['Countable', 'Uncountable'], a: 'Countable', why: 'A bottle is a container you can count. Water inside is uncountable.' }
      ], saved)
    )}
    ${accBlock('B', 'Choose the word', 'some / any / much / many / a few / a little.',
      mcGroup('B', [
        { q: 'How _____ eggs do we have?', opts: ['many', 'much'], a: 'many', why: 'Eggs are countable → how many.' },
        { q: 'How _____ milk do we have?', opts: ['many', 'much'], a: 'much', why: 'Milk is uncountable → how much.' },
        { q: 'We don’t have _____ tomatoes.', opts: ['some', 'any'], a: 'any', why: 'Negatives usually take any.' },
        { q: 'We have _____ cheese.', opts: ['some', 'any'], a: 'some', why: 'Yes-sentences usually take some.' },
        { q: 'We have _____ tortillas. Not many.', opts: ['a few', 'a little'], a: 'a few', why: 'Tortillas are countable → a few.' },
        { q: 'We have _____ salsa.', opts: ['a few', 'a little'], a: 'a little', why: 'Salsa is uncountable → a little.' }
      ], saved)
    )}
    ${accBlock('C', 'Fix the sentence', 'Choose the best American English repair.',
      mcGroup('C', [
        { q: 'I have many informations.', opts: ['I have a lot of information.', 'I have many information.', 'I have a lot of informations.'], a: 'I have a lot of information.', why: 'Information is uncountable. No -s.' },
        { q: 'How many milks do we have?', opts: ['How much milk do we have?', 'How many milk do we have?', 'How much milks do we have?'], a: 'How much milk do we have?', why: 'Milk is uncountable → how much milk.' },
        { q: 'She bought two breads.', opts: ['She bought some bread.', 'She bought two bread.', 'She bought many bread.'], a: 'She bought some bread.', why: 'Bread is uncountable. Or: two loaves of bread.' },
        { q: 'Have you got any tomatoes?', opts: ['Do you have any tomatoes?', 'Have you any tomatoes?', 'Do you got any tomatoes?'], a: 'Do you have any tomatoes?', why: 'This course uses American Do you have…?' }
      ], saved)
    )}
    ${accBlock('D', 'A bottle of…', 'To count an uncountable noun, use a container.',
      mcGroup('D', [
        { q: 'I need _____ water.', opts: ['a bottle of', 'many', 'a few'], a: 'a bottle of', why: 'Water is uncountable. Count it with a bottle of water.' },
        { q: 'She bought _____ bread.', opts: ['a loaf of', 'two breads', 'many bread'], a: 'a loaf of', why: 'Bread is uncountable. A loaf of bread (or some bread).' },
        { q: 'Can I have _____ coffee?', opts: ['a cup of', 'a few', 'many'], a: 'a cup of', why: 'Coffee is uncountable here. A cup of coffee.' },
        { q: 'We need _____ rice.', opts: ['a bag of', 'a few rice', 'two rices'], a: 'a bag of', why: 'Rice is uncountable. A bag of rice.' },
        { q: 'That’s _____ useful information.', opts: ['a piece of', 'many', 'a few'], a: 'a piece of', why: 'Information is uncountable. A piece of information.' },
        { q: 'There is _____ cheese on the table.', opts: ['a piece of', 'a few', 'two cheeses'], a: 'a piece of', why: 'Cheese is usually uncountable. A piece of cheese.' }
      ], saved)
    )}
    <div style="margin-top:14px">
      <button type="button" class="btn ghost" id="resetPractice">Reset all practice</button>
    </div>
  `;
}

function readingHTML() {
  return `
    <h4>A message from the store</h4>
    <p class="intro">Read the whole note. Then tap only the quantity words: <strong>some, any, much, many, a few, a little, a lot of, how many, how much</strong>. The words are not marked. Then answer the questions.</p>
    <div class="reading" id="reading">
      <p>Hey,</p>
      <p>I’m still at the <span class="hit">store</span> after work. The line is <span class="hit">long</span>, so I have <span class="hit" data-ok="1">a little</span> time to write this.</p>
      <p>This morning I checked the fridge. We have <span class="hit" data-ok="1">a few</span> tortillas — not a <span class="hit">full</span> pack. We don’t have <span class="hit" data-ok="1">any</span> chicken, so I’m in the meat section now. There’s <span class="hit" data-ok="1">some</span> cheese and <span class="hit" data-ok="1">a little</span> salsa at home. We have <span class="hit" data-ok="1">a lot of</span> rice, but we don’t need rice <span class="hit">tonight</span>. <span class="hit" data-ok="1">How many</span> limes do we have? I think <span class="hit">zero</span>. I’ll buy <span class="hit" data-ok="1">some</span>.</p>
      <p>Do you have <span class="hit" data-ok="1">any</span> cash? I don’t have <span class="hit" data-ok="1">much</span> money on me. I can use my card. There’s a <span class="hit">bottle</span> of water in the door of the fridge, so we don’t need more water.</p>
      <p>One more thing: please don’t buy <span class="hit">two</span> breads. We need <span class="hit" data-ok="1">some</span> bread, or one loaf. See you around 9:10.</p>
      <p>— Diego</p>
    </div>
    <div class="notice-bar" id="readCount">Found 0 / 11</div>
    <div class="q">
      <span class="q-tag">Main idea</span>
      <p>1. What is this message mainly about?</p>
      <div class="opts" data-readq="main">
        <button type="button" class="opt" data-v="shop">Diego is shopping for taco food and checking what they still need.</button>
        <button type="button" class="opt" data-v="rice">Diego wants his roommate to buy rice.</button>
        <button type="button" class="opt" data-v="job">Diego is explaining why he is late for work.</button>
      </div>
    </div>
    <div class="q">
      <span class="q-tag">Inference</span>
      <p>2. Why is Diego standing in the meat section?</p>
      <div class="opts" data-readq="meat">
        <button type="button" class="opt" data-v="nochicken">They don’t have any chicken at home.</button>
        <button type="button" class="opt" data-v="likes">He always buys meat after work.</button>
        <button type="button" class="opt" data-v="rice2">He needs meat for the rice.</button>
      </div>
    </div>
    <div class="q">
      <span class="q-tag">Inference</span>
      <p>3. Why doesn’t he buy water?</p>
      <div class="opts" data-readq="water">
        <button type="button" class="opt" data-v="fridge">There is already a bottle in the fridge.</button>
        <button type="button" class="opt" data-v="expensive">Water is too expensive tonight.</button>
        <button type="button" class="opt" data-v="none">They don’t drink water.</button>
      </div>
    </div>
    <div class="q">
      <span class="q-tag">Detail</span>
      <p>4. What does he ask his roommate not to buy?</p>
      <div class="opts" data-readq="bread">
        <button type="button" class="opt" data-v="twobreads">Two breads.</button>
        <button type="button" class="opt" data-v="rice">A bag of rice.</button>
        <button type="button" class="opt" data-v="limes">Limes.</button>
      </div>
    </div>
    <div class="q">
      <span class="q-tag">Vocabulary</span>
      <p>5. In “I don’t have much money on me,” <em>on me</em> is closest to:</p>
      <div class="opts" data-readq="cash">
        <button type="button" class="opt" data-v="pocket">with me right now</button>
        <button type="button" class="opt" data-v="bank">in the bank</button>
        <button type="button" class="opt" data-v="never">I never have money</button>
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

const LISTEN_QS = [
  {
    id: 'main', tag: 'Main idea',
    q: 'What is this conversation mainly about?',
    opts: [
      { v: 'list', t: 'Checking the fridge and deciding what to buy for tacos.' },
      { v: 'cook', t: 'Cooking rice together after class.' },
      { v: 'closed', t: 'Why the supermarket is already closed.' }
    ],
    a: 'list'
  },
  {
    id: 'hurry', tag: 'Inference',
    q: 'Why does Luis want to make a list quickly?',
    opts: [
      { v: 'close', t: 'They don’t have much time before the store closes.' },
      { v: 'boss', t: 'His boss is waiting in the kitchen.' },
      { v: 'rice', t: 'The rice will go bad tonight.' }
    ],
    a: 'close'
  },
  {
    id: 'water', tag: 'Inference',
    q: 'Why doesn’t Marta need to buy water?',
    opts: [
      { v: 'bottles', t: 'There are already three bottles in the fridge.' },
      { v: 'hate', t: 'They don’t drink water with tacos.' },
      { v: 'far', t: 'The store does not sell water.' }
    ],
    a: 'bottles'
  },
  {
    id: 'chicken', tag: 'Detail',
    q: 'How much chicken do they have at home?',
    opts: [
      { v: 'none', t: 'None. They don’t have any chicken.' },
      { v: 'little', t: 'A little chicken.' },
      { v: 'lot', t: 'A lot of chicken.' }
    ],
    a: 'none'
  },
  {
    id: 'next', tag: 'Inference',
    q: 'What will they probably do next?',
    opts: [
      { v: 'store', t: 'Go to the store for chicken, tomatoes, and limes.' },
      { v: 'rice', t: 'Cook the rice they already have.' },
      { v: 'water', t: 'Buy water and cheese.' }
    ],
    a: 'store'
  },
  {
    id: 'rice', tag: 'Inference',
    q: 'Why does Marta say the rice is not for tacos tonight?',
    opts: [
      { v: 'meal', t: 'They have rice, but that is not the meal they are making.' },
      { v: 'empty', t: 'They don’t have any rice.' },
      { v: 'bad', t: 'The rice is old and they cannot eat it.' }
    ],
    a: 'meal'
  }
];

function listeningHTML() {
  const picked = state.listenQ || {};
  return `
    <h4>Listening · After work, tacos</h4>
    <p class="intro">Listen once for the main idea. Listen again for details and what people mean, not only the words they say. These questions train the same moves as a mini TOEFL listening.</p>
    <div class="listen-player">
      <audio id="listenAudio" src="./audio/fridge-check.mp3" controls preload="metadata"></audio>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">
        <button type="button" class="btn" id="playListen">Play</button>
        <button type="button" class="btn ghost" id="stopListen">Stop</button>
        <button type="button" class="btn ghost" id="toggleScript">Show / hide script</button>
      </div>
    </div>
    <div id="listenScript" class="card" style="display:none;padding:14px;margin-bottom:12px"></div>
    ${LISTEN_QS.map((it, n) => `
      <div class="q">
        <span class="q-tag">${it.tag}</span>
        <p>${n + 1}. ${it.q}</p>
        <div class="opts" data-lq="${it.id}">
          ${it.opts.map((o) => `<button type="button" class="opt listen-q${picked[it.id]===o.v?' selected':''}" data-lq="${it.id}" data-val="${o.v}">${o.t}</button>`).join('')}
        </div>
      </div>`).join('')}
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
  document.querySelectorAll('.acc').forEach((el) => {
    el.addEventListener('toggle', () => {
      if (el.open) document.querySelectorAll('.acc').forEach((x) => { if (x !== el) x.open = false; });
    });
  });
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
  document.querySelectorAll('[data-check]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const g = btn.dataset.check;
      let right = 0, total = 0;
      document.querySelectorAll(`.q[data-qid^="${g}"]`).forEach((q) => {
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
      const fb = document.getElementById('practiceFb' + g);
      fb.className = 'feedback show ' + (right === total ? 'good' : 'warn');
      fb.textContent = right === total
        ? `All ${total} correct.`
        : `${right} / ${total}. Read the note under each item.`;
    });
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
      if (el.classList.contains('found') || el.classList.contains('miss')) return;
      const ok = el.dataset.ok === '1';
      el.classList.add(ok ? 'found' : 'miss');
      if (ok) found += 1;
      document.getElementById('readCount').textContent = `Found ${found} / ${total}`;
    });
  });
  const answers = { main: 'shop', meat: 'nochicken', water: 'fridge', bread: 'twobreads', cash: 'pocket' };
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
  document.querySelectorAll('.listen-q').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.lq;
      const val = btn.dataset.val;
      state.listenQ = state.listenQ || {};
      state.listenQ[id] = val;
      save();
      btn.parentElement.querySelectorAll('.listen-q').forEach((b) => b.classList.toggle('selected', b.dataset.val === val));
    });
  });
  document.getElementById('checkListen').addEventListener('click', () => {
    let right = 0;
    LISTEN_QS.forEach((it) => {
      const group = document.querySelector(`[data-lq="${it.id}"]`);
      const picked = group.querySelector('.opt.selected');
      group.querySelectorAll('.opt').forEach((o) => {
        o.classList.remove('correct', 'wrong');
        if (o.dataset.val === it.a) o.classList.add('correct');
        else if (o.classList.contains('selected')) o.classList.add('wrong');
      });
      if (picked && picked.dataset.val === it.a) right += 1;
    });
    const total = LISTEN_QS.length;
    const fb = document.getElementById('listenFb');
    fb.className = 'feedback show ' + (right === total ? 'good' : 'warn');
    fb.textContent = right === total
      ? `All ${total} correct. You used the recording, not only the words on the page.`
      : `${right} / ${total}. Listen again for what they mean, not only what they say.`;
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
