const CACHE_NAME = "memorias-v1";

const arquivosParaCache = [
    "./",
    "./index.html",
    "./app.js",
    "./usuario.js",
    "./buscaMusica.js",
    "./style.css"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(arquivosParaCache);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(resposta => {
            return resposta || fetch(event.request);
        })
    );
});
