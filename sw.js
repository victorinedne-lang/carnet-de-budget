const V='carnet-v2',A=['./','index.html','manifest.webmanifest','config.js','supabase.min.js','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
const u=new URL(r.url);if(u.origin!==location.origin&&!/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname))return;
e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(V).then(s=>s.put(r,c));return x}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))))});
