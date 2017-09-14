/**
 * \file MoneyClipSS.js
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
        MoneyClipSS = function () {
            //singletonCache
            if (typeof MoneyClipSS.instance !== "object") MoneyClipSS.instance = this;
            return MoneyClipSS.instance;
        },
        //make an instance if needed
        _MoneyClipSS = new MoneyClipSS();
    //add and set "next":false to stop on last frame
    //Static
    MoneyClipSS.VERSION = '0.0.1';
    MoneyClipSS.spriteSheet = {
"images": [images.moneyClipSS],
"frames": [

   [1674, 266, 150, 130],
    [1674, 266, 150, 130],
    [1674, 266, 150, 130],
    [1674, 266, 150, 130],
    [1674, 266, 150, 130],
    [1522, 266, 150, 130],
    [1674, 134, 150, 130],
    [1522, 134, 150, 130],
    [1674, 2, 150, 130],
    [1522, 2, 150, 130],
    [1370, 266, 150, 130],
    [1370, 134, 150, 130],
    [1370, 2, 150, 130],
    [1218, 266, 150, 130],
    [1218, 134, 150, 130],
    [1218, 2, 150, 130],
    [1066, 266, 150, 130],
    [1066, 134, 150, 130],
    [1066, 2, 150, 130],
    [914, 266, 150, 130],
    [914, 134, 150, 130],
    [914, 2, 150, 130],
    [762, 266, 150, 130],
    [762, 134, 150, 130],
    [762, 2, 150, 130],
    [610, 266, 150, 130],
    [610, 134, 150, 130],
    [610, 2, 150, 130],
    [458, 266, 150, 130],
    [458, 134, 150, 130],
    [458, 2, 150, 130],
    [306, 266, 150, 130],
    [306, 134, 150, 130],
    [306, 2, 150, 130],
    [154, 266, 150, 130],
    [154, 134, 150, 130],
    [154, 2, 150, 130],
    [2, 266, 150, 130],
    [2, 134, 150, 130],
    [2, 2, 150, 130]
],

"animations": {
        "moneyClipReveal": {
            "frames": [0, 1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39]
        }
    }
    };
    MoneyClipSS.ss = null
    //private method
    iwg._class("iwg.lib.flassets.MoneyClipSS", MoneyClipSS);

}(window));
