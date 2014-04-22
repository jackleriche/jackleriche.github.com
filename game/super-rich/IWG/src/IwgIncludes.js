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
                {
                    "src": "src/thirdParty/greensocks/TweenMax.min.js",
                    "id": "srcTweenMax"
                },
                {
                    "src": "src/thirdParty/createJS/easeljs-0.6.1.min.js",
                    "id": "srceaseljs"
                },
                {
                    "src": "src/thirdParty/hammer.min.js",
                    "id": "hammer"
                },
                {
                    "src": "src/thirdParty/createJS/preload.js",
                    "id": "preload"
                },

                //sounds
                {
                    "src": "src/imports/audio/glossy_success_19.mp3",
                    "id": "glossy_success_19"
                },
                {
                    "src": "src/imports/audio/Level_fail.mp3",
                    "id": "Level_fail"
                },
                {
                    "src": "src/imports/audio/Pop.mp3",
                    "id": "Pop"
                },
                {
                    "src": "src/imports/audio/Win_zing.mp3",
                    "id": "Win_zing"
                },

                //images
                {
                    "src": "src/imports/img/masterSS.min.png",
                    "id": "masterSS"
                },
                {
                    "src": "src/imports/img/bg_tile.png",
                    "id": "bgTile"
                },

    // classes
                {
                    "src": "src/lib/flassets/MasterSS.js",
                    "id": "masterSS"
                },
                {
                    "src": "src/lib/R.js",
                    "id": "R"
                },
                {
                    "src": "src/lib/Helper.js",
                    "id": "helper"
                },
                {
                    "src": "src/lib/MEvent.js",
                    "id": "events"
                },
                {
                    "src": "src/lib/GameAsset.js",
                    "id": "GameAsset"
                },

    // ticket
                {
                    "src": "src/lib/Ticket.js",
                    "id": "Ticket"
                },

                {
                    "src": "src/lib/ParallaxBG.js",
                    "id": "ParallaxBG"
                },
                {
                    "src": "src/lib/Swipe.js",
                    "id": "Swipe"
                },
                {
                    "src": "src/lib/Splash.js",
                    "id": "Splash"
                },
                {
                    "src": "src/lib/MainGameLayout.js",
                    "id": "MainGameLayout"
                },
                {
                    "src": "src/lib/MatchOne.js",
                    "id": "MatchOne"
                },
                {
                    "src": "src/lib/MatchTwo.js",
                    "id": "MatchTwo"
                },
                {
                    "src": "src/lib/EqualsSeven.js",
                    "id": "EqualsSeven"
                },
                {
                    "src": "src/lib/EndGame.js",
                    "id": "EndGame"
                },
                {
                    "src": "src/Superrich.js",
                    "id": "Superrich"
                }
    ];
            return _manifest;
        });
}(window));