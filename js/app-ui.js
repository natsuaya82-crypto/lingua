// =============================================
// LINGUA — UI (nav, dashboard, settings, lib, memo, AI, FAQ, contact)
// =============================================
// ---- Roadmap ----
const ROADMAP=[
  {id:'name',pts:10,icon:''+icon('globe')+'',check:()=>!!S.langName,title:{jp:'言語名を設定',en:'Set Language Name',zh:'设置语言名称',es:'Establecer nombre'},desc:{jp:'あなたの言語に名前をつけましょう',en:'Give your language a name',zh:'给你的语言命名',es:'Dale nombre a tu idioma'}},
  {id:'phoneme3',pts:20,icon:''+icon('music')+'',check:()=>(S.phoneme.consonants.length+S.phoneme.vowels.length)>=3,title:{jp:'最初の音素 (3個)',en:'First Phonemes (3)',zh:'首批音素 (3)',es:'Primeros fonemas (3)'},desc:{jp:'子音と母音を合わせて3つ以上選択',en:'Select at least 3 consonants or vowels',zh:'选择至少3个辅音或元音',es:'Selecciona al menos 3 fonemas'}},
  {id:'vocab10',pts:30,icon:''+icon('book')+'',check:()=>S.dictionary.length>=10,title:{jp:'語彙10語',en:'10 Vocabulary Words',zh:'10个词汇',es:'10 palabras'},desc:{jp:'辞書に10語以上を登録',en:'Add 10 or more words to your dictionary',zh:'在词典中添加10个或更多单词',es:'Agrega 10 o más palabras al diccionario'}},
  {id:'grammar',pts:20,icon:''+icon('ruler')+'',check:()=>!!S.grammar.order,title:{jp:'文法の設定',en:'Grammar Setup',zh:'语法设置',es:'Configurar gramática'},desc:{jp:'語順を1つ設定',en:'Set a word order for your language',zh:'为你的语言设置语序',es:'Establece el orden de las palabras'}},
  {id:'corpus5',pts:30,icon:''+icon('corpus')+'',check:()=>S.corpus.length>=5,title:{jp:'例文5文',en:'5 Example Sentences',zh:'5个例句',es:'5 oraciones'},desc:{jp:'例文集に5文以上を追加',en:'Add 5 or more example sentences',zh:'在语料库中添加5个或更多例句',es:'Agrega 5 o más oraciones de ejemplo'}},
  {id:'daily',pts:20,icon:''+icon('calendar')+'',check:()=>!!S.done?.sentence,title:{jp:'1日1文チャレンジ',en:'Daily Sentence',zh:'每日一句',es:'Frase diaria'},desc:{jp:'1日1文に作文を投稿',en:'Submit your first daily sentence',zh:'提交你的第一个每日句子',es:'Envía tu primera oración diaria'}},
  {id:'script',pts:30,icon:''+icon('pen')+'',check:()=>!!(S.script?.romanization||S.script?.rules||S.script?.worldScript),title:{jp:'文字体系の設定',en:'Script System',zh:'文字体系',es:'Sistema de escritura'},desc:{jp:'文字体系または転写ルールを設定',en:'Set up your script system or romanization',zh:'设置文字体系或罗马化规则',es:'Configura tu sistema de escritura'}},
  {id:'vocab50',pts:50,icon:''+icon('books')+'',check:()=>S.dictionary.length>=50,title:{jp:'語彙50語',en:'50 Vocabulary Words',zh:'50个词汇',es:'50 palabras'},desc:{jp:'辞書に50語以上を登録',en:'Add 50 or more words to your dictionary',zh:'在词典中添加50个或更多单词',es:'Agrega 50 o más palabras'}},
  {id:'vibe',pts:20,icon:''+icon('galaxy')+'',check:()=>!!(S.vibe?.genre||S.vibe?.mood),title:{jp:'世界観の設定',en:'Vibe Setup',zh:'世界观设置',es:'Configurar ambiente'},desc:{jp:'ジャンルまたはムードを設定',en:'Set the genre or mood for your language',zh:'设置你语言的流派或风格',es:'Establece el género o el estilo de tu idioma'}},
];
function renderRoadmap(){
  let earned=0;
  const items=ROADMAP.map(r=>{const done=r.check();if(done)earned+=r.pts;return{...r,done};});
  const num=document.getElementById('total-pts-num');if(num)num.textContent=earned+' pts';
  // リストはホームには表示しない（すべて見るモーダルに集約）
  const e=document.getElementById('roadmap-list');if(e)e.innerHTML='';
}
function renderRoadmapFull(){
  const box=document.getElementById('roadmap-full');
  if(!box)return;
  
  // 4セクションの進捗判定（指定キーで判定）
  const sylLen=(S.syllables||S.phoneme?.consonants||[]).length;
  const vocabLen=(S.vocab||S.dictionary||[]).length;
  const gdataDone=!!(S.g_data||(S.grammar?.chapters&&Object.values(S.grammar.chapters).some(v=>v&&v.trim()))||(S.grammar?.order));
  const bioDone=!!(S.bio||(S.vibe?.notes&&S.vibe.notes.trim()));
  
  const sections=[
    {
      title:{jp:''+icon('music')+' 音韻設定',en:''+icon('music')+' Phonology',zh:''+icon('music')+' 音韵设置',es:''+icon('music')+' Fonología'},
      done:sylLen>0,
      desc:sylLen>0
        ? {jp:`${icon('check')} 完了（音素: ${(S.phoneme?.consonants?.length||0)+(S.phoneme?.vowels?.length||0)}個）`,en:`${icon('check')} Done (${(S.phoneme?.consonants?.length||0)+(S.phoneme?.vowels?.length||0)} phonemes)`,zh:`${icon('check')} 完成（音素: ${(S.phoneme?.consonants?.length||0)+(S.phoneme?.vowels?.length||0)}个）`,es:`${icon('check')} Completado (${(S.phoneme?.consonants?.length||0)+(S.phoneme?.vowels?.length||0)} fonemas)`}
        : {jp:'未設定 — 子音・母音を追加してください',en:'Not set — add consonants and vowels',zh:'未设置 — 请添加辅音和元音',es:'No configurado — añade consonantes y vocales'}
    },
    {
      title:{jp:''+icon('book')+' 基本語彙',en:''+icon('book')+' Vocabulary',zh:''+icon('book')+' 基础词汇',es:''+icon('book')+' Vocabulario'},
      done:vocabLen>=10,
      desc:vocabLen>=10
        ? {jp:`${icon('check')} 完了（${vocabLen}語）`,en:`${icon('check')} Done (${vocabLen} words)`,zh:`${icon('check')} 完成（${vocabLen}个词）`,es:`${icon('check')} Completado (${vocabLen} palabras)`}
        : {jp:`${vocabLen}/10語 — あと${10-vocabLen}語`,en:`${vocabLen}/10 words — ${10-vocabLen} more needed`,zh:`${vocabLen}/10个词 — 还需${10-vocabLen}个`,es:`${vocabLen}/10 palabras — faltan ${10-vocabLen}`}
    },
    {
      title:{jp:''+icon('ruler')+' 文法体系',en:''+icon('ruler')+' Grammar',zh:''+icon('ruler')+' 语法体系',es:''+icon('ruler')+' Gramática'},
      done:gdataDone,
      desc:gdataDone
        ? {jp:''+icon('check')+' 完了（文法ルール記述済み）',en:''+icon('check')+' Done (grammar rules written)',zh:''+icon('check')+' 完成（语法规则已记录）',es:''+icon('check')+' Completado (reglas gramaticales escritas)'}
        : {jp:'未設定 — 文法タブで語順や文法ルールを記述してください',en:'Not set — define word order and rules in the Grammar tab',zh:'未设置 — 请在语法标签中记录语序和规则',es:'No configurado — define el orden y las reglas en la pestaña Gramática'}
    },
    {
      title:{jp:''+icon('galaxy')+' 世界観設定',en:''+icon('galaxy')+' World Setting',zh:''+icon('galaxy')+' 世界观设置',es:''+icon('galaxy')+' Ambientación'},
      done:bioDone,
      desc:bioDone
        ? {jp:''+icon('check')+' 完了（世界観設定済み）',en:''+icon('check')+' Done (world setting filled)',zh:''+icon('check')+' 完成（世界观已设置）',es:''+icon('check')+' Completado (ambientación completada)'}
        : {jp:'未設定 — 世界観タブまたは Bio を記入してください',en:'Not set — fill in the Vibe tab or Bio',zh:'未设置 — 请填写世界观标签或Bio',es:'No configurado — completa la pestaña Vibe o Bio'}
    }
  ];
  const L=_lang||'jp';
  const completed = sections.filter(s=>s.done).length;
  const progress = Math.round((completed/sections.length)*100);
  let earned=0;
  ROADMAP.forEach(r=>{if(r.check())earned+=r.pts;});
  const achTitles={jp:''+icon('trophy')+' 言語構築の総合進捗',en:''+icon('trophy')+' Language Build Progress',zh:''+icon('trophy')+' 语言构建总进度',es:''+icon('trophy')+' Progreso de construcción'};
  const cmpLabel={jp:`${completed}/4 セクション完了（${progress}%）`,en:`${completed}/4 sections done (${progress}%)`,zh:`${completed}/4 板块完成（${progress}%）`,es:`${completed}/4 secciones completadas (${progress}%)`};
  const ptsLabel={jp:`獲得ポイント: ${earned} pts`,en:`Points earned: ${earned} pts`,zh:`已获积分: ${earned} pts`,es:`Puntos ganados: ${earned} pts`};
  const roadmapLabel={jp:'ロードマップ',en:'ROADMAP',zh:'路线图',es:'HOJA DE RUTA'};

  box.innerHTML=`
    <div style="font-family:'Cinzel',serif;font-size:1.1rem;font-weight:700;margin-bottom:8px;color:var(--pur)">${achTitles[L]||achTitles.jp}</div>
    <div style="font-size:.76rem;color:var(--txs);margin-bottom:6px">${cmpLabel[L]||cmpLabel.jp}</div>
    <div style="font-size:.76rem;color:var(--pur);margin-bottom:16px">${ptsLabel[L]||ptsLabel.jp}</div>
    <div style="height:4px;background:var(--sf3);border-radius:2px;overflow:hidden;margin-bottom:16px"><div style="height:100%;width:${progress}%;background:linear-gradient(90deg,var(--ac),var(--ac2));transition:width .5s ease;border-radius:2px"></div></div>
    ${sections.map(s=>`
      <div style="display:flex;align-items:flex-start;gap:10px;padding:10px 12px;margin-bottom:8px;background:var(--sf2);border-radius:8px;border-left:3px solid ${s.done?'var(--ok)':'var(--br)'}">
        <span style="font-size:1rem;flex-shrink:0;color:${s.done?'var(--ok)':'var(--txm)'}">${s.done?''+icon('check')+'':''+icon('circleEmpty')+''}</span>
        <div style="flex:1">
          <div style="font-size:.84rem;font-weight:600;margin-bottom:3px">${s.title[L]||s.title.jp}</div>
          <div style="font-size:.71rem;color:var(--txs)">${s.desc[L]||s.desc.jp}</div>
        </div>
      </div>
    `).join('')}
    <div style="margin-top:8px;height:1px;background:var(--br);margin-bottom:12px"></div>
    <div style="font-size:.65rem;font-weight:700;color:var(--txm);letter-spacing:.1em;margin-bottom:10px">${roadmapLabel[L]||roadmapLabel.jp}</div>
    ${ROADMAP.map(r=>{const done=r.check();return`<div style="display:flex;align-items:center;gap:8px;padding:7px 10px;margin-bottom:5px;background:var(--sf2);border-radius:7px;border:1px solid ${done?'var(--okb)':'var(--br)'}">
      <span>${r.icon}</span>
      <span style="flex:1;font-size:.76rem">${r.title[_lang]||r.title.jp}</span>
      <span style="font-size:.62rem;color:${done?'var(--ok)':'var(--txm)'}">${done?''+icon('check')+'':''} ${r.pts}pts</span>
    </div>`;}).join('')}
  `;
}
function openAchModal(){goTo('roadmap');}

// ---- Navigation ----
const _navHist=['dashboard'];
function goTo(id,fromBack){
  window.scrollTo(0,0);
  // Close any open editor/memo overlay so it doesn't linger under the new page
  ['ed-ov','memo-ov','svg-ed-modal'].forEach(oid=>{const o=document.getElementById(oid);if(o)o.classList.remove('open');});
  _ced=null;
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const pg=document.getElementById('page-'+id);if(pg)pg.classList.add('active');
  document.querySelectorAll('.bnav-btn').forEach(b=>b.classList.remove('active'));
  const bm={dashboard:'bn-dash',vocab:'bn-vocab',memo:'bn-memo',aichat:'bn-ai',settings:'bn-settings'};
  const bb=document.getElementById(bm[id]);if(bb)bb.classList.add('active');
  if(id==='vocab'){renderVocab();const vc=document.getElementById('vtab-count');if(vc)vc.textContent=S.dictionary.length;renderVcRecent();}
  if(id==='library')renderLib();
  if(id==='memo')loadMemos();
  if(id==='roadmap')renderRoadmapFull();
  if(id==='settings')loadSettingsPage();
  if(id==='contact')renderContactForm();
  if(id==='tokushoho'||id==='privacy'||id==='terms')renderLegalPages();
  if(id==='aichat'){const lbl=document.getElementById('ai-lang-lbl');if(lbl)lbl.textContent=(S.langName||t('newLang'));if(_aihist.length===0)initAI();}
  updateVisUI();
  document.querySelectorAll('.pc-nav-btn').forEach(b=>b.classList.remove('active'));
  const pcn=document.getElementById('pcn-'+id);if(pcn)pcn.classList.add('active');
  if(!fromBack&&_navHist[_navHist.length-1]!==id){_navHist.push(id);if(_navHist.length>30)_navHist.shift();}
}
function goBack(){
  if(_navHist.length<=1){goTo('dashboard',true);return;}
  _navHist.pop();
  const prev=_navHist[_navHist.length-1]||'dashboard';
  goTo(prev,true);
}
function setBN(id){document.querySelectorAll('.bnav-btn').forEach(b=>b.classList.remove('active'));const e=document.getElementById(id);if(e)e.classList.add('active');}

// ---- Update UI ----
function _updateUI(){updateDash();updateAuthUI();updateVisUI();if(typeof updateGlyphToggle==='function')updateGlyphToggle();}
function updateDash(){
  const words=S.dictionary?.length||0,phos=(S.phoneme?.consonants?.length||0)+(S.phoneme?.vowels?.length||0),corp=S.corpus?.length||0;
  const lname=document.getElementById('d-lname');if(lname)lname.textContent=S.langName||t('newLang');
  const vpt=document.getElementById('vocab-page-title');if(vpt)vpt.textContent=(S.langName?S.langName+'の':'')+t('vocabPageTitle');
  const lsub=document.getElementById('d-lsub');if(lsub)lsub.textContent=S.langNative||(S.langName?S.langName+' — '+t('building'):t('newLang'));
  const sw=document.getElementById('sw');if(sw)sw.textContent=words;
  const sp=document.getElementById('sp');if(sp)sp.textContent=phos;
  const sc=document.getElementById('sc');if(sc)sc.textContent=corp;
  const checks=[S.langName?.length>0,(S.phoneme?.consonants?.length||0)>=3,(S.phoneme?.vowels?.length||0)>=2,words>=1,words>=10,corp>=1,S.grammar?.order?.length>0,S.vibe?.genre?.length>0];
  const pct=Math.round(checks.filter(Boolean).length/checks.length*100);
  const pb=document.getElementById('pr-bar');if(pb)pb.style.width=pct+'%';
  const pp=document.getElementById('pr-pct');if(pp)pp.textContent=pct+'%';
  const ms={phoneme:phos>=3,vocab:words>=1,grammar:S.grammar?.order?.length>0,corpus:corp>=1,script:!!(S.script?.rules||S.script?.romanization||S.script?.worldScript),vibe:S.vibe?.genre?.length>0};
  Object.entries(ms).forEach(([k,d])=>{const c=document.getElementById('mod-'+k);if(!c)return;c.classList.toggle('done',d);let chk=c.querySelector('.mchk');if(!chk&&d){chk=document.createElement('div');chk.className='mchk';chk.innerHTML=icon('check');c.appendChild(chk);}else if(chk&&!d)chk.remove();});
  const mps=document.getElementById('mod-phoneme-s');if(mps)mps.textContent=phos>0?phos+'  '+t('phonemeUnit'):t('phonemeDesc');
  const mvs=document.getElementById('mod-vocab-s');if(mvs)mvs.textContent=words>0?words+' '+t('wordUnit'):t('vocabDesc');
  const mcs=document.getElementById('mod-corpus-s');if(mcs)mcs.textContent=corp>0?corp+' '+t('corpusUnit'):t('corpusDesc');
  const dc=document.getElementById('daily-card'),ds=document.getElementById('d-sent');
  if(dc&&ds){updateDailySent(ds);}

  renderRoadmap();
}
function updateAuthUI(){
  const gb=document.getElementById('guest-banner'),ub=document.getElementById('upgrade-banner'),av=document.getElementById('top-avatar'),pb=document.getElementById('plan-badge');
  if(gb)gb.style.display=!_au?'flex':'none';
  if(ub)ub.style.display=(_au&&!_isPro)?'flex':'none';
  if(av){if(_au?.photo)av.innerHTML='<img src="'+_au.photo+'" alt="">';else if(_au?.name){av.textContent=(_au.name[0]||'U').toUpperCase();}else{av.innerHTML=icon('sparkle');}}
  const spl=document.getElementById('settings-plan-label');if(spl){if(_plan==='pro')spl.innerHTML='PRO '+icon('sparkle');else if(_plan==='lite')spl.textContent='LITE';else spl.textContent='FREE';}
}

// ---- Visibility ----
function updateVisUI(){
  const icons={private:icon('lock'),unlisted:icon('link'),public:icon('globe')};
  const labels={private:t('private'),unlisted:t('unlisted'),public:t('public')};
  const v=S.visibility||'private';
  const e=document.getElementById('vis-tx');if(e)e.innerHTML=(icons[v]||icon('lock'))+' '+(labels[v]||t('private'));
  const vd=document.getElementById('vis-desc-text');if(vd){const descs={private:t('privateDesc'),unlisted:t('unlistedDesc'),public:t('publicDesc')};vd.innerHTML=(icons[v]||icon('lock'))+' '+(labels[v])+' — '+(descs[v]||'');}
}
function openVisPop(){document.getElementById('vis-pop').classList.add('open');['private','unlisted','public'].forEach(v=>{const e=document.getElementById('vopt-'+v);if(e)e.classList.toggle('sel',S.visibility===v);});}
function closeVisPop(){document.getElementById('vis-pop').classList.remove('open');}
function setVis(v){S.visibility=v;updateVisUI();schSave();closeVisPop();}

// ---- Lang Name ----
function openLangNameEditor(){document.getElementById('lname-inp').value=S.langName||'';document.getElementById('lnative-inp').value=S.langNative||'';document.getElementById('lname-modal').classList.add('open');}
function closeLNE(){document.getElementById('lname-modal').classList.remove('open');}
function saveLN(){S.langName=document.getElementById('lname-inp').value.trim();S.langNative=document.getElementById('lnative-inp').value.trim();updateDash();schSave();closeLNE();showToast(t('langNameSaved'),'success');}

// ---- Lang Picker ----
function openLangPicker(){document.getElementById('lang-picker-modal').classList.add('open');}
function closeLangPicker(){document.getElementById('lang-picker-modal').classList.remove('open');}

// ---- Settings Page ----
async function loadPData(uid){if(!window.FB)return;try{const sn=await window.FB.getDoc(window.FB.doc(window.FB.db,'users',uid));if(sn.exists()){_pdata=sn.data();if(_pdata.plan==='pro'||_pdata.plan==='lite'){_plan=_pdata.plan;_isPro=true;}}}catch(e){}}
function loadSettingsPage(){
  const ne=document.getElementById('pf-name'),be=document.getElementById('pf-bio'),ee=document.getElementById('pf-email'),vt=document.getElementById('viola-tog'),ln=document.getElementById('pf-lname'),ls=document.getElementById('pf-lstats'),al=document.getElementById('p-avlg'),ai=document.getElementById('p-av-init'),nd=document.getElementById('pf-name-disp');
  if(ln)ln.textContent=S.langName||'('+t('newLang')+')';if(ls)ls.textContent=t('vocabCount')+': '+(S.dictionary?.length||0);
  renderLangPills();
  if(!_au){if(ne)ne.value='';if(ee)ee.value='';return;}
  if(ee)ee.value=_au.email||'';
  if(_au.photo&&al)al.innerHTML='<img src="'+_au.photo+'" alt="">';else if(ai&&_au.name)ai.textContent=(_au.name[0]||'U').toUpperCase();
  if(ne)ne.value=_pdata.profile_name||_au.name||'';
  if(nd)nd.textContent=_au.name||'-';
  if(be){be.value=_pdata.profile_bio||'';const bc=document.getElementById('bio-cnt');if(bc)bc.textContent=be.value.length;}
  if(vt)vt.checked=!!_pdata.viola_active;
  updateViolaMsg(!!_pdata.viola_active);
  updateVisUI();
}
function onViolaTog(cb){updateViolaMsg(cb.checked);}
function updateViolaMsg(on){const e=document.getElementById('viola-msg');if(!e)return;e.style.display='block';if(on){e.style.borderLeftColor='var(--ok)';e.innerHTML=t('violaActiveMsg');}else{e.style.borderLeftColor='var(--br)';e.innerHTML=t('violaInactiveMsg');}}
async function saveProfile(){
  const btn=document.getElementById('pf-save-lbl'),nm=document.getElementById('pf-name')?.value.trim(),bio=document.getElementById('pf-bio')?.value.trim(),va=document.getElementById('viola-tog')?.checked;
  if(!nm){showToast(t('displayNameRequired'),'error');return;}
  if(btn)btn.textContent=t('saving');
  const d={profile_name:nm,profile_bio:bio||'',viola_active:!!va,dictionary_id:S.langName||'',updated_at:new Date().toISOString()};
  if(_au){_au.name=nm;try{localStorage.setItem(AKEY,JSON.stringify(_au));}catch(e){}}_pdata={..._pdata,...d};
  if(_au?.uid&&window.FB?.db)try{await window.FB.setDoc(window.FB.doc(window.FB.db,'users',_au.uid),d,{merge:true});showToast(t('saveProfile')+' '+icon('checkCircle')+'','success');}catch(e){showToast(t('saveFailed')+': '+e.message,'error');}
  else showToast(t('savedLocally'),'success');
  if(btn)btn.innerHTML=icon('check')+' '+t('save');_updateUI();
}
function triggerAv(){if(!_au){showToast(t('login'),'info');return;}document.getElementById('av-file')?.click();}
async function handleAvFile(inp){
  const f=inp.files?.[0];if(!f)return;if(f.size>3*1024*1024){showToast(t('imageTooLarge'),'error');return;}
  const pw=document.getElementById('av-prog-wrap'),pb=document.getElementById('av-prog-bar');if(pw)pw.style.display='block';if(pb)pb.style.width='40%';
  const reader=new FileReader();reader.onload=async e=>{const b64=e.target.result;if(pb)pb.style.width='80%';const al=document.getElementById('p-avlg');if(al)al.innerHTML='<img src="'+b64+'" alt="">';if(_au)_au.photo=b64;try{localStorage.setItem(AKEY,JSON.stringify(_au));}catch(e){}if(_au?.uid&&window.FB?.db)try{await window.FB.setDoc(window.FB.doc(window.FB.db,'users',_au.uid),{profile_photo:b64},{merge:true});}catch(e){}if(pb)pb.style.width='100%';setTimeout(()=>{if(pw)pw.style.display='none';},500);showToast(t('avatarUpdated'),'success');updateAuthUI();};reader.readAsDataURL(f);
}


// ---- Legal Pages ----
function renderLegalPages(){
  const lang=_lang||'jp';
  const tok=document.getElementById('tokushoho-body');
  if(tok){
    const rows={
      jp:[['販売事業者','Lingua開発チーム'],['サービス名','Lingua — コンラングビルダー'],['所在地','日本国内（請求に応じ速やかに開示）'],['連絡先','お問い合わせフォームよりご連絡ください'],['販売価格','Liteプラン: $9.9/月、Proプラン: $19.9/月（税込）'],['支払方法','クレジットカード（Stripe経由）'],['支払時期','ご契約時および毎月の更新日に自動請求'],['役務の提供時期','決済完了後、即時提供開始'],['返品・キャンセル','月次プランは翌月以降の更新をいつでもキャンセル可能。既払い分の返金はいたしかねます。'],['動作環境','最新のChrome / Safari / Firefox 推奨']],
      en:[['Seller','Lingua Development Team'],['Service','Lingua — Conlang Builder'],['Location','Japan (disclosed promptly upon request)'],['Contact','Via the contact form'],['Pricing','Lite: $9.9/mo, Pro: $19.9/mo (tax incl.)'],['Payment','Credit card via Stripe'],['Billing','Charged at signup and on each monthly renewal'],['Service Start','Immediately upon payment'],['Returns/Cancel','Monthly plans may be cancelled at any time. No refunds for the current period.'],['Environment','Latest Chrome / Safari / Firefox recommended']],
      zh:[['销售商','Lingua开发团队'],['服务名称','Lingua — 人造语构建器'],['所在地','日本（根据要求迅速披露）'],['联系方式','通过联系表单'],['价格','Lite: $9.9/月, Pro: $19.9/月（含税）'],['支付方式','通过Stripe的信用卡'],['账单周期','注册时及每月续费时自动扣款'],['服务开始','付款完成后立即提供'],['退款/取消','月费计划可随时取消。不退还当期费用。'],['运行环境','推荐最新版 Chrome / Safari / Firefox']],
      es:[['Vendedor','Equipo de Lingua'],['Servicio','Lingua — Constructor de conlangs'],['Ubicación','Japón (divulgado a solicitud)'],['Contacto','A través del formulario de contacto'],['Precios','Lite: $9.9/mes, Pro: $19.9/mes (IVA incl.)'],['Pago','Tarjeta de crédito vía Stripe'],['Facturación','Al registrarse y en cada renovación mensual'],['Inicio del servicio','Inmediatamente tras el pago'],['Cancelación','Los planes mensuales se pueden cancelar en cualquier momento. No se reembolsa el período actual.'],['Entorno','Última versión de Chrome / Safari / Firefox recomendada']],
    };
    const r=rows[lang]||rows.jp;
    tok.innerHTML='<table class="law-t">'+r.map(([k,v])=>`<tr><th>${k}</th><td>${v}</td></tr>`).join('')+'</table>';
  }
  const priv=document.getElementById('privacy-body');
  if(priv){
    const secs={
      jp:[['1. 収集する情報','当サービスは、ご利用に際して以下の情報を収集することがあります：メールアドレス（ログイン時）、アカウント情報、作成した言語データ（クラウド同期時）、アクセスログ。'],['2. 利用目的','収集した情報は、サービスの提供・改善、サポート対応、決済処理のためにのみ使用します。第三者への販売・提供は一切行いません。'],['3. データの保存','ゲスト・無料プランのデータはブラウザのローカルストレージに保存されます。LiteおよびProプランではFirebase（Google LLC）のサーバーで管理されます。'],['4. Cookie','サービスの品質改善のため、Cookieおよび類似の技術を使用する場合があります。'],['5. お問い合わせ','プライバシーに関するご質問は、お問い合わせフォームよりご連絡ください。']],
      en:[['1. Information Collected','We may collect: email address (on login), account info, language data (on cloud sync), and access logs.'],['2. Purpose of Use','Collected information is used solely for service provision, improvement, support, and payment processing. We never sell or share it with third parties.'],['3. Data Storage','Guest/free plan data is stored in browser local storage. Lite and Pro plan data is managed on Firebase (Google LLC) servers.'],['4. Cookies','We may use cookies and similar technologies to improve service quality.'],['5. Contact','For privacy-related questions, please use the contact form.']],
      zh:[['1. 收集的信息','我们可能收集以下信息：电子邮件地址（登录时）、账户信息、语言数据（云同步时）、访问日志。'],['2. 使用目的','收集的信息仅用于提供和改进服务、客户支持及支付处理。我们不会向第三方出售或提供这些信息。'],['3. 数据存储','游客/免费计划的数据存储在浏览器本地存储中。Lite和Pro计划的数据由Firebase（Google LLC）服务器管理。'],['4. Cookie','我们可能使用Cookie及类似技术来改善服务质量。'],['5. 联系我们','有关隐私的问题，请通过联系表单联系我们。']],
      es:[['1. Información recopilada','Podemos recopilar: dirección de correo (al iniciar sesión), información de cuenta, datos de idioma (en sincronización) y registros de acceso.'],['2. Finalidad','La información recopilada se usa únicamente para proveer y mejorar el servicio, soporte y procesamiento de pagos. No la vendemos a terceros.'],['3. Almacenamiento de datos','Los datos del plan gratuito se guardan en el almacenamiento local del navegador. Los planes Lite y Pro usan servidores de Firebase (Google LLC).'],['4. Cookies','Podemos usar cookies y tecnologías similares para mejorar la calidad del servicio.'],['5. Contacto','Para preguntas sobre privacidad, usa el formulario de contacto.']],
    };
    const s=secs[lang]||secs.jp;
    const p='font-size:.78rem;color:var(--txs);line-height:1.7;margin-bottom:14px';
    priv.innerHTML=s.map(([h,b],i)=>`<div class="sh">${h}</div><p style="${i<s.length-1?p:'font-size:.78rem;color:var(--txs);line-height:1.7'}">${b}</p>`).join('');
  }
  const termsEl=document.getElementById('terms-body');
  if(termsEl){
    const secs={
      jp:[['1. 利用条件','本サービスは13歳以上の方にご利用いただけます。アカウント登録により本規約に同意したものとみなします。'],['2. 禁止事項','不正アクセス、スパム、著作権侵害、その他の違法行為は禁止されています。'],['3. サービスの変更・中断','当社はサービスの内容を予告なく変更・中断・終了する場合があります。'],['4. 免責事項','当サービスの利用によって生じた損害について、当社は一切の責任を負いません。'],['5. 規約の変更','本規約は予告なく変更される場合があります。変更後の利用をもって同意とみなします。'],['6. 準拠法','本規約は日本法に準拠します。']],
      en:[['1. Eligibility','You must be 13 or older to use this service. By registering, you agree to these terms.'],['2. Prohibited Activities','Unauthorized access, spam, copyright infringement, and other illegal activities are prohibited.'],['3. Service Changes','We may modify, suspend, or terminate the service without prior notice.'],['4. Disclaimer','We are not liable for any damages arising from use of this service.'],['5. Changes to Terms','These terms may be updated without notice. Continued use constitutes acceptance.'],['6. Governing Law','These terms are governed by the laws of Japan.']],
      zh:[['1. 使用条件','本服务适用于13岁及以上用户。注册账户即表示同意本条款。'],['2. 禁止事项','禁止未经授权访问、垃圾信息、侵权及其他违法行为。'],['3. 服务变更','我们可能在未事先通知的情况下更改、暂停或终止服务。'],['4. 免责声明','对于因使用本服务而造成的损失，我们不承担任何责任。'],['5. 条款变更','本条款可能在不事先通知的情况下更新。继续使用即表示接受。'],['6. 适用法律','本条款受日本法律管辖。']],
      es:[['1. Elegibilidad','Debes tener 13 años o más para usar este servicio. Al registrarte, aceptas estos términos.'],['2. Actividades prohibidas','Se prohíben el acceso no autorizado, el spam, la infracción de derechos de autor y otras actividades ilegales.'],['3. Cambios en el servicio','Podemos modificar, suspender o terminar el servicio sin previo aviso.'],['4. Descargo de responsabilidad','No somos responsables de daños derivados del uso de este servicio.'],['5. Cambios en los términos','Estos términos pueden actualizarse sin previo aviso. El uso continuado constituye aceptación.'],['6. Ley aplicable','Estos términos se rigen por las leyes de Japón.']],
    };
    const s=secs[lang]||secs.jp;
    const p='font-size:.78rem;color:var(--txs);line-height:1.7;margin-bottom:14px';
    termsEl.innerHTML=s.map(([h,b],i)=>`<div class="sh">${h}</div><p style="${i<s.length-1?p:'font-size:.78rem;color:var(--txs);line-height:1.7'}">${b}</p>`).join('');
  }
}

// ---- Editor Dispatcher ----
// ---- Editor ----
let _edPrevPage=null;
function openEditor(type){
  _ced=type;
  const active=document.querySelector('.page.active');
  _edPrevPage=active?active.id.replace('page-',''):'dashboard';
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const ov=document.getElementById('ed-ov'),tl=document.getElementById('ed-title'),bd=document.getElementById('ed-body');
  const TITLES={phoneme:icon('music')+' '+t('phonology'),vocab:icon('book')+' '+t('vocabulary'),grammar:icon('ruler')+' '+t('grammar'),corpus:icon('corpus')+' '+t('corpusTitle'),daily:icon('calendar')+' 1日1文',script:icon('pen')+' '+t('script'),vibe:icon('galaxy')+' '+t('vibe')};
  tl.innerHTML=TITLES[type]||type;
  bd.innerHTML=buildEB(type);
  ov.classList.add('open');
  window.scrollTo(0,0);
}
function closeEditor(){
  const ov=document.getElementById('ed-ov');
  ov.classList.remove('open');
  _ced=null;
  const pg=document.getElementById('page-'+(_edPrevPage||'dashboard'));
  if(pg)pg.classList.add('active');
  _edPrevPage=null;
  _updateUI();renderVocab();
  window.scrollTo(0,0);
}
function buildEB(type){switch(type){case 'phoneme':return buildPhEd();case 'vocab':return buildVcEd();case 'grammar':return buildGrEd();case 'corpus':return buildCpEd();case 'daily':return buildDlEd();case 'script':return buildScEd();case 'vibe':return buildVbEd();default:return '<p style="color:var(--txs)">'+t('comingSoon')+'</p>';}}

// ---- Tabs ----
function swTab(btn,pid){const par=btn.closest('.eo')||document.getElementById('ed-body');if(!par)return;par.querySelectorAll('.tabbtn').forEach(b=>b.classList.remove('active'));par.querySelectorAll('.tabpn').forEach(p=>p.classList.remove('active'));btn.classList.add('active');const p=document.getElementById(pid);if(p)p.classList.add('active');}


// ---- Library ----
const LIB=[
  {id:'1',name:'シルヴァリ語',native:'Silvari',genre:'ファンタジー',desc:'北方のエルフ族が話す優美な言語。摩擦音と流音を多用し、詩的な表現に富む。',words:142,author:'starweaver'},
  {id:'2',name:'カアナ語',native:"Ka'ana",genre:'SF',desc:'宇宙船の乗組員が使う共通語。単純な音節構造と機能的な文法を持つ。',words:89,author:'cosmos_builder'},
  {id:'3',name:'テオク語',native:'Teoc',genre:'古代',desc:'失われた古代文明の言語。複雑な格変化と動詞の時制体系を持つ。',words:203,author:'ancient_tongue'},
  {id:'4',name:'ミラ語',native:'Mira',genre:'和風',desc:'山岳地帯に住む精霊と人間が共に使う言語。日本語の影響を受けた音節構造。',words:67,author:'mira_lang'},
  {id:'5',name:'ドラコン語',native:'Dracon',genre:'ファンタジー',desc:'竜族の言語。硬い破裂音と摩擦音が特徴。短く力強い表現が多い。',words:55,author:'dragon_lore'},
];
function renderLib(q=''){const g=document.getElementById('lib-grid');if(!g)return;const f=q.toLowerCase().trim();let items=[...LIB];if(S.langName&&S.visibility==='public'&&S.dictionary.length>0){const ul={id:'user',name:S.langName,native:S.langNative||S.langName,genre:S.vibe?.genre||t('notSet'),desc:S.vibe?.notes||t('ownLangDesc'),words:S.dictionary.length,author:_au?.name||t('you'),isOwn:true};if(!f||ul.name.toLowerCase().includes(f)||ul.genre.toLowerCase().includes(f))items=[ul,...items];}if(f)items=items.filter(l=>l.name.toLowerCase().includes(f)||l.native.toLowerCase().includes(f)||l.genre.toLowerCase().includes(f)||l.desc.toLowerCase().includes(f));g.innerHTML=items.length?items.map(l=>`<div class="lbc">${l.isOwn?'<div style="font-size:.62rem;color:var(--ok);margin-bottom:6px">'+t('yourLang')+'</div>':''}<div class="lbn">${esc(l.name)}</div>${l.native?'<div style="font-size:.78rem;color:var(--ac2);margin-bottom:4px;font-style:italic">'+esc(l.native)+'</div>':''}<span class="lbg">${esc(l.genre)}</span><div class="lbd">${esc(l.desc)}</div><div class="lbm"><span>${icon('book')} ${l.words} '+t('wordUnit')+'</span><span>${icon('user')} ${esc(l.author)}</span></div></div>`).join(''):'<div class="empty"><div style="font-size:2rem;margin-bottom:8px;opacity:.4">'+icon('leaf')+'</div><div>'+t('noResults')+'</div></div>';}

// ---- Memo ----
function initMDB(){if(!window.indexedDB)return;const r=indexedDB.open(MDBNAME,1);r.onupgradeneeded=e=>{const d=e.target.result;if(!d.objectStoreNames.contains(MSTORE)){const s=d.createObjectStore(MSTORE,{keyPath:'id'});s.createIndex('updatedAt','updatedAt');}};r.onsuccess=e=>{_mdb=e.target.result;loadMemos();};r.onerror=()=>console.warn('IndexedDB unavailable');}
function dbGetAll(fn){if(!_mdb)return fn([]);const tx=_mdb.transaction(MSTORE,'readonly');const st=tx.objectStore(MSTORE);const r=st.getAll();r.onsuccess=()=>fn(r.result.sort((a,b)=>new Date(b.updatedAt)-new Date(a.updatedAt)));r.onerror=()=>fn([]);}
function loadMemos(){dbGetAll(ms=>{const le=document.getElementById('memo-list');if(!le)return;if(!ms.length){le.innerHTML='<div class="empty"><div style="font-size:2rem;margin-bottom:10px;opacity:.4">'+icon('corpus')+'</div><div>メモがありません</div><button class="btn btn-p" style="margin-top:12px" onclick="openMemoNew()">'+t('createFirstMemo')+'</button></div>';return;}le.innerHTML=ms.map(m=>`<div class="memc" onclick="openMemoEd('${m.id}')"><div class="memct">${esc(m.title||t('untitled'))}</div><div class="memcb">${esc(m.body||'')}</div><div class="memcd">${new Date(m.updatedAt).toLocaleDateString('ja-JP',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'})}</div></div>`).join('');});}
let _memPrevPage=null;
function _memOpenStart(){
  const active=document.querySelector('.page.active');
  _memPrevPage=active?active.id.replace('page-',''):'memo';
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('memo-ov').classList.add('open');
  window.scrollTo(0,0);
}
function openMemoNew(){_meid=null;document.getElementById('memo-title-inp').value='';document.getElementById('memo-body-inp').value='';document.getElementById('memo-del-btn').style.display='none';_memOpenStart();}
function openMemoEd(id){dbGetAll(ms=>{const m=ms.find(x=>x.id===id);if(!m)return;_meid=id;document.getElementById('memo-title-inp').value=m.title||'';document.getElementById('memo-body-inp').value=m.body||'';document.getElementById('memo-del-btn').style.display='inline-flex';_memOpenStart();});}
function closeMemoEd(){
  document.getElementById('memo-ov').classList.remove('open');
  const pg=document.getElementById('page-'+(_memPrevPage||'memo'));
  if(pg)pg.classList.add('active');
  _memPrevPage=null;
  loadMemos();
  window.scrollTo(0,0);
}
function saveMemo(){const ti=document.getElementById('memo-title-inp').value.trim()||'無題',bd=document.getElementById('memo-body-inp').value;const id=_meid||('m-'+Date.now()+'-'+Math.random().toString(36).slice(2,8));const m={id,title:ti,body:bd,updatedAt:new Date().toISOString()};if(!_mdb){showToast(t('dbError'),'error');return;}const tx=_mdb.transaction(MSTORE,'readwrite');tx.objectStore(MSTORE).put(m);tx.oncomplete=()=>{closeMemoEd();showToast(t('memoSaved'),'success');};tx.onerror=()=>showToast(t('saveFailed'),'error');}
function delMemo(){if(!_meid||!_mdb)return;if(!confirm(t('memoDeleteConfirm')))return;const tx=_mdb.transaction(MSTORE,'readwrite');tx.objectStore(MSTORE).delete(_meid);tx.oncomplete=()=>{closeMemoEd();showToast(t('deleted'),'info');};}

// ---- AI Chat ----
function getAILim(){if(_isPro&&_plan==='pro')return 9999;if(_isPro&&_plan==='lite')return 50;return 10;}
function chkAILim(){const t=new Date().toDateString();if(_aiDate!==t){_aiDate=t;_aiCnt=0;}return _aiCnt<getAILim();}
function updAILimUI(){const e=document.getElementById('ai-lim');if(!e)return;const l=getAILim(),r=l-_aiCnt;if(l>=9999){e.textContent=t('unlimited');e.style.color='var(--ok)';}else{e.textContent='残り '+Math.max(0,r)+'/'+l+' 回';e.style.color=r<=3?'var(--rs)':'var(--txm)';}}
function initAI(){const m=document.getElementById('chat-msgs');if(!m)return;
  const L=_lang||'jp';
  const greetings={
    jp:S.langName?'こんにちは！「'+S.langName+'」の制作、頑張っていますね！何でも相談してください。':'こんにちは！コンラング制作のAIアドバイザーです。どんな言語を作りますか？',
    en:S.langName?'Hello! Great work on "'+S.langName+'"! Ask me anything.':'Hello! I\'m your conlang AI advisor. What language are you building?',
    zh:S.langName?'你好！"'+S.langName+'"进展不错！有任何问题请告诉我。':'你好！我是你的人造语AI顾问。你在制作什么样的语言？',
    es:S.langName?'¡Hola! ¡Buen trabajo en "'+S.langName+'"! Pregúntame lo que sea.':'¡Hola! Soy tu asesor IA de conlangs. ¿Qué idioma estás creando?',
  };
  const g=greetings[L]||greetings.jp;
  _aihist=[];m.innerHTML='<div class="cb ai"><div class="cbi">'+g+'</div></div>';renderSugs();updAILimUI();}
function renderSugs(){const e=document.getElementById('csug');if(!e)return;const cs=[t('aiSug1'),t('aiSug2'),t('aiSug3'),t('aiSug4'),t('aiSug5')];e.innerHTML=cs.map(c=>`<div class="sc" onclick="sendSug('${esc(c)}')">${c}</div>`).join('');}
function sendSug(tx){const i=document.getElementById('chat-inp');if(i)i.value=tx;sendChat();}
async function sendChat(){const inp=document.getElementById('chat-inp');if(!inp?.value.trim())return;const um=inp.value.trim();inp.value='';if(!chkAILim()){showToast(t('aiLimitReached'),'error');openUpgrade();return;}const m=document.getElementById('chat-msgs');if(!m)return;m.innerHTML+='<div class="cb u"><div class="cbi">'+esc(um)+'</div></div>';const tid='t-'+Date.now();m.innerHTML+='<div class="cb ai" id="'+tid+'"><div class="cbi"><span class=\"spinning\">'+icon('spinner')+'</span> '+t('aiThinking')+'</div></div>';m.scrollTop=m.scrollHeight;_aihist.push({role:'user',content:um});_aiCnt++;updAILimUI();try{const r=await aiReply(um);const te=document.getElementById(tid);if(te)te.querySelector('.cbi').textContent=r;_aihist.push({role:'assistant',content:r});m.scrollTop=m.scrollHeight;}catch(e){const te=document.getElementById(tid);if(te)te.querySelector('.cbi').textContent=t('aiError');}}
async function aiReply(msg){
  await new Promise(r=>setTimeout(r,900+Math.random()*600));
  const ml=msg.toLowerCase(),w=S.dictionary?.length||0,p=(S.phoneme?.consonants?.length||0)+(S.phoneme?.vowels?.length||0);
  const lang=_lang||'jp';
  const R={
    jp:{
      start:'言語制作は【音韻'+icon('arrR')+'語彙'+icon('arrR')+'文法】の順がおすすめです。まず音素（子音5〜10個、母音3〜5個）を決めると、その音から自然な単語が生まれます。音韻タブから始めてみてください！',
      phonHas:n=>`現在${n}個の音素があります。バランスとしては子音8〜12個、母音4〜6個が扱いやすいです。音節構造（CV, CVC）も決めると単語の形が統一されます。`,
      phonNone:'音韻から始めましょう！IPAの中から気に入ったものを選ぶと、言語の個性が生まれます。エルフ系なら「l, r, n, s, ae, i, o」など。',
      vocabHas:n=>`語彙${n}語、いいペースです！次は反意語や派生語を作るといいですよ。「愛${icon('arrR')}愛する${icon('arrR')}愛される」など関連語を増やすと語彙が自然に広がります。`,
      vocabNone:'語彙は「100語リスト」から始めましょう。体の部位、数字、基本動詞（行く・来る・食べる・見る）を先に揃えると、どんな文でも作れるようになります。',
      script:'世界の文字体系（ルーン、ゲエズ、キリル等）をインスピレーションに使いましょう！文字体系タブで世界の文字を参照できます。',
      grammar:'語順はSOV（日本語型）が初心者に作りやすいです。時制は最初は「過去/現在/未来」だけで十分。格変化はなくしてもいい。まずシンプルに、後から複雑にするのがコツです。',
      vibe:'言語のムードが決まると単語の形が統一されます。「神秘的・エルフ系」なら柔らかい摩擦音（s, l, f, v）を多用、「力強い・戦士系」なら破裂音（k, t, p, g）を主体にすると雰囲気が出ます。',
      fallback:(w,p,next)=>`面白い質問ですね！現在の状況（語彙:${w}語、音素:${p}個）を活かして、次は${next}をおすすめします。`,
      next10:'語彙を10語まで増やすこと', next50:'例文を1文作ること', nextGr:'文法の整理',
    },
    en:{
      start:'Start with phonology '+icon('arrR')+' vocabulary '+icon('arrR')+' grammar. Define 5-10 consonants and 3-5 vowels first — natural words will emerge from those sounds. Try the Phonology tab!',
      phonHas:n=>`You have ${n} phonemes. A good balance is 8-12 consonants, 4-6 vowels. Setting a syllable structure (CV, CVC) will unify your word shapes.`,
      phonNone:'Start with phonology! Choose sounds from IPA that feel right. Elven-style: l, r, n, s, ae, i, o. Warrior-style: k, t, g, r.',
      vocabHas:n=>`${n} words — great pace! Next, try antonyms and derivations. "love ${icon('arrR')} to love ${icon('arrR')} beloved" expands vocabulary naturally.`,
      vocabNone:'Start with a 100-word list: body parts, numbers, core verbs (go, come, eat, see). Once you have those, you can build any sentence.',
      script:'Use world writing systems (Runic, Ge\'ez, Cyrillic) as inspiration! Browse them in the Script tab.',
      grammar:'SOV word order (like Japanese) is easiest for beginners. Start with just past/present/future tense. You can always add complexity later.',
      vibe:'Once you fix the mood, word shapes unify. Mystical/elven '+icon('arrR')+' soft fricatives (s, l, f, v). Warrior-style '+icon('arrR')+' stops (k, t, p, g).',
      fallback:(w,p,next)=>`Interesting question! Given your current state (vocab: ${w} words, phonemes: ${p}), I suggest: ${next}.`,
      next10:'grow vocabulary to 10 words', next50:'write one example sentence', nextGr:'organize your grammar',
    },
    zh:{
      start:'建议按照【音韵'+icon('arrR')+'词汇'+icon('arrR')+'语法】的顺序制作语言。先定义5-10个辅音和3-5个元音，自然的词汇会从中产生。从音韵标签开始吧！',
      phonHas:n=>`您目前有${n}个音素。建议辅音8-12个，元音4-6个。设定音节结构（CV, CVC）可以统一词形。`,
      phonNone:'从音韵开始！从IPA中选择喜欢的音素，语言的个性就会出现。精灵风格：l, r, n, s, ae, i, o。',
      vocabHas:n=>`${n}个词汇，进展不错！接下来可以创造反义词和派生词，自然扩展词汇量。`,
      vocabNone:'从100词列表开始：身体部位、数字、基本动词（去、来、吃、看）。有了这些就能造任何句子。',
      script:'可以从世界文字体系（如尼文、埃塞俄比亚文、西里尔字母）中获取灵感！在文字标签中浏览。',
      grammar:'SOV语序（像日语）对初学者最容易。时态只需过去/现在/未来三种即可，格变化可以省略，先简单后复杂。',
      vibe:'确定语言氛围后，词形会趋于统一。神秘精灵风：柔和擦音（s, l, f, v）；战士风：爆破音（k, t, p, g）。',
      fallback:(w,p,next)=>`有趣的问题！根据您目前的状态（词汇：${w}个，音素：${p}个），建议下一步：${next}。`,
      next10:'将词汇增加到10个', next50:'写一个例句', nextGr:'整理语法',
    },
    es:{
      start:'Empieza con fonología '+icon('arrR')+' vocabulario '+icon('arrR')+' gramática. Define 5-10 consonantes y 3-5 vocales primero — las palabras surgirán naturalmente. ¡Prueba la pestaña Fonología!',
      phonHas:n=>`Tienes ${n} fonemas. Un buen balance: 8-12 consonantes, 4-6 vocales. Definir una estructura silábica (CV, CVC) unificará tus palabras.`,
      phonNone:'¡Empieza por la fonología! Elige sonidos del IPA. Estilo élfico: l, r, n, s, ae, i, o. Estilo guerrero: k, t, g, r.',
      vocabHas:n=>`${n} palabras — ¡buen ritmo! Prueba con antónimos y derivaciones para expandir el léxico naturalmente.`,
      vocabNone:'Empieza con 100 palabras: partes del cuerpo, números, verbos básicos (ir, venir, comer, ver). Con eso puedes construir cualquier frase.',
      script:'¡Usa sistemas de escritura del mundo (rúnico, ge\'ez, cirílico) como inspiración! Encuéntralos en la pestaña Escritura.',
      grammar:'El orden SOV (como el japonés) es el más fácil para empezar. Solo necesitas pasado/presente/futuro. Puedes añadir complejidad después.',
      vibe:'Una vez que fijes el ambiente, las formas de las palabras se unifican. Místico/élfico '+icon('arrR')+' fricativas suaves (s, l, f, v). Guerrero '+icon('arrR')+' oclusivas (k, t, p, g).',
      fallback:(w,p,next)=>`¡Pregunta interesante! Con tu estado actual (léxico: ${w} palabras, fonemas: ${p}), te sugiero: ${next}.`,
      next10:'aumentar vocabulario a 10 palabras', next50:'escribir una frase de ejemplo', nextGr:'organizar la gramática',
    },
  };
  const r=R[lang]||R.jp;
  const kw={
    jp:{start:['最初','始め','何から'],phon:['音韻','音素','発音'],vocab:['語彙','単語','辞書'],script:['文字','スクリプト'],grammar:['文法','語順','時制'],vibe:['世界観','ジャンル','雰囲気']},
    en:{start:['start','begin','first','how to'],phon:['phonology','phoneme','sound','pronunciation'],vocab:['vocab','word','dictionary','lexicon'],script:['script','writing','character'],grammar:['grammar','order','tense','syntax'],vibe:['vibe','genre','mood','atmosphere']},
    zh:{start:['开始','怎么','先'],phon:['音韵','音素','发音'],vocab:['词汇','单词','词典'],script:['文字','字母'],grammar:['语法','语序','时态'],vibe:['世界观','风格','氛围']},
    es:{start:['empezar','inicio','primero','qué'],phon:['fonología','fonema','sonido'],vocab:['léxico','palabra','vocabulario','diccionario'],script:['escritura','carácter','script'],grammar:['gramática','orden','tiempo','sintaxis'],vibe:['ambiente','género','estilo']},
  };
  const kl=kw[lang]||kw.jp;
  if(kl.start.some(k=>ml.includes(k)))return r.start;
  if(kl.phon.some(k=>ml.includes(k)))return p>0?r.phonHas(p):r.phonNone;
  if(kl.vocab.some(k=>ml.includes(k)))return w>0?r.vocabHas(w):r.vocabNone;
  if(kl.script.some(k=>ml.includes(k)))return r.script;
  if(kl.grammar.some(k=>ml.includes(k)))return r.grammar;
  if(kl.vibe.some(k=>ml.includes(k)))return r.vibe;
  const next=w<10?r.next10:w<50?r.next50:r.nextGr;
  return r.fallback(w,p,next);
}

// ---- FAQ ----
const FAQ=[{q:'Linguaとは何ですか？',a:'Linguaは、架空言語（コンラング）を設計・管理するための本格ツールです。音韻、語彙、文法、文字体系を一つのアプリで管理できます。'},{q:'無料でどこまで使えますか？',a:'無料プランでは1言語まで、AI会話10回/日、ローカル保存が利用できます。Proプランではすべての機能が無制限になります。'},{q:'Violaとは何ですか？',a:'ViolaはLinguaと連携するSNSサービスです。自分のコンラングを他のユーザーとシェアしたり、コンランガーのコミュニティとつながれます。設定ページから連携を設定できます。'},{q:'データはどこに保存されますか？',a:'ゲスト・無料プランではブラウザのローカルストレージに保存されます。Proプランではクラウド（Firestore）に自動同期されます。'},{q:'スマートフォンでも使えますか？',a:'はい！モバイルファーストで設計されており、iPhoneやAndroidのブラウザでも快適に動作します。セーフエリアにも対応しています。'},{q:'決済は安全ですか？',a:'Stripeを使用した安全な決済です。カード情報はStripeが管理し、Linguaのサーバーには一切保存されません。いつでもキャンセル可能です。'},{q:'キャンセルはできますか？',a:'はい、いつでもキャンセル可能です。キャンセル後も月末まで引き続きご利用いただけます。'}];
function renderFaq(){const e=document.getElementById('faq-list');if(!e)return;e.innerHTML=FAQ.map((f,i)=>`<div class="fqi"><div class="fqq" onclick="togFaq(${i},this)"><span>${f.q}</span><span id="fa-${i}">${icon('chevD')}</span></div><div class="fqa" id="fa-a-${i}">${f.a}</div></div>`).join('');}
function togFaq(i,btn){const a=document.getElementById('fa-a-'+i),ar=document.getElementById('fa-'+i);if(!a)return;a.classList.toggle('open');if(ar)ar.innerHTML=a.classList.contains('open')?icon('chevU'):icon('chevD');}

// ---- Contact Form ----
function renderContactForm(){
  const sel=document.getElementById('ct-type');
  if(!sel)return;
  const options=[
    {value:'bug',icon:''+icon('bug')+'',label:{jp:'バグ報告',en:'Bug Report',zh:'错误报告',es:'Informe de error'}},
    {value:'request',icon:''+icon('sparkles')+'',label:{jp:'機能リクエスト',en:'Feature Request',zh:'功能请求',es:'Solicitud de función'}},
    {value:'question',icon:''+icon('help')+'',label:{jp:'質問',en:'Question',zh:'问题',es:'Pregunta'}},
    {value:'other',icon:''+icon('chat')+'',label:{jp:'その他',en:'Other',zh:'其他',es:'Otro'}}
  ];
  sel.innerHTML=options.map(o=>`<option value="${o.value}">${o.icon} ${o.label[_lang]||o.label.jp}</option>`).join('');
}

// ---- Contact ----
async function submitContact(){
  const type=document.getElementById('ct-type')?.value||'other';
  const email=document.getElementById('ct-email')?.value.trim();
  const msg=document.getElementById('ct-msg')?.value.trim();
  if(!email){showToast(t('contactEmailRequired'),'error');return;}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){showToast(t('contactEmailInvalid'),'error');return;}
  if(!msg){showToast(t('contactMsgRequired'),'error');return;}
  const btn=document.querySelector('#page-contact .btn-p');
  if(btn){btn.disabled=true;btn.textContent=t('contactSending');}
  try{
    if(window.FB?.addDoc){
      await window.FB.addDoc(window.FB.collection(window.FB.db,'contacts'),{
        type,email,message:msg,
        uid:_au?.uid||null,
        langName:S.langName||'',
        createdAt:new Date().toISOString()
      });
    }
    document.getElementById('ct-email').value='';
    document.getElementById('ct-msg').value='';
    showToast(t('contactSuccess'),'success');
  }catch(e){
    showToast(t('contactFail'),'error');
  }finally{
    if(btn){btn.disabled=false;btn.setAttribute('data-i18n','send');btn.textContent=t('send');}
  }
}

// ---- Global Exports ----
window.goTo=goTo;window.goBack=goBack;window.openEditor=openEditor;window.closeEditor=closeEditor;window.openLogin=openLogin;window.closeLogin=closeLogin;
window.openSvgEditor=openSvgEditor;window.closeSvgEditor=closeSvgEditor;window.saveSvgEditor=saveSvgEditor;window.clearSvgEditor=clearSvgEditor;window.uploadSvgFile=uploadSvgFile;window.renderSvgPreview=renderSvgPreview;

// ---- Modal ESC to close ----
document.addEventListener('keydown',e=>{
  if(e.key!=='Escape')return;
  // Close topmost open modal/overlay in stacking order
  const edSvg=document.getElementById('svg-ed-modal');if(edSvg&&edSvg.classList.contains('open')){closeSvgEditor();return;}
  const vp=document.getElementById('vis-pop');if(vp&&vp.classList.contains('open')){closeVisPop();return;}
  const lg=document.getElementById('login-modal');if(lg&&lg.classList.contains('open')){closeLogin();return;}
  const lp=document.getElementById('lang-picker-modal');if(lp&&lp.classList.contains('open')){closeLangPicker();return;}
  const ln=document.getElementById('lname-modal');if(ln&&ln.classList.contains('open')){closeLNE();return;}
  const mov=document.getElementById('memo-ov');if(mov&&mov.classList.contains('open')){closeMemoEd();return;}
  const eov=document.getElementById('ed-ov');if(eov&&eov.classList.contains('open')){closeEditor();return;}
});
console.log(''+icon('checkCircle')+' Lingua ready');
