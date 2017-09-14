/// <reference path="../../../typings/tsd.d.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GLOBAL = IWG.Global, SCALE = IWG.Scale, PAUSE = IWG.Pause, SOUND = IWG.Sound, TICKET = IWG.Ticket, QUEUEMANAGER = IWG.QueueManager, GAMEOBJECT = IWG.GameObject, SCENE = IWG.Scene, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, SPRITESHEETS = IWG.SpriteSheets, ANIMATION = IWG.Animation, images = CORE.iwgLoadQ.images, MAINLAYOUT = IWG.MainLayout, LEGEND = IWG.Legend;
            var Gold7sMultiplier = (function () {
                function Gold7sMultiplier(_name, starter) {
                    this._name = _name;
                    this.starter = starter;
                    this._subscribe();
                    this._setupTicker();
                    this._init();
                    this._initComplete();
                }
                Gold7sMultiplier.prototype._subscribe = function () {
                };
                Gold7sMultiplier.prototype._unsubscribe = function () {
                };
                Gold7sMultiplier.prototype._endGameCheck = function () {
                    var _wager = CORE.IWG.ame('get', { vars: ['iwgIsWager'] });
                    var _isWinner = Number(TICKET.getInstance().getParams().wT);
                };
                Gold7sMultiplier.prototype._init = function () {
                    var gold7sMultiplier = CORE.iwgLoadQ.getResult("gold7sMultiplierSS");
                    SPRITESHEETS.getInstance().addSpriteSheet("gold7sMultiplier", gold7sMultiplier);
                    var scale = new SCALE(document.getElementById('IWGholder'));
                    var pause = new PAUSE();
                    pause.setPosition({
                        x: -200,
                        y: -80
                    });
                    TICKET.getInstance().setupTicket();
                    var mainLayout = new MAINLAYOUT();
                };
                Gold7sMultiplier.prototype._initComplete = function () {
                    setTimeout(function () {
                        CORE.IWG.ame('killloader');
                    }, 500);
                };
                Gold7sMultiplier.prototype._setupTicker = function () {
                    createjs.Ticker.setFPS(24);
                    TweenLite.ticker.fps(24);
                    createjs.Touch.enable(this._stage, false, true);
                    createjs.Ticker.addEventListener("tick", this.update);
                };
                Gold7sMultiplier.prototype.update = function () {
                    IWG.IWGEM.trigger('update');
                };
                ;
                Gold7sMultiplier.prototype.destroy = function () {
                    this._unsubscribe();
                };
                return Gold7sMultiplier;
            })();
            iwg.Gold7sMultiplier = Gold7sMultiplier;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
