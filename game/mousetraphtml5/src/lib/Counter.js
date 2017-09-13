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
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GAMEOBJECT = IWG.GameObject, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, SPRITESHEETS = IWG.SpriteSheets, ANIMATION = IWG.Animation, images = CORE.iwgLoadQ.images, BOARD = IWG.Board;
            var Counter = (function (_super) {
                __extends(Counter, _super);
                function Counter(_name, _dimensions, _zindex) {
                    if (_dimensions === void 0) { _dimensions = { w: 0, h: 0 }; }
                    if (_zindex === void 0) { _zindex = 10; }
                    _super.call(this, _name, _dimensions, _zindex);
                    this.sqCurrentNum = -1;
                    this.sqDestNum = -1;
                    this.sqStartNum = -1;
                    this.sqPrevousNum = -1;
                    this.counterFlip = false;
                    this.moveSpaces = -1;
                    this.moveDestination = -1;
                    this.moveDestinationToken = -1;
                    this.moveDirectionForward = true;
                    this.moveTypeDice = true;
                    this._subscribeCounter();
                }
                Counter.prototype._subscribeCounter = function () {
                    IWG.IWGEM.on('popupClosed', this.moveCounterNext.bind(this));
                };
                Counter.prototype._unsubscribeCounter = function () {
                    IWG.IWGEM.off('popupClosed');
                };
                Counter.prototype.moveCounterNext = function () {
                    if (this.sqCurrentNum != this.sqDestNum) {
                        if (this.sqCurrentNum < 23) {
                            if (this.moveDirectionForward) {
                                this.sqCurrentNum++;
                            }
                            else {
                                this.sqCurrentNum--;
                            }
                        }
                        else {
                            this.sqCurrentNum = 0;
                        }
                        this.moveCounterTo(this.sqCurrentNum);
                    }
                    else {
                        this.sqStartNum = this.sqCurrentNum;
                        this.sqCurrentNum = this.sqDestNum;
                        this.moveDirectionForward = true;
                        var boardTileObject = BOARD.getInstance().getBoardObject(this.sqCurrentNum);
                        BOARD.getInstance().processSquare(this.sqCurrentNum, boardTileObject);
                    }
                };
                Counter.prototype.moveCounterTo = function (squareNum) {
                    var squareObject = BOARD.getInstance().getBoardObject(squareNum), sqX = squareObject.getPosition().x, sqY = squareObject.getPosition().y;
                    this.setPosition({ x: sqX, y: sqY }, false);
                    TweenMax.to(this.getCanvas(), 0.2, { delay: 0.2,
                        bezier: { type: "thru",
                            values: [
                                { x: sqX, y: sqY - 100 },
                                { x: sqX, y: sqY }
                            ]
                        },
                        onCompleteScope: this,
                        onComplete: function () {
                            switch (squareNum) {
                                case 2:
                                case 12:
                                    if (this.sqDestNum != 12 || this.moveDirectionForward) {
                                        this.flipCounter();
                                    }
                                    break;
                                case 16:
                                    BOARD.getInstance().checkShortPath(false);
                                    break;
                            }
                            IWG.IWGEM.trigger('counterMoved');
                            createjs.Sound.play("boing");
                            this.moveCounterNext();
                        }
                    });
                };
                Counter.prototype.setCounterDirection = function (token) {
                    switch (token) {
                        case 6:
                            this.moveDirectionForward = true;
                            break;
                        case 7:
                            this.moveDirectionForward = false;
                            break;
                        case 8:
                            this.moveDirectionForward = true;
                            break;
                    }
                };
                Counter.prototype.flipCounter = function () {
                    if (!this.counterFlip) {
                        TweenMax.to(this.getCanvas(), 0.1, { scaleX: -1 });
                        this.counterFlip = true;
                    }
                    else {
                        TweenMax.to(this.getCanvas(), 0.1, { scaleX: 1 });
                        this.counterFlip = false;
                    }
                };
                Counter.prototype.destroy = function () {
                    console.log('destroying counter');
                    this._unsubscribeCounter();
                    _super.prototype.destroy.call(this);
                };
                return Counter;
            })(iwg.GameObject);
            iwg.Counter = Counter;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
//# sourceMappingURL=Counter.js.map