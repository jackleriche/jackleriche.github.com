/* global createjs */
/* global miwgdefine */
/*jslint nomen: true, browser: true, plusplus: true, devel: true, vars:true, eqeq: true*/
var _manifest = [

    // json
    { "src": "src/imports/assets/spritesheets/masterSS.json", "id": "masterSS-data", type: createjs.LoadQueue.JSON },
    { "src": "src/imports/assets/spritesheets/endamounts-export.xml", "id": "endamounts-export-data", type: createjs.LoadQueue.XML },
    { "src": "src/imports/assets/spritesheets/prizes-export.xml", "id": "prizes-export-data", type: createjs.LoadQueue.XML },

    // images
    { "src": "src/imports/assets/spritesheets/masterSS.png", "id": "masterSS" },
    { "src": "src/imports/assets/img/bg.png", "id": "bg" },
    { "src": "src/imports/assets/spritesheets/endamounts-export.png", "id": "endamounts-export" },
    { "src": "src/imports/assets/spritesheets/prizes-export.png", "id": "prizes-export" },

    
    // sounds -- remeber to include these in the Phaser preload in <gameName>.js 
    { "src": "src/imports/assets/audio/background.mp3",  "id": "backgroundLoop" },
    { "src": "src/imports/assets/audio/bonusReveal.mp3", "id": "bonusReveal" },
    { "src": "src/imports/assets/audio/bonusWin.mp3",    "id": "bonusWin" },
    { "src": "src/imports/assets/audio/endLose.mp3",     "id": "endLose" },
    { "src": "src/imports/assets/audio/endWin.mp3",      "id": "endWin" },
    { "src": "src/imports/assets/audio/playButton.mp3",  "id": "playButton" },
    { "src": "src/imports/assets/audio/presentClick.mp3","id": "presentClick" },
    { "src": "src/imports/assets/audio/rowWin.mp3",      "id": "rowWin" },
    { "src": "src/imports/assets/audio/tileTurn.mp3",    "id": "tileTurn" },
    { "src": "src/imports/assets/audio/tileTurn2.mp3",    "id": "tileTurn2" },
    { "src": "src/imports/assets/audio/tileTurn3.mp3",    "id": "tileTurn3" },
    { "src": "src/imports/assets/audio/tileTurn4.mp3",    "id": "tileTurn4" },
    { "src": "src/imports/assets/audio/tileTurn5.mp3",    "id": "tileTurn5" },
    { "src": "src/imports/assets/audio/presentSmash.mp3", "id": "presentSmash" },
    { "src": "src/imports/assets/audio/tick.mp3",         "id": "tick" },
    { "src": "src/imports/assets/audio/lineWin.mp3",      "id": "lineWin" },

    
    // game init
    { "src": "/src/Game.js", "id": "Game" }

    //{ "src": "initGameNC.js", "id": "Game" }
    
];
miwgdefine(function () {
    "use strict";
    return _manifest;
});