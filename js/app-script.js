// =============================================
// LINGUA — Script (world scripts + char map + vibe)
// =============================================
// ---- World Scripts ----
const WORLD_SCRIPTS=[
  {id:'runic',name:{jp:'ルーン文字',en:'Runic',zh:'如尼文字',es:'Rúnico'},preview:'ᚠᚢᚦᚨᚱ',chars:'ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ ᛏ ᛒ ᛖ ᛗ ᛚ ᛜ ᛞ ᛟ'},
  {id:'geez',name:{jp:'ゲエズ文字',en:"Ge'ez",zh:'埃塞俄比亚文',es:"Ge'ez"},preview:'ሀለሐ',chars:'ሀ ሁ ሂ ሃ ሄ ህ ሆ ለ ሉ ሊ ላ ሌ ል ሎ ሐ ሑ ሒ ሓ ሔ ሕ ሖ መ ሙ ሚ ማ ሜ ም ሞ ሠ ሡ ሢ ሣ ሤ ሥ ሦ ረ ሩ ሪ ራ ሬ ር ሮ ሰ ሱ ሲ ሳ ሴ ስ ሶ'},
  {id:'cyrillic',name:{jp:'キリル文字',en:'Cyrillic',zh:'西里尔字母',es:'Cirílico'},preview:'АБВГД',chars:'А Б В Г Д Е Ж З И К Л М Н О П Р С Т У Ф Х Ц Ч Ш Щ Ъ Ы Ь Э Ю Я а б в г д е ж з и к л м н о п р с т у ф х ц ч ш щ'},
  {id:'greek',name:{jp:'ギリシャ文字',en:'Greek',zh:'希腊字母',es:'Griego'},preview:'ΑΒΓΔΕ',chars:'Α Β Γ Δ Ε Ζ Η Θ Ι Κ Λ Μ Ν Ξ Ο Π Ρ Σ Τ Υ Φ Χ Ψ Ω α β γ δ ε ζ η θ ι κ λ μ ν ξ ο π ρ σ τ υ φ χ ψ ω'},
  {id:'arabic',name:{jp:'アラビア文字',en:'Arabic',zh:'阿拉伯字母',es:'Árabe'},preview:'ابتث',chars:'ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي'},
  {id:'hebrew',name:{jp:'ヘブライ文字',en:'Hebrew',zh:'希伯来字母',es:'Hebreo'},preview:'אבגד',chars:'א ב ג ד ה ו ז ח ט י כ ל מ נ ס ע פ צ ק ר ש ת'},
  {id:'hangul',name:{jp:'ハングル',en:'Hangul',zh:'韩文字母',es:'Hangul'},preview:'ㄱㄴㄷ',chars:'ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅇ ㅈ ㅊ ㅋ ㅌ ㅍ ㅎ ㅏ ㅑ ㅓ ㅕ ㅗ ㅛ ㅜ ㅠ ㅡ ㅣ'},
  {id:'devanagari',name:{jp:'デーヴァナーガリー',en:'Devanagari',zh:'梵文字母',es:'Devanagari'},preview:'अआइ',chars:'अ आ इ ई उ ऊ ए ऐ ओ औ क ख ग घ च छ ज झ ट ठ ड ढ त थ द ध न प फ ब भ म य र ल व श ष स ह'},
  {id:'thai',name:{jp:'タイ文字',en:'Thai',zh:'泰文字母',es:'Tailandés'},preview:'กขค',chars:'ก ข ฃ ค ฅ ฆ ง จ ฉ ช ซ ฌ ญ ฎ ฏ ฐ ฑ ฒ ณ ด ต ถ ท ธ น บ ป ผ ฝ พ ฟ ภ ม ย ร ล ว ศ ษ ส ห ฬ อ ฮ'},
  {id:'georgian',name:{jp:'ジョージア文字',en:'Georgian',zh:'格鲁吉亚字母',es:'Georgiano'},preview:'აბგ',chars:'ა ბ გ დ ე ვ ზ თ ი კ ლ მ ნ ო პ ჟ რ ს ტ უ ფ ქ ღ ყ შ ჩ ც ძ წ ჭ ხ ჯ ჰ'},
  {id:'armenian',name:{jp:'アルメニア文字',en:'Armenian',zh:'亚美尼亚字母',es:'Armenio'},preview:'ԱԲԳ',chars:'Ա Բ Գ Դ Ե Զ Է Ը Թ Ժ Ի Լ Խ Ծ Կ Հ Ձ Ղ Ճ Մ Յ Ն Շ Ո Չ Պ Ջ Ռ Ս Վ Տ Ր Ց Ւ Փ Ք Օ Ֆ'},
  {id:'tibetan',name:{jp:'チベット文字',en:'Tibetan',zh:'藏文字母',es:'Tibetano'},preview:'ཀཁག',chars:'ཀ ཁ ག ང ཅ ཆ ཇ ཉ ཏ ཐ ད ན པ ཕ བ མ ཙ ཚ ཛ ཝ ཞ ཟ འ ཡ ར ལ ཤ ས ཧ ཨ'},
  {id:'ogham',name:{jp:'オガム文字',en:'Ogham',zh:'欧甘文字',es:'Ogham'},preview:'ᚁᚂᚃ',chars:'ᚁ ᚂ ᚃ ᚄ ᚅ ᚆ ᚇ ᚈ ᚉ ᚊ ᚋ ᚌ ᚍ ᚎ ᚏ ᚐ ᚑ ᚒ ᚓ ᚔ ᚕ ᚖ ᚗ ᚘ ᚙ ᚚ'},
  {id:'glagolitic',name:{jp:'グラゴール文字',en:'Glagolitic',zh:'格拉哥里字母',es:'Glagolítico'},preview:'ⰀⰁⰂ',chars:'Ⰰ Ⰱ Ⰲ Ⰳ Ⰴ Ⰵ Ⰶ Ⰷ Ⰸ Ⰹ Ⰺ Ⰻ Ⰼ Ⰽ Ⰾ Ⰿ Ⱀ Ⱁ Ⱂ Ⱃ Ⱄ Ⱅ Ⱆ Ⱇ Ⱈ Ⱉ Ⱊ Ⱋ Ⱌ Ⱍ Ⱎ Ⱏ Ⱐ Ⱑ Ⱒ Ⱓ Ⱔ Ⱕ Ⱖ'},
  {id:'phoenician',name:{jp:'フェニキア文字',en:'Phoenician',zh:'腓尼基字母',es:'Fenicio'},preview:'𐤀𐤁𐤂',chars:'𐤀 𐤁 𐤂 𐤃 𐤄 𐤅 𐤆 𐤇 𐤈 𐤉 𐤊 𐤋 𐤌 𐤍 𐤎 𐤏 𐤐 𐤑 𐤒 𐤓 𐤔 𐤕'},
];

// ---- Script Editor (Character Registration System) ----
function updateCharMapChar(i,val){updateCharMap(i,'char',val);refreshCmPreview(i);}
// Sanitize pasted SVG: strip script tags and on* attributes
function sanitizeSvg(raw){
  if(!raw)return'';
  let s=String(raw).trim();
  s=s.replace(/<script[\s\S]*?<\/script>/gi,'');
  s=s.replace(/\son\w+\s*=\s*"[^"]*"/gi,'');
  s=s.replace(/\son\w+\s*=\s*'[^']*'/gi,'');
  s=s.replace(/javascript:/gi,'');
  const m=s.match(/<svg[\s\S]*<\/svg>/i);
  return m?m[0]:'';
}
function cmPreviewHTML(e){
  if(e.svg)return `<span class="glyph-box">${e.svg}</span>`;
  return e.char?esc(e.char):'—';
}
function refreshCmPreview(i){
  const e=S.script.charMap&&S.script.charMap[i];if(!e)return;
  const pv=document.getElementById('cm-pv-'+i);
  if(pv)pv.innerHTML=cmPreviewHTML(e);
}
function buildScEd(){
  if(!S.script.charMap)S.script.charMap=[];
  const cm=S.script.charMap;
  const rows=cm.map((e,i)=>`<div class="cm-row" id="cm-row-${i}"><div class="cm-sound">${esc(e.sound||'?')}</div><input class="inp cm-char-inp" type="text" value="${esc(e.char||'')}" placeholder="${t('charInputPh')}" maxlength="8" oninput="updateCharMapChar(${i},this.value)"><div class="cm-preview" id="cm-pv-${i}">${cmPreviewHTML(e)}</div><div style="display:flex;gap:4px"><button class="btn btn-xs ${e.svg?'btn-pur':''}" onclick="openSvgEditor(${i})" aria-label="${t('svgRegister')}" title="${t('svgRegister')}">${icon('pen')}</button><button class="btn btn-xs btn-r" onclick="delCharMap(${i})" aria-label="${t('deleteAria')}">${icon('x')}</button></div></div>`).join('');
  const tab1=`<div class="field-block"><div style="display:flex;gap:8px;margin-bottom:12px"><button class="btn btn-sm btn-p" onclick="autoImportPhonemes()">${icon('download')} ${t('phonGenFromPh')}</button><button class="btn btn-sm" onclick="addCharMap()">${icon('plus')} ${t('addRow')}</button></div>${cm.length===0?`<div class="empty" style="padding:28px 0"><div style="font-size:2.5rem;opacity:.3;margin-bottom:10px">${icon('pen')}</div><div style="margin-bottom:4px">${t('emptyCharMap')}</div><div style="font-size:.72rem;color:var(--txm);margin-bottom:14px">${t('emptyCharMapHint')}</div><button class="btn btn-p" onclick="autoImportPhonemes()">${icon('download')} ${t('phonGenAuto')}</button></div>`:`<div class="cm-table"><div class="cm-header cm-header-wsvg"><span>${t('chSound')}</span><span>${t('chChar')}</span><span>${t('chPreview')}</span><span></span></div>${rows}</div><div style="font-size:.7rem;color:var(--txm);margin-top:10px">${t('svgHint')}</div>`}</div>`;
  const tab2=`<div class="field-block"><label class="fl">${t('romanInput')}</label><input class="inp" id="sc-conv-in" placeholder="aelindra vael korum" oninput="previewConvert()"></div><div class="field-block"><label class="fl">${t('convResultLabel')}</label><div id="sc-conv-out" class="conv-out">—</div></div><div style="font-size:.72rem;color:var(--txs);margin-top:8px">${t('charMapTipLine')}</div>`;
  const selId=S.script.worldScript||'';
  const tab3=`<div style="font-size:.74rem;color:var(--txs);margin-bottom:12px">${t('wsPickerHint')}</div><div class="ws-grid" id="ws-grid">${WORLD_SCRIPTS.map(ws=>`<div class="ws-card${selId===ws.id?' sel':''}" onclick="selectWorldScript('${ws.id}')"><div class="ws-name">${ws.name[_lang]||ws.name.jp}</div><div class="ws-preview">${ws.preview}</div></div>`).join('')}</div><div id="ws-chars-panel">${selId?renderCharPanel(selId):''}</div>`;
  return `<div style="margin-bottom:16px"><div style="font-family:'Cinzel',serif;font-size:1.1rem;font-weight:700;margin-bottom:4px">${icon('pen')} ${t('script')}</div><div style="font-size:.74rem;color:var(--txs)">${t('scriptDescLine')}</div></div><div class="tabbar"><button class="tabbtn active" onclick="swTab(this,'sc-cmap')">${icon('clipboard')} ${t('charMapping')}</button><button class="tabbtn" onclick="swTab(this,'sc-conv')">${icon('refresh')} ${t('textConvert')}</button><button class="tabbtn" onclick="swTab(this,'sc-world')">${icon('globe')} ${t('worldScriptsTab')}</button></div><div id="sc-cmap" class="tabpn active">${tab1}</div><div id="sc-conv" class="tabpn">${tab2}</div><div id="sc-world" class="tabpn">${tab3}</div>`;
}

function addCharMap(){if(!S.script.charMap)S.script.charMap=[];S.script.charMap.push({sound:'',char:'',svg:''});schSave();const bd=document.getElementById('ed-body');if(bd)bd.innerHTML=buildScEd();}
function delCharMap(i){if(!S.script.charMap)return;S.script.charMap.splice(i,1);schSave();const bd=document.getElementById('ed-body');if(bd)bd.innerHTML=buildScEd();}
function updateCharMap(i,field,val){if(!S.script.charMap||!S.script.charMap[i])return;S.script.charMap[i][field]=val;schSave();}
function autoImportPhonemes(){if(!S.script.charMap)S.script.charMap=[];const all=[].concat(S.phoneme.consonants||[]).concat(S.phoneme.vowels||[]);let added=0;all.forEach(p=>{if(!S.script.charMap.find(e=>e.sound===p)){S.script.charMap.push({sound:p,char:'',svg:''});added++;}});schSave();const bd=document.getElementById('ed-body');if(bd)bd.innerHTML=buildScEd();showToast(added>0?added+' '+t('phonemesImported'):t('allPhonemesImported'),'success');}
// Render conlang text with registered glyphs (SVG preferred, then char, then raw sound)
function renderGlyphs(text){
  if(!text)return'';
  const cm=(S.script.charMap||[]).slice().sort((a,b)=>(b.sound||'').length-(a.sound||'').length);
  const tokens=[];let i=0;
  while(i<text.length){
    let matched=false;
    for(const e of cm){
      if(e.sound&&text.startsWith(e.sound,i)){
        if(e.svg)tokens.push(`<span class="glyph">${e.svg}</span>`);
        else if(e.char)tokens.push(esc(e.char));
        else tokens.push(esc(e.sound));
        i+=e.sound.length;matched=true;break;
      }
    }
    if(!matched){tokens.push(esc(text[i]));i++;}
  }
  return tokens.join('');
}
function previewConvert(){const inp=document.getElementById('sc-conv-in'),out=document.getElementById('sc-conv-out');if(!inp||!out)return;out.innerHTML=renderGlyphs(inp.value)||'—';}

// ---- SVG / Glyph Editor Modal (draw + code) ----
let _svgEdIdx=-1;
// Drawing state
let _gStrokes=[];   // [{type:'line'|'free', pts:[{x,y}], _closed?}]
let _gMode='line';  // 'line' (grid-snap dot-to-dot) | 'free' (smoothed)
let _gGrid=6;       // segments per side; points = grid+1
let _gWidth=1.5;    // fixed thin stroke
let _gDrawing=false;
let _gPane='draw';
let _gHover=null;   // {x,y} snapped cursor position for live preview
let _gEllipseC1=null; // first corner for click-to-place circle/ellipse
const _gR=n=>Math.round(n*100)/100;
function glyphSnap(x,y){const s=24/_gGrid;return {x:Math.round(x/s)*s,y:Math.round(y/s)*s};}
function glyphEvToVB(ev){const svg=document.getElementById('glyph-canvas');if(!svg)return{x:0,y:0};const r=svg.getBoundingClientRect();let x=(ev.clientX-r.left)/r.width*24,y=(ev.clientY-r.top)/r.height*24;return {x:Math.max(0,Math.min(24,x)),y:Math.max(0,Math.min(24,y))};}
function glyphLineD(pts){if(!pts.length)return'';if(pts.length===1)return `M ${_gR(pts[0].x)} ${_gR(pts[0].y)} l 0 0`;return 'M '+pts.map(p=>`${_gR(p.x)} ${_gR(p.y)}`).join(' L ');}
function glyphFreeD(pts){
  if(!pts.length)return'';
  if(pts.length<3)return glyphLineD(pts);
  let d=`M ${_gR(pts[0].x)} ${_gR(pts[0].y)}`;
  for(let i=0;i<pts.length-1;i++){
    const p0=pts[i-1]||pts[i],p1=pts[i],p2=pts[i+1],p3=pts[i+2]||p2;
    const c1x=p1.x+(p2.x-p0.x)/6,c1y=p1.y+(p2.y-p0.y)/6;
    const c2x=p2.x-(p3.x-p1.x)/6,c2y=p2.y-(p3.y-p1.y)/6;
    d+=` C ${_gR(c1x)} ${_gR(c1y)} ${_gR(c2x)} ${_gR(c2y)} ${_gR(p2.x)} ${_gR(p2.y)}`;
  }
  return d;
}
function glyphPathD(st){return (st.type==='free'||st.type==='curve')?glyphFreeD(st.pts):glyphLineD(st.pts);}
// Bare element (inherits fill/stroke from wrapping <svg>)
function glyphElt(st){
  if(st.type==='ellipse'){
    if(!(st.rx>0.05||st.ry>0.05))return'';
    if(Math.abs(st.rx-st.ry)<0.01)return `<circle cx="${_gR(st.cx)}" cy="${_gR(st.cy)}" r="${_gR(st.rx)}"/>`;
    return `<ellipse cx="${_gR(st.cx)}" cy="${_gR(st.cy)}" rx="${_gR(st.rx)}" ry="${_gR(st.ry)}"/>`;
  }
  if(!st.pts||!st.pts.length)return'';
  return `<path d="${glyphPathD(st)}"/>`;
}
function glyphToSVG(){
  const els=_gStrokes.map(glyphElt).filter(Boolean).join('');
  if(!els)return'';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${_gWidth}" stroke-linecap="round" stroke-linejoin="round">${els}</svg>`;
}
function glyphSync(){
  if(_gPane!=='draw')return;
  const out=glyphToSVG();
  const ta=document.getElementById('svg-ed-ta');if(ta)ta.value=out;
  const pv=document.getElementById('svg-ed-pv');if(pv)pv.innerHTML=out||`<span style="color:var(--txm);font-size:.8rem">${t('glyphEmpty')}</span>`;
}
function glyphCurrentOpen(){const st=_gStrokes[_gStrokes.length-1];return (st&&(st.type==='line'||st.type==='curve')&&!st._closed)?st:null;}
function glyphRenderCanvas(){
  const svg=document.getElementById('glyph-canvas');if(!svg)return;
  const s=24/_gGrid;let dots='';
  for(let r=0;r<=_gGrid;r++)for(let c=0;c<=_gGrid;c++)dots+=`<circle cx="${_gR(c*s)}" cy="${_gR(r*s)}" r="0.42" fill="rgba(255,255,255,.16)"/>`;
  const els=_gStrokes.map(glyphElt).filter(Boolean).join('');
  let verts='',preview='';
  const ring=p=>`<circle cx="${_gR(p.x)}" cy="${_gR(p.y)}" r="0.95" fill="none" stroke="var(--ac)" stroke-width="0.3"/><circle cx="${_gR(p.x)}" cy="${_gR(p.y)}" r="0.4" fill="var(--ac)"/>`;
  if(_gMode==='line'||_gMode==='curve'){
    _gStrokes.forEach(st=>{if(st.pts)st.pts.forEach(p=>verts+=`<circle cx="${_gR(p.x)}" cy="${_gR(p.y)}" r="0.5" fill="var(--ac)"/>`);});
    if(_gHover){
      const open=glyphCurrentOpen();const last=open&&open.pts.length?open.pts[open.pts.length-1]:null;
      if(last)preview+=`<line x1="${_gR(last.x)}" y1="${_gR(last.y)}" x2="${_gR(_gHover.x)}" y2="${_gR(_gHover.y)}" stroke="var(--ac)" stroke-width="${_gWidth}" stroke-linecap="round" opacity="0.45" stroke-dasharray="0.8 0.8"/>`;
      preview+=ring(_gHover);
    }
  }else if(_gMode==='ellipse'){
    if(_gEllipseC1){
      preview+=ring(_gEllipseC1);
      if(_gHover){
        const c1=_gEllipseC1,p=_gHover,cx=(c1.x+p.x)/2,cy=(c1.y+p.y)/2,rx=Math.abs(p.x-c1.x)/2,ry=Math.abs(p.y-c1.y)/2;
        if(rx>0.05||ry>0.05)preview+=`<ellipse cx="${_gR(cx)}" cy="${_gR(cy)}" rx="${_gR(rx)}" ry="${_gR(ry)}" fill="none" stroke="var(--ac)" stroke-width="${_gWidth}" opacity="0.45" stroke-dasharray="0.8 0.8"/>`;
        preview+=`<rect x="${_gR(Math.min(c1.x,p.x))}" y="${_gR(Math.min(c1.y,p.y))}" width="${_gR(Math.abs(p.x-c1.x))}" height="${_gR(Math.abs(p.y-c1.y))}" fill="none" stroke="var(--ac)" stroke-width="0.18" opacity="0.4" stroke-dasharray="0.5 0.5"/>`;
      }
    }
    if(_gHover)preview+=ring(_gHover);
  }
  svg.innerHTML=dots+`<g fill="none" stroke="var(--ac)" stroke-width="${_gWidth}" stroke-linecap="round" stroke-linejoin="round">${els}</g>`+preview+verts;
  glyphSync();
}
function glyphDown(ev){
  ev.preventDefault();
  const vb=glyphEvToVB(ev);
  if(_gMode==='line'||_gMode==='curve'){
    let cur=_gStrokes[_gStrokes.length-1];
    if(!cur||cur.type!==_gMode||cur._closed){cur={type:_gMode,pts:[]};_gStrokes.push(cur);}
    const p=glyphSnap(vb.x,vb.y),last=cur.pts[cur.pts.length-1];
    if(!last||last.x!==p.x||last.y!==p.y)cur.pts.push(p);
    glyphRenderCanvas();
  }else if(_gMode==='ellipse'){
    const p=glyphSnap(vb.x,vb.y);
    if(!_gEllipseC1){_gEllipseC1=p;}
    else{
      const c1=_gEllipseC1;
      const st={type:'ellipse',cx:(c1.x+p.x)/2,cy:(c1.y+p.y)/2,rx:Math.abs(p.x-c1.x)/2,ry:Math.abs(p.y-c1.y)/2};
      if(st.rx>0.05||st.ry>0.05)_gStrokes.push(st);
      _gEllipseC1=null;
    }
    glyphRenderCanvas();
  }else{
    _gDrawing=true;_gStrokes.push({type:'free',pts:[vb]});
    try{ev.target.setPointerCapture&&ev.target.setPointerCapture(ev.pointerId);}catch(e){}
    glyphRenderCanvas();
  }
}
function glyphMove(ev){
  const vb=glyphEvToVB(ev);
  if(!_gDrawing){
    if(_gMode!=='free'){ // line, curve, ellipse all snap-preview on hover
      const p=glyphSnap(vb.x,vb.y);
      if(!_gHover||_gHover.x!==p.x||_gHover.y!==p.y){_gHover=p;glyphRenderCanvas();}
    }
    return;
  }
  // free mode is the only drag mode
  if(_gMode==='free'){
    const st=_gStrokes[_gStrokes.length-1];if(!st)return;
    const last=st.pts[st.pts.length-1],dx=vb.x-last.x,dy=vb.y-last.y;
    if(dx*dx+dy*dy>=0.36){st.pts.push(vb);glyphRenderCanvas();}
  }
}
function glyphLeave(){_gHover=null;if(_gDrawing)glyphUp();else glyphRenderCanvas();}
function glyphUp(){
  if(!_gDrawing)return;_gDrawing=false;
  const st=_gStrokes[_gStrokes.length-1];
  if(st&&st.type==='ellipse'&&st.rx<0.1&&st.ry<0.1)_gStrokes.pop();
  glyphRenderCanvas();
}
function glyphNewStroke(){const cur=_gStrokes[_gStrokes.length-1];if(cur&&(cur.type==='line'||cur.type==='curve'))cur._closed=true;_gHover=null;glyphRenderCanvas();}
function glyphUndo(){
  if(_gMode==='ellipse'&&_gEllipseC1){_gEllipseC1=null;glyphRenderCanvas();return;}
  if(!_gStrokes.length)return;
  const st=_gStrokes[_gStrokes.length-1];
  if(st.type==='ellipse'||st.type==='free'){_gStrokes.pop();}
  else{if(st.pts.length)st.pts.pop();if(!st.pts.length)_gStrokes.pop();}
  glyphRenderCanvas();
}
function glyphClear(){_gStrokes=[];_gEllipseC1=null;glyphRenderCanvas();}
function glyphSetMode(mode){
  _gMode=mode;_gEllipseC1=null;_gHover=null;
  ['line','curve','ellipse','free'].forEach(m=>document.getElementById('gm-'+m)?.classList.toggle('active',m===mode));
  const h=document.getElementById('glyph-hint');
  if(h)h.textContent=mode==='free'?t('glyphHintFree'):mode==='ellipse'?t('glyphHintEllipse'):mode==='curve'?t('glyphHintCurve'):t('glyphHintLine');
  glyphRenderCanvas();
}
function glyphSetGrid(v){_gGrid=parseInt(v)||6;glyphRenderCanvas();}
function svgEdSetPane(p){
  _gPane=p;
  const dp=document.getElementById('svg-draw-pane'),cp=document.getElementById('svg-code-pane');
  if(dp)dp.style.display=p==='draw'?'block':'none';
  if(cp)cp.style.display=p==='code'?'block':'none';
  document.querySelectorAll('#svg-ed-modal .seg-btn').forEach(b=>b.classList.toggle('active',b.dataset.pane===p));
  if(p==='draw')glyphRenderCanvas();else renderSvgPreview();
}
function openSvgEditor(i){
  _svgEdIdx=i;
  const e=S.script.charMap[i]||{};
  const modal=document.getElementById('svg-ed-modal')||createSvgEdModal();
  document.getElementById('svg-ed-sound').textContent=e.sound||'?';
  document.getElementById('svg-ed-ta').value=e.svg||'';
  _gStrokes=[];_gDrawing=false;_gMode='line';_gWidth=1.5;_gHover=null;_gEllipseC1=null;
  glyphSetMode('line');
  svgEdSetPane(e.svg?'code':'draw');
  modal.classList.add('open');
}
function closeSvgEditor(){const m=document.getElementById('svg-ed-modal');if(m)m.classList.remove('open');_svgEdIdx=-1;_gDrawing=false;}
function renderSvgPreview(){
  const ta=document.getElementById('svg-ed-ta'),pv=document.getElementById('svg-ed-pv');
  if(!ta||!pv)return;
  const clean=sanitizeSvg(ta.value);
  pv.innerHTML=clean||`<span style="color:var(--txm);font-size:.8rem">${t('svgPreviewEmpty')}</span>`;
}
function saveSvgEditor(){
  if(_svgEdIdx<0)return;
  const ta=document.getElementById('svg-ed-ta');if(!ta)return;
  const clean=sanitizeSvg(ta.value);
  updateCharMap(_svgEdIdx,'svg',clean);
  const bd=document.getElementById('ed-body');if(bd)bd.innerHTML=buildScEd();
  closeSvgEditor();
  showToast(clean?t('svgSaved'):t('svgCleared'),'success');
}
function clearSvgEditor(){const ta=document.getElementById('svg-ed-ta');if(ta)ta.value='';_gStrokes=[];if(_gPane==='draw')glyphRenderCanvas();else renderSvgPreview();}
async function uploadSvgFile(inp){
  const f=inp.files?.[0];if(!f)return;
  if(!/\.svg$/i.test(f.name)&&!/svg/i.test(f.type)){showToast(t('svgInvalidFile'),'error');return;}
  if(f.size>200*1024){showToast(t('svgTooLarge'),'error');return;}
  const text=await f.text();
  svgEdSetPane('code');
  const ta=document.getElementById('svg-ed-ta');if(ta){ta.value=text;renderSvgPreview();}
  inp.value='';
}
function createSvgEdModal(){
  const m=document.createElement('div');
  m.id='svg-ed-modal';m.className='modal-bg';
  m.onclick=e=>{if(e.target===m)closeSvgEditor();};
  m.innerHTML=`<div class="msheet" style="max-width:600px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      <div style="font-family:'Cinzel',serif;font-size:1.05rem;font-weight:700">${icon('pen')} <span data-i18n="svgRegister">${t('svgRegister')}</span> — <span id="svg-ed-sound" style="color:var(--ac);font-family:monospace"></span></div>
      <button class="btn btn-gh btn-xs" onclick="closeSvgEditor()" aria-label="${t('closeAria')}">${icon('x')}</button>
    </div>
    <div class="seg" style="margin-bottom:14px">
      <button class="seg-btn active" data-pane="draw" onclick="svgEdSetPane('draw')">${icon('pen')} ${t('glyphDraw')}</button>
      <button class="seg-btn" data-pane="code" onclick="svgEdSetPane('code')">${icon('clipboard')} ${t('glyphCode')}</button>
    </div>
    <div id="svg-draw-pane">
      <div class="glyph-tools">
        <div class="glyph-tool-group">
          <button class="gt-btn active" id="gm-line" onclick="glyphSetMode('line')">${t('glyphLine')}</button>
          <button class="gt-btn" id="gm-curve" onclick="glyphSetMode('curve')">${t('glyphCurve')}</button>
          <button class="gt-btn" id="gm-ellipse" onclick="glyphSetMode('ellipse')">${t('glyphEllipse')}</button>
          <button class="gt-btn" id="gm-free" onclick="glyphSetMode('free')">${t('glyphFree')}</button>
        </div>
        <label class="glyph-tool-lbl">${t('glyphGrid')}
          <select class="inp" style="width:auto;padding:5px 8px" onchange="glyphSetGrid(this.value)">
            <option value="4">5×5</option><option value="6" selected>7×7</option><option value="8">9×9</option>
          </select>
        </label>
      </div>
      <div class="glyph-canvas-wrap">
        <svg id="glyph-canvas" viewBox="0 0 24 24" onpointerdown="glyphDown(event)" onpointermove="glyphMove(event)" onpointerup="glyphUp(event)" onpointerleave="glyphLeave(event)" ondblclick="glyphNewStroke()"></svg>
      </div>
      <div style="display:flex;gap:8px;margin:12px 0 8px">
        <button class="btn btn-sm" onclick="glyphNewStroke()">${icon('plus')} ${t('glyphNewStroke')}</button>
        <button class="btn btn-sm btn-gh" onclick="glyphUndo()">${icon('arrL')} ${t('glyphUndo')}</button>
        <button class="btn btn-sm btn-r" onclick="glyphClear()">${icon('x')} ${t('glyphClearAll')}</button>
      </div>
      <div id="glyph-hint" style="font-size:.7rem;color:var(--txm)">${t('glyphHintLine')}</div>
    </div>
    <div id="svg-code-pane" style="display:none">
      <div style="font-size:.72rem;color:var(--txs);margin-bottom:10px">${t('svgEditorDesc')}</div>
      <div style="display:flex;gap:8px;margin-bottom:10px">
        <label class="btn btn-sm" style="margin:0">${icon('upload')} <span data-i18n="svgUpload">${t('svgUpload')}</span><input type="file" accept=".svg,image/svg+xml" style="display:none" onchange="uploadSvgFile(this)"></label>
        <button class="btn btn-sm btn-gh" onclick="clearSvgEditor()">${icon('x')} ${t('clear')}</button>
      </div>
      <textarea id="svg-ed-ta" class="inp inp-ta" style="font-family:monospace;font-size:.74rem;min-height:120px;line-height:1.5" placeholder="&lt;svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'&gt;...&lt;/svg&gt;" oninput="renderSvgPreview()"></textarea>
    </div>
    <div style="margin-top:14px">
      <div class="fl" style="margin-bottom:6px">${t('preview')}</div>
      <div id="svg-ed-pv" class="glyph-preview">—</div>
    </div>
    <div style="display:flex;gap:8px;margin-top:16px">
      <button class="btn btn-gh btn-bl" onclick="closeSvgEditor()" data-i18n="cancel">${t('cancel')}</button>
      <button class="btn btn-p btn-bl" onclick="saveSvgEditor()" data-i18n="save">${t('save')}</button>
    </div>
  </div>`;
  document.body.appendChild(m);
  return m;
}
function selectWorldScript(id){S.script.worldScript=id;schSave();var p=document.getElementById('ws-chars-panel');if(p)p.innerHTML=renderCharPanel(id);document.querySelectorAll('.ws-card').forEach(function(c){c.classList.toggle('sel',c.getAttribute('onclick').includes(id));});}
function renderCharPanel(id){const ws=WORLD_SCRIPTS.find(w=>w.id===id);if(!ws)return'';const chars=ws.chars.split(' ').filter(Boolean);return `<div style="margin-top:12px"><div style="font-size:.72rem;font-weight:700;color:var(--pur);margin-bottom:8px">${ws.name[_lang]||ws.name.jp} — ${t('wsTapToAdd')}</div><div class="char-grid">${chars.map(c=>`<button class="char-btn" onclick="insertCharToMap('${c}')">${c}</button>`).join('')}</div></div>`;}
function insertCharToMap(c){const bd=document.getElementById('ed-body');const activeInp=bd?bd.querySelector('.cm-char-inp:focus'):null;if(activeInp){activeInp.value+=c;const rows=bd.querySelectorAll('.cm-row');const i=Array.from(rows).findIndex(r=>r.querySelector('.cm-char-inp')===activeInp);if(i>=0)updateCharMap(i,'char',activeInp.value);}try{navigator.clipboard.writeText(c).then(()=>showToast('"'+c+'"'+t('copied'),'success'));}catch(e){showToast('"'+c+'"'+t('copied'),'success');}}


// ---- Vibe Editor ----
// Genre/mood values are stored as the JP string (key); display is localized.
const VIBE_GENRES=[
  {jp:'ファンタジー',en:'Fantasy',zh:'奇幻',es:'Fantasía'},
  {jp:'SF',en:'Sci-Fi',zh:'科幻',es:'CF'},
  {jp:'和風',en:'Japanese',zh:'和风',es:'Japonés'},
  {jp:'アジア',en:'Asian',zh:'亚洲',es:'Asiático'},
  {jp:'中世欧州',en:'Medieval',zh:'中世纪欧洲',es:'Medieval'},
  {jp:'古代',en:'Ancient',zh:'古代',es:'Antiguo'},
  {jp:'未来',en:'Future',zh:'未来',es:'Futuro'},
  {jp:'宇宙',en:'Space',zh:'宇宙',es:'Espacio'},
  {jp:'精霊/自然',en:'Spirit/Nature',zh:'精灵/自然',es:'Espíritu/Naturaleza'},
  {jp:'その他',en:'Other',zh:'其他',es:'Otro'},
];
const VIBE_MOODS=[
  {jp:'神秘的',en:'Mystical',zh:'神秘',es:'Místico'},
  {jp:'力強い',en:'Powerful',zh:'强劲',es:'Poderoso'},
  {jp:'優美',en:'Elegant',zh:'优雅',es:'Elegante'},
  {jp:'古風',en:'Archaic',zh:'古风',es:'Arcaico'},
  {jp:'機械的',en:'Mechanical',zh:'机械',es:'Mecánico'},
  {jp:'柔らかい',en:'Soft',zh:'柔和',es:'Suave'},
  {jp:'鋭い',en:'Sharp',zh:'锐利',es:'Agudo'},
  {jp:'荘厳',en:'Majestic',zh:'庄严',es:'Majestuoso'},
];
function buildVbEd(){
  const v=S.vibe||{};
  const L=_lang||'jp';
  const pill=(arr,key)=>arr.map(o=>`<button class="btn btn-sm ${v[key]===o.jp?'btn-p':''}" onclick="setVB('${key}','${o.jp}',this)">${o[L]||o.jp}</button>`).join('');
  return`<div style="margin-bottom:16px"><div style="font-family:'Cinzel',serif;font-size:1.1rem;font-weight:700;margin-bottom:4px">${icon('galaxy')} ${t('vibe')}</div><div style="font-size:.74rem;color:var(--txs)">${t('vibeDesc')}</div></div>
<div class="field-block"><label class="fl">${t('genre')}</label><div style="display:flex;flex-wrap:wrap;gap:6px">${pill(VIBE_GENRES,'genre')}</div></div>
<div class="field-block"><label class="fl">${t('mood')}</label><div style="display:flex;flex-wrap:wrap;gap:6px">${pill(VIBE_MOODS,'mood')}</div></div>
<div class="field-block"><label class="fl">${t('region')}</label><input type="text" class="inp" id="vb-reg" placeholder="" oninput="S.vibe.region=this.value;schSave()" value="${v.region||''}"></div>
<div class="field-block"><label class="fl">${t('vibeNotes')}</label><textarea class="inp inp-ta" placeholder="" oninput="S.vibe.notes=this.value;schSave()">${v.notes||''}</textarea></div>`;
}
function setVB(k,v,btn){if(!S.vibe)S.vibe={};S.vibe[k]=v;btn.closest('.field-block').querySelectorAll('.btn').forEach(b=>b.classList.remove('btn-p'));btn.classList.add('btn-p');schSave();}
