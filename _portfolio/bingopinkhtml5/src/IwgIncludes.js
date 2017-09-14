/* global createjs */
/* global miwgdefine */
/*jslint nomen: true, browser: true, plusplus: true, devel: true, vars:true, eqeq: true*/
var _manifest = [
    // third party
    { "src": "src/thirdParty/easeljs-0.8.0.min.js", "id": "easelJS" },
    { "src": "src/thirdParty/TweenMax.min.js", "id": "TweenMax" },
    { "src": "src/thirdParty/TimelineMax.min.js", "id": "TimeLineMax" },
    
    // fonts
    {"src": "src/imports/font/tnl_effra_he-webfont.eot",   "id": "effra.eot"},
    {"src": "src/imports/font/tnl_effra_he-webfont.svg",   "id": "effra.svg"},
    {"src": "src/imports/font/tnl_effra_he-webfont.woff",  "id": "effra.woff"},
    {"src": "src/imports/font/tnl_effra_he-webfont.woff2", "id": "effra.woff2"},
    {"src": "src/imports/font/tnl_effra_he-webfont.ttf",   "id": "effra.ttf"}, 
    
    // json
    { "src": "src/imports/json/frostyBingo.json", "id": "frostyBingoSS", type: createjs.LoadQueue.JSON },
    { "src": "src/imports/json/tombola.json", "id": "tombolaSS", type: createjs.LoadQueue.JSON },
    
    // images
    { "src": "src/imports/img/frostyBingo.png", "id": "frostyBingo" },
    { "src": "src/imports/img/tombola.png", "id": "tombola" },
    
    // globals
    { "src": "src/imports/js/Global.js", "id": "Global" },
    
    // GAME
    { "src": "src/lib/QueueManager.js", "id": "QueueManager" },
    { "src": "src/lib/SyncAnimation.js", "id": "SyncAnimation" },
    { "src": "src/lib/Animation.js", "id": "Animation" },    
    { "src": "src/lib/SpriteSheets.js", "id": "SpriteSheets" },
   
    { "src": "src/lib/Helper.js", "id": "Helper" },
    { "src": "src/lib/Scene.js", "id": "Scene" },
    { "src": "src/lib/GameObject.js", "id": "GameObject" },
    { "src": "src/lib/ClickableGameObject.js", "id": "ClickableGameObject" },
    { "src": "src/lib/Overlay.js", "id": "Overlay" },
    { "src": "src/lib/Legend.js", "id": "Legend" },
    { "src": "src/lib/Card.js", "id": "Card" },
    { "src": "src/lib/Tombola.js", "id": "Tombola" },
    { "src": "src/lib/BallAudit.js", "id": "BallAudit" },
    
    { "src": "src/lib/Ticket.js", "id": "Ticket" },
    
    { "src": "src/lib/Splash.js", "id": "Splash" },
    { "src": "src/lib/EndGame.js", "id": "EndGame" },
    { "src": "src/lib/Scale.js", "id": "Scale" },
    { "src": "src/lib/Pause.js", "id": "Pause" },
    { "src": "src/lib/Sound.js", "id": "Sound" },
    { "src": "src/lib/Instruction.js", "id": "instruction" },
    { "src": "src/lib/MainLayout.js", "id": "MainLayout" },
    
    // sounds
    { "src": "src/imports/audio/howToPlay.mp3",     "id": "howToPlay" },
    { "src": "src/imports/audio/colour.mp3",        "id": "colour" },
    { "src": "src/imports/audio/ballShoot.mp3",     "id": "ballShoot" },
    { "src": "src/imports/audio/backgroundLoop.mp3","id": "backgroundLoop" },
    { "src": "src/imports/audio/iButton.mp3",       "id": "iButton" },
    { "src": "src/imports/audio/startButton.mp3",   "id": "startButton" },
    { "src": "src/imports/audio/ballClick.mp3",     "id": "ballClick" },
    { "src": "src/imports/audio/ballRoll.mp3",      "id": "ballRoll" },
    { "src": "src/imports/audio/dabberSelect.mp3",  "id": "dabberSelect" },
    { "src": "src/imports/audio/doubler.mp3",       "id": "doubler" },
    { "src": "src/imports/audio/rowWin.mp3",        "id": "rowWin" },
    { "src": "src/imports/audio/endWin.mp3",        "id": "endWin" },
    { "src": "src/imports/audio/endLose.mp3",       "id": "endLose" },
   
    // game init
    { "src": "src/lib/FrostyBingo.js", "id": "FrostyBingo" },
    { "src": "src/IWGinit.js", "id": "IWGinit" }
];
miwgdefine(function () {
    "use strict";
    return _manifest;
});