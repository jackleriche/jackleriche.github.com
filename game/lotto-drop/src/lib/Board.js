var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="Scene.ts" />
/// <reference path="Ticket.ts" />
/// <reference path="GameObject.ts" />
/// <reference path="ClickableGameObject.ts" />
/// <reference path="Pin.ts" />
/// <reference path="Helper.ts" />
/// <reference path="Legend.ts" />
/// <reference path="BallSelection.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GLOBAL = IWG.Global, HELPER = IWG.Helper, TICKET = IWG.Ticket, GAMEOBJECT = IWG.GameObject, PATH = IWG.Path, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, LEGEND = IWG.Legend, PIN = IWG.Pin, TIPPER = IWG.Tipper, BALLSELECTION = IWG.BallSelection, STAR = IWG.Star, SPRITESHEETS = IWG.SpriteSheets;
            var Board = (function (_super) {
                __extends(Board, _super);
                function Board(_name) {
                    _super.call(this, _name);
                    this._pinMap = [];
                    this._legend = new LEGEND();
                    this._dropBallTube = [];
                    this._ball = null;
                    this._ballTL = null;
                    this._subscribeBoard();
                    this._setupLayout();
                    this._setupBallDrop();
                    this._setupMiniGame();
                    this._setupLegend();
                    this._boardOn();
                }
                Board.prototype._subscribeBoard = function () {
                    IWG.IWGEM.on('dropBall', this._dropBall.bind(this));
                    IWG.IWGEM.on('resumeBallDrop', this._resumeBallDrop.bind(this));
                    IWG.IWGEM.on('ballInTube', this._ballInTube.bind(this));
                    IWG.IWGEM.on('fadeOnChoose', this._fadeOnChoose.bind(this));
                    IWG.IWGEM.on('fadeOffChoose', this._fadeOffChoose.bind(this));
                    IWG.IWGEM.on('ballShowDone', this._enableChoose.bind(this));
                };
                Board.prototype._setupLayout = function () {
                    var board = new GAMEOBJECT('boardBG', { w: 560, h: 621 }, 6, this);
                    board.addBitmap({
                        name: "boardBG",
                        pos: {
                            x: 280,
                            y: 311
                        },
                        frame: "board",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                        doReg: {
                            center: true
                        }
                    });
                    board.setPosition({
                        x: 0,
                        y: 0
                    });
                    var circles = new GAMEOBJECT('circlesBG', { w: 560, h: 621 }, 3, this);
                    circles.setPosition({
                        x: 0,
                        y: 0
                    });
                    var balls = [
                        [230, 140, 30, "BB0000"],
                        [160, 240, 65, "FF0080"],
                        [280, 370, 90, "FF0041"],
                        [420, 300, 40, "ED0000"]
                    ];
                    for (var i = 0; i < 4; i++) {
                        var ballConfig = balls[i];
                        var circle = new createjs.Shape();
                        circle.graphics.beginFill("#" + ballConfig[3]).drawCircle(0, 0, ballConfig[2]);
                        circle.x = ballConfig[0];
                        circle.y = ballConfig[1];
                        circles.getStage().addChild(circle);
                        circles.getStage().update();
                    }
                    var pins = [
                        [null, null, null],
                        [130, 110, "pin"],
                        [271, 110, "pin"],
                        [412, 110, "pin"],
                        [60, 160, "pin"],
                        [201, 160, "tipper"],
                        [346, 160, "tipper"],
                        [481, 160, "pin"],
                        [130, 210, "pin"],
                        [271, 210, "pin"],
                        [412, 210, "pin"],
                        [60, 260, "pin"],
                        [201, 260, "pin"],
                        [346, 260, "pin"],
                        [481, 260, "pin"],
                        [130, 310, "pin"],
                        [271, 310, "pin", "miniGame"],
                        [412, 310, "pin"],
                        [60, 360, "pin"],
                        [201, 360, "pin"],
                        [346, 360, "pin"],
                        [481, 360, "pin"],
                        [130, 410, "pin"],
                        [271, 410, "tipper"],
                        [412, 410, "pin"],
                        [95, 470, "wall"],
                        [185, 470, "wall"],
                        [272, 470, "wall"],
                        [358, 470, "wall"],
                        [445, 470, "wall"],
                        [null, null, null],
                        [null, null, null],
                        [null, null, null],
                        [null, null, null],
                        [null, null, null],
                        [null, null, null],
                        [null, null, null],
                        [null, null, null],
                        [null, null, null],
                        [null, null, null],
                        [null, null, null],
                        [54, 596, "endTube", 0],
                        [142, 596, "endTube", 1],
                        [228, 596, "endTube", 2],
                        [315, 596, "endTube", 3],
                        [403, 596, "endTube", 4],
                        [488, 596, "endTube", 5]
                    ];
                    for (var i = 0; i < pins.length; i++) {
                        if (pins[i][2] === "pin") {
                            var pin = new PIN('pin' + i, { w: 16, h: 80 }, 6, this);
                            pin.addBitmap({
                                name: 'pinShadow' + i,
                                pos: {
                                    x: 8,
                                    y: 40
                                },
                                frame: "pin_shadow",
                                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                                doReg: {
                                    center: true
                                }
                            });
                            pin.addBitmap({
                                name: 'pin' + i,
                                pos: {
                                    x: 8,
                                    y: 8
                                },
                                frame: "pin",
                                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                                doReg: {
                                    center: true
                                }
                            });
                            pin.setPosition({
                                x: pins[i][0],
                                y: pins[i][1],
                            });
                            pin.setTicketLabel(pins[i][3]);
                            this._pinMap.push(pin);
                        }
                        else if (pins[i][2] === "tipper") {
                            var tipper = new TIPPER('tipper' + i, { w: 73, h: 73 }, 6, this);
                            tipper.addBitmap({
                                name: 'tipperShadow',
                                pos: {
                                    x: 36,
                                    y: 46
                                },
                                frame: "tiper_shadow",
                                alpha: 1,
                                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                                doReg: {
                                    center: true
                                }
                            });
                            tipper.addBitmap({
                                name: 'tipper',
                                pos: {
                                    x: 36,
                                    y: 36
                                },
                                frame: "tipper",
                                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                                doReg: {
                                    custom: {
                                        x: 36,
                                        y: 6
                                    },
                                }
                            });
                            tipper.setPosition({
                                x: pins[i][0] - 28,
                                y: pins[i][1] - 30,
                            });
                            this._pinMap.push(tipper);
                        }
                        else if (pins[i][2] === "endTube") {
                            var endTube = new GAMEOBJECT('endTube' + i, { w: 1, h: 1 }, 10, this);
                            endTube.setPosition({
                                x: pins[i][0],
                                y: pins[i][1],
                            });
                            endTube.setTicketLabel(pins[i][3]);
                            this._pinMap.push(endTube);
                        }
                        else if (pins[i][2] === "wall") {
                            var wall = new GAMEOBJECT('wall' + i, { w: 1, h: 1 }, 10, this);
                            wall.setPosition({
                                x: pins[i][0],
                                y: pins[i][1],
                            });
                            this._pinMap.push(wall);
                        }
                        else {
                            this._pinMap.push(null);
                        }
                    }
                };
                Board.prototype._setupLegend = function () {
                    this._legend.setSequential(true);
                    for (var i = 0; i < 6; i++) {
                        var prizeShadow = new GAMEOBJECT("legendShadow" + i, { w: 44, h: 90 }, 5, this);
                        prizeShadow.addBitmap({
                            name: 'legend_shadow',
                            pos: {
                                x: 22,
                                y: 45
                            },
                            frame: "legend_shadow",
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                            doReg: {
                                center: true
                            }
                        });
                        prizeShadow.setPosition({
                            x: 40 + (87 * i),
                            y: 492
                        });
                        var prizeAsset = new GAMEOBJECT("legendPrizeAsset" + i, { w: 77, h: 25 }, 6, this);
                        prizeAsset.addBitmap({
                            name: 'legendPrizeAsset',
                            pos: {
                                x: 38,
                                y: 12
                            },
                            frame: "p" + TICKET.getInstance().legendPrizeValues[i],
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                            doReg: {
                                center: true
                            }
                        });
                        prizeAsset.addBitmap({
                            name: 'legendPrizeWinAsset',
                            pos: {
                                x: 38,
                                y: 12
                            },
                            frame: "pw" + TICKET.getInstance().legendPrizeValues[i],
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                            doReg: {
                                center: true
                            },
                            alpha: 0
                        });
                        prizeAsset.setPosition({
                            x: 25 + (87 * i),
                            y: 592
                        });
                        prizeAsset.setAnimation('winReveal', 'legendPrizeWinHighlight');
                        var value = TICKET.getInstance().legendPrizeValues[i];
                        var nodes = 2;
                        if (value > 99) {
                            nodes = 3;
                        }
                        var icons = [];
                        for (var j = 0; j < nodes; j++) {
                            var iconAsset = new GAMEOBJECT("row" + i + "icon" + j, { w: 44, h: 44 }, 4, this);
                            iconAsset.addBitmap({
                                name: 'legendPrizeAsset' + i,
                                pos: {
                                    x: 22,
                                    y: 22
                                },
                                frame: "ball_grey",
                                spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                                doReg: {
                                    center: true
                                }
                            });
                            iconAsset.setPosition({
                                x: 40 + (87 * i),
                                y: 555 - (44 * j)
                            });
                            iconAsset.setTicketLabel(i);
                            icons.push(iconAsset);
                        }
                        this._legend.addRow({
                            prizeValue: value,
                            prize: prizeAsset,
                            icons: icons
                        });
                    }
                };
                Board.prototype._setupBallDrop = function () {
                    var self = this;
                    for (var i = 0; i < 3; i++) {
                        var ballDrop = new CLICKABLEGAMEOBJECT("ballDrop" + i, { w: 95, h: 65 }, 7, this);
                        ballDrop.addBitmap({
                            name: 'blank',
                            pos: {
                                x: 45,
                                y: 0
                            },
                            alpha: 0.1,
                            frame: "blank",
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                            doReg: {
                                center: true
                            }
                        });
                        ballDrop.addBitmap({
                            name: 'legendPrizeAsset' + i,
                            pos: {
                                x: 47.5,
                                y: 5
                            },
                            frame: "droparrow_white",
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                            doReg: {
                                center: true
                            }
                        });
                        ballDrop.addBitmap({
                            name: 'legendPrizePrompt',
                            pos: {
                                x: 47.5,
                                y: 40
                            },
                            frame: "choose",
                            alpha: 0,
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                            doReg: {
                                center: true
                            }
                        });
                        ballDrop.setPosition({
                            x: 92 + (140 * i),
                            y: 45
                        });
                        ballDrop.setEnabled(false);
                        ballDrop.setAction('click', function (index) {
                            IWG.IWGEM.trigger('dropBall', [index]);
                            createjs.Sound.play('chooseMenu');
                            IWG.IWGEM.trigger('hideInstructions');
                            if (!ballDrop.getRevealed()) {
                                self._fadeOffChoose();
                            }
                        }.bind(null, i));
                        ballDrop.setAction('rollover', function (index) {
                        }.bind(null, i));
                        ballDrop.setAction('rollout', function (index) {
                        }.bind(null, i));
                        this._dropBallTube.push(ballDrop);
                    }
                    var ball = new GAMEOBJECT('ball', { w: 44, h: 44 }, 5, this);
                    ball.addBitmap({
                        name: 'ball',
                        pos: {
                            x: 22,
                            y: 22
                        },
                        frame: "ball1",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                        doReg: {
                            center: true
                        }
                    });
                    ball.setPosition({
                        x: 0,
                        y: 0
                    });
                    ball.addAnimation('intro');
                    ball.setAnimation("intro", "ballIntro", 0.5, 0, null);
                    this._ball = ball;
                };
                Board.prototype._setupMiniGame = function () {
                    var miniGameHole = new GAMEOBJECT('miniGameHole', { w: 44, h: 44 }, 4, this);
                    miniGameHole.addBitmap({
                        name: 'miniGameHole',
                        pos: {
                            x: 22,
                            y: 22
                        },
                        frame: "minigame_hole",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                        doReg: {
                            center: true
                        }
                    });
                    miniGameHole.setPosition({
                        x: 258,
                        y: 266
                    });
                    var miniGameHoleText = new GAMEOBJECT('miniGameHoleText', { w: 86, h: 26 }, 4, this);
                    miniGameHoleText.addBitmap({
                        name: 'miniGameHoleText',
                        pos: {
                            x: 43,
                            y: 13
                        },
                        frame: "board_minigame",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                        doReg: {
                            center: true
                        }
                    });
                    miniGameHoleText.setPosition({
                        x: 235,
                        y: 325
                    });
                };
                Board.prototype._dropBall = function (index) {
                    var _this = this;
                    var turn = GLOBAL.getInstance().getFromGlobal('turnNo');
                    if (GLOBAL.getInstance().getFromGlobal("ballSelection").length === 0) {
                        for (var i = 0; i < this._dropBallTube.length; i++) {
                            this._dropBallTube[i].setEnabled(false);
                        }
                        ;
                        return;
                    }
                    var ballData = GLOBAL.getInstance().getFromGlobal('ballBank').getNextBall();
                    this._ball.getBitmap('ball').gotoAndStop('ball' + ballData.getTicketLabel());
                    this._ball.getStage().update();
                    IWG.IWGEM.trigger('initBallTurn');
                    for (var i = 0; i < this._dropBallTube.length; i++) {
                        this._dropBallTube[i].setEnabled(false);
                    }
                    ;
                    var startTube = this._dropBallTube[index];
                    var positionX = startTube.getPosition().x;
                    var positionY = startTube.getPosition().y;
                    this._ball.setPosition({
                        x: positionX + 25,
                        y: positionY - 105
                    }, true);
                    this._ball.animate('intro');
                    var turnData = iwg.Ticket.getInstance().getTurn(turn);
                    var pathArray = null;
                    var starNumber = null;
                    switch (index) {
                        case 0:
                            pathArray = PATH.PATHS_A[Number(turnData.rA)];
                            if (turnData.hasOwnProperty('sA')) {
                                starNumber = Number(turnData.sA);
                            }
                            ;
                            break;
                        case 1:
                            pathArray = PATH.PATHS_B[Number(turnData.rB)];
                            if (turnData.hasOwnProperty('sB')) {
                                starNumber = Number(turnData.sB);
                            }
                            ;
                            break;
                        case 2:
                            pathArray = PATH.PATHS_C[Number(turnData.rC)];
                            if (turnData.hasOwnProperty('sC')) {
                                starNumber = Number(turnData.sC);
                            }
                            ;
                            break;
                    }
                    this._ballTL = new TimelineMax({
                        paused: true,
                        delay: 1,
                        onComplete: function () {
                            for (var i = 0; i < _this._dropBallTube.length; i++) {
                                _this._dropBallTube[i].setEnabled(true);
                            }
                            ;
                            _this._enableChoose(false);
                            IWG.IWGEM.trigger('checkEndGame');
                            _this._ball.setAlpha(0);
                        }
                    });
                    this._ballTL.miniGame = false;
                    GLOBAL.getInstance().addToGlobal("ballTL", this._ballTL);
                    var nextBezierX = null;
                    var nextRotation = null;
                    var pinOffsetX = null;
                    var pinOffsetY = null;
                    var pinType = null;
                    var endType = null;
                    for (var i_1 = 0; i_1 < pathArray.length; i_1++) {
                        var pin = this._pinMap[pathArray[i_1]];
                        var nPin = null;
                        var direction;
                        var bezierYoffset = 60;
                        var delay = 0;
                        if (i_1 < pathArray.length - 1) {
                            nPin = this._pinMap[pathArray[i_1 + 1]];
                            if (nPin.getPosition().x < pin.getPosition().x) {
                                nextRotation += -360;
                                direction = "left";
                            }
                            else {
                                nextRotation += 360;
                                direction = "right";
                            }
                            pinType = pin.getName().slice(0, 3);
                            if (pinType === "tip") {
                                pinOffsetX = 14;
                                pinOffsetY = 15;
                            }
                            else {
                                pinOffsetX = -11;
                                pinOffsetY = 42;
                            }
                        }
                        endType = pin.getName().slice(0, 3);
                        if (endType === "end") {
                            bezierYoffset = 125;
                        }
                        this._ballTL.add(TweenMax.to(this._ball.getCanvas(), 0.36, {
                            ease: Power0.easeIn,
                            delay: delay,
                            onStartParams: [this, pin, i_1],
                            onStart: function (self, pin, i) {
                                TweenMax.delayedCall(0.28, function () {
                                    createjs.Sound.play('pinHit');
                                });
                                var nextPin = self._pinMap[pathArray[i + 1]];
                                if (nextPin) {
                                    if (nextPin.getPosition().x < pin.getPosition().x) {
                                        nextBezierX = -80;
                                    }
                                    else {
                                        nextBezierX = 80;
                                    }
                                    ;
                                }
                            },
                            bezier: {
                                values: [
                                    {
                                        x: (pin.getPosition().x + pinOffsetX) + nextBezierX,
                                        y: (pin.getPosition().y - 14) - bezierYoffset
                                    },
                                    {
                                        x: pin.getPosition().x + pinOffsetX + 3,
                                        y: pin.getPosition().y - pinOffsetY + 2
                                    },
                                    {
                                        x: pin.getPosition().x + pinOffsetX + 3,
                                        y: pin.getPosition().y - pinOffsetY + 1
                                    },
                                    {
                                        x: pin.getPosition().x + pinOffsetX + 3,
                                        y: pin.getPosition().y - pinOffsetY
                                    }
                                ]
                            },
                            rotation: nextRotation,
                            onCompleteParams: [this, pin, pinType, direction],
                            onComplete: function (self, pin, pinType, direction) {
                                var pinIndex = Number(pin.getName().substring(3));
                                if (pinIndex === starNumber && pinIndex !== 16) {
                                    var star = new STAR(pin.getPosition().x, pin.getPosition().y, self);
                                    IWG.IWGEM.trigger('bonusStar');
                                }
                                if (typeof pin.getTicketLabel() === "number") {
                                    self._legend.updateLegend(pin.getTicketLabel());
                                    IWG.IWGEM.trigger('ballInTube', [pin.getTicketLabel(), self._ball]);
                                    createjs.Sound.play('ballLand');
                                    pin.setPosition({ y: pin.getPosition().y - 44 }, true);
                                }
                                else if (pin.getTicketLabel() === "miniGame") {
                                    self._ballTL.pause();
                                    self._ballTL.miniGame = true;
                                    TweenMax.to(self._ball.getCanvas(), 0.5, { x: 258, y: 266, scaleX: 0.3, scaleY: 0.3, onComplete: function () {
                                            IWG.IWGEM.trigger('miniGameOn');
                                            createjs.Sound.play('minigamePopup');
                                        } });
                                }
                                ;
                                if (pinType === "tip") {
                                    IWG.IWGEM.trigger('tipperLandedEvent', [pin, direction]);
                                }
                            }
                        }));
                    }
                    ;
                    this._ballTL.play();
                    turn++;
                    GLOBAL.getInstance().addToGlobal('turnNo', turn);
                };
                Board.prototype._resumeBallDrop = function () {
                    var _this = this;
                    TweenMax.to(this._ball.getCanvas(), 0.5, { scaleX: 1, scaleY: 1, onComplete: function () {
                            _this._ballTL.play();
                        } });
                };
                Board.prototype._ballInTube = function (tubeIndex, ball) {
                    var currentFrame = ball.getBitmap('ball').currentAnimation;
                    var tube = this._legend.getRow(tubeIndex);
                    for (var i = 0; i < tube.rowIcons.length; i++) {
                        var blank = tube.rowIcons[i];
                        if (blank.getStage().children[0].currentAnimation === "ball_grey") {
                            blank.getStage().children[0].gotoAndStop(currentFrame);
                            blank.getStage().update();
                            break;
                        }
                    }
                };
                Board.prototype._fadeOffChoose = function (endMsg) {
                    for (var i = 0; i < this._dropBallTube.length; i++) {
                        var choose = this._dropBallTube[i], chooseBitmap = choose.getBitmap('legendPrizePrompt');
                        choose.setEnabled(false);
                        choose.active = true;
                        TweenMax.to(chooseBitmap, 0.5, { alpha: 0.01,
                            onCompleteParams: [choose],
                            onComplete: function (choose) {
                                choose.active = false;
                                choose.setEnabled(false);
                            } });
                    }
                };
                Board.prototype._fadeOnChoose = function () {
                    for (var i = 0; i < this._dropBallTube.length; i++) {
                        var choose = this._dropBallTube[i], chooseBitmap = choose.getBitmap('legendPrizePrompt');
                        choose.active = true;
                        TweenMax.to(chooseBitmap, 0.5, {
                            onStartParams: [choose],
                            onStart: function (choose) {
                                choose.setEnabled(true);
                            }, delay: 0.5, alpha: 0.6, yoyo: true, repeat: -1, repeatDelay: 0.5 });
                    }
                };
                Board.prototype._enableChoose = function (enable) {
                    for (var i = 0; i < this._dropBallTube.length; i++) {
                        var choose = this._dropBallTube[i];
                        if (!enable) {
                            choose.setEnabled(false);
                        }
                        else {
                            choose.setEnabled(true);
                        }
                    }
                };
                Board.prototype._boardOn = function () {
                    TweenMax.to(this.getDiv(), 0.5, { alpha: 1, delay: 1 });
                };
                return Board;
            })(iwg.Scene);
            iwg.Board = Board;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
//# sourceMappingURL=Board.js.map