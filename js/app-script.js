// =============================================
// LINGUA — Vibe editor
// (The script/writing system now lives in js/app-writing.js — draw letters,
//  compile an on-device OpenType font, and swap display via font-family.)
// =============================================

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
