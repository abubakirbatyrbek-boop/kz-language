(function(){
  function gateHtml(title, text, next){
    const n=encodeURIComponent(next || location.href);
    return `<div class="login-gate"><span class="eyebrow">需要账号才能继续</span><h1>${title}</h1><p>${text}</p><div class="gate-stats"><span>☁️ 学习数据云端保存</span><span>📊 记录学习进度</span><span>🔄 下次打开可继续</span></div><div class="result-actions"><a class="secondary-btn" href="index.html">返回首页</a><a class="primary-btn" href="auth.html?mode=signup&next=${n}">注册 / 登录</a></div></div>`;
  }
  async function getUser(){
    try{
      const c=window.KZAuth?.getClient?.();
      if(!c) return null;
      const {data}=await c.auth.getSession();
      return data?.session?.user || null;
    }catch(e){ console.warn('access check failed',e); return null; }
  }
  async function protect(id, title, text){
    const host=document.getElementById(id); if(!host) return true;
    const u=await getUser();
    if(u) return true;
    host.innerHTML=gateHtml(title,text,location.href);
    return false;
  }
  // Scenes, scene tests and the government glossary are open to guests; the login
  // link in the header stays available. protect() is kept for any future page that needs it.
  window.KZProtect={protect,getUser};
})();
