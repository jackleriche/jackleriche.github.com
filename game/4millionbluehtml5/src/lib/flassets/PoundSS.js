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

    [875, 196, 95, 95], 
    [778, 196, 95, 95], 
    [681, 390, 95, 95], 
    [681, 293, 95, 95], 
    [681, 196, 95, 95], 
    [875, 99, 95, 95], 
    [778, 99, 95, 95], 
    [681, 99, 95, 95], 
    [584, 390, 95, 95], 
    [584, 293, 95, 95], 
    [584, 196, 95, 95], 
    [584, 99, 95, 95], 
    [875, 2, 95, 95], 
    [778, 2, 95, 95], 
    [681, 2, 95, 95], 
    [584, 2, 95, 95], 
    [487, 390, 95, 95], 
    [487, 293, 95, 95], 
    [487, 196, 95, 95], 
    [487, 99, 95, 95], 
    [487, 2, 95, 95], 
    [390, 390, 95, 95], 
    [390, 293, 95, 95], 
    [390, 196, 95, 95], 
    [390, 99, 95, 95], 
    [390, 2, 95, 95], 
    [293, 390, 95, 95], 
    [293, 293, 95, 95], 
    [293, 196, 95, 95], 
    [293, 99, 95, 95], 
    [293, 2, 95, 95], 
    [196, 390, 95, 95], 
    [196, 293, 95, 95], 
    [196, 196, 95, 95], 
    [196, 99, 95, 95], 
    [196, 2, 95, 95], 
    [99, 390, 95, 95], 
    [99, 293, 95, 95], 
    [99, 196, 95, 95], 
    [99, 99, 95, 95], 
    [99, 2, 95, 95], 
    [2, 390, 95, 95], 
    [2, 293, 95, 95], 
    [2, 196, 95, 95], 
    [2, 99, 95, 95], 
    [2, 2, 95, 95]
],
        "animations": {    
        "poundReveal": {
            "frames": [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45]
        }
    }
    };
    PoundSS.ss = null
    //private method
    iwg._class("iwg.lib.flassets.PoundSS", PoundSS);
}(window));