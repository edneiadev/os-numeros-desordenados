const CACHE_NAME = "os-numeros-desordenados-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./imagens/acerto.jpeg",
  "./imagens/derrota.jpeg",
  "./imagens/erro.jpeg",
  "./imagens/icone.jpeg",
  "./imagens/narrativa1.jpeg",
  "./imagens/narrativa2.jpeg",
  "./imagens/narrativa3.jpeg",
  "./imagens/narrativa4.jpeg",
  "./imagens/narrativa5.jpeg",
  "./imagens/narrativa6.jpeg",
  "./imagens/tela-inicial.jpeg",
  "./imagens/tempo-esgotado.jpeg",
  "./imagens/vitoria.jpeg",
  "./sons/acerto.mp3",
  "./sons/derrota.mp3",
  "./sons/erro.mp3",
  "./sons/musica-tema.mp3",
  "./sons/musica.mp3",
  "./sons/tempo-esgotado.mp3",
  "./sons/tic-tac.mp3",
  "./sons/vitoria.mp3"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
