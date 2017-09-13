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
            var BonusStar = (function (_super) {
                __extends(BonusStar, _super);
                function BonusStar(_name) {
                    _super.call(this, _name);
                    this._legend = new LEGEND();
                    this._bonusStars = [];
                    this._subscribeBonusStar();
                    this._legend.setSequential(true);
                    this._setupLayout();
                    this._boardOn();
                }
                BonusStar.prototype._subscribeBonusStar = function () {
                    IWG.IWGEM.on('bonusStar', this._bonusStar.bind(this));
                };
                ;
                BonusStar.prototype._setupLayout = function () {
                    var bonusStarsText = new GAMEOBJECT('bonusStarsText', { w: 131, h: 24 }, 3, this);
                    bonusStarsText.addBitmap({
                        name: "bonusStarsText",
                        pos: {
                            x: 65,
                            y: 12
                        },
                        frame: "title_bonusstars",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                        doReg: {
                            center: true
                        }
                    });
                    bonusStarsText.setPosition({
                        x: 20,
                        y: 0
                    });
                    for (var i = 0; i < 3; i++) {
                        var star = new GAMEOBJECT("star" + i, { w: 54, h: 54 }, 3, this);
                        star.addBitmap({
                            name: "star_shadow",
                            pos: {
                                x: 27,
                                y: 28
                            },
                            frame: "star_glow",
                            alpha: 0,
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                            doReg: {
                                center: true
                            }
                        });
                        star.addBitmap({
                            name: "star" + i,
                            pos: {
                                x: 27,
                                y: 27
                            },
                            frame: "star_grey",
                            spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                            doReg: {
                                center: true
                            }
                        });
                        star.setPosition({
                            x: (59 * i),
                            y: 20
                        });
                        star.setTicketLabel('star');
                        star.setAnimation('reveal', 'bonusStarReveal');
                        this._bonusStars.push(star);
                    }
                    ;
                    var prizeAsset = new GAMEOBJECT('prizeAmount', { w: 44, h: 32 }, 3, this);
                    prizeAsset.addBitmap({
                        name: "prizeAmount",
                        pos: {
                            x: 22,
                            y: 16
                        },
                        frame: "bn_blue10",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                        doReg: {
                            center: true
                        }
                    });
                    prizeAsset.addBitmap({
                        name: "prizeAmount_win",
                        pos: {
                            x: 22,
                            y: 16
                        },
                        frame: "bn_star_win10",
                        alpha: 0,
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                        doReg: {
                            center: true
                        }
                    });
                    prizeAsset.setPosition({
                        x: 63,
                        y: 70
                    });
                    prizeAsset.setAnimation('winReveal', "bonusStarsWin", 1, 2, this._bonusStars);
                    this._legend.addRow({
                        prizeValue: 10,
                        prize: prizeAsset,
                        icons: this._bonusStars
                    });
                };
                BonusStar.prototype._bonusStar = function () {
                    this._legend.updateLegend("star");
                    createjs.Sound.play('bonusWin');
                };
                BonusStar.prototype._boardOn = function () {
                    TweenMax.to(this.getDiv(), 0.5, { alpha: 1, delay: 1 });
                };
                return BonusStar;
            })(iwg.Scene);
            iwg.BonusStar = BonusStar;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
