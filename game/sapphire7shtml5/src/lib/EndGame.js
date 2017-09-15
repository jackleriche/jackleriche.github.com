(function (window) {
    "use strict";
    //set local paths to external files.
    var IWGInit,
        camelot     = window.com.camelot,
        core        = camelot.core,
        iwg         = camelot.iwg,
        lib         = iwg.lib,
        GS          = window.com.greensock,
        Helper      = lib.Helper,
        R           = lib.R,
        buttonSS    = lib.flassets.ButtonSS,
        Swipe       = lib.Swipe,
        GameAsset   = lib.GameAsset,
        MEvent      = lib.MEvent,
        Ticket      = lib.Ticket,

        EndGame = function () {
            if (typeof EndGame.instance === "object") {
                return EndGame.instance;
            }

            var _currentScreen = null,
                _endGameContainer = null;
            // getters
            this.getCurrentScreen = function () {
                return _currentScreen;
            }
            this.getEndGameContainer = function () {
                return _endGameContainer;
            }
            // setters
            this.setCurrentScreen = function (prv) {
                _currentScreen = prv;
            }
            this.setEndGameContainer = function (prv) {
                _endGameContainer = prv;
            }

            EndGame.instance = this;

            init(this);
        }

        //private method
        function init(self) {

            iwg.IWGEM.addEventListener(MEvent.ENDGAMEINTRO.type, endGameIntro);
            setupLayout(self);
            R.STATE = 1;
            
        }

        function setupLayout(self) {
            
            var endGameContainer = new createjs.Container();  
            endGameContainer.x = R.GAMEWIDTH + 300;
            endGameContainer.y = 250;

            var bank = core.IWG.ame('bank', {
                    balance: 'finalAmount',
                    raw: true,
                    log: true
                }),
                wager = core.IWG.ame('get', {
                    vars: ['iwgIsWager']
                }),
                endGameBackground   = null,
                endGameTitle        = null,
                endGameMessageContainer = new createjs.Container(),
                endGameMessageText = null,
                endGameMessagePrize = null,
                endGameButton = new createjs.Container(),
                endGameFinish = Helper.makeBitmapImage('finish', {
                    x: 105,
                    y: 100
                }, 1, true, buttonSS);
                endGameFinish.name = "endGameFinish";

            endGameButton.name = "endGameButton";
            endGameButton.addEventListener('click', function () {
                top.location.href = "http://www.sideplay.com/portfolio/game/65/Sapphire%207s%20Multiplier";
            });

            endGameBackground = Helper.makeBitmapImage('end_box', {
                    x: R.GAMEWIDTH / 2 - 50,
                    y: 92
                }, 1, true);
            // checks ticket if its a winner
            if (wager === true) {

                if (R.TICKET.getOutcome().wT === '1') {
               
                    var string = "end" + bank;
                    endGameTitle = Helper.makeBitmapImage('end_congrats', {
                        x: R.GAMEWIDTH / 2  - 50,
                        y: 50
                    }, 1, true);                    
                    
                    endGameMessagePrize = Helper.makeBitmapImage(string, {
                        x: R.GAMEWIDTH / 2 -50,
                        y: 115
                    }, 1, true);
                    
                    endGameButton.x = R.GAMEWIDTH / 2 - 50;
                    endGameButton.y = 140

                } else {
                    
                    endGameTitle = Helper.makeBitmapImage('end_lose', {
                        x: R.GAMEWIDTH / 2 - 50,
                        y: 70
                    }, 1 ,true);

                    endGameButton.x = R.GAMEWIDTH / 2 - 50;
                    endGameButton.y = 130
                }
            } else {
                   
                endGameButton.x = R.GAMEWIDTH / 2 - 50;
                endGameButton.y = 50;
                
            }

            endGameButton.addChild(endGameFinish);
            
            endGameContainer.addChild(endGameBackground, endGameButton, endGameTitle, endGameMessageContainer, endGameMessagePrize);
            self.setEndGameContainer(endGameContainer);
            
            endGameContainer.name = "endGameContainer";

            R.ENDGAME.addChild(endGameContainer);
            R.STAGE.addChild(R.ENDGAME);
            
            iwg.IWGEM.dispatchEvent(MEvent.ENDGAMEINTRO);
            
        }

        function endGameIntro() {
            
            var t               = EndGame.instance,
                container       = t.getEndGameContainer(),
                button          = container.getChildByName("endGameButton"),
                turnsContainer  = R.FIRSTGAMEWINDOW.getChildByName('turnsContainer');

            TweenLite.to(turnsContainer, 0.8, {
                delay: 2.5,
                x: turnsContainer.x - 200
            });

            for(var i = 0; i < R.TURNSARRAY.length; i++) {

                var turn = R.TURNSARRAY[i];

                // console.log(turn.getContainer());
                if (!turn.getRevealed()) {
                    TweenLite.to(turn.getContainer(), 0.8, {
                        alpha: 0.5
                    });
                }
            }

            TweenLite.to(container, 0.8, {
                delay: 2.5,
                x: R.GAMEWIDTH - 650,
                onStart: sound,
                onComplete: unlock
            });

            var soundButton = R.STAGE.getChildByName('sound');
            // animate fade off sound
            TweenLite.to(soundButton, 0.8, {
                alpha: 0,
                delay: 2.5
            });

            setTimeout(function(){
                console.log(button);
                button.getChildByName("endGameFinish").gotoAndPlay('finish');
            }, 7000);
                 
        }

        function sound() {
            if (R.TICKET.getOutcome().wT === '1') {
                if(R.PLAYSOUND){
                    createjs.Sound.play("endWinSound"); 
                }                
            } else {
                if(R.PLAYSOUND){
                    createjs.Sound.play("endLoseSound"); 
                }                
            }
        }

        function unlock() {
            R.LOCK = false;
        }

        //namespace path
    iwg._class("iwg.lib.EndGame", EndGame);

}(window));