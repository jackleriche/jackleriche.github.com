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
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GLOBAL = IWG.Global, GAMEOBJECT = IWG.GameObject, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, SPRITESHEETS = IWG.SpriteSheets, BUTTON = IWG.Button;
            var SplashDual = (function (_super) {
                __extends(SplashDual, _super);
                function SplashDual(_name) {
                    _super.call(this, _name);
                    this._initSplash();
                    this._subscribeSplash();
                }
                SplashDual.prototype._subscribeSplash = function () {
                    IWG.IWGEM.on('splashOff', this._splashOut.bind(this));
                };
                SplashDual.prototype._unsubscribeSplash = function () {
                    IWG.IWGEM.off("splashOff");
                };
                SplashDual.prototype._initSplash = function () {
                    var splashBurst = new GAMEOBJECT('splashBurst', { w: 1132, h: 648 }, 6, this);
                    splashBurst.addBitmap({
                        name: "splashburst",
                        pos: {
                            x: 566,
                            y: 324
                        },
                        frame: "bg_splash",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        }
                    });
                    splashBurst.setPosition({
                        x: -90
                    });
                    splashBurst.setScale(1.2, 1.2);
                    var splashTriangles = new GAMEOBJECT('splashTriangles', { w: 972, h: 588 }, 6, this);
                    splashTriangles.addBitmap({
                        name: "splashTriangles",
                        pos: {
                            x: 486,
                            y: 294
                        },
                        frame: "bg_splash_triangles",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        }
                    });
                    splashTriangles.active = true;
                    splashTriangles.setAlpha(1);
                    splashTriangles.setScale(0.1, 0.1);
                    var splashLogo = new GAMEOBJECT("splashLogo", { w: 260, h: 288 }, 6, this);
                    splashLogo.addBitmap({
                        name: "splashLogo",
                        pos: {
                            x: 130,
                            y: 144
                        },
                        frame: "splash_fingers",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        }
                    });
                    splashLogo.setPosition({
                        x: 480 - 130,
                        y: 60
                    });
                    var winupto = new GAMEOBJECT("winUpTo", { w: 690, h: 178 }, 6, this);
                    winupto.addBitmap({
                        name: "winupto",
                        pos: {
                            x: 345,
                            y: 89
                        },
                        frame: "winupto",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        }
                    });
                    winupto.setPosition({
                        x: 480 - 345,
                        y: 320
                    });
                    var splashButton = new CLICKABLEGAMEOBJECT("splashButton", { w: 212, h: 98 }, 6, this);
                    splashButton.addBitmap({
                        name: "splashButton",
                        pos: {
                            x: 106,
                            y: 49
                        },
                        frame: "button_play",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        }
                    });
                    splashButton.addBitmap({
                        name: "splashButtonHighlight",
                        pos: {
                            x: 106,
                            y: 49
                        },
                        frame: "button_play_over",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        },
                        alpha: 0
                    });
                    splashButton.setPosition({
                        x: 480 - 106,
                        y: 490
                    });
                    var shinerData = [
                        [378, 0],
                        [210, 165],
                        [225, 265],
                        [550, -10],
                        [665, 95],
                        [700, 170],
                        [695, 245]
                    ];
                    for (var i = 0; i < shinerData.length; i++) {
                        var shinerGO = new GAMEOBJECT("shiner" + i, { w: 54, h: 54 }, 6, this);
                        shinerGO.addBitmap({
                            name: "shiner" + i,
                            pos: {
                                x: 27,
                                y: 27
                            },
                            frame: "shiner",
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                            doReg: {
                                center: true
                            }
                        });
                        shinerGO.setAlpha(0);
                        shinerGO.setPosition({
                            x: shinerData[i][0],
                            y: shinerData[i][1]
                        });
                        shinerGO.addAnimation('spin');
                        shinerGO.setAnimation('spin', 'spin');
                        shinerGO.animate('spin');
                    }
                    ;
                    splashButton.setEnabled(true);
                    splashButton.setReminder(true, 'splashButtonReminder');
                    splashButton.addAnimation('press');
                    splashButton.setAnimation('press', 'click', 0.8, 0, ["splashOff"]);
                    splashButton.animate('reminder1');
                    splashButton.setAction('click', function (splashButton) {
                        IWG.IWGEM.trigger('splashOff');
                        splashButton.animate('press');
                        createjs.Sound.play('playButton');
                    }.bind(null, splashButton));
                };
                SplashDual.prototype._splashOut = function () {
                    var _this = this;
                    var burst = this.getChildByName('splashBurst');
                    var triangles = this.getChildByName('splashTriangles');
                    var logo = this.getChildByName('splashLogo');
                    var play = this.getChildByName('splashButton');
                    var timeline = new TimelineMax({
                        paused: true, delay: 0.5,
                        onComplete: function () {
                            play.setEnabled(true);
                        }
                    });
                    timeline.to(triangles.getCanvas(), 0.3, { alpha: 1, scaleX: 1, scaleY: 1, ease: Linear.easeNone }, 'fire')
                        .to(this.getDiv(), 0.5, { delay: 0.6, alpha: 0, onStart: function () {
                            IWG.IWGEM.trigger('mainGameIntro');
                        }, onComplete: function () {
                            _this.destroy();
                            IWG.IWGEM.trigger('activateSlide', [true]);
                            IWG.IWGEM.trigger('showToggle');
                        } }, "boom");
                    timeline.play();
                };
                return SplashDual;
            })(iwg.Scene);
            iwg.SplashDual = SplashDual;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
