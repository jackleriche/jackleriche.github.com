/**
 * \file MoneyBagSS.js
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
        MoneyBagSS = function () {
            //singletonCache
            if (typeof MoneyBagSS.instance !== "object") MoneyBagSS.instance = this;
            return MoneyBagSS.instance;
        },
        //make an instance if needed
        _MoneyBagSS = new MoneyBagSS();
    //add and set "next":false to stop on last frame
    //Static
    MoneyBagSS.VERSION = '0.0.1';
    MoneyBagSS.spriteSheet = {
"images": [images.moneyBagSS],
"frames": [
   [1370, 117, 112, 113],
    [1370, 2, 112, 113],
    [1256, 117, 112, 113],
    [1256, 2, 112, 113],
    [1142, 117, 112, 113],
    [1142, 2, 112, 113],
    [1028, 117, 112, 113],
    [1028, 2, 112, 113],
    [914, 117, 112, 113],
    [914, 2, 112, 113],
    [800, 117, 112, 113],
    [800, 2, 112, 113],
    [686, 117, 112, 113],
    [686, 2, 112, 113],
    [572, 117, 112, 113],
    [572, 2, 112, 113],
    [458, 117, 112, 113],
    [458, 2, 112, 113],
    [344, 117, 112, 113],
    [344, 2, 112, 113],
    [230, 117, 112, 113],
    [230, 2, 112, 113],
    [116, 117, 112, 113],
    [116, 2, 112, 113],
    [2, 117, 112, 113],
    [2, 2, 112, 113]
],
"animations": {
        "moneyBagReveal": {
            "frames": [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]
        },
         "moneyBagShadow": {
            "frames": [0]
        }
    }
    };
    MoneyBagSS.ss = null
    //private method
    iwg._class("iwg.lib.flassets.MoneyBagSS", MoneyBagSS);

}(window));
