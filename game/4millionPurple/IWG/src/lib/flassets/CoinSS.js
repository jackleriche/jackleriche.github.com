/**
 * \file CoinSS.js
 * \brief Master SpriteSheet assets from Flash.
 * - EndMessBut
 * - endMessBG
 * - logo
 * - instructions
 */


(function (window) {
    "use strict";
    //set local paths to external files
    var camelot = window.com.camelot,
        iwg = camelot.iwg,
        images = window.com.camelot.core.iwgLoadQ.images,
        CoinSS = function () {
            //singletonCache
            if (typeof CoinSS.instance !== "object") CoinSS.instance = this;
            return CoinSS.instance;
        },
        //make an instance if needed
        _CoinSS = new CoinSS();
    //add and set "next":false to stop on last frame
    //Static
    CoinSS.VERSION = '0.0.1';
    CoinSS.spriteSheet = {
        "images": [images.CoinSS],
        "frames": [
            [1465, 141, 131, 137], 
            [1332, 280, 131, 137], 
            [1332, 141, 131, 137], 
            [1199, 280, 131, 137], 
            [1199, 141, 131, 137], 
            [1465, 2, 131, 137], 
            [1332, 2, 131, 137], 
            [1199, 2, 131, 137], 
            [1066, 280, 131, 137], 
            [1066, 141, 131, 137], 
            [1066, 2, 131, 137], 
            [933, 280, 131, 137], 
            [933, 141, 131, 137], 
            [933, 2, 131, 137], 
            [800, 280, 131, 137], 
            [800, 141, 131, 137], 
            [800, 2, 131, 137], 
            [667, 280, 131, 137], 
            [667, 141, 131, 137], 
            [667, 2, 131, 137], 
            [534, 280, 131, 137], 
            [534, 141, 131, 137], 
            [534, 2, 131, 137], 
            [401, 280, 131, 137], 
            [401, 141, 131, 137], 
            [401, 2, 131, 137], 
            [268, 280, 131, 137], 
            [268, 141, 131, 137], 
            [268, 2, 131, 137], 
            [135, 280, 131, 137], 
            [135, 141, 131, 137], 
            [135, 2, 131, 137], 
            [2, 280, 131, 137], 
            [2, 141, 131, 137], 
            [2, 2, 131, 137]
        ],
        "animations": {
            "coinReveal": {
                "frames": [0, 1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33]
            }
        }
    };
    CoinSS.ss = null
    //private method
    iwg._class("iwg.lib.flassets.CoinSS", CoinSS);

}(window));