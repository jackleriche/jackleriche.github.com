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

        }

        function setupLayout(self) {

            var endGameContainer = new createjs.Container();
            endGameContainer.x = 50;
            endGameContainer.y = -200;

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
                    x: 0,
                    y: 0
                }, 1, true);

            endGameButton.name = "endGameButton";
            endGameButton.addEventListener('click', function () {

                //core.IWG.ame('closeGame');
                top.location.href =  "http://www.sideplay.com/portfolio/game/62/%C2%A3100k%20Yellow";

            });


            // checks ticket if its a winner
            if (wager === true) {

                if (R.TICKET.getOutcome().wT === '1') {

                    endGameBackground = Helper.makeBitmapImage('end_box_win', {
                        x: R.GAMEWIDTH / 2 - 50,
                        y: 92
                    }, 1, true);

                    var string = "pw" + bank;

                    endGameTitle = Helper.makeBitmapImage('end_win', {
                        x: R.GAMEWIDTH / 2  - 50,
                        y: 45
                    }, 1, true);

                    endGameMessagePrize = Helper.makeBitmapImage(string, {
                        x: R.GAMEWIDTH / 2 -50,
                        y: 90
                    }, 1, true);

                    endGameButton.x = R.GAMEWIDTH / 2 - 50;
                    endGameButton.y = 140

                } else {

                    endGameBackground = Helper.makeBitmapImage('end_box_win', {
                        x: R.GAMEWIDTH / 2 - 50,
                        y: 92
                    }, 1, true);

                    endGameTitle = Helper.makeBitmapImage('end_lose', {
                        x: R.GAMEWIDTH / 2 - 50,
                        y: 70
                    }, 1 ,true);

                    endGameButton.x = R.GAMEWIDTH / 2 - 50;
                    endGameButton.y = 130
                }
            } else {

                endGameBackground = Helper.makeBitmapImage('end_box_try', {
                    x: 430,
                    y: 92
                }, 1, true);

                endGameButton.x = R.GAMEWIDTH / 2 - 50;
                endGameButton.y = 93;

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

            var t           = EndGame.instance,
                container   = t.getEndGameContainer(),
                button      = container.getChildByName("endGameButton"),

                row1        = R.GAME.getAssetRow()[0][0],
                row2        = R.GAME.getAssetRow()[0][1];

            TweenLite.to(row1, 0.8, {
                delay: 2.2,
                y: +130
            });
            TweenLite.to(row2, 0.8, {
                delay: 2.2,
                y: +60
            });
            TweenLite.to(container, 0.8, {
                delay: 3.2,
                y: 25,
                onStart: sound,
                onComplete: unlock
            });

            var soundButton = R.STAGE.getChildByName('sound');
            // animate fade off sound
            TweenLite.to(soundButton, 0.8, {
                alpha: 0,
                delay: 2.5
            });

            TweenMax.to(button, 0.8, {
                yoyo: true,
                repeat: -1,
                scaleX: 1.1,
                scaleY: 1.1,
                delay: 7.5
            });

            // highlight winners
            //highlightWinners();
        }

        function highlightWinners() {
            // loop over all games
            for (var i = 0; i < R.GAMES.length; i++) {
                R.GAMES[i].pulseWinners();
            }
        }

        function sound() {
            if (R.TICKET.getOutcome().wT === '1') {
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
