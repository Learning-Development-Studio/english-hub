function practiceHTML() {
  const saved = state.practice || {};
  return `
    <h4>Choose, then check.</h4>
    <p class="intro">A: pick Simple or Continuous. B: choose the correct verb form. C: match the signal word.</p>
    <h5>A · Simple or Continuous?</h5>
    ${mcGroup('A', [
      { q: 'I ______ to work every day.', opts: ['drive', 'am driving'], a: 'drive', why: 'every day = habit → Present Simple.' },
      { q: 'Look! The children ______ in the park.', opts: ['play', 'are playing'], a: 'are playing', why: 'Look! = happening now → Present Continuous.' },
      { q: 'She usually ______ tea in the morning.', opts: ['drinks', 'is drinking'], a: 'drinks', why: 'usually = routine → Present Simple.' },
      { q: 'At the moment we ______ for a bus.', opts: ['wait', 'are waiting'], a: 'are waiting', why: 'at the moment = now → Present Continuous.' }
    ], saved)}
    <h5>B · Correct form</h5>
    ${mcGroup('B', [
      { q: 'On Mondays he ______ football.', opts: ['plays', 'is playing', 'play'], a: 'plays', why: 'on Mondays = routine → plays.' },
      { q: 'Listen! Someone ______ the door.', opts: ['knocks', 'is knocking', 'knock'], a: 'is knocking', why: 'Listen! = right now → is knocking.' },
      { q: 'They ______ English every evening.', opts: ['study', 'are studying', 'studies'], a: 'study', why: 'every evening = habit → study.' },
      { q: 'Today I ______ from a café (temporary).', opts: ['work', 'am working', 'works'], a: 'am working', why: 'today temporary → am working.' }
    ], saved)}
    <h5>C · Signal words</h5>
    ${mcGroup('C', [
      { q: 'Which signal fits Present Simple?', opts: ['usually', 'at the moment', 'look!'], a: 'usually', why: 'usually marks habits and routines.' },
      { q: 'Which signal fits Present Continuous?', opts: ['every day', 'on Mondays', 'now'], a: 'now', why: 'now marks an action happening at this moment.' },
      { q: '"She ______ French." (fact / ability)', opts: ['speaks', 'is speaking'], a: 'speaks', why: 'Facts and abilities use Present Simple.' },
      { q: '"Shh! The baby ______."', opts: ['sleeps', 'is sleeping'], a: 'is sleeping', why: 'Shh! / right now → Present Continuous.' }
    ], saved)}
    <div style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap">
      <button type="button" class="btn" id="checkPractice">Check answers</button>
      <button type="button" class="btn ghost" id="resetPractice">Reset</button>
    </div>
    <div class="feedback" id="practiceFb"></div>
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
function readingHTML() {
  return `
    <h4>Sofia's message. Tap every signal word.</h4>
    <p class="intro">Find all 8 signal words (usually, every day, on Mondays, now, Look!, listen!, at the moment, today). Then answer the questions.</p>
    <div class="reading" id="reading">
      Hi! I <span class="hit" data-ok="1">usually</span> get up early and I walk to school <span class="hit" data-ok="1">every day</span>.
      <span class="hit" data-ok="1">On Mondays</span> I have English class.
      But <span class="hit" data-ok="1">today</span> I am staying home — I feel a little sick.
      <span class="hit" data-ok="1">Look!</span> It is raining outside.
      My brother is watching a film <span class="hit" data-ok="1">at the moment</span>.
      <span class="hit" data-ok="1">Listen!</span> Mum is calling us for lunch.
      I am writing this message <span class="hit" data-ok="1">now</span>.
    </div>
    <div id="readCount" style="margin-top:12px;font-weight:800;color:var(--teal-dark)">Found 0 / 8</div>
    <div class="q">
      <p>Sofia walks to school ______.</p>
      <div class="opts" data-readq="habit">
        <button type="button" class="opt" data-v="every">every day</button>
        <button type="button" class="opt" data-v="today">only today</button>
      </div>
    </div>
    <div class="q">
      <p>Right now her brother ______ a film.</p>
      <div class="opts" data-readq="bro">
        <button type="button" class="opt" data-v="watches">watches</button>
        <button type="button" class="opt" data-v="watching">is watching</button>
      </div>
    </div>
    <button type="button" class="btn" id="checkReading" style="margin-top:8px">Check</button>
    <div class="feedback" id="readFb"></div>
  `;
}
function speakingHTML() {
  const prompts = [
    'Say one habit with usually or every day. Example: I usually…',
    'Say what is happening in the room now. Look! / Listen! / At the moment…',
    'Contrast: On Mondays I ______. But today I am ______.',
    'Talk about a classmate: He/She usually ______. Right now he/she is ______.',
    'Tell a partner three sentences: one Simple fact, one Simple routine, one Continuous action now.'
  ];
  return `
    <h4>Say it out loud. Use the signal words.</h4>
    <p class="intro">A partner gives the prompt. You speak. Then swap. Mix Present Simple and Present Continuous.</p>
    <div class="speak" id="speakPrompts">
      ${prompts.map((p, i) => `<div class="prompt" data-sp="${i}" hidden>${p}</div>`).join('')}
    </div>
    <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
      <button type="button" class="btn" id="nextSpeak">Next prompt</button>
      <button type="button" class="btn ghost" id="showModel">Show a model</button>
    </div>
    <div class="card soft" id="speakModel" hidden style="margin-top:12px">
      <div class="label">Models</div>
      <div class="example">I usually drink coffee in the morning.</div>
      <div class="example">Look! It is raining outside.</div>
      <div class="example">On Mondays I work in the office. But today I am working from home.</div>
      <div class="example">She usually reads after lunch. Right now she is talking on the phone.</div>
      <div class="example">Water boils at 100°C. I get up at 7:00. At the moment I am studying English.</div>
    </div>
  `;
}
