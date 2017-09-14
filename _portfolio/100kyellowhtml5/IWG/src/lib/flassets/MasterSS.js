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
        MasterSS = function () {
            //singletonCache
            if (typeof MasterSS.instance !== "object") MasterSS.instance = this;
            return MasterSS.instance;
        },
        //make an instance if needed
        _MasterSS = new MasterSS();
    //add and set "next":false to stop on last frame
    //Static
    MasterSS.VERSION = '0.0.1';
    MasterSS.spriteSheet = {
        "images": [images.masterSS],
        "frames": [

    [2, 2, 960, 640],
    [2, 644, 617, 91],
    [1221, 2, 429, 150],
    [964, 314, 669, 190],
    [1221, 154, 345, 21],
    [2, 737, 526, 21],
    [964, 2, 255, 310],
    [243, 760, 222, 92],
    [2, 760, 239, 97],
    [869, 668, 682, 30],
    [1192, 940, 236, 78],
    [954, 940, 236, 78],
    [716, 940, 236, 78],
    [478, 940, 236, 78],
    [1419, 860, 236, 78],
    [1181, 860, 236, 78],
    [943, 860, 236, 78],
    [2, 939, 236, 78],
    [240, 929, 236, 78],
    [705, 860, 236, 78],
    [621, 644, 246, 123],
    [1221, 177, 246, 123],
    [1419, 780, 236, 78],
    [1181, 780, 236, 78],
    [943, 780, 236, 78],
    [2, 859, 236, 78],
    [467, 849, 236, 78],
    [705, 780, 236, 78],
    [1345, 700, 236, 78],
    [1107, 700, 236, 78],
    [467, 769, 236, 78],
    [869, 700, 236, 78],
    [1469, 177, 45, 45],
    [1568, 154, 45, 45],
    [964, 506, 681, 160]
],
"animations": {

        "bg":[0],
        "bolt":[1],
        "end_box_try":[2],
        "end_box_win":[3],
        "end_lose":[4],
        "end_win":[5],
        "fingers":[6],
        "finish":[7],
        "finish_over":[8],
        "instructions":[9],
        "p1":[10],
        "p10":[11],
        "p100":[12],
        "p1000":[13],
        "p100000":[14],
        "p2":[15],
        "p20":[16],
        "p5":[17],
        "p50":[18],
        "p5000":[19],
        "play":[20],
        "play_over":[21],
        "pw1":[22],
        "pw10":[23],
        "pw100":[24],
        "pw1000":[25],
        "pw100000":[26],
        "pw2":[27],
        "pw20":[28],
        "pw5":[29],
        "pw50":[30],
        "pw5000":[31],
        "sound_off":[32],
        "sound_on":[33],
        "splash_100k":[34]
}
    };
    MasterSS.ss = null
    //private method
    iwg._class("iwg.lib.flassets.MasterSS", MasterSS);

}(window));
