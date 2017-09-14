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
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GLOBAL = IWG.Global, GAMEOBJECT = IWG.GameObject, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, SPRITESHEETS = IWG.SpriteSheets;
            var Splash = (function (_super) {
                __extends(Splash, _super);
                function Splash(_name) {
                    _super.call(this, _name);
                    this._methods = [];
                    this._dabbers = [];
                    this._initSplash();
                    this._subscribeSplash();
                }
                Splash.prototype._subscribeSplash = function () {
                    IWG.IWGEM.on("Splash.methodSelected", this._stage1Outro.bind(this));
                    IWG.IWGEM.on("Splash.dabberSelected", this._stage2Outro.bind(this));
                    IWG.IWGEM.on('Splash.mainGameIntro', this._splashOut.bind(this));
                };
                Splash.prototype._unsubscribeSplash = function () {
                    IWG.IWGEM.off("Splash.methodSelected");
                    IWG.IWGEM.off("Splash.dabberSelected");
                    IWG.IWGEM.off("Splash.mainGameIntro");
                };
                Splash.prototype._initSplash = function () {
                    var splashLogo = new CLICKABLEGAMEOBJECT("logo", { w: 393, h: 210 }, 6, this);
                    splashLogo.addBitmap({
                        name: "logo",
                        pos: {
                            x: 197,
                            y: 105
                        },
                        frame: "logo",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                        doReg: {
                            center: true
                        }
                    });
                    splashLogo.setPosition({
                        x: 480 - 197,
                        y: 10
                    });
                    var winupto = new GAMEOBJECT("winupto", { w: 261, h: 103 }, 6, this);
                    winupto.addBitmap({
                        name: "winupto",
                        pos: {
                            x: 131,
                            y: 52
                        },
                        frame: "winupto",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                        doReg: {
                            center: true
                        }
                    });
                    winupto.setPosition({
                        x: 480 - 131,
                        y: 200
                    });
                    var images = [
                        "howtoplay1",
                        "howtoplay2",
                        "howtoplay2"
                    ];
                    var method = [
                        "MarkYourself",
                        "MarkAutomatically",
                        "InstantReveal"
                    ];
                    for (var i = 0; i < 3; i++) {
                        var howToPlay = new CLICKABLEGAMEOBJECT("gameType" + i, { w: 292, h: 232 }, 10, this);
                        this._methods.push(howToPlay);
                        howToPlay.addBitmap({
                            name: "bg",
                            pos: {
                                x: 0,
                                y: 0
                            },
                            frame: "howtoplay_panel",
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                            doReg: {
                                center: false
                            }
                        });
                        howToPlay.addBitmap({
                            name: "howToPlayImage",
                            pos: {
                                x: 135,
                                y: 80
                            },
                            frame: images[i],
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                            doReg: {
                                center: true
                            }
                        });
                        howToPlay.addBitmap({
                            name: "howToPlayText",
                            pos: {
                                x: 135,
                                y: 170
                            },
                            frame: "howtoplay_method" + (i + 1),
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                            doReg: {
                                center: true
                            }
                        });
                        howToPlay.setPosition({
                            x: 50 + (i * 290),
                            y: 305
                        });
                        howToPlay.setTicketLabel(method[i]);
                        howToPlay.addAnimation('chooseClick');
                        howToPlay.setAnimation("chooseClick", "click");
                        howToPlay.addAnimation('chooseRollOver');
                        howToPlay.setAnimation("chooseRollOver", "rollover");
                        howToPlay.addAnimation("chooseRollOut");
                        howToPlay.setAnimation("chooseRollOut", "rollout");
                        var self = this;
                        howToPlay.setEnabled(true);
                        howToPlay.setAction('click', function (howToPlay) {
                            howToPlay.setEnabled(false);
                            self._stopReminderSymbolsStage1(true);
                            howToPlay.animate('chooseClick');
                            howToPlay.animate('chooseRollOut');
                            createjs.Sound.play('howToPlay');
                            IWG.IWGEM.trigger('Splash.methodSelected', [howToPlay.getTicketLabel()]);
                            GLOBAL.getInstance().addToGlobal('method', howToPlay.getTicketLabel());
                        }.bind(null, howToPlay));
                        howToPlay.setAction('rollover', function (howToPlay) {
                            self._stopReminderSymbolsStage1(true);
                            howToPlay.animate('chooseRollOver');
                        }.bind(null, howToPlay));
                        howToPlay.setAction('rollout', function (howToPlay) {
                            self._stopReminderSymbolsStage1(true);
                            howToPlay.animate('chooseRollOut');
                        }.bind(null, howToPlay));
                        howToPlay.animationTimeLine = new TimelineMax({
                            onStartParams: [howToPlay],
                            onStart: function (howToPlay) {
                                howToPlay.active = true;
                            },
                            paused: true,
                            onCompleteParams: [howToPlay],
                            onComplete: function (howToPlay) {
                                howToPlay.active = false;
                            }
                        });
                        var panel = howToPlay.getBitmap("bg");
                        var symbol = howToPlay.getBitmap("howToPlayImage");
                        var text = howToPlay.getBitmap("howToPlayText");
                        howToPlay.animationTimeLine.to(panel, 1, { delay: 4,
                            onStartParams: [howToPlay],
                            onStart: function (howToPlay) {
                            } }, "start")
                            .to(panel, 1, { repeat: -1, yoyo: true, alpha: 0.5, repeatDelay: 0.5,
                            onStartParams: [howToPlay],
                            onStart: function (howToPlay) {
                                howToPlay.active = true;
                            } }, "pulse")
                            .to(symbol, 1, { repeat: -1, yoyo: true, alpha: 0.5, repeatDelay: 0.5
                        }, "pulse")
                            .to(text, 1, { repeat: -1, yoyo: true, alpha: 0.5, repeatDelay: 0.5
                        }, "pulse");
                        ;
                        this._startReminderSymbolsStage1();
                    }
                    var choose = new GAMEOBJECT("choose", { w: 638, h: 55 }, 6, this);
                    choose.addBitmap({
                        name: "choosePlay",
                        pos: {
                            x: 319,
                            y: 28
                        },
                        frame: "prompt_choosemethod",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                        doReg: {
                            center: true
                        }
                    });
                    choose.setPosition({
                        x: 480 - 319,
                        y: 530
                    });
                    var dabberColour = [
                        "dabber_blue",
                        "dabber_yellow",
                        "dabber_purple"
                    ];
                    for (var j = 0; j < 3; j++) {
                        var dabber = new CLICKABLEGAMEOBJECT("dabber" + j, { w: 110, h: 370 }, 10, this);
                        this._dabbers.push(dabber);
                        dabber.addBitmap({
                            name: "dabber" + j,
                            pos: {
                                x: 0,
                                y: 0
                            },
                            frame: dabberColour[j],
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                            doReg: {
                                center: false
                            }
                        });
                        dabber.setPosition({
                            x: 230 + (j * 200) + 800,
                            y: 230
                        });
                        var dabberstring = dabberColour[j].split("dabber_")[1];
                        dabber.setTicketLabel(dabberstring);
                        dabber.addAnimation('dabberClick');
                        dabber.setAnimation("dabberClick", "click");
                        dabber.addAnimation('dabberRollOver');
                        dabber.setAnimation("dabberRollOver", "rollover");
                        dabber.addAnimation("dabberRollOut");
                        dabber.setAnimation("dabberRollOut", "rollout");
                        var self = this;
                        dabber.setEnabled(true);
                        dabber.setAction('click', function (dabber) {
                            dabber.setEnabled(false);
                            self._stopReminderSymbolsStage2(true);
                            dabber.animate('dabberClick');
                            dabber.animate('dabberRollOut');
                            createjs.Sound.play('colour');
                            IWG.IWGEM.trigger('Splash.dabberSelected', [dabber.getTicketLabel()]);
                            GLOBAL.getInstance().addToGlobal('dabber', dabber.getTicketLabel());
                        }.bind(null, dabber));
                        dabber.setAction('rollover', function (dabber) {
                            self._stopReminderSymbolsStage2(true);
                            dabber.animate('dabberRollOver');
                        }.bind(null, dabber));
                        dabber.setAction('rollout', function (dabber) {
                            self._stopReminderSymbolsStage2(true);
                            dabber.animate('dabberRollOut');
                        }.bind(null, dabber));
                        dabber.animationTimeLine = new TimelineMax({
                            onStartParams: [dabber],
                            onStart: function (dabber) {
                                dabber.active = true;
                            },
                            paused: true,
                            onCompleteParams: [dabber],
                            onComplete: function (dabber) {
                                dabber.active = false;
                            }
                        });
                        var dabberSymbol = dabber.getBitmap("dabber" + j);
                        dabber.animationTimeLine.to(dabberSymbol, 1, { delay: 4,
                            onStartParams: [dabber],
                            onStart: function (dabber) {
                            } }, "start")
                            .to(dabberSymbol, 1, { repeat: -1, yoyo: true, alpha: 0.5, repeatDelay: 0.5,
                            onStartParams: [dabber],
                            onStart: function (dabber) {
                                dabber.active = true;
                            } }, "pulse");
                    }
                };
                Splash.prototype._startReminderSymbolsStage1 = function () {
                    for (var gameModeNum = 0; gameModeNum < this._methods.length; gameModeNum++) {
                        var turnItem = this._methods[gameModeNum];
                        if (!turnItem.getRevealed()) {
                            turnItem.animationTimeLine.restart();
                        }
                    }
                };
                Splash.prototype._stopReminderSymbolsStage1 = function (reset) {
                    for (var gameModeNum = 0; gameModeNum < this._methods.length; gameModeNum++) {
                        var turnItem = this._methods[gameModeNum];
                        if (!turnItem.getRevealed()) {
                            if (reset) {
                                turnItem.animationTimeLine.restart();
                            }
                            else {
                                turnItem.animationTimeLine.pause("start");
                            }
                        }
                    }
                };
                Splash.prototype._startReminderSymbolsStage2 = function () {
                    for (var gameModeNum = 0; gameModeNum < this._dabbers.length; gameModeNum++) {
                        var dabber = this._dabbers[gameModeNum];
                        if (!dabber.getRevealed()) {
                            dabber.animationTimeLine.restart();
                        }
                    }
                };
                Splash.prototype._stopReminderSymbolsStage2 = function (reset) {
                    for (var gameModeNum = 0; gameModeNum < this._dabbers.length; gameModeNum++) {
                        var dabber = this._dabbers[gameModeNum];
                        if (!dabber.getRevealed()) {
                            if (reset) {
                                dabber.animationTimeLine.restart();
                            }
                            else {
                                dabber.animationTimeLine.pause("start");
                            }
                        }
                    }
                };
                Splash.prototype._stage1Outro = function () {
                    var _this = this;
                    var timeLine = new TimelineMax({
                        delay: 0.5,
                        paused: true,
                        onComplete: function () {
                            if (GLOBAL.getInstance().getFromGlobal('method') === "InstantReveal") {
                                IWG.IWGEM.trigger('Splash.mainGameIntro');
                            }
                            else {
                                _this._stage2Intro();
                            }
                        }
                    });
                    for (var i = 0; i < this._methods.length; i++) {
                        var methodSelector = this._methods[i];
                        if (methodSelector.getEnabled() === true) {
                            methodSelector.setEnabled(false);
                            timeLine.add(TweenMax.to(methodSelector.getCanvas(), 0.3, { alpha: 0.2 }), "alpha");
                        }
                        else {
                            methodSelector.setEnabled(false);
                            timeLine.add(TweenMax.to(methodSelector.getCanvas(), 0.3, { alpha: 1 }), "alpha");
                            methodSelector.setZindex(12);
                        }
                        timeLine.add(TweenMax.to(methodSelector.getCanvas(), 0.4, { delay: 0.25, x: 480 - 146, ease: Power1.easeOut, onComplete: function () {
                                methodSelector.setEnabled(false);
                            } }), "center");
                        timeLine.add(TweenMax.to(methodSelector.getCanvas(), 0.4, { delay: 0.25, x: -500, ease: Back.easeOut, onComplete: function () {
                                methodSelector.setEnabled(false);
                            } }), "move");
                    }
                    var winUpTo = this.getChildByName('winupto');
                    timeLine.add(TweenMax.to(winUpTo.getCanvas(), 0.4, { delay: 0.25, x: -500, ease: Back.easeOut }), "move");
                    var promptChoose = this.getChildByName('choose');
                    timeLine.add(TweenMax.to(promptChoose.getCanvas(), 0.4, { delay: 0.25, alpha: 0 }), "move");
                    timeLine.play();
                };
                Splash.prototype._stage2Intro = function () {
                    var timeLine = new TimelineMax();
                    for (var i = 0; i < this._dabbers.length; i++) {
                        var dabber = this._dabbers[i];
                        var x = dabber.getPosition().x;
                        timeLine.add(TweenMax.to(dabber.getCanvas(), 0.4, { x: x - 800, ease: Power1.easeOut, onComplete: function () {
                                dabber.setEnabled(true);
                            } }));
                    }
                    this._startReminderSymbolsStage2();
                    var promptChoose = this.getChildByName('choose');
                    promptChoose.getStage().children[0].gotoAndStop('prompt_choosedabber');
                    promptChoose.setPosition({
                        x: 480 - 300
                    });
                    promptChoose.getStage().update();
                    timeLine.add(TweenMax.to(promptChoose.getCanvas(), 0.5, { alpha: 1 }));
                };
                Splash.prototype._stage2Outro = function () {
                    var timeLine = new TimelineMax({
                        delay: 0.25,
                        paused: true,
                        onComplete: function () {
                            IWG.IWGEM.trigger('Splash.mainGameIntro');
                        }
                    });
                    for (var i = 0; i < this._dabbers.length; i++) {
                        var dabber = this._dabbers[i];
                        if (dabber.getEnabled() === true) {
                            dabber.setEnabled(false);
                            timeLine.add(TweenMax.to(dabber.getCanvas(), 0.25, { alpha: 0.2 }), "alpha");
                        }
                        else {
                            dabber.setEnabled(false);
                            timeLine.add(TweenMax.to(dabber.getCanvas(), 0.25, { alpha: 1 }), "alpha");
                            dabber.setZindex(12);
                        }
                        timeLine.add(TweenMax.to(dabber.getCanvas(), 0.5, { delay: 0.25, x: 480 - 55, ease: Power1.easeOut, onComplete: function () {
                                dabber.setEnabled(false);
                            } }), "center");
                        timeLine.add(TweenMax.to(dabber.getCanvas(), 0.5, { delay: 0.25, x: -500, ease: Power1.easeOut, onComplete: function () {
                                dabber.setEnabled(false);
                            } }), "move");
                    }
                    var promptChoose = this.getChildByName('choose');
                    timeLine.add(TweenMax.to(promptChoose.getCanvas(), 0.4, { alpha: 0 }), "move");
                    timeLine.play();
                };
                Splash.prototype._splashOut = function () {
                    var _this = this;
                    TweenMax.to(this.getDiv(), 0.75, { delay: 0.25, alpha: 0, onComplete: function () {
                            IWG.IWGEM.trigger('mainGameIntro');
                            _this.destroy();
                        } });
                };
                return Splash;
            })(iwg.Scene);
            iwg.Splash = Splash;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
