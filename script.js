const SCRIPT_URLS=['https://script.google.com/macros/s/AKfycbx5C72MF4UL5OSCAbg9Me5PQObcBlxxfTKHU5XVBXw5-PDEuq5UV5BsmIT66MdT1q9k/exec'];
let WORK_URL=SCRIPT_URLS[0];
const EDITOR_CODE='SB2026';
let articles=[],currentArticleId=null,currentFontSize=16,editingId=null,epaperPage=0;
let currentUser=JSON.parse(localStorage.getItem('sb_currentUser')||'null');
const EP_PER_PAGE=4;

const CLASSICS=[
{id:'c1',title:'বনলতা সেন',author:'জীবনানন্দ দাশ',category:'কবিতা',date:'৯৩৫',content:`হাজার বছর ধরে আমি পথ হাঁটিতেছি পৃথিবীর পথে,\nসিংহল সমুদ্র থেকে নিশীথের অন্ধকারে মালয় সাগরে\nঅনেক ঘুরেছি আমি; বিম্বিসার অশোকের ধূসর জগতে\nসেখানে ছিলাম আমি; আরো দূর অন্ধকারে বিদর্ভ নগরে;\nআমি ক্লান্ত প্রাণ এক, চারিদিকে জীবনের সমুদ্র সফেন,\nআমারে দু-দণ্ড শান্তি দিয়েছিলো নাটোরের বনলতা সেন।\n\nচুল তার কবেকার অন্ধকার বিদিশার নিশা,\nমুখ তার শ্রাবস্তীর কারুকার্য; অতিদূর সমুদ্রের 'পর\nহাল ভেঙে যে-নাবিক হারায়েছে দিশা\nসবুজ ঘাসের দেশ যখন সে চোখে দেখে দারুচিনি-দ্বীপের ভিতর,\nতেমনি দেখেছি তারে অন্ধকারে; বলেছে সে, 'এতোদিন কোথায় ছিলেন?'\nপাখির নীড়ের মতো চোখ তুলে নাটোরের বনলতা সেন।\n\nসমস্ত দিনের শেষে শিশিরের শব্দের মতন\nসন্ধ্যা আসে; ডানার রৌদ্রের গন্ধ মুছে ফেলে চিল;\nপৃথিবীর সব রঙ নিভে গেলে পাণ্ডুলিপি করে আয়োজন\nতখন গল্পের তরে জোনাকির রঙে ঝিলমিল;\nসব পাখি ঘরে আসে—সব নদী—ফুরায় এ-জীবনের সব লেনদেন;\nথাকে শুধু অন্ধকার, মুখোমুখি বসিবার বনলতা সেন।`},
{id:'c2',title:'বিদ্রোহী',author:'কাজী নজরুল ইসলাম',category:'কবিতা',date:'১৯২২',content:`বল বীর—\nবল উন্নত মম শির!\nশির নেহারি আমারি নতশির ওই শিখর হিমাদ্রির!\n\nআমি চিরদুর্দম, দুর্বিনীত, নৃশংস,\nমহা-প্রলয়ের আমি নটরাজ, আমি সাইক্লোন, আমি ধ্বংস!\nআমি মহাভয়, আমি অভিশাপ পৃথ্বীর,\nআমি দুর্বার,\nআমি ভেঙে করি সব চুরমার!\n\nআমি বিদ্রোহী ভৃগু, আমি বিশ্বহারা চিরবিদ্রোহী জ্বালামুখী!\nআমি সেই দিন হবো শান্ত,\nযবে উৎপীড়িতের ক্রন্দন-রোল আকাশে-বাতাসে ধ্বনিবে না,\nঅত্যাচারীর খড়্গ কৃপাণ ভীম রণ-ভূমে রণিবে না—\nবিদ্রোহী রণ-ক্লান্ত\nআমি সেই দিন হবো শান্ত!`},
{id:'c3',title:'যদি তোর ডাক শুনে কেউ না আসে',author:'রবীন্দ্রনাথ ঠাকুর',category:'কবিতা',date:'১৮৯৩',content:`যদি তোর ডাক শুনে কেউ না আসে তবে একলা চলো রে।\nএকলা চলো, একলা চলো, একলা চলো, একলা চলো রে॥\n\nযদি কেউ কথা না কয়, ওরে ওরে ও অভাগা,\nযদি সবাই থাকে মুখ ফিরায়ে সবাই করে ভয়—\nতবে পরান খুলে\nও তুই মুখ ফুটে তোর মনের কথা একলা বলো রে।\n\nযদি সবাই ফিরে যায়, ওরে ওরে ও অভাগা,\nযদি গহন পথে যাবার কালে কেউ ফিরে না চায়—\nতবে পথের কাঁটা\nও তুই রক্তমাখা চরণতলে একলা দলো রে।\n\nযদি ঝড়-বাদলে আঁধার রাতে দুয়ার দেয় ঘরে,\nতবে বজ্রানলে\nআপন বুকের পাঁজর জ্বালিয়ে নিয়ে একলা জ্বলো রে।`}
];

function epBn(n){return String(n).replace(/\d/g,d=>'০১২৩৪৫৬৭৮৯'[d]);}
function notify(m){const n=document.createElement('div');n.className='notification';n.textContent=m;document.body.appendChild(n);setTimeout(()=>n.remove(),3000);}
function setCurrentDate(){const d=new Date();document.getElementById('currentDate').textContent=d.toLocaleDateString('bn-BD',{weekday:'long',year:'numeric',month:'long',day:'numeric'})+', '+d.toLocaleTimeString('bn-BD',{hour:'2-digit',minute:'2-digit'});}
function toggleTheme(){const c=document.documentElement.getAttribute('data-theme');const t=c==='dark'?'light':'dark';document.documentElement.setAttribute('data-theme',t);localStorage.setItem('theme',t);}
document.documentElement.setAttribute('data-theme',localStorage.getItem('theme')||'light');
function findArticle(id){return articles.find(x=>String(x.id)===String(id))||CLASSICS.find(x=>String(x.id)===String(id));}
function allPublished(){return [...articles.filter(a=>a.status==='approved'),...CLASSICS];}

async function sheetGet(action,params){
  for(const u of SCRIPT_URLS){
    try{
      let url=u+'?action='+action;
      if(params)for(const k in params)url+='&'+k+'='+encodeURIComponent(params[k]);
      const r=await fetch(url);const j=await r.json();
      if(j&&!j.error){WORK_URL=u;return j;}
    }catch(e){}
  }
  return null;
}
async function sheetPost(d){
  const urls=[WORK_URL,...SCRIPT_URLS.filter(u=>u!==WORK_URL)];
  for(const u of urls){try{await fetch(u,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain'},body:JSON.stringify(d)});return true;}catch(e){}}
  return false;
}
async function loadArticlesFromSheet(){
  const [posts,pend]=await Promise.all([sheetGet('getPosts'),sheetGet('getPending')]);
  let list=[];
  if(Array.isArray(posts))list=list.concat(posts.map(p=>({id:String(p.id),title:p.title,author:p.author,category:p.category,image:p.image||'',content:p.content,date:p.date,views:parseInt(p.views)||0,status:(p.status===undefined||String(p.status).toLowerCase()==='approved')?'approved':'pending'})));
  if(Array.isArray(pend))list=list.concat(pend.filter(p=>!list.some(x=>x.id===String(p.id))).map(p=>({id:String(p.id),title:p.title,author:p.author,category:p.category,image:p.image||'',content:p.content,date:p.date,views:0,status:'pending'})));
  if(list.length>0){articles=list;saveArticles();return;}
  const local=localStorage.getItem('sb_articles');
  articles=local?JSON.parse(local):[];
}
function saveArticles(){localStorage.setItem('sb_articles',JSON.stringify(articles));}

function likeCount(id){return parseInt(localStorage.getItem('sb_likecount_'+id)||'0');}
function isLiked(id){return localStorage.getItem('sb_liked_'+id)==='1';}
function toggleLike(id){
  if(isLiked(id)){localStorage.removeItem('sb_liked_'+id);localStorage.setItem('sb_likecount_'+id,Math.max(0,likeCount(id)-1));}
  else{localStorage.setItem('sb_liked_'+id,'1');localStorage.setItem('sb_likecount_'+id,likeCount(id)+1);}
  document.querySelectorAll('[data-like="'+id+'"]').forEach(b=>{b.classList.toggle('liked',isLiked(id));b.innerHTML='❤ '+epBn(likeCount(id));});
}
function likeBtnHTML(id){return '<button class="like-btn '+(isLiked(id)?'liked':'')+'" data-like="'+id+'" onclick="event.stopPropagation();toggleLike(\''+id+'\')">❤ '+epBn(likeCount(id))+'</button>';}

function createArticleCard(a){
  const img=a.image||'https://placehold.co/600x350/8B0000/ffffff?text=সাহিত্য+বাতায়ন';
  return `<div class="article-card" onclick="viewArticle('${a.id}')"><img src="${img}" class="article-image" onerror="this.src='https://placehold.co/600x350/8B0000/ffffff?text=SB'"><div class="article-content"><span class="article-category">${a.category}</span><h3 class="article-title">${a.title}</h3><p class="article-meta">✍️ ${a.author} | 📅 ${a.date}</p><p class="article-excerpt">${(a.content||'').substring(0,90)}...</p>${likeBtnHTML(a.id)}<button class="read-more">read more</button></div></div>`;
}
function showPage(p){
  document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));
  const el=document.getElementById('page-'+p);if(el)el.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  if(p==='home')loadHome();
  if(p==='classics')loadClassicsPage();
  if(p==='gallery')loadGallery();
  if(p==='writers')loadWritersPage();
  if(p==='epaper')loadEpaper();
  if(p==='admin')showAdminTab('pending');
  if(p==='dashboard'){if(!currentUser){showPage('login');return;}loadDashboard();}
}
function setActiveNav(el){document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));if(el)el.classList.add('active');document.getElementById('navMenu').classList.remove('show');}
function toggleMenu(){document.getElementById('navMenu').classList.toggle('show');}
function loadHome(){
  document.getElementById('articlesGrid').innerHTML=articles.filter(a=>a.status==='approved').map(createArticleCard).join('')||'<p style="color:var(--text-light)">শিট থেকে লেখা লোড হয়নি — ক্লাসিক ও বাকি ফিচার চলছে।</p>';
  buildTicker();loadCalendar();loadWriters();
  document.getElementById('classicGrid').innerHTML=CLASSICS.slice(0,8).map(c=>`<div class="classic-card" onclick="viewArticle('${c.id}')"><div class="classic-icon">📖</div><h4>${c.title}</h4><div class="classic-author">${c.author}</div><span class="classic-type">${c.category}</span></div>`).join('');
}
function loadClassicsPage(){document.getElementById('classicArticlesGrid').innerHTML=CLASSICS.map(createArticleCard).join('');}
function filterCategory(cat){showPage('category');document.getElementById('categoryTitle').textContent=cat+' বিভাগ';const all=allPublished().filter(a=>a.category===cat);document.getElementById('categoryGrid').innerHTML=all.length?all.map(createArticleCard).join(''):'<p style="color:var(--text-light)">লেখা নেই</p>';}
function filterCategories(cats){showPage('category');const list=cats.split(',');document.getElementById('categoryTitle').textContent=list.join(' / ')+' বিভাগ';const all=allPublished().filter(a=>list.includes(a.category));document.getElementById('categoryGrid').innerHTML=all.length?all.map(createArticleCard).join(''):'<p style="color:var(--text-light)">লেখা নেই</p>';}
function doSearch(){
  const q=document.getElementById('searchInput').value.toLowerCase().trim();if(q.length<2)return;
  showPage('category');document.getElementById('categoryTitle').textContent='অনুসন্ধান: "'+q+'"';
  const all=allPublished().filter(a=>(a.title||'').toLowerCase().includes(q)||(a.author||'').toLowerCase().includes(q)||(a.content||'').toLowerCase().includes(q));
  document.getElementById('categoryGrid').innerHTML=all.length?all.map(createArticleCard).join(''):'<p style="color:var(--text-light)">কিছু পাওয়া যায়নি</p>';
}
function loadGallery(){
  const imgs=articles.filter(a=>a.status==='approved'&&a.image).map(a=>({src:a.image,cap:a.title+' — '+a.author}));
  document.getElementById('galleryGrid').innerHTML=imgs.length?imgs.map(g=>`<div class="gallery-item" onclick="openLightbox('${g.src}')"><img src="${g.src}" loading="lazy"><div class="g-cap">${g.cap}</div></div>`).join(''):'<p style="color:var(--text-light)">লেখার সাথে ছবি যুক্ত করলে এখানে দেখাবে।</p>';
}
function openLightbox(src){document.getElementById('lightbox-img').src=src;document.getElementById('lightbox').style.display='flex';}

function viewArticle(id){
  const a=findArticle(id);if(!a)return;
  currentArticleId=String(id);
  if(a.views!==undefined){a.views=(a.views||0)+1;saveArticles();}
  const content=(a.content||'').split('\n').map(p=>p.trim()?`<p>${p}</p>`:'').join('');
  document.getElementById('articleView').innerHTML=`
  <div class="breadcrumb"><a onclick="showPage('home')"> হোম</a> / ${a.category}</div>
  <div class="article-full" id="printableArea">
  <div class="print-header"><h1>সাহিত্য বাতায়ন</h1><p>সাহিত্য, সংস্কৃতি ও সংবাদের আলোয় জাগ্রত মনন</p></div>
  <h1>${a.title}</h1>
  <div class="article-meta-box"><p>✍️ <strong>লেখক:</strong> ${a.author}</p><p>📅 <strong>প্রকাশ:</strong> ${a.date}</p><p>📁 <strong>বিভাগ:</strong> ${a.category}</p>${a.views!==undefined?`<p>👁 <strong>পাঠ:</strong> ${epBn(a.views)} বার</p>`:''}<p>${likeBtnHTML(a.id)}</p></div>
  ${a.image?`<img src="${a.image}" class="article-main-image" onerror="this.style.display='none'">`:''}
  <div class="article-body" id="articleBody">${content}</div></div>`;
  document.getElementById('audioBar').style.display='flex';
  const related=allPublished().filter(x=>x.category===a.category&&String(x.id)!==String(a.id)).slice(0,3);
  document.getElementById('relatedArticles').innerHTML=related.length?`<h2 class="section-title">সম্পর্কিত লেখা</h2><div class="articles-grid">${related.map(createArticleCard).join('')}</div>`:'';
  showPage('article');loadComments(currentArticleId);
  document.getElementById('print-sheet').innerHTML=`<div class="ps-header"><h1>সাহিত্য বাতায়ন</h1><p>সাহিত্য, সংস্কৃতি ও সংবাদের আলোয় জাগ্রত মনন</p></div><h1 class="ps-title">${a.title}</h1><div class="ps-author">✍️ ${a.author} | ${a.category} | ${a.date}</div><div class="ps-text">${content}</div><div class="ps-footer">© সাহিত্য বাতায়ন | সম্পাদক: মুহিতুল ইসলাম মুন্না</div>`;
}
function speakArticle(){
  const a=findArticle(currentArticleId);if(!a)return;
  if(!('speechSynthesis' in window)){alert('ব্রাউজার অডিও সাপোর্ট করে না');return;}
  stopSpeak();
  const u=new SpeechSynthesisUtterance(a.title+'। লেখক: '+a.author+'। '+a.content);
  u.lang='bn-BD';u.rate=0.9;speechSynthesis.speak(u);
  notify('🎧 পড়া হচ্ছে... থামাতে "থামান" চাপুন');
}
function stopSpeak(){if('speechSynthesis' in window)speechSynthesis.cancel();}
function changeFontSize(d){if(d===0)currentFontSize=16;else currentFontSize=Math.max(12,Math.min(24,currentFontSize+d));const b=document.getElementById('articleBody');if(b)b.style.fontSize=currentFontSize+'px';document.getElementById('fontSizeDisplay').textContent=currentFontSize+'px';}
function shareOn(p){const url=window.location.href;const a=findArticle(currentArticleId);const t=a?a.title:'সাহিত্য বাতায়ন';let u='';switch(p){case'facebook':u='https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(url);break;case'whatsapp':u='https://wa.me/?text='+encodeURIComponent(t+' '+url);break;case'twitter':u='https://twitter.com/intent/tweet?text='+encodeURIComponent(t)+'&url='+encodeURIComponent(url);break;case'telegram':u='https://t.me/share/url?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(t);break;case'email':u='mailto:?subject='+encodeURIComponent(t)+'&body='+encodeURIComponent(url);break;}if(u)window.open(u,'_blank');}
function copyLink(){navigator.clipboard.writeText(window.location.href).then(()=>notify('✅ লিংক কপি হয়েছে!'));}
function downloadPDF(){const el=document.getElementById('printableArea');if(!el)return;const a=findArticle(currentArticleId);notify('PDF তৈরি হচ্ছে...');html2pdf().set({margin:10,filename:(a?a.title:'article')+'.pdf',image:{type:'jpeg',quality:0.98},html2canvas:{scale:2,useCORS:true},jsPDF:{unit:'mm',format:'a4'}}).from(el).save();}

function loadComments(id){
  const c=document.getElementById('commentsList');if(!c)return;
  const comments=JSON.parse(localStorage.getItem('sb_c_'+id)||'[]');
  c.innerHTML=comments.length?comments.map(x=>`<div class="comment"><div class="comment-header"><span class="comment-author">${x.author}</span><span class="comment-date">${x.date}</span></div><p>${x.text}</p><button class="reply-btn" onclick="toggleReply(${x.id})"> উত্তর</button><div id="rf-${x.id}" style="display:none;margin-top:10px"><input id="rn-${x.id}" placeholder="নাম" style="width:100%;padding:8px;margin-bottom:5px;border:1px solid var(--border);border-radius:4px"><textarea id="rt-${x.id}" rows="2" placeholder="উত্তর..." style="width:100%;padding:8px;margin-bottom:5px;border:1px solid var(--border);border-radius:4px"></textarea><button onclick="addReply(${x.id})" class="btn-primary" style="padding:6px 15px;font-size:.9rem">পাঠান</button></div><div class="replies">${(x.replies||[]).map(r=>`<div class="reply"><strong>${r.author}</strong>: ${r.text}</div>`).join('')}</div></div>`).join(''):'<p style="color:var(--text-light);text-align:center;padding:20px">প্রথম মন্তব্য করুন!</p>';
}
function addComment(){const n=document.getElementById('commentName').value.trim();const t=document.getElementById('commentText').value.trim();if(!n||!t){alert('নাম ও মন্তব্য লিখুন');return;}const cs=JSON.parse(localStorage.getItem('sb_c_'+currentArticleId)||'[]');cs.push({id:Date.now(),author:n,text:t,date:new Date().toLocaleDateString('bn-BD'),replies:[]});localStorage.setItem('sb_c_'+currentArticleId,JSON.stringify(cs));document.getElementById('commentName').value='';document.getElementById('commentText').value='';loadComments(currentArticleId);}
function toggleReply(id){const f=document.getElementById('rf-'+id);f.style.display=f.style.display==='none'?'block':'none';}
function addReply(cid){const n=document.getElementById('rn-'+cid).value.trim();const t=document.getElementById('rt-'+cid).value.trim();if(!n||!t){alert('নাম ও উত্তর লিখুন');return;}const cs=JSON.parse(localStorage.getItem('sb_c_'+currentArticleId)||'[]');const c=cs.find(x=>x.id===cid);if(c){if(!c.replies)c.replies=[];c.replies.push({author:n,text:t,date:new Date().toLocaleDateString('bn-BD')});localStorage.setItem('sb_c_'+currentArticleId,JSON.stringify(cs));loadComments(currentArticleId);}}

function showRegister(){document.getElementById('login-form').style.display='none';document.getElementById('register-form').style.display='block';}
function showLogin(){document.getElementById('login-form').style.display='block';document.getElementById('register-form').style.display='none';}
async function writerRegister(){
  const u=document.getElementById('r-username').value.trim(),n=document.getElementById('r-name-bn').value.trim(),e=document.getElementById('r-email').value.trim(),p=document.getElementById('r-password').value;
  if(!u||!n||!e||!p){alert('সব ঘর পূরণ করুন');return;}
  await sheetPost({action:'registerWriter',username:u,name_bn:n,name_en:document.getElementById('r-name-en').value.trim(),email:e,password:p,bio:document.getElementById('r-bio').value.trim()||'সাহিত্য বাতায়নের সদস্য'});
  const locals=JSON.parse(localStorage.getItem('sb_writers_local')||'[]');locals.push({username:u,password:p,name:n});localStorage.setItem('sb_writers_local',JSON.stringify(locals));
  notify('✅ রেজিস্ট্রেশন সফল! লগইন করুন।');showLogin();
}
async function writerLogin(){
  const u=document.getElementById('login-user').value.trim(),p=document.getElementById('login-pass').value;
  if(!u||!p){alert('ইউজারনেম ও পাসওয়ার্ড দিন');return;}
  let me=(JSON.parse(localStorage.getItem('sb_writers_local')||'[]')).find(x=>x.username===u&&x.password===p);
  if(!me){const j=await sheetGet('loginWriter',{username:u,password:p});if(j&&j.ok)me={username:u,name:j.name||u};}
  if(me){currentUser=me;localStorage.setItem('sb_currentUser',JSON.stringify(me));notify('✅ স্বাগতম, '+me.name+'!');showPage('dashboard');}
  else alert('❌ লগইন ব্যর্থ!');
}
function writerLogout(){currentUser=null;localStorage.removeItem('sb_currentUser');showPage('home');notify('লগআউট হয়েছে');}
function loadDashboard(){
  document.getElementById('dash-name').textContent=currentUser?(currentUser.name||currentUser.username):'';
  const name=currentUser?(currentUser.name||currentUser.username):'';
  const mine=articles.filter(a=>a.author===name);
  document.getElementById('dash-list').innerHTML=mine.length?mine.map(a=>`<div class="admin-article-item"><div><strong>${a.title}</strong><br><small>${a.category} | ${a.status==='approved'?'✅ প্রকাশিত':'⏳ অনুমোদনের অপেক্ষায়'}</small></div><div><button class="btn-warning" onclick="startEdit('${a.id}')">️ এডিট</button></div></div>`).join(''):'<p style="color:var(--text-light)">এখনো লেখা জমা দেননি।</p>';
}
function compressImage(input,targetId){
  const file=input.files[0];if(!file)return;
  if(file.size>2*1024*1024){alert('⚠️ ছবি ২MB এর কম হতে হবে');input.value='';return;}
  const reader=new FileReader();
  reader.onload=e=>{const img=new Image();img.onload=()=>{const c=document.createElement('canvas');const maxW=800;let w=img.width,h=img.height;if(w>maxW){h=h*maxW/w;w=maxW;}c.width=w;c.height=h;c.getContext('2d').drawImage(img,0,0,w,h);document.getElementById(targetId).value=c.toDataURL('image/jpeg',0.7);};img.src=e.target.result;};
  reader.readAsDataURL(file);
}
async function dashSubmit(){
  if(!currentUser){showPage('login');return;}
  const title=document.getElementById('d-title').value.trim(),content=document.getElementById('d-content').value.trim();
  if(!title||!content){alert('শিরোনাম ও বিষয়বস্তু দিন');return;}
  const cat=document.getElementById('d-category').value,img=document.getElementById('d-imageData').value;
  const ok=await sheetPost({action:'submitPost',title,category:cat,author:currentUser.name||currentUser.username,excerpt:content.substring(0,150),content,imageData:img,featured:'',editorcode:'',date:new Date().toLocaleDateString('bn-BD')});
  if(ok){notify('✅ জমা হয়েছে! সম্পাদকের অনুমোদনের পর প্রকাশিত হবে।');
    document.getElementById('d-title').value='';document.getElementById('d-content').value='';document.getElementById('d-imageData').value='';
    await loadArticlesFromSheet();loadDashboard();
  }else alert('সমস্যা হয়েছে');
}

function loadEpaper(){
  const all=allPublished();
  const totalPages=Math.max(1,Math.ceil(all.length/EP_PER_PAGE));
  if(epaperPage<0)epaperPage=0;if(epaperPage>=totalPages)epaperPage=totalPages-1;
  const slice=all.slice(epaperPage*EP_PER_PAGE,(epaperPage+1)*EP_PER_PAGE);
  document.getElementById('epaper-date').textContent=new Date().toLocaleDateString('bn-BD',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  document.getElementById('epaper-body').innerHTML=slice.map(a=>`<article class="ep-article"><h3 class="ep-title">${a.title}</h3><div class="ep-meta">✍️ ${a.author} | ${a.category} | ${a.date}</div><div class="ep-text">${(a.content||'').split('\n').filter(p=>p.trim()).slice(0,5).map(p=>`<p>${p}</p>`).join('')}</div><button class="read-more" onclick="viewArticle('${a.id}')">সম্পূর্ণ পড়ুন</button></article>`).join('');
  let btns='';for(let i=0;i<totalPages;i++){btns+=`<button class="ep-page-btn ${i===epaperPage?'active':''}" onclick="gotoEpaper(${i})">${epBn(i+1)}</button>`;}
  document.getElementById('epaper-pages').innerHTML=btns;
  document.getElementById('epaper-pageno').textContent='পাতা '+epBn(epaperPage+1)+' / '+epBn(totalPages);
}
function gotoEpaper(i){const total=Math.max(1,Math.ceil(allPublished().length/EP_PER_PAGE));if(i<0||i>=total)return;epaperPage=i;loadEpaper();document.getElementById('page-epaper').scrollIntoView({behavior:'smooth'});}
function printEpaper(){
  const all=allPublished();
  document.getElementById('print-sheet').innerHTML='<div class="ps-header"><h1>সাহিত্য বাতায়ন - ই-পেপার</h1><p>'+new Date().toLocaleDateString('bn-BD',{weekday:'long',year:'numeric',month:'long',day:'numeric'})+'</p></div>'+all.map(a=>`<div style="margin-bottom:25px;border-bottom:1px solid #999;padding-bottom:15px"><h2 style="color:#8B0000;margin-bottom:6px">${a.title}</h2><div class="ps-author">✍️ ${a.author} | ${a.category}</div><div class="ps-text">${(a.content||'').split('\n').filter(p=>p.trim()).map(p=>`<p>${p}</p>`).join('')}</div></div>`).join('')+'<div class="ps-footer">© সাহিত্য বাতায়ন | সম্পাদক: মুহিতুল ইসলাম মুন্না</div>';
  window.print();
}

function buildTicker(){const items=articles.filter(a=>a.status==='approved').slice(0,5).map(a=>a.title);items.push(...CLASSICS.slice(0,3).map(c=>c.title+' — '+c.author));items.push('আপনার লেখা পাঠান: sahityabatayan@gmail.com');document.getElementById('tickerText').textContent=items.join('   ⭕   ');}
function loadCalendar(){const now=new Date();const months=['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];document.getElementById('calendarHeader').textContent=months[now.getMonth()]+' '+epBn(now.getFullYear());const days=['রবি','সোম','মঙ্গল','বুধ','বৃহ','শুক্র','শনি'];let html=days.map(d=>`<div class="calendar-day-header">${d}</div>`).join('');const fd=new Date(now.getFullYear(),now.getMonth(),1).getDay();const dm=new Date(now.getFullYear(),now.getMonth()+1,0).getDate();for(let i=0;i<fd;i++)html+='<div class="calendar-day"></div>';for(let d=1;d<=dm;d++){html+=`<div class="calendar-day ${d===now.getDate()?'highlight':''}">${epBn(d)}</div>`;}document.getElementById('calendarGrid').innerHTML=html;}
function getWriters(){const approved=articles.filter(a=>a.status==='approved');const unique=[...new Set(approved.map(a=>a.author))];return unique.map(author=>({name:author,count:approved.filter(a=>a.author===author).length,image:'https://ui-avatars.com/api/?name='+encodeURIComponent(author)+'&background=8B0000&color=fff&size=200'}));}
function writerCard(w){return `<div class="writer-card"><img src="${w.image}"><h3>${w.name}</h3><p>${epBn(w.count)}টি প্রকাশনা</p></div>`;}
function loadWriters(){document.getElementById('writersGrid').innerHTML=getWriters().map(writerCard).join('')||'<p style="color:var(--text-light)">লেখক লোড হচ্ছে...</p>';}
function loadWritersPage(){document.getElementById('writersGridPage').innerHTML=getWriters().map(writerCard).join('')||'<p style="color:var(--text-light)">লেখক লোড হচ্ছে...</p>';}
function subscribeNewsletter(){const email=document.getElementById('newsletterEmail').value.trim();if(!email||!email.includes('@')){alert('সঠিক ইমেইল দিন');return;}let subs=JSON.parse(localStorage.getItem('sb_subs')||'[]');if(subs.includes(email)){alert('আগেই সাবস্ক্রাইব করেছেন!');return;}subs.push(email);localStorage.setItem('sb_subs',JSON.stringify(subs));document.getElementById('newsletterEmail').value='';notify('✅ সাবস্ক্রিপশন সফল!');}

function showAdminTab(tab){
  if(tab==='submit'&&editingId)cancelEdit();
  ['submit','pending','published','stats'].forEach(t=>{document.getElementById('tab-'+t).style.display='none';});
  document.getElementById('tab-'+tab).style.display='block';
  if(tab==='pending')loadPending();if(tab==='published')loadPublished();if(tab==='stats')loadStats();
}
function clearForm(){['aTitle','aAuthor','aContent','aEditorCode','aImage'].forEach(i=>document.getElementById(i).value='');const f=document.getElementById('aImageFile');if(f)f.value='';}
function showEditBanner(text){
  let b=document.getElementById('edit-banner');
  if(!b){b=document.createElement('div');b.id='edit-banner';b.style.cssText='background:#fff3cd;border-left:4px solid #ffc107;padding:12px 15px;border-radius:5px;margin-bottom:15px';b.innerHTML='<span id="edit-banner-text"></span> <button class="btn-danger" style="margin-left:10px" onclick="cancelEdit()">❌ বাতিল</button>';document.getElementById('tab-submit').prepend(b);}
  b.style.display='block';document.getElementById('edit-banner-text').textContent=text;
}
function startEdit(id){
  const a=articles.find(x=>String(x.id)===String(id));if(!a)return;
  editingId=String(id);showAdminTab('submit');
  document.getElementById('aTitle').value=a.title;document.getElementById('aAuthor').value=a.author;
  document.getElementById('aCategory').value=a.category;document.getElementById('aContent').value=a.content;
  document.getElementById('aImage').value=a.image||'';
  showEditBanner('✏️ এডিট মোড: "'+a.title+'" — বদলে "জমা দিন" চাপুন');
  window.scrollTo({top:0,behavior:'smooth'});
}
function cancelEdit(){editingId=null;const b=document.getElementById('edit-banner');if(b)b.style.display='none';clearForm();}
async function submitArticle(){
  const title=document.getElementById('aTitle').value.trim(),author=document.getElementById('aAuthor').value.trim(),category=document.getElementById('aCategory').value,content=document.getElementById('aContent').value.trim(),image=document.getElementById('aImage').value.trim();
  if(!title||!author||!content){alert('শিরোনাম, লেখক ও বিষয়বস্তু দিন');return;}
  if(editingId){
    const a=articles.find(x=>String(x.id)===String(editingId));
    if(a){a.title=title;a.author=author;a.category=category;a.content=content;if(image)a.image=image;saveArticles();
      await sheetPost({action:'updatePost',postId:String(editingId),title,category,author,excerpt:content.substring(0,150),content,image:image||a.image||''});}
    notify('✅ লেখা আপডেট হয়েছে!');cancelEdit();showAdminTab('published');return;
  }
  const editorCode=document.getElementById('aEditorCode').value.trim();
  const isEditor=editorCode===EDITOR_CODE;
  const ok=await sheetPost({action:'submitPost',title,category,author,excerpt:content.substring(0,150),content,imageData:image,featured:'',editorcode:editorCode,date:new Date().toLocaleDateString('bn-BD')});
  if(ok){notify(isEditor?'✅ প্রকাশিত!':'✅ জমা হয়েছে! সম্পাদকের অনুমোদনের অপেক্ষায়।');
    clearForm();
    await loadArticlesFromSheet();
    setTimeout(()=>showPage('home'),800);
  }else alert('সমস্যা হয়েছে');
}
function loadPending(){
  const list=document.getElementById('pendingArticlesList');
  const pending=articles.filter(a=>a.status==='pending');
  list.innerHTML=pending.length?pending.map(a=>`<div class="admin-article-item"><div><strong>${a.title}</strong><br><small>✍️ ${a.author} | ${a.category} | 📅 ${a.date}</small></div><div><button class="approve-btn" onclick="approveArticle('${a.id}')">✅ অনুমোদন</button><button class="btn-warning" onclick="startEdit('${a.id}')">✏️ এডিট</button><button class="reject-btn" onclick="rejectArticle('${a.id}')">❌ বাতিল</button></div></div>`).join(''):'<p style="text-align:center;padding:20px;color:var(--text-light)">কোনো অপেক্ষমাণ লেখা নেই ✅</p>';
}
function loadPublished(){
  const list=document.getElementById('publishedArticlesList');
  const pub=articles.filter(a=>a.status==='approved');
  list.innerHTML=pub.length?pub.map(a=>`<div class="admin-article-item"><div><strong>${a.title}</strong><br><small>${a.author} | ${a.date} | 👁 ${epBn(a.views||0)} | ❤ ${epBn(likeCount(a.id))}</small></div><div><button class="btn-info" onclick="viewArticle('${a.id}')">দেখুন</button><button class="btn-warning" onclick="startEdit('${a.id}')">✏️ এডিট</button><button class="btn-danger" onclick="deleteArticle('${a.id}')">মুছুন</button></div></div>`).join(''):'<p style="text-align:center;padding:20px;color:var(--text-light)">কোনো প্রকাশিত লেখা নেই</p>';
}
function loadStats(){
  const ap=articles.filter(a=>a.status==='approved');
  const pd=articles.filter(a=>a.status==='pending');
  const w=[...new Set(ap.map(a=>a.author))];
  const likes=ap.reduce((s,a)=>s+likeCount(a.id),0);
  document.getElementById('statsContent').innerHTML=`<div class="stats-grid"><div class="stat-item"><span class="stat-number">${epBn(ap.length)}</span><div class="stat-label">প্রকাশিত</div></div><div class="stat-item"><span class="stat-number">${epBn(pd.length)}</span><div class="stat-label">অপেক্ষমাণ</div></div><div class="stat-item"><span class="stat-number">${epBn(w.length)}</span><div class="stat-label">লেখক</div></div><div class="stat-item"><span class="stat-number">${epBn(ap.reduce((s,a)=>s+(a.views||0),0))}</span><div class="stat-label">মোট পাঠ</div></div><div class="stat-item"><span class="stat-number">${epBn(likes)}</span><div class="stat-label">মোট লাইক</div></div><div class="stat-item"><span class="stat-number">${epBn(CLASSICS.length)}</span><div class="stat-label">ক্লাসিক</div></div></div>`;
}
function approveArticle(id){
  const a=articles.find(x=>String(x.id)===String(id));
  if(a){a.status='approved';saveArticles();sheetPost({action:'approvePost',postId:String(id)});notify('✅ অনুমোদিত! এখন সাইটে দেখাবে।');loadPending();loadPublished();}
}
function rejectArticle(id){if(confirm('বাতিল করবেন? লেখাটা মুছে যাবে।')){articles=articles.filter(a=>String(a.id)!==String(id));saveArticles();sheetPost({action:'rejectPost',postId:String(id)});notify('❌ বাতিল হয়েছে');loadPending();}}
function deleteArticle(id){if(confirm('মুছে ফেলবেন?')){articles=articles.filter(a=>String(a.id)!==String(id));saveArticles();sheetPost({action:'rejectPost',postId:String(id)});notify('✅ মুছে ফেলা হয়েছে');loadPublished();}}

window.onscroll=function(){const btn=document.getElementById('backToTop');if(window.scrollY>300)btn.classList.add('show');else btn.classList.remove('show');};
document.addEventListener('DOMContentLoaded',async function(){
  setCurrentDate();
  await loadArticlesFromSheet();
  loadHome();
});
