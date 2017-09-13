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
                {"src": "src/thirdParty/createjs/easeljs-0.6.1.min.js","id": "srceaseljs"},
                {"src": "src/thirdParty/hammer.min.js", "id": "Hammer"},

                //images
                {"src": "src/imports/img/masterSS.png", "id": "masterSS"},
                {"src": "src/imports/img/poundSS.png", "id": "poundSS"},

                // sounds
                {"src": "src/imports/audio/Pop.mp3", "id": "pop"},
                {"src": "src/imports/audio/endLose.mp3", "id": "endLose"},
                {"src": "src/imports/audio/endWin.mp3", "id": "endWin"},
                {"src": "src/imports/audio/lineWin.mp3", "id": "lineWin"},
                {"src": "src/imports/audio/game2.mp3", "id": "reveal"},

                // resources
                {"src": "src/lib/flassets/MasterSS.js", "id": "masterSS"},
                {"src": "src/lib/flassets/PoundSS.js", "id": "poundSS"},
                {"src": "src/lib/MEvent.js", "id": "MEvent"},
                {"src": "src/lib/R.js", "id": "R"},
                {"src": "src/lib/Helper.js", "id": "Helper"},
                {"src": "src/lib/Animate.js", "id": "Animate"},
                {"src": "src/lib/Swipe.js", "id": "Swipe"},
                {"src": "src/lib/Splash.js", "id": "Splash"},
                {"src": "src/lib/MainGameLayout.js", "id": "MainGameLayout"},
                {"src": "src/lib/GameAssets.js", "id": "GameAsset"},
                {"src": "src/lib/MatchGrid.js", "id": "MatchGrid"},
                {"src": "src/lib/EndGame.js", "id": "EndGame"},

                // load game
                {"src": "src/lib/Ticket.js", "id": "Ticket" },
                {"src": "src/Yellow100k.js", "id": "Yellow100k" }
             ];
        return _manifest;
    });
}(window));
