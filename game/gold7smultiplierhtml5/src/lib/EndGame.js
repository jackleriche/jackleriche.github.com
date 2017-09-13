var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="Scene.ts" />
/// <reference path="GameObject.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GAMEOBJECT = IWG.GameObject, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, TICKET = IWG.Ticket, SPRITESHEETS = IWG.SpriteSheets;
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
                    var spritesheet = SPRITESHEETS.getInstance().getSpriteSheet("gold7sMultiplier"), sound = '', self = this;
                    var endGameBackground = new GAMEOBJECT("endGameBackground", { w: 331, h: 233 }, 1, this);
                    endGameBackground.addBitmap({
                        name: "background",
                        pos: {
                            x: 165,
                            y: 116
                        },
                        frame: "endgame_box",
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    var endGameButton = new CLICKABLEGAMEOBJECT("endGameButton", { w: 182, h: 91 }, 1, this);
                    endGameButton.addBitmap({
                        name: "button",
                        pos: {
                            x: 91,
                            y: 45.5
                        },
                        frame: "finish",
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    endGameButton.setPosition({
                        x: 75,
                        y: 170
                    });
                    endGameButton.setEnabled(false);
                    endGameButton.addAnimation('rollover');
                    endGameButton.addAnimation('rollout');
                    endGameButton.setAnimation('rollover', 'rollover', 0.2, 0);
                    endGameButton.setAnimation('rollout', 'rollout', 0.2, 0);
                    endGameButton.addAnimation('buttonPress');
                    endGameButton.setAnimation('buttonPress', 'buttonPress');
                    endGameButton.setAction('click', function () {
                        endGameButton.setEnabled(false);
                        endGameButton.animate('buttonPress');
                        top.location.href = "http://www.sideplay.com/portfolio/game/107/Gold%207's%20Multiplier";
                    });
                    endGameButton.setAction('rollover', function () {
                        endGameButton.getBitmap('button').gotoAndStop('finish_over');
                        endGameButton.getStage().update();
                        endGameButton.animate('rollover');
                        self._stopReminderSymbol(true);
                    });
                    endGameButton.setAction('rollout', function () {
                        endGameButton.getBitmap('button').gotoAndStop('finish');
                        endGameButton.getStage().update();
                        endGameButton.animate('rollout');
                        self._stopReminderSymbol(true);
                    });
                    this._setReminder();
                    var num = TICKET.getInstance().getOutcome().amount;
                    var endTextFrame = null, endTextPos = {
                        x: 0,
                        y: 30
                    };
                    if (this._wager) {
                        if (TICKET.getInstance().getParams().wT === 1) {
                            endTextFrame = "end_win";
                            var endGameAmount = new GAMEOBJECT("endGameAmount", { w: 204, h: 66 }, 1, this);
                            endGameAmount.addBitmap({
                                name: "endPrize",
                                pos: {
                                    x: 102,
                                    y: 33
                                },
                                frame: "end" + num,
                                spriteSheet: spritesheet,
                                doReg: {
                                    center: true
                                }
                            });
                            endGameAmount.setPosition({
                                x: 65,
                                y: 110
                            });
                        }
                        else {
                            endTextFrame = "end_lose";
                            endTextPos.x = 8;
                            endTextPos.y = 65;
                        }
                        ;
                    }
                    else {
                        endTextFrame = "end_trial";
                        endTextPos.y = 65;
                    }
                    ;
                    CORE.IWG.ame('bank', { deposit: [num], log: true });
                    var endGameText = new GAMEOBJECT("endGameText", { w: 324, h: 82 }, 1, this);
                    endGameText.addBitmap({
                        name: "endText",
                        pos: {
                            x: 162,
                            y: 41
                        },
                        frame: endTextFrame,
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    endGameText.setPosition({
                        x: endTextPos.x,
                        y: endTextPos.y
                    });
                };
                EndGame.prototype._setReminder = function () {
                    var button = this.getChildByName('endGameButton'), bitmap = button.getBitmap('button');
                    ;
                    button.animationTimeLine = new TimelineMax({
                        onStartParams: [button],
                        onStart: function (button) {
                            button.active = true;
                        },
                        paused: true,
                        onCompleteParams: [button],
                        onComplete: function (button) {
                            button.active = false;
                        }
                    });
                    button.animationTimeLine.to(bitmap, 1, { delay: 4,
                        onStartParams: [button],
                        onStart: function (button) { } }, 'start')
                        .to(bitmap, 1, {
                        repeat: -1,
                        yoyo: true,
                        scaleX: 1.1,
                        scaleY: 1.1,
                        repeatDelay: 0.5,
                        onStartParams: [button],
                        onStart: function (button) {
                            button.active = true;
                        } }, 'pulse');
                    this._startReminderSymbol();
                };
                EndGame.prototype._startReminderSymbol = function () {
                    var button = this.getChildByName('endGameButton');
                    if (!button.getRevealed()) {
                        button.animationTimeLine.restart();
                    }
                };
                EndGame.prototype._stopReminderSymbol = function (reset) {
                    var button = this.getChildByName('endGameButton');
                    if (!button.getRevealed()) {
                        if (reset) {
                            button.animationTimeLine.restart();
                        }
                        else {
                            button.animationTimeLine.pause("start");
                        }
                    }
                };
                EndGame.prototype._winSound = function () {
                    if (TICKET.getInstance().getParams().wT === 1) {
                        createjs.Sound.play('endWin');
                    }
                    else {
                        createjs.Sound.play('endLose');
                    }
                };
                EndGame.prototype._showEndGame = function () {
                    var button = this.getChildByName('endGameButton'), self = this;
                    TweenMax.to(this.getDiv(), 0.8, { alpha: 1, delay: 0.5, x: 630, ease: Back.easeOut, onStart: function () {
                            self._winSound();
                        }, onComplete: function () {
                            button.setEnabled(true);
                        } });
                };
                return EndGame;
            })(iwg.Scene);
            iwg.EndGame = EndGame;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
