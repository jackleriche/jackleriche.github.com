/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="GameObject.ts" />
/// <reference path="Scene.ts" />
/// <reference path="Card.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GLOBAL = IWG.Global, GAMEOBJECT = IWG.GameObject, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, SPRITESHEETS = IWG.SpriteSheets, ANIMATION = IWG.Animation, images = CORE.iwgLoadQ.images, OVERLAY = IWG.Overlay, SPLASH = IWG.Splash, BOKEH = IWG.Bokeh, ENDGAME = IWG.EndGame, TOMBOLA = IWG.Tombola, CARD = IWG.Card, BALLAUDIT = IWG.BallAudit, INSTRUCTION = IWG.Instruction, TICKET = IWG.Ticket;
            var MainLayout = (function () {
                function MainLayout() {
                    this._gamePreviews = [];
                    this._games = [];
                    this._gameFinished = false;
                    this._bgMusic = null;
                    this._dabberColor = null;
                    this._method = null;
                    this._startBall = null;
                    this._subscribe();
                    this._setupBackground();
                    this._setupSplash();
                    this._setupEndgame();
                }
                MainLayout.prototype._subscribe = function () {
                    IWG.IWGEM.on('mainGameIntro', this._mainGameSetup.bind(this));
                    IWG.IWGEM.on('mainGameIntroComplete', this._mainGameIntroComplete.bind(this));
                    IWG.IWGEM.on("Splash.methodSelected", this._setMethod.bind(this));
                    IWG.IWGEM.on("Splash.dabberSelected", this._setDabberColor.bind(this));
                    IWG.IWGEM.on("hideInstructions", this._enableGame.bind(this));
                };
                MainLayout.prototype._unsubscribe = function () {
                    IWG.IWGEM.off('mainGameIntro');
                    IWG.IWGEM.off("Splash.methodSelected");
                    IWG.IWGEM.off("Splash.dabberSelected");
                    IWG.IWGEM.off("hideInstructions");
                };
                MainLayout.prototype.getMethod = function () {
                    return this._method;
                };
                ;
                MainLayout.prototype._setMethod = function (method) {
                    this._method = method;
                };
                ;
                MainLayout.prototype.getDabberColor = function () {
                    return this._dabberColor;
                };
                ;
                MainLayout.prototype._setDabberColor = function (color) {
                    this._dabberColor = color;
                };
                ;
                MainLayout.prototype._mainGameIntroComplete = function () {
                    IWG.IWGEM.trigger('announceBall');
                };
                MainLayout.prototype._setupOverlay = function () {
                    var overlay = new OVERLAY(true);
                };
                MainLayout.prototype._setupBackground = function () {
                    var background = new GAMEOBJECT('mainBG', { w: 1300, h: 770 });
                    background.addBitmap({
                        name: "bg",
                        pos: {
                            x: 0,
                            y: 0
                        },
                        frame: "bg_large",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo")
                    });
                    background.setPosition({
                        x: -150
                    });
                    background.setScale(1.2, 1.2);
                };
                MainLayout.prototype._setupSplash = function () {
                    var splash = new SPLASH("splash");
                    splash.setDimensions({
                        w: 960,
                        h: 640
                    });
                    splash.setZindex("6");
                    var bokeh = new BOKEH(9);
                };
                MainLayout.prototype._mainGameSetup = function () {
                    GLOBAL.getInstance().addToGlobal('bokehEffect', false);
                    var tombola = new TOMBOLA("tombola");
                    tombola.setZindex(1);
                    tombola.setPosition({
                        x: 255,
                        y: 50
                    });
                    tombola.setAlpha(0);
                    tombola.intro();
                    var card1 = new CARD("card1", [3, 6, 20, 100]);
                    card1.setZindex(4);
                    card1.setPosition({
                        x: 10,
                        y: 20
                    });
                    card1.setupCardNumbers(TICKET.getInstance().getCard1());
                    card1.setupLegend();
                    card1.setDoublers(TICKET.getInstance().getDoublerPos(0));
                    card1.setScale(0);
                    card1.intro(0.5);
                    var card2 = new CARD("card2", [3, 10, 30, 1000]);
                    card2.setZindex(4);
                    card2.setPosition({
                        x: 585,
                        y: 20
                    });
                    card2.setupCardNumbers(TICKET.getInstance().getCard2());
                    card2.setupLegend();
                    card2.setDoublers(TICKET.getInstance().getDoublerPos(1));
                    card2.setScale(0);
                    card2.intro(0.6);
                    var card3 = new CARD("card3", [5, 15, 50, 10000]);
                    card3.setZindex(4);
                    card3.setPosition({
                        x: 10,
                        y: 280
                    });
                    card3.setupCardNumbers(TICKET.getInstance().getCard3());
                    card3.setupLegend();
                    card3.setDoublers(TICKET.getInstance().getDoublerPos(2));
                    card3.setScale(0);
                    card3.intro(0.7);
                    var card4 = new CARD("card4", [6, 20, 200, 300000]);
                    card4.setZindex(4);
                    card4.setPosition({
                        x: 585,
                        y: 280
                    });
                    card4.setupCardNumbers(TICKET.getInstance().getCard4());
                    card4.setupLegend();
                    card4.setDoublers(TICKET.getInstance().getDoublerPos(3));
                    card4.setScale(0);
                    card4.intro(0.8);
                    var redLines = new GAMEOBJECT("redDouble", { w: 429, h: 54 });
                    redLines.addBitmap({
                        name: "redDouble",
                        pos: {
                            x: 0,
                            y: 0
                        },
                        frame: "redlines",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo")
                    });
                    redLines.setPosition({
                        x: 270,
                        y: 529
                    });
                    var instruction = new INSTRUCTION("instruction");
                    var audit = new BALLAUDIT("ballAudit", 20);
                    audit.setZindex(2);
                    audit.setPosition({
                        x: 0,
                        y: 580
                    });
                    IWG.IWGEM.trigger('updateLegend', [-1]);
                    var startBall = new CLICKABLEGAMEOBJECT("startBall", { w: 117, h: 118 });
                    this._startBall = startBall;
                    startBall.addBitmap({
                        name: "startBall",
                        pos: {
                            x: 59,
                            y: 59
                        },
                        frame: "ball_start",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                        doReg: {
                            center: true
                        },
                        scale: 0
                    });
                    startBall.addBitmap({
                        name: "startTextB",
                        pos: {
                            x: 60,
                            y: 55
                        },
                        frame: "start_black",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                        doReg: {
                            center: true
                        },
                        alpha: 1
                    });
                    startBall.addBitmap({
                        name: "startTextW",
                        pos: {
                            x: 60,
                            y: 55
                        },
                        frame: "start_white",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("frostyBingo"),
                        doReg: {
                            center: true
                        },
                        alpha: 0
                    });
                    startBall.setScale(0.4, 0.4);
                    startBall.setAlpha(0);
                    startBall.setZindex(2);
                    startBall.setPosition({
                        x: 425,
                        y: 200
                    });
                    startBall.addAnimation("ballPop");
                    startBall.addAnimation("ballRollOff");
                    startBall.setAnimation("ballPop", "ballPopStart");
                    startBall.setAnimation("ballRollOff", "ballRollOffStart");
                    startBall.setEnabled(false);
                    startBall.setAction('click', function () {
                        if (GLOBAL.getInstance().getFromGlobal('gameState') === 'resume') {
                            createjs.Sound.play("startButton");
                            startBall.animate('ballRollOff');
                        }
                        ;
                    });
                    createjs.Sound.play("backgroundLoop", { loop: -1 });
                    IWG.IWGEM.trigger('soundHide');
                    var sound = GLOBAL.getInstance().getFromGlobal('sound');
                    sound.setPosition({
                        x: 545,
                        y: 487
                    });
                    TweenMax.delayedCall(3, function () {
                        IWG.IWGEM.trigger("showInstructions");
                        IWG.IWGEM.trigger('soundShow');
                    });
                };
                MainLayout.prototype._enableGame = function () {
                    this._startBall.animate('ballPop');
                    this._startBall.setEnabled(true);
                };
                MainLayout.prototype._setupEndgame = function () {
                    var endGame = new ENDGAME("endGame");
                    endGame.setDimensions({
                        w: 276,
                        h: 170
                    });
                    endGame.setPosition({
                        x: 345,
                        y: 230
                    });
                    endGame.setZindex("6");
                    endGame.setAlpha(0);
                    endGame.setScale(0);
                };
                return MainLayout;
            })();
            iwg.MainLayout = MainLayout;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
