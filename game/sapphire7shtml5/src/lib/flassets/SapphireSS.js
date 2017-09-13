/**
 * \file Sapphire.js
 * \brief Button SpriteSheet assets from Flash.
 */


(function (window) {
    "use strict";
    //set local paths to external files
    var camelot = window.com.camelot,
        iwg = camelot.iwg,
        images = window.com.camelot.core.iwgLoadQ.images,
        SapphireSS = function () {
            //singletonCache
            if (typeof SapphireSS.instance !== "object") SapphireSS.instance = this;
            return SapphireSS.instance;
        },
        //make an instance if needed
        _SapphireSS = new SapphireSS();
    //add and set "next":false to stop on last frame
    //Static
    SapphireSS.VERSION = '0.0.1';
    SapphireSS.spriteSheet = {
        "images": [images.sapphireSS],
        "frames": [
            [2, 2, 102, 88, 0, 51, 44],
            [108, 2, 102, 88, 0, 51, 44],
            [532, 2, 101, 88, 0, 51, 44],
            [320, 2, 102, 88, 0, 51, 44],
            [426, 2, 102, 88, 0, 51, 44],
            [849, 2, 102, 88, 0, 51, 44],
            [637, 2, 102, 88, 0, 51, 44],
            [743, 2, 102, 88, 0, 51, 44],
            [955, 2, 102, 88, 0, 51, 44],
            [214, 2, 102, 88, 0, 51, 44],
            [1835, 2, 82, 68, 0, 41, 34],
            [1147, 2, 82, 68, 0, 41, 34],
            [1233, 2, 82, 68, 0, 41, 34],
            [1061, 2, 82, 68, 0, 41, 34],
            [1405, 2, 82, 68, 0, 41, 34],
            [1491, 2, 82, 68, 0, 41, 34],
            [1319, 2, 82, 68, 0, 41, 34],
            [1663, 2, 82, 68, 0, 41, 34],
            [1749, 2, 82, 68, 0, 41, 34],
            [1577, 2, 82, 68, 0, 41, 34]
        ],
        "animations": {
            "turnBig": {
                "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8],
                "next": "turnBigReverse"
            },
            "turnBigReverse": {
                "frames": [8, 7, 6, 5, 4, 3, 2, 1, 0],
                "next": "turnBig"

            }, 
            "turnSmall": {
                "frames": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
            }, 
            "all": {
                "frames": [9]
            }
        }     
    };
    SapphireSS.ss = new createjs.SpriteSheet(SapphireSS.spriteSheet);;
    //private method
    iwg._class("iwg.lib.flassets.SapphireSS", SapphireSS);

}(window));
