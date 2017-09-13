/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="GameObject.ts" />
/// <reference path="Scene.ts" />
var com;
(function (com) {
    var camelot;
    (function (camelot) {
        var iwg;
        (function (iwg) {
            var CAMELOT = com.camelot, CORE = CAMELOT.core, IWG = CAMELOT.iwg, GLOBAL = IWG.Global, GAMEOBJECT = IWG.GameObject, CLICKABLEGAMEOBJECT = IWG.ClickableGameObject, SPRITESHEETS = IWG.SpriteSheets, ANIMATION = IWG.Animation, images = CORE.iwgLoadQ.images, OVERLAY = IWG.Overlay, SOUND = IWG.Sound, SPLASH = IWG.Splash, ENDGAME = IWG.EndGame, SPINNER = IWG.Spinner, INSTRUCTION = IWG.Instruction, TICKET = IWG.Ticket;
            var MainLayout = (function () {
                function MainLayout() {
                    this._subscribe();
                    this._setupBackground();
                    this._setupButtons();
                    this._setupSplash();
                    this._setupEndgame();
                }
                MainLayout.prototype._subscribe = function () {
                    IWG.IWGEM.on('mainGameIntro', this._mainGameIntro.bind(this));
                };
                MainLayout.prototype._unsubscribe = function () {
                    IWG.IWGEM.off('mainGameIntro');
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
                        frame: "bg_black",
                        spriteSheet: SPRITESHEETS.getInstance().getSpriteSheet("gold7sMultiplier")
                    });
                    background.setScale(1.5, 1.5);
                };
                MainLayout.prototype._setupSplash = function () {
                    var splash = new SPLASH("splash");
                    splash.setDimensions({
                        w: 960,
                        h: 640
                    });
                    splash.setZindex("6");
                };
                MainLayout.prototype._setupButtons = function () {
                    var sound = new SOUND();
                    sound.setDimensions({
                        w: 50,
                        h: 50
                    });
                    sound.setZindex(10);
                    sound.setScale(1, 1);
                    sound.setPosition({ x: 910, y: 500 });
                    var instruction = new INSTRUCTION();
                };
                MainLayout.prototype._mainGameSetup = function () {
                    var spinner = new SPINNER();
                    spinner.setDimensions({
                        w: 802,
                        h: 821
                    });
                    spinner.setPosition({
                        x: 1500,
                        y: -100
                    });
                    spinner.setZindex("8");
                };
                MainLayout.prototype._mainGameIntro = function () {
                    this._mainGameSetup();
                    IWG.IWGEM.trigger('spinnerIn');
                    IWG.IWGEM.trigger('instructionShowButton');
                };
                MainLayout.prototype._setupEndgame = function () {
                    var endGame = new ENDGAME("endGame");
                    endGame.setDimensions({
                        w: 333,
                        h: 270
                    });
                    endGame.setPosition({
                        x: 1200,
                        y: 100
                    });
                    endGame.setZindex("10");
                    endGame.setAlpha(0);
                };
                return MainLayout;
            })();
            iwg.MainLayout = MainLayout;
        })(iwg = camelot.iwg || (camelot.iwg = {}));
    })(camelot = com.camelot || (com.camelot = {}));
})(com || (com = {}));
