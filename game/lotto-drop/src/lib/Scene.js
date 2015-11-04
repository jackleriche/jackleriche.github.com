/// <reference path="../../../typings/tsd.d.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg;
            var Scene = (function () {
                function Scene(_name) {
                    this._name = _name;
                    this._div = document.createElement('div');
                    this._children = [];
                    this._dimensions = {
                        w: 0,
                        h: 0
                    };
                    this._position = {
                        x: 0,
                        y: 0
                    };
                    this._alpha = 1;
                    this._scale = 1;
                    this.active = false;
                    this.enabled = false;
                    if (!_name) {
                        console.warn('no name given to scene, please create with name');
                        return;
                    }
                    this._subscribe();
                    this._init(_name);
                }
                Scene.prototype._subscribe = function () {
                    IWG.IWGEM.on('initComplete', this._initComplete.bind(this));
                };
                Scene.prototype._init = function (name) {
                    this._div.id = name;
                    this._div.className = "scene";
                    document.getElementById("scaleDiv").appendChild(this._div);
                    IWG.scenesArray.push(this);
                    IWG.IWGEM.trigger('initComplete');
                };
                Scene.prototype._initComplete = function () {
                };
                Scene.prototype.getDiv = function () {
                    return this._div;
                };
                Scene.prototype.getName = function () {
                    return this._name;
                };
                Scene.prototype.addChild = function (gameObject) {
                    this._children.push(gameObject);
                };
                Scene.prototype.setActive = function (bool) {
                    this.active = bool;
                    for (var i = 0; i < this._children.length; i++) {
                        this._children[i].active = bool;
                    }
                };
                Scene.prototype.setDimensions = function (dimensions) {
                    if (dimensions.w) {
                        this._dimensions.w = dimensions.w;
                    }
                    ;
                    if (dimensions.h) {
                        this._dimensions.h = dimensions.h;
                    }
                    ;
                    this._div.style.width = this._dimensions.w + "px";
                    this._div.style.height = this._dimensions.h + "px";
                };
                ;
                Scene.prototype.setPosition = function (_pos) {
                    if (_pos.x) {
                        this._position.x = _pos.x;
                    }
                    ;
                    if (_pos.y) {
                        this._position.y = _pos.y;
                    }
                    ;
                    TweenMax.set(this._div, { x: _pos.x, y: _pos.y });
                };
                Scene.prototype.getScale = function () {
                    return this._scale;
                };
                Scene.prototype.setScale = function (scale) {
                    this._scale = scale;
                    TweenMax.set(this._div, { scale: this._scale });
                };
                Scene.prototype.setAlpha = function (alpha, duration) {
                    var _this = this;
                    if (duration === void 0) { duration = 0; }
                    TweenMax.to(this._div, duration, { opacity: alpha, onComplete: function () {
                            _this._alpha = alpha;
                        } });
                };
                Scene.prototype.getChildByName = function (name) {
                    for (var i = 0; i < this._children.length; i++) {
                        var child = this._children[i];
                        if (child.getName() === name) {
                            return child;
                        }
                    }
                    console.warn('no child named "' + name + '" found in ' + this.getName());
                };
                Scene.prototype.setZindex = function (zIndex) {
                    this._div.style.zIndex = zIndex;
                };
                ;
                Scene.prototype.destroy = function () {
                    var elem = document.getElementById(this._name);
                    elem.parentNode.removeChild(elem);
                };
                ;
                return Scene;
            })();
            iwg.Scene = Scene;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
//# sourceMappingURL=Scene.js.map