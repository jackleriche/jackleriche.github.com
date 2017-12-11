/* global createjs */
/* global miwgdefine */
/*jslint nomen: true, browser: true, plusplus: true, devel: true, vars:true, eqeq: true*/
var _manifest = [

    // json
    { "src": "src/imports/assets/spritesheets/masterSS.json",   "id": "masterSS-data", type: createjs.LoadQueue.JSON },
    { "src": "src/imports/assets/fonts/numbers-export.xml",     "id": "numbers-export-data", type: createjs.LoadQueue.XML },
    { "src": "src/imports/assets/fonts/ends-export.xml",        "id": "ends-export-data", type: createjs.LoadQueue.XML },
    { "src": "src/imports/assets/fonts/prize-export.xml",       "id": "prize-export-data", type: createjs.LoadQueue.XML },
    { "src": "src/imports/assets/fonts/prize_win-export.xml",   "id": "prize_win-export-data", type: createjs.LoadQueue.XML },
    { "src": "src/imports/assets/fonts/goesleft-export.xml",    "id": "goesleft-export-data", type: createjs.LoadQueue.XML },

    // images
    { "src": "src/imports/assets/spritesheets/masterSS.png",    "id": "masterSS" },
    { "src": "src/imports/assets/img/bg.png", "id": "bg" },
    { "src": "src/imports/assets/img/button_shuffle.png",       "id": "shuffle" },
    { "src": "src/imports/assets/img/button_shuffle_over.png",  "id": "shuffle_over" },
    { "src": "src/imports/assets/img/pause.png",                "id": "pause" },
    
    { "src": "src/imports/assets/fonts/numbers-export.png",     "id": "numbers-export" },
    { "src": "src/imports/assets/fonts/ends-export.png",        "id": "ends-export" },
    { "src": "src/imports/assets/fonts/prize-export.png",       "id": "prize-export" },
    { "src": "src/imports/assets/fonts/prize_win-export.png",   "id": "prize_win-export" },
    { "src": "src/imports/assets/fonts/goesleft-export.png",    "id": "goesleft-export" },
    
    // sounds -- remeber to include these in the Phaser preload in <gameName>.js 
    { "src": "src/imports/assets/audio/playButton.mp3",         "id": "playButton" },
    { "src": "src/imports/assets/audio/shuffleButton.mp3",      "id": "shuffleButton" },
    { "src": "src/imports/assets/audio/shuffle.mp3",            "id": "shuffle" },
    { "src": "src/imports/assets/audio/autoPlay.mp3",           "id": "autoPlay" },
    { "src": "src/imports/assets/audio/tileSelect.mp3",         "id": "tileSelect" },
    { "src": "src/imports/assets/audio/tileTurn.mp3",           "id": "tileTurn" },
    { "src": "src/imports/assets/audio/multiplierTile.mp3",     "id": "multiplierTile" },
    { "src": "src/imports/assets/audio/rowWin.mp3",             "id": "rowWin" },
    { "src": "src/imports/assets/audio/endWin.mp3",             "id": "endWin" },
    { "src": "src/imports/assets/audio/endLose.mp3",            "id": "endLose" },
    { "src": "src/imports/assets/audio/count.mp3",              "id": "count" },
    { "src": "src/imports/assets/audio/countUp.mp3",            "id": "countUp" },
    { "src": "src/imports/assets/audio/cloverMove.mp3",         "id": "clover" },
    { "src": "src/imports/assets/audio/backgroundsound.mp3",    "id": "backgroundsound" },
    
    // game init
    { "src": "src/Game.js", "id": "Game" },
    
    //{ "src": "initGameNC.js", "id": "Game" }
    
];
miwgdefine(function () {
    "use strict";
    return _manifest;
});