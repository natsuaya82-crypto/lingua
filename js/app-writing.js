// =============================================
// LINGUA — Writing System (draw letters -> on-device OpenType font -> font-family swap)
// Ported/adapted from WRITINGSYSTEM.md brief. Font writer: js/otf5.js (global LinguaFont).
// Stored text stays ASCII roman; the toggle is a font-family swap and nothing else.
// =============================================

/* The pen. Fixed, everywhere, forever. */
var GPEN={width:60, angleDeg:0, contrast:1.0};

/* An undrawn letter gets its corners marked (drawn by the same pen), so it
   reads as "this square is waiting" rather than falling back to a system font. */
var GPLACE=[
  {pts:[[130,250],[130,130],[250,130]]},
  {pts:[[550,130],[670,130],[670,250]]},
  {pts:[[670,550],[670,670],[550,670]]},
  {pts:[[250,670],[130,670],[130,550]]}
];

/* Live accessor into S.script (S.script may be replaced on load, so never cache it). */
function SCR(){ if(!S.script)S.script={}; if(!S.script.g)S.script.g={}; if(!S.script.extra)S.script.extra=[]; return S.script; }

/* The alphabet the language uses: single roman letters found in word forms. */
function analyze(){
  var used={}, out=[];
  (S.dictionary||[]).forEach(function(w){
    var s=(w.word||w.conlang||'').toLowerCase(), m=s.match(/[a-z]+/g)||[];
    m.forEach(function(seg){ for(var i=0;i<seg.length;i++){ var c=seg[i]; if(!used[c]){ used[c]=1; out.push(c); } } });
  });
  return {used:out, vowels:[]};
}

/* 'sh' cannot be a codepoint, so it becomes s_h and is reached by a ligature. */
function glyphKey(r){ return r.length>1 ? r.split('').join('_') : r; }

/* Every sound your words use + hand-added + already drawn. Grows with the dictionary. */
function scriptLetters(){
  var A=analyze(), seen={}, out=[];
  function push(c){ if(c && /^[a-z]{1,3}$/.test(c) && !seen[c]){ seen[c]=1; out.push(c); } }
  A.used.forEach(push);
  (A.vowels||[]).forEach(push);
  SCR().extra.forEach(push);
  Object.keys(SCR().g).forEach(push);
  out.sort();
  return out;
}
function scriptDrawn(L){
  var n=0, g=SCR().g;
  L.forEach(function(r){ if(g[r] && g[r].length) n++; });
  return n;
}

/* One glyph per letter, plus the single letters a digraph is spelled with.
   Upper and lower case map to the same drawing. */
function scriptGlyphDefs(){
  var L=scriptLetters(), have={}, defs=[], ligs=[], need=[], g=SCR().g;
  L.forEach(function(r){ have[r]=1; });
  L.forEach(function(r){
    if(r.length>1) r.split('').forEach(function(c){ if(!have[c]){ have[c]=1; need.push(c); } });
  });
  L.concat(need).sort().forEach(function(r){
    var st=g[r];
    defs.push({
      name: glyphKey(r),
      roman: r.length===1 ? r+r.toUpperCase() : null,
      strokes: (st && st.length) ? st : GPLACE
    });
    if(r.length>1) ligs.push({sub:r.split(''), by:glyphKey(r)});
  });
  return {defs:defs, ligs:ligs};
}

/* Build the font and hand it to the browser as a @font-face. On-device, ~1ms, no network. */
var SFONT={built:false, sig:null};
function scriptSig(){
  var L=scriptLetters(), s=[], g=SCR().g;
  L.forEach(function(r){ var x=g[r]; s.push(r+':'+(x? JSON.stringify(x).length : 0)); });
  return s.join(',');
}
function installScriptFont(){
  var el=document.getElementById('sfontcss');
  if(el) el.parentNode.removeChild(el);
  SFONT.built=false;
  SFONT.sig=scriptSig();
  var L=scriptLetters();
  if(!L.length || !scriptDrawn(L) || typeof LinguaFont==='undefined') return;
  try{
    var d=scriptGlyphDefs();
    var f=LinguaFont.build(d.defs, {mode:'center', pen:GPEN, ligatures:d.ligs,
                                    family:'LinguaScript', style:'Regular'});
    el=document.createElement('style');
    el.id='sfontcss';
    el.appendChild(document.createTextNode(
      "@font-face{font-family:'LinguaScript';src:url("+f.dataUrl()+") format('opentype');}"));
    document.head.appendChild(el);
    SFONT.built=true;
  }catch(e){ SFONT.built=false; }
}
function scriptEnabled(){ return !!(S.script && S.script.useFont); }
function scriptOn(){ return scriptEnabled() && SFONT.built; }
function applyScriptAttr(){ document.documentElement.setAttribute('data-script', scriptOn()?'on':'off'); }
function updateScriptToggles(){
  var drawn=scriptDrawn(scriptLetters()), on=scriptOn();
  var btns=document.querySelectorAll('.glyph-toggle');
  for(var i=0;i<btns.length;i++){
    btns[i].style.display = drawn? '' : 'none';
    btns[i].classList.toggle('act', on);
    btns[i].setAttribute('aria-pressed', on?'true':'false');
  }
}
function setScript(v){
  if(v && !SFONT.built) installScriptFont();
  if(!S.script) S.script={};
  S.script.useFont = !!v;
  if(typeof saveState==='function') saveState();
  applyScriptAttr(); updateScriptToggles();
  if(_wView==='grid' && document.getElementById('ed-body') && document.querySelector('.eo.open')) wRender();
}
/* Rebuild the font when the alphabet has grown past what it was built with, then
   sync the html attribute and toggle chrome. Cheap enough to call on every UI update. */
function scriptTick(){
  if(SFONT.sig!==null && SFONT.sig!==scriptSig()) installScriptFont();
  applyScriptAttr(); updateScriptToggles();
}
function initScript(){ installScriptFont(); applyScriptAttr(); updateScriptToggles(); }

/* ---- the letter grid (overlay body) ------------------------------------- */
var _wView='grid';
function wGridHTML(){
  _wView='grid';
  var L=scriptLetters(), drawn=scriptDrawn(L), g=SCR().g;
  var sample=(S.dictionary&&S.dictionary.length)? (S.dictionary[0].word||S.dictionary[0].conlang||'') : (S.langName||L.slice(0,5).join(''));
  var line=(S.corpus&&S.corpus.length)? (S.corpus[S.corpus.length-1].cl||S.corpus[S.corpus.length-1].conlang||'')
          : (S.dictionary||[]).slice(0,4).map(function(w){return w.word||w.conlang||'';}).join(' ');
  var h='<div style="font-family:\'Cinzel\',serif;font-size:1.1rem;font-weight:700;margin-bottom:4px">'+icon('pen')+' '+t('script')+'</div>';
  h+='<div class="note" style="margin-bottom:12px">'+t('script.note')+'</div>';
  if(drawn){
    h+='<div class="sh">'+t('script.preview')+'</div>';
    h+='<div class="spv"><div class="big sfont">'+esc(sample)+'</div>'+(line?'<div class="sm sfont">'+esc(line)+'</div>':'')+'<div class="rom">'+esc(sample)+'</div></div>';
    h+='<div class="sh" style="margin-top:16px">'+t('script.show')+'</div>';
    h+='<div class="gtools" style="margin-bottom:4px"><button class="'+(scriptOn()?'':'on')+'" onclick="setScript(false)">'+t('script.show.roman')+'</button><button class="'+(scriptOn()?'on':'')+'" onclick="setScript(true)">'+t('script.show.own')+'</button></div>';
    h+='<div class="note">'+t('script.show.note')+'</div>';
  }else{
    h+='<div class="note">'+t('script.needs')+'</div>';
  }
  h+='<div class="sh" style="margin-top:16px">'+t('script.letters')+'</div>';
  if(L.length){
    h+='<div class="gtiles">'+L.map(function(r){
      var has=g[r]&&g[r].length;
      return '<button class="gtile'+(has?'':' empty')+'" onclick="editGlyph(\''+esc(r)+'\')">'+(has?'<canvas class="tc" data-r="'+esc(r)+'"></canvas>':'<span>'+esc(r)+'</span>')+'<span class="rl">'+esc(r)+'</span></button>';
    }).join('')+'<button class="gtile add" onclick="addLetter()">+</button></div>';
  }else{
    h+='<div class="empty"><div style="font-weight:600;color:var(--tx)">'+t('script.empty.t')+'</div><div style="font-size:.74rem;color:var(--txs);margin-top:4px">'+t('script.empty.s')+'</div></div>';
    h+='<button class="btn btn-p" style="margin-top:10px" onclick="addLetter()">'+icon('plus')+' '+t('script.add')+'</button>';
  }
  return h;
}
function addLetter(){
  var v=prompt(t('script.add.prompt'),'');
  if(v===null) return;
  v=String(v).toLowerCase().replace(/[^a-z]/g,'');
  if(!v || v.length>3){ showToast(t('script.add.bad'),'error'); return; }
  if(SCR().extra.indexOf(v)<0) SCR().extra.push(v);
  if(typeof saveState==='function') saveState();
  editGlyph(v);
}

/* ---- the editor --------------------------------------------------------- */
var GE=null;
function newGE(r){
  var src=SCR().g[r]||[];
  return { r:r, st:JSON.parse(JSON.stringify(src)), si:src.length?src.length-1:-1, pi:-1, undo:[], drag:false };
}
function editGlyph(r){ GE=newGE(r); _wView='glyph'; wRender(); }
function geMark(){ if(!GE) return; GE.undo.push(JSON.stringify(GE.st)); if(GE.undo.length>60) GE.undo.shift(); }
function wGlyphHTML(){
  _wView='glyph';
  if(!GE) GE=newGE('a');
  var st=GE.st[GE.si], p=(st && GE.pi>=0)? st.pts[GE.pi] : null, pts=0;
  GE.st.forEach(function(s){ pts+=s.pts.length; });
  var h='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">'+
    '<button class="btn btn-gh btn-sm" onclick="wBackGrid()">'+icon('arrL')+' '+t('script')+'</button>'+
    '<div style="font-family:\'Cinzel\',serif;font-weight:700;font-size:1.1rem">'+esc(GE.r)+' <span class="cn" style="color:var(--txm);font-weight:400;font-size:.8rem">'+pts+'</span></div></div>';
  h+='<div class="gcanvwrap"><canvas id="gcanv" class="gcanv"></canvas></div>';
  h+='<div class="gtools">'+
    '<button onclick="geCurve()"'+(p?'':' disabled')+' class="'+(p&&p[2]==='c'?'on':'')+'">'+t('glyph.curve')+'</button>'+
    '<button onclick="geClose()"'+(st&&st.pts.length>2?'':' disabled')+' class="'+(st&&st.closed?'on':'')+'">'+t('glyph.close')+'</button>'+
    '<button onclick="geNew()"'+(st&&st.pts.length?'':' disabled')+'>'+t('glyph.new')+'</button>'+
    '<button onclick="geDel()"'+(p?'':' disabled')+'>'+t('glyph.del')+'</button>'+
    '<button onclick="geUndo()"'+(GE.undo.length?'':' disabled')+'>'+t('glyph.undo')+'</button>'+
    '<button onclick="geClear()"'+(pts?'':' disabled')+'>'+t('glyph.clear')+'</button></div>';
  h+='<div class="note" style="margin-top:14px">'+t('glyph.hint')+'</div>';
  h+='<div style="display:flex;gap:8px;margin-top:18px"><button class="btn btn-gh btn-bl" onclick="wBackGrid()">'+t('glyph.cancel')+'</button><button class="btn btn-p btn-bl" onclick="geSave()">'+t('glyph.save')+'</button></div>';
  return h;
}
function wRender(){ var bd=document.getElementById('ed-body'); if(!bd) return; bd.innerHTML=_wView==='glyph'?wGlyphHTML():wGridHTML(); requestAnimationFrame(wMount); }
function wMount(){ if(_wView==='glyph') geMount(); else geTiles(); }
function wBackGrid(){ _wView='grid'; GE=null; wRender(); }
function geCur(){ if(GE.si<0 || !GE.st[GE.si]){ GE.st.push({pts:[]}); GE.si=GE.st.length-1; } return GE.st[GE.si]; }
function geCurve(){ var st=GE.st[GE.si]; if(!st||GE.pi<0) return; geMark(); var p=st.pts[GE.pi]; if(p[2]==='c') p.length=2; else p[2]='c'; wRender(); }
function geClose(){ var st=GE.st[GE.si]; if(!st||st.pts.length<3) return; geMark(); st.closed=!st.closed; wRender(); }
function geNew(){ var st=GE.st[GE.si]; if(!st||!st.pts.length) return; geMark(); GE.st.push({pts:[]}); GE.si=GE.st.length-1; GE.pi=-1; wRender(); }
function geDel(){ var st=GE.st[GE.si]; if(!st||GE.pi<0) return; geMark(); st.pts.splice(GE.pi,1); if(!st.pts.length){ GE.st.splice(GE.si,1); GE.si=GE.st.length-1; } GE.pi=-1; wRender(); }
function geUndo(){ if(!GE.undo.length) return; GE.st=JSON.parse(GE.undo.pop()); GE.si=GE.st.length-1; GE.pi=-1; wRender(); }
function geClear(){ geMark(); GE.st=[]; GE.si=-1; GE.pi=-1; wRender(); }
function geSave(){
  var keep=GE.st.filter(function(s){ return s.pts.length>0; }), g=SCR().g;
  if(keep.length) g[GE.r]=keep; else delete g[GE.r];
  var i=SCR().extra.indexOf(GE.r);
  if(i>=0 && keep.length) SCR().extra.splice(i,1);
  if(typeof saveState==='function') saveState();
  installScriptFont();
  var r=GE.r; GE=null; _wView='grid'; wRender();
  applyScriptAttr(); updateScriptToggles();
  showToast(t('glyph.saved').replace('{0}', r),'success');
}

/* ---- canvas ------------------------------------------------------------- */
function cssVar(n){ return (getComputedStyle(document.documentElement).getPropertyValue(n)||'').trim()||'#888'; }
function geMount(){
  var c=document.getElementById('gcanv');
  if(!c||!GE) return;
  var dpr=window.devicePixelRatio||1, box=c.getBoundingClientRect();
  var s=Math.round((box.width||300)*dpr);
  c.width=s; c.height=s;
  c.onpointerdown=geDown; c.onpointermove=geMove; c.onpointerup=geUp; c.onpointercancel=geUp;
  geDraw();
}
function geAt(c,ev){
  var b=c.getBoundingClientRect();
  var x=(ev.clientX-b.left)/(b.width||1)*800, y=(ev.clientY-b.top)/(b.height||1)*800;
  return [Math.max(0,Math.min(800,x)), Math.max(0,Math.min(800,y))];
}
function geDown(ev){
  var c=ev.currentTarget, p=geAt(c,ev), b=c.getBoundingClientRect(), grab=26/(b.width||1)*800;
  var best=null, bd=grab;
  GE.st.forEach(function(s,si){ s.pts.forEach(function(q,qi){ var d=Math.sqrt((q[0]-p[0])*(q[0]-p[0])+(q[1]-p[1])*(q[1]-p[1])); if(d<bd){ bd=d; best=[si,qi]; } }); });
  geMark();
  if(best){ GE.si=best[0]; GE.pi=best[1]; }
  else{ var st=geCur(); st.pts.push([Math.round(p[0]),Math.round(p[1])]); GE.pi=st.pts.length-1; }
  GE.drag=true;
  if(c.setPointerCapture) try{ c.setPointerCapture(ev.pointerId); }catch(e){}
  geDraw(); geTools();
  if(ev.preventDefault) ev.preventDefault();
}
function geMove(ev){
  if(!GE||!GE.drag||GE.pi<0) return;
  var c=ev.currentTarget, p=geAt(c,ev), st=GE.st[GE.si];
  if(!st) return;
  st.pts[GE.pi][0]=Math.round(p[0]); st.pts[GE.pi][1]=Math.round(p[1]);
  geDraw();
  if(ev.preventDefault) ev.preventDefault();
}
function geUp(){ if(GE) GE.drag=false; }
function geTools(){
  var box=document.querySelector('.gtools'); if(!box) return;
  var st=GE.st[GE.si], p=(st && GE.pi>=0)? st.pts[GE.pi] : null, pts=0;
  GE.st.forEach(function(s){ pts+=s.pts.length; });
  var b=box.getElementsByTagName('button');
  var on=[!!p, !!(st&&st.pts.length>2), !!(st&&st.pts.length), !!p, !!GE.undo.length, !!pts];
  for(var i=0;i<b.length;i++) b[i].disabled=!on[i];
  b[0].className = (p && p[2]==='c') ? 'on' : '';
  b[1].className = (st && st.closed) ? 'on' : '';
  var cn=document.querySelector('.cn'); if(cn) cn.textContent=String(pts);
}
function geDraw(){
  var c=document.getElementById('gcanv'); if(!c||!GE) return;
  var x=c.getContext('2d'), Sz=c.width, k=Sz/800;
  x.clearRect(0,0,Sz,Sz);
  x.strokeStyle=cssVar('--br'); x.lineWidth=Math.max(1,k*1.5);
  [1/3,2/3].forEach(function(f){
    x.beginPath(); x.moveTo(Sz*f,0); x.lineTo(Sz*f,Sz); x.stroke();
    x.beginPath(); x.moveTo(0,Sz*f); x.lineTo(Sz,Sz*f); x.stroke();
  });
  x.strokeStyle=cssVar('--acb'); x.lineWidth=Math.max(1,k*2.5);
  x.strokeRect(k*10,k*10,Sz-k*20,Sz-k*20);
  var cont=[];
  try{ cont=LinguaFont.glyphContours({strokes:GE.st}, GPEN); }catch(e){}
  x.fillStyle=cssVar('--tx');
  cont.forEach(function(poly){ if(poly.length<3) return; x.beginPath(); poly.forEach(function(p,i){ if(i) x.lineTo(p[0]*k,p[1]*k); else x.moveTo(p[0]*k,p[1]*k); }); x.closePath(); x.fill(); });
  x.strokeStyle=cssVar('--acb'); x.lineWidth=Math.max(1,k*2);
  GE.st.forEach(function(s){ if(s.pts.length<2) return; var poly=LinguaFont.toPolyline(s); x.beginPath(); poly.forEach(function(p,i){ if(i) x.lineTo(p[0]*k,p[1]*k); else x.moveTo(p[0]*k,p[1]*k); }); x.stroke(); });
  GE.st.forEach(function(s,si){ s.pts.forEach(function(p,pi){
    var sel=(si===GE.si && pi===GE.pi);
    x.beginPath(); x.arc(p[0]*k,p[1]*k,k*(sel?24:16),0,Math.PI*2);
    x.fillStyle=(p[2]==='c')?cssVar('--pur'):cssVar('--ac'); x.fill();
    if(sel){ x.beginPath(); x.arc(p[0]*k,p[1]*k,k*40,0,Math.PI*2); x.strokeStyle=cssVar('--ac'); x.lineWidth=k*4; x.stroke(); }
  }); });
}
function geTiles(){
  var els=document.querySelectorAll('.gtile canvas.tc'), g=SCR().g;
  for(var i=0;i<els.length;i++){
    var c=els[i], r=c.getAttribute('data-r'), st=g[r];
    if(!st) continue;
    var dpr=window.devicePixelRatio||1, box=c.getBoundingClientRect();
    var Sz=Math.max(48,Math.round((box.width||72)*dpr));
    c.width=Sz; c.height=Sz;
    var x=c.getContext('2d'), k=Sz/800, cont=[];
    try{ cont=LinguaFont.glyphContours({strokes:st}, GPEN); }catch(e){}
    x.fillStyle=cssVar('--tx');
    cont.forEach(function(poly){ if(poly.length<3) return; x.beginPath(); poly.forEach(function(p,j){ if(j) x.lineTo(p[0]*k,p[1]*k); else x.moveTo(p[0]*k,p[1]*k); }); x.closePath(); x.fill(); });
  }
}
