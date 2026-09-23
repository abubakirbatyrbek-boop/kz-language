
/*
 V21 — 零基础造句与口语：大模块闯关
 说明：
 - 使用现有 speaking.js 中的 SPEAKING_COURSES 数据，原有所有课程内容保留。
 - 页面按 4 个大模块显示：
   01 口语起步
   02 基础表达
   03 高频交流
   04 实用场景
 - 每个大模块完成全部小课后必须参加模块考试。
 - 考试 >= 70% 才能通过并解锁下一个大模块。
 - 第 2 大模块开始必须注册/登录。
 - 进度和考试结果继续保存到现有 Supabase / localStorage。
*/
(function () {
  'use strict';

  const GROUPS = [
    { no:'01', title:'口语起步', desc:'从我、你、他开始，把最基本的口语一步一步说出来。', from:0, to:0 },
    { no:'02', title:'基础表达', desc:'地点、有没有、动作：开始把简单句真正说完整。', from:1, to:3 },
    { no:'03', title:'高频交流', desc:'时间、需要、提问、补救：解决日常交流中的常见问题。', from:4, to:7 },
    { no:'04', title:'实用场景', desc:'商店、餐厅、出行与工作，把学过的句子带到真实场景。', from:8, to:9 }
  ];

  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];

  function esc(v) {
    return String(v ?? '').replace(/[&<>"']/g, s => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    }[s]));
  }

  function langNow() {
    const l = new URLSearchParams(location.search).get('lang');
    return l === 'ru' || l === 'kk' ? l : null;
  }

  function course() {
    const c = langNow();
    return c ? window.SPEAKING_COURSES?.[c] : null;
  }

  function storageKey(lang, userId) {
    return `v21_speaking_${lang}_${userId || 'guest'}`;
  }

  function readState(lang) {
    try {
      return JSON.parse(localStorage.getItem(storageKey(lang, window.__speakingUser?.id)) || '{}');
    } catch {
      return {};
    }
  }

  function writeState(lang, state) {
    localStorage.setItem(storageKey(lang, window.__speakingUser?.id), JSON.stringify(state));
  }

  function oldState(lang) {
    try {
      return JSON.parse(localStorage.getItem(`v13_speaking_${lang}_${window.__speakingUser?.id || 'guest'}`) || '{}');
    } catch {
      return {};
    }
  }

  function lessonDone(lang, id) {
    const s = readState(lang);
    const old = oldState(lang);
    const key = `v13:speaking:${lang}:${id}`;
    return s[key]?.status === 'done' || old[key]?.status === 'done';
  }

  function testKey(lang, groupNo) {
    return `v21:speaking-group-test:${lang}:${groupNo}`;
  }

  function testInfo(lang, groupNo) {
    return readState(lang)[testKey(lang, groupNo)] || null;
  }

  function isPassed(lang, groupNo) {
    return testInfo(lang, groupNo)?.status === 'passed';
  }

  function testScore(lang, groupNo) {
    return Number(testInfo(lang, groupNo)?.score || 0);
  }

  function groupLessons(c, gi) {
    const g = GROUPS[gi];
    return c.modules.slice(g.from, g.to + 1).flatMap(m =>
      m[2].map((x, i) => ({
        group: g.no,
        groupTitle: g.title,
        originalModule: m[0],
        originalModuleTitle: m[1],
        index: i,
        title: x[0],
        zh: x[1],
        target: x[2],
        note: x[3],
        id: `${m[0]}-${i+1}`
      }))
    );
  }

  function groupCompleted(c, gi, lang) {
    const ls = groupLessons(c, gi);
    return ls.length > 0 && ls.every(l => lessonDone(lang, l.id));
  }

  function groupUnlocked(c, gi, lang) {
    if (gi === 0) return true;
    if (!window.__speakingUser) return false;
    return isPassed(lang, GROUPS[gi - 1].no);
  }

  async function ensureUser() {
    if (window.__speakingUser) return window.__speakingUser;
    try {
      const client = window.__speakingSupabase || window.KZAuth?.getClient?.();
      if (!client) return null;
      window.__speakingSupabase = client;
      const { data } = await client.auth.getSession();
      if (data?.session?.user) {
        window.__speakingUser = data.session.user;
        return window.__speakingUser;
      }
    } catch (e) {
      console.warn('V21 auth init failed', e);
    }
    return null;
  }

  function migrateGuest(lang) {
    if (!window.__speakingUser) return;
    const guest = (() => {
      try { return JSON.parse(localStorage.getItem(storageKey(lang, null)) || '{}'); } catch { return {}; }
    })();
    const acctKey = storageKey(lang, window.__speakingUser.id);
    const acct = (() => {
      try { return JSON.parse(localStorage.getItem(acctKey) || '{}'); } catch { return {}; }
    })();
    let changed = false;
    for (const [k, v] of Object.entries(guest)) {
      if (!acct[k]) { acct[k] = v; changed = true; }
    }
    if (changed) localStorage.setItem(acctKey, JSON.stringify(acct));
  }

  async function saveLesson(lang, id) {
    if (window.saveSpeakingLesson) {
      await window.saveSpeakingLesson(lang, id);
      return;
    }
    const s = readState(lang);
    s[`v13:speaking:${lang}:${id}`] = {
      status:'done', score:100, updated_at:new Date().toISOString()
    };
    writeState(lang, s);
  }

  async function saveTest(lang, no, pct, passed) {
    const s = readState(lang);
    s[testKey(lang, no)] = {
      status: passed ? 'passed' : 'failed',
      score: pct,
      updated_at: new Date().toISOString()
    };
    writeState(lang, s);

    const client = window.__speakingSupabase || window.KZAuth?.getClient?.();
    const user = window.__speakingUser;
    if (client && user) {
      try {
        await client.from('test_results').insert({
          user_id: user.id,
          node_id: testKey(lang, no),
          language: lang,
          score: pct,
          passed,
          answers: []
        });
      } catch (e) {
        console.warn('V21 test save failed', e);
      }
    }
  }

  function speak(text, lang) {
    if (window.speakTarget) {
      window.speakTarget(text, lang);
      return;
    }
    if (!('speechSynthesis' in window)) {
      alert('当前浏览器不支持语音朗读');
      return;
    }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = 0.84;
    speechSynthesis.speak(u);
  }

  function renderTop(c, lang, all) {
    const done = all.filter(l => lessonDone(lang, l.id)).length;
    const pct = Math.round(done / all.length * 100);
    const chooser = $('#courseChooser');
    chooser.innerHTML = `
      <div class="v21-hero">
        <div class="v21-card">
          <div class="v21-eyebrow">${c.flag} ${esc(c.label)} · 零基础造句与口语</div>
          <h1>${esc(c.title)}</h1>
          <p>${esc(c.desc)}</p>
          <div class="v21-pills">
            <span>词</span><span>短语</span><span>完整句</span><span>换词</span>
            <span>提问 / 否定</span><span>自己说</span>
          </div>
          <div class="v21-total">
            <strong>总进度：${done} / ${all.length}</strong>
            <strong>${pct}%</strong>
          </div>
          <div class="v21-bar"><i style="width:${pct}%"></i></div>
        </div>
        <div class="v21-card v21-rule-card">
          <div class="v21-eyebrow">闯关规则</div>
          <h2>完成一个模块，再考试过关。</h2>
          <p>每个模块必须完成全部小课，再参加模块考试。答对 <strong>70% 以上</strong>才能通过。</p>
          <p>${window.__speakingUser ? '已登录：学习进度和考试结果会绑定到账号。' : '第 1 模块可直接体验；第 2 模块开始需要注册 / 登录。'}</p>
        </div>
      </div>`;
  }

  function renderGroups(c, lang) {
    const all = GROUPS.flatMap((_, gi) => groupLessons(c, gi));
    const host = $('#courseContent');
    host.innerHTML = `<div id="v21Groups"></div><div id="v21Active"></div>`;
    const root = $('#v21Groups');

    GROUPS.forEach((g, gi) => {
      const ls = groupLessons(c, gi);
      const d = ls.filter(l => lessonDone(lang, l.id)).length;
      const pct = Math.round(d / ls.length * 100);
      const unlocked = groupUnlocked(c, gi, lang);
      const complete = d === ls.length;
      const passed = isPassed(lang, g.no);
      const score = testScore(lang, g.no);

      const section = document.createElement('section');
      section.className = `v21-group ${unlocked ? '' : 'locked'} ${passed ? 'passed' : ''}`;
      section.innerHTML = `
        <div class="v21-group-head">
          <div>
            <div class="v21-eyebrow">模块 ${g.no}</div>
            <h2>${esc(g.title)}</h2>
            <p>${esc(g.desc)}</p>
          </div>
          <div class="v21-status ${
            passed ? '' : (!unlocked && gi >= 1 && !window.__speakingUser ? 'login' : (!unlocked ? 'lock' : ''))
          }">
            ${passed ? `✓ 已通过 ${score}%`
              : (!unlocked && gi >= 1 && !window.__speakingUser ? '🔐 注册 / 登录后解锁'
              : (!unlocked ? '🔒 等待上一模块 70% 考试'
              : (complete ? '✓ 小课已完成 · 可以考试' : '学习中')))}
          </div>
        </div>

        <div class="v21-group-stats">
          <span>${d} / ${ls.length} 小课完成</span><span>${pct}%</span>
        </div>
        <div class="v21-bar"><i style="width:${pct}%"></i></div>

        <div class="v21-lessons">
          ${ls.map((l, li) => {
            const done = lessonDone(lang, l.id);
            const available = unlocked && (li === 0 || ls.slice(0, li).every(x => lessonDone(lang, x.id)));
            return `
              <button type="button"
                class="v21-lesson ${done ? 'done' : ''} ${(!available && !done) ? 'locked' : ''}"
                data-gi="${gi}" data-li="${li}">
                <span class="v21-no">${done ? '✓' : String(li + 1).padStart(2,'0')}</span>
                <span class="v21-lesson-main">
                  <strong>${esc(l.title)}</strong>
                  <small>${esc(l.target)}</small>
                </span>
                <span class="v21-arrow">${done ? '已完成' : (available ? '开始 →' : '🔒')}</span>
              </button>`;
          }).join('')}
        </div>

        <div class="v21-actions"></div>
        <div class="v21-rule">
          ${passed
            ? `模块考试：${score}% · 已通过。可以回顾本模块。`
            : (gi >= 1 && !window.__speakingUser && !unlocked)
              ? `第 2 模块开始需要注册 / 登录。登录后会保存学习进度和考试成绩。`
              : complete && unlocked
                ? `本模块全部学完。现在参加模块考试；答对 ≥70% 才能进入下一个模块。`
                : gi > 0 && !unlocked
                  ? `先通过上一模块考试（≥70%）。`
                  : `按顺序完成本模块的小课，上一课完成后开放下一课。`
          }
        </div>`;

      const actions = $('.v21-actions', section);
      if (!unlocked) {
        if (gi >= 1 && !window.__speakingUser) {
          actions.innerHTML = `<button class="v21-primary" type="button">🔐 注册 / 登录后继续</button>`;
          $('.v21-primary', actions).onclick = goLogin;
        } else {
          actions.innerHTML = `<button class="v21-secondary" type="button" disabled>🔒 等待上一模块通过</button>`;
        }
      } else if (complete && !passed) {
        actions.innerHTML = `<button class="v21-primary" type="button">参加模块考试 →</button>`;
        $('.v21-primary', actions).onclick = () => runTest(c, lang, gi);
      } else if (passed) {
        actions.innerHTML = `<button class="v21-secondary" type="button">复习本模块 →</button>`;
        $('.v21-secondary', actions).onclick = () => openGroup(c, lang, gi);
      }

      $$('.v21-lesson', section).forEach(btn => {
        btn.onclick = () => {
          const li = Number(btn.dataset.li);
          const available = unlocked && (li === 0 || ls.slice(0, li).every(x => lessonDone(lang, x.id)));
          if (!available) {
            if (gi >= 1 && !window.__speakingUser) goLogin();
            return;
          }
          openLesson(c, lang, gi, li);
        };
      });

      root.appendChild(section);
    });

    const first = GROUPS.findIndex((g, gi) => !groupCompleted(c, gi, lang) || !isPassed(lang, g.no));
    const startGi = first >= 0 ? first : 0;
    if (startGi >= 1 && !window.__speakingUser) {
      showGate();
    } else {
      openGroup(c, lang, startGi);
    }
  }

  function openGroup(c, lang, gi) {
    const active = $('#v21Active');
    if (!active) return;

    if (gi >= 1 && !window.__speakingUser) {
      showGate();
      return;
    }

    const g = GROUPS[gi], ls = groupLessons(c, gi);
    const next = ls.findIndex(l => !lessonDone(lang, l.id));

    active.innerHTML = `
      <div class="v21-card">
        <div class="v21-group-head">
          <div>
            <div class="v21-eyebrow">当前模块</div>
            <h2>${g.no} · ${esc(g.title)}</h2>
          </div>
          <div class="v21-status">${next < 0 ? '可以参加考试' : '按顺序学习'}</div>
        </div>
        <p class="v21-subtle">${ls.filter(l => lessonDone(lang, l.id)).length} / ${ls.length} 小课完成。每一课完成后才能进入下一课。</p>
      </div>
      <div id="v21LessonArea"></div>`;

    if (next >= 0) openLesson(c, lang, gi, next);
    else if (!isPassed(lang, g.no)) {
      showModuleTestBox(c, lang, gi);
    }
  }

  function openLesson(c, lang, gi, li) {
    const g = GROUPS[gi], ls = groupLessons(c, gi), l = ls[li], area = $('#v21LessonArea') || $('#v21Active');
    if (!area) return;

    if (gi >= 1 && !window.__speakingUser) {
      showGate();
      return;
    }

    area.innerHTML = `
      <div class="v21-lesson-card">
        <div class="v21-lesson-head">
          <div>
            <div class="v21-eyebrow">模块 ${g.no} · ${esc(g.title)}</div>
            <h2>${esc(l.title)}</h2>
          </div>
          <span>第 ${li + 1} / ${ls.length} 课</span>
        </div>
        <div class="v21-bar"><i style="width:${Math.round((li+1)/ls.length*100)}%"></i></div>

        <div class="v21-badge">${li === 0 ? '先认识' : '往上加一层'}</div>
        <div class="v21-cn">${esc(l.zh)}</div>
        <div class="v21-target" lang="${lang === 'kk' ? 'kk' : 'ru'}">${esc(l.target)}</div>

        <div class="v21-actions">
          <button type="button" class="v21-primary" id="v21Play">🔊 听${esc(c.label)}</button>
          <button type="button" class="v21-secondary" id="v21Done">${lessonDone(lang,l.id) ? '已完成' : '记住了，下一课 →'}</button>
        </div>

        <p class="v21-note">${esc(l.note || '先听发音，再跟读，然后自己说一遍。')}</p>

        <div class="v21-self">
          <div>
            <div class="v21-eyebrow">自己说</div>
            <strong>${esc(l.title)}</strong>
          </div>
          <button type="button" class="v21-secondary" id="v21Answer">看参考答案</button>
        </div>
        <div id="v21AnswerBox" class="v21-answer" style="display:none">
          <strong lang="${lang === 'kk' ? 'kk' : 'ru'}">${esc(l.target)}</strong>
          <button type="button" class="v21-secondary" id="v21Play2">🔊</button>
        </div>
      </div>`;

    $('#v21Play').onclick = () => speak(l.target, c.language);
    $('#v21Answer').onclick = () => { $('#v21AnswerBox').style.display = 'block'; };
    $('#v21Play2').onclick = () => speak(l.target, c.language);

    $('#v21Done').onclick = async () => {
      if (!lessonDone(lang, l.id)) await saveLesson(lang, l.id);

      // Refresh all visible progress immediately.
      renderTop(c, lang, GROUPS.flatMap((_, i) => groupLessons(c, i)));
      renderGroups(c, lang);

      const nowGroupComplete = groupCompleted(c, gi, lang);
      if (nowGroupComplete && !isPassed(lang, g.no)) {
        showModuleTestBox(c, lang, gi);
      }
    };

    area.scrollIntoView({behavior:'smooth', block:'start'});
  }

  function showModuleTestBox(c, lang, gi) {
    const active = $('#v21Active');
    if (!active) return;
    const g = GROUPS[gi], ls = groupLessons(c, gi);
    const wrap = document.createElement('div');
    wrap.className = 'v21-card';
    wrap.innerHTML = `
      <div class="v21-eyebrow">模块考试</div>
      <h2>第 ${g.no} 模块：${esc(g.title)}</h2>
      <p class="v21-subtle">你已经完成本模块全部 ${ls.length} 个小课。答对 <strong>70% 以上</strong>才可以进入下一模块。</p>
      <button type="button" class="v21-primary" id="v21StartTest">参加模块考试 →</button>`;
    active.appendChild(wrap);
    $('#v21StartTest', wrap).onclick = () => runTest(c, lang, gi);
    wrap.scrollIntoView({behavior:'smooth', block:'start'});
  }

  function buildQuestions(c, gi) {
    const ls = groupLessons(c, gi);
    const pool = ls.length > 10 ? ls.slice(0, 10) : ls;
    return pool.map((l, i) => {
      const otherTargets = pool.filter(x => x.id !== l.id).slice(0, 3).map(x => x.target);
      const otherCN = pool.filter(x => x.id !== l.id).slice(0, 3).map(x => x.zh);
      if (i % 2 === 0) {
        return {
          kind:'target',
          prompt:'请选择正确的目标语言表达',
          question:l.zh,
          answer:l.target,
          options:shuffle([l.target, ...otherTargets]),
          speak:l.target
        };
      }
      return {
        kind:'meaning',
        prompt:'这句话是什么意思？',
        question:l.target,
        answer:l.zh,
        options:shuffle([l.zh, ...otherCN]),
        speak:l.target
      };
    });
  }

  function shuffle(arr) {
    return arr.map(x => [Math.random(), x]).sort((a,b) => a[0]-b[0]).map(x => x[1]);
  }

  function runTest(c, lang, gi) {
    if (gi >= 1 && !window.__speakingUser) {
      showGate('模块考试也需要先注册 / 登录。');
      return;
    }

    if (!groupCompleted(c, gi, lang)) {
      showModuleTestBox(c, lang, gi);
      return;
    }

    const qs = buildQuestions(c, gi);
    const active = $('#v21Active');
    if (!active) return;

    const state = { i:0, correct:0 };

    function draw() {
      const q = qs[state.i];
      active.innerHTML = `
        <div class="v21-test">
          <div class="v21-lesson-head">
            <div>
              <div class="v21-eyebrow">第 ${GROUPS[gi].no} 模块考试</div>
              <h2>答对 70% 才能进入下一个模块</h2>
            </div>
            <span>${state.i+1} / ${qs.length}</span>
          </div>
          <div class="v21-bar"><i style="width:${Math.round((state.i+1)/qs.length*100)}%"></i></div>
          <div class="v21-question">
            <div class="v21-eyebrow">${q.prompt}</div>
            <h3 lang="${q.kind === 'meaning' ? (lang === 'kk' ? 'kk' : 'ru') : ''}">${esc(q.question)}</h3>
            <button type="button" class="v21-secondary" id="v21TestAudio">🔊 听${esc(c.label)}</button>
          </div>
          <div class="v21-options">
            ${q.options.map((o,i)=>`
              <button type="button" class="v21-option" data-i="${i}">${String.fromCharCode(65+i)}. ${esc(o)}</button>
            `).join('')}
          </div>
          <div id="v21Feedback" class="v21-feedback"></div>
          <button type="button" class="v21-secondary" id="v21Next" disabled>下一题 →</button>
          <p class="v21-subtle">达到 70% 即通过。未通过可以重新学习后再次测试。</p>
        </div>`;

      $('#v21TestAudio').onclick = () => speak(q.speak, c.language);

      let answered = false;
      $$('.v21-option', active).forEach(btn => {
        btn.onclick = () => {
          if (answered) return;
          answered = true;
          const val = q.options[Number(btn.dataset.i)];
          const ok = val === q.answer;
          $$('.v21-option', active).forEach(b => {
            b.disabled = true;
            if (q.options[Number(b.dataset.i)] === q.answer) b.classList.add('correct');
          });
          if (ok) {
            state.correct += 1;
            btn.classList.add('correct');
            $('#v21Feedback').textContent = '回答正确！';
          } else {
            btn.classList.add('wrong');
            $('#v21Feedback').textContent = `回答错误，正确答案：${q.answer}`;
          }
          $('#v21Next').disabled = false;
        };
      });

      $('#v21Next').onclick = async () => {
        if (!answered) return;
        if (state.i < qs.length - 1) {
          state.i += 1;
          draw();
          return;
        }
        const pct = Math.round(state.correct / qs.length * 100);
        const ok = pct >= 70;
        await saveTest(lang, GROUPS[gi].no, pct, ok);
        if (ok) {
          renderTop(c, lang, GROUPS.flatMap((_, i) => groupLessons(c, i)));
          renderGroups(c, lang);
          const activeNow = $('#v21Active');
          if (gi < GROUPS.length - 1) {
            if (!window.__speakingUser) {
              showGate('恭喜通过第 1 模块。进入第 2 模块前，请先注册 / 登录。');
            } else {
              activeNow.innerHTML = `
                <div class="v21-card v21-result">
                  <div class="v21-eyebrow">模块通过</div>
                  <div class="v21-score">${pct}%</div>
                  <p>第 ${GROUPS[gi+1].no} 模块已经解锁。</p>
                  <button type="button" class="v21-primary" id="v21NextGroup">进入下一模块 →</button>
                </div>`;
              $('#v21NextGroup').onclick = () => openGroup(c, lang, gi+1);
            }
          } else {
            activeNow.innerHTML = `
              <div class="v21-card v21-result">
                <div class="v21-eyebrow">课程完成</div>
                <div class="v21-score">${pct}%</div>
                <p>恭喜，你已经完成全部 4 个大模块。</p>
              </div>`;
          }
        } else {
          active.innerHTML = `
            <div class="v21-card v21-result">
              <div class="v21-eyebrow">需要再练一次</div>
              <div class="v21-score">${pct}%</div>
              <p>本次没有达到 70%。回去复习本模块后再重新测试。</p>
              <button type="button" class="v21-primary" id="v21Retry">重新测试 →</button>
            </div>`;
          $('#v21Retry').onclick = () => runTest(c, lang, gi);
        }
      };
    }

    draw();
    active.scrollIntoView({behavior:'smooth', block:'start'});
  }

  function goLogin() {
    const next = location.pathname.split('/').pop() + location.search;
    location.href = `auth.html?mode=login&next=${encodeURIComponent(next)}`;
  }

  function showGate(extra) {
    const active = $('#v21Active');
    if (!active) return;
    active.innerHTML = `
      <div class="v21-gate">
        <div class="v21-eyebrow">🔐 第 2 模块起需要账号</div>
        <h2>注册 / 登录后继续</h2>
        <p>第 1 模块可以直接体验。完成第 1 模块并通过 70% 模块考试后，进入第 2 模块前需要注册 / 登录。登录后，你的学习进度与考试成绩会保存。</p>
        ${extra ? `<p class="v21-subtle">${esc(extra)}</p>` : ''}
        <button type="button" class="v21-primary" id="v21GateLogin">注册 / 登录 →</button>
      </div>`;
    $('#v21GateLogin').onclick = goLogin;
    active.scrollIntoView({behavior:'smooth', block:'start'});
  }

  function installStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .v21-hero{display:grid;grid-template-columns:1.35fr .85fr;gap:18px}
      .v21-card,.v21-group,.v21-test,.v21-lesson-card{border:1px solid #dfe7e3;border-radius:22px;background:#fff;padding:22px;box-shadow:0 10px 30px rgba(20,55,43,.05);margin-bottom:16px}
      .v21-eyebrow{color:#9b6a00;font-size:12px;font-weight:800;letter-spacing:.06em}
      .v21-card h1{font-size:34px;margin:8px 0 10px}.v21-card h2{margin:6px 0 8px}.v21-card p,.v21-group p{color:#66736c;line-height:1.7}
      .v21-pills{display:flex;flex-wrap:wrap;gap:7px;margin:14px 0}.v21-pills span{border:1px solid #dfe7e3;background:#fafcfb;padding:6px 10px;border-radius:999px;font-size:12px;color:#385449}
      .v21-total,.v21-group-stats{display:flex;justify-content:space-between;gap:10px;font-size:12px;color:#687971}
      .v21-bar{height:8px;background:#edf2ef;border-radius:999px;overflow:hidden;margin:9px 0 16px}.v21-bar i{display:block;height:100%;background:#0e4a37;border-radius:inherit}
      .v21-group-head{display:flex;justify-content:space-between;gap:16px;align-items:flex-start}.v21-group-head h2{font-size:23px}
      .v21-status{padding:6px 10px;border-radius:999px;background:#eef6f1;color:#18543c;font-size:12px;font-weight:800;white-space:nowrap}
      .v21-status.lock{background:#f1f2f1;color:#7d8781}.v21-status.login{background:#fff7e9;color:#8b651f}
      .v21-group.locked{opacity:.67}.v21-group.passed{border-color:#b9d9ce}
      .v21-lessons{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:12px 0}
      .v21-lesson{display:grid;grid-template-columns:34px 1fr auto;gap:10px;align-items:center;width:100%;text-align:left;border:1px solid #dfe7e3;border-radius:14px;background:#fff;padding:11px 12px;cursor:pointer}
      .v21-lesson:hover{border-color:#a6c7ba}.v21-lesson.locked{opacity:.48;cursor:not-allowed}.v21-lesson.done{background:#f8fcfa;border-color:#c3dccf}
      .v21-no{width:28px;height:28px;display:grid;place-items:center;border-radius:50%;background:#eff5f1;color:#18543c;font-size:11px;font-weight:800}
      .v21-lesson-main strong{display:block;font-size:14px}.v21-lesson-main small{display:block;color:#7b8982;font-size:11px;margin-top:3px}
      .v21-arrow{font-size:11px;color:#51675d}.v21-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:13px}
      .v21-primary,.v21-secondary{border-radius:13px;padding:10px 14px;font-weight:800;font-size:13px;cursor:pointer}
      .v21-primary{border:0;background:#0e4a37;color:#fff}.v21-secondary{border:1px solid #d6e2dd;background:#fff;color:#174b3a}.v21-secondary:disabled{opacity:.5;cursor:not-allowed}
      .v21-rule{margin-top:12px;padding:12px 14px;border-radius:14px;background:#f5f8f6;color:#51675e;font-size:12px;line-height:1.65}
      .v21-subtle{color:#687971;font-size:13px;line-height:1.7}.v21-lesson-head{display:flex;justify-content:space-between;gap:16px;align-items:flex-start}
      .v21-badge{display:inline-block;margin:8px 0;padding:6px 9px;border-radius:999px;background:#fbf5e8;color:#9b6a00;font-size:12px}
      .v21-cn{font-size:18px;color:#516b61;margin:18px 0 7px}.v21-target{font-size:40px;line-height:1.3;font-weight:900;margin-bottom:12px}
      .v21-note{color:#5e7169;line-height:1.75}.v21-self{border-top:1px solid #e7ece9;padding-top:16px;margin-top:18px;display:flex;justify-content:space-between;align-items:center;gap:12px}
      .v21-answer{margin-top:10px;padding:12px 14px;border-radius:13px;background:#f5f8f6}
      .v21-test{max-width:900px;margin:16px auto}.v21-question{padding:4px 0 16px;border-bottom:1px solid #e7ece9}.v21-question h3{font-size:30px;margin:8px 0 10px}
      .v21-options{display:grid;gap:9px;margin:16px 0}.v21-option{border:1px solid #dfe7e3;border-radius:14px;padding:14px 16px;background:#fff;text-align:left;font-size:15px;color:#173b30;cursor:pointer}
      .v21-option.correct{border-color:#6eb59a;background:#edf8f3}.v21-option.wrong{border-color:#d89c9c;background:#fff2f2}.v21-feedback{min-height:24px;color:#4a675b;font-weight:800;margin:10px 0}
      .v21-result{text-align:center;padding:36px 20px}.v21-score{font-size:58px;font-weight:900;color:#123f2d;margin:8px 0}
      .v21-gate{text-align:center;max-width:760px;margin:18px auto;padding:34px 24px;border:1px solid #d8e1db;border-radius:22px;background:#fff;box-shadow:0 14px 40px rgba(14,41,31,.06)}
      .v21-gate h2{font-size:28px;margin:8px 0 12px}.v21-gate p{color:#66736c;line-height:1.75}
      @media(max-width:820px){.v21-hero{grid-template-columns:1fr}.v21-lessons{grid-template-columns:1fr}.v21-group-head,.v21-lesson-head{flex-direction:column}.v21-status{white-space:normal}.v21-target{font-size:31px}}
    `;
    document.head.appendChild(style);
  }

  async function boot() {
    const lang = langNow();
    const c = course();
    if (!lang || !c) return;

    await ensureUser();
    migrateGuest(lang);
    installStyles();

    const all = GROUPS.flatMap((_, i) => groupLessons(c, i));
    renderTop(c, lang, all);
    renderGroups(c, lang);
  }

  // Wait until speaking.js has created SPEAKING_COURSES and initialized auth.
  function start() {
    let tries = 0;
    const timer = setInterval(async () => {
      tries++;
      if (window.SPEAKING_COURSES && $('#courseChooser') && $('#courseContent')) {
        clearInterval(timer);
        // Run after the existing speaking.js DOMContentLoaded render, then take control.
        setTimeout(() => boot().catch(console.error), 80);
      }
      if (tries > 80) clearInterval(timer);
    }, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, {once:true});
  } else {
    start();
  }
})();
