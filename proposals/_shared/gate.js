<!-- =============================
FILE 2: /proposals/_shared/gate.js
============================= -->
<script>
(function(){
  const APP_ID = 'app';
  const GATE_ID = 'gate';
  const PASS_ID = 'gpass';
  const BTN_ID = 'gunlock';
  const MSG_ID = 'gmsg';
  const KEY = 'smcg_gate_agentic_v1';
  // Set your access code here or replace this with server-side auth.
  const ACCESS_CODE = (window.SMCG_ACCESS_CODE || 'changeme-please');

  function ok(msg){ setMsg(msg||''); }
  function err(msg){ setMsg(msg||'Invalid code.'); }
  function setMsg(t){ const m=document.getElementById(MSG_ID); if(m){ m.textContent=t; } }
  function unlock(){
    const input = document.getElementById(PASS_ID);
    const code = (input?.value||'').trim();
    if (safeEqual(code, ACCESS_CODE)) {
      try { localStorage.setItem(KEY, '1'); } catch(e){}
      showApp();
    } else {
      err('Invalid code.');
      input?.focus();
    }
  }
  function safeEqual(a,b){
    if (a.length!==b.length) return false;
    let r=0; for(let i=0;i<a.length;i++){ r|=a.charCodeAt(i)^b.charCodeAt(i); }
    return r===0;
  }
  function showApp(){
    const app=document.getElementById(APP_ID); const gate=document.getElementById(GATE_ID);
    if(app&&gate){ app.hidden=false; gate.remove(); document.title=document.title.replace('(Private)','(Private • Unlocked)'); }
  }
  function already(){ try { return localStorage.getItem(KEY)==='1'; } catch(e){ return false; } }
  function bind(){
    const b=document.getElementById(BTN_ID); const i=document.getElementById(PASS_ID);
    if (!b||!i) return;
    b.addEventListener('click', unlock);
    i.addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ unlock(); } });
    setTimeout(()=>{i.focus();},50);
  }
  if (already()){ showApp(); } else { window.addEventListener('DOMContentLoaded', bind); }
})();
</script>