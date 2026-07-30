// =============================================
// LINGUA — Vocabulary (phoneme + dictionary)
// =============================================
// ---- Phoneme Editor ----
function buildPhEd(){
  const C=S.phoneme.consonants||[],V=S.phoneme.vowels||[];
  return `<div style="margin-bottom:16px"><div style="font-family:'Cinzel',serif;font-size:1.1rem;font-weight:700;margin-bottom:4px">${icon('music')} ${t('phonology')}</div><div style="font-size:.74rem;color:var(--txs)">${t('phonemeEditorDesc')} ${icon('speaker')}</div></div>
  <div class="tabbar"><button class="tabbtn active" onclick="swTab(this,'ptab-c')">${t('consonants')} (${C.length})</button><button class="tabbtn" onclick="swTab(this,'ptab-v')">${t('vowels')} (${V.length})</button><button class="tabbtn" onclick="swTab(this,'ptab-s')">${t('syllStructure')}</button></div>
  <div id="ptab-c" class="tabpn active">
    <div class="field-block"><label class="fl">${t('selectedTap')}</label><div id="c-chips">${C.map(p=>`<span class="pchip" onclick="playIPA('${p}')">${p} <span class="spk" role="button" aria-label="${t('speakAria')}">${icon('speaker')}</span><span class="x" role="button" aria-label="${t('deleteAria')}" onclick="event.stopPropagation();rmPh('c','${p}')">${icon('x')}</span></span>`).join('')||'<span style="color:var(--txm);font-size:.74rem">'+t('noneSelected')+'</span>'}</div></div>
    ${IPA_C.map(g=>`<div class="ipas"><div style="font-size:.6rem;font-weight:700;color:var(--txm);text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px">${g.g}</div><div class="ipag">${g.s.map(s=>`<button class="ipabtn ${C.includes(s)?'sel':''}" onclick="togPh('c','${s}',this)">${s}<span class="play-ico">${icon('play')}</span></button>`).join('')}</div></div>`).join('')}
  </div>
  <div id="ptab-v" class="tabpn">
    <div class="field-block"><label class="fl">${t('selectedTap')}</label><div id="v-chips">${V.map(p=>`<span class="pchip" onclick="playIPA('${p}')">${p} <span class="spk" role="button" aria-label="${t('speakAria')}">${icon('speaker')}</span><span class="x" role="button" aria-label="${t('deleteAria')}" onclick="event.stopPropagation();rmPh('v','${p}')">${icon('x')}</span></span>`).join('')||'<span style="color:var(--txm);font-size:.74rem">'+t('noneSelected')+'</span>'}</div></div>
    ${IPA_V.map(g=>`<div class="ipas"><div style="font-size:.6rem;font-weight:700;color:var(--txm);text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px">${g.g}</div><div class="ipag">${g.s.map(s=>`<button class="ipabtn ${V.includes(s)?'sel':''}" onclick="togPh('v','${s}',this)">${s}<span class="play-ico">${icon('play')}</span></button>`).join('')}</div></div>`).join('')}
  </div>
  <div id="ptab-s" class="tabpn">${buildSyllEd()}</div>`;}

function buildSyllEd(){const all=[...(S.phoneme.consonants||[]),...(S.phoneme.vowels||[])];if(!all.length)return '<div class="empty" style="padding:24px 0">'+t('addPhonemesFirst')+'</div>';return['onset','nucleus','coda'].map(pt=>{const lb={onset:t('syllOnset'),nucleus:t('syllNucleus'),coda:t('syllCoda')};const sel=S.syllable[pt]||[];return`<div style="margin-bottom:16px"><div class="fl" style="margin-bottom:8px">${lb[pt]}</div><div style="display:flex;flex-wrap:wrap;gap:4px">${all.map(p=>`<button style="padding:3px 9px;border:1px solid ${sel.includes(p)?'var(--acb)':'var(--br)'};border-radius:6px;background:${sel.includes(p)?'var(--acd)':'var(--sf2)'};font-family:monospace;font-size:.8rem;color:${sel.includes(p)?'var(--ac)':'var(--txs)'};cursor:pointer;-webkit-tap-highlight-color:transparent" onclick="togSyll('${pt}','${p}',this)">${p}</button>`).join('')}</div></div>`;}).join('');}

function togPh(typ,s,btn){playIPA(s);const a=typ==='c'?S.phoneme.consonants:S.phoneme.vowels;const i=a.indexOf(s);if(i>=0)a.splice(i,1);else a.push(s);btn.classList.toggle('sel',a.includes(s));const cid=typ==='c'?'c-chips':'v-chips';const ch=document.getElementById(cid);if(ch)ch.innerHTML=a.map(p=>`<span class="pchip" onclick="playIPA('${p}')">${p} <span class="spk" role="button" aria-label="${t('speakAria')}">${icon('speaker')}</span><span class="x" role="button" aria-label="${t('deleteAria')}" onclick="event.stopPropagation();rmPh('${typ}','${p}')">${icon('x')}</span></span>`).join('')||'<span style="color:var(--txm);font-size:.74rem">'+t('noneSelected')+'</span>';schSave();}
function rmPh(typ,s){const a=typ==='c'?S.phoneme.consonants:S.phoneme.vowels;const i=a.indexOf(s);if(i>=0)a.splice(i,1);const cid=typ==='c'?'c-chips':'v-chips';const ch=document.getElementById(cid);if(ch)ch.innerHTML=a.map(p=>`<span class="pchip" onclick="playIPA('${p}')">${p} <span class="spk" role="button" aria-label="${t('speakAria')}">${icon('speaker')}</span><span class="x" role="button" aria-label="${t('deleteAria')}" onclick="event.stopPropagation();rmPh('${typ}','${p}')">${icon('x')}</span></span>`).join('')||'<span style="color:var(--txm);font-size:.74rem">'+t('noneSelected')+'</span>';document.querySelectorAll('.ipabtn').forEach(b=>{if(b.textContent.trim()===s)b.classList.remove('sel');});schSave();}
function togSyll(pt,s,btn){const a=S.syllable[pt]||(S.syllable[pt]=[]);const i=a.indexOf(s);if(i>=0)a.splice(i,1);else a.push(s);btn.style.background=a.includes(s)?'var(--acd)':'var(--sf2)';btn.style.borderColor=a.includes(s)?'var(--acb)':'var(--br)';btn.style.color=a.includes(s)?'var(--ac)':'var(--txs)';schSave();}

// ---- Vocab Editor ----
function getPOS(){const L=_lang||'jp';const pos={jp:['名詞','動詞','形容詞','副詞','代名詞','助詞','接続詞','感動詞','前置詞','その他'],en:['Noun','Verb','Adjective','Adverb','Pronoun','Particle','Conjunction','Interjection','Preposition','Other'],zh:['名词','动词','形容词','副词','代词','助词','连词','感叹词','前置词','其他'],es:['Sustantivo','Verbo','Adjetivo','Adverbio','Pronombre','Partícula','Conjunción','Interjección','Preposición','Otro']};return pos[L]||pos.jp;}
function buildVcEd(){return`<div style="margin-bottom:16px"><div style="font-family:'Cinzel',serif;font-size:1.1rem;font-weight:700;margin-bottom:4px">${icon('book')} ${t('vocabulary')}</div><div style="font-size:.74rem;color:var(--txs)">${t('vocabPageDesc')}</div></div>
<div class="field-block"><label class="fl">${t('wordForm')}</label><input type="text" class="inp" id="vc-word" placeholder="例：aelindra" autocomplete="off" spellcheck="false"></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><div class="field-block"><label class="fl">${t('reading')}</label><input type="text" class="inp" id="vc-read" placeholder=""></div><div class="field-block"><label class="fl">${t('ipaRequired2')}</label><input type="text" class="inp" id="vc-ipa" placeholder="/ˈɛlɪndɾa/" spellcheck="false"></div></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><div class="field-block"><label class="fl">${t('posLabel')}</label><select class="inp" id="vc-pos">${getPOS().map(p=>`<option value="${p}">${p}</option>`).join('')}</select></div><div class="field-block"><label class="fl">${t('meaningLabel')}</label><input type="text" class="inp" id="vc-mean" placeholder="${t('meaningPh')}"></div></div>
<div class="field-block"><label class="fl">${t('memoNote')}</label><input type="text" class="inp" id="vc-note" placeholder=""></div>
<div class="field-block"><label class="fl">${t('tagsLabel')}</label><input type="text" class="inp" id="vc-tags" placeholder="nature spirit"></div>
<button class="btn btn-p btn-bl" onclick="addWord()">${t('addWord')}</button>
<div style="margin-top:18px;height:1px;background:var(--br)"></div>
<div style="margin-top:12px;font-size:.78rem;color:var(--txs)">${t('vocabCount')}: <strong style="color:var(--tx)">${S.dictionary.length}</strong> ${t('wordUnit')}</div>
<div id="vc-list" style="margin-top:8px">${S.dictionary.slice().reverse().slice(0,8).map((w,i)=>wCardHtml(w,S.dictionary.length-1-i)).join('')}</div>`;}

function wCardHtml(w,idx){return`<div class="wc"><div style="flex:1;min-width:0"><div class="wm">${esc(w.word||w.conlang||'')}</div>${w.reading?'<div style="font-size:.7rem;color:var(--ac2)">'+esc(w.reading)+'</div>':''}${w.ipa?'<div style="font-size:.68rem;color:var(--pur);font-family:monospace">'+esc(w.ipa)+'</div>':''}<div class="wmn">${esc(w.meaning||w.jp||'')}</div>${w.tags?.length?'<div style="margin-top:3px">'+w.tags.map(tag=>'<span class="ti">'+esc(tag)+'</span>').join('')+'</div>':''}</div><span class="wpos">${esc(w.pos||'?')}</span><button class="btn btn-gh btn-xs" style="color:var(--rs);border-color:var(--rsb)" onclick="delWord(${idx})" aria-label="${t('deleteAria')}">${icon('x')}</button></div>`;}

function switchVocabTab(tab,btn){
  document.querySelectorAll('#page-vocab .tabpn').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('#page-vocab .tabbtn').forEach(b=>b.classList.remove('active'));
  document.getElementById('vtab-'+tab).classList.add('active');
  if(btn)btn.classList.add('active');
  if(tab==='list')renderVocab();
  if(tab==='add')renderVcRecent();
}
function renderVcRecent(){
  const el=document.getElementById('vc-recent');if(!el)return;
  if(!S.dictionary.length){el.innerHTML='';return;}
  el.innerHTML='<div class="sh" style="margin-bottom:10px">'+t('recentVocab')+'</div>'+S.dictionary.slice().reverse().slice(0,5).map((w,i)=>wCardHtml(w,S.dictionary.length-1-i)).join('');
}
function addWord(){
  const wd=document.getElementById('vc-word')?.value.trim();
  const rd=document.getElementById('vc-read')?.value.trim();
  const ipa=document.getElementById('vc-ipa')?.value.trim();
  const mn=document.getElementById('vc-mean')?.value.trim();
  if(!wd||!mn){showToast(t('wordFormRequired'),'error');return;}
  if(!rd){showToast(t('readingRequired'),'error');return;}
  if(!ipa){showToast(t('ipaRequired'),'error');return;}
  const tags=(document.getElementById('vc-tags')?.value.trim()||'').split(/\s+/).filter(Boolean);
  S.dictionary.push({word:wd,conlang:wd,reading:rd,ipa:ipa,pos:document.getElementById('vc-pos')?.value||getPOS()[0],meaning:mn,jp:mn,notes:document.getElementById('vc-note')?.value.trim()||'',tags,addedAt:new Date().toISOString()});
  schSave();
  document.getElementById('vc-word').value='';
  document.getElementById('vc-mean').value='';
  document.getElementById('vc-read').value='';
  if(document.getElementById('vc-ipa'))document.getElementById('vc-ipa').value='';
  if(document.getElementById('vc-note'))document.getElementById('vc-note').value='';
  if(document.getElementById('vc-tags'))document.getElementById('vc-tags').value='';
  const vl=document.getElementById('vc-list');
  if(vl)vl.innerHTML=S.dictionary.slice().reverse().slice(0,8).map((w,i)=>wCardHtml(w,S.dictionary.length-1-i)).join('');
  renderVcRecent();
  const vc=document.getElementById('vtab-count');if(vc)vc.textContent=S.dictionary.length;
  showToast('"'+wd+'" '+t('wordAdded'),'success');
  updateDash();
}
function delWord(idx){S.dictionary.splice(idx,1);schSave();renderVocab();const vl=document.getElementById('vc-list');if(vl)vl.innerHTML=S.dictionary.slice().reverse().slice(0,8).map((w,i)=>wCardHtml(w,S.dictionary.length-1-i)).join('');updateDash();showToast(t('deleted'),'info');}
function setPF(pos,btn){_pf=pos;document.querySelectorAll('.pos-fbtn').forEach(b=>b.classList.remove('act'));if(btn)btn.classList.add('act');renderVocab();}
function renderVocab(){const le=document.getElementById('vocab-list'),fb=document.getElementById('pos-fb');if(!le)return;const q=(document.getElementById('vocab-srch')?.value||'').toLowerCase().trim();let ws=S.dictionary.slice();if(q)ws=ws.filter(w=>(w.word||'').toLowerCase().includes(q)||(w.meaning||'').toLowerCase().includes(q)||(w.tags||[]).some(tag=>tag.toLowerCase().includes(q)));if(_pf!=='all')ws=ws.filter(w=>w.pos===_pf);if(fb&&S.dictionary.length>0){const ps=[...new Set(S.dictionary.map(w=>w.pos))];fb.innerHTML=`<button class="pos-fbtn ${_pf==='all'?'act':''}" onclick="setPF('all',this)">${t('all')} (${S.dictionary.length})</button>`+ps.map(p=>`<button class="pos-fbtn ${_pf===p?'act':''}" onclick="setPF('${p}',this)">${p} (${S.dictionary.filter(w=>w.pos===p).length})</button>`).join('');}if(!ws.length){le.innerHTML=`<div class="empty"><div style="font-size:2rem;margin-bottom:10px;opacity:.4">${icon('book')}</div><div>${q?t('noResults'):S.dictionary.length===0?t('noWords'):t('noFilter')}</div>${!q&&!S.dictionary.length?'<button class="btn btn-p" style="margin-top:12px" onclick="openVocabEditor()">'+t('addFirstWord')+'</button>':''}</div>`;return;}le.innerHTML=ws.map(w=>wCardHtml(w,S.dictionary.indexOf(w))).join('');}
