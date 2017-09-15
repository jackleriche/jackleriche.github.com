var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="Scene.ts" />
/// <reference path="GameObject.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GAMEOBJECT = IWG.GameObject, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, TICKET = IWG.Ticket, SPRITESHEETS = IWG.SpriteSheets;
            var EndGame = (function (_super) {
                __extends(EndGame, _super);
                function EndGame(_name) {
                    _super.call(this, _name);
                    this._wager = CORE.IWG.ame('get', { vars: ['iwgIsWager'] });
                    this._amount = TICKET.getInstance().getOutcome().amount;
                    this._isWinner = Number(TICKET.getInstance().getParams().wT);
                    this._endGameLayout();
                    this._subscribeEndGame();
                }
                EndGame.prototype._subscribeEndGame = function () {
                    IWG.IWGEM.on('showEndGame', this._showEndGame.bind(this));
                };
                EndGame.prototype._showEndGame = function () {
                    TweenMax.to(this.getDiv(), 1, { scale: 1, alpha: 1, ease: Bounce.easeOut });
                    IWG.IWGEM.trigger('disableCard');
                };
                EndGame.prototype._endGameLayout = function () {
                    var endGameBackground = new GAMEOBJECT("endGameBackground", { w: 276, h: 119 }, 1, this);
                    endGameBackground.addBitmap({
                        name: "background",
                        pos: {
                            x: 138,
                            y: 59
                        },
                        frame: "end_bg",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                        doReg: {
                            center: true
                        }
                    });
                    var endGameButton = new CLICKABLEGAMEOBJECT("endGameButton", { w: 188, h: 81 }, 1, this);
                    endGameButton.addBitmap({
                        name: "button",
                        pos: {
                            x: 94,
                            y: 40
                        },
                        frame: "button_finish",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                        doReg: {
                            center: true
                        }
                    });
                    endGameButton.setPosition({
                        x: 45,
                        y: 90
                    });
                    endGameButton.setEnabled(true);
                    var tl = new TimelineMax({ repeat: -1, delay: 4 });
                    tl.add(TweenMax.to(endGameButton.getCanvas(), 1, { scaleX: 1.1, scaleY: 1.1 }), "down");
                    tl.add(TweenMax.to(endGameButton.getCanvas(), 1, { scaleX: 1, scaleY: 1 }), "up");
                    endGameButton.animationTimeLine = tl;
                    endGameButton.setAction('click', function () {
                        endGameButton.setEnabled(false);
                        top.location.href = "http://www.sideplay.com/portfolio/game/93/Frosty%20Bingo%20Doubler";    
                    });
                    var endTextFrame = null, endTextPos = {
                        x: 39,
                        y: 10
                    };
                    if (this._wager) {
                        if (this._isWinner === 1) {
                            endTextFrame = "end_congrats";
                        }
                        else {
                            endTextFrame = "end_lose";
                            endTextPos.y = 30;
                        }
                        ;
                    }
                    else {
                        endTextFrame = "end_trial";
                        endTextPos.y = 30;
                    }
                    ;
                    var endGameText = new GAMEOBJECT("endGameText", { w: 200, h: 50 }, 1, this);
                    endGameText.addBitmap({
                        name: "button",
                        pos: {
                            x: 100,
                            y: 25
                        },
                        frame: endTextFrame,
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                        doReg: {
                            center: true
                        }
                    });
                    endGameText.setPosition({
                        x: endTextPos.x,
                        y: endTextPos.y
                    });
                    if (this._isWinner === 1 && this._wager) {
                        var endGameAmount = new GAMEOBJECT("endGameAmount", { w: 193, h: 35 }, 1, this);
                        endGameAmount.addBitmap({
                            name: "button",
                            pos: {
                                x: 97,
                                y: 18
                            },
                            frame: "end_" + this._amount,
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                            doReg: {
                                center: true
                            }
                        });
                        endGameAmount.setPosition({
                            x: 41,
                            y: 60
                        });
                    }
                    ;
                };
                return EndGame;
            })(iwg.Scene);
            iwg.EndGame = EndGame;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
