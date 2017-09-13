/*jslint nomen: true, browser: true, plusplus: true, devel: true, vars:true, eqeq: true*/
/*global getManifest*/

(function (window) {
  "use strict";
  var iwg = window.com.camelot.iwg,
      _class = iwg._class,
      /**
       *
       * Include all your IWG scripts in this file.
       */
  getManifest = _class("core.LoadManifest", function () {
    var _manifest = [
      //thridParty
      {"src": "src/thirdParty/greensocks/TweenMax.min.js","id": "srcTweenMax"},
      {"src": "src/thirdParty/greensocks/TimelineLite.min.js", "id": "srcTimeline"},
      {"src": "src/thirdParty/createJS/easeljs-0.6.1.min.js", "id": "srceaseljs"},
      {"src": "src/thirdParty/hammer.min.js", "id": "hammer"},
      {"src": "src/thirdParty/createJS/preload.js", "id": "preload"},
      {"src": "src/thirdParty/createJS/soundjs-NEXT.min.js", "id": "sound"},

      //sounds
      {"src": "src/imports/audio/Chimes.mp3", "id": "Chimes"},
      {"src": "src/imports/audio/cornerAdd.mp3", "id": "cornerAdd"},
      {"src": "src/imports/audio/cornerWin.mp3", "id": "cornerWin"},
      {"src": "src/imports/audio/endWin.mp3", "id": "endWin"},
      {"src": "src/imports/audio/endLose.mp3", "id": "endLose"},
      {"src": "src/imports/audio/knockWood.mp3", "id": "knockWood"},
      {"src": "src/imports/audio/knockWoodShort.mp3", "id": "knockWoodShort"},
      {"src": "src/imports/audio/Pop.mp3", "id": "pop"},

      //images
      {"src": "src/imports/img/masterSS17.png", "id": "masterSS"},
      {"src": "src/imports/img/starburst.png", "id": "starburst"},
      {"src": "src/imports/img/swipe_reminder.png", "id": "swipeReminder"},
      {"src": "src/imports/img/audio_ON.png", "id": "audioOn"},
      {"src": "src/imports/img/audio_OFF.png", "id": "audioOff"},

      //flassets
      {"src": "src/lib/flassets/MasterSS.js", "id": "masterSS"},
      {"src": "src/lib/MEvent.js", "id": "MEvent"},

      // dev
      {"src": "src/lib/R.js", "id": "srcR"},
      {"src": "src/lib/Swipe.js", "id": "Swipe"},
      {"src": "src/lib/Legend.js", "id": "Legend"},
      {"src": "src/lib/GameAsset.js", "id": "GameAsset"},
      {"src": "src/MainGameClassFile.js", "id": "srcMGM"}
    ];
    return _manifest;
  });
}(window));
