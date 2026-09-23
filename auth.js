(function () {
  const cfg = window.SUPABASE_CONFIG || {};
  const configured = cfg.url && cfg.publishableKey && !cfg.url.includes('YOUR-PROJECT') && !cfg.publishableKey.includes('YOUR_SUPABASE');
  let client = null, recoveryUser = null, pageController = null;

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
        client.auth.onAuthStateChange((event,session)=>{
          renderAuthNav(session?.user || null);
          if(event==='PASSWORD_RECOVERY' && session?.user){
            recoveryUser=session.user; pageController?.recover(session.user);
          }
          if(event==='SIGNED_OUT'){recoveryUser=null;pageController?.signedOut();}
        });
        const {data}=await client.auth.getSession();renderAuthNav(data?.session?.user || null);
      } else {renderAuthNav(null);if(document.body.dataset.page==='auth')showConfigWarning();}
      setupAuthPage();
    } catch {
      const host=document.getElementById('authMessage');
      if(host){host.textContent='登录服务暂时不可用，请刷新后重试。';host.className='auth-message bad';}
    }
  }
  window.KZAuth={getClient:()=>client,isConfigured:()=>configured};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();

