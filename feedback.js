(function(){
  const form=document.getElementById('feedbackForm');
  if(!form) return;
  const cfg=window.SUPABASE_CONFIG||{};
  const configured=cfg.url && cfg.publishableKey && !cfg.url.includes('YOUR-PROJECT') && !cfg.publishableKey.includes('YOUR_SUPABASE');
  let client=null;
  if(configured && window.supabase?.createClient){
    client=window.supabase.createClient(cfg.url,cfg.publishableKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  }
  const messageEl=document.getElementById('feedbackMessage');
  const submit=document.getElementById('feedbackSubmit');
  const emailInput=document.getElementById('feedbackEmail');
  const textArea=document.getElementById('feedbackMessage');
  const count=document.getElementById('messageCount');
  const setMsg=(t,type='')=>{messageEl.textContent=t;messageEl.className=('auth-message '+type).trim();};
  textArea.addEventListener('input',()=>{count.textContent=`${textArea.value.length} / 2000`;});

  async function prefill(){
    if(!client) return;
    const {data}=await client.auth.getSession();
    const email=data.session?.user?.email;
    if(email && !emailInput.value) emailInput.value=email;
  }
  prefill();

  form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const category=document.getElementById('feedbackCategory').value;
    const subject=document.getElementById('feedbackSubject').value.trim();
    const msg=textArea.value.trim();
    const email=emailInput.value.trim();
    const rating=Number(document.querySelector('input[name="rating"]:checked')?.value||0);
    if(msg.length<5) return setMsg('请至少填写 5 个字，方便我们理解你的问题。','bad');
    if(!configured || !client) return setMsg('反馈页面已做好，但还没有连接 Supabase。请先配置 supabase-config.js 并创建 feedback 数据表。','bad');
    if(email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setMsg('请输入正确的邮箱地址。','bad');
    submit.disabled=true; submit.textContent='提交中…'; setMsg('');
    try{
      const {data:sessionData}=await client.auth.getSession();
      const user=sessionData.session?.user||null;
      const {error}=await client.from('feedback').insert([{
        user_id:user?.id||null,
        email:email||user?.email||null,
        category,
        subject:subject||null,
        message:msg,
        rating:rating||null
      }]);
      if(error) throw error;
      setMsg('感谢你的反馈！已经提交成功。','ok');
      form.reset();
      count.textContent='0 / 2000';
      if(user?.email) emailInput.value=user.email;
    }catch(err){
      setMsg(err?.message||'提交失败，请稍后再试。','bad');
    }finally{submit.disabled=false;submit.textContent='提交反馈';}
  });
})();
