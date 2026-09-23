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
  window.KZProtect={protect,getUser};
  document.addEventListener('DOMContentLoaded', async ()=>{
    const page=document.body.dataset.page;
    if(page==='scene-list') await protect('protectedContent','场景练习需要注册 / 登录','登录后才能进入生活场景和工作场景，并保存你的场景学习与考试数据。');
    if(page==='government') await protect('protectedContent','国家机关词库需要注册 / 登录','登录后才能进入国家机关词库，并在之后继续查看学习数据。');
    if(page==='scene') await protect('protectedContent','场景练习需要注册 / 登录','注册或登录后才能进入这个场景的课程、练习和场景考试。');
    if(page==='test') await protect('protectedContent','场景考试需要注册 / 登录','注册或登录后才能参加场景考试，成绩会和你的账号关联。');
    if(page==='learn' && new URLSearchParams(location.search).get('pool')==='scene') await protect('protectedContent','场景练习需要注册 / 登录','登录后才能进入场景练习，并保存你的学习进度。');
  });
})();
