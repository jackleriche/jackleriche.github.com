/// <reference path="../../../typings/tsd.d.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GLOBAL = IWG.Global, SCALE = IWG.Scale, PAUSE = IWG.Pause, SOUND = IWG.Sound, TICKET = IWG.Ticket, QUEUEMANAGER = IWG.QueueManager, GAMEOBJECT = IWG.GameObject, SCENE = IWG.Scene, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, SPRITESHEETS = IWG.SpriteSheets, ANIMATION = IWG.Animation, images = CORE.iwgLoadQ.images, MAINLAYOUT = IWG.MainLayout, LEGEND = IWG.Legend;
            var FrostyBingo = (function () {
                function FrostyBingo(_name, starter) {
                    this._name = _name;
                    this.starter = starter;
                    this._turn = 0;
                    this._cardCount = 0;
                    this._cardReady = 0;
                    this._subscribe();
                    this._setupTicker();
                    this._init();
                    this._initComplete();
                }
                FrostyBingo.prototype._subscribe = function () {
                    IWG.IWGEM.on('announceBall', this._ballAnnounced.bind(this));
                    IWG.IWGEM.on('resetBall', this._endGameCheck.bind(this));
                    IWG.IWGEM.on('Card.incCardCount', this._incCardCount.bind(this));
                    IWG.IWGEM.on('Card.decCardCount', this._decCardCount.bind(this));
                    IWG.IWGEM.on('Card.cardReady', this._incCardReady.bind(this));
                };
                FrostyBingo.prototype._unsubscribe = function () {
                    IWG.IWGEM.off('announceBall');
                    IWG.IWGEM.off('resetBall');
                };
                FrostyBingo.prototype._ballAnnounced = function () {
                    var ballNumber = TICKET.getInstance().getTurn(this._turn).b;
                    IWG.IWGEM.trigger('ballPop', [ballNumber]);
                    this._turn++;
                };
                FrostyBingo.prototype._endGameCheck = function () {
                    var _wager = CORE.IWG.ame('get', { vars: ['iwgIsWager'] });
                    var _isWinner = Number(TICKET.getInstance().getParams().wT);
                    if (this._turn === 20) {
                        TweenMax.delayedCall(2, function () {
                            IWG.IWGEM.trigger("showEndGame");
                            if (_wager) {
                                if (_isWinner === 1) {
                                    createjs.Sound.play('endWin');
                                }
                                else {
                                    createjs.Sound.play('endLose');
                                }
                            }
                            else {
                                createjs.Sound.play('endLose');
                            }
                        });
                    }
                    else {
                        IWG.IWGEM.trigger('announceBall');
                    }
                };
                FrostyBingo.prototype._incCardCount = function () {
                    this._cardCount++;
                };
                FrostyBingo.prototype._decCardCount = function () {
                    this._cardCount--;
                    if (this._cardCount === 0) {
                        IWG.IWGEM.trigger('ballRollOff');
                    }
                };
                FrostyBingo.prototype._incCardReady = function () {
                    this._cardReady++;
                    if (this._cardReady === 4) {
                        IWG.IWGEM.trigger('cardsReady');
                        this._cardReady = 0;
                    }
                };
                FrostyBingo.prototype._init = function () {
                    GLOBAL.getInstance().addToGlobal('ballNumber');
                    GLOBAL.getInstance().addToGlobal('dabber', "purple");
                    var frostyBingo = CORE.iwgLoadQ.getResult("frostyBingoSS");
                    SPRITESHEETS.getInstance().addSpriteSheet("frostyBingo", frostyBingo);
                    var tombola = CORE.iwgLoadQ.getResult("tombolaSS");
                    SPRITESHEETS.getInstance().addSpriteSheet("tombola", tombola);
                    var scale = new SCALE(document.getElementById('IWGholder'));
                    var pause = new PAUSE();
                    pause.setPosition({
                        x: -200,
                        y: -80
                    });
                    var sound = new SOUND();
                    sound.setDimensions({
                        w: 50,
                        h: 50
                    });
                    sound.setZindex(10);
                    sound.setScale(1, 1);
                    sound.setPosition({ x: 910, y: 527 });
                    TICKET.getInstance().setupTicket();
                    var mainLayout = new MAINLAYOUT();
                };
                FrostyBingo.prototype._initComplete = function () {
                    setTimeout(function () {
                        CORE.IWG.ame('killloader');
                    }, 1000);
                };
                FrostyBingo.prototype._setupTicker = function () {
                    createjs.Ticker.setFPS(20);
                    TweenLite.ticker.fps(20);
                    createjs.Touch.enable(this._stage, false, true);
                    createjs.Ticker.addEventListener("tick", this.update);
                };
                FrostyBingo.prototype.update = function () {
                    IWG.IWGEM.trigger('update');
                };
                ;
                FrostyBingo.prototype.destroy = function () {
                    this._unsubscribe();
                };
                return FrostyBingo;
            })();
            iwg.FrostyBingo = FrostyBingo;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
