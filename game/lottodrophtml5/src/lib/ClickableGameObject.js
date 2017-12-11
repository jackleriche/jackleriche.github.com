var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="GameObject.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg;
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
                    this._reminders = false;
                    this._clickableSubscribe();
                    createjs.Touch.enable(this.getStage(), false, true);
                    this.getStage().enableMouseOver(10);
                    if (this.getCanvas().id !== "instructions") {
                        this._setupButtonConfig();
                    }
                }
                ClickableGameObject.prototype._clickableSubscribe = function () {
                    IWG.IWGEM.on('stopReminder', this._stopReminder.bind(this));
                    IWG.IWGEM.on('startReminder', this._startReminder.bind(this));
                    IWG.IWGEM.on('restartReminder', this._restartReminder.bind(this));
                };
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
                ClickableGameObject.prototype.setReminder = function (value, anim) {
                    if (!anim || anim === null) {
                        console.warn('no animation set for ' + this.getName() + ', please set animation for reminder');
                        return false;
                    }
                    this._reminders = value;
                    if (value) {
                        this.setAnimation('reminder', anim, 0.8, 4);
                    }
                    return true;
                };
                ClickableGameObject.prototype.killReminder = function (value) {
                    if (this.animationTimeLine) {
                        this.animationTimeLine.seek(0);
                        this.animationTimeLine.kill();
                        this.animationTimeLine = null;
                    }
                    return true;
                };
                ClickableGameObject.prototype._setupButtonConfig = function () {
                    var _this = this;
                    this.addAnimation('rollover');
                    this.addAnimation('rollout');
                    this.setAnimation('rollover', 'rollover', 0.2, 0);
                    this.setAnimation('rollout', 'rollout', 0.2, 0);
                    this.setEnabled(true);
                    this.setAction('rollover', function () {
                        IWG.IWGEM.trigger('stopReminder');
                        _this.animate('rollover');
                    });
                    this.setAction('rollout', function () {
                        _this.animate('rollout');
                        IWG.IWGEM.trigger('startReminder');
                    });
                };
                ClickableGameObject.prototype._stopReminder = function () {
                    if (this.animationTimeLine) {
                        this.animationTimeLine.pause();
                        this.animationTimeLine.seek('start');
                    }
                    return false;
                };
                ClickableGameObject.prototype._startReminder = function () {
                    if (this.animationTimeLine) {
                        this.animationTimeLine.play();
                    }
                    return false;
                };
                ClickableGameObject.prototype._restartReminder = function () {
                    if (this.animationTimeLine && this.getRevealed() === false) {
                        this.animationTimeLine.seek('start');
                        this.animationTimeLine.play();
                    }
                    return false;
                };
                return ClickableGameObject;
            })(iwg.GameObject);
            iwg.ClickableGameObject = ClickableGameObject;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
