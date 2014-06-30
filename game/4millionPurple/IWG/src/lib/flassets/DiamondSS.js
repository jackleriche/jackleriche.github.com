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
            [1172, 105, 115, 101], 
            [1289, 2, 115, 101], 
            [1172, 2, 115, 101], 
            [1055, 105, 115, 101], 
            [1055, 2, 115, 101], 
            [938, 105, 115, 101], 
            [938, 2, 115, 101], 
            [821, 105, 115, 101], 
            [821, 2, 115, 101], 
            [704, 105, 115, 101], 
            [704, 2, 115, 101], 
            [587, 105, 115, 101], 
            [587, 2, 115, 101], 
            [470, 105, 115, 101], 
            [470, 2, 115, 101], 
            [353, 105, 115, 101], 
            [353, 2, 115, 101], 
            [236, 105, 115, 101], 
            [236, 2, 115, 101], 
            [119, 105, 115, 101], 
            [119, 2, 115, 101], 
            [2, 105, 115, 101], 
            [2, 2, 115, 101]
        ],
        "animations": {
            "diamondReveal": {
                "frames": [0, 1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]
            }
        }
    };
    DiamondSS.ss = null
    //private method
    iwg._class("iwg.lib.flassets.DiamondSS", DiamondSS);

}(window));