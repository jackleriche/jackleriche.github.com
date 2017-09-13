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
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GAMEOBJECT = IWG.GameObject, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, TICKET = IWG.Ticket, HELPER = IWG.Helper, GLOBAL = IWG.Global, SPRITESHEETS = IWG.SpriteSheets;
            var EndGameDual = (function (_super) {
                __extends(EndGameDual, _super);
                function EndGameDual(_name) {
                    _super.call(this, _name);
                    this._wager = CORE.IWG.ame('get', { vars: ['iwgIsWager'] });
                    this._endGameLayout();
                    this._subscribeEndGame();
                }
                EndGameDual.prototype._subscribeEndGame = function () {
                    IWG.IWGEM.on('showEndGame', this._showEndGame.bind(this));
                };
                EndGameDual.prototype._endGameLayout = function () {
                    var spritesheet = SPRITESHEETS.getInstance().getSpriteSheet("masterSS");
                    var endGameBackground = new GAMEOBJECT("endGameBackground", { w: 855, h: 150 }, 1, this);
                    endGameBackground.addBitmap({
                        name: "background",
                        pos: {
                            x: 428,
                            y: 75
                        },
                        frame: "box_endgame",
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    var endGameButton = new CLICKABLEGAMEOBJECT("endGameButton", { w: 181, h: 85 }, 1, this);
                    endGameButton.addBitmap({
                        name: "button",
                        pos: {
                            x: 91,
                            y: 43
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
                            x: 91,
                            y: 43
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
                            x: 91,
                            y: 43
                        },
                        frame: "button_finish_over",
                        alpha: 0,
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    endGameButton.setPosition({
                        x: 428 - 91,
                        y: 85
                    });
                    endGameButton.setEnabled(false);
                    endGameButton.addAnimation('pulse');
                    endGameButton.setAnimation('pulse', 'buttonReminder', 0.3, 3);
                    endGameButton.addAnimation('finish');
                    endGameButton.setAnimation('finish', 'click', 0.8, 0);
                    endGameButton.setAction('click', function () {
                        endGameButton.setEnabled(false);
                        endGameButton.animate('finish');
                        CORE.IWG.ame('closeGame');
                    });
                    var num = TICKET.getInstance().getOutcome().amount, wT = TICKET.getInstance().getOutcome().wT;
                    var endTextFrame = null, offset = 0, endTextPos = {
                        x: 115,
                        y: 45
                    }, endAmountPos = {
                        x: 540,
                        y: 48
                    };
                    if ((function (num) { return 100; }) && (num <= 999)) {
                        endAmountPos.x = 550;
                    }
                    else if ((function (num) { return 1000; }) && (num <= 5000)) {
                        endAmountPos.x = 565;
                    }
                    else if (num === 10000) {
                        endAmountPos.x = 570;
                        endTextPos.x = 110;
                    }
                    else if (num === 100000) {
                        endAmountPos.x = 560;
                        endTextPos.x = 90;
                    }
                    else {
                        endAmountPos.x = 560;
                        endTextPos.x = 70;
                    }
                    if (this._wager) {
                        if (wT === 1) {
                            var endGameAmount = new GAMEOBJECT("endGameAmount", { w: 230, h: 50 }, 1, this);
                            endGameAmount.addBitmap({
                                name: "endPrize",
                                pos: {
                                    x: 115,
                                    y: 25
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
                            endTextFrame = "end_congrats";
                        }
                        else {
                            endTextFrame = "end_lose";
                            endTextPos.x = 175;
                            endTextPos.y = 45;
                        }
                        ;
                    }
                    else {
                        endTextFrame = "end_trial";
                        endTextPos.x = 175;
                        endTextPos.y = 45;
                    }
                    ;
                    var endGameText = new GAMEOBJECT("endGameText", { w: 502, h: 50 }, 1, this);
                    endGameText.addBitmap({
                        name: "endText",
                        pos: {
                            x: 251,
                            y: 25
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
                    this.setParent(iwg.Helper.getScene('scene3'));
                };
                EndGameDual.prototype._winSound = function () {
                    if (TICKET.getInstance().getOutcome().wT === 1) {
                        createjs.Sound.play('endWin');
                    }
                    else {
                        createjs.Sound.play('endLose');
                    }
                };
                EndGameDual.prototype._showEndGame = function () {
                    var button = this.getChildByName('endGameButton'), self = this, scene = HELPER.getScene('scene3').getDiv(), sound = HELPER.getGameObject('sound'), slide = GLOBAL.getInstance().getFromGlobal('slide'), current = GLOBAL.getInstance().getFromGlobal('slide').getCurrentScreen(), delay = 0, timeline = new TimelineLite();
                    switch (current) {
                        case 0:
                            delay = 2;
                            break;
                        case 1:
                            delay = 2;
                            break;
                        default:
                            delay = 6;
                            break;
                    }
                    if (current !== 2) {
                        timeline.add(TweenMax.delayedCall(7, function () {
                            slide.moveToScreen(2);
                            console.log(delay);
                        }));
                    }
                    timeline.add(TweenMax.to(this.getDiv(), 1, { alpha: 1, delay: delay, y: -50, ease: Bounce.easeOut, onStart: function () {
                            TweenMax.to(scene, 0.6, { y: 90, ease: Linear.easeIn });
                            self._winSound();
                            self.setZindex('11');
                            self._checkEndBalance();
                        }, onComplete: function () {
                            button.setEnabled(true);
                            button.animate('pulse');
                            for (var i = 0; i < GLOBAL.getInstance().getFromGlobal('winners').length; i++) {
                                var winner = GLOBAL.getInstance().getFromGlobal('winners')[i];
                                winner.animate('pulse');
                            }
                        } }));
                };
                EndGameDual.prototype._checkEndBalance = function () {
                    CORE.IWG.ame('bank', { balance: 'finalAmount', log: true });
                };
                return EndGameDual;
            })(iwg.Scene);
            iwg.EndGameDual = EndGameDual;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
