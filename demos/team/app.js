const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('show')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

const counters=document.querySelectorAll('[data-count]');const countIO=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target,target=Number(el.dataset.count||0),suffix=el.dataset.suffix||'';let start=0;const tick=()=>{start+=Math.max(1,Math.ceil(target/28));if(start>target)start=target;el.textContent=start+suffix;if(start<target)requestAnimationFrame(tick)};tick();countIO.unobserve(el)}),{threshold:.6});counters.forEach(el=>countIO.observe(el));

const typeTarget=document.querySelector('[data-type]');if(typeTarget){const words=['frontend','backend','APIs','databases','deployment'];let wi=0,ci=0,del=false;const type=()=>{const word=words[wi];typeTarget.textContent=word.slice(0,ci);if(!del&&ci<word.length)ci++;else if(!del){del=true;setTimeout(type,950);return}else if(ci>0)ci--;else{del=false;wi=(wi+1)%words.length}setTimeout(type,del?45:85)};type()}

const form=document.querySelector('#estimator');if(form){const outputDays=document.querySelector('#estimate-days'),outputScope=document.querySelector('#estimate-scope');const update=()=>{const type=form.elements.type.value;complexity=Number(form.elements.complexity.value);const base={landing:2,dashboard:5,api:4,marketplace:10}[type]||3;const days=Math.round(base*complexity);outputDays.textContent=`${days}–${days+Math.max(2,Math.round(days*.35))} days`;outputScope.textContent=complexity<=1?'Lean MVP':complexity<=1.5?'Standard build':'Advanced build'};form.addEventListener('input',update);update()}

const copy=document.querySelector('[data-copy-email]');const toast=document.querySelector('.copyNote');if(copy){copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText('gholizadegisoo@gmail.com');toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1600)}catch{location.href='mailto:gholizadegisoo@gmail.com'}})}

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{const menu=document.querySelector('.navlinks');if(menu)menu.classList.remove('open')}));

// Keep the real marketplace inside the portfolio instead of sending visitors to the production site.
const umasilLink=document.querySelector('a[href="https://umasil.com"]');if(umasilLink){umasilLink.href='umasil.html';umasilLink.removeAttribute('target');umasilLink.removeAttribute('rel');umasilLink.textContent='View case study →'}
