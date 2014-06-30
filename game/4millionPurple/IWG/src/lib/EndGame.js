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
        Swipe = lib.Swipe,
        GameAsset = lib.GameAsset,
        MEvent = lib.MEvent,
        Ticket = lib.Ticket,

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
            if (Swipe.instance.getCurrentScreen() == 1 || Swipe.instance.getCurrentScreen() == 0) {
                
                var swipeRight = new TimelineLite({
                    delay: 3
                });
                swipeRight.call(function () {
                    // events
                    Swipe.instance.returnToEnd();
                    
                    
                    iwg.IWGEM.dispatchEvent(MEvent.ENDGAMEINTRO); 
                
                    
                    R.LOCK = true;
                });
            } else {
                var swipeRight = new TimelineLite({
                    delay: 2
                });
                swipeRight.call(function () {
                    // events
                    iwg.IWGEM.dispatchEvent(MEvent.ENDGAMEINTRO);
                    R.LOCK = true;

                });

            }
        }

        function setupLayout(self) {

            var endGameContainer = new createjs.Container(),
                endGameBackground = Helper.makeBitmapImage('box_endgame', {
                    x: 430,
                    y: 92
                }, 1, true);
            endGameContainer.x = 50;
            endGameContainer.y = -200;

            var bank = core.IWG.ame('bank', {
                balance: 'finalAmount',
                raw: true,
                log: true
            });

            var endGameTitle = null,
                endGameMessageContainer = new createjs.Container(),
                endGameMessageText = null,
                endGameMessagePrize = null,
                endGameButton = new createjs.Container(),
                endGameFinish = Helper.makeBitmapImage('button_finish', {
                    x: 360,
                    y: 110
                }, 1),
                endGameFinishHighlight = Helper.makeBitmapImage('button_finish_over', {
                    x: 360,
                    y: 110
                }, 1);

            endGameButton.addEventListener('click', function () {
                core.IWG.ame('closeGame');
            });


            // checks ticket if its a winner
            var wager = core.IWG.ame('get', {
                vars: ['iwgIsWager']
            });
            if (wager === true) {
                
                if (Ticket.instance.getParam().wT === '1') {

                    var string = "end_" + bank;

                    endGameTitle = Helper.makeBitmapImage('end_congrats', {
                        x: R.GAMEWIDTH / 2 - 150,
                        y: 85
                    }, 1, true);                    
                    
                    if (bank === 4000000) {
                        string = "end4mil";
                    }

                    endGameMessagePrize = Helper.makeBitmapImage(string, {
                        x: 500,
                        y: 20
                    }, 1, true);

                    switch (bank.toString().length) {
                    case 1:
                        endGameMessagePrize.x = 490;
                        break;

                    case 2:
                        endGameMessagePrize.x = 500;
                        break;

                    case 3:
                        endGameMessagePrize.x = 500;
                        break;

                    case 4:
                        endGameMessagePrize.x = 490;
                        break;

                    case 5:
                        endGameMessagePrize.x = 500;
                        break;

                    case 7:
                        endGameMessagePrize.x = 630;
                        break;
                    }

                } else {
                    
                    endGameTitle = Helper.makeBitmapImage('endgame_lose', {
                        x: 190,
                        y: 90
                    }, 1);

                }
            }

            endGameButton.addChild(endGameFinishHighlight, endGameFinish);
            endGameMessageContainer.addChild( endGameMessagePrize );
            endGameMessageContainer.x = 30;
            endGameMessageContainer.y = 70;

            endGameContainer.addChild(endGameBackground, endGameButton, endGameTitle, endGameMessageContainer);
            self.setEndGameContainer(endGameContainer);

            R.THIRDGAMEWINDOW.addChild(endGameContainer);
        }

        function endGameIntro() {
            var t = EndGame.instance,
                container = t.getEndGameContainer(),
                button = container.children[1].children[1];

            TweenLite.to(R.THIRDGAMEWINDOW, 0.8, {
                delay: 3.2,
                y: +120
            });
            TweenLite.to(container, 0.8, {
                delay: 3.2,
                y: -95,
                onStart: sound,
                onComplete: unlock
            });

            var endGameButtonTimeline = new TimelineMax({
                delay: 2.4,
                repeat: 5,
                yoyo: true
            });
            endGameButtonTimeline.to(button, 0.8, {
                alpha: 0,
                ease: "easeIn"
            });

            var soundButton = R.STAGE.getChildByName('sound');
            // animate fade off sound
            TweenLite.to(soundButton, 0.8, {
                alpha: 0,
                delay: 2.5
            });

        }

        function sound() {
            if (Ticket.instance.getParam().wT === '1') {
                if(R.PLAYSOUND){
                    createjs.Sound.play("endWin"); 
                }                
            } else {
                if(R.PLAYSOUND){
                    createjs.Sound.play("endLose"); 
                }                
            }
        }

        function unlock() {
            R.LOCK = false;
        }

        //namespace path
    iwg._class("iwg.lib.EndGame", EndGame);

}(window));