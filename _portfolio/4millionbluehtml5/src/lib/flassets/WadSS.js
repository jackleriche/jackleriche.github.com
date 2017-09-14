/**
 * \file WadSS.js
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
        WadSS = function () {
            //singletonCache
            if (typeof WadSS.instance !== "object") WadSS.instance = this;
            return WadSS.instance;
        },
        //make an instance if needed
        _WadSS = new WadSS();
    //add and set "next":false to stop on last frame
    //Static
    WadSS.VERSION = '0.0.1';
    WadSS.spriteSheet = {
        "images": [images.WadSS],
        "frames": [
            [1100, 368, 120, 120], 
            [1100, 246, 120, 120], 
            [978, 368, 120, 120], 
            [978, 246, 120, 120], 
            [1100, 124, 120, 120], 
            [978, 124, 120, 120], 
            [856, 368, 120, 120], 
            [856, 246, 120, 120], 
            [856, 124, 120, 120], 
            [1100, 2, 120, 120], 
            [978, 2, 120, 120], 
            [856, 2, 120, 120], 
            [734, 368, 120, 120], 
            [734, 246, 120, 120], 
            [734, 124, 120, 120], 
            [734, 2, 120, 120], 
            [612, 368, 120, 120], 
            [612, 246, 120, 120], 
            [612, 124, 120, 120], 
            [612, 2, 120, 120], 
            [490, 368, 120, 120], 
            [490, 246, 120, 120], 
            [490, 124, 120, 120], 
            [490, 2, 120, 120], 
            [368, 368, 120, 120], 
            [368, 246, 120, 120], 
            [368, 124, 120, 120], 
            [368, 2, 120, 120], 
            [246, 368, 120, 120], 
            [246, 246, 120, 120], 
            [246, 124, 120, 120], 
            [246, 2, 120, 120], 
            [124, 368, 120, 120], 
            [124, 246, 120, 120], 
            [124, 124, 120, 120], 
            [124, 2, 120, 120], 
            [2, 368, 120, 120], 
            [2, 246, 120, 120], 
            [2, 124, 120, 120], 
            [2, 2, 120, 120], 
            [2, 2, 120, 120]
        ],
        "animations": {
            "wadReveal": {
                "frames": [0, 1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]
            },
            "wadShadow":{
                "frames": [41]
            }
        }
    };
    WadSS.ss = null
    //private method
    iwg._class("iwg.lib.flassets.WadSS", WadSS);

}(window));