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
                    delay: 2.5,
                    onComplete: function(){iwg.IWGEM.dispatchEvent(MEvent.ENDGAMEINTRO)}
                });
                swipeRight.call(function () {
                    // events
                    Swipe.instance.returnToEnd();                   
                    R.LOCK = true;
                });
            } else {
                var swipeRight = new TimelineLite({
                    delay: 1.2,
                    onComplete: function(){
                        iwg.IWGEM.dispatchEvent(MEvent.ENDGAMEINTRO);
                    }
                });
                swipeRight.call(function () {
                    // events
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
                    x: 350,
                    y: 110
                }, 1);

            endGameButton.addEventListener('click', function () {
                top.location.href =  "http://www.sideplay.com/portfolio/game/68/%C2%A34%20Million%20Blue";
            });


            // checks ticket if its a winner
            var wager = core.IWG.ame('get', {
                vars: ['iwgIsWager']
            });
            if (wager === true) {
                
                if (Ticket.instance.getOutcome().wT === '1') {

                    var string = "end_" + bank;

                    endGameTitle = Helper.makeBitmapImage('end_congrats', {
                        x: R.GAMEWIDTH / 2 - 150,
                        y: 85
                    }, 1, true);                    
                    
                    if (bank === 4000000) {
                        string = "end_4mil";
                    } else if (bank === 100000) {
                        string = "end_100k";
                    } else if (bank === 10000) {
                        string = "end10000";
                    }

                    endGameMessagePrize = Helper.makeBitmapImage(string, {
                        x: 500,
                        y: 20
                    }, 1, true);

                    switch (bank.toString().length) {
                    case 1:
                        endGameMessagePrize.x = 610;
                        break;

                    case 2:
                        endGameMessagePrize.x = 610;
                        break;

                    case 3:
                        endGameMessagePrize.x = 610;
                        break;

                    case 4:
                        endGameMessagePrize.x = 620;
                        break;

                    case 5:
                        endGameMessagePrize.x = 620;
                        endGameTitle.x -= 10;
                        break;
                    case 6:
                        endGameMessagePrize.x = 630;
                        endGameTitle.x -= 10;
                        break;

                    case 7:
                        endGameMessagePrize.x = 640;
                        endGameTitle.x -= 20;
                        break;
                    }

                } else {
                    
                    endGameTitle = Helper.makeBitmapImage('end_lose', {
                        x: R.GAMEWIDTH / 2 - 50,
                        y: 80
                    }, 1 ,true);

                }
            } else {
            
                endGameButton.y = -55;
                
            }
            
            // boxhighlight
            var endGameButtonFinishHighlight            = new createjs.Shape();
            endGameButtonFinishHighlight.graphics.setStrokeStyle(10);
            endGameButtonFinishHighlight.graphics.beginStroke("#fff");
            endGameButtonFinishHighlight.snapToPixel    = true;
            endGameButtonFinishHighlight.graphics.drawRoundRect(335, 92, 146, 49, 10);
            endGameButtonFinishHighlight.shadow         =  new createjs.Shadow("#fff", 0, 0, 15);
            endGameButtonFinishHighlight.name           = "boxHighlight"

            endGameButtonFinishHighlight.x              = 30;
            endGameButtonFinishHighlight.y              = 35;

            endGameButton.addChild(endGameFinish, endGameButtonFinishHighlight);
            endGameMessageContainer.addChild( endGameMessagePrize );
            endGameMessageContainer.x = 30;
            endGameMessageContainer.y = 70;            

            endGameContainer.addChild(endGameBackground,endGameButton, endGameTitle, endGameMessageContainer);
            self.setEndGameContainer(endGameContainer);

            R.THIRDGAMEWINDOW.addChild(endGameContainer);
        }

        function endGameIntro() {
            var t = EndGame.instance,
                container = t.getEndGameContainer();

            TweenLite.to(R.THIRDGAMEWINDOW.getChildByName('doubleMatch'), 0.8, {
                delay: 3.2,
                y: +190
            });
            TweenLite.to(container, 0.8, {
                delay: 3.2,
                y: 10,
                onStart: sound,
                onComplete: unlock
            });

            var highlight = container.children[1].getChildByName("boxHighlight");
            highlight.alpha = 0;

            var boxReminder = new TweenMax.to(highlight, 0.7, {
                alpha: 1,
                ease: "easeIn",
                repeat: -1,
                yoyo: true,
                delay: 6
            });


            var soundButton = R.STAGE.getChildByName('sound');
            // animate fade off sound
            TweenLite.to(soundButton, 0.8, {
                alpha: 0,
                delay: 2.5
            });

            // highlight winners
            highlightWinners();
        }

        function highlightWinners() {
            // loop over all games 
            for (var i = 0; i < R.GAMES.length; i++) {
                R.GAMES[i].pulseWinners();
            }
        }

        function sound() {
            if (Ticket.instance.getOutcome().wT === '1') {
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
            Swipe.instance.setEnabled(true);
        }

        //namespace path
    iwg._class("iwg.lib.EndGame", EndGame);

}(window));