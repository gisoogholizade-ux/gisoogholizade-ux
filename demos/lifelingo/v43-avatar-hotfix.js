(()=>{
  const SPRITE='https://raw.githubusercontent.com/gisoogholizade-ux/gisoogholizade-ux/main/demos/lifelingo/assets/avatar-sprite.jpg?v=20260901-3';
  function crop(el,i){
    if(!el) return;
    i=Number(i)||0;
    const c=i%5, r=Math.floor(i/5);
    if(el.dataset.avatarFixed===String(i) && el.querySelector('img')) return;
    el.dataset.avatarFixed=String(i);
    el.style.backgroundImage='none';
    el.style.position='relative';
    el.style.overflow='hidden';
    el.innerHTML=`<img src="${SPRITE}" alt="avatar" draggable="false" referrerpolicy="no-referrer" style="position:absolute;display:block;max-width:none!important;width:500%!important;height:400%!important;left:${-c*100}%;top:${-r*100}%;object-fit:fill;">`;
  }
  function apply(){
    document.querySelectorAll('.ll42Preset[data-avatar]').forEach(btn=>crop(btn.querySelector('.ll43Face'),btn.dataset.avatar));
    const active=document.querySelector('.ll42Preset.active[data-avatar]');
    crop(document.querySelector('.ll43PreviewFace'),active?.dataset.avatar||0);
    const partnerIds=[1,10,7];
    document.querySelectorAll('.ll42PartnerIcon').forEach((el,n)=>crop(el,partnerIds[n]||0));
  }
  const mo=new MutationObserver(apply);
  mo.observe(document.documentElement,{childList:true,subtree:true});
  document.addEventListener('click',()=>setTimeout(apply,0));
  setInterval(apply,600);
  setTimeout(apply,0);
})();