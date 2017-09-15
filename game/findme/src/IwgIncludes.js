/*jslint nomen: true, browser: true, plusplus: true, devel: true, vars:true, eqeq: true*/

var _manifest = [

    // third party
    {"src": "src/thirdParty/easeljs-0.8.0.min.js", "id": "easelJS"},
    {"src": "src/thirdParty/TweenMax.min.js", "id": "TweenMax"},
    {"src": "src/thirdParty/TimelineMax.min.js", "id": "TimeLineMax"},

    // reference
    {"src": "src/imports/js/iconRef.js", "id": "iconRef"},
    {"src": "src/imports/js/iconType.js", "id": "iconType"},

    // fonts
    {"src": "src/imports/fonts/KOMIKAX-webfont.eot",   "id": "KOMIKAX-webfont.eot"},
    {"src": "src/imports/fonts/KOMIKAX-webfont.svg",   "id": "KOMIKAX-webfont.svg"},
    {"src": "src/imports/fonts/KOMIKAX-webfont.woff",  "id": "KOMIKAX-webfont.woff"},
    {"src": "src/imports/fonts/KOMIKAX-webfont.woff2", "id": "KOMIKAX-webfont.woff2"},
    {"src": "src/imports/fonts/KOMIKAX-webfont.ttf",   "id": "KOMIKAX-webfont.ttf"},

    // images
    {"src": "src/imports/img/MasterSS.png",             "id": "masterSS"},
    {"src": "src/lib/flassets/MasterSS.js",             "id": "masterSS"},
    {"src": "src/imports/img/BackgroundSS.png",         "id": "backgroundSS"},
    {"src": "src/lib/flassets/BackgroundSS.js",         "id": "backgroundSS"},

    // sounds
    {"src": "src/imports/audio/backgroundLoop.mp3",     "id": "backgroundLoop"},
    {"src": "src/imports/audio/bankSymbol.mp3",         "id": "bankSymbol"},
    {"src": "src/imports/audio/bonusStars.mp3",         "id": "bonusStars"},
    {"src": "src/imports/audio/bubblePop.mp3",          "id": "bubblePop"},
    {"src": "src/imports/audio/endLose.mp3",            "id": "endLose"},
    {"src": "src/imports/audio/endWin.mp3",             "id": "endWin"},
    {"src": "src/imports/audio/incorrectBubble.mp3",    "id": "incorrectBubble"},
    {"src": "src/imports/audio/lineWin.mp3",            "id": "lineWin"},
    {"src": "src/imports/audio/newBubble.mp3",          "id": "newBubble"},
    {"src": "src/imports/audio/newWord.mp3",            "id": "newWord"},
    {"src": "src/imports/audio/startButton.mp3",        "id": "startButton"},
    {"src": "src/imports/audio/symbolReveal.mp3",       "id": "symbolReveal"},
    {"src": "src/imports/audio/symbolSpin.mp3",         "id": "symbolSpin"},
    {"src": "src/imports/audio/trophyWin.mp3",          "id": "trophyWin"},
    {"src": "src/imports/audio/trophyWobble.mp3",       "id": "trophyWobble"},
    {"src": "src/imports/audio/whoosh.mp3",             "id": "whoosh"},

    // resources
    {"src": "src/lib/Ticket.js", "id": "Ticket"},
    {"src": "src/lib/Helper.js", "id": "Helper"},
    {"src": "src/lib/Sound.js", "id": "Sound"},
    {"src": "src/lib/GameObject.js", "id": "GameObject"},
    {"src": "src/lib/Legend.js", "id": "Legend"},
    {"src": "src/lib/Bubble.js", "id": "Bubble"},
    {"src": "src/lib/Board.js", "id": "Board"},
    {"src": "src/lib/WordBubble.js", "id": "WordBubble"},
    {"src": "src/lib/Overlay.js", "id": "Overlay"},
    {"src": "src/lib/Timer.js", "id": "Timer"},
    {"src": "src/lib/EndGame.js", "id": "EndGame"},
    {"src": "src/lib/Instruction.js", "id": "Instruction"},
    {"src": "src/lib/PrizeTable.js", "id": "PrizeTable"},
    {"src": "src/lib/Pause.js", "id": "Board"},
    {"src": "src/lib/MainGameLayout.js", "id": "MainGameLayout"},

    // game
    {"src": "src/FindMe.js", "id": "FindMe"}

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
