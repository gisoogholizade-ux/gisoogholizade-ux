(()=>{
  const HUMAN_SPRITE='./assets/avatar-sprite-hd15.jpg?v=e261cad4';
  const FALLBACK_SPRITE='./assets/avatar-sprite-v3.jpg?v=3820d02a';
  function paint(el,i){
    if(!el)return;
    i=Math.max(0,Math.min(19,Number(i)||0));
    const isHuman=i<15;
    const renderKey=`${i}-${isHuman?'hd':'old'}`;
    if(el.dataset.avatarRenderKey===renderKey)return;
    el.dataset.avatarRenderKey=renderKey;
    el.dataset.avatarFixed=String(i);
    el.innerHTML='';
    const c=i%5,r=Math.floor(i/5);
    el.style.position='relative';
    el.style.overflow='hidden';
    el.style.backgroundColor='#11182a';
    el.style.backgroundImage=`url("${isHuman?HUMAN_SPRITE:FALLBACK_SPRITE}")`;
    el.style.backgroundRepeat='no-repeat';
    if(isHuman){
      el.style.backgroundSize='500% 300%';
      el.style.backgroundPosition=`${c*25}% ${r*50}%`;
    }else{
      el.style.backgroundSize='500% 400%';
      el.style.backgroundPosition=`${c*25}% ${r*(100/3)}%`;
    }
    el.style.imageRendering='auto';
  }
  function apply(){
    document.querySelectorAll('[data-avatar-face]').forEach(el=>paint(el,el.dataset.avatarFace));
    document.querySelectorAll('.ll42Preset[data-avatar]').forEach(btn=>paint(btn.querySelector('.ll43Face'),btn.dataset.avatar));
    const p=[1,10,7];
    document.querySelectorAll('.ll42PartnerIcon').forEach((el,n)=>paint(el,el.dataset.avatarFace!==undefined?el.dataset.avatarFace:(p[n]||0)));
  }
  new MutationObserver(apply).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['data-avatar-face']});
  document.addEventListener('click',()=>setTimeout(apply,0));
  setInterval(apply,700);
  setTimeout(apply,0);
})();