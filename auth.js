// Recorded pronunciation. Most phones ship no Kazakh (and often no Russian) system voice,
// so every speak path plays a pre-generated clip from audio/{kk,ru}.bin first and only
// falls back to speechSynthesis when a text has no clip.
(function () {
  const INDEX_URL = 'audio/index.json';
  const SILENT = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQAAAAA=';
  const norm = t => String(t ?? '').replace(/\s+/g, ' ').trim();
  const langOf = l => /^kk/i.test(String(l || '')) ? 'kk' : /^ru/i.test(String(l || '')) ? 'ru' : null;
  let index = null, indexLoad = null, player = null, token = 0;
  const cache = new Map();
  function loadIndex() {
    if (index) return Promise.resolve(index);
    return indexLoad ||= fetch(INDEX_URL).then(r => r.ok ? r.json() : {}).catch(() => ({})).then(j => (index = j || {}));
  }
  async function clip(lang, text) {
    const idx = await loadIndex(), entry = idx[lang]?.[text];
    if (!entry) return null;
    const id = lang + '|' + text;
    if (cache.has(id)) return cache.get(id);
    const [start, length] = entry;
    const res = await fetch('audio/' + lang + '.bin', {headers: {Range: 'bytes=' + start + '-' + (start + length - 1)}});
    if (!res.ok) return null;
    let buf = await res.arrayBuffer();
    if (res.status === 200) buf = buf.slice(start, start + length); // server ignored Range
    const url = URL.createObjectURL(new Blob([buf], {type: 'audio/mpeg'}));
    cache.set(id, url);
    return url;
  }
  // Returns a promise resolving true when a recorded clip played, false when the caller should fall back.
  function play(text, lang, rate = 1) {
    const l = langOf(lang), t = norm(text);
    if (!l || !t) return Promise.resolve(false);
    const my = ++token;
    player ||= new Audio();
    // Start playback inside the click so iOS/Safari keeps the element unlocked for the real clip.
    try { player.pause(); player.src = SILENT; player.play().catch(() => {}); } catch {}
    return clip(l, t).then(url => {
      if (!url || my !== token) return !!url;
      try { window.speechSynthesis?.cancel(); } catch {}
      player.src = url;
      player.playbackRate = Math.max(0.5, Math.min(2, Number(rate) || 1));
      if ('preservesPitch' in player) player.preservesPitch = true;
      return player.play().then(() => true, () => false);
    }, () => false);
  }
  function has(text, lang) { const l = langOf(lang); return !!(index && l && index[l]?.[norm(text)]); }
  window.KZAudio = {play, has, ready: loadIndex};
  // Route every existing speechSynthesis caller (app.js, grammar-flow.js, v5.js, government.html) through the clips.
  const synth = window.speechSynthesis;
  if (synth && window.SpeechSynthesisUtterance) {
    const nativeSpeak = synth.speak.bind(synth);
    synth.speak = function (u) {
      if (!u || u.__kzNative || !langOf(u.lang)) return nativeSpeak(u);
      play(u.text, u.lang, (u.rate || 1) / 0.88).then(ok => {
        if (!ok) { u.__kzNative = true; nativeSpeak(u); }
      });
    };
  }
  const warm = () => loadIndex();
  if (window.requestIdleCallback) requestIdleCallback(warm, {timeout: 4000}); else setTimeout(warm, 1500);
})();

(function () {
  const cfg = window.SUPABASE_CONFIG || {};
  const configured = cfg.url && cfg.publishableKey && !cfg.url.includes('YOUR-PROJECT') && !cfg.publishableKey.includes('YOUR_SUPABASE');
  let client = null, recoveryUser = null, pageController = null, currentUser = null;
  let resolveReady;
  const ready = new Promise(resolve => { resolveReady = resolve; });

  function esc(value) {
    return String(value || '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  }
  function nextUrl() {
    try {
      const url = new URL(new URLSearchParams(location.search).get('next') || 'index.html', location.href);
      if (url.origin === location.origin && /^https?:$/.test(url.protocol)) return url.href;
    } catch {}
    return new URL('index.html', location.href).href;
  }
  function renderAuthNav(user) {
    currentUser = user;
    const host = document.getElementById('authNav');
    if (!host) return;
    host.innerHTML = user
      ? '<span class="auth-user" title="' + esc(user.email) + '">' + esc(user.email) + '</span><button class="auth-nav-btn" id="authLogout">退出</button>'
      : '<a class="auth-link" href="auth.html">登录 / 注册</a>';
    document.getElementById('authLogout')?.addEventListener('click', async () => {
      try { const {error} = await client.auth.signOut(); if (error) throw error; }
      catch (err) { alert(err.message || '退出失败，请重试。'); }
    });
  }
  function showConfigWarning() { document.getElementById('authConfigWarning')?.classList.remove('hidden'); }

  function setupAuthPage() {
    const form = document.getElementById('authForm');
    if (!form) return;
    if (!configured || !client) { showConfigWarning(); document.getElementById('authSubmit').disabled = true; return; }
    const el = id => document.getElementById(id);
    const email = el('authEmail'), password = el('authPassword'), confirm = el('authPasswordConfirm'), code = el('recoveryCode');
    const submit = el('authSubmit'), toggle = el('authToggle'), forgot = el('authForgot'), resend = el('authResend');
    let mode = new URLSearchParams(location.search).get('mode') === 'signup' ? 'signup' : 'login';
    let busy = false, sentEmail = '', resendAt = 0, cooldownTimer = null, verifiedId = null;
    const labels = {login:'登录',signup:'注册',forgot:'发送验证码',verify:'验证验证码',reset:'保存新密码'};
    function message(text, type='') { el('authMessage').textContent = text; el('authMessage').className = 'auth-message ' + type; }
    function show(id, visible) { el(id).classList.toggle('hidden', !visible); }
    function cooldown() {
      const remaining = Math.max(0, Math.ceil((resendAt-Date.now())/1000));
      resend.textContent = remaining ? remaining + ' 秒后可重新发送' : '重新发送验证码';
      resend.disabled = busy || remaining > 0;
      if (!remaining && cooldownTimer) { clearInterval(cooldownTimer); cooldownTimer = null; }
    }
    function controls() {
      submit.disabled = busy;
      submit.textContent = busy ? '处理中…' : labels[mode];
      toggle.disabled = busy; forgot.disabled = busy;
      email.disabled = busy || mode === 'verify' || mode === 'reset';
      password.disabled = busy || mode === 'forgot' || mode === 'verify';
      confirm.disabled = busy || (mode !== 'signup' && mode !== 'reset');
      code.disabled = busy || mode !== 'verify';
      el('authName').disabled = busy || mode !== 'signup';
      cooldown();
    }
    function draw() {
      const signup = mode === 'signup', reset = mode === 'reset', recovery = ['forgot','verify','reset'].includes(mode);
      el('authModeTitle').textContent = {login:'登录账号',signup:'创建账号',forgot:'找回密码',verify:'验证邮箱',reset:'设置新密码'}[mode];
      el('authModeDesc').textContent = {
        login:'使用邮箱和密码继续学习。',signup:'注册后可以继续保存你的学习状态。',
        forgot:'输入注册时使用的邮箱，我们会发送密码重置邮件。',
        verify:'请输入发送到 ' + sentEmail + ' 的验证码。也可以使用邮件中的重置链接。',
        reset:'验证成功。请设置至少 8 个字符的新密码。'
      }[mode];
      show('nameWrap', signup); show('passwordWrap', !['forgot','verify'].includes(mode));
      show('passwordConfirmWrap', signup || reset); show('recoveryCodeWrap', mode === 'verify');
      forgot.classList.toggle('hidden', mode !== 'login'); resend.classList.toggle('hidden', mode !== 'verify');
      el('passwordLabel').textContent = reset ? '新密码' : '密码';
      password.autocomplete = signup || reset ? 'new-password' : 'current-password';
      password.required = !['forgot','verify'].includes(mode);
      confirm.required = signup || reset; code.required = mode === 'verify';
      toggle.innerHTML = recovery ? '返回登录' : signup ? '已有账号？<strong>立即登录</strong>' : '还没有账号？<strong>创建账号</strong>';
      if (mode !== 'login') show('alreadyLoggedIn', false);
      controls();
    }
    function changeMode(value) {
      mode = value; password.value = ''; confirm.value = ''; code.value = ''; message('');
      // The URL is navigation state only; it never grants permission to reset a password.
      const url = new URL(location.href); url.searchParams.set('mode',value);
      url.hash = ''; history.replaceState({},'',url); draw();
    }
    function enterRecovery(user) {
      if (!user?.id) return;
      verifiedId = user.id; email.value = user.email || sentEmail;
      changeMode('reset');
    }
    pageController = {
      recover: enterRecovery,
      signedOut() {
        verifiedId = null;
        if (mode === 'reset' && !busy) { changeMode('forgot'); message('验证已失效，请重新获取验证码。','bad'); }
        show('alreadyLoggedIn',false);
      }
    };
    forgot?.addEventListener('click', () => { if(!busy) { changeMode('forgot'); email.focus(); } });
    toggle.addEventListener('click', async () => {
      if (busy) return;
      if (mode === 'reset' && verifiedId) {
        busy = true; controls();
        try { const {error} = await client.auth.signOut({scope:'local'}); if(error)throw error; }
        catch(err) { message(err.message || '退出验证状态失败，请重试。','bad'); busy=false; controls(); return; }
        busy=false; verifiedId=null; recoveryUser=null;
      }
      changeMode(mode === 'login' ? 'signup' : 'login');
    });
    async function sendCode() {
      if (Date.now() < resendAt) throw new Error('发送过于频繁，请稍后再试。');
      const address = mode === 'verify' ? sentEmail : email.value.trim();
      if (!address || !email.checkValidity()) throw new Error('请输入正确的注册邮箱。');
      const redirect = new URL('auth.html',location.href);
      redirect.searchParams.set('next',nextUrl());
      const {error} = await client.auth.resetPasswordForEmail(address,{redirectTo:redirect.href});
      if (error) throw error;
      sentEmail = address; resendAt = Date.now()+60000;
      if(cooldownTimer)clearInterval(cooldownTimer);
      cooldownTimer=setInterval(cooldown,1000);
      changeMode('verify');
      message('如果该邮箱已注册，你会收到重置邮件。请检查收件箱和垃圾邮件。','ok');
    }
    function friendlyError(err) {
      if (err?.status === 429 || /rate.limit|too many|after .*seconds/i.test(err?.message || '')) return '发送或验证过于频繁，请稍后再试。';
      if (err?.code === 'otp_expired' || /expired|invalid.*token/i.test(err?.message || '')) return '验证码或链接无效、已过期或已使用，请重新发送验证码。';
      if (/fetch|network/i.test(err?.message || '')) return '网络连接失败，请检查网络后重试。';
      return err?.message || '操作失败，请稍后再试。';
    }
    resend?.addEventListener('click', async () => {
      if (busy || Date.now()<resendAt) return;
      busy=true; controls(); message('');
      try { await sendCode(); } catch(err) { message(friendlyError(err),'bad'); }
      finally { busy=false; controls(); }
    });
    form.addEventListener('submit', async e => {
      e.preventDefault(); if(busy)return;
      const address=email.value.trim(), secret=password.value;
      if ((mode==='login'||mode==='signup') && (!address||!secret)) { message('请填写邮箱和密码。','bad'); return; }
      if (mode==='signup'||mode==='reset') {
        if(secret.length<8){ message('密码至少 8 个字符。','bad'); return; }
        if(secret!==confirm.value){ message('两次输入的密码不一致。','bad'); return; }
      }
      if(mode==='verify' && !/^\d{6,10}$/.test(code.value.trim())){message('请输入邮件中的完整数字验证码。','bad');return;}
      busy=true; controls(); message('');
      try {
        if(mode==='forgot') await sendCode();
        else if(mode==='verify') {
          const {data,error}=await client.auth.verifyOtp({email:sentEmail,token:code.value.trim(),type:'recovery'});
          if(error)throw error;
          if(!data?.session || !data?.user?.id)throw new Error('验证未成功，请重新获取验证码。');
          recoveryUser=data.user; enterRecovery(data.user);
        } else if(mode==='reset') {
          if(!verifiedId)throw new Error('请先通过邮箱验证。');
          const {data:current,error:sessionError}=await client.auth.getUser();
          if(sessionError || current?.user?.id!==verifiedId){
            verifiedId=null; recoveryUser=null; changeMode('forgot');
            throw new Error('验证已失效，请重新获取验证码。');
          }
          const {error}=await client.auth.updateUser({password:secret});
          if(error)throw error;
          verifiedId=null; recoveryUser=null;
          // A recovery OTP creates a session; end it so the user logs in with the new password.
          let logoutFailed=false;
          try { const result=await client.auth.signOut({scope:'local'}); logoutFailed=!!result.error; } catch { logoutFailed=true; }
          changeMode('login');
          message(logoutFailed?'新密码已保存。当前会话未能退出，请使用页面右上角退出后，用新密码登录。':'密码重置成功，请使用新密码登录。','ok');
        } else if(mode==='signup') {
          const {data,error}=await client.auth.signUp({email:address,password:secret,options:{
            emailRedirectTo:new URL('auth.html?next='+encodeURIComponent(nextUrl()),location.href).href,
            data:{display_name:el('authName').value.trim()}
          }});
          if(error)throw error;
          if(data.session){message('注册成功，正在进入网站…','ok');location.href=nextUrl();}
          else message('注册成功。请打开邮箱中的验证链接，然后回来登录。','ok');
        } else {
          const {data,error}=await client.auth.signInWithPassword({email:address,password:secret});
          if(error)throw error;
          if(data.session){message('登录成功，正在进入网站…','ok');location.href=nextUrl();}
          else throw new Error('登录未成功，请重试。');
        }
      } catch(err) { message(friendlyError(err),'bad'); }
      finally { busy=false; controls(); }
    });
    draw();
    if(recoveryUser) enterRecovery(recoveryUser);
    else {
      const hash = new URLSearchParams(location.hash.slice(1));
      if(hash.has('error') || new URLSearchParams(location.search).has('error')){
        changeMode('forgot');message('重置链接无效或已过期，请重新发送验证码。','bad');
      }
      client.auth.getSession().then(({data})=>{
        if(data?.session && mode==='login'){
          show('alreadyLoggedIn',true); el('alreadyEmail').textContent=data.session.user.email || '';
          el('logoutFromAuth').onclick=async()=>{
            try{const {error}=await client.auth.signOut();if(error)throw error;location.reload();}
            catch(err){message(friendlyError(err),'bad');}
          };
        }
      }).catch(()=>message('无法读取登录状态，请刷新重试。','bad'));
    }
  }
  async function boot() {
    try {
      if(configured && window.supabase?.createClient){
        client=window.supabase.createClient(cfg.url,cfg.publishableKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
        // Keep the auth callback synchronous to avoid blocking Supabase's auth lock.
        let previousId;
        client.auth.onAuthStateChange((event,session)=>{
          const id=session?.user?.id||null;
          if(previousId!==undefined && previousId!==id && document.body.dataset.page!=='auth')setTimeout(()=>location.reload(),0);
          previousId=id;
          renderAuthNav(session?.user || null);
          if(event==='PASSWORD_RECOVERY' && session?.user){
            recoveryUser=session.user; pageController?.recover(session.user);
          }
          if(event==='SIGNED_OUT'){recoveryUser=null;pageController?.signedOut();}
        });
        const {data,error}=await client.auth.getSession();if(error && !data?.session)throw error;renderAuthNav(data?.session?.user || null);
      } else {renderAuthNav(null);if(document.body.dataset.page==='auth')showConfigWarning();}
      setupAuthPage();
      resolveReady();
    } catch {
      client=null;resolveReady();
      const host=document.getElementById('authMessage');
      if(host){host.textContent='登录服务暂时不可用，请刷新后重试。';host.className='auth-message bad';}
    }
  }
  window.KZAuth={getClient:()=>client,isConfigured:()=>configured,getUser:()=>currentUser,ready};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();



// Shared learning controls for the existing course engines.
(function(){
  'use strict';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const readKey=k=>{try{return JSON.parse(localStorage.getItem(k)||'{}')}catch{return {}}};
  const key=()=> 'kz-study:'+(window.KZAuth.getUser()?.id||'guest');
  function state(){return readKey(key());}
  function update(fn){const s=state();fn(s);localStorage.setItem(key(),JSON.stringify(s));schedulePush();}
  // Review list, practice marks and resume positions follow the account: the newest snapshot
  // is kept as a test_results row (node kz-study-state), so no database change is needed.
  const STATE_NODE='kz-study-state';let pushTimer=null;
  function snapshot(s){return {review:s.review||{},practice:s.practice||{},courses:s.courses||{},last:s.last||null};}
  function pushNow(){
    clearTimeout(pushTimer);pushTimer=null;
    const u=window.KZAuth.getUser(),client=window.KZAuth.getClient();if(!u||!client)return;
    client.from('test_results').insert({user_id:u.id,node_id:STATE_NODE,language:'kk',score:0,passed:false,answers:[snapshot(state())]}).then(()=>{},()=>{});
  }
  function schedulePush(){if(!window.KZAuth.getUser())return;clearTimeout(pushTimer);pushTimer=setTimeout(pushNow,3000);}
  window.addEventListener('pagehide',()=>{if(pushTimer)pushNow();});
  function mergeState(remote){
    if(!remote)return false;const s=state(),before=JSON.stringify(s);
    s.review||={};for(const [k,v] of Object.entries(remote.review||{})){const l=s.review[k];if(!l||(v.due||0)>(l.due||0))s.review[k]=v;}
    s.practice={...(remote.practice||{}),...(s.practice||{})};
    s.courses||={};for(const [k,v] of Object.entries(remote.courses||{})){if(!s.courses[k]||(v.at||0)>(s.courses[k].at||0))s.courses[k]=v;}
    if(remote.last&&(!s.last||(remote.last.at||0)>(s.last.at||0)))s.last=remote.last;
    if(JSON.stringify(s)===before)return false;localStorage.setItem(key(),JSON.stringify(s));return true;
  }
  let pulled=null;
  function pull(){
    return pulled||=(async()=>{
      const u=window.KZAuth.getUser(),client=window.KZAuth.getClient();if(!u||!client)return;
      try{
        const {data}=await client.from('test_results').select('answers,created_at').eq('user_id',u.id).eq('node_id',STATE_NODE).order('created_at',{ascending:false}).limit(1);
        const remote=Array.isArray(data?.[0]?.answers)?data[0].answers[0]:data?.[0]?.answers;
        mergeState(remote);
        // This device knew something the account did not (e.g. guest work): upload the merged state.
        if(JSON.stringify(snapshot(state()))!==JSON.stringify(snapshot(remote||{})))schedulePush();
        updateLinks();
      }catch{}
    })();
  }
  function safeUrl(raw){try{const u=new URL(raw,location.href);return u.origin===location.origin && /\/(learn|course|unit|lesson-v4|quiz-v4|grammar-test)\.html$/.test(u.pathname)?u.pathname.split('/').pop()+u.search:null}catch{return null}}
  function resume(course){const s=state(),r=course?s.courses?.[course]:s.last;return r&&safeUrl(r.url)?r:null;}
  function updateLinks(){document.querySelectorAll('[data-continue]').forEach(a=>{const r=resume();a.href=r?safeUrl(r.url):'courses.html';a.textContent=r?'继续学习':'选择课程';});}
  function remember(course,title,url=location.href){const valid=safeUrl(url);if(!valid)return;update(s=>{const r={course,title,url:valid,at:Date.now()};s.last=r;(s.courses||={})[course]=r});updateLinks();}
  function review(c,l){update(s=>{(s.review||={})[c.id+':'+l.id]={course:c.id,id:l.id,title:l.title,cn:l.cn,target:c.targetLang==='kk'?l.kz:l.ru,lang:c.targetLang,note:l.tip||'',due:Date.now(),streak:0};});}
  function practiceDone(c,l){return !!state().practice?.[c.id+':'+l.id];}
  function voice(text,lang,rate=1,status){
    if(status)status.textContent='';
    if(window.KZAudio){window.KZAudio.play(text,lang,rate).then(ok=>{if(!ok)deviceVoice(text,lang,rate,status)});return;}
    deviceVoice(text,lang,rate,status);
  }
  function deviceVoice(text,lang,rate,status){
    if(!window.speechSynthesis){if(status)status.textContent='此浏览器不支持朗读，请换用支持语音的浏览器。';return;}
    const code=lang==='kk'?'kk-KZ':'ru-RU',voices=speechSynthesis.getVoices(),v=voices.find(v=>v.lang.toLowerCase().startsWith(lang));
    if(voices.length && !v){if(status)status.textContent='当前设备没有'+(lang==='kk'?'哈萨克语':'俄语')+'语音，请在设备设置中安装对应语言语音。';return;}
    speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.__kzNative=true;u.lang=code;u.rate=rate;if(v)u.voice=v;
    u.onerror=()=>{if(status)status.textContent='朗读失败，请检查设备语音设置后重试。';};speechSynthesis.speak(u);
    if(status)status.textContent='';
  }
  let releaseRecording=()=>{};
  window.addEventListener('pagehide',()=>releaseRecording());
  function audioTools(host,c,l){
    releaseRecording();
    const text=c.targetLang==='kk'?l.kz:l.ru;
    host.innerHTML=`<h3>听一听，自己说</h3><div class="study-actions"><button type="button" data-speed="1">▶ 原速</button><button type="button" data-speed="0.65">▶ 慢速</button>${c.kind==='speaking'?'<button type="button" data-record>● 录音跟读</button>':''}</div><p class="study-status" role="status"></p>${c.kind==='speaking'?'<audio controls hidden></audio><p class="study-help">录音只在本页回放，不上传；离开页面后清除。</p>':''}`;
    const status=host.querySelector('[role=status]');host.querySelectorAll('[data-speed]').forEach(b=>b.onclick=()=>voice(text,c.targetLang,Number(b.dataset.speed),status));
    const btn=host.querySelector('[data-record]');if(!btn)return;
    let stream,recorder,url,timer,disposed=false;
    const stopTracks=()=>stream?.getTracks().forEach(t=>t.stop());
    releaseRecording=()=>{disposed=true;clearTimeout(timer);if(recorder?.state==='recording')recorder.stop();stopTracks();if(url)URL.revokeObjectURL(url);};
    if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){btn.disabled=true;status.textContent='当前浏览器不支持录音，可直接跟读练习。';return;}
    btn.onclick=async()=>{
      if(recorder?.state==='recording'){recorder.stop();return;}
      btn.disabled=true;
      try{
        stream=await navigator.mediaDevices.getUserMedia({audio:true});if(disposed){stopTracks();return;}
        const parts=[];recorder=new MediaRecorder(stream);
        recorder.ondataavailable=e=>{if(e.data.size)parts.push(e.data)};
        recorder.onerror=()=>{clearTimeout(timer);stopTracks();status.textContent='录音中断，请重试。';btn.disabled=false;btn.textContent='● 重新录音';};
        recorder.onstop=()=>{clearTimeout(timer);stopTracks();if(disposed)return;if(url)URL.revokeObjectURL(url);url=URL.createObjectURL(new Blob(parts,{type:recorder.mimeType}));const audio=host.querySelector('audio');audio.src=url;audio.hidden=false;btn.textContent='● 重新录音';status.textContent='录音完成，可以回放比较。';};
        recorder.start();btn.textContent='■ 停止录音';status.textContent='正在录音，最长 60 秒。';timer=setTimeout(()=>{if(recorder.state==='recording')recorder.stop()},60000);
      }catch{stopTracks();status.textContent='无法使用麦克风。请允许麦克风权限后重试，也可以直接跟读。';}
      finally{btn.disabled=false;}
    };
  }
  function attachLesson(c,l,pool){
    const next=document.getElementById('nextLink');if(!next)return;
    remember(c.id,c.title+' · '+l.title);
    const label=c.targetLang==='kk'?'哈萨克语':'俄语';
    const direction=document.querySelector('.tag.muted');if(direction)direction.textContent='中文 → '+label;
    const side=document.getElementById('learnModeNote');if(side)side.textContent='先听'+label+'，再跟读，完成两道小练习后继续。';
    document.querySelectorAll('.side-card .feature').forEach((el,i)=>{const s=el.querySelector('span');if(s)s.textContent=['理解中文','听音与跟读','做两道小练习','完成后继续'][i]||'';});
    const row=document.getElementById(c.targetLang==='kk'?'learnKzRow':'learnRuRow');const sound=row?.querySelector('button');if(sound){sound.removeAttribute('data-text');sound.onclick=()=>voice(c.targetLang==='kk'?l.kz:l.ru,c.targetLang,1,document.querySelector('#lessonAudioTools [role=status]'));}
    document.getElementById('lessonAudioTools')?.remove();document.getElementById('lessonPractice')?.remove();
    const audio=document.createElement('section');audio.id='lessonAudioTools';audio.className='study-tool';
    const box=document.createElement('section');box.id='lessonPractice';box.className='study-tool';
    const anchor=document.querySelector('.lesson-actions');anchor.before(audio,box);audioTools(audio,c,l);
    let passed=practiceDone(c,l),step=0;
    const target=c.targetLang==='kk'?l.kz:l.ru;
    const others=[...new Set(pool.map(x=>c.targetLang==='kk'?x.kz:x.ru).filter(x=>x&&x!==target))];
    const options=[target,...others.slice(0,3)].map(x=>[Math.random(),x]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);
    const pieces=target.trim().split(/\s+/);
    const original=next.onclick;
    const lock=()=>{next.setAttribute('aria-disabled',String(!passed));next.classList.toggle('practice-pending',!passed);};
    next.onclick=async e=>{if(!passed){e.preventDefault();box.scrollIntoView({behavior:'smooth',block:'center'});box.querySelector('button')?.focus();return;}return original?.call(next,e);};
    function finish(){passed=true;update(s=>{(s.practice||={})[c.id+':'+l.id]=true});lock();box.innerHTML='<h3>✓ 本课练习已完成</h3><p>可以继续下一课，也可以再听一遍。</p>';}
    function feedback(ok){const fb=box.querySelector('[role=status]');fb.textContent=ok?'回答正确！':`正确表达：${target}。${l.tip||''} 已加入错题复习，请再试一次。`;if(!ok)review(c,l);return ok;}
    function draw(){
      if(passed){finish();return;}
      box.innerHTML=`<h3>小练习 ${step+1} / 2</h3><p>${step===0?esc(l.cn):pieces.length>1?'按顺序组成这句话：'+esc(l.cn):'听发音，选择对应表达。'}</p><div class="practice-options"></div><p role="status" class="study-status"></p>`;
      const area=box.querySelector('.practice-options');
      if(step===1&&pieces.length>1){
        const chosen=[];const line=document.createElement('p');line.className='chosen-line';area.before(line);
        const shuffled=pieces.map((x,i)=>({x,i})).sort(()=>Math.random()-.5);
        shuffled.forEach(({x})=>{const b=document.createElement('button');b.textContent=x;b.onclick=()=>{chosen.push(x);b.disabled=true;line.textContent=chosen.join(' ')};area.appendChild(b)});
        const reset=document.createElement('button');reset.textContent='重新排列';reset.onclick=draw;area.after(reset);
        const submit=document.createElement('button');submit.textContent='检查句子';submit.onclick=()=>{if(feedback(chosen.join(' ')===target))finish()};reset.after(submit);
      }else{
        if(step===1){const play=document.createElement('button');play.textContent='🔊 听发音';play.onclick=()=>voice(target,c.targetLang,0.85,box.querySelector('[role=status]'));area.before(play);}
        options.forEach(value=>{const b=document.createElement('button');b.textContent=value;b.onclick=()=>{if(!feedback(value===target))return;if(step===0){step++;draw()}else finish()};area.appendChild(b)});
      }
    }
    lock();draw();
  }
  function renderReview(host){
    const entries=Object.entries(state().review||{});const due=entries.filter(([,x])=>x.due<=Date.now());
    host.innerHTML=`<h2>今日复习</h2><p>${due.length?'今天有 '+due.length+' 个词句待复习。':'今天暂无待复习词句。做错的小练习会自动加入这里。'}${entries.length?' · 共 '+entries.length+' 个已记录词句':''}</p><div class="review-list"></div>`;
    const list=host.querySelector('.review-list');
    due.slice(0,10).forEach(([id,x])=>{
      const card=document.createElement('article');card.className='study-tool';card.innerHTML=`<span class="eyebrow">${x.lang==='kk'?'哈萨克语':'俄语'}</span><h3>${esc(x.cn)}</h3><p>先自己说，再看参考答案。</p><button type="button" data-reveal>查看参考答案</button><div hidden><strong>${esc(x.target)}</strong><p>${esc(x.note)}</p><button data-hear>听发音</button><p role="status"></p><div class="study-actions"><button data-again>还不熟，稍后再练</button><button data-known>已掌握，明天复习</button></div></div>`;
      card.querySelector('[data-reveal]').onclick=e=>{e.target.hidden=true;card.querySelector('div').hidden=false};
      card.querySelector('[data-hear]').onclick=()=>voice(x.target,x.lang,0.85,card.querySelector('[role=status]'));
      function schedule(known){update(s=>{const r=s.review[id];if(!r)return;r.streak=known?(r.streak||0)+1:0;r.due=Date.now()+(known?86400000:600000)});renderReview(host);}
      card.querySelector('[data-again]').onclick=()=>schedule(false);card.querySelector('[data-known]').onclick=()=>schedule(true);list.appendChild(card);
    });
    if(due.length>10)host.insertAdjacentHTML('beforeend','<p>先复习这 10 个，完成后会显示下一组。</p>');
  }
  async function ready(){await window.KZAuth.ready;if(!window.KZAuth.getClient())throw new Error('登录服务不可用');await pull();}
  window.KZLearning={ready,esc,resume,remember,state,review,attachLesson,renderReview,voice,updateLinks};
  window.KZAuth.ready.then(()=>{
    const u=window.KZAuth.getUser();
    if(u&&!localStorage.getItem('kz-study-guest-claimed')){
      const guest=readKey('kz-study:guest'),account=state();
      if(Object.keys(guest).length){update(s=>{s.review={...guest.review,...s.review};s.practice={...guest.practice,...s.practice};s.courses={...guest.courses,...s.courses};s.last=s.last||guest.last});localStorage.setItem('kz-study-guest-claimed',u.id);}
    }
    updateLinks();
    pull();
  }).catch(()=>{});
})();
