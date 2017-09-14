/// <reference path="../../../typings/tsd.d.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg;
            var SpriteSheets = (function () {
                function SpriteSheets() {
                    this._sheets = {};
                    if (SpriteSheets._instance) {
                        throw new Error("Error: Instantiation failed: Use SpriteSheets.getInstance() instead of new.");
                    }
                    SpriteSheets._instance = this;
                }
                SpriteSheets.getInstance = function () {
                    return SpriteSheets._instance;
                };
                SpriteSheets.prototype.addSpriteSheet = function (name, spriteData) {
                    if (!this._sheets.hasOwnProperty(name)) {
                        var image = CORE.iwgLoadQ.getResult(name);
                        spriteData.images[0] = image.src;
                        this._sheets[name] = new createjs.SpriteSheet(spriteData);
                    }
                    else {
                        console.warn('spriteSheets already in _sheets object');
                    }
                    ;
                };
                ;
                SpriteSheets.prototype.getSpriteSheet = function (name) {
                    if (this._sheets.hasOwnProperty(name)) {
                        return this._sheets[name];
                    }
                };
                SpriteSheets._instance = new SpriteSheets();
                return SpriteSheets;
            })();
            iwg.SpriteSheets = SpriteSheets;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
//# sourceMappingURL=SpriteSheets.js.map