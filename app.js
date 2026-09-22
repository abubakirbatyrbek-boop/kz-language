const lessons = [
  { id:'daily-01', course:'daily-kz', title:'日常打招呼', tag:'生活', level:'入门', cn:'您好。', kz:'Сәлеметсіз бе?', ru:'Здравствуйте.', tip:'正式、礼貌地向陌生人打招呼时可以使用。' },
  { id:'daily-02', course:'daily-kz', title:'感谢别人', tag:'生活', level:'入门', cn:'谢谢。', kz:'Рақмет.', ru:'Спасибо.', tip:'两个语言里都是非常高频的礼貌表达。' },
  { id:'daily-03', course:'daily-kz', title:'问现在几点', tag:'生活', level:'入门', cn:'现在几点？', kz:'Қазір сағат неше?', ru:'Который сейчас час?', tip:'问时间时可以直接使用。' },
  { id:'daily-04', course:'daily-kz', title:'我听不懂', tag:'生活', level:'入门', cn:'我听不懂。', kz:'Мен түсінбеймін.', ru:'Я не понимаю.', tip:'交流卡住时先明确告诉对方你没有听懂。' },
  { id:'daily-05', course:'daily-kz', title:'请再说一次', tag:'生活', level:'入门', cn:'请再说一次。', kz:'Қайта айтып жіберіңізші.', ru:'Повторите, пожалуйста.', tip:'适合在工作和生活中请求对方重复。' },
  { id:'daily-06', course:'daily-kz', title:'多少钱', tag:'生活', level:'入门', cn:'多少钱？', kz:'Қанша тұрады?', ru:'Сколько стоит?', tip:'购物、打车、服务咨询都能用。' },
  { id:'daily-07', course:'daily-kz', title:'我要去这里', tag:'生活', level:'入门', cn:'我要去这里。', kz:'Мен мұнда барғым келеді.', ru:'Я хочу поехать сюда.', tip:'打车或问路时可以配合地图直接使用。' },
  { id:'daily-08', course:'daily-kz', title:'在哪里', tag:'生活', level:'入门', cn:'在哪里？', kz:'Қай жерде?', ru:'Где находится?', tip:'询问地点的基础句型。' },
  { id:'daily-09', course:'daily-kz', title:'明天见', tag:'生活', level:'入门', cn:'明天见。', kz:'Ертең көріскенше.', ru:'До завтра.', tip:'结束今天的交流时可以使用。' },
  { id:'daily-10', course:'daily-kz', title:'没问题', tag:'生活', level:'入门', cn:'没问题。', kz:'Мәселе жоқ.', ru:'Без проблем.', tip:'工作沟通里也经常出现。' },

  { id:'log-01', course:'work-ru', title:'货物什么时候到', tag:'物流', level:'实用', cn:'货物什么时候到？', kz:'Жүк қашан келеді?', ru:'Когда прибудет груз?', tip:'物流沟通里的高频句。' },
  { id:'log-02', course:'work-ru', title:'货物到了吗', tag:'物流', level:'实用', cn:'货物到了吗？', kz:'Жүк келді ме?', ru:'Груз прибыл?', tip:'适合向司机、仓库或同事确认状态。' },
  { id:'log-03', course:'work-ru', title:'什么时候装货', tag:'物流', level:'实用', cn:'什么时候开始装货？', kz:'Тиеу қашан басталады?', ru:'Когда начнётся погрузка?', tip:'装车、装箱前确认时间。' },
  { id:'log-04', course:'work-ru', title:'在哪里卸货', tag:'物流', level:'实用', cn:'在哪里卸货？', kz:'Жүкті қай жерде түсіреміз?', ru:'Где разгружать груз?', tip:'现场沟通时直接询问卸货地点。' },
  { id:'log-05', course:'work-ru', title:'请把单据给我', tag:'物流', level:'实用', cn:'请把单据给我。', kz:'Құжаттарды маған беріңізші.', ru:'Дайте мне документы, пожалуйста.', tip:'文件交接时使用。' },
  { id:'log-06', course:'work-ru', title:'司机到了', tag:'物流', level:'实用', cn:'司机到了。', kz:'Жүргізуші келді.', ru:'Водитель приехал.', tip:'通知同事或仓库司机已经到场。' },
  { id:'log-07', course:'work-ru', title:'车还没到', tag:'物流', level:'实用', cn:'车还没到。', kz:'Көлік әлі келген жоқ.', ru:'Машина ещё не приехала.', tip:'延迟时可以直接说明状态。' },
  { id:'log-08', course:'work-ru', title:'请等一下', tag:'物流', level:'实用', cn:'请等一下。', kz:'Күте тұрыңызшы.', ru:'Подождите, пожалуйста.', tip:'让对方稍等时使用。' },
  { id:'log-09', course:'work-ru', title:'这里不能停车', tag:'物流', level:'实用', cn:'这里不能停车。', kz:'Бұл жерде көлік қоюға болмайды.', ru:'Здесь нельзя парковаться.', tip:'装卸区和厂区里很实用。' },
  { id:'log-10', course:'work-ru', title:'什么时候发车', tag:'物流', level:'实用', cn:'什么时候发车？', kz:'Қашан жөнелтіледі?', ru:'Когда отправляется?', tip:'铁路、车辆运输等场景都可继续扩展。' },

  { id:'rail-01', course:'work-kz', title:'火车什么时候发', tag:'铁路', level:'实用', cn:'火车什么时候发车？', kz:'Пойыз қашан жөнеледі?', ru:'Когда отправляется поезд?', tip:'车站和运输计划沟通。' },
  { id:'rail-02', course:'work-kz', title:'这批车皮到了吗', tag:'铁路', level:'实用', cn:'这批车皮到了吗？', kz:'Бұл вагондар келді ме?', ru:'Эти вагоны уже прибыли?', tip:'铁路物流现场常见表达。' },
  { id:'rail-03', course:'work-kz', title:'哪个站', tag:'铁路', level:'实用', cn:'在哪个车站？', kz:'Қай станцияда?', ru:'На какой станции?', tip:'确认接车站或作业站。' },
  { id:'rail-04', course:'work-kz', title:'请确认编号', tag:'铁路', level:'实用', cn:'请确认车厢编号。', kz:'Вагон нөмірін тексеріңізші.', ru:'Проверьте номер вагона, пожалуйста.', tip:'核对车厢信息时使用。' },
  { id:'rail-05', course:'work-kz', title:'什么时候装车', tag:'铁路', level:'实用', cn:'什么时候开始装车？', kz:'Вагонға тиеу қашан басталады?', ru:'Когда начнётся погрузка в вагоны?', tip:'铁路装车作业时间确认。' },

  { id:'factory-01', course:'work-kz', title:'设备坏了', tag:'工厂', level:'实用', cn:'设备坏了。', kz:'Жабдық істен шықты.', ru:'Оборудование сломалось.', tip:'报告设备故障的基础表达。' },
  { id:'factory-02', course:'work-kz', title:'请停机', tag:'工厂', level:'实用', cn:'请停机。', kz:'Жабдықты тоқтатыңызшы.', ru:'Остановите оборудование, пожалуйста.', tip:'操作前要根据现场安全规定沟通。' },
  { id:'factory-03', course:'work-ru', title:'今天几点开会', tag:'工作', level:'实用', cn:'今天几点开会？', kz:'Бүгін жиналыс сағат нешеде?', ru:'Во сколько сегодня совещание?', tip:'工作会议安排。' },
  { id:'factory-04', course:'work-ru', title:'请把这个翻译一下', tag:'工作', level:'实用', cn:'请把这个翻译一下。', kz:'Мынаны аударып беріңізші.', ru:'Переведите это, пожалуйста.', tip:'在多语言工作环境中非常实用。' },
  { id:'factory-05', course:'work-ru', title:'明天再讨论', tag:'工作', level:'实用', cn:'明天再讨论。', kz:'Ертең қайта талқылаймыз.', ru:'Обсудим завтра.', tip:'会议和商务沟通中的常见表达。' }
];

const courses = [
  { id:'daily-kz', icon:'🇰🇿', title:'哈萨克语入门', desc:'从打招呼、问路开始', filter:l => l.course==='daily-kz' },
  { id:'daily-ru', icon:'🇷🇺', title:'俄语入门', desc:'生活场景高频表达', filter:l => l.course==='daily-ru' },
  { id:'work-ru', icon:'🏭', title:'工作俄语', desc:'工厂、物流、商务沟通', filter:l => l.course==='work-ru' },
  { id:'work-kz', icon:'🚛', title:'工作哈语', desc:'铁路、工厂、现场沟通', filter:l => l.course==='work-kz' }
];

const scenes = [
  ['🚕','打车','问价、目的地、下车', 'daily-kz'],
  ['🏠','租房','看房、合同、水电', 'daily-kz'],
  ['🏦','银行','开户、转账、咨询', 'daily-kz'],
  ['🍽','餐厅','点餐、结账、需求', 'daily-kz'],
  ['🏭','工厂','设备、生产、安全', 'factory'],
  ['🚆','铁路','车站、车皮、发运', 'rail'],
  ['📦','海关','报关、查验、放行', 'log'],
  ['🤝','商务','谈价、会议、合同', 'factory']
];

let currentPool = lessons;
let current = Number(localStorage.getItem('currentLesson') || 0);
let completed = JSON.parse(localStorage.getItem('completedLessons') || '[]');

function courseLessons(courseId) {
  if (courseId === 'daily-ru') return lessons.slice(0, 10);
  return lessons.filter(l => l.course === courseId);
}

function filterScene(type) {
  if (type === 'rail') return lessons.filter(l => l.id.startsWith('rail-'));
  if (type === 'log') return lessons.filter(l => l.id.startsWith('log-'));
  if (type === 'factory') return lessons.filter(l => l.id.startsWith('factory-'));
  return lessons.filter(l => l.course === 'daily-kz');
}

function percentFor(pool) {
  if (!pool.length) return 0;
  const done = pool.filter(l => completed.includes(l.id)).length;
  return Math.round(done / pool.length * 100);
}

function renderCourses() {
  const el = document.getElementById('courseGrid');
  el.innerHTML = courses.map(c => {
    const pool = courseLessons(c.id);
    const pct = percentFor(pool);
    return `<button class="course course-btn" data-course="${c.id}">
      <div class="course-icon">${c.icon}</div><h3>${c.title}</h3><p>${c.desc}</p>
      <div class="bar"><i style="width:${pct}%"></i></div>
      <div class="meta"><span>${pool.length} 课</span><span>${pct}%</span></div>
    </button>`;
  }).join('');
}

function renderScenes() {
  document.getElementById('sceneGrid').innerHTML = scenes.map(s => `<button class="scene scene-btn" data-scene="${s[3]}">
    <div><div class="scene-icon">${s[0]}</div><h3>${s[1]}</h3><p>${s[2]}</p></div><div class="tagline">开始场景练习 →</div>
  </button>`).join('');
}

function updateProgress() {
  document.getElementById('progressText').textContent = `${percentFor(lessons)}%`;
  renderCourses();
}

function renderLesson() {
  if (!currentPool.length) return;
  current = Math.max(0, Math.min(current, currentPool.length - 1));
  const l = currentPool[current];
  document.getElementById('lessonTitle').textContent = l.title;
  document.getElementById('lessonTag').textContent = l.tag;
  document.getElementById('lessonLevel').textContent = l.level;
  document.getElementById('cnLine').textContent = l.cn;
  document.getElementById('kzLine').textContent = l.kz;
  document.getElementById('ruLine').textContent = l.ru;
  document.getElementById('lessonTip').textContent = l.tip;
  document.getElementById('lessonCount').textContent = `${current + 1} / ${currentPool.length}`;
  document.getElementById('selectedPath').textContent = `当前内容：${l.tag} · ${l.title}`;
  localStorage.setItem('currentLesson', String(current));
  updateProgress();
}

function setPool(pool, label) {
  currentPool = pool.length ? pool : lessons;
  current = 0;
  document.getElementById('selectedPath').textContent = `当前内容：${label}`;
  renderLesson();
  document.getElementById('lesson').scrollIntoView({behavior:'smooth'});
}

function speak(text, lang) {
  if (!('speechSynthesis' in window)) {
    alert('当前浏览器不支持语音朗读。');
    return;
  }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = 0.88;
  window.speechSynthesis.speak(u);
}

document.getElementById('startLearning').addEventListener('click', () => setPool(lessons.slice(0, 10), '哈萨克语入门'));
document.getElementById('sceneLearning').addEventListener('click', () => document.getElementById('scenes').scrollIntoView({behavior:'smooth'}));

document.addEventListener('click', e => {
  const sound = e.target.closest('[data-text]');
  if (sound) speak(sound.dataset.text, sound.dataset.lang);

  const target = e.target.closest('[data-target]');
  if (target) speak(document.getElementById(target.dataset.target).textContent, target.dataset.lang);

  const courseBtn = e.target.closest('[data-course]');
  if (courseBtn) {
    const id = courseBtn.dataset.course;
    setPool(courseLessons(id), courseBtn.querySelector('h3').textContent);
    return;
  }

  const sceneBtn = e.target.closest('[data-scene]');
  if (sceneBtn) {
    const type = sceneBtn.dataset.scene;
    const map = { rail:['铁路场景', 'rail'], log:['物流场景', 'log'], factory:['工厂/工作场景', 'factory'], 'daily-kz':['生活场景', 'daily'] };
    const [label, key] = map[type] || ['生活场景','daily'];
    setPool(filterScene(key), label);
  }
});

document.getElementById('nextLesson').addEventListener('click', () => {
  const l = currentPool[current];
  if (!completed.includes(l.id)) completed.push(l.id);
  if (current < currentPool.length - 1) current += 1;
  else current = 0;
  localStorage.setItem('completedLessons', JSON.stringify(completed));
  renderLesson();
});

document.getElementById('prevLesson').addEventListener('click', () => {
  current = (current - 1 + currentPool.length) % currentPool.length;
  renderLesson();
});

document.getElementById('resetProgress').addEventListener('click', () => {
  if (!confirm('确定要清空本机学习进度吗？')) return;
  completed = [];
  current = 0;
  localStorage.removeItem('completedLessons');
  localStorage.removeItem('currentLesson');
  renderLesson();
});

renderScenes();
renderCourses();
renderLesson();
