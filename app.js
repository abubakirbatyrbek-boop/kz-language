const lessons = [
  { title: '日常打招呼', tag: '生活', level: '入门', cn: '您好。', kz: 'Сәлеметсіз бе?', ru: 'Здравствуйте.', tip: '正式、礼貌地向陌生人打招呼时可以使用。' },
  { title: '感谢别人', tag: '生活', level: '入门', cn: '谢谢。', kz: 'Рақмет.', ru: 'Спасибо.', tip: '两个语言里都属于非常高频的礼貌表达。' },
  { title: '询问时间', tag: '生活', level: '入门', cn: '现在几点？', kz: 'Қазір сағат неше?', ru: 'Который сейчас час?', tip: '问时间时可以直接使用这两个句型。' },
  { title: '货物到达', tag: '物流', level: '实用', cn: '货物什么时候到？', kz: 'Жүк қашан келеді?', ru: 'Когда прибудет груз?', tip: '物流沟通里的高频句，适合直接记下来。' }
];

const courses = [
  { id:'daily-kz', icon:'🇰🇿', title:'哈萨克语入门', desc:'从打招呼、问路开始', lessons: 30 },
  { id:'daily-ru', icon:'🇷🇺', title:'俄语入门', desc:'生活场景高频表达', lessons: 30 },
  { id:'work-ru', icon:'🏭', title:'工作俄语', desc:'工厂、物流、工程沟通', lessons: 50 },
  { id:'work-kz', icon:'🚛', title:'工作哈语', desc:'当地现场真正用得到', lessons: 50 }
];

const scenes = [
  ['🚕','打车','问价、目的地、下车'], ['🏠','租房','看房、合同、水电'], ['🏦','银行','开户、转账、咨询'], ['🍽','餐厅','点餐、结账、需求'],
  ['🏭','工厂','设备、生产、安全'], ['🚆','铁路','车站、车皮、发运'], ['📦','海关','报关、查验、放行'], ['🤝','商务','谈价、会议、合同']
];

let current = Number(localStorage.getItem('currentLesson') || 0);
let completed = JSON.parse(localStorage.getItem('completedLessons') || '[]');

function renderCourses() {
  const el = document.getElementById('courseGrid');
  el.innerHTML = courses.map(c => {
    const pct = c.lessons ? Math.min(100, Math.round((completed.length / lessons.length) * 100)) : 0;
    return `<article class="course">
      <div class="course-icon">${c.icon}</div>
      <h3>${c.title}</h3><p>${c.desc}</p>
      <div class="bar"><i style="width:${pct}%"></i></div>
      <div class="meta"><span>${c.lessons} 课</span><span>${pct}%</span></div>
    </article>`;
  }).join('');
}

function renderScenes() {
  document.getElementById('sceneGrid').innerHTML = scenes.map((s, i) => `<article class="scene" data-index="${i}">
    <div><div class="scene-icon">${s[0]}</div><h3>${s[1]}</h3><p>${s[2]}</p></div>
    <div class="tagline">开始场景练习 →</div>
  </article>`).join('');
}

function renderLesson() {
  const l = lessons[current];
  document.getElementById('lessonTitle').textContent = l.title;
  document.getElementById('lessonTag').textContent = l.tag;
  document.getElementById('lessonLevel').textContent = l.level;
  document.getElementById('cnLine').textContent = l.cn;
  document.getElementById('kzLine').textContent = l.kz;
  document.getElementById('ruLine').textContent = l.ru;
  document.getElementById('lessonTip').textContent = l.tip;
  document.getElementById('lessonCount').textContent = `${current + 1} / ${lessons.length}`;
  localStorage.setItem('currentLesson', String(current));
  updateProgress();
}

function updateProgress() {
  const pct = Math.round((completed.length / lessons.length) * 100);
  document.getElementById('progressText').textContent = `${pct}%`;
  renderCourses();
}

function speak(text) {
  if (!('speechSynthesis' in window)) {
    alert('当前浏览器不支持语音朗读。');
    return;
  }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = /[\u0400-\u04FF]/.test(text) ? 'ru-RU' : 'kk-KZ';
  u.rate = 0.9;
  window.speechSynthesis.speak(u);
}

document.querySelectorAll('[data-scroll]').forEach(btn => btn.addEventListener('click', () => {
  document.getElementById(btn.dataset.scroll).scrollIntoView({ behavior:'smooth' });
}));

document.addEventListener('click', e => {
  const speakBtn = e.target.closest('[data-speak]');
  if (speakBtn) speak(speakBtn.dataset.speak);
  const targetBtn = e.target.closest('[data-target]');
  if (targetBtn) speak(document.getElementById(targetBtn.dataset.target).textContent);
  const scene = e.target.closest('.scene');
  if (scene) document.getElementById('lesson').scrollIntoView({behavior:'smooth'});
});

document.getElementById('nextLesson').addEventListener('click', () => {
  if (!completed.includes(current)) completed.push(current);
  current = (current + 1) % lessons.length;
  localStorage.setItem('completedLessons', JSON.stringify(completed));
  renderLesson();
});

document.getElementById('prevLesson').addEventListener('click', () => {
  current = (current - 1 + lessons.length) % lessons.length;
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
renderLesson();
