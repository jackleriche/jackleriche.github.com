var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../imports/js/Sideplay.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GAMEOBJECT = IWG.GameObject, GLOBAL = IWG.Global, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, TICKET = IWG.Ticket, HELPER = IWG.Helper, SPRITESHEETS = IWG.SpriteSheets;
            var EndGame = (function (_super) {
                __extends(EndGame, _super);
                function EndGame(_name) {
                    _super.call(this, _name);
                    this._wager = CORE.IWG.ame('get', { vars: ['iwgIsWager'] });
                    this._endGameLayout();
                    this._subscribeEndGame();
                }
                EndGame.prototype._subscribeEndGame = function () {
                    IWG.IWGEM.on('showEndGame', this._showEndGame.bind(this));
                };
                EndGame.prototype._endGameLayout = function () {
                    var spritesheet = SPRITESHEETS.getInstance().getSpriteSheet("masterSS");
                    var endGameBackground = new GAMEOBJECT("endGameBackground", { w: 274, h: 172 }, 1, this);
                    endGameBackground.addBitmap({
                        name: "background",
                        pos: {
                            x: 137,
                            y: 86
                        },
                        frame: "box_endgame",
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    var endGameButton = new CLICKABLEGAMEOBJECT("endGameButton", { w: 164, h: 84 }, 1, this);
                    endGameButton.addBitmap({
                        name: "button",
                        pos: {
                            x: 82,
                            y: 42
                        },
                        frame: "button_finish",
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    endGameButton.addBitmap({
                        name: "button_border_glow",
                        pos: {
                            x: 82,
                            y: 42
                        },
                        frame: "finish_white",
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        },
                        alpha: 0
                    });
                    endGameButton.addBitmap({
                        name: "button_glow",
                        pos: {
                            x: 82,
                            y: 42
                        },
                        frame: "button_finish_over",
                        alpha: 0,
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    endGameButton.setPosition({
                        x: 55,
                        y: 104
                    });
                    endGameButton.setEnabled(false);
                    endGameButton.addAnimation('pulse');
                    endGameButton.setAnimation('pulse', 'buttonReminder', 0.3, 3);
                    endGameButton.addAnimation('finish');
                    endGameButton.setAnimation('finish', 'click', 0.8, 0);
                    endGameButton.setAction('click', function () {
                        endGameButton.setEnabled(false);
                        endGameButton.animate('finish');
                        top.location.href =  "http://www.sideplay.com/portfolio/game/113/4%20Million%20Black";
                    });
                    endGameButton.setAction('rollover', function () {
                        endGameButton.getBitmap('button').gotoAndStop('button_finish_over');
                        endGameButton.getStage().update();
                    });
                    endGameButton.setAction('rollout', function () {
                        endGameButton.getBitmap('button').gotoAndStop('button_finish');
                        endGameButton.getStage().update();
                    });
                    var num = TICKET.getInstance().getOutcome().amount, wT = TICKET.getInstance().getOutcome().wT;
                    var endTextFrame = null, offset = 0, endTextPos = {
                        x: 36,
                        y: 35
                    }, endAmountPos = {
                        x: 51,
                        y: 83
                    };
                    if (this._wager) {
                        if (wT === 1) {
                            var endGameAmount = new GAMEOBJECT("endGameAmount", { w: 172, h: 36 }, 1, this);
                            endGameAmount.addBitmap({
                                name: "endPrize",
                                pos: {
                                    x: 86,
                                    y: 18
                                },
                                frame: "end" + num,
                                spriteSheet: spritesheet,
                                doReg: {
                                    center: true
                                }
                            });
                            endGameAmount.setPosition({
                                x: endAmountPos.x + offset,
                                y: endAmountPos.y
                            });
                            endTextFrame = "end_win";
                        }
                        else {
                            endTextFrame = "end_lose";
                            endTextPos.x = 38;
                            endTextPos.y = 50;
                        }
                        ;
                    }
                    else {
                        endTextFrame = "end_trial";
                        endTextPos.x = 36;
                        endTextPos.y = 50;
                    }
                    ;
                    var endGameText = new GAMEOBJECT("endGameText", { w: 200, h: 54 }, 1, this);
                    endGameText.addBitmap({
                        name: "endText",
                        pos: {
                            x: 100,
                            y: 27
                        },
                        frame: endTextFrame,
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    endGameText.setPosition({
                        x: endTextPos.x + offset,
                        y: endTextPos.y
                    });
                };
                EndGame.prototype._winSound = function () {
                    if (TICKET.getInstance().getOutcome().wT === 1) {
                        createjs.Sound.play('endWin');
                    }
                    else {
                        createjs.Sound.play('endLose');
                    }
                };
                EndGame.prototype._showEndGame = function () {
                    var button = this.getChildByName('endGameButton'), self = this;
                    TweenMax.to(this.getDiv(), 1, { scaleX: 1, scaleY: 1, delay: 6, ease: Bounce.easeOut, onStart: function () {
                            self._winSound();
                            self.setZindex('11');
                            TweenMax.to(HELPER.getGameObject('mainLogo').getBitmap('mainLogo'), 0.5, { alpha: 0 });
                            self._checkEndBalance();
                        }, onComplete: function () {
                            button.setEnabled(true);
                            button.animate('pulse');
                            for (var i = 0; i < GLOBAL.getInstance().getFromGlobal('winners').length; i++) {
                                var winner = GLOBAL.getInstance().getFromGlobal('winners')[i];
                                winner.animate('pulse');
                            }
                        } });
                };
                EndGame.prototype._checkEndBalance = function () {
                    CORE.IWG.ame('bank', { balance: 'finalAmount', log: true });
                };
                return EndGame;
            })(iwg.Scene);
            iwg.EndGame = EndGame;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
