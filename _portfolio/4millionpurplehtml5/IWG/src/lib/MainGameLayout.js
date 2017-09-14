(function (window) {
    "use strict";
    //set local paths to external files.
    var IWGInit,
        camelot = window.com.camelot,
        core = camelot.core,
        iwg = camelot.iwg,
        lib = iwg.lib,
        GS = window.com.greensock,
        Helper = lib.Helper,
        R = lib.R,
        MEvent = lib.MEvent,
        Swipe = lib.Swipe,

        MainGameLayout = function () {

            if (typeof MainGameLayout.instance === "object") {
                return MainGameLayout.instance;
            }

            MainGameLayout.instance = this;
            init();

        };

    function init() {


        iwg.IWGEM.addEventListener(MEvent.MAINGAMEINTRO.type, mainGameIntro);

        setupFirstWindow();
        setupSecondWindow();
        setupThirdWindow();

        R.FIRSTGAMEWINDOW.x = core.IWG.ame('get', {
            vars: ['gameWidth']
        });
        R.SECONDGAMEWINDOW.x = core.IWG.ame('get', {
            vars: ['gameWidth']
        }) / R.SCALE + 203;
        R.THIRDGAMEWINDOW.x = core.IWG.ame('get', {
            vars: ['gameWidth']
        }) / R.SCALE + 1263;

        R.MAINGAMECONTAINER.addChild(R.FIRSTGAMEWINDOW, R.SECONDGAMEWINDOW, R.THIRDGAMEWINDOW);


        var sound = Helper.makeBitmapImage('sound', {
            x: 850,
            y: 525
        }, 1);
        sound.name = "sound";
        sound.alpha = 0;


        var soundCircle    = new createjs.Shape();
        soundCircle.graphics.beginFill("#f00").drawCircle(20,20,40);
        sound.hitArea = soundCircle;

        sound.on('click', function () {
            MEvent.TOGGLESOUND.that = this;
            iwg.IWGEM.dispatchEvent(MEvent.TOGGLESOUND);
        });

        R.STAGE.addChild(R.MAINGAMECONTAINER, sound);
    }

    function setupFirstWindow() {

        var firstWindow = new createjs.Container(),
            promptRight = Helper.makeBitmapImage('arrow_right', {
                x: 900,
                y: 160
            }, 0);
        promptRight.name = "firstWindowRightPrompt";


        firstWindow.addChild(promptRight);
        firstWindow.setBounds(0, 0, R.GAMEWIDTH, R.GAMEHEIGHT);

        R.FIRSTGAMEWINDOW = firstWindow;

    }

    function setupSecondWindow() {

        var secondWindow = new createjs.Container(),
            promptLeft = Helper.makeBitmapImage('arrow_left', {
                x: 10,
                y: 160
            }, 0),
            promptRight = Helper.makeBitmapImage('arrow_right', {
                x: 900,
                y: 160
            }, 0);
        promptLeft.name = "secondWindowLeftPrompt";
        promptRight.name = "secondWindowRightPrompt";

        secondWindow.addChild(promptLeft, promptRight);
        secondWindow.setBounds(0, 0, R.GAMEWIDTH, R.GAMEHEIGHT);
        R.SECONDGAMEWINDOW = secondWindow;

    }

    function setupThirdWindow() {

        var thirdWindow = new createjs.Container(),
            promptLeft = Helper.makeBitmapImage('arrow_left', {
                x: 10,
                y: 160
            }, 0);
        promptLeft.name = "thirdWindowLeftPrompt";

        thirdWindow.addChild(promptLeft);
        thirdWindow.setBounds(0, 0, R.GAMEWIDTH, R.GAMEHEIGHT);
        R.THIRDGAMEWINDOW = thirdWindow;

    }

    function mainGameIntro() {

        setTimeout(function () {

            R.FIRSTGAMEWINDOW.x = 0;

            var game1 = R.FIRSTGAMEWINDOW.children[1],
                game2 = R.FIRSTGAMEWINDOW.children[2];

            R.SECONDGAMEWINDOW.x = R.GAMEWIDTH + 100;
            R.THIRDGAMEWINDOW.x = (R.GAMEWIDTH * 2) + 200;


            TweenLite.to(game1, 0.5, {
                x: R.GAMES[0].getX()
            });
            TweenLite.to(game2, 0.5, {
                delay: 0.2,
                x: R.GAMES[1].getX()
            });

            if(R.PLAYSOUND){
                createjs.Sound.play('whoosh');
            }
            TweenLite.to(R.STAGE.getChildByName("sound"), 1, {
                delay: 0.5,
                //x: R.GAMES[1].getX() + 350
                alpha:1
            });

            var swipe = new Swipe(R.STAGE);
            R.SWIPE = swipe;

            swipe.enabled(true, R.STAGE.canvas, R.MAINGAMECONTAINER, 100);
            swipe.enableToggle(true);

            Helper.showPrompt('left', 5000);

        }, 500);


    }

    //namespace path
    iwg._class("iwg.lib.MainGameLayout", MainGameLayout);
}(window));
