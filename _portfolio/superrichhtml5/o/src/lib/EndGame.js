(function (window) {
    "use strict";
    //set local paths to external files.
    var IWGInit,
        camelot 	= window.com.camelot,
        core		= camelot.core,
        iwg 		= camelot.iwg,
        lib 		= iwg.lib,
        GS 			= window.com.greensock,
        Helper 		= lib.Helper,
        R 			= lib.R,
        Swipe		= lib.Swipe,
        GameAsset	= lib.GameAsset,
        MEvent		= lib.MEvent,
        ticket 		= lib.Ticket,

    EndGame = function () {
        if (typeof EndGame.instance === "object") {
            return EndGame.instance;
        }

        var _currentScreen 		= null,
        	_endGameContainer 	= null;
        // getters
        this.getCurrentScreen = function(){
	        return _currentScreen;
        }
        this.getEndGameContainer = function(){
	        return _endGameContainer;
        }
        // setters
        this.setCurrentScreen = function(prv){
	        _currentScreen = prv;
        }
        this.setEndGameContainer = function(prv){
	        _endGameContainer = prv;
        }

        EndGame.instance = this;

		init(this);
    }

    //private method
    function init(self) {

    	setupLayout(self);
    	if (Swipe.instance.getCurrentScreen() === 0){
    		setTimeout(function(){
	    		Swipe.instance.moveRight();
    		}, 1000);
    	}

    	R.LOCK = true;
		// events
    	iwg.IWGEM.addEventListener(MEvent.ENDGAMEINTRO.type, endGameIntro);

    }

    function setupLayout(self){

	    var endGameContainer 	= new createjs.Container(),
	    	endGameBackground	= Helper.makeBitmapImage('box_endgame', {x:430, y:92}, 1);
	    	endGameContainer.x 	= 50;
	    	endGameContainer.y 	= R.GAMEHEIGHT + 200;

		var bank = core.IWG.ame('bank', {balance: 'finalAmount', raw:true, log: true});

		var endGameTitle = null,
			endGameMessageContainer = new createjs.Container(),
			endGameMessageText	= null,
			endGameMessagePrize = null,
			endGameButton = new createjs.Container(),
			endGameFinish = Helper.makeBitmapImage('button_finish', {x: 360, y: 120}, 1),
			endGameFinishHighlight = Helper.makeBitmapImage('button_finish_over', {x: 360, y: 120}, 1);

		endGameButton.addEventListener('click', function(){
			core.IWG.ame('closeGame');
		});


		// checks ticket if its a winner
		if (core.IWG.ame('get', {vars: ['iwgIsWager']}) === true) {
			if (ticket.instance.getIsWinner() === '1') {

				var string = "endgame_win_"+bank;

				endGameTitle = Helper.makeBitmapImage('endgame_congratulations', {x: 160, y: 35}, 1);
				endGameMessageText = Helper.makeBitmapImage('endgame_youhavewon', {x: 90, y: 0}, 1);
				if (bank === 1208000){
					endGameMessageText.x = -145;
					string = "endgame_win_topprize";
				}

				endGameMessagePrize = Helper.makeBitmapImage(string, {x: 500, y: 35}, 1);

				switch(bank.toString().length){

					case 4:
						endGameMessageText.x	= 70;
						endGameMessagePrize.x 	= 505;
						break;

					case 5:
						endGameMessageText.x	= 60;
						endGameMessagePrize.x 	= 505;
						break;

					case 7:
						endGameMessagePrize.x = 225;
						endGameMessagePrize.y = 0;
						break;
					}

			} else if (ticket.instance.getIsWinner() === '0') {

				endGameTitle = Helper.makeBitmapImage('endgame_lose', {x:160, y:35}, 1);

   			}
        }

		endGameButton.addChild(endGameFinishHighlight, endGameFinish);
		endGameMessageContainer.addChild(endGameMessageText, endGameMessagePrize);
		endGameMessageContainer.x = 30;
		endGameMessageContainer.y = 70;

	    endGameContainer.addChild(endGameBackground, endGameButton, endGameTitle, endGameMessageContainer);
	    self.setEndGameContainer(endGameContainer);

	    R.RIGHTGAMEWINDOW.addChild(endGameContainer);
    }

    function endGameIntro(){
	    var t 			= EndGame.instance,
	    	container 	= t.getEndGameContainer(),
	    	button 		= container.children[1].children[1];

	    TweenLite.to(R.RIGHTGAMEWINDOW, 0.8, {delay: 1.8, y: -80});
	    TweenLite.to(container, 0.8, {delay: 1.8, y: 460, onStart: sound, onComplete: unlock});

	    var endGameButtonTimeline = new TimelineMax({delay: 1, repeat: 5, yoyo: true});
	    	endGameButtonTimeline.to(button, 0.8, {alpha: 0, ease: "easeIn" });

    }

    function sound(){
	    if (ticket.instance.getIsWinner() === '1') {
			createjs.Sound.play("Win_zing");
		} else {
			createjs.Sound.play("Level_fail");
		}
    }

    function unlock(){
    	R.LOCK = false;
    }

    //namespace path
    iwg._class("iwg.lib.EndGame", EndGame);

}(window));
