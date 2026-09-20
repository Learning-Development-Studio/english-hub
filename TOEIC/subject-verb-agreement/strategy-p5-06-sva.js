(() => {
  const teachHtml = `
<div class="prose">
  <p>In TOEIC Part 5, many items hide the real subject behind extra nouns. The verb still agrees with <strong>one</strong> subject. Cross out the extra phrase. Then match singular or plural.</p>
  <h3>The patterns</h3>
  <div class="slot-grid">
    <article><strong>Ignore the extra phrase</strong><p><em>along with / as well as / together with / in addition to</em> do not change the first noun.</p><code class="code-strip">The director, along with two clerks, is…</code></article>
    <article><strong>Either…or / neither…nor</strong><p>The verb agrees with the noun <em>closest</em> to it.</p><code class="code-strip">Neither the catalog nor the flyers list…</code></article>
    <article><strong>Each / every / everyone</strong><p>These are singular, even if a plural noun follows.</p><code class="code-strip">Each of the crates has… · Everyone is…</code></article>
    <article><strong>One of / neither of</strong><p><em>One of the reports</em> is still singular. <em>Neither of the quotes</em> is singular.</p><code class="code-strip">One of the interns speaks…</code></article>
    <article><strong>The number vs a number</strong><p><em>The number of</em> + plural = singular. <em>A number of</em> + plural = plural.</p><code class="code-strip">The number has fallen. · A number have requested…</code></article>
    <article><strong>Uncountable / news / there</strong><p><em>equipment, furniture, information, news</em> take singular. <em>There is / there are</em> agrees with the noun after the verb.</p><code class="code-strip">The news is… · There are several pallets…</code></article>
  </div>
  <h3>Method</h3>
  <ol class="method">
    <li><strong>Ignore A–D for three seconds.</strong> Find the subject. Draw a line through <em>along with…</em>, <em>as well as…</em>, <em>together with…</em>.</li>
    <li><strong>Ask: one or more?</strong> Watch <em>each / every / one of / neither of / the number</em> — they look plural and are not.</li>
    <li><strong>For either/or and neither/nor,</strong> look only at the noun next to the verb.</li>
    <li><strong>Match the verb.</strong> Singular: <em>is / has / -s</em>. Plural: <em>are / have / no -s</em>.</li>
  </ol>
  <h3>Fast signals</h3>
  <ul class="signals">
    <li><strong>Noun, along with / as well as / together with…, ____</strong> → first noun wins.</li>
    <li><strong>neither A nor B / either A or B</strong> → B (the nearer noun) wins.</li>
    <li><strong>each of / every / everyone / somebody / nothing</strong> → singular.</li>
    <li><strong>one of the + plural</strong> → singular.</li>
    <li><strong>the number of</strong> → singular. <strong>a number of</strong> → plural.</li>
    <li><strong>equipment / furniture / information / news</strong> → singular.</li>
    <li><strong>there ____</strong> → look at the noun after the verb (<em>there are pallets</em>).</li>
    <li><strong>the majority of + people</strong> → usually plural.</li>
  </ul>
  <h3>Common traps</h3>
  <ul>
    <li>Matching the nearest noun after a comma: <em>The director, along with two clerks, are…</em> Wrong. The director <em>is</em>.</li>
    <li><em>each of the applicants are</em>. <em>Each</em> is singular.</li>
    <li><em>the number of jobs have</em>. <em>The number</em> is singular. <em>A number of jobs have</em> is plural.</li>
    <li><em>the news are</em>. In TOEIC, <em>news</em> is singular.</li>
    <li>Translating from Spanish first (that delays finding the real subject).</li>
  </ul>
</div>
`;

  const demos = [
    {
      title: "Demo 1",
      stem: "The marketing director, along with two designers, ____ the booth layout tonight.",
      options: [
        { key: "A", text: "are reviewing" },
        { key: "B", text: "is reviewing" },
        { key: "C", text: "have reviewed" },
        { key: "D", text: "were reviewing" },
      ],
      correctKey: "B",
      slot: "along with",
      teach: "Cross out along with two designers. The subject is the marketing director (singular) → is reviewing. are reviewing matches designers, the trap.",
    },
    {
      title: "Demo 2",
      stem: "Neither the catalog nor the flyers ____ the new SKU.",
      options: [
        { key: "A", text: "lists" },
        { key: "B", text: "list" },
        { key: "C", text: "listing" },
        { key: "D", text: "has listed" },
      ],
      correctKey: "B",
      slot: "neither nor",
      teach: "neither…nor → the nearer noun is flyers (plural) → list. lists would match catalog, which is farther from the verb.",
    },
    {
      title: "Demo 3",
      stem: "Each of the crates ____ a tracking label on two sides.",
      options: [
        { key: "A", text: "have" },
        { key: "B", text: "are" },
        { key: "C", text: "were" },
        { key: "D", text: "has" },
      ],
      correctKey: "D",
      slot: "each of",
      teach: "Each is singular, even before of the crates → has. have / are match crates, the trap.",
    },
    {
      title: "Demo 4",
      stem: "One of the interns ____ Mandarin and Korean.",
      options: [
        { key: "A", text: "speaks" },
        { key: "B", text: "speak" },
        { key: "C", text: "speaking" },
        { key: "D", text: "to speak" },
      ],
      correctKey: "A",
      slot: "one of",
      teach: "One of the interns is still one person → speaks. speak matches interns.",
    },
    {
      title: "Demo 5",
      stem: "The number of late shipments ____ this quarter.",
      options: [
        { key: "A", text: "have fallen" },
        { key: "B", text: "are falling" },
        { key: "C", text: "has fallen" },
        { key: "D", text: "were falling" },
      ],
      correctKey: "C",
      slot: "the number",
      teach: "The number of + plural noun takes a singular verb → has fallen. have fallen is the a number of pattern.",
    },
    {
      title: "Demo 6",
      stem: "Everybody on the night shift ____ a meal voucher.",
      options: [
        { key: "A", text: "receives" },
        { key: "B", text: "receive" },
        { key: "C", text: "receiving" },
        { key: "D", text: "have received" },
      ],
      correctKey: "A",
      slot: "everyone",
      teach: "Everybody is singular → receives. receive matches the idea of many people, not the grammar.",
    },
    {
      title: "Demo 7",
      stem: "The CEO, as well as the board secretaries, ____ the ribbon-cutting.",
      options: [
        { key: "A", text: "are attending" },
        { key: "B", text: "is attending" },
        { key: "C", text: "have attended" },
        { key: "D", text: "were attending" },
      ],
      correctKey: "B",
      slot: "as well as",
      teach: "as well as does not make a plural subject. The CEO is singular → is attending.",
    },
    {
      title: "Demo 8",
      stem: "The laboratory equipment ____ due for calibration in June.",
      options: [
        { key: "A", text: "is" },
        { key: "B", text: "are" },
        { key: "C", text: "have" },
        { key: "D", text: "were" },
      ],
      correctKey: "A",
      slot: "uncountable",
      teach: "equipment is uncountable and singular in TOEIC → is. are is the trap from thinking of many machines.",
    },
    {
      title: "Demo 9",
      stem: "Neither of the quotes ____ installation in the total.",
      options: [
        { key: "A", text: "include" },
        { key: "B", text: "includes" },
        { key: "C", text: "including" },
        { key: "D", text: "are including" },
      ],
      correctKey: "B",
      slot: "neither of",
      teach: "Neither of + plural noun is still singular → includes. include matches quotes.",
    },
    {
      title: "Demo 10",
      stem: "A number of suppliers ____ to the open house on Friday.",
      options: [
        { key: "A", text: "has come" },
        { key: "B", text: "have come" },
        { key: "C", text: "coming" },
        { key: "D", text: "to come" },
      ],
      correctKey: "B",
      slot: "a number of",
      teach: "A number of + plural = plural verb → have come. has come is the number of.",
    },
  ];

  const practice = [
    {
      id: "Q01",
      stem: "The plant manager, along with the safety officers, ____ responsible for the fire drill.",
      options: [
        { key: "A", text: "are" },
        { key: "B", text: "is" },
        { key: "C", text: "have" },
        { key: "D", text: "were" },
      ],
      correctKey: "B",
      slot: "along with",
      explain: "Cross out along with the safety officers. The plant manager is singular → is.",
    },
    {
      id: "Q02",
      stem: "Either the couriers or the dispatcher ____ the route sheet before 6:00 a.m.",
      options: [
        { key: "A", text: "list" },
        { key: "B", text: "listing" },
        { key: "C", text: "lists" },
        { key: "D", text: "have listed" },
      ],
      correctKey: "C",
      slot: "either or",
      explain: "either…or → the nearer noun is the dispatcher (singular) → lists.",
    },
    {
      id: "Q03",
      stem: "Each of the laptops ____ a loan sticker on the lid.",
      options: [
        { key: "A", text: "have" },
        { key: "B", text: "are" },
        { key: "C", text: "were" },
        { key: "D", text: "has" },
      ],
      correctKey: "D",
      slot: "each of",
      explain: "Each is singular → has. have matches laptops.",
    },
    {
      id: "Q04",
      stem: "One of the bids ____ a penalty clause for late delivery.",
      options: [
        { key: "A", text: "includes" },
        { key: "B", text: "include" },
        { key: "C", text: "including" },
        { key: "D", text: "to include" },
      ],
      correctKey: "A",
      slot: "one of",
      explain: "One of the bids is still one bid → includes.",
    },
    {
      id: "Q05",
      stem: "The number of vacancies ____ doubled since January.",
      options: [
        { key: "A", text: "have" },
        { key: "B", text: "are" },
        { key: "C", text: "has" },
        { key: "D", text: "were" },
      ],
      correctKey: "C",
      slot: "the number",
      explain: "The number of is singular → has. have is a number of.",
    },
    {
      id: "Q06",
      stem: "Everyone in logistics ____ expected at the 8:30 briefing.",
      options: [
        { key: "A", text: "is" },
        { key: "B", text: "are" },
        { key: "C", text: "were" },
        { key: "D", text: "have been" },
      ],
      correctKey: "A",
      slot: "everyone",
      explain: "Everyone is singular → is.",
    },
    {
      id: "Q07",
      stem: "The treasurer, as well as the clerks, ____ signing the cash log today.",
      options: [
        { key: "A", text: "are" },
        { key: "B", text: "have" },
        { key: "C", text: "is" },
        { key: "D", text: "were" },
      ],
      correctKey: "C",
      slot: "as well as",
      explain: "as well as does not pluralize. The treasurer is singular → is.",
    },
    {
      id: "Q08",
      stem: "The office furniture ____ scheduled for replacement next month.",
      options: [
        { key: "A", text: "are" },
        { key: "B", text: "is" },
        { key: "C", text: "have" },
        { key: "D", text: "were" },
      ],
      correctKey: "B",
      slot: "uncountable",
      explain: "furniture is uncountable and singular → is.",
    },
    {
      id: "Q09",
      stem: "Neither of the final drafts ____ the client's logo in the header.",
      options: [
        { key: "A", text: "has" },
        { key: "B", text: "have" },
        { key: "C", text: "having" },
        { key: "D", text: "are having" },
      ],
      correctKey: "A",
      slot: "neither of",
      explain: "Neither of is singular → has. have matches drafts.",
    },
    {
      id: "Q10",
      stem: "A number of guests ____ requested vegan meals.",
      options: [
        { key: "A", text: "has" },
        { key: "B", text: "having" },
        { key: "C", text: "have" },
        { key: "D", text: "to have" },
      ],
      correctKey: "C",
      slot: "a number of",
      explain: "A number of + plural = plural → have. has is the number of.",
    },
    {
      id: "Q11",
      stem: "The store that ____ at 7:00 a.m. also handles returns.",
      options: [
        { key: "A", text: "open" },
        { key: "B", text: "opens" },
        { key: "C", text: "opening" },
        { key: "D", text: "have opened" },
      ],
      correctKey: "B",
      slot: "relative",
      explain: "that refers to the store (singular) → opens.",
    },
    {
      id: "Q12",
      stem: "Nothing in the contract ____ the overtime rate.",
      options: [
        { key: "A", text: "mention" },
        { key: "B", text: "mentioning" },
        { key: "C", text: "have mentioned" },
        { key: "D", text: "mentions" },
      ],
      correctKey: "D",
      slot: "indefinite",
      explain: "Nothing is singular → mentions.",
    },
    {
      id: "Q13",
      stem: "The majority of staff members ____ the earlier lunch slot.",
      options: [
        { key: "A", text: "prefers" },
        { key: "B", text: "preferring" },
        { key: "C", text: "is preferring" },
        { key: "D", text: "prefer" },
      ],
      correctKey: "D",
      slot: "majority of",
      explain: "majority of + plural people → plural prefer. prefers would treat majority as a single block.",
    },
    {
      id: "Q14",
      stem: "There ____ several pallets blocking the dock.",
      options: [
        { key: "A", text: "is" },
        { key: "B", text: "has" },
        { key: "C", text: "are" },
        { key: "D", text: "was" },
      ],
      correctKey: "C",
      slot: "there is/are",
      explain: "There agrees with the noun after the verb: several pallets → are.",
    },
    {
      id: "Q15",
      stem: "The committee ____ meeting in room 4B this afternoon.",
      options: [
        { key: "A", text: "are" },
        { key: "B", text: "is" },
        { key: "C", text: "have" },
        { key: "D", text: "were" },
      ],
      correctKey: "B",
      slot: "collective",
      explain: "In TOEIC (American), committee as one group is singular → is meeting.",
    },
    {
      id: "Q16",
      stem: "The chef, together with the waiters, ____ the tasting at 4:00 p.m.",
      options: [
        { key: "A", text: "is hosting" },
        { key: "B", text: "are hosting" },
        { key: "C", text: "host" },
        { key: "D", text: "have hosted" },
      ],
      correctKey: "A",
      slot: "together with",
      explain: "together with does not pluralize. The chef is singular → is hosting.",
    },
    {
      id: "Q17",
      stem: "Every badge that leaves the desk ____ a scan at the gate.",
      options: [
        { key: "A", text: "needs" },
        { key: "B", text: "need" },
        { key: "C", text: "needing" },
        { key: "D", text: "have needed" },
      ],
      correctKey: "A",
      slot: "every",
      explain: "Every badge is singular → needs.",
    },
    {
      id: "Q18",
      stem: "Either the cameras or the alarm ____ the rear entrance after 9:00 p.m.",
      options: [
        { key: "A", text: "control" },
        { key: "B", text: "controlling" },
        { key: "C", text: "have controlled" },
        { key: "D", text: "controls" },
      ],
      correctKey: "D",
      slot: "either or",
      explain: "The nearer noun is the alarm (singular) → controls.",
    },
    {
      id: "Q19",
      stem: "The news about the merger ____ on the intranet this morning.",
      options: [
        { key: "A", text: "are" },
        { key: "B", text: "have" },
        { key: "C", text: "were" },
        { key: "D", text: "is" },
      ],
      correctKey: "D",
      slot: "news",
      explain: "news is singular in TOEIC → is. are is the trap from the -s ending.",
    },
    {
      id: "Q20",
      stem: "All of the information ____ been uploaded to the shared drive.",
      options: [
        { key: "A", text: "have" },
        { key: "B", text: "has" },
        { key: "C", text: "are" },
        { key: "D", text: "were" },
      ],
      correctKey: "B",
      slot: "uncountable",
      explain: "information is uncountable → has been. have matches the idea of many files.",
    },
  ];
function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
function formatStem(stem) {
  return escapeHtml(stem).replace(/____/g, '<span class="blank">____</span>');
}
function bootStrategyClass({ teachHtml, demos, practice }) {
  const total = practice.length;
  const tabs = document.querySelectorAll(".tab");
  const panels = document.querySelectorAll(".panel");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const name = tab.getAttribute("data-tab");
      tabs.forEach((t) => t.classList.toggle("active", t === tab));
      panels.forEach((p) => p.classList.toggle("active", p.getAttribute("data-panel") === name));
    });
  });

  document.getElementById("panel-teach").innerHTML = teachHtml;

  let demoIndex = 0;
  const demoAnswers = new Map();
  const demoOpened = new Set();
  const demoMeta = document.getElementById("demo-meta");
  const demoStage = document.getElementById("demo-stage");
  const demoProgress = document.getElementById("demo-progress");
  const demoPrev = document.getElementById("demo-prev");
  const demoNext = document.getElementById("demo-next");
  const demoReveal = document.getElementById("demo-reveal");

  function renderDemo() {
    const item = demos[demoIndex];
    const selected = demoAnswers.get(demoIndex);
    const opened = demoOpened.has(demoIndex);
    const right = item.options.find((o) => o.key === item.correctKey);
    const ok = selected === item.correctKey;
    demoMeta.textContent = `${demoIndex + 1} of ${demos.length}`;
    demoProgress.style.width = `${((demoIndex + 1) / demos.length) * 100}%`;
    const options = item.options.map((opt) => {
      const classes = ["opt"];
      if (selected === opt.key) classes.push("selected");
      if (opened && opt.key === item.correctKey) classes.push("correct");
      if (opened && selected === opt.key && !ok) classes.push("miss");
      return `
      <button type="button" class="${classes.join(" ")}" data-key="${escapeHtml(opt.key)}" ${opened ? "disabled" : ""}>
        <span class="key">${escapeHtml(opt.key)}</span><span>${escapeHtml(opt.text)}</span>
      </button>`;
    }).join("");
    const verdict = ok
      ? `Correct · ${item.correctKey}. ${right?.text || ""}`
      : `Not this time · the answer is ${item.correctKey}. ${right?.text || ""}`;
    demoStage.innerHTML = `
      <p class="stem">${formatStem(item.stem)}</p>
      <div class="options">${options}</div>
      <p class="status" id="demo-hint" hidden>Choose A, B, C, or D first.</p>
      <div class="teach-box ${ok ? "ok" : "bad"}" id="demo-teach" ${opened ? "" : "hidden"}>
        <strong>${escapeHtml(verdict)}</strong>
        <p style="margin:8px 0 0">${escapeHtml(item.teach)}</p>
      </div>`;
    demoStage.querySelectorAll(".opt").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (demoOpened.has(demoIndex)) return;
        demoAnswers.set(demoIndex, btn.getAttribute("data-key"));
        renderDemo();
      });
    });
    demoPrev.disabled = demoIndex === 0;
    demoNext.textContent = demoIndex === demos.length - 1 ? "Continue to Practice" : "Next";
    demoReveal.textContent = opened ? "Hide feedback" : "See feedback";
  }

  demoPrev.addEventListener("click", () => { if (demoIndex > 0) { demoIndex -= 1; renderDemo(); } });
  demoNext.addEventListener("click", () => {
    if (demoIndex < demos.length - 1) { demoIndex += 1; renderDemo(); return; }
    document.querySelector('.tab[data-tab="practice"]').click();
  });
  demoReveal.addEventListener("click", () => {
    const hint = document.getElementById("demo-hint");
    if (!demoAnswers.has(demoIndex)) {
      if (hint) hint.hidden = false;
      return;
    }
    if (demoOpened.has(demoIndex)) demoOpened.delete(demoIndex);
    else demoOpened.add(demoIndex);
    renderDemo();
  });
  renderDemo();

  let qIndex = 0;
  let submitted = false;
  const answers = new Map();
  const practiceMeta = document.getElementById("practice-meta");
  const practiceStage = document.getElementById("practice-stage");
  const practiceProgress = document.getElementById("practice-progress");
  const practiceStatus = document.getElementById("practice-status");
  const practicePrev = document.getElementById("practice-prev");
  const practiceNext = document.getElementById("practice-next");
  const practiceNav = document.getElementById("practice-nav");
  const submitRow = document.getElementById("practice-submit-row");
  const submitBtn = document.getElementById("submit-btn");
  const resetBtn = document.getElementById("reset-btn");
  const results = document.getElementById("results");
  const scoreLine = document.getElementById("score-line");
  const reviewList = document.getElementById("review-list");

  function updatePracticeChrome() {
    const n = answers.size;
    if (n === total && !submitted) {
      practiceStatus.hidden = false;
      practiceStatus.textContent = `All ${total} answered. Submit when you are ready.`;
    } else {
      practiceStatus.hidden = true;
    }
    practiceProgress.style.width = `${((qIndex + 1) / total) * 100}%`;
    practiceMeta.textContent = `${qIndex + 1} of ${total}` + (n ? ` · ${n} answered` : "");
    practicePrev.disabled = qIndex === 0 || submitted;
    if (qIndex === total - 1) {
      practiceNext.hidden = true;
      submitRow.hidden = false;
    } else {
      practiceNext.hidden = false;
      practiceNext.textContent = "Next";
      submitRow.hidden = submitted ? false : true;
    }
    if (submitted) {
      practiceNav.hidden = true;
      submitRow.hidden = false;
    }
  }

  function renderPractice() {
    const item = practice[qIndex];
    const selected = answers.get(item.id);
    const options = item.options.map((opt) => `
      <button type="button" class="opt${selected === opt.key ? " selected" : ""}" data-key="${escapeHtml(opt.key)}" ${submitted ? "disabled" : ""}>
        <span class="key">${escapeHtml(opt.key)}</span><span>${escapeHtml(opt.text)}</span>
      </button>`).join("");
    practiceStage.innerHTML = `
      <p class="stem">${formatStem(item.stem)}</p>
      <div class="options">${options}</div>`;
    practiceStage.querySelectorAll(".opt").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (submitted) return;
        answers.set(item.id, btn.getAttribute("data-key"));
        renderPractice();
      });
    });
    updatePracticeChrome();
  }

  practicePrev.addEventListener("click", () => { if (qIndex > 0) { qIndex -= 1; renderPractice(); } });
  practiceNext.addEventListener("click", () => { if (qIndex < total - 1) { qIndex += 1; renderPractice(); } });

  submitBtn.addEventListener("click", () => {
    if (answers.size < total) {
      practiceStatus.hidden = false;
      practiceStatus.textContent = `Answer all ${total} before submitting (${answers.size}/${total}).`;
      return;
    }
    submitted = true;
    submitBtn.hidden = true;
    resetBtn.hidden = false;
    practiceNav.hidden = true;
    let correct = 0;
    const review = practice.map((item, index) => {
      const chosen = answers.get(item.id);
      const ok = chosen === item.correctKey;
      if (ok) correct += 1;
      return { index, item, chosen, ok,
        chosenText: item.options.find((o) => o.key === chosen)?.text || "—",
        rightText: item.options.find((o) => o.key === item.correctKey)?.text || "" };
    });
    results.hidden = false;
    scoreLine.textContent = `${correct} / ${total}`;
    reviewList.innerHTML = review.map(({ index, item, chosen, chosenText, rightText, ok }) => `
      <article class="review-item ${ok ? "ok" : "bad"}">
        <h4>Q${index + 1} · ${ok ? "Correct" : "Incorrect"}</h4>
        <p class="stem">${formatStem(item.stem)}</p>
        <p>Your answer: <strong>${escapeHtml(chosen || "—")}. ${escapeHtml(chosenText)}</strong></p>
        <p>Answer: <strong>${escapeHtml(item.correctKey)}. ${escapeHtml(rightText)}</strong></p>
        <p>${escapeHtml(item.explain)}</p>
      </article>`).join("");
    results.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  resetBtn.addEventListener("click", () => {
    submitted = false;
    answers.clear();
    qIndex = 0;
    submitBtn.hidden = false;
    resetBtn.hidden = true;
    results.hidden = true;
    reviewList.innerHTML = "";
    practiceNav.hidden = false;
    renderPractice();
  });

  renderPractice();
}

  bootStrategyClass({ teachHtml, demos, practice });
})();
