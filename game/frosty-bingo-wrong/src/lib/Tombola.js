var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="Scene.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GLOBAL = IWG.Global, GAMEOBJECT = IWG.GameObject, SPRITESHEETS = IWG.SpriteSheets;
            var Tombola = (function (_super) {
                __extends(Tombola, _super);
                function Tombola(_name) {
                    _super.call(this, _name);
                    this._subscribeTombola();
                    this.setDimensions({
                        w: 510,
                        h: 510
                    });
                    this._setupTombolaLayout();
                    this._setupBallLayout();
                    this._initTombolaComplete();
                }
                ;
                Tombola.prototype._subscribeTombola = function () {
                    IWG.IWGEM.on('ballPop', this._ballPop.bind(this));
                    IWG.IWGEM.on('ballRollOff', this._ballRollOff.bind(this));
                    IWG.IWGEM.on('resetBall', this._resetBall.bind(this));
                };
                Tombola.prototype._unsubscribeTombola = function () {
                    IWG.IWGEM.off('ballPop');
                    IWG.IWGEM.off('ballRollOff');
                    IWG.IWGEM.off('resetBall');
                };
                Tombola.prototype._setupTombolaLayout = function () {
                    var balls = new GAMEOBJECT("balls", { w: 459, h: 459 }, 1, this);
                    balls.addBitmap({
                        name: "balls",
                        pos: {
                            x: 265,
                            y: 265
                        },
                        frame: "balls-01",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("tombola"),
                        doReg: {
                            center: true
                        },
                        scale: 1.8
                    });
                    balls.active = true;
                    var machineGlass = new GAMEOBJECT("machineGlass", { w: 459, h: 459 }, 1, this);
                    machineGlass.addBitmap({
                        name: "machineGlass",
                        pos: {
                            x: 230,
                            y: 230
                        },
                        frame: "machine-glass",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("tombola"),
                        doReg: {
                            center: true
                        },
                        scale: 1.8
                    });
                    var exitTubeTop = new GAMEOBJECT("exitTube-bottom", { w: 459, h: 459 }, 1, this);
                    exitTubeTop.addBitmap({
                        name: "exitTube-bottom",
                        pos: {
                            x: 230,
                            y: 120
                        },
                        frame: "exitTube-top",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("tombola"),
                        doReg: {
                            center: true
                        },
                        scale: 1.8
                    });
                    var exitTubeBottom = new GAMEOBJECT("exitTube-top", { w: 459, h: 459 }, 3, this);
                    exitTubeBottom.addBitmap({
                        name: "exitTube-top",
                        pos: {
                            x: 230,
                            y: 205
                        },
                        frame: "exitTube-bottom",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("tombola"),
                        doReg: {
                            center: true
                        },
                        scale: 1.8
                    });
                    var ballSlide = new GAMEOBJECT("ball-slide", { w: 459, h: 459 }, 1, this);
                    ballSlide.addBitmap({
                        name: "ball-slide",
                        pos: {
                            x: 70,
                            y: 270
                        },
                        frame: "curve-tube",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("tombola"),
                        doReg: {
                            center: true
                        },
                        scale: 1.8
                    });
                    var animation = balls.getBitmap('balls');
                    animation.gotoAndPlay('ball-animation');
                };
                Tombola.prototype._setupBallLayout = function () {
                    var tombollaBall = new GAMEOBJECT("tombolaBall", { w: 117, h: 118 }, 2, this);
                    tombollaBall.addBitmap({
                        name: "ball-animation",
                        pos: {
                            x: 59,
                            y: 59
                        },
                        frame: "ball_green",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                        doReg: {
                            center: true
                        },
                        scale: 1
                    });
                    tombollaBall.setScale(0.4, 0.4);
                    tombollaBall.setPosition({
                        x: 170,
                        y: 160
                    });
                    var text = new createjs.Text("--", "Bold 40px Arial", "black");
                    text.textAlign = "center";
                    text.x = 60;
                    text.y = 35;
                    tombollaBall.getStage().addChild(text);
                    this.addChild(tombollaBall);
                    tombollaBall.addAnimation("ballPop");
                    tombollaBall.addAnimation("ballRollOff");
                    tombollaBall.setAnimation("ballPop", "ballPop");
                    if (GLOBAL.getInstance().getFromGlobal('method') === "InstantReveal") {
                        tombollaBall.setAnimation("ballPop", "instantBallPop");
                        tombollaBall.setAnimation("ballRollOff", "instantBallRollOff");
                    }
                    else {
                        tombollaBall.setAnimation("ballPop", "ballPop");
                        tombollaBall.setAnimation("ballRollOff", "ballRollOff");
                    }
                };
                Tombola.prototype._initTombolaComplete = function () {
                    console.log('Tombola created');
                };
                Tombola.prototype._ballPop = function (ballNumber) {
                    var colors = [
                        "ball_blue",
                        "ball_green",
                        "ball_orange",
                        "ball_pink",
                        "ball_red"
                    ];
                    var ballColor = colors[Math.floor(Math.random() * colors.length)], ball = this.getChildByName("tombolaBall");
                    ball.setTicketLabel(ballNumber);
                    GLOBAL.getInstance().addToGlobal('ballNumber', ballNumber);
                    ball.getStage().children[0].gotoAndStop(ballColor);
                    ball.getStage().children[1].text = ballNumber;
                    ball.animate('ballPop');
                    ball.getStage().update();
                };
                Tombola.prototype._ballRollOff = function () {
                    this.getChildByName('tombolaBall').animate('ballRollOff');
                };
                Tombola.prototype._resetBall = function () {
                    var ball = this.getChildByName('tombolaBall');
                    ball.setScale(0.4, 0.4);
                    ball.setZindex(2);
                    ball.setPosition({
                        x: 170,
                        y: 160
                    });
                    ball.setRotation(0);
                    ball.setAlpha(1);
                };
                Tombola.prototype.intro = function (delay) {
                    if (delay === void 0) { delay = 1; }
                    TweenMax.to(this.getDiv(), 1, { alpha: 1, delay: delay });
                };
                return Tombola;
            })(iwg.Scene);
            iwg.Tombola = Tombola;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
