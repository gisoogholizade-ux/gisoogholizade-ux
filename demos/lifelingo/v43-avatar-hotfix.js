(()=>{
  const SPRITE='./assets/avatar-human-hq.webp?v=e2fd75cc';
  function mapIndex(i){
    i=Number(i)||0;
    if(i>=0&&i<=4)return {c:i,r:0};
    if(i>=10&&i<=14)return {c:i-10,r:1};
    return {c:0,r:0};
  }
  function paint(el,i){
    if(!el)return;
    i=Number(i)||0;
    const {c,r}=mapIndex(i);
    const key=`${i}-hq10`;
    if(el.dataset.avatarRenderKey===key)return;
    el.dataset.avatarRenderKey=key;
    el.dataset.avatarFixed=String(i);
    el.innerHTML='';
    el.style.position='relative';
    el.style.overflow='hidden';
    el.style.backgroundColor='#11182a';
    el.style.backgroundImage=`url("${SPRITE}")`;
    el.style.backgroundRepeat='no-repeat';
    el.style.backgroundSize='500% 200%';
    el.style.backgroundPosition=`${c*25}% ${r*100}%`;
    el.style.imageRendering='auto';
  }
  function apply(){
    document.querySelectorAll('[data-avatar-face]').forEach(el=>paint(el,el.dataset.avatarFace));
  }
  new MutationObserver(apply).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['data-avatar-face']});
  document.addEventListener('click',()=>setTimeout(apply,0));
  setInterval(apply,500);
  setTimeout(apply,0);
})();