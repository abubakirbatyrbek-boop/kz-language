// Homepage only: the "phrase of the day" stage and a gentle reveal of sections on scroll.
// Every phrase below has a recorded clip in both languages (checked against index.json).
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const PHRASES = [
    ['您好！', 'Сәлеметсіз бе?', 'Здравствуйте.'],
    ['谢谢！', 'Рақмет.', 'Спасибо.'],
    ['多少钱？', 'Қанша тұрады?', 'Сколько стоит?'],
    ['我想喝茶。', 'Мен шай ішкім келеді.', 'Я хочу чай.'],
    ['我不明白。', 'Мен түсінбеймін.', 'Я не понимаю.'],
    ['认识你很高兴。', 'Танысқаныма қуаныштымын.', 'Приятно познакомиться.']
  ];

  const stage = document.getElementById('phraseStage');
  if (stage) {
    const cn = stage.querySelector('[data-cn]'), dots = stage.querySelector('.stage-dots');
    const rows = { kk: stage.querySelector('.sc-row[data-lang="kk"]'), ru: stage.querySelector('.sc-row[data-lang="ru"]') };
    let i = 0, timer = null;
    dots.innerHTML = PHRASES.map((p, j) => `<button type="button" data-i="${j}" aria-label="${p[0]}"></button>`).join('');
    const mark = () => dots.querySelectorAll('button').forEach((b, n) => b.setAttribute('aria-current', String(n === i)));
    const fill = () => {
      const [c, k, r] = PHRASES[i];
      cn.textContent = c;
      rows.kk.dataset.say = k; rows.kk.querySelector('strong').textContent = k;
      rows.ru.dataset.say = r; rows.ru.querySelector('strong').textContent = r;
    };
    const show = j => {
      i = (j + PHRASES.length) % PHRASES.length; mark();
      if (reduce) return fill();
      stage.classList.add('swap');
      setTimeout(() => { fill(); stage.classList.remove('swap'); }, 240);
    };
    const start = () => { if (reduce) return; clearInterval(timer); timer = setInterval(() => show(i + 1), 5200); };
    const stop = () => clearInterval(timer);
    dots.addEventListener('click', e => { const b = e.target.closest('[data-i]'); if (b) { show(+b.dataset.i); start(); } });
    // Pause while the learner is reading, listening or using the keyboard here.
    stage.addEventListener('mouseenter', stop);
    stage.addEventListener('mouseleave', start);
    stage.addEventListener('focusin', stop);
    stage.addEventListener('click', e => { if (e.target.closest('.sc-row')) stop(); });
    mark(); start();
  }

  const els = document.querySelectorAll('[data-reveal]');
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => { el.classList.add('will-reveal'); io.observe(el); });
  }
})();
