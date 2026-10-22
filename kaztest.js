// KAZTEST on the Kazakh course list (app.js): what the exam is, why residents need it, that the four
// courses cover its A1 points, and three mock tests from kaztest-data.js. Exam mode keeps the real section
// times and scores at the end; practice mode explains every answer at once. Best scores stay on this device.
(() => {
  const SETS = window.KAZTEST_SETS || [];
  let root = null;
  const intro = () => `<section class="kt-intro" aria-labelledby="ktIntroTitle">
    <span class="eyebrow">KAZTEST 哈萨克语考试</span>
    <h3 id="ktIntroTitle">学完下面四门课程，可以应对 KAZTEST A1 考试</h3>
    <p><b>KAZTEST</b> 是哈萨克斯坦国家哈萨克语水平考试，由国家考试中心组织，分 A1、A2、B1、B2、C1 五个等级。2026 年 2 月 13 日起，外国人在哈萨克斯坦申请居留证（ВНЖ），要先通过 KAZTEST A1。</p>
    <p>下面四门课程覆盖 A1 考试的考点：<b>字母与发音</b>让你读懂题目，<b>基础语法</b>对应阅读里的选词填空，<b>数字与情景对话</b>对应听力里的数字、价格、时间和问答，<b>造句与口语</b>对应最常见的问句和回答。</p>
    <details class="kt-about"><summary>为什么要考？考什么？</summary><div class="kt-about-body">
      <ul class="kt-points">
        <li><b>申请居留必须先考。</b>2026 年 2 月 13 日起，申请居留证（ВНЖ）和“同胞”（қандас）身份，都要先在线通过 KAZTEST A1（入门）。</li>
        <li><b>考完还要打分。</b>通过后要在 migration.enbek.kz 填写问卷（年龄、学历、语言、工作经历、健康状况等），按“移民潜力”打分，满 400 分才能进入下一步。</li>
        <li><b>要求可能提高。</b>2026 年 4 月有媒体报道，语言要求可能提高到 B1 甚至 B2，但截至 2026 年 10 月 22 日官方没有发布相关文件。这些规定目前是试点，有效期到 2026 年 12 月 31 日。</li>
      </ul>
      <div class="kt-table-wrap"><table class="kt-table"><caption>居留用的线上 A1 考试</caption>
        <thead><tr><th>部分</th><th>题数</th><th>时间</th><th>考什么</th></tr></thead>
        <tbody><tr><td><b lang="kk">Тыңдалым</b> 听力</td><td>20</td><td>20 分钟</td><td>日常对话和广播：数字、价格、时间、地点、天气、看病、购物</td></tr>
        <tr><td><b lang="kk">Оқылым</b> 阅读</td><td>40</td><td>50 分钟</td><td>标牌、通知、短信、广告、菜单、短文和选词填空</td></tr>
        <tr><td>合计</td><td>60</td><td>70 分钟</td><td>全部是选择题</td></tr></tbody></table></div>
      <ul class="kt-points">
        <li>在家用电脑考，全程摄像头监考。每次考试都要网上付费，没过线可以在 30 天内重考两次，三个工作日内出成绩。</li>
        <li><b>及格线：</b>多数报道是每部分至少答对 30%，也有报道写 70%，官方说明里没有给出数字。听力和阅读分别计分，<b>建议每部分练到 70% 以上再报名。</b></li>
        <li>完整的 KAZTEST 在考场考，除了听力和阅读，还有词汇语法、写作和口语；等级越高及格线越高（A1 约 30%，C1 约 80%）。</li>
      </ul>
      <p class="kt-warn">本站不是官方机构，模拟题是根据公开的考试形式自己编写的练习题，不是真题。报名、费用和最新要求以官方网站为准：<a href="https://app.testcenter.kz" rel="noopener" target="_blank">app.testcenter.kz</a>（报名考试）、<a href="https://migration.enbek.kz" rel="noopener" target="_blank">migration.enbek.kz</a>（居留申请）。各地的适应与融合中心也提供免费咨询和练习。信息核对日期：2026 年 10 月 22 日。</p>
    </div></details>
    <details class="kt-about"><summary>KAZTEST 模拟考试（A1 / B1 / B2）</summary><div class="kt-about-body">
      <p class="kt-note"><b>考试模式</b>和正式考试一样计时，听力每段最多听 2 次，交卷后出成绩和错题解析。<b>练习模式</b>不计时，每答一题马上显示对错和中文解析。B1、B2 卷用来提前了解要求提高后的难度。</p>
      <div class="kt-tests" id="ktTests"></div>
    </div></details></section>`;  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
  const shuffle = a => a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(p => p[1]);
  const count = (set, part) => set[part].reduce((n, g) => n + g.items.length, 0);
  const fmt = ms => { const s = Math.max(0, Math.ceil(ms / 1000)); return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); };
  const PARTS = [['listen', 'Тыңдалым', '听力'], ['read', 'Оқылым', '阅读']];
  const TARGET = 70, REPORTED = 30; // % per section: the safe aim, and the A1 online pass mark most reports give
  const BEST = 'kz-kaztest-best';
  const readBest = () => { try { return JSON.parse(localStorage.getItem(BEST)) || {}; } catch { return {}; } };
  const saveBest = (id, r) => { try { const b = readBest(), o = b[id]; if (!o || r.l + r.r >= o.l + o.r) { b[id] = r; localStorage.setItem(BEST, JSON.stringify(b)); } } catch {} };
  let leaveGuard = null;
  const guard = on => { if (leaveGuard) removeEventListener('beforeunload', leaveGuard); leaveGuard = on ? e => { e.preventDefault(); e.returnValue = ''; } : null; if (leaveGuard) addEventListener('beforeunload', leaveGuard); };

  function list() {
    guard(false); window.KZAudio?.stop?.();
    const best = readBest();
    root.innerHTML = `<div class="kt-sets">${SETS.map(s => {
      const b = best[s.id];
      return `<article class="kt-set"><div class="kt-set-top"><span class="kt-level">${s.level}</span>${s.id === 'a1' ? '<span class="kt-tag">居留要求等级</span>' : '<span class="kt-tag soft">如要求提高</span>'}</div><h3>${esc(s.title)}</h3><p>${esc(s.note)}</p>
        <ul class="kt-meta"><li><b>${count(s, 'listen')}</b> 道听力 · ${s.time.listen} 分钟</li><li><b>${count(s, 'read')}</b> 道阅读 · ${s.time.read} 分钟</li></ul>
        ${b ? `<p class="kt-best">本机最好成绩：听力 ${b.l}% · 阅读 ${b.r}%（${esc(b.date)}）</p>` : ''}
        <div class="kt-actions"><button type="button" class="primary-btn" data-start="${s.id}" data-mode="exam">考试模式（计时）</button><button type="button" class="secondary-btn" data-start="${s.id}" data-mode="practice">练习模式（即时解析）</button></div></article>`;
    }).join('')}</div>`;
    root.querySelectorAll('[data-start]').forEach(b => b.onclick = () => run(SETS.find(s => s.id === b.dataset.start), b.dataset.mode));
  }

  function run(set, mode) {
    const exam = mode === 'exam';
    const st = {part: 0, g: 0, hint: false, end: 0, timer: 0, answers: new Map(), plays: new Map()};
    const options = new Map();
    PARTS.forEach(([p]) => set[p].forEach((g, gi) => g.items.forEach((it, ii) => options.set(`${p}.${gi}.${ii}`, shuffle(it.o)))));
    guard(exam);
    const top = () => root.scrollIntoView({behavior: 'smooth', block: 'start'});

    function startPart() {
      st.g = 0;
      clearInterval(st.timer);
      if (exam) {
        st.end = Date.now() + set.time[PARTS[st.part][0]] * 60000;
        st.timer = setInterval(() => {
          const el = root.querySelector('.kt-timer'), left = st.end - Date.now();
          if (el) { el.textContent = fmt(left); el.classList.toggle('low', left < 120000); }
          if (left <= 0) { clearInterval(st.timer); endPart(true); }
        }, 1000);
      }
      draw();
    }
    function draw() {
      window.KZAudio?.stop?.();
      const [p, kk, cn] = PARTS[st.part], groups = set[p], g = groups[st.g];
      const before = groups.slice(0, st.g).reduce((n, x) => n + x.items.length, 0), total = count(set, p);
      const answered = [...st.answers.keys()].filter(k => k.startsWith(p + '.')).length;
      const keyOf = ii => `${p}.${st.g}.${ii}`;
      const groupDone = g.items.every((_, ii) => st.answers.has(keyOf(ii)));
      const stim = p === 'listen'
        ? `<div class="kt-audio"><button type="button" class="primary-btn" data-play>▶ 播放录音</button><span class="kt-plays">${exam ? `最多听 2 次（已听 ${st.plays.get(st.g) || 0} 次）` : '可以反复听'}</span></div>
           ${!exam && groupDone ? `<details class="kt-script"><summary>原文和翻译</summary>${g.lines.map(([s, t]) => `<p lang="kk"><b>${s === 'M' ? '男' : '女'}：</b>${esc(t)}</p>`).join('')}<p class="kt-cn">${esc(g.cn)}</p></details>` : ''}`
        : (g.text ? `<div class="kt-text"><span class="kt-text-title" lang="kk">${esc(g.title || '')}</span><div lang="kk">${esc(g.text).replace(/\n/g, '<br>')}</div></div>${!exam && groupDone && g.cn ? `<details class="kt-script"><summary>中文翻译</summary><p class="kt-cn">${esc(g.cn)}</p></details>` : ''}` : `<p class="kt-text-title" lang="kk">${esc(g.title || '')}</p>`);
      const items = g.items.map((it, ii) => {
        const k = keyOf(ii), ans = st.answers.get(k), show = !exam && ans !== undefined, ok = ans === it.o[0];
        return `<fieldset class="kt-q"><legend><span class="kt-num">${before + ii + 1}</span><span lang="kk">${esc(it.q)}</span>${st.hint ? `<small>${esc(it.qcn)}</small>` : ''}</legend>
          <div class="kt-opts">${options.get(k).map(o => `<button type="button" lang="kk" data-k="${k}" data-o="${esc(o)}" aria-pressed="${ans === o}" class="${show ? (o === it.o[0] ? 'right' : o === ans ? 'wrong' : '') : ''}"${show ? ' disabled' : ''}>${esc(o)}</button>`).join('')}</div>
          ${show ? `<p class="kt-why ${ok ? 'ok' : 'no'}">${ok ? '✓ 正确。' : `✗ 正确答案：<span lang="kk">${esc(it.o[0])}</span>。`}${esc(it.why)}</p>` : ''}</fieldset>`;
      }).join('');
      const last = st.g === groups.length - 1;
      root.innerHTML = `<div class="kt-run">
        <div class="kt-bar"><div class="kt-where"><span class="kt-level">${set.level}</span><b lang="kk">${kk}</b><span>${cn} · 第 ${st.g + 1} / ${groups.length} 组 · 已答 ${answered} / ${total}</span></div>
          ${exam ? `<span class="kt-timer" title="本部分剩余时间">${fmt(st.end - Date.now())}</span>` : '<span class="kt-mode">练习模式</span>'}</div>
        <div class="kt-progress" role="progressbar" aria-label="${cn}进度" aria-valuenow="${answered}" aria-valuemin="0" aria-valuemax="${total}"><i style="width:${Math.round(answered / total * 100)}%"></i></div>
        <label class="kt-hint"><input type="checkbox" data-hint ${st.hint ? 'checked' : ''}> 显示题目的中文提示${exam ? '（正式考试没有）' : ''}</label>
        ${stim}${items}<p class="kt-status" role="status"></p>
        <div class="kt-nav">${st.g ? '<button type="button" class="secondary-btn" data-prev>← 上一组</button>' : '<span></span>'}<button type="button" class="primary-btn" data-next>${last ? (st.part ? '交卷，看成绩' : '完成听力，进入阅读') : '下一组 →'}</button></div>
        <p class="kt-quit"><button type="button" class="kt-link" data-quit>退出本次模拟</button></p></div>`;
      const status = root.querySelector('.kt-status');
      root.querySelector('[data-hint]').onchange = e => { st.hint = e.target.checked; draw(); };
      root.querySelectorAll('[data-k]').forEach(b => b.onclick = () => { st.answers.set(b.dataset.k, b.dataset.o); const y = scrollY; draw(); scrollTo(0, y); });
      const play = root.querySelector('[data-play]');
      if (play) play.onclick = async () => {
        const n = st.plays.get(st.g) || 0;
        if (exam && n >= 2) { status.textContent = '这段录音已经听了 2 次。'; return; }
        st.plays.set(st.g, n + 1);
        const span = root.querySelector('.kt-plays'); if (span && exam) span.textContent = `最多听 2 次（已听 ${n + 1} 次）`;
        const ok = await window.KZAudio?.play('kaztest:' + g.audio, 'kk', 1);
        if (!ok) { status.textContent = '录音暂时无法播放，请检查网络后再试。'; st.plays.set(st.g, n); }
      };
      root.querySelector('[data-prev]')?.addEventListener('click', () => { st.g--; draw(); top(); });
      root.querySelector('[data-next]').onclick = () => {
        if (!last) { st.g++; draw(); top(); return; }
        const left = total - answered;
        if (left && !confirm(`本部分还有 ${left} 道题没有作答，确定要${st.part ? '交卷' : '结束听力'}吗？`)) return;
        endPart(false);
      };
      root.querySelector('[data-quit]').onclick = () => { if (confirm('退出后本次作答不会保存，确定退出吗？')) { clearInterval(st.timer); list(); top(); } };
    }
    function score(p) {
      let right = 0;
      set[p].forEach((g, gi) => g.items.forEach((it, ii) => { if (st.answers.get(`${p}.${gi}.${ii}`) === it.o[0]) right++; }));
      return {right, total: count(set, p), pct: Math.round(right / count(set, p) * 100)};
    }
    function endPart(timeUp) {
      clearInterval(st.timer); window.KZAudio?.stop?.();
      if (st.part === 0) {
        const s = score('listen');
        root.innerHTML = `<div class="kt-run kt-break"><span class="kt-level">${set.level}</span><h3>${timeUp ? '听力时间到' : '听力部分完成'}</h3><p>${exam ? `已作答 ${[...st.answers.keys()].filter(k => k.startsWith('listen.')).length} / ${s.total} 题，成绩在交卷后显示。` : `听力答对 ${s.right} / ${s.total}（${s.pct}%）。`}</p><p>接下来是<b lang="kk"> Оқылым </b>阅读部分：${count(set, 'read')} 道题${exam ? `，限时 ${set.time.read} 分钟` : ''}。</p><button type="button" class="primary-btn" data-go>开始阅读 →</button></div>`;
        root.querySelector('[data-go]').onclick = () => { st.part = 1; startPart(); top(); };
        top(); return;
      }
      results(timeUp);
    }
    function verdict(pct) {
      if (pct >= TARGET) return `<span class="kt-ok">✓ 达到建议目标（${TARGET}%）</span>`;
      if (set.id === 'a1' && pct >= REPORTED) return `<span class="kt-mid">达到多数报道中的及格线（${REPORTED}%），建议练到 ${TARGET}% 以上再报名</span>`;
      return `<span class="kt-no">还没达到${set.id === 'a1' ? `及格线 ${REPORTED}%` : `建议目标 ${TARGET}%`}，先按下面的备考路线学习</span>`;
    }
    function results(timeUp) {
      guard(false);
      const L = score('listen'), R = score('read');
      saveBest(set.id, {l: L.pct, r: R.pct, date: new Date().toLocaleDateString('zh-CN')});
      const wrong = [];
      PARTS.forEach(([p, kk, cn]) => set[p].forEach((g, gi) => g.items.forEach((it, ii) => {
        const a = st.answers.get(`${p}.${gi}.${ii}`); if (a !== it.o[0]) wrong.push({cn, it, a, g, p});
      })));
      root.innerHTML = `<div class="kt-run kt-result"><span class="kt-level">${set.level}</span><h3>${esc(set.title)} · 成绩${timeUp ? '（阅读时间到，自动交卷）' : ''}</h3>
        <div class="kt-scores">${[['听力', 'Тыңдалым', L], ['阅读', 'Оқылым', R]].map(([cn, kk, s]) => `<div class="kt-score"><span>${cn} <b lang="kk">${kk}</b></span><strong>${s.pct}%</strong><small>答对 ${s.right} / ${s.total}</small><p>${verdict(s.pct)}</p></div>`).join('')}</div>
        <p class="kt-note">正式考试按部分分别计分，每一部分都要过线。${set.id === 'a1' ? '居留用的线上 A1 考试，多数报道的及格线是每部分 30%，也有报道写 70%。官方没有给出明确数字，所以建议按 70% 准备。' : '正式 KAZTEST 的及格线随等级提高（A1 约 30%，C1 约 80%），B1、B2 建议练到 70% 以上。'}</p>
        ${wrong.length ? `<h4>错题解析（${wrong.length} 题）</h4><ol class="kt-review">${wrong.map(w => `<li><span class="kt-tag soft">${w.cn}</span> <span lang="kk">${esc(w.it.q)}</span><br><small>${esc(w.it.qcn)}</small><br>你的答案：<span lang="kk">${w.a ? esc(w.a) : '未作答'}</span>　正确答案：<b lang="kk">${esc(w.it.o[0])}</b><p>${esc(w.it.why)}</p>${w.p === 'listen' ? `<details><summary>听力原文</summary>${w.g.lines.map(([s, t]) => `<p lang="kk">${s === 'M' ? '男' : '女'}：${esc(t)}</p>`).join('')}<p class="kt-cn">${esc(w.g.cn)}</p></details>` : ''}</li>`).join('')}</ol>` : '<p class="kt-ok">全部答对！</p>'}
        <div class="kt-nav"><button type="button" class="secondary-btn" data-back>返回模拟卷列表</button><button type="button" class="primary-btn" data-again>再做一次</button></div></div>`;
      root.querySelector('[data-back]').onclick = () => { list(); top(); };
      root.querySelector('[data-again]').onclick = () => { run(set, mode); top(); };
      top();
    }
    startPart(); top();
  }
  window.KZKaztest = {intro, mount(el) { root = el; if (root && SETS.length) list(); }};
})();
