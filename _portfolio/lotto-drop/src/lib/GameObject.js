/// <reference path="../../../typings/tsd.d.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, LIB = IWG.lib, GAMEOBJECTS = IWG.gameObjects, ANIMATION = IWG.Animation, images = CORE.iwgLoadQ.images;
            ;
            var GameObject = (function () {
                function GameObject(_name, _dimensions, _zindex, _parent) {
                    if (_dimensions === void 0) { _dimensions = { w: 0, h: 0 }; }
                    if (_zindex === void 0) { _zindex = 1; }
                    if (_parent === void 0) { _parent = "scaleDiv"; }
                    this._name = _name;
                    this._dimensions = _dimensions;
                    this._zindex = _zindex;
                    this._parent = _parent;
                    this._state = "start";
                    this._animation = {
                        reveal: null,
                        winReveal: null,
                        reminder: null
                    };
                    this._revealAnimation = null;
                    this._revealed = false;
                    this._winRevealAnimation = null;
                    this._winRevealed = false;
                    this._ticketLabel = null;
                    this._prizeValue = 0;
                    this._enabled = false;
                    this._clicked = false;
                    this._visible = false;
                    this._rotation = 0;
                    this._position = {
                        x: 0,
                        y: 0
                    };
                    this.active = false;
                    this.scale = 1;
                    this.alpha = 1;
                    this.animationTimeLine = null;
                    if (this._parent !== "scaleDiv") {
                        this._parent.addChild(this);
                        this._parent = this._parent.getName();
                    }
                    ;
                    this._setupStage();
                    this._subscribe();
                    this.initComplete();
                    IWG.gameObjectsArray.push(this);
                }
                GameObject.prototype.getName = function () {
                    return this._name;
                };
                GameObject.prototype.getEnabled = function () {
                    return this._enabled;
                };
                GameObject.prototype.setEnabled = function (bool) {
                    this._enabled = bool;
                };
                GameObject.prototype.getTicketLabel = function () {
                    return this._ticketLabel;
                };
                GameObject.prototype.setTicketLabel = function (ticketLabel) {
                    this._ticketLabel = ticketLabel;
                };
                GameObject.prototype.setAlpha = function (alpha) {
                    this.alpha = alpha;
                    TweenMax.set(this._canvas, { alpha: this.alpha });
                };
                GameObject.prototype.setRotation = function (degree) {
                    this._rotation = degree;
                    TweenMax.set(this._canvas, { rotation: this._rotation });
                };
                GameObject.prototype.getRotation = function () {
                    return this._rotation;
                };
                GameObject.prototype.getRevealed = function () {
                    return this._revealed;
                };
                GameObject.prototype.getAnimation = function (key) {
                    if (!key) {
                        return this._animation;
                    }
                    else {
                        if (this._animation.hasOwnProperty(key)) {
                            return this._animation[key];
                        }
                    }
                    ;
                };
                GameObject.prototype._setupStage = function () {
                    CORE.IWG.ame('canvasStack', {
                        create: this._name,
                        w: this._dimensions.w,
                        h: this._dimensions.h,
                        z: this._zindex,
                        parentDiv: this._parent
                    });
                    this._canvas = document.getElementById(this._name);
                    this._stage = new createjs.Stage(this._canvas);
                };
                GameObject.prototype._update = function () {
                    if (this.active) {
                        this._stage.update();
                    }
                    ;
                };
                ;
                GameObject.prototype._subscribe = function () {
                    IWG.IWGEM.on('update', this._update.bind(this));
                };
                GameObject.prototype._unsubscribe = function () {
                    IWG.IWGEM.off('update');
                };
                GameObject.prototype.initComplete = function () {
                };
                ;
                GameObject.prototype.setPosition = function (pos, move) {
                    if (move === void 0) { move = true; }
                    if (pos.x) {
                        this._position.x = pos.x;
                    }
                    ;
                    if (pos.y) {
                        this._position.y = pos.y;
                    }
                    ;
                    if (move) {
                        TweenMax.set(this._canvas, { x: pos.x, y: pos.y });
                    }
                };
                GameObject.prototype.setScale = function (scaleX, scaleY) {
                    TweenMax.set(this._canvas, { scaleX: scaleX, scaleY: scaleY });
                };
                GameObject.prototype.setDimensions = function (dimensions) {
                    if (dimensions.w) {
                        this._dimensions.w = dimensions.w;
                    }
                    ;
                    if (dimensions.h) {
                        this._dimensions.h = dimensions.h;
                    }
                    ;
                    this._canvas.width = this._dimensions.w;
                    this._canvas.height = this._dimensions.h;
                };
                ;
                GameObject.prototype.getDimensions = function () {
                    return this._dimensions;
                };
                ;
                GameObject.prototype.setZindex = function (index) {
                    this._zindex = index;
                    this._canvas.style.zIndex = this._zindex;
                };
                ;
                GameObject.prototype.setPrizeValue = function (prizeValue) {
                    this._prizeValue = prizeValue;
                };
                GameObject.prototype.getPosition = function () {
                    return this._position;
                };
                GameObject.prototype.getCanvas = function () {
                    return this._canvas;
                };
                GameObject.prototype.getStage = function () {
                    return this._stage;
                };
                ;
                GameObject.prototype.getPrizeValue = function () {
                    return this._prizeValue;
                };
                GameObject.prototype.addBitmap = function (config) {
                    var bitmap;
                    if (!config.spriteSheet) {
                        bitmap = new createjs.Bitmap(config.frame);
                    }
                    else {
                        bitmap = new createjs.Sprite(config.spriteSheet);
                        bitmap.gotoAndStop(config.frame);
                    }
                    bitmap.x = config.pos.x;
                    bitmap.y = config.pos.y;
                    bitmap.name = config.name;
                    if (config.doReg) {
                        if (config.doReg.custom) {
                            bitmap.regX = config.doReg.custom.x;
                            bitmap.regY = config.doReg.custom.y;
                        }
                        else {
                            var bounds = bitmap.getBounds();
                            if (config.doReg.center) {
                                bitmap.regX = bounds.width / 2;
                                bitmap.regY = bounds.height / 2;
                            }
                            else {
                                bitmap.regX = 0;
                                bitmap.regY = 0;
                            }
                            ;
                        }
                        ;
                    }
                    ;
                    if (config.alpha !== undefined) {
                        if (config.alpha === 0) {
                            this._visible = false;
                        }
                        ;
                        bitmap.alpha = config.alpha;
                    }
                    ;
                    if (typeof config.scale === "number") {
                        bitmap.scaleX = bitmap.scaleY = config.scale;
                    }
                    ;
                    if (config.rotation) {
                        bitmap.rotation = config.rotation;
                    }
                    ;
                    if (config.filter) {
                        bitmap.filters = [config.filter];
                        bitmap.cache(0, 0, bounds.width, bounds.height);
                    }
                    ;
                    if (bitmap.currentAnimation !== config.frame) {
                        CORE.IWG.ame('error', { mess: ['mIWGd00011 bitmap not correct'] });
                    }
                    this._stage.addChild(bitmap);
                    TweenMax.delayedCall(10, function () {
                        this._stage.update();
                    }, null, this, true);
                };
                ;
                GameObject.prototype.getBitmap = function (name) {
                    return this._stage.getChildByName(name);
                };
                ;
                GameObject.prototype.addAnimation = function (animationName) {
                    if (!this._animation.hasOwnProperty(animationName)) {
                        this._animation[animationName] = null;
                    }
                    else {
                        console.warn('animation already in _animation object');
                    }
                    ;
                };
                ;
                GameObject.prototype.setAnimation = function (animationType, anim, time, delay, customParams) {
                    try {
                        if (this._animation.hasOwnProperty(animationType)) {
                            this._animation[animationType] = ANIMATION.getInstance().animations[anim](this, time, delay, customParams);
                        }
                    }
                    catch (err) {
                        console.warn('animation cannot be found in class ANIMATION');
                        console.warn(err);
                    }
                    ;
                };
                ;
                GameObject.prototype.killAnimation = function (animationName) {
                    try {
                        if (this._animation.hasOwnProperty(animationName)) {
                            this._animation[animationName].kill();
                            this._animation[animationName] = null;
                        }
                    }
                    catch (err) {
                        console.warn(animationName + ' cannot be found in ' + this.getName());
                        console.warn(err);
                    }
                    ;
                };
                ;
                GameObject.prototype.reveal = function () {
                    this._revealed = true;
                    if (this._animation.reveal) {
                        this._animation.reveal();
                    }
                    ;
                };
                ;
                GameObject.prototype.winReveal = function () {
                    this._winRevealed = true;
                    if (this._animation.winReveal) {
                        this._animation.winReveal();
                    }
                    ;
                };
                ;
                GameObject.prototype.animate = function (customAnimationName, params) {
                    if (this._animation[customAnimationName]) {
                        this._animation[customAnimationName](params);
                    }
                };
                ;
                GameObject.prototype.clone = function (name) {
                    var newCanvas = document.createElement('canvas');
                    var context = newCanvas.getContext('2d');
                    newCanvas.id = this.getName() + "clone";
                    newCanvas.width = this._dimensions.w;
                    newCanvas.height = this._dimensions.h;
                    context.drawImage(this.getCanvas(), 0, 0);
                    document.getElementById(this._parent).appendChild(newCanvas);
                    TweenMax.set(newCanvas, { x: this.getPosition().x, y: this.getPosition().y, zIndex: 7 });
                };
                ;
                GameObject.prototype.destroy = function () {
                    this._unsubscribe();
                    CORE.IWG.ame('canvasStack', { kill: this._name });
                    for (var i = 0; i < IWG.gameObjectsArray.length; i++) {
                        if (this._name === IWG.gameObjectsArray[i]._name) {
                            IWG.gameObjectsArray.splice(IWG.gameObjectsArray.indexOf(i), 1);
                        }
                    }
                };
                return GameObject;
            })();
            iwg.GameObject = GameObject;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
;
//# sourceMappingURL=GameObject.js.map