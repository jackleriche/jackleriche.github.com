/**
 * Prize Reveal Sprite-sheet 
 */
(function (window) {
    "use strict";
    //set local paths to external files
    var camelot = window.com.camelot,
        iwg = camelot.iwg,
        images = window.com.camelot.core.iwgLoadQ.images,
        PrizeRevealSS = function () {
            //singletonCache
            if (typeof PrizeRevealSS.instance !== "object") PrizeRevealSS.instance = this;
            return PrizeRevealSS.instance;
        },
        //make an instance if needed
        _PrizeRevealSS = new PrizeRevealSS();
    //add and set "next":false to stop on last frame
    //Static
    PrizeRevealSS.VERSION = '0.0.1';
    PrizeRevealSS.spriteSheet = {
        "images": [images.prizeRevealSS],
        "frames": [
            [2, 1948, 112, 43], 
            [2, 2, 435, 276], 
            [439, 2, 435, 276], 
            [876, 2, 435, 276], 
            [1313, 2, 435, 276], 
            [2, 280, 435, 276], 
            [439, 280, 435, 276], 
            [876, 280, 435, 276], 
            [1313, 280, 435, 276], 
            [2, 558, 435, 276], 
            [439, 558, 435, 276], 
            [876, 558, 435, 276], 
            [1313, 558, 435, 276], 
            [2, 836, 435, 276], 
            [2, 1114, 435, 276], 
            [2, 1392, 435, 276], 
            [2, 1670, 435, 276], 
            [439, 836, 435, 276], 
            [876, 836, 435, 276], 
            [1313, 836, 435, 276], 
            [439, 1114, 435, 276], 
            [439, 1392, 435, 276], 
            [439, 1670, 435, 276], 
            [876, 1114, 435, 276], 
            [1313, 1114, 435, 276], 
            [876, 1392, 435, 276], 
            [1313, 1392, 435, 276], 
            [876, 1670, 435, 276], 
            [1313, 1670, 435, 276]
        ],
    	"animations": {
            "prize_word":[0], 
            "prizereveal0001":[1], 
            "prizereveal0002":[2], 
            "prizereveal0003":[3], 
            "prizereveal0004":[4], 
            "prizereveal0005":[5], 
            "prizereveal0006":[6], 
            "prizereveal0007":[7], 
            "prizereveal0008":[8], 
            "prizereveal0009":[9], 
            "prizereveal0010":[10], 
            "prizereveal0011":[11], 
            "prizereveal0012":[12], 
            "prizereveal0013":[13], 
            "prizereveal0014":[14], 
            "prizereveal0015":[15], 
            "prizereveal0016":[16], 
            "prizereveal0017":[17], 
            "prizereveal0018":[18], 
            "prizereveal0019":[19], 
            "prizereveal0020":[20], 
            "prizereveal0021":[21], 
            "prizereveal0022":[22], 
            "prizereveal0023":[23], 
            "prizereveal0024":[24], 
            "prizereveal0025":[25], 
            "prizereveal0026":[26], 
            "prizereveal0027":[27], 
            "prizereveal0028":[28],
            "prizeReveal": {
                frames: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],
                next: false,
                frequency: 1 
            }
        }
    };
    PrizeRevealSS.ss = new createjs.SpriteSheet(PrizeRevealSS.spriteSheet);
    
    //private method
    iwg._class("iwg.lib.SS.PrizeRevealSS", PrizeRevealSS);

}(window));
