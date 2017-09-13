/// <reference path="../imports/js/Sideplay.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GLOBAL = IWG.Global, GAMEOBJECT = IWG.GameObject, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, SPRITESHEETS = IWG.SpriteSheets, ANIMATION = IWG.Animation, SOUND = IWG.Sound, SCENE = IWG.Scene, SCALE = IWG.Scale, PAUSE = IWG.Pause, SPLASH = IWG.Splash, MATCH = IWG.Match, TICKET = IWG.Ticket, ENDGAME = IWG.EndGame, HELPER = IWG.Helper;
            var MainLayout = (function () {
                function MainLayout() {
                    this._match = new MATCH('match');
                    this._subscribe();
                    this._init();
                    this._setupSplash();
                    this._setupEndgame();
                }
                MainLayout.prototype._subscribe = function () {
                    IWG.IWGEM.on('mainGameIntro', this._mainGameSetup.bind(this));
                    IWG.IWGEM.on('matchFinished', this._checkFinished.bind(this));
                };
                MainLayout.prototype._unsubscribe = function () {
                    IWG.IWGEM.off('mainGameIntro');
                };
                MainLayout.prototype._init = function () {
                    var scale = new SCALE(document.getElementById('IWGholder'));
                    var sound = new SOUND();
                    sound.setDimensions({
                        w: 50,
                        h: 50
                    });
                    sound.setZindex("11");
                    sound.setScale(1, 1);
                    sound.setPosition({ x: 865, y: 65 });
                    var background = new GAMEOBJECT('mainBG', { w: 1300, h: 770 });
                    background.addBitmap({
                        name: "bg",
                        pos: {
                            x: 0,
                            y: 0
                        },
                        frame: "bg_game",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                    });
                    background.setScale(1.2, 1.2);
                    this._match.setInstantWin(41);
                    this._match.setInstantWin(42);
                    this._match.setInstantWin(43);
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
                    var mainGameScene = new SCENE('mainGame');
                    mainGameScene.setDimensions({
                        w: 960,
                        h: 640
                    });
                    mainGameScene.setZindex(10);
                    mainGameScene.setAlpha(0);
                    var logoGame = new GAMEOBJECT('logoGame', { w: 900, h: 400 }, 1, mainGameScene);
                    logoGame.addBitmap({
                        name: "logoGame",
                        pos: {
                            x: 450,
                            y: 200
                        },
                        frame: "logo_game",
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                    });
                    logoGame.setPosition({
                        x: 480 - 450,
                        y: -74
                    });
                    var shinerData = [
                        [115, 30],
                        [105, 88],
                        [98, 135],
                        [775, 45],
                        [815, 100],
                        [810, 135]
                    ];
                    for (var i = 0; i < shinerData.length; i++) {
                        var shinerGO = new GAMEOBJECT("shinerBrand" + i, { w: 54, h: 54 }, 1, mainGameScene);
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
                        shinerGO.setScale(0.7, 0.7);
                        shinerGO.addAnimation('spin');
                        shinerGO.setAnimation('spin', 'spin');
                        shinerGO.animate('spin');
                    }
                    ;
                    var panel = new GAMEOBJECT('panel', { w: 890, h: 462 }, 1, mainGameScene);
                    panel.addBitmap({
                        name: "panel",
                        pos: {
                            x: 445,
                            y: 231
                        },
                        frame: "panel",
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                    });
                    panel.addBitmap({
                        name: "panel-div",
                        pos: {
                            x: 205,
                            y: 232
                        },
                        frame: "panel_div",
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                    });
                    panel.setPosition({
                        x: 480 - 445,
                        y: 130
                    });
                    console.log(panel);
                    var winningSymbolString = new GAMEOBJECT('winningNumbers', { w: 120, h: 50 }, 1, mainGameScene);
                    winningSymbolString.addBitmap({
                        name: "icon",
                        pos: {
                            x: 60,
                            y: 25
                        },
                        frame: "winningnumbers",
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                    });
                    winningSymbolString.setPosition({
                        x: 92,
                        y: 185
                    });
                    var winningData = [
                        [75, 220],
                        [75, 390]
                    ];
                    for (var i = 0; i < winningData.length; i++) {
                        var dataSet = winningData[i];
                        var winningGO = new CLICKABLEGAMEOBJECT('winningSymbol' + i, { w: 140, h: 140 }, 1, mainGameScene);
                        winningGO.addBitmap({
                            name: "highlight",
                            pos: {
                                x: 70,
                                y: 70
                            },
                            frame: "highlight",
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                            alpha: 0
                        });
                        winningGO.addBitmap({
                            name: "icon",
                            pos: {
                                x: 85,
                                y: 70
                            },
                            frame: "Pound",
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("poundSS")
                        });
                        winningGO.addBitmap({
                            name: "symbol_number",
                            pos: {
                                x: 70,
                                y: 70
                            },
                            frame: "n" + TICKET.getInstance().getWinningSymbols()[i],
                            doReg: {
                                center: true
                            },
                            alpha: 0,
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        winningGO.addBitmap({
                            name: "symbol_highlight",
                            pos: {
                                x: 70,
                                y: 70
                            },
                            frame: "nw" + TICKET.getInstance().getWinningSymbols()[i],
                            doReg: {
                                center: true
                            },
                            alpha: 0,
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        winningGO.setPosition({
                            x: dataSet[0],
                            y: dataSet[1]
                        });
                        winningGO.setTicketLabel(TICKET.getInstance().getWinningSymbols()[i]);
                        winningGO.setEnabled(true);
                        winningGO.setReminder(true, 'poundReminder');
                        winningGO.setAnimation('reveal', 'symbolReveal', 0.2, 0.5);
                        winningGO.setAnimation('winReveal', 'symbolWinReveal', 0.5, 1);
                        winningGO.animate('reminder1');
                        winningGO.setAction('click', function (winningGO) {
                            if (!winningGO.getRevealed()) {
                                winningGO.setEnabled(false);
                                winningGO.setScale(1, 1);
                                winningGO.killReminder();
                                winningGO.reveal();
                                IWG.IWGEM.trigger('decClickCount', ['match', winningGO]);
                                createjs.Sound.play('moneyBag');
                            }
                        }.bind(null, winningGO));
                        this._match.addSymbol(winningGO, "winning");
                    }
                    var yourNumbersString = new GAMEOBJECT('yourNumbers', { w: 162, h: 24 }, 1, mainGameScene);
                    yourNumbersString.addBitmap({
                        name: "icon",
                        pos: {
                            x: 81,
                            y: 12
                        },
                        frame: "yournumbers",
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                    });
                    yourNumbersString.setPosition({
                        x: 490,
                        y: 190
                    });
                    var yourData = [
                        [250, 200],
                        [410, 200],
                        [570, 200],
                        [730, 200],
                        [250, 360],
                        [410, 360],
                        [570, 360],
                        [730, 360]
                    ];
                    for (var i = 0; i < yourData.length; i++) {
                        var dataSet = yourData[i];
                        var turn = TICKET.getInstance().getTurnPrize()[i];
                        var yourSymbolGO = new CLICKABLEGAMEOBJECT('yourSymbol' + i, { w: 150, h: 220 }, 1, mainGameScene);
                        yourSymbolGO.addBitmap({
                            name: "stars",
                            pos: {
                                x: 75,
                                y: 75
                            },
                            frame: "Trail",
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("starSS")
                        });
                        var frame = "n" + TICKET.getInstance().getSymbolNumber()[i];
                        var ss = SPRITESHEETS.getInstance().getSpriteSheet("masterSS");
                        if (frame === "n41") {
                            frame = "Star5";
                            ss = SPRITESHEETS.getInstance().getSpriteSheet("star5SS");
                        }
                        else if (frame === "n42") {
                            frame = "Star10";
                            ss = SPRITESHEETS.getInstance().getSpriteSheet("star10SS");
                        }
                        else if (frame === "n43") {
                            frame = "Star20";
                            ss = SPRITESHEETS.getInstance().getSpriteSheet("star20SS");
                        }
                        yourSymbolGO.addBitmap({
                            name: "highlight",
                            pos: {
                                x: 75,
                                y: 75
                            },
                            frame: "highlight",
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                            alpha: 0
                        });
                        yourSymbolGO.addBitmap({
                            name: "symbol_number",
                            pos: {
                                x: 75,
                                y: 75
                            },
                            frame: frame,
                            doReg: {
                                center: true
                            },
                            scale: {
                                x: 0.43,
                                y: 0.43
                            },
                            spriteSheet: ss
                        });
                        yourSymbolGO.addBitmap({
                            name: "icon",
                            pos: {
                                x: 75,
                                y: 75
                            },
                            frame: "Bag",
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("bagSS")
                        });
                        yourSymbolGO.addBitmap({
                            name: "symbol_highlight",
                            pos: {
                                x: 75,
                                y: 75
                            },
                            frame: "nw" + TICKET.getInstance().getSymbolNumber()[i],
                            doReg: {
                                center: true
                            },
                            alpha: 0,
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        yourSymbolGO.addBitmap({
                            name: "prize",
                            pos: {
                                x: 75,
                                y: 155
                            },
                            frame: "p" + TICKET.getInstance().getPrizeList()[turn],
                            doReg: {
                                center: true
                            },
                            alpha: 0,
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        yourSymbolGO.addBitmap({
                            name: "prize_highlight",
                            pos: {
                                x: 75,
                                y: 155
                            },
                            frame: "pw" + TICKET.getInstance().getPrizeList()[turn],
                            doReg: {
                                center: true
                            },
                            alpha: 0,
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        yourSymbolGO.addBitmap({
                            name: "wordPrize",
                            pos: {
                                x: 75,
                                y: 155
                            },
                            frame: "word_prize",
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        yourSymbolGO.setPosition({
                            x: dataSet[0],
                            y: dataSet[1]
                        });
                        yourSymbolGO.setPrizeValue(TICKET.getInstance().getPrizeList()[turn]);
                        yourSymbolGO.setTicketLabel(TICKET.getInstance().getSymbolNumber()[i]);
                        yourSymbolGO.setEnabled(true);
                        yourSymbolGO.setReminder(true, 'bagReminder');
                        yourSymbolGO.setAnimation('reveal', 'iconReveal', 0.2, 0.5);
                        yourSymbolGO.addAnimation('prizeReveal');
                        yourSymbolGO.setAnimation('prizeReveal', 'iconPrizeReveal', 0.2, 0.5);
                        yourSymbolGO.setAnimation('winReveal', 'iconWinReveal', 0.5, 1);
                        yourSymbolGO.animate('reminder1');
                        yourSymbolGO.getBitmap('wordPrize').on('click', function (yourSymbolGO) {
                            yourSymbolGO.setScale(1, 1);
                            if (!yourSymbolGO.getRevealed()) {
                                yourSymbolGO.setEnabled(false);
                                yourSymbolGO.killReminder();
                                yourSymbolGO.animate('prizeReveal');
                                yourSymbolGO.setReveal(true);
                                IWG.IWGEM.trigger('decClickCount', ['match', yourSymbolGO]);
                                createjs.Sound.play('prize');
                            }
                        }.bind(null, yourSymbolGO));
                        yourSymbolGO.getBitmap('icon').on('click', function (yourSymbolGO) {
                            yourSymbolGO.setScale(1, 1);
                            if (!yourSymbolGO.getRevealed()) {
                                yourSymbolGO.setEnabled(false);
                                yourSymbolGO.killReminder();
                                yourSymbolGO.reveal();
                                IWG.IWGEM.trigger('decClickCount', ['match', yourSymbolGO]);
                                createjs.Sound.play('prize');
                            }
                        }.bind(null, yourSymbolGO));
                        this._match.addSymbol(yourSymbolGO, "playable");
                    }
                    var instructions = new GAMEOBJECT('instructions', { w: 740, h: 74 }, 1, mainGameScene);
                    instructions.addBitmap({
                        name: "instructions",
                        pos: {
                            x: 370,
                            y: 37
                        },
                        frame: "instructions",
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                    });
                    instructions.setPosition({
                        x: 480 - 370,
                        y: 555
                    });
                    TweenMax.to(mainGameScene.getDiv(), 1, { delay: 0.5, alpha: 1 });
                };
                MainLayout.prototype._setupEndgame = function () {
                    var endGame = new ENDGAME("endGame");
                    endGame.setDimensions({
                        w: 696,
                        h: 170
                    });
                    endGame.setPosition({
                        x: 480 - 348,
                        y: -350
                    });
                    endGame.setZindex("11");
                    endGame.setAlpha(0);
                };
                MainLayout.prototype._checkFinished = function () {
                    IWG.IWGEM.trigger('showEndGame');
                };
                return MainLayout;
            })();
            iwg.MainLayout = MainLayout;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
