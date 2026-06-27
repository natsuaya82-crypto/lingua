// =============================================
// LINGUA — Core (state, boot, utilities). i18n dictionary lives in i18n.js.
// =============================================
const SKEY='lingua_v2';const AKEY='lingua_auth';const MDBNAME='LinguaMemos';const MSTORE='memos';
const DS={langName:'',langNative:'',phoneme:{consonants:[],vowels:[]},syllable:{onset:[],nucleus:[],coda:[]},dictionary:[],grammar:{order:'',tense:'',cases:[],notes:'',chapters:{},topicProm:'',number:'',aspect:'',mood:'',adjPos:'',adjAgree:''},corpus:[],sentences:[],script:{romanization:'',rules:'',worldScript:'',charMap:[]},vibe:{genre:'',mood:'',region:'',notes:''},visibility:'private',done:{}};
let S=JSON.parse(JSON.stringify(DS));
let _au=null,_plan='free',_isPro=false,_ced=null,_pf='all',_meid=null,_aihist=[],_aiCnt=0,_aiDate='',_dsTimer=null,_pdata={},_mdb=null,_lang='jp',_grChap='greet';


function t(k){return i18n[_lang]?.[k]??i18n.jp[k]??k;}
function setLang(code){_lang=code;try{localStorage.setItem('lingua_lang',code);}catch(e){}applyLang();renderLangPills();const lb=document.getElementById('lang-btn');if(lb)lb.textContent=code.toUpperCase();showToast(t('selectLang')+': '+code.toUpperCase(),'info');}
function applyLang(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.getAttribute('data-i18n');if(k){const v=t(k);if(v.indexOf('<svg')>=0||v.indexOf('<span')>=0)el.innerHTML=v;else el.textContent=v;}});
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{const k=el.getAttribute('data-i18n-placeholder');if(k)el.placeholder=t(k).replace(/<svg[^>]*>.*?<\/svg>|<span[^>]*>.*?<\/span>/g,'');});
  document.querySelectorAll('[data-i18n-aria]').forEach(el=>{const k=el.getAttribute('data-i18n-aria');if(k)el.setAttribute('aria-label',t(k).replace(/<svg[^>]*>.*?<\/svg>|<span[^>]*>.*?<\/span>/g,''));});
  renderRoadmap();updateDailySent();renderLegalPages();
}

// ---- Global Key Handlers (ESC to close modals) ----
document.addEventListener('keydown',e=>{
  if(e.key!=='Escape')return;
  const isOpen=(sel)=>{const el=document.querySelector(sel);return el&&el.classList.contains('open');};
  // Priority: inner-most/topmost first
  if(isOpen('.vispop')){typeof closeVisPop==='function'&&closeVisPop();return;}
  if(isOpen('#lang-picker-modal')){typeof closeLangPicker==='function'&&closeLangPicker();return;}
  if(isOpen('#lname-modal')){typeof closeLNE==='function'&&closeLNE();return;}
  const sg=document.getElementById('signup-modal');
  if(sg&&sg.style.display==='flex'){typeof closeSignup==='function'&&closeSignup();return;}
  if(isOpen('#login-modal')){typeof closeLogin==='function'&&closeLogin();return;}
  if(isOpen('#upgrade-modal')){typeof closeUpgrade==='function'&&closeUpgrade();return;}
  if(isOpen('.memo-ov')){typeof closeMemoEd==='function'&&closeMemoEd();return;}
  if(isOpen('.eo')){typeof closeEditor==='function'&&closeEditor();return;}
});
function updateDailySent(){
  const p=_todayScene||getTodayPrompt();
  const sc=document.getElementById('d-topic-scene');
  const hi=document.getElementById('d-topic-hint');
  if(sc)sc.textContent=p.scene;
  if(hi)hi.textContent=p.hint;
  const ds=document.getElementById('d-sent');if(!ds)return;
  const latest=(S.sentences?.length>0)?S.sentences[S.sentences.length-1]:
               (S.corpus?.length>0)?(S.corpus[S.corpus.length-1]?.cl||S.corpus[S.corpus.length-1]?.conlang||null):null;
  const shareBtn=document.getElementById('viola-share-btn');
  if(latest&&latest.trim()){
    ds.textContent=latest;ds.style.color='var(--tx)';
    if(shareBtn)shareBtn.style.display='inline-flex';
  }else{
    ds.textContent=t('sceneHint')||'今日のシーンをコンラングで表現してみよう';ds.style.color='var(--txm)';
    if(shareBtn)shareBtn.style.display='none';
  }
}
function shareToViola(){
  const ds=document.getElementById('d-sent');
  const text=ds?.textContent?.trim();
  if(!text)return;
  const lang=S.langName||t('newLang');
  const shareText=`【${lang}】${text} — ${t('shareTextSuffix')} #Lingua #conlang`;
  if(navigator.share){navigator.share({title:'Lingua — '+lang,text:shareText}).catch(()=>{});}
  else{navigator.clipboard?.writeText(shareText).then(()=>showToast(t('violaShareCopied'),'success')).catch(()=>showToast(t('copyFailed'),'error'));}
}
function renderLangPills(){['jp','en','zh','es'].forEach(c=>{const e=document.getElementById('lp-'+c);if(e)e.classList.toggle('active',_lang===c);});}

// ---- IPA Audio ----
// Compact IPA button-press approximation (used only when user plays a single IPA chip — pronounce slowly).
const IPA_APPROX={'p':'puh','b':'buh','t':'tuh','d':'duh','k':'kuh','g':'guh','q':'kwuh','ʔ':'uh','f':'fuh','v':'vuh','s':'sss','z':'zzz','ʃ':'shh','ʒ':'zhah','x':'kh','h':'huh','θ':'think','ð':'this','ç':'hyuh','ɸ':'foo','β':'voo','ɣ':'guh','ts':'tsuh','dz':'dzuh','tʃ':'chuh','dʒ':'juh','m':'mmm','n':'nnn','ŋ':'ng','ɲ':'nyuh','ɴ':'nn','l':'luh','r':'ruh','ɾ':'ruh','ʀ':'ruh','ɹ':'ruh','w':'wuh','j':'yuh','ɥ':'wee','ʋ':'vuh','i':'ee','e':'ay','ɛ':'eh','æ':'a','a':'ah','y':'ue','ø':'ur','œ':'uh','ɨ':'ih','ə':'uh','ɐ':'a','ɑ':'ah','ɯ':'oo','ɤ':'uh','o':'oh','ɔ':'aw','u':'oo','ʊ':'uu'};
// Single-character inline replacement for words (must produce natural TTS; no digraph like "dh" that gets read literally).
// Also maps ASCII letters that English TTS reads as letter names (q → "kyuu", x → "ex") to sane consonants.
const IPA_INLINE={'ʔ':'','θ':'t','ð':'d','ʃ':'sh','ʒ':'z','x':'k','q':'k','ɣ':'g','ç':'h','ɸ':'f','β':'v','ŋ':'n','ɲ':'ny','ɴ':'n','ɾ':'r','ʀ':'r','ɹ':'r','ɥ':'w','ʋ':'v','ɛ':'e','æ':'a','ø':'o','œ':'e','ɨ':'i','ə':'u','ɐ':'a','ɑ':'a','ɯ':'u','ɤ':'o','ɔ':'o','ʊ':'u','tʃ':'ch','dʒ':'j','ts':'ts','dz':'dz'};
// Voice caching: find best English voice, avoid JP fallback (which reads θ as "シータ", etc.)
let _enVoice=null;
function pickEnVoice(){
  if(!window.speechSynthesis)return null;
  const vs=window.speechSynthesis.getVoices();
  if(!vs.length)return null;
  const priority=['en-US','en-GB','en-AU','en-CA','en'];
  for(const p of priority){const v=vs.find(x=>x.lang===p);if(v)return v;}
  return vs.find(x=>x.lang&&x.lang.toLowerCase().startsWith('en'))||null;
}
if(window.speechSynthesis){
  _enVoice=pickEnVoice();
  if(typeof speechSynthesis.onvoiceschanged!=='undefined')speechSynthesis.onvoiceschanged=()=>{_enVoice=pickEnVoice();};
}
// Preprocess: replace non-ASCII IPA chars + ASCII letters that English TTS mispronounces (q→kyuu, x→ex).
// Normal Latin words stay readable. Example: "θaena"→"taena", "qai"→"kai", "aelindra"→"aelindra".
const _ASCII_REMAP={q:'k',Q:'K',x:'k',X:'K'};
function _toRoman(tx){
  if(!tx)return'';
  let out=String(tx);
  for(const k of ['tʃ','dʒ','ts','dz'])if(IPA_INLINE[k])out=out.split(k).join(IPA_INLINE[k]);
  out=out.replace(/[^\x00-\x7F]/g,c=>IPA_INLINE[c]!==undefined?IPA_INLINE[c]:'');
  out=out.replace(/[qQxX]/g,c=>_ASCII_REMAP[c]||c);
  return out;
}
function _speak(raw,opts){
  if(!raw||!window.speechSynthesis)return;
  const ss=window.speechSynthesis;
  if(ss.speaking||ss.pending)ss.cancel();
  if(ss.paused)ss.resume();
  if(!_enVoice)_enVoice=pickEnVoice();
  const u=new SpeechSynthesisUtterance(_toRoman(raw));
  u.lang=_enVoice?_enVoice.lang:'en-US';
  if(_enVoice)u.voice=_enVoice;
  Object.assign(u,opts||{});
  ss.speak(u);
}
function playIPA(s){_speak(IPA_APPROX[s]||s,{rate:0.6,pitch:1.1});}

// ---- IPA Data ----
const IPA_C=[{g:'破裂音',s:['p','b','t','d','k','g','q','ʔ']},{g:'摩擦音',s:['f','v','s','z','ʃ','ʒ','x','h','θ','ð','ç','ɸ','β','ɣ']},{g:'破擦音',s:['ts','dz','tʃ','dʒ']},{g:'鼻音',s:['m','n','ŋ','ɲ','ɴ']},{g:'流音',s:['l','r','ɾ','ʀ','ɹ']},{g:'接近音',s:['w','j','ɥ','ʋ']}];
const IPA_V=[{g:'前舌',s:['i','e','ɛ','æ','a','y','ø','œ']},{g:'中舌',s:['ɨ','ə','ɐ','ɑ']},{g:'後舌',s:['ɯ','ɤ','o','ɔ','u','ʊ']}];

// ---- Boot ----
document.addEventListener('DOMContentLoaded',()=>{
  try{const sl=localStorage.getItem('lingua_lang');if(sl)_lang=sl;}catch(e){}
  const bar=document.getElementById('load-bar');
  if(bar){bar.style.width='40%';setTimeout(()=>bar.style.width='80%',300);}
  loadState();
  try{const s=localStorage.getItem(AKEY);if(s)_au=JSON.parse(s);}catch(e){}
  const fbPoll=setInterval(()=>{
    if(window.FB?.onAuthStateChanged&&window.FB.auth){
      clearInterval(fbPoll);
      window.FB.onAuthStateChanged(window.FB.auth,async u=>{
        if(u){_au={uid:u.uid,name:u.displayName||u.email?.split('@')[0]||'User',email:u.email||'',photo:u.photoURL||''};try{localStorage.setItem(AKEY,JSON.stringify(_au));}catch(e){}await loadPData(_au.uid);await loadFSState(_au.uid);}
        else{_au=null;try{localStorage.removeItem(AKEY);}catch(e){}}_updateUI();
      });
    }
  },200);
  setTimeout(async()=>{
    if(window.FB?.getRedirectResult&&window.FB.auth){
      try{const r=await window.FB.getRedirectResult(window.FB.auth);if(r?.user){_au={uid:r.user.uid,name:r.user.displayName||'User',email:r.user.email||'',photo:r.user.photoURL||''};try{localStorage.setItem(AKEY,JSON.stringify(_au));}catch(e){}closeLogin();showToast(t('loggedIn'),'success');goTo('dashboard');}}catch(e){}
    }
  },600);
  setTimeout(()=>{
    if(bar)bar.style.width='100%';
    setTimeout(()=>{
      const ls=document.getElementById('loading-screen'),ap=document.getElementById('app');
      if(ls){ls.style.opacity='0';setTimeout(()=>ls.remove(),800);}
      if(ap)ap.style.display='block';
      applyLang();renderLangPills();
      _updateUI();initMDB();renderFaq();renderLib();renderVocab();renderRoadmap();
      generateScene();
    },300);
  },800);
});

// ---- State ----
function saveState(){try{localStorage.setItem(SKEY,JSON.stringify(S));}catch(e){}}
function loadState(){try{const r=localStorage.getItem(SKEY);if(!r)return;const p=JSON.parse(r);Object.keys(DS).forEach(k=>{if(k in p)S[k]=p[k];});}catch(e){}}
function schSave(){clearTimeout(_dsTimer);_dsTimer=setTimeout(()=>{saveState();showAS(t('autoSaved'));if(_au?.uid&&_isPro)schFSSave();renderRoadmap();},700);}
function showAS(m){const e=document.getElementById('autosave-el');if(!e)return;e.innerHTML=m;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),2200);}
let _fsT=null;
function schFSSave(){clearTimeout(_fsT);_fsT=setTimeout(()=>saveFSState(),2000);}
async function saveFSState(){if(!_au?.uid||!window.FB)return;try{await window.FB.setDoc(window.FB.doc(window.FB.db,'users',_au.uid),{linguaState:JSON.stringify(S),updatedAt:new Date().toISOString()},{merge:true});}catch(e){}}
async function loadFSState(uid){if(!window.FB)return;try{const sn=await window.FB.getDoc(window.FB.doc(window.FB.db,'users',uid));if(sn.exists()&&sn.data().linguaState){const r=JSON.parse(sn.data().linguaState);Object.keys(DS).forEach(k=>{if(k in r)S[k]=r[k];});_updateUI();renderRoadmap();showAS(t('cloudRestored'));}}catch(e){}}

// ---- Util ----
function esc(s){if(!s)return'';return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function openVocabEditor(){goTo('vocab');switchVocabTab('add',document.getElementById('vtab-add-btn'));}
function spkC(el){const idx=parseInt(el.dataset.idx);if(!isNaN(idx)&&S.corpus[idx]){const t=S.corpus[idx].cl||S.corpus[idx].conlang||'';spk(t);}}
function spk(tx){_speak(tx,{rate:0.8});}
