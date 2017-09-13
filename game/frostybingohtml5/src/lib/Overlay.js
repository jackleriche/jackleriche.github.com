/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="GameObject.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GAMEOBJECT = IWG.GameObject, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, SPRITESHEETS = IWG.SpriteSheets;
            var Overlay = (function () {
                function Overlay(_clickthrough) {
                    if (_clickthrough === void 0) { _clickthrough = false; }
                    this._clickthrough = _clickthrough;
                    this._object = new CLICKABLEGAMEOBJECT("overlay", { w: 2000, h: 2000 });
                    this._overlayOn = false;
                    this._init();
                    this._subscribe();
                }
                Overlay.prototype._subscribe = function () {
                    IWG.IWGEM.on("showOverlay", this._showOverlay.bind(this));
                    IWG.IWGEM.on("hideOverlay", this._hideOverlay.bind(this));
                };
                Overlay.prototype._showOverlay = function () {
                    var _this = this;
                    TweenMax.to(this._object.getCanvas(), 0.7, { autoAlpha: 0.85,
                        onComplete: function () {
                            _this._overlayOn = true;
                        } });
                };
                Overlay.prototype._hideOverlay = function () {
                    var _this = this;
                    TweenMax.to(this._object.getCanvas(), 0.7, { autoAlpha: 0,
                        onComplete: function () {
                            _this._overlayOn = false;
                        }
                    });
                };
                Overlay.prototype._init = function () {
                    var _this = this;
                    this._object.setZindex(9);
                    var overlay = new createjs.Shape();
                    overlay.graphics.beginFill("#000").drawRect(0, 0, 2000, 2000);
                    overlay.alpha = 0.2;
                    this._object.getStage().addChild(overlay);
                    this._object.getStage().update();
                    if (this._clickthrough) {
                        this._object.getStage().on('click', function () {
                            if (_this._overlayOn) {
                                IWG.IWGEM.trigger('hideOverlay');
                                IWG.IWGEM.trigger('hideInstructions');
                                IWG.IWGEM.trigger('hideGames');
                            }
                        });
                    }
                    this._object.setPosition({
                        x: -300,
                        y: -300
                    });
                    TweenMax.set(this._object.getCanvas(), { autoAlpha: 0 });
                };
                return Overlay;
            })();
            iwg.Overlay = Overlay;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
