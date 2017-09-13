var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../imports/js/Sideplay.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GAMEOBJECT = IWG.GameObject, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, SCENE = IWG.Scene, SPRITESHEETS = IWG.SpriteSheets;
            var Scratch = (function (_super) {
                __extends(Scratch, _super);
                function Scratch(_name) {
                    _super.call(this, _name);
                    this._isDrawing = false;
                    this._scratchArea = new CLICKABLEGAMEOBJECT('scratchArea', { w: 508, h: 334 }, 1, this, false);
                    this._wrapper = new createjs.Container();
                    this._foil = null;
                    this._art = new createjs.Shape();
                    this._color = createjs.Graphics.getHSL(85, 50, 50);
                    this._bitmap = null;
                    this._drawing = new createjs.Shape();
                    this._lastPoint = new createjs.Point();
                    this._amountOfPixels = 0;
                    this._percentageComplete = 60;
                    this._autoCursor = new createjs.Shape();
                    this._foilPeel = false;
                    this._movementCounter = 0;
                    this._previousMouseLocation = null;
                    this._direction = null;
                    this._finished = false;
                    this._scratchInit();
                    this._scratchSubscribe();
                }
                Scratch.prototype._scratchInit = function () {
                };
                Scratch.prototype._scratchSubscribe = function () {
                    this._scratchArea.getStage().on("stagemousedown", this._handleMouseDown.bind(this));
                    this._scratchArea.getStage().on('stagemousemove', this._handleMouseMove.bind(this));
                    this._scratchArea.getStage().on('stagemouseup', this._handleMouseUp.bind(this));
                    IWG.IWGEM.on('changeDirection', this._changeDirection.bind(this));
                };
                Scratch.prototype._handleMouseDown = function (event) {
                    if (!this._finished) {
                        this._isDrawing = true;
                        this._lastPoint.x = event.stageX - 0.001;
                        this._lastPoint.y = event.stageY - 0.001;
                        this._handleMouseMove(event);
                        IWG.IWGEM.trigger('stopReminder');
                    }
                };
                Scratch.prototype._handleMouseUp = function () {
                    if (!this._finished) {
                        this._isDrawing = false;
                        IWG.IWGEM.trigger('startReminder');
                        var imageData = this._scratchArea.getCanvas().getContext("2d").getImageData(0, 0, this.getDimensions('w'), this.getDimensions('h')).data;
                        var pixelsBlank = 0;
                        for (var i = 0; i < imageData.length; i += 4) {
                            if (imageData[i + 3] === 0) {
                                pixelsBlank++;
                            }
                            ;
                        }
                        if ((pixelsBlank / this._amountOfPixels) * 100 > 95) {
                            IWG.IWGEM.trigger('scratchComplete');
                            this._finished = true;
                            this.destroy();
                        }
                        else if ((pixelsBlank / this._amountOfPixels) * 100 > this._percentageComplete) {
                            this._reveal();
                            this._finished = true;
                        }
                        ;
                        pixelsBlank = 0;
                    }
                };
                Scratch.prototype._handleMouseMove = function (event) {
                    if (this._isDrawing) {
                        if (this._previousMouseLocation === null) {
                            this._previousMouseLocation = {
                                x: event.stageX,
                                y: event.stageY
                            };
                        }
                        else {
                            if (this._previousMouseLocation.x < event.stageX) {
                                if (this._direction !== "right") {
                                    this._direction = "right";
                                    IWG.IWGEM.trigger('changeDirection', ["right"]);
                                }
                            }
                            else {
                                if (this._direction !== "left") {
                                    this._direction = "left";
                                    IWG.IWGEM.trigger('changeDirection', ["left"]);
                                }
                            }
                            this._previousMouseLocation = {
                                x: event.stageX,
                                y: event.stageY
                            };
                        }
                        if (this._foilPeel) {
                            this._movementCounter++;
                            if (this._movementCounter > 20) {
                                var imageData = this._scratchArea.getCanvas().getContext("2d").getImageData(event.stageX, event.stageY, 1, 1).data;
                                this._movementCounter = 0;
                                this._foilDrop(event);
                            }
                        }
                        this._art.graphics.ss(60, 1).s(this._color).mt(this._lastPoint.x, this._lastPoint.y).lt(event.stageX, event.stageY);
                        this._wrapper.updateCache("destination-out");
                        this._art.graphics.clear();
                        this._lastPoint.x = event.stageX;
                        this._lastPoint.y = event.stageY;
                        this._scratchArea.getStage().update();
                    }
                };
                Scratch.prototype._reveal = function () {
                    var _this = this;
                    var timeline = new TimelineLite({
                        onStart: function () {
                            _this._scratchArea.active = true;
                            IWG.IWGEM.trigger('stopReminder');
                        },
                        paused: false,
                        onUpdate: function () {
                            _this._draw();
                        },
                        onComplete: function () {
                            _this.destroy();
                            _this._scratchArea.active = false;
                            IWG.IWGEM.trigger('scratchComplete');
                        }
                    });
                    this._autoCursor.graphics.beginFill("red").drawCircle(0, 0, 200);
                    this._wrapper.addChild(this._autoCursor);
                    timeline.set(this._autoCursor, { x: -10, y: 30 })
                        .to(this._autoCursor, 0.5, { x: 60, y: -40 })
                        .to(this._autoCursor, 0.5, { x: 0, y: this.getDimensions('h') })
                        .to(this._autoCursor, 0.5, { x: 160, y: -40 })
                        .to(this._autoCursor, 0.5, { x: 100, y: this.getDimensions('h') })
                        .to(this._autoCursor, 0.5, { x: 240, y: -40 })
                        .to(this._autoCursor, 0.5, { x: 200, y: this.getDimensions('h') })
                        .to(this._autoCursor, 0.5, { x: 360, y: -40 })
                        .to(this._autoCursor, 0.5, { x: 300, y: this.getDimensions('h') });
                    timeline.play();
                };
                Scratch.prototype._draw = function () {
                    this._autoCursor.graphics.ss(160, 1).s(this._color).mt(this._autoCursor.x, this._autoCursor.y).lt(this._autoCursor.x + 0.01, this._autoCursor.y + 0.01);
                    this._wrapper.updateCache("destination-out");
                    this._autoCursor.graphics.clear();
                    this._scratchArea.getStage().update();
                };
                Scratch.prototype._foilDrop = function (data) {
                    var _this = this;
                    for (var i = 0; i < 5; i++) {
                        var hex = iwg.Helper.ColorLuminance("#c0c0c0", iwg.Helper.getRandomNumber(-1, 1));
                        var circle = new createjs.Shape();
                        circle.graphics.beginFill(hex).drawCircle(data.stageX, data.stageY, 10);
                        circle.x = iwg.Helper.getRandomNumber(-10, 10);
                        circle.y = iwg.Helper.getRandomNumber(-10, 10);
                        this._scratchArea.getStage().addChild(circle);
                        TweenMax.to(circle, 2, { onStart: function () {
                                _this._scratchArea.active = true;
                            }, alpha: 0, x: circle.x + iwg.Helper.getRandomNumber(-50, 50), y: circle.y + 100, onComplete: function () {
                            } });
                    }
                };
                Scratch.prototype._changeDirection = function (direction) {
                    if (direction === "left") {
                        createjs.Sound.play('leftScratch');
                    }
                    else {
                        createjs.Sound.play('rightScratch');
                    }
                };
                Scratch.prototype.setFoilPeel = function (bool) {
                    if (typeof bool === "boolean") {
                        this._foilPeel = bool;
                        return true;
                    }
                    return false;
                };
                Scratch.prototype.setPercentageComplete = function (percentage) {
                    if (percentage) {
                        this._percentageComplete = percentage;
                        return true;
                    }
                    return false;
                };
                Scratch.prototype.setImage = function (frame, spriteSheet) {
                    if (frame) {
                        this._bitmap = new createjs.Sprite(SPRITESHEETS.getInstance().getSpriteSheet(spriteSheet));
                        this._bitmap.gotoAndStop(frame);
                        return true;
                    }
                    return false;
                };
                Scratch.prototype.setup = function () {
                    if ((this.getDimensions('w') > 0) && this.getDimensions("h") > 0) {
                        this._scratchArea.getStage().addChild(this._wrapper);
                        if (!this._bitmap) {
                            this._foil = new createjs.Shape();
                            this._foil.graphics.f("blue").r(0, 0, this.getDimensions('w'), this.getDimensions('h'));
                        }
                        else {
                            this._foil = this._bitmap;
                        }
                        this._wrapper.addChild(this._foil);
                        this._wrapper.cache(0, 0, this.getDimensions('w'), this.getDimensions('h'));
                        this._wrapper.updateCache("source-over");
                        this._wrapper.removeChild(this._foil);
                        this._scratchArea.getStage().update();
                        this._wrapper.addChild(this._art);
                        this._amountOfPixels = this.getDimensions('w') * this.getDimensions('h');
                    }
                };
                return Scratch;
            })(iwg.Scene);
            iwg.Scratch = Scratch;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
