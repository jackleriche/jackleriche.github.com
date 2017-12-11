/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="Scene.ts" />
/// <reference path="GameObject.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GLOBAL = IWG.Global, SPRITESHEETS = IWG.SpriteSheets, images = CORE.iwgLoadQ.images, GAMEOBJECT = IWG.GameObject, ANIMATION = IWG.Animation, HELPER = IWG.Helper, TICKET = IWG.Ticket, MINIGAMEPRIZE = IWG.MiniGamePrize, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject;
            var MiniGameOne = (function (_super) {
                __extends(MiniGameOne, _super);
                function MiniGameOne(_name) {
                    _super.call(this, _name);
                    this._turnsArray = [];
                    this._turnSymbolArray = [];
                    this._miniGamePrizeIndex = TICKET.getInstance().getMiniGame()[0].mGR;
                    this._ballNumberArray = TICKET.getInstance().getMiniGame()[0].mGN.split(',').map(Number);
                    this._l = false;
                    this._prizeFrameName = '';
                    this._prizeFrameText = '';
                    this._framePosX = null;
                    this._framePosY = null;
                    this._prizeTextPosX = null;
                    this._randNum = Math.round(HELPER.getRandomNumber(1, 59));
                    this._extendSubscribe();
                    this._setupLayout();
                }
                MiniGameOne.prototype._extendSubscribe = function () {
                    IWG.IWGEM.on('endMiniGame', this._endGameCheck.bind(this));
                    IWG.IWGEM.on('miniGameOn', this._miniGameOn.bind(this));
                    IWG.IWGEM.on('miniGameOff', this._miniGameOff.bind(this));
                    IWG.IWGEM.on('prizeMove', this._movePrize.bind(this));
                    IWG.IWGEM.on('prizeLose', this._movePrizeLose.bind(this));
                };
                MiniGameOne.prototype._extendUnsubscribe = function () {
                    IWG.IWGEM.off('endMiniGame');
                    IWG.IWGEM.off('miniGameOn');
                    IWG.IWGEM.off('miniGameOff');
                    IWG.IWGEM.off('prizeMove');
                    IWG.IWGEM.off('prizeLose');
                };
                MiniGameOne.prototype._getCorrectPrizeSymbol = function () {
                    switch (this._miniGamePrizeIndex) {
                        case 1:
                            this._prizeFrameName = "star_full";
                            this._prizeFrameText = "mg_win_star";
                            this._framePosX = 0;
                            this._framePosY = 0;
                            this._prizeTextPosX = 72;
                            break;
                        case 2:
                            this._prizeFrameName = "ball" + this._randNum;
                            this._prizeFrameText = "mg_win_bonus";
                            this._framePosX = 5;
                            this._framePosY = 5;
                            this._prizeTextPosX = 22;
                            break;
                        case 4:
                            this._prizeFrameName = "iw_blue10";
                            this._prizeFrameText = "mg_win_iw10";
                            this._framePosX = 8;
                            this._framePosY = 8;
                            this._prizeTextPosX = 75;
                            break;
                        case 5:
                            this._prizeFrameName = "iw_blue5";
                            this._prizeFrameText = "mg_win_iw5";
                            this._framePosX = 8;
                            this._framePosY = 8;
                            this._prizeTextPosX = 75;
                            break;
                        case 6:
                            this._prizeFrameName = "iw_blue3";
                            this._prizeFrameText = "mg_win_iw3";
                            this._framePosX = 8;
                            this._framePosY = 8;
                            this._prizeTextPosX = 75;
                            break;
                        default:
                            break;
                    }
                };
                MiniGameOne.prototype._setupLayout = function () {
                    var spritesheet = SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"), self = this;
                    this._getCorrectPrizeSymbol();
                    var background = new GAMEOBJECT('miniGame_bg', { w: 535, h: 560 }, 2, this);
                    background.addBitmap({
                        name: 'background',
                        pos: {
                            x: 0,
                            y: 0
                        },
                        frame: "bg_minigames",
                        spriteSheet: spritesheet
                    });
                    var title = new GAMEOBJECT('miniGame_title', { w: 142, h: 20 }, 2, this);
                    title.addBitmap({
                        name: 'title',
                        pos: {
                            x: 0,
                            y: 0
                        },
                        frame: "mg_title",
                        spriteSheet: spritesheet
                    });
                    title.setPosition({
                        x: 200,
                        y: 40
                    });
                    var prizeStar = new CLICKABLEGAMEOBJECT('miniGame_prize', { w: 81, h: 75 }, 2, this);
                    prizeStar.addBitmap({
                        name: 'prize',
                        pos: {
                            x: 0,
                            y: 0
                        },
                        frame: "mg_star",
                        spriteSheet: spritesheet
                    });
                    prizeStar.addBitmap({
                        name: 'prizeText',
                        pos: {
                            x: 20,
                            y: 31
                        },
                        frame: "mg_word_prize",
                        spriteSheet: spritesheet
                    });
                    prizeStar.setPosition({
                        x: 410,
                        y: 18
                    });
                    prizeStar.setEnabled(true);
                    prizeStar.active = true;
                    var prizeSymbol = new GAMEOBJECT('miniGame_prizeSymbol', { w: 54, h: 52 }, 2);
                    prizeSymbol.addBitmap({
                        name: 'prizeValue',
                        pos: {
                            x: this._framePosX,
                            y: this._framePosY
                        },
                        alpha: 0,
                        frame: this._prizeFrameName,
                        spriteSheet: spritesheet
                    });
                    this._prizeSymbol = prizeSymbol;
                    prizeSymbol.setTicketLabel(this._miniGamePrizeIndex);
                    prizeSymbol.setPosition({
                        x: 819,
                        y: 95
                    });
                    prizeSymbol.ballNumber = Number(this._prizeFrameName.substring(4));
                    prizeStar.addAnimation('prizePress');
                    prizeStar.setAnimation('prizePress', 'prizePress', 0.2, 0, prizeSymbol);
                    prizeStar.addAnimation('prizeReminder');
                    this._miniGamePrize = new MINIGAMEPRIZE('miniGamePrize');
                    this._miniGamePrize.setMiniGamePrize(prizeSymbol);
                    this._miniGamePrize.setMiniGamePrizeType(this._miniGamePrizeIndex);
                    var message = new GAMEOBJECT('miniGame_message', { w: 489, h: 45 }, 2, this);
                    message.addBitmap({
                        name: 'message',
                        pos: {
                            x: 0,
                            y: 0
                        },
                        alpha: 1,
                        frame: "mg1_instructions",
                        spriteSheet: spritesheet
                    });
                    message.active = false;
                    message.setPosition({
                        x: 20,
                        y: 400
                    });
                    var button = new CLICKABLEGAMEOBJECT('miniGame_button', { w: 230, h: 106 }, 8, this);
                    button.addBitmap({
                        name: "continue_button",
                        pos: {
                            x: 115,
                            y: 53
                        },
                        alpha: 0,
                        frame: "button_continue",
                        spriteSheet: spritesheet,
                        doReg: {
                            center: true
                        }
                    });
                    button.setPosition({
                        x: 155,
                        y: 430
                    });
                    button.active = false;
                    button.setEnabled(false);
                    this._setupBalls();
                };
                MiniGameOne.prototype._setupBalls = function () {
                    var spritesheet = SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"), positions = [
                        [33, 100],
                        [193, 100],
                        [353, 100]
                    ], ballX = 60, ballY = 250, self = this;
                    for (var i = 0; i < 3; i++) {
                        var turn = new CLICKABLEGAMEOBJECT('miniGame_turn_' + i, { w: 146, h: 300 }, 2, this);
                        turn.addBitmap({
                            name: "ball_dropShadow",
                            pos: {
                                x: 30,
                                y: 160
                            },
                            scale: 1,
                            frame: "mg1_glow",
                            spriteSheet: spritesheet
                        });
                        turn.addBitmap({
                            name: "ball_shadow",
                            pos: {
                                x: 24.5,
                                y: 219
                            },
                            scale: 1,
                            alpha: 0,
                            frame: "mg1_ref_green",
                            spriteSheet: spritesheet
                        });
                        turn.addBitmap({
                            name: "ball",
                            pos: {
                                x: 37,
                                y: 169
                            },
                            scale: 1.7,
                            frame: "ball1",
                            spriteSheet: spritesheet
                        });
                        turn.addBitmap({
                            name: "cup",
                            pos: {
                                x: 12,
                                y: 123
                            },
                            frame: 'mg1_cup1',
                            spriteSheet: spritesheet
                        });
                        turn.setEnabled(true);
                        turn.active = false;
                        turn.addAnimation('turnReminder');
                        turn.setAnimation('reveal', 'miniGameOne', 0.25, 0, ['cup', 'ball']);
                        turn._ballIndexNumber = i;
                        turn._ballNumber = 0;
                        turn.setAction('click', function (turn) {
                            createjs.Sound.play("minigame1cup");
                            self.checkRevealed(turn);
                        }.bind(null, turn));
                        turn.setAction('rollover', function (turn) {
                            self._stopReminderSymbol(true, turn);
                        }.bind(null, turn));
                        turn.setAction('rollout', function (turn) {
                            self._stopReminderSymbol(false, turn);
                        }.bind(null, turn));
                        this._turnsArray.push(turn);
                        turn.setPosition({
                            x: positions[i][0],
                            y: positions[i][1]
                        });
                    }
                    this._setupClicks(turn);
                };
                MiniGameOne.prototype.updateBall = function (turn) {
                    var currentBall = turn.getBitmap("ball"), reflection = turn.getBitmap("ball_shadow"), x = turn._ballNumber;
                    if (x <= 9) {
                        reflection.gotoAndStop('mg_ref_white');
                    }
                    else if (HELPER.between(x, 10, 19)) {
                        reflection.gotoAndStop('mg1_ref_blue');
                    }
                    else if (HELPER.between(x, 20, 29)) {
                        reflection.gotoAndStop('mg1_ref_red');
                    }
                    else if (HELPER.between(x, 30, 39)) {
                        reflection.gotoAndStop('mg1_ref_green');
                    }
                    else if (HELPER.between(x, 40, 49)) {
                        reflection.gotoAndStop('mg1_ref_yellow');
                    }
                    else if (HELPER.between(x, 50, 59)) {
                        reflection.gotoAndStop('mg1_erf_purple');
                    }
                    else {
                        reflection.gotoAndStop('mg1_ref_white');
                    }
                    currentBall.gotoAndStop("ball" + turn._ballNumber);
                    turn.getStage().update();
                    TweenMax.to(reflection, 1, { alpha: 1, delay: 0.5, onComplete: function () {
                        } });
                };
                MiniGameOne.prototype.checkYourBall = function (turn, mgResult) {
                    var random = Math.random();
                    if (mgResult > 0) {
                        turn.addBitmap({
                            name: "cup_shadow",
                            pos: {
                                x: 0,
                                y: -2
                            },
                            frame: 'mg1_highlight',
                            alpha: 0,
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                        });
                        turn._ballNumber = this._ballNumberArray[2];
                        TweenMax.to(turn.getBitmap('cup_shadow'), 1, { alpha: 1, delay: 0.3 });
                        turn.addAnimation('winReveal');
                        turn.setAnimation('winReveal', 'pulse', 0.5, 2, 2);
                        turn.winReveal();
                    }
                    else {
                        if (random < 0.5) {
                            turn._ballNumber = this._ballNumberArray[0];
                            this._l = true;
                        }
                        else if (random > 0.5) {
                            turn._ballNumber = this._ballNumberArray[1];
                        }
                    }
                };
                MiniGameOne.prototype.checkOtherBalls = function (turnSymbol, index, mgResult) {
                    if (mgResult > 0) {
                        turnSymbol._ballNumber = this._ballNumberArray[index];
                        turnSymbol.setAnimation('winReveal', 'fadeOut', 0.5, 2);
                        turnSymbol.winReveal();
                    }
                    else {
                        if (index === 0) {
                            if (this._l) {
                                turnSymbol._ballNumber = this._ballNumberArray[1];
                            }
                            else {
                                turnSymbol._ballNumber = this._ballNumberArray[0];
                            }
                        }
                        else if (index === 1) {
                            turnSymbol._ballNumber = this._ballNumberArray[2];
                        }
                    }
                };
                MiniGameOne.prototype.checkRevealed = function (turn) {
                    var _this = this;
                    var count = 0, delay = 1, mgResult = TICKET.getInstance().getMiniGame()[0].mGW, index = 0;
                    this.checkYourBall(turn, mgResult);
                    this.updateBall(turn);
                    turn.reveal();
                    for (var i = 0; i < this._turnsArray.length; i++) {
                        var turnSymbol = this._turnsArray[i];
                        turnSymbol.setEnabled(false);
                        turnSymbol.animationTimeLine.seek(0);
                        turnSymbol.animationTimeLine.kill();
                        if (!turnSymbol.getRevealed()) {
                            TweenMax.to(turnSymbol, delay, {
                                onStartParams: [turnSymbol, index],
                                onStart: function (turnSymbol, index) {
                                    _this.checkOtherBalls(turnSymbol, index, mgResult);
                                    _this.updateBall(turnSymbol);
                                },
                                onCompleteParams: [turnSymbol],
                                onComplete: function (turnSymbol) {
                                    turnSymbol.reveal();
                                    count++;
                                    if (count === _this._turnsArray.length - 1) {
                                        TweenMax.delayedCall(1, function () {
                                            IWG.IWGEM.trigger('endMiniGame');
                                        });
                                    }
                                }
                            });
                            index++;
                        }
                    }
                };
                MiniGameOne.prototype._endGameCheck = function () {
                    var prizeStar = this.getChildByName('miniGame_prize');
                    if (prizeStar.getRevealed() === true) {
                        this._endMiniGame();
                    }
                    else {
                        prizeStar.animate('prizePress');
                        prizeStar.animationTimeLine.seek(0);
                        prizeStar.animationTimeLine.kill();
                        createjs.Sound.play('minigamePrizePrompt');
                        this._endMiniGame();
                    }
                };
                MiniGameOne.prototype._endMiniGame = function () {
                    var _this = this;
                    var button = this.getChildByName('miniGame_button'), buttonBitmap = this.getChildByName('miniGame_button').getBitmap("continue_button"), message = this.getChildByName('miniGame_message'), messageBitmap = message.getBitmap('message');
                    message.active = true;
                    TweenMax.to(messageBitmap, 1, { alpha: 0, delay: 2, onComplete: function () {
                            if (TICKET.getInstance().getMiniGame()[0].mGW > 0) {
                                IWG.IWGEM.trigger('prizeMove');
                                createjs.Sound.play("minigameEndWin");
                                messageBitmap.gotoAndStop(_this._prizeFrameText);
                                message.setPosition({ x: _this._prizeTextPosX, y: 405 });
                            }
                            else {
                                IWG.IWGEM.trigger('prizeLose');
                                messageBitmap.gotoAndStop('mg_end_lose');
                                createjs.Sound.play("minigameEndLose");
                                message.setPosition({ x: 155, y: 412 });
                            }
                            TweenMax.to(messageBitmap, 1, { alpha: 1, delay: 1, onComplete: function () {
                                    button.active = true;
                                    message.active = false;
                                    TweenMax.to(buttonBitmap, 0.5, { alpha: 1, delay: 0.5, onComplete: function () {
                                            button.setEnabled(true);
                                            button.active = false;
                                            button.animate('buttonReminder');
                                        } });
                                } });
                        } });
                };
                MiniGameOne.prototype._setupClicks = function (turn) {
                    var prizeStar = this.getChildByName('miniGame_prize'), prizeText = this.getChildByName('miniGame_prize').getBitmap('prizeText'), button = this.getChildByName('miniGame_button'), self = this;
                    prizeStar.setAction('click', function () {
                        prizeStar.animate('prizePress');
                        prizeStar.reveal();
                        createjs.Sound.play('minigamePrizePrompt');
                        prizeStar.animationTimeLine.seek(0);
                        prizeStar.animationTimeLine.kill();
                        prizeStar.setEnabled(false);
                    }.bind(null, prizeStar));
                    button.addAnimation('buttonReminder');
                    button.setAnimation('buttonReminder', 'pulse', 1, 4);
                    button.addAnimation('click');
                    button.setAnimation('click', 'click', 0.2, 0);
                    button.setAction('click', function (button) {
                        createjs.Sound.play("minigameContinue");
                        button.animate('click');
                        IWG.IWGEM.trigger('miniGameOff');
                        button.setEnabled(false);
                    }.bind(null, button));
                    button.setAction('rollover', function (button) {
                    }.bind(null, button));
                    button.setAction('rollout', function (button) {
                    }.bind(null, button));
                };
                MiniGameOne.prototype._movePrize = function () {
                    this._miniGamePrize.movePrize();
                };
                MiniGameOne.prototype._movePrizeLose = function () {
                    this._miniGamePrize.movePrizeLose();
                };
                MiniGameOne.prototype._miniGameOn = function () {
                    var _this = this;
                    var prizeStar = this.getChildByName('miniGame_prize');
                    if (this._miniGamePrize._miniGamePrizeType === 2) {
                        this._getRandomNumber();
                    }
                    ;
                    GLOBAL.getInstance().getFromGlobal("ballTL").miniGame = true;
                    TweenMax.to(this.getDiv(), 1, { alpha: 1, delay: 1, zIndex: 7, onStart: function () {
                            prizeStar.setAnimation('prizeReminder', 'pulse', 0.75, 5);
                            prizeStar.animate('prizeReminder');
                            for (var i = 0; i < _this._turnsArray.length; i++) {
                                var turn = _this._turnsArray[i];
                                turn.setAnimation('turnReminder', 'pulse', 0.75, 5);
                                turn.animate('turnReminder');
                            }
                            ;
                        } });
                };
                MiniGameOne.prototype._getRandomNumber = function () {
                    var ballArray = GLOBAL.getInstance().getFromGlobal('ballSelection');
                    while (HELPER.isInArray(this._randNum, ballArray)) {
                        this._randNum = Math.round(HELPER.getRandomNumber(1, 59));
                    }
                    ;
                    this._prizeFrameName = "ball" + this._randNum;
                    this._prizeSymbol.ballNumber = this._randNum;
                    this._prizeSymbol.updateBitmap("prizeValue", this._prizeFrameName);
                };
                MiniGameOne.prototype._miniGameOff = function () {
                    TweenMax.to(this.getDiv(), 1, { alpha: 0, delay: 1, zIndex: 1, onComplete: function () {
                            IWG.IWGEM.trigger('resumeBallDrop');
                            GLOBAL.getInstance().getFromGlobal("ballTL").miniGame = false;
                        } });
                };
                MiniGameOne.prototype._stopReminderSymbol = function (reset, turn) {
                    for (var i = 0; i < this._turnsArray.length; i++) {
                        var turns = this._turnsArray[i];
                        if (!turns.getRevealed()) {
                            if (reset) {
                                turns.animationTimeLine.seek(0);
                                turns.animationTimeLine.kill();
                            }
                            else {
                                turns.animationTimeLine.restart();
                            }
                        }
                    }
                };
                return MiniGameOne;
            })(iwg.Scene);
            iwg.MiniGameOne = MiniGameOne;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
