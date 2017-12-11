/**
 * \file ButtonSS.js
 * \brief Button SpriteSheet assets from Flash.
 */


(function (window) {
    "use strict";
    //set local paths to external files
    var camelot = window.com.camelot,
        iwg = camelot.iwg,
        images = window.com.camelot.core.iwgLoadQ.images,
        RevealSS = function () {
            //singletonCache
            if (typeof RevealSS.instance !== "object") RevealSS.instance = this;
            return RevealSS.instance;
        },
        //make an instance if needed
        _RevealSS = new RevealSS();
    //add and set "next":false to stop on last frame
    //Static
    RevealSS.VERSION = '0.0.1';
    RevealSS.spriteSheet = {
        "images": [images.revealSS],
        "frames": [
            [1103, 2, 83, 83, 0, 38, 35],
            [472, 2, 87, 87, 0, 37, 39],
            [97, 2, 89, 90, 0, 40, 44],
            [379, 2, 89, 89, 0, 43, 43],
            [654, 2, 87, 86, 0, 42, 38],
            [563, 2, 87, 87, 0, 39, 38],
            [284, 2, 91, 90, 0, 40, 43],
            [2, 2, 91, 91, 0, 43, 45],
            [190, 2, 90, 90, 0, 44, 42],
            [745, 2, 86, 86, 0, 40, 37],
            [835, 2, 86, 86, 0, 40, 37],
            [925, 2, 86, 85, 0, 22, 32],
            [1015, 2, 84, 84, 0, 9, 18],
            [1190, 2, 79, 79, 0, 3, -2],
            [1273, 2, 72, 73, 0, 7, -21],
            [1349, 2, 69, 70, 0, 22, -32],
            [1422, 2, 66, 67, 0, 40, -32],
            [1492, 2, 63, 63, 0, 55, -22],
            [1559, 2, 58, 59, 0, 59, -4],
            [1621, 2, 54, 53, 0, 51, 13],
            [1679, 2, 50, 50, 0, 33, 24],
            [1733, 2, 47, 47, 0, 13, 21],
            [1784, 2, 44, 44, 0, 0, 6],
            [1832, 2, 39, 39, 0, 2, -14],
            [1875, 2, 35, 36, 0, 17, -22],
            [1914, 2, 32, 31, 0, 32, -13],
            [1950, 2, 28, 27, 0, 28, 6],
            [1982, 2, 24, 24, 0, 8, 9],
            [2010, 2, 18, 17, 0, 5, -9],
            [2032, 2, 0, 0, 0, 269, 115]
        ],
        "animations": {
            "reveal": {
                "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
            }, 
            "all": {
                "frames": [29]
            }
        }      
    };
    RevealSS.ss = new createjs.SpriteSheet(RevealSS.spriteSheet);;
    //private method
    iwg._class("iwg.lib.flassets.RevealSS", RevealSS);

}(window));
