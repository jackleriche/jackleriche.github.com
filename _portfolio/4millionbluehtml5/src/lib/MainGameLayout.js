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
                x: 930,
                y: 265
            }, 0, true);
        promptRight.name = "arrow_right";
        
        var rightAreaShape = new createjs.Shape();
            rightAreaShape.graphics.beginFill("#fff").drawRect(-15, -30, 50, 150);
        promptRight.hitArea =   rightAreaShape;

        promptRight.on('click', function(){
            iwg.IWGEM.dispatchEvent(MEvent.MOVERIGHTSTART);
            Swipe.instance.moveRight();          
        });
        
        var growAnimationRight = TweenMax.to(promptRight, 0.7, {
            scaleX: 1.2,
            scaleY: 1.2,
            yoyo:true,
            repeat: -1,
            delay: 4,
            paused:true
        });
        R.PROMPTS.push(growAnimationRight);

        firstWindow.addChild(promptRight);
        firstWindow.setBounds(0, 0, R.GAMEWIDTH, R.GAMEHEIGHT);

        R.FIRSTGAMEWINDOW = firstWindow;

    }

    function setupSecondWindow() {

        var secondWindow = new createjs.Container(),
            promptLeft = Helper.makeBitmapImage('arrow_left', {
                x: 28,
                y: 265
            }, 1, true),
            promptRight = Helper.makeBitmapImage('arrow_right', {
                x: 930,
                y: 265
            }, 1, true);
            
        var rightAreaShape = new createjs.Shape();
            rightAreaShape.graphics.beginFill("#fff").drawRect(-15, -30, 50, 150);
        promptRight.hitArea =   rightAreaShape;
        var leftAreaShape = new createjs.Shape();
            leftAreaShape.graphics.beginFill("#fff").drawRect(-15, -30, 50, 150);
        promptLeft.hitArea =   leftAreaShape;
        
        promptLeft.on('click', function(){
            iwg.IWGEM.dispatchEvent(MEvent.MOVELEFTSTART);
            Swipe.instance.moveLeft();
        });
        promptRight.on('click', function(){
            iwg.IWGEM.dispatchEvent(MEvent.MOVERIGHTSTART);
            Swipe.instance.moveRight();
        });
        
        var growAnimationLeft = TweenMax.to(promptLeft, 0.7, {
            scaleX: 1.2,
            scaleY: 1.2,
            yoyo:true,
            repeat: -1,
            delay: 4,
            paused:true
        });
        R.PROMPTS.push(growAnimationLeft);

        var growAnimationRight = TweenMax.to(promptRight, 0.7, {
            scaleX: 1.2,
            scaleY: 1.2,
            yoyo:true,
            repeat: -1,
            delay: 4,
            paused:true
        });
        R.PROMPTS.push(growAnimationRight);
        
        promptLeft.name = "arrow_left";
        promptRight.name = "arrow_right";

        secondWindow.addChild(promptLeft, promptRight);
        secondWindow.setBounds(0, 0, R.GAMEWIDTH, R.GAMEHEIGHT);
        R.SECONDGAMEWINDOW = secondWindow;

    }

    function setupThirdWindow() {

        var thirdWindow = new createjs.Container(),
            promptLeft = Helper.makeBitmapImage('arrow_left', {
                x: 28,
                y: 265
            }, 1, true);
            
        var leftAreaShape = new createjs.Shape();
            leftAreaShape.graphics.beginFill("#fff").drawRect(-15, -30, 50, 150);
        promptLeft.hitArea =   leftAreaShape;
        
        promptLeft.on('click', function(){
            iwg.IWGEM.dispatchEvent(MEvent.MOVELEFTSTART);
            Swipe.instance.moveLeft();
        });  
        
        var growAnimationLeft = TweenMax.to(promptLeft, 0.7, {
            scaleX: 1.2,
            scaleY: 1.2,
            yoyo:true,
            repeat: -1,
            delay: 4,
            paused:true
        });
        R.PROMPTS.push(growAnimationLeft);
        
        promptLeft.name = "arrow_left";

        thirdWindow.addChild(promptLeft);
        thirdWindow.setBounds(0, 0, R.GAMEWIDTH, R.GAMEHEIGHT);
        R.THIRDGAMEWINDOW = thirdWindow;

    }

    function mainGameIntro() {

        setTimeout(function () {
            
            R.FIRSTGAMEWINDOW.x = 0;

            var game1   = R.FIRSTGAMEWINDOW.children[1],
                game2   = R.FIRSTGAMEWINDOW.children[2],
                prompt  = R.FIRSTGAMEWINDOW.getChildByName('arrow_right');
            
            TweenMax.to(prompt, 1, { delay: 0.5, alpha: 1});
            
            R.SECONDGAMEWINDOW.x = R.GAMEWIDTH + 400;
            R.THIRDGAMEWINDOW.x = (R.GAMEWIDTH * 2) + 800;
            

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
            
            Helper.showPrompt()
            

        }, 500);


    }

    //namespace path
    iwg._class("iwg.lib.MainGameLayout", MainGameLayout);
}(window));