/* global miwgdefine */
/*jslint nomen: true, browser: true, plusplus: true, devel: true, vars:true, eqeq: true*/

var _manifest = [

    // third party
    {"src": "src/thirdParty/easeljs-0.8.0.min.js",  "id": "easelJS"},
    {"src": "src/thirdParty/TweenMax.min.js",   	"id": "TweenMax"},
    {"src": "src/thirdParty/TimelineMax.min.js",    "id": "TimeLineMax"},
    
    // public
    {"src": "src/imports/js/iconRef.js",            "id": "iconRef"},
    {"src": "src/imports/js/prizeRef.js",   	    "id": "prizeRef"},
    // images
    {"src": "src/imports/img/imageSS.png",          "id": "imageSS"},
    {"src": "src/lib/SS/imageSS.js",                "id": "imageSS"},
    {"src": "src/imports/img/noteSS.png",           "id": "noteSS"},
    {"src": "src/lib/SS/noteSS.js",                 "id": "noteSS"},
    {"src": "src/imports/img/prizeRevealSS.png",    "id": "prizeRevealSS"},
    {"src": "src/lib/SS/prizeRevealSS.js",          "id": "prizeRevealSS"},
    {"src": "src/imports/img/prizeSS.png",          "id": "prizeSS"},
    {"src": "src/lib/SS/prizeSS.js",                "id": "prizeSS"},
    {"src": "src/imports/img/fullTurnSS.png",       "id": "fullTurnSS"},
    {"src": "src/lib/SS/fullTurnSS.js",             "id": "fullTurnSS"},
    {"src": "src/imports/img/calendarSS.png",       "id": "calendarSS"},
    {"src": "src/lib/SS/calendarSS.js",             "id": "calendarSS"},
    {"src": "src/imports/img/bg.png",               "id": "bg"},
    // sounds
    {"src": "src/imports/audio/endLose.mp3",        "id": "soundEndLose"},
    {"src": "src/imports/audio/endWin.mp3",         "id": "soundEndWin"},
    {"src": "src/imports/audio/money.mp3",          "id": "soundMoney"},
    {"src": "src/imports/audio/paperTurn.mp3",      "id": "soundPaperTurn"},
    {"src": "src/imports/audio/prizeReveal.mp3",    "id": "soundPrizeReveal"},
    {"src": "src/imports/audio/rollover.mp3",       "id": "soundRollover"},
    {"src": "src/imports/audio/rowWin.mp3",         "id": "soundRowWin"},
    {"src": "src/imports/audio/symbolReveal.mp3",   "id": "soundSymbolReveal"},
    
    // modules 
    {"src": "src/lib/Helper.js",                   "id": "Helper"},
    {"src": "src/lib/Scale.js",     	           "id": "Scale"},
    {"src": "src/lib/Sound.js",     	           "id": "Sound"},
    {"src": "src/lib/Pause.js",     	           "id": "Pause"},
    {"src": "src/lib/GameObject.js",     	       "id": "GameObject"},
    {"src": "src/lib/QueueManager.js",     	       "id": "QueueManager"},
    {"src": "src/lib/Match.js",     	           "id": "Match"},
    {"src": "src/lib/Ticket.js",     	           "id": "Ticket"},
    {"src": "src/lib/Calendar.js",     	           "id": "Calendar"},
    {"src": "src/lib/EndGame.js",                  "id": "EndGame"},
    {"src": "src/lib/MainGameLayout.js",     	   "id": "MainGameLayout"},
      
    // game baseClass
    {"src": "src/amfay.js", "id": "game_baseClass"}

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