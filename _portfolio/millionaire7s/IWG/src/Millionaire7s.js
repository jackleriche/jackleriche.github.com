(function (window) {
    "use strict";
    var IWGInit,
        camelot = window.com.camelot,
        core = window.com.camelot.core,
        iwg = camelot.iwg,
        lib = iwg.lib,
        R = lib.R,
        images = core.iwgLoadQ.images,
        SS = lib.flassets.MasterSS,
        BG = lib.flassets.BG,
        MEvent = lib.MEvent,
        Helper = lib.Helper,
        Ticket = lib.Ticket,
        Splash = lib.Splash,
        MainGameLayout = lib.MainGameLayout,
        Swipe = lib.Swipe,
        GameAssets = lib.GameAssets,
        MatchThree = lib.MatchThree,
        EqualsSeven = lib.EqualsSeven,
        MatchOne = lib.MatchOne,
        Weight = lib.Weight,
        EndGame = lib.EndGame,
        _millionaire7s,

        Millionaire7s = function () {

            // load all the things
            // 1. spritesheet
            // 2. audiosprite
            // 3. any other assets
            // 4. ticket data
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
            SS.ss = new createjs.SpriteSheet(camelot.iwg.lib.flassets.MasterSS.spriteSheet);

            // set-up game loop
            TweenLite.ticker.fps(30);
            TweenLite.ticker.addEventListener('tick', R.tick);
            R.GAME = document.getElementById("IWGcanvas");

            R.rescale();

            // events
            iwg.IWGEM.addEventListener(MEvent.CHECKENDGAME.type, checkEndGame);

            var ua = navigator.userAgent.toLowerCase();
            var isAndroid = ua.indexOf("android") > -1;
            if (isAndroid) {
                R.THROTTLE = true;
            }
            setTimeout(function () {
                init()
            }, 1);

        };

    Millionaire7s.VERSION = '0_0_1';

    function init() {

        // start the game
        var background = new createjs.Bitmap(images.bg);
        background.regX = 480;
        background.regY = 320;
        background.x = 960 / 2;
        background.y = 450;
        background.scaleY = background.scaleX = 1 + R.SCALE;

        R.STAGE.addChild(background);

        for (var i = 0; i <= 40; i++) {
            var sparkle = Helper.makeSparkle({
                x: Helper.randomFromInterval(-100, 960),
                y: Helper.randomFromInterval(0, 700),
                scale: Helper.randomFromIntervalRaw(0.3, 0.75),
                alpha: Helper.randomFromIntervalRaw(0.5, 1),
                delay: Helper.randomFromIntervalRaw(0, 0.5),
                rotation: Helper.randomFromIntervalRaw(360, 720),
                timeScale: Helper.randomFromIntervalRaw(0.25, 1)
            });
            sparkle.name = "sparkle";
            R.STAGE.addChild(sparkle);
        }

        var ticket = new Ticket(core.IWG.ame('ticket'));

        var mainGameContainer = new createjs.Container();

        // set up event listeners
        iwg.IWGEM.addEventListener(MEvent.MOVELEFTCOMPLETE.type, moveLeftComplete);
        iwg.IWGEM.addEventListener(MEvent.MOVERIGHTCOMPLETE.type, moveRightComplete);
        iwg.IWGEM.addEventListener(MEvent.MOVELEFTSTART.type, moveLeftStart);
        iwg.IWGEM.addEventListener(MEvent.MOVERIGHTSTART.type, moveRightStart);
        iwg.IWGEM.addEventListener(MEvent.RESETPROMPT.type, resetPrompt);
        iwg.IWGEM.addEventListener(MEvent.TOGGLESOUND.type, toggleSound);

        var splash = new Splash(),
            mainGame = new MainGameLayout('mainGame', R.GAMEHEIGHT, R.GAMEWIDTH);

        var game1 = new MatchThree(70, 80, 42, 65, R.LEFTGAMEWINDOW, ticket.getGame1()),
            game2 = new EqualsSeven(490, 80, 42, 80, R.LEFTGAMEWINDOW, ticket.getGame2()),
            game3 = new MatchOne(70, 80, 42, 65, R.RIGHTGAMEWINDOW, ticket.getGame3()),
            game4 = new Weight(490, 80, 38, 110, R.RIGHTGAMEWINDOW, ticket.getGame4());

        R.GAMES = [game1, game2, game3, game4];

        mainGameContainer.addChild(mainGame);

        // // get pause stuff in
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
            var endGame = new EndGame();
        }
    }

    // reset prompts
    // counts clicks on gameassets to show prompts
    function resetPrompt(ev) {
        var count = ev.param;
        // reset prompts
        if (count === 0) {
            Helper.showPrompt();
        }
    }

    function toggleSound(ev) {

        var that = ev.that;

        if (R.PLAYSOUND === true) {
            R.PLAYSOUND = false;
            that.gotoAndStop('audio_OFF');
        } else {
            R.PLAYSOUND = true;
            that.gotoAndStop('audio_ON');
        }
    }


    function moveLeftStart() {
        Helper.stopPrompt();
    }

    function moveLeftComplete() {
        Helper.showPrompt('left', 4000);
    }

    function moveRightStart() {
        Helper.stopPrompt();
    }

    function moveRightComplete() {
        Helper.showPrompt('right', 4000);
    }


    IWGInit = function () {
        //create an instance of the main game class once everything has loaded
        Millionaire7s = new Millionaire7s();
    };
    iwg._class("core.IWGInit", IWGInit);
    iwg._class("iwg.Millionaire7s", Millionaire7s);
}(window));