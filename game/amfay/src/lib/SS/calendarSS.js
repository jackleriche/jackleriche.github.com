/**
 * Calendar Sprite-sheet 
 */
(function (window) {
    "use strict";
    //set local paths to external files
    var camelot = window.com.camelot,
        iwg = camelot.iwg,
        images = window.com.camelot.core.iwgLoadQ.images,
        CalendarSS = function () {
            //singletonCache
            if (typeof CalendarSS.instance !== "object") CalendarSS.instance = this;
            return CalendarSS.instance;
        },
        //make an instance if needed
        _CalendarSS = new CalendarSS();
    //add and set "next":false to stop on last frame
    //Static
    CalendarSS.VERSION = '0.0.1';
    CalendarSS.spriteSheet = {
       "images": [images.calendarSS],
       "frames": [
            [2, 2, 200, 280], 
            [2, 284, 200, 280], 
            [2, 566, 200, 280], 
            [204, 2, 200, 280], 
            [204, 284, 200, 280], 
            [204, 566, 200, 280], 
            [406, 2, 200, 280], 
            [406, 284, 200, 280], 
            [406, 566, 200, 280], 
            [608, 2, 200, 280], 
            [608, 284, 200, 280], 
            [608, 566, 200, 280], 
            [810, 2, 200, 280], 
            [810, 284, 200, 280], 
            [810, 566, 200, 280], 
            [1012, 2, 200, 280], 
            [1012, 284, 200, 280], 
            [1012, 566, 200, 280], 
            [1214, 2, 200, 280], 
            [1416, 2, 200, 280], 
            [1618, 2, 200, 280], 
            [1214, 284, 200, 280], 
            [1214, 566, 200, 280], 
            [1416, 284, 200, 280], 
            [1416, 566, 200, 280], 
            [1618, 284, 200, 280], 
            [1618, 566, 200, 280]
        ],
     "animations": {
    
        "calendar_00":[0], 
        "calendar_01":[1], 
        "calendar_02":[2], 
        "calendar_03":[3], 
        "calendar_04":[4], 
        "calendar_05":[5], 
        "calendar_06":[6], 
        "calendar_07":[7], 
        "calendar_08":[8], 
        "calendar_09":[9], 
        "calendar_10":[10], 
        "calendar_11":[11], 
        "calendar_12":[12], 
        "calendar_13":[13], 
        
        "calendar_background":[14], 
        
        "calendar_month_00":[15], 
        "calendar_month_01":[16], 
        "calendar_month_02":[17], 
        "calendar_month_03":[18], 
        "calendar_month_04":[19], 
        "calendar_month_05":[20], 
        "calendar_month_06":[21], 
        "calendar_month_07":[22], 
        "calendar_month_08":[23], 
        "calendar_month_09":[24], 
        "calendar_month_10":[25], 
        "calendar_month_11":[26],
        
        "flip": {
                    frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
                    speed: 1
                },
         "month": {
                    frames: [15,16,17,18,19,20,21,22,23,24,25,26],
                    next: false, 
                    speed: 1
                }
        }
    };
    CalendarSS.ss = new createjs.SpriteSheet(CalendarSS.spriteSheet);
    
    //private method
    iwg._class("iwg.lib.SS.CalendarSS", CalendarSS);

}(window));
