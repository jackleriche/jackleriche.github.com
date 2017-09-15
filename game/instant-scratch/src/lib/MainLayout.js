/// <reference path="../imports/js/Sideplay.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GLOBAL = IWG.Global, GAMEOBJECT = IWG.GameObject, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, SPRITESHEETS = IWG.SpriteSheets, ANIMATION = IWG.Animation, SOUND = IWG.Sound, SCENE = IWG.Scene, SCALE = IWG.Scale, PAUSE = IWG.Pause, SPLASH = IWG.Splash, MATCH = IWG.Match, SCRATCH = IWG.Scratch, TICKET = IWG.Ticket, ENDGAME = IWG.EndGame, HELPER = IWG.Helper;
            var MainLayout = (function () {
                function MainLayout() {
                    this._match = new MATCH('match', 'match3');
                    this._game = null;
                    this._icons = [];
                    this._subscribe();
                    this._init();
                    this._setupBackground();
                    this._setupSplash();
                }
                MainLayout.prototype._subscribe = function () {
                    IWG.IWGEM.on('mainGameIntro', this._mainGameSetup.bind(this));
                    IWG.IWGEM.on('matchFinished', this._checkFinished.bind(this));
                    IWG.IWGEM.on('loadGame', this._loadGame.bind(this));
                    IWG.IWGEM.on('scratchComplete', this._scratchComplete.bind(this));
                    IWG.IWGEM.on('cardComplete', this._cardFlipComplete.bind(this));
                    IWG.IWGEM.on(CORE.IWGEVENT.SUBLOADER_COMPLETE, this._subloaderComplete.bind(this));
                };
                MainLayout.prototype._unsubscribe = function () {
                    IWG.IWGEM.off('mainGameIntro');
                };
                MainLayout.prototype._init = function () {
                    var scale = new SCALE(document.getElementById('IWGholder'));
                    var exsisting_el = document.getElementById("scaleDiv");
                    var _loadBar_div = document.createElement("div");
                    _loadBar_div.id = "loadBar";
                    document.getElementById("IWGholder").insertBefore(_loadBar_div, exsisting_el);
                    var sound = new SOUND();
                    sound.setDimensions({
                        w: 50,
                        h: 50
                    });
                    sound.setZindex("11");
                    sound.setScale(1, 1);
                    sound.setPosition({ x: 880, y: 42 });
                };
                MainLayout.prototype._setupBackground = function () {
                    var spritesheet = SPRITESHEETS.getInstance().getSpriteSheet("masterSingleSS");
                    var splashBg = new GAMEOBJECT('splashBg', { w: 1300, h: 770 }, 0);
                    splashBg.addBitmap({
                        name: "splashBg",
                        pos: {
                            x: 0,
                            y: 0
                        },
                        frame: "bg_splash",
                        spriteSheet: spritesheet,
                        doReg: {
                            custom: {
                                x: 0,
                                y: 0
                            }
                        }
                    });
                    splashBg.setAlpha(1);
                    splashBg.setScale(1.1, 1.1);
                    splashBg.setPosition({
                        x: -100,
                        y: -100
                    });
                };
                MainLayout.prototype._setupSplash = function () {
                    var splash = new SPLASH("splash");
                    splash.setDimensions({
                        w: 960,
                        h: 640
                    });
                    splash.setZindex("6");
                };
                MainLayout.prototype._mainGameSetup = function () {
                    var spritesheet = SPRITESHEETS.getInstance().getSpriteSheet("master-" + this._game + "-SS");
                    var animationSS = SPRITESHEETS.getInstance().getSpriteSheet("master-" + this._game + "splash-SS");
                    var mainGameScene = new SCENE('mainGame');
                    mainGameScene.setDimensions({
                        w: 960,
                        h: 640
                    });
                    mainGameScene.setZindex(10);
                    mainGameScene.setAlpha(0);
                    var animationScene = new SCENE('animationScene');
                    animationScene.setDimensions({
                        w: 960,
                        h: 640
                    });
                    animationScene.setZindex(9);
                    animationScene.setAlpha(1);
                    this._match.setInstantWin('coin');
                    var gameBG = new GAMEOBJECT('bg_game', { w: 960, h: 640 }, 1, mainGameScene);
                    gameBG.addBitmap({
                        name: "bg_game",
                        pos: {
                            x: 480,
                            y: 320
                        },
                        frame: "bg_game",
                        doReg: {
                            center: true
                        },
                        spriteSheet: spritesheet
                    });
                    gameBG.setPosition({
                        x: 0,
                        y: 0
                    });
                    var boxReminder = new CLICKABLEGAMEOBJECT('boxReminder', { w: 574, h: 504 }, 1, mainGameScene);
                    boxReminder.addBitmap({
                        name: "boxReminder",
                        pos: {
                            x: 287,
                            y: 252
                        },
                        frame: "panel_glow",
                        alpha: 0,
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSingleSS")
                    });
                    boxReminder.setPosition({
                        x: 386.5,
                        y: 71
                    });
                    boxReminder.setReminder(true, 'boxReminder');
                    boxReminder.animate('reminder1');
                    var gameScale = new CLICKABLEGAMEOBJECT('bg_scale', { w: 960, h: 640 }, 1, mainGameScene);
                    gameScale.setAlpha(0.01);
                    gameScale.setEnabled(false);
                    gameScale.setZindex('11');
                    var shape = new createjs.Shape();
                    shape.graphics.beginFill("#fff").drawRect(0, 0, 960, 640);
                    gameScale.getStage().addChild(shape);
                    gameScale.getStage().update();
                    var splashanim = new GAMEOBJECT('splashanim', { w: 960, h: 640 }, 1, animationScene);
                    splashanim.addBitmap({
                        name: "splashanim",
                        pos: {
                            x: 0,
                            y: 0
                        },
                        frame: animationSS._animations[0],
                        scale: {
                            x: 2,
                            y: 2
                        },
                        doReg: {
                            custom: {
                                x: 0,
                                y: 0
                            }
                        },
                        spriteSheet: animationSS
                    });
                    splashanim.setPosition({
                        x: 0,
                        y: 0
                    });
                    splashanim.addAnimation('splashAnim');
                    splashanim.setAnimation('splashAnim', 'splashAnim', 1, 4, mainGameScene);
                    var scratch = new SCRATCH('scratchPad');
                    scratch.setParent(mainGameScene);
                    scratch.setZindex("3");
                    scratch.setDimensions({
                        w: 508,
                        h: 334
                    });
                    scratch.setPosition({
                        x: 419,
                        y: 103
                    });
                    scratch.setPercentageComplete(75);
                    scratch.setFoilPeel(true);
                    scratch.setImage("notes", "master-" + this._game + "-SS");
                    scratch.setup();
                    var position = [
                        [430, 100], [580, 100], [730, 100],
                        [430, 210], [580, 210], [730, 210],
                        [430, 320], [580, 320], [730, 320],
                    ];
                    for (var i = 0; i < position.length; i++) {
                        var prizePos = position[i];
                        var prizes = TICKET.getInstance().getPrizeList()[TICKET.getInstance().getTurnPrize()[i]];
                        var frames = prizes;
                        var prizeAmount = new GAMEOBJECT('prizeAmount' + i, { w: 182, h: 130 }, 1, mainGameScene);
                        this._icons.push(prizeAmount);
                        prizeAmount.active = false;
                        prizeAmount.setPrizeValue(prizes);
                        if (TICKET.getInstance().getTurn(i).iW !== undefined) {
                            frames = 'coin_outline';
                            prizes = 'coin';
                            prizeAmount.setPrizeValue(5);
                        }
                        else {
                            frames = 'p' + prizes;
                        }
                        prizeAmount.addBitmap({
                            name: "winHighlight",
                            pos: {
                                x: 91,
                                y: 65
                            },
                            frame: "pen",
                            alpha: 0,
                            doReg: {
                                center: true
                            },
                            spriteSheet: spritesheet
                        });
                        prizeAmount.addBitmap({
                            name: "winHighlight_white",
                            pos: {
                                x: 96,
                                y: 65
                            },
                            frame: "highlight_white",
                            alpha: 0,
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSingleSS")
                        });
                        prizeAmount.addBitmap({
                            name: "prize",
                            pos: {
                                x: 91,
                                y: 65
                            },
                            frame: frames,
                            alpha: 1,
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSingleSS"),
                        });
                        if (frames === 'coin_outline') {
                            prizeAmount.addBitmap({
                                name: "coin",
                                pos: {
                                    x: 93.5,
                                    y: 57
                                },
                                frame: "Coin",
                                alpha: 0,
                                doReg: {
                                    center: true
                                },
                                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSingleSS"),
                            });
                        }
                        prizeAmount.setPosition({
                            x: prizePos[0],
                            y: prizePos[1]
                        });
                        prizeAmount.setTicketLabel(prizes);
                        this._match.addSymbol(prizeAmount, 'playable');
                        prizeAmount.setAnimation('winReveal', 'prizeAmountWin', 0.2, 4);
                    }
                    this._cardFlip();
                };
                MainLayout.prototype._cardFlip = function () {
                    var preview = HELPER.getGameObject('splashanim');
                    preview.animate('splashAnim');
                };
                MainLayout.prototype._cardFlipComplete = function () {
                    HELPER.getScene('animationScene').destroy();
                    for (var i = 0; i < 6; i++) {
                        HELPER.getGameObject('gameClick' + i).destroy();
                    }
                };
                MainLayout.prototype._setupEndgame = function () {
                    var endGame = new ENDGAME("endGame");
                    endGame.setDimensions({
                        w: 275,
                        h: 260
                    });
                    endGame.setPosition({
                        x: 140,
                        y: 340
                    });
                    endGame.setZindex("1");
                };
                MainLayout.prototype._checkFinished = function () {
                    var _this = this;
                    HELPER.getGameObject('boxReminder').destroy();
                    if (TICKET.getInstance().getOutcome().amount > 0) {
                        TweenMax.delayedCall(3, function () {
                            _this._setupEndgame();
                            IWG.IWGEM.trigger('showEndGame');
                        });
                        return true;
                    }
                    this._setupEndgame();
                    IWG.IWGEM.trigger('showEndGame');
                    return false;
                };
                MainLayout.prototype._loadGame = function (game) {
                    var subManifest = [];
                    subManifest.push({ "src": "src/imports/img/master-" + game + "-SS.png", "id": "master-" + game + "-SS" });
                    subManifest.push({ "src": "src/imports/json/master-" + game + "-SS.json", "id": "master-" + game + "-SS-data", type: createjs.LoadQueue.JSON });
                    subManifest.push({ "src": "src/imports/img/master-" + game + "splash-SS.png", "id": "master-" + game + "splash-SS" });
                    subManifest.push({ "src": "src/imports/json/master-" + game + "splash-SS.json", "id": "master-" + game + "splash-SS-data", type: createjs.LoadQueue.JSON });
                    this._game = game;
                    CORE.IWG.ame('subloader', subManifest);
                };
                MainLayout.prototype._subloaderComplete = function () {
                    var spriteSheetData = CORE.iwgLoadQ.getResult("master-" + this._game + "-SS-data");
                    SPRITESHEETS.getInstance().addSpriteSheet("master-" + this._game + "-SS", spriteSheetData);
                    var splashAnimation = CORE.iwgLoadQ.getResult("master-" + this._game + "splash-SS-data");
                    SPRITESHEETS.getInstance().addSpriteSheet("master-" + this._game + "splash-SS", splashAnimation);
                    IWG.IWGEM.off(CORE.IWGEVENT.SUBLOADER_COMPLETE, this._loadGame);
                    this._mainGameSetup();
                };
                MainLayout.prototype._scratchComplete = function () {
                    for (var i = 0; i < this._icons.length; i++) {
                        var icon = this._icons[i];
                        IWG.IWGEM.trigger('decClickCount', [this._match.getName(), icon]);
                    }
                };
                return MainLayout;
            })();
            iwg.MainLayout = MainLayout;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
