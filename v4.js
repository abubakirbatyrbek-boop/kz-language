/* V4 gamified learning engine */
const V4_PATHS = {
  kk: {
    label:'哈萨克语', flag:'🇰🇿', desc:'从基础词汇、基本句型，到造句、对话和真实场景。',
    units:[
      {id:'kk-u1',num:1,title:'认识与问候',desc:'你好、谢谢、再见、简单自我介绍',level:'基础',lessons:[
        {id:'kk-u1-l1',title:'高频礼貌词',type:'select',items:[
          ['“谢谢”怎么说？','Рақмет.',['Сәлеметсіз бе.','Рақмет.','Қайырлы түн.'],1],
          ['“你好”怎么说？','Сәлеметсіз бе.',['Рақмет.','Сәлеметсіз бе.','Кешіріңіз.'],1]]},
        {id:'kk-u1-l2',title:'听懂并选择',type:'listen',items:[
          ['“Мен түсінбеймін.”是什么意思？','我听不懂。',['谢谢。','我听不懂。','我明白了。'],1],
          ['“Қайта айтып жіберіңізші.”是什么意思？','请再说一次。',['请再说一次。','请坐。','再见。'],0]]},
        {id:'kk-u1-l3',title:'组句入门',type:'reorder',items:[
          ['把词排成：我是中国人。',['Мен','Қытайданмын.'],'Мен Қытайданмын.'],
          ['把词排成：我在学习哈萨克语。',['Мен','қазақ','тілін','үйреніп','жатырмын.'],'Мен қазақ тілін үйреніп жатырмын.']]},
      ]},
      {id:'kk-u2',num:2,title:'时间与日常',desc:'时间、地点、价格和基础提问',level:'基础+',lessons:[
        {id:'kk-u2-l1',title:'基础问句',type:'select',items:[
          ['“现在几点？”',['Қазір сағат неше?','Қай жерде?','Қанша тұрады?'],0,'Қазір сағат неше?'],
          ['“多少钱？”',['Қанша тұрады?','Қайырлы таң.','Кешіріңіз.'],0,'Қанша тұрады?']]},
        {id:'kk-u2-l2',title:'中文 → 哈语',type:'translate',items:[
          ['在哪里？','Қай жерде?'],['请等一下。','Күте тұрыңызшы.']]},
        {id:'kk-u2-l3',title:'从句型到造句',type:'write',items:[
          ['用“Мен ... қалаймын”表达：我想去车站。','Мен вокзалға барғым келеді.'],
          ['用“... керек”表达：我需要帮助。','Маған көмек керек.']]},
      ]},
      {id:'kk-u3',num:3,title:'基本句型与造句',desc:'人称、地点、动作，把词变成完整句子',level:'初级',lessons:[
        {id:'kk-u3-l1',title:'人称 + 动作',type:'select',items:[
          ['“Мен жұмыс істеймін.”是什么意思？',['我工作。','我休息。','我回家。'],0,'我工作。'],
          ['“Ол үйде.”是什么意思？',['他在公司。','他在家。','他在车站。'],1,'他在家。']]},
        {id:'kk-u3-l2',title:'句子重组',type:'reorder',items:[
          ['组成：我在哈萨克斯坦工作。',['Мен','Қазақстанда','жұмыс','істеймін.'],'Мен Қазақстанда жұмыс істеймін.'],
          ['组成：货物明天到。',['Жүк','ертең','келеді.'],'Жүк ертең келеді.']]},
        {id:'kk-u3-l3',title:'自己造句',type:'write',items:[
          ['请用“Қазақстанда”造一个完整句子。','Мен Қазақстанда жұмыс істеймін.'],
          ['请用“ертең”造一个完整句子。','Мен ертең жұмыс істеймін.']]},
      ]},
      {id:'kk-u4',num:4,title:'真实场景：物流与铁路',desc:'在车站、仓库、装卸现场直接使用',level:'实用',lessons:[
        {id:'kk-u4-l1',title:'铁路高频句',type:'select',items:[
          ['“火车什么时候发车？”',['Пойыз қашан жөнеледі?','Пойыз қайда?','Вагон қайда?'],0,'Пойыз қашан жөнеледі?'],
          ['“请确认车厢编号。”',['Вагон нөмірін тексеріңізші.','Құжаттарды беріңізші.','Пойызды күтіңіз.'],0,'Вагон нөмірін тексеріңізші.']]},
        {id:'kk-u4-l2',title:'现场对话',type:'translate',items:[['什么时候开始装车？','Вагонға тиеу қашан басталады?'],['请把单据给我。','Құжаттарды маған беріңізші.']]},
        {id:'kk-u4-l3',title:'场景造句',type:'write',items:[['你要告诉同事“货还没到”，请写一句话。','Жүк әлі келген жоқ.'],['你要问“在哪里卸货？”，请写一句话。','Жүкті қай жерде түсіреміз?']]},
      ]},
    ]
  },
  ru: {
    label:'俄语', flag:'🇷🇺', desc:'从基础表达、句型、组句，到工作和商务交流。',
    units:[
      {id:'ru-u1',num:1,title:'基础表达',desc:'问候、感谢、道歉和最常用表达',level:'基础',lessons:[
        {id:'ru-u1-l1',title:'高频表达',type:'select',items:[['“谢谢”怎么说？','Спасибо.',['Здравствуйте.','Спасибо.','До свидания.'],1],['“你好”怎么说？','Здравствуйте.',['Спасибо.','Здравствуйте.','Извините.'],1]]},
        {id:'ru-u1-l2',title:'理解意思',type:'select',items:[['“Я не понимаю.”是什么意思？',['我听不懂。','我明白了。','我不知道。'],0,'我听不懂。'],['“Повторите, пожалуйста.”是什么意思？',['请重复一次。','请坐。','谢谢。'],0,'请重复一次。']]},
        {id:'ru-u1-l3',title:'基础造句',type:'write',items:[['请用“Я хочу...”表达：我想去车站。','Я хочу поехать на вокзал.'],['请用“Мне нужно...”表达：我需要帮助。','Мне нужна помощь.']]},
      ]},
      {id:'ru-u2',num:2,title:'日常问答',desc:'时间、地点、价格、方向',level:'基础+',lessons:[
        {id:'ru-u2-l1',title:'高频问题',type:'select',items:[['“多少钱？”',['Сколько стоит?','Где находится?','Который сейчас час?'],0,'Сколько стоит?'],['“现在几点？”',['Который сейчас час?','Сколько стоит?','Как пройти?'],0,'Который сейчас час?']]},
        {id:'ru-u2-l2',title:'中文 → 俄语',type:'translate',items:[['在哪里？','Где находится?'],['请等一下。','Подождите, пожалуйста.']]},
        {id:'ru-u2-l3',title:'句子重组',type:'reorder',items:[['组成：我在哈萨克斯坦工作。',['Я','работаю','в','Казахстане.'],'Я работаю в Казахстане.'],['组成：货物明天到。',['Груз','прибудет','завтра.'],'Груз прибудет завтра.']]},
      ]},
      {id:'ru-u3',num:3,title:'基本句型与造句',desc:'人称、动词和完整句子',level:'初级',lessons:[
        {id:'ru-u3-l1',title:'人称与动词',type:'select',items:[['“Я работаю.”是什么意思？',['我工作。','我休息。','我回家。'],0,'我工作。'],['“Он дома.”是什么意思？',['他在公司。','他在家。','他在车站。'],1,'他在家。']]},
        {id:'ru-u3-l2',title:'句子重组',type:'reorder',items:[['组成：我在哈萨克斯坦工作。',['Я','работаю','в','Казахстане.'],'Я работаю в Казахстане.'],['组成：司机到了。',['Водитель','приехал.'],'Водитель приехал.']]},
        {id:'ru-u3-l3',title:'自己造句',type:'write',items:[['请用“завтра”造句。','Я завтра работаю.'],['请用“нужно”表达：需要准备文件。','Нужно подготовить документы.']]},
      ]},
      {id:'ru-u4',num:4,title:'真实场景：物流与工厂',desc:'现场沟通、装卸、设备和文件',level:'实用',lessons:[
        {id:'ru-u4-l1',title:'工作高频句',type:'select',items:[['“货物什么时候到？”',['Когда прибудет груз?','Когда начнётся работа?','Где водитель?'],0,'Когда прибудет груз?'],['“请把单据给我。”',['Дайте мне документы, пожалуйста.','Закройте дверь, пожалуйста.','Подождите здесь.'],0,'Дайте мне документы, пожалуйста.']]},
        {id:'ru-u4-l2',title:'现场翻译',type:'translate',items:[['什么时候开始装货？','Когда начнётся погрузка?'],['设备坏了。','Оборудование сломалось.']]},
        {id:'ru-u4-l3',title:'场景造句',type:'write',items:[['你要告诉同事“车还没到”，请写一句话。','Машина ещё не приехала.'],['你要说“这里不能停车”，请写一句话。','Здесь нельзя парковаться.']]},
      ]},
    ]
  }
};

function qs(name){return new URLSearchParams(location.search).get(name)}
function langKey(){return qs('lang')==='ru'?'ru':'kk'}
function getPath(){return V4_PATHS[langKey()]}
function nodeKey(k){return 'v4:'+k}
function localProgress(){try{return JSON.parse(localStorage.getItem('v4_progress')||'{}')}catch{return {}}}
function saveLocal(k,v){const p=localProgress();p[k]=v;localStorage.setItem('v4_progress',JSON.stringify(p))}
function getUser(){return window.__v4User||null}
async function initUser(){try{if(window.supabase && window.SUPABASE_CONFIG?.url){const c=window.supabase.createClient(window.SUPABASE_CONFIG.url,window.SUPABASE_CONFIG.publishableKey);window.__v4Supabase=c;const {data}=await c.auth.getUser();window.__v4User=data?.user||null}}catch(e){console.warn(e)}return getUser()}
async function saveRemoteProgress(nodeId, data){saveLocal(nodeId,data);const u=getUser(),s=window.__v4Supabase;if(!u||!s)return;try{await s.from('learning_progress').upsert({user_id:u.id,node_id:nodeId,language:data.language,status:data.status||'in_progress',score:data.score??null,updated_at:new Date().toISOString()},{onConflict:'user_id,node_id'})}catch(e){console.warn('remote progress failed',e)}}
async function saveTestResult(nodeId, data){const u=getUser(),s=window.__v4Supabase;if(!u||!s)return;try{await s.from('test_results').insert({user_id:u.id,node_id:nodeId,language:data.language,score:data.score,passed:data.passed,answers:data.answers||[],created_at:new Date().toISOString()})}catch(e){console.warn('test result failed',e)}}
function allUnits(path){return path.units}
function calcUnitState(unit, lang){const p=localProgress();const lessons=unit.lessons;const done=lessons.filter(l=>p[nodeKey(l.id)]?.status==='done').length;const test=p[nodeKey(unit.id)]?.status==='passed';return {done,total:lessons.length,percent:Math.round(done/lessons.length*100),test}}
function unitUnlocked(path,idx){if(idx===0)return true;const prev=path.units[idx-1];const st=calcUnitState(prev,path.label);return !!st.test}
function renderPath(){const path=getPath();document.title=`${path.label}学习路径｜中亚语言通`;document.getElementById('pathTitle').textContent=`${path.flag} ${path.label}`;document.getElementById('pathDesc').textContent=path.desc;const unlocked=path.units.filter((u,i)=>unitUnlocked(path,i)).length;document.getElementById('pathStats').innerHTML=`<div><b>${unlocked}</b><span>已解锁单元</span></div><div><b>${path.units.length}</b><span>总单元</span></div><div><b>${path.units.reduce((a,u)=>a+u.lessons.length,0)}</b><span>练习</span></div>`;document.getElementById('pathList').innerHTML=path.units.map((u,i)=>{const open=unitUnlocked(path,i),st=calcUnitState(u,path.label);return `<div class="path-node ${open?'open':'locked'}"><div class="node-num">${open?u.num:'🔒'}</div><div class="node-main"><div class="node-top"><span class="eyebrow">UNIT ${u.num} · ${u.level}</span><span>${st.test?'✅ 已通过':st.percent+'%'}</span></div><h3>${u.title}</h3><p>${u.desc}</p><div class="progress-track"><span style="width:${st.percent}%"></span></div></div><div class="node-action">${open?`<a class="primary-btn small" href="unit.html?lang=${langKey()}&unit=${u.id}">${st.percent?'继续':'开始'} →</a>`:`<span class="lock-copy">完成上一单元考试解锁</span>`}</div></div>`}).join('')}
function renderUnit(){const path=getPath();const unitId=qs('unit')||path.units[0].id;const idx=path.units.findIndex(u=>u.id===unitId);const unit=path.units[idx];if(!unit)return location.href=`path.html?lang=${langKey()}`;document.getElementById('backLink').href=`path.html?lang=${langKey()}`;document.getElementById('unitHeader').innerHTML=`<span class="eyebrow">UNIT ${unit.num} · ${unit.level}</span><h1>${unit.title}</h1><p>${unit.desc}</p><div class="unit-meter"><span>${calcUnitState(unit,path.label).done}/${unit.lessons.length} 小课完成</span><div class="progress-track"><span style="width:${calcUnitState(unit,path.label).percent}%"></span></div></div>`;document.getElementById('lessonList').innerHTML=unit.lessons.map((l,i)=>{const st=localProgress()[nodeKey(l.id)]?.status==='done';return `<a class="lesson-row ${st?'done':''}" href="lesson-v4.html?lang=${langKey()}&unit=${unit.id}&lesson=${l.id}"><div class="lesson-index">${st?'✓':i+1}</div><div><strong>${l.title}</strong><span>${l.type==='write'?'造句':l.type==='reorder'?'组句':l.type==='translate'?'翻译':l.type==='listen'?'听力':'选择题'}</span></div><b>${st?'已完成':'开始 →'}</b></a>`}).join('')+`<div class="unit-test-card"><div><span class="eyebrow">UNIT TEST</span><h3>单元考试</h3><p>完成所有小课后参加测试，达标后解锁下一单元。</p></div><a class="primary-btn" href="quiz-v4.html?lang=${langKey()}&unit=${unit.id}">参加考试 →</a></div>`}
function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
function renderLesson(){const path=getPath(),unit=path.units.find(u=>u.id===qs('unit')),lesson=unit?.lessons.find(l=>l.id===qs('lesson'));if(!lesson)return;document.getElementById('lessonTop').innerHTML=`<a class="back-link" href="unit.html?lang=${langKey()}&unit=${unit.id}">← ${unit.title}</a><span class="eyebrow">练习 · ${unit.num}</span><h1>${lesson.title}</h1><p>完成本小课后即可进入下一项。</p>`;const area=document.getElementById('exerciseArea');let i=0,score=0;const items=lesson.items;function next(){if(i>=items.length){const pct=Math.round(score/items.length*100);saveRemoteProgress(lesson.id,{language:langKey(),status:'done',score:pct});area.innerHTML=`<div class="result-card"><span class="eyebrow">完成</span><h2>本小课完成！</h2><div class="score-big">${pct}%</div><p>你答对了 ${score} / ${items.length}。</p><a class="primary-btn" href="unit.html?lang=${langKey()}&unit=${unit.id}">返回单元 →</a></div>`;return}const it=items[i];const meta=`<div class="exercise-meta"><span>${i+1} / ${items.length}</span><div class="progress-track"><span style="width:${Math.round(i/items.length*100)}%"></span></div></div>`;if(lesson.type==='select'||lesson.type==='listen'){const prompt=it[0],options=Array.isArray(it[2])?it[2]:it[1],correct=Number.isInteger(it[3])?it[3]:Number.isInteger(it[2])?it[2]:0;area.innerHTML=meta+`<div class="exercise-card"><span class="eyebrow">选择正确答案</span><h2>${prompt}</h2>${options.map((x,j)=>`<button class="answer-option" data-j="${j}">${x}</button>`).join('')}</div>`;area.querySelectorAll('.answer-option').forEach(b=>b.onclick=()=>{const ok=+b.dataset.j===correct;if(ok)score++;area.querySelectorAll('.answer-option').forEach(x=>x.disabled=true);b.classList.add(ok?'correct':'wrong');if(!ok)area.querySelector(`[data-j="${correct}"]`).classList.add('correct');const fb=document.createElement('div');fb.className='feedback-box '+(ok?'good':'bad');fb.innerHTML=ok?'正确！':'再看一下正确答案。';area.querySelector('.exercise-card').appendChild(fb);setTimeout(next,700)})}
else if(lesson.type==='translate'){const answer=it[1];area.innerHTML=meta+`<div class="exercise-card"><span class="eyebrow">中文 → ${path.label}</span><h2>${it[0]}</h2><input id="textAnswer" class="answer-input" placeholder="输入你的答案"><button id="submitText" class="primary-btn">提交答案</button><p class="hint">参考答案：提交后显示。</p></div>`;area.querySelector('#submitText').onclick=()=>{const v=area.querySelector('#textAnswer').value.trim();const ok=v===answer;if(ok)score++;area.querySelector('#textAnswer').disabled=true;area.querySelector('#submitText').disabled=true;const fb=document.createElement('div');fb.className='feedback-box '+(ok?'good':'bad');fb.textContent=ok?'正确！':`参考答案：${answer}`;area.querySelector('.exercise-card').appendChild(fb);setTimeout(next,900)}}
else if(lesson.type==='write'){const answer=it[1];area.innerHTML=meta+`<div class="exercise-card"><span class="eyebrow">自己造句</span><h2>${it[0]}</h2><textarea id="textAnswer" class="answer-input" rows="4" placeholder="写出你的句子"></textarea><button id="submitText" class="primary-btn">提交答案</button><p class="hint">V4 先采用“参考答案比对”的简易模式，后续可接 AI 语义评分。</p></div>`;area.querySelector('#submitText').onclick=()=>{const v=area.querySelector('#textAnswer').value.trim();const ok=v===answer;if(ok)score++;area.querySelector('#textAnswer').disabled=true;area.querySelector('#submitText').disabled=true;const fb=document.createElement('div');fb.className='feedback-box '+(ok?'good':'bad');fb.innerHTML=ok?`正确！`:`参考表达：${answer}`;area.querySelector('.exercise-card').appendChild(fb);setTimeout(next,1000)}}
else if(lesson.type==='reorder'){const phrase=shuffle(it[1]);area.innerHTML=meta+`<div class="exercise-card"><span class="eyebrow">组句</span><h2>${it[0]}</h2><div id="chips" class="chip-bank">${phrase.map((x,j)=>`<button class="word-chip" data-word="${x}" data-id="${j}">${x}</button>`).join('')}</div><div id="chosen" class="chosen-line"></div><button id="checkOrder" class="primary-btn" disabled>检查句子</button></div>`;const chosen=[];area.querySelectorAll('.word-chip').forEach(b=>b.onclick=()=>{if(b.disabled)return;chosen.push(b.dataset.word);b.disabled=true;document.getElementById('chosen').textContent=chosen.join(' ');document.getElementById('checkOrder').disabled=false});area.querySelector('#checkOrder').onclick=()=>{const expected=it[2],got=chosen.join(' '),ok=got===expected;if(ok)score++;const fb=document.createElement('div');fb.className='feedback-box '+(ok?'good':'bad');fb.textContent=ok?'组句正确！':`正确顺序：${expected}`;area.querySelector('.exercise-card').appendChild(fb);area.querySelector('#checkOrder').disabled=true;setTimeout(next,900)}}}
next()}
function normalizeSelectItem(it){
  const options = Array.isArray(it[2]) ? it[2] : (Array.isArray(it[1]) ? it[1] : []);
  const correct = Number.isInteger(it[3]) ? it[3] : (Number.isInteger(it[2]) ? it[2] : 0);
  return { prompt: it[0], options, correct };
}

function renderQuiz(){
  const path = getPath();
  const unit = path.units.find(u=>u.id===qs('unit'));
  if(!unit) return;

  const questions=[];
  unit.lessons.forEach(l=>{
    l.items.forEach(it=>{
      if(l.type==='select' || l.type==='listen'){
        const x=normalizeSelectItem(it);
        questions.push({type:'select', prompt:x.prompt, options:x.options, correct:x.correct});
      }else if(l.type==='translate'){
        questions.push({type:'translate', prompt:it[0], answer:it[1]});
      }else if(l.type==='reorder'){
        questions.push({type:'reorder', prompt:it[0], words:it[1], answer:it[2]});
      }else if(l.type==='write'){
        questions.push({type:'write', prompt:it[0], answer:it[1]});
      }
    });
  });

  const q=shuffle(questions).slice(0,Math.min(8,questions.length));
  let i=0, score=0, answers=[];

  function draw(){
    const area=document.getElementById('quizArea');
    if(i>=q.length){
      const pct=Math.round(score/q.length*100);
      const passed=pct>=80;
      saveRemoteProgress(unit.id,{language:langKey(),status:passed?'passed':'failed',score:pct});
      saveTestResult(unit.id,{language:langKey(),score:pct,passed,answers});
      area.innerHTML=`<div class="result-card ${passed?'pass':'fail'}"><span class="eyebrow">UNIT TEST</span><h1>${passed?'恭喜过关！':'再练一次吧'}</h1><div class="score-big">${pct}%</div><p>答对 ${score} / ${q.length}。${passed?'下一单元已经解锁。':'需要达到 80% 才能解锁下一单元。'}</p><div class="result-actions"><a class="secondary-btn" href="unit.html?lang=${langKey()}&unit=${unit.id}">返回单元</a><a class="primary-btn" href="path.html?lang=${langKey()}">返回路线 →</a></div></div>`;
      return;
    }

    const x=q[i];
    let html=`<div class="quiz-head"><div><span class="eyebrow">UNIT TEST · ${i+1}/${q.length}</span><h1>${unit.title}</h1></div><div class="quiz-score">${score} 分</div></div><div class="exercise-card"><h2>${x.prompt}</h2>`;
    if(x.type==='select'){
      html+=x.options.map((o,j)=>`<button class="answer-option" data-j="${j}">${o}</button>`).join('');
    }else if(x.type==='translate'||x.type==='write'){
      html+=`<input id="quizInput" class="answer-input" placeholder="请输入你的答案"><button class="primary-btn" id="quizSubmit">提交</button>`;
    }else{
      html+=`<div class="chip-bank">${shuffle(x.words).map(w=>`<button class="word-chip" data-word="${w}">${w}</button>`).join('')}</div><div id="chosen" class="chosen-line"></div><button class="primary-btn" id="quizSubmit" disabled>检查句子</button>`;
    }
    html+='</div>';
    area.innerHTML=html;

    if(x.type==='select'){
      area.querySelectorAll('.answer-option').forEach(b=>{
        b.onclick=()=>{
          const ok=+b.dataset.j===x.correct;
          if(ok) score++;
          answers.push({prompt:x.prompt,correct:ok});
          area.querySelectorAll('.answer-option').forEach(z=>z.disabled=true);
          b.classList.add(ok?'correct':'wrong');
          if(!ok){ const right=area.querySelector(`[data-j="${x.correct}"]`); if(right) right.classList.add('correct'); }
          const box=document.createElement('div'); box.className='feedback-box '+(ok?'good':'bad'); box.textContent=ok?'正确！':'再看一下正确答案。';
          area.querySelector('.exercise-card').appendChild(box);
          setTimeout(()=>{i++;draw()},650);
        };
      });
    }else if(x.type==='translate'||x.type==='write'){
      area.querySelector('#quizSubmit').onclick=()=>{
        const v=area.querySelector('#quizInput').value.trim();
        const ok=v===x.answer;
        if(ok) score++;
        answers.push({prompt:x.prompt,correct:ok});
        area.querySelector('#quizInput').disabled=true;
        area.querySelector('#quizSubmit').disabled=true;
        const box=document.createElement('div'); box.className='feedback-box '+(ok?'good':'bad'); box.textContent=ok?'正确！':`参考答案：${x.answer}`;
        area.querySelector('.exercise-card').appendChild(box);
        setTimeout(()=>{i++;draw()},900);
      };
    }else{
      const chosen=[];
      area.querySelectorAll('.word-chip').forEach(b=>{
        b.onclick=()=>{if(b.disabled)return;chosen.push(b.dataset.word);b.disabled=true;area.querySelector('#chosen').textContent=chosen.join(' ');area.querySelector('#quizSubmit').disabled=false;};
      });
      area.querySelector('#quizSubmit').onclick=()=>{
        const ok=chosen.join(' ')===x.answer;
        if(ok) score++;
        answers.push({prompt:x.prompt,correct:ok});
        const box=document.createElement('div'); box.className='feedback-box '+(ok?'good':'bad'); box.textContent=ok?'正确！':`正确顺序：${x.answer}`;
        area.querySelector('.exercise-card').appendChild(box);
        area.querySelector('#quizSubmit').disabled=true;
        setTimeout(()=>{i++;draw()},900);
      };
    }
  }
  draw();
}
function renderProgress(){initUser().then(()=>{const p=localProgress(), pathKK=V4_PATHS.kk,pathRU=V4_PATHS.ru;document.getElementById('progressUser').textContent=getUser()?`当前账号：${getUser().email}`:'当前为游客模式，登录后可同步进度。';function cards(path){const passed=path.units.filter(u=>p[nodeKey(u.id)]?.status==='passed').length;const done=path.units.reduce((n,u)=>n+u.lessons.filter(l=>p[nodeKey(l.id)]?.status==='done').length,0);const total=path.units.reduce((n,u)=>n+u.lessons.length,0);return `<div class="dashboard-card"><div class="dashboard-title"><span>${path.flag} ${path.label}</span><b>${Math.round(done/total*100)}%</b></div><div class="progress-track"><span style="width:${Math.round(done/total*100)}%"></span></div><p>${passed}/${path.units.length} 个单元已通过 · ${done}/${total} 小课已完成</p><a class="secondary-btn" href="path.html?lang=${path===pathKK?'kk':'ru'}">继续学习 →</a></div>`}document.getElementById('progressDashboard').innerHTML=cards(pathKK)+cards(pathRU)})}
(async function(){await initUser();const page=document.body.querySelector('#pathList')?'path':document.body.querySelector('#lessonList')?'unit':document.body.querySelector('#exerciseArea')?'lesson':document.body.querySelector('#quizArea')?'quiz':document.body.querySelector('#progressDashboard')?'progress':'home';if(page==='path')renderPath();else if(page==='unit')renderUnit();else if(page==='lesson')renderLesson();else if(page==='quiz')renderQuiz();else if(page==='progress')renderProgress()})()
