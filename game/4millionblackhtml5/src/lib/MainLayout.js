/// <reference path="../imports/js/Sideplay.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GLOBAL = IWG.Global, GAMEOBJECT = IWG.GameObject, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, SPRITESHEETS = IWG.SpriteSheets, ANIMATION = IWG.Animation, SOUND = IWG.Sound, SCENE = IWG.Scene, SCALE = IWG.Scale, PAUSE = IWG.Pause, SPLASH = IWG.Splash, MATCH = IWG.Match, TICKET = IWG.Ticket, ENDGAME = IWG.EndGame, EQUALS = IWG.Equals, COMPARE = IWG.Compare, HELPER = IWG.Helper;
            var MainLayout = (function () {
                function MainLayout() {
                    this._matchG1 = new MATCH('matchG1', "match");
                    this._matchG5 = new MATCH('matchG5', "match");
                    this._gameReminders = [4, 3, 3, 3, 10];
                    this._gameBgNames = ["panel_g1", "panel_g2", "panel_g3", "panel_g4", "panel_g5"];
                    this._subscribe();
                    this._init();
                    this._setupSplash();
                    this._setupEndgame();
                }
                MainLayout.prototype._subscribe = function () {
                    IWG.IWGEM.on('mainGameIntro', this._mainGameSetup.bind(this));
                    IWG.IWGEM.on('stopBoxReminder', this._stopAllReminders.bind(this));
                    IWG.IWGEM.on('restartBoxReminder', this._startAllReminders.bind(this));
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
                    sound.setPosition({ x: 880, y: 595 });
                    var logo = new GAMEOBJECT('mainLogo', { w: 342, h: 228 });
                    logo.addBitmap({
                        name: "bg",
                        pos: {
                            x: 0,
                            y: 0
                        },
                        frame: "burst_game",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                    });
                    logo.addBitmap({
                        name: 'mainLogo',
                        pos: {
                            x: 44,
                            y: 45
                        },
                        frame: 'winupto_game',
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                    });
                    logo.setPosition({
                        x: 450 - 140,
                        y: 0
                    });
                };
                MainLayout.prototype._setupSplash = function () {
                    var splash = new SPLASH("splash");
                    splash.setDimensions({
                        w: 700,
                        h: 500
                    });
                    splash.setZindex("6");
                };
                MainLayout.prototype._mainGameSetup = function () {
                    this._setupGameOne();
                    this._setupGameTwo();
                    this._setupGameThree();
                    this._setupGameFour();
                    this._setupGameFive();
                    this._intro();
                    this._startAllReminders();
                };
                MainLayout.prototype._setupGameOne = function () {
                    var game1Scene = new SCENE('game1Scene');
                    game1Scene.setDimensions({
                        w: 320,
                        h: 330
                    });
                    game1Scene.setPosition({
                        x: 45,
                        y: 10
                    });
                    game1Scene.setZindex(1);
                    game1Scene.setAlpha(0);
                    var panel = new GAMEOBJECT('panel_g1', { w: 316, h: 276 }, 1, game1Scene);
                    panel.addBitmap({
                        name: "panel_g1",
                        pos: {
                            x: 158,
                            y: 138
                        },
                        frame: "panel1",
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                    });
                    panel.addBitmap({
                        name: "divider_g1",
                        pos: {
                            x: 158,
                            y: 138
                        },
                        frame: "divs_game1",
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                    });
                    panel.addBitmap({
                        name: "background_highlight",
                        pos: {
                            x: 158,
                            y: 138
                        },
                        alpha: 0,
                        frame: "box1_highlight",
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("highlightSS")
                    });
                    panel.addAnimation('boxReminder');
                    panel.setAnimation('boxReminder', 'boxReminder', 1, 4);
                    var instructions = new GAMEOBJECT('instructions_g1', { w: 236, h: 56 }, 1, game1Scene);
                    instructions.addBitmap({
                        name: "instructions_g1",
                        pos: {
                            x: 118,
                            y: 28
                        },
                        frame: "instructions_game1",
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                    });
                    instructions.setPosition({
                        x: 0,
                        y: 265
                    });
                    this._matchG1.setInstantWin('fingers');
                    var highlightData = [
                        [19, 21],
                        [157, 21],
                        [19, 137],
                        [157, 137]
                    ];
                    var bagData = [
                        [40, 15],
                        [175, 15],
                        [40, 130],
                        [175, 130]
                    ];
                    for (var i = 0; i < bagData.length; i++) {
                        var highlightPos = highlightData[i];
                        var positions = bagData[i];
                        var prizeValue = TICKET.getInstance().getPrizeList()[TICKET.getInstance().getGame1prizes()[i]];
                        var highlight = new GAMEOBJECT('g1_highlight_' + i, { w: 137, h: 115 }, 1, game1Scene);
                        highlight.addBitmap({
                            name: "highlight",
                            pos: {
                                x: 70,
                                y: 44
                            },
                            frame: "highlight",
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        highlight.setPosition({
                            x: highlightPos[0],
                            y: highlightPos[1]
                        });
                        highlight.setAlpha(0);
                        var bag = new CLICKABLEGAMEOBJECT('g1_bag_' + i, { w: 100, h: 100 }, 1, game1Scene);
                        bag.setZindex(3);
                        bag.addBitmap({
                            name: "icon",
                            pos: {
                                x: 55,
                                y: 50
                            },
                            frame: "Bag",
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("moneyBagSS")
                        });
                        bag.addBitmap({
                            name: "symbol_number",
                            pos: {
                                x: 50,
                                y: 50
                            },
                            frame: TICKET.getInstance().getGame1()[i],
                            alpha: 0,
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        bag.setTicketLabel(TICKET.getInstance().getGame1()[i]);
                        this._matchG1.addSymbol(bag, "playable");
                        bag.setPosition({
                            x: positions[0],
                            y: positions[1]
                        });
                        bag.setAnimation('reveal', 'iconRevealG1', 0.2, 0.5);
                        bag.setAnimation('winReveal', 'winRevealG1', 0.2, 0.5);
                        var self = this;
                        bag.setAction('click', function (bag) {
                            self._stopAllReminders();
                            self._updateReminders('matchG1');
                            createjs.Sound.play('game1Bag');
                            bag.setEnabled(false);
                            bag.reveal();
                            IWG.IWGEM.trigger('decClickCount', ['matchG1', bag]);
                        }.bind(null, bag));
                        var flare = new GAMEOBJECT('g1_flare_' + i, { w: 137, h: 113 }, 1, game1Scene);
                        flare.addBitmap({
                            name: "flare",
                            pos: {
                                x: 0,
                                y: 0
                            },
                            frame: "flare",
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("flareSS")
                        });
                        flare.active = true;
                        flare.setPosition({
                            x: positions[0],
                            y: positions[1]
                        });
                        flare.setZindex(2);
                        bag.setParent(flare);
                        var prize = new CLICKABLEGAMEOBJECT('g1_prize_' + i, { w: 92, h: 36 }, 1, game1Scene);
                        prize.setZindex(3);
                        prize.setPrizeValue(prizeValue);
                        prize.addBitmap({
                            name: "word_prize",
                            pos: {
                                x: 46,
                                y: 18
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
                                x: 46,
                                y: 18
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
                                x: 46,
                                y: 18
                            },
                            frame: "pw" + prizeValue,
                            alpha: 0,
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        prize.setPosition({
                            x: positions[0] + 5,
                            y: positions[1] + 85
                        });
                        prize.setAnimation('reveal', 'prizeRevealG1', 0.2, 0.5);
                        prize.addAnimation('pulse');
                        prize.setAnimation('pulse', 'prizePulse', 0.2, 0.5);
                        prize.setAction('click', function (prize, gameObject) {
                            self._stopAllReminders();
                            self._updateReminders('matchG1');
                            prize.setEnabled(false);
                            prize.reveal();
                            prize.killReminder();
                            IWG.IWGEM.trigger('decClickCount', ['matchG1', gameObject]);
                        }.bind(null, prize, bag));
                        highlight.setParent(bag);
                        prize.setParent(bag);
                    }
                };
                MainLayout.prototype._setupGameTwo = function () {
                    var game2Scene = new SCENE('game2Scene');
                    game2Scene.setDimensions({
                        w: 320,
                        h: 330
                    });
                    game2Scene.setPosition({
                        x: 600,
                        y: 10
                    });
                    game2Scene.setZindex(1);
                    game2Scene.setAlpha(0);
                    var panel = new GAMEOBJECT('panel_g2', { w: 316, h: 276 }, 1, game2Scene);
                    panel.addBitmap({
                        name: "panel_g2",
                        pos: {
                            x: 158,
                            y: 138
                        },
                        frame: "panel1",
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                    });
                    panel.addBitmap({
                        name: "divider_g2",
                        pos: {
                            x: 158,
                            y: 138
                        },
                        frame: "divs_game2",
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                    });
                    panel.addBitmap({
                        name: "background_highlight",
                        pos: {
                            x: 158,
                            y: 138
                        },
                        alpha: 0,
                        frame: "box1_highlight",
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("highlightSS")
                    });
                    panel.addAnimation('boxReminder');
                    panel.setAnimation('boxReminder', 'boxReminder', 1, 4);
                    var instructions = new GAMEOBJECT('instructions_g2', { w: 296, h: 52 }, 1, game2Scene);
                    instructions.addBitmap({
                        name: "instructions_g2",
                        pos: {
                            x: 148,
                            y: 26
                        },
                        frame: "instructions_game2",
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                    });
                    instructions.setPosition({
                        x: 0,
                        y: 270
                    });
                    var rowData = [
                        [20, 20],
                        [20, 98],
                        [20, 176]
                    ];
                    var iconData = [
                        [
                            [25, 20],
                            [80, 20],
                            [140, 20]
                        ],
                        [
                            [25, 100],
                            [80, 100],
                            [140, 100]
                        ],
                        [
                            [25, 175],
                            [80, 175],
                            [140, 175]
                        ]
                    ];
                    var symbolData = [
                        [39, 93, 149],
                        [39, 93, 149],
                        [39, 93, 149]
                    ];
                    for (var i = 0; i < 3; i++) {
                        var turnData = TICKET.getInstance().getGame2()[i];
                        var rowIcons = [turnData.b0, turnData.b1, turnData.t];
                        var rowPositions = rowData[i];
                        var iconPosition = iconData[i];
                        var symbolPosition = symbolData[i];
                        var equals = new EQUALS('EqualsRow' + i);
                        equals.setTotal(10);
                        var layout = new GAMEOBJECT('g2_layout' + i, { w: 273, h: 76 }, 1, game2Scene);
                        layout.addBitmap({
                            name: "row_highlight",
                            pos: {
                                x: 136,
                                y: 38
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
                                y: 38
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
                                y: 38
                            },
                            alpha: 0,
                            frame: "row" + (i + 1) + "h",
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        layout.addBitmap({
                            name: "plus_equals",
                            pos: {
                                x: 97,
                                y: 38
                            },
                            frame: "plusequals",
                            alpha: 1,
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        layout.setPosition({
                            x: rowPositions[0],
                            y: rowPositions[1]
                        });
                        layout.setAnimation('winReveal', 'winHighlight', 0, 5);
                        equals.addNumber(layout, "highlight");
                        var prizeValue = TICKET.getInstance().getPrizeList()[turnData.prize];
                        var prize = new CLICKABLEGAMEOBJECT('g2_prize_' + i, { w: 92, h: 36 }, 1, game2Scene);
                        prize.setZindex(3);
                        prize.setPrizeValue(prizeValue);
                        equals.addNumber(prize, "prize");
                        prize.addBitmap({
                            name: "word_prize",
                            pos: {
                                x: 46,
                                y: 18
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
                                x: 46,
                                y: 18
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
                                x: 46,
                                y: 18
                            },
                            frame: "pw" + prizeValue,
                            alpha: 0,
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        prize.setPosition({
                            x: rowPositions[0] + 185,
                            y: rowPositions[1] + 20
                        });
                        prize.setAnimation('reveal', 'prizeReveal', 0.2, 0.5);
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
                            if (j === 2) {
                                frameName = "questionmark";
                                SS = "masterSS";
                                size = 1.1;
                            }
                            var icon = new CLICKABLEGAMEOBJECT('g2_row_' + i + "_icon_" + j, { w: 76, h: 76 }, 1, game2Scene);
                            icon.setZindex(3);
                            icon.setTicketLabel(rowIcons[j]);
                            icon.addBitmap({
                                name: "icon",
                                pos: {
                                    x: 34,
                                    y: 38
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
                                    x: 38,
                                    y: 38
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
                                    x: 38,
                                    y: 38
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
                            icon.setAnimation('reveal', 'iconRevealG2', 0.2, 0.5);
                            icon.setAnimation('winReveal', 'winRevealG2', 0.2, 0.5);
                            icon.setAction('click', function (icon, i) {
                                self._stopAllReminders();
                                self._updateReminders('EqualsRow' + i);
                                icon.reveal();
                                IWG.IWGEM.trigger('checkEquals', ['EqualsRow' + i]);
                                icon.setEnabled(false);
                            }.bind(null, icon, i));
                            prize.setParent(icon);
                            if (j !== 2) {
                                var flare = new GAMEOBJECT('g2_flare_' + i + "_" + j, { w: 100, h: 100 }, 1, game2Scene);
                                flare.addBitmap({
                                    name: "flare",
                                    pos: {
                                        x: 0,
                                        y: 0
                                    },
                                    frame: "flare",
                                    doReg: {
                                        center: true
                                    },
                                    spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("flareSS")
                                });
                                flare.active = true;
                                flare.setPosition({
                                    x: iconPosition[j][0] - 10,
                                    y: iconPosition[j][1] - 10
                                });
                                flare.setZindex(1);
                                icon.setParent(flare);
                            }
                        }
                    }
                };
                MainLayout.prototype._setupGameThree = function () {
                    var game3Scene = new SCENE('game3Scene');
                    game3Scene.setDimensions({
                        w: 290,
                        h: 330
                    });
                    game3Scene.setPosition({
                        x: 45,
                        y: 330
                    });
                    game3Scene.setZindex(1);
                    game3Scene.setAlpha(0);
                    var panel = new GAMEOBJECT('panel_g3', { w: 278, h: 274 }, 1, game3Scene);
                    panel.addBitmap({
                        name: "panel_g3",
                        pos: {
                            x: 139,
                            y: 137
                        },
                        frame: "panel2",
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                    });
                    panel.addBitmap({
                        name: "divider_g3",
                        pos: {
                            x: 139,
                            y: 137
                        },
                        frame: "divs_game3",
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                    });
                    panel.addBitmap({
                        name: "background_highlight",
                        pos: {
                            x: 139,
                            y: 137
                        },
                        alpha: 0,
                        frame: "box3_higlight",
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("highlightSS")
                    });
                    panel.addAnimation('boxReminder');
                    panel.setAnimation('boxReminder', 'boxReminder', 1, 4);
                    var instructions = new GAMEOBJECT('instructions_g3', { w: 282, h: 48 }, 1, game3Scene);
                    instructions.addBitmap({
                        name: "instructions_g3",
                        pos: {
                            x: 141,
                            y: 24
                        },
                        frame: "instructions_game3",
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                    });
                    instructions.setPosition({
                        x: 0,
                        y: 265
                    });
                    var game3yt = new GAMEOBJECT('game3yours', { w: 300, h: 22 }, 3, game3Scene);
                    game3yt.addBitmap({
                        name: 'yoursText',
                        pos: {
                            x: 90 - 37,
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
                            x: 120,
                            y: 11
                        },
                        frame: 'theirs',
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        }
                    });
                    game3yt.setPosition({
                        x: 18,
                        y: 15
                    });
                    var rowData = [
                        [20, 20],
                        [20, 98],
                        [20, 176]
                    ];
                    var iconData = [
                        [
                            [25, 10],
                            [90, 10]
                        ],
                        [
                            [25, 90],
                            [90, 90]
                        ],
                        [
                            [25, 168],
                            [90, 168]
                        ]
                    ];
                    for (var i = 0; i < 3; i++) {
                        var turnData = TICKET.getInstance().getGame3()[i];
                        var rowIcons = [turnData.y, turnData.t];
                        var rowPositions = rowData[i];
                        var iconPosition = iconData[i];
                        var compare = new COMPARE('game3row' + i);
                        var layout = new GAMEOBJECT('g3_layout' + i, { w: 235.5, h: 76 }, 1, game3Scene);
                        layout.addBitmap({
                            name: "row_highlight",
                            pos: {
                                x: 118,
                                y: 38
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
                                y: 38
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
                                y: 38
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
                            var diamond = new CLICKABLEGAMEOBJECT('g3_row_' + i + "_icon_" + j, { w: 100, h: 100 }, 1, game3Scene);
                            diamond.setTicketLabel(rowIcons[j]);
                            diamond.setZindex(4);
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
                                    y: 48
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
                                    y: 48
                                },
                                alpha: 0,
                                frame: "w" + rowIcons[j] + "g",
                                doReg: {
                                    center: true
                                },
                                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                            });
                            diamond.setPosition({
                                x: iconPosition[j][0],
                                y: iconPosition[j][1]
                            });
                            diamond.setAnimation('reveal', 'iconRevealG3', 0.2, 0.5);
                            diamond.setAnimation('winReveal', 'yoursWinG3', 0.2, 0.5);
                            var burst = new GAMEOBJECT('g3_burst_row' + i + 'icon' + j, { w: 200, h: 200 }, 1, game3Scene);
                            burst.addBitmap({
                                name: "burst",
                                pos: {
                                    x: -110,
                                    y: -50
                                },
                                frame: "burst",
                                doReg: {
                                    center: true
                                },
                                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("burstSS")
                            });
                            burst.active = true;
                            burst.setPosition({
                                x: iconPosition[j][0],
                                y: iconPosition[j][1]
                            });
                            burst.setZindex(2);
                            diamond.setParent(layout);
                            diamond.setParent(burst);
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
                        var prize = new CLICKABLEGAMEOBJECT('g3_prize_' + i, { w: 92, h: 36 }, 1, game3Scene);
                        prize.setZindex(4);
                        prize.setTicketLabel('prizeValue');
                        prize.setPrizeValue(prizeValue);
                        prize.addBitmap({
                            name: "word_prize",
                            pos: {
                                x: 46,
                                y: 18
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
                                x: 46,
                                y: 18
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
                                x: 46,
                                y: 18
                            },
                            frame: "pw" + prizeValue,
                            alpha: 0,
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        prize.setPosition({
                            x: rowPositions[0] + 145,
                            y: rowPositions[1] + 22
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
                };
                MainLayout.prototype._setupGameFour = function () {
                    var game4Scene = new SCENE('game4Scene');
                    game4Scene.setDimensions({
                        w: 290,
                        h: 330
                    });
                    game4Scene.setPosition({
                        x: 640,
                        y: 330
                    });
                    game4Scene.setZindex(1);
                    game4Scene.setAlpha(0);
                    var panel = new GAMEOBJECT('panel_g4', { w: 278, h: 274 }, 1, game4Scene);
                    panel.addBitmap({
                        name: "panel_g4",
                        pos: {
                            x: 139,
                            y: 137
                        },
                        frame: "panel2",
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                    });
                    panel.addBitmap({
                        name: "divider_g4",
                        pos: {
                            x: 139,
                            y: 137
                        },
                        frame: "divs_game4",
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                    });
                    panel.addBitmap({
                        name: "background_highlight",
                        pos: {
                            x: 139,
                            y: 137
                        },
                        alpha: 0,
                        frame: "box3_higlight",
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("highlightSS")
                    });
                    panel.addAnimation('boxReminder');
                    panel.setAnimation('boxReminder', 'boxReminder', 1, 4);
                    var instructions = new GAMEOBJECT('instructions_g4', { w: 282, h: 48 }, 1, game4Scene);
                    instructions.addBitmap({
                        name: "instructions_g4",
                        pos: {
                            x: 141,
                            y: 24
                        },
                        frame: "instructions_game4",
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                    });
                    instructions.setPosition({
                        x: -20,
                        y: 265
                    });
                    var rowData = [
                        [20, 20],
                        [20, 98],
                        [20, 176]
                    ];
                    var iconData = [
                        [
                            [25, 10],
                            [95, 10]
                        ],
                        [
                            [25, 90],
                            [95, 90]
                        ],
                        [
                            [25, 170],
                            [95, 170]
                        ]
                    ];
                    for (var i = 0; i < 3; i++) {
                        var turnData = TICKET.getInstance().getGame4()[i];
                        var rowIcons = [turnData.v0, turnData.v1];
                        var rowPositions = rowData[i];
                        var iconPosition = iconData[i];
                        var match = new MATCH('matchG4row' + i, "match2");
                        var layout = new GAMEOBJECT('g4_layout' + i, { w: 236, h: 76 }, 1, game4Scene);
                        layout.addBitmap({
                            name: "row_highlight",
                            pos: {
                                x: 118,
                                y: 38
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
                                y: 38
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
                                y: 38
                            },
                            frame: "row" + (i + 1) + "h",
                            alpha: 0,
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
                            var moneyClip = new CLICKABLEGAMEOBJECT('g4_row_' + i + "_icon_" + j, { w: 100, h: 100 }, 1, game4Scene);
                            moneyClip.addBitmap({
                                name: "icon",
                                pos: {
                                    x: 50,
                                    y: 45
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
                                    x: 45,
                                    y: 50
                                },
                                alpha: 0,
                                frame: rowIcons[j],
                                doReg: {
                                    center: true
                                },
                                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                            });
                            moneyClip.setAnimation('reveal', 'iconRevealG4', 0.2, 0.5);
                            var self = this;
                            moneyClip.setAction('click', function (moneyClip, i) {
                                self._stopAllReminders();
                                self._updateReminders('matchG4row' + i);
                                moneyClip.setEnabled(false);
                                moneyClip.reveal();
                                IWG.IWGEM.trigger('decClickCount', ['matchG4row' + i, moneyClip]);
                            }.bind(this, moneyClip, i));
                            moneyClip.setPosition({
                                x: iconPosition[j][0],
                                y: iconPosition[j][1]
                            });
                            moneyClip.setTicketLabel(rowIcons[j]);
                            match.addSymbol(moneyClip, "playableSymbol");
                        }
                        var prizeValue = TICKET.getInstance().getPrizeList()[turnData.prize];
                        var prize = new CLICKABLEGAMEOBJECT('g4_prize_' + i, { w: 92, h: 36 }, 1, game4Scene);
                        prize.setPrizeValue(prizeValue);
                        match.addSymbol(prize, "winning");
                        prize.addBitmap({
                            name: "word_prize",
                            pos: {
                                x: 46,
                                y: 18
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
                                x: 46,
                                y: 18
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
                                x: 46,
                                y: 18
                            },
                            frame: "pw" + prizeValue,
                            alpha: 0,
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        prize.setPosition({
                            x: rowPositions[0] + 145,
                            y: rowPositions[1] + 20
                        });
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
                };
                MainLayout.prototype._setupGameFive = function () {
                    var game5Scene = new SCENE('game5Scene');
                    game5Scene.setDimensions({
                        w: 330,
                        h: 460
                    });
                    game5Scene.setPosition({
                        x: 320,
                        y: 145
                    });
                    game5Scene.setZindex(1);
                    game5Scene.setAlpha(0);
                    var panel = new GAMEOBJECT('panel_g5', { w: 324, h: 434 }, 1, game5Scene);
                    panel.addBitmap({
                        name: "panel_g5",
                        pos: {
                            x: 162,
                            y: 217
                        },
                        frame: "panel3",
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                    });
                    panel.addBitmap({
                        name: "divider_g5",
                        pos: {
                            x: 162,
                            y: 107
                        },
                        frame: "div_game5",
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                    });
                    panel.addBitmap({
                        name: "background_highlight",
                        pos: {
                            x: 162,
                            y: 217
                        },
                        alpha: 0,
                        frame: "box5_highlight",
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("highlightSS")
                    });
                    panel.addAnimation('boxReminder');
                    var instructions = new GAMEOBJECT('instructions_g5', { w: 300, h: 66 }, 1, game5Scene);
                    instructions.addBitmap({
                        name: "instructions_g5",
                        pos: {
                            x: 150,
                            y: 33
                        },
                        frame: "instructions_game5",
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                    });
                    instructions.setPosition({
                        x: 5,
                        y: 430
                    });
                    var winningSymbolsText = new GAMEOBJECT('g5_winning_symbols_text', { w: 164, h: 22 }, 3, game5Scene);
                    winningSymbolsText.addBitmap({
                        name: "winningSymbolsText",
                        pos: {
                            x: 82,
                            y: 11
                        },
                        frame: "winningsymbols",
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                    });
                    winningSymbolsText.setPosition({
                        x: 162 - 82,
                        y: 20
                    });
                    var yourSymbolsText = new GAMEOBJECT('g5_your_symbols_text', { w: 136, h: 22 }, 3, game5Scene);
                    yourSymbolsText.addBitmap({
                        name: "yourSymbolsText",
                        pos: {
                            x: 68,
                            y: 11
                        },
                        frame: "yoursymbols",
                        doReg: {
                            center: true
                        },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                    });
                    yourSymbolsText.setPosition({
                        x: 162 - 68,
                        y: 110
                    });
                    var coinPos = [
                        [60, 20],
                        [160, 20]
                    ];
                    for (var i = 0; i < 2; i++) {
                        var position = coinPos[i];
                        var highlightPos = [58, 162.5];
                        var width;
                        if (i === 0) {
                            width = 104;
                        }
                        else {
                            width = 100.5;
                        }
                        var highlight = new GAMEOBJECT('g5_highlight' + i, { w: width, h: 85 }, 1, game5Scene);
                        highlight.addBitmap({
                            name: "row_highlight",
                            pos: {
                                x: 50,
                                y: 42
                            },
                            frame: "highlight",
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        highlight.setAlpha(0);
                        highlight.setPosition({
                            x: highlightPos[i],
                            y: position[1]
                        });
                        var winningSymbol = new CLICKABLEGAMEOBJECT('g5_winning_symbol_' + i, { w: 100, h: 100 }, 2, game5Scene);
                        winningSymbol.addBitmap({
                            name: "icon",
                            pos: {
                                x: 60,
                                y: 50
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
                                x: 50,
                                y: 50
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
                        var flare = new GAMEOBJECT('g5_flare_' + i, { w: 100, h: 100 }, 1, game5Scene);
                        flare.addBitmap({
                            name: "flare",
                            pos: {
                                x: 0,
                                y: 0
                            },
                            frame: "flare",
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("flareSS")
                        });
                        flare.active = true;
                        flare.setPosition({
                            x: position[0],
                            y: position[1] - 10
                        });
                        flare.setZindex(1);
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
                        flare.setParent(winningSymbol);
                        this._matchG5.addSymbol(winningSymbol, "winning");
                    }
                    panel.setAnimation('boxReminder', 'boxReminder', 1, 4, this._matchG5);
                    var symbolPos = [
                        [65, 125],
                        [175, 125],
                        [25, 215],
                        [120, 215],
                        [215, 215],
                        [25, 310],
                        [120, 310],
                        [215, 310]
                    ];
                    var highlightPos2 = [
                        [20, 106],
                        [163, 106],
                        [20, 225],
                        [114.5, 225],
                        [209, 225],
                        [20, 319],
                        [114.5, 319],
                        [209, 319]
                    ];
                    for (var i = 0; i < symbolPos.length; i++) {
                        var position = symbolPos[i];
                        var highpos = highlightPos2[i];
                        var frame, width, height, xPos;
                        var offset = 0;
                        if (i === 0) {
                            frame = "highlight_left";
                            width = 143;
                            height = 118;
                            xPos = 64;
                        }
                        else if (i === 1) {
                            frame = "highlight_right";
                            width = 140;
                            height = 118;
                            xPos = 74;
                        }
                        else {
                            frame = "highlight";
                            width = 93;
                            height = 93;
                            xPos = 47.5;
                            offset = 5;
                        }
                        var highlight = new GAMEOBJECT('g5_highlight_yours' + i, { w: width, h: height }, 1, game5Scene);
                        highlight.addBitmap({
                            name: "row_highlight",
                            pos: {
                                x: xPos,
                                y: 46
                            },
                            frame: frame,
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS")
                        });
                        highlight.setAlpha(0);
                        highlight.setPosition({
                            x: highpos[0],
                            y: highpos[1]
                        });
                        var yourSymbol = new CLICKABLEGAMEOBJECT('g5_your_symbol_' + i, { w: 82, h: 72 }, 1, game5Scene);
                        yourSymbol.addBitmap({
                            name: "icon",
                            pos: {
                                x: 44,
                                y: 36
                            },
                            frame: "Cash_Wad",
                            scale: {
                                x: 1,
                                y: 1
                            },
                            doReg: {
                                center: true
                            },
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("cashWadSS")
                        });
                        yourSymbol.addBitmap({
                            name: "symbol_number",
                            pos: {
                                x: 41,
                                y: 40
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
                            y: position[1] + offset
                        });
                        yourSymbol.setAnimation('reveal', 'iconRevealG5', 0.2, 0.5);
                        yourSymbol.setAnimation('winReveal', 'winRevealG5', 0.2, 0.5);
                        yourSymbol.setAction('click', function (yourSymbol) {
                            self._stopAllReminders();
                            self._updateReminders('matchG5');
                            createjs.Sound.play('game5Cash');
                            yourSymbol.setEnabled(false);
                            yourSymbol.reveal();
                        }.bind(this, yourSymbol));
                        this._matchG5.addSymbol(yourSymbol, "playable");
                        var prizeValue = TICKET.getInstance().getPrizeList()[TICKET.getInstance().getGame5prizes()[i]];
                        var prize = new CLICKABLEGAMEOBJECT('g5_prize_' + i, { w: 92, h: 36 }, 1, game5Scene);
                        prize.setPrizeValue(prizeValue);
                        prize.addBitmap({
                            name: "word_prize",
                            pos: {
                                x: 46,
                                y: 18
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
                                x: 46,
                                y: 18
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
                                x: 46,
                                y: 18
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
                            y: position[1] + 65 + offset
                        });
                        prize.setAnimation('reveal', 'prizeReveal', 0.2, 0.5);
                        prize.addAnimation('pulse');
                        prize.setAnimation('pulse', 'prizePulse', 0.2, 0.5);
                        prize.setAction('click', function (prize, yourSymbol) {
                            self._stopAllReminders();
                            self._updateReminders('matchG5');
                            createjs.Sound.play('wordPrize');
                            prize.setEnabled(false);
                            yourSymbol.setEnabled(false);
                            prize.reveal();
                        }.bind(this, prize, yourSymbol));
                        highlight.setParent(yourSymbol);
                        prize.setParent(yourSymbol);
                    }
                };
                MainLayout.prototype._intro = function () {
                    var g1 = HELPER.getScene('game1Scene').getDiv();
                    var g2 = HELPER.getScene('game2Scene').getDiv();
                    var g3 = HELPER.getScene('game3Scene').getDiv();
                    var g4 = HELPER.getScene('game4Scene').getDiv();
                    var g5 = HELPER.getScene('game5Scene').getDiv();
                    var wu = HELPER.getGameObject('mainLogo').getBitmap('mainLogo');
                    var timeline = new TimelineMax({
                        paused: true
                    });
                    timeline.to(g1, 0.5, { delay: 0.6, alpha: 1 }, 'on');
                    timeline.to(g2, 0.5, { delay: 0.6, alpha: 1 }, 'on');
                    timeline.to(g3, 0.5, { delay: 0.6, alpha: 1 }, 'on');
                    timeline.to(g4, 0.5, { delay: 0.6, alpha: 1 }, 'on');
                    timeline.to(g5, 0.5, { delay: 0.6, alpha: 1 }, 'on');
                    timeline.to(wu, 0.5, { delay: 0.7, alpha: 1 }, 'on');
                    timeline.play();
                };
                MainLayout.prototype._setupEndgame = function () {
                    var endGame = new ENDGAME("endGame");
                    endGame.setDimensions({
                        w: 300,
                        h: 200
                    });
                    endGame.setPosition({
                        x: 480 - 135,
                        y: -5
                    });
                    endGame.setZindex(0);
                    endGame.setAlpha(1);
                    endGame.setScale(0, 0);
                };
                MainLayout.prototype._updateReminders = function (name) {
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
                MainLayout.prototype._startAllReminders = function () {
                    for (var i = 0; i < this._gameReminders.length; i++) {
                        var reminders = this._gameReminders[i];
                        if (reminders > 0) {
                            this._startReminder(this._gameBgNames[i]);
                        }
                    }
                };
                MainLayout.prototype._stopAllReminders = function () {
                    for (var i = 0; i < this._gameBgNames.length; i++) {
                        this._stopReminder(this._gameBgNames[i]);
                        if (this._gameBgNames[i] == "panel_g5") {
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
                MainLayout.prototype._startReminder = function (name) {
                    HELPER.getGameObject(name).animate('boxReminder');
                };
                MainLayout.prototype._stopReminder = function (name) {
                    HELPER.getGameObject(name).animationTimeLine.seek(0);
                    HELPER.getGameObject(name).animationTimeLine.pause();
                };
                return MainLayout;
            })();
            iwg.MainLayout = MainLayout;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
