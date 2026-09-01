(()=>{
  const SPRITE='./assets/avatar-sprite-v3.jpg?v=7e7ab00a';
  function paint(el,i){
    if(!el)return;
    i=Math.max(0,Math.min(19,Number(i)||0));
    const key='v3-'+i;
    if(el.dataset.avatarRenderKey===key && el.querySelector('img[data-ll-avatar-img]'))return;
    el.dataset.avatarRenderKey=key;
    el.dataset.avatarFixed=String(i);
    const c=i%5,r=Math.floor(i/5);
    el.style.position='relative';
    el.style.overflow='hidden';
    el.style.background='none';
    el.innerHTML=`<img data-ll-avatar-img src="${SPRITE}" alt="avatar" draggable="false" style="position:absolute;display:block;max-width:none!important;width:500%!important;height:400%!important;left:${-c*100}%;top:${-r*100}%;object-fit:fill;image-rendering:auto;pointer-events:none;user-select:none">`;
  }
  function apply(){
    document.querySelectorAll('[data-avatar-face]').forEach(el=>paint(el,el.dataset.avatarFace));
    document.querySelectorAll('.ll42Preset[data-avatar]').forEach(btn=>paint(btn.querySelector('.ll43Face'),btn.dataset.avatar));
    document.querySelectorAll('.ll42PartnerIcon').forEach((el,n)=>paint(el,el.dataset.avatarFace!==undefined?el.dataset.avatarFace:[1,10,7][n]||0));
  }
  new MutationObserver(apply).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['data-avatar-face']});
  document.addEventListener('click',()=>setTimeout(apply,0));
  setInterval(apply,500);
  setTimeout(apply,0);
})();