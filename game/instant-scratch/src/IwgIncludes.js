/* global createjs */
/* global miwgdefine */
/*jslint nomen: true, browser: true, plusplus: true, devel: true, vars:true, eqeq: true*/
var _manifest = [
    // third party
    { "src": "src/thirdParty/easeljs-0.8.0.min.js",     "id": "easelJS" },
    { "src": "src/thirdParty/TweenMax.min.js",          "id": "TweenMax" },
    { "src": "src/thirdParty/TimelineMax.min.js",       "id": "TimeLineMax" },
    
    // fonts
    
    // json
    { "src": "src/imports/json/masterSingleSS.json",    "id": "masterSingleSS-data", type: createjs.LoadQueue.JSON },
    // images
    { "src": "src/imports/img/masterSingleSS.png",      "id": "masterSingleSS" },
    
    // globals
    { "src": "src/imports/js/Global.js",                "id": "Global" },
    
    // GAME
    { "src": "src/lib/Animation.js",                    "id": "Animation" },    
    { "src": "src/lib/SpriteSheets.js",                 "id": "SpriteSheets" },
    
    { "src": "src/lib/Helper.js",                       "id": "Helper" },
    { "src": "src/lib/Scene.js",                        "id": "Scene" },
    { "src": "src/lib/GameObject.js",                   "id": "GameObject" },
    { "src": "src/lib/ClickableGameObject.js",          "id": "ClickableGameObject" }, 
    { "src": "src/lib/Ticket.js",                       "id": "Ticket" },
    
    { "src": "src/lib/Splash.js",                       "id": "Splash" },
    { "src": "src/lib/Match.js",                        "id": "Match" },
    { "src": "src/lib/EndGame.js",                      "id": "EndGame" },
    { "src": "src/lib/Scale.js",                        "id": "Scale" },
    { "src": "src/lib/Scratch.js",                      "id": "Scratch" },
    { "src": "src/lib/Pause.js",                        "id": "Pause" },
    { "src": "src/lib/Sound.js",                        "id": "Sound" },
    { "src": "src/lib/MainLayout.js",                   "id": "MainLayout" },
    
    // sounds

    {"src": "src/imports/audio/clickGame.mp3",          "id": "clickGame"},
    {"src": "src/imports/audio/gamePreview.mp3",        "id": "gamePreview"},
    {"src": "src/imports/audio/markerPen.mp3",          "id": "markerPen"},
    {"src": "src/imports/audio/leftScratch.mp3",        "id": "leftScratch"},
    {"src": "src/imports/audio/rightScratch.mp3",       "id": "rightScratch"},
    {"src": "src/imports/audio/rowWin.mp3",             "id": "rowWin"},
    {"src": "src/imports/audio/endWin.mp3",             "id": "endWin"},
    {"src": "src/imports/audio/endLose.mp3",            "id": "endLose"},
    {"src": "src/imports/audio/bonusWin.mp3",           "id": "bonusWin"},

    
    
    // game init
    { "src": "src/lib/InstantScratch.js",               "id": "InstantScratch" },
    { "src": "src/IWGinit.js",                          "id": "IWGinit" }
];
miwgdefine(function () {
    "use strict";
    return _manifest;
});