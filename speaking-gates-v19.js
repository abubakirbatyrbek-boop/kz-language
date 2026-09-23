/* V19: keeps existing speaking-course content, adds visible module gates, 70% tests, and login from module 2. */
(function(){
  'use strict';

  function esc(v){
    return String(v ?? '').replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
  }
  function courseData(lang){
    return (window.SPEAKING_COURSES||{})[lang] || null;
  }
  function allLessons(course){
    return course.modules.flatMap(m => m[2].map((x,i)=>({
      module:m[0], moduleTitle:m[1], index:i, title:x[0],
      zh:x[1], target:x[2], note:x[3],
      id:`${m[0]}-${i+1}`
    })));
  }
  function prog(lang){
    try{return JSON.parse(localStorage.getItem(`v13_speaking_${lang}_${window.__speakingUser?.id||'guest'}`)||'{}')}catch{return {}}
  }
  function isDoneV19(lang,id){
    const p=prog(lang);
    return p[`v13:speaking:${lang}:${id}`]?.status==='done' || (window.isDone && window.isDone(lang,id));
  }
  function setProg(lang,p){
    localStorage.setItem(`v13_speaking_${lang}_${window.__speakingUser?.id||'guest'}`,JSON.stringify(p));
  }
  function moduleKey(lang,no){return `v14:speaking-test:${lang}:${no}`;}
  function passed(lang,no){return prog(lang)[moduleKey(lang,no)]?.status==='passed';}
  function score(lang,no){return Number(prog(lang)[moduleKey(lang,no)]?.score||0);}
  function completed(lang,course,no){
    const ls=course.modules.find(m=>m[0]===no)?.[2]||[];
    return ls.length>0 && ls.every((_,i)=>isDoneV19(lang,`${no}-${i+1}`));
  }
  function unlocked(lang,course,mi){
    if(mi===0) return true;
    if(!window.__speakingUser) return false;
    return passed(lang,course.modules[mi-1][0]);
  }
  function login(){
    const next=location.pathname.split('/').pop()+location.search;
    location.href=`auth.html?mode=login&next=${encodeURIComponent(next)}`;
  }
  async function saveModuleResult(lang,no,pct,ok,answers){
    const p=prog(lang); const now=new Date().toISOString();
    p[moduleKey(lang,no)]={status:ok?'passed':'failed',score:pct,updated_at:now,answers};
    setProg(lang,p);
    const s=window.__speakingSupabase, u=window.__speakingUser;
    if(s&&u){
      try{
        await s.from('test_results').insert({
          user_id:u.id,node_id:moduleKey(lang,no),language:lang,score:pct,passed:ok,answers
        });
      }catch(e){console.warn('module result save failed',e);}
    }
  }
  async function saveLessonV19(lang,id){
    if(window.saveSpeakingLesson){await window.saveSpeakingLesson(lang,id);return;}
    const p=prog(lang); const now=new Date().toISOString();
    p[`v13:speaking:${lang}:${id}`]={status:'done',score:100,updated_at:now}; setProg(lang,p);
  }

  function injectTopSummary(lang,course,all){
    const c=document.getElementById('courseChooser');
    const done=all.filter(x=>isDoneV19(lang,x.id)).length, pct=Math.round(done/all.length*100);
    c.innerHTML=`
      <div class="speak-card">
        <span class="eyebrow">${course.flag} ${course.label} · 造句与口语</span>
        <h1>${esc(course.title)}</h1>
        <p class="page-lead">${esc(course.desc)}</p>
        <div class="speak-steps">
          <span class="speak-step-pill">词</span><span class="speak-step-pill">短语</span>
          <span class="speak-step-pill">完整句</span><span class="speak-step-pill">换词</span>
          <span class="speak-step-pill">提问 / 否定</span><span class="speak-step-pill">自己说</span>
        </div>
        <div style="margin-top:18px">
          <strong>完成进度：${done} / ${all.length}</strong>
          <strong style="float:right">${pct}%</strong>
          <div class="lesson-progress"><i style="width:${pct}%"></i></div>
        </div>
      </div>
      <div class="speak-card">
        <span class="eyebrow">闯关规则</span>
        <h2>一个模块学完，再用测试决定下一步。</h2>
        <p>每个模块必须完成全部小课，再参加模块测试；答对 <strong>70% 以上</strong>才算通过。第 2 模块起必须注册 / 登录。</p>
        <p class="speak-footer-note">${window.__speakingUser ? `当前账号：${esc(window.__speakingUser.email||'已登录')}` : '当前为游客：第 1 模块可以先体验。'}</p>
      </div>`;
  }

  function renderModuleCards(lang,course,all){
    const host=document.getElementById('courseContent');
    host.innerHTML='';
    const shell=document.createElement('div');
    shell.className='speak-card';
    shell.innerHTML=`
      <span class="eyebrow">课程模块</span>
      <h2>按模块学习，70% 通过后再进入下一模块。</h2>
      <p class="page-lead">完成模块全部小课后才会出现该模块考试。第 2 模块及以后需要注册 / 登录；通过上一模块考试后才能继续。</p>
      <div id="v19Modules" class="module-list"></div>`;
    host.appendChild(shell);

    const modulesRoot=shell.querySelector('#v19Modules');
    course.modules.forEach((m,mi)=>{
      const no=m[0], title=m[1];
      const ls=all.filter(x=>x.module===no);
      const d=ls.filter(x=>isDoneV19(lang,x.id)).length;
      const isUnlocked=unlocked(lang,course,mi);
      const isComplete=d===ls.length;
      const isPassed=passed(lang,no);
      const sc=score(lang,no);
      let status='';
      if(isPassed) status=`<span class="v19-status">✓ 已通过 ${sc}%</span>`;
      else if(!isUnlocked && mi>=1 && !window.__speakingUser) status=`<span class="v19-status login">🔐 登录后解锁</span>`;
      else if(!isUnlocked) status=`<span class="v19-status lock">🔒 等待上一模块 70% 考试</span>`;
      else if(isComplete) status=`<span class="v19-status">已完成，等待考试</span>`;
      else status=`<span class="v19-status">学习中</span>`;

      const card=document.createElement('div');
      card.className=`v19-gate-card ${isPassed?'passed':''}`;
      card.innerHTML=`
        <div class="v19-module-head">
          <div>
            <span class="eyebrow">第 ${no} 模块</span>
            <h3 style="margin:5px 0">${esc(title)}</h3>
            <div class="v19-meta"><span>${d}/${ls.length} 课完成</span><span>${Math.round(d/ls.length*100)}%</span></div>
          </div>${status}
        </div>
        <div class="v19-progress"><i style="width:${Math.round(d/ls.length*100)}%"></i></div>
        <div class="speak-actions">
          ${
            isPassed
            ? `<button class="ghost-btn v19-open-module">复习本模块 →</button>`
            : !isUnlocked
              ? (mi>=1 && !window.__speakingUser ? `<button class="audio-large v19-login">注册 / 登录后继续 →</button>` : `<button class="ghost-btn" disabled>等待上一模块通过</button>`)
              : isComplete
                ? `<button class="module-test-btn v19-start-test">参加模块考试 →</button>`
                : `<button class="audio-large v19-open-module">继续学习 →</button>`
          }
        </div>
        <div class="v19-test-wrap"></div>`;
      modulesRoot.appendChild(card);

      const open=card.querySelector('.v19-open-module');
      if(open) open.onclick=()=>openModuleLessons(lang,course,all,mi);
      const lg=card.querySelector('.v19-login'); if(lg)lg.onclick=login;
      const test=card.querySelector('.v19-start-test'); if(test)test.onclick=()=>runModuleTest(lang,course,all,mi,card.querySelector('.v19-test-wrap'),null);
    });

    // Start by showing the first not-finished accessible module.
    const first=course.modules.findIndex((m,mi)=>unlocked(lang,course,mi) && (!completed(lang,course,m[0]) || !passed(lang,m[0])));
    const startIndex=first>=0?first:course.modules.length-1;
    openModuleLessons(lang,course,all,startIndex);
  }

  function openModuleLessons(lang,course,all,mi){
    const host=document.getElementById('moduleGateNotice');
    const m=course.modules[mi], no=m[0], ls=all.filter(x=>x.module===no);
    if(mi>=1 && !window.__speakingUser){host.innerHTML=`
      <div class="login-gate"><span class="eyebrow">第 2 模块起需要账号</span><h2>先注册 / 登录，再继续学习</h2><p>第 1 模块可以先体验。登录后会保存你的学习进度和模块考试成绩，以后重新打开网站可以继续。</p><div class="detail-actions"><button class="primary-btn" id="v19GateLogin">注册 / 登录</button></div></div>`;
      host.querySelector('#v19GateLogin').onclick=login;
      host.scrollIntoView({behavior:'smooth',block:'start'});
      return;
    }
    if(!unlocked(lang,course,mi)){return;}
    host.innerHTML=`
      <div class="v19-gate-card">
        <div class="v19-module-head"><div><span class="eyebrow">正在学习</span><h2>第 ${no} 模块 · ${esc(m[1])}</h2></div><span class="v19-status">${completed(lang,course,no)&&!passed(lang,no)?'可以参加考试':'按顺序学习'}</span></div>
        <p class="page-lead">${ls.filter(x=>isDoneV19(lang,x.id)).length}/${ls.length} 课完成；上一课完成后才开放下一课。</p>
        <div class="v19-lesson-list" id="v19LessonList"></div>
      </div>
      <div id="v19ActiveLesson"></div>`;
    const list=host.querySelector('#v19LessonList');
    ls.forEach((l,li)=>{
      const done=isDoneV19(lang,l.id);
      const unlockedLesson=li===0 || ls.slice(0,li).every(x=>isDoneV19(lang,x.id));
      const row=document.createElement('div');
      row.className=`v19-lesson-row ${done?'done':''} ${(!unlockedLesson||!unlocked(lang,course,mi))?'locked':''}`;
      row.innerHTML=`
        <div class="v19-num">${done?'✓':String(li+1).padStart(2,'0')}</div>
        <div><strong>${esc(l.title)}</strong><div class="v19-small">${esc(l.target)}</div></div>
        <div class="v19-row-action">${done?'已完成 ✓':unlockedLesson?'开始 →':'🔒'}</div>`;
      if(unlockedLesson || done) row.onclick=()=>showLesson(lang,course,all,mi,li,host.querySelector('#v19ActiveLesson'));
      list.appendChild(row);
    });
    const testBox=host.querySelector('#v19ActiveLesson');
    if(completed(lang,course,no) && !passed(lang,no)){
      testBox.innerHTML=`<div class="v19-gate-card"><span class="eyebrow">模块考试</span><h3>第 ${no} 模块已全部完成</h3><p>答对 70% 以上，才可以进入下一模块。</p><button class="module-test-btn" id="v19TakeTest">参加模块考试 →</button></div>`;
      testBox.querySelector('#v19TakeTest').onclick=()=>runModuleTest(lang,course,all,mi,testBox,null);
    }
    host.scrollIntoView({behavior:'smooth',block:'start'});
  }

  function showLesson(lang,course,all,mi,li,host){
    const ls=all.filter(x=>x.module===course.modules[mi][0]), l=ls[li], stepNo=1;
    host.innerHTML=`
      <div class="ladder-card">
        <div class="lesson-top"><div><span class="eyebrow">第 ${l.module} 模块 · ${esc(l.moduleTitle)}</span><h2>${esc(l.title)}</h2></div><span>第 ${li+1} / ${ls.length} 课</span></div>
        <div class="lesson-progress"><i style="width:${Math.round((li+1)/ls.length*100)}%"></i></div>
        <span class="ladder-badge">${li===0?'先认识':'逐步组合'}</span>
        <div class="ladder-cn">${esc(l.zh)}</div>
        <div class="ladder-target" lang="${lang==='kk'?'kk':'ru'}">${esc(l.target)}</div>
        <div class="speak-actions">
          <button class="audio-large" id="v19Play">🔊 听${course.label}</button>
          <button class="ghost-btn" id="v19Done">${isDoneV19(lang,l.id)?'已完成':'记住了，下一课'}</button>
        </div>
        <p class="ladder-note">${esc(l.note)}</p>
        <div class="challenge">
          <div class="challenge-row"><div><span class="eyebrow">自己说</span><div class="challenge-target">${esc(l.zh)}</div></div>
          <button class="ghost-btn" id="v19Answer">看参考答案</button></div>
          <div id="v19AnswerBox" class="hidden-answer"><strong>${esc(l.target)}</strong> <button class="ghost-btn" id="v19Play2">🔊</button></div>
        </div>
      </div>`;
    host.querySelector('#v19Play').onclick=()=>window.speakTarget?window.speakTarget(l.target,course.language):speakFallback(l.target,course.language);
    host.querySelector('#v19Done').onclick=async()=>{
      await saveLessonV19(lang,l.id);
      openModuleLessons(lang,course,all,mi);
      if(completed(lang,course,l.module) && !passed(lang,l.module)){
        setTimeout(()=>{
          const active=document.getElementById('v19ActiveLesson');
          if(active) { active.innerHTML=`<div class="v19-gate-card"><span class="eyebrow">模块考试</span><h3>第 ${l.module} 模块已全部完成</h3><p>答对 70% 以上才能进入下一模块。</p><button class="module-test-btn" id="v19AutoTest">参加模块考试 →</button></div>`; active.querySelector('#v19AutoTest').onclick=()=>runModuleTest(lang,course,all,mi,active,null); }
        },60);
      }
    };
    host.querySelector('#v19Answer').onclick=()=>host.querySelector('#v19AnswerBox').style.display='block';
    host.querySelector('#v19Play2').onclick=()=>window.speakTarget?window.speakTarget(l.target,course.language):speakFallback(l.target,course.language);
    host.scrollIntoView({behavior:'smooth',block:'start'});
  }

  function speakFallback(text,lang){
    if(!('speechSynthesis' in window)){alert('当前浏览器不支持语音朗读');return;}
    speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=lang;u.rate=.84;speechSynthesis.speak(u);
  }

  function runModuleTest(lang,course,all,mi,wrap){
    const m=course.modules[mi], no=m[0], ls=all.filter(x=>x.module===no);
    if(mi>=1 && !window.__speakingUser){if(wrap)wrap.innerHTML=`<div class="login-gate"><h2>第 2 模块起需要注册 / 登录</h2><p>登录后才能参加模块考试。</p><button class="primary-btn" id="v19LoginTest">注册 / 登录</button></div>`; const b=document.getElementById('v19LoginTest');if(b)b.onclick=login;return;}
    if(!completed(lang,course,no)){if(wrap)wrap.innerHTML=`<div class="v19-gate-card"><h3>先完成本模块全部 ${ls.length} 课</h3></div>`;return;}
    const qs=buildQuestions(ls).slice(0,7), state={i:0,correct:0,answers:[]};
    if(!wrap){wrap=document.createElement('div');document.getElementById('moduleGateNotice').appendChild(wrap);}
    drawQuestion(state,qs,wrap,lang,course,no,mi,all);
    wrap.scrollIntoView({behavior:'smooth',block:'start'});
  }

  function buildQuestions(ls){
    return ls.map((l,i)=>{
      if(i%2===0){
        const opts=shuffle([l.target,...ls.filter(x=>x.id!==l.id).slice(0,3).map(x=>x.target)]);
        return {kind:'target',question:l.zh,answer:l.target,options:opts,source:l.target};
      }else{
        const opts=shuffle([l.zh,...ls.filter(x=>x.id!==l.id).slice(0,3).map(x=>x.zh)]);
        return {kind:'meaning',question:l.target,answer:l.zh,options:opts,source:l.target};
      }
    });
  }
  function shuffle(a){return a.map(x=>[Math.random(),x]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);}
  function drawQuestion(state,qs,wrap,lang,course,no,mi,all){
    const q=qs[state.i];
    wrap.innerHTML=`
      <div class="module-test-card">
        <div class="lesson-top"><div><span class="eyebrow">第 ${no} 模块考试</span><h2>答对 70% 才能解锁下一模块</h2></div><span>${state.i+1} / ${qs.length}</span></div>
        <div class="lesson-progress"><i style="width:${Math.round((state.i+1)/qs.length*100)}%"></i></div>
        <div class="test-prompt"><span class="eyebrow">${q.kind==='target'?'请选择正确的目标语言':'这句话是什么意思？'}</span><h3 lang="${q.kind==='meaning'?(lang==='kk'?'kk':'ru'):''}">${esc(q.question)}</h3>${q.kind==='meaning'?`<button class="round-sound" id="v19QAudio">🔊 听${course.label}</button>`:''}</div>
        <div class="module-options">
          ${q.options.map((opt,i)=>`<button class="module-option" data-i="${i}"><span>${String.fromCharCode(65+i)}.</span><strong ${q.kind==='target'?`lang="${lang==='kk'?'kk':'ru'}"`:''}>${esc(opt)}</strong>${q.kind==='target'?`<button type="button" class="option-audio" data-text="${esc(opt)}">🔊</button>`:''}</button>`).join('')}
        </div>
        <div id="v19Feedback" class="module-feedback"></div>
        <div class="speak-actions"><button class="ghost-btn" id="v19Next" disabled>下一题 →</button></div>
      </div>`;
    const qa=wrap.querySelector('#v19QAudio'); if(qa)qa.onclick=()=>speakFallback(q.source,course.language);
    wrap.querySelectorAll('.option-audio').forEach(b=>b.onclick=e=>{e.stopPropagation();speakFallback(b.dataset.text,course.language);});
    let answered=false;
    wrap.querySelectorAll('.module-option').forEach(btn=>btn.onclick=()=>{
      if(answered)return; answered=true;
      const val=q.options[Number(btn.dataset.i)], ok=val===q.answer;
      wrap.querySelectorAll('.module-option').forEach(x=>{x.disabled=true;if(q.options[Number(x.dataset.i)]===q.answer)x.classList.add('correct')});
      if(ok){state.correct++;btn.classList.add('correct');wrap.querySelector('#v19Feedback').textContent='回答正确！';}
      else {btn.classList.add('wrong');wrap.querySelector('#v19Feedback').textContent=`回答错误，正确答案：${q.answer}`;}
      state.answers.push({question:q.question,selected:val,correct:ok});
      wrap.querySelector('#v19Next').disabled=false;
    });
    wrap.querySelector('#v19Next').onclick=async()=>{
      if(!answered)return;
      if(state.i<qs.length-1){state.i++;drawQuestion(state,qs,wrap,lang,course,no,mi,all);}
      else{
        const pct=Math.round(state.correct/qs.length*100), ok=pct>=70;
        await saveModuleResult(lang,no,pct,ok,state.answers);
        wrap.innerHTML=`
          <div class="v19-gate-card" style="text-align:center">
            <span class="eyebrow">${ok?'模块通过':'需要再练一次'}</span>
            <h2>${pct}%</h2>
            <p>${ok?'通过！下一模块已经解锁。':'至少需要 70%，回去复习本模块后再测试。'}</p>
            <div class="speak-actions" style="justify-content:center">
              ${ok
                ? (mi<course.modules.length-1?`<button class="audio-large" id="v19NextModule">进入下一模块 →</button>`:`<button class="ghost-btn" id="v19ReviewAll">返回模块列表 →</button>`)
                : `<button class="audio-large" id="v19Retry">重新测试 →</button>`}
            </div>
          </div>`;
        const nm=wrap.querySelector('#v19NextModule'); if(nm)nm.onclick=()=>renderV19(lang,course);
        const rv=wrap.querySelector('#v19ReviewAll'); if(rv)rv.onclick=()=>renderV19(lang,course);
        const rt=wrap.querySelector('#v19Retry'); if(rt)rt.onclick=()=>runModuleTest(lang,course,all,mi,wrap);
      }
    };
  }

  function renderV19(lang,course){
    const all=allLessons(course);
    injectTopSummary(lang,course,all);
    renderModuleCards(lang,course,all);
  }

  function bootV19(){
    const lang=new URLSearchParams(location.search).get('lang');
    if(lang!=='kk'&&lang!=='ru') return;
    const doIt=()=>{
      const c=courseData(lang);
      if(!c)return;
      // Wait a tick so the existing V13 renderer finishes, then replace it with V19.
      setTimeout(()=>renderV19(lang,c),50);
    };
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',doIt,{once:true});
    else doIt();
  }
  bootV19();
})();