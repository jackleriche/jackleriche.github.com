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
        //add events
        iwg.IWGEM.addEventListener(MEvent.MAINGAMEINTRO.type, mainGameIntro);

        // setup
        setupLightning();
        setupFirstWindow();

        R.MAINGAMECONTAINER.x = R.GAMEWIDTH + 300;
        R.MAINGAMECONTAINER.addChild(R.FIRSTGAMEWINDOW);

        var sound = Helper.makeBitmapImage('sound_on', {
            x: 50,
            y: 527
        }, 1);
        sound.name = "sound";
        sound.alpha = 0;

        sound.on('click', function () {
            MEvent.TOGGLESOUND.that = this;
            iwg.IWGEM.dispatchEvent(MEvent.TOGGLESOUND);
        });

        R.STAGE.addChild(R.SPLASH, R.MAINGAMECONTAINER, sound);
    }

    function setupLightning() {

        for(var i = 0; i < 10; i++){
            var lightningHolder = new createjs.Container();
            lightningHolder.x   = R.GAMEWIDTH / 2;
            lightningHolder.y   = R.GAMEHEIGHT / 2;
            lightningHolder.rotation  = 36 * i;

            // create lightning
            var lightning       = Helper.makeBitmapImage("bolt", {x: 0, y: 0});
            lightning.regX      = lightning.getBounds().width;
            lightning.regY      = lightning.getBounds().height / 2;
            lightning.name      = "lightning"+i;

            var lightningMask   = new createjs.Shape();
            //lightningMask.graphics.beginFill("black");
            lightningMask.graphics.moveTo(lightning.x - 600 , lightning.y - 19);
            lightningMask.graphics.lineTo(lightning.x - 195, lightning.y - 21);
            lightningMask.graphics.lineTo(lightning.x - 202, lightning.y - 46);
            lightningMask.graphics.lineTo(lightning.x, lightning.y - 25);
            lightningMask.graphics.lineTo(lightning.x - 148, lightning.y - 20);
            lightningMask.graphics.lineTo(lightning.x - 135, lightning.y + 15);
            lightningMask.graphics.lineTo(lightning.x - 600, lightning.y + 40);

            //lightningMask.alpha = 0.3;

            var shimmerContainer    = new createjs.Container();
            var shimmer             = new createjs.Shape();
            shimmer.graphics.setStrokeStyle(40);
            shimmer.graphics.beginStroke("#fff");
            shimmer.graphics.moveTo( 0, -70 );
            shimmer.graphics.lineTo( -40, 70 );
            shimmer.graphics.endStroke();

            shimmerContainer.mask = lightningMask;

            shimmer.shadow = new createjs.Shadow("white", 0, 0, 50);

            shimmerContainer.addChild(shimmer);
            shimmerContainer.x = -800;

            lightningHolder.addChild( lightning, shimmerContainer );

            R.STAGE.addChild(lightningHolder);

            TweenMax.to(shimmerContainer, 0.5, {
                x: 80,
                delay: Helper.randomFromInterval(5, 10),
                repeatDelay: Helper.randomFromInterval(5, 10),
                repeat: -1
            });

        }

    }

    function setupFirstWindow() {

        var firstWindow     = new createjs.Container(),
            instructions    = Helper.makeBitmapImage('instructions', {
                x: R.GAMEWIDTH / 2 ,
                y: 550
            }, 1, true);
        instructions.name = "instructions";

        firstWindow.addChild(instructions);
        firstWindow.setBounds(0, 0, R.GAMEWIDTH, R.GAMEHEIGHT);

        R.FIRSTGAMEWINDOW = firstWindow;
        R.FIRSTGAMEWINDOW.name = "firstGameWindow";

    }

    function mainGameIntro() {

        setTimeout(function () {

            if(R.PLAYSOUND){
                createjs.Sound.play('whoosh');
            }
            TweenLite.to(R.MAINGAMECONTAINER, 1, {
                x: 0
            });
            TweenLite.to(R.STAGE.getChildByName("sound"), 1, {
                delay: 0.5,
                alpha:1
            });

            var swipe = new Swipe(R.STAGE);
            R.SWIPE = swipe;

        }, 500);
    }

    //namespace path
    iwg._class("iwg.lib.MainGameLayout", MainGameLayout);
}(window));
