/* V13 Speaking course. Original content, inspired by incremental sentence-building pedagogy. */
const SPEAKING_COURSES = {
  kk: {
    key:'kk', flag:'🇰🇿', label:'哈萨克语', title:'零基础造句与口语',
    desc:'不要求先把语法全部学完。从“我、你、他”开始，一小步一小步把句子搭出来。',
    language:'kk-KZ',
    modules:[
      ['01','人称与身份', [
        ['我','我','Мен','我先记住一个主语。'],
        ['你','你','Сен','把同一个意思换成“你”。'],
        ['他 / 她','他 / 她','Ол','哈萨克语里“他、她”都可用“Ол”。'],
        ['我们','我们','Біз','加入“我们”，开始扩大主语。'],
        ['你们 / 他们','你们 / 他们','Сендер / Олар','把单数扩展到复数。'],
        ['身份句','我是学生。','Мен студентпін.','先整句记住“我是……”的表达。'],
        ['身份扩展','我是中国人。','Мен қытаймын.','同一个结构换一个身份。'],
        ['身份提问','你是学生吗？','Сен студентсің бе?','把陈述句变成简单问题。']
      ]],
      ['02','地点与“在哪里”', [
        ['这里','这里','осында','先认识地点词。'],
        ['我在这里','我在这里。','Мен осындамын.','主语 + 地点，先记整句。'],
        ['你在哪里','你在哪里？','Сен қайдасың?','开始提问地点。'],
        ['他在工作','他在工作。','Ол жұмыста.','把地点换成“工作场所”。'],
        ['我在公司','我在公司。','Мен компаниядамын.','“在哪里”继续换地点。'],
        ['我在家','我在家。','Мен үйдемін.','生活中最高频的地点句之一。'],
        ['你在哪里工作','你在哪里工作？','Сен қайда жұмыс істейсің?','从“在哪里”继续加动作。'],
        ['我在哈萨克斯坦工作','我在哈萨克斯坦工作。','Мен Қазақстанда жұмыс істеймін.','把地点和动作合在一起。']
      ]],
      ['03','有 / 没有', [
        ['我有','我有一本书。','Менде кітап бар.','先学会用“有”。'],
        ['我没有','我没有车。','Менде көлік жоқ.','马上配一个否定句。'],
        ['你有吗','你有时间吗？','Сенде уақыт бар ма?','把“有”变成问题。'],
        ['他有','他有文件。','Оның құжаты бар.','换人物。'],
        ['我们有','我们有时间。','Бізде уақыт бар.','继续换成复数主语。'],
        ['你没有','你没有钱。','Сенде ақша жоқ.','“有 / 没有”成对记忆。']
      ]],
      ['04','动作：工作、去、来、看、说', [
        ['我工作','我工作。','Мен жұмыс істеймін.','一个核心动作先记整句。'],
        ['你工作','你工作。','Сен жұмыс істейсің.','同一个动作换人称。'],
        ['他工作','他工作。','Ол жұмыс істейді.','继续观察人称变化。'],
        ['我去','我去公司。','Мен компанияға барамын.','加入目的地。'],
        ['你来','你来这里。','Сен осында келесің.','换成“来”。'],
        ['我看','我看文件。','Мен құжатты қараймын.','把动作换成工作内容。'],
        ['我说','我说哈萨克语。','Мен қазақша сөйлеймін.','开始进入真正的口语能力。'],
        ['我听不懂','我听不懂。','Мен түсінбеймін.','这是不会交流时必须会的一句。']
      ]],
      ['05','时间：现在、今天、明天', [
        ['现在','现在。','Қазір.','一个时间词。'],
        ['今天','今天。','Бүгін.','换一个高频时间词。'],
        ['明天','明天。','Ертең.','再加入一个时间点。'],
        ['今天工作','我今天工作。','Мен бүгін жұмыс істеймін.','时间 + 动作。'],
        ['明天工作','我明天工作。','Мен ертең жұмыс істеймін.','只替换时间，帮助记忆。'],
        ['现在在哪里','你现在在哪里？','Сен қазір қайдасың?','时间 + 地点问题。']
      ]],
      ['06','需要、想要、可以', [
        ['我需要','我需要帮助。','Маған көмек керек.','先记“需要”的完整表达。'],
        ['我想要','我想喝咖啡。','Мен кофе ішкім келеді.','用一个完整句表达愿望。'],
        ['我可以','我可以进来吗？','Кіруге бола ма?','先记“可以吗”的整体表达。'],
        ['你需要吗','你需要帮助吗？','Саған көмек керек пе?','把需求变成问题。'],
        ['我不需要','我不需要。','Маған қажет емес.','把肯定和否定配对。'],
        ['请帮我','请帮我。','Маған көмектесіңізші.','进入真实交流。']
      ]],
      ['07','提问与回应', [
        ['这是什么','这是什么？','Бұл не?','最基础的“什么”。'],
        ['这是谁','这是谁？','Бұл кім?','人物提问。'],
        ['在哪里','在哪里？','Қай жерде?','地点提问。'],
        ['多少钱','多少钱？','Қанша тұрады?','购物中直接使用。'],
        ['什么时候','什么时候？','Қашан?','时间提问。'],
        ['为什么','为什么？','Неге?','再增加一个常用问词。'],
        ['怎么说','这个用哈萨克语怎么说？','Мұны қазақша қалай айтады?','学会问语言本身。']
      ]],
      ['08','交流补救', [
        ['请再说一次','请再说一次。','Қайта айтып жіберіңізші.','没听清时先不要猜，先让对方重复。'],
        ['请说慢一点','请说慢一点。','Баяу сөйлеңізші.','直接解决交流速度问题。'],
        ['我听不懂','我听不懂。','Мен түсінбеймін.','把前面学过的句子再次使用。'],
        ['请写下来','请写下来。','Жазып беріңізші.','不会听时改成书面确认。'],
        ['请等一下','请等一下。','Күте тұрыңызшы.','现场沟通常用。'],
        ['谢谢','谢谢。','Рақмет.','形成完整的小礼貌链。']
      ]],
      ['09','生活：商店与餐厅', [
        ['我要这个','我要这个。','Мынаны аламын.','指着商品直接练。'],
        ['多少钱','这个多少钱？','Бұл қанша тұрады?','把询价接到商品上。'],
        ['可以刷卡吗','可以刷卡吗？','Картамен төлеуге бола ма?','加入付款场景。'],
        ['我需要这个药','我需要这个药。','Маған осы дәрі керек.','进入药店表达。'],
        ['我要一杯水','我要一杯水。','Маған бір стақан су беріңізші.','餐饮场景先练完整请求。'],
        ['不要辣','不要辣。','Ащы қоспаңызшы.','加入简单需求。'],
        ['请给我账单','请给我账单。','Есепшотты беріңізші.','把点餐推进到结账。']
      ]],
      ['10','出行与工作', [
        ['我要去这里','我要去这里。','Мен мұнда барғым келеді.','打车时先学目的地表达。'],
        ['请停这里','请在这里停车。','Осы жерде тоқтатыңызшы.','指地点并提出请求。'],
        ['公司在哪里','公司在哪里？','Компания қай жерде?','地点问题。'],
        ['我在公司','我在公司。','Мен компаниядамын.','回应地点问题。'],
        ['文件给我','请把文件给我。','Құжатты маған беріңізші.','工作中的简单请求。'],
        ['货物到了吗','货物到了吗？','Жүк келді ме?','把口语推进到物流现场。'],
        ['司机到了','司机到了。','Жүргізуші келді.','通知现场状态。'],
        ['我们现在开始','我们现在开始。','Біз қазір бастаймыз.','最后进入团队沟通。']
      ]]
    ]
  },
  ru: {
    key:'ru', flag:'🇷🇺', label:'俄语', title:'零基础造句与口语',
    desc:'不用先把语法全部学完。从“我、你、他”开始，一层一层搭句，边学边说。',
    language:'ru-RU',
    modules:[
      ['01','人称与身份', [
        ['我','我','Я','先记住一个主语。'],
        ['你','你','Ты','把同一个意思换成“你”。'],
        ['他 / 她','他 / 她','Он / Она','俄语要区分阳性和阴性。'],
        ['我们','我们','Мы','加入复数主语。'],
        ['你们 / 他们','你们 / 他们','Вы / Они','正式“你”和复数都先整体记。'],
        ['身份句','我是学生。','Я студент.','先整句记住，不急着拆语法。'],
        ['身份扩展','我是中国人。','Я из Китая.','把身份表达换成来源。'],
        ['身份提问','你是学生吗？','Ты студент?','先记最简单的口语疑问。']
      ]],
      ['02','地点与“在哪里”', [
        ['这里','这里','здесь','先认识地点副词。'],
        ['我在这里','我在这里。','Я здесь.','主语 + 地点。'],
        ['你在哪里','你在哪里？','Где ты?','开始提问地点。'],
        ['他在工作','他在工作。','Он на работе.','把地点换成工作场所。'],
        ['我在公司','我在公司。','Я в компании.','继续换地点。'],
        ['我在家','我在家。','Я дома.','高频日常表达。'],
        ['你在哪里工作','你在哪里工作？','Где ты работаешь?','地点 + 动作。'],
        ['我在哈萨克斯坦工作','我在哈萨克斯坦工作。','Я работаю в Казахстане.','把地点和动作合起来。']
      ]],
      ['03','有 / 没有', [
        ['我有','我有一本书。','У меня есть книга.','先记住“有”的完整表达。'],
        ['我没有','我没有车。','У меня нет машины.','和上句成对记忆。'],
        ['你有吗','你有时间吗？','У тебя есть время?','把“有”变成问题。'],
        ['他有','他有文件。','У него есть документы.','换人物。'],
        ['我们有','我们有时间。','У нас есть время.','扩展到复数。'],
        ['你没有','你没有钱。','У тебя нет денег.','继续使用同一结构。']
      ]],
      ['04','动作：工作、去、来、看、说', [
        ['我工作','我工作。','Я работаю.','一个核心动作先记整句。'],
        ['你工作','你工作。','Ты работаешь.','同一个动作换人称。'],
        ['他工作','他工作。','Он работает.','继续换人物。'],
        ['我去','我去公司。','Я иду в компанию.','加入目的地。'],
        ['你来','你来这里。','Ты приходишь сюда.','换成“来”。'],
        ['我看','我看文件。','Я смотрю документ.','把动作换成工作内容。'],
        ['我说','我说俄语。','Я говорю по-русски.','开始进入真正口语。'],
        ['我听不懂','我听不懂。','Я не понимаю.','不会交流时先学会这句。']
      ]],
      ['05','时间：现在、今天、明天', [
        ['现在','现在。','сейчас','先记一个时间词。'],
        ['今天','今天。','сегодня','再加一个高频词。'],
        ['明天','明天。','завтра','继续换时间。'],
        ['今天工作','我今天工作。','Я сегодня работаю.','时间 + 动作。'],
        ['明天工作','我明天工作。','Я завтра работаю.','只换一个词，帮助记忆。'],
        ['现在在哪里','你现在在哪里？','Где ты сейчас?','时间 + 地点问题。']
      ]],
      ['06','需要、想要、可以', [
        ['我需要','我需要帮助。','Мне нужна помощь.','先记完整表达。'],
        ['我想要','我想喝咖啡。','Я хочу кофе.','先学会直接表达想要。'],
        ['可以吗','可以进来吗？','Можно войти?','先整体记住“可以吗”。'],
        ['你需要吗','你需要帮助吗？','Тебе нужна помощь?','把需求变成问题。'],
        ['我不需要','我不需要。','Мне не нужно.','把肯定和否定配对。'],
        ['请帮我','请帮我。','Помогите мне, пожалуйста.','进入真实交流。']
      ]],
      ['07','提问与回应', [
        ['这是什么','这是什么？','Что это?','最基础的“什么”。'],
        ['这是谁','这是谁？','Кто это?','人物提问。'],
        ['在哪里','在哪里？','Где?','地点提问。'],
        ['多少钱','多少钱？','Сколько это стоит?','购物直接使用。'],
        ['什么时候','什么时候？','Когда?','时间提问。'],
        ['为什么','为什么？','Почему?','再增加一个常用问词。'],
        ['怎么说','这个用俄语怎么说？','Как это сказать по-русски?','学会问语言本身。']
      ]],
      ['08','交流补救', [
        ['请再说一次','请再说一次。','Повторите, пожалуйста.','没听清就先让对方重复。'],
        ['请说慢一点','请说慢一点。','Говорите медленнее, пожалуйста.','解决交流速度问题。'],
        ['我听不懂','我听不懂。','Я не понимаю.','前面句子反复使用。'],
        ['请写下来','请写下来。','Напишите, пожалуйста.','听不清时改成书面确认。'],
        ['请等一下','请等一下。','Подождите, пожалуйста.','现场沟通常用。'],
        ['谢谢','谢谢。','Спасибо.','形成完整的礼貌链。']
      ]],
      ['09','生活：商店与餐厅', [
        ['我要这个','我要这个。','Я хочу это.','指着商品直接练。'],
        ['多少钱','这个多少钱？','Сколько это стоит?','把询价接到商品上。'],
        ['可以刷卡吗','可以刷卡吗？','Можно оплатить картой?','加入付款场景。'],
        ['我需要这个药','我需要这个药。','Мне нужно это лекарство.','进入药店。'],
        ['我要一杯水','我要一杯水。','Мне стакан воды, пожалуйста.','餐饮场景先练完整请求。'],
        ['不要辣','不要辣。','Не остро, пожалуйста.','加入简单需求。'],
        ['请给我账单','请给我账单。','Дайте счёт, пожалуйста.','从点餐走到结账。']
      ]],
      ['10','出行与工作', [
        ['我要去这里','我要去这里。','Я хочу поехать сюда.','打车时先学目的地表达。'],
        ['请停这里','请在这里停车。','Остановитесь здесь, пожалуйста.','指地点并提出请求。'],
        ['公司在哪里','公司在哪里？','Где компания?','地点问题。'],
        ['我在公司','我在公司。','Я в компании.','回应地点。'],
        ['文件给我','请把文件给我。','Дайте мне документы, пожалуйста.','工作中的简单请求。'],
        ['货物到了吗','货物到了吗？','Груз прибыл?','进入物流现场。'],
        ['司机到了','司机到了。','Водитель приехал.','通知现场状态。'],
        ['我们现在开始','我们现在开始。','Мы начинаем сейчас.','最后进入团队沟通。']
      ]]
    ]
  }
};

function speakingUserKey(){ return window.__speakingUser?.id || null; }
function speakingStorageKey(lang){ return `v13_speaking_${lang}_${speakingUserKey()||'guest'}`; }
function getSpeakingProgress(lang){ try{return JSON.parse(localStorage.getItem(speakingStorageKey(lang))||'{}')}catch{return{}} }
function setSpeakingProgress(lang,p){ localStorage.setItem(speakingStorageKey(lang),JSON.stringify(p)); }
function speakTarget(text,lang){
  if(!('speechSynthesis' in window)){ alert('当前浏览器不支持语音朗读'); return; }
  speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(text); u.lang=lang; u.rate=.84; u.pitch=1; speechSynthesis.speak(u);
}
async function initSpeakingUser(){
  if(!(window.supabase&&window.SUPABASE_CONFIG?.url&&window.SUPABASE_CONFIG?.publishableKey))return null;
  try{
    const client=window.supabase.createClient(window.SUPABASE_CONFIG.url,window.SUPABASE_CONFIG.publishableKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
    window.__speakingSupabase=client;
    const {data}=await client.auth.getSession(); window.__speakingUser=data?.session?.user||null;
    if(window.__speakingUser){
      const {data:rows}=await client.from('learning_progress').select('node_id,status,score,updated_at').eq('user_id',window.__speakingUser.id).like('node_id',`v13:speaking:%`).limit(1000);
      const remote={}; (rows||[]).forEach(r=>remote[r.node_id]={status:r.status,score:r.score,updated_at:r.updated_at});
      const lang=window.__speakingLang||new URLSearchParams(location.search).get('lang')||'kk';
      const local=getSpeakingProgress(lang); Object.assign(local,remote); setSpeakingProgress(lang,local);
    }
  }catch(e){console.warn('speaking auth init failed',e)}
  return window.__speakingUser||null;
}
async function saveSpeakingLesson(lang,lessonId){
  const key=`v13:speaking:${lang}:${lessonId}`, now=new Date().toISOString(), p=getSpeakingProgress(lang); p[key]={status:'done',score:100,updated_at:now}; setSpeakingProgress(lang,p);
  localStorage.setItem(`v14:lastSpeakingLesson:${lang}`,lessonId);
  const u=window.__speakingUser,s=window.__speakingSupabase; if(!u||!s)return;
  try{await s.from('learning_progress').upsert({user_id:u.id,node_id:key,language:lang,status:'done',score:100,updated_at:now},{onConflict:'user_id,node_id'});}catch(e){console.warn('speaking progress save failed',e)}
}
function isDone(lang,lessonId){return getSpeakingProgress(lang)[`v13:speaking:${lang}:${lessonId}`]?.status==='done';}

function moduleLessons(course,moduleNo){
  const m=course.modules.find(x=>x[0]===moduleNo);
  return m ? m[2].map((x,i)=>({module:m[0],moduleTitle:m[1],index:i,title:x[0],steps:[[x[1],x[2],x[3]]],note:x[3],id:`${m[0]}-${i+1}`})) : [];
}
function allSpeakingLessons(course){
  return course.modules.flatMap(m=>moduleLessons(course,m[0]));
}
function moduleTestKey(lang,moduleNo){ return `v14:speaking-test:${lang}:${moduleNo}`; }
function modulePassed(lang,moduleNo){ return getSpeakingProgress(lang)[moduleTestKey(lang,moduleNo)]?.status==='passed'; }
function moduleTestScore(lang,moduleNo){ return Number(getSpeakingProgress(lang)[moduleTestKey(lang,moduleNo)]?.score || 0); }
function moduleCompleted(lang,course,moduleNo){
  return moduleLessons(course,moduleNo).every(l=>isDone(lang,l.id));
}
function moduleRequiresLogin(moduleIndex){ return moduleIndex>=1; }
function goToLogin(){
  const next = window.location.pathname.split('/').pop() + window.location.search;
  window.location.href = `auth.html?mode=login&next=${encodeURIComponent(next)}`;
}
function moduleUnlocked(lang,course,moduleIndex){
  if(moduleRequiresLogin(moduleIndex) && !window.__speakingUser) return false;
  if(moduleIndex<=0)return true;
  return modulePassed(lang,course.modules[moduleIndex-1][0]);
}
function lessonUnlocked(lang,course,moduleNo,lessonIndex){
  const moduleIndex=course.modules.findIndex(m=>m[0]===moduleNo);
  if(moduleIndex<0 || !moduleUnlocked(lang,course,moduleIndex))return false;
  const ls=moduleLessons(course,moduleNo);
  return ls.slice(0,lessonIndex).every(l=>isDone(lang,l.id));
}
function currentUnlockedLessonIndex(lang,course){
  for(let mi=0;mi<course.modules.length;mi++){
    const modNo=course.modules[mi][0];
    if(!moduleUnlocked(lang,course,mi)) return {moduleIndex:mi,lessonIndex:0,needsTest:true};
    const ls=moduleLessons(course,modNo);
    const li=ls.findIndex(l=>!isDone(lang,l.id));
    if(li>=0) return {moduleIndex:mi,lessonIndex:li,needsTest:false};
    if(!modulePassed(lang,modNo)) return {moduleIndex:mi,lessonIndex:ls.length-1,needsTest:true};
  }
  return {moduleIndex:course.modules.length-1,lessonIndex:moduleLessons(course,course.modules.at(-1)[0]).length-1,needsTest:true,allComplete:true};
}
function updateSpeakingSummary(lang,course){
  const all=allSpeakingLessons(course), done=all.filter(l=>isDone(lang,l.id)).length, pct=Math.round(done/all.length*100);
  const count=document.getElementById('speakingDoneCount'); if(count) count.textContent=`完成进度：${done} / ${all.length}`;
  const bar=document.getElementById('speakingProgressBar'); if(bar) bar.style.width=`${pct}%`;
  const sub=document.getElementById('speakingProgressPct'); if(sub) sub.textContent=`${pct}%`;
}
function updateSpeakingModules(lang,course){
  const root=document.getElementById('speakingModules'); if(!root)return;
  root.innerHTML=course.modules.map((m,mi)=>{
    const modNo=m[0], ls=moduleLessons(course,modNo), d=ls.filter(l=>isDone(lang,l.id)).length;
    const unlocked=moduleUnlocked(lang,course,mi);
    const complete=d===ls.length;
    const passed=modulePassed(lang,modNo); const score=moduleTestScore(lang,modNo);
    const next=ls.findIndex(l=>!isDone(lang,l.id));
    let action='';
    if(!unlocked) {
      if(moduleRequiresLogin(mi) && !window.__speakingUser) action=`<button class="ghost-btn module-action login-required" data-login="1">🔐 注册 / 登录后继续</button>`;
      else action=`<button class="ghost-btn module-action" disabled>🔒 等待上一模块测试</button>`;
    }
    else if(!complete) action=`<button class="audio-large module-action" data-mi="${mi}" data-li="${Math.max(0,next)}">继续学习 →</button>`;
    else if(!passed) action=`<button class="module-test-btn" data-test="${modNo}">参加模块测试 →</button>`;
    else action=`<button class="ghost-btn module-action" data-mi="${mi}" data-li="0">复习模块 · 已通过 ${score}%</button>`;
    return `<div class="module-item ${unlocked?'':'locked'} ${passed?'passed':''}"><div class="module-item-top"><span class="course-map-no">${modNo}</span><div><strong>${m[1]}</strong><small>${d}/${ls.length} 课完成${passed?` · 测试 ${score}%`:(complete?' · 可以测试':'')}</small></div></div>${action}</div>`;
  }).join('');
}
function makeModuleTest(course,moduleNo){
  const ls=moduleLessons(course,moduleNo);
  const source=ls.slice(0,Math.min(7,ls.length));
  const variants=[];
  source.forEach((l,i)=>{
    const step=l.steps[0], zh=step[0], target=step[1];
    if(i%2===0){
      const options=[target,...source.filter(x=>x.id!==l.id).slice(0,3).map(x=>x.steps[0][1])];
      variants.push({kind:'target',prompt:'请选择正确的目标语言表达',source:zh,answer:target,options:shuffleOptions(options),lang:course.language});
    }else{
      const options=[zh,...source.filter(x=>x.id!==l.id).slice(0,3).map(x=>x.steps[0][0])];
      variants.push({kind:'meaning',prompt:'这句话是什么意思？',source:target,answer:zh,options:shuffleOptions(options),lang:course.language});
    }
  });
  return variants;
}
function shuffleOptions(a){return a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);}
async function saveModuleTest(lang,moduleNo,score,passed,answers){
  const key=moduleTestKey(lang,moduleNo), now=new Date().toISOString(), p=getSpeakingProgress(lang);
  p[key]={status:passed?'passed':'failed',score,updated_at:now,answers}; setSpeakingProgress(lang,p);
  const u=window.__speakingUser,s=window.__speakingSupabase; if(!u||!s)return;
  try{await s.from('test_results').insert({user_id:u.id,node_id:key,language:lang,score,passed,answers});}catch(e){console.warn('module test save failed',e)}
}
function renderModuleTest(course,allLessons,moduleIndex){
  const lang=course.key, mod=course.modules[moduleIndex], moduleNo=mod[0], ls=moduleLessons(course,moduleNo), area=document.getElementById('activeLesson'); if(!area)return;
  if(!moduleCompleted(lang,course,moduleNo)){area.innerHTML=`<div class="speak-card"><span class="eyebrow">模块测试</span><h2>还不能参加测试</h2><p>先完成本模块全部 ${ls.length} 课，再来参加模块测试。</p><button class="ghost-btn" id="returnToLesson">继续学习 →</button></div>`; area.querySelector('#returnToLesson').onclick=()=>{const i=ls.findIndex(l=>!isDone(lang,l.id)); startLesson(course,allLessons,allLessons.findIndex(x=>x.id===ls[i].id),0)}; return;}
  const questions=makeModuleTest(course,moduleNo); let current=0,score=0,answered=false;
  area.innerHTML=`<div class="module-test-card"><div class="lesson-top"><div><span class="eyebrow">第 ${moduleNo} 模块测试 · ${mod[1]}</span><h2>掌握 70% 才能进入下一模块</h2></div><span id="moduleTestNo">1 / ${questions.length}</span></div><div class="lesson-progress"><i id="moduleTestBar" style="width:14%"></i></div><div id="moduleQuestion"></div><div class="speak-actions"><button class="ghost-btn" id="moduleNext" disabled>下一题 →</button></div><p class="speak-footer-note">答对 ≥70% 即通过；未通过可以重新测试。</p></div>`;
  const qbox=area.querySelector('#moduleQuestion'), next=area.querySelector('#moduleNext'), no=area.querySelector('#moduleTestNo'), bar=area.querySelector('#moduleTestBar');
  const render=()=>{
    const q=questions[current]; answered=false; next.disabled=true; no.textContent=`${current+1} / ${questions.length}`; bar.style.width=`${Math.round((current+1)/questions.length*100)}%`;
    qbox.innerHTML=`<div class="test-prompt"><span class="eyebrow">${q.prompt}</span><h3>${q.source}</h3>${q.kind==='meaning' ? `<button class="round-sound" id="testAudio">🔊 听${course.label}</button>`:''}</div><div class="module-options">${q.options.map((opt,i)=>`<button class="module-option" data-i="${i}"><span>${String.fromCharCode(65+i)}.</span><strong>${opt}</strong>${(q.kind==='target'&&course.language)?`<span class="option-audio" data-text="${opt.replace(/"/g,'&quot;')}" data-lang="${course.language}">🔊</span>`:''}</button>`).join('')}</div><div id="moduleFeedback" class="module-feedback"></div>`;
    const ta= qbox.querySelector('#testAudio'); if(ta)ta.onclick=()=>speakTarget(q.source,course.language);
    qbox.querySelectorAll('.option-audio').forEach(b=>b.onclick=e=>{e.stopPropagation();speakTarget(b.dataset.text,b.dataset.lang)});
  };
  qbox.addEventListener('click',e=>{const b=e.target.closest('.module-option');if(!b||answered)return; answered=true; const q=questions[current], val=q.options[Number(b.dataset.i)], correct=val===q.answer; qbox.querySelectorAll('.module-option').forEach(x=>{x.disabled=true;if(q.options[Number(x.dataset.i)]===q.answer)x.classList.add('correct')}); if(correct){score++;b.classList.add('correct')}else b.classList.add('wrong'); qbox.querySelector('#moduleFeedback').textContent=correct?'回答正确！':`回答错误，正确答案：${q.answer}`; next.disabled=false; });
  next.onclick=async()=>{if(!answered)return;if(current<questions.length-1){current++;render();window.scrollTo({top:0,behavior:'smooth'})}else{const pct=Math.round(score/questions.length*100),passed=pct>=70; await saveModuleTest(lang,moduleNo,pct,passed,[]); updateSpeakingSummary(lang,course); updateSpeakingModules(lang,course); area.innerHTML=`<div class="speak-card"><span class="eyebrow">${passed?'模块通过':'需要再练一次'}</span><h2>${passed?`测试通过：${pct}%`:`这次是 ${pct}%`}</h2><p>${passed?'恭喜！下一模块已经解锁。':'至少需要 70%，先回去复习本模块再重新测试。'}</p>${passed?`<button class="audio-large" id="nextModuleBtn">进入下一模块 →</button>`:`<button class="audio-large" id="retryModuleBtn">重新测试 →</button>`}</div>`; const ok=area.querySelector('#nextModuleBtn'); if(ok){ok.onclick=()=>{const nextMi=moduleIndex+1;if(nextMi<course.modules.length){const nextLs=moduleLessons(course,course.modules[nextMi][0]);startLesson(course,allLessons,allLessons.findIndex(x=>x.id===nextLs[0].id),0)} else {renderCourseChooser();}}}; const retry=area.querySelector('#retryModuleBtn'); if(retry)retry.onclick=()=>renderModuleTest(course,allLessons,moduleIndex);}};
  render();
}

function renderCourseChooser(){
  const lang=new URLSearchParams(location.search).get('lang');
  const el=document.getElementById('courseChooser');
  if(lang==='kk'||lang==='ru'){renderSpeakingCourse(lang); return;}
  el.innerHTML=`<div class="speak-card"><span class="eyebrow">💬 零基础造句与口语</span><h1>从“我、你、他”开始，把句子一步一步搭出来。</h1><p class="page-lead">这是独立的口语课程。它和字母课、语法课分开，不要求先学完语法；每一课只抓一个重点，反复换词，然后自己说一次。</p><div class="speak-steps"><span class="speak-step-pill">我 / 你 / 他</span><span class="speak-step-pill">是 / 在 / 有</span><span class="speak-step-pill">去 / 来 / 做</span><span class="speak-step-pill">提问</span><span class="speak-step-pill">否定</span><span class="speak-step-pill">真实场景</span></div></div><div class="speak-card"><span class="eyebrow">选择语言</span><h2>现在开始哪一种？</h2><p>两套课程内容独立，学习进度也分别保存。</p><div class="speak-actions"><a class="audio-large" style="text-decoration:none" href="speaking-course.html?lang=kk">🇰🇿 哈萨克语</a><a class="ghost-btn" style="text-decoration:none" href="speaking-course.html?lang=ru">🇷🇺 俄语</a></div><p class="speak-footer-note">登录后进度会绑定账号，换设备还能继续。</p></div>`;
  document.getElementById('courseContent').innerHTML='';
}

function renderSpeakingCourse(lang){
  window.__speakingLang=lang; const c=SPEAKING_COURSES[lang];
  const allLessons=allSpeakingLessons(c); let state=currentUnlockedLessonIndex(lang,c);
  if(state.moduleIndex>=1 && !window.__speakingUser) state={...state,needsLogin:true};
  const chooser=document.getElementById('courseChooser');
  const doneCount=allLessons.filter(l=>isDone(lang,l.id)).length;
  const locationTitle = state.needsLogin ? '第 2 模块起需要注册 / 登录' : (state.allComplete?'全部课程完成':state.needsTest?'本模块课程已完成，等待模块测试':`第 ${c.modules[state.moduleIndex][0]} 模块 · ${c.modules[state.moduleIndex][1]}`);
  const locationDesc = state.needsLogin ? '前面的入门内容可以先体验；注册或登录后才能继续学习第 2 模块及后面的内容。' : (state.allComplete?'可以回顾任意模块。':state.needsTest?'完成本模块后，先通过模块测试（≥70%）才能继续。':'上一课完成后自动进入下一课；完成整个模块后参加测试。');
  const locationAction = state.needsLogin ? '注册 / 登录' : (state.allComplete?'复习课程':state.needsTest?'参加模块测试':'继续学习');
  chooser.innerHTML=`<div class="speak-card"><span class="eyebrow">${c.flag} ${c.label} · 造句与口语</span><h1>${c.title}</h1><p class="page-lead">${c.desc}</p><div class="speak-steps"><span class="speak-step-pill">词</span><span class="speak-step-pill">短语</span><span class="speak-step-pill">完整句</span><span class="speak-step-pill">换词</span><span class="speak-step-pill">提问 / 否定</span><span class="speak-step-pill">自己说</span></div><div style="margin-top:18px"><strong id="speakingDoneCount">完成进度：${doneCount} / ${allLessons.length}</strong><strong id="speakingProgressPct" style="float:right">${Math.round(doneCount/allLessons.length*100)}%</strong><div class="lesson-progress"><i id="speakingProgressBar" style="width:${Math.round(doneCount/allLessons.length*100)}%"></i></div></div></div><div class="speak-card"><span class="eyebrow">当前学习位置</span><h2>${locationTitle}</h2><p>${locationDesc}</p><div class="speak-actions"><button class="audio-large" id="startSpeaking">${locationAction} →</button><a class="ghost-btn" href="courses.html">返回课程列表</a></div></div>`;
  document.getElementById('startSpeaking').onclick=()=>{if(state.needsLogin){goToLogin();return;} if(state.allComplete){startLesson(c,allLessons,allLessons.length-1,0);return;} if(state.needsTest){renderModuleTest(c,allLessons,state.moduleIndex);return;} const ls=moduleLessons(c,c.modules[state.moduleIndex][0]); const target=ls[state.lessonIndex]; const idx=allLessons.findIndex(x=>x.id===target.id); startLesson(c,allLessons,idx,0);};
  const content=document.getElementById('courseContent');
  content.innerHTML=`<div class="speak-card"><span class="eyebrow">课程结构</span><h2>每个模块学完，再用测试决定下一步。</h2><p class="page-lead">每个模块先完整学完，再参加一次小测试；答对 70% 以上才解锁下一模块。已经通过的模块可以随时复习。</p><div id="speakingModules" class="module-list"></div></div><div id="activeLesson"></div>`;
  updateSpeakingSummary(lang,c); updateSpeakingModules(lang,c);
  const modulesRoot=document.getElementById('speakingModules');
  modulesRoot.addEventListener('click',e=>{
    const loginAction=e.target.closest('.login-required');
    if(loginAction){ goToLogin(); return; }
    const action=e.target.closest('.module-action');
    if(action && !action.disabled){ const mi=Number(action.dataset.mi),li=Number(action.dataset.li),ls=moduleLessons(c,c.modules[mi][0]),idx=allLessons.findIndex(x=>x.id===ls[li].id); startLesson(c,allLessons,idx,0); return; }
    const testBtn=e.target.closest('.module-test-btn');
    if(testBtn){ const mi=c.modules.findIndex(m=>m[0]===testBtn.dataset.test); renderModuleTest(c,allLessons,mi); }
  });
}

function startLesson(course,allLessons,lessonIndex,stepIndex){
  const lang=course.key, lesson=allLessons[lessonIndex], area=document.getElementById('activeLesson'); if(!lesson)return;
  const moduleIndex=course.modules.findIndex(m=>m[0]===lesson.module);
  if(moduleRequiresLogin(moduleIndex) && !window.__speakingUser){
    area.innerHTML=`<div class="speak-card"><span class="eyebrow">需要注册 / 登录</span><h2>从第 2 模块开始，请先登录</h2><p>前面的入门内容可以先体验。登录后，后面的模块、学习进度和测试成绩会绑定到你的账号，之后重新打开网站还能继续。</p><button class="audio-large" id="loginToContinue">注册 / 登录 →</button></div>`;
    area.querySelector('#loginToContinue').onclick=goToLogin;
    area.scrollIntoView({behavior:'smooth',block:'start'});
    return;
  }
  if(!lessonUnlocked(lang,course,lesson.module,lesson.index)){
    const mi=course.modules.findIndex(m=>m[0]===lesson.module);
    if(mi>0 && !modulePassed(lang,course.modules[mi-1][0])){ renderModuleTest(course,allLessons,mi-1); return; }
    const ls=moduleLessons(course,lesson.module); const next=ls.findIndex(l=>!isDone(lang,l.id));
    if(next>=0){const target=allLessons.findIndex(x=>x.id===ls[next].id); return startLesson(course,allLessons,target,0);}
  }
  const totalSteps=lesson.steps.length; stepIndex=Math.max(0,Math.min(stepIndex,totalSteps-1));
  const step=lesson.steps[stepIndex]; const done=isDone(lang,lesson.id);
  area.innerHTML=`<div class="ladder-card"><div class="lesson-top"><div><span class="eyebrow">第 ${lesson.module} 模块 · ${lesson.moduleTitle}</span><h2 style="margin:6px 0 0">${lesson.title}</h2></div><span>第 ${stepIndex+1} / ${totalSteps} 步</span></div><div class="lesson-progress"><i style="width:${Math.round((stepIndex+1)/totalSteps*100)}%"></i></div><span class="ladder-badge">${stepIndex===0?'先认识':stepIndex===totalSteps-1?'自己说':'往上加一层'}</span><div class="ladder-cn">${step[0]}</div><div class="ladder-target" lang="${course.key==='kk'?'kk':'ru'}">${step[1]}</div><div class="speak-actions"><button class="audio-large" id="playTarget">🔊 听${course.label}</button><button class="ghost-btn" id="nextStep">${stepIndex===totalSteps-1?'进入自己说':'下一步 →'}</button></div><p class="ladder-note">${step[2]}</p>${stepIndex===totalSteps-1?`<div class="challenge"><div class="challenge-row"><div><span class="eyebrow">自己说</span><div class="challenge-target">${lesson.title}</div></div><button class="ghost-btn" id="showAnswer">看参考答案</button></div><div id="answer" class="hidden-answer"><strong lang="${course.key==='kk'?'kk':'ru'}">${step[1]}</strong> <button class="ghost-btn" id="playAnswer" style="padding:7px 10px">🔊</button></div><div style="margin-top:10px"><button class="audio-large" id="doneSpeaking">我已经说出来了 ✓</button></div></div>`:''}${done?`<div class="speak-footer-note">这课已经完成过。你可以重新练习，不会影响原来的进度。</div>`:''}</div>`;
  area.querySelector('#playTarget').onclick=()=>speakTarget(step[1],course.language);
  area.querySelector('#nextStep').onclick=()=>{ if(stepIndex<totalSteps-1) startLesson(course,allLessons,lessonIndex,stepIndex+1); else finishLesson(course,allLessons,lessonIndex); };
  if(stepIndex===totalSteps-1){
    area.querySelector('#showAnswer').onclick=()=>document.getElementById('answer').style.display='block';
    area.querySelector('#playAnswer').onclick=()=>speakTarget(step[1],course.language);
    area.querySelector('#doneSpeaking').onclick=async()=>{await saveSpeakingLesson(lang,lesson.id); updateSpeakingSummary(lang,course); updateSpeakingModules(lang,course); finishLesson(course,allLessons,lessonIndex,true);};
  }
  area.scrollIntoView({behavior:'smooth',block:'start'});
}
function finishLesson(course,allLessons,lessonIndex,autoNext){
  const lesson=allLessons[lessonIndex], lang=course.key, mod=course.modules.findIndex(m=>m[0]===lesson.module);
  const next=lessonIndex+1;
  if(autoNext){
    const moduleNo=course.modules[mod][0], ls=moduleLessons(course,moduleNo);
    const currentLi=ls.findIndex(l=>l.id===lesson.id);
    if(currentLi<ls.length-1){setTimeout(()=>startLesson(course,allLessons,allLessons.findIndex(x=>x.id===ls[currentLi+1].id),0),160);return;}
    if(moduleCompleted(lang,course,moduleNo) && !modulePassed(lang,moduleNo)){setTimeout(()=>renderModuleTest(course,allLessons,mod),160);return;}
    const nextMi=mod+1;
    if(nextMi<course.modules.length && modulePassed(lang,moduleNo)){
      const nextLs=moduleLessons(course,course.modules[nextMi][0]);
      setTimeout(()=>startLesson(course,allLessons,allLessons.findIndex(x=>x.id===nextLs[0].id),0),160);return;
    }
  }
  const area=document.getElementById('activeLesson');
  if(moduleCompleted(lang,course,course.modules[mod][0]) && !modulePassed(lang,course.modules[mod][0])){
    area.innerHTML=`<div class="speak-card"><span class="eyebrow">模块完成</span><h2>${course.modules[mod][1]} 已全部学完</h2><p>现在参加模块测试，答对 70% 以上才能进入下一个模块。</p><button class="audio-large" id="takeModuleTest">参加模块测试 →</button></div>`;
    area.querySelector('#takeModuleTest').onclick=()=>renderModuleTest(course,allLessons,mod);
  }else if(next<allLessons.length){
    const nextLesson=allLessons[next];
    area.innerHTML=`<div class="speak-card"><span class="eyebrow">完成</span><h2>这一课完成了。</h2><p>下一课会在刚才的句型基础上再加一点内容。</p><button class="audio-large" id="nextLesson">下一课 →</button></div>`;
    area.querySelector('#nextLesson').onclick=()=>startLesson(course,allLessons,next,0);
  }else area.innerHTML=`<div class="speak-card"><span class="eyebrow">完成</span><h2>这一套课程已经学完。</h2><p>可以回到任意模块重复练习，也可以进入场景课程继续把句子用起来。</p><a class="audio-large" style="display:inline-block;text-decoration:none" href="scenes.html">进入真实场景 →</a></div>`;
  updateSpeakingSummary(lang,course); updateSpeakingModules(lang,course);
  area.scrollIntoView({behavior:'smooth',block:'start'});
}

document.addEventListener('DOMContentLoaded', async ()=>{
  const lang=new URLSearchParams(location.search).get('lang'); window.__speakingLang=(lang==='ru'||lang==='kk')?lang:null;
  await initSpeakingUser(); renderCourseChooser();
});
