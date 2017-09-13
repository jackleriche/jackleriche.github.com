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
            var BallSelection = (function (_super) {
                __extends(BallSelection, _super);
                function BallSelection(_name) {
                    _super.call(this, _name);
                    this._numberSelected = 0;
                    this._ballArray = [];
                    this._selectedBalls = [];
                    this._button = null;
                    this._reminder = null;
                    this._ballsObject = null;
                    this._subscribeBallSelector();
                    GLOBAL.getInstance().addToGlobal('maxSelected', false);
                    this._initBallSelection();
                    this.setAlpha(0);
                }
                BallSelection.prototype._subscribeBallSelector = function () {
                    IWG.IWGEM.on('splashEnd', this._chooseBalls.bind(this));
                    IWG.IWGEM.on('noSelect', this._noSelect.bind(this));
                    IWG.IWGEM.on('splash.preMade', this._preMade.bind(this));
                    IWG.IWGEM.on('ballSelected', this._ballSelected.bind(this));
                    IWG.IWGEM.on('maxSelected', this._maxSelected.bind(this));
                    IWG.IWGEM.on('ballSelectionOff', this._ballSelectionOff.bind(this));
                    IWG.IWGEM.on('bsSelection', this._enable.bind(this));
                };
                BallSelection.prototype._chooseBalls = function () {
                    this.setAlpha(1, 3);
                    if (GLOBAL.getInstance().getFromGlobal('selectionMethod') === "choose") {
                        this.getChildByName('balls').setEnabled(true);
                    }
                };
                BallSelection.prototype._noSelect = function () {
                    this.setAlpha(1, 3);
                    this._reminder.kill();
                    var balls = [];
                    for (var i = 1; i < 60; i++) {
                        balls.push(i);
                    }
                    ;
                    iwg.Helper.shuffleArray(balls);
                    var selectedBalls = [];
                    var stage = this.getChildByName('balls');
                    for (var i_1 = 0; i_1 < 6; i_1++) {
                        var ball = balls.shift();
                        selectedBalls.push(ball);
                        TweenMax.delayedCall(0.7 + i_1, function (ball) {
                            createjs.Sound.play("chooseBall");
                            IWG.IWGEM.trigger('ballSelected', [stage.getBitmap("ball" + ball), 1]);
                        }, [ball]);
                    }
                    GLOBAL.getInstance().addToGlobal('ballSelection', selectedBalls);
                    this._button.destroy();
                    TweenMax.delayedCall(9, function () {
                        IWG.IWGEM.trigger('ballSelectionOff');
                    });
                };
                BallSelection.prototype._preMade = function () {
                    IWG.IWGEM.trigger('ballSelectionOff');
                };
                BallSelection.prototype._initBallSelection = function () {
                    var selectedBalls = new GAMEOBJECT('selectedBalls', { w: 500, h: 100 }, 2, this), balls = new CLICKABLEGAMEOBJECT('balls', { w: 800, h: 345 }, 2, this), choose = new GAMEOBJECT('choose', { w: 300, h: 50 }, 2, this);
                    this._ballsObject = balls;
                    selectedBalls.active = true;
                    balls.active = true;
                    balls.setEnabled(false);
                    selectedBalls.setPosition({
                        x: 220,
                        y: 20
                    });
                    balls.setPosition({
                        x: 80,
                        y: 130
                    });
                    choose.setPosition({
                        x: 480 - 150,
                        y: 510
                    });
                    this._setupSelectionBalls();
                    this._setupBalls();
                };
                BallSelection.prototype._setupSelectionBalls = function () {
                    var stage = this.getChildByName('selectedBalls');
                    stage.addBitmap({
                        name: "yourNumbers",
                        pos: {
                            x: 250,
                            y: 10
                        },
                        frame: "yournumbers",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                        doReg: {
                            center: true
                        }
                    });
                    for (var i = 0; i < 6; i++) {
                        stage.addBitmap({
                            name: "shadow-" + i,
                            pos: {
                                x: 130 + (50 * i),
                                y: 82
                            },
                            frame: "ball_shadow",
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                            doReg: {
                                center: true
                            }
                        });
                        stage.addBitmap({
                            name: "blank-" + i,
                            pos: {
                                x: 130 + (50 * i),
                                y: 60
                            },
                            frame: "ball_grey",
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                            doReg: {
                                center: true
                            }
                        });
                        var ball = stage.getBitmap('blank-' + i);
                        this._selectedBalls.push(ball);
                    }
                    ;
                };
                BallSelection.prototype._setupBalls = function () {
                    var _this = this;
                    var stage = this.getChildByName('balls');
                    var choose = this.getChildByName('choose');
                    for (var i = 0; i < 11; i++) {
                        stage.addBitmap({
                            name: "selectedBall" + i,
                            pos: {
                                x: 95 + (60 * i),
                                y: 190
                            },
                            frame: "choose_div",
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                            doReg: {
                                center: true
                            }
                        });
                    }
                    var x = 0;
                    var y = 0;
                    for (var j = 0; j < 60; j++) {
                        if (j === 0) {
                            continue;
                        }
                        ;
                        y += 65;
                        if (j % 5 === 0) {
                            x++;
                            y = 0;
                        }
                        ;
                        stage.addBitmap({
                            name: "ball" + j,
                            pos: {
                                x: 65 + (60 * x),
                                y: 40 + y
                            },
                            frame: "ball" + j,
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                            doReg: {
                                center: true
                            }
                        });
                        var ball = stage.getBitmap("ball" + j);
                        ball.number = j;
                        ball.selected = false;
                        ball.on('click', function (ball) {
                            if (stage.getEnabled()) {
                                IWG.IWGEM.trigger('ballSelected', [ball]);
                            }
                            ;
                        }.bind(null, ball));
                        this._ballArray.push(ball);
                    }
                    ;
                    choose.addBitmap({
                        name: "choose6",
                        pos: {
                            x: 159,
                            y: 25
                        },
                        frame: "choose6",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                        doReg: {
                            center: true
                        }
                    });
                    var button = new CLICKABLEGAMEOBJECT("button", { w: 220, h: 96 }, 4, this);
                    button.addBitmap({
                        name: "button",
                        pos: {
                            x: 110,
                            y: 48
                        },
                        frame: "bg_button_blue",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                        doReg: {
                            center: true
                        }
                    });
                    button.addBitmap({
                        name: "letsPlay",
                        pos: {
                            x: 110,
                            y: 48
                        },
                        frame: "letsplay",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                        doReg: {
                            center: true
                        }
                    });
                    button.setPosition({
                        x: 370,
                        y: 480
                    });
                    button.setAlpha(0);
                    button.setEnabled(false);
                    button.addAnimation('fadeIn');
                    button.setAnimation('fadeIn', 'fadeIn', 0.2, 0);
                    button.addAnimation('fadeOff');
                    button.setAnimation('fadeOff', 'fadeOff', 0.2, 0);
                    button.addAnimation('pulse');
                    button.setAnimation('pulse', 'pulse', 1, 3);
                    button.addAnimation('click');
                    button.setAnimation('click', 'click', 0.5, 0, ['ballSelectionOff']);
                    button.setAction('click', function (button) {
                        createjs.Sound.play("letsPlay");
                        button.animate('click');
                    }.bind(null, button));
                    this._button = button;
                    this.getChildByName('balls').setAction('rollover', function () {
                        _this._reminder.seek('start');
                    });
                    this.getChildByName('balls').setAction('rollout', function () {
                        if (!GLOBAL.getInstance().getFromGlobal('maxSelected')) {
                            _this._reminder.play();
                        }
                        ;
                    });
                    this._reminder = new TimelineMax();
                    this._reminder.to(this.getChildByName('balls').getCanvas(), 1, { delay: 4 }, "start")
                        .to(this.getChildByName('balls').getCanvas(), 1, { opacity: 0.7, yoyo: true, repeat: -1 }, "pulse");
                };
                BallSelection.prototype._ballSelected = function (ball, auto) {
                    var _this = this;
                    var enable = true;
                    if (GLOBAL.getInstance().getFromGlobal('selectionMethod') === "choose") {
                        this._ballsObject.setEnabled(false);
                    }
                    if (!ball.selected) {
                        if (!GLOBAL.getInstance().getFromGlobal('maxSelected')) {
                            createjs.Sound.play("chooseBall");
                            ball.selected = true;
                            ball.alpha = 0.3;
                            this._makeSparkle(ball);
                            this.getChildByName('balls').getStage().update();
                            if (this._numberSelected >= 5) {
                                GLOBAL.getInstance().addToGlobal('maxSelected', true);
                                if (auto === 1) {
                                    enable = false;
                                }
                                else {
                                    enable = true;
                                }
                                IWG.IWGEM.trigger('maxSelected', [enable]);
                            }
                            var visualise = this._selectedBalls[this._numberSelected];
                            visualise.name = ball.name;
                            visualise.gotoAndStop(ball.currentAnimation);
                            visualise.scaleX = visualise.scaleY = 0;
                            TweenMax.to(visualise, 0.5, { scaleX: 1, scaleY: 1 });
                            this._numberSelected++;
                            this._updateMessage(this._numberSelected);
                        }
                        ;
                        TweenMax.delayedCall(1, function () {
                            if (GLOBAL.getInstance().getFromGlobal('selectionMethod') === "choose") {
                                _this._ballsObject.setEnabled(true);
                            }
                        });
                    }
                    else {
                        var sortArray = [];
                        this._numberSelected--;
                        this._updateMessage(this._numberSelected);
                        ball.alpha = 1;
                        this.getChildByName('balls').getStage().update();
                        if (GLOBAL.getInstance().getFromGlobal('maxSelected')) {
                            this._removeNextButton();
                        }
                        if (this._selectedBalls.length >= 0) {
                            this._reminder.play();
                            for (var i = 0; i < this._selectedBalls.length; i++) {
                                var element = this._selectedBalls[i];
                                element.sortFrame = element.currentAnimation;
                                if (element.name === ball.name) {
                                    element.name = "blank";
                                    GLOBAL.getInstance().addToGlobal('maxSelected', false);
                                }
                                element.gotoAndStop("ball_grey");
                                if (element.name.split("-")[0] !== 'blank') {
                                    sortArray.push(element);
                                }
                            }
                        }
                        for (var i_2 = 0; i_2 < sortArray.length; i_2++) {
                            var element = sortArray[i_2];
                            this._selectedBalls[i_2].name = sortArray[i_2].name;
                            this._selectedBalls[i_2].gotoAndStop(sortArray[i_2].sortFrame);
                        }
                        this.getChildByName('selectedBalls').getStage().update();
                        this.getChildByName('balls').getStage().update();
                        ball.selected = false;
                        TweenMax.delayedCall(0.5, function () {
                            if (GLOBAL.getInstance().getFromGlobal('selectionMethod') === "choose") {
                                _this._ballsObject.setEnabled(true);
                            }
                        });
                    }
                };
                BallSelection.prototype._updateMessage = function (num) {
                    var choose = this.getChildByName('choose'), chooseBitmap = this.getChildByName('choose').getBitmap('choose6');
                    switch (num) {
                        case 0:
                            chooseBitmap.gotoAndStop('choose6');
                            break;
                        case 1:
                            chooseBitmap.gotoAndStop('choose5');
                            break;
                        case 2:
                            chooseBitmap.gotoAndStop('choose4');
                            break;
                        case 3:
                            chooseBitmap.gotoAndStop('choose3');
                            break;
                        case 4:
                            chooseBitmap.gotoAndStop('choose2');
                            break;
                        case 5:
                            chooseBitmap.gotoAndStop('choose1');
                            break;
                        default:
                            break;
                    }
                    choose.getStage().update();
                };
                BallSelection.prototype._maxSelected = function (ballClick) {
                    var _this = this;
                    var choose6numbers = this.getChildByName('choose');
                    var timeline = new TimelineLite({
                        onStart: function () {
                            _this.getChildByName('balls').setAlpha(1);
                            _this._reminder.seek("start");
                            _this._reminder.pause();
                        }
                    });
                    timeline.to(choose6numbers.getCanvas(), 0.2, { alpha: 0 })
                        .to(this._button.getCanvas(), 0.2, { alpha: 1, onComplete: function () {
                            _this._button.setEnabled(true);
                            _this._button.animate('pulse');
                        } });
                };
                BallSelection.prototype._removeNextButton = function () {
                    var button = this._button;
                    var choose6numbers = this.getChildByName('choose');
                    var timeline = new TimelineLite();
                    this._button.setEnabled(false);
                    timeline.to(button.getCanvas(), 0.2, { alpha: 0 })
                        .to(choose6numbers.getCanvas(), 0.2, { alpha: 1 });
                };
                BallSelection.prototype._ballSelectionOff = function () {
                    if (this._selectedBalls.length > 0) {
                        var numberArray = [];
                        for (var i = 0; i < this._selectedBalls.length; i++) {
                            numberArray.push(this._selectedBalls[i].name.substring(4));
                        }
                        GLOBAL.getInstance().addToGlobal("ballSelection", numberArray);
                    }
                    var self = this, balls = this.getChildByName('balls'), selectedBalls = this.getChildByName('selectedBalls'), button = this.getChildByName('button');
                    balls.setEnabled(false);
                    button.animate('fadeOff');
                    var timeline = new TimelineLite({
                        onComplete: function () {
                            self.destroy();
                        }
                    });
                    timeline.to(balls.getCanvas(), 1, { opacity: 0 }, "fadeOff")
                        .to(selectedBalls.getCanvas(), 1, { opacity: 0 }, "fadeOff");
                    IWG.IWGEM.trigger('mainGameSetup');
                };
                BallSelection.prototype._makeSparkle = function (ball) {
                    var _this = this;
                    var timeline = new TimelineMax({
                        paused: true
                    });
                    for (var angle = 0; angle < 360; angle += Math.round(360 / 6)) {
                        var particle = new createjs.Shape();
                        particle.graphics.beginFill("red").drawCircle(ball.x, ball.y, iwg.Helper.getRandomNumber(3, 10));
                        this.getChildByName('balls').getStage().addChild(particle);
                        timeline.add(TweenMax.to(particle, 0.5, { y: iwg.Helper.getRandomNumber(-50, 50), x: iwg.Helper.getRandomNumber(-50, 50), alpha: 0, onComplete: function (particle) {
                                _this.getChildByName('balls').getStage().removeChild(particle);
                            } }), 0);
                    }
                    timeline.play();
                };
                BallSelection.prototype._initCompleteBallSelection = function () {
                };
                BallSelection.prototype._enable = function () {
                    this._ballSelected;
                };
                return BallSelection;
            })(iwg.Scene);
            iwg.BallSelection = BallSelection;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
