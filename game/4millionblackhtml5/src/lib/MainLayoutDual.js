/// <reference path="../imports/js/Sideplay.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GLOBAL = IWG.Global, GAMEOBJECT = IWG.GameObject, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, SPRITESHEETS = IWG.SpriteSheets, ANIMATION = IWG.Animation, SOUND = IWG.Sound, SCENE = IWG.Scene, SCALE = IWG.Scale, SPLASH = IWG.SplashDual, SLIDE = IWG.Slide, MATCH = IWG.Match, COMPARE = IWG.Compare, EQUALS = IWG.Equals, TICKET = IWG.Ticket, ENDGAMEDUAL = IWG.EndGameDual, HELPER = IWG.Helper;
            var MainLayoutDual = (function () {
                function MainLayoutDual() {
                    this._screens = [];
                    this._matchG1 = new MATCH('matchG1', "match");
                    this._matchG5 = new MATCH('matchG5', "match");
                    this._gamesFinished = 0;
                    this._gameReminders = [4, 3, 3, 3, 10];
                    this._gameBgNames = ["game1BG", "game2BG", "game3BG", "game4BG", "game5BG"];
                    this._subscribe();
                    this._init();
                    this._setupSplash();
                    this._mainGameSetup();
                    this._setupSlide();
                    this._setupEndgame();
                }
                MainLayoutDual.prototype._subscribe = function () {
                    IWG.IWGEM.on('mainGameIntro', this._gameIntro.bind(this));
                    IWG.IWGEM.on('matchFinished', this._checkFinished.bind(this));
                    IWG.IWGEM.on('equalsFinished', this._checkFinished.bind(this));
                    IWG.IWGEM.on('compareFinished', this._checkFinished.bind(this));
                };
                MainLayoutDual.prototype._unsubscribe = function () {
                };
                MainLayoutDual.prototype._init = function () {
                    var scale = new SCALE(document.getElementById('IWGholder'));
                    var sound = new SOUND();
                    sound.setDimensions({
                        w: 50,
                        h: 50
                    });
                    sound.setZindex("11");
                    sound.setScale(1, 1);
                    sound.setPosition({ x: 865, y: 515 });
                };
                MainLayoutDual.prototype._setupSplash = function () {
                    var splash = new SPLASH("splash");
                    splash.setDimensions({
                        w: 960,
                        h: 640
                    });
                    splash.setZindex("6");
                };
                MainLayoutDual.prototype._mainGameSetup = function () {
                    var screen1 = new iwg.Scene('scene1');
                    screen1.setDimensions({
                        w: 960,
                        h: 640
                    });
                    var screen2 = new iwg.Scene('scene2');
                    screen2.setDimensions({
                        w: 960,
                        h: 640
                    });
                    var screen3 = new iwg.Scene('scene3');
                    screen3.setDimensions({
                        w: 960,
                        h: 640
                    });
                    this._screens.push(screen1);
                    this._screens.push(screen2);
                    this._screens.push(screen3);
                    this._setupGameOne();
                    this._setupGameTwo();
                    this._setupGameThree();
                    this._setupGameFour();
                    this._setupGameFive();
                };
                MainLayoutDual.prototype._setupGameOne = function () {
                    var game1 = new SCENE('game1');
                    game1.setDimensions({
                        w: 440,
                        h: 450
                    });
                    game1.setPosition({
                        y: 90,
                        x: 2500
                    });
                    var background = new GAMEOBJECT('game1BG', { w: 429, h: 375 }, 1, game1);
                    background.addBitmap({
                        name: 'background',
                        pos: {
                            x: 215,
                            y: 188
                        },
                        frame: 'panel1',
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        }
                    });
                    background.addBitmap({
                        name: 'background_highlight',
                        pos: {
                            x: 215,
                            y: 188
                        },
                        frame: 'panel1_highlight',
                        alpha: 0,
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("highlightSS"),
                        doReg: {
                            center: true
                        }
                    });
                    background.addBitmap({
                        name: 'dividers',
                        pos: {
                            x: 215,
                            y: 188
                        },
                        frame: 'div_game1',
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        }
                    });
                    background.addAnimation('boxReminder');
                    background.setAnimation('boxReminder', 'boxReminder', 1, 4);
                    var instruction = new GAMEOBJECT('instructions', { w: 320, h: 74 }, 1, game1);
                    instruction.addBitmap({
                        name: 'instructions',
                        pos: {
                            x: 160,
                            y: 37
                        },
                        frame: 'instructions_g1',
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        }
                    });
                    instruction.setPosition({
                        x: 20,
                        y: 360
                    });
                    this._matchG1.setInstantWin('fingers');
                    var game1Data = [
                        [1, 40, 30],
                        [2, 230, 30],
                        [3, 40, 188],
                        [4, 230, 188]
                    ];
                    var game1Highlight = [
                        [1, 27, 27],
                        [2, 214, 27],
                        [3, 27, 188],
                        [4, 214, 188]
                    ];
                    for (var i = 0; i < game1Data.length; i++) {
                        var objectData = game1Data[i];
                        var highlight1 = game1Highlight[i];
                        var prizeValue = TICKET.getInstance().getPrizeList()[TICKET.getInstance().getGame1prizes()[i]];
                        var highlight = new GAMEOBJECT('g1_highlight_' + i, { w: 186, h: 158 }, 1, game1);
                        highlight.setAlpha(0);
                        highlight.addBitmap({
                            name: 'highlight',
                            pos: {
                                x: 92,
                                y: 80
                            },
                            frame: 'highlight',
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                            doReg: {
                                center: true
                            }
                        });
                        highlight.setPosition({
                            x: highlight1[1],
                            y: highlight1[2]
                        });
                        var gameObject = new CLICKABLEGAMEOBJECT('g1_bag_' + i, { w: 160, h: 120 }, 1, game1);
                        gameObject.addBitmap({
                            name: "icon",
                            pos: {
                                x: 80,
                                y: 60
                            },
                            frame: "Bag",
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("moneyBagSS")
                        });
                        gameObject.addBitmap({
                            name: "symbol_number",
                            pos: {
                                x: 80,
                                y: 60
                            },
                            frame: TICKET.getInstance().getGame1()[i],
                            alpha: 0,
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        gameObject.setTicketLabel(TICKET.getInstance().getGame1()[i]);
                        this._matchG1.addSymbol(gameObject, "playable");
                        gameObject.setAnimation('reveal', 'iconRevealG1', 0.2, 0.5);
                        gameObject.setAnimation('winReveal', 'winRevealG1', 0.2, 0.5);
                        var self = this;
                        gameObject.setAction('click', function (gameObject) {
                            self._stopAllReminders();
                            self._updateReminders('matchG1');
                            createjs.Sound.play('game1Bag');
                            gameObject.setEnabled(false);
                            gameObject.getChildren()[1].setEnabled(false);
                            gameObject.reveal();
                            IWG.IWGEM.trigger('decClickCount', ['matchG1', gameObject]);
                        }.bind(null, gameObject));
                        gameObject.setPosition({
                            x: objectData[1],
                            y: objectData[2]
                        });
                        var prize = new CLICKABLEGAMEOBJECT('g1_prize_' + i, { w: 114, h: 38 }, 1, game1);
                        prize.setPrizeValue(prizeValue);
                        prize.addBitmap({
                            name: "word_prize",
                            pos: {
                                x: 57,
                                y: 19
                            },
                            frame: "word_prize",
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        prize.addBitmap({
                            name: "prize",
                            pos: {
                                x: 57,
                                y: 19
                            },
                            frame: "p" + prizeValue,
                            alpha: 0,
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        prize.addBitmap({
                            name: "prize_highlight",
                            pos: {
                                x: 57,
                                y: 19
                            },
                            frame: "pw" + prizeValue,
                            alpha: 0,
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        prize.setPosition({
                            x: objectData[1] + 22,
                            y: objectData[2] + 111
                        });
                        prize.setAnimation('reveal', 'prizeRevealG1', 0.2, 0.5);
                        prize.addAnimation('pulse');
                        prize.setAnimation('pulse', 'prizePulse', 0.2, 0.5);
                        prize.setAction('click', function (prize, gameObject) {
                            self._stopAllReminders();
                            self._updateReminders('matchG1');
                            createjs.Sound.play('wordPrize');
                            prize.setEnabled(false);
                            prize.getParent().setEnabled(false);
                            prize.reveal();
                            IWG.IWGEM.trigger('decClickCount', ['matchG1', gameObject]);
                        }.bind(null, prize, gameObject));
                        highlight.setParent(gameObject);
                        prize.setParent(gameObject);
                        game1.setParent(this._screens[0]);
                    }
                };
                MainLayoutDual.prototype._setupGameTwo = function () {
                    var game2 = new SCENE('game2');
                    game2.setDimensions({
                        w: 440,
                        h: 450
                    });
                    game2.setPosition({
                        x: 3000,
                        y: 90
                    });
                    var background = new GAMEOBJECT('game2BG', { w: 429, h: 375 }, 1, game2);
                    background.addBitmap({
                        name: 'background',
                        pos: {
                            x: 215,
                            y: 188
                        },
                        frame: 'panel1',
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        }
                    });
                    background.addBitmap({
                        name: 'background_highlight',
                        pos: {
                            x: 215,
                            y: 188
                        },
                        frame: 'panel1_highlight',
                        alpha: 0,
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("highlightSS"),
                        doReg: {
                            center: true
                        }
                    });
                    background.addBitmap({
                        name: 'dividers',
                        pos: {
                            x: 215,
                            y: 188
                        },
                        frame: 'div_game2',
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        }
                    });
                    background.addAnimation('boxReminder');
                    background.setAnimation('boxReminder', 'boxReminder', 1, 4);
                    var instruction = new GAMEOBJECT('game2instructions', { w: 400, h: 56 }, 1, game2);
                    instruction.addBitmap({
                        name: 'instructions',
                        pos: {
                            x: 200,
                            y: 28
                        },
                        frame: 'instructions_g2',
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        }
                    });
                    instruction.setPosition({
                        x: 20,
                        y: 380
                    });
                    var iconData = [
                        [
                            [30, 28],
                            [110, 28],
                            [190, 28]
                        ],
                        [
                            [30, 135],
                            [110, 135],
                            [190, 135]
                        ],
                        [
                            [30, 240],
                            [110, 240],
                            [190, 240]
                        ]
                    ];
                    var game2Data = [
                        [1, 29, 27.5],
                        [2, 29, 133.5],
                        [3, 29, 239.5]
                    ];
                    for (var i = 0; i < 3; i++) {
                        var gameData = game2Data[i];
                        var turnData = TICKET.getInstance().getGame2()[i];
                        var rowIcons = [turnData.b0, turnData.b1, turnData.t];
                        var iconPosition = iconData[i];
                        var equals = new EQUALS('EqualsRow' + i);
                        equals.setTotal(10);
                        var gameObject = new GAMEOBJECT('game2layout' + i, { w: 369, h: 104 }, 1, game2);
                        gameObject.setPosition({
                            x: gameData[1],
                            y: gameData[2],
                        });
                        gameObject.addBitmap({
                            name: 'row_highlight',
                            pos: {
                                x: 185,
                                y: 52
                            },
                            frame: 'highlight',
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                            doReg: {
                                center: true
                            },
                            alpha: 0
                        });
                        gameObject.addBitmap({
                            name: 'plus',
                            pos: {
                                x: 95,
                                y: 50
                            },
                            frame: 'plus',
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                            doReg: {
                                center: true
                            },
                            alpha: 1
                        });
                        gameObject.addBitmap({
                            name: 'equals',
                            pos: {
                                x: 170,
                                y: 52
                            },
                            frame: 'equals',
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                            doReg: {
                                center: true
                            },
                            alpha: 1
                        });
                        gameObject.addBitmap({
                            name: "row",
                            pos: {
                                x: 10,
                                y: 50
                            },
                            frame: "row" + (i + 1),
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        gameObject.addBitmap({
                            name: "row_text",
                            pos: {
                                x: 10,
                                y: 50
                            },
                            alpha: 0,
                            frame: "row" + (i + 1) + "h",
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        gameObject.setAnimation('winReveal', 'winHighlight', 0, 5);
                        equals.addNumber(gameObject, "highlight");
                        var prizeValue = TICKET.getInstance().getPrizeList()[turnData.prize];
                        var prize = new CLICKABLEGAMEOBJECT('g2_prize_' + i, { w: 114, h: 38 }, 1, game2);
                        prize.setPrizeValue(prizeValue);
                        equals.addNumber(prize, "prize");
                        prize.addBitmap({
                            name: "word_prize",
                            pos: {
                                x: 57,
                                y: 19
                            },
                            frame: "word_prize",
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        prize.addBitmap({
                            name: "prize",
                            pos: {
                                x: 57,
                                y: 19
                            },
                            frame: "p" + prizeValue,
                            alpha: 0,
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        prize.addBitmap({
                            name: "prize_highlight",
                            pos: {
                                x: 57,
                                y: 19
                            },
                            frame: "pw" + prizeValue,
                            alpha: 0,
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        prize.setPosition({
                            x: gameData[1] + 255,
                            y: gameData[2] + 35
                        });
                        prize.setAnimation('reveal', 'prizeReveal', 0.2, 0);
                        prize.addAnimation('pulse');
                        prize.setAnimation('pulse', 'prizePulse', 0.2, 0.5);
                        var self = this;
                        prize.setAction('click', function (prize, i) {
                            self._stopAllReminders();
                            self._updateReminders('EqualsRow' + i);
                            prize.reveal();
                            IWG.IWGEM.trigger('checkEquals', ['EqualsRow' + i]);
                            prize.setEnabled(false);
                        }.bind(this, prize, i));
                        for (var j = 0; j < 3; j++) {
                            var iconString = 'number' + rowIcons[j];
                            var frameName = "GBP";
                            var SS = "poundSS";
                            var size = 1;
                            var yPos = 50;
                            if (j === 2) {
                                frameName = "questionmark";
                                SS = "masterSS";
                                size = 1.3;
                                yPos = 53;
                            }
                            var icon = new CLICKABLEGAMEOBJECT('g2_row_' + i + "_icon_" + j, { w: 100, h: 100 }, 1, game2);
                            icon.setTicketLabel(rowIcons[j]);
                            icon.addBitmap({
                                name: "icon",
                                pos: {
                                    x: 50,
                                    y: yPos
                                },
                                frame: frameName,
                                scale: {
                                    x: size,
                                    y: size
                                },
                                doReg: {
                                    center: true
                                },
                                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet(SS)
                            });
                            icon.addBitmap({
                                name: "symbol",
                                pos: {
                                    x: 55,
                                    y: 50
                                },
                                frame: iconString,
                                alpha: 0,
                                doReg: {
                                    center: true
                                },
                                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                            });
                            icon.addBitmap({
                                name: "symbol_highlight",
                                pos: {
                                    x: 55,
                                    y: 50
                                },
                                frame: "number_win" + rowIcons[j],
                                alpha: 0,
                                doReg: {
                                    center: true
                                },
                                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                            });
                            var iconType = "number";
                            if (j === 2) {
                                iconType = "equals";
                                icon.setEnabled(false);
                            }
                            equals.addNumber(icon, iconType);
                            icon.setPosition({
                                x: iconPosition[j][0],
                                y: iconPosition[j][1]
                            });
                            icon.setAnimation('reveal', 'iconRevealG2', 0.2, 0);
                            icon.setAnimation('winReveal', 'winRevealG2', 0.2, 0.5);
                            icon.setAction('click', function (icon, i) {
                                self._stopAllReminders();
                                self._updateReminders('EqualsRow' + i);
                                icon.reveal();
                                IWG.IWGEM.trigger('checkEquals', ['EqualsRow' + i]);
                                icon.setEnabled(false);
                            }.bind(this, icon, i));
                            prize.setParent(icon);
                        }
                        game2.setParent(this._screens[0]);
                    }
                };
                MainLayoutDual.prototype._setupGameThree = function () {
                    var game3 = new SCENE('game3');
                    game3.setDimensions({
                        w: 440,
                        h: 450
                    });
                    game3.setPosition({
                        y: 90,
                        x: 50
                    });
                    var background = new GAMEOBJECT('game3BG', { w: 429, h: 375 }, 1, game3);
                    background.addBitmap({
                        name: 'background',
                        pos: {
                            x: 215,
                            y: 188
                        },
                        frame: 'panel1',
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        }
                    });
                    background.addBitmap({
                        name: 'background_highlight',
                        pos: {
                            x: 215,
                            y: 188
                        },
                        alpha: 0,
                        frame: 'panel1_highlight',
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("highlightSS"),
                        doReg: {
                            center: true
                        }
                    });
                    background.addBitmap({
                        name: 'dividers',
                        pos: {
                            x: 215,
                            y: 188
                        },
                        frame: 'div_game4',
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        }
                    });
                    background.addAnimation('boxReminder');
                    background.setAnimation('boxReminder', 'boxReminder', 1, 4);
                    var instruction = new GAMEOBJECT('game3instructions', { w: 400, h: 56 }, 1, game3);
                    instruction.addBitmap({
                        name: 'instructions',
                        pos: {
                            x: 200,
                            y: 28
                        },
                        frame: 'instructions_g3',
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        }
                    });
                    instruction.setPosition({
                        x: 0,
                        y: 370
                    });
                    var game3yt = new GAMEOBJECT('game3yours', { w: 300, h: 22 }, 3, game3);
                    game3yt.addBitmap({
                        name: 'yoursText',
                        pos: {
                            x: 100 - 32,
                            y: 11
                        },
                        frame: 'yours',
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        }
                    });
                    game3yt.addBitmap({
                        name: 'theirsText',
                        pos: {
                            x: 167,
                            y: 11
                        },
                        frame: 'theirs',
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        }
                    });
                    game3yt.setPosition({
                        x: 45,
                        y: 26
                    });
                    var rowData = [
                        [28, 28],
                        [28, 134],
                        [28, 240]
                    ];
                    var iconData = [
                        [
                            [60, 50],
                            [160, 50]
                        ],
                        [
                            [60, 160],
                            [160, 160]
                        ],
                        [
                            [60, 250],
                            [160, 250]
                        ]
                    ];
                    for (var i = 0; i < 3; i++) {
                        var turnData = TICKET.getInstance().getGame3()[i];
                        var rowIcons = [turnData.y, turnData.t];
                        var rowPositions = rowData[i];
                        var iconPosition = iconData[i];
                        var compare = new COMPARE('game3row' + i);
                        var layout = new GAMEOBJECT('g3_layout' + i, { w: 370, h: 104 }, 1, game3);
                        layout.addBitmap({
                            name: "row_highlight",
                            pos: {
                                x: 185,
                                y: 50
                            },
                            frame: "highlight",
                            alpha: 0,
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        layout.addBitmap({
                            name: "row",
                            pos: {
                                x: 10,
                                y: 54
                            },
                            frame: "row" + (i + 1),
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        layout.addBitmap({
                            name: "row_text",
                            pos: {
                                x: 10,
                                y: 54
                            },
                            alpha: 0,
                            frame: "row" + (i + 1) + "h",
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        layout.setAnimation('winReveal', 'winRevealG3', 0.2, 0.5);
                        compare.addSymbol(layout, 'background');
                        layout.setPosition({
                            x: rowPositions[0],
                            y: rowPositions[1]
                        });
                        for (var j = 0; j < 2; j++) {
                            var diamond = new CLICKABLEGAMEOBJECT('g3_row_' + i + "_icon_" + j, { w: 100, h: 100 }, 1, game3);
                            diamond.setTicketLabel(rowIcons[j]);
                            diamond.addBitmap({
                                name: "icon",
                                pos: {
                                    x: 50,
                                    y: 50
                                },
                                frame: "Diamond",
                                doReg: {
                                    center: true
                                },
                                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("diamondSS")
                            });
                            diamond.addBitmap({
                                name: "symbol_number",
                                pos: {
                                    x: 50,
                                    y: 50
                                },
                                alpha: 0,
                                frame: "w" + rowIcons[j],
                                doReg: {
                                    center: true
                                },
                                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                            });
                            diamond.addBitmap({
                                name: "symbol_highlight",
                                pos: {
                                    x: 50,
                                    y: 50
                                },
                                alpha: 0,
                                frame: "w" + rowIcons[j] + "g",
                                doReg: {
                                    center: true
                                },
                                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                            });
                            var x = 60;
                            if (j === 1) {
                                x = 160;
                            }
                            diamond.setPosition({
                                x: x,
                                y: rowData[i][1] + 5
                            });
                            diamond.setAnimation('reveal', 'iconRevealG3', 0.2, 0.5, 'Diamond');
                            diamond.setAnimation('winReveal', 'yoursWinG3', 0.2, 0.5);
                            var self = this;
                            diamond.setAction('click', function (diamond, i) {
                                self._stopAllReminders();
                                self._updateReminders('game3row' + i);
                                diamond.reveal();
                                IWG.IWGEM.trigger('checkCompare', ['game3row' + i]);
                                diamond.setEnabled(false);
                            }.bind(this, diamond, i));
                            var whichIcon = null;
                            if (j === 0) {
                                whichIcon = "yours";
                            }
                            else {
                                whichIcon = "theirs";
                            }
                            compare.addSymbol(diamond, whichIcon);
                        }
                        var prizeValue = TICKET.getInstance().getPrizeList()[turnData.prize];
                        var prize = new CLICKABLEGAMEOBJECT('g3_prize_' + i, { w: 114, h: 38 }, 1, game3);
                        prize.setPrizeValue(prizeValue);
                        prize.setTicketLabel('prizeValue');
                        prize.addBitmap({
                            name: "word_prize",
                            pos: {
                                x: 57,
                                y: 19
                            },
                            frame: "word_prize",
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        prize.addBitmap({
                            name: "prize",
                            pos: {
                                x: 57,
                                y: 19
                            },
                            frame: "p" + prizeValue,
                            alpha: 0,
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        prize.addBitmap({
                            name: "prize_highlight",
                            pos: {
                                x: 57,
                                y: 19
                            },
                            frame: "pw" + prizeValue,
                            alpha: 0,
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        prize.setPosition({
                            x: rowPositions[0] + 245,
                            y: rowPositions[1] + 40
                        });
                        prize.setAnimation('reveal', 'prizeReveal', 0.2, 0.5);
                        prize.setAnimation('winReveal', 'prizeRevealG3', 0.2, 0.5);
                        prize.addAnimation('pulse');
                        prize.setAnimation('pulse', 'prizePulse', 0.2, 0.5);
                        prize.setAction('click', function (prize, i) {
                            self._stopAllReminders();
                            self._updateReminders('game3row' + i);
                            prize.reveal();
                            IWG.IWGEM.trigger('checkCompare', ['game3row' + i]);
                            prize.setEnabled(false);
                        }.bind(this, prize, i));
                        compare.addSymbol(prize, "prize");
                    }
                    game3.setParent(this._screens[1]);
                };
                MainLayoutDual.prototype._setupGameFour = function () {
                    var game4 = new SCENE('game4');
                    game4.setDimensions({
                        w: 440,
                        h: 450
                    });
                    game4.setPosition({
                        x: 510,
                        y: 90
                    });
                    var background = new GAMEOBJECT('game4BG', { w: 429, h: 375 }, 1, game4);
                    background.addBitmap({
                        name: 'background',
                        pos: {
                            x: 215,
                            y: 188
                        },
                        frame: 'panel1',
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        }
                    });
                    background.addBitmap({
                        name: 'background_highlight',
                        pos: {
                            x: 215,
                            y: 188
                        },
                        frame: 'panel1_highlight',
                        alpha: 0,
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("highlightSS"),
                        doReg: {
                            center: true
                        }
                    });
                    background.addBitmap({
                        name: 'dividers',
                        pos: {
                            x: 215,
                            y: 188
                        },
                        frame: 'div_game4',
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        }
                    });
                    background.addAnimation('boxReminder');
                    background.setAnimation('boxReminder', 'boxReminder', 1, 4);
                    var instruction = new GAMEOBJECT('game4instructions', { w: 400, h: 56 }, 1, game4);
                    instruction.addBitmap({
                        name: 'instructions',
                        pos: {
                            x: 200,
                            y: 28
                        },
                        frame: 'instructions_g4',
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        }
                    });
                    instruction.setPosition({
                        x: 0,
                        y: 370
                    });
                    var rowData = [
                        [28, 28],
                        [28, 134],
                        [28, 240]
                    ];
                    var iconData = [
                        [
                            [50, 10],
                            [150, 10]
                        ],
                        [
                            [50, 120],
                            [150, 120]
                        ],
                        [
                            [50, 225],
                            [150, 225]
                        ]
                    ];
                    for (var i = 0; i < 3; i++) {
                        var turnData = TICKET.getInstance().getGame4()[i];
                        var rowIcons = [turnData.v0, turnData.v1];
                        var rowPositions = rowData[i];
                        var iconPosition = iconData[i];
                        var match = new MATCH('matchG4row' + i, "match2");
                        var layout = new GAMEOBJECT('g4_layout' + i, { w: 370, h: 104 }, 1, game4);
                        layout.addBitmap({
                            name: "row_highlight",
                            pos: {
                                x: 185,
                                y: 50
                            },
                            frame: "highlight",
                            alpha: 0,
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        layout.addBitmap({
                            name: "row",
                            pos: {
                                x: 10,
                                y: 52
                            },
                            frame: "row" + (i + 1),
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        layout.addBitmap({
                            name: "row_text",
                            pos: {
                                x: 10,
                                y: 52
                            },
                            alpha: 0,
                            frame: "row" + (i + 1) + "h",
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        layout.setPosition({
                            x: rowPositions[0],
                            y: rowPositions[1]
                        });
                        layout.setAnimation('winReveal', 'winRevealG4', 0.2, 0.5);
                        match.addBackground(layout);
                        for (var j = 0; j < 2; j++) {
                            var moneyClip = new CLICKABLEGAMEOBJECT('g4_row_' + i + "_icon_" + j, { w: 150, h: 150 }, 1, game4);
                            moneyClip.addBitmap({
                                name: "icon",
                                pos: {
                                    x: 75,
                                    y: 75
                                },
                                frame: "Money_Clip",
                                doReg: {
                                    center: true
                                },
                                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("moneyClipSS")
                            });
                            moneyClip.addBitmap({
                                name: "symbol_number",
                                pos: {
                                    x: 70,
                                    y: 69
                                },
                                alpha: 0,
                                frame: rowIcons[j],
                                doReg: {
                                    center: true
                                },
                                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                            });
                            moneyClip.setPosition({
                                x: iconPosition[j][0],
                                y: iconPosition[j][1]
                            });
                            moneyClip.setTicketLabel(rowIcons[j]);
                            moneyClip.setAnimation('reveal', 'iconRevealG4', 0.2, 0.5);
                            var self = this;
                            moneyClip.setAction('click', function (moneyClip, i) {
                                self._stopAllReminders();
                                self._updateReminders('matchG4row' + i);
                                moneyClip.setEnabled(false);
                                moneyClip.reveal();
                                IWG.IWGEM.trigger('decClickCount', ['matchG4row' + i, moneyClip]);
                            }.bind(this, moneyClip, i));
                            match.addSymbol(moneyClip, "playableSymbol");
                        }
                        var prizeValue = TICKET.getInstance().getPrizeList()[turnData.prize];
                        var prize = new CLICKABLEGAMEOBJECT('g4_prize_' + i, { w: 114, h: 38 }, 1, game4);
                        prize.setPrizeValue(prizeValue);
                        prize.addBitmap({
                            name: "word_prize",
                            pos: {
                                x: 57,
                                y: 19
                            },
                            frame: "word_prize",
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        prize.addBitmap({
                            name: "prize",
                            pos: {
                                x: 57,
                                y: 19
                            },
                            frame: "p" + prizeValue,
                            alpha: 0,
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        prize.addBitmap({
                            name: "prize_highlight",
                            pos: {
                                x: 57,
                                y: 19
                            },
                            frame: "pw" + prizeValue,
                            alpha: 0,
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        prize.setPosition({
                            x: rowPositions[0] + 255,
                            y: rowPositions[1] + 40
                        });
                        match.addSymbol(prize, "winning");
                        prize.setAnimation('reveal', 'prizeReveal', 0.2, 0.5);
                        prize.setAnimation('winReveal', 'prizeRevealG4', 0.2, 0.5);
                        prize.addAnimation('pulse');
                        prize.setAnimation('pulse', 'prizePulse', 0.2, 0.5);
                        prize.setAction('click', function (prize, i) {
                            self._stopAllReminders();
                            self._updateReminders('matchG4row' + i);
                            createjs.Sound.play('wordPrize');
                            prize.setEnabled(false);
                            prize.reveal();
                            IWG.IWGEM.trigger('decClickCount', ['matchG4row' + i, prize]);
                        }.bind(this, prize, i));
                    }
                    game4.setParent(this._screens[1]);
                };
                MainLayoutDual.prototype._setupGameFive = function () {
                    var game5 = new SCENE('game5');
                    game5.setDimensions({
                        w: 860,
                        h: 450
                    });
                    game5.setPosition({
                        x: 50,
                        y: 90
                    });
                    var background = new GAMEOBJECT('game5BG', { w: 856, h: 375 }, 1, game5);
                    background.addBitmap({
                        name: 'background',
                        pos: {
                            x: 428,
                            y: 188
                        },
                        frame: 'panel2',
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        }
                    });
                    background.addBitmap({
                        name: 'background_highlight',
                        pos: {
                            x: 428,
                            y: 188
                        },
                        frame: 'panel2_highlight',
                        alpha: 0,
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("highlightSS"),
                        doReg: {
                            center: true
                        }
                    });
                    background.addBitmap({
                        name: 'divider',
                        pos: {
                            x: 255,
                            y: 188
                        },
                        frame: 'div_game5',
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        }
                    });
                    background.addAnimation('boxReminder');
                    var winningSymbolsText = new GAMEOBJECT('g5_winning_symbols_text', { w: 177, h: 22 }, 2, game5);
                    winningSymbolsText.addBitmap({
                        name: "winningSymbolsText",
                        pos: {
                            x: 88,
                            y: 11
                        },
                        frame: "winningsymbols",
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                    });
                    winningSymbolsText.setPosition({
                        x: 50,
                        y: 30
                    });
                    var yourSymbolsText = new GAMEOBJECT('g5_your_symbols_text', { w: 148, h: 22 }, 2, game5);
                    yourSymbolsText.addBitmap({
                        name: "yourSymbolsText",
                        pos: {
                            x: 74,
                            y: 11
                        },
                        frame: "yoursymbols",
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                    });
                    yourSymbolsText.setPosition({
                        x: 467,
                        y: 30
                    });
                    var instruction = new GAMEOBJECT('game5instructions', { w: 772, h: 56 }, 1, game5);
                    instruction.addBitmap({
                        name: 'instructions',
                        pos: {
                            x: 386,
                            y: 28
                        },
                        frame: 'instructions_g5',
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        }
                    });
                    instruction.setPosition({
                        x: 10,
                        y: 370
                    });
                    var coinPos = [
                        [70, 40],
                        [70, 190]
                    ];
                    for (var i = 0; i < 2; i++) {
                        var position = coinPos[i];
                        var highlightPos = [28, 187];
                        var highlight = new GAMEOBJECT('g5_highlight' + i, { w: 223, h: 157 }, 1, game5);
                        highlight.addBitmap({
                            name: "row_highlight",
                            pos: {
                                x: 110,
                                y: 77
                            },
                            frame: "highlight",
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        highlight.setAlpha(0);
                        highlight.setPosition({
                            x: 30,
                            y: highlightPos[i]
                        });
                        var winningSymbol = new CLICKABLEGAMEOBJECT('g5_winning_symbol_' + i, { w: 140, h: 140 }, 1, game5);
                        winningSymbol.addBitmap({
                            name: "icon",
                            pos: {
                                x: 75,
                                y: 70
                            },
                            frame: "Coin",
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("coinSS")
                        });
                        winningSymbol.addBitmap({
                            name: "symbol_number",
                            pos: {
                                x: 70,
                                y: 70
                            },
                            frame: TICKET.getInstance().getGame5winning()[i],
                            alpha: 0,
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        winningSymbol.setTicketLabel(TICKET.getInstance().getGame5winning()[i]);
                        winningSymbol.setPosition({
                            x: position[0],
                            y: position[1]
                        });
                        winningSymbol.setAnimation('reveal', 'iconReveal', 0.2, 0.5, 'Coin');
                        winningSymbol.setAnimation('winReveal', 'winRevealPrizeG5', 0.2, 0.5);
                        var self = this;
                        winningSymbol.setAction('click', function (winningSymbol) {
                            self._stopAllReminders();
                            self._updateReminders('matchG5');
                            createjs.Sound.play('game5Coin');
                            winningSymbol.setEnabled(false);
                            winningSymbol.reveal();
                            IWG.IWGEM.trigger('decClickCount', ['matchG5', winningSymbol]);
                        }.bind(this, winningSymbol));
                        highlight.setParent(winningSymbol);
                        this._matchG5.addSymbol(winningSymbol, "winning");
                    }
                    background.setAnimation('boxReminder', 'boxReminder', 1, 4, this._matchG5);
                    var symbolPos = [
                        [275, 40],
                        [415, 40],
                        [560, 40],
                        [702.5, 40],
                        [275, 195],
                        [415, 195],
                        [560, 195],
                        [702.5, 195]
                    ];
                    var highlightData = [
                        [256, 28],
                        [398.5, 28],
                        [540, 28],
                        [682, 28],
                        [256, 187],
                        [398.5, 187],
                        [540, 187],
                        [682, 187]
                    ];
                    for (var i = 0; i < symbolPos.length; i++) {
                        var position = symbolPos[i];
                        var highlightPos = highlightData[i];
                        var highlight = new GAMEOBJECT('g5_highlight_yours_' + i, { w: 141, h: 157 }, 1, game5);
                        highlight.addBitmap({
                            name: "row_highlight",
                            pos: {
                                x: 110,
                                y: 70
                            },
                            frame: "highlight",
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        highlight.setAlpha(0);
                        highlight.setPosition({
                            x: highlightPos[0],
                            y: highlightPos[1]
                        });
                        var yourSymbol = new CLICKABLEGAMEOBJECT('g5_your_symbol_' + i, { w: 110, h: 110 }, 2, game5);
                        yourSymbol.addBitmap({
                            name: "icon",
                            pos: {
                                x: 55,
                                y: 55
                            },
                            frame: "Cash_Wad",
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("cashWadSS")
                        });
                        yourSymbol.addBitmap({
                            name: "symbol_number",
                            pos: {
                                x: 50,
                                y: 58
                            },
                            frame: TICKET.getInstance().getGame5()[i],
                            alpha: 0,
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        yourSymbol.setTicketLabel(TICKET.getInstance().getGame5()[i]);
                        yourSymbol.setPosition({
                            x: position[0],
                            y: position[1]
                        });
                        yourSymbol.setAnimation('reveal', 'iconReveal', 0.2, 0.5, 'Cash_Wad');
                        yourSymbol.setAnimation('winReveal', 'winRevealG5', 0.2, 0.5);
                        yourSymbol.setAction('click', function (yourSymbol) {
                            self._stopAllReminders();
                            self._updateReminders('matchG5');
                            createjs.Sound.play('game5Cash');
                            yourSymbol.setEnabled(false);
                            yourSymbol.getChildren()[1].setEnabled(false);
                            yourSymbol.reveal();
                            IWG.IWGEM.trigger('decClickCount', ['matchG5', yourSymbol]);
                        }.bind(this, yourSymbol));
                        this._matchG5.addSymbol(yourSymbol, "playable");
                        var prizeValue = TICKET.getInstance().getPrizeList()[TICKET.getInstance().getGame5prizes()[i]];
                        var prize = new CLICKABLEGAMEOBJECT('g5_prize_' + i, { w: 114, h: 38 }, 2, game5);
                        prize.setPrizeValue(prizeValue);
                        prize.addBitmap({
                            name: "word_prize",
                            pos: {
                                x: 57,
                                y: 19
                            },
                            frame: "word_prize",
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        prize.addBitmap({
                            name: "prize",
                            pos: {
                                x: 57,
                                y: 19
                            },
                            frame: "p" + prizeValue,
                            alpha: 0,
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        prize.addBitmap({
                            name: "prize_highlight",
                            pos: {
                                x: 57,
                                y: 19
                            },
                            frame: "pw" + prizeValue,
                            alpha: 0,
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        prize.setPosition({
                            x: position[0] - 5,
                            y: position[1] + 110
                        });
                        prize.setAnimation('reveal', 'prizeReveal', 0.2, 0.5);
                        prize.addAnimation('pulse');
                        prize.setAnimation('pulse', 'prizePulse', 0.2, 0.5);
                        prize.setAction('click', function (prize) {
                            self._stopAllReminders();
                            self._updateReminders('matchG5');
                            createjs.Sound.play('wordPrize');
                            prize.setEnabled(false);
                            prize.getParent().setEnabled(false);
                            prize.reveal();
                        }.bind(this, prize));
                        highlight.setParent(yourSymbol);
                        prize.setParent(yourSymbol);
                    }
                    game5.setParent(this._screens[2]);
                };
                MainLayoutDual.prototype._setupSlide = function () {
                    var slide = new SLIDE();
                    for (var index = 0; index < this._screens.length; index++) {
                        var element = this._screens[index];
                        slide.addScene(element);
                    }
                    slide.setup();
                    GLOBAL.getInstance().addToGlobal('slide', slide);
                };
                MainLayoutDual.prototype._setupEndgame = function () {
                    var endGame = new ENDGAMEDUAL("endGameDual");
                    endGame.setDimensions({
                        w: 855,
                        h: 200
                    });
                    endGame.setPosition({
                        x: 480 - 428,
                        y: -200
                    });
                    endGame.setZindex("11");
                    endGame.setAlpha(1);
                };
                MainLayoutDual.prototype._checkFinished = function (name) {
                    // see _updateReminders
                };
                MainLayoutDual.prototype._updateReminders = function (name) {
                    var _this = this;
                    if (name === "matchG1") {
                        this._gameReminders[0]--;
                    }
                    else if (name.indexOf('EqualsRow') >= 0) {
                        this._gameReminders[1]--;
                    }
                    else if (name.indexOf('game3row') >= 0) {
                        this._gameReminders[2]--;
                    }
                    else if (name.indexOf('matchG4row') >= 0) {
                        this._gameReminders[3]--;
                    }
                    else if (name.indexOf('matchG5') >= 0) {
                        this._gameReminders[4]--;
                    }
                    if (iwg.Helper.allValuesSame(this._gameReminders)) {
                        if (this._gameReminders[0] === 0) {
                            IWG.IWGEM.trigger('showEndGame');
                        }
                    }
                    TweenMax.delayedCall(5, function () {
                        _this._startAllReminders();
                    });
                };
                MainLayoutDual.prototype._startAllReminders = function () {
                    for (var i = 0; i < this._gameReminders.length; i++) {
                        var reminders = this._gameReminders[i];
                        if (reminders > 0) {
                            this._startReminder(this._gameBgNames[i]);
                        }
                    }
                };
                MainLayoutDual.prototype._stopAllReminders = function () {
                    for (var i = 0; i < this._gameBgNames.length; i++) {
                        this._stopReminder(this._gameBgNames[i]);
                        if (this._gameBgNames[i] == "game5BG") {
                            var winningSymbols = this._matchG5.getWinningSymbols();
                            ;
                            for (var j = 0; j < winningSymbols.length; j++) {
                                var coin = winningSymbols[j];
                                if (!coin.getRevealed()) {
                                    coin.active = true;
                                    var coinSpin = coin.getBitmap("icon");
                                    coinSpin.gotoAndStop('CoinHalf');
                                }
                            }
                        }
                    }
                };
                MainLayoutDual.prototype._startReminder = function (name) {
                    HELPER.getGameObject(name).animate('boxReminder');
                };
                MainLayoutDual.prototype._stopReminder = function (name) {
                    HELPER.getGameObject(name).animationTimeLine.seek(0);
                    HELPER.getGameObject(name).animationTimeLine.pause();
                };
                MainLayoutDual.prototype._gameIntro = function () {
                    var _this = this;
                    var game1 = iwg.Helper.getScene('game1');
                    var game2 = iwg.Helper.getScene('game2');
                    var timeline = new TimelineLite({
                        onComplete: function () {
                            IWG.IWGEM.trigger('slidesShowArrow', ["right"]);
                            _this._startAllReminders();
                        }
                    });
                    timeline.to(game1.getDiv(), 1, { x: 35 })
                        .to(game2.getDiv(), 1, { x: 505 }, '-=0.7');
                };
                return MainLayoutDual;
            })();
            iwg.MainLayoutDual = MainLayoutDual;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
