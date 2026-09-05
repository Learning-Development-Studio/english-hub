const sections = ['1 Notice', '2 Grammar', '3 Practice', '4 Reading', '5 Speaking', '6 Writing', '7 Can-do'];
const KEY = 'a21PsPcReviewv1';
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
  4: speakingHTML,
  5: writingHTML,
  6: candoHTML
};
function noticeHTML() {
  return `
    <h4>Same people, different time</h4>
    <p class="intro">Tap a card. Notice: habits and facts use Present Simple. Actions happening now use Present Continuous.</p>
    <div class="scene" aria-label="Simple vs continuous voices">
      <div class="zone">
        <div class="who">
          <div class="avatar">S</div>
          <div><strong>Sofia</strong><span>habit · Present Simple</span></div>
        </div>
        <button type="button" class="bubble" data-who="simple1">
          I usually walk to school.
          <small>usually → Present Simple</small>
        </button>
      </div>
      <div class="zone">
        <div class="who">
          <div class="avatar">S</div>
          <div><strong>Sofia</strong><span>now · Present Continuous</span></div>
        </div>
        <button type="button" class="bubble" data-who="cont1">
          Look! I am walking to school now.
          <small>now / Look! → Present Continuous</small>
        </button>
      </div>
      <div class="zone">
        <div class="who">
          <div class="avatar">M</div>
          <div><strong>Marco</strong><span>routine · Present Simple</span></div>
        </div>
        <button type="button" class="bubble" data-who="simple2">
          He works in an office every day.
          <small>every day → Present Simple</small>
        </button>
      </div>
      <div class="zone">
        <div class="who">
          <div class="avatar">M</div>
          <div><strong>Marco</strong><span>temporary · Present Continuous</span></div>
        </div>
        <button type="button" class="bubble" data-who="cont2">
          Today he is working from home.
          <small>today (temporary) → Present Continuous</small>
        </button>
      </div>
    </div>
    <div class="tip"><strong>Listen for the signals:</strong> usually / every day / on Mondays = Simple. now / look! / listen! / at the moment / today (temporary) = Continuous.</div>
  `;
}
function grammarHTML() {
  return `
    <h4>Choose the right present</h4>
    <p class="intro">Present Simple for habits, routines, and facts. Present Continuous for actions happening now or for a short time.</p>
    <div class="grid2">
      <div class="card mint">
        <div class="label">Present Simple</div>
        <p class="big-rule">habits · routines · facts</p>
        <div class="example">I drink coffee every morning.</div>
        <div class="example">She teaches English on Mondays.</div>
        <div class="example">Water boils at 100°C.</div>
        <div class="times">
          <span>usually</span>
          <span>every day</span>
          <span>on Mondays</span>
          <span>always</span>
          <span>sometimes</span>
          <span>never</span>
        </div>
      </div>
      <div class="card">
        <div class="label">Present Continuous</div>
        <p class="big-rule">now · temporary · right now</p>
        <div class="example">Look! It is raining.</div>
        <div class="example">Listen! Someone is calling.</div>
        <div class="example">I am staying with my aunt this week.</div>
        <div class="times">
          <span>now</span>
          <span>look!</span>
          <span>listen!</span>
          <span>at the moment</span>
          <span>today</span>
          <span>this week</span>
        </div>
      </div>
    </div>
    <h5>Quick form map</h5>
    <div class="map" role="table" aria-label="Form comparison">
      <div class="h"></div>
      <div class="h">Form</div>
      <b>Simple</b>
      <div class="cell">I / you / we / they + verb<br>he / she / it + verb-s <small>She walks.</small></div>
      <b>Cont.</b>
      <div class="cell">am / is / are + verb-ing <small>She is walking.</small></div>
    </div>
    <div class="note"><strong>Remember:</strong> <em>today</em> and <em>this week</em> often mean temporary → Continuous. Facts and habits stay Simple even if you say them today.</div>
  `;
}
