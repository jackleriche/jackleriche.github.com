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

        setupLeftWindow();
        setupRightWindow();

        R.LEFTGAMEWINDOW.x = R.GAMEWIDTH;
        R.RIGHTGAMEWINDOW.x = core.IWG.ame('get', {
            vars: ['gameWidth']
        }) / R.SCALE + 203;
        R.MAINGAMECONTAINER.addChild(R.LEFTGAMEWINDOW, R.RIGHTGAMEWINDOW);


        var sound = Helper.makeBitmapImage('audio_ON', {
            x: 1850,
            y: 525
        }, 1);
        sound.scaleX = 0.75;
        sound.scaleY = 0.75;
        sound.name = "sound";

        sound.on('click', function () {
            MEvent.TOGGLESOUND.that = this;
            iwg.IWGEM.dispatchEvent(MEvent.TOGGLESOUND);
        });


        R.STAGE.addChild(R.MAINGAMECONTAINER, sound);


    }

    function setupLeftWindow() {

        var leftWindow = new createjs.Container(),
            promptRight = Helper.makeBitmapImage('arrow_right', {
                x: 910,
                y: 160
            }, 0);
        promptRight.name = "rightPrompt";


        leftWindow.addChild(promptRight);
        leftWindow.setBounds(0, 0, R.GAMEWIDTH, R.GAMEHEIGHT);

        R.LEFTGAMEWINDOW = leftWindow;

    }

    function setupRightWindow() {


        var rightWindow = new createjs.Container(),
            promptLeft = Helper.makeBitmapImage('arrow_left', {
                x: 30,
                y: 160
            }, 0);
        promptLeft.name = "leftPrompt";

        rightWindow.addChild(promptLeft);
        rightWindow.setBounds(0, 0, R.GAMEWIDTH, R.GAMEHEIGHT);
        R.RIGHTGAMEWINDOW = rightWindow;

    }

    function mainGameIntro() {

        setTimeout(function () {

            R.LEFTGAMEWINDOW.x = 0;

            var game1 = R.LEFTGAMEWINDOW.children[1],
                game2 = R.LEFTGAMEWINDOW.children[2];


            TweenLite.to(game1, 0.5, {
                x: R.GAMES[0].getX()
            });
            TweenLite.to(game2, 0.5, {
                delay: 0.2,
                x: R.GAMES[1].getX()
            });

            TweenLite.to(R.STAGE.getChildByName("sound"), 0.5, {
                delay: 0.2,
                x: R.GAMES[1].getX() + 350
            });

            var swipe = new Swipe(R.STAGE);

            swipe.enabled(true, R.STAGE.canvas, R.MAINGAMECONTAINER, 70);

            Helper.showPrompt('left', 5000);

        }, 500);


    }

    //namespace path
    iwg._class("iwg.lib.MainGameLayout", MainGameLayout);
}(window));