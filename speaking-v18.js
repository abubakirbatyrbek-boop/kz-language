/* V18 speaking-course UI enhancement.
   Uses the existing SPEAKING_COURSES and speaking.js logic.
   It does not remove the existing lesson content; it adds an explicit module-gate area.
*/
(function(){
  function esc(s){return String(s??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]));}
  function getLang(){const l=new URLSearchParams(location.search).get('lang');return l==='ru'?'ru':'kk';}
  function getCourse(){return window.SPEAKING_COURSES?.[getLang()]||null;}
  function key(k){return `v13_speaking_${k}_${window.__speakingUser?.id||'guest'}`;}
  function progress(lang){try{return JSON.parse(localStorage.getItem(key(lang))||'{}')}catch{return{}}}
  function done(lang,id){return progress(lang)[`v13:speaking:${lang}:${id}`]?.status==='done';}
  function passed(lang,no){return progress(lang)[`v14:speaking-test:${lang}:${no}`]?.status==='passed';}
  function score(lang,no){return Number(progress(lang)[`v14:speaking-test:${lang}:${no}`]?.score||0)}
  function moduleData(c,m){return m[2].map((x,i)=>({module:m[0],moduleTitle:m[1],index:i,title:x[0],step:x[1],target:x[2],note:x[3],id:`${m[0]}-${i+1}`}));}
  function moduleDone(lang,m){return moduleData(getCourse(),m).every(x=>done(lang,x.id));}
  function login(){
    const next=encodeURIComponent(location.pathname.split('/').pop()+location.search);
    location.href=`auth.html?mode=login&next=${next}`;
  }
  function renderGate(){
    const host=document.getElementById('v18ModuleGate'); if(!host) return;
    const c=getCourse(); if(!c) return;
    const lang=c.key;
    const mods=c.modules;
    host.innerHTML=`
      <div class="v18-rules">
        <div><span class="v18-eyebrow">闯关规则</span><h2>学完一个模块，再参加模块考试</h2><p>每个模块的全部小课完成后才能参加考试。考试答对 <strong>70% 以上</strong> 才能进入下一模块。</p></div>
        <div class="v18-rule-chips"><span>① 完成模块</span><span>② 模块考试</span><span>③ ≥70% 通过</span><span>④ 下一模块解锁</span><span>⑤ 第2模块起需登录</span></div>
      </div>
      <div class="v18-module-stack">
      ${mods.map((m,mi)=>{
        const items=moduleData(c,m); const d=items.filter(x=>done(lang,x.id)).length; const complete=d===items.length; const p=passed(lang,m[0]); const sc=score(lang,m[0]);
        const loginRequired=mi>=1 && !window.__speakingUser;
        const previousPassed=mi===0 ? true : passed(lang,mods[mi-1][0]);
        let stateTitle='未开始', stateText=''; let action='';
        if(loginRequired){
          stateTitle='🔐 注册 / 登录后继续'; stateText='第 2 模块开始需要账号。登录后学习进度和考试成绩会保存。'; action='<button class="v18-btn primary" data-v18-login>注册 / 登录 →</button>';
        } else if(!previousPassed){
          stateTitle='🔒 等待上一模块考试通过'; stateText=`先完成第 ${mods[mi-1][0]} 模块并通过 70% 考试。`; action='<button class="v18-btn" disabled>等待解锁</button>';
        } else if(!complete){
          stateTitle=`进行中 · ${d}/${items.length} 课`; stateText='按顺序完成本模块全部小课后，考试按钮会自动出现。'; action=`<button class="v18-btn" data-v18-go data-mi="${mi}" data-li="${Math.max(0,items.findIndex(x=>!done(lang,x.id)))}">继续学习 →</button>`;
        } else if(!p){
          stateTitle='✅ 本模块已完成，等待考试'; stateText='全部小课已经完成，现在参加模块考试。'; action=`<button class="v18-btn primary" data-v18-test data-mi="${mi}">参加模块考试 →</button>`;
        } else {
          stateTitle=`✅ 已通过 · ${sc}%`; stateText='可以继续下一模块，也可以回来复习本模块。'; action=`<button class="v18-btn" data-v18-go data-mi="${mi}" data-li="0">复习本模块 →</button>`;
        }
        const pct=Math.round(d/items.length*100);
        return `<section class="v18-module ${p?'passed':''} ${(!previousPassed||loginRequired)?'locked':''}">
          <div class="v18-module-head"><div><span class="v18-no">${m[0]}</span><div class="v18-module-title"><span>模块 ${m[0]}</span><h3>${esc(m[1])}</h3></div></div><div class="v18-state">${stateTitle}</div></div>
          <div class="v18-progress"><span style="width:${pct}%"></span></div>
          <div class="v18-module-foot"><p>${esc(stateText)}</p><div class="v18-actions">${action}</div></div>
          <div class="v18-exam-note"><strong>模块考试：70% 过关</strong><span>${complete ? (p ? '已通过' : '已完成小课，可考试') : `还需完成 ${items.length-d} 课`}</span></div>
        </section>`;
      }).join('')}
      </div>`;
    host.onclick=function(e){
      if(e.target.closest('[data-v18-login]')){login();return;}
      const c=getCourse(), all=window.allSpeakingLessons?window.allSpeakingLessons(c):c.modules.flatMap(m=>moduleData(c,m));
      const go=e.target.closest('[data-v18-go]');
      if(go && window.startLesson){const mi=Number(go.dataset.mi),li=Number(go.dataset.li),ls=moduleData(c,c.modules[mi]),target=ls[li]||ls[0];const idx=all.findIndex(x=>x.id===target.id); if(idx>=0) window.startLesson(c,all,idx,0); return;}
      const test=e.target.closest('[data-v18-test]');
      if(test && window.renderModuleTest){window.renderModuleTest(c,all,Number(test.dataset.mi));}
    };
  }
  function inject(){
    const content=document.getElementById('courseContent'); if(!content||document.getElementById('v18ModuleGate')) return;
    const box=document.createElement('div'); box.id='v18ModuleGate'; box.className='v18-wrap';
    content.insertBefore(box,content.firstChild);
    renderGate();
  }
  document.addEventListener('DOMContentLoaded',()=>{setTimeout(()=>{inject();renderGate()},100);});
  const observer=new MutationObserver(()=>{if(document.getElementById('v18ModuleGate')) renderGate(); else inject();});
  observer.observe(document.documentElement,{subtree:true,childList:true});
})();
