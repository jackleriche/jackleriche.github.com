var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="Scene.ts" />
/// <reference path="GameObject.ts" />
/// <reference path="ClickableGameObject.ts" />
/// <reference path="Pin.ts" />
/// <reference path="Helper.ts" />
/// <reference path="Legend.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GLOBAL = IWG.Global, HELPER = IWG.Helper, GAMEOBJECT = IWG.GameObject, LEGEND = IWG.Legend, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, SPRITESHEETS = IWG.SpriteSheets;
            var InstantWin = (function (_super) {
                __extends(InstantWin, _super);
                function InstantWin(_name) {
                    _super.call(this, _name);
                    this._legend = new LEGEND();
                    this._subscribeInstantWin();
                    this._setupLayout();
                    this._legend.setSequential(true);
                    this._boardOn();
                }
                InstantWin.prototype._subscribeInstantWin = function () {
                    IWG.IWGEM.on('instantWin', this._instantWin.bind(this));
                };
                InstantWin.prototype._setupLayout = function () {
                    var instantWinText = new GAMEOBJECT('instantPrizeText', { w: 140, h: 24 }, 3, this);
                    instantWinText.addBitmap({
                        name: "instantWinText",
                        pos: {
                            x: 70,
                            y: 12
                        },
                        frame: "title_instantprize",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                        doReg: {
                            center: true
                        }
                    });
                    instantWinText.setPosition({
                        x: 0,
                        y: 0
                    });
                    var instantPrize = new GAMEOBJECT("instantPrize", { w: 56, h: 56 }, 3, this);
                    instantPrize.addBitmap({
                        name: "instantPrize",
                        pos: {
                            x: 28,
                            y: 28
                        },
                        frame: "iw_circle_grey",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                        doReg: {
                            center: true
                        }
                    });
                    instantPrize.setPosition({
                        x: 35,
                        y: 30
                    });
                    instantPrize.setTicketLabel('instantWin');
                    instantPrize.setAnimation('reveal', 'instantReveal');
                    var instantWinPrizeAmount = new GAMEOBJECT("instantWinPrizeAmount", { w: 56, h: 56 }, 3, this);
                    instantWinPrizeAmount.addBitmap({
                        name: "instantWinPrizeAmount",
                        pos: {
                            x: 28,
                            y: 28
                        },
                        frame: "iw_large3",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                        doReg: {
                            center: true
                        }
                    });
                    instantWinPrizeAmount.setScale(0, 0);
                    instantWinPrizeAmount.setPosition({
                        x: 35,
                        y: 30
                    });
                    instantWinPrizeAmount.setAnimation('winReveal', 'instantPrizeReveal');
                    this._legend.addRow({
                        prizeValue: 3,
                        prize: instantWinPrizeAmount,
                        icons: [instantPrize]
                    });
                };
                InstantWin.prototype._instantWin = function (amount) {
                    var prizeAmount = this.getChildByName('instantWinPrizeAmount');
                    prizeAmount.getBitmap('instantWinPrizeAmount').gotoAndStop('iw_large' + amount);
                    prizeAmount.getStage().update();
                    this._legend.getRow(0).prizeValue = amount;
                    this._legend.updateLegend("instantWin");
                };
                InstantWin.prototype._boardOn = function () {
                    TweenMax.to(this.getDiv(), 0.5, { alpha: 1, delay: 1 });
                };
                return InstantWin;
            })(iwg.Scene);
            iwg.InstantWin = InstantWin;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
//# sourceMappingURL=InstantWin.js.map