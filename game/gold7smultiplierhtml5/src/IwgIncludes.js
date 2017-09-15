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
    { "src": "src/imports/json/gold7sMultiplier.json", "id": "gold7sMultiplierSS", type: createjs.LoadQueue.JSON },
    
    // images
    { "src": "src/imports/img/gold7sMultiplier.png", "id": "gold7sMultiplier" },
    
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
    { "src": "src/lib/Overlay.js", "id": "Overlay" },
    
    { "src": "src/lib/Ticket.js", "id": "Ticket" },
    
    { "src": "src/lib/Splash.js", "id": "Splash" },
    { "src": "src/lib/EndGame.js", "id": "EndGame" },
    { "src": "src/lib/Scale.js", "id": "Scale" },
    { "src": "src/lib/Pause.js", "id": "Pause" },
    { "src": "src/lib/Sound.js", "id": "Sound" },
    { "src": "src/lib/Instruction.js", "id": "instruction" },
    { "src": "src/lib/Spinner.js", "id": "Spinner" },
    { "src": "src/lib/MainLayout.js", "id": "MainLayout" },
    
    // sounds
    {"src": "src/imports/audio/startButton.mp3",           "id": "startButton"},
    {"src": "src/imports/audio/spinButton.mp3",            "id": "spinButton"},
    {"src": "src/imports/audio/outerWheel.mp3",            "id": "outerWheel"},
    {"src": "src/imports/audio/innerWheel.mp3",            "id": "innerWheel"},
    {"src": "src/imports/audio/rowWin.mp3",                "id": "rowWin"},
    {"src": "src/imports/audio/endWin.mp3",                "id": "endWin"},
    {"src": "src/imports/audio/endLose.mp3",               "id": "endLose"},
    
    // game init
    { "src": "src/lib/Gold7sMultiplier.js", "id": "Gold7sMultiplier" },
    { "src": "src/IWGinit.js", "id": "IWGinit" }
];
miwgdefine(function () {
    "use strict";
    return _manifest;
});