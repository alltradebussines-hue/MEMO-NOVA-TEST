const CACHE='memo-nova-v10';
const FILES=['./','./index.html','./app.js','./tutor.js','./manifest.webmanifest','./icon.svg','./tutor-memo.svg','./anteprima-cattura.svg','./anteprima-attivita.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method==='GET')e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).catch(()=>caches.match('./index.html'))))});
self.addEventListener('notificationclick',e=>{e.notification.close();const target=new URL(e.notification.data?.url||'./?checkin=1',self.registration.scope).href;e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{for(const c of list){if('focus'in c){c.navigate(target);return c.focus()}}return clients.openWindow(target)}))});
