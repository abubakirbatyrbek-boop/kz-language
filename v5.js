/* V5 beginner-first learning engine: pronunciation -> reading -> words -> sentences -> dialogue */
const V5_PATHS = {
  kk: {
    label: '哈萨克语', flag: '🇰🇿',
    desc: '从字母与发音开始，先学会读，再学词、句型、造句，最后进入真实场景。',
    units: [
      {id:'kk-u1',num:1,title:'字母与发音',desc:'认识哈萨克语字母、特殊音、拼读方法',level:'入门',lessons:[
        {id:'kk-u1-l1',title:'先认识字母和声音',type:'intro',items:[
          {symbol:'А а',example:'ана',meaning:'妈妈',note:'和中文“啊”的开头音相近。'},
          {symbol:'Ә ә',example:'әке',meaning:'爸爸',note:'这是哈萨克语很重要的特殊元音，口形比“а”更前。'},
          {symbol:'Ө ө',example:'өзен',meaning:'河流',note:'类似圆唇的“ö”音。'},
          {symbol:'Ү ү',example:'үй',meaning:'房子',note:'类似圆唇的“ü”音。'},
          {symbol:'Қ қ',example:'қала',meaning:'城市',note:'比普通“к”更靠后、更厚。'},
          {symbol:'Ғ ғ',example:'ғалым',meaning:'学者',note:'喉部摩擦音。'},
          {symbol:'Ң ң',example:'аң',meaning:'野兽',note:'类似英语 sing 结尾的 ng 音。'},
          {symbol:'І і',example:'тіл',meaning:'语言',note:'短而清晰的元音。'}
        ]},
        {id:'kk-u1-l2',title:'听音认字',type:'listen',items:[
          ['先听例词“әке”，找出其中的特殊元音。','Ә ә',['Ә ә','Ө ө','Ү ү'],0,'Ә ә'],
          ['先听例词“өзен”，找出其中的特殊元音。','Ө ө',['Ә ә','Ө ө','Ү ү'],1,'Ө ө'],
          ['先听例词“үй”，找出其中的特殊元音。','Ү ү',['Ү ү','Ұ ұ','І і'],0,'Ү ү'],
          ['先听例词“қала”，找出开头的特殊辅音。','Қ қ',['К к','Қ қ','Ғ ғ'],1,'Қ қ']
        ]},
        {id:'kk-u1-l3',title:'拼读短词',type:'select',items:[
          ['“ана”是什么意思？',['妈妈','爸爸','语言'],0,'妈妈'],
          ['“үй”是什么意思？',['城市','房子','河流'],1,'房子'],
          ['“тіл”是什么意思？',['朋友','语言','学者'],1,'语言'],
          ['“қала”是什么意思？',['城市','野兽','车站'],0,'城市']
        ]},
        {id:'kk-u1-l4',title:'发音小练习',type:'listen',items:[
          ['听例词“тіл”，找出开头的字母。','І і',['И и','І і','Й й'],1,'І і'],
          ['听例词“аң”，找出结尾的字母。','Ң ң',['Н н','Ң ң','Г г'],1,'Ң ң'],
          ['听例词“ғалым”，找出开头的字母。','Ғ ғ',['Қ қ','Ғ ғ','Г г'],1,'Ғ ғ']
        ]}
      ]},
      {id:'kk-u2',num:2,title:'拼读与基础词',desc:'先会认、会读，再积累最常用的人称、地点和日常词',level:'入门+',lessons:[
        {id:'kk-u2-l1',title:'人称和高频词',type:'select',items:[
          ['“Мен”是什么意思？',['我','你','他'],0,'我'],
          ['“Сен”是什么意思？',['我','你','他们'],1,'你'],
          ['“үй”是什么意思？',['家/房子','工作','车站'],0,'家/房子'],
          ['“жол”是什么意思？',['路','货物','时间'],0,'路']
        ]},
        {id:'kk-u2-l2',title:'听懂基础词',type:'listen',items:[
          ['听“Мен”，选择对应中文。','Мен',['我','你','他'],0,'我'],
          ['听“Сен”，选择对应中文。','Сен',['我','你','他'],1,'你']
        ]},
        {id:'kk-u2-l3',title:'基础短语',type:'select',items:[
          ['“Рақмет.”是什么意思？',['谢谢','你好','再见'],0,'谢谢'],
          ['“Сәлеметсіз бе.”是什么意思？',['对不起','你好/您好','请等一下'],1,'你好/您好'],
          ['“Кешіріңіз.”是什么意思？',['对不起/不好意思','谢谢','再见'],0,'对不起/不好意思']
        ]}
      ]},
      {id:'kk-u3',num:3,title:'问候与自我介绍',desc:'从固定表达开始，让你第一次能开口交流',level:'初级',lessons:[
        {id:'kk-u3-l1',title:'问候',type:'select',items:[
          ['“你好。”怎么说？',['Сәлеметсіз бе.','Рақмет.','Қайырлы түн.'],0,'Сәлеметсіз бе.'],
          ['“谢谢。”怎么说？',['Кешіріңіз.','Рақмет.','Кездескенше.'],1,'Рақмет.']
        ]},
        {id:'kk-u3-l2',title:'简单介绍自己',type:'translate',items:[
          ['我是中国人。','Мен Қытайданмын.'],
          ['我在哈萨克斯坦工作。','Мен Қазақстанда жұмыс істеймін.']
        ]},
        {id:'kk-u3-l3',title:'第一轮组句',type:'reorder',items:[
          ['组成：你好。',['Сәлеметсіз','бе.'],'Сәлеметсіз бе.'],
          ['组成：我在哈萨克斯坦工作。',['Мен','Қазақстанда','жұмыс','істеймін.'],'Мен Қазақстанда жұмыс істеймін.']
        ]}
      ]},
      {id:'kk-u4',num:4,title:'基本句型',desc:'学会谁 + 在哪里 + 做什么，把词变成完整句子',level:'初级',lessons:[
        {id:'kk-u4-l1',title:'人称 + 动作',type:'select',items:[
          ['“Мен жұмыс істеймін.”是什么意思？',['我工作。','我休息。','我回家。'],0,'我工作。'],
          ['“Ол үйде.”是什么意思？',['他在家。','他在车站。','他在公司。'],0,'他在家。']
        ]},
        {id:'kk-u4-l2',title:'句子重组',type:'reorder',items:[
          ['组成：货物明天到。',['Жүк','ертең','келеді.'],'Жүк ертең келеді.'],
          ['组成：我需要帮助。',['Маған','көмек','керек.'],'Маған көмек керек.']
        ]},
        {id:'kk-u4-l3',title:'自己写一句',type:'write',items:[
          ['请用“Қазақстанда”造一句完整的话。','Мен Қазақстанда жұмыс істеймін.'],
          ['请用“ертең”造一句完整的话。','Мен ертең жұмыс істеймін.']
        ]}
      ]},
      {id:'kk-u5',num:5,title:'生活交流与造句',desc:'时间、地点、价格、方向，并开始自己组织表达',level:'初级+',lessons:[
        {id:'kk-u5-l1',title:'常用问句',type:'select',items:[
          ['“现在几点？”怎么说？',['Қай жерде?','Қазір сағат неше?','Қанша тұрады?'],1,'Қазір сағат неше?'],
          ['“多少钱？”怎么说？',['Қанша тұрады?','Қайырлы таң.','Кешіріңіз.'],0,'Қанша тұрады?']
        ]},
        {id:'kk-u5-l2',title:'中文 → 哈语',type:'translate',items:[
          ['在哪里？','Қай жерде?'],
          ['请等一下。','Күте тұрыңызшы.'],
          ['我要去车站。','Мен вокзалға барғым келеді.']
        ]},
        {id:'kk-u5-l3',title:'自己造句',type:'write',items:[
          ['请用“вокзалға”表达：我要去车站。','Мен вокзалға барғым келеді.'],
          ['请用“көмек”表达：我需要帮助。','Маған көмек керек.']
        ]}
      ]},
      {id:'kk-u6',num:6,title:'真实场景：物流与铁路',desc:'在车站、仓库、装卸现场直接使用',level:'实用',lessons:[
        {id:'kk-u6-l1',title:'铁路高频句',type:'select',items:[
          ['“火车什么时候发车？”',['Пойыз қашан жөнеледі?','Пойыз қайда?','Вагон қайда?'],0,'Пойыз қашан жөнеледі?'],
          ['“请确认车厢编号。”',['Құжаттарды беріңізші.','Вагон нөмірін тексеріңізші.','Пойызды күтіңіз.'],1,'Вагон нөмірін тексеріңізші.']
        ]},
        {id:'kk-u6-l2',title:'现场翻译',type:'translate',items:[
          ['什么时候开始装车？','Вагонға тиеу қашан басталады?'],
          ['请把单据给我。','Құжаттарды маған беріңізші.']
        ]},
        {id:'kk-u6-l3',title:'场景造句',type:'write',items:[
          ['告诉同事“货还没到”。','Жүк әлі келген жоқ.'],
          ['问“在哪里卸货？”。','Жүкті қай жерде түсіреміз?']
        ]}
      ]}
    ]
  },
  ru: {
    label: '俄语', flag:'🇷🇺',
    desc: '从字母、发音和拼读开始，逐步进入词汇、句型、造句和真实交流。',
    units: [
      {id:'ru-u1',num:1,title:'字母与发音',desc:'认识俄文字母、元音辅音、重音和常见发音',level:'入门',lessons:[
        {id:'ru-u1-l1',title:'先认识字母和声音',type:'intro',items:[
          {symbol:'А а',example:'мама',meaning:'妈妈',note:'基础元音，先把声音读清楚。'},
          {symbol:'О о',example:'он',meaning:'他',note:'重读时口形明显；非重读时会弱化，先记重读读法。'},
          {symbol:'У у',example:'утро',meaning:'早晨',note:'圆唇“u”音。'},
          {symbol:'Э э',example:'это',meaning:'这/这是',note:'清楚的“e”音，不是软化音。'},
          {symbol:'Ы ы',example:'мы',meaning:'我们',note:'俄语学习者常见难点，舌位更靠后。'},
          {symbol:'И и',example:'мир',meaning:'世界/和平',note:'“i”音，同时会让前面的辅音变软。'},
          {symbol:'Й й',example:'чай',meaning:'茶',note:'短促的 y/j 近似音。'},
          {symbol:'Ж ж',example:'жить',meaning:'生活',note:'浊辅音“zh”音。'},
          {symbol:'Ш ш',example:'шар',meaning:'球',note:'硬的“sh”音。'},
          {symbol:'Ч ч',example:'чай',meaning:'茶',note:'清晰的“ch”音。'}
        ]},
        {id:'ru-u1-l2',title:'听音认字',type:'listen',items:[
          ['听例词“мы”，找出特殊元音。','Ы ы',['И и','Ы ы','У у'],1,'Ы ы'],
          ['听例词“чай”，找出开头的辅音。','Ч ч',['Ш ш','Ч ч','Щ щ'],1,'Ч ч'],
          ['听例词“жить”，找出开头的辅音。','Ж ж',['Ж ж','Ш ш','Ч ч'],0,'Ж ж'],
          ['听例词“шар”，找出开头的辅音。','Ш ш',['С с','Ш ш','Ж ж'],1,'Ш ш']
        ]},
        {id:'ru-u1-l3',title:'拼读短词',type:'select',items:[
          ['“мама”是什么意思？',['妈妈','爸爸','世界'],0,'妈妈'],
          ['“чай”是什么意思？',['茶','水','早晨'],0,'茶'],
          ['“утро”是什么意思？',['晚上','早晨','道路'],1,'早晨'],
          ['“мир”是什么意思？',['工作','语言','世界/和平'],2,'世界/和平']
        ]},
        {id:'ru-u1-l4',title:'发音小练习',type:'listen',items:[
          ['听“мы”，找出开头字母。','М м',['М м','Н н','В в'],0,'М м'],
          ['听“чай”，找出结尾字母。','Й й',['Й й','И и','Л л'],0,'Й й'],
          ['听“это”，找出开头字母。','Э э',['Е е','Э э','А а'],1,'Э э']
        ]}
      ]},
      {id:'ru-u2',num:2,title:'拼读与基础词',desc:'先读准最常用词，再学人称、地点和日常表达',level:'入门+',lessons:[
        {id:'ru-u2-l1',title:'人称和高频词',type:'select',items:[
          ['“Я”是什么意思？',['我','你','他'],0,'我'],
          ['“Ты”是什么意思？',['我','你','他们'],1,'你'],
          ['“дом”是什么意思？',['家','工作','车站'],0,'家'],
          ['“дорога”是什么意思？',['路','货物','时间'],0,'路']
        ]},
        {id:'ru-u2-l2',title:'基础短语',type:'select',items:[
          ['“Спасибо.”是什么意思？',['谢谢','你好','再见'],0,'谢谢'],
          ['“Здравствуйте.”是什么意思？',['对不起','你好/您好','请等一下'],1,'你好/您好'],
          ['“Извините.”是什么意思？',['对不起/不好意思','谢谢','再见'],0,'对不起/不好意思']
        ]},
        {id:'ru-u2-l3',title:'听懂基础词',type:'listen',items:[
          ['听“Я”，选择对应中文。','Я',['我','你','他'],0,'我'],
          ['听“Ты”，选择对应中文。','Ты',['我','你','他'],1,'你']
        ]}
      ]},
      {id:'ru-u3',num:3,title:'问候与自我介绍',desc:'从固定表达开始，让你第一次能开口交流',level:'初级',lessons:[
        {id:'ru-u3-l1',title:'问候',type:'select',items:[
          ['“你好。”怎么说？',['Здравствуйте.','Спасибо.','Доброй ночи.'],0,'Здравствуйте.'],
          ['“谢谢。”怎么说？',['Извините.','Спасибо.','До свидания.'],1,'Спасибо.']
        ]},
        {id:'ru-u3-l2',title:'简单介绍自己',type:'translate',items:[
          ['我是中国人。','Я из Китая.'],
          ['我在哈萨克斯坦工作。','Я работаю в Казахстане.']
        ]},
        {id:'ru-u3-l3',title:'第一轮组句',type:'reorder',items:[
          ['组成：你好。',['Здравствуйте.'],'Здравствуйте.'],
          ['组成：我在哈萨克斯坦工作。',['Я','работаю','в','Казахстане.'],'Я работаю в Казахстане.']
        ]}
      ]},
      {id:'ru-u4',num:4,title:'基本句型',desc:'学会谁 + 在哪里 + 做什么，把词变成完整句子',level:'初级',lessons:[
        {id:'ru-u4-l1',title:'人称 + 动作',type:'select',items:[
          ['“Я работаю.”是什么意思？',['我工作。','我休息。','我回家。'],0,'我工作。'],
          ['“Он дома.”是什么意思？',['他在家。','他在车站。','他在公司。'],0,'他在家。']
        ]},
        {id:'ru-u4-l2',title:'句子重组',type:'reorder',items:[
          ['组成：货物明天到。',['Груз','прибудет','завтра.'],'Груз прибудет завтра.'],
          ['组成：需要准备文件。',['Нужно','подготовить','документы.'],'Нужно подготовить документы.']
        ]},
        {id:'ru-u4-l3',title:'自己写一句',type:'write',items:[
          ['请用“Казахстане”造一句完整的话。','Я работаю в Казахстане.'],
          ['请用“завтра”造一句完整的话。','Я завтра работаю.']
        ]}
      ]},
      {id:'ru-u5',num:5,title:'生活交流与造句',desc:'时间、地点、价格、方向，并开始自己组织表达',level:'初级+',lessons:[
        {id:'ru-u5-l1',title:'常用问句',type:'select',items:[
          ['“现在几点？”怎么说？',['Где находится?','Который сейчас час?','Сколько стоит?'],1,'Который сейчас час?'],
          ['“多少钱？”怎么说？',['Сколько стоит?','Доброе утро.','Извините.'],0,'Сколько стоит?']
        ]},
        {id:'ru-u5-l2',title:'中文 → 俄语',type:'translate',items:[
          ['在哪里？','Где находится?'],
          ['请等一下。','Подождите, пожалуйста.'],
          ['我要去车站。','Я хочу поехать на вокзал.']
        ]},
        {id:'ru-u5-l3',title:'自己造句',type:'write',items:[
          ['请用“вокзал”表达：我要去车站。','Я хочу поехать на вокзал.'],
          ['请用“помощь”表达：我需要帮助。','Мне нужна помощь.']
        ]}
      ]},
      {id:'ru-u6',num:6,title:'真实场景：物流与工厂',desc:'现场沟通、装卸、设备和文件',level:'实用',lessons:[
        {id:'ru-u6-l1',title:'工作高频句',type:'select',items:[
          ['“货物什么时候到？”',['Когда прибудет груз?','Когда начнётся работа?','Где водитель?'],0,'Когда прибудет груз?'],
          ['“请把单据给我。”',['Дайте мне документы, пожалуйста.','Закройте дверь, пожалуйста.','Подождите здесь.'],0,'Дайте мне документы, пожалуйста.']
        ]},
        {id:'ru-u6-l2',title:'现场翻译',type:'translate',items:[
          ['什么时候开始装货？','Когда начнётся погрузка?'],
          ['设备坏了。','Оборудование сломалось.']
        ]},
        {id:'ru-u6-l3',title:'场景造句',type:'write',items:[
          ['告诉同事“车还没到”。','Машина ещё не приехала.'],
          ['说“这里不能停车”。','Здесь нельзя парковаться.']
        ]}
      ]}
    ]
  }
};

function qs(name){return new URLSearchParams(location.search).get(name)}
function langKey(){return qs('lang')==='ru'?'ru':'kk'}
function getPath(){return V5_PATHS[langKey()]}
function qs(name){return new URLSearchParams(location.search).get(name)}
function langKey(){return qs('lang')==='ru'?'ru':'kk'}
function getPath(){return V5_PATHS[langKey()]}
function nodeKey(k){return 'v5:'+k}
function currentUserKey(){return getUser()?.id ? `v5_progress_user_${getUser().id}` : 'v5_progress_guest'}
function localProgress(){
  try {
    const legacy=localStorage.getItem('v5_progress');
    if(legacy && !localStorage.getItem('v5_progress_guest')) localStorage.setItem('v5_progress_guest',legacy);
    return JSON.parse(localStorage.getItem(currentUserKey())||'{}');
  } catch { return {}; }
}
function saveLocal(k,v){const p=localProgress();p[k]=v;localStorage.setItem(currentUserKey(),JSON.stringify(p))}
function getUser(){return window.__v5User||null}
function supabaseConfigured(){return !!(window.supabase&&window.SUPABASE_CONFIG?.url&&window.SUPABASE_CONFIG?.publishableKey&&!String(window.SUPABASE_CONFIG.url).includes('YOUR-PROJECT')&&!String(window.SUPABASE_CONFIG.publishableKey).includes('YOUR_SUPABASE'))}
async function initUser(){
  try {
    if(!supabaseConfigured()) return getUser();
    const c=window.supabase.createClient(window.SUPABASE_CONFIG.url,window.SUPABASE_CONFIG.publishableKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
    window.__v5Supabase=c;
    const {data:authData}=await c.auth.getSession();
    window.__v5User=authData?.session?.user||null;
    if(window.__v5User){
      const guestKey='v5_progress_guest';
      const guestRaw=localStorage.getItem(guestKey);
      const {data:rows}=await c.from('learning_progress').select('node_id,language,status,score,updated_at').eq('user_id',window.__v5User.id).limit(2000);
      const remote={};
      if(Array.isArray(rows)) rows.forEach(r=>remote[r.node_id]={language:r.language,status:r.status,score:r.score,updated_at:r.updated_at});
      let guest={};
      try{guest=JSON.parse(guestRaw||'{}')}catch{guest={}}
      const merged={...guest,...remote};
      localStorage.setItem(currentUserKey(),JSON.stringify(merged));
      // One-time migration of guest progress into the first logged-in account.
      if(guestRaw && !localStorage.getItem(`v5_guest_migrated_${window.__v5User.id}`)){
        const rowsToUpload=Object.entries(guest).filter(([node_id])=>!remote[node_id]).map(([node_id,v])=>({user_id:window.__v5User.id,node_id,language:v.language||langKey(),status:v.status||'in_progress',score:v.score??null,updated_at:v.updated_at||new Date().toISOString()}));
        if(rowsToUpload.length){try{await c.from('learning_progress').upsert(rowsToUpload,{onConflict:'user_id,node_id'})}catch(e){console.warn('guest migration failed',e)}}
        localStorage.setItem(`v5_guest_migrated_${window.__v5User.id}`,'1');
      }
    }
  } catch(e){console.warn('auth/progress init failed',e)}
  return getUser();
}
async function saveRemoteProgress(nodeId,data){
  saveLocal(nodeId,data);
  const u=getUser(),s=window.__v5Supabase;
  if(!u||!s)return;
  try{await s.from('learning_progress').upsert({user_id:u.id,node_id:nodeId,language:data.language,status:data.status||'in_progress',score:data.score??null,updated_at:new Date().toISOString()},{onConflict:'user_id,node_id'})}catch(e){console.warn('remote progress failed',e)}
}
async function saveTestResult(nodeId,data){
  const u=getUser(),s=window.__v5Supabase;
  if(!u||!s)return;
  try{await s.from('test_results').insert({user_id:u.id,node_id:nodeId,language:data.language,score:data.score,passed:data.passed,answers:data.answers||[],created_at:new Date().toISOString()})}catch(e){console.warn('remote test failed',e)}
}
function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
function calcUnitState(unit){const p=localProgress(),done=unit.lessons.filter(l=>p[nodeKey(l.id)]?.status==='done').length,test=p[nodeKey(unit.id)]?.status==='passed';return {done,total:unit.lessons.length,percent:Math.round(done/unit.lessons.length*100),test}}
function requiresAccount(path,idx){return !!getUser()===false && idx>=3}
function unitUnlocked(path,idx){
  if(idx===0)return true;
  if(requiresAccount(path,idx))return false;
  return !!calcUnitState(path.units[idx-1]).test;
}
function loginGate(path,unit,idx){
  const next=encodeURIComponent(`unit.html?lang=${langKey()}&unit=${unit.id}`);
  return `<div class="login-gate"><span class="eyebrow">免费体验到这里</span><h2>完成前 3 个单元后，请注册 / 登录继续</h2><p>前面的课程可以先免费体验。注册后，我们会把你的学习进度和考试成绩绑定到这个账号，换设备也能继续。</p><div class="gate-stats"><span>✅ 前 3 单元可体验</span><span>☁️ 登录后云端保存进度</span><span>📊 可查看考试成绩</span></div><div class="result-actions"><a class="secondary-btn" href="path.html?lang=${langKey()}">返回学习路径</a><a class="primary-btn" href="auth.html?mode=signup&next=${next}">注册 / 登录</a></div></div>`;
}
function speak(text,lang){if(!('speechSynthesis' in window)){alert('当前浏览器不支持语音朗读');return}window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=lang==='kk'?'kk-KZ':'ru-RU';u.rate=0.86;u.pitch=1;window.speechSynthesis.speak(u)}
function renderPath(){
  const path=getPath();
  document.title=`${path.label}学习路径｜中亚语言通`;
  document.getElementById('pathTitle').textContent=`${path.flag} ${path.label}`;
  document.getElementById('pathDesc').textContent=getUser()?path.desc:`${path.desc} 前 3 个单元免费体验，注册后可保存进度并继续。`;
  const unlocked=path.units.filter((u,i)=>unitUnlocked(path,i)).length;
  document.getElementById('pathStats').innerHTML=`<div><b>${unlocked}</b><span>当前可进入</span></div><div><b>${path.units.length}</b><span>总单元</span></div><div><b>${getUser()?'已登录':'游客'}</b><span>${getUser()?'进度云端同步':'完成3关后注册'}</span></div>`;
  document.getElementById('pathList').innerHTML=path.units.map((u,i)=>{
    const open=unitUnlocked(path,i),st=calcUnitState(u),gate=requiresAccount(path,i);
    let action='';
    if(open) action=`<a class="primary-btn small" href="unit.html?lang=${langKey()}&unit=${u.id}">${st.percent?'继续':'开始'} →</a>`;
    else if(gate) action=getUser()?`<span class="lock-copy">通过上一单元考试后解锁</span>`:`<a class="secondary-btn small" href="auth.html?mode=signup&next=${encodeURIComponent(`path.html?lang=${langKey()}`)}">注册 / 登录后继续</a>`;
    else action=`<span class="lock-copy">通过上一单元考试后解锁</span>`;
    return `<div class="path-node ${open?'open':'locked'} ${gate?'account-locked':''}"><div class="node-num">${open?u.num:'🔒'}</div><div class="node-main"><div class="node-top"><span class="eyebrow">UNIT ${u.num} · ${u.level}</span><span>${st.test?'✅ 已通过':st.percent+'%'}</span></div><h3>${u.title}</h3><p>${u.desc}</p><div class="progress-track"><span style="width:${st.percent}%"></span></div></div><div class="node-action">${action}</div></div>`;
  }).join('');
}
function renderUnit(){
  const path=getPath(),unitId=qs('unit')||path.units[0].id,unit=path.units.find(u=>u.id===unitId);
  if(!unit)return location.href=`path.html?lang=${langKey()}`;
  const idx=path.units.indexOf(unit);
  if(requiresAccount(path,idx) && !getUser()){document.getElementById('backLink').href=`path.html?lang=${langKey()}`;document.getElementById('unitHeader').innerHTML=loginGate(path,unit,idx);document.getElementById('lessonList').innerHTML='';return;}
  if(!unitUnlocked(path,idx))return location.href=`path.html?lang=${langKey()}`;
  document.getElementById('backLink').href=`path.html?lang=${langKey()}`;
  const st=calcUnitState(unit);
  document.getElementById('unitHeader').innerHTML=`<span class="eyebrow">UNIT ${unit.num} · ${unit.level}</span><h1>${unit.title}</h1><p>${unit.desc}</p><div class="unit-meter"><span>${st.done}/${st.total} 小课完成</span><div class="progress-track"><span style="width:${st.percent}%"></span></div></div>`;
  document.getElementById('lessonList').innerHTML=unit.lessons.map((l,i)=>{const done=localProgress()[nodeKey(l.id)]?.status==='done';const typeLabel={intro:'认识发音',listen:'听音选择',select:'认识词语',translate:'翻译',reorder:'组句',write:'造句'}[l.type]||'练习';return `<a class="lesson-row ${done?'done':''}" href="lesson-v4.html?lang=${langKey()}&unit=${unit.id}&lesson=${l.id}"><div class="lesson-index">${done?'✓':i+1}</div><div><strong>${l.title}</strong><span>${typeLabel}</span></div><b>${done?'已完成':'开始 →'}</b></a>`}).join('')+`<div class="unit-test-card"><div><span class="eyebrow">UNIT TEST</span><h3>单元考试</h3><p>必须先完成本单元所有小课，再参加测试；达到 80% 才能解锁下一单元。</p></div><a class="primary-btn" href="quiz-v4.html?lang=${langKey()}&unit=${unit.id}">参加考试 →</a></div>`;
}
function renderLesson(){
  const path=getPath(),unit=path.units.find(u=>u.id===qs('unit')),lesson=unit?.lessons.find(l=>l.id===qs('lesson'));
  if(!lesson)return;
  const idx=unit?path.units.indexOf(unit):-1;
  if(unit && requiresAccount(path,idx) && !getUser()){document.getElementById('lessonTop').innerHTML=loginGate(path,unit,idx);document.getElementById('exerciseArea').innerHTML='';return;}
  if(unit && !unitUnlocked(path,idx)){location.href=`path.html?lang=${langKey()}`;return;}
  document.getElementById('lessonTop').innerHTML=`<a class="back-link" href="unit.html?lang=${langKey()}&unit=${unit.id}">← ${unit.title}</a><span class="eyebrow">小课 · ${unit.num}</span><h1>${lesson.title}</h1><p>从最简单的一步开始，完成本小课后再进入下一项。</p>`;
  const area=document.getElementById('exerciseArea');let i=0,score=0;const items=lesson.items;function finish(){const pct=Math.round(score/items.length*100);saveRemoteProgress(lesson.id,{language:langKey(),status:'done',score:pct});area.innerHTML=`<div class="result-card"><span class="eyebrow">完成</span><h2>本小课完成！</h2><div class="score-big">${pct}%</div><p>你完成了 ${items.length} 个练习。${getUser()?'进度已同步到账号。':'当前为游客模式，进度仅保存在本设备。'}</p><a class="primary-btn" href="unit.html?lang=${langKey()}&unit=${unit.id}">返回单元 →</a></div>`}
  function next(){if(i>=items.length){finish();return}const it=items[i];const meta=`<div class="exercise-meta"><span>${i+1} / ${items.length}</span><div class="progress-track"><span style="width:${Math.round(i/items.length*100)}%"></span></div></div>`;
  if(lesson.type==='intro'){area.innerHTML=meta+`<div class="exercise-card pronunciation-card"><span class="eyebrow">认识发音</span><div class="pronunciation-item"><div class="sound-symbol">${it.symbol}</div><button class="pronunciation-audio" id="playSymbol" type="button">🔊 听字母</button></div><div class="pronunciation-item"><h2>${it.example}</h2><button class="pronunciation-audio" id="playExample" type="button">🔊 听单词</button></div><p class="meaning">${it.meaning}</p><p class="hint">${it.note}</p><div class="pronunciation-actions"><button class="secondary-btn" id="knowIt">我会了，下一张 →</button></div></div>`;area.querySelector('#playSymbol').onclick=()=>speak(it.symbol.replace(/\s+/g,' '),langKey());area.querySelector('#playExample').onclick=()=>speak(it.example,langKey());area.querySelector('#knowIt').onclick=()=>{score++;i++;next()};return}
  if(lesson.type==='listen'||lesson.type==='select'){const prompt=it[0],audioText=lesson.type==='listen'?it[1]:null,options=Array.isArray(it[2])?it[2]:it[1],correct=Number.isInteger(it[3])?it[3]:0;area.innerHTML=meta+`<div class="exercise-card"><span class="eyebrow">${lesson.type==='listen'?'先听再选':'认识词语'}</span><h2>${prompt}</h2>${audioText?`<button class="audio-btn" id="playAudio">🔊 播放 ${audioText}</button>`:''}${options.map((x,j)=>`<button class="answer-option" data-j="${j}">${x}</button>`).join('')}</div>`;if(audioText)area.querySelector('#playAudio').onclick=()=>speak(audioText,langKey());area.querySelectorAll('.answer-option').forEach(b=>b.onclick=()=>{const ok=+b.dataset.j===correct;if(ok)score++;area.querySelectorAll('.answer-option').forEach(x=>x.disabled=true);b.classList.add(ok?'correct':'wrong');if(!ok){const right=area.querySelector(`[data-j="${correct}"]`);if(right)right.classList.add('correct')}const fb=document.createElement('div');fb.className='feedback-box '+(ok?'good':'bad');fb.textContent=ok?'正确！':'看看绿色的正确答案。';area.querySelector('.exercise-card').appendChild(fb);setTimeout(()=>{i++;next()},650)});return}
  if(lesson.type==='translate'||lesson.type==='write'){const answer=it[1];const title=lesson.type==='translate'?`中文 → ${path.label}`:'自己造句';area.innerHTML=meta+`<div class="exercise-card"><span class="eyebrow">${title}</span><h2>${it[0]}</h2><textarea id="textAnswer" class="answer-input" rows="3" placeholder="写出你的答案"></textarea><button id="submitText" class="primary-btn">提交答案</button><p class="hint">初学阶段先用标准答案帮助建立正确句型；后续可以接 AI 语义评分。</p></div>`;area.querySelector('#submitText').onclick=()=>{const v=area.querySelector('#textAnswer').value.trim();const ok=v===answer;if(ok)score++;area.querySelector('#textAnswer').disabled=true;area.querySelector('#submitText').disabled=true;const fb=document.createElement('div');fb.className='feedback-box '+(ok?'good':'bad');fb.textContent=ok?'正确！':`参考表达：${answer}`;area.querySelector('.exercise-card').appendChild(fb);setTimeout(()=>{i++;next()},900)};return}
  if(lesson.type==='reorder'){const phrase=shuffle(it[1]);area.innerHTML=meta+`<div class="exercise-card"><span class="eyebrow">组句</span><h2>${it[0]}</h2><div id="chips" class="chip-bank">${phrase.map((x,j)=>`<button class="word-chip" data-word="${x}" data-id="${j}">${x}</button>`).join('')}</div><div id="chosen" class="chosen-line"></div><button id="checkOrder" class="primary-btn" disabled>检查句子</button></div>`;const chosen=[];area.querySelectorAll('.word-chip').forEach(b=>b.onclick=()=>{if(b.disabled)return;chosen.push(b.dataset.word);b.disabled=true;area.querySelector('#chosen').textContent=chosen.join(' ');area.querySelector('#checkOrder').disabled=false});area.querySelector('#checkOrder').onclick=()=>{const expected=it[2],got=chosen.join(' '),ok=got===expected;if(ok)score++;const fb=document.createElement('div');fb.className='feedback-box '+(ok?'good':'bad');fb.textContent=ok?'组句正确！':`正确顺序：${expected}`;area.querySelector('.exercise-card').appendChild(fb);area.querySelector('#checkOrder').disabled=true;setTimeout(()=>{i++;next()},900)};return}
  }
  next()
}
function normalizeQuestion(l,it){if(l.type==='listen'){return {type:'select',prompt:it[0],options:it[2],correct:it[3],audio:it[1]}}if(l.type==='select'){return {type:'select',prompt:it[0],options:it[2],correct:it[3]}}if(l.type==='translate'||l.type==='write'){return {type:l.type,prompt:it[0],answer:it[1]}}if(l.type==='reorder'){return {type:l.type,prompt:it[0],words:it[1],answer:it[2]}}return null}
function renderQuiz(){
  const path=getPath(),unit=path.units.find(u=>u.id===qs('unit'));
  if(!unit)return;
  const idx=path.units.indexOf(unit);
  if(requiresAccount(path,idx) && !getUser()){document.getElementById('quizArea').innerHTML=loginGate(path,unit,idx);return;}
  if(!unitUnlocked(path,idx)){document.getElementById('quizArea').innerHTML=`<div class="result-card"><h2>这个单元还没有解锁</h2><a class="primary-btn" href="path.html?lang=${langKey()}">返回学习路径 →</a></div>`;return}
  const ready=unit.lessons.every(l=>localProgress()[nodeKey(l.id)]?.status==='done');
  if(!ready){document.getElementById('quizArea').innerHTML=`<div class="result-card"><span class="eyebrow">UNIT TEST</span><h2>先完成本单元的小课</h2><p>你需要完成所有 ${unit.lessons.length} 个小课，之后才能参加单元考试。</p><a class="primary-btn" href="unit.html?lang=${langKey()}&unit=${unit.id}">返回单元 →</a></div>`;return}
  const all=[];unit.lessons.forEach(l=>l.items.forEach(it=>{const q=normalizeQuestion(l,it);if(q)all.push(q)}));const q=shuffle(all).slice(0,Math.min(10,all.length));let i=0,score=0,answers=[];
  function draw(){const area=document.getElementById('quizArea');if(i>=q.length){const pct=Math.round(score/q.length*100),passed=pct>=80;saveRemoteProgress(unit.id,{language:langKey(),status:passed?'passed':'failed',score:pct});saveTestResult(unit.id,{language:langKey(),score:pct,passed,answers});area.innerHTML=`<div class="result-card ${passed?'pass':'fail'}"><span class="eyebrow">UNIT TEST</span><h1>${passed?'恭喜过关！':'还差一点'}</h1><div class="score-big">${pct}%</div><p>答对 ${score} / ${q.length}。${passed?'下一单元已解锁。':'需要达到 80%，回去复习后再试一次。'}</p><div class="result-actions"><a class="secondary-btn" href="unit.html?lang=${langKey()}&unit=${unit.id}">返回单元</a><a class="primary-btn" href="path.html?lang=${langKey()}">返回路线 →</a></div></div>`;return}const x=q[i];let html=`<div class="quiz-head"><div><span class="eyebrow">UNIT TEST · ${i+1}/${q.length}</span><h1>${unit.title}</h1></div><div class="quiz-score">${score} 分</div></div><div class="exercise-card"><h2>${x.prompt}</h2>`;if(x.audio)html+=`<button class="audio-btn" id="quizAudio">🔊 播放听力</button>`;if(x.type==='select')html+=x.options.map((o,j)=>`<button class="answer-option" data-j="${j}">${o}</button>`).join('');else if(x.type==='translate'||x.type==='write')html+=`<textarea id="quizInput" class="answer-input" rows="3" placeholder="请输入答案"></textarea><button class="primary-btn" id="quizSubmit">提交</button>`;else html+=`<div class="chip-bank">${shuffle(x.words).map(w=>`<button class="word-chip" data-word="${w}">${w}</button>`).join('')}</div><div id="chosen" class="chosen-line"></div><button class="primary-btn" id="quizSubmit" disabled>检查句子</button>`;html+='</div>';area.innerHTML=html;if(x.audio)area.querySelector('#quizAudio').onclick=()=>speak(x.audio,langKey());if(x.type==='select'){area.querySelectorAll('.answer-option').forEach(b=>b.onclick=()=>{const ok=+b.dataset.j===x.correct;if(ok)score++;answers.push({prompt:x.prompt,correct:ok});area.querySelectorAll('.answer-option').forEach(z=>z.disabled=true);b.classList.add(ok?'correct':'wrong');if(!ok){const right=area.querySelector(`[data-j="${x.correct}"]`);if(right)right.classList.add('correct')}const box=document.createElement('div');box.className='feedback-box '+(ok?'good':'bad');box.textContent=ok?'正确！':'再看一下正确答案。';area.querySelector('.exercise-card').appendChild(box);setTimeout(()=>{i++;draw()},650)})}else if(x.type==='translate'||x.type==='write'){area.querySelector('#quizSubmit').onclick=()=>{const v=area.querySelector('#quizInput').value.trim(),ok=v===x.answer;if(ok)score++;answers.push({prompt:x.prompt,correct:ok});area.querySelector('#quizInput').disabled=true;area.querySelector('#quizSubmit').disabled=true;const box=document.createElement('div');box.className='feedback-box '+(ok?'good':'bad');box.textContent=ok?'正确！':`参考答案：${x.answer}`;area.querySelector('.exercise-card').appendChild(box);setTimeout(()=>{i++;draw()},900)}}else{const chosen=[];area.querySelectorAll('.word-chip').forEach(b=>b.onclick=()=>{if(b.disabled)return;chosen.push(b.dataset.word);b.disabled=true;area.querySelector('#chosen').textContent=chosen.join(' ');area.querySelector('#quizSubmit').disabled=false});area.querySelector('#quizSubmit').onclick=()=>{const ok=chosen.join(' ')===x.answer;if(ok)score++;answers.push({prompt:x.prompt,correct:ok});const box=document.createElement('div');box.className='feedback-box '+(ok?'good':'bad');box.textContent=ok?'正确！':`正确顺序：${x.answer}`;area.querySelector('.exercise-card').appendChild(box);area.querySelector('#quizSubmit').disabled=true;setTimeout(()=>{i++;draw()},900)}}}
  draw()
}
function renderProgress(){initUser().then(()=>{const p=localProgress(),paths=[V5_PATHS.kk,V5_PATHS.ru];const u=getUser();document.getElementById('progressUser').textContent=u?`当前账号：${u.email}。学习进度将同步到云端。`:'当前为游客模式，完成前 3 个单元后注册，可把进度同步到账号。';document.getElementById('progressDashboard').innerHTML=paths.map(path=>{const passed=path.units.filter(u=>p[nodeKey(u.id)]?.status==='passed').length,done=path.units.reduce((n,u)=>n+u.lessons.filter(l=>p[nodeKey(l.id)]?.status==='done').length,0),total=path.units.reduce((n,u)=>n+u.lessons.length,0),pct=Math.round(done/total*100);const rows=path.units.map((unit,idx)=>{const st=calcUnitState(unit);const gate=requiresAccount(path,idx);let state=st.test?'✅ 已通过':gate&&!getUser()?'🔐 注册后继续':st.percent?`学习中 · ${st.percent}%`:'未开始';return `<div class="mini-unit-row"><span>${unit.num}. ${unit.title}</span><b>${state}</b></div>`}).join('');return `<div class="dashboard-card"><div class="dashboard-title"><span>${path.flag} ${path.label}</span><b>${pct}%</b></div><div class="progress-track"><span style="width:${pct}%"></span></div><p>${passed}/${path.units.length} 个单元通过 · ${done}/${total} 小课完成</p><div class="mini-unit-list">${rows}</div><a class="secondary-btn" href="path.html?lang=${path===V5_PATHS.kk?'kk':'ru'}">继续学习 →</a></div>`}).join('')})}
(async function(){await initUser();const page=document.body.querySelector('#pathList')?'path':document.body.querySelector('#lessonList')?'unit':document.body.querySelector('#exerciseArea')?'lesson':document.body.querySelector('#quizArea')?'quiz':document.body.querySelector('#progressDashboard')?'progress':'home';if(page==='path')renderPath();else if(page==='unit')renderUnit();else if(page==='lesson')renderLesson();else if(page==='quiz')renderQuiz();else if(page==='progress')renderProgress()})()
