/**
 * \file MasterSS.js
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
        bgSS = function () {
            //singletonCache
            if (typeof bgSS.instance !== "object") bgSS.instance = this;
            return bgSS.instance;
        },
        //make an instance if needed
        _bgSS = new bgSS();
    //add and set "next":false to stop on last frame
    //Static
    bgSS.VERSION = '0.0.1';
    bgSS.spriteSheet = {
        "images": [images.bgSS],
        "frames": [
            [644, 972, 640, 960], 
            [2, 2, 648, 968], 
            [652, 2, 616, 902], 
            [2, 972, 640, 960]
        ],
        "animations": {
            "bg":[0], 
            "bg_innerglow":[1], 
            "bg_sapphires_1":[2], 
            "bg_stars":[3]
        }
    };
    bgSS.ss = new createjs.SpriteSheet(bgSS.spriteSheet);
    
    //private method
    iwg._class("iwg.lib.flassets.bgSS", bgSS);

}(window));
