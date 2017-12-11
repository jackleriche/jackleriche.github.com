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
            var ClickableGameObject = (function (_super) {
                __extends(ClickableGameObject, _super);
                function ClickableGameObject(_name, _dimensions, _zindex, _parent) {
                    if (_dimensions === void 0) { _dimensions = { w: 0, h: 0 }; }
                    if (_zindex === void 0) { _zindex = 1; }
                    if (_parent === void 0) { _parent = "scaleDiv"; }
                    _super.call(this, _name, _dimensions, _zindex, _parent);
                    this._actions = {
                        click: null,
                        mousedown: null,
                        mouseup: null,
                        dblclick: null,
                        pressmove: null,
                        pressup: null,
                        mouseover: null,
                        mouseout: null,
                        rollover: null,
                        rollout: null
                    };
                    createjs.Touch.enable(this.getStage(), false, true);
                    this.getStage().enableMouseOver(10);
                }
                ClickableGameObject.prototype.setAction = function (actionType, actionFunction) {
                    var _this = this;
                    if (!this._actions.hasOwnProperty(actionType)) {
                        console.warn('no such action type in ' + this.getName());
                        return;
                    }
                    else {
                        this._actions[actionType] = actionFunction;
                        this.getStage().on(actionType, function () {
                            if (_this.getEnabled()) {
                                _this._actions[actionType]();
                            }
                            ;
                        });
                    }
                    ;
                };
                return ClickableGameObject;
            })(iwg.GameObject);
            iwg.ClickableGameObject = ClickableGameObject;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
