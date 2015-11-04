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
    { "src": "src/imports/json/lottoDrop.json", "id": "lottoDropSS", type: createjs.LoadQueue.JSON },
    
    // images
    { "src": "src/imports/img/lottoDrop.png", "id": "lottoDrop" },
    
    // globals
    { "src": "src/imports/js/Global.js", "id": "Global" },
    
    // GAME
    { "src": "src/lib/Helper.js", "id": "Helper" },
    { "src": "src/lib/SyncAnimation.js", "id": "SyncAnimation" },
    { "src": "src/lib/Animation.js", "id": "Animation" },    
    { "src": "src/lib/SpriteSheets.js", "id": "SpriteSheets" },
    { "src": "src/lib/Path.js", "id": "Path" },
   
    { "src": "src/lib/Scene.js", "id": "Scene" },
    { "src": "src/lib/GameObject.js", "id": "GameObject" },
    { "src": "src/lib/ClickableGameObject.js", "id": "ClickableGameObject" },
    { "src": "src/lib/Legend.js", "id": "legend" },
    
    { "src": "src/lib/Ticket.js", "id": "Ticket" },
    
    { "src": "src/lib/Pin.js", "id": "Pin" },
    { "src": "src/lib/Tipper.js", "id": "Tipper" },
	{ "src": "src/lib/BallBank.js", "id": "BallBank" },
    { "src": "src/lib/Splash.js", "id": "Splash" },
    { "src": "src/lib/MiniGamePrize.js", "id": "MiniGamePrize" },
    { "src": "src/lib/MiniGameOne.js", "id": "MiniGameOne" },
    { "src": "src/lib/MiniGameTwo.js", "id": "MiniGameTwo" },
    { "src": "src/lib/BallSelection.js", "id": "BallSelection" },
    { "src": "src/lib/BonusStar.js", "id": "BonusStar" },
	{ "src": "src/lib/InstantWin.js", "id": "InstantWin" },
    { "src": "src/lib/Star.js", "id": "Star" },
    { "src": "src/lib/Board.js", "id": "Board" },
    { "src": "src/lib/Tipper.js", "id": "Tipper" },
    { "src": "src/lib/EndGame.js", "id": "EndGame" },
    { "src": "src/lib/Scale.js", "id": "Scale" },
    { "src": "src/lib/Pause.js", "id": "Pause" },
    { "src": "src/lib/Sound.js", "id": "Sound" },
    { "src": "src/lib/Instruction.js", "id": "instruction" },
   
    { "src": "src/lib/MainLayout.js", "id": "MainLayout" },
    
    // sounds
    {"src": "src/imports/audio/startScreen.mp3",            "id": "startScreen"},
    {"src": "src/imports/audio/chooseBall.mp3",             "id": "chooseBall"},
    {"src": "src/imports/audio/letsPlay.mp3",               "id": "letsPlay"},
    {"src": "src/imports/audio/instructionButton.mp3",      "id": "instructionButton"},
    {"src": "src/imports/audio/ballPopulate.mp3",           "id": "ballPopulate"},
    {"src": "src/imports/audio/chooseMenu.mp3",             "id": "chooseMenu"},
    {"src": "src/imports/audio/pinHit.mp3",                 "id": "pinHit"},
    {"src": "src/imports/audio/ballLand.mp3",               "id": "ballLand"},
    {"src": "src/imports/audio/tipper.mp3",                 "id": "tipper"},
    {"src": "src/imports/audio/minigamePopup.mp3",          "id": "minigamePopup"},
    {"src": "src/imports/audio/rowWin.mp3",                 "id": "rowWin"},
    {"src": "src/imports/audio/bonusWin.mp3",               "id": "bonusWin"},
    {"src": "src/imports/audio/instantWin.mp3",             "id": "instantWin"},
    {"src": "src/imports/audio/endWin.mp3",                 "id": "endWin"},
    {"src": "src/imports/audio/endLose.mp3",                "id": "endLose"},
    {"src": "src/imports/audio/minigamePrizePrompt.mp3",    "id": "minigamePrizePrompt"},
    {"src": "src/imports/audio/minigame1cup.mp3",           "id": "minigame1cup"},
    {"src": "src/imports/audio/minigameEndWin.mp3",         "id": "minigameEndWin"},
    {"src": "src/imports/audio/minigameEndLose.mp3",        "id": "minigameEndLose"},
    {"src": "src/imports/audio/minigame2Button.mp3",        "id": "minigame2Button"},
    {"src": "src/imports/audio/minigameContinue.mp3",       "id": "minigameContinue"},
    
   
    // game init
    { "src": "src/lib/LottoDrop.js", "id": "LottoDrop" },
    { "src": "src/IWGinit.js", "id": "IWGinit" }
];
miwgdefine(function () {
    "use strict";
    return _manifest;
});