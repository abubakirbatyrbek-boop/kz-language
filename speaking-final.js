
/* Final speaking course gate.
   Reads the existing SPEAKING_COURSES from speaking.js directly.
   Do not replace speaking.js.
*/
(function(){
  'use strict';

  const GROUPS=[
    {no:1,title:'口语起步',desc:'从我、你、他开始，把最基本的口语一步一步说出来。',mods:[0]},
    {no:2,title:'基础表达',desc:'地点、有没有、动作：开始把简单句真正说完整。',mods:[1,2,3]},
    {no:3,title:'高频交流',desc:'时间、需要、提问、补救：解决日常交流中的常见问题。',mods:[4,5,6,7]},
    {no:4,title:'实用场景',desc:'商店、餐厅、出行与工作，把学过的句子带到真实场景。',mods:[8,9]}
  ];
  const PASS=70;
  const $=(s,r=document)=>r.querySelector(s);
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function langNow(){const l=new URLSearchParams(location.search).get('lang');return l==='kk'||l==='ru'?l:null;}
  function course(){const l=langNow();return l?SPEAKING_COURSES[l]:null;}
  function lessonList(c){return c.modules.flatMap((m,mi)=>m[2].map((x,i)=>({id:`${m[0]}-${i+1}`,mi,mno:m[0],title:x[0],zh:x[1],target:x[2],note:x[3]})));}
  function storeKey(lang,uid){return `v13_speaking_${lang}_${uid||'guest'}`;}
  function read(lang){try{return JSON.parse(localStorage.getItem(storeKey(lang,window.__speakingUser?.id))||'{}')}catch{return{}}}
  function write(lang,s){localStorage.setItem(storeKey(lang,window.__speakingUser?.id),JSON.stringify(s));}
  function done(lang,id){return read(lang)[`v13:speaking:${lang}:${id}`]?.status==='done';}
  function testKey(lang,no){return `speaking-v22:${lang}:m${no}`;}
  function test(lang,no){return read(lang)[testKey(lang,no)]||null;}
  function passed(lang,no){const t=test(lang,no);return !!(t&&t.passed&&Number(t.score)>=PASS);}
  function migrateGuest(lang){
    if(!window.__speakingUser)return;
    try{
      const g=JSON.parse(localStorage.getItem(storeKey(lang,null))||'{}'),a=read(lang);
      let ch=false;
      for(const [k,v] of Object.entries(g)){if(!a[k]){a[k]=v;ch=true}}
      if(ch)write(lang,a);
    }catch{}
  }
  async function syncTests(lang){
    const c=window.__speakingSupabase,u=window.__speakingUser;if(!c||!u)return;
    try{
      const {data}=await c.from('test_results').select('node_id,score,passed,created_at').eq('user_id',u.id).like('node_id',`speaking-v22:${lang}:m%`).order('created_at',{ascending:false}).limit(100);
      const s=read(lang);(data||[]).forEach(r=>{const m=String(r.node_id).match(/:m(\d+)$/);if(!m)return;const k=testKey(lang,m[1]);if(!s[k]||Number(r.score)>Number(s[k].score))s[k]={score:Number(r.score),passed:!!r.passed}});write(lang,s);
    }catch(e){console.warn('speaking test sync failed',e)}
  }
  async function saveTest(lang,no,score){
    const s=read(lang);s[testKey(lang,no)]={score,passed:score>=PASS,at:new Date().toISOString()};write(lang,s);
    const c=window.__speakingSupabase,u=window.__speakingUser;if(c&&u){try{await c.from('test_results').insert({user_id:u.id,node_id:testKey(lang,no),language:lang,score,passed:score>=PASS,answers:[]})}catch(e){console.warn(e)}}
  }
  function speak(text,lang){if(window.speakTarget){window.speakTarget(text,lang);return}if(window.speechSynthesis){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=lang;u.rate=.84;speechSynthesis.speak(u);}}
  function login(){location.href=`auth.html?mode=signup&next=${encodeURIComponent(location.href)}`;}
  function groupLessons(c,gi){return GROUPS[gi].mods.flatMap(mi=>lessonList(c).filter(x=>x.mi===mi));}
  function complete(c,lang,gi){const ls=groupLessons(c,gi);return ls.length>0&&ls.every(l=>done(lang,l.id));}
  function open(lang,gi){if(gi===0)return true;return !!window.__speakingUser&&passed(lang,gi);}
  function injectStyles(){
    if($('#speaking-v22-style'))return;
    const st=document.createElement('style');st.id='speaking-v22-style';st.textContent=`
      .sp-v22-hero{display:grid;grid-template-columns:1.35fr .85fr;gap:18px}.sp-v22-card,.sp-v22-group,.sp-v22-active,.sp-v22-test{border:1px solid #dfe7e3;border-radius:22px;background:#fff;padding:22px;box-shadow:0 10px 30px rgba(20,55,43,.05);margin-bottom:16px}
      .sp-v22-pills{display:flex;flex-wrap:wrap;gap:7px;margin:14px 0}.sp-v22-pills span{border:1px solid #dfe7e3;border-radius:999px;padding:6px 10px;font-size:12px;color:#385449;background:#fafcfb}
      .sp-v22-total{display:flex;justify-content:space-between;font-size:12px;color:#687971}.sp-v22-bar{height:8px;background:#edf2ef;border-radius:999px;overflow:hidden;margin:8px 0 15px}.sp-v22-bar i{display:block;height:100%;background:#0e4a37;border-radius:inherit}
      .sp-v22-group.locked{opacity:.62;background:#fbfcfb}.sp-v22-group.passed{border-color:#b8d7c8;background:#f8fcfa}.sp-v22-head{display:flex;justify-content:space-between;gap:16px;align-items:flex-start}.sp-v22-head h2{margin:5px 0}.sp-v22-status{font-size:12px;font-weight:800;padding:6px 10px;border-radius:999px;background:#eef6f1;color:#18543c;white-space:nowrap}.sp-v22-status.login{background:#fff7e8;color:#89651f}.sp-v22-status.lock{background:#f1f3f2;color:#7c8580}
      .sp-v22-stats{display:flex;justify-content:space-between;font-size:12px;color:#687971}.sp-v22-lessons{display:grid;grid-template-columns:1fr 1fr;gap:8px}.sp-v22-lesson{display:grid;grid-template-columns:30px 1fr;gap:9px;align-items:center;border:1px solid #dfe7e3;border-radius:14px;background:#fff;padding:11px 12px;text-align:left;cursor:pointer}.sp-v22-lesson.locked{opacity:.45;cursor:not-allowed}.sp-v22-lesson.done{background:#f8fcfa;border-color:#c0dacd}.sp-v22-lesson .num{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;background:#eff5f1;color:#18543c;font-size:11px;font-weight:800}.sp-v22-lesson b{display:block;font-size:13px}.sp-v22-lesson small{display:block;color:#77867f;font-size:11px;margin-top:3px}
      .sp-v22-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:13px}.sp-v22-gate{max-width:720px;margin:18px auto;text-align:center;padding:32px 22px;border:1px solid #dbe5df;border-radius:22px;background:#fff}.sp-v22-gate h2{margin:8px 0}.sp-v22-gate p{color:#687770;line-height:1.75}
      .sp-v22-test h2{margin:6px 0 8px}.sp-v22-question{border-top:1px solid #e4ebe7;padding-top:16px;margin-top:14px}.sp-v22-question h3{font-size:30px;line-height:1.35}.sp-v22-options{display:grid;gap:9px}.sp-v22-option{border:1px solid #dfe7e3;border-radius:14px;padding:14px 15px;background:#fff;text-align:left;cursor:pointer}.sp-v22-option.correct{background:#edf8f3;border-color:#70b59a}.sp-v22-option.wrong{background:#fff2f2;border-color:#d89c9c}.sp-v22-feedback{min-height:22px;margin:10px 0;font-weight:800;color:#50645c}.sp-v22-score{font-size:58px;font-weight:900;color:#123f2d;text-align:center}
      @media(max-width:760px){.sp-v22-hero{grid-template-columns:1fr}.sp-v22-head{flex-direction:column}.sp-v22-lessons{grid-template-columns:1fr}.sp-v22-status{white-space:normal}}
    `;document.head.appendChild(st);
  }

  async function boot(){
    const lang=langNow(),c=course();if(!lang||!c)return;
    if(window.initSpeakingUser)await window.initSpeakingUser();
    migrateGuest(lang);await syncTests(lang);injectStyles();
    const all=lessonList(c),gs=GROUPS.map((g,gi)=>({g,gi,ls:groupLessons(c,gi),done:groupLessons(c,gi).filter(l=>done(lang,l.id)).length}));
    const total=gs.reduce((n,x)=>n+x.ls.length,0),dc=gs.reduce((n,x)=>n+x.done,0),pct=Math.round(dc/(total||1)*100);

    $('#courseChooser').innerHTML=`<div class="sp-v22-hero"><div class="sp-v22-card"><span class="eyebrow">${c.flag} ${esc(c.label)} · 零基础造句与口语</span><h1>${esc(c.title)}</h1><p>${esc(c.desc)}</p><div class="sp-v22-pills"><span>词</span><span>短语</span><span>完整句</span><span>换词</span><span>提问 / 否定</span><span>自己说</span></div><div class="sp-v22-total"><strong>完成进度：${dc} / ${total}</strong><strong>${pct}%</strong></div><div class="sp-v22-bar"><i style="width:${pct}%"></i></div></div><div class="sp-v22-card"><span class="eyebrow">闯关规则</span><h2>模块完成后考试</h2><p>每个模块完成全部小课后参加考试，答对 <strong>70% 以上</strong>才通过。第 2 模块开始必须注册 / 登录。</p><p class="sp-v22-note">${window.__speakingUser?'已登录：学习进度和考试成绩会保存。':'模块 1 可直接体验。'}</p></div></div>`;

    $('#courseContent').innerHTML='<div id="spV22Groups"></div><div id="spV22Active"></div>';
    const root=$('#spV22Groups');

    gs.forEach(x=>{
      const {g,gi,ls,done:dc}=x,p=Math.round(dc/(ls.length||1)*100),isOpen=open(lang,gi),pass=passed(lang,g.no),t=test(lang,g.no);
      const sec=document.createElement('section');sec.className=`sp-v22-group ${!isOpen?'locked':''} ${pass?'passed':''}`;
      const status=pass?`✓ 已通过 ${t.score}%`:(!isOpen&&gi>0&&!window.__speakingUser?'🔐 第 2 模块起需注册 / 登录':(!isOpen?'🔒 等待上一模块 ≥70%':'🟢 已开放'));
      sec.innerHTML=`<div class="sp-v22-head"><div><span class="eyebrow">模块 ${String(g.no).padStart(2,'0')}</span><h2>${esc(g.title)}</h2><p>${esc(g.desc)}</p></div><span class="sp-v22-status ${(!isOpen&&gi>0&&!window.__speakingUser)?'login':(!isOpen?'lock':'')}">${status}</span></div><div class="sp-v22-stats"><span>${dc} / ${ls.length} 小课完成</span><span>${p}%</span></div><div class="sp-v22-bar"><i style="width:${p}%"></i></div><div class="sp-v22-lessons"></div><div class="sp-v22-actions"></div>`;
      const lr=sec.querySelector('.sp-v22-lessons'),ar=sec.querySelector('.sp-v22-actions');
      ls.forEach((l,i)=>{
        const avail=isOpen&&(i===0||ls.slice(0,i).every(y=>done(lang,y.id))),btn=document.createElement('button');btn.type='button';btn.className=`sp-v22-lesson ${done(lang,l.id)?'done':''} ${!avail&&!done(lang,l.id)?'locked':''}`;btn.innerHTML=`<span class="num">${done(lang,l.id)?'✓':String(i+1).padStart(2,'0')}</span><span><b>${esc(l.title)}</b><small>${esc(l.target)}</small></span>`;
        btn.onclick=()=>{if(!avail){if(gi>0&&!window.__speakingUser)login();return;}showLesson(lang,c,gi,i,ls);};lr.appendChild(btn);
      });
      if(!isOpen){ar.innerHTML=gi>0&&!window.__speakingUser?`<button class="audio-large spLogin">🔐 注册 / 登录后继续</button>`:`<button class="ghost-btn" disabled>🔒 等待上一模块通过</button>`;if(sec.querySelector('.spLogin'))sec.querySelector('.spLogin').onclick=login;}
      else if(dc===ls.length&&!pass){ar.innerHTML='<button class="audio-large spTest">参加模块考试 →</button>';sec.querySelector('.spTest').onclick=()=>runTest(lang,c,gi,ls);}
      else if(pass){ar.innerHTML=`<span class="ghost-btn">模块考试 ${t.score}% · 已通过</span>`;}
      else ar.innerHTML='<span class="ghost-btn">按顺序完成小课</span>';
      const rule=document.createElement('div');rule.className='sp-v22-card';rule.style.margin='13px 0 0';rule.style.boxShadow='none';rule.style.padding='13px 14px';rule.innerHTML=pass?'已通过，可以复习。':(dc===ls.length&&isOpen?'本模块已全部完成。参加考试，答对 ≥70% 才能进入下一模块。':(!isOpen&&gi>0&&!window.__speakingUser?'第 2 模块开始需要注册 / 登录。登录后会保存进度。':'上一课完成后才开放下一课。'));sec.appendChild(rule);root.appendChild(sec);
    });

    const first=gs.findIndex(x=>open(lang,x.gi)&&!passed(lang,x.g.no)); if(first>=0) showGroup(lang,c,first,gs[first].ls); else showGroup(lang,c,0,gs[0].ls);
  }

  function showGroup(lang,c,gi,ls){
    const a=$('#spV22Active');if(!a)return;
    if(gi>0&&!window.__speakingUser){a.innerHTML=`<div class="sp-v22-gate"><span class="eyebrow">🔐 第 2 模块开始</span><h2>注册 / 登录后继续</h2><p>第 1 模块可以直接体验；完成第 1 模块并通过 70% 考试后，注册 / 登录才能打开第 2 模块。</p><button class="audio-large" id="spGateLogin">注册 / 登录 →</button></div>`;$('#spGateLogin').onclick=login;return;}
    const next=ls.findIndex(l=>!done(lang,l.id));
    if(next>=0)showLesson(lang,c,gi,next,ls);else if(!passed(lang,GROUPS[gi].no))showTestBox(lang,c,gi,ls);
  }
  function showLesson(lang,c,gi,li,ls){
    const a=$('#spV22Active'),l=ls[li];
    a.innerHTML=`<div class="sp-v22-active"><div class="sp-v22-head"><div><span class="eyebrow">模块 ${String(GROUPS[gi].no).padStart(2,'0')} · ${esc(GROUPS[gi].title)}</span><h2>${esc(l.title)}</h2></div><span>第 ${li+1} / ${ls.length} 课</span></div><div class="sp-v22-bar"><i style="width:${Math.round((li+1)/ls.length*100)}%"></i></div><div class="ladder-cn">${esc(l.zh)}</div><div class="ladder-target" lang="${lang==='kk'?'kk':'ru'}">${esc(l.target)}</div><div class="sp-v22-actions"><button class="audio-large" id="spPlay">🔊 听${esc(c.label)}</button><button class="ghost-btn" id="spDone">${done(lang,l.id)?'已完成':'记住了，下一课'}</button></div><p>${esc(l.note||'先听发音，再跟读，然后自己说一遍。')}</p><div class="challenge"><div class="challenge-row"><div><span class="eyebrow">自己说</span><div class="challenge-target">${esc(l.title)}</div></div><button class="ghost-btn" id="spAnswer">看参考答案</button></div><div id="spAnswerBox" style="display:none;margin-top:8px"><strong lang="${lang==='kk'?'kk':'ru'}">${esc(l.target)}</strong> <button class="ghost-btn" id="spPlay2">🔊</button></div></div></div>`;
    $('#spPlay').onclick=()=>speak(l.target,c.language);$('#spAnswer').onclick=()=>$('#spAnswerBox').style.display='block';$('#spPlay2').onclick=()=>speak(l.target,c.language);
    $('#spDone').onclick=async()=>{if(!done(lang,l.id)&&window.saveSpeakingLesson)await window.saveSpeakingLesson(lang,l.id);boot();};
    a.scrollIntoView({behavior:'smooth',block:'start'});
  }
  function showTestBox(lang,c,gi,ls){const a=$('#spV22Active');a.innerHTML=`<div class="sp-v22-card"><span class="eyebrow">模块考试</span><h2>模块 ${String(GROUPS[gi].no).padStart(2,'0')}：${esc(GROUPS[gi].title)}</h2><p>你已经完成本模块全部 ${ls.length} 个小课。答对 <strong>70% 以上</strong>才能进入下一模块。</p><button class="audio-large" id="spStartTest">参加模块考试 →</button></div>`;$('#spStartTest').onclick=()=>runTest(lang,c,gi,ls);}
  function runTest(lang,c,gi,ls){
    if(gi>0&&!window.__speakingUser){login();return;}
    const qsx=[];for(let i=0;i<10;i++){const l=ls[i%ls.length],o=ls.filter(x=>x.id!==l.id);if(i%2===0)qsx.push({kind:'target',q:l.zh,a:l.target,opts:shuffle([l.target,...o.slice(0,3).map(x=>x.target)]),audio:l.target});else qsx.push({kind:'meaning',q:l.target,a:l.zh,opts:shuffle([l.zh,...o.slice(0,3).map(x=>x.zh)]),audio:l.target});}
    let i=0,sc=0,chosen=false;const a=$('#spV22Active');
    const draw=()=>{const q=qsx[i];chosen=false;a.innerHTML=`<div class="sp-v22-test"><div class="sp-v22-head"><div><span class="eyebrow">模块 ${String(GROUPS[gi].no).padStart(2,'0')} 考试</span><h2>答对 70% 才能过关</h2></div><span>${i+1} / ${qsx.length}</span></div><div class="sp-v22-bar"><i style="width:${Math.round((i+1)/qsx.length*100)}%"></i></div><div class="sp-v22-question"><div class="eyebrow">${q.kind==='target'?'选择正确的目标语言':'这句话是什么意思？'}</div><h3 lang="${q.kind==='meaning'?(lang==='kk'?'kk':'ru'):''}">${esc(q.q)}</h3><button class="ghost-btn" id="spQA">🔊 听发音</button></div><div class="sp-v22-options">${q.opts.map((o,j)=>`<button class="sp-v22-option" data-i="${j}">${String.fromCharCode(65+j)}. ${esc(o)}</button>`).join('')}</div><div id="spFB" class="sp-v22-feedback"></div><button class="ghost-btn" id="spNext" disabled>下一题 →</button></div>`;
      $('#spQA').onclick=()=>speak(q.audio,c.language);let ans=false;a.querySelectorAll('.sp-v22-option').forEach(b=>b.onclick=()=>{if(ans)return;ans=true;const v=q.opts[Number(b.dataset.i)],ok=v===q.a;a.querySelectorAll('.sp-v22-option').forEach(x=>{x.disabled=true;if(q.opts[Number(x.dataset.i)]===q.a)x.classList.add('correct')});b.classList.add(ok?'correct':'wrong');if(ok)sc++;$('#spFB').textContent=ok?'回答正确！':'回答错误。正确答案：'+q.a;$('#spNext').disabled=false;});$('#spNext').onclick=async()=>{if(!ans)return;if(i<qsx.length-1){i++;draw();return;}const pct=Math.round(sc/qsx.length*100);await saveTest(lang,GROUPS[gi].no,pct);if(pct>=PASS){boot();setTimeout(()=>{const active=$('#spV22Active');if(gi<GROUPS.length-1&&!window.__speakingUser){active.innerHTML=`<div class="sp-v22-gate"><span class="eyebrow">模块 1 已通过</span><h2>${pct}%</h2><p>进入第 2 模块前，请先注册 / 登录。</p><button class="audio-large" id="spLoginAfter">🔐 注册 / 登录 →</button></div>`;$('#spLoginAfter').onclick=login;}},50);}else{a.innerHTML=`<div class="sp-v22-card" style="text-align:center"><span class="eyebrow">需要再练一次</span><div class="sp-v22-score">${pct}%</div><p>没有达到 70%，复习本模块后再测试。</p><button class="audio-large" id="spRetry">重新测试 →</button></div>`;$('#spRetry').onclick=()=>runTest(lang,c,gi,ls);}};};
    draw();a.scrollIntoView({behavior:'smooth',block:'start'});
  }
  function shuffle(a){return a.map(x=>[Math.random(),x]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);}

  // Boot after the existing speaking.js has created its data and session.
  function start(){try{boot().catch(e=>console.warn('speaking final boot failed',e));}catch(e){console.warn(e)}}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(start,120),{once:true});else setTimeout(start,120);
})();
