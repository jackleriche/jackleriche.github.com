/// <reference path="../imports/js/Sideplay.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GLOBAL = IWG.Global, SCALE = IWG.Scale, PAUSE = IWG.Pause, SOUND = IWG.Sound, TICKET = IWG.Ticket, SPRITESHEETS = IWG.SpriteSheets, images = CORE.iwgLoadQ.images, MAINLAYOUT = IWG.MainLayout;
            var FrostyBingo = (function () {
                function FrostyBingo(_name, starter) {
                    this._name = _name;
                    this.starter = starter;
                    this._subscribe();
                    this._setupTicker();
                    this._init();
                    this._initComplete();
                }
                FrostyBingo.prototype._subscribe = function () {
                };
                FrostyBingo.prototype._unsubscribe = function () {
                };
                FrostyBingo.prototype._endGameCheck = function () {
                };
                FrostyBingo.prototype._init = function () {
                    var masterSS = CORE.iwgLoadQ.getResult("masterSS-data");
                    SPRITESHEETS.getInstance().addSpriteSheet("masterSS", masterSS);
                    var bagSS = CORE.iwgLoadQ.getResult("bagSS-data");
                    SPRITESHEETS.getInstance().addSpriteSheet("bagSS", bagSS);
                    var poundSS = CORE.iwgLoadQ.getResult("poundSS-data");
                    SPRITESHEETS.getInstance().addSpriteSheet("poundSS", poundSS);
                    var starSS = CORE.iwgLoadQ.getResult("starSS-data");
                    SPRITESHEETS.getInstance().addSpriteSheet("starSS", starSS);
                    var star5SS = CORE.iwgLoadQ.getResult("star5SS-data");
                    SPRITESHEETS.getInstance().addSpriteSheet("star5SS", star5SS);
                    var splashBurstSS = CORE.iwgLoadQ.getResult("splashBurstSS-data");
                    SPRITESHEETS.getInstance().addSpriteSheet("splashBurstSS", splashBurstSS);
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
