/* global createjs */
/* global miwgdefine */
/*jslint nomen: true, browser: true, plusplus: true, devel: true, vars:true, eqeq: true*/
var _manifest = [

    // json
    { "src": "src/imports/assets/spritesheets/masterSS.json",           "id": "masterSS-data", type: createjs.LoadQueue.JSON },
    { "src": "src/imports/assets/spritesheets/sparkleSS.json",          "id": "sparkleSS-data", type: createjs.LoadQueue.JSON },
    { "src": "src/imports/assets/spritesheets/prizes-export.xml",       "id": "prizes-export-data", type: createjs.LoadQueue.XML },
    { "src": "src/imports/assets/spritesheets/big_font-export.xml",     "id": "big_font-export-data", type: createjs.LoadQueue.XML },

    // images
    { "src": "src/imports/assets/spritesheets/masterSS.png",            "id": "masterSS" },
    { "src": "src/imports/assets/spritesheets/sparkleSS.png",           "id": "sparkleSS" },
    { "src": "src/imports/assets/img/pause.png",                        "id": "pause" },
    { "src": "src/imports/assets/spritesheets/prizes-export.png",       "id": "prizes-export" },
    { "src": "src/imports/assets/spritesheets/big_font-export.png",     "id": "big_font-export" },
    { "src": "src/imports/assets/img/background.png",                   "id": "background" },


    // sounds -- remeber to include these in the Phaser preload in <gameName>.js 
    { "src": "src/imports/assets/audio/bonus-sparkle.mp3",  "id": "bonussparkle" },
    { "src": "src/imports/assets/audio/countup.mp3",        "id": "countup" },
    { "src": "src/imports/assets/audio/match.mp3",          "id": "match" },
    { "src": "src/imports/assets/audio/coin.mp3",           "id": "coin" },
    { "src": "src/imports/assets/audio/play.mp3",           "id": "play" },
    { "src": "src/imports/assets/audio/prize1.mp3",         "id": "prize1" },
    { "src": "src/imports/assets/audio/prize2.mp3",         "id": "prize2" },
    { "src": "src/imports/assets/audio/prize3.mp3",         "id": "prize3" },
    { "src": "src/imports/assets/audio/wad_1.mp3",          "id": "wad_1" },
    { "src": "src/imports/assets/audio/whoosh_1.mp3",       "id": "whoosh_1" },
    { "src": "src/imports/assets/audio/whoosh_2.mp3",       "id": "whoosh_2" },
    { "src": "src/imports/assets/audio/endlose.mp3",        "id": "endlose" },
    { "src": "src/imports/assets/audio/endwin.mp3",         "id": "endwin" },

    // game init
    { "src": "src/game.js",                                                 "id": "Game" }
    
];
miwgdefine(function () {
    "use strict";
    return _manifest;
});