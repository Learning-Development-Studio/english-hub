const verbs = [
  'make','say','get','know','think','see','want','use','find','tell',
  'ask','feel','try','leave','put','mean','keep','let','begin','seem',
  'show','hear','play','move','live','believe','bring','happen','call','need'
];
const pad = (n) => String(n).padStart(2, '0');
const ASSET_V = '20260910b';
const front = (i) => `assets/front/${pad(i + 1)}.png?v=${ASSET_V}`;
const audioSrc = (i) => `assets/audio/${verbs[i].replace(/\s+/g, '-')}.mp3`;
const KEY = 'verbs2A12v2';
function loadState() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); }
  catch { return {}; }
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); }
  catch { }
}
const state = loadState();
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ----- 01 Deck ----- */
let order = verbs.map((_, i) => i);
let card = 0;
let flipped = false;
const btnAudio = document.getElementById('btnAudio');
const iconPlay = document.getElementById('iconPlay');
const iconPause = document.getElementById('iconPause');
const player = new Audio();
player.preload = 'none';
function setAudioUI(playing) {
  btnAudio.classList.toggle('playing', playing);
  iconPlay.hidden = playing;
  iconPause.hidden = !playing;
  btnAudio.setAttribute('aria-label', playing ? 'Stop audio' : 'Play verb audio');
  btnAudio.title = playing ? 'Stop' : 'Play pronunciation';
}
function stopAudio() {
  player.pause();
  player.currentTime = 0;
  setAudioUI(false);
}
function playAudioForCurrent() {
  const i = order[card];
  const src = audioSrc(i);
  btnAudio.classList.remove('missing');
  btnAudio.hidden = false;
  btnAudio.disabled = false;
  player.src = src;
  player.play().then(() => setAudioUI(true)).catch(() => {
    btnAudio.classList.add('missing');
    setAudioUI(false);
  });
}
function toggleAudio(e) {
  if (e) { e.stopPropagation(); e.preventDefault(); }
  if (btnAudio.classList.contains('missing') || btnAudio.disabled) return;
  if (!player.paused && !player.ended) { stopAudio(); return; }
  playAudioForCurrent();
}
player.addEventListener('ended', () => setAudioUI(false));
player.addEventListener('error', () => {
  btnAudio.classList.add('missing');
  setAudioUI(false);
});
btnAudio.addEventListener('click', toggleAudio);
function show() {
  const i = order[card];
  document.getElementById('frontImg').src = front(i);
  document.getElementById('frontImg').alt = verbs[i];
  document.getElementById('backImg').src = `assets/back/${pad(i + 1)}.png?v=${ASSET_V}`;
  document.getElementById('backImg').alt = verbs[i];
  document.getElementById('verbName').textContent = verbs[i].toUpperCase();
  document.getElementById('counter').textContent = `${card + 1} / ${verbs.length}`;
  document.getElementById('flipCard').classList.toggle('is-flipped', flipped);
  btnAudio.classList.remove('missing');
  btnAudio.hidden = false;
  btnAudio.disabled = false;
  stopAudio();
}
function flip() {
  flipped = !flipped;
  show();
}
function goPrev() {
  card = (card - 1 + verbs.length) % verbs.length;
  show();
}
function goNext() {
  card = (card + 1) % verbs.length;
  show();
}
function isTypingTarget(el) {
  if (!el || el === document.body) return false;
  const tag = (el.tagName || '').toLowerCase();
  return tag === 'input' || tag === 'textarea' || tag === 'select' || el.isContentEditable;
}
document.getElementById('flipCard').addEventListener('click', (e) => {
  if (e.target.closest('#btnAudio')) return;
  flip();
});
document.getElementById('flipCard').addEventListener('keydown', (e) => {
  if (e.target.closest('#btnAudio')) return;
  if (e.key === 'Enter') { e.preventDefault(); flip(); }
});
document.getElementById('btnFlip').addEventListener('click', (e) => { e.stopPropagation(); flip(); });
document.getElementById('btnPrev').addEventListener('click', goPrev);
document.getElementById('btnNext').addEventListener('click', goNext);
document.addEventListener('keydown', (e) => {
  if (isTypingTarget(e.target)) return;
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  if (!document.getElementById('act-deck').open) return;
  if (e.code === 'ArrowRight') { e.preventDefault(); goNext(); }
  else if (e.code === 'ArrowLeft') { e.preventDefault(); goPrev(); }
  else if (e.code === 'Space') { e.preventDefault(); flip(); }
});
document.getElementById('btnShuffle').addEventListener('click', () => { order = shuffle(order); card = 0; show(); });
document.getElementById('btnReset').addEventListener('click', () => {
  order = verbs.map((_, i) => i);
  card = 0;
  flipped = false;
  show();
});
show();

function goBtn(prefix) {
  return document.getElementById('btn' + prefix.charAt(0).toUpperCase() + prefix.slice(1) + 'Go');
}
function runMc(prefix, bank, renderStem, doneText) {
  let set = [];
  let q = 0;
  let score = 0;
  let locked = false;
  const go = goBtn(prefix);
  function start() {
    set = shuffle(bank.slice()).slice(0, Math.min(10, bank.length));
    q = 0;
    score = 0;
    locked = false;
    document.getElementById(prefix + 'Play').hidden = false;
    document.getElementById(prefix + 'Done').hidden = true;
    document.getElementById(prefix + 'Score').textContent = '0';
    if (go) go.hidden = true;
    paint();
  }
  function paint() {
    if (q >= set.length) {
      document.getElementById(prefix + 'Play').hidden = true;
      document.getElementById(prefix + 'Done').hidden = false;
      document.getElementById(prefix + 'Final').textContent = score + ' / ' + set.length + (doneText || '');
      return;
    }
    locked = false;
    const item = set[q];
    document.getElementById(prefix + 'Round').textContent = (q + 1) + ' / ' + set.length;
    document.getElementById(prefix + 'Fb').textContent = '';
    if (go) go.hidden = true;
    renderStem(item);
    const opts = shuffle(item.opts.slice());
    document.getElementById(prefix + 'Opts').innerHTML = opts.map((o) =>
      `<button type="button" class="opt" data-v="${o.replace(/"/g, '&quot;')}">${o}</button>`
    ).join('');
    document.querySelectorAll('#' + prefix + 'Opts .opt').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (locked) return;
        locked = true;
        const pick = btn.dataset.v;
        document.querySelectorAll('#' + prefix + 'Opts .opt').forEach((o) => {
          if (o.dataset.v === item.a) o.classList.add('correct');
          else if (o === btn) o.classList.add('wrong');
        });
        if (pick === item.a) {
          score += 1;
          document.getElementById(prefix + 'Fb').textContent = item.why || 'Yes.';
        } else {
          document.getElementById(prefix + 'Fb').textContent = item.why || ('Use ' + item.a + '.');
        }
        document.getElementById(prefix + 'Score').textContent = String(score);
        if (go) {
          go.hidden = false;
          go.focus();
        }
      });
    });
  }
  if (go) {
    go.addEventListener('click', () => {
      q += 1;
      paint();
    });
  }
  return start;
}

/* ----- 02 Right verb ----- */
const RIGHT = [
  { stem: 'She _____ hello to everyone.', opts: ['says', 'tells', 'asks'], a: 'says', why: 'We say hello. We tell someone a story.' },
  { stem: 'Please _____ me your name.', opts: ['tell', 'say', 'ask'], a: 'tell', why: 'Tell + me: tell me your name. Not say me.' },
  { stem: 'Can I _____ you a question?', opts: ['ask', 'tell', 'say'], a: 'ask', why: 'Ask a question. Ask you a question.' },
  { stem: 'I _____ a present on my birthday.', opts: ['get', 'bring', 'find'], a: 'get', why: 'Get a present = someone gives it to you.' },
  { stem: 'Please _____ your book to class.', opts: ['bring', 'get', 'leave'], a: 'bring', why: 'Bring = take it with you to that place.' },
  { stem: 'I _____ breakfast every morning.', opts: ['make', 'do', 'get'], a: 'make', why: 'We make breakfast. We don’t do breakfast.' },
  { stem: 'I _____ the answer.', opts: ['know', 'think', 'seem'], a: 'know', why: 'Know = I have the answer. I am sure.' },
  { stem: 'I _____ she is at home, but I’m not sure.', opts: ['think', 'know', 'mean'], a: 'think', why: 'Think = I am not 100% sure.' },
  { stem: 'She _____ tired today.', opts: ['seems', 'feels', 'knows'], a: 'seems', why: 'Seem = she looks tired. I see her.' },
  { stem: 'I _____ tired today.', opts: ['feel', 'seem', 'mean'], a: 'feel', why: 'Feel = it is my body. I feel tired.' },
  { stem: 'What does this word _____?', opts: ['mean', 'think', 'know'], a: 'mean', why: 'What does this word mean?' },
  { stem: '_____ the book on the table.', opts: ['Put', 'Keep', 'Bring'], a: 'Put', why: 'Put = place it there. Put the book on the table.' }
];
const startRight = runMc('right', RIGHT, (item) => {
  document.getElementById('rightStem').textContent = item.stem;
});
document.getElementById('btnRightNew').addEventListener('click', startRight);

/* ----- 03 Snap ----- */
const SNAP = [
  { verb: 'MAKE', opts: ['breakfast', 'a bus', 'the rain'], a: 'breakfast', why: 'make breakfast.' },
  { verb: 'GET', opts: ['a present', 'homework', 'a photo'], a: 'a present', why: 'get a present.' },
  { verb: 'SAY', opts: ['hello', 'me a story', 'a question'], a: 'hello', why: 'say hello.' },
  { verb: 'TELL', opts: ['a story', 'hello', 'the window'], a: 'a story', why: 'tell a story.' },
  { verb: 'ASK', opts: ['a question', 'breakfast', 'home'], a: 'a question', why: 'ask a question.' },
  { verb: 'KEEP', opts: ['a secret', 'a bus', 'hello'], a: 'a secret', why: 'keep a secret.' },
  { verb: 'LEAVE', opts: ['home at 8', 'a question', 'hello'], a: 'home at 8', why: 'leave home.' },
  { verb: 'BRING', opts: ['your book', 'the rain', 'a secret'], a: 'your book', why: 'bring your book.' },
  { verb: 'PLAY', opts: ['soccer', 'breakfast', 'a secret'], a: 'soccer', why: 'play soccer.' },
  { verb: 'CALL', opts: ['my mom', 'a table', 'the rain'], a: 'my mom', why: 'call my mom.' },
  { verb: 'NEED', opts: ['help', 'hello', 'a secret'], a: 'help', why: 'need help.' },
  { verb: 'USE', opts: ['a computer', 'tired', 'hello'], a: 'a computer', why: 'use a computer.' }
];
const startSnap = runMc('snap', SNAP, (item) => {
  document.getElementById('snapVerb').textContent = item.verb;
});
document.getElementById('btnSnapNew').addEventListener('click', startSnap);

/* ----- 04 Two jobs ----- */
const JOBS = [
  { v: 'GET', s1: 'I get a present on my birthday.', s2: 'I get home at 8:00.', same: false, why: 'Different. get a present = receive. get home = arrive.' },
  { v: 'MAKE', s1: 'I make breakfast.', s2: 'I make a friend.', same: false, why: 'Different. make breakfast = cook. make a friend = start a friendship.' },
  { v: 'SEE', s1: 'I see my sister every Sunday.', s2: 'Oh, I see!', same: false, why: 'Different. see a person = with your eyes. I see = I understand.' },
  { v: 'CALL', s1: 'I call my mom in the evening.', s2: 'Please call me tomorrow.', same: true, why: 'Same job: telephone someone.' },
  { v: 'LEAVE', s1: 'I leave home at 7:30.', s2: 'Don’t leave your bag here.', same: false, why: 'Different. leave home = go. leave a bag = don’t take it.' },
  { v: 'KEEP', s1: 'Keep the change.', s2: 'Keep a secret.', same: false, why: 'Different. keep the change = don’t return money. keep a secret = don’t tell.' },
  { v: 'PLAY', s1: 'They play soccer on Saturday.', s2: 'She plays the guitar.', same: false, why: 'Close, but different: a sport vs an instrument.' }
];
let jobsSet = [];
let jobsQ = 0;
let jobsScore = 0;
let jobsLocked = false;
function startJobs() {
  jobsSet = shuffle(JOBS.slice());
  jobsQ = 0;
  jobsScore = 0;
  jobsLocked = false;
  document.getElementById('jobsPlay').hidden = false;
  document.getElementById('jobsDone').hidden = true;
  document.getElementById('jobsScore').textContent = '0';
  document.getElementById('btnJobsGo').hidden = true;
  showJobs();
}
function showJobs() {
  if (jobsQ >= jobsSet.length) {
    document.getElementById('jobsPlay').hidden = true;
    document.getElementById('jobsDone').hidden = false;
    document.getElementById('jobsFinal').textContent = jobsScore + ' / ' + jobsSet.length;
    return;
  }
  jobsLocked = false;
  const item = jobsSet[jobsQ];
  document.getElementById('jobsRound').textContent = (jobsQ + 1) + ' / ' + jobsSet.length;
  document.getElementById('jobsVerb').textContent = item.v;
  document.getElementById('jobsS1').textContent = item.s1;
  document.getElementById('jobsS2').textContent = item.s2;
  document.getElementById('jobsFb').textContent = '';
  document.getElementById('btnJobsGo').hidden = true;
  document.getElementById('jobsOpts').innerHTML =
    '<button type="button" class="opt" data-v="same">Same meaning</button>' +
    '<button type="button" class="opt" data-v="diff">Two different jobs</button>';
  document.querySelectorAll('#jobsOpts .opt').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (jobsLocked) return;
      jobsLocked = true;
      const want = item.same ? 'same' : 'diff';
      document.querySelectorAll('#jobsOpts .opt').forEach((o) => {
        if (o.dataset.v === want) o.classList.add('correct');
        else if (o === btn) o.classList.add('wrong');
      });
      if (btn.dataset.v === want) jobsScore += 1;
      document.getElementById('jobsScore').textContent = String(jobsScore);
      document.getElementById('jobsFb').textContent = item.why;
      const go = document.getElementById('btnJobsGo');
      go.hidden = false;
      go.focus();
    });
  });
}
document.getElementById('btnJobsGo').addEventListener('click', () => {
  jobsQ += 1;
  showJobs();
});
document.getElementById('btnJobsNew').addEventListener('click', startJobs);

/* ----- 05 Ask me ----- */
const ASK = [
  { verb: 'WANT', model: 'What do you want for dinner?' },
  { verb: 'NEED', model: 'Do you need help?' },
  { verb: 'KNOW', model: 'Do you know her name?' },
  { verb: 'FEEL', model: 'How do you feel today?' },
  { verb: 'LIVE', model: 'Where do you live?' },
  { verb: 'PLAY', model: 'What do you play at the weekend?' },
  { verb: 'CALL', model: 'Who do you call every day?' },
  { verb: 'MAKE', model: 'What do you make at home?' },
  { verb: 'GET', model: 'What do you get for your birthday?' },
  { verb: 'THINK', model: 'What do you think about this class?' }
];
let askSet = ASK.slice();
let askI = 0;
let askTick = null;
let askLeft = 10;
function paintAsk() {
  const item = askSet[askI];
  document.getElementById('askRound').textContent = (askI + 1) + ' / ' + askSet.length;
  document.getElementById('askVerb').textContent = item.verb;
  document.getElementById('askModel').hidden = true;
  document.getElementById('askModel').textContent = item.model;
  document.getElementById('askTime').textContent = '0:10';
  document.getElementById('askTimeStat').classList.remove('low');
}
function clearAskTimer() {
  if (askTick) { clearInterval(askTick); askTick = null; }
}
function startAskTimer() {
  clearAskTimer();
  askLeft = 10;
  document.getElementById('askTime').textContent = '0:10';
  askTick = setInterval(() => {
    askLeft -= 1;
    document.getElementById('askTime').textContent = '0:' + String(Math.max(0, askLeft)).padStart(2, '0');
    document.getElementById('askTimeStat').classList.toggle('low', askLeft <= 3);
    if (askLeft <= 0) {
      clearAskTimer();
      document.getElementById('askModel').hidden = false;
    }
  }, 1000);
}
document.getElementById('btnAskStart').addEventListener('click', startAskTimer);
document.getElementById('btnAskModel').addEventListener('click', () => {
  document.getElementById('askModel').hidden = false;
});
document.getElementById('btnAskNext').addEventListener('click', () => {
  clearAskTimer();
  askI = (askI + 1) % askSet.length;
  paintAsk();
});
function startAsk() {
  askSet = shuffle(ASK.slice());
  askI = 0;
  clearAskTimer();
  paintAsk();
}

/* ----- 06 What happens next ----- */
const NEXT = [
  { sit: 'The phone is ringing.', opts: ['call', 'leave', 'believe'], a: 'call', why: 'You call, or you answer a call.' },
  { sit: 'It is 8:00. English class…', opts: ['begins', 'keeps', 'seems'], a: 'begins', why: 'Class begins.' },
  { sit: 'She has a suitcase at the door.', opts: ['leaves', 'makes', 'knows'], a: 'leaves', why: 'She leaves.' },
  { sit: 'I can’t see my keys.', opts: ['find', 'happen', 'seem'], a: 'find', why: 'I look and I find them.' },
  { sit: 'He looks very tired.', opts: ['seems', 'brings', 'plays'], a: 'seems', why: 'He seems tired.' },
  { sit: 'I have a question.', opts: ['ask', 'live', 'move'], a: 'ask', why: 'I ask the question.' },
  { sit: 'Your friend is at the door with a cake.', opts: ['brings', 'keeps', 'thinks'], a: 'brings', why: 'She brings the cake.' },
  { sit: 'I don’t understand this word.', opts: ['mean', 'bring', 'play'], a: 'mean', why: 'What does it mean?' },
  { sit: 'I’m hungry.', opts: ['need', 'call', 'believe'], a: 'need', why: 'I need lunch.' },
  { sit: 'Something is not normal in the street.', opts: ['happens', 'puts', 'uses'], a: 'happens', why: 'Something happens.' }
];
const startNext = runMc('next', NEXT, (item) => {
  document.getElementById('nextSit').textContent = item.sit;
});
document.getElementById('btnNextNew').addEventListener('click', startNext);

/* ----- 07 Can you ----- */
const candoItems = [
  ['saytell', 'I can use say and tell in two sentences.', 'She says hello. I tell a story.'],
  ['wantneed', 'I can ask a question with want or need.', 'Do you need help?'],
  ['seem', 'I can say how someone seems.', 'She seems tired.'],
  ['get', 'I can use get in two ways.', 'I get a present. I get home at 8.'],
  ['ask', 'I can make a question with one verb from this set.', 'Where do you live?']
];
function renderCando() {
  const c = state.cando || {};
  const ex = state.candoEx || {};
  document.getElementById('candoList').innerHTML = candoItems.map(([id, label, ph]) => `
    <label>
      <input type="checkbox" data-cando="${id}" ${c[id] ? 'checked' : ''}>
      <span>
        ${label}
        <input type="text" data-candoex="${id}" placeholder="${ph}" value="${(ex[id] || '').replace(/"/g, '&quot;')}">
      </span>
    </label>
  `).join('');
  document.querySelectorAll('[data-cando]').forEach((el) => {
    el.addEventListener('change', () => {
      state.cando = state.cando || {};
      state.cando[el.dataset.cando] = el.checked;
      save();
    });
  });
  document.querySelectorAll('[data-candoex]').forEach((el) => {
    el.addEventListener('click', (e) => e.stopPropagation());
    el.addEventListener('input', () => {
      state.candoEx = state.candoEx || {};
      state.candoEx[el.dataset.candoex] = el.value;
      save();
    });
  });
}
renderCando();

/* ----- 08 Hot seat ----- */
const HOT = [
  { clues: ['Do you do this with your mouth?', 'You do this with hello.', 'You don’t tell a story.'], opts: ['say', 'tell', 'ask', 'call'], a: 'say', why: 'say hello.' },
  { clues: ['This is in your head.', 'You are not 100% sure.', 'I _____ she is at home.'], opts: ['think', 'know', 'mean', 'seem'], a: 'think', why: 'think = not sure.' },
  { clues: ['You are 100% sure.', 'I _____ the answer.', 'It is not “think”.'], opts: ['know', 'think', 'believe', 'seem'], a: 'know', why: 'know the answer.' },
  { clues: ['You do this with a phone.', 'You _____ your mom.', 'It is not “ask”.'], opts: ['call', 'ask', 'tell', 'say'], a: 'call', why: 'call someone.' },
  { clues: ['You look at a person.', 'She _____ tired.', 'It is not “feel” (that is you).'], opts: ['seems', 'feels', 'knows', 'means'], a: 'seems', why: 'She seems tired.' },
  { clues: ['You take something with you to a place.', '_____ your book to class.', 'It is not “get”.'], opts: ['bring', 'get', 'leave', 'put'], a: 'bring', why: 'bring your book.' },
  { clues: ['You don’t tell anyone.', '_____ a secret.', 'It is not “leave”.'], opts: ['keep', 'leave', 'put', 'let'], a: 'keep', why: 'keep a secret.' },
  { clues: ['A class or a movie…', 'It _____ at 8:00.', 'It is not “happen”.'], opts: ['begins', 'happens', 'moves', 'needs'], a: 'begins', why: 'It begins at 8:00.' }
];
const startHot = runMc('hot', HOT, (item) => {
  document.getElementById('hotClues').innerHTML = item.clues.map((c) => `<li>${c}</li>`).join('');
});
document.getElementById('btnHotNew').addEventListener('click', startHot);

/* ----- 09 put keep leave bring ----- */
const KEYS = [
  { sit: 'The book goes on the table.', opts: ['put', 'keep', 'leave', 'bring'], a: 'put', why: 'Put the book on the table.' },
  { sit: 'Your friend is outside. Take the cake to her.', opts: ['bring', 'leave', 'keep', 'put'], a: 'bring', why: 'Bring the cake.' },
  { sit: 'I go to work. My bag stays at home.', opts: ['leave', 'bring', 'put', 'keep'], a: 'leave', why: 'Leave the bag at home.' },
  { sit: 'This is my secret. Don’t tell anyone.', opts: ['keep', 'leave', 'bring', 'put'], a: 'keep', why: 'Keep the secret.' },
  { sit: 'Please take your notebook to class tomorrow.', opts: ['bring', 'leave', 'put', 'keep'], a: 'bring', why: 'Bring your notebook.' },
  { sit: 'Don’t take the keys. They stay on the table.', opts: ['leave', 'bring', 'put', 'keep'], a: 'leave', why: 'Leave the keys.' },
  { sit: 'The milk goes in the fridge.', opts: ['put', 'bring', 'leave', 'keep'], a: 'put', why: 'Put the milk in the fridge.' },
  { sit: 'This money is yours. Don’t return it.', opts: ['keep', 'put', 'leave', 'bring'], a: 'keep', why: 'Keep the change.' }
];
const startKeys = runMc('keys', KEYS, (item) => {
  document.getElementById('keysSit').textContent = item.sit;
});
document.getElementById('btnKeysNew').addEventListener('click', startKeys);

/* Accordion: one open */
const activityPanels = Array.from(document.querySelectorAll('.activity'));
activityPanels.forEach((panel) => {
  panel.addEventListener('toggle', () => {
    if (panel.id === 'act-ask' && !panel.open) clearAskTimer();
    if (!panel.open) return;
    activityPanels.forEach((other) => { if (other !== panel) other.open = false; });
    if (panel.id === 'act-right') startRight();
    if (panel.id === 'act-snap') startSnap();
    if (panel.id === 'act-jobs') startJobs();
    if (panel.id === 'act-ask') startAsk();
    if (panel.id === 'act-next') startNext();
    if (panel.id === 'act-hot') startHot();
    if (panel.id === 'act-keys') startKeys();
  });
});
