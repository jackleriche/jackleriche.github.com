/// <reference path="../imports/js/Sideplay.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GLOBAL = IWG.Global, SCALE = IWG.Scale, PAUSE = IWG.Pause, SOUND = IWG.Sound, TICKET = IWG.Ticket, SPRITESHEETS = IWG.SpriteSheets, images = CORE.iwgLoadQ.images, MAINLAYOUT = IWG.MainLayout, MAINLAYOUTDUAL = IWG.MainLayoutDual;
            var FourMillionBlack = (function () {
                function FourMillionBlack(_name, starter) {
                    this._name = _name;
                    this.starter = starter;
                    this._subscribe();
                    this._setupTicker();
                    this._init();
                    this._initComplete();
                }
                FourMillionBlack.prototype._subscribe = function () {
                };
                FourMillionBlack.prototype._unsubscribe = function () {
                };
                FourMillionBlack.prototype._endGameCheck = function () {
                };
                FourMillionBlack.prototype._init = function () {
                    var masterSS = CORE.iwgLoadQ.getResult("masterSS-data");
                    SPRITESHEETS.getInstance().addSpriteSheet("masterSS", masterSS);
                    var moneyBagSS = CORE.iwgLoadQ.getResult("moneyBagSS-data");
                    SPRITESHEETS.getInstance().addSpriteSheet("moneyBagSS", moneyBagSS);
                    var poundSS = CORE.iwgLoadQ.getResult("poundSS-data");
                    SPRITESHEETS.getInstance().addSpriteSheet("poundSS", poundSS);
                    var diamondSS = CORE.iwgLoadQ.getResult("diamondSS-data");
                    SPRITESHEETS.getInstance().addSpriteSheet("diamondSS", diamondSS);
                    var moneyClipSS = CORE.iwgLoadQ.getResult("moneyClipSS-data");
                    SPRITESHEETS.getInstance().addSpriteSheet("moneyClipSS", moneyClipSS);
                    var coinSS = CORE.iwgLoadQ.getResult("coinSS-data");
                    SPRITESHEETS.getInstance().addSpriteSheet("coinSS", coinSS);
                    var cashWadSS = CORE.iwgLoadQ.getResult("cashWadSS-data");
                    SPRITESHEETS.getInstance().addSpriteSheet("cashWadSS", cashWadSS);
                    var highlightSS = CORE.iwgLoadQ.getResult("highlightSS-data");
                    SPRITESHEETS.getInstance().addSpriteSheet("highlightSS", highlightSS);
                    var flareSS = CORE.iwgLoadQ.getResult("flareSS-data");
                    SPRITESHEETS.getInstance().addSpriteSheet("flareSS", flareSS);
                    var burstSS = CORE.iwgLoadQ.getResult("burstSS-data");
                    SPRITESHEETS.getInstance().addSpriteSheet("burstSS", burstSS);
                    TICKET.getInstance().setupTicket();
                    if (CORE.IWG.ame('get', 'UA').os.name === "iOS" || CORE.IWG.ame('get', 'UA').os.name === "Android") {
                        if (CORE.IWG.ame('get', 'UA').device.model === "iPad") {
                            var Layout = new MAINLAYOUT();
                        }
                        else {
                            var Layout = new MAINLAYOUTDUAL();
                        }
                    }
                    else {
                        var Layout = new MAINLAYOUT();
                    }
                    GLOBAL.getInstance().addToGlobal('winners', []);
                };
                FourMillionBlack.prototype._initComplete = function () {
                    setTimeout(function () {
                        CORE.IWG.ame('killloader');
                    }, 1000);
                };
                FourMillionBlack.prototype._setupTicker = function () {
                    createjs.Ticker.setFPS(20);
                    TweenLite.ticker.fps(20);
                    createjs.Touch.enable(this._stage, false, true);
                    TweenMax.ticker.addEventListener("tick", this.update.bind(this));
                };
                FourMillionBlack.prototype.update = function () {
                    IWG.IWGEM.trigger('update');
                };
                ;
                FourMillionBlack.prototype.destroy = function () {
                    this._unsubscribe();
                };
                return FourMillionBlack;
            })();
            iwg.FourMillionBlack = FourMillionBlack;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
