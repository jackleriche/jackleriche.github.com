/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="Scene.ts" />
/// <reference path="GameObject.ts" />
/// <reference path="ClickableGameObject.ts" />
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
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GLOBAL = IWG.Global, SPRITESHEETS = IWG.SpriteSheets, images = CORE.iwgLoadQ.images, GAMEOBJECT = IWG.GameObject, TICKET = IWG.Ticket, HELPER = IWG.Helper, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject;
            var Spinner = (function (_super) {
                __extends(Spinner, _super);
                function Spinner() {
                    _super.call(this, "spinner");
                    this._multiplier = ['', 'x1', 'x2', 'x3', 'x4', 'x5'];
                    this._prizeArray = ['word_prize'];
                    this._clickCount = 0;
                    this._ringArray = [];
                    this._spokes = null;
                    this._prizeAmounts = TICKET.getInstance().getPrize();
                    this._ring1 = TICKET.getInstance().getRing1();
                    this._ring2 = TICKET.getInstance().getRing2();
                    this._ring3 = TICKET.getInstance().getRing3();
                    this._ring4 = TICKET.getInstance().getRing4();
                    this._pOffsetArray = TICKET.getInstance().getOffset0();
                    this._offsetArray = TICKET.getInstance().getOffset1();
                    this._multiplierNum = TICKET.getInstance().getMultiplier();
                    this._extendSubscribe();
                    this._setupLayout();
                }
                Spinner.prototype._extendSubscribe = function () {
                    IWG.IWGEM.on('spinnerIn', this._spinnerIntro.bind(this));
                    IWG.IWGEM.on('spinClick', this._spinClick.bind(this));
                    IWG.IWGEM.on('makeHighlights', this._checkRings.bind(this));
                    IWG.IWGEM.on('showOutro', this._spinnerOutro.bind(this));
                };
                Spinner.prototype._extendUnsubscribe = function () {
                    IWG.IWGEM.off('spinnerIn');
                    IWG.IWGEM.off('spinClick');
                    IWG.IWGEM.off('makeHighlights');
                    IWG.IWGEM.off('showOutro');
                };
                Spinner.prototype._setupLayout = function () {
                    var spritesheet = SPRITESHEETS.getInstance().getSpriteSheet("gold7sMultiplier"), self = this;
                    var bgSparkles = new GAMEOBJECT('bg_sparkles', { w: 802, h: 821 }, 2, this);
                    bgSparkles.addBitmap({
                        name: 'sparkles',
                        pos: {
                            x: 0,
                            y: 0
                        },
                        frame: "bg_sparkles",
                        spriteSheet: spritesheet
                    });
                    bgSparkles.setAlpha(0);
                    var mainWheel = new GAMEOBJECT('main_wheel', { w: 802, h: 640 }, 3, this);
                    mainWheel.addBitmap({
                        name: "mainWheel",
                        pos: {
                            x: 0,
                            y: 0
                        },
                        frame: "wheel_main",
                        spriteSheet: spritesheet
                    });
                    mainWheel.setPosition({
                        y: 100
                    });
                    var winHighlight0 = new GAMEOBJECT('winHighlight0', { w: 300, h: 250 }, 3, this);
                    winHighlight0.addBitmap({
                        name: 'highlight1',
                        pos: {
                            x: 244,
                            y: 53
                        },
                        frame: 'ring_highlight1',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight0.addBitmap({
                        name: 'highlight2',
                        pos: {
                            x: 205,
                            y: 67
                        },
                        frame: 'ring_highlight2',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight0.addBitmap({
                        name: 'highlight3',
                        pos: {
                            x: 170,
                            y: 84
                        },
                        frame: 'ring_highlight3',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight0.addBitmap({
                        name: 'highlight4',
                        pos: {
                            x: 135,
                            y: 96
                        },
                        frame: 'ring_highlight4',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight0.addBitmap({
                        name: 'highlight5',
                        pos: {
                            x: 98,
                            y: 109
                        },
                        frame: 'ring_highlight5',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight0.addBitmap({
                        name: 'highlight6',
                        pos: {
                            x: 67,
                            y: 123
                        },
                        frame: 'ring_highlight6',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight0.setPosition({
                        x: 353,
                        y: 447
                    });
                    winHighlight0.setRotation(-90);
                    winHighlight0.active = true;
                    var winHighlight1 = new GAMEOBJECT('winHighlight1', { w: 300, h: 250 }, 3, this);
                    winHighlight1.addBitmap({
                        name: 'highlight1',
                        pos: {
                            x: 244.5,
                            y: 54
                        },
                        frame: 'ring_highlight1',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight1.addBitmap({
                        name: 'highlight2',
                        pos: {
                            x: 206,
                            y: 70
                        },
                        frame: 'ring_highlight2',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight1.addBitmap({
                        name: 'highlight3',
                        pos: {
                            x: 170,
                            y: 85
                        },
                        frame: 'ring_highlight3',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight1.addBitmap({
                        name: 'highlight4',
                        pos: {
                            x: 135,
                            y: 99
                        },
                        frame: 'ring_highlight4',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight1.addBitmap({
                        name: 'highlight5',
                        pos: {
                            x: 98,
                            y: 114
                        },
                        frame: 'ring_highlight5',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight1.addBitmap({
                        name: 'highlight6',
                        pos: {
                            x: 66,
                            y: 127
                        },
                        frame: 'ring_highlight6',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight1.setPosition({
                        x: 213,
                        y: 475
                    });
                    winHighlight1.setRotation(-45);
                    var winHighlight2 = new GAMEOBJECT('winHighlight2', { w: 300, h: 250 }, 3, this);
                    winHighlight2.addBitmap({
                        name: 'highlight1',
                        pos: {
                            x: 248,
                            y: 54
                        },
                        frame: 'ring_highlight1',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight2.addBitmap({
                        name: 'highlight2',
                        pos: {
                            x: 209,
                            y: 68
                        },
                        frame: 'ring_highlight2',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight2.addBitmap({
                        name: 'highlight3',
                        pos: {
                            x: 172,
                            y: 84
                        },
                        frame: 'ring_highlight3',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight2.addBitmap({
                        name: 'highlight4',
                        pos: {
                            x: 136,
                            y: 97
                        },
                        frame: 'ring_highlight4',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight2.addBitmap({
                        name: 'highlight5',
                        pos: {
                            x: 100,
                            y: 110
                        },
                        frame: 'ring_highlight5',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight2.addBitmap({
                        name: 'highlight6',
                        pos: {
                            x: 68,
                            y: 124
                        },
                        frame: 'ring_highlight6',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight2.setPosition({
                        x: 95,
                        y: 400
                    });
                    var winHighlight3 = new GAMEOBJECT('winHighlight3', { w: 300, h: 250 }, 3, this);
                    winHighlight3.addBitmap({
                        name: 'highlight1',
                        pos: {
                            x: 249,
                            y: 52
                        },
                        frame: 'ring_highlight1',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight3.addBitmap({
                        name: 'highlight2',
                        pos: {
                            x: 209,
                            y: 67
                        },
                        frame: 'ring_highlight2',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight3.addBitmap({
                        name: 'highlight3',
                        pos: {
                            x: 172,
                            y: 83
                        },
                        frame: 'ring_highlight3',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight3.addBitmap({
                        name: 'highlight4',
                        pos: {
                            x: 136,
                            y: 96
                        },
                        frame: 'ring_highlight4',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight3.addBitmap({
                        name: 'highlight5',
                        pos: {
                            x: 100,
                            y: 110
                        },
                        frame: 'ring_highlight5',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight3.addBitmap({
                        name: 'highlight6',
                        pos: {
                            x: 67,
                            y: 125
                        },
                        frame: 'ring_highlight6',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight3.setPosition({
                        x: 65.5,
                        y: 260
                    });
                    winHighlight3.setRotation(45);
                    var winHighlight4 = new GAMEOBJECT('winHighlight4', { w: 300, h: 250 }, 3, this);
                    winHighlight4.addBitmap({
                        name: 'highlight1',
                        pos: {
                            x: 248,
                            y: 52
                        },
                        frame: 'ring_highlight1',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight4.addBitmap({
                        name: 'highlight2',
                        pos: {
                            x: 209.5,
                            y: 67
                        },
                        frame: 'ring_highlight2',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight4.addBitmap({
                        name: 'highlight3',
                        pos: {
                            x: 172,
                            y: 83
                        },
                        frame: 'ring_highlight3',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight4.addBitmap({
                        name: 'highlight4',
                        pos: {
                            x: 136,
                            y: 97
                        },
                        frame: 'ring_highlight4',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight4.addBitmap({
                        name: 'highlight5',
                        pos: {
                            x: 100,
                            y: 109
                        },
                        frame: 'ring_highlight5',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight4.addBitmap({
                        name: 'highlight6',
                        pos: {
                            x: 69,
                            y: 123
                        },
                        frame: 'ring_highlight6',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight4.setPosition({
                        x: 145,
                        y: 140
                    });
                    winHighlight4.setRotation(90);
                    var winHighlight5 = new GAMEOBJECT('winHighlight5', { w: 300, h: 250 }, 3, this);
                    winHighlight5.addBitmap({
                        name: 'highlight1',
                        pos: {
                            x: 249,
                            y: 52
                        },
                        frame: 'ring_highlight1',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight5.addBitmap({
                        name: 'highlight2',
                        pos: {
                            x: 211,
                            y: 67
                        },
                        frame: 'ring_highlight2',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight5.addBitmap({
                        name: 'highlight3',
                        pos: {
                            x: 174,
                            y: 82
                        },
                        frame: 'ring_highlight3',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight5.addBitmap({
                        name: 'highlight4',
                        pos: {
                            x: 137.5,
                            y: 96
                        },
                        frame: 'ring_highlight4',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight5.addBitmap({
                        name: 'highlight5',
                        pos: {
                            x: 101.5,
                            y: 109
                        },
                        frame: 'ring_highlight5',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight5.addBitmap({
                        name: 'highlight6',
                        pos: {
                            x: 68,
                            y: 124
                        },
                        frame: 'ring_highlight6',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight5.setPosition({
                        x: 286,
                        y: 110
                    });
                    winHighlight5.setRotation(135);
                    var winHighlight6 = new GAMEOBJECT('winHighlight6', { w: 300, h: 250 }, 3, this);
                    winHighlight6.addBitmap({
                        name: 'highlight1',
                        pos: {
                            x: 250,
                            y: 49
                        },
                        frame: 'ring_highlight1',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight6.addBitmap({
                        name: 'highlight2',
                        pos: {
                            x: 211,
                            y: 64
                        },
                        frame: 'ring_highlight2',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight6.addBitmap({
                        name: 'highlight3',
                        pos: {
                            x: 174,
                            y: 80
                        },
                        frame: 'ring_highlight3',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight6.addBitmap({
                        name: 'highlight4',
                        pos: {
                            x: 138,
                            y: 94.5
                        },
                        frame: 'ring_highlight4',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight6.addBitmap({
                        name: 'highlight5',
                        pos: {
                            x: 102,
                            y: 108.5
                        },
                        frame: 'ring_highlight5',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight6.addBitmap({
                        name: 'highlight6',
                        pos: {
                            x: 68,
                            y: 124
                        },
                        frame: 'ring_highlight6',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight6.setPosition({
                        x: 407,
                        y: 191
                    });
                    winHighlight6.setRotation(180);
                    var winHighlight7 = new GAMEOBJECT('winHighlight7', { w: 300, h: 250 }, 3, this);
                    winHighlight7.addBitmap({
                        name: 'highlight1',
                        pos: {
                            x: 251,
                            y: 56
                        },
                        frame: 'ring_highlight1',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight7.addBitmap({
                        name: 'highlight2',
                        pos: {
                            x: 213,
                            y: 70
                        },
                        frame: 'ring_highlight2',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight7.addBitmap({
                        name: 'highlight3',
                        pos: {
                            x: 177,
                            y: 87
                        },
                        frame: 'ring_highlight3',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight7.addBitmap({
                        name: 'highlight4',
                        pos: {
                            x: 141,
                            y: 101
                        },
                        frame: 'ring_highlight4',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight7.addBitmap({
                        name: 'highlight5',
                        pos: {
                            x: 104,
                            y: 113
                        },
                        frame: 'ring_highlight5',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight7.addBitmap({
                        name: 'highlight6',
                        pos: {
                            x: 73,
                            y: 129
                        },
                        frame: 'ring_highlight6',
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    winHighlight7.setPosition({
                        x: 434,
                        y: 337
                    });
                    winHighlight7.setRotation(225);
                    var wheelSpokes = new GAMEOBJECT('wheel_spokes', { w: 602, h: 602 }, 8, this);
                    wheelSpokes.addBitmap({
                        name: "wheelSpokes",
                        pos: {
                            x: 0,
                            y: 0
                        },
                        frame: "wheel_spokes",
                        spriteSheet: spritesheet
                    });
                    wheelSpokes.setPosition({
                        x: 100,
                        y: 118
                    });
                    this._spokes = this.getChildByName('wheel_spokes');
                    var spinButton = new CLICKABLEGAMEOBJECT('spin_button', { w: 106, h: 106 }, 10, this);
                    spinButton.addBitmap({
                        name: "spinButton",
                        pos: {
                            x: 53,
                            y: 53
                        },
                        frame: "spin",
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    spinButton.setPosition({
                        x: 347,
                        y: 365
                    });
                    spinButton.addBitmap({
                        name: "spinText",
                        pos: {
                            x: 53,
                            y: 53
                        },
                        frame: "spin_text",
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    spinButton.setEnabled(false);
                    spinButton.addAnimation('buttonPress');
                    spinButton.setAnimation('buttonPress', 'spinPress');
                    spinButton.setAction('click', function (spinButton) {
                        self._buttonEnable(false);
                        self._stopReminderSymbol(false);
                        createjs.Sound.play('spinButton');
                        spinButton.animate('buttonPress');
                        IWG.IWGEM.trigger('spinClick');
                    }.bind(null, spinButton));
                    spinButton.setAction('rollover', function (spinButton) {
                        spinButton.getBitmap('spinText').gotoAndStop('spin_over');
                        spinButton.getStage().update();
                        self._stopReminderSymbol(true);
                    }.bind(null, spinButton));
                    spinButton.setAction('rollout', function (spinButton) {
                        spinButton.getBitmap('spinText').gotoAndStop('spin_text');
                        spinButton.getStage().update();
                        self._stopReminderSymbol(true);
                    }.bind(null, spinButton));
                    this._setReminder();
                    this._setupRing('ring0', { w: 180, h: 180 }, { x: 310, y: 330 }, this._ring1);
                    this._setupRing('ring1', { w: 260, h: 260 }, { x: 270, y: 290 }, this._ring2);
                    this._setupRing('ring2', { w: 340, h: 340 }, { x: 230, y: 250 }, this._ring3);
                    this._setupRing('ring3', { w: 420, h: 420 }, { x: 190, y: 210 }, this._ring4);
                    this._setupRing('ring4', { w: 510, h: 510 }, { x: 145, y: 165 }, this._multiplierNum, "multiplier");
                    this._setupRing('ring5', { w: 590, h: 590 }, { x: 105, y: 125 }, [0, 0, 0, 0, 0, 0, 0, 0], "prize");
                    this._ringArray[5].setRotation(this._pOffsetArray[0] * 45);
                    this._ringArray[4].setRotation(this._pOffsetArray[1] * 45);
                    this._ringArray[3].setRotation(this._offsetArray[3] * 45);
                    this._ringArray[2].setRotation(this._offsetArray[2] * 45);
                    this._ringArray[1].setRotation(this._offsetArray[1] * 45);
                    this._ringArray[0].setRotation(this._offsetArray[0] * 45);
                    winHighlight0.setAlpha(0);
                    winHighlight1.setAlpha(0);
                    winHighlight2.setAlpha(0);
                    winHighlight3.setAlpha(0);
                    winHighlight4.setAlpha(0);
                    winHighlight5.setAlpha(0);
                    winHighlight6.setAlpha(0);
                    winHighlight7.setAlpha(0);
                };
                Spinner.prototype._setupRing = function (name, dimensions, position, ticketData, type) {
                    var ring = new iwg.Scene(name), spritesheet = SPRITESHEETS.getInstance().getSpriteSheet("gold7sMultiplier"), radius = dimensions.w / 2 - 22, degs = 20, step = (2 * Math.PI) / ticketData.length, ringNum = 0, rotation = 22.5;
                    ring.setPosition(position);
                    ring.setDimensions(dimensions);
                    ring.setZindex('8');
                    ring.setParent(this);
                    var frame = null;
                    if (type === "multiplier") {
                        frame = this._multiplier;
                    }
                    else if (type === "prize") {
                        frame = this._prizeArray;
                    }
                    else {
                        frame = ticketData;
                    }
                    ;
                    for (var i = 0; i < ticketData.length; i++) {
                        if (type === 'prize') {
                            var icon = new CLICKABLEGAMEOBJECT(name + "icon" + i, { w: 146, h: 46 }, 9, ring);
                            icon.addBitmap({
                                name: 'winPrizeAmount',
                                pos: {
                                    x: 73,
                                    y: 23
                                },
                                alpha: 0,
                                frame: 'pw' + this._prizeAmounts[i],
                                spriteSheet: spritesheet,
                                doReg: {
                                    center: true
                                }
                            });
                            icon.addBitmap({
                                name: 'prizeAmount',
                                pos: {
                                    x: 73,
                                    y: 23
                                },
                                alpha: 0,
                                frame: 'p' + this._prizeAmounts[i],
                                spriteSheet: spritesheet,
                                doReg: {
                                    center: true
                                }
                            });
                            icon.addBitmap({
                                name: 'prizeWord',
                                pos: {
                                    x: 73,
                                    y: 23
                                },
                                alpha: 1,
                                frame: frame[ticketData[i]],
                                spriteSheet: spritesheet,
                                doReg: {
                                    center: true
                                }
                            });
                            icon.setRotation(rotation - 225);
                            icon.setPosition({
                                x: Math.round(dimensions.w / 2 + radius * Math.cos(degs) - 73),
                                y: Math.round(dimensions.h / 2 + radius * Math.sin(degs) - 23)
                            });
                            icon.setAnimation('reveal', 'revealPrize', 0.25, 0);
                            icon.setAnimation('winReveal', 'winRevealPrize', 0.25, 0);
                            icon.setEnabled(true);
                            icon.active = true;
                            icon.setAction('click', function (icon) {
                                icon.reveal();
                            }.bind(null, icon));
                        }
                        else if (type === 'multiplier') {
                            var icon = new GAMEOBJECT(name + "icon" + i, { w: 47, h: 37 }, 9, ring);
                            icon.addBitmap({
                                name: 'multiplier',
                                pos: {
                                    x: 23.5,
                                    y: 18.5
                                },
                                frame: frame[ticketData[i]],
                                spriteSheet: spritesheet,
                                doReg: {
                                    center: true
                                }
                            });
                            icon.addBitmap({
                                name: 'winMultiplier',
                                pos: {
                                    x: 23.5,
                                    y: 18.5
                                },
                                frame: frame[ticketData[i]] + "_highlight",
                                spriteSheet: spritesheet,
                                alpha: 0,
                                doReg: {
                                    center: true
                                }
                            });
                            icon.setRotation(rotation - 225);
                            icon.setPosition({
                                x: Math.round(dimensions.w / 2 + radius * Math.cos(degs) - 23.5),
                                y: Math.round(dimensions.h / 2 + radius * Math.sin(degs) - 18.5)
                            });
                            icon.setAnimation('winReveal', 'winRevealMultiplier', 0.25, 0);
                        }
                        else {
                            var icon = new GAMEOBJECT(name + "icon" + i, { w: 60, h: 48 }, 9, ring);
                            icon.addBitmap({
                                name: 'icon',
                                pos: {
                                    x: 30,
                                    y: 24
                                },
                                frame: frame[i],
                                spriteSheet: spritesheet,
                                doReg: {
                                    center: true
                                }
                            });
                            icon.setRotation(rotation - 225);
                            icon.setPosition({
                                x: Math.round(dimensions.w / 2 + radius * Math.cos(degs) - 30),
                                y: Math.round(dimensions.h / 2 + radius * Math.sin(degs) - 24)
                            });
                        }
                        degs += step;
                        rotation += 45;
                        ringNum++;
                    }
                    this._ringArray.push(ring);
                };
                Spinner.prototype._spinClick = function () {
                    var _this = this;
                    var ringCanvas = [], timeline = new TimelineLite({
                        paused: true
                    });
                    var instance = null;
                    for (var i = 0; i < this._ringArray.length; i++) {
                        var canvas = this._ringArray[i].getDiv();
                        ringCanvas.push(canvas);
                    }
                    if (this._clickCount === 0) {
                        timeline.add(TweenMax.to(ringCanvas[5], 2.5, { rotation: -1080, onStart: function () {
                                createjs.Sound.play('outerWheel');
                                _this._spokes.setZindex(10);
                            } }), "-=0.5");
                        timeline.add(TweenMax.to(ringCanvas[4], 2.5, { rotation: +1080, onComplete: function () {
                                _this._revealPrizes();
                            } }), "-=1.5");
                        this._clickCount++;
                    }
                    else if (this._clickCount === 1) {
                        var button = this.getChildByName('spin_button');
                        button.animationTimeLine.kill();
                        this._spinButtonOutro();
                        timeline.add(TweenMax.to(ringCanvas[0], 3, { rotation: -1080, onStart: function () {
                                instance = createjs.Sound.play('innerWheel', false, 0, 0, -1, 1, -0.5);
                            } }), "-=1");
                        timeline.add(TweenMax.to(ringCanvas[1], 3, { rotation: +1080 }), "-=1");
                        timeline.add(TweenMax.to(ringCanvas[2], 3, { rotation: -1080 }), "-=1");
                        timeline.add(TweenMax.to(ringCanvas[3], 3, { rotation: +1080, onComplete: function () {
                                TweenMax.delayedCall(1.5, function () {
                                    _this._checkWinners();
                                });
                                instance.stop();
                            } }), "-=1");
                    }
                    timeline.play();
                };
                Spinner.prototype._checkRings = function () {
                    var winningRows = GLOBAL.getInstance().getFromGlobal('winner');
                    var winningIcons = [];
                    var losingIcon = null;
                    for (var i = 0; i < winningRows.length; i++) {
                        var object = winningRows[i];
                        if (HELPER.hasDuplicates(object.icons)) {
                            winningIcons.push(HELPER.hasDuplicates(object.icons));
                        }
                        winningIcons.push("free");
                        for (var j = 0; j < 4; j++) {
                            var ringHighlight = this.getChildByName('winHighlight' + object.num).getBitmap('highlight' + (j + 1));
                            var icon = this._ringArray[j].getChildByName('ring' + j + "icon" + object.num);
                            var bool = false;
                            ringHighlight.alpha = 1;
                            for (var k = 0; k < winningIcons.length; k++) {
                                if (icon.getBitmap('icon').currentAnimation === winningIcons[k]) {
                                    bool = true;
                                }
                            }
                            if (!bool) {
                                losingIcon = j;
                                ringHighlight.alpha = 0;
                            }
                        }
                        this.getChildByName('winHighlight' + object.num).getStage().update();
                        this.getChildByName('winHighlight' + object.num).setAlpha(1);
                        var prizeAmount = this._ringArray[5].getChildByName('ring5icon' + object.num);
                        var multiAmount = this._ringArray[4].getChildByName('ring4icon' + object.num);
                        prizeAmount.winReveal();
                        multiAmount.winReveal();
                    }
                    createjs.Sound.play('rowWin');
                    this._spinnerOutro();
                };
                Spinner.prototype._revealPrizes = function () {
                    var prizeRing = this._ringArray[5], prizeWordrevealArray = [], timeline = new TimelineMax({
                        paused: true
                    });
                    for (var i = 0; i < 8; i++) {
                        var gameObject = prizeRing.getChildByName('ring5icon' + i);
                        prizeWordrevealArray.push(gameObject);
                    }
                    var tempArray = prizeWordrevealArray.splice(Math.max(prizeWordrevealArray.length - 3, 1));
                    tempArray.reverse();
                    for (var i = 0; i < tempArray.length; i++) {
                        prizeWordrevealArray.unshift(tempArray[i]);
                    }
                    for (var j = 0; j < prizeWordrevealArray.length; j++) {
                        var prizeIcon = prizeWordrevealArray[j];
                        if (!prizeIcon.getRevealed()) {
                            timeline.add(TweenMax.delayedCall(0.4, function (prizeIcon) {
                                prizeIcon.reveal();
                            }, [prizeIcon]));
                        }
                    }
                    timeline.play();
                    this._buttonEnable(true);
                    this._stopReminderSymbol(true);
                };
                Spinner.prototype._checkWinners = function () {
                    if (TICKET.getInstance().getParams().wT === 1) {
                        IWG.IWGEM.trigger('makeHighlights');
                    }
                    else {
                        IWG.IWGEM.trigger('showOutro');
                    }
                };
                Spinner.prototype._buttonEnable = function (enable) {
                    var button = this.getChildByName('spin_button');
                    if (!enable) {
                        button.setEnabled(false);
                    }
                    else {
                        button.setEnabled(true);
                    }
                };
                Spinner.prototype._spinnerIntro = function () {
                    var sparkles = this.getChildByName('bg_sparkles'), spin = this.getChildByName('spin_button'), self = this;
                    TweenMax.to(this.getDiv(), 0.5, { x: 80, delay: 0.7, onComplete: function () {
                            TweenMax.to(sparkles.getCanvas(), 0.5, { alpha: 1, onComplete: function () {
                                    spin.setEnabled(true);
                                } });
                        } });
                };
                Spinner.prototype._spinButtonOutro = function () {
                    var _this = this;
                    var spin = this.getChildByName('spin_button'), spinTextFade = spin.getBitmap('spinText');
                    IWG.IWGEM.trigger('hideInstructionButton');
                    IWG.IWGEM.trigger('hideInstructions');
                    TweenMax.to(spinTextFade, 0.5, { alpha: 0, onComplete: function () {
                            spin.setEnabled(false);
                            _this._stopReminderSymbol(false);
                            spin.active = false;
                            spin.getStage().update();
                        } });
                };
                Spinner.prototype._spinnerOutro = function () {
                    var sparkles = this.getChildByName('bg_sparkles'), spin = this.getChildByName('spin_button'), spinTextFade = spin.getBitmap('spinText');
                    TweenMax.to(this.getDiv(), 0.7, { x: -115, delay: 1, onStart: function () {
                        }, onComplete: function () {
                            IWG.IWGEM.trigger('showEndGame');
                        } });
                };
                Spinner.prototype._setIconReminder = function () {
                    TweenMax.to(this.getDiv(), 1, { delay: 4, yoyo: true, repeat: -1 });
                    this._startReminderSymbol();
                };
                Spinner.prototype._setReminder = function () {
                    var button = this.getChildByName('spin_button'), bitmap = button.getBitmap('spinButton');
                    button.animationTimeLine = new TimelineMax({
                        onStartParams: [button],
                        onStart: function (button) {
                            button.active = true;
                        },
                        paused: true,
                        onCompleteParams: [button],
                        onComplete: function (button) {
                            button.active = false;
                        }
                    });
                    button.animationTimeLine.to(bitmap, 1, { delay: 4,
                        onStartParams: [button],
                        onStart: function (button) { } }, 'start')
                        .to(bitmap, 1, {
                        repeat: -1,
                        rotation: 360,
                        repeatDelay: 3,
                        onStartParams: [button],
                        onStart: function (button) {
                            button.active = true;
                        } }, 'pulse');
                    this._startReminderSymbol();
                };
                Spinner.prototype._startReminderSymbol = function () {
                    var button = this.getChildByName('spin_button');
                    if (!button.getRevealed()) {
                        button.animationTimeLine.restart();
                    }
                };
                Spinner.prototype._stopReminderSymbol = function (reset) {
                    var button = this.getChildByName('spin_button');
                    if (!button.getRevealed()) {
                        if (reset) {
                            button.animationTimeLine.restart();
                        }
                        else {
                            button.animationTimeLine.pause("start");
                        }
                    }
                };
                return Spinner;
            })(iwg.Scene);
            iwg.Spinner = Spinner;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
