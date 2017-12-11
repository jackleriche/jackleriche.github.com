/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="Scene.ts" />
/// <reference path="GameObject.ts" />
/// <reference path="ClickableGameObject.ts" />
/// <reference path="Helper.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GLOBAL = IWG.Global, HELPER = IWG.Helper, GAMEOBJECT = IWG.GameObject, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, SPRITESHEETS = IWG.SpriteSheets;
            var Splash = (function (_super) {
                __extends(Splash, _super);
                function Splash(_name) {
                    _super.call(this, _name);
                    this._buttonArray = [];
                    this._choiceSelected = false;
                    this._initSplash();
                    this._subscribeSplash();
                }
                Splash.prototype._subscribeSplash = function () {
                    IWG.IWGEM.on('chooseNumbersPress', this._chooseNumberButtonPress.bind(this));
                    IWG.IWGEM.on('luckyDipPress', this._luckyDipButtonPress.bind(this));
                    IWG.IWGEM.on('preMade', this._preMade.bind(this));
                    IWG.IWGEM.on('splashOff', this._splashOff.bind(this));
                };
                Splash.prototype._unsubscribeSplash = function () {
                    IWG.IWGEM.off('chooseNumbersPress');
                    IWG.IWGEM.off('luckyDipPress');
                    IWG.IWGEM.off('preMade');
                    IWG.IWGEM.off('splashOff');
                };
                Splash.prototype._initSplash = function () {
                    var self = this;
                    var logo = new GAMEOBJECT('logo', { w: 304, h: 315 }, 2, this);
                    logo.addBitmap({
                        name: "logo",
                        pos: {
                            x: 151,
                            y: 157.5
                        },
                        frame: "logo_large",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                        doReg: {
                            center: true
                        }
                    });
                    logo.setPosition({
                        x: Math.round(480 - 151),
                        y: 10
                    });
                    var winUpTo = new GAMEOBJECT('winUpTo', { w: 215, h: 61 }, 2, this);
                    winUpTo.addBitmap({
                        name: "winUpTo",
                        pos: {
                            x: 107.5,
                            y: 30.5
                        },
                        frame: "winupto",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                        doReg: {
                            center: true
                        }
                    });
                    winUpTo.setPosition({
                        x: Math.round(480 - 107.5),
                        y: 325
                    });
                    this._setupbuttons();
                    var pinkCirclePos = [
                        [335, 255],
                        [550, 250]
                    ];
                    var circlePos = [
                        [350, 60],
                        [500, 90]
                    ];
                    for (var i = 0; i < 2; i++) {
                        var circlePink = new GAMEOBJECT('circlePink' + i, { w: 46, h: 47 }, 2, this);
                        circlePink.addBitmap({
                            name: "circlePink",
                            pos: {
                                x: 23,
                                y: 23.5
                            },
                            frame: "logo_small_circle1",
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                            doReg: {
                                center: true
                            }
                        });
                        circlePink.setPosition({
                            x: pinkCirclePos[i][0],
                            y: pinkCirclePos[i][1]
                        });
                        circlePink.addAnimation('pinkFloat');
                        circlePink.setAnimation('pinkFloat', 'float', HELPER.getRandomNumber(3, 8), 1);
                        circlePink.animate('pinkFloat');
                        var circleRed = new GAMEOBJECT('circleRed' + i, { w: 47, h: 47 }, 2, this);
                        circleRed.addBitmap({
                            name: "circleRed",
                            pos: {
                                x: 23.5,
                                y: 23.5
                            },
                            frame: "logo_small_circle2",
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                            doReg: {
                                center: true
                            }
                        });
                        circleRed.setPosition({
                            x: circlePos[i][0],
                            y: circlePos[i][1]
                        });
                        circleRed.addAnimation('redFloat');
                        circleRed.setAnimation('redFloat', 'float', HELPER.getRandomNumber(3, 8), 0.7);
                        circleRed.animate('redFloat');
                    }
                    var blobConfig = [
                        [80, 50, 65, "ED0000"],
                        [30, 370, 45, "FF0080"],
                        [70, 260, 90, "FF0041"],
                        [710, 80, 30, "FF0080"],
                        [720, 90, 70, "BB0000"],
                        [775, 280, 40, "FF0041"],
                        [750, 420, 30, "ED0000"],
                        [755, 450, 75, "FF0080"],
                    ];
                    for (var i = 0; i < blobConfig.length; i++) {
                        var blob = blobConfig[i];
                        var gameObject = new iwg.GameObject('blob' + i, { w: blob[2] * 2, h: blob[2] * 2 }, 1, this);
                        gameObject.setPosition({
                            x: blob[0],
                            y: blob[1]
                        });
                        var circle = new createjs.Shape();
                        circle.graphics.beginFill("#" + blob[3]).drawCircle(0, 0, blob[2]);
                        circle.x = blob[2];
                        circle.y = blob[2];
                        gameObject.getStage().addChild(circle);
                        gameObject.getStage().update();
                        gameObject.addAnimation('float');
                        gameObject.setAnimation('float', 'float', HELPER.getRandomNumber(3, 8), 1);
                        gameObject.animate('float');
                    }
                };
                Splash.prototype._setupbuttons = function () {
                    var self = this;
                    if (CORE.IWG.ame('get', { vars: ['S_G_T_need_data'] })) {
                        var chooseNumbers = new CLICKABLEGAMEOBJECT('chooseNumbers', { w: 274, h: 120 }, 2, this);
                        chooseNumbers.addBitmap({
                            name: "chooseNumbers",
                            pos: {
                                x: 137,
                                y: 60
                            },
                            frame: "bg_button_choose",
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                            doReg: {
                                center: true
                            }
                        });
                        chooseNumbers.addBitmap({
                            name: "chooseNumbersText",
                            pos: {
                                x: 137,
                                y: 60
                            },
                            frame: "chooseyournumbers",
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                            doReg: {
                                center: true
                            }
                        });
                        chooseNumbers.setPosition({
                            x: Math.round(320 - 137),
                            y: 400
                        });
                        chooseNumbers.addAnimation('rollOver');
                        chooseNumbers.setAnimation('rollOver', 'rollover', 0.2, 0);
                        chooseNumbers.addAnimation('rollOut');
                        chooseNumbers.setAnimation('rollOut', 'rollout', 0.2, 0);
                        chooseNumbers.setReminder(true, 'pulse');
                        chooseNumbers.animate('reminder');
                        chooseNumbers.addAnimation('press');
                        chooseNumbers.setAnimation('press', 'press', 0.2, 0);
                        chooseNumbers.setEnabled(true);
                        chooseNumbers.setAction('click', function (chooseNumbers) {
                            if (!this._choiceSelected) {
                                this._choiceSelected = true;
                                chooseNumbers.animate('press');
                                createjs.Sound.play("startScreen");
                                GLOBAL.getInstance().addToGlobal('selectionMethod', "choose");
                                chooseNumbers.setEnabled(false);
                                self._stopReminderSymbol(true, chooseNumbers);
                                IWG.IWGEM.trigger("chooseNumbersPress");
                                TweenMax.delayedCall(3, function () {
                                    this._choiceSelected = false;
                                });
                            }
                        }.bind(null, chooseNumbers));
                        chooseNumbers.setAction('rollover', function (chooseNumbers) {
                            self._stopReminderSymbol(true, chooseNumbers);
                            chooseNumbers.animate('rollOver');
                        }.bind(null, chooseNumbers));
                        var luckyDip = new CLICKABLEGAMEOBJECT('luckyDip', { w: 274, h: 120 }, 2, this);
                        luckyDip.addBitmap({
                            name: "luckyDip",
                            pos: {
                                x: 137,
                                y: 60
                            },
                            frame: "bg_button_choose",
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                            doReg: {
                                center: true
                            }
                        });
                        luckyDip.addBitmap({
                            name: "luckyDipText",
                            pos: {
                                x: 137,
                                y: 60
                            },
                            frame: "orselectluckydip",
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                            doReg: {
                                center: true
                            }
                        });
                        luckyDip.setPosition({
                            x: Math.round(650 - 137),
                            y: 400
                        });
                        luckyDip.addAnimation('rollOver');
                        luckyDip.setAnimation('rollOver', 'rollover', 0.2, 0);
                        luckyDip.addAnimation('rollOut');
                        luckyDip.setAnimation('rollOut', 'rollout', 0.2, 0);
                        luckyDip.addAnimation('press');
                        luckyDip.setAnimation('press', 'press', 0.2, 0);
                        luckyDip.setReminder(true, 'pulse');
                        luckyDip.animate('reminder');
                        luckyDip.setEnabled(true);
                        luckyDip.setAction('click', function (luckyDip) {
                            if (!this._choiceSelected) {
                                this._choiceSelected = true;
                                luckyDip.animate('press');
                                createjs.Sound.play("startScreen");
                                GLOBAL.getInstance().addToGlobal('selectionMethod', "luckyDip");
                                luckyDip.setEnabled(false);
                                TweenMax.delayedCall(3, function () {
                                    this._choiceSelected = false;
                                });
                                IWG.IWGEM.trigger("luckyDipPress");
                            }
                        }.bind(null, luckyDip));
                        luckyDip.setAction('rollover', function (luckyDip) {
                            self._stopReminderSymbol(true, luckyDip);
                            luckyDip.animate('rollOver');
                        }.bind(null, luckyDip));
                        luckyDip.setAction('rollout', function () {
                            luckyDip.animate('rollOut');
                            luckyDip.animate('reminder');
                            chooseNumbers.animate('reminder');
                        }.bind(null, luckyDip));
                        chooseNumbers.setAction('rollout', function (chooseNumbers) {
                            chooseNumbers.animate('rollOut');
                            luckyDip.animate('reminder');
                            chooseNumbers.animate('reminder');
                        }.bind(null, chooseNumbers));
                        this._buttonArray.push(chooseNumbers, luckyDip);
                    }
                    else {
                        var start = new CLICKABLEGAMEOBJECT('start', { w: 274, h: 120 }, 2, this);
                        start.addBitmap({
                            name: "start",
                            pos: {
                                x: 137,
                                y: 60
                            },
                            frame: "button_start",
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                            doReg: {
                                center: true
                            }
                        });
                        start.setPosition({
                            x: Math.round(480 - 137),
                            y: 400
                        });
                        start.addAnimation('rollOver');
                        start.setAnimation('rollOver', 'rollover', 0.2, 0);
                        start.addAnimation('rollOut');
                        start.setAnimation('rollOut', 'rollout', 0.2, 0);
                        start.addAnimation('press');
                        start.setAnimation('press', 'press', 0.2, 0, "preMade");
                        start.setReminder(true, 'pulse');
                        start.animate('reminder');
                        start.setEnabled(true);
                        start.setAction('click', function (start) {
                            start.animate('press');
                            createjs.Sound.play("startScreen");
                            start.setEnabled(false);
                        }.bind(null, start));
                        start.setAction('rollover', function (start) {
                            self._stopReminderSymbol(true, start);
                            start.animate('rollOver');
                        }.bind(null, start));
                        start.setAction('rollout', function (start) {
                            self._stopReminderSymbol(false, start);
                            start.animate('rollOut');
                            start.animate('reminder');
                        }.bind(null, start));
                        this._buttonArray.push(start);
                    }
                };
                Splash.prototype._chooseNumberButtonPress = function (h) {
                    this._buttonPress('chooseNumber');
                    IWG.IWGEM.trigger('bsSelection', ["choose"]);
                };
                Splash.prototype._preMade = function (h) {
                    this._buttonPress('preMade');
                };
                Splash.prototype._luckyDipButtonPress = function (h) {
                    this._buttonPress('luckyDip');
                    IWG.IWGEM.trigger('bsSelection', ["luckyDip"]);
                };
                Splash.prototype._buttonPress = function (type) {
                    if (CORE.IWG.ame('get', { vars: ['S_G_T_need_data'] })) {
                        var chooseButton = this.getChildByName('chooseNumbers'), luckyButton = this.getChildByName('luckyDip');
                        chooseButton.animationTimeLine.kill();
                        luckyButton.animationTimeLine.kill();
                        chooseButton.scaleX = chooseButton.scaleY = 1;
                        luckyButton.scaleX = luckyButton.scaleY = 1;
                        TweenMax.set(chooseButton.getCanvas(), { scaleX: 1, scaleY: 1 });
                        TweenMax.set(luckyButton.getCanvas(), { scaleX: 1, scaleY: 1 });
                    }
                    else {
                        var start = this.getChildByName('start');
                        start.animationTimeLine.kill();
                        start.scaleX = start.scaleY = 1;
                        TweenMax.set(start.getCanvas(), { scaleX: 1, scaleY: 1 });
                    }
                    IWG.IWGEM.trigger('splashOff', [type]);
                };
                Splash.prototype._splashOff = function (type) {
                    var _this = this;
                    TweenMax.to(this.getDiv(), 1, { alpha: 0, delay: 0.5, onComplete: function () {
                            if (type === "chooseNumber") {
                                IWG.IWGEM.trigger('splashEnd');
                            }
                            else if (type === "preMade") {
                                IWG.IWGEM.trigger('splash.preMade');
                            }
                            else {
                                IWG.IWGEM.trigger('noSelect');
                            }
                            _this.destroy();
                        } });
                };
                Splash.prototype._stopReminderSymbol = function (reset, turn) {
                    for (var i = 0; i < this._buttonArray.length; i++) {
                        var turns = this._buttonArray[i];
                        if (!turns.getRevealed()) {
                            if (reset) {
                                turns.animationTimeLine.seek(0);
                                turns.animationTimeLine.kill();
                            }
                            else {
                                turns.animationTimeLine.restart();
                            }
                        }
                    }
                };
                return Splash;
            })(iwg.Scene);
            iwg.Splash = Splash;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
