/// <reference path="../../../typings/tsd.d.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg;
            var Scale = (function () {
                function Scale(parent) {
                    this._enabled = false;
                    this._scaleDiv = document.createElement('div');
                    if (parent) {
                        this._parent = parent;
                    }
                    this.setupScaleDiv();
                    this.moveIWGholderIntoScaleDiv();
                    this.scaleFactor();
                    this.alignScaleDiv();
                }
                Scale.prototype.setupScaleDiv = function () {
                    this._scaleDiv.id = "scaleDiv";
                    this._scaleDiv.style.width = "960px";
                    this._scaleDiv.style.height = "640px";
                    this._scaleDiv.style.position = "relative";
                    this._parent.appendChild(this._scaleDiv);
                };
                Scale.prototype.moveIWGholderIntoScaleDiv = function () {
                    var iwgCanvas = document.getElementById('IWGcanvas');
                    this._scaleDiv.appendChild(iwgCanvas);
                };
                Scale.prototype.scaleFactor = function () {
                    var w = CORE.IWG.ame('get', 'gameWidth'), h = CORE.IWG.ame('get', 'gameHeight'), ow = 960, oh = 640;
                    this._scaleFactor = Number(Math.min(h / oh, w / ow).toFixed(1));
                    console.log(this._scaleFactor);
                };
                Scale.prototype.alignScaleDiv = function () {
                    var background = document.getElementById('background'), marginLeft = (960 - CORE.IWG.ame('get', 'gameWidth')) / 2, marginTop = (640 - CORE.IWG.ame('get', 'gameHeight')) / 2;
                    this._scaleDiv.style.left = "-" + marginLeft + "px";
                    this._scaleDiv.style.top = "-" + marginTop + "px";
                    if (this._scaleFactor > 1) {
                        this._scaleFactor = 1;
                        this._scaleDiv.style.left = Math.abs(marginLeft) + "px";
                        this._scaleDiv.style.top = Math.abs(marginTop) + "px";
                    }
                    ;
                    TweenMax.to(this._scaleDiv, 0, { scaleX: this._scaleFactor, scaleY: this._scaleFactor });
                };
                return Scale;
            })();
            iwg.Scale = Scale;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
//# sourceMappingURL=Scale.js.map