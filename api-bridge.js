(function(){
  'use strict';
  const cfg=window.CCQC_CONFIG||{};
  function apiUrl(){ const u=String(cfg.API_URL||'').trim(); if(!u||u.includes('PASTE_')) throw new Error('API_URL V3.2 belum dikonfigurasi.'); return u; }
  async function fileToPayload(file){
    if(!file) return null;
    const buf=await file.arrayBuffer();
    let binary=''; const bytes=new Uint8Array(buf); const chunk=0x8000;
    for(let i=0;i<bytes.length;i+=chunk) binary+=String.fromCharCode.apply(null,bytes.subarray(i,i+chunk));
    return {__file:true,name:file.name||'foto',type:file.type||'application/octet-stream',size:file.size||bytes.length,base64:btoa(binary)};
  }
  async function serializeArg(arg){
    if(arg instanceof HTMLFormElement){
      const obj={__form:true};
      for(const el of Array.from(arg.elements||[])){
        if(!el.name) continue;
        if(el.type==='file') obj[el.name]=await fileToPayload(el.files&&el.files[0]);
        else if((el.type==='checkbox'||el.type==='radio')&&!el.checked) continue;
        else obj[el.name]=el.value;
      }
      return obj;
    }
    return arg;
  }
  async function rpc(method,args){
    const safeArgs=[]; for(const a of args) safeArgs.push(await serializeArg(a));
    const r=await fetch(apiUrl(),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({method,args:safeArgs,clientVersion:'3.2.1'})});
    const text=await r.text(); let data; try{data=JSON.parse(text);}catch(e){throw new Error('Respons API tidak valid ('+r.status+').');}
    if(!r.ok||!data.ok) throw new Error((data&&data.error)||('API error '+r.status));
    return data.result;
  }
  function runner(success,failure){
    return new Proxy({}, {get(_t,p){
      if(p==='withSuccessHandler') return fn=>runner(fn,failure);
      if(p==='withFailureHandler') return fn=>runner(success,fn);
      return (...args)=>{ rpc(String(p),args).then(v=>{if(success)success(v);}).catch(e=>{if(failure)failure({message:e.message||String(e)}); else console.error(e);}); };
    }});
  }
  window.google=window.google||{}; window.google.script=window.google.script||{};
  Object.defineProperty(window.google.script,'run',{configurable:true,get(){return runner(null,null);}});
  window.CCQC_API={rpc};
})();
