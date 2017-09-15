/* global createjs */
/* global miwgdefine */
/*jslint nomen: true, browser: true, plusplus: true, devel: true, vars:true, eqeq: true*/
var _manifest = [
    // third party
    { "src": "src/thirdParty/easeljs-0.8.0.min.js", "id": "easelJS" },
    { "src": "src/thirdParty/TweenMax.min.js", "id": "TweenMax" },
    { "src": "src/thirdParty/TimelineMax.min.js", "id": "TimeLineMax" },
    
    // js
    { "src": "src/imports/js/iconRef.js", "id": "iconRef"},
    { "src": "src/imports/js/Global.js", "id": "Global" },
    
    // json
    { "src": "src/imports/json/mouseTrap.json", "id": "mouseTrapSS", type: createjs.LoadQueue.JSON },
    { "src": "src/imports/json/mouseTrapDice.json", "id": "mouseTrapDiceSS", type: createjs.LoadQueue.JSON },
    { "src": "src/imports/json/boot.json", "id": "bootSS", type: createjs.LoadQueue.JSON },
    { "src": "src/imports/json/cat.json", "id": "catSS", type: createjs.LoadQueue.JSON },
    { "src": "src/imports/json/looper.json", "id": "looperSS", type: createjs.LoadQueue.JSON },
    
    // images
    { "src": "src/imports/img/mouseTrap.png", "id": "mouseTrap" },
    { "src": "src/imports/img/mouseTrapDice.png", "id": "mouseTrapDice" },
    { "src": "src/imports/img/boot.png", "id": "boot" },
    { "src": "src/imports/img/cat.png", "id": "cat" },
    { "src": "src/imports/img/looper.png", "id": "looper" },
    	
     // sounds
    {"src": "src/imports/audio/looptheloop.mp3",           "id": "looptheloop"},
    {"src": "src/imports/audio/endWinorRowWin.mp3",        "id": "endWinorRowWin"},
    {"src": "src/imports/audio/meow.mp3",                  "id": "meow"},
    {"src": "src/imports/audio/scratch2.mp3",              "id": "scratch2"},
    {"src": "src/imports/audio/whirl.mp3",                 "id": "whirl"},
    {"src": "src/imports/audio/boing.mp3",                 "id": "boing"},
    {"src": "src/imports/audio/bootkick.mp3",              "id": "bootkick"},
    {"src": "src/imports/audio/yipee.mp3",                 "id": "yipee"},
    {"src": "src/imports/audio/dice.mp3",                  "id": "dice"},
    {"src": "src/imports/audio/end_lose.mp3",              "id": "end_lose"},
   
    // GAME
    { "src": "src/lib/QueueManager.js", "id": "QueueManager" },
    { "src": "src/lib/Animation.js", "id": "Animation" },
    { "src": "src/lib/SpriteSheet.js", "id": "SpriteSheet" },
    
    { "src": "src/lib/GameObject.js", "id": "GameObject" },
    { "src": "src/lib/ClickableGameObject.js", "id": "ClickableGameObject" },
    
    
    { "src": "src/lib/Ticket.js", "id": "Ticket" },
    { "src": "src/lib/Scale.js", "id": "Scale" },
    { "src": "src/lib/Pause.js", "id": "Pause" },
    { "src": "src/lib/Sound.js", "id": "Sound" },
    	
    { "src": "src/lib/Legend.js", "id": "Legend" },
    
    { "src": "src/lib/Tile.js", "id": "Tile" },
    { "src": "src/lib/Popup.js", "id": "Popup" },
    { "src": "src/lib/EndGame.js", "id": "EndGame" },
    { "src": "src/lib/Dice.js", "id": "Dice" },
    { "src": "src/lib/Board.js", "id": "Board" },
    { "src": "src/lib/Counter.js", "id": "Counter" },
    { "src": "src/lib/Legend.js", "id": "Legend" },
    { "src": "src/lib/MainLayout.js", "id": "MainLayout" },
    
    
    // game init
    { "src": "src/lib/MouseTrap.js", "id": "MouseTrap" },
    { "src": "src/IWGinit.js", "id": "IWGinit" }
];
miwgdefine(function () {
    "use strict";
    //conditional statements can be added here
    //com.camelot.core.IWG.ame('get', 'UA') is loaded and can be used.
    /**
     *   if ({your condition is met}) {
     *   _manifest.unshift({"src": "pathToFile", "id": "fileID"})
     *   }
     */
    return _manifest;
});