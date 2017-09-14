/**
 * \file DiamondSS.js
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
        DiamondSS = function () {
            //singletonCache
            if (typeof DiamondSS.instance !== "object") DiamondSS.instance = this;
            return DiamondSS.instance;
        },
        //make an instance if needed
        _DiamondSS = new DiamondSS();
    //add and set "next":false to stop on last frame
    //Static
    DiamondSS.VERSION = '0.0.1';
    DiamondSS.spriteSheet = {
        "images": [images.diamondSS],
         "frames": [
            [308, 308, 100, 100], 
            [410, 206, 100, 100], 
            [308, 206, 100, 100], 
            [206, 410, 100, 100], 
            [206, 308, 100, 100], 
            [206, 206, 100, 100], 
            [410, 104, 100, 100], 
            [308, 104, 100, 100], 
            [206, 104, 100, 100], 
            [104, 410, 100, 100], 
            [104, 308, 100, 100], 
            [104, 206, 100, 100], 
            [104, 104, 100, 100], 
            [410, 2, 100, 100], 
            [308, 2, 100, 100], 
            [206, 2, 100, 100], 
            [104, 2, 100, 100], 
            [2, 410, 100, 100], 
            [2, 308, 100, 100], 
            [2, 206, 100, 100], 
            [2, 104, 100, 100], 
            [2, 2, 100, 100]
        ],
        "animations": {
            "diamondReveal": {
                "frames": [0, 1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]
            }
        }
    };
    DiamondSS.ss = null
    //private method
    iwg._class("iwg.lib.flassets.DiamondSS", DiamondSS);

}(window));