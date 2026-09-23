/* V16 grammar course flow: module tests, 70% pass gate, login from module 2, cloud progress. */
(function(){
  const G = {};
  const TEST_PASS = 70;
  const state = { user:null, client:null, tests:{}, synced:false };
  const shuffle = a => a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
  const esc = s => String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const target = (c,l) => c.targetLang==='kk' ? l.kz : l.ru;
  const langCode = c => c.targetLang==='kk' ? 'kk-KZ' : 'ru-RU';
  const localTestsKey = c => `grammarTests:${c.id}`;
  const loadLocalTests = c => { try{return JSON.parse(localStorage.getItem(localTestsKey(c))||'{}')}catch{return{}} };
  const saveLocalTests = (c,t) => localStorage.setItem(localTestsKey(c),JSON.stringify(t));
  const lessonDone = id => completed.includes(id);
  const userClient = () => window.KZAuth?.getClient?.() || null;

  function moduleDefs(c){
    if(c.id==='sentence-kz'){
      return [
        ['01','人称与最基本身份',['sentence-kz-pronoun-01','sentence-kz-pronoun-02','sentence-kz-pronoun-03','sentence-kz-pronoun-04','sentence-kz-pronoun-05','sentence-kz-pronoun-06','sentence-kz-03']],
        ['02','名词句与指认',['sentence-kz-04','sentence-kz-05','sentence-kz-06']],
        ['03','否定与疑问',['sentence-kz-07','sentence-kz-08','sentence-kz-09']],
        ['04','所属与有 / 没有',['sentence-kz-10','sentence-kz-11','sentence-kz-12','sentence-kz-13','sentence-kz-14','sentence-kz-15']],
        ['05','地点与方向',['sentence-kz-16','sentence-kz-17','sentence-kz-18','sentence-kz-19','sentence-kz-20']],
        ['06','动词现在时',['sentence-kz-21','sentence-kz-22','sentence-kz-23','sentence-kz-24','sentence-kz-25']],
        ['07','时间与问词',['sentence-kz-26','sentence-kz-27','sentence-kz-28','sentence-kz-29','sentence-kz-30']],
        ['08','需要、想要、可以',['sentence-kz-31','sentence-kz-32','sentence-kz-33','sentence-kz-34']],
        ['09','过去、将来与连接',['sentence-kz-35','sentence-kz-36','sentence-kz-37','sentence-kz-38','sentence-kz-39']],
        ['10','组句与独立造句',['sentence-kz-40','sentence-kz-41','sentence-kz-42','sentence-kz-43','sentence-kz-44','sentence-kz-45']]
      ];
    }
    return [
      ['01','人称与最基本身份',['sentence-ru-pronoun-01','sentence-ru-pronoun-02','sentence-ru-pronoun-03','sentence-ru-pronoun-04','sentence-ru-pronoun-05','sentence-ru-pronoun-06','sentence-ru-pronoun-07','sentence-ru-03']],
      ['02','名词句与指认',['sentence-ru-04','sentence-ru-05','sentence-ru-06']],
      ['03','否定与疑问',['sentence-ru-07','sentence-ru-08']],
      ['04','所属与有 / 没有',['sentence-ru-09','sentence-ru-10','sentence-ru-11','sentence-ru-12','sentence-ru-13']],
      ['05','地点、方向与来源',['sentence-ru-14','sentence-ru-15','sentence-ru-16','sentence-ru-17','sentence-ru-18']],
      ['06','动词现在时',['sentence-ru-19','sentence-ru-20','sentence-ru-21','sentence-ru-22','sentence-ru-23']],
      ['07','时间与问词',['sentence-ru-24','sentence-ru-25','sentence-ru-26','sentence-ru-27','sentence-ru-28']],
      ['08','需要、想要、可以',['sentence-ru-29','sentence-ru-30','sentence-ru-31','sentence-ru-32']],
      ['09','过去、将来与连接',['sentence-ru-33','sentence-ru-34','sentence-ru-35','sentence-ru-36','sentence-ru-37']],
      ['10','组句与独立造句',['sentence-ru-38','sentence-ru-39','sentence-ru-40','sentence-ru-41','sentence-ru-42','sentence-ru-43']]
    ];
  }
  function modules(c){ return moduleDefs(c).map((m,i)=>({no:i+1,id:m[0],title:m[1],ids:m[2],lessons:m[2].map(id=>lessons.find(l=>l.id===id)).filter(Boolean)})); }
  function moduleOfLesson(c, lesson){ return modules(c).find(m=>m.ids.includes(lesson.id)) || null; }
  async function init(){
    state.client=userClient();
    if(state.client){ try{ const r=await state.client.auth.getSession(); state.user=r.data?.session?.user||null; }catch{} }
    if(state.user) { await syncRemote(); await pushLocalState(); }
    state.tests = state._tests || {};
    return state.user;
  }
  async function pushLocalState(){
    if(!state.client || !state.user) return;
    try{
      const grammarLessonIds=new Set(lessons.filter(l=>l.course==='sentence-kz'||l.course==='sentence-ru').map(l=>l.id));
      for(const lid of completed){
        if(!grammarLessonIds.has(lid)) continue;
        const l=lessons.find(x=>x.id===lid); if(!l) continue;
        await state.client.from('learning_progress').upsert({user_id:state.user.id,node_id:`grammar:${l.course}:${l.id}`,language:l.course==='sentence-kz'?'kk':'ru',status:'done',score:100,updated_at:new Date().toISOString()},{onConflict:'user_id,node_id'});
      }
      const current={...loadLocalTests(courseById('sentence-kz')||{}),...loadLocalTests(courseById('sentence-ru')||{})};
      for(const [cid] of [['sentence-kz'],['sentence-ru']]){
        const cc=courseById(cid); if(!cc) continue; const lt=loadLocalTests(cc);
        for(const [k,v] of Object.entries(lt)){
          const m=k.match(/^m(\d+)$/); if(!m||!v) continue;
          const marker=`grammarUpload:${cid}:m${m[1]}`; if(localStorage.getItem(marker)==='1') continue;
          const {error}=await state.client.from('test_results').insert({user_id:state.user.id,node_id:`grammar-test:${cid}:m${m[1]}`,language:cc.targetLang,score:Number(v.score)||0,passed:!!v.passed,answers:[]});
          if(!error) localStorage.setItem(marker,'1');
        }
      }
    }catch(e){ console.warn('grammar local state push failed',e); }
  }

  async function syncRemote(){
    if(!state.client || !state.user) return;
    try{
      const {data:lp}=await state.client.from('learning_progress').select('node_id,status').eq('user_id',state.user.id).like('node_id','grammar:%').limit(2000);
      (lp||[]).forEach(r=>{ const parts=String(r.node_id).split(':'); const lid=parts[2]; if(parts[0]==='grammar'&&lid&&r.status==='done'&&!completed.includes(lid)) completed.push(lid); });
      saveCompleted();
      const {data:tr}=await state.client.from('test_results').select('node_id,score,passed,created_at').eq('user_id',state.user.id).like('node_id','grammar-test:%').order('created_at',{ascending:false}).limit(1000);
      const t={}; (tr||[]).forEach(r=>{ const m=String(r.node_id).match(/^grammar-test:(.+):m(\d+)$/); if(!m)return; const key=`${m[1]}:m${m[2]}`; if(!t[key]||Number(r.score)>Number(t[key].score)) t[key]={score:Number(r.score),passed:!!r.passed,created_at:r.created_at}; });
      state._tests=t;
      state.tests=t;
    }catch(e){ console.warn('grammar remote sync failed',e); state._tests={}; }
    state.synced=true;
  }
  async function ensure(){ if(!state.client) state.client=userClient(); if(!state.client || !state.user) await init(); return state.user; }
  function testState(c,m){ const local=loadLocalTests(c); const key=`m${m}`; return local[key] || state.tests?.[`${c.id}:m${m}`] || null; }
  function passed(c,m){ const s=testState(c,m); return !!(s && s.passed && Number(s.score)>=TEST_PASS); }
  function complete(c,m){ return m.lessons.length>0 && m.lessons.every(l=>lessonDone(l.id)); }
  function canOpen(c,m){ if(m.no===1) return true; return passed(c,m.no-1) && !!state.user; }
  function loginGate(next){ const u=encodeURIComponent(next||location.href); return `<div class="grammar-gate"><span class="eyebrow">需要账号才能继续</span><h2>从第 2 模块开始，请先注册 / 登录</h2><p>第 1 模块可以免费体验。完成第 1 模块并通过 70% 测试后，登录账号即可继续后面的语法课程，并保存学习进度和考试成绩。</p><div class="grammar-gate-actions"><a class="secondary-btn" href="course.html?id=${encodeURIComponent(qs('id')||'sentence-kz')}">返回课程</a><a class="primary-btn" href="auth.html?mode=signup&next=${u}">注册 / 登录</a></div></div>`; }
  function prevGate(c,m){ return `<div class="grammar-gate"><span class="eyebrow">尚未解锁</span><h2>先通过第 ${m.no-1} 模块考试</h2><p>完成第 ${m.no-1} 模块全部小课后参加考试，答对 70% 以上，才能进入下一模块。</p><div class="grammar-gate-actions"><a class="primary-btn" href="course.html?id=${encodeURIComponent(c.id)}">返回课程</a></div></div>`; }
  function renderModuleCards(c,pool){
    const ms=modules(c);
    return `<div class="grammar-modules">${ms.map(m=>{
      const done=m.lessons.filter(l=>lessonDone(l.id)).length, pct=m.lessons.length?Math.round(done/m.lessons.length*100):0;
      const open=canOpen(c,m), ts=testState(c,m.no), pass=!!(ts&&ts.passed&&Number(ts.score)>=TEST_PASS);
      const isLogged=!!state.user;
      let badge=''; let action='';
      if(m.no===1){ badge=pass?'✅ 已通过':'🟢 免费开始'; action=complete(c,m)?`<a class="test-btn" href="grammar-test.html?grammar=1&course=${encodeURIComponent(c.id)}&module=${m.no}">参加模块考试</a>`:`<span class="grammar-lock-copy">完成本模块全部小课后参加考试</span>`; }
      else if(!isLogged){ badge='🔒 登录后继续'; action=`<a class="test-btn" href="auth.html?mode=signup&next=${encodeURIComponent('course.html?id='+c.id)}">注册 / 登录</a>`; }
      else if(!passed(c,m.no-1)){ badge='🔒 等待上一模块考试'; action=`<span class="grammar-lock-copy">上一模块需 ≥ 70%</span>`; }
      else { badge=pass?'✅ 已通过':'🔓 已解锁'; action=complete(c,m)?`<a class="test-btn" href="grammar-test.html?grammar=1&course=${encodeURIComponent(c.id)}&module=${m.no}">${pass?'重新测试':'参加模块考试'}</a>`:`<span class="grammar-lock-copy">先完成本模块小课</span>`; }
      const lessonRows=m.lessons.map(l=>{ const href=`learn.html?pool=course&id=${encodeURIComponent(c.id)}&start=${pool.findIndex(x=>x.id===l.id)}`; const unlocked=open; return unlocked?`<a class="grammar-lesson-mini" href="${href}"><b>${lessonDone(l.id)?'✓':'○'}</b><span>${esc(l.title)}</span></a>`:`<div class="grammar-lesson-mini locked"><b>🔒</b><span>${esc(l.title)}</span></div>`; }).join('');
      return `<section class="grammar-module-card ${open?'open':'locked'}"><div class="grammar-module-head"><div><span class="eyebrow">模块 ${String(m.no).padStart(2,'0')}</span><h3>${esc(m.title)}</h3><p>${done}/${m.lessons.length} 课完成 · ${pct}%</p></div><span class="grammar-module-status">${badge}</span></div><div class="progress-track"><span style="width:${pct}%"></span></div><div class="grammar-mini-lessons">${lessonRows}</div><div class="grammar-module-action">${action}</div></section>`;
    }).join('')}</div>`;
  }
  G.renderCoursePage = async function(c){
    await init();
    const pool=courseLessons(c.id); document.title=`${c.title}｜中亚语言通`;
    const title=document.getElementById('courseTitle'); if(title) title.textContent=c.title;
    const desc=document.getElementById('courseDesc'); if(desc) desc.textContent=c.desc;
    const intro=document.getElementById('courseIntroNote'); if(intro) intro.textContent=c.targetLang==='kk'?'正式哈萨克语基础语法课：一个词、一个结构、一个例句。每学完一个模块，参加一次考核，70% 以上才能进入下一模块。':'正式俄语基础语法课：一个词、一个结构、一个例句。每学完一个模块，参加一次考核，70% 以上才能进入下一模块。';
    const map=document.getElementById('courseStudyMap'); if(map) map.innerHTML=`<div class="grammar-course-notice"><strong>模块闯关规则</strong><span>第 1 模块免费学习；完成后参加模块考试，答对 ≥ 70% 才能过关。第 2 模块开始需要注册 / 登录。</span></div>`;
    const list=document.getElementById('lessonList'); if(list) list.innerHTML=renderModuleCards(c,pool);
    const pct=document.getElementById('courseProgress'); const done=pool.filter(l=>lessonDone(l.id)).length; if(pct) pct.textContent=`${pool.length?Math.round(done/pool.length*100):0}%`;
    const start=document.getElementById('courseStart'); if(start) start.href=`learn.html?pool=course&id=${encodeURIComponent(c.id)}&start=0`;
  };
  function questionSet(c,m){
    const bank=m.lessons; const out=[];
    for(let i=0;i<10;i++){
      const l=bank[i%bank.length]; const t=target(c,l); const others=bank.filter(x=>x.id!==l.id); let q;
      if(i%3===0){ const opts=shuffle([l.cn,...shuffle(others).slice(0,3).map(x=>x.cn)]); q={kind:'meaning',prompt:'这句话是什么意思？',source:t,answer:l.cn,options:opts,audio:t,lang:langCode(c)}; }
      else if(i%3===1){ const opts=shuffle([t,...shuffle(others).slice(0,3).map(x=>target(c,x))]); q={kind:'target',prompt:'下面哪一个是它的目标语言表达？',source:l.cn,answer:t,options:opts,audio:t,lang:langCode(c)}; }
      else { const opts=shuffle([t,...shuffle(others).slice(0,3).map(x=>target(c,x))]); q={kind:'target2',prompt:'选择正确的目标语言。',source:l.cn,answer:t,options:opts,audio:t,lang:langCode(c)}; }
      out.push(q);
    }
    return out;
  }
  async function saveTest(c,mNo,pct,answers){
    const local=loadLocalTests(c); local[`m${mNo}`]={score:pct,passed:pct>=TEST_PASS,updatedAt:new Date().toISOString()}; saveLocalTests(c,local); state.tests[`${c.id}:m${mNo}`]=local[`m${mNo}`];
    if(state.user&&state.client){ try{ await state.client.from('test_results').insert({user_id:state.user.id,node_id:`grammar-test:${c.id}:m${mNo}`,language:c.targetLang,score:pct,passed:pct>=TEST_PASS,answers}); }catch(e){console.warn('grammar test save failed',e);} }
  }
  G.renderTestPage = async function(c,mNo){
    await init(); const ms=modules(c), m=ms.find(x=>x.no===mNo); if(!m) return;
    const host=document.getElementById('grammarTestRoot'); if(!host) return;
    if(mNo>=2 && !state.user){ host.innerHTML=loginGate(location.href); return; }
    if(mNo>=2 && !passed(c,mNo-1)){ host.innerHTML=prevGate(c,m); return; }
    if(!complete(c,m)){ host.innerHTML=`<div class="grammar-gate"><span class="eyebrow">还不能考试</span><h2>先完成第 ${m.no} 模块的全部小课</h2><p>目前完成 ${m.lessons.filter(l=>lessonDone(l.id)).length} / ${m.lessons.length} 课。全部完成后才能参加模块考试。</p><div class="grammar-gate-actions"><a class="primary-btn" href="course.html?id=${encodeURIComponent(c.id)}">返回课程</a></div></div>`; return; }
    const qsx=questionSet(c,m); let i=0,score=0,chosen=false; const render=()=>{
      const q=qsx[i]; chosen=false; host.innerHTML=`<div class="grammar-test-shell"><div class="grammar-test-head"><div><span class="eyebrow">模块 ${String(m.no).padStart(2,'0')} · ${esc(m.title)}</span><h1>${c.flag} ${c.label} · 模块考试</h1><p>答对 70% 以上即可通过。第 ${i+1} / ${qsx.length} 题</p></div><strong>${score} 分</strong></div><div class="placement-progress"><span style="width:${Math.round(i/qsx.length*100)}%"></span></div><div class="grammar-test-card"><div class="question-with-audio"><h2>${esc(q.prompt)}</h2>${q.audio?`<button class="question-audio" data-text="${esc(q.audio)}" data-lang="${q.lang}">🔊 听发音</button>`:''}</div><div class="grammar-source">${esc(q.source)}</div><div class="grammar-options">${q.options.map((o,j)=>`<button class="answer-option" data-j="${j}">${esc(o)}${isTargetScript(o)?`<button class="option-audio" data-text="${esc(o)}" data-lang="${q.lang}">🔊</button>`:''}</button>`).join('')}</div><div id="grammarFeedback" class="feedback-box"></div><button id="grammarNext" class="primary-btn" disabled>${i===qsx.length-1?'查看成绩':'下一题'}</button></div></div>`;
      const next=host.querySelector('#grammarNext'); host.querySelectorAll('.question-audio').forEach(b=>b.onclick=e=>speak(b.dataset.text,b.dataset.lang));
      host.querySelectorAll('.option-audio').forEach(b=>b.onclick=e=>{e.stopPropagation();speak(b.dataset.text,b.dataset.lang)});
      host.querySelectorAll('.answer-option').forEach(btn=>btn.onclick=()=>{ if(chosen)return; chosen=true; const val=q.options[Number(btn.dataset.j)], ok=val===q.answer; if(ok){score++;btn.classList.add('correct');}else{btn.classList.add('wrong');host.querySelectorAll('.answer-option').forEach(x=>{if(q.options[Number(x.dataset.j)]===q.answer)x.classList.add('correct')});} const fb=host.querySelector('#grammarFeedback'); fb.className=`feedback-box ${ok?'good':'bad'}`; fb.textContent=ok?'回答正确！':`回答错误。正确答案：${q.answer}`; next.disabled=false; });
      next.onclick=async()=>{ if(!chosen)return; if(i<qsx.length-1){i++;render();window.scrollTo({top:0,behavior:'smooth'});}else{const pct=Math.round(score/qsx.length*100); await saveTest(c,mNo,pct,qsx.map(q=>({source:q.source,answer:q.answer}))); showResult(pct);} };
    };
    const showResult=pct=>{ const pass=pct>=TEST_PASS; host.innerHTML=`<div class="result-card ${pass?'pass':'fail'}"><span class="eyebrow">模块 ${String(m.no).padStart(2,'0')} 考试</span><h1>${pass?'通过！':'还需要再练一次'}</h1><div class="score-big">${pct}%</div><p>答对 ${Math.round(pct/100*qsx.length)} / ${qsx.length} 题。${pass?'你已经达到 70% 通过线。':'通过线是 70%，重新学习后可以再次考试。'}</p><div class="result-actions">${pass&&m.no<ms.length?`<a class="primary-btn" href="course.html?id=${encodeURIComponent(c.id)}">查看下一模块</a>`:`<a class="primary-btn" href="course.html?id=${encodeURIComponent(c.id)}">返回课程</a>`}<button id="retryGrammar" class="secondary-btn">重新测试</button></div></div>`; host.querySelector('#retryGrammar').onclick=()=>G.renderTestPage(c,mNo); };
    render();
  };
  G.renderLearnPage = async function(c){
    await init(); const pool=courseLessons(c.id); let current=Math.max(0,Math.min(Number(qs('start')||0),pool.length-1)); const lesson=pool[current]; const m=moduleOfLesson(c,lesson); const root=document.getElementById('protectedContent')||document.body;
    if(!m) return;
    if(m.no>=2 && !state.user){ root.innerHTML=loginGate(location.href); return; }
    if(m.no>=2 && !passed(c,m.no-1)){ root.innerHTML=prevGate(c,m); return; }
    const title=document.getElementById('learnTitle'),count=document.getElementById('learnCount'),cn=document.getElementById('learnCn'),kz=document.getElementById('learnKz'),ru=document.getElementById('learnRu'),tip=document.getElementById('learnTip'),memory=document.getElementById('learnMemory'),grammar=document.getElementById('learnGrammar'),tag=document.getElementById('learnTag'),path=document.getElementById('learnPath');
    const kzRow=document.getElementById('learnKzRow'),ruRow=document.getElementById('learnRuRow'); kzRow.style.display=c.targetLang==='kk'?'flex':'none'; ruRow.style.display=c.targetLang==='ru'?'flex':'none';
    const side=document.getElementById('learnModeNote'); if(side) side.textContent=c.targetLang==='kk'?'目标语言：哈萨克语。基础语法课按模块学习，每个模块结束有考试。':'目标语言：俄语。基础语法课按模块学习，每个模块结束有考试。';
    function draw(){ const l=pool[current]; const lm=moduleOfLesson(c,l); title.textContent=l.title; count.textContent=`${current+1} / ${pool.length}`; cn.textContent=l.cn; kz.textContent=l.kz||''; ru.textContent=l.ru||''; tip.textContent=l.tip; if(grammar) grammar.textContent=`模块 ${lm.no}：${lm.title}`; memory.innerHTML=`<span>记忆方法</span><strong>${grammarMemory(l,c)}</strong>`; tag.textContent=l.tag; path.textContent=`当前内容：${c.title} · 模块 ${lm.no}`; const prev=Math.max(0,current-1),next=Math.min(pool.length-1,current+1); document.getElementById('prevLink').href=`learn.html?pool=course&id=${encodeURIComponent(c.id)}&start=${prev}`; document.getElementById('nextLink').href=`learn.html?pool=course&id=${encodeURIComponent(c.id)}&start=${next}`; document.getElementById('markBtn').textContent=lessonDone(l.id)?'已记住 ✓':'记住了，下一句'; document.getElementById('nextLink').onclick=async()=>{ if(!lessonDone(l.id)){ completed.push(l.id); saveCompleted(); if(state.user&&state.client){ try{ await state.client.from('learning_progress').upsert({user_id:state.user.id,node_id:`grammar:${c.id}:${l.id}`,language:c.targetLang,status:'done',score:100,updated_at:new Date().toISOString()},{onConflict:'user_id,node_id'});}catch(e){console.warn('grammar lesson save failed',e);} } } }; }
    draw(); bindSounds();
  };
  function grammarMemory(l,c){ const g=l.group||''; const map={'人称代词':'先只记一个人称：中文意思 → 目标语言 → 听发音 → 跟读 3 次。','名词谓语':'先记“谁 + 是什么”，再换最后一个词。','指示句':'先把“这是……”当成一个整体，再替换名词。','否定':'把肯定和否定放在一起，对比一个变化。','疑问句':'先会陈述，再把同一个句子变成问题。','所属关系':'先记“我的/你的 + 名词”，再回到整句。','存在句':'先记“有/没有”的完整结构，再换人和物。','地点':'先记“在哪里”，再换家、公司、车站。','地点与方向':'把“去哪里 / 从哪里”放成一对。','现在时':'先会“我”，再比较“你、他”的变化。','动词现在时':'先会“我”，再比较“你、他”的变化。','时间':'同一句只换今天、明天、现在。','问词':'一次只记一个：谁、什么、哪里、什么时候。','情态':'先记完整句，再替换需要、想要、可以后面的内容。','过去时':'先记一个完整过去时句，再比较人物变化。','未来与计划':'先记时间词 + 动作，再观察形式。','将来时':'先记时间词 + 动作，再观察形式。','连接句':'先说两个短句，再用连接词合起来。','组句':'先看词块，再自己把词块排成句子。','造句':'先遮住答案自己说，再对照。'}; return map[g]||'一个重点只学一点：先听、再跟读、再自己说。'; }
  G.TEST_PASS=TEST_PASS; G.modules=modules; G.passed=passed;
  window.GrammarFlow=G;
  document.addEventListener('DOMContentLoaded', async ()=>{
    const page=document.body.dataset.page;
    if(page==='test' && qs('grammar')==='1'){
      const cid=qs('course')||'sentence-kz', c=courseById(cid)||courses.find(x=>x.kind==='sentence');
      const mn=Math.max(1,Number(qs('module')||1));
      G.renderTestPage(c,mn);
    }
  });
})();
