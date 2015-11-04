/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="GameObject.ts" />
/// <reference path="Scene.ts" />
/// <reference path="Instruction.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GLOBAL = IWG.Global, GAMEOBJECT = IWG.GameObject, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, SPRITESHEETS = IWG.SpriteSheets, ANIMATION = IWG.Animation, images = CORE.iwgLoadQ.images, SPLASH = IWG.Splash, BOARD = IWG.Board, LEGEND = IWG.Legend, BALLBANK = IWG.BallBank, BONUSSTAR = IWG.BonusStar, INSTANTWIN = IWG.InstantWin, BALLSELECTION = IWG.BallSelection, ENDGAME = IWG.EndGame, INSTRUCTION = IWG.Instruction, TICKET = IWG.Ticket, MINIGAMEONE = IWG.MiniGameOne, MINIGAMETWO = IWG.MiniGameTwo;
            var MainLayout = (function () {
                function MainLayout() {
                    this._subscribe();
                    this._setupBackground();
                    this._setupSplash();
                    this._miniGameSetup();
                    this._setupEndgame();
                }
                MainLayout.prototype._subscribe = function () {
                    IWG.IWGEM.on('mainGameSetup', this._mainGameSetup.bind(this));
                };
                MainLayout.prototype._unsubscribe = function () {
                    IWG.IWGEM.off('mainGameSetup');
                };
                MainLayout.prototype._setupBackground = function () {
                    var ele = document.createElement("div");
                    ele.id = "background";
                    document.getElementById("IWGholder").appendChild(ele);
                };
                MainLayout.prototype._setupSplash = function () {
                    var ballSelection = new BALLSELECTION('ballSelection');
                    ballSelection.setDimensions({
                        w: 960,
                        h: 640
                    });
                    ballSelection.setZindex("2");
                    ballSelection.setAlpha(0);
                    var splash = new SPLASH("splash");
                    splash.setDimensions({
                        w: 960,
                        h: 640
                    });
                    splash.setZindex("2");
                };
                MainLayout.prototype._mainGameSetup = function () {
                    var logo = new GAMEOBJECT('logoSmall', { w: 234, h: 243 }, 5);
                    logo.addBitmap({
                        name: "logoSmall",
                        pos: {
                            x: 117,
                            y: 121.5
                        },
                        frame: "logo_small",
                        alpha: 0,
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                        doReg: {
                            center: true
                        }
                    });
                    logo.active = true;
                    logo.setPosition({
                        x: 65,
                        y: 0
                    });
                    TweenMax.to(logo.getBitmap('logoSmall'), 0.5, { alpha: 1, delay: 0.6, onComplete: function () {
                            logo.active = false;
                        } });
                    var instructions = new INSTRUCTION('instructions');
                    var bankNumbers = new BALLBANK('numberBank');
                    bankNumbers.setDimensions({
                        w: 300,
                        h: 100
                    });
                    bankNumbers.setPosition({
                        x: 35,
                        y: 250
                    });
                    bankNumbers.setAlpha(0);
                    var bonusStar = new BONUSSTAR('bonusLegend');
                    bonusStar.setDimensions({
                        w: 175,
                        h: 105
                    });
                    bonusStar.setPosition({
                        x: 20,
                        y: 400
                    });
                    bonusStar.setAlpha(0);
                    var instantWin = new INSTANTWIN('instantWin');
                    instantWin.setDimensions({
                        w: 140,
                        h: 100
                    });
                    instantWin.setPosition({
                        x: 220,
                        y: 400
                    });
                    instantWin.setAlpha(0);
                    var board = new BOARD('board');
                    board.setDimensions({
                        w: 560,
                        h: 621
                    });
                    board.setPosition({
                        x: 380,
                        y: 10
                    });
                    board.setZindex("2");
                    board.setAlpha(0);
                };
                MainLayout.prototype._miniGameSetup = function () {
                    try {
                        if (TICKET.getInstance().getMiniGame()[0].mG === 1) {
                            var miniGameOne = new MINIGAMEONE("miniGameOne");
                            miniGameOne.setDimensions({
                                w: 530,
                                h: 560
                            });
                            miniGameOne.setPosition({
                                x: 395,
                                y: 65
                            });
                            miniGameOne.setZindex(1);
                            miniGameOne.setAlpha(0);
                        }
                        else if (TICKET.getInstance().getMiniGame()[0].mG === 2) {
                            var miniGameTwo = new MINIGAMETWO("miniGameTwo");
                            miniGameTwo.setDimensions({
                                w: 530,
                                h: 560
                            });
                            miniGameTwo.setPosition({
                                x: 395,
                                y: 65
                            });
                            miniGameTwo.setZindex(1);
                            miniGameTwo.setAlpha(0);
                        }
                    }
                    catch (err) {
                        console.log('no minigame');
                    }
                };
                MainLayout.prototype._setupEndgame = function () {
                    var endGame = new ENDGAME("endGame");
                    endGame.setDimensions({
                        w: 360,
                        h: 350
                    });
                    endGame.setPosition({
                        x: 480,
                        y: -400
                    });
                    endGame.setZindex("6");
                };
                return MainLayout;
            })();
            iwg.MainLayout = MainLayout;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
//# sourceMappingURL=MainLayout.js.map