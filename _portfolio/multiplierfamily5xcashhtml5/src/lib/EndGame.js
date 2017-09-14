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
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GAMEOBJECT = IWG.GameObject, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, TICKET = IWG.Ticket, HELPER = IWG.Helper, SPRITESHEETS = IWG.SpriteSheets;
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
                    var endGameBackground = new GAMEOBJECT("endGameBackground", { w: 696, h: 370 }, 1, this);
                    endGameBackground.addBitmap({
                        name: "background",
                        pos: {
                            x: 348,
                            y: 150
                        },
                        frame: "panel",
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        },
                        scale: {
                            x: 0.8,
                            y: 0.8
                        }
                    });
                    endGameBackground.setPosition({
                        y: -120,
                        x: 90
                    });
                    var endGameButton = new CLICKABLEGAMEOBJECT("endGameButton", { w: 190, h: 100 }, 1, this);
                    endGameButton.addBitmap({
                        name: "button",
                        pos: {
                            x: 95,
                            y: 50
                        },
                        frame: "button_finish",
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    endGameButton.addBitmap({
                        name: "button_glow",
                        pos: {
                            x: 95,
                            y: 50
                        },
                        frame: "button_finish_over",
                        alpha: 0,
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    endGameButton.setPosition({
                        x: 348 - 8,
                        y: 90
                    });
                    endGameButton.setEnabled(false);
                    endGameButton.addAnimation('pulse');
                    endGameButton.setAnimation('pulse', 'buttonReminder', 0.5, 4);
                    endGameButton.addAnimation('finish');
                    endGameButton.setAnimation('finish', 'click', 0.8, 0);
                    endGameButton.setAction('click', function () {
                        endGameButton.setEnabled(false);
                        endGameButton.animate('finish');
                        top.location.href = "http://www.sideplay.com/portfolio/game/111/5x%20Cash";
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
                        x: 0,
                        y: 40
                    }, endAmountPos = {
                        x: 500,
                        y: 40
                    };
                    if (num <= 5) {
                        offset = 155;
                    }
                    else if ((function (num) { return 10; }) && (num <= 100)) {
                        offset = 150;
                    }
                    else if (num === 1000) {
                        offset = 140;
                    }
                    else if (num === 10000) {
                        offset = 130;
                    }
                    else {
                        offset = 0;
                    }
                    if ((!this._wager) || (wT === 0)) {
                        offset = 175;
                    }
                    if (this._wager) {
                        if (wT === 1) {
                            var endGameAmount = new GAMEOBJECT("endGameAmount", { w: 173, h: 40 }, 1, this);
                            endGameAmount.addBitmap({
                                name: "endPrize",
                                pos: {
                                    x: 86,
                                    y: 20
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
                        }
                        ;
                    }
                    else {
                        endTextFrame = "end_trial";
                    }
                    ;
                    var endGameText = new GAMEOBJECT("endGameText", { w: 520, h: 40 }, 1, this);
                    endGameText.addBitmap({
                        name: "endText",
                        pos: {
                            x: 260,
                            y: 20
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
                EndGame.prototype._checkEndBalance = function () {
                    CORE.IWG.ame('bank', { balance: 'finalAmount', log: true });
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
                    var button = this.getChildByName('endGameButton'), self = this, logo = HELPER.getGameObject('logoGame');
                    TweenMax.to(this.getDiv(), 1, { alpha: 1, delay: 5, y: 0, ease: Bounce.easeOut, onStart: function () {
                            self._winSound();
                            self.setZindex('11');
                            TweenMax.to(HELPER.getGameObject('shinerBrand0').getCanvas(), 1, { alpha: 0 });
                            TweenMax.to(HELPER.getGameObject('shinerBrand1').getCanvas(), 1, { alpha: 0 });
                            TweenMax.to(HELPER.getGameObject('shinerBrand2').getCanvas(), 1, { alpha: 0 });
                            TweenMax.to(HELPER.getGameObject('shinerBrand3').getCanvas(), 1, { alpha: 0 });
                            TweenMax.to(HELPER.getGameObject('shinerBrand4').getCanvas(), 1, { alpha: 0 });
                            TweenMax.to(HELPER.getGameObject('shinerBrand5').getCanvas(), 1, { alpha: 0 });
                            TweenMax.to(logo.getCanvas(), 0.5, { alpha: 0 });
                            self._checkEndBalance();
                        }, onComplete: function () {
                            button.setEnabled(true);
                            button.animate('pulse');
                        } });
                };
                return EndGame;
            })(iwg.Scene);
            iwg.EndGame = EndGame;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
