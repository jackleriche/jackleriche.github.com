var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
                    this._amount = TICKET.getInstance().getOutcome().amount;
                    this._isWinner = Number(TICKET.getInstance().getOutcome().wT);
                    this._endGameLayout();
                    this._subscribeEndGame();
                }
                EndGame.prototype._subscribeEndGame = function () {
                    IWG.IWGEM.on('showEndGame', this._showEndGame.bind(this));
                };
                EndGame.prototype._showEndGame = function () {
                    var _this = this;
                    TweenMax.to(this.getDiv(), 1, { y: 140, delay: 1, ease: Bounce.easeOut, onComplete: function () {
                            if (_this._isWinner === 1 && _this._wager) {
                                createjs.Sound.play('endWin');
                            }
                            else {
                                createjs.Sound.play('endLose');
                            }
                            TweenMax.to(_this.getChildByName('endGameButton').getCanvas(), 1, { delay: 1, alpha: 1, onComplete: function () {
                                    _this.getChildByName('endGameButton').setEnabled(true);
                                } });
                        } });
                };
                EndGame.prototype._endGameLayout = function () {
                    var _this = this;
                    var spritesheet = SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop");
                    var endGameBackground = new GAMEOBJECT("endGameBackground", { w: 360, h: 350 }, 1, this);
                    endGameBackground.addBitmap({
                        name: "background",
                        pos: {
                            x: 180,
                            y: 90
                        },
                        frame: "bg_endgame",
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    var endGameButton = new CLICKABLEGAMEOBJECT("endGameButton", { w: 240, h: 110 }, 1, this);
                    endGameButton.addBitmap({
                        name: "button",
                        pos: {
                            x: 120,
                            y: 55
                        },
                        frame: "button_finish",
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    endGameButton.setPosition({
                        x: 60,
                        y: 195
                    });
                    endGameButton.setEnabled(false);
                    endGameButton.setAlpha(0);
                    endGameButton.setAction('click', function () {
                        // endGameButton.setEnabled(false);
                       top.location.href = "http://www.sideplay.com/portfolio/game/112/Lotto%20Drop";
                        // CORE.IWG.ame('closeGame');
                    });
                    endGameButton.setAction('rollover', function () {
                        _this._stopReminderSymbol(true);
                    });
                    endGameButton.setAction('rollout', function () {
                        _this._stopReminderSymbol(true);
                    });
                    this._endGameTextSetup();
                    this._setReminder();
                };
                EndGame.prototype._endGameTextSetup = function () {
                    var spritesheet = SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"), endTextFrame = null, endTextPos = { x: 39, y: 25 };
                    if (this._wager) {
                        if (this._isWinner === 1) {
                            endTextFrame = "end_win";
                        }
                        else {
                            endTextFrame = "end_lose";
                            endTextPos.y = 55;
                        }
                        ;
                    }
                    else {
                        endTextFrame = "end_trial";
                        endTextPos.y = 50;
                    }
                    ;
                    var endGameText = new GAMEOBJECT("endGameText", { w: 276, h: 70 }, 1, this);
                    endGameText.addBitmap({
                        name: "endGameText",
                        pos: {
                            x: 138,
                            y: 35
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
                    if (this._isWinner === 1 && this._wager) {
                        var endGameAmount = new GAMEOBJECT("endGameAmount", { w: 211, h: 66 }, 1, this);
                        endGameAmount.addBitmap({
                            name: "amount",
                            pos: {
                                x: 102,
                                y: 33
                            },
                            frame: "end" + this._amount,
                            spriteSheet: spritesheet,
                            doReg: {
                                center: true
                            }
                        });
                        endGameAmount.setPosition({
                            x: 75,
                            y: 100
                        });
                    }
                    ;
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
                return EndGame;
            })(iwg.Scene);
            iwg.EndGame = EndGame;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
