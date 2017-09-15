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
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GAMEOBJECT = IWG.GameObject, ANIMATION = IWG.Animation, SPRITESHEETS = IWG.SpriteSheets, images = CORE.iwgLoadQ.images;
            var Popup = (function (_super) {
                __extends(Popup, _super);
                function Popup(_name, _dimensions, _zindex) {
                    if (_dimensions === void 0) { _dimensions = { w: 0, h: 0 }; }
                    if (_zindex === void 0) { _zindex = 20; }
                    _super.call(this, _name, _dimensions, _zindex);
                    this._rollNumber = 0;
                    this._symbolNumber = 0;
                    this._popupMessageProperties = {};
                    this._popupDisplayed = false;
                    this._subscribePopup();
                }
                Popup.prototype._subscribePopup = function () {
                    IWG.IWGEM.on('popupLanded', this.popupOn.bind(this));
                    IWG.IWGEM.on('popupOpened', this.popupOff.bind(this));
                };
                Popup.prototype._unsubscribePopup = function () {
                    IWG.IWGEM.off('popupLanded');
                    IWG.IWGEM.off('popupOpened');
                };
                Popup.prototype.createPopup = function () {
                    var spriteSheet = SPRITESHEETS.getInstance().getSpriteSheet("mouseTrap");
                    this.addBitmap({
                        name: "popupBackground",
                        pos: { x: 0, y: 0 },
                        spriteSheet: spriteSheet,
                        frame: "bg_popup",
                        scale: 1,
                        doReg: { center: false }
                    });
                    this.addBitmap({
                        name: "popupMessage",
                        pos: { x: 150, y: 75 },
                        spriteSheet: spriteSheet,
                        frame: "pop_movedforward",
                        scale: 1,
                        doReg: { center: true }
                    });
                    this.addBitmap({
                        name: "popupSymbol",
                        pos: { x: 115, y: 50 },
                        spriteSheet: spriteSheet,
                        frame: "symbol_boot",
                        scale: 1,
                        doReg: { center: true }
                    });
                    this.addBitmap({
                        name: "popupNumber",
                        pos: { x: 115, y: 122 },
                        spriteSheet: spriteSheet,
                        frame: "roll_0",
                        scale: 1,
                        doReg: { center: true }
                    });
                    this.addBitmap({
                        name: "popupSpaces",
                        pos: { x: 180, y: 125 },
                        spriteSheet: spriteSheet,
                        frame: "pop_spaces",
                        scale: 1,
                        doReg: { center: true }
                    });
                    this.addAnimation("showPopup");
                    this.setAnimation("showPopup", "show_popup", 0.65, 0);
                    this.addAnimation("hidePopup");
                    this.setAnimation("hidePopup", "hide_popup", 0.5, 2.5);
                };
                Object.defineProperty(Popup.prototype, "rollNumber", {
                    get: function () {
                        return this._rollNumber;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Popup.prototype, "symbol", {
                    get: function () {
                        return this._symbolNumber;
                    },
                    enumerable: true,
                    configurable: true
                });
                Popup.prototype.popupOn = function () {
                    if (!this._popupDisplayed) {
                        this.active = true;
                        this.animate("showPopup");
                        this._popupDisplayed = true;
                    }
                };
                Popup.prototype.popupOff = function () {
                    if (this._popupDisplayed) {
                        this.animate("hidePopup");
                        this._popupDisplayed = false;
                    }
                };
                Popup.prototype.symbolLookup = function () {
                    var symbolName;
                    switch (this._symbolNumber) {
                        case 6:
                            this._popupMessageProperties = {
                                symbolName: "slide",
                                frameName: "pop_flungforward",
                                posMessage: { x: 150, y: 75 },
                                posIcon: { x: 115, y: 50 }
                            };
                            break;
                        case 7:
                            this._popupMessageProperties = {
                                symbolName: "boot",
                                frameName: "pop_kickbak",
                                posMessage: { x: 160, y: 75 },
                                posIcon: { x: 120, y: 50 }
                            };
                            break;
                        case 8:
                            this._popupMessageProperties = {
                                symbolName: "cat",
                                frameName: "pop_movedforward",
                                posMessage: { x: 160, y: 75 },
                                posIcon: { x: 115, y: 40 }
                            };
                            break;
                        default:
                            this._popupMessageProperties = {
                                symbolName: "error",
                            };
                    }
                    return this._popupMessageProperties;
                };
                Popup.prototype.updateMessage = function (symbolNumber, rollNumber) {
                    this._symbolNumber = symbolNumber;
                    this._rollNumber = rollNumber;
                    var popupSymbolClip = this.getBitmap('popupSymbol');
                    var popupNumberClip = this.getBitmap('popupNumber');
                    var popupMessageClip = this.getBitmap('popupMessage');
                    var popupSpacesClip = this.getBitmap('popupSpaces');
                    if (rollNumber === 1) {
                        popupSpacesClip.gotoAndStop("pop_space");
                    }
                    else {
                        popupSpacesClip.gotoAndStop("pop_spaces");
                    }
                    var messageProperty = this.symbolLookup();
                    popupSymbolClip.gotoAndStop("symbol_" + messageProperty.symbolName);
                    popupSymbolClip.x = messageProperty.posIcon.x;
                    popupSymbolClip.y = messageProperty.posIcon.y;
                    popupNumberClip.gotoAndStop("roll_" + this._rollNumber);
                    popupMessageClip.gotoAndStop(messageProperty.frameName);
                    popupMessageClip.x = messageProperty.posMessage.x;
                    popupMessageClip.y = messageProperty.posMessage.y;
                    TweenMax.delayedCall(100, function () {
                        this.getStage().update();
                    }, null, this, true);
                };
                Popup.prototype.destroy = function () {
                    console.log('destroying Popup');
                    _super.prototype.destroy.call(this);
                    this._unsubscribePopup();
                };
                return Popup;
            })(iwg.GameObject);
            iwg.Popup = Popup;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
//# sourceMappingURL=Popup.js.map