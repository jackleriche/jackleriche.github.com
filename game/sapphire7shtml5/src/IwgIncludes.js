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
                
                // thirdParty
                {"src": "src/thirdParty/greensocks/TweenMax.min.js","id": "srcTweenMax"},
                {"src": "src/thirdParty/greensocks/TimelineLite.min.js","id": "srcTimeline"},
                {"src": "src/thirdParty/createjs/easeljs-0.8.0.min.js","id": "srceaseljs"},
                {"src": "src/thirdParty/hammer.min.js", "id": "Hammer"},
                {"src": "src/lib/Stats.js", "id": "Stats"},
                
                //images
                {"src": "src/imports/img/masterSS.png", "id": "masterSS"},
                {"src": "src/imports/img/buttonSS.png", "id": "buttonSS"},
                {"src": "src/imports/img/revealSS.png", "id": "revealSS"},
                {"src": "src/imports/img/sapphireSS.png", "id": "sapphireSS"},
                {"src": "src/imports/img/starSS.png", "id": "starSS"},
                {"src": "src/imports/img/bg.jpg", "id": "bg"},

                // sounds
                {"src": "src/imports/audio/Pop.mp3", "id": "pop"},
                {"src": "src/imports/audio/diamondRotationSound.mp3", "id": "diamondRotationSound"},
                {"src": "src/imports/audio/endLoseSound.mp3", "id": "endLoseSound"},
                {"src": "src/imports/audio/endWinSound.mp3", "id": "endWinSound"},
                {"src": "src/imports/audio/lenseFlare.mp3", "id": "lenseFlare"},
                {"src": "src/imports/audio/lineWinSound.mp3", "id": "lineWinSound"},
                {"src": "src/imports/audio/lineWinSound2.mp3", "id": "lineWinSound2"},
                
                // resources
                {"src": "src/lib/flassets/MasterSS.js", "id": "masterSS"},
               // {"src": "src/lib/flassets/bgSS.js", "id": "bgSS"},
                {"src": "src/lib/flassets/RevealSS.js", "id": "revealSS"},
                {"src": "src/lib/flassets/ButtonSS.js", "id": "buttonSS"},
                {"src": "src/lib/flassets/StarSS.js", "id": "starSS"},
                {"src": "src/lib/flassets/SapphireSS.js", "id": "sapphireSS"},
                {"src": "src/lib/MEvent.js", "id": "MEvent"},
                {"src": "src/lib/R.js", "id": "R"},
                {"src": "src/lib/Helper.js", "id": "Helper"},
                {"src": "src/lib/Animate.js", "id": "Animate"},                
                {"src": "src/lib/Swipe.js", "id": "Swipe"},
                {"src": "src/lib/Splash.js", "id": "Splash"},
                {"src": "src/lib/GameAssets.js", "id": "GameAsset"},
                {"src": "src/lib/MatchOne.js", "id": "MatchOne"},
                {"src": "src/lib/MainGameLayout.js", "id": "MainGameLayout"},                
                {"src": "src/lib/EndGame.js", "id": "EndGame"},
                
                // load game
                {"src": "src/lib/Ticket.js", "id": "Ticket" },
                
                {"src": "src/sapphire7s.js", "id": "Sapphire7s" }
                
            ];
        return _manifest;
    });
}(window));
