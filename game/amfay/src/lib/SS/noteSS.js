/**
 * Note Sprite-sheet 
 */
(function (window) {
    "use strict";
    //set local paths to external files
    var camelot = window.com.camelot,
        iwg = camelot.iwg,
        images = window.com.camelot.core.iwgLoadQ.images,
        NoteSS = function () {
            //singletonCache
            if (typeof NoteSS.instance !== "object") NoteSS.instance = this;
            return NoteSS.instance;
        },
        //make an instance if needed
        _NoteSS = new NoteSS();
    //add and set "next":false to stop on last frame
    //Static
    NoteSS.VERSION = '0.0.1';
    NoteSS.spriteSheet = {
        "images": [images.noteSS],
        "frames": [
            [2, 2, 140, 140], 
            [2, 144, 140, 140], 
            [2, 286, 140, 140], 
            [144, 2, 140, 140], 
            [144, 144, 140, 140], 
            [144, 286, 140, 140], 
            [286, 2, 140, 140], 
            [286, 144, 140, 140], 
            [286, 286, 140, 140], 
            [428, 2, 140, 140], 
            [428, 144, 140, 140], 
            [428, 286, 140, 140], 
            [570, 2, 140, 140], 
            [570, 144, 140, 140], 
            [570, 286, 140, 140], 
            [712, 2, 140, 140], 
            [712, 144, 140, 140], 
            [712, 286, 140, 140], 
            [854, 2, 140, 140], 
            [854, 144, 140, 140], 
            [854, 286, 140, 140], 
            [996, 2, 140, 140], 
            [996, 144, 140, 140], 
            [996, 286, 140, 140], 
            [1138, 2, 140, 140], 
            [1138, 144, 140, 140], 
            [1138, 286, 140, 140], 
            [1280, 2, 140, 140], 
            [1280, 2, 140, 140], 
            [1280, 144, 140, 140], 
            [1280, 286, 140, 140], 
            [1422, 2, 140, 140], 
            [1564, 2, 140, 140], 
            [1422, 144, 140, 140], 
            [1422, 286, 140, 140]
        ],
        "animations": {
            "note_0":[0], 
            "note_1":[1], 
            "note_10":[2], 
            "note_11":[3], 
            "note_12":[4], 
            "note_13":[5], 
            "note_14":[6], 
            "note_15":[7], 
            "note_16":[8], 
            "note_17":[9], 
            "note_18":[10], 
            "note_19":[11], 
            "note_2":[12], 
            "note_20":[13], 
            "note_21":[14], 
            "note_22":[15], 
            "note_23":[16], 
            "note_24":[17], 
            "note_25":[18], 
            "note_26":[19], 
            "note_27":[20], 
            "note_28":[21], 
            "note_29":[22], 
            "note_3":[23], 
            "note_30":[24], 
            "note_31":[25], 
            "note_32":[26], 
            "note_33":[27], 
            "note_34":[28], 
            "note_4":[29], 
            "note_5":[30], 
            "note_6":[31], 
            "note_7":[32], 
            "note_8":[33], 
            "note_9":[34],
            "reveal": {
                frames: [0,1,12,23,29,30,31,32,33,34,2,3,4,5,6,7,8,9,10,11,13,14,15,16,17,18,19,20,21,22],
                next: false, 
                speed: 1.2
            }
        }
    };
    NoteSS.ss = new createjs.SpriteSheet(NoteSS.spriteSheet);
    
    //private method
    iwg._class("iwg.lib.SS.NoteSS", NoteSS);

}(window));
