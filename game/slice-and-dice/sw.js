var cacheName = 'phaser-v1';
var filesToCache = [
    '/',
    '/index.html',
    '/bundle.js',
    '/assets/bootscene/dice.png',
    '/assets/bootscene/text.png',
    '/assets/buttons/arrow-left.png',
    '/assets/buttons/arrow-right.png',
    '/assets/buttons/button.png',
    '/assets/buttons/ButtonHome.png',
    '/assets/buttons/exit.png',
    '/assets/buttons/forward.png',
    '/assets/buttons/grid.png',
    '/assets/buttons/lose.png',
    '/assets/buttons/play.png',
    '/assets/buttons/replay.png',
    '/assets/buttons/return.png',
    '/assets/buttons/settings.png',
    '/assets/buttons/ticket.png',
    '/assets/buttons/win.png',
    '/assets/config/config.json',
    '/assets/config/legendConfig-lose.json',
    '/assets/config/legendConfig-win.json',
    '/assets/die/1.png',
    '/assets/die/2.png',
    '/assets/die/3.png',
    '/assets/die/4.png',
    '/assets/die/5.png',
    '/assets/die/6.png',
    '/assets/font/numero39.fnt',
    '/assets/font/numero39.png',
    '/assets/font/upheavtt.fnt',
    '/assets/font/upheavtt.png',
    '/assets/icon/icon-196.png',
    '/assets/icon/icon-256.png',
    '/assets/icon/icon-512.png',
    '/assets/lang/en.json',
    '/assets/legend/background.png',
    '/assets/legend/circle-empty.png',
    '/assets/legend/circle-filled.png',
    '/assets/legend/heart-medium.png',
    '/assets/legend/heart-null.png',
    '/assets/legend/heart-small.png',
    '/assets/legend/heart-winner.png',
    '/assets/mainscene/body.png',
    '/assets/mainscene/floor.png',
    '/assets/mainscene/table.png',
    '/assets/overlay/bg.png',
    '/assets/sounds/button/default-click.mp3',
    '/assets/sounds/ecg/legend-update.mp3',
    '/assets/sounds/ecg/lose.mp3',
    '/assets/sounds/ecg/spike.mp3',
    '/assets/sounds/end-sounds/lose.mp3',
    '/assets/sounds/end-sounds/win.mp3',
    '/assets/sounds/patient-sounds/lost.mp3',
    '/assets/sounds/patient-sounds/sound-1.mp3',
    '/assets/sounds/patient-sounds/sound-2.mp3',
    '/assets/sounds/patient-sounds/sound-3.mp3',
    '/assets/sounds/patient-sounds/sound-4.mp3',
    '/assets/sounds/patient-sounds/sound-5.mp3',
    '/assets/sounds/patient-sounds/sound-6.mp3',
    '/assets/sounds/patient-sounds/sound-7.mp3',
    '/assets/sounds/patient-sounds/sound-8.mp3',
    '/assets/sounds/patient-sounds/sound-9.mp3',
    '/assets/sounds/slice/slice-1.mp3',
    '/assets/sounds/slice/slice-2.mp3',
    '/assets/sounds/slice/slice-3.mp3',
    '/assets/sounds/theme/bg-a.m4a',
    '/assets/sounds/theme/bg-a.mp3',
    '/assets/sounds/theme/bg-a.ogg',
    '/assets/sounds/theme/bg-b.m4a',
    '/assets/sounds/theme/bg-b.mp3',
    '/assets/sounds/theme/bg-b.ogg',
    '/assets/sounds/theme/bg-c.m4a',
    '/assets/sounds/theme/bg-c.mp3',
    '/assets/sounds/theme/bg-c.ogg',
    '/assets/sounds/theme/bg-d.m4a',
    '/assets/sounds/theme/bg-d.mp3',
    '/assets/sounds/theme/bg-d.ogg',
    '/assets/sounds/theme/bg-e.m4a',
    '/assets/sounds/theme/bg-e.mp3',
    '/assets/sounds/theme/bg-e.ogg',
    '/assets/sounds/theme/bg-f.m4a',
    '/assets/sounds/theme/bg-f.mp3',
    '/assets/sounds/theme/bg-f.ogg',
    '/assets/sounds/win-reveal/alarm-win.mp3',
    '/assets/tickets/lose.json',
    '/assets/tickets/win.json',
    '/assets/blood.png',
    '/assets/button-reveal.png',
    '/assets/dialogue-box.png',
    '/assets/scalpel.png',
    '/assets/css/styles.css',
    '/assets/external/polyglot.min.js',
];
 
self.addEventListener('install', function(event) {
    console.log('sw install');
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
        console.log('sw caching files');
        return cache.addAll(filesToCache);
        }).catch(function(err) {
        console.log(err);
        })
    );
});

self.addEventListener('fetch', (event) => {
  console.log('sw fetch');
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    }).catch(function (error) {
      console.log(error);
    })
  );
});


self.addEventListener('activate', function(event) {
  console.log('sw activate');
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('sw removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});