/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="GameObject.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GLOBAL = IWG.Global, GAMEOBJECT = IWG.GameObject, SPRITESHEETS = IWG.SpriteSheets;
            var MiniGamePrize = (function () {
                function MiniGamePrize(_name) {
                    this._endLocation = {};
                }
                MiniGamePrize.prototype.setMiniGamePrize = function (prizeObject) {
                    this._prizeObject = prizeObject;
                };
                MiniGamePrize.prototype.setMiniGamePrizeType = function (type) {
                    this._miniGamePrizeType = type;
                    switch (type) {
                        case 1:
                            this._endLocation = { x: 79, y: 421 };
                            break;
                        case 2:
                            this._endLocation = { x: 94, y: 275 };
                            break;
                        case 4:
                            this._endLocation = { x: 256, y: 430 };
                            break;
                        case 5:
                            this._endLocation = { x: 256, y: 430 };
                            break;
                        case 6:
                            this._endLocation = { x: 256, y: 430 };
                            break;
                        default:
                            break;
                    }
                    this._setMiniGameAnimate();
                };
                MiniGamePrize.prototype._setMiniGameAnimate = function () {
                    this._prizeObject.addAnimation('movePrize');
                    this._prizeObject.setAnimation('movePrize', 'movePrize', 1.8, 1, { location: this._endLocation });
                };
                MiniGamePrize.prototype.movePrize = function () {
                    var _this = this;
                    this._prizeObject.animate('movePrize');
                    TweenMax.delayedCall(2.3, function () {
                        IWG.IWGEM.trigger('miniGamePrizeComplete', [_this._prizeObject]);
                    });
                };
                MiniGamePrize.prototype.movePrizeLose = function () {
                    this._prizeObject.addAnimation('movePrizeLose');
                    this._prizeObject.setAnimation('movePrizeLose', 'movePrizeLose', 1.8, 1);
                    this._prizeObject.animate('movePrizeLose');
                };
                return MiniGamePrize;
            })();
            iwg.MiniGamePrize = MiniGamePrize;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
//# sourceMappingURL=MiniGamePrize.js.map