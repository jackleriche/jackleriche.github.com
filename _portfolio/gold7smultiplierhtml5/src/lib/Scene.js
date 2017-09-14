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
                    this._parent = null;
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
                    this._rotation = null;
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
                Scene.prototype.setParent = function (parent) {
                    if (parent) {
                        this._parent = parent;
                        document.getElementById(parent.getName()).appendChild(this._div);
                        return true;
                    }
                    console.warn('no parent provided for ' + this._name + ' scene');
                    return false;
                };
                Scene.prototype.getParent = function () {
                    return this._parent;
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
                Scene.prototype.getRotation = function () {
                    return this._rotation;
                };
                Scene.prototype.setRotation = function (deg) {
                    if (deg) {
                        this._rotation = deg;
                        TweenLite.set(this._div, { rotation: deg });
                        return true;
                    }
                    console.warn('no rotation set on ' + this._name + ' scene');
                    return false;
                };
                Scene.prototype.setAlpha = function (alpha) {
                    this._alpha = alpha;
                    TweenMax.set(this._div, { alpha: this._alpha });
                };
                Scene.prototype.getChildren = function () {
                    if (this._children.length > 0) {
                        return this._children;
                    }
                    else {
                        console.warn('scene has no children');
                    }
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
