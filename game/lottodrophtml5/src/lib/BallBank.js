var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="Scene.ts" />
/// <reference path="GameObject.ts" />
/// <reference path="ClickableGameObject.ts" />
/// <reference path="Pin.ts" />
/// <reference path="Helper.ts" />
/// <reference path="Legend.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GLOBAL = IWG.Global, HELPER = IWG.Helper, GAMEOBJECT = IWG.GameObject, LEGEND = IWG.Legend, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, SPRITESHEETS = IWG.SpriteSheets;
            var BallBank = (function (_super) {
                __extends(BallBank, _super);
                function BallBank(_name) {
                    _super.call(this, _name);
                    this._balls = [];
                    this._pointer = 0;
                    this._subscribeBallBank();
                    var array = GLOBAL.getInstance().getFromGlobal('ballSelection');
                    iwg.Helper.sortArray(array);
                    this._setupLayout();
                    GLOBAL.getInstance().addToGlobal('ballBank', this);
                    this._boardOn();
                }
                BallBank.prototype._subscribeBallBank = function () {
                    IWG.IWGEM.on('initBallTurn', this._removeBall.bind(this));
                    IWG.IWGEM.on('addBall', this._addBall.bind(this));
                    IWG.IWGEM.on('checkEndGame', this._checkBalls.bind(this));
                    IWG.IWGEM.on('staggerBalls', this._staggerBalls.bind(this));
                };
                ;
                BallBank.prototype._unsubscribeBallBank = function () {
                    IWG.IWGEM.off('initBallTurn');
                    IWG.IWGEM.off('addBall');
                };
                ;
                BallBank.prototype._setupLayout = function () {
                    var yourBallsText = new GAMEOBJECT('yourBallsText', { w: 180, h: 16 }, 3, this);
                    yourBallsText.addBitmap({
                        name: "yourBallsText",
                        pos: {
                            x: 90,
                            y: 8
                        },
                        frame: "yournumbers",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                        doReg: {
                            center: true
                        }
                    });
                    yourBallsText.setPosition({
                        x: 60,
                        y: 5
                    });
                    for (var i = 0; i < GLOBAL.getInstance().getFromGlobal("ballSelection").length; i++) {
                        var ball = new GAMEOBJECT("ballNumber" + i, { w: 44, h: 55 }, 3, this);
                        var ballNumber = GLOBAL.getInstance().getFromGlobal('ballSelection')[i];
                        ball.setTicketLabel(ballNumber);
                        ball.addBitmap({
                            name: "shadow",
                            pos: {
                                x: 22,
                                y: 48
                            },
                            frame: "ball_shadow",
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                            doReg: {
                                center: true
                            }
                        });
                        ball.addBitmap({
                            name: "ballGrey",
                            pos: {
                                x: 22,
                                y: 22
                            },
                            frame: "ball_grey",
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                            doReg: {
                                center: true
                            }
                        });
                        ball.addBitmap({
                            name: "ball",
                            pos: {
                                x: 22,
                                y: 22
                            },
                            frame: "ball" + ballNumber,
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                            doReg: {
                                center: true
                            },
                            scale: 0
                        });
                        ball.addAnimation('show');
                        ball.setAnimation('show', 'ballShow', 0.5, (0.2 * i));
                        ball.setPosition({
                            x: 20 + (44 * i),
                            y: 30
                        });
                        this._balls.push(ball);
                        ball.getStage().update();
                    }
                };
                BallBank.prototype._removeBall = function () {
                    var gameObject = this._balls[this._pointer], ball = gameObject.getBitmap('ball'), shadow = gameObject.getBitmap('shadow');
                    TweenMax.to(ball, 1, {
                        onStart: function () {
                            gameObject.active = true;
                        }, scaleX: 0, scaleY: 0, ease: Bounce.easeOut,
                        onComplete: function () {
                            gameObject.active = false;
                        }
                    });
                    TweenMax.to(shadow, 1, {
                        onStart: function () {
                            gameObject.active = true;
                        }, alpha: 0,
                        onComplete: function () {
                            gameObject.active = false;
                        }
                    });
                    this._pointer++;
                };
                BallBank.prototype._addBall = function (ballNumber) {
                    var n = ballNumber;
                    if (ballNumber === "random") {
                        n = this._selectRandomNumber();
                    }
                    var ball = this._balls[this._pointer - 1], ballGfx = ball.getBitmap('ball'), shadow = ball.getBitmap('shadow');
                    ball.setTicketLabel(n);
                    ballGfx.gotoAndStop('ball' + n);
                    ball.getStage().update();
                    TweenMax.to(ballGfx, 1, {
                        onStart: function () {
                            ball.active = true;
                        }, scaleX: 1, scaleY: 1, ease: Bounce.easeOut,
                        onComplete: function () {
                            ball.active = false;
                        }
                    });
                    TweenMax.to(shadow, 1, {
                        onStart: function () {
                            ball.active = true;
                        }, alpha: 1,
                        onComplete: function () {
                            ball.active = false;
                        }
                    });
                    this._pointer--;
                };
                BallBank.prototype._checkBalls = function () {
                    if (this._pointer === 6) {
                        IWG.IWGEM.trigger('showEndGame');
                    }
                    else {
                        IWG.IWGEM.trigger('fadeOnChoose');
                    }
                };
                BallBank.prototype.getNextBall = function () {
                    return this._balls[this._pointer];
                };
                BallBank.prototype._selectRandomNumber = function () {
                    var number = Math.round(iwg.Helper.getRandomNumber(1, 59));
                    for (var i = 0; i < this._balls.length; i++) {
                        var ball = this._balls[i];
                        if (ball.getTicketLabel() === number) {
                            this._selectRandomNumber();
                            return;
                        }
                    }
                    return number;
                };
                BallBank.prototype._boardOn = function () {
                    TweenMax.to(this.getDiv(), 0.5, { alpha: 1, delay: 1, onComplete: function () {
                            IWG.IWGEM.trigger('staggerBalls');
                        } });
                };
                BallBank.prototype._staggerBalls = function () {
                    for (var i = 0; i < this._balls.length; i++) {
                        this._balls[i].animate('show');
                    }
                    TweenMax.delayedCall(3, function () {
                        IWG.IWGEM.trigger('showInstructions');
                        IWG.IWGEM.trigger("ballShowDone");
                        IWG.IWGEM.trigger('fadeOnChoose');
                    });
                };
                return BallBank;
            })(iwg.Scene);
            iwg.BallBank = BallBank;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
