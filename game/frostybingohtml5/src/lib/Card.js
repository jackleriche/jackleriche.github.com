/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="Scene.ts" />
/// <reference path="ClickableGameObject.ts" />
/// <reference path="Legend.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GLOBAL = IWG.Global, QUEUEMANAGER = IWG.QueueManager, GAMEOBJECT = IWG.GameObject, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, SPRITESHEETS = IWG.SpriteSheets, LEGEND = IWG.Legend, HELPER = IWG.Helper;
            var Card = (function (_super) {
                __extends(Card, _super);
                function Card(_name, _values) {
                    _super.call(this, _name);
                    this._values = _values;
                    this._cardObject = null;
                    this._legend = new LEGEND();
                    this._numberObjects = [];
                    this._prizes = [];
                    this._doubler = [];
                    this._subscribeCard();
                    this.setDimensions({
                        w: 366,
                        h: 252
                    });
                    this._setupLayout();
                    this._initCardComplete();
                }
                Card.prototype._subscribeCard = function () {
                    IWG.IWGEM.on('disableCard', this._disableCard.bind(this));
                    IWG.IWGEM.on('cardBallCheck', this._checkCard.bind(this));
                    IWG.IWGEM.on('cardsReady', this._markCard.bind(this));
                };
                Card.prototype._checkCard = function (ballNumber) {
                    console.log('boom');
                    var self = this;
                    for (var i = 0; i < this._numberObjects.length; i++) {
                        var numberObject = this._numberObjects[i];
                        if (Number(ballNumber) === numberObject.getTicketLabel()) {
                            console.log(numberObject);
                            IWG.IWGEM.trigger('Card.incCardCount');
                        }
                    }
                    IWG.IWGEM.trigger('Card.cardReady');
                };
                Card.prototype._markCard = function () {
                    var self = this, ballNumber = GLOBAL.getInstance().getFromGlobal('ballNumber');
                    for (var j = 0; j < this._numberObjects.length; j++) {
                        var numberObject = this._numberObjects[j];
                        if (Number(ballNumber) === numberObject.getTicketLabel()) {
                            if (GLOBAL.getInstance().getFromGlobal('method') === "MarkYourself") {
                                numberObject.setEnabled(true);
                                numberObject.animate('reminder');
                                numberObject.setAction('click', function (numberObject) {
                                    numberObject.setEnabled(false);
                                    IWG.IWGEM.trigger('Card.decCardCount');
                                    numberObject.animationTimeLine.kill();
                                    self._legend.updateLegend(ballNumber);
                                    numberObject.getBitmap('highlight').alpha = 0;
                                    numberObject.getStage().update();
                                }.bind(null, numberObject));
                            }
                            else if (GLOBAL.getInstance().getFromGlobal('method') === "cardsMarked") {
                                IWG.IWGEM.trigger('Card.decCardCount');
                                self._legend.updateLegend(ballNumber);
                            }
                            else {
                                IWG.IWGEM.trigger('Card.decCardCount');
                                self._legend.updateLegend(ballNumber);
                            }
                        }
                    }
                };
                Card.prototype._disableCard = function () {
                    for (var i = 0; i < this._numberObjects.length; i++) {
                        var number = this._numberObjects[i];
                        number.setEnabled(false);
                    }
                };
                Card.prototype._setupLayout = function () {
                    var bingoCard = new GAMEOBJECT(this.getName() + "gameObject", { w: 366, h: 252 }, 1, this);
                    this._cardObject = bingoCard;
                    bingoCard.addBitmap({
                        name: "cardBackground",
                        pos: {
                            x: 183,
                            y: 126
                        },
                        frame: "gamepanel",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                        doReg: {
                            center: true
                        }
                    });
                    bingoCard.addBitmap({
                        name: "cardBackground",
                        pos: {
                            x: 183,
                            y: 136
                        },
                        frame: "gamepanel_grid",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                        doReg: {
                            center: true
                        }
                    });
                    var legendCornerGameObject = new iwg.GameObject(this.getName() + '-legend-corner', { w: 190, h: 16 }, 1, this);
                    legendCornerGameObject.setTicketLabel(this._values[3]);
                    legendCornerGameObject.setPosition({
                        x: 160,
                        y: 23
                    });
                    legendCornerGameObject.addBitmap({
                        name: "legend",
                        pos: {
                            x: 0,
                            y: 0
                        },
                        frame: "legend_4corners",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                        doReg: {
                            custom: {
                                x: 0,
                                y: 0
                            }
                        }
                    });
                    legendCornerGameObject.addBitmap({
                        name: "legend_value",
                        pos: {
                            x: 108,
                            y: 0
                        },
                        frame: "p" + this._values[3],
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                        doReg: {
                            custom: {
                                x: 0,
                                y: 0
                            }
                        }
                    });
                    legendCornerGameObject.setAnimation("winReveal", "prizeWinReveal", 1, 1);
                    var legendColumnGameObject = new iwg.GameObject(this.getName() + '-legend-column', { w: 180, h: 18 }, 1, this);
                    legendColumnGameObject.setRotation(-90);
                    legendColumnGameObject.setTicketLabel(this._values[1]);
                    legendColumnGameObject.setPosition({
                        x: -60,
                        y: 112
                    });
                    legendColumnGameObject.addBitmap({
                        name: "legend",
                        pos: {
                            x: 100,
                            y: 0
                        },
                        frame: "legend_column",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                        doReg: {
                            custom: {
                                x: 0,
                                y: 0
                            }
                        },
                        rotation: 90
                    });
                    legendColumnGameObject.addBitmap({
                        name: "legend_value",
                        pos: {
                            x: 100,
                            y: 0
                        },
                        frame: "p" + this._values[1],
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                        doReg: {
                            custom: {
                                x: 0,
                                y: 0
                            }
                        }
                    });
                    legendColumnGameObject.setAnimation("winReveal", "prizeWinReveal", 1, 1);
                    legendColumnGameObject.active = false;
                    var legendRowGameObject = new iwg.GameObject(this.getName() + '-legend-row', { w: 180, h: 15 }, 1, this);
                    legendRowGameObject.setTicketLabel(this._values[0]);
                    legendRowGameObject.setPosition({
                        x: 45,
                        y: 23
                    });
                    legendRowGameObject.addBitmap({
                        name: "legend",
                        pos: {
                            x: 0,
                            y: 0
                        },
                        frame: "legend_row",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                        doReg: {
                            custom: {
                                x: 0,
                                y: 0
                            }
                        }
                    });
                    legendRowGameObject.addBitmap({
                        name: "legend_value",
                        pos: {
                            x: 55,
                            y: 0
                        },
                        frame: "p" + this._values[0],
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                        doReg: {
                            custom: {
                                x: 0,
                                y: 0
                            }
                        }
                    });
                    legendRowGameObject.setAnimation("winReveal", "prizeWinReveal", 1, 1);
                    var legendDiagonalGameObject = new iwg.GameObject(this.getName() + '-legend-diagonal', { w: 180, h: 18 }, 1, this);
                    legendDiagonalGameObject.setTicketLabel(this._values[2]);
                    legendDiagonalGameObject.setRotation(-90);
                    legendDiagonalGameObject.setPosition({
                        x: 245,
                        y: 105
                    });
                    legendDiagonalGameObject.addBitmap({
                        name: "legend",
                        pos: {
                            x: 104,
                            y: 0
                        },
                        frame: "legend_diagonal",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                        doReg: {
                            custom: {
                                x: 0,
                                y: 0
                            }
                        },
                        rotation: 90
                    });
                    legendDiagonalGameObject.addBitmap({
                        name: "legend_value",
                        pos: {
                            x: 104,
                            y: 0
                        },
                        frame: "p" + this._values[2],
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                        doReg: {
                            custom: {
                                x: 0,
                                y: 0
                            }
                        }
                    });
                    legendDiagonalGameObject.setAnimation("winReveal", "prizeWinReveal", 1, 1);
                };
                Card.prototype._sortDoublers = function () {
                    if (this._doubler !== null) {
                        for (var i = 0; i < this._doubler.length; i++) {
                            var doublerRow = this._doubler[i], row = this._legend.getRow(doublerRow);
                            row.prizeValue = row.prizeValue * 2;
                            row.label = "doubler";
                            for (var j = 0; j < row.rowIcons.length; j++) {
                                var rowIcon = row.rowIcons[j];
                                rowIcon.getBitmap('text').color = "#fc2a1d";
                            }
                        }
                    }
                };
                Card.prototype._initCardComplete = function () {
                };
                Card.prototype.setupCardNumbers = function (numbers) {
                    if (!numbers) {
                        console.warn('no carnd numbers have been set');
                        return false;
                    }
                    var x = 47;
                    var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                    for (var i = 0; i < numbers.length; i++) {
                        var numberObject = new CLICKABLEGAMEOBJECT(this.getName() + "-number-" + i, { w: 52, h: 34 }, 1, this);
                        numberObject.setTicketLabel(Number(numbers[i]));
                        numberObject.setPosition({
                            x: x,
                            y: 50 + ((i % 5) * 35)
                        });
                        numberObject.setEnabled(false);
                        var highlight = new createjs.Shape();
                        highlight.name = 'highlight';
                        highlight.graphics.beginFill("blue").drawRect(0, 0, 62, 32);
                        highlight.alpha = 0.01;
                        numberObject.getStage().addChild(highlight);
                        numberObject.addBitmap({
                            name: "dabber",
                            pos: {
                                x: 7,
                                y: 4
                            },
                            frame: "splodge_" + GLOBAL.getInstance().getFromGlobal('dabber'),
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                            doReg: {
                                custom: {
                                    x: 0,
                                    y: 0
                                }
                            },
                            alpha: 0
                        });
                        var numberString = numbers[i], text = new createjs.Text(numberString.toString(), "Bold 29px effra", "black");
                        text.name = "text";
                        if (is_firefox) {
                            text.y = 3;
                        }
                        else {
                            text.y = -2;
                        }
                        numberObject.getStage().addChild(text);
                        text.x = 26;
                        text.textAlign = "center";
                        if (numberString === -1) {
                            text.text = "FREE";
                            text.font = "Bold 20px effra";
                            text.x = 25;
                            text.y = 5;
                        }
                        if (4 - (i % 5) === 0) {
                            x += 55;
                        }
                        ;
                        var hitbox = new createjs.Shape();
                        hitbox.name = 'hitbox';
                        hitbox.graphics.beginFill("blue").drawRect(0, 0, 52, 32);
                        text.hitArea = hitbox;
                        numberObject.getStage().update();
                        numberObject.addAnimation('markNumber');
                        numberObject.addAnimation('doublerWinReveal');
                        numberObject.setAnimation('markNumber', 'markNumber');
                        numberObject.setAnimation('winReveal', 'numberWinReveal');
                        numberObject.setAnimation('doublerWinReveal', 'doublerWinReveal');
                        numberObject.setAnimation('reminder', 'numberHighlight', 0.5, 4);
                        this._numberObjects.push(numberObject);
                    }
                };
                Card.prototype.setupLegend = function () {
                    var checkArray = HELPER.getInstance().listToMatrix(this._numberObjects, 5), legend = [], prizeObjects = [
                        this.getChildByName(this.getName() + '-legend-column'),
                        this.getChildByName(this.getName() + '-legend-row'),
                        this.getChildByName(this.getName() + '-legend-corner'),
                        this.getChildByName(this.getName() + '-legend-diagonal'),
                    ];
                    for (var k = 0; k < 5; k++) {
                        var row = [];
                        for (var l = 0; l < 5; l++) {
                            row.push(checkArray[l][k]);
                        }
                        this._legend.addRow({
                            prizeValue: prizeObjects[1].getTicketLabel(),
                            prize: prizeObjects[1],
                            icons: row
                        });
                    }
                    var x = 15, y = 50;
                    for (var i = 0; i < 5; i++) {
                        x += 55;
                        y = 50;
                        var col = [];
                        for (var j = 0; j < 5; j++) {
                            col.push(checkArray[i][j]);
                        }
                        legend.push(col);
                        this._legend.addRow({
                            prizeValue: prizeObjects[0].getTicketLabel(),
                            prize: prizeObjects[0],
                            icons: col
                        });
                    }
                    var corner = [
                        legend[0][0],
                        legend[0][4],
                        legend[4][0],
                        legend[4][4]
                    ];
                    this._legend.addRow({
                        prizeValue: prizeObjects[2].getTicketLabel(),
                        prize: prizeObjects[2],
                        icons: corner
                    });
                    var diagonalTopLeft = [
                        legend[0][0],
                        legend[1][1],
                        legend[2][2],
                        legend[3][3],
                        legend[4][4],
                    ];
                    this._legend.addRow({
                        prizeValue: prizeObjects[3].getTicketLabel(),
                        prize: prizeObjects[3],
                        icons: diagonalTopLeft
                    });
                    var diagonalBottomLeft = [
                        legend[0][4],
                        legend[1][3],
                        legend[2][2],
                        legend[3][1],
                        legend[4][0],
                    ];
                    this._legend.addRow({
                        prizeValue: prizeObjects[3].getTicketLabel(),
                        prize: prizeObjects[3],
                        icons: diagonalBottomLeft
                    });
                };
                Card.prototype.intro = function (delay) {
                    if (delay === void 0) { delay = 1; }
                    TweenMax.to(this.getDiv(), 1, { scaleX: 1, scaleY: 1, delay: delay, ease: Bounce.easeOut });
                };
                Card.prototype.setDoublers = function (doublers) {
                    this._doubler = doublers;
                    this._sortDoublers();
                };
                return Card;
            })(iwg.Scene);
            iwg.Card = Card;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
