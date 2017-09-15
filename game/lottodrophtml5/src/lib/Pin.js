var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
            var Pin = (function (_super) {
                __extends(Pin, _super);
                function Pin(_name, _dimensions, _zindex, _parent) {
                    if (_dimensions === void 0) { _dimensions = { w: 0, h: 0 }; }
                    if (_zindex === void 0) { _zindex = 1; }
                    if (_parent === void 0) { _parent = "scaleDiv"; }
                    _super.call(this, _name, _dimensions, _zindex, _parent);
                    this._initPin();
                }
                Pin.prototype._initPin = function () {
                };
                return Pin;
            })(iwg.GameObject);
            iwg.Pin = Pin;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
