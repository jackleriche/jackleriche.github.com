// var CACHE = 'slice-and-dice-v1';
// var CACHEFILES = [
//     './',
//     './index.html',
//     './bundle.js',
//     './assets/bootscene/dice.png',
//     './assets/bootscene/text.png',
//     './assets/buttons/arrow-left.png',
//     './assets/buttons/arrow-right.png',
//     './assets/buttons/button.png',
//     './assets/buttons/ButtonHome.png',
//     './assets/buttons/exit.png',
//     './assets/buttons/forward.png',
//     './assets/buttons/grid.png',
//     './assets/buttons/lose.png',
//     './assets/buttons/play.png',
//     './assets/buttons/replay.png',
//     './assets/buttons/return.png',
//     './assets/buttons/settings.png',
//     './assets/buttons/ticket.png',
//     './assets/buttons/win.png',
//     './assets/config/config.json',
//     './assets/config/legendConfig-lose.json',
//     './assets/config/legendConfig-win.json',
//     './assets/die/1.png',
//     './assets/die/2.png',
//     './assets/die/3.png',
//     './assets/die/4.png',
//     './assets/die/5.png',
//     './assets/die/6.png',
//     './assets/font/numero39.fnt',
//     './assets/font/numero39.png',
//     './assets/font/upheavtt.fnt',
//     './assets/font/upheavtt.png',
//     './assets/icon/icon-196.png',
//     './assets/icon/icon-256.png',
//     './assets/icon/icon-512.png',
//     './assets/lang/en.json',
//     './assets/legend/background.png',
//     './assets/legend/circle-empty.png',
//     './assets/legend/circle-filled.png',
//     './assets/legend/heart-medium.png',
//     './assets/legend/heart-null.png',
//     './assets/legend/heart-small.png',
//     './assets/legend/heart-winner.png',
//     './assets/mainscene/body.png',
//     './assets/mainscene/floor.png',
//     './assets/mainscene/table.png',
//     './assets/overlay/bg.png',
//     './assets/sounds/button/default-click.mp3',
//     './assets/sounds/ecg/legend-update.mp3',
//     './assets/sounds/ecg/lose.mp3',
//     './assets/sounds/ecg/spike.mp3',
//     './assets/sounds/end-sounds/lose.mp3',
//     './assets/sounds/end-sounds/win.mp3',
//     './assets/sounds/patient-sounds/lost.mp3',
//     './assets/sounds/patient-sounds/sound-1.mp3',
//     './assets/sounds/patient-sounds/sound-2.mp3',
//     './assets/sounds/patient-sounds/sound-3.mp3',
//     './assets/sounds/patient-sounds/sound-4.mp3',
//     './assets/sounds/patient-sounds/sound-5.mp3',
//     './assets/sounds/patient-sounds/sound-6.mp3',
//     './assets/sounds/patient-sounds/sound-7.mp3',
//     './assets/sounds/patient-sounds/sound-8.mp3',
//     './assets/sounds/patient-sounds/sound-9.mp3',
//     './assets/sounds/slice/slice-1.mp3',
//     './assets/sounds/slice/slice-2.mp3',
//     './assets/sounds/slice/slice-3.mp3',
//     './assets/sounds/theme/bg-a.m4a',
//     './assets/sounds/theme/bg-a.mp3',
//     './assets/sounds/theme/bg-a.ogg',
//     './assets/sounds/theme/bg-b.m4a',
//     './assets/sounds/theme/bg-b.mp3',
//     './assets/sounds/theme/bg-b.ogg',
//     './assets/sounds/theme/bg-c.m4a',
//     './assets/sounds/theme/bg-c.mp3',
//     './assets/sounds/theme/bg-c.ogg',
//     './assets/sounds/theme/bg-d.m4a',
//     './assets/sounds/theme/bg-d.mp3',
//     './assets/sounds/theme/bg-d.ogg',
//     './assets/sounds/theme/bg-e.m4a',
//     './assets/sounds/theme/bg-e.mp3',
//     './assets/sounds/theme/bg-e.ogg',
//     './assets/sounds/theme/bg-f.m4a',
//     './assets/sounds/theme/bg-f.mp3',
//     './assets/sounds/theme/bg-f.ogg',
//     './assets/sounds/win-reveal/alarm-win.mp3',
//     './assets/tickets/lose.json',
//     './assets/tickets/win.json',
//     './assets/blood.png',
//     './assets/button-reveal.png',
//     './assets/dialogue-box.png',
//     './assets/scalpel.png',
//     './assets/css/styles.css',
//     './assets/external/polyglot.min.js',
// ];

//  //Install stage sets up the cache-array to configure pre-cache content
// self.addEventListener('install', async (evt) => {
//   console.log('[PWA Builder] The service worker is being installed.');
//   const cache = await caches.open(CACHE);
//   await cache.addAll(CACHEFILES);
//   // return self.skipWaiting();
// });


// //allow sw to control of current page
// self.addEventListener('activate', function(event) {
//   console.log('[PWA Builder] Claiming clients for current page');
//   return self.clients.claim();
// });

// self.addEventListener('fetch', function(evt) {
//   console.log('[PWA Builder] The service worker is serving the asset.'+ evt.request.url);
//   evt.respondWith(fromCache(evt.request).catch(fromServer(evt.request)));
//   evt.waitUntil(update(evt.request));
// });

// // function precache() {
// //   return caches.open(CACHE).then(function (cache) {
// //     return cache.addAll(CACHEFILES);
// //   });
// // }

// function fromCache(request) {
//   //we pull files from the cache first thing so we can show them fast
//   return caches.open(CACHE).then(function (cache) {
//     return cache.match(request).then(function (matching) {
//       return matching || Promise.reject('no-match');
//     });
//   });
// }

// function update(request) {
//   //this is where we call the server to get the newest version of the 
//   //file to use the next time we show view
//   return caches.open(CACHE).then(function (cache) {
//     return fetch(request).then(function (response) {
//       return cache.put(request, response);
//     });
//   });
// }

// function fromServer(request){
//   //this is the fallback if it is not in the cache to go to the server and get it
//   return fetch(request).then(function(response){ return response});
// }