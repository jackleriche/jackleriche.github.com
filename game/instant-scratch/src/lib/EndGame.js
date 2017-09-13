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
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GAMEOBJECT = IWG.GameObject, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, TICKET = IWG.Ticket, HELPER = IWG.Helper, SCENE = IWG.Scene, SPRITESHEETS = IWG.SpriteSheets;
            var EndGame = (function (_super) {
                __extends(EndGame, _super);
                function EndGame(_name) {
                    _super.call(this, _name);
                    this._wager = CORE.IWG.ame('get', { vars: ['iwgIsWager'] });
                    this._scaled = false;
                    this._endGameLayout();
                    this._subscribeEndGame();
                }
                EndGame.prototype._subscribeEndGame = function () {
                    IWG.IWGEM.on('showEndGame', this._showEndGame.bind(this));
                };
                EndGame.prototype._endGameLayout = function () {
                    var spritesheet = SPRITESHEETS.getInstance().getSpriteSheet("masterSingleSS");
                    console.log('end game made');
                    var endGameButton = new CLICKABLEGAMEOBJECT("endGameButton", { w: 132, h: 52 }, 1, this);
                    endGameButton.addBitmap({
                        name: "button",
                        pos: {
                            x: 66,
                            y: 26
                        },
                        frame: "button_finish",
                        alpha: 0,
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    endGameButton.addBitmap({
                        name: "button_glow",
                        pos: {
                            x: 66,
                            y: 26
                        },
                        frame: "button_finish_over",
                        alpha: 0,
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    endGameButton.setPosition({
                        x: 75,
                        y: 140
                    });
                    endGameButton.setEnabled(false);
                    endGameButton.setReminder(true, 'buttonReminder');
                    endGameButton.addAnimation('finish');
                    endGameButton.setAnimation('finish', 'click', 0.8, 0);
                    endGameButton.setAction('click', function () {
                        endGameButton.setEnabled(false);
                        top.location.href = "http://www.sideplay.com/portfolio/game/142/Instant%20Scratch";
                        endGameButton.animate('finish');
                    });
                    endGameButton.setAction('rollover', function () {
                        endGameButton.getBitmap('button').gotoAndStop('button_finish_over');
                        endGameButton.getStage().update();
                        IWG.IWGEM.trigger('stopReminder');
                    });
                    endGameButton.setAction('rollout', function () {
                        endGameButton.getBitmap('button').gotoAndStop('button_finish');
                        endGameButton.getStage().update();
                        IWG.IWGEM.trigger('restartReminder');
                    });
                    var wT = TICKET.getInstance().getOutcome().wT;
                    var endTextFrame = null, endTextPos = {
                        x: 24,
                        y: 30
                    };
                    if (this._wager) {
                        if (wT === 1) {
                            endTextFrame = "end_win";
                        }
                        else {
                            endTextFrame = "end_lose";
                            endTextPos.x = 24;
                            endTextPos.y = 50;
                        }
                        ;
                    }
                    else {
                        endTextFrame = "end_trial";
                        endTextPos.x = 24;
                        endTextPos.y = 50;
                    }
                    ;
                    if (this._wager && CORE.IWG.ame('bank', { balance: 'finalAmount', raw: true }) > 0) {
                        var text = "<p id=\"CONGRATULATIONS\" class=\"green\">CONGRATULATIONS!</p> <p id=\"YOU\" class=\"green\">YOU</p> <p id=\"HAVE\" class=\"green\">HAVE</p> <p id=\"WON\" class=\"green\">WON</p> <p id=\"ENDPRIZE\">" + iwg.Helper.numberWithCommas(CORE.IWG.ame('bank', { balance: 'finalAmount', log: true })) + "</p>";
                    }
                    else if (this._wager && CORE.IWG.ame('bank', { balance: 'finalAmount', raw: true }) === 0) {
                        var text = "<p id=\"BETTER\">BETTER</p> <p id=\"LUCK\">LUCK</p> <p id=\"NEXT\">NEXT</p> <p id=\"TIME\">TIME</p>";
                    }
                    else {
                        var text = "<p id=\"THANKS\">THANKS</p> <p id=\"FOR\">FOR</p> <p id=\"PLAYING\">PLAYING</p>";
                    }
                    var animationScene = new SCENE('endGameMonitorScene');
                    animationScene.setDimensions({
                        w: 226,
                        h: 182
                    });
                    animationScene.setPosition({
                        x: 26,
                        y: 16
                    });
                    animationScene.setParent(this);
                    animationScene.getDiv().innerHTML += text;
                    if (this._wager && TICKET.getInstance().getOutcome().amount > 0) {
                        if (CORE.IWG.ame('get', 'IS_IOS')) {
                            TweenLite.set('#CONGRATULATIONS', { x: 5, y: -100 });
                        }
                        else {
                            if (navigator.userAgent.match(/Version\/[\d\.]+.*Safari/) !== null) {
                                TweenLite.set('#CONGRATULATIONS', { x: 7, y: -100 });
                            }
                            else {
                                TweenLite.set('#CONGRATULATIONS', { x: 14, y: -100 });
                            }
                        }
                        TweenLite.set('#YOU', { x: -130, y: 50 });
                        TweenLite.set('#HAVE', { x: 85, y: -150 });
                        TweenLite.set('#WON', { x: 400, y: 50 });
                        TweenLite.set('#ENDPRIZE', { x: 0, y: -100 });
                    }
                    else if (this._wager && TICKET.getInstance().getOutcome().amount === 0) {
                        TweenLite.set('#BETTER', { x: -140, y: 20 });
                        TweenLite.set('#LUCK', { x: 400, y: 20 });
                        TweenLite.set('#NEXT', { x: -140, y: 50 });
                        TweenLite.set('#TIME', { x: 400, y: 50 });
                    }
                    else {
                        TweenLite.set('#THANKS', { x: 30, y: -150 });
                        TweenLite.set('#FOR', { x: 400, y: 20 });
                        TweenLite.set('#PLAYING', { x: -140, y: 50 });
                    }
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
                    var _this = this;
                    var delay = 1;
                    if (CORE.IWG.ame('bank', { balance: 'finalAmount', raw: true }) > 0) {
                        delay = 3;
                    }
                    var timeline = new TimelineMax({
                        paused: true, delay: delay
                    });
                    var button = this.getChildByName('endGameButton'), gameScene = HELPER.getScene('mainGame').getDiv(), overlay = HELPER.getGameObject('overlay'), gameScale = HELPER.getGameObject('bg_scale');
                    button.active = true;
                    this.setZindex('9');
                    overlay.setZindex('11');
                    timeline.to(gameScene, 0.5, { scaleX: 0.445, scaleY: 0.445, x: 199 }, 'stage1');
                    timeline.to(overlay.getCanvas(), 0.5, { alpha: 0.8 }, 'stage1');
                    if (this._wager && TICKET.getInstance().getOutcome().amount > 0) {
                        timeline.to('#CONGRATULATIONS', 0.25, { y: 20 })
                            .to('#YOU', 0.25, { x: 38 })
                            .to('#HAVE', 0.25, { y: 50 })
                            .to('#WON', 0.25, { x: 142 })
                            .to('#ENDPRIZE', 0.25, { y: 75, onStart: function () {
                                _this._winSound();
                            } });
                    }
                    if (this._wager && TICKET.getInstance().getOutcome().amount === 0) {
                        timeline.to('#BETTER', 0.25, { x: 27.5, onStart: function () {
                                _this._winSound();
                            } })
                            .to('#LUCK', 0.25, { x: 135 })
                            .to('#NEXT', 0.25, { x: 50 })
                            .to('#TIME', 0.25, { x: 125 });
                        button.setPosition({
                            y: 120
                        });
                    }
                    if (!this._wager) {
                        timeline.to('#THANKS', 0.25, { y: 20, onStart: function () {
                                _this._winSound();
                            } })
                            .to('#FOR', 0.25, { x: 145 })
                            .to('#PLAYING', 0.25, { x: 64 });
                        button.setPosition({
                            y: 120
                        });
                    }
                    timeline.to(button.getBitmap('button'), 0.5, { delay: 1, alpha: 1, onComplete: function () {
                            button.setEnabled(true);
                            button.animate('reminder1');
                            gameScale.setZindex('11');
                            gameScale.setEnabled(true);
                            _this._scaled = true;
                        } }, 'stage3');
                    timeline.play();
                    gameScale.setAction('click', function () {
                        _this._scaleGame();
                    });
                };
                EndGame.prototype._scaleGame = function () {
                    var _this = this;
                    var gameScale = HELPER.getGameObject('bg_scale'), gameScene = HELPER.getScene('mainGame').getDiv();
                    if (this._scaled) {
                        gameScale.setEnabled(false);
                        TweenMax.to(gameScene, 0.5, { scaleX: 1, scaleY: 1, x: 0, onComplete: function () {
                                _this._scaled = false;
                                gameScale.setEnabled(true);
                            } });
                    }
                    else {
                        gameScale.setEnabled(false);
                        TweenMax.to(gameScene, 0.5, { scaleX: 0.445, scaleY: 0.445, x: 199, onComplete: function () {
                                _this._scaled = true;
                                gameScale.setEnabled(true);
                            } });
                    }
                };
                return EndGame;
            })(iwg.Scene);
            iwg.EndGame = EndGame;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
