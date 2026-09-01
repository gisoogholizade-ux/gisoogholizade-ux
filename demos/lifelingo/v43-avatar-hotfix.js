(()=>{
  const SPRITE='./assets/avatar-sprite-v3.jpg?v=3820d02a';
  function paint(el,i){
    if(!el)return;
    i=Math.max(0,Math.min(19,Number(i)||0));
    el.dataset.avatarFixed=String(i);
    el.innerHTML='';
    const c=i%5,r=Math.floor(i/5);
    el.style.position='relative';
    el.style.overflow='hidden';
    el.style.backgroundColor='#11182a';
    el.style.backgroundImage=`url("${SPRITE}")`;
    el.style.backgroundRepeat='no-repeat';
    el.style.backgroundSize='500% 400%';
    el.style.backgroundPosition=`${c*25}% ${r*(100/3)}%`;
  }
  function apply(){
    document.querySelectorAll('.ll42Preset[data-avatar]').forEach(btn=>paint(btn.querySelector('.ll43Face'),btn.dataset.avatar));
    const active=document.querySelector('.ll42Preset.active[data-avatar]');
    paint(document.querySelector('.ll43PreviewFace'),active?.dataset.avatar||0);
    const p=[1,10,7];
    document.querySelectorAll('.ll42PartnerIcon').forEach((el,n)=>paint(el,p[n]||0));
  }
  new MutationObserver(apply).observe(document.documentElement,{childList:true,subtree:true});
  document.addEventListener('click',()=>setTimeout(apply,0));
  setInterval(apply,500);
  setTimeout(apply,0);
})();