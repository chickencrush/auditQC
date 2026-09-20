export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowed = (env.ALLOWED_ORIGIN || 'https://chickencrush.github.io').replace(/\/$/,'');
    const cors = {'Access-Control-Allow-Origin': allowed,'Access-Control-Allow-Methods':'POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type','Vary':'Origin','Cache-Control':'no-store'};
    if (request.method === 'OPTIONS') return new Response(null,{status:204,headers:cors});
    if (request.method !== 'POST') return new Response(JSON.stringify({ok:false,error:'Method not allowed'}),{status:405,headers:{...cors,'Content-Type':'application/json'}});
    if (origin && origin !== allowed) return new Response(JSON.stringify({ok:false,error:'Origin not allowed'}),{status:403,headers:{...cors,'Content-Type':'application/json'}});
    const gas = String(env.GAS_URL || '');
    if (!gas.startsWith('https://script.google.com/macros/s/')) return new Response(JSON.stringify({ok:false,error:'GAS_URL belum dikonfigurasi'}),{status:500,headers:{...cors,'Content-Type':'application/json'}});
    try {
      const body = await request.text();
      const upstream = await fetch(gas,{method:'POST',headers:{'Content-Type':'application/json'},body,redirect:'follow'});
      const text = await upstream.text();
      return new Response(text,{status:upstream.ok?200:502,headers:{...cors,'Content-Type':'application/json; charset=utf-8'}});
    } catch(e) {
      return new Response(JSON.stringify({ok:false,error:'Backend unavailable: '+e.message}),{status:502,headers:{...cors,'Content-Type':'application/json'}});
    }
  }
};
