/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="ClickableGameObject.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GLOBAL = IWG.Global, SPRITESHEETS = IWG.SpriteSheets, images = CORE.iwgLoadQ.images;
            var Sound = (function (_super) {
                __extends(Sound, _super);
                function Sound() {
                    _super.call(this, "sound", { x: 50, y: 50 }, 6);
                    this._sound = true;
                    this._extendSubscribe();
                    this._init();
                }
                Sound.prototype._extendSubscribe = function () {
                    IWG.IWGEM.on("soundShow", this._soundShow.bind(this));
                    IWG.IWGEM.on("soundHide", this._soundHide.bind(this));
                    IWG.IWGEM.on("soundOn", this._soundOn.bind(this));
                    IWG.IWGEM.on("soundOff", this._soundOff.bind(this));
                };
                Sound.prototype._extendUnsubscribe = function () {
                    IWG.IWGEM.off("soundShow");
                    IWG.IWGEM.off("soundHide");
                    IWG.IWGEM.off("soundOn");
                    IWG.IWGEM.off("soundOff");
                };
                Sound.prototype._init = function () {
                    var _this = this;
                    GLOBAL.getInstance().addToGlobal("sound", this);
                    this.addBitmap({
                        name: "sound",
                        pos: {
                            x: 25,
                            y: 25
                        },
                        frame: "icon_sound",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("lottoDrop"),
                        doReg: {
                            center: true
                        }
                    });
                    this.setAction("click", function () {
                        _this.soundButtonHandle();
                    });
                    this.setEnabled(true);
                };
                Sound.prototype.soundButtonHandle = function () {
                    if (this._sound) {
                        IWG.IWGEM.trigger('soundOff');
                    }
                    else {
                        IWG.IWGEM.trigger('soundOn');
                    }
                    ;
                };
                Sound.prototype._soundShow = function () {
                    this.getStage().visible = true;
                };
                Sound.prototype._soundHide = function () {
                    this.getStage().visible = false;
                    this.getBitmap('sound').alpha = 0;
                    this.getStage().update();
                };
                Sound.prototype._soundOn = function () {
                    this._sound = true;
                    createjs.Sound.setMute(false);
                    this.getBitmap('sound').gotoAndStop('icon_sound');
                    this.getStage().update();
                };
                Sound.prototype._soundOff = function () {
                    this._sound = false;
                    createjs.Sound.setMute(true);
                    this.getBitmap('sound').gotoAndStop('icon_sound_off');
                    this.getStage().update();
                };
                Sound.prototype.getSoundActive = function () {
                    return this._sound;
                };
                return Sound;
            })(iwg.ClickableGameObject);
            iwg.Sound = Sound;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
//# sourceMappingURL=Sound.js.map