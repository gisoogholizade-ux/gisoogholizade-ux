(()=>{
  const AVATARS=['👩🏻‍💻','👩🏻‍🎨','👩🏻‍🔬','👩🏻‍🚀','👩🏻‍🏫','👩🏽‍💻','👩🏼‍🎓','👩🏾‍🎤','👩🏻‍🍳','👩🏼‍🚀','👨🏻‍💻','👨🏽‍🎨','👨🏼‍🔬','👨🏾‍🚀','👨🏻‍🏫','🐱','🐶','🦊','🐼','🐰'];
  const BG=['#6d28d9','#2563eb','#0891b2','#0f766e','#16a34a','#ca8a04','#ea580c','#dc2626','#db2777','#9333ea','#4f46e5','#0284c7','#059669','#65a30d','#d97706','#7c3aed','#0ea5e9','#10b981','#f59e0b','#ec4899'];
  function renderAvatar(el,i){
    if(!el) return;
    i=Math.max(0,Math.min(19,Number(i)||0));
    if(el.dataset.avatarFixed===String(i) && el.querySelector('.llAvatarInline')) return;
    el.dataset.avatarFixed=String(i);
    el.style.backgroundImage='none';
    el.style.position='relative';
    el.style.overflow='hidden';
    el.innerHTML=`<span class="llAvatarInline" aria-label="avatar" style="position:absolute;inset:0;display:grid;place-items:center;background:radial-gradient(circle at 32% 24%,rgba(255,255,255,.28),transparent 28%),linear-gradient(145deg,${BG[i]},#111827);font-size:clamp(34px,8vw,76px);line-height:1;user-select:none"><span style="filter:drop-shadow(0 8px 12px rgba(0,0,0,.35));transform:translateY(2%)">${AVATARS[i]}</span></span>`;
  }
  function apply(){
    document.querySelectorAll('.ll42Preset[data-avatar]').forEach(btn=>renderAvatar(btn.querySelector('.ll43Face'),btn.dataset.avatar));
    const active=document.querySelector('.ll42Preset.active[data-avatar]');
    renderAvatar(document.querySelector('.ll43PreviewFace'),active?.dataset.avatar||0);
    const partnerIds=[1,10,7];
    document.querySelectorAll('.ll42PartnerIcon').forEach((el,n)=>renderAvatar(el,partnerIds[n]||0));
  }
  const mo=new MutationObserver(apply);
  mo.observe(document.documentElement,{childList:true,subtree:true});
  document.addEventListener('click',()=>setTimeout(apply,0));
  setInterval(apply,500);
  setTimeout(apply,0);
})();