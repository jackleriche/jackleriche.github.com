/// <reference path="../imports/js/Sideplay.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg;
            var SyncAnimation = (function () {
                function SyncAnimation() {
                    this._syncAnimationArray = [];
                    if (SyncAnimation._instance) {
                        throw new Error("Error: Instantiation failed: Use SyncAnimation.getInstance() instead of new.");
                    }
                    SyncAnimation._instance = this;
                }
                SyncAnimation.getInstance = function () {
                    return SyncAnimation._instance;
                };
                SyncAnimation.prototype.add = function (animation, from) {
                    if (from === void 0) { from = 0; }
                    var animationObject = {
                        name: from,
                        animation: animation
                    };
                    this._syncAnimationArray.push(animationObject);
                };
                SyncAnimation.prototype.play = function () {
                    if (this._syncAnimationArray.length > 0) {
                        for (var i = 0; i < this._syncAnimationArray.length; i++) {
                            var anim = this._syncAnimationArray[i];
                            anim.animation.seek(0);
                            anim.animation.stop();
                            anim.animation.play();
                        }
                    }
                };
                SyncAnimation._instance = new SyncAnimation();
                return SyncAnimation;
            })();
            iwg.SyncAnimation = SyncAnimation;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
