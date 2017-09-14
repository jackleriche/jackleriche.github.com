(function (window) {
    "use strict";
    //set local paths to external files.
    var IWGInit,
        camelot		= window.com.camelot,
        core		= camelot.core,
        iwg			= camelot.iwg,
        lib			= iwg.lib,
        GS			= window.com.greensock,
        Helper		= lib.Helper,
        R			= lib.R,
        MEvent		= lib.MEvent,
        Swipe		= lib.Swipe,

    MainGameLayout = function () {

        if (typeof MainGameLayout.instance === "object") {
			return MainGameLayout.instance;
        }

        MainGameLayout.instance = this;

		init();
    };

    function init(){

		iwg.IWGEM.addEventListener(MEvent.MAINGAMEINTRO.type, mainGameIntro);

		setupLeftWindow();
		setupRightWindow();

		R.LEFTGAMEWINDOW.x = R.GAMEWIDTH;
		R.RIGHTGAMEWINDOW.x = core.IWG.ame('get', {vars: ['availableWidth']})/R.SCALE + 203;
		R.MAINGAMECONTAINER.addChild( R.LEFTGAMEWINDOW, R.RIGHTGAMEWINDOW);
		R.STAGE.addChild(R.MAINGAMECONTAINER);

	}

    function setupLeftWindow(){

		var leftWindow			= new createjs.Container(),
			promptRight 		= new createjs.Shape();
            promptRight.name	= "rightPrompt";
			promptRight.graphics.f().s("rgba(255,255,255,0.8)").ss(4, 2, 1).p("AApANIhRDdAApgMIhRjd");
			promptRight.alpha 	= 0;


		leftWindow.addChild( promptRight);
		leftWindow.setBounds(0, 0, R.GAMEWIDTH, R.GAMEHEIGHT);

		R.LEFTGAMEWINDOW = leftWindow;
		R.LEFTGAMEWINDOW.alpha = 0;

    }

	function setupRightWindow(){

		var rightWindow				= new createjs.Container(),
			game3BG					= Helper.makeBitmapImage("box_short", {x:50, y:100}, 1),
			game3Info				= Helper.makeBitmapImage('instruction_game3', {x:80, y: 430}, 1),
			game4BG					= Helper.makeBitmapImage("box_short", {x:465, y:100}, 1),
			game4Info				= Helper.makeBitmapImage('instruction_game4', {x:490, y: 430}, 1);

		rightWindow.addChild(game3BG, game3Info, game4BG, game4Info);

		rightWindow.setBounds(0, 0, R.GAMEWIDTH, R.GAMEHEIGHT);
		R.RIGHTGAMEWINDOW = rightWindow;

	}

	function mainGameIntro(){

		setTimeout(function(){
			var footerBar 	= R.STAGE.getChildByName('footerBar');
			var soundButton = R.STAGE.getChildByName('sound');
			R.LEFTGAMEWINDOW.x = 0;
			R.LEFTGAMEWINDOW.alpha = 1;

			var game1 = R.LEFTGAMEWINDOW.children[1],
				game2 = R.LEFTGAMEWINDOW.children[2];

			TweenLite.to(game1, 0.5, { x: 0 });
			TweenLite.to(game2, 0.5, { delay: 0.2, x: 0 });

			// animate game entrance
			TweenLite.to(footerBar, 0.5, { alpha: 1, delay: 0.5});
			TweenLite.to(soundButton, 0.5, { alpha: 1, delay: 0.5});

			var swipe = new Swipe(R.STAGE);
			swipe.enabled(true, R.STAGE.canvas, R.MAINGAMECONTAINER, 70);

			Helper.showPrompt('left', 5000);

		}, 500);

	}

    //namespace path
    iwg._class("iwg.lib.MainGameLayout", MainGameLayout);
}(window));
