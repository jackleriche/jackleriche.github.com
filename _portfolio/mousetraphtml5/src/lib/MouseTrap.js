/// <reference path="../../../typings/tsd.d.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, SCALE = IWG.Scale, PAUSE = IWG.Pause, SOUND = IWG.Sound, BOARD = IWG.Board, TICKET = IWG.Ticket, QUEUEMANAGER = IWG.QueueManager, GAMEOBJECT = IWG.GameObject, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, SPRITESHEETS = IWG.SpriteSheets, ANIMATION = IWG.Animation, LEGEND = IWG.Legend, images = CORE.iwgLoadQ.images, MAINLAYOUT = IWG.MainLayout, GLOBAL = IWG.Global;
            var MouseTrap = (function () {
                function MouseTrap(_name, starter) {
                    this._name = _name;
                    this.starter = starter;
                    this._active = true;
                    this._subscribe();
                    this.setupTicker();
                    this.init();
                    this.initComplete();
                    GLOBAL.getInstance().addToGlobal('tick', true);
                }
                MouseTrap.prototype.init = function () {
                    var mouseTrap = CORE.iwgLoadQ.getResult("mouseTrapSS");
                    SPRITESHEETS.getInstance().addSpriteSheet("mouseTrap", mouseTrap);
                    QUEUEMANAGER.getInstance().subscribe();
                    var mouseTrapDice = CORE.iwgLoadQ.getResult("mouseTrapDiceSS");
                    SPRITESHEETS.getInstance().addSpriteSheet("mouseTrapDice", mouseTrapDice);
                    var bootAnimation = CORE.iwgLoadQ.getResult("bootSS");
                    SPRITESHEETS.getInstance().addSpriteSheet("boot", bootAnimation);
                    var catAnimation = CORE.iwgLoadQ.getResult("catSS");
                    SPRITESHEETS.getInstance().addSpriteSheet("cat", catAnimation);
                    var looperAnimation = CORE.iwgLoadQ.getResult("looperSS");
                    SPRITESHEETS.getInstance().addSpriteSheet("looper", looperAnimation);
                    var scale = new SCALE(document.getElementById('IWGholder'));
                    var pause = new PAUSE();
                    pause.setPosition({
                        x: -200,
                        y: -30
                    });
                    var sound = new SOUND();
                    sound.setDimensions({
                        w: 50,
                        h: 50
                    });
                    sound.setPosition({ x: 25, y: 162 });
                    var mainLayout = new MAINLAYOUT();
                    var boardNum = TICKET.getInstance().getBoardNumber();
                    var rowData = [
                        [],
                        [
                            { prizeBG: "p1", prizeValue: 1, prizeHighlight: "pw1", icons: [7, 8], bg: "bg_legend5", position: { x: 805, y: 221 } },
                            { prizeBG: "p10", prizeValue: 10, prizeHighlight: "pw10", icons: [2, 1, 4], bg: "bg_legend4", position: { x: 748, y: 165 } },
                            { prizeBG: "p100", prizeValue: 100, prizeHighlight: "pw100", icons: [3, 6, 5, 7], bg: "bg_legend3", position: { x: 685, y: 110 } },
                            { prizeBG: "p500", prizeValue: 500, prizeHighlight: "pw500", icons: [1, 6, 7, 4, 5], bg: "bg_legend2", position: { x: 637, y: 55 } },
                            { prizeBG: "p8000", prizeValue: 8000, prizeHighlight: "pw8000", icons: [8, 4, 3, 5, 6, 2], bg: "bg_legend1", position: { x: 572, y: 0 } }
                        ],
                        [
                            { prizeBG: "p1", prizeValue: 1, prizeHighlight: "pw1", icons: [8, 6], bg: "bg_legend5", position: { x: 805, y: 221 } },
                            { prizeBG: "p10", prizeValue: 10, prizeHighlight: "pw10", icons: [2, 4, 1], bg: "bg_legend4", position: { x: 748, y: 165 } },
                            { prizeBG: "p100", prizeValue: 100, prizeHighlight: "pw100", icons: [7, 5, 3, 8], bg: "bg_legend3", position: { x: 685, y: 110 } },
                            { prizeBG: "p500", prizeValue: 500, prizeHighlight: "pw500", icons: [4, 5, 8, 1, 3], bg: "bg_legend2", position: { x: 637, y: 55 } },
                            { prizeBG: "p8000", prizeValue: 8000, prizeHighlight: "pw8000", icons: [6, 1, 7, 3, 5, 2], bg: "bg_legend1", position: { x: 572, y: 0 } }
                        ],
                        [
                            { prizeBG: "p1", prizeValue: 1, prizeHighlight: "pw1", icons: [7, 4], bg: "bg_legend5", position: { x: 805, y: 221 } },
                            { prizeBG: "p10", prizeValue: 10, prizeHighlight: "pw10", icons: [5, 6, 2], bg: "bg_legend4", position: { x: 748, y: 165 } },
                            { prizeBG: "p100", prizeValue: 100, prizeHighlight: "pw100", icons: [8, 3, 7, 1], bg: "bg_legend3", position: { x: 685, y: 110 } },
                            { prizeBG: "p500", prizeValue: 500, prizeHighlight: "pw500", icons: [6, 3, 1, 2, 7], bg: "bg_legend2", position: { x: 637, y: 55 } },
                            { prizeBG: "p8000", prizeValue: 8000, prizeHighlight: "pw8000", icons: [4, 2, 8, 7, 3, 5], bg: "bg_legend1", position: { x: 572, y: 0 } }
                        ]
                    ];
                    var legend = new LEGEND();
                    legend.setIconSpacing(45);
                    legend.setIconScale(0.75);
                    legend.setFilter(new createjs.ColorMatrixFilter(new createjs.ColorMatrix().adjustColor(100, -90, -90, 0)));
                    for (var i = 0; i < rowData[boardNum].length; i++) {
                        legend.addRow({
                            prizeBG: rowData[boardNum][i].prizeBG,
                            prizeValue: rowData[boardNum][i].prizeValue,
                            prizeHighlight: rowData[boardNum][i].prizeHighlight,
                            icons: {
                                iconSymbol: rowData[boardNum][i].icons
                            },
                            bg: rowData[boardNum][i].bg,
                            position: rowData[boardNum][i].position
                        });
                    }
                    ;
                    legend.preLegendCheck();
                    this.setupBackground();
                };
                MouseTrap.prototype.initComplete = function () {
                    setTimeout(function () {
                        CORE.IWG.ame('killloader');
                    }, 1000);
                };
                MouseTrap.prototype.getActive = function () {
                    return this._active;
                };
                MouseTrap.prototype._subscribe = function () {
                };
                MouseTrap.prototype._unsubscribe = function () {
                };
                MouseTrap.prototype.setupTicker = function () {
                    createjs.Ticker.setFPS(30);
                    TweenLite.ticker.fps(30);
                    createjs.Touch.enable(this._stage, false, true);
                    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
                    createjs.Ticker.addEventListener("tick", this.update);
                };
                MouseTrap.prototype.setupBackground = function () {
                    var ele = document.createElement("div");
                    ele.id = "background";
                    document.getElementById("IWGholder").appendChild(ele);
                };
                MouseTrap.prototype.update = function () {
                    if (GLOBAL.getInstance().getFromGlobal('tick')) {
                        IWG.IWGEM.trigger('update');
                    }
                    ;
                };
                ;
                MouseTrap.prototype.destroy = function () {
                    this._unsubscribe();
                };
                return MouseTrap;
            })();
            iwg.MouseTrap = MouseTrap;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
//# sourceMappingURL=MouseTrap.js.map