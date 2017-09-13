/**
 * \file CoinSS.js
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
        CoinSS = function () {
            //singletonCache
            if (typeof CoinSS.instance !== "object") CoinSS.instance = this;
            return CoinSS.instance;
        },
        //make an instance if needed
        _CoinSS = new CoinSS();
    //add and set "next":false to stop on last frame
    //Static
    CoinSS.VERSION = '0.0.1';
    CoinSS.spriteSheet = {
        "images": [images.CoinSS],
        "frames": [

    [1018, 256, 125, 125], 
    [891, 383, 125, 125], 
    [891, 256, 125, 125], 
    [1018, 129, 125, 125], 
    [891, 129, 125, 125], 
    [764, 383, 125, 125], 
    [764, 256, 125, 125], 
    [764, 129, 125, 125], 
    [1018, 2, 125, 125], 
    [891, 2, 125, 125], 
    [764, 2, 125, 125], 
    [637, 383, 125, 125], 
    [637, 256, 125, 125], 
    [637, 129, 125, 125], 
    [637, 2, 125, 125], 
    [510, 383, 125, 125], 
    [510, 256, 125, 125], 
    [510, 129, 125, 125], 
    [510, 2, 125, 125], 
    [383, 383, 125, 125], 
    [383, 256, 125, 125], 
    [383, 129, 125, 125], 
    [383, 2, 125, 125], 
    [256, 383, 125, 125], 
    [256, 256, 125, 125], 
    [256, 129, 125, 125], 
    [256, 2, 125, 125], 
    [129, 383, 125, 125], 
    [129, 256, 125, 125], 
    [129, 129, 125, 125], 
    [129, 2, 125, 125], 
    [2, 383, 125, 125], 
    [2, 256, 125, 125], 
    [2, 129, 125, 125], 
    [2, 2, 125, 125]
],
        "animations": {
            "coinReveal": {
                "frames": [0, 1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33, 34]
            },
            "coinReminder": {
                "frames": [0,0,1, 1,2, 2,3, 3,4, 4,5,5,6,6,7,7,7,7,6,6,5,5,4,4,3, 3 ,2,2,1, 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            },
            "coinReset": {
                "frames": [7,7,6,6,5,5,4,4,3, 3 ,2,2,1, 1,0,0]
            }
        }
    };
    CoinSS.ss = null
    //private method
    iwg._class("iwg.lib.flassets.CoinSS", CoinSS);

}(window));