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
            var MiniGameTwo = (function (_super) {
                __extends(MiniGameTwo, _super);
                function MiniGameTwo(_name) {
                    _super.call(this, _name);
                    this._turnsArray = [];
                    this._buttonArray = [];
                    this._turnSymbolArray = [];
                    this._miniGamePrizeIndex = TICKET.getInstance().getMiniGame()[0].mGR;
                    this._prizeFrameName = '';
                    this._prizeFrameText = '';
                    this._framePosX = null;
                    this._framePosY = null;
                    this._prizeTextPosX = null;
                    this._prizeTextPosY = 350;
                    this._randNum = Math.round(HELPER.getRandomNumber(1, 59));
                    this._prizeSymbol = null;
                    this._ballNumberArray = TICKET.getInstance().getMiniGame()[0].mGN.split(',').map(Number);
                    this._l = false;
                    this._extendSubscribe();
                    this._setupLayout();
                }
                MiniGameTwo.prototype._extendSubscribe = function () {
                    IWG.IWGEM.on('endMiniGame', this._endGameCheck.bind(this));
                    IWG.IWGEM.on('miniGameOn', this._miniGameOn.bind(this));
                    IWG.IWGEM.on('miniGameOff', this._miniGameOff.bind(this));
                    IWG.IWGEM.on('prizeMove', this._movePrize.bind(this));
                    IWG.IWGEM.on('prizeLose', this._movePrizeLose.bind(this));
                    IWG.IWGEM.on('finishButtonMove', this._prizeReveal.bind(this));
                };
                MiniGameTwo.prototype._extendUnsubscribe = function () {
                    IWG.IWGEM.off('endMiniGame');
                    IWG.IWGEM.off('miniGameOn');
                    IWG.IWGEM.off('miniGameOff');
                    IWG.IWGEM.off('prizeMove');
                    IWG.IWGEM.off('finishButtonMove');
                    IWG.IWGEM.off('prizeLose');
                };
                MiniGameTwo.prototype._getCorrectPrizeSymbol = function () {
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
                MiniGameTwo.prototype._setupLayout = function () {
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
                    var or = new GAMEOBJECT('miniGame_or', { w: 29, h: 14 }, 2, this);
                    or.addBitmap({
                        name: 'or',
                        pos: {
                            x: 0,
                            y: 0
                        },
                        frame: "mg2_word_or",
                        spriteSheet: spritesheet
                    });
                    or.setPosition({
                        x: 250,
                        y: 310
                    });
                    var message = new GAMEOBJECT('miniGame_message', { w: 492, h: 45 }, 2, this);
                    message.addBitmap({
                        name: 'message',
                        pos: {
                            x: 0,
                            y: 0
                        },
                        frame: "mg2_instructions",
                        spriteSheet: spritesheet
                    });
                    message.active = false;
                    message.setPosition({
                        x: 30,
                        y: 380
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
                MiniGameTwo.prototype._setupBalls = function () {
                    var spritesheet = SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"), buttonArray = ['mg2_hi', 'mg2_lo'], positions = [
                        [120, 110],
                        [270, 110],
                    ], buttonPositions = [
                        [105, 250],
                        [310, 250],
                    ], self = this;
                    for (var i = 0; i < 2; i++) {
                        var turn = new GAMEOBJECT('miniGame_ball_' + i, { w: 146, h: 146 }, 2, this);
                        turn.addBitmap({
                            name: "ball_dropShadow",
                            pos: {
                                x: 27,
                                y: 22
                            },
                            scale: 1,
                            frame: "mg1_glow",
                            spriteSheet: spritesheet
                        });
                        turn.addBitmap({
                            name: "ball",
                            pos: {
                                x: 35,
                                y: 30
                            },
                            scale: 1.7,
                            frame: 'ball_grey',
                            spriteSheet: spritesheet
                        });
                        turn.setPosition({
                            x: positions[i][0],
                            y: positions[i][1]
                        });
                        turn._ballIndexNumber = i;
                        turn._ballNumber = 0;
                        this._turnsArray.push(turn);
                        var hilo = new CLICKABLEGAMEOBJECT('miniGame_' + buttonArray[i], { w: 118, h: 118 }, 2, this);
                        hilo.addBitmap({
                            name: "cup",
                            pos: {
                                x: 0,
                                y: 0
                            },
                            frame: buttonArray[i],
                            spriteSheet: spritesheet
                        });
                        hilo.setEnabled(true);
                        hilo.active = false;
                        hilo.setPosition({
                            x: buttonPositions[i][0],
                            y: buttonPositions[i][1]
                        });
                        hilo.addAnimation('hiloPress');
                        hilo.addAnimation('hiloReminder');
                        hilo.setAnimation('hiloPress', 'hiloPress', 0.25, 0, 'miniGameTwo');
                        hilo._buttonNumber = i;
                        hilo.setAction('click', function (hilo) {
                            hilo.animate('hiloPress');
                            createjs.Sound.play('minigame2Button');
                            self._hiloEnable(false, hilo);
                            self.checkRevealed(turn, hilo);
                        }.bind(null, hilo));
                        hilo.setAction('rollover', function (hilo) {
                            self._stopReminderSymbol(true, hilo);
                        }.bind(null, hilo));
                        hilo.setAction('rollout', function (hilo) {
                            self._stopReminderSymbol(false, hilo);
                        }.bind(null, hilo));
                        this._buttonArray.push(hilo);
                    }
                    this._setupClicks();
                    this._setFirstBall();
                };
                MiniGameTwo.prototype.updateBall = function (turn) {
                    var currentBall = turn.getBitmap("ball");
                    currentBall.gotoAndStop("ball" + turn._ballNumber);
                };
                MiniGameTwo.prototype.checkYourBall = function (yourBall, mgResult, hilo) {
                    if (mgResult > 0) {
                        if (hilo._buttonNumber === 0) {
                            yourBall._ballNumber = this._ballNumberArray[2];
                        }
                        else {
                            yourBall._ballNumber = this._ballNumberArray[0];
                        }
                        this._turnsArray[0].setAnimation('winReveal', 'fadeOut', 0.5, 2);
                        yourBall.setAnimation('winReveal', 'pulse', 0.5, 3, 2.5);
                    }
                    else {
                        if (hilo._buttonNumber === 0) {
                            yourBall._ballNumber = this._ballNumberArray[0];
                        }
                        else {
                            yourBall._ballNumber = this._ballNumberArray[2];
                        }
                    }
                };
                MiniGameTwo.prototype._prizeReveal = function () {
                    var _this = this;
                    var mgResult = TICKET.getInstance().getMiniGame()[0].mGW;
                    var yourBall = this.getChildByName('miniGame_ball_1');
                    yourBall.getStage().update();
                    yourBall.reveal();
                    if (mgResult > 0) {
                        TweenMax.delayedCall(0.5, function () {
                            yourBall.winReveal();
                            _this._turnsArray[0].animate('winReveal');
                            TweenMax.delayedCall(1, function () {
                                IWG.IWGEM.trigger('endMiniGame');
                            });
                        });
                    }
                    else {
                        TweenMax.delayedCall(1, function () {
                            IWG.IWGEM.trigger('endMiniGame');
                        });
                    }
                };
                MiniGameTwo.prototype._setFirstBall = function () {
                    var firstBall = this.getChildByName('miniGame_ball_0');
                    firstBall._ballNumber = this._ballNumberArray[1];
                    this.updateBall(firstBall);
                };
                MiniGameTwo.prototype.checkRevealed = function (turn, hilo) {
                    var count = 0, delay = 1, mgResult = TICKET.getInstance().getMiniGame()[0].mGW, index = 0;
                    this.checkYourBall(turn, mgResult, hilo);
                    this.updateBall(turn);
                };
                MiniGameTwo.prototype._endGameCheck = function () {
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
                MiniGameTwo.prototype._endMiniGame = function () {
                    var _this = this;
                    var button = this.getChildByName('miniGame_button'), buttonBitmap = this.getChildByName('miniGame_button').getBitmap("continue_button"), message = this.getChildByName('miniGame_message'), messageBitmap = message.getBitmap('message');
                    message.active = true;
                    TweenMax.to(messageBitmap, 1, { alpha: 0, delay: 2, onComplete: function () {
                            if (TICKET.getInstance().getMiniGame()[0].mGW > 0) {
                                IWG.IWGEM.trigger('prizeMove');
                                createjs.Sound.play("minigameEndWin");
                                messageBitmap.gotoAndStop(_this._prizeFrameText);
                                message.setPosition({ x: _this._prizeTextPosX, y: 370 });
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
                MiniGameTwo.prototype._hiloEnable = function (enable, hilo) {
                    var orText = this.getChildByName('miniGame_or'), fadeButton;
                    orText.addAnimation('orFade');
                    orText.setAnimation('orFade', 'fadeOff', 0.3, 1);
                    if (hilo._buttonNumber === 0) {
                        fadeButton = this._buttonArray[1];
                    }
                    else {
                        fadeButton = this._buttonArray[0];
                    }
                    for (var i = 0; i < this._buttonArray.length; i++) {
                        var button = this._buttonArray[i];
                        if (enable) {
                            button.setEnabled(true);
                            button.active = true;
                            button.animate('hiloReminder');
                        }
                        else {
                            button.setEnabled(false);
                            fadeButton.addAnimation('fadeOff');
                            fadeButton.setAnimation('fadeOff', 'fadeOff', 0.3, 1);
                            orText.animate('orFade');
                            fadeButton.animate('fadeOff');
                            button.active = false;
                            button.animationTimeLine.seek(0);
                            button.animationTimeLine.kill();
                        }
                    }
                };
                MiniGameTwo.prototype._setupClicks = function () {
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
                MiniGameTwo.prototype._movePrize = function () {
                    this._miniGamePrize.movePrize();
                };
                MiniGameTwo.prototype._movePrizeLose = function () {
                    this._miniGamePrize.movePrizeLose();
                };
                MiniGameTwo.prototype._miniGameOn = function () {
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
                            for (var i = 0; i < _this._buttonArray.length; i++) {
                                var turn = _this._buttonArray[i];
                                turn.setAnimation('hiloReminder', 'pulse', 0.75, 5);
                                turn.animate('hiloReminder');
                            }
                            ;
                        } });
                };
                MiniGameTwo.prototype._getRandomNumber = function () {
                    var ballArray = GLOBAL.getInstance().getFromGlobal('ballSelection');
                    while (HELPER.isInArray(this._randNum, ballArray)) {
                        this._randNum = Math.round(HELPER.getRandomNumber(1, 59));
                    }
                    ;
                    this._prizeFrameName = "ball" + this._randNum;
                    this._prizeSymbol.ballNumber = this._randNum;
                    this._prizeSymbol.updateBitmap("prizeValue", this._prizeFrameName);
                };
                MiniGameTwo.prototype._miniGameOff = function () {
                    TweenMax.to(this.getDiv(), 1, { alpha: 0, delay: 1, zIndex: 1, onComplete: function () {
                            IWG.IWGEM.trigger('resumeBallDrop');
                            GLOBAL.getInstance().getFromGlobal("ballTL").miniGame = false;
                        } });
                };
                MiniGameTwo.prototype._stopReminderSymbol = function (reset, turn) {
                    for (var i = 0; i < this._buttonArray.length; i++) {
                        var turns = this._buttonArray[i];
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
                return MiniGameTwo;
            })(iwg.Scene);
            iwg.MiniGameTwo = MiniGameTwo;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
