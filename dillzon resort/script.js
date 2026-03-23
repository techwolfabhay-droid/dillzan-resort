'use strict';

/* ─── DATA ─── */
const DEF = {
  password: 'dillzan2025',
  contact: { email:'info@dillzanresort.com', address:'Alibaug, Raigad · 1 min from Mandwa Jetty', whatsapp:'917715966111' },
  social: { whatsapp:'917715966111', instagram:'https://www.instagram.com/the_dilzan_resort?igsh=MWdwaXV3Mnhta3p1aA==', igHandle:'@the_dilzan_resort', facebook:'https://www.facebook.com/dillzanresort' },
  availability: { deluxe:'Subject to Availability', premium:'Subject to Availability', triple:'Subject to Availability', family:'Subject to Availability', dorm:'Subject to Availability' },
  amenities: [
    {id:1,icon:'fa-swimming-pool',name:'Swimming Pool',desc:'Beautiful pool to relax and unwind'},
    {id:2,icon:'fa-table-tennis',name:'Table Tennis',desc:'Full-size table for all ages'},
    {id:3,icon:'fa-chess-board',name:'Carrom Board',desc:'Classic indoor fun for families'},
    {id:4,icon:'fa-crosshairs',name:'Dart Board',desc:'Dart games and indoor activities'},
    {id:5,icon:'fa-gamepad',name:'Indoor Game Zone',desc:'Multiple indoor games under one roof'},
    {id:6,icon:'fa-utensils',name:'Veg and Non-Veg Food',desc:'Authentic food with love & tradition'},
    {id:7,icon:'fa-leaf',name:'Konkan Food',desc:'Traditional Alibaug Konkan cooking'},
    {id:8,icon:'fa-bed',name:'15 Clean Rooms',desc:'Comfortable rooms for all group sizes'},
    {id:9,icon:'fa-ship',name:'Near Mandwa Jetty',desc:'1 min by car — closest to M2M RoRo'},
    {id:10,icon:'fa-tree',name:'Peaceful Ambience',desc:'Calm green surroundings, away from city'},
    {id:11,icon:'fa-solid fa-snowflake',name:'AC rooms',desc:'with AC rooms'},
    {id:12,icon:'fa-solid fa-music',name:'Live Music',desc:'Calm and enjoying Music'},
  ],
  reviews: [
    {id:1,name:'Priya Sharma',city:'Mumbai',rating:5,date:'December 2024',text:'Absolutely magical stay! The location is breathtaking and the staff made us feel like royalty. The food was outstanding — especially the seafood!'},
    {id:2,name:'Rahul & Anita',city:'Pune',rating:5,date:'November 2024',text:'We celebrated our anniversary here and it exceeded all expectations. The all-inclusive package made everything so convenient and stress-free!'},
    {id:3,name:'Suresh Mehta',city:'Navi Mumbai',rating:5,date:'October 2024',text:'Brought the whole family here and everyone loved it. The pool, gaming zone are fantastic. Great value for money!'},
    {id:4,name:'Kavya Joshi',city:'Thane',rating:5,date:'September 2024',text:'Peaceful, beautiful, luxurious. Beach is literally a one-minute walk. The bonfire party was the highlight of our trip. Love this place!'},
  ],
  gallery: [
    {id:1,src:'images/about-pool.avif',cap:'Swimming Pool',cat:'resort',wide:true},
    {id:2,src:'images/reviews-bg.jpeg',cap:'Resort Night View',cat:'resort',wide:false},
    {id:3,src:'images/room-deluxe.jpeg',cap:'Deluxe Room',cat:'rooms',wide:false},
    {id:4,src:'images/room-triple.jpeg',cap:'Triple Room',cat:'rooms',wide:false},
    {id:5,src:'images/room-premium.jpeg',cap:'Premium Room',cat:'rooms',wide:false},
    {id:6,src:'images/room-family.jpeg',cap:'Family Room',cat:'rooms',wide:false},
    {id:7,src:'images/gallery-6.jpeg',cap:'Pomfret Fry',cat:'food',wide:false},
    {id:8,src:'images/gallery-2.jpeg',cap:'Crab Masala',cat:'food',wide:false},
    {id:9,src:'images/gallery-3.jpeg',cap:'Fish Fry',cat:'food',wide:false},
    {id:10,src:'images/gallery-1.jpeg',cap:'Chicken Special',cat:'food',wide:false},
    {id:11,src:'images/gallery-5.jpeg',cap:'Masala Pap',cat:'food',wide:false},
    {id:12,src:'images/gallery-7.jpeg',cap:'Crispy Fri  es',cat:'food',wide:true},
    {id:13,src:'images/gallery-8.jpeg',cap:'Crispy Fries  e',cat:'food',wide:true},
    {id:14,src:'images/gallery-9.jpeg',cap:'Crispy Fri',cat:'food',wide:true},
    {id:15,src:'images/gallery-12.jpeg',cap:'Crispyes',cat:'food',wide:true},
  ]
};

function load(){try{const s=localStorage.getItem('dz3');if(s)return{...DEF,...JSON.parse(s)};}catch(e){}return{...DEF};}
function save(){localStorage.setItem('dz3',JSON.stringify(D));}
let D=load();

/* ─── LOADER ─── */
function dismissLoader(){const l=document.getElementById('loader');if(l)l.classList.add('done');}
window.addEventListener('load',()=>setTimeout(dismissLoader,1800));
setTimeout(dismissLoader,3000);

/* ─── NAVBAR ─── */
const navbar=document.getElementById('navbar');
window.addEventListener('scroll',()=>{
  navbar.classList.toggle('scrolled',window.scrollY>60);
  document.getElementById('btt').classList.toggle('show',window.scrollY>400);
  highlightNav();
},{passive:true});
function highlightNav(){
  const off=window.scrollY+80;
  document.querySelectorAll('section[id]').forEach(s=>{
    const lnk=document.querySelector(`.nav-link[href="#${s.id}"]`);
    if(!lnk)return;
    lnk.classList.toggle('act',off>=s.offsetTop&&off<s.offsetTop+s.offsetHeight);
  });
}
document.getElementById('ham').addEventListener('click',()=>{document.getElementById('mobNav').classList.add('open');document.body.style.overflow='hidden';});
document.getElementById('mobClose').addEventListener('click',closeMob);
document.querySelectorAll('.mob-link,.mob-book').forEach(l=>l.addEventListener('click',closeMob));
function closeMob(){document.getElementById('mobNav').classList.remove('open');document.body.style.overflow='';}

/* ─── SMOOTH SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}});
});

/* ─── RIPPLE ─── */
document.addEventListener('click',e=>{
  const b=e.target.closest('.ripple');if(!b)return;
  const r=b.getBoundingClientRect(),w=Math.max(r.width,r.height);
  const s=document.createElement('span');s.className='ripple-w';
  s.style.cssText=`width:${w}px;height:${w}px;left:${e.clientX-r.left-w/2}px;top:${e.clientY-r.top-w/2}px`;
  b.appendChild(s);setTimeout(()=>s.remove(),600);
});

/* ─── REVEAL ─── */
const ro=new IntersectionObserver(es=>es.forEach((e,i)=>{if(e.isIntersecting){e.target.style.transitionDelay=i*.08+'s';e.target.classList.add('on');}}),{threshold:.1});
function observeReveal(){document.querySelectorAll('.reveal:not([data-ob])').forEach(el=>{el.setAttribute('data-ob','1');ro.observe(el);});}

/* ─── STAT COUNTER ─── */
let counted=false;
new IntersectionObserver(es=>{if(es[0].isIntersecting&&!counted){counted=true;
  document.querySelectorAll('.stat-num').forEach(el=>{
    const t=+el.dataset.to,step=t/60;let c=0;
    const iv=setInterval(()=>{c+=step;if(c>=t){c=t;clearInterval(iv);}el.textContent=Math.floor(c);},25);
  });}},{threshold:.4}).observe(document.getElementById('statsBar'));

/* ─── AMENITIES ─── */
function renderAmen(){
  const g=document.getElementById('amenGrid');if(!g)return;
  g.innerHTML=D.amenities.map(a=>`<div class="amen-card reveal"><div class="amen-icon"><i class="fas ${a.icon}"></i></div><h4>${a.name}</h4><p>${a.desc}</p></div>`).join('');
  observeReveal();
}

/* ─── GALLERY ─── */
let galFiltered=[],lbIdx=0;
function renderGal(cat='all'){
  galFiltered=cat==='all'?D.gallery:D.gallery.filter(g=>g.cat===cat);
  const g=document.getElementById('galGrid');if(!g)return;
  g.innerHTML=galFiltered.map((item,i)=>`<div class="gal-item${item.wide?' wide':''} reveal" onclick="openLB(${i})"><img src="${item.src}" alt="${item.cap}" loading="lazy"/><div class="gal-overlay"><i class="fas fa-search-plus"></i></div></div>`).join('');
  observeReveal();
}
document.querySelectorAll('.gf-btn').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.gf-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');renderGal(btn.dataset.cat);
}));
function openLB(i){lbIdx=i;updateLB();document.getElementById('lightbox').classList.add('open');document.body.style.overflow='hidden';}
function closeLB(){document.getElementById('lightbox').classList.remove('open');document.body.style.overflow='';}
function updateLB(){const it=galFiltered[lbIdx];if(!it)return;document.getElementById('lbImg').src=it.src;document.getElementById('lbCap').textContent=it.cap;}
document.getElementById('lbClose').addEventListener('click',closeLB);
document.getElementById('lbPrev').addEventListener('click',()=>{lbIdx=(lbIdx-1+galFiltered.length)%galFiltered.length;updateLB();});
document.getElementById('lbNext').addEventListener('click',()=>{lbIdx=(lbIdx+1)%galFiltered.length;updateLB();});
document.addEventListener('keydown',e=>{if(!document.getElementById('lightbox').classList.contains('open'))return;if(e.key==='Escape')closeLB();if(e.key==='ArrowLeft'){lbIdx=(lbIdx-1+galFiltered.length)%galFiltered.length;updateLB();}if(e.key==='ArrowRight'){lbIdx=(lbIdx+1)%galFiltered.length;updateLB();}});

/* ─── REVIEWS ─── */
let revSwiper;
function renderRevs(){
  const w=document.getElementById('revWrap');if(!w)return;
  w.innerHTML=D.reviews.map(r=>`<div class="swiper-slide"><div class="rev-card"><div class="rev-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div><p class="rev-text">${r.text}</p><div class="rev-foot"><div class="rev-av">${r.name.charAt(0)}</div><div class="rev-info"><h4>${r.name}</h4><span>${r.city}</span></div><span class="rev-date">${r.date}</span></div></div></div>`).join('');
  if(revSwiper)revSwiper.destroy(true,true);
  revSwiper=new Swiper('.rev-swiper',{loop:D.reviews.length>1,autoplay:{delay:4500,disableOnInteraction:false},slidesPerView:1,spaceBetween:16,pagination:{el:'.rev-pag',clickable:true},breakpoints:{600:{slidesPerView:2},900:{slidesPerView:3}}});
}

/* ─── CONTACT APPLY ─── */
function applyContact(){
  const c=D.contact,s=D.social;
  const waUrl=`https://wa.me/${s.whatsapp}`;
  ['waBtn','floatWa','ftWa'].forEach(id=>{const e=document.getElementById(id);if(e)e.href=waUrl;});
  ['igBtn','ftIg'].forEach(id=>{const e=document.getElementById(id);if(e)e.href=s.instagram;});
  ['igHandle','ftIgH'].forEach(id=>{const e=document.getElementById(id);if(e){e.textContent=s.igHandle;e.href=s.instagram;}});
  ['fbBtn','ftFb'].forEach(id=>{const e=document.getElementById(id);if(e)e.href=s.facebook;});
  const ce=document.getElementById('cEmail');if(ce)ce.textContent=c.email;
  const ca=document.getElementById('cAddr');if(ca)ca.textContent=c.address;
  ['ftAddr'].forEach(id=>{const e=document.getElementById(id);if(e)e.textContent=c.address.split('·')[0].trim();});
  ['ftEmail'].forEach(id=>{const e=document.getElementById(id);if(e)e.textContent=c.email;});
}

/* ─── ENQUIRY ─── */
function sendEnq(){
  const n=document.getElementById('bName').value.trim(),p=document.getElementById('bPhone').value.trim();
  if(!n||!p){alert('Please enter name and phone.');return;}
  const wa=D.social.whatsapp||'917715966111';
  const ci=document.getElementById('bIn').value,co=document.getElementById('bOut').value;
  const rm=document.getElementById('bRoom').value,gu=document.getElementById('bGuests').value;
  const ms=document.getElementById('bMsg').value.trim();
  const txt=`Hello! Booking enquiry at *The Dillzan Resort, Alibaug*\n\n👤 *Name:* ${n}\n📱 *Phone:* ${p}${ci?'\n📅 *Check-In:* '+ci:''}${co?'\n📅 *Check-Out:* '+co:''}${rm?'\n🛏 *Room:* '+rm:''}\n👥 *Guests:* ${gu}${ms?'\n📝 *Requests:* '+ms:''}\n\nThank you! 🙏`;
  window.open(`https://wa.me/${wa}?text=${encodeURIComponent(txt)}`,'_blank');
}
window.sendEnq=sendEnq;

/* ─── BOOKING DATE ─── */
function setupDates(){
  const today=new Date().toISOString().split('T')[0];
  const bi=document.getElementById('bIn'),bo=document.getElementById('bOut');
  if(bi){bi.min=today;bi.addEventListener('change',()=>{if(bo)bo.min=bi.value;});}
  if(bo)bo.min=today;
}

/* ─── ADMIN ─── */
function openAdmin(e){if(e)e.preventDefault();document.getElementById('admPanel').classList.add('open');document.getElementById('admOv').classList.add('open');document.body.style.overflow='hidden';document.getElementById('admLogin').style.display='';document.getElementById('admDash').style.display='none';document.getElementById('admPass').value='';}
function closeAdmin(){document.getElementById('admPanel').classList.remove('open');document.getElementById('admOv').classList.remove('open');document.body.style.overflow='';}
window.openAdmin=openAdmin;window.closeAdmin=closeAdmin;
function doLogin(){if(document.getElementById('admPass').value===D.password){document.getElementById('admLogin').style.display='none';const d=document.getElementById('admDash');d.style.display='flex';d.style.flexDirection='column';fillAdm();}else{alert('Wrong password.');document.getElementById('admPass').value='';}}
window.doLogin=doLogin;
document.querySelectorAll('.atab').forEach(t=>t.addEventListener('click',()=>{document.querySelectorAll('.atab').forEach(x=>x.classList.remove('active'));document.querySelectorAll('.atab-c').forEach(x=>x.classList.remove('active'));t.classList.add('active');document.getElementById('t-'+t.dataset.t).classList.add('active');}));
function fillAdm(){
  document.getElementById('aEmail').value=D.contact.email;
  document.getElementById('aAddr').value=D.contact.address;
  document.getElementById('aWA').value=D.contact.whatsapp;
  document.getElementById('sWA').value=D.social.whatsapp;
  document.getElementById('sIG').value=D.social.instagram;
  document.getElementById('sIGH').value=D.social.igHandle;
  document.getElementById('sFB').value=D.social.facebook;
  renderAdmAmen();renderAdmRevs();renderAdmGal();
}
function aMsg(t,c){const e=document.getElementById('admMsg');e.textContent=(c==='ok'?'✓ ':'✗ ')+t;e.className='adm-msg '+c;setTimeout(()=>{e.textContent='';e.className='adm-msg';},3000);}
function saveGeneral(){
  const om = document.getElementById('aOwnerMsg');
  const od = document.getElementById('aOwnerDesc');
  if (om && om.value.trim()) D.ownerMessage = om.value.trim();
  if (od && od.value.trim()) D.ownerDesc = od.value.trim();
  save(); applyOwnerData(); aMsg('Saved!', 'ok');
}
window.saveGeneral=saveGeneral;
function saveContact(){D.contact={email:document.getElementById('aEmail').value.trim()||D.contact.email,address:document.getElementById('aAddr').value.trim()||D.contact.address,whatsapp:document.getElementById('aWA').value.trim()||D.contact.whatsapp};save();applyContact();aMsg('Contact saved!','ok');}
window.saveContact=saveContact;
function saveSocial(){D.social={whatsapp:document.getElementById('sWA').value.trim()||D.social.whatsapp,instagram:document.getElementById('sIG').value.trim()||D.social.instagram,igHandle:document.getElementById('sIGH').value.trim()||D.social.igHandle,facebook:document.getElementById('sFB').value.trim()||D.social.facebook};D.contact.whatsapp=D.social.whatsapp;save();applyContact();aMsg('Social links saved!','ok');}
window.saveSocial=saveSocial;
function changePass(){const o=document.getElementById('pOld').value,n=document.getElementById('pNew').value,c=document.getElementById('pCon').value;if(o!==D.password){aMsg('Wrong current password.','err');return;}if(n.length<6){aMsg('Min 6 chars.','err');return;}if(n!==c){aMsg('Passwords do not match.','err');return;}D.password=n;save();aMsg('Password updated!','ok');['pOld','pNew','pCon'].forEach(id=>document.getElementById(id).value='');}
window.changePass=changePass;
// Amenities admin
function renderAdmAmen(){document.getElementById('amenAdmList').innerHTML=D.amenities.map(a=>`<div class="adm-row"><div class="adm-row-info"><h5><i class="fas ${a.icon}" style="color:var(--gold);margin-right:.3rem;"></i>${a.name}</h5><p>${a.desc}</p></div><button class="btn-del" onclick="delAmen(${a.id})"><i class="fas fa-trash"></i></button></div>`).join('');}
function addAmen(){const n=document.getElementById('nAName').value.trim(),i=document.getElementById('nAIcon').value.trim(),d=document.getElementById('nADesc').value.trim();if(!n){aMsg('Enter name.','err');return;}D.amenities.push({id:Date.now(),name:n,icon:i||'fa-check',desc:d});save();renderAmen();renderAdmAmen();aMsg('Added!','ok');['nAName','nAIcon','nADesc'].forEach(id=>document.getElementById(id).value='');}
function delAmen(id){if(!confirm('Delete?'))return;D.amenities=D.amenities.filter(a=>a.id!==id);save();renderAmen();renderAdmAmen();aMsg('Deleted.','ok');}
window.addAmen=addAmen;window.delAmen=delAmen;
// Reviews admin
function renderAdmRevs(){document.getElementById('revAdmList').innerHTML=D.reviews.map(r=>`<div class="adm-row"><div class="adm-row-info"><h5>${r.name} ★${r.rating} — ${r.city}</h5><p>${r.text.substring(0,60)}...</p></div><button class="btn-del" onclick="delRev(${r.id})"><i class="fas fa-trash"></i></button></div>`).join('');}
function addRev(){const n=document.getElementById('nRN').value.trim(),c=document.getElementById('nRC').value.trim(),r=Math.min(5,Math.max(1,+document.getElementById('nRR').value||5)),d=document.getElementById('nRD').value.trim(),t=document.getElementById('nRT').value.trim();if(!n||!t){aMsg('Enter name & review.','err');return;}D.reviews.unshift({id:Date.now(),name:n,city:c,rating:r,date:d,text:t});save();renderRevs();renderAdmRevs();aMsg('Review added!','ok');['nRN','nRC','nRR','nRD','nRT'].forEach(id=>document.getElementById(id).value='');}
function delRev(id){if(!confirm('Delete?'))return;D.reviews=D.reviews.filter(r=>r.id!==id);save();renderRevs();renderAdmRevs();aMsg('Deleted.','ok');}
window.addRev=addRev;window.delRev=delRev;
// Gallery admin
function renderAdmGal(){document.getElementById('galAdmList').innerHTML=D.gallery.map(g=>`<div class="adm-row"><div class="adm-row-info"><h5>${g.cap}</h5><p>${g.cat}</p></div><button class="btn-del" onclick="delGal(${g.id})"><i class="fas fa-trash"></i></button></div>`).join('');}
let pendingGalSrc='';
function handleGalUpload(input){const file=input.files[0];if(!file)return;const r=new FileReader();r.onload=e=>{pendingGalSrc=e.target.result;aMsg('Image ready — fill caption & click Add.','ok');};r.readAsDataURL(file);}
function addGalItem(){const cap=document.getElementById('nGCap').value.trim(),cat=document.getElementById('nGCat').value,wide=document.getElementById('nGWide').value==='true';if(!cap||!pendingGalSrc){aMsg('Upload image and add caption.','err');return;}D.gallery.push({id:Date.now(),src:pendingGalSrc,cap,cat,wide});save();renderGal('all');renderAdmGal();aMsg('Added!','ok');document.getElementById('nGCap').value='';pendingGalSrc='';}
function delGal(id){if(!confirm('Remove?'))return;D.gallery=D.gallery.filter(g=>g.id!==id);save();renderGal('all');renderAdmGal();aMsg('Removed.','ok');}
window.addGalItem=addGalItem;window.delGal=delGal;window.handleGalUpload=handleGalUpload;


// ── OWNER PHOTO UPDATE ──
function updateOwnerPhoto(input) {
  const file = input.files[0];
  if (!file) return;
  const r = new FileReader();
  r.onload = e => {
    const img = document.getElementById('ownerPhoto');
    if (img) img.src = e.target.result;
    D.ownerPhoto = e.target.result;
    save();
    aMsg('Owner photo updated!', 'ok');
  };
  r.readAsDataURL(file);
}
window.updateOwnerPhoto = updateOwnerPhoto;

function applyOwnerData() {
  if (D.ownerPhoto) {
    const img = document.getElementById('ownerPhoto');
    if (img) img.src = D.ownerPhoto;
  }
  if (D.ownerMessage) {
    const el = document.getElementById('ownerMessage');
    if (el) el.textContent = D.ownerMessage;
  }
  if (D.ownerDesc) {
    const el = document.getElementById('ownerDesc');
    if (el) el.textContent = D.ownerDesc;
  }
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded',()=>{
  renderAmen();
  renderGal('all');
  renderRevs();
  applyContact();
  applyOwnerData();
  setupDates();
  observeReveal();
});
