/* global createjs */
/* global miwgdefine */
/*jslint nomen: true, browser: true, plusplus: true, devel: true, vars:true, eqeq: true*/
var _manifest = [
    // third party
    { "src": "src/thirdParty/easeljs-0.8.0.min.js", "id": "easelJS" },
    { "src": "src/thirdParty/TweenMax.min.js", "id": "TweenMax" },
    { "src": "src/thirdParty/TimelineMax.min.js", "id": "TimeLineMax" },
    
    // fonts
    
    // json
    { "src": "src/imports/json/masterSS.json", "id": "masterSS-data", type: createjs.LoadQueue.JSON },
    { "src": "src/imports/json/bagSS.json", "id": "bagSS-data", type: createjs.LoadQueue.JSON },
    { "src": "src/imports/json/poundSS.json", "id": "poundSS-data", type: createjs.LoadQueue.JSON },
    { "src": "src/imports/json/star5SS.json", "id": "star5SS-data", type: createjs.LoadQueue.JSON },
    { "src": "src/imports/json/star10SS.json", "id": "star10SS-data", type: createjs.LoadQueue.JSON },
    { "src": "src/imports/json/splashBurstSS.json", "id": "splashBurstSS-data", type: createjs.LoadQueue.JSON },
    { "src": "src/imports/json/starSS.json", "id": "starSS-data", type: createjs.LoadQueue.JSON },

    
    // images
    { "src": "src/imports/img/masterSS.png", "id": "masterSS" },
    { "src": "src/imports/img/bagSS.png", "id": "bagSS" },
    { "src": "src/imports/img/poundSS.png", "id": "poundSS" },
    { "src": "src/imports/img/starSS.png", "id": "starSS" },
    { "src": "src/imports/img/star5SS.png", "id": "star5SS" },
    { "src": "src/imports/img/star10SS.png", "id": "star10SS" },
    { "src": "src/imports/img/splashBurstSS.png", "id": "splashBurstSS" },    
    
    // globals
    { "src": "src/imports/js/Global.js", "id": "Global" },
    
    // GAME
    { "src": "src/lib/SyncAnimation.js", "id": "SyncAnimation" },
    { "src": "src/lib/Animation.js", "id": "Animation" },    
    { "src": "src/lib/SpriteSheets.js", "id": "SpriteSheets" },
   
    { "src": "src/lib/Helper.js", "id": "Helper" },
    { "src": "src/lib/Scene.js", "id": "Scene" },
    { "src": "src/lib/GameObject.js", "id": "GameObject" },
    { "src": "src/lib/ClickableGameObject.js", "id": "ClickableGameObject" }, 
    { "src": "src/lib/Ticket.js", "id": "Ticket" },
    
    { "src": "src/lib/Splash.js",       "id": "Splash" },
    { "src": "src/lib/Match.js",        "id": "Match" },
    { "src": "src/lib/EndGame.js",      "id": "EndGame" },
    { "src": "src/lib/Scale.js",        "id": "Scale" },
    { "src": "src/lib/Pause.js",        "id": "Pause" },
    { "src": "src/lib/Sound.js",        "id": "Sound" },
    { "src": "src/lib/MainLayout.js",   "id": "MainLayout" },
    
    // sounds
    {"src": "src/imports/audio/play.mp3",                 "id": "play"},
    {"src": "src/imports/audio/multiWin.mp3",             "id": "multiWin"},
    {"src": "src/imports/audio/moneyBag.mp3",             "id": "moneyBag"},
    {"src": "src/imports/audio/prize.mp3",                "id": "prize"},
    {"src": "src/imports/audio/rowWin.mp3",               "id": "rowWin"},
    {"src": "src/imports/audio/endWin.mp3",               "id": "endWin"},
    {"src": "src/imports/audio/endLose.mp3",              "id": "endLose"},
    
    // game init
    { "src": "src/lib/10xCash.js", "id": "10xCash" },
    { "src": "src/IWGinit.js", "id": "IWGinit" }
];
miwgdefine(function () {
    "use strict";
    return _manifest;
});