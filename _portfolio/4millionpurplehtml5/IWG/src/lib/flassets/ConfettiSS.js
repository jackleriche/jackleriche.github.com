/**
 * \file ConfettiSS.js
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
        ConfettiSS = function () {
            //singletonCache
            if (typeof ConfettiSS.instance !== "object") ConfettiSS.instance = this;
            return ConfettiSS.instance;
        },
        //make an instance if needed
        _ConfettiSS = new ConfettiSS();
    //add and set "next":false to stop on last frame
    //Static
    ConfettiSS.VERSION = '0.0.1';
    ConfettiSS.spriteSheet = {
        "images": [images.ConfettiSS],
        "frames": [
            [440, 2, 35, 18, 0, 18, 9],
            [162, 2, 36, 19, 0, 19, 10],
            [202, 2, 36, 19, 0, 18, 10],
            [833, 2, 34, 17, 0, 16, 8],
            [1136, 2, 32, 16, 0, 14, 7],
            [1274, 2, 25, 13, 0, 12, 9],
            [1332, 2, 29, 13, 0, 15, 9],
            [1206, 2, 30, 14, 0, 14, 9],
            [1058, 2, 35, 16, 0, 20, 9],
            [637, 2, 35, 18, 0, 19, 9],
            [754, 2, 36, 18, 0, 20, 9],
            [597, 2, 36, 18, 0, 18, 9],
            [676, 2, 35, 18, 0, 18, 9],
            [794, 2, 35, 18, 0, 18, 9],
            [2, 2, 36, 19, 0, 19, 10],
            [42, 2, 36, 19, 0, 18, 10],
            [871, 2, 34, 17, 0, 16, 8],
            [1022, 2, 32, 16, 0, 14, 7],
            [1303, 2, 25, 13, 0, 12, 9],
            [1427, 2, 29, 13, 0, 15, 9],
            [1240, 2, 30, 14, 0, 14, 9],
            [1097, 2, 35, 16, 0, 20, 9],
            [715, 2, 35, 18, 0, 19, 9],
            [400, 2, 36, 18, 0, 20, 9],
            [557, 2, 36, 18, 0, 18, 9],
            [518, 2, 35, 18, 0, 18, 9],
            [479, 2, 35, 18, 0, 18, 9],
            [122, 2, 36, 19, 0, 19, 10],
            [82, 2, 36, 19, 0, 18, 10],
            [909, 2, 34, 17, 0, 16, 8],
            [986, 2, 32, 16, 0, 14, 7],
            [1398, 2, 25, 13, 0, 12, 9],
            [1365, 2, 29, 13, 0, 15, 9],
            [1172, 2, 30, 14, 0, 14, 9],
            [947, 2, 35, 16, 0, 20, 9],
            [242, 2, 35, 18, 0, 19, 9],
            [281, 2, 36, 18, 0, 20, 9],
            [321, 2, 36, 18, 0, 18, 9],
            [361, 2, 35, 18, 0, 18, 9]
        ],
    "animations": {
    "blueOrig": {"frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]},
    "blue": {"frames": [5, 4,3,2,1,0,11,10,9,8,7,6]},
    "yellowOrig": {"frames": [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]},
    "yellow": {"frames": [18,17,16,15,14,13,24,23,22,21,20,19]},
     "byp": {"frames": [5,4,3,2,1,0,11,10,9,8,7,6,18,17,16,15,14,13,24,23,22,21,20,19,32,31,30,29,28,27,26,38,37,36,35,34,33]},
     "ypb": {"frames": [18,17,16,15,14,13,24,23,22,21,20,19,32,31,30,29,28,27,26,38,37,36,35,34,33,5, 4,3,2,1,0,11,10,9,8,7,6]},
     "pby": {"frames": [32,31,30,29,28,27,26,38,37,36,35,34,33,5, 4,3,2,1,0,11,10,9,8,7,6,18,17,16,15,14,13,24,23,22,21,20,19]},
     "purpleOrig": {"frames": [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38]},
     "purple": {"frames": [32,31,30,29,28,27,26,38,37,36,35,34,33]}
    }
    };
    ConfettiSS.ss = null
    //private method
    iwg._class("iwg.lib.flassets.ConfettiSS", ConfettiSS);

}(window));
