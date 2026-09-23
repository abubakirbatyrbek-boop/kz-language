
/* KZ Language FINAL grammar flow.
   Uses the existing app.js lesson data. Do not replace app.js or Supabase config.
*/
(function(){
  'use strict';

  const PASS = 70;
  const MODULES = [
    {no:1, title:'人称与基本句子', groups:['人称代词','名词谓语','指示句']},
    {no:2, title:'否定与疑问', groups:['否定','疑问句']},
    {no:3, title:'所属与有 / 没有', groups:['所属关系','所有关系','存在句']},
    {no:4, title:'地点、方向与来源', groups:['地点','地点与前置词','地点与方向','方向','来源']},
    {no:5, title:'动作与现在时', groups:['现在时','动词现在时','动词否定','动词疑问']},
    {no:6, title:'时间、问词与需要', groups:['时间','问词','情态']},
    {no:7, title:'过去、将来与连接', groups:['过去时','将来时','未来与计划','连接句']},
    {no:8, title:'组句与独立造句', groups:['组句','造句','场景造句']}
  ];

  let user = null;
  let client = null;
  let authReady = null;

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));

  const codeOf = c => c.targetLang === 'kk' ? 'kk-KZ' : 'ru-RU';
  const target = (c,l) => c.targetLang === 'kk' ? l.kz : l.ru;
  const storageKey = c => `grammar-v22:${c.id}:${user?.id || 'guest'}`;

  function read(c){
    try { return JSON.parse(localStorage.getItem(storageKey(c)) || '{}'); }
    catch { return {}; }
  }
  function write(c,s){ localStorage.setItem(storageKey(c), JSON.stringify(s)); }

  function allModules(c){
    const pool = courseLessons(c.id);
    return MODULES.map(m => ({
      ...m,
      lessons: pool.filter(l => m.groups.includes(l.group))
    })).filter(m => m.lessons.length);
  }
  function done(c,id){ return !!read(c).lessons?.[id]; }
  function test(c,no){ return read(c).tests?.['m'+no] || null; }
  function passed(c,no){
    const t = test(c,no);
    return !!(t && t.passed && Number(t.score) >= PASS);
  }
  function complete(c,m){
    return m.lessons.length > 0 && m.lessons.every(l => done(c,l.id));
  }
  function open(c,mi){
    const ms = allModules(c);
    return mi >= 0 && mi < ms.length && (mi === 0 || !!user) &&
      ms.slice(0,mi).every(m => complete(c,m) && passed(c,m.no));
  }

  async function initUser(){
    if(!authReady){
      authReady = (async () => {
        // app.js registers its DOMContentLoaded handler before auth.js.
        // Wait until ALL handlers have run before reading the shared client.
        await new Promise(resolve => {
          const afterBoot = () => setTimeout(resolve,0);
          if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',afterBoot,{once:true});
          else afterBoot();
        });
        client = window.KZAuth?.getClient?.() || null;
        if(!client) throw new Error('登录服务尚未就绪，请刷新重试。');
        let observedId;
        client.auth.onAuthStateChange((event,session) => {
          const nextId = session?.user?.id || null;
          const changed = observedId !== undefined && observedId !== nextId;
          observedId = nextId;
          user = session?.user || null;
          // Same-user sign-in/token refresh events must not interrupt an exam.
          if(changed) setTimeout(() => location.reload(),0);
        });
        const {data,error} = await client.auth.getSession();
        if(error && !data?.session) throw error;
        if(observedId === undefined){
          user = data?.session?.user || null;
          observedId = user?.id || null;
        }
      })();
    }
    await authReady;
    if(user) await syncRemote();
  }

  async function syncRemote(){
    if(!client || !user) return;
    try{
      const {data:lp} = await client.from('learning_progress')
        .select('node_id,status')
        .eq('user_id',user.id)
        .like('node_id','grammar:%')
        .limit(2000);

      for(const row of (lp || [])){
        const parts = String(row.node_id).split(':');
        if(parts.length < 3 || parts[0] !== 'grammar' || row.status !== 'done') continue;
        const cid = parts[1], lid = parts[2];
        const c = courseById(cid);
        if(!c) continue;
        const s = read(c); s.lessons = s.lessons || {};
        s.lessons[lid] = {done:true};
        write(c,s);
      }

      const {data:tr} = await client.from('test_results')
        .select('node_id,score,passed,created_at')
        .eq('user_id',user.id)
        .like('node_id','grammar-test:%')
        .order('created_at',{ascending:false})
        .limit(1000);

      for(const row of (tr || [])){
        const m = String(row.node_id).match(/^grammar-test:(.+):m(\d+)$/);
        if(!m) continue;
        const c = courseById(m[1]);
        if(!c) continue;
        const s = read(c); s.tests = s.tests || {};
        const k = 'm' + m[2];
        if(!s.tests[k] || Number(row.score) > Number(s.tests[k].score)){
          s.tests[k] = {score:Number(row.score),passed:!!row.passed};
          write(c,s);
        }
      }
    }catch(e){ console.warn('grammar remote sync failed',e); }
  }

  function migrateGuest(c){
    if(!user) return;
    try{
      const guestKey = `grammar-v22:${c.id}:guest`;
      const accountKey = storageKey(c);
      const guest = JSON.parse(localStorage.getItem(guestKey) || '{}');
      const account = JSON.parse(localStorage.getItem(accountKey) || '{}');
      let changed = false;

      account.lessons = account.lessons || {};
      account.tests = account.tests || {};
      for(const [k,v] of Object.entries(guest.lessons || {})){
        if(!account.lessons[k]){ account.lessons[k] = v; changed = true; }
      }
      for(const [k,v] of Object.entries(guest.tests || {})){
        if(!account.tests[k]){ account.tests[k] = v; changed = true; }
      }
      if(changed) localStorage.setItem(accountKey, JSON.stringify(account));
    }catch{}
  }

  async function mark(c,l){
    const s = read(c);
    s.lessons = s.lessons || {};
    s.lessons[l.id] = {done:true,at:new Date().toISOString()};
    write(c,s);

    if(user && client){
      try{
        await client.from('learning_progress').upsert({
          user_id:user.id,
          node_id:`grammar:${c.id}:${l.id}`,
          language:c.targetLang,
          status:'done',
          score:100,
          updated_at:new Date().toISOString()
        },{onConflict:'user_id,node_id'});
      }catch(e){ console.warn('grammar progress save failed',e); }
    }
  }

  async function saveTest(c,no,score,answers){
    const s = read(c);
    s.tests = s.tests || {};
    s.tests['m'+no] = {score,passed:score>=PASS,at:new Date().toISOString()};
    write(c,s);

    if(user && client){
      try{
        await client.from('test_results').insert({
          user_id:user.id,
          node_id:`grammar-test:${c.id}:m${no}`,
          language:c.targetLang,
          score,
          passed:score>=PASS,
          answers
        });
      }catch(e){ console.warn('grammar test save failed',e); }
    }
  }

  function speak(text,lang){
    if(!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang; u.rate = .84;
    speechSynthesis.speak(u);
  }

  function login(next){
    location.href = `auth.html?mode=signup&next=${encodeURIComponent(next || location.href)}`;
  }

  function injectStyles(){
    if(document.getElementById('grammar-v22-style')) return;
    const style=document.createElement('style');
    style.id='grammar-v22-style';
    style.textContent=`
      .grammar-v22-note{border:1px solid #dce7e1;background:#f7faf8;border-radius:16px;padding:14px 16px;display:flex;gap:12px;flex-wrap:wrap;color:#496258;line-height:1.65;margin:14px 0}
      .grammar-v22-modules{display:grid;gap:14px}
      .grammar-v22-module{border:1px solid #dce7e3;border-radius:20px;padding:18px;background:#fff}
      .grammar-v22-module.locked{opacity:.62;background:#fbfcfb}
      .grammar-v22-module.passed{border-color:#b7d7c8;background:#f8fcfa}
      .grammar-v22-head{display:flex;justify-content:space-between;gap:16px;align-items:flex-start}
      .grammar-v22-head h3{margin:4px 0 5px;font-size:21px}
      .grammar-v22-status{font-size:12px;font-weight:800;white-space:nowrap;padding:6px 10px;border-radius:999px;background:#eef6f1;color:#18543c}
      .grammar-v22-status.login{background:#fff7e8;color:#89641f}.grammar-v22-status.lock{background:#f1f3f2;color:#7b8580}
      .grammar-v22-stats{display:flex;justify-content:space-between;font-size:12px;color:#667970;margin-top:10px}
      .grammar-v22-bar{height:8px;background:#edf2ef;border-radius:999px;overflow:hidden;margin:8px 0 14px}
      .grammar-v22-bar span{display:block;height:100%;background:#0e4a37;border-radius:inherit}
      .grammar-v22-lessons{display:grid;grid-template-columns:1fr 1fr;gap:8px}
      .grammar-v22-lesson{display:grid;grid-template-columns:28px 1fr;gap:10px;align-items:center;text-decoration:none;border:1px solid #dfe7e3;border-radius:14px;padding:11px 12px;background:#fff;color:#173b30}
      .grammar-v22-lesson.locked{opacity:.45}.grammar-v22-lesson b{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;background:#eff5f1;color:#18543c;font-size:11px}
      .grammar-v22-lesson strong{font-size:13px}.grammar-v22-lesson small{display:block;color:#788880;font-size:11px;margin-top:3px}
      .grammar-v22-actions{margin-top:14px;display:flex;gap:8px;flex-wrap:wrap}
      .grammar-v22-gate{border:1px solid #dbe5df;border-radius:22px;padding:30px 22px;background:#fff;text-align:center;margin-top:16px}
      .grammar-v22-gate h2{margin:8px 0 10px}.grammar-v22-gate p{max-width:650px;margin:0 auto 16px;color:#687770;line-height:1.75}
      .grammar-v22-test{border:1px solid #dce7e2;border-radius:22px;background:#fff;padding:24px;margin-top:16px}
      .grammar-v22-test h2{margin:6px 0 8px}.grammar-v22-question{border-top:1px solid #e4ebe7;padding-top:18px;margin-top:16px}
      .grammar-v22-question h3{font-size:29px;line-height:1.35;margin:8px 0 12px}
      .grammar-v22-options{display:grid;gap:9px}.grammar-v22-option{border:1px solid #dfe7e3;border-radius:14px;padding:13px 15px;background:#fff;text-align:left;cursor:pointer}
      .grammar-v22-option.correct{background:#edf8f3;border-color:#72b59c}.grammar-v22-option.wrong{background:#fff2f2;border-color:#d79c9c}
      .grammar-v22-feedback{min-height:24px;margin:12px 0;font-weight:700;color:#52665e}
      .grammar-v22-score{font-size:56px;font-weight:900;color:#123f2d;text-align:center;margin:8px 0}
      @media(max-width:760px){.grammar-v22-lessons{grid-template-columns:1fr}.grammar-v22-head{flex-direction:column}.grammar-v22-status{white-space:normal}}
    `;
    document.head.appendChild(style);
  }

  function gate(c, reason){
    const box=document.createElement('div');
    box.className='grammar-v22-gate';
    box.innerHTML=`<span class="eyebrow">🔐 第 2 模块开始需要账号</span><h2>注册 / 登录后继续</h2><p>${esc(reason || '第 1 模块可以直接体验。完成并通过第 1 模块的 70% 考试后，注册 / 登录即可继续。学习进度和考试成绩会保存到账号。')}</p><a class="primary-btn" href="auth.html?mode=signup&next=${encodeURIComponent(location.href)}">注册 / 登录 →</a>`;
    return box;
  }

  function renderModules(c, pool){
    const list=document.getElementById('lessonList');
    if(!list) return;
    const ms=allModules(c);
    list.innerHTML=`<div class="grammar-v22-modules"></div>`;
    const root=list.firstElementChild;

    ms.forEach((m,mi)=>{
      const d=m.lessons.filter(l=>done(c,l.id)).length;
      const pct=Math.round(d/(m.lessons.length||1)*100);
      const isOpen=open(c,mi);
      const pass=passed(c,m.no);
      const t=test(c,m.no);

      const card=document.createElement('section');
      card.className=`grammar-v22-module ${!isOpen?'locked':''} ${pass?'passed':''}`;

      let status=pass ? `✅ 已通过 ${t?.score||0}%`
        : (!isOpen && mi>0 && !user) ? '🔐 注册 / 登录解锁'
        : (!isOpen ? '🔒 等待上一模块 ≥70%' : '🟢 已开放');

      const rows=m.lessons.map((l,i)=>{
        const available=isOpen && (i===0 || m.lessons.slice(0,i).every(x=>done(c,x.id)));
        if(!available){
          return `<div class="grammar-v22-lesson locked"><b>${done(c,l.id)?'✓':'🔒'}</b><span><strong>${esc(l.title)}</strong><small>${esc(target(c,l))}</small></span></div>`;
        }
        return `<a class="grammar-v22-lesson" href="learn.html?pool=course&id=${encodeURIComponent(c.id)}&start=${pool.findIndex(x=>x.id===l.id)}"><b>${done(c,l.id)?'✓':'○'}</b><span><strong>${esc(l.title)}</strong><small>${esc(target(c,l))}</small></span></a>`;
      }).join('');

      let action='';
      if(!isOpen && mi>0 && !user){
        action=`<a class="primary-btn" href="auth.html?mode=signup&next=${encodeURIComponent(location.href)}">🔐 注册 / 登录后继续</a>`;
      }else if(!isOpen){
        action=`<span class="grammar-lock-copy">先通过上一模块考试（≥70%）</span>`;
      }else if(d===m.lessons.length && !pass){
        action=`<a class="primary-btn" href="grammar-test.html?grammar=1&course=${encodeURIComponent(c.id)}&module=${m.no}">参加模块考试 →</a>`;
      }else if(pass){
        action=`<span class="grammar-lock-copy">模块考试 ${t.score}% · 已通过</span>`;
      }else{
        action=`<span class="grammar-lock-copy">按顺序完成全部小课</span>`;
      }

      card.innerHTML=`
        <div class="grammar-v22-head">
          <div><span class="eyebrow">模块 ${String(m.no).padStart(2,'0')}</span><h3>${esc(m.title)}</h3></div>
          <span class="grammar-v22-status ${(!isOpen&&mi>0&&!user)?'login':(!isOpen?'lock':'')}">${status}</span>
        </div>
        <div class="grammar-v22-stats"><span>${d} / ${m.lessons.length} 课完成</span><span>${pct}%</span></div>
        <div class="grammar-v22-bar"><span style="width:${pct}%"></span></div>
        <div class="grammar-v22-lessons">${rows}</div>
        <div class="grammar-v22-actions">${action}</div>
        <div class="grammar-v22-note" style="margin-bottom:0">${pass
          ? '已通过本模块，可以复习。'
          : (d===m.lessons.length&&isOpen
            ? '本模块已经全部完成。参加考试，答对 ≥70% 才能进入下一模块。'
            : (!isOpen&&mi>0&&!user
              ? '第 2 模块开始必须注册 / 登录。登录后会继续保存你的学习数据。'
              : '上一课完成后才开放下一课。'))}</div>`;

      root.appendChild(card);
    });
  }

  const G = {
    renderCoursePage: async function(c){
      await initUser(); migrateGuest(c); injectStyles();
      const pool=courseLessons(c.id), ms=allModules(c);
      document.title=`${c.title}｜中亚语言通`;
      const title=document.getElementById('courseTitle'); if(title) title.textContent=c.title;
      const desc=document.getElementById('courseDesc'); if(desc) desc.textContent=c.desc;
      const intro=document.getElementById('courseIntroNote'); if(intro) intro.textContent=c.targetLang==='kk'
        ? '正式哈萨克语基础语法课：每次只学一个词或一个结构。按模块学习，完成一个模块后参加考核，答对 ≥70% 才能进入下一模块。'
        : '正式俄语基础语法课：每次只学一个词或一个结构。按模块学习，完成一个模块后参加考核，答对 ≥70% 才能进入下一模块。';
      const map=document.getElementById('courseStudyMap');
      if(map) map.innerHTML=`<div class="grammar-v22-note"><strong>闯关规则</strong><span>每个模块完成全部小课后参加考试；答对 ≥70% 才能通过。${user?'已登录，后续模块按闯关成绩解锁。':'模块 1 免费体验；模块 2 开始需要注册 / 登录。'}</span></div>`;
      const pct=document.getElementById('courseProgress');
      const d=pool.filter(l=>done(c,l.id)).length; if(pct) pct.textContent=Math.round(d/(pool.length||1)*100)+'%';
      const start=document.getElementById('courseStart'); if(start) start.href=`learn.html?pool=course&id=${encodeURIComponent(c.id)}&start=0`;
      renderModules(c,pool);
    },

    renderLearnPage: async function(c){
      await initUser(); migrateGuest(c); injectStyles();
      const pool=courseLessons(c.id);
      let idx=Math.max(0,Math.min(Number(qs('start')||0),pool.length-1));
      let l=pool[idx]; if(!l)return;
      const ms=allModules(c), m=ms.find(x=>x.lessons.some(y=>y.id===l.id)); const mi=ms.findIndex(x=>x.no===m.no);
      const inModuleIndex=m.lessons.findIndex(x=>x.id===l.id);

      const root=document.getElementById('protectedContent');
      if(mi>=1 && !user){root.innerHTML='';root.appendChild(gate(c));return;}
      if(!open(c,mi)){root.innerHTML='';root.appendChild(Object.assign(document.createElement('div'),{className:'grammar-v22-gate',innerHTML:`<span class="eyebrow">尚未解锁</span><h2>等待上一模块通过</h2><p>完成前面模块全部小课，并在各模块考试中答对 ≥70% 后，才能进入本模块。</p><a class="primary-btn" href="course.html?id=${encodeURIComponent(c.id)}">返回课程 →</a>`}));return;}
      if(inModuleIndex>0 && !m.lessons.slice(0,inModuleIndex).every(x=>done(c,x.id))){
        const first=m.lessons.findIndex(x=>!done(c,x.id));
        idx=pool.findIndex(x=>x.id===m.lessons[first].id); l=pool[idx];
      }

      const title=document.getElementById('learnTitle'),count=document.getElementById('learnCount'),cn=document.getElementById('learnCn'),kz=document.getElementById('learnKz'),ru=document.getElementById('learnRu'),tip=document.getElementById('learnTip'),memory=document.getElementById('learnMemory'),grammar=document.getElementById('learnGrammar'),tag=document.getElementById('learnTag'),path=document.getElementById('learnPath');
      const kr=document.getElementById('learnKzRow'),rr=document.getElementById('learnRuRow');
      if(kr)kr.style.display=c.targetLang==='kk'?'flex':'none';if(rr)rr.style.display=c.targetLang==='ru'?'flex':'none';
      if(title)title.textContent=l.title;if(count)count.textContent=`${idx+1} / ${pool.length}`;if(cn)cn.textContent=l.cn;if(kz)kz.textContent=l.kz||'';if(ru)ru.textContent=l.ru||'';if(tip)tip.textContent=l.tip;if(tag)tag.textContent=l.tag;if(grammar)grammar.textContent=`模块 ${String(m.no).padStart(2,'0')}：${m.title}`;if(path)path.textContent=`${c.title} · 模块 ${String(m.no).padStart(2,'0')}`;
      if(memory)memory.innerHTML='<span>记忆方法</span><strong>'+esc(grammarMemory(l))+'</strong>';
      const lang=codeOf(c);
      document.querySelectorAll('[data-text]').forEach(b=>{b.onclick=()=>speak(b.dataset.text,b.dataset.lang||lang)});
      const prev=document.getElementById('prevLink'),next=document.getElementById('nextLink');
      if(prev)prev.href=`learn.html?pool=course&id=${encodeURIComponent(c.id)}&start=${Math.max(0,idx-1)}`;
      if(next)next.href=`learn.html?pool=course&id=${encodeURIComponent(c.id)}&start=${Math.min(pool.length-1,idx+1)}`;
      const markBtn=document.getElementById('markBtn');if(markBtn)markBtn.textContent=done(c,l.id)?'已记住 ✓':'记住了，下一句';
      if(next)next.onclick=async(e)=>{e.preventDefault();await mark(c,l);location.href=complete(c,m)
        ? `grammar-test.html?grammar=1&course=${encodeURIComponent(c.id)}&module=${m.no}`
        : `learn.html?pool=course&id=${encodeURIComponent(c.id)}&start=${Math.min(pool.length-1,idx+1)}`;};
    },

    renderTestPage: async function(c,mNo){
      await initUser(); migrateGuest(c); injectStyles();
      const ms=allModules(c),m=ms.find(x=>x.no===mNo),root=document.getElementById('grammarTestRoot'); if(!m||!root)return;
      if(mNo>=2&&!user){root.innerHTML='';root.appendChild(gate(c,'第 2 模块开始需要注册 / 登录，登录后考试成绩会保存到账号。'));return;}
      if(!open(c,ms.indexOf(m))){root.innerHTML='';const b=document.createElement('div');b.className='grammar-v22-gate';b.innerHTML=`<span class="eyebrow">尚未解锁</span><h2>等待上一模块通过</h2><p>完成前面模块全部小课，各模块考试答对 ≥70% 才能进入下一模块。</p><a class="primary-btn" href="course.html?id=${encodeURIComponent(c.id)}">返回课程 →</a>`;root.appendChild(b);return;}
      if(!complete(c,m)){root.innerHTML=`<div class="grammar-v22-gate"><span class="eyebrow">还不能考试</span><h2>请先完成模块 ${mNo} 的全部小课</h2><p>目前完成 ${m.lessons.filter(l=>done(c,l.id)).length} / ${m.lessons.length} 课。</p><a class="primary-btn" href="course.html?id=${encodeURIComponent(c.id)}">返回课程 →</a></div>`;return;}

      const pool=m.lessons, questions=[];
      for(let i=0;i<10;i++){
        const l=pool[i%pool.length], others=pool.filter(x=>x.id!==l.id);
        if(i%2===0) questions.push({kind:'target',question:l.cn,answer:target(c,l),options:shuffle([target(c,l),...shuffle(others).slice(0,3).map(x=>target(c,x))]),audio:target(c,l)});
        else questions.push({kind:'meaning',question:target(c,l),answer:l.cn,options:shuffle([l.cn,...shuffle(others).slice(0,3).map(x=>x.cn)]),audio:target(c,l)});
      }

      let i=0,score=0,answered=false;
      const draw=()=>{
        const q=questions[i];answered=false;
        root.innerHTML=`<div class="grammar-v22-test"><div class="grammar-v22-head"><div><span class="eyebrow">模块 ${String(m.no).padStart(2,'0')} · ${esc(m.title)}</span><h1>${c.flag} ${esc(c.label)} · 模块考试</h1><p>答对 ≥70% 才通过。第 ${i+1} / ${questions.length} 题</p></div><strong>${score} 分</strong></div><div class="grammar-v22-bar"><span style="width:${Math.round((i+1)/questions.length*100)}%"></span></div><div class="grammar-v22-question"><div class="eyebrow">${q.kind==='target'?'请选择正确的目标语言':'这句话是什么意思？'}</div><h3>${esc(q.question)}</h3><button class="secondary-btn" id="gAudio" type="button">🔊 听发音</button><div class="grammar-v22-options" style="margin-top:14px">${q.options.map((o,j)=>`<button class="grammar-v22-option" type="button" data-i="${j}">${String.fromCharCode(65+j)}. ${esc(o)}</button>`).join('')}</div><div id="gFeedback" class="grammar-v22-feedback"></div><button class="primary-btn" id="gNext" type="button" disabled>${i===questions.length-1?'查看成绩':'下一题'}</button></div></div>`;
        root.querySelector('#gAudio').onclick=()=>speak(q.audio,codeOf(c));
        root.querySelectorAll('.grammar-v22-option').forEach(btn=>btn.onclick=()=>{
          if(answered)return;answered=true;
          const val=q.options[Number(btn.dataset.i)],ok=val===q.answer;
          root.querySelectorAll('.grammar-v22-option').forEach(b=>{b.disabled=true;if(q.options[Number(b.dataset.i)]===q.answer)b.classList.add('correct')});
          btn.classList.add(ok?'correct':'wrong');if(ok)score++;
          root.querySelector('#gFeedback').textContent=ok?'回答正确！':'回答错误。正确答案：'+q.answer;
          root.querySelector('#gNext').disabled=false;
        });
        root.querySelector('#gNext').onclick=async()=>{if(!answered)return;if(i<questions.length-1){i++;draw()}else{const pct=Math.round(score/questions.length*100);await saveTest(c,m.no,pct,questions.map(q=>({q:q.question,a:q.answer})));root.innerHTML=`<div class="grammar-v22-gate" style="text-align:center"><span class="eyebrow">模块 ${m.no} 考试</span><div class="grammar-v22-score">${pct}%</div><h2>${pct>=PASS?'通过！':'需要再练一次'}</h2><p>${pct>=PASS?'达到 70% 通过线。下一模块已经解锁。':'没有达到 70%，回去复习本模块后再测试。'}</p>${pct>=PASS?(m.no<ms.length?`<a class="primary-btn" href="course.html?id=${encodeURIComponent(c.id)}">查看下一模块 →</a>`:`<a class="primary-btn" href="course.html?id=${encodeURIComponent(c.id)}">完成课程 →</a>`):`<button class="primary-btn" id="gRetry">重新测试 →</button>`}</div>`;if(root.querySelector('#gRetry'))root.querySelector('#gRetry').onclick=()=>G.renderTestPage(c,m.no);}};};
      draw();
    }
  };

  function grammarMemory(l){
    const map={
      '人称代词':'一个人称一个人称地记：中文 → 目标语言 → 听 → 跟读 → 自己说。',
      '名词谓语':'先记“谁 + 是什么”，只换最后一个词。',
      '指示句':'先整体记住“这是……”，再替换名词。',
      '否定':'把肯定句和否定句成对比较。',
      '疑问句':'先会陈述句，再把它变成问题。',
      '所属关系':'先记“我的/你的 + 名词”，再放回整句。',
      '所有关系':'先记所属形式，再放回完整句。',
      '存在句':'把“有 / 没有”成对记忆，再换人和物。',
      '地点':'先记“在哪里”，再换家、公司、车站。',
      '地点与前置词':'把前置词和后面的词块一起记。',
      '地点与方向':'把“去哪里 / 从哪里”放成一对。',
      '方向':'先记一个目的地句，再换地点。',
      '来源':'先记“来自哪里”的完整句，再换国家/城市。',
      '现在时':'先学“我”，再比较“你、他”的变化。',
      '动词现在时':'先学一个动词，再换人称。',
      '动词否定':'把“做 / 不做”放在一起比较。',
      '动词疑问':'在会说的动作句后练一次问题。',
      '时间':'同一句只换今天、明天、现在。',
      '问词':'一次只学一个：谁、什么、哪里、什么时候。',
      '情态':'先记完整句，再替换需要、想要、可以后的内容。',
      '过去时':'先记一个过去时完整句，再比较人物变化。',
      '将来时':'先记一个将来句，再换时间和动作。',
      '未来与计划':'时间词 + 动作先整体记，再观察形式。',
      '连接句':'先说两个短句，再用连接词连起来。',
      '组句':'先看词块，再自己排成句子。',
      '造句':'先遮住答案自己说，再核对。',
      '场景造句':'把已经学会的句型放到真实场景里。'
    };
    return map[l.group] || '一个重点只学一点：先听、跟读、自己说。';
  }

  function guarded(render,rootId){
    return async (...args) => {
      try { return await render(...args); }
      catch(error){
        console.warn('grammar page failed',error);
        const root=document.getElementById(rootId);
        if(root) root.innerHTML='<p role="status">暂时无法读取登录状态或学习进度，请刷新重试。请检查网络和浏览器存储设置。</p>';
      }
    };
  }
  window.GrammarFlow = { renderCoursePage:guarded(G.renderCoursePage,'lessonList'), renderLearnPage:guarded(G.renderLearnPage,'protectedContent'), renderTestPage:guarded(G.renderTestPage,'grammarTestRoot'), TEST_PASS:PASS };

})();
