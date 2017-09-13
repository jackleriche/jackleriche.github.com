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
            var Splash = (function (_super) {
                __extends(Splash, _super);
                function Splash(_name) {
                    _super.call(this, _name);
                    this._initSplash();
                    this._subscribeSplash();
                }
                Splash.prototype._subscribeSplash = function () {
                    IWG.IWGEM.on('splashOff', this._splashOut.bind(this));
                };
                Splash.prototype._unsubscribeSplash = function () {
                    IWG.IWGEM.off("splashOff");
                };
                Splash.prototype._initSplash = function () {
                    var splashBurst = new GAMEOBJECT('splashBurst', { w: 1318, h: 1202 }, 6, this);
                    splashBurst.addBitmap({
                        name: "splashburst",
                        pos: {
                            x: 659,
                            y: 601
                        },
                        frame: "splash_burst",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("splashBurstSS"),
                        doReg: {
                            center: true
                        }
                    });
                    splashBurst.setAlpha(0);
                    splashBurst.setPosition({
                        x: -180,
                        y: -325
                    });
                    var splashStars = new GAMEOBJECT("splashStars", { w: 586, h: 334 }, 6, this);
                    splashStars.addBitmap({
                        name: "splashLogoStars",
                        pos: {
                            x: 293,
                            y: 167
                        },
                        frame: "splash_stars",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        }
                    });
                    splashStars.setAlpha(0);
                    splashStars.setScale(0.2, 0.2);
                    splashStars.setPosition({
                        x: 185,
                        y: 0
                    });
                    splashStars.active = true;
                    var splashLogo = new GAMEOBJECT("splashLogo", { w: 464, h: 334 }, 6, this);
                    splashLogo.addBitmap({
                        name: "splashLogo",
                        pos: {
                            x: 232,
                            y: 167
                        },
                        frame: "splash_logo",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        }
                    });
                    splashLogo.setAlpha(0);
                    splashLogo.setScale(0.2, 0.2);
                    splashLogo.setPosition({
                        x: 480 - 232,
                        y: 20
                    });
                    splashLogo.active = true;
                    var winuptoo = new GAMEOBJECT("winUpToo", { w: 542, h: 52 }, 6, this);
                    winuptoo.addBitmap({
                        name: "winuptoo",
                        pos: {
                            x: 271,
                            y: 26
                        },
                        frame: "winupto",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        }
                    });
                    winuptoo.setPosition({
                        x: 480 - 271,
                        y: 320
                    });
                    var topprize = new GAMEOBJECT("topPrize", { w: 1300, h: 121 }, 6, this);
                    topprize.addBitmap({
                        name: "topPrizeBG",
                        pos: {
                            x: 271,
                            y: 61
                        },
                        frame: "bg_topprize",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        },
                        scale: {
                            x: 100,
                            y: 1
                        }
                    });
                    topprize.addBitmap({
                        name: "topPrize",
                        pos: {
                            x: 650,
                            y: 61
                        },
                        frame: "topprize",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        }
                    });
                    topprize.setPosition({
                        x: 480 - 650,
                        y: 360
                    });
                    var splashButton = new CLICKABLEGAMEOBJECT("splashButton", { w: 231, h: 119 }, 6, this);
                    splashButton.addBitmap({
                        name: "splashButton",
                        pos: {
                            x: 115,
                            y: 60
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
                            x: 115,
                            y: 60
                        },
                        frame: "button_play_over",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        },
                        alpha: 0
                    });
                    splashButton.setPosition({
                        x: 480 - 115,
                        y: 480
                    });
                    splashButton.setScale(0, 0);
                    var shinerData = [
                        [270, 20],
                        [232, 111],
                        [200, 225],
                        [650, 30],
                        [675, 105],
                        [725, 190],
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
                        createjs.Sound.play('play');
                    }.bind(null, splashButton));
                    this._splashIn();
                };
                Splash.prototype._splashIn = function () {
                    var stars = this.getChildByName('splashStars');
                    var burst = this.getChildByName('splashBurst');
                    var logo = this.getChildByName('splashLogo');
                    var play = this.getChildByName('splashButton');
                    var timeline = new TimelineMax({
                        paused: true, delay: 1.5,
                        onComplete: function () {
                            play.setEnabled(true);
                        }
                    });
                    timeline.to(logo.getCanvas(), 0.4, { alpha: 1, scaleX: 1, scaleY: 1, ease: Linear.easeNone })
                        .to(burst.getCanvas(), 0.5, { alpha: 1 })
                        .to(stars.getCanvas(), 0.5, { alpha: 1, scaleX: 1, scaleY: 1 }, "boom")
                        .to(play.getCanvas(), 0.5, { scaleX: 1, scaleY: 1, onComplete: function () {
                            play.setScale(1, 1);
                        } }, "boom");
                    timeline.play();
                };
                Splash.prototype._splashOut = function () {
                    var _this = this;
                    TweenMax.to(this.getDiv(), 0.75, { delay: 0.25, alpha: 0, onComplete: function () {
                            _this.destroy();
                            IWG.IWGEM.trigger('mainGameIntro');
                        } });
                };
                return Splash;
            })(iwg.Scene);
            iwg.Splash = Splash;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
