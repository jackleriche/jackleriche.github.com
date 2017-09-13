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
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GAMEOBJECT = IWG.GameObject, ANIMATION = IWG.Animation, SPRITESHEETS = IWG.SpriteSheets, TICKET = IWG.Ticket, images = CORE.iwgLoadQ.images;
            var EndGame = (function (_super) {
                __extends(EndGame, _super);
                function EndGame(_name, _dimensions, _zindex) {
                    if (_dimensions === void 0) { _dimensions = { w: 0, h: 0 }; }
                    if (_zindex === void 0) { _zindex = 20; }
                    _super.call(this, _name, _dimensions, _zindex);
                    this._endgameMessageProperties = {};
                    this._endgameDisplayed = false;
                    this._wager = CORE.IWG.ame('get', { vars: ['iwgIsWager'] });
                    this._subscribeEndGame();
                }
                EndGame.prototype._subscribeEndGame = function () {
                    IWG.IWGEM.on('endGameStart', this.endGameSetup.bind(this));
                    IWG.IWGEM.on('endGameShown', this.endGameSound.bind(this));
                };
                EndGame.prototype._unsubscribeEndGame = function () {
                    IWG.IWGEM.off('endGameStart');
                };
                EndGame.prototype.createEndGame = function () {
                    var _this = this;
                    var spriteSheet = SPRITESHEETS.getInstance().getSpriteSheet("mouseTrap");
                    this.addBitmap({
                        name: "endGameBackground",
                        pos: { x: 0, y: 0 },
                        spriteSheet: spriteSheet,
                        frame: "bg_endgame",
                        scale: 1,
                        doReg: { center: false }
                    });
                    this.addBitmap({
                        name: "endGameMessage",
                        pos: { x: 157, y: 53 },
                        spriteSheet: spriteSheet,
                        frame: "end_congrats",
                        scale: 1,
                        doReg: { center: true }
                    });
                    this.addBitmap({
                        name: "endGameAmount",
                        pos: { x: 150, y: 95 },
                        spriteSheet: spriteSheet,
                        frame: "end_2",
                        scale: 1,
                        doReg: { center: true }
                    });
                    this.addBitmap({
                        name: "finishButton",
                        pos: { x: 145, y: 138 },
                        spriteSheet: spriteSheet,
                        frame: "button_finish",
                        scale: 1,
                        doReg: { center: true }
                    });
                    this.setAction("click", function () {
                        _this.setEnabled(false);
                        //CORE.IWG.ame('closeGame');
                        top.location.href = "http://www.sideplay.com/portfolio/game/117/Mousetrap";
                    });
                    this.addAnimation("showEndGame");
                    this.setAnimation("showEndGame", "show_endGame", 0.25, 2);
                    this.addAnimation("finishPulse");
                    this.setAnimation("finishPulse", "endGame_finish", 0.75, 3);
                };
                EndGame.prototype.endGameSound = function () {
                    var isWinner = TICKET.getInstance().getParams().wT;
                    if (this._wager) {
                        if (isWinner) {
                            createjs.Sound.play("yipee");
                        }
                        else {
                            createjs.Sound.play("end_lose");
                        }
                    }
                    else {
                        createjs.Sound.play("end_lose");
                    }
                };
                EndGame.prototype.endGameSetup = function () {
                    var endGameMessageClip = this.getBitmap('endGameMessage');
                    var endGameAmountClip = this.getBitmap('endGameAmount');
                    var endFinishButton = this.getBitmap('finishButton');
                    var amount = TICKET.getInstance().getOutcome().amount;
                    var isWinner = TICKET.getInstance().getParams().wT;
                    if (this._wager) {
                        if (isWinner) {
                            endGameMessageClip.gotoAndStop("end_congrats");
                            endGameAmountClip.gotoAndStop("end_" + amount);
                        }
                        else {
                            endGameMessageClip.gotoAndStop("end_lose");
                            endGameMessageClip.x = 190;
                            endGameMessageClip.y = 75;
                            endGameAmountClip.visible = false;
                        }
                    }
                    else {
                        endFinishButton.y = 80;
                        endFinishButton.x = 150;
                        endGameMessageClip.visible = false;
                        endGameAmountClip.visible = false;
                    }
                    this.getStage().update();
                    this.animate("showEndGame");
                    this.animate("finishPulse");
                    this.setEnabled(true);
                };
                EndGame.prototype.destroy = function () {
                    console.log('destroying Endgame');
                    _super.prototype.destroy.call(this);
                    this._unsubscribeEndGame();
                };
                return EndGame;
            })(iwg.ClickableGameObject);
            iwg.EndGame = EndGame;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
//# sourceMappingURL=EndGame.js.map