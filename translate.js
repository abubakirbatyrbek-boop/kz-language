// Translation page (translate.html). First the site's own checked sentences and words, with their recordings
// (no sign-in needed); then, when nothing matches closely, machine translation through /api/translate, marked as
// such, read aloud through /api/speak (both need sign-in). Chinese in, Kazakh + Russian out; Kazakh or Russian in,
// Chinese out. Uses `lessons`, `sceneTestBank` and `VOCAB_THEMES` from app.js.
(function () {
  if (document.body.dataset.page !== 'translate') return;
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const hasHan = s => /[㐀-鿿]/.test(s);
  const key = s => String(s || '').replace(/^（[^）]*）/, '').toLowerCase().replace(/ё/g, 'е').replace(/[\s，。！？、,.!?；;：:“”"'‘’（）()…—\-–«»]/g, '');

  // One entry per Chinese sentence or word, with its Kazakh and Russian where the site has them.
  const entries = new Map();
  function add(cn, kk, ru) {
    cn = String(cn || '').trim();
    const k = key(cn);
    if (!k || !hasHan(cn)) return;
    const e = entries.get(k) || { cn: cn.replace(/^（[^）]*）/, ''), kk: '', ru: '' };
    if (kk && !e.kk) e.kk = kk;
    if (ru && !e.ru) e.ru = ru;
    entries.set(k, e);
  }
  const langOfCourse = c => /-ru$/.test(c) ? 'ru' : 'kk';
  lessons.forEach(l => {
    const lang = langOfCourse(l.course);
    if (l.turns) l.turns.forEach(t => add(t[1], lang === 'kk' ? t[2] : '', lang === 'ru' ? t[2] : ''));
    else if (l.swap) l.swap.sentences.forEach(([cn, t]) => add(cn, lang === 'kk' ? t : '', lang === 'ru' ? t : ''));
    else if (l.drill) l.drill.forEach(([cn, t]) => add(cn, lang === 'kk' ? t : '', lang === 'ru' ? t : ''));
    else if (l.cn && !/ · /.test(l.kz || l.ru || '')) add(l.cn, l.kz, l.ru);
  });
  Object.values(sceneTestBank).forEach(rows => rows.forEach(([cn, kk, ru]) => add(cn, kk, ru)));
  VOCAB_THEMES.forEach(t => t.w.split(';').forEach(w => { const [cn, kk, ru] = w.split('|'); add(cn, kk, ru); }));
  const all = [...entries.values()].filter(e => e.kk || e.ru);
  all.forEach(e => { e.k = key(e.cn); e.kkk = key(e.kk); e.kru = key(e.ru); });

  // Similarity of query q and entry text e (both normalized): 1 for equal, otherwise shared character pairs (Dice).
  // A short query found inside a sentence ("多少钱" in "这个多少钱？") also counts, and so does a whole word found
  // inside a short query ("押金" in "押金多少"), but not a scrap: one Chinese character, or under four Cyrillic
  // letters ("ет" inside "рахмет"), and nothing inside a long query, where only whole similar sentences help.
  function pairs(s) { const p = new Map(); for (let i = 0; i < s.length - 1; i++) { const b = s.slice(i, i + 2); p.set(b, (p.get(b) || 0) + 1); } return p; }
  function similar(q, e, han) {
    if (!q || !e) return 0;
    if (q === e) return 1;
    let score = 0;
    if (q.length > 1 && e.length > 1) {
      const pa = pairs(q), pb = pairs(e);
      let both = 0; pa.forEach((n, k) => { both += Math.min(n, pb.get(k) || 0); });
      score = 2 * both / (q.length + e.length - 2);
    }
    const min = han ? 2 : 4, short = han ? 6 : 15;
    const inside = (e.includes(q) && q.length >= min) || (q.includes(e) && e.length >= min && q.length <= short);
    if (inside) score = Math.max(score, .55 + .4 * Math.min(q.length, e.length) / Math.max(q.length, e.length));
    return score;
  }
  function search(q) {
    const k = key(q), zh = hasHan(q);
    return all.map(e => ({ e, s: zh ? similar(k, e.k, true) : Math.max(similar(k, e.kkk, false), similar(k, e.kru, false)) }))
      .filter(x => x.s >= .45).sort((a, b) => b.s - a.s || a.e.cn.length - b.e.cn.length).slice(0, 6);
  }

  // Playing: the site's recording when there is one, otherwise the voice from /api/speak (signed in), otherwise the
  // device voice.
  let player = null;
  async function token() { try { return (await window.KZAuth.getClient().auth.getSession()).data?.session?.access_token || ''; } catch { return ''; } }
  async function play(text, lang, btn) {
    btn.classList.add('on');
    const done = () => btn.classList.remove('on');
    if (window.KZAudio && await window.KZAudio.play(text, lang, 1)) { setTimeout(done, 1200); return; }
    const t = await token();
    if (t) {
      try {
        const r = await fetch('/api/speak', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + t }, body: JSON.stringify({ lang, text }) });
        if (r.ok) { player?.pause(); player = new Audio(URL.createObjectURL(await r.blob())); player.onended = done; await player.play(); return; }
      } catch {}
    }
    try { const u = new SpeechSynthesisUtterance(text); u.lang = lang === 'kk' ? 'kk-KZ' : 'ru-RU'; u.onend = done; speechSynthesis.speak(u); } catch { done(); }
  }
  const line = (lang, text) => text ? `<div class="tr-line"><span class="tr-lang">${lang === 'kk' ? '哈萨克语' : '俄语'}</span><span class="tr-text" lang="${lang}">${esc(text)}</span><button type="button" class="tr-play" data-lang="${lang}" data-text="${esc(text)}" aria-label="播放${lang === 'kk' ? '哈萨克语' : '俄语'}：${esc(text)}">🔊</button></div>` : '';

  const form = $('#trForm'), input = $('#trInput'), out = $('#trOut'), mt = $('#trMachine');
  out.addEventListener('click', e => { const b = e.target.closest('.tr-play'); if (b) play(b.dataset.text, b.dataset.lang, b); });
  mt.addEventListener('click', e => {
    const b = e.target.closest('.tr-play'); if (b) play(b.dataset.text, b.dataset.lang, b);
    if (e.target.closest('#trMtGo')) machine(input.value.trim());
  });

  // While a translation is on its way the button is disabled, so a second click cannot send it twice.
  const submit = form.querySelector('[type=submit]');
  function busy(on) { submit.disabled = on; submit.textContent = on ? '翻译中…' : '翻译'; mt.setAttribute('aria-busy', on ? 'true' : 'false'); }
  async function machine(q) {
    mt.innerHTML = '<p class="tr-note" role="status">正在机器翻译…</p>';
    const t = await token();
    if (!t) { mt.innerHTML = '<p class="tr-note">机器翻译需要登录。<a href="auth.html">登录 / 注册</a>后可用（免费）。</p>'; return; }
    busy(true);
    try {
      const r = await fetch('/api/translate', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + t }, body: JSON.stringify({ text: q }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) {
        const why = { login: '登录已过期，请重新登录。', too_long: '一次最多翻译 200 个字，请分开翻译。', not_configured: '机器翻译还没开通，请稍后再试。', azure_quota: '本月免费翻译额度已用完，下个月恢复。' }[j.error] || '机器翻译暂时连不上，请稍后再试。';
        mt.innerHTML = `<p class="tr-note">${why}</p>`; return;
      }
      mt.innerHTML = '<div class="tr-card tr-mt"><span class="tr-badge">机器翻译 · 仅供参考</span>' +
        (j.zh != null ? `<p class="tr-zh">${esc(j.zh)}</p>` : line('kk', j.kk) + line('ru', j.ru)) +
        '<p class="tr-note">机器翻译可能用词不准，重要的事请找人核对。用简单完整的中文写，翻得更准。</p></div>';
    } catch { mt.innerHTML = '<p class="tr-note">网络连不上，请稍后再试。</p>'; }
    finally { busy(false); }
  }

  function run(q) {
    q = q.trim(); mt.innerHTML = '';
    if (!q) { out.innerHTML = ''; return; }
    const found = search(q), exact = found[0] && found[0].s >= .85;
    out.innerHTML = found.length
      ? `<h2 class="tr-h">网站里的标准说法 <small>有校对，可播放录音</small></h2>` + found.map(({ e }) => `<div class="tr-card"><p class="tr-zh">${esc(e.cn)}</p>${line('kk', e.kk)}${line('ru', e.ru)}</div>`).join('')
      : `<p class="tr-note">网站里没有找到相近的句子。</p>`;
    if (exact) mt.innerHTML = '<button type="button" class="secondary-btn" id="trMtGo">还要机器翻译这句</button>';
    else machine(q);
  }
  // The text is not put into the address bar: people paste their own messages here.
  form.addEventListener('submit', e => { e.preventDefault(); if (!submit.disabled) run(input.value); });
  // Enter translates, Shift+Enter starts a new line. Not while an input method is still composing: Chinese users
  // press Enter to pick characters.
  input.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey && !e.isComposing && e.keyCode !== 229) { e.preventDefault(); form.requestSubmit(); } });
  document.querySelectorAll('[data-try]').forEach(b => b.addEventListener('click', () => { input.value = b.dataset.try; form.requestSubmit(); }));
  const q = new URLSearchParams(location.search).get('q');
  if (q) { input.value = q; run(q); }
})();
