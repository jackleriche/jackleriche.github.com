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
        BG              = lib.flassets.BG,
        MEvent          = lib.MEvent,
        Helper          = lib.Helper,
        Ticket          = lib.Ticket,
        Splash          = lib.Splash,
        MainGameLayout  = lib.MainGameLayout,
        Swipe           = lib.Swipe,
        GameAssets      = lib.GameAssets,
        MatchTwo        = lib.MatchTwo,
        EqualsSeven     = lib.EqualsSeven,
        MatchOne        = lib.MatchOne,
        DoubleMatch     = lib.DoubleMatch,
        Weight  	    = lib.Weight,
        EndGame         = lib.EndGame,
        _fourMillionPurple,

        FourMillionPurple = function () {

            // load all the things
            // 1. spritesheet
            // 2. audiosprite
            // 3. any other assets
            // 4. ticket data
            // set debug level to 0 
            core.IWG.ame('set', {
                'debugLevel': [1, 'number']
            });

            // settimeout delay to overcome bug 
            setTimeout(function () {
                
                
                // game innit code          
                R.STAGE = new createjs.Stage(iwg.iwgCanvas);
                R.STAGE.name = "stage";
                if ( createjs.Touch.isSupported() ) {
                    createjs.Touch.enable( R.STAGE, true, false );
                };
                R.STAGE.enableMouseOver(10);
                
                SS.ss = new createjs.SpriteSheet(camelot.iwg.lib.flassets.MasterSS.spriteSheet);
    
                // set-up game loop
                TweenLite.ticker.fps(20);
                TweenLite.ticker.addEventListener('tick', R.tick);
                R.GAME = document.getElementById("IWGcanvas");
    
                // events
                iwg.IWGEM.addEventListener(core.IWG.FULLSCREEN.type, refreshStaticStages);
                iwg.IWGEM.addEventListener(MEvent.CHECKENDGAME.type, checkEndGame);
                iwg.IWGEM.addEventListener(core.IWG.PAUSE.type, pauseGame);
                iwg.IWGEM.addEventListener(core.IWG.RESIZE.type, refreshStaticStages);
                R.rescale();
                init();  
                core.IWG.ame('killLoader');              
            }, 1);

        };

    FourMillionPurple.VERSION = '0_0_1';

    function init() {   

        // start the game
        var background = new createjs.Bitmap(images.bg);
        background.regX = 480;
        background.regY = 320;
        background.x = 960 / 2;
        background.y = 320;
        background.scaleY = background.scaleX = 1.3 ;
        
        var confetti = new createjs.Bitmap(images.confetti);
        confetti.regX = 480;
        confetti.regY = 320;
        confetti.x = 960 / 2;
        confetti.y = 320;
        confetti.scaleY = confetti.scaleX = 0;
        confetti.name = "confetti";
        

        R.STAGE.addChild(background, confetti);

        var ticket = new Ticket(core.IWG.ame('ticket'));

        var mainGameContainer = new createjs.Container();

        // set up event listeners
        iwg.IWGEM.addEventListener(MEvent.MOVELEFTCOMPLETE.type, moveLeftComplete);
        iwg.IWGEM.addEventListener(MEvent.MOVERIGHTCOMPLETE.type, moveRightComplete);
        iwg.IWGEM.addEventListener(MEvent.MOVELEFTSTART.type, moveLeftStart);
        iwg.IWGEM.addEventListener(MEvent.MOVERIGHTSTART.type, moveRightStart);
        iwg.IWGEM.addEventListener(MEvent.TOGGLESOUND.type, toggleSound);
        iwg.IWGEM.addEventListener(MEvent.CLICKCOUNT.type, clickCount);

        var splash = new Splash(),
            mainGame = new MainGameLayout('mainGame', R.GAMEHEIGHT, R.GAMEWIDTH);

        var game1 = new MatchOne(55, 80, 42, 65, R.FIRSTGAMEWINDOW, ticket.getGame1()),
            game2 = new EqualsSeven(475, 80, 50, 75, R.FIRSTGAMEWINDOW, ticket.getGame2()),
            game3 = new Weight(55, 80, 46, 110, R.SECONDGAMEWINDOW, ticket.getGame3()),
            game4 = new MatchTwo(475, 80, 50, 100, R.SECONDGAMEWINDOW, ticket.getGame4()),            
            game5 = new DoubleMatch(55, 80, 80, 110, R.THIRDGAMEWINDOW, ticket.getGame5());

        R.GAMES = [game1, game2, game3, game4, game5];

        // set to slide in
        game1.x = R.GAMEWIDTH + 1;
        game2.x = R.GAMEWIDTH + 1;
        
        mainGameContainer.addChild(mainGame);

        // get pause stuff in
        var pm = new createjs.Shape();
        pm.graphics.f("rgba(0,0,0,0.6)").dr(-200, -200, 1300, 1300);

        var pausedIcon = new createjs.Shape();
        pausedIcon.graphics.f().s("#FFFFFF").ss(5, 1, 1).p("AFKAAQAACIhhBhQhgBhiJAAQiIAAhhhhQhghhAAiIQAAiIBghhQBhhgCIAAQCJAABgBgQBhBhAACIg");
        pausedIcon.y = 300;
        pausedIcon.x = 480;

        var pmText = new createjs.Shape();
        pmText.graphics.f("#FFFFFF").s().p("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");
        pmText.y = 300;
        pmText.x = 480;

        R.PAUSESCREEN.addChild(pm, pausedIcon, pmText);
        
        R.PAUSESCREEN.on('click', function(){
            R.STAGE.removeChild(R.PAUSESCREEN); 
        });
        
    }

    var turns = 0;
    function clickCount() {
        
        turns++;
        
        if ( turns >= 23 ){
            Swipe.instance.setEnabled(false);
        }
        
    }
    
    // checkEndGame Event
    function checkEndGame() {

        var games = R.GAMES,
            allFinished = false;

        for (var game in games) {
            if (games[game].getIsFinished() === false) {
                allFinished = false;
                break;
            } else {
                allFinished = true;
            }
        }
        if (allFinished) {
            R.LOCK = true;
            setTimeout(function(){
                var endGame = new EndGame();
            }, 500);        
        }
        
    }
    
    function pauseGame(ev) {
        
        // check sound
        var state = ev.data;
        if (state === false) {
            // unpause
            // return sound to original state
            createjs.Sound.setMute(false);
            R.revealTimeline.play();
            for (var tween in R.resumeTweens) {
                R.resumeTweens[tween].play();
            }
        } else if (state === true) {
            // pause
            R.STAGE.addChild(R.PAUSESCREEN);
            // force sound off
            createjs.Sound.setMute(true);
            R.revealTimeline.pause();
            for (var tween in R.confettiTimelines) {
                if(R.confettiTimelines[tween].paused() === false){
                    R.resumeTweens.push(R.confettiTimelines[tween]);
                }
            }
        }
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
            that.gotoAndStop('sound');
        }
    }

    function moveLeftStart() {
        Helper.stopPrompt();
    }

    function moveLeftComplete() {
        
        Helper.showPrompt();
        
    }

    function moveRightStart() {
        Helper.stopPrompt();
    }

    function moveRightComplete() {
        Helper.showPrompt();
    }


    IWGInit = function () {

        var pluginCount = 0;

        com.camelot.core.IWG.ame('plugin', {module: ['legacy_module']});
        com.camelot.iwg.IWGEM.on(com.camelot.core.IWGEVENT.PLUGIN_LOADED, pluginsLoaded);

        function pluginsLoaded() {

            pluginCount++;

            if (pluginCount === 1) {
                //create an instance of the main game class once everything has loaded
                FourMillionPurple = new FourMillionPurple();
            }
        }

    };
    iwg._class("core.IWGInit", IWGInit);
    iwg._class("iwg.FourMillionPurple", FourMillionPurple);
}(window));