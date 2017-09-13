(function (window) {
	"use strict";

	// declare the paths to resources used. If they don't yet exist create a reference to them.
	if (!window.com.camelot.iwg) {
		window.com.camelot.iwg = {};
	}
	if (!window.com.camelot.iwg.lib) {
		window.com.camelot.iwg.lib = {};
	}

	var camelot 		= window.com.camelot,
		iwg 			= camelot.iwg,
		SS 				= window.com.camelot.iwg.lib.flassets.MasterSS,
		core 			= camelot.core,
		fps,
		fpsCount 		= 0,
		lowFPScount 	= 0,
		lastCalledTime 	= null,

	R = function () {
		if (typeof R.instance === "object") {
			return R.instance;
		}
		//singleton
		var _instance = this;
		R.instance = this;
	};

	R.halt = function(){
		createjs.Sound.setMute(true);

		// add class to IWGHolder to turn blue
		var holder = document.getElementById('IWGholder');
		holder.setAttribute("class", "error");
	}

	R.THROTTLE = false;

	R.clickCount = 0;

	//static var
	R.UPSCALE 		= null;
	R.GAMEWIDTH 	= core.IWG.ame('get', {vars: ['gameWidth']});
	R.GAMEHEIGHT 	= core.IWG.ame('get', {vars: ['gameHeight']});
	R.SCALE 		= null;
	R.OLDHEIGHT 	= null;
	R.OLDWIDTH	 	= null;
	R.SCALEWIDTH	= null;
    R.SCALEHEIGHT   = null;

    // prize amount
    R.PRIZETABLE = {
		"10.00": 		"gameprize_10",
		"100.00": 		"gameprize_100",
        "1000.00":		"gameprize_1000",
        "15.00":		"gameprize_15",
        "20.00":		"gameprize_20",
        "200.00":		"gameprize_200",
        "40.00":		"gameprize_40",
        "5.00":			"gameprize_5",
        "5000.00":		"gameprize_5000",
        "50000.00":		"gameprize_50000",
        "1208000.00":	"icon_super"
    }
    R.GAME1REF = {
		0: "game1_symbol_bars",
        1: "game1_symbol_chopper",
        2: "game1_symbol_coins",
        3: "game1_symbol_gem",
        4: "game1_symbol_necklace",
        5: "game1_symbol_safe",
        6: "game1_symbol_safe"
    }

	// delay
	R.DELAY = 500;

	// reveal timelines
	R.prompt					= false;
	R.prompts					= [];
	R.shimmerAnimation			= new TimelineMax({repeat: -1, repeatDelay: 2});
	R.promptAnimation			= []//new TimelineMax({repeat: -1, yoyo:true});
	R.promptTimeline 			= new TimelineLite();

	// lock screen
	R.LOCK = false;

   	// has game finished
	R.HASFINISHED = false;

	// svg masks
	R.poundMask = "EACgh1pIAKgoIAKgoIAKgeIAUgoIAegeIAegeIAogeIAegUIAygKIA8gKIAogKIAyAKIAyAKIAeAKIAoAUIAeAUIAeAKIAUAUIAAAUIgKAKIgyBGIgeAeIgeAUIgKAUIgKAKIgyAAIgegeIgUgeIgKgKIgKAAIgeAeIgKAeIAAAKIAKAKIBQAAIAUAKIAAAUIAAAeIgKAUIgKAoIgKAUIgyAUIgeAAIgUAAIgKAAIgUAUIgUAUIAAAKIBaAKIA8AKIA8AKIAoAUIAUAKIAAAeIgKAyIAAAUYAAAAgKAogKAAIgeAUIgKAUIgeAKIgyAAIgogKIgogKIgogKIgegKIgegUIgegUIgegKIgUgKIgKAAIgUAAYgKAAgeAAAAAAIgKAKIgegKIAAgeIgUgeIgKgeIAAgUIAUgeIAUgUIAUgoIAAgeIAAgKIgyAAIAAhkIA8gKIAAgK";
	R.prize = "EABkh1BIAAlAIAAgKIBGAAIBGAAIA8AKIAUAUIAUAUIAAgyIA8AAIBGAAIBGAKIAoAUIAUAUIAKAKIAAg8IBGAAIIIAAIAACMIgKAAIAAA8IAKAKIAKB4IAAAUIpOgKIgKAAIgKAAIgeAUIhQgyIgKAUIgoAKIgeAKIgegKIgUAAIgUgKIAAhkIgoAeIgUAAIgUAKIgKAAIAABGIiWgK";
	R.moneyBag = "EAFoh3XIgegUIAUgoIAUgKIAUAAIAKgeIAegKIAyAKIAoAUIAAgUIAUgUIAogKIAUAKIAUAKIAAAoIAegeIAeAKYAAAAAUAKAKAKIAeAKIAKAKIgeAKYgKAKgoAUAAAAYAAAAgoAUgKAAYAAAKAAAKAAAAIAAAKIAUAKIAAAKIAKAeIAoAUIAUAeIAUAoIAeAeIAeAoIAeAeIAeAyIAKAyIAUAoIAAAyIgUAeIgUAoIgeAUIgoAeIgyAeIgoAKIgyAKIgyAAIgoAAIgyAAIgyAAIhGgKIgogKIgygUIgygeIgUgeIgegKIgKgeIgKgeIgegoIAAg8IAegoIAUgyIAUgyIAogoIAygeIAogoIAygeIAegUIAKgUIgKgKIgeAKIgUgKYAAgKAAgeAAAA";

	R.shadow = new createjs.Shadow("#000000",2, 2, 1);

	// Games
	R.GAMES = [];

	//ticket need to be a blank object so it can be created
	R._ticket={};
	// R._isTicketWin =
	R.STAGE = null;
	R.isUpdate = false;

	// turns left
	R.TURNSLEFT = 0;

// Game States
	R.GAMESTATE = null;
	R.INTRO = 0;
	R.PLAYING = 1;
	R.GAMEEND = 2;

    // containers
    R.SPLASH				= new createjs.Container();
    R.LOGOCONTAINER			= new createjs.Container();
    R.MAINGAMECONTAINER		= new createjs.Container();
    R.LEFTGAMEWINDOW		= new createjs.Container();
    R.RIGHTGAMEWINDOW		= new createjs.Container();
    R.ENDGAME 				= new createjs.Container();

    R.PAUSETWEENS			= [];

    R.tick = function ($stage) {
        R.STAGE.update();
        if (!R.THROTTLE) {
            if (!lastCalledTime) {
                lastCalledTime = new Date().getTime();
                fps = 0;
                return;
            }
            var delta = (new Date().getTime() - lastCalledTime) / 1000;
            lastCalledTime = new Date().getTime();
            fps = (Math.floor(1 / delta));
            if (fps < (TweenLite.ticker.fps() * 0.25) && fps > 0) {
                lowFPScount++;
            }
            if (fpsCount % TweenLite.ticker.fps() === TweenLite.ticker.fps() + 10) {
                lowFPScount = 0;
            }
            fpsCount++;
            if (lowFPScount > TweenLite.ticker.fps()) {
                //alert('slow machine')
                R.THROTTLE = true;
                iwg.IWGEM.dispatchEvent(MEvent.THROTTLE);
            }
        }
    }

	R.rescale = function(){

		R.SCALE = 1 - R.resize(true);

		R.SCALEWIDTH = core.IWG.ame('get', {vars: ['gameWidth']}) ;
        R.SCALEHEIGHT = core.IWG.ame('get', {vars: ['gameHeight']});

		R.STAGE.scaleX = R.SCALE;
		R.STAGE.scaleY = R.SCALE;

        TweenMax.resumeAll(true, true)
	}
	R.resize = function(getScaleUp){
		R.pause = false;


		// check if the orrientation is correct
		var checkOrientation = core.IWG.ame('get',{vars:['gameOrientationCorrect']});

		if (checkOrientation){

			var initialWidth = core.IWG.ame('get', {vars: ['gameWidth']}),
	            initialHeight = core.IWG.ame('get', {vars: ['gameHeight']}),
	            availableWidth = core.IWG.ame('get', {vars: ['availableWidth']}),
	            avablableHeight = core.IWG.ame('get', {vars: ['availableHeight']}),
	            cssHeight   =   640,
	            cssWidth    =   960,
	        scaleUp,
	        myRatio = cssWidth / cssHeight,
	        windowRatio = initialWidth / initialHeight;

	        R.GAMEHEIGHT = 640;
	        R.GAMEWIDTH = 960;

	        if (myRatio >= windowRatio) {
	            scaleUp = R.UPSCALE = ((cssWidth - initialWidth)/cssWidth);
	        } else {
		        scaleUp = R.UPSCALE = ((cssHeight - initialHeight)/cssHeight);
	        }

	        var trueX = initialWidth/2;
	        var gameX = R.GAMEWIDTH * ( 1 - scaleUp) / 2;

	        R.STAGE.x = trueX - gameX;

			if (getScaleUp) {
	            return scaleUp;
	        }

		} else {

			R.pause = true;

	    }
	}

	R.Orientation = function(){

    	function changeOrientation(){
    		var orien = window.orientation;
    		switch (orien) {
    			case 0:
    				game.className = "portrait";
    				break;
    			case 90:
    				game.className = "landscape-left";
    				break;
    			case -90:
    				game.className = "landscape-right";
    				break;
    			default:
    				game.className = "portrait-down";
    				break;
    		}
    	}
    	var support = document.documentElement.className
    	var s 		= support.split(" ");
    	for(var check in s){
    		if(check === "touch"){
    			R.GAME = document.getElementById("IWGcanvas");

				window.addEventListener("orientationchange", changeOrientation, false);
				changeOrientation();
    		}
    	}
    }
	R.randomFromInterval = function(from,to) {
	    return Math.random()*(to-from+1)+from;
	}
    /*
     * Sparkle
     *
     *       co-ords: @object       (x,y)
     *         image: @string       (url)
     *      duration: @number       (number of miliseconds the animation lasts)
     *    animations: @Object       (instructions for animation)
     * self destruct: @bool
     *
     */
    R.sparkle = function( ords, image, duration, animations, parentContainer, destruct) {

        var x = 0,
            y = 0;

        if ( ords.hasOwnProperty('x') ) {
            x = ords.x;
        }
        if ( ords.hasOwnProperty('y') ) {
            y = ords.y;
        }

        var img         = R.makeBitmapImage(image, {x:0, y:0});
            img.x       = x;
            img.y       = y;
            img.scaleX  = 0.5;
            img.scaleY  = 0.5;
    }

	iwg._class("iwg.lib.R", R);
}(window));
