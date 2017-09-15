/**
 * Full Turn Sprite-sheet 
 * Includes all sprite for the full turn calendar animation
 */
(function (window) {
    "use strict";
    //set local paths to external files
    var camelot = window.com.camelot,
        iwg = camelot.iwg,
        images = window.com.camelot.core.iwgLoadQ.images,
        FullTurnSS = function () {
            //singletonCache
            if (typeof FullTurnSS.instance !== "object") FullTurnSS.instance = this;
            return FullTurnSS.instance;
        },
        //make an instance if needed
        _FullTurnSS = new FullTurnSS();
    //add and set "next":false to stop on last frame
    //Static
    FullTurnSS.VERSION = '0.0.1';
    FullTurnSS.spriteSheet = {
        "images": [images.fullTurnSS],
       "frames": [

    [1493, 1657, 179, 183], 
    [1310, 1687, 180, 192], 
    [1493, 1449, 181, 206], 
    [1310, 1465, 181, 220], 
    [1458, 990, 181, 228], 
    [1466, 1220, 183, 227], 
    [1267, 1238, 197, 225], 
    [1242, 1004, 214, 232], 
    [1082, 1568, 226, 247], 
    [646, 1034, 227, 260], 
    [829, 1296, 212, 271], 
    [639, 1296, 188, 280], 
    [890, 1569, 190, 285], 
    [875, 1034, 168, 248], 
    [1045, 1019, 195, 263], 
    [1043, 1284, 222, 282], 
    [1382, 690, 243, 298], 
    [646, 724, 258, 308], 
    [832, 394, 268, 314], 
    [1424, 371, 268, 317], 
    [1102, 381, 261, 317], 
    [906, 710, 250, 307], 
    [1158, 700, 222, 302], 
    [602, 400, 228, 322], 
    [356, 409, 244, 352], 
    [319, 1580, 253, 362], 
    [1424, 2, 268, 367], 
    [343, 816, 301, 369], 
    [2, 1580, 315, 370], 
    [2, 1212, 325, 366], 
    [574, 1578, 314, 358], 
    [329, 1212, 308, 364], 
    [1100, 2, 322, 377], 
    [2, 816, 339, 394], 
    [2, 409, 352, 405], 
    [2, 2, 360, 405], 
    [364, 2, 366, 396], 
    [732, 2, 366, 390]
],
"animations": {
    
        "fullTurn_00":[0], 
        "fullTurn_01":[1], 
        "fullTurn_02":[2], 
        "fullTurn_03":[3], 
        "fullTurn_04":[4], 
        "fullTurn_05":[5], 
        "fullTurn_06":[6], 
        "fullTurn_07":[7], 
        "fullTurn_08":[8], 
        "fullTurn_09":[9], 
        "fullTurn_10":[10], 
        "fullTurn_11":[11], 
        "fullTurn_12":[12], 
        "fullTurn_13":[13], 
        "fullTurn_14":[14], 
        "fullTurn_15":[15], 
        "fullTurn_16":[16], 
        "fullTurn_17":[17], 
        "fullTurn_18":[18], 
        "fullTurn_19":[19], 
        "fullTurn_20":[20], 
        "fullTurn_21":[21], 
        "fullTurn_22":[22], 
        "fullTurn_23":[23], 
        "fullTurn_24":[24], 
        "fullTurn_25":[25], 
        "fullTurn_26":[26], 
        "fullTurn_27":[27], 
        "fullTurn_28":[28], 
        "fullTurn_29":[29], 
        "fullTurn_30":[30], 
        "fullTurn_31":[31], 
        "fullTurn_32":[32], 
        "fullTurn_33":[33], 
        "fullTurn_34":[34], 
        "fullTurn_35":[35], 
        "fullTurn_36":[36], 
        "fullTurn_37":[37],
            "fullTurn": {
                frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37],
                next: false, 
                speed: 1
            }
        }
    };
    FullTurnSS.ss = new createjs.SpriteSheet(FullTurnSS.spriteSheet);
    
    //private method
    iwg._class("iwg.lib.SS.FullTurnSS", FullTurnSS);

}(window));
