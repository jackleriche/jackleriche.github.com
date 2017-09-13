/**
 * Main Sprite-sheet 
 * Includes al icons and main layout images
 */
(function (window) {
    "use strict";
    //set local paths to external files
    var camelot = window.com.camelot,
        iwg = camelot.iwg,
        images = window.com.camelot.core.iwgLoadQ.images,
        ImageSS = function () {
            //singletonCache
            if (typeof ImageSS.instance !== "object") ImageSS.instance = this;
            return ImageSS.instance;
        },
        //make an instance if needed
        _ImageSS = new ImageSS();
    //add and set "next":false to stop on last frame
    //Static
    ImageSS.VERSION = '0.0.1';
    ImageSS.spriteSheet = {
        "images": [images.imageSS],
        "frames": [
            [267, 658, 89, 91], 
            [168, 658, 97, 87], 
            [824, 383, 189, 112], 
            [488, 648, 96, 102], 
            [880, 2, 103, 111], 
            [880, 189, 89, 83], 
            [880, 274, 82, 90], 
            [475, 563, 94, 83], 
            [2, 2, 524, 559], 
            [653, 281, 78, 80], 
            [2, 563, 378, 93], 
            [528, 2, 350, 277], 
            [2, 658, 164, 92], 
            [895, 717, 41, 32], 
            [635, 602, 65, 32], 
            [920, 649, 88, 32], 
            [828, 281, 46, 32], 
            [951, 547, 68, 32], 
            [942, 615, 70, 32], 
            [828, 349, 45, 32], 
            [803, 604, 90, 32], 
            [571, 550, 62, 89], 
            [702, 604, 99, 32], 
            [938, 717, 41, 32], 
            [828, 706, 65, 32], 
            [828, 672, 88, 32], 
            [828, 315, 46, 32], 
            [951, 581, 68, 32], 
            [918, 683, 70, 32], 
            [895, 604, 45, 32], 
            [828, 638, 90, 32], 
            [802, 337, 20, 57], 
            [985, 174, 20, 58], 
            [985, 52, 20, 59], 
            [985, 113, 20, 59], 
            [382, 563, 91, 88], 
            [528, 366, 174, 182], 
            [971, 234, 40, 41], 
            [964, 328, 40, 41], 
            [358, 723, 111, 23], 
            [985, 2, 29, 48], 
            [880, 115, 103, 72], 
            [704, 497, 245, 105], 
            [964, 277, 55, 49], 
            [733, 281, 90, 54], 
            [528, 281, 123, 62], 
            [586, 641, 240, 109], 
            [635, 550, 61, 50], 
            [704, 421, 94, 56], 
            [704, 363, 96, 56], 
            [951, 497, 61, 48], 
            [358, 658, 128, 63]
        ],
        "animations": {
            "bag":[0], 
            "bar":[1], 
            "button_finish":[2], 
            "calendar":[3], 
            "calendar_stroke":[4], 
            "chest":[5], 
            "coin":[6], 
            "diamond":[7], 
            "gameholder":[8], 
            "horseshoe":[9], 
            "instructions":[10], 
            "logo":[11], 
            "lose-message":[12], 
            "p1":[13], 
            "p10":[14], 
            "p100":[15], 
            "p2":[16], 
            "p20":[17], 
            "p40":[18], 
            "p5":[19], 
            "p500":[20], 
            "pound":[21], 
            "prize_word":[22], 
            "pw1":[23], 
            "pw10":[24], 
            "pw100":[25], 
            "pw2":[26], 
            "pw20":[27], 
            "pw40":[28], 
            "pw5":[29], 
            "pw500":[30], 
            "row1":[31], 
            "row2":[32], 
            "row3":[33], 
            "row4":[34], 
            "safe":[35], 
            "sheet_left":[36], 
            "sound_off":[37], 
            "sound_on":[38], 
            "symbol_shadow":[39], 
            "twinkle":[40], 
            "wallet":[41], 
            "win-message":[42], 
            "win_1":[43], 
            "win_10":[44], 
            "win_100":[45], 
            "win_1000":[46], 
            "win_2":[47], 
            "win_20":[48], 
            "win_40":[49], 
            "win_5":[50], 
            "win_500":[51]
        }
    };
    ImageSS.ss = new createjs.SpriteSheet(ImageSS.spriteSheet);
    
    //private method
    iwg._class("iwg.lib.SS.ImageSS", ImageSS);

}(window));
