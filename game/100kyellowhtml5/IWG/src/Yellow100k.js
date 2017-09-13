(function (window) {
    "use strict";

    var IWGInit,
        camelot         = window.com.camelot,
        core            = window.com.camelot.core,
        iwg             = camelot.iwg,
        lib             = iwg.lib,
        R               = lib.R,
        images          = core.iwgLoadQ.images,
        SS              = lib.flassets.MasterSS,
        MEvent          = lib.MEvent,
        Helper          = lib.Helper,
        Ticket          = lib.Ticket,
        Splash          = lib.Splash,
        MainGameLayout  = lib.MainGameLayout,
        Swipe           = lib.Swipe,
        GameAssets      = lib.GameAssets,
        MatchGrid       = lib.MatchGrid,
        EndGame         = lib.EndGame,
        _Yellow100k,

        Yellow100k = function() {

            core.IWG.ame('killLoader');
            // set debug level to 0
            core.IWG.ame('set', {
                'debugLevel': [1, 'number']
            });

            // game innit code
            R.STAGE = new createjs.Stage(iwg.iwgCanvas);
            R.STAGE.name = "stage";
            R.STAGE.canvas.height = core.IWG.ame('get', {
                vars: ['gameHeight']
            });
            R.STAGE.canvas.width = core.IWG.ame('get', {
                vars: ['gameWidth']
            });
            createjs.Touch.enable(R.STAGE, false, true);
            R.STAGE.enableMouseOver(10);
            SS.ss = new createjs.SpriteSheet(SS.spriteSheet);

            // set-up game loop
            TweenLite.ticker.fps(20);
            TweenLite.ticker.addEventListener('tick', R.tick);
            R.GAME = document.getElementById("IWGcanvas");

            R.rescale();

            // events
            iwg.IWGEM.addEventListener(core.IWG.FULLSCREEN.type, refreshStaticStages);
            iwg.IWGEM.addEventListener(MEvent.CHECKENDGAME.type, checkEndGame);
            iwg.IWGEM.addEventListener(core.IWG.PAUSE.type, pauseGame);
            iwg.IWGEM.addEventListener(core.IWG.RESIZE.type, refreshStaticStages);

            // settimeout delay to overcome bug
            setTimeout(function () {
                init()
            }, 1);

        };

    function init(){

        // setup background
        var bg = Helper.makeBitmapImage("bg", {x:0, y:0}, 1, true);
        bg.x = R.GAMEWIDTH/2;
        bg.y = R.GAMEHEIGHT/2;

        bg.scaleX = 1.2;

        R.STAGE.addChild(bg);


        var ticket = new Ticket(core.IWG.ame('ticket'));
        R.TICKET = ticket;

        var mainGameContainer = new createjs.Container();

        // set up event listeners
        iwg.IWGEM.addEventListener(MEvent.TOGGLESOUND.type, toggleSound);

        var splash  = new Splash(),
            layout  = new MainGameLayout(),

            match3  = new MatchGrid(3);

        R.GAME = match3;

        // get pause stuff in
        var pm = new createjs.Shape();
        pm.graphics.f("rgba(0,0,0,0.6)").dr(-200, -200, 1300, 840);

        var pausedIcon = new createjs.Shape();
        pausedIcon.graphics.f().s("#FFFFFF").ss(5, 1, 1).p("AFKAAQAACIhhBhQhgBhiJAAQiIAAhhhhQhghhAAiIQAAiIBghhQBhhgCIAAQCJAABgBgQBhBhAACIg");
        pausedIcon.y = 300;
        pausedIcon.x = 480;

        var pmText = new createjs.Shape();
        pmText.graphics.f("#FFFFFF").s().p("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");
        pmText.y = 300;
        pmText.x = 480;

        R.PAUSESCREEN.addChild(pm, pausedIcon, pmText);

    }

     // checkEndGame Event
    function checkEndGame() {

        var match3 = R.GAME

        if (match3.getIsFinished()) {
            R.LOCK = true;
            setTimeout(function(){
                var endGame = new EndGame();
            }, 2000);
        }
    }

    function pauseGame(ev) {
        // check sound
        var state = ev.data;
            //tweens = TweenMax.getAllTweens(true);

        if (state === false) {
            // unpause
            // return sound to original state
            createjs.Sound.setMute(false);
            R.revealTimeline.play();
            for (var tween in R.resumeTweens) {
                //console.log(R.confettiTimelines[tween]);
                R.resumeTweens[tween].play();
            }
        } else if (state === true) {
            // pause
            // force sound off
            createjs.Sound.setMute(true);
            R.revealTimeline.pause();
            for (var tween in R.confettiTimelines) {
                if(R.confettiTimelines[tween].paused() === false){
                    R.resumeTweens.push(R.confettiTimelines[tween]);
                }
            }
        }
       // tweens = null;
    }

    function refreshStaticStages(e) {
        R.STAGE.update();
        setTimeout(function(){
            R.STAGE.update()
        }, 100);
    }

    function toggleSound(ev) {

        var that = ev.that;

        if (R.PLAYSOUND === true) {
            // mute
            R.PLAYSOUND = false;
            createjs.Sound.setMute(true);
            that.gotoAndStop('sound_off');
        } else {
            // unmute
            R.PLAYSOUND = true;
            createjs.Sound.setMute(false);
            that.gotoAndStop('sound_on');
        }
    }


    Yellow100k.VERSION = '0_0_1';
    IWGInit = function () {
        _Yellow100k = new Yellow100k();
    };
    iwg._class("core.IWGInit", IWGInit);
    iwg._class("iwg.Yellow100k", Yellow100k);
}(window));
