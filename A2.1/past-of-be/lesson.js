const sections = ['1 Notice', '2 Grammar', '3 Practice', '4 Reading', '5 Listening', '6 Speaking', '7 Writing', '8 Can-do'];
const KEY = 'a21PastOfBev3';

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
  const picks = state.noticePick || {};
  const items = [
    { id: 'n1', subject: 'Nora', hint: 'one person', sentence: 'Nora ___ at the library yesterday.', answer: 'was' },
    { id: 'n2', subject: 'She', hint: 'negative', sentence: 'She ___ at home last night.', answer: "wasn't" },
    { id: 'n3', subject: 'Hugo & Priya', hint: 'two people', sentence: 'Hugo and Priya ___ late for class.', answer: 'were' },
    { id: 'n4', subject: 'They', hint: 'question', sentence: '___ they tired?', answer: 'Were' },
    { id: 'n5', subject: 'You', hint: 'question', sentence: '___ you at the market last night?', answer: 'Were' },
    { id: 'n6', subject: 'I', hint: 'one person', sentence: 'No — I ___ at home.', answer: 'was' }
  ];
  const optionSets = {
    n1: ['was', 'were'],
    n2: ['was', "wasn't", 'were', "weren't"],
    n3: ['was', 'were'],
    n4: ['Was', 'Were'],
    n5: ['Was', 'Were'],
    n6: ['was', 'were']
  };
  const cards = items.map((it) => {
    const sel = picks[it.id] || '';
    const buttons = (optionSets[it.id] || ['was', 'were']).map((o) => {
      const cls = sel === o ? 'opt selected' : 'opt';
      return `<button type="button" class="${cls}" data-notice-pick="${it.id}" data-val="${escapeAttr(o)}">${escapeHtml(o)}</button>`;
    }).join('');
    return `<div class="zone" data-notice-item="${it.id}" data-answer="${escapeAttr(it.answer)}">
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
    <h4>was / were — clear rules</h4>
    <p class="intro">Study the forms, examples, and traps. Practice comes next.</p>
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
    <div class="tip"><strong>Memory hook:</strong> One person (I/he/she/it) → was. More than one or <em>you</em> → were.</div>
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

function accBlock(letter, kicker, title, blurb, inner) {
  const open = letter === 'A' ? ' open' : '';
  return `
    <details class="acc"${open}>
      <summary>
        <span><span class="acc-kicker">${kicker}</span>${title}</span>
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
    <h4>Practice</h4>
    <p class="intro">Open a drill. Choose an answer, then check.</p>
    ${accBlock('A', '1st drill', 'Choose was / were / wasn’t / weren’t', 'Complete each gap. Look at the subject first.',
      mcGroup('A', [
        { q: 'I ___ at the library yesterday.', opts: ['was', 'were', "wasn't", "weren't"], a: 'was', why: 'I → was.' },
        { q: 'They ___ late for the meeting.', opts: ['was', 'were', "wasn't", "weren't"], a: 'were', why: 'They → were.' },
        { q: 'She ___ at home last night. She was at work.', opts: ['was', 'were', "wasn't", "weren't"], a: "wasn't", why: 'She (negative) → wasn’t.' },
        { q: 'You ___ very quiet in class yesterday.', opts: ['was', 'were', "wasn't", "weren't"], a: 'were', why: 'You → were.' },
        { q: 'We ___ hungry after the match. We ate later.', opts: ['was', 'were', "wasn't", "weren't"], a: "weren't", why: 'We (negative) → weren’t.' },
        { q: 'It ___ cold this morning.', opts: ['was', 'were', "wasn't", "weren't"], a: 'was', why: 'It → was.' }
      ], saved)
    )}
    ${accBlock('B', '2nd drill', 'Fix the trap', 'Choose the correct rewrite.',
      mcGroup('B', [
        { q: 'He were tired after work.', opts: ['He was tired after work.', 'He weren’t tired after work.', 'They was tired after work.'], a: 'He was tired after work.', why: 'He → was, not were.' },
        { q: 'They was at the park.', opts: ['They were at the park.', 'They wasn’t at the park.', 'He were at the park.'], a: 'They were at the park.', why: 'They → were, not was.' },
        { q: 'Was you at school yesterday?', opts: ['Were you at school yesterday?', 'Was he at school yesterday?', 'You was at school yesterday?'], a: 'Were you at school yesterday?', why: 'You → Were, never Was you…?' },
        { q: 'It weren’t sunny.', opts: ['It wasn’t sunny.', 'They weren’t sunny.', 'It weren’t sunnies.'], a: 'It wasn’t sunny.', why: 'It → wasn’t, not weren’t.' },
        { q: 'You was late, but we weren’t.', opts: ['You were late, but we weren’t.', 'You was late, but we wasn’t.', 'You weren’t late, but we was.'], a: 'You were late, but we weren’t.', why: 'You → were. We weren’t is already correct.' },
        { q: 'Were Reza tired after class?', opts: ['Was Reza tired after class?', 'Were they Reza tired after class?', 'Reza were tired after class?'], a: 'Was Reza tired after class?', why: 'Reza = he → Was, not Were.' }
      ], saved)
    )}
    ${accBlock('C', '3rd drill', 'Questions + short answers', 'Choose the best question or short answer.',
      mcGroup('C', [
        { q: '___ Nora at the party?', opts: ['Was', 'Were', 'Is'], a: 'Was', why: 'Nora = she → Was.' },
        { q: '___ you and Kenji busy yesterday?', opts: ['Was', 'Were', 'Are'], a: 'Were', why: 'You and Kenji = plural → Were.' },
        { q: 'Was she at home? — ___', opts: ['Yes, she was.', 'Yes, she were.', 'Yes, they was.'], a: 'Yes, she was.', why: 'Short answer repeats was with she.' },
        { q: 'Were they late? — ___', opts: ['No, they weren’t.', 'No, they wasn’t.', 'No, he weren’t.'], a: 'No, they weren’t.', why: 'They + weren’t.' },
        { q: 'Was it cold? — ___', opts: ['No, it wasn’t.', 'No, it weren’t.', 'No, they wasn’t.'], a: 'No, it wasn’t.', why: 'It → wasn’t.' },
        { q: 'Were you hungry? — ___', opts: ['Yes, I was.', 'Yes, I were.', 'Yes, you was.'], a: 'Yes, I was.', why: 'You → I in the answer: Yes, I was.' }
      ], saved)
    )}
    <div style="margin-top:14px">
      <button type="button" class="btn ghost" id="resetPractice">Reset all practice</button>
    </div>
  `;
}

function readingHTML() {
  return `
    <h4>Reading · Open Day at Riverside School</h4>
    <p class="intro">Read the story. Tap every <strong>was / were / wasn’t / weren’t</strong> you find. Then answer the questions.</p>
    <div class="reading" id="reading">
      <p>Yesterday <span class="hit" data-ok="1">was</span> Open Day at Riverside School. Before eight, the main hall <span class="hit" data-ok="1">was</span> full of parents, and the chairs near the stage <span class="hit" data-ok="1">were</span> already taken. Ms. Ortega <span class="hit" data-ok="1">wasn’t</span> at her desk — she <span class="hit" data-ok="1">was</span> at the front door with maps for visitors.</p>
      <p>My classmates and I <span class="hit" data-ok="1">were</span> guides for the science wing. At first we <span class="hit" data-ok="1">weren’t</span> sure what to say, but after two tours we felt better. The robot club’s table <span class="hit" data-ok="1">was</span> noisy. Two little robots <span class="hit" data-ok="1">were</span> racing across the floor, and kids from another school <span class="hit" data-ok="1">were</span> cheering. Mr. Hale <span class="hit" data-ok="1">wasn’t</span> angry about the noise; he <span class="hit" data-ok="1">was</span> proud. “This is what learning looks like,” he said.</p>
      <p>At noon the cafeteria <span class="hit" data-ok="1">was</span> packed. The sandwiches <span class="hit" data-ok="1">weren’t</span> fancy, but they <span class="hit" data-ok="1">were</span> free. Amira’s parents <span class="hit" data-ok="1">were</span> there too. They <span class="hit" data-ok="1">weren’t</span> from this neighbourhood — they came from León for the day — and Amira <span class="hit" data-ok="1">was</span> nervous before she saw them. After lunch she <span class="hit" data-ok="1">wasn’t</span> nervous anymore. Her dad asked about her projects, and her mum took photos of every poster.</p>
      <p>In the afternoon there <span class="hit" data-ok="1">was</span> a short concert in the courtyard. The sky <span class="hit" data-ok="1">wasn’t</span> perfect, but the music <span class="hit" data-ok="1">was</span> warm and the crowd <span class="hit" data-ok="1">was</span> kind. Yesterday <span class="hit" data-ok="1">wasn’t</span> an ordinary school day. It <span class="hit" data-ok="1">was</span> a day when the school felt open and shared.</p>
      <p>On the bus home, Omar asked, “<span class="hit" data-ok="1">Were</span> you tired?” I laughed. “Yes, I <span class="hit" data-ok="1">was</span> — but I <span class="hit" data-ok="1">wasn’t</span> bored.” We agreed the Open Day <span class="hit" data-ok="1">was</span> a success, and we <span class="hit" data-ok="1">were</span> already talking about next year before our stop.</p>
    </div>
    <div class="notice-bar" id="readCount">Found 0 / 30</div>
    <div class="q">
      <span class="q-tag">Main idea</span>
      <p>1. What is this text mainly about?</p>
      <div class="opts" data-readq="main">
        <button type="button" class="opt" data-v="openday">A busy Open Day at Riverside School and how it felt for students, parents, and teachers.</button>
        <button type="button" class="opt" data-v="robots">A competition to build the fastest robot in León.</button>
        <button type="button" class="opt" data-v="bus">A long bus ride home with no school events.</button>
      </div>
    </div>
    <div class="q">
      <span class="q-tag">Detail</span>
      <p>2. Where was Ms. Ortega during the morning?</p>
      <div class="opts" data-readq="ortega">
        <button type="button" class="opt" data-v="door">At the front door with maps for visitors.</button>
        <button type="button" class="opt" data-v="desk">At her desk in the office.</button>
        <button type="button" class="opt" data-v="bus">On the bus to León.</button>
      </div>
    </div>
    <div class="q">
      <span class="q-tag">Inference</span>
      <p>3. Why was Amira nervous before lunch?</p>
      <div class="opts" data-readq="amira">
        <button type="button" class="opt" data-v="parents">Her parents came from another place and she wanted the day to go well for them.</button>
        <button type="button" class="opt" data-v="food">She did not like free sandwiches.</button>
        <button type="button" class="opt" data-v="robots">She was afraid of the racing robots.</button>
      </div>
    </div>
    <div class="q">
      <span class="q-tag">Vocabulary in context</span>
      <p>4. In the sentence “the cafeteria was packed,” <em>packed</em> is closest to:</p>
      <div class="opts" data-readq="vocab">
        <button type="button" class="opt" data-v="full">very full of people</button>
        <button type="button" class="opt" data-v="closed">closed for the day</button>
        <button type="button" class="opt" data-v="empty">empty and quiet</button>
      </div>
    </div>
    <div class="q">
      <span class="q-tag">Author purpose</span>
      <p>5. Why does the writer include the bus conversation at the end?</p>
      <div class="opts" data-readq="purpose">
        <button type="button" class="opt" data-v="feel">To show how the day felt afterwards — tiring but positive and successful.</button>
        <button type="button" class="opt" data-v="map">To explain the school map for new parents.</button>
        <button type="button" class="opt" data-v="angry">To complain that Mr. Hale was angry about noise.</button>
      </div>
    </div>
    <div class="q">
      <span class="q-tag">Detail</span>
      <p>6. What does Mr. Hale think about the noisy robot table?</p>
      <div class="opts" data-readq="hale">
        <button type="button" class="opt" data-v="proud">He isn’t angry; he is proud of the learning.</button>
        <button type="button" class="opt" data-v="stop">He wants the robots to stop immediately.</button>
        <button type="button" class="opt" data-v="leave">He leaves Open Day early.</button>
      </div>
    </div>
    <button type="button" class="btn" id="checkReading" style="margin-top:8px">Check</button>
    <div class="feedback" id="readFb"></div>
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

const LISTEN_QS = [
  {
    id: 'main', tag: 'Main idea',
    q: 'What is this conversation mainly about?',
    opts: [
      { v: 'party', t: 'Whether Lucia went to Nora’s birthday and what the party was like.' },
      { v: 'bus', t: 'How to fix a slow bus route in León.' },
      { v: 'homework', t: 'English homework for next week.' }
    ],
    a: 'party'
  },
  {
    id: 'lucia', tag: 'Detail',
    q: 'Where was Lucia yesterday?',
    opts: [
      { v: 'home', t: 'At home with her little sister.' },
      { v: 'party', t: 'At Nora’s birthday party.' },
      { v: 'leon', t: 'In León with Reza.' }
    ],
    a: 'home'
  },
  {
    id: 'sister', tag: 'Inference',
    q: 'Why wasn’t Lucia’s sister at the party either?',
    opts: [
      { v: 'tired', t: 'She was tired after a long day at school (and stayed home).' },
      { v: 'angry', t: 'She was angry at Nora.' },
      { v: 'travel', t: 'She was travelling to León.' }
    ],
    a: 'tired'
  },
  {
    id: 'cake', tag: 'Vocabulary in context',
    q: 'When Diego says the cake “wasn’t small,” he most likely means:',
    opts: [
      { v: 'big', t: 'The cake was big / there was a lot of it.' },
      { v: 'bad', t: 'The cake tasted bad.' },
      { v: 'missing', t: 'There was no cake.' }
    ],
    a: 'big'
  },
  {
    id: 'reza', tag: 'Detail',
    q: 'Where was Reza?',
    opts: [
      { v: 'leon', t: 'In León with his cousins.' },
      { v: 'party', t: 'At the party with Kenji.' },
      { v: 'bus', t: 'On the slow bus with Diego.' }
    ],
    a: 'leon'
  },
  {
    id: 'patient', tag: 'Inference',
    q: 'Why does Diego say his friends were patient?',
    opts: [
      { v: 'late', t: 'He was a little late because the bus was slow.' },
      { v: 'loud', t: 'The music was too loud for them.' },
      { v: 'cake', t: 'They did not like vanilla cake.' }
    ],
    a: 'late'
  }
];

function listeningHTML() {
  const picked = state.listenQ || {};
  return `
    <h4>Listening · After the party</h4>
    <p class="intro">Listen to Diego and Lucia. Then answer the questions.</p>
    <div class="listen-player">
      <audio id="listenAudio" src="./audio/past-of-be.mp3" controls preload="metadata"></audio>
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
  { icon: '🏠', text: 'Where were you yesterday morning?' },
  { icon: '😴', text: 'Were you tired last night?' },
  { icon: '👥', text: 'Who was with you yesterday?' },
  { icon: '🌧️', text: 'Was the weather cold yesterday?' },
  { icon: '🚌', text: 'Were you late for anything yesterday?' },
  { icon: '🎂', text: 'Was there a party last weekend?' },
  { icon: '📚', text: 'Were your friends at school yesterday?' },
  { icon: '🛠️', text: 'Fix this out loud: He were tired.' },
  { icon: '❓', text: 'Ask your partner: Was she at home?' },
  { icon: '✅', text: 'Answer only with a short form: Were they busy?' },
  { icon: '🌙', text: 'I wasn’t… last night because…' },
  { icon: '🎉', text: 'They were happy because…' }
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
    <h4>Speaking · Lost weekend</h4>
    <p class="intro">Two activities. No writing here — speak only. Writing stays in the Writing tab.</p>

    <div class="card" style="padding:16px;margin-bottom:16px">
      <div class="label">Primary · Role-play</div>
      <h5 style="margin:8px 0 6px;color:var(--navy)">Lost weekend · friend interview</h5>
      <p class="intro" style="margin:0 0 10px">Your partner “lost” yesterday. Interview them. Switch roles after 3 minutes.</p>
      <div class="grid2">
        <div class="card soft" style="margin:0">
          <div class="label">Student A · Asker</div>
          <p style="margin:8px 0 0;font-weight:600;color:var(--navy)">Ask Was / Were questions about yesterday. Examples:</p>
          <ul style="margin:8px 0 0 18px;color:var(--muted);line-height:1.45">
            <li>Were you at home yesterday morning?</li>
            <li>Was your phone with you?</li>
            <li>Were your friends busy?</li>
            <li>Was the weather nice?</li>
          </ul>
        </div>
        <div class="card soft" style="margin:0">
          <div class="label">Student B · Answerer</div>
          <p style="margin:8px 0 0;font-weight:600;color:var(--navy)">Answer with a short form + one detail.</p>
          <div class="example">Yes, I was. I was at the market.</div>
          <div class="example">No, they weren’t. They were at work.</div>
          <div class="example">No, it wasn’t. It was cloudy.</div>
        </div>
      </div>
    </div>

    <h4>Mystery Box · yesterday prompts</h4>
    <p class="intro">Tap a box. Say the sentence or question to a partner.</p>
    <div class="mystery-wrap">
      <div class="mystery-grid" id="mysteryGrid">${boxes}</div>
      <div class="mystery-reveal empty" id="mysteryReveal">Tap a box to open a speaking prompt.</div>
      <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
        <button type="button" class="btn ghost" id="resetBoxes">Reset boxes</button>
        <button type="button" class="btn ghost" id="showModel">Show a model</button>
      </div>
      <div class="card soft" id="speakModel" hidden style="margin-top:12px">
        <div class="label">Models</div>
        <div class="example">Were you at home? — Yes, I was. I was with my sister.</div>
        <div class="example">Was she tired? — No, she wasn’t. She was happy.</div>
        <div class="example">They were at the park. We weren’t late.</div>
        <div class="example">Fix: He were tired → He was tired.</div>
      </div>
    </div>
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
  if (i === 0) bindNotice();
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

function bindNotice() {
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
  document.getElementById('readCount').textContent = `Found 0 / ${total}`;
  document.querySelectorAll('#reading .hit').forEach((el) => {
    el.addEventListener('click', () => {
      if (el.classList.contains('found') || el.classList.contains('miss')) return;
      const ok = el.dataset.ok === '1';
      el.classList.add(ok ? 'found' : 'miss');
      if (ok) found += 1;
      document.getElementById('readCount').textContent = `Found ${found} / ${total}`;
    });
  });
  const answers = { main: 'openday', ortega: 'door', amira: 'parents', vocab: 'full', purpose: 'feel', hale: 'proud' };
  document.querySelectorAll('[data-readq] .opt').forEach((btn) => {
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
    fb.textContent = `${right} / ${n} questions. Forms found: ${found} / ${total}.`;
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
      ? `All ${total} correct.`
      : `${right} / ${total}. Listen again.`;
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
