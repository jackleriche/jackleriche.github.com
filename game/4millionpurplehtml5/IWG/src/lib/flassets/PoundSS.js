/**
 * \file PoundSS.js
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
        PoundSS = function () {
            //singletonCache
            if (typeof PoundSS.instance !== "object") PoundSS.instance = this;
            return PoundSS.instance;
        },
        //make an instance if needed
        _MoneyBagSS = new PoundSS();
    //add and set "next":false to stop on last frame
    //Static
    PoundSS.VERSION = '0.0.1';
    PoundSS.spriteSheet = {
        "images": [images.poundSS],
        "frames": [
                [1685, 111, 97, 107],
                [1685, 2, 97, 107],
                [1586, 111, 97, 107],
                [1586, 2, 97, 107],
                [1487, 111, 97, 107],
                [1487, 2, 97, 107],
                [1388, 111, 97, 107],
                [1388, 2, 97, 107],
                [1289, 111, 97, 107],
                [1289, 2, 97, 107],
                [1190, 111, 97, 107],
                [1190, 2, 97, 107],
                [1091, 111, 97, 107],
                [1091, 2, 97, 107],
                [992, 111, 97, 107],
                [992, 2, 97, 107],
                [893, 111, 97, 107],
                [893, 2, 97, 107],
                [794, 111, 97, 107],
                [794, 2, 97, 107],
                [695, 111, 97, 107],
                [695, 2, 97, 107],
                [596, 111, 97, 107],
                [596, 2, 97, 107],
                [497, 111, 97, 107],
                [497, 2, 97, 107],
                [398, 111, 97, 107],
                [398, 2, 97, 107],
                [299, 111, 97, 107],
                [299, 2, 97, 107],
                [200, 111, 97, 107],
                [200, 2, 97, 107],
                [101, 111, 97, 107],
                [101, 2, 97, 107],
                [2, 111, 97, 107],
                [2, 2, 97, 107]
        ],
        "animations": {
        "poundReveal": {
            "frames": [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35]
        }
    }
    };
    PoundSS.ss = null
    //private method
    iwg._class("iwg.lib.flassets.PoundSS", PoundSS);
}(window));
