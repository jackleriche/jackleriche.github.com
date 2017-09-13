(function (window) {
    "use strict";

    // declare the paths to resources used. If they don't yet exist create a reference to them.
    if (!window.com.camelot.iwg) {
        window.com.camelot.iwg = {};
    }
    if (!window.com.camelot.iwg.lib) {
        window.com.camelot.iwg.lib = {};
    }

    var camelot = window.com.camelot,
        iwg = camelot.iwg,
        //SS 				= window.com.camelot.iwg.lib.flassets.MasterSS,
        core = camelot.core,
        fps,
        fpsCount = 0,
        lowFPScount = 0,
        lastCalledTime = null,

        R = function () {
            if (typeof R.instance === "object") {
                return R.instance;
            }
            //singleton
            var _instance = this;
            R.instance = this;
        };

    R.debug     = true;
    R.LOCK      = false;
    R.SWIPE     = null;
    R.TICKET    = null;
    R.WINCOUNT  = 0;
    R.STATE     = 0;

    // Constant containers
    R.STAGE             = null;
    R.PAUSESCREEN       = new createjs.Container();
    R.SPLASH            = new createjs.Container();
    R.MAINGAMECONTAINER = new createjs.Container();
    R.FIRSTGAMEWINDOW   = new createjs.Container();
    R.ENDGAME           = new createjs.Container();
    
    
    R.clickCount        = 0;
    R.revealsOccuring   = 0;
    R.prompts           = [];
    R.REMINDERS         = [];
    R.promptAnimation   = [];
    R.sparkleAnimation  = new TimelineMax({
        repeat: -1,
        yoyo: true
    });
    R.revealTimeline    = new TimelineLite();
    R.revealTimeline.call(function(){});
    
    R.confettiTimelines = [];
    R.resumeTweens      = [];

    R.PLAYSOUND         = true;

    R.killInterval      = 0;
    R.TURNSARRAY        = [];

    var killInterval    = 10000;
    R.intervalHeartbeat = function () {
        
        var now = new Date().getTime();
        var kill = now - R.lastInterval;
        if (kill > killInterval) {
            // don't trigger on small stutters less than 1000ms
            if (window.com.camelot.core.IWG.PAUSE.data !== true) {
                window.com.camelot.core.IWG.PAUSE = {
                    type: "pauseGame",
                    data: true
                };
                window.com.camelot.iwg.IWGEM.dispatchEvent(window.com.camelot.core.IWG.PAUSE);
                TweenLite.ticker.removeEventListener("tick", R.tick);
                R.STAGE.addChild(R.PAUSESCREEN);

                R.STAGE.on("click", function () {
                    if(R.PLAYSOUND){
                        createjs.Sound.play('pop');    
                    }                    
                    R.lastInterval = new Date().getTime();
                    TweenLite.ticker.addEventListener("tick", R.tick);
                    window.com.camelot.core.IWG.PAUSE = {
                        type: "pauseGame",
                        data: false
                    };
                    window.com.camelot.iwg.IWGEM.dispatchEvent(window.com.camelot.core.IWG.PAUSE);
                    R.STAGE.update();
                    R.STAGE.removeChild(R.PAUSESCREEN);                    
                    R.refreshStaticStages();
                }, null, true);
            }
        }
    }

    R.tick = function () {
       // R.intervalHeartbeat();
        R.STAGE.update();
        //R.lastInterval = new Date().getTime();
    }

    R.rescale = function () {

        R.SCALE = 1 - R.resize(true);

        R.SCALEWIDTH = core.IWG.ame('get', {
            vars: ['gameWidth']
        });
        R.SCALEHEIGHT = core.IWG.ame('get', {
            vars: ['gameHeight']
        });

        R.STAGE.scaleX = R.SCALE;
        R.STAGE.scaleY = R.SCALE;

        TweenMax.resumeAll(true, true)
    }
    R.resize = function (getScaleUp) {
        R.pause = false;


        // check if the orrientation is correct
        var checkOrientation = core.IWG.ame('get', {
            vars: ['gameOrientationCorrect']
        });

        if (checkOrientation) {

            var initialWidth = core.IWG.ame('get', {
                vars: ['gameWidth']
            }),
                initialHeight = core.IWG.ame('get', {
                    vars: ['gameHeight']
                }),
                availableWidth = core.IWG.ame('get', {
                    vars: ['availableWidth']
                }),
                avablableHeight = core.IWG.ame('get', {
                    vars: ['availableHeight']
                }),
                cssHeight = 640,
                cssWidth = 960,
                scaleUp,
                myRatio = cssWidth / cssHeight,
                windowRatio = initialWidth / initialHeight;

            R.GAMEHEIGHT = 640;
            R.GAMEWIDTH = 960;

            if (myRatio >= windowRatio) {
                scaleUp = R.UPSCALE = ((cssWidth - initialWidth) / cssWidth);
            } else {
                scaleUp = R.UPSCALE = ((cssHeight - initialHeight) / cssHeight);
            }

            var trueX = initialWidth / 2;
            var gameX = R.GAMEWIDTH * (1 - scaleUp) / 2;

            R.STAGE.x = trueX - gameX;

            if (getScaleUp) {
                return scaleUp;
            }

        } else {

            R.pause = true;

        }
    }

    R.randomFromInterval = function (from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }
    
    R.refreshStaticStages = function(e) {
        R.STAGE.update();
        setTimeout(function(){
            R.STAGE.update()
        }, 200);
    }

    R.halt = function () {
        createjs.Sound.setMute(true);

        // add class to IWGHolder to turn blue
        var holder = document.getElementById('IWGholder');
        holder.setAttribute("class", "error");
    }

    iwg._class("iwg.lib.R", R);
}(window));