(()=>{
const $=s=>document.querySelector(s);
const user=()=>{try{return JSON.parse(localStorage.getItem('lifelingo_user')||'null')}catch{return null}};
const key=()=>`lifelingo_social_${String(user()?.email||'guest').toLowerCase()}`;
const IMG=(id)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&h=900&q=88&crop=faces`;
const avatars=[
{id:0,cat:'girls',src:IMG('photo-1607346774265-5be74318fc90')},
{id:1,cat:'girls',src:IMG('photo-1759873911583-f492fdb1ba21')},
{id:2,cat:'girls',src:IMG('photo-1777499251009-a3b4c7b62eba')},
{id:3,cat:'girls',src:IMG('photo-1531907779240-9a7c7ad096df')},
{id:4,cat:'girls',src:IMG('photo-1765338913333-bc71eafe4fca')},
{id:10,cat:'boys',src:IMG('photo-1748911840277-fbf065623e1f')},
{id:11,cat:'boys',src:IMG('photo-1773880374017-bfcbec581dc6')},
{id:12,cat:'boys',src:IMG('photo-1765211216563-5e7b8ba7f25c')},
{id:13,cat:'boys',src:IMG('photo-1648933837594-54b10f36b6d5')},
{id:14,cat:'boys',src:IMG('photo-1594763781886-8c0f1dc9cc1d')}
];
const VERSION=7;
const save=s=>localStorage.setItem(key(),JSON.stringify(s));
const load=()=>{try{const raw=JSON.parse(localStorage.getItem(key())||'{}');const s=Object.assign({avatar:0,surpriseUsed:false,surpriseGender:null,surpriseVersion:VERSION},raw);if(raw.surpriseVersion!==VERSION){s.surpriseUsed=false;s.surpriseGender=null;s.surpriseVersion=VERSION;save(s)}return s}catch{return{avatar:0,surpriseUsed:false,surpriseGender:null,surpriseVersion:VERSION}}};
const displayName=()=>{const u=user()||{};return u.name||u.displayName||u.fullName||(u.email?String(u.email).split('@')[0]:'You')};
const byId=id=>avatars.find(a=>a.id===Number(id))||avatars[0];
const face=(i,cls='')=>{const a=byId(i);return `<span class="ll43Face ${cls}" data-avatar-face="${a.id}"><img class="llAvatarPhoto" src="${a.src}" alt="LifeLingo avatar" loading="eager" decoding="async"></span>`};
function syncProfileButton(){const b=$('#profileBtn');if(!b||!user())return;const s=load();b.classList.add('llProfileAvatarBtn');if(s.surpriseUsed){const a=byId(s.avatar);b.innerHTML=`<img src="${a.src}" alt="Profile avatar">`;b.setAttribute('aria-label','Open profile')}else{b.innerHTML='<span class="llProfileMystery">?</span>';b.setAttribute('aria-label','Open profile')}}
function host(){const p=$('#profile');if(!p||!user())return null;let h=$('#ll42Social');if(!h){h=document.createElement('section');h.id='ll42Social';h.className='ll42Social';const a=$('#ll41Retention')||$('#ll41DailyProfile')||p.querySelector('.hub');a?.after(h)}return h}
function render(){const h=host();if(!h)return;const s=load();h.innerHTML=`<div class="ll42SocialTop"><div><div class="ll41Eyebrow">YOUR IDENTITY</div><h3>Your LifeLingo avatar</h3><p>${s.surpriseUsed?'Your one-time avatar has been revealed ✨':'One tap. One chance. One avatar made for you.'}</p></div></div><div data-panel></div>`;avatarPanel(h);syncProfileButton()}
function avatarPanel(h){const s=load();if(!s.surpriseUsed){h.querySelector('[data-panel]').innerHTML=`<div class="llSurpriseIntro"><div class="llSurpriseOrb">✨</div><h3>Ready for your surprise?</h3><p>You can reveal your LifeLingo avatar only once. Choose Girl or Boy, then we pick one completely at random.</p><button class="ll42Share llOnlySurprise" data-surprise>✨ Surprise me</button></div>`;return}const picked=byId(s.avatar);h.querySelector('[data-panel]').innerHTML=`<div class="llSurpriseResult"><div class="llRevealGlow"></div>${face(picked.id,'ll43PreviewFace llSurpriseFace')}<div class="llRevealCopy"><small>✨ YOUR LIFELINGO AVATAR ✨</small><h3>${displayName()}, meet your avatar</h3><p>This was your one-time random reveal.</p><button class="ll42Share" data-share>Share to your story</button><button class="llStorySave" data-copy>Copy invite link</button></div></div>`}
function askGender(h){h.querySelector('[data-panel]').innerHTML=`<div class="llGenderPick"><div class="llSurpriseOrb">?</div><h3>Pick your avatar group</h3><p>Your avatar will be randomly selected only from the group you choose.</p><div class="llGenderBtns"><button data-gender="girls">Girl</button><button data-gender="boys">Boy</button></div></div>`}
function reveal(gender,h){const s=load();if(s.surpriseUsed)return avatarPanel(h);const pool=avatars.filter(a=>a.cat===gender);if(!pool.length)return;const picked=pool[Math.floor(Math.random()*pool.length)];s.avatar=picked.id;s.surpriseUsed=true;s.surpriseGender=gender;s.surpriseVersion=VERSION;save(s);avatarPanel(h);syncProfileButton()}
const inviteUrl=()=>location.origin+location.pathname;
async function share(){const text=`✨ LifeLingo picked my one-time avatar!\nMeet yours: ${inviteUrl()}\n#LifeLingo`;try{if(navigator.share)await navigator.share({title:'My LifeLingo avatar ✨',text,url:inviteUrl()});else{await navigator.clipboard.writeText(text);alert('Invite copied ✨')}}catch(e){}}
async function copyInvite(){try{await navigator.clipboard.writeText(inviteUrl());alert('Invite link copied ✨')}catch(e){}}
function click(e){const h=e.target.closest('#ll42Social');if(!h)return;const b=e.target.closest('button');if(!b)return;if(b.dataset.surprise!==undefined)return askGender(h);if(b.dataset.gender)return reveal(b.dataset.gender,h);if(b.dataset.share!==undefined)return share();if(b.dataset.copy!==undefined)return copyInvite()}
document.addEventListener('click',click);
setTimeout(()=>{render();syncProfileButton()},700);
setInterval(()=>{if(user()&&!$('#ll42Social'))render();syncProfileButton()},2500);
})();