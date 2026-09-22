(function () {
  const cfg = window.SUPABASE_CONFIG || {};
  const configured = cfg.url && cfg.publishableKey && !cfg.url.includes('YOUR-PROJECT') && !cfg.publishableKey.includes('YOUR_SUPABASE');
  let client = null;

  function esc(value) {
    return String(value || '').replace(/[&<>'"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' }[c]));
  }

  function redirectUrl() {
    return new URL('auth.html', window.location.href).href;
  }

  function renderAuthNav(user) {
    const host = document.getElementById('authNav');
    if (!host) return;
    if (user) {
      host.innerHTML = `<span class="auth-user" title="${esc(user.email)}">${esc(user.email)}</span><button class="auth-nav-btn" id="authLogout">退出</button>`;
      document.getElementById('authLogout')?.addEventListener('click', async () => {
        if (!client) return;
        const { error } = await client.auth.signOut();
        if (error) alert(error.message || '退出失败');
      });
    } else {
      host.innerHTML = `<a class="auth-link" href="auth.html">登录 / 注册</a>`;
    }
  }

  function showConfigWarning() {
    const host = document.getElementById('authConfigWarning');
    if (host) host.classList.remove('hidden');
  }

  function setupAuthPage() {
    const form = document.getElementById('authForm');
    if (!form) return;
    if (!configured || !client) {
      showConfigWarning();
      return;
    }

    const modeTitle = document.getElementById('authModeTitle');
    const modeDesc = document.getElementById('authModeDesc');
    const submit = document.getElementById('authSubmit');
    const toggle = document.getElementById('authToggle');
    const message = document.getElementById('authMessage');
    const emailInput = document.getElementById('authEmail');
    const passwordInput = document.getElementById('authPassword');
    const passwordConfirmWrap = document.getElementById('passwordConfirmWrap');
    const passwordConfirm = document.getElementById('authPasswordConfirm');
    const nameInput = document.getElementById('authName');
    const nameWrap = document.getElementById('nameWrap');
    let mode = new URLSearchParams(location.search).get('mode') === 'signup' ? 'signup' : 'login';

    function setMessage(text, type='') {
      message.textContent = text;
      message.className = `auth-message ${type}`.trim();
    }

    function drawMode() {
      const signup = mode === 'signup';
      modeTitle.textContent = signup ? '创建账号' : '登录账号';
      modeDesc.textContent = signup ? '注册后可以继续保存你的学习状态。' : '使用邮箱和密码继续学习。';
      submit.textContent = signup ? '注册' : '登录';
      toggle.innerHTML = signup ? '已有账号？<strong>立即登录</strong>' : '还没有账号？<strong>创建账号</strong>';
      passwordConfirmWrap.classList.toggle('hidden', !signup);
      nameWrap.classList.toggle('hidden', !signup);
      passwordConfirm.required = signup;
      nameInput.required = false;
      setMessage('');
    }

    toggle.addEventListener('click', e => {
      e.preventDefault();
      mode = mode === 'login' ? 'signup' : 'login';
      const url = new URL(location.href); url.searchParams.set('mode', mode); history.replaceState({}, '', url);
      drawMode();
    });

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const signup = mode === 'signup';
      if (!email || !password) return setMessage('请填写邮箱和密码。', 'bad');
      if (signup && password.length < 8) return setMessage('密码至少 8 个字符。', 'bad');
      if (signup && password !== passwordConfirm.value) return setMessage('两次输入的密码不一致。', 'bad');

      submit.disabled = true;
      submit.textContent = signup ? '注册中…' : '登录中…';
      try {
        if (signup) {
          const { data, error } = await client.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: redirectUrl(),
              data: { display_name: nameInput.value.trim() }
            }
          });
          if (error) throw error;
          if (data.session) {
            setMessage('注册成功，正在进入网站…', 'ok');
            setTimeout(() => { location.href = 'index.html'; }, 500);
          } else {
            setMessage('注册成功。请打开邮箱中的验证链接，然后回来登录。', 'ok');
          }
        } else {
          const { data, error } = await client.auth.signInWithPassword({ email, password });
          if (error) throw error;
          if (data.session) {
            setMessage('登录成功，正在进入网站…', 'ok');
            setTimeout(() => {
              const next = new URLSearchParams(location.search).get('next');
              location.href = next || 'index.html';
            }, 350);
          }
        }
      } catch (err) {
        setMessage(err?.message || '操作失败，请稍后再试。', 'bad');
      } finally {
        submit.disabled = false;
        submit.textContent = signup ? '注册' : '登录';
      }
    });

    client.auth.getSession().then(({ data }) => {
      if (data.session && mode === 'login') {
        document.getElementById('alreadyLoggedIn').classList.remove('hidden');
        document.getElementById('alreadyEmail').textContent = data.session.user.email || '';
        document.getElementById('logoutFromAuth').onclick = async () => { await client.auth.signOut(); location.reload(); };
      }
    });

    drawMode();
  }

  async function boot() {
    if (configured && window.supabase?.createClient) {
      client = window.supabase.createClient(cfg.url, cfg.publishableKey, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
      });
      client.auth.onAuthStateChange((_event, session) => renderAuthNav(session?.user || null));
      const { data } = await client.auth.getSession();
      renderAuthNav(data.session?.user || null);
    } else {
      renderAuthNav(null);
      if (document.body.dataset.page === 'auth') showConfigWarning();
    }
    setupAuthPage();
  }

  window.KZAuth = {
    getClient: () => client,
    isConfigured: () => configured
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
