/*jslint nomen: true, browser: true, plusplus: true, devel: true, vars:true, eqeq: true*/
/*global getManifest*/

(function (window) {
    "use strict";
    var iwg = window.com.camelot.iwg,
        _class = iwg._class,
        /**
         *
         * Include all your IWG scripts in this file.
         */
        getManifest = _class("core.LoadManifest", function () {
            var _manifest = [

    //thridParty
                {"src": "src/thirdParty/greensocks/TweenMax.min.js","id": "srcTweenMax"},
                {"src": "src/thirdParty/greensocks/TimelineLite.min.js","id": "srcTimeline"},
                {"src": "src/thirdParty/createjs/easeljs-0.6.1.min.js","id": "srceaseljs"},
                {"src": "src/thirdParty/hammer.min.js","id": "hammer"},
                {"src": "src/thirdParty/createjs/preload.js", "id": "preload"},
                {"src": "src/thirdParty/createjs/soundjs-NEXT.min.js", "id": "sound"},

                //images
                {"src": "src/imports/img/exports/masterSS.png","id": "masterSS"},
                {"src": "src/imports/img/exports/bg.jpg", "id": "bg"},
                {"src": "src/imports/img/exports/confetti.png", "id": "confetti"},
                {"src": "src/imports/img/exports/moneyClip.png", "id": "moneyClipSS"},
                {"src": "src/imports/img/exports/moneyBag.png", "id": "moneyBagSS"},
                {"src": "src/imports/img/exports/diamond.png", "id": "diamondSS"},
                {"src": "src/imports/img/exports/pound.png", "id": "poundSS"},
                {"src": "src/imports/img/exports/wadSS.png", "id": "WadSS"},
                {"src": "src/imports/img/exports/coin.png", "id": "CoinSS"},
                {"src": "src/imports/img/exports/confetti_colours.png", "id": "ConfettiSS"},

                // sounds
                {"src": "src/imports/audio/Pop.mp3", "id": "pop"},
                {"src": "src/imports/audio/endLose.mp3", "id": "endLose"},
                {"src": "src/imports/audio/endWin.mp3", "id": "endWin"},
                {"src": "src/imports/audio/equalsSevenReveal.mp3", "id": "equalsSevenReveal"},
                {"src": "src/imports/audio/cashBundle.wav", "id": "cashBundle"},
                {"src": "src/imports/audio/matchOneReveal.mp3", "id": "matchOneReveal"},
                {"src": "src/imports/audio/prizeReveal.wav", "id": "prizeReveal"},
                {"src": "src/imports/audio/rowWin.mp3", "id": "rowWin"},
                {"src": "src/imports/audio/weightReveal.mp3", "id": "weightReveal"},


                // Resources
                {"src": "src/lib/flassets/MasterSS.js", "id": "masterSS"},
                {"src": "src/lib/flassets/MoneyClipSS.js", "id": "moneyClipSS"},
                {"src": "src/lib/flassets/MoneyBagSS.js", "id": "moneyBagSS"},
                {"src": "src/lib/flassets/DiamondSS.js", "id": "diamondSS"},
                {"src": "src/lib/flassets/PoundSS.js", "id": "poundSS"},
                {"src": "src/lib/flassets/WadSS.js", "id": "wadSS"},
                {"src": "src/lib/flassets/CoinSS.js", "id": "coinSS"},
                {"src": "src/lib/flassets/ConfettiSS.js", "id": "ConfettiSS"},
                {"src": "src/lib/MEvent.js", "id": "MEvent"},
                {"src": "src/lib/R.js", "id": "R"},
                {"src": "src/lib/Helper.js", "id": "Helper"},
                {"src": "src/lib/Swipe.js", "id": "Swipe"},
                {"src": "src/lib/Splash.js", "id": "Splash"},
                {"src": "src/lib/MainGameLayout.js", "id": "MainGameLayout"},
                {"src": "src/lib/GameAssets.js", "id": "GameAssets"},
                {"src": "src/lib/Confetti.js", "id": "Confetti"},


                // ticket
                {"src": "src/lib/Ticket.js", "id": "Ticket"},

                // Games
                {"src": "src/lib/MatchTwo.js", "id": "MatchTwo"},
                {"src": "src/lib/EqualsSeven.js", "id": "EqualsSeven"},
                {"src": "src/lib/MatchOne.js", "id": "MatchOne"},
                {"src": "src/lib/DoubleMatch.js", "id": "DoubleMatch"},
                {"src": "src/lib/Weight.js", "id": "Weight"},
                {"src": "src/lib/EndGame.js", "id": "EndGame"},

                // Main Game Class 
                {"src": "src/Millionaire7s.js", "id": "Millionaire7s"}

            ];
            return _manifest;
        });
}(window));