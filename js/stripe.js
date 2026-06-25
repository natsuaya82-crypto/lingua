// Toast notifications (payment integration intentionally disabled for this release)
function showToast(msg,type='info'){
  let box=document.getElementById('toast-box');
  if(!box){box=document.createElement('div');box.id='toast-box';box.style.cssText='position:fixed;top:env(safe-area-inset-top,16px);top:max(env(safe-area-inset-top),16px);left:50%;transform:translateX(-50%);z-index:9999;display:flex;flex-direction:column;gap:6px;align-items:center;pointer-events:none';document.body.appendChild(box);}
  const t=document.createElement('div');
  const ico=type==='success'?(window.icon?icon('checkCircle'):''):type==='error'?(window.icon?icon('warn'):''):(window.icon?icon('sparkle'):'');
  t.innerHTML=ico+' <span>'+msg+'</span>';
  t.style.cssText='background:#1d1d22;border:1px solid rgba(255,255,255,0.12);color:#e7e5e2;padding:10px 18px;border-radius:10px;font-size:0.84rem;display:flex;gap:8px;align-items:center;box-shadow:0 4px 20px rgba(0,0,0,0.4);transition:opacity 0.4s;white-space:nowrap;max-width:90vw';
  if(type==='success')t.style.borderColor='rgba(127,174,122,0.4)',t.style.color='#9ccf97';
  if(type==='error')t.style.borderColor='rgba(207,138,122,0.4)',t.style.color='#cf8a7a';
  box.appendChild(t);
  setTimeout(()=>{t.style.opacity='0';setTimeout(()=>t.remove(),400);},3800);
}
