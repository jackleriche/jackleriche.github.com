/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="GameObject.ts" />
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
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GAMEOBJECT = IWG.GameObject, ANIMATION = IWG.Animation, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, SPRITESHEETS = IWG.SpriteSheets, images = CORE.iwgLoadQ.images;
            var Tile = (function (_super) {
                __extends(Tile, _super);
                function Tile(_name, _tokenNumber, _tokenName, _frameName, _dimensions, _zindex) {
                    if (_dimensions === void 0) { _dimensions = { w: 0, h: 0 }; }
                    if (_zindex === void 0) { _zindex = 1; }
                    _super.call(this, _name, _dimensions, _zindex);
                    this._tokenNumber = _tokenNumber;
                    this._tokenName = _tokenName;
                    this._frameName = _frameName;
                    this._subscribeTile();
                }
                Object.defineProperty(Tile.prototype, "tokenNumber", {
                    get: function () {
                        return this._tokenNumber;
                    },
                    set: function (newToken) {
                        this._tokenNumber = newToken;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Tile.prototype, "tokenName", {
                    get: function () {
                        return this._tokenName;
                    },
                    set: function (tokenName) {
                        this._tokenName = tokenName;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Tile.prototype, "frameName", {
                    get: function () {
                        return this._frameName;
                    },
                    set: function (frameName) {
                        this._frameName = frameName;
                    },
                    enumerable: true,
                    configurable: true
                });
                Tile.prototype.reveal = function () {
                    _super.prototype.reveal.call(this);
                };
                Tile.prototype._subscribeTile = function () {
                };
                Tile.prototype._unsubscribeTile = function () {
                };
                Tile.prototype.createTile = function (spriteSheet) {
                    var iconX = 50, iconY = 50, iconSpriteSheet = spriteSheet;
                    switch (this.tokenNumber) {
                        case 6:
                            iconSpriteSheet = SPRITESHEETS.getInstance().getSpriteSheet("looper");
                            this.addAnimation('bonusLanded');
                            this.setAnimation("bonusLanded", "tile_bonus_reveal", 2, 1);
                            iconX = 115;
                            iconY = 80;
                            break;
                        case 7:
                            iconSpriteSheet = SPRITESHEETS.getInstance().getSpriteSheet("boot");
                            this.addAnimation('bonusLanded');
                            this.setAnimation("bonusLanded", "tile_bonus_reveal", 2, 1);
                            iconX = 77;
                            iconY = 77;
                            break;
                        case 8:
                            iconSpriteSheet = SPRITESHEETS.getInstance().getSpriteSheet("cat");
                            this.addAnimation('bonusLanded');
                            this.setAnimation("bonusLanded", "tile_bonus_reveal", 2, 1);
                            iconX = 110;
                            iconY = 110;
                            break;
                        case 10:
                        case 11:
                        case 12:
                            this.setAnimation("winReveal", "tile_IW_winReveal", 0.5, 0.5);
                            break;
                    }
                    this.addBitmap({
                        name: "icon",
                        pos: { x: iconX, y: iconY },
                        spriteSheet: iconSpriteSheet,
                        frame: this._frameName,
                        scale: 1,
                        doReg: { center: true }
                    });
                    this.addBitmap({
                        name: 'collected',
                        pos: { x: 50, y: 0 },
                        spriteSheet: spriteSheet,
                        frame: "collected",
                        scale: 1,
                        alpha: 0.001,
                        doReg: { center: true }
                    });
                    this.addAnimation("collected");
                    this.setAnimation("collected", "collectedReveal", 0.25, 0.25);
                };
                Tile.prototype.createSwitchTile = function (spriteSheet) {
                    this.addBitmap({
                        name: 'arrowTop',
                        pos: { x: 50, y: 28 },
                        spriteSheet: spriteSheet,
                        frame: "arrow",
                        scale: 1,
                        rotation: -15,
                        alpha: 0.001,
                        doReg: { center: true }
                    });
                    this.addBitmap({
                        name: 'arrowBottom',
                        pos: { x: 25, y: 55 },
                        spriteSheet: spriteSheet,
                        frame: "arrow",
                        scale: 1,
                        rotation: -100,
                        alpha: 0.001,
                        doReg: { center: true }
                    });
                    this.addBitmap({
                        name: 'questionmark',
                        pos: { x: 55, y: 55 },
                        spriteSheet: spriteSheet,
                        frame: "questionmark",
                        scale: 1,
                        doReg: { center: true }
                    });
                    this.active = true;
                    this.addAnimation("arrowSwitch");
                    this.setAnimation("arrowSwitch", "arrowSwitchAnimation", 0.5, 0.5, ["start"]);
                    this.animate("arrowSwitch");
                };
                Tile.prototype.destroy = function () {
                    console.log('destroying Tile');
                    this._unsubscribeTile();
                    _super.prototype.destroy.call(this);
                };
                return Tile;
            })(iwg.GameObject);
            iwg.Tile = Tile;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
//# sourceMappingURL=Tile.js.map