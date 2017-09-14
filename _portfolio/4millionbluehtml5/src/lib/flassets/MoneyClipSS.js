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

    [1674, 154, 150, 150], 
    [1674, 154, 150, 150], 
    [1674, 154, 150, 150], 
    [1674, 154, 150, 150], 
    [1674, 154, 150, 150], 
    [1522, 306, 150, 150], 
    [1522, 154, 150, 150], 
    [1674, 2, 150, 150], 
    [1522, 2, 150, 150], 
    [1370, 306, 150, 150], 
    [1370, 154, 150, 150], 
    [1370, 2, 150, 150], 
    [1218, 306, 150, 150], 
    [1218, 154, 150, 150], 
    [1218, 2, 150, 150], 
    [1066, 306, 150, 150], 
    [1066, 154, 150, 150], 
    [1066, 2, 150, 150], 
    [914, 306, 150, 150], 
    [914, 154, 150, 150], 
    [914, 2, 150, 150], 
    [762, 306, 150, 150], 
    [762, 154, 150, 150], 
    [762, 2, 150, 150], 
    [610, 306, 150, 150], 
    [610, 154, 150, 150], 
    [610, 2, 150, 150], 
    [458, 306, 150, 150], 
    [458, 154, 150, 150], 
    [458, 2, 150, 150], 
    [306, 306, 150, 150], 
    [306, 154, 150, 150], 
    [306, 2, 150, 150], 
    [154, 306, 150, 150], 
    [154, 154, 150, 150], 
    [154, 2, 150, 150], 
    [2, 306, 150, 150], 
    [2, 154, 150, 150], 
    [2, 2, 150, 150], 
    [2, 2, 150, 150]
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