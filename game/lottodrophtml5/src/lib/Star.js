/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="Scene.ts" />
/// <reference path="GameObject.ts" />
/// <reference path="ClickableGameObject.ts" />
/// <reference path="Helper.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GLOBAL = IWG.Global, HELPER = IWG.Helper, GAMEOBJECT = IWG.GameObject, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, SPRITESHEETS = IWG.SpriteSheets;
            var Star = (function () {
                function Star(_startX, _startY, _parent) {
                    this._startX = _startX;
                    this._startY = _startY;
                    this._parent = _parent;
                    this._setupLayout();
                }
                Star.prototype._setupLayout = function () {
                    var star = new GAMEOBJECT("ballDropStar", { w: 54, h: 52 }, 3, this._parent);
                    star.addBitmap({
                        name: "ballDropStar",
                        pos: {
                            x: 27,
                            y: 26
                        },
                        frame: "star_full",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                        doReg: {
                            center: true
                        }
                    });
                    star.setPosition({
                        x: this._startX - 20,
                        y: this._startY - 45
                    });
                    star.setAnimation('reveal', "starReveal");
                    star.reveal();
                };
                return Star;
            })();
            iwg.Star = Star;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
