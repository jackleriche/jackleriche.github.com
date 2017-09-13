/// <reference path="../imports/js/Sideplay.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, SCENE = IWG.Scene, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, SPRITESHEETS = IWG.SpriteSheets, HELPER = IWG.Helper;
            var Slide = (function () {
                function Slide() {
                    this._wrapper = document.getElementById('scaleDiv');
                    this._IWGholder = document.getElementById('IWGholder');
                    this._scenes = [];
                    this._current = 0;
                    this._active = false;
                    this._swipedir = null;
                    this._startX = null;
                    this._startY = null;
                    this._distX = null;
                    this._distY = null;
                    this._threshold = 150;
                    this._restraint = 100;
                    this._allowedTime = 300;
                    this._elapsedTime = null;
                    this._startTime = null;
                    this._autoMove = false;
                    this._screenDestination = null;
                    this._subscribe();
                }
                Slide.prototype._subscribe = function () {
                    IWG.IWGEM.on('changeScreen', this._changeScreen.bind(this));
                    IWG.IWGEM.on('activateSlide', this._setActive.bind(this));
                    IWG.IWGEM.on('showToggle', this._showToggle.bind(this));
                    IWG.IWGEM.on('hideToggle', this._hideToggle.bind(this));
                    IWG.IWGEM.on('slidesShowArrow', this._showArrow.bind(this));
                };
                Slide.prototype.setup = function () {
                    var _this = this;
                    var width = CORE.IWG.ame('get', 'gameWidth');
                    for (var index = 0; index < this._scenes.length; index++) {
                        var scene = this._scenes[index];
                        if (index > 0) {
                            scene.setPosition({
                                x: 1200
                            });
                        }
                    }
                    this._IWGholder.addEventListener('touchstart', function (e) {
                        var touchobj = e.changedTouches[0];
                        _this._swipedir = 'none';
                        _this._distX = 0;
                        _this._startX = touchobj.pageX;
                        _this._startY = touchobj.pageY;
                        _this._startTime = new Date().getTime();
                    }, false);
                    this._IWGholder.addEventListener('touchmove', function (e) {
                        var touchobj = e.changedTouches[0];
                        if (touchobj.pageX - _this._startX > 20 || touchobj.pageX - _this._startX < -20) {
                            TweenMax.to(_this._scenes[_this._current].getDiv(), 0.1, { x: touchobj.pageX - _this._startX });
                        }
                    }, false);
                    this._IWGholder.addEventListener('touchend', function (e) {
                        var touchobj = e.changedTouches[0];
                        _this._distX = touchobj.pageX - _this._startX;
                        _this._distY = touchobj.pageY - _this._startY;
                        _this._elapsedTime = new Date().getTime() - _this._startTime;
                        if (_this._elapsedTime <= _this._allowedTime) {
                            if (Math.abs(_this._distX) >= _this._threshold && Math.abs(_this._distY) <= _this._restraint) {
                                _this._swipedir = (_this._distX < 0) ? 'left' : 'right';
                            }
                        }
                        if (_this._swipedir === "left" && _this._active) {
                            if (_this._current !== _this._scenes.length - 1) {
                                _this._moveRight();
                            }
                            else {
                                _this._returnToCurrent();
                            }
                        }
                        else {
                            _this._returnToCurrent();
                        }
                        if (_this._swipedir === "right" && _this._active) {
                            if (_this._current < _this._scenes.length) {
                                _this._moveLeft();
                            }
                            else {
                                _this._returnToCurrent();
                            }
                        }
                        else {
                            _this._returnToCurrent();
                        }
                    }, false);
                    this._setupArrows();
                    this._setupPageIdentifier();
                };
                Slide.prototype.addScene = function (scene) {
                    if (scene) {
                        this._scenes.push(scene);
                    }
                    ;
                };
                Slide.prototype._changeScreen = function () {
                    var leftArrow = HELPER.getGameObject('leftArrow');
                    var rightArrow = HELPER.getGameObject('rightArrow');
                    if (this._current === 0) {
                        leftArrow.setEnabled(false);
                        leftArrow.animate('hide');
                    }
                    else {
                        leftArrow.setEnabled(true);
                        leftArrow.animate('show');
                    }
                    if (this._current < this._scenes.length - 1) {
                        rightArrow.setEnabled(true);
                        rightArrow.animate('show');
                    }
                    else {
                        rightArrow.setEnabled(false);
                        rightArrow.animate('hide');
                    }
                    var pageIdentifier = iwg.Helper.getGameObject('slide-pageIdentifier');
                    for (var i = 0; i < this._scenes.length; i++) {
                        var toggleActive = pageIdentifier.getBitmap("page" + i + "active");
                        toggleActive.alpha = 0;
                    }
                    var toggle = pageIdentifier.getBitmap('page' + this._current + "active");
                    toggle.alpha = 1;
                    pageIdentifier.getStage().update();
                };
                Slide.prototype._setActive = function (state) {
                    if (state) {
                        this._active = state;
                    }
                };
                Slide.prototype._setupArrows = function () {
                    var _this = this;
                    var leftArrow = new CLICKABLEGAMEOBJECT('leftArrow', { w: 30, h: 800 });
                    leftArrow.addBitmap({
                        name: 'left-arrow',
                        pos: {
                            x: 15,
                            y: 400
                        },
                        frame: 'arrow_left',
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        }
                    });
                    leftArrow.setPosition({
                        x: 0,
                        y: -100
                    });
                    leftArrow.addAnimation('show');
                    leftArrow.addAnimation('hide');
                    leftArrow.setAnimation('show', 'fadeIn', 0, 2);
                    leftArrow.setAnimation('hide', 'fadeOut', 0, 2);
                    leftArrow.setAlpha(0);
                    leftArrow.setAction('click', function () {
                        if (_this._active) {
                            _this._moveLeft();
                        }
                    });
                    var rightArrow = new CLICKABLEGAMEOBJECT('rightArrow', { w: 30, h: 800 });
                    rightArrow.addBitmap({
                        name: 'right-arrow',
                        pos: {
                            x: 15,
                            y: 400
                        },
                        frame: 'arrow_right',
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("masterSS"),
                        doReg: {
                            center: true
                        }
                    });
                    rightArrow.setPosition({
                        x: 960,
                        y: -100
                    });
                    rightArrow.addAnimation('show');
                    rightArrow.addAnimation('hide');
                    rightArrow.setAnimation('show', 'fadeIn', 0, 2);
                    rightArrow.setAnimation('hide', 'fadeOut', 0, 2);
                    rightArrow.setAlpha(0);
                    rightArrow.setEnabled(true);
                    rightArrow.setAction('click', function () {
                        if (_this._active) {
                            _this._moveRight();
                        }
                    });
                };
                Slide.prototype._setupPageIdentifier = function () {
                    var width = 35 + (this._scenes.length * 25);
                    var identifier = new iwg.GameObject('slide-pageIdentifier', { w: width, h: 20 }, 10);
                    identifier.setPosition({
                        x: 480 - (width / 2),
                        y: 580
                    });
                    identifier.addAnimation('show');
                    identifier.addAnimation('hide');
                    identifier.setAnimation('show', 'fadeIn', 0, 0.2);
                    identifier.setAnimation('hide', 'fadeOut', 0, 0.2);
                    for (var i = 0; i < this._scenes.length; i++) {
                        var circle = new createjs.Shape();
                        circle.name = "page" + i;
                        circle.graphics.beginFill("grey").drawCircle(0, 0, 10);
                        circle.y = 10;
                        circle.x = 20 + (i * 25);
                        var circleActive = new createjs.Shape();
                        circleActive.name = "page" + i + "active";
                        circleActive.graphics.beginFill("white").drawCircle(0, 0, 10);
                        circleActive.y = 10;
                        circleActive.x = 20 + (i * 25);
                        if (i !== 0) {
                            circleActive.alpha = 0;
                        }
                        identifier.getStage().addChild(circle, circleActive);
                        identifier.getStage().update();
                    }
                    identifier.setAlpha(0);
                    identifier.setScale(0, 0);
                };
                Slide.prototype._showToggle = function () {
                    var toggle = iwg.Helper.getGameObject('slide-pageIdentifier');
                    toggle.setScale(1, 1);
                    toggle.animate('show');
                };
                Slide.prototype._hideToggle = function () {
                    var toggle = iwg.Helper.getGameObject('slide-pageIdentifier');
                    toggle.animate('hide');
                };
                Slide.prototype._moveLeft = function () {
                    var _this = this;
                    var leftArrow = HELPER.getGameObject('leftArrow');
                    var rightArrow = HELPER.getGameObject('rightArrow');
                    var timeline = new TimelineMax({
                        onStart: function () {
                            _this._active = false;
                        },
                        onComplete: function () {
                            IWG.IWGEM.trigger('changeScreen');
                            _this._active = true;
                            if (_this._current !== _this._screenDestination && _this._autoMove) {
                                _this._moveLeft();
                            }
                            else {
                                _this._autoMove = false;
                            }
                        }
                    });
                    if (this._current > 0) {
                        var currentScreen = this._scenes[this._current];
                        timeline.to(currentScreen.getDiv(), 1, { x: 1200 });
                        this._current--;
                        var screen = this._scenes[this._current];
                        timeline.to(screen.getDiv(), 1, { x: 0 }, '-=0.9');
                    }
                    ;
                };
                Slide.prototype._moveRight = function () {
                    var _this = this;
                    var leftArrow = HELPER.getGameObject('leftArrow');
                    var rightArrow = HELPER.getGameObject('rightArrow');
                    var timeline = new TimelineMax({
                        onStart: function () {
                            _this._active = false;
                        },
                        onComplete: function () {
                            IWG.IWGEM.trigger('changeScreen');
                            _this._active = true;
                            if (_this._current !== _this._screenDestination && _this._autoMove) {
                                _this._moveRight();
                            }
                            else {
                                _this._autoMove = false;
                            }
                        }
                    });
                    if (this._current < this._scenes.length) {
                        var currentScreen = this._scenes[this._current];
                        timeline.to(currentScreen.getDiv(), 1, { x: -1200 });
                        this._current++;
                        var screen = this._scenes[this._current];
                        timeline.to(screen.getDiv(), 1, { x: 0 }, '-=0.9');
                    }
                };
                Slide.prototype.moveToScreen = function (screen) {
                    if (typeof screen === "number") {
                        this._screenDestination = screen;
                        this._autoMove = true;
                        this._active = false;
                        if (this._current < screen) {
                            this._moveRight();
                        }
                        else {
                            this._moveLeft();
                        }
                    }
                };
                Slide.prototype._returnToCurrent = function () {
                    TweenMax.to(this._scenes[this._current].getDiv(), 0.7, { x: 0 });
                };
                Slide.prototype._showArrow = function (pos) {
                    var leftArrow = HELPER.getGameObject('leftArrow');
                    var rightArrow = HELPER.getGameObject('rightArrow');
                    var timeline = new TimelineMax();
                    if (pos === "left") {
                        timeline.to(leftArrow.getCanvas(), 0.7, { alpha: 1 });
                    }
                    else if (pos === "right") {
                        timeline.to(rightArrow.getCanvas(), 0.7, { alpha: 1 });
                    }
                    else {
                        timeline.to(leftArrow.getCanvas(), 0.7, { alpha: 1 })
                            .to(rightArrow.getCanvas(), 0.7, { alpha: 1 });
                    }
                };
                Slide.prototype.getCurrentScreen = function () {
                    return this._current;
                };
                return Slide;
            })();
            iwg.Slide = Slide;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
