/// <reference path="../../../typings/tsd.d.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GLOBAL = IWG.Global, SCALE = IWG.Scale, PAUSE = IWG.Pause, SOUND = IWG.Sound, TICKET = IWG.Ticket, QUEUEMANAGER = IWG.QueueManager, GAMEOBJECT = IWG.GameObject, SCENE = IWG.Scene, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, SPRITESHEETS = IWG.SpriteSheets, ANIMATION = IWG.Animation, images = CORE.iwgLoadQ.images, MAINLAYOUT = IWG.MainLayout, LEGEND = IWG.Legend;
            var LottoDrop = (function () {
                function LottoDrop(_name, starter) {
                    this._name = _name;
                    this.starter = starter;
                    this._subscribe();
                    this._setupTicker();
                    this._init();
                    this._initComplete();
                }
                LottoDrop.prototype._subscribe = function () {
                    IWG.IWGEM.on('miniGamePrizeComplete', this._miniGamePrize.bind(this));
                };
                LottoDrop.prototype._unsubscribe = function () {
                };
                LottoDrop.prototype._endGameCheck = function () {
                    var _wager = CORE.IWG.ame('get', { vars: ['iwgIsWager'] });
                    var _isWinner = Number(TICKET.getInstance().getParams().wT);
                };
                LottoDrop.prototype._init = function () {
                    // global setup
                    //GLOBAL.getInstance().addToGlobal("ballSelection", ["1","2","3","4","5","6"] );
                    var lottoDrop = CORE.iwgLoadQ.getResult("lottoDropSS");
                    SPRITESHEETS.getInstance().addSpriteSheet("lottoDrop", lottoDrop);
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
                    sound.setPosition({ x: 120, y: 517 });
                    var mainLayout = new MAINLAYOUT();
                    GLOBAL.getInstance().addToGlobal('turnNo', 0);
                };
                LottoDrop.prototype._initComplete = function () {
                    setTimeout(function () {
                        CORE.IWG.ame('killloader');
                    }, 500);
                };
                LottoDrop.prototype._setupTicker = function () {
                    createjs.Ticker.setFPS(24);
                    TweenLite.ticker.fps(24);
                    createjs.Touch.enable(this._stage, false, true);
                    createjs.Ticker.addEventListener("tick", this.update);
                };
                LottoDrop.prototype._miniGamePrize = function (gameObject) {
                    var type = gameObject.getTicketLabel();
                    switch (type) {
                        case 1:
                            IWG.IWGEM.trigger('bonusStar');
                            break;
                        case 2:
                            IWG.IWGEM.trigger('addBall', [gameObject.ballNumber]);
                            break;
                        case 4:
                            IWG.IWGEM.trigger('instantWin', [10]);
                            break;
                        case 5:
                            IWG.IWGEM.trigger('instantWin', [5]);
                            break;
                        case 6:
                            IWG.IWGEM.trigger('instantWin', [3]);
                            break;
                    }
                };
                LottoDrop.prototype.update = function () {
                    IWG.IWGEM.trigger('update');
                };
                ;
                LottoDrop.prototype.destroy = function () {
                    this._unsubscribe();
                };
                return LottoDrop;
            })();
            iwg.LottoDrop = LottoDrop;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
