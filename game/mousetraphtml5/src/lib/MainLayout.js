/// <reference path="../../../typings/tsd.d.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GAMEOBJECT = IWG.GameObject, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, SPRITESHEETS = IWG.SpriteSheets, ANIMATION = IWG.Animation, images = CORE.iwgLoadQ.images, BOARD = IWG.Board, LEGEND = IWG.Legend, DICE = IWG.Dice, COUNTER = IWG.Counter;
            var MainLayout = (function () {
                function MainLayout() {
                    this.init();
                    this._subscribe();
                }
                MainLayout.prototype._subscribe = function () {
                    IWG.IWGEM.on('endGameStart', this._endGameStart.bind(this));
                    IWG.IWGEM.on('diceRollStarted', this.updateBackground.bind(this));
                };
                MainLayout.prototype._endGameStart = function () {
                    var _this = this;
                    var logo = this.boardBackground.getBitmap('logo');
                    TweenMax.to(logo, 1, { onStart: function () {
                            _this.boardBackground.active = true;
                        }, delay: 1, alpha: 0, onComplete: function () {
                            _this.boardBackground.active = false;
                        } });
                };
                MainLayout.prototype.init = function () {
                    var mainBGObject = new GAMEOBJECT("mainBg", { w: 960, h: 640 });
                    mainBGObject.addBitmap({
                        name: 'mainBG',
                        pos: { x: 0, y: 0 },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("mouseTrap"),
                        frame: "main_bg",
                        scale: 1,
                        doReg: { center: false }
                    });
                    mainBGObject.addBitmap({
                        name: 'logo',
                        pos: { x: 50, y: 5 },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("mouseTrap"),
                        frame: "mousetrap_logo",
                        scale: 1,
                        doReg: { center: false }
                    });
                    this.boardBackground = mainBGObject;
                    this.initPopup();
                    this.initBoard();
                    this.initCounter();
                    this.initLegend();
                    this.initDice();
                    this.initEndGame();
                };
                MainLayout.prototype.updateBackground = function () {
                    var mainBG = this.boardBackground.getBitmap("mainBG");
                    var logo = this.boardBackground.getBitmap("logo");
                    mainBG.getStage().update();
                    logo.getStage().update();
                };
                MainLayout.prototype.initDice = function () {
                    this.dice = new DICE("dice", { w: 270, h: 210 });
                    this.dice.setupDice();
                    BOARD.getInstance().diceObject = this.dice;
                };
                MainLayout.prototype.initLegend = function () {
                    var prizeValuesArray = [1, 10, 100, 500, 8000];
                    var rowTotals = [2, 3, 4, 5, 6];
                    var boardLegend = new Array([], [
                        [7, 8],
                        [2, 1, 4],
                        [3, 6, 5, 7],
                        [1, 6, 7, 4, 5],
                        [8, 4, 3, 5, 6, 2]
                    ], [
                        [8, 6],
                        [2, 4, 1],
                        [7, 5, 3, 8],
                        [4, 5, 8, 1, 3],
                        [6, 1, 7, 3, 5, 2]
                    ], [
                        [7, 4],
                        [5, 6, 2],
                        [8, 3, 7, 1],
                        [6, 3, 1, 2, 7],
                        [4, 2, 8, 7, 3, 5]
                    ]);
                };
                MainLayout.prototype.initPopup = function () {
                    BOARD.getInstance().setupPopup();
                };
                MainLayout.prototype.initEndGame = function () {
                    BOARD.getInstance().setupEndGame();
                };
                MainLayout.prototype.initCounter = function () {
                    var counter = new COUNTER("counter", { w: 100, h: 100 });
                    counter.setPosition({ x: 210, y: 260 });
                    counter.addBitmap({
                        name: 'counter',
                        pos: { x: 50, y: 30 },
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("mouseTrap"),
                        frame: "counter_mouse",
                        scale: 1,
                        doReg: { center: true }
                    });
                    BOARD.getInstance().counter = counter;
                };
                MainLayout.prototype.initBoard = function () {
                    BOARD.getInstance().initTicket();
                    var boards = new Array([], [2, 0, 3, 9, 10, 0, 9, 0, 6, 0, 5, 9,
                        0, 12, 0, 7, 0, 9, 0, 8, 4, 0, 11, 1], [5, 0, 1, 9, 12, 0, 9, 0, 8, 0, 2, 9,
                        0, 11, 0, 6, 0, 9, 0, 7, 3, 0, 10, 4], [4, 0, 2, 9, 11, 0, 9, 0, 7, 0, 3, 9,
                        0, 10, 0, 8, 0, 9, 0, 6, 1, 0, 12, 5]);
                    var tilePositions = [
                        [225, 339],
                        [152, 327],
                        [91, 383],
                        [101, 474],
                        [179, 523],
                        [261, 497],
                        [330, 536],
                        [408, 508],
                        [480, 530],
                        [553, 494],
                        [626, 538],
                        [683, 484],
                        [764, 459],
                        [727, 383],
                        [734, 298],
                        [650, 273],
                        [571, 223],
                        [540, 139],
                        [473, 79],
                        [432, 157],
                        [466, 231],
                        [411, 273],
                        [356, 333],
                        [290, 276]
                    ];
                    var iconRefs = [
                        { "num": 0, "name": "arrow", "frameName": "" },
                        { "num": 1, "name": "trap", "frameName": "symbol_trap" },
                        { "num": 2, "name": "spanner", "frameName": "symbol_spanner" },
                        { "num": 3, "name": "cheese", "frameName": "symbol_cheese" },
                        { "num": 4, "name": "egg", "frameName": "symbol_egg" },
                        { "num": 5, "name": "bottle", "frameName": "symbol_bottle" },
                        { "num": 6, "name": "slide", "frameName": "symbol_slide" },
                        { "num": 7, "name": "boot", "frameName": "symbol_boot" },
                        { "num": 8, "name": "cat", "frameName": "symbol_cat" },
                        { "num": 9, "name": "rollagain", "frameName": "rollagain" },
                        { "num": 10, "name": "iw2", "frameName": "iw2", "value": 2 },
                        { "num": 11, "name": "iw5", "frameName": "iw5", "value": 5 },
                        { "num": 12, "name": "iw50", "frameName": "iw50", "value": 50 }
                    ];
                    BOARD.getInstance().setupBoard(boards, tilePositions, iconRefs);
                };
                return MainLayout;
            })();
            iwg.MainLayout = MainLayout;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
//# sourceMappingURL=MainLayout.js.map