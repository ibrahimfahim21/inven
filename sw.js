// بيحفظ صفحة البوست على الموبايل من أول مرة - بعد كده البوست يفتح حتى من غير نت.  تصميم وتطوير: م. إبراهيم فهيم
const C = "inv-post-v2";
self.addEventListener("install", e => { e.waitUntil(caches.open(C).then(c => c.addAll(["./", "./index.html", "./manifest.webmanifest", "./icon-192.png"])).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
// الصفحة نفسها: من النت الأول (عشان أي تحديث يظهر على طول) ولو مفيش نت من النسخة المحفوظة على الموبايل
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.open(C).then(c => fetch(e.request).then(r => { if (r && (r.ok || r.type === "opaque")) c.put(e.request, r.clone()); return r; })
    .catch(() => c.match(e.request, { ignoreSearch: true }).then(hit => hit || c.match("./")))));
});
