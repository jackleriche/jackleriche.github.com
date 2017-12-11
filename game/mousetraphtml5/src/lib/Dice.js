/// <reference path="../../../typings/tsd.d.ts" />
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
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GAMEOBJECT = IWG.GameObject, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, SPRITESHEETS = IWG.SpriteSheets, ANIMATION = IWG.Animation, images = CORE.iwgLoadQ.images, TICKET = IWG.Ticket, BOARD = IWG.Board, GLOBAL = IWG.Global;
            var Dice = (function (_super) {
                __extends(Dice, _super);
                function Dice(_name, _dimensions, _zindex) {
                    if (_dimensions === void 0) { _dimensions = { w: 0, h: 0 }; }
                    if (_zindex === void 0) { _zindex = 3; }
                    _super.call(this, _name, _dimensions, _zindex);
                    this.extraTurnOn = false;
                    this.rollsLeft = 6;
                    this.diceNumber = -1;
                    this.previousDiceNumber = 1;
                    this.rolling = false;
                    this._subscribeDice();
                }
                Dice.prototype._subscribeDice = function () {
                    IWG.IWGEM.on('rollAgainLanded', this.extraTurn.bind(this));
                    IWG.IWGEM.on('diceSpinTop', this.diceUp.bind(this));
                    IWG.IWGEM.on('counterMoved', this.dicePipUpdate.bind(this));
                };
                Dice.prototype._unsubscribeDice = function () {
                    IWG.IWGEM.off('rollAgainLanded');
                    IWG.IWGEM.off('diceSpinTop');
                };
                Dice.prototype.getInstance = function () {
                    return this;
                };
                Dice.prototype.setEnabled = function (bool) {
                    var _this = this;
                    if (bool === false) {
                        _super.prototype.setEnabled.call(this, bool);
                    }
                    ;
                    TweenMax.delayedCall(1, function () {
                        if (bool) {
                            _this.starAnimationClip.alpha = 1;
                            _this.dicePipReset();
                            _super.prototype.setEnabled.call(_this, bool);
                        }
                        else {
                            _this.starAnimationClip.alpha = 0;
                        }
                    });
                };
                Dice.prototype.setupDice = function () {
                    var _this = this;
                    var spriteSheet = SPRITESHEETS.getInstance().getSpriteSheet("mouseTrap");
                    var diceSpriteSheet = SPRITESHEETS.getInstance().getSpriteSheet("mouseTrapDice");
                    this.addBitmap({
                        name: 'rollAgainShadow',
                        pos: { x: 160, y: 100 },
                        spriteSheet: spriteSheet,
                        frame: "plusone_shadow",
                        scale: 1,
                        doReg: { center: true }
                    });
                    this.addBitmap({
                        name: 'rollAgain',
                        pos: { x: 160, y: 100 },
                        spriteSheet: spriteSheet,
                        frame: "plusone_cog",
                        scale: 1,
                        doReg: { center: true }
                    });
                    this.addBitmap({
                        name: 'rollAgainNumber',
                        pos: { x: 160, y: 100 },
                        spriteSheet: spriteSheet,
                        frame: "plusone",
                        scale: 1,
                        doReg: { center: true }
                    });
                    this.addBitmap({
                        name: 'rollsBG',
                        pos: { x: 0, y: 30 },
                        spriteSheet: spriteSheet,
                        frame: "bg_rollsleft",
                        scale: 1,
                        doReg: { center: false }
                    });
                    this.addBitmap({
                        name: 'rollsLeft',
                        pos: { x: 40, y: 55 },
                        spriteSheet: spriteSheet,
                        frame: "rollsleft",
                        scale: 1,
                        doReg: { center: false }
                    });
                    this.addBitmap({
                        name: 'rollNumber',
                        pos: { x: 33, y: 68 },
                        spriteSheet: spriteSheet,
                        frame: "roll_6",
                        scale: 1,
                        doReg: { center: true }
                    });
                    this.addBitmap({
                        name: 'diceBGShadow',
                        pos: { x: 163, y: 103 },
                        spriteSheet: spriteSheet,
                        frame: "cog_dice_shadow",
                        scale: 1,
                        doReg: { center: true }
                    });
                    this.addBitmap({
                        name: 'diceBG',
                        pos: { x: 160, y: 100 },
                        spriteSheet: spriteSheet,
                        frame: "cog_dice",
                        scale: 1,
                        doReg: { center: true }
                    });
                    this.addBitmap({
                        name: 'diceStar',
                        pos: { x: 160, y: 100 },
                        spriteSheet: spriteSheet,
                        frame: "dice_spinner",
                        scale: 1,
                        doReg: { center: true }
                    });
                    this.addBitmap({
                        name: 'diceRollNumber',
                        pos: { x: 160, y: 100 },
                        spriteSheet: spriteSheet,
                        frame: "roll_0",
                        scale: 1,
                        doReg: { center: true }
                    });
                    this.addBitmap({
                        name: 'diceAnimation',
                        pos: { x: 164, y: 103 },
                        spriteSheet: diceSpriteSheet,
                        frame: "dice_roll_1",
                        scale: 1,
                        doReg: { center: true }
                    });
                    this.addAnimation("rollAgainOn");
                    this.setAnimation("rollAgainOn", "roll_again_out", 0.5, 0);
                    this.addAnimation("rollAgainOff");
                    this.setAnimation("rollAgainOff", "roll_again_in", 0.5, 0);
                    this.addAnimation("rollDice");
                    this.addAnimation("starSpin");
                    this.setAnimation("starSpin", "spin_star", 5, 0);
                    this.addAnimation("diceScale");
                    this.animate("starSpin");
                    this.starAnimationClip = this.getBitmap("diceStar");
                    this.diceAnimationClip = this.getBitmap("diceAnimation");
                    this.active = true;
                    this.diceAnimationClip.on("change", function (evt) {
                        var currentFlipFrame = _this.diceAnimationClip.currentAnimationFrame;
                        if (currentFlipFrame == 20) {
                            IWG.IWGEM.trigger('diceSpinTop');
                        }
                    });
                    this.getBitmap("diceAnimation").addEventListener('animationend', function () {
                        _this.rolling = false;
                    });
                    this.setAction("click", function () {
                        _this.setEnabled(false);
                        IWG.IWGEM.trigger('diceRollStarted');
                        createjs.Sound.play("scratch2");
                        TweenMax.delayedCall(0.2, function () {
                            _this.updateDiceRoll();
                            _this.rollDice();
                        });
                    });
                    this.setAction("rollover", function () {
                        _this.setAnimation("diceScale", "dice_scale", 0.3, 0, true);
                        _this.animate("diceScale");
                    });
                    this.setAction("rollout", function () {
                        _this.setAnimation("diceScale", "dice_scale", 0.3, 0, false);
                        _this.animate("diceScale");
                    });
                    this.setPosition({ x: 475, y: 325 });
                    this.setEnabled(true);
                };
                Dice.prototype.rollDice = function () {
                    this.active = true;
                    this.rolling = true;
                    GLOBAL.getInstance().addToGlobal("dice", this);
                    iwg.Board.totalTurns++;
                    this.diceAnimationClip.scaleX = 1;
                    this.diceAnimationClip.scaleY = 1;
                    this.updateDiceRollNumber();
                    this.previousDiceNumber = this.diceNumber;
                    this.diceNumber = TICKET.getInstance().getTurn(iwg.Board.totalTurns).d1;
                    this.setAnimation("rollDice", "roll_dice", 0.5, 0, [this.previousDiceNumber]);
                    this.animate("rollDice");
                };
                Dice.prototype.updateDiceRoll = function () {
                    var rollNumberClip = this.getBitmap("rollNumber");
                    var rollsLeft = this.getBitmap('rollsLeft');
                    if (this.extraTurnOn) {
                        this.animate("rollAgainOff");
                        this.extraTurnOn = false;
                    }
                    else {
                        this.rollsLeft--;
                        rollNumberClip.gotoAndStop("roll_" + this.rollsLeft);
                    }
                    if (this.rollsLeft === 1) {
                        rollsLeft.gotoAndStop("rollleft");
                    }
                    else {
                        rollsLeft.gotoAndStop("rollsleft");
                    }
                    this.getStage().update();
                };
                Dice.prototype.dicePipUpdate = function () {
                    this.diceAnimationClip.advance();
                };
                Dice.prototype.dicePipSet = function () {
                    var currentDiceNumPipAnimName = "dice_end_" + this.diceNumber + "_pips";
                    this.diceAnimationClip.gotoAndStop(currentDiceNumPipAnimName);
                };
                Dice.prototype.dicePipReset = function () {
                    this.diceAnimationClip.gotoAndStop("dice_end_" + this.diceNumber + "_pips");
                };
                Dice.prototype.diceDown = function () {
                    this.dicePipSet();
                    IWG.IWGEM.trigger('startTurn');
                    createjs.Sound.play("dice");
                };
                Dice.prototype.diceUp = function () {
                    this.diceAnimationClip.gotoAndPlay("dice_end_" + this.diceNumber);
                    this.diceDown();
                };
                Dice.prototype.extraTurn = function () {
                    this.extraTurnOn = true;
                    this.animate("rollAgainOn");
                };
                Dice.prototype.updateDiceRollNumber = function () {
                    var diceRollNumberClip = this.getBitmap("diceRollNumber");
                    diceRollNumberClip.gotoAndStop("roll_" + this.diceNumber);
                };
                Dice.prototype.destroy = function () {
                    console.log('destroying Dice');
                    this._unsubscribeDice();
                    _super.prototype.destroy.call(this);
                };
                return Dice;
            })(iwg.ClickableGameObject);
            iwg.Dice = Dice;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
//# sourceMappingURL=Dice.js.map