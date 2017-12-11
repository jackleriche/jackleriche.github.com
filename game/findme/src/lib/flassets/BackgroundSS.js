/**
 * \file BackgroundSS.js
 * \brief Master SpriteSheet assets from Flash.
 */
(function (window) {
    "use strict";
    //set local paths to external files
    var camelot = window.com.camelot,
        iwg = camelot.iwg,
        images = window.com.camelot.core.iwgLoadQ.images,
        BackgroundSS = function () {
            //singletonCache
            if (typeof BackgroundSS.instance !== "object") BackgroundSS.instance = this;
            return BackgroundSS.instance;
        },
        //make an instance if needed
        _BackgroundSS = new BackgroundSS();
    //add and set "next":false to stop on last frame
    //Static
    BackgroundSS.VERSION = '0.0.1';
    BackgroundSS.spriteSheet = {
        "images": [images.backgroundSS],
        "frames": [
			[2, 2, 1500, 768]
		],
		"animations": {
	        "bg":[0]
		},      
    };
    BackgroundSS.ss = new createjs.SpriteSheet(BackgroundSS.spriteSheet);
    
    //private method
    iwg._class("iwg.lib.flassets.BackgroundSS", BackgroundSS);

}(window));
