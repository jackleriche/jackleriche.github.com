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
            [1588, 214, 120, 104],
            [1588, 108, 120, 104],
            [1466, 214, 120, 104],
            [1466, 108, 120, 104],
            [1588, 2, 120, 104],
            [1466, 2, 120, 104],
            [1344, 214, 120, 104],
            [1344, 108, 120, 104],
            [1344, 2, 120, 104],
            [1222, 214, 120, 104],
            [1222, 108, 120, 104],
            [1222, 2, 120, 104],
            [1100, 214, 120, 104],
            [1100, 108, 120, 104],
            [1100, 2, 120, 104],
            [978, 214, 120, 104],
            [978, 108, 120, 104],
            [978, 2, 120, 104],
            [856, 214, 120, 104],
            [856, 108, 120, 104],
            [856, 2, 120, 104],
            [734, 214, 120, 104],
            [734, 108, 120, 104],
            [734, 2, 120, 104],
            [612, 214, 120, 104],
            [612, 108, 120, 104],
            [612, 2, 120, 104],
            [490, 214, 120, 104],
            [490, 108, 120, 104],
            [490, 2, 120, 104],
            [368, 214, 120, 104],
            [368, 108, 120, 104],
            [368, 2, 120, 104],
            [246, 214, 120, 104],
            [246, 108, 120, 104],
            [246, 2, 120, 104],
            [124, 214, 120, 104],
            [124, 108, 120, 104],
            [124, 2, 120, 104],
            [2, 214, 120, 104],
            [2, 108, 120, 104],
            [2, 2, 120, 104]
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
