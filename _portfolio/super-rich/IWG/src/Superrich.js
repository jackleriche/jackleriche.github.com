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
        Splash = lib.Splash,
        Swipe = lib.Swipe,
        MainGameLayout = lib.MainGameLayout,
        MEvent = lib.MEvent,
        ParallaxBG = lib.ParallaxBG,
        Helper = lib.Helper,
        Ticket = lib.Ticket,
        MatchOne = lib.MatchOne,
        MatchTwo = lib.MatchTwo,
        EqualsSeven = lib.EqualsSeven,
        EndGame = lib.EndGame,
        gamePath = core.IWG.ame('get', {
            vars: ['gamePath']
        }),

        _Superrich,
        Superrich = function () {

            // load all the things
            // 1. spritesheet
            // 2. audiosprite
            // 3. any other assets
            // 4. ticket data
            core.IWG.ame('killLoader');
            // set debug level to 0 
            core.IWG.ame('set', {
                'debugLevel': [0, 'number']
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
            iwg.IWGEM.addEventListener(core.IWG.PAUSE.type, pauseGame);
            iwg.IWGEM.addEventListener(core.IWG.RESIZE.type, refreshStaticStages);

            var ua = navigator.userAgent.toLowerCase();
            var isAndroid = ua.indexOf("android") > -1;
            if (isAndroid) {
                R.THROTTLE = true;
            }
            setTimeout(function () {
                init()
            }, 1);
        };

    function init() {

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

        var gradient = Helper.makeBitmapImage("bg_gradient", {
            x: 0,
            y: 0
        }, 1),
            info = Helper.makeBitmapImage("footer_tax", {
                x: R.GAMEWIDTH / 2,
                y: 630
            }, 1),
            footerBar = Helper.makeBitmapImage("footer_bar", {
                x: 140,
                y: 560
            }, 0);
        footerBar.name = 'footerBar';

        if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) || navigator.platform === "BlackBerry") {
            info.scaleX = info.scaleY = 1.75;
            info.y = 625;
        }


        var desiredHeight = core.IWG.ame('get', {
            vars: ['gameHeight']
        }),
            desiredWidth = core.IWG.ame('get', {
                vars: ['gameWidth']
            });

        gradient.x = -250;
        gradient.y = -250;

        gradient.scaleX = 1.5; //desiredWidth / R.GAMEWIDTH;
        gradient.scaleY = 1.5; //desiredHeight / R.GAMEHEIGHT;

        R.STAGE.addChild(gradient, info);

        var ticket = new Ticket(core.IWG.ame('ticket'));

        // set up parallax 
        if (R.THROTTLE === false) {
        //  var parallax = new ParallaxBG();
        //  parallax.enabled(true);
        }

        var mainGameContainer = new createjs.Container(),
            sound = Helper.makeBitmapImage('audio_ON', {
            x: 842,
            y: 525
        }, 1);
        sound.scaleX = 0.75;
        sound.scaleY = 0.75;
        sound.name = "sound";

        sound.on('click', function () {
            MEvent.TOGGLESOUND.that = this;
            iwg.IWGEM.dispatchEvent(MEvent.TOGGLESOUND);
        });
        sound.alpha = 0;


        // set up event listeners
        iwg.IWGEM.addEventListener(MEvent.MOVELEFTCOMPLETE.type, moveLeftComplete);
        iwg.IWGEM.addEventListener(MEvent.MOVERIGHTCOMPLETE.type, moveRightComplete);
        iwg.IWGEM.addEventListener(MEvent.MOVELEFTSTART.type, moveLeftStart);
        iwg.IWGEM.addEventListener(MEvent.MOVERIGHTSTART.type, moveRightStart);
        iwg.IWGEM.addEventListener(MEvent.RESETPROMPT.type, resetPrompt);
        iwg.IWGEM.addEventListener(MEvent.TOGGLESOUND.type, toggleSound);

        var splashscreen = new Splash('splash', R.GAMEHEIGHT, R.GAMEWIDTH);
        var mainGame = new MainGameLayout('mainGame', R.GAMEHEIGHT, R.GAMEWIDTH);

        var game1Container = new createjs.Container(),
            game2Container = new createjs.Container();
        game1Container.x = game2Container.x = R.GAMEWIDTH + 1;

        R.LEFTGAMEWINDOW.addChild(game1Container, game2Container);

        var game1 = new MatchOne(50, 40, 158, game1Container, 'game1_coin', 'game1_diamond', ticket.getGame1(), 'g3', 'instruction_game1', 'tab_winningsymbol', 'tab_yoursymbols'),
            game2 = new MatchOne(50, 280, 158, game2Container, 'game2_bars', 'game2_wad', ticket.getGame2(), 'g4', 'instruction_game2', 'tab_winningnumber', 'tab_yournumbers'),
            game3 = new EqualsSeven(125, 125, 96, 80, R.RIGHTGAMEWINDOW, ticket.getGame3()),
            game4 = new MatchTwo(540, 125, 96, 100, R.RIGHTGAMEWINDOW, ticket.getGame4());

        R.GAMES = [game1, game2, game3, game4];

        mainGameContainer.addChild(splashscreen, mainGame);
        R.STAGE.addChild(footerBar);
        R.STAGE.addChild(sound);
        // tile bgTile for parralax 
        var holder = document.getElementById('IWGholder');
        holder.style.background = "url(" + camelot.core.iwgLoadQ.getResult('bgTile').src + ")";

        // error checks
        errorCheck(ticket);
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


    // reset prompts
    // counts clicks on gameassets to show prompts
    function resetPrompt(ev) {
        var count = ev.param;
        // reset prompts
        if (count === 0) {
            Helper.showPrompt();
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
            setTimeout(function () {
                var endGame = new EndGame();
                iwg.IWGEM.dispatchEvent(MEvent.ENDGAMEINTRO);
            }, 1500);
        }
    }
    
    function pauseGame(ev) {
        // check sound
        var state = ev.data;
        var tweens = TweenMax.getAllTweens(true);

        if (state === false) {
            // unpause
            // return sound to original state
            createjs.Sound.setMute(false);
            R.revealTimeline.play();

            for (var tween in tweens) {
                tweens[tween].play();
            }
        } else if (state === true) {
            // pause
            // force sound off
            createjs.Sound.setMute(false);
            R.PAUSECAPTURE = [R.GOES, R.TILESTURNED];
            createjs.Sound.setMute(true);
            //R.PLAYSOUND = false;
            R.revealTimeline.pause();
            for (var tween in tweens) {
                tweens[tween].pause()
            }
        }
        
        tweens = null;
    }
    
    function refreshStaticStages(e) {
        setTimeout(R.STAGE.update(), 100)
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


    function errorCheck(ticket) {
        var game3 = ticket.getGame3();
        for (var i = 0; i < game3.turn.length; i++) {
            var iconData = game3.turn[i].v,
                d = iconData.split("|"),
                values = d[0].split(','),
                prizeTotal = d[1];

            if ((Number(values[0]) + Number(values[1])) != Number(values[2])) {
                core.IWG.ame('error', {
                    mess: ['error on number addition for game3']
                });
            }

        }
    }

    Superrich.VERSION = '0_0_1';

    IWGInit = function () {
        //create an instance of the main game class once everything has loaded
        _Superrich = new Superrich();
    };
    iwg._class("core.IWGInit", IWGInit);
    iwg._class("iwg.Superrich", Superrich);
}(window));