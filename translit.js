// Kazakh in the two other scripts Kazakhs in China read, shown under every Kazakh sentence of the learn page and the
// translation page: the Arabic script (төте жазу, official in Ili) and the pinyin-based Latin "new script" of
// 1964–1984. Both are written from the Cyrillic by rule.
// Sources: en.wikipedia "Kazakh alphabets" (Arabic chart, glyph table, high hamza rule) and zh.wikipedia 哈萨克字母
// (哈萨克新文字 column), checked against their sample sentence "Barleⱪ adamdar … jənê ⱪadir-ⱪasiyêti".
// Letters used only in Russian loans (ё ц ч щ ю я э) are not clear in the sources and should be checked.
(function () {
  const LETTERS = /[А-Яа-яЁёӘәҒғҚқҢңӨөҰұҮүҺһІі]+/g;
  const VOWEL = /[аәеёиоөуұүыіэюя]/;

  // Arabic: one letter per sound; front vowels (ә ө ү і) share the letters of their back pairs and the word gets a
  // high hamza (ٴ) at its start instead, unless something else already marks it as front (е, к, г) or back (қ, ғ).
  const AR = { а: 'ا', ә: 'ا', б: 'ب', в: 'ۆ', г: 'گ', ғ: 'ع', д: 'د', е: 'ە', ё: 'يو', ж: 'ج', з: 'ز', и: 'ي', й: 'ي',
    к: 'ك', қ: 'ق', л: 'ل', м: 'م', н: 'ن', ң: 'ڭ', о: 'و', ө: 'و', п: 'پ', р: 'ر', с: 'س', т: 'ت', у: 'ۋ', ұ: 'ۇ',
    ү: 'ۇ', ф: 'ف', х: 'ح', һ: 'ھ', ц: 'تس', ч: 'چ', ш: 'ش', щ: 'شش', ъ: '', ы: 'ى', і: 'ى', ь: '', э: 'ە', ю: 'يۋ', я: 'يا' };
  function arabWord(w) {
    w = w.toLowerCase();
    const body = [...w].map(c => AR[c] ?? c).join('');
    return /[әөүі]/.test(w) && !/[еэкгқғ]/.test(w) ? 'ٴ' + body : body;
  }
  function arab(text) {
    return String(text || '').replace(LETTERS, arabWord).replace(/\?/g, '؟').replace(/,/g, '،').replace(/;/g, '؛');
  }

  // Latin (1964–1984): е = ê, ы = e, қ = ⱪ, ғ = ƣ, ң = ng, һ = ⱨ, ш = x, ч = q. и and у are diphthongs: и is "ey" in
  // back words and "iy" in front words, у is "uw" / "üw" between consonants and "w" next to a vowel.
  const LA = { а: 'a', ә: 'ə', б: 'b', в: 'v', г: 'g', ғ: 'ƣ', д: 'd', е: 'ê', ё: 'yo', ж: 'j', з: 'z', й: 'y', к: 'k',
    қ: 'ⱪ', л: 'l', м: 'm', н: 'n', ң: 'ng', о: 'o', ө: 'ö', п: 'p', р: 'r', с: 's', т: 't', ұ: 'u', ү: 'ü', ф: 'f',
    х: 'h', һ: 'ⱨ', ц: 'c', ч: 'q', ш: 'x', щ: 'x', ъ: '', ы: 'e', і: 'i', ь: '', э: 'ê', я: 'ya' };
  function latinWord(w) {
    const low = w.toLowerCase(), front = /[әеөүіэ]/.test(low), chars = [...low];
    const out = chars.map((c, i) => {
      const prev = chars[i - 1] || '', next = chars[i + 1] || '';
      if (c === 'и') return VOWEL.test(prev) ? 'y' : front ? 'iy' : 'ey';
      if (c === 'у') return VOWEL.test(prev) || VOWEL.test(next) ? 'w' : front ? 'üw' : 'uw';
      if (c === 'ю') return front ? 'yüw' : 'yuw';
      return LA[c] ?? c;
    });
    // keep capitals: a capital first letter, or a word in capitals
    if (w.length > 1 && w === w.toUpperCase()) return out.join('').toUpperCase();
    if (w[0] !== low[0]) out[0] = out[0].charAt(0).toUpperCase() + out[0].slice(1);
    return out.join('');
  }
  function latin(text) { return String(text || '').replace(LETTERS, latinWord); }

  // Under each Kazakh sentence on the page: a small block with both scripts, kept in step with the sentence.
  const TARGETS = '#learnKz, .tr-text[lang="kk"]';
  function decorate() {
    document.querySelectorAll(TARGETS).forEach(el => {
      const text = el.textContent.trim();
      let box = el.nextElementSibling;
      if (!box || !box.classList.contains('kk-scripts')) {
        if (!text) return;
        box = document.createElement('div');
        box.className = 'kk-scripts';
        el.after(box);
      }
      if (box.dataset.for === text) return;
      box.dataset.for = text;
      box.hidden = !/[А-Яа-яӘәҒғҚқҢңӨөҰұҮүҺһІі]/.test(text);
      box.innerHTML = '';
      [['托特文', arab(text), 'kk-Arab', 'rtl'], ['老拉丁文', latin(text), 'kk-Latn', 'ltr']].forEach(([label, value, lang, dir]) => {
        const row = document.createElement('p');
        const tag = document.createElement('span'); tag.className = 'kk-script-tag'; tag.textContent = label;
        const v = document.createElement('span'); v.className = 'kk-script-text'; v.lang = lang; v.dir = dir; v.textContent = value;
        row.append(tag, v); box.append(row);
      });
    });
  }
  // A timer, not requestAnimationFrame: animation frames stop in background tabs, and the sentence changes then too.
  let queued = false;
  new MutationObserver(() => { if (!queued) { queued = true; setTimeout(() => { queued = false; decorate(); }, 30); } })
    .observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  document.addEventListener('DOMContentLoaded', decorate);
  window.KZScripts = { arab, latin };
})();
